// draws a traced sheet where the figures were in the original, to compare: node tools/compare.js ana out.png
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const V = JSON.parse(require('fs').readFileSync(`sprites/vec/${process.argv[2]}.json`));
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
  const pg = await b.newPage();
  const url = await pg.evaluate(V => {
    const cv = document.createElement('canvas'); cv.width = V.src.w; cv.height = V.src.h; const c = cv.getContext('2d'); c.fillStyle = '#fff'; c.fillRect(0, 0, cv.width, cv.height);
    for (const [row, v, x, y, k] of V.src.figs) { c.save(); c.translate(x, y); c.scale(1 / (k * 10), 1 / (k * 10)); c.lineJoin = 'round'; c.lineWidth = V.sw; for (const ly of V[row][v]) { const P = new Path2D(ly.d); c.fillStyle = c.strokeStyle = ly.c < 0 ? V.line : V.pal[ly.c]; c.fill(P, 'evenodd'); if (ly.c >= 0) c.stroke(P); } c.restore(); }
    return cv.toDataURL('image/png');
  }, V);
  require('fs').writeFileSync(process.argv[3], Buffer.from(url.split(',')[1], 'base64')); await b.close();
})();
