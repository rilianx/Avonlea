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
const CONOCE_POR = { diana: 'hecho:conocidas_diana', barry: 'hecho:barry_presenta', lynde: 'hecho:lynde_visita', josephine: 'hecho:cama_josephine' };
const sinF = k => String(k).replace(/^f:/, '');
// a game from before all this (Ana already stays, she has lived in Avonlea a while): everyone knows her
const conoceTodos = () => !dlgHechos().inicio_juego && !!dlgHechos().se_queda;
function conoceA(k){ k = sinF(k); return CONOCE_BASE.includes(k) || conoceTodos() || !!dlgHechos()['conoce_' + k] || (!!CONOCE_POR[k] && dlgCond(CONOCE_POR[k], dlgCtx())); }
const sinNombre = k => /^(un|una) /.test(FOLKBY[sinF(k)]?.def.name || '');   // («un vecino»: no one to get to know)
// the lines of someone who does not know Ana yet: none that call her by her name
const lineasAjenas = (k, L) => conoceA(k) ? L : L.filter(t => !/\b(Ana|Shirley)\b/.test(t.replace(/\([^)]*\)/g, '')));   // (a stage direction «(Mira a Ana…)» is not saying her name)
// the first time: who they are, and who she is. Their own (personajes.json «presentacion», or «presenta» of the
// people of the village), or, if not, as a grown-up or a child greets the new girl of Green Gables
function presentacion(k){
  k = sinF(k); const f = FOLKBY[k], q = f ? 'f:' + k : k, nombre = f ? f.def.name : CH[k]?.article + NAMES[k], kid = isKid(k);
  const sabe = sabeK(k, 'nina_cuthbert');   // (they had heard there is a girl at Green Gables, or not)
  const propia = f ? f.def.presenta : CH[k]?.presentacion; if (propia && sabe) return propia.map(([w, t]) => ({ q: w === 'ana' ? 'ana' : q, t: t.replace(/Buenos días|Buenas tardes|Buenas noches/, saludoHora()) }));   // (the greeting, as the hour is)
  const hi = saludoHora(), yo = nombre.replace(/^(el|la) /, m => m), corto = nombre.replace(/^(el|la) (Sr\.|Sra\.|Srta\.|reverendo) /, '').split(' ')[0];
  const señ = /^la /.test(nombre) || /Sra|Srta/.test(nombre) ? 'señora' : 'señor';
  // (the lines: src/datos/dichos/40-gente.txt, «presenta:<caso>:1», «:2»… in order, as many as there are; if they did
  // not know, a girl they have never seen, and the news from her own mouth: «nueva_…»; if they had heard, «sabe_…». A
  // line may come in variants by the length of the name, «…:3:0», «…:3:1», «…:3:2»: always the same one for the same one)
  const caso = (sabe ? 'sabe_' : 'nueva_') + (sinNombre(k) ? 'vecino' : kid ? 'nino' : 'adulto'), v = { hola: hi, yo, corto, senor: señ }, out = [];
  for (let i = 1; ; i++) {
    const m = 'presenta:' + caso + ':' + i, alt = m + ':' + corto.length % 3, d = dichoElegir(DICHOS_DE[alt] ? alt : m, v); if (!d) break;
    out.push({ q: d.q === 'ana' ? 'ana' : q, t: d.t });
  }
  return out;
}
// they meet: the lines, and from now on they know each other
function conocer(k){ k = sinF(k); if (conoceA(k) || sinNombre(k)) return; dlgHecho('conoce_' + k); logEv('Ana conoció a ' + (FOLKBY[k]?.def.name || CH[k]?.article + NAMES[k]) + '.', []); }
// a presentation cut short (Ana walked on before saying who she is): they have not met after all
function desconocer(k){ k = sinF(k); delete dlgHechos()['conoce_' + k]; const C = game.wm?.creencias?.[k]; for (const n of NOTICIAS) if (n.alConocer && C?.[n.id]?.de === 'ana') { delete C[n.id]; const K = game.wm.know?.[k]; if (K?.includes(n.id)) K.splice(K.indexOf(n.id), 1); } }
function presentar(k){ const r = reaccionAlVerla(sinF(k)), L = presentacion(k); conocer(k); presentarseNoticias(k); if (r) L.unshift({ q: L[0]?.q || k, t: r }); return L; }   // (and if she is in a nightgown, at night…: that first, it is the first thing they see)   // (and now they know what she tells of herself: that she lives at Green Gables)
