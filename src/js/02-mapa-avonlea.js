/* ---------- THE MAP OF AVONLEA: one local map, described in a few lines (in units U) and drawn by the game, the same
   every time. Like the old maps of the island: the sea to the north and east, Bright River station and its railway,
   the White Sands hotel and the lighthouse on the coast, the village at the crossroads (town hall, store, blacksmith,
   the newspaper...), the river under the covered bridge running down to the school and the Lake of Shining Waters,
   a patchwork of fields, the woods, and Green Gables down to the south-west.
   - COAST: the line where the land ends (the sea lies north and east of it); ROADS: named lines; RIVERS: their lines and
     bridges; WOODS: ellipses of trees; LUPINS: pink fields; BUILDINGS: houses one does not enter (a style and a name);
     MOMENTS: someone says something when Ana passes by. The houses one enters are in HOUSES (with their place here).
   To add anything: draw it in Tiled (see docs/MAPAS.md); a moment: a line here. ---------- */
// the geometry is drawn in Tiled (src/mapas/avonlea.tmj, 1 tile = 1 unit U): the coast, the roads, the rivers and their
// bridges, the woods and the lupins, the buildings (their style is the object's type) and the places; here it is read
// back in units, as it always was. The moments stay here: they are words, not places.
const MAP = (() => {
  const M = MAPAS.avonlea, r = v => Math.round(v / U * 1e4) / 1e4, L = n => M.layers.find(l => l.name === n).objects;
  const pts = o => o.polyline.map(p => [r(o.x + p.x), r(o.y + p.y)]), at = o => [r(o.x), r(o.y)], prop = (o, k) => o.properties?.find(p => p.name === k)?.value;
  const mid = o => [r(o.x + o.width / 2), r(o.y + o.height / 2)], rad = o => [r(o.width / 2), r(o.height / 2)], rios = L('rios'), bos = L('bosques');
  return {
  coast: pts(L('costa')[0]),
  places: Object.fromEntries(L('lugares').map(o => [o.name, at(o)])),
  roads: Object.fromEntries(L('caminos').map(o => [o.name, pts(o)])),
  rivers: rios.filter(o => o.type === 'rio').map(o => ({ name: o.name, pts: pts(o), bridges: rios.filter(b => b.type === 'puente' && prop(b, 'rio') === o.name).map(b => ({ at: at(b), ...(prop(b, 'techado') ? { covered: true } : {}) })) })),
  woods: bos.filter(o => o.type === 'bosque').map(o => ({ name: o.name, at: mid(o), r: rad(o), pines: prop(o, 'pinos'), ...(prop(o, 'embrujado') ? { haunted: true } : {}) })),
  lupins: bos.filter(o => o.type === 'lupinos').map(o => ({ at: mid(o), r: rad(o) })),
  buildings: L('edificios').map(o => ({ style: o.type, at: at(o), name: o.name })),
  moments: [
    { at: [22, 19.6], estaciones: [0, 1, 2], lines: [['ana', '¡Señor Matthew! ¡Señor Matthew!'], ['matthew', '¿Qué... qué pasa, Ana?'], ['ana', '¡Mire! ¡Todo el campo se volvió rosado! ¿No le dan ganas de llorar de lo hermoso que es?'], ['matthew', 'Bueno, pues... es muy bonito, sí. Ya lo creo.']] },
    { at: [56, 30], lines: [['ana', '¡Un puente con techo! Es como cruzar el río por adentro de una caja de música.']] },
    { at: [12, 16.6], lines: [['ana', '¡El mar! ¡Y la arena es roja! Parece que la isla se hubiera puesto colorada.']] },
  ],
  };
})();
const mU = ([x, y]) => [x * U, y * U];
const segDist = (x, y, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], t = clamp(((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy), 0, 1); return Math.hypot(x - a[0] - dx * t, y - a[1] - dy * t); };
// (a quick lookup of segments by neighbourhood: is (x, y) within w of any of them?)
function segIndex(list, cell = 128){
  const m = new Map();
  for (const sg of list) { const [a, b] = sg; for (let cx = Math.floor(Math.min(a[0], b[0]) / cell); cx <= Math.floor(Math.max(a[0], b[0]) / cell); cx++) for (let cy = Math.floor(Math.min(a[1], b[1]) / cell); cy <= Math.floor(Math.max(a[1], b[1]) / cell); cy++) { const k = cx + ',' + cy; if (!m.has(k)) m.set(k, []); m.get(k).push(sg); } }
  return (x, y, w) => { const cx = Math.floor(x / cell), cy = Math.floor(y / cell), r = Math.ceil(w / cell); for (let i = -r; i <= r; i++) for (let j = -r; j <= r; j++) { const L = m.get((cx + i) + ',' + (cy + j)); if (L) for (const [a, b] of L) if (segDist(x, y, a, b) < w) return true; } return false; };
}
const PL = Object.fromEntries(Object.entries(MAP.places).map(([k, v]) => [k, mU(v)]));
const GG = { x: PL.gg[0], y: PL.gg[1], w: 7 * T };          // the front's middle, at the ground
const OS = { x: PL.os[0], y: PL.os[1], w: 6 * T };
const BARN = { x: PL.barn[0], y: PL.barn[1], w: 5 * T };
const LAKE = { x: PL.lake[0], y: PL.lake[1], rx: 15 * T, ry: 7 * T };
const LY = { x: PL.ly[0], y: PL.ly[1], w: 6 * T };
const HH = { x: PL.hh[0], y: PL.hh[1], w: 5 * T };   // Mr. Harrison's, the new neighbour
const STATION = { x: PL.station[0], y: PL.station[1], w: 5 * T };
const CHURCH = { x: PL.iglesia[0], y: PL.iglesia[1], w: 5 * T }, SCHOOL = { x: PL.escuela[0], y: PL.escuela[1], w: 5 * T }, SHOP = { x: PL.tienda[0], y: PL.tienda[1], w: 4.6 * T };
const TOWN = [WW - 30, PL.town[1]];   // where the road leaves Avonlea, towards Carmody (and Charlottetown)
// the sea: north and east of the coast
const COAST = MAP.coast.map(mU), SEA = [[-50, -50], [-50, COAST[0][1]], ...COAST, [WW + 50, COAST[COAST.length - 1][1]], [WW + 50, -50]];
function inPoly(P, x, y){ let c = false; for (let i = 0, j = P.length - 1; i < P.length; j = i++) { const [xi, yi] = P[i], [xj, yj] = P[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; }
const coastSegs = COAST.slice(1).map((p, i) => [COAST[i], p]), nearCoastI = segIndex(coastSegs, 256);
const SEAC = 64, seaGrid = new Uint8Array(Math.ceil(WW / SEAC) * Math.ceil(WH / SEAC)), seaCols = Math.ceil(WW / SEAC);   // (0 land, 1 sea, 2 the shore: asked exactly)
for (let cy = 0; cy * SEAC < WH; cy++) for (let cx = 0; cx < seaCols; cx++) { const x = (cx + .5) * SEAC, y = (cy + .5) * SEAC; seaGrid[cy * seaCols + cx] = nearCoastI(x, y, SEAC) ? 2 : inPoly(SEA, x, y) ? 1 : 0; }
const seaAt = (x, y) => { if (x < 0 || y < 0 || x >= WW || y >= WH) return y < WH * .2; const v = seaGrid[Math.floor(y / SEAC) * seaCols + Math.floor(x / SEAC)]; return v === 2 ? inPoly(SEA, x, y) : v === 1; };
const inSea = (x, y, m = 0) => seaAt(x, y) || (m > 0 && nearCoastI(x, y, m) && (seaAt(x, y - m) || seaAt(x + m, y) || seaAt(x, y + m) || seaAt(x - m, y)));
const nearCoast = (x, y, d) => nearCoastI(x, y, d);
// rivers and brooks, each with its bridges; the one between Green Gables and Orchard Slope is "the brook"
const RIVERS = MAP.rivers.map(r => ({ ...r, pts: r.pts.map(mU), bridges: r.bridges.map(b => ({ x: b.at[0] * U, y: b.at[1] * U, covered: !!b.covered })) }));
const brook = RIVERS[1].pts, BRIDGE = RIVERS[1].bridges[0];
const HHR = { table: { x: 6.4 * T, y: 5.4 * T }, cage: { x: 10.8 * T, y: 4.6 * T }, stove: { x: 2.4 * T, y: 3.2 * T } };   // (inside his house)
const PUMP = { x: GG.x + GG.w / 2 + 34, y: GG.y + 56 };
const BENCH = { x: LAKE.x - 50, y: LAKE.y - LAKE.ry - 30 };
const STOVE_SPOT = 'stove';
// the houses: where they stand and how they look from outside, what they are called and how they are described («describe»: kept for the AI to come). Each gets its interior below (HOUSES[id].interior).
// To add a house: a place in MAP.places, an entry here, its interior with the others, and it shows up in the world and the map.
const HOUSES = {
  gg: { at: GG, name: 'Tejas Verdes', depth: 110, roof: '#5f9a58', wall: '#f7f2e6', trim: '#4f7d47', small: false, sign: [-70, 96],
    enter: 'Entrar a casa', inText: 'en la cocina de Tejas Verdes', arrive: ' entró a la cocina de Tejas Verdes.', place: ['tejas_verdes', 'Tejas Verdes', -60, 76],
    describe: "Tejas Verdes (la granja de los Cuthbert, casa blanca de tejados verdes, al suroeste de la aldea, con su cocina, su huerta de seis canteros con rosas, girasoles y lilas, la bomba de agua y el granero)" },
  os: { at: OS, name: 'La Cuesta del Huerto', depth: 100, roof: '#9a5a3c', wall: '#efe0c8', trim: '#7a4a32', small: true, sign: [-90, 70],
    enter: 'Entrar a La Cuesta del Huerto', inText: 'en la salita de La Cuesta del Huerto', arrive: ' llegó a La Cuesta del Huerto.', place: ['cuesta_del_huerto', 'La Cuesta del Huerto', -50, 64],
    describe: "La Cuesta del Huerto (la casa de los Barry, al otro lado del arroyo y del lago, con su salita, su chimenea y su huerto de manzanos)" },
  rl: { at: LY, name: 'La Hondonada de Lynde', depth: 100, roof: '#6a7f96', wall: '#f1ead8', trim: '#4f647a', small: true, sign: [-96, 60], mapLabel: ['Hondonada de Lynde', 38],
    enter: 'Entrar a la casa de la Sra. Lynde', inText: 'en la casa de la Sra. Lynde', arrive: ' volvió a su casa.', place: ['hondonada_lynde', 'la casa de la Sra. Lynde', 20, 56],
    path: [[LY.x + 120, LY.y + 40], [LY.x + 24, LY.y + 42], [LY.x, LY.y + 8]],
    describe: "la Hondonada de Lynde (la casa de la Sra. Rachel Lynde, junto al camino de Tejas Verdes a la aldea, con la ventana desde donde ve pasar a todo el mundo)" },
  hh: { at: HH, name: 'La granja del Sr. Harrison', depth: 100, roof: '#8a7a5a', wall: '#e6dcc4', trim: '#6a5a3a', small: true, sign: [-80, 60], mapLabel: ['Sr. Harrison', 34],
    enter: 'Entrar a casa del Sr. Harrison', inText: 'en la casa del Sr. Harrison', arrive: ' entró a la casa del Sr. Harrison.', place: ['granja_harrison', 'la granja del Sr. Harrison', 24, 56],
    path: [[GG.x - 60, GG.y + 70], [GG.x - 6 * U, GG.y + 5 * U], [HH.x, HH.y + 8]],
    describe: "la granja del Sr. Harrison (el vecino nuevo, gruñón y desordenado, con su loro Ginger, su potrero y su campo de avena, que linda con Tejas Verdes)" },
  br: { road: true, at: STATION, name: 'La estación de Bright River', depth: 90, roof: '#7a4a3a', wall: '#d9c6a0', trim: '#6a4630', small: true, sign: [-96, 60], far: true, mapLabel: ['Estación de Bright River', 40],
    enter: 'Entrar al andén', inText: 'en la estación de Bright River', arrive: ' llegó a la estación de Bright River.', place: ['estacion', 'la estación de Bright River', 30, 56],
    describe: 'la estación de Bright River (junto al mar, al noroeste, donde llega el tren: donde Matthew fue a buscar a Ana cuando llegó)' },
  ig: { at: CHURCH, name: 'La iglesia', depth: 100, roof: '#6a5a50', wall: '#f4efe4', trim: '#5a4a40', small: true, style: 'iglesia', sign: [-90, 64], far: true,
    enter: 'Entrar a la iglesia', inText: 'en la iglesia de Avonlea', arrive: ' entró a la iglesia.', place: ['iglesia', 'la iglesia', 30, 56],
    describe: 'la iglesia de Avonlea (blanca, con su campanario, camino a Bright River; los domingos va todo el pueblo)' },
  es: { at: SCHOOL, name: 'La escuela', depth: 96, roof: '#7a3a2e', wall: '#c8574a', trim: '#f2ede2', small: true, style: 'escuela', sign: [-92, 62], far: true,
    enter: 'Entrar a la escuela', inText: 'en la escuela de Avonlea', arrive: ' entró a la escuela.', place: ['escuela', 'la escuela', 30, 56],
    describe: 'la escuela de Avonlea (roja, con su campana, junto al río donde los alumnos dejan enfriar sus botellas de leche; allí Ana estudia con Diana, y está Gilbert Blythe)' },
  tl: { at: SHOP, name: 'Tienda de Lawson', depth: 96, roof: '#8a5a3c', wall: '#e8d6b0', trim: '#5a3a28', small: true, style: 'tienda', sign: [-88, 62], far: true,
    enter: 'Entrar a la tienda', inText: 'en la tienda de Lawson', arrive: ' entró a la tienda de Lawson.', place: ['tienda_lawson', 'la tienda de Lawson', 30, 56],
    open: () => { const h = hourNow() % 24; return h >= 8 && h < 18; }, closed: 'La tienda está cerrada (abre de 8 a 18)',
    describe: 'la tienda de Lawson (en la aldea, con su toldo a rayas: azúcar, harina, hilo, cintas, caramelos de menta; se cambian huevos, fruta y tartas por lo que hace falta, y lo de la casa se anota en la libreta de cada familia)' },
};
const HOUSE_SPOTS = Object.values(HOUSES).map(h => h.at);
const BUILDINGS = MAP.buildings.map(b => ({ ...b, x: b.at[0] * U, y: b.at[1] * U, w: b.style === 'hotel' ? 9 * T : b.style === 'galpon' ? 7 * T : b.style === 'faro' ? 44 : 4.6 * T }));
// the town hall, where the concerts are: one can go in (the building itself is drawn with the others)
HOUSES.sa = { at: (b => ({ x: b.x, y: b.y, w: b.w }))(BUILDINGS.find(b => b.name === 'Ayuntamiento')), name: 'El salón del pueblo', noProp: true, small: true,
  enter: 'Entrar al salón del pueblo', inText: 'en el salón del pueblo', arrive: ' entró al salón del pueblo.', place: ['salon_pueblo', 'el salón del pueblo', 30, 56],
  describe: 'el salón del pueblo de Avonlea (donde se hacen los conciertos: un escenario con telón, bancos y, para las fiestas, guirnaldas de flores)' };
// the parsonage, where the minister and Mrs. Allan live: one can go in, to tea in the parlour (the house itself is drawn with the others)
HOUSES.cp = { at: (b => ({ x: b.x, y: b.y, w: b.w }))(BUILDINGS.find(b => b.name === 'Casa parroquial')), name: 'La casa parroquial', noProp: true, small: true,
  enter: 'Entrar a la casa parroquial', inText: 'en la salita de la casa parroquial', arrive: ' llegó a la casa parroquial.', place: ['casa_parroquial', 'la casa parroquial', 30, 56],
  describe: 'la casa parroquial (donde viven el reverendo Allan y la Sra. Allan, cerca de la iglesia, con su salita de las visitas: la chimenea, los libros del pastor y la mesita del té)' };
