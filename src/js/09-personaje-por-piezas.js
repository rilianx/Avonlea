/* ---------- a character in separate pieces (tools/trace_kit.py): a body without a head (that could be another one's),
   a head with its neck (with its expressions), arms straight and bent, a braid, the hat; and whole poses (sitting,
   crouching, lying, running). The head sits on the body's neck; the face blinks and talks over its own drawing. ---------- */
// walking, frame by frame, as a video model drew her (tools/trace_video.py): a cycle per view; standing, its quietest frame
let ANIM_ON = true;
// Ana's drawing: 'mano' (in code, a big head in pencil with the anime's features; the body as always), 'video' (traced
// from a video), 'hojas' (traced from the sheets), 'codigo' (the first drawing in code)
let ANA_STYLE = (location.search.match(/ana=(video|mano|hojas|codigo)/) || [, VEC_ON ? 'video' : 'codigo'])[1];   // (the default: the drawing in code; ?ana=video etc. to choose)
// big heads for everyone (as in the anime's chibi moments): the drawn in code ones scale their head about the neck; the
// traced from video ones are warped (above the neck, bigger; a little below, blending in). ?cabezas=0 for the plain ones
// HEAD_M: how many times a real (anime) head; the 🙂 slider in the game, or ?cabezas=N. The drawn in code ones already
// have a head about twice a real one, so they get HEAD_M / 2 (never smaller than theirs)
let HEAD_M = (() => { const q = location.search.match(/cabezas=([\d.]+)/); if (q) return +q[1] || 1; try { const v = +localStorage.getItem('avonlea-cabezas2'); if (v >= 1) return v; } catch (e) {} return 1; })();
const setHeadM = v => { HEAD_M = clamp(+v || 1, 1, 5); try { localStorage.setItem('avonlea-cabezas2', HEAD_M); } catch (e) {} };
const NECK = -345, NECK_BAND = 26;   // (the neck on the video figures, in their units ×10: below it nothing changes; over the band above it (the chin) it grows to the full size)
const bigCache = new WeakMap();
function bigAnim(A){
  let B = bigCache.get(A); if (B && B._m === HEAD_M) return B;
  const BIG_KV = HEAD_M;
  const warpFrame = fr => {
    const abs = fr.map(ly => ({ c: ly.c, p: ly.p.map(q => { if (!A.delta) return q.slice(); const o = [q[0], q[1]]; let x = q[0], y = q[1]; for (let i = 2; i < q.length; i += 2) o.push(x += q[i], y += q[i + 1]); return o; }) }));
    let sx = 0, n = 0; for (const ly of abs) for (const q of ly.p) for (let i = 0; i < q.length; i += 2) if (q[i + 1] < NECK) { sx += q[i]; n++; }
    const cx = n ? sx / n : 0;   // (the head's middle, this frame)
    for (const ly of abs) for (const q of ly.p) for (let i = 0; i < q.length; i += 2) {
      const u = NECK - q[i + 1]; if (u <= 0) continue;   // (height above the neck; the size grows smoothly over the band, so the outline doesn't break)
      const b = NECK_BAND, k = u < b ? 1 + (BIG_KV - 1) * u / b : BIG_KV, uu = u < b ? u + (BIG_KV - 1) * u * u / (2 * b) : b + (BIG_KV - 1) * b / 2 + BIG_KV * (u - b);
      q[i] = cx + (q[i] - cx) * k; q[i + 1] = NECK - uu;
    }
    return abs;
  };
  const views = {}; for (const [v, V] of Object.entries(A.views)) views[v] = { ...V, stand: warpFrame(V.stand), walk: V.walk.map(warpFrame) };
  B = { ...A, delta: 0, views, _m: HEAD_M }; bigCache.set(A, B); return B;
}
const tracedOK = (look, kind) => VEC_ON && (look === 'ana' ? ANA_STYLE === kind : kind !== 'video' || ANIM_ON);
// the same drawings for others, recoloured: which traced one each takes, and which of its colours are hair and dress
// (the rest, skin, apron, boots, eyes, line, stay). The look of each one gives the new colours.
const ANIM_SLOTS = { ana: { hair: 3, hairD: 8, dress: 2, dressD: 4 } };
const ANIM_LIKE = { 'f:ruby': 'ana', 'f:jane': 'ana', 'f:josie': 'ana' };
const animCache = {};
const shadeHex = (h, f) => '#' + [1, 3, 5].map(i => Math.round(parseInt(h.slice(i, i + 2), 16) * f).toString(16).padStart(2, '0')).join('');
function animOf(look){
  if (CANIM[VEC_LOOK[look]]) return CANIM[VEC_LOOK[look]];
  const base = ANIM_LIKE[look]; if (!base || !CANIM[base]) return null;
  if (!animCache[look]) {
    const A = CANIM[base], S_ = ANIM_SLOTS[base], L = LOOKS[look], pal = A.pal.slice();
    pal[S_.hair] = L.hair; pal[S_.hairD] = shadeHex(L.hairD || L.hair, .78); pal[S_.dress] = L.dress; pal[S_.dressD] = shadeHex(L.dressD || L.dress, .8);
    animCache[look] = { ...A, pal };
  }
  return animCache[look];
}
function animDraw(c, p, t){
  let A = tracedOK(p.look, 'video') && animOf(p.look); if (!A || p.sit || p.lie || p.crouch) return false; if (HEAD_M > 1) A = bigAnim(A);
  const q8 = facing8(p), flip = q8 >= 5, vi = flip ? 8 - q8 : q8, V = A.views[VEC_VIEW[vi]], L = LOOKS[p.look]; if (!V) return false;
  braidFlick(p, t, 2);   // (only for its measure of speed)
  const fr = p.moving ? V.walk[Math.floor((((p.walk || 0) % 1) + 1) % 1 * V.walk.length)] : V.stand;
  if (!p.noShadow) ell(c, p.x, p.y, 11 * L.h, 4, 'rgba(30,40,20,.26)');
  c.save(); c.translate(p.x, p.y); const k = L.h * .1; c.scale(k * (flip ? -1 : 1), k); rigLayers(c, A, fr, A.delta ? rigPathD : rigPath); c.restore(); return true;
}
function kitDraw(c, p, t){
  const K = tracedOK(p.look, 'hojas') && CKIT[VEC_LOOK[p.look]]; if (!K) return false;
  const q8 = facing8(p), flip = q8 >= 5, vi = flip ? 8 - q8 : q8, view = VEC_VIEW[vi], L = LOOKS[p.look], B = K.body[view], Hd = K.head[view];
  const d = vi === 0 || vi === 1 ? 0 : vi === 2 ? 1 : 2, fl = braidFlick(p, t, d), side = vi === 2, fb = vi === 0 || vi === 4;
  const run = clamp(((p._spd || 0) - 34) / 46, 0, 1);
  if (!p.noShadow) ell(c, p.x, p.y, (p.lie ? 22 : 11) * L.h, 4, 'rgba(30,40,20,.26)');
  c.save(); c.translate(p.x, p.y); const k = L.h * .1; c.scale(k * (flip ? -1 : 1), k);
  // whole poses: lying (from the side), sitting, crouching, running fast
  const pose = p.lie ? 'acostada' : p.sit ? 'sentada' : p.crouch ? 'agachada' : p.moving && run > .75 ? 'corriendo' : null;
  if (pose && K.pose[pose]) {
    const P = K.pose[pose], sv = p.lie || side || !P.frente ? 'perfil' : 'frente';
    if (pose === 'corriendo') c.translate(0, -Math.abs(Math.sin(p.walk * TAU)) * 22);
    if (p.lie) c.translate(0, 30);
    rigLayers(c, K, P[sv]); c.restore(); return true;
  }
  const w = p.moving ? Math.sin(p.walk * TAU) : 0, bob = p.moving ? -Math.abs(w) * 12 : Math.sin(t * 2 + p.x) * 2.5;
  const out = run * 1.05, b2 = Math.sin(p.walk * TAU), wind = Math.sin(t * 1.3) * .6 + Math.sin(t * 3.1) * .3;
  const lift = [Math.max(0, w), Math.max(0, -w)];
  ['footL', 'footR'].forEach((f, i) => { c.save(); if (fb) c.translate(0, -lift[i] * 26); else c.translate((i ? -w : w) * 28, -lift[i] * 14); rigLayers(c, K, B[f]); c.restore(); });
  c.translate(0, bob);
  const [nx, ny] = B.neck;
  // the braid gesture: the bent arm goes up (and down again); where its fist is, the braid's end is
  const ease = g => g * g * (3 - 2 * g), raise = fl >= 0 ? -1.9 * (fl < .45 ? ease(fl / .45) : fl < .7 ? 1 : 1 - ease((fl - .7) / .3)) : 0;
  let hand = null;
  if (fl >= 0) { const A_ = K.arm[fb ? 'doblado_frente' : 'doblado_lado'], [hx0, hy0] = A_.hand, [sx, sy] = B.sh[1], cs = Math.cos(raise), sn = Math.sin(raise); hand = [sx + hx0 * cs - hy0 * sn, sy + hx0 * sn + hy0 * cs]; }
  const drawArm = (i, ang) => {
    const [sx, sy] = B.sh[i]; let arm = K.arm[fb ? 'recto_frente' : 'recto_lado'];
    c.save(); c.translate(sx, sy);
    if (fl >= 0 && i === 1) { arm = K.arm[fb ? 'doblado_frente' : 'doblado_lado']; ang = raise; }   // (bent, raised: the hand up at the braid)
    c.rotate(ang); if (fb && i === 0) c.scale(-1, 1); rigLayers(c, K, arm.l); c.restore();
  };
  const swing = p.moving ? w * .35 : Math.sin(t * 1.1 + p.x) * .03;
  const braid = (i, th) => {
    const x0 = nx + Hd.br[i][0], y0 = ny + Hd.br[i][1], len = K.braid.len, sn = Math.sin(th), cs = Math.cos(th), sway = (wind + (p.moving ? w : 0)) * 14 * Math.max(.2, cs);
    if (fl >= 0 && i === (side ? 0 : 1) && fl < .62) { const [hx, hy] = hand; rigBraid(c, K, x0, y0, (x0 + hx) / 2 + 20, (y0 + hy) / 2 + 30, hx, hy); return; }
    rigBraid(c, K, x0, y0, x0 + sn * len * .5, y0 + cs * len * .5 + Math.abs(sn) * len * .22, x0 + sn * len + sway, y0 + cs * len);
  };
  const flung = fl >= .62 ? (fl - .62) / .38 : -1, thL = -out * (1 + .25 * b2), thR = out * (1 - .25 * b2);
  const thFl = flung >= 0 ? (side ? -1 : 1) * lerp(1.62, .9, flung * flung) : null;
  // the head (an expression from the front, if she has one now), its eyes closing, its mouth talking
  const ex = vi === 4 && p.face && K.expr[p.face], HL = ex ? ex.l : Hd.l, MK = ex ? ex.marks : Hd.marks;
  const head = () => {
    c.save(); c.translate(nx, ny); rigLayers(c, K, HL);
    if (MK) {
      const fill = (x, y, rx, ry, col) => { c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, TAU); c.fillStyle = col; c.fill(); };
      if (p.blink > 0) for (const [x, y, rx, ry] of MK.eyes) { fill(x, y, rx, ry, K.pal[3]); c.strokeStyle = K.line; c.lineWidth = Math.max(4, ry * .2); c.lineCap = 'round'; c.beginPath(); c.moveTo(x - rx * .8, y); c.quadraticCurveTo(x, y + ry * .55, x + rx * .8, y); c.stroke(); }
      if (isTalking(p) && MK.mouth) { let [x, y, rx, ry] = MK.mouth; const o = .45 + Math.abs(Math.sin(t * 13)) * .55; if (side) { x -= rx * .4; rx *= .55; ry = Math.min(ry, 6); }
        fill(x, y, rx + 3, ry + 3, K.pal[3]); fill(x, y + 2, rx * .8, (ry + 8) * o, '#9a3a32'); fill(x, y + 2 + (ry + 8) * o * .45, rx * .5, (ry + 8) * o * .45, '#e07a70'); }
    }
    if (L.hat && K.hat[view]) { c.translate(Hd.hat[0], Hd.hat[1] + 8); if (p.askew) c.rotate(-.32); c.scale(1.3, 1.3); rigLayers(c, K, K.hat[view].l); }   // (the hats came a little small for the head)
    c.restore();
  };
  if (!fb) drawArm(0, -swing);
  if (side) braid(0, thFl ?? -(out * (1.1 + .3 * Math.sin(p.walk * TAU * 2))) - .1);
  else if (p.braidBack && fl < 0 && vi >= 3) braid(1, thR);
  if (vi <= 1) { rigLayers(c, K, B.torso); if (fb) drawArm(0, swing); braid(0, thL); braid(1, thR); drawArm(1, -swing); head(); }   // (from behind: the braids on the back, the head over them)
  else {
    head(); rigLayers(c, K, B.torso);   // (the collar over the neck)
    if (fb) drawArm(0, swing);
    if (!side) { braid(0, thL); if (!(p.braidBack && fl < 0 && vi >= 3)) braid(1, thFl ?? thR); }
    drawArm(1, fl >= 0 ? 0 : -swing);
  }
  c.restore(); return true;
}
// eight ways of facing (0 up, 1 up-right, 2 right … 7 up-left): taken from the way one is going; standing, from the four
// that the rest of the game sets (dir: 0 up, 1 right, 2 down, 3 left). The diagonals are three-quarter views: the face
// (or the back of the head) turned a little, drawn facing right and mirrored for the left.
function facing8(p){
  if (p._fx != null) {
    const dx = p.x - p._fx, dy = p.y - p._fy, m = Math.hypot(dx, dy);
    if (m > .25 && m < 30 && p.moving) {
      const a = Math.atan2(dy, dx), q = ((Math.round(a / (Math.PI / 4)) + 2) % 8 + 8) % 8, cur = p.dir8 ?? q;
      const off = Math.abs(((a - (cur - 2) * Math.PI / 4) % TAU + TAU + Math.PI) % TAU - Math.PI);   // (a little stickiness: no flicker between two)
      if (off > Math.PI / 8 + .12) p.dir8 = q; else p.dir8 = cur;
    } else if (p.dir !== p._fd) p.dir8 = [0, 2, 4, 6][p.dir] ?? 4;
  } else p.dir8 = [0, 2, 4, 6][p.dir] ?? 4;
  p._fx = p.x; p._fy = p.y; p._fd = p.dir;
  if (!p.moving && p.dir8 % 2 === 0 && p.dir8 !== [0, 2, 4, 6][p.dir]) p.dir8 = [0, 2, 4, 6][p.dir] ?? 4;   // (turned on purpose to face someone)
  return p.dir8;
}
// Ana's gesture (from the anime): walking, or bending down, a braid falls forward over her shoulder; when she stops she
// takes it and throws it back with her hand. (braidBack: it is behind now; flick: the gesture, 1.1 s.)
function braidFlick(p, t, d){
  const dt = clamp(t - (p._bt ?? t), 0, .1); p._bt = t;
  if (dt > 0) { const m = p._bx == null ? 0 : Math.hypot(p.x - p._bx, p.y - p._by); p._spd = lerp(p._spd || 0, m < 40 ? m / dt : 0, .15); } p._bx = p.x; p._by = p.y;
  if (p.flick) { const g = (t - p.flick) / 1.1; if (g < 1 && !p.moving && !p.sit && d !== 0) return g; p.flick = 0; p.braidBack = g >= .6; }
  if (p.moving) { p._bw = (p._bw || 0) + dt; p._bstill = 0; if (p.braidBack && p._bw > 5 + (p.n || 0) % 3) { p.braidBack = false; p._bw = 0; } }   // (walking: it slips forward again)
  else if (p.crouch) p.braidBack = false;
  else if (!p.braidBack && !p.sit && !p.carry && d !== 0 && (p._bstill = (p._bstill || 0) + dt) > (p._bwait ??= .5 + Math.random() * 1.2)) { p.flick = t; p._bstill = 0; p._bwait = undefined; p._bw = 0; }
  return -1;
}
// where the hand is along the gesture: down by the side → at the braid → lifting it → over the shoulder → down again
function flickHand(g, side){
  const P = side ? [[1, -13], [4, -22], [5, -31], [-3, -34], [1, -13]] : [[7.5, -14], [7, -23], [9, -32], [4, -37], [7.5, -14]], T_ = [0, .28, .5, .66, 1];
  let i = 0; while (i < 3 && g > T_[i + 1]) i++; const k = (g - T_[i]) / (T_[i + 1] - T_[i]), e = k * k * (3 - 2 * k);
  return [lerp(P[i][0], P[i + 1][0], e), lerp(P[i][1], P[i + 1][1], e)];
}
// the head the image model drew (the sheets' kit), on a body drawn in code: with the game's pencil around it; it blinks,
// talks, makes faces, wears the hat, as in the kit
const KHS = 1;   // (the kit's head, at its own size: the big head scaling (HEAD_M) makes it bigger)
const kitBraidRoots = vi => { const H = CKIT.ana?.head[VEC_VIEW[vi]]; return H && H.br.map(([x, y]) => [x * .1 * KHS, -23.4 + y * .1 * KHS]); };
function kitHeadOn(c, p, t, vi, L){
  const K = CKIT.ana, view = VEC_VIEW[vi], Hd = K && K.head[view]; if (!Hd) return false;
  const ex = vi === 4 && p.face && K.expr[p.face], HL = ex ? ex.l : Hd.l, MK = ex ? ex.marks : Hd.marks;
  c.save(); c.translate(0, -23.4); c.scale(.1 * KHS, .1 * KHS);
  rigLayers(c, K, HL);
  const P = rigPath(HL[0]); c.strokeStyle = INK; c.lineWidth = 7; c.lineJoin = 'round'; c.stroke(P); c.translate(3, 2); c.strokeStyle = 'rgba(70,42,26,.35)'; c.lineWidth = 4; c.stroke(P); c.translate(-3, -2);   // (pencil around)
  if (MK) {
    const fill = (x, y, rx, ry, col) => { c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, TAU); c.fillStyle = col; c.fill(); };
    if (p.blink > 0) for (const [x, y, rx, ry] of MK.eyes) { fill(x, y, rx, ry, K.pal[3]); c.strokeStyle = K.line; c.lineWidth = Math.max(4, ry * .2); c.lineCap = 'round'; c.beginPath(); c.moveTo(x - rx * .8, y); c.quadraticCurveTo(x, y + ry * .55, x + rx * .8, y); c.stroke(); }
    if (isTalking(p) && MK.mouth) { let [x, y, rx, ry] = MK.mouth; const o = .45 + Math.abs(Math.sin(t * 13)) * .55; if (vi === 2) { x -= rx * .4; rx *= .55; ry = Math.min(ry, 6); }
      fill(x, y, rx + 3, ry + 3, K.pal[3]); fill(x, y + 2, rx * .8, (ry + 8) * o, '#9a3a32'); fill(x, y + 2 + (ry + 8) * o * .45, rx * .5, (ry + 8) * o * .45, '#e07a70'); }
  }
  if (L.hat && K.hat[view]) { c.translate(Hd.hat[0], Hd.hat[1] + 8); if (p.askew) c.rotate(-.32); c.scale(1.3, 1.3); rigLayers(c, K, K.hat[view].l); }
  c.restore(); return true;
}
// crying at the table with her head on it (cap. 3: «se dejó caer en una silla, extendió los brazos sobre la mesa y,
// hundiendo la cara en ellos, se puso a llorar»): seen from in front of the table, the hunched back and shoulders, the
// arms folded on the cloth, the head down on them (the parting of the hair, the braids fallen to each side), the hat
// left beside her; the shoulders shake with each sob. Drawn after the table (sortY), as it lies on it.
function drawLlorando(c, p, t, parte){
  const L = LOOKS[p.look], x = p.x, y = p.y + 4, k = L.h || 1;   // (y: the far edge of the table, where she leans)
  const sob = Math.max(0, Math.sin(t * 6.5)) * 1.8 + Math.sin(t * 19) * .3, sy = y - sob;
  c.save(); c.translate(x, sy); c.scale(k, k); c.translate(-x, -sy);
  if (parte === 'espalda') { c.restore(); return; }   // (behind the table nothing shows: only her head, on it)
  ell(c, x - 11, y + 12, 3.2, 2.4, L.skin, true); ell(c, x + 11, y + 12.5, 3.2, 2.4, L.skin, true);   // (just her fingers, peeping out under her head)
  // the braids, fallen to each side over the arms, tied with their ribbons
  for (const s of [-1, 1]) {
    const B = [[x + s * 9, sy + 3], [x + s * 14, y + 7], [x + s * 16, y + 13], [x + s * 19, y + 18]];
    line(c, B, L.hairD, 4, s + 7); line(c, B, L.hair, 2.4, s + 9);
    for (let i = 1; i < 4; i++) { const [bx, by] = B[i]; line(c, [[bx - 1.6, by - 1.2], [bx + 1.6, by + .6]], L.hairD, .8, i); }   // (the plait)
    ell(c, x + s * 19.5, y + 19.5, 2.4, 1.6, L.scarf || '#d9433b', true);
  }
  // the head, face down on the arms: the top of it, red, with the parting down the middle
  ell(c, x, sy + 5, 11, 9, L.hair, true);
  ell(c, x - 3, sy + 1, 6, 4, 'rgba(255,220,180,.18)');
  line(c, [[x, sy - 5.5], [x + .5, sy + 2], [x, sy + 9]], L.hairD, 1.4, 5);
  for (const s of [-1, 1]) line(c, [[x + s * 2, sy - 4], [x + s * 8, sy + 1], [x + s * 10, sy + 8]], L.hairD, .9, s + 3);
  c.restore();
  // her hat, left on the table beside her
  if (L.hat && !game.wm?.sinSombrero) { ell(c, x + 36, y + 13, 12, 4.4, '#e6c477', true); ell(c, x + 36, y + 10, 6.5, 3.6, '#ecd08a', true); line(c, [[x + 30, y + 10.5], [x + 42, y + 10.5]], L.scarf || '#d9433b', 1.6, 2); }
}
function drawPerson(c, p, t){
  if (p.llora && p.sit) return drawLlorando(c, p, t, 'encima');
  if (p.enCama && game.scene === 'ga') return drawEnCama(c, p, t);   // (in her bed: face down crying, or under the sheets)   // (crying at the table, the head on it: a pose of its own)
  if (p.look === 'ana') { const La = LOOKS.ana; La.big = ANA_STYLE === 'mano' ? HEAD_M : 0; La.pencil = ANA_STYLE === 'mano'; if (La.hair0 == null) { La.hair0 = La.hair; La.hairD0 = La.hairD; } const green = !!game.wm?.perm?.pelo_verde; La.hair = green ? '#5a8a3a' : La.hair0; La.hairD = green ? '#3e6a26' : La.hairD0; La.style = game.wm?.perm?.pelo_corto ? 'corto' : 'braids'; La.hat = !game.wm?.sinSombrero; } else if (LOOKS[p.look]) LOOKS[p.look].big = Math.max(1, HEAD_M / 2);   // (green after the dye; short, without braids, after Marilla cuts it)
  if (CACHE_ON && c === G0 && !CACHE.dentro && cachePersona(c, p, t)) return;   // (after her look is set up: a quiet pose, from a kept image: see 66-cache-dibujos.js)
  if (animDraw(c, p, t) || kitDraw(c, p, t)) return;
  if (p.lie) { drawLying(c, p, t); return; }
  if (rigDraw(c, p, t) || vecDraw(c, p, t)) return;
  const q8 = facing8(p), flip = q8 >= 5, side = q8 === 2 || q8 === 6, tq = q8 % 2, d = side ? (flip ? 3 : 1) : (q8 <= 1 || q8 === 7) ? 0 : 2, vi = flip ? 8 - q8 : q8;
  const L = LOOKS[p.look], x = p.x, y = p.y, w = Math.sin(p.walk * TAU), sitting = p.sit;
  const hb = (pts, col = L.hair) => { if (FACE_STYLE === 'simple' && !L.pencil) { blob(c, pts, col); return; } if (L.pencil) { blob(c, pts, col, true); return; } blob(c, pts, col, false); c.strokeStyle = 'rgba(70,35,20,.7)'; c.lineWidth = .5; c.lineJoin = 'round'; c.beginPath(); pts.forEach(([a, b], k) => k ? c.lineTo(a + .6, b + .4) : c.moveTo(a + .6, b + .4)); c.closePath(); c.stroke(); };   // (hair: a thin clean line, as in the anime)
  const fl = L.style === 'braids' ? braidFlick(p, t, d) : -1;   // (-1, or how far along the gesture of throwing a braid back is)
  const bob = p.moving ? Math.abs(Math.sin(p.walk * TAU)) * 1.6 : Math.sin(t * 2 + x) * .35, wind = Math.sin(t * 1.3) * .6 + Math.sin(t * 3.1) * .3;
  if (!p.noShadow) ell(c, x, y, 11 * L.h, 4, 'rgba(30,40,20,.26)');
  c.save(); c.translate(x, y - bob + (sitting ? 9 : 0) + (p.crouch ? 5 : 0)); c.scale(L.h * (flip ? -1 : 1), L.h);
  const hy = -32;
  const bstroke = () => { const bw = (L.pencil ? 3 : 3.6 / Math.sqrt(L.big || 1)); if (L.pencil) { c.strokeStyle = INK; c.lineWidth = bw + 1.1; c.stroke(); } c.strokeStyle = L.hair; c.lineWidth = bw; c.stroke(); };   // (a braid's body; in pencil, with the line around it)
  const braid = (bx, by, len, k, th = 0) => {
    const sn = Math.sin(th), cs = Math.cos(th), sway = (wind + (p.moving ? w : 0)) * k * Math.max(.2, cs);
    const ex = bx + sn * len + sway, ey = by + cs * len, cx = bx + sn * len * .5 + k * .5, cy = by + cs * len * .5 + Math.abs(sn) * len * .22;   // (straight out it still sags a little)
    c.lineCap = 'round'; c.beginPath(); c.moveTo(bx, by); c.quadraticCurveTo(cx, cy, ex, ey); bstroke();
    c.strokeStyle = L.hairD; c.lineWidth = L.pencil ? .55 : .9; for (let s = .3; s < 1; s += L.pencil ? .17 : .23) { const u = 1 - s, sx = u * u * bx + 2 * u * s * cx + s * s * ex, sy = u * u * by + 2 * u * s * cy + s * s * ey; c.beginPath(); c.moveTo(sx - 1.6 * cs, sy - 1 - 1.6 * sn); c.lineTo(sx + 1.6 * cs, sy + .6 + 1.6 * sn); c.stroke(); }
    ell(c, ex + sn * 1, ey + cs, 2, 1.3, '#d9433b');
  };
  const braidTo = (bx, by, tx, ty) => {   // (a braid whose end is held: from the head to the hand)
    c.lineCap = 'round'; c.beginPath(); c.moveTo(bx, by); c.quadraticCurveTo((bx + tx) / 2 + 2, (by + ty) / 2 + 3, tx, ty); bstroke();
    c.strokeStyle = L.hairD; c.lineWidth = L.pencil ? .55 : .9; for (let s = .3; s < 1; s += .23) { const sx = lerp(bx, tx, s), sy = lerp(by, ty, s) + 2 * Math.sin(s * Math.PI); c.beginPath(); c.moveTo(sx - 1.6, sy - 1); c.lineTo(sx + 1.6, sy + .6); c.stroke(); }
    ell(c, tx, ty + 1, 2, 1.3, '#d9433b');
  };
  // running, the braids fly out to the sides (more the faster); thrown back, one flies out level a moment
  const run = clamp(((p._spd || 0) - 34) / 46, 0, 1), bob2 = Math.sin(p.walk * TAU), out = run * 1.05;
  const flung = fl >= .62 ? (fl - .62) / .38 : -1;   // (after the throw: level, then dropping behind the shoulder)
  if (L.style === 'braids' && d === 2 && run > .25 && p.braidBack && fl < 0) braid(6 + tq * 1.4, hy + 4, 12, 1.4, out * (1 + .25 * bob2));   // (behind her, showing at the side)
  // legs and shoes
  if (!sitting) {
    const l = p.moving ? w * 3 : 0, shoe = '#5b3a28';
    if (side) { c.fillStyle = L.coat ? L.dressD : L.skin; c.fillRect(-2 - l, -10, 2.4, 7); c.fillRect(l, -10, 2.4, 7); ell(c, -1 - l, -3, 3.2, 2.2, shoe, true); ell(c, 1 + l, -3, 3.2, 2.2, shoe, true); }
    else { const o = tq * 1.2, f = tq && d === 2 ? 1.2 : 0; c.fillStyle = L.coat ? L.dressD : L.skin; c.fillRect(-4.2 + o, -10, 2.2, 7); c.fillRect(2 + o * .5, -10, 2.2, 7); ell(c, -3.2 + o + f, -3 + (p.moving ? w * 1.4 : 0), 3, 2.4, shoe, true); ell(c, 3.2 + o * .5 + f, -3 - (p.moving ? w * 1.4 : 0), 3, 2.4, shoe, true); }
  } else { ell(c, -6, -3, 3.2, 2.2, '#5b3a28', true); ell(c, 6, -3, 3.2, 2.2, '#5b3a28', true); }
  // the dress (or Matthew's coat and trousers)
  const sw = p.moving ? w * 1.4 : wind * .35, wide = sitting ? 4 : 0;
  if (L.coat) blob(c, [[-5.5, -25], [5.5, -25], [7 + sw * .5, -9], [-7 + sw * .5, -9]], L.dress);
  else blob(c, [[-5, -24], [5, -24], [9 + sw + wide, -8], [-9 + sw - wide, -8]], L.dress);
  if (L.apron && d !== 0) blob(c, [[-3.5, -20], [3.5, -20], [5.5 + sw, -9], [-5.5 + sw, -9]], L.apron);
  if (!L.coat) { c.fillStyle = L.dressD; c.fillRect(-8 + sw - wide, -9.5, 16 + wide * 2, 1.6); }
  if (p.torn) { const tear = [[1.5 + sw, -9.4], [3.6 + sw, -15], [4.8 + sw, -11.6], [6.6 + sw, -16], [8.2 + sw, -9.4]]; blob(c, tear, 'rgba(252,246,232,.95)', false); line(c, tear, INK, .7, 3); }
  // arms (holding a watering can or a basket if she carries one)
  const a = p.moving ? w * 4 : 0;
  c.strokeStyle = L.coat ? L.dressD : L.skin; c.lineWidth = 3; c.lineCap = 'round';
  const arm = (x0, y0, x1, y1) => { c.strokeStyle = L.coat ? L.dress : L.dressD; c.lineWidth = 3.2; c.beginPath(); c.moveTo(x0, y0); c.lineTo((x0 + x1) / 2, (y0 + y1) / 2); c.stroke(); c.strokeStyle = L.skin; c.lineWidth = 2.6; c.beginPath(); c.moveTo((x0 + x1) / 2, (y0 + y1) / 2); c.lineTo(x1, y1); c.stroke(); };
  if (p.pet) { arm(4, -21, 10, -12 + Math.sin(t * 8) * 1.2); arm(-4, -21, -6, -13); }
  else if (side) { if (fl < 0) arm(1, -21, 1 + a, -13); }
  else if (sitting) { arm(-5, -21, -3, -12); arm(5, -21, 3, -12); }
  else if (tq) { arm(-4.6, -21, -6 + a * .5, -14); if (fl < 0) arm(5.6, -21, 7.4 - a * .5, -13.5); }
  else { arm(-5.5, -21, -7.5, -14 + a * .4); if (fl < 0) arm(5.5, -21, 7.5, -14 - a * .4); }
  if (p.carry === 'can') { const hx = side ? 2 + a : 8, hy = -12; blob(c, [[hx - 1, hy], [hx + 7, hy], [hx + 6, hy + 7], [hx, hy + 7]], '#9db3bf'); line(c, [[hx + 7, hy + 2], [hx + 11, hy - 2]], 'rgba(70,90,100,.9)', 1.4); }
  // collar, brooch
  if (d !== 0) blob(c, [[-5, -24.5], [5, -24.5], [3, -21.5], [0, -23], [-3, -21.5]], L.collar || L.dressD, false);
  if (L.brooch && d === 2) ell(c, tq * 1.6, -22, 1.3, 1.3, '#d9a441', true);
  // a knitted scarf out of doors in winter, its end in the wind
  if (S === 3 && drawingOut) {
    blob(c, [[-5.8, -26], [5.8, -26], [5.4, -21.6], [-5.4, -21.6]], L.scarf);
    if (d !== 0) { const ex = side ? -3 : 2.5; blob(c, [[ex, -22], [ex + 3, -22], [ex + 3.4 + wind * 1.4, -14.5], [ex + .4 + wind * 1.4, -14.5]], L.scarf); c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(ex + .4 + wind * 1.4, -16.5, 3, 1); }
  }
  // hair behind, then the head (a big head, scaled about the neck, for the drawing 'a mano')
  const HS = L.big || 1, hsOut = ([x, y]) => [x * HS, (y + 24) * HS - 24];
  const BR = L.pencil ? kitBraidRoots(vi)?.map(hsOut) : null;   // (with the kit's head: the braids from where it has them; they are not made bigger with it)
  c.save(); if (HS !== 1 && !BR) { c.translate(0, -24); c.scale(HS, HS); c.translate(0, 24); }
  if (L.style === 'braids' && d === 2) {
    braid(...(BR ? BR[0] : [-6 + tq * 1.4, hy + 4]), 12, 1.4, -out * (1 + .25 * bob2));
    const [bx, byy] = BR ? BR[1] : [6 + tq * 1.4, hy + 4];
    if (fl >= 0) { if (fl < .62) braidTo(bx, byy, ...(BR ? hsOut(flickHand(fl, false)) : flickHand(fl, false))); else braid(bx, byy - 2, 12 * (1 - Math.max(0, flung - .5) * 1.4), 0, lerp(1.62, .9, flung * flung)); }   // (the hand takes it and throws it over the shoulder: out level, then behind)
    else if (!p.braidBack) braid(bx, byy, 12, 1.4, out * (1 - .25 * bob2));
  }
  if (BR) {   // (the kit's head; from the side the braid behind it, from behind the braids down the back)
    if (side) braid(...BR[0], 13, -1.8, -out * (1.1 + .3 * Math.sin(p.walk * TAU * 2)) - .1);
    c.save(); c.translate(0, -24); c.scale(HS, HS); c.translate(0, 24); kitHeadOn(c, p, t, vi, L); c.restore();
    if (d === 0) { braid(...BR[0], 13, 1.8, -out * (1 + .25 * bob2)); braid(...BR[1], 13, 1.8, out * (1 - .25 * bob2)); }
  } else {
  if (L.style === 'curls' && d !== 0) for (const sx of [-7.5, 7.5]) for (let k = 0; k < 3; k++) ell(c, sx + (sx > 0 ? -k * .4 : k * .4), hy + 3 + k * 3.4, 2.6, 2.2, L.hair, true);
  const SF = FACE_STYLE === 'simple' && !L.pencil;   // (the simple face)
  if (SF) ell(c, 0, hy, 8.2, 8.6, L.skin, SKIN_LINE); else headShape(c, L, hy, d, tq, faceOf(p.look, L));
  if (d === 0) {
    const bo = -tq * 2.8;   // (three-quarter from behind: the hair a little to the far side)
    if (tq) { ell(c, 7.4, hy + 1.5, 1.5, 2, L.skin, true); ell(c, 6, hy + 4.2, 1.6, 1.1, 'rgba(240,120,110,.35)'); }
    ell(c, bo, hy - 1, 8.6 - tq * .6, 8.6, L.hair, true);
    if (L.style === 'braids') { braid(-4 + bo, hy + 3, 13, 1.8, -out * (1 + .25 * bob2)); braid(4 + bo, hy + 3, 13, 1.8, out * (1 - .25 * bob2)); }
    if (L.style === 'bun') ell(c, bo, hy - 3, 4, 3.4, L.hairD, true);
    if (L.style === 'curls') for (let k = -2; k <= 2; k++) ell(c, k * 3 + bo, hy + 6, 2.6, 2.6, L.hair, true);
  } else if (side) {
    if (SF) hb([[-8.5, hy - 1], [-6, hy - 8], [2, hy - 9.2], [7.5, hy - 4], [5, hy - 5], [-1, hy - 4], [-3, hy + 3], [-8, hy + 4]]);
    else hb([[-8.9, hy + 1], [-9, hy - 3.5], [-7.4, hy - 7.6], [-3, hy - 9.9], [2, hy - 9.6], [7.5, hy - 4], [5, hy - 5], [-1, hy - 4], [-3, hy + 3], [-8, hy + 4.5]]);
    if (L.style === 'braids') {
      if (fl >= 0) { if (fl < .62) braidTo(3, hy + 5, ...flickHand(fl, true)); else braid(-6, hy + 2, 13, 0, -lerp(1.65, .25, flung * flung)); }
      else if (p.braidBack || run > .5) braid(-6, hy + 3, 13, -1.8, -out * (1.1 + .3 * Math.sin(p.walk * TAU * 2))); else braid(-1.5, hy + 8, 9, 1.4, -out * .6);   // (forward, over the shoulder: below the jaw)
    }
    if (L.style === 'bun') ell(c, -7, hy - 3, 3.4, 3.4, L.hairD, true);
    if (L.style === 'curls') for (let k = 0; k < 3; k++) ell(c, -7, hy + 2 + k * 3.4, 2.6, 2.2, L.hair, true);
    if (SF) {
      if (p.blink <= 0) { ell(c, 4.6, hy + 1, 1.1, 1.6, '#3a2418'); ell(c, 4.9, hy + .4, .4, .5, '#fff'); } else line(c, [[3.6, hy + 1.4], [5.6, hy + 1.4]], '#3a2418', .9);
      ell(c, 8.2, hy + 2.6, 1.1, 1, 'rgba(200,130,100,.9)'); ell(c, 3, hy + 4, 1.8, 1.1, 'rgba(240,120,110,.35)');
      if (isTalking(p) && !L.beard) ell(c, 6.6, hy + 5.6, .7, .5 + Math.abs(Math.sin(t * 13)) * .5, '#8a3a30');
      if (L.freckles) for (const [fx, fy] of [[1.5, hy + 3], [3, hy + 3.4], [2.2, hy + 4.3]]) ell(c, fx, fy, .35, .35, 'rgba(150,80,50,.55)');
      if (L.beard) blob(c, [[1, hy + 2], [8, hy + 3], [6, hy + 9], [0, hy + 8]], L.hair);
    } else {
    const F = faceOf(p.look, L);
    if (F.tpl === 'nina') hb([[-1, hy - 5], [2, hy - 6], [5.5, hy - 5.5], [7.6, hy - 3], [6.2, hy - 2.4], [5.2, hy - 3.8], [3.8, hy - 1.8], [2.6, hy - 4]]);   // (the fringe, in points)
    drawEye(c, F, 4.8, hy + 1.8, .6, -1, .7, p.blink <= 0, L);
    ell(c, 3.6, hy + 5, 2, 1.1, `rgba(240,120,110,${F.blush})`);
    if (!L.beard) drawMouth(c, F, 6.8, hy + 6.4, p, t, .5);
    if (L.freckles) for (const [fx, fy] of [[1.5, hy + 3], [3, hy + 3.4], [2.2, hy + 4.3]]) ell(c, fx, fy, .35, .35, 'rgba(150,80,50,.55)');
    if (L.beard) drawBeard(c, L, hy, true, null, p, t, F);
    }
  } else {
    // front: hair (and fringe), eyes that blink, cheeks, freckles, a smile
    // (three-quarter: everything on the face moves toward the side it looks to; the far eye and cheek narrower,
    // a little hair on the far side, and the nose shows)
    const fo = tq * 2.2, sh = pts => pts.map(([px, py]) => [px + fo * (1 - Math.abs(px) / 12), py]);
    if (tq) hb([[-8.6, hy + 3], [-8.6, hy - 4], [-6, hy - 6], [-5.2, hy + 4]]);
    if (L.style === 'bun') hb(sh([[-8.6, hy + 1], [-7.5, hy - 6], [0, hy - 9.6], [7.5, hy - 6], [8.6, hy + 1], [5, hy - 4], [0, hy - 6.5], [-5, hy - 4]]));
    else if (L.style === 'old') hb(sh([[-8.8, hy + 4], [-8.4, hy - 4], [-5, hy - 8.5], [5, hy - 8.5], [8.4, hy - 4], [8.8, hy + 4], [6.5, hy - 2], [-6.5, hy - 2]]));
    else if (L.h <= 1.02 && !SF) hb(sh([[-8.6, hy + 2], [-8.2, hy - 6], [-3, hy - 9.6], [3, hy - 9.6], [8.2, hy - 6], [8.6, hy + 2], [7, hy - 1], [6, hy - 3.8], [4.2, hy - 1.6], [2.6, hy - 4.8], [.6, hy - 2.2], [-1.2, hy - 5], [-3.2, hy - 1.8], [-4.8, hy - 4.6], [-6.6, hy - 1.2]]));   // (children: a fringe in points, as in the anime)
    else hb(sh([[-8.6, hy + 2], [-8, hy - 6], [-3, hy - 9.5], [3, hy - 9.5], [8, hy - 6], [8.6, hy + 2], [6, hy - 3], [2, hy - 4.5], [-1, hy - 3], [-5, hy - 4.5]]));
    const open = p.blink <= 0, lk = p.lookAround || 0;
    if (SF) {
      for (const ex of [-3.2, 3.2]) {
        const far = tq && ex < 0, exx = ex + fo + (far ? .6 : 0), wf = far ? .75 : 1;
        if (open) { ell(c, exx + lk, hy + 1.2, 1.3 * wf, 1.8, '#3a2418'); ell(c, exx + lk + .4, hy + .4, .45 * wf, .55, '#fff'); }
        else line(c, [[exx - 1.2 * wf, hy + 1.5], [exx, hy + 2.3], [exx + 1.2 * wf, hy + 1.5]], '#3a2418', .9);
      }
      ell(c, -5 + fo * .8, hy + 4, 1.9 * (tq ? .6 : 1), 1.1, 'rgba(240,120,110,.38)'); ell(c, 5 + fo * .7, hy + 4, 1.9, 1.1, 'rgba(240,120,110,.38)');
      if (tq) ell(c, 3.4 + fo, hy + 3.2, .9, .6, 'rgba(200,130,100,.85)');
      if (L.freckles) for (const [fx, fy] of [[-4.5, hy + 3], [-3.2, hy + 3.6], [-5.6, hy + 3.5], [4.5, hy + 3], [3.2, hy + 3.6], [5.6, hy + 3.5]]) if (!(tq && fx < -5)) ell(c, fx + fo * .8, fy, .35, .35, 'rgba(150,80,50,.55)');
      if (L.beard) blob(c, sh([[-6, hy + 3], [6, hy + 3], [4, hy + 10], [0, hy + 11.5], [-4, hy + 10]]), L.hair);
      else if (isTalking(p)) ell(c, fo, hy + 5.6, 1.1, .5 + Math.abs(Math.sin(t * 13)) * .6, '#8a3a30');
      else line(c, [[-1.4 + fo, hy + 5.2], [fo, hy + 6.1], [1.4 + fo, hy + 5.2]], '#b5604c', .8);
    } else {
    const F = faceOf(p.look, L), sp = F.ew > 1.6 ? 3.7 : 3.3;
    if (F.tpl === 'nina') for (const k of [-1, 1]) if (!(tq && k < 0)) hb([[k * 8.7 + fo * .2, hy - 3], [k * 7.2 + fo * .2, hy - 2], [k * 7.6 + fo * .3, hy + 5.5], [k * 8.9 + fo * .2, hy + 4]], L.pencil ? L.hairD : L.hair);   // (locks down the cheeks)
    for (const ex of [-sp, sp]) { const far = tq && ex < 0; drawEye(c, F, ex + fo + (far ? .5 : 0), hy + 2, far ? .72 : 1, Math.sign(ex), lk, open, L); }
    ell(c, -5 + fo * .8, hy + 5.2, 1.8 * (tq ? .6 : 1), 1, `rgba(240,120,110,${F.blush})`); ell(c, 5 + fo * .7, hy + 5.2, 1.8, 1, `rgba(240,120,110,${F.blush})`);
    if (tq) ell(c, 3.4 + fo, hy + 4.4, .8, .55, 'rgba(200,130,100,.7)'); else { c.strokeStyle = 'rgba(170,100,80,.6)'; c.lineWidth = .5; c.beginPath(); c.moveTo(.6, hy + 4.2); c.lineTo(.1, hy + 4.9); c.stroke(); }   // (the nose: a touch)
    if (L.freckles) for (const [fx, fy] of [[-1.7, hy + 4.4], [-2.8, hy + 4.9], [-4, hy + 4.6], [-3.3, hy + 5.6], [1.7, hy + 4.4], [2.8, hy + 4.9], [4, hy + 4.6], [3.3, hy + 5.6]]) if (!(tq && fx < -3.5)) ell(c, fx + fo * .8, fy, .3, .3, 'rgba(150,80,50,.6)');
    if (L.beard) drawBeard(c, L, hy, false, sh, p, t, F);
    else drawMouth(c, F, fo, hy + 7, p, t, tq ? .85 : 1);
    }
  }
  if (L.bow && d !== 0) { const bo = tq && d === 2 ? 1.6 : 0; ell(c, -5 + bo, hy - 7, 2.6, 1.8, L.bow, true); ell(c, -1.6 + bo, hy - 7.6, 2.6, 1.8, L.bow, true); }
  // hats: Ana's straw hat with its ribbon in the breeze, Matthew's dark one
  if (L.hat) {
    const by = hy - 6.5, rt = side || tq ? -7 : 6;   // (the ribbon flies behind)
    ell(c, 0, by + 1, 13, 4.2, '#ecd08a', true); ell(c, 0, by - 2, 7.4, 5, '#ecd08a', true);
    if (p.askew) { c.translate(0, by); c.rotate(-.32); c.translate(-3, -by); }
    c.fillStyle = '#d9433b'; c.fillRect(-7.2, by - 1.4, 14.4, 2.4);
    line(c, [[rt, by], [rt + 4 * Math.sign(rt), by + 3], [rt + (6 + wind * 2) * Math.sign(rt), by + 6 + Math.sin(t * 4) * 1.2]], '#d9433b', 1.8, 9);
  }
  if (L.hatDark) { const by = hy - 7; ell(c, 0, by + 1, 11, 3.4, '#2f2b30', true); blob(c, [[-6, by], [6, by], [5, by - 6], [-5, by - 6]], '#3a353c'); }
  }
  c.restore();
  if (fl >= 0) { const [hx, hyy] = hsOut(flickHand(fl, side)), sx = side ? 1 : 5.5; arm(sx, -21, hx, hyy); ell(c, hx, hyy, 1.7, 1.6, L.skin); }   // (with a big head the hand goes as far out as the head is big)
  c.restore();
}
// Toby, the dog
function drawDog(c, p, t){
  const w = Math.sin(p.walk * TAU), sit = p.sitT > 1.2 || p.petted > 0;
  ell(c, p.x, p.y, 9, 3.2, 'rgba(30,40,20,.24)');
  c.save(); c.translate(p.x, p.y - (p.moving ? Math.abs(w) * 1.2 : 0)); c.scale(p.dir === 3 ? -1 : 1, 1);
  const FUR = '#f4ead8', FUR_D = '#d8c6a6', EAR = '#9b6a44', l = p.moving ? w * 2.5 : 0;
  c.strokeStyle = FUR_D; c.lineWidth = 2.6; c.lineCap = 'round'; c.beginPath();
  if (sit) { c.moveTo(4, -6); c.lineTo(5, -1); c.moveTo(1, -6); c.lineTo(1.5, -1); }
  else { c.moveTo(-5, -6); c.lineTo(-5 - l, -1); c.moveTo(-2, -6); c.lineTo(-2 + l, -1); c.moveTo(3, -6); c.lineTo(3 + l, -1); c.moveTo(5.5, -6); c.lineTo(5.5 - l, -1); }
  c.stroke();
  ell(c, sit ? -1 : 0, -8, sit ? 6 : 8, sit ? 6 : 4.6, FUR, true);
  const wag = Math.sin(t * (p.moving || p.petted > 0 ? 16 : 9)) * (sit ? .6 : .9);
  line(c, [[-7, sit ? -6 : -10], [-11, -13 + wag * 3], [-10 + wag * 2, -17]], FUR_D, 2.6, 4);
  const hx = sit ? 4 : 8, hy = sit ? -16 : -13 + (p.sniff > 0 ? 5 : 0);
  ell(c, hx, hy, 5, 4.4, FUR, true); ell(c, hx + 4.6, hy + 1.6, 2.2, 1.6, FUR);
  ell(c, hx + 6.2, hy + 1, 1, .9, '#3a2418');
  if (p.petted > 0) line(c, [[hx + .8, hy - .4], [hx + 2.8, hy - .4]], '#3a2418', .9); else ell(c, hx + 1.8, hy - .6, .9, 1.1, '#3a2418');
  ell(c, hx - 2.4, hy - 1, 2, 3.6, EAR, true, .4 + Math.sin(t * 3) * .05);
  c.restore();
}
