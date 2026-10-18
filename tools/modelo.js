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

// the texts the model reads, from a checkout (this one, or a copy with more scenes)
function leerTextos(raiz = RAIZ){
  const textos = {};
  for (const r of ARCHIVOS) textos[r] = fs.readFileSync(path.join(raiz, r), 'utf8');
  for (const n of fs.readdirSync(path.join(raiz, 'src/datos/dichos'))) if (n.endsWith('.txt')) textos['src/datos/dichos/' + n] = fs.readFileSync(path.join(raiz, 'src/datos/dichos', n), 'utf8');
  return textos;
}
// the gaps of one game (src/datos/reglas.txt, «laguna:»): partida = { dia, hechos: {x: día}, metas: {m: día}, conoce: [...], dichas: [...] }
let z3ctx = null;
async function lagunas(partida, raiz = RAIZ){
  if (!z3ctx) { const z3 = await init(); z3ctx = z3.Context('main'); }
  const planilla = JSON.parse(fs.readFileSync(path.join(raiz, 'trazas/planilla.json'), 'utf8'));
  return modelo({ Z3ctx: z3ctx, textos: leerTextos(raiz), datos: { planilla }, partida });
}
module.exports = { leerTextos, lagunas };

// Uso, para una partida: node tools/modelo.js --partida partida.json (sus lagunas, en la salida y en trazas/lagunas.json)
if (require.main === module) (async () => {
  const i = process.argv.indexOf('--partida');
  if (i > 0) {
    const r = await lagunas(JSON.parse(fs.readFileSync(path.resolve(process.argv[i + 1]), 'utf8')));
    fs.writeFileSync(path.join(RAIZ, 'trazas/lagunas.json'), JSON.stringify(r.lagunas, null, 1));
    for (const l of r.lagunas) console.log('-', l.de === 'decisiones' ? `${l.hecho} (en ${l.escena}: «${l.opcion}»): nada lo toma en cuenta` : `${l.nombre}: no queda ninguna escena`);
    console.log(r.resumen); process.exit(0);
  }

  const textos = leerTextos();
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
