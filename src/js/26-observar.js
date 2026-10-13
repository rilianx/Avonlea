/* ---------- watching someone: the player still moves Ana, but the view follows another one (outdoors and into the
   houses), to see how they go about their goals. Where the view is, they walk by the paths as Ana would. ---------- */
let OBS = null;
const obsScene = () => { const b = OBS && wmBody(OBS), sc = b && wmScene(OBS); return sc === 'out' || ROOMS[sc] ? sc : null; };
// Ana on her own: her plan never waits for the player, and the keys or a drag move the view instead of her
let ANA_AUTO = false;
const freeCam = { x: 0, y: 0, free: false };   // (free: the view was moved away from Ana; outdoors)
const viewScene = () => obsScene() || (ANA_AUTO && freeCam.free ? 'out' : game.scene);
const watched = sc => sc === game.scene || sc === viewScene();
function inScene(sc, f){ const o = SCN; SCN = sc; try { return f(); } finally { SCN = o; } }
function observe(who){
  OBS = who && who !== 'ana' && wmBody(who) ? who : null; cam.snap = true;
  if (OBS && innerWidth < 700) wmPanel(false);   // (on a small screen the panel would cover it)
  obsBar();
}
// what someone is doing now, in a few words (the strip while watching; the traces of the tests)
function doingText(k){
  const ag = AGENTS[k], cl = wmBody(k)?.called;
  if (cl && TT < cl.until) return (cl.come ? 'va donde ' : 'espera a ') + wmName(cl.by) + ' (lo llamó)';
  { const sg = activeGoals(ag || {}).find(g => g.staying); if (sg) return (sg.goal.room === 'es' ? '📚 en clases' : sg.goal.kind === 'paseo' ? '🌸 de paseo' : 'se queda') + ' hasta las ' + fmtHour(sg.stayUntil); }
  { const lg = activeGoals(ag || {}).find(g => g.goal.desde > hourNow() && !g.started); if (lg && !ag.task) return 'en lo suyo (a las ' + fmtHour(lg.goal.desde) + ': ' + lg.label + ')'; }
  return ag?.distract ? '💭 ' + ag.distract.text : ag?.hold ? 'esperando aquí' : ag?.followOf ? 'acompaña a ' + wmName(ag.followOf) : ag?.task?.st === 'todo' ? stepText(ag.task.a) : (pw => pw ? 'espera a ' + wmName(pw.to) : activeGoals(ag || {}).length ? 'pensando qué hacer' : 'en lo suyo')(ag && activeGoals(ag).flatMap(g => g.pending || []).find(q => q.h.st === 'run'));
}
// the strip at the top while watching: who, what they are doing now, and the way back to Ana
function obsBar(){
  const el = $('obs'); if (!OBS) { if (!el.hidden) el.hidden = true; return; }
  const ag = AGENTS[OBS], b = wmBody(OBS), sc = obsScene();
  const doing = doingText(OBS);
  const where = !sc ? (b.where === 'away' ? 'fuera de Avonlea' : 'dentro de su casa (no se ve)') : sc === 'out' ? '' : placeName(sc);
  const pt = ag && !ag.distract && ag.task ? paceText(ag) : '';
  const txt = '👁 ' + wmName(OBS) + ' · ' + doing + (pt ? ' (' + pt + ')' : '') + (where ? ' · ' + where : '');
  if (el.dataset.t !== txt) { el.dataset.t = txt; el.firstChild.textContent = txt; }
  el.hidden = false;
}
const blocked = (x, y) => curScene() === 'out' ? blockedOut(x, y) : blockedIn(x, y, curScene());
// (one who is already where one cannot be (put there by an action, by a fence's edge) may walk out: else she would never move again)
function moveBy(o, dx, dy){ if (blocked(o.x, o.y)) { o.x += dx; o.y += dy; return; } if (!blocked(o.x + dx, o.y)) o.x += dx; if (!blocked(o.x, o.y + dy)) o.y += dy; }
function walkTo(p, tx, ty, sp, dt){
  const dx = tx - p.x, dy = ty - p.y, d = Math.hypot(dx, dy);
  if (d < 4) { p.moving = false; return true; }
  const v = Math.min(sp, d * 4); moveBy(p, dx / d * v * dt, dy / d * v * dt); p.moving = true;
  p.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0); p.walk = (p.walk + dt * 1.8 * v / SPEED) % 1;
  return false;
}
function wander(p, dt, sp){
  if (p.wait > 0) { p.wait -= dt; p.moving = false; return; }
  if (!p.gLibre || p.gLibre.g !== p.goal) p.gLibre = { g: p.goal, at: sitioLibre(p, ...p.goals[p.goal % p.goals.length]) };   // (the spot, or beside it if someone is there or going there)
  const [gx, gy] = p.gLibre.at;
  if (walkPath(p, gx, gy, sp, dt)) { p.goal = (p.goal + 1 + Math.floor(Math.random() * (p.goals.length - 1))) % p.goals.length; p.wait = 3 + Math.random() * 6; p.dir = 2; }
}
// a spot near (x, y), in the scene being worked out, where no one stands nor is going: no one stands on another
const LIBRE_D = [[0, 0], [30, 0], [-30, 0], [0, 26], [0, -26], [30, 26], [-30, 26], [30, -26], [-30, -26], [60, 0], [-60, 0]];
function sitioLibre(p, x, y, sc = curScene()){
  const otros = [['ana', ana, game.scene], ...Object.entries(PEOPLE).map(([k, q]) => [k, q, q.where]), ...FOLK.map(f => [f.id, f, f.where])].filter(([, o, s]) => o !== p && s === sc);
  for (const [dx, dy] of LIBRE_D) { const qx = x + dx, qy = y + dy; if ((dx || dy) && blocked(qx, qy)) continue;
    if (!otros.some(([, o]) => Math.hypot(o.x - qx, o.y - qy) < 16 || o.gLibre && o.gLibre.at && Math.hypot(o.gLibre.at[0] - qx, o.gLibre.at[1] - qy) < 16)) return [qx, qy]; }
  return [x, y];
}
