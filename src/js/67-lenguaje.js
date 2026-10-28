/* ---------- the language of the stories, in the game (docs/LENGUAJE.md): the stories that have moved to the language
   run in its engine (tools/lenguaje/motor.js, with the data of docs/lenguaje/, built into src/datos/lenguaje.json by
   tools/lenguaje/construir.js), and the game is its world: where everyone is (a place of the language, from where they
   are in the game), who sees whom, and how what is said is said (a bubble, a card, the menu, the box to write a name).
   For now: the Camino Blanco de las Delicias (historias/camino_blanco), what happens each time Ana goes through the
   Avenue: on the road from Bright River (chapter II, with Matthew: the book's), or on the Avonlea map. Its scenes take
   the place of those of the script that did it before (avenida, newbridge, silencio_*, nombra_avenida).
   The engine's game is kept with the game's (save, «lenguaje»), and goes on where it was. ---------- */
/*@motor_lenguaje*/
const LENGUAJE = /*@lenguaje*/null;
const LG_HISTORIAS = ['camino_blanco'];   // (the ones that run here: the others are still in the script)
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
// who sees and hears whom: in the same scene, close
const lgJuntos = (a, b) => { const A = wmBody(a), B = wmBody(b); return !!A && !!B && dlgEscena(a) === dlgEscena(b) && dist(A.x, A.y, B.x, B.y) < 260; };
// the world of the game, for the engine (the interface: tools/lenguaje/mundo_simulado.js)
function MundoJuego(){
  return {
    funciones: { ve: lgJuntos, oye: lgJuntos, sola: p => !(p === 'ana' && diana.follow) && !Object.keys(PEOPLE).some(q => q !== p && lgJuntos(p, q)) },
    minutos: () => 10, tramo: () => [],   // (the stories here do not travel yet: the road and the buggy are the game's)
    empezar(acc){
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
      console.warn('[avonlea] lenguaje: el juego todavía no hace «' + acc.verbo + '»'); acc.hecho = true;
    },
    listo: acc => acc.hecho || (acc.narra ? !LG.narra?.narra : acc.fin != null && lgAhora() >= acc.fin),
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
// the engine: the one kept with the game, or a new one
function lgEmpezar(){
  let g = null; try { g = JSON.parse(localStorage.getItem('avonlea') || 'null')?.lenguaje; } catch (e) {}
  try { if (g) LG.M = Motor.cargar(LENGUAJE, g, MundoJuego); } catch (e) { console.warn('[avonlea] lenguaje: no se pudo cargar lo guardado', e); }
  if (!LG.M) LG.M = Motor(LENGUAJE, { historias: LG_HISTORIAS }, MundoJuego);
  if (LG.M.estado().escena) MundoJuego().escena('empieza', LG.M.estado().escena.id);   // (a scene kept in the middle: it holds the channel again)
}
// a new game, or the chapter played again from the start: the engine too
function lgReiniciar(){ try { if (LG.talk && TALKS.includes(LG.talk)) talkEnd(LG.talk); LG.talk = null; LG.menu = false; LG.M = Motor(LENGUAJE, { historias: LG_HISTORIAS }, MundoJuego); } catch (e) {} }
// what save() keeps (called from anywhere: before this file has run, nothing)
function lgGuardar(){ try { return LG.M ? LG.M.guardar() : undefined; } catch (e) { return undefined; } }
function lenguajeTick(){
  if (!LENGUAJE) return;
  if (!LG.M) lgEmpezar();
  const M = LG.M;
  // the world tells the engine where everyone is: arriving somewhere is a moment («ana pasa camino_blanco»)
  // (the first time, where each one already was: not a moment)
  for (const k of Object.keys(LENGUAJE.personas)) { const l = lgLugarDe(k), antes = M.get(['mundo', k, 'lugar']); if (l && l !== antes) M.llega(k, l, antes == null); }
  // one of the game's scenes cut the engine's (it ended its talk)
  if (LG.talk && !TALKS.includes(LG.talk)) { LG.talk = null; M.cortarEscena(); }
  const u = LG.u = M.alTiempo(lgAhora());
  if (u.escena?.ops && !LG.menu) lgOpciones(u.escena.ops);
}
// a choice in a scene: the player's (with no one to ask, or Ana on her own: what she would do)
function lgOpciones(ops){
  if (navigator.webdriver || ana.hidden || ANA_AUTO) { LG.u = LG.M.decideSola(); return; }
  LG.menu = true; let ya = false;
  const una = i => { if (ya) return; ya = true; close(); LG.menu = false; LG.u = LG.M.elegir(i); };
  say('ana', '¿Qué dice Ana?', ops.map((o, i) => [nombreMay(o), () => una(i)]));
  if (auto.on) setTimeout(() => { if (!ya) { ya = true; close(); LG.menu = false; LG.u = LG.M.decideSola(); } }, 10000);
}
