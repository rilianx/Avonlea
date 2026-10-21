// Las escenas que escribió la IA de la noche, en una página para revisarlas: cada una con su texto, las notas de Claude
// (A1–A9, trazas/temas/rubrica.md) y las de los jueces (trazas/temas/notas-jueces.json). Se filtra y se ordena; quien
// revisa deja su nota y un comentario, que quedan en su navegador y se exportan en JSON para mandárselos a Claude.
// Uso: node tools/escenas-tabla.js → trazas/temas/escenas.html (ábrela con rawcdn.githack.com o en el navegador)
const fs = require('fs'), path = require('path'), RAIZ = path.join(__dirname, '..');
const leer = f => JSON.parse(fs.readFileSync(path.join(RAIZ, f), 'utf8'));
const C = leer('trazas/temas/notas-claude.json'), J = fs.existsSync(path.join(RAIZ, 'trazas/temas/notas-jueces.json')) ? leer('trazas/temas/notas-jueces.json') : { modelos: [], notas: {}, razones: {} };
const CORRIDAS = { r1: 'corrida 1 (versiones)', r2: 'corrida 2 (versiones)', r3: 'corrida 3 (elegir)' };
const E = C.escenas.map((e, i) => {
  const corrida = e.version.includes(':') ? e.version.split(':')[0] : 'r1', version = e.version.replace(/^r\d:/, '');
  const campo = k => (e.texto.match(new RegExp('^' + k + ':\\s*(.*)$', 'm')) || [])[1] || '';
  return { n: i + 1, id: e.id, corrida, version, noche: e.noche, con: campo('con'), tema: campo('tema'), resumen: campo('resumen'), notas: e.notas, total: e.total,
    jueces: J.notas[e.id] || {}, razones: J.razones[e.id] || {}, texto: e.texto };
});
const datos = JSON.stringify({ escenas: E, modelos: J.modelos, criterios: C.criterios, corridas: CORRIDAS }).replace(/</g, '\\u003c');
const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Escenas de la noche</title>
<style>
:root { --fondo: #fbf8f1; --tinta: #2b2622; --suave: #6f665c; --linea: #e3dccf; --marca: #5b7a3a; --alto: #fff; --mal: #a8432f; --bien: #3f6e2a; }
@media (prefers-color-scheme: dark) { :root { --fondo: #1d1b18; --tinta: #ece6db; --suave: #a59c8f; --linea: #39342d; --marca: #9cbf73; --alto: #26231f; --mal: #e08b75; --bien: #a7cf86; } }
* { box-sizing: border-box; }
body { margin: 0; background: var(--fondo); color: var(--tinta); font: 15px/1.45 Georgia, 'Times New Roman', serif; }
header { padding: 16px; border-bottom: 1px solid var(--linea); }
h1 { margin: 0 0 4px; font-size: 22px; }
.nota { color: var(--suave); font-size: 13px; margin: 0; }
.filtros { display: flex; flex-wrap: wrap; gap: 8px; padding: 12px 16px; position: sticky; top: 0; background: var(--fondo); border-bottom: 1px solid var(--linea); z-index: 2; }
.filtros input, .filtros select, button { font: inherit; font-size: 14px; padding: 6px 8px; border: 1px solid var(--linea); border-radius: 6px; background: var(--alto); color: var(--tinta); }
.filtros input { flex: 1 1 180px; }
button { cursor: pointer; }
button.prim { background: var(--marca); color: var(--fondo); border-color: var(--marca); }
main { padding: 0 16px 40px; }
.tabla { width: 100%; overflow-x: auto; }
table { border-collapse: collapse; width: 100%; min-width: 720px; }
th, td { text-align: left; padding: 7px 6px; border-bottom: 1px solid var(--linea); vertical-align: top; }
th { font-size: 13px; color: var(--suave); cursor: pointer; white-space: nowrap; user-select: none; }
td.num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
tr.fila { cursor: pointer; }
tr.fila:hover { background: var(--alto); }
.tema { font-weight: bold; }
.res { color: var(--suave); font-size: 13px; }
.chip { display: inline-block; font-size: 12px; padding: 1px 6px; border-radius: 10px; border: 1px solid var(--linea); color: var(--suave); white-space: nowrap; }
.hecho { color: var(--bien); }
tr.det td { background: var(--alto); }
pre { white-space: pre-wrap; font: 14px/1.5 Georgia, serif; margin: 8px 0; }
.crit { display: flex; flex-wrap: wrap; gap: 6px; margin: 6px 0; font-size: 13px; }
.crit span { border: 1px solid var(--linea); border-radius: 4px; padding: 1px 5px; }
.crit .c0 { color: var(--mal); border-color: var(--mal); }
.razon { font-size: 13px; color: var(--suave); margin: 4px 0; }
.mia { display: grid; gap: 6px; grid-template-columns: auto 1fr; align-items: start; margin-top: 10px; padding-top: 10px; border-top: 1px dashed var(--linea); }
.mia textarea { width: 100%; min-height: 60px; font: inherit; font-size: 14px; padding: 6px; border: 1px solid var(--linea); border-radius: 6px; background: var(--fondo); color: var(--tinta); }
.mia .botones button { margin-right: 4px; }
.mia .botones button.on { background: var(--marca); color: var(--fondo); }
.resumen { padding: 12px 16px; font-size: 14px; color: var(--suave); }
@media (max-width: 700px) { table { min-width: 0; } .res .chip { white-space: normal; word-break: break-all; } td { overflow-wrap: anywhere; } .ancho { display: none; } th, td { padding: 6px 4px; } .mia { grid-template-columns: 1fr; } }
</style></head>
<body>
<header>
  <h1>Escenas de la noche</h1>
  <p class="nota">Las que escribió la IA de la noche en los experimentos (jugadora curiosa, día 16), con las notas de Claude (A1–A9, de 0 a 2; total de 18; trazas/temas/rubrica.md) y las de los jueces. Toca una fila para leer la escena y dejar tu nota. Tus notas quedan en este navegador; «Exportar» las baja en un archivo para mandárselas a Claude.</p>
</header>
<div class="filtros">
  <input id="q" type="search" placeholder="Buscar en el tema o el texto…">
  <select id="fc"><option value="">Todas las corridas</option></select>
  <select id="fv"><option value="">Todas las versiones</option></select>
  <select id="fp"><option value="">Todas las personas</option></select>
  <select id="fr"><option value="">Revisadas y sin revisar</option><option value="si">Solo las que revisé</option><option value="no">Solo sin revisar</option></select>
  <button id="exp" class="prim">Exportar mis notas</button>
</div>
<div class="resumen" id="cuenta"></div>
<main><div class="tabla"><table><thead><tr id="cab"></tr></thead><tbody id="cuerpo"></tbody></table></div></main>
<script>
const D = ${datos};
const CLAVE = 'avonlea-escenas-revision';
let mias = {}; try { mias = JSON.parse(localStorage.getItem(CLAVE) || '{}'); } catch (e) {}
const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify(mias)); } catch (e) {} };
const $ = id => document.getElementById(id), esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const corto = m => m.replace('gpt-5.4-', '').replace('gpt-5.4', '5.4');
const COLS = [['n', '#'], ['corrida', 'Corrida'], ['version', 'Versión'], ['con', 'Con'], ['tema', 'Tema'], ['total', 'Claude'], ...D.modelos.map(m => ['j:' + m, corto(m)]), ['mia', 'Tú']];
let orden = 'n', sube = true, abierta = null;
const valor = (e, k) => k.startsWith('j:') ? e.jueces[k.slice(2)] ?? -1 : k === 'mia' ? (mias[e.id]?.nota ?? -1) : e[k];
for (const [k, t] of Object.entries(D.corridas)) $('fc').add(new Option(t, k));
for (const v of [...new Set(D.escenas.map(e => e.version))]) $('fv').add(new Option(v, v));
for (const p of [...new Set(D.escenas.map(e => e.con))].sort()) $('fp').add(new Option(p, p));
const ANCHO = k => k === 'corrida' || k === 'version' || k.startsWith('j:');   // (hidden on a phone)
$('cab').innerHTML = COLS.map(([k, t]) => '<th data-k="' + k + '"' + (ANCHO(k) ? ' class="ancho"' : '') + '>' + t + '</th>').join('');
$('cab').onclick = ev => { const k = ev.target.dataset.k; if (!k) return; if (orden === k) sube = !sube; else { orden = k; sube = k === 'n' || k === 'con' || k === 'tema'; } pintar(); };
for (const id of ['q', 'fc', 'fv', 'fp', 'fr']) $(id).oninput = pintar;
function filtradas(){
  const q = $('q').value.toLowerCase(), c = $('fc').value, v = $('fv').value, p = $('fp').value, r = $('fr').value;
  return D.escenas.filter(e => (!q || (e.tema + ' ' + e.texto).toLowerCase().includes(q)) && (!c || e.corrida === c) && (!v || e.version === v) && (!p || e.con === p)
    && (!r || (r === 'si') === !!(mias[e.id] && (mias[e.id].nota != null || mias[e.id].comentario))))
    .sort((a, b) => { const x = valor(a, orden), y = valor(b, orden); return (x < y ? -1 : x > y ? 1 : 0) * (sube ? 1 : -1); });
}
function detalle(e){
  const crit = D.criterios.map((c, k) => '<span class="c' + e.notas[k] + '">' + c + ' ' + e.notas[k] + '</span>').join('');
  const raz = D.modelos.map(m => e.razones[m] ? '<p class="razon"><b>' + esc(corto(m)) + ' (' + (e.jueces[m] ?? '—') + '):</b> ' + esc(e.razones[m]) + '</p>' : '').join('');
  const M = mias[e.id] || {};
  return '<tr class="det"><td colspan="' + COLS.length + '"><div class="res">' + esc(e.resumen) + ' · <span class="chip">' + esc(e.noche) + '</span> <span class="chip">' + esc(e.id) + '</span></div>'
    + '<pre>' + esc(e.texto.split('\\n---\\n').slice(1).join('\\n---\\n') || e.texto) + '</pre>'
    + '<div class="crit"><b>Claude ' + e.total + ':</b> ' + crit + '</div>' + raz
    + '<div class="mia"><b>Tu nota</b><div class="botones">' + [0, 1, 2, 3, 4, 5].map(n => '<button data-nota="' + n + '"' + (M.nota === n ? ' class="on"' : '') + '>' + ['✗ no va', '1', '2', '3', '4', '5 ✨'][n] + '</button>').join('')
    + '</div><b>Comentario</b><textarea data-id="' + esc(e.id) + '" placeholder="Qué funciona, qué no, qué cambiarías…">' + esc(M.comentario || '') + '</textarea></div></td></tr>';
}
function pintar(){
  const L = filtradas(), rev = Object.values(mias).filter(m => m.nota != null || m.comentario).length;
  $('cuenta').textContent = L.length + ' de ' + D.escenas.length + ' escenas · media de Claude ' + (L.reduce((a, e) => a + e.total, 0) / (L.length || 1)).toFixed(1) + ' de 18 · revisaste ' + rev;
  for (const th of $('cab').children) th.textContent = COLS.find(c => c[0] === th.dataset.k)[1] + (th.dataset.k === orden ? (sube ? ' ▲' : ' ▼') : '');
  $('cuerpo').innerHTML = L.map(e => '<tr class="fila" data-id="' + esc(e.id) + '"><td class="num">' + e.n + '</td><td><span class="chip">' + e.corrida + '</span></td><td>' + esc(e.version) + '</td><td>' + esc(e.con) + '</td><td><div class="tema">' + esc(e.tema) + '</div></td><td class="num"><b>' + e.total + '</b></td>'
    + D.modelos.map(m => '<td class="num ancho">' + (e.jueces[m] ?? '—') + '</td>').join('') + '<td class="num">' + (mias[e.id]?.nota != null ? '<span class="hecho">' + ['✗', 1, 2, 3, 4, 5][mias[e.id].nota] + '</span>' : (mias[e.id]?.comentario ? '💬' : '')) + '</td></tr>' + (abierta === e.id ? detalle(e) : '')).join('');
}
$('cuerpo').onclick = ev => {
  const b = ev.target.closest('button[data-nota]'); if (b) { const id = ev.target.closest('tr.det').previousElementSibling.dataset.id, n = +b.dataset.nota; (mias[id] ||= {}).nota = mias[id].nota === n ? null : n; mias[id].cuando = new Date().toISOString(); guardar(); pintar(); return; }
  if (ev.target.closest('tr.det')) return;
  const f = ev.target.closest('tr.fila'); if (!f) return; abierta = abierta === f.dataset.id ? null : f.dataset.id; pintar();
};
$('cuerpo').oninput = ev => { const t = ev.target; if (t.tagName !== 'TEXTAREA') return; (mias[t.dataset.id] ||= {}).comentario = t.value; mias[t.dataset.id].cuando = new Date().toISOString(); guardar(); };
$('exp').onclick = () => {
  const out = { exportado: new Date().toISOString(), escala: '0: no va · 1 a 5', notas: D.escenas.filter(e => mias[e.id] && (mias[e.id].nota != null || mias[e.id].comentario)).map(e => ({ id: e.id, version: e.version, con: e.con, tema: e.tema, claude: e.total, ...mias[e.id] })) };
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(out, null, 1)], { type: 'application/json' }));
  a.download = 'avonlea-escenas-revision.json'; a.click();
};
pintar();
</script>
</body></html>
`;
fs.writeFileSync(path.join(RAIZ, 'trazas/temas/escenas.html'), html);
console.log('→ trazas/temas/escenas.html · ' + E.length + ' escenas');
