/* ---------- whom Ana knows, and how she meets them ----------
   Ana arrives in Avonlea knowing only Matthew, Marilla and the Sra. Spencer (who brought her). Everyone else she meets
   once: the first time they speak, they introduce themselves (who they are, «Ana con una sola n»), and from then on
   they know each other (the fact conoce_<who>; «conoce:<who>» in the script). Some meet as the book tells it: Diana
   at Orchard Slope, the Sra. Barry when Marilla takes her, the Sra. Lynde when she comes (CONOCE_POR: those facts
   count too). Until then, no one calls her by her name (a line with «Ana» in it is not said) nor speaks as if they
   had known her (the lines that need something past say so: «[cuaderno:escuela] …»). Someone with no name of their
   own («un vecino») says hello as to anyone.
   Nor does anyone know the Cuthberts have a girl until they are told: it is news (src/datos/noticias.txt,
   nina_cuthbert), and those who had not heard are surprised. */
const CONOCE_BASE = ['marilla', 'matthew', 'spencer'];
const CONOCE_POR = { diana: 'hecho:conocidas_diana', barry: 'hecho:barry_presenta', lynde: 'hecho:lynde_visita', stacy: 'cuaderno:escuela', gilbert: 'cuaderno:escuela', sraallan: 'cuaderno:escuela_dominical', josephine: 'hecho:cama_josephine' };
const sinF = k => String(k).replace(/^f:/, '');
// a game from before all this (Ana already stays, she has lived in Avonlea a while): everyone knows her
const conoceTodos = () => !dlgHechos().inicio_juego && !!dlgHechos().se_queda;
function conoceA(k){ k = sinF(k); return CONOCE_BASE.includes(k) || conoceTodos() || !!dlgHechos()['conoce_' + k] || (!!CONOCE_POR[k] && dlgCond(CONOCE_POR[k], dlgCtx())); }
const sinNombre = k => /^(un|una) /.test(FOLKBY[sinF(k)]?.def.name || '');   // («un vecino»: no one to get to know)
// the lines of someone who does not know Ana yet: none that call her by her name
const lineasAjenas = (k, L) => conoceA(k) ? L : L.filter(t => !/\b(Ana|Shirley)\b/.test(t));
// the first time: who they are, and who she is. Their own (personajes.json «presentacion», or «presenta» of the
// people of the village), or, if not, as a grown-up or a child greets the new girl of Green Gables
function presentacion(k){
  k = sinF(k); const f = FOLKBY[k], q = f ? 'f:' + k : k, nombre = f ? f.def.name : CH[k]?.article + NAMES[k], kid = isKid(k);
  const sabe = sabeK(k, 'nina_cuthbert');   // (they had heard there is a girl at Green Gables, or not)
  const propia = f ? f.def.presenta : CH[k]?.presentacion; if (propia && sabe) return propia.map(([w, t]) => ({ q: w === 'ana' ? 'ana' : q, t: t.replace(/Buenos días|Buenas tardes|Buenas noches/, saludoHora()) }));   // (the greeting, as the hour is)
  const hi = saludoHora(), yo = nombre.replace(/^(el|la) /, m => m), corto = nombre.replace(/^(el|la) (Sr\.|Sra\.|Srta\.|reverendo) /, '').split(' ')[0];
  const señ = /^la /.test(nombre) || /Sra|Srta/.test(nombre) ? 'señora' : 'señor';
  if (!sabe) {   // (they did not know: a girl they have never seen, and the news, from her own mouth)
    if (sinNombre(k)) return [{ q, t: hi + ', niña. No te había visto nunca por aquí. ¿De quién eres?' }, { q: 'ana', t: 'De Tejas Verdes. Soy Ana Shirley, con una sola n.' }, { q, t: '¿De Tejas Verdes? ¡No sabía que los Cuthbert tenían una niña!' }];
    if (kid) return [{ q, t: '¡Hola! Nunca te había visto. ¿Cómo te llamas?' }, { q: 'ana', t: 'Ana Shirley, con una sola n. Vivo en Tejas Verdes, con Matthew y Marilla Cuthbert.' }, { q, t: ['¿Con los Cuthbert? ¡Pero si son viejísimos! ', '¿Con Matthew Cuthbert, el que no habla? ', '¡Nadie me había contado nada! '][corto.length % 3] + 'Yo soy ' + corto + '.' }];
    return [{ q, t: hi + '. No te había visto nunca por aquí. ¿De quién eres, niña?' }, { q: 'ana', t: 'Soy Ana Shirley, ' + señ + ', con una sola n. Vivo en Tejas Verdes, con Matthew y Marilla Cuthbert.' }, { q, t: '¿Con los Cuthbert? ¡Vaya! No sabía que tenían una niña. Mucho gusto, Ana. Yo soy ' + yo + '.' }];
  }
  if (sinNombre(k)) return [{ q, t: hi + ', niña. ¿Tú eres la que trajeron los Cuthbert?' }, { q: 'ana', t: 'Sí. Ana Shirley… Ana con una sola n.' }];
  if (kid) return [{ q, t: '¿Tú eres la niña nueva de Tejas Verdes? Yo soy ' + corto + '.' }, { q: 'ana', t: 'Ana Shirley. Ana con una sola n, por favor. ¡Mucho gusto!' }];
  return [{ q, t: hi + '. ¿Tú eres la niña que trajeron los Cuthbert?' }, { q: 'ana', t: 'Sí, ' + señ + '. Ana Shirley… con una sola n, por favor.' }, { q, t: 'Mucho gusto, Ana. Yo soy ' + yo + '.' }];
}
// they meet: the lines, and from now on they know each other
function conocer(k){ k = sinF(k); if (conoceA(k) || sinNombre(k)) return; dlgHecho('conoce_' + k); logEv('Ana conoció a ' + (FOLKBY[k]?.def.name || CH[k]?.article + NAMES[k]) + '.', []); }
function presentar(k){ const L = presentacion(k); conocer(k); presentarseNoticias(k); return L; }   // (and now they know what she tells of herself: that she lives at Green Gables)
