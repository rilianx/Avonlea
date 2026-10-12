#!/usr/bin/env node
// Builds index.html from src/: the page (src/shell.html), the script of scenes (src/datos/guion.txt), the book
// (src/datos/libro1.json), the characters (src/datos/personajes.json), the interiors drawn in Tiled (src/mapas/*.tmj) and the code, in order (src/js/NN-*.js, concatenated as they are: one script, as before).
// The game is still ONE file, so the link keeps working.
//   node tools/build.js            → writes index.html
//   node tools/build.js --check    → only checks that index.html is what src/ builds (exit 1 if not)
const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..'), src = p => path.join(root, 'src', p);
const read = p => fs.readFileSync(src(p), 'utf8');

function build(){
  const js = fs.readdirSync(src('js')).filter(f => /^\d\d-.*\.js$/.test(f)).sort().map(f => read('js/' + f)).join('\n');
  const mapas = Object.fromEntries(fs.readdirSync(src('mapas')).filter(f => f.endsWith('.tmj')).sort().map(f => [f.replace('.tmj', ''), JSON.parse(read('mapas/' + f))]));
  const code = js.replace('/*@libro1*/', () => read('datos/libro1.json')).replace('/*@personajes*/', () => read('datos/personajes.json')).replace('/*@mapas*/', () => JSON.stringify(mapas));
  return read('shell.html').replace('<!--@guion-->', () => read('datos/guion.txt')).replace('<!--@js-->', () => code);
}

const out = build(), target = path.join(root, 'index.html');
if (process.argv.includes('--check')) {
  const now = fs.readFileSync(target, 'utf8');
  if (now !== out) { console.error('index.html no coincide con src/ (corre: node tools/build.js)'); process.exit(1); }
  console.log('index.html coincide con src/');
} else { fs.writeFileSync(target, out); console.log('→ index.html (' + Math.round(out.length / 1024) + ' KB, ' + out.split('\n').length + ' líneas)'); }
