/* ---------- the notebook: what Ana could do (📖), as goals of the book, not as actions ----------
   For the player to know what there is: each goal with a hint of where or when (not the steps: those are hers to find),
   and ✓ with the day, once she has done it. It is checked by the same goals the planner uses (G), now and then; what was
   done stays (game.wm.perm). To add one: src/datos/cuaderno.txt. */
// the goals are written apart, as the script of scenes (src/datos/cuaderno.txt, put in the page by tools/build.js):
// «== Grupo», and each goal «=== id ===» with titulo, pista and meta (a goal of the planner and its arguments)
const CUADERNO_EXTRA = { tomando_te: (k, con) => ({ test: () => AGENTS[k]?.acting?.v === 'tomar_te' && AGENTS[k].acting.k === con }) };   // (sitting at the tea table with her)
const cuadernoArg = v => /^-?\d+(\.\d+)?$/.test(v) ? +v : v.includes(',') ? v.split(',') : v;
function cuadernoLeer(txt){
  const out = []; let grupo = null, m = null;
  for (const raw of txt.split('\n')) {
    const l = raw.trim(); if (!l || l[0] === '#') continue;
    let h;
    if ((h = l.match(/^===\s*(.+?)\s*===$/))) { if (!grupo) out.push(grupo = ['', []]); grupo[1].push(m = { id: h[1] }); continue; }
    if ((h = l.match(/^==\s*(.+)$/))) { out.push(grupo = [h[1], []]); m = null; continue; }
    if (m && (h = l.match(/^(titulo|pista|meta):\s*(.*)$/))) m[h[1]] = h[2];
  }
  return out.map(([g, ms]) => [g, ms.map(x => { const [f, ...a] = (x.meta || '').split(/\s+/), args = a.map(cuadernoArg), fn = G[f] || CUADERNO_EXTRA[f];
    if (!fn) console.warn('[avonlea] cuaderno: «' + x.id + '» tiene una meta desconocida: ' + x.meta);
    return [x.id, x.titulo || x.id, x.pista || '', () => fn(...args)]; })]);
}
const CUADERNO = cuadernoLeer(document.getElementById('cuaderno')?.textContent || '');
// what has been done: the day it was first done, as the game counts the days, from 1 (kept with the facts for good)
const cuadernoHecho = id => game.wm?.perm?.['cuaderno:' + id];
let cuadernoT = 0;
function cuadernoTick(dt){
  if ((cuadernoT -= dt) > 0 || !game.wm) return; cuadernoT = 2;
  let s = null;
  for (const [, metas] of CUADERNO) for (const [id, , , meta] of metas) {
    if (cuadernoHecho(id)) continue;
    let ok = false; s ||= wmNow(); try { ok = !!meta().test(s); } catch (e) {}
    if (ok) { game.wm.perm['cuaderno:' + id] = today() + 1; const t = CUADERNO.flatMap(([, m]) => m).find(m => m[0] === id)[1]; notice('📖 ✓ ' + t); logEv('Ana cumplió en su cuaderno: ' + t + '.', []); }
  }
}
function cuadernoPanel(open){
  const P = $('cua'); P.hidden = !open; if (!open) return;
  const todas = CUADERNO.flatMap(([, m]) => m), n = todas.filter(m => cuadernoHecho(m[0])).length;
  $('cuasub').textContent = n + ' de ' + todas.length + ' · ' + (n === todas.length ? '¡todo! Ana podría escribir un libro con esto.' : 'las que faltan tienen una pista');
  $('cualist').innerHTML = CUADERNO.map(([grupo, metas]) => '<h4>' + grupo + '</h4>' + metas.map(([id, titulo, pista]) => {
    const d = cuadernoHecho(id);
    return `<div class="cm${d ? ' hecha' : ''}"><b>${d ? '✓' : '○'} ${esc(titulo)}</b>${d ? `<span>el día ${d}</span>` : `<small>${esc(pista)}</small>`}</div>`;
  }).join('')).join('');
}
