#!/usr/bin/env node
// «Mientras Ana duerme», desde Node: arma el mismo pedido que el juego le hace a la IA de la noche (src/js/66-noche.js) para
// una partida (un escenario de aquí, o una partida guardada), le pide los bloques a OpenAI (con OPENAI_API_KEY) o los lee de
// un archivo (--respuesta), y los revisa dos veces: en el juego (nocheValidar, en Chromium) y con todo lo de las
// herramientas: tools/grafo.js y el modelo con Z3 (tools/modelo.js), sobre una copia de los datos con los bloques
// aceptados agregados. Deja un informe (markdown y JSON) e imprime la tabla.
// Uso: node tools/noche.js [--escenario spencer_rachel | rival_ignora | partida.json] [--nivel efectos] [--modelo gpt-5.4-mini]
//                          [--respuesta archivo.json] [--salida trazas/noche] [--sin-modelo]
//   --respuesta: lo que contestó la IA ({ bloques: [...] }, o la respuesta entera de la API); cada bloque puede decir
//                «esperado»: aceptado | rechazado (los ejemplos de tools/noche/ejemplos/): si no se cumple, sale con 1.
//                El archivo puede traer «escenario» y «nivel» (los suyos, si no se dan aquí) y «reparacion»: lo que la IA
//                contestaría en la segunda ronda (sin eso, de un archivo no hay segunda ronda).
//   Dos rondas, como en el juego: lo descartado vuelve una vez a la IA, con sus motivos, para que lo corrija.
//   Sin --respuesta: llama a OpenAI con process.env.OPENAI_API_KEY; si no se puede (sin clave, sin red), lo dice y sale con 2.
const fs = require('fs'), os = require('os'), path = require('path'), { spawn, spawnSync } = require('child_process');
const RAIZ = path.join(__dirname, '..');
const { BASE, FILA_ESCENA } = require('./momentos');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : d; };
const RESPUESTA = arg('respuesta', null), RESP = RESPUESTA ? JSON.parse(fs.readFileSync(path.resolve(RESPUESTA), 'utf8')) : null;   // (an example may say its scenario and level)
const NIVEL = arg('nivel', RESP?.nivel || 'efectos'), MODELO = arg('modelo', ''), SALIDA = path.resolve(RAIZ, arg('salida', 'trazas/noche'));
const ESCENARIO = arg('escenario', RESP?.escenario || 'spencer_rachel'), SIN_MODELO = process.argv.includes('--sin-modelo'), VARIANTE = arg('variante', ''), CANDIDATOS = arg('candidatos', null), JUEZ = arg('juez', ''), COMPARAR = arg('comparar', '');   // (--comparar: a cheap judge that scores what stays, to compare versions of the request: trazas/temas/juez-barato.md)   // (--candidatos: how many the AI writes, to choose the best; 0: as many as stay. --juez: the judge's model)   // (a version of the request: src/js/66-noche.js, NOCHE_VARIANTE)

// ---------------------------------------------------------------- the scenarios: a game at a certain point (in the game: dev)
const D = (d, t) => ({ d, s: 1, t, h: 15 });
const ESCENARIOS = {
  spencer_rachel: { titulo: 'Escribió 3 cartas a la Sra. Spencer, se contuvo con Rachel (día 16, verano)', dia: 16, estacion: 1,
    hechos: { ...BASE, a_prueba: 2, se_queda: 3, lynde_visita: 15, lynde_contenida: 15 },
    cartas: [{ id: 1, de: 'ana', para: 'spencer', texto: [], dia: 2, estado: 'entregada', escena: 'carta_spencer_prueba', resp: 25 }, { id: 2, de: 'ana', para: 'spencer', texto: [], dia: 9, estado: 'enviada', escena: 'carta_spencer_1', envio: 10 },
      { id: 3, de: 'ana', para: 'spencer', texto: [], dia: 14, estado: 'escrita', escena: 'carta_spencer_1' }],
    diario: [D(6, 'Ana le escribió una carta a la Sra. Spencer.'), D(8, 'Ana fue al Lago de las Aguas Brillantes.'), D(10, 'Ana le escribió una carta a la Sra. Spencer.'), D(12, 'Ana regó la huerta de Tejas Verdes.'),
      D(15, 'Ana le escribió una carta a la Sra. Spencer.'), D(15, 'La Sra. Lynde vino a Tejas Verdes a conocer a Ana, y le dijo que era flaca, fea y pelirroja. Ana se contuvo.'), D(16, 'Ana fue al Lago de las Aguas Brillantes.')],
    conversaciones: ['conv_marilla_e', 'conv_marilla_hablar'], visitas: { lago: { n: 4, d: 16 } } },
  rival_ignora: { titulo: 'En la escuela, Ana ignoró a Gilbert («¡Zanahorias!»): el libro dice otra cosa (día 33, otoño)', dia: 33, estacion: 2,
    hechos: { ...BASE, a_prueba: 2, se_queda: 3, lynde_visita: 15, disculpa_lynde: 16, llego_diana: 18, barry_presenta: 18, conocidas_diana: 19, llego_gilbert: 29, zanahorias: 30, zanahorias_ignora: 30, conoce_gilbert: 30 },
    metas: { amigas: 20 }, diario: [D(30, 'Ana fue a la escuela por primera vez. Gilbert Blythe le dijo «¡Zanahorias!», y Ana hizo como que no lo oía.'), D(31, 'Ana y Diana fueron juntas a la escuela.'), D(32, 'Ana leyó un libro de poemas.')] },
};
// (in the game: the facts, the day, the season, the letters, the diary, the conversations had; then the milestones)
const PREPARAR = `(E => {
  const H = dlgHechos(); if (E.hechos) { for (const k of Object.keys(H)) delete H[k]; Object.assign(H, E.hechos); }
  const P = game.wm.perm ||= {}; for (const [m, d] of Object.entries(E.metas || {})) P['cuaderno:' + m] = d;
  if (E.dia) { dayT = E.dia - 1 + 21 / 24; game.seasonShift = ((E.estacion - Math.floor(dayT / DIAS_ESTACION)) % 4 + 4) % 4; S = E.estacion; }
  if (E.cartas) game.cartas = E.cartas; if (E.diario) game.journal = E.diario;
  for (const c of game.cartas || []) if (c.escena && !(c.texto || []).length) { const d = DIALOGOS.find(x => x.id === c.escena); if (d) c.texto = d.lineas().filter(l => l[0] === 'carta').map(l => l[1]); }   // (what she wrote: the letter scene's lines)
  for (const id of E.conversaciones || []) dlgDichas()[id] = true;
  if (E.visitas) noche().visitas = E.visitas;
  historiaT = 0; historiaTick(1); nocheV = null;
  return historiaTexto(); })`;

const md = s => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
const corto = (s, n = 140) => { s = String(s); return s.length > n ? s.slice(0, n - 1) + '…' : s; };
function nodeModules(){   // where z3-solver is (this checkout, or a parent's node_modules)
  try { return path.dirname(path.dirname(require.resolve('z3-solver/package.json'))); } catch (e) { return null; }
}
function chromiumRuta(){ return fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined; }   // (here, the container's; on Actions, Playwright's own)

// ---------------------------------------------------------------- the full checks: a copy of the data, with the blocks
const COPIAR = ['src/datos', 'src/js', 'tools/grafo.js', 'tools/misiones.js', 'tools/modelo.js', 'tools/modelo-nucleo.js', 'trazas/planilla.json'];
function copia(nm){
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'noche-'));
  for (const r of COPIAR) fs.cpSync(path.join(RAIZ, r), path.join(dir, r), { recursive: true });
  if (nm) fs.symlinkSync(nm, path.join(dir, 'node_modules'), 'dir');
  return dir;
}
// a block, into the data files of the copy: scenes and answers to the script, conversations to theirs, sayings into their moment
function agregar(dir, b){
  if (b.tipo === 'escena' || b.tipo === 'respuesta') return fs.appendFileSync(path.join(dir, 'src/datos/guion.txt'), '\n' + b.texto.trim() + '\n');
  if (b.tipo === 'conversacion') return fs.appendFileSync(path.join(dir, 'src/datos/conversaciones.txt'), '\n' + b.texto.trim() + '\n');
  const m = b.texto.match(/^\s*===\s*(.+?)\s*===/m)[1], si = (b.texto.match(/^si:\s*(.*)$/m)?.[1] || '').split(',').map(x => x.trim()).filter(Boolean);
  const lineas = [...b.texto.matchAll(/^-\s*(?:\[([^\]]*)\]\s*)?(.+)$/gm)].map(x => { const c = [...si, ...(x[1] ? x[1].split(',').map(y => y.trim()).filter(Boolean) : [])]; return '- ' + (c.length ? '[' + c.join(', ') + '] ' : '') + x[2].trim(); });
  const carpeta = path.join(dir, 'src/datos/dichos');
  for (const f of fs.readdirSync(carpeta)) {
    const p = path.join(carpeta, f), L = fs.readFileSync(p, 'utf8').split('\n'), i = L.findIndex(l => l.trim() === `=== ${m} ===`); if (i < 0) continue;
    let j = i + 1; while (j < L.length && !/^===/.test(L[j].trim())) j++;
    while (j > i + 1 && (!L[j - 1].trim() || L[j - 1].trim()[0] === '#')) j--;   // (after its last line, before the comments of the next)
    L.splice(j, 0, ...lineas); fs.writeFileSync(p, L.join('\n')); return;
  }
}
const correr = (argv, cwd) => new Promise(res => { const p = spawn(process.execPath, argv, { cwd }); let out = '', err = ''; p.stdout.on('data', d => out += d); p.stderr.on('data', d => err += d); p.on('close', code => res({ code, out: out.trim(), err: err.trim() })); });
function grafo(dir){
  const r = spawnSync(process.execPath, ['tools/grafo.js'], { cwd: dir, encoding: 'utf8' });
  const j = JSON.parse(fs.readFileSync(path.join(dir, 'trazas/grafo.json'), 'utf8')); return { resumen: (r.stdout || '').trim(), j };
}
async function modelo(dir, filas, grafoJ){
  const P = JSON.parse(fs.readFileSync(path.join(dir, 'trazas/planilla.json'), 'utf8'));
  P.escenas = [...P.escenas.filter(e => !filas.some(f => f.id === e.id)), ...filas]; P.grafo = grafoJ;
  fs.writeFileSync(path.join(dir, 'trazas/planilla.json'), JSON.stringify(P));
  const r = await correr(['tools/modelo.js'], dir);
  if (r.code) return { error: (r.err || r.out).split('\n').pop() };
  return { resumen: r.out.split('\n').pop(), j: JSON.parse(fs.readFileSync(path.join(dir, 'trazas/modelo.json'), 'utf8')) };
}
const clave = (tipo, h) => tipo + ' ' + JSON.stringify({ ...h, ['situación']: undefined, casos: h.casos ? h.casos.length : undefined });
const hallazgos = j => [...j.huecos.map(h => ['hueco', h]), ...j.incoherencias.map(h => ['incoherencia', h]), ...j.imposibles.map(h => ['nunca puede darse', h])];
// what is new with the blocks, and whose it is: the scene's id, or (a saying) the start of its text
function deQuien(texto, aceptados){
  return aceptados.find(b => texto.includes(b.id) || (b.tipo === 'dicho' && [...b.texto.matchAll(/^-\s*(?:\[[^\]]*\]\s*)?(.+)$/gm)].some(m => texto.includes(m[1].trim().slice(0, 30)) || texto.includes(b.texto.match(/===\s*(.+?)\s*===/)[1]))));
}
async function completo(aceptados, ev, partidaZ){
  const nm = nodeModules(); if (!nm) return { error: 'falta z3-solver (npm install): no se corre el modelo' };
  const base = copia(nm), con = copia(nm), out = { porBloque: {}, otros: [] };
  try {
    for (const b of aceptados) agregar(con, b);
    const gb = grafo(base), gc = grafo(con);
    const malasB = new Set([...gb.j.malas, ...gb.j.nunca.map(h => 'nunca: ' + h)]);
    for (const m of [...gc.j.malas, ...gc.j.nunca.map(h => 'nunca pasaría: ' + h + ' (lo piden ' + (gc.j.piden[h] || []).join(', ') + ')')]) if (!malasB.has(m)) { const b = deQuien(m, aceptados); if (b) (out.porBloque[b.id] ||= []).push('grafo: ' + m); else out.otros.push('grafo: ' + m); }
    // the rows of the model for the new scenes, as the game sees them (registered in the page, as the night does)
    const filas = await ev(`(ids => { for (const b of ${JSON.stringify(aceptados)}) nocheRegistrar(b); return DIALOGOS.filter(d => ids.includes(d.id)).map(${FILA_ESCENA}); })`, aceptados.map(b => b.id));
    const [mb, mc] = await Promise.all([modelo(base, [], gb.j), modelo(con, filas, gc.j)]);
    out.grafo = { base: gb.resumen, con: gc.resumen }; out.modelo = { base: mb.resumen || mb.error, con: mc.resumen || mc.error };
    if (mb.error || mc.error) { out.error = 'el modelo no corrió: ' + (mc.error || mb.error); return out; }
    const antes = new Set(hallazgos(mb.j).map(([t, h]) => clave(t, h)));
    for (const [t, h] of hallazgos(mc.j)) if (!antes.has(clave(t, h))) {
      const txt = `modelo: ${t} (${h.regla || ''}) ${h.nombre || h.quien || ''}: ${h.id || ''} ${h.texto || ''}${h.exige ? ' — exige ' + h.exige : ''}`.replace(/\s+/g, ' ');
      const b = deQuien(`${h.id || ''} ${h.texto || ''}`, aceptados); if (b) (out.porBloque[b.id] ||= []).push(txt); else out.otros.push(txt);
    }
    out.modeloCon = mc.j;
    try { out.lagunasCon = await require('./modelo.js').lagunas(partidaZ, con); } catch (e) { out.lagunasCon = { error: String(e.message || e) }; }   // (what the blocks filled)
    return out;
  } finally { for (const d of [base, con]) fs.rmSync(d, { recursive: true, force: true }); }
}

// ---------------------------------------------------------------- OpenAI (from Node: the same bodies as the game)
async function openai(cuerpos){
  const key = process.env.OPENAI_API_KEY; if (!key) throw new Error('no hay OPENAI_API_KEY (o usa --respuesta archivo.json)');
  let ultimo = null;
  for (const body of cuerpos) {
    let res; try { res = await fetch('https://api.openai.com/v1/chat/completions', { method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + key }, body: JSON.stringify(body), signal: AbortSignal.timeout(240000) }); }
    catch (e) { throw new Error('no se pudo llegar a api.openai.com (' + (e.cause?.code || e.cause?.message || e.message) + '): ¿la red lo bloquea?'); }
    const data = await res.json().catch(() => ({}));
    if (res.ok) return data;
    ultimo = new Error(`OpenAI ${res.status}: ${data.error?.message || res.statusText}`); if (res.status !== 400 && res.status !== 404) throw ultimo;
  }
  throw ultimo;
}

(async () => {
  let chromium; try { ({ chromium } = require('playwright')); } catch (e) { console.error('Falta Playwright (npm i playwright; npx playwright install chromium).'); process.exit(2); }
  fs.mkdirSync(SALIDA, { recursive: true });
  const E = ESCENARIOS[ESCENARIO] || null;
  if (!E && !fs.existsSync(path.resolve(ESCENARIO))) { console.error(`No hay un escenario «${ESCENARIO}» (hay: ${Object.keys(ESCENARIOS).join(', ')}), ni una partida guardada con ese nombre.`); process.exit(2); }
  const partida = E ? null : JSON.parse(fs.readFileSync(path.resolve(ESCENARIO), 'utf8'));   // (what the game keeps in localStorage «avonlea»)
  const b = await chromium.launch({ executablePath: chromiumRuta(), args: ['--no-sandbox'] }); const pg = await b.newPage(); const errs = [];
  pg.on('pageerror', e => errs.push(e.message));
  await pg.addInitScript(([s]) => { Object.defineProperty(navigator, 'webdriver', { get: () => false }); if (s) localStorage.setItem('avonlea', s); }, [partida ? JSON.stringify(partida) : null]);
  await pg.goto('file://' + path.join(RAIZ, 'index.html') + '?dev'); await pg.waitForFunction(() => window.__avonlea?.ev && window.__avonlea.ev('DIALOGOS.length') > 0, null, { timeout: 30000 });
  const ev = (s, a) => pg.evaluate(([s, a]) => { const v = window.__avonlea.ev(s); return typeof v === 'function' ? v(a) : v; }, [s, a]);
  const hitos = await ev(PREPARAR, E || {});
  // the gaps of this game, with Z3 (tools/modelo.js): into the page, for the request (as nocheModelo will, in the game)
  const partidaZ = await ev('nochePartida()'); let lag = null;
  if (nodeModules() && !SIN_MODELO) { try { lag = await require('./modelo.js').lagunas(partidaZ); await ev('(L => nocheLagunasPoner(L))', lag.lagunas); } catch (e) { lag = { error: String(e.message || e) }; } }
  if (VARIANTE) await ev(`(v => { NOCHE_VARIANTE = v; })`, VARIANTE);
  if (CANDIDATOS != null) await ev(`(n => { NOCHE_CANDIDATOS.n = n; })`, +CANDIDATOS);
  // the two rounds («tandas»): first the topics (and the game picks the most different), then the request with them
  let ideas = null;
  if (!RESP && await ev(`nocheVar('tandas')`)) {
    try { const P = await ev(`(([n, m]) => nocheIdeasPedido(n, m || undefined))`, [NIVEL, MODELO]), data = await openai(await ev(`(p => nocheIdeasCuerpos(p))`, P));
      fs.writeFileSync(path.join(SALIDA, 'ideas.json'), JSON.stringify(data, null, 1));
      const T = await ev(`(d => nocheIdeasLeer(d))`, data), Eg = await ev(`(T => { const E = nocheIdeasElegir(T); NOCHE_TANDA = E.elegidos; return E; })`, T);
      ideas = { modelo: data.model, tokens: data.usage?.prompt_tokens || 0, semillas: P.semillas, propuestos: T.length, elegidos: Eg.elegidos, fuera: Eg.fuera }; }
    catch (e) { ideas = { error: String(e.message || e) }; }
  }
  const pedido = await ev(`(([n, m]) => nochePedido(n, m || undefined))`, [NIVEL, MODELO]);
  const cuerpos = await ev(`(p => nocheCuerpos(p))`, pedido);
  fs.writeFileSync(path.join(SALIDA, 'pedido.json'), JSON.stringify({ escenario: ESCENARIO, nivel: NIVEL, modelo: pedido.modelo, cuerpo: cuerpos[0] }, null, 1));
  fs.writeFileSync(path.join(SALIDA, 'pedido.md'), `# El pedido de la noche (${ESCENARIO}, ${NIVEL}, ${pedido.modelo})\n\n## Sistema\n\n\`\`\`\n${pedido.mensajes[0].content}\n\`\`\`\n\n## La partida\n\n\`\`\`\n${pedido.mensajes[1].content}\n\`\`\`\n`);
  // the answer: from a file, or from OpenAI (the raw answers are kept: respuesta.json, respuesta2.json)
  const leer = async j => j.choices ? (await ev(`(d => nocheLeerRespuesta(d))`, j)).bloques : (j.bloques || []);
  const pedirIA = async (p, n) => { const data = await openai(await ev(`(p => nocheCuerpos(p))`, p)); fs.writeFileSync(path.join(SALIDA, `respuesta${n > 1 ? n : ''}.json`), JSON.stringify(data, null, 1)); return { bloques: await leer(data), modelo: data.model }; };
  let bloques, fuente;
  try {
    if (RESP) { bloques = await leer(RESP); fuente = 'archivo ' + path.relative(RAIZ, path.resolve(RESPUESTA)); }
    else { const r = await pedirIA(pedido, 1); bloques = r.bloques; fuente = 'OpenAI (' + (r.modelo || pedido.modelo) + ')'; }
  } catch (e) {
    const msg = 'No hay respuesta de la IA: ' + (e.message || e);
    console.error(msg); fs.writeFileSync(path.join(SALIDA, 'noche.md'), `# La IA de la noche\n\nEscenario: ${E?.titulo || ESCENARIO} · nivel ${NIVEL} · modelo ${pedido.modelo}\n\n**${msg}**\n\nEl pedido quedó en \`pedido.md\`.\n`);
    fs.writeFileSync(path.join(SALIDA, 'noche.json'), JSON.stringify({ escenario: ESCENARIO, nivel: NIVEL, modelo: pedido.modelo, error: msg }, null, 1));
    await b.close(); process.exit(2);
  }
  // 1. in the game: the same check as at night (with its repairs), and the second round for what was rejected
  const rondas = [{ bloques, v: await ev(`(([B, n]) => nocheValidar(B, n))`, [bloques, NIVEL]) }];
  const v1 = rondas[0].v; let nota2 = null;
  if (v1.rechazados.length) {
    const p2 = await ev(`(([p, B, R]) => nocheReparacionPedido(p, B, R))`, [pedido, bloques, v1.rechazados]);
    try {
      const b2 = RESP ? (RESP.reparacion ? await leer(RESP.reparacion) : null) : (await pedirIA(p2, 2)).bloques;
      if (!b2) nota2 = 'sin segunda ronda: la respuesta es de un archivo que no trae «reparacion»';
      else {
        rondas.push({ bloques: b2.slice(0, v1.rechazados.length), v: await ev(`(([B, n, A]) => nocheValidar(B, n, A))`, [b2.slice(0, v1.rechazados.length), NIVEL, v1.aceptados]) });
        const ids = await ev(`(B => B.map(nocheIdDe))`, b2), antes = await ev(`(B => B.map(nocheIdDe))`, v1.rechazados.map(x => x.bloque));   // (what round 2 left out: told)
        for (const [i, x] of v1.rechazados.entries()) if (!ids.includes(antes[i])) { rondas[1].bloques.push({ tipo: x.bloque.tipo, texto: x.bloque.texto, porque: x.bloque.porque, esperado: x.bloque.esperado2 }); rondas[1].v.veredictos.push({ aceptado: false, id: antes[i], motivos: ['la IA no la volvió a mandar'], reparado: [], texto: '' }); }
      }
    } catch (e) { nota2 = 'la segunda ronda no pudo: ' + (e.message || e); }
  }
  let aceptados = rondas.flatMap(r => r.v.aceptados);
  // 1b. more than fit: the judge scores them all (the rubric) and the best stay, different among them
  const NMAX = await ev('NOCHE_MAX'), juicios = {}; let juez = null;
  if (aceptados.length > NMAX && !RESP) {
    try { const P = await ev(`(([B, m]) => nocheJuezPedido(B, m || undefined))`, [aceptados, JUEZ]); const data = await openai(await ev(`(p => nocheJuezCuerpos(p))`, P));
      fs.writeFileSync(path.join(SALIDA, 'juez.json'), JSON.stringify(data, null, 1));
      const J = await ev(`(([d, n]) => nocheJuezLeer(d, n))`, [data, aceptados.length]), el = await ev(`(([B, J, m]) => nocheElegir(B, J, NOCHE_MAX, m))`, [aceptados, J, data.model || P.modelo]);
      aceptados.forEach((a, i) => { if (J[i]) juicios[a.id] = { ...J[i], elegido: el.includes(i) }; });
      juez = { modelo: data.model || P.modelo, tokens: data.usage?.prompt_tokens || 0, elegidos: el.map(i => aceptados[i].id) };
      aceptados = el.map(i => aceptados[i]); }
    catch (e) { juez = { error: String(e.message || e) }; aceptados = aceptados.slice(0, NMAX); }
  }
  // 1c. what stays, scored by the judge for comparing (the same for every version, so their averages can be compared)
  let compara = null;
  if (COMPARAR && aceptados.length && !RESP) {
    try { const P = await ev(`(([B, m]) => nocheJuezPedido(B, m))`, [aceptados, COMPARAR]), data = await openai((await ev(`(p => nocheJuezCuerpos(p))`, P)).filter(c => c.model === COMPARAR));
      const J = await ev(`(([d, n]) => nocheJuezLeer(d, n))`, [data, aceptados.length]), ok = J.filter(Boolean);
      compara = { modelo: data.model || COMPARAR, media: ok.reduce((a, j) => a + j.total, 0) / (ok.length || 1), notas: Object.fromEntries(aceptados.map((a, i) => [a.id, J[i] ? J[i].total : null])) }; }
    catch (e) { compara = { error: String(e.message || e) }; }
  }
  // 2. with the tools: the graph and the model, with the accepted blocks in the data
  const C = SIN_MODELO || !aceptados.length ? null : await completo(aceptados, ev, partidaZ);
  // (what the tools rejected goes out: the final summary is of what stays)
  if (C && !C.error && Object.keys(C.porBloque).length) { const quedan = aceptados.filter(a => !C.porBloque[a.id]), F = quedan.length ? await completo(quedan, ev, partidaZ) : null; C.final = F ? { grafo: F.grafo?.con, modelo: F.modelo?.con } : { grafo: C.grafo.base, modelo: C.modelo.base }; C.lagunasCon = F ? F.lagunasCon : null; }   // (what fills the gaps is what stays)
  await b.close();
  const filas = rondas.flatMap((r, k) => r.bloques.slice(0, 99).map((x, i) => {
    const w = r.v.veredictos[i] || { aceptado: false, motivos: ['no se revisó'], reparado: [] };
    const id = w.id || (String(x.texto).match(/===\s*(.+?)\s*===/) || [])[1] || '?', nodo = w.aceptado && C?.porBloque?.[w.id] || [];
    const noElegido = w.aceptado && juez && !juez.error && !juez.elegidos.includes(w.id), res = !w.aceptado || nodo.length ? 'rechazado' : noElegido ? 'no elegido' : 'aceptado';
    return { ronda: k + 1, n: i + 1, tipo: x.tipo, id, navegador: w.aceptado ? 'aceptado' : 'rechazado', node: !w.aceptado || noElegido ? '—' : C ? (C.error ? '¿?' : nodo.length ? 'rechazado' : 'aceptado') : 'sin correr', resultado: res, reparado: w.reparado || [], motivos: [...w.motivos, ...nodo], porque: x.porque || '', juicio: w.aceptado ? juicios[w.id] || null : null, esperado: x.esperado || null, texto: String(x.texto || ''), textoFinal: w.texto };
  }));
  const mal = filas.filter(f => f.esperado && f.esperado !== f.resultado);
  const temas = filas.filter(f => f.resultado === 'aceptado' && f.tipo === 'conversacion').length;   // (new topics, without waiting for them to run out: at least NOCHE_TEMAS a night)
  const L = [`# La IA de la noche: lo que propuso y lo que quedó`, '', `Escenario: **${E?.titulo || ESCENARIO}** · nivel **${NIVEL}** · modelo ${pedido.modelo} · respuesta: ${fuente}`, '',
    '| Ronda | # | Tipo | Bloque | Navegador | Juez (de 18) | Grafo y modelo (Node) | Queda | Reparado | Motivos | Esperado |', '|---|---|---|---|---|---|---|---|---|---|---|',
    ...filas.map(f => `| ${f.ronda} | ${f.n} | ${f.tipo} | \`${md(f.id)}\` | ${f.navegador} | ${f.juicio ? f.juicio.total + ' (' + f.juicio.notas.join(' ') + ')' : '—'} | ${f.node} | **${f.resultado}** | ${md(f.reparado.join(' · ') || '—')} | ${md(f.motivos.map(m => corto(m, 220)).join(' · ') || '—')} | ${f.esperado ? (f.esperado === f.resultado ? '✔ ' : '✘ ') + f.esperado : ''} |`), '',
    ...(ideas ? (ideas.error ? [`_(la primera tanda, los temas, no pudo: ${ideas.error})_`, ''] : ['## Primera tanda: los temas', '', `${ideas.modelo} · ${ideas.tokens} tokens del pedido · ${ideas.propuestos} propuestos · semillas de libros: ${ideas.semillas.join(', ')}`, '',
      '| | Con | Ámbito | Forma | Tema | Qué se revela | Libro |', '|---|---|---|---|---|---|---|', ...ideas.elegidos.map(t => `| ✓ | ${t.con} | ${t.ambito} | ${t.forma} | ${md(t.tema)} | ${md(t.revela)} | ${t.semilla} |`),
      ...ideas.fuera.map(t => `| ✗ ${t.por} | ${t.con} | ${t.ambito} | ${t.forma} | ${md(t.tema)} | ${md(corto(t.revela, 80))} | ${t.semilla} |`), '']) : []),
    ...(nota2 ? [`_(${nota2})_`, ''] : []), ...(juez ? [juez.error ? `_(el juez no pudo: ${juez.error}; quedan los primeros ${NMAX})_` : `Juez: ${juez.modelo} (${juez.tokens} tokens del pedido) · eligió ${juez.elegidos.length} de ${Object.keys(juicios).length} · nota media de los elegidos: **${(juez.elegidos.reduce((a, id) => a + juicios[id].total, 0) / (juez.elegidos.length || 1)).toFixed(1)}**, de todos: ${(Object.values(juicios).reduce((a, j) => a + j.total, 0) / (Object.keys(juicios).length || 1)).toFixed(1)}`, ''] : []), `Temas nuevos (conversaciones aceptadas): **${temas}** (se piden al menos 2 cada noche)`, ''];
  { const k = l => l.de + ':' + (l.hecho || l.quien) + ':' + (l.hay || ''), txt = l => l.de === 'decisiones' ? `Ana eligió «${l.opcion}» (\`${l.hecho}\`, en \`${l.escena}\`): nada de lo que todavía puede pasar lo toma en cuenta` : l.de === 'pocas' ? `${l.nombre}: ${l.quedan} ${l.hay}(es) estos días (menos de ${l.minimo})` : `${l.nombre}: no queda ninguna escena ni conversación`;
    const despues = C?.lagunasCon?.lagunas ? new Set(C.lagunasCon.lagunas.map(k)) : null, ahora = new Map((C?.lagunasCon?.lagunas || []).map(l => [k(l), l]));
    L.push('## Lo que le faltaba a la partida (Z3)', '', !lag ? '_(sin el modelo: no se buscaron)_' : lag.error ? `_(no se pudo: ${lag.error})_` : `${lag.resumen}${despues ? ` · con los aceptados: ${C.lagunasCon.resumen}` : ''}`, '',
      ...(lag?.lagunas || []).map(l => `- ${despues ? (despues.has(k(l)) ? '· ' : '✓ ') : ''}${txt(l)}${l.de === 'pocas' && ahora.get(k(l)) && ahora.get(k(l)).quedan !== l.quedan ? ` → con los aceptados: ${ahora.get(k(l)).quedan}` : ''}`), ...(despues ? ['', '(✓ lo llenó un bloque aceptado · · sigue faltando)'] : []), ''); }
  if (C) L.push('## Con todas las revisiones', '', `- El grafo, sin los bloques: ${C.grafo?.base || '—'}`, `- El grafo, con los aceptados: ${C.grafo?.con || '—'}`, `- El modelo (Z3), sin los bloques: ${C.modelo?.base || '—'}`, `- El modelo (Z3), con los aceptados: ${C.modelo?.con || '—'}`, ...(C.final ? [`- Con lo que queda (sin lo que descartaron el grafo o el modelo): ${C.final.grafo || '—'} · ${C.final.modelo || '—'}`] : []), ...(C.error ? [`- ⚠ ${C.error}`] : []), ...(C.otros?.length ? ['', 'Hallazgos nuevos que no son de un bloque en particular:', ...C.otros.map(o => '- ' + o)] : []), '');
  else L.push(SIN_MODELO ? '_(--sin-modelo: no se corrieron el grafo ni el modelo)_' : '_(ningún bloque pasó la revisión del juego: no hay nada que agregar al modelo)_', '');
  L.push('## Lo que escribió la IA', '', ...filas.flatMap(f => [`### Ronda ${f.ronda} · ${f.n}. ${f.tipo} \`${md(f.id)}\` → ${f.resultado}`, '', `Por qué: ${f.porque || '—'}`, '', ...(f.juicio ? [`Juez: ${f.juicio.total}/18 (${f.juicio.notas.join(' ')}) — ${f.juicio.razones}`, ''] : []), '```', f.texto.trim(), '```', ...(f.reparado.length ? ['', 'Reparado: ' + f.reparado.join(' · '), '', '```', String(f.textoFinal || '').trim(), '```'] : []), '']));
  L.push('## Los hitos de la partida', '', '```', hitos, '```', '');
  if (errs.length) L.push('## Errores del juego', '', ...errs.map(e => '- ' + e), '');
  if (mal.length) L.push(`**✘ ${mal.length} bloque(s) no se juzgaron como se esperaba.**`, '');
  const informe = L.join('\n');
  fs.writeFileSync(path.join(SALIDA, 'noche.md'), informe);
  fs.writeFileSync(path.join(SALIDA, 'noche.json'), JSON.stringify({ escenario: ESCENARIO, titulo: E?.titulo, nivel: NIVEL, modelo: pedido.modelo, fuente, lagunas: lag, lagunasCon: C?.lagunasCon || null, segundaRonda: nota2 || (rondas[1] ? 'sí' : 'no hizo falta'), juez, compara, ideas, bloques: filas, aceptados: aceptados.filter(a => !C?.porBloque?.[a.id]), grafo: C?.grafo, modeloZ3: C?.modelo, final: C?.final, otros: C?.otros, errores: errs }, null, 1));
  console.log(informe);
  console.log(`→ ${path.relative(RAIZ, SALIDA)}/noche.md, noche.json, pedido.md`);
  process.exit(mal.length || errs.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
