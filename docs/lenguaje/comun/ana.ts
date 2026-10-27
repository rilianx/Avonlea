// Ana es la jugadora (docs/LENGUAJE.md §7.1): lo que le piden los demás es una pregunta para ella —hacerlo o no—, y
// sus respuestas son momentos de las historias («ana rechaza pedir»). Aquí, cómo responde cuando va sola (sin
// jugadora, o si la jugadora no contesta y el juego la deja seguir por su cuenta), por acto: una condición sobre quién
// lo pide.
import { respuestas } from './lenguaje'
import { cualidad } from './estado'

export const ana_sola = respuestas({
  pedir: quien => cualidad('ana', 'afecto', quien).gte(2),   // a quien quiere, le hace caso; si no, se hace la distraída
  ordenar: () => true,                                        // una orden, sola, la cumple
})

// (cómo se le ofrece a la jugadora el no, en cualquier pedido)
export const opcion_no = 'Todavía no'
