/* ---------- Ana's room: the east gable (the narrow bed, the muslin curtains, the Snow Queen outside the window) ---------- */
const STAIRS = lugar('cocina', 'escalera');
const GA = { win: lugar('pieza', 'ventana').x, bed: lugar('pieza', 'cama'), table: lugar('pieza', 'escritorio'), wash: lugar('pieza', 'lavatorio') };   // (src/mapas/pieza.tmj)
function drawStairsUp(c){
  const x0 = 11.2 * T, x1 = 12.8 * T, yb = 4.6 * T, yt = 2.3 * T;
  blob(c, [[x0, yb], [x1, yb], [x1, yt], [x0, yt + 10]], '#a67c52');
  for (let k = 0; k < 7; k++) { const y = yb - 4 - k * 11; c.fillStyle = k % 2 ? '#c9a070' : '#b88c5e'; c.fillRect(x0 + 2 + k * 1.2, y - 7, x1 - x0 - 4 - k * 1.2, 7); line(c, [[x0 + 2, y], [x1 - 2, y]], 'rgba(70,42,26,.4)', 1, k); }
  line(c, [[x0 - 3, yb + 2], [x0 - 3, yt + 6]], '#6a4a30', 3); for (let k = 0; k < 4; k++) line(c, [[x0 - 3, yb - k * 24], [x0 - 3, yb - 14 - k * 24]], '#7a5536', 4, k);
  ell(c, (x0 + x1) / 2, yt + 6, 26, 6, 'rgba(30,20,15,.7)');
}
function drawAnaRoom(c, t, night){
  c.fillStyle = '#d2a878'; c.fillRect(0, 0, KIT.w, KIT.h);
  c.strokeStyle = 'rgba(110,70,40,.3)'; c.lineWidth = 1; for (let y = 2.4 * T; y < KIT.h; y += 14) { c.beginPath(); c.moveTo(0, y); c.lineTo(KIT.w, y); c.stroke(); for (let x = (y / 14 % 2) * 40 + 20; x < KIT.w; x += 80) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 14); c.stroke(); } }
  blob(c, [[0, 0], [KIT.w, 0], [KIT.w, 2.4 * T], [0, 2.4 * T]], '#f6f2e8');   // whitewashed, like in the book
  c.strokeStyle = 'rgba(160,150,130,.18)'; for (let x = 14; x < KIT.w; x += 36) { c.beginPath(); c.moveTo(x, 4); c.lineTo(x + 3, 2.4 * T - 4); c.stroke(); }
  c.fillStyle = '#9a7a56'; c.fillRect(0, 2.4 * T - 5, KIT.w, 5);
  // the window, and the Snow Queen cherry tree outside it (in blossom, green, red and gold, or bare in the snow)
  const wx = GA.win;
  blob(c, [[wx - 42, 10], [wx + 42, 10], [wx + 42, 60], [wx - 42, 60]], night > .3 ? '#2d3a66' : S === 3 ? '#e4eef4' : '#bfe0ea');
  c.save(); c.beginPath(); c.rect(wx - 42, 10, 84, 50); c.clip();
  c.fillStyle = '#6a4a32'; c.fillRect(wx + 8, 32, 7, 40);
  const bl = S === 0 ? ['#fffaf2', '#fbdde3'] : S === 1 ? ['#6fa84e', '#5c9a4c'] : S === 2 ? ['#d8873a', '#c8583a'] : null;
  if (bl) { ell(c, wx + 6, 26, 36, 20, bl[0]); ell(c, wx - 16, 36, 20, 13, bl[1]); ell(c, wx + 28, 38, 18, 12, bl[0]); }
  else { for (const [a, b, d, e] of [[wx + 11, 36, wx - 18, 20], [wx + 11, 34, wx + 30, 18], [wx + 11, 42, wx - 8, 34]]) line(c, [[a, b], [d, e]], '#6a4a32', 2, d); ell(c, wx - 18, 20, 6, 2.4, '#f6f8fb'); ell(c, wx + 30, 18, 6, 2.4, '#f6f8fb'); }
  if (night > .3) for (let k = 0; k < 6; k++) ell(c, wx - 36 + k * 14, 16 + (k * 7) % 14, 1, 1, 'rgba(255,255,220,.8)');
  c.restore();
  c.strokeStyle = '#8a6a48'; c.lineWidth = 3; c.beginPath(); c.moveTo(wx, 10); c.lineTo(wx, 60); c.moveTo(wx - 42, 35); c.lineTo(wx + 42, 35); c.stroke();
  for (const sd of [-1, 1]) blob(c, [[wx + sd * 46, 8], [wx + sd * 28, 8], [wx + sd * 34, 40], [wx + sd * 48, 64]], 'rgba(255,253,246,.92)');
  // pegs on the wall: her straw hat and the brown dress with the puffed sleeves
  const px = 1.3 * T;
  blob(c, [[px - 22, 20], [px + 30, 20], [px + 30, 25], [px - 22, 25]], '#7a5536');
  ell(c, px - 12, 17, 11, 4, '#e8c46a', true); ell(c, px - 12, 14, 6, 4, '#e8c46a', true); line(c, [[px - 18, 16], [px - 6, 16]], '#c0582e', 1.6);
  blob(c, [[px + 14, 24], [px + 26, 24], [px + 28, 58], [px + 12, 58]], '#8a5a3a'); ell(c, px + 10, 30, 6, 6, '#8a5a3a', true); ell(c, px + 30, 30, 6, 6, '#8a5a3a', true);
  // the looking-glass over the little table
  ell(c, GA.table.x, 34, 14, 19, '#c9a04a', true); ell(c, GA.table.x, 34, 10.5, 15.5, '#cfe2ea');
  // a hooked mat
  ell(c, 6.4 * T, 7 * T, 84, 30, '#a8554a', true); ell(c, 6.4 * T, 7 * T, 64, 21, '#efe0c8'); ell(c, 6.4 * T, 7 * T, 42, 13, '#5c8c63');
  // the stairs going down
  blob(c, [[KDOOR.x - 26, KIT.h], [KDOOR.x - 20, KIT.h - 22], [KDOOR.x + 20, KIT.h - 22], [KDOOR.x + 26, KIT.h]], '#5b3a28');
  for (let k = 0; k < 3; k++) line(c, [[KDOOR.x - 24 + k * 2, KIT.h - 4 - k * 6], [KDOOR.x + 24 - k * 2, KIT.h - 4 - k * 6]], 'rgba(230,200,160,.5)', 1.4, k);
  line(c, [[KDOOR.x - 30, KIT.h - 4], [KDOOR.x - 30, KIT.h - 30]], '#6a4a30', 3); line(c, [[KDOOR.x + 30, KIT.h - 4], [KDOOR.x + 30, KIT.h - 30]], '#6a4a30', 3);
}
function drawAnaBed(c){
  const x = GA.bed.x, y = GA.bed.y;
  ell(c, x, y + 3, 80, 9, 'rgba(40,25,15,.22)');
  blob(c, [[x - 70, y], [x + 70, y], [x + 70, y - 14], [x - 70, y - 14]], '#8a6040');
  blob(c, [[x + 62, y - 6], [x + 74, y - 6], [x + 74, y - 60], [x + 62, y - 60]], '#7a5536');
  blob(c, [[x - 74, y - 6], [x - 62, y - 6], [x - 62, y - 36], [x - 74, y - 36]], '#7a5536');
  blob(c, [[x - 64, y - 14], [x + 62, y - 14], [x + 62, y - 32], [x - 64, y - 32]], '#f6efe0');
  const cols = ['#d9433b', '#d9a441', '#5c8c63', '#7f9ec0', '#a58ad8', '#f2c94c'];
  for (let k = 0; k < 9; k++) for (let q = 0; q < 2; q++) { c.fillStyle = cols[(k * 2 + q * 3) % cols.length]; c.globalAlpha = .8; c.fillRect(x - 62 + k * 10, y - 30 + q * 8, 9, 7); } c.globalAlpha = 1;
  ell(c, x + 46, y - 36, 17, 7, '#fffaf0', true);
}
function drawAnaTable(c, t){
  const x = GA.table.x, y = GA.table.y;
  ell(c, x, y + 2, 30, 6, 'rgba(40,25,15,.22)');
  for (const cx of [-22, 22]) blob(c, [[x + cx - 3, y], [x + cx + 3, y], [x + cx + 3, y - 20], [x + cx - 3, y - 20]], '#7a5536');
  blob(c, [[x - 28, y - 20], [x + 28, y - 20], [x + 24, y - 30], [x - 24, y - 30]], '#8a6040');
  for (let k = 0; k < 3; k++) blob(c, [[x - 20, y - 31 - k * 4], [x - 4, y - 31 - k * 4], [x - 4, y - 35 - k * 4], [x - 20, y - 35 - k * 4]], ['#7f9ec0', '#a8554a', '#d9a441'][k]);
  blob(c, [[x + 8, y - 31], [x + 12, y - 31], [x + 12, y - 46], [x + 8, y - 46]], '#fffaf0'); ell(c, x + 10, y - 49 - Math.abs(Math.sin(t * 6)) * 1.5, 2, 4, '#ffd27a');
}
function drawAnaWash(c){
  const x = GA.wash.x, y = GA.wash.y;
  ell(c, x, y + 2, 28, 6, 'rgba(40,25,15,.22)');
  for (const cx of [-18, 18]) blob(c, [[x + cx - 3, y], [x + cx + 3, y], [x + cx + 3, y - 22], [x + cx - 3, y - 22]], '#7a5536');
  blob(c, [[x - 24, y - 22], [x + 24, y - 22], [x + 20, y - 30], [x - 20, y - 30]], '#8a6040');
  ell(c, x - 6, y - 32, 11, 4, '#f6efe0', true); blob(c, [[x + 8, y - 30], [x + 18, y - 30], [x + 17, y - 46], [x + 9, y - 46]], '#9db3bf'); line(c, [[x + 18, y - 40], [x + 22, y - 38]], 'rgba(70,90,100,.9)', 1.6);
}
// Ana says something out loud (a bubble), when nobody else is talking
function anaSays(text){ if (amb.cur) return; bubbles = [{ q: 'ana', text, t: 0, dur: lineDur(text) }]; sfx.blip(); }
const pick = a => a[Math.floor(Math.random() * a.length)];
const WINDOW_LINES = ['¡Mi Reina de las Nieves, toda vestida de novia! Cada primavera pienso que se casa con el cielo.', 'Ya no tiene flores, pero qué verde está... Seguro que me entiende, aunque no hable.', 'Mi cerezo se puso su vestido rojo y dorado. ¡Es el árbol más elegante de toda la Isla!', 'Mi querida Reina de las Nieves duerme bajo la nieve. Ya despertará, es cuestión de paciencia... ¡y yo tengo muchísima! Bueno, casi.'];
const MIRROR_LINES = ['¡Ay, mi pelo! Aunque hoy, con esta luz, parece casi... bueno, castaño. Casi.', 'Con tantas pecas parezco un mapa de islas. ¡Tengo toda la Isla del Príncipe Eduardo en la nariz!', 'Algún día seré pálida y de pelo negro azabache. Y mientras tanto, ¡me quedo con mi imaginación!'];
const SLEEPY_LINES = [['¡Ay, qué sueño! Hasta la luna bosteza esta noche.', 'Creo que ya es hora de subir a mi cuarto... ¿o aún no? ¡Aaah!'], ['Siento los párpados pesados como cortinas de terciopelo. ¡Me caigo de sueño!', 'Mi cama del alero me llama. ¡Ahí me esperan mis sueños más hermosos!']];
