/* ---------- the first time: a scene of its own; the window and the candle; her hat in the wardrobe ----------
   - The first time Ana does some things (looks out of her window, sees herself in the mirror, climbs to her room, sees
     the sea from the lighthouse…), a scene of the script (primera_<what>, disparo: primera) instead of the plain line;
     with «tambien», the thing is done too (climbing the stairs). Once said, the plain line as always.
   - The window of her room, once Diana and she have agreed on the signals (the conversation conv_diana_vela, cap. 18):
     in the evening, a candle and a piece of cardboard, flashes to Diana's window across the trees (senas_vela).
   - Her hat: she can take it off and keep it in the wardrobe of her room, and put it on again. */
function primeraVez(id, act){
  const d = DIALOGOS.find(x => x.id === 'primera_' + id && x.disparo === 'primera');
  if (!d || d.dicha() || !dlgCumple(d, dlgCtx())) return false;
  if (d.tambien) act(true);   // (done too, quietly: the scene tells it)
  for (const t of TALKS.filter(t => t.ch === d.canal)) talkEnd(t);   // (what she was saying to herself gives way to this)
  d.decir(); return true;
}
// the scenes of a thing (disparo: objeto, objeto: <what>): looking out of the window, at the mirror, at the sea… many,
// each for its moment (the season, the hour, what has happened: «si:»); at most one a day for each thing, the one that
// fits best (more priority, then more specific; among equals, any). The rest of the times, the plain line as always.
let ACT_SOLA = false;   // (Ana doing it on her own, on her way to something: the plain line, she has things to do)
// of the scenes that can be said now, the one that fits best: more priority, then more specific; among equals, one not
// seen yet (one already seen, again, only now and then: not every day)
function escenaElegir(C){
  if (!C.length) return null;
  const v = d => (d.prioridad || 0) + dlgEspecificidad(d) * .001, top = Math.max(...C.map(v)), T = C.filter(c => v(c) === top), nuevas = T.filter(c => dlgDichas()[c.id] == null);
  if (!nuevas.length && Math.random() < .5) return null;
  return pick(nuevas.length ? nuevas : T);
}
function escenaObjeto(id, act){
  const W = game.wm; if (!W || ana.sit || ACT_SOLA || (id === 'gwin' && velaPuede() && act !== true)) return false;   // (the window, with the candle: its menu first)
  const H = (W.objHoy ||= {}), k = id.split(':')[0]; if (H[k] === today()) return false;   // (bed:3 is a bed of the garden: «objeto: bed»)
  const x = dlgCtx(), d = escenaElegir(DIALOGOS.filter(d => d.disparo === 'objeto' && d.objeto === k && !d.dicha() && dlgCumple(d, x))); if (!d) return false;
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
  const de = (k, f) => DIALOGOS.filter(d => d.disparo === 'lugar' && d.lugar === k && !d.dicha() && f(d) && dlgCumple(d, x));
  // a scene that interrupts whatever is going on (as the Avenue in bloom, on the way from Bright River): it does not
  // wait for the talk to end, nor for Ana to be free; it cuts what is being said (unless Ana is choosing something)
  for (const [k] of cerca) {
    const d = escenaElegir(de(k, d => d.interrumpe)); if (!d || !interrumpirTodo(d.prioridad || 0)) continue;
    H[k] = today(); lugarRespiro = TT + LUGAR_RESPIRO; d.decir(); return;
  }
  if (ana.sit || ana.goto?.auto || ana.goto?.wm || cart.riding) return;
  if (TT < lugarRespiro || hablando() || amb.cur || game.talk || TALKS.some(t => t.lines.some(l => l.q === 'ana'))) return;
  for (const [k] of cerca) {
    const d = escenaElegir(de(k, d => !d.interrumpe)); if (!d) continue;
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
