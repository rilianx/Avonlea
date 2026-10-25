/* ---------- the beginning: the night Ana comes to Green Gables, on trial (cap. 3 to 8) ----------
   A new game starts that evening, in the kitchen, with Matthew and Marilla: Marilla expected a boy (the scenes
   inicio_llegada, primera_noche, desayuno_prueba, viaje_spencer and se_queda of the script). Marilla, who did not want
   a girl, cares little for her at first; Matthew, who drove her home, already cares a great deal. To stay for good,
   Ana has to win Marilla over (the notebook: «Quedarse en Tejas Verdes»). A game from before all this has her staying
   already; and so do the test goals (each tests one thing). */
const NUEVA_PARTIDA = !localStorage.getItem('avonlea');
function inicioLlegada(){
  if (today() % 7 === 6) dayT += 1;   // (a weekday)
  dayAt(19.75); setSeason(0); S = 0;   // (an evening in early June, at dusk, as in the book: with time for it before bed)
  enLaCocina();
  try { localStorage.removeItem(PUNTOS_KEY); } catch (e) {}   // (a new game: the points of the one before are no longer its own)
  { const h = $('hint'); if (h) h.style.opacity = 0; hinted = true; }   // (the controls: the tutorial cards tell them, when the player takes over)
  for (const k of Object.keys(PEOPLE)) amb.mute[k] = TT + 180;   // (no loose lines while she arrives)
  logEv('Una noche de comienzos de junio, Matthew llegó a Tejas Verdes con una niña de pelo rojo.', []);
}
// the three in the kitchen, at the door: Marilla by the stove, Matthew and Ana just in (and from here, the game)
function enLaCocina(){
  const put = (k, x, y) => { const b = PEOPLE[k]; b.where = 'gg'; b.x = x; b.y = y; b.sit = false; b.nav = null; b.bnav = null; b.buggy = false; b.story = null; b.away = null; };
  put('marilla', STOVE.x + 30, STOVE.y + 40); put('matthew', KDOOR.x + 50, KIT.h * .55);
  game.scene = 'gg'; ana.hidden = false; ana.sit = false; ana.x = KDOOR.x + 20; ana.y = KIT.h * .6; ana.dir = 1;
  relSetW('marilla', 'ana', 1); relSetW('matthew', 'ana', 4);
  dlgHecho('inicio_juego');
}
// or the story begins earlier, at Bright River station, where Ana waits on a pile of shingles and Matthew comes for her
// (cap. 2): chapter 1 runs (src/js/20-capitulo-1.js) from the train on, and the drive home through the Avenue and past
// the pond is played; at Green Gables, the game goes on as if it had begun there
function inicioEstacion(){
  startCap1(); CAP1.juego = true;
  for (let k = 0; k < 30 * 900 && hourNow() < 17.45; k++) { for (const t of TALKS.slice()) { if (t.esc) dlgDichas()[t.esc] = true; t.interrupted = true; talkEnd(t); } update(1 / 30); }   // (the afternoon before the train, quickly: Avonlea goes on without her; what was said then, was said: not later)
  // the chapter's scenes without Ana that tell with cards (Rachel at her window): past, or where she is not; none of
  // their cards (the rest go on where she is not, as they would: Rachel to Green Gables, to the Bells…)
  for (const d of DIALOGOS) if (d.narra && [].concat(d.si || []).includes('capitulo') && !d.hablan().includes('ana') && !(d.en && 'ana' in d.en) && !/escena_ana|ana_visible/.test([].concat(d.si || []).join(','))) dlgDichas()[d.id] = true;
  observe(null); logEv('Una tarde de comienzos de junio, una niña de pelo rojo bajó del tren en Bright River.', []);
  talkPlay([['narra', 'Avonlea, un pueblito de granjas en la Isla del Príncipe Eduardo, en Canadá, a fines del siglo XIX. En la granja de Tejas Verdes viven dos hermanos solterones, Matthew y Marilla Cuthbert. Ya están mayores, y le pidieron a la Sra. Spencer que les trajera del orfanato un niño, para ayudar en el campo.'],
    ['narra', 'Hoy, una tarde de comienzos de junio, Matthew salió en la calesa a buscarlo a la estación de Bright River, a ocho millas. Pero en el tren de las cinco y media no venía ningún niño.']], { ch: 'intro', siempre: true });
}
function cap1AlJuego(){
  CAP1.on = false; CAP1.juego = false;
  for (const k of Object.keys(AGENTS)) { wmRelease(k); delete AGENTS[k]; } for (const k of Object.keys(CHAT_HOLD)) delete CHAT_HOLD[k];
  AGENDA_ON = true; if ($('wmagenda')) $('wmagenda').checked = true;
  dlgHecho('desde_estacion'); enLaCocina(); for (const k of Object.keys(PEOPLE)) amb.mute[k] = TT + 180; dlgComento.comentario = TT + 180;   // (no loose lines, nor Ana's remarks, while she arrives)
}
// where it begins: at Green Gables (the book's chapter 3), and, while the first cards are read, a button to begin
// earlier, at the station (chapter 2). It does not stop anything: whoever does not want it, goes on
function ofrecerEstacion(){
  const b = document.createElement('button'); b.id = 'antes'; b.textContent = '🚉 Empezar antes: en la estación de Bright River, esperando a Matthew';
  b.style.cssText = 'position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:60;font:15px Georgia,serif;padding:8px 14px;border-radius:10px;border:1px solid #b89b6c;background:#fbf3e2;color:#4a2f1c;box-shadow:0 2px 8px rgba(0,0,0,.2);cursor:pointer;max-width:calc(100% - 32px)';
  b.tabIndex = -1; b.onmousedown = e => e.preventDefault();   // (it never takes the keyboard: Enter is for the cards)
  let seguro = 0;   // (a tap by chance is not a choice: a second one, to be sure)
  b.onclick = e => { e.stopPropagation(); if (!seguro) { seguro = TT; b.textContent = '🚉 ¿Empezar en Bright River? Toca otra vez para confirmar'; setTimeout(() => { seguro = 0; if (document.body.contains(b)) b.textContent = '🚉 Empezar antes: en la estación de Bright River, esperando a Matthew'; }, 4000); return; }
    b.remove(); for (const t of TALKS.slice()) { t.interrupted = true; talkEnd(t); } close(); inicioEstacion(); };
  document.body.appendChild(b);
  const fin = setInterval(() => { if (!document.body.contains(b)) return clearInterval(fin); if (hourNow() > 19.95 || dlgHechos().llegada_tv) { b.remove(); clearInterval(fin); } }, 500);   // (once the arrival is under way, it is too late)
}
// (a game from before the beginning: Ana already stays; the test goals too)
const yaSeQueda = () => { const H = dlgHechos(); for (const f of ['llegada_tv', 'primera_noche', 'desayuno_prueba', 'a_prueba', 'se_queda']) H[f] ??= today() + 1; };
if (NUEVA_PARTIDA && !navigator.webdriver) { inicioLlegada(); setTimeout(ofrecerEstacion, 0); }
else if (!NUEVA_PARTIDA && !dlgHechos().a_prueba && !dlgHechos().inicio_juego) yaSeQueda();
// a game from before: it goes on where it was left, at the hour it was (the day and the hour come back with the rest)
if (!NUEVA_PARTIDA && dlgHechos().inicio_juego && !dlgHechos().desayuno_prueba) { const h = $('hint'); if (h) h.style.opacity = 0; hinted = true; }   // (back in the middle of the first night: the cards tell the controls)
if (!NUEVA_PARTIDA && !navigator.webdriver) try { seguirDondeQuedo(JSON.parse(localStorage.getItem('avonlea') || 'null')?.donde); } catch (e) {}
// the first night: the player takes her up to bed (the scene says so); if no one does (Ana on her own), after a while
// she goes up by herself and lies down
let inicioT = 0, inicioFin = 0;
function inicioTick(dt){
  if ((inicioT -= dt) > 0) return; inicioT = 3;
  const H = dlgHechos(); if (!H.primera_noche || H.desayuno_prueba || dlgDichas().cama_1 || sleeping || navigator.webdriver) { inicioFin = 0; return; }
  if (TALKS.length || game.talk) return;
  if (game.scene === 'ga') { primeraVez('bed', goToBed); return; }   // (up in her room: she throws herself on the bed at once)
  if (!inicioFin) inicioFin = TT;
  if (auto.on && TT - inicioFin > 60) { if (game.scene !== 'ga') goIn('ga', [GA.bed.x - 20, GA.bed.y + 16]); primeraVez('bed', goToBed) || goSleep(false); }
}
