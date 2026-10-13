/* ---------- how each action looks while it is being done (the staging): the things it is done with, drawn by the one
   who does it, how they stand or sit, and how they move. Pure data (ACCION_VISTA) plus a few drawings (ACC_OBJ);
   wmExec marks who is doing what (ag.acting) and the drawing reads it. Fields:
     dur: how long it lasts, in minutes of the game (M(n): n minutes; while Ana does something, the time goes faster); sentar: they sit (and `con`, whoever it is done with, too);
     mira: which way they face (0: up, to the mirror on the wall); obj: the thing (a drawing in ACC_OBJ); mov: how the body moves (ACC_MOV: sliding down on the sled, skating in
     rings, rowing, up on the roof); arriba: drawn above everything around it (on a roof) ---------- */
const M = n => n * MIN_S;   // (n minutes of the game, in the seconds the game counts)
const ACCION_VISTA = {
  merendar: { dur: M(40), sentar: true, con: true, obj: 'picnic' },
  trineo: { dur: M(30), obj: 'trineo', mov: 'trineo' },
  patinar: { dur: M(30), obj: 'patines', mov: 'patinar' },
  remar: { dur: M(30), obj: 'bote', mov: 'remar', sentar: true },
  'teñir': { dur: M(15), obj: 'tinte', mira: 0 },
  cortar_pelo: { dur: M(15), obj: 'corte' },
  leer: { dur: M(30), obj: 'libro', sentar: true }, estudiar: { dur: M(40), obj: 'libro' }, ensayar: { dur: M(20), obj: 'libro' },
  escribir_carta: { dur: M(25), obj: 'papel' }, escribir_cuento: { dur: M(40), obj: 'papel' }, leer_cuento: { obj: 'cuaderno' },
  partir_lena: { dur: M(25), obj: 'hacha' }, hacer_heno: { dur: M(45), obj: 'horquilla' }, sembrar: { dur: M(15), obj: 'semillas' }, regar: { dur: M(10), obj: 'regadera' },
  alimentar: { dur: M(8), obj: 'grano' }, 'ordeñar': { obj: 'balde', sentar: true }, rezar: { dur: M(5), obj: 'rezar', sentar: true },
  decorar_sala: { dur: M(24), obj: 'flores' }, adornar: { dur: M(10), obj: 'sombrero' }, cuidar: { obj: 'jarabe' },
  quehacer: { dur: M(15), obj: 'quehacer' }, cocinar: { dur: M(30), obj: 'bol' }, preparar: { dur: M(15), obj: 'bol' }, batir: { dur: M(30), obj: 'mantequera' }, coser: { dur: M(40), obj: 'costura', sentar: true },
  recoger: { dur: M(8), obj: 'canastito' }, jurar: { dur: M(3), obj: 'manos' }, nombrar: { dur: M(2), obj: 'recitar' },
  visitar: { obj: 'te' }, dar: { obj: 'entregar' }, devolver: { obj: 'entregar' }, tomar: { obj: 'canastito' },
  leer_cuento: { obj: 'cuaderno', sentar: true, con: true }, felicitar: { obj: 'manos' }, consolar: { obj: 'abrazo' },
  trepar: { dur: 10, mov: 'techo', arriba: true }, actuar: { dur: M(10), obj: 'recitar' }, recitar: { dur: M(5), obj: 'recitar' },
};
const accPhase = (A, per) => ((TT - A.t0) % per) / per;
// how the body moves while doing it (from where it was standing: A.base)
const ACC_MOV = {
  trineo(b, A){   // down the hill on the sled, then up again pulling it
    const p = accPhase(A, 9), [x0, y0] = A.base;
    if (p < .45) { const u = p / .45, e = u * u; b.x = x0 + e * 170; b.y = y0 + e * 110; b.sit = true; b.moving = false; b.dir = 2; A.slide = true; }
    else { const u = (p - .45) / .55; b.x = x0 + (1 - u) * 170; b.y = y0 + (1 - u) * 110; b.sit = false; b.moving = true; b.walk = ((b.walk || 0) + .02) % 1; b.dir = 0; A.slide = false; }
  },
  patinar(b, A){   // rings on the ice, out from the shore
    const c = A.ice || (A.ice = (() => { const dx = A.base[0] - LAKE.x, dy = A.base[1] - LAKE.y, m = Math.hypot(dx, dy) || 1; return [LAKE.x + dx / m * LAKE.rx * .45, LAKE.y + dy / m * LAKE.ry * .45]; })());
    const a = (TT - A.t0) * 1.1, x = c[0] + Math.cos(a) * 70, y = c[1] + Math.sin(a) * 28;
    b.dir = -Math.sin(a) > 0 ? 1 : 3; b.x = x; b.y = y; b.moving = true; b.walk = ((b.walk || 0) + .012) % 1; b.sit = false;
  },
  remar(b, A){   // out on the water in the boat, rocking
    const c = A.ice || (A.ice = (() => { const dx = A.base[0] - LAKE.x, dy = A.base[1] - LAKE.y, m = Math.hypot(dx, dy) || 1; return [LAKE.x + dx / m * LAKE.rx * .5, LAKE.y + dy / m * LAKE.ry * .5]; })());
    const a = (TT - A.t0) * .25; b.x = c[0] + Math.sin(a) * 50; b.y = c[1] + Math.sin(a * 2) * 6; b.dir = Math.cos(a) > 0 ? 1 : 3; b.sit = true; b.moving = false;
  },
  techo(b, A){   // up on the roof of the Barrys' house, arms out, along the ridge… and down she comes: the ankle
    const H = HOUSES.os.at, e = TT - A.t0;
    if (e < 6.5) { const u = (e % 6) / 6; b.x = H.x - 40 + Math.abs(u * 2 - 1) * 80; b.y = H.y - 74; b.dir = u < .5 ? 1 : 3; b.moving = true; b.walk = ((b.walk || 0) + .01) % 1; b.sit = false; b.sortY = H.y + 2; return; }
    if (!A.cayo) { A.cayo = [b.x + 30, H.y + 26]; wmSay('ana', '¡Aaay!'); }
    const u = Math.min(1, (e - 6.5) / .6); b.x = lerp(b.x, A.cayo[0], u); b.y = lerp(H.y - 74, A.cayo[1], u * u); b.moving = false; if (u >= 1) { delete b.sortY; b.sit = true; if (!A.dolor) { A.dolor = 1; wmSay('ana', '¡Mi tobillo! Creo que me lo torcí… Diana, no puedo pararme.'); } }
  },
};
// (all the durations, in minutes of the game: M(n))
// the steps of an action (ACC_PASOS): where it is really done, one place after another, and what is carried between
// them: laying the table is going to the dresser for the plates and setting them on the table; the dishes are washed at
// the sink; a letter is written at her desk, upstairs. A step: lugar (a room key to be in: 'cocina', 'pieza'), p (the
// spot), mira (facing), sentar, dur (seconds), obj (what is drawn while it is done), lleva (what is carried on the way),
// decir (said on arriving), hecho (what it leaves done). Without steps, the action is done where one stands.
const KX = { aparador: lugar('cocina', 'aparador'), fregadero: lugar('cocina', 'fregadero'), silla: lugar('cocina', 'silla') };   // (the dresser with the plates, the dry sink, Marilla's chair by the window)
const enCasa = me => wmScene(me) === 'gg' || wmScene(me) === 'ga';
const ACC_PASOS = {
  'quehacer:mesa': me => wmScene(me) !== 'gg' ? null : [
    { p: [KX.aparador.x + 46, KX.aparador.y + 6], mira: 3, dur: M(2), obj: 'aparador', decir: 'Los platos de todos los días…' },
    { p: [TABLE.x - 20, TABLE.y + 18], mira: 0, dur: M(5), lleva: 'platos', obj: 'poner', hecho: () => { game.mesa = { dia: today(), puesta: true }; } }],
  'quehacer:platos': me => wmScene(me) !== 'gg' ? null : [
    { p: [TABLE.x + 20, TABLE.y + 18], mira: 0, dur: M(3), obj: 'recoger', hecho: () => { game.mesa = { dia: today(), sucia: false }; } },
    { p: [KX.fregadero.x, KX.fregadero.y + 34], mira: 0, dur: M(12), lleva: 'platos_sucios', obj: 'lavar' },
    { p: [KX.aparador.x + 46, KX.aparador.y + 6], mira: 3, dur: M(3), lleva: 'platos', obj: 'aparador' }],
  'quehacer:barrer': me => wmScene(me) !== 'gg' ? null : [[3.2, 6.6], [5, 7.6], [8.6, 7.2], [10.2, 6], [4.4, 4.6]].map(([x, y]) => ({ p: [x * T, y * T], dur: M(2.5), obj: 'escoba' })),
  escribir_carta: me => me === 'ana' && enCasa(me) ? [{ lugar: 'pieza', p: [GA.table.x - 12, GA.table.y + 8], mira: 0, sentar: true, dur: M(25), obj: 'banqueta', mesa: [GA.table.x + 15, GA.table.y - 25, GA.table.y + 1, 'carta'] }] : null,
  escribir_cuento: me => me === 'ana' && enCasa(me) ? [{ lugar: 'pieza', p: [GA.table.x - 12, GA.table.y + 8], mira: 0, sentar: true, dur: M(40), obj: 'banqueta', mesa: [GA.table.x + 15, GA.table.y - 25, GA.table.y + 1, 'cuaderno'] }] : null,
  estudiar: me => wmScene(me) === 'gg' ? [{ p: SEATS.ana.slice(0, 2), mira: 2, sentar: true, dur: M(40), obj: null, mesa: [SEATS.ana[0], TABLE.y - 31, TABLE.y + 1, 'libro'] }] : wmScene(me) === 'es' || personKey(me) === 'escuela' ? [{ lugar: 'h:es', p: [SCHOOL_DESKS[5].x - 6, SCHOOL_DESKS[5].y + 10], mira: 0, sentar: true, dur: M(40), obj: null, mesa: [SCHOOL_DESKS[5].x + 10, SCHOOL_DESKS[5].y - 12, SCHOOL_DESKS[5].y + 1, 'libro'] }] : null,   // (at the kitchen table or her desk at school, the book open on it)
  recitar: me => [{ lugar: 'h:es', p: [6.5 * T, 3.5 * T], mira: 2, dur: M(5), obj: 'recitar' }],   // (in front of the class, by the blackboard)
  visitar: (me, a) => { const o = wmBody(a.k), sc = wmScene(me); if (!o || sc === 'out' || sc !== wmScene(a.k)) return null; const q = sc === 'gg' ? SEATS.lynde.slice(0, 2) : sc === 'os' ? [TEA.x - 40, TEA.y + 6] : [o.x - 34, o.y + 4]; return [{ p: q, mira: 1, sentar: true, dur: M(30), obj: 'te' }]; },   // (sitting down for the visit, a cup of tea)
  leer: me => wmScene(me) === 'ga' ? [{ p: [GA.bed.x - 50, GA.bed.y - 6], mira: 2, sentar: true, dur: M(30), obj: 'libro' }] : wmScene(me) === 'gg' ? [{ p: SEATS.ana.slice(0, 2), mira: 2, sentar: true, dur: M(30), obj: 'libro' }] : null,
  rezar: me => me === 'ana' && enCasa(me) ? [{ lugar: 'pieza', p: [GA.bed.x - 40, GA.bed.y + 20], mira: 0, sentar: true, dur: M(5), obj: 'rezar' }] : null,
  coser: me => wmScene(me) === 'gg' ? [{ p: [KX.silla.x, KX.silla.y], mira: 2, sentar: true, dur: M(40), obj: 'costura' }] : null,
  cocinar: me => wmScene(me) === 'gg' ? [{ p: [STOVE.x + 14, STOVE.y + 40], mira: 0, dur: M(30), obj: 'bol' }] : wmScene(me) === 'out' && me !== 'ana' ? [{ adentro: true, dur: M(30) }] : null,
  preparar: me => wmScene(me) === 'gg' ? [{ p: [STOVE.x + 14, STOVE.y + 40], mira: 0, dur: M(15), obj: 'bol' }] : wmScene(me) === 'out' && me !== 'ana' ? [{ adentro: true, dur: M(15) }] : null,   // (at a door with no kitchen to show: inside, out of sight, for a while)
  batir: me => wmScene(me) === 'gg' ? [{ p: [TABLE.x + 76, TABLE.y + 14], mira: 3, dur: M(30), obj: 'mantequera' }] : null,
  actuar: me => [{ lugar: 'h:sa', p: [SALA.stage.x, SALA.stage.y], mira: 2, dur: M(10), obj: 'recitar' }],   // (on the stage of the hall)
  ensayar: me => wmScene(me) === 'es' || personKey(me) === 'escuela' ? [{ lugar: 'h:es', p: [6.5 * T, 3.5 * T], mira: 2, dur: M(20), obj: 'libro' }] : [{ lugar: 'h:sa', p: [SALA.stage.x, SALA.stage.y], mira: 2, dur: M(20), obj: 'libro' }],
  decorar_sala: me => [{ lugar: 'h:sa', p: [2 * T, 3 * T], mira: 0, dur: M(8), obj: 'flores' }, { lugar: 'h:sa', p: [6.5 * T, 3.9 * T], mira: 0, dur: M(8), obj: 'flores' }, { lugar: 'h:sa', p: [11 * T, 3 * T], mira: 0, dur: M(8), obj: 'flores' }],   // (garlands along the wall, one stretch after another)
  recoger: (me, a) => {   // (to where it really is: the bushes, the apple trees, the nests, a bed in flower, the herbs of the wood)
    const b = wmBody(me), near = (L, n) => L.filter(Boolean).sort((p, q) => dist(p.x, p.y, b.x, b.y) - dist(q.x, q.y, b.x, b.y)).slice(0, n);
    const at = a.x === 'bayas' ? near(bushes.filter(u => u.berries > 0 && dist(u.x, u.y, b.x, b.y) < 300), 2) : a.x === 'manzanas' ? near(trees.filter(u => u.kind === 'apple' && u.apples > 0 && dist(u.x, u.y, b.x, b.y) < 380), 2)
      : a.x === 'ramo' ? near(BEDS.filter(u => u.stage >= 3), 1) : a.x === 'huevos' ? [{ x: BARN.x + 130, y: BARN.y + 86 }, { x: BARN.x + 170, y: BARN.y + 92 }] : a.x === 'hierbas' ? [0, 1, 2].map(k => ({ x: b.x - 60 + k * 60, y: b.y + (k % 2 ? 30 : -10) })) : [];
    return at.length && wmScene(me) === 'out' ? at.map(u => ({ p: [u.x + (a.x === 'manzanas' ? 0 : 0), u.y + (a.x === 'manzanas' ? 14 : 18)], mira: 0, agachar: a.x !== 'manzanas', dur: M(a.x === 'manzanas' ? 5 : 3), obj: 'canastito' })) : null;
  },
  tomar: (me, a) => a.x === 'cuerda' && wmScene(me) === 'out' ? [{ p: [BARN.x + 40, BARN.y + 34], mira: 0, dur: M(1), obj: 'cuerda' }] : wmScene(me) === 'gg' ? [{ p: [KX.aparador.x + 46, KX.aparador.y + 6], mira: 3, dur: M(1), obj: 'aparador' }] : null,   // (the rope on its hook in the barn; the syrup, the basket, from the dresser)
  'teñir': me => me === 'ana' && enCasa(me) ? [{ lugar: 'pieza', p: [GA.wash.x, GA.wash.y + 24], mira: 0, dur: M(15), obj: 'tinte', decir: '¡Negro azabache como el ala de un cuervo! Ya verán…' }] : null,   // (upstairs, at the washstand with its mirror)
  cortar_pelo: me => wmScene(me) === 'gg' ? [{ p: [KIT.w / 2 - 60, 6.6 * T], mira: 2, sentar: true, dur: M(15), obj: 'corte', con: ['marilla', 16, -6] }] : null,   // (sitting on a chair in the middle of the kitchen, Marilla behind her with the scissors)
  jurar: (me, a) => { const b = wmBody(me), g = [OS.x + 50, OS.y + 44], near = wmScene(me) === 'out' && dist(b.x, b.y, g[0], g[1]) < 700; return [{ p: near ? g : [b.x, b.y], mira: 1, dur: M(3), obj: 'manos', con: [a.k, 30, 0, 3] }]; },   // (in the Barrys' garden, face to face, hand in hand)
  'ordeñar': (me, a) => { const c = ANIM[a.cow]; return c ? [{ p: () => [c.x - 26, c.y + 6], mira: 1, sentar: true, dur: M(15), obj: 'balde' }] : null; },
  alimentar: (me, a) => { const A = AREAS[a.p]; return A ? [[.3, .4], [.7, .6]].map(([u, v]) => ({ p: [A.x + A.w * u, A.y + A.h * v], dur: M(4), obj: 'grano' })) : null; },
  sembrar: me => BEDS.slice(0, 3).map(b => ({ p: [b.x, b.y + 22], mira: 0, dur: M(5), obj: 'semillas' })),
  regar: me => BEDS.slice(3, 6).map(b => ({ p: [b.x, b.y + 22], mira: 0, dur: M(3), obj: 'regadera', hecho: () => { b.wet = 1; b.grow = 0; } })),   // (the soil stays dark and wet)
  hacer_heno: me => { const f = FIELDS.find(f => dist(f.x + f.w / 2, f.y + f.h / 2, wmBody(me).x, wmBody(me).y) < 500); return f ? [[.25, .4], [.5, .6], [.75, .45]].map(([u, v]) => ({ p: [f.x + f.w * u, f.y + f.h * v], dur: M(15), obj: 'horquilla', hecho: () => { const H = game.heno?.dia === today() ? game.heno : (game.heno = { dia: today(), pts: [] }); H.pts.push([f.x + f.w * u + 26, f.y + f.h * v + 4]); } })) : null; },   // (the bales stay in the field)
  partir_lena: me => wmScene(me) === 'out' ? [{ p: [BARN.x - 30, BARN.y + 70], mira: 1, dur: M(25), obj: 'hacha', hecho: () => { game.lena = { dia: today(), x: BARN.x - 6, y: BARN.y + 74, n: (game.lena?.dia === today() ? game.lena.n : 0) + 3 }; } }] : null,   // (at the chopping block by the barn; the stacked wood stays)
};
// how long an action takes, all its steps (seconds of the game; for a task's budget of time)
function accDuracion(a, me){ let P = null; try { P = accPasos(a, me); } catch {} return P ? P.reduce((s, p) => s + (p.dur || 0), 0) : ACCION_VISTA[a.v]?.dur || 0; }
// while Ana does something (and nobody is speaking), the time goes faster: what takes a quarter of an hour is seen in
// a few seconds, and the clock says so (⏩). But never what is short (under 6 minutes: giving, taking, a vow), and
// never its start nor its end: the first and the last seconds go at their pace, so it is seen how it begins and ends.
const TAREA_PRISA = 4, PRISA_MIN = 6, PRISA_BORDE = 3;
function tareaPrisa(){
  const A = AGENTS.ana?.acting || game.playAct?.acting;
  if (!A || game.talk || bubbles.some(b => b.t < b.dur) || menuOpen()) return 1;
  const total = A.dura || 0, ya = TT - A.t0;
  return total >= M(PRISA_MIN) && ya > PRISA_BORDE && total - ya > PRISA_BORDE ? TAREA_PRISA : 1;
}
const accPasos = (a, me) => (ACC_PASOS[a.v + ':' + a.x] || ACC_PASOS[a.v])?.(me, a) || null;
// one step after another: go there (into the room first), then do it for a while; true when all are done
function coreoTick(ag, a, st, dt, P){
  const me = ag.who, b = wmBody(me), A = ag.acting; st.w = (st.w || 0) + dt;
  const p = P[st.ci || 0]; if (!p) return true;
  if (p.lugar && personKey(me) !== p.lugar) { b.sit = false; if (A) A.lleva = p.lleva; wmMove(me, p.lugar, dt); return false; }
  const q = typeof p.p === 'function' ? p.p() : p.p;
  if (q && !st.llego) {
    if (A) { A.lleva = p.lleva; A.obj = null; }
    b.sit = false; const d = dist(b.x, b.y, q[0], q[1]);
    st.tw = (st.tw || 0) + dt;
    if (d > 16 && st.tw < 9) { wmWalk(me, q[0], q[1], wmScene(me), dt); return false; }
    wmStop(me); b.x = q[0]; b.y = q[1]; st.llego = 1; st.tw = 0;   // (there; or, stuck for a while, as good as there)
  }
  if (!st.pt) { st.pt = 0; if (A) { A.obj = p.obj; A.mesa = p.mesa || null; A.lleva = null; A.base = [b.x, b.y]; } if (p.decir) wmSay(me, p.decir); if (p.adentro && b.where === 'out') { b.where = 'in'; st.salir = 1; } }
  if (p.mira != null) b.dir = p.mira; b.sit = !!p.sentar; b.crouch = !!p.agachar; if (me !== 'ana') b.moving = false;
  if (p.con) { const [k, dx, dy, od] = p.con, o = wmBody(k); if (o && wmScene(k) === wmScene(me)) { o.x = b.x + dx; o.y = b.y + dy; o.dir = od ?? b.dir; o.moving = false; o.sit = false; if (A) A.con = k; } }   // (whoever does it with her, at her side)
  st.pt += dt; if (st.pt < p.dur) return false;
  p.hecho?.(); if (A) A.mesa = null; b.sit = false; b.crouch = false; if (st.salir) { b.where = 'out'; st.salir = 0; } st.ci = (st.ci || 0) + 1; st.llego = 0; st.pt = 0;
  return st.ci >= P.length;
}
const wmSay = (k, text) => { const q = k === 'ana' ? 'ana' : PEOPLE[k] ? k : 'f:' + k; bubbles = [{ q, text, t: 0, dur: lineDur(text) }]; };
// the things it is done with: under the body (u) or in front of it (f); x, y are the feet; d: facing (1 right, 3 left)
const ACC_OBJ = {
  picnic: { u(c, b, A){ const x = A.base[0] + 14, y = A.base[1] + 6;   // the checked cloth, the basket, the ice cream
    blob(c, [[x - 46, y - 12], [x + 46, y - 12], [x + 54, y + 14], [x - 54, y + 14]], '#f6efe6');
    c.save(); c.beginPath(); c.moveTo(x - 46, y - 12); c.lineTo(x + 46, y - 12); c.lineTo(x + 54, y + 14); c.lineTo(x - 54, y + 14); c.closePath(); c.clip(); c.fillStyle = 'rgba(200,60,60,.55)'; for (let i = -6; i <= 6; i++) c.fillRect(x + i * 9 - 3, y - 14, 4.5, 30); for (let j = 0; j < 3; j++) c.fillRect(x - 56, y - 10 + j * 9, 112, 4.5); c.restore();
    const bx = x - 42, by = y - 4; ell(c, bx, by, 12, 6, '#b8864e', true); blob(c, [[bx - 12, by], [bx + 12, by], [bx + 9, by + 9], [bx - 9, by + 9]], '#a87440'); c.strokeStyle = '#7a5430'; c.lineWidth = 1.6; c.beginPath(); c.arc(bx, by - 1, 9, Math.PI, 0); c.stroke(); ell(c, bx - 5, by - 3, 3, 2, '#f2e4c4'); ell(c, bx + 4, by - 3, 3, 2, '#d9433b');
    for (const [dx, dy] of [[-30, 4], [-6, 8]]) { ell(c, x + dx, y + dy, 6, 3, '#ffffff', true); ell(c, x + dx, y + dy - 1, 3.4, 1.8, '#f6e0b8'); }   // (plates of sandwiches)
    ell(c, x + 10, y - 2, 4, 2.2, '#e8eef2', true); ell(c, x + 10, y - 4, 3, 2, '#fbe8ec'); } },   // (the ice cream)
  trineo: { u(c, b, A){ const [x0, y0] = A.base; c.strokeStyle = 'rgba(150,170,190,.5)'; c.lineWidth = 2; for (const o of [-5, 5]) { c.beginPath(); c.moveTo(x0 + o, y0); c.quadraticCurveTo(x0 + 60 + o, y0 + 20, x0 + 170 + o, y0 + 110); c.stroke(); }   // (the tracks down the hill)
    const x = b.x, y = b.y + (A.slide ? 2 : 0), dx = A.slide ? 0 : -8, dy = A.slide ? 0 : 26;   // (sliding: she sits on it; going up: it comes behind, on its rope)
    const sx = x + dx, sy = y + dy; blob(c, [[sx - 14, sy - 6], [sx + 14, sy - 6], [sx + 14, sy + 4], [sx - 14, sy + 4]], '#a8643a'); for (const o of [-9, 0, 9]) line(c, [[sx + o, sy - 6], [sx + o, sy + 4]], '#7a4428', 1, o);
    line(c, [[sx - 16, sy + 6], [sx + 14, sy + 6], [sx + 18, sy + 1]], '#4a3a30', 1.6, 1); line(c, [[sx - 16, sy - 7], [sx + 14, sy - 7], [sx + 18, sy - 11]], '#4a3a30', 1.4, 2);
    if (!A.slide) line(c, [[sx, sy - 6], [x, y - 22]], '#8a6a4a', 1, 3);
    else for (let k = 0; k < 6; k++) ell(c, x - 12 - k * 6 + Math.sin(TT * 9 + k) * 3, y - 6 - k * 4, 2.4, 1.6, 'rgba(255,255,255,.9)'); } },   // (the snow it throws up)
  patines: { u(c, b, A){ const c0 = A.ice; if (!c0) return; c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 1; c.beginPath(); c.ellipse(c0[0], c0[1], 70, 28, 0, 0, TAU); c.stroke(); c.beginPath(); c.ellipse(c0[0] + 4, c0[1] + 2, 64, 24, .1, 0, TAU); c.stroke(); line(c, [[b.x - 6, b.y + 1], [b.x + 6, b.y + 1]], '#9aa8b8', 1.4, 1); } },
  bote: { u(c, b, A){ const x = b.x, y = b.y + 4, r = Math.sin(TT * 2) * 1.5;   // the Barrys' boat, the oars dipping, rings on the water
    for (let k = 1; k <= 2; k++) { c.strokeStyle = `rgba(255,255,255,${.5 / k})`; c.lineWidth = 1; c.beginPath(); c.ellipse(x, y + 4, 34 + k * 10 + Math.sin(TT + k) * 3, 9 + k * 3, 0, 0, TAU); c.stroke(); }
    blob(c, [[x - 32, y - 6 + r], [x + 32, y - 6 - r], [x + 22, y + 8], [x - 22, y + 8]], '#8a5a34'); blob(c, [[x - 28, y - 6 + r], [x + 28, y - 6 - r], [x + 24, y - 2], [x - 24, y - 2]], '#5a3a22'); },
    f(c, b, A){ const s = Math.sin(TT * 2.4); for (const o of [-1, 1]) line(c, [[b.x + o * 6, b.y - 16], [b.x + o * (26 + s * 6), b.y + 6 + s * 3]], '#c8a070', 2, o); } },
  tinte: { u(c, b, A){ const ga = game.scene === 'ga', x = ga ? GA.wash.x - 6 : b.x + 18, y = ga ? GA.wash.y - 32 : b.y - 2; ell(c, x, y, 9, 3.4, '#e8eef2', true); ell(c, x, y - 1, 6.4, 2.2, `rgba(60,${Math.round(60 + 70 * Math.min(1, (TT - A.t0) / M(15)))},70,.8)`); },   // (the basin on the washstand, under the mirror, the dye going green in it)
    f(c, b, A){ const x = b.x + (b.dir === 3 ? -8 : 8), y = b.y - 30, p = (TT - A.t0) / M(15); blob(c, [[x - 3, y], [x + 3, y], [x + 3, y - 10], [x + 1.5, y - 13], [x - 1.5, y - 13], [x - 3, y - 10]], '#2a3a2a'); if (p > .5) for (let k = 0; k < 3; k++) ell(c, b.x - 6 + k * 6, b.y - 40 + ((TT * 30 + k * 7) % 14), 1.2, 2, 'rgba(70,150,80,.85)'); } },
  tijeras: { f(c, b, A){ const k = A.k === 'ana' || !A.k ? ana : wmBody(A.k) || b, x = k.x + 10, y = k.y - 46, s = Math.abs(Math.sin(TT * 8)) * .5; line(c, [[x, y], [x + 9, y - 3 - s * 6]], '#8a9098', 1.4, 1); line(c, [[x, y], [x + 9, y + 3 + s * 6]], '#8a9098', 1.4, 2); for (let i = 0; i < 4; i++) { const q = (TT * .8 + i * .25) % 1; ell(c, x - 6 + i * 4, y + q * 46, 2.4, 1, 'rgba(90,150,70,.9)', false, i); } } },   // (green locks falling)
  libro: { f(c, b, A){ const x = b.x + (b.dir === 3 ? -6 : b.dir === 1 ? 6 : 0), y = b.y - (b.sit ? 20 : 26); blob(c, [[x - 8, y - 5], [x, y - 3], [x + 8, y - 5], [x + 8, y + 3], [x, y + 5], [x - 8, y + 3]], '#f6f0e0'); line(c, [[x, y - 3], [x, y + 5]], '#8a6a4a', .8, 1); line(c, [[x - 7, y - 4], [x - 7, y + 4]], '#7a3a2a', 1.2, 2); line(c, [[x + 7, y - 4], [x + 7, y + 4]], '#7a3a2a', 1.2, 3); } },
  papel: { f(c, b, A){ const x = b.x + (b.dir === 3 ? -9 : 9), y = b.y - 24; blob(c, [[x - 7, y - 5], [x + 7, y - 5], [x + 7, y + 6], [x - 7, y + 6]], '#fbf6ea'); for (let k = 0; k < 3; k++) line(c, [[x - 5, y - 2 + k * 3], [x + 4, y - 2 + k * 3]], 'rgba(60,60,90,.5)', .6, k); const w = Math.sin(TT * 6) * 3; line(c, [[x + w, y + 1], [x + 6 + w, y - 9]], '#efe6d6', 1.6, 4); } },   // (the quill moving)
  cuaderno: { f(c, b, A){ ACC_OBJ.papel.f(c, b, A); } },
  hacha: { u(c, b, A){ const x = b.x + (b.dir === 3 ? -16 : 16), y = b.y + 2; ell(c, x, y, 10, 4, '#a07a52', true); ell(c, x, y - 2, 8, 3, '#d8b88a'); for (let k = 0; k < Math.min(6, Math.floor((TT - A.t0) / 1.5)); k++) ell(c, x - 22 + (k % 3) * 6, y + 8 - Math.floor(k / 3) * 4, 5, 2.4, '#c99a66', true); },
    f(c, b, A){ const s = (b.dir === 3 ? -1 : 1), u = Math.abs(Math.sin(TT * 3)), hx = b.x + s * 4, hy = b.y - 34, ex = hx + s * (8 + u * 10), ey = hy - 18 + u * 30; line(c, [[hx, hy], [ex, ey]], '#7a5a3a', 2, 1); blob(c, [[ex, ey - 3], [ex + s * 7, ey - 5], [ex + s * 7, ey + 3], [ex, ey + 2]], '#8a9098'); } },
  horquilla: { u(c, b, A){ const n = Math.min(3, 1 + Math.floor((TT - A.t0) / 4)); for (let k = 0; k < n; k++) { const x = b.x + 26 + k * 18, y = b.y + 4; blob(c, [[x - 8, y], [x + 8, y], [x + 8, y - 10], [x - 8, y - 10]], '#e0c870'); line(c, [[x - 8, y - 5], [x + 8, y - 5]], '#a88a3a', .8, k); } },
    f(c, b, A){ const u = Math.sin(TT * 2.5), x = b.x + 8, y = b.y - 30; line(c, [[x - 10, y + 16 + u * 4], [x + 14, y - 10 - u * 6]], '#8a6a4a', 1.8, 1); for (const o of [-2, 0, 2]) line(c, [[x + 14 + o, y - 10 - u * 6], [x + 18 + o, y - 18 - u * 6]], '#8a9098', 1, o); ell(c, x + 18, y - 20 - u * 6, 6, 3, '#e0c870'); } },
  semillas: { f(c, b, A){ for (let k = 0; k < 5; k++) { const q = (TT * 1.4 + k * .2) % 1; ell(c, b.x + 10 + k * 3, b.y - 24 + q * 26, 1.2, 1.2, '#6a4a2a'); } for (let k = 0; k < 3; k++) line(c, [[b.x - 24, b.y + 8 + k * 6], [b.x + 34, b.y + 8 + k * 6]], 'rgba(110,70,40,.45)', 1.2, k); } },
  regadera: { f(c, b, A){ const s = b.dir === 3 ? -1 : 1, x = b.x + s * 10, y = b.y - 22; blob(c, [[x - 6, y - 5], [x + 6, y - 5], [x + 5, y + 5], [x - 5, y + 5]], '#7a8a9a'); line(c, [[x + s * 6, y - 2], [x + s * 15, y - 8]], '#7a8a9a', 1.6, 1); for (let k = 0; k < 5; k++) { const q = (TT * 2 + k * .2) % 1; ell(c, x + s * (16 + q * 6), y - 8 + q * 30, 1, 2, 'rgba(110,170,220,.9)'); } } },
  grano: { f(c, b, A){ const x = b.x + 8, y = b.y - 22; blob(c, [[x - 5, y - 4], [x + 5, y - 4], [x + 4, y + 5], [x - 4, y + 5]], '#9a8a6a'); for (let k = 0; k < 8; k++) { const q = (TT * 1.6 + k * .125) % 1, a = k * 2.3; ell(c, x + Math.cos(a) * q * 26, y + q * 26 + Math.sin(a) * 4, 1.1, 1.1, '#e8c860'); } } },
  balde: { u(c, b, A){ blob(c, [[b.x - 7, b.y + 2], [b.x + 7, b.y + 2], [b.x + 6, b.y - 6], [b.x - 6, b.y - 6]], '#8a6a4a'); const x = b.x + 14, y = b.y + 2; blob(c, [[x - 6, y - 10], [x + 6, y - 10], [x + 5, y], [x - 5, y]], '#9aa0a8'); ell(c, x, y - 10, 6, 2, '#f8f8f2'); ell(c, b.x - 2, b.y + 1, 7, 3, '#8a6a4a', true); } },   // (the pail of milk, the stool)
  entregar: { f(c, b, A){ const o = A.k && wmBody(A.k); if (!o) return; const u = Math.min(1, (TT - A.t0) / 1.8), x = lerp(b.x, o.x, u), y = lerp(b.y, o.y, u) - 30 - Math.sin(u * Math.PI) * 6; c.font = '12px serif'; c.textAlign = 'center'; c.fillStyle = '#000'; c.fillText(ITEM_DEFS[A.x]?.icon || THINGS[A.x]?.icon || '🎁', x, y); } },   // (what is given, going from one to the other)
  abrazo: { f(c, b, A){ const o = A.k && wmBody(A.k); if (!o) return; if (Math.sin(TT * 2) > .6) hearts && Math.random() < .02 && hearts((b.x + o.x) / 2, b.y - 50); ell(c, (b.x + o.x) / 2, b.y - 26, 4, 3, '#f2d2b8', true); } },
  cuerda: { f(c, b, A){ const x = b.x + 8, y = b.y - 22; c.strokeStyle = '#b8945a'; c.lineWidth = 1.6; for (let k = 0; k < 3; k++) { c.beginPath(); c.ellipse(x, y, 6 - k, 4 - k * .6, 0, 0, TAU); c.stroke(); } } },   // (a coil of rope)
  corte: { u(c, b, A){ drawSilla(c, b.x, b.y + 4); }, f(c, b, A){ const m = A.con && wmBody(A.con), hx = m ? m.x + 8 : b.x + 10, hy = (m ? m.y : b.y) - 40, s = Math.abs(Math.sin(TT * 8)) * .5; line(c, [[hx, hy], [hx + 9, hy - 3 - s * 6]], '#8a9098', 1.4, 1); line(c, [[hx, hy], [hx + 9, hy + 3 + s * 6]], '#8a9098', 1.4, 2); for (let i = 0; i < 5; i++) { const q = (TT * .7 + i * .2) % 1; ell(c, b.x - 8 + i * 4, b.y - 40 + q * 44, 2.4, 1, 'rgba(90,150,70,.9)', false, i); } } },   // (on a chair, Marilla's scissors, the green locks falling)
  banqueta: { u(c, b, A){ blob(c, [[b.x - 8, b.y + 3], [b.x + 8, b.y + 3], [b.x + 8, b.y - 7], [b.x - 8, b.y - 7]], '#8a6040'); } },   // (a stool to sit at her desk)
  te: { f(c, b, A){ const x = b.x + (b.dir === 3 ? -8 : 8), y = b.y - 20; ell(c, x, y + 2, 5, 1.6, '#f6f8fa', true); ell(c, x, y, 3, 2.6, '#f2ede2', true); if (Math.sin(TT * 2) > .3) line(c, [[x, y - 4], [x + 1, y - 9]], 'rgba(255,255,255,.7)', 1, 1); } },   // (a cup of tea)
  rezar: { f(c, b, A){ ell(c, b.x + (b.dir === 3 ? -3 : 3), b.y - 30, 2.6, 4, '#f2d2b8', true); } },   // (the hands together)
  flores: { f(c, b, A){ const x = b.x + 9, y = b.y - 28; for (let k = 0; k < 6; k++) ell(c, x + Math.cos(k) * 4, y + Math.sin(k * 1.7) * 3 - 4, 2.4, 2.4, ['#f2c14e', '#f6f2f0', '#e88ab0'][k % 3], true); line(c, [[x, y], [x - 1, y + 7]], '#4a7a3a', 1, 1); } },
  sombrero: { f(c, b, A){ const h = 50 * (LOOKS[b.look]?.h || 1); for (let k = 0; k < 7; k++) ell(c, b.x - 10 + k * 3.3, b.y - h + 6 + Math.abs(k - 3) * .4, 2, 2, ['#f2c14e', '#e88ab0', '#f6f2f0'][k % 3], true); } },   // (a wreath of buttercups and wild roses on the hat)
  jarabe: { f(c, b, A){ const x = b.x + 10, y = b.y - 26; blob(c, [[x - 3, y], [x + 3, y], [x + 3, y - 9], [x + 1, y - 12], [x - 1, y - 12], [x - 3, y - 9]], '#8a4a2a'); line(c, [[x + 5, y + 2], [x + 12, y - 2]], '#c8c8d0', 1.2, 1); } },   // (the syrup of ipecac and the spoon)
  quehacer: { f(c, b, A){ const s = b.dir === 3 ? -1 : 1;
    if (A.x === 'barrer') { const u = Math.sin(TT * 4); line(c, [[b.x + s * 4, b.y - 30], [b.x + s * (14 + u * 6), b.y + 2]], '#8a6a4a', 1.8, 1); blob(c, [[b.x + s * (10 + u * 6), b.y], [b.x + s * (20 + u * 6), b.y], [b.x + s * (22 + u * 6), b.y + 5], [b.x + s * (8 + u * 6), b.y + 5]], '#d8b860'); for (let k = 0; k < 3; k++) ell(c, b.x + s * (26 + k * 5) + u * 4, b.y + 2 - k, 1.4, 1, 'rgba(150,120,80,.6)'); }
    else if (A.x === 'platos') { const x = b.x + s * 10, y = b.y - 22; ell(c, x, y, 10, 4, '#d8dee4', true); ell(c, x, y - 1, 7.5, 2.4, 'rgba(160,200,230,.8)'); ell(c, x + Math.sin(TT * 5) * 3, y - 2, 4, 1.6, '#ffffff', true); }
    else { const x = b.x + s * 9, y = b.y - 26; for (let k = 0; k < 3; k++) ell(c, x, y - k * 2, 6, 2.2, '#f6f8fa', true); } } },   // (the broom, the basin of dishes, the plates)
  bol: { f(c, b, A){ const s = b.dir === 3 ? -1 : 1, x = b.x + s * 9, y = b.y - 24, u = TT * 6; ell(c, x, y, 7, 3.4, '#e8dcc4', true); ell(c, x, y - 1, 5, 2, '#f2e6c8'); line(c, [[x + Math.cos(u) * 3, y - 1 + Math.sin(u)], [x + 4 + Math.cos(u) * 2, y - 10]], '#a8804e', 1.4, 1); } },   // (the bowl and the wooden spoon)
  mantequera: { u(c, b, A){ const x = b.x + 14, y = b.y + 2, u = Math.sin(TT * 4) * 5; blob(c, [[x - 6, y], [x + 6, y], [x + 5, y - 20], [x - 5, y - 20]], '#b88a5a'); line(c, [[x - 6, y - 8], [x + 6, y - 8]], '#7a5a3a', 1, 1); line(c, [[x, y - 20], [x, y - 32 + u]], '#8a6a4a', 1.6, 2); } },   // (the churn, the dasher going up and down)
  costura: { f(c, b, A){ const x = b.x + 2, y = b.y - 18; blob(c, [[x - 10, y - 3], [x + 10, y - 3], [x + 12, y + 5], [x - 12, y + 5]], '#8aa8c8'); const u = Math.sin(TT * 3); line(c, [[x + 4, y], [x + 10 + u * 4, y - 8]], '#e8e8e8', .8, 1); } },   // (the cloth on her lap, the needle and thread)
  canastito: { f(c, b, A){ const x = b.x + (b.dir === 3 ? -10 : 10), y = b.y - 16; ell(c, x, y, 7, 3.4, '#b8864e', true); c.strokeStyle = '#7a5430'; c.lineWidth = 1.2; c.beginPath(); c.arc(x, y - 1, 6, Math.PI, 0); c.stroke(); ell(c, x - 2, y - 2, 2, 1.6, '#d9433b'); ell(c, x + 2, y - 2, 2, 1.6, '#3c4fa8'); } },
  manos: { f(c, b, A){ const o = A.k && wmBody(A.k); if (!o) return; const x = (b.x + o.x) / 2, y = (b.y + o.y) / 2 - 28; ell(c, x, y, 4, 3, '#f2d2b8', true); hearts && Math.random() < .01 && hearts(x, y - 20); } },   // (hand in hand: «I solemnly swear to be faithful to my bosom friend…»)
  platos: { f(c, b, A){ const x = b.x + (b.dir === 3 ? -6 : b.dir === 1 ? 6 : 0), y = b.y - 24; for (let k = 0; k < 4; k++) ell(c, x, y - k * 1.8, 7, 2.4, '#f6f8fa', true); } },   // (a pile of clean plates in her arms)
  platos_sucios: { f(c, b, A){ const x = b.x + (b.dir === 3 ? -6 : b.dir === 1 ? 6 : 0), y = b.y - 24; for (let k = 0; k < 3; k++) ell(c, x + (k % 2) * 2, y - k * 2, 7, 2.4, '#ece6d8', true); ell(c, x + 3, y - 7, 3, 2.4, '#9db3bf', true); ell(c, x - 2, y - 2, 1.4, .8, '#b8864e'); } },
  aparador: { f(c, b, A){ const x = KX.aparador.x + 22, y = KX.aparador.y - 30; blob(c, [[x - 2, y - 14], [x + 10, y - 18], [x + 10, y + 10], [x - 2, y + 12]], '#a87850'); ACC_OBJ.platos.f(c, b, A); } },   // (the dresser door open)
  poner: { f(c, b, A){ const n = Math.min(3, 1 + Math.floor((TT - A.t0) / 1.1)); for (let k = 0; k < n; k++) { const x = TABLE.x - 30 + k * 30, y = TABLE.y - 28; ell(c, x, y, 7, 3, '#ffffff', true); line(c, [[x + 9, y - 2], [x + 9, y + 2]], '#a8a8b0', 1, k); } if (n < 3) ACC_OBJ.platos.f(c, b, A); } },   // (the plates set one by one)
  recoger: { f(c, b, A){ ACC_OBJ.platos_sucios.f(c, b, A); } },
  lavar: { f(c, b, A){ const x = KX.fregadero.x, y = KX.fregadero.y - 14, u = Math.sin(TT * 5); ell(c, x + u * 3, y - 2, 6, 2.2, '#f6f8fa', true); for (let k = 0; k < 3; k++) ell(c, x - 8 + k * 8 + u * 2, y - 6 - ((TT * 9 + k * 5) % 8), 1.4, 1.4, 'rgba(255,255,255,.9)'); } },   // (a plate in the basin, the suds)
  escoba: { f(c, b, A){ ACC_OBJ.quehacer.f(c, b, { ...A, x: 'barrer' }); } },
  recitar: { f(c, b, A){ const u = Math.sin(TT * 2); line(c, [[b.x + 6, b.y - 34], [b.x + 16, b.y - 44 - u * 4]], '#f2d2b8', 2, 1); } },   // (an arm out, with feeling)
};
// what lies on the table while she studies or writes: the open book; the notebook or the letter, with the pen moving
const ACC_MESA = {
  libro: (c, x, y) => { blob(c, [[x - 9, y - 3], [x, y - 1], [x + 9, y - 3], [x + 9, y + 3], [x, y + 5], [x - 9, y + 3]], '#f6f0e0'); line(c, [[x, y - 1], [x, y + 5]], '#8a6a4a', .8, 1); for (let k = 0; k < 2; k++) { line(c, [[x - 7, y + k * 2], [x - 2, y + 1 + k * 2]], 'rgba(60,60,90,.4)', .5, k); line(c, [[x + 2, y + 1 + k * 2], [x + 7, y + k * 2]], 'rgba(60,60,90,.4)', .5, k + 2); } },
  cuaderno: (c, x, y) => { blob(c, [[x - 7, y - 4], [x + 7, y - 4], [x + 8, y + 4], [x - 6, y + 4]], '#fbf6ea'); for (let k = 0; k < 3; k++) line(c, [[x - 5, y - 2 + k * 2.4], [x + 5, y - 2 + k * 2.4]], 'rgba(60,60,90,.45)', .5, k); const w = Math.sin(TT * 6) * 3; line(c, [[x + w, y + 1], [x + 5 + w, y - 8]], '#efe6d6', 1.4, 4); ell(c, x + 5 + w, y - 8, 1.6, 1, '#d8c8b0'); },   // (the pen moving across it)
  carta: (c, x, y) => { ACC_MESA.cuaderno(c, x, y); blob(c, [[x - 15, y - 1], [x - 9, y - 1], [x - 9, y + 3], [x - 15, y + 3]], '#e8dcc4'); ell(c, x - 12, y + 1, 1.2, 1.2, '#a8302a'); },   // (and the envelope, with its seal)
};
// who is doing what, from wmExec: on the first moment of doing it, where they stood; at the end, back as they were
function accTick(ag, a, st, r){
  const V = ACCION_VISTA[a.v], b = wmBody(ag.who); if (!V || !b) return;
  const doing = r === 'run' && (st.w > 0 || st.hg || st.said);
  if (doing && !ag.acting) { ag.acting = { v: a.v, k: a.k, x: a.x, t0: TT, dura: accDuracion(a, ag.who), base: [b.x, b.y], sit: b.sit, task: ag.task, ...(st.P ? { obj: null } : {}) }; if (V.sentar && !V.mov && !st.P) { b.sit = true; if (V.con && a.k) { const o = wmBody(a.k); if (o && wmScene(a.k) === wmScene(ag.who)) { ag.acting.kb = [o.x, o.y, o.sit]; o.x = b.x + 46; o.y = b.y + 2; o.sit = true; o.dir = 3; b.dir = 1; } } } }
  if (doing && ag.acting && V.mov) ACC_MOV[V.mov](b, ag.acting);
  if (doing && ag.acting && V.mira != null && !st.P) b.dir = V.mira;
  if (doing && ag.acting && a.k && !V.mov && !st.P) { const o = wmBody(a.k); if (o && wmScene(a.k) === wmScene(ag.who) && dist(o.x, o.y, b.x, b.y) < 140 && !o.sit) { const sd = o.x < b.x ? 3 : 1; b.dir = sd; o.dir = sd === 1 ? 3 : 1; } }   // (face to face)
  if (doing && ag.acting?.kb) { const o = wmBody(a.k); if (o) { o.x = ag.acting.base[0] + 46; o.y = ag.acting.base[1] + 2; o.sit = true; o.dir = 3; o.moving = false; } }   // (whoever it is done with stays beside, sitting)
  if (!doing && ag.acting && r !== 'run') accEnd(ag);
}
function accEnd(ag){
  const A = ag.acting, b = wmBody(ag.who); ag.acting = null; if (!A || !b) return;
  if (ACCION_VISTA[A.v].mov) { [b.x, b.y] = A.cayo || A.base; b.moving = false; delete b.sortY; }
  b.sit = A.cayo ? true : !!A.sit && A.v !== 'merendar' ? A.sit : false;   // (after the fall, on the ground)
  if (A.kb) { const o = wmBody(A.k); if (o) o.sit = A.kb[2]; }
}
// the sick stay in bed at home (lying down, under a quilt) until someone cures them
function sickTick(){
  const sick = game.wm?.sick || [];
  for (const k of sick) { const b = PEOPLE[k], h = CH[k]?.home; if (!b || !HOUSES[h] || b.where === 'away') continue; b.where = h; b.bed ||= [KIT.w * .7, KIT.h * .4]; b.x = b.bed[0]; b.y = b.bed[1]; b.lie = true; b.sit = false; b.moving = false; b.nav = null; }
  for (const [k, b] of Object.entries(PEOPLE)) if (b.bed && !sick.includes(k)) { b.lie = false; delete b.bed; }
}
// into the drawing: the things under the body (before it) and in its hands (after it)
function accPush(list, g, t){
  if (game.scene === 'out') {   // (what the work left: bales in the field, wood stacked by the barn)
    if (game.heno?.dia === today()) for (const [x, y] of game.heno.pts) list.push({ y, draw: () => { blob(g, [[x - 9, y], [x + 9, y], [x + 9, y - 10], [x - 9, y - 10]], '#e0c870'); line(g, [[x - 9, y - 5], [x + 9, y - 5]], '#a88a3a', .8, 1); } });
    if (game.lena?.dia === today()) { const L = game.lena; list.push({ y: L.y, draw: () => { for (let k = 0; k < Math.min(12, L.n); k++) ell(g, L.x + (k % 4) * 9, L.y - Math.floor(k / 4) * 6, 5, 3, k % 2 ? '#c99a66' : '#b8885a', true); } }); }
  }
  for (const [k, b] of Object.entries(PEOPLE)) if (b.bed && b.where === game.scene) list.push({ y: b.y - 1, draw: () => { const x = b.x - 6, y = b.y + 2; blob(g, [[x - 34, y - 26], [x + 40, y - 26], [x + 40, y + 10], [x - 34, y + 10]], '#8a6040'); blob(g, [[x - 30, y - 22], [x + 36, y - 22], [x + 36, y + 6], [x - 30, y + 6]], '#f6f0e4'); ell(g, x - 22, y - 8, 9, 6, '#ffffff', true); } }, { y: b.y + 1, draw: () => { const x = b.x - 6, y = b.y + 2; blob(g, [[x - 8, y - 20], [x + 36, y - 20], [x + 36, y + 6], [x - 8, y + 6]], '#c86a5a'); for (let i = 0; i < 4; i++) line(g, [[x - 8 + i * 11, y - 20], [x - 8 + i * 11, y + 6]], 'rgba(255,240,220,.6)', 1, i); } });   // (the bed, and the quilt over the sick one)
  for (const ag of [...Object.values(AGENTS), ...(game.playAct ? [game.playAct] : [])]) {
    const A = ag.acting; if (!A) continue; if (ag.task !== A.task) { accEnd(ag); continue; } const k = ag.who, b = wmBody(k); if (!b || (k === 'ana' ? RENDER_REAL !== game.scene : wmScene(k) !== game.scene)) continue;
    const y = b.sortY ?? b.y; if (A.lleva && ACC_OBJ[A.lleva]) { const C = ACC_OBJ[A.lleva]; list.push({ y: y + 7, draw: () => C.f(g, b, A) }); continue; }   // (carrying it to where it is done)
    if (A.mesa) { const [mx, my, sy, kind] = A.mesa; list.push({ y: sy, draw: () => ACC_MESA[kind](g, mx, my, b, A) }); }   // (the notebook or the book, on the table)
    const O = ACC_OBJ[A.obj !== undefined ? A.obj : ACCION_VISTA[A.v].obj]; if (!O) continue;
    if (O.u) list.push({ y: (A.v === 'merendar' ? A.base[1] : y) - .6, draw: () => O.u(g, b, A) });
    if (O.f) list.push({ y: y + 7, draw: () => O.f(g, b, A) });
  }
}