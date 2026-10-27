#!/usr/bin/env node
// Probar una historia de punta a punta con el motor mínimo (tools/lenguaje/motor.js), sin el juego: en varios
// escenarios —Ana sola; Ana que se niega a subir; Ana que corre al mar; Marilla sin paciencia; Ana lejos a la hora de
// salir; la llegada con Matthew por la Avenida; Ana que pasea sola por la Avenida—, y revisa que cada uno termine como debe. Con --ver <escenario>, imprime lo que pasa, línea a línea.
// Uso: node tools/lenguaje/probar.js [--ver sola]
const path = require('path'), { datos } = require('./construir.js'), { Motor } = require('./motor.js');
const D = datos(path.resolve(__dirname, '..', '..', 'docs', 'lenguaje'));

// (la llegada: el primer día, en la estación de Bright River, con la calesa enganchada; a Matthew, Ana lo quiere desde
// el primer momento)
const LLEGADA = { dia: 1, hora: 17, lugares: { ana: 'estacion_bright_river', matthew: 'estacion_bright_river', calesa: 'estacion_bright_river' },
  estado: { 'estado.ana_en_tv': 'llegando', 'comun.hechos.primera_noche': null, 'mundo.calesa.listo': 'si', 'cualidad.ana.afecto.matthew': 3 } };
const ESCENARIOS = {
  // Ana sola: a Marilla todavía no la quiere (afecto 0), así que a un pedido dice que no, y a una orden, que sí
  sola: { auto: true, espera: { fin: 'terminada', dichas: ['viaje_spencer', 'ws_t1', 'ws_t2', 'ws_t3', 'ws_mar', 'ws_pye', 'ws_orilla', 'ws_spencer', 'ws_vuelta', 'ws_noche', 'ws_no_sube'] } },
  // la jugadora dice que sí a todo, y en la Sra. Pye se queda quieta
  obediente: { respuestas: Array(20).fill(true), opciones: { 'white_sands.ws_pye': 1 }, espera: { fin: 'terminada', noDichas: ['ws_no_sube', 'ws_orilla'] } },
  // la jugadora se niega dos veces a subir: Marilla se lo ordena, y después baja a buscarla
  se_niega: { respuestas: [true, false, false, ...Array(20).fill(true)], opciones: { 'white_sands.ws_pye': 1 }, espera: { fin: 'terminada', dichas: ['ws_no_sube', 'ws_no_sube_orden'] } },
  // corre al mar en la Sra. Pye: se baja de la calesa; Marilla la va a buscar a la orilla, y el viaje sigue
  corre: { respuestas: Array(20).fill(true), opciones: { 'white_sands.ws_pye': 0, 'white_sands.ws_orilla': 0 }, espera: { fin: 'terminada', dichas: ['ws_orilla'] } },
  // Marilla sin paciencia: el viaje en silencio, y la duda donde la Sra. Spencer
  sin_paciencia: { auto: true, estado: { 'cualidad.marilla.paciencia.ana': 0 }, espera: { fin: 'terminada', dichas: ['viaje_spencer_duda', 'ws_spencer_duda'], noDichas: ['ws_t1', 'ws_spencer'] } },
  // a la hora de salir, Ana está lejos (en la escuela): Marilla tiene que ir a buscarla
  lejos: { auto: true, lugares: { ana: 'escuela' }, espera: { fin: 'terminada', dichas: ['falta_viaje', 'viaje_spencer'] } },
  // la llegada (cap. 2): Ana habla todo el camino desde Bright River; al entrar a la Avenida corta la charla, calla, y
  // después le pone nombre (la escena del libro, con Matthew)
  llegada: { ...LLEGADA, auto: true, espera: { fin: 'terminada', dichas: ['ll_pelo', 'll_angelical', 'cb_libro', 'll_llegan'], cortadas: ['ll_angelical'], interrumpio: ['cb_libro'] } },
  // la llegada, si Ana ya hubiera pasado antes por la Avenida: la otra variante, que también corta la charla
  llegada_otra: { ...LLEGADA, auto: true, estado: { ...LLEGADA.estado, 'camino_blanco.dichas.cb_libro': 1 }, espera: { fin: 'terminada', dichas: ['cb_otra_vez'], interrumpio: ['cb_otra_vez'] } },
  // de noche, sin viaje: Ana va sola a la Avenida (en silencio: nada que cortar), vuelve, y va otra vez
  paseo: { auto: true, hora: 20, acciones: [['irA', 'camino_blanco'], ['irA', 'tejas_verdes'], ['irA', 'camino_blanco']], espera: { dichas: ['cb_sola', 'cb_siempre'], noDichas: ['cb_libro', 'cb_otra_vez'] } },
};

function correr(nombre, esc){
  const M = Motor(D, esc);
  let u = M.avanzar();
  for (let i = 0; i < 200 && !u.fin; i++) {
    if (u.pregunta) u = M.responder(true);       // (si el guion de respuestas se acabó: sí)
    else if (u.escena && u.escena.ops) u = M.elegir(0);
    else if (esc.acciones && esc.acciones.length) { const [f, ...a] = esc.acciones.shift(); u = M[f](...a); }   // (lo que la jugadora hace por su cuenta)
    else break;
  }
  const dichas = M.resumen().hechos.filter(h => h.includes('.dichas.')).map(h => h.split('.').pop());
  const fallas = [], notas = M.registro.map(r => r.t);
  for (const d of esc.espera.cortadas || []) if (!notas.includes('✂ se corta ' + d)) fallas.push(`no se cortó ${d}`);
  // (que la escena empezara cortando otra: la exclamación de <<if interrumpio>> está en el registro, justo después del corte)
  for (const d of esc.espera.interrumpio || []) { const i = notas.findIndex(x => x && x.startsWith('🎬 ' + d + ':')); if (i < 1 || !String(notas[i - 1]).startsWith('✂')) fallas.push(`${d} no interrumpió nada`); }
  if (esc.espera.fin && u.fin !== esc.espera.fin) fallas.push(`termina «${u.fin}», no «${esc.espera.fin}»`);
  for (const d of esc.espera.dichas || []) if (!dichas.includes(d)) fallas.push(`no pasó ${d}`);
  for (const d of esc.espera.noDichas || []) if (dichas.includes(d)) fallas.push(`pasó ${d}`);
  if (M.get(['historia', 'white_sands']) === 'terminada' && M.get(['estado', 'ana_en_tv']) !== 'decidida') fallas.push('ana_en_tv no quedó en «decidida»');
  return { M, u, dichas, fallas };
}
function ver(M){
  for (const r of M.registro) {
    if (r.tipo === 'linea') console.log(`  ${r.hora}  ${M.nombre(r.q) === 'narra' ? '' : M.nombre(r.q) + (r.piensa ? ' (piensa)' : '') + ': '}${r.t.length > 150 ? r.t.slice(0, 150) + '…' : r.t}`);
    else if (r.tipo === 'eleccion') console.log(`  ${r.hora}  → ${r.t}`);
    else console.log(`  ${r.hora}  ${r.tipo === 'titulo' || r.tipo === 'escena' ? '' : '   '}${r.t}`);
  }
}
const i = process.argv.indexOf('--ver');
if (i > 0) { const n = process.argv[i + 1] || 'sola'; const { M, fallas } = correr(n, ESCENARIOS[n]); ver(M); console.log(fallas.length ? '\n✘ ' + fallas.join('; ') : '\n✔ ' + n); process.exit(fallas.length ? 1 : 0); }
let malas = 0;
for (const [n, e] of Object.entries(ESCENARIOS)) {
  const { u, dichas, fallas } = correr(n, e);
  console.log(`${fallas.length ? '✘' : '✔'} ${n}: ${u.reloj} · ${dichas.length} escenas${fallas.length ? ' · ' + fallas.join('; ') : ''}`);
  if (fallas.length) malas++;
}
process.exit(malas ? 1 : 0);
