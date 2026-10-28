// El mundo simulado del motor del lenguaje (tools/lenguaje/motor.js): lo que en el juego hacen el mapa, el A* y las
// animaciones, aquí simplificado, para probar las historias sin el juego (trazas/lenguaje.html, tools/lenguaje/probar.js).
// Los lugares van por nombre y los minutos entre ellos son fijos: 15 entre paradas de una ruta, 2 dentro de un mismo
// lugar, 3 a uno cercano, 10 si no. Un primitivo dura lo que dice su «dura»; un verbo de mapa, lo que hay hasta allá.
//
// La interfaz del mundo (la misma que tendrá el juego). El motor llama:
//   empezar(acc)   que empiece una acción: { quien, verbo, args, dura } (un primitivo, en minutos) o
//                  { quien, verbo, a, mapa: true } (ir hasta un lugar). Con ya: true, se hace en el acto (un verbo
//                  dicho en una escena).
//                  También lo que se dice en una escena: { decir: { q, t, piensa } } (una línea) y { silencio: true,
//                  dura } (nadie habla), y lo que solo el mundo sabe hacer: { nombrar: cosa, pedir } (que Ana le ponga
//                  nombre: el del libro, o el que escriba la jugadora; el mundo lo deja en acc.nombre).
//   listo(acc)     ¿terminó? (solo mira: no cambia nada)
//   terminar(acc)  lo que pasa al terminar (quien llegó, llegó). Opcional.
//   cuando(acc)    cuándo volver a mirar, en minutos de juego (para revisar lo que mantiene una receta en el camino).
//   cancelar(acc)  se deja (una escena cortada, una reparación que falló). Opcional.
//   parar(acc), seguir(acc)   se detiene mientras se repara lo que se rompió (§6, «mantiene»), y sigue después.
//   minutos(a, b)  cuánto hay entre dos lugares (para el costo de un plan).
//   tramo(ruta, desde, hasta)   las paradas de una ruta entre dos lugares, en el sentido que corresponda.
//   funciones      lo que el mundo calcula y el estado no guarda: ve, oye, sola.
//   cortar()       una escena que interrumpe va a empezar: si el mundo tiene una conversación suya en curso, la corta,
//                  y dice si cortó algo. Opcional.
//   escena(momento, id)   una escena del motor empieza, termina o se corta. Opcional.
//   efecto(e)      un efecto que el mundo también anota (log, marca). Opcional.
//   inicio         dónde está cada uno y el estado al empezar (lo que el escenario no diga). Opcional.
// Lo que el mundo tiene que recordar de una acción va en la acción misma (son datos: se guardan con la partida).
// El mundo avisa al motor con api.llega(quien, lugar): alguien llegó a un lugar o pasó por él.
(function (raiz) {
  function MundoSimulado(api){
    const { D, get } = api;
    const lugarDe = p => get(['mundo', p, 'lugar']);
    function minutos(a, b){
      if (a === b) return 0;
      for (const r of Object.values(D.rutas)) { const i = r.indexOf(a), j = r.indexOf(b); if (i >= 0 && j >= 0) return 15 * Math.abs(i - j); }
      const L = x => D.lugares[x] || {};
      if (L(a).dentro === b || L(b).dentro === a || (L(a).dentro && L(a).dentro === L(b).dentro)) return 2;
      if (L(a).cerca === b || L(b).cerca === a) return 3;
      return 10;
    }
    // (quien va en un medio lo lleva, con los que van en él; quien lo sigue, va detrás)
    function mover(p, a){
      api.llega(p, a);
      const m = get(['mundo', p, 'en']);
      if (m !== 'nada') { api.llega(m, a); for (const q of Object.keys(D.personas)) if (get(['mundo', q, 'en']) === m) api.llega(q, a); }
      for (const q of Object.keys(D.personas)) if (get(['mundo', q, 'sigue']) === p && get(['mundo', q, 'en']) === 'nada') api.llega(q, a);
    }
    const juntos = (a, b) => lugarDe(a) === lugarDe(b);
    return {
      minutos,
      tramo(por, desde, hasta){
        const r = D.rutas[por], en = x => (r.includes(x) ? x : D.lugares[x]?.dentro || D.lugares[x]?.cerca);
        const i = r.indexOf(en(desde)), j = r.indexOf(hasta);
        return i <= j ? r.slice(i + 1, j + 1) : r.slice(j, i).reverse();
      },
      funciones: { ve: juntos, oye: juntos, sola: p => Object.keys(D.personas).every(q => q === p || !juntos(p, q)) },
      empezar(acc){ acc.fin = api.ahora() + (acc.ya ? 0 : acc.mapa ? minutos(lugarDe(acc.quien), acc.a) : acc.decir ? 1 : acc.dura || 0); if (acc.nombrar) acc.nombre = D.nombrables[acc.nombrar].libro; },
      listo: acc => api.ahora() >= acc.fin,
      terminar(acc){ if (acc.mapa) mover(acc.quien, acc.a); },
      // (un viaje se mira de a un minuto: si algo se rompe en el camino, se nota enseguida)
      cuando: acc => (acc.mapa ? Math.min(acc.fin, api.ahora() + 1) : acc.fin),
      parar(acc){ acc.resta = acc.fin - api.ahora(); },
      seguir(acc){ acc.fin = api.ahora() + acc.resta; delete acc.resta; },
    };
  }
  // (el día de White Sands: Ana y Marilla en la cocina, Matthew y la calesa en el corral; Ana a prueba, tras su primera noche)
  MundoSimulado.inicio = {
    lugares: { ana: 'cocina', marilla: 'cocina', matthew: 'corral', calesa: 'corral', srapye: 'aldea', spencer: 'hotel_white_sands', blewett: 'hotel_white_sands' },
    estado: { 'comun.hechos.primera_noche': 1, 'estado.ana_en_tv': 'en_prueba' },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = { MundoSimulado };
  else raiz.MundoSimulado = MundoSimulado;
})(this);
