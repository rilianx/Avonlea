/* ---------- the trip's talk: Ana's chatter (the book's, stretch by stretch) and Matthew's few words. Nothing is said
   twice: each stretch goes on, next time, where it was left (game.dlgUsed), and when all of it has been said, Ana's
   other musings; when those too are said, it all starts over. ---------- */
let TALKS = [];
function talkPlay(lines, o = {}){
  const L = lines.map(l => Array.isArray(l) ? (l[0] === '?' ? { q: '?', t: 'elige', opc: l[2] } : { q: l[0], t: l[1], m: l[2] }) : l).filter(l => l.t && l.t !== '…');
  for (const k of o.hold || []) CHAT_HOLD[k] = TT + 1e6;
  const t = { hold: o.hold, lines: L, i: -1, wait: o.delay ?? .5, gap: o.gap || 0, ch: o.ch, stop: o.stop, end: o.end, budget: o.budget ? o.budget * MIN_S : 0, el: 0, use: o.use, resumen: o.resumen };
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
    if (t.narra && TT > t.narra.hasta) { const n = t.narra; t.narra = null; n.seguir(); }
    if ((t.wait -= dt) > 0) continue;
    if (t.stop?.() || ++t.i >= t.lines.length || (t.budget && t.el > t.budget)) { talkEnd(t); continue; }
    const l = t.lines[t.i]; if (l.q === '?') { elegir(t, l.opc); continue; }   // (a choice: the scene waits for it)
    if (l.q === 'narra') { narrar(t, l.t); continue; }   // (a text that explains: a card, until the player goes on)
    sayB(talkQ(l.q), l.t); t.wait = lineDur(l.t) + .35 + t.gap;   // (gap: a scene that takes its time, like a letter being written)
    if (l.m) cap1Mark(l.m); t.use?.(t.i, l);
  }
}
// a text that explains (who is who, what happened before, where we are): a card over the game, as a page of a book;
// the scene waits until the player goes on (with no one to read it, or Ana on her own, after a while)
function narrar(t, texto){
  if (typeof relatoLinea === 'function' && RELATO.on) relatoLinea('(Narración) ' + texto, { quien: 'narra', dice: texto });
  if (navigator.webdriver || ana.hidden) { t.wait = .2; return; }
  t.wait = 1e9; let el = $('narra');
  if (!el) { el = document.createElement('div'); el.id = 'narra'; document.body.appendChild(el);
    el.style.cssText = 'position:fixed;left:50%;top:14%;transform:translateX(-50%);width:min(520px,calc(100vw - 32px));z-index:40;background:#f6ecd2;color:#3b2a1c;border:1px solid #8a6a48;border-radius:10px;box-shadow:0 6px 24px rgba(40,25,10,.35);padding:16px 20px 12px;font:italic 16px/1.5 Georgia,serif'; }
  el.innerHTML = '<div class="tx"></div><div style="text-align:right;margin-top:10px"><button style="font:13px Georgia,serif;padding:4px 12px;border:1px solid #8a6a48;border-radius:6px;background:#fffaf0;color:#3b2a1c;cursor:pointer">Seguir ▸</button></div>';
  el.querySelector('.tx').textContent = conNombres(texto); el.hidden = false;
  let ya = false; const seguir = () => { if (ya) return; ya = true; t.narra = null; el.hidden = true; if (TALKS.includes(t)) t.wait = .3; };
  el.querySelector('button').onclick = e => { e.stopPropagation(); seguir(); };
  t.narra = { seguir, hasta: auto.on ? TT + lineDur(texto) * 1.6 + 3 : Infinity };
}
function talkEnd(t){
  TALKS = TALKS.filter(x => x !== t); if (t.narra) { t.narra = null; const el = $('narra'); if (el) el.hidden = true; }
  for (const k of t.hold || []) delete CHAT_HOLD[k];
  t.end?.(t.lines.slice(t.i + 1));
  const q = t.ch && TALK_Q[t.ch]; if (q?.length) { const n = q.shift(); TALKS.push(n); if (n.resumen) logEv(n.resumen, []); }
}
// what is said on each stretch of the road, in order, from where it was left
// more of Ana's chatter on the way home (improvised in her voice, about what is seen on each stretch), after the book's
const VIAJE_MAS = [
  [['ana', '¿Vio cómo el barranco nos tapa el cielo de a ratos? Es como ir por un pasillo de un castillo, pero con flores en vez de tapices.'], ['matthew', 'Bueno, pues… sí, es alto el barranco.'], ['ana', 'La tierra es tan roja que parece que la isla se hubiera ruborizado al vernos pasar.'], ['ana', 'Estos abedules son tan blancos y delgados… parecen damas de honor esperando a la novia del cerezo.'], ['matthew', 'Je. Damas de honor.'], ['ana', '¿Puedo quedarme con esta rama de ciruelo? La voy a poner en agua apenas lleguemos. Bueno, si es que me dejan quedarme… digo, si me dejan poner flores.'], ['matthew', 'Bueno, pues, quédatela.'], ['ana', 'Huele a algo que todavía no tiene nombre. Le voy a buscar uno de aquí a Avonlea.']],
  [['ana', '¡Mire, una señora viene en su carreta! ¿Por qué la saludó, si no la conoce?'], ['matthew', 'Aquí en la Isla se saluda a todos, Ana.'], ['ana', 'Me gusta eso. Es como si la isla entera fuera una sola familia grande que todavía no se ha presentado.'], ['ana', 'Esos manzanos parecen nubes que se cansaron de flotar y se sentaron en el pasto.'], ['ana', '¿Usted cree que las granjas se ponen celosas unas de otras cuando una tiene más flores?'], ['matthew', 'Bueno, pues… nunca lo pensé.'], ['ana', 'Yo creo que no. Seguro que se prestan las abejas.'], ['ana', 'Si yo viviera en una granja así, le pondría nombre a cada manzano. Ése se llamaría Lady Blanca, y ése, Sir Rosado.']],
  [['ana', '¡Ay, qué sombra tan fresca! Los abetos son como señores muy serios que en el fondo son tiernos.'], ['ana', 'Cierre los ojos un momento, señor Cuthbert… ¿siente el olor? Es como si alguien hubiera abierto un frasco de bosque.'], ['matthew', 'Bueno, pues, yo manejo… mejor no cierro los ojos.'], ['ana', '¡Tiene razón! Qué sensato es usted. Yo los cerraré por los dos.'], ['ana', '¿Sabe que en el orfanato soñaba con un bosque así? Lo imaginaba tanto que casi podía tocarlo. Y ahora es de verdad.'], ['ana', 'Ese pájaro canta como si alguien lo hubiera invitado a una fiesta y llegara tarde.'], ['matthew', 'Es un zorzal, me parece.'], ['ana', 'Un zorzal. Hasta el nombre suena a canción.']],
  [['ana', 'Esta hondonada es como un tazón lleno de nieve que no se derrite.'], ['ana', 'Los ciruelos silvestres se ven tan vaporosos… como si los hubieran pintado con el dedo.'], ['matthew', 'Bueno, pues, este año florecieron bien.'], ['ana', '¿Usted se acuerda de cuántas primaveras ha visto, señor Cuthbert?'], ['matthew', 'Unas sesenta, más o menos.'], ['ana', '¡Sesenta primaveras! Qué rico debe ser tener tantas guardadas. Yo solo tengo once, y la mitad las pasé cuidando mellizos.'], ['ana', 'Pero ésta va a ser la mejor de todas, lo sé. Ya empezó a serlo.'], ['matthew', 'Ya lo creo.']],
  [['ana', 'Desde aquí arriba se ve todo el mundo. Bueno, todo el mundo de la isla, que debe ser la parte más bonita.'], ['ana', 'El mar se ve tan azul… ¿será que el cielo se mira en él como en un espejo para peinarse?'], ['matthew', 'Bueno, pues… puede ser.'], ['ana', 'Ojalá un día pueda ir a la playa y mojarme los pies. ¿La arena también es roja?'], ['matthew', 'Roja, sí. Y en White Sands, blanca.'], ['ana', '¡Arena de dos colores! Esta isla tiene de todo, como un baúl de tesoros.'], ['ana', 'Las granjas con sus graneros rojos parecen juguetes que alguien olvidó en el pasto.'], ['matthew', 'Je. Juguetes.']],
  [['ana', 'Estos arces son tan grandes… deben haber visto pasar a mucha gente. Me pregunto si se acuerdan de alguien.'], ['ana', 'Escuche las abejas en el huerto: zumban como si estuvieran rezando.'], ['matthew', 'Bueno, pues, están trabajando, más bien.'], ['ana', 'Trabajar y rezar a la vez. Las abejas son muy virtuosas.'], ['ana', 'Ese arroyito que pasa por debajo del camino… ¿adónde irá? Seguro que va a contarle algo al mar.'], ['ana', '¿El arroyo de Tejas Verdes también va al mar?'], ['matthew', 'Va al lago, y el lago, al mar.'], ['ana', 'Entonces todo está conectado. Me encanta pensar eso.']],
  [['ana', 'Huele a madera recién cortada. Es un olor muy honrado, ¿no le parece?'], ['matthew', 'Bueno, pues, sí. Huele bien.'], ['ana', 'Mire a esos niñitos jugando junto a la ropa tendida. Ojalá alguien les cuente cuentos de noche.'], ['ana', 'Yo les contaba cuentos a los mellizos de la señora Hammond. Los inventaba, porque libros no había.'], ['matthew', '¿Y les gustaban?'], ['ana', 'Se dormían a la mitad. Yo prefería pensar que era porque estaban muy tranquilos, no aburridos.'], ['ana', 'La rueda del aserradero da vueltas y vueltas, como mis pensamientos cuando no puedo dormir.'], ['matthew', 'Je. Ya lo creo.']],
  [['ana', 'Ese hombre sembrando a mano parece que le estuviera echando semillas de esperanza a la tierra.'], ['ana', 'Las vacas nos miran como si fuéramos el acontecimiento del día.'], ['matthew', 'Bueno, pues, aquí no pasa mucho.'], ['ana', '¡Entonces me alegro de darles algo que contar! ¿Las vacas se cuentan cosas?'], ['matthew', 'Mugen, nomás.'], ['ana', 'Seguro que en vaca eso quiere decir algo muy profundo.'], ['ana', 'Estas cercas en zigzag parecen costuras que unen un campo con otro, para que no se separen.'], ['matthew', 'Bueno, pues… algo así.']],
  [['ana', 'Ese cementerio tan tranquilo, con sus piedras blancas… no me da miedo. Parece un jardín donde se descansa.'], ['ana', 'Las lilas de esa casita huelen tan dulce que casi se oyen.'], ['matthew', 'Bueno, pues, a Marilla le gustan las lilas.'], ['ana', '¿De verdad? ¡Entonces ya tenemos algo en común! Eso es un buen comienzo, ¿no?'], ['matthew', 'Ya lo creo.'], ['ana', 'Me pregunto si en Avonlea hay una iglesia así. Me gustaría ir los domingos con un sombrero con flores.'], ['matthew', 'Bueno, pues… eso ya lo dirá Marilla.'], ['ana', 'Lo pensaré con mucho cuidado, entonces.']],
  [['ana', 'Los sauces se inclinan sobre el arroyo como si quisieran tomar agua sin mojarse el pelo.'], ['ana', 'Este puentecito de tablas suena distinto al de la estación. Más alegre, como un tambor chiquito.'], ['matthew', 'Bueno, pues, es de tablas.'], ['ana', 'La luz se está poniendo dorada. A esta hora todo parece más importante, ¿no le parece?'], ['matthew', 'Bueno, pues… se pone bonito, sí.'], ['ana', 'Si yo pudiera embotellar esta luz, la guardaría para los días de lluvia.'], ['ana', 'Aunque la lluvia también me gusta. Es que me gusta casi todo, eso es lo malo.'], ['matthew', 'Je. Eso no tiene nada de malo.']],
  [['ana', 'El cielo se está poniendo rosado y lila… parece un vestido de baile.'], ['ana', '¿Falta mucho, señor Cuthbert? No es que quiera llegar… bueno, sí quiero, pero también quiero que esto no se acabe.'], ['matthew', 'Bueno, pues… todavía un buen trecho.'], ['ana', '¡Qué bien! Digo… qué lástima. No, qué bien.'], ['ana', 'Allá adelante el camino da una vuelta. Me encantan las vueltas del camino: nunca se sabe qué hay detrás.'], ['matthew', 'Ya vas a ver.'], ['ana', 'Ay, lo dijo de un modo… como si fuera una sorpresa. ¿Es una sorpresa?'], ['matthew', 'Bueno, pues… algo así.']],
];
LIBRO1.relleno.push(
  '¿Usted cree que los caminos se cansan de que los pisen todo el día?', 'Me parece que esa nube tiene forma de castillo con una princesa asomada a la ventana.', 'Si yo fuera un caballo, me gustaría que me llamaran Esperanza.',
  'Cuando sea grande quiero escribir un libro sobre un viaje en calesa. Éste, por ejemplo.', '¿No le pasa que a veces está tan contento que le dan ganas de llorar?', 'La yegua mueve las orejas como si nos estuviera escuchando. Seguro que entiende todo.',
  'Me pregunto qué estarán haciendo ahora los niños del orfanato. Ojalá alguien los lleve de paseo algún día.', 'Ese pájaro voló tan bajo que casi me toca el sombrero. ¡Qué atrevido!', 'Tengo tantas preguntas que si las dijera todas llegaríamos a Avonlea y todavía me quedarían.',
  'Las ruedas hacen un ruido que parece decir «Tejas Verdes, Tejas Verdes, Tejas Verdes».', '¿Cree que la señorita Cuthbert sabrá hacer tarta de cerezas? Es que nunca he comido una.', 'El viento me desordena las trenzas, pero no me importa. Hoy nada me importa.',
  'Si cierro los ojos, el ruido de los cascos parece música de una banda lejana.', 'Una vez leí que en Arabia hay caminos de arena dorada. Pero apuesto a que no son rojos como éstos.', 'Me encanta cómo dice usted «bueno, pues». Suena como alguien que piensa las cosas antes de decirlas.',
  '¿Sabía que yo nunca había andado en calesa? Solo en carreta de leche, una vez, y olía a queso.', 'El aire de la tarde sabe distinto, como a pan recién hecho y a flores mezcladas.', 'Ya no me pellizco más: si es un sueño, que dure. Y si no lo es… ¡mejor todavía!',
);
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
  const on = tripOn(); $('tripbar').hidden = !on; if (!on) return;
  let s = '🐴 En la calesa';
  if (game.scene === 'camino') { const d = PEOPLE[game.road?.with], dir = d?.roadDir || 1, tr = roadTramo(ana.roadS); s = ana.onCart ? `🐴 ${dir > 0 ? 'Hacia Avonlea' : 'Hacia Bright River'} · ${tr.name} · faltan ${millas(roadMiles(ana.roadS, dir))}` : `🚶 A pie · ${tr.name} · ${millas(roadMiles(ana.roadS, 1))} a Tejas Verdes, ${millas(roadMiles(ana.roadS, -1))} a la estación`; }
  else if (CAP1.on && !CAP1.done) s = '📖 Capítulo 1 · ' + fmtHour(hourNow());
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
  say('ana', '¿Qué hace Ana?', opciones.map(op => [nombreMay(op.texto), () => una(op)]));
  t.elige = { hasta: auto.on ? TT + 10 : Infinity, una, propia };   // (if the player is away, Ana chooses after a while: what she would do)
}
