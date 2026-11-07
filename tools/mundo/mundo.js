// EL MUNDO: lo que hay y cómo está, sin dibujarlo. Un solo estado para todo (tools/mundo/LEEME.md):
//   lugares    la lista de tools/mundo/geografia.json (los del planificador del juego y los de las historias, juntos)
//   personas   cada una: dónde está (un lugar de la lista), en qué va, a quién sigue, qué tiene, qué sabe, si va de
//              camino (de dónde, adónde, a qué hora llega), y si está ocupada en algo (qué, hasta qué hora)
//   medios     la calesa: dónde está y si está enganchada
//   cariño     cuánto quiere cada uno a cada otro ('ana>marilla': -2..5, como en el juego)
//   hechos, ofensas, vacas, existencias (lo que hay para recoger), enfermos, estados (ana_en_tv…), cualidades
//   (la paciencia de Marilla…), y el reloj: minutos desde el comienzo del día 1
// Quienes lo usan, lo leen y lo cambian por aquí: las historias (el motor del lenguaje, por tools/mundo/mundo_minimo.js),
// las reglas del juego (lo que se puede hacer y qué cambia: tools/mundo/reglas_juego.js), la consola y la página.
// Es datos: se guarda y se carga entero (guardar / Mundo.cargar).
(function (raiz) {
  const enNode = typeof module !== 'undefined' && !!module.exports;
  // cómo va alguien: en calesa (si va en un medio), Ana a pie (más ligera), o a pie
  const modo = (q, en) => (en && en !== 'nada' ? 'calesa' : q === 'ana' ? 'ana' : 'pie');

  function Mundo(G, E = null){
    E = E || { t: 0, personas: {}, medios: { calesa: { lugar: null, listo: 'no' } }, cariño: {}, ofensas: {}, hechos: {}, vacas: {}, existencias: {}, enfermos: [], estados: {}, cualidades: {}, registro: [] };
    const nota = t => { E.registro.push({ t: E.t, txt: t }); if (E.registro.length > 400) E.registro.splice(0, 100); };
    const lugarId = l => (l == null ? l : G.lugares[l] ? l : G.alias[l] || l);   // (un lugar de las historias, como lo llama el mundo)
    const nombre = l => G.lugares[l]?.nombre || l;
    const a = l => ('a ' + nombre(l)).replace(/^a el /, 'al '), de = l => ('de ' + nombre(l)).replace(/^de el /, 'del ');   // (al granero, del granero)
    const persona = k => (E.personas[k] ||= { lugar: null, en: 'nada', sigue: 'nadie', cosas: {}, sabe: [], viaje: null });
    // (los minutos entre dos lugares, como se va: los medidos sobre el mapa; uno que no está: 10, y se avisa)
    function minutos(a, b, como = 'pie'){
      a = lugarId(a); b = lugarId(b); if (a === b || a == null || b == null) return 0;
      const m = G.minutos[a]?.[b]; if (m) return Math.max(1, m[como]);
      if (!minutos.avisado?.[a + '>' + b]) { (minutos.avisado ||= {})[a + '>' + b] = 1; console.warn(`[mundo] no sé cuánto hay de «${a}» a «${b}»: 10 min`); }
      return 10;
    }
    // quiénes van con alguien: los que van en su medio (y el medio), y los que lo siguen a pie
    const conEl = k => { const p = persona(k), L = []; if (p.en !== 'nada') { L.push(p.en); for (const [q, o] of Object.entries(E.personas)) if (q !== k && o.en === p.en) L.push(q); }
      for (const [q, o] of Object.entries(E.personas)) if (q !== k && o.sigue === k && o.en === 'nada') L.push(q); return L; };
    const quien = k => E.personas[k] || E.medios[k];
    // ir a un lugar: llega cuando le toca (y los que van con él, con él). minutos: lo que dura, si se sabe (lo que le
    // quedaba a un viaje detenido)
    function ir(k, a, o = {}){
      const p = persona(k), de = p.lugar, de_ = l => (l == null ? '' : ('de ' + nombre(l)).replace(/^de el /, 'del ')), a_ = l => ('a ' + nombre(l)).replace(/^a el /, 'al '); a = lugarId(a);
      const como = modo(k, p.en), m = o.minutos ?? minutos(de, a, como), v = { de, a, sale: E.t, llega: E.t + m, como };
      for (const q of [k, ...conEl(k)]) { const x = quien(q); x.viaje = { ...v }; }
      if (m > 0) nota(`${k} va ${de_(de)} ${a_(a)} (${como}, ${Math.round(m)} min)`);
      else avanzarHasta(E.t);
      return v.llega;
    }
    // detenerse a mitad de camino: se queda donde salió (el mundo no tiene «medio camino»: está en un lugar o va a otro)
    function parar(k){ const v = persona(k).viaje; if (!v) return 0; const resta = v.llega - E.t; for (const q of [k, ...conEl(k)]) { const x = quien(q); if (x.viaje) x.viaje = null; } nota(`${k} se detiene`); return resta; }
    // el reloj: lo que pasa hasta esa hora (los que llegan, llegan)
    function avanzarHasta(t){
      for (;;) {   // (en orden: quien llega, quien termina lo que hacía)
        let prox = null; const ver = (k, x, cuando, que) => { if (cuando <= t && (!prox || cuando < prox.cuando)) prox = { k, x, cuando, que }; };
        for (const L of [E.personas, E.medios]) for (const [k, x] of Object.entries(L)) { if (x.viaje) ver(k, x, x.viaje.llega, 'llega'); if (x.ocupado) ver(k, x, x.ocupado.hasta, 'termina'); }
        if (!prox) break;
        const { k, x, cuando, que } = prox; E.t = Math.max(E.t, cuando);
        if (que === 'llega') { x.lugar = x.viaje.a; x.viaje = null; nota(`${k} llega ${a(x.lugar)}`); } else { nota(`${k} termina: ${x.ocupado.que}`); x.ocupado = null; }
      }
      E.t = Math.max(E.t, t);
    }
    // (lo próximo que pasa: alguien que llega, o que termina lo que hacía)
    const proximo = () => { let m = Infinity; for (const L of [E.personas, E.medios]) for (const x of Object.values(L)) { if (x.viaje) m = Math.min(m, x.viaje.llega); if (x.ocupado) m = Math.min(m, x.ocupado.hasta); } return m; };
    return {
      E, G, nombre, al: a, del: de, lugarId, persona, minutos, ir, parar, avanzarHasta, proximo, nota,
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
      ocupar(k, que, min){ persona(k).ocupado = { que, hasta: E.t + min }; nota(`${k}: ${que} (${Math.round(min)} min)`); },
      // dos en el mismo lugar (o uno dentro del otro, para las historias: el corral es de Tejas Verdes)
      juntos(a, b, dentro = {}){ const x = this.vista(a), y = this.vista(b); return x != null && (x === y || dentro[x] === y || dentro[y] === x); },
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
