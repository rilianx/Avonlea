// La paciencia de Marilla mientras Ana está a prueba: las faltas, el perdón, la ayuda, la búsqueda, la duda en White
// Sands y sus desenlaces, el final y volver atrás. Cada caso en un navegador nuevo, el juego mirado por dentro (?dev).
// Uso: NODE_PATH=… node tools/paciencia.js
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const URL = 'file://' + path.join(__dirname, '..', 'index.html') + '?dev', EXE = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
let fallas = 0; const ok = (c, t) => { console.log((c ? '  ✔ ' : '  ✘ ') + t); if (!c) fallas++; };
// a game on the morning of the second day, after breakfast (the first night and the breakfast already happened)
const MANANA = `(() => { const H = dlgHechos(); Object.assign(H, { inicio_juego: 1, llegada_tv: 1, primera_noche: 1, desayuno_prueba: 2 }); Object.assign(dlgDichas(), { inicio_llegada: true, primera_bed: true, desayuno_prueba: 2 });
  for (const t of [...TALKS]) { t.interrupted = true; talkEnd(t); } bubbles = []; game.wm.camison = false; dayT = 1 + (H0 - 6) / 24; goIn('gg', [KDOOR.x + 40, KIT.h * .6]);
  const M = PEOPLE.marilla; M.where = 'gg'; M.x = STOVE.x + 60; M.y = STOVE.y + 60; M.nav = null; for (const k of Object.keys(PEOPLE)) amb.mute[k] = TT + 9999; })()`;
async function caso(nombre, fn){
  console.log('\n' + nombre);
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] }), ctx = await b.newContext({ viewport: { width: 900, height: 640 } });
  let pg; const errs = [];
  const abrir = async () => { pg = await ctx.newPage(); pg.on('pageerror', e => errs.push(e.message)); await pg.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false })); await pg.goto(URL); await pg.waitForTimeout(1200); };
  await abrir();
  const ev = s => pg.evaluate(s => window.__avonlea.ev(s), s);
  const T = {
    ev, abrir, get pg(){ return pg; },
    manana: h => ev(MANANA.replace('H0', h)),
    run: s => ev(`(() => { for (let k = 0; k < ${s} * 60; k++) update(1 / 60); })()`),
    pac: () => ev(`cualidad('marilla', 'paciencia', 'ana')`),
    // plays on, through the cards, choosing (by a piece of its text) when asked; until cond, or n seconds of the game
    jugar: async (elige, hasta, n = 200) => { const vistos = []; for (let i = 0; i < n; i++) {
      const st = await ev(`(() => { const v = id => { const e = document.getElementById(id); return e && !e.hidden ? e.innerText : ''; }; return { narra: v('narra'), talk: v('talk'), final: !!game.final, esc: TALKS.map(t => t.esc).join(',') }; })()`);
      if (st.esc && !vistos.includes(st.esc)) vistos.push(st.esc);
      if (hasta && await ev(hasta)) return vistos;
      if (st.final) return vistos;
      if (st.narra) await ev(`document.querySelector('#narra button').click()`);
      else if (st.talk && /\d\./.test(st.talk)) { const ok2 = await pg.evaluate(t => { const b = [...document.querySelectorAll('#talk button')].find(b => t && b.innerText.includes(t)) || document.querySelector('#talk button'); b.click(); return b.innerText; }, elige); vistos.push('→ ' + ok2.slice(0, 40)); }
      await T.run(1); }
      return vistos; } };
  try { await fn(T); } catch (e) { ok(false, 'la prueba se cayó: ' + e.message.split('\n')[0]); }
  ok(!errs.length, 'sin errores' + (errs.length ? ': ' + errs.join(' | ') : ''));
  await b.close();
}
(async () => {
  await caso('1. en camisón a media mañana, delante de Marilla: con disculpa no baja; con excusa, sí', async T => {
    await T.manana(10); await T.ev(`game.wm.camison = true`);
    let v = await T.jugar('Perdón', 'dlgDichas().falta_camison && !TALKS.length', 60);
    ok(v.includes('falta_camison'), 'la escena de la falta: ' + v.join(' · '));
    ok(await T.pac() === 3 && !(await T.ev(`game.wm.camison`)), 'pidió perdón y se vistió: paciencia ' + await T.pac());
    await T.ev(`(() => { delete dlgDichas().falta_camison; game.wm.camison = true; })()`);
    v = await T.jugar('hada', 'dlgDichas().falta_camison && !TALKS.length', 60);
    ok(await T.pac() === 2, 'con la excusa baja: paciencia ' + await T.pac());
  });
  await caso('2. el aviso al bajar a 1, la pista del cuaderno, el perdón y la ayuda', async T => {
    await T.manana(10); await T.ev(`cualidadSuma('marilla', 'paciencia', -2, 'ana')`);
    ok(await T.ev(`(game.wm.hitosPend || []).some(p => p.dir === 'bajo' && p.n === 1)`), 'Marilla tiene pendiente decirle «una más así…»');
    await T.run(12); ok(await T.ev(`!!dlgHechos().bajo_paciencia_1`), 'y se lo dice (bajo_paciencia_1)');
    ok(/devolverte/.test(await T.ev(`cuadernoPista(CUADERNO_METAS.find(m => m.id === 'quedarse'))`)), 'el cuaderno lo dice');
    ok(/Cómo la ven[\s\S]*paciencia de Marilla/.test(await T.ev(`cuadernoMiradas()`)), 'y muestra la paciencia de Marilla');
    ok(await T.ev(`convDisponibles('marilla').some(d => d.id === 'conv_marilla_perdon')`), 'puede pedirle perdón');
    await T.ev(`conversar(CONVERSACIONES.find(d => d.id === 'conv_marilla_perdon'))`); await T.jugar(null, '!TALKS.length', 60);
    ok(await T.pac() === 2, 'tras pedir perdón: paciencia ' + await T.pac());
    ok(await T.ev(`!convDisponibles('marilla').some(d => d.id === 'conv_marilla_perdon')`), 'una vez al día');
    await T.ev(`(() => { const D = { v: 2, d: today(), t: {}, dado: {}, n: {} }; for (const c of HABILIDADES) if (c.suma.includes('quehacer') && c.de) habilidadSube('ana', c, D, 'lavar los platos'); habilidadSube('ana', HABILIDADES.find(c => c.id === 'paciencia'), D, 'barrer'); })()`);
    ok(await T.pac() === 3, 'ayudar en la casa la sube, una vez al día: paciencia ' + await T.pac());
  });
  await caso('3. el día del viaje, lejos: Marilla la busca, baja, y el viaje sigue', async T => {
    await T.manana(14.6); await T.ev(`(() => { goOut(); ana.x = 900; ana.y = 900; })()`);
    const v = await T.jugar(null, 'dlgHechos().a_prueba', 200);
    ok(v[0] === 'falta_viaje' && v.includes('viaje_spencer'), 'la busca y van: ' + v.join(' · '));
    ok(await T.pac() === 2 && await T.ev(`!!dlgHechos().a_prueba`), 'a prueba, con paciencia ' + await T.pac());
  });
  await caso('4. sin paciencia, Ana orgullosa y Matthew sin cariño: se va con la Sra. Blewett; y se puede volver atrás', async T => {
    await T.manana(13.9); await T.ev(`(() => { relSetW('matthew', 'ana', 2); relSetW('marilla', 'ana', 1); puntoGuardar('viaje', 'Volver a la mañana del viaje a White Sands'); })()`);
    await T.pg.waitForTimeout(300); await T.ev(`cualidadSuma('marilla', 'paciencia', -3, 'ana')`);
    const v = await T.jugar('Prefiero', 'game.final', 200);
    ok(v.includes('viaje_spencer_duda') && v.includes('devuelta_blewett'), 'la duda, y el final: ' + v.join(' · '));
    ok(await T.ev(`game.final?.id === 'devuelta'`), 'el final queda en la partida');
    const t0 = await T.ev(`dayT`); await T.run(5); ok(await T.ev(`dayT`) === t0, 'el mundo se detiene');
    ok(/Volver a la mañana del viaje/.test(await T.ev(`document.getElementById('final')?.innerText || ''`)), 'la tarjeta ofrece volver a la mañana del viaje');
    await T.pg.close(); await T.abrir(); ok(/FIN/.test(await T.ev(`document.getElementById('final')?.innerText || ''`)), 'al abrir de nuevo, sigue el final');
    await Promise.all([T.pg.waitForNavigation(), T.ev(`[...document.querySelectorAll('#final button')].find(b => /Volver/.test(b.innerText)).click()`)]); await T.pg.waitForTimeout(1500);
    ok(await T.ev(`!game.final && !dlgHechos().devuelta && cualidad('marilla', 'paciencia', 'ana') === 3`), 'volvió a la mañana: sin final, con su paciencia (' + await T.ev(`cualidad('marilla', 'paciencia', 'ana')`) + ')');
  });
  await caso('5. sin paciencia, pero Matthew la quiere mucho: la salva él', async T => {
    await T.manana(13.9); await T.ev(`(() => { relSetW('matthew', 'ana', 4); relSetW('marilla', 'ana', 1); cualidadSuma('marilla', 'paciencia', -3, 'ana'); })()`);
    const v = await T.jugar('Prefiero', 'dlgHechos().a_prueba', 200);
    ok(v.includes('duda_matthew') && !(await T.ev(`!!game.final`)), 'Matthew: ' + v.join(' · '));
    ok(await T.pac() === 2 && await T.ev(`!!dlgHechos().ultima_oportunidad`), 'a prueba, por última vez (paciencia ' + await T.pac() + ')');
  });
  await caso('6. sin paciencia, suplica y Marilla le tiene cariño: no se la da', async T => {
    await T.manana(13.9); await T.ev(`(() => { relSetW('matthew', 'ana', 2); relSetW('marilla', 'ana', 2); cualidadSuma('marilla', 'paciencia', -3, 'ana'); })()`);
    const v = await T.jugar('Por favor', 'dlgHechos().a_prueba', 200);
    ok(v.includes('duda_suplica'), 'suplica: ' + v.join(' · '));
  });
  await caso('7. ya a prueba: sin paciencia, la última oportunidad; y otra vez sin paciencia, la devuelve', async T => {
    await T.manana(10); await T.ev(`(() => { dlgHecho('a_prueba'); cualidadSuma('marilla', 'paciencia', -3, 'ana'); })()`);
    let v = await T.jugar(null, 'dlgHechos().ultima_oportunidad && !TALKS.length', 100);
    ok(v.includes('ultima_oportunidad') && await T.pac() === 2, 'la conversación seria: ' + v.join(' · ') + ' (paciencia ' + await T.pac() + ')');
    await T.ev(`cualidadSuma('marilla', 'paciencia', -2, 'ana')`); v = await T.jugar(null, 'game.final', 100);
    ok(v.includes('devuelta_spencer') && await T.ev(`game.final?.id === 'devuelta'`), 'la lleva de vuelta: ' + v.join(' · '));
  });
  await caso('8. de noche, lejos: Marilla sale con el farol, baja la paciencia, y Ana duerme en su pieza', async T => {
    await T.manana(21.6); await T.ev(`(() => { dlgHecho('a_prueba'); goOut(); ana.x = 900; ana.y = 900; })()`);
    const v = await T.jugar('estrellas', 'dlgDichas().falta_noche && !TALKS.length', 100);
    ok(v.includes('falta_noche') && await T.ev(`game.scene`) === 'ga' && await T.pac() === 2, 'la busca: ' + v.join(' · ') + ' · en ' + await T.ev(`game.scene`) + ' (paciencia ' + await T.pac() + ')');
  });
  console.log('\n' + (fallas ? fallas + ' comprobaciones fallaron' : 'todo bien'));
  process.exit(fallas ? 1 : 0);
})();
