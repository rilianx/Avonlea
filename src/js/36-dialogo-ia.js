/* ---------- dialogue with AI (Claude) ----------
   Each conversation sends Claude who the character is (a fixed, cached prompt), what is true right now (the day,
   the place, what Ana carries, how fond each one is of her), what has happened lately (the journal the game keeps)
   and what this character remembers from earlier conversations. Claude answers as the character, offers Ana two or
   three things to say, and may note one new memory. Gifts and walks are still decided by the game itself, so
   nothing the AI writes can break it; if the AI is off or fails, the written lines are used. */
// (each provider has its own key, typed in by the player and kept in this browser)
const AI = { on: false, auto: true, model: 'gpt-5.4-mini', mode: 'minimo', stories: false, keys: { openai: '', anthropic: '' } };
const FULL = () => AI.mode === 'completo';   // (the full AI: the judge, the plans, Ana deciding with the AI; the minimal one spends several times less)
try { const st = JSON.parse(localStorage.getItem('avonlea-ai') || '{}'); if (st.key) { AI.keys.anthropic = st.key; delete st.key; } Object.assign(AI, st); AI.keys = Object.assign({ openai: '', anthropic: '' }, st.keys || AI.keys); } catch (e) {}
const saveAI = () => { try { localStorage.setItem('avonlea-ai', JSON.stringify(AI)); } catch (e) {} };
const provider = (m = AI.model) => m === 'manual' ? 'manual' : m.startsWith('gpt') ? 'openai' : 'anthropic';
const PROV = { openai: { name: 'OpenAI', hint: 'sk-...' }, anthropic: { name: 'Anthropic', hint: 'sk-ant-...' }, manual: { name: 'nadie (respondes tú)', hint: 'no hace falta clave' } };
const aiKey = () => provider() === 'manual' ? 'manual' : AI.keys[provider()] || '';
const aiReady = () => AI.on && !!aiKey() && performance.now() >= aiGate.until;
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
  aldea: ['la aldea de Avonlea (el cruce de caminos)', ROADS.este[0][0], ROADS.este[0][1] + 10], playa: ['la playa, junto al hotel White Sands', MAP.buildings[0].at[0] * U + 160, MAP.buildings[0].at[1] * U + 100], faro: ['el faro', MAP.buildings[1].at[0] * U, MAP.buildings[1].at[1] * U + 60], rio: ['el río, junto a la escuela', MILK.x - 40, MILK.y + 10], campo_rosado: ['el campo de flores rosadas', LUPINS[0].x, LUPINS[0].y],
};
// what each one can do (the game checks every action against this)
function abilText(who){
  const A = ABIL[who], L = [];
  if (A.ir) L.push(FULL() ? 'ir a algún lugar de Avonlea (' + Object.values(PLACES).map(p => p[0]).join(', ') + ') y quedarte un rato' : 'ir a lugares de Avonlea');
  if (A.visitar) L.push('ir a buscar a Ana para conversar');
  if (A.acompanar) L.push('acompañar a Ana a pasear');
  if (A.cocinar) L.push('cocinar (tarta de bayas, compota de manzana o té) y dejarlo en la mesa de la cocina para Ana');
  if (A.regar) L.push('regar la huerta');
  L.push('regalarle a Ana ' + A.regalar.map(k => ITEM_NAME[k][1]).join(', ') + ' (una vez al día, si es la estación)');
  return L.join('; ');
}
