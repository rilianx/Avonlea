// Grafos como SVG (posiciones a mano en una grilla), renderizados a PNG con Chromium.
const { chromium } = require('playwright'); const fs = require('fs');
const C = {
  menu: ['#dbe8f6', '#3b6a9a'], escena: ['#fbefc6', '#a07a1a'], meta: ['#dcefd6', '#3d7a2a'], hecho: ['#f1e2f5', '#7a4a8a'],
  prohibe: ['#f8d9d6', '#a3302a'], numero: ['#e8e4dc', '#5a5248'], ia: ['#e0f0ef', '#2a7a72'],
};
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
function grafo({ W, H, cw = 210, rh = 92, x0 = 20, y0 = 20, nodos, aristas, leyenda = true, titulo }) {
  const P = {};
  let svg = '';
  const bw = cw - 64, bh = 60;
  for (const n of nodos) { const x = x0 + n.c * cw, y = y0 + n.r * rh + (titulo ? 30 : 0); P[n.id] = { x, y, w: n.w || bw, h: n.h || bh }; }
  const borde = (a, b) => {   // punto del borde de a hacia el centro de b
    const ca = { x: a.x + a.w / 2, y: a.y + a.h / 2 }, cb = { x: b.x + b.w / 2, y: b.y + b.h / 2 }, dx = cb.x - ca.x, dy = cb.y - ca.y;
    const t = Math.min(Math.abs(a.w / 2 / (dx || 1e-9)), Math.abs(a.h / 2 / (dy || 1e-9)));
    return { x: ca.x + dx * t, y: ca.y + dy * t };
  };
  for (const e of aristas) {
    const a = P[e.de], b = P[e.a], p = borde(a, b), q = borde(b, a), col = e.tipo === 'cierra' ? '#a3302a' : e.tipo === 'abre' ? '#3d7a2a' : '#555';
    const mx = (p.x + q.x) / 2 + (e.curva || 0), my = (p.y + q.y) / 2 - (e.curva ? Math.abs(e.curva) * .3 : 0);
    svg += `<path d="M${p.x},${p.y} Q${mx},${my} ${q.x},${q.y}" fill="none" stroke="${col}" stroke-width="2" ${e.tipo === 'cierra' ? 'stroke-dasharray="6 4"' : e.tipo === 'alt' ? 'stroke-dasharray="2 4"' : ''} marker-end="url(#m${e.tipo === 'cierra' ? 'r' : e.tipo === 'abre' ? 'g' : 'n'})"/>`;
    if (e.t) { const hz = Math.abs(q.y - p.y) < 4; const tx = (p.x + 2 * mx + q.x) / 4, ty = hz ? Math.min(a.y, b.y) - 10 : (p.y + 2 * my + q.y) / 4; svg += `<rect x="${tx - e.t.length * 3.3 - 4}" y="${ty - 10}" width="${e.t.length * 6.6 + 8}" height="18" rx="4" fill="#fffdf8" opacity=".92"/><text x="${tx}" y="${ty + 3}" font-size="11.5" text-anchor="middle" fill="${col}" font-style="italic">${esc(e.t)}</text>`; }
  }
  for (const n of nodos) {
    const { x, y, w, h } = P[n.id], [bg, fg] = C[n.tipo];
    svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${bg}" stroke="${fg}" stroke-width="2"/>`;
    const L = n.t.split('|'); L.forEach((l, i) => { svg += `<text x="${x + w / 2}" y="${y + h / 2 + (i - (L.length - 1) / 2) * 15 + 4}" font-size="${i === 0 ? 13.5 : 11.5}" font-weight="${i === 0 ? 700 : 400}" text-anchor="middle" fill="#2a2420">${esc(l)}</text>`; });
  }
  if (titulo) svg = `<text x="${W / 2}" y="28" font-size="18" font-weight="700" text-anchor="middle" fill="#2a2420">${esc(titulo)}</text>` + svg;
  if (leyenda) {
    const items = [['menu', 'lo que hace el jugador'], ['escena', 'escena del guion'], ['meta', 'meta del cuaderno'], ['hecho', 'agenda (alguien va)'], ['prohibe', 'prohibición']];
    let lx = 20; const ly = H - 30;
    for (const [k, t] of items) { const [bg, fg] = C[k]; svg += `<rect x="${lx}" y="${ly}" width="18" height="14" rx="3" fill="${bg}" stroke="${fg}" stroke-width="1.5"/><text x="${lx + 24}" y="${ly + 11}" font-size="12" fill="#2a2420">${t}</text>`; lx += 34 + t.length * 6.6; }
    svg += `<line x1="${lx}" y1="${ly + 7}" x2="${lx + 30}" y2="${ly + 7}" stroke="#a3302a" stroke-width="2" stroke-dasharray="6 4"/><text x="${lx + 36}" y="${ly + 11}" font-size="12" fill="#2a2420">cierra</text>`;
    lx += 90; svg += `<line x1="${lx}" y1="${ly + 7}" x2="${lx + 30}" y2="${ly + 7}" stroke="#555" stroke-width="2" stroke-dasharray="2 4"/><text x="${lx + 36}" y="${ly + 11}" font-size="12" fill="#2a2420">otro camino</text>`;
  }
  const defs = ['n:#555', 'r:#a3302a', 'g:#3d7a2a'].map(s => { const [k, c] = s.split(':'); return `<marker id="m${k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${c}"/></marker>`; }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" font-family="Georgia, serif"><rect width="${W}" height="${H}" fill="#fffdf8"/><defs>${defs}</defs>${svg}</svg>`;
}
const D = {};
// 1. Diana, la amistad, la prohibición y el crup
D.diana = grafo({ W: 1760, H: 560, cw: 250, rh: 105, titulo: 'Diana: la amistad, la prohibición y el perdón (cap. 8 a 19)', nodos: [
  { id: 'cuenta', c: 0, r: 0.3, tipo: 'menu', t: 'Contarle a Marilla|que quiere una amiga' },
  { id: 'lleva', c: 1, r: 0.3, tipo: 'hecho', t: 'Marilla la lleva a|La Cuesta del Huerto' },
  { id: 'recibe', c: 2, r: 0.3, tipo: 'escena', t: 'barry_recibe|la Sra. Barry llama a Diana' },
  { id: 'conoce', c: 3, r: 0.3, tipo: 'escena', t: 'conoce_diana|se conocen' },
  { id: 'casual', c: 3, r: 1.4, tipo: 'escena', t: 'diana_por_casualidad|se conocen, se quieren menos' },
  { id: 'amigas', c: 4, r: 0.3, tipo: 'meta', t: 'Tener una amiga del alma|jurar (afecto 4)' },
  { id: 'broche', c: 5, r: 0.3, tipo: 'escena', t: 'broche|el broche de amatista' },
  { id: 'picnic', c: 6, r: 0.3, tipo: 'meta', t: 'Ir de picnic|con Diana' },
  { id: 'otros', c: 5, r: 1.4, tipo: 'meta', t: 'Club de cuentos, bote,|desafío de Josie' },
  { id: 'cama', c: 6, r: 1.4, tipo: 'escena', t: 'cama_josephine|(2 días de amigas)' },
  { id: 'invita', c: 4, r: 2.6, tipo: 'menu', t: 'Invitarla a tomar el té|(menú de Diana)' },
  { id: 'grosella', c: 3, r: 2.6, tipo: 'escena', t: 'te_grosella|el «cordial» era vino' },
  { id: 'prohib', c: 2, r: 2.6, tipo: 'prohibe', t: 'prohibida|la Sra. Barry la prohíbe' },
  { id: 'aviso', c: 1, r: 2.6, tipo: 'hecho', t: 'crup_aviso|Diana corre a buscarla' },
  { id: 'salva', c: 0, r: 2.6, tipo: 'escena', t: 'crup_salva|la Sra. Barry la perdona' },
  { id: 'cierra', c: 1.5, r: 3.75, w: 420, tipo: 'prohibe', t: 'Mientras dure, se cierran: el picnic, el té,|el club, el bote, el desafío, la tía Josephine' },
  { id: 'cartas', c: 6, r: 2.6, tipo: 'meta', t: 'Cartas a la|tía Josephine' },
], aristas: [
  { de: 'cuenta', a: 'lleva', t: 'al día siguiente' }, { de: 'lleva', a: 'recibe' }, { de: 'recibe', a: 'conoce' }, { de: 'conoce', a: 'amigas', tipo: 'abre' },
  { de: 'casual', a: 'amigas', tipo: 'alt', t: 'pasar tiempo juntas' },
  { de: 'amigas', a: 'broche', tipo: 'abre' }, { de: 'broche', a: 'picnic', tipo: 'abre' }, { de: 'amigas', a: 'otros', tipo: 'abre' }, { de: 'amigas', a: 'invita', tipo: 'abre' },
  { de: 'otros', a: 'cama', tipo: 'abre' }, { de: 'cama', a: 'cartas', tipo: 'abre' },
  { de: 'invita', a: 'grosella', t: 'sentadas al té' }, { de: 'grosella', a: 'prohib', t: 'al día siguiente' }, { de: 'prohib', a: 'aviso', t: '2 días, de noche' }, { de: 'aviso', a: 'salva', t: 'corren juntas' },
  { de: 'prohib', a: 'cierra', tipo: 'cierra' }, { de: 'salva', a: 'cierra', tipo: 'abre', t: 'se levanta' },
] });
// 2. Escuela, Gilbert, los Allan, el pelo
D.escuela = grafo({ W: 1520, H: 470, cw: 250, rh: 100, titulo: 'La escuela, Gilbert, los Allan y el pelo', nodos: [
  { id: 'esc', c: 0, r: 0, tipo: 'meta', t: 'Ir a la escuela' },
  { id: 'zan', c: 1, r: 0, tipo: 'escena', t: 'zanahorias|la pizarra en la cabeza' },
  { id: 'paces', c: 2, r: 0, tipo: 'meta', t: 'Hacer las paces|con Gilbert' },
  { id: 'rec', c: 1, r: 1.1, tipo: 'meta', t: 'Recitar la lección,|el concierto, el salón' },
  { id: 'queens', c: 2, r: 1.1, tipo: 'meta', t: "Entrar a Queen's|(camino del estudio)" },
  { id: 'dom', c: 0, r: 2.3, tipo: 'meta', t: 'Ir a la escuela|dominical' },
  { id: 'inv', c: 1, r: 2.3, tipo: 'escena', t: 'invita_allan|Marilla los invita' },
  { id: 'visita', c: 2, r: 2.3, tipo: 'hecho', t: 'La Sra. Allan|viene a tomar el té' },
  { id: 'pastel', c: 3, r: 2.3, tipo: 'escena', t: 'pastel_linimento|cuando se sienta' },
  { id: 'cp', c: 4, r: 2.3, tipo: 'meta', t: 'Tomar el té en la|casa parroquial' },
  { id: 'tinte', c: 4, r: 0, tipo: 'meta', t: 'Teñirse el pelo|(queda verde)' },
  { id: 'corto', c: 5, r: 0, tipo: 'meta', t: 'Librarse del|pelo verde' },
], aristas: [
  { de: 'esc', a: 'zan', t: 'con Gilbert adentro' }, { de: 'zan', a: 'paces', tipo: 'abre' }, { de: 'esc', a: 'rec', tipo: 'abre' }, { de: 'esc', a: 'queens', tipo: 'abre' },
  { de: 'dom', a: 'inv', t: 'en casa, con Marilla' }, { de: 'inv', a: 'visita', t: 'al día siguiente' }, { de: 'visita', a: 'pastel' }, { de: 'pastel', a: 'cp', tipo: 'abre' },
  { de: 'tinte', a: 'corto', tipo: 'abre' },
] });
// 3. Cómo funciona un hito
D.hito = grafo({ W: 1520, H: 400, cw: 250, rh: 110, leyenda: false, titulo: 'Cómo funciona un camino: de lo que Ana hace a lo que alguien le dice', nodos: [
  { id: 'hace', c: 0, r: 0.3, tipo: 'menu', t: 'Ana hace algo|unos minutos (o 1 h de clase)' },
  { id: 'suma', c: 1, r: 0.3, tipo: 'numero', t: '+1 al camino|(máx. 2 por día)' },
  { id: 'cruza', c: 2, r: 0.3, tipo: 'numero', t: '¿Cruzó un hito?|5, 10, 15, 30, 60…' },
  { id: 'aviso', c: 3, r: 0.3, tipo: 'escena', t: 'Aviso 📈|y queda pendiente' },
  { id: 'enc', c: 4, r: 0.3, tipo: 'hecho', t: 'Ana se encuentra|con quien se lo dice' },
  { id: 'ia', c: 5, r: -0.3, h: 52, tipo: 'ia', t: 'Con IA:|escena improvisada' },
  { id: 'esc', c: 5, r: 0.6, h: 52, tipo: 'escena', t: 'Sin IA:|la línea escrita' },
  { id: 'hecho', c: 4, r: 1.8, tipo: 'meta', t: 'hecho hito_<camino>_<n>|el guion puede seguir' },
  { id: 'guion', c: 2, r: 1.8, tipo: 'escena', t: 'Escenas con|si: camino:granja:15' },
], aristas: [
  { de: 'hace', a: 'suma' }, { de: 'suma', a: 'cruza' }, { de: 'cruza', a: 'aviso', t: 'sí' }, { de: 'aviso', a: 'enc', t: 'cuando sea' }, { de: 'enc', a: 'ia' }, { de: 'enc', a: 'esc' },
  { de: 'enc', a: 'hecho' }, { de: 'cruza', a: 'guion', tipo: 'abre' },
] });
// 4. Los caminos: barras con hitos
function caminos(){
  const W = 1300, H = 520, L = [
    ['El estudio', 'clases, estudiar, recitar, leer, ensayar', 60, [[10, 'Srta. Stacy', 'la anota para Queen\'s'], [30, 'Marilla', 'podría entrar'], [60, 'Gilbert', 'podría quedar primera']]],
    ['La granja de Tejas Verdes', 'quehaceres, ordeñar, huerta, batir, cocinar, coser…', 30, [[5, 'Marilla', 'cuenta con ella'], [15, 'Matthew', 'el vestido de mangas abullonadas'], [30, 'Marilla', 'Tejas Verdes también es suya']]],
    ['Las letras y la imaginación', 'cuentos, cartas, nombrar lugares, adornar', 30, [[5, 'Diana', 'escribe como en los libros'], [15, 'Srta. Stacy', 'lee su composición'], [30, 'Sra. Allan', 'un cuento para una revista']]],
  ];
  let s = `<text x="${W / 2}" y="30" font-size="18" font-weight="700" text-anchor="middle" fill="#2a2420">Los tres caminos y sus hitos</text>`;
  const x0 = 300, x1 = W - 60;
  L.forEach(([t, suma, max, hs], i) => {
    const y = 90 + i * 145, px = n => x0 + (x1 - x0) * n / max;
    s += `<text x="20" y="${y + 6}" font-size="15" font-weight="700" fill="#2a2420">${esc(t)}</text><text x="20" y="${y + 26}" font-size="11.5" fill="#5a5248" font-style="italic">${esc(suma)}</text>`;
    s += `<rect x="${x0}" y="${y - 8}" width="${x1 - x0}" height="16" rx="8" fill="#e8e4dc" stroke="#5a5248"/>`;
    s += `<text x="${x0}" y="${y + 28}" font-size="11" fill="#5a5248" text-anchor="middle">0</text>`;
    hs.forEach(([n, quien, que], k) => {
      const x = px(n);
      s += `<circle cx="${x}" cy="${y}" r="11" fill="#fbefc6" stroke="#a07a1a" stroke-width="2"/><text x="${x}" y="${y + 4}" font-size="11" font-weight="700" text-anchor="middle">${n}</text>`;
      const ty = y + (k % 2 ? 36 : -24), anc = n === max ? 'end' : 'middle';
      s += `<text x="${x + (n === max ? 10 : 0)}" y="${ty}" font-size="12" text-anchor="${anc}" fill="#2a2420"><tspan font-weight="700">${esc(quien)}:</tspan> ${esc(que)}</text>`;
    });
  });
  s += `<text x="20" y="${H - 20}" font-size="12" fill="#5a5248">Cada acción suma +1 una vez al día (como mucho 2 por día en cada camino). Los hitos se leen en el cuaderno y alguien se los dice a Ana.</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" font-family="Georgia, serif"><rect width="${W}" height="${H}" fill="#fffdf8"/>${s}</svg>`;
}
D.caminos = caminos();
// 5. El calendario y el examen
function calendario(){
  const W = 1300, H = 420, x0 = 40, w = (W - 80) / 4, est = [['Primavera', '#dcefd6'], ['Verano', '#fbefc6'], ['Otoño', '#f6dcc4'], ['Invierno', '#dbe8f6']];
  let s = `<text x="${W / 2}" y="30" font-size="18" font-weight="700" text-anchor="middle" fill="#2a2420">Un año del juego: 4 estaciones de 14 días (56 días)</text>`;
  est.forEach(([n, c], i) => {
    const x = x0 + i * w; s += `<rect x="${x}" y="60" width="${w - 6}" height="90" rx="8" fill="${c}" stroke="#5a5248"/><text x="${x + w / 2}" y="85" font-size="15" font-weight="700" text-anchor="middle">${n}</text><text x="${x + w / 2}" y="108" font-size="12" text-anchor="middle" fill="#5a5248">días ${i * 14 + 1}–${i * 14 + 14}</text><text x="${x + w / 2}" y="130" font-size="12" text-anchor="middle" fill="#5a5248">${i === 1 ? 'sin clases' : 'clases de lunes a sábado'}</text>`;
    for (let d = 0; d < 14; d++) { const dx = x + 8 + d * (w - 22) / 14; s += `<rect x="${dx}" y="160" width="${(w - 22) / 14 - 3}" height="14" rx="2" fill="${i === 1 || d % 7 === 6 ? '#e8e4dc' : '#9ac08a'}"/>`; }
  });
  const ex = x0 + w + 8;
  s += `<path d="M${ex + 6},178 L${ex + 6},215" stroke="#a3302a" stroke-width="2" marker-end="url(#m)"/><text x="${ex - 20}" y="232" font-size="13" font-weight="700" fill="#a3302a">Día 1 del verano: el examen de Queen's (en la cocina, con Marilla)</text>`;
  const r = [['menos de 10', 'no la mandan todavía', '#e8e4dc'], ['10 a 29', 'examen_no: no alcanza; otra vez el próximo verano', '#f8d9d6'], ['30 a 59', 'examen_entra: entra a Queen\'s', '#dcefd6'], ['60 o más', 'examen_primera: primera, empatada con Gilbert', '#fbefc6']];
  r.forEach(([n, t, c], i) => { const y = 255 + i * 34; s += `<rect x="${ex - 20}" y="${y}" width="150" height="26" rx="5" fill="${c}" stroke="#5a5248"/><text x="${ex + 55}" y="${y + 17}" font-size="12.5" text-anchor="middle" font-weight="700">estudio ${n}</text><text x="${ex + 145}" y="${y + 17}" font-size="12.5">${esc(t)}</text>`; });
  s += `<rect x="${W - 330}" y="190" width="14" height="14" fill="#9ac08a"/><text x="${W - 310}" y="202" font-size="12">día con clases</text><rect x="${W - 200}" y="190" width="14" height="14" fill="#e8e4dc"/><text x="${W - 180}" y="202" font-size="12">domingo o verano</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" font-family="Georgia, serif"><rect width="${W}" height="${H}" fill="#fffdf8"/><defs><marker id="m" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#a3302a"/></marker></defs>${s}</svg>`;
}
D.calendario = calendario();
// 6. Las tres capas
D.capas = grafo({ W: 1400, H: 390, cw: 470, rh: 120, leyenda: false, titulo: 'Tres piezas, tres archivos de texto', nodos: [
  { id: 'g', c: 0, r: 0.25, w: 390, h: 90, tipo: 'escena', t: 'El guion (src/datos/guion.txt)|escenas que pasan una vez, por lugar y condición:|dejan hechos (conocidas_diana, prohibida…)' },
  { id: 'c', c: 1, r: 1.6, w: 390, h: 90, tipo: 'meta', t: 'El cuaderno (src/datos/cuaderno.txt)|metas para el jugador, con pistas;|requiere: abre o cierra metas y acciones' },
  { id: 'k', c: 2, r: 0.25, w: 390, h: 90, tipo: 'numero', t: 'Los caminos (src/datos/caminos.txt)|números que suben día a día,|con hitos que alguien le dice a Ana' },
], aristas: [
  { de: 'g', a: 'c', t: 'requiere: hecho:x' }, { de: 'k', a: 'c', t: 'requiere: camino:x:n' },
  { de: 'k', a: 'g', t: 'si: camino:granja:15' },
] });
const salida = process.argv[2] || '.';
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
  const pg = await b.newPage({ deviceScaleFactor: 2 });
  for (const [k, svg] of Object.entries(D)) {
    
    await pg.setContent(`<html><body style="margin:0">${svg}</body></html>`);
    await pg.locator('svg').screenshot({ path: salida + '/' + k + '.png' });
    console.log(k);
  }
  await b.close();
})();
