/* ---------- Ana on her own ----------
   When the player has not touched anything for a while Ana does what she wants: the game picks one of the things she
   could do here (by weights), sometimes says it out loud, and she goes and does it (A* paths, through the doors and
   up the stairs). Any key or tap gives control back. */
const AUTO_IDLE = 15;
let lastInput = 0, sayOpen = false;
const auto = { on: false, intent: null, thinkAt: 0, told: false, hist: [] };
const autoAllowed = () => AJUSTES.auto !== false && !game.talk && !game.cooking && !game.map && $('ajustes').hidden && $('rels').hidden && !sleeping && !sayOpen;
function userInput(){ lastInput = TT; auto.on = false; if (auto.intent) { auto.intent = null; if (ana.goto?.auto) ana.goto = null; } }
const randSpot = r => { for (let k = 0; k < 14; k++) { const x = ana.x + (Math.random() - .5) * 2 * r, y = ana.y + (Math.random() - .5) * 2 * r; if (!blocked(x, y)) return [x, y]; } return [ana.x, ana.y]; };
// the next thing to walk to on the way to a room ('out' = the fields)
function hopTo(goal){
  const sc = game.scene; if (sc === goal) return null;
  if (sc === 'out') return 'h:' + (goal === 'ga' ? 'gg' : goal);
  return sc === 'gg' && goal === 'ga' ? 'stairs' : 'door';
}
function autoOptions(){
  const O = [], hn = hourNow(), late = hn >= 20, sc = game.scene;
  const add = (label, intent, w = 1) => O.push({ label, intent, w });
  const skip = ['door', 'stairs', 'bed', 'stove'];   // (and on her own she leaves the cows alone: 'a:' — one she just took back to its pasture, above all)
  targets().filter(t => !t.self && t.pri < 50 && !t.id.startsWith('p:') && !t.id.startsWith('h:') && !t.id.startsWith('a:') && !skip.includes(t.id)).map(t => ({ t, d: dist(ana.x, ana.y, t.x, t.y) })).sort((a, b) => a.d - b.d).slice(0, 6)
    .forEach(({ t, d }) => add(t.label, { type: 'target', id: t.id }, (t.id.startsWith('bed:') ? 3 : t.id === 'toby' || t.id === 'pump' ? 2 : 1.5) / (1 + d / 400)));
  if (!late) add('Cocinar algo en la cocina', { type: 'cook' }, 1.2);
  for (const k of Object.keys(PEOPLE)) if (TT >= (amb.mute[k] || 0) && PEOPLE[k].where !== 'away' && !(k === 'diana' && diana.follow)) add('Ir a conversar con ' + CH[k].article + NAMES[k] + ' (' + whereText(k) + ')', { type: 'talkto', k }, 3);
  if (sc === 'out') for (const [id, h] of Object.entries(HOUSES)) if (!h.far) add('Entrar a ' + h.name, { type: 'house', id }, 1);
  else add('Salir a pasear', { type: 'house', id: 'out' }, 1.5);
  if (sc !== 'ga') add('Subir a su pieza', { type: 'house', id: 'ga' }, late ? 2 : .5);
  if (MEAL(hn) && !ana.meal && ['matthew', 'marilla'].some(k => PEOPLE[k].want === 'gg')) add('Sentarse a la mesa a ' + mealWord(hn).verb + ' con los Cuthbert', { type: 'meal' }, 6);
  if (late) add('Irse a dormir', { type: 'sleep' }, hn >= 22 ? 12 : 5);
  for (const key of ['lago', 'puente', 'camino_blanco', 'bosque_encantado', 'huerta', 'granero']) add('Pasear hasta ' + PLACES[key][0], { type: 'place', key }, 1);
  if (sc === 'out' && S !== 3 && hn < 19) add('Recostarse en el pasto a mirar las nubes', { type: 'lie' }, 1.5);
  const se = storyNow(); if (se) add('Ir a ' + placeName(se.lugar) + ' (la historia de hoy: ' + se.pista + ')', ROOMS[se.lugar] ? { type: 'house', id: se.lugar } : { type: 'place', key: se.lugar }, 6);
  add('Dar un paseo sin rumbo', { type: 'wander' }, 1.5); add('Quedarse un rato soñando despierta', { type: 'idle' }, 1);
  const fresh = O.filter(o => !auto.hist.slice(-2).includes(o.label));
  return fresh.length ? fresh : O;
}
function startIntent(intent, manual, said){
  if (!intent) return;
  auto.intent = { ...intent, manual }; auto.thinkAt = 0; if (manual) auto.on = true;
  if (said) anaSays(said);
}
// (lying down, nobody wants a tree crown between them and us)
const underTree = (x, y) => trees.some(tr => tr.y > y - 10 && Math.abs(tr.x - x) < 50 * tr.s && tr.y - y < 120 * tr.s);
function autoDecide(){
  const sa = storyAuto(); if (sa) { auto.hist.push(sa.label); if (auto.hist.length > 6) auto.hist.shift(); startIntent(sa.intent, false, ''); return; }   // (the story of the day comes first)
  const opts = autoOptions(); if (!opts.length) { auto.thinkAt = TT + 4; return; }
  let r = Math.random() * opts.reduce((a, o) => a + o.w, 0); const pick = opts.find(o => (r -= o.w) <= 0) || opts[0], said = Math.random() < .35 ? comentarioTexto('ana_sola') : '';
  auto.hist.push(pick.label); if (auto.hist.length > 6) auto.hist.shift();
  startIntent(pick.intent, false, said);
}
// a decision the player let pass: Ana takes it, by her character (weights) or by what the story of the day needs
const CHOICE_W = [[/Sí, lo haré/, 6], [/Vender/, 5], [/Paseamos/, 3], [/Seguir conversando/, 2.5], [/^Regalar|dinero/, 1.5], [/Adiós|Ahora no|Mejor no|Nada por ahora/, .5]];
const storyLive = () => { const st = AJUSTES.stories && game.story; return st && st.v === 2 && st.day === today() && !st.gen ? st.escenas.filter(e => e.estado === 'abierta' || e.estado === 'jugada' || e.estado === 'jugando').sort((a, b) => a.hora - b.hora) : []; };
function autoChoose(){
  const tk = game.talk, opts = game.talkOpts; if (!tk || !opts?.length) return;
  const who = tk.who, need = storyLive().filter(e => e.fin === 'evento').map(e => e.evento), score = l => (CHOICE_W.find(([rx]) => rx.test(l))?.[1] ?? 1) + (need.includes('vaca_vendida') && /Vender/.test(l) ? 10 : 0) + (need.includes('regalo:' + who) && /^Regalar|dinero/.test(l) ? 10 : 0);
  const k = opts.reduce((b, o, i) => score(o[0]) > score(opts[b][0]) ? i : b, 0);
  logEv('Ana decidió por su cuenta: ' + opts[k][0].replace(/^\W+/, '') + '.', [who, ...witnesses()]);
  opts[k][1]();
}
// what the story of the day needs from Ana right now (when she is on her own): go where it happens, and do what it waits for
function storyAuto(){
  for (const e of storyLive()) {
    if (e.estado === 'jugando') return null;
    const here = storyHere(e);
    if (e.estado === 'abierta' && !e.played && !here) return { label: 'Ir a ' + placeName(e.lugar) + ' (la historia de hoy)', intent: ROOMS[e.lugar] ? { type: 'house', id: e.lugar } : { type: 'place', key: e.lugar } };
    if (e.fin === 'evento' && !storyEvDone(game.story, e)) { const it = eventIntent(e.evento); if (it) return it; }
    if (e.estado === 'abierta' && here) return { label: 'Esperar aquí (la historia de hoy)', intent: { type: 'idle' } };
  }
  return null;
}
function eventIntent(ev){
  const led = ledCow(), cow = Object.values(ANIM).find(a => a.kind === 'cow' && a.state === 'loose' && a.where === 'out' && AREAS[a.area]?.kind === 'oats');
  if (ev === 'vaca_agarrada' && !led && cow) return game.scene === 'out' ? { label: 'Agarrar a la vaca', intent: { type: 'target', id: 'a:' + cow.id } } : { label: 'Salir', intent: { type: 'house', id: 'out' } };
  if (ev === 'vaca_vendida' && led) { const t = targets().find(t => t.id.startsWith('sell:')); if (t) return { label: t.label, intent: { type: 'target', id: t.id } }; }
  if (ev.startsWith('cocinado')) return { label: 'Cocinar algo en la cocina', intent: { type: 'cook' } };
  if (ev.startsWith('regalo:')) { const k = ev.split(':')[1]; if (PEOPLE[k] && Object.keys(GIFTS).some(g => game.inv[g] > 0)) return { label: 'Ir a darle algo a ' + NAMES[k], intent: { type: 'talkmenu', k } }; }
  return null;
}
function autoCook(){
  const k = ITEMS.find(k => ITEM_DEFS[k].recipe && Object.keys(ITEM_DEFS[k].recipe).length && !hasIt(k) && Object.entries(ITEM_DEFS[k].recipe).every(([i, n]) => game.inv[i] >= n)) || (!hasIt('te') && 'te');
  if (k) return startCook(k);
  anaSays(dicho('cocinar_nada_nuevo'));
}
// carrying out the intent, one step each time she is free
function autoStep(){
  const it = auto.intent, sc = game.scene;
  const calm = (a, b) => it.manual ? 1 : a + Math.random() * b;   // (what she does on her own is done unhurried; what she was told, as it comes)
  const go = (id, o = {}) => { ana.goto = { id, scene: sc, auto: true, stroll: !it.manual, ...o }; };
  const to = (x, y) => { ana.goto = { x, y, scene: sc, auto: true, stroll: !it.manual }; };
  const done = () => { auto.intent = null; auto.thinkAt = TT + (it.manual ? 2 : 14 + Math.random() * 26); };
  const stay = (a, b) => { if (!it.until) it.until = TT + calm(a, b); return TT < it.until; };   // (stays a while, taking it in)
  switch (it.type) {
    case 'house': {
      const next = hopTo(it.id); if (next) return go(next);
      if (it.id === 'out') return done();
      if (!stay(24, 20)) return done();
      if (!it.nextSpot || TT > it.nextSpot) { it.nextSpot = TT + 6 + Math.random() * 8; const [x, y] = randSpot(110); return to(x, y); }
      return;
    }
    case 'target': if (!it.started) { if (!targets().some(t => t.id === it.id)) return done(); it.started = true; return go(it.id); } return stay(10, 14) ? undefined : done();
    case 'cook': { const next = hopTo('gg'); if (next) return go(next); if (!it.started) { it.started = true; return go('stove', { use: autoCook }); } return stay(12, 10) ? undefined : done(); }
    case 'sleep': { const next = hopTo('ga'); if (next) return go(next); if (it.started) return done(); it.started = true; return go('bed'); }
    case 'place': { const next = hopTo('out'); if (next) return go(next); if (!it.started) { it.started = true; return to(PLACES[it.key][1], PLACES[it.key][2]); } return stay(22, 16) ? undefined : done(); }
    case 'wander': if (it.started) return stay(8, 8) ? undefined : done(); it.started = true; { const [x, y] = randSpot(sc === 'out' ? 260 : 120); return to(x, y); }
    case 'lie': {
      if (sc !== 'out') return go(hopTo('out'));
      if (!it.started) { it.started = true; let spot = null; for (let k = 0; k < 30 && !spot; k++) { const [x, y] = randSpot(240); if (!nearPath(x, y, 30) && !inBrook(x, y, 30) && !inLake(x, y, 30) && !underTree(x, y)) spot = [x, y]; } const [x, y] = spot || randSpot(100); return to(x, y); }
      if (!ana.lie) { if (it.lay) return done(); it.lay = true; ana.lie = true; ana.sit = false; ana.dir = 2; it.until = TT + calm(40, 40); return comentar('pasto'); }
      if (TT > it.until) { ana.lie = false; return done(); }
      return;
    }
    case 'idle': if (!stay(25, 25)) done(); return;
    case 'talkmenu': { const p = PEOPLE[it.k]; if (sceneOf(it.k) !== sc) return go(hopTo(p.where)); if (!it.started) { it.started = true; return go('p:' + it.k); } return done(); }
    case 'meal': {
      const next = hopTo('gg'); if (next) return go(next);
      if (!it.started) { it.started = true; return go('mesa'); }
      if (!ana.sit || !MEAL(hourNow())) { if (ana.meal) ana.sit = false; return done(); }
      return;
    }
    case 'talkto': {
      const k = it.k, p = PEOPLE[k];
      if (sceneOf(k) !== sc) return go(hopTo(p.where));
      if (!it.started) { it.started = true; amb.mute[k] = 0; amb.cool = 0; return go('p:' + k, { use: () => {} }); }   // (walking up to them starts a talk by itself)
      if (!it.until) it.until = TT + 10;
      if ((amb.recent && amb.recent.parts.includes(k) && TT - amb.recent.t < 15) || TT > it.until) return done();
      return;
    }
  }
  done();
}
// someone in the middle of a conversation or a scene where they speak (or are held to listen): they do not walk off
const enConversacion = k => (k !== 'ana' && CHAT_HOLD[k] > TT) || TALKS.some(t => t.i < t.lines.length && t.lines.some(l => l.q === k || (l.q === '?' && k === 'ana')))   /* (a choice ahead is Ana's) */ || (typeof CHATS !== 'undefined' && CHATS.some(c => c.parts.includes(k)));
function autoTick(){
  if (!autoAllowed() || game.playAct || AGENTS.ana?.followOf || wmDriven('ana') || (CAP1.on && !CAP1.done) || game.scene === 'camino' || ana.hidden || cart.riding) return;   // (in the book's chapter she waits for Matthew; in the cart she rides)   // (a goal of the planner, or following someone who asked: no wandering off)
  const manual = auto.intent?.manual;
  // (Ana goes on her own only with the button 🤖 on: not because the player stopped for a while. The traces, with no
  //  player, keep the old way: on her own after a while without input)
  if (!manual && !(navigator.webdriver ? TT - lastInput >= AUTO_IDLE : ANA_AUTO)) { auto.on = false; return; }
  if (!auto.on) auto.on = true;
  if (amb.cur) return;
  if (enConversacion('ana')) { if (ana.goto?.auto) ana.goto = null; return; }   // (talking with someone: she stays, and goes on with what she meant to do afterwards)
  if (auto.intent) { if (!ana.goto) autoStep(); return; }
  if (TT >= auto.thinkAt) autoDecide();
}
