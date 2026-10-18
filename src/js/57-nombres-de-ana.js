/* ---------- the names Ana gives to things: the book's, or the player's own ----------
   When Ana names something (the Avenue, Barry's pond, the cherry tree at her window, the places of Avonlea), the
   player chooses: the name of the book, or one of their own, written in a box. From then on the thing is called so
   everywhere (what is said, the log, the map, the signs): it is Ana's name for it. What stays is
   the name, and the fact nombro_<thing> (with nombre_propio_<thing> if it is not the book's), for the script.
   In a scene: «-> Otro nombre…» with «! nombrar lago ?» (the box), or «! nombrar lago» (the book's). */
const NOMBRABLES = {
  avenida: { libro: 'el Camino Blanco de las Delicias', que: 'la Avenida, el túnel de manzanos en flor' },
  lago: { libro: 'el Lago de las Aguas Brillantes', que: 'la laguna de Barry' },
  cerezo: { libro: 'la Reina de las Nieves', que: 'el cerezo de su ventana' },
  huerta: { libro: 'el Valle de las Violetas', que: 'el valle junto a la huerta' },
  arbustos: { libro: 'el Sendero de los Abedules', que: 'el sendero de los arbustos', alias: ['Senda de los Abedules'] },
  bosque_peg: { libro: 'el Bosque Encantado', que: 'el bosque de abetos' },
  corral: { libro: 'Idlewild', que: 'el rincón de los árboles junto al corral' },
  senda: { libro: 'el Paseo de los Enamorados', que: 'el sendero entre los abedules', alias: ['Senda de los Enamorados'] },
  geranio: { libro: 'Bonny', que: 'el geranio de la ventana de la cocina' },
  burbuja: { libro: 'la Burbuja de la Dríade', que: 'el manantial del arroyo', alias: ['Burbuja de la Dríada', 'Burbujeo de las Dríadas'] },
};
const nombreArt = n => { const m = n.match(/^(el|la|los|las)\s+(.+)$/i); return m ? [m[1].toLowerCase(), m[2]] : ['', n]; };
const nombreMay = s => s ? s[0].toUpperCase() + s.slice(1) : s;
// what Ana calls it, with its article («el Lago de las Aguas Brillantes»): hers, or the book's
const nombreDe = id => game.wm?.nombres?.[id] || NOMBRABLES[id]?.libro || id;
// a name, given: kept as the player wrote it (the article in lower case, the name itself with a capital)
const nombreLimpio = n => { const [art, core] = nombreArt(String(n).trim().replace(/\s+/g, ' ').replace(/^[«"]|[»"]$/g, '')); return (art ? art + ' ' : '') + nombreMay(core); };
function nombrar(id, n){
  const c = NOMBRABLES[id]; if (!c) return;
  n = nombreLimpio(n || c.libro);
  (game.wm.nombres ||= {})[id] = n; dlgHecho('nombro_' + id); if (n !== c.libro) dlgHecho('nombre_propio_' + id);
  if (typeof NOMBRES_ANA !== 'undefined' && id in NOMBRES_ANA) game.wm.perm['nombre:' + id] = 1;
  if (typeof mapBase !== 'undefined') mapBase = null;
  logEv('Ana bautizó ' + c.que + ': ' + n + '.', []);
}
// every text, with Ana's names in place of the book's (keeping «del», «al» and the capital at the start)
function conNombres(s){
  const N = game?.wm?.nombres; if (!N || typeof s !== 'string' || !s) return s;
  for (const [id, n] of Object.entries(N)) {
    const c = NOMBRABLES[id]; if (!c || n === c.libro) continue;
    c.re ||= new RegExp('(\\b(?:[Ee]l|[Ll]a|[Ll]os|[Ll]as|[Dd]el|[Aa]l)\\s+)?(?:' + [nombreArt(c.libro)[1], ...(c.alias || [])].map(x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'g');
    const [art, core] = nombreArt(n);
    s = s.replace(c.re, (m, p) => {
      if (!p) return core;   // (as a label, or «el cerezo Reina de las Nieves»)
      const P = p.trim().toLowerCase(), r = (P === 'del' ? (art === 'el' ? 'del ' : 'de ' + (art ? art + ' ' : '')) : P === 'al' ? (art === 'el' ? 'al ' : 'a ' + (art ? art + ' ' : '')) : art ? art + ' ' : '') + core;
      return p[0] !== p[0].toLowerCase() ? nombreMay(r) : r;
    });
  }
  return s;
}
// the player chooses the name: the book's, or one of their own; with no one to ask, or if no one answers (Ana on her
// own), the book's
function nombrarElegir(id, listo){
  const c = NOMBRABLES[id]; let ya = false; const una = n => { if (ya) return; ya = true; close(); listo(n); };
  if (navigator.webdriver || ana.hidden || menuOpen()) return listo(c.libro);
  say('ana', ('¿Cómo llama Ana a ' + c.que + '?').replace(/\ba el /, 'al '), [[nombreMay(c.libro), () => una(c.libro)], ['✎ Otro nombre…', () => { ya = true; pedirNombre(id, listo); }]]);
  if (auto.on) setTimeout(() => una(c.libro), 10000);
}
// the box to write it in
function pedirNombre(id, listo){
  const c = NOMBRABLES[id], box = $('talk'); let ya = false;
  const ok = v => { if (ya) return; v = (v || '').trim(); if (!v) return inp.focus(); ya = true; close(); listo(nombreLimpio(v)); };
  say('ana', ('Ana le pone nombre a ' + c.que + '. ¿Cuál?').replace(/\ba el /, 'al '), [['✎ Ese', () => ok(inp.value)], ['Mejor ' + c.libro, () => ok(c.libro)]]);
  const inp = document.createElement('input'); inp.type = 'text'; inp.maxLength = 48; inp.placeholder = 'por ejemplo: ' + nombreMay(c.libro); inp.className = 'nombre-in';
  inp.style.cssText = 'display:block;width:calc(100% - 8px);margin:6px 0;padding:5px 7px;font:inherit;border:1px solid #6b4a30;border-radius:6px;background:#fffaf0;color:#3b2a1c';
  inp.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter') ok(inp.value); if (e.key === 'Escape') ok(c.libro); });
  inp.addEventListener('click', e => e.stopPropagation());
  box.querySelector('.opts').before(inp); setTimeout(() => inp.focus(), 30);
}
