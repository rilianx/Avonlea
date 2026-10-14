/* ---------- trees, houses and the rest ---------- */
let PH_HUMOS = null;   // (while a house is kept as an image: where its chimneys smoke, to draw the smoke live)
function drawTree(c, o, t){
  const s = o.s, sway = Math.sin(t * .9 + o.ph) * 1.6 * s, x = o.x, y = o.y;
  ell(c, x + 10 * s, y + 2, 30 * s, 10 * s, 'rgba(30,50,20,.22)');
  if (o.kind === 'pine') {
    blob(c, [[x - 3 * s, y], [x + 3 * s, y], [x + 2.5 * s, y - 14 * s], [x - 2.5 * s, y - 14 * s]], '#6e4a30');
    for (let k = 0; k < 3; k++) {
      const w = (22 - k * 6) * s, yy = y - (12 + k * 17) * s, L = [x - w + sway * k * .3, yy], Rt = [x + w + sway * k * .3, yy], Tp = [x + sway * (k + 1) * .4, yy - 26 * s];
      blob(c, [L, Rt, Tp], ['#2f5a3c', '#3a6b45', '#4a7d50'][k]);
      // snow lies on each layer of a pine in winter
      if (S === 3) blob(c, [[lerp(L[0], Tp[0], .45), lerp(L[1], Tp[1], .45)], Tp, [lerp(Rt[0], Tp[0], .45), lerp(Rt[1], Tp[1], .45)], [Tp[0] + 4 * s, yy - 9 * s], [Tp[0] - 2 * s, yy - 13 * s]], '#f6f8fb');
    }
    return;
  }
  blob(c, [[x - 5 * s, y], [x + 5 * s, y], [x + 3.5 * s, y - 32 * s], [x - 3.5 * s, y - 32 * s]], '#7a5536');
  const cx = x + sway, cy = y - 56 * s;
  if (S === 3) {
    // winter: bare branches with snow along them
    const BR = [[-1, -30, -12, -52, -24, -66], [1, -30, 13, -50, 22, -68], [0, -32, -2, -60, 4, -80], [-1, -40, -16, -46, -26, -44], [1, -42, 15, -60, 26, -58]];
    for (const [a0, b0, a1, b1, a2, b2] of BR) { line(c, [[x + a0 * s, y + b0 * s], [x + a1 * s + sway * .4, y + b1 * s], [x + a2 * s + sway, y + b2 * s]], '#6a4a30', 2.6 * s, a2 + b2); line(c, [[x + a1 * s + sway * .4, y + b1 * s], [x + (a1 + a2) * .5 * s + sway, y + (b1 + b2) * .5 * s - 8 * s]], '#6a4a30', 1.2 * s, a1); }
    for (const [, , a1, b1, a2, b2] of BR) { ell(c, x + a1 * s + sway * .4, y + b1 * s - 2, 4 * s, 1.6 * s, '#f6f8fb'); ell(c, x + (a1 + a2) / 2 * s + sway * .7, y + (b1 + b2) / 2 * s - 2, 3.4 * s, 1.4 * s, '#f6f8fb'); }
    return;
  }
  const AUT = [['#a8432c', '#c8583a', '#e07b4a', '#f2a66a'], ['#b8682a', '#d8873a', '#eaa84e', '#f6cc7a'], ['#b8962e', '#d4b240', '#e8cc5c', '#f6e48a']];
  const greens = o.kind === 'manzano' ? (S === 0 ? ['#86b85a', '#eef4e2', '#fafcf4', '#ffffff'] : S === 1 ? ['#4f8a42', '#62a04b', '#86bb5e', '#b0d67e'] : AUT[1])
    : o.kind === 'blossom' ? (S === 0 ? ['#e8a8b8', '#f4c4cf', '#fbdde3', '#fff1f3'] : S === 1 ? ['#4f8a42', '#62a04b', '#86bb5e', '#b0d67e'] : AUT[0])
    : o.kind === 'apple' ? (S === 0 ? ['#6a9e4e', '#f0d4dc', '#fbe8ec', '#ffffff'] : S === 1 ? ['#4f8a42', '#62a04b', '#86bb5e', '#b0d67e'] : ['#6a8a3a', '#8aa048', '#b8b05a', '#d8c870'])
    : S === 0 ? ['#5f9a46', '#74b052', '#98c868', '#c0e08a'] : S === 1 ? ['#4a7d3e', '#5c9446', '#7cb05a', '#a4cc76'] : AUT[Math.floor(o.ph / TAU * 3) % 3];
  const blobs = [[-16, 8, 20], [16, 8, 19], [0, 12, 21], [-10, -8, 19], [11, -9, 18], [0, -18, 16]];
  for (const [bx, by, r] of blobs) ell(c, cx + bx * s, cy + by * s + 3, r * s, r * .92 * s, greens[0]);
  // the crown's outline: one pencil line around all its blobs
  const pts = []; for (let k = 0; k < 22; k++) { const a = k / 22 * TAU; let best = 0; for (const [bx, by, r] of blobs) { const dx = Math.cos(a), dy = Math.sin(a), px = bx * dx + by * dy, q = bx * bx + by * by - r * r, dd = px + Math.sqrt(Math.max(0, px * px - q)); if (dd > best) best = dd; } pts.push([cx + Math.cos(a) * best * s, cy + Math.sin(a) * best * s * .92 + 3]); }
  sketch(c, pts, true, seedOf(s, o.kind.length));
  for (const [bx, by, r] of blobs) ell(c, cx + bx * s - 1, cy + by * s, r * .88 * s, r * .8 * s, greens[1]);
  for (const [bx, by, r] of blobs.slice(3)) ell(c, cx + bx * s - 3, cy + by * s - 4, r * .55 * s, r * .45 * s, greens[2]);
  for (const [bx, by, r] of blobs.slice(4)) ell(c, cx + bx * s - 5, cy + by * s - 7, r * .25 * s, r * .2 * s, greens[3]);
  hatch(c, cx - 4 * s, cy + 8 * s, 24 * s, 14 * s, seedOf(x, y));
  if (o.kind === 'manzano' && S === 0) for (let k = 0; k < 14; k++) { const a = rh(k, o.ph) * TAU, d = rh(k + 7, o.ph) * 24; ell(c, cx + Math.cos(a) * d * s, cy + Math.sin(a) * d * .8 * s, 2.2 * s, 1.6 * s, k % 3 ? '#9cc870' : '#6f9e48'); }   // (the young leaves among the blossom)
  if (o.kind === 'apple' && (S === 1 || S === 2)) for (let k = 0; k < o.apples; k++) { const [ax, ay] = [[-12, 2], [10, -4], [2, 10]][k]; ell(c, cx + ax * s, cy + ay * s, 2.6, 2.6, '#d9433b', true); }
}
function drawBush(c, o, t){
  const s = o.s, x = o.x, y = o.y, sw = Math.sin(t * 1.2 + o.ph) * .8;
  ell(c, x + 4, y + 1, 18 * s, 6 * s, 'rgba(30,50,20,.2)');
  const BC = [['#4b8540', '#5b9a48', '#7cb85a'], ['#4b8540', '#5b9a48', '#7cb85a'], ['#8a7a3a', '#a8883e', '#c8a24a'], ['#6a7a64', '#7a8a72', '#f6f8fb']][S];
  for (const [bx, by, r, k] of [[-8, -8, 10, 0], [8, -8, 10, 0], [0, -12, 11, 1], [-3, -15, 6, 2]]) ell(c, x + bx * s + sw, y + by * s, r * s, r * .85 * s, BC[k], r > 8);
  if (S === 3) { ell(c, x + sw, y - 19 * s, 10 * s, 3.4 * s, '#f6f8fb', true); ell(c, x - 9 * s + sw, y - 15 * s, 6 * s, 2.4 * s, '#f6f8fb'); return; }
  if (S === 0) for (let k = 0; k < 6; k++) ell(c, x + [-9, -2, 6, 10, -5, 2][k] * s + sw, y + [-11, -16, -14, -7, -5, -9][k] * s, 1.6, 1.6, '#fffaf2', true);
  if (S === 1 || S === 2) for (let k = 0; k < o.berries; k++) { const [bx, by] = [[-7, -10], [5, -13], [9, -6]][k]; ell(c, x + bx * s + sw, y + by * s, 1.9, 1.9, '#3c4fa8', true); }
}
// a steeple (the church) or a bell (the school) on the roof
function drawSteeple(c, o){
  const x = o.x, ry = o.y - 56 - 70;
  if (o.style === 'iglesia') { blob(c, [[x - 12, ry + 30], [x + 12, ry + 30], [x + 12, ry - 30], [x - 12, ry - 30]], o.wall); blob(c, [[x - 15, ry - 28], [x + 15, ry - 28], [x, ry - 74]], o.roof); line(c, [[x, ry - 74], [x, ry - 90]], '#5a4a40', 2, 1); line(c, [[x - 6, ry - 84], [x + 6, ry - 84]], '#5a4a40', 2, 2); blob(c, [[x - 5, ry - 6], [x + 5, ry - 6], [x + 5, ry - 20], [x - 5, ry - 20]], '#3a2a24'); }
  else if (o.style === 'tienda') { const y = o.y; blob(c, [[x - 46, y - 32], [x + 46, y - 32], [x + 52, y - 18], [x - 52, y - 18]], '#c8463a'); for (let k = -42; k < 46; k += 12) blob(c, [[x + k, y - 32], [x + k + 6, y - 32], [x + k + 7, y - 18], [x + k + 1, y - 18]], '#f2ede2', false); for (const bx of [x - 64, x + 64]) { ell(c, bx, y - 2, 9, 4, 'rgba(30,40,20,.2)'); blob(c, [[bx - 8, y], [bx + 8, y], [bx + 9, y - 18], [bx - 9, y - 18]], '#9a6a3e'); line(c, [[bx - 9, y - 12], [bx + 9, y - 12]], '#5a3a24', 1.2, bx); } }
  else if (o.style === 'escuela') { blob(c, [[x - 9, ry + 20], [x + 9, ry + 20], [x + 9, ry - 8], [x - 9, ry - 8]], '#f2ede2'); blob(c, [[x - 12, ry - 6], [x + 12, ry - 6], [x, ry - 26]], o.roof); ell(c, x, ry + 8, 4, 5, '#c8a040', true); }
}
// the lighthouse: a tall white tower with red bands on the rocks, its gallery and its lantern (lit at night)
function drawFaro(c, x, y, t, night){
  ell(c, x + 26, y + 4, 46, 11, 'rgba(30,40,20,.24)');
  for (const [rx, ry, rs] of [[-30, 4, 1], [26, 6, .8], [-14, 10, .7], [36, -2, .6], [-40, -4, .7]]) ell(c, x + rx, y + ry, 16 * rs, 9 * rs, '#9a8a80', true);
  const H = 150, bw = 21, tw = 13, wAt = k => lerp(bw, tw, k);
  blob(c, [[x - bw, y], [x + bw, y], [x + tw, y - H], [x - tw, y - H]], '#f6f2e8');
  for (let k = 0; k < 4; k++) { const k0 = .14 + k * .22, k1 = k0 + .1; blob(c, [[x - wAt(k0), y - H * k0], [x + wAt(k0), y - H * k0], [x + wAt(k1), y - H * k1], [x - wAt(k1), y - H * k1]], '#c8463a', false); }
  blob(c, [[x + wAt(0) * .35, y], [x + bw, y], [x + tw, y - H], [x + tw * .35, y - H]], 'rgba(60,50,70,.12)', false);
  blob(c, [[x - 6, y], [x + 6, y], [x + 6, y - 16], [x - 6, y - 16]], '#5a3a2a');
  for (const k of [.4, .63]) ell(c, x, y - H * k - 6, 2.4, 3.6, '#3a4a5a', true);
  blob(c, [[x - 19, y - H], [x + 19, y - H], [x + 19, y - H - 5], [x - 19, y - H - 5]], '#3a3436');
  for (let k = -18; k <= 18; k += 4) line(c, [[x + k, y - H - 5], [x + k, y - H - 12]], '#3a3436', .9, k);
  line(c, [[x - 19, y - H - 12], [x + 19, y - H - 12]], '#3a3436', 1.2, 1);
  const lit = night > .25, glass = lit ? '#fff1b0' : '#cfe0e6';
  blob(c, [[x - 10, y - H - 5], [x + 10, y - H - 5], [x + 10, y - H - 26], [x - 10, y - H - 26]], glass);
  if (lit) ell(c, x, y - H - 15, 6, 6, 'rgba(255,240,170,.95)'); else ell(c, x, y - H - 15, 4, 5, '#e8c070', true);
  for (const k of [-5, 0, 5]) line(c, [[x + k, y - H - 5], [x + k, y - H - 26]], '#3a3436', .8, k + 9);
  blob(c, [[x - 13, y - H - 26], [x + 13, y - H - 26], [x + 6, y - H - 36], [x - 6, y - H - 36]], '#3a3436');
  ell(c, x, y - H - 38, 2.6, 2.6, '#3a3436', true); line(c, [[x, y - H - 40], [x, y - H - 50]], '#3a3436', 1.2, 2);
}
// the buildings one does not enter: the village, the hotel, the cannery, the lighthouse
function drawBuilding(c, b, t, night){
  if (b.style === 'faro') return drawFaro(c, b.x, b.y, t, night);
  const look = { hotel: ['#f2ede2', '#4f6a7a', '#3a4a56', false], salon: ['#efe4cc', '#6a5a50', '#4a3a30', true], tienda: ['#e8d6b0', '#8a5a3c', '#5a3a28', true], casa: [['#efe4cc', '#e6dcc4', '#f1ead8', '#dcc8b4'][Math.floor(b.x / 7) % 4], ['#8a5a3c', '#5f7a9a', '#7a6a4a', '#9a5a3c'][Math.floor(b.x / 11) % 4], '#6a4a32', true], herreria: ['#b8a890', '#4a4440', '#3a3430', true], galpon: ['#c8b8a0', '#6a6a6a', '#4a4a4a', true], granja: ['#efe4cc', '#8a5a3c', '#6a4a32', true] }[b.style] || ['#efe4cc', '#8a5a3c', '#6a4a32', true];
  drawHouse(c, { h: { x: b.x, y: b.y, w: b.w }, wall: look[0], roof: look[1], trim: look[2], x: b.x, y: b.y, small: look[3] }, t, night);
  if (b.style === 'tienda') { blob(c, [[b.x - 40, b.y - 30], [b.x + 40, b.y - 30], [b.x + 46, b.y - 18], [b.x - 46, b.y - 18]], '#c8463a'); for (let k = -36; k < 40; k += 12) blob(c, [[b.x + k, b.y - 30], [b.x + k + 6, b.y - 30], [b.x + k + 7, b.y - 18], [b.x + k + 1, b.y - 18]], '#f2ede2', false); }
  if (b.style === 'herreria') { blob(c, [[b.x + 40, b.y], [b.x + 58, b.y], [b.x + 58, b.y - 14], [b.x + 40, b.y - 14]], '#3a3436'); ell(c, b.x + 49, b.y - 18, 9, 3, '#5a5a62', true); }
}
function drawHouse(c, o, t, night){
  const H = o.h, x = H.x, y = H.y, w = H.w, h = o.small ? 56 : 66;
  ell(c, x + 20, y + 4, w / 2 + 30, 14, 'rgba(30,40,20,.24)');
  // the front: clapboards (lines), a porch roof over the door at Green Gables, windows and the door
  blob(c, [[x - w / 2, y], [x + w / 2, y], [x + w / 2, y - h], [x - w / 2, y - h]], o.wall);
  c.strokeStyle = 'rgba(120,100,80,.25)'; c.lineWidth = .8; for (let yy = y - h + 6; yy < y; yy += 6) { c.beginPath(); c.moveTo(x - w / 2 + 1, yy); c.lineTo(x + w / 2 - 1, yy); c.stroke(); }
  const glow = night > .3;
  for (const wx of [-w / 2 + 46, -w / 2 + 92, w / 2 - 92, w / 2 - 46]) {
    if (o.small && Math.abs(wx) < 50) continue;
    const wy = y - h + 14;
    blob(c, [[x + wx - 11, wy], [x + wx + 11, wy], [x + wx + 11, wy + 22], [x + wx - 11, wy + 22]], glow ? `rgb(255,${205 + 18 * Math.sin(t * 3 + wx)},130)` : '#a9cbd8');
    c.strokeStyle = o.trim; c.lineWidth = 2; c.beginPath(); c.moveTo(x + wx, wy); c.lineTo(x + wx, wy + 22); c.moveTo(x + wx - 11, wy + 11); c.lineTo(x + wx + 11, wy + 11); c.stroke();
    blob(c, [[x + wx - 16, wy - 2], [x + wx - 11, wy - 2], [x + wx - 11, wy + 24], [x + wx - 16, wy + 24]], o.trim, false);
    blob(c, [[x + wx + 11, wy - 2], [x + wx + 16, wy - 2], [x + wx + 16, wy + 24], [x + wx + 11, wy + 24]], o.trim, false);
  }
  blob(c, [[x - 12, y], [x - 12, y - 32], [x, y - 40], [x + 12, y - 32], [x + 12, y]], '#7a4f32'); ell(c, x + 7, y - 16, 1.5, 1.5, '#e8c46a');
  if (!o.small) { blob(c, [[x - 30, y - 38], [x + 30, y - 38], [x + 24, y - 50], [x - 24, y - 50]], o.roof); c.fillStyle = '#e9e3d6'; c.fillRect(x - 27, y - 38, 3, 38); c.fillRect(x + 24, y - 38, 3, 38); }
  // the roof, seen from above and in front, with its gables (green at Green Gables!) and a chimney with smoke
  const ry = y - h, rd = o.small ? 70 : 84;
  blob(c, [[x - w / 2 - 14, ry + 6], [x + w / 2 + 14, ry + 6], [x + w / 2 - 6, ry - rd], [x - w / 2 + 6, ry - rd]], o.roof);
  c.strokeStyle = 'rgba(40,60,35,.35)'; c.lineWidth = 1; for (let k = 1; k < 7; k++) { const yy = ry + 6 - (rd + 6) * k / 7, ww = w / 2 + 14 - 20 * k / 7; c.beginPath(); c.moveTo(x - ww, yy); c.lineTo(x + ww, yy); c.stroke(); }
  hatch(c, x - w / 2, ry - rd + 4, w, rd * .5, seedOf(x, 3), 'rgba(30,40,25,.18)');
  if (S === 3) { const pts = [[x - w / 2 + 6, ry - rd], [x + w / 2 - 6, ry - rd]]; for (let k = 0; k <= 10; k++) { const f = .2 + Math.sin(k * 1.9 + x) * .05, ww = w / 2 + 14 - 20 * f; pts.push([x + ww - k / 10 * ww * 2, ry + 6 - (rd + 6) * f + (k % 2) * 4]); } blob(c, pts, '#f6f8fb'); }
  for (const gx of o.small ? [0] : [-w / 2 + 70, w / 2 - 70]) {
    const gy = ry - rd * .45;
    blob(c, [[x + gx - 26, ry + 4], [x + gx + 26, ry + 4], [x + gx, gy]], o.roof);
    if (S === 3) blob(c, [[x + gx - 27, ry + 5], [x + gx, gy - 3], [x + gx + 27, ry + 5], [x + gx + 22, ry + 6], [x + gx, gy + 3], [x + gx - 22, ry + 6]], '#f6f8fb');
    blob(c, [[x + gx - 18, ry + 2], [x + gx + 18, ry + 2], [x + gx, gy + 10]], o.wall);
    blob(c, [[x + gx - 6, ry - 14], [x + gx + 6, ry - 14], [x + gx + 6, ry - 2], [x + gx - 6, ry - 2]], glow ? '#ffd27a' : '#a9cbd8');
  }
  const chx = x + w / 2 - 34, chy = ry - rd + 18;
  blob(c, [[chx - 8, chy], [chx + 8, chy], [chx + 8, chy - 30], [chx - 8, chy - 30]], '#a46a50');
  if (S === 3) ell(c, chx, chy - 31, 9, 3, '#f6f8fb', true);
  // smoke from the chimney (more of it in autumn and winter, when the fires are lit all day)
  const sm = S >= 2 ? .6 : .42, nk = S >= 2 ? 9 : 6;
  if (PH_HUMOS) { PH_HUMOS.push([chx, chy - 36, sm, nk]); return; }   // (keeping it as an image: the smoke is drawn live over it)
  for (let k = 0; k < nk; k++) { const q = ((t * .22 + k / nk) % 1), sx = chx + Math.sin(q * 6 + k) * 6 + q * 22, sy = chy - 36 - q * 70; ell(c, sx, sy, 5 + q * 12, 4 + q * 9, `rgba(245,245,240,${sm * (1 - q)})`); }
}
function drawBarn(c, o){
  const x = o.x, y = o.y, w = BARN.w, h = 64;
  ell(c, x + 16, y + 4, w / 2 + 24, 12, 'rgba(30,40,20,.24)');
  blob(c, [[x - w / 2, y], [x + w / 2, y], [x + w / 2, y - h], [x - w / 2, y - h]], '#b5523c');
  c.strokeStyle = 'rgba(80,30,20,.3)'; c.lineWidth = 1; for (let xx = x - w / 2 + 8; xx < x + w / 2; xx += 8) { c.beginPath(); c.moveTo(xx, y - h + 2); c.lineTo(xx, y - 1); c.stroke(); }
  blob(c, [[x - 24, y], [x - 24, y - 44], [x + 24, y - 44], [x + 24, y]], '#8f3f2e');
  line(c, [[x - 24, y - 44], [x + 24, y]], '#f1e6d4', 2.4); line(c, [[x + 24, y - 44], [x - 24, y]], '#f1e6d4', 2.4);
  blob(c, [[x - w / 2 - 10, y - h + 4], [x + w / 2 + 10, y - h + 4], [x + w / 2 - 10, y - h - 66], [x - w / 2 + 10, y - h - 66]], '#6f6a66');
  if (S === 3) blob(c, [[x - w / 2 + 10, y - h - 66], [x + w / 2 - 10, y - h - 66], [x + w / 2 - 2, y - h - 36], [x + 20, y - h - 30], [x - 30, y - h - 34], [x - w / 2 + 2, y - h - 30]], '#f6f8fb');
}
function drawProp(c, o, t, night){
  if (CACHE_ON && c === G0 && !CACHE.dentro && cacheProp(c, o, t, night)) return;   // (kept as an image: see 66-cache-dibujos.js)
  if (o.kind === 'house') { drawHouse(c, o, t, night); if (o.style) drawSteeple(c, o); }
  else if (o.kind === 'edificio') drawBuilding(c, o.b, t, night);
  else if (o.kind === 'covered') { const x = o.x, y = o.y; ell(c, x + 8, y + 2, 60, 10, 'rgba(30,40,20,.22)'); blob(c, [[x - 56, y], [x + 56, y], [x + 56, y - 42], [x - 56, y - 42]], '#a8463a'); blob(c, [[x - 30, y], [x + 30, y], [x + 30, y - 30], [x - 30, y - 30]], '#3a2a24'); blob(c, [[x - 62, y - 40], [x + 62, y - 40], [x + 52, y - 66], [x - 52, y - 66]], '#5a4a44'); for (let k = -50; k <= 50; k += 10) line(c, [[x + k, y - 2], [x + k, y - 40]], 'rgba(60,25,20,.35)', .8, k); }
  else if (o.kind === 'rail') { line(c, [[o.x - 14, o.y - 6], [o.x + 14, o.y - 6]], '#5a5a62', 1.8, 1); line(c, [[o.x - 14, o.y + 6], [o.x + 14, o.y + 6]], '#5a5a62', 1.8, 2); blob(c, [[o.x - 3, o.y - 10], [o.x + 3, o.y - 10], [o.x + 3, o.y + 10], [o.x - 3, o.y + 10]], '#7a5a3e', false); }
  else if (o.kind === 'granja') drawHouse(c, { h: { x: o.x, y: o.y, w: 4.4 * T }, roof: ['#8a5a3c', '#5f7a9a', '#7a6a4a'][Math.floor(o.x / 7) % 3], wall: '#efe4cc', trim: '#6a4a32', x: o.x, y: o.y, small: true }, t, night);
  else if (o.kind === 'faro') { const x = o.x, y = o.y; ell(c, x + 8, y + 2, 20, 6, 'rgba(30,40,20,.22)'); blob(c, [[x - 12, y], [x + 12, y], [x + 7, y - 90], [x - 7, y - 90]], '#f6f2e8'); for (let k = 0; k < 3; k++) blob(c, [[x - 11 + k * 1.6, y - 20 - k * 26], [x + 11 - k * 1.6, y - 20 - k * 26], [x + 10 - k * 1.6, y - 32 - k * 26], [x - 10 + k * 1.6, y - 32 - k * 26]], '#c8463a'); blob(c, [[x - 9, y - 90], [x + 9, y - 90], [x + 9, y - 102], [x - 9, y - 102]], night > .3 ? '#ffe7a8' : '#f5d58a'); blob(c, [[x - 11, y - 102], [x + 11, y - 102], [x, y - 114]], '#3a3436'); }
  else if (o.kind === 'barn') drawBarn(c, o);
  else if (o.kind === 'tree' || o.kind === 'oak' || o.kind === 'pine' || o.kind === 'apple' || o.kind === 'blossom' || o.kind === 'manzano') drawTree(c, o, t);
  else if (o.kind === 'bush') drawBush(c, o, t);
  else if (o.kind === 'fpost') { ell(c, o.x + 1, o.y + 1, 3.5, 1.5, 'rgba(30,40,20,.2)'); blob(c, [[o.x - 1.8, o.y], [o.x + 1.8, o.y], [o.x + 1.8, o.y - 17], [o.x - 1.8, o.y - 17]], '#9a7a56'); if (o.nx != null) { line(c, [[o.x, o.y - 13], [o.nx, o.ny - 13]], '#8a6a48', 1.8, o.x); line(c, [[o.x, o.y - 7], [o.nx, o.ny - 7]], '#8a6a48', 1.8, o.y); } if (S === 3) ell(c, o.x, o.y - 17.5, 2.4, 1.2, '#f6f8fb'); }
  else if (o.kind === 'post') { ell(c, o.x + 2, o.y + 1, 5, 2, 'rgba(30,40,20,.2)'); blob(c, [[o.x - 2, o.y], [o.x + 2, o.y], [o.x + 2, o.y - 18], [o.x - 2, o.y - 18]], '#f2ede2'); c.fillStyle = '#f2ede2'; c.fillRect(o.x - 12, o.y - 15, 24, 3); c.fillRect(o.x - 12, o.y - 8, 24, 3); }
  else if (o.kind === 'pump') {
    ell(c, o.x + 3, o.y + 1, 9, 3, 'rgba(30,40,20,.22)'); blob(c, [[o.x - 4, o.y], [o.x + 4, o.y], [o.x + 4, o.y - 26], [o.x - 4, o.y - 26]], '#4f7d47');
    line(c, [[o.x + 4, o.y - 22], [o.x + 12, o.y - 26]], '#3b5e36', 2.4); line(c, [[o.x - 4, o.y - 20], [o.x - 10, o.y - 18]], '#3b5e36', 2.4);
    if (!game.hasCan && !game.ground.some(it => it.k === 'can')) { blob(c, [[o.x + 8, o.y - 1], [o.x + 17, o.y - 1], [o.x + 16, o.y - 9], [o.x + 9, o.y - 9]], '#9db3bf'); line(c, [[o.x + 17, o.y - 6], [o.x + 22, o.y - 11]], 'rgba(70,90,100,.9)', 1.4); }
  }
  else if (o.kind === 'bench') { ell(c, o.x, o.y + 2, 22, 4, 'rgba(30,40,20,.2)'); blob(c, [[o.x - 20, o.y - 12], [o.x + 20, o.y - 12], [o.x + 20, o.y - 7], [o.x - 20, o.y - 7]], '#8a6040'); blob(c, [[o.x - 20, o.y - 22], [o.x + 20, o.y - 22], [o.x + 20, o.y - 18], [o.x - 20, o.y - 18]], '#8a6040'); c.fillStyle = '#6d4a30'; c.fillRect(o.x - 17, o.y - 12, 3, 12); c.fillRect(o.x + 14, o.y - 12, 3, 12); }
  else if (o.kind === 'bridge') { blob(c, [[o.x - 44, o.y - 30], [o.x + 44, o.y - 30], [o.x + 44, o.y], [o.x - 44, o.y]], '#a8814f'); for (let k = -40; k < 44; k += 10) line(c, [[o.x + k, o.y - 29], [o.x + k, o.y - 1]], 'rgba(90,60,35,.5)', .8, k); c.fillStyle = '#7a5536'; c.fillRect(o.x - 44, o.y - 34, 88, 3); c.fillRect(o.x - 44, o.y - 2, 88, 3); }
  else if (o.kind === 'roadsign') {   // (the road to Bright River leaves the map here)
    ell(c, o.x + 2, o.y + 1, 8, 2.5, 'rgba(30,40,20,.22)'); c.fillStyle = '#6a4630'; c.fillRect(o.x - 2, o.y - 34, 4, 34);
    c.font = 'italic 8px Georgia, serif'; const tw = c.measureText(o.text).width + 12;
    blob(c, [[o.x - 6, o.y - 40], [o.x + tw - 10, o.y - 40], [o.x + tw - 2, o.y - 34], [o.x + tw - 10, o.y - 28], [o.x - 6, o.y - 28]], '#e2c896');
    c.fillStyle = '#4a2f1c'; c.textAlign = 'left'; c.fillText(o.text, o.x - 1, o.y - 31.5);
  }
  else if (o.kind === 'sign') {
    ell(c, o.x + 2, o.y + 1, 6, 2, 'rgba(30,40,20,.2)'); c.fillStyle = '#7a5536'; c.fillRect(o.x - 1.5, o.y - 20, 3, 20);
    c.font = 'italic 8px Georgia, serif'; const T = conNombres(o.text), tw = c.measureText(T).width + 10;
    blob(c, [[o.x - tw / 2, o.y - 30], [o.x + tw / 2, o.y - 30], [o.x + tw / 2, o.y - 18], [o.x - tw / 2, o.y - 18]], '#d9bf8f');
    c.fillStyle = '#4a2f1c'; c.textAlign = 'center'; c.fillText(T, o.x, o.y - 21.5);
  }
}
function drawBed(c, b, t){
  // the plants of a garden bed: seed, sprout, leaves, flowers; wet earth darker
  // in winter the garden sleeps under the snow
  if (S === 3) { ell(c, b.x, b.y - 2, 19, 9, '#f6f8fb', 'rgba(140,150,170,.6)'); return; }
  if (b.wet) { c.fillStyle = 'rgba(60,40,25,.35)'; c.beginPath(); c.ellipse(b.x, b.y, 20, 13, 0, 0, TAU); c.fill(); }
  const [col] = FLOWER_KINDS[b.kind];
  for (let k = 0; k < 5; k++) {
    const px = b.x - 13 + (k % 3) * 13 + (k > 2 ? 6 : 0), py = b.y - 6 + (k > 2 ? 9 : 0), sw = Math.sin(t * 1.6 + k + b.x) * 1;
    if (b.stage >= 1) line(c, [[px, py], [px + sw, py - 3 - b.stage * 3]], '#4f8a3c', 1.3, k);
    if (b.stage >= 2) { ell(c, px - 2.4 + sw, py - 3 - b.stage, 2.4, 1.3, '#62a04b', true, -.5); ell(c, px + 2.4 + sw, py - 4 - b.stage, 2.4, 1.3, '#62a04b', true, .5); }
    if (b.stage >= 3) { for (let q = 0; q < 5; q++) { const a = q / 5 * TAU; ell(c, px + sw + Math.cos(a) * 2.2, py - 13 + Math.sin(a) * 1.6, 1.8, 1.4, col); } ell(c, px + sw, py - 13, 1.1, 1.1, '#f2c14e'); }
  }
}
