/* ---------- the long road to Bright River (chapter II): eight miles of red road, drawn as Avonlea is (from above, the
   same watercolour, the same trees, houses and fences), but a land of its own: it is not on the map of Avonlea (at
   its edge there is only a signpost). Bright River is at the west end (the station, the hotel, the railway and the
   big wild cherry tree at the bend of the line), Avonlea at the east end; in between, stretch by stretch, what the
   book tells: the cutting with its banks of wild cherries and birches, the farms and orchards, the fir wood, the
   hollow of wild plums, the gulf from a hill, the sawmill, the ploughed fields, the white church, the brook with
   its willows, the Avenue under the apple blossom, Newbridge, and three miles of fields at dusk.
   One can drive it (about two hours and a half, as in the book), walk it, get off the buggy and on again.
   Whoever goes along it: b.where = 'camino', b.roadS (0 at the station, 1 at Avonlea), b.roadDir (+1, -1, 0). ---------- */
const ROAD_MIN = 145, ROAD_MILES = 7, RW = 60000, RH = 2400;
const ROAD_TRAMOS = [
  { s: 0, kind: 'pueblo', name: 'Bright River', v: -1 },
  { s: .035, kind: 'barranco', name: 'La cuesta de los cerezos silvestres', v: 0 },
  { s: .09, kind: 'granjas', name: 'Las granjas de los manzanos', v: 1 },
  { s: .145, kind: 'bosque', name: 'El bosquecillo de abetos', v: 2 },
  { s: .2, kind: 'ciruelos', name: 'La hondonada de los ciruelos', v: 3 },
  { s: .255, kind: 'colina_mar', name: 'La colina sobre el golfo', v: 4, first: 4 },
  { s: .31, kind: 'granjas', name: 'Las granjas de los arces', v: 5 },
  { s: .365, kind: 'aserradero', name: 'El aserradero del río', v: 6 },
  { s: .42, kind: 'campos', name: 'Los campos arados', v: 7 },
  { s: .475, kind: 'iglesia', name: 'La iglesia de la loma', v: 8 },
  { s: .53, kind: 'arroyo', name: 'El puentecito de los sauces', v: 9 },
  { s: .585, kind: 'curva', name: 'La curva del atardecer', v: 10 },
  { s: .64, kind: 'avenida', name: 'La Avenida', v: -1, quiet: true, ritmo: .85, m: 'avenida', note: 'La calesa entró a la Avenida, un túnel de manzanos en flor; Ana enmudeció de asombro.' },
  { s: .7, kind: 'pueblo', name: 'Newbridge', v: -1, quiet: true, ritmo: 1.4, m: 'newbridge', note: 'Cruzaron Newbridge en silencio: perros que ladraban, chicos que gritaban, caras curiosas en las ventanas.' },
  { s: .76, kind: 'campos', name: 'Tres millas de silencio', v: -1, quiet: true, ritmo: 1.9 },   // (ritmo: Matthew lets the mare trot where nothing is said; slower under the blossom)
  { s: .955, kind: 'borde', name: 'La entrada de Avonlea', v: -1, quiet: true },
];
const roadTramo = s => { let r = ROAD_TRAMOS[0]; for (const t of ROAD_TRAMOS) if (s >= t.s) r = t; return r; };
const roadMiles = (s, dir) => Math.max(0, Math.round((dir > 0 ? (1 - s) * ROAD_MILES + 1 : s * ROAD_MILES) * 2) / 2);
const millas = n => (n === 1 ? '1 milla' : String(n).replace('.', ',') + ' millas');   // (to Green Gables there is one mile more, in Avonlea)
const rh = (i, k = 0) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
// the road itself: a red line that winds a little, west to east
const ROAD_X0 = 900, ROAD_DX = 300, ROAD_PTS = [];
for (let x = ROAD_X0; x <= RW - 200; x += ROAD_DX) ROAD_PTS.push([x, Math.round(RH / 2 + 300 * Math.sin(x / 2600) + 140 * Math.sin(x / 830 + 1))]);
const ROAD_CUM = [0]; for (let i = 1; i < ROAD_PTS.length; i++) ROAD_CUM.push(ROAD_CUM[i - 1] + dist(...ROAD_PTS[i - 1], ...ROAD_PTS[i]));
const ROAD_LEN = ROAD_CUM[ROAD_CUM.length - 1], ROAD_SEC = ROAD_MIN * MIN_S, ROAD_V = ROAD_LEN / ROAD_SEC;   // (the buggy: the whole road in ROAD_MIN minutes)
function roadAt(s){ const L = clamp(s, 0, 1) * ROAD_LEN; let lo = 1, hi = ROAD_CUM.length - 1; while (lo < hi) { const m = (lo + hi) >> 1; if (ROAD_CUM[m] < L) lo = m + 1; else hi = m; } const a = ROAD_PTS[lo - 1], b = ROAD_PTS[lo], k = (L - ROAD_CUM[lo - 1]) / (ROAD_CUM[lo] - ROAD_CUM[lo - 1] || 1); return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), b[0] - a[0], b[1] - a[1]]; }
const roadY = x => { const f = clamp((x - ROAD_X0) / ROAD_DX, 0, ROAD_PTS.length - 1.001), i = Math.floor(f); return lerp(ROAD_PTS[i][1], ROAD_PTS[i + 1][1], f - i); };
const roadSOf = x => { const f = clamp((x - ROAD_X0) / ROAD_DX, 0, ROAD_PTS.length - 1.001), i = Math.floor(f); return lerp(ROAD_CUM[i], ROAD_CUM[i + 1], f - i) / ROAD_LEN; };
const roadXOf = s => roadAt(s)[0];
// Bright River: the station house and its platform, the railway (with its bend), the hotel and its yard
const RSTN = { x: 760, y: roadY(900) - 330, w: 5 * T }, RAIL = [[260, 0], [300, 500], [330, 900], [340, 1300], [320, 1700], [250, 2100], [180, RH]], RHOTEL = { x: 1700, y: roadY(1700) - 300 };
const RCHERRY = { x: 470, y: 560 };   // (the big wild cherry tree at the bend of the line, where Ana meant to sleep)
const RP = [], RT = [], RF = [], RWAT = [], RFOLK = [], RCOW = [], RDOG = [], RBANK = [], RSEA = [], ROAD_SPOT = { aserradero: [], granjero: [], vacas: [], iglesia: [], lilas: [], sauces: [] };
{
  const r = rng(1908), R_ = () => r(), tree_ = (x, y, kind, s = .85 + R_() * .4, gap = 62) => { if (y > 60 && y < RH - 40 && Math.abs(y - roadY(x)) > gap && !nearW(x, y, 60)) RT.push({ kind, x, y, s, ph: R_() * TAU }); };
  const nearW = (x, y, m) => RWAT.some(w => w.pts.some((p, i) => i && segDist(x, y, w.pts[i - 1], p) < w.w / 2 + m));
  const house = (x, y, o = {}) => RP.push({ kind: 'house', h: { x, y, w: o.w || 4.4 * T }, roof: o.roof || ['#8a5a3c', '#5f7a9a', '#7a6a4a', '#9a5a3c'][Math.floor(R_() * 4)], wall: o.wall || ['#efe4cc', '#e6dcc4', '#f1ead8'][Math.floor(R_() * 3)], trim: '#6a4a32', x, y, small: true, style: o.style });
  const sign = (x, y, text) => RP.push({ kind: 'sign', x, y, text });
  const fence = (x0, x1, off) => { let prev = null; for (let x = x0; x < x1; x += 64) { const o = { kind: 'fpost', x, y: roadY(x) + off }; if (prev) { prev.nx = o.x; prev.ny = o.y; } RP.push(o); prev = o; } };
  const xs = s => roadXOf(s);
  // the station
  RP.push({ kind: 'house', h: RSTN, roof: '#7a4a3a', wall: '#d9c6a0', trim: '#6a4630', x: RSTN.x, y: RSTN.y, small: true });
  sign(RSTN.x - 150, RSTN.y + 50, 'Estación de Bright River'); RP.push({ kind: 'edificio', b: { style: 'hotel', x: RHOTEL.x, y: RHOTEL.y, w: 9 * T } }); sign(RHOTEL.x - 210, RHOTEL.y + 50, 'Hotel de Bright River');
  RT.push({ kind: 'blossom', x: RCHERRY.x, y: RCHERRY.y, s: 2.6, ph: 0 });
  for (let k = 0; k < 6; k++) house(2300 + k * 300 + R_() * 80, roadY(2300 + k * 300) + (k % 2 ? 300 : -320));
  for (let k = 0; k < 18; k++) tree_(1000 + R_() * 2600, R_() * RH, R_() < .5 ? 'oak' : 'tree');
  // stretch by stretch
  ROAD_TRAMOS.forEach((tr, j) => {
    const x0 = xs(tr.s), x1 = xs(ROAD_TRAMOS[j + 1]?.s ?? 1), xm = (x0 + x1) / 2;
    sign(x0 + 60, roadY(x0 + 60) - 80, tr.name);
    const k = tr.kind;
    if (j === 0) return;
    if (k === 'barranco') { RBANK.push([x0, x1]); for (let x = x0; x < x1; x += 50) for (const sd of [-1, 1]) { tree_(x + R_() * 30, roadY(x) + sd * (100 + R_() * 70), R_() < .6 ? 'blossom' : 'tree', .7 + R_() * .3); if (R_() < .5) tree_(x, roadY(x) + sd * (230 + R_() * 500), R_() < .5 ? 'blossom' : 'oak'); } }
    else if (k === 'granjas') {
      fence(x0, x1, -74); fence(x0, x1, 78);
      for (let x = x0 + 300; x < x1 - 300; x += 1100 + R_() * 300) { const sd = R_() < .5 ? -1 : 1, hy = roadY(x) + sd * (250 + R_() * 60); house(x, hy); RP.push({ kind: 'barn', x: x + 300, y: hy + sd * 30 }); for (let a = 0; a < 4; a++) for (let b = 0; b < 3; b++) tree_(x - 440 + a * 80, roadY(x) + sd * (120 + b * 75), j === 6 && a % 2 ? 'oak' : 'apple', .8); RF.push({ x: x - 520, y: sd < 0 ? hy - 520 : hy + 90, w: 1000, h: 420, crop: Math.floor(R_() * 3) }); for (let a = 0; a < 5; a++) tree_(x + 520 + a * 70, roadY(x + 520) - sd * (110 + R_() * 80), 'apple', .8); }
    }
    else if (k === 'bosque') { for (let x = x0; x < x1; x += 70) for (const sd of [-1, 1]) for (let n = 0; n < 4; n++) tree_(x + R_() * 60, roadY(x) + sd * (95 + R_() * 1000), 'pine', .9 + R_() * .5); }
    else if (k === 'ciruelos') { for (let x = x0; x < x1; x += 60) for (const sd of [-1, 1]) { tree_(x + R_() * 40, roadY(x) + sd * (95 + R_() * 700), 'blossom', .8 + R_() * .4); if (R_() < .2) tree_(x, roadY(x) + sd * (300 + R_() * 600), 'oak'); } }
    else if (k === 'colina_mar') { RSEA.push([x0 - 400, x1 + 400]); for (let x = x0 + 200; x < x1; x += 1400) { const sd = R_() < .5 ? -1 : 1, hy = roadY(x) + sd * 420; if (hy > 520) { house(x, hy); RP.push({ kind: 'barn', x: x + 280, y: hy + 30 }); } } for (let x = x0; x < x1; x += 600) RF.push({ x, y: roadY(x) + 160, w: 520, h: 420, crop: Math.floor(R_() * 3) }); fence(x0, x1, 78); }
    else if (k === 'aserradero') {
      RWAT.push({ pts: [[xm - 260, 0], [xm - 120, RH * .3], [xm, roadY(xm)], [xm + 140, RH * .7], [xm + 300, RH]], w: 90, name: 'el río' });
      RP.push({ kind: 'bridge', x: xm, y: roadY(xm) + 30 }); ROAD_SPOT.aserradero.push(xm, xm + 400, xm - 500);
      RP.push({ kind: 'edificio', b: { style: 'galpon', x: xm + 300, y: roadY(xm + 300) - 190, w: 7 * T } }); sign(xm + 110, roadY(xm + 110) - 150, 'Aserradero');
      for (let n = 0; n < 4; n++) RP.push({ kind: 'logs', x: xm + 480 + n * 70, y: roadY(xm + 480) - 110 + n * 14 });
      house(xm - 480, roadY(xm - 480) + 250, { roof: '#6a6a6a', wall: '#d8d0c0' }); RP.push({ kind: 'ropa', x: xm - 700, y: roadY(xm - 480) + 230 });
      RFOLK.push({ look: 'f:v14', x: xm - 400, y: roadY(xm - 480) + 300, dir: 3 }, { look: 'f:v16', x: xm - 350, y: roadY(xm - 480) + 320, dir: 1 }, { look: 'f:v15', x: xm - 570, y: roadY(xm - 480) + 330, dir: 1 });
      for (let x = x0; x < x1; x += 80) if (R_() < .5) tree_(x, roadY(x) + (R_() < .5 ? -1 : 1) * (120 + R_() * 800), 'oak');
    }
    else if (k === 'campos') {
      for (let x = x0; x < x1; x += 700) for (const sd of [-1, 1]) RF.push({ x: x + 20, y: sd < 0 ? roadY(x) - 760 : roadY(x) + 120, w: 640, h: 620, crop: tr.quiet ? Math.floor(R_() * 3) : 2 });
      fence(x0, x1, -74); fence(x0, x1, 78);
      if (!tr.quiet) { RFOLK.push({ look: 'f:jerry', x: xm, y: roadY(xm) - 260, dir: 1, sow: true }); ROAD_SPOT.granjero.push(xm); ROAD_SPOT.vacas.push(xm + 800); for (let n = 0; n < 6; n++) RCOW.push({ x: xm + 700 + n * 70 + R_() * 40, y: roadY(xm + 700) + 170 + R_() * 160, dir: R_() < .5 ? 1 : 3, walk: 0, moving: false, munch: R_(), coat: n % 2 ? ['#f2ece2', '#3a2a24', '#ffffff'] : ['#c8915a', '#9a6a3e', '#f2e6d0'] }); }
      else for (let x = x0 + 500; x < x1; x += 2600) { const hy = roadY(x) - 380; house(x, hy); for (let n = 0; n < 5; n++) tree_(x - 300 + n * 120, hy - 160, 'oak'); }
      for (let x = x0; x < x1; x += 260) if (R_() < .35) tree_(x, roadY(x) + (R_() < .5 ? -1 : 1) * (110 + R_() * 60), 'oak');
    }
    else if (k === 'iglesia') {
      ROAD_SPOT.iglesia.push(xm, xm + 300); RP.push({ kind: 'house', h: { x: xm, y: roadY(xm) - 260, w: 5 * T }, roof: '#6a5a50', wall: '#f4efe4', trim: '#5a4a40', x: xm, y: roadY(xm) - 260, small: true, style: 'iglesia' });
      for (let a = 0; a < 5; a++) for (let b = 0; b < 3; b++) RP.push({ kind: 'tumba', x: xm + 230 + a * 46, y: roadY(xm + 230) - 300 + b * 50 });
      for (let x = x0 + 300; x < x1; x += 600) { const sd = R_() < .5 ? -1 : 1; if (Math.abs(x - xm) < 500) continue; house(x, roadY(x) + sd * 230, { w: 3.6 * T }); RP.push({ kind: 'lila', x: x - 50, y: roadY(x) + sd * 230 + 18 }); ROAD_SPOT.lilas.push(x); }
      for (let x = x0; x < x1; x += 120) if (R_() < .4) tree_(x, roadY(x) + (R_() < .5 ? -1 : 1) * (130 + R_() * 700), 'oak');
    }
    else if (k === 'arroyo') {
      RWAT.push({ pts: [[xm + 200, 0], [xm + 80, RH * .3], [xm, roadY(xm)], [xm - 60, RH * .7], [xm - 220, RH]], w: 46, name: 'el arroyo' }); ROAD_SPOT.sauces.push(xm);
      RP.push({ kind: 'bridge', x: xm, y: roadY(xm) + 30 });
      for (let n = 0; n < 10; n++) { const t = n / 9; tree_(xm + 120 - t * 240 + (n % 2 ? 70 : -70), RH * (.15 + t * .7), 'tree', 1.2); }
      for (let x = x0; x < x1; x += 640) for (const sd of [-1, 1]) if (Math.abs(x - xm) > 400) RF.push({ x, y: sd < 0 ? roadY(x) - 680 : roadY(x) + 130, w: 560, h: 520, crop: x % 2 ? 0 : 3 });
    }
    else if (k === 'curva') { for (let x = x0; x < x1; x += 70) if (R_() < .6) tree_(x, roadY(x) + (R_() < .5 ? -1 : 1) * (100 + R_() * 600), R_() < .5 ? 'blossom' : 'oak'); }
    else if (k === 'avenida') { for (let x = x0; x < x1; x += 34 + R_() * 8) { tree_(x + R_() * 6, roadY(x) - 46 - R_() * 6, R_() < .9 ? 'manzano' : 'tree', 1.15 + R_() * .2, 40); tree_(x + 17 + R_() * 6, roadY(x) + 46 + R_() * 6, R_() < .9 ? 'manzano' : 'tree', 1.1 + R_() * .2, 40); } }   // (one row on each side, close to the road: a tunnel; the near one lets the buggy show through)
    else if (k === 'pueblo') {   // Newbridge: a bustling little village (dogs, boys, faces at the windows)
      for (let x = x0 + 150; x < x1 - 150; x += 280) for (const sd of [-1, 1]) if (R_() < .85) house(x + R_() * 50, roadY(x) + sd * (200 + R_() * 40) + (sd > 0 ? 60 : 0), { w: 3.8 * T });
      RP.push({ kind: 'edificio', b: { style: 'tienda', x: xm, y: roadY(xm) - 200, w: 4.6 * T } }); sign(xm - 120, roadY(xm) - 150, 'Newbridge');
      for (let n = 0; n < 5; n++) RFOLK.push({ look: 'f:v' + (14 + n % 4), x: x0 + 400 + n * 380, y: roadY(x0 + 400 + n * 380) + (n % 2 ? 120 : -120), dir: n % 2 ? 3 : 1, hoot: true });
      for (let n = 0; n < 4; n++) RDOG.push({ x: x0 + 600 + n * 520, y: roadY(x0 + 600 + n * 520) + (n % 2 ? 100 : -100), dir: 1, walk: 0, moving: false, sitT: 0, sniff: 0, petted: 0, bark: true });
      for (let x = x0; x < x1; x += 200) if (R_() < .4) tree_(x, roadY(x) + (R_() < .5 ? -1 : 1) * (150 + R_() * 80), 'oak');
    }
    else { for (let x = x0; x < x1; x += 400) for (const sd of [-1, 1]) RF.push({ x, y: sd < 0 ? roadY(x) - 640 : roadY(x) + 120, w: 360, h: 500, crop: Math.floor(R_() * 4) % 3 }); for (let x = x0; x < x1; x += 180) if (R_() < .4) tree_(x, roadY(x) + (R_() < .5 ? -1 : 1) * (110 + R_() * 400), 'oak'); }
  });
  for (let x = 2400; x < RW - 400; x += 90) { const k = roadTramo(roadSOf(x)).kind; if (k !== 'avenida' && k !== 'barranco' && k !== 'bosque' && R_() < .3) tree_(x + R_() * 40, roadY(x) + (R_() < .5 ? -1 : 1) * (100 + R_() * 160), k === 'ciruelos' || k === 'curva' ? 'blossom' : k === 'granjas' ? 'apple' : R_() < .3 ? 'pine' : 'oak', .8 + R_() * .3); }
  for (let m = 1; m < ROAD_MILES; m++) { const x = xs(m / ROAD_MILES); RP.push({ kind: 'mojon', x, y: roadY(x) + 60, text: String(ROAD_MILES - m + 1) }); }
  sign(RW - 360, roadY(RW - 360) - 80, 'Avonlea →');
}
// (what is drawn, by slices along the road, to find quickly what is in view)
const RBIN = 900, RBINS = new Map();
for (const [kind, L] of [['p', RP], ['t', RT], ['f', RFOLK], ['c', RCOW], ['d', RDOG]]) for (const o of L) { const x = o.kind === 'edificio' ? o.b.x : o.x, k = Math.floor(x / RBIN); if (!RBINS.has(k)) RBINS.set(k, []); RBINS.get(k).push([kind, o]); }
for (const o of RFOLK) Object.assign(o, { walk: 0, moving: false, blink: 0, idle: 0, sit: false, vx: 0, vy: 0, carry: null, pet: false, crouch: false, lookAround: 0 });
const seaY = x => 330 + 70 * Math.sin(x / 520);
const inRSea = (x, y) => RSEA.some(([a, b]) => x > a && x < b) && y < seaY(x);
function roadBlocked(x, y){
  if (x < 40 || y < 40 || y > RH - 40 || x > RW - 40) return true;
  if (inRSea(x, y)) return true;
  for (const w of RWAT) if (Math.abs(y - roadY(x)) > 60) for (let i = 1; i < w.pts.length; i++) if (segDist(x, y, w.pts[i - 1], w.pts[i]) < w.w / 2) return true;
  for (const [kind, o] of RBINS.get(Math.floor(x / RBIN)) || []) if (kind === 'p' && (o.kind === 'house' || o.kind === 'edificio')) { const h = o.kind === 'house' ? o.h : o.b; if (Math.abs(x - h.x) < h.w / 2 + 4 && y < h.y + 6 && y > h.y - 60) return true; }
  return false;
}
// the ground of the road, by tiles, painted as Avonlea's is (the fields, the banks, the water, the red road, the rails)
const rtiles = new Map();
function roadTile(tx, ty){
  const key = S + ':' + tx + ',' + ty; let cv = rtiles.get(key);
  if (cv && perdido(cv)) { rtiles.delete(key); cv = null; }
  if (cv) { rtiles.delete(key); rtiles.set(key, cv); return cv; }
  { const w = tileBudget(); if (w) return w; }
  cv = document.createElement('canvas'); cv.width = cv.height = Math.ceil(TILE * GS); roadPaint(cv, S, tx * TILE, ty * TILE); rtiles.set(key, cv);
  if (rtiles.size > 30) rtiles.delete(rtiles.keys().next().value);
  return cv;
}
function roadPaint(cv, s, X0, Y0){
  const c = cv.getContext('2d'), P = GPAL[s], r = rng(777 + X0 * 3 + Y0 * 7 + s * 11), RX = () => X0 + r() * TILE, RY = () => Y0 + r() * TILE, inT = (x0, y0, x1, y1) => x1 > X0 - 60 && x0 < X0 + TILE + 60 && y1 > Y0 - 60 && y0 < Y0 + TILE + 60;
  c.setTransform(GS, 0, 0, GS, -X0 * GS, -Y0 * GS);
  c.fillStyle = P.base; c.fillRect(X0 - 2, Y0 - 2, TILE + 4, TILE + 4);
  for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) { const ax = X0 + i * TILE, ay = Y0 + j * TILE, rw = rng(99 + ax * 3 + ay * 7); for (let n = 0; n < 9; n++) { const x = ax + rw() * TILE, y = ay + rw() * TILE, rr = 30 + rw() * 130, cc = rw(), cc2 = rw(); if (x + rr < X0 || x - rr > X0 + TILE || y + rr < Y0 || y - rr > Y0 + TILE) continue; const gr = c.createRadialGradient(x, y, 0, x, y, rr), col = cc < .4 ? P.wash[0] : cc2 < .5 ? P.wash[1] : P.wash[2]; gr.addColorStop(0, `rgba(${col},.33)`); gr.addColorStop(1, `rgba(${col},0)`); c.fillStyle = gr; c.fillRect(x - rr, y - rr, rr * 2, rr * 2); } }
  const CROPS = [['#b8d47e', '#e0c872', '#c8a862', '#eef2f4'], ['#a6c86c', '#cdbb6a', '#b9a066', '#eef2f4'], ['#9a6a4c', '#9a6a4c', '#8a6a48', '#e6eaee'], ['#c9d98a', '#d8cf86', '#c2b07a', '#f0f3f5']];
  for (const f of RF) { if (!inT(f.x, f.y, f.x + f.w, f.y + f.h)) continue; c.fillStyle = CROPS[f.crop][s]; c.fillRect(f.x, f.y, f.w, f.h); c.strokeStyle = f.crop === 2 && s !== 3 ? 'rgba(70,45,25,.45)' : 'rgba(80,90,40,.22)'; c.lineWidth = f.crop === 2 ? 2 : 1.2; for (let y = f.y + 8; y < f.y + f.h; y += 10) { c.beginPath(); c.moveTo(f.x + 3, y); c.lineTo(f.x + f.w - 3, y); c.stroke(); } c.strokeStyle = 'rgba(90,70,40,.4)'; c.lineWidth = 1.4; c.strokeRect(f.x, f.y, f.w, f.h); }
  // the gulf, seen from the hill: the sea at the top, with its red sand
  for (const [a, b] of RSEA) if (inT(a, 0, b, 460)) { c.beginPath(); c.moveTo(a, 0); for (let x = a; x <= b; x += 40) c.lineTo(x, seaY(x)); c.lineTo(b, 0); c.closePath(); c.fillStyle = s === 3 ? '#c7dbe6' : '#5c9fc2'; c.fill(); c.strokeStyle = s === 3 ? '#e6eef2' : '#e8b48a'; c.lineWidth = 50; c.beginPath(); for (let x = a; x <= b; x += 40) x === a ? c.moveTo(x, seaY(x) + 20) : c.lineTo(x, seaY(x) + 20); c.stroke(); }
  // the banks of the cutting, higher than the buggy: red earth along the road
  for (const [a, b] of RBANK) if (inT(a, 0, b, RH)) for (const sd of [-1, 1]) { c.strokeStyle = s === 3 ? 'rgba(220,226,232,.9)' : 'rgba(168,80,58,.55)'; c.lineWidth = 46; c.lineCap = 'round'; c.beginPath(); for (let x = a; x <= b; x += 60) x === a ? c.moveTo(x, roadY(x) + sd * 66) : c.lineTo(x, roadY(x) + sd * 66); c.stroke(); }
  c.strokeStyle = P.grass; c.lineWidth = .8; for (let n = 0; n < 500; n++) { const x = RX(), y = RY(); c.beginPath(); c.moveTo(x, y); c.lineTo(x + 1 + r() * 2, y - 2 - r() * 3); c.stroke(); }
  if (s === 2) for (let n = 0; n < 220; n++) { const x = RX(), y = RY(); c.fillStyle = ['rgba(200,90,50,.55)', 'rgba(220,150,60,.55)', 'rgba(180,60,40,.5)'][n % 3]; c.beginPath(); c.ellipse(x, y, 2.4, 1.3, r() * TAU, 0, TAU); c.fill(); }
  if (s < 2) for (let n = 0; n < 60; n++) { const x = RX(), y = RY(); c.fillStyle = ['#f6f2f0', '#f2c14e', '#e88ab0', '#b48ad0'][n % 4]; c.beginPath(); c.arc(x, y, 1.6, 0, TAU); c.fill(); }
  // the water (the river at the sawmill, the brook with its willows)
  const stroke = (pts, w, col) => { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(...pts[0]); for (let i = 1; i < pts.length; i++) { const p = pts[i - 1], q = pts[i]; c.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } c.lineTo(...pts[pts.length - 1]); c.stroke(); };
  for (const w of RWAT) if (inT(Math.min(...w.pts.map(p => p[0])), 0, Math.max(...w.pts.map(p => p[0])), RH)) { stroke(w.pts, w.w + 26, `rgba(${P.bank},.45)`); stroke(w.pts, w.w, s === 3 ? '#cfe2ea' : '#6aa8c4'); }
  // the railway at Bright River, and the platform
  if (inT(0, 0, 700, RH)) { c.strokeStyle = '#7a5a3e'; c.lineWidth = 5; for (let i = 1; i < RAIL.length; i++) { const a = RAIL[i - 1], b = RAIL[i], n = Math.ceil(dist(...a, ...b) / 16); for (let k = 0; k < n; k++) { const x = lerp(a[0], b[0], k / n), y = lerp(a[1], b[1], k / n); c.beginPath(); c.moveTo(x - 16, y); c.lineTo(x + 16, y); c.stroke(); } } for (const o of [-9, 9]) { c.strokeStyle = '#5a5a62'; c.lineWidth = 2.4; c.beginPath(); RAIL.forEach(([x, y], i) => i ? c.lineTo(x + o, y) : c.moveTo(x + o, y)); c.stroke(); } }
  if (inT(340, RSTN.y - 60, 1100, RSTN.y + 90)) { c.fillStyle = '#c9a06a'; c.fillRect(350, RSTN.y + 4, 760, 70); c.strokeStyle = 'rgba(110,70,40,.35)'; c.lineWidth = 1; for (let x = 362; x < 1110; x += 14) { c.beginPath(); c.moveTo(x, RSTN.y + 4); c.lineTo(x, RSTN.y + 74); c.stroke(); } }
  // the red road (as the roads of Avonlea), and the lane to the station
  const near = ROAD_PTS.filter(([x, y]) => x > X0 - 700 && x < X0 + TILE + 700);
  const lanes = [[[RSTN.x, RSTN.y + 60], [ROAD_X0, roadY(ROAD_X0)]], [[RHOTEL.x, RHOTEL.y + 40], [RHOTEL.x, roadY(RHOTEL.x)]]].filter(L => inT(Math.min(L[0][0], L[1][0]), Math.min(L[0][1], L[1][1]), Math.max(L[0][0], L[1][0]), Math.max(L[0][1], L[1][1])));
  for (const p of [...(near.length > 1 ? [near] : []), ...lanes]) { stroke(p, 54, P.path[0]); stroke(p, 40, s === 3 ? P.path[1] : '#c98a62'); stroke(p, 26, s === 3 ? P.path[2] : '#d49a72'); }
  { const [a, b] = avenidaX(); if (s < 2 && X0 + TILE > a && X0 < b) { const pts = ROAD_PTS.filter(([x]) => x > Math.max(a, X0 - 400) && x < Math.min(b, X0 + TILE + 400)); if (pts.length > 1) { stroke(pts, 46, 'rgba(126,176,84,.62)'); for (const o of [-8, 8]) stroke(pts.map(([x, y]) => [x, y + o]), 5, 'rgba(176,104,70,.55)'); for (let n = 0; n < 400; n++) { const x = RX(), y = RY(); if (x > a && x < b && Math.abs(y - roadY(x)) < 22) { c.strokeStyle = 'rgba(90,140,60,.6)'; c.lineWidth = .8; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 1, y - 3); c.stroke(); } } } } }   // (under the blossom the road is grassy, with two ruts)
  { const [a, b] = avenidaX(); if (s === 0 && X0 + TILE > a && X0 < b) for (let n = 0; n < 1600; n++) { const x = RX(), y = RY(); if (x < a || x > b) continue; const dy = Math.abs(y - roadY(x)); if (dy < 30 || r() < .3) { c.fillStyle = ['rgba(255,255,250,.9)', 'rgba(244,246,232,.85)', 'rgba(255,255,255,.8)'][n % 3]; c.beginPath(); c.ellipse(x, y, 1.8 + r() * 1.6, 1 + r(), r() * TAU, 0, TAU); c.fill(); } } }   // (the Avenue: a carpet of fallen petals)
  for (let n = 0; n < 140; n++) { const x = RX(), y = RY(); if (Math.abs(y - roadY(x)) < 16 && x > ROAD_X0) { c.fillStyle = r() < .5 ? 'rgba(120,60,40,.4)' : 'rgba(245,220,200,.5)'; c.beginPath(); c.ellipse(x, y, 1.5 + r() * 2, 1 + r(), 0, 0, TAU); c.fill(); } }
}
// the things of the road that are not in drawProp: log piles, washing on a line, gravestones, lilacs, milestones
function drawRoadThing(c, o, t){
  if (o.kind === 'logs') { for (let k = 0; k < 4; k++) { ell(c, o.x - 24 + (k % 2) * 6, o.y - k * 6, 30, 4, k % 2 ? '#b58a5a' : '#c99a66', true); ell(c, o.x - 54 + (k % 2) * 6, o.y - k * 6, 3.6, 3.6, '#e8c890', true); } return true; }
  if (o.kind === 'ropa') { line(c, [[o.x, o.y], [o.x, o.y - 34]], '#6a4a30', 2, 1); line(c, [[o.x + 120, o.y], [o.x + 120, o.y - 34]], '#6a4a30', 2, 2); line(c, [[o.x, o.y - 32], [o.x + 120, o.y - 30]], '#8a8a8a', 1, 3); ['#f4efe4', '#8aa8c8', '#c86a5a', '#f4efe4', '#e8d080'].forEach((col, k) => blob(c, [[o.x + 10 + k * 22, o.y - 31], [o.x + 26 + k * 22, o.y - 31], [o.x + 25 + k * 22 + Math.sin(t * 2 + k) * 2, o.y - 14], [o.x + 11 + k * 22 + Math.sin(t * 2 + k) * 2, o.y - 15]], col)); return true; }
  if (o.kind === 'tumba') { blob(c, [[o.x - 6, o.y], [o.x + 6, o.y], [o.x + 6, o.y - 14], [o.x, o.y - 18], [o.x - 6, o.y - 14]], '#d8d4cc'); return true; }
  if (o.kind === 'lila') { if (S === 3) return true; for (let k = 0; k < 7; k++) ell(c, o.x - 14 + (k % 4) * 9, o.y - 10 - Math.floor(k / 4) * 9, 6, 5, S < 2 ? ['#b48ad0', '#c8a0e0', '#9a70b8'][k % 3] : '#5f9a44', true); return true; }
  if (o.kind === 'mojon') { blob(c, [[o.x - 6, o.y], [o.x + 6, o.y], [o.x + 6, o.y - 18], [o.x, o.y - 23], [o.x - 6, o.y - 18]], '#e8e2d4'); c.fillStyle = '#4a2f1c'; c.font = 'bold 7px Georgia, serif'; c.textAlign = 'center'; c.fillText(o.text, o.x, o.y - 8); return true; }
  return false;
}
// the view of the road: the ground, then everything with its feet on it, sorted; the Avenue's arch of blossom on top
let roadFront = [], roadLayer = null;
function roadView(g, ox, oy, vw, vh, t, night, list){
  roadFront = [];
  for (let tx = Math.floor(ox / TILE); tx * TILE < ox + vw; tx++) for (let ty = Math.floor(oy / TILE); ty * TILE < oy + vh; ty++) { if (tx < 0 || ty < 0 || tx * TILE > RW || ty * TILE > RH) continue; const cv = roadTile(tx, ty); g.drawImage(cv, .5, .5, cv.width - 1, cv.height - 1, tx * TILE, ty * TILE, TILE, TILE); }
  const inV = (x, y, m = 200) => x > ox - m && x < ox + vw + m && y > oy - m && y < oy + vh + m * 1.5;
  // the water moves a little
  if (S !== 3) for (const w of RWAT) for (let i = 1; i < w.pts.length; i++) { const a = w.pts[i - 1], b = w.pts[i]; for (let k = 0; k < 8; k++) { const q = ((t * .2 + k / 8) % 1), x = lerp(a[0], b[0], q), y = lerp(a[1], b[1], q); if (inV(x, y, 0)) { g.strokeStyle = 'rgba(255,255,255,.4)'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(x - 5, y); g.lineTo(x + 5, y + 1); g.stroke(); } } }
  for (let k = Math.floor((ox - 400) / RBIN); k <= Math.floor((ox + vw + 400) / RBIN); k++) for (const [kind, o] of RBINS.get(k) || []) {
    const x = kind === 'p' && o.kind === 'edificio' ? o.b.x : o.x, y = kind === 'p' && o.kind === 'edificio' ? o.b.y : o.y; if (!inV(x, y)) continue;
    if (kind === 't' && o.y > roadY(o.x) && o.y - roadY(o.x) < 150 && roadTramo(roadSOf(o.x)).kind === 'avenida') { roadFront.push(o); continue; }   // (the Avenue's trees on the near side: drawn over everything, with a hole around the buggy)
    if (kind === 'p' || kind === 't') list.push({ y, draw: () => { if (!drawRoadThing(g, o, t)) drawProp(g, o, t, night); } });
    else if (kind === 'f') { if (o.sow) { o.walk = (t * .5) % 1; o.moving = true; } list.push({ y, draw: () => drawPerson(g, o, t) }); }
    else if (kind === 'c') list.push({ y, draw: () => drawCow(g, o, t) });
    else if (kind === 'd') list.push({ y, draw: () => drawDog(g, o, t) });
  }
  // the lady in a cart coming the other way, near Bright River (Matthew nods to her: on the Island one nods to everybody)
  if (game.roadLady) { const s = game.roadLady.s, [x, y, dx] = roadAt(s); if (inV(x, y)) { const b = { look: 'f:blewett', x, y: y + 14, dir: 3, c8: ((Math.round(Math.atan2(-roadAt(s)[3], -dx) / (Math.PI / 4)) + 2) % 8 + 8) % 8, walk: (t * 1.6) % 1, moving: true }; list.push({ y: y + 15, draw: () => drawBuggy(g, b, t) }); } }
  for (const k of Object.keys(PEOPLE)) { const p = PEOPLE[k]; if (p.where !== 'camino' || !inV(p.x, p.y)) continue; if (p.buggy) pushDriven(list, g, p, t); else list.push({ y: p.y, draw: () => drawPerson(g, p, t) }); }
}
// the Avenue, painted like a watercolour of it (the book: «a canopy of snowy fragrant bloom… the sunset sky at the far end like a great rose window at
// the end of a cathedral aisle»): an arch of blossom over the road, petals falling, the light rosy and golden, and at
// its end the glow of the sunset
const avenidaX = () => [roadXOf(ROAD_TRAMOS.find(r => r.kind === 'avenida').s), roadXOf(ROAD_TRAMOS.find(r => r.name === 'Newbridge').s)];
function roadCanopy(g, ox, oy, vw, vh, t){
  const [a, b] = avenidaX(); if (ox > b + 600 || ox + vw < a - 600) return;
  const bloom = S === 0, inn = x => clamp(Math.min(x - a, b - x) / 400, 0, 1);   // (how deep into the Avenue: the arch thickens)
  const deep = inn(ox + vw / 2), FL = ['#ffffff', '#fbfcf4', '#f4f7ea'], LV = ['#a8d07a', '#86b85a', '#c4e09a'];
  // the near trees, in their own layer, with a soft hole where the buggy is (so the tunnel closes round it and it still shows)
  if (roadFront.length) {
    const cv = g.canvas, L = roadLayer && roadLayer.width === cv.width && roadLayer.height === cv.height ? roadLayer : (roadLayer = Object.assign(document.createElement('canvas'), { width: cv.width, height: cv.height })), lc = L.getContext('2d');
    lc.setTransform(1, 0, 0, 1, 0, 0); lc.clearRect(0, 0, L.width, L.height); lc.setTransform(g.getTransform());
    for (const o of roadFront.sort((p, q) => p.y - q.y)) drawProp(lc, o, t, false);
    const d = PEOPLE[game.road?.with], who = [ana.onCart || game.scene === 'camino' ? ana : null, d?.where === 'camino' ? d : null].filter(Boolean);
    lc.globalCompositeOperation = 'destination-out';
    for (const p of who) { const hx = p.x + 20, hy = p.y - 22; lc.save(); lc.translate(hx, hy); lc.scale(1.9, 1); const gr = lc.createRadialGradient(0, 0, 45, 0, 0, 120); gr.addColorStop(0, 'rgba(0,0,0,.94)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); lc.fillStyle = gr; lc.fillRect(-125, -125, 250, 250); lc.restore(); }   // (longer along the road)
    lc.globalCompositeOperation = 'source-over';
    g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(L, 0, 0); g.restore();
  }
  g.save();
  // the light at the end of the tunnel: a white, misty brightness ahead of the buggy (and the sunset beyond)
  if (S !== 3 && deep > 0) {
    const hx = Math.min(b, ox + vw * .9), hy = roadY(hx) - 130, gr = g.createRadialGradient(hx, hy, 10, hx, hy, Math.max(vw, vh) * .55);
    gr.addColorStop(0, `rgba(255,255,248,${.9 * deep})`); gr.addColorStop(.25, `rgba(254,252,238,${.6 * deep})`); gr.addColorStop(.6, `rgba(252,250,232,${.2 * deep})`); gr.addColorStop(1, 'rgba(250,246,230,0)'); g.fillStyle = gr; g.fillRect(ox, oy, vw, vh);
    const ex = b + 80, ey = roadY(b) - 40, gs = g.createRadialGradient(ex, ey, 20, ex, ey, 700); gs.addColorStop(0, 'rgba(255,226,180,.45)'); gs.addColorStop(1, 'rgba(255,226,180,0)'); g.fillStyle = gs; g.fillRect(ox, oy, vw, vh);
  }
  // the arch: clusters of blossom and young leaves reaching over the road from both sides, thinner over the middle
  for (let x = Math.max(a - 200, Math.floor(ox / 18) * 18 - 36); x < Math.min(b + 200, ox + vw + 36); x += 18) {
    const y = roadY(x), d = inn(x); if (d <= 0) continue;
    for (let k = 0; k < 7; k++) {
      const reach = rh(x, k) * 70, yy = y - 150 + reach - rh(x, k + 9) * 20, leaf = rh(x, k + 11) < .3;   // (from the far row, reaching over the road)
      g.globalAlpha = (.18 + .3 * (1 - reach / 70)) * d; ell(g, x + (rh(x, k + 3) - .5) * 20, yy, 16 + rh(x, k + 5) * 16, 10 + rh(x, k + 7) * 8, !bloom || leaf ? LV[k % 3] : FL[k % 3], false);
    }
    if (bloom) { g.globalAlpha = .85 * d; for (let k = 0; k < 3; k++) ell(g, x + rh(x, k + 20) * 18, y - 90 - rh(x, k + 21) * 60, 1.8, 1.8, '#ffffff', false); }
  }
  // petals drifting down
  if (bloom && deep > 0) { g.globalAlpha = .9 * deep; for (let i = 0; i < 110; i++) { const sp = 16 + rh(i, 1) * 20, px = ox + ((rh(i, 2) * vw + t * (8 + rh(i, 3) * 12) + Math.sin(t * .9 + i) * 18) % vw + vw) % vw, py = oy + ((rh(i, 4) * vh + t * sp) % vh); ell(g, px, py, 2.2, 1.3, i % 5 ? '#ffffff' : '#f6eef0', false, t * 2 + i); } }
  // the light: soft, green-white, with slanting shafts
  if (S !== 3 && deep > 0) {
    g.globalAlpha = deep; g.fillStyle = 'rgba(250,255,236,.10)'; g.fillRect(ox, oy, vw, vh);
    const cx = clamp(ox + vw / 2, a, b);
    for (let k = 0; k < 5; k++) { const sx = Math.floor((cx - 600) / 260) * 260 + k * 260 + Math.sin(t * .3 + k) * 20, gr = g.createLinearGradient(sx, oy, sx + 160, oy + vh); gr.addColorStop(0, 'rgba(255,252,225,0)'); gr.addColorStop(.5, `rgba(255,252,225,${.12 + .05 * Math.sin(t * .7 + k * 2)})`); gr.addColorStop(1, 'rgba(255,252,225,0)'); g.fillStyle = gr; g.beginPath(); g.moveTo(sx, oy); g.lineTo(sx + 70, oy); g.lineTo(sx + 330, oy + vh); g.lineTo(sx + 200, oy + vh); g.closePath(); g.fill(); }
  }
  // branches hanging into the picture from its edges, close to us: as if we looked through them
  if (bloom && deep > 0) {
    const sc = Math.min(vw, vh) / 520, sw = Math.sin(t * .8) * 3;
    const BR = [[0, 0, 1, 1, .9], [1, 0, -1, 1, 1], [1, 1, -1, -1, 1.1], [0, 1, 1, -1, .8]];   // (corner, and which way it reaches)
    for (const [cx0, cy0, dx, dy, k] of BR) {
      const x0 = ox + cx0 * vw, y0 = oy + cy0 * vh, L = 300 * sc * k, ang = Math.atan2(dy * .55, dx), seg = 10;
      const pts = Array.from({ length: seg + 1 }, (_, i) => { const u = i / seg; return [x0 + Math.cos(ang) * L * u + Math.sin(u * 3 + cx0) * 14 * sc + sw * u, y0 + Math.sin(ang) * L * u + u * u * 40 * sc * (cy0 ? -1 : 1) * -1]; });
      g.globalAlpha = .92 * deep; line(g, pts, '#6a4a32', 6 * sc, cx0 * 3 + cy0);
      for (let i = 1; i <= seg; i++) { const [px, py] = pts[i], n = 9 + (i % 4) - Math.floor(i / 4);
        for (let m = 0; m < n; m++) { const a2 = rh(i * 7 + m, cx0 + cy0 * 2) * TAU, r2 = (6 + rh(i + m * 3, 5) * 34) * sc * (1.2 - i / seg * .5), fx = px + Math.cos(a2) * r2, fy = py + Math.sin(a2) * r2 * .8;
          if (m % 3 === 1) ell(g, fx, fy, 9 * sc, 4 * sc, LV[m % 3], false, a2); else { for (let p = 0; p < 5; p++) { const pa = p / 5 * TAU + a2; ell(g, fx + Math.cos(pa) * 4.4 * sc, fy + Math.sin(pa) * 4.4 * sc, 4 * sc, 4 * sc, p % 2 ? '#ffffff' : '#f8faf0', false); } ell(g, fx, fy, 1.8 * sc, 1.8 * sc, '#e0c860', false); } } }
    }
  }
  g.restore();
}
ROOMS.camino = {
  draw: () => {}, place: 'en el largo camino rojo entre Bright River y Avonlea', exitLabel: '',
  items: () => [],
  blocked: roadBlocked,
  glow: () => [0, 0, 1, '255,200,120', 0],
  actions: add => {
    if (dist(ana.x, ana.y, RSTN.x, RSTN.y + 20) < 260) add('andén', RSTN.x, RSTN.y + 10, 40, 'Entrar al andén de la estación', () => goIn('br'), { pri: 3, hy: 20, hit: 36 });
    if (dist(ana.x, ana.y, RCHERRY.x, RCHERRY.y) < 360) add('cerezo', RCHERRY.x, RCHERRY.y - 30, 70, 'Mirar el gran cerezo silvestre', () => comentar('cerezo_silvestre'), { pri: 5, hy: 60, hit: 60 });
    const d = PEOPLE[game.road?.with]; if (d && d.where === 'camino' && !ana.onCart) { const [cx, cy] = cartFromDriver(d.x, d.y, cartC8(d)); add('calesa', cx, cy - 6, 70, '🐴 Subir a la calesa', () => roadBoard(), { pri: 2, hy: 20, hit: 46 }); }
    for (const k of Object.keys(PEOPLE)) { const p = PEOPLE[k]; if (p.where === 'camino' && p.buggy && !game.road && dist(ana.x, ana.y, p.x, p.y) < 200) add('calesa:' + k, p.x, p.y, 60, `🐴 Pedirle a ${wmName(k)} que la lleve`, () => { game.road = { with: k }; roadBoard(); }, { pri: 2, hy: 20, hit: 46 }); }
  },
};
// someone sets off on the road (from the signpost of Avonlea, s = 1, or from the station, s = 0)
function roadStart(k, s, dir){
  const b = wmBody(k); if (!b) return;
  b.where = 'camino'; b.roadS = s; b.roadDir = dir; b.nav = null; b.moving = false; if (k === 'matthew' || b.buggy) b.buggy = true; b.sit = !!b.buggy; b.roadTr = roadTramo(s);
  roadPlace(k, b);
  logEv(`${wmName(k)} tomó el camino ${dir > 0 ? 'de Bright River a Avonlea' : 'de Avonlea a Bright River'} (ocho millas).`, []);
}
function roadPlace(k, b){ const [x, y, dx, dy] = roadAt(b.roadS), L = Math.hypot(dx, dy) || 1, sd = (b.roadDir || 1) > 0 ? 1 : -1; b.x = x - dy / L * 14 * sd; b.y = y + dx / L * 14 * sd - (b.buggy ? 4 : 0); if (b.roadDir) b.dir = b.roadDir > 0 ? 1 : 3; }
// and arrives at the other end
function roadArrive(k, where){
  const b = wmBody(k); b.roadDir = 0; b.sit = false; b.moving = false; b.nav = null;
  if (where === 'br') { b.where = 'br'; b.x = BRS.cart.x - 70; b.y = BRS.cart.y + 4; b.dir = 3; logEv(`${wmName(k)} llegó a Bright River.`, []); }
  else { b.where = 'out'; b.x = DOOR.br[0] + 40; b.y = DOOR.br[1] + 24; b.dir = 1; logEv(`${wmName(k)} llegó a Avonlea por el camino de Bright River.`, []); }
}
// Ana on the road: in the buggy with whoever drives (game.road.with), or on foot
function roadJoin(withK){
  const d = wmBody(withK); if (!d || d.where !== 'camino') return;
  if (game.talk) close();
  game.scene = 'camino'; game.road = { with: withK }; ana.onCart = true; ana.sit = true; ana.goto = null; ana.lie = false; ana.moving = false; diana.follow = false; ana.roadS = d.roadS;
  const c8_ = cartC8(d), [cx_, cy_] = cartFromDriver(d.x, d.y, c8_), [ax_, ay_] = cartSeat(cx_, cy_, c8_, 1); ana.x = ax_; ana.y = ay_; ana.dir = c8Dir(c8_);
  if (!obsScene()) { cam.x = ana.x; cam.y = ana.y; cam.snap = true; }
}
function roadBoard(){ const d = PEOPLE[game.road?.with]; if (!d) return; ana.onCart = true; ana.sit = true; ana.goto = null; sayB(qOf(game.road.with), pick(['Bueno, pues… sube.', 'Ya lo creo. Arriba.', 'Sube, sube. Seguimos.'])); }
function roadGetOff(){ if (!ana.onCart) return; ana.onCart = false; ana.sit = false; ana.y += 24; ana.offT = TT; const d = PEOPLE[game.road?.with]; if (d) sayB(qOf(game.road.with), pick(['Bueno, pues… te espero aquí.', 'No te alejes mucho, ¿eh?', 'Estira las piernas, que queda un buen trecho.'])); }
// Ana walks on to the edge of Avonlea, or into the road from the signpost, on foot
function roadOnFoot(s){ game.scene = 'camino'; game.road = null; ana.onCart = false; ana.sit = false; const [x, y] = roadAt(s); ana.x = x + (s > .5 ? -60 : 60); ana.y = y + 20; ana.roadS = s; if (!obsScene()) { cam.x = ana.x; cam.y = ana.y; cam.snap = true; } anaSays(s > .5 ? '¡Ocho millas hasta Bright River! Bueno… paso a paso se llega a cualquier parte, ¿no?' : 'Tejas Verdes queda para allá. Ocho millas… ¡qué aventura!'); }
function roadTick(dt){
  for (const k of Object.keys(PEOPLE)) {
    const b = PEOPLE[k]; if (b.where !== 'camino') continue;
    if (b.roadDir == null) b.roadDir = 1;   // (left on the road: home to Avonlea)
    b.roadWait = game.road?.with === k && game.scene === 'camino' && !ana.onCart;   // (Ana got down: the buggy waits for her)
    if (b.roadDir && !b.roadWait && !(CHAT_HOLD[k] > TT)) {
      const v = b.buggy ? ROAD_V * (roadTramo(b.roadS ?? 1).ritmo || 1) * (game.road?.with === k && TALKS.some(t => t.paso) ? ROAD_PASO : 1) : AGENTS[k] ? wmPace(AGENTS[k]) : (CH[k]?.speed?.walk || 40);   // (at a walk, while something that matters is said)
      b.roadS = clamp((b.roadS ?? 1) + b.roadDir * v * dt / ROAD_LEN, 0, 1); b.walk = ((b.walk || 0) + dt * 1.6) % 1; b.moving = !b.buggy;
    } else b.moving = false;
    b.sit = !!b.buggy; roadPlace(k, b);
    const tr = roadTramo(b.roadS); if (tr !== b.roadTr) { b.roadTr = tr; if (game.road?.with === k && game.scene === 'camino') roadTramoIn(k, tr); }
    if (b.roadDir > 0 && b.roadS >= 1) roadArrive(k, 'out'); else if (b.roadDir < 0 && b.roadS <= 0) roadArrive(k, 'br');
  }
  if (game.scene === 'camino') {
    const d = PEOPLE[game.road?.with];
    if (ana.onCart && d) {   // in the buggy: where the buggy is; at the end of the road, she gets down with the driver
      if (d.where === 'camino') { const c8_ = cartC8(d), [cx_, cy_] = cartFromDriver(d.x, d.y, c8_), [ax_, ay_] = cartSeat(cx_, cy_, c8_, 1); ana.x = ax_; ana.y = ay_; ana.dir = c8Dir(c8_); ana.sit = true; ana.vx = ana.vy = 0; ana.roadS = d.roadS; }
      else if (d.where === 'br') { ana.onCart = false; goIn('br', [d.x + 26, d.y + 6]); }
      else {
        game.scene = 'out'; ana.onCart = false; ana.sit = false; ana.x = d.x + 22; ana.y = d.y + 2;
        if (!obsScene()) { cam.x = ana.x; cam.y = ana.y; }
        if (game.tripWith === game.road.with && !wmDriven(game.road.with)) { d.buggy = false; cart.on = true; cart.s = CART_LEN; cart.dest = 'av'; cart.dir = 1; cartOn('av'); }   // (the trip she asked for: on to Green Gables)
        roadAvonlea(game.road?.with);
      }
    } else {   // on foot: along the road, out at either end
      ana.roadS = roadSOf(ana.x);
      if (ana.x > RW - 160) { game.scene = 'out'; game.road = null; ana.x = DOOR.br[0] + 30; ana.y = DOOR.br[1] + 30; if (!obsScene()) { cam.x = ana.x; cam.y = ana.y; cam.snap = true; } logEv('Ana llegó a pie a Avonlea por el camino de Bright River.'); }
      else if (d && d.where === 'camino' && TT - lastInput > 8 && !ANA_AUTO) { const [cx0, cy0] = cartFromDriver(d.x, d.y, cartC8(d)), cx = cx0, cy = cy0 + 16; if (dist(ana.x, ana.y, cx, cy) < 40) roadBoard(); else if (!ana.goto) ana.goto = { x: cx, y: cy, scene: 'camino' }; }   // (a while without moving her: back to the buggy)
      else if (d && d.where === 'camino' && ANA_AUTO && TT - (ana.offT || 0) > 25) roadBoard();
    }
  }
  // the driver of the trip Ana asked for waits by the cart at the station
  const m = PEOPLE[game.tripWith]; if (m && m.where === 'br' && !wmDriven(game.tripWith)) { m.x = BRS.cart.x - 70; m.y = BRS.cart.y + 4; m.moving = false; }
}
// on the main map, the buggy goes with whoever drives it
function buggyTick(){
  for (const k of Object.keys(PEOPLE)) { const b = PEOPLE[k]; if (b.buggy && (b.where === 'out' || b.where === 'camino')) cartTrack(b); if (b.buggy && b.where !== 'out' && b.where !== 'camino' && b.where !== 'br') b.buggy = false; }
}
