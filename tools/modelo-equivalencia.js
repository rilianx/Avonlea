#!/usr/bin/env node
// Que tools/modelo.js diga lo mismo que tools/modelo.py: los corre a los dos sobre los datos de verdad y sobre
// mutaciones (una frase, una regla o una escena que el modelo tiene que señalar), cada una en una copia temporal del
// repositorio, y compara lo que encuentran. Imprime una tabla; sale con error si alguna no coincide.
// The counterexamples (the «situación» and «por qué» of each finding) come from each solver's model and may differ;
// what is compared is the verdicts: which rules flag which units, how many cases each hole has, the counts.
// Uso: node tools/modelo-equivalencia.js [--uno-por-pregunta] [nombres de mutaciones…]
const fs = require('fs'), os = require('os'), path = require('path'), { spawn } = require('child_process');
const RAIZ = path.join(__dirname, '..');
const args = process.argv.slice(2), opcionesJs = args.filter(a => a.startsWith('--')), pedidas = args.filter(a => !a.startsWith('--'));

// what a copy needs: the data, the planilla and both models (node_modules is linked, not copied)
const COPIAR = ['src/datos', 'trazas/planilla.json', 'tools/modelo.py', 'tools/bloques.py', 'tools/modelo.js', 'tools/modelo-nucleo.js'];

// each mutation edits the copy (raíz) and says what it expects the models to find
const cambiar = (raiz, archivo, f) => {
  const p = path.join(raiz, archivo), antes = fs.readFileSync(p, 'utf8'), despues = f(antes);
  if (despues === antes) throw new Error(`la mutación no cambió ${archivo} (¿cambiaron los datos?)`);
  fs.writeFileSync(p, despues);
};
const despuesDe = (ancla, nuevo) => t => { if (!t.includes(ancla)) throw new Error('no está: ' + ancla); return t.replace(ancla, ancla + nuevo); };
const MUTACIONES = [
  { nombre: 'sin cambios', espera: 'nada', aplicar: () => {} },
  { nombre: 'un dicho de Diana sin pedir la prohibición', espera: 'incoherencia (solo)',
    aplicar: r => cambiar(r, 'src/datos/dichos/40-gente.txt', t => t + '\n=== prueba_diana ===\nquien: diana\n- ¡Vamos a jugar al bosque encantado!\n') },
  { nombre: '«la niña de los Cuthbert» sin sabe:', espera: 'incoherencia (referencia)',
    aplicar: r => cambiar(r, 'src/datos/frases.txt', despuesDe('=== harrison ===\n', 'dice: [hecho:se_queda] Así que la niña de los Cuthbert anda por aquí.\n')) },
  { nombre: 'nieve en verano', espera: 'incoherencia (referencia)',
    aplicar: r => cambiar(r, 'src/datos/frases.txt', despuesDe('=== lynde ===\n', 'verano: ¡Qué nieve más rara para la época!\n')) },
  { nombre: 'una frase para el día 200', espera: 'nunca',
    aplicar: r => cambiar(r, 'src/datos/frases.txt', despuesDe('=== lynde ===\n', 'dice: [dia_juego:200] Ya pasó tanto tiempo.\n')) },
  { nombre: 'nombra a Ana sin conocerla', espera: 'nunca',
    aplicar: r => cambiar(r, 'src/datos/frases.txt', despuesDe('=== harrison ===\n', 'dice: [!conoce:harrison] Buenas tardes, Ana.\n')) },
  { nombre: '«Anaís» no es nombrar a Ana (control)', espera: 'nada',
    aplicar: r => cambiar(r, 'src/datos/frases.txt', despuesDe('=== harrison ===\n', 'dice: [!conoce:harrison] Buenas tardes, Anaís.\n')) },
  { nombre: 'un guiño de la Sra. Lynde, ofendida', espera: 'incoherencia (solo)',
    aplicar: r => cambiar(r, 'src/datos/cuaderno.txt', despuesDe('=== picnic ===\n', 'guiño lynde: Bueno, bueno, a ver cuánto te dura el genio.\n')) },
  { nombre: '«Pasa, pasa» en una escena fuera de su casa (planilla.json)', espera: 'incoherencia (referencia)',
    aplicar: r => cambiar(r, 'trazas/planilla.json', t => {
      const D = JSON.parse(t);
      D.escenas.push({ id: 'prueba_pasa', canal: 'conv', disparo: 'encuentro', prioridad: 1, interrumpe: false, grande: false, repetir: 'una_vez', si: 'hecho:se_queda, donde:ana:camino',
        en: '', hablan: 'lynde', lineas: 2, primera: 'lynde: Pasa, pasa, niña.', quienes: ['lynde', 'ana'], con: 'lynde', una_vez: true, texto: ['lynde: Pasa, pasa, niña.', 'ana: Gracias, Sra. Lynde.'] });
      return JSON.stringify(D);
    }) },
  { nombre: 'una regla: los niños reaccionan a algo que no existe', espera: 'huecos',
    aplicar: r => cambiar(r, 'src/datos/reglas.txt', t => t + '\n=== espera: prueba, reaccionan si Ana vuela ===\nquiénes: niños\ncuando: ve:{k}, ana:volando\nhay: reacción ana:volando\n') },
  { nombre: 'una regla «nunca» que lo prohíbe todo', espera: 'error (sin situaciones)',
    aplicar: r => cambiar(r, 'src/datos/reglas.txt', t => t + '\n=== nunca: prueba, ningún día ===\nsi: dia_juego:1\n') },
  { nombre: 'Diana no llega nunca', espera: 'nunca (muchas)',
    aplicar: r => cambiar(r, 'src/datos/llegadas.txt', despuesDe('llega si: dias_desde:llegada_tv:', '2')) },   // (17 → 217: after the last day)
  { nombre: 'una escena imposible (planilla.json)', espera: 'nunca (escena)',
    aplicar: r => cambiar(r, 'trazas/planilla.json', t => {
      const D = JSON.parse(t);
      D.escenas.push({ id: 'prueba_imposible', canal: 'conv', disparo: 'conversar', prioridad: 1, interrumpe: false, grande: false, repetir: 'una_vez', si: 'hecho:prohibida, !hecho:conocidas_diana',
        en: '', hablan: 'diana', lineas: 2, primera: 'ana: ¿Quién eres?', quienes: ['diana', 'ana'], con: 'diana', una_vez: true, texto: ['ana: ¿Quién eres?', 'diana: Soy Diana.'] });
      return JSON.stringify(D);
    }) },
];

function copiar(dst) {
  for (const r of COPIAR) fs.cpSync(path.join(RAIZ, r), path.join(dst, r), { recursive: true });
  fs.symlinkSync(path.join(RAIZ, 'node_modules'), path.join(dst, 'node_modules'), 'dir');
}
function correr(cmd, argv, cwd) {
  return new Promise(res => {
    const t0 = Date.now(), p = spawn(cmd, argv, { cwd, env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' } }); let out = '', err = '';
    p.stdout.on('data', d => out += d); p.stderr.on('data', d => err += d);
    p.on('close', code => {
      let json = null;
      if (code === 0) json = JSON.parse(fs.readFileSync(path.join(cwd, 'trazas/modelo.json'), 'utf8'));
      res({ code, out: out.trim(), err: err.trim().split('\n').pop(), json, seg: (Date.now() - t0) / 1000 });
    });
  });
}
// the verdicts, without what depends on the solver's model
const ordenar = xs => xs.map(x => JSON.stringify(x)).sort();
function veredicto(r) {
  if (r.code !== 0) return { error: r.err };
  const j = r.json;
  return {
    variables: j.variables, unidades: j.unidades,
    huecos: ordenar(j.huecos.map(h => ({ regla: h.regla, quien: h.quien, nombre: h.nombre, tiene: h.tiene, casos: h.casos.length }))),
    incoherencias: ordenar(j.incoherencias.map(({ ['situación']: _, ...h }) => h)),
    imposibles: ordenar(j.imposibles),
  };
}
const cuenta = r => r.code !== 0 ? 'error' : `${r.json.huecos.length} / ${r.json.incoherencias.length} / ${r.json.imposibles.length}`;
function diferencias(a, b) {
  if (a.error || b.error) return a.error === b.error ? [] : [`error: «${a.error || ''}» / «${b.error || ''}»`];
  const out = [];
  if (a.variables !== b.variables) out.push(`variables ${a.variables} / ${b.variables}`);
  if (JSON.stringify(Object.entries(a.unidades).sort()) !== JSON.stringify(Object.entries(b.unidades).sort())) out.push('unidades');
  for (const k of ['huecos', 'incoherencias', 'imposibles']) {
    const sa = new Set(a[k]), sb = new Set(b[k]);
    for (const x of a[k]) if (!sb.has(x)) out.push(`${k}: solo Python: ${x.slice(0, 160)}`);
    for (const x of b[k]) if (!sa.has(x)) out.push(`${k}: solo JS: ${x.slice(0, 160)}`);
  }
  return out;
}

(async () => {
  const lista = pedidas.length ? MUTACIONES.filter(m => pedidas.some(p => m.nombre.includes(p))) : MUTACIONES;
  const filas = []; let mal = 0;
  for (const m of lista) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'modelo-eq-'));
    try {
      copiar(dir); m.aplicar(dir);
      const [py, js] = await Promise.all([correr('python3', ['tools/modelo.py'], dir), correr('node', ['tools/modelo.js', ...opcionesJs], dir)]);
      const dif = diferencias(veredicto(py), veredicto(js));
      const señala = py.code !== 0 || py.json.huecos.length + py.json.incoherencias.length + py.json.imposibles.length > 0;
      if (dif.length) mal++;
      filas.push([m.nombre, m.espera, cuenta(py), cuenta(js), señala ? 'sí' : 'no', dif.length ? '✘ ' + dif.length : '✔', py.seg.toFixed(1), js.seg.toFixed(1)]);
      console.error(`${dif.length ? '✘' : '✔'} ${m.nombre}` + dif.map(d => '\n    ' + d).join(''));
    } finally { fs.rmSync(dir, { recursive: true, force: true }); }
  }
  const cab = ['Mutación', 'Se espera', 'Python (h / i / n)', 'JS (h / i / n)', 'Python señala', 'Igual', 'Python s', 'JS s'];
  console.log('\n| ' + cab.join(' | ') + ' |\n|' + cab.map(() => '---').join('|') + '|');
  for (const f of filas) console.log('| ' + f.join(' | ') + ' |');
  console.log(mal ? `\n${mal} de ${filas.length} no coinciden` : `\nlas ${filas.length} coinciden`);
  process.exit(mal ? 1 : 0);
})();
