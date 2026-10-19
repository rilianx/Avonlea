/* ---------- conversations: scenes played as speech bubbles ----------
   A short scene (what Ana and whoever is near say, one line each, from the written lines) is played as bubbles over
   their heads, one at a time, and then ends by itself.
   - Passing by: when Ana comes near someone, a word from them, without stopping her.
   - A scene of the story of the day: at the end the player decides only what matters (an errand, a present, a walk).
   Space or a tap skips a line; Esc leaves. */
const amb = { cur: null, tok: 0, cool: 0, mute: {}, seen: {}, recent: null, hist: [] };
let bubbles = [];
// --- calling someone from a distance: they stop and look (and, if they get on with whoever calls, come over), a while
const CALL_R = 520, CALL_WAIT = 14;
const callName = k => wmName(k).replace(/^(el|la) /, '');
function callPerson(by, k, o = {}){
  const b = wmBody(k), cb = wmBody(by); if (!b || !cb || k === by || wmScene(k) !== wmScene(by) || b.lie || b.sit) return false;
  const d = dist(b.x, b.y, cb.x, cb.y); if (d > CALL_R || d < 50) return false;
  const come = o.come ?? (relGetW(k, by) >= 3 || kin(k, by) || !!FOLKBY[k]?.kid);
  b.called = { by, t0: TT, until: TT + (o.wait || CALL_WAIT), come };
  if (o.say !== false) { const n = callName(k), formal = /^(Sr|Sra|Srta)\.|Rev|Sr\. /.test(n) && by === 'ana'; const v = { nombre: n[0].toUpperCase() + n.slice(1) }; sayB(qOf(by), formal ? dicho('llamar_formal', v) : come ? dicho('llamar_ven', v) : dicho('llamar_espera', v)); }
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
    if (!c.ans && TT > c.t0 + 1.2 && watched(p.where || 'out')) { c.ans = 1; sayB(qOf(k), c.come ? dicho('llamada_voy') : dicho('llamada_que')); }
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
function sceneStart(s, directed){
  s.i = -1; s.wait = .5; s.directed = directed; amb.cur = s; bubbles = [];
  if (directed) { game.talk = { who: s.parts[0], scene: true }; game.talkOpts = null; $('talk').hidden = true; }
}
function turnTo(p, to){
  if (p === ana ? ana.moving : p.sit || (p === diana && diana.follow && p.moving)) return;
  p.dir = to.x < p.x ? 3 : 1; if (Math.abs(to.y - p.y) > Math.abs(to.x - p.x) * 1.2) p.dir = to.y < p.y ? 0 : 2;
}
function ambTick(dt){
  const s = amb.cur;
  const far = (r) => s.parts.length && s.parts.every(k => sceneOf(k) !== game.scene || dist(ana.x, ana.y, PEOPLE[k].x, PEOPLE[k].y) > r);
  if (!s.directed && (game.scene !== s.scene || game.talk || game.cooking || game.map || !$('ajustes').hidden || far(190))) return ambEnd();
  if (s.directed && (game.scene !== s.scene || far(260))) { s.noMenu = true; if (game.talk?.scene) { game.talk = null; $('talk').hidden = true; } return ambEnd(); }   // (Ana walked off: the talk is over)
  if ((s.wait -= dt) > 0) return;
  if (!s.directed && ['ana', ...s.parts].some(k => ocupada(k) && !(s.ve && !AGENTS[k]?.acting))) return ambEnd();   // (one of them got busy: the loose talk is dropped; not a remark on what they see, if they are only staying)
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
    logEv(sum, [...s.parts, ...witnesses()]);
    amb.recent = { parts: s.parts, summary: said.map(l => nameOf(l.q) + ': «' + l.t + '»').join(' '), t: TT };
  }
  amb.cool = TT + 60;
  for (const k of s.parts) { amb.mute[k] = TT + (k === 'diana' && diana.follow ? 70 : 110); amb.seen[k] = true; }
  if (s.after) startIntent(s.after, true);
  if (s.directed && s.noMenu && game.talk?.scene) game.talk = null;   // (nothing to decide: the talk just ends)
  if (s.directed && !s.noMenu) { const last = [...s.lines].reverse().find(l => l.q === who) || s.lines[s.lines.length - 1]; ambMenu(who, last ? last.t : '…', s); }
}
// stops whatever is being said (Ana is going to talk, or leaves)
function ambAbort(){ amb.tok = 0; if (amb.cur) { amb.cur.directed = false; ambEnd(); } bubbles = []; }
// at the end of a scene of the story: the player decides only what matters (and then the talk goes on as always)
const talkAgain = who => { close(); talk(who, true); };
function ambMenu(who, text, s){
  const opts = [], req = validTask(who, s.out.encargo);
  if (req) {
    opts.push(['📜 Sí, lo haré', () => { addTask(req); if (s.story) s.story.taskId = req.id; talkAgain(who); }]);
    opts.push(['Ahora no puedo', () => talkAgain(who)]);
  }
  opts.push(...taskOptions(who));
  for (const [k, [name]] of Object.entries(GIFTS)) if (game.inv[k] > 0) opts.push(['Regalar ' + name, () => give(who, k)]);
  opts.push(...convOpciones(who), ...walkOption(who));
  if (!req && s.turns < 4) opts.push(['Seguir conversando', () => talkAgain(who)]);
  opts.push([cierre(who), close]);
  say(who, req ? '📜 ' + NAMES[who] + ' te pide: ' + taskText(req) : '¿Qué quieres hacer?', opts);
}
const writtenTalkOn = () => !!game.playAct || game.scene === 'camino' || cart.riding || !!(AGENTS.ana?.ride && AGENTS.ana.followOf) || talkBusy('viaje') || (CAP1.on && !CAP1.done);
// someone is saying something right now (a loose line would cover it)
const hablando = () => bubbles.some(b => b.t < b.dur);
// busy: doing something (or someone doing something with her), or staying somewhere for a goal (at tea)
const ocupada = k => !!(AGENTS[k]?.acting || (k === 'ana' && game.playAct) || Object.values(AGENTS).some(a => a.acting && (a.acting.k === k || a.acting.con === k)) || AGENTS[k] && activeGoals(AGENTS[k]).some(g => g.staying));
function ambUpdate(dt){
  if (amb.cur) return ambTick(dt);
  if (enc.cur) return;
  { const H = dlgHechos(); if ((H.inicio_juego || H.primera_noche) && !H.desayuno_prueba) return; }   // (the first night: only what the book says)
  if (writtenTalkOn()) return;   // (on the trip, or in the book's chapter: the written lines go, not the loose ones)
  if (TALKS.some(t => t.lines.some(l => l.q === 'ana' || l.q === '?'))) return;   // (Ana in a scene: no loose lines in the middle of it)
  if (game.talk || game.cooking || game.map || !$('ajustes').hidden) return;
  const all = Object.keys(PEOPLE).filter(k => sceneOf(k) === game.scene), dd = k => dist(ana.x, ana.y, PEOPLE[k].x, PEOPLE[k].y);
  for (const k of Object.keys(PEOPLE)) if (sceneOf(k) !== game.scene || dd(k) > 280) amb.seen[k] = false;
  if (TT < amb.cool) return;
  { const se = storyNow(); if (se && storyHere(se)) return; }   // (here a scene of the story is about to be played: it goes first)
  if (ocupada('ana') || hablando()) return;   // (in the middle of something with Ana, or Ana herself busy, or someone speaking: no loose lines)
  let best = null, bd = 1e9;
  for (const k of all) { const d = dd(k); if (TT < (amb.mute[k] || 0) || d > 240 || d >= bd || (ocupada(k) && (AGENTS[k]?.acting || !reaccionAlVerla(k)))) continue; best = k; bd = d; }   // (staying somewhere, at church, one still remarks what one sees)
  if (!best) return;
  { const L = bd < 90 && cadenaEncuentro(best); if (L) { amb.mute[best] = TT + 110; amb.seen[best] = true; sceneStart({ parts: [best], lines: L, out: {}, scene: game.scene, resumen: '' }, false); return; } }   // (two who have not met: they meet, as in the book)
  if (best === 'diana' && !dianaAmiga()) return;   // (no friend's greeting from one she does not know yet)
  { const C = ANA_AUTO && bd < 90 && !reaccionAlVerla(best) && !activeGoals(AGENTS[best] || { goals: [] }).length && !activeGoals(AGENTS.ana).length && !ocupada(best) && !ocupada('ana') && Math.random() < .3 && convDisponibles(best).filter(d => !convSitio(d) || convEnSitio(d, convSitio(d)))[0]; if (C) { amb.mute[best] = TT + 110; amb.seen[best] = true; conversar(C); return; } }   // (now and then, one of the conversations there are with them, by itself: only with Ana on her own, 🤖; otherwise what is in the menu, the player chooses)
  // what they see of her (in a nightgown, out at night, no hat), they say first, from where they see it (not only beside
  // her)
  { const ve = reaccionAlVerla(best); if (ve) { amb.mute[best] = TT + 110; amb.seen[best] = true; sceneStart({ parts: [best], lines: [{ q: best, t: ve }], out: {}, scene: game.scene, resumen: '', ve: true }, false); return; } }
  // just a word from them, from the written lines
  if (bd < 90) { const l = (game.wm?.sick || []).includes(best) ? [comentarioTexto('enfermo') || dicho('tos')] : LINES[best], u = l.length > 1 ? l.filter(x => x !== amb.ultima?.[best]) : l, t = u[Math.floor(Math.random() * u.length)]; (amb.ultima ||= {})[best] = t; if (!t) { amb.mute[best] = TT + 110; return; }   // (not the same line twice in a row; and if they have said all they have today, nothing)
    amb.mute[best] = TT + 110 * (1 + oidoHoy(best).size); amb.seen[best] = true; sceneStart({ parts: [best], lines: [{ q: best, t }], out: {}, scene: game.scene, resumen: '' }, false); }
}
function drawTag(g, t){
  g.font = '9px Georgia, serif'; g.textAlign = 'center';
  const w = g.measureText(t.label).width + 12, x = t.x - w / 2, y = t.y - t.hy * 2 - 22, r = 5;
  g.save(); g.globalAlpha = .92; g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + 14, r); g.arcTo(x + w, y + 14, x, y + 14, r); g.arcTo(x, y + 14, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
  g.fillStyle = '#fffaf0'; g.fill(); g.strokeStyle = '#6b4a30'; g.lineWidth = 1; g.stroke(); g.fillStyle = '#3b2a1c'; g.fillText(t.label, t.x, y + 10); g.restore();
}
// what is said, on the screen (same size whatever the zoom), kept inside it, above the head if it fits, else below.
// Three kinds, as in a comic: what one says, a bubble with its tail pointing at whoever speaks; what one thinks (a line
// that starts with «~»: «ana piensa:» in the script), a cloud with little rounds for a tail; and what is told of them,
// how they feel, what they do (the part in brackets at the start: «(Ana se queda quieta.)»), a square caption, no tail.
function drawBubble(g, p, b, W, H, fase){   // (fase 'cuadros': only the captions, first, so that the bubbles go under them)
  const Z = view.Z, a = clamp(Math.min(b.t / .15, (b.dur + .35 - b.t) / .3), 0, 1);
  let t = conNombres(b.text), piensa = false, narra = null;
  if (t[0] === '~') { piensa = true; t = t.slice(1).trim(); }
  const m = t.match(/^\(([^)]*)\)\s*(.*)$/); if (m) { narra = m[1].trim(); t = m[2].trim(); }
  if (t[0] === '~') { piensa = true; t = t.slice(1).trim(); }
  const enCama = p === ana && ana.enCama && game.scene === 'ga', sxB = enCama ? GA.bed.x + 48 : p.x;   // (in her bed: her head on the pillow)
  const headY = enCama ? GA.bed.y - 50 : p.lie ? p.y - 24 : p.headTop ? p.y - p.headTop : p.y - Math.max(62, 28 + 12 * HEAD_M) * LOOKS[p.look].h - 6;
  const sx = (sxB - view.ox) * Z, top = (headY - view.oy) * Z - (1 - a) * 5, foot = (p.y - view.oy) * Z;
  g.save(); g.globalAlpha = a; g.lineJoin = 'round'; g.textAlign = 'center';
  if (fase === 'cuadros') { if (narra) cuadroArriba(g, narra, W, a); }
  else if (t) cajaTexto(g, t, piensa ? 'piensa' : 'dice', p, sx, top, foot, W, H);
  g.restore();
}
// a caption: what is told of someone, fixed at the top of the screen (one under the other, if there are several)
let cuadrosY = 56;
function cuadroArriba(g, text, W, a){
  const der = document.body.classList.contains('lado-oculto') ? 0 : 64;   // (beside the buttons on the right, not under them)
  const fs = W < 520 ? 13 : 14, maxW = Math.min(520, W - 32 - der); g.font = 'italic ' + fs + 'px Georgia, serif';
  const rows = []; let cur = ''; for (const w of text.split(' ')) { const t = cur ? cur + ' ' + w : w; if (cur && g.measureText(t).width > maxW - 24) { rows.push(cur); cur = w; } else cur = t; } rows.push(cur);
  const lh = fs + 4, w = Math.min(maxW, Math.max(...rows.map(r => g.measureText(r).width)) + 28), h = rows.length * lh + 14, x = (W - der - w) / 2, y = cuadrosY;
  g.save(); g.globalAlpha = a; g.beginPath(); g.rect(x, y, w, h); g.fillStyle = '#f3e4bf'; g.fill(); g.strokeStyle = '#8a6a48'; g.lineWidth = 1.2; g.stroke();
  g.fillStyle = '#4a3420'; g.textAlign = 'center'; rows.forEach((r, k) => g.fillText(r, x + w / 2, y + 7 + (k + 1) * lh - 3)); g.restore();
  cuadrosY += h + 6;
}
// one box: its rows, where it goes (above «top» if it fits, else from «foot» down), its shape and its tail
function cajaTexto(g, text, kind, p, sx, top, foot, W, H, apilada){
  const small = W < 520, narra = kind === 'narra';
  let fs = small ? 12 : 13, maxW = Math.min(small ? 200 : 240, W - 24), rows;
  const font = () => (narra ? 'italic ' : '') + fs + 'px Georgia, serif';
  const wrap = () => { g.font = font(); rows = []; let cur = ''; for (const w of text.split(' ')) { const t = cur ? cur + ' ' + w : w; if (cur && g.measureText(t).width > maxW) { rows.push(cur); cur = w; } else cur = t; } rows.push(cur); };
  wrap(); if (rows.length > 5) { fs -= 1; maxW = Math.min(maxW + 60, W - 24); wrap(); }
  const lh = fs + 3, w = Math.min(Math.max(...rows.map(r => g.measureText(r).width)) + (kind === 'piensa' ? 26 : 18), W - 12), h = rows.length * lh + (kind === 'piensa' ? 14 : 10);
  const gap = kind === 'piensa' ? 16 : narra && apilada ? 0 : 8;
  let y, below = false;
  if (top != null) { y = top - h - gap; if (y < 6) { y = Math.min((foot ?? top) + 10, H - h - 6); below = true; } }
  else { y = foot; below = true; }
  const y0 = Math.min(cuadrosY, H - h - 6);   // (never over the captions at the top)
  if (y < y0 && !below && foot != null) { const yb = foot + 10; if (yb + h < H - 6) { y = yb; below = true; } }
  y = clamp(y, y0, H - h - 6);
  const der = document.body.classList.contains('lado-oculto') || W < 400 ? 6 : 62;   // (and not under the buttons on the right)
  const x = clamp(sx - w / 2, 6, Math.max(6, W - w - der)), r = narra ? 2 : kind === 'piensa' ? Math.min(16, h / 2) : 8, tx = clamp(sx, x + r + 4, x + w - r - 4);
  const rect = rr => { g.beginPath(); g.moveTo(x + rr, y); g.arcTo(x + w, y, x + w, y + h, rr); g.arcTo(x + w, y + h, x, y + h, rr); g.arcTo(x, y + h, x, y, rr); g.arcTo(x, y, x + w, y, rr); g.closePath(); };
  const tinta = p === ana ? '#a8432c' : '#6b4a30';
  if (narra) {   // (a caption: parchment, square, no tail)
    rect(r); g.fillStyle = '#f3e4bf'; g.fill(); g.strokeStyle = '#8a6a48'; g.lineWidth = 1; g.stroke();
  } else if (kind === 'piensa') {   // (a cloud: its edge in little bumps, and rounds going down to the head)
    g.fillStyle = '#ffffff'; g.strokeStyle = tinta; g.lineWidth = 1.2;
    const bumps = []; const nx = Math.max(4, Math.round(w / 15)), ny = Math.max(1, Math.round(h / 15));
    for (let i = 0; i <= nx; i++) { bumps.push([x + w * i / nx, y]); bumps.push([x + w * i / nx, y + h]); }
    for (let j = 1; j < ny; j++) { bumps.push([x, y + h * j / ny]); bumps.push([x + w, y + h * j / ny]); }
    const br = Math.min(8, h / 2.8);
    g.beginPath(); for (const [bx, by] of bumps) { g.moveTo(bx + br, by); g.arc(bx, by, br, 0, Math.PI * 2); } g.fill(); g.stroke();
    rect(r); g.fill();
    const dir = below ? -1 : 1, y0 = below ? y : y + h;
    for (const [k, rad] of [[1, 4], [2, 2.6]]) { g.beginPath(); g.arc(tx + (sx - tx) * k / 3, y0 + dir * (6 + k * 6), rad, 0, Math.PI * 2); g.fill(); g.stroke(); }
  } else {   // (what is said: the bubble and its tail)
    rect(r); g.fillStyle = '#fffaf0'; g.fill(); g.strokeStyle = tinta; g.lineWidth = 1.3; g.stroke();
    g.beginPath(); if (below) { g.moveTo(tx - 5, y + .5); g.lineTo(clamp(sx, tx - 12, tx + 12), Math.max(foot + 2, y - 7)); g.lineTo(tx + 5, y + .5); } else { g.moveTo(tx - 5, y + h - .5); g.lineTo(clamp(sx, tx - 12, tx + 12), Math.min(top, y + h + 7)); g.lineTo(tx + 5, y + h - .5); }
    g.fill(); g.stroke(); g.fillRect(tx - 4, below ? y + .5 : y + h - 2, 8, 1.6);
  }
  g.font = font(); g.fillStyle = narra ? '#4a3420' : '#3b2a1c'; rows.forEach((t, k) => g.fillText(t, x + w / 2, y + (kind === 'piensa' ? 7 : 4) + (k + 1) * lh - 2));
  return { y, h, below };
}
function give(who, k){
  const d = ITEM_DEFS[k], n = d.giveAll ? game.inv[k] : 1, what = d.giveAll ? itemText(k, n) : d.gift.art;
  game.inv[k] -= n; game.fond[who] = Math.min(5, game.fond[who] + 1);
  const p = PEOPLE[who]; hearts(p.x, p.y - 56); sfx.happy();
  logEv('Ana le ' + (d.giveAll ? 'dio ' : 'regaló ') + what + ' a ' + NAMES[who] + '.', [who, ...witnesses()]); storyEvent('regalo:' + who); storyEvent('regalo:' + who + ':' + k); save();
  say(who, d.gift.reply + CH[who].giftReply, [['De nada', close]]);
}
function say(who, text, opts, wait = false){
  game.talk = { who, wait }; if (who !== 'ana') relatoDicho(who, text);   // (Ana's own box is a question to the player, not something said)
  const box = $('talk'), f = Math.min(5, game.fond[who] || 0), heartsTxt = who in game.fond ? '♥'.repeat(f) + '♡'.repeat(5 - f) : '';
  box.innerHTML = `<div class="who">${NAMES[who] || (who === 'ana' ? 'Ana' : FOLKBY[who] ? cap(FOLKBY[who].def.name) : who)}<span>${heartsTxt}</span></div><div class="line"></div><div class="opts"></div>`;
  box.querySelector('.line').textContent = conNombres(text); box.classList.toggle('wait', wait);
  const row = box.querySelector('.opts');
  opts.forEach(([label, fn], k) => { const b = document.createElement('button'); b.textContent = (opts.length > 1 ? (k + 1) + '. ' : '') + conNombres(label); b.onclick = e => { e.stopPropagation(); fn(); }; row.appendChild(b); });
  box.hidden = false; game.talkOpts = opts;
  // a decision with a character: if the player does not choose in 10 seconds, Ana chooses by herself
  if (opts.length > 1 && !wait && PEOPLE[who] && AJUSTES.auto !== false && (ANA_AUTO || navigator.webdriver)) { game.talk.deadline = TT + 10; box.insertAdjacentHTML('beforeend', '<div class="tbar"><i></i></div>'); }
}
// a decision box is open (the talk itself, or a box that waits, does not hold anyone still)
const menuOpen = () => !!game.talk && !game.talk.scene && !game.talk.wait;
function close(){ $('talk').hidden = true; game.talk = null; game.talkOpts = null; ambAbort(); }
function cookMenu(){
  const can = k => Object.entries(ITEM_DEFS[k].recipe).every(([i, n]) => game.inv[i] >= n);
  const opts = ITEMS.filter(k => ITEM_DEFS[k].recipe && can(k)).map(k => [ITEM_DEFS[k].cook, () => { close(); startCook(k); }]);
  opts.push(['Nada por ahora', close]);
  say('Ana', opts.length > 2 ? '¿Qué cocino?' : dicho('faltan_ingredientes:' + (conoceA('diana') ? 'diana' : 'vecinos')), opts);
}
function startCook(k){ for (const [i, n] of Object.entries(ITEM_DEFS[k].recipe)) game.inv[i] -= n; game.cooking = { k, t: 2.6 }; ana.dir = 0; sfx.cook(); }
