/* ---------- the characters: all there is to know about each one is here ----------
   To add a character: one more entry in src/datos/personajes.json (name, look, voice for the AI, lines, abilities)
   and one below (where it lives, and a routine if it goes visiting) and nothing else: the names, the prompt for the AI, the dialogue, the map, the
   routines and the "Hablar con" prompts are all derived from the entries.
   - home: 'out' (Avonlea) or the house it lives in; spawn/goals: where it starts and strolls (in its home place)
   - routine (optional): where it is wanted at each hour, how it crosses the fields (home 'out') and where it stands
     in the rooms it visits (roomGoals); hostGoals: where a resident stands while someone is visiting
   - gossip: whom it tells what it has seen each morning; kin: who sees it work; whereText: what it is doing
   Diana is the companion (she walks with Ana, goes home at night): her moves are written out in update(). */
const ANA = { look: { hair: '#c0582e', hairD: '#8f3b1d', style: 'braids', dress: '#5c8c63', dressD: '#436b4a', collar: '#fbf6ea', hat: true, freckles: true, skin: '#f6d6bb', h: 1, scarf: '#d9433b' }, voice: "once años, huérfana, la adoptaron los Cuthbert. Pelirroja (detesta su pelo), pecosa, de imaginación desbordante, habla mucho y con palabras grandiosas (\"alma gemela\", \"espíritu afín\", \"hay tanto lugar para la imaginación\"), dramática, se mete en líos sin querer y es muy cariñosa." };
const DIANA_OUT = [[OS.x - 50, OS.y + 60], [OS.x + 80, OS.y + 140], [OS.x - 130, OS.y + 180], [OS.x + 20, OS.y + 70]], DIANA_IN = [[5.8 * T, 3.4 * T], [8.4 * T, 4.4 * T], [4.6 * T, 6.6 * T]];
const MEAL = hr => (hr >= 7 && hr < 8.5) || (hr >= 12 && hr < 13.5) || (hr >= 18 && hr < 19.5);
const mealWord = hr => hr < 10 ? { verb: 'desayunar', ing: 'desayunando', menu: 'avena con crema, pan con mantequilla y té' } : hr < 15 ? { verb: 'almorzar', ing: 'almorzando', menu: 'guiso de cordero con papas y pan casero' } : { verb: 'cenar', ing: 'cenando', menu: 'pan, queso, mermelada de ciruela y té' };
const CHARACTERS = {
  matthew: {
    spawn: [BARN.x + 60, BARN.y + 50], goals: [[BARN.x + 60, BARN.y + 50], [GG.x - 140, GG.y + 90], [BARN.x - 20, BARN.y + 70], [GG.x + 120, GG.y + 160]], wait: 3, speed: { walk: 40, out: 34, room: 26 },
    home: 'out',
    routine: { want: (hr, day) => MEAL(hr) ? 'gg' : 'out', roomGoals: { gg: [[TABLE.x - 6, TABLE.y + 48]] } },
  },
  marilla: {
    spawn: [TABLE.x + 70, TABLE.y + 30], goals: [[TABLE.x + 70, TABLE.y + 30], [STOVE.x + 60, STOVE.y + 40], [10.5 * T, 3.4 * T]], wait: 4, speed: { room: 30 },
    home: 'gg',
    hostGoals: [[TABLE.x + 64, TABLE.y + 34]],
  },
  diana: {
    spawn: [OS.x - 50, OS.y + 60], goals: DIANA_OUT, wait: 2, speed: {},
    home: 'out', init: { follow: false }, companion: true,
  },
  barry: {
    onMap: false,
    spawn: [8.6 * T, 4.4 * T], goals: [[8.6 * T, 4.4 * T], [11.4 * T, 6 * T], [4.4 * T, 6.8 * T], [7.6 * T, 3.4 * T]], wait: 3, speed: { room: 28 },
    home: 'os',
    hostGoals: [[TEA.x + 58, TEA.y + 34]],
  },
  lynde: {
    spawn: [RLC.x + 30, RLC.y + 10], goals: [[RLC.x + 30, RLC.y + 10], [RLQ.x - 70, RLQ.y + 28], [6.4 * T, 7.4 * T]], wait: 3, speed: { walk: 46, room: 26 },
    home: 'rl',
    routine: { want: (hr, day) => hr >= 13 && hr < 18 ? (day % 2 ? 'os' : 'gg') : 'rl', roomGoals: { gg: [[TABLE.x - 64, TABLE.y + 34]], os: [[TEA.x - 58, TEA.y + 34]], rl: null },
      describe: "La Sra. Lynde se queda tejiendo en su casa hasta mediodía, y de 13 a 18 visita a Marilla (un día) o a la Sra. Barry (al otro) para tomar el té y ponerse al día con las novedades; después vuelve a su casa. Cuando están juntos, conversan entre ellos." },
  },
  harrison: {
    spawn: [HHR.table.x + 50, HHR.table.y + 30], goals: [[HHR.table.x + 50, HHR.table.y + 30], [HHR.stove.x + 50, HHR.stove.y + 40], [9 * T, 6.4 * T]], wait: 4, speed: { walk: 40, out: 28, room: 26 },
    outGoals: [[AREAS.avena.x - 22, AREAS.avena.y + 40], [AREAS.potrero.x + AREAS.potrero.w + 30, AREAS.potrero.y + 30], [HH.x + 50, HH.y + 44]],
    home: 'hh',
    routine: { want: hr => hr >= 8 && hr < 11.5 ? 'out' : 'hh', roomGoals: {}, describe: 'El Sr. Harrison trabaja en su campo de avena y su potrero por la mañana (de 8 a 11 y media) y el resto del día está en su casa, con Ginger.' },
  },
  shearer: {
    onMap: false, vehicle: 'cart', buys: { cow: 20 },
    spawn: [TOWN[0] + 60, TOWN[1]], goals: [[TOWN[0] + 70, TOWN[1]], [TOWN[0] + 130, TOWN[1] + 6]], wait: 4, speed: { walk: 44, out: 26, room: 26 },
    home: 'away', plans: false,
  },
};
// what each one is and says (name, look, voice for the AI, lines, abilities, gossip...) is plain data: src/datos/personajes.json;
// here is only where they stand and walk, which is measured on the maps.
const PERSONAJES = /*@personajes*/;
for (const k of Object.keys(CHARACTERS)) CHARACTERS[k] = { ...PERSONAJES[k], ...CHARACTERS[k] };
const CH = CHARACTERS;
// how each one feels about the others at the start (from the book); the graph then changes day by day
ANA.rels = { matthew: [5, 'su espíritu afín: el que siempre la entiende'], marilla: [4, 'la quiere aunque la rete; quiere que esté orgullosa de ella'], diana: [5, 'su amiga del alma; se juraron amistad eterna'], barry: [2, 'la respeta y le teme un poco desde lo del vino de grosellas'], lynde: [2, 'al principio le gritó por lo de su pelo; ahora se llevan mejor'] };
CH.matthew.rels = { ana: [4, 'la adora y siempre se pone de su lado'], marilla: [5, 'su hermana; se entienden sin hablar'], diana: [2, 'la amiga de Ana; le da timidez'], barry: [2, 'vecina; lo intimida'], lynde: [1, 'le da miedo su lengua'] };
CH.marilla.rels = { harrison: [2, 'el vecino nuevo: un desastre de hombre'], ana: [3, 'la quiere más de lo que dice; la corrige por su bien'], matthew: [5, 'su hermano; lo cuida y lo rezonga'], diana: [3, 'una niña buena y sensata'], barry: [3, 'una vecina correcta'], lynde: [4, 'su amiga de siempre, aunque es entrometida'] };
CH.diana.rels = { ana: [4, 'su amiga del alma'], matthew: [3, 'amable y callado'], marilla: [3, 'le da un poco de respeto'], barry: [4, 'su mamá, estricta'], lynde: [2, 'chismosa; le da risa'] };
CH.barry.rels = { ana: [1, 'la aprecia, con cautela desde lo del vino'], matthew: [2, 'un vecino callado'], marilla: [3, 'la respeta'], diana: [5, 'su hija; la protege mucho'], lynde: [3, 'buena vecina, algo habladora'] };
CH.harrison.rels = { ana: [1, 'esa niña pelirroja cuya vaca se come mi avena'], marilla: [2, 'una vecina seria'], matthew: [3, 'buen vecino, de pocas palabras: así me gusta'], lynde: [1, 'la chismosa que critica mi casa'], diana: [2, 'la amiga de la pelirroja'], barry: [2, 'vecina estirada'], shearer: [2, 'el que compra ganado'] };
CH.shearer.rels = { ana: [2, 'una señorita muy habladora'], harrison: [2, 'un vecino de Avonlea'], matthew: [3, 'buen hombre, cumple su palabra'] };
ANA.rels.harrison = [1, 'el vecino gruñón que se queja de Dolly']; ANA.rels.shearer = [2, 'el comerciante de ganado de Carmody'];
CH.lynde.rels = { ana: [1, 'la criticó al conocerla; hoy la defiende'], matthew: [3, 'buen hombre, demasiado tímido'], marilla: [4, 'su gran amiga; le da consejos aunque no se los pida'], diana: [3, 'una niña educada'], barry: [3, 'vecina estirada, pero decente'] };
CH.lynde.routine.roomGoals.rl = CH.lynde.goals;
CH.matthew.routine.describe = "Matthew entra a la cocina de Tejas Verdes a comer (hacia las 7, las 12 y las 18) y está con Marilla.";
const LOOKS = { ana: ANA.look }; for (const k of Object.keys(CH)) LOOKS[k] = CH[k].look;
const NAMES = { toby: 'Pelusa', lawson: 'Sr. Lawson' }; for (const k of Object.keys(CH)) NAMES[k] = CH[k].name;
// a loose line may wait for something of the book to have happened: «[hecho:perdonada] …» (conditions of the script, with commas)
const lineasSi = a => (a || []).filter(l => { const m = /^\[([^\]]+)\] /.exec(l); return !m || m[1].split(',').every(c => dlgCond(c.trim(), dlgCtx())); }).map(l => l.replace(/^\[[^\]]+\] /, ''));
// someone's loose lines now: the written ones, and the winks about the goals of the notebook (src/js/66-cuaderno.js)
const lineasDe = (k, a) => [...lineasSi(a), ...(typeof guiñosDe === 'function' ? guiñosDe(k) : [])];
const LINES = {}, SEASON_LINES = {}; for (const k of Object.keys(CH)) { Object.defineProperty(LINES, k, { get: () => lineasDe(k, CH[k].lines), enumerable: true }); SEASON_LINES[k] = CH[k].seasonLines; }
const ABIL = {}; for (const k of Object.keys(CH)) ABIL[k] = CH[k].abil;
const COOK = Object.keys(CH).find(k => CH[k].abil.cocinar);
// the people: one per entry (the ones the game names directly are pulled out below)
const PEOPLE = {};
for (const [k, c] of Object.entries(CH)) PEOPLE[k] = Object.assign(mkPerson(k, ...c.spawn), { goals: c.goals, goal: 0, wait: c.wait, where: c.home, base: c.goals, outGoals: c.outGoals || c.goals, house: c.home !== 'out' ? c.home : null }, c.init);
const { matthew, marilla, diana, barry, lynde } = PEOPLE;
