/* ---------- letters: written to someone (Ana reads it aloud as she writes), taken to the post office (Lawson's store),
   they arrive a day or a few later (Charlottetown is farther), and the answer comes back days or weeks after: it waits
   at the post office until Ana asks for it, and then she can read it. ---------- */
const CORREO = {
  diana: { nombre: 'Diana', donde: 'aquí en Avonlea, en La Cuesta del Huerto', dias: 1, resp: [2, 4] },
  stacy: { nombre: 'la Srta. Stacy', donde: 'en la pensión de Avonlea', dias: 1, resp: [3, 6] },
  sraallan: { nombre: 'la Sra. Allan', donde: 'en la casa parroquial', dias: 1, resp: [2, 5] },
  josephine: { nombre: 'la Srta. Josephine Barry', donde: 'en Charlottetown', dias: 3, resp: [7, 14] },
  spencer: { nombre: 'la Sra. Spencer', donde: 'en White Sands', dias: 2, resp: [5, 10] },
};
// what Ana writes (the greeting, the body, the signature) is in src/datos/dichos/12-cartas.txt: carta_saludo:<to whom>,
// carta_cuerpo:<to whom> (one letter per line, its lines split by « / »; used when the writing is not a scene: Ana's own
// letters to Mrs. Spencer are scenes, carta_spencer_* in src/datos/guion.txt), carta_firma:<to whom>
// the answers are scenes of the script too (src/datos/guion.txt, «canal: respuesta»): who answers (de), to which of Ana's
// letters (responde: the scene she wrote it in), and what must be true when they answer (si); one not said yet, if there is
function cartaRespuesta(c){
  game.respAhora = c.para;
  const L = DIALOGOS.filter(d => d.canal === 'respuesta' && d.de === c.para && (!d.responde || d.responde === c.escena) && dlgCumple(d, dlgCtx()));
  game.respAhora = null;
  const d = [...L].sort((a, b) => (!!b.responde - !!a.responde) || (a.dicha() - b.dicha()))[0];
  if (!d) return dicho('carta_respuesta', { firma: cap(CORREO[c.para].nombre) }).split(' / ');
  dlgDichas()[d.id] = true;
  return d.lineas().filter(l => l[0] === 'carta').map(l => l[1].replace('{estacion}', ESTACION_TXT[S]));
}
const ESTACION_TXT = ['los cerezos están en flor', 'el sol de verano madura las bayas', 'los arces se pusieron rojos', 'la nieve cubre el Camino Blanco de las Delicias'];
const cartas = () => game.cartas || (game.cartas = []);
const YO = { 'fue': 'fui', 'recogió': 'recogí', 'cocinó': 'cociné', 'preparó': 'preparé', 'regó': 'regué', 'sembró': 'sembré', 'visitó': 'visité', 'patinó': 'patiné', 'remó': 'remé', 'leyó': 'leí', 'juró': 'juré', 'adornó': 'adorné', 'estudió': 'estudié', 'recitó': 'recité', 'decoró': 'decoré', 'lavó': 'lavé', 'barrió': 'barrí', 'puso': 'puse', 'cuidó': 'cuidé', 'consoló': 'consolé', 'felicitó': 'felicité', 'perdonó': 'perdoné', 'bautizó': 'bauticé', 'se tiró': 'me tiré', 'se tiñó': 'me teñí', 'le dio': 'le di', 'le regaló': 'le regalé', 'le devolvió': 'le devolví', 'ensayó': 'ensayé', 'se sentó': 'me senté' };
function cartaNoticia(){   // something that really happened to her lately, told by her: «Hoy fui de picnic al lago con Diana.»
  const J = (game.journal || []).slice().reverse().filter(e => e.d >= today() && /^Ana /.test(e.t) && !/carta|correo/.test(e.t));
  for (const e of J) { const r = e.t.slice(4); for (const [a, b] of Object.entries(YO)) if (r.startsWith(a + ' ')) return 'Hoy ' + b + r.slice(a.length).replace(/\.$/, '') + '.'; }
  return null;
}
function cartaTexto(para){
  const k = CORREO[para] ? para : 'stacy', estacion = ESTACION_TXT[S], body = dicho('carta_cuerpo:' + k, { estacion }).split(' / ');
  const nov = cartaNoticia();
  return [dicho('carta_saludo:' + k), dicho('carta_apertura', { estacion }), ...(nov ? [nov] : []), ...body, dicho('carta_firma:' + k)];
}
// a letter can also be given to someone of the house who goes by the village (Matthew, Marilla): they leave it at the
// post office the next day, with the mail
const LLEVAN_CARTAS = ['matthew', 'marilla'];
function cartaEncargoOpciones(who){
  const c = cartas().find(x => x.de === 'ana' && x.estado === 'escrita');
  if (!LLEVAN_CARTAS.includes(who) || !c || !(game.inv.carta > 0)) return [];
  return [['✉️ Pedirle que lleve la carta para ' + CORREO[c.para].nombre + ' al correo', () => {
    game.inv.carta -= 1; c.estado = 'encargada'; c.lleva = who; c.envio = today() + 1;
    logEv(`Ana le pidió a ${wmName(who)} que llevara al correo su carta para ${CORREO[c.para].nombre}.`, [who]);
    say(who, dicho('lleva_carta:' + who, { nombre: CORREO[c.para].nombre }), [['¡Gracias!', close]]); save();
  }]];
}
// the post goes round once in a while: what was sent arrives; what was answered comes back to the post office
let correoT = 0;
function correoTick(dt){
  if ((correoT -= dt) > 0) return; correoT = 3;
  const d = today();
  for (const c of cartas()) {
    const C = CORREO[c.para];
    if (c.estado === 'encargada' && d >= c.envio) { c.estado = 'enviada'; logEv(`${cap(wmName(c.lleva))} dejó en el correo la carta de Ana para ${C?.nombre || '…'}.`, []); }   // (taken by someone of the house: it goes with the next day's mail)
    if (c.estado === 'enviada' && C && d >= c.envio + C.dias) { c.estado = 'entregada'; c.llego = d; cartaAfecto(c.para); c.resp = d + C.resp[0] + Math.floor(Math.random() * (C.resp[1] - C.resp[0] + 1)); logEv(`${cap(C.nombre)} recibió la carta de Ana.`, []); }
    if (c.estado === 'entregada' && d >= c.resp) { c.estado = 'respondida'; cartas().push({ id: cartas().length + 1, de: c.para, para: 'ana', texto: cartaRespuesta(c), dia: d, estado: 'en_correo' }); notice(`📬 Llegó una carta para Ana de ${CORREO[c.para].nombre}: está en la oficina de correos (la tienda de Lawson).`); logEv(`Llegó al correo una carta de ${CORREO[c.para].nombre} para Ana.`, []); }
  }
}
// at the post office: Ana asks for her mail; at home (or anywhere), she reads it
function correoRetirar(){
  const L = cartas().filter(c => c.para === 'ana' && c.estado === 'en_correo'); if (!L.length) return say('lawson', dicho('correo_nada'), [['← Volver', () => shopMenu()]]);
  for (const c of L) c.estado = 'recibida'; logEv(`Ana retiró del correo ${L.length === 1 ? 'una carta de ' + CORREO[L[0].de].nombre : L.length + ' cartas'}.`, []); save();
  say('lawson', L.length === 1 ? dicho('correo_una_carta', { de: CORREO[L[0].de].nombre }) : dicho('correo_cartas', { n: L.length }), [['📜 Leerla ahora', () => cartaLeer(L[0])], ['← Volver', () => shopMenu()]]);
}
function cartaLeer(c, i = 0){
  c.estado = 'leida'; if (!i) logEv(`Ana leyó la carta de ${CORREO[c.de].nombre}.`, []);
  const L = c.texto, last = i >= L.length - 1;
  say('Ana', L[i], last ? [['Guardarla', close]] : [['Seguir leyendo', () => cartaLeer(c, i + 1)], ['Guardarla para después', () => { c.estado = 'recibida'; close(); }]]);
}