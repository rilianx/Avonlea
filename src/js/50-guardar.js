/* ---------- keeping the day: in the browser ---------- */
// the scenes being said when the game is kept: not yet said, and where they were (they go on from that line when it is
// opened again: a game closed in the middle of the arrival does not lose it)
function escenasEnCurso(){
  const done = { ...(game.escDone || {}) }, prog = { ...(game.dlgProg || {}) };
  for (const t of TALKS) { const d = t.esc && DIALOGOS.find(x => x.id === t.esc); if (!d || d.tipo === 'comentario' || t.interrupted) continue; delete done[t.esc]; prog[t.esc] = Math.max(0, (t.desde || 0) + t.i - (t.puente || 0)); }
  return { escDone: done, dlgProg: prog };
}
function save(){ if (wiping) return; try { localStorage.setItem('avonlea', JSON.stringify({ wm: game.wm, libreta: game.libreta, eggDay: game.eggDay, inv: game.inv, hasCan: game.hasCan, water: game.water, fond: game.fond, said: game.said, saidS: game.saidS, seasonShift: game.seasonShift, teaDay: game.teaDay, journal: game.journal, mem: game.mem, know: game.know, tasks: game.tasks, plans: game.plans, table: game.table, giftFor: game.giftFor, npcGiftDay: game.npcGiftDay, lastDay: game.lastDay, taskSeq: game.taskSeq, rel: game.rel, relLog: game.relLog, impr: game.impr, story: game.story, stories: game.stories, nextStory: game.nextStory, ground: game.ground, groundSeq: game.groundSeq, anaStates: game.anaStates, animals: Object.fromEntries(Object.entries(ANIM).map(([k, a]) => [k, { x: a.x, y: a.y, where: a.where, state: a.state, area: a.area, owner: a.owner }])), beds: BEDS.map(b => [b.stage, b.wet, b.grow]), cartas: game.cartas, mesa: game.mesa, heno: game.heno, lena: game.lena, huertito: game.huertito, canteros: BEDS.map(b => [b.stage, b.wet, b.dias || 0]), ...escenasEnCurso(), comida: game.comida, final: game.final, dayT, donde: dondeQuedo() })); } catch (e) {} }   // (the letters, and what the day's work left, too)
try { const s = JSON.parse(localStorage.getItem('avonlea') || 'null'); if (s) { if (s.wm) game.wm = s.wm; game.libreta = s.libreta || []; game.eggDay = s.eggDay; Object.assign(game.inv, s.inv); game.hasCan = s.hasCan; game.water = s.water; Object.assign(game.fond, s.fond); game.said = s.said || {}; game.saidS = s.saidS || {}; game.seasonShift = s.seasonShift || 0; game.teaDay = s.teaDay ?? -1; game.journal = s.journal || []; game.mem = s.mem || {}; for (const k of ['know', 'plans', 'giftFor', 'npcGiftDay']) game[k] = s[k] || {}; game.tasks = s.tasks || []; game.table = s.table || null; game.lastDay = s.lastDay ?? null; game.taskSeq = s.taskSeq || 0; game.rel = s.rel || null; game.relLog = s.relLog || []; game.impr = s.impr || {}; game.story = s.story?.v === 2 ? s.story : null; if (game.story) game.story.gen = false; game.stories = s.stories || []; game.nextStory = s.nextStory || null; game.ground = s.ground || []; game.groundSeq = s.groundSeq || 0; game.anaStates = s.anaStates || {}; for (const [k, v] of Object.entries(s.animals || {})) if (ANIM[k]) Object.assign(ANIM[k], v); (s.beds || []).forEach((v, k) => { if (BEDS[k]) [BEDS[k].stage, BEDS[k].wet, BEDS[k].grow] = v; }); if (s.dayT) dayT = s.dayT; if (game.hasCan) ana.carry = 'can'; for (const k of ['cartas', 'mesa', 'heno', 'lena', 'huertito', 'canteros', 'escDone', 'dlgProg', 'comida', 'final']) if (s[k]) game[k] = s[k]; } } catch (e) {}
relInit();
// where everyone was when the game was closed: Ana (the room or out of doors, the spot) and the people, to go on from there
function dondeQuedo(){
  const P = Object.fromEntries(Object.entries(PEOPLE).map(([k, p]) => [k, { where: p.where, x: Math.round(p.x), y: Math.round(p.y) }]));
  return { scene: game.scene, x: Math.round(ana.x), y: Math.round(ana.y), dir: ana.dir, gente: P };
}
function seguirDondeQuedo(D){
  if (!D || !D.scene) return false;
  if (D.scene === 'out') { game.scene = 'out'; ana.x = D.x; ana.y = D.y; ana.sit = false; ana.lie = false; cam.x = ana.x; cam.y = ana.y; }
  else if (ROOMS[D.scene]) goIn(D.scene, [D.x, D.y]);
  else return false;   // (on the road, at the station: from home, as always)
  ana.dir = D.dir ?? ana.dir;
  for (const [k, g] of Object.entries(D.gente || {})) { const p = PEOPLE[k]; if (!p || g.where === 'away' || p.buggy) continue; p.where = g.where; p.x = g.x; p.y = g.y; p.nav = null; p.sit = false; }
  return true;
}
addEventListener('pagehide', save); document.addEventListener('visibilitychange', () => { if (document.hidden) save(); }); setInterval(save, 10000);   // (and when the tab is left: on a phone, the game is often left without closing it)
