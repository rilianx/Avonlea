#!/usr/bin/env node
// El planificador del juego en el mundo mínimo: las metas de prueba del planificador (src/js/64-metas-de-prueba.js),
// sin dibujar ni caminar. Cada prueba prepara el juego como siempre (su «setup»), y de ahí se toma el estado lógico
// (wmNow: dónde está cada uno, qué tiene, cómo se quieren, qué sabe); el planificador busca el plan, y el plan se
// ejecuta en ese estado: cada acción hace su efecto y dura lo que dura, con el reloj. Se mira si llega a la meta, y a
// qué hora. El juego se carga sin navegador (tools/mundo/sin_navegador.js).
// Lo que no se prueba aquí: si en el mapa el plan se puede caminar (eso es del juego, y de trace_goal.js); y las pruebas
// que esperan una escena del guion o a Ana (dicen «solo en el juego»).
// Las pruebas no dicen qué esperan (algunas no llegan a propósito: Gilbert, que Ana no perdona; la tarta en invierno):
// lo que dio cada una queda en planes.esperado.json, y cada corrida avisa lo que cambió —si llega, cuántos pasos, a qué
// hora—. Si el cambio es el que se quería, se guarda de nuevo con --guardar.
// Uso: node tools/mundo/planes.js [--ver] [--guardar] [texto]   (texto: solo las pruebas que lo contienen; --ver: cada paso)
const fs = require('fs'), path = require('path'), { cargarJuego } = require('./sin_navegador.js');
const args = process.argv.slice(2), ver = args.includes('--ver'), guardar = args.includes('--guardar'), filtro = args.filter(a => !a.startsWith('--')).join(' ').toLowerCase();
const ESPERADO = path.join(__dirname, 'planes.esperado.json'), antes = fs.existsSync(ESPERADO) ? JSON.parse(fs.readFileSync(ESPERADO, 'utf8')) : {}, ahora = {};

const t0 = Date.now(), J = cargarJuego(), cargado = Date.now() - t0;
// (adentro del juego: preparar la prueba i, planificar y ejecutar el plan en el estado lógico)
J.ventana.__probarPlan = J.ev(`(i => {
  const T = WM_TESTS[i];
  if (T.goals || T.ask || T.hasta || T.cadena) return { i, texto: T.text, quien: T.who, solo: T.ask ? 'un pedido a Ana' : T.hasta ? 'espera una escena (' + T.hasta + ')' : T.cadena ? 'una cadena del libro, con sus escenas' : 'varias metas a la vez' };
  wmRunTest(i);   // (prepara la escena como siempre; los agentes que deja, no se mueven: aquí no avanza el juego)
  const meta = T.goal(), s0 = wmNow();
  for (const k of Object.keys(AGENTS)) { wmRelease(k); delete AGENTS[k]; }
  const P = wmPlan(T.who, meta, T.favors || [], s0);
  if (!P.plan) return { i, texto: T.text, quien: T.who, ok: false, por: 'no hay plan (' + P.n + ' estados)' };
  const s = clone(s0), pasos = [];
  for (const a of P.plan) { const h = s.t; a.eff(s); s.t += a.cost; pasos.push({ h: fmtHour(h / 60), d: Math.round(a.cost), que: stepText(a) }); }
  const llega = meta.test(s), aTiempo = !meta.deadline || s.t <= meta.deadline * 60 + 1;
  return { i, texto: T.text, quien: T.who, ok: P.ok && llega && aTiempo, por: !P.ok ? 'el plan no alcanza la meta' : !llega ? 'ejecutado, no llega' : !aTiempo ? 'llega tarde: ' + fmtHour(s.t / 60) : '', desde: fmtHour(s0.t / 60), hasta: fmtHour(s.t / 60), pasos, n: P.n };
})`);

let buenas = 0, parciales = 0, cambios = 0, solo = 0; const t1 = Date.now();
const N = J.ev('WM_TESTS.length');
for (let i = 0; i < N; i++) {
  if (filtro && !J.ev(`WM_TESTS[${i}].text`).toLowerCase().includes(filtro)) continue;
  let r; try { r = J.ventana.__probarPlan(i); } catch (e) { r = { i, texto: J.ev(`WM_TESTS[${i}].text`), ok: false, por: 'se cayó: ' + e.message }; }
  if (r.solo) { solo++; if (ver) console.log(`· ${r.texto} — solo en el juego: ${r.solo}`); continue; }
  r.ok ? buenas++ : parciales++;
  const res = ahora[r.texto] = r.ok ? `llega, ${r.pasos.length} pasos, ${r.desde}→${r.hasta}` : `no llega: ${r.por}`, era = antes[r.texto], cambio = !guardar && era !== undefined && era !== res;
  if (cambio) cambios++;
  console.log(`${cambio ? '✘' : r.ok ? '✔' : '◐'} ${r.texto}${r.pasos ? ` · ${r.desde}→${r.hasta}, ${r.pasos.length} pasos` : ''}${r.por ? ' · ' + r.por : ''}${cambio ? `   (antes: ${era})` : era === undefined && !guardar ? '   (nueva)' : ''}`);
  if (ver && r.pasos) for (const p of r.pasos) console.log(`     ${p.h}  ${p.que} (${p.d} min)`);
}
if (guardar) { fs.writeFileSync(ESPERADO, JSON.stringify({ ...antes, ...ahora }, null, 1) + '\n'); console.log('→ ' + path.relative(process.cwd(), ESPERADO)); }
console.log(`\n${buenas} llegan, ${parciales} no (◐)${solo ? `, ${solo} solo en el juego` : ''}${cambios ? ` · ✘ ${cambios} cambiaron` : ''} · el juego cargó en ${cargado} ms; las pruebas, ${Date.now() - t1} ms`);
process.exit(cambios ? 1 : 0);
