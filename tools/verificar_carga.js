// ¿El juego carga? Abre index.html (como lo haría una jugadora) y avisa de cualquier error al cargar o en los primeros
// segundos (un guion con una acción que no existe, una noticia mal escrita…). Lo usa tools/importar_planilla.py.
// Uso: NODE_PATH=… node tools/verificar_carga.js
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const EXE = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] }); const pg = await b.newPage(); const errs = [];
  pg.on('pageerror', e => errs.push(e.message));
  await pg.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
  await pg.goto('file://' + path.join(__dirname, '..', 'index.html') + '?dev'); await pg.waitForTimeout(2500);
  const n = await pg.evaluate(() => { try { return window.__avonlea.ev('DIALOGOS.length'); } catch (e) { return 0; } }).catch(() => 0);
  if (!n) errs.push('el juego no terminó de cargar (no hay escenas)');
  await b.close();
  if (errs.length) { console.log(errs.join('\n')); process.exit(1); }
  console.log('carga bien · ' + n + ' escenas');
})();
