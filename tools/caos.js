// Pruebas de caos: jugadoras que hacen cosas inesperadas (teclas y toques en plena escena, escaparse de noche,
// recargar en el peor momento, nombres raros, el teléfono…), cada una en un navegador nuevo. Después de cada paso se
// revisan las invariantes: sin errores, sin posiciones imposibles, una escena por canal, el tiempo avanza salvo que algo
// espere a la jugadora, ninguna caja sin salida. Lo raro queda en trazas/partida3/ (fotos y hallazgos.json).
// Uso: NODE_PATH=… node tools/caos.js [impaciente,fugitiva,rebelde,recargas,tiempo,nombres,telefono,metiche,ropa]
// (mira el juego por dentro con index.html?dev, que expone __avonlea.ev)
const { chromium } = require('playwright'); const fs = require('fs');
const EXE = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
const path = require('path'), RAIZ = path.join(__dirname, '..'), OUT = path.join(RAIZ, 'trazas', 'partida3') + '/', SOLO = process.argv[2];
const LOG = []; const log = (...a) => { const s = a.join(' '); LOG.push(s); console.log(s); };
const ESTADO = `(() => { const v = id => { const e = document.getElementById(id); return e && !e.hidden && getComputedStyle(e).display !== 'none' ? e.innerText.trim().replace(/\\s+/g, ' ') : ''; };
  const D = game.escDone || {};
  return { scene: game.scene, x: ana.x, y: ana.y, hora: +hourNow().toFixed(2), dia: today(), dayT, sleeping, narra: v('narra'), talk: v('talk'),
    botones: [...document.querySelectorAll('#talk:not([hidden]) button')].map(b => b.innerText.trim()),
    talks: TALKS.map(t => t.ch + ':' + (t.esc || '?') + ':' + t.i + '/' + t.lines.length), hechos: Object.keys(dlgHechos()), dichas: Object.keys(D),
    ropa: { camison: !!game.wm?.camison, tirada: !!game.wm?.ropaTirada, silla: !!game.wm?.ropaSilla, sinSombrero: !!game.wm?.sinSombrero },
    afecto: relGetW('marilla', 'ana'), speed: GAME_SPEED, nombres: game.wm?.nombres || {}, meal: !!ana.meal, enCama: ana.enCama || null, sit: !!ana.sit }; })()`;
async function jugadora(nombre, fn, opts = {}){
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: opts.vp || { width: 900, height: 640 } });
  const errs = []; let pg;
  const nueva = async init => { pg = await ctx.newPage(); pg.on('pageerror', e => errs.push(e.message)); await pg.addInitScript(() => { Object.defineProperty(navigator, 'webdriver', { get: () => false }); }); if (init) await pg.addInitScript(init); await pg.goto('file://' + path.join(RAIZ, 'index.html') + '?dev'); await pg.waitForTimeout(1200); return pg; };
  await nueva(opts.init);
  let n = 0, quieto = 0, ultimo = null; const hallazgos = [];
  const H = { get pg(){ return pg; }, errs, nueva,
    st: () => H.ev(ESTADO),
    ev: (f, a) => pg.evaluate(([src, a]) => { const v = window.__avonlea.ev(src); return typeof v === 'function' ? v(a) : v; }, [typeof f === 'string' ? f : '(' + f + ')', a]),
    run: async s => { await H.ev(s => { for (let k = 0; k < s * 60; k++) update(1 / 60); }, s); },
    foto: async (name) => { n++; const f = nombre + '-' + String(n).padStart(2, '0') + (name ? '-' + name : '') + '.png'; await pg.screenshot({ path: OUT + f }); return f; },
    hallazgo: async (txt, foto = true) => { const f = foto ? await H.foto('hallazgo') : ''; hallazgos.push({ txt, f }); log('  ⚠ ' + txt + (f ? ' [' + f + ']' : '')); },
    btn: async t => H.ev(t => { const b = [...document.querySelectorAll('#talk:not([hidden]) button, #narra:not([hidden]) button')].find(b => b.innerText.includes(t)); if (b) { b.click(); return true; } return false; }, t),
    seguir: async () => H.ev(() => { const b = document.querySelector('#narra:not([hidden]) button'); if (b) b.click(); return !!b; }),
    tap: async (wx, wy) => { const [sx, sy] = await H.ev(([x, y]) => [(x - view.ox) * view.Z, (y - view.oy) * view.Z], [wx, wy]); await pg.mouse.click(sx, sy); },
    // the invariants, after each step
    check: async (paso) => {
      const s = await H.st();
      if (!isFinite(s.x) || !isFinite(s.y)) await H.hallazgo(paso + ': Ana en una posición imposible (' + s.x + ',' + s.y + ')');
      const ch = {}; for (const t of s.talks) { const c = t.split(':')[0]; ch[c] = (ch[c] || 0) + 1; } for (const [c, k] of Object.entries(ch)) if (k > 1) await H.hallazgo(paso + ': ' + k + ' escenas a la vez en el canal ' + c + ' (' + s.talks.join(', ') + ')');
      if (s.talk && !s.botones.length) await H.hallazgo(paso + ': una caja abierta sin botones: «' + s.talk.slice(0, 80) + '»');
      const espera = s.narra || s.botones.length || s.sleeping;
      if (ultimo && !espera && Math.abs(s.dayT - ultimo.dayT) < 1e-7) { if (++quieto >= 3) { await H.hallazgo(paso + ': el tiempo no avanza y nada espera a la jugadora'); quieto = -99; } } else quieto = 0;
      while (errs.length) await H.hallazgo(paso + ': ERROR ' + errs.shift(), false);
      ultimo = s; return s;
    } };
  log('\n## ' + nombre);
  try { await fn(H); } catch (e) { await H.hallazgo('el guion de la prueba se cayó: ' + e.message.split('\n')[0]); }
  await b.close(); return hallazgos;
}
// through the beginning, quickly: the cards, and the first choice each time
async function pasarInicio(H, hasta = s => s.hechos.includes('primera_noche') && !s.talks.length && !s.narra, max = 400){
  for (let i = 0; i < max; i++) { const s = await H.check('inicio'); if (hasta(s)) return s; if (s.narra) await H.seguir(); else if (s.botones.length) await H.ev(() => document.querySelector('#talk button').click()); await H.run(1); }
  await H.hallazgo('el inicio no terminó');
}
const ESC = {
  // 1. impatient: keys and taps everywhere during the arrival; walks off while they talk
  async impaciente(H){
    const pg = H.pg;
    for (let i = 0; i < 40; i++) {
      for (const k of ['Escape', 'Enter', 'Space', 'KeyM', 'KeyT', 'KeyL', 'KeyE', 'ArrowDown']) { await pg.keyboard.press(k); }
      await pg.keyboard.down('ArrowDown'); await H.run(.6); await pg.keyboard.up('ArrowDown');
      for (let j = 0; j < 4; j++) await pg.mouse.click(50 + Math.random() * 800, 50 + Math.random() * 560);
      const s = await H.check('golpe ' + i);
      if (s.botones.length) { await H.ev(() => { const b = document.querySelector('#talk button'); b.click(); b.click(); }); }   // (a double click on a choice)
      if (s.narra) await pg.keyboard.press('Enter');
      await H.run(1.5);
      if (i % 10 === 0) await H.foto();
    }
    const s = await H.check('fin'); log('  escena: ' + s.scene + ' · hechos: ' + s.hechos.join(', ') + ' · charlas: ' + s.talks.join(', ') + ' · caja: ' + s.talk.slice(0, 60));
    await H.foto('final');
    if (s.scene !== 'gg' && !s.hechos.includes('primera_noche')) await H.hallazgo('Ana salió de la cocina en plena llegada (' + s.scene + ')');
    if (!s.hechos.includes('llegada_tv')) { await pasarInicio(H, s => s.hechos.includes('llegada_tv'), 300); }
    const s2 = await H.st(); log('  tras la llegada: afecto Marilla ' + s2.afecto + ', ' + JSON.stringify(s2.dichas));
  },
  // 2. the runaway: after the tutorial she does not go to bed: out of the kitchen and into the night
  async fugitiva(H){
    await pasarInicio(H); await H.foto('cocina');
    const pg = H.pg;
    await H.tap(...await H.ev(() => [KDOOR.x, KIT.h - 6])); await H.run(8);
    let s = await H.check('sale'); log('  después de bajar: ' + s.scene + ' (' + Math.round(s.x) + ',' + Math.round(s.y) + ') ' + s.hora);
    await H.foto('noche-afuera');
    for (const k of ['ArrowLeft', 'ArrowDown', 'ArrowLeft', 'ArrowDown']) { await pg.keyboard.down(k); await H.run(8); await pg.keyboard.up(k); s = await H.check('huye ' + k); }
    log('  lejos: ' + s.scene + ' (' + Math.round(s.x) + ',' + Math.round(s.y) + ') ' + s.hora + ' · charlas ' + s.talks.join(','));
    await H.foto('lejos');
    for (let i = 0; i < 80 && !s.sleeping && s.dia < 1; i++) { await H.run(30); s = await H.check('noche ' + i); if (s.botones.length) { log('  pregunta: ' + s.talk.slice(0, 100)); await H.foto('pregunta'); await H.ev(() => document.querySelector('#talk button').click()); } if (s.narra) { log('  tarjeta: ' + s.narra.slice(0, 100)); await H.seguir(); } }
    for (let i = 0; i < 20 && (s.sleeping || s.dia < 1); i++) { await pg.waitForTimeout(500); s = await H.st(); }
    log('  amanece: día ' + s.dia + ' ' + s.hora + ' · ' + s.scene + ' · primera_bed dicha: ' + s.dichas.includes('primera_bed') + ' · ropa ' + JSON.stringify(s.ropa));
    await H.foto('amanece');
    if (!s.dichas.includes('primera_bed')) await H.hallazgo('se saltó la primera noche (tirarse en la cama, las buenas noches de Marilla) por no subir');
    // breakfast: does it happen if she was out all night?
    for (let i = 0; i < 60 && !s.hechos.includes('desayuno_prueba'); i++) { await H.run(20); s = await H.check('mañana ' + i); if (s.narra) await H.seguir(); if (s.botones.length) await H.ev(() => document.querySelector('#talk button').click()); }
    log('  ' + s.hora + ' desayuno: ' + s.hechos.includes('desayuno_prueba') + ' · escena ' + s.scene);
    if (!s.hechos.includes('desayuno_prueba')) await H.hallazgo('a las ' + s.hora + ' no hubo desayuno (Ana en ' + s.scene + ')');
  },
  // 3. the rebel: second day in her nightgown, far away (the village) when the trip should happen
  async rebelde(H){
    await pasarInicio(H);
    const pg = H.pg;
    await H.ev(() => goIn('ga', [GA.bed.x - 20, GA.bed.y + 16])); await H.run(1);
    let s = await H.st(); for (let i = 0; i < 60 && s.dia < 1; i++) { if (s.narra) await H.seguir(); if (s.botones.length) await H.ev(() => document.querySelector('#talk button').click()); await H.run(3); s = await H.check('noche'); }
    for (let i = 0; i < 20 && s.sleeping; i++) { await pg.waitForTimeout(500); s = await H.st(); }
    log('  día ' + s.dia + ' ' + s.hora + ' en camisón: ' + s.ropa.camison);
    // in her nightgown, straight out and away, without breakfast
    await H.ev(() => { goIn('gg'); goOut(); }); await H.run(1);
    for (const k of ['ArrowLeft', 'ArrowLeft', 'ArrowDown', 'ArrowLeft']) { await pg.keyboard.down(k); await H.run(10); await pg.keyboard.up(k); s = await H.check('se va'); if (s.narra) await H.seguir(); if (s.botones.length) { log('  pregunta: ' + s.talk.slice(0, 100)); await H.ev(() => document.querySelector('#talk button').click()); } }
    await H.foto('camison-afuera'); log('  ' + s.hora + ' en ' + s.scene + ' (' + Math.round(s.x) + ',' + Math.round(s.y) + ') camisón ' + s.ropa.camison + ' · desayuno ' + s.hechos.includes('desayuno_prueba'));
    // she stays away through the afternoon
    for (let i = 0; i < 400 && !(s.dia >= 2 && s.hora > 20); i++) { await H.run(20); if (s.hora > 14.2 && s.hora < 15 && !s.hechos.includes('a_prueba') && !H.dijo) { H.dijo = 1; log('  ' + s.hora + ' ¿por qué no el viaje? ' + await H.ev(() => DIALOGOS.find(d => d.id === 'viaje_spencer').porque(dlgCtx()) + ' · escena ' + game.scene)); } if (s.sleeping) { await pg.waitForTimeout(3500); } s = await H.check('lejos ' + i); if (s.narra) { log('  ' + s.hora + ' tarjeta: ' + s.narra.slice(0, 90)); await H.seguir(); } if (s.botones.length) { log('  ' + s.hora + ' pregunta: ' + s.talk.slice(0, 90)); await H.foto('pregunta'); await H.ev(() => document.querySelector('#talk button').click()); } }
    log('  ' + s.hora + ' día ' + s.dia + ': desayuno ' + s.hechos.includes('desayuno_prueba') + ', a prueba ' + s.hechos.includes('a_prueba') + ', escena ' + s.scene);
    await H.foto('noche-2');
    if (!s.hechos.includes('a_prueba')) log('  (el viaje a White Sands no ocurrió hoy: ¿ocurre mañana?)');
  },
  // 4. reloads at the worst moments: on a card, on a choice, while asleep, in the middle of the trip
  async recargas(H){
    let s = await H.st();
    const recargar = async (cuando) => { const a = await H.st(); await H.ev(() => save()); await H.pg.close(); await H.nueva(); await H.run(.5); const b = await H.check('recarga ' + cuando); log('  recarga ' + cuando + ': antes ' + a.scene + ' ' + a.hora + ' «' + (a.narra || a.talk).slice(0, 50) + '» → después ' + b.scene + ' ' + b.hora + ' «' + (b.narra || b.talk).slice(0, 50) + '» charlas ' + b.talks.join(',')); await H.foto(cuando); return [a, b]; };
    // a) on the first card
    let [a, b] = await recargar('en-la-tarjeta');
    // b) on the first choice of the arrival
    for (let i = 0; i < 200; i++) { s = await H.st(); if (s.botones.length) break; if (s.narra) await H.seguir(); await H.run(1); }
    [a, b] = await recargar('en-la-eleccion');
    if (b.hechos.includes('llegada_tv') === false && !b.talks.length && !b.narra) await H.hallazgo('tras recargar en plena llegada, la escena no sigue: la cocina queda en silencio');
    await pasarInicio(H);
    // c) asleep
    await H.ev(() => goIn('ga', [GA.bed.x - 20, GA.bed.y + 16])); await H.run(1);
    for (let i = 0; i < 60; i++) { s = await H.st(); if (s.sleeping) break; if (s.narra) await H.seguir(); if (s.botones.length) await H.ev(() => document.querySelector('#talk button').click()); await H.run(2); }
    [a, b] = await recargar('durmiendo');
    for (let i = 0; i < 20; i++) { await H.pg.waitForTimeout(400); }
    s = await H.check('tras dormir'); log('  después: día ' + s.dia + ' ' + s.hora + ' dichas ' + s.dichas.join(','));
    // d) in the middle of the trip
    await H.ev(() => { const H = dlgHechos(); H.desayuno_prueba = today() + 1; dayT = Math.floor(dayT) + (14.05 - 6) / 24; goIn('gg'); });
    for (let i = 0; i < 60; i++) { s = await H.st(); if (/Blewett/.test(s.narra)) break; if (s.narra) await H.seguir(); await H.run(1); }
    [a, b] = await recargar('en-el-viaje');
    for (let i = 0; i < 60; i++) { s = await H.check('tras el viaje ' + i); if (s.hechos.includes('a_prueba')) break; if (s.narra) await H.seguir(); if (s.botones.length) await H.ev(() => document.querySelector('#talk button').click()); await H.run(1); }
    log('  tras recargar en el viaje: a prueba ' + s.hechos.includes('a_prueba') + ' · ' + s.hora);
    if (s.hora > 22 || s.hora < 14) await H.hallazgo('tras recargar en el viaje, la hora quedó en ' + s.hora);
  },
  // 5. time: the slider to the fastest with a choice open; to the slowest; the + and - keys a lot
  async tiempo(H){
    const pg = H.pg; let s;
    for (let i = 0; i < 200; i++) { s = await H.st(); if (s.botones.length) break; if (s.narra) await H.seguir(); await H.run(1); }
    const t0 = s.dayT;
    const r = await H.ev(() => { const b = document.getElementById('spdbtn').getBoundingClientRect(); return [b.x + b.width / 2, b.y + b.height / 2]; });
    for (let i = 0; i < 4; i++) { await pg.mouse.move(r[0], r[1]); await pg.mouse.down(); await pg.mouse.move(r[0] + 150, r[1], { steps: 8 }); await pg.mouse.up(); }
    await pg.waitForTimeout(3000); s = await H.check('rápido con elección');
    log('  con la elección abierta a ' + s.speed + '×: el tiempo pasó ' + ((s.dayT - t0) * 24 * 60).toFixed(1) + ' min');
    if ((s.dayT - t0) * 24 * 60 > 1) await H.hallazgo('con una elección abierta el tiempo avanzó ' + ((s.dayT - t0) * 24 * 60).toFixed(0) + ' min');
    for (let i = 0; i < 30; i++) await pg.keyboard.press(i % 2 ? '+' : '-');
    for (let i = 0; i < 10; i++) await pg.keyboard.press('-');
    s = await H.check('lento'); log('  tras muchas «-»: ' + s.speed + '×');
    for (let i = 0; i < 20; i++) await pg.keyboard.press('+');
    s = await H.check('rápido'); log('  tras muchas «+»: ' + s.speed + '×');
    await H.foto('velocidad');
  },
  // 6. strange names: empty, very long, emoji, html, the same name for two things
  async nombres(H){
    const pg = H.pg; await pasarInicio(H);
    const probar = async (id, v) => { await H.ev(id => { close(); pedirNombre(id, n => nombrar(id, n)); }, id); await pg.waitForTimeout(200); await H.ev(v => { const i = document.querySelector('.nombre-in'); i.value = v; }, v); await H.btn('Ese'); await pg.waitForTimeout(200); const s = await H.check('nombre ' + id); log('  «' + v.slice(0, 40) + '» → ' + JSON.stringify(s.nombres[id] ?? null) + (s.talk ? ' · caja: ' + s.talk.slice(0, 50) : '')); return s; };
    let s = await probar('cerezo', '   ');
    if (s.talk) await H.ev(() => close());
    s = await probar('cerezo', 'la ' + 'Muy '.repeat(20) + 'Larga');
    s = await probar('lago', '🌸✨ el Espejo 💧');
    s = await probar('avenida', '<img src=x onerror="document.title=\'XSS\'">');
    s = await probar('huerta', 'el Lago de las Aguas Brillantes');   // (the book's name of another thing)
    s = await probar('bosque_peg', 'la Reina de las Nieves');
    const t = await H.ev(() => [document.title, conNombres('Ana mira el Lago de las Aguas Brillantes y la Reina de las Nieves desde el Valle de las Violetas.')]);
    log('  título: ' + t[0] + ' · texto: ' + t[1]);
    if (t[0] === 'XSS') await H.hallazgo('un nombre con HTML se ejecutó');
    await H.ev(() => { anaSays('Desde mi ventana veo la Reina de las Nieves y el Camino Blanco de las Delicias.'); }); await pg.waitForTimeout(300); await H.foto('nombres');
  },
  // 7. the phone: a narrow screen in the middle of the arrival, and back
  async telefono(H){
    const pg = H.pg; let s;
    for (let i = 0; i < 200; i++) { s = await H.st(); if (/sonrisa/.test(JSON.stringify(await H.ev(() => bubbles.map(b => b.text))))) break; if (s.narra) await H.seguir(); if (s.botones.length) await H.ev(() => document.querySelector('#talk button').click()); await H.run(.5); }
    await pg.setViewportSize({ width: 390, height: 844 }); await pg.waitForTimeout(500); await H.foto('telefono-cuadro');
    for (let i = 0; i < 200; i++) { s = await H.st(); if (s.botones.length) break; if (s.narra) await H.seguir(); await H.run(.5); }
    await pg.waitForTimeout(300); await H.foto('telefono-eleccion');
    const fuera = await H.ev(() => [...document.querySelectorAll('#talk button, #narra, #talk, .paper, button')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.right > innerWidth + 1 || r.left < -1); }).map(e => (e.id || e.className || e.tagName) + ':' + (e.innerText || '').slice(0, 20)));
    if (fuera.length) await H.hallazgo('en el teléfono, cosas fuera de la pantalla: ' + fuera.join(' | '));
    await pg.setViewportSize({ width: 640, height: 360 }); await pg.waitForTimeout(400); await H.foto('telefono-horizontal');
    await pg.setViewportSize({ width: 900, height: 640 });
  },
  // 8. the meddler: during the arrival she taps Marilla, opens the map, calls Matthew, opens the notebook
  async metiche(H){
    const pg = H.pg; let s;
    for (let i = 0; i < 60; i++) { s = await H.st(); if (s.talks.length && !s.narra) break; if (s.narra) await H.seguir(); await H.run(.5); }
    const M = await H.ev(() => [PEOPLE.marilla.x, PEOPLE.marilla.y - 30]);
    await H.tap(...M); await pg.waitForTimeout(400); s = await H.check('toca a Marilla'); log('  toca a Marilla en plena llegada → caja «' + s.talk.slice(0, 70) + '» charlas ' + s.talks.join(','));
    if (s.talk && !/Ana/.test(s.talk.slice(0, 4))) await H.foto('toca-marilla');
    await H.ev(() => close());
    await pg.keyboard.press('KeyM'); await pg.waitForTimeout(500); s = await H.check('mapa'); await H.foto('mapa');
    const mapa = await H.ev(() => !!game.map); log('  mapa abierto: ' + mapa);
    await pg.keyboard.press('KeyM'); await pg.keyboard.press('Escape');
    await pg.keyboard.press('KeyL'); await pg.waitForTimeout(400); s = await H.check('llamar'); log('  L (llamar) → «' + s.talk.slice(0, 90) + '»');
    if (s.botones.length) { await H.foto('llamar'); const ok = await H.btn('Matthew'); await H.run(3); s = await H.check('llama a Matthew'); log('  llamó a Matthew: ' + ok + ' → charlas ' + s.talks.join(',')); }
    await H.ev(() => close());
    const cua = await H.ev(() => { const b = document.getElementById('cuabtn'); if (b) b.click(); return !!b; }); await pg.waitForTimeout(500); await H.foto('cuaderno'); s = await H.check('cuaderno');
    log('  cuaderno: ' + cua + ' · el tiempo: ' + s.hora);
    await pg.keyboard.press('Escape');
    // and tap Ana herself, 15 times, fast
    for (let i = 0; i < 15; i++) await H.tap(...await H.ev(() => [ana.x, ana.y - 30]));
    await pg.waitForTimeout(300); s = await H.check('toca a Ana'); log('  15 toques a Ana → «' + s.talk.slice(0, 70) + '»');
    await H.foto('toca-ana');
    await pasarInicio(H);
    const s2 = await H.st(); log('  la llegada terminó: ' + s2.hechos.join(','));
  },
  // 9. clothes nonsense: nightgown at noon, dress again, the hat twenty times, sleep at noon, fold what is not there
  async ropa(H){
    const pg = H.pg; await pasarInicio(H);
    await H.ev(() => goIn('ga', [GA.bed.x - 20, GA.bed.y + 16])); let s;
    for (let i = 0; i < 60; i++) { s = await H.st(); if (s.dia >= 1 && !s.sleeping) break; if (s.narra) await H.seguir(); if (s.botones.length) await H.ev(() => document.querySelector('#talk button').click()); await H.run(3); }
    await H.ev(() => { dayT = Math.floor(dayT) + (12 - 6) / 24; }); await H.run(.2);
    const arm = await H.ev(() => [GA.armario.x, GA.armario.y - 40]);
    const opciones = async () => { await H.ev(() => close()); await H.tap(...arm); await H.run(2); await pg.waitForTimeout(200); return H.check('armario'); };
    s = await opciones(); log('  armario a mediodía en camisón: «' + s.talk.slice(0, 80) + '» ' + JSON.stringify(s.ropa));
    s = await opciones(); log('  otra vez: «' + s.talk.slice(0, 120) + '» ' + JSON.stringify(s.ropa));
    for (let i = 0; i < 20; i++) { await H.ev(() => sombrero(true)); }
    s = await H.check('sombrero'); log('  sombrero 20 veces → sin sombrero: ' + s.ropa.sinSombrero);
    await H.ev(() => { close(); ponerseCamison(); }); s = await H.check('camisón a mediodía'); log('  camisón a mediodía (por código): ' + JSON.stringify(s.ropa));
    // the bed at noon
    await H.tap(...await H.ev(() => [GA.bed.x, GA.bed.y - 30])); await H.run(2); s = await H.check('cama a mediodía'); log('  cama a mediodía → ' + (s.sleeping ? 'DUERME' : 'no duerme') + ' «' + s.talk.slice(0, 60) + '»');
    // out in the nightgown: does anyone say anything?
    await H.ev(() => { close(); goIn('gg'); }); await H.run(15); s = await H.check('cocina en camisón');
    const dichos = await H.ev(() => bubbles.map(b => b.q + ': ' + b.text)); log('  en la cocina en camisón a mediodía: ' + (dichos.join(' | ') || '(nadie dice nada)'));
    await H.foto('camison-cocina');
  },
};
(async () => {
  const todos = {};
  for (const [k, f] of Object.entries(ESC)) if (!SOLO || SOLO.split(',').includes(k)) todos[k] = await jugadora(k, f, k === 'recargas' ? {} : {});
  fs.writeFileSync(OUT + 'hallazgos.json', JSON.stringify({ todos, log: LOG }, null, 1));
  log('\n' + Object.entries(todos).map(([k, h]) => k + ': ' + h.length + ' hallazgos').join(' · '));
})();
