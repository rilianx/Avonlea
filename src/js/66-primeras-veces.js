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
  d.decir(); return true;
}
// the scenes of a thing (disparo: objeto, objeto: <what>): looking out of the window, at the mirror, at the sea… many,
// each for its moment (the season, the hour, what has happened: «si:»); at most one a day for each thing, the one that
// fits best (more priority, then more specific; among equals, any). The rest of the times, the plain line as always.
let ACT_SOLA = false;   // (Ana doing it on her own, on her way to something: the plain line, she has things to do)
function escenaObjeto(id, act){
  const W = game.wm; if (!W || ana.sit || ACT_SOLA || (id === 'gwin' && velaPuede() && act !== true)) return false;   // (the window, with the candle: its menu first)
  const H = (W.objHoy ||= {}); if (H[id] === today()) return false;
  const x = dlgCtx(), C = DIALOGOS.filter(d => d.disparo === 'objeto' && d.objeto === id && !d.dicha() && dlgCumple(d, x)); if (!C.length) return false;
  const v = d => (d.prioridad || 0) + dlgEspecificidad(d) * .001, top = Math.max(...C.map(v)), T = C.filter(c => v(c) === top), nuevas = T.filter(c => dlgDichas()[c.id] == null);
  if (!nuevas.length && Math.random() < .5) return false;   // (one already seen, again: now and then, not every day)
  const d = pick(nuevas.length ? nuevas : T);
  H[id] = today(); if (d.tambien && typeof act === 'function') act(true);
  d.decir(); return true;
}
// the candle at the window: once they have agreed on the signals, friends still, in the evening
function velaPuede(){ return dianaAmiga() && !!dlgDichas().conv_diana_vela && hourNow() % 24 >= 19; }
function ventana(){
  if (!velaPuede()) return anaSays(WINDOW_LINES[S]);
  say('Ana', 'Por la ventana, entre los árboles, se ve la luz de la pieza de Diana.', [
    ['🕯 Hacerle señas a Diana con la vela', () => { close(); const d = DIALOGOS.find(x => x.id === 'senas_vela'); if (d && !d.dicha()) d.decir(); else anaSays('Ya le hice señas esta noche. Diana debe estar durmiendo… o imaginando cosas, como yo.'); }],
    ['Mirar por la ventana', () => { close(); escenaObjeto('gwin', true) || anaSays(WINDOW_LINES[S]); }],
    ['Nada por ahora', close],
  ]);
}
// her hat: off, into the wardrobe (it hangs there on its peg); and on again
function sombrero(callada){
  const W = game.wm, sin = !W.sinSombrero; W.sinSombrero = sin;
  if (!callada) anaSays(sin ? pick(['Lo guardo en el armario. Un sombrero merece descansar, como cualquiera.', 'Ahí queda, colgado de su gancho. Sin sombrero me siento más… libre. Como una náyade.']) : pick(['El sombrero, otra vez. Marilla dice que una niña decente no sale sin sombrero.', 'Listo. Si tuviera flores, sería el sombrero más bonito de Avonlea.']));
  logEv(sin ? 'Ana se sacó el sombrero y lo guardó en el armario.' : 'Ana sacó su sombrero del armario y se lo puso.', []); save();
}
