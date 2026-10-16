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
const root = path.resolve(__dirname, '..'), leer = f => fs.readFileSync(path.join(root, f), 'utf8');
const guion = leer('src/datos/guion.txt') + '\n' + leer('src/datos/conversaciones.txt'), cuaderno = leer('src/datos/cuaderno.txt'), habilidades = leer('src/datos/habilidades.txt');
const codigo = fs.readdirSync(path.join(root, 'src/js')).filter(f => /^\d\d-.*\.js$/.test(f) && !/metas-de-prueba/.test(f)).map(f => leer('src/js/' + f)).join('\n');
// the keys the engine knows (dlgCond in src/js/21-escenas-dialogo.js), and a quality compared with a number
const CLAVES = ['hecho', 'dicha', 've', 'donde', 'ana', 'conoce', 'presente', 'marca', 'capitulo', 'cuaderno', 'tomando_te', 'afecto', 'dias_desde', 'sentada', 'estudio', 'camino', 'estacion', 'dia_estacion', 'dia_juego', 'hora', 'no_hoy', 'canal_libre', 'ana_visible', 'escena_ana', 'sabe', 'y_mayor', 'carta'];
const CUALIDAD = /^([a-zñ_]+):([a-zñ_]+)(?::([a-zñ_]+))?\s*(>=|<=|>|<|==|=)\s*(-?\d+(?:\.\d+)?)$/;
// the qualities there are: the affection, the skills (src/datos/habilidades.txt), and whatever a scene adds to («suma x:…»)
const CUALIDADES = new Set(['afecto', ...[...habilidades.matchAll(/^===\s*(.+?)\s*===$/gm)].map(m => m[1]), ...[...guion.matchAll(/al_(?:empezar|terminar):\s*suma\s+([a-zñ_]+):/g)].map(m => m[1])]);
const NOTICIAS = new Set([...leer('src/datos/noticias.txt').matchAll(/^===\s*(.+?)\s*===$/gm)].map(m => m[1]));   // (the news there are: src/datos/noticias.txt)
const metas = new Set([...cuaderno.matchAll(/^===\s*(.+?)\s*===$/gm)].map(m => m[1]));   // (the goals of the notebook: «dias_desde» may count from one of them)
const pide = {}, hace = {}, malas = [];   // (fact → where it is asked for / made)
const anota = (o, h, donde) => (o[h] ||= new Set()).add(donde);
function condicion(c, donde){
  c = c.trim(); if (!c) return; const neg = c[0] === '!', s = neg ? c.slice(1) : c;
  const q = s.match(CUALIDAD); if (q) { if (!CUALIDADES.has(q[1])) malas.push(`${donde}: «${c}» (no hay una cualidad «${q[1]}»: ni el afecto, ni una habilidad, ni algo que sume una escena)`); return; }
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
  if (esc.body) { const m = s.match(/^!\s*(hecho|olvidar)\s+(\S+)/); if (m) anota(m[1] === 'hecho' ? hace : pide, m[1] === 'hecho' ? m[2] : m[2] + ' ', 'escena ' + esc.id + ' (una opción)'); if (s.startsWith('->')) esc.opciones = (esc.opciones || 0) + 1; continue; }
  const i = s.indexOf(':'), k = i < 0 ? s : s.slice(0, i).trim(), v = i < 0 ? '' : s.slice(i + 1).trim();
  if (k === 'si') { esc.si = v; v.split(',').forEach(c => condicion(c, 'escena ' + esc.id)); }
  if (k === 'o') { const m = v.match(/si=(\S+)/); if (m) m[1].split(',').forEach(c => condicion(c, 'escena ' + esc.id + ' (alternativa)')); }
  if (k === 'grande') esc.grande = true;
  if (k === 'al_empezar' || k === 'al_terminar') { const [w, x] = v.split(/\s+/); if (w === 'hecho') anota(hace, x, 'escena ' + esc.id); if (w === 'olvidar') anota(pide, x + ' ', 'escena ' + esc.id); }
}
// the comments (src/datos/comentarios.txt): scenes of one line; their conditions too
{ let g = null; for (const raw of leer('src/datos/comentarios.txt').split('\n')) { const s = raw.trim(); if (!s || s[0] === '#') continue; let m;
  if ((m = s.match(/^===\s*(.+?)\s*===$/))) { g = m[1]; continue; }
  if ((m = s.match(/^si:\s*(.*)$/))) m[1].split(',').forEach(c => condicion(c, 'comentarios de ' + g));
  if ((m = s.match(/^-\s*\[([^\]]*)\]/))) m[1].split(',').forEach(c => condicion(c, 'un comentario de ' + g)); } }
// the lines of each one (src/datos/frases.txt): someone of the game, and «[condiciones] texto»
{ const quienes = new Set([...Object.keys(JSON.parse(leer('src/datos/personajes.json'))), ...[...codigo.matchAll(/^  (\w+): \{ name: /gm)].map(m => m[1]), 'vecino', 'niño', 'adultos', 'niños']); let q = null;
  for (const raw of leer('src/datos/frases.txt').split('\n')) { const s = raw.trim(); if (!s || s[0] === '#') continue; let m;
    if ((m = s.match(/^===\s*(.+?)\s*===$/))) { q = m[1]; if (!quienes.has(q)) malas.push(`frases: «${q}» no es nadie del juego`); continue; }
    if (!/^(dice|ana|primavera|verano|otoño|invierno):/.test(s)) { malas.push(`frases de ${q}: «${s.slice(0, 60)}» (empieza con dice:, ana:, o una estación)`); continue; }
    if ((m = /^\S+:\s*\[([^\]]+)\]/.exec(s))) m[1].split(',').forEach(c => condicion(c, 'una frase de ' + q)); } }
// the news (src/datos/noticias.txt): the conditions of who knows it
const llegaA = [];
{ let q = null; for (const raw of leer('src/datos/noticias.txt').split('\n')) { const s = raw.trim(); if (!s || s[0] === '#') continue; let m;
  if ((m = s.match(/^===\s*(.+?)\s*===$/))) { q = m[1]; continue; }
  if ((m = s.match(/^saben si (.+?):\s/))) m[1].split(',').forEach(c => condicion(c.trim(), 'noticia ' + q));
  if ((m = s.match(/^se entera quien la ve si:\s*(.+)$/))) m[1].split(',').forEach(c => condicion(c.trim(), 'noticia ' + q));
  if ((m = s.match(/^llega a (\w+) en:/))) llegaA.push([q, m[1]]); } }
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
let meta = null;
for (const raw of cuaderno.split('\n')) {
  const s = raw.trim(); if (!s || s[0] === '#') continue;
  const h = s.match(/^===\s*(.+?)\s*===$/); if (h) { meta = h[1]; continue; } if (!meta) continue;
  let m;
  if ((m = s.match(/^requiere:\s*(.*)$/))) for (const r of m[1].split(',').map(x => x.trim()).filter(Boolean)) {
    if (r.includes(':') || r[0] === '!') condicion(r, 'meta ' + meta); else if (!metas.has(r)) malas.push(`meta ${meta}: requiere «${r}», que no es una meta del cuaderno`);
  }
  if ((m = s.match(/^pista si (.+?):\s/))) m[1].split(',').forEach(c => condicion(c.trim(), 'meta ' + meta + ' (pista)'));
  if ((m = s.match(/^meta:\s*hecho\s+(\S+)/))) anota(pide, m[1] + ' ', 'meta ' + meta);
}
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
// the report
const necesita = Object.keys(pide).filter(h => !h.endsWith(' ')), lee = new Set(Object.keys(pide).map(h => h.trim()));
const nunca = necesita.filter(h => !hace[h] && !/^conoce_/.test(h)).sort()   /* (conoce_<who>: whoever Ana meets, src/js/66-conocidos.js) */, sinUso = Object.keys(hace).filter(h => !lee.has(h) && !/^(hito_|llego_|se_fue_)/.test(h)).sort();
const md = ['# El grafo de la historia, revisado', '', 'Lo genera `node tools/grafo.js` (ver `docs/MOTOR.md`). Lee el guion, el cuaderno, las habilidades y el código.', '',
  `**${escenas.length} escenas** (${escenas.filter(e => e.grande).length} grandes), **${metas.size} metas** del cuaderno, **${Object.keys(hace).length} hechos** que algo deja.`, '',
  '## Escenas o metas que nunca podrían pasar', '', nunca.length ? 'Piden un hecho que nada deja:' : 'Ninguna: todo hecho que se pide, algo lo deja.', '',
  ...nunca.map(h => `- \`${h}\`: lo piden ${[...pide[h]].join(', ')}`), '',
  '## Condiciones mal escritas', '', ...(malas.length ? malas.map(m => '- ' + m) : ['Ninguna.']), '',
  '## Hechos que se dejan y nada lee', '', 'No es un error (un hecho puede quedar para el registro), pero puede ser algo olvidado:', '',
  ...(sinUso.length ? sinUso.map(h => `- \`${h}\`: lo deja ${[...hace[h]].join(', ')}`) : ['Ninguno.']), ''];
fs.mkdirSync(path.join(root, 'trazas'), { recursive: true });
fs.writeFileSync(path.join(root, 'trazas/grafo.md'), md.join('\n'));
// the same, as data (for the spreadsheet: tools/planilla.js, tools/importar_planilla.py)
const lista = o => Object.fromEntries(Object.entries(o).map(([h, w]) => [h.trim(), [...w]]));
fs.writeFileSync(path.join(root, 'trazas/grafo.json'), JSON.stringify({ hechos: lista(hace), piden: lista(pide), metas: [...metas], claves: CLAVES, cualidades: [...CUALIDADES], noticias: [...NOTICIAS], nunca, sinUso, malas }, null, 1));
console.log(`→ trazas/grafo.md · ${escenas.length} escenas, ${metas.size} metas · nunca pasarían: ${nunca.length} · mal escritas: ${malas.length} · sin uso: ${sinUso.length}`);
process.exitCode = nunca.length || malas.length ? 1 : 0;
