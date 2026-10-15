/* ---------- the chains of the book, in the game (docs/CADENAS.md): what has to happen before something else can ----------
   The goals and what closes their actions are in the notebook (src/datos/cuaderno.txt); the scenes, in the script
   (src/datos/guion.txt). Here what joins them to the people: the first chain, to know Diana (cap. 8 and 12).
   - Ana does not know Diana at the start: Diana does not greet her as a friend, does not walk with her, the stories of
     the day with Diana wait, and the talks of the two of them too.
   - Ana tells Marilla she wants a friend of the soul (from Marilla's menu: the scene quiere_amiga).
   - The next day, in the afternoon, Marilla goes to Orchard Slope and takes Ana (her agenda, below); there Mrs. Barry
     receives them and calls Diana (the scenes barry_recibe and conoce_diana).
   - If they meet before by chance, they meet (the encounter diana_por_casualidad), but caring less for each other. */
const conoceDiana = () => !!dlgHechos().conocidas_diana;
// Diana as a friend: they know each other and Mrs. Barry has not forbidden it (cap. 16 to 18)
const dianaAmiga = () => conoceDiana() && !dlgHechos().prohibida;
// what Ana can tell Marilla (the player's way: from her menu)
function cadenaOpciones(who){
  const o = [];
  if (who === 'marilla' && dlgHechos().se_queda && !dlgHechos().pide_amiga && !conoceDiana()) o.push(['Contarle que quieres una amiga del alma', () => { close(); dlgHecho('pide_amiga'); }]);
  // (cap. 16: Diana to tea at Green Gables, once they have been friends a while; Ana prepares it and serves the «cordial»)
  if (who === 'diana' && dianaAmiga() && cuadernoHecho('amigas') && dlgCond('dias_desde:conocidas_diana:5', dlgCtx()) && relGetW('diana', 'ana') >= 5 && !activeGoals(agentOf('ana')).some(g => g.goal.kind === 'te_con')) o.push(['Invitarla a tomar el té en Tejas Verdes', () => { close(); agentStart('ana', G.te_con('ana', 'diana', 'cocina'), { favors: [{ f: 'venir', to: 'diana', lugar: 'cocina' }], label: 'invitar a Diana a tomar el té en Tejas Verdes (cap. 16)' }); notice('📜 Ana va a invitar a Diana a tomar el té, y a prepararlo.'); }]);
  return o;
}
// Marilla, the day after, in the afternoon: to Orchard Slope, with Ana
AGENDA.push({ who: 'marilla', from: 14, to: 17.5, label: 'llevar a Ana a La Cuesta del Huerto, a conocer a Diana (cap. 12)',
  when: () => dlgCond('dias_desde:quiere_amiga:1', dlgCtx()) && !conoceDiana() && !dlgHechos().barry_presenta,
  goal: () => ({ ...G.paseo('marilla', 'ana', 'h:os', 15), chat: null, sale: true, text: 'Marilla lleva a Ana a La Cuesta del Huerto' }),
  favors: [{ f: 'pasear', to: 'ana', dice: 'Ana, voy a La Cuesta del Huerto a devolverle un patrón a la Sra. Barry. Ven conmigo: así conoces a Diana. Y pórtate bien.' }] });
// meeting Diana before knowing her, by chance: the encounter of the script (once); and no talk as friends before that
function cadenaEncuentro(k){
  if (k !== 'diana' || conoceDiana()) return null;
  return dlgNext(['ana', 'diana']);
}
// the visit of the Allans to Green Gables, a few days after Marilla invited them (cap. 21: the cake with liniment)
AGENDA.push({ who: 'sraallan', from: 15, to: 17.5, label: 'tomar el té en Tejas Verdes, invitada por Marilla (cap. 21)',
  when: () => dlgCond('dias_desde:allan_invitados:3', dlgCtx()) && !dlgHechos().pastel_linimento, goal: () => G.visitar('sraallan', 'marilla') });
// Minnie May with croup, a good while after the prohibition (in the book, months): Diana runs to Green Gables for Ana, in the evening (cap. 18)
AGENDA.push({ who: 'diana', from: 18.5, to: 22, prio: 3, label: 'correr a Tejas Verdes: Minnie May tiene crup (cap. 18)',
  when: () => !!dlgHechos().prohibida && dlgCond('dias_desde:prohibida:12', dlgCtx()) && !dlgHechos().crup, goal: () => ({ ...G.estar_en('diana', 'cocina'), quedarMin: 30 }) });
// Mrs. Rachel comes to see the girl, a fortnight after she came, as in the book (cap. 9: «Anne had been a fortnight at
// Green Gables before Mrs. Lynde arrived»): a scene with choices (lynde_visita)
AGENDA.push({ who: 'lynde', from: 15, to: 17.5, label: 'ir a Tejas Verdes a ver a la niña nueva (cap. 9)',
  when: () => !!dlgHechos().se_queda && dlgCond('dias_desde:llegada_tv:14', dlgCtx()) && !dlgHechos().lynde_visita, goal: () => G.visitar('lynde', 'marilla') });
// a letter received makes the friendship grow (a little: at most so much); to aunt Josephine, once she is a friend
// whom Ana can write to: only someone she has met by now (the Sra. Spencer, who brought her, from the very start)
const CARTA_CONOCE = { diana: 'hecho:conocidas_diana', stacy: 'cuaderno:escuela', sraallan: 'cuaderno:escuela_dominical', josephine: 'hecho:cama_josephine' };
const cartaPuede = k => !CARTA_CONOCE[k] || dlgCond(CARTA_CONOCE[k], dlgCtx());
function cartaAfecto(k){ const b = { diana: 'diana', stacy: 'stacy', sraallan: 'sraallan', josephine: 'josephine' }[k]; if (b) relSetW(b, 'ana', Math.min(5, relGetW(b, 'ana') + 1)); }
// time together: a friend one sees often is a friend one loves more (half an hour near Diana in a day: +1, once a day)
let juntasT = 0;
function juntasTick(dt){
  if ((juntasT -= dt) > 0) return; juntasT = 5;
  if (!dianaAmiga() || wmScene('diana') !== game.scene || dist(diana.x, diana.y, ana.x, ana.y) > 160) return;
  const J = game.wm.juntas?.d === today() ? game.wm.juntas : (game.wm.juntas = { d: today(), s: 0, dado: false });
  J.s += 5; if (!J.dado && J.s >= M(30)) { J.dado = true; relSetW('diana', 'ana', Math.min(5, relGetW('diana', 'ana') + 1)); relSetW('ana', 'diana', Math.min(5, relGetW('ana', 'diana') + 1)); }
}

