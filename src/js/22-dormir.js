/* ---------- sleep: Ana gets sleepy at night, and goes to bed (the day starts again at dawn) ---------- */
let sleeping = false, sleepyStage = 0;
function goToBed(){
  if (primeraVez('bed', goToBed)) return;   // (the first night, her bed is the scene of that night: not plain sleep)
  if (hourNow() < 20) { anaSays(dicho('dormir_sin_sueno')); return; }
  // (from the second night: her clothes, folded on the chair, or thrown on the floor; the player decides)
  if (game.wm && dlgHechos().desayuno_prueba && !game.wm.camison && !ANA_AUTO && !navigator.webdriver) return say('Ana', 'Antes de meterse en la cama…', [
    ['🧺 Doblar la ropa en la silla y acostarse', () => { close(); ropaAlAcostarse(true); goSleep(false); }],
    ['Dejarla tirada y meterse a la cama', () => { close(); ropaAlAcostarse(false); goSleep(false); }]]);
  goSleep(false);
}
// (a scene with Ana under way, the first night's above all: she does not fall asleep in the middle of it; it ends, and
// then she sleeps, if the scene says so)
const enEscena = () => TALKS.some(t => t.lines.slice(Math.max(0, t.i)).some(l => l.q === 'ana' || l.q === 'narra' || l.q === '?' || l.q === '!'));
function goSleep(forced, skip, porEscena){
  if (sleeping || (!forced && !porEscena && enEscena())) return; sleeping = true; close(); ana.goto = null; ana.sit = false;
  if (game.wm) { game.wm.camison = true; game.wm.sinSombrero = true; }   // (to bed in her nightgown, the hat put away: she wakes so, and dresses when she will)
  if (game.wm?.ropaTirada && !dlgHechos().desayuno_prueba) { game.wm.ropaTirada = false; game.wm.ropaSilla = true; dlgHecho('marilla_doblo_ropa'); }   // (the first night, Marilla folds them while she sleeps: in the morning, on the chair)
  const el = $('sleep'); el.textContent = forced ? 'Ana se quedó dormida…' : skip ? 'Pasa la noche…' : 'Zzz…'; el.classList.add('on');
  setTimeout(() => {
    goIn('ga', [GA.bed.x - 20, GA.bed.y + 16]); ana.dir = 0; bubbles = [];
    dayT = Math.floor(dayT) + 1; sleepyStage = 0; game.anaStates = {};   // (Marilla mended the dress overnight)
    const grew = crecerDeNoche();
    for (const b of bushes) if (!b.berries) b.berries = 3;
    for (const t of trees) if (t.kind === 'apple' && !t.apples) t.apples = 3;
    logEv(forced ? 'Ana se quedó dormida y la llevaron a su cama.' : 'Ana durmió toda la noche en su cuarto del alero este.', []);
    el.textContent = '☀ Buenos días, Avonlea'; save(); newDay();
    setTimeout(() => { el.classList.remove('on'); sleeping = false; if (grew) notice('🌱 Algo creció en la huerta durante la noche.'); }, 1400);
  }, 1500);
}
