/* ---------- the kitchen at Green Gables ---------- */
const KIT = { w: 13 * T, h: 9 * T };   // the room, its own little world
const STOVE = lugar('cocina', 'estufa'), TABLE = lugar('cocina', 'mesa'), KDOOR = lugar('cocina', 'puerta');   // (src/mapas/cocina.tmj)
// the places at the table (x, y, facing; and where one walks to before sitting down): Ana and a guest behind it, the Cuthberts at the ends
const SEATS = { ana: [TABLE.x - 16, TABLE.y - 44, 2], lynde: [TABLE.x + 20, TABLE.y - 44, 2], matthew: [TABLE.x - 54, TABLE.y + 2, 1], marilla: [TABLE.x + 54, TABLE.y + 2, 3] };
const seatFrom = q => q[1] < TABLE.y ? [q[0], q[1]] : [q[0], q[1] + 16];
function sitSeat(p, q, dt, sp){
  if (p.mealSat) { p.moving = false; return; }
  const snap = () => { p.x = q[0]; p.y = q[1]; p.dir = q[2]; p.sit = true; p.mealSat = true; p.moving = false; p.nav = null; };
  if (game.scene !== 'gg') return snap();
  const [ax, ay] = seatFrom(q); if (walkPath(p, ax, ay, sp, dt)) snap();
}
function mealSit(){
  if (ana.meal) { ana.sit = false; ana.meal = null; return; }
  const q = SEATS.ana; ana.goto = null; ana.lie = false; ana.x = q[0]; ana.y = q[1]; ana.dir = q[2]; ana.sit = true; ana.vx = ana.vy = 0;
  ana.meal = { next: TT + 2.5, rounds: 0, logged: false }; toby.goal = null; toby.until = 0;
}
// sitting at the table at mealtime, they talk: a little conversation every so often, while she stays
function mealTick(){
  const m = ana.meal; if (!m) return;
  if (!ana.sit || game.scene !== 'gg') { ana.meal = null; return; }
  if (amb.cur || game.talk || amb.busy || TT < m.next || m.rounds >= 4) return;
  const hr = hourNow(), parts = Object.keys(PEOPLE).filter(k => sceneOf(k) === 'gg' && PEOPLE[k].mealSat);
  m.next = TT + 30; if (!parts.length || !MEAL(hr)) return;
  const w = mealWord(hr); m.rounds++;
  if (!m.logged) { m.logged = true; logEv(`Ana se sentó a ${w.verb} con ${parts.map(k => NAMES[k]).join(' y ')} (${w.menu}).`, parts); }
  const note = `Están sentados a la mesa de la cocina de Tejas Verdes, ${w.ing} (${w.menu}). Charla de sobremesa, tranquila${m.rounds > 1 ? ' (siguen conversando; no repitan lo que ya se dijo)' : ''}: cómo va el día, lo que ha pasado, lo que viene, algún chisme del pueblo; Ana habla mucho y con imaginación, Marilla le recuerda que coma, Matthew dice poco pero tierno.`;
  if (!aiReady()) { const ls = [{ q: 'ana', t: pick(['¡Qué rico huele todo! Comer en esta mesa me hace sentir parte de una familia de verdad.', 'Marilla, ¿no te parece que el pan sabe distinto cuando una está feliz?', 'Hoy imaginé que esta mesa era un banquete en un castillo... pero esto es mucho mejor, porque es de verdad.']) }, ...parts.slice(0, 2).map(k => ({ q: k, t: pick(LINES[k]) }))]; sceneStart({ parts, lines: ls, out: {}, scene: 'gg', resumen: '' }, false); return; }
  amb.busy = true;
  sceneAsk(parts, note, 'pasar').then(s => { if (ana.meal === m && !amb.cur && !game.talk && s.lines.length) sceneStart(s, false); }).catch(e => console.debug('[avonlea IA] comida', e.message)).finally(() => { amb.busy = false; });
}
function drawKitchen(c, t, night){
  // floor boards, the back wall with a window and shelves, a rag rug
  c.fillStyle = '#c99a63'; c.fillRect(0, 0, KIT.w, KIT.h);
  c.strokeStyle = 'rgba(110,70,40,.35)'; c.lineWidth = 1; for (let y = 2.4 * T; y < KIT.h; y += 14) { c.beginPath(); c.moveTo(0, y); c.lineTo(KIT.w, y); c.stroke(); for (let x = (y / 14 % 2) * 40; x < KIT.w; x += 80) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 14); c.stroke(); } }
  blob(c, [[0, 0], [KIT.w, 0], [KIT.w, 2.4 * T], [0, 2.4 * T]], '#efe4c8');
  c.strokeStyle = 'rgba(120,100,80,.2)'; for (let x = 10; x < KIT.w; x += 10) { c.beginPath(); c.moveTo(x, 2); c.lineTo(x, 2.4 * T - 2); c.stroke(); }
  blob(c, [[KIT.w / 2 - 34, 10], [KIT.w / 2 + 34, 10], [KIT.w / 2 + 34, 52], [KIT.w / 2 - 34, 52]], night > .3 ? '#3b4a72' : '#bfe0ea');
  c.strokeStyle = '#7a5536'; c.lineWidth = 3; c.beginPath(); c.moveTo(KIT.w / 2, 10); c.lineTo(KIT.w / 2, 52); c.moveTo(KIT.w / 2 - 34, 31); c.lineTo(KIT.w / 2 + 34, 31); c.stroke();
  ell(c, KIT.w / 2 - 30, 58, 6, 4, '#c54a3c', true); ell(c, KIT.w / 2 + 30, 58, 6, 4, '#f2c14e', true);
  for (const sx of [10.5 * T]) { blob(c, [[sx - 34, 30], [sx + 34, 30], [sx + 34, 34], [sx - 34, 34]], '#8a6040'); for (let k = 0; k < 4; k++) ell(c, sx - 24 + k * 16, 25, 5, 5, ['#e8d9b8', '#d9a441', '#b5604c', '#9db3bf'][k], true); }
  ell(c, 7 * T, 6.8 * T, 70, 30, '#b9655a', true); ell(c, 7 * T, 6.8 * T, 52, 21, '#d9a441'); ell(c, 7 * T, 6.8 * T, 32, 12, '#5c8c63');
  // the stove: black iron with a kettle (steam when she cooks)
  blob(c, [[STOVE.x - 30, STOVE.y - 40], [STOVE.x + 30, STOVE.y - 40], [STOVE.x + 30, STOVE.y], [STOVE.x - 30, STOVE.y]], '#3a3436');
  blob(c, [[STOVE.x - 30, STOVE.y - 40], [STOVE.x + 30, STOVE.y - 40], [STOVE.x + 26, STOVE.y - 52], [STOVE.x - 26, STOVE.y - 52]], '#4a4446');
  ell(c, STOVE.x - 10, STOVE.y - 50, 9, 4, '#6a6266', true); ell(c, STOVE.x + 12, STOVE.y - 56, 8, 7, '#9a9aa2', true);
  blob(c, [[STOVE.x - 10, STOVE.y - 22], [STOVE.x + 10, STOVE.y - 22], [STOVE.x + 10, STOVE.y - 8], [STOVE.x - 10, STOVE.y - 8]], `rgba(255,${130 + 50 * Math.sin(t * 6)},60,.9)`);
  blob(c, [[STOVE.x + 18, STOVE.y - 40], [STOVE.x + 26, STOVE.y - 40], [STOVE.x + 26, -10], [STOVE.x + 18, -10]], '#2d2829');
  if (game.cooking) for (let k = 0; k < 5; k++) { const q = ((t * .6 + k / 5) % 1); ell(c, STOVE.x + 12 + Math.sin(q * 7) * 4, STOVE.y - 64 - q * 40, 3 + q * 7, 2 + q * 5, `rgba(255,255,255,${.5 * (1 - q)})`); }
  // the door out
  blob(c, [[KDOOR.x - 18, KIT.h], [KDOOR.x - 18, KIT.h - 6], [KDOOR.x + 18, KIT.h - 6], [KDOOR.x + 18, KIT.h]], '#7a4f32');
}
// the dresser with the everyday plates, the dry sink with its basin and bucket, a chair by the window
function drawAparador(c){
  const { x, y } = KX.aparador; ell(c, x + 4, y + 2, 34, 6, 'rgba(40,25,15,.22)');
  blob(c, [[x - 30, y], [x + 30, y], [x + 30, y - 76], [x - 30, y - 76]], '#8a5e3c'); blob(c, [[x - 26, y - 40], [x + 26, y - 40], [x + 26, y - 72], [x - 26, y - 72]], '#5a3a24');
  for (const yy of [y - 62, y - 50]) { line(c, [[x - 26, yy + 6], [x + 26, yy + 6]], '#8a5e3c', 2, yy); for (let k = 0; k < 4; k++) ell(c, x - 18 + k * 12, yy, 5, 5, ['#f6f8fa', '#e8eef2', '#dfe8f0', '#f6f8fa'][k], true); }
  blob(c, [[x - 28, y - 36], [x - 1, y - 36], [x - 1, y - 4], [x - 28, y - 4]], '#9a6a44'); blob(c, [[x + 1, y - 36], [x + 28, y - 36], [x + 28, y - 4], [x + 1, y - 4]], '#9a6a44'); ell(c, x - 4, y - 20, 1.6, 1.6, '#3a2418'); ell(c, x + 4, y - 20, 1.6, 1.6, '#3a2418');
}
function drawFregadero(c){
  const { x, y } = KX.fregadero; ell(c, x, y + 2, 30, 5, 'rgba(40,25,15,.2)');
  blob(c, [[x - 28, y], [x + 28, y], [x + 28, y - 24], [x - 28, y - 24]], '#8a5e3c'); blob(c, [[x - 30, y - 24], [x + 30, y - 24], [x + 28, y - 30], [x - 28, y - 30]], '#a07450');
  ell(c, x, y - 28, 14, 4, '#c8ccd0', true); ell(c, x, y - 28, 11, 2.6, 'rgba(150,190,220,.8)'); blob(c, [[x + 18, y - 30], [x + 26, y - 30], [x + 25, y - 40], [x + 19, y - 40]], '#8a8a90');
  if (!(game.mesa?.dia === today() && game.mesa.sucia === false) && hourNow() > 9) for (let k = 0; k < 2; k++) ell(c, x - 18 + k * 5, y - 32 - k * 1.5, 5, 2, '#ece6d8', true);   // (dishes waiting)
}
function drawSilla(c, x, y){ blob(c, [[x - 10, y], [x + 10, y], [x + 10, y - 12], [x - 10, y - 12]], '#8a6040'); blob(c, [[x - 10, y - 12], [x + 10, y - 12], [x + 9, y - 32], [x - 9, y - 32]], '#7a5536'); for (const o of [-4, 4]) line(c, [[x + o, y - 14], [x + o, y - 30]], '#5a3a24', 1, o); }
function drawTable(c){
  ell(c, TABLE.x, TABLE.y + 2, 46, 8, 'rgba(40,25,15,.22)');
  for (const [cx, cy] of [[-52, -8], [52, -8]]) { blob(c, [[TABLE.x + cx - 9, TABLE.y + cy], [TABLE.x + cx + 9, TABLE.y + cy], [TABLE.x + cx + 9, TABLE.y + cy - 24], [TABLE.x + cx - 9, TABLE.y + cy - 24]], '#8a6040'); }
  blob(c, [[TABLE.x - 42, TABLE.y - 18], [TABLE.x + 42, TABLE.y - 18], [TABLE.x + 42, TABLE.y - 12], [TABLE.x - 42, TABLE.y - 12]], '#7a5536');
  c.fillStyle = '#6a4a30'; c.fillRect(TABLE.x - 38, TABLE.y - 12, 4, 12); c.fillRect(TABLE.x + 34, TABLE.y - 12, 4, 12);
  blob(c, [[TABLE.x - 44, TABLE.y - 40], [TABLE.x + 44, TABLE.y - 40], [TABLE.x + 42, TABLE.y - 18], [TABLE.x - 42, TABLE.y - 18]], '#f6efe0');
  for (let k = -3; k <= 3; k++) line(c, [[TABLE.x + k * 12, TABLE.y - 39], [TABLE.x + k * 12, TABLE.y - 19]], 'rgba(200,80,70,.35)', 1, k);
  const M = game.mesa?.dia === today() ? game.mesa : null;
  if (M?.puesta) for (let k = 0; k < 3; k++) { const x = TABLE.x - 30 + k * 30, y = TABLE.y - 28; ell(c, x, y, 7, 3, '#ffffff', true); line(c, [[x + 9, y - 2], [x + 9, y + 2]], '#a8a8b0', 1, k); }   // (laid: three places)
  else if (M?.sucia !== false) { ell(c, TABLE.x - 14, TABLE.y - 30, 8, 4, '#fffaf0', true); ell(c, TABLE.x + 16, TABLE.y - 32, 5, 4, '#9db3bf', true); }
  if (game.inv.tarta + game.inv.compota > 0) ell(c, TABLE.x - 14, TABLE.y - 32, 6, 3, '#7a4a8a', true);
  // what Marilla left on the table for Ana
  if (game.table === 'tarta') { ell(c, TABLE.x + 2, TABLE.y - 30, 10, 4.4, '#d9a46a', true); ell(c, TABLE.x + 2, TABLE.y - 31, 8, 3, '#6a3a6e'); }
  else if (game.table === 'compota') { blob(c, [[TABLE.x - 3, TABLE.y - 28], [TABLE.x + 5, TABLE.y - 28], [TABLE.x + 5, TABLE.y - 38], [TABLE.x - 3, TABLE.y - 38]], '#e0a24a'); }
  else if (game.table === 'te') { ell(c, TABLE.x + 2, TABLE.y - 32, 7, 6, '#f2ede2', true); line(c, [[TABLE.x + 8, TABLE.y - 33], [TABLE.x + 13, TABLE.y - 37]], INK, 1.4); }
}
