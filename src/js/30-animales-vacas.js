/* ---------- the animals: cows graze, get loose, are led and sold; Ginger talks ---------- */
const animalWhere = k => ANIM[k]?.where;
function animalSays(k, text){ const a = ANIM[k]; if (!a || amb.cur) return; text = text || dicho('animal:' + k); if (!text) return; bubbles = [{ q: k, text, t: 0, dur: lineDur(text) }]; a.talkT = TT + 1.6; sfx.blip(); }
const ledCow = () => Object.values(ANIM).find(a => a.state === 'led' && (!a.ledBy || a.ledBy === 'ana'));
function cowGo(a, tx, ty, sp, dt){
  const n = navStep(a, tx, ty); if (n.arrived) { a.moving = false; return true; }
  const dx = n.wx - a.x, dy = n.wy - a.y, d = Math.hypot(dx, dy) || 1, v = Math.min(sp, d * 4), ox = a.x, oy = a.y;
  moveBy(a, dx / d * v * dt, dy / d * v * dt); a.moving = true; a.dir = dx > 0 ? 1 : 3; a.walk = (a.walk + dt * 1.6 * Math.max(.5, v / 30)) % 1;
  if (Math.hypot(a.x - ox, a.y - oy) < v * dt * .25 && (a.stuck = (a.stuck || 0) + dt) > 1) { a.nav = null; a.stuck = 0; a.goal = null; }
  return false;
}
function animalsThink(dt){
  for (const a of Object.values(ANIM)) {
    if (a.kind === 'parrot') { if (game.scene === a.where && !amb.cur && !bubbles.length && TT > (a.nextT = a.nextT || TT + 6)) { a.nextT = TT + 10 + Math.random() * 16; animalSays(a.id); } continue; }
    if (a.where === 'away') continue;
    if (a.state === 'bought') {   // she goes along with whoever bought her (and is gone when he is)
      const b = PEOPLE[a.owner]; if (!b || b.where === 'away') { a.where = 'away'; continue; }
      if (viewScene() !== 'out' || b.where !== 'out') continue;
      const bx = b.x + (b.dir === 3 ? 60 : -60), by = b.y + 8; if (dist(a.x, a.y, bx, by) > 14) cowGo(a, bx, by, 50, dt); else a.moving = false; continue;
    }
    if (a.state === 'led' && a.ledBy && a.ledBy !== 'ana') {   // (led on a rope by someone else: she goes along)
      const L = wmBody(a.ledBy); if (!L) continue; const bx = L.x + (L.dir === 3 ? 30 : -30), by = L.y + 6;
      if (viewScene() !== 'out' || L.where !== 'out' || dist(a.x, a.y, bx, by) > 300) { if (L.where === 'out') { a.x = bx; a.y = by; } a.moving = false; }
      else if (dist(a.x, a.y, bx, by) > 16) cowGo(a, bx, by, 70, dt); else a.moving = false;
      continue;
    }
    if (viewScene() !== 'out') continue;   // (out in the fields, things only move while someone looks: Ana, or whoever is watched)
    if (a.state === 'led' && game.scene !== 'out') continue;
    if (a.state === 'led') { const bx = ana.x + (ana.dir === 3 ? 30 : -30), by = ana.y + 6; if (dist(a.x, a.y, bx, by) > 16) cowGo(a, bx, by, Math.max(34, ana.pace) * 1.3, dt); else a.moving = false; continue; }
    if (TT < (a.quieta || 0)) { a.moving = false; a.munch = (a.munch || 0) + dt; continue; }   // (being milked: still, beside whoever milks her)
    const A = AREAS[a.area];
    if (a.state === 'loose' && ana.moving && dist(a.x, a.y, ana.x, ana.y) < 56) { const d = dist(a.x, a.y, ana.x, ana.y) || 1; a.flee = TT + 1.1; a.fx = (a.x - ana.x) / d; a.fy = (a.y - ana.y) / d; }
    if (TT < (a.flee || 0)) { moveBy(a, a.fx * 52 * dt, a.fy * 52 * dt); a.moving = true; a.dir = a.fx > 0 ? 1 : 3; a.walk = (a.walk + dt * 3) % 1; a.munch = 0; continue; }
    if (A && !inArea(A, a.x, a.y)) { cowGo(a, A.x + A.w / 2, A.y + A.h / 2, 26, dt); a.munch = 0; continue; }   // (on her way to her field)
    if (!a.goal || TT > a.goalT) { const m = 16; a.goal = A ? [A.x + m + Math.random() * (A.w - 2 * m), A.y + m + Math.random() * (A.h - 2 * m)] : [a.x + (Math.random() - .5) * 80, a.y + (Math.random() - .5) * 60]; a.goalT = TT + 8 + Math.random() * 10; a.nav = null; }
    if (dist(a.x, a.y, a.goal[0], a.goal[1]) > 6) { cowGo(a, a.goal[0], a.goal[1], 14, dt); a.munch = 0; } else { a.moving = false; a.munch = (a.munch || 0) + dt; }
  }
}
function leadCow(a){
  const prev = ledCow(); if (prev && prev !== a) releaseCow(prev);
  if (a.state === 'loose' && AREAS[a.area]?.kind === 'oats') { setAnaState('rasgado'); setAnaState('despeinada'); }   // (catching a cow in the oats is no tidy business)
  a.state = 'led'; a.nav = null; logEv('Ana agarró una vaca jersey de la cuerda.'); storyEvent('vaca_agarrada'); storyEvent('agarrada:' + a.id); sfx.happy(); save();
}
function releaseCow(a){
  const ar = areaAt(a.x, a.y); a.area = ar || null; a.state = ar && ar === ANIMALS[a.id].home ? 'home' : 'loose'; a.goal = null; a.nav = null;
  logEv('Ana soltó una vaca jersey' + (ar ? ' en ' + AREAS[ar].name : '') + '.'); if (ar) { storyEvent('vaca_en_' + ar); storyEvent('en_' + ar + ':' + a.id); } save();
}
function offerSale(k, a){
  const price = CH[k].buys[a.kind];
  say(k, dicho('comprar_vaca', { precio: price }), [[`🤝 Vender la vaca (${price} dólares)`, () => { close(); sellCow(k, a, price); }], ['Mejor no', () => { close(); logEv(`Ana no quiso venderle la vaca jersey a ${NAMES[k]}.`, [k, ...witnesses()]); storyEvent('venta_rechazada'); save(); }]]);
}
function sellCow(k, a, price){
  a.state = 'bought'; a.owner = k; a.nav = null; game.inv.dolares += price;
  float('+' + price + ' dólares', ana.x, ana.y - 60); sfx.done();
  logEv(`Ana le vendió una vaca jersey a${CH[k].article === 'el ' ? 'l ' : ' ' + CH[k].article}${NAMES[k]} por ${price} dólares.`, [k, ...witnesses()]); storyEvent('vaca_vendida'); storyEvent('vendida:' + a.id); save();
}
function drawCow(c, a, t){
  const x = a.x, y = a.y, w = Math.sin(a.walk * TAU), d = a.dir === 3 ? -1 : 1, down = !a.moving && (a.munch || 0) > .6, l = a.moving ? w * 2.6 : 0;
  const [COAT, DARK, LIGHT] = a.coat || ['#c8915a', '#9a6a3e', '#f2e6d0'];
  ell(c, x, y + 1, 19, 4.6, 'rgba(30,40,20,.25)');
  c.save(); c.translate(x, y); c.scale(d, 1);
  c.lineCap = 'round'; c.lineWidth = 3;
  c.strokeStyle = DARK; c.beginPath(); c.moveTo(-10, -9); c.lineTo(-10 + l, 0); c.moveTo(8, -9); c.lineTo(8 - l, 0); c.stroke();
  const sw = Math.sin(t * 2.2 + x) * 3; line(c, [[-16, -18], [-19 + sw * .3, -12], [-18 + sw, -6]], DARK, 1.6, 2); ell(c, -18 + sw, -5, 1.6, 2.2, '#4a3424');
  ell(c, 0, -14, 17, 8.6, COAT, true); ell(c, 2, -9.6, 9.5, 3.4, LIGHT); ell(c, 3, -6.4, 3.4, 2.4, '#f0b8b0');
  c.strokeStyle = COAT; c.lineWidth = 3; c.beginPath(); c.moveTo(-7, -9); c.lineTo(-7 - l, 0); c.moveTo(11, -9); c.lineTo(11 + l, 0); c.stroke();
  for (const fx of [-10 + l, 8 - l, -7 - l, 11 + l]) ell(c, fx, .4, 1.8, 1.1, '#3a2a20');
  const hx = 19, hy = down ? -6 : -20;
  blob(c, [[11, -20], [16, -22], [hx + 2, hy - 2], [hx, hy + 5], [13, -9]], COAT);
  ell(c, hx, hy, 6, 5, COAT, true); ell(c, hx + 4.2, hy + 2, 3.4, 2.6, LIGHT, true); ell(c, hx + 5.8, hy + 1.6, .6, .6, '#3a2418');
  ell(c, hx + 1, hy - 1.6, 1, 1.1, '#2a1a10'); ell(c, hx - 4.6, hy - 3, 2.8, 1.4, DARK, true, -.4);
  line(c, [[hx - 1, hy - 4.6], [hx - 2.4, hy - 8.6]], '#efe6d2', 1.4, 6); line(c, [[hx + 2, hy - 4.6], [hx + 3, hy - 8.4]], '#efe6d2', 1.4, 7);
  if (!down) { line(c, [[hx - 2.6, hy + 4], [hx - 3.4, hy + 8]], '#5a4a3a', .8, 8); ell(c, hx - 3.4, hy + 9.6, 2.1, 2.3, '#d9a441', true); }
  c.restore();
}
// the farmhand's cart and horse that go with whoever has one
// the buggy (and the cart), seen from eight sides as the people are: from the side, from the front (coming), from
// behind (going away) and in the four diagonals. p.x, p.y: the middle of the box on the ground; p.c8: where it is
// heading (0 up/away, 2 right, 4 down/towards us, 6 left; odd ones the diagonals), else from p.dir.
const cartC8 = p => p.c8 ?? (p.dir === 3 ? 6 : p.dir === 0 ? 0 : p.dir === 2 ? 4 : 2);
const c8Dir = c8 => c8 === 0 ? 0 : c8 === 4 ? 2 : c8 < 4 ? 1 : 3;   // (how the ones sitting in it face)
function cartAxes(c8){ const a = (c8 - 2) * Math.PI / 4, hx = Math.round(Math.cos(a) * 1000) / 1000, hy = Math.round(Math.sin(a) * 1000) / 1000; return { hx, hy, A: [hx, hy * .6], B: [-hy, hx * .6] }; }   // (A: along, B: across, the ground seen at a slant)
const CART_W = 16;   // (half the width of the box: two side by side on the bench)
function cartSeat(cx, cy, c8, k){ const { A, B } = cartAxes(c8), s = k ? 1 : -1, u = -8 + s * 4, v = s * 8; return [cx + A[0] * u + B[0] * v, cy + A[1] * u + B[1] * v - 16]; }   // (k 0: who drives, 1: beside; on the bench, a little staggered so that from the side both are seen)
function cartFromDriver(x, y, c8){ const [sx, sy] = cartSeat(0, 0, c8, 0); return [x - sx, y - sy]; }
// where it is heading, from how it moved (a little stickiness, so it does not flicker between two)
function cartTrack(o, x = o.x, y = o.y){
  if (o._cx != null) { const dx = x - o._cx, dy = y - o._cy, m = Math.hypot(dx, dy); if (m > .3 && m < 80) { const a = Math.atan2(dy, dx), q = ((Math.round(a / (Math.PI / 4)) + 2) % 8 + 8) % 8, cur = o.c8 ?? q, off = Math.abs(((a - (cur - 2) * Math.PI / 4) % TAU + TAU + Math.PI) % TAU - Math.PI); o.c8 = off > Math.PI / 8 + .1 ? q : cur; } }
  o._cx = x; o._cy = y; return o.c8;
}
const HORSE = '#7a4a2a', HORSE_D = '#3a2418', HORSE_L = '#5a3a24';
function drawCartHorse(c, p, t){
  const c8 = cartC8(p), { hx, hy, A } = cartAxes(c8), hxp = p.x + A[0] * 46, hyp = p.y + A[1] * 46 * 1.8, w = Math.sin((p.walk || 0) * TAU), l = p.moving ? w * 3 : 0;
  // the shafts, from the box to the horse
  const { B } = cartAxes(c8); for (const s of [-1, 1]) line(c, [[p.x + A[0] * 18 + B[0] * 6 * s, p.y + A[1] * 18 + B[1] * 6 * s - 16], [hxp - A[0] * 10 + B[0] * 4 * s, hyp - A[1] * 10 + B[1] * 4 * s - 18]], '#6a4a30', 1.8, 5 + s);
  c.save(); c.translate(hxp, hyp);
  if (c8 === 4) {   // coming towards us: chest, legs, the long face between the ears
    ell(c, 0, 1, 12, 4, 'rgba(30,40,20,.22)');
    c.strokeStyle = HORSE_L; c.lineWidth = 3.2; c.lineCap = 'round'; c.beginPath(); for (const [lx, s] of [[-6, 1], [6, -1], [-3.5, -1], [3.5, 1]]) { c.moveTo(lx, -12); c.lineTo(lx, l * s * .5); } c.stroke();
    ell(c, 0, -19, 10, 10, HORSE, true); ell(c, 0, -32, 5, 9, HORSE, true); ell(c, 0, -25, 3.6, 3, '#9a6a4a', true);
    blob(c, [[-5, -39], [-3, -46], [-1, -39]], HORSE); blob(c, [[1, -39], [3, -46], [5, -39]], HORSE); line(c, [[0, -41], [0, -34]], HORSE_D, 2.4, 3);
    ell(c, -3, -34, .9, .9, '#1a1a1a'); ell(c, 3, -34, .9, .9, '#1a1a1a');
  } else if (c8 === 0) {   // going away: the rump and the tail, the ears beyond
    ell(c, 0, 1, 12, 4, 'rgba(30,40,20,.22)');
    c.strokeStyle = HORSE_L; c.lineWidth = 3.2; c.lineCap = 'round'; c.beginPath(); for (const [lx, s] of [[-6, 1], [6, -1], [-3.5, -1], [3.5, 1]]) { c.moveTo(lx, -12); c.lineTo(lx, l * s * .5); } c.stroke();
    ell(c, 0, -30, 4.5, 4, HORSE, true); blob(c, [[-4, -32], [-3, -39], [-1, -33]], HORSE); blob(c, [[1, -33], [3, -39], [4, -32]], HORSE);
    ell(c, 0, -19, 11, 10, HORSE, true); line(c, [[0, -24], [Math.sin(t * 2) * 2, -9]], HORSE_D, 2.8, 4);
  } else {   // from the side (or at a slant: the same, shortened)
    const d = hx < 0 ? -1 : 1, k = c8 % 2 ? .74 : 1;
    c.scale(d * k, 1);
    ell(c, -2, 1, 20, 4.6, 'rgba(30,40,20,.22)');
    c.strokeStyle = HORSE_L; c.lineWidth = 3.2; c.lineCap = 'round'; c.beginPath(); for (const [lx, s] of [[-12, 1], [-6, -1], [6, 1], [11, -1]]) { c.moveTo(lx, -14); c.lineTo(lx + l * s, 0); } c.stroke();
    ell(c, 0, -20, 15, 8, HORSE, true); blob(c, [[10, -24], [16, -36], [22, -34], [16, -20]], HORSE); ell(c, 20, -33, 5, 3.6, HORSE, true);
    line(c, [[11, -26], [15, -36]], HORSE_D, 2.6, 3); line(c, [[-15, -22], [-20, -12 + Math.sin(t * 2) * 2]], HORSE_D, 2.4, 4); ell(c, 21, -34, .8, .8, '#1a1a1a');
  }
  c.restore();
}
// the box in two halves, so whoever rides sits inside it: what is behind them (the far wheel, the floor, the far sides,
// the bench), and what is in front (the near sides and wheel); part: 'fondo' | 'frente' | both
function drawCartBody(c, p, t, part){
  const c8 = cartC8(p), { hx, A, B } = cartAxes(c8), x = p.x, y = p.y, P = (u, v, h) => [x + A[0] * u + B[0] * v, y + A[1] * u + B[1] * v - h];
  const wheel = s => { const [wx, wy] = P(-2, CART_W * s, 9), rx = Math.max(1.6, 9 * Math.abs(hx)); ell(c, wx, wy, rx, 9, 'rgba(0,0,0,0)', '#4a3424'); for (let k = 0; k < 4; k++) { const a = k * Math.PI / 4 + (p.moving ? TT * 3 : 0); line(c, [[wx - Math.cos(a) * rx * .9, wy - Math.sin(a) * 8], [wx + Math.cos(a) * rx * .9, wy + Math.sin(a) * 8]], '#4a3424', 1, k); } };
  const near = B[1] > 0 ? 1 : B[1] < 0 ? -1 : 0, far = -near || -1;
  const L = 20, Wd = CART_W, fl = [P(-L, -Wd, 12), P(L, -Wd, 12), P(L, Wd, 12), P(-L, Wd, 12)], rim = [P(-L, -Wd, 25), P(L, -Wd, 25), P(L, Wd, 25), P(-L, Wd, 25)];
  const faces = [0, 1, 2, 3].map(i => { const j = (i + 1) % 4; return { q: [fl[i], fl[j], rim[j], rim[i]], y: (fl[i][1] + fl[j][1]) / 2 }; }).sort((a, b) => a.y - b.y);
  const face = (f, i) => { blob(c, f.q, i < 2 ? '#7a5434' : '#8a6040'); if (i >= 2) { const [a, b] = [f.q[0], f.q[1]]; for (let k = 1; k < 4; k++) line(c, [[lerp(a[0], b[0], k / 4), lerp(a[1], b[1], k / 4)], [lerp(f.q[3][0], f.q[2][0], k / 4), lerp(f.q[3][1], f.q[2][1], k / 4)]], 'rgba(60,40,25,.4)', .8, k); } };
  if (part !== 'frente') {
    ell(c, x, y + 1, 22 + 6 * Math.abs(hx), 7, 'rgba(30,40,20,.22)');
    wheel(far);
    blob(c, fl, '#4a3020');   // (the floor, seen from above)
    faces.slice(0, 2).forEach(face);
    blob(c, [P(-12, -Wd + 1, 19), P(-4, -Wd + 1, 19), P(-4, Wd - 1, 19), P(-12, Wd - 1, 19)], '#9a7048');   // (the bench)
  }
  if (part !== 'fondo') { faces.slice(2).forEach((f, i) => face(f, i + 2)); if (near) wheel(near); else wheel(1); }
}
function drawCart(c, p, t){ const { hy } = cartAxes(cartC8(p)); if (hy < -.1) { drawCartHorse(c, p, t); drawCartBody(c, p, t); } else { drawCartBody(c, p, t); drawCartHorse(c, p, t); } }
// into a list sorted by depth: the box and the horse separately (people sit between them)
function pushCart(list, g, p, t){ const { A } = cartAxes(cartC8(p)); list.push({ y: p.y - 40, draw: () => drawCartBody(g, p, t, 'fondo') }, { y: p.y + 1, draw: () => drawCartBody(g, p, t, 'frente') }, { y: p.y + A[1] * 46 * 1.8 + 1, draw: () => drawCartHorse(g, p, t) }); }
// whoever drives: the buggy around them, and they (and whoever rides beside) sitting in it, facing the way it goes
function pushDriven(list, g, p, t){
  const c8 = cartC8(p), [cx, cy] = cartFromDriver(p.x, p.y, c8);
  pushCart(list, g, { x: cx, y: cy, c8, walk: p.walk || 0, moving: !!(p.moving || (p.roadDir && !p.roadWait) || p.drive) }, t);
  list.push({ y: p.y, draw: () => drawPerson(g, { ...p, _fx: undefined, sit: true, moving: false, dir: c8Dir(c8) }, t) });
}

// putting things down and picking them up again (the watering can too), and drinking the tea she made
function setAnaState(k, on = true){
  if (!!game.anaStates[k] === on) return;
  if (on) { game.anaStates[k] = true; anaSays(dicho('estado:' + k)); logEv('Ana ' + ANA_STATES[k].desc + '.'); } else delete game.anaStates[k];
  save();
}
// the menu when Ana is touched: what the book's Ana could do here (from the planner), in a few groups so that a long
// list does not swamp it (the ones that serve what she has to do first), and what to do with what she carries
const ACC_GRUPOS = [
  ['🏠 Quehaceres', ['quehacer', 'coser', 'batir', 'ordeñar', 'alimentar', 'sembrar', 'regar', 'hacer_heno', 'acarrear_lena', 'partir_lena', 'decorar_sala']],
  ['📖 Leer y escribir', ['estudiar', 'leer', 'escribir_carta', 'enviar_carta', 'escribir_cuento', 'ensayar', 'recitar', 'actuar', 'rezar']],
  ['🌸 Jugar e imaginar', ['trineo', 'patinar', 'remar', 'nombrar', 'trepar']],
  ['🎀 Arreglarme', ['teñir', 'cortar_pelo', 'adornar']],
];
const cap = s => s[0].toUpperCase() + s.slice(1);
function anaMenu(){
  if (retenida()) { notice('Ahora no: la están mirando, esperan lo que Ana diga.'); return; }
  const J = jugables(), mine = cartas().filter(c => c.para === 'ana' && c.estado === 'recibida').map(c => ['📜 Leer la carta de ' + CORREO[c.de].nombre, () => cartaLeer(c)]);
  const R = pausadasHoy().map(([k, p]) => ['↺ Retomar: ' + stepText(p.a) + ' (lo dejaste a medias)', () => retomar(k)]);   // (what she left half done today, first: src/js/63-jugar.js)
  for (const k of Object.keys(game.anaStates)) if (ANA_STATES[k].fix) mine.push([ANA_STATES[k].fix, () => { close(); setAnaState(k, false); }]);
  // (in her nightgown at home: to dress, as Marilla asks; up to her room if she is not there, where her dress is)
  if (game.wm?.camison && enCasa('ana') && hourNow() % 24 >= 5 && hourNow() % 24 < 20) mine.push(['👗 Vestirse', () => { close(); if (game.scene !== 'ga') goIn('ga', [GA.bed.x - 20, GA.bed.y + 16]); if (game.wm.ropaTirada) ropaPonerse(); else vestirse(); }]);
  if (game.inv.te > 0) mine.push(['☕ Tomar la taza de té', sipTea]);
  if (game.scene === 'out' && (S !== 3 || ana.lie)) mine.push([ana.lie ? 'Levantarse' : '🌿 Recostarme en el pasto', () => { close(); if (ana.lie) { ana.lie = false; return; } if (nearPath(ana.x, ana.y, 26)) return anaSays(dicho('pasto_camino')); if (underTree(ana.x, ana.y)) return anaSays(dicho('pasto_arbol')); ana.lie = true; ana.sit = false; ana.goto = null; ana.dir = 2; logEv('Ana se recostó en el pasto a mirar las nubes.'); }]);
  if (game.scene === 'out' && game.inv.semillas > 0 && !game.huertito) mine.push(['🌱 Hacer mi huertito aquí', hacerHuertito]);   // (where she wants it)
  if (game.hasCan) mine.push(['Dejar la regadera', () => dropItem('can')]);
  for (const k of ITEMS) if (game.inv[k] > 0) mine.push(['Dejar ' + itemText(k, game.inv[k]), () => dropItem(k)]);
  if (!J.length && !mine.length && !R.length) { float('No llevo nada en las manos', ana.x, ana.y - 60); return; }
  const act = a => [cap(stepText(a)), () => jugar(a)];
  const plan = new Set((AGENTS.ana?.tasks || []).filter(t => t.st !== 'done' && t.st !== 'skip').map(t => t.a.v + ':' + (t.a.k || t.a.x || '')));
  const sug = J.filter(a => plan.has(a.v + ':' + (a.k || a.x || '')));   // (what serves the goals she has)
  if (J.length + mine.length <= 6) return say('Ana', '¿Qué hago?', [...R, ...J.map(a => { const [l, f] = act(a); return ['✨ ' + l, f]; }), ...mine, ['Nada', close]]);
  // more than that: by groups (with someone; chores; reading and writing; play; dressing up; what she carries)
  const groups = [];
  if (sug.length) groups.push(['⭐ Lo que me toca', sug]);
  const rest = J.filter(a => !sug.includes(a));
  for (const k of [...new Set(rest.filter(a => a.k).map(a => a.k))]) groups.push(['👭 Con ' + wmName(k), rest.filter(a => a.k === k)]);
  for (const [name, vs] of ACC_GRUPOS) groups.push([name, rest.filter(a => !a.k && vs.includes(a.v))]);
  groups.push(['✨ Otras cosas', rest.filter(a => !a.k && !ACC_GRUPOS.some(([, vs]) => vs.includes(a.v)))]);
  const top = groups.filter(([, L]) => L.length).map(([name, L]) => L.length === 1 ? [(name.startsWith('⭐') ? '⭐ ' : '✨ ') + act(L[0])[0], act(L[0])[1]] : [name + ' (' + L.length + ')', () => say('Ana', name.replace(/^\S+ /, '') + ':', [...L.map(act), ['← Volver', anaMenu]])]);
  if (mine.length) top.push(['👜 Lo que llevo (' + mine.length + ')', () => say('Ana', '¿Qué hago con lo que llevo?', [...mine, ['← Volver', anaMenu]])]);
  say('Ana', '¿Qué hago?', [...R, ...top, ['Nada', close]]);
}
function dropItem(k){
  const x = ana.x + (ana.dir === 3 ? -14 : 14), y = ana.y + 3;
  if (k === 'can') { game.ground.push({ id: ++game.groundSeq, k, x, y, scene: game.scene, water: game.water }); game.hasCan = false; game.water = 0; ana.carry = null; logEv('Ana dejó la regadera en el suelo.'); }
  else {
    const n = game.inv[k]; if (!n) return close();
    const ex = game.ground.find(it => it.k === k && it.scene === game.scene && dist(it.x, it.y, x, y) < 24);
    if (ex) ex.n += n; else game.ground.push({ id: ++game.groundSeq, k, n, x, y, scene: game.scene });
    game.inv[k] = 0; logEv('Ana dejó ' + itemText(k, n) + ' en el suelo.');
  }
  close(); sfx.water(); save();
}
function pickUp(it){
  game.ground = game.ground.filter(q => q !== it);
  if (it.k === 'can') { game.hasCan = true; game.water = it.water; ana.carry = 'can'; float('regadera', it.x, it.y - 24); }
  else { game.inv[it.k] += it.n; float('+' + itemText(it.k, it.n), it.x, it.y - 24); }
  logEv('Ana recogió ' + (it.k === 'can' ? 'la regadera' : itemText(it.k, it.n)) + ' del suelo.'); sfx.happy(); save();
}
function sipTea(){
  close(); game.inv.te--; game.sipUntil = TT + 40; ana.dir = 2; ana.goto = null;
  logEv('Ana se tomó con calma la taza de té que había preparado.'); float('☕ ¡Qué rico!', ana.x, ana.y - 60); sfx.happy(); save();
}
function drawGround(c, it){
  ell(c, it.x, it.y + 1, 9, 3.4, 'rgba(30,40,20,.25)');
  if (it.k === 'can') { blob(c, [[it.x - 6, it.y - 1], [it.x + 6, it.y - 1], [it.x + 5, it.y - 10], [it.x - 5, it.y - 10]], '#9db3bf'); line(c, [[it.x + 6, it.y - 6], [it.x + 11, it.y - 11]], 'rgba(70,90,100,.9)', 1.6); line(c, [[it.x - 5, it.y - 10], [it.x, it.y - 15], [it.x + 5, it.y - 10]], 'rgba(70,90,100,.9)', 1.2); return; }
  c.font = '13px serif'; c.textAlign = 'center'; c.fillStyle = '#000'; c.fillText(ITEM_DEFS[it.k].icon, it.x, it.y - 3);
  if (it.n > 1) { c.font = 'bold 8px Georgia, serif'; c.lineWidth = 2; c.strokeStyle = 'rgba(255,250,235,.9)'; c.strokeText(it.n, it.x + 9, it.y); c.fillStyle = '#4a2f1c'; c.fillText(it.n, it.x + 9, it.y); }
}