// Una jugadora automática que juega muchos días seguidos, para ver la partida que deja y lo que la IA de la noche haría
// con ella: la curiosa y bastante obediente (elige casi siempre lo que más le gusta a Marilla, a veces lo otro, por ver
// qué pasa; se viste en la mañana, sale cada día a un lugar distinto, conversa con quien puede, le escribe a la Sra. Spencer y manda la carta
// desde la tienda). Cada noche busca, con Z3 (tools/modelo.js), lo que le falta a la partida: las lagunas.
// Deja la partida guardada (lo que el juego guarda en localStorage), que tools/noche.js puede usar como escenario, y un
// informe: tools/noche/partidas/<estilo>.json · trazas/jugadora/<estilo>.md
// Uso: node tools/jugadora.js [curiosa] [--dias 12] [--semilla 7]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..'), URL = 'file://' + path.join(RAIZ, 'index.html') + '?dev';
const EXE = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const ESTILO = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'curiosa', DIAS = +arg('dias', 12), SEMILLA = +arg('semilla', 7);
const ESTILOS = {
  // obediente: el 75 % de las veces, lo que más le gusta a Marilla; si no, otra opción (por curiosidad)
  curiosa: { obedece: .75, conversa: .6, lugares: ['cuesta_del_huerto', 'lago', 'tienda_lawson', 'hondonada_lynde', 'bosque_encantado', 'iglesia', 'granja_harrison', 'aldea', 'camino_blanco', 'escuela'],
    carta: { para: 'spencer', cada: 4 } },
};
const E = ESTILOS[ESTILO]; if (!E) { console.error('No hay un estilo «' + ESTILO + '» (hay: ' + Object.keys(ESTILOS).join(', ') + ')'); process.exit(2); }
let azar = SEMILLA; const rnd = () => (azar = (azar * 16807) % 2147483647) / 2147483647;   // (the same game each time, for one seed)

(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
  const pg = await (await b.newContext({ viewport: { width: 900, height: 640 } })).newPage(); const errs = [];
  pg.on('pageerror', e => errs.push(e.message));
  await pg.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
  await pg.goto(URL); await pg.waitForTimeout(1200);
  const ev = (s, a) => pg.evaluate(([s, a]) => { const v = window.__avonlea.ev(s); return typeof v === 'function' ? v(a) : v; }, [s, a]);
  // s seconds of game, stopping when something waits for her (a card, a choice)
  const correr = s => ev(`(s => { for (let k = 0; k < s * 30; k++) { update(1 / 30); if (document.querySelector('#talk:not([hidden]) button, #narra:not([hidden]) button')) return; } })`, s);
  const estado = () => ev(`(() => ({ dia: today(), hora: +hourNow().toFixed(2), escena: game.scene, sleeping, narra: !!document.querySelector('#narra:not([hidden]) button'),
      botones: [...document.querySelectorAll('#talk:not([hidden]) button')].map(b => b.innerText.trim()), talk: (document.querySelector('#talk:not([hidden])')?.innerText || '').trim().split('\\n')[0],
      devuelta: !!dlgHechos().devuelta, final: !!game.final, ocupada: !!ana.act || TALKS.length > 0 }))()`);
  // what each option does to patience and fondness (the «! suma …» under it): the obedient one picks the most
  const puntos = B => ev(`(B => { const ops = []; const ver = L => { for (const l of L || []) if (Array.isArray(l) && l[0] === '?') for (const op of l[2] || []) { ops.push(op); ver(op.lineas); } };
      for (const d of DIALOGOS) { try { ver(d.lineas()); } catch (e) {} }
      return B.map(b => { const t = b.replace(/^\\d+\\.\\s*/, ''), op = ops.find(o => o.texto === t); if (!op) return 0; let n = 0; for (const e of op.efectos) { const j = JSON.stringify(e); if (/paciencia|afecto/.test(j)) { const m = j.match(/(-?\\d+(\\.\\d+)?)\\D*$/); n += m ? +m[1] : 0; } } return n; }); })`, B);
  const ir = k => ev(`(k => { const P = k === 'casa' ? ['', GG.x, GG.y + 40] : PLACES[k]; if (P && !TALKS.length) { goDest(P[1], P[2]); return true; } return false; })`, k);
  const dias = [], noches = []; let hoy = null, D = null, quieto = 0, antes = null;
  for (let pasos = 0; pasos < 40000; pasos++) {
    const s = await estado();
    if (s.devuelta || s.final || s.dia >= DIAS) break;
    if (s.dia !== hoy) {   // a new day: what the night left (the game as the model asks it), and the plan
      if (hoy !== null) noches.push({ dia: s.dia + 1, partida: await ev('nochePartida()') });
      hoy = s.dia; D = { dia: s.dia + 1, lugares: [], elecciones: [], conversaciones: [], cartas: [], plan: [] };
      const L = E.lugares, a = L[(s.dia * 2) % L.length], c = L[(s.dia * 2 + 1) % L.length];
      D.plan = [[7, 'vestirse'], [9, a], [12, 'casa'], [14.5, c], [17.5, 'casa']];
      if (E.carta && s.dia % E.carta.cada === 1) D.plan.push([19, 'carta']);
      if (E.carta && s.dia % E.carta.cada === 2) D.plan.splice(1, 1, [9, 'tienda_lawson'], [10, 'enviar']);
      dias.push(D);
    }
    if (s.sleeping) { await correr(30); continue; }
    if (s.narra) { await ev(`document.querySelector('#narra:not([hidden]) button').click()`); continue; }
    if (s.botones.length) {
      const p = await puntos(s.botones), mejor = Math.max(...p);
      let i = p.indexOf(mejor); const curiosa = rnd() > E.obedece && s.botones.length > 1;
      if (curiosa) { const otras = s.botones.map((x, j) => j).filter(j => j !== i && !/volver|←|nada|adiós/i.test(s.botones[j])); if (otras.length) i = otras[Math.floor(rnd() * otras.length)]; }
      D.elecciones.push({ hora: s.hora, ante: s.talk.slice(0, 90), eligio: s.botones[i], de: s.botones.length, curiosa: curiosa && i !== p.indexOf(mejor) });
      await ev(`(i => [...document.querySelectorAll('#talk:not([hidden]) button')][i].click())`, i); await correr(.5); continue;
    }
    // the plan of the day: where she goes, the letter
    const t = D.plan[0];
    if (t && s.hora >= t[0] && !s.ocupada) {
      D.plan.shift();
      if (t[1] === 'vestirse') await ev(`(() => { const W = game.wm; if (W?.camison) { if (W.ropaTirada) ropaPonerse(); else vestirse(); } })()`);   // (obedient: she gets dressed in the morning)
      else if (t[1] === 'carta') { const ok = await ev(`(k => { if (!cartaPuede(k) || !enCasa('ana')) return false; jugar({ v: 'escribir_carta', para: k }); return true; })`, E.carta.para); if (ok) D.cartas.push('escribe a ' + E.carta.para); }
      else if (t[1] === 'enviar') { const ok = await ev(`(() => { if (!(game.inv?.carta > 0)) return false; jugar({ v: 'enviar_carta' }); return true; })()`); if (ok) D.cartas.push('la manda desde la tienda'); }
      else if (await ir(t[1])) D.lugares.push(t[1]);
    }
    // curious: whoever is here and has something to talk about
    if (!s.ocupada && rnd() < E.conversa / 6) {
      const c = await ev(`(() => { for (const k of Object.keys(FOLK_DEFS).concat(Object.keys(CH))) { let aqui = false; try { aqui = k !== 'ana' && sceneOf(k) === game.scene; } catch (e) {} if (!aqui) continue; const C = convDisponibles(k)[0]; if (C) { conversar(C); return C.id; } } return null; })()`).catch(() => null);
      if (c) D.conversaciones.push(c);
    }
    await correr(4);
    const ahora = s.dia * 24 + s.hora; if (antes !== null && Math.abs(ahora - antes) < 1e-4) { if (++quieto > 60) { errs.push(`el tiempo no avanza: día ${s.dia + 1}, ${s.hora} h`); break; } } else quieto = 0; antes = ahora;
  }
  const fin = await ev(`(() => { save(); return { guardada: localStorage.getItem('avonlea'), partida: nochePartida(), hitos: historiaTexto(), diario: (game.journal || []).slice(-40).map(e => 'día ' + e.d + ': ' + e.t), cartas: cartas().map(c => c.de + '→' + c.para + ' (' + c.estado + ')') }; })()`);
  noches.push({ dia: fin.partida.dia, partida: fin.partida });
  await b.close();
  // each night, the gaps (Z3): what the model would hand the AI of the night
  let lag = null; try { lag = require('./modelo.js'); } catch (e) { console.error('sin el modelo (npm install): no se buscan las lagunas'); }
  for (const n of noches) if (lag) { const r = await lag.lagunas(n.partida); n.lagunas = r.lagunas; n.resumen = r.resumen; }
  const dir = path.join(RAIZ, 'tools/noche/partidas'), out = path.join(RAIZ, 'trazas/jugadora');
  fs.mkdirSync(dir, { recursive: true }); fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(dir, ESTILO + '.json'), fin.guardada);
  const txt = l => l.de === 'decisiones' ? `Ana eligió «${l.opcion}» (\`${l.hecho}\`, día ${l.dia}): nada de lo que puede pasar lo toma en cuenta` : l.de === 'pocas' ? `${l.nombre}: ${l.quedan} ${l.hay}(es) estos días (menos de ${l.minimo})` : `${l.nombre}: no queda ninguna escena`;
  const md = [`# La jugadora ${ESTILO}: ${fin.partida.dia - 1} días`, '', `Lo genera \`node tools/jugadora.js ${ESTILO} --dias ${DIAS} --semilla ${SEMILLA}\`. La partida quedó en \`tools/noche/partidas/${ESTILO}.json\` (para \`tools/noche.js --escenario\`).`, '',
    errs.length ? '**Errores:** ' + errs.join(' · ') : '**Sin errores del juego.**', '', '## Los hitos', '', '```', fin.hitos, '```', '', '## Las cartas', '', fin.cartas.join(' · ') || '(ninguna)', '',
    '## Día a día', '', ...dias.flatMap(d => [`### Día ${d.dia}`, '', `- fue a: ${d.lugares.join(', ') || '—'}`, `- conversó: ${d.conversaciones.join(', ') || '—'}`, ...(d.cartas.length ? [`- cartas: ${d.cartas.join(', ')}`] : []),
      ...d.elecciones.map(e => `- ${e.hora} h: «${e.ante}» → eligió **${e.eligio}**${e.curiosa ? ' (por curiosidad)' : ''} (de ${e.de})`), '']),
    '## Lo que le faltaba cada noche (Z3)', '', ...noches.flatMap(n => [`- **antes del día ${n.dia}:** ${n.resumen || '—'}`, ...(n.lagunas || []).map(l => '  - ' + txt(l))]), '',
    '## Lo último del diario', '', ...fin.diario.map(x => '- ' + x), ''];
  fs.writeFileSync(path.join(out, ESTILO + '.md'), md.join('\n'));
  console.log(`${ESTILO}: ${fin.partida.dia - 1} días · ${dias.reduce((a, d) => a + d.elecciones.length, 0)} elecciones · ${dias.reduce((a, d) => a + d.conversaciones.length, 0)} conversaciones · ${errs.length} errores`);
  console.log(`la última noche: ${noches.at(-1).resumen || '—'}`); for (const l of noches.at(-1).lagunas || []) console.log('  - ' + txt(l));
  console.log(`→ tools/noche/partidas/${ESTILO}.json · trazas/jugadora/${ESTILO}.md`);
  process.exit(0);
})();
