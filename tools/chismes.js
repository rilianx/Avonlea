// Un chisme de boca en boca (src/datos/noticias.txt): la Sra. Lynde ve a Ana en camisón; unas horas después Marilla
// lo sabe, agrandado, y sabe quién se lo contó; la Sra. Pye y Josie Pye lo agrandan más; un día de chismes lejos de
// Ana, y cuántos lo saben y en qué versión; las noticias viejas ya no se cuentan; las que trae la historia (la
// maestra nueva) se saben cuando pasa. Salida: trazas/partida5/chismes.json.
// Uso: NODE_PATH=… node tools/chismes.js
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..'), OUT = path.join(RAIZ, 'trazas', 'partida5'), URL = 'file://' + path.join(RAIZ, 'index.html') + '?dev';
const EXE = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] }); const pg = await (await b.newContext({ viewport: { width: 900, height: 640 } })).newPage(); const errs = [];
  pg.on('pageerror', e => errs.push(e.message));
  await pg.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
  await pg.goto(URL); await pg.waitForTimeout(1200);
  const ev = (s, a) => pg.evaluate(([s, a]) => { const v = window.__avonlea.ev(s); return typeof v === 'function' ? v(a) : v; }, [s, a]);
  const malos = [], R = {}; const ok = (c, m) => { if (!c) malos.push(m); };
  const pasar = `(h => { for (let i = 0; i < h * 150; i++) { dayT += 2 / (MIN_S * 60 * 24); noticiasT = 0; noticiasTick(2); } })`;   // (the time goes on for the news only: a tick of theirs every two seconds of the game)
  await ev(`(() => { Object.assign(dlgHechos(), { inicio_juego: 1, llegada_tv: 1, primera_noche: 1, desayuno_prueba: 2, a_prueba: 2, se_queda: 3 }); for (const x of DIALOGOS) dlgDichas()[x.id] = true; dayT = 3 + 2 / 24; })()`);
  // 1. la Sra. Lynde la ve en camisón (la escena camison_lynde: «contar lynde ana_en_camison»)
  await ev(`enterarse('lynde', 'ana_en_camison')`);
  R.lynde = await ev(`creencia('lynde', 'ana_en_camison')`);
  await ev(pasar, 3.2);
  R.marilla = await ev(`creencia('marilla', 'ana_en_camison')`);
  R.marilla_quien = await ev(`quienConto('marilla', 'ana_en_camison')`);
  R.condiciones = await ev(`['sabe:marilla:ana_en_camison', 'sabe:marilla:ana_en_camison:2', 'sabe:marilla:ana_en_camison:3', 'sabe:marilla:ana_en_camison:lynde', 'sabe:marilla:ana_en_camison:barry'].map(c => c + ' → ' + dlgCond(c, dlgCtx()))`);
  R.escenas = await ev(`(() => { for (const id of ['marilla_sabe_camison', 'marilla_sabe_camison_descalza', 'marilla_sabe_camison_cementerio']) delete dlgDichas()[id]; return ['marilla_sabe_camison', 'marilla_sabe_camison_descalza', 'marilla_sabe_camison_cementerio'].map(id => { const d = DIALOGOS.find(x => x.id === id); return id + ': ' + (d.porque(dlgCtx()) || 'puede decirse') + (d.porque(dlgCtx()) ? '' : ' → «' + d.lineas().find(l => l[0] === 'marilla')[1] + '»'); }); })()`);
  ok(R.lynde?.v === 1 && !R.lynde.de, 'la Sra. Lynde lo vio: versión 1, sin que nadie se lo contara');
  ok(R.marilla?.v === 2 && R.marilla.de === 'lynde', 'a Marilla le llega agrandado, de la Sra. Lynde: ' + JSON.stringify(R.marilla));
  ok(R.marilla_quien === 'la Sra. Lynde', 'quien se lo contó a Marilla: ' + R.marilla_quien);
  ok(/descalza: puede decirse/.test(R.escenas.join('\n')) && !/camison: puede/.test(R.escenas[0]), 'la escena de Marilla es la de la versión agrandada');
  // 2. de boca en boca: Lynde → Sra. Pye → Josie → Sra. Barry (los Pye también exageran)
  R.cadena = [];
  for (const [a, c] of [['lynde', 'srapye'], ['srapye', 'josie'], ['josie', 'barry'], ['barry', 'ruby']]) {
    const r = await ev(`(([a, c]) => { for (let i = 0; i < 20; i++) { const ch = chisme(a, c); if (ch && ch.f === 'ana_en_camison') return { dice: ch[0][1], responde: ch[1][1], v: creencia(c, 'ana_en_camison').v }; } return null; })`, [a, c]);
    R.cadena.push({ de: a, a: c, ...r });
  }
  ok(R.cadena.map(x => x.v).join() === '2,3,3,3', 'las versiones de boca en boca: ' + R.cadena.map(x => x.v).join());
  // 3. un día de chismes lejos de Ana: cuántos lo saben, y en qué versión
  await ev(`(() => { game.wm.chismes = []; })()`);
  await ev(pasar, 12);
  R.lejos = await ev(`(() => { const v = {}; for (const k of Object.keys(game.wm.creencias)) { const c = creencia(k, 'ana_en_camison'); if (c) v[c.v] = (v[c.v] || 0) + 1; } return { versiones: v, chismes: game.wm.chismes.length, ejemplos: game.wm.chismes.slice(-6).map(c => c.de + ' → ' + c.a + ' (' + c.f + ', v' + c.v + '): ' + c.dice) }; })()`);
  ok(R.lejos.chismes > 0, 'lejos de Ana también se conversa');
  // 4. lo viejo ya no se cuenta: el huérfano (ya llegó una niña), y el camisón pasados 10 días
  R.viejo = await ev(`(() => { const c = (a, f) => { for (let i = 0; i < 30; i++) { const ch = chisme(a, 'medico'); if (ch?.f === f) return true; } return false; }; delete (game.wm.know.medico = []); const huer = c('lynde', 'huerfano'); dayT += 11; const cam = c('lynde', 'ana_en_camison'); return { huerfano: huer, camison_11_dias: cam }; })()`);
  ok(!R.viejo.huerfano && !R.viejo.camison_11_dias, 'las noticias viejas ya no se cuentan: ' + JSON.stringify(R.viejo));
  // 5. lo que trae la historia: la maestra nueva se sabe cuando llega; el rastrillo, en invierno
  R.historia = await ev(`(() => { dlgHecho('llego_stacy'); noticiasT = 0; noticiasTick(1); const a = sabeK('lynde', 'maestra_plumas'); return { maestra_plumas: a }; })()`);
  ok(R.historia.maestra_plumas, 'la Sra. Lynde sabe de la maestra nueva cuando llega');
  R.errores = errs; if (errs.length) malos.push(...errs.map(e => 'error: ' + e));
  fs.mkdirSync(OUT, { recursive: true }); fs.writeFileSync(path.join(OUT, 'chismes.json'), JSON.stringify({ ...R, malos }, null, 1));
  console.log(JSON.stringify(R, null, 1)); console.log(malos.length ? '\n' + malos.join('\n') : '\ntodo bien');
  await b.close(); process.exitCode = malos.length ? 1 : 0;
})();
