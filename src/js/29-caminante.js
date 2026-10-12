/* ---------- (a walker by the paths; it was Toby the dog's; Pelusa the cat walks with catGo, below) ---------- */
function dogGo(tx, ty, sp, dt){
  const n = navStep(toby, tx, ty); if (n.arrived) { toby.moving = false; return true; }
  const dx = n.wx - toby.x, dy = n.wy - toby.y, d = Math.hypot(dx, dy) || 1, v = Math.min(sp, d * 4), ox = toby.x, oy = toby.y;
  moveBy(toby, dx / d * v * dt, dy / d * v * dt);
  toby.moving = true; toby.dir = dx > 0 ? 1 : 3; toby.walk = (toby.walk + dt * 2.6 * Math.max(.6, v / 55)) % 1; toby.sitT = 0;
  if (Math.hypot(toby.x - ox, toby.y - oy) < v * dt * .25 && (toby.stuck = (toby.stuck || 0) + dt) > .8) { toby.nav = null; toby.stuck = 0; toby.goal = null; toby.until = 0; }
  return false;
}
function tobyGoal(forceNear){
  const out = game.scene === 'out', free = (x, y) => !blocked(x, y);
  if (!out && ana.meal) return { p: [TABLE.x + (Math.random() < .5 ? -1 : 1) * (14 + Math.random() * 26), TABLE.y + 24 + Math.random() * 14], roam: false };   // (at the table: on the floor in front, waiting for crumbs)
  if (!out) { for (let k = 0; k < 10; k++) { const a = Math.random() * Math.PI, r = 30 + Math.random() * 50, x = ana.x + Math.cos(a) * r, y = ana.y + 4 + Math.sin(a) * r; /* (beside or in front of her, never up behind her head) */ if (free(x, y)) return { p: [x, y], roam: false }; } return { p: [ana.x + 24, ana.y + 10], roam: false }; }
  const still = ana.lie || ana.sit || (!ana.moving && ana.idle > 5);
  if (!forceNear && (still ? Math.random() < .8 : Math.random() < .3)) {   // off exploring: something of interest, or just a spot, up to 450 away
    const spots = [...bushes, ...trees.filter(t => t.kind === 'apple'), ...BEDS, PUMP, BENCH, ...Object.keys(PEOPLE).filter(k => sceneOf(k) === 'out').map(k => PEOPLE[k])].filter(o => { const d = dist(o.x, o.y, ana.x, ana.y); return d > 90 && d < 450; });
    if (spots.length && Math.random() < .7) { const o = spots[Math.floor(Math.random() * spots.length)]; return { p: [o.x + (Math.random() - .5) * 40, o.y + 14], roam: true }; }
    for (let k = 0; k < 12; k++) { const a = Math.random() * TAU, r = 140 + Math.random() * 300, x = ana.x + Math.cos(a) * r, y = ana.y + Math.sin(a) * r; if (free(x, y)) return { p: [x, y], roam: true }; }
  }
  const ah = ana.moving ? [[0, -1], [1, 0], [0, 1], [-1, 0]][ana.dir] : [0, 0];   // (a little ahead of her when she walks)
  for (let k = 0; k < 10; k++) { const a = Math.random() * TAU, r = 25 + Math.random() * 90, x = ana.x + Math.cos(a) * r + ah[0] * 50, y = ana.y + Math.sin(a) * r + ah[1] * 50; if (free(x, y)) return { p: [x, y], roam: false }; }
  return { p: [ana.x + (ana.dir === 3 ? 26 : -26), ana.y + 14], roam: false };
}
// Pelusa, the cat of Green Gables: she goes her own way about the house (the porch, the barn, the garden, the hen
// house, a sunny spot), sleeps where she likes, comes into the kitchen at night and by the stove in winter; and now
// and then, when Ana is near, she comes to her, rubs against her a while, and goes off again. She does not follow her.
const CAT_SPOTS = () => [[GG.x - 90, GG.y + 46], [GG.x + 110, GG.y + 60], [BARN.x + 40, BARN.y + 70], [WP.huerta[0], WP.huerta[1] + 24], [GG.x - 220, GG.y + 150], [GG.x + 60, GG.y + 210], [WP.gallinero[0] - 30, WP.gallinero[1] + 24], [WP.granero[0] + 20, WP.granero[1] + 10]];
const CAT_IN = () => [[STOVE.x + 46, STOVE.y + 56], [TABLE.x + 50, TABLE.y + 34], [KDOOR.x - 70, KIT.h - 40], [STOVE.x + 90, STOVE.y + 70]];
function catGo(tx, ty, sp, dt){
  const c = toby, d = dist(c.x, c.y, tx, ty); if (d < 8) { c.moving = false; c.nav = null; return true; }
  if (watched(c.where)) return walkPath(c, tx, ty, sp, dt, c.where);
  const v = Math.min(d, sp * dt); c.x += (tx - c.x) / d * v; c.y += (ty - c.y) / d * v; c.moving = true; if (Math.abs(tx - c.x) > 1) c.dir = tx > c.x ? 1 : 3; c.walk = (c.walk + dt * 2) % 1; return false;
}
function tobyThink(dt){
  const c = toby; c.petted -= dt;
  if (c.petted > 0) { c.moving = false; return; }
  const h = hourNow(), wantIn = h >= 20.5 || h < 7 || (S === 3 && h >= 16);
  if (wantIn && c.where === 'out') { c.mode = null; if (catGo(DOOR.gg[0], DOOR.gg[1] + 16, 40, dt)) { c.where = 'gg'; c.x = KDOOR.x; c.y = KIT.h - 20; c.goal = null; c.nav = null; } return; }
  if (!wantIn && c.where === 'gg' && (c.goal == null)) { if (catGo(KDOOR.x, KIT.h - 16, 40, dt)) { c.where = 'out'; c.x = DOOR.gg[0]; c.y = DOOR.gg[1] + 20; c.goal = null; c.nav = null; } return; }
  // to Ana now and then (only where she is, and near): she rubs against her ankles a while
  const same = game.scene === c.where, dA = dist(c.x, c.y, ana.x, ana.y);
  if (c.mode === 'ana') {
    if (!same || dA > 520 || TT > c.until) { c.mode = null; c.goal = null; c.cool = TT + 50 + Math.random() * 80; }
    else { if (dA > 26) catGo(ana.x + (c.x < ana.x ? -20 : 20), ana.y + 6, 50, dt); else { c.moving = false; c.nav = null; c.dir = c.x < ana.x ? 1 : 3; } return; }
  } else if (same && dA < 340 && TT > (c.cool || 0) && Math.random() < dt * .07) { c.mode = 'ana'; c.until = TT + 12 + Math.random() * 12; c.sleep = false; }
  // her own rounds: somewhere, a long rest (often asleep), somewhere else
  if (!c.goal) { if (TT < (c.rest || 0)) { c.moving = false; return; } c.goal = pick(c.where === 'gg' ? CAT_IN() : CAT_SPOTS()); c.nav = null; c.sleep = false; }
  if (catGo(c.goal[0], c.goal[1], 26, dt)) { c.goal = null; c.rest = TT + 20 + Math.random() * 50; c.sleep = Math.random() < .45; if (!wantIn && c.where === 'gg') c.rest = 0; }
}
