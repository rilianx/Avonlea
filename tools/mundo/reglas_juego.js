// Las reglas del juego, para el mundo (tools/mundo/mundo.js): qué puede hacer cada uno, y qué cambia cuando lo hace. Son
// las del planificador del juego (src/js/58-fichas-y-planificador.js: «verbs»), cargado sin navegador
// (tools/mundo/sin_navegador.js). El mundo y el planificador miran el mismo estado; solo lo llaman distinto:
//   mundo                         planificador (wmNow)
//   persona.lugar (un lugar)      pos: su clave (la cocina, «h:rl»…); un lugar que no tiene clave —el patio de Tejas
//                                 Verdes, la orilla—, «donde está» (p:ana), con su cuerpo puesto ahí en el mapa del juego
//   cosas[persona] · persona.sabe invs · know (las cosas de cada uno: las mismas que usan las vidas)
//   persona.sigue                 follow
//   cariño · ofensas · hechos     rel · ofensa · facts
//   vacas · existencias · enfermos   cows · stock · sick
// Lo que el juego sabe y el mundo todavía no (quién más hay en Avonlea, qué tiene cada uno, cuánto se quieren), el
// mundo lo toma del juego la primera vez (incorporar), a la hora del mundo.
const { cargarJuego } = require('./sin_navegador.js');

function ReglasJuego(W){
  const G = W.G, J = cargarJuego();
  // (adentro del juego: el planificador, sobre un estado que viene de afuera)
  const R = J.ev(`(() => {
    const TIPOS = [undefined, ...new Set([...verbs.toString().matchAll(/C\\.kind === '([a-z_]+)'/g)].map(m => m[1]))];
    const hora = t => { dayT = Math.floor(t / 1440) + (t % 1440 / 60 - 6) / 24 + 1e-7; };
    // (los que están «donde están»: su cuerpo, en ese punto del mapa del juego)
    const cuerpos = C => { for (const [k, [x, y]] of Object.entries(C)) { const b = wmBody(k); if (b) { if (k === 'ana') { game.scene = 'out'; } else b.where = 'out'; b.x = x; b.y = y; } } };
    const contexto = s => { const places = new Set([...Object.keys(WP).filter(p => !WP_CAMINO[p]), 'cocina', 'pieza', ...Object.keys(HOUSES).map(h => 'h:' + h), ...Object.values(s.pos).filter(Boolean)]);
      const pts = {}; for (const p of places) { const q = keyPoint(p); if (q) pts[p] = q; }
      return { places: [...places].filter(p => pts[p]), pts, people: WM_PEOPLE().filter(k => s.pos[k]), items: Object.keys(THINGS), favors: [], owner: Object.fromEntries(Object.keys(s.cows).map(c => [c, ANIM[c]?.owner || ANIMALS[c]?.owner])), sale: true }; };
    // (todo lo que puede hacer ahora: los verbos de cada tipo de meta —cada meta mira solo los suyos—, sin repetir; ir, al final)
    const lista = (s, me) => { const C = contexto(s), vistas = new Map();
      for (const kind of TIPOS) for (const a of verbs(s, me, { ...C, kind })) { const txt = stepText(a); if (!vistas.has(txt)) vistas.set(txt, a); }
      return [...vistas.entries()].map(([txt, a]) => ({ txt, a })).sort((x, y) => (x.a.v === 'ir') - (y.a.v === 'ir')); };
    return {
      // el estado del juego a esa hora, para lo que el mundo no sabe
      foto(t){ hora(t); const s = wmNow(), cuerpos = {}; for (const k of Object.keys(s.pos)) { const b = wmBody(k); if (b) cuerpos[k] = [Math.round(b.x), Math.round(b.y)]; }
        return JSON.stringify({ s, cuerpos, nombres: Object.fromEntries(Object.keys(s.pos).map(k => [k, wmName(k)])) }); },
      lista(sj, me, C){ const s = JSON.parse(sj); cuerpos(C); hora(s.t); return JSON.stringify(lista(s, me).map(o => ({ txt: o.txt, v: o.a.v, p: o.a.p, min: Math.round(o.a.cost) }))); },
      hacer(sj, me, i, C){ const s = JSON.parse(sj); cuerpos(C); hora(s.t); const o = lista(s, me)[i]; if (!o) return JSON.stringify({ error: 'no hay acción ' + (i + 1) });
        o.a.eff(s); return JSON.stringify({ txt: o.txt, v: o.a.v, p: o.a.p, min: Math.round(o.a.cost), s }); },
      plan(sj, me, meta, args, C){ const s0 = JSON.parse(sj); cuerpos(C); hora(s0.t);
        if (!G[meta]) return JSON.stringify({ error: 'el planificador no tiene la meta «' + meta + '»' });
        const g = { ...G[meta](...args), sale: true }, P = wmPlan(me, g, [], s0);
        if (!P.plan) return JSON.stringify({ meta: g.text, ok: false, n: P.n });
        const s = clone(s0), pasos = []; for (const a of P.plan) { const h = s.t; a.eff(s); s.t += a.cost; pasos.push(fmtHour(h / 60) + '  ' + stepText(a) + ' (' + Math.round(a.cost) + ' min)'); }
        return JSON.stringify({ meta: g.text, ok: P.ok && g.test(s), pasos, fin: fmtHour(s.t / 60), n: P.n }); },
      metas: () => Object.keys(G).join(', '),
      nombre: k => wmName(k),
    };
  })()`);

  // (un lugar del mundo, como el planificador lo llama; y su punto en el mapa del juego, para «donde está»)
  const punto = l => { const P = G.puntos[l] || []; const m = P.find(p => p.mapa); return m ? m.mapa : P[0]?.camino ? G.dibujo.puertas[P[0].camino] : null; };
  // (una clave del planificador, como lugar del mundo: la misma, o donde está esa persona)
  const lugarDeClave = k => (k == null ? null : G.lugares[k] ? k : k.startsWith('p:') ? W.E.personas[k.slice(2)]?.lugar ?? null : null);
  // (el lugar del mundo más cerca de un punto del mapa del juego: para quien el juego tiene «donde está»)
  function cercano([x, y]){ let mejor = null, d0 = Infinity; for (const l of Object.keys(G.lugares)) { const p = punto(l); if (!p || !G.puntos[l].some(q => q.mapa)) continue; const d = Math.hypot(p[0] - x, p[1] - y); if (d < d0) { d0 = d; mejor = l; } } return mejor; }

  function alPlanificador(){
    const E = W.E, pos = {}, invs = {}, know = {}, follow = {}, C = {};
    for (const [k, p] of Object.entries(E.personas)) {
      const l = p.viaje ? p.viaje.de : p.lugar; if (l == null) continue;
      const clave = G.lugares[l]?.plan; pos[k] = clave || 'p:' + k; if (!clave) { const q = punto(l); if (q) C[k] = q; }
      invs[k] = { ...(E.cosas[k] || {}) }; know[k] = [...p.sabe]; if (p.sigue && p.sigue !== 'nadie') follow[k] = p.sigue;
    }
    return { s: { t: E.t % 1440, pos, invs, cows: { ...E.vacas }, rel: { ...E.cariño }, ofensa: { ...E.ofensas }, know, follow, facts: { ...E.hechos }, stock: { ...E.existencias }, sick: [...E.enfermos] }, C };
  }
  // lo que cambió en el estado del planificador, en el mundo: las cosas, lo que saben, el cariño, los hechos… y quien
  // tiene que ir a otro lugar, va (el mundo le cuenta el tiempo del camino)
  function delPlanificador(s, antes){
    const E = W.E;
    for (const [k, inv] of Object.entries(s.invs)) if (E.personas[k]) E.cosas[k] = { ...inv };
    for (const [k, sa] of Object.entries(s.know)) if (E.personas[k]) E.personas[k].sabe = [...sa];
    for (const k of Object.keys(E.personas)) { const f = s.follow[k] || 'nadie'; if (E.personas[k].sigue !== f && (antes.follow[k] || 'nadie') !== f) E.personas[k].sigue = f; }
    Object.assign(E.cariño, s.rel); E.ofensas = { ...s.ofensa }; Object.assign(E.hechos, s.facts); E.vacas = { ...s.cows }; E.existencias = { ...s.stock }; E.enfermos = [...(s.sick || [])];
    for (const [k, p] of Object.entries(s.pos)) if (p !== antes.pos[k] && E.personas[k]) { const l = lugarDeClave(p); if (l && l !== E.personas[k].lugar) W.ir(k, l); }
  }
  // lo que el mundo no sabe todavía, del juego: quién más hay, qué tiene cada uno, cuánto se quieren, las vacas…
  function incorporar(){
    const { s, cuerpos, nombres } = JSON.parse(R.foto(W.E.t)), E = W.E;
    for (const [k, p] of Object.entries(s.pos)) {
      if (p == null) continue;
      const o = W.persona(k); o.nombre ||= nombres[k];
      if (o.lugar == null) o.lugar = lugarDeClave(p) || (cuerpos[k] ? cercano(cuerpos[k]) : null);
      if (!Object.keys(W.cosasDe(k)).length) Object.assign(W.cosasDe(k), s.invs[k] || {});
      if (!o.sabe.length) o.sabe = [...(s.know[k] || [])];
    }
    for (const [r, n] of Object.entries(s.rel)) if (!(r in E.cariño)) E.cariño[r] = n;
    for (const [f, v] of Object.entries(s.facts)) if (!(f in E.hechos)) E.hechos[f] = v;
    if (!Object.keys(E.vacas).length) E.vacas = { ...s.cows };
    if (!Object.keys(E.existencias).length) E.existencias = { ...s.stock };
    if (!Object.keys(E.ofensas).length) E.ofensas = { ...s.ofensa };
  }
  incorporar();
  return {
    incorporar,
    // lo que puede hacer alguien ahora: [{ txt, v, min, a (adónde, si es ir) }]
    acciones(k){ const { s, C } = alPlanificador(); return JSON.parse(R.lista(JSON.stringify(s), k, C)).map(o => ({ ...o, a: lugarDeClave(o.p) })); },
    // hacerla: ir es un viaje (el mundo lo cuenta); lo demás, su efecto ahora, y la persona ocupada lo que dura
    hacer(k, i){
      const p = W.persona(k);
      if (p.ocupado) return { error: `${p.nombre || k} está ocupada hasta las ${hhmm(p.ocupado.hasta)}: ${p.ocupado.que}` };
      if (p.viaje) return { error: `${p.nombre || k} va de camino a ${W.nombre(p.viaje.a)}` };
      const { s, C } = alPlanificador(), r = JSON.parse(R.hacer(JSON.stringify(s), k, i, C)); if (r.error) return r;
      const antes = JSON.parse(JSON.stringify(W.E));
      if (r.v === 'ir') { const l = lugarDeClave(r.p); if (l) W.ir(k, l); r.s.pos[k] = s.pos[k]; }   // (el viaje, del mundo: que no se cuente dos veces)
      delPlanificador(r.s, s);
      if (r.v !== 'ir') W.ocupar(k, r.txt, r.min);
      return { txt: r.txt, min: r.v === 'ir' ? Math.round((p.viaje?.llega ?? W.E.t) - W.E.t) : r.min, cambios: cambios(antes, W.E) };
    },
    plan(k, meta, args){ const { s, C } = alPlanificador(); return JSON.parse(R.plan(JSON.stringify(s), k, meta, args, C)); },
    metas: () => R.metas(),
    nombre: k => W.E.personas[k]?.nombre || R.nombre(k),
  };
  function hhmm(m){ return `${String(Math.floor((m % 1440) / 60)).padStart(2, '0')}:${String(Math.round(m % 60)).padStart(2, '0')}`; }
  // (lo que cambió en el mundo, en palabras)
  function cambios(A, B){
    const L = [], nom = k => B.personas[k]?.nombre || k;
    for (const [k, p] of Object.entries(B.personas)) {
      const q = A.personas[k] || { sabe: [] }, cq = A.cosas[k] || {}, cp = B.cosas[k] || {};
      if (p.viaje && !q.viaje) L.push(`${nom(k)} va ${W.al(p.viaje.a)}, llega a las ${hhmm(p.viaje.llega)}`);
      for (const x of new Set([...Object.keys(cq), ...Object.keys(cp)])) if ((cq[x] || 0) !== (cp[x] || 0)) L.push(`${nom(k)} tiene ${x}: ${cq[x] || 0} → ${cp[x] || 0}`);
      for (const f of p.sabe) if (!q.sabe.includes(f)) L.push(`${nom(k)} sabe: ${f}`);
      if (p.sigue !== q.sigue) L.push(`${nom(k)} sigue a ${p.sigue}`);
    }
    for (const [r, n] of Object.entries(B.cariño)) if (A.cariño[r] !== n) { const [a, b] = r.split('>'); L.push(`cómo quiere ${nom(a)} a ${nom(b)}: ${A.cariño[r]} → ${n}`); }
    for (const f of Object.keys(B.hechos)) if (!(f in A.hechos)) L.push('pasó: ' + f);
    for (const [c, v] of Object.entries(B.vacas)) if (A.vacas[c] !== v) L.push(`la vaca ${c}: ${A.vacas[c]} → ${v}`);
    return L;
  }
}
module.exports = { ReglasJuego };
