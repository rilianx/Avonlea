// El Camino Blanco de las Delicias: lo que pasa cada vez que Ana pasa por la Avenida, el túnel de manzanos en flor
// (capítulo 2). Es una historia de fondo: empieza sola, no tiene encargos ni termina; solo escenas que se activan al
// pasar (escenas.yarn). Siempre es la misma idea: Ana corta lo que se esté diciendo (si había una conversación),
// exclama algo, se queda callada mientras pasan, y después dice algo. La primera vez, con Matthew, es la del libro; las
// otras, con otras palabras.
import { hechosDe, historia, y } from '../../comun/lenguaje'
import { escena } from './escenas.ids'

export const hechos = hechosDe('camino_blanco', {
  cb_nombre: 'Ana le puso a la Avenida «el Camino Blanco de las Delicias»',
})

export const camino_blanco = historia('camino_blanco', {
  titulo: 'El Camino Blanco de las Delicias (cada vez que Ana pasa por la Avenida)',
  empieza: y(),
  encarga: {},
  // (la primera que se pueda: la del libro, si va con Matthew; si no, una de las otras; y después, la de siempre)
  orden: [escena.cb_libro, escena.cb_otra_vez, escena.cb_sola, escena.cb_siempre],
})
