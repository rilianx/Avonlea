#!/usr/bin/env node
// El modelo lógico de las interacciones, en Node: busca huecos e incoherencias con un solucionador (Z3, z3-solver).
// The same model as tools/modelo.py (the core is tools/modelo-nucleo.js, which also runs in the browser): this reads
// the data files and trazas/planilla.json, and writes trazas/modelo.md and trazas/modelo.json, as modelo.py does.
// Uso: npm install && node tools/planilla.js (para trazas/planilla.json) && node tools/modelo.js [--uno-por-pregunta]
//   --uno-por-pregunta: a new solver for each question, as modelo.py (slower; to check the incremental one)
const fs = require('fs'), path = require('path');
const { init } = require('z3-solver');
const { modelo } = require('./modelo-nucleo.js');

const RAIZ = path.join(__dirname, '..');
// what the model reads (by path from the repo root, as the core names them)
const ARCHIVOS = ['src/datos/llegadas.txt', 'src/datos/guion.txt', 'src/datos/conversaciones.txt', 'src/datos/reglas.txt', 'src/datos/frases.txt', 'src/datos/cuaderno.txt'];

(async () => {
  const textos = {};
  for (const r of ARCHIVOS) textos[r] = fs.readFileSync(path.join(RAIZ, r), 'utf8');
  for (const n of fs.readdirSync(path.join(RAIZ, 'src/datos/dichos'))) if (n.endsWith('.txt')) textos['src/datos/dichos/' + n] = fs.readFileSync(path.join(RAIZ, 'src/datos/dichos', n), 'utf8');
  const planilla = JSON.parse(fs.readFileSync(path.join(RAIZ, 'trazas/planilla.json'), 'utf8'));
  const z3 = await init(); const Z3ctx = z3.Context('main');
  let r;
  try { r = await modelo({ Z3ctx, textos, datos: { planilla }, incremental: !process.argv.includes('--uno-por-pregunta') }); }
  catch (e) { console.error(e.message); process.exit(1); }
  // (as Python's json.dump: indent 1, and the seconds always a float)
  fs.writeFileSync(path.join(RAIZ, 'trazas/modelo.json'), JSON.stringify(r.json, null, 1).replace(/^ "segundos": (\d+),$/m, ' "segundos": $1.0,'));
  fs.writeFileSync(path.join(RAIZ, 'trazas/modelo.md'), r.md);
  console.log(r.resumen);
  process.exit(0);   // (z3-solver's worker threads would keep Node alive)
})();
