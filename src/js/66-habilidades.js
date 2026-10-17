/* ---------- the qualities: numbers with an owner that change little by little (docs/MOTOR.md) ----------
   Written apart (src/datos/habilidades.txt). Most are Ana's skills («granja», «estudio»), or anyone's (Gilbert's
   «estudio»), which go up with the actions of whoever does them, a little each day. Others are of someone towards
   someone else («paciencia» of Marilla towards Ana), go up with what another one does (Ana's chores) and down with
   what the script says («! suma paciencia:marilla:ana -1»). Each may say where it starts and its range. Milestones,
   up (hito) and down (bajo), are storylets on a quality: whoever is to tell it says so the next time Ana meets them
   (with the AI, a scene of its own; without it, the written line), and the fact hito_<q>_<n> or bajo_<q>_<n> stays
   for the script, which may also ask for a level («si: granja:ana>=15», «paciencia:marilla:ana<=1»). */
function habilidadesLeer(txt){
  const out = []; let c = null, h = null;
  for (const raw of txt.split('\n')) {
    const l = raw.trim(); if (!l || l[0] === '#') continue;
    let m;
    if ((m = l.match(/^===\s*(.+?)\s*===$/))) { out.push(c = { id: m[1], titulo: m[1], suma: [], por_dia: 2, hitos: [], bajos: [] }); h = null; continue; }
    if (!c) continue;
    if ((m = l.match(/^(hito|bajo) (\d+):\s*(.*)$/))) (m[1] === 'hito' ? c.hitos : c.bajos).push(h = { n: +m[2], texto: m[3], dir: m[1] });
    else if (h && /^\s/.test(raw) && (m = l.match(/^(con|dice|ia):\s*(.*)$/))) h[m[1]] = m[2];
    else if ((m = l.match(/^(rinde|falla):\s*(.*)$/))) { c[m[1]] = m[2].split(',').map(x => x.trim().split(':').map(Number)).filter(x => x.length === 2); h = null; }
    else if ((m = l.match(/^mal:\s*(.*)$/))) { c.mal = m[1].split('|').map(x => x.trim()).filter(Boolean); h = null; }
    else if ((m = l.match(/^(titulo|suma|por_dia|de|hacia|por|inicial|rango|visible si|oficio):\s*(.*)$/))) {
      const [, k, v] = m; h = null;
      if (k === 'suma') c.suma = v.split(',').map(x => x.trim()).filter(Boolean);
      else if (k === 'por_dia' || k === 'inicial') c[k] = +v;
      else if (k === 'rango') c.rango = v.split('-').map(Number);
      else if (k === 'visible si') c.visible = v.split(',').map(x => x.trim()).filter(Boolean);
      else c[k] = v;
    }
  }
  for (const x of out) { x.hitos.sort((a, b) => a.n - b.n); x.bajos.sort((a, b) => b.n - a.n); CUALIDAD_DEF[x.id] = x; }
  return out;
}
const HABILIDADES = habilidadesLeer(document.getElementById('habilidades')?.textContent || '');
// a craft («oficio:»): how it turns out for Ana, by the days she has practiced it: how much it gives, and whether it goes
// wrong this time (and how: «mal:»). For anyone else, as always
const OFICIOS_DIESTRA = (() => { try { return localStorage.getItem('avonlea-oficios') === 'diestra'; } catch (e) { return false; } })();   // (the tests of chains of the book: Ana already knows how; they test the chain, not the learning)
function oficio(k, accion){
  const c = k === 'ana' && HABILIDADES.find(c => c.oficio === accion); if (!c) return { rinde: null, sale: true };
  const v = OFICIOS_DIESTRA ? 99 : cualidad('ana', c.id), segun = L => { let r = null; for (const [n, x] of L || []) if (v >= n) r = x; return r; };
  const sale = Math.random() >= (segun(c.falla) ?? 0);
  return { c, nivel: v, rinde: segun(c.rinde), sale, mal: sale ? null : pick(c.mal || ['No le salió bien esta vez.']) };
}
// a day of practice, for what is not watched as a doing (the stove): once a day, as the rest
function practicar(k, accion){
  if (!game.wm) return; const D = game.wm.habilidadesHoy?.d === today() && game.wm.habilidadesHoy.v === 2 ? game.wm.habilidadesHoy : (game.wm.habilidadesHoy = { v: 2, d: today(), t: {}, dado: {}, n: {} });
  const key = k + ':' + accion; if (D.dado[key]) return; D.dado[key] = true;
  for (const c of HABILIDADES) if (c.suma.includes(accion) && (!c.de || k === (c.por || 'ana')) && (!c.visible || c.visible.every(x => dlgCond(x)))) habilidadSube(k, c, D, accion.replace(/_/g, ' '));
}
const estudio = (k = 'ana') => cualidad(k, 'estudio');
// (a game from before: Ana's paths, or her days of study, become her qualities)
if (game.wm) {
  const N = ((game.wm.num ||= {}).ana ||= {});
  if (game.wm.estudio != null) { N.estudio = (N.estudio || 0) + game.wm.estudio; delete game.wm.estudio; }
  if (game.wm.caminos) { for (const [k, v] of Object.entries(game.wm.caminos)) N[k] = Math.max(N[k] || 0, v); delete game.wm.caminos; }
  delete game.wm.caminosHoy;
}
// whose a quality is, as the notebook shows it: Ana's own (her skills), or someone's towards her (how they see her)
const deAna = c => !c.de || c.de === 'ana';
// Ana's next milestone on a skill (or none: all of them reached)
const habilidadProxima = c => c.hitos.find(h => h.n > cualidad('ana', c.id));
// a milestone crossed (from cualidadSuma, whatever made it change): only of what concerns Ana. Up, «hito N» when it
// gets to N; down, «bajo N» when it falls to N. Told (a notice, and whoever is to say it, the next time she meets them)
function cualidadHitos(c, dueño, hacia, antes, v){
  if (dueño !== 'ana' && hacia !== 'ana') return;
  if (!deAna(c) && !navigator.webdriver) notice((v > antes ? '🌱 ' : '🍂 ') + c.titulo + ': ' + v + '/' + (c.rango?.[1] ?? '?'));
  const pasa = [...c.hitos.filter(h => antes < h.n && v >= h.n), ...c.bajos.filter(h => antes > h.n && v <= h.n)];
  pasa.forEach((h, i) => {   // (several at once: all are kept as facts, but only the farthest is told)
    const t = (h.dir === 'hito' ? '📈 ' : '📉 ') + c.titulo + ': ' + h.texto; logEv(t, []); if (i === pasa.length - 1) notice(t);
    if (!h.con || i < pasa.length - 1) return dlgHecho(h.dir + '_' + c.id + '_' + h.n);
    const P = (game.wm.hitosPend ||= []); for (const q of P.filter(q => q.c === c.id)) { P.splice(P.indexOf(q), 1); dlgHecho((q.dir || 'hito') + '_' + q.c + '_' + q.n); }   // (one not yet told, of the same: the newest is what is said)
    P.push({ c: c.id, n: h.n, dir: h.dir });
  });
}
// days until the next examination: the first day of a summer, from the second year of the game (dia_juego:56)
const EXAMEN_DESDE = DIAS_ESTACION * 4;
function diasExamen(){ const d = today(), y = DIAS_ESTACION * 4, s = ((1 - (game.seasonShift || 0)) % 4 + 4) % 4 * DIAS_ESTACION; let n = Math.floor((d - s) / y) * y + s; if (n < d) n += y; while (n + 1 < EXAMEN_DESDE) n += y; return n - d; }
// one more on a quality, for whoever did it (or, if it is someone's towards another, for its owner: Marilla's patience,
// when Ana helps), at most so much a day
function habilidadSube(k, c, D, por){
  const dueño = c.de || k, key = dueño + ':' + c.id, n = D.n;
  if ((n[key] || 0) >= c.por_dia) return;
  n[key] = (n[key] || 0) + 1; cualidadSuma(dueño, c.id, 1, c.hacia);
  logEv(wmName(dueño) + (c.de ? ': ' + c.titulo.replace(/^(El|La|Las|Los) /, m => m.toLowerCase()) + ' sube (' + wmName(k) + ': ' + por + ').' : ' avanzó en ' + c.titulo.replace(/^(El|La|Las|Los) /, m => m.toLowerCase()) + ' (' + por + ').'), []);
}
// a while doing each thing (or, Ana, an hour of class) is one more, once a day each: watched every five seconds, for everyone
let habilidadesT = 0;
function habilidadesTick(dt){
  if ((habilidadesT -= dt) > 0 || !game.wm) return; habilidadesT = 5;
  const D = game.wm.habilidadesHoy?.d === today() && game.wm.habilidadesHoy.v === 2 ? game.wm.habilidadesHoy : (game.wm.habilidadesHoy = { v: 2, d: today(), t: {}, dado: {}, n: {} });
  const h = hourNow();
  for (const k of new Set(['ana', ...Object.keys(AGENTS)])) {
    const A = (AGENTS[k] || (k === 'ana' ? game.playAct : null))?.acting;
    const haciendo = [A?.v, k === 'ana' && hayClases() && h >= 9 && h < 15.5 && wmScene('ana') === 'es' ? 'clase' : null].filter(Boolean);
    for (const v of haciendo) {
      const key = k + ':' + v; D.t[key] = (D.t[key] || 0) + 5; if (D.dado[key] || D.t[key] < M(v === 'clase' ? 60 : 5)) continue;
      D.dado[key] = true;
      for (const c of HABILIDADES) if (c.suma.includes(v) && (!c.de || k === (c.por || 'ana')) && (!c.visible || c.visible.every(x => dlgCond(x)))) { let t = v.replace(/_/g, ' '); try { t = stepText(A.task?.a?.v === v ? A.task.a : A); } catch (e) {} habilidadSube(k, c, D, v === 'clase' ? 'un día de clases' : t); }
    }
  }
  hitosTick(); sumasPendientes();
}
// a milestone, told by whoever it is: the next time Ana is near them and nothing else is being said
function hitosTick(){
  const P = game.wm.hitosPend; if (!P?.length || hablando() || amb.cur || enc.cur || game.talk || TALKS.length) return;   // (even while Ana works: Marilla tells her so as she washes up)
  for (const p of P) {
    const c = HABILIDADES.find(x => x.id === p.c), h = c?.[p.dir === 'bajo' ? 'bajos' : 'hitos'].find(x => x.n === p.n); if (!h) { P.splice(P.indexOf(p), 1); return; }
    const b = wmBody(h.con); if (!b || wmScene(h.con) !== game.scene || dist(ana.x, ana.y, b.x, b.y) > (game.scene === 'out' ? 90 : 220) || ocupada(h.con)) continue;   // (near her; inside, in the same room)
    P.splice(P.indexOf(p), 1); dlgHecho((p.dir || 'hito') + '_' + c.id + '_' + h.n);
    if ((h.dice || h.texto).split(' / ').every(t => oidoHoy(h.con).has(t))) return;   // (already told her today: not again)   // (told: a fact, for the script and the tests)
    const escrito = () => talkPlay((h.dice || h.texto).split(' / ').map(t => [h.con, t]), { ch: 'hito', hold: [h.con] });
    if (!aiReady() || !h.ia) return escrito();
    sceneAsk([h.con], h.ia + ' (Que se note que viene de lo que Ana hizo, día a día.)', 'pasar').then(s => s.lines.length ? talkPlay(s.lines.map(l => [l.q, l.t]), { ch: 'hito', hold: [h.con] }) : escrito()).catch(escrito);
    return;
  }
}
