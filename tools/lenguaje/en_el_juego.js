#!/usr/bin/env node
// Las historias del lenguaje dentro del juego (src/js/67-lenguaje.js): abre index.html y revisa, con el tiempo acelerado,
//   1. la Avenida con Matthew (cap. 2): Ana viene hablando en la calesa; al entrar a la Avenida, la escena del libro
//      (cb_libro) corta la charla, calla por Newbridge y los campos, y al final Ana le pone nombre;
//   2. Ana sola por el Camino Blanco del mapa de Avonlea (cb_sola): no hay nada que cortar; a mitad de la escena se
//      guarda la partida y se recarga la página, y la escena sigue donde iba;
//   3. la llegada, como la juega una persona, desde una partida nueva («Empezar antes, en la estación»): después de la
//      escena de la estación, Matthew le pide a Ana que suba a la calesa; la jugadora dice «Todavía no», Matthew
//      insiste, y la segunda vez dice que sí; Matthew la lleva a Tejas Verdes con el planificador del juego (las ocho
//      millas del camino, la Avenida, el mapa de Avonlea).
// Uso: node tools/lenguaje/en_el_juego.js        (después de node tools/build.js)
const { chromium } = require('playwright'), path = require('path');
const URL = 'file://' + path.join(__dirname, '..', '..', 'index.html') + '?dev';
(async () => {
  const b = await chromium.launch(), fallas = [], errs = [];
  const abrir = async pg => { pg.on('pageerror', e => errs.push(e.message)); await pg.goto(URL); await pg.waitForTimeout(2500); };
  const ev = (pg, s) => pg.evaluate(s => window.__avonlea.ev(s), s);
  const esperar = async (pg, cond, max = 240) => { for (let i = 0; i < max * 4; i++) { if (await ev(pg, cond)) return true; await pg.waitForTimeout(250); } return false; };
  const registro = async pg => JSON.parse(await ev(pg, 'JSON.stringify(LG.M.registro.map(r => r.t))'));
  // 1. la Avenida con Matthew
  { const pg = await b.newPage(); await abrir(pg);
    await ev(pg, `close(); for (const c of CHATS.slice()) chatEnd(c); TALKS = []; dayAt(19.5); PEOPLE.matthew.buggy = true; roadStart('matthew', .62, 1); roadJoin('matthew');
      talkPlay([['ana', 'Lo que es seguro es que nunca seré angelicalmente buena.'], ['ana', 'La señora Spencer dice…'], ['ana', 'Y además…'], ['ana', 'Y otra…']], { ch: 'viaje', gap: 4 }); setSpeed(20); 1`);
    if (!await esperar(pg, `LG.M.estado().escena?.id === 'camino_blanco.cb_libro'`, 60)) fallas.push('la Avenida: no empezó cb_libro');
    const r0 = await registro(pg);
    if (!r0.includes('✂ se corta una conversación')) fallas.push('la Avenida: no cortó la charla del camino');
    if (!r0.some(t => /¡Oh, señor Cuthbert!!!/.test(t))) fallas.push('la Avenida: no exclamó (interrumpio)');
    if (!await esperar(pg, `!LG.M.estado().escena`, 240)) fallas.push('la Avenida: cb_libro no terminó');
    const r = await registro(pg), H = JSON.parse(await ev(pg, `JSON.stringify({ n: dlgHechos().nombro_avenida, d: dlgDichas().cb_libro, nombre: nombreDe('avenida') })`));
    if (!r.some(t => /una milla más/.test(t))) fallas.push('la Avenida: Matthew no rompió el silencio');
    if (!H.n) fallas.push('la Avenida: Ana no le puso nombre (nombro_avenida)');
    if (H.d !== true) fallas.push('la Avenida: el guion no la ve dicha (dicha:cb_libro)');
    console.log(`la Avenida con Matthew: ${r.filter(t => /^\d+m$/.test(t)).length} silencios, nombre «${H.nombre}»`);
    await pg.close(); }
  // 2. sola por el Camino Blanco, guardando a mitad
  { const ctx = await b.newContext(), pg = await ctx.newPage(); await abrir(pg);
    await ev(pg, `close(); TALKS = []; diana.follow = false; game.scene = 'out'; ana.x = GG.x; ana.y = GG.y + 60; 1`); await pg.waitForTimeout(600);
    await ev(pg, `const R = ROADS.blanco, m = R[Math.floor(R.length / 2)]; ana.x = m[0]; ana.y = m[1]; 1`);
    if (!await esperar(pg, `LG.M.estado().escena?.id === 'camino_blanco.cb_sola'`, 20)) fallas.push('sola: no empezó cb_sola');
    if ((await registro(pg)).some(t => /^✂/.test(t))) fallas.push('sola: cortó algo (iba en silencio)');
    await ev(pg, 'save(); 1'); await pg.reload(); await pg.waitForTimeout(2500);
    if (await ev(pg, `LG.M.estado().escena?.id`) !== 'camino_blanco.cb_sola') fallas.push('sola: al recargar, la escena no siguió');
    await ev(pg, 'setSpeed(20); 1');
    if (!await esperar(pg, `!LG.M.estado().escena`, 60)) fallas.push('sola: no terminó');
    if (!(await registro(pg)).some(t => /todavía más mío/.test(t))) fallas.push('sola: no dijo lo último');
    console.log('sola por el Camino Blanco, guardando y recargando a mitad: ' + (fallas.some(f => f.startsWith('sola')) ? 'mal' : 'bien'));
    await ctx.close(); }
  // 3. la llegada, con la jugadora, desde una partida nueva: «Empezar antes, en la estación»; las tarjetas se leen, en
  // las escenas va lo primero, y cuando Matthew le pide que suba: primero «Todavía no», después «Subir a la calesa»
  { const ctx = await b.newContext(), pg = await ctx.newPage();
    await pg.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => false }); if (!sessionStorage.getItem('ya')) { localStorage.clear(); sessionStorage.setItem('ya', 1); } });
    await abrir(pg);
    for (let k = 0; k < 2; k++) { await pg.click('#antes'); await pg.waitForTimeout(300); }
    const respondio = []; let fin = null;
    for (let i = 0; i < 2400 && !fin; i++) {
      await pg.waitForTimeout(150);
      const t = await ev(pg, `$('talk').hidden ? '' : $('talk').textContent`);
      if (/te pide/.test(t)) { const si = respondio.length >= 1; await pg.evaluate(t => { const x = [...document.querySelectorAll('#talk button')].find(b => b.textContent.includes(t)); if (x) x.click(); }, si ? 'Subir a la calesa' : 'Todavía no'); respondio.push(si ? 'sí' : 'no'); continue; }
      await pg.evaluate(() => { const n = document.querySelector('#narra:not([hidden]) button'); if (n) n.click(); const o = document.querySelector('#talk:not([hidden]) .opts button'); if (o) o.click(); });
      if (await ev(pg, 'GAME_SPEED < 50')) await ev(pg, 'setSpeed(50); 1');
      const e = await ev(pg, `LG.M ? LG.M.get(['encargo', 'llegada', 'trae']) : 'pendiente'`); if (e === 'cumplido' || e === 'fallido') fin = e;
    }
    const E = JSON.parse(await ev(pg, `JSON.stringify({ cb: dlgDichas().cb_libro, nombre: nombreDe('avenida'), hora: fmtHour(hourNow()), ana: game.scene, voces: LG.M.registro.filter(r => r.q === 'matthew' && /Bueno, pues…/.test(r.t)).length })`));
    if (respondio.slice(0, 2).join() !== 'no,sí') fallas.push('la llegada: Matthew no le pidió a Ana dos veces que subiera (' + respondio.join() + ')');
    if (E.voces < 2) fallas.push('la llegada: no se oyeron las dos voces de Matthew (pedir, insistir)');
    if (fin !== 'cumplido') fallas.push('la llegada: el encargo «trae» quedó ' + (fin || 'en curso'));
    if (!E.cb) fallas.push('la llegada: en el camino no pasó la Avenida (cb_libro)');
    console.log(`la llegada, desde la estación: respondió ${respondio.join(' y ')}; trae ${fin} a las ${E.hora} (Ana en ${E.ana}); la Avenida: ${E.nombre}`);
    await ctx.close(); }
  await b.close();
  for (const e of errs) fallas.push('error en la página: ' + e);
  console.log(fallas.length ? '✘ ' + fallas.join('\n✘ ') : '✔ el lenguaje en el juego');
  process.exit(fallas.length ? 1 : 0);
})();
