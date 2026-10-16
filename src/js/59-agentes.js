/* ---------- the agents: someone with a goal and a plan, carrying it out step by step in the world ---------- */
const AGENTS = {};
const MAX_GOALS = 3;   // (an agenda of up to three goals; their tasks, with the order each one needs, are done in the best order)
const activeGoals = ag => (ag?.goals || []).filter(g => g.st === 'run');
const agentChain = ag => [...new Set(activeGoals(ag).flatMap(g => g.chain))];
let WM_OBEY = true;   // (when someone asks Ana for something, she does it by herself: for the tests)
function agentOf(who){ return AGENTS[who] || (AGENTS[who] = { who, goals: [], tasks: [], log: [], st: 'idle' }); }
// how urgent a goal is: with a time limit 3, asked by someone 2, one's own 1
const goalPrio = (goal, o) => o.prio ?? (goal.deadline ? 3 : o.parent ? 2 : 1);
let goalSeq = 0, taskSeq = 0;
function agentStart(who, goal, o = {}){
  const ag = agentOf(who); delete ag.hold;
  if (!goal || !Array.isArray(goal.people)) return null;   // (a goal the planner cannot pursue: a fact of the story, «que pase x»)
  if (activeGoals(ag).length >= MAX_GOALS) return null;
  const g = { who, goal, favors: o.favors || [], chain: o.chain || [], st: 'run', label: o.label || goal.text, parent: o.parent, since: TT, log: ag.log, prio: goalPrio(goal, o), seq: ++goalSeq, tries: 0, pending: [] };
  ag.goals.push(g); if (ag.goals.length > 12) ag.goals.splice(0, ag.goals.length - 12);
  if (who === 'ana') { auto.on = false; auto.intent = null; ag.followOf = null; if (ana.goto && !ana.goto.wm) ana.goto = null; }
  agentLog(ag, '＋ ' + g.label + ' (prioridad ' + g.prio + ')');
  agentCheck(ag); if (g.st === 'run') { if (goal.desde > hourNow()) agentLog(ag, '🕓 a las ' + fmtHour(goal.desde) + ': ' + g.label); else { g.started = true; goalPlan(ag, g); } }
  if (ag.task && g.prio === 3 && ag.task.g.prio < 3) { agentLog(ag, '⇢ primero lo urgente'); ag.task = null; wmStop(who); }
  return g;
}
function agentLog(ag, t){ ag.log.push(fmtHour(hourNow()) + ' ' + t); if (ag.log.length > 18) ag.log.shift(); }
function promised(ag, g, s){ for (const p of g.pending || []) if (p.h.st === 'run') FAVORS[p.f.f].eff(s, ag.who, p.to, p.f); return s; }

/* --- from a plan (a line of steps) to tasks with the order they really need: a task depends on another if, without
   that one, it could not be done. The walking is not a task: one walks to wherever the chosen task is done
   (except the last walk of a plan, or one with someone following: there, getting there is the point). */
const actSig = a => [a.v, a.x, a.k, a.cow, a.g, a.favor ? a.favor.f + ':' + a.favor.to + ':' + (a.favor.item || '') : '', a.v === 'soltar' || a.v === 'ir' ? a.p : ''].join('|');
function planToTasks(me, plan, s0, C){
  const steps = []; let s = clone(s0);
  plan.forEach((a, k) => {
    const keep = a.v !== 'ir' || k === plan.length - 1 || Object.values(s.follow).includes(me);
    if (keep) steps.push({ a, loc: a.v === 'ir' ? a.p : s.pos[me], deps: [] });
    a.eff(s); s.t += a.cost;
  });
  const avail = (st, step) => { if (step.a.v === 'ir') return { eff: t => { t.pos[me] = step.a.p; for (const [f, w] of Object.entries(t.follow)) if (w === me) t.pos[f] = step.a.p; } }; st.pos[me] = step.loc; return verbs(st, me, C).find(b => actSig(b) === actSig(step.a)); };
  // what a step changes (to tell whether, without another one, it would do the same)
  const delta = (x, y) => { const d = []; for (const w of Object.keys(y.invs)) for (const k of new Set([...Object.keys(x.invs[w] || {}), ...Object.keys(y.invs[w])])) { const v = (y.invs[w][k] || 0) - (x.invs[w]?.[k] || 0); if (Math.abs(v) > 1e-9) d.push(w + '.' + k + ':' + v); }
    for (const f of ['cows', 'follow', 'ofensa', 'facts']) for (const k of new Set([...Object.keys(x[f]), ...Object.keys(y[f])])) if (x[f][k] !== y[f][k]) d.push(f + '.' + k + ':' + y[f][k]);
    for (const k of Object.keys(y.rel)) if (x.rel[k] !== y.rel[k]) d.push('rel.' + k + ':' + (y.rel[k] - (x.rel[k] ?? 2)));
    for (const k of Object.keys(y.know)) if ((x.know[k] || []).length !== y.know[k].length) d.push('know.' + k);
    return d.sort().join(';'); };
  const run = (skip, upto) => { const t = clone(s0); for (let m = 0; m < upto; m++) { if (m === skip) continue; const b = avail(t, steps[m]); if (b) b.eff(t); } const before = clone(t), b = avail(t, steps[upto]); if (!b) return null; b.eff(t); return delta(before, t); };
  const base = steps.map((_, j) => run(-1, j));
  for (let j = 1; j < steps.length; j++) for (let i = 0; i < j; i++) {
    if (steps[j].a.v === 'ir') { steps[j].deps.push(i); continue; }   // (a walk kept as a task, to take someone along or to be there: after all that came before)
    const d = run(i, j); if (d === null || d !== base[j]) steps[j].deps.push(i);   // (without step i, step j could not be done, or would not do the same)
  }
  return steps;
}
// a plan for one goal, made into tasks (its old tasks still to do are replaced)
function goalPlan(ag, g){
  // what was asked and done, but did not last (the cow wandered off again): it may be asked once more
  if (!g.goal.test(wmNow())) for (const p of g.pending || []) if (p.h.st === 'done' && !p.reask) { p.reask = true; delete game.wm.facts['pedido:' + p.f.f + ':' + p.to + ':' + today()]; }
  const s = promised(ag, g, wmNow());
  ag.tasks = ag.tasks.filter(t => t.g !== g || t.st === 'done');
  if (g.goal.test(s) && (!pendingOn(g) || stayNow(g))) { goalEnd(ag, g, 'done'); return false; }
  if (g.goal.test(s)) { g.waitUntil = TT + 3; return true; }   // (only what was promised is missing: wait for it)
  const r = wmPlan(ag.who, g.goal, g.favors, s, g.chain);
  if (!r.plan) { console.debug('[avonlea plan] sin plan', ag.who, g.label, JSON.stringify({ pos: s.pos, cows: s.cows, follow: s.follow, sick: game.wm.sick, rel: Object.fromEntries(Object.entries(s.rel).filter(([k]) => k.startsWith('ana>'))), facts: s.facts })); agentLog(ag, 'no encuentra cómo: ' + g.label + ' (' + r.n + ' estados)'); goalEnd(ag, g, 'fail', g.partial ? 'avanzó, pero no lo suficiente por hoy' : 'no hay un plan posible'); return false; }
  g.partial = r.partial || g.partial; g.n = r.n; g.waitUntil = 0;
  const steps = planToTasks(ag.who, r.plan, s, r.C), ids = steps.map(() => ++taskSeq);
  steps.forEach((st, k) => ag.tasks.push({ id: ids[k], g, a: st.a, loc: st.loc, deps: st.deps.map(i => ids[i]), st: 'todo' }));
  agentLog(ag, (r.partial ? 'plan parcial' : 'plan') + ' (' + g.label + '): ' + steps.map((st, k) => (k + 1) + '. ' + stepText(st.a) + (st.deps.length ? ' [tras ' + st.deps.map(i => i + 1).join(', ') + ']' : '')).join(' · '));
  return true;
}
function agentCheck(ag, s = wmNow()){ for (const g of activeGoals(ag)) if (!g.staying && g.goal.test(s) && (!pendingOn(g) || stayNow(g))) goalEnd(ag, g, 'done'); }
// a goal to stay at (the tea): it begins when it is really so, even while the one who came is still on her own errand (to stay too)
const stayNow = g => !!g.goal.quedarMin && g.goal.test(wmNow());
function goalEnd(ag, g, st, why){
  if (st === 'done' && (g.goal.quedar || g.goal.quedarMin) && !g.stayed && !(g.stayUntil && hourNow() >= g.stayUntil)) {   // (arrived: now to stay, until the hour or a while)
    if (!g.staying) { g.staying = true; g.stayUntil = g.goal.quedar ?? hourNow() + g.goal.quedarMin / 60; agentLog(ag, '⏸ llegó: se queda hasta las ' + fmtHour(g.stayUntil)); logEv(`${wmName(ag.who)} llegó ${('a ' + (WP_NAME[g.goal.places[0]] || 'su destino')).replace(/^a el /, 'al ')} y se queda hasta las ${fmtHour(g.stayUntil)}.`, []); }
    return;
  }
  g.st = st; g.why = why; if (ag.task?.g === g) ag.task = null;
  for (const t of ag.tasks) if (t.g === g && t.st === 'todo') t.st = st === 'done' ? 'skip' : 'fail';
  const msg = st === 'done' ? `${wmName(ag.who)} logró: ${g.label}.` : `${wmName(ag.who)} no pudo: ${g.label}${why ? ' (' + why + ')' : ''}.`;
  agentLog(ag, (st === 'done' ? '✔ ' : '✘ ') + g.label + (why ? ' (' + why + ')' : '')); logEv(msg, []);
  if (ag.who === 'ana' && st === 'done') float('✔ ' + g.label, ana.x, ana.y - 64);
}
function stayTick(ag, g, dt){
  const otro = g.goal.te != null && (g.goal.con || g.goal.people?.find(p => p !== ag.who));   // (tea: with whom)
  if (otro && wmScene(otro) === wmScene(ag.who)) g.juntos = true;
  if (hourNow() >= g.stayUntil || activeGoals(ag).some(o => o !== g && (o.goal.urgente || o.prio === 3 && g.prio < 3)) || (g.juntos && wmScene(otro) !== wmScene(ag.who))) { if (ag.acting?.v === 'tomar_te') accEnd(ag); g.staying = false; g.stayed = true; agentLog(ag, '🔔 terminó: ' + g.label); goalEnd(ag, g, 'done'); return; }   // (the stay is over: its hour, or something urgent, as running with the syrup; or the one she had tea with went away)
  ag.st = 'run'; ag.task = null;
  if (g.goal.te != null && teSentar(ag, g, dt)) { if (ag.acting?.v === 'tomar_te') stayChat(g); return; }
  const key = g.goal.room ? 'h:' + g.goal.room : g.goal.places[0], r = wmMove(ag.who, key, dt);
  if (r === 'ok') { const b = wmBody(ag.who); if (ag.who !== 'ana') b.moving = false; stayChat(g); }
}
// meanwhile they talk
function stayChat(g){ const C = g.goal.chat; if (C && (g.chatI ?? -1) < C.length - 1 && TT > (g.chatT || 0)) { g.chatT = TT + M(3); const [k, line] = C[g.chatI = (g.chatI ?? -1) + 1];   // (each line once, every few minutes: then they just sit together)
 if (watched(wmScene(k) || 'out')) sayB(qOf(k), line); } }
// tea (te_con, and the visit that comes to it): once in the room, each to her chair at the tea table (she who receives, te 0;
// the visit, te 1), to sit there with her cup while the stay lasts (false: not there yet, or no chairs in this room)
const teSillas = sc => sc === 'cp' ? CP_SILLAS : sc === 'gg' ? [SEATS.ana, SEATS.lynde] : sc === 'os' ? [[TEA.x + 40, TEA.y + 6, 3], [TEA.x - 40, TEA.y + 6, 1]] : null;
function teSentar(ag, g, dt){
  const who = ag.who, b = wmBody(who), sc = wmScene(who), key = g.goal.places[0], room = key === 'cocina' ? 'gg' : key.startsWith('h:') ? key.slice(2) : null, s = room === sc && teSillas(sc)?.[g.goal.te];
  if (!b || !s) return false;
  if (!g.teSentada) { if (dist(b.x, b.y, s[0], s[1]) > 26 && !wmWalk(who, s[0], s[1], sc, dt)) return true; wmStop(who); g.teSentada = true; }
  b.x = s[0]; b.y = s[1]; b.dir = s[2]; b.sit = true; b.moving = false;
  // the visit sits and waits for the one who receives (who may still be making the tea): the tea, and the half hour, begin when both are at the table
  if (g.goal.con && AGENTS[g.goal.con]?.acting?.v !== 'tomar_te') { if (hourNow() < g.goal.teHasta) g.stayUntil = Math.max(g.stayUntil, hourNow() + .5); return true; }
  if (ag.acting?.v !== 'tomar_te') ag.acting = { v: 'tomar_te', k: g.goal.te === 0 ? g.goal.people[1] : g.goal.con, t0: TT, dura: (g.stayUntil - hourNow()) * 60 * MIN_S, base: [s[0], s[1]], sit: false, obj: 'te' };
  return true;
}
function agentIdle(ag){ ag.st = 'idle'; ag.task = null; ag.paused = false; ag.seenInput = null; wmRelease(ag.who); }
function agentEnd(ag, st, why){ for (const g of activeGoals(ag)) goalEnd(ag, g, st, why); agentIdle(ag); }
const pendingOn = g => (g.pending || []).some(p => p.h.st === 'run');
const taskReady = (ag, t) => t.st === 'todo' && t.g.st === 'run' && !(t.blockedUntil > TT) && !(t.g.waitUntil > TT) && t.deps.every(id => ag.tasks.find(u => u.id === id)?.st !== 'todo');
// which ready task now: looking up to three tasks ahead (in an order their precedences allow), the sequence with the
// shortest walk; a goal with a time limit goes before anything, and putting off what someone asked for costs a little
const LOOKAHEAD = 3;
function taskPoint(ag, t, inRoomKey){
  const key = t.a.k && !t.loc?.startsWith('h:') && t.loc !== 'cocina' ? personKey(t.a.k) || t.loc : t.loc;
  return { key, q: keyPoint(key) || (key === 'cocina' ? DOOR.gg : key?.startsWith('h:') ? DOOR[key.slice(2)] : null) };
}
function pickTask(ag){
  const b = wmBody(ag.who), me = personKey(ag.who), start = b && wmScene(ag.who) === 'out' ? [b.x, b.y] : (taskPoint(ag, { a: {}, loc: me || 'cocina' }).q || [b?.x || 0, b?.y || 0]);
  const elig = ag.tasks.filter(t => t.st === 'todo' && t.g.st === 'run' && !(t.blockedUntil > TT) && !(t.g.waitUntil > TT));
  if (!elig.length) return null;
  const urgent = elig.some(t => t.g.prio === 3 && taskReady(ag, t));
  const pts = new Map(elig.map(t => [t, taskPoint(ag, t)]));
  const ready = (t, done) => t.deps.every(id => { const u = ag.tasks.find(v => v.id === id); return !u || u.st !== 'todo' || done.has(u); });
  let best = null, bc = Infinity;
  const depth = Math.min(LOOKAHEAD, elig.length), led0 = Object.values(ANIM).some(c => c.state === 'led' && (c.ledBy || 'ana') === ag.who);
  const leading = done => { const g = [...done].some(t => t.a.v === 'guiar'), s_ = [...done].some(t => t.a.v === 'soltar'); return (led0 || g) && !s_; };   // (walking with a cow on a rope is slow and awkward)
  const walk = (pos, posKey, done, seq, cost) => {
    if (cost >= bc) return;
    if (seq.length === depth) { bc = cost; best = seq[0]; return; }
    for (const t of elig) {
      if (done.has(t) || !ready(t, done)) continue;
      if (!seq.length && urgent && t.g.prio !== 3) continue;   // (a time limit: that first)
      const { key, q } = pts.get(t), d = (!q || key === posKey ? 0 : dist(pos[0], pos[1], q[0], q[1])) * (leading(done) && t.a.v !== 'soltar' ? 2.5 : 1);
      const delay = seq.length * (t.g.prio - 1) * 400;   // (putting off what someone asked for)
      done.add(t); seq.push(t); walk(q || pos, key, done, seq, cost + d + delay); seq.pop(); done.delete(t);
    }
  };
  walk(start, me, new Set(), [], 0);
  return best;
}
// (a task may take longer the farther it is and the slower one walks, and the longer its action lasts (washing the
// dishes is a quarter of an hour): its budget of time, set when it is chosen)
const SELF_MOVING = ['dar', 'vender', 'comprar', 'cambiar', 'conversar', 'disculparse', 'pedir', 'interceder', 'guiar', 'visitar', 'devolver', 'jurar', 'perdonar', 'cuidar', 'regañar', 'subir_calesa', 'leer_cuento', 'felicitar', 'consolar', 'pedir_permiso', 'merendar'];
// the player gives Ana something else to do (walks her, taps somewhere, talks): her plan waits; after a while with
// nothing asked of her she takes it up again (planned anew from where she is and what she has now)
const RESUME_IDLE = 12;
function anaPaused(ag){
  if (ag.seenInput == null) ag.seenInput = lastInput;
  if (ANA_AUTO) { if (!ag.paused) return false; ag.paused = false; ag.seenInput = lastInput; agentLog(ag, '▶ vuelve a su plan (en automático)'); for (const g of activeGoals(ag)) goalPlan(ag, g); return true; }
  const busyNow = WM_KEYS.some(k => keys.has(k)) || !!stick || (ana.goto && !ana.goto.wm && !ana.goto.auto) || menuOpen() || !!game.talk || game.cooking || sleeping;
  if (!ag.paused) {
    if (lastInput <= ag.seenInput && !(ana.goto && !ana.goto.wm && !ana.goto.auto) && !WM_KEYS.some(k => keys.has(k)) && !stick) return false;
    ag.paused = true; ag.st = 'pausa'; const t = ag.task; if (t) { t.there = false; t.step = { a: t.a, t: 0 }; ag.task = null; }
    if (ana.goto?.wm) ana.goto = null; agentLog(ag, '⏸ la jugadora le pidió otra cosa: el plan espera'); return true;
  }
  if (busyNow || TT - lastInput < RESUME_IDLE) return true;
  ag.paused = false; ag.seenInput = lastInput; agentLog(ag, '▶ vuelve a su plan');
  for (const g of activeGoals(ag)) goalPlan(ag, g);
  return true;
}
function agentTick(dt){
  for (const ag of Object.values(AGENTS)) {
    if (ausente(ag.who)) continue;   // (away from Avonlea: her goals wait)
    if (ag.hold) { wmHold(ag, dt); continue; }
    if (!activeGoals(ag).length) { if (ag.st !== 'idle') agentIdle(ag); continue; }
    if (ag.who === 'ana' && anaPaused(ag)) continue;
    if (enConversacion(ag.who)) { wmStop(ag.who); continue; }   // (in the middle of a conversation or a scene: no one walks off; the errand waits)
    { const sg = activeGoals(ag).find(g => g.staying); if (sg) { stayTick(ag, sg, dt); continue; } }   // (at school: in class, the rest waits)
    if (distractTick(ag)) continue;
    for (const g of activeGoals(ag)) if (g.pending.some(p => p.h.st === 'fail' && !p.seen)) { for (const p of g.pending) if (p.h.st === 'fail') { p.seen = true; delete game.wm.facts['pedido:' + p.f.f + ':' + p.to + ':' + today()]; }   // (they tried and could not: one may ask again)
      agentLog(ag, 'quien iba a ayudar no pudo: ' + g.label); if (++g.tries > 3) goalEnd(ag, g, 'fail', 'nadie pudo ayudar'); else goalPlan(ag, g); }
    // goals with nothing left to do: done, waiting for what was promised, or (a little later) a new plan
    for (const g of activeGoals(ag)) {
      if (g.goal.desde && !g.started) { if (hourNow() < g.goal.desde) continue; g.started = true; agentLog(ag, '🕓 es hora: ' + g.label); goalPlan(ag, g); continue; }   // (a goal for later: its hour has come)
      if (ag.tasks.some(t => t.g === g && t.st === 'todo') || g.waitUntil > TT) continue;
      agentCheck(ag); if (g.st !== 'run') continue;
      if (pendingOn(g)) { if (!g.waitLog) { g.waitLog = 1; agentLog(ag, '⏳ espera lo que pidió: ' + g.label); } g.waitUntil = TT + 3; continue; }
      if (g.waited) { g.waited = false; if (++g.tries > 3) { goalEnd(ag, g, 'fail', g.partial ? 'avanzó, pero no lo suficiente por hoy' : 'no resultó'); continue; } goalPlan(ag, g); continue; }
      g.waited = true; g.waitUntil = TT + (pendingOn(g) ? 3 : g.partial ? 2 : 20); if (pendingOn(g)) g.tries--; agentLog(ag, '⏳ espera' + (pendingOn(g) ? ' lo que pidió' : '') + ': ' + g.label);
    }
    if (!activeGoals(ag).length) { agentIdle(ag); continue; }
    if (!ag.task || ag.task.st !== 'todo') { ag.task = pickTask(ag); if (ag.task) { ag.task.t = 0; ag.task.step = { a: ag.task.a, t: 0 }; const q = taskPoint(ag, ag.task).q, b = wmBody(ag.who); ag.task.budget = 90 + (q && b ? 2 * dist(b.x, b.y, q[0], q[1]) / wmPace(ag) : 60) + accDuracion(ag.task.a, ag.who) * 1.5; agentLog(ag, '→ ' + stepText(ag.task.a) + (activeGoals(ag).length > 1 ? ' (' + ag.task.g.label + ')' : '')); } }
    const t = ag.task;
    if (!t) { if (ag.st !== 'wait') { ag.st = 'wait'; wmRelease(ag.who); } continue; }
    if (distractCheck(ag)) continue;
    ag.st = 'run'; ag.goalNow = t.g; t.step.t += dt;
    let r;
    if (!SELF_MOVING.includes(t.a.v) && !t.there) { r = wmMove(ag.who, t.loc, dt); if (r === 'ok') { t.there = true; r = t.a.v === 'ir' ? 'ok' : 'run'; } }
    else r = t.a.v === 'ir' ? 'ok' : wmExec(ag, t.a, t.step, dt);
    if (r === 'fail' && pendingOn(t.g) && /no lo tiene|faltan|no tiene|no viene|no la lleva/.test(t.step.why || '')) { t.blockedUntil = TT + 3; t.step = { a: t.a, t: 0 }; t.there = false; ag.task = null; agentLog(ag, '⏳ falta lo que pidió: ' + stepText(t.a)); continue; }   // (it is on its way: meanwhile, something else)
    if (r === 'ok') { t.st = 'done'; ag.task = null; agentCheck(ag); }
    else if (r === 'fail' || t.step.t > (t.budget || 150)) {
      agentLog(ag, '✘ falló: ' + stepText(t.a) + (t.step.why ? ' (' + t.step.why + ')' : '')); ag.task = null; t.st = 'fail';
      if (++t.g.tries > 3) goalEnd(ag, t.g, 'fail', 'falló varias veces'); else goalPlan(ag, t.g);
    }
  }
}
const WM_KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyA', 'KeyD', 'KeyW', 'KeyS'];   // (the player moving Ana herself stops her plan)
