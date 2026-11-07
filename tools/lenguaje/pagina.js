#!/usr/bin/env node
// La página para probar una historia del lenguaje (trazas/lenguaje.html): los datos de docs/lenguaje/ (los arma
// tools/lenguaje/construir.js) y el motor (tools/lenguaje/motor.js, con el mundo simulado de tools/lenguaje/mundo_simulado.js,
// o el mundo mínimo de tools/mundo/ —el mapa real, dibujado desde arriba—), en una sola página que se abre sola.
// Uso: node tools/lenguaje/pagina.js
const fs = require('fs'), path = require('path'), { datos } = require('./construir.js');
const raiz = path.resolve(__dirname, '..', '..'), D = datos(path.join(raiz, 'docs', 'lenguaje'));
const pag = fs.readFileSync(path.join(__dirname, 'pagina.html'), 'utf8')
  .replace('/*@MOTOR*/', () => [path.join(__dirname, 'mundo_simulado.js'), path.join(__dirname, 'motor.js'), path.join(raiz, 'tools', 'mundo', 'mundo.js'), path.join(raiz, 'tools', 'mundo', 'mundo_minimo.js')].map(f => fs.readFileSync(f, 'utf8')).join('\n'))
  .replace('/*@GEOGRAFIA*/null', () => fs.readFileSync(path.join(raiz, 'tools', 'mundo', 'geografia.json'), 'utf8').replace(/</g, '\\u003c'))
  .replace('/*@DATOS*/null', () => JSON.stringify(D).replace(/</g, '\\u003c'));
fs.writeFileSync(path.join(raiz, 'trazas', 'lenguaje.html'), pag);
console.log(`→ trazas/lenguaje.html · ${Object.keys(D.escenas).length} escenas, ${Object.keys(D.verbos).length} verbos`);
