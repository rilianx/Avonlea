// Experimento: ¿cómo contarle a la IA de la noche de qué se ha conversado ya, para que proponga temas nuevos (seguidos
// de los que eligió la jugadora, o distintos) sin repetir, gastando pocos tokens? Para cada persona y cada manera de
// contarlo, le pide 5 temas nuevos (tema y resumen de una línea) con un pedido corto, y otra llamada los juzga, viendo
// TODO lo ya conversado (título y resumen): si alguno repite algo ya hablado, si sigue lo que le interesa a la jugadora,
// y si tiene contenido. Lo que se ahorra es contexto (lo que se le manda), no el largo de las escenas que escriba.
// Uso: OPENAI_API_KEY=… node tools/temas.js [--partida tools/noche/partidas/curiosa.json] [--personas marilla,matthew,diana]
//        [--veces 2] [--modelo gpt-5.4-mini] [--salida trazas/temas] [--datos (solo lo que saca de la partida, sin llamar a nadie)]
const fs = require('fs'), path = require('path'), { chromium } = require('playwright');
const RAIZ = path.join(__dirname, '..'), arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const PARTIDA = arg('partida', 'tools/noche/partidas/curiosa.json'), PERSONAS = arg('personas', 'marilla,matthew,diana').split(','), VECES = +arg('veces', 2);
const MODELO = arg('modelo', 'gpt-5.4-mini'), SALIDA = path.resolve(RAIZ, arg('salida', 'trazas/temas'));
const EXE = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;

// las maneras de contar lo ya conversado con esa persona (★: lo que eligió la jugadora, ya conversado; ○: lo que queda)
const MANERAS = {
  nada: () => '',
  temas: P => P.convs.map(c => `${c.hecha ? '★' : '○'} ${c.tema}`).join('\n'),
  resumenes: P => P.convs.map(c => `${c.hecha ? '★' : '○'} ${c.tema}: ${c.resumen || ''}`).join('\n'),
  mixto: P => [...P.convs.filter(c => c.hecha).map(c => `★ ${c.resumen || c.tema}`), ...P.convs.filter(c => !c.hecha).map(c => `○ ${c.tema}`)].join('\n'),
};

async function openai(body){
  const key = process.env.OPENAI_API_KEY; if (!key) throw new Error('no hay OPENAI_API_KEY');
  for (let intento = 0; intento < 3; intento++) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', { method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + key }, body: JSON.stringify(body), signal: AbortSignal.timeout(180000) });
    const d = await res.json().catch(() => ({})); if (res.ok) return d;
    if (res.status !== 429 && res.status < 500) throw new Error(`OpenAI ${res.status}: ${d.error?.message}`);
    await new Promise(r => setTimeout(r, 4000 * (intento + 1)));
  }
  throw new Error('OpenAI no contestó');
}
const json = (d) => { try { return JSON.parse(d.choices[0].message.content); } catch (e) { return null; } };

(async () => {
  // lo que hay en la partida: cada persona, su voz, sus conversaciones (tema, resumen, si ya se tuvo), lo que eligió y el perfil
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] }); const pg = await (await b.newContext()).newPage();
  await pg.addInitScript(([s]) => { Object.defineProperty(navigator, 'webdriver', { get: () => false }); localStorage.setItem('avonlea', s); }, [fs.readFileSync(path.resolve(RAIZ, PARTIDA), 'utf8')]);
  await pg.goto('file://' + path.join(RAIZ, 'index.html') + '?dev'); await pg.waitForTimeout(1500);
  const D = await pg.evaluate(ks => window.__avonlea.ev(`(ks => { const P = nochePerfil(), T = nocheTemas();
    return { dia: today() + 1, perfil: { personas: P.personas.map(x => x[0]), actividades: P.actividades.map(x => x[0]) }, elegidos: T.elegidos,
      gente: Object.fromEntries(ks.map(k => [k, { nombre: wmName(k), voz: CH[k] ? voiceShort(k) : '', cariño: relGetW(k, 'ana'),
        convs: CONVERSACIONES.filter(d => d.con === k && !d.ia).map(d => ({ id: d.id, tema: d.tema, resumen: d.resumen || '', hecha: !!d.dicha() })) }])) }; })`)(ks), PERSONAS);
  await b.close();
  if (process.argv.includes('--datos')) { console.log(JSON.stringify(D, null, 1)); return; }   // (only what the game has: to look before spending calls)

  const sistema = 'Escribes para «Un día en Avonlea», un juego tranquilo inspirado en «Ana de las Tejas Verdes» (hacia 1880). Ana Shirley, 11 años, huérfana, soñadora y conversadora, vive con Marilla y Matthew Cuthbert. Español; el tono del libro.';
  const filas = [], detalle = [];
  for (const k of PERSONAS) for (const [manera, f] of Object.entries(MANERAS)) for (let v = 0; v < VECES; v++) {
    const P = D.gente[k], ya = f(P);
    const pedido = `Día ${D.dia}. Ana y ${P.nombre}${P.voz ? ' (' + P.voz + ')' : ''}; cariño hacia Ana ${P.cariño}/5.
A quien juega le interesa: ${D.perfil.personas.slice(0, 4).join(', ')}; ${D.perfil.actividades.slice(0, 3).join(', ')}.
Lo que eligió conversar últimamente: ${D.elegidos.join(' · ') || '(nada todavía)'}
${ya ? `\nLO YA CONVERSADO CON ${P.nombre.toUpperCase()} (★ ya conversado; ○ disponible, aún no):\n${ya}\n` : ''}
Propón 5 temas NUEVOS de conversación entre Ana y ${P.nombre}: que sigan lo que le interesa a quien juega (lo que vino después de algo que eligió, o algo nuevo y relacionado), con algo que cambie o se revele, sin repetir nada ya conversado.
JSON: {"temas":[{"tema":"cómo aparece en el menú (lo que Ana quiere hablar)","resumen":"de qué se habla y en qué queda, una línea"}]}`;
    const r = await openai({ model: MODELO, messages: [{ role: 'system', content: sistema }, { role: 'user', content: pedido }], response_format: { type: 'json_object' } });
    const temas = (json(r)?.temas || []).slice(0, 5);
    // el juez: ve todo lo conversado con esa persona (título y resumen), lo que eligió quien juega, y las propuestas
    const juicio = `Lo ya conversado entre Ana y ${P.nombre} (título: resumen):\n${P.convs.map((c, i) => `${i + 1}. ${c.tema}: ${c.resumen}`).join('\n')}
Lo que eligió quien juega: ${D.elegidos.join(' · ') || '(nada)'}; le interesa: ${D.perfil.personas.slice(0, 4).join(', ')}; ${D.perfil.actividades.slice(0, 3).join(', ')}.
Propuestas de temas nuevos:\n${temas.map((t, i) => `${String.fromCharCode(65 + i)}. ${t.tema}: ${t.resumen}`).join('\n')}
Para cada propuesta: «repite» = el número de lo ya conversado que repite en lo esencial (aunque con otras palabras), o 0 si es nueva; «sigue» = 0 a 2, cuánto sigue lo que le interesa a quien juega; «contenido» = 0 a 2 (0: relleno; 2: algo cambia o se revela entre ellos).
JSON: {"juicio":[{"p":"A","repite":0,"sigue":1,"contenido":2}]}`;
    const j = await openai({ model: MODELO, messages: [{ role: 'user', content: juicio }], response_format: { type: 'json_object' } });
    const J = json(j)?.juicio || [];
    const rep = J.filter(x => +x.repite > 0).length, n = temas.length || 1;
    filas.push({ persona: k, manera, vez: v + 1, tokens: r.usage?.prompt_tokens || 0, contexto: Math.round(ya.length / 4), propuestas: temas.length, repite: rep, sigue: J.reduce((a, x) => a + (+x.sigue || 0), 0) / n, contenido: J.reduce((a, x) => a + (+x.contenido || 0), 0) / n });
    detalle.push({ persona: k, manera, vez: v + 1, temas: temas.map((t, i) => ({ ...t, ...(J[i] || {}) })) });
    process.stdout.write(`${k} · ${manera} · ${v + 1}: ${r.usage?.prompt_tokens} tokens, ${rep}/${temas.length} repiten\n`);
  }

  // el resumen por manera
  const por = m => filas.filter(f => f.manera === m), prom = (L, c) => L.reduce((a, f) => a + f[c], 0) / (L.length || 1);
  const L = ['# Experimento: cómo contarle a la IA lo ya conversado', '', `Partida: \`${PARTIDA}\` (día ${D.dia}) · personas: ${PERSONAS.join(', ')} · ${VECES} vez/veces cada una · modelo ${MODELO}`, '',
    'Cada manera le dice a la IA lo ya conversado con esa persona de una forma distinta, y le pide 5 temas nuevos. El juez ve todo (título y resumen).', '',
    '| Manera | Tokens del pedido (prom.) | Tokens de lo conversado (aprox.) | Repiten algo ya hablado | Siguen lo que interesa (0–2) | Contenido (0–2) |', '|---|---|---|---|---|---|',
    ...Object.keys(MANERAS).map(m => { const F = por(m), tot = F.reduce((a, f) => a + f.propuestas, 0), rep = F.reduce((a, f) => a + f.repite, 0);
      return `| ${m} | ${Math.round(prom(F, 'tokens'))} | ${Math.round(prom(F, 'contexto'))} | ${rep}/${tot} (${Math.round(100 * rep / (tot || 1))} %) | ${prom(F, 'sigue').toFixed(2)} | ${prom(F, 'contenido').toFixed(2)} |`; }),
    '', '## Las propuestas', ''];
  for (const d of detalle) L.push(`### ${d.persona} · ${d.manera} · ${d.vez}`, '', ...d.temas.map(t => `- ${+t.repite > 0 ? '🔁 ' : ''}**${t.tema}**: ${t.resumen} _(repite ${t.repite ?? '?'} · sigue ${t.sigue ?? '?'} · contenido ${t.contenido ?? '?'})_`), '');
  fs.mkdirSync(SALIDA, { recursive: true }); fs.writeFileSync(path.join(SALIDA, 'temas.md'), L.join('\n')); fs.writeFileSync(path.join(SALIDA, 'temas.json'), JSON.stringify({ filas, detalle }, null, 1));
  console.log('→ ' + path.join(SALIDA, 'temas.md'));
})().catch(e => { console.error(e.message); process.exit(1); });
