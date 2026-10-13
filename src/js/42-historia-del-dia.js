/* ---------- the story of the day: a little episode (from the books or the series) written each morning, played out
   with the characters and what they can do. Each scene has an hour, a place and who is there; the characters go there
   by themselves, and when Ana arrives the scene is played (the AI writes it); an errand in it is what Ana decides. ---------- */
/* the building blocks of a story (to add one: an entry here; the AI is told about it, the game checks and runs it)
   effects: things that happen when a scene begins ("antes") or ends ("despues"); events: what the game itself notices
   (a scene can end when one happens); frases: lines that must be said word for word */
const STORY_EFFECTS = {
  ausente: { desc: 'los de "quien" se van al pueblo (salen del mapa por el camino) hasta la hora "hasta"', run: f => { for (const k of f.quien) if (PEOPLE[k] && !CH[k].companion) PEOPLE[k].away = { day: today(), until: f.hasta || 19 }; } },
  vaca_suelta: { desc: 'una vaca ("animal") se escapa y se va a un campo o corral ("lugar": una de las áreas)', run: f => { const a = ANIM[f.animal]; if (a && a.kind === 'cow' && AREAS[f.lugar] && a.state !== 'bought') { a.state = 'loose'; a.area = f.lugar; a.goal = null; a.nav = null; } } },
  estado_ana: { desc: 'a Ana le pasa algo que se ve ("estado")', run: f => { if (ANA_STATES[f.estado]) setAnaState(f.estado); } },
};
const STORY_EVENTS = {
  vaca_agarrada: 'Ana agarra una vaca de la cuerda', 'agarrada:<animal>': 'Ana agarra de la cuerda a ese animal', vaca_vendida: 'Ana vende una vaca', 'vendida:<animal>': 'Ana vende ese animal', venta_rechazada: 'a Ana le ofrecen comprarle una vaca y ella dice que no', vaca_en_corral: 'Ana deja una vaca en el corral de Tejas Verdes', vaca_en_potrero: 'Ana deja una vaca en el potrero del Sr. Harrison', vaca_en_avena: 'Ana deja una vaca en el campo de avena',
  cocinado: 'Ana cocina algo', 'cocinado:tarta': 'Ana cocina una tarta', 'cocinado:te': 'Ana prepara té', 'regalo:<personaje>': 'Ana le regala o le da algo a ese personaje (por ejemplo regalo:harrison)',
};
const STORY_PLACES = () => [...Object.keys(PLACES), ...Object.keys(ROOMS)];
const placeName = l => PLACES[l] ? PLACES[l][0] : l === 'gg' ? 'la cocina de Tejas Verdes' : l === 'os' ? 'la salita de La Cuesta del Huerto' : l === 'rl' ? 'la casa de la Sra. Lynde' : l === 'ga' ? 'la pieza de Ana' : l === 'hh' ? 'la casa del Sr. Harrison' : l === 'br' ? 'la estación de Bright River' : HOUSES[l]?.inText?.replace(/^en /, '') || HOUSES[l]?.name || l;   // (the others: as the prompt says it, "la salita de la casa parroquial")
const S_EFFECT = () => ({ type: 'object', additionalProperties: false, required: ['tipo', 'quien', 'animal', 'lugar', 'estado', 'hasta', 'cuando'], properties: { tipo: { type: 'string', enum: Object.keys(STORY_EFFECTS) }, quien: { type: 'array', items: { type: 'string', enum: Object.keys(CH) } }, animal: { type: 'string', enum: ['', ...Object.keys(ANIMALS)] }, lugar: { type: 'string', enum: ['', ...Object.keys(AREAS)] }, estado: { type: 'string', enum: ['', ...Object.keys(ANA_STATES)] }, hasta: { type: 'integer' }, cuando: { type: 'string', enum: ['antes', 'despues'] } } });
const S_SCENE = () => ({ type: 'object', additionalProperties: false, required: ['id', 'hora', 'lugar', 'personajes', 'que_pasa', 'pista', 'encargo', 'fin', 'evento', 'efectos', 'frases', 'requiere', 'clave', 'contra'], properties: {
  id: { type: 'string' }, hora: { type: 'integer' }, lugar: { type: 'string', enum: STORY_PLACES() }, personajes: { type: 'array', items: { type: 'string', enum: Object.keys(CH) } },
  que_pasa: { type: 'string' }, pista: { type: 'string' }, encargo: AI_SCHEMA.properties.encargo, fin: { type: 'string', enum: ['llega_ana', 'encargo_cumplido', 'evento'] }, evento: { type: 'string' },
  efectos: { type: 'array', items: S_EFFECT() }, frases: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['quien', 'texto'], properties: { quien: { type: 'string', enum: ['ana', ...Object.keys(CH), ...Object.keys(ANIMALS).filter(k => ANIMALS[k].talks)] }, texto: { type: 'string' } } } },
  requiere: { type: 'array', items: { type: 'string' } }, clave: { type: 'boolean' }, contra: { type: 'array', items: { type: 'string' } } } });
const storySchema = () => ({ type: 'object', additionalProperties: false, required: ['titulo', 'inspiracion', 'resumen', 'escenas'], properties: { titulo: { type: 'string' }, inspiracion: { type: 'string' }, resumen: { type: 'string' }, escenas: { type: 'array', items: S_SCENE() } } });
const branchSchema = () => ({ type: 'object', additionalProperties: false, required: ['titulo_rama', 'resumen', 'escenas'], properties: { titulo_rama: { type: 'string' }, resumen: { type: 'string' }, escenas: { type: 'array', items: S_SCENE() } } });
const NO_TASK = { tipo: 'ninguno', item: '', cantidad: 0, para: '', lugar: '', recado: '' };
/* How a story works. The scenes written in the morning are the MAIN BRANCH: what would happen, more or less, if nobody
   forces anything. It is loose on purpose: each scene has an hour, but it opens when what it needs has happened
   ("requiere": earlier scenes or events), so a chain can run early or late; a scene that is not key ("clave": false) can
   be missed and the story goes on with a gap; one whose event happens by itself before its time counts as done ("ya").
   When a key scene can no longer be (Ana was not there, what it waited for did not happen, or something against it
   did: "contra"), the story opens a new BRANCH: the AI writes how it goes on from what really happened (without it:
   the branches written by hand, or else the main branch without what depended on the broken scene). */
const FINAL = ['hecha', 'ya', 'perdida', 'sin_evento', 'sin_encargo', 'rota', 'descartada'];
const GAP = ['perdida', 'sin_evento', 'sin_encargo'];   // (missed, not key: a gap the story goes on with)
const isFinal = e => FINAL.includes(e.estado);
const evKnown = n => typeof n === 'string' && /^[a-z_]+(:[a-z_]+){0,2}$/.test(n) && (!!STORY_EVENTS[n] || Object.keys(STORY_EVENTS).some(k => k.includes(':<') && n.startsWith(k.split(':')[0] + ':')));
const evDesc = n => STORY_EVENTS[n] || (() => { const k = Object.keys(STORY_EVENTS).find(k => k.includes(':<') && n.startsWith(k.split(':')[0] + ':')); return k ? STORY_EVENTS[k].replace(/ \(por ejemplo[^)]*\)/, '') + ' (' + n.split(':').slice(1).map(x => NAMES[x] || x).join(', ') + ')' : n; })();
function validBeats(list, h0, pre = '', known = []){
  const out = [], ids = new Set(known); let last = h0;
  for (const [k, e] of (Array.isArray(list) ? list : []).slice(0, 9).entries()) {
    if (!e) continue;
    const lugar = String(e.lugar || ''), inRoom = !!ROOMS[lugar]; if (!PLACES[lugar] && !inRoom) continue;
    const ps = [...new Set((Array.isArray(e.personajes) ? e.personajes : []).filter(k => CH[k]))].filter(k => lugar !== 'ga' && !(k === 'diana' && inRoom && lugar !== 'os'));
    const hora = Math.max(Math.round(+e.hora || 0), last, h0); if (hora > 21) break;
    const enc = e.encargo && e.encargo.tipo && e.encargo.tipo !== 'ninguno' && ps.length ? { ...NO_TASK, ...e.encargo } : null;
    const evento = evKnown(e.evento) ? e.evento : '', fin = e.fin === 'evento' && evento ? 'evento' : enc && e.fin === 'encargo_cumplido' ? 'encargo_cumplido' : 'llega_ana';
    const efectos = (Array.isArray(e.efectos) ? e.efectos : []).filter(f => f && STORY_EFFECTS[f.tipo]).map(f => ({ tipo: f.tipo, quien: (Array.isArray(f.quien) ? f.quien : []).filter(k => CH[k]), animal: ANIMALS[f.animal] ? f.animal : '', lugar: AREAS[f.lugar] ? f.lugar : '', estado: ANA_STATES[f.estado] ? f.estado : '', hasta: clamp(Math.round(+f.hasta || 19), 7, 23), cuando: f.cuando === 'despues' ? 'despues' : 'antes' }));
    const okq = ['ana', ...ps, ...Object.keys(ANIMALS).filter(k => ANIMALS[k].talks && ANIMALS[k].room === lugar)];
    const frases = (Array.isArray(e.frases) ? e.frases : []).filter(f => f && okq.includes(f.quien) && typeof f.texto === 'string' && f.texto.trim()).slice(0, 4).map(f => ({ quien: f.quien, texto: f.texto.trim().slice(0, 240) }));
    let id = pre + (String(e.id || '').toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 24) || 'e' + k); while (ids.has(id)) id += '_';
    const ref = r => ids.has(pre + r) ? pre + r : ids.has(r) || evKnown(r) ? r : null;   // (earlier scenes, or events: never later ones)
    const requiere = [...new Set((Array.isArray(e.requiere) ? e.requiere : []).map(r => ref(String(r))).filter(Boolean))].slice(0, 4);
    const contra = [...new Set((Array.isArray(e.contra) ? e.contra : []).filter(evKnown))].slice(0, 4);
    out.push({ id, hora, lugar, personajes: ps, que_pasa: String(e.que_pasa || '').slice(0, 400), pista: String(e.pista || '').slice(0, 90) || ('Algo pasa en ' + placeName(lugar)), encargo: enc, fin, evento: fin === 'evento' ? evento : '', efectos, frases, requiere, clave: !!e.clave, contra, margen: clamp(+e.margen || 3, 1, 6), estado: 'espera' });
    ids.add(id); last = hora;
  }
  return out;
}
function validStory(o, h0 = Math.max(8, Math.ceil(hourNow() + .5))){
  if (!o) return null;
  const esc = validBeats(o.escenas, h0); if (!esc.length) return null;
  return { v: 2, day: today(), titulo: String(o.titulo || 'Un día en Avonlea').slice(0, 80), inspiracion: String(o.inspiracion || '').slice(0, 120), resumen: String(o.resumen || '').slice(0, 300), escenas: esc, ev: {}, hechos: [], ramas: [], gen: false, fin: false };
}
const runEffects = (e, when) => { for (const f of e.efectos || []) if (f.cuando === when) STORY_EFFECTS[f.tipo].run(f); };
// a few stories written by hand, for when there is no AI (or it does not answer)
const STORIES = [
  { titulo: 'La vaca del señor Harrison', inspiracion: 'Ana de Avonlea, capítulo 2: vender con prisa y arrepentirse con calma', resumen: 'Con Marilla y Matthew en Charlottetown, Ana encuentra una vaca jersey en la avena del Sr. Harrison y, furiosa, se la vende al Sr. Shearer... pero Dolly estaba en el corral. Termina pidiendo disculpas, con algo cocinado por ella y los veinte dólares.', escenas: [
    { id: 'despedida', hora: 8, lugar: 'gg', personajes: ['marilla', 'matthew'], que_pasa: 'Marilla y Matthew salen a Charlottetown y no vuelven hasta la noche; Marilla le deja a Ana la casa a su cargo y le advierte, muy seria, que Dolly no vuelva a meterse en la avena del Sr. Harrison, que ya vino a quejarse dos veces.', pista: 'Marilla y Matthew se van al pueblo: despídete en la cocina', encargo: NO_TASK, fin: 'llega_ana', evento: '',
      efectos: [{ tipo: 'ausente', quien: ['marilla', 'matthew'], hasta: 19, cuando: 'despues' }, { tipo: 'ausente', quien: ['harrison'], hasta: 15, cuando: 'antes' }],
      frases: [{ quien: 'marilla', texto: 'La casa queda en tus manos, Ana. Y por lo que más quieras: que Dolly no vuelva a meterse en la avena del señor Harrison.' }, { quien: 'ana', texto: '¡Marilla, puedes confiar en mí como en una roca! Bueno... como en una roca un poquito soñadora.' }, { quien: 'matthew', texto: 'Bueno, pues... yo confío, ya lo creo.' }] },
    { id: 'carta', hora: 9, lugar: 'huerta', personajes: ['diana'], que_pasa: 'Diana viene a ver a Ana a la huerta; Ana le cuenta, indignadísima, la carta del Sr. Harrison, que amenaza con "tomar medidas" si la vaca vuelve a su avena, y le habla de Ginger, el loro que dice cosas.', pista: 'Diana viene a verte a la huerta', encargo: NO_TASK, fin: 'llega_ana', evento: '', efectos: [],
      frases: [{ quien: 'ana', texto: 'El señor Harrison me escribió una carta, Diana. ¡Una carta! Dice que si mi vaca vuelve a pisar su avena, "tomará medidas".' }] },
    { id: 'vaca_avena', clave: true, hora: 11, lugar: 'avena_porton', personajes: ['diana'], que_pasa: 'Hay una vaca jersey en plena avena del Sr. Harrison, comiendo feliz. Ana está segura de que es Dolly; Diana la ayuda a perseguirla, entre gritos y risas, mientras la vaca se escapa una y otra vez.', pista: '¡Hay una vaca en la avena del Sr. Harrison!', encargo: NO_TASK, fin: 'evento', evento: 'vaca_agarrada',
      efectos: [{ tipo: 'vaca_suelta', animal: 'jersey', lugar: 'avena', cuando: 'antes' }],
      frases: [{ quien: 'ana', texto: '¡Dolly! ¡Traidora! ¡Después de todo lo que hemos hablado!' }] },
    { id: 'shearer', requiere: ['vaca_agarrada'], clave: true, contra: ['venta_rechazada', 'vaca_en_potrero'], hora: 12, lugar: 'avena_porton', personajes: ['shearer'], que_pasa: 'El Sr. Shearer, que pasa por el camino en su carreta comprando ganado, ve a Ana con la vaca de la cuerda, toda despeinada y furiosa, y le ofrece veinte dólares por ella.', pista: 'Por el camino viene alguien con una carreta', encargo: NO_TASK, fin: 'evento', evento: 'vaca_vendida', efectos: [],
      frases: [{ quien: 'shearer', texto: 'Buena vaca esa. Ando comprando ganado: le doy veinte dólares por ella, señorita.' }] },
    { id: 'dolly', requiere: ['vaca_vendida'], margen: 4, hora: 13, lugar: 'corral_porton', personajes: ['diana'], que_pasa: 'De vuelta en Tejas Verdes, orgullosa de su sentido práctico, Ana descubre a Dolly masticando tan tranquila en el corral: la vaca que vendió era la del Sr. Harrison. Desesperación total.', pista: 'Vuelve al corral de Tejas Verdes', encargo: NO_TASK, fin: 'llega_ana', evento: '', efectos: [],
      frases: [{ quien: 'ana', texto: '...Diana. Dime que esa vaca es un fantasma del Bosque Encantado.' }, { quien: 'diana', texto: 'Ana... es Dolly.' }, { quien: 'ana', texto: '¡Vendí la vaca del señor Harrison! ¡Oh, Diana, estoy en un abismo de desesperación!' }] },
    { id: 'cocinar', requiere: ['vaca_vendida'], hora: 14, lugar: 'gg', personajes: [], que_pasa: 'Sola en la cocina, Ana decide que una disculpa como corresponde necesita algo cocinado por ella (y revisa tres veces que no sea linimento).', pista: 'Cocina algo para pedir disculpas', encargo: NO_TASK, fin: 'evento', evento: 'cocinado', efectos: [],
      frases: [{ quien: 'ana', texto: 'Una disculpa sin algo cocinado es como un poema sin rima. Y esta vez reviso que sea vainilla... ¡no linimento!' }] },
    { id: 'confesion', requiere: ['vaca_vendida'], clave: true, hora: 16, lugar: 'hh', personajes: ['harrison'], que_pasa: 'Ana va a casa del Sr. Harrison a confesar: le vendió su vaca. Ginger chilla; Ana hace una disculpa grandiosa; el Sr. Harrison gruñe, pero se le escapa la risa, acepta lo que Ana le trae y admite que su cerca era un desastre. Terminan casi amigos.', pista: 'Ve a confesarle todo al Sr. Harrison', encargo: NO_TASK, fin: 'evento', evento: 'regalo:harrison', efectos: [],
      frases: [{ quien: 'ginger', texto: '¡Pelirroja! ¡Pelirroja! ¡Cuidado con la pelirroja!' }, { quien: 'ana', texto: 'Señor Harrison, vengo a confesar un crimen: vendí su vaca. No por maldad, sino por un exceso de indignación justa, que es mucho peor.' }, { quien: 'harrison', texto: 'Vaya, vaya... siéntate, muchacha. La verdad, la cerca de mi avena es un desastre.' }] },
    { id: 'vuelta', requiere: ['vaca_vendida'], hora: 19, lugar: 'gg', personajes: ['marilla', 'matthew', 'lynde'], que_pasa: 'Vuelven Marilla y Matthew; Ana lo cuenta todo de un tirón. Marilla, con su humor seco; Matthew, de su lado; y la Sra. Lynde llega con la noticia que ya corre por el pueblo.', pista: 'Marilla y Matthew vuelven a casa', encargo: NO_TASK, fin: 'llega_ana', evento: '', efectos: [],
      frases: [{ quien: 'marilla', texto: 'Ana Shirley, ¿alguna vez pasará un día sin que te metas en un lío?' }, { quien: 'matthew', texto: 'Bueno, pues... era una vaca muy parecida. Ya lo creo.' }, { quien: 'lynde', texto: 'Me contaron en el pueblo que alguien vendió una vaca... ¡que no era suya!' }] },
    { id: 'noche', hora: 21, lugar: 'ga', personajes: [], que_pasa: 'En su cuarto, frente a la ventana y el cerezo Reina de las Nieves, Ana piensa en el día.', pista: 'Sube a tu cuarto', encargo: NO_TASK, fin: 'llega_ana', evento: '', efectos: [],
      frases: [{ quien: 'ana', texto: 'Marilla dice que mañana es un día nuevo, todavía sin ningún error. Voy a hacer lo posible por dejarlo así... por lo menos hasta el desayuno.' }] }],
    // the other ways the day can go (when there is no AI to write them)
    ramas: [
      { desde: 'shearer', titulo: 'Ana no vende la vaca', resumen: 'Ana estuvo a punto de vender la vaca del Sr. Harrison, pero no lo hizo; al final todo queda en un susto, una cerca por arreglar y una Marilla sorprendida.', escenas: [
        { id: 'alivio', hora: 13, lugar: 'corral_porton', personajes: ['diana'], que_pasa: 'De vuelta en Tejas Verdes, Ana encuentra a Dolly masticando en el corral: la vaca de la avena era la del Sr. Harrison. ¡Y ella casi la vende! Alivio, risas nerviosas y un escalofrío.', pista: 'Vuelve al corral de Tejas Verdes', encargo: NO_TASK, fin: 'llega_ana', evento: '', efectos: [],
          frases: [{ quien: 'ana', texto: '¡Diana! Dolly está en el corral... ¡y yo casi vendo la vaca del señor Harrison! Mi ángel de la guarda me tiró de la trenza justo a tiempo.' }, { quien: 'diana', texto: '¡Ana! ¿Te imaginas si se la hubieras vendido?' }] },
        { id: 'devolver', hora: 16, lugar: 'hh', personajes: ['harrison'], que_pasa: 'Ana va a contarle al Sr. Harrison que su vaca anduvo en la avena (por su propia cerca rota). Ginger chilla; el Sr. Harrison gruñe, pero tiene que admitir que la cerca es un desastre, y le cae en gracia esa muchacha que habla tanto.', pista: 'Ve a contarle al Sr. Harrison lo de su vaca', encargo: NO_TASK, fin: 'llega_ana', evento: '', efectos: [],
          frases: [{ quien: 'ginger', texto: '¡Pelirroja! ¡Pelirroja!' }, { quien: 'harrison', texto: 'Hmpf. ¿Así que era mi vaca la de la avena? Bueno... la cerca está hecha un desastre, eso lo admito.' }] },
        { id: 'vuelta', hora: 19, lugar: 'gg', personajes: ['marilla', 'matthew'], que_pasa: 'Vuelven Marilla y Matthew; Ana les cuenta que casi vende la vaca del Sr. Harrison, pero que esta vez lo pensó dos veces. Marilla, sorprendida, la elogia a su manera; Matthew, orgullosísimo.', pista: 'Marilla y Matthew vuelven a casa', encargo: NO_TASK, fin: 'llega_ana', evento: '', efectos: [],
          frases: [{ quien: 'marilla', texto: 'Vaya, Ana. Por una vez pensaste antes de actuar. Habrá que marcar el día en el calendario.' }, { quien: 'matthew', texto: 'Bueno, pues... yo sabía que lo harías bien. Ya lo creo.' }] },
        { id: 'noche', hora: 21, lugar: 'ga', personajes: [], que_pasa: 'En su cuarto, Ana piensa en el error que estuvo a punto de cometer.', pista: 'Sube a tu cuarto', encargo: NO_TASK, fin: 'llega_ana', evento: '', efectos: [],
          frases: [{ quien: 'ana', texto: 'Hoy casi cometo el error más grande de mi vida... y no lo cometí. Es una sensación rarísima, como estrenar zapatos.' }] }] },
      { desde: 'vaca_avena', titulo: 'La vaca se queda en la avena', resumen: 'La vaca siguió en la avena, y el Sr. Harrison vino furioso a reclamar por una vaca que resultó ser suya.', escenas: [
        { id: 'reclamo', hora: 16, lugar: 'corral_porton', personajes: ['harrison'], que_pasa: 'El Sr. Harrison, de vuelta del pueblo, encuentra una vaca en su avena y llega furioso a Tejas Verdes a reclamar... pero en el corral está Dolly, tan tranquila: la vaca de la avena es la suya. Entre el enojo y la vergüenza, termina riéndose de sí mismo.', pista: 'Alguien viene muy enojado a Tejas Verdes', encargo: NO_TASK, fin: 'llega_ana', evento: '', efectos: [],
          frases: [{ quien: 'harrison', texto: '¡Muchacha! ¡Tu vaca está otra vez en mi avena, y esta vez tomo medidas!' }, { quien: 'ana', texto: 'Señor Harrison, con todo respeto... Dolly está aquí, en el corral. Esa vaca es suya.' }] },
        { id: 'vuelta', hora: 19, lugar: 'gg', personajes: ['marilla', 'matthew'], que_pasa: 'Vuelven Marilla y Matthew; Ana les cuenta que el Sr. Harrison vino a reclamar por una vaca que era de él mismo.', pista: 'Marilla y Matthew vuelven a casa', encargo: NO_TASK, fin: 'llega_ana', evento: '', efectos: [],
          frases: [{ quien: 'marilla', texto: 'Ese hombre debería arreglar su cerca antes de andar escribiendo cartas.' }] },
        { id: 'noche', hora: 21, lugar: 'ga', personajes: [], que_pasa: 'En su cuarto, Ana se ríe sola del día.', pista: 'Sube a tu cuarto', encargo: NO_TASK, fin: 'llega_ana', evento: '', efectos: [],
          frases: [{ quien: 'ana', texto: 'Hoy el lío fue de otro, para variar. Es casi decepcionante.' }] }] }] },
  { titulo: 'El cordial de frambuesa', inspiracion: 'el capítulo 16 del libro: el té con Diana', resumen: 'Diana invita a Ana a tomar el té, y Marilla, que no olvida lo del vino de grosellas, manda un recado de paz a la Sra. Barry.', escenas: [
    { hora: 10, lugar: 'os', personajes: ['diana', 'barry'], que_pasa: 'Diana invita a Ana a tomar el té en la salita; la Sra. Barry les deja el cordial de frambuesa, esta vez bien etiquetado, y las mira con cierta cautela.', pista: 'Diana te invita a tomar el té en su casa', encargo: NO_TASK, fin: 'llega_ana' },
    { hora: 13, lugar: 'gg', personajes: ['marilla'], que_pasa: 'Marilla, que se acuerda del lío del vino de grosellas, le pide a Ana que le lleve un recado de paz a la Sra. Barry.', pista: 'Marilla quiere hablar contigo en la cocina', encargo: { ...NO_TASK, tipo: 'recado', para: 'barry', recado: 'Marilla le manda saludos y dice que esta vez el cordial es cordial de verdad' }, fin: 'encargo_cumplido' },
    { hora: 17, lugar: 'lago', personajes: ['diana'], que_pasa: 'Ana y Diana se ríen de aquella tarde del vino de grosellas y renuevan su juramento de amistad junto al lago.', pista: 'Diana te espera junto al Lago de las Aguas Brillantes', encargo: NO_TASK, fin: 'llega_ana' }] },
  { titulo: 'El Bosque Encantado', inspiracion: 'el capítulo 20 del libro: una imaginación demasiado buena', resumen: 'Ana y Diana pueblan el Bosque Encantado de fantasmas, y Marilla decide curarle a Ana el miedo a su propia imaginación.', escenas: [
    { hora: 10, lugar: 'bosque_encantado', personajes: ['diana'], que_pasa: 'Diana y Ana inventan fantasmas para el Bosque Encantado y terminan asustándose de su propia imaginación.', pista: 'Diana te espera a la entrada del Bosque Encantado', encargo: NO_TASK, fin: 'llega_ana' },
    { hora: 14, lugar: 'gg', personajes: ['marilla'], que_pasa: 'Marilla, que se enteró del susto, decide curarle a Ana la imaginación: tendrá que ir sola al Bosque Encantado.', pista: 'Marilla te llama a la cocina', encargo: { ...NO_TASK, tipo: 'ir', lugar: 'bosque_encantado' }, fin: 'encargo_cumplido' },
    { hora: 18, lugar: 'ga', personajes: [], que_pasa: 'De vuelta en su cuarto, Ana promete, muy solemne, imaginar con más cuidado... o por lo menos con más luz.', pista: 'Al atardecer, sube a tu cuarto', encargo: NO_TASK, fin: 'llega_ana' }] },
  { titulo: 'La visita de la Sra. Lynde', inspiracion: 'los capítulos 9 y 10 del libro: la Sra. Lynde conoce a Ana', resumen: 'La Sra. Lynde viene a ver de cerca a la niña de Tejas Verdes, y Ana termina pidiéndole disculpas con todo el dramatismo del mundo.', escenas: [
    { hora: 11, lugar: 'gg', personajes: ['marilla', 'lynde'], que_pasa: 'La Sra. Lynde vino a ver de cerca a "la huérfana" y opina de todo sin pedir permiso; Marilla la escucha con paciencia.', pista: 'Hay visita en la cocina de Tejas Verdes', encargo: NO_TASK, fin: 'llega_ana' },
    { hora: 14, lugar: 'rl', personajes: ['lynde'], que_pasa: 'Ana va a casa de la Sra. Lynde a pedirle disculpas por haberle gritado aquella vez, de rodillas y con palabras grandiosas; la Sra. Lynde se ablanda.', pista: 'Ve a la casa de la Sra. Lynde a pedir disculpas', encargo: NO_TASK, fin: 'llega_ana' },
    { hora: 17, lugar: 'granero', personajes: ['matthew'], que_pasa: 'Matthew, tímido, le dice a Ana que lo hizo muy bien; bueno, pues... que está orgulloso de ella.', pista: 'Matthew te busca cerca del granero', encargo: NO_TASK, fin: 'llega_ana' }] },
  { titulo: 'Un té para Matthew', inspiracion: 'el cariño de Matthew y Ana, a lo largo del libro', resumen: 'Matthew anda cansado con el trabajo de la granja, y Ana decide cuidarlo con un té preparado por ella.', escenas: [
    { hora: 9, lugar: 'granero', personajes: ['matthew'], que_pasa: 'Matthew trabaja en el granero y se le nota cansado; Ana se propone prepararle un té como una verdadera dama.', pista: 'Matthew trabaja en el granero', encargo: { ...NO_TASK, tipo: 'cocinar', item: 'te' }, fin: 'encargo_cumplido' },
    { hora: 13, lugar: 'gg', personajes: ['marilla', 'matthew'], que_pasa: 'A la hora de comer, Matthew le cuenta a Marilla, a su manera, lo bien que lo cuida Ana; Marilla disimula una sonrisa.', pista: 'La comida en Tejas Verdes', encargo: NO_TASK, fin: 'llega_ana' }] },
];
function fallbackStory(){
  const done = game.stories || [], fresh = STORIES.filter(st => !done.includes(st.titulo)), pool = fresh.length ? fresh : STORIES;
  return validStory(pool[Math.floor(Math.random() * pool.length)]);
}
function storyMsg(){
  const prev = game.journal.filter(e => e.d === today()).slice(-12);
  return worldText() + `\n\nEMPIEZA EL DÍA ${today() + 1} (las escenas pueden ir de las ${Math.max(8, Math.ceil(hourNow() + .5))} a las 20).`
    + (prev.length ? `\nLO ÚLTIMO QUE PASÓ:\n${prev.map(e => '- ' + e.t).join('\n')}` : '')
    + `\n\nLAS RELACIONES (de cada uno hacia los demás, de 0 a 5):\n${NODES().map(f => `- ${nodeName(f)} → ${relText(f)}`).join('\n')}`
    + `\n\nLO QUE SE PUEDE TENER HOY: ${ITEMS.filter(k => inSeason(k)).map(k => ITEM_NAME[k][1]).join(', ')}.`
    + `\nLUGARES (claves): ${STORY_PLACES().map(l => l + ' = ' + placeName(l)).join('; ')}.`
    + ((game.stories || []).length ? `\nHISTORIAS DE DÍAS ANTERIORES (no las repitas): ${game.stories.slice(-8).join('; ')}.` : '')
    + `\n\nGUIÓN DEL DÍA: escribe la historia de hoy.`;
}
let storyBusy = false;
async function makeStory(){
  if (storyBusy) return; storyBusy = true;
  let st = null;
  if (game.nextStory) { const pick = STORIES.find(x => x.titulo === game.nextStory); game.nextStory = null; if (pick) st = validStory(pick); }
  else if (aiReady()) { try { st = validStory((await aiCall([{ role: 'user', content: storyMsg() }], storySchema())).out); } catch (e) { console.debug('[avonlea IA] guión', e.message); } }
  if (!st) st = fallbackStory();
  storyBusy = false;
  if (!st) return;
  for (const p of Object.values(PEOPLE)) { p.story = null; if (p.target?.story) p.target = null; }
  game.story = st; save();
  notice('📖 Hoy: «' + st.titulo + '» · ' + st.escenas[0].pista);
}
async function newDay(ended){
  storyBusy = true;
  if (aiReady()) { try { await reflectDay(ended); } catch (e) { console.debug('[avonlea IA] fin del día', e.message); } }
  storyBusy = false; if (AI.stories) makeStory();
}
function storyEvent(name){ const st = game.story; if (!st || st.day !== today()) return; (st.ev = st.ev || {})[name] = hourNow(); }
const storyOpen = () => { const st = AI.stories && game.story; return st && st.v === 2 && st.day === today() ? st.escenas.filter(e => e.estado === 'abierta').sort((a, b) => a.hora - b.hora) : []; };
const storyNow = () => storyOpen().find(e => !e.played) || null;
const storyPos = e => ROOMS[e.lugar] ? { room: e.lugar, place: null } : { room: 'out', place: e.lugar };
const storyHere = e => ROOMS[e.lugar] ? game.scene === e.lugar : game.scene === 'out' && dist(ana.x, ana.y, PLACES[e.lugar][1], PLACES[e.lugar][2]) < 150;
const storyPast = st => (st.hechos || []).slice(-6).map(h => h.t).join(' / ');
function storyText(who){
  const st = game.story; if (!st || st.v !== 2 || st.day !== today()) return '';
  const mine = st.escenas.filter(e => !isFinal(e) && e.personajes.includes(who)).slice(0, FULL() ? 9 : 1), past = FULL() ? storyPast(st) : '';   // (minimal: only what comes next for them)
  if (!mine.length && !past) return '';
  return `LA HISTORIA DE HOY («${st.titulo}»${FULL() ? ', inspirada en ' + st.inspiracion : ''})` + (past ? `. Lo que ha pasado hasta ahora (${NAMES[who]} solo sabe lo que vio o le contaron): ${past}.` : '.')
    + (mine.length ? ` Lo que viene, en lo que toca a ${NAMES[who]}: ` + mine.map(e => `hacia las ${e.hora}:00, en ${placeName(e.lugar)}: ${FULL() ? e.que_pasa : e.que_pasa.slice(0, 170)}`).join(' Después, ') + ' (Guíate por esto, sin adelantarlo.)' : '');
}
// when what a scene needs happened (null: not yet); a missed scene that was not key counts as a gap, not as a wall
function storyReq(st, e){
  let t = 0;
  for (const r of e.requiere || []) {
    const b = st.escenas.find(x => x.id === r);
    if (b && GAP.includes(b.estado)) continue;
    const h = st.ev[r]; if (h == null) return null; t = Math.max(t, h);
  }
  return t;
}
/* the judge (the AI): with the diary of what really happened, it decides if a scene already happened in what matters
   (even if not as written: another hour, without someone, in other words), if it can still happen, or if it no longer can */
const judgeSchema = ids => ({ type: 'object', additionalProperties: false, required: ['veredictos'], properties: { veredictos: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['id', 'veredicto', 'nota'], properties: { id: { type: 'string', enum: ids }, veredicto: { type: 'string', enum: ['cumplida', 'sigue', 'no_puede'] }, nota: { type: 'string' } } } } } });
const todayLog = () => game.journal.filter(j => j.d === today() + 1);
const whereNow = () => `DÓNDE ESTÁ CADA UNO: Ana: ${game.scene === 'out' ? placeText() : placeName(game.scene)}; ${Object.keys(CH).map(k => NAMES[k] + ': ' + whereText(k)).join('; ')}. Animales: ${Object.entries(ANIM).map(([k, a]) => `${k} (${ANIMALS[k].desc}): ${ANIMALS[k].kind !== 'cow' ? 'en su lugar' : a.state === 'bought' ? 'vendida a ' + (NAMES[a.owner] || a.owner) : a.state === 'led' ? 'Ana la lleva de la cuerda' : a.area && AREAS[a.area] ? 'en ' + AREAS[a.area].name : a.state || 'en su lugar'}`).join('; ')}. Lo que lleva Ana: ${ITEMS.filter(k => game.inv[k] > 0).map(k => itemText(k, game.inv[k])).join(', ') || 'nada'}.`;
function judgeMsg(st, beats){
  if (!FULL()) return `BITÁCORA DE HOY (hora: lo que pasó):\n${todayLog().slice(-25).map(j => `${j.h != null ? fmtHour(j.h) : '?'} ${j.t}`).join('\n') || '(nada)'}`
    + `\nEVENTOS: ${Object.entries(st.ev || {}).sort((a, b) => a[1] - b[1]).map(([k, t]) => fmtHour(t) + ' ' + k).join(', ') || '(ninguno)'}\nAHORA: ${fmtHour(hourNow())}.`
    + `\n\nPLAN (¿se cumplió?):\n${beats.map(e => `- "${e.id}" (hacia las ${e.hora}:00, en ${placeName(e.lugar)}${e.personajes.length ? ', con ' + e.personajes.map(k => NAMES[k]).join(' y ') : ''}): ${e.que_pasa}${e.fin === 'evento' ? ' (termina cuando ' + evDesc(e.evento).replace(/^./, c => c.toLowerCase()) + ')' : ''}`).join('\n')}`;
  const fin = e => e.fin === 'evento' ? 'termina cuando ' + evDesc(e.evento).replace(/^./, c => c.toLowerCase()) : e.fin === 'encargo_cumplido' ? 'termina cuando Ana cumple el encargo' : 'termina cuando se juega (Ana llega y la escena pasa)';
  return worldText() + `\n\nLA HISTORIA DE HOY: «${st.titulo}» (inspirada en ${st.inspiracion}). ${st.resumen}`
    + `\n\nBITÁCORA DE HOY (lo que de verdad pasó, con la hora):\n${todayLog().map(j => `- ${j.h != null ? fmtHour(j.h) : '?'} ${j.t}`).join('\n') || '(nada)'}`
    + `\n\nEVENTOS QUE EL JUEGO NOTÓ: ${Object.entries(st.ev || {}).sort((a, b) => a[1] - b[1]).map(([k, t]) => fmtHour(t) + ' ' + k).join(', ') || '(ninguno)'}`
    + `\nLO QUE YA PASÓ DE LA HISTORIA: ${storyPast(st) || '(nada aún)'}`
    + `\n${whereNow()}\nAHORA SON LAS ${fmtHour(hourNow())}.`
    + `\n\nESCENAS POR JUZGAR:\n${beats.map(e => `- "${e.id}" (hacia las ${e.hora}:00, en ${placeName(e.lugar)}${e.personajes.length ? ', con ' + e.personajes.map(k => NAMES[k]).join(' y ') : ''}; ${e.estado === 'jugada' ? 'ya se jugó la conversación' : e.estado === 'abierta' ? 'esperando que Ana llegue' : 'todavía no empieza'}): ${e.que_pasa} (${fin(e)})`).join('\n')}`
    + `\n\nJUEZ DE LA HISTORIA: decide cada escena.`;
}
async function storyJudge(st, beats){
  st.judging = true; st.judgeH = hourNow() + 1; st.judgeN = todayLog().length;   // (the next look, in an hour of the game)
  try {
    const o = (await aiCall([{ role: 'user', content: judgeMsg(st, beats) }], judgeSchema(beats.map(e => e.id)))).out;
    if (game.story !== st || st.gen) return;
    for (const v of Array.isArray(o.veredictos) ? o.veredictos : []) {
      const e = beats.find(b => b.id === v.id); if (!e || isFinal(e) || e.estado === 'jugando') continue;
      const nota = String(v.nota || '').trim().slice(0, 200); e.juicio = { v: v.veredicto, nota, h: hourNow() };
      if (v.veredicto === 'cumplida') { e.nota = nota; storyEnd(e, 'hecha'); }
      else if (v.veredicto === 'sigue' && e.juzgada === 'pend') { e.margen += 1; if (e.vence != null) e.vence = Math.max(e.vence, hourNow()) + 1; }   // (it can still happen: one more hour)
      else if (v.veredicto === 'no_puede') { if (e.clave) { st.judging = false; storyBranch(e, 'juez:' + nota); return; } e.nota = nota; storyEnd(e, 'perdida'); }
    }
  } catch (err) { console.debug('[avonlea IA] juez', err.message); }
  finally { st.judging = false; for (const e of beats) if (e.juzgada === 'pend') e.juzgada = 'ok'; save(); }
}
// before giving a scene up (or opening a branch), the judge looks at the diary: maybe it already happened, another way
function storyWait(st, e){
  if (!aiReady() || e.juzgada === 'ok') return false;
  e.juzgada = 'pend'; return true;   // (it waits for the judge's next look)
}
const storyEvDone = (st, e) => e.fin === 'evento' && st.ev[e.evento] != null && st.ev[e.evento] >= (e.reqAt ?? 0);
function storyTick(){
  const st = game.story; if (!st || st.v !== 2 || st.day !== today() || st.gen || st.fin) return;
  const hn = hourNow();
  for (const e of st.escenas) {
    if (isFinal(e) || e.estado === 'jugando') continue;
    const rq = storyReq(st, e);
    if (rq == null) {   // what it needs has not happened (yet)
      if (hn > e.hora + e.margen + 1) { if (storyWait(st, e)) continue; if (e.clave) return storyBranch(e, 'falta'); storyEnd(e, 'perdida'); }
      continue;
    }
    e.reqAt = Math.max(rq, e.hora - 3);
    const against = (e.contra || []).find(c => st.ev[c] != null && st.ev[c] >= e.reqAt);
    if (against && !storyEvDone(st, e)) return storyBranch(e, 'contra:' + against);
    if (e.estado === 'espera') {
      if (storyEvDone(st, e)) { storyEnd(e, 'ya'); continue; }   // (it happened by itself, before its time)
      if (hn > e.hora + e.margen && rq <= e.hora) { if (storyWait(st, e)) continue; if (e.clave) return storyBranch(e, 'tarde'); storyEnd(e, 'perdida'); continue; }   // (its time went by, e.g. the clock jumped)
      const early = e.requiere.length && hn >= Math.max(rq + .25, e.hora - 2);   // (what it waited for came early: so does it)
      if (hn < e.hora - .75 && !early) continue;
      e.estado = 'abierta'; e.vence = Math.max(e.hora, hn) + e.margen; e.opened = true; runEffects(e, 'antes'); notice('📖 ' + e.pista); save();
    }
    if (e.estado === 'abierta') {
      if (storyEvDone(st, e) && !e.played) { e.yaAt = e.yaAt ?? hn; if (!storyHere(e) || hn > e.yaAt + .5) { storyEnd(e, 'ya'); continue; } }
      if (hn > e.vence) { if (storyWait(st, e)) continue; if (e.clave) return storyBranch(e, 'tarde'); storyEnd(e, 'perdida'); }
      continue;
    }
    if (e.estado === 'jugada') {   // played: wait for the decisions, and for the errand or the event if there is one
      if (game.talk || amb.cur) continue;
      if (e.fin === 'encargo_cumplido') {
        const t = e.taskId && game.tasks.find(t => t.id === e.taskId);
        if (!e.taskId || (t && !t.done && hn > e.vence + 4)) { if (storyWait(st, e)) continue; if (e.clave) return storyBranch(e, 'sin_encargo'); storyEnd(e, 'sin_encargo'); continue; }
        if (t && !t.done) continue;
      }
      if (e.fin === 'evento' && !storyEvDone(st, e)) { if (hn < e.vence + 2 || storyWait(st, e)) continue; if (e.clave) return storyBranch(e, 'sin_evento'); storyEnd(e, 'sin_evento'); continue; }
      storyEnd(e, 'hecha');
    }
  }
  // the judge looks once an hour of the game (if Ana did something since, or a scene waits for it)
  if (aiReady() && !st.judging && hn >= (st.judgeH ?? 0)) {
    const c = st.escenas.filter(e => !isFinal(e) && e.estado !== 'jugando' && (e.estado === 'abierta' || e.estado === 'jugada' || e.juzgada === 'pend'));
    const news = todayLog().slice(st.judgeN ?? 0).some(j => /\bAna\b/.test(j.t) && !/^(Ana decidió|Ana durmió|El día tomó otro camino)/.test(j.t));
    if (c.length && (news || c.some(e => e.juzgada === 'pend'))) storyJudge(st, c.slice(0, 6)); else st.judgeH = hn + .25;
  }

  // whoever is in an open scene (or in one being played) goes there (the earliest one first)
  const open = storyOpen(), pos = [...open, ...st.escenas.filter(e => e.estado === 'jugando' || (e.estado === 'jugada' && e.fin !== 'llega_ana'))];   // (they stay while the scene waits for what has to happen)
  for (const [k, p] of Object.entries(PEOPLE)) {
    const e = pos.find(e => e.personajes.includes(k));
    if (e) { p.story = storyPos(e); p.away = null; } else if (p.story) { p.story = null; if (p.target?.story) p.target = null; }
  }
  if (amb.cur || game.talk || game.cooking || sleeping) return;
  for (const e of open) {
    if (e.played || !storyHere(e)) continue;
    const present = e.personajes.filter(k => sceneOf(k) === game.scene && (game.scene !== 'out' || dist(PEOPLE[k].x, PEOPLE[k].y, ana.x, ana.y) < 220));
    if (present.length < e.personajes.length) { e.waitT = e.waitT || TT + 30; if (TT < e.waitT) continue; }   // (gives them a moment to arrive)
    if (hablando() || ['ana', ...present].some(ocupada)) continue;   // (not on top of what is being said or done: a moment later)
    storyPlay(e, present); return;
  }
}
async function storyPlay(e, present){
  const st = game.story; e.estado = 'jugando'; userInput();
  const past = storyPast(st), rama = st.ramas[st.ramas.length - 1];
  const note = `ESCENA DE LA HISTORIA DE HOY «${st.titulo}» (inspirada en ${st.inspiracion}): ${e.que_pasa}` + (past ? ` (Lo que pasó antes hoy: ${past}.)` : '') + (rama && e.id.startsWith(rama.pre) ? ` (La historia ya no es la del libro: ${rama.por}; ahora va por «${rama.titulo}».)` : '') + (e.frases?.length ? ` Estas frases tienen que aparecer tal cual, cada una dicha por quien se indica: ${e.frases.map(f => nameOf(f.quien) + ': «' + f.texto + '»').join(' ')}.` : '') + (e.encargo ? ` En esta escena ${NAMES[present[0]] || 'alguien'} le pide algo a Ana: ${(() => { try { return taskText({ ...e.encargo, from: present[0], n: e.encargo.cantidad || 1, para: e.encargo.para || present[0] }); } catch (err) { return e.encargo.tipo; } })()}.` : '') + ' Es un momento especial del día: la escena puede ser algo más larga.';
  let s = null;
  if (aiReady()) { try { s = await sceneAsk(present, note); } catch (err) { console.debug('[avonlea IA] escena de la historia', err.message); } }
  const fr = (e.frases || []).filter(f => f.quien === 'ana' || present.includes(f.quien) || talkersHere().includes(f.quien));
  if ((!s || !s.lines.length) && fr.length) s = { parts: present, lines: fr.map(f => ({ q: f.quien, t: f.texto })), out: { encargo: NO_TASK, accion: { tipo: 'ninguna' } }, scene: game.scene, resumen: '' };
  else if (s && fr.length) { const has = f => s.lines.some(l => l.t.toLowerCase().includes(f.texto.toLowerCase().slice(0, 24))); s.lines = [...fr.filter(f => !has(f)).map(f => ({ q: f.quien, t: f.texto })), ...s.lines].slice(0, 12); }
  if (!s || !s.lines.length) s = { parts: present, lines: [{ q: present[0] || 'ana', t: present.length ? LINES[present[0]][Math.floor(Math.random() * LINES[present[0]].length)] : '¡Qué día este! Parece sacado de un libro.' }], out: { encargo: NO_TASK, accion: { tipo: 'ninguna' } }, scene: game.scene, resumen: '' };
  if (!s.resumen) s.resumen = `${st.titulo}: ${e.que_pasa}`;
  if (e.encargo && present.length && (!s.out.encargo || s.out.encargo.tipo === 'ninguno')) s.out.encargo = { ...e.encargo };
  if (!aiReady()) notice('📖 ' + e.que_pasa);
  if (amb.cur || game.talk || game.story !== st || e.estado !== 'jugando') { if (e.estado === 'jugando') e.estado = 'abierta'; return; }   // (something else happened meanwhile: later)
  s.story = e; s.turns = 1; e.estado = 'jugada'; e.played = true;
  s.noMenu = !e.encargo && !(e.fin === 'evento' && e.evento.startsWith('regalo:'));   // (a decision only when the scene has one to offer)
  sceneStart(s, present.length > 0);
}
function storyRelease(e){ for (const k of e.personajes) { const p = PEOPLE[k]; if (!p) continue; p.story = null; if (p.target?.story) p.target = null; } }
function storyEnd(e, how){
  const st = game.story, hn = hourNow(); e.estado = how;
  if (how === 'hecha' || how === 'ya') st.ev[e.id] = hn;
  if (e.opened) runEffects(e, 'despues');
  if (how === 'perdida' && e.opened && e.personajes.length) logEv('Ana no llegó a tiempo: ' + e.que_pasa, e.personajes);
  const t = e.nota ? (how === 'hecha' ? '' : 'No pasó: ') + e.nota : how === 'hecha' ? e.que_pasa : how === 'ya' ? 'Antes de lo pensado, ' + evDesc(e.evento).replace(/^./, c => c.toLowerCase()) : how === 'perdida' ? 'No pasó (Ana no estuvo): ' + e.pista : 'Quedó a medias: ' + e.pista;
  st.hechos.push({ h: Math.round(hn * 10) / 10, t: t.slice(0, 200) });
  storyRelease(e); storyCheckEnd(); save();
}
function storyCheckEnd(){
  const st = game.story; if (st.gen || st.fin || st.escenas.some(e => !isFinal(e))) return;
  st.fin = true; const r = st.ramas[st.ramas.length - 1];
  logEv(`La historia del día: «${st.titulo}»${r ? ' (que terminó siendo «' + r.titulo + '»)' : ''}. ${r ? r.resumen || 'El día tomó otro camino: ' + r.por + '.' : st.resumen}`, Object.keys(CH));
  (game.stories = game.stories || []).push(st.titulo); notice('📖 Fin de la historia de hoy: «' + (r ? r.titulo : st.titulo) + '»');
}
function storyWhy(e, why){
  if (why.startsWith('contra:')) return `en vez de lo que iba a pasar («${e.pista}»), pasó esto: ${evDesc(why.slice(7)).replace(/^./, c => c.toLowerCase())}`;
  if (why === 'tarde') return `Ana no estuvo en ${placeName(e.lugar)} a tiempo («${e.pista}»), y eso ya no pasó`;
  if (why === 'sin_evento') return `no pasó lo que tenía que pasar: ${evDesc(e.evento).replace(/^./, c => c.toLowerCase())}`;
  if (why.startsWith('juez:')) return `según lo que pasó, «${e.pista}» ya no puede ser: ${why.slice(5)}`;
  if (why === 'sin_encargo') return `Ana no tomó, o no cumplió, el encargo de «${e.pista}»`;
  return `nunca se dio lo que hacía falta para «${e.pista}»`;
}
// the story leaves its path: from here on, a new branch
function storyBranch(e, why){
  const st = game.story;
  if (st.ramas.length >= 3) return storyEnd(e, why === 'sin_evento' || why === 'sin_encargo' ? why : 'perdida');   // (enough turns for one day: a gap)
  const txt = storyWhy(e, why);
  e.estado = 'rota'; e.porque = txt; storyRelease(e); st.gen = true;
  st.hechos.push({ h: Math.round(hourNow() * 10) / 10, t: 'El día tomó otro camino: ' + txt });
  logEv('El día tomó otro camino: ' + txt + '.');
  notice('📖 La historia toma otro camino…'); save();
  storyBranchMake(st, e, why, txt).catch(err => { console.debug('[avonlea] rama', err); if (game.story === st) { st.gen = false; save(); } });
}
function branchMsg(st, e, txt, pend, h0){
  const today_ = todayLog().slice(-16);
  return worldText() + `\n\nLA HISTORIA DE HOY: «${st.titulo}» (inspirada en ${st.inspiracion}). ${st.resumen}`
    + `\n\nLO QUE YA PASÓ DE LA HISTORIA:\n${(st.hechos || []).map(h => `- ${fmtHour(h.h)}: ${h.t}`).join('\n') || '(nada aún)'}`
    + (today_.length ? `\n\nLO QUE PASÓ HOY (el diario, con la hora):\n${today_.map(j => `- ${j.h != null ? fmtHour(j.h) : '?'} ${j.t}`).join('\n')}` : '')
    + `\n\nDÓNDE SE DESVIÓ (a las ${fmtHour(hourNow())}): ${txt}.`
    + `\n\nLO QUE IBA A PASAR DESPUÉS EN LA RAMA PRINCIPAL (ya no vale tal cual; puedes retomar lo que aún tenga sentido): ${pend.map(x => `${x.hora}:00, en ${placeName(x.lugar)}${x.personajes.length ? ', con ' + x.personajes.map(k => NAMES[k]).join(' y ') : ''}: ${x.que_pasa}`).join(' | ') || '(nada)'}`
    + `\n\nDÓNDE ESTÁ CADA UNO: ${Object.keys(CH).map(k => NAMES[k] + ': ' + whereText(k)).join('; ')}. Animales: ${Object.entries(ANIM).map(([k, a]) => `${k} (${ANIMALS[k].desc}): ${ANIMALS[k].kind !== 'cow' ? 'en su lugar' : a.state === 'bought' ? 'vendida a ' + (NAMES[a.owner] || a.owner) : a.state === 'led' ? 'Ana la lleva de la cuerda' : a.area && AREAS[a.area] ? 'en ' + AREAS[a.area].name : a.state || 'en su lugar'}`).join('; ')}.`
    + `\nLUGARES (claves): ${STORY_PLACES().map(l => l + ' = ' + placeName(l)).join('; ')}.`
    + `\nESCENAS YA HECHAS (sus "id" sirven en "requiere"): ${st.escenas.filter(x => x.estado === 'hecha' || x.estado === 'ya').map(x => x.id).join(', ') || '(ninguna)'}.`
    + `\n\nRAMA NUEVA: escribe cómo sigue la historia desde las ${h0}:00.`;
}
const fmtHour = h => `${Math.floor(h % 24)}:${String(Math.floor((h % 1) * 60)).padStart(2, '0')}`;
async function storyBranchMake(st, e, why, txt){
  const n = st.ramas.length + 1, pre = 'r' + n + '_', h0 = Math.max(Math.ceil(hourNow()), 7);
  const pend = st.escenas.filter(x => !isFinal(x)), playing = pend.filter(x => x.estado === 'jugando');
  const known = st.escenas.filter(x => x.estado === 'hecha' || x.estado === 'ya').map(x => x.id);
  let beats = [], keep = [], titulo = '', resumen = '';
  if (aiReady()) {
    try { const o = (await aiCall([{ role: 'user', content: branchMsg(st, e, txt, pend, h0) }], branchSchema())).out; beats = validBeats(o.escenas, h0, pre, known); titulo = String(o.titulo_rama || '').slice(0, 80); resumen = String(o.resumen || '').slice(0, 300); }
    catch (err) { console.debug('[avonlea IA] rama', err.message); }
  }
  if (!beats.length) {   // without the AI: a branch written by hand for this turn, if the story has one
    const src = STORIES.find(x => x.titulo === st.titulo), r = src?.ramas?.find(r => r.desde === e.id && (!r.por || r.por.some(p => why.startsWith(p))));
    if (r) { beats = validBeats(r.escenas, h0, pre, known); titulo = r.titulo; resumen = r.resumen || ''; }
  }
  if (!beats.length) {   // ...or the main branch, without what depended on the broken scene
    const gone = new Set([e.id, e.evento].filter(Boolean));
    for (const x of pend) if (x.requiere.some(r => gone.has(r))) { gone.add(x.id); if (x.evento) gone.add(x.evento); } else keep.push(x);
    titulo = 'Otro camino'; resumen = txt;
    if (!keep.some(x => x.lugar === 'ga') && h0 <= 21) beats = validBeats([{ id: 'noche', hora: 21, lugar: 'ga', personajes: [], que_pasa: 'En su cuarto, Ana piensa en cómo el día tomó un camino distinto del que parecía: ' + txt + '.', pista: 'Al final del día, sube a tu cuarto', fin: 'llega_ana' }], h0, pre, known);
  }
  if (game.story !== st) return;   // (a new day came meanwhile)
  for (const x of pend) if (!keep.includes(x) && !playing.includes(x)) { x.estado = 'descartada'; storyRelease(x); }
  st.escenas.push(...beats); st.ramas.push({ pre, desde: e.id, por: txt, titulo: titulo || 'Otro camino', resumen, hora: hourNow() }); st.gen = false;
  const next = [...keep, ...beats].sort((a, b) => a.hora - b.hora)[0];
  notice('📖 La historia sigue por otro camino: «' + (titulo || 'Otro camino') + '»' + (next ? ' · ' + next.pista : ''));
  storyCheckEnd(); save();
}