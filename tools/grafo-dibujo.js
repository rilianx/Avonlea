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
<title>Escenas de Avonlea</title>
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
.et{display:inline-block;min-width:92px;font-size:11.5px;letter-spacing:.04em;color:var(--sub);font-variant:small-caps}
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
.tabs button{border-radius:0}.tabs button:first-child{border-radius:7px 0 0 7px}.tabs button:last-child{border-radius:0 7px 7px 0;border-left:0}
.tabs button.on{background:var(--ink);color:var(--bg);border-color:var(--ink)}
#lista{overflow:auto;padding:12px 16px 60px;min-height:0}
#lista .esc{max-width:980px;margin:0 auto 10px;padding:9px 12px;border:1px solid var(--line);border-left-width:4px;border-radius:6px;background:var(--panel)}
#lista .esc.marca{outline:2px solid var(--hi)}
#lista .cab{display:flex;flex-wrap:wrap;gap:4px 10px;align-items:baseline}
#lista .cab b{font:13px ui-monospace,Menlo,monospace}
#lista .de{margin:2px 0 4px}
#lista .r{font-size:13px;line-height:1.8;margin:1px 0}
#lista .r .et{min-width:70px}
#lista a{color:var(--up);text-decoration:none;font:12.5px ui-monospace,Menlo,monospace;margin-right:6px;cursor:pointer}
#lista a:hover{text-decoration:underline}
#lista .h{font:12.5px ui-monospace,Menlo,monospace;padding:0 5px;border-radius:4px;background:var(--bg);border:1px solid var(--line);cursor:pointer}
#lista .h.no{text-decoration:line-through}
#lista .fuente{font-size:12px;color:var(--sub)}
#lista .fuente a{font-size:11.5px}
#lista .vermas{cursor:pointer;color:var(--up);font-size:12px;padding:0 4px;border:1px solid var(--line);border-radius:8px}
#lista .grupo{max-width:980px;margin:18px auto 8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--sub)}
#lista .filtros{max-width:980px;margin:0 auto 10px;display:flex;flex-wrap:wrap;gap:6px 14px;font-size:13px;color:var(--sub)}
#navlista{display:none;position:fixed;right:16px;bottom:16px;gap:6px;z-index:5}body.vlista #navlista{display:flex}#navlista button{background:var(--panel);box-shadow:0 2px 8px rgba(0,0,0,.15)}
body.vlista main{display:none}body.vlista #lista{display:block}body.vlista .solografo{display:none}
</style></head><body>
<header>
  <h1>Las escenas de la historia</h1>
  <span class="tabs"><button id="tabLista" class="on">Lista</button><button id="tabGrafo">Grafo</button></span>
  <input type="search" id="buscar" list="todos" placeholder="Buscar escena, meta, hecho o palabra…" aria-label="Buscar">
  <datalist id="todos"></datalist>
  <label class="solografo"><input type="checkbox" id="vercierra"> «se cierra con» (- - -)</label>
  <label class="solografo"><input type="checkbox" id="soloRel"> ocultar lo que no se relaciona</label>
  <span class="st" id="st"></span>
</header>
<section id="lista" hidden></section>
<div id="navlista"><button id="atras" title="Volver a la escena anterior">← atrás</button><button id="adelante" title="Avanzar">adelante →</button></div>
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
  if ((m = c.match(/^avance:(\\w+):([\\d.]+)-([\\d.]+)$/))) return \`en el viaje (\${m[1] === 'ws' ? 'a White Sands' : m[1]}), entre el \${m[2]} y el \${m[3]} % del camino\`;
  if ((m = c.match(/^(!?)(cuaderno):(\\w+)$/))) return \`\${m[1] ? 'sin' : 'con'} la meta «\${m[3]}» cumplida\`;
  if ((m = c.match(/^(!?)dicha:(\\w+)$/))) return \`\${m[1] ? 'antes de' : 'después de'} la escena \${m[2]}\`;
  if ((m = c.match(/^sentada:(\\w+)$/))) return \`\${m[1]} sentada a la mesa\`;
  if ((m = c.match(/^tomando_te:(\\w+):(\\w+)$/))) return \`\${m[1]} y \${m[2]} tomando el té\`;
  return c;
}
// the conditions of a scene, sorted: the facts it needs (and from where), the facts that must NOT have happened (that
// is how the branches exclude each other), and the rest (when and where: no arrows, but they decide too)
function partes(n){
  const i = n.info, si = (i.si || '').split(',').map(c => c.trim()).filter(Boolean), nec = [], no = [], cont = [], resto = [], crudo = [];
  for (const c of si) { const m = c.match(/^(!?)(hecho|dias_desde|no_hoy):([a-z_0-9]+)(?::(\\d+))?/);
    if (!m) { const qm = c.match(/^([a-zñ_]+):([a-zñ_]+)(?::([a-zñ_]+))?\\s*(>=|<=|>|<|==|=)\\s*(-?[\\d.]+)$/); if (qm) cont.push({ k: qm[1] + ':' + qm[2] + ':' + (qm[3] || ''), t: enPalabras(c) }); else { resto.push(enPalabras(c)); crudo.push(c); } continue; }
    const neg = (m[1] === '!') !== (m[2] === 'no_hoy');
    if (m[2] === 'no_hoy') (neg ? no : nec).push([m[3], neg ? 'hoy' : 'hoy']);
    else if (m[2] === 'dias_desde') nec.push([m[3], m[4] + (m[4] === '1' ? ' día' : ' días') + ' después']);
    else (neg ? no : nec).push([m[3], '']); }
  for (const r of i.requiere || []) { if (NOD.has('meta ' + r)) nec.push(['meta ' + r, 'meta']); else { const m = r.match(/^(!?)hecho:(\\w+)$/); if (m) (m[1] ? no : nec).push([m[2], '']); else resto.push(enPalabras(r)); } }
  return { nec, no, cont, resto, crudo };
}
// what a scene leaves: always (al empezar, al terminar, after it by the game), or only if Ana chooses an option
function dejaDe(n){
  const i = n.info, L = [], hechoEn = s => s.match(/^hecho\\s+(\\S+)/)?.[1];
  for (const s of [...(i.empieza || []), ...(i.termina || [])]) { const h = hechoEn(s); if (h) L.push([h, '']); }
  for (const o of i.ops || []) for (const s of o.ef) { const h = hechoEn(s); if (h) L.push([h, 'si elige «' + o.t.replace(/^«|»$/g, '') + '»']); }
  for (const [h, f] of Object.entries(D.hechos)) if (f.hace.includes(n.id) && !L.some(([x]) => x === h)) L.push([h, 'lo deja el juego, después']);
  return L;
}
// what a scene changes in the counters (the qualities: Marilla's patience, the affection, Ana's skills), and when
function cambiosDe(n){
  const i = n.info, L = [], de = (s, q) => { let m;
    if ((m = s.match(/^suma\\s+([a-zñ_]+):([a-zñ_]+)(?::([a-zñ_]+))?\\s+(-?[\\d.]+)/))) L.push([\`\${m[1]} de \${m[2]}\${m[3] ? ' hacia ' + m[3] : ''} \${+m[4] > 0 ? '+' : ''}\${m[4]}\`, q, m[1] + ':' + m[2] + ':' + (m[3] || '')]);
    else if ((m = s.match(/^afecto\\s+(\\w+)\\s+(\\w+)\\s+(\\d+)/))) L.push([\`afecto de \${m[1]} hacia \${m[2]}: al menos \${m[3]}\`, q, 'afecto:' + m[1] + ':' + m[2]]);
    else if ((m = s.match(/^ofensa\\s+(\\w+)\\s+(\\w+)/))) L.push([\`\${m[1]} se ofende con \${m[2]}\`, q]); };
  for (const s of [...(i.empieza || []), ...(i.termina || [])]) de(s, '');
  for (const o of i.ops || []) for (const s of o.ef) de(s, 'si elige «' + o.t.replace(/^«|»$/g, '') + '»');
  return L;
}
const quien = h => (D.hechos[h]?.hace || []).map(w => w === 'código' ? '<span class="chip mut" title="lo deja el código del juego">⚙ el juego</span>' : chipN(w)).join('') || '<span class="mut">nadie</span>';
const aQuien = h => { const L = (D.hechos[h]?.pide || []).filter(w => w !== sel); return L.length ? '<span class="mut">→ lo necesita</span> ' + L.map(chipN).join('') : '<span class="mut">→ nadie lo necesita</span>'; };
function elegir(id, sinCentrar){
  sel = id && NOD.has(id) ? id : null; marca();
  if (!sel) return inicio();
  const n = NOD.get(sel), i = n.info, P = $('panel'), { nec, no, cont, resto } = partes(n), deja = dejaDe(n);
  let h = \`<div class="tipo">\${esc(TIPOS[n.tipo][0])}\${n.grande ? ' · ★ grande' : ''}\${n.c != null ? ' · paso ' + n.c : ' · suelta'}</div><h2>\${esc(n.k)}</h2>\${n.desc ? '<p><b>' + esc(n.desc) + '</b></p>' : ''}\`;
  for (const p of PUNTO_DE.get(sel) || []) h += \`<p>↺ Punto para volver: \${esc(p.texto)}</p>\`;
  // a scene is two things: what the state must be before (requires), and how it changes it (changes). The state: the
  // facts (what happened), the counters (qualities, of someone or towards someone) and the situation (when, where, who)
  const fila = (t, x) => \`<p class="fila"><span class="et">\${t}</span> \${x}</p>\`;
  h += '<h3>Requiere (el estado antes)</h3>';
  if (!nec.length && !no.length && !cont.length && !resto.length) h += '<p class="mut">Nada: puede pasar desde el comienzo.</p>';
  for (const [x, q] of nec) h += fila('hecho', q === 'meta' ? \`\${chipN(x)} <span class="mut">(meta cumplida)</span>\` : \`\${chipH(x)}\${q ? ' <span class="mut">' + esc(q) + '</span>' : ''} <span class="mut">← lo deja</span> \${quien(x)}\`);
  if (no.length) h += fila('no ha pasado', no.map(([x]) => chipH(x, true)).join(''));
  if (cont.length) h += fila('contador', cont.map(c => esc(c.t)).join(' · '));
  if (resto.length) h += fila('situación', resto.map(esc).join(' · '));
  const cambios = cambiosDe(n);
  h += '<h3>Cambia (el estado después)</h3>';
  if (!deja.length && !cambios.length) h += '<p class="mut">Nada.</p>';
  for (const [x, q] of deja) h += fila('hecho', \`\${chipH(x)}\${q ? ' <span class="mut">' + esc(q) + '</span>' : ''} \${aQuien(x)}\`);
  for (const [x, q] of cambios) h += fila('contador', esc(x) + (q ? ' <span class="mut">' + esc(q) + '</span>' : ''));
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
  let h = '<h2>Cómo leerlo</h2><p>Cada escena es dos cosas: lo que <b>requiere</b> del estado y cómo lo <b>cambia</b>. El estado tiene <b>hechos</b> (lo que pasó), <b>contadores</b> (la paciencia de Marilla, el afecto, las habilidades de Ana) y la <b>situación</b> (la hora, el lugar, quién está), que la mueve el mundo: el reloj, las rutinas, la jugadora.</p>';
  h += '<p>Las flechas son los hechos: van de la escena que deja uno a la que lo necesita (pasa el ratón por la flecha para ver cuál). De izquierda a derecha, el orden de la historia. Lo demás (lo que no tiene que haber pasado, los contadores, la situación) se ve en cada escena.</p>';
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
$('buscar').addEventListener('change', () => { const v = $('buscar').value.trim(); if (!v || document.body.classList.contains('vlista')) return; if (v.startsWith('hecho: ')) return hecho(v.slice(7));
  const lv = v.toLowerCase(), n = D.nodos.find(n => n.k === v) || D.nodos.find(n => n.k.includes(v)) || D.nodos.find(n => (n.desc || '').toLowerCase().includes(lv)); if (n) elegir(n.id); else if (D.hechos[v]) hecho(v); });
$('st').textContent = \`\${D.nodos.length} cajas (\${vis.length} en cadenas, \${D.sueltos} sueltas) · \${D.flechas.length} flechas · \${Object.keys(D.hechos).length} hechos · \${D.puntos.length} puntos\${D.nunca.length || D.malas.length ? ' · ⚠ ' + (D.nunca.length + D.malas.length) + ' problemas' : ''}\`;
// the list: each scene, what it requires and what it changes; and, for each change, the scenes that need it directly
const TIPCOL = { escena: 'escenaB', conversacion: 'convB', mision: 'misionB', carta: 'cartaB', meta: 'metaB', sistema: 'sistB' };
const necesitanCont = {}, cambianCont = {}; for (const n of D.nodos) { for (const c of partes(n).cont) (necesitanCont[c.k] ||= []).push(n.id); if (n.tipo !== 'meta') for (const c of cambiosDe(n)) if (c[2]) ((cambianCont[c[2]] ||= new Set())).add(n.id); }
// who changes what a scene needs: every condition alike (a fact: the scenes that leave it; a counter: the scenes that
// add to it, and the game; the situation: the clock, the cart, the player and the routines)
const MUEVE = c => /^!?hora:/.test(c) ? 'el reloj' : /^avance:/.test(c) ? 'la calesa' : /^(!?)(estacion|dia_|domingo)/.test(c) ? 'el calendario' : 'la jugadora y las rutinas';
const juego = t => \`<span class="mut">⚙ \${esc(t)}</span>\`;
const enlace = id => { const n = NOD.get(id); return n ? \`<a data-ir="\${esc(id)}" title="\${esc(n.desc || '')}">\${esc(nombre(n))}</a>\` : \`<span class="mut">\${esc(id === 'código' ? '⚙ el juego' : id)}</span>\`; };
const hchip = (h, no) => \`<span class="h\${no ? ' no' : ''}" data-hf="\${esc(h)}" title="filtrar por este hecho">\${esc(h)}</span>\`;
function tarjeta(n){
  const { nec, no, cont, resto } = partes(n), deja = n.tipo === 'meta' ? [] : dejaDe(n), cam = n.tipo === 'meta' ? [] : cambiosDe(n);
  const de = x => { const L = (D.hechos[x]?.hace || []).filter(w => w !== n.id); return L.some(w => w !== 'código') ? L.filter(w => w !== 'código') : L; };   // (the code, only when no scene is named for it)   // (who leaves it: the way back, to the left)
  // each line: the condition first; then, smaller, who changes it (the first ones, and «+n» for the rest)
  const { crudo } = partes(n), quienes = L => { if (!L.length) return ''; const v = L.length > 3 ? L.slice(0, 2).join(' ') + \` <span class="resto" hidden>\${L.slice(2).join(' ')}</span> <span class="vermas">+\${L.length - 2}</span>\` : L.join(' '); return ' <span class="fuente">← ' + v + '</span>'; };
  const desde = x => de(x).map(w => w === 'código' ? juego('el juego') : enlace(w));
  const req = [...nec.map(([x, q]) => q === 'meta' ? enlace(x) + ' <span class="mut">(meta cumplida)</span>' : hchip(x) + (q ? ' <span class="mut">' + esc(q) + '</span>' : '') + quienes(desde(x))),
    ...no.map(([x]) => '<span class="mut">que no haya pasado</span> ' + hchip(x, true) + quienes(desde(x))),
    ...cont.map(c => '<span class="cv">' + esc(c.t) + '</span>' + quienes([...[...(cambianCont[c.k] || [])].filter(w => w !== n.id).map(enlace), juego('el juego')])),
    ...resto.map((t, j) => '<span class="cv">' + esc(t) + '</span>' + quienes([juego(MUEVE(crudo[j] || ''))]))];
  const act = [...deja.map(([x, q]) => { const L = (D.hechos[x]?.pide || []).filter(w => w !== n.id); return hchip(x) + (q ? ' <span class="mut">' + esc(q) + '</span>' : '') + ' <span class="fuente">→ ' + (L.length ? (L.length > 3 ? L.slice(0, 2).map(enlace).join(' ') + \` <span class="resto" hidden>\${L.slice(2).map(enlace).join(' ')}</span> <span class="vermas">+\${L.length - 2}</span>\` : L.map(enlace).join(' ')) : 'nadie') + '</span>'; }),
    ...cam.map(([t, q, k]) => { const L = (necesitanCont[k] || []).filter(w => w !== n.id); return esc(t) + (q ? ' <span class="mut">' + esc(q) + '</span>' : '') + ' <span class="mut">→</span> ' + (L.length ? L.map(enlace).join(' ') : '<span class="mut">nadie lo mira</span>'); })];
  const marcas = (n.grande ? ' ★' : '') + (PUNTO_DE.has(n.id) ? ' ↺' : '');
  return \`<div class="esc" id="e-\${esc(n.id)}" style="border-left-color:var(--\${TIPCOL[n.tipo]})" data-txt="\${esc((n.k + ' ' + (n.desc || '') + ' ' + [...nec.map(x => x[0]), ...no.map(x => x[0]), ...deja.map(x => x[0]), ...cont.map(c => c.t), ...cam.map(c => c[0])].join(' ')).toLowerCase())}" data-tipo="\${n.tipo}">
    <div class="cab"><b>\${esc(nombre(n))}\${marcas}</b><span class="tipo">\${esc(TIPOS[n.tipo][0])}\${n.c != null ? ' · paso ' + n.c : ''}</span></div>
    \${n.desc ? '<div class="de">' + esc(n.desc) + '</div>' : ''}
    <div class="r"><span class="et">necesita</span> \${req.length ? req.join('<br><span class="et"></span> ') : '<span class="mut">nada</span>'}</div>
    <div class="r"><span class="et">actualiza</span> \${act.length ? act.join('<br><span class="et"></span> ') : '<span class="mut">nada</span>'}</div></div>\`;
}
function listaArmar(){
  const L = D.nodos.filter(n => n.tipo !== 'sistema').sort((a, b) => (a.c ?? 99) - (b.c ?? 99) || a.k.localeCompare(b.k));
  let h = '<div class="filtros">' + Object.entries(TIPOS).filter(([t]) => t !== 'sistema').map(([t, [nom]]) => \`<label><input type="checkbox" data-ft="\${t}" checked> \${esc(nom)}</label>\`).join('') + '</div>';
  let paso = null;
  for (const n of L) { const p = n.c ?? 'sueltas'; if (p !== paso) { paso = p; h += \`<div class="grupo" data-grupo="\${p}">\${p === 'sueltas' ? 'Sin hechos de otras escenas: solo contadores y situación' : p === 0 ? 'Paso 0: no necesitan hechos de otras escenas' : 'Paso ' + p}</div>\`; } h += tarjeta(n); }
  $('lista').innerHTML = h; listaFiltrar();
}
function listaFiltrar(){
  const q = ($('buscar').value || '').trim().toLowerCase(), tipos = new Set([...document.querySelectorAll('[data-ft]')].filter(x => x.checked).map(x => x.dataset.ft)), sueltas = $('fsueltas')?.checked;
  for (const e of document.querySelectorAll('#lista .esc')) { const n = NOD.get(e.id.slice(2)); e.hidden = !tipos.has(e.dataset.tipo) || (q && !e.dataset.txt.includes(q)); }
  for (const g of document.querySelectorAll('#lista .grupo')) { let x = g.nextElementSibling, alguno = false; while (x && x.classList.contains('esc')) { if (!x.hidden) alguno = true; x = x.nextElementSibling; } g.hidden = !alguno; }
}
function irA(id, sinHistoria){
  const e = document.getElementById('e-' + id); if (!e) return;
  if (!sinHistoria) history.pushState({ ir: id }, '', '#' + encodeURIComponent(id));   // (back and forward: the browser's, and the arrows)
  if (e.hidden) { $('buscar').value = ''; if (NOD.get(id).suelto && $('fsueltas')) $('fsueltas').checked = true; const c = document.querySelector('[data-ft="' + NOD.get(id).tipo + '"]'); if (c) c.checked = true; listaFiltrar(); }
  document.querySelectorAll('#lista .marca').forEach(x => x.classList.remove('marca')); e.classList.add('marca'); e.scrollIntoView({ block: 'center', behavior: 'smooth' });
}
$('lista').addEventListener('click', e => { const vm = e.target.closest('.vermas'); if (vm) { vm.previousElementSibling.hidden = false; vm.remove(); return; } const a = e.target.closest('[data-ir]'); if (a) return irA(a.dataset.ir); const h = e.target.closest('[data-hf]'); if (h) { $('buscar').value = h.dataset.hf; listaFiltrar(); $('lista').scrollTop = 0; } });
$('lista').addEventListener('change', listaFiltrar);
addEventListener('popstate', e => { const id = e.state?.ir || decodeURIComponent(location.hash.slice(1)); if (document.body.classList.contains('vlista') && NOD.has(id)) irA(id, true); });
$('atras').onclick = () => history.back(); $('adelante').onclick = () => history.forward();
$('buscar').addEventListener('input', () => { if (document.body.classList.contains('vlista')) listaFiltrar(); });
const vista = v => { document.body.classList.toggle('vlista', v === 'lista'); $('lista').hidden = v !== 'lista'; $('tabLista').classList.toggle('on', v === 'lista'); $('tabGrafo').classList.toggle('on', v !== 'lista'); if (v !== 'lista') setTimeout(() => sel ? centra(sel) : verTodo(), 0); try { localStorage.setItem('avonlea-grafo-vista', v); } catch (e) {} };
$('tabLista').onclick = () => vista('lista'); $('tabGrafo').onclick = () => vista('grafo');
listaArmar();
verTodo(); inicio();
let v0 = 'lista'; try { v0 = localStorage.getItem('avonlea-grafo-vista') || 'lista'; } catch (e) {} vista(v0);
{ const h0 = decodeURIComponent(location.hash.slice(1)); if (h0 && NOD.has(h0) && v0 === 'lista') setTimeout(() => irA(h0, true), 50); }
const deHash = () => { const h0 = decodeURIComponent(location.hash.slice(1)); if (h0 && NOD.has(h0) && h0 !== sel) elegir(h0); };
deHash(); addEventListener('hashchange', deHash);
addEventListener('resize', () => { if (!sel) verTodo(); });
</script></body></html>
`;
