/* ---------- errands: what the others ask Ana to do (the game checks they are done) ---------- */
const TASK_KINDS = ['ninguno', 'traer', 'regar', 'cocinar', 'recado', 'ir'];
const activeTasks = () => game.tasks.filter(t => !t.done);
function taskText(t){
  switch (t.tipo) {
    case 'traer': return `Llevarle ${itemText(t.item, t.n)} a ${NAMES[t.para]}`;
    case 'regar': return `Regar ${t.n} ${t.n > 1 ? 'canteros' : 'cantero'} de la huerta (${t.prog || 0}/${t.n})`;
    case 'cocinar': return `Cocinar ${ITEM_NAME[t.item][0]}`;
    case 'recado': return `Decirle a ${NAMES[t.para]}: «${t.recado}»`;
    default: { const n = PLACES[t.lugar][0]; return 'Ir ' + (n.startsWith('el ') ? 'al ' + n.slice(3) : 'a ' + n); }
  }
}
function validTask(who, e){
  if (!e || !TASK_KINDS.includes(e.tipo) || e.tipo === 'ninguno' || activeTasks().length >= 3 || activeTasks().some(t => t.from === who && t.tipo === e.tipo)) return null;
  const n = clamp(Math.round(+e.cantidad || 1), 1, 5), para = PEOPLE[e.para] ? e.para : who, t = { from: who, tipo: e.tipo, n, para, d: today() };
  if (e.tipo === 'traer') { if (!ITEMS.includes(e.item) || !inSeason(e.item)) return null; t.item = e.item; }
  else if (e.tipo === 'regar') { if (S === 3) return null; t.n = Math.min(n, 6); t.prog = 0; }
  else if (e.tipo === 'cocinar') { if (!ITEM_DEFS[e.item]?.recipe || !inSeason(e.item)) return null; t.item = e.item; }
  else if (e.tipo === 'recado') { const r = String(e.recado || '').trim().slice(0, 160); if (!r || para === who) return null; t.recado = r; }
  else if (e.tipo === 'ir') { if (!PLACES[e.lugar]) return null; t.lugar = e.lugar; }
  return t;
}
function addTask(t){ t.id = (game.taskSeq = (game.taskSeq || 0) + 1); game.tasks.push(t); logEv(`${NAMES[t.from]} le encargó a Ana: ${taskText(t)}.`, [t.from, ...witnesses()]); sfx.happy(); save(); }
function taskDone(t){
  t.done = true; float('📜 ¡Encargo cumplido!', ana.x, ana.y - 64); sfx.done();
  logEv(`Ana cumplió el encargo de ${NAMES[t.from]}: ${taskText(t)}.`);
  planSoon(t.from, `Ana cumplió el encargo que le diste (${taskText(t)})`); save();
}
// (watering, cooking and going somewhere are seen by the game itself)
function taskEvent(kind, k){
  for (const t of activeTasks()) {
    if (kind === 'regar' && t.tipo === 'regar' && ++t.prog >= t.n) taskDone(t);
    if (kind === 'cocinar' && t.tipo === 'cocinar' && t.item === k) taskDone(t);
    if (kind === 'ir' && t.tipo === 'ir' && game.scene === 'out' && dist(ana.x, ana.y, PLACES[t.lugar][1], PLACES[t.lugar][2]) < 110) taskDone(t);
  }
}
// bringing things and messages: done in a conversation with whoever they are for
function taskOptions(who){
  const o = [];
  for (const t of activeTasks()) {
    if (t.tipo === 'traer' && t.para === who && game.inv[t.item] >= t.n) o.push(['📜 Entregar ' + itemText(t.item, t.n), () => deliver(t)]);
    if (t.tipo === 'recado' && t.para === who) o.push(['📜 Darle el recado de ' + NAMES[t.from], () => passMessage(t)]);
  }
  return o;
}
function deliver(t){
  const who = t.para; game.inv[t.item] -= t.n; t.done = true; game.fond[who] = Math.min(5, game.fond[who] + 1);
  if (t.from === who) { t.thanked = true; game.fond[who] = Math.min(5, game.fond[who] + 1); }
  hearts(PEOPLE[who].x, PEOPLE[who].y - 56); sfx.done();
  logEv(`Ana le llevó ${itemText(t.item, t.n)} a ${NAMES[who]}` + (t.from === who ? ', como le había pedido.' : `, de parte de ${NAMES[t.from]}.`), [who, ...witnesses()]);
  if (t.from !== who) planSoon(t.from, `Ana cumplió el encargo que le diste (${taskText(t)})`);
  save();
  const note = t.from === who ? `(Ana te entrega ${itemText(t.item, t.n)}: el encargo que tú le pediste.)` : `(Ana te entrega ${itemText(t.item, t.n)} de parte de ${NAMES[t.from]}, que se lo encargó.)`;
  if (aiReady()) aiTalk(who, note); else say(who, '¡Gracias, Ana! Justo lo que hacía falta.', [['De nada', close]]);
}
function passMessage(t){
  const who = t.para; t.done = true; know(who, `${NAMES[t.from]} le mandó a decir con Ana: «${t.recado}»`);
  logEv(`Ana le dio a ${NAMES[who]} el recado de ${NAMES[t.from]}.`, [who]); planSoon(t.from, `Ana le dio tu recado a ${NAMES[who]}`); planSoon(who, `Ana te trajo un recado de ${NAMES[t.from]}: «${t.recado}»`); sfx.done(); save();
  if (aiReady()) aiTalk(who, `(Ana te trae un recado de ${NAMES[t.from]}: «${t.recado}»)`); else say(who, 'Vaya, gracias por avisarme, Ana.', [['De nada', close]]);
}
// on meeting someone: thanks for an errand done, a present they had planned, why they came looking for her
function talkPrelude(who){
  const n = [], p = PEOPLE[who];
  for (const t of game.tasks.filter(t => t.from === who && t.done && !t.thanked)) { t.thanked = true; game.fond[who] = Math.min(5, game.fond[who] + 1); hearts(p.x, p.y - 56); n.push(`Ana cumplió el encargo que le pediste (${taskText(t)}); agradéceselo.`); }
  const k = game.giftFor[who];
  if (k && ABIL[who].regalar.includes(k) && inSeason(k) && game.npcGiftDay[who] !== today() && !(PREPARED.includes(k) && hasIt(k))) { const q = k === 'bayas' || k === 'manzanas' ? 3 : 1; game.inv[k] += q; game.npcGiftDay[who] = today(); float('+' + itemText(k, q), ana.x, ana.y - 60); logEv(`${NAMES[who]} le regaló a Ana ${itemText(k, q)}.`, [who, ...witnesses()]); n.push(`Le das a Ana ${itemText(k, q)}, como tenías pensado.`); }
  delete game.giftFor[who];
  if (amb.recent && amb.recent.parts.includes(who) && TT - amb.recent.t < 90) n.push('Estaban conversando con Ana hace un momento: ' + amb.recent.summary);
  if (p.wantsTalk) { n.push(`Tú fuiste a buscar a Ana${p.why ? ' (' + p.why + ')' : ''}.`); p.wantsTalk = false; }
  save();
  return n;
}
// something a character does right away, decided in a conversation (checked against what they can do)
function applyAction(who, a){
  if (!a || !a.tipo || a.tipo === 'ninguna') return;
  const A = ABIL[who], p = PEOPLE[who];
  if (a.tipo === 'regalar' && A.regalar.includes(a.item) && inSeason(a.item) && game.npcGiftDay[who] !== today() && !(PREPARED.includes(a.item) && hasIt(a.item))) {
    const q = clamp(Math.round(+a.cantidad || 1), 1, 3); game.inv[a.item] += q; game.npcGiftDay[who] = today();
    float('+' + itemText(a.item, q), ana.x, ana.y - 60); logEv(`${NAMES[who]} le regaló a Ana ${itemText(a.item, q)}.`, [who, ...witnesses()]); sfx.happy();
  } else if (a.tipo === 'acompanar' && A.acompanar && diana.where === game.scene && !diana.follow) { diana.follow = true; logEv('Ana y Diana salieron a pasear juntas.', ['diana', ...witnesses()]); }
  else if (a.tipo === 'ir' && A.ir && PLACES[a.lugar]) { p.target = { place: a.lugar, until: hourNow() + 2 }; if (who === 'diana') diana.follow = false; }
  save();
}
