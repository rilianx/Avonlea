/* ---------- going somewhere on the map: one taps a place on the map and Ana walks there, by the road ---------- */
let dest = null;
const NAMED = [...Object.values(HOUSES).map(h => [h.name, h.at.x, h.at.y + 40]), ...BUILDINGS.map(b => [b.name, b.x, b.y + 40]),
  ['el Lago de las Aguas Brillantes', LAKE.x, LAKE.y], ['el campo de flores rosadas', LUPINS[0].x, LUPINS[0].y], ['la playa', PLACES.playa[1], PLACES.playa[2]],
  ['el puente cubierto', BRIDGES_COVERED_AT()[0], BRIDGES_COVERED_AT()[1]], ['la aldea', PLACES.aldea[1], PLACES.aldea[2]], ['el granero', BARN.x, BARN.y + 40],
  ...WOODS.filter(w => w.name !== 'el bosque').map(w => [w.name, w.x, w.y])];
function BRIDGES_COVERED_AT(){ for (const w of WATERS) for (const b of w.bridges) if (b.covered) return [b.x, b.y]; return [0, 0]; }
function placeNear(x, y){ let best = null, bd = 520; for (const [n, px, py] of NAMED) { const d = dist(x, y, px, py); if (d < bd) { bd = d; best = n; } } return best; }
// (with its article: «a la pensión», «al hotel White Sands», «a la casa de los Pye»; a name of its own, as it is: «a Rose Cottage»)
const LUGAR_COMUN = { Hotel: 'el', Ayuntamiento: 'el', Casa: 'la', Herrería: 'la', Pensión: 'la', Fábrica: 'la', Granja: 'la' };
const toPlace = n => { const w = n.split(' ')[0], l = /^(La|El|Los|Las) /.test(n) ? n[0].toLowerCase() + n.slice(1) : LUGAR_COMUN[w] ? LUGAR_COMUN[w] + ' ' + w.toLowerCase() + n.slice(w.length) : n; return (l.startsWith('el ') ? 'al ' + l.slice(3) : 'a ' + l); };
function goDest(x, y){
  let p = [clamp(x, 40, WW - 40), clamp(y, 60, WH - 40)];
  // (a house one enters: to its door, and in; not to the nearest free spot, which may be behind it. On the map a finger
  // is wide and the roof and the name are drawn above the house: a tap on them, or near, is the house too)
  const casa = Object.entries(HOUSES).filter(([, h]) => !h.road && (inBox(h.at, h.depth, p[0], p[1], 40) || dist(p[0], p[1], h.at.x, h.at.y - h.depth / 2) < 360)).sort(([, a], [, b]) => dist(p[0], p[1], a.at.x, a.at.y) - dist(p[0], p[1], b.at.x, b.at.y))[0];
  if (casa) p = [casa[1].at.x, casa[1].at.y + 30];
  if (blockedOut(...p)) {   // in the sea, a lake, a house: the nearest place one can stand on
    let best = null;
    for (let r = 24; r < 900 && !best; r += 24) for (let k = 0; k < 24; k++) { const a = k / 24 * TAU, q = [p[0] + Math.cos(a) * r, p[1] + Math.sin(a) * r]; if (q[0] > 40 && q[1] > 60 && q[0] < WW - 40 && q[1] < WH - 40 && !blockedOut(...q)) { best = q; break; } }
    if (!best) return; p = best;
  }
  toggleMap(false); userInput();
  if (game.scene !== 'out' && retenida()) { salirSiPuede(() => {}); return; }
  if (game.scene !== 'out') { let sc = game.scene; while (game.scene !== 'out' && sc) { goOut(); if (game.scene === sc) break; sc = game.scene; } }
  if (game.scene !== 'out') return;
  if (cart.riding) cartOff();
  ana.sit = false; ana.lie = false; ana.nav = null;
  dest = { x: p[0], y: p[1] }; ana.goto = casa ? { id: 'h:' + casa[0], scene: 'out', dest: true } : { x: p[0], y: p[1], scene: 'out', dest: true };
  const n = placeNear(...p); anaSays(n ? '¡Vamos ' + toPlace(n) + '!' : pick(['¡Allá voy!', '¡En marcha!', '¡A ver qué hay por allá!']));
}
