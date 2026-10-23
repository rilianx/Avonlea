/* ---------- the loop ---------- */
const cam = { x: ana.x, y: ana.y };
let last = performance.now(), TT = 0, here = null, taskTick = 0, storyT = 2;
// Ana crying with her head on the table: a tear now and then, over its edge (drawn in front of it, with the effects)
function lagrimas(){
  ana.sortY = ana.llora && ana.sit && game.scene === 'gg' ? TABLE.y + 1 : ana.enCama && game.scene === 'ga' ? GA.bed.y + 1 : undefined;   // (lying on the table, in her bed: drawn after it)
  if (ana.enCama && game.scene === 'ga') { ana.x = GA.bed.x + 30; ana.y = GA.bed.y + 2; ana.goto = null; ana.vx = ana.vy = 0; }   // (in bed: where she is drawn, so the view and what she says follow her there)
  if (TT < (ana._lagT || 0)) return;
  if (ana.llora && ana.sit && game.scene === 'gg') { ana._lagT = TT + .45; for (const s of [-1, 1]) if (Math.random() < .7) fx.push({ kind: 'drop', x: ana.x + s * (3 + Math.random() * 8), y: ana.y + 36, vy: 2 + Math.random() * 3, t: 0 }); }
  else if (ana.enCama === 'boca_abajo' && game.scene === 'ga') { ana._lagT = TT + .55; if (Math.random() < .8) fx.push({ kind: 'drop', x: GA.bed.x + 40 + Math.random() * 14, y: GA.bed.y - 10, vy: 2 + Math.random() * 2, t: 0 }); }
}
function update(dt){
  if (sleeping || game.final || narraPausa() || decidiendo()) return;   // (a card being read, a decision being taken: the world waits)   // (a card that explains: the world waits while it is read)
  TT += dt; dayT += dt / (MIN_S * 60 * 24); boil = Math.floor(TT * 6);
  const { night } = light();
  // the season: two days each
  const ns = (seasonCount() % 4 + 4) % 4;
  if (ns !== S) { S = ns; if (TT > 1) { logEv('Llegó ' + ['la primavera', 'el verano', 'el otoño', 'el invierno'][S] + '.', Object.keys(PEOPLE)); } if (TT > 1) notice(SICON[S] + ' ' + ['¡Llegó la primavera! Los manzanos están en flor.', '¡Llegó el verano! Hay bayas y manzanas, y luciérnagas de noche.', '¡Llegó el otoño! Las hojas se ponen rojas y doradas.', '¡Llegó el invierno! El lago se heló y la huerta duerme bajo la nieve.'][S]); }
  // late at night Ana gets sleepy (twice, out loud), and past two in the morning she falls asleep
  { const hn = hourNow(); if (hn < 20) sleepyStage = 0;
    else if (hn >= 26 && !game.talk) goSleep(true);
    else if (sleepyStage < 2 && hn >= [21, 23.5][sleepyStage] && !game.talk && !amb.cur && !writtenTalkOn() && !(dlgHechos().inicio_juego && !dlgHechos().llegada_tv) && !CAP1.on) comentar('sueno_' + (++sleepyStage)); }
  // Ana: walks where she is told (not while talking or cooking); sits on the bench until she moves
  let mx = 0, my = 0;
  if (!menuOpen() && !game.cooking && !game.map && $('ajustes').hidden) {
    if (keys.has('ArrowLeft') || keys.has('KeyA')) mx--; if (keys.has('ArrowRight') || keys.has('KeyD')) mx++;
    if (keys.has('ArrowUp') || keys.has('KeyW')) my--; if (keys.has('ArrowDown') || keys.has('KeyS')) my++;
    if (stick) { const dx = stick.x - stick.x0, dy = stick.y - stick.y0, l = Math.hypot(dx, dy); if (l > 10) { mx = dx / Math.max(l, 50); my = dy / Math.max(l, 50); } }
  }
  if (ana.hidden) { mx = my = 0; if (ana.goto && !ana.goto.wm) ana.goto = null; }
  if ((mx || my) && !ANA_AUTO) { const q = anaQuieta(); if (q) { mx = my = 0; anaQuietaAvisar(q); } }   // (in the middle of a scene with her, or asleep: she stays)
  if (game.scene === 'camino' && ana.onCart && (mx || my || (ana.goto && !ana.goto.wm))) roadGetOff();   // (moving her: she gets down from the buggy)
  if (ANA_AUTO) { if (mx || my) { freeStart(); const v = 520 / (cam.zoom || 1) / (viewZoom || 1); freeCam.x += mx * v * dt; freeCam.y += my * v * dt; } mx = my = 0; }   // (on her own: the keys move the view)
  if (game.talk?.deadline && TT > game.talk.deadline && !sayOpen) { game.talk.deadline = 0; autoChoose(); }
  autoTick(); cartTick(dt); roadTick(dt); buggyTick(); roadTalkTick(dt); dlgTick(dt); talkTick(dt); cap1Tick(); momentsTick(); lugaresTick(dt); inicioTick(dt); lagrimas(); ropaTick(); folkTick(dt); faunaTick(dt); agentTick(dt); jugarTick(dt); correoTick(dt); sickTick(); apartarTick(); cuadernoTick(dt); habilidadesTick(dt); historiaTick(dt); nocheTick(dt); noticiasTick(dt); llegadasTick(dt); juntasTick(dt); agendaTick(); wmApproachTick(dt); calledTick(); convIrTick(); convEsperoTick(); chatTick(dt); wmFollowTick();
  if (RELATO.on) relatoTick();   // (the account of what happens, once all have moved: 66-relato.js)
  ana.torn = !!game.anaStates.rasgado; ana.askew = !!game.anaStates.despeinada;
  ana.savoring = false;
  // walking to something she was sent to (a tap): by the A* path, and doing it on arrival
  if (cart.riding && (mx || my || ana.goto)) cartOff();
  const gt = ana.goto;
  if (gt && (menuOpen() || game.cooking || (game.map && !gt.dest) || mx || my || game.scene !== gt.scene)) ana.goto = null;
  else if (gt) {
    const t = gt.id ? targets().find(q => q.id === gt.id) : null;
    if (gt.id && !t) ana.goto = null;
    else if (gt.auto && amb.cur) { /* a talk is going on: she waits */ }
    else if (gt.stroll && TT < (ana.savor?.until || 0)) { ana.savoring = true; }   // (stopped for a moment, to look around)
    else if (t && dist(ana.x, ana.y, t.x, t.y) < t.reach * .85) { ana.goto = null; { ACT_SOLA = !!gt.auto; try { (gt.use || (gt.auto || gt.wm ? t.act : () => opcionesAct(t)))(); } finally { ACT_SOLA = false; } } }
    else {
      const sk = ana.stk; if (!sk || dist(ana.x, ana.y, sk.x, sk.y) > 6) ana.stk = { x: ana.x, y: ana.y, t: TT }; else if (TT - sk.t > 1.5) { ana.nav = null; ana.stk = null; }   // (stuck: find the way again)
      const n = navStep(ana, t ? t.x : gt.x, t ? t.y : gt.y); if (n.arrived && t && /^[pf]:/.test(t.id) && dist(ana.x, ana.y, t.x, t.y) >= t.reach && TT - (gt.t0 ??= TT) < 15) { ana.nav = null; }   // (someone who moved on: she goes after them, a while)
      else if (n.arrived) { if (gt.wm) ana.wmArr = TT; ana.goto = null; if (gt.alLlegar) gt.alLlegar(); if (t && dist(ana.x, ana.y, t.x, t.y) < t.reach) { ACT_SOLA = !!gt.auto; try { (gt.use || (gt.auto || gt.wm ? t.act : () => opcionesAct(t)))(); } finally { ACT_SOLA = false; } } } else { const dx = n.wx - ana.x, dy = n.wy - ana.y, d = Math.hypot(dx, dy) || 1; mx = dx / d; my = dy / d; } }
  }
  // how fast: a walk (Shift to hurry), or a stroll when she is out on her own: every so often she stops to look about
  if (dest && !ana.goto?.dest) dest = null;
  if (!$('wmp').hidden && (wmDrawT -= dt) < 0) { wmDrawT = .5; wmRunDraw(); }
  ana.pace = ana.goto?.stroll ? STROLL : ana.goto?.wm && AGENTS.ana ? wmPace(AGENTS.ana) : ana.goto?.dest ? MAPWALK : (keys.has('ShiftLeft') || keys.has('ShiftRight')) ? RUN : WALK;
  if (realR.fact('tobillo:ana')) ana.pace *= .45;   // (the twisted ankle, the rest of the day: she limps)
  if (ana.goto?.stroll) { const sv = ana.savor = ana.savor || { next: TT + 5 + Math.random() * 6, until: 0 }; if (!ana.savoring && TT > sv.next && TT >= sv.until) { sv.until = TT + 2.5 + Math.random() * 3.5; sv.next = sv.until + 6 + Math.random() * 8; } }
  const l = Math.hypot(mx, my); if (l > 1) { mx /= l; my /= l; }
  ana.moving = l > .05;
  if (ana.moving) { ana.meal = null; ana.sit = false; ana.lie = false; ana.vx = lerp(ana.vx, mx * ana.pace, .25); ana.vy = lerp(ana.vy, my * ana.pace, .25); ana.dir = Math.abs(mx) > Math.abs(my) * .9 ? (mx > 0 ? 1 : 3) : (my > 0 ? 2 : 0); ana.idle = 0; ana.lookAround = 0; }
  else { ana.vx *= .7; ana.vy *= .7; ana.idle += dt; }
  if (!ana.sit) moveBy(ana, ana.vx * dt, ana.vy * dt);
  ana.walk = ana.moving ? (ana.walk + dt * 1.9 * Math.hypot(ana.vx, ana.vy) / SPEED) % 1 : 0;
  if (ana.idle > 3 && ana.idle < 9 && !ana.sit && !game.talk && !AGENTS.ana?.acting) { ana.dir = 2; ana.lookAround = Math.sin(ana.idle * 1.4) * 1.4; }
  if (ana.savoring) ana.lookAround = Math.sin(TT * 1.4) * 1.4;
  if (ana.idle > 9 && game.scene === 'out' && !game.talk && !ana.lie && !(AGENTS.ana && activeGoals(AGENTS.ana).length)) ana.sit = true;   // (resting, when she has nothing to do: not in the middle of an errand)
  for (const p of [ana, ...Object.values(PEOPLE)]) { p.blink -= dt; if (p.blink < -2.5 - Math.random() * 3) p.blink = .14; }
  // cooking: a moment at the stove, then it is ready
  if (game.cooking && (game.cooking.t -= dt) <= 0 && !game.cooking.sale) { const o = oficio('ana', 'cocinar'); practicar('ana', 'cocinar'); if (!o.sale && game.cooking.k !== 'te') { game.cooking = null; anaSays('~' + o.mal); float('Se arruinó', STOVE.x, STOVE.y - 70); logEv('A Ana se le arruinó lo que cocinaba.', []); save(); } else game.cooking.sale = true; }   // (Ana learns to cook a day at a time: at first, it goes wrong now and then; the tea, always)
  if (game.cooking?.sale) { const k = game.cooking.k; game.inv[k]++; game.cooking = null; logEv('Ana cocinó ' + { tarta: 'una tarta de bayas', compota: 'compota de manzana', te: 'té' }[k] + ' en la cocina de Tejas Verdes.'); taskEvent('cocinar', k); storyEvent('cocinado'); storyEvent('cocinado:' + k); float('¡' + { tarta: 'Tarta de bayas', compota: 'Compota de manzana', te: 'Té' }[k] + ' lista!', STOVE.x, STOVE.y - 70); sfx.done(); save(); }
  // the others: Matthew about the farm, Diana about her garden (or with Ana), Marilla in the kitchen
  // (Diana goes home in the evening and stays in all winter; Mrs. Barry keeps the parlour)
  const wantHome = night > .35 || S === 3, busy = w => (menuOpen() && game.talk.who === w) || (!!amb.cur?.parts.includes(w) && !PEOPLE[w].story && (PEOPLE[w].want == null || PEOPLE[w].where === PEOPLE[w].want));
  // a new day: news are shared at home, old errands lapse; then the plans are carried out
  if (game.lastDay !== today()) {
    if (game.lastDay != null && game.lastDay < today()) {
      shareNews();
      for (const t of activeTasks().filter(t => today() - t.d >= 2)) { t.done = t.thanked = true; know(t.from, `Ana no alcanzó a hacer el encargo: ${taskText(t)}.`); }
      game.tasks = game.tasks.filter(t => !(t.done && t.thanked));
    }
    game.lastDay = today(); save();
  }
  if ((storyT -= dt) < 0 && AJUSTES.stories) { storyT = .5; storyTick(); if ((!game.story || game.story.day !== today()) && hourNow() < 18 && TT > 4) makeStory(); }
  mealTick(); almuerzoBuscar(); wsTick(); ambUpdate(dt); encUpdate(dt); for (const b of bubbles) { if (!b.t) { oido(b.q, b.text); if (burbujaAqui(b)) comOido(b.q, b.text); } b.t += dt; } bubbles = bubbles.filter(b => b.t < b.dur + .35);   // (what is said, Ana heard it today: src/js/24-personajes.js)
  if ((taskTick -= dt) < 0) { taskTick = .5; taskEvent('ir'); }
  // everyone but Diana follows their routine: where they are wanted (home, or visiting), walking there, or about the place
  const hr = hourNow(), visiting = k => !!CH[k].routine && PEOPLE[k].where !== 'out' && PEOPLE[k].where !== CH[k].home;
  // (away from Avonlea while the book says so, src/datos/llegadas.txt: Diana, at her aunt's in Carmody)
  for (const [k, p] of Object.entries(PEOPLE)) if (ausente(k)) { if (p.where !== 'away') { p.where = 'away'; p.nav = null; p.dest = null; p.moving = false; p.sit = false; } p.story = null; p.follow = false; p.want = 'away'; }
  for (const [k, p] of Object.entries(PEOPLE)) {
    const c = CH[k]; if (ausente(k) || (wmDriven(k) && !p.busca) || c.companion) continue;
    if (CHAT_HOLD[k] > TT) { p.moving = false; continue; }   // (stopped for a chat)
    if (k === game.tripWith && !p.busca) { p.want = p.where; continue; }   // (unless she gets off to look for Ana: src/js/34-viaje-white-sands.js)   // (he went with Ana to Bright River)
    if (p.where === 'camino') continue;   // (on the road: it takes them home)
    p.want = p.recibe && p.recibe.hasta > TT && HOUSES[c.home] ? c.home : (game.wm?.sick || []).includes(k) && HOUSES[c.home] ? c.home :   // (someone is coming to visit her: she stays home, or goes back)
      p.story ? p.story.room : (p.away && p.away.day === today() && hr < p.away.until) ? 'away' : c.routine ? c.routine.want(hr, today()) : c.home;
    if (p.story?.place && p.where === 'out') p.target = { place: p.story.place, until: 99, story: true };
    if (p.vamos && TT < p.vamos.hasta) { if (ROOMS[p.vamos.place]) p.want = p.vamos.place; else { p.want = 'out'; if (p.where === 'out') p.target = { place: p.vamos.place, until: 99 }; } }   // (going somewhere with Ana: «se_hace_en»)
    if (p.busca && TT < p.busca.hasta) { p.want = 'out'; if (p.where === 'out') p.target = { ana: true, until: 99, busca: true }; }   // (sent to look for Ana: src/js/11-cocina-tejas-verdes.js, almuerzoBuscar)
    if (c.hostGoals) p.goals = Object.keys(PEOPLE).some(o => visiting(o) && PEOPLE[o].where === p.where) ? c.hostGoals : p.base;
    if (p.where === 'br' && p.want !== 'br') { roadStart(k, 0, 1); continue; }
    if (busy(k)) continue;
    const seat = p.where === 'gg' && p.want === 'gg' && MEAL(hr) && !p.story && SEATS[k];   // (mealtime: to the table)
    if (seat) { sitSeat(p, seat, dt, c.speed.room || 30); continue; }
    if (p.mealSat) { p.mealSat = false; p.sit = false; if (p.where === 'gg') { p.x = seatFrom(SEATS[k])[0]; p.y = seatFrom(SEATS[k])[1]; } }
    if (p.where !== p.want) { p.target = null; commute(p, p.want, dt, c.speed.walk); }
    else if (p.where === 'out') { if (!goTarget(p, dt, c.speed.walk) && watched('out')) inScene('out', () => wander(p, dt, c.speed.out)); }
    else if (watched(p.where)) inScene(p.where, () => wander(p, dt, c.speed.room));
  }
  if (!ausente('diana') && !wmDriven('diana') && !(CHAT_HOLD.diana > TT)) {   // (unless she is carrying out a goal of her own)
  if (diana.sit && !ana.sit) diana.sit = false;
  const wantHomeD = wantHome && diana.story?.room !== 'out';
  const dianaIn = () => { diana.where = 'os'; diana.goals = DIANA_IN; diana.x = DIANA_IN[0][0]; diana.y = DIANA_IN[0][1]; diana.homeT = 0; diana.moving = false; };
  if (diana.story && !diana.follow) {   // (the story of the day wants her somewhere)
    if (diana.story.room === 'out') { if (diana.where === 'os') { diana.where = 'out'; diana.goals = DIANA_OUT; diana.x = OS.x; diana.y = OS.y + 30; diana.sit = false; } diana.target = { place: diana.story.place, until: 99, story: true }; }
    else if (diana.story.room === 'os' && diana.where === 'out') dianaIn();
  }
  if (diana.follow) {
    if (diana.where === game.scene && !diana.sit) {
      const lying = ana.lie && game.scene === 'out', tx = lying ? ana.x + 6 : ana.x + (ana.dir === 1 ? -24 : 24), ty = lying ? ana.y + 24 : ana.y - 6;
      if (dist(diana.x, diana.y, tx, ty) > 18) { diana.lie = false; walkPath(diana, tx, ty, Math.max(34, ana.pace) * (dist(diana.x, diana.y, tx, ty) > 80 ? 1.5 : 1), dt); }
      else { diana.moving = false; diana.dir = ana.dir; diana.lie = lying; }
    }
    if (night > .6 && game.scene === 'out' && !game.talk) { diana.follow = false; float('Diana se fue a casa', diana.x, diana.y - 60); }
  } else if (diana.where === 'out') {
    diana.goals = DIANA_OUT;
    if (game.scene !== 'out') { if (wantHomeD) dianaIn(); }
    else if (wantHomeD) { diana.homeT = (diana.homeT || 0) + dt; if (walkPath(diana, OS.x, OS.y + 10, 46, dt) || diana.homeT > 20 || dist(diana.x, diana.y, cam.x, cam.y) > 700) dianaIn(); }
    else if (diana.lie) { if (TT > (diana.lieUntil || 0) || busy('diana') || night > .3) diana.lie = false; }
    else if (!busy('diana') && !goTarget(diana, dt, 46)) {
      wander(diana, dt, 40);
      if (diana.wait > 2 && S !== 3 && night < .3 && !underTree(diana.x, diana.y) && TT > (diana.lieAt = diana.lieAt || TT + 60 + Math.random() * 90)) { diana.lie = true; diana.moving = false; diana.lieUntil = TT + 25 + Math.random() * 30; diana.lieAt = diana.lieUntil + 90 + Math.random() * 120; }
    }
  } else if (diana.where === 'os') {
    diana.goals = DIANA_IN;
    if (!wantHomeD && game.scene !== 'os' && diana.story?.room !== 'os') { diana.where = 'out'; diana.goals = DIANA_OUT; diana.goal = 0; diana.x = OS.x; diana.y = OS.y + 30; diana.sit = false; }
    else if (game.scene === 'os' && !diana.sit && !busy('diana')) wander(diana, dt, 30);
  } else if (game.scene === diana.where) {
    // she came along into Green Gables and was told goodbye: out of the door she goes
    if (walkTo(diana, KDOOR.x, KIT.h - 8, 40, dt)) { diana.where = 'out'; diana.x = GG.x - 20; diana.y = GG.y + 30; }
  } else { diana.where = 'out'; diana.x = GG.x - 20; diana.y = GG.y + 30; }
  }
  tobyThink(dt); animalsThink(dt);
  // the garden grows (a watered bed comes up a stage after a while); berries and apples come back
  // (what grows, grows at night: a bush picked clean has berries again tomorrow, not in a quarter of an hour; src/js/22-dormir.js)
  // what she can do here, and doing it
  here = menuOpen() || game.cooking || game.map || !$('ajustes').hidden ? null : near();
  if (actNow) { actNow = false; if (here) here.act(); }
  // life about
  for (const b of butterflies) { b.ph += dt * 9; const dx = b.tx - b.x, dy = b.ty - b.y, dd = Math.hypot(dx, dy); if (dd < 8) { b.tx = clamp(b.x + (Math.random() - .5) * 300, 0, WW); b.ty = clamp(b.y + (Math.random() - .5) * 300, 0, WH); } else { b.x += dx / dd * 22 * dt; b.y += dy / dd * 22 * dt; } }
  for (const f of fireflies) { f.ph += dt; f.x += Math.sin(f.ph * .7) * .3; f.y += Math.cos(f.ph * .5) * .25; }
  for (const c of clouds) { c.x += 9 * dt; c.y += 3 * dt; if (c.x - c.r > WW) { c.x = -c.r; c.y = Math.random() * WH; } }
  nextBirds -= dt;
  for (const w of weather) { w.ph += dt * 2; w.y += dt * (S === 3 ? .045 : .07) * w.s; w.x += dt * (Math.sin(w.ph) * .02 + (S === 3 ? .006 : .025)); if (w.y > 1.02) { w.y = -.02; w.x = Math.random(); } if (w.x > 1.02) w.x = -.02; }
  if (nextBirds < 0 && night < .5 && game.scene === 'out' && S !== 3) { nextBirds = 14 + Math.random() * 20; const y = cam.y - 200 + Math.random() * 400; birds = Array.from({ length: 3 + Math.floor(Math.random() * 3) }, (_, k) => ({ x: cam.x - 700 - k * 26, y: y + (k % 2) * 16, ph: Math.random() * TAU })); }
  for (const b of birds) { b.x += 120 * dt; b.ph += dt * 10; } birds = birds.filter(b => b.x < cam.x + 900);
  for (const f of fx) { f.t += dt; if (f.kind === 'drop') { f.vy += 200 * dt; f.y += f.vy * dt; } }
  fx = fx.filter(f => f.t < (f.kind === 'text' ? 2 : 1.2));
  // by the lighthouse the view opens up (the whole tower, the sea): the camera draws back and looks up a little
  const vs = viewScene(), ob = obsScene() === 'out' || obsScene() === 'camino' ? wmBody(OBS) : ana;   // (the camera follows Ana, or whoever is watched)
  const byFaro = vs === 'out' && dist(ob.x, ob.y, FARO.x, FARO.y) < 560;
  cam.zoom = lerp(cam.zoom ?? 1, byFaro ? .55 : vs === 'camino' ? .72 : 1, .04);
  if (vs === 'out' && ANA_AUTO && freeCam.free && !obsScene()) { const k = cam.snap ? 1 : .3; cam.snap = false; cam.x = lerp(cam.x, freeCam.x, k); cam.y = lerp(cam.y, freeCam.y, k); }
  else if (vs === 'out' || vs === 'camino') { const k = cam.snap ? 1 : .08; cam.snap = false; cam.x = lerp(cam.x, ob.x, k); cam.y = lerp(cam.y, ob.y - 20 - (byFaro ? 150 : 0), k); }
  obsBar();
}
// what is drawn is the scene being looked at: Ana's, or that of whoever she is watching (Ana and Toby only in hers)
let RENDER_REAL = 'out';
// the floor outdoors: the painted ground (baldosas), what stays still (fijo: the rivers, the lake, the pads, the dunes,
// the rocks) and what moves (vivo: the waves and the glints of the water, the grass, the flowers, the beds, the reeds).
// Each frame asks for all of it, in this order (the parts apart: to keep the still part as an image one day).
function sueloPintar(g, ox, oy, vw, vh, t, P){
  const inView = (x, y, m = 80) => x > ox - m && x < ox + vw + m && y > oy - m && y < oy + vh + m * 2;
  if (P.baldosas) for (let tx = Math.floor(ox / TILE); tx * TILE < ox + vw; tx++) for (let ty = Math.floor(oy / TILE); ty * TILE < oy + vh; ty++) { const cv = groundTile(tx, ty); g.drawImage(cv, .5, .5, cv.width - 1, cv.height - 1, tx * TILE, ty * TILE, TILE, TILE); }
  // the sea along the coast: waves coming in (lines along the shore, offset towards the sea)
  if (P.vivo) if (S !== 3) for (const [a, b] of coastSegs) { if (Math.max(a[0], b[0]) < ox - 100 || Math.min(a[0], b[0]) > ox + vw + 100 || Math.max(a[1], b[1]) < oy - 200 || Math.min(a[1], b[1]) > oy + vh + 100) continue; const L = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = (b[1] - a[1]) / L, ny = -(b[0] - a[0]) / L; g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 1.4; for (let k = 0; k < 4; k++) { const o = 40 + k * 34 + Math.sin(t * 1.2 + k) * 6; g.beginPath(); for (let q = 0; q <= 1; q += .05) { const x = lerp(a[0], b[0], q) + nx * o, y = lerp(a[1], b[1], q) + ny * o + Math.sin(q * 20 + t * 1.5 + k) * 3; q ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); } }
  if (P.fijo) for (const w of WATERS.filter(w => w.pts !== brook)) { g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = S === 3 ? '#cfe2ea' : '#6aa8c4'; g.lineWidth = 40; g.beginPath(); g.moveTo(...w.pts[0]); w.pts.slice(1).forEach(p => g.lineTo(...p)); g.stroke(); }
  // the brook and the lake: water with the sky's shimmer, lily pads, a fish jumping now and then
  // (in winter both are frozen: pale ice with cracks, and a glint now and then)
  const ice = S === 3;
  if (P.fijo) { g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = ice ? '#cfe2ea' : '#6aa8c4'; g.lineWidth = 28; g.beginPath(); g.moveTo(...brook[0]); brook.slice(1).forEach(p => g.lineTo(...p)); g.stroke(); }
  if (P.vivo) { g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 1.2;
  if (!ice) for (let k = 0; k < 40; k++) { const s = brookSegs[k % brookSegs.length], q = ((t * .25 + k * .37) % 1), x = lerp(s[0][0], s[1][0], q) + Math.sin(k * 3) * 6, y = lerp(s[0][1], s[1][1], q); if (inView(x, y)) { g.beginPath(); g.moveTo(x - 4, y); g.lineTo(x + 4, y + 1); g.stroke(); } } }
  if (P.fijo) { line(g, brook.map(([x, y]) => [x - 14, y]), 'rgba(60,90,110,.55)', 1); line(g, brook.map(([x, y]) => [x + 14, y]), 'rgba(60,90,110,.55)', 1, 5); }
  g.save(); g.beginPath(); g.ellipse(LAKE.x, LAKE.y, LAKE.rx, LAKE.ry, 0, 0, TAU); g.clip();
  if (P.fijo) { const wg = g.createLinearGradient(0, LAKE.y - LAKE.ry, 0, LAKE.y + LAKE.ry); wg.addColorStop(0, ice ? '#e2eff4' : '#6fb0cc'); wg.addColorStop(1, ice ? '#b9d4e0' : '#4a86a4'); g.fillStyle = wg; g.fillRect(LAKE.x - LAKE.rx, LAKE.y - LAKE.ry, LAKE.rx * 2, LAKE.ry * 2); }
  if (P.fijo) if (ice) { const r = rng(9); for (let k = 0; k < 14; k++) { let x = LAKE.x + (r() - .5) * LAKE.rx * 1.6, y = LAKE.y + (r() - .5) * LAKE.ry * 1.4; const pts = [[x, y]]; for (let q = 0; q < 4; q++) { x += (r() - .5) * 60; y += (r() - .5) * 24; pts.push([x, y]); } line(g, pts, 'rgba(120,150,170,.45)', .9, k); } }
  if (P.vivo) { g.strokeStyle = 'rgba(255,255,255,.3)'; g.lineWidth = 1.2;
  if (!ice) for (let k = 0; k < 12; k++) { const yy = LAKE.y - LAKE.ry + (k + .5) * LAKE.ry * 2 / 12, xx = LAKE.x + Math.sin(t * .6 + k * 1.7) * LAKE.rx * .55; g.beginPath(); g.moveTo(xx - 20, yy); g.quadraticCurveTo(xx, yy - 2 + Math.sin(t * 2 + k), xx + 20, yy); g.stroke(); }
  // sparkles: the Lake of Shining Waters shines
  for (let k = 0; k < 18; k++) { const a = Math.sin(t * 2 + k * 7.1), sx = LAKE.x + Math.sin(k * 12.9) * LAKE.rx * .8, sy = LAKE.y + Math.cos(k * 7.7) * LAKE.ry * .7; if (a > .6) { g.fillStyle = `rgba(255,255,240,${(a - .6) * 2})`; g.fillRect(sx - 2, sy, 4, 1); g.fillRect(sx, sy - 2, 1, 4); } }
  const jt = (t % 9) / 9, jx = LAKE.x + Math.sin(Math.floor(t / 9) * 3.1) * LAKE.rx * .5, jy = LAKE.y + Math.cos(Math.floor(t / 9) * 2.3) * LAKE.ry * .4;
  if (jt < .25 && !ice) for (let k = 0; k < 3; k++) { const r = jt * 4 * 26 + k * 7; g.strokeStyle = `rgba(255,255,255,${.5 * (1 - jt * 4)})`; g.beginPath(); g.ellipse(jx, jy, r, r * .45, 0, 0, TAU); g.stroke(); } }
  g.restore();
  if (P.fijo) ell(g, LAKE.x, LAKE.y, LAKE.rx, LAKE.ry, 'rgba(0,0,0,0)', 'rgba(60,90,110,.6)');
  if (P.fijo) if (!ice) for (const p of pads) { ell(g, p.x, p.y, p.r, p.r * .55, '#5c9a4c', true); if (p.bloom) { ell(g, p.x + 2, p.y - 2, 3, 2.2, '#ffd7e8', true); ell(g, p.x + 2, p.y - 2.5, 1.2, 1, '#f7e27a'); } }
  if (P.vivo) for (const b of BEDS) if (inView(b.x, b.y)) drawBed(g, b, t);
  // grass and flowers in the breeze, parting as she walks
  g.lineCap = 'round';
  const TC = [['rgba(70,130,45,.85)', 'rgba(110,165,64,.85)'], ['rgba(70,120,45,.85)', 'rgba(96,150,60,.85)'], ['rgba(140,130,60,.85)', 'rgba(175,150,70,.85)'], ['rgba(150,140,110,.7)', 'rgba(150,140,110,.7)']][S];
  const D_ = []; for (let cx = Math.floor((ox - 20) / DCH); cx * DCH < ox + vw + 20; cx++) for (let cy = Math.floor((oy - 20) / DCH); cy * DCH < oy + vh + 40; cy++) D_.push(decorAt(cx, cy));
  if (P.vivo) for (const d of D_) for (const s of d.tufts) {
  if (!inView(s.x, s.y, 20) || (S === 3 && s.c > .25)) continue;
  let bend = Math.sin(t * 1.6 + s.x * .02 + s.ph * .3) * 2.2;
  const dx = s.x - ana.x, dy = (s.y - ana.y) * 2, d = Math.hypot(dx, dy); if (d < 22) bend += (dx > 0 ? 1 : -1) * (22 - d) * .35;
  g.strokeStyle = s.c < .5 ? TC[0] : TC[1]; g.lineWidth = 1.2; g.beginPath();
  for (const o of [-3, 0, 3]) { g.moveTo(s.x + o, s.y); g.quadraticCurveTo(s.x + o * .6 + bend * .4, s.y - s.h * .6, s.x + o * 1.2 + bend, s.y - s.h); }
  g.stroke();
  }
  // flowers: all of them in spring and summer, a few in autumn, none under the snow
  if (P.vivo) for (const d of D_) for (let i = 0; i < d.flowers.length; i++) {
  const f = d.flowers[i];
  if (S === 3 || (S === 2 && i % 3) || !inView(f.x, f.y, 10)) continue;
  const b = Math.sin(t * 1.8 + f.ph) * 1.2;
  g.strokeStyle = '#5e9a3e'; g.lineWidth = 1; g.beginPath(); g.moveTo(f.x, f.y); g.lineTo(f.x + b, f.y - 6 * f.s); g.stroke();
  for (let k = 0; k < 5; k++) { const a = k / 5 * TAU + f.ph; ell(g, f.x + b + Math.cos(a) * 1.8 * f.s, f.y - 6 * f.s + Math.sin(a) * 1.3 * f.s, 1.4 * f.s, 1.1 * f.s, f.c); }
  ell(g, f.x + b, f.y - 6 * f.s, .9 * f.s, .9 * f.s, '#f2c14e');
  }
  if (P.vivo) for (const d of D_) for (const o of d.lupins) { if (S === 3 || (S === 2 && o.c > .3) || !inView(o.x, o.y, 20)) continue; const b = Math.sin(t * 1.4 + o.ph) * 1.4, col = ['#e88ab0', '#f2a6c4', '#d46a9c', '#c98ad8'][Math.floor(o.c * 4)], hg = 10 + o.s * 8; g.strokeStyle = '#5e9a3e'; g.lineWidth = 1; g.beginPath(); g.moveTo(o.x, o.y); g.lineTo(o.x + b, o.y - hg); g.stroke(); for (let k = 0; k < 5; k++) ell(g, o.x + b * (1 - k / 6), o.y - hg + k * 2.4, 2.2 - k * .2, 1.6, col); }
  if (P.fijo) for (const d of D_) for (const o of d.dunes) { if (!inView(o.x, o.y, 40)) continue; ell(g, o.x, o.y, 26 * o.s, 9 * o.s, S === 3 ? '#f2f5f7' : '#e8cf9a', true); for (let k = -2; k <= 2; k++) line(g, [[o.x + k * 6, o.y - 4], [o.x + k * 7 + Math.sin(t + o.ph + k) * 2, o.y - 16 * o.s]], S === 3 ? '#b9c4cc' : '#9aa85a', 1, k); }
  if (P.fijo) for (const d of D_) for (const o of d.rocks) if (inView(o.x, o.y, 20)) ell(g, o.x, o.y, 9 * o.s, 6 * o.s, '#a8796a', true);
  if (P.fijo) if (inView(MILK.x, MILK.y) && S !== 3) for (let k = 0; k < 4; k++) { const x = MILK.x - 14 + k * 9, y = MILK.y + Math.sin(t * 2 + k) * 1.2; blob(g, [[x - 2.6, y], [x + 2.6, y], [x + 2.6, y - 9], [x + 1.2, y - 12], [x - 1.2, y - 12], [x - 2.6, y - 9]], 'rgba(250,250,245,.95)'); line(g, [[x - 1.2, y - 13], [x + 1.2, y - 13]], '#7a5536', 1.6, k); }
  if (P.vivo) for (const r of reeds) { if (!inView(r.x, r.y)) continue; const b = Math.sin(t * 1.2 + r.ph) * 2; line(g, [[r.x, r.y], [r.x + b * .5, r.y - r.h * .6], [r.x + b, r.y - r.h]], S >= 2 ? '#9a8a4a' : '#6b8f3a', 1.5, r.h); ell(g, r.x + b, r.y - r.h + 3, 1.6, 3.6, '#7a5536'); }
}
function render(){ const real = game.scene; RENDER_REAL = real; game.scene = viewScene(); try { renderView(); } finally { game.scene = real; } }
function renderView(){
  const W = innerWidth, H = innerHeight, dpr = devicePixelRatio || 1;
  if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
  const { night, dusk } = light(), t = TT, road = game.scene === 'camino', inside = game.scene !== 'out' && !road;
  drawingOut = !inside;
  const BOT = W > 600 ? 76 : 0;   // (the column of buttons on the right, on a wide screen: the room fits beside it)
  const Z = inside ? Math.min((W - BOT) / KIT.w, H / KIT.h) * .94 : clamp(Math.min(W / ((H > W ? 8 : 12) * T), H / (9 * T)), 1.1, 3.2) * (cam.zoom ?? 1) * viewZoom;
  const vw = W / Z, vh = H / Z;
  // (inside, the whole room fits on the screen, centered; if some day one does not fit, the view follows Ana there, or
  // whoever is being watched)
  let ox, oy;
  if (inside) {
    const ob = OBS && wmScene(OBS) === game.scene ? wmBody(OBS) : null, f = ob || ana, sn = view.salaScene !== game.scene;
    const tx = vw >= KIT.w ? (KIT.w - (W - BOT) / Z) / 2 : clamp(f.x - vw / 2, 0, KIT.w - vw), ty = vh >= KIT.h ? (KIT.h - vh) / 2 : clamp(f.y - vh * .66, 0, KIT.h - vh);   // (Ana low on the screen: the wall, its window and its things, above)
    view.sx = sn ? tx : lerp(view.sx, tx, .1); view.sy = sn ? ty : lerp(view.sy, ty, .1); view.salaScene = game.scene;
    ox = view.sx; oy = view.sy;
  } else { view.salaScene = null; ox = clamp(cam.x - vw / 2, 0, (road ? RW : WW) - vw); oy = clamp(cam.y - vh / 2, 0, (road ? RH : WH) - vh); }
  view.ox = ox; view.oy = oy; view.Z = Z; view.inside = inside;
  g.setTransform(dpr, 0, 0, dpr, 0, 0); g.fillStyle = '#2b2219'; g.fillRect(0, 0, W, H);
  g.setTransform(dpr * Z, 0, 0, dpr * Z, -ox * dpr * Z, -oy * dpr * Z);
  const inView = (x, y, m = 80) => x > ox - m && x < ox + vw + m && y > oy - m && y < oy + vh + m * 2;
  const list = [];
  if (inside) {
    const I = ROOMS[game.scene]; I.draw(g, t, night); list.push(...I.items(g, t));
    for (const k of Object.keys(PEOPLE)) if (sceneOf(k) === game.scene) list.push({ y: PEOPLE[k].y, draw: () => drawPerson(g, PEOPLE[k], t) });
    for (const f of FOLK) if (f.where === game.scene) list.push({ y: f.y + (f.sit ? 6 : 0), draw: () => drawPerson(g, f, t) });
    for (const it of game.ground) if (it.scene === game.scene) list.push({ y: it.y, draw: () => drawGround(g, it) });
  } else if (road) {
    roadView(g, ox, oy, vw, vh, t, night, list);
    for (const it of game.ground) if (it.scene === 'camino') list.push({ y: it.y, draw: () => drawGround(g, it) });
  } else {
    sueloPintar(g, ox, oy, vw, vh, t, { baldosas: true, fijo: true, vivo: true });
    for (const o of [...props, ...trees, ...bushes]) if (inView(o.x, o.y, 170)) list.push({ y: o.y, draw: () => drawProp(g, o, t, night) });
    for (const k of Object.keys(PEOPLE)) if (sceneOf(k) === 'out') { const p = PEOPLE[k]; if (p.buggy) pushDriven(list, g, p, t); else list.push({ y: p.sortY ?? p.y, draw: () => drawPerson(g, p, t) }); if (CH[k].vehicle === 'cart') list.push({ y: p.y - .5, draw: () => drawCart(g, p, t) }); }
    if (cart.on && inView(cart.x, cart.y, 120)) pushCart(list, g, cart, t);
    for (const f of FOLK) if (f.where === 'out' && inView(f.x, f.y)) list.push({ y: f.sortY ?? f.y, draw: () => drawPerson(g, f, t) });
    for (const a of FAUNA) if (inView(a.x, a.y - (a.alt || 0), 60)) list.push({ y: a.fly ? a.y + 1e5 : a.water ? a.y - 40 : a.y, draw: () => FAUNA_DRAW[a.kind](g, a, t) });
    for (const b of BUGGIES) if (inView(b.x, b.y, 120)) list.push({ y: b.y + 1, draw: () => drawBuggy(g, b, t) });
    if (dest && inView(dest.x, dest.y)) list.push({ y: dest.y, draw: () => { const w = Math.sin(t * 4) * 2; ell(g, dest.x, dest.y, 8, 3, 'rgba(30,40,20,.25)'); line(g, [[dest.x, dest.y], [dest.x, dest.y - 30]], '#5a3a24', 1.6, 1); blob(g, [[dest.x, dest.y - 30], [dest.x + 16, dest.y - 25 + w * .3], [dest.x, dest.y - 20]], '#d9433b'); } });
    for (const a of Object.values(ANIM)) if (a.kind === 'cow' && a.where === 'out' && inView(a.x, a.y)) list.push({ y: a.y, draw: () => drawCow(g, a, t) });
    for (const it of game.ground) if (it.scene === 'out' && inView(it.x, it.y)) list.push({ y: it.y, draw: () => drawGround(g, it) });
  }
  const anaHere = RENDER_REAL === game.scene;
  if (anaHere && sipping()) list.push({ y: ana.y + .2, draw: () => drawCup(g, ana) });
  if (anaHere && !ana.hidden && ana.sortY != null && ana.llora) list.push({ y: ana.y, draw: () => drawLlorando(g, ana, t, 'espalda') });   // (crying on the table: her back behind it, her arms and head on it)
  if (anaHere && !ana.hidden) list.push({ y: ana.sortY ?? ana.y + (ana.sit && !inside ? 6 : 0), draw: () => { drawPerson(g, ana, t); if (realR.fact('adorno:ana') && !ana.lie && !ana.sit && LOOKS.ana.hat) ACC_OBJ.sombrero.f(g, ana); } });   // (with the wreath of flowers on her hat, the day she made it)
  accPush(list, g, t);   // (what each one is doing, with its things)
  if (toby.where === game.scene) list.push({ y: toby.y, draw: () => { g.save(); g.translate(toby.x, toby.y); g.scale(1.6, 1.6); drawCat(g, { ...toby, x: 0, y: 0 }, t); if (!toby.moving && toby.sleep && toby.mode !== 'ana') { g.fillStyle = 'rgba(70,50,30,.6)'; g.font = 'italic 6px Georgia, serif'; g.fillText('z', 6, -16 - (t * 3 % 4)); } g.restore(); } });
  if (OBS) { const b = wmBody(OBS); if (b && !b.lie) list.push({ y: 1e9, draw: () => { const hy = b.y - 50 * (LOOKS[b.look]?.h || 1) - 4 + Math.sin(t * 4) * 1.5; blob(g, [[b.x - 5, hy - 7], [b.x + 5, hy - 7], [b.x, hy]], '#e0a030'); } }); }   // (a little arrow over whoever is watched)
  list.sort((a, b) => a.y - b.y).forEach(o => o.draw());
  if (road) roadCanopy(g, ox, oy, vw, vh, t);
  // a little "!" over whoever has something for Ana: thanks, a present, a delivery, or came looking for her
  for (const [k, p] of Object.entries(PEOPLE)) {
    if (sceneOf(k) !== game.scene || (k === 'diana' && diana.follow) || !(p.wantsTalk || game.giftFor[k] || game.tasks.some(t => t.from === k && t.done && !t.thanked) || taskOptions(k).length)) continue;
    const by = p.y - 62 * LOOKS[p.look].h - Math.abs(Math.sin(t * 3)) * 3;
    blob(g, [[p.x - 6, by - 14], [p.x + 6, by - 14], [p.x + 6, by], [p.x + 2, by], [p.x, by + 4], [p.x - 2, by], [p.x - 6, by]], '#fbf3df');
    g.fillStyle = '#c0582e'; g.font = 'bold 12px Georgia, serif'; g.textAlign = 'center'; g.fillText('!', p.x, by - 2.5);
  }
  // a tree in front of her lets her show through a little
  if (!inside && !road && anaHere) for (const tr of trees) if (tr.y > ana.y + 4 && Math.abs(tr.x - ana.x) < 34 * tr.s && tr.y - ana.y < 90 * tr.s) { g.save(); g.globalAlpha = .5; drawPerson(g, ana, t); g.restore(); break; }
  if (!inside && !road) {
    if (S < 2) for (const b of butterflies) { if (!inView(b.x, b.y)) continue; const f = Math.abs(Math.sin(b.ph)), y = b.y - 18 + Math.sin(b.ph * .2) * 4; ell(g, b.x, b.y, 2.5, 1, 'rgba(30,40,20,.15)'); ell(g, b.x - 2.5 * f, y, 2.6 * f + .4, 2.2, b.c, true); ell(g, b.x + 2.5 * f, y, 2.6 * f + .4, 2.2, b.c, true); }
    for (const b of birds) { ell(g, b.x + 30, b.y + 60, 4, 1.5, 'rgba(30,40,20,.18)'); const f = Math.sin(b.ph) * 4; line(g, [[b.x - 6, b.y + f], [b.x - 2, b.y - 2], [b.x, b.y], [b.x + 2, b.y - 2], [b.x + 6, b.y + f]], '#4a4040', 1.4, 2); }
    for (const c of clouds) { if (!inView(c.x, c.y, c.r)) continue; const gr = g.createRadialGradient(c.x, c.y, c.r * .2, c.x, c.y, c.r); gr.addColorStop(0, `rgba(20,30,40,${.12 * (1 - night)})`); gr.addColorStop(1, 'rgba(20,30,40,0)'); g.fillStyle = gr; g.fillRect(c.x - c.r, c.y - c.r, c.r * 2, c.r * 2); }
  }
  // the little effects: words, hearts, drops
  for (const f of fx) {
    if (f.t < 0) continue;
    if (f.kind === 'text') { g.font = 'italic 9px Georgia, serif'; g.textAlign = 'center'; g.fillStyle = `rgba(255,250,235,${1 - f.t / 2})`; g.strokeStyle = `rgba(70,42,26,${.8 * (1 - f.t / 2)})`; g.lineWidth = 2.4; g.strokeText(f.text, f.x, f.y - f.t * 14); g.fillText(f.text, f.x, f.y - f.t * 14); }
    else if (f.kind === 'heart') { const y = f.y - f.t * 22, s = 3; g.fillStyle = `rgba(230,80,90,${1 - f.t / 1.2})`; g.beginPath(); g.moveTo(f.x, y + s); g.bezierCurveTo(f.x - s * 2, y - s * .5, f.x - s, y - s * 1.8, f.x, y - s * .6); g.bezierCurveTo(f.x + s, y - s * 1.8, f.x + s * 2, y - s * .5, f.x, y + s); g.fill(); }
    else if (f.kind === 'drop') ell(g, f.x, f.y, 1.2, 2, `rgba(120,180,220,${1 - f.t})`);
  }
  // the rope, when she leads a cow
  { const a = ledCow(); if (a && anaHere && a.where === game.scene) { const hx = ana.x + (ana.dir === 3 ? -7 : 7), hy = ana.y - 14, nx = a.x + (a.dir === 3 ? -14 : 14), ny = a.y - 17; g.strokeStyle = '#8a6a48'; g.lineWidth = 1.1; g.beginPath(); g.moveTo(hx, hy); g.quadraticCurveTo((hx + nx) / 2, Math.max(hy, ny) + 10, nx, ny); g.stroke(); } }
  // a little tag over what the pointer is on (or what she could do right here)
  const hov = hoverAt && anaHere && !menuOpen() && !game.map && $('ajustes').hidden ? targetAt(ox + hoverAt[0] / Z, oy + hoverAt[1] / Z) : null;
  cv.style.cursor = hov ? 'pointer' : '';
  // (no labels over things: what can be done is discovered by trying)
  // the light of the day (indoors a warm lamp at night)
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  // snowflakes, falling leaves, petals
  const nw = inside ? 0 : [22, 0, 30, 110][S];
  for (let k = 0; k < nw; k++) {
    const w = weather[k], x = w.x * W, y = w.y * H;
    if (S === 3) ell(g, x, y, (.8 + w.s) * Math.min(Z, 2.2) * .7, (.8 + w.s) * Math.min(Z, 2.2) * .7, 'rgba(255,255,255,.9)');
    else ell(g, x, y, 3.2 * w.s * Math.min(Z, 2), 1.5 * w.s * Math.min(Z, 2), S === 2 ? ['#c8583a', '#e08a3a', '#d4b240', '#a8432c'][w.c] : ['#fbdde3', '#f4c4cf', '#fffaf2', '#fbdde3'][w.c], true, w.ph);
  }
  if (dusk > 0 && !inside) { g.fillStyle = `rgba(255,150,70,${.2 * dusk})`; g.fillRect(0, 0, W, H); }
  if (night > 0) {
    g.fillStyle = inside ? `rgba(60,35,20,${.35 * night})` : `rgba(18,26,60,${.6 * night})`; g.fillRect(0, 0, W, H);
    g.globalCompositeOperation = 'lighter';
    const sc = (x, y) => [(x - ox) * Z, (y - oy) * Z];
    const glow = (x, y, r, col, a) => { const [sx, sy] = sc(x, y), rr = r * Z, gr = g.createRadialGradient(sx, sy, 0, sx, sy, rr); gr.addColorStop(0, `rgba(${col},${a})`); gr.addColorStop(1, `rgba(${col},0)`); g.fillStyle = gr; g.fillRect(sx - rr, sy - rr, rr * 2, rr * 2); };
    if (inside) { const [x, y, r, col, al] = ROOMS[game.scene].glow(t); glow(x, y, r, col, al * night); }
    else if (!road) {
      for (const H of HOUSE_SPOTS) for (const wx of [-H.w / 2 + 46, H.w / 2 - 46]) glow(H.x + wx, H.y - 30, 90, '255,190,100', .42 * night);
      if (Math.abs(FARO.x - cam.x) < 2600 && Math.abs(FARO.y - cam.y) < 2200) {   // the lighthouse: its lantern and two beams going round
        const [sx, sy] = sc(FARO.x, FARO.y - 165), L = 1100 * Z, a0 = t * .6;
        for (const a of [a0, a0 + Math.PI]) { const gr = g.createRadialGradient(sx, sy, 0, sx, sy, L); gr.addColorStop(0, `rgba(255,240,180,${.42 * night})`); gr.addColorStop(1, 'rgba(255,240,180,0)'); g.fillStyle = gr; g.beginPath(); g.moveTo(sx, sy); g.lineTo(sx + Math.cos(a - .07) * L, sy + Math.sin(a - .07) * L * .55); g.lineTo(sx + Math.cos(a + .07) * L, sy + Math.sin(a + .07) * L * .55); g.closePath(); g.fill(); }
        glow(FARO.x, FARO.y - 165, 70, '255,235,160', .9 * night);
      }
      if (S === 1) for (const f of fireflies) { const fx_ = ox + ((f.x + cam.x - ox) % vw + vw) % vw, fy = oy + ((f.y + cam.y - oy) % vh + vh) % vh, a = Math.max(0, Math.sin(f.ph * 1.7)) * night; if (a > .05) glow(fx_, fy - 14, 7, '230,255,140', a); }
    }
    g.globalCompositeOperation = 'source-over';
  }
  // paper grain and a soft vignette, like a page of a sketchbook
  {
  g.globalAlpha = .9; g.fillStyle = g.createPattern(paper, 'repeat'); g.fillRect(0, 0, W, H); g.globalAlpha = 1;
  const vg = g.createRadialGradient(W / 2, H / 2, Math.min(W, H) * .42, W / 2, H / 2, Math.max(W, H) * .75);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(60,40,20,.3)'); g.fillStyle = vg; g.fillRect(0, 0, W, H);
  }
  // speech bubbles over the heads of whoever is talking (on the screen, over the light of the day, so they read at night)
  cuadrosY = W < 640 ? 100 : 56;   // (the captions, from the top down: under the hint)
  const aqui = bubbles.map(b => [personOf(b.q), b]).filter(([p, b]) => p && burbujaAqui(b));
  for (const [p, b] of aqui) drawBubble(g, p, b, W, H, 'cuadros');   // (the captions first, at the top; the bubbles under them)
  for (const [p, b] of aqui) drawBubble(g, p, b, W, H);
  // the little papers: what she has, the hour, what she can do
  const I = game.inv, bits = [];
  for (const k of ITEMS) if (I[k]) bits.push(ITEM_DEFS[k].icon + ' ' + (k === 'dolares' ? money(I[k], true) : I[k]));
  if (game.hasCan) bits.push('💧 ' + game.water + '/6');
  $('inv').textContent = bits.length ? bits.join('  ') : 'Ana · ' + dondeAna();   // (with nothing in her hands: where she is)
  const ts = activeTasks(), tl = [...storyOpen().filter(e => !e.played).slice(0, 2).map(e => '📖 ' + e.hora + ':00 · ' + e.pista), ...ts.map(t => '📜 ' + taskText(t) + (t.para !== t.from || t.tipo !== 'traer' ? ' · ' + NAMES[t.from] : ''))].join('\n');
  if ($('tasks').dataset.t !== tl) { $('tasks').dataset.t = tl; $('tasks').textContent = tl; $('tasks').style.whiteSpace = 'pre-line'; $('tasks').hidden = !tl; }
  const d = dayT % 1, hh = Math.floor((d * 24 + 6) % 24), mm = Math.floor(((d * 24 + 6) % 1) * 60);
  $('clock').textContent = SICON[S] + ' ' + SEASONS[S] + ' · ' + ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'][today() % 7] + ' · ' + (night > .5 ? '☾ ' : '') + String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
  if (game.map) drawMap();
}