// EL MUNDO: lo que hay y cómo está, sin dibujarlo. Un solo estado para todo (tools/mundo/LEEME.md):
//   lugares    la lista de tools/mundo/geografia.json (los del planificador del juego y los de las historias, juntos).
//              Alrededor de Tejas Verdes, el tablero: cuadrantes del tamaño de una conversación (c:2,0), cada uno de una
//              zona (el corral); el nombre de la zona es su cuadrante principal
//   personas   cada una: dónde está (un lugar de la lista), en qué va, a quién sigue, qué sabe, si va de
//              camino (de dónde, adónde, a qué hora llega), y si está ocupada en algo (qué, hasta qué hora)
//   medios     la calesa: dónde está y si está enganchada
//   cosas      dónde está cada cosa, y cuántas: en un lugar (la leña, en el granero) o con alguien (el libro, con Ana):
//              { granero: { lena: 10 }, ana: { libro: 1 } }. Un solo inventario, el de las vidas y el del planificador
//   cariño     cuánto quiere cada uno a cada otro ('ana>marilla': -2..5, como en el juego)
//   hechos, ofensas, vacas, existencias (lo que hay para recoger), enfermos, estados (ana_en_tv…), cualidades
//   (la paciencia de Marilla…), y el reloj: minutos desde el comienzo del día 1
// Quienes lo usan, lo leen y lo cambian por aquí: las historias (el motor del lenguaje, por tools/mundo/mundo_minimo.js),
// las reglas del juego (lo que se puede hacer y qué cambia: tools/mundo/reglas_juego.js), la consola y la página.
// Es datos: se guarda y se carga entero (guardar / Mundo.cargar).
(function (raiz) {
  const enNode = typeof module !== 'undefined' && !!module.exports;
  // cómo va alguien: en calesa (si va en un medio), a su paso (si la geografía tiene el suyo: Ana, más ligera), o a pie

  function Mundo(G, E = null){
    const modo = (q, en) => (en && en !== 'nada' ? 'calesa' : G.velocidades[q] ? q : 'pie');
    E = E || { t: 0, personas: {}, medios: { calesa: { lugar: null, listo: 'no' } }, cosas: {}, cariño: {}, ofensas: {}, hechos: {}, vacas: {}, existencias: {}, enfermos: [], estados: {}, cualidades: {}, registro: [] };
    const nota = t => { E.registro.push({ t: E.t, txt: t }); if (E.registro.length > 400) E.registro.splice(0, 100); };
    const lugarId = l => (l == null ? l : G.lugares[l] ? l : G.alias[l] || l);   // (un lugar de las historias, como lo llama el mundo)
    const nombre = l => G.lugares[l]?.nombre || l;
    const a = l => ('a ' + nombre(l)).replace(/^a el /, 'al '), de = l => ('de ' + nombre(l)).replace(/^de el /, 'del ');   // (al granero, del granero)
    const persona = k => (E.personas[k] ||= { lugar: null, en: 'nada', sigue: 'nadie', sabe: [], viaje: null });
    // (las cosas de un lugar o de alguien: cuántas hay)
    const cosasDe = d => (E.cosas[d] ||= {});
    // (los minutos entre dos lugares, como se va: los medidos sobre el mapa; uno que no está: 10, y se avisa)
    function minutos(a, b, como = 'pie'){
      a = lugarId(a); b = lugarId(b); if (a === b || a == null || b == null) return 0;
      const m = G.minutos[a]?.[b]; if (m) return Math.max(1, m[como]);
      if (!minutos.avisado?.[a + '>' + b]) { (minutos.avisado ||= {})[a + '>' + b] = 1; console.warn(`[mundo] no sé cuánto hay de «${a}» a «${b}»: 10 min`); }
      return 10;
    }
    // EL CAMINO, PASO A PASO (geografia.json «tablero»): afuera, los cuadrantes de Tejas Verdes; adentro, las piezas de la
    // casa (su plano) y sus puertas; la puerta de la cocina da al patio. Quien va de un lugar a otro de todo eso pasa
    // por los de en medio, uno por uno —y mientras pasa, está ahí: ve y lo ven—. A un lugar lejos, sale por el borde del
    // tablero que queda hacia allá (y de vuelta, entra por ahí)
    const TB = G.tablero, PL = TB?.plano, celda = l => G.lugares[l]?.celda, pieza = l => PL?.piezas[l], centro = l => G.puntos[l]?.[0]?.mapa;
    const enGrafo = l => !!(celda(l) || pieza(l));
    const CELDAS = TB ? Object.keys(G.lugares).filter(l => celda(l) && !G.lugares[l].edificio) : [];
    function entrada(l){   // (por qué cuadrante del borde entra al tablero, o sale, quien viene de ese lugar o va a él)
      const p = centro(l) || G.dibujo?.puertas?.[G.puntos[l]?.[0]?.camino]; if (!p) return null;
      let m = null, d0 = Infinity; for (const c of CELDAS) { const q = centro(c), d = Math.hypot(q[0] - p[0], q[1] - p[1]); if (d < d0) { d0 = d; m = c; } } return m;
    }
    // (los vecinos de un lugar del grafo, y cuántos px hay hasta cada uno —la escalera, un poco más—)
    const mitad = l => { const x = pieza(l); return [x.x + x.w / 2, x.y + x.h / 2]; };
    function vecinos(u){
      const L = [];
      if (celda(u)) { const [i, j] = celda(u); for (let di = -1; di <= 1; di++) for (let dj = -1; dj <= 1; dj++) { const v = 'c:' + (i + di) + ',' + (j + dj); if ((di || dj) && G.lugares[v]) L.push([v, Math.hypot(di, dj) * TB.c]); }
        for (const [k, o] of Object.entries(PL?.afuera || {})) if (o.celda === u) L.push([k, 60]); }
      else if (pieza(u)) { for (const [a, b] of PL.puertas) if (a === u || b === u) { const v = a === u ? b : a, [x0, y0] = mitad(u), [x1, y1] = mitad(v); L.push([v, pieza(u).piso !== pieza(v).piso ? 140 : Math.hypot(x1 - x0, y1 - y0)]); }
        if (PL.afuera[u]) L.push([PL.afuera[u].celda, 60]); }
      return L;
    }
    function ruta(a, b){   // (el camino más corto entre dos lugares del grafo: rodea la casa y el granero por afuera)
      if (a === b) return [];
      const dist = { [a]: 0 }, prev = {}, abiertos = [a];
      while (abiertos.length) {
        abiertos.sort((x, y) => dist[x] - dist[y]); const u = abiertos.shift(); if (u === b) break;
        for (const [v, d] of vecinos(u)) { if (G.lugares[v]?.edificio && v !== b) continue; const n = dist[u] + d; if (n < (dist[v] ?? Infinity)) { dist[v] = n; prev[v] = u; abiertos.push(v); } }
      }
      const L = []; for (let x = b; x !== a; x = prev[x]) { if (x == null) return []; L.unshift([x, dist[x]]); } return L;
    }
    // (los pasos de un viaje: cada lugar del grafo, a qué minuto del viaje; y lo que dura todo)
    function pasosDe(de, a, como, total){
      if (!TB || de == null || a == null) return null;
      const da = enGrafo(de), dd = enGrafo(a); if (!da && !dd) return null;
      const desde = da ? de : entrada(de), hasta = dd ? a : entrada(a); if (!desde || !hasta) return null;
      const v = G.velocidades[como] * G.minuto_de_juego_s, pasos = ruta(desde, hasta).map(([l, d]) => ({ l, t: d / v })), t = pasos.length ? pasos[pasos.length - 1].t : 0;
      if (da && dd) return { pasos, total: Math.max(t, .3) };
      if (!da) { const fuera = Math.max(total - t, .5); return { pasos: [{ l: desde, t: fuera }, ...pasos.map(p => ({ l: p.l, t: fuera + p.t }))], total: fuera + t }; }   // (llega al tablero, y lo cruza)
      return { pasos, total: Math.max(total, t + .5) };   // (cruza el tablero, y sigue)
    }
    // quiénes van con alguien: los que van en su medio (y el medio), y los que lo siguen a pie
    const conEl = k => { const p = persona(k), L = []; if (p.en !== 'nada') { L.push(p.en); for (const [q, o] of Object.entries(E.personas)) if (q !== k && o.en === p.en) L.push(q); }
      for (const [q, o] of Object.entries(E.personas)) if (q !== k && o.sigue === k && o.en === 'nada') L.push(q); return L; };
    const quien = k => E.personas[k] || E.medios[k];
    // ir a un lugar: llega cuando le toca (y los que van con él, con él). minutos: lo que dura, si se sabe (lo que le
    // quedaba a un viaje detenido)
    function ir(k, a, o = {}){
      const p = persona(k), de = p.lugar, de_ = l => (l == null ? '' : ('de ' + nombre(l)).replace(/^de el /, 'del ')), a_ = l => ('a ' + nombre(l)).replace(/^a el /, 'al '); a = lugarId(a);
      const como = modo(k, p.en), P = o.minutos === 0 ? null : pasosDe(de, a, como, o.minutos ?? minutos(de, a, como));   // (por el tablero: de cuadrante en cuadrante)
      const m = P ? P.total : o.minutos ?? minutos(de, a, como), v = { de, a, sale: E.t, llega: E.t + m, como, ...(P ? { pasos: P.pasos.map(x => ({ l: x.l, t: E.t + x.t })), i: 0 } : {}) };
      for (const q of [k, ...conEl(k)]) { const x = quien(q); x.viaje = { ...v }; }
      if (m > 0) nota(`${k} va ${de_(de)} ${a_(a)} (${como}, ${Math.round(m)} min)`);
      else avanzarHasta(E.t);
      return v.llega;
    }
    // detenerse a mitad de camino: se queda donde salió, o, en el tablero, en el cuadrante que iba pisando (el mundo no
    // tiene «medio camino»: está en un lugar o va a otro)
    function parar(k){ const v = persona(k).viaje; if (!v) return 0; const resta = v.llega - E.t; for (const q of [k, ...conEl(k)]) { const x = quien(q); if (x.viaje) x.viaje = null; } nota(`${k} se detiene`); return resta; }
    // el reloj: lo que pasa hasta esa hora (los que llegan, llegan)
    function avanzarHasta(t){
      for (;;) {   // (en orden: quien llega, quien termina lo que hacía)
        let prox = null; const ver = (k, x, cuando, que) => { if (cuando <= t && (!prox || cuando < prox.cuando)) prox = { k, x, cuando, que }; };
        for (const L of [E.personas, E.medios]) for (const [k, x] of Object.entries(L)) { if (x.viaje) { const ps = x.viaje.pasos?.[x.viaje.i]; if (ps) ver(k, x, ps.t, 'pasa'); else ver(k, x, x.viaje.llega, 'llega'); } if (x.ocupado) ver(k, x, x.ocupado.hasta, 'termina'); }
        if (!prox) break;
        const { k, x, cuando, que } = prox; E.t = Math.max(E.t, cuando);
        if (que === 'pasa') { x.lugar = x.viaje.pasos[x.viaje.i].l; x.viaje.i++; continue; }   // (un cuadrante más del camino)
        if (que === 'llega') { x.lugar = x.viaje.a; x.viaje = null; nota(`${k} llega ${a(x.lugar)}`); } else { nota(`${k} termina: ${x.ocupado.que}`); x.ocupado = null; }
      }
      E.t = Math.max(E.t, t);
    }
    // (lo próximo que pasa: alguien que llega, o que termina lo que hacía)
    const proximo = () => { let m = Infinity; for (const L of [E.personas, E.medios]) for (const x of Object.values(L)) { if (x.viaje) m = Math.min(m, x.viaje.pasos?.[x.viaje.i]?.t ?? x.viaje.llega); if (x.ocupado) m = Math.min(m, x.ocupado.hasta); } return m; };
    return {
      E, G, nombre, al: a, del: de, lugarId, cosasDe, pasosDe, persona, minutos, ir, parar, avanzarHasta, proximo, nota,
      ahora: () => E.t,
      poner(k, l){ const x = quien(k) || persona(k); x.lugar = lugarId(l); x.viaje = null; },
      // dónde está, como lo dicen las historias (el granero queda en Tejas Verdes; quien va de camino, todavía donde salió)
      vista(k){ const x = quien(k); const l = x?.lugar; return l == null ? null : G.lugares[l]?.vista || l; },
      // los verbos de un paso, que hacen todos
      subir(k, m){ const p = persona(k); p.en = m; p.sigue = 'nadie'; nota(`${k} sube a ${m}`); },
      bajar(k){ const p = persona(k); if (p.en === 'nada') return; nota(`${k} baja de ${p.en}`); p.en = 'nada'; },
      seguir(k, otro){ persona(k).sigue = otro; nota(`${k} sigue a ${otro}`); },
      dejarDeSeguir(k){ persona(k).sigue = 'nadie'; },
      enganchar(m){ E.medios[m].listo = 'si'; },
      // (hacer algo que dura: hasta que termina, no hace otra cosa)
      ocupar(k, que, min, como = {}){ persona(k).ocupado = { que, desde: E.t, hasta: E.t + min, ...Object.fromEntries(Object.entries(como).filter(([, v]) => v != null)) }; nota(`${k}: ${que} (${Math.round(min)} min)`); },
      // (dejarlo a medias: lo cortó algo más importante)
      dejar(k, que){ const p = persona(k); if (p.ocupado && p.ocupado.que === que) { nota(`${k} deja: ${que}`); p.ocupado = null; } },
      // dos en el mismo lugar (o uno dentro del otro, para las historias: la cocina es de Tejas Verdes). Afuera, en el
      // tablero de Tejas Verdes: en el mismo cuadrante —el tamaño en que dos se ponen a conversar—; la casa, por dentro, es aparte
      juntos(a, b, dentro = {}){ const la = quien(a)?.lugar, lb = quien(b)?.lugar; if (G.lugares[la]?.celda || G.lugares[lb]?.celda) return la === lb;
        const x = this.vista(a), y = this.vista(b); return x != null && (x === y || dentro[x] === y || dentro[y] === x); },
      guardar: () => JSON.stringify(E),
    };
  }
  Mundo.cargar = (G, json) => Mundo(G, JSON.parse(json));
  // (la geografía: en node, de tools/mundo/geografia.json; en una página, viene en GEOGRAFIA)
  let GEO = null;
  Mundo.geografia = function (){
    if (GEO) return GEO;
    if (!enNode) return (GEO = raiz.GEOGRAFIA);
    const fs = require('fs'), path = require('path'), ARCHIVO = path.join(__dirname, 'geografia.json');
    if (!fs.existsSync(ARCHIVO)) throw new Error('falta tools/mundo/geografia.json: node tools/mundo/exportar.js');
    GEO = JSON.parse(fs.readFileSync(ARCHIVO, 'utf8'));
    // (si el mapa o los caminos cambiaron desde que se exportó, las distancias pueden estar viejas: se avisa, una vez)
    try { if (require('./huella.js').huella() !== GEO.huella) console.warn('[mundo] el mapa o los caminos cambiaron desde que se exportó la geografía: node tools/build.js && node tools/mundo/exportar.js'); } catch (e) {}
    return GEO;
  };
  if (enNode) module.exports = { Mundo };
  else raiz.Mundo = Mundo;
})(this);
