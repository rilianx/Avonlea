/* ---------- calling the AI ---------- */
async function post(url, headers, body){
  const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 45000);
  let res;
  try { res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body), signal: ctl.signal }); }
  catch (e) { throw new Error(e.name === 'AbortError' ? 'tardó demasiado' : 'sin conexión'); }
  finally { clearTimeout(timer); }
  return { res, data: await res.json().catch(() => ({})) };
}
function httpError(res, data){
  const quota = res.status === 429 && /quota|billing|credit/i.test((data.error?.code || '') + ' ' + (data.error?.type || '') + ' ' + (data.error?.message || ''));
  const e = new Error(quota ? 'la cuenta no tiene saldo (429)' : { 401: 'la clave no es válida', 403: 'la clave no tiene permiso', 429: 'demasiados pedidos seguidos (429)', 529: 'el servicio está saturado' }[res.status] || ('error ' + res.status + (data.error?.message ? ': ' + data.error.message : '')));
  e.status = res.status; e.quota = quota; e.retry = +res.headers?.get?.('retry-after') || 0; return e;
}
function parseJSON(txt){ try { const o = JSON.parse(txt); if (o && typeof o === 'object') return o; } catch (e) {} throw new Error('respuesta incompleta'); }
/* the gate to the AI: at most two requests at a time, a little apart; when the service says 429 (too many requests,
   or no credit), every request waits: the pause grows each time (30 s, 1, 2, 4... up to 10 minutes; with no credit,
   10 minutes) and meanwhile the game goes on without the AI (the written lines, the routines) */
const aiGate = { busy: 0, last: 0, until: 0, back: 0, hits: 0 };
async function aiCall(messages, schema = AI_SCHEMA){
  if (provider() === 'manual') return manualCall(messages, schema);
  if (performance.now() < aiGate.until) throw new Error('la IA está en pausa');
  while (aiGate.busy >= 2 || performance.now() - aiGate.last < 700) await new Promise(r => setTimeout(r, 250));
  if (performance.now() < aiGate.until) throw new Error('la IA está en pausa');
  aiGate.busy++; aiGate.last = performance.now();
  try { const r = await (provider() === 'openai' ? openaiCall(messages, schema) : claudeCall(messages, schema)); aiGate.back = 0; return r; }
  catch (e) {
    if (e.status === 429 || e.status === 529) {
      aiGate.hits++; aiGate.back = e.quota ? 600 : Math.min(600, Math.max(e.retry || 0, aiGate.back ? aiGate.back * 2 : 30));
      aiGate.until = performance.now() + aiGate.back * 1000;
      notice(e.quota ? '✒ La cuenta de la IA no tiene saldo (429). Sigo sin IA por 10 minutos; revisa tu saldo.' : `✒ La IA pide calma (${e.status}: demasiados pedidos). Sigo sin IA por ${aiGate.back >= 60 ? Math.round(aiGate.back / 60) + ' min' : aiGate.back + ' s'} y luego vuelvo a intentar.`);
    }
    throw e;
  } finally { aiGate.busy--; }
}
/* the instructions for the AI, per request: only the part that request needs (and in the minimal mode, a short version) */
const SYS = (() => {
  const head = [], sec = {};
  for (const p of AI_SYSTEM.split(/\n\n(?=[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ ]{4,}(?: \(|\n))/)) { const k = p.split('\n')[0].replace(/ \(.*/, '').trim(); if (/^(ESCENAS|ANA POR|FIN DEL|GUIÓN|RAMA|JUEZ|PLANIFICAR)/.test(k)) sec[k] = p; else head.push(p); }
  return { head: head.join('\n\n'), sec };
})();
const SYS_FOR = { 'una escena': ['ESCENAS DE CONVERSACIÓN'], 'Ana decide': ['ANA POR SU CUENTA'], 'el fin del día': ['FIN DEL DÍA'], 'el guión del día': ['GUIÓN DEL DÍA'], 'una rama de la historia': ['GUIÓN DEL DÍA', 'RAMA NUEVA'], 'el juez de la historia': ['JUEZ DE LA HISTORIA'], 'los planes del día': ['PLANIFICAR'], 'un cambio de plan': ['PLANIFICAR'] };
const voiceShort = k => CH[k].voice.split(/(?<=\.)\s/).reduce((a, x) => a.length < 110 ? (a ? a + ' ' : '') + x : a, '');
const MIN_HEAD = (cast = true) => `Eres la voz de los personajes de «Un día en Avonlea», un juego tranquilo inspirado en «Ana de las Tejas Verdes» (L. M. Montgomery), hacia 1880. Español, tuteo en la familia; tono tierno y con humor, como el libro. Ana Shirley: 11 años, pelirroja, huérfana adoptada por los Cuthbert; soñadora, muy conversadora, de palabras grandiosas e imaginación desbordante. Nada moderno (ni juegos, ni IA). No inventes sucesos que el juego tendría que mostrar. Responde solo con el JSON pedido; los campos que no se usan van vacíos ("", 0, [], "ninguno" o "ninguna").${cast ? '\nPERSONAJES: ' + Object.keys(CH).map(k => NAMES[k] + ': ' + voiceShort(k)).join(' | ') : ''}`;
const MIN_SEC = {
  'una escena': sch => `ESCENA: "lineas" (de 2 a 5): lo que dicen en voz alta Ana y los PRESENTES, cada uno con su voz; Ana es la que más habla (hasta 25 palabras por línea; los demás, 15). Que termine sin dejar una pregunta abierta. Respeta lo que es verdad ahora y no repitas lo ya dicho. "resumen": una frase en tercera persona de lo importante, o "".`
    + (sch?.properties?.encargo ? ` De vez en cuando el personaje puede pedirle a Ana un "encargo" (traer "cantidad" de "item" a "para", regar, cocinar tarta/compota/te, recado a "para", ir a "lugar"; nunca si ya tiene 3 o uno suyo pendiente) o hacer una "accion" (regalar, acompanar, ir); si no, "ninguno"/"ninguna".` : '')
    + (sch?.properties?.ana_va ? ` "ana_va": solo si lo que Ana dijo es que se va: irse, lugar (${Object.keys(PLACES).join(', ')}), casa (gg, os, rl, ga), persona o dormir; si no, "ninguna".` : ''),
  'Ana decide': () => 'ANA DECIDE: elige la opción que Ana elegiría ahora, por su carácter y el momento, sin repetir lo último ("eleccion": su número); "pensamiento": lo que dice en voz alta (una frase).',
  'el fin del día': () => 'FIN DEL DÍA: "relaciones": solo los cambios que el día justifica (casi siempre pocos o ninguno), "cambio" -1, 0 o 1 y una "nota" breve; "impresiones": como mucho una por personaje que vivió algo importante (una frase).',
  'el guión del día': () => `GUIÓN: una historia breve para hoy, inspirada en un episodio de los libros o de la serie, tierna y con humor, jugable aquí (conversar, ir a lugares, encargos). De 2 a 5 escenas en orden, con "hora" entre la indicada y las 20: "id" breve; "lugar" (clave); "personajes" (sin Ana; Diana solo afuera o en os; en ga Ana está sola); "que_pasa" (1 o 2 frases); "pista" (12 palabras como máximo, sin contar el final); "encargo" (o "ninguno"); "fin": llega_ana, encargo_cumplido o evento (con "evento"); "efectos" al empezar o terminar (${Object.entries(STORY_EFFECTS).map(([k, f]) => k + ': ' + f.desc).join('; ')}; animales: ${Object.keys(ANIMALS).join(', ')}; áreas: ${Object.keys(AREAS).join(', ')}; estados de Ana: ${Object.keys(ANA_STATES).join(', ')}); "frases": hasta 3 frases clave o []; "requiere": ids o eventos que deben pasar antes; "clave": true si sin ella la historia no puede seguir; "contra": eventos que la desvían. Eventos: ${Object.keys(STORY_EVENTS).join(', ')}.`,
  'una rama de la historia': () => MIN_SEC['el guión del día']() + '\nRAMA NUEVA: la historia se desvió; escribe cómo sigue (de 1 a 3 escenas, mismo formato) desde lo que de verdad pasó, con el mismo tono; "titulo_rama" y "resumen".',
  'el juez de la historia': () => 'Eres el juez de la historia de un juego: con la bitácora de lo que de verdad pasó, dices si cada escena del plan se cumplió. Responde solo con el JSON pedido.\nJUEZ: para cada escena, "cumplida" si lo esencial ya pasó según la bitácora (aunque fuera distinto), "sigue" si aún puede pasar, "no_puede" si ya no; ante la duda, "sigue". "nota": una frase.',
  'los planes del día': () => 'PLANES: planes sencillos y propios de la vida de cada uno, solo con lo que puede hacer.',
  'un cambio de plan': () => 'PLANES: planes sencillos y propios de su vida, solo con lo que puede hacer.',
};
function sysFor(schema){
  const kind = aiqKind(schema);
  if (kind === 'un encuentro') return ENC_SYS;   // (the people of the village: a short request, a short instruction)
  if (!FULL() && kind === 'el juez de la historia') return MIN_SEC[kind]();   // (the judge needs no characters)
  if (!FULL() && kind === 'una escena') return MIN_HEAD(false) + '\n\n' + MIN_SEC[kind](schema);   // (the voices come in the request, only of who is there)
  if (!FULL() && MIN_SEC[kind]) return MIN_HEAD() + '\n\n' + MIN_SEC[kind](schema);
  const secs = SYS_FOR[kind]; return secs ? SYS.head + '\n\n' + secs.map(k => SYS.sec[k] || '').join('\n\n') : AI_SYSTEM;
}
/* the tokens spent: every answer of the AI says how many it read (some of them from the cache, cheaper) and wrote;
   kept in this browser, by kind of request, until put back to zero */
let TOK = { calls: 0, in: 0, cached: 0, out: 0, kinds: {}, since: Date.now() };
try { const t = JSON.parse(localStorage.getItem('avonlea-tokens') || 'null'); if (t && t.kinds) TOK = t; } catch (e) {}
function tokCount(schema, inp, cached, out, reason = 0){
  const k = TOK.kinds[aiqKind(schema)] = TOK.kinds[aiqKind(schema)] || { calls: 0, in: 0, cached: 0, out: 0 };
  for (const o of [TOK, k]) { o.calls++; o.in += inp; o.cached += cached; o.out += out; o.reason = (o.reason || 0) + reason; }
  try { localStorage.setItem('avonlea-tokens', JSON.stringify(TOK)); } catch (e) {}
  tokDraw();
}
const kfmt = n => n >= 1e6 ? (n / 1e6).toFixed(2).replace('.', ',') + ' M' : n >= 1e3 ? (n / 1e3).toFixed(1).replace('.', ',') + ' k' : String(n);
function tokDraw(){
  const all = TOK.in + TOK.cached + TOK.out, chip = $('tok');
  chip.hidden = !TOK.calls; chip.textContent = '🪙 ' + kfmt(all) + ' tokens';
  if ($('ai').hidden) return;
  $('aitok').innerHTML = TOK.calls ? `<b>Tokens gastados</b> (desde el ${new Date(TOK.since).toLocaleDateString()}): ${kfmt(TOK.in)} de entrada, ${kfmt(TOK.cached)} desde el caché (más baratos), ${kfmt(TOK.out)} de salida${TOK.reason ? ` (${kfmt(TOK.reason)} de ellos, razonamiento)` : ''}; ${TOK.calls} llamadas.<br>`
    + Object.entries(TOK.kinds).sort((a, b) => (b[1].in + b[1].cached + b[1].out) - (a[1].in + a[1].cached + a[1].out)).map(([k, o]) => `· ${k}: ${o.calls} × ≈${kfmt(Math.round((o.in + o.cached + o.out) / o.calls))} = ${kfmt(o.in + o.cached + o.out)}`).join('<br>')
    + ' <button id="toknull">Poner en cero</button>' : '<b>Tokens gastados:</b> todavía ninguno.';
  const left = Math.ceil((aiGate.until - performance.now()) / 1000); if (left > 0) $('aitok').innerHTML += `<br>⏸ La IA está en pausa por un error 429 (demasiados pedidos o sin saldo): vuelve a intentar en ${left} s. Mientras tanto, el juego sigue sin IA.`;
  $('toknull')?.addEventListener('click', () => { TOK = { calls: 0, in: 0, cached: 0, out: 0, kinds: {}, since: Date.now() }; try { localStorage.setItem('avonlea-tokens', JSON.stringify(TOK)); } catch (e) {} tokDraw(); });
}
/* the log of the last requests: what was sent (the instructions and the request), what came back, and what it cost;
   to look at in ✒ («Ver registro») or to download whole */
let AILOG = []; try { AILOG = JSON.parse(localStorage.getItem('avonlea-ailog') || '[]'); } catch (e) {}
function aiLogPush(schema, model, sys, messages, out, inTok, cached, outTok, reason, effort){
  AILOG.push({ at: Date.now(), hora: fmtHour(hourNow()), kind: aiqKind(schema), model, effort, sys, user: messages.map(m => m.content).join('\n\n'), schema: JSON.stringify(schema).length, out, tok: { in: inTok, cached, out: outTok, reason } });
  if (AILOG.length > 30) AILOG.splice(0, AILOG.length - 30);
  try { localStorage.setItem('avonlea-ailog', JSON.stringify(AILOG)); } catch (e) { AILOG.splice(0, 15); }
}
function aiLogShow(){
  const o = $('aiout'); o.hidden = false;
  if (!AILOG.length) { o.textContent = 'Todavía no hay pedidos registrados.'; return; }
  o.innerHTML = '<b>Últimos pedidos</b> (el más reciente primero). Los tokens de entrada son: instrucciones + pedido + el formato (JSON Schema); los de salida incluyen el razonamiento del modelo. <button id="ailogdl">Descargar todo (JSON)</button><br>'
    + [...AILOG].reverse().map(r => `<details><summary>${esc(r.hora)} · ${esc(r.kind)} · entrada ${r.tok.in} (caché ${r.tok.cached}) · salida ${r.tok.out}${r.tok.reason ? ' (razonamiento ' + r.tok.reason + ')' : ''} · ${esc(r.model)}${r.effort ? ' / ' + esc(r.effort) : ''}</summary>`
      + `Instrucciones: ${r.sys.length} caracteres · pedido: ${r.user.length} · formato: ${r.schema} · respuesta: ${r.out.length}\n\n— PEDIDO —\n${esc(r.user)}\n\n— RESPUESTA —\n${esc(r.out)}\n\n— INSTRUCCIONES —\n${esc(r.sys)}</details>`).join('');
  $('ailogdl').addEventListener('click', () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(AILOG, null, 1)], { type: 'application/json' })); a.download = 'avonlea-pedidos-ia.json'; a.click(); });
}
/* the AI by hand, to debug: each request waits in a little panel (and in window.__avonlea.aiq) until someone answers
   it with JSON in the requested shape — the player, another AI they paste it into, or whoever is testing the game */
const aiq = { list: [], seq: 0, skip: new Set() };
const aiqKind = sch => { const p = Object.keys(sch.properties || {}); return p.includes('conversacion') ? 'un encuentro' : p.includes('lineas') ? 'una escena' : p.includes('titulo_rama') ? 'una rama de la historia' : p.includes('escenas') ? 'el guión del día' : p.includes('veredictos') ? 'el juez de la historia' : p.includes('eleccion') ? 'Ana decide' : p.includes('relaciones') ? 'el fin del día' : p.includes('planes') ? 'los planes del día' : p.includes('pasos') ? 'un cambio de plan' : 'un pedido'; };
function skel(sc){ if (!sc) return null; if (sc.enum) return sc.enum[0]; switch (sc.type) { case 'object': return Object.fromEntries(Object.entries(sc.properties || {}).map(([k, v]) => [k, skel(v)])); case 'array': return []; case 'integer': case 'number': return 0; case 'boolean': return false; default: return ''; } }
function manualCall(messages, schema){
  if (aiq.skip.has(aiqKind(schema))) return Promise.reject(new Error('omitido'));
  return new Promise((resolve, reject) => { aiq.list.push({ id: ++aiq.seq, kind: aiqKind(schema), prompt: messages.map(m => m.content).join('\n\n'), schema, resolve, reject }); aiqDraw(); });
}
function aiqAnswer(id, ans){
  const k = aiq.list.findIndex(r => r.id === id); if (k < 0) return false;
  const r = aiq.list.splice(k, 1)[0]; aiqDraw();
  try { const out = typeof ans === 'string' ? parseJSON(ans) : ans; r.resolve({ content: JSON.stringify(out), out }); } catch (e) { r.reject(e); }
  return true;
}
function aiqFail(id, why = 'no hubo respuesta'){ const k = aiq.list.findIndex(r => r.id === id); if (k < 0) return false; aiq.list.splice(k, 1)[0].reject(new Error(why)); aiqDraw(); return true; }
function aiqDraw(){
  const box = $('aiq'), r = aiq.list[0]; box.hidden = !r; if (!r) { box.dataset.id = ''; return; }
  box.querySelector('.n').textContent = r.kind + (aiq.list.length > 1 ? ` (y ${aiq.list.length - 1} más esperando)` : '');
  if (box.dataset.id === String(r.id)) return;
  box.dataset.id = r.id; box.querySelector('.p').textContent = r.prompt + '\n\nFORMATO (JSON Schema):\n' + JSON.stringify(r.schema);
  box.querySelector('textarea').value = JSON.stringify(skel(r.schema), null, 1);
}
// OpenAI (Chat Completions): the fixed prompt goes first so it is cached automatically; the answer must fit the schema
// (the least reasoning the model takes: a chat needs no thinking, and its tokens are paid as output; remembered per model)
const EFFORTS = ['none', 'minimal', 'low'], effortAt = {};
async function openaiCall(messages, schema, strict = true){
  const body = { model: AI.model, max_completion_tokens: 4000, messages: [{ role: 'system', content: sysFor(schema) + (strict ? '' : '\n\nResponde solo con un objeto JSON que siga este esquema: ' + JSON.stringify(schema)) }, ...messages] };
  const ef = effortAt[AI.model] ?? 0;
  if (strict) { body.response_format = { type: 'json_schema', json_schema: { name: 'respuesta', strict: true, schema } }; if (ef < EFFORTS.length) body.reasoning_effort = EFFORTS[ef]; }
  else body.response_format = { type: 'json_object' };
  const { res, data } = await post('https://api.openai.com/v1/chat/completions', { 'content-type': 'application/json', authorization: 'Bearer ' + aiKey() }, body);
  // (if the model does not take that effort, the next one; if it does not take the schema, ask again more simply)
  if (!res.ok) {
    if (res.status === 400 && strict && body.reasoning_effort && /reasoning/i.test(data.error?.message || data.error?.param || '')) { effortAt[AI.model] = ef + 1; return openaiCall(messages, schema, true); }
    if (res.status === 400 && strict) return openaiCall(messages, schema, false);
    throw httpError(res, data);
  }
  const msg = data.choices?.[0]?.message || {};
  if (msg.refusal) throw new Error('no quiso responder eso');
  console.debug('[avonlea IA]', data.model, data.usage);
  const u = data.usage || {}, ca = u.prompt_tokens_details?.cached_tokens || 0; tokCount(schema, (u.prompt_tokens || 0) - ca, ca, u.completion_tokens || 0, u.completion_tokens_details?.reasoning_tokens || 0);
  aiLogPush(schema, data.model || AI.model, body.messages[0].content, messages, msg.content || '', u.prompt_tokens || 0, ca, u.completion_tokens || 0, u.completion_tokens_details?.reasoning_tokens || 0, body.reasoning_effort || '');
  return { content: msg.content || '', out: parseJSON(msg.content || '') };
}
// Claude (Messages API): the fixed prompt is marked for caching
async function claudeCall(messages, schema, retry = true){
  const body = { model: AI.model, max_tokens: 4000, system: [{ type: 'text', text: conNombres(sysFor(schema)), cache_control: { type: 'ephemeral' } }], messages, output_config: { format: { type: 'json_schema', schema } } };
  const headers = { 'content-type': 'application/json', 'x-api-key': aiKey(), 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' };
  // (low effort: quick answers for a chat; on the Opus and Sonnet models, a declined answer is retried on another model)
  if (AI.model !== 'claude-haiku-4-5') { body.output_config.effort = 'low'; if (retry) { body.fallbacks = 'default'; headers['anthropic-beta'] = 'server-side-fallback-2026-07-01'; } }
  const { res, data } = await post('https://api.anthropic.com/v1/messages', headers, body);
  if (!res.ok) {
    if (res.status === 400 && retry && /fallback/i.test(data.error?.message || '')) return claudeCall(messages, schema, false);
    throw httpError(res, data);
  }
  if (data.stop_reason === 'refusal') throw new Error('no quiso responder eso');
  console.debug('[avonlea IA]', data.model, data.usage);
  const u = data.usage || {}; tokCount(schema, (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0), u.cache_read_input_tokens || 0, u.output_tokens || 0);
  aiLogPush(schema, data.model || AI.model, body.system[0].text, messages, (data.content || []).filter(b => b.type === 'text').map(b => b.text).join(''), (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0) + (u.cache_read_input_tokens || 0), u.cache_read_input_tokens || 0, u.output_tokens || 0, 0, body.output_config.effort || '');
  return { content: data.content, out: parseJSON((data.content || []).filter(b => b.type === 'text').map(b => b.text).join('')) };
}
