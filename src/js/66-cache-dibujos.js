/* ---------- the drawings kept as images, in the engine of always (?cache=0 in the link turns it off, to compare) ----------
   What the Phaser trial taught: what makes a frame cheap is not the engine, it is not drawing again what does not change.
   So here, on the same canvas as always:
   - a person standing, walking or bending down, quiet, is drawn from a pose kept as an image (as the sheets of Phaser:
     the same predicate, the same poses); anything else (talking, blinking, sitting...) is drawn as always;
   - the trees, the houses, the fences... are kept as images (again if the season, the night or they change); the trees
     sway by turning a little on their trunk, and the smoke of the chimneys is drawn live as always.
   A thing not kept yet, when the frame has no time left to make it, is drawn as always: nothing appears late.
   Kept at the resolution of the screen (half steps, at most 3); the oldest let go when there are too many. */
var CACHE_ON = !/[?&]cache=0/.test(location.search);   // (on, unless ?cache=0, to compare; var: drawPerson may be called before this part runs, and then it is just off)
var G0 = g;   // (the screen's canvas: only what is drawn there is kept)
var CACHE = { mapa: new Map(), px: 0, max: 18e6, dentro: false, t0: 0, hechos: 0, cuadro: -1 };
const cacheR = () => Math.min(3, Math.max(1, Math.round((view.Z || 1) * (devicePixelRatio || 1) * 2) / 2));
// a frame has a few milliseconds for making images (at least one); after that, things are drawn as always
function cachePuedo(){ if (CACHE.cuadro !== FRAME) { CACHE.cuadro = FRAME; CACHE.t0 = performance.now(); CACHE.hechos = 0; } if (CACHE.hechos === 0 || performance.now() - CACHE.t0 < 3) { CACHE.hechos++; return true; } return false; }
function cacheGuardar(k, e){ CACHE.mapa.set(k, e); CACHE.px += e.cv.width * e.cv.height; while (CACHE.px > CACHE.max && CACHE.mapa.size) { const [k0, e0] = CACHE.mapa.entries().next().value; CACHE.mapa.delete(k0); CACHE.px -= e0.cv.width * e0.cv.height; } }
function cacheTomar(k){ const e = CACHE.mapa.get(k); if (e) { CACHE.mapa.delete(k); CACHE.mapa.set(k, e); } return e; }   // (the last used goes last: the oldest are let go first)
// what her drawing changes in her as it goes, without drawing her: where she faces (with its little stickiness) and, with
// braids, the gesture of throwing one back and how fast she goes (as the drawing of always does it, with the same values)
function cacheRelojes(b, t){
  if (VEC_ON) { CACHE.dentro = true; try { drawPerson(NULO, b, t); } finally { CACHE.dentro = false; } return; }   // (the traced drawings keep other clocks: run them whole)
  const q8 = facing8(b), flip = q8 >= 5, side = q8 === 2 || q8 === 6, d = side ? (flip ? 3 : 1) : (q8 <= 1 || q8 === 7) ? 0 : 2;
  if (LOOKS[b.look]?.style === 'braids') braidFlick(b, t, d);
}
// how she looks, as a key (her look changes seldom: worked out again every half second)
function cacheFirma(b){ const F = CACHE.firmas ??= new Map(), e = F.get(b.look); if (e && FRAME - e.f < 30) return e.s; const s = phFirma(b); F.set(b.look, { s, f: FRAME }); return s; }
// a person from a kept pose (false: draw her as always)
function cachePersona(c, b, t){
  if (!phLlana(b, t)) return false;
  cacheRelojes(b, t);   // (her clocks: where she faces, the braid)
  if (!phLlana(b, t)) return false;
  const R = cacheR(), q = b.dir8 ?? [0, 2, 4, 6][b.dir] ?? 4, col = b.crouch ? 9 : b.moving ? 1 + ((Math.floor(b.walk * 8) % 8) + 8) % 8 : 0;
  const corre = Math.round(clamp(((b._spd || 0) - 34) / 46, 0, 1) * 4) / 4, k = 'p|' + cacheFirma(b) + '|' + (b.braidBack ? 1 : 0) + '|' + q + '|' + corre + '|' + col + '|' + R;
  let e = cacheTomar(k);
  if (!e) {
    if (!cachePuedo()) return false;
    const w = Math.ceil((HOJA_BOX[2] - HOJA_BOX[0]) * R), h = Math.ceil((HOJA_BOX[3] - HOJA_BOX[1]) * R), cv0 = document.createElement('canvas'); cv0.width = w; cv0.height = h;
    const cx = cv0.getContext('2d'), a = (q - 2) * Math.PI / 4, X = -HOJA_BOX[0], Y = -HOJA_BOX[1]; cx.setTransform(R, 0, 0, R, 0, 0);
    const tp = Object.assign(mkPerson(b.look, X, Y), { dir: b.dir, dir8: q, n: b.n, braidBack: b.braidBack, _bstill: 0, _bwait: 1e9, _spd: corre ? 34 + corre * 46 : 0 });
    if (col >= 1 && col <= 8) { tp.moving = true; tp.walk = (col - 1) / 8; tp._fx = X - Math.cos(a); tp._fy = Y - Math.sin(a); }
    else { tp._fx = X; tp._fy = Y; tp._fd = tp.dir; tp.crouch = col === 9; }
    CACHE.dentro = true; try { drawPerson(cx, tp, t); } finally { CACHE.dentro = false; }
    e = { cv: cv0 }; cacheGuardar(k, e);
  }
  c.drawImage(e.cv, b.x + HOJA_BOX[0], b.y + HOJA_BOX[1], HOJA_BOX[2] - HOJA_BOX[0], HOJA_BOX[3] - HOJA_BOX[1]);
  return true;
}
// a tree, a house, a fence... from a kept image (false: draw it as always)
const CACHE_NO = new Set(['pump', 'faro']);   // (the pump changes with the can; the lighthouse has its light)
const CACHE_CAJA = new WeakMap(), CACHE_ID = new WeakMap();
function cacheProp(c, o, t, night){
  if (CACHE_NO.has(o.kind) || (o.kind === 'edificio' && o.b?.style === 'faro')) return false;
  const R = cacheR(), arbol = /^(tree|oak|pine|apple|blossom|manzano)$/.test(o.kind), tb = arbol ? -o.ph / .9 : 0;
  let box = CACHE_CAJA.get(o);
  if (!box) {   // (measured once, small: drawn at a quarter on a big canvas, the box is where it painted)
    if (!cachePuedo()) return false;
    const B = FIJO_BOX, qq = .25, cv0 = document.createElement('canvas'); cv0.width = (B[2] - B[0]) * qq; cv0.height = (B[3] - B[1]) * qq; const cx = cv0.getContext('2d'); cx.setTransform(qq, 0, 0, qq, -(o.x + B[0]) * qq, -(o.y + B[1]) * qq);
    CACHE.dentro = true; PH_HUMOS = []; try { drawProp(cx, o, tb, night); } finally { CACHE.dentro = false; PH_HUMOS = null; }
    const d = cx.getImageData(0, 0, cv0.width, cv0.height).data; let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
    for (let y = 0; y < cv0.height; y++) for (let x = 0; x < cv0.width; x++) if (d[(y * cv0.width + x) * 4 + 3]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    box = x1 < 0 ? [0, 0, 1, 1] : [B[0] + x0 / qq - 12, B[1] + y0 / qq - 14, B[0] + x1 / qq + 12, B[1] + y1 / qq + 10]; CACHE_CAJA.set(o, box);
  }
  if (!CACHE_ID.has(o)) CACHE_ID.set(o, CACHE.seq = (CACHE.seq || 0) + 1);
  const k = 'o|' + CACHE_ID.get(o) + '|' + S + '|' + Math.round(night * 10) + '|' + phCampos(o) + '|' + R;
  let e = cacheTomar(k);
  if (!e) {
    if (!cachePuedo()) return false;
    const w = Math.max(1, Math.ceil((box[2] - box[0]) * R)), h = Math.max(1, Math.ceil((box[3] - box[1]) * R)), cv0 = document.createElement('canvas'); cv0.width = w; cv0.height = h;
    const cx = cv0.getContext('2d'); cx.setTransform(R, 0, 0, R, -(o.x + box[0]) * R, -(o.y + box[1]) * R);
    const humos = []; CACHE.dentro = true; PH_HUMOS = humos; try { drawProp(cx, o, tb, night); } finally { CACHE.dentro = false; PH_HUMOS = null; }
    e = { cv: cv0, humos }; cacheGuardar(k, e);
  }
  c.save(); c.translate(o.x, o.y); if (arbol) c.rotate(Math.sin(t * .9 + o.ph) * 1.6 / 110);
  c.drawImage(e.cv, box[0], box[1], box[2] - box[0], box[3] - box[1]); c.restore();
  for (const [chx, cy0, sm, nk] of e.humos) for (let k2 = 0; k2 < nk; k2++) { const q = ((t * .22 + k2 / nk) % 1), sx = chx + Math.sin(q * 6 + k2) * 6 + q * 22, sy = cy0 - q * 70; ell(c, sx, sy, 5 + q * 12, 4 + q * 9, `rgba(245,245,240,${sm * (1 - q)})`); }   // (the smoke, live, as always)
  return true;
}
