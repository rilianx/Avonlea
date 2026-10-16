/* ---------- chapter I of the book (with chapter II and the start of III), played by the planner and the routines:
   Mrs. Rachel at her window sees Matthew drive by in his best suit; after tea she goes to Green Gables to find out;
   Marilla has set the table for three and tells her (an orphan boy!); Rachel takes the news up the road to the Bells.
   Meanwhile Matthew drives the eight miles to Bright River, finds a girl waiting on the pile of shingles, and brings
   her home through the Avenue and past the pond, at dusk. Each moment of the book (LIBRO1.verdad) is marked here
   when it happens in the simulation (CAP1.marks), to compare the two agendas (tools/trace_goal.js cap1). ---------- */
const CAP1 = { on: false, done: 0, marks: {}, f: {}, extra: null };
function cap1Mark(id, note){ if (!CAP1.on || CAP1.marks[id] != null) return; CAP1.marks[id] = +hourNow().toFixed(3); if (note) logEv(note, []); }
const cap1Pick = (src, idx) => idx.map(i => src[i]).filter(Boolean);
function startCap1(){
  for (const c of CHATS.slice()) chatEnd(c); TALKS = []; for (const k of Object.keys(TALK_Q)) delete TALK_Q[k];
  for (const k of Object.keys(AGENTS)) { wmRelease(k); delete AGENTS[k]; }
  close(); if (ana.goto) ana.goto = null; WM_APPROACH = null; AGENDA_ON = false; if ($('wmagenda')) $('wmagenda').checked = false;
  cart.on = false; cart.riding = false; game.tripWith = null; game.road = null; diana.follow = false;
  if (today() % 7 === 6) dayT += 1;   // (a weekday)
  dayAt(14.9); setSeason(0); S = 0;     // (an afternoon in early June, just before Matthew goes)
  game.dlgUsed = {};
  CAP1.on = true; CAP1.done = 0; CAP1.marks = {}; CAP1.f = {}; CAP1.extra = null; game.escDone = {}; game.dlgHechos = {}; if (game.wm) game.wm.hechos = {}; game.dlgProg = {};
  const put = (k, room, x, y) => { const b = PEOPLE[k]; b.where = room; b.x = x; b.y = y; b.sit = false; b.nav = null; b.buggy = false; b.roadDir = 0; b.story = null; b.away = null; };
  put('marilla', 'gg', STOVE.x + 30, STOVE.y + 40); put('matthew', 'out', BARN.x + 140, BARN.y + 70); put('lynde', 'rl', KDOOR.x - 60, KIT.h * .45);
  if (PEOPLE.shearer.where !== 'away') PEOPLE.shearer.where = 'away';
  // Matthew in the field until he goes; Rachel at her window until tea
  agentStart('matthew', G.estar_en('matthew', 'granero', null, 15.3), { label: 'trabajar en el campo detrás del granero hasta que sea hora (cap. 1)' });
  agentStart('lynde', G.estar_en('lynde', 'h:rl', null, 17.5), { label: 'tejer junto a la ventana, vigilando el camino, y tomar el té (cap. 1)' });
  // Ana, on the train: she is not at the station yet
  game.scene = 'br'; ana.hidden = true; ana.sit = false; ana.x = KIT.w / 2; ana.y = 3.6 * T; ana.dir = 2;
  game.train = null; observe('lynde');
  logEv('Capítulo 1: una tarde de comienzos de junio en Avonlea.', []);
}
function cap1Tick(){
  if (!CAP1.on || CAP1.done) return;
  const h = hourNow(), f = CAP1.f, M = PEOPLE.matthew, R = PEOPLE.lynde, Ma = PEOPLE.marilla, A = AGENTS.ana;
  if (!f.t0) { f.t0 = 1; CAP1.marks.telegrama = 12; logEv('A mediodía, Marilla recibió un telegrama de la Sra. Spencer: el huérfano llega en el tren de las cinco y media a Bright River.', []); }   // (before the chapter starts)
  if (h >= 15 && !f.t15) { f.t15 = 1; if (R.where === 'rl') cap1Mark('rachel_teje', 'La Sra. Rachel Lynde tejía una colcha junto a la ventana, vigilando el camino.'); if (FOLKBY.thomas?.where === 'out') cap1Mark('thomas_nabos', 'Thomas Lynde sembraba nabos en el campo de la colina, detrás del granero.'); }
  // Matthew goes, in the buggy, in his best suit
  if (h >= 15.33 && !f.go) { f.go = 1; M.buggy = true; agentStart('matthew', { ...G.estar_en('matthew', 'h:br'), text: 'Matthew va a la estación de Bright River a buscar al niño' }, { label: 'ir a Bright River a buscar al niño huérfano (cap. 1)', prio: 3 }); }
  if (f.go && M.where === 'out' && !CAP1.marks.matthew_sale && dist(M.x, M.y, GG.x, GG.y) > 300) cap1Mark('matthew_sale', 'Matthew salió de Tejas Verdes en la calesa con la yegua alazana, con cuello blanco y su mejor traje.');
  if (f.go && M.where === 'out' && dist(M.x, M.y, LY.x, LY.y + 60) < (h < 19 ? 420 : 560)) {
    if (h < 19) { if (!CAP1.marks.matthew_hondonada) { cap1Mark('matthew_hondonada', 'Matthew pasó por la hondonada, frente a la casa de la Sra. Lynde, y subió la colina.'); if (R.where === 'rl') { cap1Mark('rachel_ve', 'Rachel lo vio pasar desde la ventana: ¿adónde irá Matthew Cuthbert tan arreglado? No pudo esperar: se fue enseguida a Tejas Verdes a averiguarlo.'); } } }
    else if (A?.followOf === 'matthew' && R.where === 'rl') cap1Mark('rachel_ve_vuelta', 'Ya oscurecía, pero Rachel alcanzó a ver desde su ventana la calesa que volvía, con alguien más.');
  }
  if ((M.where === 'camino' && M.roadDir < 0) || (CAP1.marks.matthew_hondonada && !f.st && M.where === 'out' && dist(M.x, M.y, LY.x, LY.y) > 900)) cap1Mark('matthew_camino', 'Matthew trotaba tranquilo por las ocho millas a Bright River, entre granjas, abetos y ciruelos en flor.');
  if ((h >= 17 || f.rm) && !f.mesa) { f.mesa = 1; if (Ma.where === 'gg') { cap1Mark('mesa_tres', 'Marilla puso la mesa para tres, con mermelada de manzana silvestre y un solo tipo de torta.'); } }
  if (h >= 17.25 && !CAP1.marks.rachel_te && R.where === 'rl') cap1Mark('rachel_te', 'Rachel Lynde tomó el té, contándole a Thomas la noticia.');
  // Rachel goes to Green Gables to find out
  if ((h >= 17.5 || CAP1.marks.rachel_ve) && !f.rv) { f.rv = 1; wmRelease('lynde'); delete AGENTS.lynde; agentStart('lynde', { ...G.estar_en('lynde', 'cocina'), text: 'Rachel va a Tejas Verdes a averiguar adónde fue Matthew' }, { label: 'ir a Tejas Verdes a averiguar adónde fue Matthew (cap. 1)', prio: 3 }); }
  if (f.rv && R.where === 'out' && dist(R.x, R.y, GG.x, GG.y) < 520) cap1Mark('rachel_sendero', 'Rachel caminó por el largo sendero de Tejas Verdes, criticando que vivan tan apartados.');
  if (f.rv && R.where === 'gg' && !f.rm) {
    f.rm = 1; dlgHecho('rachel_llego_tejas_verdes'); CHAT_HOLD.lynde = TT + 1e6; cap1Mark('rachel_entra', 'Rachel golpeó la puerta de la cocina, entró, y vio la mesa puesta para tres.');   // (she stays for the scene)
  }
  if (dlgHechos().rachel_lo_sabe && R.where === 'out' && !CAP1.marks.rachel_sale) cap1Mark('rachel_sale', 'Rachel salió de Tejas Verdes rumbo a la casa de Robert Bell, a contar la noticia.');
  if (dlgHechos().rachel_lo_sabe && !f.bell) { const B = FOLKBY.srbell; if (B) { B.talkT = TT + 1e6; B.route = []; if (B.where !== 'out' || dist(B.x, B.y, WP.casa_bell[0], WP.casa_bell[1]) > 60) { B.where = 'out'; B.x = WP.casa_bell[0] + 30; B.y = WP.casa_bell[1] + 10; } } }
  if (dlgHechos().rachel_lo_sabe && !f.bell && R.where === 'out' && dist(R.x, R.y, WP.casa_bell[0], WP.casa_bell[1]) < 130) {
    f.bell = 1; dlgHecho('rachel_en_casa_bell'); CHAT_HOLD.lynde = TT + 1e6; cap1Mark('bell_recibe', 'Los Bell recibieron a Rachel, que les contó la noticia de los Cuthbert.');
  }
  // the train comes in at Bright River: Ana gets off, and Mrs. Spencer goes on to White Sands
  if (h >= 17.5 && !f.train) { f.train = TT; game.train = { t0: TT }; if (OBS === 'lynde') observe(null); }
  if (f.train && !f.anaOn && TT - f.train > 7) { f.anaOn = 1; ana.hidden = false; ana.x = KIT.w * .45; ana.y = 3.4 * T; ana.dir = 2; cap1Mark('ana_tren', 'Ana bajó del tren de las cinco y media con la Sra. Spencer, que la dejó a cargo del jefe de estación.'); cap1Mark('spencer_sigue', 'La Sra. Spencer siguió viaje en el mismo tren hasta White Sands.'); }
  if (f.anaOn && !f.pila && TT - f.train > 20) { f.pila = 1; ana.sit = true; ana.x = BRS.pile.x; ana.y = BRS.pile.y + 2; ana.dir = 2; cap1Mark('ana_pila', 'Ana no quiso entrar a la sala de espera de señoras («hay más campo para la imaginación») y se sentó en la pila de tejuelas.'); sayB('ana', 'Prefiero quedarme afuera, gracias. Aquí hay más campo para la imaginación.'); }
  // Matthew at the station: the stationmaster, the girl on the shingles; and home in the buggy
  if (M.where === 'br' && !f.st) {
    f.st = 1; dlgHecho('matthew_en_estacion'); CHAT_HOLD.matthew = TT + 1e6; cap1Mark('matthew_estacion', 'Matthew ató la yegua en el patio del hotel de Bright River, pasó junto a la niña sin mirarla y fue a la estación.');   // (he waits there for the scene)
  }
  if (game.scene === 'camino' && f.st && !CAP1.marks.suben_calesa) cap1Mark('suben_calesa', 'Ana y Matthew subieron a la calesa (ella no soltó su bolso de alfombra) y salieron del pueblo.');
  // into Avonlea: the pond, the Barrys', Green Gables under the big white star
  if (f.st && M.where === 'out' && !f.route) { f.route = 1; const tx = DOOR.gg[0], ty = DOOR.gg[1] + 20, r1 = netRoute(M.x, M.y, 33 * U, 45 * U), r2 = netRoute(41.5 * U, 61.6 * U, tx, ty); M.bnav = { x: tx, y: ty, pts: [...(r1 ? r1.pts : []), ...MAP.roads.laguna.map(mU), ...(r2 ? r2.pts : []), [tx, ty]], i: 0 }; }   // (home past Barry's pond, as in the book)
  // home: Matthew helps her down; Marilla comes out: where is the boy?
  if (f.st && !f.arrived && M.where === 'gg' && !wmDriven('matthew')) { f.arrived = 1; dlgHecho('matthew_llego_casa'); CHAT_HOLD.matthew = TT + 1e6; }   // (home: he waits in the kitchen while what was being said on the way is said to the end)
  if (f.arrived && !f.home && !talkBusy('viaje') && !TALKS.some(t => t.esc === 'tejas_verdes')) {
    f.home = 1; dlgHecho('llegaron'); if (CAP1.juego) { cap1AlJuego(); return; } if (game.scene !== 'gg') goIn('gg'); ana.sit = false; cap1Mark('baja_ana', 'Matthew bajó a Ana de la calesa en el patio oscuro de Tejas Verdes, entre los álamos, y entraron a la casa.');
  }
}