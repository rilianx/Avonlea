#!/usr/bin/env node
// La página para probar una historia del lenguaje (trazas/lenguaje.html): los datos de docs/lenguaje/ (los arma
// tools/lenguaje/construir.js) y el motor mínimo (tools/lenguaje/motor.js), en una sola página que se abre sola.
// Uso: node tools/lenguaje/pagina.js
const fs = require('fs'), path = require('path'), { datos } = require('./construir.js');
const raiz = path.resolve(__dirname, '..', '..'), D = datos(path.join(raiz, 'docs', 'lenguaje'));
const pag = fs.readFileSync(path.join(__dirname, 'pagina.html'), 'utf8')
  .replace('/*@MOTOR*/', () => fs.readFileSync(path.join(__dirname, 'motor.js'), 'utf8'))
  .replace('/*@DATOS*/null', () => JSON.stringify(D).replace(/</g, '\\u003c'));
fs.writeFileSync(path.join(raiz, 'trazas', 'lenguaje.html'), pag);
console.log(`→ trazas/lenguaje.html · ${Object.keys(D.escenas).length} escenas, ${Object.keys(D.verbos).length} verbos`);
