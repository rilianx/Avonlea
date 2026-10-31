/* ---------- focus and wandering attention: nobody in Avonlea goes about an errand like a messenger. On the way to a task
   one may stop to look at what one likes (the lake, the flowers, an animal), or to talk with whoever one meets; how
   often and how long depends on the character (enfoque: 0 all over the place … 1 straight there; social: how much
   they like a chat; atrae: what catches their eye) and on how pressing the errand is (a deadline: hardly at all;
   something asked of them: less). Then they go on with what they were doing. ---------- */
const FOCO = {   // [enfoque, social, what catches the eye]
  ana: [.3, .8, ['lago', 'flores', 'arboles', 'mar', 'animales']], diana: [.6, .8, ['flores', 'lago']], matthew: [.7, .1, ['animales', 'campo']],
  marilla: [.9, .4, []], barry: [.9, .3, []], lynde: [.4, 1, ['gente']], harrison: [.7, .3, ['animales']], shearer: [.8, .4, ['animales']],
  lawson: [.9, .5, []], gilbert: [.8, .5, ['ana']], sraallan: [.6, .7, ['flores', 'arboles']], peg: [.5, .2, ['campo']],
};
const focoOf = k => { const f = FOCO[k] || (FOLKBY[k]?.kid ? [.5, .7, ['animales', 'lago']] : [.7, .5, []]); return { enfoque: f[0], social: f[1], atrae: f[2] }; };
let WM_DISTRACT = true;
// how fast each one walks (an old farmer is not a girl of eleven), and how the errand changes it: with a deadline they
// hurry (Ana runs to school), something asked of them goes a little brisker, and the dreamy ones dawdle on their own errands
const PACE = { ana: 46, diana: 44, gilbert: 46, matthew: 36, marilla: 38, barry: 38, lynde: 40, harrison: 36, shearer: 40, lawson: 38, sraallan: 40, peg: 38 };
function wmPace(ag){
  const k = ag.who, base = PACE[k] || (FOLKBY[k]?.kid ? 46 : CH[k]?.speed?.walk || 38), u = urgency(ag);
  const m = u > .9 ? 1.5 : u > .4 ? 1.1 : focoOf(k).enfoque < .5 ? .8 : 1;
  return base * m * (Object.values(ANIM).some(a => a.state === 'led' && (a.ledBy || 'ana') === k) ? .85 : 1);
}
const paceText = ag => { const u = urgency(ag); return u > .9 ? 'con prisa' : u < .4 && focoOf(ag.who).enfoque < .5 ? 'sin apuro' : ''; };
const qOf = k => k === 'ana' ? 'ana' : PEOPLE[k] ? k : 'f:' + k;
const isKid = k => k === 'ana' || k === 'diana' || !!FOLKBY[k]?.kid;
const CHAT_HOLD = {};   // (those of the routines kept a moment by a chat: who → until)
let CHATS = [];
const urgency = ag => { const p = Math.max(0, ...activeGoals(ag).map(g => g.prio || 1)); return p >= 3 ? .95 : p === 2 ? .45 : 0; };
function sayB(q, text){ bubbles = bubbles.filter(x => x.q !== q); bubbles.push({ q, text, t: 0, dur: lineDur(text) }); }
const FAUNA_NAME = { cat: 'un gato', cow: 'una vaca', duck: 'los patos', gull: 'las gaviotas', hen: 'las gallinas', horse: 'un caballo', pig: 'un cerdo', sheep: 'una oveja' };
// what there is to look at around someone (out of doors)
function stimuli(b){
  const L = [], add = (id, kind, x, y, name) => L.push({ id, kind, x, y, name });
  if (inLake(b.x, b.y, 110)) add('lago', 'lago', LAKE.x, LAKE.y, 'el Lago de las Aguas Brillantes');
  if (S < 2) LUPINS.forEach((l, i) => { if (((b.x - l.x) / (l.rx + 60)) ** 2 + ((b.y - l.y) / (l.ry + 60)) ** 2 < 1) add('lup' + i, 'flores', l.x, l.y, 'las flores'); });
  if (S === 0) { const t = treesNear(b.x, b.y).find(t => t.kind === 'blossom' && dist(t.x, t.y, b.x, b.y) < 70); if (t) add('tr' + Math.round(t.x / 200) + ',' + Math.round(t.y / 200), 'arboles', t.x, t.y, 'los árboles en flor'); }
  if (dist(b.x, b.y, PLACES.playa[1], PLACES.playa[2]) < 260 || dist(b.x, b.y, FARO.x, FARO.y) < 360) add('mar', 'mar', b.x, b.y + 200, 'el mar');
  const a = FAUNA.find(a => !a.fly && dist(a.x, a.y, b.x, b.y) < 80); if (a) add('fa' + FAUNA.indexOf(a), 'animales', a.x, a.y, FAUNA_NAME[a.kind] || 'un animal');
  for (const [k, c] of Object.entries(ANIM)) if (c.kind === 'cow' && c.where === 'out' && dist(c.x, c.y, b.x, b.y) < 80) add('cow' + k, 'animales', c.x, c.y, ANIMALS[k].name);
  const f = FIELDS.findIndex(f => b.x > f.x - 20 && b.x < f.x + f.w + 20 && b.y > f.y - 20 && b.y < f.y + f.h + 20); if (f >= 0) add('campo' + f, 'campo', FIELDS[f].x + FIELDS[f].w / 2, FIELDS[f].y + FIELDS[f].h / 2, 'el campo');
  return L;
}
const LOOK_TEXT = { lago: s => 'se quedó mirando ' + s.name, flores: () => 'se detuvo a mirar las flores', arboles: () => 'se quedó mirando los árboles en flor', mar: () => 'se quedó mirando el mar', animales: s => 'se detuvo a mirar ' + s.name, campo: () => 'se detuvo a ver cómo va el campo' };
// what one says on stopping to look (src/datos/dichos/20-encuentros.txt, «mira:<who>:<what>»; if they have nothing for it, «otros», save Ana)
// on the way to a task: something to look at, or someone to talk with?
function distractCheck(ag){
  if (!WM_DISTRACT || ag.hold || ag.followOf || TT < (ag.calmUntil || 0) || TT < (ag.nextCheck || 0)) return false;
  ag.nextCheck = TT + .5;
  const who = ag.who, b = wmBody(who); if (!b || !b.moving) return false;
  const F = focoOf(who), urg = urgency(ag), seen = ag.seenStim || (ag.seenStim = {});
  if (chatTry(ag, F, urg)) return true;
  if (wmScene(who) !== 'out') return false;
  const goal = ag.task && taskPoint(ag, ag.task).q;
  for (const s of stimuli(b)) {
    if (goal && dist(s.x, s.y, goal[0], goal[1]) < 160) continue;   // (what the errand is about is no distraction)
    if (seen[s.id] > TT || seen[s.kind] > TT) continue; seen[s.id] = TT + 150; seen[s.kind] = TT + 60;   // (and not the same kind of thing over and over)   // (each thing once on the way: passing it again later, maybe)
    if (Math.random() < (1 - F.enfoque) * (F.atrae.includes(s.kind) ? 1 : .12) * (1 - urg)) { startLook(ag, s, F, urg); return true; }
  }
  return false;
}
function startLook(ag, s, F, urg){
  const b = wmBody(ag.who), dur = (4 + 14 * (1 - F.enfoque) * (.5 + Math.random())) * (1 - urg * .7);
  wmRelease(ag.who); b.moving = false; b.dir = s.x < b.x ? 3 : 1;
  ag.distract = { kind: s.kind, text: LOOK_TEXT[s.kind](s), until: TT + dur };
  agentLog(ag, '💭 ' + ag.distract.text + ' (' + Math.round(dur) + ' s)');
  const t = dicho('mira:' + ag.who + ':' + s.kind) || (ag.who === 'ana' ? '' : dicho('mira:otros:' + s.kind));
  if (t && Math.random() < .8) sayB(qOf(ag.who), t);
}
// while distracted the task waits; then on with it
function distractTick(ag){
  const d = ag.distract; if (!d) return false;
  if (d.chat ? CHATS.includes(d.chat) : TT < d.until) { const b = wmBody(ag.who); b.moving = false; if (ag.who === 'ana' && ana.goto?.wm) ana.goto = null; return true; }
  ag.distract = null; ag.calmUntil = TT + 15 + 30 * focoOf(ag.who).enfoque;
  agentLog(ag, '↩ sigue' + (ag.task ? ' con: ' + stepText(ag.task.a) : ' con lo suyo'));
  return false;
}
const inChat = k => CHATS.some(c => c.parts.includes(k)) || FOLKBY[k]?.talkT > TT || !!amb.cur?.parts?.includes(k) || !!enc.cur?.parts?.includes(k) || (k === 'ana' && (!!game.talk || !!enc.cur || !!amb.cur)) || !!AGENTS[k]?.distract;
function chatTry(ag, F, urg){
  const me = ag.who, b = wmBody(me), sc = wmScene(me), pc = ag.pairCool || (ag.pairCool = {});
  if (writtenTalkOn() && (me === 'ana' || AGENTS.ana?.followOf === me)) return false;   // (who travel together talk by the written lines)
  if (ocupada(me) || TT < (CHAT_YA[me] || 0) || urg >= .9) return false;   // (in a hurry: no stopping to talk)
  { const k = ag.task?.a?.k, o = k && wmBody(k); if (o && wmScene(k) === sc && dist(b.x, b.y, o.x, o.y) < 220) return false; }   // (going up to the one the errand is with: not stopping to talk to someone else on the way)   // (in the middle of doing something: the talk can wait; and one who just talked goes on a while)
  for (const o of ['ana', ...Object.keys(PEOPLE), ...FOLK.map(f => f.id)]) {
    if (o === me || (o === 'ana' && writtenTalkOn()) || wmScene(o) !== sc || (ag.task && JSON.stringify(ag.task.a).includes(`"${o}"`))) continue;   // (not whoever the errand is with: that talk is the errand)
    if ([me, o].includes('ana') && [me, o].includes('diana') && !dianaAmiga()) continue;   // (Ana and Diana: not before they meet, nor while it is forbidden)
    const ob = wmBody(o); if (!ob || ob.lie || dist(b.x, b.y, ob.x, ob.y) > 64 || pc[o] > TT || inChat(o) || ocupada(o) || TT < (CHAT_YA[o] || 0)) continue;
    pc[o] = TT + 180;
    const anaFree = o === 'ana' && !(wmDriven('ana') && !AGENTS.ana.paused), G = focoOf(o), r = relGetW(me, o), oag = AGENTS[o];
    let p = (F.social * .6 + G.social * .4) * (F.atrae.includes(o) || F.atrae.includes('gente') ? 1.5 : 1) * (1 - urg) * (r >= 4 ? 1.3 : r <= 0 ? .3 : 1);
    if (oag && activeGoals(oag).length) { if (urgency(oag) >= .9) continue; p *= 1 - urgency(oag); }
    if (Math.random() >= p) continue;
    startChat(me, o, anaFree); return true;
  }
  return false;
}
const CHAT_YA = {};   // (who talked a moment ago → until when they go on without stopping to talk again)
function startChat(a, b, anaFree){
  CHAT_YA[a] = CHAT_YA[b] = TT + M(20);
  const third = Object.keys(DLG_BANK).length && [...Object.keys(PEOPLE), ...FOLK.map(f => f.id)].find(o => o !== a && o !== b && wmScene(o) === wmScene(a) && !inChat(o) && DLG_BANK[dlgKey([a, b, o])] && dist(wmBody(o).x, wmBody(o).y, wmBody(a).x, wmBody(a).y) < 120);
  const bank = (third && dlgNext([a, b, third])) || dlgNext([a, b]);
  const lines = bank || chatLines(a, b, anaFree);
  if (!lines.length || (wmScene(a) === game.scene && lines.some(l => l.q !== 'ana' && oidoHoy(l.q).has(l.t)))) return;   // (nothing new to say, or what Ana already heard them say today, in front of her: they only nod)
  const c = { parts: [a, b], lines, i: -1, wait: .2, anaFree }; CHATS.push(c);
  for (const [p, o] of [[a, b], [b, a]]) {
    const body = wmBody(p);
    if (p === 'ana' && anaFree) continue;   // (Ana, when the player has her: not held)
    body.moving = false; body.dir = wmBody(o).x < body.x ? 3 : 1;
    const ag = AGENTS[p];
    if (ag && activeGoals(ag).length) { wmRelease(p); ag.distract = { kind: 'charla', chat: c, text: 'conversa con ' + wmName(o) }; agentLog(ag, '💬 se detuvo a conversar con ' + wmName(o)); }
    else if (FOLKBY[p]) { FOLKBY[p].talkT = TT + 1e6; FOLKBY[p].route = []; }
    else if (PEOPLE[p]) CHAT_HOLD[p] = TT + 1e6;
  }
}
function chatEnd(c){
  CHATS = CHATS.filter(x => x !== c);
  if (c.lines.presenta && c.i < c.lines.hasta) desconocer(c.lines.presenta);   // (cut before Ana said who she is: they have not met)
  for (const p of c.parts) { if (FOLKBY[p]?.talkT > TT + 1000) FOLKBY[p].talkT = TT + 1; delete CHAT_HOLD[p]; }
  if (c.i >= 1) logEv(`${wmName(c.parts[0])} y ${wmName(c.parts[1])} conversaron un rato${wmScene(c.parts[0]) === 'out' ? ' en el camino' : ''}.`, []);
}
function chatTick(dt){
  for (const c of CHATS.slice()) {
    const [a, b] = c.parts.map(wmBody);
    if (!a || !b || wmScene(c.parts[0]) !== wmScene(c.parts[1]) || dist(a.x, a.y, b.x, b.y) > (c.anaFree ? 200 : 140)) { chatEnd(c); continue; }
    if ((c.wait -= dt) > 0) continue;
    if (++c.i >= c.lines.length) { chatEnd(c); continue; }
    const l = c.lines[c.i]; sayB(qOf(l.q), l.t); c.wait = lineDur(l.t) + .35;
  }
}
// what they say (no generative AI: a greeting, a few lines as the characters are, and a goodbye that mentions the errand;
// the lines, in src/datos/dichos/20-encuentros.txt and src/datos/charlas.txt)
const ANA_DIANA = charlaPares('ana_diana'), ANA_SUENA = charlaPares('suena');   // (src/datos/charlas.txt: two lines, Ana's and the other's; «[conditions] » before the first, if any)
const saludoHora = () => { const h = hourNow() % 24; return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches'; };
function chatLines(a, b, anaFree){
  const L = [], h = hourNow(), hi = saludoHora(), say = (q, t) => t && L.push({ q, t: t.replace(/Buenos días|Buenas tardes|Buenas noches/, hi) });   // (nothing left to say today: nothing)   // (the greeting, as the hour is)
  const sin = A => { const u = [...A].sort(() => Math.random() - .5); return () => u.length > 1 ? u.pop() : u[0]; }, suena = sin(paresSi(ANA_SUENA)), anaDiana = paresSi(ANA_DIANA), pares = sin(paresSi(PAIR_LINES[isKid(a) && isKid(b) ? 'kids' : 'big']));   // (in one talk, no line twice)
  const tu = isKid(a) && isKid(b), nm = k => /^[a-zá-ú]/.test(wmName(k)) ? '' : wmName(k), A = nm(a), B = nm(b), to = n => n ? ', ' + n : '';   // ("un vecino" is no name to call someone by)
  if (anaFree) {   // (Ana, as the player moves her, passing by: a word to her)
    const d = FOLKBY[a]?.def;
    if (!conoceA(a) && !sinNombre(a)) { for (const l of presentar(a)) say(l.q === 'ana' ? 'ana' : a, l.t); L.presenta = a; L.hasta = L.findIndex(l => l.q === 'ana'); return L; }   // (the first time: who they are)
    say(a, reaccionAlVerla(a) || (a === 'gilbert' && d ? pick(lineasDe('gilbert', d.lines)) : null) || pick(sinRepetir(a, lineasAjenas(a, dichosTodos('encuentro:saluda_a_ana', { hola: hi })))));
    const r = lineasSi(FOLKBY[a]?.def.ana || [dicho('encuentro:ana_seca')]); if (relGetW('ana', a) <= 0 && r.length && L.length) say('ana', pick(r));
    return L;
  }
  const ana_ = a === 'ana' ? a : b === 'ana' ? b : null, other = ana_ && (a === 'ana' ? b : a);
  if (ana_ && !conoceA(other) && !sinNombre(other)) { for (const l of presentar(other)) say(l.q === 'ana' ? 'ana' : other, l.t); L.presenta = other; L.hasta = L.findIndex(l => l.q === 'ana'); return L; }   // (the first time: who they are)
  if (ana_ && relGetW('ana', other) <= 0) { say(other, reaccionAlVerla(other) || (FOLKBY[other]?.def.lines ? pick(lineasDe(other, FOLKBY[other].def.lines)) : null) || pick(sinRepetir(other, lineasAjenas(other, dichosTodos('encuentro:saluda_seco', { hola: hi }))))); const r = lineasSi(FOLKBY[other]?.def.ana || [dicho('encuentro:ana_seca')]); if (r.length && L.length) say('ana', pick(r)); return L; }
  if (a === 'matthew' || b === 'matthew') {   // (Matthew: a greeting, and off he goes)
    const o = a === 'matthew' ? b : a;
    say(o, dicho('encuentro:saluda_a_matthew', { hola: hi })); say('matthew', dicho('encuentro:matthew_saluda'));
    if (focoOf(o).social > .7) say(o, dicho('encuentro:pregunta_a_matthew'));
    say('matthew', dicho('encuentro:matthew_se_va')); return L;
  }
  say(a, dicho('encuentro:saluda', { hola: hi, nombre: to(B) })); say(b, dicho(tu ? 'encuentro:responde_nino' : 'encuentro:responde_grande', { hola: hi, nombre: to(A) }));
  const rounds = 1 + Math.round((1 - Math.max(focoOf(a).enfoque, focoOf(b).enfoque)) * 3);
  for (let k = 0; k < rounds; k++) {
    const ch = !ana_ && !k && (chisme(a, b) || chisme(b, a));   // (two neighbours: a piece of news, told aloud: src/datos/noticias.txt)
    if (ch) for (const [q, t] of ch) say(q, t);
    else if (ana_ && other === 'diana' && dianaAmiga() && anaDiana.length) { const [x, y] = anaDiana[(k + Math.floor(TT)) % anaDiana.length]; say('ana', x); say('diana', y); }
    else if (ana_) { const [x, y] = suena(); say('ana', isKid(other) ? x.replace('¿No le parece', '¿No te parece').replace('¿Sabía', '¿Sabías') : x); say(other, isKid(other) ? dicho('encuentro:nino_responde_a_ana') : y); }
    else { const [x, y] = pares(); say(a, x); say(b, y); }
  }
  const t = AGENTS[a]?.task || AGENTS[b]?.task, who = AGENTS[a]?.task ? a : b;
  const va = t && dicho('encuentro:me_voy_a', { tarea: stepText(t.a).replace(/^(\S+r)se\b/, '$1me') });
  say(who, va && !nombra(va, who) ? va : dicho('encuentro:despedida'));   // (not «ir a la casa de la Sra. Lynde», said by her)
  return L;
}

// --- moving a body to a place key: Ana by her own walking (A*, by the roads), the others by theirs
// beside someone in a room, where one can stand (not in the table they sit at)
function libreJunto(room, x, y){
  const B = ROOMS[room]?.blocked; if (!B || !B(x, y)) return [x, y];
  for (const r of [30, 46, 62]) for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + Math.PI / 2, q = [x + Math.cos(a) * r, y + Math.sin(a) * r]; if (!B(q[0], q[1])) return q; }
  return [x, y];
}
function wmTarget(who, key){
  // where to walk now (and in which scene) to reach 'key'
  if (key === 'pieza') return { room: 'ga', door: DOOR.gg };
  if (key === 'cocina' || key.startsWith('h:')) { const room = key === 'cocina' ? 'gg' : key.slice(2); return { room, door: DOOR[room] }; }
  if (WP_CAMINO[key]) { const [c, s] = WP_CAMINO[key], b = wmBody(who), me = who === 'ana' ? ana.roadS : b?.roadS, [a, z] = wpTramo(key); return { road: wmScene(who) === 'camino' && caminoDe(who) === c && me > a && me < z ? me : s, camino: c }; }   // (a place on a long road —White Sands—: a stretch of it; already in it, there)
  if (key.startsWith('camino:')) return { road: .5, camino: key.slice(7) };
  const q = keyPoint(key); if (!q) return null;
  const tb = key.startsWith('p:') ? wmBody(key.slice(2)) : null, tscene = key.startsWith('p:') ? wmScene(key.slice(2)) : 'out';
  if (tscene === 'camino') return { road: wmBody(key.slice(2)).roadS, camino: tb.camino || 'br', at: [tb.x, tb.y] };
  if (tscene && tscene !== 'out') return tscene === 'gg' ? { room: 'gg', door: DOOR.gg, at: tb ? libreJunto('gg', tb.x, tb.y) : null } : HOUSES[tscene] ? { room: tscene, door: DOOR[tscene], at: tb ? libreJunto(tscene, tb.x, tb.y + (tb.bed ? 34 : 0)) : null } : null;   // (inside: up to them; to someone in bed, to the bedside)
  return { out: q };
}
function wmMove(who, key, dt){
  const T = wmTarget(who, key); if (!T) return 'fail';
  const b = wmBody(who), sc = wmScene(who), near = key.startsWith('p:') ? 40 : 46;
  if (T.room === 'br' && who === 'matthew') b.buggy = true;   // (to the station: in the buggy)
  if (sc === 'camino') return enCamino(b.camino, () => {   // (on the road: on towards the end that leads there; or, to someone on the road, up to them)
    const c = caminoDe(who), mio = T.road != null && (T.camino || 'br') === c;
    if (who === 'ana') { if (!mio) return 'fail'; const [x, y] = T.at || roadAt(T.road); if (dist(b.x, b.y, x, y + 14) < 40) { wmStop('ana'); return 'ok'; } wmWalk('ana', x, y + 14, 'camino', dt); return 'run'; }   // (Ana, on foot: up to whom she goes, or to that point of the road)
    if (mio && T.at && Math.abs(roadXOf(T.road) - b.x) < 300 && dist(b.x, b.y, T.at[0], T.at[1]) > 60) { b.roadDir = 0; b.suelto = true; wmWalk(who, T.at[0], T.at[1] + 10, 'camino', dt); return 'run'; }   // (someone off the road, down by the sea: on foot, up to her)
    if (b.suelto) { const [x, y] = roadAt(b.roadS); if (dist(b.x, b.y, x, y) > 24) { wmWalk(who, x, y, 'camino', dt); return 'run'; } b.suelto = false; }   // (and back to the road)
    if (mio) { if (Math.abs(T.road - b.roadS) < .004 || (T.at && dist(b.x, b.y, T.at[0], T.at[1]) <= 60)) { b.roadDir = 0; return 'ok'; } b.roadDir = T.road > b.roadS ? 1 : -1; return 'run'; }
    b.roadDir = T.room === 'br' && c === 'br' ? -1 : 1; return 'run';   // (anywhere else: back to Avonlea first)
  });
  if (T.road != null) { const P = caminoPuerta(T.camino || 'br'); if (sc !== 'out') { wmExit(who); return 'run'; } if (dist(b.x, b.y, P[0], P[1] + 20) < 40) { roadStart(who, 1, -1, T.camino || 'br'); return 'run'; } wmWalk(who, P[0], P[1] + 20, 'out', dt); return 'run'; }
  if (T.out) {
    if (sc !== 'out') { wmExit(who); return 'run'; }
    const pen = AREAS[key], d = dist(b.x, b.y, T.out[0], T.out[1]);
    if (pen ? inArea(pen, b.x, b.y, -6) : d < near) { wmStop(who); return 'ok'; }   // (into a pen means inside its fence)
    const person = key.startsWith('p:'), lim = person ? 64 : 130;   // (to a person: up to them, to speak to them face to face)
    if (person && d > 110 && d < CALL_R && !(b.wmCallT > TT - 25)) { const tb = wmBody(key.slice(2)); if (tb && tb.moving && !tb.called) { b.wmCallT = TT; callPerson(who, key.slice(2), { come: false }); } }   // (they are walking off: call them to wait)
    if (wmWalk(who, T.out[0], T.out[1], 'out', dt) && !pen && d < lim) { wmStop(who); return 'ok'; }   // (as near as one can get)
    if (b.wmT !== TT) { b.wmStill = b.wmPx != null && dist(b.x, b.y, b.wmPx, b.wmPy) < 4 * dt ? (b.wmStill || 0) + dt : 0; b.wmPx = b.x; b.wmPy = b.y; b.wmT = TT; }   // (once a frame: it may be asked twice; still = slower than 4 px/s, a walker does ~0.7 px a frame)
    if (b.wmStill > (person ? 4 : 1.5) && !pen && d < 130) { b.wmStill = 0; wmStop(who); return 'ok'; }   // (stuck just short of it: close enough)
    return 'run';
  }
  // a room (Ana's: up the stairs, to the mirror)
  if (T.room === 'ga') {
    if (sc === 'ga') { const p = [GA.table.x, GA.table.y + 12]; if (dist(b.x, b.y, p[0], p[1]) < 30) { wmStop(who); return 'ok'; } wmWalk(who, p[0], p[1], 'ga', dt); return 'run'; }
    if (sc === 'gg' && who === 'ana') { if (dist(b.x, b.y, STAIRS.x, STAIRS.y) < 40) { wmStop(who); goIn('ga', [KDOOR.x, KIT.h - 28]); return 'run'; } wmWalk(who, STAIRS.x, STAIRS.y, 'gg', dt); return 'run'; }
    if (sc === 'gg') { b.where = 'ga'; b.x = KDOOR.x; b.y = KIT.h - 28; return 'run'; }
    T.room = 'gg';
  }
  if (T.room === 'gg' && sc === 'ga') { if (who === 'ana') goIn('gg', [STAIRS.x - 16, STAIRS.y + 36]); else { b.where = 'gg'; b.x = STAIRS.x - 16; b.y = STAIRS.y + 36; } return 'run'; }   // (down the stairs)
  // (in the room: to whom one goes; Ana, in the kitchen, to the stove; the others, in from the door, to where they keep to in that room)
  if (sc === T.room) { const p = T.at || (who === 'ana' && T.room === 'gg' ? [STOVE.x, STOVE.y + 40] : who !== 'ana' ? ROOMS[T.room]?.dentro || null : null); if (!p || dist(b.x, b.y, p[0], p[1]) < 40) { wmStop(who); return 'ok'; } wmWalk(who, p[0], p[1], T.room, dt); return 'run'; }
  if (sc !== 'out') { wmExit(who); return 'run'; }
  if (dist(b.x, b.y, T.door[0], T.door[1] + 20) < 34) { wmEnter(who, T.room); return 'run'; }
  wmWalk(who, T.door[0], T.door[1] + 20, 'out', dt); return 'run';
}
function wmWalk(who, x, y, scene, dt){
  const b = wmBody(who);
  if (who === 'ana') { if (TT - (ana.wmArr || -9) < .4) return true; if (!ana.goto || !ana.goto.wm || dist(ana.goto.x, ana.goto.y, x, y) > 30) ana.goto = { x, y, scene, wm: true }; return false; }
  const sp = b.buggy ? CARRO * lgPaso(who) : (AGENTS[who] ? wmPace(AGENTS[who]) : (CH[who]?.speed?.walk || 40)) * (AGENTS.ana?.ride && AGENTS.ana.followOf === who ? 2.4 : 1), visible = viewScene() === scene && (scene !== 'out' || seen(b.x, b.y, 300));
  if (b.called && TT < b.called.until) { b.moving = false; return false; }
  if (b.buggy && scene === 'out') {   // (a buggy, seen or not, goes by the roads: past Mrs. Lynde's window)
    if (!b.bnav || dist(b.bnav.x, b.bnav.y, x, y) > 30) { const r = netRoute(b.x, b.y, x, y); b.bnav = { x, y, pts: r ? [...r.pts, [x, y]] : [[x, y]], i: 0 }; }
    const q = b.bnav.pts[b.bnav.i], dq = dist(b.x, b.y, q[0], q[1]), vq = visible && cedePaso(b, q[0] - b.x, q[1] - b.y, dt) ? 0 : Math.min(dq, sp * dt);
    b.x += (q[0] - b.x) / (dq || 1) * vq; b.y += (q[1] - b.y) / (dq || 1) * vq; b.moving = true; if (Math.abs(q[0] - b.x) > 1) b.dir = q[0] > b.x ? 1 : 3; b.walk = (b.walk + dt * 1.8) % 1;
    if (dq < 2) { if (b.bnav.i < b.bnav.pts.length - 1) b.bnav.i++; else { b.bnav = null; b.moving = false; return true; } }
    return false;
  }
  if (visible) return walkPath(b, x, y, sp, dt, scene);
  if (scene === 'out') {   // (unseen, outdoors: the same way as if seen (by the roads, round the houses, the lake and the brooks), only without the steps)
    const o = SCN; SCN = 'out'; let n; try { n = navStep(b, x, y); } finally { SCN = o; }
    if (n.arrived) { b.moving = false; return true; }
    const d = dist(b.x, b.y, n.wx, n.wy), v = Math.min(d, sp * dt); b.x += (n.wx - b.x) / (d || 1) * v; b.y += (n.wy - b.y) / (d || 1) * v; b.moving = true; if (Math.abs(n.wx - b.x) > 1) b.dir = n.wx > b.x ? 1 : 3; b.walk = (b.walk + dt * 1.8) % 1;
    return false;
  }
  const d = dist(b.x, b.y, x, y), v = Math.min(d, sp * dt); b.x += (x - b.x) / (d || 1) * v; b.y += (y - b.y) / (d || 1) * v; b.moving = d > 2; if (Math.abs(x - b.x) > 1) b.dir = x > b.x ? 1 : 3; b.walk = (b.walk + dt * 1.8) % 1;
  return d < 2;
}
function wmStop(who){ const b = wmBody(who); if (who === 'ana') { if (ana.goto?.wm) ana.goto = null; } else b.moving = false; }
function wmExit(who){
  if (who === 'ana') { goOut(); return; }
  const b = wmBody(who), h = b.where;
  if (h === 'br') { roadStart(who, 0, 1); return; }   // (from the station: the road home)
  if (h === 'camino') return;
  b.where = 'out'; b.sit = false; b.nav = null; const d = DOOR[h] || [b.x, b.y]; b.x = d[0]; b.y = d[1] + 16;
}
function wmEnter(who, room){
  if (room === 'br' && wmScene(who) === 'out') { if (who === 'ana') return; roadStart(who, 1, -1); return; }   // (the station is at the end of the road)
  if (who === 'ana') { goIn(room); return; }
  const b = wmBody(who); if (room !== 'br') b.buggy = false; b.where = room; b.nav = null; b.x = KDOOR.x; b.y = KIT.h - 20;
}
function wmRelease(who){ const b = wmBody(who); if (!b) return; if (who === 'ana') { if (ana.goto?.wm) ana.goto = null; } else { b.moving = false; b.nav = null; if (FOLKBY[who]) { FOLKBY[who].key = ''; FOLKBY[who].route = []; } } }
function wmHold(ag, dt){   // someone kept at a place for a test (the buyer waiting at the village)
  const b = wmBody(ag.who); if (b.where !== 'out') { b.where = 'out'; b.x = ag.hold[0]; b.y = ag.hold[1]; }
  if (dist(b.x, b.y, ag.hold[0], ag.hold[1]) > 30) wmWalk(ag.who, ag.hold[0], ag.hold[1], 'out', dt); else b.moving = false;
}
// the bodies of the agents are moved here, not by their routines (the routine loops ask this first)
const wmDriven = k => (!!AGENTS[k] && (activeGoals(AGENTS[k]).length > 0 || !!AGENTS[k].hold)) || lgOcupado(k);   // (or busy with an errand of a story: src/js/67-lenguaje.js)
