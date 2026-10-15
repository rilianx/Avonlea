/* ---------- keeping the day: in the browser ---------- */
function save(){ if (wiping) return; try { localStorage.setItem('avonlea', JSON.stringify({ wm: game.wm, libreta: game.libreta, eggDay: game.eggDay, inv: game.inv, hasCan: game.hasCan, water: game.water, fond: game.fond, said: game.said, saidS: game.saidS, seasonShift: game.seasonShift, teaDay: game.teaDay, journal: game.journal, mem: game.mem, know: game.know, tasks: game.tasks, plans: game.plans, table: game.table, giftFor: game.giftFor, npcGiftDay: game.npcGiftDay, lastDay: game.lastDay, taskSeq: game.taskSeq, rel: game.rel, relLog: game.relLog, impr: game.impr, story: game.story, stories: game.stories, nextStory: game.nextStory, ground: game.ground, groundSeq: game.groundSeq, anaStates: game.anaStates, animals: Object.fromEntries(Object.entries(ANIM).map(([k, a]) => [k, { x: a.x, y: a.y, where: a.where, state: a.state, area: a.area, owner: a.owner }])), beds: BEDS.map(b => [b.stage, b.wet, b.grow]), cartas: game.cartas, mesa: game.mesa, heno: game.heno, lena: game.lena, escDone: game.escDone, comida: game.comida, dayT, donde: dondeQuedo() })); } catch (e) {} }   // (the letters, and what the day's work left, too)
try { const s = JSON.parse(localStorage.getItem('avonlea') || 'null'); if (s) { if (s.wm) game.wm = s.wm; game.libreta = s.libreta || []; game.eggDay = s.eggDay; Object.assign(game.inv, s.inv); game.hasCan = s.hasCan; game.water = s.water; Object.assign(game.fond, s.fond); game.said = s.said || {}; game.saidS = s.saidS || {}; game.seasonShift = s.seasonShift || 0; game.teaDay = s.teaDay ?? -1; game.journal = s.journal || []; game.mem = s.mem || {}; for (const k of ['know', 'plans', 'giftFor', 'npcGiftDay']) game[k] = s[k] || {}; game.tasks = s.tasks || []; game.table = s.table || null; game.lastDay = s.lastDay ?? null; game.taskSeq = s.taskSeq || 0; game.rel = s.rel || null; game.relLog = s.relLog || []; game.impr = s.impr || {}; game.story = s.story?.v === 2 ? s.story : null; if (game.story) game.story.gen = false; game.stories = s.stories || []; game.nextStory = s.nextStory || null; game.ground = s.ground || []; game.groundSeq = s.groundSeq || 0; game.anaStates = s.anaStates || {}; for (const [k, v] of Object.entries(s.animals || {})) if (ANIM[k]) Object.assign(ANIM[k], v); (s.beds || []).forEach((v, k) => { if (BEDS[k]) [BEDS[k].stage, BEDS[k].wet, BEDS[k].grow] = v; }); if (s.dayT) dayT = s.dayT; if (game.hasCan) ana.carry = 'can'; for (const k of ['cartas', 'mesa', 'heno', 'lena', 'escDone', 'comida']) if (s[k]) game[k] = s[k]; } } catch (e) {}
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
addEventListener('pagehide', save); setInterval(save, 10000);
