/* ---------- animals (to add one: an entry here) ----------
   kind 'cow': grazes in its home (a pen or a field of AREAS), can get loose, be led on a rope, be sold; kind 'parrot':
   lives in a room and talks (talks: it can say a line in the scenes, and says its own when Ana is there: «animal:<id>»
   in src/datos/dichos/41-mundo.txt) */
const ANIMALS = {
  dolly: { name: 'Dolly', kind: 'cow', owner: 'ana', home: 'corral', desc: 'la vaquita jersey de Ana, que vive en el corral de Tejas Verdes y es experta en escaparse' },
  jersey: { name: 'la vaca jersey del Sr. Harrison', kind: 'cow', owner: 'harrison', home: 'potrero', desc: 'la vaca jersey del Sr. Harrison, idéntica a Dolly' },
  ginger: { name: 'Ginger', kind: 'parrot', owner: 'harrison', room: 'hh', talks: true, desc: 'el loro del Sr. Harrison, que suelta frases inoportunas (nunca groserías de verdad)' },
};
const ANIM = {};
for (const [k, d] of Object.entries(ANIMALS)) { const A = d.home && AREAS[d.home], at = d.kind === 'parrot' ? [HHR.cage.x, HHR.cage.y] : [A.x + A.w / 2 + (k.length % 3 - 1) * 20, A.y + A.h / 2]; ANIM[k] = { id: k, look: k, kind: d.kind, x: at[0], y: at[1], dir: 1, walk: 0, moving: false, where: d.room || 'out', state: 'home', area: d.home || null, owner: d.owner, headTop: d.kind === 'cow' ? 30 : 64 }; }
// a checklist for new entries: anything missing is reported in the console when the page loads
(function checkRegistry(){
  const bad = [], need = (ok, msg) => { if (!ok) bad.push(msg); };
  for (const [k, c] of Object.entries(CH)) {
    const w = m => k + ': ' + m;
    for (const f of ['name', 'fullName', 'voice', 'giftReply']) need(typeof c[f] === 'string' && c[f], w('falta ' + f));
    need(typeof c.article === 'string', w('falta article ("" o "la ")'));
    need(c.look && c.look.hair && c.look.dress && c.look.skin && c.look.h, w('falta look (hair, dress, skin, h...)'));
    need(Array.isArray(c.spawn) && c.spawn.length === 2 && Array.isArray(c.goals) && c.goals.length && c.wait >= 0, w('falta spawn, goals o wait'));
    need(c.home === 'out' || c.home === 'away' || HOUSES[c.home], w('home debe ser "out", "away" (vive fuera) o una casa de HOUSES'));
    need(c.abil && ['ir', 'visitar', 'regalar', 'regar', 'cocinar', 'acompanar'].every(f => f in c.abil), w('abil necesita ir, visitar, regalar, regar, cocinar y acompanar'));
    need(Array.isArray(c.gossip) && c.gossip.every(g => CH[g]) && Array.isArray(c.kin), w('gossip y kin deben ser listas de personajes'));
    need(Array.isArray(c.lines) && c.lines.length && Array.isArray(c.seasonLines) && c.seasonLines.length === 4, w('lines (frases) y seasonLines (4: una por estación)'));
    if (c.routine) {
      need(typeof c.routine.want === 'function' && c.routine.describe && c.routine.roomGoals, w('routine necesita want(hr, día), describe y roomGoals'));
      for (const h of Object.keys(c.routine.roomGoals || {})) need(HOUSES[h], w('roomGoals[' + h + '] no es una casa'));
    }
  }
  for (const [k, h] of Object.entries(HOUSES)) {
    const w = m => 'casa ' + k + ': ' + m, I = h.interior || {};
    need(h.at && h.name && h.depth && h.roof && h.wall && h.trim && h.sign && h.enter && h.inText && h.arrive && h.place && h.describe, w('faltan datos del exterior'));
    need(['draw', 'items', 'blocked', 'glow'].every(f => typeof I[f] === 'function') && I.place, w('interior necesita draw, items, blocked, glow y place'));
  }
  if (bad.length) console.warn('[avonlea] fichas incompletas:\n' + bad.join('\n'));
})();
for (const k of Object.keys(CH)) game.fond[k] = 0;
const toby = { where: 'out', mode: null, goal: null, until: 0, x: GG.x - 90, y: GG.y + 46, dir: 1, walk: 0, moving: false, sitT: 0, sniff: 0, petted: 0, c: '#e09a4c', ph: 0 };   // (Pelusa, the cat of Green Gables: she goes her own way)
const SPEED = 84, WALK = 50, RUN = 90, STROLL = 34, MAPWALK = 64;   // (SPEED is the reference the step animation is scaled by)
function blockedOut(x, y){
  return x < 16 || y < 40 || x > WW - 16 || y > WH - 8 || inLake(x, y, 6) || inBrook(x, y, 2) || inSea(x, y, 4) || inHouses(x, y, 2) || nearFence(x, y) ||
    treesNear(x, y).some(t => Math.hypot(t.x - x, (t.y - y) * 1.6) < 11 * t.s) || dist(x, y, PUMP.x, PUMP.y) < 9;
}
function blockedIn(x, y, scene = game.scene){
  if (scene === 'camino') return roadBlocked(x, y);
  if (x < 14 || x > KIT.w - 14 || y < 2.4 * T + 8 || (y > KIT.h - 4 && Math.abs(x - KDOOR.x) > 16)) return true;
  return ROOMS[scene].blocked(x, y);
}
// (SCN: the scene whoever is walking is in, when it is not Ana's: the one being watched)
let SCN = null; const curScene = () => SCN || game.scene;