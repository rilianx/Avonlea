/* ---------- the language of the stories, in the game (docs/LENGUAJE.md): the stories that have moved to the language
   run in its engine (tools/lenguaje/motor.js, with the data of docs/lenguaje/, built into src/datos/lenguaje.json by
   tools/lenguaje/construir.js), and the game is its world: where everyone is (a place of the language, from where they
   are in the game), who sees whom, and how what is said is said (a bubble, a card, the menu, the box to write a name).
   The verbs that move people are done with what the game has: going somewhere is a goal for the planner (estar_en: it
   finds the way, the eight miles of the road included, and whoever rides along goes too); getting into the buggy is
   riding with whoever drives it (as the planner's subir_calesa does); what someone is asked to do («Subir a la
   calesa») is the player's to answer, in the menu.
   For now: the Camino Blanco de las Delicias (historias/camino_blanco), what happens each time Ana goes through the
   Avenue (its scenes take the place of avenida, newbridge, silencio_*, nombra_avenida); and the arrival
   (historias/llegada): from the station, Matthew asks Ana to get into the buggy and takes her to Green Gables (the
   errand «trae», instead of the script's goal «llevar ana,cocina»). The talk on the road and the arrival at Green
   Gables are still the game's (by stretch, src/js/21; the script's tejas_verdes and llegada, with the chapter's
   machinery, src/js/20): those scenes of the language are left out here (LG_OMITIR).
   The engine's game is kept with the game's (save, «lenguaje»), and goes on where it was. ---------- */
/*@motor_lenguaje*/
const LENGUAJE = /*@lenguaje*/null;
const LG_HISTORIAS = ['camino_blanco', 'llegada'];   // (the ones that run here: the others are still in the script)
const LG_OMITIR = ['llegada.ll_pelo', 'llegada.ll_angelical', 'llegada.ll_llegan'];   // (what the game does its own way)
const LG_ESCENARIO = { historias: LG_HISTORIAS, omitir: LG_OMITIR };
// the language's places, as the planner's (where it can take someone): the rest are only known as they are passed
const LG_PLAN = { estacion_bright_river: 'h:br', tejas_verdes: 'cocina', cocina: 'cocina', corral: 'corral', estanque_barry: 'lago', aldea: 'aldea', escuela: 'escuela' };
const LG = { M: null, talk: null, narra: null, u: null, menu: false };
// the engine's clock: minutes since the start of day 1, at midnight (dayT 0 is dawn, at six)
const lgAhora = () => dayT * 1440 + 360;
// where someone is, as a place of the language (or the game's own name for it, if the language has none)
function lgLugarDe(k){
  const b = wmBody(k); if (!b) return null;
  const sc = dlgEscena(k);
  if (sc === 'camino') { const tr = roadTramo((k === 'ana' ? ana.roadS : b.roadS) ?? 0); return tr.kind === 'avenida' ? 'camino_blanco' : tr.name === 'Newbridge' ? 'newbridge' : 'camino_bright_river'; }
  if (sc === 'br') return 'estacion_bright_river';
  if (sc === 'out') {
    if (dist(b.x, b.y, GG.x, GG.y) < 400) return 'tejas_verdes';   // (the Camino Blanco starts at its door: the yard is the house's)
    const R = ROADS.blanco; if (R && R.some((p, i) => i && segDist(b.x, b.y, R[i - 1], p) < 90)) return 'camino_blanco';
    if (PLACES.lago && dist(b.x, b.y, PLACES.lago[1], PLACES.lago[2]) < 260) return 'estanque_barry';
    return 'avonlea';
  }
  return sc === 'gg' ? 'cocina' : sc;   // (in a house: its room)
}
// who sees and hears whom: in the same room, or out of doors and close
const lgJuntos = (a, b) => { const A = wmBody(a), B = wmBody(b), sc = dlgEscena(a); return !!A && !!B && sc === dlgEscena(b) && (!['out', 'camino'].includes(sc) || dist(A.x, A.y, B.x, B.y) < 260); };
// who drives the buggy (the one who has it), and whether someone rides in it
const lgCochero = () => Object.keys(PEOPLE).find(k => PEOPLE[k].buggy && ['out', 'camino', 'br'].includes(PEOPLE[k].where));
function lgEn(k){
  if (k !== 'ana') return wmBody(k)?.buggy ? 'calesa' : 'nada';
  // (riding with the driver: while he takes her —when he gets down at home and goes in, she is still with him—)
  const A = AGENTS.ana, d = A?.ride && !!A.followOf;
  return (game.scene === 'camino' ? ana.onCart && !!game.road?.with : d) ? 'calesa' : 'nada';
}
// a verb of the language that moves someone: a goal for the planner (and whoever rides with them, goes too)
function lgIr(acc){
  const key = LG_PLAN[acc.a]; if (!key) { console.warn('[avonlea] lenguaje: el planificador no conoce «' + acc.a + '»'); acc.hecho = true; return; }
  const g = agentStart(acc.quien, { ...G.estar_en(acc.quien, key), text: `${wmName(acc.quien)} va a ${WP_NAME[key] || key}` }, { label: `ir a ${WP_NAME[key] || key} (${acc.verbo}, del lenguaje)`, prio: 3 });
  if (g) acc.seq = g.seq; else acc.hecho = true;
}
const lgLlego = acc => { const l = lgLugarDe(acc.quien); return l === acc.a || LENGUAJE.lugares[l]?.dentro === acc.a; };
// the world of the game, for the engine (the interface: tools/lenguaje/mundo_simulado.js)
function MundoJuego(){
  return {
    funciones: { ve: lgJuntos, oye: lgJuntos, sola: p => !(p === 'ana' && diana.follow) && !Object.keys(PEOPLE).some(q => q !== p && lgJuntos(p, q)) },
    // (a journey is one goal for the planner, to its end: the stops on the way are passed, and known as they are)
    minutos: () => 10, tramo: (por, desde, hasta) => [hasta],
    empezar(acc){
      if (acc.mapa) { if (lgLlego(acc)) acc.hecho = true; else lgIr(acc); return; }
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
      if (acc.silencio) { acc.fin = lgAhora() + acc.dura; return; }
      if (acc.nombrar) {   // (the book's name; or the player writes one)
        const listo = n => { nombrar(acc.nombrar, n); acc.nombre = nombreDe(acc.nombrar); acc.hecho = true; };
        if (acc.pedir && !navigator.webdriver && !ana.hidden && !ANA_AUTO) pedirNombre(acc.nombrar, listo); else listo();
        return;
      }
      acc.hecho = true;
    },
    listo(acc){
      if (acc.hecho) return true;
      if (acc.seq != null) {   // (the planner's goal: done, or given up; lost —a game opened again—, it is set again)
        const g = AGENTS[acc.quien]?.goals.find(g => g.seq === acc.seq);
        if (g) return g.st !== 'run';
        if (lgLlego(acc)) return true;
        lgIr(acc); return !!acc.hecho;
      }
      return acc.narra ? !LG.narra?.narra : acc.fin != null && lgAhora() >= acc.fin;
    },
    voz(q, t){ sayB(talkQ(q), t); },
    // (someone with an errand of a story is busy, as with a goal of the planner: their routine waits)
    encargo(){},   // (who has an errand is busy: lgOcupado, from the engine's errands themselves)
    cuando: () => lgAhora() + .25,
    parar(){}, seguir(){},
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
        LG.talk = { ch: 'viaje', lines: [], i: -1, wait: 1e9, el: 0, hold: [], lenguaje: id }; TALKS.push(LG.talk);
        // (its card, as the game's talks have theirs: while it is read, the world waits —narraPausa—)
        Object.defineProperty(LG.talk, 'narra', { get: () => LG.narra?.narra || null, set: v => { if (LG.narra) LG.narra.narra = v; }, enumerable: true });
        dlgDichas()[id.split('.')[1]] = true;   // (for the script: «dicha:cb_libro»)
        if (D_ESC(id)?.interrumpe && GAME_SPEED > 1 && !navigator.webdriver) setSpeed(1);   // (something that matters: at its pace)
        logEv(D_ESC(id).resumen, []);
      } else if (LG.talk) { const t = LG.talk; LG.talk = null; if (TALKS.includes(t)) talkEnd(t); }
    },
    efecto(e){ if (e.e === 'log') logEv(e.texto, []); if (e.e === 'marca') cap1Mark(e.id); },
  };
}
const D_ESC = id => LENGUAJE.escenas[id];
// the primitive verbs, with the game's buggy: getting in is riding with whoever drives it (the planner takes the rider
// along, and on the road she sits beside him); getting off, walking again
function lgHacer(acc){
  const [q, x] = acc.args;
  switch (acc.verbo) {
    case 'subir':
      if (q !== 'ana') { const b = wmBody(q); if (b) b.buggy = true; break; }
      { const d = lgCochero() || 'matthew', A = agentOf('ana'); A.followOf = d; A.ride = true;   // (while he has the errand, he is «driven»: she stays with him)
        if (game.scene === 'camino' && game.road?.with === d) roadBoard(); logEv(`Ana subió a la calesa con ${wmName(d)}.`, []); }
      break;
    case 'bajar':
      if (q === 'ana') { const A = AGENTS.ana; if (A) { A.followOf = null; A.ride = false; } ana.sit = false; if (game.scene === 'camino' && ana.onCart) roadGetOff(); }
      break;
    case 'enganchar': { const b = wmBody(q); if (b) b.buggy = true; break; }
    case 'seguir': if (q === 'ana') agentOf('ana').followOf = x; break;
    case 'dejar_de_seguir': if (q === 'ana' && AGENTS.ana) AGENTS.ana.followOf = null; break;
    default: if (acc.verbo !== 'esperar') console.warn('[avonlea] lenguaje: el juego todavía no hace «' + acc.verbo + '»');
  }
}
// the engine: the one kept with the game, or a new one
function lgEmpezar(){
  let g = null; try { g = JSON.parse(localStorage.getItem('avonlea') || 'null')?.lenguaje; } catch (e) {}
  try { if (g) LG.M = Motor.cargar(LENGUAJE, g, MundoJuego, LG_ESCENARIO); } catch (e) { console.warn('[avonlea] lenguaje: no se pudo cargar lo guardado', e); }
  if (!LG.M) LG.M = Motor(LENGUAJE, LG_ESCENARIO, MundoJuego);
  lgMundo(true);
  if (LG.M.estado().escena) MundoJuego().escena('empieza', LG.M.estado().escena.id);   // (a scene kept in the middle: it holds the channel again)
}
// a new game, or the chapter played again from the start: the engine too
function lgReiniciar(){ try { if (LG.talk && TALKS.includes(LG.talk)) talkEnd(LG.talk); LG.talk = null; LG.menu = false; LG.M = Motor(LENGUAJE, LG_ESCENARIO, MundoJuego); } catch (e) {} }
// someone busy with an errand of a story: as with a goal of the planner, they are «driven» (wmDriven): their routine
// waits, they stay where they are, and whoever rides with them stays with them; going somewhere is a goal of the
// planner, and then the planner moves them
function lgOcupado(k){ try { return !!LG.M && LG.M.ocupados().includes(k); } catch (e) { return false; } }
// what save() keeps (called from anywhere: before this file has run, nothing)
function lgGuardar(){ try { return LG.M ? LG.M.guardar() : undefined; } catch (e) { return undefined; } }
function lenguajeTick(){
  if (!LENGUAJE) return;
  if (!LG.M) lgEmpezar();
  const M = LG.M;
  // one of the game's scenes cut the engine's (it ended its talk)
  if (LG.talk && !TALKS.includes(LG.talk)) { LG.talk = null; M.cortarEscena(); }
  // what is due, up to the game's clock; then what changed in the world (seen next time: what the engine's own verbs
  // finished goes first —arriving home, then getting off, not the other way round—)
  const u = LG.u = M.alTiempo(lgAhora());
  if (u.escena?.ops && !LG.menu) lgOpciones(u.escena.ops);
  if (u.pregunta && !LG.menu) lgPregunta(u.pregunta);
  lgMundo(false);
}
// the world tells the engine how things are: where everyone is (arriving somewhere is a moment: «ana pasa
// camino_blanco»; at the start, where each one already was, is not), who rides in the buggy, how fond they are of each
// other, how Ana stands at Green Gables, and whether the first trip is on (the station's scene leaves it)
function lgMundo(inicio){
  const M = LG.M, P = Object.keys(LENGUAJE.personas).filter(k => wmBody(k));
  for (const k of P) { const l = lgLugarDe(k), antes = M.get(['mundo', k, 'lugar']); if (l && l !== antes) M.llega(k, l, inicio || antes == null); }
  const d = lgCochero(); if (d) { const l = lgLugarDe(d); if (l) M.vale(['mundo', 'calesa', 'lugar'], l); M.vale(['mundo', 'calesa', 'listo'], 'si'); }
  for (const k of P) M.vale(['mundo', k, 'en'], lgEn(k));
  for (const a of P) for (const b of P) if (a !== b && (a === 'ana' || b === 'ana')) M.vale(['cualidad', a, 'afecto', b], relGetW(a, b));
  const e = estadoValor('ana_en_tv'); if (e) M.vale(['estado', 'ana_en_tv'], e);
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
