#!/usr/bin/env node
// El tablero de Tejas Verdes (trazas/tablero.html): las vidas de todos los días (docs/lenguaje/vidas/), jugando en el
// mundo (tools/mundo/), en una sola página que se abre sola. Las casillas son los lugares; las fichas, las personas.
// Uso: node tools/mundo/tablero.js
const fs = require('fs'), path = require('path'), { datos } = require('../lenguaje/construir.js');
const raiz = path.resolve(__dirname, '..', '..'), D = datos(path.join(raiz, 'docs', 'lenguaje'));
const js = f => fs.readFileSync(path.join(raiz, f), 'utf8');
const pag = fs.readFileSync(path.join(__dirname, 'tablero.html'), 'utf8')
  .replace('/*@MOTOR*/', () => ['tools/lenguaje/mundo_simulado.js', 'tools/lenguaje/motor.js', 'tools/mundo/mundo.js', 'tools/mundo/mundo_minimo.js'].map(js).join('\n'))
  .replace('/*@GEOGRAFIA*/null', () => js('tools/mundo/geografia.json').replace(/</g, '\\u003c'))
  .replace('/*@DATOS*/null', () => JSON.stringify(D).replace(/</g, '\\u003c'));
fs.writeFileSync(path.join(raiz, 'trazas', 'tablero.html'), pag);
console.log(`→ trazas/tablero.html · ${Object.keys(D.vidas.tejas_verdes).length} vidas, ${Object.keys(D.verbos).length} verbos`);
