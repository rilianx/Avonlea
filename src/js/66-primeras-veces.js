/* ---------- the first time: a scene of its own; the window and the candle; her hat in the wardrobe ----------
   - Each thing and each place has its line of scenes (src/datos/guion.txt): the first time Ana does something (looks out
     of her window, sees herself in the mirror, climbs to her room, sees the sea from the lighthouse…), its step 1; later,
     the next steps, and the wildcard; with «tambien», the thing is done too (climbing the stairs).
   - The window of her room, once Diana and she have agreed on the signals (the conversation conv_diana_vela, cap. 18):
     in the evening, a candle and a piece of cardboard, flashes to Diana's window across the trees (senas_vela).
   - Her hat: she can take it off and keep it in the wardrobe of her room, and put it on again. */
// (the scenes of a thing or a place were renamed by their line and step: the games saved before keep what was said)
const ESC_RENOMBRE = {"primera_gwin": "ventana_1", "ventana_a_prueba": "ventana_2", "ventana_se_queda": "ventana_3", "ventana_diana": "ventana_4", "ventana_zanahorias": "ventana_5", "ventana_prohibida": "ventana_6", "ventana_perdonada": "ventana_7", "ventana_estudia": "ventana_8", "ventana_queens": "ventana_9", "ventana_primavera_manana": "ventana_10", "ventana_primavera_tarde": "ventana_11", "ventana_primavera_noche": "ventana_12", "ventana_verano_manana": "ventana_13", "ventana_verano_noche": "ventana_14", "ventana_otono": "ventana_15", "ventana_otono_gansos": "ventana_16", "ventana_otono_noche": "ventana_17", "ventana_invierno": "ventana_18", "ventana_invierno_noche": "ventana_19", "ventana_madrugada": "ventana_20", "primera_mirror": "espejo_1", "espejo_tejas_verdes": "espejo_2", "espejo_pelo": "espejo_3", "espejo_zanahorias": "espejo_4", "espejo_cordelia": "espejo_5", "espejo_estudio": "espejo_6", "espejo_invierno": "espejo_7", "primera_armario": "armario_1", "armario_vestidos": "armario_2", "armario_otono": "armario_3", "armario_invierno": "armario_4", "primera_bed": "cama_1", "primera_cage": "ginger_1", "ginger_loro": "ginger_2", "primera_escenario": "escenario_1", "primera_faro": "faro_1", "faro_manana": "faro_2", "faro_verano": "faro_3", "faro_invierno": "faro_4", "faro_queens": "faro_5", "primera_frascos": "frascos_1", "frascos_caramelos": "frascos_2", "frascos_matthew": "frascos_3", "primera_geranio": "geranio_1_1", "geranio_sola": "geranio_1_2", "primera_pizarra": "pizarra_1", "pizarra_zanahorias": "pizarra_2", "pizarra_estudio": "pizarra_3", "primera_stairs": "escalera_1", "primera_toby": "pelusa_1", "pelusa_verano": "pelusa_2", "pelusa_invierno": "pelusa_3", "banco_lago_primavera": "banco_lago_1", "banco_lago_diana": "banco_lago_2", "banco_lago_atardecer": "banco_lago_3", "banco_lago_invierno": "banco_lago_4", "fuego_noche": "fuego_1", "fuego_otono": "fuego_2", "fuego_invierno": "fuego_3", "pupitre_diana": "pupitre_1", "pupitre_gilbert": "pupitre_2", "libros_pastor": "libros_1", "iglesia_banco": "banco_iglesia_1", "iglesia_allan": "banco_iglesia_2", "lugar_camino_blanco_primavera": "camino_blanco_1", "lugar_camino_blanco_flor": "camino_blanco_2", "lugar_camino_blanco_otono": "camino_blanco_3", "lugar_primera_nieve": "camino_blanco_4", "lugar_camino_blanco_invierno": "camino_blanco_5", "lugar_mar_primera": "playa_1", "lugar_playa": "playa_2", "lugar_playa_invierno": "playa_3", "lugar_puente": "puente_1", "lugar_puente_diana": "puente_2", "lugar_puente_invierno": "puente_3", "lugar_bosque_manana": "bosque_1", "lugar_bosque_crepusculo": "bosque_2", "lugar_bosque_invierno": "bosque_3", "lugar_lago_niebla": "lago_brillante_1", "lugar_lago_verano": "lago_brillante_2", "lugar_huerta_brotes": "huerta_1", "lugar_huerta_verano": "huerta_2", "lugar_cuesta_huerto": "cuesta_del_huerto_1", "lugar_cuesta_prohibida": "cuesta_del_huerto_2", "lugar_rio_escuela": "rio_1", "lugar_iglesia": "iglesia_1", "lugar_granero": "granero_1", "lugar_escuela_abedules": "escuela_abedules_1", "lugar_corral_idlewild": "corral_1", "lugar_campo_rosado": "campo_rosado_1", "lugar_aldea": "aldea_1"};
{ const D = dlgDichas(); for (const [a, b] of Object.entries(ESC_RENOMBRE)) if (D[a] != null && D[b] == null) { D[b] = D[a]; delete D[a]; } }
// the line of a thing or a place (src/datos/guion.txt, «Las líneas de las cosas y los lugares»): its steps («paso: 1»,
// «2», «4.1»…) and its wildcard («paso: siempre»). A step is said when one of its variants is
const lineaDe = k => DIALOGOS.filter(d => (d.disparo === 'objeto' && d.objeto === k) || (d.disparo === 'lugar' && d.lugar === k));
const pasoNum = d => d.paso === 'siempre' ? Infinity : Math.floor(parseFloat(String(d.paso ?? 99)));
const pasoDicho = (d, L) => d.paso !== 'siempre' && L.some(o => o !== d && o.paso !== 'siempre' && pasoNum(o) === pasoNum(d) && o.dicha());
// of those that can be said now: the first step not said yet (the order is a preference: one of winter waits, it does
// not stop the line); of its variants, the one that asks more; if no step can be, the wildcard
function lineaElegir(C){
  const pasos = C.filter(d => d.paso !== 'siempre'); if (!pasos.length) return C.length ? pick(C) : null;
  const m = Math.min(...pasos.map(pasoNum)), T = pasos.filter(d => pasoNum(d) === m), v = d => (d.prioridad || 0) + dlgEspecificidad(d) * .001, top = Math.max(...T.map(v));
  return pick(T.filter(d => v(d) === top));
}
// (the wildcard, only once the line has begun: the first time is its step 1, or nothing)
const lineaEmpezada = L => !L.some(o => pasoNum(o) === 1) || L.some(o => pasoNum(o) === 1 && o.dicha());
const lineaPuede = (k, x, f = () => true) => { const L = lineaDe(k), ya = lineaEmpezada(L); return L.filter(d => !d.dicha() && !pasoDicho(d, L) && (ya || d.paso !== 'siempre') && f(d) && dlgCumple(d, x)); };
// the first time: the first step of its line, whenever she does it (in her room, the first night: her bed)
function primeraVez(id, act){
  const d = lineaElegir(lineaPuede(id, dlgCtx(), d => pasoNum(d) === 1)); if (!d) return false;
  if (d.tambien) act(true);   // (done too, quietly: the scene tells it)
  for (const t of TALKS.filter(t => t.ch === d.canal)) talkEnd(t);   // (what she was saying to herself gives way to this)
  d.decir(); return true;
}
// a scene of a line that plays by itself («sola»), with no touching: when its conditions hold, and Ana is where it says
// («en: ana=ga»): the first night, as soon as she is up in her room, she throws herself on the bed
function lineaSola(){
  const x = dlgCtx(), d = lineaElegir(DIALOGOS.filter(d => d.sola && (d.objeto || d.lugar) && !d.dicha() && !pasoDicho(d, lineaDe(d.objeto || d.lugar)) && dlgCumple(d, x)));
  if (!d) return false;
  for (const t of TALKS.filter(t => t.ch === d.canal)) talkEnd(t);
  d.decir(); return true;
}
// the scenes of a thing (disparo: objeto, objeto: <what>): looking out of the window, at the mirror, at the sea… its
// line, step by step; at most one a day for each thing. The rest of the times, the plain line as always.
let ACT_SOLA = false;   // (Ana doing it on her own, on her way to something: the plain line, she has things to do)
function escenaObjeto(id, act){
  const W = game.wm; if (!W || ana.sit || ACT_SOLA || (id === 'gwin' && velaPuede() && act !== true)) return false;   // (the window, with the candle: its menu first)
  const H = (W.objHoy ||= {}), k = id.split(':')[0]; if (H[k] === today()) return false;   // (bed:3 is a bed of the garden: «objeto: bed»)
  const d = lineaElegir(lineaPuede(k, dlgCtx())); if (!d) return false;
  H[k] = today(); if (d.tambien && typeof act === 'function') act(true);
  for (const t of TALKS.filter(t => t.ch === d.canal)) talkEnd(t);
  d.decir(); return true;
}
// the scenes of a place (disparo: lugar, lugar: <a place of Avonlea>): when Ana passes by on her own feet, free (not on
// her way to an errand of hers), the place says something to her: the Haunted Wood at dusk, the bridge over the brook,
// the White Way… once a day each place, and not one right after another
let lugaresT = 0, lugarRespiro = 0;
const LUGAR_CERCA = 150, LUGAR_RESPIRO = M(40);
function lugaresTick(dt){
  if ((lugaresT -= dt) > 0) return; lugaresT = 2;
  const W = game.wm; if (!W || game.scene !== 'out' || (CAP1.on && !CAP1.done) || wsSinLugares()) return;   // (crying by the sea, or at Mrs. Spencer's: not the time for the places)
  const H = (W.lugarHoy ||= {}), x = dlgCtx(), cerca = Object.entries(PLACES).filter(([k, p]) => H[k] !== today() && dist(ana.x, ana.y, p[1], p[2]) <= LUGAR_CERCA);
  const de = (k, f) => lineaPuede(k, x, f);
  // a scene that interrupts whatever is going on (as the Avenue in bloom, on the way from Bright River): it does not
  // wait for the talk to end, nor for Ana to be free; it cuts what is being said (unless Ana is choosing something)
  for (const [k] of cerca) {
    const d = lineaElegir(de(k, d => d.interrumpe)); if (!d || !interrumpirTodo(d.prioridad || 0)) continue;
    H[k] = today(); lugarRespiro = TT + LUGAR_RESPIRO; d.decir(); return;
  }
  if (ana.sit || ana.goto?.auto || ana.goto?.wm || cart.riding) return;
  if (TT < lugarRespiro || hablando() || amb.cur || game.talk || TALKS.some(t => t.lines.some(l => l.q === 'ana'))) return;
  for (const [k] of cerca) {
    const d = lineaElegir(de(k, d => !d.interrumpe)); if (!d) continue;
    H[k] = today(); lugarRespiro = TT + LUGAR_RESPIRO; d.decir(); return;
  }
}
// to interrupt: the loose talk, the bubbles, the chats on the way, the talks of less priority; not a choice of the
// player (a menu, a choice in a scene, a card being read). Ana stops where she is; what she was doing waits.
function interrumpirTodo(prio){
  if (TALKS.some(t => t.elige || t.narra || (t.prio ?? 0) >= prio && t.lines.some(l => l.q === 'ana')) || (game.talk && menuOpen()) || sleeping) return false;
  if (amb.cur) ambEnd(); bubbles = [];
  for (const c of CHATS.filter(c => c.parts.includes('ana'))) chatEnd(c);
  for (const t of TALKS.filter(t => (t.prio ?? 0) < prio)) { t.interrupted = true; talkEnd(t); }
  if (ana.goto && !ana.goto.auto && !ana.goto.wm) ana.goto = null;   // (the player had sent her somewhere: she stops; her own errands just wait)
  return true;
}
// the candle at the window: once they have agreed on the signals, friends still, in the evening
function velaPuede(){ return dianaAmiga() && !!dlgDichas().conv_diana_vela && hourNow() % 24 >= 19; }
function ventana(){
  if (!velaPuede()) return comentar('ventana');
  say('Ana', 'Por la ventana, entre los árboles, se ve la luz de la pieza de Diana.', [
    ['🕯 Hacerle señas a Diana con la vela', () => { close(); const d = DIALOGOS.find(x => x.id === 'senas_vela'); if (d && !d.dicha()) d.decir(); else anaSays(dicho('vela_ya_hecha')); }],
    ['Mirar por la ventana', () => { close(); escenaObjeto('gwin', true) || comentar('ventana'); }],
    ['Nada por ahora', close],
  ]);
}
// her hat: off, into the wardrobe (it hangs there on its peg); and on again
function sombrero(callada){
  const W = game.wm, sin = !W.sinSombrero; W.sinSombrero = sin;
  if (!callada) anaSays(sin ? dicho('sombrero_guardar') : dicho('sombrero_poner'));
  logEv(sin ? 'Ana se sacó el sombrero y lo guardó en el armario.' : 'Ana sacó su sombrero del armario y se lo puso.', []); save();
}
// her clothes: to bed in her nightgown, and up in it; she dresses when the player decides (at the wardrobe, as with the
// hat). The first night she leaves her dress and shoes thrown on the floor: the player decides, the next day, whether
// she folds them and puts them away (Marilla notices: a little more affection) or puts them on just as they are
const ROPA_SUELO = () => [GA.bed.x - 98, GA.bed.y + 22], ROPA_SILLA = () => [GA.table.x + 46, GA.table.y + 6];
// going to bed: folded on the chair (Marilla notices it the first time: a little more affection), or thrown on the floor
// (and in the morning Marilla says so)
function ropaAlAcostarse(dobla){
  const W = game.wm;
  if (dobla) { W.ropaSilla = true; W.ropaTirada = false; delete dlgHechos().ropa_tirada_otra; logEv('Ana dobló su ropa en la silla antes de acostarse.', []); if (!dlgHechos().ropa_ordenada) { dlgHecho('ropa_ordenada'); dlgHacer([{ suma: ['afecto:marilla:ana', 1] }]); } }
  else { W.ropaTirada = true; W.ropaSilla = false; dlgHecho('ropa_tirada_otra'); logEv('Ana dejó la ropa tirada en el suelo.', []); }
}
function drawRopaSilla(c){ const [x, y] = ROPA_SILLA(), L = LOOKS.ana; drawSilla(c, x, y); blob(c, [[x - 8, y - 15], [x + 8, y - 15], [x + 8, y - 11], [x - 8, y - 11]], L.dress0 || L.dress); blob(c, [[x - 7, y - 18], [x + 7, y - 18], [x + 7, y - 15], [x - 7, y - 15]], L.dressD0 || L.dressD); ell(c, x - 6, y + 2, 3.6, 2, '#5b3a28', true); ell(c, x + 6, y + 2, 3.6, 2, '#5b3a28', true); }
function vestirse(callada){
  const W = game.wm; if (!W?.camison) return;
  W.camison = false; W.ropaSilla = false; if (W.ropaTirada) { W.ropaTirada = false; dlgHecho('ropa_arrugada'); }
  if (!callada) anaSays(dicho('ropa_vestirse'));
  logEv('Ana se vistió.', []); save();
}
function ponerseCamison(){ const W = game.wm; W.camison = true; W.sinSombrero = true; anaSays(dicho('ropa_camison')); logEv('Ana se puso el camisón.', []); save(); }
function ropaOrdenar(callada){
  const W = game.wm; if (!W?.ropaTirada) return; W.ropaTirada = false; W.ropaSilla = true; delete dlgHechos().ropa_tirada_otra;
  if (!callada) anaSays(dicho('ropa_doblar'));
  logEv('Ana dobló su ropa y la dejó en la silla.', []);
  if (!dlgHechos().ropa_ordenada) { dlgHecho('ropa_ordenada'); dlgHacer([{ suma: ['afecto:marilla:ana', 1] }]); }   // (Marilla sees it: she says nothing, but she sees it)
  save();
}
function ropaPonerse(){ anaSays(dicho('ropa_arrugada')); vestirse(true); }
function ropaMenu(){
  say('Ana', 'Su vestido y sus zapatos, tirados en el suelo desde anoche.', [['🧺 Doblar la ropa y dejarla en la silla', () => { close(); ropaOrdenar(); }], ...(game.wm.camison ? [['👗 Ponérsela así, arrugada', () => { close(); ropaPonerse(); }]] : []), ['Nada por ahora', close]]);
}
// the wardrobe: dress (or, at night, the nightgown), and the hat
function armario(callada){
  const W = game.wm, o = [];
  if (W.camison) o.push([W.ropaTirada ? '👗 Ponerse el vestido (está tirado en el suelo)' : '👗 Vestirse', () => { close(); W.ropaTirada ? ropaPonerse() : vestirse(); }]);
  else { if (hourNow() % 24 >= 19 || hourNow() % 24 < 5) o.push(['🌙 Ponerse el camisón', () => { close(); ponerseCamison(); }]); o.push([W.sinSombrero ? '👒 Ponerse el sombrero' : '👒 Guardar el sombrero', () => { close(); sombrero(); }]); }
  if (callada === true) { if (W.camison) vestirse(true); else sombrero(true); return; }
  if (o.length === 1) return o[0][1]();
  say('Ana', 'El armario.', [...o, ['Nada por ahora', close]]);
}
// the dress on the floor, crumpled, and the shoes
function drawRopaTirada(c){
  const [x, y] = ROPA_SUELO(), L = LOOKS.ana, d = L.dress0 || L.dress, dd = L.dressD0 || L.dressD;
  blob(c, [[x - 18, y - 2], [x - 6, y - 9], [x + 10, y - 7], [x + 20, y - 1], [x + 12, y + 5], [x - 10, y + 6]], d);
  blob(c, [[x - 4, y - 6], [x + 8, y - 4], [x + 4, y + 2], [x - 6, y + 1]], dd, false);
  ell(c, x - 2, y - 5, 5, 2, L.collar || '#fbf6ea', true);
  ell(c, x + 30, y + 4, 5, 2.4, '#5b3a28', true); ell(c, x + 38, y + 8, 5, 2.4, '#5b3a28', true);
}
// with Ana on her own (🤖): she dresses in the morning (and, the first day, folds her clothes first)
function ropaTick(){
  const W = game.wm; if (!ANA_AUTO || !W?.camison || sleeping || TALKS.length || game.talk || game.playAct) return;
  const h = hourNow() % 24; if (h < 6 || h >= 20 || game.scene !== 'ga') return;
  if (W.ropaTirada) ropaOrdenar(true); vestirse(true);
}
