/* ---------- the routines, made of goals: what each one does each day (from the book), handed to the planner at its
   hour, at most once a day. Low priority (1): what someone asks (2) or what has a deadline (3) goes first; with the
   agenda full, it waits. Between goals the old routine of places (where one is at each hour) goes on. Ana's part, and
   what the others ask of her by routine, only with 🤖 on (so as not to take her from the player). ---------- */
let AGENDA_ON = true, agendaT = 0;
const isSunday = () => today() % 7 === 6;
const hayClases = () => !isSunday() && S !== 1;   // (no school on Sundays, nor in summer)
const cowIn = (c, pen) => ANIM[c] && ANIM[c].state !== 'led' && areaAt(ANIM[c].x, ANIM[c].y) === pen;
const AGENDA = [
  { who: 'matthew', from: 6, to: 9, label: 'dar de comer a los animales', goal: () => G.alimentados(['corral', 'gallinero']) },
  { who: 'matthew', from: 6, to: 9.5, label: 'ordeñar y llevarle la leche a Marilla', when: () => !realR.fact('ordeñada:dolly') && cowIn('dolly', 'corral'), goal: () => G.tener('marilla', 'leche', (wmInv('marilla').leche || 0) + 2) },
  { who: 'matthew', from: 9.5, to: 12, season: [1], label: 'hacer heno', when: () => !realR.fact('heno_hecho'), goal: () => G.tener('matthew', 'heno', (wmInv('matthew').heno || 0) + 3) },
  { who: 'matthew', from: 9.5, to: 12, season: [2, 3], label: 'partir leña para Marilla', goal: () => G.tener('marilla', 'lena', (wmInv('marilla').lena || 0) + 3) },
  { who: 'marilla', from: 8.5, to: 11.5, label: 'batir mantequilla', when: () => (wmInv('marilla').leche || 0) >= 2, goal: () => G.tener('marilla', 'mantequilla', (wmInv('marilla').mantequilla || 0) + 1) },
  { who: 'marilla', from: 13, to: 15, ana: true, chores: true, label: 'encargarle los quehaceres a Ana', goal: () => G.quehaceres('ana', ['platos', 'barrer']), favors: [{ f: 'quehaceres', to: 'ana', q: ['platos', 'barrer'] }] },
  { who: 'marilla', from: 17, to: 19, ana: true, label: 'regañar a Ana por los quehaceres', when: () => realR.fact('falta:ana'), goal: () => G.regañado('ana') },
  { who: 'lynde', from: 14, to: 16.5, label: 'visitar a Marilla', when: () => today() % 2 === 0, goal: () => G.visitar('lynde', 'marilla') },
  { who: 'lynde', from: 14, to: 16.5, label: 'visitar a la Sra. Barry', when: () => today() % 2 === 1, goal: () => G.visitar('lynde', 'barry') },
  { who: 'diana', from: 15, to: 17, ana: true, season: [0, 1, 2], label: 'dar un paseo con Ana', when: () => !isSunday() && dianaAmiga(), goal: () => G.paseo('diana', 'ana', 'lago', 30), favors: [{ f: 'pasear', to: 'ana' }] },
  { who: 'ana', from: 7.5, to: 8.5, ana: true, season: [0, 2, 3], label: 'ir a clases', when: () => !isSunday(), goal: () => G.estar_en('ana', 'escuela', 9, CLASES_FIN) },
  { who: 'ana', from: 12.5, to: 14.5, ana: true, label: 'la tarde libre', goal: () => anaTarde() },
  { who: 'ana', from: 20, to: 22, ana: true, label: 'decir sus oraciones', goal: () => G.rezo('ana') },
  // the Sundays: to church (and to Sunday school)
  { who: 'matthew', from: 8.8, to: 10, sunday: true, label: 'ir a la iglesia', goal: () => G.estar_en('matthew', 'iglesia', 11, 12) },
  { who: 'lynde', from: 8.8, to: 10, sunday: true, label: 'ir a la iglesia', goal: () => G.estar_en('lynde', 'iglesia', 11, 12) },
  { who: 'diana', from: 8.8, to: 10, sunday: true, label: 'ir a la iglesia', goal: () => G.estar_en('diana', 'iglesia', 11, 12) },
  { who: 'ana', from: 8.8, to: 10, sunday: true, ana: true, label: 'ir a la iglesia', goal: () => G.estar_en('ana', 'iglesia', 11, 12) },
];
// Ana's free afternoon: what she likes, by the season (one thing a day, in turns)
function anaTarde(){
  const opts = S === 3 ? [G.patinar('ana'), G.trineo('ana')] : S === 1 ? [G.remo('ana'), G.leido('ana')] : S === 0 ? [G.adornado('ana'), G.huerta('ana'), G.nombres('ana', Object.keys(NOMBRES_ANA).filter(p => game.wm.perm['nombre:' + p]).length + 1)] : [G.visitar('ana', 'lynde'), G.leido('ana')];
  const ok = opts.filter(g => g.kind !== 'leido' || game.inv.libro > 0), s0 = wmNow();
  for (let j = 0; j < ok.length; j++) { const g = ok[(today() + j) % ok.length]; if (!g.test(s0) && wmPlan('ana', g, [], s0).ok) return g; }   // (something she can do today)
  return null;
}
const agendaToday = () => AGENDA.map((e, i) => ({ e, i })).filter(({ e }) => (e.sunday ? isSunday() : true) && (!e.season || e.season.includes(S)));
function agendaTick(){
  if (!AGENDA_ON || TT < agendaT) return; agendaT = TT + 2;
  const h = hourNow();
  // the chores not done by five: a fault (Marilla will see to it)
  const ci = AGENDA.findIndex(e => e.chores);
  if (h >= 17 && realR.fact('agenda:' + ci) && !(realR.fact('quehacer:platos') && realR.fact('quehacer:barrer')) && !realR.fact('falta:ana') && !realR.fact('regaño:ana')) realR.setFact('falta:ana');
  for (const { e, i } of agendaToday()) {
    if (realR.fact('agenda:' + i) || h < e.from || h >= e.to) continue;
    if ((e.ana || e.who === 'ana') && !ANA_AUTO) continue;
    if (!wmBody(e.who) || !personKey(e.who)) continue;
    const ag = AGENTS[e.who]; if (ag && (activeGoals(ag).length >= MAX_GOALS - 1 || ag.hold)) continue;
    if (e.when && !e.when()) continue;
    const goal = e.goal(); realR.setFact('agenda:' + i); if (!goal || goal.test(wmNow())) continue;
    agentStart(e.who, goal, { label: '🕓 ' + e.label + (e.label === 'la tarde libre' ? ': ' + goal.text.replace(/^Ana /, '') : ''), prio: e.prio || 1, favors: e.favors || [] });
  }
}
// a whole day, from dawn: the routines of goals on, Ana on her own (for the traces of a day)
function startDay(){
  for (const c of CHATS.slice()) chatEnd(c);
  for (const k of Object.keys(AGENTS)) { wmRelease(k); delete AGENTS[k]; }
  close(); dayAt(6); AGENDA_ON = true; if ($('wmagenda')) $('wmagenda').checked = true; setAuto(true);
}
// Ana asks someone a favor (the player, from a conversation): if they accept and see how, the goal is theirs
function favorMenu(who){
  const opts = [], cuth = CUTHBERT.includes(who);
  const wants = [['manzanas', 3], ['bayas', 3], ['huevos', 6], ...(cuth ? [['azucar', 1]] : []), ...(who === 'marilla' ? [['tarta', 1], ['compota', 1], ['te', 1]] : [])];
  for (const [x, n] of wants) if (inSeason(x) || x === 'huevos' || x === 'azucar') opts.push([`Que me traiga ${itemText(x, n)}`, () => playerAsk(who, { f: 'traer', to: who, item: x, n })]);
  for (const c of Object.values(ANIM)) if (c.kind === 'cow' && cowKey(c).startsWith('c:')) opts.push([`Que lleve a ${ANIMALS[c.id].name} a su corral`, () => playerAsk(who, { f: 'encerrar_vaca', to: who, cow: c.id, pen: ANIMALS[c.id].home })]);
  opts.push(['← Volver', () => talk(who, true)]);
  say(who, '¿Qué necesitas, Ana?', opts);
}
function playerAsk(who, f){
  close();
  const F = FAVORS[f.f], s0 = wmNow();
  if (!socialRule(realR, 'pedir', 'ana', who)) return say(who, 'Ahora no, Ana.', [['Bueno', close]]), null;
  if (activeGoals(AGENTS[who]).length >= MAX_GOALS) return say(who, 'Ahora no puedo, tengo demasiado que hacer. Más tarde, ¿sí?', [['Bueno', close]]), null;
  const goal = F.goal('ana', f, s0), r = wmPlan(who, goal, [], s0, ['ana']);
  if (!r.plan) return say(who, pick(['Bueno, pues... no sé cómo podría, Ana.', 'Me gustaría, pero no veo cómo.']), [['Bueno', close]]), null;
  logEv(`Ana le pidió a ${wmName(who)}: ${goal.text}.`, [who]); relatoDicho('ana', F.say ? F.say(f) : '¿Me harías un favor?');
  say(who, pick(['¡Claro que sí! Ya vuelvo.', 'Bueno, pues... ya lo creo, Ana. Deja eso en mis manos.', 'Por supuesto, querida.']), [['¡Gracias!', close]]);
  return agentStart(who, goal, { label: goal.text + ' (se lo pidió Ana)', parent: 'ana', chain: ['ana'] });
}
function dayAt(h){ dayT = Math.floor(dayT) + (h - 6) / 24; }
// Ana goes up to someone and then asks them (a favour in the test goals: as the player would, talking to them)
let WM_APPROACH = null;
function anaAskWalk(who, f, label){
  const h = { who: 'ana', label, log: [], _st: 'run', why: '', get st() { return this.h ? this.h.st : this._st; }, get n() { return this.h?.n; } };
  WM_APPROACH = { who, h, done: () => { const g = playerAsk(who, f); if (g) { h.h = g; if (h.test != null) g.test = h.test; } else { h._st = 'fail'; h.why = 'no aceptó'; } } };
  return h;
}
function wmApproachTick(dt){
  const A = WM_APPROACH; if (!A) return;
  const tb = wmBody(A.who), sc = wmScene(A.who), inRoom = sc && sc !== 'out' && game.scene === sc && tb && dist(ana.x, ana.y, tb.x, tb.y) < 130;
  if (inRoom) { wmStop('ana'); WM_APPROACH = null; A.done(); return; }   // (in the room with them: near enough to talk; the furniture may be in the way)
  const r = wmMove('ana', 'p:' + A.who, dt);
  if (r === 'fail') { if (A.h) { A.h._st = 'fail'; A.h.why = wmName(A.who) + ' no está'; } WM_APPROACH = null; return; }
  if (r !== 'ok') return;
  WM_APPROACH = null; A.done();
}
function wmRunTest(i){
  const T = WM_TESTS[i];
  game.libre = !T.cadena;   // (a test goal is of one thing: the chains of the book open, unless it is the test of a chain)
  for (const c of CHATS.slice()) chatEnd(c);
  for (const k of Object.keys(AGENTS)) { wmRelease(k); delete AGENTS[k]; }
  close(); if (ana.goto) ana.goto = null; diana.follow = false; game.wm.sick = []; for (const f of Object.keys(game.wm.facts)) if (/^(pedido|intercede|disc|gusto|dio):/.test(f)) delete game.wm.facts[f]; game.seasonShift = 0; cowHome('dolly'); cowHome('jersey'); game.inv.cuerda = 0; for (const k of ['matthew', 'harrison', 'shearer']) delete game.wm.inv[k];
  if (PEOPLE.shearer.where !== 'away') { PEOPLE.shearer.where = 'away'; }
  WM_APPROACH = null; game.wm.sinJarabe = false; AGENDA_ON = false; if ($('wmagenda')) $('wmagenda').checked = false;
  if (isSunday()) dayT += 1;   // (the test goals: on a weekday, with school)
  delete game.wm.ritmo;   // (and with nothing big of the book having happened yet today)
  const keep = { scene: game.scene, x: ana.x, y: ana.y, dir: ana.dir, tx: toby.x, ty: toby.y, cx: cam.x, cy: cam.y };
  T.setup(); S = ((seasonCount() % 4) + 4) % 4;
  game.scene = keep.scene; ana.x = keep.x; ana.y = keep.y; ana.dir = keep.dir; ana.goto = null; toby.x = keep.tx; toby.y = keep.ty; cam.x = keep.cx; cam.y = keep.cy;   // (Ana where she was: no jumping to the test's start)
  let ag;
  if (T.goals) {   // (several goals at once, maybe one asked later)
    const hs = T.goals().map(([goal, label]) => agentStart(T.who, goal, { label, favors: T.favors || [] })).filter(Boolean);
    if (T.ask) hs.push(anaAskWalk(T.ask.to, T.ask, T.text));
    ag = { who: T.who, get st() { return hs.some(h => h.st === 'run') ? 'run' : hs.every(h => h.st === 'done') ? 'done' : 'fail'; }, get why() { return hs.filter(h => h.why).map(h => h.label + ': ' + h.why).join('; '); }, log: agentOf(T.who).log, get n() { return hs[0]?.n; } };
  } else ag = T.ask ? anaAskWalk(T.ask.to, T.ask, T.text) : agentStart(T.who, T.goal(), { favors: T.favors || [], label: T.text });
  for (const [k, goal, label] of T.tambien?.() || []) agentStart(k, goal, { label });   // (what the others do meanwhile: to be where the chain needs them)
  if (T.hasta) { const g0 = ag; ag = { who: T.who, label: T.text, get st() { return dlgHechos()[T.hasta] ? 'done' : g0.st === 'fail' ? 'fail' : 'run'; }, get why() { return g0.why; }, log: agentOf(T.who).log, get n() { return g0.n; } }; }   // (a chain test: on until the last scene of it has happened)
  ag.test = i; if (T.ask && !T.goals) ag.label = T.text;
  if (T.who !== 'ana') cam.x = wmBody(T.who).x, cam.y = wmBody(T.who).y;
  wmPanelDraw(); return ag;
}
// --- the panel: the test goals, and what each agent is doing
function wmPanel(show = $('wmp').hidden){ $('wmp').hidden = !show; if (show) wmPanelDraw(); }
let wmDrawT = 0;
function wmPanelDraw(){
  if ($('wmp').hidden) return;
  $('wmlist').innerHTML = WM_TESTS.map((T, i) => `<button data-i="${i}">${i + 1}. ${wmName(T.who)}: ${T.text}</button>`).join('');
  wmRunDraw();
}
// the scenes, for whoever is writing them: what is being said, what could be said now, and why the rest is not
let DLG_DBG = false;
function dlgPanel(){
  const head = `<div class="ag"><button id="dlgdbg" class="eye${DLG_DBG ? ' on' : ''}">🎭</button> <b>Escenas</b> <small>(${Object.keys(dlgDichas()).length} dichas de ${DIALOGOS.length})</small>`;
  if (!DLG_DBG) return head + '</div>';
  const x = dlgCtx(), P = dlgProg(), e = s => String(s).replace(/</g, '&lt;'), nom = d => e(d.nombre || d.id);
  const now = TALKS.filter(t => t.esc).map(t => { const d = DIALOGOS.find(d => d.id === t.esc); return `<li class="cur">▶ <small>[${t.ch}]</small> ${nom(d || { id: t.esc })} — línea ${Math.max(0, t.i - (t.puente || 0)) + 1 + (t.desde || 0)}/${(t.desde || 0) + t.lines.length - (t.puente || 0)}${t.desde ? ' <i>(retomada)</i>' : ''}${t.paso ? ' · al paso' : ''}</li>`; });
  const open = DIALOGOS.filter(d => d.disparo !== 'encuentro' && !d.dicha()), ok = open.filter(d => d.listo(x)).sort((a, b) => b.peso - a.peso);
  const half = open.filter(d => P[d.id] && !ok.includes(d)).map(d => `<li>⏸ ${nom(d)} <small>(quedó en la línea ${P[d.id] + 1}; ${e(d.porque(x))})</small></li>`);
  const rest = open.filter(d => !ok.includes(d) && !P[d.id] && d.prioridad > 0).sort((a, b) => b.peso - a.peso).slice(0, 10).map(d => `<li class="fail" style="text-decoration:none">· <small>[${d.prioridad}]</small> ${nom(d)} <small>— ${e(d.porque(x))}</small></li>`);
  return head + '<ul class="gl">' + (now.join('') || '<li><i>nadie habla ahora</i></li>') + ok.map((d, i) => `<li>${i ? '○' : '●'} <small>[${d.canal} ${+d.peso.toFixed(3)}]</small> ${nom(d)}${d.tipo === 'comentario' ? ' <small>(comentario)</small>' : ''}${P[d.id] ? ' <i>(a medias)</i>' : ''}</li>`).join('') + half.join('') + rest.join('') + '</ul></div>';
}
function wmRunDraw(){
  const gs = { run: '▶', done: '✔', fail: '✘' }, st = { run: 'en marcha', wait: 'esperando', idle: '', pausa: '⏸ en pausa (la jugadora la controla; vuelve a su plan tras ' + RESUME_IDLE + ' s sin órdenes)' };
  const h = hourNow(), agd = AGENDA_ON ? '<div class="ag"><b>🕓 La agenda de hoy</b>' + (isSunday() ? ' <small>(domingo)</small>' : '') + (ANA_AUTO ? '' : ' <small>(lo de Ana y lo que le piden, solo con 🤖)</small>') + '<ul class="gl">' + agendaToday().map(({ e, i }) => `<li class="${realR.fact('agenda:' + i) ? 'done' : h >= e.to ? 'fail' : ''}">${fmtHour(e.from)}–${fmtHour(e.to)} <b>${wmName(e.who)}</b>: ${e.label}${realR.fact('agenda:' + i) ? ' ✔' : h >= e.to ? ' —' : h >= e.from ? ' ⏳' : ''}</li>`).join('') + '</ul></div>' : '';
  $('wmrun').innerHTML = dlgPanel() + (agd + Object.values(AGENTS).map(ag => `<div class="ag">${ag.who !== 'ana' ? `<button class="eye${OBS === ag.who ? ' on' : ''}" data-obs="${ag.who}" title="Observar">👁</button> ` : ''}<b>${wmName(ag.who)}</b> ${ag.hold ? '· esperando aquí' : ag.followOf ? '· acompaña a ' + wmName(ag.followOf) : (ag.distract ? '· 💭 ' + ag.distract.text : st[ag.st] || '')}`
    + (ag.goals?.length ? '<ul class="gl">' + [...activeGoals(ag), ...ag.goals.filter(g => g.st !== 'run').slice(-4)].map(g => `<li class="${g.st}">${gs[g.st]} <small>[${g.prio}]</small> ${g.label}${g.why ? ' <i>(' + g.why + ')</i>' : ''}`
      + (g.st === 'run' ? '<ol class="tk">' + ag.tasks.filter(t => t.g === g && t.st !== 'skip').map(t => { const n = ag.tasks.filter(u => u.g === g && u.st !== 'skip'), dep = t.deps.map(id => n.findIndex(u => u.id === id) + 1).filter(Boolean); return `<li class="${t === ag.task ? 'cur' : t.st === 'done' ? 'past' : ''}">${t === ag.task ? '▶ ' : t.st === 'done' ? '✔ ' : taskReady(ag, t) ? '○ ' : '· '}${stepText(t.a)}${dep.length && t.st === 'todo' ? ' <small>(tras ' + dep.join(', ') + ')</small>' : ''}</li>`; }).join('') + '</ol>' : '') + '</li>').join('') + '</ul>' : '')
    + (ag.log?.length ? '<pre>' + ag.log.slice(-6).join('\n') + '</pre>' : '') + '</div>').join('') || '<i>Nadie tiene una meta todavía.</i>');
}
