/* ---------- the fenced places: fields and pens (to add one: an entry here; it gets its fence, its ground, a place
   on the map and a place the characters and the stories can name). kind: 'oats' or 'pen'; gate: the side with the gate */
const AREAS = {
  corral: { name: 'el corral de Tejas Verdes', kind: 'pen', x: GG.x - 2 * T - 3.8 * T - 60, y: GG.y - 4 * T - 40, w: 3.8 * T, h: 4 * T, gate: 'S' },
  avena: { name: 'el campo de avena del Sr. Harrison', kind: 'oats', x: PL.avena[0], y: PL.avena[1], w: 7 * T, h: 6 * T, gate: 'N' },
  potrero: { name: 'el potrero del Sr. Harrison', kind: 'pen', x: HH.x - 5 * T - 3.8 * T, y: HH.y + 1.4 * T, w: 3.8 * T, h: 3 * T, gate: 'E' },
};
const inArea = (A, x, y, m = 0) => x > A.x - m && x < A.x + A.w + m && y > A.y - m && y < A.y + A.h + m;
const inAreas = (x, y, m = 0) => Object.values(AREAS).some(A => inArea(A, x, y, m));
const areaAt = (x, y) => Object.keys(AREAS).find(k => inArea(AREAS[k], x, y));
const FENCES = [];
for (const A of Object.values(AREAS)) {
  const c = [[A.x, A.y], [A.x + A.w, A.y], [A.x + A.w, A.y + A.h], [A.x, A.y + A.h]], sides = { N: [0, 1], E: [1, 2], S: [3, 2], W: [0, 3] };
  for (const [side, [i, j]] of Object.entries(sides)) {
    const a = c[i], b = c[j];
    if (side !== A.gate) { FENCES.push([a, b]); continue; }
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, len = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / len, uy = (b[1] - a[1]) / len;
    FENCES.push([a, [mx - ux * 22, my - uy * 22]], [[mx + ux * 22, my + uy * 22], b]);
  }
}
const nearFence = (x, y, m = 5) => FENCES.some(([a, b]) => segDist(x, y, a, b) < m);
// the paths: the roads of the map, the little paths to each door
const ROADS = Object.fromEntries(Object.entries(MAP.roads).map(([k, p]) => [k, p.map(mU)]));
const paths = [...Object.values(ROADS), [[GG.x - 60, GG.y + 70], [BARN.x + 20, BARN.y + 30]]];
for (const h of Object.values(HOUSES)) if (h.path) paths.push(h.path);
// (a path to a door leaves from the front of the house; if the road is behind it, around the house, not through it)
const entrada = (x, y, w, best) => { const pie = [x, y + 44]; if (best[1] > y - 10 || Math.abs(best[0] - x) > w / 2 + 30) return [[x, y + 8], pie, best];
  const lado = Math.sign(best[0] - x) || 1, cx = x + lado * (w / 2 + 34); return [[x, y + 8], pie, [cx, y + 44], [cx, best[1]], best]; };
for (const h of [OS, STATION, CHURCH, SCHOOL, HOTEL_WS_AT]) { let best = null, bd = 1e9; for (const p of Object.values(ROADS)) for (const q of p) { const d = dist(q[0], q[1], h.x, h.y + 40); if (d < bd) { bd = d; best = q; } } if (best && bd > 30) paths.push(entrada(h.x, h.y, h.w || 160, best)); }
for (const b of BUILDINGS) if (b.style !== 'faro') { let best = null, bd = 1e9; for (const p of Object.values(ROADS)) for (let i = 1; i < p.length; i++) { const [a, c] = [p[i - 1], p[i]], dx = c[0] - a[0], dy = c[1] - a[1], t = clamp(((b.x - a[0]) * dx + (b.y + 40 - a[1]) * dy) / (dx * dx + dy * dy), 0, 1), q = [a[0] + dx * t, a[1] + dy * t], d = dist(q[0], q[1], b.x, b.y + 40); if (d < bd) { bd = d; best = q; } } if (best && bd > 20 && bd < 12 * U) paths.push(entrada(b.x, b.y, b.w || 4.6 * T, best)); }
paths.push([[TOWN[0], TOWN[1]], [WW - 2, TOWN[1] + 4]]);
// (no road goes through a house: a point of it inside one goes out in front, by the door; a stretch that crosses one goes
// around it, by the shorter side, along its front or its sides; the same for every road and every path to a door)
{ const cajas = [...Object.values(HOUSES).filter(h => !h.road).map(h => [h.at, h.depth]), [BARN, 96], ...BUILDINGS.filter(b => b.style !== 'faro').map(b => [b, 100])].map(([b, d]) => ({ x0: b.x - b.w / 2, x1: b.x + b.w / 2, y0: b.y - d, y1: b.y }));
  const dentro = (c, x, y, m) => x > c.x0 - m && x < c.x1 + m && y > c.y0 - m && y < c.y1 + m;
  const corta = (c, a, b) => { for (let k = 1; k < 40; k++) { const t = k / 40; if (dentro(c, a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, -4)) return true; } return false; };
  const largo = q => q.slice(1).reduce((s, v, i) => s + dist(q[i][0], q[i][1], v[0], v[1]), 0);
  for (const p of paths) for (const c of cajas) {
    for (const v of p) if (dentro(c, v[0], v[1], 0)) v[1] = c.y1 + 40;
    const E = [[c.x0 - 34, c.y0 - 34], [c.x1 + 34, c.y0 - 34], [c.x1 + 34, c.y1 + 40], [c.x0 - 34, c.y1 + 40]];
    for (let i = 1; i < p.length; i++) { const a = p[i - 1], b = p[i]; if (!corta(c, a, b)) continue;
      let mejor = null; for (let s = 0; s < 4; s++) for (let e = 0; e < 4; e++) for (const dir of [1, 3]) { if (corta(c, a, E[s]) || corta(c, E[e], b)) continue;
        const q = [a]; for (let k = s; ; k = (k + dir) % 4) { q.push(E[k]); if (k === e) break; } q.push(b); const L = largo(q); if (!mejor || L < mejor.L) mejor = { L, q }; }
      if (mejor) { p.splice(i, 0, ...mejor.q.slice(1, -1).map(v => [...v])); i += mejor.q.length - 2; } } } }
const segs = []; paths.forEach(p => { for (let i = 0; i + 1 < p.length; i++) segs.push([p[i], p[i + 1]]); });
const nearPathI = segIndex(segs), nearPath = (x, y, w) => nearPathI(x, y, w);
const brookSegs = []; for (let i = 0; i + 1 < brook.length; i++) brookSegs.push([brook[i], brook[i + 1]]);
const WATERS = RIVERS.map(r => ({ pts: r.pts, bridge: r.bridges[0], bridges: r.bridges, segs: r.pts.slice(1).map((p, i) => [r.pts[i], p]) }));
for (const w of WATERS) w.near = segIndex(w.segs);
const inBrook = (x, y, m = 0) => WATERS.some(w => w.near(x, y, (w.pts === brook ? 14 : 20) + m) && !w.bridges.some(b => Math.abs(x - b.x) < 44 && Math.abs(y - b.y) < 24));
const inLake = (x, y, m = 0) => ((x - LAKE.x) / (LAKE.rx + m)) ** 2 + ((y - LAKE.y) / (LAKE.ry + m)) ** 2 < 1;
const inBox = (b, d, x, y, m) => x > b.x - b.w / 2 - m && x < b.x + b.w / 2 + m && y > b.y - d - m && y < b.y + m;
const HBOX = [...Object.values(HOUSES).map(h => [h.at, h.road ? 12 : h.depth]), [BARN, 96], ...BUILDINGS.map(b => [b, b.style === 'faro' ? 30 : 100])];
const inHouses = (x, y, m = 0) => HBOX.some(([b, d]) => Math.abs(x - b.x) < b.w / 2 + m + 4 && inBox(b, d, x, y, m));
const WOODS = MAP.woods.map(w => ({ ...w, x: w.at[0] * U, y: w.at[1] * U, rx: w.r[0] * U, ry: w.r[1] * U }));
const inWood = (x, y) => WOODS.find(w => ((x - w.x) / w.rx) ** 2 + ((y - w.y) / w.ry) ** 2 < 1);
const LUPINS = MAP.lupins.map(l => ({ x: l.at[0] * U, y: l.at[1] * U, rx: l.r[0] * U, ry: l.r[1] * U }));
const inLupins = (x, y) => LUPINS.some(l => ((x - l.x) / l.rx) ** 2 + ((y - l.y) / l.ry) ** 2 < 1);
// the kitchen garden: six beds by Green Gables, Marilla's flowers (already in leaf: they come back every year); each
// grows when watered, slowly, night by night (seed, sprout, leaves, flowers: src/js/51-huertito.js)
const BEDS = []; for (let r = 0; r < 2; r++) for (let k = 0; k < 3; k++) BEDS.push({ x: GG.x + GG.w / 2 + 80 + k * 46, y: GG.y + 20 + r * 44, stage: 2, wet: 0, grow: 0, dias: 0, kind: (r * 3 + k) % 3 });
const FLOWER_KINDS = [['#f08aa0', 'rosas'], ['#f2c94c', 'girasoles'], ['#a58ad8', 'lilas'], ['#f08a3a', 'capuchinas']];
const inBeds = (x, y) => BEDS.some(b => Math.abs(x - b.x) < 24 && Math.abs(y - b.y) < 18);
const free = (x, y, m) => !inLake(x, y, m) && !inSea(x, y, m + 20) && !inHouses(x, y, m + 24) && !inAreas(x, y, m + 12) && !nearPath(x, y, m + 22) && !inBrook(x, y, m + 10) && !inBeds(x, y) && dist(x, y, PUMP.x, PUMP.y) > 40;
// the patchwork of fields: plots of wheat, oats, potatoes, hay and ploughed earth, where the land is open
const FIELDS = [];
{ const r = rng(1878), cw = 5.2 * U, ch = 3.8 * U;
  for (let gy = 0; gy * ch < WH; gy++) for (let gx = 0; gx * cw < WW; gx++) {
    if (r() < .38) continue;
    const w = cw * (.7 + r() * .25), h = ch * (.7 + r() * .25), x = gx * cw + (cw - w) * r(), y = gy * ch + (ch - h) * r(), crop = Math.floor(r() * 5);
    const corners = [[x, y], [x + w, y], [x, y + h], [x + w, y + h], [x + w / 2, y + h / 2]];
    if (corners.some(([a, b]) => inSea(a, b, 60) || inWood(a, b) || inLake(a, b, 60) || nearPath(a, b, 50) || inBrook(a, b, 40) || inHouses(a, b, 90) || inAreas(a, b, 60) || inLupins(a, b) || dist(a, b, GG.x, GG.y) < 6 * U || dist(a, b, OS.x, OS.y) < 5 * U)) continue;
    FIELDS.push({ x, y, w, h, crop, rows: r() < .5 });
  } }
const inFields = (x, y, m = 0) => FIELDS.some(f => x > f.x - m && x < f.x + f.w + m && y > f.y - m && y < f.y + f.h + m);
// trees: the woods (spruces, pines and a few birches), an orchard at Orchard Slope, cherries along the White Way
// of Delight, trees along the roads and about the fields; looked up by neighbourhood (there are many)
const trees = [];
const TB = 128, treeBins = new Map(), binKey = (x, y) => Math.floor(x / TB) + ',' + Math.floor(y / TB);
const tree = (x, y, kind, s = .9 + R() * .35) => { const t = { kind, x, y, s, ph: R() * TAU, apples: kind === 'apple' ? 3 : 0, regrow: 0 }; trees.push(t); const k = binKey(x, y); if (!treeBins.has(k)) treeBins.set(k, []); treeBins.get(k).push(t); return t; };
function treesNear(x, y){ const cx = Math.floor(x / TB), cy = Math.floor(y / TB), out = []; for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) { const b = treeBins.get((cx + i) + ',' + (cy + j)); if (b) out.push(...b); } return out; }
const crowded = (x, y, d) => treesNear(x, y).some(t => dist(t.x, t.y, x, y) < d);
const clearOfBeds = (x, y) => BEDS.every(b => dist(b.x, b.y, x, y) > 70);
{ const W_ = ROADS.blanco; for (let i = 1; i < W_.length; i++) { const [a, b] = [W_[i - 1], W_[i]], n = Math.floor(dist(a[0], a[1], b[0], b[1]) / 64); for (let k = 0; k < n; k++) for (const side of [-1, 1]) { const x = lerp(a[0], b[0], k / n), y = lerp(a[1], b[1], k / n) + side * 58; if (free(x, y, 18) && clearOfBeds(x, y) && !crowded(x, y, 40)) tree(x, y, 'blossom', .85); } } }
for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) { const x = OS.x - 100 + k * 70 + (r % 2) * 30, y = OS.y + 130 + r * 70; if (free(x, y, 30)) tree(x, y, 'apple', .9); }
for (const w of WOODS) { const n = Math.round(Math.PI * w.rx * w.ry / 3600); for (let k = 0; k < n * 3; k++) { const a = R() * TAU, q = Math.sqrt(R()), x = w.x + Math.cos(a) * w.rx * q, y = w.y + Math.sin(a) * w.ry * q; if (!free(x, y, 12) || crowded(x, y, 48)) continue; tree(x, y, R() < w.pines ? 'pine' : 'oak', .9 + R() * .4); } }
for (let n = 0; n < 9000; n++) {   // trees about: along the field edges and here and there
  const x = R() * WW, y = R() * WH;
  if (!free(x, y, 40) || inFields(x, y, 10) || !clearOfBeds(x, y) || crowded(x, y, 110) || inLupins(x, y) || (R() < .7 && !inFields(x, y, 60))) continue;
  tree(x, y, R() < .25 ? 'pine' : 'oak');
}
const bushes = [];
for (let n = 0; n < 6000 && bushes.length < 140; n++) { const x = R() * WW, y = R() * WH; if (!free(x, y, 24) || inFields(x, y, 6) || crowded(x, y, 56) || bushes.some(b => dist(b.x, b.y, x, y) < 60)) continue; bushes.push({ kind: 'bush', x, y, s: .85 + R() * .4, ph: R() * TAU, berries: 3, regrow: 0 }); }
// a few near home, so berries are close at hand
for (const [dx, dy] of [[-190, 150], [-250, 90], [260, 170]]) bushes.push({ kind: 'bush', x: GG.x + dx, y: GG.y + dy, s: 1, ph: R() * TAU, berries: 3, regrow: 0 });
const props = [
  { kind: 'barn', x: BARN.x, y: BARN.y },
  { kind: 'pump', x: PUMP.x, y: PUMP.y },
  { kind: 'bench', x: BENCH.x, y: BENCH.y },
  ...WATERS.flatMap(w => w.bridges.map(b => b.piedras ? { kind: 'piedras', x: b.x, y: b.y - 18 } : { kind: b.covered ? 'covered' : 'bridge', x: b.x, y: b.y + 14 })),   // (the stones lie in the water: under whoever crosses)
  { kind: 'sign', x: LAKE.x - 160, y: LAKE.y - LAKE.ry - 34, text: 'Lago de las Aguas Brillantes' },
  { kind: 'sign', x: ROADS.blanco[1][0], y: ROADS.blanco[1][1] + 34, text: 'Camino Blanco de las Delicias' },
  ...WOODS.filter(w => w.haunted).map(w => ({ kind: 'sign', x: w.x, y: w.y - w.ry - 30, text: 'Bosque Encantado' })),
  { kind: 'sign', x: TOWN[0] - 120, y: TOWN[1] - 34, text: 'A Carmody' },
  { kind: 'sign', x: ROADS.estacion[3][0], y: ROADS.estacion[3][1] - 34, text: 'A Bright River' },
  { kind: 'roadsign', x: HOTEL_WS_AT.x, y: HOTEL_WS_AT.y, text: 'White Sands · 6 millas' },   // (the shore road leaves the map here)
  ...BUILDINGS.map(b => ({ kind: 'edificio', b, x: b.x, y: b.y })), ...BUILDINGS.filter(b => b.style !== 'faro').map(b => ({ kind: 'sign', x: b.x - b.w / 2 - 30, y: b.y + 50, text: b.name })),
  ...Array.from({ length: Math.ceil((STATION.x + 22 * U) / 28) }, (_, k) => ({ kind: 'rail', x: k * 28, y: STATION.y - 130 })),
];
for (const [a, b] of FENCES) { const len = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(len / 22)); for (let i = 0; i <= n; i++) { const x = lerp(a[0], b[0], i / n), y = lerp(a[1], b[1], i / n); props.push({ kind: 'fpost', x, y, nx: i < n ? lerp(a[0], b[0], (i + 1) / n) : null, ny: i < n ? lerp(a[1], b[1], (i + 1) / n) : null }); } }
for (const [k, h] of Object.entries(HOUSES)) if (h.noProp) continue; else if (h.road) props.push({ kind: 'roadsign', x: h.at.x, y: h.at.y, text: 'Bright River · 8 millas' }); else props.push({ kind: 'house', h: h.at, roof: h.roof, wall: h.wall, trim: h.trim, x: h.at.x, y: h.at.y, small: h.small, style: h.style }, { kind: 'sign', x: h.at.x + h.sign[0], y: h.at.y + h.sign[1], text: h.name });
for (let x = GG.x - GG.w / 2 - 40; x < GG.x + GG.w / 2 + 230; x += 24) if (Math.abs(x - GG.x) > 40 && !(x > PUMP.x - 20 && x < PUMP.x + 20)) props.push({ kind: 'post', x, y: GG.y + 120 });
// the milk bottles of the school, cooling in the river (as in the book)
const MILK = (() => { const s0 = RIVERS[0].pts; let best = s0[0], bd = 1e9; for (let i = 1; i < s0.length; i++) for (let q = 0; q <= 1; q += .05) { const x = lerp(s0[i - 1][0], s0[i][0], q), y = lerp(s0[i - 1][1], s0[i][1], q), d = dist(x, y, SCHOOL.x + 60, SCHOOL.y + 40); if (d < bd) { bd = d; best = [x, y]; } } return { x: best[0], y: best[1] }; })();
// the little things on the ground (grass, flowers, lupins, dunes, stones): made by pieces of 512 px, only when looked at
const FCOLS = ['#fffaf2', '#ffd7e8', '#f7e27a', '#c9a7f2', '#ff9f8a', '#a8d8ff'];
const DCH = 512, decorCache = new Map();
function decorAt(cx, cy){
  const key = cx + ',' + cy; let d = decorCache.get(key); if (d) return d;
  const r = rng(7919 + cx * 131 + cy * 977), x0 = cx * DCH, y0 = cy * DCH, P = (n, fn) => { for (let k = 0; k < n; k++) fn(x0 + r() * DCH, y0 + r() * DCH); };
  d = { tufts: [], flowers: [], lupins: [], dunes: [], rocks: [] };
  const okG = (x, y, m) => !inLake(x, y, 10 + m) && !inSea(x, y, 6) && !inHouses(x, y, 4) && !inAreas(x, y, 4) && !nearPath(x, y, 16 + m) && !inBrook(x, y, 6 + m) && !inBeds(x, y);
  P(240, (x, y) => { if (okG(x, y, 0) && !inFields(x, y)) d.tufts.push({ x, y, h: 5 + r() * 7, ph: r() * TAU, c: r() }); });
  P(60, (x, y) => { if (okG(x, y, 2) && !inFields(x, y) && !inWood(x, y)) d.flowers.push({ x, y, c: FCOLS[Math.floor(r() * FCOLS.length)], ph: r() * TAU, s: 1 }); });
  if (LUPINS.some(l => Math.abs(l.x - x0 - DCH / 2) < l.rx + DCH && Math.abs(l.y - y0 - DCH / 2) < l.ry + DCH)) P(900, (x, y) => { if (inLupins(x, y) && okG(x, y, 0)) d.lupins.push({ x, y, s: .7 + r() * .6, ph: r() * TAU, c: r() }); });
  if (nearCoast(x0 + DCH / 2, y0 + DCH / 2, DCH)) { P(14, (x, y) => { if (!inSea(x, y, 30) && nearCoast(x, y, 260) && okG(x, y, 10)) d.dunes.push({ x, y, s: .8 + r() * .5, ph: r() * TAU }); }); P(6, (x, y) => { if (!inSea(x, y, 10) && nearCoast(x, y, 200) && okG(x, y, 4)) d.rocks.push({ x, y, s: .7 + r() * .6 }); }); }
  for (const H of HOUSE_SPOTS) if (H.x > x0 - 200 && H.x < x0 + DCH + 200 && H.y > y0 - 200 && H.y < y0 + DCH + 200) { const rr = rng(Math.round(H.x + H.y)); for (let n = 0; n < 50; n++) { const x = H.x - H.w / 2 + rr() * H.w, y = H.y + 10 + rr() * 34, c = ['#ff9f8a', '#ffd7e8', '#f7e27a', '#fffaf2'][n % 4], ph = rr() * TAU; if (Math.abs(x - H.x) > 26 && x >= x0 && x < x0 + DCH && y >= y0 && y < y0 + DCH) d.flowers.push({ x, y, c, ph, s: 1.1 }); } }
  decorCache.set(key, d); if (decorCache.size > 160) decorCache.delete(decorCache.keys().next().value);
  return d;
}
const tufts = [], flowers = [], reeds = [], pads = [];   // (kept for the lake's reeds and pads; the grass and flowers are in decorAt)
for (let n = 0; n < 70; n++) { const a = R() * TAU, k = .96 + R() * .1; reeds.push({ x: LAKE.x + Math.cos(a) * LAKE.rx * k, y: LAKE.y + Math.sin(a) * LAKE.ry * k, h: 14 + R() * 12, ph: R() * TAU }); }
for (let n = 0; n < 12; n++) { const a = R() * TAU, k = R() * .75; pads.push({ x: LAKE.x + Math.cos(a) * LAKE.rx * k, y: LAKE.y + Math.sin(a) * LAKE.ry * k, r: 7 + R() * 6, a: R() * TAU, bloom: R() < .4 }); }
