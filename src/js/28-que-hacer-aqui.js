/* ---------- what can be done here ---------- */
// everything Ana can do here, from wherever she stands: where it is, how close she has to be (reach), where one taps
// (hit, around a point hy above the feet) and what happens. pri: how late it comes when several are within reach.
function targets(){
  const L = [], add = (id, x, y, reach, label, act, o = {}) => L.push({ id, x, y, reach, label, act: () => primeraVez(id, act) || escenaObjeto(id, act) || act(), hy: 14, hit: 26, pri: 0, ...o });   // (the first time: its scene, if it has one; later, one of the scenes of that thing, now and then)
  add('ana', ana.x, ana.y, 1e9, 'Ana', anaMenu, { hy: 22, hit: 15, self: true });
  for (const k of Object.keys(PEOPLE)) { const q = PEOPLE[k]; if (sceneOf(k) === game.scene) add('p:' + k, q.x, q.y, 34, 'Hablar con ' + CH[k].article + NAMES[k], () => talk(k), { hy: q.lie ? 8 : 26 * LOOKS[k].h, hit: q.lie ? 26 : 28 }); }
  if (game.scene === 'out') {
    if (toby.where === game.scene && dist(toby.x, toby.y, ana.x, ana.y) < 260) add('toby', toby.x, toby.y, 28, 'Acariciar a Pelusa, la gata', pet, { hy: 12, hit: 24 });
    for (const a of Object.values(ANIM)) if (a.kind === 'cow' && a.where === 'out' && a.state !== 'bought') add('a:' + a.id, a.x, a.y, a.state === 'led' ? 60 : 30, a.state === 'led' ? 'Soltar a la vaca' : a.state === 'loose' ? 'Agarrar a la vaca' : 'Llevar a la vaca de la cuerda', () => a.state === 'led' ? releaseCow(a) : leadCow(a), { hy: 14, hit: 24 });
    const led = ledCow();
    if (led) for (const k of Object.keys(PEOPLE)) if (CH[k].buys?.[led.kind] && sceneOf(k) === 'out') add('sell:' + k, PEOPLE[k].x, PEOPLE[k].y, 50, `Vender la vaca a${CH[k].article === 'el ' ? 'l ' : ' ' + CH[k].article}${NAMES[k]}`, () => offerSale(k, led), { hy: 26, hit: 30, pri: -1 });
    const ripe = S === 1 || S === 2;
    bushes.forEach((b, i) => { if (ripe && b.berries) add('b:' + i, b.x, b.y - 4, 30, 'Recoger bayas', () => { game.inv.bayas += b.berries; logEv('Ana recogió bayas.'); float('+' + b.berries + ' bayas', b.x, b.y - 30); b.berries = 0; b.regrow = 90; save(); }, { hy: 10, hit: 30 }); });
    trees.forEach((t, i) => { if (ripe && t.kind === 'apple' && t.apples) add('t:' + i, t.x, t.y, 34 * t.s, 'Recoger manzanas', () => { game.inv.manzanas += t.apples; logEv('Ana recogió manzanas en el huerto de los Barry.'); float('+' + t.apples + ' manzanas', t.x, t.y - 70); t.apples = 0; t.regrow = 120; save(); }, { hy: 40 * t.s, hit: 34 * t.s }); });
    if (game.hasCan || !game.ground.some(it => it.k === 'can')) add('pump', PUMP.x, PUMP.y, 34, game.hasCan ? 'Llenar la regadera' : 'Tomar la regadera', () => { game.hasCan = true; game.water = 6; ana.carry = 'can'; float('regadera llena', PUMP.x, PUMP.y - 36); sfx.water(); save(); }, { hy: 22, hit: 28 });
    BEDS.forEach((b, i) => {
      const id = 'bed:' + i, o = { hy: 4, hit: 24 }, say_ = text => () => float(text, b.x, b.y - 30);
      if (S === 3) add(id, b.x, b.y, 30, 'La huerta duerme bajo la nieve', say_('La huerta duerme bajo la nieve'), { ...o, pri: 50 });
      else if (b.stage >= 3) add(id, b.x, b.y, 30, 'Cortar ' + FLOWER_KINDS[b.kind][1], () => { b.stage = 1; game.inv.ramo++; logEv('Ana cortó ' + FLOWER_KINDS[b.kind][1] + ' de la huerta e hizo un ramo.'); float('+1 ramo de ' + FLOWER_KINDS[b.kind][1], b.x, b.y - 26); save(); }, o);
      else if (game.hasCan && game.water > 0 && !b.wet) add(id, b.x, b.y, 30, 'Regar', () => { b.wet = 1; b.grow = 0; game.water--; logEv('Ana regó la huerta.'); taskEvent('regar'); realR.setFact('sembrado'); realR.setFact('regado'); drops(b.x, b.y); sfx.water(); save(); }, o);
      else if (game.hasCan && game.water <= 0 && !b.wet) add(id, b.x, b.y, 30, 'La regadera está vacía (llénala en la bomba)', say_('La regadera está vacía: llénala en la bomba'), { ...o, pri: 50 });
    });
    add('h:br', HOUSES.br.at.x, HOUSES.br.at.y + 6, 30, 'El camino a Bright River (8 millas)', () => say('Ana', '¿Tomar el camino a Bright River a pie? Son ocho millas: más de tres horas caminando.', [['🚶 Vamos, paso a paso', () => { close(); roadOnFoot(1); }], ['Mejor no', close]]), { pri: 4, hy: 30, hit: 30 });
    for (const [id, h] of Object.entries(HOUSES)) if (!h.road) add('h:' + id, h.at.x, h.at.y + 6, 26, h.open && !h.open() ? h.closed : h.enter, () => h.open && !h.open() ? anaSays(pick(['Cerrado... el Sr. Lawson abre a las ocho.', 'La tienda está cerrada. ¡Y yo que soñaba con unos caramelos de menta!'])) : goIn(id), { pri: 4, test: (x, y) => Math.abs(x - h.at.x) < h.at.w / 2 + 8 && y < h.at.y + 10 && y > h.at.y - 80 });
    for (const f of FOLK) if (f.where === 'out' && Math.abs(f.x - ana.x) < 400 && Math.abs(f.y - ana.y) < 400) add('f:' + f.id, f.x, f.y, 34, f.id === 'lawson' ? 'Comprar o vender (Sr. Lawson)' : 'Hablar con ' + f.def.name, () => f.id === 'lawson' ? shopMenu() : folkTalk(f), { hy: 26 * f.def.look.h, hit: 24 });
    if (dist(ana.x, ana.y, FARO.x, FARO.y) < 260) add('faro', FARO.x, FARO.y + 10, 120, 'Mirar el mar desde el faro', () => { comentar('faro'); logEv('Ana miró el mar desde el faro.'); }, { pri: 5, hy: 60, hit: 40 });
    if (dist(ana.x, ana.y, MILK.x, MILK.y) < 200) add('leche', MILK.x, MILK.y, 60, 'Mirar las botellas de leche en el río', () => comentar('leche'), { pri: 5, hy: 8, hit: 34 });
    if (dist(ana.x, ana.y, WP.gallinero[0], WP.gallinero[1]) < 160) add('huevos', WP.gallinero[0], WP.gallinero[1], 50, game.eggDay === today() ? 'Las gallinas ya pusieron hoy' : 'Juntar los huevos', () => { if (game.eggDay === today()) return anaSays('Ya junté los huevos de hoy. Las gallinas no son máquinas, pobrecitas.'); const n = eggsToday(); game.eggDay = today(); game.inv.huevos += n; float('+' + itemText('huevos', n), ana.x, ana.y - 60); logEv('Ana juntó ' + itemText('huevos', n) + ' en el gallinero.'); sfx.happy(); save(); }, { pri: 5, hy: 8, hit: 40 });
    if (!cart.on) add('trip', BARN.x + 70, BARN.y + 60, 60, 'Ir a la estación de Bright River en la carreta', () => tripAsk('br'), { pri: 5, hy: 12, hit: 30 });
    if (cart.on && !cart.riding) add('cart', cart.x, cart.y - 10, 70, 'Subir a la carreta', cartAsk, { pri: 2, hy: 20, hit: 46 });
    add('bench', BENCH.x, BENCH.y + 6, 26, ana.sit ? 'Levantarse' : 'Sentarse a mirar el lago', () => { ana.sit = !ana.sit; if (ana.sit) { logEv('Ana se sentó a mirar el Lago de las Aguas Brillantes.'); ana.x = BENCH.x; ana.y = BENCH.y - 2; ana.dir = 2; } }, { pri: 4, hy: 10, hit: 32 });
  } else {
    ROOMS[game.scene].actions?.(add);
    for (const f of FOLK) if (f.where === game.scene) add('f:' + f.id, f.x, f.y, f.id === 'lawson' ? 60 : 34, f.id === 'lawson' ? 'Comprar o vender (Sr. Lawson)' : 'Hablar con ' + f.def.name, () => f.id === 'lawson' ? shopMenu() : folkTalk(f), { hy: 26 * f.def.look.h, hit: 22, pri: 3 });
    if (game.scene !== 'camino') add('door', KDOOR.x, KIT.h, 26, ROOMS[game.scene].exitLabel ?? 'Salir', () => goOut(), { hy: 10, hit: 30 });
  }
  game.ground.forEach(it => { if (it.scene === game.scene) add('g:' + it.id, it.x, it.y, 28, it.k === 'can' ? 'Recoger la regadera' : 'Recoger ' + itemText(it.k, it.n), () => pickUp(it), { hy: 8, hit: 20 }); });
  return L;
}
// what she can do right where she stands (Space or Enter does it, the way the old prompt did)
function near(){
  let best = null, bd = 1e9;
  for (const t of targets()) { if (t.self) continue; const d = dist(ana.x, ana.y, t.x, t.y); if (d < t.reach && d + t.pri < bd) { bd = d + t.pri; best = t; } }
  return best;
}
// the thing under a tap or the pointer (Ana herself wins when they overlap)
function targetAt(wx, wy){
  let best = null, bs = 1e9;
  for (const t of targets()) {
    const d = t.test ? (t.test(wx, wy) ? 0 : 1e9) : dist(wx, wy, t.x, t.y - t.hy);
    if (d > (t.test ? 0 : t.hit)) continue;
    const sc = d + t.pri * .3 - (t.self ? 20 : 0); if (sc < bs) { bs = sc; best = t; }
  }
  return best;
}
// a tap on a thing with Ana beside it: if more can be done there (another thing in the same spot, or something of hers
// that is done right there: cooking at the stove, writing at her desk, milking by the cow…), a little menu with it all;
// if only one, it is done at once. People (and Ana herself) have their own menus.
function opcionesDe(t){
  const o = [[t.label, t.act]], ya = new Set([t.label]);
  for (const u of targets()) if (u.id !== t.id && !u.self && !/^[pfa]:/.test(u.id) && !ya.has(u.label) && dist(u.x, u.y, t.x, t.y) < 34) { ya.add(u.label); o.push([u.label, u.act]); }
  for (const a of jugables()) {
    if (['estudiar', 'recitar'].includes(a.v) && !cuadernoHecho('escuela')) continue;   // (lessons: once she goes to school)
    let P = null; try { P = accPasos(a, 'ana'); } catch (e) {} const p0 = P?.[0]; if (!p0) continue;
    if (p0.lugar && p0.lugar !== personKey('ana')) continue;
    let q = null; try { q = typeof p0.p === 'function' ? p0.p() : p0.p; } catch (e) {} if (!q || dist(q[0], q[1], t.x, t.y) > 60) continue;
    const l = stepText(a); if (ya.has(l)) continue; ya.add(l); o.push([l[0].toUpperCase() + l.slice(1), () => jugar(a)]);
  }
  return o;
}
function opcionesAct(t){
  if (t.self || /^[pf]:/.test(t.id)) return t.act();
  const o = opcionesDe(t); if (o.length < 2) return t.act();
  say('Ana', t.nombre || '¿Qué hace Ana aquí?', [...o.map(([l, f]) => [l, () => { close(); f(); }]), ['Nada por ahora', close]]);
}
// a tap: do it at once if she is close enough, otherwise she walks there (A*) and does it on arrival; on bare ground she just walks
function tapAt(sx, sy){
  if (sleeping) return;
  if (OBS) { observe(null); return; }   // (watching someone: a tap brings the view back to Ana)
  const wx = view.ox + sx / view.Z, wy = view.oy + sy / view.Z, t = targetAt(wx, wy);
  if (t && (t.self || dist(ana.x, ana.y, t.x, t.y) < t.reach * .85)) { ana.goto = null; opcionesAct(t); }
  else { ana.goto = t ? { id: t.id, scene: game.scene } : { x: wx, y: wy, scene: game.scene };
    if (t && /^[pf]:/.test(t.id)) { const k = t.id.slice(2), b = wmBody(k); if (b && b.moving && !b.called) callPerson('ana', k, { come: false }); } }   // (someone walking off: «¡Espera!»)
}
const view = { ox: 0, oy: 0, Z: 1 };