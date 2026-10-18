/* ---------- saying something (typed): Ana says it out loud in a bubble, and whoever is near answers with one of
   their written lines ---------- */
function openSay(){ if (sleeping) return; sayOpen = true; const f = $('say'); f.hidden = false; f.style.bottom = $('talk').hidden ? '14px' : ($('talk').offsetHeight + 24) + 'px'; $('sayin').focus(); }
function closeSay(){ sayOpen = false; $('say').hidden = true; $('sayin').blur(); }
function nearbyGroup(){
  const d = k => dist(PEOPLE[k].x, PEOPLE[k].y, ana.x, ana.y), ks = Object.keys(PEOPLE).filter(k => sceneOf(k) === game.scene && d(k) < 180).sort((a, b) => d(a) - d(b));
  return ks.length ? chatGroup(ks[0]) : [];
}
function anaSpeak(text){
  text = text.trim().slice(0, 240); if (!text || sleeping) return;
  userInput(); close();   // (this leaves whatever was going on: a scene, a menu)
  bubbles = [{ q: 'ana', text, t: 0, dur: lineDur(text) }]; sfx.blip();
  const parts = nearbyGroup(), id = amb.tok = Math.random();
  if (parts.length) setTimeout(() => { if (amb.tok === id && !game.talk && !amb.cur && LINES[parts[0]].length) { const k = parts[0]; sceneStart({ parts: [k], lines: [{ q: k, t: LINES[k][Math.floor(Math.random() * LINES[k].length)] }], out: {}, scene: game.scene, resumen: '' }, false); } }, 1800);
}
function drawCup(c, p){ ell(c, p.x + 10, p.y - 20, 4.6, 3, '#fffaf0', true); for (let k = 0; k < 2; k++) line(c, [[p.x + 9 + k * 3, p.y - 25], [p.x + 11 + k * 3 + Math.sin(TT * 4 + k) * 1.5, p.y - 31]], 'rgba(255,255,255,.75)', 1); }
let hoverAt = null;
function pet(){ logEv('Ana acarició a Pelusa, la gata de Tejas Verdes, que ronroneó.'); toby.mode = 'ana'; toby.until = TT + 12; ana.pet = true; ana.crouch = true; toby.petted = 2.2; toby.dir = toby.x < ana.x ? 1 : 3; ana.dir = toby.x > ana.x ? 1 : 3; game.fond.toby++; hearts(toby.x, toby.y - 24); sfx.happy(); save(); setTimeout(() => { ana.pet = false; ana.crouch = false; }, 1600); }