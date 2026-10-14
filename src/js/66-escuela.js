/* ---------- what is won little by little: school and study (docs/LARGO_PLAZO.md) ----------
   As simple as can be: one number, game.wm.estudio. A day of class at the school (an hour inside, on a day with school)
   is one more; a day she studies the lesson (twenty minutes) is one more. The Queen's examination is on the first day of
   each summer; who goes, and how it goes, comes from that number (the scenes examen_* of the script; the notebook says
   how much she has studied and how many days are left). */
const ESTUDIO_EXAMEN = 10, ESTUDIO_ENTRA = 30, ESTUDIO_PRIMERA = 60;   // (to be sent to it; to get in; first, with Gilbert)
const estudio = () => game.wm?.estudio || 0;
// days until the next first day of summer (the examination)
function diasExamen(){ const d = today(), y = DIAS_ESTACION * 4, s = ((1 - game.seasonShift) % 4 + 4) % 4 * DIAS_ESTACION, n = Math.floor((d - s) / y) * y + s; return (n >= d ? n : n + y) - d; }
let estudioT = 0;
function estudioTick(dt){
  if ((estudioT -= dt) > 0 || !game.wm) return; estudioT = 5;
  const E = game.wm.estudioHoy?.d === today() ? game.wm.estudioHoy : (game.wm.estudioHoy = { d: today(), clase: 0, casa: 0, dado: {} });
  const sube = (k, min, txt) => { if (!E.dado[k] && E[k] >= M(min)) { E.dado[k] = true; game.wm.estudio = estudio() + 1; logEv(txt, []); } };
  const h = hourNow();
  if (hayClases() && h >= 9 && h < 15.5 && wmScene('ana') === 'es') { E.clase += 5; sube('clase', 60, 'Ana pasó el día en clases.'); }
  const A = (AGENTS.ana || game.playAct)?.acting; if (A?.v === 'estudiar') { E.casa += 5; sube('casa', 20, 'Ana estudió la lección.'); }
}
