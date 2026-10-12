/* ---------- plans: each morning (and when something happens) the AI plans the day of each one ---------- */
const PLAN_SCHEMA = { type: 'object', additionalProperties: false, required: ['pensamiento', 'pasos'], properties: {
  pensamiento: { type: 'string' },
  pasos: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['hora', 'accion', 'lugar', 'item', 'motivo'], properties: {
    hora: { type: 'integer' }, accion: { type: 'string', enum: ['ir', 'esperar', 'visitar_a_ana', 'cocinar', 'regar', 'regalar'] },
    lugar: { type: 'string', enum: ['', ...Object.keys(PLACES)] }, item: { type: 'string', enum: ['', ...ITEMS] }, motivo: { type: 'string' } } } } } };
const planQ = [], planAt = {};
let planBusy = false, planWait = 0;
const plansOn = () => aiReady() && FULL() && AI.plans !== false;
const PLANNERS = () => Object.keys(PEOPLE).filter(k => CH[k].plans !== false);
// re-planning one character, when something important happened to them: at most twice a day, three hours apart
function planSoon(who, reason){
  if (!plansOn() || CH[who].plans === false || planQ.some(q => q[0] === who)) return;
  const P = game.plans[who], at = today() * 24 + hourNow();
  if (!P || P.day !== today() || (P.re || 0) >= 2 || (planAt[who] != null && at - planAt[who] < 3)) return;
  planAt[who] = at; P.re = (P.re || 0) + 1; planQ.push([who, reason]); pumpPlans();
}
async function pumpPlans(){
  if (planBusy || !planQ.length || !aiReady()) return;
  planBusy = true;
  const [who, reason] = planQ.shift();
  try { await makePlan(who, reason); } catch (e) { console.debug('[avonlea IA] plan', who, e.message); }   // (no retries: the routine is enough)
  planBusy = false; pumpPlans();
}
function validStep(who, s, h0){
  const A = ABIL[who], h = Math.round(+s.hora);
  if (!(h >= h0 && h <= 23)) return null;
  const st = { hora: h, accion: s.accion, lugar: s.lugar, item: s.item, motivo: String(s.motivo || '').slice(0, 160) };
  if (s.accion === 'ir') return A.ir && PLACES[s.lugar] ? st : null;
  if (s.accion === 'visitar_a_ana') return A.visitar ? st : null;
  if (s.accion === 'cocinar') return A.cocinar && ['tarta', 'compota', 'te'].includes(s.item) ? st : null;
  if (s.accion === 'regar') return A.regar && S !== 3 ? st : null;
  if (s.accion === 'regalar') return A.regalar.includes(s.item) ? st : null;
  return s.accion === 'esperar' ? st : null;
}
async function makePlan(who, reason){
  const h0 = Math.ceil(hourNow());
  if (h0 > 22) return;
  const msg = stateText(who) + `\n\nAHORA PASA: ${reason}.\nPLANIFICA lo que ${NAMES[who]} hará en lo que queda de hoy (son las ${Math.floor(hourNow())}:00; el día termina a las 24). "pensamiento": una o dos frases en primera persona, con la voz de ${NAMES[who]}, sobre qué piensa hacer hoy y por qué. "pasos": de 1 a 4 acciones en orden, con "hora" entera entre ${h0} y 23, usando solo lo que ${NAMES[who]} puede hacer; "lugar" solo para ir, "item" solo para cocinar o regalar (si no, ""), y "motivo" en pocas palabras.`;
  const r = await aiCall([{ role: 'user', content: msg }], PLAN_SCHEMA);
  const steps = (Array.isArray(r.out.pasos) ? r.out.pasos : []).map(s => validStep(who, s, h0)).filter(Boolean).sort((a, b) => a.hora - b.hora).slice(0, 4);
  game.plans[who] = { day: today(), thought: String(r.out.pensamiento || '').slice(0, 300), steps, reason, re: game.plans[who]?.re || 0 };
  save();
}
/* the plans of the morning: ONE request for everyone (the world is told once, and each one only what is theirs);
   if it fails, the day goes on by the routines, without asking again until tomorrow */
const PLANS_SCHEMA = () => ({ type: 'object', additionalProperties: false, required: ['planes'], properties: { planes: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['quien', 'pensamiento', 'pasos'], properties: { quien: { type: 'string', enum: PLANNERS() }, pensamiento: PLAN_SCHEMA.properties.pensamiento, pasos: PLAN_SCHEMA.properties.pasos } } } } });
function planBlock(who){
  const k = (game.know[who] || []).slice(-6).map(e => e.t), imp = (game.impr[who] || []).slice(-2), mine = activeTasks().filter(t => t.from === who), sty = storyText(who);
  return `- ${NAMES[who]} (ahora ${whereText(who)}; cariño hacia Ana ${game.fond[who] ?? 2}/5). Puede: ${abilText(who)}.` + (imp.length ? ` Se le quedó: ${imp.join(' / ')}.` : '') + (k.length ? ` Sabe de hace poco: ${k.join(' / ')}.` : '') + (mine.length ? ` Le encargó a Ana: ${mine.map(taskText).join('; ')}.` : '') + (sty ? ' ' + sty : '');
}
let planDay = -1;
async function makePlansAll(){
  const who = PLANNERS(), h0 = Math.ceil(hourNow()), day = today();
  planDay = day;
  for (const k of who) game.plans[k] = { day, thought: '', steps: [], reason: 'el día', re: 0 };   // (until the answer, and if there is none: the routine)
  if (h0 > 22 || !who.length) return;
  const msg = worldText() + `

PLANIFICA el día de cada uno (son las ${Math.floor(hourNow())}:00; el día termina a las 24): ${who.map(k => NAMES[k]).join(', ')}.
${who.map(planBlock).join('\n')}`
    + `

Para cada uno ("quien"): "pensamiento", una o dos frases en primera persona, con su voz, sobre qué piensa hacer hoy y por qué; "pasos", de 0 a 3 acciones en orden, con "hora" entera entre ${h0} y 23, solo de lo que puede hacer; "lugar" solo para ir, "item" solo para cocinar o regalar (si no, ""), y "motivo" en pocas palabras. Planes sencillos, propios de su vida; no todos tienen que buscar a Ana.`;
  try {
    const r = await aiCall([{ role: 'user', content: msg }], PLANS_SCHEMA());
    if (today() !== day) return;
    for (const p of Array.isArray(r.out.planes) ? r.out.planes : []) {
      if (!who.includes(p.quien)) continue;
      const steps = (Array.isArray(p.pasos) ? p.pasos : []).map(s => validStep(p.quien, s, h0)).filter(Boolean).sort((a, b) => a.hora - b.hora).slice(0, 3);
      game.plans[p.quien] = { day, thought: String(p.pensamiento || '').slice(0, 300), steps, reason: 'el día', re: 0 };
    }
    save();
  } catch (e) { console.debug('[avonlea IA] planes del día', e.message); }
}
function doStep(who, s){
  const p = PEOPLE[who];
  p.why = s.motivo;
  if (s.accion === 'ir') p.target = { place: s.lugar, until: hourNow() + 2.5 };
  else if (s.accion === 'visitar_a_ana') p.target = { ana: true, until: hourNow() + 2.5 };
  else if (s.accion === 'esperar') p.target = null;
  else if (s.accion === 'cocinar') { if (hasIt(s.item) || game.table) return; game.table = s.item; logEv(`${NAMES[who]} cocinó ${ITEM_NAME[s.item][0]} y la dejó en la mesa de la cocina para Ana.`, [who, ...CH[who].kin]); if (game.scene === 'gg') float(NAMES[who] + ' dejó ' + ITEM_NAME[s.item][0] + ' en la mesa', TABLE.x, TABLE.y - 60); }
  else if (s.accion === 'regar') { if (S !== 3) { BEDS.forEach(b => { if (!b.wet && b.stage < 3) { b.wet = 1; b.grow = 0; } }); logEv(`${NAMES[who]} regó la huerta.`, [who, ...CH[who].kin]); } }
  else if (s.accion === 'regalar') game.giftFor[who] = s.item;
  save();
}
// carrying the plans out: the steps whose hour has come (of several at once, only the last walk counts)
function runPlans(dt){
  if ((planWait -= dt) < 0 && plansOn()) { planWait = 3; if (planDay !== today() && hourNow() < 22 && PLANNERS().some(k => game.plans[k]?.day !== today())) makePlansAll(); }
  const h = hourNow();
  for (const who of Object.keys(PEOPLE)) {
    const P = game.plans[who]; if (!P || P.day !== today()) continue;
    const due = P.steps.filter(s => !s.done && s.hora <= h); if (!due.length) continue;
    due.forEach(s => { s.done = true; });
    const walks = due.filter(s => ['ir', 'visitar_a_ana', 'esperar'].includes(s.accion));
    for (const s of due) if (!walks.includes(s) || s === walks[walks.length - 1]) doStep(who, s);
  }
}
// someone with a place to go walks there (if Ana is indoors they just get there); stuck behind a tree, they step aside
function goTarget(p, dt, sp){
  const tg = p.target;
  if (!tg || hourNow() > tg.until) { p.target = null; return false; }
  if (tg.ana && game.scene !== 'out') return false;
  const [tx, ty] = tg.ana ? [ana.x + (p.x < ana.x ? -30 : 30), ana.y] : PLACES[tg.place].slice(1);
  if (game.scene !== 'out') { p.x = tx; p.y = ty; return true; }
  if (dist(p.x, p.y, tx, ty) < 26) { p.moving = false; if (tg.ana) { p.target = null; p.wantsTalk = true; p.dir = ana.x < p.x ? 3 : 1; float(NAMES[p.look] + ' te buscaba', p.x, p.y - 64); } return true; }
  walkPath(p, tx, ty, sp, dt);
  return true;
}
