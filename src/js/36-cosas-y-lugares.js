/* ---------- the things Ana can carry (what is in season, what she holds) and the places one can walk to ---------- */
const hourNow = () => (dayT % 1) * 24 + 6;   // 6 (dawn) .. 30 (dawn again)
const ITEMS = Object.keys(ITEM_DEFS);
// single servings (a cup of tea, a pie...): nobody offers Ana another while she has one; and drinking tea is not the same
// as carrying a cup she made, which she can offer to someone
const PREPARED = ITEMS.filter(k => ITEM_DEFS[k].prepared);
const sipping = () => TT < game.sipUntil;
const hasIt = k => game.inv[k] > 0 || (k === 'te' && sipping());
const ITEM_NAME = Object.fromEntries(ITEMS.map(k => [k, ITEM_DEFS[k].names]));
const itemText = (k, n = 1) => n + ' ' + ITEM_NAME[k][n > 1 ? 1 : 0];
// what can be had now (berries and apples in summer and autumn, flowers but in winter, tea always)
const inSeason = k => !!ITEM_DEFS[k]?.season();
// the places the characters (and Ana's errands) can go to; each a spot one can walk to
const PLACES = {
  ...Object.fromEntries(Object.values(HOUSES).map(h => [h.place[0], [h.place[1], h.at.x + h.place[2], h.at.y + h.place[3]]])),
  ...Object.fromEntries(Object.entries(AREAS).map(([k, A]) => [k, [A.name, A.x + A.w / 2, A.y + A.h / 2]])),
  camino_pueblo: ['el camino a Carmody', TOWN[0] - 90, TOWN[1] - 4],
  ...Object.fromEntries(Object.entries(AREAS).map(([k, A]) => [k + '_porton', [('la entrada de ' + A.name).replace(/ de el /, ' del '), ...({ N: [A.x + A.w / 2, A.y - 20], S: [A.x + A.w / 2, A.y + A.h + 20], E: [A.x + A.w + 20, A.y + A.h / 2], W: [A.x - 20, A.y + A.h / 2] })[A.gate]]])),
  huerta: ['la huerta de Tejas Verdes', BEDS[4].x, BEDS[4].y + 34],
  granero: ['el granero', BARN.x + 60, BARN.y + 50], puente: ['el puente del arroyo', BRIDGE.x - 80, BRIDGE.y + 8], camino_blanco: ['el Camino Blanco de las Delicias', (GG.x + BRIDGE.x) / 2, BRIDGE.y + 6],
  lago: ['el Lago de las Aguas Brillantes', BENCH.x + 40, BENCH.y + 22], ...Object.fromEntries(WOODS.filter(w => w.haunted).map(w => ['bosque_encantado', ['el Bosque Encantado', w.x, w.y - w.ry + 40]])),
  aldea: ['la aldea de Avonlea (el cruce de caminos)', ROADS.este[0][0], ROADS.este[0][1] + 10], playa: ['la playa, junto al faro', MAP.buildings[0].at[0] * U + 160, MAP.buildings[0].at[1] * U + 100], faro: ['el faro', MAP.buildings[1].at[0] * U, MAP.buildings[1].at[1] * U + 60], rio: ['el río, junto a la escuela', MILK.x - 40, MILK.y + 10], campo_rosado: ['el campo de flores rosadas', LUPINS[0].x, LUPINS[0].y],
};
// where someone is now, in words (for the choices of Ana on her own: «Ir a conversar con Marilla (en la cocina)»)
function whereText(k){
  const w = PEOPLE[k].where;
  return w === 'away' ? 'fuera de Avonlea, en el pueblo' : w === 'br' ? 'en la estación de Bright River' : CH[k].whereText?.[w] ?? (HOUSES[w]?.inText ?? 'afuera, por Avonlea');
}
