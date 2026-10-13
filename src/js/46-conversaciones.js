/* ---------- conversations: scenes played as speech bubbles ----------
   The AI writes a short scene (what Ana and whoever is near say, one line each, Ana included: the player chooses
   nothing) and the game plays it as bubbles over their heads, one at a time, then lets it end by itself.
   - Passing by: when Ana comes near someone (or walks with Diana) the scene is asked for a little before she gets
     there, and plays without stopping her. It can be empty: sometimes nobody says anything.
   - On purpose (Space on someone): the same scene, and at the end the player decides only what matters (an errand,
     a present, a walk). Space or a tap skips a line; Esc leaves. */
const amb = { cur: null, ready: null, busy: false, tok: 0, cool: 0, err: 0, mute: {}, seen: {}, recent: null, hist: [] };
let bubbles = [];
// --- calling someone from a distance: they stop and look (and, if they get on with whoever calls, come over), a while
const CALL_R = 520, CALL_WAIT = 14;
const callName = k => wmName(k).replace(/^(el|la) /, '');
function callPerson(by, k, o = {}){
  const b = wmBody(k), cb = wmBody(by); if (!b || !cb || k === by || wmScene(k) !== wmScene(by) || b.lie || b.sit) return false;
  const d = dist(b.x, b.y, cb.x, cb.y); if (d > CALL_R || d < 50) return false;
  const come = o.come ?? (relGetW(k, by) >= 3 || kin(k, by) || !!FOLKBY[k]?.kid);
  b.called = { by, t0: TT, until: TT + (o.wait || CALL_WAIT), come };
  if (o.say !== false) { const n = callName(k), formal = /^(Sr|Sra|Srta)\.|Rev|Sr\. /.test(n) && by === 'ana'; sayB(qOf(by), `¡${n[0].toUpperCase() + n.slice(1)}! ` + (formal ? '¡Espere un momento, por favor!' : come ? '¡Ven un momento!' : '¡Espera!')); }
  return true;
}
// a called one: facing whoever called, waiting (or walking up to them); 'null' when the call is over
function calledHold(p, dt){
  const c = p.called, cb = c && wmBody(c.by);
  if (!c || !cb || TT > c.until) { p.called = null; return null; }
  const d = dist(p.x, p.y, cb.x, cb.y); if (d < 60) c.until = Math.min(c.until, TT + 4);   // (they are together: a moment more, to talk)
  if (Math.abs(cb.x - p.x) > Math.abs(cb.y - p.y)) p.dir = cb.x > p.x ? 1 : 3; else p.dir = cb.y > p.y ? 2 : 0;
  if (c.come && d > 46) { p.called = null; walkPath(p, cb.x + (p.x < cb.x ? -30 : 30), cb.y + 4, 40, dt); p.called = c; }
  else p.moving = false;
  return false;
}
function calledTick(){
  for (const p of [...Object.values(PEOPLE), ...FOLK]) {
    const c = p.called; if (!c) continue;
    if (TT > c.until) { p.called = null; continue; }
    const k = PEOPLE[p.id] === p ? p.id : Object.keys(PEOPLE).find(x => PEOPLE[x] === p) || p.id;
    if (!c.ans && TT > c.t0 + 1.2 && watched(p.where || 'out')) { c.ans = 1; sayB(qOf(k), c.come ? pick(['¿Sí? ¡Ya voy!', '¡Voy!', '¿Me llamabas? Ya voy.']) : pick(['¿Sí?', '¿Me llamabas?', '¿Qué pasa?'])); }
  }
}
// the player: call whoever is nearest (not right beside her) within reach of a voice
function callNearest(){
  if (game.talk || menuOpen()) return;
  let best = null, bd = 1e9;
  for (const k of [...Object.keys(PEOPLE), ...FOLK.map(f => f.id)]) { const b = wmBody(k); if (!b || wmScene(k) !== game.scene || b.called) continue; const d = dist(b.x, b.y, ana.x, ana.y); if (d > 50 && d < CALL_R && d < bd) { bd = d; best = k; } }
  if (!best) { notice('No hay nadie cerca a quien llamar'); return; }
  callPerson('ana', best);
}
const personOf = k => k === 'ana' ? ana : PEOPLE[k] || ANIM[k] || (k.startsWith('f:') ? FOLKBY[k.slice(2)] : null);
const lineDur = t => clamp(1.7 + t.length * .055, 2.4, 9);
const nameOf = k => k === 'ana' ? 'Ana' : NAMES[k] || ANIMALS[k]?.name;
// who is in the talk: the one asked, and whoever stands close to them (and to Ana)
function chatGroup(main){
  const p = PEOPLE[main];
  return [main, ...Object.keys(PEOPLE).filter(k => k !== main && sceneOf(k) === game.scene && dist(PEOPLE[k].x, PEOPLE[k].y, p.x, p.y) < 140 && dist(PEOPLE[k].x, PEOPLE[k].y, ana.x, ana.y) < 200).slice(0, 2)];
}
const talkersHere = () => Object.keys(ANIMALS).filter(k => ANIMALS[k].talks && ANIM[k].where === game.scene);
// what a character knows lately, without repeats nor comings and goings (for the short request)
const BORING = /^\S+(?: \S+)? (entró a|volvió a su casa|llegó a|llegó por|salió|se fue al pueblo)/;
function factsOf(k, n = 3){
  const seen = new Set(), out = [];
  for (const t of [...(game.know[k] || []).map(e => e.t), ...(memOn(k) ? game.mem[k] || [] : []).map(x => x.replace(/^día \d+: /, ''))].reverse()) {
    const c = t.replace(/^\([^)]*\) /, ''); if (seen.has(c) || BORING.test(c)) continue; seen.add(c); out.push(c.slice(0, 150)); if (out.length >= n) break;
  }
  return out.reverse();
}
function sceneMsgMin(parts, note, full){
  const top = stateText(Object.keys(CH)[0]).split('\n').slice(0, 3);
  let m = top.join('\n').replace('; Pelusa, la gata, se le restriega en los tobillos', '') + (parts.length ? '' : '\nAna está sola.');
  for (const k of parts) {
    const f = factsOf(k), r = relGet(k, 'ana').n;
    m += `\n- ${NAMES[k]} (cariño hacia Ana ${game.fond[k] ?? 2}/5${r ? ': ' + r : ''}; ${whereText(k)}): ${voiceShort(k)}` + (f.length ? ` Sabe: ${f.join(' / ')}` : '');
    if (full) { const mine = activeTasks().filter(t => t.from === k); m += ` Puede: ${abilText(k)}.` + (mine.length ? ` Le encargó a Ana: ${mine.map(taskText).join('; ')}.` : ''); }
  }
  if (full) m += `\nAna tiene ${activeTasks().length} encargo(s) pendiente(s).`;
  if (!/ESCENA DE LA HISTORIA/.test(note)) { const st = game.story, e = st && st.v === 2 && st.day === today() ? st.escenas.find(e => !isFinal(e) && e.personajes.some(k => parts.includes(k))) : null; if (e) m += `\nLA HISTORIA DE HOY («${st.titulo}»), lo que viene: hacia las ${e.hora}:00, ${e.que_pasa.slice(0, 160)} (sin adelantarlo).`; }
  for (const k of talkersHere()) m += `\nAhí está ${ANIMALS[k].name} ("quien": "${k}"): ${ANIMALS[k].desc}; puede soltar una frase corta.`;
  if (amb.hist.length) m += '\nLO ÚLTIMO QUE SE DIJERON (no lo repitas): ' + amb.hist.slice(-4).map(x => x.slice(0, 120)).join(' / ');
  return m + `\nPRESENTES: Ana${parts.map(k => ', ' + NAMES[k]).join('')}.\nAHORA PASA: ${note}`;
}
function sceneMsg(parts, note, full = true){
  if (!FULL()) return sceneMsgMin(parts, note, full);
  let m = parts.length ? stateText(parts[0]) : worldText() + '\n\nAna está sola.';
  for (const k of parts.slice(1)) {
    const kn = (game.know[k] || []).slice(-6).map(e => '  - ' + e.t).join('\n') || '  (nada)', mm = (memOn(k) && (game.mem[k] || []).slice(-4).map(x => '  - ' + x).join('\n')) || '  (nada)';
    m += `\n\nTAMBIÉN PRESENTE: ${NAMES[k]} (cariño hacia Ana: ${game.fond[k]}). Lo que siente: ${relText(k, ['ana', ...parts])}. ${storyText(k)}\nLo que sabe:\n${kn}\nLo que recuerda de sus conversaciones con Ana:\n${mm}`;
  }
  for (const k of talkersHere()) m += `\n\nAHÍ ESTÁ TAMBIÉN ${ANIMALS[k].name}: ${ANIMALS[k].desc}. Puede soltar alguna frase corta en la escena ("quien": "${k}").`;
  if (amb.hist.length) m += '\n\nLO ÚLTIMO QUE SE DIJERON (no lo repitas):\n' + amb.hist.slice(-8).map(x => '- ' + x).join('\n');
  const ctx = [];
  for (const k of parts) if (CH[k].routine && PEOPLE[k].where !== CH[k].home) ctx.push(NAMES[k] + ' está ' + whereText(k) + '.');
  if (ctx.length) m += '\n\n' + ctx.join(' ');
  return m + `\n\nPRESENTES: Ana${parts.map(k => ', ' + NAMES[k]).join('')}.\nAHORA PASA: ${note}\nEscribe la escena.`;
}
// kind: 'pasar' (a passing chat: only the lines), 'dicho' (after something Ana said: also where she goes), or a talk she started (all)
async function sceneAsk(parts, note, kind = 'charla'){
  const sch = kind === 'pasar' ? SCHEMA_PASS() : kind === 'dicho' ? SCHEMA_SAID() : AI_SCHEMA;
  const r = await aiCall([{ role: 'user', content: sceneMsg(parts, note, kind === 'charla') }], sch), o = { encargo: NO_TASK, accion: { tipo: 'ninguna' }, ana_va: { tipo: 'ninguna', destino: '' }, ...r.out }, ok = ['ana', ...parts, ...talkersHere()];
  const lines = (Array.isArray(o.lineas) ? o.lineas : []).filter(l => l && ok.includes(l.quien) && typeof l.texto === 'string' && l.texto.trim()).slice(0, 9).map(l => ({ q: l.quien, t: l.texto.trim().slice(0, 320) }));
  return { parts, lines, out: o, scene: game.scene, born: TT, resumen: typeof o.resumen === 'string' ? o.resumen.trim() : '' };
}
function sceneStart(s, directed){
  s.i = -1; s.wait = .5; s.directed = directed; amb.cur = s; bubbles = [];
  if (directed) { game.talk = { who: s.parts[0], scene: true }; game.talkOpts = null; $('talk').hidden = true; applyAction(s.parts[0], s.out.accion); }
}
function turnTo(p, to){
  if (p === ana ? ana.moving : p.sit || (p === diana && diana.follow && p.moving)) return;
  p.dir = to.x < p.x ? 3 : 1; if (Math.abs(to.y - p.y) > Math.abs(to.x - p.x) * 1.2) p.dir = to.y < p.y ? 0 : 2;
}
function ambTick(dt){
  const s = amb.cur;
  const far = (r) => s.parts.length && s.parts.every(k => sceneOf(k) !== game.scene || dist(ana.x, ana.y, PEOPLE[k].x, PEOPLE[k].y) > r);
  if (!s.directed && (game.scene !== s.scene || game.talk || game.cooking || game.map || !$('ai').hidden || far(190))) return ambEnd();
  if (s.directed && (game.scene !== s.scene || far(260))) { s.noMenu = true; if (game.talk?.scene) { game.talk = null; $('talk').hidden = true; } return ambEnd(); }   // (Ana walked off: the talk is over)
  if ((s.wait -= dt) > 0) return;
  if (!s.directed && ['ana', ...s.parts].some(ocupada)) return ambEnd();   // (one of them got busy: the loose talk is dropped)
  if (hablando()) return;   // (someone else is saying something: after it)
  if (++s.i >= s.lines.length) return ambEnd();
  const l = s.lines[s.i], sp = personOf(l.q), dur = lineDur(l.t);
  bubbles = [{ q: l.q, text: l.t, t: 0, dur }]; s.wait = dur + .35; sfx.blip();
  for (const k of ['ana', ...s.parts]) if (k !== l.q) turnTo(personOf(k), sp);
}
// the end of a scene (it ran out, or Ana walked off, or she spoke to someone): what happened is remembered
function ambEnd(){
  const s = amb.cur; amb.cur = null; if (!s) return;
  const said = s.lines.slice(0, s.i + 1), who = s.parts[0];
  if (said.length && (s.resumen || s.directed)) {
    for (const l of said) amb.hist.push(nameOf(l.q) + ': ' + l.t); if (amb.hist.length > 16) amb.hist.splice(0, amb.hist.length - 16);
    const sum = s.resumen || (s.parts.length > 1 ? 'Ana conversó con ' + s.parts.map(k => NAMES[k]).join(' y ') + '.' : 'Ana conversó con ' + NAMES[who] + '.');
    logEv(sum, [...s.parts, ...witnesses()]); if (s.resumen) for (const k of s.parts) remember(k, sum);
    amb.recent = { parts: s.parts, summary: said.map(l => nameOf(l.q) + ': «' + l.t + '»').join(' '), t: TT };
  }
  amb.cool = TT + (FULL() ? 35 : 60);
  for (const k of s.parts) { amb.mute[k] = TT + (k === 'diana' && diana.follow ? 70 : 110); amb.seen[k] = true; }
  if (s.after) startIntent(s.after, true);
  if (s.directed && s.noMenu && game.talk?.scene) game.talk = null;   // (nothing to decide: the talk just ends)
  if (s.directed && !s.noMenu) { const last = [...s.lines].reverse().find(l => l.q === who) || s.lines[s.lines.length - 1]; ambMenu(who, last ? last.t : '…', s); }
}
// stops whatever is being said (Ana is going to talk, or leaves)
function ambAbort(){ amb.tok = 0; amb.ready = null; if (amb.cur) { amb.cur.directed = false; ambEnd(); } bubbles = []; }
// at the end of a talk she started: the player decides only what matters
function ambMenu(who, text, s){
  const opts = [], req = validTask(who, s.out.encargo);
  if (req) {
    opts.push(['📜 Sí, lo haré', () => { addTask(req); if (s.story) s.story.taskId = req.id; aiTalk(who, `(Ana acepta el encargo: ${taskText(req)}.)`, s.turns); }]);
    opts.push(['Ahora no puedo', () => aiTalk(who, '(Ana dice que ahora no puede hacer ese encargo.)', s.turns)]);
  }
  opts.push(...taskOptions(who));
  for (const [k, [name]] of Object.entries(GIFTS)) if (game.inv[k] > 0) opts.push(['Regalar ' + name, () => give(who, k)]);
  opts.push(...walkOption(who));
  if (!req && s.turns < 4) opts.push(['Seguir conversando', () => aiTalk(who, `(Ana sigue conversando con ${NAMES[who]}; lo último: ${s.lines.slice(-3).map(l => nameOf(l.q) + ': «' + l.t + '»').join(' ')})`, s.turns)]);
  opts.push(['Adiós', close]);
  say(who, req ? '📜 ' + NAMES[who] + ' te pide: ' + taskText(req) : '¿Qué quieres hacer?', opts);
}
function aiTalk(who, note, turns = 0){
  const id = amb.tok = Math.random(), parts = chatGroup(who);
  say(who, NAMES[who] + ' está pensando…', [['Adiós', close]], true);
  sceneAsk(parts, note).then(s => {
    if (amb.tok !== id || game.talk?.who !== who) return;
    if (!s.lines.length) throw new Error('escena vacía');
    s.turns = turns + 1; sceneStart(s, true);
  }).catch(err => {
    if (amb.tok !== id) return;
    amb.tok = 0; notice('✒ La IA no respondió (' + err.message + '). Uso las frases de siempre.');
    if (game.talk?.who === who) { close(); talkFixed(who); }
  });
}
// passing by: the scene is asked for a little before Ana arrives and starts when she is near
function ambNote(parts){
  const names = parts.map(k => NAMES[k]).join(' y ');
  if (parts.includes('diana') && diana.follow) return `Ana y Diana ${ana.lie ? 'están recostadas en el pasto mirando las nubes, conversando con calma' : 'pasean juntas y van conversando mientras caminan'}${parts.length > 1 ? '; cerca está ' + parts.filter(k => k !== 'diana').map(k => NAMES[k]).join(' y ') : ''}. (Charla al pasar: nadie se lo pidió; Ana también habla.)`;
  if (parts.length > 1) return `Ana llega donde están ${names}, que conversan entre ellos. (Charla al pasar: nadie se lo pidió. Hablan sobre todo entre ellos —los vecinos, la comida, el tiempo, la cosecha, los chismes, lo que Ana hizo—; Ana se une enseguida y habla bastante.)`;
  return `Ana pasa cerca de ${names} y se detiene un momento. (Charla al pasar: nadie se lo pidió; Ana también habla. Pueden saludarse o comentar algo del momento.)`;
}
const writtenTalkOn = () => !!game.playAct || game.scene === 'camino' || cart.riding || !!(AGENTS.ana?.ride && AGENTS.ana.followOf) || talkBusy('viaje') || (CAP1.on && !CAP1.done);
const ENFERMO_LINES = ['Ay… este resfrío me tiene molido.', 'No me siento nada bien, niña.', 'Cof, cof… Si no fuera por este pecho…'];   // (the sick, from bed)
// someone is saying something right now (a loose line would cover it)
const hablando = () => bubbles.some(b => b.t < b.dur);
// busy: doing something (or someone doing something with her), or staying somewhere for a goal (at tea)
const ocupada = k => !!(AGENTS[k]?.acting || (k === 'ana' && game.playAct) || Object.values(AGENTS).some(a => a.acting && (a.acting.k === k || a.acting.con === k)) || AGENTS[k] && activeGoals(AGENTS[k]).some(g => g.staying));
function ambUpdate(dt){
  if (amb.cur) return ambTick(dt);
  if (enc.cur) return;
  if (writtenTalkOn()) return;   // (on the trip, or in the book's chapter: the written lines go, not the loose ones)
  if (game.talk || game.cooking || game.map || !$('ai').hidden) return;
  const all = Object.keys(PEOPLE).filter(k => sceneOf(k) === game.scene), dd = k => dist(ana.x, ana.y, PEOPLE[k].x, PEOPLE[k].y);
  for (const k of Object.keys(PEOPLE)) if (sceneOf(k) !== game.scene || dd(k) > 280) amb.seen[k] = false;
  if (amb.ready) {
    const s = amb.ready;
    if (s.scene !== game.scene || TT - s.born > 50 || s.parts.every(k => sceneOf(k) !== game.scene || dd(k) > 420)) amb.ready = null;
    else if (s.parts.some(k => sceneOf(k) === game.scene && dd(k) < 100)) { amb.ready = null; sceneStart(s, false); }
    return;
  }
  if (amb.busy || TT < amb.cool || TT < amb.err) return;
  { const se = storyNow(); if (se && storyHere(se)) return; }   // (here a scene of the story is about to be played: it goes first)
  if (ocupada('ana') || hablando()) return;   // (in the middle of something with Ana, or Ana herself busy, or someone speaking: no loose lines)
  let best = null, bd = 1e9;
  for (const k of all) { const d = dd(k); if (TT < (amb.mute[k] || 0) || d > 240 || d >= bd || ocupada(k)) continue; best = k; bd = d; }
  if (!best) return;
  if (!aiReady()) {   // (without the AI: just a word from them, from the written lines)
    if (bd < 90) { const l = (game.wm?.sick || []).includes(best) ? ENFERMO_LINES : LINES[best], t = l[Math.floor(Math.random() * l.length)]; amb.mute[best] = TT + 110; amb.seen[best] = true; sceneStart({ parts: [best], lines: [{ q: best, t }], out: {}, scene: game.scene, resumen: '' }, false); }
    return;
  }
  const parts = chatGroup(best); amb.busy = true;
  sceneAsk(parts, ambNote(parts), 'pasar').then(s => {
    if (s.lines.length) amb.ready = s; else for (const k of parts) { amb.mute[k] = TT + 60; amb.seen[k] = true; }
  }).catch(e => { console.debug('[avonlea IA] charla', e.message); amb.err = TT + 60; }).finally(() => { amb.busy = false; });
}
function drawTag(g, t){
  g.font = '9px Georgia, serif'; g.textAlign = 'center';
  const w = g.measureText(t.label).width + 12, x = t.x - w / 2, y = t.y - t.hy * 2 - 22, r = 5;
  g.save(); g.globalAlpha = .92; g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + 14, r); g.arcTo(x + w, y + 14, x, y + 14, r); g.arcTo(x, y + 14, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
  g.fillStyle = '#fffaf0'; g.fill(); g.strokeStyle = '#6b4a30'; g.lineWidth = 1; g.stroke(); g.fillStyle = '#3b2a1c'; g.fillText(t.label, t.x, y + 10); g.restore();
}
// a speech bubble, drawn on the screen (same size whatever the zoom) and kept inside it: above the head if it fits,
// else below; the tail points at whoever speaks
function drawBubble(g, p, b, W, H){
  const Z = view.Z, small = W < 520, a = clamp(Math.min(b.t / .15, (b.dur + .35 - b.t) / .3), 0, 1);
  let fs = small ? 12 : 13, maxW = Math.min(small ? 200 : 240, W - 24), rows;
  const wrap = () => { g.font = fs + 'px Georgia, serif'; rows = []; let cur = ''; for (const w of b.text.split(' ')) { const t = cur ? cur + ' ' + w : w; if (cur && g.measureText(t).width > maxW) { rows.push(cur); cur = w; } else cur = t; } rows.push(cur); };
  wrap(); if (rows.length > 5) { fs -= 1; maxW = Math.min(maxW + 60, W - 24); wrap(); }
  const lh = fs + 3, w = Math.min(Math.max(...rows.map(r => g.measureText(r).width)) + 18, W - 12), h = rows.length * lh + 10, r = 8;
  const headY = p.lie ? p.y - 24 : p.headTop ? p.y - p.headTop : p.y - Math.max(62, 28 + 12 * HEAD_M) * LOOKS[p.look].h - 6;
  const sx = (p.x - view.ox) * Z, top = (headY - view.oy) * Z - (1 - a) * 5, foot = (p.y - view.oy) * Z;
  let y = top - h - 8, below = false;
  if (y < 6) { y = Math.min(foot + 10, H - h - 6); below = true; }
  y = clamp(y, 6, H - h - 6);
  const x = clamp(sx - w / 2, 6, W - w - 6), tx = clamp(sx, x + r + 4, x + w - r - 4);
  g.save(); g.globalAlpha = a; g.lineJoin = 'round'; g.textAlign = 'center';
  g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
  g.fillStyle = '#fffaf0'; g.fill(); g.strokeStyle = p === ana ? '#a8432c' : '#6b4a30'; g.lineWidth = 1.3; g.stroke();
  // the tail
  g.beginPath(); if (below) { g.moveTo(tx - 5, y + .5); g.lineTo(clamp(sx, tx - 12, tx + 12), Math.max(foot + 2, y - 7)); g.lineTo(tx + 5, y + .5); } else { g.moveTo(tx - 5, y + h - .5); g.lineTo(clamp(sx, tx - 12, tx + 12), Math.min(top, y + h + 7)); g.lineTo(tx + 5, y + h - .5); }
  g.fill(); g.stroke(); g.fillRect(tx - 4, below ? y + .5 : y + h - 2, 8, 1.6);
  g.fillStyle = '#3b2a1c'; rows.forEach((t, k) => g.fillText(t, x + w / 2, y + 4 + (k + 1) * lh - 2));
  g.restore();
}
function askKey(){
  const P = PROV[provider()], k = (prompt(`Para conversar con IA (${AI.model}), pega tu clave de la API de ${P.name} (${P.hint}). Se guarda solo en este navegador.`) || '').trim();
  if (k) { AI.keys[provider()] = k; saveAI(); } else { AI.on = false; saveAI(); }
}
function talkFixed(who){ const on = AI.on; AI.on = false; try { talk(who, true); } finally { AI.on = on; } }
function give(who, k){
  const d = ITEM_DEFS[k], n = d.giveAll ? game.inv[k] : 1, what = d.giveAll ? itemText(k, n) : d.gift.art;
  game.inv[k] -= n; game.fond[who] = Math.min(5, game.fond[who] + 1);
  const p = PEOPLE[who]; hearts(p.x, p.y - 56); sfx.happy();
  logEv('Ana le ' + (d.giveAll ? 'dio ' : 'regaló ') + what + ' a ' + NAMES[who] + '.', [who, ...witnesses()]); planSoon(who, 'Ana te acaba de dar ' + what); storyEvent('regalo:' + who); storyEvent('regalo:' + who + ':' + k); save();
  if (aiReady()) { aiTalk(who, '(Ana le ' + (d.giveAll ? 'da ' : 'regala ') + 'a ' + NAMES[who] + ' ' + what + (d.recipe ? ', hecha por ella.)' : '.)')); return; }
  say(who, d.gift.reply + CH[who].giftReply, [['De nada', close]]);
}
function say(who, text, opts, wait = false){
  game.talk = { who, wait }; relatoDicho(who, text);
  const box = $('talk'), f = Math.min(5, game.fond[who] || 0), heartsTxt = who in game.fond ? '♥'.repeat(f) + '♡'.repeat(5 - f) : '';
  box.innerHTML = `<div class="who">${NAMES[who] || who}<span>${heartsTxt}</span></div><div class="line"></div><div class="opts"></div>`;
  box.querySelector('.line').textContent = text; box.classList.toggle('wait', wait);
  const row = box.querySelector('.opts');
  opts.forEach(([label, fn], k) => { const b = document.createElement('button'); b.textContent = (opts.length > 1 ? (k + 1) + '. ' : '') + label; b.onclick = e => { e.stopPropagation(); fn(); }; row.appendChild(b); });
  box.hidden = false; game.talkOpts = opts;
  // a decision with a character: if the player does not choose in 10 seconds, Ana chooses by herself
  if (opts.length > 1 && !wait && PEOPLE[who] && AI.auto !== false) { game.talk.deadline = TT + 10; box.insertAdjacentHTML('beforeend', '<div class="tbar"><i></i></div>'); }
}
// a decision box is open (the talk itself, or waiting for the AI, does not hold anyone still)
const menuOpen = () => !!game.talk && !game.talk.scene && !game.talk.wait;
function close(){ $('talk').hidden = true; game.talk = null; game.talkOpts = null; ambAbort(); }
function cookMenu(){
  const can = k => Object.entries(ITEM_DEFS[k].recipe).every(([i, n]) => game.inv[i] >= n);
  const opts = ITEMS.filter(k => ITEM_DEFS[k].recipe && can(k)).map(k => [ITEM_DEFS[k].cook, () => { close(); startCook(k); }]);
  opts.push(['Nada por ahora', close]);
  say('Ana', opts.length > 2 ? '¿Qué cocino?' : 'Me faltan ingredientes: bayas de los arbustos o manzanas del huerto de Diana. Pero puedo hacer té.', opts);
}
function startCook(k){ for (const [i, n] of Object.entries(ITEM_DEFS[k].recipe)) game.inv[i] -= n; game.cooking = { k, t: 2.6 }; ana.dir = 0; sfx.cook(); }
