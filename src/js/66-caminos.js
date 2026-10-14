/* ---------- Ana's paths: what is won little by little, according to what she gives her days to (docs/LARGO_PLAZO.md) ----------
   Written apart (src/datos/caminos.txt): each path is one number (game.wm.caminos[id]) that goes up with what Ana does,
   a little each day; at each milestone something happens: someone tells her, the next time she meets them (with the AI,
   a scene of its own; without it, the written line), and the script may have scenes for it (camino:id:n). The study is
   one of them: the Queen's examination comes from it (the scenes examen_* of the script). */
function caminosLeer(txt){
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
const CAMINOS = caminosLeer(document.getElementById('caminos')?.textContent || '');
const camino = id => game.wm?.caminos?.[id] || 0;
const estudio = () => camino('estudio');
// (a game from before the paths: its days of study)
if (game.wm && game.wm.estudio != null) { (game.wm.caminos ||= {}).estudio = game.wm.estudio; delete game.wm.estudio; }
// the next milestone of a path (or none: all of them reached)
const caminoProximo = c => c.hitos.find(h => h.n > camino(c.id));
// days until the next first day of summer (the examination)
function diasExamen(){ const d = today(), y = DIAS_ESTACION * 4, s = ((1 - (game.seasonShift || 0)) % 4 + 4) % 4 * DIAS_ESTACION, n = Math.floor((d - s) / y) * y + s; return (n >= d ? n : n + y) - d; }
// one more on a path (at most so much a day); a milestone crossed: told, and kept for whoever is to tell her
function caminoSube(c, por){
  const W = game.wm, D = W.caminosHoy;
  if ((D.n[c.id] || 0) >= c.por_dia) return;
  D.n[c.id] = (D.n[c.id] || 0) + 1; (W.caminos ||= {})[c.id] = camino(c.id) + 1;
  logEv('Ana avanzó en ' + c.titulo.replace(/^(El|La|Las|Los) /, m => m.toLowerCase()) + ' (' + por + ').', []);
  for (const h of c.hitos) if (h.n === camino(c.id)) { notice('📈 ' + c.titulo + ': ' + h.texto); logEv('📈 ' + c.titulo + ': ' + h.texto, []); if (h.con) (W.hitosPend ||= []).push({ c: c.id, n: h.n }); }
}
// a while doing each thing (or an hour of class) is one more, once a day each: watched every five seconds
let caminosT = 0;
function caminosTick(dt){
  if ((caminosT -= dt) > 0 || !game.wm) return; caminosT = 5;
  const D = game.wm.caminosHoy?.d === today() ? game.wm.caminosHoy : (game.wm.caminosHoy = { d: today(), t: {}, dado: {}, n: {} });
  const h = hourNow(), A = (AGENTS.ana || game.playAct)?.acting;
  const haciendo = [A?.v, hayClases() && h >= 9 && h < 15.5 && wmScene('ana') === 'es' ? 'clase' : null].filter(Boolean);
  for (const v of haciendo) {
    D.t[v] = (D.t[v] || 0) + 5; if (D.dado[v] || D.t[v] < M(v === 'clase' ? 60 : 5)) continue;
    D.dado[v] = true;
    for (const c of CAMINOS) if (c.suma.includes(v)) { let t = v.replace(/_/g, ' '); try { t = stepText(A.task?.a?.v === v ? A.task.a : A); } catch (e) {} caminoSube(c, v === 'clase' ? 'un día de clases' : t); }
  }
  hitosTick();
}
// a milestone, told by whoever it is: the next time Ana is near them and nothing else is being said
function hitosTick(){
  const P = game.wm.hitosPend; if (!P?.length || hablando() || amb.cur || enc.cur || game.talk || ocupada('ana') || TALKS.length) return;
  for (const p of P) {
    const c = CAMINOS.find(x => x.id === p.c), h = c?.hitos.find(x => x.n === p.n); if (!h) { P.splice(P.indexOf(p), 1); return; }
    const b = wmBody(h.con); if (!b || wmScene(h.con) !== game.scene || dist(ana.x, ana.y, b.x, b.y) > 90 || ocupada(h.con)) continue;
    P.splice(P.indexOf(p), 1); dlgHecho('hito_' + c.id + '_' + h.n);   // (told: a fact, for the script and the tests)
    const escrito = () => talkPlay((h.dice || h.texto).split(' / ').map(t => [h.con, t]), { ch: 'hito', hold: [h.con] });
    if (!aiReady() || !h.ia) return escrito();
    sceneAsk([h.con], h.ia + ' (Que se note que viene de lo que Ana hizo, día a día.)', 'pasar').then(s => s.lines.length ? talkPlay(s.lines.map(l => [l.q, l.t]), { ch: 'hito', hold: [h.con] }) : escrito()).catch(escrito);
    return;
  }
}
