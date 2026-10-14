/* ---------- the animals of the farms: cows, sheep and horses in the pastures, hens about the farmyards, pigs, ducks on the
   lake and the river, gulls by the sea, cats in the village. Made from the map (they go where it says); they move only when
   they can be seen. ---------- */
const FAUNA = [];
{
  const r = rng(4242), add = (kind, x, y, area, o = {}) => FAUNA.push({ kind, x, y, area, dir: r() < .5 ? 1 : 3, walk: 0, moving: false, wait: r() * 6, tx: x, ty: y, ph: r() * TAU, ...o });
  const inRect = A => [A.x + 30 + r() * (A.w - 60), A.y + 30 + r() * (A.h - 60)];
  const COWS = [['#c8915a', '#9a6a3e', '#f2e6d0'], ['#3e3a3a', '#2a2626', '#e8e0d8'], ['#9a4a2e', '#6e3420', '#f2e6d0'], ['#e8e0d0', '#b8a890', '#fff8f0']];
  const HORSES = ['#7a4a2a', '#5a3a24', '#b0a8a0', '#3a2a24', '#a8683a'];
  FIELDS.filter(f => f.crop === 4 || f.crop === 1).forEach((f, i) => {
    if (r() < .35) return;
    const A = { x: f.x, y: f.y, w: f.w, h: f.h }, k = i % 3;
    if (k === 0) { const c = COWS[Math.floor(r() * COWS.length)]; for (let n = 3 + Math.floor(r() * 3); n--;) add('cow', ...inRect(A), A, { coat: c }); }
    else if (k === 1) for (let n = 5 + Math.floor(r() * 4); n--;) add('sheep', ...inRect(A), A, { black: r() < .12 });
    else for (let n = 2 + Math.floor(r() * 2); n--;) add('horse', ...inRect(A), A, { coat: HORSES[Math.floor(r() * HORSES.length)] });
  });
  const yards = [...BUILDINGS.filter(b => b.style === 'granja' || /Blythe|Gillis|Peg/.test(b.name)), { x: BARN.x, y: BARN.y }, { x: HH.x, y: HH.y }, { x: OS.x, y: OS.y }];
  for (const b of yards) { const A = { x: b.x + 40, y: b.y + 40, w: 200, h: 120 }; for (let n = 4 + Math.floor(r() * 4); n--;) add('hen', ...inRect(A), A, { rooster: n === 0, white: r() < .5 }); }
  { const K = BUILDINGS.find(b => b.name === 'Granja King'), A = { x: K.x - 260, y: K.y + 30, w: 180, h: 110 }; for (let n = 3; n--;) add('pig', ...inRect(A), A); }
  { const A = { x: LAKE.x - LAKE.rx * .6, y: LAKE.y - LAKE.ry * .5, w: LAKE.rx * 1.2, h: LAKE.ry }; for (let n = 7; n--;) add('duck', ...inRect(A), A, { water: true, white: n < 2 }); }
  { const B = BRIDGES_COVERED_AT(), A = { x: B[0] - 60, y: B[1] + 120, w: 40, h: 220 }; for (let n = 3; n--;) add('duck', ...inRect(A), A, { water: true }); }
  { const A = { x: PLACES.playa[1] - 500, y: PLACES.playa[2] - 140, w: 1000, h: 160 }; for (let n = 8; n--;) add('gull', ...inRect(A), A); }
  for (let n = 0; n < 9; n++) add('gull', 0, 0, null, { fly: true, s: r(), sp: .004 + r() * .004, off: 80 + r() * 260, alt: 60 + r() * 60 });
  for (const n of ['Tienda de Lawson', 'Rose Cottage', 'Pensión', 'Casa de los Potts']) { const [x, y] = door(n); add('cat', x + 50, y - 20, { x: x - 30, y: y - 30, w: 140, h: 60 }, { c: ['#e0a050', '#3a3436', '#9a9a9a', '#f4ece0'][FAUNA.length % 4] }); }
}
const BUGGIES = [
  { name: 'el coche del correo', from: [STATION.x + 60, STATION.y + 80], to: door('Casa de los Blythe'), look: 'f:cartero', s: 0, back: false, x: 0, y: 0, dir: 1, walk: 0, moving: true, route: null },
  { name: 'la carreta del Sr. Sloane', from: door('Granja Sloane'), to: [GG.x + 120, GG.y + 110], look: 'f:carretero', s: 0, back: false, x: 0, y: 0, dir: 1, walk: 0, moving: true, route: null, wait: 40 },
];
LOOKS['f:cartero'] = { hair: '#3a2a20', hairD: '#2a1a10', dress: '#2a3a6a', dressD: '#1a2a50', coat: true, hatDark: true, skin: '#eecaae', h: 1.12, scarf: '#a85a4a' };
LOOKS['f:carretero'] = { hair: '#8a7a6a', hairD: '#6a5a4a', style: 'old', dress: '#6a5a40', dressD: '#4a3a20', coat: true, skin: '#e0b090', h: 1.14, scarf: '#a85a4a' };
for (const b of BUGGIES) { const r = netRoute(...b.from, ...b.to); b.route = r ? [b.from, ...r.pts, b.to] : [b.from, b.to]; b.len = b.route.slice(1).reduce((s, p, i) => s + dist(...b.route[i], ...p), 0); b.s = Math.random() * b.len; }
function buggyAt(b, s){ let acc = 0; for (let i = 1; i < b.route.length; i++) { const a = b.route[i - 1], c = b.route[i], d = dist(...a, ...c); if (acc + d >= s) { const q = (s - acc) / (d || 1); return [lerp(a[0], c[0], q), lerp(a[1], c[1], q), c[0] - a[0], c[1] - a[1]]; } acc += d; } const e = b.route[b.route.length - 1]; return [e[0], e[1], 1, 0]; }
function faunaTick(dt){
  for (const b of BUGGIES) {
    if ((b.wait || 0) > 0) { b.wait -= dt; b.moving = false; }
    else { b.s += (b.back ? -1 : 1) * 70 * dt; if (b.s > b.len || b.s < 0) { b.s = clamp(b.s, 0, b.len); b.back = !b.back; b.wait = 20 + Math.random() * 30; } b.moving = true; b.walk = (b.walk + 1.8 * 70 * dt / SPEED) % 1; }
    const [x, y, dx] = buggyAt(b, b.s); b.x = x; b.y = y; if (Math.abs(dx) > 1) b.dir = (dx > 0) !== b.back ? 1 : 3; cartTrack(b);
  }
  if (viewScene() !== 'out') return;
  for (const a of FAUNA) {
    a.ph += dt;
    if (a.fly) { const L = coastSegs.length, u = ((TT * a.sp + a.s) % 1) * L, i = Math.floor(u), [p, q] = coastSegs[i], k = u - i, nx = q[1] - p[1], ny = -(q[0] - p[0]), nl = Math.hypot(nx, ny) || 1; a.x = lerp(p[0], q[0], k) + nx / nl * a.off; a.y = lerp(p[1], q[1], k) + ny / nl * a.off; a.dir = q[0] > p[0] ? 1 : 3; continue; }
    if (!seen(a.x, a.y, 300)) continue;
    const dx = a.tx - a.x, dy = a.ty - a.y, d = Math.hypot(dx, dy), sp = { cow: 12, sheep: 16, horse: 22, hen: 20, pig: 12, duck: 14, gull: 18, cat: 20 }[a.kind];
    if (d > 2) { const v = Math.min(sp * dt, d); a.x += dx / d * v; a.y += dy / d * v; a.moving = true; a.walk = (a.walk + dt * sp / 14) % 1; if (Math.abs(dx) > .5) a.dir = dx > 0 ? 1 : 3; }
    else { a.moving = false; a.munch = (Math.sin(a.ph * .7) + 1) / 2; if ((a.wait -= dt) <= 0) { const A = a.area; a.wait = (a.kind === 'hen' ? 1 : a.kind === 'cat' ? 8 : 4) + Math.random() * 8; const r = a.kind === 'hen' ? 40 : 140; a.tx = clamp(a.x + (Math.random() - .5) * r * 2, A.x + 20, A.x + A.w - 20); a.ty = clamp(a.y + (Math.random() - .5) * r, A.y + 20, A.y + A.h - 20); if (a.water && !inLake(a.tx, a.ty, -30) && !inBrook(a.tx, a.ty, -8)) { a.tx = a.x; a.ty = a.y; } } }
  }
}
function drawSheep(c, a, t){
  const x = a.x, y = a.y, d = a.dir === 3 ? -1 : 1, l = a.moving ? Math.sin(a.walk * TAU) * 2 : 0, wool = a.black ? '#4a4446' : S === 3 ? '#f4f2ee' : '#f2ede2', down = !a.moving && (a.munch || 0) > .55;
  ell(c, x, y + 1, 13, 3.6, 'rgba(30,40,20,.24)');
  c.save(); c.translate(x, y); c.scale(d, 1);
  line(c, [[-6, -6], [-6 + l, 0]], '#3a3436', 2, 1); line(c, [[6, -6], [6 - l, 0]], '#3a3436', 2, 2);
  for (const [bx, by, r] of [[-6, -10, 6], [0, -12, 7], [6, -10, 6], [-3, -7, 5], [4, -7, 5]]) ell(c, bx, by, r, r * .85, wool, true);
  const hx = 11, hy = down ? -4 : -12; ell(c, hx, hy, 4, 5, '#3a3436', true); ell(c, hx - 2, hy - 4, 2.6, 1.4, '#3a3436', true); ell(c, hx + 1.5, hy - 1, .8, .8, '#fff');
  c.restore();
}
function drawHorse(c, a, t){
  const x = a.x, y = a.y, d = a.dir === 3 ? -1 : 1, l = a.moving ? Math.sin(a.walk * TAU) * 3 : 0, down = !a.moving && (a.munch || 0) > .6, col = a.coat;
  ell(c, x, y + 1, 20, 4.6, 'rgba(30,40,20,.24)');
  c.save(); c.translate(x, y); c.scale(d, 1);
  c.strokeStyle = col; c.lineWidth = 3.2; c.lineCap = 'round'; c.beginPath(); for (const [lx, s] of [[-11, 1], [-6, -1], [7, 1], [11, -1]]) { c.moveTo(lx, -14); c.lineTo(lx + l * s, 0); } c.stroke();
  ell(c, 0, -20, 15, 8, col, true);
  if (down) { blob(c, [[9, -22], [14, -20], [20, -6], [15, -6]], col); ell(c, 18, -5, 5, 3.4, col, true); }
  else { blob(c, [[9, -24], [15, -36], [21, -34], [15, -20]], col); ell(c, 20, -33, 5, 3.6, col, true); ell(c, 21, -34, .8, .8, '#1a1a1a'); line(c, [[10, -26], [14, -36]], 'rgba(30,20,15,.8)', 2.6, 3); }
  line(c, [[-15, -22], [-19, -12 + Math.sin(t * 2 + x) * 2]], 'rgba(30,20,15,.8)', 2.4, 4);
  c.restore();
}
function drawHen(c, a, t){
  const x = a.x, y = a.y, d = a.dir === 3 ? -1 : 1, peck = !a.moving && Math.sin(a.ph * 5) > .4, col = a.white ? '#f4efe4' : '#b8683a';
  ell(c, x, y + 1, 5, 1.6, 'rgba(30,40,20,.24)');
  c.save(); c.translate(x, y); c.scale(d, 1);
  line(c, [[-1, -3], [-1, 0]], '#d8a040', .9, 1); line(c, [[1.5, -3], [1.5, 0]], '#d8a040', .9, 2);
  ell(c, 0, -5.5, 5, 3.6, col, true); blob(c, [[-4, -6], [-7.5, -10], [-6, -5]], a.rooster ? '#2a4a3a' : col);
  const hy = peck ? -3 : -9; ell(c, 4, hy, 2.4, 2.4, col, true); ell(c, 4, hy - 2.6, 1.2, 1, '#c8302a', true); blob(c, [[6, hy - .5], [8, hy], [6, hy + .8]], '#d8a040', false); ell(c, 4.6, hy - .4, .45, .45, '#1a1a1a');
  c.restore();
}
function drawPig(c, a, t){
  const x = a.x, y = a.y, d = a.dir === 3 ? -1 : 1, l = a.moving ? Math.sin(a.walk * TAU) * 1.6 : 0;
  ell(c, x, y + 1, 11, 3, 'rgba(30,40,20,.24)');
  c.save(); c.translate(x, y); c.scale(d, 1);
  line(c, [[-5, -4], [-5 + l, 0]], '#d8908a', 2.2, 1); line(c, [[5, -4], [5 - l, 0]], '#d8908a', 2.2, 2);
  ell(c, 0, -7, 10, 6, '#f2b0a8', true); ell(c, 10, -8, 3, 3, '#f2b0a8', true); ell(c, 12.6, -7.6, 1.6, 1.6, '#e0908a', true); blob(c, [[7, -12], [9, -15], [10, -11]], '#e0908a');
  ell(c, 9.6, -9.4, .6, .6, '#1a1a1a'); line(c, [[-10, -8], [-12, -10], [-11, -12]], '#e0908a', 1, 3);
  c.restore();
}
function drawDuck(c, a, t){
  if (S === 3) return;
  const x = a.x, y = a.y + Math.sin(t * 2 + a.ph) * .6, d = a.dir === 3 ? -1 : 1;
  c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = .8; c.beginPath(); c.ellipse(x, a.y + 1, 9, 2.4, 0, 0, TAU); c.stroke();
  c.save(); c.translate(x, y); c.scale(d, 1);
  ell(c, 0, -2.4, 6.4, 3, a.white ? '#f4f2ee' : '#8a7058', true); ell(c, 4.4, -6.4, 2.4, 2.4, a.white ? '#f4f2ee' : '#2e6a46', true); blob(c, [[6.4, -6.4], [9, -5.8], [6.4, -5.4]], '#e0a040', false); ell(c, 4.8, -7, .45, .45, '#1a1a1a');
  c.restore();
}
function drawGull(c, a, t){
  if (a.fly) { const f = Math.sin(t * 6 + a.ph) * 5, y = a.y - a.alt; ell(c, a.x + 20, a.y, 4, 1.4, 'rgba(30,40,20,.15)'); line(c, [[a.x - 9, y + f], [a.x - 3, y - 2], [a.x, y], [a.x + 3, y - 2], [a.x + 9, y + f]], '#f4f2ee', 2.2, 2); line(c, [[a.x - 9, y + f], [a.x - 7, y + f * .8]], '#3a3436', 2, 3); line(c, [[a.x + 9, y + f], [a.x + 7, y + f * .8]], '#3a3436', 2, 4); return; }
  const x = a.x, y = a.y, d = a.dir === 3 ? -1 : 1;
  ell(c, x, y + 1, 5, 1.5, 'rgba(30,40,20,.2)');
  c.save(); c.translate(x, y); c.scale(d, 1);
  line(c, [[-1, -3], [-1, 0]], '#e0a040', .8, 1); line(c, [[1, -3], [1, 0]], '#e0a040', .8, 2);
  ell(c, 0, -5, 5, 2.8, '#f4f2ee', true); blob(c, [[-5, -6], [3, -7], [-7, -3]], '#a8acb4'); ell(c, 4, -8, 2.2, 2.2, '#f4f2ee', true); blob(c, [[5.8, -8.2], [8.4, -7.6], [5.8, -7.2]], '#e8c040', false); ell(c, 4.5, -8.5, .4, .4, '#1a1a1a');
  c.restore();
}
function drawCat(c, a, t){
  const x = a.x, y = a.y, d = a.dir === 3 ? -1 : 1, sw = Math.sin(t * 1.6 + a.ph) * 2;
  ell(c, x, y + 1, 7, 2, 'rgba(30,40,20,.22)');
  c.save(); c.translate(x, y); c.scale(d, 1);
  line(c, [[-5, -2], [-9, -4 + sw * .4], [-10, -9 + sw]], a.c, 1.8, 1);
  if (a.moving) { ell(c, 0, -5, 7, 3.4, a.c, true); line(c, [[-4, -3], [-4, 0]], a.c, 1.6, 2); line(c, [[4, -3], [4, 0]], a.c, 1.6, 3); ell(c, 7, -8, 3.4, 3, a.c, true); blob(c, [[5, -10], [6, -13.5], [7.6, -10.6]], a.c); blob(c, [[7.6, -10.6], [9.4, -13.4], [10, -9.6]], a.c); }
  else { ell(c, 0, -5, 5, 5, a.c, true); ell(c, 2, -12, 3.6, 3.2, a.c, true); blob(c, [[0, -14], [.6, -17.6], [2.4, -14.6]], a.c); blob(c, [[2.6, -14.6], [4.4, -17.4], [5, -13.6]], a.c); }
  c.restore();
}
const FAUNA_DRAW = { cow: (c, a, t) => drawCow(c, a, t), sheep: drawSheep, horse: drawHorse, hen: drawHen, pig: drawPig, duck: drawDuck, gull: drawGull, cat: drawCat };
function drawBuggy(c, b, t){ const c8 = cartC8(b), [sx, sy] = cartSeat(b.x, b.y, c8, 0), who = () => drawPerson(c, { look: b.look, x: sx, y: sy, dir: c8Dir(c8), sit: true, walk: 0, moving: false, blink: 0 }, t); const body = () => { drawCartBody(c, b, t, 'fondo'); who(); drawCartBody(c, b, t, 'frente'); }; if (cartAxes(c8).hy < -.1) { drawCartHorse(c, b, t); body(); } else { body(); drawCartHorse(c, b, t); } }
