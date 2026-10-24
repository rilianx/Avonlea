// The drawing of the graph of the story (trazas/grafo.html), made by tools/grafo.js with what it read: each scene (of the
// script, the conversations, the mini-missions, the letters) and each goal of the notebook is a box; an arrow goes from
// what leaves a fact to what needs it (the fact on the arrow). Left to right, the order of the story: a box is one column
// to the right of the farthest thing it needs. A page to look through and review: search, click a box (what it needs
// and what it opens, all the way back and forward), the facts and who makes and reads each, the points to come back to,
// what never could happen. Self-contained (no libraries): the layout is computed here.
const fs = require('fs'), path = require('path');

function dibujar(d, root){
  const limpia = s => s.replace(/ \((una opción|alternativa|narra salvo|pista|por el juego)\)$/, '');
  const N = new Map();   // id → node
  const tipoDe = e => e.con ? 'conversacion' : /^mis_/.test(e.id) ? 'mision' : /^(carta|respuesta)$/.test(e.canal || '') || /^(carta|resp)_/.test(e.id) ? 'carta' : 'escena';
  for (const e of d.escenas) N.set('escena ' + e.id, { id: 'escena ' + e.id, k: e.id, tipo: tipoDe(e), grande: !!e.grande, punto: e.punto || null,
    info: { si: e.si || '', canal: e.canal, prioridad: e.prioridad, con: e.con, tema: e.tema, resumen: e.resumen, donde: e.donde, en: e.en, cerca: e.cerca, repetir: e.repetir, disparo: e.disparo, lugar: e.lugar,
      narra: e.narra, primera: e.primera?.replace(/^narra:\s*/, ''), lineas: e.lin || 0, empieza: e.al_empezars || [], termina: e.al_terminars || [], ops: e.ops || [] } });
  // a short description of each box: its «resumen:», the theme of a conversation, the title of a goal; else, the first
  // sentence of its card or its first line (the loose ones mostly: those in chains have a «resumen:», tools/grafo.js)
  const frase = t => (t || '').replace(/^\w+( piensa)?:\s*/, '').split(/(?<=[.!?»])\s/)[0].slice(0, 140);
  for (const n of N.values()) { const i = n.info; n.desc = i.resumen || i.tema || frase(i.narra) || frase(i.primera) || ''; }
  for (const m of d.metas) N.set('meta ' + m.id, { id: 'meta ' + m.id, k: m.id, tipo: 'meta', info: { titulo: m.titulo, pista: m.pista, meta: m.meta, requiere: m.requiere, aPrueba: m.aPrueba } });
  for (const n of N.values()) if (n.tipo === 'meta') n.desc = n.info.titulo || '';
  const SIS = { llegadas: 'Quién llega a Avonlea y quién se va, y cuándo (src/datos/llegadas.txt).', hitos: 'Los hitos de la historia del día (src/datos/hitos.txt).' };
  for (const s of ['llegadas', 'hitos']) N.set(s, { id: s, k: s, tipo: 'sistema', desc: SIS[s], info: {} });
  const nodo = w => { w = limpia(w); if (N.has(w)) return w; if (/^habilidad /.test(w)) { N.set(w, { id: w, k: w, tipo: 'sistema', desc: 'Un hito de la habilidad «' + w.slice(10) + '» (src/datos/habilidades.txt).', info: {} }); return w; } return null; };
  // the facts: who makes each, who needs it, who reads it without needing it («!hecho:x»: it closes when x happens)
  const F = {};
  const hechoDe = h => (F[h] ||= { h, hace: new Set(), pide: new Set(), lee: new Set(), otros: new Set() });
  for (const [h, w] of Object.entries(d.hace)) for (const x of w) { const f = hechoDe(h.trim()); const n = nodo(x); n ? f.hace.add(n) : f.hace.add(limpia(x)); }
  for (const [h, w] of Object.entries(d.pide)) for (const x of w) { const f = hechoDe(h.trim()), n = nodo(x); if (!n) { f.otros.add(limpia(x)); continue; } (h.endsWith(' ') ? f.lee : f.pide).add(n); }
  // the arrows: needs (from who makes to who needs; not from the code, which would tie everything to one box), and closes
  const E = [], C = [];
  for (const f of Object.values(F)) for (const a of f.hace) if (N.has(a)) { for (const b of f.pide) if (a !== b) E.push([a, b, f.h]); for (const b of f.lee) if (a !== b) C.push([a, b, f.h]); }
  for (const m of d.metas) for (const r of m.requiere) if (N.has('meta ' + r)) E.push(['meta ' + r, 'meta ' + m.id, '(meta) ' + r]);
  // a fact that more than one makes: one arrow per maker. Repeated pairs: one arrow, with all their facts
  const junta = L => { const M = new Map(); for (const [a, b, h] of L) { const k = a + '→' + b; if (!M.has(k)) M.set(k, [a, b, []]); M.get(k)[2].push(h); } return [...M.values()]; };
  const EN = junta(E), CN = junta(C);
  // the columns: the longest way from what needs nothing (a loop, if any, is cut where it is found)
  const sal = new Map(), ent = new Map(); for (const id of N.keys()) { sal.set(id, []); ent.set(id, []); }
  for (const [a, b] of EN) { sal.get(a).push(b); ent.get(b).push(a); }
  const prof = new Map(), estado = new Map(), lazos = [];
  const col = id => { if (prof.has(id)) return prof.get(id); if (estado.get(id) === 1) { lazos.push(id); return 0; } estado.set(id, 1); let p = 0; for (const a of ent.get(id)) p = Math.max(p, col(a) + 1); estado.set(id, 2); prof.set(id, p); return p; };
  for (const id of N.keys()) col(id);
  const conectado = id => sal.get(id).length || ent.get(id).length;
  const dibujados = [...N.keys()].filter(conectado), sueltos = [...N.keys()].filter(id => !conectado(id));
  // the order in each column: by the average place of their neighbours (a few sweeps), so that the arrows cross less
  const cols = []; for (const id of dibujados) (cols[prof.get(id)] ||= []).push(id);
  const orden = (a, b) => a.localeCompare(b);
  cols.forEach(c => c.sort(orden));
  const pos = new Map(); const fija = () => cols.forEach(c => c.forEach((id, i) => pos.set(id, i / Math.max(1, c.length - 1))));
  fija();
  for (let it = 0; it < 8; it++) {
    const vec = it % 2 ? sal : ent, L = it % 2 ? [...cols].reverse() : cols;
    for (const c of L) { const m = new Map(c.map(id => { const v = vec.get(id).filter(x => pos.has(x)); return [id, v.length ? v.reduce((s, x) => s + pos.get(x), 0) / v.length : pos.get(id)]; })); c.sort((a, b) => m.get(a) - m.get(b) || orden(a, b)); c.forEach((id, i) => pos.set(id, i / Math.max(1, c.length - 1))); }
  }
  const CW = 270, RH = 50, alto = Math.max(...cols.map(c => c.length));
  const xy = {}; cols.forEach((c, i) => { const off = (alto - c.length) * RH / 2; c.forEach((id, j) => { xy[id] = [40 + i * CW, 60 + off + j * RH]; }); });
  // the loose ones (no arrow in or out: they depend on the hour, the place, the qualities, not on facts of others)
  const datos = {
    nodos: [...N.values()].map(n => ({ ...n, x: xy[n.id]?.[0], y: xy[n.id]?.[1], c: prof.get(n.id), suelto: !xy[n.id] })),
    flechas: EN, cierra: CN, cols: cols.length,
    hechos: Object.fromEntries(Object.values(F).map(f => [f.h, { hace: [...f.hace], pide: [...f.pide], lee: [...f.lee], otros: [...f.otros] }])),
    puntos: d.puntos.map(([id, cuando, t]) => { const [a, b] = t.includes('|') ? t.split('|').map(x => x.trim()) : [id, t]; return { escena: 'escena ' + id, cuando, id: a, texto: b }; }),
    nunca: d.nunca, malas: d.malas, sinUso: d.sinUso, lazos, sueltos: sueltos.length,
  };
  const html = PAGINA.replace('/*@DATOS*/null', JSON.stringify(datos).replace(/</g, '\\u003c'));
  fs.writeFileSync(path.join(root, 'trazas/grafo.html'), html);
  return datos;
}
module.exports = { dibujar };

const PAGINA = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Grafo de Avonlea</title>
<style>
:root{--bg:#f6f1e7;--panel:#fffaf0;--ink:#2e2418;--sub:#7a6a55;--line:#d9cdb8;--edge:#9c8b73;--hi:#c0392b;--up:#2f6fb0;--down:#b5651d;
--escena:#dce8f5;--escenaB:#4a78a8;--conv:#dff0dc;--convB:#4f8a46;--mision:#ece0f5;--misionB:#7d55a0;--carta:#f8ecd2;--cartaB:#b0862f;--meta:#fbf0b8;--metaB:#a8901c;--sist:#e6e2dc;--sistB:#857c70}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]){--bg:#1d1a16;--panel:#26221d;--ink:#eee4d4;--sub:#a99a85;--line:#3d362d;--edge:#7d705f;--hi:#ff7a6a;--up:#79b0ea;--down:#f0a25a;
--escena:#22344a;--escenaB:#6d9fd4;--conv:#243c25;--convB:#7cbf71;--mision:#3a2b47;--misionB:#b18bd6;--carta:#45391f;--cartaB:#d6ad57;--meta:#46401a;--metaB:#d9c04a;--sist:#34312c;--sistB:#a59c90}}
:root[data-theme=dark]{--bg:#1d1a16;--panel:#26221d;--ink:#eee4d4;--sub:#a99a85;--line:#3d362d;--edge:#7d705f;--hi:#ff7a6a;--up:#79b0ea;--down:#f0a25a;
--escena:#22344a;--escenaB:#6d9fd4;--conv:#243c25;--convB:#7cbf71;--mision:#3a2b47;--misionB:#b18bd6;--carta:#45391f;--cartaB:#d6ad57;--meta:#46401a;--metaB:#d9c04a;--sist:#34312c;--sistB:#a59c90}
*{box-sizing:border-box}html,body{margin:0;height:100%}
body{background:var(--bg);color:var(--ink);font:14px/1.4 Georgia,'Times New Roman',serif;display:grid;grid-template-rows:auto 1fr;overflow:hidden}
header{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;padding:8px 16px;border-bottom:1px solid var(--line);background:var(--panel)}
header h1{font-size:17px;margin:0;font-weight:normal;font-style:italic}
header .st{color:var(--sub);font-size:13px}
input[type=search]{font:inherit;padding:5px 9px;border:1px solid var(--line);border-radius:7px;background:var(--bg);color:var(--ink);width:min(260px,100%)}
label{font-size:13px;color:var(--sub);white-space:nowrap;cursor:pointer}
button{font:inherit;font-size:13px;padding:4px 10px;border:1px solid var(--line);border-radius:7px;background:var(--bg);color:var(--ink);cursor:pointer}
button:hover{border-color:var(--sub)}
main{display:grid;grid-template-columns:1fr min(400px,38vw);min-height:0}
#lienzo{position:relative;overflow:hidden;cursor:grab;touch-action:none}
#lienzo.arrastra{cursor:grabbing}
svg{width:100%;height:100%;display:block}
aside{border-left:1px solid var(--line);background:var(--panel);overflow:auto;padding:12px 16px 40px;min-height:0}
aside h2{font-size:16px;margin:4px 0 2px;font-weight:normal;word-break:break-word}
aside h3{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--sub);margin:16px 0 6px;font-weight:normal}
aside p{margin:4px 0}
.fila{margin:5px 0;line-height:1.9}
details{margin-top:18px;border-top:1px solid var(--line);padding-top:8px}
summary{cursor:pointer;color:var(--sub);font-size:13px}
.chip{display:inline-block;margin:2px 3px 2px 0;padding:1px 7px;border-radius:10px;border:1px solid var(--line);font-size:12.5px;cursor:pointer;background:var(--bg)}
.chip:hover{border-color:var(--sub)}
.chip.no{text-decoration:line-through;opacity:.75}
.cond{font-family:ui-monospace,Menlo,monospace;font-size:12px}
.mut{color:var(--sub)}
.op{border-left:3px solid var(--line);padding:2px 0 2px 8px;margin:6px 0}
.tipo{font-size:12px;color:var(--sub)}
.leyenda span{display:inline-block;margin-right:10px;font-size:12px;color:var(--sub)}
.leyenda i{display:inline-block;width:12px;height:12px;border-radius:3px;vertical-align:-1px;margin-right:4px;border:1.5px solid}
.n rect{stroke-width:1.2}
.n text{font:12px Georgia,serif;fill:var(--ink);pointer-events:none}
.n text.id{font:11px ui-monospace,Menlo,monospace;fill:var(--sub)}
.n text.de{font:12.5px Georgia,serif}
.n{cursor:pointer}
.n.grande rect{stroke-width:2.6}
.n.sel rect{stroke:var(--hi);stroke-width:3}
.dim{opacity:.14}
path.e{fill:none;stroke:var(--edge);stroke-width:1.1;opacity:.55}
path.e.up{stroke:var(--up);opacity:.95;stroke-width:1.8}
path.e.down{stroke:var(--down);opacity:.95;stroke-width:1.8}
path.c{fill:none;stroke:var(--hi);stroke-width:1;stroke-dasharray:4 4;opacity:.45}
.colh{font:12px Georgia,serif;fill:var(--sub);font-style:italic}
.lista div{padding:3px 0;border-bottom:1px dotted var(--line);cursor:pointer;font-size:13px}
.lista div:hover{color:var(--hi)}
.zoom{position:absolute;right:10px;bottom:10px;display:flex;gap:6px}
.ayuda{position:absolute;left:10px;bottom:10px;font-size:12px;color:var(--sub);background:var(--panel);padding:4px 8px;border-radius:6px;border:1px solid var(--line);max-width:calc(100% - 140px)}
@media (max-width:760px){main{grid-template-columns:1fr;grid-template-rows:55vh 1fr}aside{border-left:0;border-top:1px solid var(--line)}header{padding:8px 16px}}
</style></head><body>
<header>
  <h1>El grafo de la historia</h1>
  <input type="search" id="buscar" list="todos" placeholder="Buscar escena, meta, hecho o palabra…" aria-label="Buscar">
  <datalist id="todos"></datalist>
  <label><input type="checkbox" id="vercierra"> «se cierra con» (- - -)</label>
  <label><input type="checkbox" id="soloRel"> ocultar lo que no se relaciona</label>
  <span class="st" id="st"></span>
</header>
<main>
  <div id="lienzo"><svg id="svg"><g id="vista"><g id="aristas"></g><g id="cierres"></g><g id="nodos"></g><g id="colsh"></g></g></svg>
    <div class="ayuda">Arrastra para moverte · rueda o pellizco para acercar · toca una caja</div>
    <div class="zoom"><button id="menos" aria-label="Alejar">−</button><button id="mas" aria-label="Acercar">+</button><button id="todo">Ver todo</button></div></div>
  <aside id="panel"></aside>
</main>
<script>
const D = /*@DATOS*/null;
const $ = id => document.getElementById(id), NS = 'http://www.w3.org/2000/svg';
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const NOD = new Map(D.nodos.map(n => [n.id, n]));
const TIPOS = { escena: ['Escena del guion', 'escena'], conversacion: ['Conversación', 'conv'], mision: ['Mini-misión', 'mision'], carta: ['Carta o respuesta', 'carta'], meta: ['Meta del cuaderno', 'meta'], sistema: ['El juego (llegadas, hitos, habilidades)', 'sist'] };
const PUNTO_DE = new Map(); for (const p of D.puntos) (PUNTO_DE.get(p.escena) || PUNTO_DE.set(p.escena, []).get(p.escena)).push(p);
const sal = new Map(), ent = new Map(); for (const n of D.nodos) { sal.set(n.id, []); ent.set(n.id, []); }
for (const [a, b, h] of D.flechas) { sal.get(a).push([b, h]); ent.get(b).push([a, h]); }
const alcanza = (id, M) => { const v = new Set([id]), q = [id]; while (q.length) for (const [x] of M.get(q.pop())) if (!v.has(x)) { v.add(x); q.push(x); } v.delete(id); return v; };
const W = 236, H = 40, nombre = n => n.tipo === 'meta' ? '◆ ' + n.k : n.k;
// the drawing
const el = (t, a, p) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
const curva = (a, b) => { const [x1, y1] = [a.x + W, a.y + H / 2], [x2, y2] = [b.x, b.y + H / 2], dx = Math.max(40, (x2 - x1) / 2); return \`M\${x1},\${y1} C\${x1 + dx},\${y1} \${x2 - dx},\${y2} \${x2},\${y2}\`; };
const vis = D.nodos.filter(n => !n.suelto);
const A = D.flechas.map(([a, b, hs]) => { const p = el('path', { class: 'e', d: curva(NOD.get(a), NOD.get(b)) }, $('aristas')); el('title', {}, p).textContent = hs.join(', '); return { a, b, p }; });
const Cs = D.cierra.filter(([a, b]) => !NOD.get(a).suelto && !NOD.get(b).suelto).map(([a, b, hs]) => { const p = el('path', { class: 'c', d: curva(NOD.get(a), NOD.get(b)) }, $('cierres')); el('title', {}, p).textContent = 'se cierra con: ' + hs.join(', '); return { a, b, p }; });
$('cierres').style.display = 'none';
const G = new Map();
for (const n of vis) {
  const t = TIPOS[n.tipo][1], g = el('g', { class: 'n' + (n.grande ? ' grande' : ''), transform: \`translate(\${n.x},\${n.y})\` }, $('nodos'));
  el('rect', { width: W, height: H, rx: n.tipo === 'meta' ? 12 : 4, style: \`fill:var(--\${t});stroke:var(--\${t}B)\` }, g);
  const corta = (t, m) => t.length > m ? t.slice(0, m - 1) + '…' : t;
  el('text', { x: 8, y: 15, class: 'id' }, g).textContent = corta((n.grande ? '★ ' : '') + (PUNTO_DE.has(n.id) ? '↺ ' : '') + nombre(n), 36);
  el('text', { x: 8, y: 31, class: 'de' }, g).textContent = corta(n.desc || '', 40);
  el('title', {}, g).textContent = n.k + (n.desc ? '\\n' + n.desc : '');
  g.addEventListener('click', e => { e.stopPropagation(); if (!movido) elegir(n.id); });
  G.set(n.id, g);
}
for (let c = 0; c < D.cols; c++) { const t = el('text', { class: 'colh', x: 40 + c * 270, y: 36 }, $('colsh')); t.textContent = c === 0 ? 'lo que no pide nada' : 'paso ' + c; }
// moving and zooming
let vx = 0, vy = 0, z = 1, movido = false;
const aplica = () => $('vista').setAttribute('transform', \`translate(\${vx},\${vy}) scale(\${z})\`);
const verTodo = () => { const r = $('lienzo').getBoundingClientRect(), w = 40 + D.cols * 270, h = Math.max(...vis.map(n => n.y)) + 60; z = Math.min(r.width / w, r.height / h, 1); vx = (r.width - w * z) / 2; vy = 10; aplica(); };
const zoomEn = (f, cx, cy) => { const nz = Math.min(3, Math.max(.08, z * f)); vx = cx - (cx - vx) * nz / z; vy = cy - (cy - vy) * nz / z; z = nz; aplica(); };
const ptr = new Map(); let pinch = 0;
$('lienzo').addEventListener('pointerdown', e => { $('lienzo').setPointerCapture(e.pointerId); ptr.set(e.pointerId, [e.clientX, e.clientY]); movido = false; $('lienzo').classList.add('arrastra'); });
$('lienzo').addEventListener('pointermove', e => { if (!ptr.has(e.pointerId)) return; const [px, py] = ptr.get(e.pointerId);
  if (ptr.size === 2) { const o = [...ptr.entries()].find(([k]) => k !== e.pointerId)[1], d0 = Math.hypot(px - o[0], py - o[1]), d1 = Math.hypot(e.clientX - o[0], e.clientY - o[1]), r = $('lienzo').getBoundingClientRect(); if (d0) zoomEn(d1 / d0, (e.clientX + o[0]) / 2 - r.left, (e.clientY + o[1]) / 2 - r.top); pinch = 1; }
  else { vx += e.clientX - px; vy += e.clientY - py; aplica(); }
  if (Math.abs(e.clientX - px) + Math.abs(e.clientY - py) > 2) movido = true; ptr.set(e.pointerId, [e.clientX, e.clientY]); });
const suelta = e => { ptr.delete(e.pointerId); if (!ptr.size) { $('lienzo').classList.remove('arrastra'); setTimeout(() => { movido = false; pinch = 0; }, 0); } };
$('lienzo').addEventListener('pointerup', suelta); $('lienzo').addEventListener('pointercancel', suelta);
$('lienzo').addEventListener('wheel', e => { e.preventDefault(); const r = $('lienzo').getBoundingClientRect(); zoomEn(Math.exp(-e.deltaY * .0015), e.clientX - r.left, e.clientY - r.top); }, { passive: false });
$('svg').addEventListener('click', () => { if (!movido) elegir(null); });
$('mas').onclick = () => { const r = $('lienzo').getBoundingClientRect(); zoomEn(1.3, r.width / 2, r.height / 2); };
$('menos').onclick = () => { const r = $('lienzo').getBoundingClientRect(); zoomEn(1 / 1.3, r.width / 2, r.height / 2); };
$('todo').onclick = verTodo;
const centra = id => { const n = NOD.get(id); if (!n || n.suelto) return; const r = $('lienzo').getBoundingClientRect(); if (z < .7) z = .9; vx = r.width / 2 - (n.x + W / 2) * z; vy = r.height / 2 - (n.y + H / 2) * z; aplica(); };
// choosing: what it needs (blue, all the way back) and what it opens (orange, all the way forward)
let sel = null;
function marca(){
  const solo = $('soloRel').checked, atras = sel ? alcanza(sel, ent) : null, adel = sel ? alcanza(sel, sal) : null, rel = id => !sel || id === sel || atras.has(id) || adel.has(id);
  for (const [id, g] of G) { g.classList.toggle('sel', id === sel); g.classList.toggle('dim', !rel(id)); g.style.display = solo && !rel(id) ? 'none' : ''; }
  for (const { a, b, p } of A) { const up = sel && (b === sel || atras.has(b)) && (a === sel || atras.has(a)), dn = sel && (a === sel || adel.has(a)) && (b === sel || adel.has(b));
    p.classList.toggle('up', !!up); p.classList.toggle('down', !!dn && !up); p.classList.toggle('dim', !!sel && !up && !dn); p.style.display = solo && sel && !up && !dn ? 'none' : ''; }
  for (const { a, b, p } of Cs) { const r = !sel || a === sel || b === sel; p.classList.toggle('dim', !r); p.style.display = solo && !r ? 'none' : ''; }
}
$('soloRel').onchange = marca;
$('vercierra').onchange = () => { $('cierres').style.display = $('vercierra').checked ? '' : 'none'; };
const chipN = id => { const n = NOD.get(id); return n ? \`<span class="chip" data-n="\${esc(id)}" title="\${esc(TIPOS[n.tipo][0] + (n.desc ? ': ' + n.desc : ''))}">\${esc(nombre(n))}</span>\` : \`<span class="chip mut" title="no es una caja del dibujo">\${esc(id)}</span>\`; };
const chipH = (h, no) => \`<span class="chip\${no ? ' no' : ''}" data-h="\${esc(h)}">\${esc(h)}</span>\`;
// a condition, written as the script has it; the facts in it, clickable
const condHtml = s => s.split(',').map(c => c.trim()).filter(Boolean).map(c => { const m = c.match(/^(!?)(hecho|dias_desde|no_hoy):([a-z_0-9]+)/); return m && D.hechos[m[3]] ? chipH(m[3], (m[1] === '!') !== (m[2] === 'no_hoy')) + (m[2] !== 'hecho' ? \`<span class="cond mut">\${esc(c.replace(m[3], '…'))}</span> \` : '') : \`<span class="chip cond mut">\${esc(c)}</span>\`; }).join('');
const accHtml = s => { const m = s.match(/^(hecho|olvidar)\\s+(\\S+)/); return m && D.hechos[m[2]] ? (m[1] === 'olvidar' ? 'olvida ' : '') + chipH(m[2]) : \`<span class="cond">\${esc(s)}</span>\`; };
// a condition that is not a fact, said in words (the hour, the place, who is there, a quality)
const CUAL = { '>=': '≥', '<=': '≤', '>': '>', '<': '<', '==': '=', '=': '=' };
function enPalabras(c){
  let m;
  if ((m = c.match(/^hora:([\\d.]+)-([\\d.]+)$/))) return \`entre las \${m[1]} y las \${m[2]} h\`;
  if ((m = c.match(/^([a-zñ_]+):([a-zñ_]+)(?::([a-zñ_]+))?\\s*(>=|<=|>|<|==|=)\\s*(-?[\\d.]+)$/))) return \`\${m[1]} de \${m[2]}\${m[3] ? ' hacia ' + m[3] : ''} \${CUAL[m[4]]} \${m[5]}\`;
  if ((m = c.match(/^(!?)donde:(\\w+):(\\w+)$/))) return \`\${m[2]} \${m[1] ? 'no está' : 'está'} en \${m[3]}\`;
  if ((m = c.match(/^(!?)presente:(\\w+)$/))) return \`\${m[2]} \${m[1] ? 'no ' : ''}anda por Avonlea\`;
  if ((m = c.match(/^(!?)ve:(\\w+)$/))) return \`\${m[1] ? 'sin que la vea' : 'la ve'} \${m[2]}\`;
  if ((m = c.match(/^estacion:(\\w+)$/))) return 'en ' + m[1];
  if ((m = c.match(/^(!?)(cuaderno):(\\w+)$/))) return \`\${m[1] ? 'sin' : 'con'} la meta «\${m[3]}» cumplida\`;
  if ((m = c.match(/^(!?)dicha:(\\w+)$/))) return \`\${m[1] ? 'antes de' : 'después de'} la escena \${m[2]}\`;
  if ((m = c.match(/^sentada:(\\w+)$/))) return \`\${m[1]} sentada a la mesa\`;
  if ((m = c.match(/^tomando_te:(\\w+):(\\w+)$/))) return \`\${m[1]} y \${m[2]} tomando el té\`;
  return c;
}
// the conditions of a scene, sorted: the facts it needs (and from where), the facts that must NOT have happened (that
// is how the branches exclude each other), and the rest (when and where: no arrows, but they decide too)
function partes(n){
  const i = n.info, si = (i.si || '').split(',').map(c => c.trim()).filter(Boolean), nec = [], no = [], resto = [];
  for (const c of si) { const m = c.match(/^(!?)(hecho|dias_desde|no_hoy):([a-z_0-9]+)(?::(\\d+))?/);
    if (!m) { resto.push(enPalabras(c)); continue; }
    const neg = (m[1] === '!') !== (m[2] === 'no_hoy');
    if (m[2] === 'no_hoy') (neg ? no : nec).push([m[3], neg ? 'hoy' : 'hoy']);
    else if (m[2] === 'dias_desde') nec.push([m[3], m[4] + (m[4] === '1' ? ' día' : ' días') + ' después']);
    else (neg ? no : nec).push([m[3], '']); }
  for (const r of i.requiere || []) { if (NOD.has('meta ' + r)) nec.push(['meta ' + r, 'meta']); else { const m = r.match(/^(!?)hecho:(\\w+)$/); if (m) (m[1] ? no : nec).push([m[2], '']); else resto.push(enPalabras(r)); } }
  return { nec, no, resto };
}
// what a scene leaves: always (al empezar, al terminar, after it by the game), or only if Ana chooses an option
function dejaDe(n){
  const i = n.info, L = [], hechoEn = s => s.match(/^hecho\\s+(\\S+)/)?.[1];
  for (const s of [...(i.empieza || []), ...(i.termina || [])]) { const h = hechoEn(s); if (h) L.push([h, '']); }
  for (const o of i.ops || []) for (const s of o.ef) { const h = hechoEn(s); if (h) L.push([h, 'si elige «' + o.t.replace(/^«|»$/g, '') + '»']); }
  for (const [h, f] of Object.entries(D.hechos)) if (f.hace.includes(n.id) && !L.some(([x]) => x === h)) L.push([h, 'lo deja el juego después']);
  return L;
}
const quien = h => (D.hechos[h]?.hace || []).map(w => w === 'código' ? '<span class="chip mut" title="lo deja el código del juego">⚙ el juego</span>' : chipN(w)).join('') || '<span class="mut">nadie</span>';
const aQuien = h => { const L = (D.hechos[h]?.pide || []).filter(w => w !== sel); return L.length ? '<span class="mut">→ lo necesita</span> ' + L.map(chipN).join('') : '<span class="mut">→ nadie lo necesita</span>'; };
function elegir(id, sinCentrar){
  sel = id && NOD.has(id) ? id : null; marca();
  if (!sel) return inicio();
  const n = NOD.get(sel), i = n.info, P = $('panel'), { nec, no, resto } = partes(n), deja = dejaDe(n);
  let h = \`<div class="tipo">\${esc(TIPOS[n.tipo][0])}\${n.grande ? ' · ★ grande' : ''}\${n.c != null ? ' · paso ' + n.c : ' · suelta'}</div><h2>\${esc(n.k)}</h2>\${n.desc ? '<p><b>' + esc(n.desc) + '</b></p>' : ''}\`;
  for (const p of PUNTO_DE.get(sel) || []) h += \`<p>↺ Punto para volver: \${esc(p.texto)}</p>\`;
  // 1. what it needs
  h += '<h3>Necesita</h3>';
  h += nec.length ? nec.map(([x, q]) => q === 'meta' ? \`<p class="fila">\${chipN(x)} <span class="mut">(meta cumplida)</span></p>\` : \`<p class="fila">\${chipH(x)}\${q ? ' <span class="mut">' + esc(q) + '</span>' : ''} <span class="mut">← lo deja</span> \${quien(x)}</p>\`).join('') : '<p class="mut">Ningún hecho: puede pasar desde el comienzo.</p>';
  if (no.length) h += '<p class="fila"><span class="mut">y que todavía no haya pasado:</span> ' + no.map(([x]) => chipH(x, true)).join('') + '</p>';
  if (resto.length) h += '<p class="fila mut">cuándo: ' + resto.map(esc).join(' · ') + '</p>';
  // 2. what it leaves
  h += '<h3>Deja</h3>';
  h += deja.length ? deja.map(([x, q]) => \`<p class="fila">\${chipH(x)}\${q ? ' <span class="mut">' + esc(q) + '</span>' : ''} \${aQuien(x)}</p>\`).join('') : '<p class="mut">Ningún hecho.</p>';
  // the rest, folded: the text, the options, everything it does
  let det = '';
  if (i.narra) det += \`<p class="mut"><i>\${esc(i.narra)}\${i.narra.length >= 260 ? '…' : ''}</i></p>\`; else if (i.primera) det += \`<p class="mut"><i>\${esc(i.primera)}</i></p>\`;
  if (i.pista) det += \`<p class="mut">Pista: \${esc(i.pista)}</p>\`;
  if (i.meta) det += \`<p class="tipo">Está cumplida cuando: <span class="cond">\${esc(i.meta)}</span></p>\`;
  const donde = [i.con && 'con ' + i.con, i.canal && 'canal ' + i.canal, i.prioridad && 'prioridad ' + i.prioridad, i.repetir && 'se repite: ' + i.repetir, i.en && 'en: ' + i.en, i.cerca && 'cerca: ' + i.cerca, i.donde && 'donde: ' + i.donde, i.lineas && i.lineas + ' líneas'].filter(Boolean);
  if (donde.length) det += \`<p class="tipo">\${esc(donde.join(' · '))}</p>\`;
  if (i.si) det += \`<p class="tipo">si: <span class="cond">\${esc(i.si)}</span></p>\`;
  if (i.ops?.length) det += '<p class="tipo">Opciones:</p>' + i.ops.map(o => \`<div class="op">\${o.propia ? '→* ' : '→ '}\${esc(o.t)}\${o.ef.length ? '<br><span class="cond mut">' + o.ef.map(esc).join(' · ') + '</span>' : ''}</div>\`).join('');
  const hace = [...(i.empieza || []).map(x => 'al empezar: ' + x), ...(i.termina || []).map(x => 'al terminar: ' + x)];
  if (hace.length) det += '<p class="tipo">Lo que hace:</p>' + hace.map(x => \`<p class="cond mut">\${esc(x)}</p>\`).join('');
  if (det) h += '<details><summary>Detalles (texto, opciones, todo lo que hace)</summary>' + det + '</details>';
  P.innerHTML = h; P.scrollTop = 0; if (!sinCentrar) centra(sel); location.replace('#' + encodeURIComponent(sel));
}
function hecho(h){
  const f = D.hechos[h]; if (!f) return; sel = null; marca();
  const P = $('panel');
  let x = \`<div class="tipo">Hecho</div><h2>\${esc(h)}</h2>\`;
  x += '<h3>Lo dejan</h3>' + (f.hace.length ? f.hace.map(chipN).join('') : '<p class="mut">Nadie (nunca pasa).</p>');
  x += '<h3>Lo necesitan</h3>' + (f.pide.length ? f.pide.map(chipN).join('') : '<p class="mut">Nadie.</p>');
  x += '<h3>Lo leen sin necesitarlo (se cierran con él, o esperan un día)</h3>' + (f.lee.length ? f.lee.map(chipN).join('') : '<p class="mut">Nadie.</p>');
  if (f.otros.length) x += '<h3>También lo miran</h3><p class="tipo">' + f.otros.map(esc).join(' · ') + '</p>';
  P.innerHTML = x; P.scrollTop = 0;
  for (const [id, g] of G) g.classList.toggle('dim', !f.hace.includes(id) && !f.pide.includes(id) && !f.lee.includes(id));
  for (const { p } of A) p.classList.add('dim');
}
$('panel').addEventListener('click', e => { const c = e.target.closest('.chip'); if (!c) return; if (c.dataset.n) elegir(c.dataset.n); else if (c.dataset.h) hecho(c.dataset.h); });
// the start: what the drawing is, the points, what never could happen, the loose ones
function inicio(){
  const sueltos = D.nodos.filter(n => n.suelto), porTipo = t => sueltos.filter(n => n.tipo === t);
  let h = '<h2>Cómo leerlo</h2><p>Cada escena dice dos cosas: qué hechos <b>necesita</b> y qué hechos <b>deja</b>. Con eso el grafo sale solo: la flecha va de la escena que deja un hecho a la que lo necesita (pasa el ratón por la flecha para ver cuál). De izquierda a derecha, el orden de la historia.</p>';
  h += '<p>Lo que no son flechas, pero también decide, va en una línea aparte en cada escena: <b>que algo todavía no haya pasado</b> (así se excluyen los caminos: si Marilla ya decidió, ya no se va a White Sands) y <b>cuándo</b> (la hora, el lugar, quién está, la paciencia o el afecto). Y lo que deja puede depender de lo que Ana elija.</p>';
  h += '<p>Toca una caja: en <span style="color:var(--up)">azul</span>, todo lo que tiene que pasar antes; en <span style="color:var(--down)">naranja</span>, todo lo que abre después.</p>';
  h += '<div class="leyenda">' + Object.values(TIPOS).map(([t, k]) => \`<span><i style="background:var(--\${k});border-color:var(--\${k}B)"></i>\${t}</span>\`).join('') + '<span>★ grande (del libro)</span><span>↺ punto para volver</span><span>◆ meta</span></div>';
  h += '<h3>Puntos para volver</h3><div class="lista">' + D.puntos.map(p => \`<div data-n="\${esc(p.escena)}">↺ \${esc(p.texto)} <span class="mut">· \${esc(p.escena.slice(7))}, \${esc(p.cuando)}</span></div>\`).join('') + '</div>';
  h += '<h3>Lo que nunca podría pasar</h3>' + (D.nunca.length ? D.nunca.map(x => chipH(x)).join('') : '<p class="mut">Nada: todo hecho que se pide, algo lo deja.</p>');
  h += '<h3>Condiciones mal escritas</h3>' + (D.malas.length ? D.malas.map(m => '<p class="cond">' + esc(m) + '</p>').join('') : '<p class="mut">Ninguna.</p>');
  if (D.lazos.length) h += '<h3>Círculos</h3>' + D.lazos.map(chipN).join('');
  h += \`<h3>Sueltas (\${sueltos.length}): no necesitan ni abren hechos</h3><p class="mut">Pasan por la hora, el lugar, quién está o una cualidad (la paciencia, el afecto), no por otra escena.</p>\`;
  for (const t of Object.keys(TIPOS)) { const L = porTipo(t); if (L.length) h += \`<p class="tipo">\${esc(TIPOS[t][0])} (\${L.length})</p>\` + L.map(n => chipN(n.id)).join(''); }
  h += '<h3>Hechos que se dejan y nada lee</h3>' + (D.sinUso.length ? D.sinUso.map(x => chipH(x)).join('') : '<p class="mut">Ninguno.</p>');
  $('panel').innerHTML = h;
}
$('panel').addEventListener('click', e => { const r = e.target.closest('.lista div'); if (r) elegir(r.dataset.n); });
// searching: a box (by its name) or a fact
$('todos').innerHTML = [...D.nodos.map(n => n.k), ...Object.keys(D.hechos).map(h => 'hecho: ' + h)].sort().map(s => \`<option value="\${esc(s)}">\`).join('');
$('buscar').addEventListener('change', () => { const v = $('buscar').value.trim(); if (!v) return; if (v.startsWith('hecho: ')) return hecho(v.slice(7));
  const lv = v.toLowerCase(), n = D.nodos.find(n => n.k === v) || D.nodos.find(n => n.k.includes(v)) || D.nodos.find(n => (n.desc || '').toLowerCase().includes(lv)); if (n) elegir(n.id); else if (D.hechos[v]) hecho(v); });
$('st').textContent = \`\${D.nodos.length} cajas (\${vis.length} en cadenas, \${D.sueltos} sueltas) · \${D.flechas.length} flechas · \${Object.keys(D.hechos).length} hechos · \${D.puntos.length} puntos\${D.nunca.length || D.malas.length ? ' · ⚠ ' + (D.nunca.length + D.malas.length) + ' problemas' : ''}\`;
verTodo(); inicio();
const deHash = () => { const h0 = decodeURIComponent(location.hash.slice(1)); if (h0 && NOD.has(h0) && h0 !== sel) elegir(h0); };
deHash(); addEventListener('hashchange', deHash);
addEventListener('resize', () => { if (!sel) verTodo(); });
</script></body></html>
`;
