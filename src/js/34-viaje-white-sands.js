/* ---------- the trip to White Sands (chapters 5 and 6): Marilla drives the sorrel mare along the shore road, with Ana.
   The same cart as the trip to Bright River (src/js/33-viaje-bright-river.js), with its own route, driver and pace.
   On the way, the book's talk at its stretches of the road (the scenes «ws_t1»… in src/datos/guion.txt: «avance:ws»); farther
   along, Mrs. Pye on the road (not in the book): what she says sends Ana running to the shore, and Marilla follows her
   there. At the hotel, Mrs. Spencer and Mrs. Blewett; and back home, quiet, by the same road. ---------- */
const wsE = () => game.wm || game;   // (kept with the game: a trip left halfway, when the game is opened again, ends at home)
// grafo: viaje_spencer → ws_pye, ws_llegan
// grafo: ws_pye → ws_marilla_llega
// grafo: ws_spencer → ws_vuelven
// (the talks of the road do not wait for each other: each has its stretch of the way, «avance:ws:25-60» in the script —
// how far along they are, in %; if the stretch goes by, that talk is lost. While a talk goes on, the mare walks)
const WS_VEL = 60, WS_PASO = 25;
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
    dlgHecho('ws_llegan');
  },
};
function wsSalir(){
  const M = PEOPLE.marilla;
  fundido('Marilla engancha la yegua alazana a la calesa…', () => {
    game.scene = 'out'; ana.meal = null; ana.sit = false; ana.enCama = null;
    const r = wsRuta(); Object.assign(cart, { ruta: r, len: r.slice(1).reduce((a, p, i) => a + dist(p[0], p[1], r[i][0], r[i][1]), 0), con: 'marilla', vel: WS_VEL, viaje: WS_VIAJE, parado: false, suelto: false });
    cart.on = true; cart.s = 0; [cart.x, cart.y] = cartAt(0); cart.dir = 1; cart.dest = 'br';
    game.tripWith = 'marilla'; Object.assign(M, { where: 'out', nav: null, target: null, story: null, busca: null, trajo: false });
    let pye = .7, dMin = 1e9; for (let f = .5; f <= .9; f += .01) { const [x, y] = cartAt(f * cart.len), d = wsOrillaCerca(x, y)?.d ?? 1e9; if (d < dMin) { dMin = d; pye = f; } }   // (Mrs. Pye, where the road runs nearest the sea)
    wsE().ws = { fase: 'ida', dia: today(), pye };
    logEv('Marilla y Ana salieron en la calesa hacia White Sands, por el camino de la costa.', ['marilla']); cartOn();
    if (!obsScene()) { cam.x = cart.x; cam.y = cart.y; cam.snap = true; }
  });
}
// along the way: the facts that let the scenes of the road play, at their places; and Mrs. Pye, ahead on the road
function wsTick(){
  const w = wsE().ws; if (!w || w.fase === 'fin') return;
  if (!cart.on || cart.viaje !== WS_VIAJE) { if (!w.volviendo && !game.talk) { w.volviendo = true; wsVolverCasa(); } return; }   // (the game was closed halfway: they are back)
  if (w.fase === 'ida') {
    const habla = TALKS.some(t => t.ch === 'viaje'), fr = cart.s / cartLen();
    cart.vel = habla ? WS_PASO : WS_VEL;
    if (fr >= w.pye && !dlgHechos().ws_pye) {   // Mrs. Pye, where the road runs nearest the sea: the cart stops there (once the talk under way is over)
      cart.parado = true; if (habla) return;
      dlgHecho('ws_pye'); const f = FOLKBY.srapye, [px, py] = cartAt(cart.s + 90); if (f) Object.assign(f, { where: 'out', x: px + 30, y: py + 12, route: [], moving: false, sit: false, dir: 3, talkT: TT + 240 });
    }
  }
}
const wsSinLugares = () => ['orilla', 'llegada'].includes(wsE().ws?.fase);
// what the script does on this trip: «! viaje white_sands», «orilla», «calesa», «sigue», «casa»
function wsViaje(x){
  if (x === 'white_sands') return wsSalir();
  if (x === 'orilla') return wsOrilla();
  if (x === 'calesa') return wsCalesa();
  if (x === 'casa') return wsVolverCasa();
  if (x === 'sigue') { cart.parado = false; if (FOLKBY.srapye) FOLKBY.srapye.talkT = TT + 1; }   // (Ana stays in the cart: on)
}
// Ana gets off and runs to the sea, the nearest shore (on the sand, a little before the water); Marilla goes after her
function wsOrilla(){
  const M = PEOPLE.marilla;
  if (cart.riding) cartOff();
  cart.suelto = true; wsE().ws.fase = 'orilla';
  const best = wsOrillaCerca(ana.x, ana.y);
  dlgDichas().lugar_mar_primera = true;   // (her first time by the sea is this one: not the joyful one of src/datos/guion.txt afterwards)
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
// back home along the shore road, without a word; the cart is Matthew's again
function wsVolverCasa(){
  const M = PEOPLE.marilla;
  fundido('Vuelven a Tejas Verdes por el camino de la costa. Marilla no dice una palabra en todo el viaje…', () => {
    if (cart.riding) cartOff();
    Object.assign(cart, { on: false, riding: false, moving: false, ruta: null, len: null, con: null, vel: null, viaje: null, parado: false, suelto: false });
    game.tripWith = null; for (const k of ['spencer', 'blewett', 'srapye']) if (FOLKBY[k]) FOLKBY[k].talkT = TT + 1;
    Object.assign(M, { where: 'gg', x: STOVE.x + 60, y: STOVE.y + 60, nav: null, moving: false, sit: false, busca: null, trajo: false, target: null });
    game.scene = 'out'; ana.sit = false; ana.llora = false; ana.goto = null; ana.x = GG.x + 30; ana.y = GG.y + 70; ana.dir = 2;
    if (!obsScene()) { cam.x = ana.x; cam.y = ana.y; cam.snap = true; }
    if (hourNow() < 18) dayAt(18);
    wsE().ws.fase = 'fin'; wsE().ws.volviendo = false; dlgHecho('ws_vuelven');
    logEv('Marilla y Ana volvieron de White Sands sin la Sra. Blewett.', ['marilla']); save();
  });
}
