/* ---------- finding the way: A* over a grid of the fields or of the room ----------
   The grid is made once from the same "blocked" tests the walking uses (with a little room around every obstacle);
   the path is smoothed so that they cut corners where they can see the way is clear. */
const navCache = {};
function navGrid(scene){
  if (navCache[scene]) return navCache[scene];
  const cs = scene === 'out' || scene === 'camino' ? 16 : 8, W = scene === 'out' ? WW : scene === 'camino' ? RW : KIT.w, H = scene === 'out' ? WH : scene === 'camino' ? RH : KIT.h, cols = Math.ceil(W / cs), rows = Math.ceil(H / cs), mem = new Uint8Array(cols * rows).fill(2), o = cs * .35;
  const bl = (x, y) => scene === 'out' ? blockedOut(x, y) : blockedIn(x, y, scene);
  const B = i => { if (mem[i] === 2) { const c = i % cols, r = (i - c) / cols, x = (c + .5) * cs, y = (r + .5) * cs; mem[i] = bl(x, y) || bl(x + o, y) || bl(x - o, y) || bl(x, y + o) || bl(x, y - o) ? 1 : 0; } return mem[i]; };   // (worked out the first time it is asked)
  return navCache[scene] = { cs, cols, rows, B };
}
// far away: by the roads (the network below), with the grid only to get onto the road and off it at the end
function findPath(scene, x0, y0, x1, y1){
  const D = dist(x0, y0, x1, y1);
  if (scene === 'camino' && D > 700) return [[x1, y1]];   // (on the long road: straight along it; the grid is far too big to search end to end)
  if (scene === 'out' && D > 900) {
    const r = netRoute(x0, y0, x1, y1);
    if (r && r.cost < D * 2.6 + 800) {   // (a stretch that is not clear, like the end of a road at a door, goes by the grid)
      const clear = (a, b) => { const n = Math.ceil(dist(...a, ...b) / 12); for (let k = 1; k <= n; k++) if (blockedOut(lerp(a[0], b[0], k / n), lerp(a[1], b[1], k / n))) return false; return true; };
      const pts = [...r.pts, [x1, y1]], out = []; let cur = [x0, y0];
      pts.forEach((q, i) => { if (i < pts.length - 1 && blockedOut(...q)) return; if (clear(cur, q)) out.push(q); else out.push(...(gridPath('out', ...cur, ...q) || [q])); cur = q; });
      return out;
    }
  }
  return gridPath(scene, x0, y0, x1, y1);
}
function gridPath(scene, x0, y0, x1, y1){
  const { cs, cols, rows, B } = navGrid(scene), id = (c, r) => r * cols + c;
  const cell = (x, y) => [clamp(Math.floor(x / cs), 0, cols - 1), clamp(Math.floor(y / cs), 0, rows - 1)];
  const snap = ([c, r]) => {   // the nearest free cell
    if (!B(id(c, r))) return [c, r];
    for (let d = 1; d < 14; d++) for (let dr = -d; dr <= d; dr++) for (let dc = -d; dc <= d; dc++) { if (Math.max(Math.abs(dc), Math.abs(dr)) !== d) continue; const cc = c + dc, rr = r + dr; if (cc >= 0 && rr >= 0 && cc < cols && rr < rows && !B(id(cc, rr))) return [cc, rr]; }
    return null;
  };
  const sc0 = cell(x0, y0), ec0 = cell(x1, y1), s = snap(sc0), e = snap(ec0);
  if (!s || !e) return null;
  const N = cols * rows, nav = navGrid(scene); if (!nav.buf) nav.buf = { gv: new Float32Array(N), cv: new Int32Array(N), seen: new Uint32Array(N), shut: new Uint32Array(N), gen: 0 };
  const bf = nav.buf, gen = ++bf.gen, heap = [];   // (the arrays are kept between searches: a cell not seen in this one has g = 1e9, no parent, and is not done)
  const gOf = i => bf.seen[i] === gen ? bf.gv[i] : 1e9, setG = (i, v, p) => { bf.seen[i] = gen; bf.gv[i] = v; bf.cv[i] = p; };
  const h = (c, r) => { const dx = Math.abs(c - e[0]), dy = Math.abs(r - e[1]); return dx + dy + (1.414 - 2) * Math.min(dx, dy); };
  const push = (f, i) => { heap.push([f, i]); let k = heap.length - 1; while (k > 0) { const q = (k - 1) >> 1; if (heap[q][0] <= heap[k][0]) break; [heap[q], heap[k]] = [heap[k], heap[q]]; k = q; } };
  const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let k = 0; for (;;) { let l = 2 * k + 1, r2 = l + 1, m = k; if (l < heap.length && heap[l][0] < heap[m][0]) m = l; if (r2 < heap.length && heap[r2][0] < heap[m][0]) m = r2; if (m === k) break; [heap[m], heap[k]] = [heap[k], heap[m]]; k = m; } } return top; };
  setG(id(...s), 0, -1); push(h(...s), id(...s));
  const goal = id(...e); let found = false;
  while (heap.length) {
    const [, cur] = pop(); if (bf.shut[cur] === gen) continue; bf.shut[cur] = gen;
    if (cur === goal) { found = true; break; }
    const c = cur % cols, r = (cur - c) / cols;
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
      if (!dc && !dr) continue; const cc = c + dc, rr = r + dr; if (cc < 0 || rr < 0 || cc >= cols || rr >= rows) continue;
      const ni = id(cc, rr); if (B(ni) || bf.shut[ni] === gen) continue;
      if (dc && dr && (B(id(c + dc, r)) || B(id(c, r + dr)))) continue;   // (no cutting corners)
      const ng = gOf(cur) + (dc && dr ? 1.414 : 1); if (ng < gOf(ni)) { setG(ni, ng, cur); push(ng + h(cc, rr), ni); }
    }
  }
  if (!found) return null;
  let pts = []; for (let i = goal; i !== -1; i = bf.seen[i] === gen ? bf.cv[i] : -1) { const c = i % cols, r = (i - c) / cols; pts.push([(c + .5) * cs, (r + .5) * cs]); }
  pts.reverse(); pts.shift();
  const free = (x, y) => !B(id(clamp(Math.floor(x / cs), 0, cols - 1), clamp(Math.floor(y / cs), 0, rows - 1)));
  const los = (a, b) => { const d = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.ceil(d / (cs * .5)); for (let k = 1; k < n; k++) if (!free(lerp(a[0], b[0], k / n), lerp(a[1], b[1], k / n))) return false; return true; };
  const out = [], from = [x0, y0]; let cur = from, i = 0;
  while (i < pts.length) { let j = pts.length - 1; while (j > i && !los(cur, pts[j])) j--; out.push(pts[j]); cur = pts[j]; i = j + 1; }
  if (ec0[0] === e[0] && ec0[1] === e[1] && out.length) out[out.length - 1] = [x1, y1];   // (the goal itself, if it was free)
  return out.length ? out : [[x1, y1]];
}
// one step along the way to (tx, ty): the next point to walk to, and whether it has arrived (it re-plans if the goal moved)
function navStep(p, tx, ty){
  const sc = curScene();
  if (!p.nav || p.nav.sc !== sc || dist(p.nav.tx, p.nav.ty, tx, ty) > 40) p.nav = { sc, tx, ty, pts: findPath(sc, p.x, p.y, tx, ty) || [[tx, ty]], i: 0 };
  const n = p.nav;
  while (n.i < n.pts.length - 1 && dist(p.x, p.y, n.pts[n.i][0], n.pts[n.i][1]) < 6) n.i++;
  const [wx, wy] = n.pts[n.i];
  return { wx, wy, arrived: n.i === n.pts.length - 1 && dist(p.x, p.y, wx, wy) < 5 };
}
function walkPath(p, tx, ty, sp, dt, sc){
  if (sc && sc !== curScene()) { const o = SCN; SCN = sc; try { return walkPath(p, tx, ty, sp, dt); } finally { SCN = o; } }
  if (p.called) { const r = calledHold(p, dt); if (r !== null) return r; }   // (someone called them: they stop, or come)
  const n = navStep(p, tx, ty);
  if (n.arrived) { p.moving = false; return true; }
  const ox = p.x, oy = p.y; walkTo(p, n.wx, n.wy, sp, dt);
  if (Math.hypot(p.x - ox, p.y - oy) < sp * dt * .25) { if ((p.navStuck = (p.navStuck || 0) + dt) > 1) { p.nav = null; p.navStuck = 0; moveBy(p, (Math.random() - .5) * 8, (Math.random() - .5) * 8); } }
  else p.navStuck = 0;
  return false;
}
