/* ---------- «Mientras Ana duerme»: the AI of the night. When Ana goes to sleep, if the player turned it on (✒ Ajustes:
   a level, an OpenAI key), the game asks an AI for a few NEW pieces of the data files (a saying, a conversation, the
   answer to a letter, a scene), written for this player and this story so far; it checks them with the same rules as the
   hand-written ones, and keeps the ones that pass in this game (game.noche). The milestones are situations: the AI may
   bring a pending one in another form (its scene leaves hecho:historia_<id>), as many times as the milestone's «otra
   oportunidad» says, and never chooses Ana's answer (docs/MODELO_INTERACCIONES.md, «La IA de la noche»). The call is
   async: the game never waits for it. tools/noche.js builds the same request, and checks the answer here and with the
   full model (Z3) in Node. ---------- */
const NOCHE_NIVELES = { apagado: 'Apagado', palabras: 'Palabras (solo lo que dicen)', efectos: 'Con efectos (hechos que ya existen, cariño, cosas)', libre: 'Libre (también hechos y escenas propias)' };
const NOCHE_N = { apagado: 0, palabras: 1, efectos: 2, libre: 3 };
const NOCHE_MODELO = 'gpt-5.4-mini', NOCHE_MAX = 4, NOCHE_OLVIDO = .9, NOCHE_LINEAS = 4;   // (NOCHE_LINEAS: the least a scene or a conversation has, said by someone)   // (the profile: what she did a week ago weighs half)
const NOCHE_URL = 'https://api.openai.com/v1/chat/completions';
// the settings, in this browser only (never in the game's save, nor in the repository: the key is the player's)
const NOCHE_AJ = (() => { const d = { nivel: 'apagado', clave: '', modelo: NOCHE_MODELO }; try { return { ...d, ...JSON.parse(localStorage.getItem('avonlea-noche') || '{}') }; } catch (e) { return d; } })();
const nocheGuardarAj = () => { try { localStorage.setItem('avonlea-noche', JSON.stringify(NOCHE_AJ)); } catch (e) {} };
const nocheNivel = () => NOCHE_N[NOCHE_AJ.nivel] ? NOCHE_AJ.nivel : 'apagado';
const noche = () => game.noche ||= { bloques: [], log: [], oportunidades: {}, visitas: {} };   // (made only when it is used: «apagado» leaves the save as it was)

// ---------------------------------------------------------------- the vocabulary: what exists in the game
const NOCHE_CANALES_NO = ['viaje', 'carta', 'respuesta', 'conv', 'br', 'comentario', 'camino', 'bell'];   // (the road, the letters, the menus: not for a scene of the night)
const NOCHE_DONDE = ['tejas', 'casa', 'dentro', 'gg', 'arroyo'];   // (what dlgDonde knows; anything else would always hold)
const nocheCodigo = () => [...document.scripts].filter(s => !s.type).map(s => s.textContent).join('\n');
// every action of a scene: when it starts and ends, in the middle of its lines, and in each of its choices
function nocheAcciones(d){
  const out = [...(d.al_empezar || []), ...(d.al_terminar || [])].map(a => ({ a, opcion: null }));
  const ver = (L, op) => { if (!Array.isArray(L)) return; for (const l of L) { if (Array.isArray(l)) { if (l[0] === '!' && l[2]) out.push({ a: l[2], opcion: op }); if (l[0] === '?') for (const o of l[2] || []) { for (const a of o.efectos || []) out.push({ a, opcion: o }); ver(o.lineas, o); } } else if (l?.lineas) ver(l.lineas, op); } };
  ver(d.lineas_ ?? d.lineas, null); return out;
}
// the sayings: each moment, who says it (if always the same one), its conditions for all, the blanks the code fills
// (apart from the rest: what other nights added is registered while the game loads, before the news exist)
let nocheM = null;
function nocheMomentos(){
  if (nocheM) return nocheM; const momentos = {}; let g = null;
  for (const raw of (document.getElementById('dichos')?.textContent || '').split('\n')) {
    const s = raw.trim(); if (!s || s[0] === '#') continue; let m;
    if ((m = s.match(/^===\s*(.+?)\s*===$/))) { g = momentos[m[1]] = { quien: null, si: [], huecos: new Set(), n: 0 }; continue; }
    if (!g) continue;
    if ((m = s.match(/^quien:\s*(\S+)/))) g.quien = m[1];
    else if ((m = s.match(/^si:\s*(.*)$/))) g.si = m[1].split(',').map(x => x.trim()).filter(Boolean);
    else if (/^-/.test(s)) { g.n++; for (const h of s.matchAll(/\{(\w+)\}/g)) g.huecos.add(h[1]); }
  }
  const enOrden = [...nocheCodigo().matchAll(/dichos(?:EnOrden|Todos)\('([^']+)'/g)].map(m => m[1]);   // (taken by their number, not at random: not to be added to)
  for (const k of Object.keys(momentos)) if (enOrden.some(p => k.startsWith(p))) momentos[k].fijo = true;
  return nocheM = momentos;
}
let nocheV = null;
function nocheVocab(){
  if (nocheV) return nocheV;
  const personas = new Set([...Object.keys(CH), ...Object.keys(FOLK_DEFS).filter(k => !/^v\d+$/.test(k))]);
  const hechos = new Set(), supone = {}, deEscena = new Set();
  const positivas = si => [].concat(si || []).map(String).filter(c => /^(hecho|cuaderno|presente|conoce|dias_desde):/.test(c)).map(c => c.startsWith('dias_desde:') ? 'hecho:' + c.split(':')[1] : c);
  for (const d of DIALOGOS) for (const { a } of nocheAcciones(d)) if (a.hecho) {
    const x = a.hecho; hechos.add(x); deEscena.add(x);
    const p = positivas(d.si); supone[x] = supone[x] ? supone[x].filter(c => p.includes(c)) : p;   // (what every scene that leaves it asks for: a fact supposes it)
  }
  for (const m of nocheCodigo().matchAll(/dlgHecho\('([a-z_0-9]+)'[,)]/g)) hechos.add(m[1]);
  for (const k of Object.keys(LLEGADAS)) { hechos.add('llego_' + k); hechos.add('se_fue_' + k); }
  for (const h of HABILIDADES) for (const x of h.hitos || []) hechos.add('hito_' + h.id + '_' + x.n);
  // the milestones: their own facts, and the facts their conditions name (the book's way of a situation, and the answers)
  const hitoHechos = {}, respuestas = {};
  for (const h of HITOS) {
    for (const x of ['historia_' + h.id, 'historia_' + h.id + '_cerrado', ...h.respuestas.map(r => 'historia_' + h.id + '_' + r.id)]) { hechos.add(x); hitoHechos[x] = h.id; }
    for (const a of h.pasa) for (const c of a) { const m = c.match(/^hecho:(\w+)$/); if (m) { hitoHechos[m[1]] = h.id; hechos.add(m[1]); } }
    for (const r of h.respuestas) for (const a of r.si) for (const c of a) { const m = c.match(/^hecho:(\w+)$/); if (m) { hitoHechos[m[1]] = h.id; (respuestas[m[1]] = { hito: h.id, r: r.id }); hechos.add(m[1]); } }
    for (const r of h.respuestas) respuestas['historia_' + h.id + '_' + r.id] = { hito: h.id, r: r.id };
    supone['historia_' + h.id] = h.necesita.flatMap(n => { const [id, r] = n.split(':'); return HITO_DE[id] ? ['hecho:historia_' + id, ...(r ? ['hecho:historia_' + id + '_' + r] : [])] : [n]; });
  }
  for (const k of Object.keys(dlgHechos())) hechos.add(k);
  const momentos = nocheMomentos();
  const canales = new Set([...DIALOGOS.map(d => d.canal), ...Object.keys(ROOMS)].filter(c => c && !NOCHE_CANALES_NO.includes(c)));
  return nocheV = { personas, habla: new Set([...personas, 'ana', 'narra', 'carta', 'vecino', 'niño']), hechos, supone, deEscena, hitoHechos, respuestas, momentos, canales,
    dichas: new Set(DIALOGOS.map(d => d.id)), noticias: new Set(NOTICIAS.map(n => n.id)), metas: new Set(CUADERNO_METAS.map(m => m.id)),
    cualidades: new Set(['afecto', ...Object.keys(CUALIDAD_DEF), ...DIALOGOS.flatMap(d => nocheAcciones(d).filter(x => x.a.suma).map(x => String(x.a.suma[0]).split(':')[0]))]),
    escenas: new Set([...Object.keys(ROOMS).filter(k => !NOCHE_CANALES_NO.includes(k)), 'out']), reglas: nocheReglasLeer(document.getElementById('reglas')?.textContent || '') };
}
// the rules (src/datos/reglas.txt), read as tools/modelo-nucleo.js reads them
function nocheReglasLeer(txt){
  const out = { espera: [], nunca: [], referencia: [], solo: [] }; let r = null; const comas = v => v.split(',').map(x => x.trim()).filter(Boolean);
  for (const raw of txt.split('\n')) {
    const l = raw.trim(); if (!l || l[0] === '#') continue; let m;
    if ((m = l.match(/^===\s*(espera|nunca|referencia|solo):\s*(.+?)\s*===$/))) { r = { nombre: m[2] }; out[m[1]].push(r); continue; }
    if (l.startsWith('===')) { r = null; continue; }   // (another kind: «laguna:», for the model)
    if (r && (m = l.match(/^(quiénes|cuando|hay|si|palabras|exige|salvo|pide):\s*(.*)$/))) { const [, k, v] = m; if (k === 'exige') (r.exige ||= []).push(comas(v)); else r[k] = k === 'palabras' ? v.split('|').map(x => x.trim()) : k === 'hay' ? v : comas(v); }
  }
  return out;
}
const nocheNinos = () => new Set([...Object.entries(FOLK_DEFS).filter(([, d]) => d.kind === 'alumno').map(([k]) => k), 'diana', 'minnie', 'niño']);
function nocheGrupo(qs){
  const V = nocheVocab(), N = nocheNinos(), s = new Set();
  for (const q of qs || ['todos']) for (const x of q === 'todos' ? V.personas : q === 'niños' ? N : q === 'adultos' ? [...V.personas].filter(k => !N.has(k)) : q === 'casa' ? Object.keys(CH) : q === 'pueblo' ? Object.keys(FOLK_DEFS) : [q]) s.add(x);
  return s;
}

// ---------------------------------------------------------------- the profile: what this player cares about
const nocheSinArt = s => String(s || '').replace(/^(el|la|los|las) /, '');
const NOCHE_ACTIVIDADES = { cartas: /carta|correo/i, cocinar: /cocin|tarta|compota|\bté\b|horne/i, huerta: /sembr|regó|riega|huert|cantero|florec/i, granja: /vaca|orde|heno|leña|granero|huevo|gallin/i,
  leer: /ley[óo]|libro|poema|recit|estudi/i, imaginar: /nombr|bautiz|imagin/i, pasear: /pase[óo]|caminó|fue a|visitó/i, iglesia: /iglesia|rez[óo]|oraci/i, regalar: /regal|le dio|le llevó/i, conversar: /convers|habl[óo]|le cont[óo]/i };
function nochePerfil(){
  const hoy = today() + 1, peso = d => Math.pow(NOCHE_OLVIDO, Math.max(0, hoy - (d ?? hoy))), P = { personas: {}, actividades: {}, lugares: {} };
  const suma = (o, k, w) => { o[k] = Math.round(((o[k] || 0) + w) * 100) / 100; };
  const nombres = [...nocheVocab().personas].map(k => [k, [...new Set([nocheSinArt(NAMES[k] || FOLK_DEFS[k]?.name), CH[k]?.fullName, (CH[k]?.fullName || '').split(' ')[0]].filter(n => n && n.length > 3 && !/^Sr/.test(n)))]]);
  const lugares = Object.entries(PLACES).map(([k, p]) => [k, nocheSinArt(p[0])]);
  for (const e of game.journal || []) {
    if (!/\bAna\b/.test(e.t)) continue; const w = peso(e.d);
    for (const [k, N] of nombres) if (N.some(n => e.t.includes(n))) suma(P.personas, k, w);
    for (const [k, re] of Object.entries(NOCHE_ACTIVIDADES)) if (re.test(e.t)) suma(P.actividades, k, w);
    for (const [k, n] of lugares) if (e.t.includes(n)) suma(P.lugares, k, w);
  }
  for (const c of cartas()) if (c.de === 'ana') { suma(P.personas, c.para, 1.5 * peso(c.dia + 1)); suma(P.actividades, 'cartas', peso(c.dia + 1)); }
  for (const d of DIALOGOS) if (d.disparo === 'conversar' && dlgDichas()[d.id]) { suma(P.personas, d.con, 1); suma(P.actividades, 'conversar', .5); }   // (the conversations had: no day kept, they count whole)
  for (const [k, v] of Object.entries(game.noche?.visitas || {})) suma(P.lugares, k, v.n * peso(v.d));
  const top = o => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, 6);
  return { personas: top(P.personas), actividades: top(P.actividades), lugares: top(P.lugares) };
}
// (where she goes, counted once a day per place; only while the night is on: «apagado» changes nothing)
let nocheT = 0;
function nocheTick(dt){
  if ((nocheT -= dt) > 0) return; nocheT = 5;
  if (game.noche?.bloques.length) nocheOtraVez();
  if (nocheNivel() === 'apagado' || !game.wm || sleeping) return;
  const k = game.scene === 'out' ? Object.entries(PLACES).find(([, p]) => dist(ana.x, ana.y, p[1], p[2]) < 200)?.[0] : ROOMS[game.scene] && game.scene !== 'gg' && game.scene !== 'ga' ? game.scene : null;
  if (!k) return; const V = noche().visitas, v = V[k] ||= { n: 0, d: 0 }; if (v.d !== today() + 1) { v.n++; v.d = today() + 1; }
}

// a second chance that was played (a scene of the night with «hito:», for a milestone already answered): the answer that
// counts is the newest one, and what the old one had closed opens again (src/js/66-hitos.js goes on from there)
function nocheOtraVez(){
  for (const b of game.noche.bloques) {
    if (!b.hito || b.contada || !dlgDichas()[b.id] || TALKS.some(t => t.esc === b.id)) continue;
    b.contada = true; const H = HITO_DE[b.hito], X = dlgHechos(); if (!H || !hitoHecho(H.id)) continue;
    const dia = r => Math.max(-1, ...r.si.flat().map(c => c.match(/^hecho:(\w+)$/)?.[1]).filter(x => x && X[x] != null).map(x => X[x]));
    const r = H.respuestas.filter(r => hitoCumple(r.si)).sort((a, z) => dia(z) - dia(a))[0], antes = hitoRespuesta(H.id);
    if (!r || r.id === antes) continue;
    if (antes) delete X['historia_' + H.id + '_' + antes]; dlgHecho('historia_' + H.id + '_' + r.id);
    for (const h of HITOS) if (!hitoHecho(h.id) && h.necesita.includes(H.id + ':' + r.id)) delete X['historia_' + h.id + '_cerrado'];
    logEv('Ana vivió otra vez un momento de su historia, y esta vez respondió distinto.', []);
  }
}

// ---------------------------------------------------------------- the loose ends: what the story left open
function nocheHitoEstado(h){
  const paso = hitoHecho(h.id), r = hitoRespuesta(h.id), libro = (h.libro || '').match(/^(\w+) —/)?.[1] || null, cerrado = hitoCerrado(h.id);
  const usadas = game.noche?.oportunidades?.[h.id] || 0, quedan = Math.max(0, h.otra - usadas);
  const listo = !paso && !cerrado && hitoEstado(h) === 'listo', distinta = paso && !cerrado && !!libro && r !== libro;
  return { paso, respuesta: r, libro, cerrado, listo, distinta, quedan, oportunidad: quedan > 0 && (listo || distinta) };
}
function nocheCabos(){
  const C = [], hoy = today() + 1, sin = {};
  for (const c of cartas()) if (c.de === 'ana' && c.estado !== 'respondida') (sin[c.para] ||= []).push(c);
  for (const [k, L] of Object.entries(sin)) C.push({ tipo: 'carta', quien: k, texto: `Ana le escribió ${L.length === 1 ? 'una carta' : L.length + ' cartas'} a ${CORREO[k]?.nombre || k} que todavía no ${L.length === 1 ? 'tiene' : 'tienen'} respuesta (${L.map(c => c.estado).join(', ')}); puede contestar: «canal: respuesta», «de: ${k}»` });
  for (const t of activeTasks()) C.push({ tipo: 'encargo', quien: t.from, texto: `${NAMES[t.from] || t.from} le pidió a Ana: ${taskText(t)} (día ${t.d + 1})` });
  for (const e of (game.journal || []).filter(e => hoy - e.d <= 10 && /prometi|prometió|le pidió|le preguntó|pidió permiso/.test(e.t)).slice(-6)) C.push({ tipo: 'promesa', texto: `Día ${e.d}: ${e.t}` });
  for (const [k, v] of Object.entries(game.noche?.visitas || {})) if (v.n >= 3) C.push({ tipo: 'lugar', lugar: k, texto: `Ana va seguido a ${PLACES[k]?.[0] || HOUSES[k]?.name || k} (${v.n} días)` });
  return C;
}

// the open situations (the milestones, told as the AI needs them: what happens, how Ana may react, what it must not
// be); the ids, the facts and the chances stay in the game, which puts them on what is accepted (nocheReparar)
function nocheSituaciones(){
  const out = [];
  for (const h of HITOS) {
    const s = nocheHitoEstado(h); if (!s.oportunidad) continue;
    const R = [...new Set(nocheRespuestasDe(h.id).map(([, r]) => r))];
    out.push(`- ${h.id}: ${h.situacion}${s.distinta ? ` (Ya pasó: Ana reaccionó «${s.respuesta}»; en el libro, «${s.libro}». Podría volver de otra forma, si la partida lo pide.)` : ''}`
      + (R.length ? `\n  Ana puede reaccionar: ${R.join(', ')}` : '') + (h.noPuede ? `\n  sin: ${h.noPuede}` : '') + (h.variantes ? `\n  ideas: ${h.variantes}` : ''));
  }
  return out.join('\n') || '(ninguna esta noche)';
}
// the gaps of this game, as the logic model finds them (tools/modelo-nucleo.js, «laguna:» in src/datos/reglas.txt): a
// choice of Ana's that nothing still to come takes into account, someone she knows with no scene left. Z3 does not run
// in the game yet: tools/noche.js puts them here (nocheModelo, later); without them, the request goes without
let NOCHE_LAGUNAS = null;
const nocheLagunasPoner = L => { NOCHE_LAGUNAS = L; };
// this game, as the model asks it: the day, what happened and when, the goals done, whom Ana knows, what was said
function nochePartida(){
  const P = game.wm?.perm || {};
  return { dia: today() + 1, hechos: { ...dlgHechos() }, metas: Object.fromEntries(Object.entries(P).filter(([k]) => k.startsWith('cuaderno:')).map(([k, d]) => [k.slice(9), d])),
    conoce: [...nocheVocab().personas].filter(k => conoceA(k)), dichas: Object.keys(dlgDichas()), cualidades: nocheCualidades() };
}
// the qualities as they are now, named as the model names them (nombre_dueño[_hacia]): its «estos días» starts from here
function nocheCualidades(){
  const Q = {};
  for (const k of [...nocheVocab().personas].filter(k => conoceA(k))) Q['afecto_' + k + '_ana'] = Math.round(relGetW(k, 'ana'));
  for (const q of Object.keys(CUALIDAD_DEF)) Q[q + '_ana'] = cualidad('ana', q);
  for (const [dueño, N] of Object.entries(game.wm?.num || {})) for (const [c, v] of Object.entries(N)) { const [n, h] = c.split('>'); Q[[n, dueño, h].filter(Boolean).join('_')] = v; }
  return Q;
}
function nocheLagunasTexto(){
  return (NOCHE_LAGUNAS || []).map(l => l.de === 'decisiones'
    ? `- Ana eligió «${l.opcion}» (día ${l.dia}), y nada de lo que todavía puede pasar lo toma en cuenta: algo que lo recuerde o le dé consecuencias (que pida «hecho:${l.hecho}»).`
    : l.de === 'pocas' ? `- Ana quiere ${l.hay === 'frase' ? 'oír cosas nuevas de' : 'conversar con'} ${l.nombre} (${l.quien}), y estos días ${l.quedan ? 'solo ' + (l.quedan === 1 ? 'queda 1' : 'quedan ' + l.quedan) : 'no queda ninguna'} ${l.hay === 'frase' ? 'frase distinta (repite siempre lo mismo)' : l.hay === 'escena' ? 'escena' : 'conversación'}: ${l.hay === 'frase' ? 'líneas nuevas para ' + l.quien + ' (dichos)' : l.hay === 'escena' ? 'una escena nueva con ' + l.quien : 'una conversación nueva con ' + l.quien + ' (que pueda darse ya)'}.`
    : `- Con ${l.nombre} (${l.quien}) ya no queda ninguna escena ni conversación por pasar: algo nuevo entre ${l.quien} y Ana.`).join('\n');
}
// each one Ana knows: how fond of her, and the last things that happened between them (from the journal)
function nocheGente(){
  const V = nocheVocab(), J = (game.journal || []).filter(e => /\bAna\b/.test(e.t));
  return [...V.personas].filter(k => conoceA(k)).map(k => {
    const N = [...new Set([nocheSinArt(NAMES[k] || FOLK_DEFS[k]?.name), CH[k]?.fullName].filter(Boolean).flatMap(n => [n, ...n.split(' ').filter(w => /^[A-ZÁÉÍÓÚ][a-záéíóúñ]{3,}$/.test(w))]))];
    const ult = J.filter(e => N.some(n => e.t.includes(n))).slice(-3).map(e => `día ${e.d}: ${e.t}`);
    return `- ${k}${CH[k] ? ` (cariño hacia Ana ${Math.round(relGetW(k, 'ana'))}/5)` : ''}${ult.length ? ': ' + ult.join(' · ') : ''}`;
  }).join('\n');
}

// ---------------------------------------------------------------- the request
function nocheReglasProsa(){
  const R = nocheVocab().reglas, q = c => '«' + c + '»';
  return [...R.referencia.map(r => `- Si alguien dice ${r.palabras.map(q).join(' o ')}, sus condiciones tienen que pedir ${r.exige.map(g => g.map(q).join(' y ')).join(', o ')}${r.salvo ? ` (salvo ${r.salvo.join(', ')})` : ''} ({k} es quien habla). [${r.nombre}]`),
    ...R.solo.map(r => `- Mientras ${(r.cuando || []).map(q).join(' y ')}, ${(r['quiénes'] || ['todos']).join(', ')} solo dice cosas cuyas condiciones nombren alguna de: ${(r.pide || []).join(', ')} (por ejemplo «!hecho:${(r.pide || [''])[0]}»). [${r.nombre}]`),
    ...R.nunca.map(r => `- Nunca: ${(r.si || []).join(', ')} (${r.nombre}).`)].join('\n');
}
// a block of the data, verbatim (from the texts the game carries): the examples of the request
function nocheEjemplo(el, id){
  const L = (document.getElementById(el)?.textContent || '').split('\n'), i = L.findIndex(l => l.trim() === `=== ${id} ===`); if (i < 0) return '';
  let j = i + 1; while (j < L.length && !/^===/.test(L[j].trim())) j++;
  while (j > i + 1 && (!L[j - 1].trim() || L[j - 1].trim()[0] === '#')) j--;
  return L.slice(i, j).join('\n');
}
function nocheSistema(nivel){
  const V = nocheVocab(), n = NOCHE_N[nivel];
  const voces = [...Object.keys(CH).map(k => `- ${k} (${CH[k].fullName || NAMES[k]}): ${voiceShort(k)}`), ...Object.entries(FOLK_DEFS).filter(([k]) => !/^v\d+$/.test(k)).map(([k, d]) => `- ${k} (${nocheSinArt(d.name)})${fichaOf(k)?.ficha ? ': ' + String(fichaOf(k).ficha).slice(0, 140) : ''}`)].join('\n');
  const tipos = ['conversacion', 'respuesta', ...(n >= 2 ? ['escena'] : [])];   // (no sayings: a line on its own floats; what someone says goes in a short scene)
  return `Eres quien escribe, de noche, cosas nuevas para «Un día en Avonlea», un juego tranquilo inspirado en «Ana de las Tejas Verdes» (L. M. Montgomery): Avonlea, un pueblito de granjas de la Isla del Príncipe Eduardo, hacia 1880. Ana Shirley tiene 11 años, es pelirroja, huérfana, soñadora, conversadora, de palabras grandiosas e imaginación desbordante; vive con Marilla y Matthew Cuthbert en Tejas Verdes. El tono es el del libro: tierno, con humor, sin nada moderno. Español; en la familia se tutea a Ana; Ana trata de usted a los grandes.

Mientras Ana duerme, escribes como mucho ${NOCHE_MAX} bloques NUEVOS para ESTA partida, pensados para cómo está cada personaje con Ana, para lo que a quien juega le interesa (el perfil) y para lo que quedó abierto (lo que le falta a la partida, si viene: primero eso; los cabos sueltos; las situaciones abiertas). Cada bloque se escribe en el formato de los archivos de datos del juego, y el juego lo revisa con las mismas reglas que lo escrito a mano: lo que no las cumple se descarta. Mejor pocos y buenos. Si la partida trae «LO QUE LE FALTA A ESTA PARTIDA», al menos uno de tus bloques llena una de esas faltas (pidiendo en su «si:» el hecho que se indica, o con la persona que se nombra).

LO QUE IMPORTA (el juego quiere escenas con contenido, no relleno):
- Cada bloque muestra algo que cambia o se revela: una relación que se acerca o se tensa, una decisión que pesa, algo que Ana aprende, pierde o se atreve a decir. Si nada cambia, no vale la pena escribirlo.
- Que nazca de los temas del libro: pertenecer a una familia después de no haber tenido ninguna; la imaginación frente a las costumbres; el orgullo y el perdón; la amistad del alma; crecer sin dejar de ser una misma.
- Que use lo concreto de ESTA partida: lo que Ana eligió, dijo o escribió, con quién, y qué quedó sin resolver. Nada de cosas que podrían pasar en cualquier partida.
- Nada de relleno: saludos, el clima, comentarios sueltos, charla que no lleva a nada.
- Nada de frases sueltas: si alguien dice algo, es una escena (o una conversación) corta: dónde, quién está, qué lo provoca, y qué responde o hace Ana. Al menos ${NOCHE_LINEAS} líneas, con un ida y vuelta; una frase sola no es una escena.
- Las opciones son decisiones de verdad: cada una lleva a algo propio (otra respuesta de la otra persona, otro efecto), no la misma cosa dicha de dos maneras.

NIVEL: ${nivel}. Tipos permitidos: ${tipos.join(', ')}.
${n === 1 ? '- Solo palabras: ningún efecto (nada de «al_empezar:», «al_terminar:» ni líneas «! …»; las opciones «->», sin «! …»).' : ''}${n >= 2 ? `- Efectos permitidos: «hecho x» (solo hechos que ya existen en el juego, y pidiendo en «si:» lo que suponen), «suma <cualidad>:<dueño>[:<hacia>] n» con n = 1 o -1 (p. ej. «suma afecto:lynde:ana 1»), «cosa <quien> <cosa> n» (n de 1 a 3), «saber <quien> <noticia>», y para mover a la gente en escena: «sentar», «levantar», «junto», «log texto».` : ''}${n >= 3 ? '\n- Libre: además, hechos NUEVOS, todos con prefijo «ia_» («hecho ia_algo», «olvidar ia_algo»), y cadenas de escenas propias («si: hecho:ia_algo», «dicha:ia_otra»).' : n === 2 ? '\n- Nada de hechos nuevos (ni «ia_…»).' : ''}
- Nunca: «olvidar» un hecho del juego, «fin_capitulo», «final», «punto», «meta», «afecto», «nombrar», «dormir»; ni «interrumpe», «lineas: libro:…», «calesa», «camino», «o:».

LOS FORMATOS (el «texto» de cada bloque es exactamente esto):

conversacion (Ana la elige del menú de esa persona; una vez):
=== ia_<id> ===
con: <persona>
tema: <cómo aparece en el menú: lo que Ana quiere hablar>
si: <condiciones>
${n >= 2 ? 'al_terminar: <efecto> (una línea por efecto)\n' : ''}---
ana: <línea>
<persona>: <línea>
(una línea entre paréntesis al comienzo es lo que se ve: «(Marilla aprieta los labios.)»; «ana piensa: …» es lo que piensa; «narra: …», una tarjeta de narración; solo hablan Ana y esa persona)
-> <lo que Ana puede decir>   (opciones, como en Yarn: debajo, con sangría, sus líneas${n >= 2 ? ' y sus efectos «! …»' : ''})

respuesta (lo que alguien contesta a las cartas de Ana; llega días después al correo):
=== ia_<id> ===
canal: respuesta
de: <${Object.keys(CORREO).join(' | ')}>
si: respuesta:<el mismo>, <otras condiciones>
---
carta: <cada línea de la carta: saludo, cuerpo, firma; {estacion} es lo que se ve en Avonlea en esta estación>
(La respuesta solo puede referirse a lo que Ana escribió de verdad: sus cartas están en la partida, abajo. Nada de inventar lo que ella contó.)
${n >= 2 ? `
escena (pasa sola cuando se cumplen sus condiciones; el director pone en cada canal la de más prioridad):
=== ia_<id> ===
canal: <${[...V.canales].join(' | ')}>
prioridad: <1 a 6>
en: <quien=lugar, …> (ana=gg: Ana en la cocina de Tejas Verdes; lugares: ${[...V.escenas].join(', ')}; quien habla tiene que estar en «en:»)
sujeta: <quienes se quedan quietos mientras se dice>
grande (opcional: algo grande; como mucho una por día)
situacion: <clave> (opcional: solo si trae una de las situaciones abiertas)
si: <condiciones>
al_empezar: <efecto> / al_terminar: <efecto>
narra: <una tarjeta antes de las líneas, opcional>
---
<quien>: <línea>
-> <opción de Ana>
   ana: <línea>
   ! hecho <x>
   ! responde <reacción> (solo en una escena con «situacion:»: cómo reacciona Ana con esta opción)
` : ''}
LAS CONDICIONES (en «si:» y entre corchetes; separadas por comas; «!» delante niega):
hecho:x · dias_desde:x:n (pasaron n días desde x) · dicha:id (ya se dijo esa escena o conversación) · conoce:quien (Ana y esa persona se conocen) · presente:quien (está en Avonlea) · ve:quien (la ve ahora) · donde:quien:${NOCHE_DONDE.join('|')} · ana:${Object.keys(ANA_ESTADO).join('|')} · cuaderno:meta (cumplió esa meta: ${[...V.metas].join(', ')}) · afecto:quien:ana>=n (de 0 a 5; también <, <=, >) · <cualidad>:<dueño>>=n (cualidades: ${[...V.cualidades].join(', ')}) · sabe:quien:noticia (noticias: ${[...V.noticias].join(', ')}) · estacion:primavera|verano|otoño|invierno · dia_estacion:n (1 a 14) · dia_juego:n · hora:a-b · no_hoy:x · carta:quien · respuesta:quien
Ninguna otra: lo que no está aquí se descarta.

LOS HECHOS QUE EXISTEN (los únicos que se pueden pedir o dejar${n >= 3 ? ', además de los «ia_…» que tú mismo dejes' : ''}): ${[...V.hechos].filter(h => !/^(hito_|se_fue_)/.test(h)).sort().join(', ')}

LA GENTE (id: su voz; solo estos hablan):
${voces}
COSAS (para «cosa»): ${Object.keys(ITEM_DEFS).join(', ')}

${n >= 2 ? `LAS SITUACIONES ABIERTAS (vienen en la partida, abajo): momentos que la historia de Ana todavía puede necesitar. Si una escena ES una de ellas (lo que dice la situación pasa en la escena), ponle «situacion: <clave>» y el juego se encarga del resto (ningún hecho para eso); cualquier otra escena, aunque llene una falta de la partida, no lleva «situacion:». Cuida su «sin»: es lo que la volvería otra cosa.
- Cómo reacciona Ana lo elige quien juega, nunca tú: si la situación dice «Ana puede reaccionar», da una opción «->» por cada reacción, cada una con «! responde <reacción>».
- Una situación que ya pasó y «podría volver» es opcional: tráela solo si la partida lo pide.

` : ''}LAS REGLAS (las revisa un solucionador lógico; lo que las rompe se descarta):
${nocheReglasProsa()}
- Quien no conoce a Ana no la nombra («Ana», «Shirley»): pide «conoce:<quien>».
- Una frase o escena tiene que poder darse: sus condiciones no se contradicen.

EJEMPLOS DE VERDAD (copiados tal cual de los datos del juego; los tuyos llevan id «ia_…»):

Una respuesta a una carta:
${nocheEjemplo('guion', 'resp_diana_1')}

Una conversación:
${nocheEjemplo('conversaciones', 'conv_marilla_oraciones')}
${n >= 2 ? `
Una escena con opciones (así pasa en el libro la situación «rival»; la tuya, si la trae de otra forma, lleva «situacion: rival» y en cada opción «! responde <reacción>», y no lleva «interrumpe», «ofensa» ni «! hecho …» de esta):
${nocheEjemplo('guion', 'zanahorias')}
` : ''}

LO QUE EL JUEGO YA TUVO QUE DESCARTAR (no lo repitas):
- Cada línea después de «---» es «quien: texto», con el id de quien habla, en minúsculas («ana:», «marilla:», «lynde:»; no «Ana:»). Ninguna línea sin «quien:».
- Una carta («canal: respuesta») son SOLO líneas «carta: …», una por línea: el saludo, cada frase y la firma.
- En una escena, todos los que hablan, Ana también, están en «en:» («en: ana=gg, matthew=gg»); «sujeta:» y «en:» usan los ids.
- Solo los hechos de la lista${n >= 3 ? ', o los «ia_…» que tus propios bloques dejan' : ''}.

RESPONDE solo con el JSON pedido: { "bloques": [ { "tipo": "${tipos.join('" | "')}", "texto": "<el bloque, con saltos de línea>", "porque": "<una frase: por qué para esta partida>" } ] }.`;
}
// what Ana really wrote to whoever has not answered yet (the last two letters to each): an answer may only refer to this
function nocheCartasTexto(){
  const P = {}; for (const c of cartas()) if (c.de === 'ana' && c.estado !== 'respondida') (P[c.para] ||= []).push(c);
  const L = Object.entries(P).flatMap(([k, cs]) => cs.slice(-2).map(c => { const t = [].concat(c.texto || []).map(String).filter(x => x.trim()).join(' / '); return `- A ${CORREO[k]?.nombre || k} (día ${c.dia + 1}): «${t.length > 600 ? t.slice(0, 599) + '…' : t || '(sin texto guardado)'}»`; }));
  return L.length ? '\nLAS CARTAS DE ANA SIN RESPUESTA (lo que escribió de verdad; una respuesta solo puede referirse a esto):\n' + L.join('\n') + '\n' : '';
}
function nocheUsuario(nivel){
  const H = dlgHechos(), hoy = today() + 1, V = nocheVocab();
  const hechos = Object.entries(H).filter(([k]) => !/^(hito_|historia_)/.test(k)).sort((a, b) => b[1] - a[1]).slice(0, 80).map(([k, d]) => `${k} (día ${d})`).join(', ');
  const habilidades = Object.keys(CUALIDAD_DEF).map(k => `${k} ${cualidad('ana', k)}`).join(', ');
  const P = nochePerfil(), f = L => L.map(([k, w]) => `${k} (${w})`).join(', ') || '(nada todavía)';
  const ya = (game.noche?.bloques || []).map(b => `${b.tipo} ${b.id}`).join(', ');
  return `LA PARTIDA, ESTA NOCHE
Día ${hoy} (${SEASONS[S].toLowerCase()}, día ${today() % DIAS_ESTACION + 1} de la estación).
Lo de Ana: ${habilidades}.
Lo que pasó (los hechos, los últimos primero): ${hechos}.

LA GENTE QUE ANA CONOCE (y lo último entre ellos)
${nocheGente()}

EL PERFIL (lo que a quien juega le interesa, con lo de los últimos días pesando más)
Personas: ${f(P.personas)}
Actividades: ${f(P.actividades)}
Lugares: ${f(P.lugares)}

LOS CABOS SUELTOS
${nocheCabos().map(c => '- ' + c.texto).join('\n') || '(ninguno)'}
${nocheCartasTexto()}${NOCHE_LAGUNAS?.length ? '\nLO QUE LE FALTA A ESTA PARTIDA (lo encontró un solucionador lógico: lo más importante para escribir esta noche)\n' + nocheLagunasTexto() + '\n' : ''}${NOCHE_N[nivel] >= 2 ? '\nLAS SITUACIONES ABIERTAS (para una escena con «situacion: <clave>»)\n' + nocheSituaciones() + '\n' : ''}
${ya ? '\nYA AGREGADO OTRAS NOCHES (no repetir): ' + ya + '\n' : ''}
Escribe hasta ${NOCHE_MAX} bloques, nivel «${nivel}».`;
}
const NOCHE_ESQUEMA = { type: 'object', additionalProperties: false, required: ['bloques'], properties: { bloques: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['tipo', 'texto', 'porque'],
  properties: { tipo: { type: 'string', enum: ['conversacion', 'respuesta', 'escena'] }, texto: { type: 'string' }, porque: { type: 'string' } } } } } };
function nochePedido(nivel = nocheNivel(), modelo = NOCHE_AJ.modelo || NOCHE_MODELO){
  nocheV = null;
  return { modelo, nivel, mensajes: [{ role: 'system', content: nocheSistema(nivel) }, { role: 'user', content: nocheUsuario(nivel) }] };
}
// the bodies to try, in order: the schema with little reasoning; without choosing the reasoning (a model that does not take
// it); and plain JSON with the schema in the prompt (a model that does not take schemas)
function nocheCuerpos(p){
  const base = { model: p.modelo, max_completion_tokens: 12000, messages: p.mensajes }, fmt = { type: 'json_schema', json_schema: { name: 'bloques_de_la_noche', strict: true, schema: NOCHE_ESQUEMA } };
  return [{ ...base, response_format: fmt, reasoning_effort: 'low' }, { ...base, response_format: fmt },
    { ...base, messages: [{ ...p.mensajes[0], content: p.mensajes[0].content + '\n\nResponde solo con un objeto JSON que siga este esquema: ' + JSON.stringify(NOCHE_ESQUEMA) }, ...p.mensajes.slice(1)], response_format: { type: 'json_object' } }];
}
// the answer of the API → the blocks (at most NOCHE_MAX); an error says why, in words
function nocheLeerRespuesta(data){
  const msg = data?.choices?.[0]?.message || {};
  if (msg.refusal) throw new Error('la IA no quiso responder: ' + msg.refusal);
  let j; try { j = JSON.parse(msg.content || ''); } catch (e) { throw new Error('la respuesta no es JSON'); }
  return { bloques: (Array.isArray(j?.bloques) ? j.bloques : []).slice(0, NOCHE_MAX), modelo: data.model || '', uso: data.usage || null };
}
async function nocheLlamar(p, clave){
  let ultimo = null;
  for (const body of nocheCuerpos(p)) {
    const res = await fetch(NOCHE_URL, { method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + clave }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    if (res.ok) return nocheLeerRespuesta(data);
    ultimo = new Error(`OpenAI ${res.status}: ${data.error?.message || res.statusText}`);
    if (res.status !== 400) throw ultimo;   // (a bad key, no credit, too many requests: trying another way will not help)
  }
  throw ultimo;
}

// ---------------------------------------------------------------- the checks: the same rules as what is written by hand
const NOCHE_CAMPOS = {
  conversacion: ['con', 'tema', 'si', 'al_empezar', 'al_terminar', 'repetir', 'prioridad', 'se_hace_en', 'narra'],
  respuesta: ['canal', 'de', 'responde', 'si'],
  escena: ['canal', 'prioridad', 'en', 'sujeta', 'si', 'al_empezar', 'al_terminar', 'repetir', 'grande', 'tipo', 'hito', 'narra', 'pausa', 'espera'] };
const NOCHE_ACCIONES = ['hecho', 'olvidar', 'suma', 'cosa', 'saber', 'log', 'sentar', 'levantar', 'junto'];   // (efectos; olvidar, only «ia_» facts, in «libre»)
const nocheId = id => /^ia_[a-z0-9_]+$/.test(id);
// the answers of a milestone that a scene can leave (the facts its «respuesta» lines ask for): [[fact, answer]]
const nocheRespuestasDe = h => (HITO_DE[h]?.respuestas || []).flatMap(r => [...new Set(r.si.flat().map(c => c.match(/^hecho:(\w+)$/)?.[1]).filter(Boolean))].map(x => [x, r.id]));
const nocheIdDe = b => { const t = String(b?.texto || ''); if (b?.tipo === 'dicho') return 'dicho:' + ((t.match(/^\s*===\s*(.+?)\s*===/m) || [])[1] || ''); const id = (t.match(/^\s*===\s*(.+?)\s*===/m) || [])[1] || ''; return /^ia_/.test(id) ? id : 'ia_' + id.toLowerCase(); };
// one condition: null if it is well written and names what exists; else why not
function nocheCondMal(c, ctx){
  const V = nocheVocab(); c = String(c).trim(); const s = c[0] === '!' ? c.slice(1) : c;
  const persona = k => V.personas.has(k) || k === 'ana', hecho = x => V.hechos.has(x) || ctx.iaHechos.has(x);
  const q = s.match(CUALIDAD_RE);
  if (q) return !V.cualidades.has(q[1]) ? `«${c}»: no hay una cualidad «${q[1]}»` : !persona(q[2]) || (q[3] && !persona(q[3])) ? `«${c}»: no es nadie del juego` : null;
  const [k, ...a] = s.split(':'), num = (x, lo = -Infinity, hi = Infinity) => /^\d+(\.\d+)?$/.test(x || '') && +x >= lo && +x <= hi;
  const malo = `«${c}» está mal escrita`;
  switch (k) {
    case 'hecho': case 'no_hoy': return hecho(a[0]) ? null : `«${c}»: el hecho «${a[0]}» no existe en el juego` + (/^ia_/.test(a[0]) && NOCHE_N[ctx.nivel] < 3 ? ' (los hechos «ia_» son del nivel libre)' : '');
    case 'dias_desde': case 'horas_desde': return !(hecho(a[0]) || V.metas.has(a[0])) ? `«${c}»: el hecho «${a[0]}» no existe en el juego` : num(a[1], 0) ? null : malo;
    case 'dicha': return V.dichas.has(a[0]) || ctx.iaIds.has(a[0]) ? null : `«${c}»: no hay una escena «${a[0]}»`;
    case 'presente': case 'sentada': return persona(a[0]) ? null : `«${c}»: «${a[0]}» no es nadie del juego`;   // (Ana too: she is always here)
    case 'conoce': case 've': return V.personas.has(a[0]) ? null : a[0] === 'ana' ? `«${c}»: se escribe con quien la conoce o la ve («${k}:diana»), no con Ana` : `«${c}»: «${a[0]}» no es nadie del juego`;
    case 'donde': return persona(a[0]) && NOCHE_DONDE.includes(a[1]) ? null : `«${c}»: se escribe donde:<quien>:${NOCHE_DONDE.join('|')}`;
    case 'ana': return ANA_ESTADO[a[0]] ? null : `«${c}»: Ana no puede estar «${a[0]}»`;
    case 'cuaderno': return V.metas.has(a[0]) ? null : `«${c}»: no hay una meta «${a[0]}» en el cuaderno`;
    case 'afecto': return persona(a[0]) && persona(a[1]) && num(a[2], 0, 5) ? null : malo;
    case 'sabe': return !V.personas.has(a[0]) ? `«${c}»: «${a[0]}» no es nadie del juego` : !V.noticias.has(a[1]) ? `«${c}»: no hay una noticia «${a[1]}»` : a[2] == null || a[2] === 'contada' || num(a[2], 1) ? null : malo;
    case 'estacion': return ['primavera', 'verano', 'otoño', 'invierno'].includes(a[0]) ? null : malo;
    case 'dia_estacion': return num(a[0], 1, DIAS_ESTACION) ? null : malo;
    case 'dia_juego': case 'estudio': return num(a[0], 1) ? null : malo;
    case 'hora': return /^\d+-\d+$/.test(a[0] || '') ? null : malo;
    case 'carta': case 'respuesta': return CORREO[a[0]] ? null : `«${c}»: nadie recibe cartas con ese nombre`;
    case 'comento': return persona(a[0]) ? null : malo;
    case 'tomando_te': return V.personas.has(a[0]) && persona(a[1]) ? null : malo;
    case 'escena_ana': return V.escenas.has(a[0]) ? null : malo;
  }
  return `«${c}»: «${k}» no es una condición que la IA pueda usar`;
}
// what some conditions imply, as the model knows it: a fact supposes what the scenes that leave it ask for; seeing
// someone is that they are here; knowing Ana, that they know there is a girl at Green Gables
function nocheCierre(conds){
  const V = nocheVocab(), S = new Set(conds.map(String)), add = c => { if (S.has(c)) return false; S.add(c); return true; };
  for (let otra = true; otra;) { otra = false;
    for (const c of [...S]) {
      let m;
      if ((m = c.match(/^(?:dias_desde|horas_desde):(\w+)/))) otra = add('hecho:' + m[1]) || otra;
      if ((m = c.match(/^hecho:(\w+)$/))) for (const x of V.supone[m[1]] || []) otra = add(x) || otra;
      if ((m = c.match(/^ve:(\w+)$/))) otra = add('presente:' + m[1]) || otra;
      if ((m = c.match(/^conoce:(\w+)$/))) otra = add('sabe:' + m[1] + ':nina_cuthbert') || otra;
    } }
  return S;
}
const nocheAfecto = c => { const m = String(c).match(/^(!?)afecto:(\w+):(\w+)(?::(\d+)|\s*(>=|<=|>|<|==|=)\s*(\d+))$/); if (!m) return null; const op = m[4] != null ? '>=' : m[5], n = +(m[4] ?? m[6]);
  const [lo, hi] = op === '>=' ? [n, 5] : op === '>' ? [n + 1, 5] : op === '<=' ? [0, n] : op === '<' ? [0, n - 1] : [n, n]; return { a: m[2], b: m[3], lo: m[1] ? (lo > 0 ? 0 : hi + 1) : lo, hi: m[1] ? (lo > 0 ? lo - 1 : 5) : hi }; };
// does what a block asks for (its closure) make sure that c holds? (syntactic: what the model would prove with Z3,
// in the cases the rules use; when it cannot tell, no: the check in the browser is the strict one)
function nocheImplica(S, c){
  if (S.has(c)) return true;
  if (/^sabe:(lynde|marilla|matthew|spencer):nina_cuthbert$/.test(c)) return true;   // (they always know: the model says so)
  { const m = c.match(/^presente:(\w+)$/), e = m && LLEGADAS[m[1]]; if (m && (!e || (S.has('hecho:llego_' + m[1]) && !e.visita && !e.seVa.length))) return true; }   // (who never leaves Avonlea is always here; who came to stay, too)
  const f = nocheAfecto(c); if (f) return [...S].some(x => { const g = nocheAfecto(x); return g && g.a === f.a && g.b === f.b && g.lo >= f.lo && g.hi <= f.hi; });
  { const m = c.match(/^!estacion:(\S+)$/); if (m) return [...S].some(x => /^estacion:/.test(x) && x !== 'estacion:' + m[1]); }
  return false;
}
const nocheContradice = (S, c) => c[0] === '!' ? nocheImplica(S, c.slice(1)) : S.has('!' + c) || (/^estacion:/.test(c) && [...S].some(x => /^estacion:/.test(x) && x !== c));
// what each one says in a block, as the model sees it: their lines, and the conditions under which they say them
function nocheUnidades(b, c){
  const V = nocheVocab(), out = [];
  if (b.tipo === 'dicho') {
    const M = V.momentos[c.momento] || { si: [] };
    for (const l of c.lineas) { const conds = [...M.si, ...c.si, ...l.si].filter(x => !x.includes('{')), k = c.quien; out.push({ k, conds: [...conds, 've:' + k, ...(/(?<![\p{L}\p{N}_])(Ana|Shirley)(?![\p{L}\p{N}_])/u.test(l.t.replace(/\([^)]*\)/g, '')) && !CONOCE_BASE.includes(k) ? ['conoce:' + k] : [])], textos: [l.t], deja: new Set() }); }
    return out;
  }
  if (b.tipo === 'respuesta') return out;   // (letters are not in the model: nobody says them to Ana's face)
  const L = [], ver = X => { for (const l of X || []) { if (l[0] === '?') for (const o of l[2] || []) ver(o.lineas); else if (l[0] !== '!') L.push(l); } };
  ver(c.lineas);
  const deja = new Set(nocheAcciones(c).filter(x => x.a.hecho).map(x => x.a.hecho)), en = Object.entries(c.en || {}).map(([k, v]) => `donde:${k}:${v}`);
  for (const k of new Set(L.map(l => l[0]).filter(k => V.personas.has(k)))) out.push({ k, conds: [...[].concat(c.si || []).map(String), ...en, 've:' + k], textos: L.filter(l => l[0] === k).map(l => l[1]), deja });
  return out;
}
function nocheReglas(b, c){
  const R = nocheVocab().reglas, motivos = [];
  const pat = r => new RegExp(r.palabras.map(p => '(?<![\\p{L}\\p{N}_])' + p.replace(/[\\^$.*+?()[\]{}|/]/g, '\\$&')).join('|'), 'u');
  for (const u of nocheUnidades(b, c)) {
    const S = nocheCierre(u.conds), sub = x => x.split('{k}').join(u.k);
    for (const x of u.conds) if (u.conds.includes(x[0] === '!' ? x.slice(1) : '!' + x)) { motivos.push(`${u.k}: sus condiciones se contradicen (${x})`); break; }
    for (const r of R.referencia) {
      if ((r.salvo || []).includes(u.k)) continue;
      const hit = u.textos.find(t => pat(r).test(t)); if (hit == null) continue;
      if (r.exige.some(g => g.some(x => x.startsWith('hecho:') && u.deja.has(x.slice(6))))) continue;   // (the scene that makes it so)
      if (!r.exige.some(g => g.every(x => nocheImplica(S, sub(x))))) motivos.push(`${u.k} dice «${hit.slice(0, 60)}», y eso exige ${r.exige.map(g => g.map(sub).join(', ')).join(' o ')} (regla: ${r.nombre})`);
    }
    for (const r of R.solo) {
      if (!nocheGrupo(r['quiénes']).has(u.k)) continue;
      if ((r.pide || []).some(p => u.conds.some(x => x.includes(p)))) continue;
      if ((r.cuando || []).some(x => nocheContradice(S, sub(x)))) continue;
      motivos.push(`${u.k}: mientras ${(r.cuando || []).map(sub).join(', ')}, solo dice lo que pida ${(r.pide || []).join(' o ')} (regla: ${r.nombre})`);
    }
    for (const r of R.nunca) if ((r.si || []).length && r.si.every(x => S.has(sub(x)))) motivos.push(`${u.k}: nunca puede darse (${r.nombre})`);
    if (S.has('!conoce:' + u.k) && u.conds.includes('conoce:' + u.k)) motivos.push(`${u.k} nombra a Ana sin conocerla`);
  }
  return motivos;
}
// a block of sayings: «=== momento ===», «quien:», «si:», «- [condiciones] texto»
function nocheDichoLeer(texto){
  const c = { momento: null, quien: null, si: [], lineas: [] }, comas = v => v.split(',').map(x => x.trim()).filter(Boolean); let n = 0;
  for (const raw of String(texto).split('\n')) {
    const s = raw.trim(); if (!s || s[0] === '#') continue; let m;
    if ((m = s.match(/^===\s*(.+?)\s*===$/))) { n++; c.momento = m[1]; continue; }
    if ((m = s.match(/^quien:\s*(\S+)/))) c.quien = m[1];
    else if ((m = s.match(/^si:\s*(.*)$/))) c.si = comas(m[1]);
    else if ((m = s.match(/^-\s*(?:\[([^\]]*)\]\s*)?(.+)$/))) c.lineas.push({ si: m[1] ? comas(m[1]) : [], t: m[2].trim() });
    else c.raro = s;
  }
  c.bloques = n; return c;
}
// the raw fields of a block of the script (before «---»), to say which ones it may not use
const nocheCamposDe = texto => { const out = []; let cab = false; for (const raw of String(texto).split('\n')) { const s = raw.trim(); if (!s || s[0] === '#') continue; if (/^===/.test(s)) { cab = true; continue; } if (s === '---') break; if (cab) { const i = s.indexOf(':'); out.push(i < 0 ? s : s.slice(0, i).trim()); } } return out; };
// one block: { motivos, c (what it is, parsed), id, hito, iaDeja } — ctx: the level, the «ia_» facts and ids already there
function nocheRevisar(b, ctx){
  const V = nocheVocab(), n = NOCHE_N[ctx.nivel] || 0, M = [], out = { motivos: M, iaDeja: [], hito: null };
  const tipo = b?.tipo, texto = String(b?.texto || '');
  if (!['dicho', 'conversacion', 'respuesta', 'escena'].includes(tipo)) { M.push(`tipo «${tipo}» desconocido`); return out; }
  if (tipo === 'escena' && n < 2) M.push('una escena es del nivel «efectos» o más');
  if (texto.length > 6000) M.push('demasiado largo');
  const conds = cs => { for (const x of cs) { const e = nocheCondMal(x, ctx); if (e) M.push(e); } };
  // --- sayings: a line on its own floats (no one brings it about, it leads nowhere): what someone says goes in a scene
  if (tipo === 'dicho') { M.push('las frases sueltas ya no: lo que alguien dice va en una escena o conversación corta (dónde, quién está, qué lo provoca, qué responde o hace Ana)'); return out; }
  if (tipo === 'dicho') {
    const c = out.c = nocheDichoLeer(texto), m = V.momentos[c.momento];
    out.id = 'ia_dicho_' + (c.momento || '').replace(/\W+/g, '_');
    if (c.bloques !== 1) M.push('un bloque de dichos es un solo momento («=== momento ===»)');
    if (c.raro) M.push(`línea que no se entiende: «${c.raro.slice(0, 60)}»`);
    if (!m) M.push(`el momento «${c.momento}» no existe: solo se puede ampliar uno que el código ya pide`);
    else {
      if (m.fijo) M.push(`el momento «${c.momento}» se dice en orden, por número: no se le agregan líneas`);
      if (!m.quien) M.push(`el momento «${c.momento}» lo dice quien el código elige: no se puede saber quién lo diría`);
      else if (c.quien !== m.quien) M.push(`«${c.momento}» lo dice ${m.quien}, no ${c.quien || 'nadie'} (falta «quien: ${m.quien}»)`);
      for (const l of c.lineas) for (const h of l.t.matchAll(/\{(\w+)\}/g)) if (!m.huecos.has(h[1])) M.push(`el hueco {${h[1]}} no lo llena el código en «${c.momento}»`);
    }
    if (!c.quien) M.push('falta «quien:»'); else if (!V.habla.has(c.quien)) M.push(`«${c.quien}» no es nadie del juego`);
    if (!c.lineas.length) M.push('no tiene ninguna línea');
    conds([...c.si, ...c.lineas.flatMap(l => l.si)].filter(x => !x.includes('{')));
    if (c.lineas.some(l => l.t.length > 300)) M.push('una línea demasiado larga');
    if (!M.length) M.push(...nocheReglas(b, c));
    return out;
  }
  // --- scenes, conversations, answers to letters: the script's format
  const hs = [...texto.matchAll(/^\s*===\s*(.+?)\s*===\s*$/gm)].map(m => m[1]);
  if (hs.length !== 1) { M.push('un bloque es una sola escena («=== ia_id ===»)'); return out; }
  const id = out.id = hs[0];
  if (!nocheId(id)) M.push(`el id «${id}» tiene que empezar con «ia_» (minúsculas, números y _)`);
  if (V.dichas.has(id) || ctx.iaIds.has(id)) M.push(`ya hay una escena «${id}»`);
  for (const k of nocheCamposDe(texto)) if (!NOCHE_CAMPOS[tipo].includes(k)) M.push(`el campo «${k}» no se permite en un bloque «${tipo}»`);
  let c; try { c = dlgGuion(texto)[0]; } catch (e) { M.push(String(e.message || e).replace(/^guion: /, '')); return out; }
  if (!c) { M.push('no se entiende el bloque'); return out; }
  out.c = c; const L = Array.isArray(c.lineas) ? c.lineas : [];
  if (!L.length) M.push('no tiene líneas (van después de «---»)');
  if (n >= 3) for (const m of texto.matchAll(/\bhecho\s+(ia_[a-z0-9_]+)/g)) ctx.iaHechos.add(m[1]);   // (its own «ia_» facts, in «libre»: undone below if it is rejected)
  const si = [].concat(c.si ?? []).filter(x => x != null && x !== '').map(String); conds(si);
  // who speaks
  const quienes = new Set(), ver = X => { for (const l of X || []) { if (l[0] === '?') for (const o of l[2] || []) { if (!o.texto) M.push('una opción sin texto'); ver(o.lineas); } else if (l[0] !== '!') { if (!String(l[1] || '').trim()) { M.push(`una línea sin «quien:» («${String(l[0]).slice(0, 50)}»): cada línea es «quien: texto»${tipo === 'respuesta' ? ' (en una carta, «carta: texto»)' : ''}`); continue; } quienes.add(String(l[0]).toLowerCase()); if (String(l[1]).length > 400) M.push('una línea demasiado larga'); } } };
  ver(L);
  for (const q of quienes) if (!V.habla.has(q)) M.push(`«${q}» no es nadie del juego`);
  { let n = 0; const contar = X => { for (const l of X || []) { if (l[0] === '?') for (const o of l[2] || []) contar(o.lineas); else if (l[0] !== '!' && l[0] !== 'narra' && String(l[1] || '').trim()) n++; } }; contar(L);
    const min = tipo === 'respuesta' ? 3 : NOCHE_LINEAS;
    if (n < min) M.push(`demasiado corta (${n} línea${n === 1 ? '' : 's'}): ${tipo === 'respuesta' ? 'una carta' : 'una escena'} tiene al menos ${min}, con un ida y vuelta`); }
  if (L.some(l => typeof l[1] === 'string' && /\{(?!estacion\})/.test(l[1]))) M.push('un hueco {…} que nadie llena (solo {estacion}, en las cartas)');
  if (tipo === 'respuesta') {
    if (c.canal !== 'respuesta') M.push('una respuesta lleva «canal: respuesta»');
    if (!CORREO[c.de]) M.push(`«de: ${c.de || ''}»: nadie contesta cartas con ese nombre (${Object.keys(CORREO).join(', ')})`);
    else if (!si.includes('respuesta:' + c.de)) M.push(`una respuesta pide «respuesta:${c.de}» en su «si:»`);
    if (c.responde && !DIALOGOS.some(d => d.id === c.responde && d.canal === 'carta' && d.si?.includes?.('carta:' + c.de))) M.push(`«responde: ${c.responde}»: no hay una carta de Ana a ${c.de} con ese nombre`);
    if ([...quienes].some(q => q !== 'carta')) M.push('una respuesta es solo la carta: líneas «carta: …»');
  }
  if (tipo === 'conversacion') {
    if (!V.personas.has(c.con)) M.push(`«con: ${c.con || ''}»: no es nadie del juego`);
    if (!c.tema) M.push('falta el «tema:» (cómo aparece en el menú)');
    for (const q of quienes) if (![c.con, 'ana', 'narra'].includes(q)) M.push(`en una conversación con ${c.con} solo hablan Ana y ${c.con} (no ${q})`);
  }
  if (tipo === 'escena') {
    if (!V.canales.has(c.canal)) M.push(`«canal: ${c.canal || ''}»: no es un canal para una escena de la noche (${[...V.canales].join(', ')})`);
    if (!(c.prioridad >= 0 && c.prioridad <= 6)) M.push('«prioridad:» de 0 a 6');
    for (const [k, v] of Object.entries(c.en || {})) if (!V.habla.has(k) || !V.escenas.has(v)) M.push(`«en: ${k}=${v}»: no se entiende (lugares: ${[...V.escenas].join(', ')})`);
    for (const q of quienes) if (!['ana', 'narra'].includes(q) && !(c.en && c.en[q])) M.push(`${q} habla, y no está en «en:» (dónde está)`);
    for (const k of [].concat(c.sujeta || [])) if (!V.habla.has(String(k).toLowerCase()) || ['narra', 'carta'].includes(String(k).toLowerCase())) M.push(`«sujeta: ${k}»: no es nadie del juego`);
  }
  // what it does
  const A = nocheAcciones(c), S = nocheCierre([...si, ...Object.entries(c.en || {}).map(([k, v]) => `donde:${k}:${v}`)]);
  if (A.length && n < 2) M.push('en el nivel «palabras», nada de efectos («al_empezar:», «al_terminar:», «! …»)');
  const respuestasOfrecidas = {};
  for (const { a, opcion } of A) {
    const w = Object.keys(a).find(k => a[k] !== undefined);
    if (!NOCHE_ACCIONES.includes(w)) { M.push(`«${w}» no está permitido a la IA`); continue; }
    if (n < 2) continue;
    if (w === 'olvidar') { if (!/^ia_/.test(a.olvidar)) M.push(`no puede olvidar «${a.olvidar}»: solo sus propios hechos «ia_»`); else if (n < 3) M.push('«olvidar» es del nivel libre'); continue; }
    if (w === 'suma') { const [q, k] = a.suma, [nom, dueño, hacia] = String(q).split(':'); if (!V.cualidades.has(nom) || !(V.personas.has(dueño) || dueño === 'ana') || (hacia && !(V.personas.has(hacia) || hacia === 'ana'))) M.push(`«suma ${q}»: no es una cualidad del juego`); if (![1, -1].includes(+k)) M.push(`«suma ${q} ${k}»: de a 1 (o -1) por vez`); continue; }
    if (w === 'cosa') { const [k, it, x] = a.cosa; if (!(V.personas.has(k) || k === 'ana') || !ITEM_DEFS[it] || !(x >= 1 && x <= 3)) M.push(`«cosa ${a.cosa.join(' ')}»: quien, una cosa del juego (${Object.keys(ITEM_DEFS).slice(0, 6).join(', ')}…), y de 1 a 3`); continue; }
    if (w === 'saber') { const [k, f] = a.saber; if (!V.personas.has(k) || !V.noticias.has(f)) M.push(`«saber ${a.saber.join(' ')}»: quien, y una noticia de src/datos/noticias.txt`); continue; }
    if (w !== 'hecho') continue;
    const x = a.hecho;
    if (/^ia_/.test(x)) { if (n < 3) M.push(`«hecho ${x}»: los hechos nuevos son del nivel libre`); else if (!/^ia_[a-z0-9_]+$/.test(x)) M.push(`«hecho ${x}»: mal escrito`); else out.iaDeja.push(x); continue; }
    if (!V.hechos.has(x)) { M.push(`«hecho ${x}»: no existe en el juego${n < 3 ? '' : ' (los nuevos, con «ia_»)'}`); continue; }
    const H = V.hitoHechos[x], r = V.respuestas[x];
    if (r) { if (opcion) (respuestasOfrecidas[r.hito] ||= new Set()).add(r.r); else M.push(`deja «${x}»: decide por Ana cómo reacciona en «${r.hito}» (eso lo elige quien juega: opciones con «! responde …»)`); continue; }
    if (H && x === 'historia_' + H) { if (opcion) M.push(`«historia_${H}» se deja al empezar, no en una opción`); (out.hitos ||= new Set()).add(H); continue; }
    if (H) { M.push(/^historia_/.test(x) ? `deja «${x}»: ese hecho lo pone el juego` : `deja «${x}»: es cómo pasa «${H}» en el libro (una escena que la trae de otra forma lleva «situacion: ${H}», sin ese hecho)`); continue; }
    if (!V.deEscena.has(x)) { M.push(`deja «${x}»: ese hecho lo pone el juego, no una escena`); continue; }
    const falta = (V.supone[x] || []).filter(y => !nocheImplica(S, y));
    if (falta.length) M.push(`deja «${x}», y no pide lo que ese hecho supone: ${falta.join(', ')}`);
  }
  // choices that are choices: in a scene or a conversation, each option leads somewhere of its own (its effects, or what
  // the other one answers), not the same thing said twice (the player wants scenes that matter)
  { const ops = L.filter(l => l[0] === '?').flatMap(l => l[2] || []), huella = o => JSON.stringify([(o.efectos || []).map(a => JSON.stringify(a)).sort(), (o.lineas || []).filter(l => l[0] !== 'ana' && l[0] !== '!').map(l => l[1])]);
    if (ops.length > 1 && new Set(ops.map(huella)).size < ops.length) M.push('hay opciones que llevan a lo mismo (los mismos efectos y nadie responde distinto): cada opción tiene que llevar a algo propio, o la escena va sin opciones'); }
  // the milestones: one at a time, ready for it and with chances left; the answers, all offered, for the player to choose
  const hs2 = new Set([...(out.hitos || []), ...(c.hito ? [String(c.hito)] : []), ...Object.keys(respuestasOfrecidas)]);
  if (hs2.size > 1) M.push('una escena trae una sola situación');
  for (const h of hs2) {
    const H = HITO_DE[h]; if (!H) { M.push(`«situacion: ${h}»: no es una de las situaciones abiertas`); continue; }
    const e = nocheHitoEstado(H), usadas = ctx.oportunidades[h] || 0, quedan = Math.max(0, H.otra - usadas);
    if (!c.hito) M.push(`trae la situación «${h}»: tiene que decirlo («situacion: ${h}»)`);
    if (!e.listo && !e.distinta) M.push(`«${h}» no es una situación abierta ahora (${e.paso ? 'ya pasó como en el libro' : e.cerrado ? 'su historia fue por otro lado' : 'todavía le falta lo que necesita'})`);
    else if (!quedan) M.push(`«${h}» ya no se puede traer de nuevo`);
    if (e.listo && !(out.hitos || new Set()).has(h)) M.push(`trae la situación de «${h}»: tiene que dejar «hecho historia_${h}» al empezar`);
    if (e.distinta && (out.hitos || new Set()).has(h)) M.push(`«historia_${h}» lo pone el juego (y ya pasó): sin ese hecho`);
    const F = nocheRespuestasDe(h), ops = L.filter(l => l[0] === '?').flatMap(l => l[2] || []);
    if (F.length) for (const o of ops) if (!(o.efectos || []).some(a => F.some(([x]) => x === a.hecho))) M.push(`la opción «${String(o.texto).slice(0, 60)}» no dice cómo reacciona Ana en «${h}»: cada opción lleva una de ${[...new Set(F.map(([, r]) => `«! responde ${r}»`))].join(', ')}`);
    const of = respuestasOfrecidas[h];
    if (of && of.size < 2) M.push(`ofrece una sola reacción en «${h}» (${[...of].join('')}): eso es elegir por Ana; que estén todas`);
    out.hito = h;
  }
  if (!M.length) M.push(...nocheReglas(b, c));
  return out;
}
// ---------------------------------------------------------------- the repairs: only how a block is written, never what
// it means (what the AI got wrong in its first nights on GitHub): «Ana:» is «ana:», a letter's lines are «carta:», Ana
// is always here, a scene plays once without guarding itself with its own id, a scene that brings a milestone starts
// by leaving its situation, and Ana is where the others are. Each one is told («reparado: …»)
let nocheNom = null;
const nocheDistancia = (a, b) => { const d = Array.from({ length: b.length + 1 }, (_, j) => j); for (let i = 1; i <= a.length; i++) { let p = d[0]; d[0] = i; for (let j = 1; j <= b.length; j++) { const t = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, p + (a[i - 1] === b[j - 1] ? 0 : 1)); p = t; } } return d[b.length]; };
function nocheQuien(q){   // a speaker as the AI may write it («Ana», «Marilla», «la Sra. Lynde») → its id, or null
  const V = nocheVocab(), k = String(q || '').trim().toLowerCase(); if (V.habla.has(k)) return k;
  if (!nocheNom) { nocheNom = {}; for (const id of V.personas) for (const n of [NAMES[id], FOLK_DEFS[id]?.name, CH[id]?.fullName]) if (n) { const x = n.toLowerCase(); nocheNom[x] = nocheNom[x] && nocheNom[x] !== id ? '?' : id; nocheNom[nocheSinArt(x)] ??= id; } }
  const id = nocheNom[k] ?? nocheNom[nocheSinArt(k)]; if (id && id !== '?') return id;
  // a slip of one letter («mattthew», «marila»): the only id that close, if there is just one
  const cerca = k.length >= 5 ? [...V.habla].filter(x => x.length >= 5 && nocheDistancia(x, k) === 1) : [];
  return cerca.length === 1 ? cerca[0] : null;
}
function nocheReparar(b){
  const R = [], tipo = b?.tipo; if (!b || !['dicho', 'conversacion', 'respuesta', 'escena'].includes(tipo)) return { bloque: b, reparado: R };
  let texto = String(b.texto ?? '').replace(/\r\n?/g, '\n');
  if (tipo === 'dicho') {
    texto = texto.replace(/^(\s*quien:\s*)(\S+)/m, (x, a, q) => { const k = nocheQuien(q); if (!k || k === q) return x; R.push(`quien: ${q} → ${k}`); return a + k; });
    return { bloque: { ...b, texto }, reparado: R };
  }
  // an open situation, as the AI says it («situacion: rival»), is a milestone for the game; «! responde x» in an option
  // is the fact that says Ana reacted that way; and the scene plays while the situation is still to happen
  const F = [];
  texto = texto.replace(/^(\s*)situaci[oó]n:/m, '$1hito:');
  { const h = (texto.match(/^\s*hito:\s*(\S+)/m) || [])[1], H = h && HITO_DE[h];
    texto = texto.replace(/^(\s*)!\s*responde\s+(\S+)\s*$/gm, (x, ind, r) => {
      const f = H && nocheRespuestasDe(h).find(([, y]) => y === r)?.[0];
      if (f) { R.push(`«responde ${r}» → «hecho ${f}»`); return `${ind}! hecho ${f}`; }
      F.push(H ? `«! responde ${r}»: Ana no puede reaccionar así en «${h}» (${[...new Set(nocheRespuestasDe(h).map(([, y]) => y))].join(', ') || 'esta situación no tiene reacciones que elegir'})` : `«! responde ${r}»: va en una escena con «situacion: <clave>»`);
      return x; });
    if (tipo === 'escena' && H && nocheHitoEstado(H).listo && !new RegExp(`!hecho:historia_${h}(?!\\w)`).test(texto)) {
      if (/^\s*si:/m.test(texto)) texto = texto.replace(/^(\s*si:\s*)(.*)$/m, (x, a, c) => a + (c.trim() ? c.trim() + ', ' : '') + '!hecho:historia_' + h);
      else texto = texto.replace(/^(\s*hito:.*)$/m, `$1\nsi: !hecho:historia_${h}`);
      R.push(`agregado «!hecho:historia_${h}» (mientras la situación no pase)`); } }
  { const id0 = (texto.match(/^\s*===\s*(.+?)\s*===/m) || [])[1];   // (its id starts with «ia_»: and what in it names the id)
    if (id0 && !/^ia_/.test(id0) && /^[A-Za-z0-9_]+$/.test(id0)) { const id = 'ia_' + id0.toLowerCase(); texto = texto.replace(/^(\s*===\s*).+?(\s*===)/m, `$1${id}$2`).replace(new RegExp(`(hecho:|dicha:|dias_desde:|hecho\\s+|olvidar\\s+)${id0}(?![\\w])`, 'g'), `$1${id}`); R.push(`id «${id0}» → «${id}»`); } }
  texto = texto.replace(/(hecho:|dias_desde:|hecho[ \t]+)([a-z_]+)(?![\w])/g, (x, a, h) => { if (!HITO_DE[h] || nocheVocab().hechos.has(h)) return x; R.push(`«${a.trim()}${a.endsWith(':') ? '' : ' '}${h}» → «${a.trim()}${a.endsWith(':') ? '' : ' '}historia_${h}» (un hito no es un hecho)`); return a + 'historia_' + h; });
  const hitoYa = (h => h && HITO_DE[h] && hitoHecho(h) ? h : null)((texto.match(/^\s*hito:\s*(\S+)/m) || [])[1]);   // (a second chance: its own guard would keep it from ever playing)
  const L = texto.split('\n'), own = (texto.match(/^\s*===\s*(.+?)\s*===/m) || [])[1], repite = /^\s*repetir:\s*(?!una_vez)\S/m.test(texto);
  const hablan = new Set(); let cuerpo = false, cartas = 0;
  const ids = (v, sep) => v.split(sep).map(x => { const [k, ...r] = x.split('='), q = k.trim(), id = nocheQuien(q); if (id && id !== q) R.push(`${q} → ${id}`); return [id && id !== q ? id : q, ...r].join('='); }).join(sep);
  for (let i = 0; i < L.length; i++) {
    const raw = L[i], s = raw.trim(); if (!s || s[0] === '#' || /^===/.test(s)) continue;
    if (s === '---') { cuerpo = true; continue; }
    if (!cuerpo) {
      const m = s.match(/^(en|sujeta|con|de|si):\s*(.*)$/); if (!m) continue;
      if (m[1] === 'si') {
        const cs = m[2].split(',').map(x => x.trim()).filter(Boolean), quedan = cs.filter(c => !(c === 'presente:ana' || (!repite && own && (c === '!hecho:' + own || c === '!dicha:' + own)) || (hitoYa && c === '!hecho:historia_' + hitoYa)));
        for (const c of cs.filter(c => !quedan.includes(c))) R.push(c === 'presente:ana' ? 'sin «presente:ana» (Ana siempre está)' : hitoYa && c === '!hecho:historia_' + hitoYa ? `sin «${c}» (es otra oportunidad: el hito ya pasó)` : `sin «${c}» (una escena se dice una vez)`);
        if (quedan.length !== cs.length) L[i] = quedan.length ? 'si: ' + quedan.join(', ') : '';
      } else if (m[1] === 'con' || m[1] === 'de') { const k = nocheQuien(m[2]); if (k && k !== m[2].trim()) { R.push(`${m[1]}: ${m[2].trim()} → ${k}`); L[i] = m[1] + ': ' + k; } }
      else L[i] = m[1] + ': ' + ids(m[2], ',').replace(/,(?=\S)/g, ', ');
      continue;
    }
    if (s.startsWith('->') || s.startsWith('!')) continue;
    const ind = raw.match(/^\s*/)[0], m = s.match(/^([^:]{1,40}?)(\s+piensa)?:\s*(.*)$/), k = m && nocheQuien(m[1]);
    if (tipo === 'respuesta') {   // (a letter is its «carta:» lines: what has no «carta:» is the letter too)
      if (k === 'carta') continue;
      L[i] = ind + 'carta: ' + (k && m[3] ? m[3] : s); cartas++; continue;
    }
    if (k) { if (k !== m[1]) { L[i] = ind + k + (m[2] || '') + ': ' + m[3]; R.push(`«${m[1]}:» → «${k}:»`); } hablan.add(k); }
  }
  if (cartas) R.push(`${cartas} línea(s) de la carta con «carta:»`);
  // a scene with «hito:» starts by leaving the situation (if the milestone is still to happen)
  { const h = (texto.match(/^\s*hito:\s*(\S+)/m) || [])[1], H = h && HITO_DE[h];
    if (tipo === 'escena' && H && nocheHitoEstado(H).listo && !new RegExp(`^\\s*al_empezar:\\s*hecho\\s+historia_${h}\\s*$`, 'm').test(texto)) { const i = L.findIndex(l => /^\s*hito:/.test(l)); L.splice(i + 1, 0, 'al_empezar: hecho historia_' + h); R.push(`agregado «al_empezar: hecho historia_${h}»`); } }
  // Ana speaks, and «en:» says where the others are but not her: where they all are
  if (tipo === 'escena' && hablan.has('ana')) {
    const i = L.findIndex(l => /^\s*en:/.test(l)), en = i < 0 ? null : Object.fromEntries(L[i].replace(/^\s*en:\s*/, '').split(',').map(x => x.split('=').map(y => y.trim())).filter(x => x[0]));
    const lugares = en ? new Set([...hablan].filter(k => k !== 'ana' && k !== 'narra' && en[k]).map(k => en[k])) : new Set();
    if (en && !en.ana && lugares.size === 1) { const l = [...lugares][0]; L[i] = L[i].replace(/\s*$/, '') + ', ana=' + l; R.push(`agregado «ana=${l}» a «en:» (donde están los demás)`); }
  }
  return { bloque: { ...b, texto: L.join('\n') }, reparado: [...new Set(R)], motivos: F };
}
// the blocks of one night, in order (what one accepts, the next can use, in «libre»): { aceptados, rechazados }; antes:
// what this night already accepted (the second round, after the AI corrected what was rejected)
function nocheValidar(bloques, nivel = nocheNivel(), antes = []){
  nocheV = null; nocheNom = null;   // (what exists now: tonight's facts, and what other nights added)
  const prev = [...(game.noche?.bloques || []), ...antes];
  const ctx = { nivel, iaHechos: new Set(prev.flatMap(b => b.iaDeja || [])), iaIds: new Set(prev.map(b => b.id)), oportunidades: { ...(game.noche?.oportunidades || {}) } };
  for (const b of antes) if (b.hito) ctx.oportunidades[b.hito] = (ctx.oportunidades[b.hito] || 0) + 1;
  const aceptados = [], rechazados = [], veredictos = [];   // (veredictos: one per block, in order: for tools/noche.js)
  for (const b0 of [].concat(bloques || []).slice(0, NOCHE_MAX)) {
    let r, b = b0, reparado = [], iaAntes = new Set(ctx.iaHechos);
    try { let F; ({ bloque: b, reparado, motivos: F = [] } = nocheReparar(b0)); r = nocheRevisar(b, ctx); r.motivos.unshift(...F); } catch (e) { r = { motivos: ['no se pudo revisar: ' + (e.message || e)] }; }
    if (r.motivos.length) { ctx.iaHechos = iaAntes; rechazados.push({ bloque: b0, motivos: r.motivos, reparado }); veredictos.push({ aceptado: false, id: r.id || null, motivos: r.motivos, reparado, texto: String(b.texto) }); continue; }
    if (ctx.iaIds.has(r.id)) r.id += '_' + (ctx.iaIds.size + 1);   // (two sayings of the same moment: told apart)
    const a = { tipo: b.tipo, id: r.id, texto: String(b.texto), porque: String(b.porque || ''), iaDeja: r.iaDeja, hito: r.hito || undefined, ...(reparado.length ? { reparado } : {}) };
    aceptados.push(a); veredictos.push({ aceptado: true, id: a.id, motivos: [], reparado, texto: a.texto }); ctx.iaIds.add(a.id); for (const x of r.iaDeja) ctx.iaHechos.add(x); if (r.hito) ctx.oportunidades[r.hito] = (ctx.oportunidades[r.hito] || 0) + 1;
  }
  for (const b of [].concat(bloques || []).slice(NOCHE_MAX)) { const motivos = [`más de ${NOCHE_MAX} bloques en una noche`]; rechazados.push({ bloque: b, motivos, reparado: [] }); veredictos.push({ aceptado: false, id: null, motivos, reparado: [], texto: String(b?.texto || '') }); }
  return { aceptados, rechazados, veredictos, completo: false };   // (completo: the full model, with Z3, is not run here: tools/noche.js runs it in Node; nocheModelo is the hook)
}
// the second round: what was rejected goes back to the AI with why, once, for corrected versions (the same schema)
function nocheReparacionPedido(p, bloques, rechazados){
  const lista = rechazados.map((x, i) => `${i + 1}. (${x.bloque?.tipo})\n${String(x.bloque?.texto || '').trim()}\nMOTIVOS: ${x.motivos.join(' · ')}`).join('\n\n');
  return { ...p, mensajes: [...p.mensajes, { role: 'assistant', content: JSON.stringify({ bloques }) },
    { role: 'user', content: `El juego revisó tus bloques y descartó estos, por estos motivos:\n\n${lista}\n\nDevuelve versiones corregidas SOLO de estos bloques (el mismo esquema; como mucho ${rechazados.length}), cumpliendo los formatos y las reglas. Si alguno no tiene arreglo sin cambiar lo que quiere decir, déjalo fuera.` }] };
}
// the hook for the full model in the browser (later): the data and the accepted blocks, as tools/modelo-nucleo.js reads
// them (textos by path); running it needs z3-solver's bundle and trazas/planilla.json, which the game does not carry yet
const nocheModelo = null;

// ---------------------------------------------------------------- what was accepted: into this game
function nocheRegistrar(b){
  if (b.tipo === 'dicho') {
    const c = nocheDichoLeer(b.texto), M = nocheMomentos()[c.momento]; if (!M) return;
    c.lineas.forEach((l, i) => { const d = { id: 'dicho:' + b.id + ':' + i, momento: c.momento, quien: c.quien, si: [...M.si, ...c.si, ...l.si], t: l.t, ia: true }; DICHOS.push(d); (DICHOS_DE[c.momento] ||= []).push(d); });
    return;
  }
  const c = dlgGuion(b.texto)[0]; if (!c || DIALOGOS.some(d => d.id === c.id)) return;
  if (b.tipo === 'conversacion') CONVERSACIONES.push(convRegistrar({ ...c, ia: true }));
  else Dialogo.registrar({ ...c, ia: true });
}
function nocheAceptar(L){
  const N = noche();
  for (const b of L) { N.bloques.push(b); nocheRegistrar(b); if (b.hito) N.oportunidades[b.hito] = (N.oportunidades[b.hito] || 0) + 1; }
}
for (const b of game.noche?.bloques || []) try { nocheRegistrar(b); } catch (e) { console.warn('noche: no se pudo registrar', b.id, e); }   // (what other nights added to this game)

// ---------------------------------------------------------------- the pass: when she goes to sleep, or «Probar ahora»
let nocheEnCurso = null;
async function nochePasar(){
  const nivel = nocheNivel(), p = nochePedido(nivel), dia = today() + 1, rondas = [];
  let modelo = p.modelo, error = null;
  try {
    const r = await nocheLlamar(p, NOCHE_AJ.clave), v = nocheValidar(r.bloques, nivel); modelo = r.modelo || modelo; rondas.push(v);
    if (v.rechazados.length) {   // (once: what was rejected, back to the AI with why)
      try { const r2 = await nocheLlamar(nocheReparacionPedido(p, r.bloques, v.rechazados), NOCHE_AJ.clave), v2 = nocheValidar(r2.bloques.slice(0, v.rechazados.length), nivel, v.aceptados), ids = new Set(r2.bloques.map(nocheIdDe));
        for (const x of v.rechazados) if (!ids.has(nocheIdDe(x.bloque))) v2.rechazados.push({ bloque: { tipo: x.bloque?.tipo, texto: x.bloque?.texto, porque: x.bloque?.porque }, motivos: ['la IA no la volvió a mandar'], reparado: [] });
        rondas.push(v2); }
      catch (e) { rondas.push({ aceptados: [], rechazados: [], error: String(e.message || e) }); }
    }
    nocheAceptar(rondas.flatMap(x => x.aceptados));
  } catch (e) { error = String(e.message || e); }
  const N = noche(), A = rondas.flatMap((x, i) => x.aceptados.map(b => ({ id: b.id, ronda: i + 1, reparado: b.reparado || [] })));
  N.log.push({ dia, nivel, modelo, error, aceptados: A, rechazados: rondas.flatMap((x, i) => x.rechazados.map(y => ({ ronda: i + 1, tipo: y.bloque?.tipo, texto: String(y.bloque?.texto || '').slice(0, 2000), porque: y.bloque?.porque || '', motivos: y.motivos, reparado: y.reparado || [] }))), ...(rondas[1]?.error ? { error2: rondas[1].error } : {}) });
  if (N.log.length > 30) N.log.splice(0, N.log.length - 30);
  save(); return { error, n: A.length, rondas };
}
function nocheDormir(){
  if (nocheNivel() === 'apagado' || !NOCHE_AJ.clave || nocheEnCurso) return;
  nocheEnCurso = nochePasar().then(r => { nocheEnCurso = null; const avisar = () => sleeping ? setTimeout(avisar, 600) : r.error ? notice('🌙 La IA de la noche no pudo pensar esta vez (' + r.error.slice(0, 90) + ')') : r.n ? notice(`🌙 Mientras dormías, Avonlea pensó en ti: ${r.n} ${r.n === 1 ? 'cosa nueva' : 'cosas nuevas'}`) : null; avisar(); return r; });
}

// ---------------------------------------------------------------- ✒ Ajustes: the level, the key, the model, and what it added
function nocheAjustesMostrar(){
  const sel = $('ajnivel'); if (!sel) return;
  if (!sel.options.length) for (const [k, t] of Object.entries(NOCHE_NIVELES)) sel.add(new Option(t, k));
  sel.value = nocheNivel(); $('ajclave').value = NOCHE_AJ.clave || ''; $('ajmodelo').value = NOCHE_AJ.modelo || NOCHE_MODELO;
}
const nocheAjustesLeer = () => { NOCHE_AJ.nivel = $('ajnivel').value; NOCHE_AJ.clave = $('ajclave').value.trim(); NOCHE_AJ.modelo = $('ajmodelo').value.trim() || NOCHE_MODELO; nocheGuardarAj(); };
for (const id of ['ajnivel', 'ajclave', 'ajmodelo']) $(id)?.addEventListener('change', nocheAjustesLeer);
function nocheInforme(){
  const N = game.noche; if (!N || (!N.bloques.length && !N.log.length)) return 'La noche todavía no agregó nada en esta partida.';
  const acept = N.bloques.map(b => `✓ [${b.tipo}] ${b.id}${b.hito ? ' (hito: ' + b.hito + ')' : ''}\n   por qué: ${b.porque || '—'}${b.reparado?.length ? '\n   reparado: ' + b.reparado.join('; ') : ''}\n   ${b.texto.split('\n').filter(l => l.trim()).slice(0, 8).join('\n   ')}`).join('\n\n');
  const noches = N.log.slice(-8).reverse().map(l => `— Noche del día ${l.dia} (${l.nivel}, ${l.modelo})${l.error ? ': no pudo (' + l.error + ')' : `: ${l.aceptados.length} aceptadas, ${l.rechazados.length} descartadas`}${l.error2 ? ' (la segunda ronda no pudo: ' + l.error2 + ')' : ''}`
    + l.aceptados.map(x => typeof x === 'string' ? '' : `\n   ✓ ${x.id}${x.ronda > 1 ? ' (corregido por la IA)' : ''}${x.reparado?.length ? ' — reparado: ' + x.reparado.join('; ') : ''}`).join('')
    + l.rechazados.map(x => `\n   ✗ ${x.ronda ? 'ronda ' + x.ronda + ' ' : ''}[${x.tipo}] ${(String(x.texto).match(/===\s*(.+?)\s*===/) || [])[1] || ''}: ${x.motivos.join('; ')}${x.reparado?.length ? ' (reparado: ' + x.reparado.join('; ') + ')' : ''}`).join('')).join('\n');
  return '— Lo que agregó la noche —\n' + (acept || '(nada aceptado todavía)') + '\n\n— Las noches —\n' + (noches || '(ninguna)');
}
$('ajnocheve')?.addEventListener('click', () => { const o = $('ajout'); o.hidden = false; o.textContent = nocheInforme(); });
$('ajprobar')?.addEventListener('click', async () => {
  nocheAjustesLeer(); const o = $('ajout'); o.hidden = false;
  if (nocheNivel() === 'apagado') { o.textContent = 'Elige un nivel (no «Apagado») para probar.'; return; }
  if (!NOCHE_AJ.clave) { o.textContent = 'Falta la clave de OpenAI.'; return; }
  if (nocheEnCurso) { o.textContent = 'La noche ya está pensando…'; return; }
  o.textContent = '🌙 Pensando… (puede tardar un minuto; puedes seguir jugando)';
  nocheEnCurso = nochePasar(); const r = await nocheEnCurso; nocheEnCurso = null;
  o.textContent = (r.error ? 'No pudo: ' + r.error : `🌙 Avonlea pensó en ti: ${r.n} ${r.n === 1 ? 'cosa nueva' : 'cosas nuevas'}.`) + '\n\n' + nocheInforme();
});
