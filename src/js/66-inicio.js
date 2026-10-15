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
  const put = (k, x, y) => { const b = PEOPLE[k]; b.where = 'gg'; b.x = x; b.y = y; b.sit = false; b.nav = null; b.buggy = false; b.story = null; b.away = null; };
  put('marilla', STOVE.x + 30, STOVE.y + 40); put('matthew', KDOOR.x + 50, KIT.h * .55);
  game.scene = 'gg'; ana.hidden = false; ana.sit = false; ana.x = KDOOR.x + 20; ana.y = KIT.h * .6; ana.dir = 1;
  relSetW('marilla', 'ana', 1); relSetW('matthew', 'ana', 4);
  dlgHecho('inicio_juego');
  { const h = $('hint'); if (h) h.style.opacity = 0; hinted = true; }   // (the controls: the tutorial cards tell them, when the player takes over)
  for (const k of Object.keys(PEOPLE)) amb.mute[k] = TT + 180;   // (no loose lines while she arrives)
  logEv('Una noche de comienzos de junio, Matthew llegó a Tejas Verdes con una niña de pelo rojo.', []);
}
// (a game from before the beginning: Ana already stays; the test goals too)
const yaSeQueda = () => { const H = dlgHechos(); for (const f of ['llegada_tv', 'primera_noche', 'desayuno_prueba', 'a_prueba', 'se_queda']) H[f] ??= today() + 1; };
if (NUEVA_PARTIDA && !navigator.webdriver) inicioLlegada();
else if (!NUEVA_PARTIDA && !dlgHechos().a_prueba && !dlgHechos().inicio_juego) yaSeQueda();
// a game from before: it goes on where it was left, at the hour it was (the day and the hour come back with the rest)
if (!NUEVA_PARTIDA && !navigator.webdriver) try { seguirDondeQuedo(JSON.parse(localStorage.getItem('avonlea') || 'null')?.donde); } catch (e) {}
// the first night: the player takes her up to bed (the scene says so); if no one does (Ana on her own), after a while
// she goes up by herself and lies down
let inicioT = 0, inicioFin = 0;
function inicioTick(dt){
  if ((inicioT -= dt) > 0) return; inicioT = 3;
  const H = dlgHechos(); if (!H.primera_noche || H.desayuno_prueba || dlgDichas().primera_bed || sleeping || navigator.webdriver) { inicioFin = 0; return; }
  if (TALKS.length || game.talk) return;
  if (game.scene === 'ga') { primeraVez('bed', goToBed); return; }   // (up in her room: she throws herself on the bed at once)
  if (!inicioFin) inicioFin = TT;
  if (auto.on && TT - inicioFin > 60) { if (game.scene !== 'ga') goIn('ga', [GA.bed.x - 20, GA.bed.y + 16]); primeraVez('bed', goToBed) || goSleep(false); }
}
