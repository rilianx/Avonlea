// Lo que la gente ve de Ana, lo dice (src/datos/reglas.txt, «espera: reacciona…»): el modelo (tools/modelo.py) prueba
// que hay una frase para cada caso; esta prueba, que el juego la dice, sola, sin que Ana toque a nadie (que nada la
// tape: estar ocupado, la distancia, una presentación cortada). Pone a Ana en cada situación con alguien que la ve, deja
// correr el juego y mira si esa persona reacciona en voz alta. Salida: trazas/partida8/reacciones.json.
// Uso: node tools/reacciones.js
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..'), OUT = path.join(RAIZ, 'trazas', 'partida8'), URL = 'file://' + path.join(RAIZ, 'index.html') + '?dev';
const EXE = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
// cada caso: el día (0 = el primero; el 6, domingo) y la hora, dónde está Ana, cómo anda, quién está con ella, y a qué reacciona
const CASOS = [
  { nombre: 'en camisón, en casa de la Sra. Lynde', dia: 3, hora: 10, escena: 'rl', con: 'lynde', ana: { camison: true }, clave: 'ana:camison' },
  { nombre: 'en camisón, en casa de los Barry', dia: 3, hora: 10, escena: 'os', con: 'barry', ana: { camison: true }, clave: 'ana:camison' },
  { nombre: 'de noche, en casa de los Barry', dia: 3, hora: 21.5, escena: 'os', con: 'barry', ana: {}, clave: 'hora' },
  { nombre: 'sin sombrero, en la iglesia (la Sra. Lynde)', dia: 6, hora: 10.5, escena: 'ig', con: 'lynde', ana: { sinSombrero: true }, clave: 'ana:sin_sombrero' },
  { nombre: 'sin sombrero, en misa, al lado de la Sra. Lynde (llega ella sola, a su banco)', dia: 6, hora: 9.5, escena: 'ig', con: 'lynde', ana: { sinSombrero: true }, clave: 'ana:sin_sombrero', natural: true },
  { nombre: 'sin sombrero, en la iglesia (Marilla)', dia: 6, hora: 10.5, escena: 'ig', con: 'marilla', ana: { sinSombrero: true }, clave: 'ana:sin_sombrero' },
];
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] }); const errs = [], res = [];
  for (const C of CASOS) {
    const pg = await (await b.newContext({ viewport: { width: 900, height: 640 } })).newPage();
    pg.on('pageerror', e => errs.push(C.nombre + ': ' + e.message));
    await pg.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
    await pg.goto(URL); await pg.waitForTimeout(1000);
    const ev = (s, a) => pg.evaluate(([s, a]) => { const v = window.__avonlea.ev(s); return typeof v === 'function' ? v(a) : v; }, [s, a]);
    const r = await ev(`(C => {
      Object.assign(dlgHechos(), { inicio_juego: 1, llegada_tv: 1, primera_noche: 1, desayuno_prueba: 1, a_prueba: 1, se_queda: 2, lynde_visita: 2, conoce_lynde: 2, barry_presenta: 2 });
      for (const x of DIALOGOS) dlgDichas()[x.id] = true;   // (no scene of the book: only the loose lines)
      dayT = C.dia + (C.hora - 6) / 24; for (let j = 0; j < 30; j++) update(1 / 30);
      if (C.natural) { for (let j = 0; j < 30 * 600 && wmBody(C.con).where !== C.escena; j++) { for (const t of TALKS.filter(t => t.narra || t.elige)) { t.interrupted = true; talkEnd(t); } update(1 / 30); } for (let j = 0; j < 30 * 20; j++) update(1 / 30); }   // (they come by themselves, and sit)
      goIn(C.escena); const p = wmBody(C.con); if (C.natural) { ana.x = p.x - 30; ana.y = p.y; } else { p.where = C.escena; p.x = ana.x + 60; p.y = ana.y; } CHAT_HOLD[C.con] = 0;
      game.wm.camison = !!C.ana.camison; game.wm.sinSombrero = !!C.ana.sinSombrero;
      // the lines of theirs that react to this (own, or of their group)
      const conds = l => (/^\\[([^\\]]+)\\] /.exec(l)?.[1] || '').split(',').map(c => c.trim());
      const suyas = (CH[C.con]?.lines || []).filter(l => conds(l).some(c => c === C.clave || (C.clave === 'hora' && /^hora:2/.test(c)))).map(l => l.replace(/^\\[[^\\]]+\\] /, ''));
      const oido = [];
      for (let j = 0; j < 30 * 240 && !oido.some(t => suyas.includes(t)); j++) {
        for (const t of TALKS.filter(t => t.narra || t.elige)) { t.interrupted = true; talkEnd(t); }
        if (!C.natural && wmBody(C.con).where !== C.escena) { const q = wmBody(C.con); q.where = C.escena; q.x = ana.x + 60; q.y = ana.y; }   // (they stay: the test is whether they say it)
        update(1 / 30);
        for (const x of bubbles) if (x.q === C.con && !oido.includes(x.text)) oido.push(x.text);
      }
      const q = wmBody(C.con), traba = { distancia: Math.round(dist(ana.x, ana.y, q.x, q.y)), donde: q.where, ocupada: ocupada(C.con), actuando: !!AGENTS[C.con]?.acting, reaccion: reaccionAlVerla(C.con), mudo: Math.round((amb.mute[C.con] || 0) - TT), amb: !!amb.cur, enc: !!enc.cur, talks: TALKS.length, hablando: hablando(), anaOcupada: ocupada('ana'), cool: Math.round(amb.cool - TT), escrito: writtenTalkOn(), talk: !!game.talk, story: !!storyNow(), sceneOf: sceneOf(C.con), ready: !!amb.ready, seen: amb.seen[C.con] };
      return { nombre: C.nombre, quien: C.con, ok: oido.some(t => suyas.includes(t)), oido, hora: +hourNow().toFixed(2), escena: game.scene, ...(oido.some(t => suyas.includes(t)) ? {} : { traba }) };
    })`, C);
    res.push(r); console.log(`${r.ok ? '✔' : '✘'} ${r.nombre}: ${r.oido.join(' / ') || '(nada)'}`);
    await pg.close();
  }
  await b.close();
  fs.mkdirSync(OUT, { recursive: true }); fs.writeFileSync(path.join(OUT, 'reacciones.json'), JSON.stringify({ casos: res, errores: errs }, null, 1));
  const malos = res.filter(r => !r.ok);
  console.log(errs.length ? 'errores: ' + errs.join(' | ') : ''); console.log(malos.length || errs.length ? `\n${malos.length} sin reacción` : '\ntodos reaccionan');
  process.exitCode = malos.length || errs.length ? 1 : 0;
})();
