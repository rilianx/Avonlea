/* ---------- the player does what the planner can do: the same actions (verbs), offered where Ana is when she can do
   them (touch Ana), and done the same way (wmExec, with their things and what they leave written: the goals count
   them). Nothing is written twice: the menu asks the planner what is possible here. ---------- */
const JUGABLE_TIPOS = ['visitar', 'devuelto', 'amigas', 'paces', 'sano', 'club', 'felicitar', 'consolado', 'picnic', 'quehaceres', 'alimentados', 'recito', 'rezo', 'adornado', 'remo', 'nombres', 'carta', 'leido', 'concierto', 'sala', 'huerta', 'patinar', 'trineo', 'teñido', 'pelo_corto', 'desafio'];
const JUGABLE_NO = ['ir', 'tomar', 'recoger', 'dar', 'vender', 'cambiar', 'comprar', 'conversar', 'pedir', 'guiar', 'soltar', 'regañar', 'subir_calesa', 'interceder', 'cocinar', 'preparar', 'batir'];   // (these the player already has in her own way, or are not hers)
function jugables(){
  if (game.playAct || game.scene === 'camino') return [];
  const s = wmNow(); let here = s.pos.ana; if (!here) return [];
  if (game.scene === 'out' && (here === 'cocina' || here === 'pieza')) here = s.pos.ana = 'p:ana';   // (by the kitchen door is not in the kitchen: the chores, inside)
  for (const k of WM_PEOPLE()) { const o = wmBody(k); if (k !== 'ana' && o && wmScene(k) === game.scene && dist(o.x, o.y, ana.x, ana.y) < 110) s.pos[k] = here; }   // (whoever is beside her counts as here)
  const people = WM_PEOPLE().filter(k => k !== 'ana' && s.pos[k] === here), items = [...new Set([...Object.keys(THINGS), ...Object.keys(s.invs.ana || {})])];
  const C = { places: [], pts: {}, people, items, favors: [], owner: {}, k: 'ana', jugador: true }, out = [], seen = new Set();
  for (const kind of JUGABLE_TIPOS) for (const v of verbs(s, 'ana', { ...C, kind })) {
    if (JUGABLE_NO.includes(v.v)) continue;
    const key = v.v + ':' + (v.k || '') + ':' + (v.x || '') + ':' + (v.p || ''); if (seen.has(key)) continue; seen.add(key);
    const { eff, cost, ...a } = v; out.push(a);
  }
  return out;
}
function jugar(a){
  if (a.v === 'escribir_carta' && !a.para) return say('Ana', '¿A quién le escribo?', [...Object.entries(CORREO).map(([k, C]) => [cap(C.nombre) + (C.dias > 1 ? ' (' + C.donde + ')' : ''), () => jugar({ ...a, para: k })]), ['← Volver', anaMenu]]);
  close(); if (ana.goto) ana.goto = null; ana.sit = false;
  game.playAct = { who: 'ana', a, st: {}, task: { a }, t0: TT };
  game.playAct.task = game.playAct;   // (what accTick and accPush look at)
  logEv('Ana decidió ' + stepText(a) + '.', []);
}
let jugT = 0;
function jugarTick(dt){
  if (!game.playAct && (jugT -= dt) < 0) {   // (now and then: can she do something of the book here? a little sign)
    jugT = 1.5; const seen = game.jugVistos?.day === today() ? game.jugVistos : (game.jugVistos = { day: today(), k: [] });
    const here = personKey('ana') + ':' + S, J = here && !seen.k.includes(here) ? jugables() : [];
    if (J.length) { seen.k.push(here); notice('✨ Aquí Ana podría ' + J.slice(0, 2).map(stepText).join(' o ') + (J.length > 2 ? ', y más' : '') + ' (tócala)'); }   // (once a day for each place)
  }
  const P = game.playAct; if (!P) return;
  if (lastInput > P.t0 + .3 && TT - lastInput < .3 && ana.moving && !ana.goto?.wm) { accEnd(P); game.playAct = null; return; }   // (the player moved her: she leaves it)
  const r = wmExec(P, P.a, P.st, dt);
  if (r === 'run') return;
  game.playAct = null; if (ana.goto?.wm) ana.goto = null;
  if (r === 'fail') float(P.st.why ? 'No pude: ' + P.st.why : 'No pude', ana.x, ana.y - 60);
  save();
}
// --- doing each verb in the world (when the body has arrived): 'run' while it takes, 'ok', or 'fail'
function wmExec(ag, a, st, dt){ const r = wmExec0(ag, a, st, dt); accTick(ag, a, st, r); return r; }
function wmExec0(ag, a, st, dt){
  const me = ag.who, inv = wmInv(me), b = wmBody(me);
  const bubble = (k, text) => { const q = k === 'ana' ? 'ana' : PEOPLE[k] ? k : 'f:' + k; bubbles = [{ q, text, t: 0, dur: lineDur(text) }]; };
  const reach = k => { const kk = personKey(k); if (!kk) { st.why = wmName(k) + ' no está'; return 'fail'; } return wmMove(me, 'p:' + k, dt); };   // (up to them, wherever they are: indoors too, to the bedside)
  const wait = s => { if (st.P === undefined) st.P = accPasos(a, me); if (st.P) return coreoTick(ag, a, st, dt, st.P); st.w = (st.w || 0) + dt; return st.w >= Math.max(s, ACCION_VISTA[a.v]?.dur || 0); };   // (long enough to be seen; or, if it has its steps, done step by step where it is really done)
  // a deal takes a moment: one asks, the other answers (weighs it, looks the cow over), then it is done
  const haggle = (ask, answer) => {
    if (!st.hg) { st.hg = 1; st.w = 0; bubble(me, ask); }
    if (st.hg === 1) { if (!wait(2.6)) return false; st.hg = 2; st.w = 0; bubble(a.k, answer); }
    if (st.hg === 2) { if (!wait(2.6)) return false; st.hg = 3; }
    return true;
  };
  switch (a.v) {
    case 'ir': return wmMove(me, a.p, dt);
    case 'tomar': if (!wait(1)) return 'run'; inv[a.x] = (inv[a.x] || 0) + 1; float('+1 ' + ITEM_NAME[a.x]?.[0], b.x, b.y - 50); logEv(`${wmName(me)} tomó ${itemTextW(a.x, 1)} en ${WP_NAME[personKey(me)] || 'el granero'}.`, []); return 'ok';
    case 'recoger': {
      if (!wait(2)) return 'run';
      let got = 0;
      if (a.x === 'bayas') for (const u of bushes.filter(u => dist(u.x, u.y, b.x, b.y) < 300 && u.berries > 0)) { const k = Math.min(u.berries, a.n - got); u.berries -= k; u.regrow = 90; got += k; if (got >= a.n) break; }
      if (a.x === 'manzanas') for (const u of trees.filter(u => u.kind === 'apple' && dist(u.x, u.y, b.x, b.y) < 380 && u.apples > 0)) { const k = Math.min(u.apples, a.n - got); u.apples -= k; u.regrow = 90; got += k; if (got >= a.n) break; }
      if (a.x === 'ramo') { const bed = BEDS.find(u => u.stage >= 3); if (bed) { bed.stage = 1; got = 1; } }
      if (a.x === 'hierbas') got = S === 3 ? 0 : a.n;
      if (a.x === 'huevos' && game.eggDay !== today()) { got = eggsToday(); game.eggDay = today(); }
      if (!got) { st.why = 'no quedaba'; return 'fail'; }
      inv[a.x] = (inv[a.x] || 0) + got; float('+' + itemTextW(a.x, got), b.x, b.y - 50); logEv(`${wmName(me)} recogió ${itemTextW(a.x, got)}.`, []); return 'ok';
    }
    case 'quehacer': {
      if (!st.said) { st.said = 1; bubble(me, { platos: 'Lavo los platos con agua bien caliente… ¡y no rompo ninguno!', barrer: 'Barro la cocina, y el patio también.', mesa: 'Pongo la mesa: los platos de todos los días y la compota.' }[a.x]); }
      if (!wait(3.5)) return 'run';
      realR.setFact('quehacer:' + a.x); if (me !== 'marilla' && !realR.fact('gracias:' + me)) { realR.setFact('gracias:' + me); relSetW('marilla', me, relGetW('marilla', me) + 1); }
      float('✔ ' + QUEHACER_TXT[a.x], b.x, b.y - 50); logEv(`${wmName(me)} ${{ platos: 'lavó los platos', barrer: 'barrió la cocina', mesa: 'puso la mesa' }[a.x]}.`, []); return 'ok';
    }
    case 'ordeñar': {
      const c = ANIM[a.cow]; if (!c || areaAt(c.x, c.y) !== 'corral') { st.why = 'la vaca no está en el corral'; return 'fail'; }
      if (!st.said) { st.said = 1; bubble(me, 'Tranquila, ' + ANIMALS[a.cow].name + '… ya está, ya está.'); }
      if (!wait(4)) return 'run';
      inv.leche = (inv.leche || 0) + 2; realR.setFact('ordeñada:' + a.cow); float('+2 jarros de leche', b.x, b.y - 50); logEv(`${wmName(me)} ordeñó a ${ANIMALS[a.cow].name}.`, []); return 'ok';
    }
    case 'alimentar': { if (!wait(3)) return 'run'; realR.setFact('alimentados:' + a.p); float('🌾', b.x, b.y - 50); logEv(`${wmName(me)} les dio de comer a los animales en ${WP_NAME[a.p]}.`, []); return 'ok'; }
    case 'visitar': {   // (at her house: if she is out, she goes home to receive the visit, and one waits for her inside)
      const casa = CH[a.k]?.home, h = PEOPLE[a.k];
      if (h && HOUSES[casa]) {
        if (!st.casa) { st.casa = 1; h.recibe = { hasta: TT + M(60), de: me }; }
        const rc = wmMove(me, 'h:' + casa, dt); if (rc !== 'ok') return rc;
        if (wmScene(a.k) !== casa) { st.espera = (st.espera || 0) + dt; if (st.espera > M(40)) { delete h.recibe; st.why = wmName(a.k) + ' no llegó a su casa'; return 'fail'; } return 'run'; }
      }
      const r = reach(a.k); if (r !== 'ok') return r;
      if (!st.said) { st.said = 1; bubble(me, `Buenas tardes, ${callName(a.k)}. Vine a visitarla.`); }
      if (st.said === 1 && wait(2.6)) { st.said = 2; st.w = 0; bubble(a.k, '¡Pasa, pasa! Siéntate, que pongo la tetera.'); }
      if (st.said !== 2 || !wait(3)) return 'run';
      if (h) delete h.recibe; realR.setFact('visita:' + me + '>' + a.k); relSetW(a.k, me, relGetW(a.k, me) + 1); logEv(`${wmName(me)} visitó a ${wmName(a.k)}.`, []); return 'ok';
    }
    case 'devolver': {
      const r = reach(a.k); if (r !== 'ok') return r;
      if (!(inv[a.x] > 0)) { st.why = 'no lo tiene'; return 'fail'; }
      if (!st.said) { st.said = 1; bubble(me, 'Aquí tienes tu libro. ¡Me encantó! Lo leí dos veces.'); }
      if (!wait(2.6)) return 'run';
      inv[a.x] -= 1; const I = wmInv(a.k); I[a.x] = (I[a.x] || 0) + 1; delete game.wm.facts['prestado:' + a.x + ':' + a.k + '>' + me + ':' + today()];
      realR.setFact('devuelto:' + a.x + ':' + me + '>' + a.k); relSetW(a.k, me, relGetW(a.k, me) + 1); bubble(a.k, '¡Qué bueno que te gustó! Te presto otro cuando quieras.');
      logEv(`${wmName(me)} le devolvió ${ITEM_DEFS[a.x]?.gift?.art || a.x} a ${wmName(a.k)}.`, []); return 'ok';
    }
    case 'jurar': {
      const r = reach(a.k); if (r !== 'ok') return r;
      if (!st.said) { st.said = 1; bubble(me, `Juro solemnemente ser fiel a mi amiga del alma, ${wmName(a.k)}, mientras duren el sol y la luna.`); }
      if (st.said === 1 && wait(3.5)) { st.said = 2; st.w = 0; bubble(a.k, `Juro ser fiel a mi amiga del alma, ${wmName(me)}, mientras duren el sol y la luna.`); }
      if (st.said !== 2 || !wait(3.5)) return 'run';
      realR.setPerm('amigas:' + [me, a.k].sort().join('&')); relSetW(a.k, me, 5); relSetW(me, a.k, 5); const tb = wmBody(a.k); if (tb) hearts(tb.x, tb.y - 56);
      logEv(`${wmName(me)} y ${wmName(a.k)} juraron ser amigas del alma.`, []); return 'ok';
    }
    case 'perdonar': {
      const r = reach(a.k); if (r !== 'ok') return r;
      if (!st.said) { st.said = 1; bubble(me, a.k === 'gilbert' ? 'Está bien, Gilbert Blythe… te perdono. Y no me digas más «Zanahorias».' : 'Está bien… te perdono. Hagamos las paces.'); }
      if (!wait(3)) return 'run';
      delete game.wm.ofensa[me + '>' + a.k]; relSetW(me, a.k, relGetW(me, a.k) + 1); bubble(a.k, '¡Gracias! Amigos, entonces.');
      logEv(`${wmName(me)} perdonó a ${wmName(a.k)}: hicieron las paces.`, []); return 'ok';
    }
    case 'cuidar': {
      const r = reach(a.k); if (r !== 'ok') return r;
      const doc = !!whoOf(me).medico; if (!doc && !(inv.jarabe > 0)) { st.why = 'no tiene el jarabe'; return 'fail'; }
      if (!st.said) { st.said = 1; bubble(me, doc ? 'Veamos… una gripe fuerte. Tome esto, y a guardar cama unos días.' : 'Una cucharadita de jarabe de ipecacuana… y otra más. Ya va a pasar.'); }
      if (!wait(5)) return 'run';
      if (!doc) inv.jarabe -= 1; game.wm.sick = (game.wm.sick || []).filter(x => x !== a.k); relSetW(a.k, me, relGetW(a.k, me) + 2); bubble(a.k, doc ? 'Gracias, doctor. Ya me siento mejor.' : 'Ya me siento mucho mejor. Gracias, niña.');
      logEv(doc ? `${wmName(me)} atendió a ${wmName(a.k)}, que se mejoró.` : `${wmName(me)} cuidó a ${wmName(a.k)} con jarabe de ipecacuana, y se mejoró.`, []); return 'ok';
    }
    case 'estudiar': { if (!st.said) { st.said = 1; bubble(me, '«El cuadrado de la hipotenusa es igual…» Repaso y repaso.'); } if (!wait(4)) return 'run'; wmKnow(me, 'leccion'); logEv(`${wmName(me)} estudió la lección.`, []); return 'ok'; }
    case 'recitar': { if (!st.said) { st.said = 1; bubble(me, '«Y a lo largo del río, en su barca, iba la doncella de Shalott…»'); } if (!wait(4)) return 'run'; realR.setFact('recito:' + me); logEv(`${wmName(me)} recitó la lección en la escuela.`, []); return 'ok'; }
    case 'rezar': { if (!st.said) { st.said = 1; bubble(me, 'Querido Padre celestial: gracias por el Camino Blanco de las Delicias y por el Lago de las Aguas Brillantes…'); } if (!wait(4)) return 'run'; realR.setFact('rezo:' + me); logEv(`${wmName(me)} dijo sus oraciones.`, []); return 'ok'; }
    case 'adornar': { if (!(inv.ramo > 0)) { st.why = 'no tiene flores'; return 'fail'; } if (!st.said) { st.said = 1; bubble(me, '¡Una corona de ranúnculos y rosas silvestres para mi sombrero!'); } if (!wait(2.5)) return 'run'; inv.ramo -= 1; realR.setFact('adorno:' + me); float('💐 sombrero adornado', b.x, b.y - 50); logEv(`${wmName(me)} adornó su sombrero con flores.`, []); return 'ok'; }
    case 'remar': { if (!st.said) { st.said = 1; bubble(me, '¡Remo en el bote de los Barry! Hay que tener cuidado de no soltar los remos…'); } if (!wait(5)) return 'run'; realR.setFact('remo:' + me); logEv(`${wmName(me)} remó en el lago.`, []); return 'ok'; }
    case 'nombrar': { if (!st.said) { st.said = 1; bubble(me, `Este lugar se va a llamar ${NOMBRES_ANA[a.p]}. ¿No es un nombre precioso?`); } if (!wait(3)) return 'run'; realR.setPerm('nombre:' + a.p); mapBase = null; logEv(`${wmName(me)} bautizó un lugar: ${NOMBRES_ANA[a.p]}.`, []); return 'ok'; }
    case 'regañar': {
      if (a.llamar && !st.came) { const here = wmScene('ana') === wmScene(me) && (wmScene(me) !== 'out' || dist(ana.x, ana.y, b.x, b.y) < 90); if (!here) { if (!st.called) { st.called = 1; if (ag.task) ag.task.budget = Math.max(ag.task.budget || 150, 600); notice(`📜 ${wmName(me)} te manda llamar. Parece seria.`); if (WM_OBEY) WM_APPROACH = { who: me, done: () => {} }; } return 'run'; } st.came = 1; }
      else if (!a.llamar) { const r = reach(a.k); if (r !== 'ok') return r; }
      if (!st.said) { st.said = 1; bubble(me, a.k === 'ana' ? '¡Ana Shirley! Otra vez se te olvidaron los quehaceres. Estás castigada: a la cocina media hora, y a pensar.' : 'Esto no puede ser. Que no se repita.'); }
      if (st.said === 1 && wait(3.5)) { st.said = 2; st.w = 0; bubble(a.k, a.k === 'ana' ? 'Lo siento, Marilla… me distraje imaginando que era una princesa.' : 'Sí, señora.'); }
      if (st.said !== 2 || !wait(3)) return 'run';
      realR.setFact('regaño:' + a.k); delete game.wm.facts['falta:' + a.k + ':' + today()]; logEv(`${wmName(me)} regañó a ${wmName(a.k)}.`, []);
      if (a.k === 'ana' && WM_OBEY) agentStart('ana', { ...G.estar_en('ana', 'cocina', null, hourNow() + .5), text: 'castigada en la cocina media hora' }, { label: 'castigada en la cocina media hora (Marilla)', prio: 3 });
      return 'ok';
    }
    case 'subir_calesa': {
      const r = reach(a.k); if (r !== 'ok') return r;
      if (!st.said) { st.said = 1; bubble(me, 'Sube, Ana. Engancho la yegua y te llevo en la calesa.'); }
      if (!wait(2.5)) return 'run';
      if (a.k === 'ana') { const A = agentOf('ana'); A.followOf = me; A.ride = true; agentLog(A, 'va en la calesa con ' + wmName(me)); } else agentOf(a.k).followOf = me;
      logEv(`${wmName(me)} llevó a ${wmName(a.k)} en la calesa.`, []); return 'ok';
    }
    case 'escribir_carta': {   // (at her desk: she reads it aloud as she writes, line by line)
      if (!st.said) { st.said = 1; st.para = a.para || 'stacy'; st.txt = cartaTexto(st.para); st.lk = -1; }
      if (st.llego || !st.P) { const k = Math.floor((st.pt ?? st.w ?? 0) / 3.4); if (k !== st.lk && st.txt[k]) { st.lk = k; bubble(me, st.txt[k]); } }
      if (!wait(st.txt.length * 3.4)) return 'run';
      inv.carta = (inv.carta || 0) + 1; cartas().push({ id: cartas().length + 1, de: me, para: st.para, texto: st.txt, dia: today(), estado: 'escrita' });
      float('+1 carta para ' + CORREO[st.para].nombre, b.x, b.y - 50); logEv(`${wmName(me)} escribió una carta para ${CORREO[st.para].nombre}.`, []); return 'ok';
    }
    case 'enviar_carta': {   // (at the post office: who it is for, and off it goes with tomorrow's mail)
      if (!(inv.carta > 0)) { st.why = 'no tiene la carta'; return 'fail'; }
      const c = cartas().find(x => x.de === me && x.estado === 'escrita'), C = CORREO[c?.para] || CORREO.stacy;
      if (!st.said) { st.said = 1; bubble('lawson', '¿Una carta, Ana? ¿Para quién es?'); }
      if (st.said === 1 && st.w >= 2.6) { st.said = 2; bubble(me, `Para ${C.nombre}, ${C.donde}.${C.dias > 1 ? ' ¿Cuánto tarda en llegar?' : ''}`); }
      if (st.said === 2 && st.w >= 5.4) { st.said = 3; bubble('lawson', C.dias > 1 ? `Unos ${C.dias} días, con suerte. Sale mañana con el correo.` : 'Le llega mañana mismo. Ya la pongo en la saca.'); }
      if (!wait(7.6)) return 'run';
      inv.carta -= 1; if (c) { c.estado = 'enviada'; c.envio = today(); } realR.setFact('carta_enviada:' + me); logEv(`${wmName(me)} mandó por correo una carta para ${C.nombre}.`, []); return 'ok';
    }
    case 'leer': { if (!st.said) { st.said = 1; bubble(me, '«Ben-Hur»… ¡No puedo parar de leer! La carrera de cuadrigas…'); } if (!wait(5)) return 'run'; realR.setFact('leido:' + me); logEv(`${wmName(me)} leyó un libro.`, []); return 'ok'; }
    case 'escribir_cuento': { if (!st.said) { st.said = 1; bubble(me, '«Los celos de Cordelia»: una historia trágica, con un ahogado y una dama de cabellos de oro…'); } if (!wait(5)) return 'run'; inv.cuento = (inv.cuento || 0) + 1; float('+1 cuento', b.x, b.y - 50); logEv(`${wmName(me)} escribió un cuento.`, []); return 'ok'; }
    case 'leer_cuento': { const r = reach(a.k); if (r !== 'ok') return r; if (!st.said) { st.said = 1; bubble(me, 'Escucha, Diana: «La dama Geraldine caminaba a la luz de la luna…»'); } if (st.said === 1 && wait(4)) { st.said = 2; st.w = 0; bubble(a.k, '¡Ay, Ana, qué triste! ¡Lloré en la parte del ahogado!'); } if (st.said !== 2 || !wait(3)) return 'run'; inv.cuento -= 1; realR.setFact('club:' + me); logEv(`${wmName(me)} le leyó su cuento a ${wmName(a.k)} en el club de cuentos.`, []); return 'ok'; }
    case 'ensayar': { if (!st.said) { st.said = 1; bubble(me, '«La doncella de Shalott»… otra vez desde el principio, con más sentimiento.'); } if (!wait(4)) return 'run'; wmKnow(me, 'poema'); logEv(`${wmName(me)} ensayó su recitación.`, []); return 'ok'; }
    case 'actuar': { if (!st.said) { st.said = 1; bubble(me, '«…y la barca siguió flotando río abajo, hacia Camelot.»'); } if (!wait(5)) return 'run'; realR.setFact('concierto:' + me); hearts(b.x, b.y - 56); logEv(`${wmName(me)} recitó en el concierto del salón, y la aplaudieron mucho.`, []); return 'ok'; }
    case 'decorar_sala': { if (!(inv.ramo > 0)) { st.why = 'no tiene flores'; return 'fail'; } if (!wait(4)) return 'run'; inv.ramo -= 1; realR.setFact('sala_decorada'); float('💐 sala decorada', b.x, b.y - 50); logEv(`${wmName(me)} decoró el salón con flores para el concierto.`, []); return 'ok'; }
    case 'felicitar': { const r = reach(a.k); if (r !== 'ok') return r; if (!st.said) { st.said = 1; bubble(me, '¡Felicitaciones! Lo hiciste maravillosamente.'); } if (!wait(2.5)) return 'run'; realR.setFact('felicito:' + me + '>' + a.k); relSetW(a.k, me, relGetW(a.k, me) + 1); bubble(a.k, '¡Gracias! Estaba tan nerviosa…'); logEv(`${wmName(me)} felicitó a ${wmName(a.k)}.`, []); return 'ok'; }
    case 'consolar': { const r = reach(a.k); if (r !== 'ok') return r; if (!st.said) { st.said = 1; bubble(me, 'No llores… todo se va a arreglar, ya verás. Yo estoy contigo.'); } if (!wait(3.5)) return 'run'; delete game.wm.facts['triste:' + a.k + ':' + today()]; realR.setFact('consolo:' + me + '>' + a.k); relSetW(a.k, me, relGetW(a.k, me) + 1); bubble(a.k, 'Gracias… ya me siento mejor.'); logEv(`${wmName(me)} consoló a ${wmName(a.k)}.`, []); return 'ok'; }
    case 'hacer_heno': { if (!st.said) { st.said = 1; bubble(me, 'A juntar el heno antes de que llueva…'); } if (!wait(5)) return 'run'; inv.heno = (inv.heno || 0) + 3; realR.setFact('heno_hecho'); float('+3 fardos de heno', b.x, b.y - 50); logEv(`${wmName(me)} hizo heno en el campo.`, []); return 'ok'; }
    case 'partir_lena': { if (!st.said) { st.said = 1; bubble(me, '¡Zas! ¡Zas! Leña para la cocina de Marilla.'); } if (!wait(4)) return 'run'; inv.lena = (inv.lena || 0) + 3; float('+3 atados de leña', b.x, b.y - 50); logEv(`${wmName(me)} partió leña.`, []); return 'ok'; }
    case 'sembrar': { if (!wait(4)) return 'run'; realR.setFact('sembrado'); float('🌱 sembrado', b.x, b.y - 50); logEv(`${wmName(me)} sembró la huerta.`, []); return 'ok'; }
    case 'regar': { if (!wait(3)) return 'run'; realR.setFact('regado'); float('💧 regado', b.x, b.y - 50); logEv(`${wmName(me)} regó la huerta.`, []); return 'ok'; }
    case 'patinar': { if (!st.said) { st.said = 1; bubble(me, '¡Mira, Diana! ¡Vuelo sobre el hielo como una golondrina!'); } if (!wait(5)) return 'run'; realR.setFact('patino:' + me); logEv(`${wmName(me)} patinó en el lago helado.`, []); return 'ok'; }
    case 'trineo': { if (!st.said) { st.said = 1; bubble(me, '¡Allá vamos, colina abajo! ¡Agárrate fuerte!'); } if (!wait(5)) return 'run'; realR.setFact('trineo:' + me); logEv(`${wmName(me)} se tiró en trineo por la colina.`, []); return 'ok'; }
    case 'pedir_permiso': { const r = reach('marilla'); if (r !== 'ok') return r; if (!st.said) { st.said = 1; bubble(me, 'Marilla, ¿puedo ir al picnic de la escuela dominical? ¡Va a haber helado!'); } if (st.said === 1 && wait(3)) { st.said = 2; st.w = 0; bubble('marilla', 'Está bien, puedes ir. Y te pongo una canasta con algo rico.'); } if (st.said !== 2 || !wait(2.5)) return 'run'; realR.setFact('permiso:picnic'); logEv(`Marilla le dio permiso a ${wmName(me)} para ir al picnic.`, []); return 'ok'; }
    case 'merendar': { const r = reach(a.k); if (r !== 'ok') return r; if (!(inv.canasta > 0)) { st.why = 'no tiene la canasta'; return 'fail'; } if (!st.said) { st.said = 1; bubble(me, '¡Un picnic junto al lago! Y hay helado… ¡nunca había probado helado! Es indescriptible.'); } if (!wait(5)) return 'run'; inv.canasta -= 1; realR.setFact('picnic:' + me); realR.setFact('picnic:' + a.k); logEv(`${wmName(me)} fue de picnic al lago con ${wmName(a.k)}.`, []); return 'ok'; }
    // (dyeing: the surprise comes when it is done)
    case 'teñir': { if (!(inv.tinte > 0)) { st.why = 'no tiene el tinte'; return 'fail'; } if (!wait(4)) return 'run'; bubble(me, 'Ya está… a ver… ¡¿VERDE?! ¡Mi pelo está VERDE!'); inv.tinte -= 1; realR.setFact('pelo_teñido:' + me); if (me === 'ana') realR.setPerm('pelo_verde'); logEv(`${wmName(me)} se tiñó el pelo… y le quedó verde.`, []); return 'ok'; }
    case 'cortar_pelo': { if (!st.said) { st.said = 1; bubble('marilla', 'No hay más remedio, Ana: hay que cortarlo. Quédate quieta.'); } if (!wait(4)) return 'run'; delete game.wm.perm['pelo_verde']; realR.setFact('pelo_corto'); realR.setPerm('pelo_corto'); bubble('ana', 'Mi pelo… Bueno, por lo menos ya no es verde.'); logEv('A Ana le cortaron el pelo verde, bien cortito.', []); return 'ok'; }
    case 'trepar': { if (!st.said) { st.said = 1; bubble(me, '¡Josie Pye, mira cómo camino por el techo de los Barry!… ¡Ay!'); } if (!wait(4)) return 'run'; realR.setFact('trepo:' + me); realR.setFact('tobillo:' + me); logEv(`${wmName(me)} aceptó el desafío de Josie, caminó por el techo de los Barry… y se cayó y se torció el tobillo.`, []); return 'ok'; }
    case 'coser':
    case 'batir':
    case 'preparar':
    case 'cocinar': {
      const d = THINGS[a.x]; if (!Object.entries(d.receta).every(([i, n]) => (inv[i] || 0) >= n)) { st.why = 'faltan ingredientes'; return 'fail'; }
      if (!st.said && a.v === 'coser') { st.said = 1; bubble(me, 'Coso el vestido… y le pongo unas mangas abullonadas, como las que usan ahora.'); }
      if (!wait(a.v === 'coser' ? 5 : 3)) return 'run';
      for (const [i, n] of Object.entries(d.receta)) inv[i] -= n; inv[a.x] = (inv[a.x] || 0) + 1;
      float('+1 ' + ITEM_NAME[a.x][0], b.x, b.y - 50); logEv(`${wmName(me)} ${{ coser: 'cosió', batir: 'batió', preparar: 'preparó' }[a.v] ? { coser: 'cosió', batir: 'batió', preparar: 'preparó' }[a.v] + ' ' + (ITEM_DEFS[a.x]?.gift?.art || ITEM_NAME[a.x][0]) : 'cocinó ' + ITEM_NAME[a.x][0]}.`, []); if (me === 'ana' && a.v === 'cocinar') taskEvent('cocinar', a.x); return 'ok';
    }
    case 'dar': {
      const r = reach(a.k); if (r !== 'ok') return r;
      const n = ALL_AT_ONCE.includes(a.x) ? inv[a.x] || 0 : Math.min(1, inv[a.x] || 0); if (!n) { st.why = 'no lo tiene'; return 'fail'; }
      if (!wait(1.8)) return 'run';   // (handing it over)
      inv[a.x] -= n; const to = wmInv(a.k); to[a.x] = (to[a.x] || 0) + n;
      for (const tag of THINGS[a.x].tags) realR.setFact('dio:' + a.k + ':' + tag); realR.setFact('dio:' + a.k + ':' + a.x); realR.setFact('dio:' + a.x);
      const liked = socialRule(realR, 'dar', me, a.k, a.x);
      const tb = wmBody(a.k); if (liked && tb) hearts(tb.x, tb.y - 56);
      logEv(`${wmName(me)} le dio ${itemTextW(a.x, n)} a ${wmName(a.k)}.`, []); bubble(a.k, liked ? pick(['¡Qué lindo detalle! Muchas gracias.', '¡Oh! Justo lo que me gusta.']) : 'Gracias.'); return 'ok';
    }
    case 'vender': {
      const r = reach(a.k); if (r !== 'ok') return r;
      if (a.x === 'vaca') {
        const c = ANIM[a.cow]; if (c.state !== 'led' || (c.ledBy || 'ana') !== me) { st.why = 'la vaca no viene con ' + wmName(me); return 'fail'; }
        if (!haggle('¿Le interesaría comprar esta vaca? Es buena lechera.', 'Déjeme verla bien… los dientes, las patas… Sí, me conviene.')) return 'run';
        const price = whoOf(a.k).compra.animal;
        if (me === 'ana' && CH[a.k]) sellCow(a.k, c, price); else { c.state = 'bought'; c.owner = a.k; c.ledBy = null; c.nav = null; inv.dolares = (inv.dolares || 0) + price; logEv(`${wmName(me)} le vendió ${ANIMALS[c.id].name} a ${wmName(a.k)} por ${price} dólares.`, []); }
        wmFact('vendio_vaca', [me, a.k]); bubble(a.k, '¡Trato hecho! Buena vaca.'); return 'ok';
      }
      st.why = 'eso no se vende'; return 'fail';
    }
    case 'cambiar': {
      const r = reach(a.k); if (r !== 'ok') return r;
      const W = whoOf(a.k), hr = hourNow() % 24; if (W.abre && (hr < W.abre[0] || hr >= W.abre[1])) { st.why = 'la tienda está cerrada'; return 'fail'; }
      if ((inv[a.g] || 0) < a.n) { st.why = 'no tiene qué cambiar'; return 'fail'; }
      if (!haggle(`Buenos días${a.k === 'lawson' ? ', Sr. Lawson' : ''}. ¿Me cambiaría ${itemTextW(a.g, a.n)} por ${ITEM_DEFS[a.x]?.gift?.art || itemTextW(a.x, 1)}?`, a.k === 'buhonero' ? 'Este tinte deja el pelo negro como el ala de un cuervo, señorita. ¡Y no se va con el lavado!' : 'Veamos lo que traes… Sí, me sirven. Un momento.')) return 'run';
      inv[a.g] -= a.n; inv[a.x] = (inv[a.x] || 0) + 1; float('+' + itemTextW(a.x, 1), b.x, b.y - 50);
      logEv(`${wmName(me)} cambió ${itemTextW(a.g, a.n)} por ${ITEM_DEFS[a.x]?.gift?.art || itemTextW(a.x, 1)}${a.k === 'lawson' ? ' en la tienda de Lawson' : ' con ' + wmName(a.k)}.`, []); bubble(a.k, a.k === 'buhonero' ? '¡Negro azabache garantizado! Palabra de honor.' : 'Trato hecho. ¡Que lo disfrutes!'); return 'ok';
    }
    case 'comprar': {
      const r = reach(a.k); if (r !== 'ok') return r;
      const W = whoOf(a.k), hr = hourNow() % 24; if (W.abre && (hr < W.abre[0] || hr >= W.abre[1])) { st.why = 'la tienda está cerrada'; return 'fail'; }
      if (!haggle(`Buenos días, Sr. Lawson. ¿Me daría ${LIBRETA_ART[a.x] || itemTextW(a.x, 1)}? A la libreta de los Cuthbert.`, a.x === 'azucar' ? 'Cómo no. Déjame pesarla…' : 'Cómo no, aquí tengo una. Un momento…')) return 'run';
      inv[a.x] = (inv[a.x] || 0) + 1; libretaAdd(me, a.x); float('+' + itemTextW(a.x, 1), b.x, b.y - 50); bubble(a.k, 'Anotado en la libreta de los Cuthbert. Saludos a Marilla.'); return 'ok';
    }
    case 'conversar': {
      const r = reach(a.k); if (r !== 'ok') return r;
      if (!st.said) { st.said = 1; const news = (game.wm.know[a.k] || []).find(f => !(game.wm.know[me] || []).includes(f)) || (game.wm.know[me] || []).find(f => !(game.wm.know[a.k] || []).includes(f)); bubble(me, news === 'vendio_vaca' ? '¿Es verdad lo que dicen, que vendieron la vaca?' : '¿Qué hay de nuevo?'); }
      if (!wait(2.5)) return 'run';
      const u = [...new Set([...(game.wm.know[me] || []), ...(game.wm.know[a.k] || [])])]; game.wm.know[me] = [...u]; game.wm.know[a.k] = [...u];
      logEv(`${wmName(me)} conversó con ${wmName(a.k)}.`, []); return 'ok';
    }
    case 'disculparse': {
      const r = reach(a.k); if (r !== 'ok') return r;
      if (!st.said) { st.said = 1; bubble(me, me === 'gilbert' ? 'Ana, perdóname lo de «Zanahorias». Fue una tontería.' : 'Perdóname, de verdad. No quise hacerte daño.'); }
      if (!wait(2.6)) return 'run';
      const before = relGetW(a.k, me); socialRule(realR, 'disculparse', me, a.k); const after = relGetW(a.k, me);
      bubble(a.k, a.k === 'ana' ? (after >= 0 ? 'Bueno... está bien, Gilbert Blythe.' : 'Hmpf.') : after - before >= 2 ? '¡Claro que te perdono! Eres mi amiga del alma.' : 'Está bien... pero que no se repita.');
      logEv(`${wmName(me)} se disculpó con ${wmName(a.k)}.`, []); return 'ok';
    }
    case 'pedir': {
      if (!st.asked && a.llamar) {   // (one who cannot come sends for Ana, and waits for her)
        const here = wmScene('ana') === wmScene(me) && (wmScene(me) !== 'out' || dist(ana.x, ana.y, b.x, b.y) < 90);   // (in the same room is with them)
        if (!here) {
          if (!st.called) { st.called = 1; if (ag.task) ag.task.budget = Math.max(ag.task.budget || 150, 600); notice(`📜 ${wmName(me)} te manda llamar${WP_NAME[personKey(me)] ? ' (' + WP_NAME[personKey(me)] + ')' : ''}.`); logEv(`${wmName(me)} mandó a llamar a Ana.`, []); if (WM_OBEY) WM_APPROACH = { who: me, done: () => {} }; }
          return 'run';
        }
      }
      if (!st.asked) {
        const r = a.llamar ? 'ok' : reach(a.k); if (r !== 'ok') return r;
        if (!socialRule(realR, 'pedir', me, a.k)) { bubble(a.k, 'No, ahora no.'); st.why = wmName(a.k) + ' no quiso'; realR.setFact('pedido:' + a.favor.f + ':' + a.k); return 'fail'; }
        if (a.k !== 'ana' && activeGoals(AGENTS[a.k]).length >= MAX_GOALS) { bubble(a.k, 'Ahora no puedo, tengo demasiado que hacer.'); st.why = wmName(a.k) + ' está ocupado'; realR.setFact('pedido:' + a.favor.f + ':' + a.k); return 'fail'; }
        st.asked = 1; realR.setFact('pedido:' + a.favor.f + ':' + a.k); if (a.llamar && WM_APPROACH && WM_APPROACH.who === me) { WM_APPROACH = null; wmStop('ana'); }
        const F = FAVORS[a.favor.f], f = a.favor;
        bubble(me, F.say ? F.say(f) : { pasear: '¿Vamos a pasear juntas?', venir: '¿Vienes a tomar el té conmigo?' }[f.f] || '¿Me harías un favor?');
        logEv(`${wmName(me)} le pidió a ${wmName(a.k)}: ${f.f.replace('_', ' ')}.`, []);
        if (f.f === 'prestar') { const I = wmInv(a.k); if (!(I[f.item] > 0)) { st.why = wmName(a.k) + ' no lo tiene'; return 'fail'; } I[f.item] -= 1; inv[f.item] = (inv[f.item] || 0) + 1; realR.setFact('prestado:' + f.item + ':' + a.k + '>' + me); float('+' + itemTextW(f.item, 1), b.x, b.y - 50); bubble(a.k, 'Claro que sí. Cuídalo mucho, ¿eh?'); logEv(`${wmName(a.k)} le prestó ${ITEM_DEFS[f.item]?.gift?.art || itemTextW(f.item, 1)} a ${wmName(me)}.`, []); return 'ok'; }
        if (f.f === 'pasear') { if (a.k === 'ana') { if (WM_OBEY) { const A = agentOf('ana'); A.followOf = me; agentLog(A, 'pasea con ' + wmName(me)); } else notice(`📜 ${wmName(me)} quiere dar un paseo contigo: síguela.`); } else if (a.k === 'diana' && me === 'ana') diana.follow = true; else agentOf(a.k).followOf = me; return 'ok'; }
        const sub = F.goal(me, f, wmNow());
        if (a.k === 'ana' && !WM_OBEY) { if (f.f === 'traer' && CH[me]) addTask({ from: me, tipo: 'traer', n: f.n, para: me, d: today(), item: f.item }); else notice(`📜 ${wmName(me)} te pide: ${sub.text}.`); }
        else { const h = agentStart(a.k, sub, { label: sub.text + ' (se lo pidió ' + wmName(me) + ')', parent: me, chain: [...agentChain(ag), me] }); if (!h) { st.why = wmName(a.k) + ' tiene demasiado que hacer'; return 'fail'; } const gg = ag.goalNow; if (gg) gg.pending = [...(gg.pending || []).filter(p => p.h.st === 'run'), { h, f, to: a.k }]; }
        st.sub = sub;
      }
      return 'ok';   // (asked: on with the rest of the plan; what was promised is waited for only where it is needed)
    }
    case 'interceder': {
      const r = reach(a.k); if (r !== 'ok') return r;
      if (!st.said) { st.said = 1; bubble(me, `${wmName(a.k)}, ${wmName(a.por)} está arrepentido de verdad. ¿No le darías otra oportunidad?`); }
      if (!wait(2.8)) return 'run';
      const ok = socialRule(realR, 'interceder', me, a.k, a.por); realR.setFact('intercede:' + a.k + '>' + a.por);
      bubble(a.k, ok ? (a.k === 'ana' ? 'Bueno... si tú lo dices, Diana. Lo pensaré.' : 'Está bien, lo pensaré.') : 'Hmpf.'); logEv(`${wmName(me)} habló con ${wmName(a.k)} por ${wmName(a.por)}.`, []); return 'ok';
    }
    case 'guiar': {
      const c = ANIM[a.cow]; if (!(inv.cuerda > 0)) { st.why = 'no tiene cuerda'; return 'fail'; }
      if (c.state === 'led' || c.state === 'bought') { st.why = 'la vaca no está libre'; return 'fail'; }
      if (wmScene(me) !== 'out') { wmExit(me); return 'run'; }
      if (dist(b.x, b.y, c.x, c.y) > 40) { wmWalk(me, c.x, c.y, 'out', dt); return 'run'; }
      wmStop(me); if (me === 'ana') leadCow(c); else { c.state = 'led'; c.ledBy = me; c.nav = null; logEv(`${wmName(me)} agarró a ${ANIMALS[c.id].name} de la cuerda.`, []); }
      return 'ok';
    }
    case 'soltar': {
      const c = ANIM[a.cow]; if (c.state !== 'led') { st.why = 'no la lleva'; return 'fail'; }
      if (!inArea(AREAS[a.p], c.x, c.y) && inArea(AREAS[a.p], b.x, b.y)) { c.x = clamp(b.x + 20, AREAS[a.p].x + 12, AREAS[a.p].x + AREAS[a.p].w - 12); c.y = b.y; }   // (she came in after whoever leads her)
      if (!inArea(AREAS[a.p], c.x, c.y)) { if (!wait(4)) return 'run'; st.why = 'la vaca no entró'; return 'fail'; }
      if (me === 'ana') releaseCow(c); else { const ar = areaAt(c.x, c.y); c.ledBy = null; c.area = ar; c.state = ar && ar === ANIMALS[c.id].home ? 'home' : 'loose'; c.goal = null; c.nav = null; logEv(`${wmName(me)} dejó a ${ANIMALS[c.id].name} en ${AREAS[ar].name}.`, []); }
      return 'ok';
    }
  }
  return 'fail';
}
// Ana, asked to come along: she follows whoever asked (out of doors), until that one's goal is over
function wmFollowTick(){
  const A = AGENTS.ana; if (!A || !A.followOf) return;
  if (!wmDriven(A.followOf)) { A.followOf = null; if (A.ride) { A.ride = false; ana.sit = false; } if (ana.goto?.wm) ana.goto = null; return; }
  const b = wmBody(A.followOf); if (!b) return;
  if (wmScene(A.followOf) === 'camino' || game.scene === 'camino') { if (game.scene !== 'camino' && wmScene(A.followOf) === 'camino') { roadJoin(A.followOf); roadTramoIn(A.followOf, b.roadTr || roadTramo(b.roadS)); } return; }
  if (A.ride && game.scene === 'out' && wmScene(A.followOf) === 'out') { if (b.buggy) { const c8 = cartC8(b), [cx, cy] = cartFromDriver(b.x, b.y, c8); [ana.x, ana.y] = cartSeat(cx, cy, c8, 1); ana.dir = c8Dir(c8); } else { ana.x = b.x + 18; ana.y = b.y + 4; } ana.sit = !!b.buggy; ana.goto = null; ana.moving = false; return; }   // (in the cart, beside him)
  if (game.scene === 'out' && HOUSES[wmScene(A.followOf)] && dist(ana.x, ana.y, DOOR[wmScene(A.followOf)][0], DOOR[wmScene(A.followOf)][1]) < 160) { ana.sit = false; goIn(wmScene(A.followOf)); return; }   // (he went in: she goes in after him)
  if (game.scene !== 'out') { if (wmScene(A.followOf) === 'out') goOut(); return; }
  if (dist(ana.x, ana.y, b.x, b.y) > 50) ana.goto = { x: b.x + 26, y: b.y + 6, scene: 'out', wm: true }; else if (ana.goto?.wm) ana.goto = null;
}
