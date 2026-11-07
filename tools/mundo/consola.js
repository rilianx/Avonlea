#!/usr/bin/env node
// La consola del mundo (tools/mundo/mundo.js): un teatro de marionetas. Se mueve a la gente, se le hace hacer lo que
// puede hacer (las acciones del juego: leer, estudiar, coser, partir leña…; los verbos del lenguaje: correr, seguir,
// subir…), se avanza el reloj y se mira cómo queda todo. Con historias (el motor del lenguaje, que pide lo suyo) o sin
// ellas. Lo mismo, escrito en un archivo, es una prueba: con «espera …», si no se cumple, falla.
// Uso: node tools/mundo/consola.js                      (a mano; «ayuda» dice los comandos)
//      node tools/mundo/consola.js prueba.txt …         (cada archivo, una prueba: sale con error si una falla)
//      node tools/mundo/consola.js -e "marionetas; hacer ana ir escuela; avanzar 30m; donde"
const path = require('path'), fs = require('fs'), readline = require('readline');
const { datos } = require('../lenguaje/construir.js'), { Motor } = require('../lenguaje/motor.js'), { MundoMinimo } = require('./mundo_minimo.js'), { Mundo } = require('./mundo.js');
const D = datos(path.resolve(__dirname, '..', '..', 'docs', 'lenguaje')), G = Mundo.geografia();

const AYUDA = `
  nueva [día] [hh:mm]          una partida con las historias (por omisión, el día 2 a las 14:00: el día de White Sands)
  marionetas [día] [hh:mm]     sin historias: solo la gente, lo que puede hacer, y el reloj (por omisión, día 3, 10:00)
  donde                        dónde está cada uno, en qué va, quién va de camino y quién está ocupado
  poner <quien> <lugar>        alguien está en un lugar (sin viajar: así empieza)
  avanzar [30m | 2h | hh:mm]   el reloj: hasta que pase algo, o ese rato, o esa hora (se detiene si le piden algo a Ana)
  acciones [quien]             lo que puede hacer ahora (las acciones del juego), numerado, con lo que dura
  hacer [quien] <n | verbo> …  hacer una: «hacer ana leer», «hacer matthew 3», «hacer ana ir escuela»
  verbo <verbo> <args…>        un verbo del lenguaje, de cualquiera (con historias): verbo correr_a ana orilla
  verbos                       los verbos del lenguaje
  tiene <quien> <cosa> <n>     ponerle algo en las manos: tiene ana libro 1
  cosas [quien]                lo que tiene y lo que sabe
  cariño <a> <b> [n]           cuánto quiere a a b (y cambiarlo)
  plan <quien> <meta> [args…]  lo que haría el planificador para una meta, paso a paso: plan marilla tener marilla azucar 1
  metas                        las metas del planificador
  si | no · elegir <n> · sola  contestar lo que le piden a Ana, elegir en una escena, o que Ana decida sola (con historias)
  vale <a.b.c> <valor>         un valor del estado de las historias
  minutos <lugar> <lugar>      cuánto hay entre dos lugares: a pie, Ana, en calesa
  lugares | quienes            los lugares del mundo, y quiénes hay
  registro [n]                 lo último que pasó en el mundo
  espera <a.b.c>[=valor]       (en una prueba) que se cumpla: espera mundo.ana.lugar=escuela · espera ana.cosas.libro=1
  espera dicha <escena>        que una escena se haya dicho
  # …                          un comentario`;

let W = null, M = null, R = null, visto = 0, vistoW = 0, fallas = 0, silencio = false;
const out = s => { if (!silencio) console.log(s); };
const hhmm = m => `${String(Math.floor((m % 1440) / 60)).padStart(2, '0')}:${String(Math.round(m % 60)).padStart(2, '0')}`;
const reloj = () => `día ${Math.floor(ahoraMin() / 1440) + 1}, ${hhmm(ahoraMin())}`;
const ahoraMin = () => (M ? (M.get(['tiempo', 'dia']) - 1) * 1440 + Math.round(M.get(['tiempo', 'hora']) * 60) : W.ahora());
const nom = k => W.E.personas[k]?.nombre || (D.personas[k] ? M?.nombre(k) || D.personas[k] : D.medios[k] ? 'la ' + k : k);
const nombreLinea = x => (x === 'narra' ? '' : M.nombre(x));
// (las reglas del juego: se cargan —el juego, sin navegador— la primera vez que se pide una acción)
const reglas = () => R || (R = require('./reglas_juego.js').ReglasJuego(W));
// lo nuevo: del motor (las líneas de las historias), y del mundo (quién llega, quién termina lo que hacía)
function mostrar(u){
  if (M) {
    for (; visto < M.registro.length; visto++) {
      const r = M.registro[visto], h = r.hora.split(', ')[1];
      if (r.tipo === 'linea') out(`  ${h}  ${nombreLinea(r.q) ? nombreLinea(r.q) + (r.piensa ? ' (piensa)' : '') + ': ' : ''}${r.t.length > 160 ? r.t.slice(0, 160) + '…' : r.t}`);
      else if (r.tipo === 'eleccion') out(`  ${h}  → ${r.t}`);
      else out(`  ${h}     ${r.t}`);
    }
    u = u || M.estado();
    if (u.pregunta) out(`  ❓ ${u.pregunta.de} le pide a Ana: «${u.pregunta.si}» (si) / «${u.pregunta.no}» (no)`);
    if (u.escena?.ops) out('  ❓ ¿Qué dice Ana? ' + u.escena.ops.map((o, i) => `${i + 1}. ${o}`).join(' · ') + '  (elegir n)');
  }
  const RG = W.E.registro; vistoW = Math.min(vistoW, RG.length);
  for (; vistoW < RG.length; vistoW++) { const r = RG[vistoW]; if (!M && / llega | termina: /.test(r.txt)) out(`  ${hhmm(r.t)}  · ${r.txt.replace(/^(\w+)/, (m, k) => nom(k))}`); }
  return u;
}
const esperando = u => !!(u && (u.pregunta || u.escena?.ops));
// el reloj: con historias, el motor no se adelanta a la hora que se le da (alTiempo, como en el juego); sin ellas, el
// mundo. Sin hora: hasta que pase algo (alguien llega o termina; una línea, una pregunta), o un día
function avanzarHasta(fin, algo){
  if (!M) { const p = W.proximo(), t = algo && p < Infinity ? Math.min(fin, p) : fin; W.avanzarHasta(t); return mostrar(); }
  let u = M.estado();
  for (let m = ahoraMin() + 1; ; m++) {
    const n = M.registro.length;
    u = M.alTiempo(algo ? m : Math.max(m, fin));
    if (esperando(u) || (algo && M.registro.length > n) || ahoraMin() >= fin) return mostrar(u);
  }
}
const rato = (a, ahora) => { let x; if ((x = /^(\d+)m$/.exec(a))) return ahora + +x[1]; if ((x = /^(\d+(?:\.\d+)?)h$/.exec(a))) return ahora + Math.round(x[1] * 60); if ((x = /^(\d{1,2}):(\d{2})$/.exec(a))) { let m = Math.floor(ahora / 1440) * 1440 + +x[1] * 60 + +x[2]; if (m <= ahora) m += 1440; return m; } return null; };
const valor = v => (v === 'null' ? null : /^-?\d+(\.\d+)?$/.test(v) ? +v : v);
const horaDe = (h = '14:00') => { const [a, b] = String(h).split(':').map(Number); return a + (b || 0) / 60; };

// una partida: el mundo, y si hay historias, el motor jugando en él
function nueva(dia = 2, hora = '14:00', historias = true){
  W = Mundo(G); R = null; visto = 0; vistoW = 0; M = null;
  MundoMinimo.mundo = W; MundoMinimo.viajes = {};
  W.E.t = (+dia - 1) * 1440 + Math.round(horaDe(hora) * 60);
  if (historias) { M = Motor(D, { dia: +dia, hora: horaDe(hora) }, MundoMinimo); return M.alTiempo(ahoraMin()); }   // (desde aquí, el motor no se adelanta al reloj de la consola)
  for (const [k, l] of Object.entries(MundoMinimo.inicio.lugares)) W.poner(k, l);   // (sin historias: los de Tejas Verdes en casa; los demás, donde los tiene el juego a esa hora —con la primera acción—)
  return null;
}
function donde(){
  out(`  ${reloj()}`);
  for (const [k, p] of Object.entries(W.E.personas)) {
    if (p.lugar == null && !p.viaje) continue;
    out(`  ${nom(k).padEnd(26)} ${W.nombre(p.lugar)}${p.en !== 'nada' ? ', en ' + p.en : ''}${p.sigue !== 'nadie' ? ', sigue a ' + nom(p.sigue) : ''}${p.viaje ? `  → va a ${W.nombre(p.viaje.a)} (${p.viaje.como}), llega ${hhmm(p.viaje.llega)}` : ''}${p.ocupado ? `  · ${p.ocupado.que}, hasta ${hhmm(p.ocupado.hasta)}` : ''}`);
  }
  for (const [m, x] of Object.entries(W.E.medios)) if (x.lugar) out(`  ${('la ' + m).padEnd(26)} ${W.nombre(x.lugar)}${x.listo === 'si' ? ', enganchada' : ''}${x.viaje ? `  → va a ${W.nombre(x.viaje.a)}` : ''}`);
  if (M) { const ocu = M.ocupados(); if (ocu.length) out('  con un encargo de una historia: ' + ocu.map(q => nom(q)).join(', ')); }
}
// el valor de un camino, para «espera»: del mundo (de una persona: su lugar —el del mundo o el de las historias—, en qué
// va, sus cosas, lo que sabe…) o, con historias, del motor
function leer(c){
  const [a, b, ...r] = c.split('.');
  if (a === 'mundo' && W.E.personas[b] && r[0] === 'lugar') return [W.E.personas[b].lugar, W.vista(b)];
  if (a === 'mundo' && W.E.personas[b] && r[0] === 'en') return [W.E.personas[b].en];
  for (const raiz of [W.E.personas, W.E]) if (raiz[a] !== undefined) { let x = raiz[a]; for (const k of [b, ...r].filter(k => k !== undefined)) x = x?.[k]; return [Array.isArray(x) ? x.join(',') : x]; }   // (de una persona, o del mundo: hechos.leido:ana, cariño.ana>diana)
  return [M ? M.get(c.split('.')) : undefined];
}
function espera(args){
  let ok, que = args.join(' ');
  if (args[0] === 'dicha') ok = !!M && Object.keys(D.historias).some(h => M.get([h, 'dichas', args[1]]) != null);
  else { const t = args.join(' '), i = t.indexOf('='), c = i < 0 ? t : t.slice(0, i), v = i < 0 ? undefined : t.slice(i + 1), xs = leer(c); ok = v === undefined ? xs.some(x => x != null && x !== 'nada' && x !== 'no' && x !== 0) : xs.some(x => String(x) === v); que += ` (es ${xs.map(x => JSON.stringify(x)).join(' / ')})`; }
  if (!ok) { fallas++; console.log(`  ✘ espera ${que}`); } else out(`  ✔ ${args.join(' ')}`);
}
function acciones(q){
  const L = reglas().acciones(q), p = W.persona(q);
  out(`  ${nom(q)} puede, ahora, en ${W.nombre(p.lugar)}${p.ocupado ? ` (cuando termine: ${p.ocupado.que}, a las ${hhmm(p.ocupado.hasta)})` : ''}:`);
  L.forEach((o, i) => { if (o.v !== 'ir') out(`   ${String(i + 1).padStart(3)}. ${o.txt} (${o.min} min)`); });
  const ir = L.filter(o => o.v === 'ir' && o.a); if (ir.length) out(`        e ir a: ${ir.map(o => o.a).join(', ')}`);
}
function hacer(q, que){
  const L = reglas().acciones(q);
  const i = /^\d+$/.test(que[0]) ? +que[0] - 1 : que[0] === 'ir' ? L.findIndex(o => o.v === 'ir' && (o.a === W.lugarId(que[1]) || o.a === que[1])) : L.findIndex(o => o.v === que[0] && (!que[1] || o.txt.includes(que.slice(1).join(' '))));
  if (i < 0 && que[0] === 'ir' && que[1]) { W.ir(q, que[1]); return out(`  ${nom(q)} va ${W.al(W.lugarId(que[1]))}, llega a las ${hhmm(W.persona(q).viaje?.llega ?? W.ahora())}`); }   // (un lugar que el planificador no tiene: el mundo sabe ir)
  if (i < 0 || !L[i]) return out(`  ${nom(q)} no puede hacer «${que.join(' ')}» ahora (acciones ${q})`);
  const r = reglas().hacer(q, i);
  if (r.error) return out('  ' + r.error);
  out(`  ${nom(q)}: ${r.txt} (${r.min} min)`);
  for (const c of r.cambios) out('    · ' + c);
  if (M) mostrar(M.alTiempo(ahoraMin()));
}
function plan(q, meta, args){
  const r = reglas().plan(q, meta, args.map(valor));
  if (r.error) return out('  ' + r.error);
  out(`  ${r.meta}: ${r.ok ? 'llega a las ' + r.fin : r.pasos ? 'no llega (hace lo que puede)' : 'no encuentra cómo'} · ${r.n} estados mirados`);
  for (const p of r.pasos || []) out('    ' + p);
}
function comando(linea){
  const [c, ...a] = linea.trim().split(/\s+/);
  if (!c || c.startsWith('#')) return;
  if (c === 'ayuda') return out(AYUDA);
  if (c === 'nueva') return mostrar(nueva(a[0], a[1]));
  if (c === 'marionetas') { nueva(a[0] || 3, a[1] || '10:00', false); out(`  ${reloj()} · sin historias`); return; }
  if (!W) nueva();
  const historias = () => { if (!M) throw new Error('eso es de las historias: empieza con «nueva»'); };
  switch (c) {
    case 'donde': return donde();
    case 'poner': W.poner(a[0], a[1]); if (M) M.llega(a[0], W.vista(a[0]), true); return;
    case 'avanzar': { const ahora = ahoraMin(), f = a[0] ? rato(a[0], ahora) : ahora + 1440; if (f == null) return out('  ¿cuánto? 30m, 2h o hh:mm'); avanzarHasta(f, !a[0]); return; }
    case 'acciones': return acciones(a[0] || 'ana');
    case 'hacer': return W.E.personas[a[0]] || D.personas[a[0]] ? hacer(a[0], a.slice(1)) : hacer('ana', a);
    case 'tiene': reglas(); W.persona(a[0]).cosas[a[1]] = +a[2]; return out(`  ${nom(a[0])} tiene ${a[1]}: ${a[2]}`);
    case 'cosas': { reglas(); const p = W.persona(a[0] || 'ana'); return out(`  ${nom(a[0] || 'ana')}, en ${W.nombre(p.lugar)}: tiene ${Object.entries(p.cosas).filter(([, n]) => n).map(([x, n]) => n + ' ' + x).join(', ') || 'nada'}; sabe ${p.sabe.join(', ') || 'nada'}`); }
    case 'cariño': { reglas(); const r = a[0] + '>' + a[1]; if (a[2] != null) W.E.cariño[r] = +a[2]; return out(`  cómo quiere ${nom(a[0])} a ${nom(a[1])}: ${W.E.cariño[r] ?? '—'}`); }
    case 'plan': return plan(a[0], a[1], a.slice(2));
    case 'metas': return out('  ' + reglas().metas());
    case 'verbo': historias(); return mostrar(M.hacer(a[0], a.slice(1)));
    case 'verbos': for (const [v, d] of Object.entries(D.verbos)) out(`  ${v}(${(d.params || []).join(', ')})${d.tipo ? '  · ' + d.tipo : ''}`); return;
    case 'ir': historias(); return mostrar(M.irA(a[0]));
    case 'bajarse': historias(); return mostrar(M.bajarse());
    case 'si': case 'no': historias(); if (!M.estado().pregunta) return out('  nadie le pide nada a Ana'); return mostrar(M.responder(c === 'si'));
    case 'elegir': historias(); if (!M.estado().escena?.ops) return out('  no hay nada que elegir'); return mostrar(M.elegir(+a[0] - 1));
    case 'sola': historias(); return mostrar(M.decideSola());
    case 'vale': historias(); return M.vale(a[0].split('.'), valor(a[1]));
    case 'minutos': { const x = W.lugarId(a[0]), y = W.lugarId(a[1]), m = G.minutos[x]?.[y]; return out(m ? `  de ${W.nombre(x)} a ${W.nombre(y)}: a pie ${m.pie} min, Ana ${m.ana} min, en calesa ${m.calesa} min` : '  no conozco esos lugares (lugares)'); }
    case 'lugares': return out('  ' + Object.entries(G.lugares).map(([k, l]) => `${k} (${l.nombre})`).join(' · '));
    case 'quienes': return out('  ' + Object.keys(W.E.personas).map(k => `${k} (${nom(k)})`).join(', '));
    case 'registro': for (const r of W.E.registro.slice(-(+a[0] || 20))) out(`  ${hhmm(r.t)}  ${r.txt}`); return;
    case 'espera': return espera(a);
    default: out(`  no conozco «${c}» (ayuda)`);
  }
}
const correr = texto => { for (const l of texto.split('\n').filter(x => !x.trim().startsWith('#')).flatMap(x => x.split(';'))) { if (!silencio && l.trim()) out('> ' + l.trim()); try { comando(l); } catch (e) { fallas++; console.log('  ✘ ' + e.message); } } };

const args = process.argv.slice(2);
if (args[0] === '-e') { correr(args.slice(1).join(' ')); process.exit(fallas ? 1 : 0); }
if (args.length) {   // (las pruebas: cada archivo en una partida nueva; solo se ve lo que falla, salvo con --ver)
  const ver = args.includes('--ver'); let malas = 0;
  for (const f of args.filter(x => x !== '--ver')) {
    W = null; M = null; R = null; fallas = 0; silencio = !ver; const t0 = Date.now();
    correr(fs.readFileSync(f, 'utf8'));
    silencio = false; console.log(`${fallas ? '✘' : '✔'} ${path.basename(f)}${fallas ? ` · ${fallas} fallaron` : ''} · ${W ? reloj() : ''} · ${Date.now() - t0} ms`);
    if (fallas) malas++;
  }
  process.exit(malas ? 1 : 0);
}
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '> ' });
console.log('El mundo (ayuda: los comandos).'); mostrar(nueva()); rl.prompt();
rl.on('line', l => { try { comando(l); } catch (e) { console.log('  ✘ ' + e.message); } rl.prompt(); });
