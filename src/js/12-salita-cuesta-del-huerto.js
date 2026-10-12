/* ---------- the parlour at Orchard Slope (Diana's house): a fire, a sofa, tea and raspberry cordial ---------- */
const FIRE = lugar('salita', 'chimenea'), SOFA = lugar('salita', 'sofa'), TEA = lugar('salita', 'te');   // (src/mapas/salita.tmj)
function drawParlour(c, t, night){
  c.fillStyle = '#b7875a'; c.fillRect(0, 0, KIT.w, KIT.h);
  c.strokeStyle = 'rgba(100,60,35,.35)'; c.lineWidth = 1; for (let y = 2.4 * T; y < KIT.h; y += 14) { c.beginPath(); c.moveTo(0, y); c.lineTo(KIT.w, y); c.stroke(); for (let x = (y / 14 % 2) * 40 + 20; x < KIT.w; x += 80) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 14); c.stroke(); } }
  // striped wallpaper with little roses, a picture, a window with lace curtains (snow outside in winter)
  blob(c, [[0, 0], [KIT.w, 0], [KIT.w, 2.4 * T], [0, 2.4 * T]], '#f3e0df');
  for (let x = 6; x < KIT.w; x += 16) { c.fillStyle = 'rgba(200,130,140,.25)'; c.fillRect(x, 2, 5, 2.4 * T - 4); if ((x / 16 | 0) % 2) for (let y = 12; y < 2.4 * T; y += 22) ell(c, x + 2.5, y, 1.6, 1.6, 'rgba(210,90,110,.5)'); }
  c.fillStyle = '#7a5536'; c.fillRect(0, 2.4 * T - 6, KIT.w, 6);
  const wx = 5.8 * T;
  blob(c, [[wx - 30, 12], [wx + 30, 12], [wx + 30, 54], [wx - 30, 54]], night > .3 ? '#34416a' : S === 3 ? '#e4eef4' : '#bfe0ea');
  if (S === 3) for (let k = 0; k < 9; k++) ell(c, wx - 24 + ((k * 23 + t * 6) % 48), 14 + ((k * 17 + t * 9) % 38), 1.2, 1.2, '#fff');
  c.strokeStyle = '#7a5536'; c.lineWidth = 3; c.beginPath(); c.moveTo(wx, 12); c.lineTo(wx, 54); c.moveTo(wx - 30, 33); c.lineTo(wx + 30, 33); c.stroke();
  for (const sd of [-1, 1]) blob(c, [[wx + sd * 34, 8], [wx + sd * 20, 8], [wx + sd * 26, 36], [wx + sd * 36, 58]], 'rgba(255,252,245,.9)');
  blob(c, [[1.6 * T - 18, 16], [1.6 * T + 18, 16], [1.6 * T + 18, 48], [1.6 * T - 18, 48]], '#c9a04a'); blob(c, [[1.6 * T - 13, 21], [1.6 * T + 13, 21], [1.6 * T + 13, 43], [1.6 * T - 13, 43]], '#9fb8a0');
  ell(c, 1.6 * T, 30, 5, 6, '#e8cdb2', true);
  // a rag rug
  ell(c, 6.6 * T, 6.4 * T, 92, 36, '#7a5a8a', true); ell(c, 6.6 * T, 6.4 * T, 72, 26, '#d9a441'); ell(c, 6.6 * T, 6.4 * T, 46, 15, '#efe0c8');
  // the fireplace: bricks, a mantel with a clock and candlesticks, and the fire
  const fx = FIRE.x, fy = FIRE.y;
  blob(c, [[fx - 44, fy], [fx + 44, fy], [fx + 44, fy - 70], [fx - 44, fy - 70]], '#a8553e');
  c.strokeStyle = 'rgba(80,30,20,.35)'; c.lineWidth = 1; for (let y = fy - 64; y < fy; y += 8) { c.beginPath(); c.moveTo(fx - 43, y); c.lineTo(fx + 43, y); c.stroke(); }
  blob(c, [[fx - 52, fy - 70], [fx + 52, fy - 70], [fx + 52, fy - 78], [fx - 52, fy - 78]], '#7a5536');
  blob(c, [[fx - 24, fy], [fx - 24, fy - 34], [fx, fy - 44], [fx + 24, fy - 34], [fx + 24, fy]], '#2a2224');
  for (let k = 0; k < 5; k++) { const q = Math.sin(t * 7 + k * 2.1); ell(c, fx - 12 + k * 6, fy - 10 - Math.abs(q) * 5, 5, 9 + q * 3, k % 2 ? 'rgba(255,190,70,.95)' : 'rgba(240,110,50,.95)'); }
  ell(c, fx, fy - 4, 18, 3, '#5b3a28', true);
  blob(c, [[fx - 8, fy - 78], [fx + 8, fy - 78], [fx + 8, fy - 96], [fx - 8, fy - 96]], '#8a6040'); ell(c, fx, fy - 88, 5, 5, '#fffaf0', true);
  for (const sx of [-36, 36]) { c.fillStyle = '#d9a441'; c.fillRect(fx + sx - 1.5, fy - 92, 3, 14); ell(c, fx + sx, fy - 95 - Math.abs(Math.sin(t * 5 + sx)), 1.6, 3, '#ffd27a'); }
  // the door out
  blob(c, [[KDOOR.x - 18, KIT.h], [KDOOR.x - 18, KIT.h - 6], [KDOOR.x + 18, KIT.h - 6], [KDOOR.x + 18, KIT.h]], '#7a4f32');
}
function drawSofa(c){
  const x = SOFA.x, y = SOFA.y, V = '#7f9e6e', VD = '#5f7e52';
  ell(c, x, y + 4, 62, 8, 'rgba(40,25,15,.22)');
  blob(c, [[x - 56, y - 22], [x + 56, y - 22], [x + 52, y - 50], [x - 52, y - 50]], V);
  for (const k of [-1, 0, 1]) ell(c, x + k * 32, y - 38, 6, 6, VD);
  blob(c, [[x - 54, y - 2], [x + 54, y - 2], [x + 54, y - 22], [x - 54, y - 22]], VD);
  blob(c, [[x - 50, y - 18], [x + 50, y - 18], [x + 48, y - 28], [x - 48, y - 28]], V);
  for (const sd of [-1, 1]) blob(c, [[x + sd * 50, y], [x + sd * 62, y], [x + sd * 62, y - 34], [x + sd * 50, y - 34]], V);
  c.fillStyle = '#5b3a28'; c.fillRect(x - 58, y, 4, 4); c.fillRect(x + 54, y, 4, 4);
  ell(c, x - 30, y - 30, 9, 6, '#f2c94c', true);
}
function drawTea(c){
  const x = TEA.x, y = TEA.y;
  ell(c, x, y + 2, 34, 7, 'rgba(40,25,15,.22)');
  c.fillStyle = '#6a4a30'; c.fillRect(x - 2, y - 24, 4, 24); c.fillRect(x - 14, y - 2, 28, 3);
  ell(c, x, y - 26, 32, 12, '#8a6040', true); ell(c, x, y - 28, 30, 10.5, '#fffaf0', true);
  // teapot, two cups, and the bottle of raspberry cordial
  ell(c, x - 12, y - 32, 7, 6, '#9db3bf', true); line(c, [[x - 19, y - 33], [x - 24, y - 37]], 'rgba(70,90,100,.9)', 1.6);
  ell(c, x + 4, y - 27, 4, 2.4, '#fff', true); ell(c, x + 14, y - 30, 4, 2.4, '#fff', true);
  blob(c, [[x + 20, y - 30], [x + 25, y - 30], [x + 25, y - 42], [x + 23.5, y - 46], [x + 21.5, y - 46], [x + 20, y - 42]], '#c83a4a');
  c.fillStyle = '#fffaf0'; c.fillRect(x + 20.5, y - 38, 4, 4);
}
