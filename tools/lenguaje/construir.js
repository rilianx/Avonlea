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
    // (las vidas: lo que cada uno hace todos los días —docs/lenguaje/vidas/—; sus verbos, con los demás)
    const vidas = {}, cosas = { tipos: {}, inicio: {} }, muebles = {}, procesos = {}, inicio = {};
    for (const f of fs.existsSync(path.join(raiz, 'vidas')) ? fs.readdirSync(path.join(raiz, 'vidas')).filter(f => f.endsWith('.ts')) : []) {
      const m = req('vidas/' + f.replace(/\.ts$/, '.js')), id = f.replace(/\.ts$/, '');
      for (const v of Object.values(m)) if (typeof v === 'function' && v.def) verbos[v.verbo] = v.def;
      vidas[id] = Object.fromEntries((m.vidas || []).map(v => [v.vida, v.hace]));
      for (const v of Object.values(m)) {   // (las cosas —sus tipos, y dónde hay al empezar—, los muebles, lo que pasa solo)
        if (v && v._cosas) { Object.assign(cosas.tipos, v._cosas.tipos); for (const [d, c] of Object.entries(v._cosas.inicio)) cosas.inicio[d] = { ...cosas.inicio[d], ...c }; }
        if (v && v._muebles) for (const [l, x] of Object.entries(v._muebles)) muebles[l] = { ...muebles[l], ...x };
        if (v && v._procesos) procesos[id] = [...(procesos[id] || []), ...v._procesos];
        if (v && v._inicio) inicio[id] = { ...inicio[id], ...v._inicio };
      }
    }
    // (las charlas: lo que se dicen los que se encuentran —docs/lenguaje/charlas/—)
    const charlas = {};
    for (const f of fs.existsSync(path.join(raiz, 'charlas')) ? fs.readdirSync(path.join(raiz, 'charlas')).filter(f => f.endsWith('.datos.ts')) : [])
      for (const c of Object.values(req('charlas/' + f.replace(/\.ts$/, '.js')).charlas)) charlas[c.charla] = c;
    const D = { vidas, cosas, muebles, procesos, inicio, charlas, personas: mundo.personas, aspecto: mundo.aspecto, tableros: mundo.tableros, planos: mundo.planos, lugares: mundo.lugares, rutas: mundo.rutas, medios: mundo.medios, nombrables: mundo.nombrables, estados: estado.estados,
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
  console.log(`→ ${Object.keys(D.verbos).length} verbos, ${Object.keys(D.historias).length} historias, ${Object.keys(D.escenas).length} escenas, ${D.voces.length} voces, ${Object.keys(D.charlas).length} charlas${salida ? ' → ' + salida : ''}`);
}
module.exports = { datos };
