// El juez de la noche, calibrado: juzga con la rúbrica (nocheJuezPedido, src/js/66-noche.js) las escenas que Claude ya
// juzgó a mano (trazas/temas/notas-claude.json) y compara: el error por criterio, la correlación de las notas, si coincide
// en las que fallan (A1, A2 o A4 = 0), y lo que importa para elegir: de las 4 mejores de cada grupo según Claude, cuántas
// elige el juez. Con --veces 2, también cuánto se contradice a sí mismo. Se juzga por grupos (una noche: lo que el juez ve
// de una vez), con la partida en que se escribieron.
// Uso: OPENAI_API_KEY=… node tools/juez.js [--modelos gpt-5.4-mini,gpt-5.4] [--veces 2] [--notas trazas/temas/notas-claude.json]
//        [--partida tools/noche/partidas/curiosa.json] [--salida trazas/temas]
const fs = require('fs'), path = require('path'), { chromium } = require('playwright');
const RAIZ = path.join(__dirname, '..'), arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const MODELOS = arg('modelos', 'gpt-5.4-mini').split(','), VECES = +arg('veces', 1), NOTAS = arg('notas', 'trazas/temas/notas-claude.json');
const PARTIDA = arg('partida', 'tools/noche/partidas/curiosa.json'), SALIDA = path.resolve(RAIZ, arg('salida', 'trazas/temas'));
const EXE = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;

async function openai(cuerpos){
  const key = process.env.OPENAI_API_KEY; if (!key) throw new Error('no hay OPENAI_API_KEY');
  let ultimo = null;
  for (const body of cuerpos) for (let intento = 0; intento < 3; intento++) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', { method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + key }, body: JSON.stringify(body), signal: AbortSignal.timeout(300000) });
    const d = await res.json().catch(() => ({})); if (res.ok) return d;
    ultimo = new Error(`OpenAI ${res.status}: ${d.error?.message}`);
    if (res.status === 400 || res.status === 404) break;   // (this body, or this model, does not go: the next body)
    if (res.status !== 429 && res.status < 500) throw ultimo;
    await new Promise(r => setTimeout(r, 4000 * (intento + 1)));
  }
  throw ultimo;
}
const prom = L => L.reduce((a, b) => a + b, 0) / (L.length || 1);
function pearson(x, y){ const mx = prom(x), my = prom(y); let a = 0, b = 0, c = 0; for (let i = 0; i < x.length; i++) { a += (x[i] - mx) * (y[i] - my); b += (x[i] - mx) ** 2; c += (y[i] - my) ** 2; } return a / Math.sqrt(b * c || 1); }
const falla = n => n[0] === 0 || n[1] === 0 || n[3] === 0;

(async () => {
  const D = JSON.parse(fs.readFileSync(path.resolve(RAIZ, NOTAS), 'utf8')), E = D.escenas, grupos = {};
  for (const e of E) (grupos[e.version] ||= []).push(e);   // (a group: the 8 of one version, as the judge would see the candidates of a night)
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] }); const pg = await (await b.newContext()).newPage();
  await pg.addInitScript(([s]) => { Object.defineProperty(navigator, 'webdriver', { get: () => false }); localStorage.setItem('avonlea', s); }, [fs.readFileSync(path.resolve(RAIZ, PARTIDA), 'utf8')]);
  await pg.goto('file://' + path.join(RAIZ, 'index.html') + '?dev'); await pg.waitForFunction(() => window.__avonlea?.ev && window.__avonlea.ev('DIALOGOS.length') > 0, null, { timeout: 30000 });
  const ev = (s, a) => pg.evaluate(([s, a]) => { const v = window.__avonlea.ev(s); return typeof v === 'function' ? v(a) : v; }, [s, a]);
  const res = {};   // modelo → vez → id → { notas, total, razones }
  for (const m of MODELOS) for (let v = 0; v < VECES; v++) for (const [g, L] of Object.entries(grupos)) {
    const B = L.map(e => ({ tipo: 'conversacion', texto: e.texto }));
    try {
      const P = await ev(`(([B, m]) => nocheJuezPedido(B, m, 'efectos'))`, [B, m]), data = await openai(await ev('(p => nocheJuezCuerpos(p))', P));
      const J = await ev('(([d, n]) => nocheJuezLeer(d, n))', [data, B.length]);
      L.forEach((e, i) => { if (J[i]) ((res[m] ||= [])[v] ||= {})[e.id] = J[i]; });
      process.stdout.write(`${m} · vez ${v + 1} · ${g}: ${J.filter(Boolean).length}/${B.length} (${data.usage?.prompt_tokens} tokens)\n`);
    } catch (e) { process.stdout.write(`${m} · vez ${v + 1} · ${g}: ${e.message}\n`); ((res[m] ||= [])[v] ||= {}).error = e.message; }
  }
  await b.close();

  // the comparison
  const Lm = ['# El juez de la noche, calibrado contra las notas de Claude', '', `Escenas: ${E.length} (\`${NOTAS}\`, juzgadas a mano con trazas/temas/rubrica.md) · partida \`${PARTIDA}\` · ${VECES} vez/veces por modelo`, '',
    'El juez ve las escenas de a una versión por vez (8, como los candidatos de una noche). «Elige bien» = de las 4 mejores de cada grupo según Claude, cuántas están entre las 4 que elegiría el juez (nocheElegir, sin la regla de una por persona).', '',
    '| Modelo | Escenas juzgadas | Error medio por criterio (0–2) | Error del total (de 18) | Correlación del total | Media del juez / de Claude | Coincide en las que fallan | Elige bien (de las 4 mejores) | Se contradice (total, entre veces) |', '|---|---|---|---|---|---|---|---|---|'];
  const porCriterio = {};
  for (const m of MODELOS) {
    const V = (res[m] || []).filter(Boolean), r = V[0] || {}, ids = E.filter(e => r[e.id]);
    if (!ids.length) { Lm.push(`| ${m} | 0 (${(res[m] || [])[0]?.error || 'sin respuesta'}) | | | | | | | |`); continue; }
    const err = ids.map(e => prom(e.notas.map((x, k) => Math.abs(x - r[e.id].notas[k])))), errT = ids.map(e => Math.abs(e.total - r[e.id].total));
    porCriterio[m] = D.criterios.map((c, k) => ({ c, error: prom(ids.map(e => Math.abs(e.notas[k] - r[e.id].notas[k]))), juez: prom(ids.map(e => r[e.id].notas[k])), claude: prom(ids.map(e => e.notas[k])) }));
    const coinc = ids.filter(e => falla(e.notas) === falla(r[e.id].notas)).length;
    let bien = 0, tot = 0;
    for (const L of Object.values(grupos)) { const G = L.filter(e => r[e.id]); if (G.length < 5) continue;
      const top = new Set([...G].sort((a, b) => b.total - a.total).slice(0, 4).map(e => e.id)), juez = [...G].sort((a, b) => (falla(r[a.id].notas) - falla(r[b.id].notas)) || r[b.id].total - r[a.id].total).slice(0, 4);
      bien += juez.filter(e => top.has(e.id)).length; tot += 4; }
    const contra = V.length > 1 ? prom(ids.filter(e => V[1][e.id]).map(e => Math.abs(V[0][e.id].total - V[1][e.id].total))).toFixed(2) : '—';
    Lm.push(`| ${m} | ${ids.length} | ${prom(err).toFixed(2)} | ${prom(errT).toFixed(2)} | ${pearson(ids.map(e => e.total), ids.map(e => r[e.id].total)).toFixed(2)} | ${prom(ids.map(e => r[e.id].total)).toFixed(1)} / ${prom(ids.map(e => e.total)).toFixed(1)} | ${coinc}/${ids.length} | ${bien}/${tot} | ${contra} |`);
  }
  Lm.push('', '## Por criterio (error medio; media del juez y de Claude)', '', `| Criterio | ${MODELOS.join(' | ')} |`, `|---|${MODELOS.map(() => '---|').join('')}`,
    ...D.criterios.map((c, k) => `| ${c} | ${MODELOS.map(m => porCriterio[m] ? `${porCriterio[m][k].error.toFixed(2)} (${porCriterio[m][k].juez.toFixed(2)} / ${porCriterio[m][k].claude.toFixed(2)})` : '—').join(' | ')} |`), '');
  Lm.push('## Escena por escena (Claude · cada modelo, primera vez)', '', `| Escena | Claude | ${MODELOS.join(' | ')} |`, `|---|---|${MODELOS.map(() => '---|').join('')}`,
    ...E.map(e => `| ${e.version} \`${e.id}\` | ${e.total} (${e.notas.join(' ')}) | ${MODELOS.map(m => { const j = res[m]?.[0]?.[e.id]; return j ? `${j.total} (${j.notas.join(' ')})` : '—'; }).join(' | ')} |`), '');
  Lm.push('## Lo que dijo el juez', '', ...MODELOS.flatMap(m => [`### ${m}`, '', ...E.map(e => res[m]?.[0]?.[e.id] ? `- \`${e.id}\` (${res[m][0][e.id].total}; Claude ${e.total}): ${res[m][0][e.id].razones}` : null).filter(Boolean), '']));
  fs.mkdirSync(SALIDA, { recursive: true });
  fs.writeFileSync(path.join(SALIDA, 'juez.md'), Lm.join('\n')); fs.writeFileSync(path.join(SALIDA, 'juez.json'), JSON.stringify(res, null, 1));
  console.log(Lm.join('\n')); console.log('→ ' + path.join(SALIDA, 'juez.md'));
})().catch(e => { console.error(e.message); process.exit(1); });
