#!/usr/bin/env node
// The graph of the story, checked (docs/MOTOR.md): reads the script (src/datos/guion.txt, and the conversations:
// src/datos/conversaciones.txt), the notebook
// (src/datos/cuaderno.txt), the skills (src/datos/habilidades.txt) and the code, and tells
//   - the facts some scene or goal asks for that nothing ever makes (that scene or goal can never happen),
//   - the facts that are made and nothing reads (harmless, but perhaps forgotten),
//   - the conditions written wrong (a key the engine does not know: a typo),
//   - the requirements of the notebook that name a goal that does not exist.
//   node tools/grafo.js            → trazas/grafo.md (and a summary; exit 1 if a scene or goal can never happen)
const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..'), MIS = require('./misiones.js').textos(root), leer = f => MIS[f] ?? fs.readFileSync(path.join(root, f), 'utf8');   // (with the mini-missions: tools/misiones.js)
const guion = leer('src/datos/guion.txt') + '\n' + leer('src/datos/conversaciones.txt'), cuaderno = leer('src/datos/cuaderno.txt'), habilidades = leer('src/datos/habilidades.txt');
const codigo = fs.readdirSync(path.join(root, 'src/js')).filter(f => /^\d\d-.*\.js$/.test(f) && !/metas-de-prueba/.test(f)).map(f => leer('src/js/' + f)).join('\n');
// the keys the engine knows (dlgCond in src/js/21-escenas-dialogo.js), and a quality compared with a number
const CLAVES = ['avance', 'cerca', 'hecho', 'dicha', 've', 'donde', 'ana', 'conoce', 'presente', 'marca', 'capitulo', 'cuaderno', 'tomando_te', 'afecto', 'dias_desde', 'sentada', 'estudio', 'camino', 'estacion', 'domingo', 'dia_estacion', 'dia_juego', 'hora', 'no_hoy', 'canal_libre', 'ana_visible', 'escena_ana', 'sabe', 'comento', 'horas_desde', 'y_mayor', 'carta', 'respuesta'];
const CUALIDAD = /^([a-zñ_]+):([a-zñ_]+)(?::([a-zñ_]+))?\s*(>=|<=|>|<|==|=)\s*(-?\d+(?:\.\d+)?)$/;
// the qualities there are: the affection, the skills (src/datos/habilidades.txt), and whatever a scene adds to («suma x:…»)
const CUALIDADES = new Set(['afecto', ...[...habilidades.matchAll(/^===\s*(.+?)\s*===$/gm)].map(m => m[1]), ...[...guion.matchAll(/al_(?:empezar|terminar):\s*suma\s+([a-zñ_]+):/g)].map(m => m[1])]);
const NOTICIAS = new Set([...leer('src/datos/noticias.txt').matchAll(/^===\s*(.+?)\s*===$/gm)].map(m => m[1]));   // (the news there are: src/datos/noticias.txt)
const metas = new Set([...cuaderno.matchAll(/^===\s*(.+?)\s*===$/gm)].map(m => m[1]));   // (the goals of the notebook: «dias_desde» may count from one of them)
const pide = {}, hace = {}, malas = [], puntos = [];
// the state (src/datos/estado.txt): its variables and values; a condition on it («diana>=conocida») asks for the values
// that satisfy it (each value is, for the graph, a fact «diana=conocida» that the scenes setting it leave)
const ESTADO = {}; { let v = null; for (const raw of leer('src/datos/estado.txt').split('\n')) { const t = raw.trim(); if (!t || t[0] === '#') continue; let m;
  if ((m = t.match(/^===\s*(\w+)\s*===$/))) { v = ESTADO[m[1]] = { orden: [], otros: [], inicial: null, al: {} }; continue; } if (!v) continue;
  if ((m = t.match(/^valores:\s*(.*)$/))) { if (m[1].includes('<')) v.orden = m[1].split('<').map(x => x.trim()); else v.otros.push(...m[1].split(',').map(x => x.trim())); }
  if ((m = t.match(/^otros:\s*(.*)$/))) v.otros.push(...m[1].split(',').map(x => x.trim()));
  if ((m = t.match(/^inicial:\s*(\w+)/))) v.inicial = m[1];
  if ((m = t.match(/^(\w+):\s*(hecho|olvida|viene de)\s+(\w+)$/))) (v.al[m[1]] ||= []).push([m[2], m[3]]); }
  for (const x of Object.values(ESTADO)) { x.valores = [...x.orden, ...x.otros]; x.inicial ??= x.valores[0]; } }
const ESTADO_RE = /^(\w+)\s*(>=|<=|!=|=|>|<)\s*(\w+)$/;
const estadoCumplen = (v, op, b) => { const V = ESTADO[v]; return V.valores.filter(a => op === '=' ? a === b : op === '!=' ? a !== b : (V.orden.includes(a) && V.orden.includes(b) && { '>=': V.orden.indexOf(a) >= V.orden.indexOf(b), '<=': V.orden.indexOf(a) <= V.orden.indexOf(b), '>': V.orden.indexOf(a) > V.orden.indexOf(b), '<': V.orden.indexOf(a) < V.orden.indexOf(b) }[op])); };
const estadoLee = [];   // (each condition on the state: where, and the values that satisfy it; resolved once all is read)   // (fact → where it is asked for / made)
const anota = (o, h, donde) => (o[h] ||= new Set()).add(donde);
function condicion(c, donde){
  c = c.trim(); if (!c) return; const neg = c[0] === '!', s = neg ? c.slice(1) : c;
  const q = s.match(CUALIDAD); if (q) { if (!CUALIDADES.has(q[1])) malas.push(`${donde}: «${c}» (no hay una cualidad «${q[1]}»: ni el afecto, ni una habilidad, ni algo que sume una escena)`); return; }
  { const m = s.match(ESTADO_RE); if (m && !s.includes(':')) { if (!ESTADO[m[1]]) return malas.push(`${donde}: «${c}» (no hay un estado «${m[1]}» en src/datos/estado.txt)`); if (!ESTADO[m[1]].valores.includes(m[3])) return malas.push(`${donde}: «${c}» («${m[3]}» no es un valor de ${m[1]}: ${ESTADO[m[1]].valores.join(', ')})`); if (/[<>]/.test(m[2]) && !ESTADO[m[1]].orden.includes(m[3])) return malas.push(`${donde}: «${c}» (${m[1]} no tiene orden para «${m[2]}» con ${m[3]})`);
    const S = estadoCumplen(m[1], m[2], m[3]), T = neg ? ESTADO[m[1]].valores.filter(x => !S.includes(x)) : S; estadoLee.push({ donde, v: m[1], S: T }); return; } }
  const [k, a] = s.split(':');
  if (!CLAVES.includes(k)) return malas.push(`${donde}: «${c}» (no es una condición conocida)`);
  if (k === 'sabe' && !NOTICIAS.has(s.split(':')[2])) return malas.push(`${donde}: «${c}» (no hay una noticia «${s.split(':')[2]}» en src/datos/noticias.txt)`);
  if (!neg && (k === 'hecho' || (k === 'dias_desde' && !metas.has(a)))) anota(pide, a, donde);
  if (k === 'conoce') anota(pide, 'conoce_' + a + ' ', donde);   // (whom Ana knows: the fact conoce_<who>, or how the book has them meet)
  if (neg || k === 'no_hoy') anota(pide, a + ' ', donde);   // (read, but not needed: «!hecho:x» holds while x has not happened)
}
// the script: each scene, its conditions and what it does
let esc = null;
const escenas = [];
for (const raw of guion.split('\n')) {
  const s = raw.trim(); if (!s || s[0] === '#') continue;
  const h = s.match(/^===\s*(.+?)\s*===$/); if (h) { escenas.push(esc = { id: h[1], body: false }); continue; }
  if (!esc) continue; if (s === '---') { esc.body = true; continue; }
  { const n = s.match(/^!\s*nombrar\s+(\S+)/) || (/^al_(empezar|terminar):\s*nombrar\s/.test(s) && s.match(/nombrar\s+(\S+)/)); if (n) anota(hace, 'nombro_' + n[1], 'escena ' + esc.id); }   // (naming a thing leaves nombro_<thing>)
  { const n = s.match(/^(?:!\s*|al_(?:empezar|terminar):\s*)(?:contar|saber)\s+\S+\s+(\S+)/); if (n && !NOTICIAS.has(n[1])) malas.push(`escena ${esc.id}: «${s}» (no hay una noticia «${n[1]}» en src/datos/noticias.txt)`); }
  // «{De:marilla:x}» (who told her): only if someone did; if she saw it herself, there is no one to name
  if (esc.body) for (const [, k, f] of s.matchAll(/\{[dD]e:(\w+):(\w+)\}/g)) if (!new RegExp(`(?<!!)sabe:${k}:${f}:(contada|[2-9])\\b`).test(esc.si || '')) malas.push(`escena ${esc.id}: nombra quién le contó a ${k} «${f}», y su «si:» no pide que se lo hayan contado (\`sabe:${k}:${f}:contada\`, o una versión 2 o más)`);
  { const m = s.match(/^(?:!\s*|al_(?:empezar|terminar):\s*)estado\s+(\w+)\s+(?:=\s*)?(\w+)\s*$/); if (m) { if (!ESTADO[m[1]] || !ESTADO[m[1]].valores.includes(m[2])) malas.push(`escena ${esc.id}: «${s}» (no hay ese estado o ese valor en src/datos/estado.txt)`); else { const w = 'escena ' + esc.id + (esc.body ? ' (una opción)' : ''); anota(hace, m[1] + '=' + m[2], w); for (const [q, h] of ESTADO[m[1]].al[m[2]] || []) if (q === 'hecho') anota(hace, h, w); } } }
  if (esc.body) { const m = s.match(/^!\s*(hecho|olvidar)\s+(\S+)/); if (m) anota(m[1] === 'hecho' ? hace : pide, m[1] === 'hecho' ? m[2] : m[2] + ' ', 'escena ' + esc.id + ' (una opción)'); if (s.startsWith('->')) esc.opciones = (esc.opciones || 0) + 1;
    // (for the drawing, trazas/grafo.html: its lines, its choices and what each does)
    if (s.startsWith('->')) (esc.ops ||= []).push({ t: s.replace(/^->\*?\s*/, ''), propia: s.startsWith('->*'), ef: [] });
    else if (/^\s/.test(raw) && esc.ops?.length && s.startsWith('!')) esc.ops.at(-1).ef.push(s.slice(1).trim());
    else if (/^\s/.test(raw) && esc.ops?.length) { const o = esc.ops.at(-1); if (!o.dice) o.dice = s.slice(0, 160); }
    else { esc.lin = (esc.lin || 0) + 1; if (!esc.primera && /^[a-zñ]+( piensa)?:/.test(s)) esc.primera = s.slice(0, 160); if (esc.ops?.length) esc.opsFin = true; }
    continue; }
  const i = s.indexOf(':'), k = i < 0 ? s : s.slice(0, i).trim(), v = i < 0 ? '' : s.slice(i + 1).trim();
  if (['canal', 'prioridad', 'con', 'tema', 'resumen', 'donde', 'en', 'cerca', 'repetir', 'disparo', 'lugar', 'objeto', 'paso'].includes(k)) esc[k] = v;
  if (k === 'narra' && !esc.narra) esc.narra = v.slice(0, 260);
  if (k === 'al_empezar' || k === 'al_terminar') (esc[k + 's'] ||= []).push(v);
  if (k === 'si') { esc.si = v; v.split(',').forEach(c => condicion(c, 'escena ' + esc.id)); }
  if (k === 'narra salvo') v.split(',').forEach(c => condicion(c.trim(), 'escena ' + esc.id + ' (narra salvo)'));
  if (k === 'o') { const m = v.match(/si=(\S+)/); if (m) m[1].split(',').forEach(c => condicion(c, 'escena ' + esc.id + ' (alternativa)')); }
  if (k === 'grande') esc.grande = true;
  if (k === 'a prueba') esc.aPrueba = true;   // (it may happen before Marilla decides: the days on trial)
  if (k === 'punto') esc.punto = v;
  { const m = s.match(/^(?:!\s*|al_(?:empezar|terminar):\s*)punto\s+(.+)$/); if (m) puntos.push([esc.id, k === 'al_empezar' ? 'al empezar' : k === 'al_terminar' ? 'al terminar' : 'en la escena', m[1]]); }
  if (k === 'al_empezar' || k === 'al_terminar') { const [w, x] = v.split(/\s+/); if (w === 'hecho') anota(hace, x, 'escena ' + esc.id); if (w === 'olvidar') anota(pide, x + ' ', 'escena ' + esc.id); }
}
// the comments (src/datos/comentarios.txt): scenes of one line; their conditions too
{ let g = null; for (const raw of leer('src/datos/comentarios.txt').split('\n')) { const s = raw.trim(); if (!s || s[0] === '#') continue; let m;
  if ((m = s.match(/^===\s*(.+?)\s*===$/))) { g = m[1]; continue; }
  if ((m = s.match(/^si:\s*(.*)$/))) m[1].split(',').forEach(c => condicion(c, 'comentarios de ' + g));
  if ((m = s.match(/^-\s*\[([^\]]*)\]/))) m[1].split(',').forEach(c => condicion(c, 'un comentario de ' + g)); } }
// the talks (src/datos/charlas.txt): what two or three say when they meet; their conditions too
{ let g = null; for (const raw of leer('src/datos/charlas.txt').split('\n')) { const s = raw.trim(); if (!s || s[0] === '#') continue; let m;
  if ((m = s.match(/^===\s*(.+?)\s*===$/))) { g = m[1]; continue; }
  if (s === '---') { g = null; continue; }
  if (g && (m = s.match(/^si:\s*(.*)$/))) m[1].split(',').forEach(c => condicion(c, 'charla ' + g)); } }
// the sayings (src/datos/dichos/*.txt): their conditions (blanks aside); each moment the code asks for exists, with one
// line at least that needs nothing of its own (never silent); and each moment written is asked for by the code
{ const dir = path.join(root, 'src/datos/dichos'), M = {}; for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.txt')).sort()) { let g = null;
  for (const raw of leer('src/datos/dichos/' + f).split('\n')) { const s = raw.trim(); if (!s || s[0] === '#') continue; let m;
    if ((m = s.match(/^===\s*(.+?)\s*===$/))) { g = m[1]; if (M[g]) malas.push(`dichos: el momento «${g}» está dos veces (${M[g].f} y ${f})`); M[g] = { f, libre: false, n: 0 }; continue; } if (!g) continue;
    if ((m = s.match(/^si:\s*(.*)$/))) { M[g].si = true; m[1].split(',').forEach(c => /\{/.test(c) || condicion(c.trim(), 'dichos de ' + g)); }
    if ((m = s.match(/^-\s*(\[([^\]]*)\])?/))) { M[g].n++; if (!m[1]) M[g].libre = true; else m[2].split(',').forEach(c => /\{/.test(c) || condicion(c.trim(), 'un dicho de ' + g)); } } }
  for (const [g, x] of Object.entries(M)) { if (!x.n) malas.push(`dichos: «${g}» no tiene ninguna línea`); else if (!x.libre && !x.si) malas.push(`dichos: «${g}» no tiene ninguna línea sin condiciones (alguna vez quedaría callado)`); }
  const pedidos = new Set([...codigo.matchAll(/\b(?:dicho|dichoNuevo|dichoElegir|decirDicho|dichosTodos|dichosEnOrden)\('([\w:]+)'/g)].map(m => m[1]));
  for (const g of pedidos) if (!M[g] && !Object.keys(M).some(x => x.startsWith(g) && (g.endsWith(':') || /^\d/.test(x.slice(g.length))))) malas.push(`dichos: el código pide «${g}», y no está en src/datos/dichos/`);
  for (const g of Object.keys(M)) if (!pedidos.has(g) && !/^[\w]+:/.test(g)) malas.push(`dichos: «${g}» no lo pide el código (¿un nombre mal escrito?)`); }
// the lines of each one (src/datos/frases.txt): someone of the game, and «[condiciones] texto»
{ const quienes = new Set([...Object.keys(JSON.parse(leer('src/datos/personajes.json'))), ...[...codigo.matchAll(/^  (\w+): \{ name: /gm)].map(m => m[1]), 'vecino', 'niño', 'adultos', 'niños']); let q = null;
  for (const raw of leer('src/datos/frases.txt').split('\n')) { const s = raw.trim(); if (!s || s[0] === '#') continue; let m;
    if ((m = s.match(/^===\s*(.+?)\s*===$/))) { q = m[1]; if (!quienes.has(q)) malas.push(`frases: «${q}» no es nadie del juego`); continue; }
    if (!/^(dice|ana|primavera|verano|otoño|invierno):/.test(s)) { malas.push(`frases de ${q}: «${s.slice(0, 60)}» (empieza con dice:, ana:, o una estación)`); continue; }
    if ((m = /^\S+:\s*\[([^\]]+)\]/.exec(s))) m[1].split(',').forEach(c => condicion(c, 'una frase de ' + q)); } }
// the news (src/datos/noticias.txt): the conditions of who knows it
const llegaA = [], cuentaPor = {}, cuandoDice = {};
{ let q = null; for (const raw of leer('src/datos/noticias.txt').split('\n')) { const s = raw.trim(); if (!s || s[0] === '#') continue; let m;
  if ((m = s.match(/^===\s*(.+?)\s*===$/))) { q = m[1]; continue; }
  if ((m = s.match(/^saben si (.+?):\s/))) m[1].split(',').forEach(c => condicion(c.trim(), 'noticia ' + q));
  if ((m = s.match(/^se entera quien la ve si:\s*(.+)$/))) m[1].split(',').forEach(c => condicion(c.trim(), 'noticia ' + q));
  if ((m = s.match(/^llega a (\w+) en:/))) llegaA.push([q, m[1]]);
  if ((m = s.match(/^se cuenta por:\s*(\d+)/))) cuentaPor[q] = +m[1];
  if ((m = s.match(/^(?:dice(?: \w+)?|exagerada):\s*(.*)$/)) && /\b(anoche|ayer|hoy|esta mañana|esta tarde|esta noche)\b/i.test(m[1])) cuandoDice[q] = m[1]; } }
// a piece of news that says «anoche» or «hoy», told for days: by then it is not «anoche»
for (const [f, t] of Object.entries(cuandoDice)) if ((cuentaPor[f] ?? 99) > 1) malas.push(`noticia ${f}: «${t.slice(0, 60)}» dice cuándo fue, y se cuenta por ${cuentaPor[f] ?? 'siempre'} días (que diga solo qué pasó, o «se cuenta por: 1»)`);
// a piece of news that reaches someone (the neighbour who says «I'll tell Marilla»), and they never react: something forgotten
const sinReaccion = llegaA.filter(([f, k]) => !['src/datos/guion.txt', 'src/datos/conversaciones.txt', 'src/datos/frases.txt'].some(a => new RegExp(`(?<!!)sabe:${k}:${f}\\b`).test(leer(a)))).map(([f, k]) => `\`${f}\` le llega a ${k}, y ninguna escena ni frase suya pide \`sabe:${k}:${f}\``);
if (sinReaccion.length) malas.push(...sinReaccion.map(x => 'noticia sin reacción: ' + x));
// who is in Avonlea when (src/datos/llegadas.txt): someone of the game, conditions well written, and the facts their comings and goings leave
{ const quienes = new Set([...Object.keys(JSON.parse(leer('src/datos/personajes.json'))), ...[...codigo.matchAll(/^  (\w+): \{ name: /gm)].map(m => m[1])]); let q = null;
  for (const raw of leer('src/datos/llegadas.txt').split('\n')) { const s = raw.trim(); if (!s || s[0] === '#') continue; let m;
    if ((m = s.match(/^===\s*(.+?)\s*===$/))) { q = m[1]; if (!quienes.has(q)) malas.push(`llegadas: «${q}» no es nadie del juego (personajes.json, ni la gente de src/js/56-gente-de-avonlea.js)`); continue; }
    if (/^(llega si|de visita):/.test(s)) anota(hace, 'llego_' + q, 'llegadas'); if (/^(se va si|de visita):/.test(s)) anota(hace, 'se_fue_' + q, 'llegadas');   // (arriving and leaving are facts of the story)
    if ((m = s.match(/^(?:llega|se va) si:\s*(.*)$/))) m[1].split(',').forEach(c => condicion(c.trim(), 'llegadas de ' + q)); } }
// the notebook: what each goal requires, its hints, and goals that are a fact
let meta = null; const REQ = {}, A_PRUEBA = new Set(), METAS_INFO = {};
for (const raw of cuaderno.split('\n')) {
  const s = raw.trim(); if (!s || s[0] === '#') continue;
  const h = s.match(/^===\s*(.+?)\s*===$/); if (h) { meta = h[1]; continue; } if (!meta) continue;
  let m;
  if ((m = s.match(/^requiere:\s*(.*)$/))) for (const r of m[1].split(',').map(x => x.trim()).filter(Boolean)) {
    if (r.includes(':') || r[0] === '!' || ESTADO_RE.test(r)) condicion(r, 'meta ' + meta); else if (!metas.has(r)) malas.push(`meta ${meta}: requiere «${r}», que no es una meta del cuaderno`);
  }
  if ((m = s.match(/^pista si (.+?):\s/))) m[1].split(',').forEach(c => condicion(c.trim(), 'meta ' + meta + ' (pista)'));
  if ((m = s.match(/^meta:\s*hecho\s+(\S+)/))) anota(pide, m[1] + ' ', 'meta ' + meta);
  if ((m = s.match(/^requiere:\s*(.*)$/))) REQ[meta] = m[1].split(',').map(x => x.trim()); if (s === 'a prueba') A_PRUEBA.add(meta);
  if ((m = s.match(/^(titulo|pista|meta):\s*(.*)$/))) (METAS_INFO[meta] ||= {})[m[1]] = m[2];
}
// before Marilla decides (days 1 to 3), only what is marked «a prueba»: every other goal waits for «quedarse»
{ const llega = (k, vis = new Set()) => k === 'quedarse' || (REQ[k] || []).some(x => x === 'hecho:se_queda' || x === 'ana_en_tv=se_queda' || (metas.has(x) && !vis.has(x) && llega(x, new Set([...vis, k]))));
  for (const k of metas) if (!A_PRUEBA.has(k) && !llega(k)) malas.push(`meta ${k}: se puede hacer antes de que acepten a Ana (que pida «quedarse», o márquela «a prueba»)`); }
// the skills: Ana's milestones that someone tells leave a fact
let hab = null;
for (const raw of habilidades.split('\n')) {
  const s = raw.trim(); if (!s || s[0] === '#') continue;
  const h = s.match(/^===\s*(.+?)\s*===$/); if (h) { hab = { id: h[1], ultimo: null }; continue; }
  const m = s.match(/^hito (\d+):/); if (m && hab) hab.ultimo = 'hito_' + hab.id + '_' + m[1];
  if (/^con:/.test(s) && hab?.ultimo) anota(hace, hab.ultimo, 'habilidad ' + hab.id);
}
// the code: facts made (dlgHecho('x')) and read (dlgHechos().x, dlgHechos()['x'])
for (const m of codigo.matchAll(/dlgHecho\('([a-z_0-9]+)'/g)) anota(hace, m[1], 'código');
for (const m of codigo.matchAll(/dlgHechos\(\)(?:\.([a-z_0-9]+)|\['([a-z_0-9]+)'\])/g)) anota(pide, (m[1] || m[2]) + ' ', 'código');
for (const m of codigo.matchAll(/['"`](?:hecho|dias_desde):([a-z_0-9]+)/g)) anota(pide, m[1] + ' ', 'código');
for (const m of codigo.matchAll(/['"`\[]conoce:([a-z_0-9]+)/g)) anota(pide, 'conoce_' + m[1] + ' ', 'código');
// a conversation that is done with the hands (sowing, baking, milking, sewing) says where it is done («se_hace_en»):
// otherwise it is had wherever they are (sowing in the kitchen)
for (const bloque of leer('src/datos/conversaciones.txt').split(/^(?====)/m)) { const id = bloque.match(/^===\s*(.+?)\s*===/)?.[1]; if (!id) continue;
  const cuerpo = bloque.split(/^---$/m)[1] || '';
  if (/\b(surco|sembr\w*|semillas? una|harina|al horno|amasa\w*|ordeñ\w*|el balde|aguja|hilv\w*)\b/i.test(cuerpo) && !/^se_hace_en:/m.test(bloque)) malas.push(`conversación ${id}: es con las manos (${cuerpo.match(/\b(surco|sembr\w*|semillas? una|harina|al horno|amasa\w*|ordeñ\w*|el balde|aguja|hilv\w*)\b/i)[0]}), y no dice dónde se hace («se_hace_en:»)`); }
// an option that quotes what Ana says («-> «Perdón. Ahora mismo me visto.»») is what she says: her first line says it
// (not something else, «se me olvidó…»): at least half of its words
{ const palabras = t => new Set(t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/[^a-zñ]+/).filter(w => w.length > 3));
  const L = guion.split('\n');
  L.forEach((l, i) => { const m = l.match(/^\s*->\*?\s*«(.+)»\s*$/); if (!m) return;
    const sig = L.slice(i + 1, i + 6).find(x => /^\s+ana:/.test(x)); if (!sig) return;
    const A = palabras(m[1]), B = palabras(sig.replace(/^\s*ana:\s*(\([^)]*\)\s*)?/, '')); if (A.size < 3) return;
    const n = [...A].filter(w => B.has(w)).length; if (n / A.size < .5) malas.push(`opción «${m[1].slice(0, 60)}»: Ana dice otra cosa («${sig.trim().slice(5, 75)}…»)`); }); }
// every letter Ana writes and every answer she gets is a scene of the script, with its conditions (the model reads them):
// for each one she can write to (src/js/62-cartas.js, CORREO), at least one letter and one answer
for (const k of [...leer('src/js/62-cartas.js').matchAll(/^  (\w+): \{ nombre:/gm)].map(m => m[1])) {
  if (!new RegExp(`^=== carta_${k}`, 'm').test(guion)) malas.push(`cartas: no hay escena para escribirle a ${k} (carta_${k}_…, «si: carta:${k}»): saldría un texto fijo, sin condiciones`);
  if (!new RegExp(`^de: ${k}$`, 'm').test(guion)) malas.push(`cartas: ${k} no tiene ninguna respuesta en el guion («canal: respuesta», «de: ${k}»)`); }
// the milestones (src/datos/hitos.txt): what each needs is another milestone (with one of its answers, if it says
// one) or a condition; what says it happened and its answers, well-written conditions; nothing needed round and round
{ const H = {}; let h = null; const alts = v => v.split('|').map(x => x.split(',').map(c => c.trim()).filter(Boolean)).filter(a => a.length);
  for (const raw of leer('src/datos/hitos.txt').split('\n')) { const s = raw.trim(); if (!s || s[0] === '#') continue; let m;
    if ((m = s.match(/^===\s*(.+?)\s*===$/))) { h = H[m[1]] = { necesita: [], pasa: [], resp: {}, peso: null, libro: '', otra: null }; continue; } if (!h) continue;
    if ((m = s.match(/^respuesta (\w+):\s*(.*)$/))) { h.resp[m[1]] = alts(m[2]); continue; }
    if ((m = s.match(/^necesita:\s*(.*)$/))) h.necesita = m[1].split(',').map(x => x.trim()).filter(Boolean);
    if ((m = s.match(/^pasa si:\s*(.*)$/))) h.pasa = alts(m[1]);
    if ((m = s.match(/^libro:\s*(.*)$/))) h.libro = m[1];
    if ((m = s.match(/^otra oportunidad:\s*(.*)$/))) h.otra = m[1];
    if ((m = s.match(/^peso:\s*(\S+)/))) h.peso = m[1]; }
  for (const [k, x] of Object.entries(H)) {
    anota(hace, 'historia_' + k, 'hitos'); for (const r of Object.keys(x.resp)) anota(hace, 'historia_' + k + '_' + r, 'hitos'); anota(hace, 'historia_' + k + '_cerrado', 'hitos');   // (src/js/66-hitos.js leaves them)
    if (!x.pasa.length) malas.push(`hito ${k}: no dice cuándo pasa («pasa si:»)`);
    if (!['nucleo', 'menor'].includes(x.peso)) malas.push(`hito ${k}: peso «${x.peso}» (nucleo o menor)`);
    if (x.otra == null || !/^\d+$/.test(x.otra)) malas.push(`hito ${k}: «otra oportunidad» tiene que ser un número (0, 1…)`);
    const lr = x.libro.match(/^(\w+) —/)?.[1]; if (Object.keys(x.resp).length && !x.resp[lr]) malas.push(`hito ${k}: «libro:» tiene que empezar con la respuesta del libro (una de: ${Object.keys(x.resp).join(', ')}) y « — »`);
    for (const a of [...x.pasa, ...Object.values(x.resp).flat()]) a.forEach(y => condicion(y, 'hito ' + k));
    for (const n of x.necesita) { const [id, r] = n.split(':');
      if (H[id]) { if (r && !H[id].resp[r]) malas.push(`hito ${k}: necesita «${n}», y ${id} no tiene la respuesta «${r}»`); }
      else if (/[:!]/.test(n)) condicion(n, 'hito ' + k); else malas.push(`hito ${k}: necesita «${n}», que no es un hito`); }
    const ve = (n, vis) => vis.has(n) ? true : (H[n]?.necesita || []).map(y => y.split(':')[0]).some(y => H[y] && ve(y, new Set([...vis, n])));
    if (x.necesita.map(y => y.split(':')[0]).some(n => H[n] && ve(n, new Set([k])))) malas.push(`hito ${k}: se necesita a sí mismo (en círculo)`); } }
// what a line says Ana does with her body, the scene does: «sube a su pieza», «escaleras arriba» needs «a_pieza» or
// «acostarse» in the same option (or the whole scene); otherwise the text says she left and she is still there
const MUEVE = [[/escaleras? arriba|sube la escalera|corre a su pieza|se va a su pieza|sube a su pieza/i, /(^|\s)(a_pieza|acostarse)\b/, '«a_pieza» o «acostarse»']];
for (const bloque of guion.split(/^(?====)/m)) {
  const id = bloque.match(/^===\s*(.+?)\s*===/)?.[1]; if (!id) continue;
  const [cab, ...resto] = bloque.split(/^---\s*$/m), cuerpo = resto.join('---'), partes = [[]]; let enOpcion = false;
  if (/^disparo:\s*primera/m.test(cab) || /^tambien\s*$/m.test(cab)) continue;   // (the thing is done too: the line tells it as it happens)   // (a «primera» scene tells what she is doing as she does it: she is already on the stairs)
  for (const l of cuerpo.split('\n')) { if (/^\s*->/.test(l)) { partes.push([l]); enOpcion = true; } else if (enOpcion && /^\S/.test(l)) { partes.push([l]); enOpcion = false; } else partes[partes.length - 1].push(l); }
  for (const P of partes) for (const [dice, hace, que] of MUEVE) {
    const l = P.find(x => /^\s*ana(\s+piensa)?:/.test(x) && dice.test(x));
    if (l && !P.some(x => /^\s*!/.test(x) && hace.test(x.replace(/^\s*!\s*/, ' '))) && !cab.split('\n').some(x => /^al_(empezar|terminar):/.test(x) && hace.test(x.replace(/^al_\w+:\s*/, ' '))))
      malas.push(`escena ${id}: «${l.trim().slice(0, 70)}» dice que Ana se mueve, y la escena no la mueve (falta ${que})`);
  }
}
// before Marilla accepts Ana (days 1 to 3), only what is marked «a prueba» (as in the notebook): every other scene
// waits for «se_queda», by itself or through what it needs (a fact that only scenes after it leave, a goal of the
// notebook, a day of the game past the third, another season). The scenes of a place or a thing (disparo: lugar,
// objeto, primera) are moments of a place, and go as they are
{ const porId = new Map(escenas.map(e => [e.id, e])), memo = new Map(), metasDespues = m => !A_PRUEBA.has(m);
  const despues = (id, vis = new Set()) => {
    if (memo.has(id)) return memo.get(id); if (vis.has(id)) return false; vis.add(id);
    const e = porId.get(id); if (!e) return false;
    const cs = (e.si || '').split(',').map(c => c.trim()).filter(Boolean);
    const r = cs.some(c => { let m;
      if ((m = c.match(/^(hecho|dias_desde|horas_desde):(\w+)/))) { if (m[2] === 'se_queda') return true; const M = [...(hace[m[2]] || [])]; return M.length > 0 && M.every(w => /^escena /.test(w) && despues(w.slice(7).replace(/ \(.*\)$/, ''), vis)); }
      if ((m = c.match(/^dicha:(\w+)/))) return despues(m[1], vis);
      if ((m = c.match(ESTADO_RE)) && ESTADO[m[1]]) { if (m[1] === 'ana_en_tv' && (c === 'ana_en_tv=se_queda' || c === 'ana_en_tv>=se_queda')) return true; const S = estadoCumplen(m[1], m[2], m[3]); if (S.includes(ESTADO[m[1]].inicial)) return false; return S.every(x => { const M = [...(hace[m[1] + '=' + x] || [])]; return M.length > 0 && M.every(w => /^escena /.test(w) && despues(w.slice(7).replace(/ \(.*\)$/, ''), vis)); }); }
      if ((m = c.match(/^cuaderno:(\w+)/))) return metasDespues(m[1]);
      if ((m = c.match(/^dia_juego:(\d+)/))) return +m[1] >= 4;   // (Marilla decides on the third day: the fourth is after)
      if ((m = c.match(/^estacion:(\w+)/))) return m[1] !== 'primavera';
      return false; });
    memo.set(id, r); return r; };
  for (const e of escenas) if (!e.aPrueba && !/^(lugar|objeto|primera)$/.test(e.disparo || '') && !despues(e.id))
    malas.push(`escena ${e.id}: puede pasar antes de que Marilla acepte a Ana (que pida «hecho:se_queda», o lo que viene después; o márquela «a prueba»)`); }
// the reads of the state: what satisfies them from the start needs nothing; otherwise, the values that some scene sets
// (if none does, it could never happen)
for (const { donde, v, S } of estadoLee) {
  if (S.includes(ESTADO[v].inicial)) { for (const x of S) anota(pide, v + '=' + x + ' ', donde); continue; }
  const P = S.filter(x => hace[v + '=' + x]); if (!P.length) { malas.push(`${donde}: pide ${v} en ${S.join(' o ')}, y ninguna escena lo pone`); continue; }
  for (const x of P) anota(pide, v + '=' + x, donde); }
// the lines of the things and the places: every scene of a thing or a place has its step («paso: 1», «4.1»), one step
// each («4.1» and «4.2» are variants of one); and every line its wildcard («paso: siempre», with no conditions): there
// is always something to say
{ const L = {}; for (const e of escenas) if (/^(objeto|lugar)$/.test(e.disparo || '')) { const k = e.disparo + ' ' + (e.objeto || e.lugar); (L[k] ||= []).push(e); }
  for (const [k, es] of Object.entries(L)) {
    for (const e of es) if (!e.paso) malas.push(`escena ${e.id}: es de la línea de ${k} y no dice su paso («paso: 3», o «paso: siempre»)`);
    const vistos = {}; for (const e of es) if (e.paso && e.paso !== 'siempre') { if (vistos[e.paso]) malas.push(`línea de ${k}: el paso ${e.paso} está dos veces (${vistos[e.paso]}, ${e.id})`); vistos[e.paso] = e.id; }
    if (!es.some(e => e.paso === 'siempre' && !e.si)) malas.push(`línea de ${k}: no tiene comodín («paso: siempre», sin condiciones): alguna vez no habría nada que decir`); } }
// the report
const necesita = Object.keys(pide).filter(h => !h.endsWith(' ')), lee = new Set(Object.keys(pide).map(h => h.trim()));
for (const e of escenas) { if (e.punto) puntos.push([e.id, 'antes', e.punto]); else if (e.grande && !puntos.some(([id]) => id === e.id)) malas.push(`escena ${e.id}: es grande y no deja un punto (un momento al que volver: «punto:», justo antes, o «al_terminar: punto»)`); }
const nunca = necesita.filter(h => !hace[h] && !/^conoce_/.test(h)).sort()   /* (conoce_<who>: whoever Ana meets, src/js/66-conocidos.js) */, sinUso = Object.keys(hace).filter(h => !lee.has(h) && !h.includes('=') && !/^(hito_|historia_|llego_|se_fue_)/.test(h)).sort();
// the drawing: trazas/grafo.html (tools/grafo-dibujo.js)
const dibujo = require('./grafo-dibujo.js').dibujar({ escenas, hace, pide, puntos, nunca, malas, sinUso, metas: [...metas].map(id => ({ id, ...(METAS_INFO[id] || {}), requiere: REQ[id] || [], aPrueba: A_PRUEBA.has(id) })) }, root);
const sinResumen = dibujo.nodos.filter(n => !n.suelto && !['meta', 'sistema'].includes(n.tipo) && !n.info.resumen && !n.info.tema).map(n => n.k);
const md = ['# El grafo de la historia, revisado', '', 'Lo genera `node tools/grafo.js` (ver `docs/MOTOR.md`). Lee el guion, el cuaderno, las habilidades y el código.', '',
  `**${escenas.length} escenas** (${escenas.filter(e => e.grande).length} grandes), **${metas.size} metas** del cuaderno, **${Object.keys(hace).length} hechos** que algo deja.`, '',
  '## Escenas o metas que nunca podrían pasar', '', nunca.length ? 'Piden un hecho que nada deja:' : 'Ninguna: todo hecho que se pide, algo lo deja.', '',
  ...nunca.map(h => `- \`${h}\`: lo piden ${[...pide[h]].join(', ')}`), '',
  '## Condiciones mal escritas', '', ...(malas.length ? malas.map(m => '- ' + m) : ['Ninguna.']), '',
  '## Escenas encadenadas sin «resumen:»', '', 'No es un error: en el dibujo (trazas/grafo.html) se ve su primera frase en vez de una descripción.', '', ...(sinResumen.length ? sinResumen.map(x => '- `' + x + '`') : ['Ninguna.']), '',
  '## Los momentos a los que se puede volver (puntos)', '', ...puntos.map(([id, cuando, t]) => `- \`${id}\` (${cuando}): ${t}`), '',
  '## Hechos que se dejan y nada lee', '', 'No es un error (un hecho puede quedar para el registro), pero puede ser algo olvidado:', '',
  ...(sinUso.length ? sinUso.map(h => `- \`${h}\`: lo deja ${[...hace[h]].join(', ')}`) : ['Ninguno.']), ''];
fs.mkdirSync(path.join(root, 'trazas'), { recursive: true });
fs.writeFileSync(path.join(root, 'trazas/grafo.md'), md.join('\n'));
// the same, as data (for the spreadsheet: tools/planilla.js, tools/importar_planilla.py)
const lista = o => Object.fromEntries(Object.entries(o).map(([h, w]) => [h.trim(), [...w]]));
fs.writeFileSync(path.join(root, 'trazas/grafo.json'), JSON.stringify({ hechos: lista(hace), piden: lista(pide), metas: [...metas], claves: CLAVES, cualidades: [...CUALIDADES], noticias: [...NOTICIAS], nunca, sinUso, malas }, null, 1));
console.log(`→ trazas/grafo.md · ${escenas.length} escenas, ${metas.size} metas · nunca pasarían: ${nunca.length} · mal escritas: ${malas.length} · sin uso: ${sinUso.length}`);
process.exitCode = nunca.length || malas.length ? 1 : 0;
