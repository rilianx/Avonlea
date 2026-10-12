/* ---------- Mrs. Lynde's house: the window on the road, the rocking chair, the quilting frame ---------- */
const RLC = { x: 4.2 * T, y: 4.6 * T }, RLQ = { x: 8.8 * T, y: 5.6 * T };
function drawLynde(c, t, night){
  c.fillStyle = '#c4966a'; c.fillRect(0, 0, KIT.w, KIT.h);
  c.strokeStyle = 'rgba(110,70,40,.35)'; c.lineWidth = 1; for (let y = 2.4 * T; y < KIT.h; y += 14) { c.beginPath(); c.moveTo(0, y); c.lineTo(KIT.w, y); c.stroke(); for (let x = (y / 14 % 2) * 40 + 10; x < KIT.w; x += 80) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 14); c.stroke(); } }
  blob(c, [[0, 0], [KIT.w, 0], [KIT.w, 2.4 * T], [0, 2.4 * T]], '#e4ead0');
  for (let x = 8; x < KIT.w; x += 26) for (let y = 10; y < 2.4 * T; y += 20) ell(c, x + ((y / 20 | 0) % 2) * 13, y, 1.7, 1.7, 'rgba(120,150,90,.45)');
  c.fillStyle = '#7a5536'; c.fillRect(0, 2.4 * T - 6, KIT.w, 6);
  // the window, with the white road and the hill beyond (she sees everyone who goes by)
  const wx = RLC.x;
  blob(c, [[wx - 42, 10], [wx + 42, 10], [wx + 42, 58], [wx - 42, 58]], night > .3 ? '#34416a' : S === 3 ? '#e4eef4' : '#bfe0ea');
  if (night <= .3) { c.save(); c.beginPath(); c.rect(wx - 42, 10, 84, 48); c.clip(); ell(c, wx - 10, 66, 70, 22, S === 3 ? '#f0f4f6' : '#8fbd68'); c.strokeStyle = S === 3 ? '#cfd6dc' : '#f2ead6'; c.lineWidth = 7; c.beginPath(); c.moveTo(wx + 40, 58); c.quadraticCurveTo(wx + 6, 44, wx + 22, 28); c.stroke(); c.restore(); }
  c.strokeStyle = '#7a5536'; c.lineWidth = 3; c.beginPath(); c.moveTo(wx, 10); c.lineTo(wx, 58); c.moveTo(wx - 42, 34); c.lineTo(wx + 42, 34); c.stroke();
  for (const sd of [-1, 1]) blob(c, [[wx + sd * 46, 8], [wx + sd * 30, 8], [wx + sd * 36, 40], [wx + sd * 48, 62]], '#d8a0a8');
  // a clock, and the dresser with the good plates
  ell(c, 8.2 * T, 34, 12, 12, '#fffaf0', true); line(c, [[8.2 * T, 34], [8.2 * T, 26]], INK, 1.4); line(c, [[8.2 * T, 34], [8.2 * T + 6, 36]], INK, 1.4);
  const dx = 11.4 * T;
  blob(c, [[dx - 30, 2.4 * T + 2], [dx + 30, 2.4 * T + 2], [dx + 30, 14], [dx - 30, 14]], '#8a6040');
  for (const sy of [30, 52]) { blob(c, [[dx - 26, sy + 6], [dx + 26, sy + 6], [dx + 26, sy + 8], [dx - 26, sy + 8]], '#6a4a30', false); for (let k = 0; k < 4; k++) ell(c, dx - 20 + k * 13.5, sy, 5.5, 5.5, ['#f6efe0', '#9db3bf', '#f6efe0', '#c9a7b0'][k], true); }
  // a patchwork rug and the cat asleep on it
  ell(c, 6.4 * T, 7 * T, 96, 34, '#a8554a', true); ell(c, 6.4 * T, 7 * T, 74, 24, '#d9b04a'); ell(c, 6.4 * T, 7 * T, 52, 16, '#5c8c63'); ell(c, 6.4 * T, 7 * T, 30, 8, '#efe0c8');
  ell(c, 6.9 * T, 7 * T, 12, 6, '#8a8a90', true); ell(c, 6.9 * T + 11, 7 * T - 3, 5, 4.4, '#8a8a90', true); const br = Math.sin(t * 2) * .6; ell(c, 6.9 * T - 2, 7 * T - 5 - br, 8, 3, '#9a9aa0');
  blob(c, [[KDOOR.x - 18, KIT.h], [KDOOR.x - 18, KIT.h - 6], [KDOOR.x + 18, KIT.h - 6], [KDOOR.x + 18, KIT.h]], '#7a4f32');
}
function drawRLChair(c, t){
  const x = RLC.x, y = RLC.y, r = Math.sin(t * 1.4) * 1.5;
  ell(c, x, y + 4, 26, 6, 'rgba(40,25,15,.22)');
  line(c, [[x - 22, y + 4 + r * .2], [x, y + 8], [x + 22, y + 4 - r * .2]], '#5b3a28', 2.4);
  blob(c, [[x - 16, y - 2], [x + 16, y - 2], [x + 14, y - 16], [x - 14, y - 16]], '#b5604c');
  blob(c, [[x - 15, y - 16], [x + 15, y - 16], [x + 12, y - 52], [x - 12, y - 52]], '#8a6040'); blob(c, [[x - 10, y - 20], [x + 10, y - 20], [x + 8, y - 46], [x - 8, y - 46]], '#c98a7a');
  ell(c, x + 30, y - 4, 9, 7, '#a8815a', true); ell(c, x + 28, y - 9, 4.4, 4.4, '#c0582e', true); line(c, [[x + 26, y - 10], [x + 31, y - 8]], 'rgba(255,230,210,.7)', 1);
}
function drawRLQuilt(c){
  const x = RLQ.x, y = RLQ.y;
  ell(c, x, y + 2, 56, 8, 'rgba(40,25,15,.22)');
  for (const cx of [-48, 48]) blob(c, [[x + cx - 6, y], [x + cx + 6, y], [x + cx + 6, y - 24], [x + cx - 6, y - 24]], '#8a6040');
  blob(c, [[x - 56, y - 22], [x + 56, y - 22], [x + 50, y - 46], [x - 50, y - 46]], '#7a5536');
  blob(c, [[x - 52, y - 24], [x + 52, y - 24], [x + 47, y - 44], [x - 47, y - 44]], '#efe0c8');
  const cols = ['#d9433b', '#d9a441', '#5c8c63', '#7f9ec0', '#a58ad8', '#f2c94c'];
  for (let k = 0; k < 8; k++) for (let q = 0; q < 3; q++) { c.fillStyle = cols[(k * 3 + q * 5) % cols.length]; c.globalAlpha = .75; c.fillRect(x - 46 + k * 11.5, y - 42 + q * 6.4, 9.5, 5.4); } c.globalAlpha = 1;
}
