#!/usr/bin/env node
// Bakes the game's own drawings into images for the Phaser trial (phaser/): the kitchen of Green Gables (the room, and
// each piece of furniture on its own so Ana can walk behind it), Ana as a sprite sheet (8 directions: standing, 8 steps
// of walking, bending down) and the plates. Nothing is drawn by hand: it is the same code that draws the game.
//   node tools/hojas_phaser.js      → phaser/hojas/*.png and phaser/hojas/hojas.json
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..'), out = path.join(root, 'phaser', 'hojas');
const R = 3, FW = 64, FH = 80, FX = 32, FY = 72;   // (R: pixels per unit; a frame of FW×FH units, the feet at FX, FY)

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
  const pg = await b.newPage(); const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.addInitScript(() => { localStorage.clear(); localStorage.setItem('avonlea-ai-asked', '1'); });
  // the game lives inside one closure: a temporary copy opens a door into it (window.__dentro runs code in there)
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8'), fin = '\n})();\n</script>';
  if (!html.includes(fin)) throw new Error('index.html: no encuentro el final del código');
  const tmp = path.join(root, '.hojas_tmp.html'); fs.writeFileSync(tmp, html.replace(fin, '\nwindow.__dentro = s => eval(s);' + fin));
  try { await pg.goto('file://' + tmp); await pg.waitForFunction(() => window.__dentro); } finally { fs.unlinkSync(tmp); }
  const bake = ({ R, FW, FH, FX, FY }) => {
    const png = cv => cv.toDataURL('image/png'), mk = (w, h) => { const cv = document.createElement('canvas'); cv.width = w * R; cv.height = h * R; const c = cv.getContext('2d'); c.scale(R, R); return [cv, c]; };
    game.mesa = { dia: today(), sucia: false }; game.table = null; game.inv.tarta = game.inv.compota = 0;   // (a clean, empty table)
    const img = {};
    // the room: floor, walls, stove, stairs; then each piece of furniture alone, the size of the room, sorted by its y
    { const [cv, c] = mk(KIT.w, KIT.h); drawKitchen(c, 0, 0); drawStairsUp(c); img.cocina = png(cv); }
    const pieces = { mesa: [TABLE.y, c => drawTable(c)], aparador: [KX.aparador.y, c => drawAparador(c)], fregadero: [KX.fregadero.y, c => drawFregadero(c)], silla: [KX.silla.y - 2, c => drawSilla(c, KX.silla.x, KX.silla.y)] };
    const orden = {};
    for (const [k, [y, f]] of Object.entries(pieces)) { const [cv, c] = mk(KIT.w, KIT.h); f(c); img[k] = png(cv); orden[k] = y; }
    // Ana: a row per direction (0 up, 2 right, 4 down, 6 left; the odd ones, diagonals); columns: standing, 8 steps, bending down
    const COLS = 10, [sh, c] = mk(FW * COLS, FH * 8);
    for (let q = 0; q < 8; q++) for (let col = 0; col < COLS; col++) {
      const p = mkPerson('ana', FX + col * FW, FY + q * FH), a = (q - 2) * Math.PI / 4;
      p.dir = [0, 1, 1, 1, 2, 3, 3, 3][q]; p.braidBack = true;
      if (col >= 1 && col <= 8) { p.moving = true; p.walk = (col - 1) / 8; p._fx = p.x - Math.cos(a); p._fy = p.y - Math.sin(a); p.dir8 = q; }
      else { p.moving = false; p._fx = p.x; p._fy = p.y; p._fd = p.dir; p.dir8 = q; p.crouch = col === 9; }
      c.save(); c.beginPath(); c.rect(col * FW, q * FH, FW, FH); c.clip(); drawPerson(c, p, 0); c.restore();
    }
    img.ana = png(sh);
    // the plates: a pile in her arms, and one place laid (plate and fork)
    { const [cv, c] = mk(20, 12); for (let k = 0; k < 4; k++) ell(c, 10, 9 - k * 1.8, 7, 2.4, '#f6f8fa', true); img.pila = png(cv); }
    { const [cv, c] = mk(24, 10); ell(c, 9, 5, 7, 3, '#ffffff', true); line(c, [[18, 3], [18, 7]], '#a8a8b0', 1, 0); img.plato = png(cv); }
    return { img, meta: { R, frame: { w: FW, h: FH, x: FX, y: FY, cols: COLS }, sala: { w: KIT.w, h: KIT.h, piso: 2.4 * T }, orden } };
  };
  const res = await pg.evaluate(s => { try { return window.__dentro(s); } catch (e) { return { error: e.stack }; } }, `(${bake})(${JSON.stringify({ R, FW, FH, FX, FY })})`); if (!res || res.error) throw new Error(res ? res.error : errs.join(' | '));
  for (const [k, d] of Object.entries(res.img)) fs.writeFileSync(path.join(out, k + '.png'), Buffer.from(d.split(',')[1], 'base64'));
  fs.writeFileSync(path.join(out, 'hojas.json'), JSON.stringify(res.meta, null, 1) + '\n');
  console.log('→ phaser/hojas:', Object.keys(res.img).join(', '), errs.length ? '· errores: ' + errs.slice(0, 3).join(' | ') : '');
  await b.close();
})();
