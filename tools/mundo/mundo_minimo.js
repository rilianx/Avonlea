// El mundo mínimo: el mundo del juego sin dibujarlo. Los lugares son los del lenguaje y los minutos entre ellos son los
// del mapa real (tools/mundo/geografia.json, que exporta tools/mundo/exportar.js): a pie, Ana más rápido, y en calesa,
// con las millas de los caminos largos. No hay píxeles: cada uno está en un lugar, o va de uno a otro y llega a una hora.
// El reloj salta de un evento al siguiente (el motor pregunta «cuándo», src: tools/lenguaje/motor.js), así que un día
// entero se juega en milisegundos.
// Tiene la misma interfaz que el mundo simulado (tools/lenguaje/mundo_simulado.js, donde está documentada), y como él,
// lo que tiene que recordar de una acción va en la acción misma: se guarda con la partida.
// Como en el juego, la gente del pueblo (la Sra. Pye, la Sra. Spencer…) no camina: aparece donde una historia la pone.
// Lo que todavía no hace (lo hace el juego): el planificador y las rutinas de la gente; aquí se mueven solo los que una
// historia mueve, o la consola (tools/mundo/consola.js).
// (en node lee tools/mundo/geografia.json; en una página —trazas/lenguaje.html—, la geografía viene en GEOGRAFIA)
(function (raiz) {
const enNode = typeof module !== 'undefined' && !!module.exports;
let GEO = null;
function geografia(){
  if (GEO) return GEO;
  if (!enNode) return (GEO = raiz.GEOGRAFIA);
  const fs = require('fs'), path = require('path'), ARCHIVO = path.join(__dirname, 'geografia.json');
  if (!fs.existsSync(ARCHIVO)) throw new Error('falta tools/mundo/geografia.json: node tools/mundo/exportar.js');
  GEO = JSON.parse(fs.readFileSync(ARCHIVO, 'utf8'));
  // (si el mapa o los caminos cambiaron desde que se exportó, las distancias pueden estar viejas: se avisa, una vez)
  try { const h = require('./huella.js').huella(); if (h !== GEO.huella) console.warn('[mundo mínimo] el mapa o los caminos cambiaron desde que se exportó la geografía: node tools/build.js && node tools/mundo/exportar.js'); } catch (e) {}
  return GEO;
}
// cómo va alguien: en calesa (si va en un medio), Ana a pie (más ligera), o a pie
const modo = (q, en) => (en && en !== 'nada' ? 'calesa' : q === 'ana' ? 'ana' : 'pie');

function MundoMinimo(api){
  const { D, get } = api, G = geografia();
  const lugarDe = p => get(['mundo', p, 'lugar']);
  // (los minutos entre dos lugares, como se va; un lugar que la geografía no tiene —uno nuevo del lenguaje—: 10, y se avisa)
  function minutos(a, b, como = 'pie'){
    if (a === b || a == null || b == null) return 0;
    const m = G.minutos[a]?.[b]; if (m) return Math.max(1, m[como]);
    if (!minutos.avisado?.[a + '>' + b]) { (minutos.avisado ||= {})[a + '>' + b] = 1; console.warn(`[mundo mínimo] no sé cuánto hay de «${a}» a «${b}»: 10 min (¿exportar de nuevo?)`); }
    return 10;
  }
  // (quien va en un medio lo lleva, con los que van en él; quien lo sigue a pie, va detrás)
  function mover(p, a){
    api.llega(p, a);
    const m = get(['mundo', p, 'en']);
    if (m !== 'nada') { api.llega(m, a); for (const q of Object.keys(D.personas)) if (q !== p && get(['mundo', q, 'en']) === m) api.llega(q, a); }
    for (const q of Object.keys(D.personas)) if (get(['mundo', q, 'sigue']) === p && get(['mundo', q, 'en']) === 'nada') api.llega(q, a);
  }
  // (juntos: en el mismo lugar, o uno dentro del otro —el corral es de Tejas Verdes—, como en el juego)
  const juntos = (a, b) => { const x = lugarDe(a), y = lugarDe(b), L = D.lugares; return x != null && (x === y || L[x]?.dentro === y || L[y]?.dentro === x); };
  return {
    minutos: (a, b) => minutos(a, b),
    tramo(por, desde, hasta){
      const r = D.rutas[por], en = x => (r.includes(x) ? x : D.lugares[x]?.dentro || D.lugares[x]?.cerca);
      const i = r.indexOf(en(desde)), j = r.indexOf(hasta);
      return i <= j ? r.slice(i + 1, j + 1) : r.slice(j, i).reverse();
    },
    funciones: { ve: juntos, oye: juntos, sola: p => Object.keys(D.personas).every(q => q === p || !juntos(p, q)) },
    empezar(acc){
      const ahora = api.ahora();
      if (acc.mapa) { acc.de = lugarDe(acc.quien); acc.como = modo(acc.quien, get(['mundo', acc.quien, 'en'])); acc.sale = ahora; acc.fin = ahora + (acc.ya || G.del_pueblo.includes(acc.quien) ? 0 : minutos(acc.de, acc.a, acc.como)); MundoMinimo.viajes[acc.quien] = acc; }   // (la gente del pueblo aparece donde la pone una historia, como en el juego)
      else acc.fin = ahora + (acc.ya ? 0 : acc.decir ? 1 : acc.dura || 0);
      if (acc.nombrar) acc.nombre = D.nombrables[acc.nombrar].libro;
    },
    listo: acc => api.ahora() >= acc.fin,
    terminar(acc){ if (acc.mapa) { mover(acc.quien, acc.a); if (MundoMinimo.viajes[acc.quien] === acc) delete MundoMinimo.viajes[acc.quien]; } },
    cancelar(acc){ if (MundoMinimo.viajes[acc.quien] === acc) delete MundoMinimo.viajes[acc.quien]; },
    // (un viaje se mira de a un minuto: si algo se rompe en el camino, se nota enseguida)
    cuando: acc => (acc.mapa ? Math.min(acc.fin, api.ahora() + 1) : acc.fin),
    parar(acc){ acc.resta = acc.fin - api.ahora(); },
    seguir(acc){ acc.fin = api.ahora() + acc.resta; delete acc.resta; },
  };
}
// (quién va de camino ahora, para mirarlo —la consola—: la acción de cada uno; no se guarda, es solo para ver)
MundoMinimo.viajes = {};
MundoMinimo.inicio = (enNode ? require('../lenguaje/mundo_simulado.js').MundoSimulado : raiz.MundoSimulado).inicio;
MundoMinimo.geografia = geografia;
if (enNode) module.exports = { MundoMinimo };
else raiz.MundoMinimo = MundoMinimo;
})(this);
