/* ---------- the trip's talk: Ana's chatter (the book's, stretch by stretch) and Matthew's few words. Nothing is said
   twice: each stretch goes on, next time, where it was left (game.dlgUsed), and when all of it has been said, Ana's
   other musings; when those too are said, it all starts over. What Ana (and Matthew) say of their own is not here but
   in src/datos/dichos/30-viaje.txt, as tables in order: «=== viaje:M<stretch> ===» (one line after another, each with
   who says it: «- matthew: Bueno, pues…») and «=== viaje:relleno ===» (her loose musings); read with dichosEnOrden (17). ---------- */
let TALKS = [];
function talkPlay(lines, o = {}){
  const L = lines.map(l => Array.isArray(l) ? (l[0] === '?' ? { q: '?', t: 'elige', opc: l[2] } : l[0] === '!' ? { q: '!', t: 'accion', acc: l[2] } : { q: l[0], t: l[1], m: l[2] }) : l).filter(l => l.t && l.t !== '…');
  for (const k of o.hold || []) CHAT_HOLD[k] = TT + 1e6;
  const t = { hold: o.hold, lines: L, i: -1, wait: o.delay ?? .5, gap: o.gap || 0, ch: o.ch, stop: o.stop, end: o.end, siempre: o.siempre, budget: o.budget ? o.budget * MIN_S : 0, el: 0, use: o.use, resumen: o.resumen };
  if (o.ch && TALKS.some(x => x.ch === o.ch)) { if (o.queue) (TALK_Q[o.ch] ||= []).push(t); return t; }
  TALKS.push(t); if (t.resumen) logEv(t.resumen, []); return t;
}
const TALK_Q = {};
const talkQ = k => k === 'bell' ? 'f:srbell' : k === 'jefe' ? 'f:jefe' : qOf(k);
const talkBusy = ch => TALKS.some(x => x.ch === ch);
function talkTick(dt){
  for (const t of TALKS.slice()) {
    t.el += dt;
    if (t.elige && TT > t.elige.hasta) { const e = t.elige; t.elige = null; e.una(e.propia); }
    if ((t.wait -= dt) > 0) continue;
    if (t.stop?.() || ++t.i >= t.lines.length || (t.budget && t.el > t.budget)) { talkEnd(t); continue; }
    const l = t.lines[t.i]; if (l.q === '?') { elegir(t, l.opc); continue; }   // (a choice: the scene waits for it)
    if (l.q === 'narra') { narrar(t, l.t); continue; }
    if (l.q === '!') { dlgHacer([l.acc]); t.wait = .05; continue; }   // (done, and on with the scene)   // (a text that explains: a card, until the player goes on)
    sayB(talkQ(l.q), l.t); t.wait = lineDur(l.t) + .35 + t.gap;   // (gap: a scene that takes its time, like a letter being written)
    if (l.m) cap1Mark(l.m); t.use?.(t.i, l);
  }
}
// a text that explains (who is who, what happened before, where we are): a card over the game, as a page of a book;
// the scene waits until the player goes on (with no one to read it, or Ana on her own, after a while)
function narrar(t, texto){
  if (typeof relatoLinea === 'function' && RELATO.on) relatoLinea('(Narración) ' + texto, { quien: 'narra', dice: texto });
  if (navigator.webdriver || (ana.hidden && !t.siempre)) { t.wait = .2; return; }   // (siempre: a card even before she is to be seen: the beginning at the station, before the train)
  t.wait = 1e9; let el = $('narra');
  if (!el) { el = document.createElement('div'); el.id = 'narra'; document.body.appendChild(el);
    el.style.cssText = 'position:fixed;left:50%;top:14%;transform:translateX(-50%);width:min(520px,calc(100vw - 32px));z-index:40;background:#f6ecd2;color:#3b2a1c;border:1px solid #8a6a48;border-radius:10px;box-shadow:0 6px 24px rgba(40,25,10,.35);padding:16px 20px 12px;font:italic 16px/1.5 Georgia,serif'; }
  el.innerHTML = '<div class="tx"></div><div style="text-align:right;margin-top:10px"><button style="font:13px Georgia,serif;padding:4px 12px;border:1px solid #8a6a48;border-radius:6px;background:#fffaf0;color:#3b2a1c;cursor:pointer">Seguir ▸</button></div>';
  el.querySelector('.tx').textContent = conNombres(texto); el.hidden = false;
  let ya = false; const seguir = () => { if (ya) return; ya = true; t.narra = null; el.hidden = true; if (TALKS.includes(t)) t.wait = .3; };
  el.querySelector('button').onclick = e => { e.stopPropagation(); seguir(); };
  t.narra = { seguir, hasta: auto.on ? performance.now() + (lineDur(texto) * 1.6 + 3) * 1000 : Infinity };   // (real time: the game's is stopped)
}
// while a card is being read, the world waits: the time does not go on (if no one reads it, after a while it goes on)
// while the player decides (a choice in a scene, a menu, a name to write), the world waits too; with Ana on her own
// (the button 🤖), it goes on, and she decides after a while
function decidiendo(){ return !ANA_AUTO && !navigator.webdriver && (TALKS.some(t => t.elige) || menuOpen() || !!document.querySelector('#talk:not([hidden]) input')); }
function narraPausa(){
  const t = TALKS.find(t => t.narra); if (!t) return false;
  if (performance.now() > t.narra.hasta) { t.narra.seguir(); return false; }
  return true;
}
function talkEnd(t){
  TALKS = TALKS.filter(x => x !== t); if (t.narra) { t.narra = null; const el = $('narra'); if (el) el.hidden = true; }
  for (const k of t.hold || []) delete CHAT_HOLD[k];
  t.end?.(t.lines.slice(t.i + 1));
  const q = t.ch && TALK_Q[t.ch]; if (q?.length) { const n = q.shift(); TALKS.push(n); if (n.resumen) logEv(n.resumen, []); }
}
// what is said on each stretch of the road, in order, from where it was left
// more of Ana's chatter on the way home (improvised in her voice, about what is seen on each stretch), after the book's:
// one table for each stretch (its «v»), in src/datos/dichos/30-viaje.txt («=== viaje:M3 ===», in order, each line with
// who says it); the scenes of the road take pieces of them by number (M3:0-2, VIAJE_ESCENAS in 21)
const VIAJE_MAS = Array.from({ length: Math.max(...ROAD_TRAMOS.map(t => t.v)) + 1 }, (_, v) => dichosEnOrden('viaje:M' + v));
// and her loose musings, after the book's (viaje:relleno, in order)
LIBRO1.relleno.push(...dichosEnOrden('viaje:relleno').map(([, t]) => t));
function roadTramoIn(k, tr){
  if (tr.m) cap1Mark(tr.m, tr.note);
  else if (tr.note) logEv(tr.note, []);
  if (tr.v === 1 && PEOPLE[k].roadDir > 0 && !game.roadLady) game.roadLady = { s: clamp(PEOPLE[k].roadS + .03, 0, 1) };   // (a lady in a cart, coming the other way)
  if (!tr.quiet) logEv(`En ${tr.name}, Ana le habló a ${wmName(k)} sin parar${tr.v >= 0 ? ': ' + (LIBRO1.viajeP[tr.v].split(/[.;]/)[0] || '').toLowerCase() : ''}.`, []);
}
// what is spoken of needs to be in sight (camino.visible in a scene): is it, from where Ana is?
function roadTagOk(tag, x){
  if (!tag) return true;
  if (tag === 'mar') return RSEA.some(([a, b]) => x > a + 300 && x < b - 300);
  if (tag === 'cerezo') return x < RCHERRY.x + 6500;   // (looking back, it is still to be seen)
  const kind = roadTramo(roadSOf(x)).kind;   // (the stretches where there is such a thing)
  if (tag === 'barranco') return kind === 'barranco';
  if (tag === 'abetos') return kind === 'bosque';
  if (tag === 'flores') return ['barranco', 'granjas', 'ciruelos', 'curva'].includes(kind);
  if (tag === 'carreta') return !!game.roadLady && Math.abs(roadXOf(game.roadLady.s) - x) < 900;
  if (tag === 'curva') { const c = ROAD_TRAMOS.find(t => t.kind === 'curva'), n = ROAD_TRAMOS[ROAD_TRAMOS.indexOf(c) + 1]; return roadSOf(x) > c.s + (n.s - c.s) * .5; }
  return (ROAD_SPOT[tag] || []).some(px => Math.abs(px - x) < 750);
}
function roadTalkTick(dt){ if (game.roadLady) { game.roadLady.s -= dt * ROAD_V * .8 / ROAD_LEN; if (game.roadLady.s < .01) game.roadLady = null; } }
// Ana's other musings, never twice in a row (when the book's lines of a stretch are all said)
function fillLines(n){
  const used = game.dlgUsed || (game.dlgUsed = {}), R = LIBRO1.relleno; let i = used.relleno || 0;
  if (i >= R.length) { for (const k of Object.keys(used)) if (k.startsWith('viaje') || k === 'relleno') delete used[k]; i = 0; }   // (all of it said: it starts over)
  const L = R.slice(i, i + n).map(t => ({ q: 'ana', t })); used.relleno = i + L.length; return L;
}
// at the end of the road, on the way into Avonlea: the Avenue behind, one more mile, the pond, Green Gables
function roadAvonlea(k){ game.road = null; }   // (into Avonlea: the scenes of the last mile, the pond and Green Gables go by place)
// the strip at the bottom while on the road (or in the cart): where, how far, and how fast
let GAME_SPEED = 1;
const tripOn = () => game.scene === 'camino' || cart.riding || (!!AGENTS.ana?.ride && !!AGENTS.ana.followOf) || (CAP1.on && !CAP1.done);
const tripSpeed = () => GAME_SPEED;   // (the time can go faster anywhere: up to 50×)
let tripTxt = '';
function tripBarDraw(){
  const on = tripOn() && $('talk').hidden && !document.querySelector('#narra:not([hidden])'); $('tripbar').hidden = !on; if (!on) return;   // (not over a choice or a card: it would hide them)
  let s = '🐴 En la calesa';
  if (game.scene === 'camino') { const d = PEOPLE[game.road?.with], dir = d?.roadDir || 1, tr = roadTramo(ana.roadS); s = ana.onCart ? `🐴 ${dir > 0 ? 'Hacia Avonlea' : 'Hacia Bright River'} · ${tr.name} · faltan ${millas(roadMiles(ana.roadS, dir))}` : `🚶 A pie · ${tr.name} · ${millas(roadMiles(ana.roadS, 1))} a Tejas Verdes, ${millas(roadMiles(ana.roadS, -1))} a la estación`; }
  else if (CAP1.on && !CAP1.done) s = CAP1.juego ? (game.scene === 'br' ? '🚉 Bright River · ' : '🐴 Con Matthew, camino a Avonlea · ') + fmtHour(hourNow()) : '📖 Capítulo 1 · ' + fmtHour(hourNow());   // (the beginning at the station: where she is, not a chapter of the tests)
  if (s !== tripTxt) { tripTxt = s; $('tripstop').textContent = s; }
}
// the island, the big map: only the towns, the roads between them, and where Ana is
const ISLA = {
  shore: [[.04, .5], [.09, .38], [.16, .33], [.25, .36], [.33, .3], [.42, .3], [.5, .27], [.58, .28], [.66, .24], [.75, .26], [.83, .22], [.92, .26], [.97, .36], [.93, .44], [.86, .46], [.8, .55], [.72, .6], [.66, .7], [.58, .66], [.5, .62], [.44, .66], [.36, .6], [.28, .62], [.2, .58], [.12, .62], [.06, .58]],
  towns: { avonlea: ['Avonlea', .47, .35], whitesands: ['White Sands', .56, .33], spencervale: ['Spencervale', .38, .34], newbridge: ['Newbridge', .5, .44], carmody: ['Carmody', .42, .47], brightriver: ['Bright River', .5, .53], charlottetown: ['Charlottetown', .6, .61], hopeton: ['Hopeton', .22, .5] },
  roads: [['avonlea', 'newbridge', 'brightriver'], ['avonlea', 'whitesands'], ['avonlea', 'spencervale'], ['avonlea', 'carmody'], ['carmody', 'brightriver'], ['brightriver', 'charlottetown']],
  rail: [[.1, .52], [.22, .5], [.36, .52], [.5, .53], [.6, .61], [.8, .5], [.92, .4]],
};
function islaToggle(on = $('isla').hidden){
  $('isla').hidden = !on; if (!on) return;
  const cv = $('islacv'), dpr = devicePixelRatio || 1, w = Math.min(innerWidth - 40, 760), h = Math.round(w * .62);
  cv.style.width = w + 'px'; cv.style.height = h + 'px'; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); islaDraw();
}
function islaDraw(){
  if ($('isla').hidden) return;
  const cv = $('islacv'), c = cv.getContext('2d'), w = cv.width, h = cv.height, dpr = devicePixelRatio || 1, P = ([x, y]) => [x * w, y * h], T_ = ISLA.towns;
  c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = '#bcd8e2'; c.fillRect(0, 0, w, h);
  c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = dpr; for (let k = 0; k < 9; k++) { c.beginPath(); c.moveTo(0, h * (k + .5) / 9); for (let x = 0; x <= w; x += 20 * dpr) c.lineTo(x, h * (k + .5) / 9 + Math.sin(x * .02 + k) * 2 * dpr); c.stroke(); }
  blob(c, ISLA.shore.map(P), '#f1e2bf'); ell(c, .47 * w, .37 * h, .07 * w, .045 * h, 'rgba(160,190,120,.35)');
  c.setLineDash([6 * dpr, 4 * dpr]); line(c, ISLA.rail.map(P), '#5a5a62', 1.6 * dpr, 7); c.setLineDash([]);
  for (const r of ISLA.roads) line(c, r.map(k => P([T_[k][1], T_[k][2]])), '#b8573e', 2.2 * dpr, r.length);
  for (const [k, [name, x, y]] of Object.entries(T_)) { const [sx, sy] = P([x, y]), big = k === 'avonlea' || k === 'brightriver' || k === 'charlottetown'; c.beginPath(); c.arc(sx, sy, (big ? 5 : 3.5) * dpr, 0, TAU); c.fillStyle = big ? '#7a4a3a' : '#9a7a56'; c.fill(); c.font = `italic ${(big ? 14 : 12) * dpr}px Georgia, serif`; c.textAlign = 'center'; c.lineWidth = 3 * dpr; c.strokeStyle = 'rgba(241,226,191,.95)'; c.strokeText(name, sx, sy - 9 * dpr); c.fillStyle = '#4a2f1c'; c.fillText(name, sx, sy - 9 * dpr); }
  c.font = `italic ${11 * dpr}px Georgia, serif`; c.fillStyle = '#4a6a7a'; c.fillText('Golfo de San Lorenzo', .5 * w, .12 * h); c.fillText('Estrecho de Northumberland', .45 * w, .85 * h);
  // where Ana is: in Avonlea, at Bright River, or somewhere on the road between them
  const av = [T_.avonlea[1], T_.avonlea[2]], nb = [T_.newbridge[1], T_.newbridge[2]], br = [T_.brightriver[1], T_.brightriver[2]];
  const onRoad = s => s > .5 ? [lerp(nb[0], av[0], (s - .5) * 2), lerp(nb[1], av[1], (s - .5) * 2)] : [lerp(br[0], nb[0], s * 2), lerp(br[1], nb[1], s * 2)];
  const mk = (p, name, col) => { const [sx, sy] = P(p); c.beginPath(); c.arc(sx, sy, (6 + Math.sin(TT * 5)) * dpr, 0, TAU); c.fillStyle = col; c.fill(); c.lineWidth = 1.4 * dpr; c.strokeStyle = 'rgba(60,35,20,.9)'; c.stroke(); c.font = `bold ${12 * dpr}px Georgia, serif`; c.fillStyle = '#4a2f1c'; c.fillText(name, sx, sy + 20 * dpr); };
  const m = PEOPLE.matthew; if (m.where === 'camino' && game.scene !== 'camino') mk(onRoad(m.roadS), 'Matthew', LOOKS.matthew.dress);
  mk(game.scene === 'camino' ? onRoad(ana.roadS) : game.scene === 'br' ? br : av, 'Ana', '#d9433b');
}
// a choice in a scene: the player chooses (a menu); if Ana goes on her own, she chooses (what she would do, «->*», or
// the first); the chosen option's lines go on in the scene, and what it does is done at once
function elegir(t, opciones){
  t.wait = 1e9;
  const aplicar = op => {
    t.lines.splice(t.i + 1, 0, ...op.lineas.map(([q, x]) => ({ q, t: x })));
    const conv = typeof CONVERSACIONES !== 'undefined' && CONVERSACIONES.some(d => d.id === t.esc);
    dlgHacer(op.efectos.map(a => a.suma && conv ? { ...a, limitado: true } : a));   // (in a conversation, what it adds: at most once a day)
    if (typeof relatoLinea === 'function' && RELATO.on) relatoLinea('Ana elige: «' + op.texto + '».', { quien: 'ana', dice: op.texto });
    logEv('Ana eligió: ' + op.texto.replace(/^./, c => c.toLowerCase()) + '.', []);
    t.wait = .4; t.elige = null;
  };
  const pide = op => { const e = op.efectos.find(a => a.nombrar && a.pedir); if (!e) return aplicar(op); pedirNombre(e.nombrar, n => aplicar({ ...op, texto: n, efectos: op.efectos.map(a => a === e ? { ...a, n } : a) })); };   // (a name to write: the box first)
  const propia = opciones.find(o => o.propia) || opciones[0];
  if (navigator.webdriver || ana.hidden) return aplicar(propia);   // (no one to ask: what she would do)
  let hecho = false; const una = op => { if (hecho) return; hecho = true; close(); pide(op); };
  say('ana', opciones.some(op => op.efectos.some(a => a.nombrar)) ? '¿Cómo lo llama Ana?' : '¿Qué hace Ana?', opciones.map(op => [nombreMay(op.texto.replace(/^«(.)/, (m, c) => '«' + c.toUpperCase())), () => una(op)]));
  t.elige = { hasta: auto.on ? TT + 10 : Infinity, una, propia };   // (if the player is away, Ana chooses after a while: what she would do)
}
