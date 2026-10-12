/* ---------- saying something (typed): Ana says it out loud, the others react; leaving the talk, or heading
   somewhere, is understood by the AI ("tengo que irme", "voy a la huerta") ---------- */
function openSay(){ if (sleeping) return; sayOpen = true; const f = $('say'); f.hidden = false; f.style.bottom = $('talk').hidden ? '14px' : ($('talk').offsetHeight + 24) + 'px'; $('sayin').focus(); }
function closeSay(){ sayOpen = false; $('say').hidden = true; $('sayin').blur(); }
function nearbyGroup(){
  const d = k => dist(PEOPLE[k].x, PEOPLE[k].y, ana.x, ana.y), ks = Object.keys(PEOPLE).filter(k => sceneOf(k) === game.scene && d(k) < 180).sort((a, b) => d(a) - d(b));
  return ks.length ? chatGroup(ks[0]) : [];
}
function validGo(g){
  if (!g || g.tipo === 'ninguna') return null;
  const d = String(g.destino || '');
  if (g.tipo === 'irse') return { intent: null };
  if (g.tipo === 'lugar' && PLACES[d]) return { intent: { type: 'place', key: d } };
  if (g.tipo === 'casa' && ROOMS[d]) return { intent: { type: 'house', id: d } };
  if (g.tipo === 'persona' && PEOPLE[d]) return { intent: { type: 'talkto', k: d } };
  if (g.tipo === 'dormir') return { intent: { type: 'sleep' } };
  return null;
}
async function anaSpeak(text){
  text = text.trim().slice(0, 240); if (!text || sleeping) return;
  const was = !!amb.cur || !!game.talk;
  userInput(); close();   // (this leaves whatever was going on: a scene, a menu)
  bubbles = [{ q: 'ana', text, t: 0, dur: lineDur(text) }]; sfx.blip();
  const parts = nearbyGroup(), id = amb.tok = Math.random();
  if (!aiReady()) {
    if (parts.length) setTimeout(() => { if (amb.tok === id && !game.talk && !amb.cur) { const k = parts[0]; sceneStart({ parts: [k], lines: [{ q: k, t: LINES[k][Math.floor(Math.random() * LINES[k].length)] }], out: {}, scene: game.scene, resumen: '' }, false); } }, 1800);
    return;
  }
  try {
    if (parts.length) {
      const s = await sceneAsk(parts, `Ana dice en voz alta (la jugadora le hizo decir esto): «${text}». ${was ? 'Interrumpe lo que se estaban diciendo. ' : ''}Escribe cómo reaccionan los demás y, si hace falta, lo que Ana añade (su frase ya se vio, no la repitas); si lo que dijo es despedirse o ir a otro lado, "ana_va" lo indica.`, 'dicho');
      if (amb.tok !== id || game.talk || amb.cur) return;
      const v = validGo(s.out.ana_va);
      if (!s.lines.length) { if (v) startIntent(v.intent, true); return; }
      s.after = v?.intent || null; s.noMenu = !!v; s.turns = 1;
      sceneStart(s, !v);   // (if she is leaving, a scene she can walk out of; otherwise a talk with its decisions at the end)
    } else {
      const opts = autoOptions(), r = await aiCall([{ role: 'user', content: autoMsg(opts, text) }], AUTO_SCHEMA), o = opts[Math.round(+r.out.eleccion) - 1];
      if (amb.tok === id && o) startIntent(o.intent, true);
    }
  } catch (e) { notice('✒ La IA no respondió (' + e.message + ').'); }
}
function drawCup(c, p){ ell(c, p.x + 10, p.y - 20, 4.6, 3, '#fffaf0', true); for (let k = 0; k < 2; k++) line(c, [[p.x + 9 + k * 3, p.y - 25], [p.x + 11 + k * 3 + Math.sin(TT * 4 + k) * 1.5, p.y - 31]], 'rgba(255,255,255,.75)', 1); }
let hoverAt = null;
function pet(){ logEv('Ana acarició a Pelusa, la gata de Tejas Verdes, que ronroneó.'); toby.mode = 'ana'; toby.until = TT + 12; ana.pet = true; ana.crouch = true; toby.petted = 2.2; toby.dir = toby.x < ana.x ? 1 : 3; ana.dir = toby.x > ana.x ? 1 : 3; game.fond.toby++; hearts(toby.x, toby.y - 24); sfx.happy(); save(); setTimeout(() => { ana.pet = false; ana.crouch = false; }, 1600); }