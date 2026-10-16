/* ---------- the things Ana can carry: one entry each (to add one: an entry here) ----------
   names: one and many; icon; season(): whether it can be had now; prepared: a single serving (nobody offers her
   another while she has one); recipe: what it takes to cook it; gift: how it is given (with its article) and thanked;
   giveAll: given all at once (money); note: what the AI is told about it when she carries it */
const ITEM_DEFS = {
  bayas:    { names: ['baya', 'bayas'], icon: '🫐', season: () => S === 1 || S === 2 },
  manzanas: { names: ['manzana', 'manzanas'], icon: '🍎', season: () => S === 1 || S === 2 },
  tarta:    { names: ['tarta de bayas', 'tartas de bayas'], icon: '🥧', season: () => S === 1 || S === 2 || game.inv.bayas >= 3 || game.inv.tarta > 0, prepared: true, recipe: { bayas: 3 }, cook: 'Tarta de bayas (3 bayas)', gift: { name: 'tarta de bayas', art: 'una tarta de bayas', reply: '¡Una tarta! Huele de maravilla.' } },
  compota:  { names: ['compota de manzana', 'compotas de manzana'], icon: '🍯', season: () => S === 1 || S === 2 || game.inv.manzanas >= 3 || game.inv.compota > 0, prepared: true, recipe: { manzanas: 3 }, cook: 'Compota de manzana (3 manzanas)', gift: { name: 'compota de manzana', art: 'una compota de manzana', reply: '¡Qué rica compota! Gracias.' } },
  te:       { names: ['taza de té', 'tazas de té'], icon: '☕', season: () => true, prepared: true, recipe: {}, cook: 'Té', gift: { name: 'taza de té', art: 'una taza de té', reply: 'Un té calentito, justo lo que me hacía falta.' }, note: 'la preparó ella y puede ofrecérsela a alguien' },
  ramo:     { names: ['ramo de flores', 'ramos de flores'], icon: '💐', season: () => S !== 3 || game.inv.ramo > 0, prepared: true, gift: { name: 'ramo de flores', art: 'un ramo de flores', reply: '¡Qué flores tan lindas! Las pondré en agua.' } },
  cuerda:   { names: ['cuerda', 'cuerdas'], icon: '🪢', season: () => true },
  azucar:   { names: ['taza de azúcar', 'tazas de azúcar'], icon: '🥄', season: () => true },
  hierbas:  { names: ['manojo de hierbas', 'manojos de hierbas'], icon: '🌿', season: () => S !== 3 },
  huevos:   { names: ['huevo', 'huevos'], icon: '🥚', season: () => true },
  leche:    { names: ['jarro de leche', 'jarros de leche'], icon: '🥛', season: () => game.inv.leche > 0 },
  libro:    { names: ['libro', 'libros'], icon: '📕', season: () => game.inv.libro > 0, gift: { name: 'libro', art: 'un libro', reply: '¡Un libro! Lo voy a leer de una sentada.' } },
  jarabe:   { names: ['frasco de jarabe de ipecacuana', 'frascos de jarabe de ipecacuana'], icon: '🧴', season: () => game.inv.jarabe > 0 },
  tela:     { names: ['corte de tela', 'cortes de tela'], icon: '🧵', season: () => game.inv.tela > 0 },
  vestido:  { names: ['vestido con mangas abullonadas', 'vestidos con mangas abullonadas'], icon: '👗', season: () => game.inv.vestido > 0, gift: { name: 'vestido', art: 'un vestido con mangas abullonadas', reply: '¡Mangas abullonadas! ¡Es el vestido más lindo del mundo!' } },
  carta:    { names: ['carta', 'cartas'], icon: '✉️', season: () => game.inv.carta > 0 },
  cuento:   { names: ['cuento escrito a mano', 'cuentos escritos a mano'], icon: '📜', season: () => game.inv.cuento > 0 },
  heno:     { names: ['fardo de heno', 'fardos de heno'], icon: '🌾', season: () => game.inv.heno > 0 },
  lena:     { names: ['atado de leña', 'atados de leña'], icon: '🪵', season: () => game.inv.lena > 0 },
  mantequilla: { names: ['pan de mantequilla', 'panes de mantequilla'], icon: '🧈', season: () => game.inv.mantequilla > 0, gift: { name: 'mantequilla', art: 'un pan de mantequilla', reply: '¡Mantequilla fresca! Gracias.' } },
  canasta:  { names: ['canasta de picnic', 'canastas de picnic'], icon: '🧺', season: () => game.inv.canasta > 0 },
  tinte:    { names: ['frasco de tinte para el pelo', 'frascos de tinte para el pelo'], icon: '🧪', season: () => game.inv.tinte > 0 },
  cinta:    { names: ['cinta para el pelo', 'cintas para el pelo'], icon: '🎀', season: () => true, gift: { name: 'cinta para el pelo', art: 'una cinta para el pelo', reply: '¡Una cinta preciosa! Me la pondré el domingo.' } },
  caramelos: { names: ['bolsita de caramelos de menta', 'bolsitas de caramelos de menta'], icon: '🍬', season: () => true, gift: { name: 'bolsita de caramelos', art: 'una bolsita de caramelos de menta', reply: '¡Caramelos de menta! Son mis favoritos.' } },
  dolares:  { names: ['dólar', 'dólares'], icon: '💵', season: () => game.inv.dolares > 0, giveAll: true, gift: { name: 'el dinero', art: 'el dinero', reply: 'Vaya... bueno, pues gracias.' }, note: 'dinero' },
};
for (const k of Object.keys(ITEM_DEFS)) if (!(k in game.inv)) game.inv[k] = 0;
// what is not a gift but for the house: who uses it, and what they say when Ana brings it (the wood she chopped, the
// eggs, the milk): she can hand it over to them, all of it
const PARA_LA_CASA = {
  lena: ['marilla', '¡Leña para la cocina! Bien partida, además. Déjala junto a la estufa.'], huevos: ['marilla', 'Huevos frescos. Justo lo que me faltaba para el bizcocho.'],
  leche: ['marilla', 'La leche, gracias. La pongo a enfriar en la despensa.'], mantequilla: ['marilla', 'Mantequilla. Bien, a la despensa.'],
  azucar: ['marilla', 'El azúcar. Gracias, Ana.'], hierbas: ['marilla', 'Hierbas para el guiso. Gracias.'], heno: ['matthew', 'Bueno, pues… heno para Dolly. Gracias, Ana.'],
};
const entregaOpciones = who => Object.entries(PARA_LA_CASA).filter(([k, [p]]) => p === who && game.inv[k] > 0).map(([k]) => [ITEM_DEFS[k].icon + ' Darle ' + itemText(k, game.inv[k]).replace(/^1 /, 'el ').replace(/^(\d+) /, 'los $1 '), () => entregar(who, k)]);
function entregar(who, k){
  const n = game.inv[k], [, dice] = PARA_LA_CASA[k]; game.inv[k] = 0; const I = wmInv(who); I[k] = (I[k] || 0) + n;
  logEv('Ana le dio ' + itemText(k, n) + ' a ' + NAMES[who] + '.', [who, ...witnesses()]); planSoon(who, 'Ana te acaba de traer ' + itemText(k, n));
  if (who === 'marilla') cualidadSuma('marilla', 'paciencia', 1, 'ana');   // (a help for the house: while she is on trial, it counts)
  sfx.happy(); say(who, dice, [['De nada', close]]); save();
}
const GIFTS = Object.fromEntries(Object.entries(ITEM_DEFS).filter(([, d]) => d.gift).map(([k, d]) => [k, [d.gift.name, d.gift.reply]]));
function talk(who, again = false){
  const p = PEOPLE[who]; p.lie = false;
  ambAbort();
  if (AI.on && !aiKey()) askKey();
  const pre = again ? [] : talkPrelude(who);
  if (aiReady()) { face(who); aiTalk(who, 'Ana se acerca a conversar con ' + NAMES[who] + '.' + pre.map(x => ' (' + x + ')').join('')); return; }
  if (!p.sit) { p.dir = ana.x < p.x ? 3 : 1; if (Math.abs(ana.y - p.y) > Math.abs(ana.x - p.x)) p.dir = ana.y < p.y ? 0 : 2; }
  if (!ana.sit) ana.dir = p.x < ana.x ? 3 : 1;
  let text;
  if (game.saidS[who] !== seasonCount() && SEASON_LINES[who][S]) { game.saidS[who] = seasonCount(); text = SEASON_LINES[who][S]; }
  else { const L = LINES[who]; text = L.length ? L[game.said[who] = ((game.said[who] ?? -1) + 1) % L.length] : `(${NAMES[who] || 'Le'} la mira y asiente, sin decir nada.)`; }   // (said all they had today: no repeating)   // (only the lines that hold now: not as if they knew her before they do)
  if (pre.some(x => x.startsWith('Ana cumplió'))) text = '¡Gracias por hacer lo que te pedí, Ana! ' + text;
  if (who !== 'diana' && !conoceA(who)) { face(who); const L = presentar(who); return talkPlay(L.map(l => [l.q, l.t]), { ch: 'presenta', hold: [who] }); }   // (they have not met: first, who they are)
  if (who === 'diana' && !conoceDiana()) { const L = cadenaEncuentro('diana'); if (L) return say('diana', L.map(l => (l.q === 'ana' ? 'Ana: ' : '') + l.t).join('\n'), [['…', close]]); }   // (they have not met: the meeting of the book, not a friend's greeting)
  if (who === 'diana' && dlgHechos().prohibida) return say('diana', pick(['Ana… mamá no me deja hablar contigo. Lo siento tanto, tanto…', 'No puedo, Ana… mamá dice que no. Pero te sigo queriendo, ¿sabes?']), [['…', close]]);   // (forbidden, cap. 17)
  const opts = [...taskOptions(who), ...cadenaOpciones(who)];
  for (const [k, [name]] of Object.entries(GIFTS)) if (game.inv[k] > 0) opts.push(['Regalar ' + name, () => give(who, k)]);
  opts.push(...entregaOpciones(who));   // (and what Ana brings for the house: the wood, the eggs…)
  if (!isQuieto(who) || who === 'marilla') opts.push(['🙏 Pedirle un favor', () => favorMenu(who)]);
  opts.push(...convOpciones(who), ...walkOption(who), [cierre(who), close]);
  say(who, text, opts);
}
// the conversations there are with them today (src/datos/conversaciones.txt): at most two in the menu
const convOpciones = who => convDisponibles(who).slice(0, 2).map(d => ['💬 ' + d.tema, () => { close(); conversar(d); }]);
// closing the menu is not leaving: «Adiós» only when it is really a goodbye
const cierre = who => 'Nada por ahora';
function face(who){
  const p = PEOPLE[who];
  if (!p.sit) { p.dir = ana.x < p.x ? 3 : 1; if (Math.abs(ana.y - p.y) > Math.abs(ana.x - p.x)) p.dir = ana.y < p.y ? 0 : 2; }
  if (!ana.sit) ana.dir = p.x < ana.x ? 3 : 1;
}
// walking with Diana (the same with or without AI: the game decides it, so it always works)
function walkOption(who){
  if (who !== 'diana' || !dianaAmiga()) return [];
  const tarde = hourNow() >= 18;   // (a goodbye for the hour: «hasta mañana» only in the evening)
  return [diana.follow ? [tarde ? 'Hasta mañana, Diana' : 'Nos vemos, Diana', () => { diana.follow = false; logEv('Ana y Diana terminaron su paseo.'); save(); say(who, tarde ? '¡Hasta mañana, Ana! Que sueñes bonito.' : '¡Nos vemos, Ana! Fue un paseo precioso.', [[tarde ? 'Buenas noches' : 'Hasta luego', close]]); }]
    : ['¿Paseamos juntas?', () => { diana.follow = true; game.fond.diana = Math.min(5, game.fond.diana + 1); logEv('Ana y Diana salieron a pasear juntas.'); save(); say(who, '¡Sí! Vamos, Ana, a donde tú quieras.', [['¡Vamos!', close]]); }]];
}
