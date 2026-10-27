// Los actos de habla (docs/LENGUAJE.md §7). Decir algo es un verbo: quien lo dice (el primer parámetro), a quién, y sus
// efectos. Precondición común: que el otro oiga. El texto es su voz (voces.yarn) o la línea de la escena que lo lleva
// («srapye: Flaca como un palo… #ofender:ana»). Una línea sin acto es «comentar»: solo voz, sin efectos.
import { acto, intentos, y, type Llamada } from './lenguaje'
import { oye, type Persona } from './mundo'
import { cualidad, type Noticia } from './estado'

// (un pedido: a decide si lo hace. Si a es Ana, la jugadora: el juego le ofrece hacerlo —«Ir con Marilla», «Subir a la
// calesa»— o no —«Todavía no»—; si no contesta en un minuto, es no. Ana sola, o los demás, responden según comun/ana.ts.
// Se pide estando juntos: para pedirle algo a alguien que está lejos, primero hay que ir a buscarlo)
export const pedir = acto('pedir', (quien: Persona, a: Persona, v: Llamada) => ({
  pide: oye(a, quien),
  pedido: { a, hace: v, espera: '1m' },
  cuesta: 1,
}))

// (más firme: solo después de pedirlo una vez; cuesta más, porque gasta paciencia)
export const ordenar = acto('ordenar', (quien: Persona, a: Persona, v: Llamada) => ({
  pide: y(oye(a, quien), intentos.gte(1)),
  pedido: { a, hace: v, espera: '30s' },
  cuesta: 3,
}))

export const informar = acto('informar', (_quien: Persona, a: Persona, n: Noticia) => ({
  deja: [{ e: 'deja', camino: ['sabe', a, n] }],
}))

export const ofender = acto('ofender', (quien: Persona, a: Persona) => ({
  deja: [cualidad(a, 'afecto', quien).suma(-1)],
}))

export const disculparse = acto('disculparse', (quien: Persona, a: Persona) => ({
  deja: [cualidad(a, 'afecto', quien).suma(0.5)],
}))

export const comentar = acto('comentar', (_quien: Persona) => ({}))
