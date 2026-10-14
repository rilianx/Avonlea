/* ---------- the skills: qualities that grow little by little with what each one does (docs/MOTOR.md) ----------
   Written apart (src/datos/habilidades.txt): each skill is a quality (a number with an owner: «granja» of Ana,
   «estudio» of Gilbert) that goes up with the actions of whoever does them, a little each day. Ana's milestones
   (hitos) are storylets on a quality: when she gets to one, someone tells her the next time she meets them (with the
   AI, a scene of its own; without it, the written line), and the fact hito_<skill>_<n> stays for the script; the
   script may also ask for a level («si: granja:ana>=15»). The Queen's examination comes from «estudio» (examen_*). */
function habilidadesLeer(txt){
  const out = []; let c = null, h = null;
  for (const raw of txt.split('\n')) {
    const l = raw.trim(); if (!l || l[0] === '#') continue;
    let m;
    if ((m = l.match(/^===\s*(.+?)\s*===$/))) { out.push(c = { id: m[1], titulo: m[1], suma: [], por_dia: 2, hitos: [] }); h = null; continue; }
    if (!c) continue;
    if ((m = l.match(/^hito (\d+):\s*(.*)$/))) c.hitos.push(h = { n: +m[1], texto: m[2] });
    else if (h && /^\s/.test(raw) && (m = l.match(/^(con|dice|ia):\s*(.*)$/))) h[m[1]] = m[2];
    else if ((m = l.match(/^(titulo|suma|por_dia):\s*(.*)$/))) { c[m[1]] = m[1] === 'suma' ? m[2].split(',').map(x => x.trim()).filter(Boolean) : m[1] === 'por_dia' ? +m[2] : m[2]; h = null; }
  }
  for (const x of out) x.hitos.sort((a, b) => a.n - b.n);
  return out;
}
const HABILIDADES = habilidadesLeer(document.getElementById('habilidades')?.textContent || '');
const estudio = (k = 'ana') => cualidad(k, 'estudio');
// (a game from before: Ana's paths, or her days of study, become her qualities)
if (game.wm) {
  const N = ((game.wm.num ||= {}).ana ||= {});
  if (game.wm.estudio != null) { N.estudio = (N.estudio || 0) + game.wm.estudio; delete game.wm.estudio; }
  if (game.wm.caminos) { for (const [k, v] of Object.entries(game.wm.caminos)) N[k] = Math.max(N[k] || 0, v); delete game.wm.caminos; }
  delete game.wm.caminosHoy;
}
// Ana's next milestone on a skill (or none: all of them reached)
const habilidadProxima = c => c.hitos.find(h => h.n > cualidad('ana', c.id));
// days until the next first day of summer (the examination)
function diasExamen(){ const d = today(), y = DIAS_ESTACION * 4, s = ((1 - (game.seasonShift || 0)) % 4 + 4) % 4 * DIAS_ESTACION, n = Math.floor((d - s) / y) * y + s; return (n >= d ? n : n + y) - d; }
// one more on a skill, for whoever did it (at most so much a day); Ana's milestones: told, and kept for whoever is to tell her
function habilidadSube(k, c, D, por){
  const n = (D.n[k] ||= {}); if ((n[c.id] || 0) >= c.por_dia) return;
  n[c.id] = (n[c.id] || 0) + 1; cualidadSuma(k, c.id, 1);
  logEv(wmName(k) + ' avanzó en ' + c.titulo.replace(/^(El|La|Las|Los) /, m => m.toLowerCase()) + ' (' + por + ').', []);
  if (k === 'ana') for (const h of c.hitos) if (h.n === cualidad('ana', c.id)) { notice('📈 ' + c.titulo + ': ' + h.texto); logEv('📈 ' + c.titulo + ': ' + h.texto, []); if (h.con) (game.wm.hitosPend ||= []).push({ c: c.id, n: h.n }); }
}
// a while doing each thing (or, Ana, an hour of class) is one more, once a day each: watched every five seconds, for everyone
let habilidadesT = 0;
function habilidadesTick(dt){
  if ((habilidadesT -= dt) > 0 || !game.wm) return; habilidadesT = 5;
  const D = game.wm.habilidadesHoy?.d === today() ? game.wm.habilidadesHoy : (game.wm.habilidadesHoy = { d: today(), t: {}, dado: {}, n: {} });
  const h = hourNow();
  for (const k of new Set(['ana', ...Object.keys(AGENTS)])) {
    const A = (AGENTS[k] || (k === 'ana' ? game.playAct : null))?.acting;
    const haciendo = [A?.v, k === 'ana' && hayClases() && h >= 9 && h < 15.5 && wmScene('ana') === 'es' ? 'clase' : null].filter(Boolean);
    for (const v of haciendo) {
      const key = k + ':' + v; D.t[key] = (D.t[key] || 0) + 5; if (D.dado[key] || D.t[key] < M(v === 'clase' ? 60 : 5)) continue;
      D.dado[key] = true;
      for (const c of HABILIDADES) if (c.suma.includes(v)) { let t = v.replace(/_/g, ' '); try { t = stepText(A.task?.a?.v === v ? A.task.a : A); } catch (e) {} habilidadSube(k, c, D, v === 'clase' ? 'un día de clases' : t); }
    }
  }
  hitosTick();
}
// a milestone, told by whoever it is: the next time Ana is near them and nothing else is being said
function hitosTick(){
  const P = game.wm.hitosPend; if (!P?.length || hablando() || amb.cur || enc.cur || game.talk || ocupada('ana') || TALKS.length) return;
  for (const p of P) {
    const c = HABILIDADES.find(x => x.id === p.c), h = c?.hitos.find(x => x.n === p.n); if (!h) { P.splice(P.indexOf(p), 1); return; }
    const b = wmBody(h.con); if (!b || wmScene(h.con) !== game.scene || dist(ana.x, ana.y, b.x, b.y) > 90 || ocupada(h.con)) continue;
    P.splice(P.indexOf(p), 1); dlgHecho('hito_' + c.id + '_' + h.n);   // (told: a fact, for the script and the tests)
    const escrito = () => talkPlay((h.dice || h.texto).split(' / ').map(t => [h.con, t]), { ch: 'hito', hold: [h.con] });
    if (!aiReady() || !h.ia) return escrito();
    sceneAsk([h.con], h.ia + ' (Que se note que viene de lo que Ana hizo, día a día.)', 'pasar').then(s => s.lines.length ? talkPlay(s.lines.map(l => [l.q, l.t]), { ch: 'hito', hold: [h.con] }) : escrito()).catch(escrito);
    return;
  }
}
