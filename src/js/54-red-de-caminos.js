/* ---------- the roads as a network: to go far one goes by the road (Ana, when one taps the map; the people of Avonlea).
   Made from the same lines the roads are drawn with: their points are the stops, and where a road ends on another one
   there is a crossing. A route: from where one is to the nearest road, along the roads, and off the road to the end. ---------- */
const proj = ([x, y], a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], t = clamp(((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy || 1), 0, 1), px = a[0] + dx * t, py = a[1] + dy * t; return { x: px, y: py, t, d: Math.hypot(x - px, y - py) }; };
const NET = (() => {
  const P = [], E = [];
  const node = (x, y) => { for (let i = 0; i < P.length; i++) if (dist(P[i][0], P[i][1], x, y) < 8) return i; P.push([x, y]); return P.length - 1; };
  for (const p of paths) for (let i = 0; i + 1 < p.length; i++) { const a = node(...p[i]), b = node(...p[i + 1]); if (a !== b) E.push([a, b]); }
  const deg = P.map(() => 0); E.forEach(([a, b]) => { deg[a]++; deg[b]++; });
  P.forEach((q, e) => {   // a road that ends on another one, in the middle of a stretch: a crossing there
    if (deg[e] !== 1) return; let best = null;
    E.forEach((ed, j) => { if (ed.includes(e)) return; const pr = proj(q, P[ed[0]], P[ed[1]]); if (pr.d < 160 && (!best || pr.d < best.d)) best = { ...pr, j }; });
    if (!best) return; const [a, b] = E[best.j], m = best.t < .03 ? a : best.t > .97 ? b : P.push([best.x, best.y]) - 1;
    if (m !== a && m !== b) E.splice(best.j, 1, [a, m], [m, b]); E.push([e, m]);
  });
  const adj = P.map(() => []); for (const [a, b] of E) { const d = dist(P[a][0], P[a][1], P[b][0], P[b][1]); adj[a].push([b, d]); adj[b].push([a, d]); }
  // the roads that all join up (a path that leads nowhere is left out of the routes)
  const comp = new Int32Array(P.length).fill(-1), size = []; for (let i = 0; i < P.length; i++) if (comp[i] < 0) { const st = [i], c = size.length; size.push(0); comp[i] = c; while (st.length) { const u = st.pop(); size[c]++; for (const [v] of adj[u]) if (comp[v] < 0) { comp[v] = c; st.push(v); } } }
  const main = size.indexOf(Math.max(...size));
  return { P, E: E.filter(([a]) => comp[a] === main), adj };
})();
function netRoute(x0, y0, x1, y1){
  const near = (x, y) => { let best = null; NET.E.forEach(([a, b]) => { const pr = proj([x, y], NET.P[a], NET.P[b]); if (!best || pr.d < best.d) best = { ...pr, a, b }; }); return best; };
  const s = near(x0, y0), e = near(x1, y1); if (!s || !e) return null;
  const n = NET.P.length, S0 = n, E0 = n + 1, at = i => i === S0 ? [s.x, s.y] : i === E0 ? [e.x, e.y] : NET.P[i];
  const g = new Float64Array(n + 2).fill(1e12), prev = new Int32Array(n + 2).fill(-1), done = new Uint8Array(n + 2);
  const nb = i => {
    const L = i < n ? NET.adj[i].slice() : [];
    if (i === S0) { L.push([s.a, dist(s.x, s.y, ...NET.P[s.a])], [s.b, dist(s.x, s.y, ...NET.P[s.b])]); if ((s.a === e.a && s.b === e.b) || (s.a === e.b && s.b === e.a)) L.push([E0, dist(s.x, s.y, e.x, e.y)]); }
    if (i === e.a || i === e.b) L.push([E0, dist(...NET.P[i], e.x, e.y)]);
    return L;
  };
  g[S0] = 0;
  for (;;) {
    let u = -1; for (let i = 0; i < n + 2; i++) if (!done[i] && g[i] < 1e12 && (u < 0 || g[i] < g[u])) u = i;
    if (u < 0 || u === E0) break; done[u] = 1;
    for (const [v, d] of nb(u)) if (g[u] + d < g[v]) { g[v] = g[u] + d; prev[v] = u; }
  }
  if (g[E0] >= 1e12) return null;
  const pts = []; for (let i = E0; i !== -1; i = prev[i]) pts.push(at(i).slice());
  pts.reverse();
  return { pts, cost: g[E0] + s.d + e.d };
}
