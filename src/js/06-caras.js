/* ---------- faces, in the manner of the anime (Ghibli, the World Masterpiece Theater «Ana»): a few templates, and each
   character takes one and changes what makes it theirs (the colour of the eyes, the shape of the brows, the mouth).
   Eyes: the white, a big coloured iris, the pupil, a glint; a dark upper lid (with a flick of lashes for the girls).
   Templates: niña, niño, mujer, hombre, anciana, anciano (picked from the look: size, coat or beard, grey hair). ---------- */
const FACE_T = {
  nina: { ew: 1.95, eh: 2.15, lash: 1, brow: 'arco', bw: .42, mouth: .85, blush: .32, chin: 1 },
  nino: { ew: 1.75, eh: 1.95, lash: 0, brow: 'arco', bw: .6, mouth: .9, blush: .22, chin: .9 },
  mujer: { ew: 1.45, eh: 1.55, lash: .6, brow: 'arco', bw: .42, mouth: .85, blush: .2, chin: .9 },
  hombre: { ew: 1.25, eh: 1.35, lash: 0, brow: 'recta', bw: .8, mouth: .9, blush: .1, chin: .6 },
  anciana: { ew: 1.25, eh: 1.25, lash: .3, brow: 'arco', bw: .45, mouth: .8, blush: .16, arrugas: true, chin: .7 },
  anciano: { ew: 1.1, eh: 1.15, lash: 0, brow: 'recta', bw: .85, mouth: .85, blush: .1, arrugas: true, chin: .5 },
};
// what is each one's own (by look: 'ana', a character, or 'f:' and one of the village)
const FACE_OF = {
  ana: { iris: '#6f8ea0', ew: 2.15, eh: 2.35, brow: 'viva' }, diana: { iris: '#2e2018', ew: 1.8 }, marilla: { brow: 'severa', mouth: .8, labios: 'finos', iris: '#58646c' },
  matthew: { brow: 'timida', iris: '#6c7c8a' }, lynde: { brow: 'alzada', iris: '#4a3a2c' }, barry: { brow: 'severa' }, harrison: { brow: 'severa' },
  'f:gilbert': { iris: '#6a4a2a', brow: 'segura' }, 'f:josie': { brow: 'alzada' }, 'f:ruby': { iris: '#5a7aa8' }, 'f:phillips': { brow: 'severa' }, 'f:sraallan': { iris: '#6a8aa8' },
};
const greyish = h => { const n = parseInt(h.slice(1), 16), r = n >> 16, g = n >> 8 & 255, b = n & 255; return Math.max(r, g, b) - Math.min(r, g, b) < 24 && r > 120; };
function faceOf(look, L){
  if (L._face) return L._face;
  const kid = L.h <= 1.02, man = !!(L.coat || L.beard || L.hatDark), old = L.style === 'old' || greyish(L.hair);
  const tpl = kid ? (man ? 'nino' : 'nina') : old ? (man ? 'anciano' : 'anciana') : man ? 'hombre' : 'mujer';
  return (L._face = { iris: '#5a3a28', ...FACE_T[tpl], tpl, ...(FACE_OF[look] || {}) });
}
// the brows: [inner end, outer end] heights over the eye, and how much they arch
const BROWS = { arco: [1.1, 1, .8], recta: [1, 1, .3], viva: [1.2, 1.1, 1], severa: [.45, 1.5, .25], timida: [2, .8, .5], alzada: [1.5, 1.4, 1.2], segura: [.8, 1.2, .4] };
function drawEye(c, F, cx, cy, wf, o, lk, open, L){   // (o: +1 the right eye, −1 the left: which way its outer corner is)
  const ew = F.ew * wf, eh = F.eh, ink = '#2a1a12';
  // the brow
  const [bi, bo, ba] = BROWS[F.brow] || BROWS.arco, by = cy - eh - 1.5;   // (thin, and set high)
  c.strokeStyle = L.hairD; c.lineWidth = F.bw; c.lineCap = 'round'; c.beginPath(); c.moveTo(cx - o * ew * .9, by - bi + 1); c.quadraticCurveTo(cx, by - ba - .5, cx + o * ew * 1.15, by - bo + 1); c.stroke();
  if (!open) { c.strokeStyle = ink; c.lineWidth = .85; c.beginPath(); c.moveTo(cx - ew, cy + .2); c.quadraticCurveTo(cx, cy + eh * .55, cx + ew, cy + .2); c.stroke(); return; }
  ell(c, cx, cy, ew, eh, '#fffdf8'); c.strokeStyle = 'rgba(90,55,40,.5)'; c.lineWidth = .3; c.beginPath(); c.ellipse(cx, cy, ew, eh, 0, 0, TAU); c.stroke();
  const ix = cx + lk * .6, iy = cy + eh * .06, ir = ew * .68, jr = eh * .68;
  ell(c, ix, iy, ir, jr, F.iris);
  ell(c, ix, iy + jr * .35, ir * .7, jr * .45, 'rgba(255,255,255,.22)');   // (lighter below)
  c.strokeStyle = 'rgba(30,25,25,.75)'; c.lineWidth = .35; c.beginPath(); c.ellipse(ix, iy, ir, jr, 0, 0, TAU); c.stroke();   // (the darker ring)
  ell(c, ix, iy, ir * .38, jr * .38, '#1a1414');
  ell(c, ix - ir * .4, iy - jr * .42, ir * .3 + .1, jr * .3 + .1, '#fff'); ell(c, ix + ir * .45, iy + jr * .4, ir * .12 + .05, jr * .12 + .05, 'rgba(255,255,255,.8)');
  // the upper lid, dark and a little heavier at the outer corner; the lashes flick out (the girls)
  c.strokeStyle = 'rgba(58,34,24,.9)'; c.lineWidth = .5 + F.lash * .1; c.beginPath(); c.moveTo(cx - o * ew * .95, cy - eh * .2); c.quadraticCurveTo(cx - o * ew * .1, cy - eh * 1.25, cx + o * ew, cy - eh * .3); c.stroke();
  if (F.lash > .5) { c.lineWidth = .4; c.beginPath(); c.moveTo(cx + o * ew * .95, cy - eh * .32); c.lineTo(cx + o * (ew + .45), cy - eh * .5); c.stroke(); }   // (only a hint of lashes)
  if (F.arrugas) { c.strokeStyle = 'rgba(120,70,50,.45)'; c.lineWidth = .4; for (const k of [-1, 1]) { c.beginPath(); c.moveTo(cx + o * (ew + .5), cy + k * .5); c.lineTo(cx + o * (ew + 1.4), cy + k * .9); c.stroke(); } }
}
function drawBeard(c, L, hy, side, sh, p, t, F){
  const strands = (pts) => { c.strokeStyle = L.hairD; c.lineWidth = .4; c.globalAlpha = .55; for (const [a, b, e, f] of pts) { c.beginPath(); c.moveTo(a, b); c.lineTo(e, f); c.stroke(); } c.globalAlpha = 1; };
  if (side) {
    blob(c, [[-.5, hy + 1.5], [1, hy + 5], [3, hy + 8.2], [5.4, hy + 9.6], [6.6, hy + 8.8], [7.8, hy + 9.2], [8.2, hy + 6.6], [6.8, hy + 6.9], [5, hy + 7], [3, hy + 5.4], [1.6, hy + 2]], L.hair, false);
    strands([[2, hy + 5, 2.6, hy + 7], [4, hy + 7.4, 4.4, hy + 9], [6, hy + 8, 6.2, hy + 9.2]]);
    drawMouth(c, F, 6.4, hy + 5.8, p, t, .45); ell(c, 6.7, hy + 4.9, 1.6, .85, L.hair, false, .15); return;
  }
  blob(c, sh([[-7.9, hy + 1.2], [-7.6, hy + 6], [-5.4, hy + 9.6], [-3.4, hy + 11.6], [-1.6, hy + 10.8], [0, hy + 12.6], [1.6, hy + 10.8], [3.4, hy + 11.6], [5.4, hy + 9.6], [7.6, hy + 6], [7.9, hy + 1.2], [6.3, hy + 3], [4.6, hy + 5.8], [2.4, hy + 7.6], [0, hy + 7.9], [-2.4, hy + 7.6], [-4.6, hy + 5.8], [-6.3, hy + 3]]), L.hair, false);
  strands([[-5.6, hy + 6, -5, hy + 8.4], [-2.6, hy + 8.6, -2.2, hy + 10.4], [0, hy + 9, 0, hy + 11.2], [2.6, hy + 8.6, 2.2, hy + 10.4], [5.6, hy + 6, 5, hy + 8.4]].map(([a, b, e, f]) => sh([[a, b], [e, f]]).flat()));
  const [mx] = sh([[0, 0]])[0];
  drawMouth(c, F, mx, hy + 6.6, p, t, .6);
  for (const k of [-1, 1]) ell(c, mx + k * 1.5, hy + 5.1, 1.9, .95, L.hair, false, k * .18);   // (the moustache, over the lip)
}
// the faces: 'simple' (the first ones: dot eyes, a little smile; the default) or 'anime' (templates with irises, lids, brows)
const FACE_STYLE = /caras=anime/.test(location.search) ? 'anime' : 'simple';
function headShape(c, L, hy, d, tq, F){
  const ch = 1.6 + 1.4 * F.chin, fo = tq && d === 2 ? 1 : 0;
  c.beginPath();
  if (d === 1 || d === 3) {   // (profile, facing right: forehead, nose, a small chin, the jaw back to the ear)
    c.ellipse(0, hy, 8.2, 8.6, 0, Math.PI * .62, Math.PI * 2.08);
    c.quadraticCurveTo(8.6, hy + 1.6, 8.9, hy + 2.6); c.lineTo(8.1, hy + 3.4); c.quadraticCurveTo(7.8, hy + 6.4, 6.4, hy + 7.6 + ch * .3); c.quadraticCurveTo(3, hy + 9 + ch * .3, -1.5, hy + 7.6);
  } else {
    c.ellipse(0, hy, 8.2, 8.6, 0, Math.PI * .92, Math.PI * 2.08);
    c.quadraticCurveTo(8.3, hy + 5, 4.4 + fo, hy + 8.2 + ch * .5); c.quadraticCurveTo(fo, hy + 9.4 + ch, -4.4 + fo * 1.4, hy + 8.2 + ch * .5); c.quadraticCurveTo(-8.3 + fo * 1.2, hy + 5, -8.1, hy + 1.6);
  }
  c.closePath(); c.fillStyle = L.skin; c.fill();
  if (L.pencil) { c.strokeStyle = INK; c.lineWidth = .75; c.stroke(); c.save(); c.translate(.35, .25); c.strokeStyle = 'rgba(70,42,26,.35)'; c.lineWidth = .45; c.stroke(); c.restore(); }   // (pencil: a line, and a second lighter one a little off)
  else { c.strokeStyle = 'rgba(140,80,55,.75)'; c.lineWidth = .55; c.stroke(); }
}
const isTalking = p => bubbles.some(b => b.t < b.dur && personOf(b.q) === p);
function drawMouth(c, F, mx, my, p, t, wf = 1){
  const w = 1.4 * F.mouth * wf;
  if (isTalking(p)) { const o = .55 + Math.abs(Math.sin(t * 13)) * .75; ell(c, mx, my + .2, w * .75, o, '#7a2c26'); ell(c, mx, my + .2 + o * .45, w * .45, o * .4, '#d8746a'); return; }
  c.strokeStyle = F.labios === 'finos' ? '#9a5a4a' : '#b5604c'; c.lineWidth = .8; c.lineCap = 'round'; c.beginPath();
  if (F.labios === 'finos') { c.moveTo(mx - w * .8, my + .3); c.lineTo(mx + w * .8, my + .3); }
  else { c.moveTo(mx - w, my); c.quadraticCurveTo(mx, my + 1.2, mx + w, my); }
  c.stroke();
  if (F.arrugas) { c.strokeStyle = 'rgba(120,70,50,.35)'; c.lineWidth = .45; for (const k of [-1, 1]) { c.beginPath(); c.moveTo(mx + k * (w + 1.6), my - 2.2); c.quadraticCurveTo(mx + k * (w + 2.2), my - .6, mx + k * (w + 1.4), my + .8); c.stroke(); } }
}