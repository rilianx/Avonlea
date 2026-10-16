// Quién está en Avonlea cada día, en una partida nueva (src/datos/llegadas.txt): para cada día que importa (el 1, la
// vuelta de Diana, la escuela, el invierno, los Allan, la Srta. Stacy…) junta quiénes no están, y prueba lo que debe
// esperar (la escena «¡Zanahorias!» sin Gilbert; la tía Josephine fuera del invierno). Salida: trazas/partida5/llegadas.json.
// Uso: NODE_PATH=… node tools/llegadas.js
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..'), OUT = path.join(RAIZ, 'trazas', 'partida5'), URL = 'file://' + path.join(RAIZ, 'index.html') + '?dev';
const EXE = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
const DIAS = [1, 17, 18, 30, 43, 57, 64, 71, 85, 99];
// lo que dice el libro (días del juego): quién no puede estar ese día, y quién sí
const ESPERA = {
  1: { fuera: ['diana', 'gilbert', 'allan', 'sraallan', 'stacy', 'josephine', 'veraneante'], dentro: ['phillips', 'prissy', 'lynde'] },
  18: { dentro: ['diana'] },
  30: { fuera: ['gilbert', 'josephine'] },
  43: { dentro: ['gilbert', 'josephine'] },
  57: { fuera: ['josephine', 'allan'] },
  64: { dentro: ['allan', 'sraallan', 'phillips'] },
  71: { fuera: ['phillips', 'prissy', 'stacy'], dentro: ['veraneante'] },
  85: { dentro: ['stacy', 'gilbert'], fuera: ['phillips'] },
};
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] }); const pg = await (await b.newContext({ viewport: { width: 900, height: 640 } })).newPage(); const errs = [];
  pg.on('pageerror', e => errs.push(e.message));
  await pg.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
  await pg.goto(URL); await pg.waitForTimeout(1200);
  const ev = (s, a) => pg.evaluate(([s, a]) => { const v = window.__avonlea.ev(s); return typeof v === 'function' ? v(a) : v; }, [s, a]);
  await ev(`(() => { Object.assign(dlgHechos(), { inicio_juego: 1, llegada_tv: 1, primera_noche: 1, desayuno_prueba: 2, a_prueba: 2, se_queda: 3 }); for (const x of DIALOGOS) if (x.id !== 'zanahorias') dlgDichas()[x.id] = true; })()`);   // (no scene of the book stops the world: only who is here is looked at)
  const res = [], malos = [];
  for (const d of DIAS) {
    const r = await ev(`(d => { dayT = d - 1 + (11 - 6) / 24; for (let j = 0; j < 240; j++) { for (const t of TALKS.filter(t => t.narra)) { t.interrupted = true; talkEnd(t); } update(1 / 30); }
      const fuera = [...Object.keys(PEOPLE).filter(k => PEOPLE[k].where === 'away' && ausente(k)), ...FOLK.filter(f => f.where === 'away').map(f => f.id)];
      return { dia: d, estacion: SEASONS[S], fuera, donde: Object.fromEntries(fuera.map(k => [k, LLEGADAS[k]?.fuera || ''])) }; })`, d);
    const E = ESPERA[d] || {};
    for (const k of E.fuera || []) if (!r.fuera.includes(k)) malos.push(`día ${d}: ${k} debería estar fuera`);
    for (const k of E.dentro || []) if (r.fuera.includes(k)) malos.push(`día ${d}: ${k} debería estar en Avonlea`);
    res.push(r); console.log(`día ${d} (${r.estacion}): fuera ${r.fuera.join(', ') || 'nadie'}`);
  }
  // una escena en la que habla alguien que no está, espera: «¡Zanahorias!» sin Gilbert (día 30, Ana ya va a la escuela hace un día)
  const zan = await ev(`(() => { dayT = 29 + (11 - 6) / 24; for (let j = 0; j < 90; j++) { for (const t of TALKS.filter(t => t.narra)) { t.interrupted = true; talkEnd(t); } update(1 / 30); } const z = DIALOGOS.find(x => x.id === 'zanahorias'); return z ? z.porque(dlgCtx()) : 'sin escena'; })()`).catch(e => 'error: ' + e.message);
  console.log('zanahorias el día 30, sin Gilbert:', zan); if (!/gilbert no está/.test(zan)) malos.push('zanahorias no espera a Gilbert: ' + zan);
  // una partida de antes (sin inicio_juego): todos están
  const antes = await ev(`(() => { delete dlgHechos().inicio_juego; dayT = 2 + 5 / 24; for (let j = 0; j < 120; j++) { for (const t of TALKS.filter(t => t.narra)) { t.interrupted = true; talkEnd(t); } update(1 / 30); } return FOLK.filter(f => f.where === 'away').map(f => f.id).concat(Object.keys(PEOPLE).filter(k => PEOPLE[k].where === 'away' && ausente(k))); })()`);
  console.log('partida de antes, día 3: fuera', antes.join(', ') || 'nadie'); if (antes.length) malos.push('en una partida de antes falta gente: ' + antes.join(', '));
  if (errs.length) malos.push(...errs.map(e => 'error: ' + e));
  fs.mkdirSync(OUT, { recursive: true }); fs.writeFileSync(path.join(OUT, 'llegadas.json'), JSON.stringify({ dias: res, zanahorias: zan, malos }, null, 1));
  console.log(malos.length ? '\n' + malos.join('\n') : '\ntodo como en el libro');
  await b.close(); process.exitCode = malos.length ? 1 : 0;
})();
