// La cobertura de la historia, preguntándole al juego (no leyendo el texto): qué falta.
//  1. Sondas de situación: el juego puesto en cada combinación de momento de la historia × lugar × cómo anda Ana
//     (normal, en camisón, sin sombrero, de noche) × quién está ahí; para cada una, el motor dice qué escenas podrían
//     pasar ahora, cuáles reaccionan a cómo anda Ana, qué frases diría esa persona y si se presentaría. Una situación
//     en que nadie reacciona, o alguien no tiene nada que decir, es un hueco.
//  2. Exploración (--dias N, por defecto 8): una jugadora automática juega N días desde el día 4 (va a lugares, habla
//     con la gente, hace lo que Ana puede hacer, elige al azar en las escenas, se acuesta de noche) y se anota qué
//     escenas alcanzó: las que nunca pasan, y por qué (lo que les falta, según el motor), son la cobertura que falta.
//     De paso, cualquier error del juego queda anotado.
// Deja trazas/cobertura.json (lo lee tools/planilla.py: hojas «Cobertura» y «Situaciones»; y trazas/cobertura.md).
// Uso: node tools/build.js && NODE_PATH=… node tools/cobertura.js [--dias N] [--sin-exploracion]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const { MOMENTOS, PREPARAR } = require('./momentos');
const RAIZ = path.join(__dirname, '..'), URL = 'file://' + path.join(RAIZ, 'index.html') + '?dev';
const EXE = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
const arg = (n, d) => { const i = process.argv.indexOf(n); return i < 0 ? d : process.argv[i + 1]; };
const DIAS = +arg('--dias', 8), EXPLORAR = !process.argv.includes('--sin-exploracion');
// los lugares, y quién puede estar en cada uno (además de los que viven ahí)
const LUGARES = {
  gg: { nombre: 'Tejas Verdes', testigos: ['marilla', 'matthew', 'lynde', 'diana'] },
  os: { nombre: 'La Cuesta del Huerto', testigos: ['barry', 'diana', 'minnie', 'srbarry', 'maryjoe'] },
  rl: { nombre: 'la Hondonada (Sra. Lynde)', testigos: ['lynde', 'thomas'] },
  hh: { nombre: 'la casa del Sr. Harrison', testigos: ['harrison'] },
  tl: { nombre: 'la tienda de Lawson', testigos: ['lawson', 'srapye'] },
  es: { nombre: 'la escuela', testigos: ['phillips', 'stacy', 'gilbert', 'josie', 'ruby', 'jane'] },
  ig: { nombre: 'la iglesia', testigos: ['allan', 'sraallan', 'srbell', 'lynde', 'srapye'] },
  cp: { nombre: 'la casa parroquial', testigos: ['allan', 'sraallan'] },
  out: { nombre: 'la aldea (afuera)', testigos: ['lynde', 'barry', 'harrison', 'diana', 'gilbert', 'josie', 'srapye', 'lawson', 'vecino'] },
};
const ESTADOS = ['normal', 'camison', 'sin_sombrero', 'noche'];

(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
  const abrir = async () => { const pg = await b.newPage(), errs = []; pg.on('pageerror', e => errs.push(e.message)); await pg.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false })); await pg.goto(URL); await pg.waitForTimeout(1500);
    return { pg, errs, ev: (s, a) => pg.evaluate(([s, a]) => { const v = window.__avonlea.ev(s); return typeof v === 'function' ? v(a) : v; }, [s, a]) }; };

  // ---------- 1. las sondas
  const { pg, errs, ev } = await abrir();
  const sondas = [];
  for (const M of MOMENTOS) {
    for (const [lugar, L] of Object.entries(LUGARES)) for (const est of ESTADOS) {
      const r = await ev(`(([M, lugar, testigos, est]) => {
        const H = (${PREPARAR})(M);
        for (const t of [...TALKS]) { t.interrupted = true; talkEnd(t); } bubbles = [];
        const D = dlgDichas(); for (const k of Object.keys(D)) delete D[k];   // (every scene, as if not said yet)
        if (est === 'noche') dayT = Math.floor(dayT) + (22 - 6) / 24; else dayT = Math.floor(dayT) + (11 - 6) / 24;
        game.wm.camison = est === 'camison'; game.wm.sinSombrero = est === 'sin_sombrero';
        // Ana, there
        if (lugar === 'out') { if (game.scene !== 'out') { let g = 0; while (game.scene !== 'out' && g++ < 4) goOut(); } ana.x = PLAY.aldea[0]; ana.y = PLAY.aldea[1]; }
        else goIn(lugar);
        ana.goto = null; ana.nav = null; ana.hidden = false;
        const out = [];
        for (const k of testigos) {
          const f = k === 'vecino' ? FOLK.find(f => /^v\\d+$/.test(f.id) && !f.kid) : FOLKBY[k], p = PEOPLE[k], body = p || f; if (!body) continue;
          const id = f ? f.id : k;
          if (ausente(id)) { out.push({ k, fuera: true }); continue; }
          // everyone else, far; this one, beside her
          const antes = { where: body.where, x: body.x, y: body.y };
          body.where = game.scene; body.x = ana.x + 46; body.y = ana.y + 4; if (p) { p.nav = null; p.dest = null; p.moving = false; }
          const x = dlgCtx();
          const relevantes = DIALOGOS.filter(d => !['objeto', 'menu'].includes(d.disparo || '') && !d.dicha() && dlgCumple(d, x) && (() => { try { return d.hablan().includes(id) || [].concat(d.si || []).some(c => c === 've:' + id) || Object.keys(d.en || {}).includes(id) || (d.quienes || []).includes(id); } catch (e) { return false; } })());
          const delEstado = d => [].concat(d.si || []).some(c => est === 'noche' ? /^hora:/.test(c) && +c.split(':')[1].split('-')[0] >= 20 : c === 'ana:' + est);
          const L = (p ? CH[k].lines : f.def.lines) || [];
          out.push({ k: id, escenas: relevantes.map(d => d.id), delEstado: relevantes.filter(delEstado).map(d => d.id), frases: lineasDe(id, L).length, presenta: !conoceA(id) && !sinNombre(id) });
          Object.assign(body, antes);
        }
        // and Ana herself: does she say something about it, there? (her remarks, her own scenes)
        const x = dlgCtx(), propias = est === 'normal' ? [] : DIALOGOS.filter(d => !d.dicha() && (d.canal === 'comentario' || d.canal === 'ana_sola') && [].concat(d.si || []).some(c => est === 'noche' ? /^hora:/.test(c) : c === 'ana:' + est) && dlgCumple(d, x)).map(d => d.id);
        return { testigos: out, ana: propias };
      })`, [M, lugar, L.testigos, est]);
      for (const t of r.testigos) sondas.push({ momento: M.id, lugar, estado: est, ...t });
      sondas.push({ momento: M.id, lugar, estado: est, k: 'ana', anaComenta: r.ana });
    }
  }
  const total = DIALOGOS_N = await ev('DIALOGOS.length');
  const errSondas = [...errs]; await pg.close();
  console.log(`sondas: ${sondas.length} (${MOMENTOS.length} momentos × ${Object.keys(LUGARES).length} lugares × ${ESTADOS.length} estados × quienes están)`);

  // ---------- 2. la exploración: una jugadora automática, N días
  let exploracion = null;
  if (EXPLORAR) {
    const J = await abrir();
    await J.ev(`(M => { (${PREPARAR})(M); for (const t of [...TALKS]) { t.interrupted = true; talkEnd(t); } for (const d of ['inicio_llegada', 'primera_bed', 'desayuno_prueba', 'lynde_se_entera', 'viaje_spencer', 'se_queda']) dlgDichas()[d] = true;
      dayT = 3 + (7 - 6) / 24; goIn('ga'); game.wm.camison = true; game.wm.sinSombrero = true;
      window.__expl = { lugares: {}, gente: {}, acciones: {}, porDia: [], espera: 0 }; })`, MOMENTOS.find(m => m.id === 'dia4'));
    const PASO = `(() => {
      const E = window.__expl, rnd = a => a[Math.floor(Math.random() * a.length)];
      // a card: go on; a choice: one at random
      for (const t of TALKS) if (t.narra) t.narra.seguir();
      const bs = [...document.querySelectorAll('#talk:not([hidden]) button')]; if (bs.length) { rnd(bs).click(); return 'elige'; }
      if (sleeping) return 'duerme';
      const h = hourNow() % 24 + (hourNow() >= 24 ? 24 : 0);
      if (hourNow() >= 21.5) { if (typeof goToBed === 'function') goToBed(); return 'a la cama'; }
      if (activeGoals(AGENTS.ana).length && E.espera++ < 10) return 'meta en curso';   // (pursuing a goal of her notebook: let her)
      const ocupada_ = ana.goto || ana.nav || game.talk || TALKS.some(t => t.lines.slice(t.i).some(l => l.q === 'ana' || l.q === '?'));
      if (ocupada_ && E.espera++ < 4) return 'ocupada';   // (on her way, or in a scene: a little while; then something else)
      E.espera = 0; if (game.talk) close();
      // something new, preferably where she has been least
      const r = Math.random();
      if (r < .4) {   // a goal of her notebook, still open (the one tried least), pursued with the planner, as a player who wants to get on
        const M = CUADERNO_METAS.filter(m => !m.oculta && !cuadernoHecho(m.id) && cuadernoAbierta(m) && (() => { try { return Array.isArray(m.goal().people); } catch (e) { return false; } })()).sort((a, b) => (E.metas?.[a.id] || 0) - (E.metas?.[b.id] || 0) + Math.random() * .5);
        if (M.length) { const m = M[0]; (E.metas ||= {})[m.id] = (E.metas[m.id] || 0) + 1; try { agentStart('ana', m.goal(), { label: m.titulo }); return 'meta: ' + m.id; } catch (e) {} }
      }
      if (r < .6) {   // go somewhere
        const sitios = [...Object.entries(HOUSES).filter(([, h]) => !h.road).map(([k, h]) => [k, h.at.x, h.at.y + 40]), ...Object.entries(PLACES).map(([k, p]) => [k, p[1], p[2]])];
        sitios.sort((a, b) => (E.lugares[a[0]] || 0) - (E.lugares[b[0]] || 0) + Math.random() - .5);
        const [k, x, y] = sitios[0]; E.lugares[k] = (E.lugares[k] || 0) + 1; goDest(x, y); return 'va a ' + k;
      }
      if (r < .8) {   // talk to someone here
        const T = targets().filter(t => /^[pf]:/.test(t.id)); if (T.length) { T.sort((a, b) => (E.gente[a.id] || 0) - (E.gente[b.id] || 0)); const t = T[0]; E.gente[t.id] = (E.gente[t.id] || 0) + 1; t.act(); return 'habla con ' + t.id; }
      }
      const A = jugables(); if (A.length) { const a = rnd(A); const n = stepText(a); E.acciones[n] = (E.acciones[n] || 0) + 1; try { jugar(a); } catch (e) {} return 'hace: ' + n; }
      return 'nada';
    })()`;
    const t0 = Date.now(); let dia0 = await J.ev('today()'), log = [];
    while (await J.ev('today()') < dia0 + DIAS) {
      const que = await J.ev(PASO); log.push(que);
      if (que === 'duerme' || que === 'a la cama') { await J.pg.waitForTimeout(3300); }
      await J.ev(`(() => { for (let k = 0; k < 15 * 60 * 3; k++) { if (sleeping) break; update(1 / 15); if (document.querySelector('#talk:not([hidden]) button') || TALKS.some(t => t.narra)) break; } })()`);   // (about 15 minutes of the game, or until something asks for the player)
      const d = await J.ev('today()'); if (d !== dia0 + (exploracion?.dias || 0) && log.length % 40 === 0) process.stdout.write('.');
    }
    exploracion = await J.ev(`(() => { const x = dlgCtx(), D = dlgDichas();
      return { dias: ${DIAS}, alcanzadas: Object.keys(D).filter(k => DIALOGOS.some(d => d.id === k)),
        nunca: DIALOGOS.filter(d => !(d.id in D)).map(d => ({ id: d.id, canal: d.canal, disparo: d.disparo || '', porque: (() => { try { return d.porque(x) || 'podía pasar (no tocó)'; } catch (e) { return String(e.message); } })() })),
        lugares: window.__expl.lugares, metas: window.__expl.metas || {}, cumplidas: CUADERNO_METAS.filter(m => cuadernoHecho(m.id)).map(m => m.id), gente: window.__expl.gente, acciones: window.__expl.acciones,
        conoce: Object.keys(dlgHechos()).filter(h => h.startsWith('conoce_')).map(h => h.slice(7)), hechos: Object.keys(dlgHechos()),
        noticias: NOTICIAS.map(n => ({ id: n.id, saben: Object.keys(game.wm.know || {}).filter(k => (game.wm.know[k] || []).includes(n.id)).length })),
        diario: (game.journal || []).length }; })()`);
    exploracion.acciones_jugadora = log.reduce((o, a) => { const k = a.split(' ')[0]; o[k] = (o[k] || 0) + 1; return o; }, {});
    exploracion.segundos = Math.round((Date.now() - t0) / 1000); exploracion.errores = J.errs;
    console.log(`\nexploración: ${DIAS} días en ${exploracion.segundos} s · escenas alcanzadas: ${exploracion.alcanzadas.length} de ${total} · errores del juego: ${J.errs.length}`);
  }
  await b.close();
  const out = { generado: new Date().toISOString().slice(0, 16).replace('T', ' '), momentos: MOMENTOS.map(m => ({ id: m.id, titulo: m.titulo })), lugares: LUGARES, estados: ESTADOS, sondas, escenas_total: total, exploracion, errores: errSondas };
  fs.writeFileSync(path.join(RAIZ, 'trazas/cobertura.json'), JSON.stringify(out, null, 1));
  console.log('→ trazas/cobertura.json (la planilla y trazas/cobertura.md: node tools/planilla.js)');
})();
var DIALOGOS_N;
