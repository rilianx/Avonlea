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
// what Ana can tell Marilla (the player's way: from her menu)
function cadenaOpciones(who){
  const o = [];
  if (who === 'marilla' && !dlgHechos().pide_amiga && !conoceDiana()) o.push(['Contarle que quieres una amiga del alma', () => { close(); dlgHecho('pide_amiga'); }]);
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
