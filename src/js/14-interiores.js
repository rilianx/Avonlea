/* ---------- the interiors of the houses (see HOUSES, above) ----------
   draw: the room; items: what stands in it, to be drawn in order of their feet; blocked: where one cannot walk;
   glow: the lamplight at night; place: how the prompt says where Ana is; actions: what she can do there (add(id, x, y, reach, label, act)). */
HOUSES.gg.interior = {
  draw: drawKitchen, items: g => [{ y: TABLE.y, draw: () => drawTable(g) }, { y: KX.aparador.y, draw: () => drawAparador(g) }, { y: KX.fregadero.y, draw: () => drawFregadero(g) }, { y: KX.silla.y - 2, draw: () => drawSilla(g, KX.silla.x, KX.silla.y) }],
  blocked: (x, y) => (Math.abs(x - STOVE.x) < 36 && y < STOVE.y + 6) || (Math.abs(x - TABLE.x) < 60 && y > TABLE.y - 26 && y < TABLE.y + 6),
  glow: () => [TABLE.x, TABLE.y - 40, 160, '255,190,110', .4], place: 'en la cocina de Tejas Verdes',
  actions: add => {
    add('stove', STOVE.x, STOVE.y + 10, 44, 'Cocinar', cookMenu, { hy: 30, hit: 44 });
    add('mesa', TABLE.x, TABLE.y - 30, 76, ana.meal ? 'Levantarse de la mesa' : 'Sentarse a la mesa', mealSit, { pri: 6, hy: 14, hit: 54 });
    if (game.table && !hasIt(game.table)) add('table', TABLE.x, TABLE.y, 64, 'Tomar ' + ITEM_NAME[game.table][0] + ' que dejó ' + NAMES[COOK], () => { const k = game.table; game.inv[k]++; game.table = null; float('+' + itemText(k), TABLE.x, TABLE.y - 50); logEv(`Ana tomó ${ITEM_NAME[k][0]} que ${NAMES[COOK]} le dejó en la mesa.`, [COOK, ...witnesses()]); sfx.happy(); save(); }, { pri: 2, hy: 26, hit: 52 });
  },
};
HOUSES.os.interior = {
  draw: drawParlour, items: g => [{ y: SOFA.y - 20, draw: () => drawSofa(g) }, { y: TEA.y, draw: () => drawTea(g) }],
  blocked: (x, y) => (Math.abs(x - FIRE.x) < 46 && y < FIRE.y + 6) || (Math.abs(x - SOFA.x) < 62 && y < SOFA.y - 12) || ((x - TEA.x) / 36) ** 2 + ((y - TEA.y + 4) / 12) ** 2 < 1,
  glow: t => [FIRE.x, FIRE.y - 20, 190, '255,170,90', .45 + .05 * Math.sin(t * 7)], place: 'en la salita de La Cuesta del Huerto, junto a la chimenea',
  actions: add => {
    add('fire', FIRE.x, FIRE.y + 10, 50, 'Calentarse junto al fuego', warmUp, { pri: 6, hy: 40, hit: 50 });
    const lbl = ana.sit ? 'Levantarse' : diana.where === 'os' ? 'Tomar el té con Diana' : 'Sentarse en el sofá', fn = ana.sit ? () => { ana.sit = false; diana.sit = false; } : teaTime;
    add('tea', TEA.x, TEA.y, 50, lbl, fn, { pri: 8, hy: 26, hit: 38 });
    add('sofa', SOFA.x, SOFA.y, 60, lbl, fn, { pri: 8, hy: 30, hit: 56 });
  },
};
HOUSES.rl.interior = {
  draw: drawLynde, items: (g, t) => [{ y: RLC.y, draw: () => drawRLChair(g, t) }, { y: RLQ.y, draw: () => drawRLQuilt(g) }],
  blocked: (x, y) => dist(x, y, RLC.x, RLC.y) < 14 || (Math.abs(x - RLQ.x) < 58 && y > RLQ.y - 28 && y < RLQ.y + 6),
  glow: () => [RLQ.x - 60, RLQ.y - 70, 170, '255,190,110', .4], place: 'en la casa de la Sra. Lynde, junto a la ventana desde la que ella ve pasar a todo el mundo',
};
