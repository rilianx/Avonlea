// Las historias en el mundo: el motor del lenguaje (tools/lenguaje/motor.js) juega sobre el mundo (tools/mundo/mundo.js),
// como en el juego juega sobre el juego. Esto es lo que los une: la interfaz del mundo para el motor (la misma que la
// del mundo simulado, tools/lenguaje/mundo_simulado.js, donde está documentada), hecha con el mundo.
// - El estado es el del mundo. El motor lleva una copia de lo que lee (dónde está cada uno, en qué va, a quién sigue,
//   la calesa): se la dice el mundo cada vez que cambia (contar).
// - Lo que el motor hace (ir a un lugar, subir, seguir, un hecho, la paciencia de Marilla) lo hace el mundo (efecto).
// - Los lugares de las historias son lugares del mundo (la estación, el lago… con su nombre del planificador: alias).
// - Como en el juego, la gente del pueblo (la Sra. Pye, la Sra. Spencer…) no camina: aparece donde la pone una historia.
// Cada motor juega en un mundo (MundoMinimo.mundo; si no hay, uno nuevo, desde donde el motor dice que está cada uno).
// Lo de un viaje en curso va también en la acción del motor (de, a, sale, fin): se guarda con la partida.
(function (raiz) {
  const enNode = typeof module !== 'undefined' && !!module.exports;
  const { Mundo } = enNode ? require('./mundo.js') : raiz;

  function MundoMinimo(api){
    const { D, get, set } = api, G = Mundo.geografia();
    const W = MundoMinimo.mundo || (MundoMinimo.mundo = Mundo(G));
    const L = D.lugares, dentro = Object.fromEntries(Object.entries(L).filter(([, l]) => l.dentro).map(([k, l]) => [k, l.dentro]));
    const quienes = () => [...Object.keys(D.personas), ...Object.keys(D.medios)];
    // el mundo le dice al motor cómo está: dónde está cada uno (si se movió, llega: es un momento; si el motor no sabía
    // dónde estaba, no), en qué va, a quién sigue, si la calesa está enganchada
    function contar(){
      iniciar(); W.avanzarHasta(api.ahora());
      for (const q of quienes()) { const l = W.vista(q), antes = get(['mundo', q, 'lugar']); if (l != null && l !== antes) { if (antes == null) set(['mundo', q, 'lugar'], l); else api.llega(q, l); } }
      for (const q of Object.keys(D.personas)) { const p = W.E.personas[q]; if (!p) continue; for (const c of ['en', 'sigue']) if (get(['mundo', q, c]) !== p[c]) set(['mundo', q, c], p[c]); }
      for (const [m, x] of Object.entries(W.E.medios)) if (D.medios[m] && get(['mundo', m, 'listo']) !== x.listo) set(['mundo', m, 'listo'], x.listo);
    }
    // (al empezar —la primera vez que el motor le pide algo: cuando se crea, todavía no sabe dónde empieza cada uno—, el
    // mundo toma del motor lo que no sabe: dónde está cada uno, en qué va, la calesa)
    let iniciado = false;
    function iniciar(){
    if (iniciado) return; iniciado = true;
    W.avanzarHasta(api.ahora());
    for (const q of quienes()) { const l = get(['mundo', q, 'lugar']), x = W.E.personas[q] || W.E.medios[q]; if (l != null && x?.lugar == null) W.poner(q, l); }
    for (const q of Object.keys(D.personas)) { const p = W.E.personas[q]; if (!p) continue; for (const c of ['en', 'sigue']) { const v = get(['mundo', q, c]); if (v !== 'nada' && v !== 'nadie' && v != null) p[c] = v; } }
    for (const m of Object.keys(D.medios)) if (get(['mundo', m, 'listo']) === 'si') W.E.medios[m].listo = 'si';
    contar();
    }
    const y = f => (...a) => { iniciar(); return f(...a); };   // (cada cosa que pide el motor: primero, iniciar)
    return {
      minutos: y((a, b) => W.minutos(a, b)),
      tramo(por, desde, hasta){
        const r = D.rutas[por], en = x => (r.includes(x) ? x : L[x]?.dentro || L[x]?.cerca);
        const i = r.indexOf(en(desde)), j = r.indexOf(hasta);
        return i <= j ? r.slice(i + 1, j + 1) : r.slice(j, i).reverse();
      },
      funciones: { ve: y((a, b) => W.juntos(a, b, dentro)), oye: y((a, b) => W.juntos(a, b, dentro)), sola: y(p => Object.keys(D.personas).every(q => q === p || !W.juntos(p, q, dentro))) },
      empezar(acc){
        iniciar(); W.avanzarHasta(api.ahora());
        if (acc.mapa) {   // (la gente del pueblo aparece: sale ahora y llega ya)
          acc.de = W.vista(acc.quien); acc.deW = W.persona(acc.quien).lugar; acc.aW = W.lugarId(acc.a); acc.sale = api.ahora();
          acc.fin = W.ir(acc.quien, acc.a, acc.ya || G.del_pueblo.includes(acc.quien) ? { minutos: 0 } : {});   // (lo dicho en una escena —correr al mar— es ya, como en el juego, para el motor) acc.como = W.persona(acc.quien).viaje?.como || 'pie';
          MundoMinimo.viajes[acc.quien] = acc;
        } else acc.fin = api.ahora() + (acc.ya ? 0 : acc.decir ? 1 : acc.dura || 0);
        if (acc.nombrar) acc.nombre = D.nombrables[acc.nombrar].libro;
      },
      // (un viaje: cuando el mundo dice que llegó; si el mundo no lo tiene en camino —una partida cargada—, se le vuelve a dar)
      listo(acc){
        iniciar(); if (!acc.mapa) return api.ahora() >= acc.fin;
        const p = W.persona(acc.quien); if (!p.viaje && p.lugar !== acc.aW && api.ahora() < acc.fin) W.ir(acc.quien, acc.a, { minutos: acc.fin - api.ahora() });
        W.avanzarHasta(api.ahora()); return !W.persona(acc.quien).viaje;
      },
      terminar(acc){ if (acc.mapa) { contar(); if (MundoMinimo.viajes[acc.quien] === acc) delete MundoMinimo.viajes[acc.quien]; } },
      cancelar(acc){ if (acc.mapa) { W.parar(acc.quien); if (MundoMinimo.viajes[acc.quien] === acc) delete MundoMinimo.viajes[acc.quien]; } },
      // (un viaje se mira de a un minuto: si algo se rompe en el camino, se nota enseguida)
      cuando: acc => (acc.mapa ? Math.min(acc.fin, api.ahora() + 1) : acc.fin),
      parar(acc){ acc.resta = acc.mapa ? W.parar(acc.quien) : acc.fin - api.ahora(); },
      seguir(acc){ if (acc.mapa) { W.avanzarHasta(api.ahora()); acc.fin = W.ir(acc.quien, acc.a, { minutos: acc.resta }); acc.sale = api.ahora(); MundoMinimo.viajes[acc.quien] = acc; } else acc.fin = api.ahora() + acc.resta; delete acc.resta; },
      // lo que el motor hace en su estado, el mundo lo hace en el suyo (subir, bajar, seguir, la calesa, los hechos, las
      // cualidades, los estados)
      efecto(e){
        iniciar();
        const c = e.camino || [], v = e.valor;
        if (e.e === 'deja' && c[0] === 'mundo') {
          if (c[2] === 'en') v === 'nada' ? W.bajar(c[1]) : W.subir(c[1], v);
          else if (c[2] === 'sigue') v === 'nadie' ? W.dejarDeSeguir(c[1]) : W.seguir(c[1], v);
          else if (c[2] === 'listo' && W.E.medios[c[1]]) W.E.medios[c[1]].listo = v;
          else if (c[2] === 'lugar') W.poner(c[1], v);
        }
        else if (e.e === 'deja' && c[0] === 'estado') W.E.estados[c[1]] = v;
        else if (e.e === 'deja') W.E.hechos[c.join('.')] = v ?? 1;
        else if (e.e === 'olvida') delete W.E.hechos[c.join('.')];
        else if (e.e === 'suma' && c[0] === 'cualidad') W.E.cualidades[c.slice(1).join('.')] = get(c);
      },
      contar,
    };
  }
  // (quién va de camino ahora, para mirarlo —la consola, la página—: la acción de cada uno; no se guarda, es solo para ver)
  MundoMinimo.viajes = {};
  MundoMinimo.mundo = null;
  MundoMinimo.inicio = (enNode ? require('../lenguaje/mundo_simulado.js').MundoSimulado : raiz.MundoSimulado).inicio;
  MundoMinimo.geografia = () => Mundo.geografia();
  if (enNode) module.exports = { MundoMinimo };
  else raiz.MundoMinimo = MundoMinimo;
})(this);
