#!/usr/bin/env node
/* Writes docs/CATALOGO.md: the catalogue of the world model (what the state has, the actions, the goals, the favours,
   the things, the places, the people and the test goals), the data read from the game itself so it never goes stale.
     node tools/catalogo.js [--out docs/CATALOGO.md] */
const path = require('path'), fs = require('fs');
let pw; try { pw = require('playwright'); } catch (e) { pw = require('/opt/node22/lib/node_modules/playwright'); }
const argv = process.argv.slice(2), oi = argv.indexOf('--out'), out = oi >= 0 ? argv[oi + 1] : path.resolve(__dirname, '..', 'docs', 'CATALOGO.md');
const exe = process.env.PLAYWRIGHT_CHROMIUM || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);

(async () => {
  const b = await pw.chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
  const pg = await b.newPage();
  await pg.addInitScript(() => { localStorage.clear(); localStorage.setItem('avonlea-ai-asked', '1'); });
  await pg.goto('file://' + path.resolve(__dirname, '..', 'index.html')); await pg.waitForFunction(() => window.__avonlea);
  const D = await pg.evaluate(() => {
    const A = window.__avonlea, d = A.wmData(), s = A.wmNow();
    return { ...d, tests: A.WM_TESTS.map((T, i) => ({ i, who: A.wmName(T.who), text: T.text, ask: !!T.ask, goals: !!T.goals, favors: (T.favors || []).map(f => f.f + ' → ' + A.wmName(f.to)) })),
      names: Object.fromEntries(Object.keys(d.WHO).map(k => [k, A.wmName(k)])), state: { keys: Object.keys(s), pos: s.pos, cows: s.cows, stock: s.stock, t: s.t } };
  });
  await b.close();
  const nm = k => D.names[k] || k, item = (x, n = 1) => (D.ITEM_NAME[x]?.[n > 1 ? 1 : 0] || D.ITEM_NAME[x]?.[0]) || x, list = a => (a && a.length ? a.join(', ') : '—');
  const L = [];
  L.push('# Catálogo del modelo del mundo', '',
    '> Generado por `node tools/catalogo.js` a partir de los datos del juego (no editar a mano). La explicación de cómo se usa todo esto para planificar está en [PLANIFICADOR.md](PLANIFICADOR.md).', '');
  // --- the state
  L.push('## 1. El estado (lo que el planificador sabe del mundo)', '',
    'Un estado es una foto del mundo hecha de datos (`wmNow()`), y el planificador trabaja sobre copias de ella. Sus componentes:', '',
    '| Componente | Qué guarda | Ejemplo |', '|---|---|---|',
    '| `t` | la hora, en minutos desde la medianoche | `' + D.state.t + '` (= ' + Math.floor(D.state.t / 60) + ':' + String(D.state.t % 60).padStart(2, '0') + ') |',
    '| `pos` | dónde está cada persona, como un **lugar** (ver §6): un punto del mapa (`granero`, `huerto`…), `cocina` (adentro de Tejas Verdes), `h:casa` (adentro de otra casa) o `p:quien` (afuera, donde esa persona esté) | `ana: "' + D.state.pos.ana + '"` |',
    '| `invs` | lo que cada uno tiene: `{ cosa: cantidad }` | `ana: { huevos: 6, cuerda: 1 }` |',
    '| `cows` | dónde está cada vaca: `corral`, `potrero`, `c:vaca` (suelta, donde esté), `led:quien` (alguien la lleva de la cuerda), `sold:quien` (vendida) | `' + JSON.stringify(D.state.cows) + '` |',
    '| `rel` | cuánto quiere cada uno a cada otro, de -2 a 5 (`"a>b"`: lo que a siente por b) | `"diana>ana": 5` |',
    '| `ofensa` | ofensas pendientes (`"a>b"`: a está ofendido con b, y por qué) | `"ana>gilbert": "zanahorias"` |',
    '| `know` | lo que cada uno sabe (noticias) | `lynde: ["vendio_vaca"]` |',
    '| `follow` | quién acompaña a quién | `diana: "ana"` |',
    '| `facts` | hechos del día: a quién se le pidió qué, quién se disculpó, quién regaló qué… (se usan para no repetir) | `"pedido:traer:ana": 1`, `"dio:marilla:hecha_a_mano": 1` |',
    '| `stock` | lo que queda para recoger hoy | `' + JSON.stringify(D.state.stock) + '` |', '');
  // --- the actions
  L.push('## 2. Las acciones (verbos)', '',
    'Las mismas para todos (Ana y los demás). Cada una tiene una **condición** (cuándo se puede), un **costo** en minutos y un **efecto** sobre el estado. «Aquí» es el lugar de quien actúa; «alguien presente» es otra persona en el mismo lugar.', '',
    '| Acción | Se puede cuando… | Costo (min) | Efecto |', '|---|---|---|---|',
    '| `ir` a un lugar | no es alguien que no sale (quieto: Marilla, la Sra. Barry, un enfermo) | el camino: distancia × 1,3 ÷ velocidad (+2 si entra o sale de una casa) | cambia su `pos` (y la de quien lo acompaña) |',
    '| `tomar` una cosa | el lugar la ofrece para tomar y no la tiene | 1 | +1 de esa cosa |',
    '| `recoger` | el lugar la ofrece para recoger y queda `stock` | 3 | +3 (huevos: todos; ramo: 1), −stock |',
    '| `cocinar` algo | está en su cocina y tiene los ingredientes de la receta | 10 | −ingredientes, +1 del plato |',
    '| `dar` una cosa a alguien presente | la tiene | 1 | pasa de uno a otro; si al otro le gusta (por etiqueta), sube su cariño una vez al día; deja el hecho `dio:…` |',
    '| `vender` la vaca | lleva una vaca de su familia y alguien presente compra animales | 5 | vaca → `sold:comprador`, + dólares; ambos saben la noticia |',
    '| `cambiar` (trueque) | está con el tendero, la tienda abierta, y tiene con qué pagar el gusto | 4 | −lo que entrega, +el gusto (cinta, caramelos) |',
    '| `comprar` a la libreta | es de los Cuthbert y está en la tienda abierta | 4 | +1 (azúcar, cuerda), anotado en la libreta |',
    '| `conversar` con alguien presente | uno sabe algo que el otro no | 2 | ambos quedan sabiendo lo mismo |',
    '| `disculparse` con alguien presente | ese alguien está ofendido con quien actúa y hoy no se ha disculpado | 2 | sube el cariño (+2 si el otro es sensible o generoso, +1 si no); puede borrar la ofensa |',
    '| `interceder` | la meta es hablar por alguien y está con esa persona | 2 | el otro quiere un poco más a aquel por quien se habló |',
    '| `pedir` un favor a alguien presente | el favor está permitido (§4), el otro lo quiere ≥ 2 o es generoso, y hoy no se lo pidió | 2 + espera del favor (+40 si quien pide no es quieto) | el efecto del favor (lo que el otro va a lograr); en el mundo, al otro se le instala una meta |',
    '| `pedir` mandando a llamar | quien pide es quieto y el favor es para Ana (que no está ahí) | 2 + espera + 25 | igual; en el mundo, Ana va hasta la persona y entonces se le pide |',
    '| `guiar` una vaca | tiene cuerda, la vaca está aquí, no lleva otra, y es de su familia o anda suelta | 2 | vaca → `led:quien` |',
    '| `soltar` la vaca | la lleva y está en el corral o el potrero | 1 | vaca → ese lugar |', '');
  // --- the goals
  L.push('## 3. Las metas', '',
    'Una meta es una **condición** sobre el estado (`test`) y una estimación de **cuántos pasos faltan** (`h`, la heurística de A*). Cada meta dice también qué cosas, personas y lugares importan para ella (el planificador mira solo esos).', '',
    '| Meta | Se cumple cuando… | Heurística h (pasos que faltan) |', '|---|---|---|',
    '| `tener(quien, cosa, n)` | quien tiene al menos n | 0 si ya; si no 1 + (1 si nadie la tiene / 2 si hay que cocinarla) |',
    '| `dinero(quien, n)` | quien junta n dólares | vender hecho 1, cocinar 2, recoger 3 por dólar (máx. 4) |',
    '| `regalo_gusto(quien, a)` | a recibió algo con una etiqueta que le gusta | 0 / 2 |',
    '| `reconciliar(quien, a)` | a lo quiere ≥ 2 y no está ofendido | 1 por cada cosa que falte |',
    '| `intercede(a, por)` | se habló con a por alguien | 0 / 1 |',
    '| `rel_min(a, b, n)` | a quiere a b al menos n | lo que falta |',
    '| `estar_en(quien, lugar, hasta, quedar)` | quien está ahí (antes de la hora límite); con `quedar`, al llegar se queda (en la escuela, adentro, en clases) hasta esa hora y recién ahí la meta termina | 0 / 1 (y la búsqueda descarta lo que pase de la hora) |',
    '| `vaca_en(vaca, lugar)` | la vaca está en ese corral o potrero | 0 / 1 si alguien la lleva / 2 |',
    '| `vaca_vendida(vaca, a)` | vendida (a esa persona) | 0 / 1 / 2 |',
    '| `conoce(quien, noticia)` | quien sabe la noticia | 0 / 1 |',
    '| `acompana(a, b)` | a acompaña a b | 0 / 1 |',
    '| `te_con(quien, invitado, lugar)` | los dos están en el lugar y quien tiene té | 1 por cada cosa que falte |',
    '| `regalar_cosa(quien, cosa)` | esa cosa fue regalada | 0 / 1 si la tiene / 2 |', '');
  // --- favours
  L.push('## 4. Los favores (lo que se le puede pedir a otro)', '',
    'Pedir un favor es una acción más; si el otro acepta, en el mundo se le instala una **meta propia** (y él puede, a su vez, pedirle a un tercero: cadenas de hasta tres).', '',
    '| Favor | Se puede pedir si… | Lo que hace verdadero | Meta que recibe quien acepta | Espera (min) |', '|---|---|---|---|---|',
    '| `traer` cosa, n | no es a uno mismo; un quieto solo si ya la tiene | quien pide tiene n más | `tener(quien pide, cosa, n)` | 45 |',
    '| `vender_vaca` | se le pide a un Cuthbert y la vaca no está vendida | la vaca vendida a quien pide | `vaca_vendida` | 45 |',
    '| `encerrar_vaca` | no es quieto y nadie lleva ni compró la vaca | la vaca en su corral | `vaca_en` | 45 |',
    '| `interceder` por alguien | el destinatario quiere ≥ 4 a quien intercede | (+1 de cariño hacia quien pide) | `intercede` | 20 |',
    '| `pasear` | con Ana | quien pide la acompaña | — | — |',
    '| `venir` | a Ana | Ana acompaña a quien pide | — | — |', '',
    'A quién se le puede pedir sin que la meta lo diga: a los de su casa o a un amigo (cariño ≥ 3); quien no sale, solo a quien está con él, o manda a llamar a Ana.', '');
  // --- things
  L.push('## 5. Las cosas', '',
    '| Cosa | Etiquetas | Receta | Vale en trueque | Valor |', '|---|---|---|---|---|');
  for (const [x, t] of Object.entries(D.THINGS)) L.push(`| ${item(x)} (\`${x}\`) | ${list(t.tags)} | ${t.receta ? Object.keys(t.receta).length ? Object.entries(t.receta).map(([i, n]) => n + ' ' + item(i, n)).join(' + ') : '(nada: se hace en la cocina)' : '—'} | ${D.TRADE[x] != null ? Math.round(D.TRADE[x] * 100) / 100 : '—'} | ${t.valor ?? '—'} |`);
  L.push('', `Gustos de la tienda (precio en trueque): ${Object.entries(D.TREATS).map(([k, v]) => item(k) + ' ' + v).join(', ')}. A la libreta de los Cuthbert: ${D.LIBRETA.map(item).join(', ')}.`, '');
  // --- places
  L.push('## 6. Los lugares', '', '| Lugar | Nombre | Qué se puede hacer ahí |', '|---|---|---|');
  for (const [p, n] of Object.entries(D.WP_NAME)) { const o = D.OFRECE[p] || {}; L.push(`| \`${p}\` | ${n} | ${[...(o.tomar || []).map(x => 'tomar ' + item(x)), ...(o.recoger || []).map(x => 'recoger ' + item(x))].join(', ') || (p === 'cocina' ? 'cocinar (los de Tejas Verdes)' : p === 'tienda' ? 'trueque y libreta (de 8 a 18)' : p === 'corral' || p === 'potrero' ? 'soltar una vaca' : '—')} |`); }
  L.push('', 'Además: `cocina` es adentro de Tejas Verdes, `h:casa` adentro de cualquier otra casa, `p:quien` el punto del mapa donde está esa persona y `c:vaca` donde está una vaca suelta.', '');
  // --- people
  L.push('## 7. Las personas', '', '| Persona | Carácter | Le gusta | Compra / vende | Cocina en | Otros |', '|---|---|---|---|---|---|');
  for (const [k, w] of Object.entries(D.WHO)) L.push(`| ${nm(k)} (\`${k}\`) | ${list(w.caracter)} | ${list(w.le_gusta)} | ${[w.compra?.animal ? 'compra vacas (' + w.compra.animal + ' dólares)' : '', w.trueque ? 'trueque' : ''].filter(Boolean).join(', ') || '—'} | ${w.cocina ? D.WP_NAME[w.cocina] || w.cocina : '—'} | ${[w.quieto ? 'no sale de casa' : '', w.abre ? 'abre de ' + w.abre[0] + ' a ' + w.abre[1] : '', w.inv ? 'tiene ' + Object.entries(w.inv).map(([x, n]) => n + ' ' + item(x, n)).join(', ') : '', D.PACE[k] ? 'camina a ' + D.PACE[k] : '', D.FOCO[k] ? 'enfoque ' + D.FOCO[k][0] + ', social ' + D.FOCO[k][1] : ''].filter(Boolean).join(' · ')} |`);
  L.push('', 'Reglas sociales (las mismas en el plan y en el mundo): pedir funciona si el otro te quiere ≥ 2 o es generoso; un regalo con una etiqueta que le gusta sube el cariño (una vez al día); disculparse sube el cariño (+2 si es sensible o generoso); interceder exige que el destinatario quiera ≥ 4 a quien habla.', '');
  // --- tests
  L.push('## 8. Las metas de prueba (panel 🎯)', '', '| # | Quién | Meta | Favores que se le sugieren |', '|---|---|---|---|');
  for (const T of D.tests) L.push(`| ${T.i} | ${T.who} | ${T.text}${T.ask ? ' *(Ana pide el favor)*' : ''}${T.goals ? ' *(varias metas)*' : ''} | ${list(T.favors)} |`);
  L.push('', 'Cómo se cumplió cada una, dibujado en el mapa: [`trazas/metas.pdf`](../trazas/metas.pdf) (`node tools/trace_goal.js --pdf trazas/metas.pdf`).', '');
  fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, L.join('\n')); console.log('→ ' + out);
})();
