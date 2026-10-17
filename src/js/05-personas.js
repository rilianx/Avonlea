/* ---------- people ----------
   Each is drawn at its feet, about 46 to 54 pixels tall, from the front, the back or the side. */
const SKIN_LINE = 'rgba(150,90,60,.7)';
const ANA_STATES = {
  rasgado: { desc: 'tiene el vestido rasgado (se le enganchó en una cerca)' },
  despeinada: { desc: 'tiene el sombrero torcido y el pelo revuelto', fix: 'Arreglarme el sombrero' },
};
// lying on the grass on her back, hands behind her head, one knee up, looking at the clouds (head to the left).
// Seen from above and in front, like everything: the face looks up at us, the top of her head to the left.
function drawLying(c, p, t){
  const L = LOOKS[p.look], x = p.x, y = p.y, br = Math.sin(t * 1.5 + x) * .5, shoe = '#5b3a28';
  c.save(); c.translate(x, y); c.scale(L.h, L.h);
  // the pressed grass and a soft shadow
  ell(c, 1, 3, 37, 10.5, 'rgba(40,70,30,.24)'); ell(c, -2, 2, 30, 7, 'rgba(40,70,30,.14)');
  // hair spread on the grass: Ana's braids (with their red ribbons), Diana's curls
  const braid = (pts, k) => { line(c, pts, L.hair, 3.6, 7 + k); const [ex, ey] = pts[pts.length - 1]; c.strokeStyle = L.hairD; c.lineWidth = .8; for (let s = 1; s < pts.length; s++) { const [ax, ay] = pts[s - 1], [bx, by] = pts[s]; for (let q = .25; q < 1; q += .35) { const sx = lerp(ax, bx, q), sy = lerp(ay, by, q); c.beginPath(); c.moveTo(sx - 1.3, sy - 1.2); c.lineTo(sx + 1.3, sy + 1); c.stroke(); } } ell(c, ex, ey, 2, 1.4, '#d9433b', true); };
  if (L.style === 'braids') { braid([[-27, -9], [-20, -16], [-10, -18.5], [-3, -17]], 0); braid([[-27, 3], [-20, 9], [-11, 11.5], [-4, 11]], 1); }
  if (L.style === 'curls') for (let k = 0; k < 7; k++) { const a = Math.PI * (.5 + k * .17), r = 9.6; ell(c, -25 + Math.cos(a) * r, -2.5 - Math.sin(a) * r, 2.6, 2.3, L.hair, k % 2 ? true : false); }
  // the far arm, bent behind her head (elbow up on the grass)
  const limb = (pts, col, w) => { if (col === L.skin) { c.strokeStyle = SKIN_LINE; c.lineWidth = w + 1.1; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); pts.forEach(([px, py], i) => i ? c.lineTo(px, py) : c.moveTo(px, py)); c.stroke(); }
    c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); pts.forEach(([px, py], i) => i ? c.lineTo(px, py) : c.moveTo(px, py)); c.stroke(); };
  limb([[-15, -6], [-22, -14]], L.dressD, 3.6); limb([[-22, -14], [-29, -8]], L.skin, 2.8);
  // legs: the far one stretched out, the near one with the knee up
  limb([[12, -3], [29, -4.5]], L.skin, 2.5); ell(c, 32, -5, 3.3, 2.2, shoe, true);
  limb([[11, 1], [16.5, -11], [26, 1.5]], L.skin, 2.7); ell(c, 29, 1.8, 3.4, 2.4, shoe, true);
  // the skirt, draped over the raised knee, with its hem and a bit of petticoat
  blob(c, [[-4, -7.5 - br * .3], [5, -9], [11, -13.5], [15.5, -15.5], [19, -13], [20.5, -6], [21.5, 4], [10, 6.5], [-4, 6.5]], L.dress);
  blob(c, [[19, -13], [20.5, -6], [21.5, 4], [19.6, 4], [18.6, -6], [17.4, -12.6]], L.dressD, false);
  blob(c, [[21.5, 4], [22.7, -1], [21.8, -6.5], [20.5, -6]], 'rgba(255,252,245,.9)', false);
  line(c, [[9, -6], [13.5, -2], [14, 4]], 'rgba(70,42,26,.28)', .8, 2);   // (a fold in the skirt)
  // the bodice (it rises and falls as she breathes), puffed sleeves, the collar
  blob(c, [[-18, -7 - br], [-4, -7.5 - br * .4], [-3, 6.5], [-18, 6.5 + br * .3]], L.dress);
  c.fillStyle = L.dressD; c.fillRect(-5, -7.4, 1.6, 13.6);
  ell(c, -15.5, -7.4 - br * .5, 4.4, 3, L.dress, true); ell(c, -15.5, 6.6, 4.4, 3, L.dress, true);
  blob(c, [[-19.5, -5.5], [-15, -4], [-14, 0], [-15, 4], [-19.5, 5.5]], L.collar || L.dressD);
  if (L.brooch) ell(c, -16, 0, 1.2, 1.2, '#d9a441', true);
  // the near arm, bent too, its elbow towards us
  limb([[-15, 6], [-22, 12.5]], L.dressD, 3.8); limb([[-22, 12.5], [-29, 3]], L.skin, 2.8);
  // her head: the front of the face, turned so the top of her head points left
  c.save(); c.translate(-25, -2.5); c.rotate(-Math.PI / 2);
  ell(c, 0, -1.2, 8.9, 9, L.hair, true);
  ell(c, 0, .6, 7.8, 8.1, L.skin, SKIN_LINE);
  if (L.style === 'bun') blob(c, [[-8.4, 1], [-7.4, -5.5], [0, -9], [7.4, -5.5], [8.4, 1], [5, -3.6], [0, -6], [-5, -3.6]], L.hair);
  else blob(c, [[-8.4, 2], [-7.8, -5.6], [-3, -9], [3, -9], [7.8, -5.6], [8.4, 2], [6, -2.6], [2, -4], [-1, -2.6], [-5, -4]], L.hair);
  // eyes: open most of the time, looking up at the sky, now and then closed, dreaming
  const dreaming = Math.sin(t * .35 + x * .01) > .55, open = !dreaming && p.blink <= 0;
  for (const ex of [-3.1, 3.1]) {
    if (open) { ell(c, ex, 1.4, 1.25, 1.7, '#3a2418'); ell(c, ex + .4, .7, .45, .55, '#fff'); }
    else { c.strokeStyle = '#3a2418'; c.lineWidth = .8; c.beginPath(); c.arc(ex, .9, 1.4, .25 * Math.PI, .75 * Math.PI); c.stroke(); }
  }
  ell(c, -4.8, 4.2, 1.9, 1.1, 'rgba(240,120,110,.4)'); ell(c, 4.8, 4.2, 1.9, 1.1, 'rgba(240,120,110,.4)');
  if (L.freckles) for (const [fx, fy] of [[-4.4, 3.2], [-3, 3.8], [-5.5, 3.7], [4.4, 3.2], [3, 3.8], [5.5, 3.7], [0, 3.1]]) ell(c, fx, fy, .35, .35, 'rgba(150,80,50,.55)');
  line(c, [[-1.6, 5.4], [0, 6.4], [1.6, 5.4]], '#b5604c', .85);
  if (L.bow) { ell(c, -4.6, -8.2, 2.6, 1.8, L.bow, true); ell(c, -1.2, -8.8, 2.6, 1.8, L.bow, true); }
  c.restore();
  // Ana's straw hat, put down on the grass beside her
  if (L.hat) { ell(c, -40, 9, 9, 3.6, '#ecd08a', true); ell(c, -40, 7.2, 5, 2.8, '#ecd08a', true); line(c, [[-44.6, 7.8], [-35.4, 7.8]], '#d9433b', 1.4); line(c, [[-35.4, 7.8], [-31, 10.5 + Math.sin(t * 2) * .6]], '#d9433b', 1.1); }
  // a few blades of grass in front, so that she lies in it and not on it
  if (S !== 3 && drawingOut) { c.strokeStyle = S === 2 ? 'rgba(150,120,50,.7)' : 'rgba(70,115,45,.75)'; c.lineWidth = .9; c.beginPath(); for (let k = 0; k < 14; k++) { const gx = -36 + k * 5.2 + (k % 3), gy = 9 + (k % 2) * 1.5; c.moveTo(gx, gy); c.lineTo(gx + 1 + (k % 2), gy - 3.5 - (k % 3)); } c.stroke(); }
  c.restore();
}