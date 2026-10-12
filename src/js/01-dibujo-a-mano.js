/* ---------- drawing by hand ----------
   Outlines are drawn twice, each time with its points nudged a little; the nudges change a few times a second
   (boil), and come from the shape's size, so a shape that moves keeps its wobble. */
let boil = 0;
// the season (0 spring, 1 summer, 2 autumn, 3 winter) and whether the outdoors is being drawn (for the scarves)
let S = 0, drawingOut = true;
const SEASONS = ['Primavera', 'Verano', 'Otoño', 'Invierno'], SICON = ['🌸', '☀', '🍂', '❄'];
const INK = 'rgba(70,42,26,.78)';
function sketch(c, pts, closed, seed, col = INK, w = 1){
  for (let pass = 0; pass < 2; pass++) {
    const r = rng(seed * 31 + pass * 977 + boil * 7919), amp = .45 + pass * .2;
    c.beginPath();
    pts.forEach(([x, y], i) => { const nx = x + (r() - .5) * amp * 2, ny = y + (r() - .5) * amp * 2; i ? c.lineTo(nx, ny) : c.moveTo(nx, ny); });
    if (closed) c.closePath();
    c.strokeStyle = col; c.lineWidth = w * (pass ? .6 : 1); c.lineJoin = 'round'; c.lineCap = 'round'; c.stroke();
  }
}
const seedOf = (...v) => v.reduce((h, x) => Math.imul(h ^ Math.round(x * 4), 0x9E3779B1) >>> 0, 7);
// a watercolour shape (fill a hair off its line) with a pencil outline
function blob(c, pts, fill, line = true){
  c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x + .6, y + .4) : c.moveTo(x + .6, y + .4)); c.closePath(); c.fillStyle = fill; c.fill();
  if (line) sketch(c, pts, true, seedOf(pts.length, pts[1][0] - pts[0][0], pts[1][1] - pts[0][1], pts[2] ? pts[2][0] - pts[0][0] : 0));
}
function ell(c, x, y, rx, ry, fill, line = false, rot = 0){
  if (rx <= 0 || ry <= 0) return;
  c.beginPath(); c.ellipse(x + (line ? .5 : 0), y + (line ? .4 : 0), rx, ry, rot, 0, TAU); c.fillStyle = fill; c.fill();
  if (line) {
    const n = rx > 60 ? 56 : rx > 6 ? 14 : 9, pts = [];
    for (let k = 0; k < n; k++) { const a = k / n * TAU; pts.push([x + Math.cos(a) * rx * Math.cos(rot) - Math.sin(a) * ry * Math.sin(rot), y + Math.cos(a) * rx * Math.sin(rot) + Math.sin(a) * ry * Math.cos(rot)]); }
    sketch(c, pts, true, seedOf(rx, ry, n), line === true ? INK : line);
  }
}
function line(c, pts, col, w, seed = 3){ sketch(c, pts, false, seedOf(seed, pts.length, pts[0][0] - pts[pts.length - 1][0]), col, w); }
// a few pencil hatches over a dark side
function hatch(c, x, y, w, h, seed, col = 'rgba(70,42,26,.22)'){
  const r = rng(seed + boil * 13); c.strokeStyle = col; c.lineWidth = .7; c.beginPath();
  for (let k = 0; k < w / 4; k++) { const hx = x + r() * w, hy = y + r() * h; c.moveTo(hx, hy); c.lineTo(hx + 4, hy - 4); }
  c.stroke();
}
// paper grain: drawn over the whole screen
const paper = document.createElement('canvas'); paper.width = paper.height = 256;
(() => { const p = paper.getContext('2d'), r = rng(5); for (let n = 0; n < 9000; n++) { p.fillStyle = r() < .5 ? `rgba(90,60,30,${r() * .12})` : `rgba(255,250,235,${r() * .15})`; p.fillRect(r() * 256, r() * 256, 1 + r(), 1 + r()); }
  p.strokeStyle = 'rgba(120,90,60,.06)'; for (let n = 0; n < 60; n++) { p.beginPath(); const x = r() * 256, y = r() * 256; p.moveTo(x, y); p.quadraticCurveTo(x + r() * 20 - 10, y + r() * 20 - 10, x + r() * 30 - 15, y + r() * 30 - 15); p.stroke(); } })();
