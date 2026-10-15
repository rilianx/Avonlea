/* ---------- sleep: Ana gets sleepy at night, and goes to bed (the day starts again at dawn) ---------- */
let sleeping = false, sleepyStage = 0;
function goToBed(){
  if (hourNow() < 20) { anaSays('Todavía no tengo sueño... ¡hay tanto que imaginar antes de dormir!'); return; }
  goSleep(false);
}
function goSleep(forced, skip){
  if (sleeping) return; sleeping = true; close(); ana.goto = null; ana.sit = false;
  if (game.wm) { game.wm.camison = true; game.wm.sinSombrero = true; }   // (to bed in her nightgown, the hat put away: she wakes so, and dresses when she will)
  const el = $('sleep'); el.textContent = forced ? 'Ana se quedó dormida…' : skip ? 'Pasa la noche…' : 'Zzz…'; el.classList.add('on');
  setTimeout(() => {
    goIn('ga', [GA.bed.x - 20, GA.bed.y + 16]); ana.dir = 0; bubbles = [];
    const ended = today() + 1; dayT = Math.floor(dayT) + 1; sleepyStage = 0; game.anaStates = {};   // (Marilla mended the dress overnight)
    const grew = BEDS.filter(b => b.wet && b.stage < 3).length;
    for (const b of BEDS) if (b.wet) { b.wet = 0; b.grow = 0; b.stage = Math.min(3, b.stage + 1); }
    for (const b of bushes) if (!b.berries) b.berries = 3;
    for (const t of trees) if (t.kind === 'apple' && !t.apples) t.apples = 3;
    logEv(forced ? 'Ana se quedó dormida y la llevaron a su cama.' : 'Ana durmió toda la noche en su cuarto del alero este.', []);
    el.textContent = '☀ Buenos días, Avonlea'; save(); newDay(ended);
    setTimeout(() => { el.classList.remove('on'); sleeping = false; if (grew) notice('🌱 La huerta creció mientras dormías.'); }, 1400);
  }, 1500);
}
