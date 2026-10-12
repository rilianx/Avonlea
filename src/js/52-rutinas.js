/* ---------- routines: who goes where (Matthew in for meals, Mrs. Lynde's visits) ----------
   Whoever has somewhere to be walks there along the roads (if Ana is outdoors she sees them go in at the door; if she
   is indoors they just turn up at the door of the room). */
const DOOR = {}; for (const [k, h] of Object.entries(HOUSES)) DOOR[k] = [h.at.x, h.at.y + 10];
function commute(p, want, dt, sp){
  if (p.where === 'away') { if (want === 'away') return; p.where = 'out'; p.x = TOWN[0] + 8; p.y = TOWN[1]; p.nav = null; p.dest = null; if (p.outGoals) p.goals = p.outGoals; logEv(NAMES[p.look] + ' llegó por el camino del pueblo.', [p.look]); }
  if (p.where !== 'out') {   // inside a house: out through the door
    if (watched(p.where) && !(p.exitT > 8)) { p.exitT = (p.exitT || 0) + dt; if (!walkPath(p, KDOOR.x, KIT.h - 8, 40, dt, p.where)) return; }
    const h = p.where; p.exitT = 0; p.where = 'out'; p.sit = false; p.moving = false; p.from = h; p.nav = null; p.x = DOOR[h][0]; p.y = DOOR[h][1] + 14; if (p.outGoals) p.goals = p.outGoals;
  }
  if (want === 'out') return;
  if (want === 'away') {   // off to town: along the road to the edge of the map, and gone
    if (p.dest !== 'away') { p.dest = 'away'; p.routeT = 0; p.nav = null; }
    p.routeT += dt;
    if (watched('out') && p.routeT < 90 && !walkPath(p, TOWN[0], TOWN[1], sp, dt, 'out')) return;
    p.where = 'away'; p.dest = null; p.nav = null; p.moving = false; logEv(NAMES[p.look] + ' se fue al pueblo.', [p.look]); return;
  }
  if (p.dest !== want) { p.dest = want; p.routeT = 0; p.nav = null; }
  p.routeT += dt;
  if (watched('out') && p.routeT < 90 && !walkPath(p, DOOR[want][0], DOOR[want][1], sp, dt, 'out')) return;
  p.where = want; p.nav = null; p.dest = null; p.moving = false; p.x = KDOOR.x; p.y = KIT.h - 14; p.dir = 0; p.goals = (want === CH[p.look].home ? p.base : CH[p.look].routine?.roomGoals?.[want]) || [[6.5 * T, 6 * T], [5 * T, 5.6 * T]]; p.goal = 0; p.wait = 2;
  logEv(NAMES[p.look] + (want === p.house ? ' volvió a su casa.' : HOUSES[want].arrive), [p.look]);
}
