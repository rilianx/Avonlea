/* ---------- THE MAP OF AVONLEA: one local map, described in a few lines (in units U) and drawn by the game, the same
   every time. Like the old maps of the island: the sea to the north and east, Bright River station and its railway,
   the White Sands hotel and the lighthouse on the coast, the village at the crossroads (town hall, store, blacksmith,
   the newspaper...), the river under the covered bridge running down to the school and the Lake of Shining Waters,
   a patchwork of fields, the woods, and Green Gables down to the south-west.
   - COAST: the line where the land ends (the sea lies north and east of it); ROADS: named lines; RIVERS: their lines and
     bridges; WOODS: ellipses of trees; LUPINS: pink fields; BUILDINGS: houses one does not enter (a style and a name);
     MOMENTS: someone says something when Ana passes by. The houses one enters are in HOUSES (with their place here).
   To add anything: a line here. ---------- */
const MAP = {
  coast: [[0, 9], [12, 10.2], [22, 9.4], [30, 10.4], [40, 9.2], [50, 10], [60, 9.6], [66, 8], [70.5, 9.6], [74, 13.5], [79, 17.5], [84, 24], [88.5, 33], [92, 43], [94.5, 52], [96, 55]],
  places: { gg: [22, 64], os: [60, 64], barn: [15.5, 62.6], lake: [44, 57.5], ly: [30.5, 49.6], hh: [10.5, 72], avena: [12.6, 66.6], station: [9, 14.6], iglesia: [16, 22.2], escuela: [45.5, 40.6], tienda: [46.8, 27], town: [96, 60] },
  roads: {
    estacion: [[9.4, 15.4], [14, 18.4], [20, 23], [28, 26.4], [36, 28.8], [44, 30]],
    sur: [[44, 30], [41.5, 35], [37, 40], [33, 45], [30, 50.6], [26, 57], [22.6, 63.6]],
    escuela: [[41.5, 35], [44, 38.2], [45.3, 40.8]],
    hotel: [[44, 30], [41, 23], [37.5, 16], [35, 13.2]],
    asilo: [[41, 23], [43.4, 19.6]],
    iglesia: [[20, 23], [16.6, 22.8]],
    este: [[44, 30], [56, 30], [64, 31.2], [72, 35], [80, 44.6], [87, 53], [96, 60]],
    faro: [[64, 31.2], [67.6, 22], [70.2, 12.6]],
    blanco: [[22.6, 64.4], [30, 66.2], [38, 66.6], [47, 66.2], [54, 65.6], [60, 64.8]],   // the White Way of Delight
    lago: [[40, 66.4], [41.5, 61.6]],
    laguna: [[33, 45], [35.5, 51], [37, 56.5], [38.6, 60.6], [41.5, 61.6]],   // (past Barry's pond: the way Matthew brings Ana home)
  },
  rivers: [
    { name: 'el río', pts: [[60.5, 9.8], [58.6, 18], [56, 30], [52.6, 36], [48.2, 41.4], [45.4, 48], [44, 53.4]], bridges: [{ at: [56, 30], covered: true }] },
    { name: 'el arroyo', pts: [[46, 61.4], [47, 66.2], [48.6, 74], [50, 84]], bridges: [{ at: [47, 66.2] }] },
  ],
  woods: [{ name: 'el Bosque Encantado', at: [38, 74], r: [9, 5.5], pines: .85, haunted: true }, { name: 'el bosque de Peg Bowen', at: [12, 48], r: [7, 6], pines: .6 },
    { name: 'el bosque de los Cuthbert', at: [16, 55], r: [3.5, 3], pines: .5 }, { name: 'el bosque', at: [76, 40], r: [4, 3.5], pines: .5 }, { name: 'el bosque', at: [86, 70], r: [6, 6], pines: .6 }],
  lupins: [{ at: [22, 18.6], r: [5, 2.6] }],
  buildings: [
    { style: 'hotel', at: [35, 12.4], name: 'Hotel White Sands' }, { style: 'faro', at: [70.6, 11.8], name: 'El faro' },
    { style: 'salon', at: [36.6, 27.4], name: 'Ayuntamiento' }, { style: 'casa', at: [33.8, 31.8], name: 'Casa de los Pettibone' }, { style: 'tienda', at: [40.2, 26.8], name: 'La Crónica de Avonlea' },
    { style: 'casa', at: [38.6, 33.6], name: 'Casa de los Potts' }, { style: 'herreria', at: [48, 33.4], name: 'Herrería' },
    { style: 'casa', at: [51.4, 27.2], name: 'Pensión' }, { style: 'galpon', at: [66.4, 19.6], name: 'Fábrica de conservas' }, { style: 'casa', at: [60.4, 27], name: 'Casa de Jasper' },
    { style: 'casa', at: [60.6, 36.6], name: 'Rose Cottage' }, { style: 'granja', at: [38.4, 39], name: 'Granja King' }, { style: 'casa', at: [10.4, 46.4], name: 'Casa de Peg Bowen' },
    { style: 'casa', at: [82, 46.4], name: 'Casa de los Blythe' }, { style: 'salon', at: [43.6, 19.2], name: 'El asilo' },
    { style: 'casa', at: [40.6, 45], name: 'Casa de los Pye' }, { style: 'casa', at: [69.6, 32.4], name: 'Casa de los Gillis' }, { style: 'granja', at: [76.6, 38.6], name: 'Granja Andrews' },
    { style: 'granja', at: [24.6, 23.4], name: 'Granja Sloane' }, { style: 'casa', at: [12.4, 23.6], name: 'Casa parroquial' }, { style: 'casa', at: [68.2, 13.6], name: 'Casa del farero' },
  ],
  moments: [
    { at: [22, 19.6], estaciones: [0, 1, 2], lines: [['ana', '¡Señor Matthew! ¡Señor Matthew!'], ['matthew', '¿Qué... qué pasa, Ana?'], ['ana', '¡Mire! ¡Todo el campo se volvió rosado! ¿No le dan ganas de llorar de lo hermoso que es?'], ['matthew', 'Bueno, pues... es muy bonito, sí. Ya lo creo.']] },
    { at: [56, 30], lines: [['ana', '¡Un puente con techo! Es como cruzar el río por adentro de una caja de música.']] },
    { at: [12, 16.6], lines: [['ana', '¡El mar! ¡Y la arena es roja! Parece que la isla se hubiera puesto colorada.']] },
    { at: [34, 66.4], estaciones: [0], lines: [['ana', 'El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.']] },
  ],
};
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
// the houses: where they stand and how they look from outside, what they are called and how the AI describes them. Each gets its interior below (HOUSES[id].interior).
// To add a house: a place in MAP.places, an entry here, its interior with the others, and it shows up in the world, the map and the prompt.
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