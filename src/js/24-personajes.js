/* ---------- the characters: all there is to know about each one is here ----------
   To add a character: one more entry in src/datos/personajes.json (name, look, voice, lines, abilities)
   and one below (where it lives, and a routine if it goes visiting) and nothing else: the names, the dialogue, the map, the
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
    routine: { want: (hr, day) => hr >= 14.5 && hr < 16.5 ? (day % 2 ? 'os' : game.wm && dlgHechos().inicio_juego && !dlgHechos().lynde_visita ? 'rl' : 'gg') : 'rl',   // (a visit has an end: tea, the news, and home; and not to Green Gables before she came to see the girl, cap. 9)
      roomGoals: { gg: [[TABLE.x - 64, TABLE.y + 34]], os: [[TEA.x - 58, TEA.y + 34]], rl: null },
      describe: "La Sra. Lynde se queda tejiendo en su casa hasta mediodía, y de 14:30 a 16:30 visita a Marilla (un día) o a la Sra. Barry (al otro) para tomar el té y ponerse al día con las novedades; después vuelve a su casa. Cuando están juntos, conversan entre ellos." },
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
// what each one is (name, look, voice, abilities, gossip...) is plain data: src/datos/personajes.json (what they say in passing:
// src/datos/frases.txt);
// here is only where they stand and walk, which is measured on the maps.
const PERSONAJES = /*@personajes*/;
for (const k of Object.keys(CHARACTERS)) CHARACTERS[k] = { ...PERSONAJES[k], ...CHARACTERS[k] };
const CH = CHARACTERS;
// what each one says in passing (src/datos/frases.txt, the same for the people of the house and of the village):
// «=== quien ===», and «dice:», «primavera:»… «invierno:», «ana:» (what Ana answers), each with its conditions in [ ]
function frasesLeer(txt){
  const F = {}; let q = null; const EST = { primavera: 0, verano: 1, 'otoño': 2, invierno: 3 };
  for (const raw of txt.split('\n')) {
    const l = raw.trim(); if (!l || l[0] === '#') continue; let m;
    if ((m = l.match(/^===\s*(.+?)\s*===$/))) { q = F[m[1]] = { dice: [], ana: [], est: ['', '', '', ''] }; continue; }
    if (!q || !(m = l.match(/^(dice|ana|primavera|verano|otoño|invierno):\s*(.*)$/))) continue;
    if (m[1] in EST) q.est[EST[m[1]]] = m[2]; else q[m[1]].push(m[2]);
  }
  return F;
}
const FRASES = frasesLeer(document.getElementById('frases')?.textContent || '');
// (and those of their group: «=== adultos ===», «=== niños ===», what anyone of them says: when Ana goes about in her nightgown…)
// (marked «grupo»: when it is said, it gives way to one's own voice —see lineasDe)
const frasesGrupo = nino => (FRASES[nino ? 'niños' : 'adultos']?.dice || []).map(l => /^\[/.test(l) ? l.replace(/^\[/, '[grupo, ') : '[grupo] ' + l);
for (const k of Object.keys(CH)) { CH[k].lines = [...(FRASES[k]?.dice || []), ...frasesGrupo(k === 'diana')]; CH[k].seasonLines = FRASES[k]?.est || ['', '', '', '']; }
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
// ({k} in a condition: whoever says it; for the lines of a group: «[!afecto:{k}:ana>=3] …», only those who do not love her)
const lineasSi = (a, k) => (a || []).filter(l => { const m = /^\[([^\]]+)\] /.exec(l); return !m || m[1].split(',').every(c => c.trim() === 'grupo' || dlgCond(c.trim().replace(/\{k\}/g, String(k || '').replace(/^f:/, '')), dlgCtx())); }).map(l => l.replace(/^\[[^\]]+\] /, ''));
// someone's loose lines now: the written ones, and the winks about the goals of the notebook (src/js/66-cuaderno.js)
// a group's line gives way to one's own voice: where one has a line of their own for the same thing (ana:camison, the
// hour) that holds now, the group's is not said
const reaccionDe = cs => cs.map(c => /^(ana:\w+|hora:(2\d)(\.\d+)?(?=-|$))/.exec(c)?.[1]).filter(Boolean);   // (what a line reacts to: how Ana is, «ana:camison», or the night, «hora:21-26»; not «!donde:ana:tejas», nor the hours of a scene)
function lineasConVoz(k, a){
  const conds = l => (/^\[([^\]]+)\] /.exec(l)?.[1] || '').split(',').map(c => c.trim()).filter(Boolean);
  const vale = l => lineasSi([l], k).length > 0 && (typeof lineasAjenas !== 'function' || lineasAjenas(k, lineasSi([l], k)).length > 0);
  const propias = (a || []).filter(l => !conds(l).includes('grupo') && vale(l));
  const tiene = new Set(propias.flatMap(l => reaccionDe(conds(l))));
  const grupo = (a || []).filter(l => conds(l).includes('grupo') && vale(l) && !reaccionDe(conds(l)).some(c => tiene.has(c)));
  const ya = typeof comentoHoy === 'function' && k ? comentoHoy(k) : new Set(), nueva = l => reaccionDe(conds(l)).map(claveReac).some(x => !ya.has(x));
  const L = [...propias, ...grupo].filter(l => !reaccionDe(conds(l)).length || nueva(l)), ve = L.filter(l => reaccionDe(conds(l)).length);   // (what they see of her comes first: in a nightgown, at night…; and what they already remarked today, not again)
  return (ve.length ? ve : L).map(l => l.replace(/^\[[^\]]+\] /, ''));
}
// what someone says on seeing how Ana is (a nightgown, out at night, no hat), or null: the first time too, and before any greeting
// what someone says on seeing how Ana is (a nightgown, out at night, no hat), or null: the first time too, and before any
// greeting; and what they already remarked today (the nightgown, the hour), they do not remark again
const claveReac = c => /^hora:/.test(c) ? 'hora' : c;
// the scenes of someone that remark how Ana is (camison_lynde: «¡en camisón por el camino!»): when one is ready, it goes
// first, and the loose line gives way
let REAC_ESC = null;
const escenaReacciona = k => { if (!REAC_ESC) { REAC_ESC = {}; for (const d of (typeof DIALOGOS !== 'undefined' ? DIALOGOS : [])) { const r = reaccionDe([].concat(d.si || []).map(String)).map(claveReac); if (r.length) for (const h of d.hablan()) (REAC_ESC[h] ||= []).push([d, r]); } }
  const x = dlgCtx(); return (REAC_ESC[String(k).replace(/^f:/, '')] || []).filter(([d]) => d.listo(x)).flatMap(([, r]) => r); };
const reaccionAlVerla = k => { const d = FOLKBY[String(k).replace(/^f:/, '')]?.def, a = d ? d.lines : CH[k]?.lines, ya = new Set([...comentoHoy(k), ...escenaReacciona(k)]);
  const L = (a || []).filter(l => { const r = reaccionDe((/^\[([^\]]+)\] /.exec(l)?.[1] || '').split(',').map(c => c.trim())).map(claveReac); return r.length && !r.every(x => ya.has(x)); });
  return pick(sinRepetir(k, lineasConVoz(k, L))) || null; };   // (and once said, not again today)
// the remarks of each line or scene (text → what it remarks), to know, when it is said, what was remarked
let REAC_TXT = null;
const reacDeTexto = t => { if (!REAC_TXT) { REAC_TXT = new Map(); const add = l => { const m = /^\[([^\]]+)\] (.*)$/.exec(l); if (!m) return; const r = reaccionDe(m[1].split(',').map(c => c.trim())).map(claveReac); if (r.length) REAC_TXT.set(m[2], r); };
    for (const c of Object.values(CH)) (c.lines || []).forEach(add); for (const f of Object.values(FOLKBY)) (f.def.lines || []).forEach(add);
    for (const d of (typeof DIALOGOS !== 'undefined' ? DIALOGOS : [])) { const r = reaccionDe([].concat(d.si || []).map(String)).map(claveReac); if (r.length) try { for (const l of d.lineas()) if (typeof l[1] === 'string') REAC_TXT.set(l[1], r); } catch (e) {} } }
  return REAC_TXT.get(t) || []; };
// what Ana has heard from each one today (a gesture alone, «(Asiente.)», is not a thing said, nor a little word of theirs): no one says the same thing twice in a day (when they have said all they have,
// they say nothing more: silence, not a repeat)
const OIDO = { dia: -1, k: {}, r: {} };
const oidoHoy = k => { k = String(k).replace(/^f:/, ''); if (OIDO.dia !== today()) { OIDO.dia = today(); OIDO.k = {}; OIDO.r = {}; } return OIDO.k[k] ||= new Set(); };
const comentoHoy = k => { oidoHoy(k); return OIDO.r[String(k).replace(/^f:/, '')] ||= new Set(); };   // (what they remarked of her today: «ana:camison», «hora»)
// something said aloud: Ana heard it (and, if it remarks how she is, it was remarked)
const oido = (q, t) => { if (q === 'ana') return; for (const r of reacDeTexto(t)) comentoHoy(q).add(r); if (!/^\([^)]*\)$/.test(t) && !muletilla(t)) oidoHoy(q).add(t); };
const muletilla = t => t.replace(/\([^)]*\)/g, '').trim().split(/\s+/).length <= 3;   // («Ya lo creo.», «Gracias.», «Hmpf.»: one's way of talking, said again and again)
const sinRepetir = (k, L) => { const o = oidoHoy(k); return L.filter(t => !o.has(t)); };
const lineasDe = (k, a) => sinRepetir(k, [...lineasConVoz(k, a), ...(typeof guiñosDe === 'function' ? guiñosDe(k) : [])].map(t => typeof saludoHora === 'function' ? t.replace(/Buenos días|Buenas tardes|Buenas noches/, saludoHora) : t));   // (the greeting, as the hour is)   // (someone who does not know Ana: none with her name)
// who is in Avonlea, and from/until when, as in the book (src/datos/llegadas.txt). Arriving and leaving are events of
// the story: once «llega si» holds, they have come (the fact llego_<who>, with its day) and they stay; once «se va si»
// holds, they have gone (se_fue_<who>). So one can be anchored to another («la Srta. Stacy llega el otoño después de que
// se fue el Sr. Phillips»: hecho:se_fue_phillips). Someone «de visita» is here only while «llega si» holds, and each
// visit leaves its llego_/se_fue_. Away, they are on no map and in no scene, and their goals wait. A game begun before
// Ana came to Green Gables (no inicio_juego) has everyone.
function llegadasLeer(txt){
  const L = {}; let e = null; const conds = v => v.split(',').map(x => x.trim()).filter(Boolean);
  for (const raw of txt.split('\n')) {
    const l = raw.trim(); if (!l || l[0] === '#') continue; let m;
    if ((m = l.match(/^===\s*(.+?)\s*===$/))) { L[m[1]] = e = { llega: [], seVa: [], visita: false, alLlegar: '', alIrse: '' }; continue; }
    if (!e) continue;
    if ((m = l.match(/^llega si:\s*(.*)$/))) e.llega.push(conds(m[1]));
    else if ((m = l.match(/^se va si:\s*(.*)$/))) e.seVa.push(conds(m[1]));
    else if ((m = l.match(/^de visita:\s*(.*)$/))) e.visita = /^s/.test(m[1]);
    else if ((m = l.match(/^(al llegar|al irse):\s*(.*)$/))) e[m[1] === 'al llegar' ? 'alLlegar' : 'alIrse'] = m[2];
  }
  return L;
}
const LLEGADAS = llegadasLeer(document.getElementById('llegadas')?.textContent || '');
const llegadaVale = gs => { const x = dlgCtx(); return gs.some(g => g.every(c => dlgCond(c, x))); };
const ausente = k => { k = String(k).replace(/^f:/, ''); const e = LLEGADAS[k], H = dlgHechos(); if (!e || !H.inicio_juego) return false;
  if (e.visita) return !llegadaVale(e.llega) || llegadaVale(e.seVa);
  return !!H['se_fue_' + k] || (e.llega.length > 0 && !H['llego_' + k] && !llegadaVale(e.llega)) || llegadaVale(e.seVa); };
// the comings and goings, as they happen: the facts, and a line in the diary
let llegadasT = 0; const llegadasAqui = {};
function llegadasTick(dt){
  if ((llegadasT -= dt) > 0 || !dlgHechos().inicio_juego) return; llegadasT = 2; const H = dlgHechos();
  for (const [k, e] of Object.entries(LLEGADAS)) {
    const aqui = !ausente(k), antes = llegadasAqui[k] ?? (e.visita ? !!H['llego_' + k] && !(H['se_fue_' + k] >= H['llego_' + k]) : !H['se_fue_' + k] && (!e.llega.length || !!H['llego_' + k]));
    if (aqui && !antes) { dlgHecho('llego_' + k); if (e.alLlegar) logEv(e.alLlegar, []); }
    if (!aqui && antes && (e.visita || e.seVa.length)) { dlgHecho('se_fue_' + k); if (e.alIrse) logEv(e.alIrse, []); }
    llegadasAqui[k] = aqui;
  }
}
const LINES = {}, SEASON_LINES = {}; for (const k of Object.keys(CH)) { Object.defineProperty(LINES, k, { get: () => lineasDe(k, CH[k].lines), enumerable: true }); Object.defineProperty(SEASON_LINES, k, { get: () => CH[k].seasonLines.map(l => lineasSi([l])[0] || null), enumerable: true }); }   // (each with its conditions: one that does not hold is null)
const ABIL = {}; for (const k of Object.keys(CH)) ABIL[k] = CH[k].abil;
const COOK = Object.keys(CH).find(k => CH[k].abil.cocinar);
// the people: one per entry (the ones the game names directly are pulled out below)
const PEOPLE = {};
for (const [k, c] of Object.entries(CH)) PEOPLE[k] = Object.assign(mkPerson(k, ...c.spawn), { goals: c.goals, goal: 0, wait: c.wait, where: c.home, base: c.goals, outGoals: c.outGoals || c.goals, house: c.home !== 'out' ? c.home : null }, c.init);
const { matthew, marilla, diana, barry, lynde } = PEOPLE;
