#!/usr/bin/env node
// Probar una historia de punta a punta con el motor mínimo (tools/lenguaje/motor.js), sin el juego: en varios
// escenarios —Ana sola; Ana que se niega a subir; Ana que corre al mar; Marilla sin paciencia; Ana lejos a la hora de
// salir—, y revisa que cada uno termine como debe. Con --ver <escenario>, imprime lo que pasa, línea a línea.
// Uso: node tools/lenguaje/probar.js [--ver sola]
const path = require('path'), { datos } = require('./construir.js'), { Motor } = require('./motor.js');
const D = datos(path.resolve(__dirname, '..', '..', 'docs', 'lenguaje'));

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
};

function correr(nombre, esc){
  const M = Motor(D, esc);
  let u = M.avanzar();
  for (let i = 0; i < 200 && !u.fin; i++) {
    if (u.pregunta) u = M.responder(true);       // (si el guion de respuestas se acabó: sí)
    else if (u.escena && u.escena.ops) u = M.elegir(0);
    else break;
  }
  const dichas = M.resumen().hechos.filter(h => h.includes('.dichas.')).map(h => h.split('.').pop());
  const fallas = [];
  if (esc.espera.fin && u.fin !== esc.espera.fin) fallas.push(`termina «${u.fin}», no «${esc.espera.fin}»`);
  for (const d of esc.espera.dichas || []) if (!dichas.includes(d)) fallas.push(`no pasó ${d}`);
  for (const d of esc.espera.noDichas || []) if (dichas.includes(d)) fallas.push(`pasó ${d}`);
  if (u.fin === 'terminada' && M.get(['estado', 'ana_en_tv']) !== 'decidida') fallas.push('ana_en_tv no quedó en «decidida»');
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
