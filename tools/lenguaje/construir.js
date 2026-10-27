#!/usr/bin/env node
// Los datos del lenguaje de las historias, para el motor (docs/LENGUAJE.md §13): corre el generador de Yarn, compila
// todo con tsc a una carpeta temporal, y junta en un JSON lo que declaran los archivos: el mundo, el estado, los verbos y
// los actos (con sus definiciones), las respuestas de Ana sola, las historias, sus escenas y las voces.
// Uso: node tools/lenguaje/construir.js [docs/lenguaje] [salida.json]
const fs = require('fs'), os = require('os'), path = require('path'), { execFileSync } = require('child_process');
const { construir: yarn } = require('./yarn.js');

function datos(raiz){
  yarn(raiz);
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'lenguaje-'));
  try {
    execFileSync('tsc', ['-p', raiz, '--noEmit', 'false', '--outDir', out, '--module', 'commonjs', '--moduleResolution', 'node10',
      '--verbatimModuleSyntax', 'false', '--ignoreDeprecations', '6.0'], { stdio: 'pipe' });
    const req = f => require(path.join(out, f));
    const mundo = req('comun/mundo.js'), estado = req('comun/estado.js'), ana = req('comun/ana.js');
    const verbos = {};
    for (const m of ['comun/verbos.js', 'comun/actos.js']) for (const v of Object.values(req(m))) if (typeof v === 'function' && v.def) verbos[v.verbo] = v.def;
    const historias = {}, escenas = {}, voces = req('comun/voces.datos.js').voces.map(v => ({ ...v, de: 'comun' }));
    for (const h of fs.readdirSync(path.join(raiz, 'historias'))) {
      if (!fs.existsSync(path.join(out, 'historias', h, 'historia.js'))) continue;
      const H = Object.values(req(`historias/${h}/historia.js`)).find(x => x && x.historia === h), E = req(`historias/${h}/escenas.datos.js`);
      historias[h] = H;
      for (const e of Object.values(E.escenas)) escenas[e.escena] = e;
      voces.push(...E.voces.map(v => ({ ...v, de: h })));
    }
    const D = { personas: mundo.personas, lugares: mundo.lugares, rutas: mundo.rutas, medios: mundo.medios, estados: estado.estados,
      cualidades: estado.cualidades, verbos, ana_sola: ana.ana_sola, opcion_no: ana.opcion_no, historias, escenas, voces };
    // (las funciones —un verbo nombrado en «con»— van como su nombre)
    return JSON.parse(JSON.stringify(D, (k, v) => typeof v === 'function' ? v.verbo : v));
  } catch (e) {
    throw new Error(e.stdout ? 'tsc:\n' + e.stdout.toString() : e.message);
  } finally { fs.rmSync(out, { recursive: true, force: true }); }
}
if (require.main === module) {
  const raiz = path.resolve(process.argv[2] || 'docs/lenguaje'), D = datos(raiz);
  const salida = process.argv[3];
  if (salida) fs.writeFileSync(salida, JSON.stringify(D, null, 1));
  console.log(`→ ${Object.keys(D.verbos).length} verbos, ${Object.keys(D.historias).length} historias, ${Object.keys(D.escenas).length} escenas, ${D.voces.length} voces${salida ? ' → ' + salida : ''}`);
}
module.exports = { datos };
