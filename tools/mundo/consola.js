#!/usr/bin/env node
// La consola del mundo mínimo: jugar las historias del lenguaje sin el juego, con las distancias reales del mapa
// (tools/mundo/mundo_minimo.js). Se mueve a la gente, se avanza el reloj, se contesta lo que le piden a Ana, y se mira
// dónde está cada uno. Lo mismo, escrito en un archivo, es una prueba: con «espera …», si no se cumple, falla.
// Uso: node tools/mundo/consola.js                      (a mano; «ayuda» dice los comandos)
//      node tools/mundo/consola.js prueba.txt …         (cada archivo, una prueba: sale con error si una falla)
//      node tools/mundo/consola.js -e "nueva; ir aldea; avanzar 1h; donde"
const path = require('path'), fs = require('fs'), readline = require('readline');
const { datos } = require('../lenguaje/construir.js'), { Motor } = require('../lenguaje/motor.js'), { MundoMinimo } = require('./mundo_minimo.js');
const D = datos(path.resolve(__dirname, '..', '..', 'docs', 'lenguaje'));

const AYUDA = `
  nueva [día] [hh:mm]          una partida nueva (por omisión, el día 2 a las 14:00: el día de White Sands)
  poner <quien> <lugar>        alguien está en un lugar (sin viajar: así empieza)
  vale <a.b.c> <valor>         un valor del estado (estado.ana_en_tv en_prueba, cualidad.marilla.paciencia.ana 0…)
  ir <lugar>                   Ana va a un lugar, por su cuenta
  bajarse                      Ana se baja de la calesa
  avanzar [30m | 2h | hh:mm]   el reloj: hasta que pase algo, o ese rato, o esa hora (se detiene si le piden algo a Ana)
  si | no                      contestar lo que le piden a Ana
  elegir <n>                   una opción de una escena (desde 1)
  sola                         Ana decide sola (lo que haría ella)
  donde                        dónde está cada uno, y quién va de camino
  minutos <lugar> <lugar>      cuánto hay entre dos lugares: a pie, Ana, en calesa
  lugares | quienes            los lugares y las personas del lenguaje
  registro [n]                 las últimas n líneas de lo que pasó
  espera <a.b.c>[=valor]       (en una prueba) que se cumpla, si no, falla: espera mundo.ana.lugar=hotel_white_sands
  espera dicha <escena>        que una escena se haya dicho
  espera hora <= hh:mm         que no sea más tarde que esa hora
  # …                          un comentario`;

let M = null, visto = 0, fallas = 0, silencio = false;
const out = s => { if (!silencio) console.log(s); };
const ahoraMin = () => (M.get(['tiempo', 'dia']) - 1) * 1440 + Math.round(M.get(['tiempo', 'hora']) * 60);
const hhmm = m => `${String(Math.floor((m % 1440) / 60)).padStart(2, '0')}:${String(Math.round(m % 60)).padStart(2, '0')}`;
const nombre = x => (x === 'narra' ? '' : M.nombre(x));
// (lo nuevo del registro, como lo imprime probar.js --ver; y lo que espera una respuesta)
function mostrar(u){
  for (; visto < M.registro.length; visto++) {
    const r = M.registro[visto], h = r.hora.split(', ')[1];
    if (r.tipo === 'linea') out(`  ${h}  ${nombre(r.q) ? nombre(r.q) + (r.piensa ? ' (piensa)' : '') + ': ' : ''}${r.t.length > 160 ? r.t.slice(0, 160) + '…' : r.t}`);
    else if (r.tipo === 'eleccion') out(`  ${h}  → ${r.t}`);
    else out(`  ${h}     ${r.t}`);
  }
  u = u || M.estado();
  if (u.pregunta) out(`  ❓ ${u.pregunta.de} le pide a Ana: «${u.pregunta.si}» (si) / «${u.pregunta.no}» (no)`);
  if (u.escena?.ops) out('  ❓ ¿Qué dice Ana? ' + u.escena.ops.map((o, i) => `${i + 1}. ${o}`).join(' · ') + '  (elegir n)');
  return u;
}
const esperando = u => !!(u.pregunta || u.escena?.ops);
// el reloj: el motor no se adelanta a la hora que se le da (como en el juego), así que se avanza hasta una hora; sin
// hora, de a un minuto hasta que pase algo (una línea nueva, una pregunta) o hasta un día
function avanzarHasta(fin, algo){
  let u = M.estado();
  for (let m = ahoraMin() + 1; ; m++) {
    const n = M.registro.length;
    u = M.alTiempo(algo ? m : Math.max(m, fin));
    if (esperando(u) || (algo && M.registro.length > n) || ahoraMin() >= fin) return u;
  }
}
const rato = (a, ahora) => { let x; if ((x = /^(\d+)m$/.exec(a))) return ahora + +x[1]; if ((x = /^(\d+(?:\.\d+)?)h$/.exec(a))) return ahora + Math.round(x[1] * 60); if ((x = /^(\d{1,2}):(\d{2})$/.exec(a))) { let m = Math.floor(ahora / 1440) * 1440 + +x[1] * 60 + +x[2]; if (m <= ahora) m += 1440; return m; } return null; };
const valor = v => (v === 'null' ? null : /^-?\d+(\.\d+)?$/.test(v) ? +v : v);

function nueva(dia = 2, hora = '14:00'){
  const [h, m] = hora.split(':').map(Number);
  MundoMinimo.viajes = {};
  M = Motor(D, { dia: +dia, hora: h + (m || 0) / 60 }, MundoMinimo); visto = 0;
  return M.alTiempo(ahoraMin());   // (la hora de la partida: desde aquí, el motor no se adelanta al reloj de la consola)
}
function donde(){
  const L = [...Object.keys(D.personas), ...Object.keys(D.medios)];
  for (const p of L) {
    const l = M.get(['mundo', p, 'lugar']), en = M.get(['mundo', p, 'en']), sigue = M.get(['mundo', p, 'sigue']), v = MundoMinimo.viajes[p];
    out(`  ${M.nombre(p).padEnd(24)} ${l ? M.nombre(l) : '—'}${en && en !== 'nada' ? ', en ' + M.nombre(en) : ''}${sigue && sigue !== 'nadie' ? ', sigue a ' + M.nombre(sigue) : ''}${v ? `  → va a ${M.nombre(v.a)} (${v.como}), llega ${hhmm(v.fin)}` : ''}`);
  }
  const ocu = M.ocupados(); if (ocu.length) out('  con un encargo: ' + ocu.map(q => M.nombre(q)).join(', '));
}
function espera(args){
  let ok, que = args.join(' ');
  if (args[0] === 'dicha') ok = Object.keys(D.historias).some(h => M.get([h, 'dichas', args[1]]) != null);
  else if (args[0] === 'hora') { const lim = rato(args[2], Math.floor(ahoraMin() / 1440) * 1440 - 1), now = ahoraMin(); ok = args[1] === '<=' ? now <= lim : now >= lim; }
  else { const [c, v] = args[0].split('='); const x = M.get(c.split('.')); ok = v === undefined ? x != null && x !== 'nada' && x !== 'no' && x !== 0 : String(x) === v; que += ` (es ${JSON.stringify(x)})`; }
  if (!ok) { fallas++; console.log(`  ✘ espera ${que}`); } else out(`  ✔ ${args.join(' ')}`);
}
function comando(linea){
  const [c, ...a] = linea.trim().split(/\s+/);
  if (!c || c.startsWith('#')) return;
  if (c === 'ayuda') return out(AYUDA);
  if (c === 'nueva') return mostrar(nueva(a[0], a[1]));
  if (!M) nueva();
  switch (c) {
    case 'poner': return M.llega(a[0], a[1], true);
    case 'vale': return M.vale(a[0].split('.'), valor(a[1]));
    case 'ir': return mostrar(M.irA(a[0]));
    case 'bajarse': return mostrar(M.bajarse());
    case 'avanzar': { const ahora = ahoraMin(), f = a[0] ? rato(a[0], ahora) : ahora + 1440; if (f == null) return out('  ¿cuánto? 30m, 2h o hh:mm'); return mostrar(avanzarHasta(f, !a[0])); }
    case 'si': case 'no': if (!M.estado().pregunta) return out('  nadie le pide nada a Ana'); return mostrar(M.responder(c === 'si'));
    case 'elegir': if (!M.estado().escena?.ops) return out('  no hay nada que elegir'); return mostrar(M.elegir(+a[0] - 1));
    case 'sola': return mostrar(M.decideSola());
    case 'donde': out(`  ${M.estado().reloj}`); return donde();
    case 'minutos': { const m = MundoMinimo.geografia().minutos[a[0]]?.[a[1]]; return out(m ? `  de ${M.nombre(a[0])} a ${M.nombre(a[1])}:`.replace(' a el ', ' al ') + ` a pie ${m.pie} min, Ana ${m.ana} min, en calesa ${m.calesa} min` : '  no conozco esos lugares (lugares)'); }
    case 'lugares': return out('  ' + Object.keys(D.lugares).join(', '));
    case 'quienes': return out('  ' + Object.keys(D.personas).join(', '));
    case 'registro': { const n = +a[0] || 20; for (const r of M.registro.slice(-n)) out(`  ${r.hora}  ${r.q ? nombre(r.q) + ': ' : ''}${r.t}`); return; }
    case 'espera': return espera(a);
    default: out(`  no conozco «${c}» (ayuda)`);
  }
}
const correr = texto => { for (const l of texto.split(/\n|;/)) { if (!silencio && l.trim() && !l.trim().startsWith('#')) out('> ' + l.trim()); try { comando(l); } catch (e) { fallas++; console.log('  ✘ ' + e.message); } } };

const args = process.argv.slice(2);
if (args[0] === '-e') { correr(args.slice(1).join(' ')); process.exit(fallas ? 1 : 0); }
if (args.length) {   // (las pruebas: cada archivo en una partida nueva; solo se ve lo que falla, salvo con --ver)
  const ver = args.includes('--ver'); let malas = 0;
  for (const f of args.filter(x => x !== '--ver')) {
    M = null; fallas = 0; silencio = !ver; const t0 = Date.now();
    correr(fs.readFileSync(f, 'utf8'));
    silencio = false; console.log(`${fallas ? '✘' : '✔'} ${path.basename(f)}${fallas ? ` · ${fallas} fallaron` : ''} · ${M ? M.estado().reloj : ''} · ${Date.now() - t0} ms`);
    if (fallas) malas++;
  }
  process.exit(malas ? 1 : 0);
}
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '> ' });
console.log('El mundo mínimo (ayuda: los comandos).'); mostrar(nueva()); rl.prompt();
rl.on('line', l => { try { comando(l); } catch (e) { console.log('  ✘ ' + e.message); } rl.prompt(); });
