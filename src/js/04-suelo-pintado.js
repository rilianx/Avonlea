/* ---------- the ground, painted again each season (watercolour washes, the paths, the brook's bed) ---------- */
const GS = .6, TILE = 1024, tiles = new Map();   // (the ground by tiles of 1024 px, painted at 60%, the last ones kept)
let tilesPainted = 0, tileFrame = -1;
const tilePlain = {};   // (a plain tile of the season's colour, while the real one waits its turn)
let FRAME = 0;
function tileBudget(){ if (tileFrame !== FRAME) { tileFrame = FRAME; tilesPainted = 0; } if (tilesPainted >= 1) { const k = S; if (!tilePlain[k]) { const c = document.createElement('canvas'); c.width = c.height = 8; const x = c.getContext('2d'); x.fillStyle = GPAL[k].base; x.fillRect(0, 0, 8, 8); tilePlain[k] = c; } return tilePlain[k]; } tilesPainted++; return null; }
function groundTile(tx, ty){
  const key = S + ':' + tx + ',' + ty; let cv = tiles.get(key);
  if (cv) { tiles.delete(key); tiles.set(key, cv); return cv; }
  { const w = tileBudget(); if (w) return w; }
  cv = document.createElement('canvas'); cv.width = cv.height = Math.ceil(TILE * GS); paintTile(cv, S, tx * TILE, ty * TILE); tiles.set(key, cv);
  if (tiles.size > 40) tiles.delete(tiles.keys().next().value);
  return cv;
}
const GPAL = [
  { base: '#94c266', wash: ['170,212,110', '120,170,80', '196,218,122'], grass: 'rgba(70,110,40,.18)', path: ['rgba(150,120,70,.3)', '#cdae7a', '#dbbf8d'], bed: '#8a6440', wood: '40,70,40,.45', bank: '120,95,60' },
  { base: '#86b058', wash: ['150,192,92', '104,148,62', '184,200,102'], grass: 'rgba(60,95,35,.2)', path: ['rgba(150,120,70,.3)', '#cfab72', '#ddbd86'], bed: '#86603c', wood: '36,64,34,.5', bank: '120,95,60' },
  { base: '#aaa65c', wash: ['204,170,92', '150,146,70', '214,140,70'], grass: 'rgba(110,90,40,.2)', path: ['rgba(150,110,70,.3)', '#c9a676', '#d6b98a'], bed: '#80603e', wood: '90,60,30,.4', bank: '120,90,55' },
  { base: '#e9eef2', wash: ['255,255,255', '204,216,230', '236,240,247'], grass: 'rgba(150,170,195,.16)', path: ['rgba(150,150,160,.25)', '#d6d3cc', '#e3e0d9'], bed: '#d9d6d2', wood: '120,140,165,.3', bank: '150,160,175' },
];
function paintTile(cv, s, X0, Y0){
  const c = cv.getContext('2d'), P = GPAL[s], D = TILE * TILE / (AW * WH);
  let r = rng(4242 + X0 * 3 + Y0 * 7 + s * 11); const RX = () => X0 + r() * TILE, RY = () => Y0 + r() * TILE;
  c.setTransform(GS, 0, 0, GS, -X0 * GS, -Y0 * GS);
  c.fillStyle = P.base; c.fillRect(X0 - 2, Y0 - 2, TILE + 4, TILE + 4);
  // watercolour washes (the neighbouring tiles' too, so they meet without seams)
  for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) {
    const ax = X0 + i * TILE, ay = Y0 + j * TILE, rw = rng(99 + ax * 3 + ay * 7);
    for (let n = 0; n < 520 * KK * D; n++) {
      const x = ax + rw() * TILE, y = ay + rw() * TILE, rr = 30 + rw() * 130, cc = rw(), cc2 = rw();
      if (x + rr < X0 || x - rr > X0 + TILE || y + rr < Y0 || y - rr > Y0 + TILE) continue;
      const gr = c.createRadialGradient(x, y, 0, x, y, rr), col = cc < .4 ? P.wash[0] : cc2 < .5 ? P.wash[1] : P.wash[2];
      gr.addColorStop(0, `rgba(${col},.33)`); gr.addColorStop(1, `rgba(${col},0)`); c.fillStyle = gr; c.fillRect(x - rr, y - rr, rr * 2, rr * 2);
    }
  }
  // the patchwork of fields: each with its crop and its rows (green, gold, stubble, snow)
  for (const f of FIELDS) {
    if (f.x > X0 + TILE || f.x + f.w < X0 || f.y > Y0 + TILE || f.y + f.h < Y0) continue;
    const CROPS = [['#b8d47e', '#e0c872', '#c8a862', '#eef2f4'], ['#a6c86c', '#cdbb6a', '#b9a066', '#eef2f4'], ['#9a7a54', '#9a7a54', '#8a6a48', '#e6eaee'], ['#c9d98a', '#d8cf86', '#c2b07a', '#f0f3f5'], ['#8fbf62', '#9cc066', '#a89a5a', '#eaeef2']];
    c.fillStyle = CROPS[f.crop][s]; c.fillRect(f.x, f.y, f.w, f.h);
    c.strokeStyle = f.crop === 2 && s !== 3 ? 'rgba(70,45,25,.45)' : 'rgba(80,90,40,.22)'; c.lineWidth = f.crop === 2 ? 2 : 1.2;
    if (f.rows) for (let y = f.y + 8; y < f.y + f.h; y += 10) { c.beginPath(); c.moveTo(f.x + 3, y); c.lineTo(f.x + f.w - 3, y); c.stroke(); } else for (let x = f.x + 8; x < f.x + f.w; x += 10) { c.beginPath(); c.moveTo(x, f.y + 3); c.lineTo(x, f.y + f.h - 3); c.stroke(); }
    c.strokeStyle = 'rgba(90,70,40,.4)'; c.lineWidth = 1.4; c.strokeRect(f.x, f.y, f.w, f.h);
  }
  // the woods are darker
  for (const w of WOODS) { if (w.x + w.rx * 1.3 < X0 || w.x - w.rx * 1.3 > X0 + TILE || w.y + w.ry * 1.3 < Y0 || w.y - w.ry * 1.3 > Y0 + TILE) continue; c.save(); c.translate(w.x, w.y); c.scale(1, w.ry / w.rx); const hw = c.createRadialGradient(0, 0, 20, 0, 0, w.rx * 1.25); hw.addColorStop(0, `rgba(${P.wood})`); hw.addColorStop(1, `rgba(${P.wood.split(',').slice(0, 3)},0)`); c.fillStyle = hw; c.fillRect(-w.rx * 1.3, -w.rx * 1.3, w.rx * 2.6, w.rx * 2.6); c.restore(); }
  // the coast: red sand along it, then the sea (painted still; the waves move above)
  if (SEA.some(([x, y]) => x > X0 - 400 && x < X0 + TILE + 400 && y > Y0 - 400 && y < Y0 + TILE + 400) || inSea(X0 + TILE / 2, Y0 + TILE / 2)) {
    c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = s === 3 ? '#e6eef2' : '#d9785a'; c.lineWidth = 120; c.beginPath(); COAST.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke();
    c.strokeStyle = s === 3 ? '#f2f5f7' : '#e8b48a'; c.lineWidth = 60; c.stroke();
    c.fillStyle = s === 3 ? '#c7dbe6' : '#5c9fc2'; c.beginPath(); SEA.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill();
  }
  // pencil strokes of grass over the wash
  c.strokeStyle = P.grass; c.lineWidth = .8;
  for (let n = 0; n < 6000 * KK * D; n++) { const x = RX(), y = RY(); c.beginPath(); c.moveTo(x, y); c.lineTo(x + 1 + r() * 2, y - 2 - r() * 3); c.stroke(); }
  // autumn: fallen leaves; winter: the snow glitters a little
  if (s === 2) for (let n = 0; n < 2600 * KK * D; n++) { const x = RX(), y = RY(); c.fillStyle = ['rgba(200,90,50,.55)', 'rgba(220,150,60,.55)', 'rgba(180,60,40,.5)', 'rgba(230,190,80,.5)'][n % 4]; c.beginPath(); c.ellipse(x, y, 2.4 + r() * 1.6, 1.2 + r(), r() * TAU, 0, TAU); c.fill(); }
  if (s === 3) for (let n = 0; n < 2400 * KK * D; n++) { const x = RX(), y = RY(); c.fillStyle = r() < .5 ? 'rgba(170,190,215,.35)' : 'rgba(255,255,255,.9)'; c.beginPath(); c.ellipse(x, y, 1 + r() * 2.5, .6 + r(), 0, 0, TAU); c.fill(); }
  const stroke = (pts, w, col) => { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(...pts[0]); for (let i = 1; i < pts.length; i++) { const p = pts[i - 1], q = pts[i]; c.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } c.lineTo(...pts[pts.length - 1]); c.stroke(); };
  for (const p of paths) { stroke(p, 54, P.path[0]); stroke(p, 40, P.path[1]); stroke(p, 26, P.path[2]); }
  // pencil edges of the paths
  for (const p of paths) for (const side of [-1, 1]) { c.strokeStyle = 'rgba(110,80,50,.35)'; c.lineWidth = 1; c.beginPath(); for (let i = 0; i < p.length; i++) { const [x, y] = p[i], [nx, ny] = p[Math.min(i + 1, p.length - 1)], [px, py] = p[Math.max(i - 1, 0)], a = Math.atan2(ny - py, nx - px) + side * Math.PI / 2; const X = x + Math.cos(a) * 19, Y = y + Math.sin(a) * 19; i ? c.lineTo(X, Y) : c.moveTo(X, Y); } c.stroke(); }
  for (let n = 0; n < 900 * KK * D; n++) { const x = RX(), y = RY(); if (nearPath(x, y, 16)) { c.fillStyle = r() < .5 ? 'rgba(120,95,60,.4)' : 'rgba(245,232,200,.5)'; c.beginPath(); c.ellipse(x, y, 1.5 + r() * 2, 1 + r(), 0, 0, TAU); c.fill(); } }
  // winter: footprints in the snow along the paths
  if (s === 3) for (const [a, b] of segs) for (let q = 0; q < 1; q += 18 / Math.hypot(b[0] - a[0], b[1] - a[1])) { const x = lerp(a[0], b[0], q), y = lerp(a[1], b[1], q), o = (Math.round(q * 1000) % 2 ? 4 : -4); c.fillStyle = 'rgba(140,150,170,.35)'; c.beginPath(); c.ellipse(x + o, y + o * .3, 2.2, 1.4, 0, 0, TAU); c.fill(); }
  // the brook's bed and the lake's shore
  for (const w of WATERS) stroke(w.pts, 40, `rgba(${P.bank},.45)`);
  c.save(); c.translate(LAKE.x, LAKE.y); c.scale(1, LAKE.ry / LAKE.rx);
  const bank = c.createRadialGradient(0, 0, LAKE.rx * .7, 0, 0, LAKE.rx * 1.14); bank.addColorStop(0, `rgba(${P.bank},0)`); bank.addColorStop(.88, `rgba(${P.bank},.5)`); bank.addColorStop(1, `rgba(${P.bank},0)`);
  c.fillStyle = bank; c.beginPath(); c.arc(0, 0, LAKE.rx * 1.14, 0, TAU); c.fill(); c.restore();
  for (const H of HOUSE_SPOTS) { c.fillStyle = s === 3 ? 'rgba(150,140,130,.22)' : 'rgba(130,95,55,.3)'; c.beginPath(); c.ellipse(H.x, H.y + 30, H.w / 2 + 6, 26, 0, 0, TAU); c.fill(); }
  // the fields and the pens: rows of oats (green, gold, stubble, snow), trampled earth with straw
  for (const A of Object.values(AREAS)) {
    if (A.kind === 'oats') {
      c.fillStyle = ['#a9cf72', '#d9c46e', '#c8a862', '#e8edf0'][s]; c.fillRect(A.x, A.y, A.w, A.h);
      c.strokeStyle = ['rgba(80,130,45,.55)', 'rgba(160,120,35,.6)', 'rgba(130,95,45,.55)', 'rgba(170,180,195,.45)'][s]; c.lineWidth = 1;
      for (let y = A.y + 6; y < A.y + A.h; y += 7) for (let x = A.x + 4; x < A.x + A.w - 3; x += 5) { c.beginPath(); c.moveTo(x, y); c.lineTo(x + 1, y - (s === 2 ? 2 : 5) - r() * 3); c.stroke(); }
    } else {
      c.fillStyle = s === 3 ? 'rgba(220,225,232,.95)' : 'rgba(150,118,76,.55)'; c.fillRect(A.x, A.y, A.w, A.h);
      for (let n = 0; n < A.w * A.h / 260; n++) { c.fillStyle = s === 3 ? 'rgba(255,255,255,.8)' : r() < .55 ? 'rgba(225,195,110,.7)' : 'rgba(100,78,48,.4)'; c.fillRect(A.x + r() * A.w, A.y + r() * A.h, 3 + r() * 4, 1); }
    }
  }
  // the garden beds' earth (under snow in winter)
  for (const b of BEDS) { c.fillStyle = P.bed; c.beginPath(); c.ellipse(b.x, b.y, 21, 14, 0, 0, TAU); c.fill(); c.strokeStyle = 'rgba(60,40,25,.5)'; c.lineWidth = 1; c.stroke(); c.strokeStyle = s === 3 ? 'rgba(140,130,125,.4)' : 'rgba(60,40,25,.3)'; for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(b.x - 15, b.y + k * 5); c.lineTo(b.x + 15, b.y + k * 5); c.stroke(); } }
}
