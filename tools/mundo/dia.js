#!/usr/bin/env node
// Un día en un minuto: Tejas Verdes (docs/lenguaje/vidas/tejas_verdes.ts) vivido en el mundo (tools/mundo/), sin
// historias, unos días seguidos. Sale el diario de cada uno —lo que hizo, dónde, cuánto— y se revisan las reglas de
// lo natural; si una no se cumple, la prueba falla.
// Las reglas (lo que se ve raro si no se cumple):
//   duerme       de noche duerme (a las 3:00), y de día no (a las 10:00)
//   come         desayuna y cena todos los días
//   escuela      los días de clases, Ana y Diana van, y están en la escuela a mediodía
//   sin_aburrir  nadie pasa más de una hora seguida «descansando» (es lo que hace cuando no tiene nada)
//   variado      dos días seguidos de Ana no son iguales
//   la_casa      la casa no se descuida: nunca más de 6 platos sucios, y nunca falta leña para cocinar
//   sin_trabas   nadie se queda trabado: algo que no se puede hacer («✘» del motor) pasa a veces —Diana llega y Ana ya
//                se fue—, pero más de 6 veces en un día es que algo no tiene salida
// Uso: node tools/mundo/dia.js [--dias 3] [--desde 5] [--semilla 1] [--ver ana] [--diario archivo.txt] [--diarios carpeta]
//   --ver ana        el diario de Ana, en la pantalla
//   --diario f.txt   los diarios de todos, en un archivo
//   --diarios dir    el de cada uno en su archivo: dir/ana.txt, dir/marilla.txt…
const path = require('path'), fs = require('fs');
const { datos } = require('../lenguaje/construir.js'), { Motor } = require('../lenguaje/motor.js'), { MundoMinimo } = require('./mundo_minimo.js'), { Mundo } = require('./mundo.js');
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const DIAS = +arg('dias', 3), DESDE = +arg('desde', 5), SEMILLA = +arg('semilla', 1), VER = arg('ver', null), DIARIO = arg('diario', null), DIARIOS = arg('diarios', null);
const D = datos(path.resolve(__dirname, '..', '..', 'docs', 'lenguaje')), G = Mundo.geografia();
const QUIENES = Object.keys(D.vidas.tejas_verdes);
const CAMAS = { ana: 'pieza', marilla: 'pieza_marilla', matthew: 'pieza_matthew', diana: 'cuesta_del_huerto' };
const hhmm = m => `${String(Math.floor((m % 1440) / 60)).padStart(2, '0')}:${String(Math.round(m % 60)).padStart(2, '0')}`;
const SEMANA = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

const t0 = Date.now();
const W = Mundo(G); MundoMinimo.mundo = W; MundoMinimo.viajes = {};
W.E.t = (DESDE - 1) * 1440;
const M = Motor(D, { dia: DESDE, hora: 0, vidas: 'tejas_verdes', historias: [], semilla: SEMILLA, lugares: { ...CAMAS, calesa: 'corral' } }, MundoMinimo);
// (cada 5 minutos: qué está haciendo cada uno —su acción, o su viaje— y dónde, para el diario y las reglas)
const PASO = 5, foto = {}, casa = []; for (const q of QUIENES) foto[q] = [];
const fin = (DESDE - 1 + DIAS) * 1440;
for (let m = (DESDE - 1) * 1440; m <= fin; m += PASO) {
  M.alTiempo(m); W.avanzarHasta(m);
  casa.push({ m, ...Object.fromEntries(Object.keys(D.cosas.cocina).map(x => [x, M.get(['cosas', 'cocina', x])])) });
  for (const q of QUIENES) { const p = W.E.personas[q] || {}, h = M.haciendo(q), quieta = h.length > 1 && /^(quedarse|esperar)$/.test(h[h.length - 1]) ? h[h.length - 2] : '·';   // (quedarse en clase: «ir a clases»)
    foto[q].push({ m, lugar: p.lugar, que: p.viaje ? `→ ${p.viaje.a}` : p.ocupado?.que || quieta, hace: h }); }
}
const ms = Date.now() - t0;

// el diario: cada cambio de lo que hace (o de adónde va), con su hora, lo que duró y dónde
function diario(q){
  const F = foto[q], L = [];
  for (let i = 0; i < F.length; i++) {
    const f = F[i]; if (i && F[i - 1].que === f.que && F[i - 1].lugar === f.lugar) continue;
    let j = i; while (j + 1 < F.length && F[j + 1].que === f.que && F[j + 1].lugar === f.lugar) j++;
    L.push({ desde: f.m, hasta: F[j].m + PASO, que: f.que, lugar: f.lugar, cadena: f.hace });
  }
  return L;
}
const fallas = [], dia = m => Math.floor(m / 1440) + 1;
const regla = (id, ok, txt) => { if (!ok) fallas.push(`${id}: ${txt}`); };
{ const p = casa.find(c => c.platos_sucios > 6); if (p) regla('la_casa', false, `${p.platos_sucios} platos sucios a las ${hhmm(p.m)} del día ${dia(p.m)}`); }
for (const r of M.registro) if (/^✘ cocinar: no se puede/.test(r.t)) { regla('la_casa', false, `${r.hora}: no hay leña para cocinar`); break; }
for (const q of QUIENES) {
  const F = foto[q], en = (d, h) => F.find(f => f.m === (d - 1) * 1440 + h * 60);
  for (let d = DESDE; d < DESDE + DIAS; d++) {
    const n3 = en(d, 3), n10 = en(d, 10), n12 = en(d, 12);
    regla('duerme', n3?.que === 'dormir', `${q}, día ${d} a las 3:00: ${n3?.que}`);
    regla('duerme', n10 && n10.que !== 'dormir', `${q}, día ${d} a las 10:00 todavía duerme`);
    const delDia = F.filter(f => dia(f.m) === d), hizo = v => delDia.some(f => f.que === v);
    regla('come', hizo('desayunar'), `${q} no desayunó el día ${d}`);
    regla('come', hizo('cenar'), `${q} no cenó el día ${d}`);
    if ((q === 'ana' || q === 'diana') && d % 7 !== 0) regla('escuela', n12?.lugar === 'escuela', `${q}, día ${d} (${SEMANA[d % 7]}) a mediodía: en ${n12?.lugar}, no en la escuela`);
  }
  let seguido = 0; for (const f of F) { seguido = f.que === 'descansar' ? seguido + PASO : 0; if (seguido > 60) { regla('sin_aburrir', false, `${q} lleva más de una hora descansando, a las ${hhmm(f.m)} del día ${dia(f.m)}`); break; } }
}
{ const A = d => diario('ana').filter(x => dia(x.desde) === d && x.que !== '·').map(x => x.que).join(','); for (let d = DESDE; d + 1 < DESDE + DIAS; d++) if (d % 7 !== 0 && (d + 1) % 7 !== 0) regla('variado', A(d) !== A(d + 1), `los días ${d} y ${d + 1} de Ana son iguales`); }
{ const n = {}; for (const r of M.registro) if (/^✘/.test(r.t)) { const k = r.hora.split(',')[0] + ' ' + (r.t.match(/\(([^)]+)\)$/)?.[1] || ''); n[k] = (n[k] || 0) + 1; }
  for (const [k, c] of Object.entries(n)) regla('sin_trabas', c <= 6, `${k}: ${c} veces algo que no se podía`); }

// lo que sale: el diario de cada uno, por separado
// (un lugar, con su nombre: el de las historias si lo es —La Cuesta del Huerto, no «h:os»—, si no el del mundo)
const inv = Object.fromEntries(Object.entries(G.alias).map(([l, w]) => [w, l]));
const lugarNombre = l => (D.lugares[l] || D.lugares[inv[l]])?.nombre || W.nombre(l);
function diarioDe(q){
  const L = [`${M.nombre(q)} — diario (semilla ${SEMILLA})`];
  let d0 = null;
  for (const x of diario(q)) {
    if (dia(x.desde) !== d0) { d0 = dia(x.desde); L.push(`\n  día ${d0}, ${SEMANA[d0 % 7]}`); }
    const min = Math.round(x.hasta - x.desde);
    if (x.que === 'dormir' && min > 60) { L.push(`    ${hhmm(x.desde)}–${hhmm(x.hasta)}  duerme · ${lugarNombre(x.lugar)}`); continue; }
    if (x.que.startsWith('→ ')) { L.push(`    ${hhmm(x.desde)}  va ${('a ' + lugarNombre(x.que.slice(2))).replace(/^a el /, 'al ')} (${min} min)`); continue; }
    L.push(`    ${hhmm(x.desde)}  ${x.que.replace(/_/g, ' ').padEnd(22)} ${String(min).padStart(3)} min · ${lugarNombre(x.lugar)}`);
  }
  return L.join('\n') + '\n';
}
const interrupciones = M.registro.filter(r => /^⤳/.test(r.t)).length, retomas = M.registro.filter(r => /^↩/.test(r.t)).length;
if (DIARIO) fs.writeFileSync(DIARIO, QUIENES.map(diarioDe).join('\n'));
if (DIARIOS) { fs.mkdirSync(DIARIOS, { recursive: true }); for (const q of QUIENES) fs.writeFileSync(path.join(DIARIOS, q + '.txt'), diarioDe(q)); console.log(`→ ${QUIENES.map(q => path.join(DIARIOS, q + '.txt')).join(', ')}`); }
if (VER) console.log('\n' + diarioDe(VER));
console.log(`\n${DIAS} días de Tejas Verdes (desde el ${DESDE}, semilla ${SEMILLA}) en ${ms} ms · ${interrupciones} interrupciones, ${retomas} retomadas`);
{ const u = casa[casa.length - 1], max = x => Math.max(...casa.map(c => c[x])), min = x => Math.min(...casa.map(c => c[x])); console.log(`  la casa: pan ${min('pan')}–${max('pan')} · leña ${min('lena')}–${max('lena')} · leche hasta ${max('leche')} · mantequilla ${u.mantequilla} al final · platos sucios hasta ${max('platos_sucios')}`); }
for (const q of QUIENES) { const cuenta = {}; for (const x of diario(q)) if (!x.que.startsWith('→') && x.que !== '·') cuenta[x.que] = (cuenta[x.que] || 0) + 1; console.log(`  ${M.nombre(q).padEnd(8)} ${Object.entries(cuenta).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k.replace(/_/g, ' ')} ${n}`).join(' · ')}`); }
console.log(fallas.length ? `\n✘ ${fallas.length} reglas no se cumplen:\n  ` + fallas.slice(0, 30).join('\n  ') : '\n✔ todas las reglas de lo natural');
process.exit(fallas.length ? 1 : 0);
