/* ---------- the parsonage (the minister and Mrs. Allan): the parlour for visits, with the fire, his books and the tea table ---------- */
const CP = { fuego: lugar('parroquia', 'chimenea'), sillon: lugar('parroquia', 'sillon'), te: lugar('parroquia', 'te'), estante: lugar('parroquia', 'estante'), ventana: lugar('parroquia', 'ventana') };   // (src/mapas/parroquia.tmj)
// the two chairs at the tea table: the one who receives, and the visit (x, y, which way she faces)
const CP_SILLAS = [[CP.te.x + 44, CP.te.y + 2, 3], [CP.te.x - 44, CP.te.y + 2, 1]];
function drawParroquia(c, t, night){
  c.fillStyle = '#a97d55'; c.fillRect(0, 0, KIT.w, KIT.h);
  c.strokeStyle = 'rgba(90,55,30,.35)'; c.lineWidth = 1; for (let y = 2.4 * T; y < KIT.h; y += 14) { c.beginPath(); c.moveTo(0, y); c.lineTo(KIT.w, y); c.stroke(); for (let x = (y / 14 % 2) * 40 + 30; x < KIT.w; x += 80) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 14); c.stroke(); } }
  // soft blue paper with little white sprigs, a wainscot, the window with lace curtains
  blob(c, [[0, 0], [KIT.w, 0], [KIT.w, 2.4 * T], [0, 2.4 * T]], '#dfe6ee');
  for (let x = 10; x < KIT.w; x += 22) for (let y = 10; y < 2.4 * T - 16; y += 18) { const ox = ((y / 18 | 0) % 2) * 11; line(c, [[x + ox, y + 3], [x + ox, y - 3]], 'rgba(120,140,170,.45)', 1, x + y); ell(c, x + ox, y - 3, 1.5, 1.5, 'rgba(255,255,255,.8)'); }
  blob(c, [[0, 2.4 * T - 20], [KIT.w, 2.4 * T - 20], [KIT.w, 2.4 * T], [0, 2.4 * T]], '#8a6446'); c.fillStyle = '#6a4a30'; c.fillRect(0, 2.4 * T - 22, KIT.w, 3);
  const wx = CP.ventana.x;
  blob(c, [[wx - 30, 10], [wx + 30, 10], [wx + 30, 52], [wx - 30, 52]], night > .3 ? '#34416a' : S === 3 ? '#e4eef4' : '#bfe0ea');
  if (night <= .3) { c.save(); c.beginPath(); c.rect(wx - 30, 10, 60, 42); c.clip(); const v = S === 3 ? '#f0f4f6' : '#8fbd68'; ell(c, wx + 10, 58, 50, 16, v); blob(c, [[wx - 22, 52], [wx - 22, 30], [wx - 16, 22], [wx - 10, 30], [wx - 10, 52]], '#f4efe4'); line(c, [[wx - 16, 22], [wx - 16, 12]], '#f4efe4', 2, 1); c.restore(); }   // (the church spire, just over the way)
  if (S === 3) for (let k = 0; k < 8; k++) ell(c, wx - 26 + ((k * 23 + t * 6) % 52), 12 + ((k * 17 + t * 9) % 38), 1.2, 1.2, '#fff');
  c.strokeStyle = '#7a5536'; c.lineWidth = 3; c.beginPath(); c.moveTo(wx, 10); c.lineTo(wx, 52); c.moveTo(wx - 30, 31); c.lineTo(wx + 30, 31); c.stroke();
  for (const sd of [-1, 1]) blob(c, [[wx + sd * 34, 6], [wx + sd * 20, 6], [wx + sd * 26, 34], [wx + sd * 36, 56]], 'rgba(255,252,245,.9)');
  // a sampler on the wall («Dios es amor»), and a little clock
  const sx = 1.4 * T; blob(c, [[sx - 16, 14], [sx + 16, 14], [sx + 16, 40], [sx - 16, 40]], '#8a6040'); blob(c, [[sx - 13, 17], [sx + 13, 17], [sx + 13, 37], [sx - 13, 37]], '#f6efe0');
  for (let k = 0; k < 3; k++) line(c, [[sx - 9, 22 + k * 6], [sx + 9, 22 + k * 6]], ['#a8302a', '#5c8c63', '#a8302a'][k], 1, k);
  ell(c, 9.6 * T, 28, 9, 9, '#fffaf0', true); line(c, [[9.6 * T, 28], [9.6 * T, 22]], INK, 1.2); line(c, [[9.6 * T, 28], [9.6 * T + 5, 30]], INK, 1.2);
  // a braided rug
  ell(c, 6.6 * T, 6.6 * T, 104, 38, '#6a7f96', true); ell(c, 6.6 * T, 6.6 * T, 82, 28, '#c9a7b0'); ell(c, 6.6 * T, 6.6 * T, 56, 18, '#efe0c8'); ell(c, 6.6 * T, 6.6 * T, 30, 9, '#6a7f96');
  // the fireplace, with its fire and, on the mantel, a vase of flowers and two candlesticks
  const fx = CP.fuego.x, fy = CP.fuego.y;
  blob(c, [[fx - 42, fy], [fx + 42, fy], [fx + 42, fy - 66], [fx - 42, fy - 66]], '#efe8da');
  blob(c, [[fx - 50, fy - 66], [fx + 50, fy - 66], [fx + 50, fy - 74], [fx - 50, fy - 74]], '#7a5536');
  blob(c, [[fx - 22, fy], [fx - 22, fy - 32], [fx, fy - 42], [fx + 22, fy - 32], [fx + 22, fy]], '#2a2224');
  for (let k = 0; k < 5; k++) { const q = Math.sin(t * 7 + k * 2.1); ell(c, fx - 12 + k * 6, fy - 10 - Math.abs(q) * 5, 5, 9 + q * 3, k % 2 ? 'rgba(255,190,70,.95)' : 'rgba(240,110,50,.95)'); }
  ell(c, fx, fy - 4, 17, 3, '#5b3a28', true);
  blob(c, [[fx - 6, fy - 74], [fx + 6, fy - 74], [fx + 4, fy - 86], [fx - 4, fy - 86]], '#9db3bf'); for (const [dx, col] of [[-5, '#e8a0b0'], [0, '#fffaf0'], [5, '#f2c94c']]) ell(c, fx + dx, fy - 90 - Math.abs(dx) * .4, 3.4, 3.4, col, true);
  for (const dx of [-34, 34]) { c.fillStyle = '#d9a441'; c.fillRect(fx + dx - 1.5, fy - 88, 3, 14); ell(c, fx + dx, fy - 91 - Math.abs(Math.sin(t * 5 + dx)), 1.6, 3, '#ffd27a'); }
  blob(c, [[KDOOR.x - 18, KIT.h], [KDOOR.x - 18, KIT.h - 6], [KDOOR.x + 18, KIT.h - 6], [KDOOR.x + 18, KIT.h]], '#7a4f32');
}
// the minister's books: a tall case, full
function drawCPEstante(c){
  const x = CP.estante.x, y = CP.estante.y;
  ell(c, x, y + 3, 40, 6, 'rgba(40,25,15,.22)');
  blob(c, [[x - 36, y], [x + 36, y], [x + 36, y - 92], [x - 36, y - 92]], '#6a4a30');
  const cols = ['#8a3a2e', '#3f5a7a', '#5c6e3a', '#7a5a8a', '#a8823a', '#4a3a2a'];
  for (let r = 0; r < 4; r++) { const sy = y - 8 - r * 22; blob(c, [[x - 32, sy], [x + 32, sy], [x + 32, sy - 2], [x - 32, sy - 2]], '#4a301e'); for (let k = 0, bx = x - 30; bx < x + 28; k++) { const w = 5 + (k * 7 + r * 3) % 4, h = 14 + (k * 5 + r) % 5; c.fillStyle = cols[(k + r * 2) % cols.length]; c.fillRect(bx, sy - 2 - h, w, h); bx += w + 1; } }
}
// his armchair by the fire, with a book left open on the arm
function drawCPSillon(c){
  const x = CP.sillon.x, y = CP.sillon.y, R = '#8a3a3a', RD = '#6a2a2a';
  ell(c, x, y + 4, 30, 6, 'rgba(40,25,15,.22)');
  blob(c, [[x - 20, y - 18], [x + 20, y - 18], [x + 18, y - 52], [x - 18, y - 52]], R);
  blob(c, [[x - 22, y], [x + 22, y], [x + 22, y - 20], [x - 22, y - 20]], RD); blob(c, [[x - 18, y - 16], [x + 18, y - 16], [x + 16, y - 26], [x - 16, y - 26]], R);
  for (const sd of [-1, 1]) blob(c, [[x + sd * 18, y], [x + sd * 28, y], [x + sd * 28, y - 30], [x + sd * 18, y - 30]], R);
  c.fillStyle = '#4a301e'; c.fillRect(x - 26, y, 4, 4); c.fillRect(x + 22, y, 4, 4);
  blob(c, [[x + 18, y - 31], [x + 27, y - 33], [x + 36, y - 31], [x + 36, y - 27], [x + 27, y - 29], [x + 18, y - 27]], '#f6f0e0');
}
function drawCPSilla(c, [x, y, d]){
  const sd = d === 1 ? -1 : 1;   // (the back away from the table)
  ell(c, x, y + 3, 14, 4, 'rgba(40,25,15,.2)');
  for (const dx of [-9, 9]) line(c, [[x + dx, y - 12], [x + dx, y + 2]], '#5b3a28', 2, dx);
  blob(c, [[x - 11, y - 12], [x + 11, y - 12], [x + 11, y - 16], [x - 11, y - 16]], '#7a5536');
  blob(c, [[x + sd * 8, y - 14], [x + sd * 12, y - 14], [x + sd * 12, y - 44], [x + sd * 8, y - 44]], '#7a5536');
}
// the tea table: a lace cloth, the good teapot, two cups, a plate of little cakes and a layer cake
function drawCPTe(c){
  const x = CP.te.x, y = CP.te.y;
  ell(c, x, y + 2, 32, 7, 'rgba(40,25,15,.22)');
  c.fillStyle = '#6a4a30'; c.fillRect(x - 2, y - 24, 4, 24); c.fillRect(x - 14, y - 2, 28, 3);
  ell(c, x, y - 26, 30, 12, '#8a6040', true); ell(c, x, y - 28, 29, 10.5, '#fffaf0', true);
  for (let k = 0; k < 12; k++) { const a = k / 12 * TAU; ell(c, x + Math.cos(a) * 28, y - 27 + Math.sin(a) * 10, 2, 1.4, 'rgba(230,220,200,.9)'); }   // (the lace edge)
  ell(c, x - 2, y - 33, 7, 6, '#f6efe0', true); line(c, [[x - 9, y - 34], [x - 14, y - 38]], '#c9a7b0', 1.6); ell(c, x - 2, y - 39, 2, 1.4, '#c9a7b0', true);
  ell(c, x - 18, y - 27, 4, 2.4, '#fff', true); ell(c, x + 16, y - 27, 4, 2.4, '#fff', true);
  ell(c, x + 6, y - 24, 6, 2.2, '#e8dcc4', true); for (const dx of [3, 6, 9]) ell(c, x + dx, y - 25.5, 1.8, 1.2, '#c8904a', true);
  blob(c, [[x + 10, y - 31], [x + 22, y - 31], [x + 22, y - 37], [x + 10, y - 37]], '#f3d6a0'); line(c, [[x + 10, y - 34], [x + 22, y - 34]], '#a8302a', 1.2, 1);
}
HOUSES.cp.interior = {
  draw: drawParroquia, dentro: [CP.te.x + 70, CP.te.y + 30],   // (dentro: where those of the house keep to, away from the door)
  items: g => [{ y: CP.estante.y, draw: () => drawCPEstante(g) }, { y: CP.sillon.y, draw: () => drawCPSillon(g) }, ...CP_SILLAS.map(s => ({ y: s[1] - 1, draw: () => drawCPSilla(g, s) })), { y: CP.te.y, draw: () => drawCPTe(g) }],
  blocked: (x, y) => (Math.abs(x - CP.fuego.x) < 46 && y < CP.fuego.y + 6) || (Math.abs(x - CP.estante.x) < 40 && y < CP.estante.y + 4) || dist(x, y, CP.sillon.x, CP.sillon.y - 8) < 22 || ((x - CP.te.x) / 34) ** 2 + ((y - CP.te.y + 4) / 12) ** 2 < 1,
  glow: t => [CP.fuego.x, CP.fuego.y - 20, 190, '255,170,90', .45 + .05 * Math.sin(t * 7)], place: 'en la salita de la casa parroquial, junto a la chimenea y la mesita del té',
  actions: add => {
    add('fire', CP.fuego.x, CP.fuego.y + 10, 50, 'Calentarse junto al fuego', warmUp, { pri: 6, hy: 40, hit: 50 });
    add('libros', CP.estante.x, CP.estante.y, 46, 'Mirar los libros del pastor', () => anaSays(dicho('libros_pastor')), { pri: 4, hy: 50, hit: 46 });
    const [sx, sy, sd] = CP_SILLAS[1];
    add('te', CP.te.x, CP.te.y, 50, ana.sit ? 'Levantarse' : 'Sentarse a la mesita del té', () => { if (ana.sit) { ana.sit = false; return; } ana.x = sx; ana.y = sy; ana.dir = sd; ana.sit = true; ana.moving = false; ana.goto = null; }, { pri: 8, hy: 26, hit: 38 });
  },
};
