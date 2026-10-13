/* ---------- the notebook: what Ana could do (📖), as goals of the book, not as actions ----------
   For the player to know what there is: each goal with a hint of where or when (not the steps: those are hers to find),
   and ✓ with the day, once she has done it. It is checked by the same goals the planner uses (G), now and then; what was
   done stays (game.wm.perm). To add one: a line in CUADERNO. */
const CUADERNO = [
  ['Amistades', [
    ['amigas', 'Tener una amiga del alma', 'Diana Barry vive en La Cuesta del Huerto, al otro lado del arroyo. Una amistad así se jura.', () => G.amigas('ana', 'diana')],
    ['picnic', 'Ir de picnic con Diana', 'Al lago, con una canasta. Primero hay que pedirle permiso a Marilla.', () => G.picnic('ana', 'diana')],
    ['lynde', 'Visitar a la Sra. Lynde', 'Vive en la Hondonada, junto al camino; desde su ventana lo ve todo. Por la tarde está en casa.', () => G.visitar('ana', 'lynde')],
    ['paces', 'Hacer las paces con Gilbert Blythe', 'Le dijo «zanahorias». Él quiere disculparse… si Ana lo deja.', () => G.paces('ana', 'gilbert')],
    ['allan', 'Tomar el té con la Sra. Allan', 'La esposa del pastor vive en la casa parroquial, cerca de la iglesia. A veces invita.', null, () => AGENTS.ana?.acting?.v === 'tomar_te' && AGENTS.ana.acting.k === 'sraallan'],   // (sitting at her tea table, with her)
  ]],
  ['En Tejas Verdes', [
    ['quehaceres', 'Ayudar con los quehaceres', 'Lavar los platos, barrer… Marilla los pide, y se notan.', () => G.quehaceres('ana', ['platos', 'barrer'])],
    ['regalo', 'Hacerle un regalo a Marilla que le guste', 'A Marilla le gusta lo hecho a mano. Las flores de la huerta también alegran.', () => G.regalo_gusto('ana', 'marilla')],
    ['huerta', 'Sembrar y regar la huerta', 'Los canteros junto a la casa, con semillas y la regadera de la bomba.', () => G.huerta('ana')],
    ['rezo', 'Decir sus oraciones', 'Junto a su cama, en la pieza del alero.', () => G.rezo('ana')],
  ]],
  ['Libros y letras', [
    ['leido', 'Leer un libro de principio a fin', 'Diana presta libros. Un buen rincón: la silla junto a la ventana de la cocina.', () => G.leido('ana')],
    ['carta', 'Escribir una carta y mandarla', 'Se escribe en el escritorio de su pieza; el correo está en la tienda de Lawson.', () => G.carta('ana')],
    ['club', 'Escribir un cuento para el club de cuentos', 'Una historia trágica, con una dama de cabellos de oro… y leérsela a Diana.', () => G.club('ana')],
    ['recito', 'Recitar la lección en la escuela', 'Hay que estudiarla antes. La escuela está junto al río.', () => G.recito('ana')],
    ['concierto', 'Recitar en el concierto', 'En el salón del pueblo, en la aldea. Conviene ensayar.', () => G.concierto('ana')],
    ['sala', 'Decorar el salón para el concierto', 'Con flores de la huerta.', () => G.sala('ana')],
  ]],
  ['Al aire libre', [
    ['nombres', 'Ponerle nombre a tres lugares', 'Hay lugares que se merecen un nombre más bonito que el que tienen.', () => G.nombres('ana', 3)],
    ['sombrero', 'Adornar su sombrero con flores', 'Con un ramo de la huerta (Marilla no lo va a aprobar).', () => G.adornado('ana')],
    ['remo', 'Remar en el Lago de las Aguas Brillantes', 'El bote de los Barry está en el lago. En verano.', () => G.remo('ana')],
    ['patinar', 'Patinar en el lago helado', 'Solo en invierno.', () => G.patinar('ana')],
    ['trineo', 'Tirarse en trineo colina abajo', 'Solo en invierno, en la colina.', () => G.trineo('ana')],
  ]],
  ['Travesuras', [
    ['tinte', 'Teñirse el pelo de negro azabache', 'El buhonero vende un tinte que promete maravillas… y acepta huevos.', () => G.teñido('ana')],
    ['techo', 'Aceptar el desafío de Josie Pye', 'Caminar por el caballete del techo de los Barry. ¿Qué podría salir mal?', () => G.desafio('ana')],
  ]],
];
// what has been done: the day it was first done, as the game counts the days, from 1 (kept with the facts for good)
const cuadernoHecho = id => game.wm?.perm?.['cuaderno:' + id];
let cuadernoT = 0;
function cuadernoTick(dt){
  if ((cuadernoT -= dt) > 0 || !game.wm) return; cuadernoT = 2;
  let s = null;
  for (const [, metas] of CUADERNO) for (const [id, , , meta, hecho] of metas) {
    if (cuadernoHecho(id)) continue;
    let ok = false;
    if (hecho) ok = !!hecho();
    else { s ||= wmNow(); try { ok = meta().test(s); } catch (e) {} }
    if (ok) { game.wm.perm['cuaderno:' + id] = today() + 1; const t = CUADERNO.flatMap(([, m]) => m).find(m => m[0] === id)[1]; notice('📖 ✓ ' + t); logEv('Ana cumplió en su cuaderno: ' + t + '.', []); }
  }
}
function cuadernoPanel(open){
  const P = $('cua'); P.hidden = !open; if (!open) return;
  const todas = CUADERNO.flatMap(([, m]) => m), n = todas.filter(m => cuadernoHecho(m[0])).length;
  $('cuasub').textContent = n + ' de ' + todas.length + ' · ' + (n === todas.length ? '¡todo! Ana podría escribir un libro con esto.' : 'las que faltan tienen una pista');
  $('cualist').innerHTML = CUADERNO.map(([grupo, metas]) => '<h4>' + grupo + '</h4>' + metas.map(([id, titulo, pista]) => {
    const d = cuadernoHecho(id);
    return `<div class="cm${d ? ' hecha' : ''}"><b>${d ? '✓' : '○'} ${esc(titulo)}</b>${d ? `<span>el día ${d}</span>` : `<small>${esc(pista)}</small>`}</div>`;
  }).join('')).join('');
}
