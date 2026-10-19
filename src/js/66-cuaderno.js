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
    if ((h = l.match(/^pista si (.+?):\s+(.*)$/))) m.pistas.push([h[1], h[2]]);   // (one condition or more, with commas)
    else if ((h = l.match(/^guiño (cerrada )?(\S+):\s*(.*)$/))) (m.guiños ||= []).push({ cerrada: !!h[1], quien: h[2], texto: h[3] });
    else if ((h = l.match(/^(titulo|pista|meta|requiere|antes|acciones):\s*(.*)$/))) m[h[1]] = h[2];
    else if (l === 'oculta') m.oculta = true;
    else if (l === 'a prueba') m.aPrueba = true;   // (before Marilla decides: tools/grafo.js checks the rest wait for «quedarse»)
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
  // a visit is a visit however Ana got there: in someone's house, with them home (not only when the planner took her)
  for (const k of WM_PEOPLE()) { const h = casaPos(k); if (k !== 'ana' && h && h !== 'cocina' && personKey('ana') === h && personKey(k) === h && !realR.fact('visita:ana>' + k)) realR.setFact('visita:ana>' + k); }
  let s = null;
  for (const m of CUADERNO_METAS) {
    if (cuadernoHecho(m.id) || !cuadernoAbierta(m)) continue;
    let ok = false; s ||= wmNow(); try { ok = !!m.goal().test(s); } catch (e) {}
    if (ok) { game.wm.perm['cuaderno:' + m.id] = today() + 1; notice('📖 ✓ ' + m.titulo); logEv('Ana cumplió en su cuaderno: ' + m.titulo + '.', []); }
  }
}
// the winks: what someone says in passing about a goal still to be done (open), or about what it still needs (closed),
// mixed with their loose lines, so that the player hears of it without opening the notebook
// (at most GUIÑOS_MAX at a time for each one, changing with the day: first those of open goals; then those of closed
// goals that only lack effort or time, a quality or some days; then the rest)
const GUIÑOS_MAX = 2;
const faltaEsfuerzo = m => m.requiere.every(r => cuadernoCumple(r) || CUALIDAD_RE.test(r) || /^(afecto|dias_desde):/.test(r));
function guiñosDe(k){
  if (!game.wm || !conoceA(k)) return [];
  const c = CUADERNO_METAS.flatMap(m => (m.guiños || []).filter(g => g.quien === k && lineasSi([g.texto], k).length && !cuadernoHecho(m.id) && (!m.oculta || cuadernoAbierta(m)) && g.cerrada === !cuadernoAbierta(m)).map(g => ({ t: lineasSi([g.texto], k)[0], r: !g.cerrada ? 0 : faltaEsfuerzo(m) ? 1 : 2 })));
  const out = [];
  for (const r of [0, 1, 2]) { const l = c.filter(x => x.r === r); for (let i = 0; i < l.length && out.length < GUIÑOS_MAX; i++) out.push(l[(i + today()) % l.length].t); }
  return out;
}
// the hint now: the last whose condition holds, or the plain one
const cuadernoPista = m => ([...m.pistas].reverse().find(([c]) => c.split(',').every(x => dlgCond(x.trim(), dlgCtx())))?.[1] || m.pista).replace('{estudio}', estudio()).replace('{dias_examen}', diasExamen());   // ({estudio}: how much she has studied; {dias_examen}: days until the examination)
const cuadernoAntes = m => m.antes || m.requiere.filter(r => !cuadernoCumple(r)).map(r => { const t = cuadernoMeta(r)?.titulo; return t && t[0].toLowerCase() + t.slice(1); }).filter(Boolean).join(', ');
function cuadernoPanel(open){
  const P = $('cua'); P.hidden = !open; if (!open) return;
  const vis = CUADERNO_METAS.filter(m => !m.oculta || cuadernoHecho(m.id) || cuadernoAbierta(m)), n = vis.filter(m => cuadernoHecho(m.id)).length;
  $('cuasub').textContent = cuadernoFecha() + ' · ' + n + ' de ' + vis.length + ' · ' + (n === vis.length ? '¡todo! Ana podría escribir un libro con esto.' : 'las que faltan tienen una pista; 🔒: todavía no');
  $('cualist').innerHTML = cuadernoMiradas() + CUADERNO.map(g => '<h4>' + esc(g.nombre) + '</h4>' + g.metas.filter(m => !m.oculta || cuadernoHecho(m.id) || cuadernoAbierta(m)).map(m => {   // (a hidden goal: once it opens)
    const d = cuadernoHecho(m.id), abierta = cuadernoAbierta(m);
    return d ? `<div class="cm hecha"><b>✓ ${esc(m.titulo)}</b><span>el día ${d}</span></div>`
      : abierta ? `<div class="cm"><b>○ ${esc(m.titulo)}</b><small>${esc(cuadernoPista(m))}</small></div>`
      : `<div class="cm cerrada"><b>🔒 ${esc(m.titulo)}</b><small>Antes: ${esc(cuadernoAntes(m))}.</small></div>`;
  }).join('')).join('') + cuadernoHabilidades() + cuadernoAmigos();
}
// the date, as Ana would write it: «martes, día 3 de la primavera»
const cuadernoFecha = () => ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'][today() % 7] + ', día ' + (today() % DIAS_ESTACION + 1) + ' de ' + (S === 0 ? 'la ' : 'el ') + SEASONS[S].toLowerCase();
// her skills: how far she has gone in each, and what comes next
const cuadernoHabilidades = () => '<h4>Sus habilidades</h4>' + HABILIDADES.filter(deAna).map(c => { const n = cualidad('ana', c.id), p = habilidadProxima(c), top = c.hitos.at(-1)?.n || 1; return `<div class="cm"><b>${esc(c.titulo)} · ${n}</b><small>${'▰'.repeat(Math.round(Math.min(n, top) / top * 10)) + '▱'.repeat(10 - Math.round(Math.min(n, top) / top * 10))}${p ? ' · en ' + p.n + ': ' + esc(p.texto) : ' · ¡todo!'}</small></div>`; }).join('');
// how the others see her (the qualities of someone towards Ana, while they matter: «visible si»): Marilla's patience,
// with what it means now (the last «bajo» it has fallen to, or the next «hito» up)
const cuadernoMiradas = () => { const l = HABILIDADES.filter(c => !deAna(c) && (!c.visible || c.visible.every(x => dlgCond(x)))); return l.length ? '<h4>Cómo la ven</h4>' + l.map(c => {
  const n = cualidad(c.de, c.id, c.hacia), [, max = 5] = c.rango || [], b = c.bajos.filter(h => n <= h.n).at(-1), sube = c.hitos.find(h => h.n > n);
  return `<div class="cm"><b>${esc(c.titulo)}</b><small>${'●'.repeat(n) + '○'.repeat(Math.max(0, max - n))}${b ? ' · ' + esc(b.texto) : sube ? ' · en ' + sube.n + ': ' + esc(sube.texto) : ''}</small></div>`; }).join('') : ''; };
// her friends: how much each one loves her (the hearts of 0 to 5), those she knows
function cuadernoAmigos(){
  const l = ['diana', 'marilla', 'matthew', 'sraallan', 'stacy', 'josephine', 'lynde', 'gilbert'].filter(k => conoceA(k) && game.wm.rel?.[k + '>ana'] != null);
  return l.length ? '<h4>Quiénes la quieren</h4>' + l.map(k => { const r = Math.max(0, Math.min(5, Math.round(relGetW(k, 'ana')))); return `<div class="cm"><b>${esc(wmName(k).replace(/^(el|la) /, m => m[0].toUpperCase() + m.slice(1)))}</b><small>${'♥'.repeat(r) + '♡'.repeat(5 - r)}</small></div>`; }).join('') : '';
}
// a game that already had Ana and Diana as friends (before they had to meet): they know each other
if (game.wm?.perm?.['amigas:ana&diana'] && !dlgHechos().conocidas_diana) dlgHecho('conocidas_diana');
