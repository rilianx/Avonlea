#!/usr/bin/env node
/* Runs one of the test goals (🎯 panel) in the game, headless, and draws how it was done on the map of Avonlea:
   each one's way (in their colour; someone indoors is shown at the door of the house), where they started, where they
   ended, the cows they led, and numbered marks for what happened (each request with what the one asked was doing at
   that moment, what was given, bought, cooked...), listed with their time on the right.

     node tools/trace_goal.js <test number | words of its name> [--out traza.png] [--max 900] [--w 1500]
     node tools/trace_goal.js --pdf trazas/metas.pdf [numbers or words, comma separated; all if none]
     node tools/trace_goal.js dia [--season 0..3] [--domingo] --out dia.png   (a whole day, 6:00 to 22:00: everyone's routine of goals)

   With --pdf: each goal run on a fresh page, one page of the PDF each, and a first page with all the results.

   Needs Playwright (and a Chromium: PLAYWRIGHT_CHROMIUM or /opt/pw-browsers/chromium). */
const path = require('path'), fs = require('fs');
let pw; try { pw = require('playwright'); } catch (e) { pw = require('/opt/node22/lib/node_modules/playwright'); }
const argv = process.argv.slice(2), opt = (k, d) => { const i = argv.indexOf('--' + k); return i >= 0 ? argv.splice(i, 2)[1] : d; };
const season = opt('season', null), sunday = argv.includes('--domingo') ? (argv.splice(argv.indexOf('--domingo'), 1), true) : false;
const out = opt('out', 'traza.png'), pdf = opt('pdf', null), maxT = +opt('max', 2400), W = +opt('w', 1500), which = argv.join(' ');
const exe = process.env.PLAYWRIGHT_CHROMIUM || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);

(async () => {
  const b = await pw.chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const pg = await b.newPage({ viewport: { width: 900, height: 640 } }); const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.addInitScript(() => { localStorage.clear(); localStorage.setItem('avonlea-ai-asked', '1'); });
  const load = async () => { await pg.goto('file://' + path.resolve(__dirname, '..', 'index.html')); await pg.waitForFunction(() => window.__avonlea); };
  await load();
  const trace = which => pg.evaluate(async ([which, maxT, W, season, sunday]) => {
    const A = window.__avonlea, tests = A.WM_TESTS;
    const dia = which === 'dia', i = dia ? 'día' : /^\d+$/.test(which) ? +which : tests.findIndex(T => T.text.toLowerCase().includes(which.toLowerCase()));
    if (!dia && !(i >= 0 && tests[i])) return { err: 'no hay una meta de prueba así: ' + which + '\n' + tests.map((T, j) => j + ' ' + T.text).join('\n') };
    const SEAS = ['primavera', 'verano', 'otoño', 'invierno'], T = dia ? { text: 'Un día en Avonlea: la rutina de metas de cada uno (' + SEAS[season ?? A.season()] + (sunday ? ', domingo' : '') + ')', who: 'ana' } : tests[i], hhmm = h => { const m = Math.round(h * 60); return String(Math.floor(m / 60) % 24).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };
    // where someone is on the map (indoors: at the door of the house)
    const onMap = k => {
      const bd = A.wmBody(k), sc = A.wmScene(k); if (!bd || !sc || sc === 'away' || sc === 'in') return null;
      if (sc === 'out') return [bd.x, bd.y];
      const H = A.HOUSES[A.ROOMS[sc]?.parent ?? sc]; return H ? [H.at.x, H.at.y + 30] : null;
    };
    const keys = ['ana', ...Object.keys(A.PEOPLE), ...A.FOLK.map(f => f.id)];
    if (dia) { if (sunday) A.setDay(6); A.startDay(); if (season != null) A.setSeason(+season); }
    const ag = dia ? { get st() { return A.hourNow() < 22 ? 'run' : 'done'; }, why: '' } : A.wmRunTest(i), tr = {}, cows = {}, evs = [], seenJ = A.game.journal.length, goalsN = {}, doing = {};
    let jn = A.game.journal.length;
    const sample = t => {
      if (!dia || t % 2 === 0) for (const k of keys) { const p = onMap(k); if (!p) continue; (tr[k] = tr[k] || []).push([p[0], p[1], t]); }
      for (const [c, o] of Object.entries(A.ANIM)) if (o.kind === 'cow' && o.where !== 'in') (cows[c] = cows[c] || []).push([o.x, o.y, t, o.state === 'led' ? o.ledBy || 'ana' : null]);
      // a new goal for someone (asked, or the test's): where they were and what they were doing then
      for (const [k, g] of Object.entries(A.AGENTS)) {
        const n = (g.goals || []).length;
        if (n > (goalsN[k] || 0)) for (const G of g.goals.slice(goalsN[k] || 0)) evs.push({ k, h: A.hourNow(), t, p: onMap(k), kind: 'meta', text: wmN(k) + ': ' + G.label, was: doing[k] || 'en lo suyo' });
        goalsN[k] = n;
      }
      for (const k of keys) if (A.AGENTS[k] || doing[k] != null) doing[k] = A.doingText(k);
      // what happened (the journal), at the place of whoever did it
      const J = A.game.journal; for (; jn < J.length; jn++) { const e = J[jn], who = keys.filter(k => e.t.startsWith(wmN(k) + ' ')).sort((a, b) => wmN(b).length - wmN(a).length)[0]; evs.push({ k: who, h: e.h, t, p: who ? onMap(who) : null, kind: 'hecho', text: e.t.replace(/\.$/, '') }); }
    };
    const wmN = k => A.wmName(k);
    for (const k of keys) doing[k] = A.AGENTS[k] ? A.doingText(k) : null;
    const h0 = A.hourNow(); let t = 0; sample(0);
    for (const lim = dia ? Math.max(maxT, 9000) : maxT; t < lim && (ag.st === 'run' || ag.st === 'pausa'); t += .5) { A.step(.5); sample(t + .5); }
    for (let k = 0; k < 4; k++) { A.step(.5); sample(t += .5); }
    // who to draw: those who had goals, were named in what happened, or led a cow; and the cows that moved
    const moved = P => P.length > 1 && P.some(q => Math.hypot(q[0] - P[0][0], q[1] - P[0][1]) > 60);
    const marks = evs.filter(e => e.p && (e.kind === 'meta' || !/volvió a su casa|entró a|salió de|conversaron|se detuvo|un rato/.test(e.text)));
    if (dia) marks.splice(0, marks.length, ...marks.filter(e => e.kind === 'meta' || /logró|no pudo/.test(e.text)));   // (a whole day: only when each goal starts and how it ends)
    const who = keys.filter(k => tr[k] && (A.AGENTS[k] || k === 'ana' || marks.some(e => e.k === k || e.text.includes(' ' + wmN(k)))));
    const cowK = Object.keys(cows).filter(c => moved(cows[c]));
    // the part of the map: everything drawn, with some room around
    const pts = [...who.flatMap(k => tr[k]), ...cowK.flatMap(c => cows[c]), ...marks.map(e => e.p)];
    let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9; for (const p of pts) { if (p[0] < x0) x0 = p[0]; if (p[0] > x1) x1 = p[0]; if (p[1] < y0) y0 = p[1]; if (p[1] > y1) y1 = p[1]; }
    x0 -= 300; x1 += 420; y0 -= 300; y1 += 200;
    const minW = 1600; if (x1 - x0 < minW) { const c = (x0 + x1) / 2; x0 = c - minW / 2; x1 = c + minW / 2; }
    if ((y1 - y0) < (x1 - x0) * .62) { const c = (y0 + y1) / 2, hh = (x1 - x0) * .62; y0 = c - hh / 2; y1 = c + hh / 2; }
    if ((y1 - y0) > (x1 - x0) * .82) { const c = (x0 + x1) / 2, ww = (y1 - y0) / .82; x0 = c - ww / 2; x1 = c + ww / 2; }   // (landscape, to fill a page)
    if (x0 < 0) { x1 -= x0; x0 = 0; } if (x1 > A.WW) { x0 -= x1 - A.WW; x1 = A.WW; } if (y0 < 0) { y1 -= y0; y0 = 0; } if (y1 > A.WH) { y0 -= y1 - A.WH; y1 = A.WH; }
    x0 = Math.max(0, x0); y0 = Math.max(0, y0); x1 = Math.min(A.WW, x1); y1 = Math.min(A.WH, y1);
    const rw = x1 - x0, rh = y1 - y0, mapH = Math.round(W * rh / rw), z = A.WW / rw, base = A.paintMapBase(W, mapH, z, x0, y0), s = W / rw;
    // the legend on the right
    const LW = 660, lines = [];
    const cv = document.createElement('canvas'), c = cv.getContext('2d');
    const col = k => A.LOOKS[k]?.dress || '#888', ink = '#4a2f1c', P = ([x, y]) => [(x - x0) * s, (y - y0) * s];
    const wrap = (text, w, font) => { c.font = font; const out = []; let l = ''; for (const wd of text.split(' ')) { const tl = l ? l + ' ' + wd : wd; if (c.measureText(tl).width > w && l) { out.push(l); l = wd; } else l = tl; } if (l) out.push(l); return out; };
    const legend = [];
    const result = ag.st === 'done' ? '✔ cumplida' : ag.st === 'fail' ? '✘ no se cumplió' + (ag.why ? ' (' + ag.why + ')' : '') : '… sin terminar', span = `${hhmm(h0)} → ${hhmm(A.hourNow())}`;
    for (const k of who) legend.push({ t: wmN(k), f: 'bold 21px Georgia, serif', dot: col(k) });
    for (const c_ of cowK) legend.push({ t: (A.ANIMALS[c_]?.name || c_) + ' (vaca)', f: 'bold 21px Georgia, serif', dot: '#7a5a3a', dash: true });
    legend.push({ t: '', f: '8px serif' });
    marks.forEach((e, n) => { const head = `${n + 1}. ${hhmm(e.h)} `, body = e.kind === 'meta' ? `${e.text} — estaba: ${e.was}` : e.text; wrap(head + body, LW - 40, '20px Georgia, serif').forEach((l, j) => legend.push({ t: l, f: '20px Georgia, serif', ind: j ? 26 : 0, meta: e.kind === 'meta' })); });
    const lh = f => +f.match(/(\d+)px/)[1] * 1.35, legH = legend.reduce((a, l) => a + lh(l.f), 40);
    cv.width = W + LW; cv.height = Math.max(mapH, legH);
    c.fillStyle = '#f1e2bf'; c.fillRect(0, 0, cv.width, cv.height); c.drawImage(base.cv, 0, 0);
    c.lineJoin = c.lineCap = 'round';
    // the ways: a pale halo, then the colour; a dot every 30 s of game
    const way = (Q, colr, dash) => { if (Q.length < 2) return; for (const [lw, st] of [[9, 'rgba(255,250,235,.85)'], [4.5, colr]]) { c.setLineDash(dash ? [10, 8] : []); c.strokeStyle = st; c.lineWidth = lw; c.beginPath(); Q.forEach((q, j) => { const [x, y] = P(q); j ? c.lineTo(x, y) : c.moveTo(x, y); }); c.stroke(); } c.setLineDash([]);
      for (const q of Q.filter(q => q[2] % 30 === 0)) { const [x, y] = P(q); c.beginPath(); c.arc(x, y, 3, 0, Math.PI * 2); c.fillStyle = colr; c.fill(); } };
    for (const c_ of cowK) way(cows[c_], '#7a5a3a', true);
    for (const k of who) way(tr[k], col(k));
    const label = (text, x, y, size = 18) => { c.font = `italic ${size}px Georgia, serif`; c.textAlign = 'center'; c.lineWidth = 4; c.strokeStyle = 'rgba(241,226,191,.95)'; c.strokeText(text, x, y); c.fillStyle = ink; c.fillText(text, x, y); };
    for (const k of who) {   // start (a ring) and end (a filled square)
      const Q = tr[k], [sx, sy] = P(Q[0]), [ex, ey] = P(Q[Q.length - 1]);
      c.beginPath(); c.arc(sx, sy, 9, 0, Math.PI * 2); c.fillStyle = 'rgba(255,250,235,.9)'; c.fill(); c.lineWidth = 4; c.strokeStyle = col(k); c.stroke();
      const same = Math.hypot(ex - sx, ey - sy) < 40;
      label(wmN(k) + (same ? ' (inicio y fin)' : ' (inicio)'), sx, sy - 14);
      c.fillStyle = col(k); c.fillRect(ex - 7, ey - 7, 14, 14); c.lineWidth = 2; c.strokeStyle = ink; c.strokeRect(ex - 7, ey - 7, 14, 14);
      if (!same) label(wmN(k) + ' (fin)', ex, ey + 24);
    }
    // the numbered marks (the same place several times: side by side)
    const used = [];
    marks.forEach((e, n) => { let [x, y] = P(e.p); while (used.some(([u, v]) => Math.hypot(u - x, v - y) < 22)) x += 22; used.push([x, y]);
      c.beginPath(); c.arc(x, y, 11, 0, Math.PI * 2); c.fillStyle = e.kind === 'meta' ? '#d9433b' : '#fff8e6'; c.fill(); c.lineWidth = 2; c.strokeStyle = ink; c.stroke();
      c.font = 'bold 12px Georgia, serif'; c.textAlign = 'center'; c.fillStyle = e.kind === 'meta' ? '#fff' : ink; c.fillText(String(n + 1), x, y + 4); });
    // the legend
    c.fillStyle = 'rgba(250,242,222,.97)'; c.fillRect(W, 0, LW, cv.height); c.strokeStyle = 'rgba(90,60,35,.6)'; c.lineWidth = 2; c.beginPath(); c.moveTo(W, 0); c.lineTo(W, cv.height); c.stroke();
    let y = 34; c.textAlign = 'left';
    for (const l of legend) { c.font = l.f; c.fillStyle = l.meta ? '#a3302a' : ink; const x = W + 20 + (l.ind || 0) + (l.dot ? 30 : 0);
      if (l.dot) { c.strokeStyle = l.dot; c.lineWidth = 5; c.setLineDash(l.dash ? [8, 6] : []); c.beginPath(); c.moveTo(W + 20, y - 5); c.lineTo(W + 42, y - 5); c.stroke(); c.setLineDash([]); }
      c.fillText(l.t, x, y); y += lh(l.f); }
    c.font = 'italic 16px Georgia, serif'; c.fillStyle = 'rgba(74,47,28,.75)'; c.fillText('○ inicio · ■ fin · ● rojo: le piden algo (o recibe la meta) · puntos: cada 30 s', W + 20, cv.height - 14);
    // the title, big, in a band across the top
    const F = document.createElement('canvas'), f = F.getContext('2d'), tl = wrap(dia ? T.text : `Meta ${i}: ${T.text}`, F.width = cv.width, 'bold 38px Georgia, serif').length > 1 ? wrap(dia ? T.text : `Meta ${i}: ${T.text}`, cv.width - 60, 'bold 38px Georgia, serif') : [dia ? T.text : `Meta ${i}: ${T.text}`], TH = 40 + tl.length * 48 + 36;
    F.height = cv.height + TH; f.fillStyle = '#efe0bb'; f.fillRect(0, 0, F.width, TH); f.fillStyle = ink; f.textAlign = 'left';
    f.font = 'bold 38px Georgia, serif'; tl.forEach((l, j) => f.fillText(l, 30, 54 + j * 48));
    f.font = 'italic 24px Georgia, serif'; f.fillStyle = ag.st === 'done' ? '#3d6b2a' : ag.st === 'fail' ? '#a3302a' : '#7a5a2a'; f.fillText(`${span} (hora del juego) · ${result}`, 30, 40 + tl.length * 48 + 14);
    f.strokeStyle = 'rgba(90,60,35,.7)'; f.lineWidth = 3; f.beginPath(); f.moveTo(0, TH - 1.5); f.lineTo(F.width, TH - 1.5); f.stroke();
    f.drawImage(cv, 0, TH);
    return { png: F.toDataURL('image/png'), jpg: F.toDataURL('image/jpeg', .8), result, span, test: i, text: T.text, st: ag.st, why: ag.why, who, names: who.map(wmN), marks: marks.length };
  }, [which, maxT, W, season, sunday]);
  const say = r => console.log(`${r.test}. ${r.text}: ${r.st}${r.why ? ' (' + r.why + ')' : ''} · ${r.who.join(', ')} · ${r.marks} marcas`);
  if (!pdf) {
    const r = await trace(which); if (r.err) { console.error(r.err); process.exit(1); }
    fs.writeFileSync(out, Buffer.from(r.png.split(',')[1], 'base64')); say(r); console.log('→ ' + out);
  } else {   // all (or the ones named), each on a fresh page; then one PDF
    const n = await pg.evaluate(() => window.__avonlea.WM_TESTS.length);
    const list = which.trim() ? which.split(',').map(w => w.trim()) : Array.from({ length: n }, (_, j) => String(j)), rs = [];
    for (const w of list) { await load(); const r = await trace(w); if (r.err) { console.error(r.err.split('\n')[0]); continue; } say(r); rs.push(r); }
    const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;'), when = new Date().toLocaleString('es-CL');
    const html = `<!doctype html><meta charset="utf-8"><style>
      @page { size: 297mm 210mm; margin: 0 } body { margin: 0; font-family: Georgia, serif; color: #4a2f1c }
      .p { width: 297mm; height: 210mm; page-break-after: always; display: flex; align-items: center; justify-content: center; background: #f1e2bf; overflow: hidden }
      .p img { max-width: 100%; max-height: 100%; object-fit: contain }
      .c { display: block; height: auto; min-height: 210mm; overflow: visible; padding: 12mm 16mm; box-sizing: border-box } h1 { font-size: 26pt; margin: 0 0 2mm } .s { font-style: italic; margin-bottom: 6mm }
      table { border-collapse: collapse; width: 100%; font-size: 9.5pt } tr { page-break-inside: avoid } td, th { border-bottom: 1px solid #c9b48a; padding: 1.1mm 2mm; text-align: left; vertical-align: top }
      .ok { color: #3d6b2a } .ko { color: #a3302a } .run { color: #7a5a2a }</style>
      <div class="p c"><h1>Avonlea · cómo se cumplen las metas</h1><div class="s">${rs.length} metas de prueba · ${esc(when)} · una página por meta: recorridos, inicio (○) y fin (■), y lo que pasó con su hora</div>
      <table><tr><th>#</th><th>Meta</th><th>Horas (del juego)</th><th>Resultado</th><th>Quiénes</th></tr>
      ${rs.map(r => `<tr><td>${r.test}</td><td>${esc(r.text)}</td><td>${r.span}</td><td class="${r.st === 'done' ? 'ok' : r.st === 'fail' ? 'ko' : 'run'}">${esc(r.result)}</td><td>${esc(r.names.join(', '))}</td></tr>`).join('')}</table></div>
      ${rs.map(r => `<div class="p"><img src="${r.jpg}"></div>`).join('')}`;
    const pp = await b.newPage(); await pp.setContent(html, { waitUntil: 'load' });
    await pp.pdf({ path: pdf, width: '297mm', height: '210mm', printBackground: true }); console.log('→ ' + pdf + ' (' + Math.round(fs.statSync(pdf).size / 1024) + ' KB)');
  }
  if (errs.length) console.log('errores en la página:', errs.slice(0, 5));
  await b.close();
})();
