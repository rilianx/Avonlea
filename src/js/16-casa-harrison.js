/* ---------- Mr. Harrison's house: a mess of unwashed dishes and newspapers, and Ginger in his cage ---------- */
function drawHarrisonRoom(c, t, night){
  c.fillStyle = '#a98762'; c.fillRect(0, 0, KIT.w, KIT.h);
  c.strokeStyle = 'rgba(90,60,35,.35)'; c.lineWidth = 1; for (let y = 2.4 * T; y < KIT.h; y += 14) { c.beginPath(); c.moveTo(0, y); c.lineTo(KIT.w, y); c.stroke(); for (let x = (y / 14 % 2) * 40 + 30; x < KIT.w; x += 80) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 14); c.stroke(); } }
  blob(c, [[0, 0], [KIT.w, 0], [KIT.w, 2.4 * T], [0, 2.4 * T]], '#e4dcbf');
  for (const [x, y, w, h] of [[40, 18, 30, 22], [230, 30, 24, 16], [330, 12, 20, 28]]) blob(c, [[x, y], [x + w, y + 2], [x + w - 2, y + h], [x + 1, y + h - 2]], 'rgba(200,185,150,.55)', false);   // (the wallpaper peeling)
  c.fillStyle = '#6a4a30'; c.fillRect(0, 2.4 * T - 5, KIT.w, 5);
  const wx = 6.6 * T;
  blob(c, [[wx - 30, 12], [wx + 30, 12], [wx + 30, 52], [wx - 30, 52]], night > .3 ? '#34416a' : '#b8cdd2');
  c.fillStyle = 'rgba(150,140,120,.35)'; c.fillRect(wx - 30, 12, 60, 40);   // (a window nobody has washed)
  c.strokeStyle = '#6a4a30'; c.lineWidth = 3; c.beginPath(); c.moveTo(wx, 12); c.lineTo(wx, 52); c.moveTo(wx - 30, 32); c.lineTo(wx + 30, 32); c.stroke();
  // the stove, with a pot on it
  const sx = HHR.stove.x, sy = HHR.stove.y;
  blob(c, [[sx - 26, sy - 36], [sx + 26, sy - 36], [sx + 26, sy], [sx - 26, sy]], '#3a3436'); blob(c, [[sx + 14, sy - 36], [sx + 20, sy - 36], [sx + 20, -10], [sx + 14, -10]], '#2d2829');
  ell(c, sx - 6, sy - 40, 9, 5, '#5a5458', true); blob(c, [[sx - 8, sy - 20], [sx + 6, sy - 20], [sx + 6, sy - 8], [sx - 8, sy - 8]], `rgba(255,${130 + 40 * Math.sin(t * 6)},60,.85)`);
  // newspapers all over the floor
  for (const [x, y, r] of [[3 * T, 7.4 * T, .2], [9.4 * T, 7.6 * T, -.3], [4.6 * T, 3.4 * T, .5], [11.6 * T, 6.8 * T, .1], [8.2 * T, 3.3 * T, -.4]]) { c.save(); c.translate(x, y); c.rotate(r); blob(c, [[-14, -9], [14, -9], [14, 9], [-14, 9]], '#efe9d8'); for (let k = -6; k <= 6; k += 3) line(c, [[-11, k], [11, k]], 'rgba(70,60,50,.35)', .8, k); c.restore(); }
  blob(c, [[KDOOR.x - 18, KIT.h], [KDOOR.x - 18, KIT.h - 6], [KDOOR.x + 18, KIT.h - 6], [KDOOR.x + 18, KIT.h]], '#6a4a30');
}
function drawHarrisonTable(c){
  const x = HHR.table.x, y = HHR.table.y;
  ell(c, x, y + 2, 46, 8, 'rgba(40,25,15,.22)');
  for (const cx of [-40, 40]) blob(c, [[x + cx - 4, y], [x + cx + 4, y], [x + cx + 4, y - 22], [x + cx - 4, y - 22]], '#6a4a30');
  blob(c, [[x - 46, y - 22], [x + 46, y - 22], [x + 42, y - 40], [x - 42, y - 40]], '#7a5536');
  for (const [dx, dy, r] of [[-28, -30, 7], [-14, -33, 6], [-20, -28, 6.5], [6, -31, 7], [20, -34, 5]]) ell(c, x + dx, y + dy, r, r * .45, '#f2ede2', true);   // (dirty plates, piled up)
  ell(c, x + 30, y - 33, 5, 4, '#9db3bf', true); blob(c, [[x - 4, y - 36], [x + 4, y - 36], [x + 4, y - 44], [x - 4, y - 44]], '#5a5458');
}
function drawCage(c, t){
  const x = HHR.cage.x, y = HHR.cage.y, g = ANIM.ginger, bob = g && TT < (g.talkT || 0) ? Math.abs(Math.sin(t * 14)) * 2 : Math.sin(t * 1.5) * .6;
  ell(c, x, y + 2, 14, 4, 'rgba(40,25,15,.22)');
  line(c, [[x, y], [x, y - 30]], '#5b3a28', 2.4); line(c, [[x - 10, y], [x + 10, y]], '#5b3a28', 2.4);
  // Ginger: green, a red head, a yellow beak
  const py = y - 46 - bob;
  ell(c, x, py + 6, 5, 7, '#4f9a4a', true); ell(c, x + 1, py - 2, 4, 3.6, '#d9433b', true); blob(c, [[x + 4, py - 2.4], [x + 7.5, py - 1], [x + 4, py + .6]], '#e8c24a');
  ell(c, x + 2, py - 3, .8, .8, '#1a1a1a'); line(c, [[x - 1, py + 12], [x - 3, py + 20]], '#3f7a3a', 2.4);
  // the cage around him
  c.strokeStyle = 'rgba(160,130,60,.9)'; c.lineWidth = 1;
  for (let k = -9; k <= 9; k += 3) { c.beginPath(); c.moveTo(x + k, y - 30); c.lineTo(x + k * .7, y - 64); c.stroke(); }
  ell(c, x, y - 64, 7, 2.4, 'rgba(0,0,0,0)', 'rgba(160,130,60,.9)'); ell(c, x, y - 30, 10, 3, '#b8963a', true);
}
HOUSES.hh.interior = {
  draw: drawHarrisonRoom, items: g => [{ y: HHR.table.y, draw: () => drawHarrisonTable(g) }, { y: HHR.cage.y, draw: () => drawCage(g, TT) }],
  blocked: (x, y) => (Math.abs(x - HHR.table.x) < 50 && y > HHR.table.y - 26 && y < HHR.table.y + 6) || dist(x, y, HHR.cage.x, HHR.cage.y) < 14 || (Math.abs(x - HHR.stove.x) < 30 && y < HHR.stove.y + 6),
  glow: () => [HHR.table.x, HHR.table.y - 40, 150, '255,190,110', .35], place: 'en la casa del Sr. Harrison: un desorden de platos sin lavar y periódicos, y Ginger, el loro, en su jaula',
  actions: add => { add('cage', HHR.cage.x, HHR.cage.y, 50, 'Mirar a Ginger', () => animalSays('ginger'), { hy: 40, hit: 36, pri: 3 }); },
};
const ROOMS = Object.fromEntries(Object.entries(HOUSES).map(([k, h]) => [k, h.interior]));
// the station at Bright River: the platform, the little station house, the pile of shingles where Ana waited for
// Matthew, the rails, and the cart and the mare at the road (it is outdoors, but a scene of its own, far away)
const BRS = { house: { x: 2.6 * T, y: 2.9 * T }, pile: { x: 10.2 * T, y: 4.4 * T }, lamp: { x: 6 * T, y: 2.95 * T }, cart: { x: 9.6 * T, y: 7.4 * T } };
function drawStation(c, t, night){
  c.fillStyle = S === 3 ? '#e9eef2' : ['#9cc66c', '#8db45c', '#b0a860'][S]; c.fillRect(0, 0, KIT.w, KIT.h);
  // far fields and the sky band at the top
  blob(c, [[0, 0], [KIT.w, 0], [KIT.w, 1.2 * T], [0, 1.2 * T]], night > .4 ? '#3d4a6e' : S === 3 ? '#dfe7ee' : '#cfe6ef', false);
  blob(c, [[0, 1.2 * T], [KIT.w * .3, .9 * T], [KIT.w * .7, 1.1 * T], [KIT.w, .85 * T], [KIT.w, 1.5 * T], [0, 1.5 * T]], S === 3 ? '#f2f5f7' : '#7fae5a', false);
  // the rails: sleepers and two lines of iron
  for (let x = 4; x < KIT.w; x += 14) blob(c, [[x, 1.55 * T], [x + 7, 1.55 * T], [x + 7, 2.2 * T], [x, 2.2 * T]], '#7a5a3e', false);
  line(c, [[0, 1.68 * T], [KIT.w, 1.68 * T]], '#5a5a62', 2.2, 11); line(c, [[0, 2.06 * T], [KIT.w, 2.06 * T]], '#5a5a62', 2.2, 12);
  // the platform of planks
  blob(c, [[0, 2.4 * T], [KIT.w, 2.4 * T], [KIT.w, 5.1 * T], [0, 5.1 * T]], '#c9a06a');
  c.strokeStyle = 'rgba(110,70,40,.35)'; c.lineWidth = 1; for (let y = 2.4 * T + 12; y < 5.1 * T; y += 12) { c.beginPath(); c.moveTo(0, y); c.lineTo(KIT.w, y); c.stroke(); }
  // the road below, where the cart waits
  blob(c, [[0, 6.6 * T], [KIT.w, 6.4 * T], [KIT.w, 8.4 * T], [0, 8.6 * T]], S === 3 ? '#d6d3cc' : '#d9bd8a');
  // the station house, with its sign
  const H = BRS.house;
  blob(c, [[H.x - 60, H.y], [H.x + 60, H.y], [H.x + 60, H.y - 52], [H.x - 60, H.y - 52]], '#d9c6a0'); hatch(c, H.x + 30, H.y - 50, 28, 48, 5);
  blob(c, [[H.x - 70, H.y - 50], [H.x + 70, H.y - 50], [H.x + 50, H.y - 78], [H.x - 50, H.y - 78]], '#7a4a3a');
  blob(c, [[H.x - 14, H.y], [H.x + 14, H.y], [H.x + 14, H.y - 34], [H.x - 14, H.y - 34]], '#6a4630');
  blob(c, [[H.x + 26, H.y - 22], [H.x + 50, H.y - 22], [H.x + 50, H.y - 40], [H.x + 26, H.y - 40]], night > .3 ? '#f5d58a' : '#bfe0ea');
  blob(c, [[H.x - 56, H.y - 46], [H.x - 18, H.y - 46], [H.x - 18, H.y - 34], [H.x - 56, H.y - 34]], '#fffaf0');
  c.fillStyle = '#3b2a1c'; c.font = '5px Georgia, serif'; c.textAlign = 'center'; c.fillText('BRIGHT RIVER', H.x - 37, H.y - 38);
  // a telegraph pole and the lamp
  line(c, [[KIT.w - 30, 2.3 * T], [KIT.w - 30, .5 * T]], '#6a4a30', 3, 21); line(c, [[KIT.w - 44, .7 * T], [KIT.w - 16, .7 * T]], '#6a4a30', 2, 22);
  drawTree(c, { kind: 'blossom', x: KIT.w - 46, y: 1.5 * T, s: .95, ph: 0 }, t);   // (the big wild cherry at the bend of the line: Ana's tree)
  const L = BRS.lamp; line(c, [[L.x, L.y], [L.x, L.y - 60]], '#3a3436', 2.4, 23); ell(c, L.x, L.y - 64, 6, 7, night > .3 ? '#ffe7a8' : '#e8e2cc', true);
}
function drawTrain(c, e){   // (it comes in from the right, stops a while, and goes on to White Sands)
  const x = e < 6 ? KIT.w + 200 - e / 6 * (KIT.w * .5 + 200) : e < 26 ? KIT.w * .5 : KIT.w * .5 - (e - 26) * (e - 26) * 6, y = 2.1 * T;
  for (let k = 0; k < 3; k++) { const cx = x + k * 96; blob(c, [[cx - 44, y], [cx + 44, y], [cx + 44, y - 40], [cx - 44, y - 40]], k ? '#7a3a2a' : '#2a2a30'); if (k) for (let j = -2; j <= 2; j++) blob(c, [[cx + j * 16 - 5, y - 30], [cx + j * 16 + 5, y - 30], [cx + j * 16 + 5, y - 20], [cx + j * 16 - 5, y - 20]], '#f5d58a', false); else { blob(c, [[cx - 30, y - 40], [cx - 18, y - 40], [cx - 18, y - 58], [cx - 30, y - 58]], '#2a2a30'); for (let j = 0; j < 3; j++) ell(c, cx - 24 - j * 10, y - 64 - j * 8 - Math.sin(TT * 3 + j) * 3, 7 + j * 3, 5 + j * 2, 'rgba(240,240,240,.7)'); } ell(c, cx - 26, y, 7, 7, '#1a1a1a'); ell(c, cx + 26, y, 7, 7, '#1a1a1a'); }
}
const drawStationPile = c => { const P = BRS.pile; for (let k = 0; k < 6; k++) blob(c, [[P.x - 34 + (k % 2) * 4, P.y - k * 4], [P.x + 34 - (k % 3) * 3, P.y - k * 4], [P.x + 34 - (k % 3) * 3, P.y - k * 4 - 4], [P.x - 34 + (k % 2) * 4, P.y - k * 4 - 4]], k % 2 ? '#b58a5a' : '#c99a66'); };
ROOMS.br = {
  draw: drawStation, place: 'en el andén de la estación de Bright River, al otro lado de la aldea, junto al mar, donde Matthew fue a buscar a Ana cuando llegó', exitLabel: 'Salir al camino',
  items: (g, t) => [{ y: BRS.pile.y, draw: () => drawStationPile(g) }, ...(Object.values(PEOPLE).some(p => p.where === 'br' && p.buggy) ? [{ y: BRS.cart.y + 1, draw: () => drawCart(g, { x: BRS.cart.x, y: BRS.cart.y, dir: 1, walk: 0, moving: false }, t) }] : []), ...(game.train && TT - game.train.t0 < 40 ? [{ y: 2.3 * T, draw: () => drawTrain(g, TT - game.train.t0) }] : [])],
  blocked: (x, y) => y < 2.5 * T || (Math.abs(x - BRS.house.x) < 66 && y < BRS.house.y + 4) || (Math.abs(x - BRS.pile.x) < 38 && y > BRS.pile.y - 26 && y < BRS.pile.y + 4),
  glow: () => [BRS.lamp.x, BRS.lamp.y - 60, 170, '255,200,120', .45],
  actions: add => {
    add('pila', BRS.pile.x, BRS.pile.y + 6, 50, ana.sit ? 'Levantarse' : 'Sentarse en la pila de tablas', () => { if (ana.sit) { ana.sit = false; return; } ana.sit = true; ana.x = BRS.pile.x; ana.y = BRS.pile.y + 2; ana.dir = 2; logEv('Ana se sentó en la pila de tablas de la estación de Bright River, donde esperó a Matthew el día que llegó.'); anaSays(pick(STATION_LINES)); }, { pri: 4, hy: 18, hit: 46 });
    add('vias', KIT.w / 2, 2.5 * T, 40, 'Mirar las vías', () => anaSays(pick(RAIL_LINES)), { pri: 6, hy: 20, hit: 40 });
    add('cerezo', KIT.w - 46, 1.5 * T, 50, 'Mirar el gran cerezo silvestre de la curva', () => anaSays(pick(CHERRY_LINES)), { pri: 5, hy: 30, hit: 40 });
    const m = PEOPLE.matthew; if (m.where === 'br' && m.buggy && !wmDriven('matthew')) add('calesa', BRS.cart.x, BRS.cart.y - 10, 60, '🐴 Volver a Tejas Verdes en la calesa con Matthew', () => { roadStart('matthew', 0, 1); roadJoin('matthew'); roadTramoIn('matthew', roadTramo(0)); }, { pri: 2, hy: 20, hit: 46 });
  },
};
HOUSES.br.interior = ROOMS.br;
const LIBRO1 = /*@libro1*/;