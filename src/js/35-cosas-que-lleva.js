/* ---------- the things Ana can carry: one entry each (to add one: an entry here) ----------
   names: one and many; icon; season(): whether it can be had now; prepared: a single serving (nobody offers her
   another while she has one); recipe: what it takes to cook it; gift: how it is given (with its article; how it is
   thanked, gift.reply, is the saying regalo:<thing> in src/datos/dichos/11-regalos-y-encargos.txt);
   giveAll: given all at once (money) */
const ITEM_DEFS = {
  bayas:    { names: ['baya', 'bayas'], icon: '🫐', season: () => S === 1 || S === 2 },
  manzanas: { names: ['manzana', 'manzanas'], icon: '🍎', season: () => S === 1 || S === 2 },
  tarta:    { names: ['tarta de bayas', 'tartas de bayas'], icon: '🥧', season: () => S === 1 || S === 2 || game.inv.bayas >= 3 || game.inv.tarta > 0, prepared: true, recipe: { bayas: 3 }, cook: 'Tarta de bayas (3 bayas)', gift: { name: 'tarta de bayas', art: 'una tarta de bayas' } },
  compota:  { names: ['compota de manzana', 'compotas de manzana'], icon: '🍯', season: () => S === 1 || S === 2 || game.inv.manzanas >= 3 || game.inv.compota > 0, prepared: true, recipe: { manzanas: 3 }, cook: 'Compota de manzana (3 manzanas)', gift: { name: 'compota de manzana', art: 'una compota de manzana' } },
  te:       { names: ['taza de té', 'tazas de té'], icon: '☕', season: () => true, prepared: true, recipe: {}, cook: 'Té', gift: { name: 'taza de té', art: 'una taza de té' }, note: 'la preparó ella y puede ofrecérsela a alguien' },
  ramo:     { names: ['ramo de flores', 'ramos de flores'], icon: '💐', season: () => S !== 3 || game.inv.ramo > 0, prepared: true, gift: { name: 'ramo de flores', art: 'un ramo de flores' } },
  cuerda:   { names: ['cuerda', 'cuerdas'], icon: '🪢', season: () => true },
  azucar:   { names: ['taza de azúcar', 'tazas de azúcar'], icon: '🥄', season: () => true },
  hierbas:  { names: ['manojo de hierbas', 'manojos de hierbas'], icon: '🌿', season: () => S !== 3 },
  huevos:   { names: ['huevo', 'huevos'], icon: '🥚', season: () => true },
  leche:    { names: ['jarro de leche', 'jarros de leche'], icon: '🥛', season: () => game.inv.leche > 0 },
  libro:    { names: ['libro', 'libros'], icon: '📕', season: () => game.inv.libro > 0, gift: { name: 'libro', art: 'un libro' } },
  jarabe:   { names: ['frasco de jarabe de ipecacuana', 'frascos de jarabe de ipecacuana'], icon: '🧴', season: () => game.inv.jarabe > 0 },
  tela:     { names: ['corte de tela', 'cortes de tela'], icon: '🧵', season: () => game.inv.tela > 0 },
  vestido:  { names: ['vestido con mangas abullonadas', 'vestidos con mangas abullonadas'], icon: '👗', season: () => game.inv.vestido > 0, gift: { name: 'vestido', art: 'un vestido con mangas abullonadas' } },
  carta:    { names: ['carta', 'cartas'], icon: '✉️', season: () => game.inv.carta > 0 },
  cuento:   { names: ['cuento escrito a mano', 'cuentos escritos a mano'], icon: '📜', season: () => game.inv.cuento > 0 },
  heno:     { names: ['fardo de heno', 'fardos de heno'], icon: '🌾', season: () => game.inv.heno > 0 },
  lena:     { names: ['brazada de leña', 'brazadas de leña'], icon: '🪵', season: () => game.inv.lena > 0 },
  semillas: { names: ['sobrecito de semillas', 'sobrecitos de semillas'], icon: '🌱', season: () => game.inv.semillas > 0 },
  mantequilla: { names: ['pan de mantequilla', 'panes de mantequilla'], icon: '🧈', season: () => game.inv.mantequilla > 0, gift: { name: 'mantequilla', art: 'un pan de mantequilla' } },
  canasta:  { names: ['canasta de picnic', 'canastas de picnic'], icon: '🧺', season: () => game.inv.canasta > 0 },
  tinte:    { names: ['frasco de tinte para el pelo', 'frascos de tinte para el pelo'], icon: '🧪', season: () => game.inv.tinte > 0 },
  cinta:    { names: ['cinta para el pelo', 'cintas para el pelo'], icon: '🎀', season: () => true, gift: { name: 'cinta para el pelo', art: 'una cinta para el pelo' } },
  caramelos: { names: ['bolsita de caramelos de menta', 'bolsitas de caramelos de menta'], icon: '🍬', season: () => true, gift: { name: 'bolsita de caramelos', art: 'una bolsita de caramelos de menta' } },
  dolares:  { names: ['dólar', 'dólares'], icon: '💵', season: () => game.inv.dolares > 0, giveAll: true, gift: { name: 'el dinero', art: 'el dinero' } },
};
for (const k of Object.keys(ITEM_DEFS)) if (!(k in game.inv)) game.inv[k] = 0;
for (const [k, d] of Object.entries(ITEM_DEFS)) if (d.gift) Object.defineProperty(d.gift, 'reply', { get: () => dicho('regalo:' + k) || dicho('gracias_dar') });   // (the thanks: said when it is given, one of its lines)
// what is not a gift but for the house: who uses it (the wood she carried in, the eggs, the milk): she can hand it over
// to them, all of it; what they say then is the saying para_la_casa:<thing> (src/datos/dichos/11-regalos-y-encargos.txt)
const PARA_LA_CASA = { lena: 'marilla', huevos: 'marilla', leche: 'marilla', mantequilla: 'marilla', azucar: 'marilla', hierbas: 'marilla', heno: 'matthew' };
const entregaOpciones = who => Object.entries(PARA_LA_CASA).filter(([k, p]) => p === who && game.inv[k] > 0).map(([k]) => [ITEM_DEFS[k].icon + ' Darle ' + itemText(k, game.inv[k]).replace(/^1 /, 'el ').replace(/^(\d+) /, 'los $1 '), () => entregar(who, k)]);
function entregar(who, k){
  const n = game.inv[k], dice = dicho('para_la_casa:' + k); game.inv[k] = 0; const I = wmInv(who); I[k] = (I[k] || 0) + n;
  logEv('Ana le dio ' + itemText(k, n) + ' a ' + NAMES[who] + '.', [who, ...witnesses()]);
  if (who === 'marilla') cualidadSuma('marilla', 'paciencia', 1, 'ana');   // (a help for the house: while she is on trial, it counts)
  sfx.happy(); say(who, dice, [['De nada', close]]); save();
}
const GIFTS = Object.fromEntries(Object.entries(ITEM_DEFS).filter(([, d]) => d.gift).map(([k, d]) => [k, [d.gift.name]]));
function talk(who, again = false){
  const p = PEOPLE[who]; p.lie = false;
  ambAbort();
  const pre = again ? [] : talkPrelude(who);
  if (!p.sit) { p.dir = ana.x < p.x ? 3 : 1; if (Math.abs(ana.y - p.y) > Math.abs(ana.x - p.x)) p.dir = ana.y < p.y ? 0 : 2; }
  if (!ana.sit) ana.dir = p.x < ana.x ? 3 : 1;
  let text;
  if (game.saidS[who] !== seasonCount() && SEASON_LINES[who][S]) { game.saidS[who] = seasonCount(); text = SEASON_LINES[who][S]; }
  else { const L = LINES[who]; text = L.length ? L[game.said[who] = ((game.said[who] ?? -1) + 1) % L.length] : dicho('sin_nada_que_decir', { nombre: NAMES[who] || 'Le' }); }   // (said all they had today: no repeating)   // (only the lines that hold now: not as if they knew her before they do)
  if (pre.some(x => x.startsWith('Ana cumplió'))) text = dicho('gracias_encargo') + ' ' + text;
  if (who !== 'diana' && !conoceA(who)) { face(who); const L = presentar(who); return talkPlay(L.map(l => [l.q, l.t]), { ch: 'presenta', hold: [who] }); }   // (they have not met: first, who they are)
  if (who === 'diana' && !conoceDiana()) { const L = cadenaEncuentro('diana'); if (L) return say('diana', L.map(l => (l.q === 'ana' ? 'Ana: ' : '') + l.t).join('\n'), [['…', close]]); }   // (they have not met: the meeting of the book, not a friend's greeting)
  if (who === 'diana' && dlgHechos().prohibida) return say('diana', dicho('diana_prohibida'), [['…', close]]);   // (forbidden, cap. 17)
  // first, what to talk about (each topic a scene, had once: src/datos/conversaciones.txt, and the night writes new ones
  // when they run out); then what there is to do with them
  const opts = [...convOpciones(who), ...taskOptions(who), ...cadenaOpciones(who)];
  for (const [k, [name]] of Object.entries(GIFTS)) if (game.inv[k] > 0) opts.push(['Regalar ' + name, () => give(who, k)]);
  opts.push(...entregaOpciones(who), ...cartaEncargoOpciones(who));   // (and what Ana brings for the house: the wood, the eggs…)
  if (!isQuieto(who) || who === 'marilla') opts.push(['🙏 Pedirle un favor', () => favorMenu(who)]);
  opts.push(...walkOption(who), [cierre(who), close]);
  say(who, text, opts);
}
// the conversations there are with them today (src/datos/conversaciones.txt): up to four in the menu, and the rest
// behind «Hablar de otra cosa…» (none hidden: what is not shown, the player cannot choose); volver: back to the menu
const CONV_MENU = 4;
const convOpciones = (who, volver = () => talk(who, true)) => {
  const C = convDisponibles(who), V = (game.wm || game).temasVistos ||= {}, n = C.length > CONV_MENU ? CONV_MENU - 1 : CONV_MENU;
  for (const d of C.slice(0, n)) { const v = V[d.id] ||= { n: 0, d: 0 }; if (v.d !== today() + 1) { v.n++; v.d = today() + 1; } }   // (in sight in the menu, one day more: what she lets pass, the night reads it, src/js/66-noche.js)
  const op = d => [(d.ia && (V[d.id]?.n || 0) <= 1 ? '✨ ' : '💬 ') + d.tema, () => { close(); conversar(d); }];   // (✨: new, written last night, the first day it is offered)
  return [...C.slice(0, n).map(op), ...(C.length > n ? [['💬 Hablar de otra cosa… (' + (C.length - n) + ')', () => say(who, dicho('hablar_de_que'), [...C.slice(n).map(op), ['← Volver', volver]])]] : [])];
};
// closing the menu is not leaving: «Adiós» only when it is really a goodbye
const cierre = who => 'Nada por ahora';
function face(who){
  const p = PEOPLE[who];
  if (!p.sit) { p.dir = ana.x < p.x ? 3 : 1; if (Math.abs(ana.y - p.y) > Math.abs(ana.x - p.x)) p.dir = ana.y < p.y ? 0 : 2; }
  if (!ana.sit) ana.dir = p.x < ana.x ? 3 : 1;
}
// walking with Diana (the game decides it)
function walkOption(who){
  if (who !== 'diana' || !dianaAmiga()) return [];
  const tarde = hourNow() >= 18;   // (a goodbye for the hour: «hasta mañana» only in the evening)
  return [diana.follow ? [tarde ? 'Hasta mañana, Diana' : 'Nos vemos, Diana', () => { diana.follow = false; logEv('Ana y Diana terminaron su paseo.'); save(); say(who, tarde ? dicho('paseo_fin_tarde') : dicho('paseo_fin'), [[tarde ? 'Buenas noches' : 'Hasta luego', close]]); }]
    : ['¿Paseamos juntas?', () => { diana.follow = true; game.fond.diana = Math.min(5, game.fond.diana + 1); logEv('Ana y Diana salieron a pasear juntas.'); save(); say(who, dicho('paseo_si'), [['¡Vamos!', close]]); }]];
}
