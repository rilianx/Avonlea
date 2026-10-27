#!/usr/bin/env node
// Las escenas y las voces en Yarn (docs/LENGUAJE.md §8 y §9), revisadas por TypeScript: lee los .yarn de una historia
// (o los comunes), revisa que cada expresión tenga la forma permitida (nombres, llamadas, textos y números: nada más),
// y escribe dos archivos que tsc revisa junto con lo demás:
//   escenas.ids.ts      los nombres de las escenas de la historia (lo que usan historia.ts y las otras escenas)
//   *.chequeo.ts        cada escena y cada voz traducida a llamadas del lenguaje: sus activaciones, sus condiciones,
//                       quién habla, sus actos y sus comandos. Un nombre mal escrito en un .yarn es un error de tsc.
// Uso: node tools/lenguaje/yarn.js docs/lenguaje            (todas: comun/ y cada historias/<nombre>/)
const fs = require('fs'), path = require('path');

// ---------------------------------------------------------------- Yarn: nodos (cabecera, ---, cuerpo, ===)
function nodos(txt, archivo){
  const out = []; let n = null, cuerpo = false, i = 0;
  for (const raw of txt.split('\n')) {
    i++; const s = raw.replace(/\s+$/, ''), t = s.trim();
    if (!cuerpo && (!t || t.startsWith('//'))) continue;
    if (!n) n = { cab: {}, lineas: [], archivo, desde: i };
    if (!cuerpo) {
      if (t === '---') { cuerpo = true; continue; }
      const m = t.match(/^(\w+):\s*(.*)$/); if (!m) throw error(archivo, i, 'cabecera: «' + t + '»');
      n.cab[m[1]] = m[2]; continue;
    }
    if (t === '===') { out.push(n); n = null; cuerpo = false; continue; }
    if (t && !t.startsWith('//')) n.lineas.push({ s, i });
  }
  if (n) throw error(archivo, i, 'un nodo sin «===» al final');
  return out;
}
const error = (archivo, i, t) => new Error(`${archivo}:${i}: ${t}`);

// ---------------------------------------------------------------- las expresiones: solo la forma permitida
// nombres (con puntos), llamadas, textos entre comillas simples, números, comas, paréntesis, corchetes y «_»
const PERMITIDO = /^(?:\s+|[A-Za-z_ñáéíóú][\w]*|\.|,|\(|\)|\[|\]|'[^'\\\n]*'|-?\d+(?:\.\d+)?)+$/u;
function expr(e, donde){
  const t = e.trim(); if (!t) throw new Error(donde + ': una expresión vacía');
  if (!PERMITIDO.test(t)) throw new Error(donde + ': «' + t + '» no es una expresión permitida (solo nombres, llamadas, textos y números)');
  let p = 0; for (const c of t) { if (c === '(' || c === '[') p++; if (c === ')' || c === ']') p--; if (p < 0) break; }
  if (p) throw new Error(donde + ': paréntesis sin cerrar en «' + t + '»');
  return t;
}
// una lista separada por comas, solo en el primer nivel
function partes(t){ const out = []; let p = 0, q = false, a = ''; for (const c of t) { if (c === "'") q = !q; if (!q && (c === '(' || c === '[')) p++; if (!q && (c === ')' || c === ']')) p--; if (c === ',' && !p && !q) { out.push(a); a = ''; } else a += c; } if (a.trim()) out.push(a); return out.map(x => x.trim()); }
const ident = t => [...t.replace(/'[^']*'/g, '').matchAll(/(?<![\w.])([A-Za-z_]\w*)(?!\w)(?!\s*:)/gu)].map(m => m[1]);   // (no las claves de un objeto: «si:»)

// ---------------------------------------------------------------- una escena
const MOMENTOS = ['empieza', 'cumplido', 'fallido', 'sigue'];
function activacion(a, historia, donde){
  const w = a.trim().split(/\s+/);
  if (w[0] === 'tras' && w.length === 2) return `tras(escena.${expr(w[1], donde)})`;
  if (w.length === 3 && (w[1] === 'acepta' || w[1] === 'rechaza')) return `responde('${expr(w[0], donde)}', '${w[1]}', ${expr(w[2], donde)})`;   // la respuesta a un pedido
  const m = w.at(-1); if (!MOMENTOS.includes(m)) throw new Error(donde + ': «' + a + '»: el momento es uno de ' + MOMENTOS.join(', '));
  const camino = w.at(-2).split('.'), pasos = `'${camino.slice(1).map(x => expr(x, donde)).join('.')}'`;
  if (w.length === 3) return `hace('${expr(w[0], donde)}', ${expr(camino[0], donde)}, ${pasos}, '${m}')`;   // un verbo de alguien
  if (w.length === 2) return `momento(${historia}.encargo.${expr(camino[0], donde)}, ${pasos}, '${m}')`;     // un encargo de la historia
  throw new Error(donde + ': «' + a + '» no es una activación');
}
function escena(n, historia){
  const donde = `${n.archivo}:${n.desde} (${n.cab.title})`, efectos = [], hablan = new Set(), conds = [];
  if (!n.cab.title || !n.cab.resumen) throw new Error(donde + ': falta title o resumen');
  if (!n.cab.se_activa) throw new Error(donde + ': falta se_activa');
  for (const { s, i } of n.lineas) {
    const t = s.trim(), d = `${n.archivo}:${i}`;
    let m;
    if ((m = t.match(/^<<(if|elseif)\s+(.*)>>$/))) { conds.push(expr(m[2], d)); continue; }
    if (/^<<(else|endif)>>$/.test(t)) continue;
    if ((m = t.match(/^<<(.*)>>$/))) { efectos.push(expr(m[1], d)); continue; }
    if (t.startsWith('->')) continue;                                   // una opción (su texto y sus etiquetas)
    if ((m = t.match(/^(\w+):\s*(.*?)((?:\s+#\S+)*)$/))) {
      hablan.add(m[1]);
      for (const tag of m[3].trim().split(/\s+/).filter(Boolean).map(x => x.slice(1))) {
        if (tag === 'piensa') continue;
        const [acto, ...args] = tag.split(':');                          // #ofender:ana → ofender('srapye', 'ana')
        efectos.push(`${expr(acto, d)}('${m[1]}'${args.map(x => `, '${expr(x, d)}'`).join('')})`);
      }
      continue;
    }
    throw error(n.archivo, i, '«' + t + '» no es una línea de Yarn (quien: texto, -> opción, <<comando>>)');
  }
  const si = n.cab.si ? partes(n.cab.si).map(c => expr(c, donde)) : [];
  return `defEscena(escena.${n.cab.title}, {
  se_activa: [${n.cab.se_activa.split('|').map(a => activacion(a, historia, donde)).join(', ')}],
  si: y(${[...si, ...conds].join(', ')}),
  hablan: [${[...hablan].map(q => `'${q}'`).join(', ')}],
  efectos: [${efectos.join(', ')}],
})`;
}

// ---------------------------------------------------------------- una voz
function voz(n){
  const donde = `${n.archivo}:${n.desde} (${n.cab.title})`, lineas = [];
  if (!n.cab.voz) throw new Error(donde + ': falta voz');
  for (const { s, i } of n.lineas) {
    const m = s.trim().match(/^=>\s*(.*?)(?:\s*<<if\s+(.*)>>)?$/);
    if (!m) throw error(n.archivo, i, 'una voz es un grupo de variantes: «=> texto» o «=> texto <<if condición>>»');
    lineas.push(m[2] ? expr(m[2], `${n.archivo}:${i}`) : 'true');
  }
  return `voz(${expr(n.cab.voz, donde)}, { ${n.cab.paso ? `paso: '${expr(n.cab.paso, donde)}', ` : ''}lineas: [${lineas.join(', ')}] })`;
}

// ---------------------------------------------------------------- los imports: solo lo que se usa, de donde está
// (lo local primero —historia.ts, escenas.ids.ts—: tapa a lo común con el mismo nombre)
function exportsDe(archivo){
  const t = fs.readFileSync(archivo, 'utf8'), out = new Set();
  for (const m of t.matchAll(/^export\s+(?:const|function|class|let)\s+(\w+)/gm)) out.add(m[1]);
  for (const m of t.matchAll(/^export\s+const\s+\{([^}]*)\}/gm)) m[1].split(',').forEach(x => out.add(x.trim()));
  for (const m of t.matchAll(/^export\s+\{([^}]*)\}/gm)) m[1].split(',').forEach(x => out.add(x.trim().split(/\s+as\s+/).at(-1)));
  return out;
}
function imports(cuerpo, modulos, base){
  const usados = new Set(ident(cuerpo)), dados = new Set(), lineas = [];
  for (const [archivo, nombres] of modulos) {
    const de = [...nombres].filter(x => usados.has(x) && !dados.has(x)).sort(); de.forEach(x => dados.add(x));
    if (de.length) lineas.push(`import { ${de.join(', ')} } from '${path.relative(base, archivo).replace(/\\/g, '/').replace(/\.ts$/, '').replace(/^(?!\.)/, './')}'`);
  }
  const falta = [...usados].filter(x => !dados.has(x) && !['true'].includes(x));
  if (falta.length) throw new Error(base + ': nombres que no están declarados en ninguna parte: ' + falta.join(', '));
  return lineas.join('\n');
}
const CABEZA = f => `// GENERADO por tools/lenguaje/yarn.js desde ${f}: no editar a mano.\n`;

// ---------------------------------------------------------------- todo
function construir(raiz){
  const comun = path.join(raiz, 'comun'), mods = ['lenguaje', 'mundo', 'estado', 'verbos', 'actos', 'ana'].map(m => path.join(comun, m + '.ts'));
  const modulosComunes = mods.map(f => [f, exportsDe(f)]);
  const escritos = [];
  // las voces comunes
  if (fs.existsSync(path.join(comun, 'voces.yarn'))) {
    const vs = nodos(fs.readFileSync(path.join(comun, 'voces.yarn'), 'utf8'), 'comun/voces.yarn').map(voz);
    const cuerpo = vs.join('\n');
    fs.writeFileSync(path.join(comun, 'voces.chequeo.ts'), CABEZA('comun/voces.yarn') + imports(cuerpo + ' voz', modulosComunes, comun) + '\n\n' + vs.map(v => v + '\n').join(''));
    escritos.push('comun/voces.chequeo.ts (' + vs.length + ' voces)');
  }
  // cada historia
  for (const h of fs.readdirSync(path.join(raiz, 'historias'))) {
    const dir = path.join(raiz, 'historias', h), f = path.join(dir, 'escenas.yarn'); if (!fs.existsSync(f)) continue;
    const ns = nodos(fs.readFileSync(f, 'utf8'), `historias/${h}/escenas.yarn`), ids = ns.map(n => n.cab.title);
    const rep = ids.find((x, i) => ids.indexOf(x) !== i); if (rep) throw new Error(`historias/${h}/escenas.yarn: dos escenas «${rep}»`);
    fs.writeFileSync(path.join(dir, 'escenas.ids.ts'), CABEZA(`historias/${h}/escenas.yarn`)
      + `import { escenasDe } from '../../comun/lenguaje'\n\nexport const { escena, dichas } = escenasDe('${h}', [\n${ids.map(x => `  '${x}',\n`).join('')}] as const)\n`);
    const es = ns.map(n => escena(n, h));
    const vf = path.join(dir, 'voces.yarn'), vs = fs.existsSync(vf) ? nodos(fs.readFileSync(vf, 'utf8'), `historias/${h}/voces.yarn`).map(voz) : [];
    const cuerpo = [...es, ...vs].join('\n');
    const locales = [[path.join(dir, 'historia.ts'), exportsDe(path.join(dir, 'historia.ts'))], [path.join(dir, 'escenas.ids.ts'), new Set(['escena', 'dichas'])]];
    fs.writeFileSync(path.join(dir, 'escenas.chequeo.ts'), CABEZA(`historias/${h}/escenas.yarn y voces.yarn`)
      + imports(cuerpo + ' defEscena y voz', [...locales, ...modulosComunes], dir) + '\n\n' + [...es, ...vs].map(x => x + '\n').join(''));
    escritos.push(`historias/${h}: ${es.length} escenas, ${vs.length} voces`);
  }
  return escritos;
}
if (require.main === module) {
  try { for (const e of construir(path.resolve(process.argv[2] || 'docs/lenguaje'))) console.log('→ ' + e); }
  catch (e) { console.error('✘ ' + e.message); process.exit(1); }
}
module.exports = { construir };
