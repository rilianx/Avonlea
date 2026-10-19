/* ---------- the trip to Bright River: Matthew drives the cart along the road (the same world, walked or ridden).
   Ana can get off anywhere (moving, or tapping the ground) and get on again (tapping the cart); while they ride they
   talk as anywhere else (the cart does not stop), and at some places someone says something (MAP.moments).
   The clock runs as everywhere: the station is at the north-west corner of the map, across the village. ---------- */
const CART_SPEED = 120;
const cart = { on: false, x: 0, y: 0, dir: 3, dest: null, riding: false, walk: 0, moving: false };
const CART_ROUTE = [[GG.x + 20, GG.y + 80], ...[...ROADS.sur].reverse(), ...[...ROADS.estacion].reverse().slice(1), [STATION.x + 50, STATION.y + 70]];   // (from Green Gables, through the village, to the station)
const CART_LEN = CART_ROUTE.slice(1).reduce((a, p, i) => a + dist(p[0], p[1], CART_ROUTE[i][0], CART_ROUTE[i][1]), 0);
function cartAt(sv){ let left = clamp(sv, 0, CART_LEN); for (let i = 1; i < CART_ROUTE.length; i++) { const a = CART_ROUTE[i - 1], b = CART_ROUTE[i], L = dist(a[0], a[1], b[0], b[1]); if (left <= L || i === CART_ROUTE.length - 1) { const k = clamp(left / L, 0, 1); return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), b[0] - a[0]]; } left -= L; } return [...CART_ROUTE[0], 1]; }
function tripAsk(to){
  const hn = hourNow(), m = PEOPLE.matthew;
  if (m.where === 'away') return anaSays(dicho('carreta_sin_matthew'));
  if (hn > 20) return anaSays(dicho('carreta_tarde'));
  say('Ana', '¿Ir hasta la estación de Bright River con Matthew en la carreta? Es un buen trecho, pasando por la aldea.', [['🐴 Vamos', () => { close(); cartStart(); }], ['Mejor no', close]]);
}
function cartStart(){
  const m = PEOPLE.matthew; cart.on = true; cart.s = 0; [cart.x, cart.y] = cartAt(0); cart.dir = 1; cart.dest = 'br';
  game.tripWith = 'matthew'; m.away = null; m.target = null; m.story = null; m.where = 'out';
  logEv('Ana y Matthew salieron en la carreta hacia la estación de Bright River.', ['matthew']); cartOn();
}
function cartOn(dest){
  if (dest) cart.dest = dest;
  cart.riding = true; ana.goto = null; ana.lie = false; auto.intent = null; diana.follow = false; close();
  notice(cart.dest === 'br' ? '🐴 Rumbo a Bright River (para bajarte, muévete o toca el suelo)' : '🐴 De vuelta a Tejas Verdes (para bajarte, muévete o toca el suelo)');
}
function cartOff(){ cart.riding = false; ana.sit = false; ana.x = cart.x + (cart.dir === 3 ? 10 : -10); ana.y = cart.y + 26; }
function cartAsk(){
  const nearSt = cart.s > CART_LEN - 400, nearAv = cart.s < 400, o = [];
  if (!nearSt) o.push([nearAv ? '🐴 Ir a Bright River' : '🐴 Seguir a Bright River', () => cartOn('br')]);
  if (!nearAv) o.push(['🐴 Volver a Tejas Verdes', () => cartOn('av')]);
  o.push(['Todavía no', close]);
  say('matthew', dicho('carreta_seguimos'), o);
}
function cartTick(dt){
  if (!cart.on) return;
  const m = PEOPLE.matthew, d = cart.dest === 'br' ? 1 : -1;
  cart.moving = cart.riding && (d > 0 ? cart.s < CART_LEN : cart.s > 0);
  if (cart.moving) { cart.s = clamp(cart.s + d * CART_SPEED * dt, 0, CART_LEN); cart.walk = (cart.walk + dt * 1.6) % 1; }
  const [cx, cy, dx] = cartAt(cart.s); cart.x = cx; cart.y = cy; if (cart.moving) { cart.dir = (dx * d) >= 0 ? 1 : 3; cartTrack(cart); }
  const c8 = cartC8(cart), [sx, sy] = cartSeat(cart.x, cart.y, c8, 0), [ax, ay] = cartSeat(cart.x, cart.y, c8, 1);
  m.x = sx; m.y = sy; m.dir = c8Dir(c8); m.sit = true; m.buggy = false; m.moving = false; m.where = 'out';
  if (cart.riding) { ana.x = ax; ana.y = ay; ana.dir = c8Dir(c8); ana.sit = true; ana.vx = ana.vy = 0; }
  if (cart.riding && !cart.moving) {   // (arrived)
    cartOff();
    if (cart.dest === 'br') { cart.on = false; m.sit = false; roadStart('matthew', 1, -1); roadJoin('matthew'); roadTramoIn('matthew', roadTramo(1)); notice('🐴 El camino a Bright River: ocho millas'); return; }
    else { logEv('Ana y Matthew volvieron a Tejas Verdes desde Bright River.', ['matthew']); cart.on = false; game.tripWith = null; m.sit = false; m.y = cart.y + 20; m.nav = null; }
    save();
  }
  // at night, if the cart was left waiting, Matthew goes home
  if (!cart.riding && cart.on && hourNow() > 23.5) { cart.on = false; game.tripWith = null; m.sit = false; m.where = CH.matthew.home; }
}
// the moments of the road: someone says something when Ana passes by (once a day each)
const momentDone = {};
function momentsTick(){
  if (game.scene !== 'out' || (CAP1.on && !CAP1.done)) return;   // (in the book's chapter, its own lines are said at their places)
  for (const [i, f] of MAP.moments.entries()) {
    if (momentDone[i] === today() || (f.estaciones && !f.estaciones.includes(S)) || dist(ana.x, ana.y, f.at[0] * U, f.at[1] * U) > 160) continue;   // (some only in their season: the pink field is not pink under the snow)
    momentDone[i] = today(); if (amb.cur) continue;
    const mNear = sceneOf('matthew') === 'out' && dist(PEOPLE.matthew.x, PEOPLE.matthew.y, ana.x, ana.y) < 160;
    if (!mNear && f.lines.some(([q]) => q === 'matthew')) continue;   // (said to Matthew: only with him there; alone, the place has its own scenes)
    const lines = f.lines.filter(([q]) => q === 'ana' || (q === 'matthew' && mNear)).map(([q, t]) => ({ q, t }));
    if (lines.length) sceneStart({ parts: mNear ? ['matthew'] : [], lines, out: {}, scene: 'out', resumen: '' }, false);
  }
}
// a scene takes Ana to another room: not in a jump, but as a page turns (a moment of paper, what happens, and there)
function fundido(texto, f){
  const el = $('fundido'); if (!el || navigator.webdriver) return f();
  el.textContent = texto; el.classList.add('on'); setTimeout(() => { f(); setTimeout(() => el.classList.remove('on'), 650); }, 380);
}
function goIn(room, at){ game.scene = room; ana.lie = false; diana.lie = false; ana.x = at ? at[0] : KDOOR.x; ana.y = at ? at[1] : KIT.h - 14; ana.dir = 0; ana.sit = false; if (diana.follow) { diana.where = room; diana.sit = false; diana.x = ana.x - 26; diana.y = ana.y; } if (!obsScene()) { cam.x = KIT.w / 2; cam.y = KIT.h / 2; } }
function goOut(){
  if (game.scene === 'camino') return;
  if (game.scene === 'br') { const m = PEOPLE.matthew; if (m.where === 'br' && m.buggy) { roadStart('matthew', 0, 1); roadJoin('matthew'); roadTramoIn('matthew', roadTramo(0)); return; } game.scene = 'camino'; game.road = null; ana.onCart = false; ana.sit = false; ana.x = RSTN.x; ana.y = RSTN.y + 50; ana.roadS = 0; if (!obsScene()) { cam.x = ana.x; cam.y = ana.y; cam.snap = true; } return; }
  if (ROOMS[game.scene].parent) return goIn(ROOMS[game.scene].parent, ROOMS[game.scene].exitAt);
  const H = HOUSES[game.scene].at;
  game.scene = 'out'; ana.lie = false; diana.lie = false; ana.x = H.x; ana.y = H.y + 24; ana.dir = 2; ana.sit = false;
  if (diana.follow) { diana.where = 'out'; diana.sit = false; diana.goals = DIANA_OUT; diana.x = ana.x - 24; diana.y = ana.y + 10; }
  if (!obsScene()) { cam.x = ana.x; cam.y = ana.y; }
}
const today = () => Math.floor(dayT);
function warmUp(){ ana.dir = 0; float(S === 3 ? 'Qué calentito, después de tanta nieve…' : 'Qué lindo crepita el fuego', FIRE.x, FIRE.y - 100); if (S === 3) hearts(ana.x, ana.y - 56); sfx.happy(); }
function teaTime(){
  ana.sit = true; ana.x = SOFA.x - 20; ana.y = SOFA.y - 4; ana.dir = 2;
  if (diana.where !== 'os') { float('Un ratito de descanso', ana.x, ana.y - 60); return; }
  game.sipUntil = TT + 90;
  diana.sit = true; diana.moving = false; diana.x = SOFA.x + 20; diana.y = SOFA.y - 4; diana.dir = 2;
  const first = game.teaDay !== today();
  if (first) { logEv('Ana y Diana tomaron el té en la salita de los Barry.'); game.teaDay = today(); game.fond.diana = Math.min(5, game.fond.diana + 1); hearts(SOFA.x, SOFA.y - 60); sfx.happy(); save(); }
  const TEA_LINES = dichosEnOrden('te_diana:primera').map(([, t]) => t);   // (src/datos/dichos/31-llegada-y-noche.txt: by the day; the last, in winter)
  say('diana', first ? TEA_LINES[S === 3 ? 3 : today() % 3] : dicho('te_diana_otra_vez'), [
    ['¿Seguro que es cordial de frambuesa?', () => say('diana', dicho('te_diana_cordial'), [['Brindemos por nuestra amistad', () => { hearts(diana.x, diana.y - 50); sfx.happy(); close(); }]])],
    ['Qué rico', close],
  ]);
}
