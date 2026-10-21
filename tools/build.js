#!/usr/bin/env node
// Builds index.html from src/: the page (src/shell.html), the script of scenes (src/datos/guion.txt), the rules (src/datos/reglas.txt: the AI of the night checks with them), seeds from books (src/datos/libros.txt: for the night's topics), Ana's notebook of goals (src/datos/cuaderno.txt), her skills (src/datos/habilidades.txt), the news (src/datos/noticias.txt), who is in Avonlea when (src/datos/llegadas.txt), what each one says in passing (src/datos/frases.txt), the conversations (src/datos/conversaciones.txt), the talks of two (src/datos/charlas.txt), the book
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
  const code = js.replace('/*@libro1*/', () => read('datos/libro1.json')).replace('/*@historias*/', () => read('datos/historias.json')).replace('/*@personajes*/', () => read('datos/personajes.json')).replace('/*@mapas*/', () => JSON.stringify(mapas));
  return read('shell.html').replace('<!--@guion-->', () => read('datos/guion.txt')).replace('<!--@cuaderno-->', () => read('datos/cuaderno.txt')).replace('<!--@habilidades-->', () => read('datos/habilidades.txt')).replace('<!--@noticias-->', () => read('datos/noticias.txt')).replace('<!--@llegadas-->', () => read('datos/llegadas.txt')).replace('<!--@frases-->', () => read('datos/frases.txt')).replace('<!--@conversaciones-->', () => read('datos/conversaciones.txt')).replace('<!--@charlas-->', () => read('datos/charlas.txt')).replace('<!--@hitos-->', () => read('datos/hitos.txt')).replace('<!--@reglas-->', () => read('datos/reglas.txt')).replace('<!--@libros-->', () => read('datos/libros.txt')).replace('<!--@misiones-->', () => read('datos/misiones.txt')).replace('<!--@comentarios-->', () => read('datos/comentarios.txt')).replace('<!--@dichos-->', () => fs.readdirSync(src('datos/dichos')).filter(f => f.endsWith('.txt')).sort().map(f => read('datos/dichos/' + f)).join('\n')).replace('<!--@js-->', () => code);
}

const out = build(), target = path.join(root, 'index.html');
// the code must at least be valid JavaScript: a broken line (a comment that swallows the rest of it) stops the build here,
// not the game in the browser
{ const i = out.lastIndexOf('<script>'), j = out.lastIndexOf('</script>');
  try { new (require('vm').Script)(out.slice(i + 8, j), { filename: 'index.html (el código)' }); }
  catch (e) { console.error('El código tiene un error de sintaxis; index.html no se escribe.\n' + e.stack.split('\n').slice(0, 5).join('\n')); process.exit(1); } }
// and a comment that swallows code while still valid: the house style is a note in parentheses at the end of a line,
// «code;   // (note)»; code after such a note is lost (it happened three times)
{ const malas = [];
  for (const f of fs.readdirSync(src('js')).filter(f => f.endsWith('.js'))) read('js/' + f).split('\n').forEach((l, n) => { const i = l.indexOf('   // ('); if (i > 0 && l.trim()[0] !== '/' && /\)\s+(if|else|const|let|for|return|label|[A-Za-z_$][\w$]*(\.[\w$]+)*\s*(\(|=[^=]))/.test(l.slice(i))) malas.push(f + ':' + (n + 1) + '  ' + l.trim().slice(0, 120)); });
  if (malas.length) { console.error('Hay código después de un comentario (se pierde):\n' + malas.join('\n')); process.exit(1); } }
// and two functions with the same name: the second one silently replaces the first, everywhere (a checkpoint's
// «puntoVolver» once replaced the ending's)
{ const vistas = {}, dobles = [];
  for (const f of fs.readdirSync(src('js')).filter(f => /^\d\d-.*\.js$/.test(f)).sort()) read('js/' + f).split('\n').forEach((l, n) => { const m = l.match(/^(?:async )?function\s+([\wñ$]+)\s*\(/); if (!m) return; if (vistas[m[1]]) dobles.push(`${m[1]}: ${vistas[m[1]]} y ${f}:${n + 1}`); else vistas[m[1]] = f + ':' + (n + 1); });
  if (dobles.length) { console.error('Hay funciones con el mismo nombre (la segunda reemplaza a la primera):\n' + dobles.join('\n')); process.exit(1); } }
if (process.argv.includes('--check')) {
  const now = fs.readFileSync(target, 'utf8');
  if (now !== out) { console.error('index.html no coincide con src/ (corre: node tools/build.js)'); process.exit(1); }
  console.log('index.html coincide con src/');
} else { fs.writeFileSync(target, out); console.log('→ index.html (' + Math.round(out.length / 1024) + ' KB, ' + out.split('\n').length + ' líneas)'); }
// the graph of the story (tools/grafo.js): a scene or goal that could never happen, or a condition written wrong, is said
{ const r = require('child_process').spawnSync(process.execPath, [path.join(__dirname, 'grafo.js')], { encoding: 'utf8' }); process.stdout.write(r.stdout || ''); if (r.status) console.error('⚠ el grafo de la historia tiene problemas: ver trazas/grafo.md'); }
