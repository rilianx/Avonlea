/* ---------- the trip to White Sands (chapters 5 and 6): Marilla drives the sorrel mare along the shore road, with Ana.
   The same cart as the trip to Bright River (src/js/33-viaje-bright-river.js), with its own route, driver and pace.
   On the way, the book's talk at its stretches of the road (the scenes «ws_t1»… in src/datos/guion.txt: «avance:ws»); farther
   along, Mrs. Pye on the road (not in the book): what she says sends Ana running to the shore, and Marilla follows her
   there. At the hotel, Mrs. Spencer and Mrs. Blewett; and back home, quiet, by the same road. ---------- */
const wsE = () => game.wm || game;   // (kept with the game: a trip left halfway, when the game is opened again, ends at home)
// (the scenes of the road are conditions on the state, as any other: the trip, «viaje=white_sands»; where the cart goes,
// «cerca:ana:aldea:700», or after the talk before it, «dicha:ws_t2»; and who is there. What the code
// does is the world: the cart goes on (at a walk while they talk), Mrs. Pye waits on the road near the sea, Mrs. Spencer
// and Mrs. Blewett come out at the hotel. It leaves no facts of its own)
const WS_VEL = 60, WS_PASO = 25, WS_PAUSA = 4;   // (the pace of the mare, and at a walk while they talk; the seconds of quiet between one talk and the next)
AVANCES.ws = () => cart.on && cart.viaje === WS_VIAJE ? cart.s / cartLen() * 100 : null;
const wsRuta = () => { const a = [GG.x + 20, GG.y + 80], b = door('Hotel White Sands'), r = netRoute(...a, ...b); return [a, ...(r ? r.pts : []), b]; };
// the nearest point of the shore (on the sand, a little before the water), and how far
function wsOrillaCerca(x, y){ let best = null; for (let i = 1; i < COAST.length; i++) { const p = proj([x, y], COAST[i - 1], COAST[i]); if (!best || p.d < best.d) best = p; } return best; }
const WS_VIAJE = {
  aviso: '🐴 Rumbo a White Sands, con Marilla, por el camino de la costa',
  subir(){ say('marilla', 'Sube, Ana. No tenemos todo el día.', [['🐴 Subir a la calesa', () => { close(); wsCalesa(); }], ['Todavía no', close]]); },
  llegar(){
    wsE().ws.fase = 'llegada'; const [hx, hy] = door('Hotel White Sands');
    for (const [k, dx] of [['spencer', -30], ['blewett', 30]]) { const f = FOLKBY[k]; if (f) Object.assign(f, { where: 'out', x: hx + dx, y: hy + 40, route: [], moving: false, sit: false, dir: 2, talkT: TT + 240 }); }
    cart.suelto = true; Object.assign(PEOPLE.marilla, { sit: false, x: hx - 70, y: hy + 46, dir: 1, moving: false, nav: null });   // (she gets down, too)
  },
};
function wsSalir(){
  const M = PEOPLE.marilla;
  fundido('Marilla engancha la yegua alazana a la calesa…', () => {
    game.scene = 'out'; ana.meal = null; ana.sit = false; ana.enCama = null;
    const r = wsRuta(); Object.assign(cart, { ruta: r, len: r.slice(1).reduce((a, p, i) => a + dist(p[0], p[1], r[i][0], r[i][1]), 0), con: 'marilla', vel: WS_VEL, viaje: WS_VIAJE, parado: false, suelto: false });
    cart.on = true; cart.s = 0; [cart.x, cart.y] = cartAt(0); cart.dir = 1; cart.dest = 'br';
    game.tripWith = 'marilla'; Object.assign(M, { where: 'out', nav: null, target: null, story: null, busca: null, trajo: false });
    let pye = .88, dMin = 1e9; for (let f = .8; f <= .95; f += .01) { const [x, y] = cartAt(f * cart.len), d = wsOrillaCerca(x, y)?.d ?? 1e9; if (d < dMin) { dMin = d; pye = f; } }   // (Mrs. Pye, where the road runs nearest the sea)
    wsE().ws = { fase: 'ida', dia: today(), pye };
    logEv('Marilla y Ana salieron en la calesa hacia White Sands, por el camino de la costa.', ['marilla']); cartOn();
    if (!obsScene()) { cam.x = cart.x; cam.y = cart.y; cam.snap = true; }
  });
}
// along the way: the pace of the mare, and Mrs. Pye, ahead on the road
function wsTick(){
  const w = wsE().ws; if (!w || w.fase === 'fin') return;
  if (!cart.on || (cart.viaje !== WS_VIAJE && cart.viaje !== WS_VUELTA)) { if (!w.volviendo && !game.talk) { w.volviendo = true; wsVolverCasa(); } return; }   // (the game was closed halfway: they are back)
  const habla = TALKS.some(t => t.ch === 'viaje');
  if (w.fase === 'vuelta') { cart.vel = habla ? WS_PASO : WS_VEL; return; }
  if (w.fase === 'ida') {
    const fr = cart.s / cartLen();
    cart.vel = habla ? WS_PASO : WS_VEL; if (habla) w.hablaT = TT;
    if (fr >= w.pye && !w.pyeAhi) {   // Mrs. Pye, where the road runs nearest the sea: the cart stops there (once the talk under way is over, and the next one, if it follows it, has begun)
      cart.parado = true; if (habla || TT - (w.hablaT ?? -99) < WS_PAUSA) return;
      w.pyeAhi = true; const f = FOLKBY.srapye, [px, py] = cartAt(cart.s + 90); if (f) Object.assign(f, { where: 'out', x: px + 30, y: py + 12, route: [], moving: false, sit: false, dir: 3, talkT: TT + 240 });
    }
  }
}
// back home: the same road, the other way; Marilla drives, and they talk (the scenes of «viaje=vuelta_white_sands»)
const WS_VUELTA = {
  aviso: '🐴 De vuelta a Tejas Verdes, con Marilla, por el camino de la costa',
  subir(){ say('marilla', 'Sube, Ana. Ya es tarde.', [['🐴 Subir a la calesa', () => { close(); cartOn(); }], ['Todavía no', close]]); },
  llegar(){ wsVolverCasa(); },
};
function wsVolver(){
  const M = PEOPLE.marilla;
  fundido('Se despiden de la Sra. Spencer, y Marilla engancha otra vez la yegua…', () => {
    for (const k of ['spencer', 'blewett']) if (FOLKBY[k]) FOLKBY[k].talkT = TT + 1;
    Object.assign(M, { busca: null, trajo: false, sit: false, nav: null, target: null, where: 'out' }); ana.llora = false; ana.sit = false;
    Object.assign(cart, { viaje: WS_VUELTA, dest: 'casa', suelto: false, parado: false, vel: WS_VEL }); game.tripWith = 'marilla'; wsE().ws.fase = 'vuelta';
    cartOn();
  });
}
const wsSinLugares = () => ['orilla', 'llegada'].includes(wsE().ws?.fase);
// what the script does on this trip: «! viaje white_sands», «orilla», «calesa», «sigue», «casa» (from Mrs. Spencer's, back by the road)
function wsViaje(x){
  if (x === 'white_sands') return wsSalir();
  if (x === 'orilla') return wsOrilla();
  if (x === 'calesa') return wsCalesa();
  if (x === 'casa') return wsE().ws?.fase === 'llegada' ? wsVolver() : wsVolverCasa();   // (from Mrs. Spencer's: by the road, in the cart; otherwise, home at once)
  if (x === 'sigue') { cart.parado = false; if (FOLKBY.srapye) FOLKBY.srapye.talkT = TT + 1; }   // (Ana stays in the cart: on)
}
// Ana gets off and runs to the sea, the nearest shore (on the sand, a little before the water); Marilla goes after her
function wsOrilla(){
  const M = PEOPLE.marilla;
  if (cart.riding) cartOff();
  cart.suelto = true; wsE().ws.fase = 'orilla';
  const best = wsOrillaCerca(ana.x, ana.y);
  dlgDichas().playa_1 = true;   // (her first time by the sea is this one: not the joyful one of src/datos/guion.txt afterwards)
  const d = best ? Math.max(1, best.d) : 1, x = best ? best.x + (ana.x - best.x) / d * 40 : ana.x, y = best ? best.y + (ana.y - best.y) / d * 40 : ana.y;
  const llega = () => { ana.dir = 0; ana.sit = true; ana.llora = true; M.sit = false; M.busca = { hasta: TT + 600, hecho: 'ws_marilla_llega' }; };
  if (navigator.webdriver) { ana.x = x; ana.y = y; llega(); }
  else anaIrDespues({ x, y, scene: 'out', corre: true, alLlegar: llega });
  logEv('En el camino a White Sands, la Sra. Pye dijo algo cruel de Ana, y Ana corrió llorando hasta la orilla del mar. Marilla fue tras ella.', ['marilla', 'srapye']);
}
// back into the cart, and on
function wsCalesa(){
  const M = PEOPLE.marilla;
  fundido('Vuelven despacio a la calesa…', () => {
    Object.assign(M, { busca: null, trajo: false, sit: false, nav: null, target: null, where: 'out' }); ana.llora = false; ana.sit = false;
    cart.suelto = false; cart.parado = false; game.tripWith = 'marilla'; if (wsE().ws) wsE().ws.fase = 'ida';
    if (FOLKBY.srapye) FOLKBY.srapye.talkT = TT + 1;
    cartOn();
  });
}
// home: the cart is Matthew's again (also when the game was closed halfway)
function wsVolverCasa(){
  const M = PEOPLE.marilla;
  fundido('Llegan a Tejas Verdes con la última luz de la tarde…', () => {
    if (cart.riding) cartOff();
    Object.assign(cart, { on: false, riding: false, moving: false, ruta: null, len: null, con: null, vel: null, viaje: null, parado: false, suelto: false });
    game.tripWith = null; for (const k of ['spencer', 'blewett', 'srapye']) if (FOLKBY[k]) FOLKBY[k].talkT = TT + 1;
    Object.assign(M, { where: 'gg', x: STOVE.x + 60, y: STOVE.y + 60, nav: null, moving: false, sit: false, busca: null, trajo: false, target: null });
    game.scene = 'out'; ana.sit = false; ana.llora = false; ana.goto = null; ana.x = GG.x + 30; ana.y = GG.y + 70; ana.dir = 2;
    if (!obsScene()) { cam.x = ana.x; cam.y = ana.y; cam.snap = true; }
    if (hourNow() < 18) dayAt(18);
    wsE().ws.fase = 'fin'; wsE().ws.volviendo = false; dlgHecho('ws_vuelven');   // (also when the game was closed halfway: then no scene said it)
    estadoPoner('viaje', 'ninguno');   // (the trip is over: no longer on the way)
    logEv('Marilla y Ana volvieron de White Sands sin la Sra. Blewett.', ['marilla']); save();
  });
}
