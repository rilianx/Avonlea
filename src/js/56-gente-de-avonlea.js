/* ---------- the people of Avonlea: the children who go to school, the teacher, the shopkeeper, the minister, the
   farmers... (to add one: an entry here). Each goes about the day as its kind says (home: the building where it lives),
   along the roads; tapped, it says one of its lines (and Ana may answer). They are the village around Ana: they are
   not in the stories nor in the prompts of the AI (they cost nothing). ---------- */
const kidLook = (hair, dress, o = {}) => ({ hair, hairD: o.hairD || hair, dress, dressD: o.dressD || dress, skin: o.skin || '#f2cfb2', h: o.h || .82, ...o });
const FOLK_DEFS = {
  gilbert: { name: 'Gilbert Blythe', kind: 'alumno', home: 'Casa de los Blythe', play: 'lago', look: kidLook('#5a3a26', '#5a6e8a', { dressD: '#3e5068', coat: true, h: .88 }) },
  buhonero: { name: 'el buhonero', kind: 'buhonero', home: 'Pensión', look: { hair: '#2a1a14', hairD: '#1a0a04', beard: true, dress: '#6a4a3a', dressD: '#4a2a1a', coat: true, hatDark: true, skin: '#d8a888', h: 1.12 } },
  josie: { name: 'Josie Pye', kind: 'alumno', home: 'Casa de los Pye', play: 'aldea', look: kidLook('#e8cf86', '#c8a0d0', { dressD: '#a07ab0', style: 'curls', bow: '#f6d0e0' }) },
  gertie: { name: 'Gertie Pye', kind: 'alumno', home: 'Casa de los Pye', play: 'aldea', look: kidLook('#d8bf76', '#e0b090', { h: .76, bow: '#c84a5a' }) },
  ruby: { name: 'Ruby Gillis', kind: 'alumno', home: 'Casa de los Gillis', play: 'rio', look: kidLook('#f0d070', '#f0a0a8', { dressD: '#c87a84', style: 'curls', bow: '#fff4f6' }) },
  jane: { name: 'Jane Andrews', kind: 'alumno', home: 'Granja Andrews', play: 'escuela', look: kidLook('#8a5a3a', '#7a9a6a', { dressD: '#5a7a4a', style: 'braids' }) },
  prissy: { name: 'Prissy Andrews', kind: 'alumno', home: 'Granja Andrews', play: 'aldea', look: kidLook('#8a5a3a', '#b0a0c8', { dressD: '#8a7aa0', style: 'bun', h: .96 }) },
  charlie: { name: 'Charlie Sloane', kind: 'alumno', home: 'Granja Sloane', play: 'playa', look: kidLook('#c8a070', '#6a7a5a', { dressD: '#4a5a3a', coat: true, h: .86 }) },
  moody: { name: 'Moody Spurgeon', kind: 'alumno', home: 'Pensión', play: 'aldea', look: kidLook('#3a2a20', '#4a4a5a', { dressD: '#2a2a3a', coat: true, h: .84 }) },
  tillie: { name: 'Tillie Boulter', kind: 'alumno', home: 'Casa de los Potts', play: 'campo_rosado', look: kidLook('#6a4a30', '#e8c070', { dressD: '#c09a50', style: 'braids', h: .8 }) },
  felicity: { name: 'Felicity King', kind: 'alumno', home: 'Granja King', play: 'aldea', look: kidLook('#e0b860', '#a8c8e8', { dressD: '#7aa0c0', style: 'curls', bow: '#7aa0c0' }) },
  felix: { name: 'Felix King', kind: 'alumno', home: 'Granja King', play: 'bosque', look: kidLook('#c89050', '#8a6a4a', { dressD: '#6a4a2a', coat: true, h: .8 }) },
  cecily: { name: 'Cecily King', kind: 'alumno', home: 'Granja King', play: 'escuela', look: kidLook('#a87848', '#f0d8e0', { dressD: '#c8a8b0', style: 'braids', h: .76 }) },
  sara: { name: 'Sara Stanley', kind: 'alumno', home: 'Rose Cottage', play: 'puente', look: kidLook('#5a3a2a', '#e8e0c8', { dressD: '#c0b8a0', style: 'curls', bow: '#c8463a', h: .84 }) },
  phillips: { name: 'el Sr. Phillips', kind: 'maestro', home: 'Pensión', look: { hair: '#3a2a20', hairD: '#2a1a10', dress: '#3a3a44', dressD: '#2a2a30', coat: true, skin: '#eecaae', h: 1.1 } },
  allan: { name: 'el reverendo Allan', kind: 'iglesia', home: 'Casa parroquial', room: 'cp', look: { hair: '#5a4a3a', hairD: '#3a2a20', dress: '#26242a', dressD: '#18161a', coat: true, hatDark: true, skin: '#eecaae', h: 1.14 } },
  sraallan: { name: 'la Sra. Allan', kind: 'iglesia', home: 'Casa parroquial', room: 'cp', look: { hair: '#8a5a3a', hairD: '#6a3a20', style: 'bun', dress: '#6a8aa8', dressD: '#4a6a88', brooch: true, skin: '#f2cfb2', h: 1.08 } },
  lawson: { name: 'el Sr. Lawson', kind: 'tendero', home: 'Tienda de Lawson', look: { hair: '#9a9088', hairD: '#6a6058', style: 'old', dress: '#6a5a4a', dressD: '#4a3a2a', apron: '#f4efe4', coat: true, skin: '#eac6a8', h: 1.12 } },
  herrero: { name: 'el herrero', kind: 'tienda', home: 'Herrería', look: { hair: '#2a1a14', hairD: '#1a0a04', beard: true, dress: '#5a4a3a', dressD: '#3a2a1a', apron: '#4a3a2a', coat: true, skin: '#d8a888', h: 1.2 } },
  editor: { name: 'el editor de La Crónica', kind: 'tienda', home: 'La Crónica de Avonlea', look: { hair: '#7a6a5a', hairD: '#5a4a3a', dress: '#4a5a6a', dressD: '#3a4a5a', coat: true, skin: '#eecaae', h: 1.1 } },
  hetty: { name: 'la Srta. Hetty King', kind: 'paseo', home: 'Rose Cottage', look: { hair: '#4a3a30', hairD: '#2a1a10', style: 'bun', dress: '#3a3a4a', dressD: '#2a2a3a', brooch: true, skin: '#eecaae', h: 1.12 } },
  olivia: { name: 'Olivia King', kind: 'paseo', home: 'Rose Cottage', look: { hair: '#8a6a4a', hairD: '#6a4a2a', style: 'bun', dress: '#c8a0b0', dressD: '#a07a8a', skin: '#f2cfb2', h: 1.06 } },
  jasper: { name: 'Jasper Dale', kind: 'paseo', home: 'Casa de Jasper', look: { hair: '#6a5a4a', hairD: '#4a3a2a', dress: '#5a6a5a', dressD: '#3a4a3a', coat: true, skin: '#eecaae', h: 1.18 } },
  alec: { name: 'Alec King', kind: 'granjero', home: 'Granja King', look: { hair: '#6a4a30', hairD: '#4a2a10', dress: '#7a6a4a', dressD: '#5a4a2a', coat: true, hatDark: true, skin: '#e0b090', h: 1.16 } },
  janet: { name: 'Janet King', kind: 'paseo', home: 'Granja King', look: { hair: '#7a5a3a', hairD: '#5a3a1a', style: 'bun', dress: '#8a7a6a', dressD: '#6a5a4a', apron: '#f4efe4', skin: '#f0c8a8', h: 1.08 } },
  srapye: { name: 'la Sra. Pye', kind: 'paseo', home: 'Casa de los Pye', look: { hair: '#6a5a4a', hairD: '#4a3a2a', style: 'bun', dress: '#7a4a5a', dressD: '#5a2a3a', skin: '#eecaae', h: 1.1 } },
  sloane: { name: 'el Sr. Sloane', kind: 'granjero', home: 'Granja Sloane', look: { hair: '#8a7a6a', hairD: '#6a5a4a', style: 'old', dress: '#6a5a40', dressD: '#4a3a20', coat: true, skin: '#e0b090', h: 1.14 } },
  andrews: { name: 'el Sr. Andrews', kind: 'granjero', home: 'Granja Andrews', look: { hair: '#5a4a3a', hairD: '#3a2a1a', beard: true, dress: '#5a5a40', dressD: '#3a3a20', coat: true, hatDark: true, skin: '#e0b090', h: 1.16 } },
  peg: { name: 'Peg Bowen', kind: 'peg', home: 'Casa de Peg Bowen', look: { hair: '#8a8a88', hairD: '#5a5a58', style: 'old', dress: '#4a3a30', dressD: '#2a1a10', apron: '#6a5a40', skin: '#d8b090', h: 1.04 } },
  farero: { name: 'el capitán Jim', kind: 'farero', home: 'Casa del farero', look: { hair: '#e8e4dc', hairD: '#b8b4ac', beard: true, style: 'old', dress: '#2a3a5a', dressD: '#1a2a40', coat: true, skin: '#e0b090', h: 1.16 } },
  // --- the ones from the book that were missing
  stacy: { name: 'la Srta. Stacy', kind: 'maestro', home: 'Pensión', look: { hair: '#a8683a', hairD: '#80482a', style: 'bun', dress: '#6a8a6a', dressD: '#4a6a4a', brooch: true, skin: '#f2cfb2', h: 1.08 } },
  minnie: { name: 'Minnie May Barry', kind: 'juego', home: 'La Cuesta del Huerto', look: kidLook('#2a1a14', '#e8c0d0', { dressD: '#c098a8', style: 'curls', bow: '#c8463a', h: .64 }) },
  srbarry: { name: 'el Sr. Barry', kind: 'granjero', home: 'La Cuesta del Huerto', look: { hair: '#3a2a20', hairD: '#2a1a10', beard: true, dress: '#5a5040', dressD: '#3a3020', coat: true, hatDark: true, skin: '#e0b090', h: 1.18 } },
  maryjoe: { name: 'Mary Joe', kind: 'juego', home: 'La Cuesta del Huerto', look: { hair: '#5a3a2a', hairD: '#3a2010', style: 'bun', dress: '#8a7a6a', dressD: '#6a5a4a', apron: '#f4efe4', skin: '#e8c0a0', h: 1.06 } },
  jerry: { name: 'Jerry Buote', kind: 'granjero', home: 'Tejas Verdes', look: { hair: '#2a1a14', hairD: '#1a0a04', dress: '#6a5a3a', dressD: '#4a3a1a', coat: true, skin: '#e0b090', h: .98 } },
  medico: { name: 'el médico', kind: 'medico', home: 'Pensión', look: { hair: '#8a8278', hairD: '#5a5248', style: 'old', dress: '#2a2a30', dressD: '#18181e', coat: true, hatDark: true, beard: true, skin: '#eecaae', h: 1.14 } },
  srbell: { name: 'el Sr. Bell', kind: 'iglesia', home: 'Casa de los Pettibone', look: { hair: '#c8c0b0', hairD: '#9a9080', style: 'old', dress: '#3a3a40', dressD: '#2a2a30', coat: true, beard: true, skin: '#eecaae', h: 1.16 } },
  josephine: { name: 'la Srta. Josephine Barry', kind: 'paseo', home: 'La Cuesta del Huerto', look: { hair: '#d8d4cc', hairD: '#a8a49c', style: 'bun', dress: '#4a2a4a', dressD: '#2a1a2a', brooch: true, skin: '#eecaae', h: 1.06 } },
  spencer: { name: 'la Sra. Spencer', kind: 'paseo', home: 'Hotel White Sands', look: { hair: '#7a5a3a', hairD: '#5a3a1a', style: 'bun', dress: '#5a6a8a', dressD: '#3a4a6a', skin: '#f2cfb2', h: 1.06 } },
  blewett: { name: 'la Sra. Blewett', kind: 'recado', home: 'Hotel White Sands', look: { hair: '#3a2a20', hairD: '#2a1a10', style: 'bun', dress: '#4a4a3a', dressD: '#2a2a1a', skin: '#e8c0a0', h: 1.08 } },
  carrie: { name: 'Carrie Sloane', kind: 'alumno', home: 'Granja Sloane', play: 'escuela', look: kidLook('#c8a070', '#e8d0a0', { dressD: '#c0a878', style: 'braids', h: .8 }) },
  jefe: { name: 'el jefe de estación', kind: 'jefe', home: 'Hotel White Sands', look: { hair: '#5a4a3a', hairD: '#3a2a1a', dress: '#2a3a5a', dressD: '#1a2a40', coat: true, hatDark: true, beard: true, skin: '#e8c0a0', h: 1.14 } },
  thomas: { name: 'Thomas Lynde', kind: 'granjero', home: 'La Hondonada de Lynde', look: { hair: '#8a7a6a', hairD: '#6a5a4a', style: 'old', dress: '#5a5a48', dressD: '#3a3a28', coat: true, skin: '#e0b090', h: 1.12 } },
  veraneante: { name: 'una veraneante del hotel', kind: 'playa', home: 'Hotel White Sands', look: { hair: '#c8a060', hairD: '#a07a40', style: 'bun', dress: '#f4f0f8', dressD: '#c8c0d8', collar: '#c8a0d0', skin: '#f6dcc8', h: 1.08 } },
  pescador: { name: 'un pescador', kind: 'playa', home: 'Casa del farero', look: { hair: '#5a4a3a', hairD: '#3a2a1a', beard: true, dress: '#c8a040', dressD: '#a07a20', coat: true, skin: '#d8a080', h: 1.16 } },
};
// and the neighbours one does not know by name: on their errands along the roads, strolling, the little ones at play
{ const r = rng(2024), pk = a => a[Math.floor(r() * a.length)], homes = BUILDINGS.filter(b => b.style === 'casa' || b.style === 'granja').map(b => b.name);
  const DRESS = ['#8a6a8a', '#6a8aa8', '#a86a5a', '#7a9a6a', '#c8a070', '#5a6a8a', '#b88aa0', '#8a7a5a'], COAT = ['#4a4a54', '#5a4a3a', '#6a5a40', '#3a4a5a', '#5a5a40'], HAIR = ['#3a2a20', '#6a4a30', '#8a6a4a', '#c8a070', '#2a1a14', '#9a9088'];
  for (let n = 0; n < 18; n++) {
    const kind = n < 9 ? 'recado' : n < 14 ? 'paseo' : 'juego', woman = r() < .5, kid = kind === 'juego', hair = pk(HAIR);
    const look = kid ? { hair, dress: pk(DRESS), skin: '#f2cfb2', h: .7 + r() * .08, ...(woman ? { style: r() < .5 ? 'braids' : 'curls', bow: pk(DRESS) } : { coat: true }) }
      : woman ? { hair, style: 'bun', dress: pk(DRESS), skin: pk(['#f2cfb2', '#eecaae', '#e8c0a0']), h: 1.04 + r() * .08, ...(r() < .4 ? { apron: '#f4efe4' } : {}) }
      : { hair, dress: pk(COAT), coat: true, skin: pk(['#eecaae', '#e0b090', '#e8c0a0']), h: 1.1 + r() * .1, ...(r() < .4 ? { hatDark: true } : {}), ...(r() < .3 ? { beard: true } : {}), ...(hair === '#9a9088' ? { style: 'old' } : {}) };
    FOLK_DEFS['v' + n] = { name: kid ? (woman ? 'una niñita' : 'un niñito') : woman ? pk(['una vecina', 'una señora de la aldea', 'una granjera']) : pk(['un vecino', 'un granjero', 'un señor de Carmody']), kind, home: pk(homes), look,
      lines: (kid ? FRASES['niño'] : FRASES.vecino)?.dice || [] };
  } }
// (what they say: src/datos/frases.txt)
for (const [k, d] of Object.entries(FOLK_DEFS)) if (!/^v\d+$/.test(k)) { d.lines = FRASES[k]?.dice || []; d.ana = FRASES[k]?.ana || []; }
for (const [k, d] of Object.entries(FOLK_DEFS)) LOOKS['f:' + k] = { hairD: d.look.hair, dressD: d.look.dress, scarf: '#a85a4a', ...d.look };
const BLD = n => BUILDINGS.find(b => b.name === n) || Object.values(HOUSES).find(h => h.name === n)?.at;
const door = n => { const b = BLD(n); return [b.x, b.y + 36]; };
const YARD = [(SCHOOL.x + MILK.x) / 2, (SCHOOL.y + 60 + MILK.y) / 2], SCHOOL_DOOR = [SCHOOL.x, SCHOOL.y + 30], CHURCH_DOOR = [CHURCH.x, CHURCH.y + 50];
const PLAY = { lago: [PLACES.lago[1], PLACES.lago[2]], aldea: [PLACES.aldea[1], PLACES.aldea[2] + 30], rio: [PLACES.rio[1] - 30, PLACES.rio[2] + 40], escuela: YARD, playa: [PLACES.playa[1], PLACES.playa[2]],
  campo_rosado: [PLACES.campo_rosado[1], PLACES.campo_rosado[2] + 80], puente: [BRIDGES_COVERED_AT()[0] - 120, BRIDGES_COVERED_AT()[1] + 60], bosque: [WOODS[1].x + WOODS[1].rx * .9, WOODS[1].y] };
const STROLL_SPOTS = [PLAY.aldea, door('Tienda de Lawson'), door('Ayuntamiento'), door('La Crónica de Avonlea'), CHURCH_DOOR, PLAY.puente, door('Pensión'), door('Rose Cottage')];
const fieldNear = ([x, y]) => { let best = null, bd = 1e9; for (const f of FIELDS) { const d = dist(x, y, f.x + f.w / 2, f.y + f.h / 2); if (d < bd) { bd = d; best = f; } } return best; };
// a few steps about the place, on dry land all the way (not across the brook by the school)
const caminoSeco = (x0, y0, x1, y1) => { for (let i = 1; i <= 8; i++) { const x = x0 + (x1 - x0) * i / 8, y = y0 + (y1 - y0) * i / 8; if (inLake(x, y) || inBrook(x, y) || inSea(x, y)) return false; } return true; };
const IN = (at, room = 'in') => ({ k: room + ':' + at.map(Math.round), at, in: room, r: 0 });
const OUT = (at, r = 90) => ({ k: 'out:' + at.map(Math.round), at, r });
// a day with no classes (Sunday, summer): the children play, the teacher walks in the village
const FOLK_LIBRE = {
  alumno: (h, f) => h < 8 || h >= 20.5 ? IN(f.home) : h < 17.6 ? OUT(PLAY[f.def.play] || PLAY.aldea, 170) : OUT(f.home, 110),
  maestro: (h, f) => h < 9 || h >= 21 ? IN(f.home) : h < 17 ? OUT(PLAY.aldea, 140) : OUT(f.home, 60),
};
// what each kind does at each hour (h: 6 .. 30)
const FOLK_KINDS = {
  alumno: (h, f) => h < 7.4 || h >= 20.5 ? IN(f.home) : h < 8.4 ? OUT(f.home, 110) : h < 9 || (h >= 10.5 && h < 10.9) || (h >= 12 && h < 13) ? OUT(YARD, 170) : h < 15.5 ? IN(SCHOOL_DOOR, 'es') : h < 17.6 ? OUT(PLAY[f.def.play] || YARD, 170) : OUT(f.home, 110),
  maestro: (h, f) => h < 8.2 || h >= 21 ? IN(f.home) : h < 8.8 ? OUT(SCHOOL_DOOR, 40) : h < 15.6 ? IN(SCHOOL_DOOR, 'es') : h < 17 ? OUT(PLAY.aldea, 140) : OUT(f.home, 60),
  tienda: (h, f) => h >= 7.6 && h < 18.5 ? OUT(f.home, 70) : h >= 18.5 && h < 20 ? OUT(PLAY.aldea, 120) : IN(f.home),
  granjero: (h, f) => (h >= 6.5 && h < 11.8) || (h >= 13 && h < 18.6) ? OUT(f.field, Math.min(f.fieldR, 260)) : h < 21 ? OUT(f.home, 80) : IN(f.home),
  paseo: (h, f) => h >= 9 && h < 18.5 ? OUT(STROLL_SPOTS[(f.n * 3 + Math.floor(h * .8)) % STROLL_SPOTS.length], 110) : h < 20.5 && h >= 7 ? OUT(f.home, 80) : IN(f.home),
  iglesia: (h, f) => h >= 8 && h < 19 ? OUT(Math.floor(h + f.n) % 3 ? CHURCH_DOOR : f.home, 110) : IN(f.home, f.def.room),
  peg: (h, f) => h >= 7 && h < 20 ? OUT([WOODS[1].x + Math.cos(Math.floor(h)) * WOODS[1].rx * .7, WOODS[1].y + Math.sin(Math.floor(h)) * WOODS[1].ry * .6], 200) : IN(f.home),
  farero: (h, f) => h >= 6 && h < 21 ? OUT(Math.floor(h) % 3 ? [FARO.x + 60, FARO.y + 60] : PLAY.playa, 120) : OUT([FARO.x + 30, FARO.y + 40], 20),
  playa: (h, f) => h >= 8 && h < 19 ? OUT(PLAY.playa, 260) : IN(f.home),
  tendero: (h, f) => h >= 8 && h < 18 ? IN(f.home, 'tl') : h >= 18 && h < 20 ? OUT(PLAY.aldea, 120) : IN(f.home),
  recado: (h, f) => h >= 7.5 && h < 19.5 ? OUT(ERRANDS[(f.n * 7 + Math.floor(h / 1.5)) % ERRANDS.length], 60) : IN(f.home),
  juego: (h, f) => h >= 8 && h < 19 ? OUT(f.home, 170) : IN(f.home),
  buhonero: (h, f) => h >= 8 && h < 18.5 ? OUT(ERRANDS[(f.n * 5 + Math.floor(h * 1.3)) % ERRANDS.length], 60) : IN(f.home),
  jefe: () => ({ k: 'br:jefe', at: [BRS.house.x + 50, BRS.house.y + 26], in: 'br', r: 0 }),
  medico: (h, f) => h >= 8 && h < 19 ? OUT(Math.floor(h) % 3 ? PLAY.aldea : f.home, 110) : IN(f.home),
};
const FARO = BUILDINGS.find(b => b.style === 'faro');
const ERRANDS = [...BUILDINGS.filter(b => b.style !== 'faro').map(b => door(b.name)), SCHOOL_DOOR, CHURCH_DOOR, [STATION.x, STATION.y + 60], PLAY.aldea, PLAY.puente];
const FOLK = Object.entries(FOLK_DEFS).map(([k, d], n) => {
  const home = door(d.home), fl = d.kind === 'granjero' ? fieldNear(home) : null;
  return Object.assign(mkPerson('f:' + k, ...home), { id: k, def: d, n, home, field: fl ? [fl.x + fl.w / 2, fl.y + fl.h / 2] : home, fieldR: fl ? Math.min(fl.w, fl.h) / 2 : 80, where: 'in', route: [], wait: 0, key: '', plan: null, re: 0, kid: d.look.h < .99, inAt: home });
});
const FOLKBY = Object.fromEntries(FOLK.map(f => [f.id, f]));
const seen = (x, y, m = 160) => viewScene() === 'out' && view.Z && x > view.ox - m && x < view.ox + innerWidth / view.Z + m && y > view.oy - m && y < view.oy + innerHeight / view.Z + m;
function folkSeat(f){
  if (f.where === 'br') { f.x = BRS.house.x + 50; f.y = BRS.house.y + 26; f.dir = 2; f.sit = false; return; }   // (the stationmaster, at his door)
  if (f.where === 'cp') { const s = f.id === 'allan' ? [CP.sillon.x, CP.sillon.y - 4, 2] : CP_SILLAS[0]; f.x = s[0]; f.y = s[1]; f.dir = s[2]; f.sit = true; return; }   // (at the parsonage: he in his armchair, she at the tea table)
  if (f.where === 'tl') { f.x = SHOP_IN.counter.x + 30; f.y = SHOP_IN.counter.y - 22; f.dir = 2; f.sit = false; return; }   // (behind the counter)   // in the school: the pupils at their desks (Ana's is the sixth), the teacher by the blackboard
  if (f.def.kind === 'maestro') { f.x = 6.5 * T + 44 + (f.id === 'stacy' ? 70 : 0); f.y = 3.2 * T + 14; f.dir = 2; f.sit = false; return; }
  const pupils = FOLK.filter(q => q.def.kind === 'alumno'), i = pupils.indexOf(f), seats = SCHOOL_DESKS.filter((_, j) => j !== 5);
  if (i < seats.length) { const d = seats[i]; f.x = d.x; f.y = d.y + 8; f.dir = 0; f.sit = true; } else { f.x = 1.2 * T + (i - seats.length) * 30; f.y = KIT.h - 30; f.dir = 0; f.sit = false; }
}
function folkGo(f, pl){
  if (f.where !== 'out') { f.where = 'out'; f.sit = false; [f.x, f.y] = f.inAt; }
  if (!seen(f.x, f.y) && !seen(...pl.at)) {   // nobody sees them: they are already there
    [f.x, f.y] = pl.at; f.route = []; f.moving = false;
    if (pl.in) { f.where = pl.in; f.inAt = pl.at; if (pl.in !== 'in') folkSeat(f); }
    return;
  }
  const r = dist(f.x, f.y, ...pl.at) > 500 ? netRoute(f.x, f.y, ...pl.at) : null;
  f.route = r ? [...r.pts, pl.at] : [pl.at]; f.wait = 0;
}
function folkTick(dt){
  const h = hourNow();
  for (const f of FOLK) {
    if (f.where === 'away') { if ((f.re -= dt) > 0 || (f.re = 1, ausente(f.id))) continue; f.where = 'in'; [f.x, f.y] = f.inAt = f.home; f.key = ''; }   // (back in Avonlea: at home)
    if (wmDriven(f.id)) continue;
    if ((f.re -= dt) <= 0) { f.re = .8 + Math.random() * .6; if (ausente(f.id)) { Object.assign(f, { where: 'away', route: [], moving: false, sit: false, key: '', plan: null }); continue; }   // (away from Avonlea, as in the book: src/datos/llegadas.txt)
      const pl = (!hayClases() && FOLK_LIBRE[f.def.kind] || FOLK_KINDS[f.def.kind])(h, f); if (pl.k !== f.key) { f.key = pl.k; f.plan = pl; folkGo(f, pl); } }
    if (f.where !== 'out') continue;
    if (f.talkT > TT) { f.moving = false; continue; }
    if (f.route.length) {
      const [tx, ty] = f.route[0], dx = tx - f.x, dy = ty - f.y, d = Math.hypot(dx, dy), sp = (f.kid ? (f.route.length === 1 && !f.plan.in && f.plan.r > 100 ? 62 : 46) : 36) * dt;
      if (d <= sp) { f.x = tx; f.y = ty; f.route.shift(); if (!f.route.length) { f.moving = false; if (f.plan.in) { f.where = f.plan.in; f.inAt = f.plan.at; if (f.plan.in !== 'in') folkSeat(f); } } }
      else { f.x += dx / d * sp; f.y += dy / d * sp; f.moving = true; f.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0); f.walk = (f.walk + 1.8 * sp / SPEED) % 1; }
    } else if (f.plan && f.plan.r > 0 && (f.wait -= dt) <= 0) {   // about the place: a few steps here and there (the children play)
      f.wait = f.kid ? 1 + Math.random() * 3 : 3 + Math.random() * 7;
      for (let k = 0; k < 6; k++) { const a = Math.random() * TAU, q = Math.sqrt(Math.random()) * f.plan.r, x = f.plan.at[0] + Math.cos(a) * q, y = f.plan.at[1] + Math.sin(a) * q * .7; if (!blockedOut(x, y) && caminoSeco(f.x, f.y, x, y)) { f.route = [[x, y]]; break; } }
    } else if (!f.moving && Math.random() < dt * .2) f.dir = [0, 1, 2, 3][Math.floor(Math.random() * 4)];
  }
}
