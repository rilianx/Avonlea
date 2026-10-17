/* ---------- the story of the day: a little episode (from the books or the series) written each morning, played out
   with the characters and what they can do. Each scene has an hour, a place and who is there; the characters go there
   by themselves, and when Ana arrives the scene is played (the AI writes it); an errand in it is what Ana decides. ---------- */
/* the building blocks of a story (to add one: an entry here; the AI is told about it, the game checks and runs it)
   effects: things that happen when a scene begins ("antes") or ends ("despues"); events: what the game itself notices
   (a scene can end when one happens); frases: lines that must be said word for word */
const STORY_EFFECTS = {
  ausente: { desc: 'los de "quien" se van al pueblo (salen del mapa por el camino) hasta la hora "hasta"', run: f => { for (const k of f.quien) if (PEOPLE[k] && !CH[k].companion) PEOPLE[k].away = { day: today(), until: f.hasta || 19 }; } },
  vaca_suelta: { desc: 'una vaca ("animal") se escapa y se va a un campo o corral ("lugar": una de las áreas)', run: f => { const a = ANIM[f.animal]; if (a && a.kind === 'cow' && AREAS[f.lugar] && a.state !== 'bought') { a.state = 'loose'; a.area = f.lugar; a.goal = null; a.nav = null; } } },
  estado_ana: { desc: 'a Ana le pasa algo que se ve ("estado")', run: f => { if (ANA_STATES[f.estado]) setAnaState(f.estado); } },
};
const STORY_EVENTS = {
  vaca_agarrada: 'Ana agarra una vaca de la cuerda', 'agarrada:<animal>': 'Ana agarra de la cuerda a ese animal', vaca_vendida: 'Ana vende una vaca', 'vendida:<animal>': 'Ana vende ese animal', venta_rechazada: 'a Ana le ofrecen comprarle una vaca y ella dice que no', vaca_en_corral: 'Ana deja una vaca en el corral de Tejas Verdes', vaca_en_potrero: 'Ana deja una vaca en el potrero del Sr. Harrison', vaca_en_avena: 'Ana deja una vaca en el campo de avena',
  cocinado: 'Ana cocina algo', 'cocinado:tarta': 'Ana cocina una tarta', 'cocinado:te': 'Ana prepara té', 'regalo:<personaje>': 'Ana le regala o le da algo a ese personaje (por ejemplo regalo:harrison)',
};
const STORY_PLACES = () => [...Object.keys(PLACES), ...Object.keys(ROOMS)];
const placeName = l => PLACES[l] ? PLACES[l][0] : l === 'gg' ? 'la cocina de Tejas Verdes' : l === 'os' ? 'la salita de La Cuesta del Huerto' : l === 'rl' ? 'la casa de la Sra. Lynde' : l === 'ga' ? 'la pieza de Ana' : l === 'hh' ? 'la casa del Sr. Harrison' : l === 'br' ? 'la estación de Bright River' : HOUSES[l]?.inText?.replace(/^en /, '') || HOUSES[l]?.name || l;   // (the others: as the prompt says it, "la salita de la casa parroquial")
const S_EFFECT = () => ({ type: 'object', additionalProperties: false, required: ['tipo', 'quien', 'animal', 'lugar', 'estado', 'hasta', 'cuando'], properties: { tipo: { type: 'string', enum: Object.keys(STORY_EFFECTS) }, quien: { type: 'array', items: { type: 'string', enum: Object.keys(CH) } }, animal: { type: 'string', enum: ['', ...Object.keys(ANIMALS)] }, lugar: { type: 'string', enum: ['', ...Object.keys(AREAS)] }, estado: { type: 'string', enum: ['', ...Object.keys(ANA_STATES)] }, hasta: { type: 'integer' }, cuando: { type: 'string', enum: ['antes', 'despues'] } } });
const S_SCENE = () => ({ type: 'object', additionalProperties: false, required: ['id', 'hora', 'lugar', 'personajes', 'que_pasa', 'pista', 'encargo', 'fin', 'evento', 'efectos', 'frases', 'requiere', 'clave', 'contra'], properties: {
  id: { type: 'string' }, hora: { type: 'integer' }, lugar: { type: 'string', enum: STORY_PLACES() }, personajes: { type: 'array', items: { type: 'string', enum: Object.keys(CH) } },
  que_pasa: { type: 'string' }, pista: { type: 'string' }, encargo: AI_SCHEMA.properties.encargo, fin: { type: 'string', enum: ['llega_ana', 'encargo_cumplido', 'evento'] }, evento: { type: 'string' },
  efectos: { type: 'array', items: S_EFFECT() }, frases: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['quien', 'texto'], properties: { quien: { type: 'string', enum: ['ana', ...Object.keys(CH), ...Object.keys(ANIMALS).filter(k => ANIMALS[k].talks)] }, texto: { type: 'string' } } } },
  requiere: { type: 'array', items: { type: 'string' } }, clave: { type: 'boolean' }, contra: { type: 'array', items: { type: 'string' } } } });
const storySchema = () => ({ type: 'object', additionalProperties: false, required: ['titulo', 'inspiracion', 'resumen', 'escenas'], properties: { titulo: { type: 'string' }, inspiracion: { type: 'string' }, resumen: { type: 'string' }, escenas: { type: 'array', items: S_SCENE() } } });
const branchSchema = () => ({ type: 'object', additionalProperties: false, required: ['titulo_rama', 'resumen', 'escenas'], properties: { titulo_rama: { type: 'string' }, resumen: { type: 'string' }, escenas: { type: 'array', items: S_SCENE() } } });
const NO_TASK = { tipo: 'ninguno', item: '', cantidad: 0, para: '', lugar: '', recado: '' };
/* How a story works. The scenes written in the morning are the MAIN BRANCH: what would happen, more or less, if nobody
   forces anything. It is loose on purpose: each scene has an hour, but it opens when what it needs has happened
   ("requiere": earlier scenes or events), so a chain can run early or late; a scene that is not key ("clave": false) can
   be missed and the story goes on with a gap; one whose event happens by itself before its time counts as done ("ya").
   When a key scene can no longer be (Ana was not there, what it waited for did not happen, or something against it
   did: "contra"), the story opens a new BRANCH: the AI writes how it goes on from what really happened (without it:
   the branches written by hand, or else the main branch without what depended on the broken scene). */
const FINAL = ['hecha', 'ya', 'perdida', 'sin_evento', 'sin_encargo', 'rota', 'descartada'];
const GAP = ['perdida', 'sin_evento', 'sin_encargo'];   // (missed, not key: a gap the story goes on with)
const isFinal = e => FINAL.includes(e.estado);
const evKnown = n => typeof n === 'string' && /^[a-z_]+(:[a-z_]+){0,2}$/.test(n) && (!!STORY_EVENTS[n] || Object.keys(STORY_EVENTS).some(k => k.includes(':<') && n.startsWith(k.split(':')[0] + ':')));
const evDesc = n => STORY_EVENTS[n] || (() => { const k = Object.keys(STORY_EVENTS).find(k => k.includes(':<') && n.startsWith(k.split(':')[0] + ':')); return k ? STORY_EVENTS[k].replace(/ \(por ejemplo[^)]*\)/, '') + ' (' + n.split(':').slice(1).map(x => NAMES[x] || x).join(', ') + ')' : n; })();
function validBeats(list, h0, pre = '', known = []){
  const out = [], ids = new Set(known); let last = h0;
  for (const [k, e] of (Array.isArray(list) ? list : []).slice(0, 9).entries()) {
    if (!e) continue;
    const lugar = String(e.lugar || ''), inRoom = !!ROOMS[lugar]; if (!PLACES[lugar] && !inRoom) continue;
    const ps = [...new Set((Array.isArray(e.personajes) ? e.personajes : []).filter(k => CH[k]))].filter(k => lugar !== 'ga' && !(k === 'diana' && inRoom && lugar !== 'os'));
    const hora = Math.max(Math.round(+e.hora || 0), last, h0); if (hora > 21) break;
    const enc = e.encargo && e.encargo.tipo && e.encargo.tipo !== 'ninguno' && ps.length ? { ...NO_TASK, ...e.encargo } : null;
    const evento = evKnown(e.evento) ? e.evento : '', fin = e.fin === 'evento' && evento ? 'evento' : enc && e.fin === 'encargo_cumplido' ? 'encargo_cumplido' : 'llega_ana';
    const efectos = (Array.isArray(e.efectos) ? e.efectos : []).filter(f => f && STORY_EFFECTS[f.tipo]).map(f => ({ tipo: f.tipo, quien: (Array.isArray(f.quien) ? f.quien : []).filter(k => CH[k]), animal: ANIMALS[f.animal] ? f.animal : '', lugar: AREAS[f.lugar] ? f.lugar : '', estado: ANA_STATES[f.estado] ? f.estado : '', hasta: clamp(Math.round(+f.hasta || 19), 7, 23), cuando: f.cuando === 'despues' ? 'despues' : 'antes' }));
    const okq = ['ana', ...ps, ...Object.keys(ANIMALS).filter(k => ANIMALS[k].talks && ANIMALS[k].room === lugar)];
    const frases = (Array.isArray(e.frases) ? e.frases : []).filter(f => f && okq.includes(f.quien) && typeof f.texto === 'string' && f.texto.trim()).slice(0, 4).map(f => ({ quien: f.quien, texto: f.texto.trim().slice(0, 240) }));
    let id = pre + (String(e.id || '').toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 24) || 'e' + k); while (ids.has(id)) id += '_';
    const ref = r => ids.has(pre + r) ? pre + r : ids.has(r) || evKnown(r) ? r : null;   // (earlier scenes, or events: never later ones)
    const requiere = [...new Set((Array.isArray(e.requiere) ? e.requiere : []).map(r => ref(String(r))).filter(Boolean))].slice(0, 4);
    const contra = [...new Set((Array.isArray(e.contra) ? e.contra : []).filter(evKnown))].slice(0, 4);
    out.push({ id, hora, lugar, personajes: ps, que_pasa: String(e.que_pasa || '').slice(0, 400), pista: String(e.pista || '').slice(0, 90) || ('Algo pasa en ' + placeName(lugar)), encargo: enc, fin, evento: fin === 'evento' ? evento : '', efectos, frases, requiere, clave: !!e.clave, contra, margen: clamp(+e.margen || 3, 1, 6), estado: 'espera' });
    ids.add(id); last = hora;
  }
  return out;
}
function validStory(o, h0 = Math.max(8, Math.ceil(hourNow() + .5))){
  if (!o) return null;
  const esc = validBeats(o.escenas, h0); if (!esc.length) return null;
  return { v: 2, day: today(), titulo: String(o.titulo || 'Un día en Avonlea').slice(0, 80), inspiracion: String(o.inspiracion || '').slice(0, 120), resumen: String(o.resumen || '').slice(0, 300), escenas: esc, ev: {}, hechos: [], ramas: [], gen: false, fin: false };
}
const runEffects = (e, when) => { for (const f of e.efectos || []) if (f.cuando === when) STORY_EFFECTS[f.tipo].run(f); };
// a few stories written by hand, for when there is no AI (or it does not answer): src/datos/historias.json, put here by
// tools/build.js (each one: titulo, inspiracion, resumen, escenas, and maybe ramas, the other ways the day can go)
const STORIES = [/*@historias*/][0] || [];
function fallbackStory(){
  const ok = STORIES.filter(st => dianaAmiga() || !JSON.stringify(st).includes('"diana"'));   // (with Diana: once Ana knows her)
  const done = game.stories || [], fresh = ok.filter(st => !done.includes(st.titulo)), pool = fresh.length ? fresh : ok.length ? ok : STORIES;
  return validStory(pool[Math.floor(Math.random() * pool.length)]);
}
function storyMsg(){
  const prev = game.journal.filter(e => e.d === today()).slice(-12);
  return worldText() + `\n\nEMPIEZA EL DÍA ${today() + 1} (las escenas pueden ir de las ${Math.max(8, Math.ceil(hourNow() + .5))} a las 20).`
    + (prev.length ? `\nLO ÚLTIMO QUE PASÓ:\n${prev.map(e => '- ' + e.t).join('\n')}` : '')
    + `\n\nLAS RELACIONES (de cada uno hacia los demás, de 0 a 5):\n${NODES().map(f => `- ${nodeName(f)} → ${relText(f)}`).join('\n')}`
    + `\n\nLO QUE SE PUEDE TENER HOY: ${ITEMS.filter(k => inSeason(k)).map(k => ITEM_NAME[k][1]).join(', ')}.`
    + `\nLUGARES (claves): ${STORY_PLACES().map(l => l + ' = ' + placeName(l)).join('; ')}.`
    + ((game.stories || []).length ? `\nHISTORIAS DE DÍAS ANTERIORES (no las repitas): ${game.stories.slice(-8).join('; ')}.` : '')
    + `\n\nGUIÓN DEL DÍA: escribe la historia de hoy.`;
}
let storyBusy = false;
async function makeStory(){
  if (storyBusy) return; storyBusy = true;
  let st = null;
  if (game.nextStory) { const pick = STORIES.find(x => x.titulo === game.nextStory); game.nextStory = null; if (pick) st = validStory(pick); }
  else if (aiReady()) { try { st = validStory((await aiCall([{ role: 'user', content: storyMsg() }], storySchema())).out); } catch (e) { console.debug('[avonlea IA] guión', e.message); } }
  if (!st) st = fallbackStory();
  storyBusy = false;
  if (!st) return;
  for (const p of Object.values(PEOPLE)) { p.story = null; if (p.target?.story) p.target = null; }
  game.story = st; save();
  notice('📖 Hoy: «' + st.titulo + '» · ' + st.escenas[0].pista);
}
async function newDay(ended){
  storyBusy = true;
  if (aiReady()) { try { await reflectDay(ended); } catch (e) { console.debug('[avonlea IA] fin del día', e.message); } }
  storyBusy = false; if (AI.stories) makeStory();
}
function storyEvent(name){ const st = game.story; if (!st || st.day !== today()) return; (st.ev = st.ev || {})[name] = hourNow(); }
const storyOpen = () => { const st = AI.stories && game.story; return st && st.v === 2 && st.day === today() ? st.escenas.filter(e => e.estado === 'abierta').sort((a, b) => a.hora - b.hora) : []; };
const storyNow = () => storyOpen().find(e => !e.played) || null;
const storyPos = e => ROOMS[e.lugar] ? { room: e.lugar, place: null } : { room: 'out', place: e.lugar };
const storyHere = e => ROOMS[e.lugar] ? game.scene === e.lugar : game.scene === 'out' && dist(ana.x, ana.y, PLACES[e.lugar][1], PLACES[e.lugar][2]) < 150;
const storyPast = st => (st.hechos || []).slice(-6).map(h => h.t).join(' / ');
function storyText(who){
  const st = game.story; if (!st || st.v !== 2 || st.day !== today()) return '';
  const mine = st.escenas.filter(e => !isFinal(e) && e.personajes.includes(who)).slice(0, FULL() ? 9 : 1), past = FULL() ? storyPast(st) : '';   // (minimal: only what comes next for them)
  if (!mine.length && !past) return '';
  return `LA HISTORIA DE HOY («${st.titulo}»${FULL() ? ', inspirada en ' + st.inspiracion : ''})` + (past ? `. Lo que ha pasado hasta ahora (${NAMES[who]} solo sabe lo que vio o le contaron): ${past}.` : '.')
    + (mine.length ? ` Lo que viene, en lo que toca a ${NAMES[who]}: ` + mine.map(e => `hacia las ${e.hora}:00, en ${placeName(e.lugar)}: ${FULL() ? e.que_pasa : e.que_pasa.slice(0, 170)}`).join(' Después, ') + ' (Guíate por esto, sin adelantarlo.)' : '');
}
// when what a scene needs happened (null: not yet); a missed scene that was not key counts as a gap, not as a wall
function storyReq(st, e){
  let t = 0;
  for (const r of e.requiere || []) {
    const b = st.escenas.find(x => x.id === r);
    if (b && GAP.includes(b.estado)) continue;
    const h = st.ev[r]; if (h == null) return null; t = Math.max(t, h);
  }
  return t;
}
/* the judge (the AI): with the diary of what really happened, it decides if a scene already happened in what matters
   (even if not as written: another hour, without someone, in other words), if it can still happen, or if it no longer can */
const judgeSchema = ids => ({ type: 'object', additionalProperties: false, required: ['veredictos'], properties: { veredictos: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['id', 'veredicto', 'nota'], properties: { id: { type: 'string', enum: ids }, veredicto: { type: 'string', enum: ['cumplida', 'sigue', 'no_puede'] }, nota: { type: 'string' } } } } } });
const todayLog = () => game.journal.filter(j => j.d === today() + 1);
const whereNow = () => `DÓNDE ESTÁ CADA UNO: Ana: ${game.scene === 'out' ? placeText() : placeName(game.scene)}; ${Object.keys(CH).map(k => NAMES[k] + ': ' + whereText(k)).join('; ')}. Animales: ${Object.entries(ANIM).map(([k, a]) => `${k} (${ANIMALS[k].desc}): ${ANIMALS[k].kind !== 'cow' ? 'en su lugar' : a.state === 'bought' ? 'vendida a ' + (NAMES[a.owner] || a.owner) : a.state === 'led' ? 'Ana la lleva de la cuerda' : a.area && AREAS[a.area] ? 'en ' + AREAS[a.area].name : a.state || 'en su lugar'}`).join('; ')}. Lo que lleva Ana: ${ITEMS.filter(k => game.inv[k] > 0).map(k => itemText(k, game.inv[k])).join(', ') || 'nada'}.`;
function judgeMsg(st, beats){
  if (!FULL()) return `BITÁCORA DE HOY (hora: lo que pasó):\n${todayLog().slice(-25).map(j => `${j.h != null ? fmtHour(j.h) : '?'} ${j.t}`).join('\n') || '(nada)'}`
    + `\nEVENTOS: ${Object.entries(st.ev || {}).sort((a, b) => a[1] - b[1]).map(([k, t]) => fmtHour(t) + ' ' + k).join(', ') || '(ninguno)'}\nAHORA: ${fmtHour(hourNow())}.`
    + `\n\nPLAN (¿se cumplió?):\n${beats.map(e => `- "${e.id}" (hacia las ${e.hora}:00, en ${placeName(e.lugar)}${e.personajes.length ? ', con ' + e.personajes.map(k => NAMES[k]).join(' y ') : ''}): ${e.que_pasa}${e.fin === 'evento' ? ' (termina cuando ' + evDesc(e.evento).replace(/^./, c => c.toLowerCase()) + ')' : ''}`).join('\n')}`;
  const fin = e => e.fin === 'evento' ? 'termina cuando ' + evDesc(e.evento).replace(/^./, c => c.toLowerCase()) : e.fin === 'encargo_cumplido' ? 'termina cuando Ana cumple el encargo' : 'termina cuando se juega (Ana llega y la escena pasa)';
  return worldText() + `\n\nLA HISTORIA DE HOY: «${st.titulo}» (inspirada en ${st.inspiracion}). ${st.resumen}`
    + `\n\nBITÁCORA DE HOY (lo que de verdad pasó, con la hora):\n${todayLog().map(j => `- ${j.h != null ? fmtHour(j.h) : '?'} ${j.t}`).join('\n') || '(nada)'}`
    + `\n\nEVENTOS QUE EL JUEGO NOTÓ: ${Object.entries(st.ev || {}).sort((a, b) => a[1] - b[1]).map(([k, t]) => fmtHour(t) + ' ' + k).join(', ') || '(ninguno)'}`
    + `\nLO QUE YA PASÓ DE LA HISTORIA: ${storyPast(st) || '(nada aún)'}`
    + `\n${whereNow()}\nAHORA SON LAS ${fmtHour(hourNow())}.`
    + `\n\nESCENAS POR JUZGAR:\n${beats.map(e => `- "${e.id}" (hacia las ${e.hora}:00, en ${placeName(e.lugar)}${e.personajes.length ? ', con ' + e.personajes.map(k => NAMES[k]).join(' y ') : ''}; ${e.estado === 'jugada' ? 'ya se jugó la conversación' : e.estado === 'abierta' ? 'esperando que Ana llegue' : 'todavía no empieza'}): ${e.que_pasa} (${fin(e)})`).join('\n')}`
    + `\n\nJUEZ DE LA HISTORIA: decide cada escena.`;
}
async function storyJudge(st, beats){
  st.judging = true; st.judgeH = hourNow() + 1; st.judgeN = todayLog().length;   // (the next look, in an hour of the game)
  try {
    const o = (await aiCall([{ role: 'user', content: judgeMsg(st, beats) }], judgeSchema(beats.map(e => e.id)))).out;
    if (game.story !== st || st.gen) return;
    for (const v of Array.isArray(o.veredictos) ? o.veredictos : []) {
      const e = beats.find(b => b.id === v.id); if (!e || isFinal(e) || e.estado === 'jugando') continue;
      const nota = String(v.nota || '').trim().slice(0, 200); e.juicio = { v: v.veredicto, nota, h: hourNow() };
      if (v.veredicto === 'cumplida') { e.nota = nota; storyEnd(e, 'hecha'); }
      else if (v.veredicto === 'sigue' && e.juzgada === 'pend') { e.margen += 1; if (e.vence != null) e.vence = Math.max(e.vence, hourNow()) + 1; }   // (it can still happen: one more hour)
      else if (v.veredicto === 'no_puede') { if (e.clave) { st.judging = false; storyBranch(e, 'juez:' + nota); return; } e.nota = nota; storyEnd(e, 'perdida'); }
    }
  } catch (err) { console.debug('[avonlea IA] juez', err.message); }
  finally { st.judging = false; for (const e of beats) if (e.juzgada === 'pend') e.juzgada = 'ok'; save(); }
}
// before giving a scene up (or opening a branch), the judge looks at the diary: maybe it already happened, another way
function storyWait(st, e){
  if (!aiReady() || e.juzgada === 'ok') return false;
  e.juzgada = 'pend'; return true;   // (it waits for the judge's next look)
}
const storyEvDone = (st, e) => e.fin === 'evento' && st.ev[e.evento] != null && st.ev[e.evento] >= (e.reqAt ?? 0);
function storyTick(){
  const st = game.story; if (!st || st.v !== 2 || st.day !== today() || st.gen || st.fin) return;
  const hn = hourNow();
  for (const e of st.escenas) {
    if (isFinal(e) || e.estado === 'jugando') continue;
    const rq = storyReq(st, e);
    if (rq == null) {   // what it needs has not happened (yet)
      if (hn > e.hora + e.margen + 1) { if (storyWait(st, e)) continue; if (e.clave) return storyBranch(e, 'falta'); storyEnd(e, 'perdida'); }
      continue;
    }
    e.reqAt = Math.max(rq, e.hora - 3);
    const against = (e.contra || []).find(c => st.ev[c] != null && st.ev[c] >= e.reqAt);
    if (against && !storyEvDone(st, e)) return storyBranch(e, 'contra:' + against);
    if (e.estado === 'espera') {
      if (storyEvDone(st, e)) { storyEnd(e, 'ya'); continue; }   // (it happened by itself, before its time)
      if (hn > e.hora + e.margen && rq <= e.hora) { if (storyWait(st, e)) continue; if (e.clave) return storyBranch(e, 'tarde'); storyEnd(e, 'perdida'); continue; }   // (its time went by, e.g. the clock jumped)
      const early = e.requiere.length && hn >= Math.max(rq + .25, e.hora - 2);   // (what it waited for came early: so does it)
      if (hn < e.hora - .75 && !early) continue;
      e.estado = 'abierta'; e.vence = Math.max(e.hora, hn) + e.margen; e.opened = true; runEffects(e, 'antes'); notice('📖 ' + e.pista); save();
    }
    if (e.estado === 'abierta') {
      if (storyEvDone(st, e) && !e.played) { e.yaAt = e.yaAt ?? hn; if (!storyHere(e) || hn > e.yaAt + .5) { storyEnd(e, 'ya'); continue; } }
      if (hn > e.vence) { if (storyWait(st, e)) continue; if (e.clave) return storyBranch(e, 'tarde'); storyEnd(e, 'perdida'); }
      continue;
    }
    if (e.estado === 'jugada') {   // played: wait for the decisions, and for the errand or the event if there is one
      if (game.talk || amb.cur) continue;
      if (e.fin === 'encargo_cumplido') {
        const t = e.taskId && game.tasks.find(t => t.id === e.taskId);
        if (!e.taskId || (t && !t.done && hn > e.vence + 4)) { if (storyWait(st, e)) continue; if (e.clave) return storyBranch(e, 'sin_encargo'); storyEnd(e, 'sin_encargo'); continue; }
        if (t && !t.done) continue;
      }
      if (e.fin === 'evento' && !storyEvDone(st, e)) { if (hn < e.vence + 2 || storyWait(st, e)) continue; if (e.clave) return storyBranch(e, 'sin_evento'); storyEnd(e, 'sin_evento'); continue; }
      storyEnd(e, 'hecha');
    }
  }
  // the judge looks once an hour of the game (if Ana did something since, or a scene waits for it)
  if (aiReady() && !st.judging && hn >= (st.judgeH ?? 0)) {
    const c = st.escenas.filter(e => !isFinal(e) && e.estado !== 'jugando' && (e.estado === 'abierta' || e.estado === 'jugada' || e.juzgada === 'pend'));
    const news = todayLog().slice(st.judgeN ?? 0).some(j => /\bAna\b/.test(j.t) && !/^(Ana decidió|Ana durmió|El día tomó otro camino)/.test(j.t));
    if (c.length && (news || c.some(e => e.juzgada === 'pend'))) storyJudge(st, c.slice(0, 6)); else st.judgeH = hn + .25;
  }

  // whoever is in an open scene (or in one being played) goes there (the earliest one first)
  const open = storyOpen(), pos = [...open, ...st.escenas.filter(e => e.estado === 'jugando' || (e.estado === 'jugada' && e.fin !== 'llega_ana'))];   // (they stay while the scene waits for what has to happen)
  for (const [k, p] of Object.entries(PEOPLE)) {
    const e = pos.find(e => e.personajes.includes(k));
    if (e) { p.story = storyPos(e); p.away = null; } else if (p.story) { p.story = null; if (p.target?.story) p.target = null; }
  }
  if (amb.cur || game.talk || game.cooking || sleeping) return;
  for (const e of open) {
    if (e.played || !storyHere(e)) continue;
    const present = e.personajes.filter(k => sceneOf(k) === game.scene && (game.scene !== 'out' || dist(PEOPLE[k].x, PEOPLE[k].y, ana.x, ana.y) < 220));
    if (present.length < e.personajes.length) { e.waitT = e.waitT || TT + 30; if (TT < e.waitT) continue; }   // (gives them a moment to arrive)
    if (hablando() || ['ana', ...present].some(ocupada)) continue;   // (not on top of what is being said or done: a moment later)
    storyPlay(e, present); return;
  }
}
async function storyPlay(e, present){
  const st = game.story; e.estado = 'jugando'; userInput();
  const past = storyPast(st), rama = st.ramas[st.ramas.length - 1];
  const note = `ESCENA DE LA HISTORIA DE HOY «${st.titulo}» (inspirada en ${st.inspiracion}): ${e.que_pasa}` + (past ? ` (Lo que pasó antes hoy: ${past}.)` : '') + (rama && e.id.startsWith(rama.pre) ? ` (La historia ya no es la del libro: ${rama.por}; ahora va por «${rama.titulo}».)` : '') + (e.frases?.length ? ` Estas frases tienen que aparecer tal cual, cada una dicha por quien se indica: ${e.frases.map(f => nameOf(f.quien) + ': «' + f.texto + '»').join(' ')}.` : '') + (e.encargo ? ` En esta escena ${NAMES[present[0]] || 'alguien'} le pide algo a Ana: ${(() => { try { return taskText({ ...e.encargo, from: present[0], n: e.encargo.cantidad || 1, para: e.encargo.para || present[0] }); } catch (err) { return e.encargo.tipo; } })()}.` : '') + ' Es un momento especial del día: la escena puede ser algo más larga.';
  let s = null;
  if (aiReady()) { try { s = await sceneAsk(present, note); } catch (err) { console.debug('[avonlea IA] escena de la historia', err.message); } }
  const fr = (e.frases || []).filter(f => f.quien === 'ana' || present.includes(f.quien) || talkersHere().includes(f.quien));
  if ((!s || !s.lines.length) && fr.length) s = { parts: present, lines: fr.map(f => ({ q: f.quien, t: f.texto })), out: { encargo: NO_TASK, accion: { tipo: 'ninguna' } }, scene: game.scene, resumen: '' };
  else if (s && fr.length) { const has = f => s.lines.some(l => l.t.toLowerCase().includes(f.texto.toLowerCase().slice(0, 24))); s.lines = [...fr.filter(f => !has(f)).map(f => ({ q: f.quien, t: f.texto })), ...s.lines].slice(0, 12); }
  if (!s || !s.lines.length) s = { parts: present, lines: [{ q: present[0] || 'ana', t: present.length && LINES[present[0]].length ? pick(LINES[present[0]]) : dicho('historia_sin_frases') }], out: { encargo: NO_TASK, accion: { tipo: 'ninguna' } }, scene: game.scene, resumen: '' };
  if (!s.resumen) s.resumen = `${st.titulo}: ${e.que_pasa}`;
  if (e.encargo && present.length && (!s.out.encargo || s.out.encargo.tipo === 'ninguno')) s.out.encargo = { ...e.encargo };
  if (!aiReady()) notice('📖 ' + e.que_pasa);
  if (amb.cur || game.talk || game.story !== st || e.estado !== 'jugando') { if (e.estado === 'jugando') e.estado = 'abierta'; return; }   // (something else happened meanwhile: later)
  s.story = e; s.turns = 1; e.estado = 'jugada'; e.played = true;
  s.noMenu = !e.encargo && !(e.fin === 'evento' && e.evento.startsWith('regalo:'));   // (a decision only when the scene has one to offer)
  sceneStart(s, present.length > 0);
}
function storyRelease(e){ for (const k of e.personajes) { const p = PEOPLE[k]; if (!p) continue; p.story = null; if (p.target?.story) p.target = null; } }
function storyEnd(e, how){
  const st = game.story, hn = hourNow(); e.estado = how;
  if (how === 'hecha' || how === 'ya') st.ev[e.id] = hn;
  if (e.opened) runEffects(e, 'despues');
  if (how === 'perdida' && e.opened && e.personajes.length) logEv('Ana no llegó a tiempo: ' + e.que_pasa, e.personajes);
  const t = e.nota ? (how === 'hecha' ? '' : 'No pasó: ') + e.nota : how === 'hecha' ? e.que_pasa : how === 'ya' ? 'Antes de lo pensado, ' + evDesc(e.evento).replace(/^./, c => c.toLowerCase()) : how === 'perdida' ? 'No pasó (Ana no estuvo): ' + e.pista : 'Quedó a medias: ' + e.pista;
  st.hechos.push({ h: Math.round(hn * 10) / 10, t: t.slice(0, 200) });
  storyRelease(e); storyCheckEnd(); save();
}
function storyCheckEnd(){
  const st = game.story; if (st.gen || st.fin || st.escenas.some(e => !isFinal(e))) return;
  st.fin = true; const r = st.ramas[st.ramas.length - 1];
  logEv(`La historia del día: «${st.titulo}»${r ? ' (que terminó siendo «' + r.titulo + '»)' : ''}. ${r ? r.resumen || 'El día tomó otro camino: ' + r.por + '.' : st.resumen}`, Object.keys(CH));
  (game.stories = game.stories || []).push(st.titulo); notice('📖 Fin de la historia de hoy: «' + (r ? r.titulo : st.titulo) + '»');
}
function storyWhy(e, why){
  if (why.startsWith('contra:')) return `en vez de lo que iba a pasar («${e.pista}»), pasó esto: ${evDesc(why.slice(7)).replace(/^./, c => c.toLowerCase())}`;
  if (why === 'tarde') return `Ana no estuvo en ${placeName(e.lugar)} a tiempo («${e.pista}»), y eso ya no pasó`;
  if (why === 'sin_evento') return `no pasó lo que tenía que pasar: ${evDesc(e.evento).replace(/^./, c => c.toLowerCase())}`;
  if (why.startsWith('juez:')) return `según lo que pasó, «${e.pista}» ya no puede ser: ${why.slice(5)}`;
  if (why === 'sin_encargo') return `Ana no tomó, o no cumplió, el encargo de «${e.pista}»`;
  return `nunca se dio lo que hacía falta para «${e.pista}»`;
}
// the story leaves its path: from here on, a new branch
function storyBranch(e, why){
  const st = game.story;
  if (st.ramas.length >= 3) return storyEnd(e, why === 'sin_evento' || why === 'sin_encargo' ? why : 'perdida');   // (enough turns for one day: a gap)
  const txt = storyWhy(e, why);
  e.estado = 'rota'; e.porque = txt; storyRelease(e); st.gen = true;
  st.hechos.push({ h: Math.round(hourNow() * 10) / 10, t: 'El día tomó otro camino: ' + txt });
  logEv('El día tomó otro camino: ' + txt + '.');
  notice('📖 La historia toma otro camino…'); save();
  storyBranchMake(st, e, why, txt).catch(err => { console.debug('[avonlea] rama', err); if (game.story === st) { st.gen = false; save(); } });
}
function branchMsg(st, e, txt, pend, h0){
  const today_ = todayLog().slice(-16);
  return worldText() + `\n\nLA HISTORIA DE HOY: «${st.titulo}» (inspirada en ${st.inspiracion}). ${st.resumen}`
    + `\n\nLO QUE YA PASÓ DE LA HISTORIA:\n${(st.hechos || []).map(h => `- ${fmtHour(h.h)}: ${h.t}`).join('\n') || '(nada aún)'}`
    + (today_.length ? `\n\nLO QUE PASÓ HOY (el diario, con la hora):\n${today_.map(j => `- ${j.h != null ? fmtHour(j.h) : '?'} ${j.t}`).join('\n')}` : '')
    + `\n\nDÓNDE SE DESVIÓ (a las ${fmtHour(hourNow())}): ${txt}.`
    + `\n\nLO QUE IBA A PASAR DESPUÉS EN LA RAMA PRINCIPAL (ya no vale tal cual; puedes retomar lo que aún tenga sentido): ${pend.map(x => `${x.hora}:00, en ${placeName(x.lugar)}${x.personajes.length ? ', con ' + x.personajes.map(k => NAMES[k]).join(' y ') : ''}: ${x.que_pasa}`).join(' | ') || '(nada)'}`
    + `\n\nDÓNDE ESTÁ CADA UNO: ${Object.keys(CH).map(k => NAMES[k] + ': ' + whereText(k)).join('; ')}. Animales: ${Object.entries(ANIM).map(([k, a]) => `${k} (${ANIMALS[k].desc}): ${ANIMALS[k].kind !== 'cow' ? 'en su lugar' : a.state === 'bought' ? 'vendida a ' + (NAMES[a.owner] || a.owner) : a.state === 'led' ? 'Ana la lleva de la cuerda' : a.area && AREAS[a.area] ? 'en ' + AREAS[a.area].name : a.state || 'en su lugar'}`).join('; ')}.`
    + `\nLUGARES (claves): ${STORY_PLACES().map(l => l + ' = ' + placeName(l)).join('; ')}.`
    + `\nESCENAS YA HECHAS (sus "id" sirven en "requiere"): ${st.escenas.filter(x => x.estado === 'hecha' || x.estado === 'ya').map(x => x.id).join(', ') || '(ninguna)'}.`
    + `\n\nRAMA NUEVA: escribe cómo sigue la historia desde las ${h0}:00.`;
}
const fmtHour = h => `${Math.floor(h % 24)}:${String(Math.floor((h % 1) * 60)).padStart(2, '0')}`;
async function storyBranchMake(st, e, why, txt){
  const n = st.ramas.length + 1, pre = 'r' + n + '_', h0 = Math.max(Math.ceil(hourNow()), 7);
  const pend = st.escenas.filter(x => !isFinal(x)), playing = pend.filter(x => x.estado === 'jugando');
  const known = st.escenas.filter(x => x.estado === 'hecha' || x.estado === 'ya').map(x => x.id);
  let beats = [], keep = [], titulo = '', resumen = '';
  if (aiReady()) {
    try { const o = (await aiCall([{ role: 'user', content: branchMsg(st, e, txt, pend, h0) }], branchSchema())).out; beats = validBeats(o.escenas, h0, pre, known); titulo = String(o.titulo_rama || '').slice(0, 80); resumen = String(o.resumen || '').slice(0, 300); }
    catch (err) { console.debug('[avonlea IA] rama', err.message); }
  }
  if (!beats.length) {   // without the AI: a branch written by hand for this turn, if the story has one
    const src = STORIES.find(x => x.titulo === st.titulo), r = src?.ramas?.find(r => r.desde === e.id && (!r.por || r.por.some(p => why.startsWith(p))));
    if (r) { beats = validBeats(r.escenas, h0, pre, known); titulo = r.titulo; resumen = r.resumen || ''; }
  }
  if (!beats.length) {   // ...or the main branch, without what depended on the broken scene
    const gone = new Set([e.id, e.evento].filter(Boolean));
    for (const x of pend) if (x.requiere.some(r => gone.has(r))) { gone.add(x.id); if (x.evento) gone.add(x.evento); } else keep.push(x);
    titulo = 'Otro camino'; resumen = txt;
    if (!keep.some(x => x.lugar === 'ga') && h0 <= 21) beats = validBeats([{ id: 'noche', hora: 21, lugar: 'ga', personajes: [], que_pasa: 'En su cuarto, Ana piensa en cómo el día tomó un camino distinto del que parecía: ' + txt + '.', pista: 'Al final del día, sube a tu cuarto', fin: 'llega_ana' }], h0, pre, known);
  }
  if (game.story !== st) return;   // (a new day came meanwhile)
  for (const x of pend) if (!keep.includes(x) && !playing.includes(x)) { x.estado = 'descartada'; storyRelease(x); }
  st.escenas.push(...beats); st.ramas.push({ pre, desde: e.id, por: txt, titulo: titulo || 'Otro camino', resumen, hora: hourNow() }); st.gen = false;
  const next = [...keep, ...beats].sort((a, b) => a.hora - b.hora)[0];
  notice('📖 La historia sigue por otro camino: «' + (titulo || 'Otro camino') + '»' + (next ? ' · ' + next.pista : ''));
  storyCheckEnd(); save();
}