/* ---------- the cards of the people of Avonlea (who they are and what they like to talk about) and their encounters:
   when Ana comes near one of them, when she taps one, or when two of them meet near her, they talk. With the AI, a
   short request: «Eres X de Avonlea y te encuentras con Y. Están en Z, es tal estación y tal hora. Genera una
   conversación sobre L.» Without it (or if it fails), the written lines. ---------- */
const FICHAS = {
  gilbert: ['Gilbert Blythe, 13 años, el chico más listo y simpático de la escuela; una vez llamó «Zanahorias» a Ana y ella le rompió la pizarra en la cabeza; desde entonces Ana no le habla, aunque él lo intenta', ['el concurso de ortografía', 'la pizarra rota', 'el puente del estanque', 'los exámenes para entrar a Queen\'s']],
  josie: ['Josie Pye, compañera de escuela de Ana, presumida, envidiosa y de lengua afilada; siempre está desafiando a los demás', ['el vestido nuevo de alguien', 'un desafío peligroso', 'los chismes de la escuela']],
  gertie: ['Gertie Pye, hermana menor de Josie, imita todo lo que dice su hermana', ['lo que dijo Josie', 'los lápices perdidos']],
  ruby: ['Ruby Gillis, compañera de Ana, bonita y romántica, siempre hablando de pretendientes', ['los pretendientes', 'las botellas de leche en el río', 'la boda de su hermana']],
  jane: ['Jane Andrews, compañera de Ana, sensata, trabajadora y sin mucha imaginación', ['los deberes de aritmética', 'el club de cuentos', 'la cosecha de su padre']],
  prissy: ['Prissy Andrews, 16 años, la mayor de la escuela, se da aires de señorita y estudia para entrar a Queen\'s', ['los estudios', 'el maestro', 'ser casi una señorita']],
  charlie: ['Charlie Sloane, compañero de escuela de Ana, tímido, de ojos saltones, enamorado de Ana', ['la tarta de su madre', 'su pizarra nueva', 'un paseo']],
  moody: ['Moody Spurgeon MacPherson, compañero de escuela de Ana, serio y torpe, quiere ser pastor', ['los sermones', 'un castigo injusto', 'las vacas']],
  tillie: ['Tillie Boulter, compañera de escuela de Ana, alegre y juguetona', ['los juegos del recreo', 'un nido de petirrojos']],
  felicity: ['Felicity King, de la granja King, muy hacendosa y orgullosa de su cocina', ['el pan', 'los modales de una señorita', 'su primo Felix']],
  felix: ['Felix King, de la granja King, regordete, crédulo y fanfarrón', ['la bruja del bosque', 'las historias de fantasmas', 'los dulces de la tienda']],
  cecily: ['Cecily King, de la granja King, la más pequeña, dulce y tímida', ['las recitaciones', 'los gatitos']],
  sara: ['Sara Stanley, la niña de la historia, que vive en Rose Cottage con sus tías; cuenta historias maravillosas', ['una historia de fantasmas', 'el barco fantasma', 'la tía Hetty']],
  phillips: ['el Sr. Phillips, el maestro de Avonlea, severo y algo distraído, que corteja a Prissy Andrews', ['la ortografía', 'el examen', 'la disciplina']],
  allan: ['el reverendo Allan, el nuevo pastor de Avonlea, joven, bondadoso y de buen humor', ['la escuela dominical', 'el picnic de la iglesia', 'dar gracias']],
  sraallan: ['la Sra. Allan, esposa del pastor, joven, dulce y alegre; Ana la adora (es su «espíritu afín»)', ['el té en la casa parroquial', 'la recitación de Ana', 'la escuela dominical']],
  lawson: ['el Sr. Lawson, dueño de la tienda de la aldea, amable y conversador', ['la mercadería nueva', 'los precios', 'los encargos de Marilla']],
  herrero: ['el herrero de Avonlea, grandote, tiznado y de buen corazón', ['los caballos', 'las herraduras', 'el fuego de la fragua']],
  editor: ['el editor de La Crónica de Avonlea, el periódico del pueblo, siempre buscando noticias', ['las noticias del pueblo', 'un cuento para el periódico']],
  hetty: ['la Srta. Hetty King, de Rose Cottage, solterona estricta y orgullosa, con mucho corazón escondido', ['los modales', 'los niños de hoy', 'la familia King']],
  olivia: ['Olivia King, hermana de Hetty, dulce y romántica, a quien corteja Jasper Dale', ['un picnic', 'Jasper Dale', 'las flores']],
  jasper: ['Jasper Dale, el inventor tímido de Avonlea, que tartamudea y se sonroja; enamorado de Olivia King', ['un invento', 'la fotografía', 'la Srta. Olivia']],
  alec: ['Alec King, granjero, hermano de Hetty, trabajador y de pocas palabras', ['la siega', 'el tiempo', 'Matthew Cuthbert']],
  janet: ['Janet King, esposa de Alec, madre práctica y cariñosa', ['los hijos', 'la cocina', 'lo que dijo Marilla']],
  srapye: ['la Sra. Pye, madre de Josie y Gertie, chismosa y criticona', ['los chismes', 'el pelo rojo de Ana', 'el loro del Sr. Harrison']],
  sloane: ['el Sr. Sloane, granjero, padre de Charlie', ['las papas', 'el tiempo', 'la feria']],
  andrews: ['el Sr. Andrews, granjero, padre de Jane y Prissy, serio y formal', ['la cosecha', 'Tejas Verdes']],
  peg: ['Peg Bowen, la vieja excéntrica que vive sola en el bosque; los niños creen que es bruja, pero es buena y sabia a su manera', ['el bosque', 'las hierbas', 'lo que dicen de ella']],
  farero: ['el capitán Jim, el viejo farero, marinero retirado que cuenta historias del mar', ['el mar', 'las tormentas', 'los barcos', 'sus viajes']],
  veraneante: ['una señora de Boston que veranea en el hotel White Sands, encantada con todo', ['la playa', 'la isla', 'la ciudad']],
  pescador: ['un pescador de Avonlea, curtido y bromista', ['la pesca', 'el mar', 'el tiempo']],
  stacy: ['la Srta. Stacy, la maestra nueva de Avonlea: joven, alegre y comprensiva; saca a los alumnos a estudiar al bosque y prepara a los mejores para el examen de Queen\'s', ['las composiciones', 'la botánica', 'el examen de Queen\'s', 'el concierto de la escuela']],
  minnie: ['Minnie May Barry, la hermanita de Diana, de tres años; Ana la salvó del crup una noche de invierno', ['los cuentos de hadas', 'las muñecas de Diana', 'la noche que estuvo enferma']],
  srbarry: ['el Sr. Barry, el padre de Diana, granjero de La Cuesta del Huerto, callado y trabajador', ['el heno', 'la cosecha', 'el tiempo']],
  maryjoe: ['Mary Joe, la muchacha francesa que trabaja en casa de los Barry; no sabe qué hacer en una emergencia', ['la ropa tendida', 'la noche del crup', 'la señora Barry']],
  jerry: ['Jerry Buote, el muchacho francés que Matthew contrata para ayudar en la granja de Tejas Verdes', ['la leña', 'las vacas', 'el trabajo del campo']],
  buhonero: ['un vendedor ambulante que va de casa en casa con su baúl de cintas, botones y tinte para el pelo (el que le vendió a Ana el tinte que le dejó el pelo verde)', ['sus mercancías', 'el tinte para el pelo', 'los caminos']],
  medico: ['el médico de la zona, que atiende a los enfermos de Avonlea; un señor serio y amable', ['los enfermos', 'el crup de Minnie May', 'la salud']],
  srbell: ['el Sr. Bell, el superintendente de la escuela dominical, un señor mayor y muy formal que hace oraciones larguísimas', ['la escuela dominical', 'los versículos', 'la iglesia']],
  josephine: ['la Srta. Josephine Barry, la tía rica de Diana, de Charlottetown: brusca y estirada, pero Ana la hace reír como nadie; de visita en La Cuesta del Huerto', ['Charlottetown', 'la exposición', 'la noche en que Ana le saltó encima en la cama']],
  spencer: ['la Sra. Spencer, de White Sands, la que trajo a Ana del orfanato por error (los Cuthbert querían un niño)', ['el orfanato', 'el enredo de la niña en vez del niño', 'su hija Lily']],
  blewett: ['la Sra. Peter Blewett, de White Sands, una mujer dura y tacaña que quería a Ana de sirvienta; Marilla no se la dio', ['sus muchos niños', 'el trabajo de la casa', 'las sirvientas']],
  carrie: ['Carrie Sloane, compañera de escuela de Ana, hermana de Charlie', ['la escuela', 'la Srta. Stacy', 'su hermano Charlie']],
  thomas: ['Thomas Lynde, el marido de la Sra. Rachel Lynde, un hombre tranquilo y callado (ella habla por los dos)', ['la siembra', 'Rachel', 'el campo']],
};
for (const [k, d] of Object.entries(FOLK_DEFS)) { const f = FICHAS[k]; d.ficha = f ? f[0] : d.look.h < .99 ? d.name + ', un niño de Avonlea que juega cerca de su casa' : d.name + ', de Avonlea, que vive en ' + d.home.replace(/^Casa de /, 'la casa de ').replace(/^Granja /, 'la granja '); d.topics = f ? f[1] : d.look.h < .99 ? ['un juego', 'un bicho que encontró'] : ['el tiempo', 'la cosecha', 'los vecinos', 'las noticias de la aldea']; }
/* THE CARD (the same for everyone, the main characters and the people of the village):
     nombre, ficha (who they are, in a sentence or two), temas (what they like to talk about), frases (what they say
     without the AI) and memoria (true: they keep what they talked about with Ana, when «Memoria de los personajes» is on).
   The main characters have more besides (errands, presents, routines: CHARACTERS); fichaOf gives the card of anyone. */
for (const [k, c] of Object.entries(CH)) { c.temas = c.temas || ['lo que pasó hoy', 'la granja', 'los vecinos']; if (c.memoria === undefined) c.memoria = true; }
for (const d of Object.values(FOLK_DEFS)) if (d.memoria === undefined) d.memoria = ['gilbert', 'sraallan', 'farero', 'peg', 'jasper', 'sara'].some(k => FOLK_DEFS[k] === d);
function fichaOf(k){
  if (CH[k]) return { nombre: CH[k].fullName, ficha: CH[k].fullName + ', ' + voiceShort(k), temas: CH[k].temas, frases: LINES[k], memoria: CH[k].memoria };
  const d = FOLK_DEFS[k]; return d ? { nombre: d.name, ficha: d.ficha, temas: d.topics, frases: lineasDe(k, d.lines), memoria: d.memoria } : null;
}
const ANA_FICHA = 'Ana Shirley, 11 años, pelirroja y pecosa, huérfana adoptada por Matthew y Marilla Cuthbert de Tejas Verdes; soñadora, muy conversadora, de palabras grandiosas e imaginación desbordante';
const SEASON_TOPICS = [['las flores de los manzanos', 'la primavera'], ['el calor', 'las vacaciones', 'las bayas'], ['las hojas rojas', 'las manzanas', 'la cosecha'], ['la nieve', 'el frío', 'la Navidad']];
// written exchanges for two neighbours (when there is no AI)
const PAIR_LINES = {
  mixta: [['¿Me da una manzana? Solo una.', 'Toma, pero no le digas a nadie.'], ['¡Mire, encontré un nido!', 'No lo toques, que la madre vuelve.'], ['¿Ya es hora de comer?', 'Todavía no. Anda a jugar un rato.'], ['¡Gané la carrera hasta el portón!', '¡Muy bien! Pero no corras tanto, que te caes.']],
  kids: [['¡Te pillé! ¡Ahora tú la llevas!', '¡No vale, no estaba jugando!'], ['¿Viste? A Gilbert se le fue la botella de leche río abajo.', '¡Ja! Que no se entere el maestro.'], ['¿Jugamos a las escondidas?', 'Bueno, pero yo no cuento esta vez.'], ['Dicen que en el Bosque Encantado hay fantasmas.', 'Eso lo inventó Ana Shirley. ¡Pero igual no voy!']],
  big: [['¡Buenos días! ¿Ya supo lo de la vaca de los Cuthbert?', '¡Si lo sabe todo Avonlea! Esa vaca es más lista que el Sr. Harrison.'], ['Qué lindo día para tender la ropa.', 'Ya lo creo. Y ayer que no paró de llover.'], ['¿Va a la tienda de Lawson?', 'Sí, se me acabó el azúcar. Con tanta compota...'], ['Dicen que el nuevo pastor predica muy bonito.', 'Y la Sra. Allan es un encanto, eso sí.'], ['¿Cómo vienen las papas este año?', 'Buenas, si no llueve demasiado.']],
};
const memOn = k => !!AI.memoria && !!fichaOf(k)?.memoria;
const enc = { cur: null, ready: null, busy: false, mute: {}, cool: 0, err: 0 };
const encP = id => id === 'ana' ? ana : FOLKBY[id];
const encName = id => id === 'ana' ? 'Ana' : FOLKBY[id].def.name;
const encQ = id => id === 'ana' ? 'ana' : 'f:' + id;
const encPlace = (x, y) => game.scene === 'es' ? 'la escuela de Avonlea, en plena clase' : game.scene !== 'out' ? (HOUSES[game.scene]?.inText || 'una casa de Avonlea') : (n => n ? ('Avonlea, cerca de ' + n.replace(/^(La|El|Los) /, m => m.toLowerCase())).replace(/ de el /, ' del ') : 'un camino de Avonlea')(placeNear(x, y));
function encTopic(x, y){ const f = [x, y].filter(i => i !== 'ana').map(i => FOLKBY[i].def.topics).flat(); return pick(Math.random() < .75 && f.length ? f : SEASON_TOPICS[S]); }
// the request, as simple as can be (and the answer: who says what, in order)
function encMsg(x, y, topic){
  const p = encP(x), mem = memOn(x) ? (game.mem[x] || []).slice(-3).map(m => m.replace(/^día \d+: /, '').replace(/\.$/, '')) : [];
  return `Eres ${fichaOf(x).ficha}, de Avonlea («Ana de las Tejas Verdes», L. M. Montgomery). Te encuentras con ${y === 'ana' ? ANA_FICHA : fichaOf(y).ficha}.` + (mem.length ? ` Recuerdas: ${mem.join(' / ')}.` : '') + ` Están en ${encPlace(p.x, p.y)}; es ${SEASONS[S].toLowerCase()} y son las ${fmtHour(hourNow())}. Genera una conversación breve (de 2 a 4 líneas, de hasta 20 palabras) sobre ${topic}.` + (y === 'ana' ? ' Ana también habla.' : '');
}
const ENC_SYS = 'Escribes diálogos breves para un juego tranquilo inspirado en «Ana de las Tejas Verdes» (L. M. Montgomery), hacia 1880, en la isla del Príncipe Eduardo. Español; cada uno con su voz; tono tierno y con humor, como el libro. Responde solo con el JSON pedido.';
async function encAsk(x, y){
  const topic = encTopic(x, y), sch = { type: 'object', additionalProperties: false, required: ['conversacion'], properties: { conversacion: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['quien', 'texto'], properties: { quien: { type: 'string', enum: [x, y] }, texto: { type: 'string' } } } } } };
  const r = await aiCall([{ role: 'user', content: encMsg(x, y, topic) }], sch);
  const lines = (r.out.conversacion || []).filter(l => l && [x, y].includes(l.quien) && typeof l.texto === 'string' && l.texto.trim()).slice(0, 6).map(l => ({ q: encQ(l.quien), t: l.texto.trim().slice(0, 220) }));
  return { parts: [x, y], lines, topic, scene: game.scene, born: TT };
}
function encFallback(x, y){
  if (y === 'ana') { const d = FOLKBY[x].def, l = [{ q: encQ(x), t: pick(lineasDe(x, d.lines)) }]; if (d.ana && Math.random() < .7) l.push({ q: 'ana', t: pick(d.ana) }); return { parts: [x, y], lines: l, topic: '', scene: game.scene, born: TT }; }
  const kx = !!FOLKBY[x].kid, ky = !!FOLKBY[y].kid, [a, b] = pick(PAIR_LINES[kx && ky ? 'kids' : kx || ky ? 'mixta' : 'big'].filter(p => !(/pastor/.test(p[0]) && [x, y].some(i => /allan/.test(i)))));
  const [p, q] = !kx && ky ? [y, x] : [x, y];   // (a child with a grown-up: the child speaks first, as a child)
  return { parts: [x, y], lines: [{ q: encQ(p), t: a }, { q: encQ(q), t: b }], topic: '', scene: game.scene, born: TT };
}
function encStart(s){
  enc.cur = s; s.i = -1; s.wait = .3; bubbles = [];
  const [a, b] = s.parts.map(encP);
  for (const id of s.parts) if (id !== 'ana') { const f = FOLKBY[id]; f.talkT = TT + 1e6; f.route = []; f.moving = false; }
  for (const [p, o] of [[a, b], [b, a]]) if (p !== ana || !ana.moving) { p.dir = o.x < p.x ? 3 : 1; if (Math.abs(o.y - p.y) > Math.abs(o.x - p.x) * 1.2) p.dir = o.y < p.y ? 0 : 2; }
}
function encEnd(){
  const s = enc.cur; enc.cur = null; if (!s) return;
  for (const id of s.parts) if (id !== 'ana') { FOLKBY[id].talkT = TT + 1.5; enc.mute[id] = TT + (s.parts.includes('ana') ? 150 : 90); }
  enc.cool = TT + (s.parts.includes('ana') ? 20 : 40);
  if (s.parts.includes('ana') && s.i >= 0) {
    const o = s.parts.find(i => i !== 'ana'), last = s.lines[Math.min(s.i, s.lines.length - 1)];
    logEv('Ana conversó con ' + FOLKBY[o].def.name + (s.topic ? ' sobre ' + s.topic : '') + '.', []);
    remember(o, 'Conversé con Ana' + (s.topic ? ' sobre ' + s.topic : '') + (last ? '; lo último: «' + last.t.slice(0, 90) + '»' : '') + '.');   // (only if they have memory)
  }
}
function encTick(dt){
  const s = enc.cur, withAna = s.parts.includes('ana');
  if (game.scene !== s.scene || game.talk || game.map || s.parts.some(id => id !== 'ana' && FOLKBY[id].where !== game.scene) || s.parts.every(id => id === 'ana' || dist(ana.x, ana.y, encP(id).x, encP(id).y) > (withAna ? 230 : 420))) { bubbles = []; return encEnd(); }
  if ((s.wait -= dt) > 0) return;
  if (++s.i >= s.lines.length) return encEnd();
  const l = s.lines[s.i], dur = lineDur(l.t); bubbles = [{ q: l.q, text: l.t, t: 0, dur }]; s.wait = dur + .35; sfx.blip();
}
// Ana taps someone: they talk now (with the AI, after a moment: «…»)
function folkTalk(f){
  if (enc.cur?.parts.includes(f.id)) return;
  if (enc.cur) encEnd(); if (amb.cur) ambAbort();
  enc.ready = null; f.talkT = TT + 1e6; f.route = []; f.moving = false;
  if (!aiReady()) return encStart(encFallback(f.id, 'ana'));
  bubbles = [{ q: 'f:' + f.id, text: '…', t: 0, dur: 30 }]; const id = enc.tok = Math.random();
  encAsk(f.id, 'ana').then(s => { if (enc.tok !== id) return; if (!s.lines.length) throw new Error('vacía'); encStart(s); })
    .catch(e => { if (enc.tok !== id) return; console.debug('[avonlea IA] encuentro', e.message); encStart(encFallback(f.id, 'ana')); });
}
function encUpdate(dt){
  if (enc.cur) return encTick(dt);
  if (writtenTalkOn()) return;
  if (amb.cur || amb.ready || game.talk || game.map || game.cooking || !$('ai').hidden || sleeping) return;
  if (ocupada('ana') || hablando() || CHATS.some(c => c.parts.includes('ana'))) return;   // (Ana in the middle of something, or talking with someone, or someone speaking: no loose greetings over it)
  const here = FOLK.filter(f => f.where === game.scene), dd = f => dist(ana.x, ana.y, f.x, f.y), free = f => TT >= (enc.mute[f.id] || 0) && !(f.talkT > TT);
  if (enc.ready) {   // (asked for as Ana came near: it starts when she is there)
    const s = enc.ready, f = FOLKBY[s.parts[0]];
    if (s.scene !== game.scene || TT - s.born > 50 || f.where !== game.scene || dd(f) > 420) enc.ready = null;
    else if (dd(f) < 100) { enc.ready = null; encStart(s); }
    return;
  }
  if (enc.busy || TT < enc.cool || TT < enc.err) return;
  // Ana comes near someone
  let best = null, bd = 1e9; for (const f of here) { const d = dd(f); if (free(f) && d < (aiReady() ? 240 : 90) && d < bd && !f.sit && !ocupada(f.id)) { best = f; bd = d; } }
  if (best) {
    if (!aiReady()) return encStart(encFallback(best.id, 'ana'));
    enc.busy = true;
    return encAsk(best.id, 'ana').then(s => { if (s.lines.length) enc.ready = s; else enc.mute[best.id] = TT + 60; }).catch(e => { console.debug('[avonlea IA] encuentro', e.message); enc.err = TT + 60; }).finally(() => { enc.busy = false; });
  }
  // two of them meet near her (out of doors)
  if (game.scene !== 'out') return;
  const near = here.filter(f => free(f) && dd(f) < 360);
  for (let i = 0; i < near.length; i++) for (let j = i + 1; j < near.length; j++) {
    const a = near[i], b = near[j]; if (dist(a.x, a.y, b.x, b.y) > 70 || Math.random() > .02) continue;
    if (!aiReady()) return encStart(encFallback(a.id, b.id));
    enc.busy = true; a.talkT = b.talkT = TT + 1e6; a.route = []; b.route = []; a.moving = b.moving = false;
    return encAsk(a.id, b.id).then(s => { if (s.lines.length && !amb.cur && !enc.cur) encStart(s); else a.talkT = b.talkT = TT; })
      .catch(e => { a.talkT = b.talkT = TT; enc.err = TT + 60; console.debug('[avonlea IA] encuentro', e.message); }).finally(() => { enc.busy = false; enc.cool = TT + 40; });
  }
}
/* ========== THE WORLD MODEL: things, places, people, verbs, goals and a planner (traditional AI, no generative AI) ==========
   The state of the world is data; a goal is a condition on it; the planner (A* over states, like the paths over the map)
   finds the cheapest sequence of verbs that makes the condition true, and an agent carries it out with the game's own
   functions, finding a new plan when the world changes under it. Everyone uses the same verbs: Ana and the others. */

// --- things: what they are (tags), what they are worth (dollars), how one gets them
// the shop: what Mr. Lawson sells (price in dollars) and what he pays for what Ana brings
// (no money at the shop, as in Avonlea: Ana trades what she brings for a treat, and what the house needs goes in the
// Cuthberts' account book, which Marilla settles at the end of the month)
const TRADE = { leche: 1, huevos: 1, bayas: 1 / 3, manzanas: 1 / 3, ramo: 2, tarta: 4, compota: 4 };   // (what each thing is worth, in trade)
const TREATS = { cinta: 3, caramelos: 1 }, PRICE = { ...TREATS, tinte: 2 };   // (PRICE: also what the peddler sells)                                                     // (what a treat costs, in trade)
const LIBRETA = ['azucar', 'cuerda', 'tela'], LIBRETA_ART = { azucar: 'una taza de azúcar', cuerda: 'una cuerda', tela: 'un corte de tela' };                                                          // (what can be put on the account)
const tradeFor = (inv, c) => Object.entries(TRADE).map(([g, v]) => ({ g, k: Math.ceil(PRICE[c] / v - 1e-9) })).filter(o => (inv[o.g] || 0) >= o.k).sort((a, b) => a.k * TRADE[a.g] - b.k * TRADE[b.g]);
const r2 = n => Math.round(n * 100) / 100;
const eggsToday = () => S === 3 ? 2 : 6;   // (in winter the hens lay little)
const THINGS = {
  bayas: { tags: ['comida', 'cosecha'], valor: .1 }, manzanas: { tags: ['comida', 'cosecha'], valor: .1 },
  tarta: { tags: ['comida', 'hecha_a_mano', 'regalo'], valor: 1, receta: { bayas: 3 } }, compota: { tags: ['comida', 'hecha_a_mano', 'regalo'], valor: 1, receta: { manzanas: 3 } },
  te: { tags: ['bebida', 'regalo'], valor: 0, receta: {} }, ramo: { tags: ['flores', 'hecha_a_mano', 'regalo'], valor: 0 },
  dolares: { tags: ['dinero'] }, cuerda: { tags: ['herramienta'] }, azucar: { tags: ['comida', 'tienda'], valor: .2 }, hierbas: { tags: ['hierba'], valor: .1 },
  vaca: { tags: ['animal'], valor: 20 },
  cinta: { tags: ['adorno', 'regalo'], valor: .3 },
  leche: { tags: ['comida', 'granja'], valor: .1 }, libro: { tags: ['lectura', 'regalo'], valor: .5 }, jarabe: { tags: ['remedio'], valor: .2 }, tela: { tags: ['tienda'], valor: .5 },
  vestido: { tags: ['ropa', 'adorno', 'hecha_a_mano', 'regalo'], valor: 2, receta: { tela: 1 }, hace: 'coser' },
  carta: { tags: ['escrito'], valor: 0 }, cuento: { tags: ['escrito', 'hecha_a_mano'], valor: 0 }, heno: { tags: ['granja'], valor: .2 }, lena: { tags: ['granja'], valor: .2 },
  mantequilla: { tags: ['comida', 'hecha_a_mano', 'regalo'], valor: .5, receta: { leche: 2 }, hace: 'batir' }, canasta: { tags: ['comida'], valor: .5, receta: {}, hace: 'preparar' }, tinte: { tags: ['tienda'], valor: .3 }, caramelos: { tags: ['dulce', 'comida', 'regalo'], valor: .1 }, huevos: { tags: ['comida', 'cosecha'], valor: .05 },
};
const ALL_AT_ONCE = ['bayas', 'manzanas', 'hierbas', 'dolares', 'azucar', 'huevos', 'leche', 'heno', 'lena'];   // (these change hands all together; the rest one by one)
// --- places: a point out of doors ('cocina' is inside Green Gables); what can be done there
const WP = {
  granero: [BARN.x + 60, BARN.y + 50], corral: [AREAS.corral.x + AREAS.corral.w / 2, AREAS.corral.y + AREAS.corral.h / 2], potrero: [AREAS.potrero.x + AREAS.potrero.w / 2, AREAS.potrero.y + AREAS.potrero.h / 2],
  huerta: [PLACES.huerta[1], PLACES.huerta[2]], arbustos: [GG.x - 200, GG.y + 170], huerto: [OS.x - 170, OS.y + 200], cocina: [GG.x, GG.y + 30],
  tienda: door('Tienda de Lawson'), escuela: SCHOOL_DOOR, casa_parroquial: door('Casa parroquial'), bosque_peg: [WOODS[1].x + WOODS[1].rx * .55, WOODS[1].y + 40],
  aldea: PLAY.aldea, lago: [PLACES.lago[1], PLACES.lago[2]], gallinero: [BARN.x + 150, BARN.y + 96], iglesia: CHURCH_DOOR, salon: door('Ayuntamiento'), colina: PLAY.campo_rosado, campo: (f => [f.x + f.w / 2, f.y + f.h / 2])(fieldNear([GG.x + 300, GG.y - 200])),
};
WP.casa_bell = door('Casa de los Pettibone');
const WP_NAME = { casa_bell: 'la casa de Robert Bell', 'h:br': 'la estación de Bright River', 'h:rl': 'la casa de la Sra. Lynde', camino: 'el camino de Bright River', gallinero: 'el gallinero', granero: 'el granero', corral: 'el corral', potrero: 'el potrero del Sr. Harrison', huerta: 'la huerta', arbustos: 'los arbustos de bayas', huerto: 'el huerto de los Barry', cocina: 'la cocina de Tejas Verdes', pieza: 'la pieza de Ana, arriba en Tejas Verdes', tienda: 'la tienda de Lawson', escuela: 'la escuela', casa_parroquial: 'la casa parroquial', 'h:cp': 'la casa parroquial', bosque_peg: 'el bosque de Peg Bowen', aldea: 'la aldea', iglesia: 'la iglesia', salon: 'el salón del pueblo', colina: 'la colina', campo: 'el campo de heno', lago: 'el lago' };
const OFRECE = { gallinero: { recoger: ['huevos'] }, granero: { tomar: ['cuerda'] }, arbustos: { recoger: ['bayas'] }, huerto: { recoger: ['manzanas'] }, huerta: { recoger: ['ramo'] }, bosque_peg: { recoger: ['hierbas'] }, cocina: { tomar: ['jarabe'] } };
for (const k of ['granero', 'corral', 'potrero', 'escuela', 'casa_parroquial', 'tienda']) if (!PLACES[k]) PLACES[k] = [WP_NAME[k], ...WP[k]];   // (so errands can name them)
// --- people: character, likes, what they buy and sell, where they cook, whether they leave the house; and their inventories
const WHO = {
  ana: { caracter: ['soñadora', 'orgullosa', 'rencorosa'], le_gusta: ['flores', 'hecha_a_mano', 'lectura', 'ropa'], cocina: 'cocina', cose: true },
  matthew: { caracter: ['tímido', 'generoso'], le_gusta: ['hecha_a_mano', 'comida'], cocina: 'cocina', inv: { dolares: 5 } },
  marilla: { caracter: ['severo', 'generoso'], le_gusta: ['hecha_a_mano'], cocina: 'cocina', quieto: true, cose: true, regaña: true },
  diana: { caracter: ['sensible', 'generoso'], le_gusta: ['flores', 'comida', 'adorno', 'lectura'], inv: { libro: 1 }, cose: true },
  barry: { caracter: ['severo'], le_gusta: ['flores'], quieto: true, regaña: true },
  lynde: { caracter: ['chismoso', 'severo'], le_gusta: ['comida'], cose: true, regaña: true },
  harrison: { caracter: ['orgulloso'], le_gusta: ['comida'], inv: { cuerda: 1 } },
  shearer: { caracter: [], compra: { animal: 20 }, inv: { dolares: 60 } },
  gilbert: { caracter: ['orgulloso', 'generoso'], le_gusta: ['comida'] },
  sraallan: { caracter: ['generoso', 'sensible'], le_gusta: ['hecha_a_mano', 'flores'], cocina: 'h:cp' },
  peg: { caracter: ['orgulloso'], le_gusta: ['hierba'] },
  medico: { caracter: ['generoso'], le_gusta: [], medico: true },
  buhonero: { caracter: [], le_gusta: [], trueque: true, vende: ['tinte'] },
  lawson: { caracter: ['generoso'], trueque: true, abre: [8, 18], vende: ['cinta', 'caramelos'] },
};
const whoOf = k => WHO[k] || { caracter: [], le_gusta: [] };
const isQuieto = k => !!whoOf(k).quieto || (game.wm?.sick || []).includes(k);
const CUTHBERT = ['ana', 'matthew', 'marilla'];
const d0Home = (here, me) => false;   // (where one can cook: one's own kitchen)
const ITEM_PLACE = { lena: 'granero', heno: 'campo', leche: 'corral' };
const QUEHACERES = ['platos', 'barrer', 'mesa'], QUEHACER_TXT = { platos: 'lavar los platos', barrer: 'barrer la cocina', mesa: 'poner la mesa' };
const JURAN = ['ana', 'diana'];   // (friends of the soul: «mientras duren el sol y la luna»)
const NOMBRES_ANA = { huerta: 'el Valle de las Violetas', arbustos: 'el Sendero de los Abedules', lago: 'el Lago de las Aguas Brillantes', bosque_peg: 'el Bosque Encantado', corral: 'Idlewild' };
const FAMILY = o => o === 'ana' || CUTHBERT.includes(o) ? CUTHBERT : [o];
const HOUSEHOLDS = [CUTHBERT, ['barry', 'diana'], ['allan', 'sraallan'], ['hetty', 'olivia', 'sara'], ['alec', 'janet', 'felicity', 'felix', 'cecily']];
const kin = (a, b) => HOUSEHOLDS.some(h => h.includes(a) && h.includes(b));   // (whose cow it is: the household)
const wmName = k => k === 'ana' ? 'Ana' : NAMES[k] || FOLKBY[k]?.def.name || k;
// the model's own memory: inventories of the others, relations and offences, who knows what, facts of the day
game.wm = game.wm || { inv: {}, rel: { 'ana>josie': 0 }, ofensa: {}, know: {}, facts: {} };   // (Gilbert and the «carrots»: at school, cap. 15, not from the start)
game.wm.perm = game.wm.perm || {};   // (facts for good: friends of the soul, the names Ana gives to places)
const wmInv = k => { if (k === 'ana') return game.inv; const I = game.wm.inv; if (!I[k]) I[k] = { ...(whoOf(k).inv || {}) }; return I[k]; };
for (const k of ['cuerda', 'azucar', 'hierbas']) if (!(k in game.inv)) game.inv[k] = 0;
const relGetW = (a, b) => b === 'ana' && CH[a] ? game.fond[a] ?? 2 : game.wm.rel[a + '>' + b] ?? (a === 'ana' ? 3 : 2);
const relSetW = (a, b, n) => { n = clamp(Math.round(n), -2, 5); if (b === 'ana' && CH[a]) game.fond[a] = clamp(n, 0, 5); else game.wm.rel[a + '>' + b] = n; };

// --- social rules: the same for the planner (on a copy of the state) and for the world (R: get, set, ofensa, fact)
function socialRule(R, verb, from, to, thing){
  const c = whoOf(to).caracter, r = R.get(to, from);
  if (verb === 'dar') { const likes = (THINGS[thing]?.tags || []).some(t => whoOf(to).le_gusta?.includes(t)); if (likes && !R.fact('gusto:' + to + '>' + from)) { R.set(to, from, r + 1); R.setFact('gusto:' + to + '>' + from); } return likes; }
  if (verb === 'disculparse') {
    if (R.fact('disc:' + to + '>' + from)) return false; R.setFact('disc:' + to + '>' + from);   // (once a day counts)
    const soft = c.includes('sensible') || c.includes('generoso');
    R.set(to, from, r + (soft ? 2 : 1)); if (soft || r + 1 >= 1) R.delOfensa(to, from); return true;
  }
  if (verb === 'pedir') return r >= 2 || c.includes('generoso');
  if (verb === 'interceder') { if (r < 4 || R.fact('intercede:' + to + '>' + thing)) return false; R.set(to, thing, R.get(to, thing) + 1); R.setFact('intercede:' + to + '>' + thing); return true; }   // (a dear friend speaks for someone: one step closer)
}
const realR = { get: relGetW, set: relSetW, fact: f => !!game.wm.facts[f + ':' + today()] || !!game.wm.perm[f], setFact: f => { game.wm.facts[f + ':' + today()] = true; }, setPerm: f => { game.wm.perm[f] = true; }, delOfensa: (a, b) => { delete game.wm.ofensa[a + '>' + b]; } };
const stateR = s => ({ get: (a, b) => s.rel[a + '>' + b] ?? 2, set: (a, b, n) => { s.rel[a + '>' + b] = clamp(n, -2, 5); }, fact: f => !!s.facts[f], setFact: f => { s.facts[f] = 1; }, delOfensa: (a, b) => { delete s.ofensa[a + '>' + b]; } });
const wmKnow = (k, f) => { const K = game.wm.know[k] = game.wm.know[k] || []; if (!K.includes(f)) K.push(f); };
const wmFact = (f, who = []) => { for (const k of who) wmKnow(k, f); };

// --- where everyone is, as the model sees it: a place key ('p:k' = out of doors where k stands; 'cocina'; 'h:room')
const wmBody = k => k === 'ana' ? ana : PEOPLE[k] || FOLKBY[k];
const wmScene = k => k === 'ana' ? game.scene : wmBody(k)?.where;
function personKey(k){
  const b = wmBody(k), w = wmScene(k); if (!b || !w || w === 'away' || w === 'in') return null;
  if (w === 'gg') return 'cocina';
  if (w === 'ga') return 'pieza';
  if (w === 'camino') return 'camino';
  if (w !== 'out') return HOUSES[w] ? 'h:' + w : null;
  for (const [p, xy] of Object.entries(WP)) if (AREAS[p] ? inArea(AREAS[p], b.x, b.y) : dist(b.x, b.y, xy[0], xy[1]) < 135) return p;
  return 'p:' + k;
}
function cowKey(a){ if (a.state === 'led') return 'led:' + (a.ledBy || 'ana'); if (a.state === 'bought') return 'sold:' + a.owner; const ar = areaAt(a.x, a.y); return ar === 'corral' || ar === 'potrero' ? ar : 'c:' + a.id; }
function keyPoint(key){
  if (WP[key]) return WP[key];
  if (key === 'camino') return DOOR.br;
  if (key === 'pieza') return DOOR.gg;   // (Ana's room: up the stairs of Green Gables)
  if (key.startsWith('h:')) return DOOR[key.slice(2)];
  if (key.startsWith('c:')) { const a = ANIM[key.slice(2)]; return a ? [a.x, a.y] : null; }
  if (key.startsWith('p:')) { const b = wmBody(key.slice(2)); return b ? [b.x, b.y] : null; }
}
const SPEEDS = { ana: 60 };
const roadMin = k => k === 'h:br' ? ROAD_MIN : k === 'camino' ? ROAD_MIN / 2 : 0;
const travelMin = (who, a, b, pts) => { const p = pts[a], q = pts[b]; if (!p || !q) return 1e6; return 1 + Math.abs(roadMin(a) - roadMin(b)) + dist(p[0], p[1], q[0], q[1]) * 1.3 / (SPEEDS[who] || 40) / MIN_S + (a === 'cocina' || b === 'cocina' || a.startsWith('h:') || b.startsWith('h:') ? 2 : 0); };

// --- the state now (for planning and for checking a goal in the world)
const WM_PEOPLE = () => ['ana', ...Object.keys(CH), 'lawson', 'gilbert', 'sraallan', 'peg', 'medico', 'buhonero'];
function wmNow(){
  const s = { t: hourNow() * 60, pos: {}, invs: {}, cows: {}, rel: {}, ofensa: { ...game.wm.ofensa }, know: {}, follow: {}, facts: {}, stock: {}, sick: [...(game.wm.sick || [])] };
  for (const k of WM_PEOPLE()) { s.pos[k] = personKey(k); s.invs[k] = { ...wmInv(k) }; s.know[k] = [...(game.wm.know[k] || [])]; }
  for (const a of WM_PEOPLE()) for (const b of WM_PEOPLE()) if (a !== b) s.rel[a + '>' + b] = relGetW(a, b);
  for (const a of Object.values(ANIM)) if (a.kind === 'cow') s.cows[a.id] = cowKey(a);
  for (const [f, v] of Object.entries(game.wm.facts)) if (v && f.endsWith(':' + today())) s.facts[f.slice(0, -(':' + today()).length)] = 1;
  for (const f of Object.keys(game.wm.perm)) s.facts[f] = 1;
  if (S === 3) s.facts.invierno = 1;
  if (diana.follow) s.follow.diana = 'ana';
  for (const [k, ag] of Object.entries(AGENTS)) { if (ag.follow) s.follow[k] = ag.follow; if (ag.followOf) s.follow[k] = ag.followOf; }
  const near = (p, r) => WP[p] ? [WP[p][0], WP[p][1], r] : null;
  { const [x, y, r] = near('arbustos', 260); s.stock.bayas = S === 1 || S === 2 ? bushes.filter(b => dist(b.x, b.y, x, y) < r).reduce((n, b) => n + (b.berries || 0), 0) : 0; }
  { const [x, y, r] = near('huerto', 340); s.stock.manzanas = S === 1 || S === 2 ? trees.filter(t => t.kind === 'apple' && dist(t.x, t.y, x, y) < r).reduce((n, t) => n + (t.apples || 0), 0) : 0; }
  s.stock.ramo = S === 3 ? 0 : BEDS.filter(b => b.stage >= 3).length; s.stock.hierbas = S === 3 ? 0 : 9; s.stock.huevos = game.eggDay === today() ? 0 : eggsToday();
  return s;
}
const clone = s => ({ t: s.t, pos: { ...s.pos }, invs: Object.fromEntries(Object.entries(s.invs).map(([k, v]) => [k, { ...v }])), cows: { ...s.cows }, rel: { ...s.rel }, ofensa: { ...s.ofensa }, know: Object.fromEntries(Object.entries(s.know).map(([k, v]) => [k, [...v]])), follow: { ...s.follow }, facts: { ...s.facts }, stock: { ...s.stock }, sick: [...(s.sick || [])] });
const sKey = s => JSON.stringify([s.pos, s.invs, s.cows, s.ofensa, s.follow, s.facts, s.stock, s.sick, Object.entries(s.rel).filter(([k, v]) => v !== 2).sort(), Object.entries(s.know).map(([k, v]) => k + v.length)]);

// --- the verbs: for the one who acts (me) in state s, what can be done, what it costs (minutes) and what it changes
const FAVORS = {   // what one can ask of someone (ok: whether it can be asked; eff: what it makes true; goal: the goal installed in whoever accepts)
  pasear: { eff: (s, me, to) => { s.follow[to] = me; }, ok: (s, me, to) => to === 'ana' || me === 'ana', say: () => '¿Vamos a dar un paseo juntas? Hace un día precioso.' },   // (the one asked comes along)
  // an invitation for later: to come at an hour (tea at the parsonage, this afternoon); the one asked goes then
  venir: { eff: (s, me, to, a) => { s.pos[to] = a.lugar || 'h:cp'; }, ok: (s, me, to) => to === 'ana' || me === 'ana' && to === 'diana', wait: 30,
    goal: (me, a, s0) => { const H = teaHour(s0.t), p = a.lugar || 'h:cp';
      return { ...G.estar_en(a.to, p, H + .25, H + .75), quedar: null, quedarMin: 30, te: 1, con: me, teHasta: H + 1.5, desde: H - 1, text: `ir a tomar el té con ${wmName(me)} a las ${fmtHour(H)} (${WP_NAME[p]})`,
        chat: [[me, '¿Un poco más de té? Y prueba estas galletas.'], [a.to, '¡Están deliciosas! Es como estar en un libro.'], [me, 'Cuéntame qué estás leyendo ahora.'], [a.to, 'Una novela con un castillo y una dama muy triste… ¡me encanta!']] }; },
    say: a => `¿Vendrías a tomar el té conmigo esta tarde, a las ${fmtHour(teaHour(hourNow() * 60))}? En ${(WP_NAME[a.lugar || 'h:cp'] || '').replace(/^(el|la) /, m => m)}.` },
  // (from the book) lending: the one asked hands it over at once (it is to be given back); the chores Marilla asks for; a ride in the cart
  prestar: { eff: (s, me, to, a) => { s.invs[to][a.item] -= 1; s.invs[me][a.item] = (s.invs[me][a.item] || 0) + 1; s.facts['prestado:' + a.item + ':' + to + '>' + me] = 1; }, ok: (s, me, to, a) => (s.invs[to]?.[a.item] || 0) > 0, say: a => `¿Me prestarías ${ITEM_DEFS[a.item]?.gift?.art || itemTextW(a.item, 1)}? Te lo devuelvo, prometido.` },
  curar: { eff: (s, me, to, a) => { s.sick = (s.sick || []).filter(x => x !== a.k); }, ok: (s, me, to, a) => !!whoOf(to).medico && (s.sick || []).includes(a.k), wait: 40, goal: (me, a) => G.sano(a.k), say: a => `¡Doctor! ${wmName(a.k)} está enfermo. ¿Podría venir a verlo, por favor?` },
  quehaceres: { eff: (s, me, to, a) => { for (const q of a.q) s.facts['quehacer:' + q] = 1; }, ok: (s, me, to) => to === 'ana', wait: 30, goal: (me, a) => G.quehaceres(a.to, a.q), say: a => `Ana, hay que ${a.q.map(q => QUEHACER_TXT[q]).join(' y ')}. Y nada de quedarse soñando despierta.` },
  llevar: { eff: (s, me, to, a) => { s.pos[me] = a.lugar; s.pos[to] = a.lugar; }, ok: (s, me, to) => to === 'matthew' && me !== 'matthew', wait: 15, goal: (me, a) => G.llevar(a.to, me, a.lugar), say: a => `Matthew, ¿me llevarías en la calesa a ${WP_NAME[a.lugar]}?` },
  traer: { eff: (s, me, to, a) => { s.invs[me][a.item] = (s.invs[me][a.item] || 0) + a.n; }, ok: (s, me, to, a) => to !== me && (!isQuieto(to) || (s.invs[to]?.[a.item] || 0) >= a.n) && (!THINGS[a.item]?.hace || (s.invs[to]?.[a.item] || 0) >= a.n), wait: 45,   // (a dress is sewn, not fetched: one asks for the cloth)
    goal: (me, a, s0) => G.tener(me, a.item, (s0.invs[me][a.item] || 0) + a.n), say: a => `¿Me traerías ${itemTextW(a.item, a.n)}?` },
  vender_vaca: { eff: (s, me, to, a) => { s.cows[a.cow] = 'sold:' + me; }, ok: (s, me, to, a) => CUTHBERT.includes(to) && s.cows[a.cow] && !s.cows[a.cow].startsWith('sold'), wait: 45, goal: (me, a) => G.vaca_vendida(a.cow, me), say: () => '¿Me vendería la vaca?' },
  encerrar_vaca: { eff: (s, me, to, a) => { s.cows[a.cow] = a.pen; }, ok: (s, me, to, a) => to !== me && !isQuieto(to) && !String(s.cows[a.cow]).startsWith('led') && !String(s.cows[a.cow]).startsWith('sold'), wait: 45, goal: (me, a) => G.vaca_en(a.cow, a.pen),
    say: a => a.cow === 'jersey' && a.pen === 'potrero' ? '¿Me harías el favor de devolver mi vaca al potrero? Yo no me puedo ni levantar.' : `¡${ANIMALS[a.cow].name} anda suelta otra vez! ¿Podrías llevarla a ${WP_NAME[a.pen]}?` },
  interceder: { eff: (s, me, to, a) => { socialRule(stateR(s), 'interceder', to, a.target, me); }, ok: (s, me, to, a) => (s.rel[a.target + '>' + to] ?? 2) >= 4 && !s.facts['intercede:' + a.target + '>' + me], wait: 20,
    goal: (me, a) => G.intercede(a.target, me), say: a => `¿Hablarías con ${wmName(a.target)} por mí? A ti te escucha.` },
};
// whom one could ask for help with a goal (anyone present who is not in the chain of who asked whom)
function autoFavors(me, goal, s0, exclude = []){
  if (exclude.length >= 2) return [];   // (no longer chains than: A asks B, who asks C)
  const cands = WM_PEOPLE().filter(k => k !== me && !exclude.includes(k) && s0.pos[k] && (!isQuieto(me) || s0.pos[k] === s0.pos[me] || k === 'ana') && (kin(me, k) || relGetW(k, me) >= 3)), out = [];   // (one asks one's own, or a friend; one who cannot go out, those with them, or sends for Ana)
  if (goal.kind === 'tener') { const miss = goal.n - (s0.invs[goal.k]?.[goal.x] || 0); if (miss > 0) for (const k of cands) { out.push({ f: 'traer', to: k, item: goal.x, n: miss }); for (const [i, n] of Object.entries(THINGS[goal.x]?.receta || {})) if ((s0.invs[goal.k]?.[i] || 0) < n * miss) out.push({ f: 'traer', to: k, item: i, n: n * miss - (s0.invs[goal.k]?.[i] || 0) }); } }   // (or what it is made of: the cloth for a dress)
  if (goal.kind === 'vaca_en') for (const k of cands) out.push({ f: 'encerrar_vaca', to: k, cow: goal.c, pen: goal.p });
  if (goal.kind === 'sano' && me !== 'medico' && s0.pos.medico) out.push({ f: 'curar', to: 'medico', k: goal.k });   // (one goes to fetch the doctor)
  if (goal.kind === 'rel_min' && goal.b === me) for (const k of cands) if (relGetW(goal.a, k) >= 4) out.push({ f: 'interceder', to: k, target: goal.a });
  return out;
}
function verbs(s, me, C){
  const L = [], here = s.pos[me], inv = s.invs[me], W = whoOf(me), at = k => s.pos[k] && s.pos[k] === here && k !== me;
  const add = (v, cost, eff, a = {}) => { if (!cuadernoCerrada(v, a)) L.push({ v, cost, eff, ...a }); };   // (what belongs to a goal of the book still closed: not yet, by anyone)
  const ride = me === 'matthew' && Object.values(s.follow).includes(me);   // (Matthew with someone in the cart: much faster)
  if (!isQuieto(me) || C.sale) for (const p of C.places) if (p !== here && C.pts[p]) add('ir',   // (one who stays at home goes out for a goal that says so: Marilla to the Barrys)
     travelMin(me, here, p, C.pts) / (ride ? 2.4 : 1), t => { t.pos[me] = p; for (const [f, w] of Object.entries(t.follow)) if (w === me) t.pos[f] = p; }, { p });
  const of = OFRECE[here] || {};
  for (const x of of.tomar || []) if (!(inv[x] > 0) && C.items.includes(x) && !(x === 'jarabe' && game.wm.sinJarabe)) add('tomar', 1, t => { t.invs[me][x] = 1; }, { x });
  for (const x of of.recoger || []) if (s.stock[x] > 0 && (inv[x] || 0) < 9) { const n = Math.min(x === 'ramo' ? 1 : x === 'huevos' ? 9 : 3, s.stock[x]); add('recoger', 3, t => { t.invs[me][x] = (t.invs[me][x] || 0) + n; t.stock[x] -= n; }, { x, n }); }
  if (here === W.cocina || d0Home(here, me)) for (const [x, d] of Object.entries(THINGS)) if (d.receta && C.items.includes(x) && (d.hace !== 'coser' || W.cose) && Object.entries(d.receta).every(([i, n]) => (inv[i] || 0) >= n) && (inv[x] || 0) < 3) add(d.hace || 'cocinar', d.hace === 'coser' ? 30 : 10, t => { for (const [i, n] of Object.entries(d.receta)) t.invs[me][i] -= n; t.invs[me][x] = (t.invs[me][x] || 0) + 1; }, { x });
  for (const k of C.people) if (at(k)) {
    for (const x of Object.keys(inv)) if (inv[x] > 0 && THINGS[x] && x !== 'cuerda' && C.items.includes(x)) { const n = ALL_AT_ONCE.includes(x) ? inv[x] : 1; add('dar', 1, t => { t.invs[me][x] -= n; t.invs[k][x] = (t.invs[k][x] || 0) + n; for (const tag of THINGS[x].tags) t.facts['dio:' + k + ':' + tag] = 1; t.facts['dio:' + k + ':' + x] = 1; t.facts['dio:' + x] = 1; socialRule(stateR(t), 'dar', me, k, x); }, { x, k, n }); }
    const buys = whoOf(k).compra || {};
    if (buys.animal) for (const [c, st] of Object.entries(s.cows)) if (st === 'led:' + me && FAMILY(C.owner[c]).includes(me)) add('vender', 5, t => { t.cows[c] = 'sold:' + k; t.invs[me].dolares = (t.invs[me].dolares || 0) + buys.animal; t.know[me].push('vendio_vaca'); t.know[k].push('vendio_vaca'); }, { x: 'vaca', cow: c, k });
    const open = !whoOf(k).abre || (s.t >= whoOf(k).abre[0] * 60 && s.t < whoOf(k).abre[1] * 60);
    if (open && whoOf(k).trueque) {
      for (const c of whoOf(k).vende || Object.keys(TREATS)) if (C.items.includes(c) && (inv[c] || 0) < 2) for (const o of tradeFor(inv, c).slice(0, 2)) add('cambiar', 4, t => { t.invs[me][o.g] -= o.k; t.invs[me][c] = (t.invs[me][c] || 0) + 1; }, { x: c, g: o.g, n: o.k, k });
      if (CUTHBERT.includes(me) && (!whoOf(k).vende || k === 'lawson')) for (const x of LIBRETA) if (C.items.includes(x) && (inv[x] || 0) < 2) add('comprar', 4, t => { t.invs[me][x] = (t.invs[me][x] || 0) + 1; }, { x, k });
    }
    if ((s.know[k] || []).some(f => !s.know[me].includes(f)) || (s.know[me] || []).some(f => !(s.know[k] || []).includes(f))) add('conversar', 2, t => { const u = [...new Set([...t.know[me], ...t.know[k]])]; t.know[me] = [...u]; t.know[k] = [...u]; }, { k });
    if (s.ofensa[k + '>' + me] && !s.facts['disc:' + k + '>' + me]) add('disculparse', 2, t => { socialRule(stateR(t), 'disculparse', me, k); }, { k });
    if (C.intercede && C.intercede[0] === k && !s.facts['intercede:' + k + '>' + C.intercede[1]]) add('interceder', 2, t => { socialRule(stateR(t), 'interceder', me, k, C.intercede[1]); t.facts['intercede:' + k + '>' + C.intercede[1]] = 1; }, { k, por: C.intercede[1] });
    // (from the book) a visit to someone at home; giving back what was lent; friends of the soul; forgiving; caring for the sick; scolding; taking someone in the cart
    if (C.kind === 'visitar' && ((s.pos[k] || '').startsWith('h:') || s.pos[k] === 'cocina' && !CUTHBERT.includes(me))) if (!s.facts['visita:' + me + '>' + k]) add('visitar', 12, t => { t.facts['visita:' + me + '>' + k] = 1; t.rel[k + '>' + me] = Math.min(5, (t.rel[k + '>' + me] ?? 2) + 1); }, { k });
    if (C.kind === 'devuelto') for (const f of Object.keys(s.facts)) { const m = f.match(/^prestado:(\w+):(\w+)>(\w+)$/); if (m && m[2] === k && m[3] === me && inv[m[1]] > 0) add('devolver', 1, t => { t.invs[me][m[1]] -= 1; t.invs[k][m[1]] = (t.invs[k][m[1]] || 0) + 1; delete t.facts[f]; t.facts['devuelto:' + m[1] + ':' + me + '>' + k] = 1; t.rel[k + '>' + me] = Math.min(5, (t.rel[k + '>' + me] ?? 2) + 1); }, { k, x: m[1] }); }
    { const pair = 'amigas:' + [me, k].sort().join('&'); if (C.kind === 'amigas' && !s.facts[pair] && JURAN.includes(me) && JURAN.includes(k) && (s.rel[k + '>' + me] ?? 2) >= 4 && (s.rel[me + '>' + k] ?? 3) >= 4) add('jurar', 5, t => { t.facts[pair] = 1; t.rel[k + '>' + me] = 5; t.rel[me + '>' + k] = 5; }, { k }); }
    if (C.kind === 'paces' && s.ofensa[me + '>' + k] && (s.facts['disc:' + me + '>' + k] || (s.rel[me + '>' + k] ?? 2) >= 1)) add('perdonar', 2, t => { delete t.ofensa[me + '>' + k]; t.rel[me + '>' + k] = Math.min(5, (t.rel[me + '>' + k] ?? 2) + 1); }, { k });
    if (C.kind === 'sano' && (s.sick || []).includes(k) && (inv.jarabe > 0 || W.medico)) add('cuidar', 15, t => { t.sick = t.sick.filter(x => x !== k); if (!W.medico) t.invs[me].jarabe -= 1; t.rel[k + '>' + me] = Math.min(5, (t.rel[k + '>' + me] ?? 2) + 2); }, { k });
    if (C.kind === 'regañado' && W.regaña && s.facts['falta:' + k] && !s.facts['regaño:' + k]) add('regañar', 3, t => { t.facts['regaño:' + k] = 1; delete t.facts['falta:' + k]; }, { k });
    if (C.lleva === k && s.follow[k] !== me) add('subir_calesa', 3, t => { t.follow[k] = me; }, { k });
    if (C.kind === 'club' && inv.cuento > 0 && JURAN.includes(k) && !s.facts['club:' + me]) add('leer_cuento', 8, t => { t.invs[me].cuento -= 1; t.facts['club:' + me] = 1; }, { k });
    if (C.kind === 'felicitar' && (s.facts['concierto:' + k] || s.facts['recito:' + k]) && !s.facts['felicito:' + me + '>' + k]) add('felicitar', 2, t => { t.facts['felicito:' + me + '>' + k] = 1; t.rel[k + '>' + me] = Math.min(5, (t.rel[k + '>' + me] ?? 2) + 1); }, { k });
    if (C.kind === 'consolado' && s.facts['triste:' + k] && !s.facts['consolo:' + me + '>' + k]) add('consolar', 5, t => { delete t.facts['triste:' + k]; t.facts['consolo:' + me + '>' + k] = 1; t.rel[k + '>' + me] = Math.min(5, (t.rel[k + '>' + me] ?? 2) + 1); }, { k });
    if (C.kind === 'picnic' && here === 'lago' && inv.canasta > 0 && (me !== 'ana' || s.facts['permiso:picnic']) && !s.facts['picnic:' + me]) add('merendar', 20, t => { t.invs[me].canasta -= 1; t.facts['picnic:' + me] = 1; t.facts['picnic:' + k] = 1; }, { k });
    for (const f of C.favors) { const F = FAVORS[f.f]; if (f.to === k && F.ok(s, me, k, f) && socialRule(stateR(s), 'pedir', me, k) && !s.facts['pedido:' + f.f + ':' + k]) add('pedir', 2 + (F.wait || 0) + (isQuieto(me) ? 0 : 40), t => { F.eff(t, me, k, f); t.facts['pedido:' + f.f + ':' + k] = 1; }, { k, favor: f }); }
  }
  if (C.kind === 'regañado' && W.regaña && isQuieto(me) && !at('ana') && s.facts['falta:ana'] && !s.facts['regaño:ana']) add('regañar', 3 + 25, t => { t.facts['regaño:ana'] = 1; delete t.facts['falta:ana']; }, { k: 'ana', llamar: true });   // (sends for her, to scold her)
  // (from the book) the chores, milking, feeding the animals, sickness, study, prayers, flowers on the hat, the boat, names for places
  if (C.kind === 'quehaceres' && me === C.k && here === 'cocina') for (const q of QUEHACERES) if (!s.facts['quehacer:' + q]) add('quehacer', 6, t => { t.facts['quehacer:' + q] = 1; if (me !== 'marilla' && !t.facts['gracias:' + me]) { t.facts['gracias:' + me] = 1; t.rel['marilla>' + me] = Math.min(5, (t.rel['marilla>' + me] ?? 2) + 1); } }, { x: q });
  if (C.items.includes('leche') && here === 'corral' && !isQuieto(me)) for (const [c, st] of Object.entries(s.cows)) if (st === 'corral' && !s.facts['ordeñada:' + c]) add('ordeñar', 8, t => { t.invs[me].leche = (t.invs[me].leche || 0) + 2; t.facts['ordeñada:' + c] = 1; }, { cow: c });
  if (C.kind === 'alimentados' && (here === 'corral' || here === 'gallinero') && !s.facts['alimentados:' + here]) add('alimentar', 4, t => { t.facts['alimentados:' + here] = 1; }, { p: here });
  if (C.kind === 'recito' && (here === 'escuela' || here === 'h:es' || here === W.cocina) && !(s.know[me] || []).includes('leccion')) add('estudiar', 20, t => { t.know[me] = [...(t.know[me] || []), 'leccion']; });
  if (C.kind === 'recito' && (here === 'escuela' || here === 'h:es') && (s.know[me] || []).includes('leccion') && !s.facts['recito:' + me]) add('recitar', 3, t => { t.facts['recito:' + me] = 1; });
  if (C.kind === 'rezo' && (here === W.cocina || here === 'iglesia') && !s.facts['rezo:' + me]) add('rezar', 3, t => { t.facts['rezo:' + me] = 1; });
  if (C.kind === 'adornado' && inv.ramo > 0 && !s.facts['adorno:' + me]) add('adornar', 2, t => { t.invs[me].ramo -= 1; t.facts['adorno:' + me] = 1; });
  if (C.kind === 'remo' && here === 'lago' && !s.facts['invierno'] && !s.facts['remo:' + me]) add('remar', 15, t => { t.facts['remo:' + me] = 1; });
  if (C.kind === 'nombres' && me === 'ana' && NOMBRES_ANA[here] && !s.facts['nombre:' + here]) add('nombrar', 2, t => { t.facts['nombre:' + here] = 1; }, { p: here });
  // (from the book, second batch) letters and books, the story club, the concert, the farm, winter, the picnic, the dye, the dare
  const home = me === 'ana' ? here === 'cocina' || here === 'pieza' : here === W.cocina || (here || '').startsWith('h:');   // (Ana writes at home, not in the hall or the shop)
  if (C.kind === 'carta' && home && !(inv.carta > 0) && !s.facts['carta_enviada:' + me]) add('escribir_carta', 8, t => { t.invs[me].carta = 1; });
  if (C.kind === 'carta' && here === 'tienda' && inv.carta > 0) add('enviar_carta', 2, t => { t.invs[me].carta -= 1; t.facts['carta_enviada:' + me] = 1; });
  if (C.kind === 'leido' && inv.libro > 0 && !s.facts['leido:' + me]) add('leer', 20, t => { t.facts['leido:' + me] = 1; });
  if (C.kind === 'club' && home && !(inv.cuento > 0) && !s.facts['club:' + me]) add('escribir_cuento', 20, t => { t.invs[me].cuento = 1; });
  if (C.kind === 'concierto' && (here === 'escuela' || here === 'h:es' || here === 'salon' || here === 'h:sa') && !(s.know[me] || []).includes('poema')) add('ensayar', 15, t => { t.know[me] = [...(t.know[me] || []), 'poema']; });
  if (C.kind === 'concierto' && (here === 'salon' || here === 'h:sa') && (s.know[me] || []).includes('poema') && !s.facts['concierto:' + me]) add('actuar', 5, t => { t.facts['concierto:' + me] = 1; });
  if (C.kind === 'sala' && (here === 'salon' || here === 'h:sa') && inv.ramo > 0 && !s.facts['sala_decorada']) add('decorar_sala', 6, t => { t.invs[me].ramo -= 1; t.facts['sala_decorada'] = 1; });
  if (C.items.includes('heno') && here === 'campo' && !isQuieto(me) && !s.facts['heno_hecho']) add('hacer_heno', 25, t => { t.invs[me].heno = (t.invs[me].heno || 0) + 3; t.facts['heno_hecho'] = 1; });
  if (C.items.includes('lena') && here === 'granero' && !isQuieto(me) && (inv.lena || 0) < 3) add('partir_lena', 10, t => { t.invs[me].lena = (t.invs[me].lena || 0) + 3; });
  if (C.kind === 'huerta' && here === 'huerta' && !s.facts['sembrado']) add('sembrar', 10, t => { t.facts['sembrado'] = 1; });
  if (C.kind === 'huerta' && here === 'huerta' && s.facts['sembrado'] && !s.facts['regado']) add('regar', 5, t => { t.facts['regado'] = 1; });
  if (C.kind === 'patinar' && here === 'lago' && s.facts['invierno'] && !s.facts['patino:' + me]) add('patinar', 15, t => { t.facts['patino:' + me] = 1; });
  if (C.kind === 'trineo' && here === 'colina' && s.facts['invierno'] && !s.facts['trineo:' + me]) add('trineo', 15, t => { t.facts['trineo:' + me] = 1; });
  if (C.kind === 'picnic' && me === 'ana' && here === 'cocina' && at('marilla') && (!C.jugador || S === 1) && !s.facts['permiso:picnic']) add('pedir_permiso', 2, t => { t.facts['permiso:picnic'] = 1; });
  if (C.kind === 'teñido' && (me === 'ana' ? here === 'pieza' : here === W.cocina) && inv.tinte > 0 && !s.facts['pelo_teñido:' + me]) add('teñir', 10, t => { t.invs[me].tinte -= 1; t.facts['pelo_teñido:' + me] = 1; });
  if (C.kind === 'pelo_corto' && here === 'cocina' && (s.facts['pelo_teñido:ana'] || s.facts['pelo_verde']) && !s.facts['pelo_corto']) add('cortar_pelo', 6, t => { t.facts['pelo_corto'] = 1; delete t.facts['pelo_verde']; });
  if (C.kind === 'desafio' && here === 'huerto' && s.facts['desafiada:' + me] && !s.facts['trepo:' + me]) add('trepar', 6, t => { t.facts['trepo:' + me] = 1; });
  if (isQuieto(me) && !at('ana')) for (const f of C.favors) { const F = FAVORS[f.f]; if (f.to === 'ana' && F.ok(s, me, 'ana', f) && !s.facts['pedido:' + f.f + ':ana']) add('pedir', 2 + (F.wait || 0) + 25, t => { F.eff(t, me, 'ana', f); t.facts['pedido:' + f.f + ':ana'] = 1; }, { k: 'ana', favor: f, llamar: true }); }   // (sends for her: she comes, then is asked)
  for (const [c, st] of Object.entries(s.cows)) {
    if (st === here && inv.cuerda > 0 && !Object.values(s.cows).includes('led:' + me) && (FAMILY(C.owner[c]).includes(me) || st.startsWith('c:'))) add('guiar', 2, t => { t.cows[c] = 'led:' + me; }, { cow: c });
    if (st === 'led:' + me && (here === 'corral' || here === 'potrero')) add('soltar', 1, t => { t.cows[c] = here; }, { cow: c, p: here });
  }
  return L;
}

// --- the goals: a condition (test), how far it is (h: steps missing, roughly), and what matters for it
const PLACE_ROOM = { escuela: 'es', iglesia: 'ig' }, CLASES_FIN = 12;
const teaHour = t => Math.min(19, Math.max(17, Math.ceil(t / 60 + 1.5)));   // (an invitation to tea: at five, or a little later if it is late already)   // (classes: from 9 to noon)   // (a place with a room to be in: one goes in to stay)
const G = {
  tener: (k, x, n) => ({ kind: 'tener', k, x, n, text: `${wmName(k)} tiene ${itemTextW(x, n)}`, test: s => (s.invs[k][x] || 0) >= n, h: s => { const miss = n - (s.invs[k][x] || 0); if (miss <= 0) return 0; const held = Object.entries(s.invs).some(([w, I]) => w !== k && (I[x] || 0) >= miss); return 1 + (held ? 0 : THINGS[x]?.receta ? 2 : 1) + (THINGS[x]?.receta ? Math.ceil(miss / 1) - 1 : 0); }, items: [x, ...Object.keys(THINGS[x]?.receta || {}), ...(TREATS[x] ? Object.keys(TRADE).flatMap(g => [g, ...Object.keys(THINGS[g]?.receta || {})]) : [])], people: [k, ...(TREATS[x] || LIBRETA.includes(x) ? ['lawson'] : [])] }),
  dinero: (k, n) => ({ text: `${wmName(k)} junta ${n} dólares`, test: s => (s.invs[k].dolares || 0) >= n - 1e-9, h: s => moneyH(s.invs[k], n), items: ['tarta', 'compota', 'bayas', 'manzanas'], people: [k, 'lawson', 'shearer'] }),
  regalo_gusto: (k, to) => ({ text: `${wmName(k)} le regala a ${wmName(to)} algo que le guste`, test: s => (whoOf(to).le_gusta || []).some(t => s.facts['dio:' + to + ':' + t]), h: s => (whoOf(to).le_gusta || []).some(t => s.facts['dio:' + to + ':' + t]) ? 0 : 2, items: Object.keys(THINGS).filter(x => THINGS[x].tags.some(t => whoOf(to).le_gusta?.includes(t))).flatMap(x => [x, ...Object.keys(THINGS[x].receta || {})]), people: [k, to] }),
  reconciliar: (k, to) => ({ text: `${wmName(k)} se reconcilia con ${wmName(to)}`, test: s => (s.rel[to + '>' + k] ?? 2) >= 2 && !s.ofensa[to + '>' + k], h: s => ((s.rel[to + '>' + k] ?? 2) >= 2 ? 0 : 1) + (s.ofensa[to + '>' + k] ? 1 : 0), items: ['tarta', 'bayas', 'ramo'], people: [k, to] }),
  intercede: (t, por) => ({ kind: 'intercede', text: `hablar con ${wmName(t)} por ${wmName(por)}`, test: s => !!s.facts['intercede:' + t + '>' + por], h: s => s.facts['intercede:' + t + '>' + por] ? 0 : 1, items: [], people: [t], intercede: [t, por] }),
  rel_min: (a, b, n, by) => ({ kind: 'rel_min', a, b, n, text: `que ${wmName(a)} quiera a ${wmName(b)} al menos ${n}`, test: s => (s.rel[a + '>' + b] ?? 2) >= n, h: s => Math.max(0, n - (s.rel[a + '>' + b] ?? 2)), items: ['tarta', 'bayas'], people: [a, b] }),
  // (quedar: an hour until which one stays there once arrived, as at school until classes end; the goal is done then)
  estar_en: (k, p, hasta, quedar) => { const at = s => s.pos[k] === p || (PLACE_ROOM[p] && s.pos[k] === 'h:' + PLACE_ROOM[p]);
    return { kind: 'estar_en', text: `${wmName(k)} está en ${WP_NAME[p] || p}` + (hasta ? ' antes de las ' + fmtHour(hasta) : '') + (quedar ? ' y se queda hasta las ' + fmtHour(quedar) : ''), test: s => at(s) && (!hasta || s.t <= hasta * 60), h: s => at(s) ? 0 : 1 + Math.abs(roadMin(p) - roadMin(s.pos[k])) / 40, items: [], people: [k], places: [p], deadline: hasta, quedar, room: PLACE_ROOM[p] }; },
  vaca_en: (c, p) => ({ kind: 'vaca_en', c, p, text: `${ANIMALS[c].name} queda en ${WP_NAME[p]}`, test: s => s.cows[c] === p, h: s => s.cows[c] === p ? 0 : String(s.cows[c]).startsWith('led') ? 1 : 2, items: ['cuerda'], people: [], places: [p] }),
  vaca_vendida: (c, to) => ({ text: `${ANIMALS[c].name} vendida${to ? ' a ' + wmName(to) : ''}`, test: s => to ? s.cows[c] === 'sold:' + to : String(s.cows[c]).startsWith('sold'), h: s => String(s.cows[c]).startsWith('sold') ? 0 : String(s.cows[c]).startsWith('led') ? 1 : 2, items: ['cuerda'], people: to ? [to] : ['shearer'] }),
  conoce: (k, f) => ({ text: `${wmName(k)} se entera (${f.replace(/_/g, ' ')})`, test: s => (s.know[k] || []).includes(f), h: s => (s.know[k] || []).includes(f) ? 0 : 1, items: [], people: [k, ...WM_PEOPLE().filter(p => (game.wm.know[p] || []).includes(f))] }),
  paseo: (a, b, p = 'lago', min = 30) => ({ kind: 'paseo', a, b, text: `${wmName(a)} y ${wmName(b)} dan un paseo hasta ${WP_NAME[p]}`, test: s => s.pos[a] === p && s.pos[b] === p && s.follow[b] === a,
    h: s => (s.follow[b] === a ? 0 : 1) + (s.pos[a] === p ? 0 : 1), items: [], people: [a, b], places: [p], quedarMin: min,
    chat: [[a, '¡Mira cómo brilla el agua!'], [b, 'Es el Lago de las Aguas Brillantes: yo le puse el nombre, ¿sabes?'], [a, '¿Y si fuéramos amigas del alma para siempre?'], [b, '¡Para siempre jamás!'], [a, 'Qué lindo es esto…'], [b, 'Podríamos quedarnos aquí toda la tarde.']] }),
  // (from the book)
  quehaceres: (k, list) => ({ kind: 'quehaceres', k, text: `${wmName(k)} hace los quehaceres (${list.map(q => QUEHACER_TXT[q]).join(', ')})`, test: s => list.every(q => s.facts['quehacer:' + q]), h: s => list.filter(q => !s.facts['quehacer:' + q]).length, items: [], people: [k], places: ['cocina'] }),
  alimentados: list => ({ kind: 'alimentados', text: 'los animales comieron (' + list.map(p => WP_NAME[p]).join(', ') + ')', test: s => list.every(p => s.facts['alimentados:' + p]), h: s => list.filter(p => !s.facts['alimentados:' + p]).length, items: [], people: [], places: list }),
  visitar: (a, b) => ({ kind: 'visitar', text: `${wmName(a)} visita a ${wmName(b)}`, test: s => !!s.facts['visita:' + a + '>' + b], h: s => s.facts['visita:' + a + '>' + b] ? 0 : s.pos[a] === s.pos[b] ? 1 : 2, items: [], people: [a, b] }),
  devuelto: (a, x, b) => ({ kind: 'devuelto', text: `${wmName(a)} le devuelve ${ITEM_DEFS[x]?.gift?.art || x} a ${wmName(b)}`, test: s => !!s.facts['devuelto:' + x + ':' + a + '>' + b], h: s => s.facts['devuelto:' + x + ':' + a + '>' + b] ? 0 : 1, items: [x], people: [a, b] }),
  amigas: (a, b) => ({ kind: 'amigas', text: `${wmName(a)} y ${wmName(b)} juran ser amigas del alma`, test: s => !!s.facts['amigas:' + [a, b].sort().join('&')], h: s => s.facts['amigas:' + [a, b].sort().join('&')] ? 0 : 1, items: [], people: [a, b] }),
  paces: (a, b) => ({ kind: 'paces', text: `${wmName(a)} y ${wmName(b)} hacen las paces`, test: s => !s.ofensa[a + '>' + b] && !s.ofensa[b + '>' + a], h: s => (s.ofensa[a + '>' + b] ? 1 : 0) + (s.ofensa[b + '>' + a] ? 1 : 0), items: [], people: [a, b] }),
  sano: k => ({ kind: 'sano', k, text: `${wmName(k)} se mejora`, test: s => !(s.sick || []).includes(k), h: s => (s.sick || []).includes(k) ? 1 : 0, items: ['jarabe'], people: [k], places: ['aldea', 'cocina'] }),
  recito: k => ({ kind: 'recito', text: `${wmName(k)} aprende la lección y la recita en la escuela`, test: s => !!s.facts['recito:' + k], h: s => s.facts['recito:' + k] ? 0 : (s.know[k] || []).includes('leccion') ? 1 : 2, items: [], people: [k], places: ['escuela'] }),
  rezo: k => ({ kind: 'rezo', text: `${wmName(k)} dice sus oraciones`, test: s => !!s.facts['rezo:' + k], h: s => s.facts['rezo:' + k] ? 0 : 1, items: [], people: [k], places: ['iglesia'] }),
  adornado: k => ({ kind: 'adornado', text: `${wmName(k)} adorna su sombrero con flores`, test: s => !!s.facts['adorno:' + k], h: s => s.facts['adorno:' + k] ? 0 : (s.invs[k].ramo ? 1 : 2), items: ['ramo'], people: [k] }),
  remo: k => ({ kind: 'remo', text: `${wmName(k)} rema en el lago`, test: s => !!s.facts['remo:' + k], h: s => s.facts['remo:' + k] ? 0 : 1, items: [], people: [k], places: ['lago'] }),
  nombres: (k, n) => ({ kind: 'nombres', text: `${wmName(k)} le pone nombre a ${n} lugares`, test: s => Object.keys(NOMBRES_ANA).filter(p => s.facts['nombre:' + p]).length >= n, h: s => Math.max(0, n - Object.keys(NOMBRES_ANA).filter(p => s.facts['nombre:' + p]).length), items: [], people: [k], places: Object.keys(NOMBRES_ANA) }),
  regañado: k => ({ kind: 'regañado', text: `regañar a ${wmName(k)} por la falta`, test: s => !!s.facts['regaño:' + k], h: s => s.facts['regaño:' + k] ? 0 : 1, items: [], people: [k] }),
  carta: k => ({ kind: 'carta', text: `${wmName(k)} escribe una carta y la manda por correo`, test: s => !!s.facts['carta_enviada:' + k], h: s => s.facts['carta_enviada:' + k] ? 0 : s.invs[k].carta ? 1 : 2, items: ['carta'], people: [k], places: ['tienda', 'cocina'] }),
  leido: k => ({ kind: 'leido', text: `${wmName(k)} lee un libro`, test: s => !!s.facts['leido:' + k], h: s => s.facts['leido:' + k] ? 0 : s.invs[k].libro ? 1 : 2, items: ['libro'], people: [k] }),
  club: k => ({ kind: 'club', text: `${wmName(k)} escribe un cuento y se lo lee al club de cuentos`, test: s => !!s.facts['club:' + k], h: s => s.facts['club:' + k] ? 0 : s.invs[k].cuento ? 1 : 2, items: ['cuento'], people: [k, 'diana'], places: ['cocina'] }),
  concierto: k => ({ kind: 'concierto', text: `${wmName(k)} ensaya y recita en el concierto del salón`, test: s => !!s.facts['concierto:' + k], h: s => s.facts['concierto:' + k] ? 0 : (s.know[k] || []).includes('poema') ? 1 : 2, items: [], people: [k], places: ['salon', 'escuela'] }),
  sala: k => ({ kind: 'sala', text: `${wmName(k)} decora el salón con flores para el concierto`, test: s => !!s.facts['sala_decorada'], h: s => s.facts['sala_decorada'] ? 0 : s.invs[k].ramo ? 1 : 2, items: ['ramo'], people: [k], places: ['salon', 'huerta'] }),
  felicitar: (a, b) => ({ kind: 'felicitar', text: `${wmName(a)} felicita a ${wmName(b)}`, test: s => !!s.facts['felicito:' + a + '>' + b], h: s => s.facts['felicito:' + a + '>' + b] ? 0 : 1, items: [], people: [a, b] }),
  consolado: (a, b) => ({ kind: 'consolado', text: `${wmName(a)} consuela a ${wmName(b)}`, test: s => !s.facts['triste:' + b], h: s => s.facts['triste:' + b] ? 1 : 0, items: [], people: [a, b] }),
  huerta: k => ({ kind: 'huerta', text: `${wmName(k)} siembra y riega la huerta`, test: s => !!s.facts['regado'], h: s => s.facts['regado'] ? 0 : s.facts['sembrado'] ? 1 : 2, items: [], people: [k], places: ['huerta'] }),
  patinar: k => ({ kind: 'patinar', text: `${wmName(k)} patina en el lago helado`, test: s => !!s.facts['patino:' + k], h: s => s.facts['patino:' + k] ? 0 : 1, items: [], people: [k], places: ['lago'] }),
  trineo: k => ({ kind: 'trineo', text: `${wmName(k)} se tira en trineo por la colina`, test: s => !!s.facts['trineo:' + k], h: s => s.facts['trineo:' + k] ? 0 : 1, items: [], people: [k], places: ['colina'] }),
  picnic: (a, b) => ({ kind: 'picnic', text: `${wmName(a)} va de picnic al lago con ${wmName(b)}`, test: s => !!s.facts['picnic:' + a], h: s => s.facts['picnic:' + a] ? 0 : (s.invs[a].canasta ? 0 : 1) + (s.facts['permiso:picnic'] || a !== 'ana' ? 0 : 1) + (s.follow[b] === a ? 0 : 2) + (s.pos[a] === 'lago' ? 0 : 1) + 1, items: ['canasta'], people: [a, b, 'marilla'], places: ['lago', 'cocina'] }),
  teñido: k => ({ kind: 'teñido', text: `${wmName(k)} se tiñe el pelo de negro azabache`, test: s => !!s.facts['pelo_teñido:' + k], h: s => s.facts['pelo_teñido:' + k] ? 0 : s.invs[k].tinte ? 1 : 2, items: ['tinte', 'huevos'], people: [k, 'buhonero'], places: ['cocina', 'pieza', 'gallinero'] }),
  pelo_corto: k => ({ kind: 'pelo_corto', text: `a ${wmName(k)} le cortan el pelo verde`, test: s => !!s.facts['pelo_corto'], h: s => s.facts['pelo_corto'] ? 0 : 1, items: [], people: [k], places: ['cocina'] }),
  desafio: k => ({ kind: 'desafio', text: `${wmName(k)} acepta el desafío de Josie y camina por el techo de los Barry`, test: s => !!s.facts['trepo:' + k], h: s => s.facts['trepo:' + k] ? 0 : 1, items: [], people: [k], places: ['huerto'] }),
  llevar: (by, k, p) => ({ kind: 'llevar', text: `${wmName(by)} lleva a ${wmName(k)} en la calesa a ${WP_NAME[p]}`, test: s => s.pos[by] === p && s.pos[k] === p, h: s => (s.follow[k] === by || s.pos[k] === p ? 0 : 1) + (s.pos[by] === p ? 0 : 1 + Math.abs(roadMin(p) - roadMin(s.pos[by])) / 40), items: [], people: [by, k], places: [p], lleva: k }),
  acompana: (a, b) => ({ text: `${wmName(a)} acompaña a ${wmName(b)}`, test: s => s.follow[a] === b, h: s => s.follow[a] === b ? 0 : 1, items: [], people: [a, b] }),
  te_con: (k, g, p) => ({ text: `${wmName(k)} toma el té con ${wmName(g)} en ${WP_NAME[p]}`, test: s => s.pos[g] === p && s.pos[k] === p && (s.invs[k].te || 0) >= 1, h: s => (s.pos[g] === p ? 0 : 1) + (s.pos[k] === p ? 0 : 1) + ((s.invs[k].te || 0) >= 1 ? 0 : 1), items: ['te'], people: [k, g], places: [p], quedarMin: 30, te: 0 }),   // (then they sit down to it: she who receives, te 0, and the visit, te 1)
  regalar_cosa: (k, x) => ({ text: `${wmName(k)} regala ${ITEM_NAME[x]?.[0] || x}`, test: s => !!s.facts['dio:' + x], h: s => s.facts['dio:' + x] ? 0 : (s.invs[k][x] ? 1 : 2), items: [x, ...Object.keys(THINGS[x]?.receta || {})], people: [k, 'diana', 'marilla', 'matthew'] }),
};
// how many steps, roughly, to n dollars: selling what is made (1), cooking what is gathered (2), gathering (3); a cow, 2 at most
function moneyH(I, n){
  let d = n - (I.dolares || 0); if (d <= 1e-9) return 0;
  let h = 0, made = (I.tarta || 0) + (I.compota || 0), raw = Math.floor((I.bayas || 0) / 3) + Math.floor((I.manzanas || 0) / 3);
  while (d > 1e-9) { h += made > 0 ? (made--, 1) : raw > 0 ? (raw--, 2) : 3; d -= 1; }
  return Math.min(h, 4);
}
// a thing in words: one with its article («una taza de azúcar», «un frasco de tinte»), more with the number
const itemTextW = (x, n) => !ITEM_NAME[x] ? n + ' ' + x : n === 1 ? (ITEM_DEFS[x]?.gift?.art && !/^(el|la) /.test(ITEM_DEFS[x].gift.art) ? ITEM_DEFS[x].gift.art : (/a$/.test(ITEM_NAME[x][0].split(' ')[0]) ? 'una ' : 'un ') + ITEM_NAME[x][0]) : itemText(x, n);

// --- the planner: A* over states (weighted: the steps missing count as 25 minutes each); at most 6000 states
// first one looks for a way to do it oneself (with the favors the goal names); only if there is none, whom to ask
function wmPlan(me, goal, favors = [], s0 = wmNow(), exclude = []){
  favors = favors.filter(f => !exclude.includes(f.to));
  let own = wmSearch(me, goal, favors, s0, 1500); if (own.ok) return own;
  if (own.n >= 1500 && exclude.length) { own = wmSearch(me, goal, favors, s0, 6000); if (own.ok) return own; }   // (a favor asked: if the search ran out of room, not of ways, once more and wider)
  const more = autoFavors(me, goal, s0, exclude); if (!more.length) return own;
  const r = wmSearch(me, goal, [...favors, ...more], s0, 2500); return r.ok || !own.plan ? r : own;
}
function wmSearch(me, goal, favors, s0, cap){
  const people = [...new Set([me, ...goal.people, ...WM_PEOPLE().filter(k => whoOf(k).compra || whoOf(k).vende), ...favors.map(f => f.to)])].filter(k => s0.pos[k]);
  const items = [...new Set([...(goal.items || []), 'dolares'])];   // (only the things that matter for this goal)
  // only the places that matter: where the people and the cows are, where the things needed are got, the kitchen, the goal's own
  const places = new Set([...(goal.places || []), whoOf(me).cocina, 'corral', 'potrero'].filter(Boolean));
  for (const [p, o] of Object.entries(OFRECE)) if ([...(o.tomar || []), ...(o.recoger || [])].some(x => items.includes(x) || x === 'cuerda' && Object.keys(s0.cows).length)) places.add(p);
  for (const [x, p] of Object.entries(ITEM_PLACE)) if (items.includes(x)) places.add(p);   // (where things are made: firewood in the barn, hay in the field)
  for (const k of people) places.add(s0.pos[k]); for (const st of Object.values(s0.cows)) if (keyPoint(st)) places.add(st);
  const pts = {}; for (const p of places) { const q = keyPoint(p); if (q) pts[p] = q; }
  pts[s0.pos[me]] = pts[s0.pos[me]] || (wmBody(me) ? [wmBody(me).x, wmBody(me).y] : null);
  const owner = Object.fromEntries(Object.keys(s0.cows).map(c => [c, ANIM[c].owner || ANIMALS[c].owner]));
  const C = { places: [...places].filter(p => pts[p]), pts, people, items: [...items, 'cuerda', 'azucar', 'hierbas'], favors, owner, intercede: goal.intercede, lleva: goal.lleva, sale: goal.sale, kind: goal.kind, k: goal.k };
  const heap = [], push = o => { heap.push(o); let i = heap.length - 1; while (i > 0) { const j = (i - 1) >> 1; if (heap[j].f <= heap[i].f) break; [heap[i], heap[j]] = [heap[j], heap[i]]; i = j; } };
  const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < heap.length && heap[l].f < heap[m].f) m = l; if (r < heap.length && heap[r].f < heap[m].f) m = r; if (m === i) break; [heap[i], heap[m]] = [heap[m], heap[i]]; i = m; } } return top; };
  push({ s: s0, g: 0, f: goal.h(s0) * 40, path: [] }); const seenK = new Map([[sKey(s0), 0]]);
  let best = { h: goal.h(s0), g: 0, path: [] }, n = 0;
  while (heap.length && n++ < cap) {
    const cur = pop();
    if (goal.test(cur.s)) return { plan: cur.path, cost: cur.g, n, ok: true, C };
    const h = goal.h(cur.s); if (h < best.h || (h === best.h && cur.g < best.g && cur.path.length)) best = { h, g: cur.g, path: cur.path };
    if (cur.path.length >= 12) continue;
    for (const a of verbs(cur.s, me, C)) {
      const t = clone(cur.s); a.eff(t); t.t += a.cost;
      if (goal.deadline && t.t > goal.deadline * 60 + 1) continue;
      const k = sKey(t), g = cur.g + a.cost;
      if (seenK.has(k) && seenK.get(k) <= g) continue; seenK.set(k, g);
      push({ s: t, g, f: g + goal.h(t) * 40, path: [...cur.path, a] });
    }
  }
  return best.path.length && best.h < goal.h(s0) ? { plan: best.path, cost: best.g, n, ok: false, partial: true, C } : { plan: null, n, ok: false };
}
const stepText = a => ({ ir: () => 'ir a ' + (WP_NAME[a.p] || wmPlaceText(a.p)), tomar: () => 'tomar ' + itemTextW(a.x, 1), recoger: () => 'recoger ' + itemTextW(a.x, a.n), cocinar: () => a.x === 'te' ? 'preparar el té' : 'cocinar ' + itemTextW(a.x, 1),
  dar: () => `darle ${itemTextW(a.x, a.n)} a ${wmName(a.k)}`, vender: () => `vender ${a.x === 'vaca' ? ANIMALS[a.cow].name : itemTextW(a.x, 1)} a ${wmName(a.k)}`, comprar: () => `comprar ${itemTextW(a.x, 1)} a la libreta de los Cuthbert`, cambiar: () => `cambiar ${itemTextW(a.g, a.n)} por ${itemTextW(a.x, 1)}`,
  conversar: () => 'conversar con ' + wmName(a.k), interceder: () => `hablar con ${wmName(a.k)} por ${wmName(a.por)}`, disculparse: () => 'disculparse con ' + wmName(a.k), pedir: () => `pedirle a ${wmName(a.k)} ` + ({ traer: `que le traiga ${itemTextW(a.favor.item, a.favor.n)}`, encerrar_vaca: `que lleve a ${ANIMALS[a.favor.cow]?.name} a ${WP_NAME[a.favor.pen]}`, interceder: `que hable con ${wmName(a.favor.target)} por él`, vender_vaca: 'que le venda la vaca', pasear: 'que den un paseo juntas', venir: 'que venga a tomar el té más tarde', prestar: `que le preste ${ITEM_DEFS[a.favor.item]?.gift?.art || a.favor.item}`, curar: `que venga a ver a ${wmName(a.favor.k)}`, quehaceres: 'que haga los quehaceres', llevar: `que la lleve en la calesa a ${WP_NAME[a.favor.lugar]}` }[a.favor.f] || a.favor.f), guiar: () => 'guiar a ' + ANIMALS[a.cow].name,
  quehacer: () => QUEHACER_TXT[a.x], ordeñar: () => 'ordeñar a ' + ANIMALS[a.cow].name, alimentar: () => 'dar de comer a los animales en ' + (WP_NAME[a.p] || 'el corral'), visitar: () => 'visitar a ' + wmName(a.k), devolver: () => `devolverle ${ITEM_DEFS[a.x]?.gift?.art || a.x} a ${wmName(a.k)}`,
  jurar: () => 'jurar ser amigas del alma con ' + wmName(a.k), perdonar: () => 'perdonar a ' + wmName(a.k), cuidar: () => 'cuidar a ' + wmName(a.k), estudiar: () => 'estudiar la lección', recitar: () => 'recitar la lección',
  rezar: () => 'decir sus oraciones', escribir_carta: () => 'escribir una carta', enviar_carta: () => 'mandar la carta por correo', leer: () => 'leer un libro', escribir_cuento: () => 'escribir un cuento', leer_cuento: () => 'leerle su cuento a ' + wmName(a.k),
  ensayar: () => 'ensayar la recitación', actuar: () => 'recitar en el concierto', decorar_sala: () => 'decorar el salón con flores', felicitar: () => 'felicitar a ' + wmName(a.k), consolar: () => 'consolar a ' + wmName(a.k), hacer_heno: () => 'hacer heno', partir_lena: () => 'partir leña',
  tomar_te: () => 'tomar el té con ' + wmName(a.k), sembrar: () => 'sembrar la huerta', regar: () => 'regar la huerta', patinar: () => 'patinar en el lago', trineo: () => 'tirarse en trineo', pedir_permiso: () => 'pedirle permiso a Marilla', merendar: () => 'merendar en el lago con ' + wmName(a.k), teñir: () => 'teñirse el pelo', cortar_pelo: () => 'cortarse el pelo', trepar: () => 'caminar por el techo de los Barry',
  batir: () => a.x === 'mantequilla' ? 'batir la mantequilla' : 'batir ' + itemTextW(a.x, 1), preparar: () => 'preparar ' + itemTextW(a.x, 1), adornar: () => 'adornar el sombrero con flores', remar: () => 'remar en el lago', nombrar: () => 'ponerle nombre a ' + WP_NAME[a.p], regañar: () => 'regañar a ' + wmName(a.k), subir_calesa: () => `subir a ${wmName(a.k)} a la calesa`, coser: () => 'coser ' + itemTextW(a.x, 1), soltar: () => `soltar a ${ANIMALS[a.cow].name} en ${WP_NAME[a.p]}` }[a.v] || (() => a.v))().replace(/\b(a|con|de) (Sra?|Srta)\. /g, (m, p, t) => p + (t === 'Sr' ? ' el ' : ' la ') + t + '. ').replace(/\ba el\b/g, 'al').replace(/\bde el\b/g, 'del');   // (to Mrs. Lynde: «a la Sra. Lynde», «al Sr. Harrison»)
const wmPlaceText = p => p.startsWith('p:') ? 'donde está ' + wmName(p.slice(2)) : p.startsWith('c:') ? 'donde está ' + ANIMALS[p.slice(2)].name : p.startsWith('h:') ? HOUSES[p.slice(2)].place[1] : WP_NAME[p] || p;
