/* ---------- the language of the stories, in the game (docs/LENGUAJE.md): the stories that have moved to the language
   run in its engine (tools/lenguaje/motor.js, with the data of docs/lenguaje/, built into src/datos/lenguaje.json by
   tools/lenguaje/construir.js), and the game is its world: where everyone is (a place of the language, from where they
   are in the game), who sees whom, and how what is said is said (a bubble, a card, the menu, the box to write a name).
   The verbs that move people are done with what the game has: going somewhere is a goal for the planner (estar_en: it
   finds the way, the eight miles of the road included, and whoever rides along goes too); getting into the buggy is
   riding with whoever drives it (as the planner's subir_calesa does); what someone is asked to do («Subir a la
   calesa») is the player's to answer, in the menu.
   For now:
   - the Camino Blanco de las Delicias (historias/camino_blanco), what happens each time Ana goes through the Avenue
     (its scenes take the place of avenida, newbridge, silencio_*, nombra_avenida);
   - the arrival (historias/llegada): from the station, Matthew asks Ana to get into the buggy and takes her to Green
     Gables (the errand «trae», instead of the script's goal «llevar ana,cocina»). The talk on the road and the arrival
     at Green Gables are still the game's (by stretch, src/js/21; the script's tejas_verdes and llegada, with the
     chapter's machinery, src/js/20): those scenes of the language are left out here (LG_OMITIR);
   - White Sands (historias/white_sands), when Marilla still has patience: she fetches Ana if she is far, harnesses
     the mare in the yard, asks her to get in, and drives her by the shore road (Mrs. Pye, the shore, Mrs. Spencer)
     and back. Without patience, the doubt is still the script's (viaje_spencer_duda and what follows: told at home).
   What the engine does in its own state, the game does in its own too (efecto): facts, states, Marilla's patience and
   fondness, the journal, the points to go back to.
   The engine's game is kept with the game's (save, «lenguaje»), and goes on where it was. ---------- */
/*@motor_lenguaje*/
const LENGUAJE = /*@lenguaje*/null;
const LG_HISTORIAS = ['camino_blanco', 'llegada', 'white_sands'];   // (the ones that run here: the others are still in the script)
const LG_OMITIR = ['llegada.ll_pelo', 'llegada.ll_angelical', 'llegada.ll_llegan', 'white_sands.viaje_spencer_duda', 'white_sands.ws_spencer_duda'];   // (what the game does its own way)
const LG_ESCENARIO = { historias: LG_HISTORIAS, omitir: LG_OMITIR };
// the language's places, as the planner's (where it can take someone): the rest are only known as they are passed
const LG_PLAN = { estacion_bright_river: 'h:br', tejas_verdes: 'cocina', cocina: 'cocina', corral: 'corral', estanque_barry: 'lago', aldea: 'aldea', escuela: 'escuela', hotel_white_sands: 'hotel_ws', playa: 'playa_ws' };
// (out of doors, the places of the language around a point of the map, and how far: the places by the shore road too)
const LG_ZONAS = [['hotel_white_sands', () => WP.hotel_ws, 250], ['playa', () => WP.playa_ws, 200], ['hondonada_lynde', () => dlgLugar('hondonada'), 450], ['escuela', () => SCHOOL_DOOR, 650], ['aldea', () => dlgLugar('aldea'), 550]];
// (the state of the world that is the game's own, not the engine's: who runs where, the journeys, the parked buggy, who
// is held still while a scene is said, the townsfolk an errand put somewhere)
const LG = { M: null, talk: null, narra: null, u: null, menu: false, corriendo: {}, viajes: {}, sujetos: [], gente: new Set() };
// the engine's clock: minutes since the start of day 1, at midnight (dayT 0 is dawn, at six)
const lgAhora = () => dayT * 1440 + 360;
// where someone is, as a place of the language (or the game's own name for it, if the language has none)
function lgLugarDe(k){
  const b = wmBody(k); if (!b) return null;
  const sc = dlgEscena(k);
  if (sc === 'camino') { const tr = roadTramo((k === 'ana' ? ana.roadS : b.roadS) ?? 0); return tr.kind === 'avenida' ? 'camino_blanco' : tr.name === 'Newbridge' ? 'newbridge' : 'camino_bright_river'; }
  if (sc === 'br') return 'estacion_bright_river';
  if (sc === 'out') {
    { const A = AREAS.corral; if (A && b.x > A.x - 90 && b.x < A.x + A.w + 90 && b.y > A.y - 90 && b.y < A.y + A.h + 90) return 'corral'; }   // (by its fence, too: the buggy waits there)
    if (dist(b.x, b.y, GG.x, GG.y) < 400) return 'tejas_verdes';   // (the Camino Blanco starts at its door: the yard is the house's)
    { const o = orillaCerca(b.x, b.y); if (o && o.d < 70) return 'orilla'; }   // (the sand by the water: not the road, which runs near it; before the beach, around it)
    for (const [l, p, r] of LG_ZONAS) { const P = p(); if (P && dist(b.x, b.y, P[0], P[1]) < r) return l; }
    const R = ROADS.blanco; if (R && R.some((p, i) => i && segDist(b.x, b.y, R[i - 1], p) < 90)) return 'camino_blanco';
    if (PLACES.lago && dist(b.x, b.y, PLACES.lago[1], PLACES.lago[2]) < 260) return 'estanque_barry';
    return 'avonlea';
  }
  return sc === 'gg' ? 'cocina' : sc;   // (in a house: its room)
}
// who sees and hears whom: in the same room; or out of doors, close and in the same place (or one within the other: the
// yard and the pen) —as the language says it, «in the same place»—; and not one who runs off (crying, to the sea)
const lgMismo = (a, b) => { const x = LG.corriendo[a] || lgLugarDe(a), y = LG.corriendo[b] || lgLugarDe(b), L = LENGUAJE.lugares; return x === y || L[x]?.dentro === y || L[y]?.dentro === x; };
const lgJuntos = (a, b) => { const A = wmBody(a), B = wmBody(b), sc = dlgEscena(a); return !!A && !!B && sc === dlgEscena(b) && !LG.corriendo[a] && !LG.corriendo[b] && (!['out', 'camino'].includes(sc) || (d => d < 120 || (d < 260 && lgMismo(a, b)))(dist(A.x, A.y, B.x, B.y))); };   // (side by side, always)
// the nearest point of the shore (on the sand, a little before the water), and how far
function orillaCerca(x, y){ let best = null; for (let i = 1; i < COAST.length; i++) { const p = proj([x, y], COAST[i - 1], COAST[i]); if (!best || p.d < best.d) best = p; } return best; }
// who drives the buggy (the one who has it), and whether someone rides in it
const lgCochero = () => Object.keys(PEOPLE).find(k => PEOPLE[k].buggy && ['out', 'camino', 'br'].includes(PEOPLE[k].where));
// who takes Ana in the buggy: whoever has it; or whoever has an errand and is with her (Marilla, about to get up)
const lgConductor = () => lgCochero() || LG.M.ocupados().find(k => k !== 'ana' && lgJuntos('ana', k)) || 'matthew';
function lgEn(k){
  if (k !== 'ana') return wmBody(k)?.buggy ? 'calesa' : 'nada';
  // (riding with the driver: while he takes her —when he gets down at home and goes in, she is still with him—)
  const A = AGENTS.ana, d = A?.ride && !!A.followOf;
  return (game.scene === 'camino' ? ana.onCart && !!game.road?.with : d) ? 'calesa' : 'nada';
}
// a place of the language, as a place of the planner: its own; or, out of doors, where someone is (to go to her: Ana by
// the sea)
const lgDestino = (l, quien) => LG_PLAN[l] || (k => k && 'p:' + k)(Object.keys(LENGUAJE.personas).find(k => k !== quien && dlgEscena(k) === 'out' && (LG.corriendo[k] || lgLugarDe(k)) === l));
// a verb of the language that moves someone: a goal for the planner (and whoever rides with them, goes too). On a
// journey (a «por cada» of stops: the shore road), one goal to its end; each stop is done when it is passed
function lgIr(acc){
  const v = LG.viajes[acc.quien], destino = acc.destino || acc.a;
  if (v && v.hasta === destino) { const g = AGENTS[acc.quien]?.goals.find(g => g.seq === v.seq); if (g?.st === 'run') { acc.seq = v.seq; return; } }   // (the journey's goal, already on its way)
  const key = lgDestino(destino, acc.quien); if (key?.startsWith('p:')) acc.persona = key.slice(2); if (!key) { console.warn('[avonlea] lenguaje: el planificador no conoce «' + destino + '»'); acc.hecho = true; return; }
  const g = agentStart(acc.quien, { ...G.estar_en(acc.quien, key), sale: true, text: `${wmName(acc.quien)} va a ${WP_NAME[key] || wmPlaceText(key)}` }, { label: `ir a ${WP_NAME[key] || wmPlaceText(key)} (${acc.verbo}, del lenguaje)`, prio: 3 });
  if (g) { acc.seq = g.seq; if (v && v.hasta === destino) v.seq = g.seq; }
  else if ((acc.intentos = (acc.intentos || 0) + 1) > 20) { console.warn('[avonlea] lenguaje: ' + acc.quien + ' no puede ir a «' + destino + '»'); acc.hecho = true; }   // (the planner did not take it: again, a while)
}
// (going somewhere with someone after one, on foot: one has not arrived until both have)
const lgSiguen = acc => Object.keys(LENGUAJE.personas).every(f => AGENTS[f]?.followOf !== acc.quien || AGENTS[f].ride || lgEsta(f, acc.destino || acc.a) || lgJuntos(f, acc.quien));
// (to the kitchen —home—: the planner counts the doorstep as the kitchen; one goes in, as anyone who reaches a door)
function lgAdentro(acc){
  const q = acc.quien, b = wmBody(q); if (lgDestino(acc.destino || acc.a, q) !== 'cocina' || !b || q === 'ana' || dlgEscena(q) !== 'out') return true;
  if (dist(b.x, b.y, DOOR.gg[0], DOOR.gg[1]) < 260) { wmEnter(q, 'gg'); return true; }
  return false;
}
function lgSoltar(acc){ const ag = AGENTS[acc.quien], g = ag?.goals.find(g => g.seq === acc.seq); if (g?.st === 'run') goalEnd(ag, g, 'done', 'el lenguaje: llegó'); }
const lgEsta = (q, l) => { const x = LG.corriendo[q] || lgLugarDe(q); return x === l || LENGUAJE.lugares[x]?.dentro === l; };
// (a stop of a journey is done when it is passed; or when one further on is: the road may not go right by its door)
// (to someone —Ana by the sea—: beside her)
const lgLlego = acc => { const v = LG.viajes[acc.quien], A = acc.persona && wmBody(acc.quien), B = acc.persona && wmBody(acc.persona);
  if (acc.persona) return !!A && !!B && !LG.corriendo[acc.persona] && dlgEscena(acc.quien) === dlgEscena(acc.persona) && dist(A.x, A.y, B.x, B.y) < 90;   // (once she has stopped running; only so: «the same place» may be anywhere)
  return lgEsta(acc.quien, acc.destino || acc.a) || (acc.dePaso && !!v && v.paradas.slice(v.paradas.indexOf(acc.a)).some(p => v.pasados.has(p)));
};
// someone of the village an errand puts somewhere (Mrs. Pye on the road): there, as the game does with them; and still
// until the errand is over
function lgPoner(k, l){
  const f = FOLKBY[k], P = WP[LG_PLAN[l]] || dlgLugar(l); if (!f || !P) return;
  lgTraer(k);
  Object.assign(f, { where: 'out', x: P[0] + 30, y: P[1] + 12, route: [], moving: false, sit: false, dir: 3, talkT: TT + 1e6 }); LG.gente.add(k); (LG.esperan ||= {})[k] = l;
}
// (the townsfolk a story brings somewhere: where they were is kept, and they go back there when it is over —into the
// hotel, home—, not to stand in the road)
function lgTraer(k){ const f = FOLKBY[k]; if (f && !(LG.antes ||= {})[k]) LG.antes[k] = { where: f.where, x: f.x, y: f.y }; }
function lgDevolver(k){ const f = FOLKBY[k], a = LG.antes?.[k]; if (!f) return; f.talkT = TT + 1; if (a) { Object.assign(f, a, { route: [], moving: false }); delete LG.antes[k]; } }
// Ana runs (a verb said in a scene, at once: «<<correr_a('ana', 'orilla')>>»): off the buggy, and away; to the sea, the
// nearest shore. Until she gets there, she is where she runs to (for the engine: she is gone)
function lgCorrer(acc){
  const q = acc.quien; if (q !== 'ana') return;
  const A = AGENTS.ana; if (A) { A.followOf = null; A.ride = false; } ana.sit = false;
  let x, y; if (acc.a === 'orilla') { const o = orillaCerca(ana.x, ana.y), d = o ? Math.max(1, o.d) : 1; x = o ? o.x + (ana.x - o.x) / d * 40 : ana.x; y = o ? o.y + (ana.y - o.y) / d * 40 : ana.y; dlgDichas().playa_1 = true; }   // (her first time by the sea is this one)
  else { const P = keyPoint(lgDestino(acc.a, q) || '') || [ana.x, ana.y]; [x, y] = P; }
  LG.corriendo[q] = acc.a; LG.corre = [x, y]; LG.api?.llega(q, acc.a);
  if (navigator.webdriver) { ana.x = x; ana.y = y; } else anaIrDespues({ x, y, scene: 'out', corre: true });   // (the arrival: lgMundo sees it)
}
// the buggy left where its driver got down, away from home (the cart, standing; she walks)
function lgAparcar(k){ const b = wmBody(k); Object.assign(cart, { on: true, riding: false, moving: false, ruta: [[b.x, b.y], [b.x + 1, b.y]], len: 1, s: 0, con: k, suelto: true, parado: true, vel: 0, viaje: { aviso: '', subir(){} } }); [cart.x, cart.y] = [b.x, b.y]; LG.aparcada = k; }
// the world of the game, for the engine (the interface: tools/lenguaje/mundo_simulado.js)
function MundoJuego(api){
  if (api) LG.api = api;   // (to tell the engine at once: where someone runs to)
  return {
    funciones: { ve: lgJuntos, oye: lgJuntos, sola: p => !(p === 'ana' && diana.follow) && !Object.keys(PEOPLE).some(q => q !== p && lgJuntos(p, q)) },
    minutos: () => 10,
    // (a journey by a route: its stops, in order; the game remembers where it ends, to go there at once, and the stops
    // it passes on the way)
    tramo(por, desde, hasta, quien){
      const r = LENGUAJE.rutas[por], en = x => (r.includes(x) ? x : LENGUAJE.lugares[x]?.dentro || LENGUAJE.lugares[x]?.cerca);
      const i = r.indexOf(en(desde)), j = r.indexOf(hasta), paradas = i <= j ? r.slice(i + 1, j + 1) : r.slice(j, i).reverse();
      if (quien) LG.viajes[quien] = { hasta, paradas, pasados: new Set() };
      return paradas;
    },
    empezar(acc){
      if (acc.mapa) {
        if (acc.ya) { lgCorrer(acc); acc.hecho = true; return; }
        if (!PEOPLE[acc.quien] && FOLKBY[acc.quien]) { lgPoner(acc.quien, acc.a); acc.hecho = true; return; }   // (the townsfolk: there)
        const v = LG.viajes[acc.quien]; if (acc.de_paso && v && v.paradas.includes(acc.a)) { acc.destino = v.hasta; acc.dePaso = acc.a !== v.hasta; }   // (a stop of the journey: the engine says so)
        if ((acc.dePaso || acc.persona) && lgLlego(acc)) acc.hecho = true; else lgIr(acc);   // (to a place: the planner says when —the yard is not yet the kitchen—)
        return;
      }
      if (acc.verbo) { lgHacer(acc); acc.fin = lgAhora() + (acc.ya ? 0 : acc.dura || 0); return; }
      if (acc.decir) {
        const { q, t, piensa } = acc.decir;
        if (q === 'narra') {   // (a card, until it is read: the game's, on a talk of its own, so that closing it does not end the scene's)
          const tmp = {}; narrar(tmp, t); if (tmp.narra) { LG.narra = tmp; acc.narra = true; } else acc.hecho = true; return;
        }
        sayB(talkQ(q), (piensa ? '~' : '') + t); acc.fin = lgAhora() + (lineDur(t) + .35) / MIN_S;
        if (typeof relatoLinea === 'function' && RELATO.on) relatoLinea(`${wmName(q)}${piensa ? ' (piensa)' : ''}: ${t}`, { quien: q, dice: t });
        return;
      }
      LG.callados = !!acc.silencio;   // (while no one speaks, the mare goes at her pace)
      if (acc.silencio) { acc.fin = lgAhora() + acc.dura; return; }
      if (acc.nombrar) {   // (the book's name; or the player writes one)
        const listo = n => { nombrar(acc.nombrar, n); acc.nombre = nombreDe(acc.nombrar); acc.hecho = true; };
        if (acc.pedir && !navigator.webdriver && !ana.hidden && !ANA_AUTO) pedirNombre(acc.nombrar, listo); else listo();
        return;
      }
      acc.hecho = true;
    },
    listo(acc){
      if (acc.hecho) return acc.mapa ? lgSiguen(acc) : true;
      if (acc.seq != null || acc.destino) {
        // (a stop on the way: when it is passed; to someone: beside her; to a place: when the planner's goal is over —not
        // at the gate: he drives on into the yard and the kitchen—; its goal lost —a game opened again—: already there, or
        // set again)
        if ((acc.dePaso || acc.persona) && lgLlego(acc)) return lgSiguen(acc);
        const g = AGENTS[acc.quien]?.goals.find(g => g.seq === acc.seq);
        if (g?.st === 'run' || acc.parado) return false;
        if (g && !acc.dePaso) return lgAdentro(acc) && lgSiguen(acc);
        if (lgLlego(acc)) return lgAdentro(acc) && lgSiguen(acc);
        lgIr(acc); return !!acc.hecho;
      }
      return acc.narra ? !LG.narra?.narra : acc.fin != null && lgAhora() >= acc.fin;
    },
    // (a step of the language that is over: its goal of the planner too, when it was going to someone —it may think
    // she is not there yet: she moved—)
    terminar(acc){ if (acc.seq != null && acc.persona) lgSoltar(acc); },   // (to someone: the planner may never see it done; to a place, it gets there itself)
    cancelar(acc){ if (acc.seq != null) lgSoltar(acc); },
    voz(q, t){ sayB(talkQ(q), t); },
    // (someone with an errand of a story is busy, as with a goal of the planner: their routine waits)
    // (who has an errand is busy: lgOcupado, from the engine's errands themselves; the townsfolk it put somewhere, go)
    encargo(m, q){ if (m === 'termina' && LG.gente.has(q)) { LG.gente.delete(q); delete LG.esperan?.[q]; lgDevolver(q); } },
    cuando: () => lgAhora() + .25,
    // (stopped while what broke is mended —Ana ran to the sea—: the goal is left, and set again afterwards)
    parar(acc){ const ag = AGENTS[acc.quien], g = ag?.goals.find(g => g.seq === acc.seq); if (g?.st === 'run') goalEnd(ag, g, 'fail', 'se detuvo'); acc.parado = true; delete acc.seq; },
    seguir(acc){ acc.parado = false; },
    historia(m, h){ const p = m === 'termina' && LENGUAJE.historias[h]?.punto; if (p) { const [id, t] = p.split('|').map(x => x.trim()); puntoGuardar(id, t); } },
    // a scene that cuts in: the game's own talk on the road, if there is one, is cut (and the loose line of a moment ago)
    cortar(){
      const ts = TALKS.filter(t => t !== LG.talk && (t.ch === 'viaje' || !t.ch)); if (!ts.length && !amb.cur) return false;
      for (const t of ts) { t.interrupted = true; talkEnd(t); }
      if (amb.cur) ambEnd(); bubbles = [];
      return ts.length > 0;
    },
    // while an engine's scene is said, it holds the road's channel (the game's talks wait); one of the game's, more
    // important, can still cut it (lenguajeTick sees it)
    escena(m, id){
      if (m === 'empieza') {
        const E = D_ESC(id), corto = id.split('.')[1];
        if (E.punto) { const [pid, t] = E.punto.split('|').map(x => x.trim()); puntoGuardar(pid, t); }   // (a point to go back to: before it)
        LG.talk = { ch: 'viaje', lines: [], i: -1, wait: 1e9, el: 0, hold: [], lenguaje: id, esc: corto }; TALKS.push(LG.talk);
        // (those who speak in it, and are of the village, come where it is: Mrs. Spencer and Mrs. Blewett at the door of
        // the hotel; and if it is not said on the way, they all stay still while it is said —the buggy too, if Ana speaks—)
        for (const [n, k] of E.hablan.entries()) if (!PEOPLE[k] && FOLKBY[k] && k !== 'narra' && !lgJuntos('ana', k) && !lgTraer(k)) Object.assign(FOLKBY[k], { where: 'out', x: ana.x + (n % 2 ? -40 : 40) * (1 + n / 2), y: ana.y + 30, route: [], moving: false, sit: false, dir: 2 });
        LG.sujetos = E.en_marcha ? [] : [...E.hablan.filter(k => k !== 'narra' && k !== 'ana'), ...(E.hablan.includes('ana') && AGENTS.ana?.ride && AGENTS.ana.followOf ? [AGENTS.ana.followOf] : [])];
        for (const k of LG.sujetos) if (PEOPLE[k]) CHAT_HOLD[k] = TT + 1e6; else if (FOLKBY[k]) FOLKBY[k].talkT = TT + 1e6;
        // (its card, as the game's talks have theirs: while it is read, the world waits —narraPausa—)
        Object.defineProperty(LG.talk, 'narra', { get: () => LG.narra?.narra || null, set: v => { if (LG.narra) LG.narra.narra = v; }, enumerable: true });
        dlgDichas()[id.split('.')[1]] = true;   // (for the script: «dicha:cb_libro»)
        if (D_ESC(id)?.interrumpe && GAME_SPEED > 1 && !navigator.webdriver) setSpeed(1);   // (something that matters: at its pace)
        logEv(D_ESC(id).resumen, []);
      } else {
        if (LG.talk) { const t = LG.talk; LG.talk = null; if (TALKS.includes(t)) talkEnd(t); }
        for (const k of LG.sujetos) if (PEOPLE[k]) delete CHAT_HOLD[k]; else if (FOLKBY[k] && !LG.gente.has(k)) lgDevolver(k);
        LG.sujetos = [];
      }
    },
    // (what the engine does in its state, the game does in its own: the script reads it, and it is kept)
    efecto(e){
      const c = e.camino || [];
      if (e.e === 'log') logEv(e.texto, []);
      else if (e.e === 'marca') cap1Mark(e.id);
      else if (e.e === 'deja' && c[0] === 'estado' && typeof e.valor === 'string') estadoPoner(c[1], e.valor);
      else if (e.e === 'deja' && c[1] === 'hechos') dlgHecho(c[2]);
      else if (e.e === 'olvida' && c[1] === 'hechos') delete dlgHechos()[c[2]];
      else if (e.e === 'suma' && c[0] === 'cualidad') cualidadSuma(c[1], c[2], e.n, c[3]);
    },
  };
}
const D_ESC = id => LENGUAJE.escenas[id];
MundoJuego.inicio = { lugares: { calesa: 'corral' } };   // (Marilla's buggy: in the yard, where it is kept)
// the primitive verbs, with the game's buggy: getting in is riding with whoever drives it (the planner takes the rider
// along, and on the road she sits beside him); getting off, walking again
function lgHacer(acc){
  const [q, x] = acc.args;
  switch (acc.verbo) {
    case 'subir':
      if (q !== 'ana') { const b = wmBody(q); if (b) b.buggy = true; if (LG.aparcada === q) { cart.on = false; cart.viaje = null; LG.aparcada = null; } break; }   // (the parked buggy: hers again)
      { const d = lgConductor(), A = agentOf('ana'); A.followOf = d; A.ride = true; ana.llora = false;   // (while he has the errand, he is «driven»: she stays with him)
        if (game.scene === 'camino' && game.road?.with === d) roadBoard(); logEv(`Ana subió a la calesa con ${wmName(d)}.`, []); }
      break;
    case 'bajar':
      if (q === 'ana') { const A = AGENTS.ana; if (A) { A.followOf = null; A.ride = false; } ana.sit = false; if (game.scene === 'camino' && ana.onCart) roadGetOff(); }
      else { const b = wmBody(q); if (b?.buggy && dlgEscena(q) === 'out') { b.buggy = false; if (!['tejas_verdes', 'corral'].includes(lgLugarDe(q))) lgAparcar(q); } }   // (away from home, the buggy stays there)
      break;
    case 'enganchar': { const b = wmBody(q); if (b) b.buggy = true; break; }
    case 'seguir': if (q === 'ana') { agentOf('ana').followOf = x; ana.sit = false; ana.llora = false; } break;
    case 'dejar_de_seguir': if (q === 'ana' && AGENTS.ana) AGENTS.ana.followOf = null; break;
    case 'tomar_de_la_mano': if (x === 'ana') { agentOf('ana').followOf = q; ana.sit = false; ana.llora = false; } break;   // (she goes along: walking after, as when she follows)
    case 'soltar': if (x === 'ana' && AGENTS.ana?.followOf === q) AGENTS.ana.followOf = null; break;
    default: if (acc.verbo !== 'esperar') console.warn('[avonlea] lenguaje: el juego todavía no hace «' + acc.verbo + '»');
  }
}
// the engine: the one kept with the game, or a new one
function lgEmpezar(){
  let g = null; try { g = JSON.parse(localStorage.getItem('avonlea') || 'null')?.lenguaje; } catch (e) {}
  try { if (g) LG.M = Motor.cargar(LENGUAJE, g, MundoJuego, LG_ESCENARIO); } catch (e) { console.warn('[avonlea] lenguaje: no se pudo cargar lo guardado', e); }
  if (!LG.M) LG.M = Motor(LENGUAJE, LG_ESCENARIO, MundoJuego);
  lgLugares(true); lgMundo();
  if (LG.M.estado().escena) MundoJuego().escena('empieza', LG.M.estado().escena.id);   // (a scene kept in the middle: it holds the channel again)
}
// a new game, or the chapter played again from the start: the engine too
function lgReiniciar(){ try { if (LG.talk && TALKS.includes(LG.talk)) talkEnd(LG.talk); LG.talk = null; LG.menu = false; LG.M = Motor(LENGUAJE, LG_ESCENARIO, MundoJuego); } catch (e) {} }
// someone busy with an errand of a story: as with a goal of the planner, they are «driven» (wmDriven): their routine
// waits, they stay where they are, and whoever rides with them stays with them; going somewhere is a goal of the
// planner, and then the planner moves them
function lgOcupado(k){ try { return !!LG.M && LG.M.ocupados().includes(k); } catch (e) { return false; } }
// on the trip to White Sands, by the sea or at Mrs. Spencer's: not the time for Ana's first-time lines about places
// (src/js/66-primeras-veces.js)
function lgSinLugares(){ try { return !!LG.M && LG.M.get(['historia', 'white_sands']) === 'en_curso' && ['orilla', 'playa', 'hotel_white_sands'].includes(LG.M.get(['mundo', 'ana', 'lugar'])); } catch (e) { return false; } }
// while a scene of the language is said on the way, the mare goes at a walk (as the trips of the game did: WS_PASO), so
// that what is said fits between the places it is said at
const LG_PASO = .7;
function lgPaso(k){ try { const id = LG.talk?.lenguaje, E = id && D_ESC(id); return E?.en_marcha && !LG.callados && (E.hablan.includes(k) || AGENTS.ana?.followOf === k) ? LG_PASO : 1; } catch (e) { return 1; } }
// what save() keeps (called from anywhere: before this file has run, nothing)
function lgGuardar(){ try { return LG.M ? LG.M.guardar() : undefined; } catch (e) { return undefined; } }
function lenguajeTick(){
  if (!LENGUAJE) return;
  if (!LG.M) lgEmpezar();
  const M = LG.M;
  // one of the game's scenes cut the engine's (it ended its talk)
  if (LG.talk && !TALKS.includes(LG.talk)) { LG.talk = null; M.cortarEscena(); }
  // where everyone is; what is due, up to the game's clock; then the rest of what changed in the world (seen next time:
  // what the engine's own verbs finished goes first —arriving home, then getting off, not the other way round—)
  lgLugares(false);
  M.alTiempo(lgAhora());
  lgMundo();
  // (and once more, with what the world just said: what a scene of the script left —the first trip on— starts its story
  // in this same moment, before the routines move anyone —Matthew, at the station—)
  const u = LG.u = M.alTiempo(lgAhora());
  if (u.escena?.ops && !LG.menu) lgOpciones(u.escena.ops);
  if (u.pregunta && !LG.menu) lgPregunta(u.pregunta);
}
// the world tells the engine how things are: where everyone is (arriving somewhere is a moment: «ana pasa
// camino_blanco»; at the start, where each one already was, is not), who rides in the buggy, how fond they are of each
// other, how Ana stands at Green Gables, and whether the first trip is on (the station's scene leaves it)
const lgPresentes = () => Object.keys(LENGUAJE.personas).filter(k => wmBody(k));
function lgLugares(inicio){
  const M = LG.M;
  for (const k of lgPresentes()) { const l = LG.corriendo[k] || lgLugarDe(k), antes = M.get(['mundo', k, 'lugar']); if (l && l !== antes) M.llega(k, l, inicio || antes == null); }   // (running there: for the engine, she is there)
}
function lgMundo(){
  const M = LG.M, P = lgPresentes();
  const d = lgCochero(); if (d) { const l = lgLugarDe(d); if (l) M.vale(['mundo', 'calesa', 'lugar'], l); M.vale(['mundo', 'calesa', 'listo'], 'si'); }
  for (const k of P) M.vale(['mundo', k, 'en'], lgEn(k));
  for (const a of P) for (const b of P) if (a !== b && (a === 'ana' || b === 'ana')) M.vale(['cualidad', a, 'afecto', b], relGetW(a, b));
  for (const [q, v] of Object.entries(LG.viajes)) { const l = lgLugarDe(q); if (l) v.pasados.add(l); }   // (the stops passed)
  // (who waits at a stop comes out to the road when the buggy with Ana gets there: Mrs. Pye, ahead of it)
  { const d = AGENTS.ana?.ride && AGENTS.ana.followOf, b = d && wmBody(d);
    if (b?.buggy) for (const [k, l] of Object.entries(LG.esperan || {})) { const f = FOLKBY[k]; if (!f || !LG.gente.has(k) || (lgLugarDe(d) !== l && !LG.viajes[d]?.pasados.has(l))) continue;   // (there, or already past it: she catches them up)
      if (dist(f.x, f.y, b.x, b.y) >= 110) { const q = b.bnav?.pts[Math.min(b.bnav.i + 1, b.bnav.pts.length - 1)] || [b.x + 1, b.y], L = dist(b.x, b.y, q[0], q[1]) || 1; f.x = b.x + (q[0] - b.x) / L * 70 + 26; f.y = b.y + (q[1] - b.y) / L * 70 + 12; f.dir = 3; }
      CHAT_HOLD[d] = Math.max(CHAT_HOLD[d] || 0, TT + .5);   // (and she stands in the road: the buggy stops there, until what she waits for is said)
    } }
  // (running: until she gets there; if something cut her way —a menu, the end of a scene—, she is given it again)
  if (LG.corriendo.ana && LG.corre && !ana.goto && dist(ana.x, ana.y, LG.corre[0], LG.corre[1]) >= 40 && TT > (LG.corre.otra || 0)) { LG.corre.otra = TT + 2; if (navigator.webdriver) [ana.x, ana.y] = LG.corre; else anaIrDespues({ x: LG.corre[0], y: LG.corre[1], scene: 'out', corre: true }); }
  if (LG.corriendo.ana && (!LG.corre || dist(ana.x, ana.y, LG.corre[0], LG.corre[1]) < 40)) { if (LG.corriendo.ana === 'orilla' && LG.corre && dist(ana.x, ana.y, LG.corre[0], LG.corre[1]) < 40) { ana.dir = 0; ana.sit = true; ana.llora = true; } delete LG.corriendo.ana; }   // (she got there, or stopped running)
  if (M.get(['mundo', 'calesa', 'lugar']) == null) M.vale(['mundo', 'calesa', 'lugar'], 'corral');
  for (const k of ['ana_en_tv', 'viaje']) { const e = estadoValor(k); if (e) M.vale(['estado', k], e); }
  M.vale(['cualidad', 'marilla', 'paciencia', 'ana'], cualidad('marilla', 'paciencia', 'ana'));
  if (dlgHechos().primera_noche != null && M.get(['comun', 'hechos', 'primera_noche']) == null) M.vale(['comun', 'hechos', 'primera_noche'], Math.floor(lgAhora() / 1440) + 1);
  if (estadoValor('viaje') === 'primer_viaje' && M.get(['comun', 'hechos', 'encontro_a_ana']) == null) M.vale(['comun', 'hechos', 'encontro_a_ana'], Math.floor(lgAhora() / 1440) + 1);
}
// what someone asks Ana to do («Subir a la calesa»): the player answers; with no one to ask, or Ana on her own, she
// decides as she would (comun/ana.ts)
function lgPregunta(p){
  if (navigator.webdriver || ana.hidden || ANA_AUTO) { LG.u = LG.M.decideSola(); return; }
  LG.menu = true; let ya = false;
  const una = si => { if (ya) return; ya = true; close(); LG.menu = false; LG.u = si == null ? LG.M.decideSola() : LG.M.responder(si); };
  say('ana', `${p.de} te pide: «${p.si}».`, [[p.si, () => una(true)], [p.no, () => una(false)]]);
  if (auto.on) setTimeout(() => una(null), 10000);
}
// a choice in a scene: the player's (with no one to ask, or Ana on her own: what she would do)
function lgOpciones(ops){
  if (navigator.webdriver || ana.hidden || ANA_AUTO) { LG.u = LG.M.decideSola(); return; }
  LG.menu = true; let ya = false;
  const una = i => { if (ya) return; ya = true; close(); LG.menu = false; LG.u = LG.M.elegir(i); };
  say('ana', '¿Qué dice Ana?', ops.map((o, i) => [nombreMay(o), () => una(i)]));
  if (auto.on) setTimeout(() => { if (!ya) { ya = true; close(); LG.menu = false; LG.u = LG.M.decideSola(); } }, 10000);
}
