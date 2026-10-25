// Ana visita a quienes todavía no conoce (el día 2 solo saben de ella los Cuthbert, la Sra. Spencer y la Sra. Rachel;
// el día 4, también los Barry, los Pye y la Sra. Blewett, por los chismes): cada persona de Avonlea (los vecinos, la gente del pueblo), en dos momentos
// (el día 2, antes de White Sands; y el día 4, ya quedándose, antes de la escuela, la Sra. Lynde y Diana). Junta todo
// lo que le dicen al verla y al tocarlos, para leer si alguien habla como si la conociera. Salida: trazas/partida5/.
// Uso: NODE_PATH=… node tools/desconocidos.js
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..'), OUT = path.join(RAIZ, 'trazas', 'partida5'), URL = 'file://' + path.join(RAIZ, 'index.html') + '?dev';
const EXE = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
const MOMENTOS = [
  { id: 'dia2', titulo: 'Día 2, a media mañana (antes de White Sands)', hechos: { inicio_juego: 1, llegada_tv: 1, primera_noche: 1, desayuno_prueba: 2 }, dichas: ['inicio_llegada', 'cama_1', 'desayuno_prueba', 'lynde_se_entera'], dia: 1, hora: 10.5 },
  { id: 'dia4', titulo: 'Día 4 (ya se queda; antes de la escuela, la Sra. Lynde y Diana)', hechos: { inicio_juego: 1, llegada_tv: 1, primera_noche: 1, desayuno_prueba: 2, a_prueba: 2, se_queda: 3 }, dichas: ['inicio_llegada', 'cama_1', 'desayuno_prueba', 'lynde_se_entera', 'viaje_spencer', 'se_queda'], dia: 3, hora: 11, saben: ['barry', 'srbarry', 'minnie', 'pye', 'josie', 'gertie', 'blewett'] },
];
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] }); const res = {};
  for (const M of MOMENTOS) {
    const pg = await (await b.newContext({ viewport: { width: 900, height: 640 } })).newPage(); const errs = [];
    pg.on('pageerror', e => errs.push(e.message));
    await pg.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
    await pg.goto(URL); await pg.waitForTimeout(1200);
    const ev = (s, a) => pg.evaluate(([s, a]) => { const v = window.__avonlea.ev(s); return typeof v === 'function' ? v(a) : v; }, [s, a]);
    await ev(`(M => { const H = dlgHechos(); Object.assign(H, M.hechos); for (const d of M.dichas) dlgDichas()[d] = true; for (const k of ['marilla', 'matthew', 'spencer', 'lynde', ...(M.saben || [])]) wmKnow(k, 'nina_cuthbert'); for (const t of [...TALKS]) { t.interrupted = true; talkEnd(t); } bubbles = []; dayT = M.dia + (M.hora - 6) / 24; game.wm.camison = false; game.wm.sinSombrero = false; for (let k = 0; k < 120; k++) update(1 / 60); })`, M);
    const quienes = await ev(`(() => [...Object.keys(PEOPLE).filter(k => !['marilla', 'matthew'].includes(k)).map(k => ({ k, n: NAMES[k] })), ...FOLK.map(f => ({ k: 'f:' + f.id, n: f.def.name }))])()`);
    res[M.id] = { titulo: M.titulo, gente: [] };
    let n = 0;
    for (const { k, n: nombre } of quienes) {
      // Ana, al lado: en su pieza, o afuera junto a ella
      const ok = await ev(`(k => { close(); for (const t of [...TALKS]) { t.interrupted = true; talkEnd(t); } bubbles = []; amb.cur && ambEnd(); for (const p of Object.keys(PEOPLE)) amb.mute[p] = 0; amb.cool = 0; amb.seen = {};
        const f = k.startsWith('f:') ? FOLKBY[k.slice(2)] : null, b = f || PEOPLE[k], sc = f ? (f.where === 'in' ? null : f.where) : sceneOf(k);
        if (!b || !sc || sc === 'away' || sc === 'camino') return false;
        if (sc === 'out') { if (game.scene !== 'out') { let g = 0; while (game.scene !== 'out' && g++ < 4) goOut(); } ana.x = b.x + 34; ana.y = b.y + 6; } else goIn(sc, [b.x + 34, b.y + 6]);
        ana.goto = null; ana.nav = null; cam.x = ana.x; cam.y = ana.y; return true; })`, k);
      if (!ok) { res[M.id].gente.push({ k, nombre, fuera: true }); continue; }
      // lo que dicen al verla (unos segundos de juego)
      const dichos = new Set();
      for (let i = 0; i < 24; i++) { await ev(`(() => { for (let j = 0; j < 30; j++) update(1 / 60); })()`); for (const x of await ev(`bubbles.filter(b => b.q !== 'ana').map(b => (NAMES[b.q] || FOLKBY[b.q.slice(2)]?.def.name || b.q) + ': ' + b.text)`)) dichos.add(x); }
      // y al tocarla
      const toque = await ev(`(k => { const t = targets().find(t => t.id === (k.startsWith('f:') ? k : 'p:' + k)); if (!t) return null; t.act(); for (let j = 0; j < 60; j++) update(1 / 60); const box = document.getElementById('talk'); return { caja: box.hidden ? '' : box.innerText.replace(/\\n+/g, ' · '), globos: bubbles.filter(b => b.q !== 'ana').map(b => b.text) }; })`, k);
      if (toque) for (const g of toque.globos) dichos.add(nombre + ': ' + g);
      const foto = M.id + '-' + String(++n).padStart(2, '0') + '-' + k.replace(':', '_') + '.png';
      if (toque?.caja || dichos.size) await pg.screenshot({ path: path.join(OUT, foto) });
      res[M.id].gente.push({ k, nombre, dichos: [...dichos], caja: toque?.caja || '', foto: toque?.caja || dichos.size ? foto : null });
      await ev(`close()`);
    }
    res[M.id].errores = errs;
    await pg.context().close();
  }
  fs.writeFileSync(path.join(OUT, 'desconocidos.json'), JSON.stringify(res, null, 1));
  for (const [m, r] of Object.entries(res)) { console.log('\n## ' + r.titulo); for (const g of r.gente) { if (g.fuera) { console.log('- ' + g.nombre + ': (no está a la vista)'); continue; } console.log('- ' + g.nombre + (g.caja ? '\n    caja: ' + g.caja.slice(0, 260) : '') + (g.dichos.length ? '\n    dice: ' + g.dichos.join(' | ').slice(0, 400) : '')); } if (r.errores.length) console.log('ERRORES: ' + r.errores.join(' | ')); }
  await b.close();
})();
