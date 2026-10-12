/* ---------- the web of relations: a graph, every arrow keeps how fond one is of the other (0 to 5) and a note ----------
   (the arrow from someone to Ana is the cariño the game already had: game.fond) */
const NODES = () => ['ana', ...Object.keys(CH)];
const nodeName = k => k === 'ana' ? 'Ana' : NAMES[k];
function relInit(){
  game.rel = game.rel || {};
  const seed = (from, map) => { for (const [to, [a, n]] of Object.entries(map || {})) { const R = game.rel[from] = game.rel[from] || {}; if (R[to]) continue; if (to === 'ana' && CH[from]) { R.ana = { n }; game.fond[from] = Math.max(game.fond[from] || 0, a); } else R[to] = { a, n }; } };
  seed('ana', ANA.rels); for (const k of Object.keys(CH)) seed(k, CH[k].rels);
}
const relGet = (f, t) => { const e = (game.rel[f] || {})[t] || {}; return { a: t === 'ana' && CH[f] ? (game.fond[f] || 0) : (e.a ?? 2), n: e.n || '' }; };
function relSet(f, t, a, n){
  const R = game.rel[f] = game.rel[f] || {}, e = R[t] = R[t] || {};
  if (t === 'ana' && CH[f]) game.fond[f] = clamp(a, 0, 5); else e.a = clamp(a, 0, 5);
  if (n) e.n = String(n).slice(0, 140);
}
const relText = (who, only) => NODES().filter(t => t !== who && (!only || only.includes(t))).map(t => { const r = relGet(who, t); return `${nodeName(t)} ${r.a}/5${r.n ? ' (' + r.n + ')' : ''}`; }).join('; ');
