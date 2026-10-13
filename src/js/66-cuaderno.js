/* ---------- the notebook: what Ana could do (📖), as goals of the book, not as actions ----------
   For the player to know what there is: each goal with a hint of where or when (not the steps: those are hers to find),
   and ✓ with the day, once she has done it. It is checked by the same goals the planner uses (G), now and then; what was
   done stays (game.wm.perm). The goals of the book come in chains (to have a friend of the soul, first to know Diana;
   the picnic, the story club, the boat, Josie's dare, after the friendship…): a goal may require others, and while it
   is closed what belongs to it cannot be done, by the player or by anyone (its actions). Written apart, as the script of
   scenes (src/datos/cuaderno.txt, put in the page by tools/build.js); the chains of the book: docs/CADENAS.md. */
// goals that are not of the planner: sitting at the tea table with someone; something that happened, in the script
const CUADERNO_EXTRA = {
  tomando_te: (k, con) => ({ test: () => AGENTS[k]?.acting?.v === 'tomar_te' && AGENTS[k].acting.k === con }),
  hecho: x => ({ test: () => !!dlgHechos()[x] }),
};
const cuadernoArg = v => /^-?\d+(\.\d+)?$/.test(v) ? +v : v.includes(',') ? v.split(',') : v;
const cuadernoLista = v => (v || '').split(',').map(x => x.trim()).filter(Boolean);
function cuadernoLeer(txt){
  const out = []; let grupo = null, m = null;
  for (const raw of txt.split('\n')) {
    const l = raw.trim(); if (!l || l[0] === '#') continue;
    let h;
    if ((h = l.match(/^===\s*(.+?)\s*===$/))) { if (!grupo) out.push(grupo = { nombre: '', metas: [] }); grupo.metas.push(m = { id: h[1], pistas: [] }); continue; }
    if ((h = l.match(/^==\s*(.+)$/))) { out.push(grupo = { nombre: h[1], metas: [] }); m = null; continue; }
    if (!m) continue;
    if ((h = l.match(/^pista si (\S+):\s*(.*)$/))) m.pistas.push([h[1], h[2]]);
    else if ((h = l.match(/^(titulo|pista|meta|requiere|antes|acciones):\s*(.*)$/))) m[h[1]] = h[2];
  }
  for (const g of out) for (const x of g.metas) {
    const [f, ...a] = (x.meta || '').split(/\s+/), args = a.map(cuadernoArg), fn = G[f] || CUADERNO_EXTRA[f];
    if (!fn) console.warn('[avonlea] cuaderno: «' + x.id + '» tiene una meta desconocida: ' + x.meta);
    x.titulo ||= x.id; x.pista ||= ''; x.goal = () => fn(...args); x.requiere = cuadernoLista(x.requiere); x.acciones = cuadernoLista(x.acciones);
  }
  return out;
}
const CUADERNO = cuadernoLeer(document.getElementById('cuaderno')?.textContent || '');
const CUADERNO_METAS = CUADERNO.flatMap(g => g.metas), cuadernoMeta = id => CUADERNO_METAS.find(m => m.id === id);
// what has been done: the day it was first done, as the game counts the days, from 1 (kept with the facts for good)
const cuadernoHecho = id => game.wm?.perm?.['cuaderno:' + id];
// a requirement: another goal of the notebook, or a condition of the script (hecho:x, dias_desde:x:n, afecto:a:b:n…)
const cuadernoCumple = r => r.includes(':') || r[0] === '!' ? dlgCond(r, dlgCtx()) : !!cuadernoHecho(r);
// open: what it requires has happened (in the test goals, everything is open: game.libre, unless the test is of a chain)
const cuadernoAbierta = m => !!game.libre || m.requiere.every(cuadernoCumple);
// an action that belongs to a goal still closed (for the planner: not offered, not planned, by no one)
// (the planner asks this for every action of every state it tries: the closed ones are worked out once every half second)
let CERRADAS = { t: -9, libre: null, l: [] };
function cuadernoCerrada(v, a){
  if (game.libre) return false;
  if (TT - CERRADAS.t > .5 || CERRADAS.libre !== !!game.libre) CERRADAS = { t: TT, libre: !!game.libre, l: CUADERNO_METAS.filter(m => m.acciones.length && !cuadernoAbierta(m)).flatMap(m => m.acciones.map(x => { const [verbo, quien] = x.split(':'), [vv, favor] = verbo.split('/'); return [vv, quien, favor]; })) };
  return CERRADAS.l.some(([vv, quien, favor]) => vv === v && (!quien || a.k === quien) && (!favor || a.favor?.f === favor));
}
let cuadernoT = 0;
function cuadernoTick(dt){
  if ((cuadernoT -= dt) > 0 || !game.wm) return; cuadernoT = 2;
  let s = null;
  for (const m of CUADERNO_METAS) {
    if (cuadernoHecho(m.id) || !cuadernoAbierta(m)) continue;
    let ok = false; s ||= wmNow(); try { ok = !!m.goal().test(s); } catch (e) {}
    if (ok) { game.wm.perm['cuaderno:' + m.id] = today() + 1; notice('📖 ✓ ' + m.titulo); logEv('Ana cumplió en su cuaderno: ' + m.titulo + '.', []); }
  }
}
// the hint now: the last whose condition holds, or the plain one
const cuadernoPista = m => [...m.pistas].reverse().find(([c]) => dlgCond(c, dlgCtx()))?.[1] || m.pista;
const cuadernoAntes = m => m.antes || m.requiere.filter(r => !cuadernoCumple(r)).map(r => cuadernoMeta(r)?.titulo.toLowerCase()).filter(Boolean).join(', ');
function cuadernoPanel(open){
  const P = $('cua'); P.hidden = !open; if (!open) return;
  const n = CUADERNO_METAS.filter(m => cuadernoHecho(m.id)).length;
  $('cuasub').textContent = n + ' de ' + CUADERNO_METAS.length + ' · ' + (n === CUADERNO_METAS.length ? '¡todo! Ana podría escribir un libro con esto.' : 'las que faltan tienen una pista; 🔒: todavía no');
  $('cualist').innerHTML = CUADERNO.map(g => '<h4>' + esc(g.nombre) + '</h4>' + g.metas.map(m => {
    const d = cuadernoHecho(m.id), abierta = cuadernoAbierta(m);
    return d ? `<div class="cm hecha"><b>✓ ${esc(m.titulo)}</b><span>el día ${d}</span></div>`
      : abierta ? `<div class="cm"><b>○ ${esc(m.titulo)}</b><small>${esc(cuadernoPista(m))}</small></div>`
      : `<div class="cm cerrada"><b>🔒 ${esc(m.titulo)}</b><small>Antes: ${esc(cuadernoAntes(m))}.</small></div>`;
  }).join('')).join('');
}
// a game that already had Ana and Diana as friends (before they had to meet): they know each other
if (game.wm?.perm?.['amigas:ana&diana'] && !dlgHechos().conocidas_diana) dlgHecho('conocidas_diana');
