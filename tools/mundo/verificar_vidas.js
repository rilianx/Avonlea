#!/usr/bin/env node
// Revisa las cosas y los muebles de las vidas (docs/lenguaje/vidas/), sin vivirlas: lo que el compilador de tipos no ve.
//   muebles   cada «junto_a» existe en los muebles del lugar donde se hace (junto a la estufa: la cocina tiene estufa)
//   cosas     toda cosa que se nombra (en lo que pide, lo que deja, lo que se lleva o se usa) está declarada en cosasDe,
//             o es un objeto de la escena (usa: la olla, las agujas) que no se cuenta
//   ciclo     lo que se gasta, algo lo hace (si no, se acaba para siempre); y lo que se hace, algo lo gasta (si no, se
//             junta sin fin: platos sucios que nadie lava)
//   lugares   las cosas empiezan en lugares o personas que existen
// Uso: node tools/mundo/verificar_vidas.js   (sale con error si algo falla; también lo llama tools/mundo/dia.js)
const path = require('path');

function verificar(D){
  const fallas = [], tipos = D.cosas?.tipos || {}, muebles = D.muebles || {};
  const hace = {}, gasta = {}, nombradas = new Set();
  // (cada vez que algo llama a un verbo —en una receta o en una vida—: con qué argumentos)
  const todas = []; (function andar(x){ if (Array.isArray(x)) return x.forEach(andar); if (!x || typeof x !== 'object') return; if (typeof x.verbo === 'string' && Array.isArray(x.args)) todas.push(x); Object.values(x).forEach(andar); })([D.verbos, D.vidas]);
  const llamadas = k => todas.filter(x => x.verbo === k).map(x => x.args);
  // (qué argumento es la cosa que mueve un verbo: tomar y poner, el segundo; una receta que los llama con un parámetro suyo —llevar—, ese)
  const mueve = (v, vistos = new Set()) => { const d = D.verbos[v]; if (!d || vistos.has(v)) return null; vistos.add(v); if (['tomar', 'poner'].includes(d.opera)) return 1;
    for (const p of Object.values(d.pasos || {})) for (const x of [p].flat()) { const i = x?.verbo && mueve(x.verbo, vistos); if (i != null && x.args?.[i]?.param != null) return x.args[i].param; } return null; };
  // (los efectos de algo: qué cosas suben y cuáles bajan, también dentro de un «si»)
  const efectos = (L, de) => { for (const e of L || []) {
    if (e.e === 'si') { condicion(e.si, de); efectos(e.entonces, de); continue; }
    if (e.camino?.[0] !== 'cosas') continue;
    const x = e.camino[2]; nombradas.add(x + '\u0000' + de);
    if (e.e === 'suma' && e.n > 0) (hace[x] ||= []).push(de);
    if ((e.e === 'suma' && e.n < 0) || (e.e === 'deja' && e.valor === 0)) (gasta[x] ||= []).push(de);   // (lavar los platos: quedan en 0)
  } };
  const condicion = (c, de) => { if (!c || typeof c !== 'object') return;
    if (c.camino?.[0] === 'cosas') nombradas.add(c.camino[2] + '\u0000' + de);
    for (const v of Object.values(c)) if (Array.isArray(v)) v.forEach(w => condicion(w, de)); else if (v && typeof v === 'object') condicion(v, de); };
  for (const [k, v] of Object.entries(D.verbos)) {
    condicion(v.pide, k); efectos(v.empieza, k); efectos(v.deja, k); efectos(v.si_se_deja, k);
    if (v.tipo === 'primitivo' && v.junto_a) {
      // (dónde: un lugar fijo, o el que le dicen al llamarlo —dormir(q, 'pieza')—: se revisa cada lugar con que se llama)
      const donde = typeof v.donde === 'string' ? [v.donde] : v.donde?.param != null ? [...new Set(llamadas(k).map(a => a[v.donde.param]).filter(l => typeof l === 'string'))] : [];
      if (!v.donde) fallas.push(`muebles: ${k} es junto a «${v.junto_a}», pero no dice dónde`);
      for (const l of donde) if (!muebles[l]?.[v.junto_a]) fallas.push(`muebles: ${k} es junto a «${v.junto_a}» en ${l}, y ahí no hay (${Object.keys(muebles[l] || {}).join(', ') || 'ningún mueble'})`);
    }
    // (las cosas que se llevan, se toman o se ponen: un texto entre los argumentos de un paso)
    for (const p of Object.values(v.pasos || {})) { const i = mueve(p?.verbo); const x = i != null && p.args?.[i]; if (typeof x === 'string') nombradas.add(x + '\u0000' + k); }
  }
  for (const [h, L] of Object.entries(D.procesos || {})) for (const p of L) efectos(p.deja, `${h}: ${p.titulo}`);
  for (const n of nombradas) { const [x, de] = n.split('\u0000'); if (!tipos[x]) fallas.push(`cosas: ${de} nombra «${x}», que no está en cosasDe`); }
  for (const x of Object.keys(tipos)) {
    if (gasta[x] && !hace[x]) fallas.push(`ciclo: «${x}» se gasta (${gasta[x].join(', ')}) y nada la hace: se acaba para siempre`);
    if (hace[x] && !gasta[x]) fallas.push(`ciclo: «${x}» se hace (${hace[x].join(', ')}) y nada la gasta: se junta sin fin`);
  }
  const existe = d => D.lugares?.[d] || D.personas?.[d];
  for (const d of Object.keys(D.cosas?.inicio || {})) if (!existe(d)) fallas.push(`lugares: hay cosas en «${d}», que no es un lugar ni una persona`);
  for (const l of Object.keys(muebles)) if (!D.lugares?.[l]) fallas.push(`lugares: hay muebles en «${l}», que no es un lugar`);
  return { fallas, hace, gasta };
}

if (require.main === module) {
  const { datos } = require('../lenguaje/construir.js');
  const D = datos(path.resolve(__dirname, '..', '..', 'docs', 'lenguaje'));
  const { fallas, hace, gasta } = verificar(D);
  for (const x of Object.keys(D.cosas?.tipos || {})) console.log(`  ${x.padEnd(14)} la hace: ${(hace[x] || ['—']).join(', ')} · la gasta: ${(gasta[x] || ['—']).join(', ')}`);
  if (fallas.length) { for (const f of fallas) console.log('✘ ' + f); process.exit(1); }
  console.log('✔ las cosas y los muebles de las vidas');
}
module.exports = { verificar };
