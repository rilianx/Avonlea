/* ---------- the characters: all there is to know about each one is here ----------
   To add a character: one more entry below (name, look, voice for the AI, lines, abilities, where it lives, and
   a routine if it goes visiting) and nothing else: the names, the prompt for the AI, the dialogue, the map, the
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
    name: 'Matthew', fullName: 'Matthew Cuthbert', article: '', look: { hair: '#c9c4bb', hairD: '#8e8a82', style: 'old', beard: true, dress: '#4d4a54', dressD: '#37353c', coat: true, hatDark: true, skin: '#eac6a8', h: 1.22, scarf: '#9a6a44' },
    voice: "unos sesenta años, hermano de Marilla. Tímidísimo, de muy pocas palabras, le dan miedo casi todas las mujeres, pero adora a Ana y siempre se pone de su lado. Trabaja en la granja: las vacas, el heno, el granero. Muletillas: \"Bueno, pues...\", \"Ya lo creo, ya lo creo\". Frases cortas, titubeantes, tiernas.",
    spawn: [BARN.x + 60, BARN.y + 50], goals: [[BARN.x + 60, BARN.y + 50], [GG.x - 140, GG.y + 90], [BARN.x - 20, BARN.y + 70], [GG.x + 120, GG.y + 160]], wait: 3, speed: { walk: 40, out: 34, room: 26 },
    home: 'out', abil: {"ir": true, "visitar": true, "regalar": ["manzanas", "bayas"], "regar": true, "cocinar": false, "acompanar": false}, gossip: ['marilla'], kin: ['marilla'],
    lines: ["Bueno, pues... sí, es un día precioso, Ana. Ya lo creo.", "Las vacas andan contentas hoy. Será por el sol, supongo.", "Marilla dice que hablas mucho. Bueno, a mí me gusta oírte, ¿sabes?", "¿Viste las flores junto al camino? Bueno, pues... me hicieron pensar en ti.", "Ya lo creo, ya lo creo. Anda, ve a jugar un rato, que el día está lindo."],
    seasonLines: ["Bueno, pues... ya brotó todo. La primavera, ¿no? Ya lo creo.", "Hace calor para la siega, ya lo creo. Bueno, el heno no se corta solo.", "Las manzanas de los Barry están en su punto. Marilla querrá hacer compota, supongo.", "Abrígate bien, Ana. El frío... bueno, pues, no es broma."],
    giftReply: " Bueno, pues... gracias, Ana.", whereText: { gg: 'en la cocina de Tejas Verdes, a la hora de comer' },
    routine: { want: (hr, day) => MEAL(hr) ? 'gg' : 'out', roomGoals: { gg: [[TABLE.x - 6, TABLE.y + 48]] } },
  },
  marilla: {
    name: 'Marilla', fullName: 'Marilla Cuthbert', article: '', look: { hair: '#5a4636', hairD: '#3b2d22', style: 'bun', dress: '#7a6e7e', dressD: '#5d5361', apron: '#f4efe4', brooch: true, skin: '#eecaae', h: 1.18, scarf: '#5c8c63' },
    voice: "hermana de Matthew, severa, práctica y ordenada, con un humor seco que esconde; quiere mucho a Ana aunque le cuesta decirlo, y la reprende por soñar despierta o hablar demasiado. Lleva siempre su broche de amatista. Se ocupa de la casa y de la cocina, y no sale de ella.",
    spawn: [TABLE.x + 70, TABLE.y + 30], goals: [[TABLE.x + 70, TABLE.y + 30], [STOVE.x + 60, STOVE.y + 40], [10.5 * T, 3.4 * T]], wait: 4, speed: { room: 30 },
    home: 'gg', abil: {"ir": false, "visitar": false, "regalar": ["tarta", "compota", "te"], "regar": true, "cocinar": true, "acompanar": false}, gossip: ['matthew', 'lynde'], kin: ['matthew'],
    hostGoals: [[TABLE.x + 64, TABLE.y + 34]],
    lines: ["Ana, no te quedes soñando despierta. Aunque... la cocina está ordenada, eso sí.", "Si quieres cocinar, la estufa está encendida. Cuidado con no quemar nada esta vez.", "Matthew no lo dice, pero te echa de menos cuando te vas donde Diana.", "Riega la huerta antes de que caiga el sol, que las plantas lo agradecen.", "Hmm. Bueno, admito que hoy te has portado muy bien."],
    seasonLines: ["Hay que limpiar la casa a fondo, que es primavera. Y tú me vas a ayudar, Ana.", "Con este calor, mejor un té y no enciendas mucho la estufa.", "Es tiempo de manzanas: una buena compota para el invierno no está de más.", "Siéntate cerca de la estufa, niña, que vienes helada."],
    giftReply: " Vaya, Ana. Muy bien hecho.",
  },
  diana: {
    name: 'Diana', fullName: 'Diana Barry', article: '', look: { hair: '#2e2420', hairD: '#16100c', style: 'curls', dress: '#d98aa0', dressD: '#b56a82', collar: '#fff4f6', bow: '#f6e7a8', skin: '#f3d0b4', h: 1, scarf: '#f2e3a0' },
    voice: "la amiga del alma de Ana, de pelo negro y rizado, dulce, alegre y un poco miedosa; admira la imaginación de Ana. Se juraron amistad eterna. Una vez Ana le sirvió por error vino de grosellas creyendo que era cordial de frambuesa, Diana se emborrachó y su madre les prohibió verse por un tiempo: ahora lo recuerdan entre risas y vergüenza. Está en su jardín de día y en casa al atardecer y en invierno.",
    spawn: [OS.x - 50, OS.y + 60], goals: DIANA_OUT, wait: 2, speed: {},
    home: 'out', init: { follow: false }, companion: true, abil: {"ir": true, "visitar": true, "regalar": ["manzanas", "bayas", "ramo"], "regar": false, "cocinar": false, "acompanar": true}, gossip: ['barry'], kin: [],
    lines: ["¡Ana, mi alma gemela! Te estaba esperando.", "Mamá dice que puedo salir hasta que se ponga el sol. ¿Vamos al lago?", "¿Te acuerdas de nuestro juramento de amistad? ¡Para siempre!", "Los manzanos están llenos este año. Toma las que quieras.", "El Bosque Encantado me da un poquito de miedo... pero contigo no."],
    seasonLines: ["¡Mira los manzanos en flor, Ana! Parecen novias vestidas de blanco.", "¡Qué calor! ¿Vamos a remojar los pies en el lago?", "El Bosque Encantado está todo rojo y dorado... ¡como un cuento!", "¡Está nevando! Mamá no me deja salir sin bufanda. Ven, entra a calentarte junto al fuego."],
    giftReply: " ¡Eres la mejor amiga del mundo!",
  },
  barry: {
    name: 'Sra. Barry', fullName: 'Sra. Barry', article: 'la ', onMap: false, look: { hair: '#3b2a22', hairD: '#24180f', style: 'bun', dress: '#5a6a8e', dressD: '#465474', collar: '#f4efe4', brooch: true, skin: '#f0cdb0', h: 1.18, scarf: '#a58ad8' },
    voice: "la madre de Diana. Correcta, estricta y algo estirada; desconfió de Ana después de lo del vino, pero ahora la aprecia, con cierta cautela. No sale de su salita.",
    spawn: [8.6 * T, 4.4 * T], goals: [[8.6 * T, 4.4 * T], [11.4 * T, 6 * T], [4.4 * T, 6.8 * T], [7.6 * T, 3.4 * T]], wait: 3, speed: { room: 28 },
    home: 'os', abil: {"ir": false, "visitar": false, "regalar": ["manzanas", "compota"], "regar": false, "cocinar": false, "acompanar": false}, gossip: ['diana', 'lynde'], kin: [],
    hostGoals: [[TEA.x + 58, TEA.y + 34]],
    lines: ["Ana Shirley, siempre es un gusto verte por aquí. Pórtate bien, ¿eh?", "Diana habla de ti todo el día, ¿sabes?", "Esta vez el cordial de frambuesa está bien etiquetado, te lo aseguro.", "Saluda a Marilla de mi parte, querida."],
    seasonLines: ["Buenos días, Ana. Diana está deseando verte.", "Qué calor, ¿verdad? Hay limonada en la despensa.", "Diana me ayudó con las manzanas. Llévale algunas a Marilla.", "Pasa, pasa, que hace un frío terrible. Diana está junto al fuego."],
    giftReply: " Qué amable eres, Ana.",
  },
  lynde: {
    name: 'Sra. Lynde', fullName: 'Sra. Rachel Lynde', article: 'la ', look: { hair: '#9b948c', hairD: '#6a645d', style: 'bun', dress: '#8a5a62', dressD: '#6c444b', collar: '#f4efe4', apron: '#f4efe4', brooch: true, skin: '#efc8aa', h: 1.12, scarf: '#c0582e' },
    voice: "la vecina chismosa y mandona de Marilla; gordita, activa y de buen corazón, dice siempre lo que piensa y opina de todo (de la crianza de Ana, del pelo, de la huerta). Teje cubrecamas de retazos junto a su ventana, desde donde ve todo lo que pasa por el camino. Quiere a Ana más de lo que reconoce. Por la tarde visita a Marilla en Tejas Verdes o a la Sra. Barry.",
    spawn: [RLC.x + 30, RLC.y + 10], goals: [[RLC.x + 30, RLC.y + 10], [RLQ.x - 70, RLQ.y + 28], [6.4 * T, 7.4 * T]], wait: 3, speed: { walk: 46, room: 26 },
    home: 'rl', abil: {"ir": false, "visitar": false, "regalar": ["compota", "te"], "regar": false, "cocinar": false, "acompanar": false}, gossip: ['marilla', 'barry'], kin: [],
    lines: ["Ana Shirley, hablas más que un molino... pero tienes buen corazón, eso lo reconozco.", "Desde mi ventana veo todo el camino: no se me escapa nadie. Lo digo sin mala intención, ¿eh?", "Llevo cincuenta y dos cubrecamas de retazos, ¡cincuenta y dos! Y no pienso parar.", "Marilla hizo bien en quedarse contigo, y lo digo yo, que nunca me callo lo que pienso.", "A una niña hay que enseñarle a ser útil. Pero, bueno, tú vas por buen camino."],
    seasonLines: ["¡Vaya, vaya, ya brotó todo! Ya es hora de limpiar la casa, digo yo.", "Con este calor no hay quien teja... ¡pero yo tejo, claro que tejo!", "El otoño siempre me hace pensar en los cubrecamas. Este año haré uno rojo y dorado.", "Pasa, niña, que hace un frío de mil demonios... perdón, de los que dan escalofríos."],
    giftReply: " Vaya, vaya... se nota que a ti te criaron bien.",
    whereText: { rl: 'en su casa, junto a la ventana', gg: 'de visita en la cocina de Tejas Verdes, tomando el té con Marilla', os: 'de visita en la salita de La Cuesta del Huerto, tomando el té con la Sra. Barry', out: 'caminando por el camino' },
    routine: { want: (hr, day) => hr >= 13 && hr < 18 ? (day % 2 ? 'os' : 'gg') : 'rl', roomGoals: { gg: [[TABLE.x - 64, TABLE.y + 34]], os: [[TEA.x - 58, TEA.y + 34]], rl: null },
      describe: "La Sra. Lynde se queda tejiendo en su casa hasta mediodía, y de 13 a 18 visita a Marilla (un día) o a la Sra. Barry (al otro) para tomar el té y ponerse al día con las novedades; después vuelve a su casa. Cuando están juntos, conversan entre ellos." },
  },
  harrison: {
    name: 'Sr. Harrison', fullName: 'Sr. J. A. Harrison', article: 'el ', look: { hair: '#a8743e', hairD: '#784e26', style: 'old', beard: true, dress: '#6b5636', dressD: '#4f3f26', coat: true, skin: '#ecbf9c', h: 1.12, scarf: '#7a8a5a' },
    voice: "el vecino nuevo de los Cuthbert: bajo, gordo y calvo, con barba rojiza; gruñón, desordenado (su casa es un caos de platos sin lavar y periódicos) y de mal genio, pero en el fondo justo y con un humor escondido; vive solo con su loro Ginger, que suelta frases inoportunas. Se queja de que la vaca de Ana se mete en su avena.",
    spawn: [HHR.table.x + 50, HHR.table.y + 30], goals: [[HHR.table.x + 50, HHR.table.y + 30], [HHR.stove.x + 50, HHR.stove.y + 40], [9 * T, 6.4 * T]], wait: 4, speed: { walk: 40, out: 28, room: 26 },
    outGoals: [[AREAS.avena.x - 22, AREAS.avena.y + 40], [AREAS.potrero.x + AREAS.potrero.w + 30, AREAS.potrero.y + 30], [HH.x + 50, HH.y + 44]],
    home: 'hh', abil: { ir: false, visitar: false, regalar: ['manzanas'], regar: false, cocinar: false, acompanar: false }, gossip: [], kin: [],
    lines: ['Hmpf. Buenos días... si es que son buenos.', '¿Esa vaca tuya se ha portado bien hoy? Más le vale.', 'No me mires la casa, que el desorden es mío.', 'Ginger, ¡silencio!... No le hagas caso, muchacha.'],
    seasonLines: ['La avena ya asoma. Que nadie la pise, ¿eh?', 'Calor de mil demonios para segar... con perdón.', 'Buena cosecha este año, aunque no lo diga mucho.', 'Con este frío, ni Ginger quiere hablar. Bueno, sí quiere.'],
    giftReply: ' Hmpf... gracias, muchacha. De verdad.',
    whereText: { out: 'afuera, en su campo y su potrero' },
    routine: { want: hr => hr >= 8 && hr < 11.5 ? 'out' : 'hh', roomGoals: {}, describe: 'El Sr. Harrison trabaja en su campo de avena y su potrero por la mañana (de 8 a 11 y media) y el resto del día está en su casa, con Ginger.' },
  },
  shearer: {
    name: 'Sr. Shearer', fullName: 'Sr. Shearer', article: 'el ', onMap: false, vehicle: 'cart', buys: { cow: 20 }, look: { hair: '#8e8a84', hairD: '#5e5a54', style: 'old', dress: '#4a5a6a', dressD: '#36424e', coat: true, hatDark: true, skin: '#e6c0a0', h: 1.2, scarf: '#a8554a' },
    voice: "un comerciante de ganado de Carmody: práctico, amable y siempre apurado; recorre los caminos con su carreta comprando vacas y terneros, y paga al contado.",
    spawn: [TOWN[0] + 60, TOWN[1]], goals: [[TOWN[0] + 70, TOWN[1]], [TOWN[0] + 130, TOWN[1] + 6]], wait: 4, speed: { walk: 44, out: 26, room: 26 },
    home: 'away', plans: false, abil: { ir: false, visitar: false, regalar: [], regar: false, cocinar: false, acompanar: false }, gossip: [], kin: [],
    lines: ['Buen día, señorita. ¿Algún animal para vender?', 'Ando apurado: me esperan en Carmody.', 'Buena tierra la de por aquí, sí señor.'],
    seasonLines: ['Primavera: buen tiempo para comprar terneros.', 'Con este calor las vacas dan menos leche, ¿sabía?', 'En otoño se vende bien el ganado.', 'En invierno casi no salgo, pero hoy hacía falta.'],
    giftReply: ' Muy amable, señorita.',
  },
};
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
const LINES = {}, SEASON_LINES = {}; for (const k of Object.keys(CH)) { LINES[k] = CH[k].lines; SEASON_LINES[k] = CH[k].seasonLines; }
const ABIL = {}; for (const k of Object.keys(CH)) ABIL[k] = CH[k].abil;
const COOK = Object.keys(CH).find(k => CH[k].abil.cocinar);
// the people: one per entry (the ones the game names directly are pulled out below)
const PEOPLE = {};
for (const [k, c] of Object.entries(CH)) PEOPLE[k] = Object.assign(mkPerson(k, ...c.spawn), { goals: c.goals, goal: 0, wait: c.wait, where: c.home, base: c.goals, outGoals: c.outGoals || c.goals, house: c.home !== 'out' ? c.home : null }, c.init);
const { matthew, marilla, diana, barry, lynde } = PEOPLE;
