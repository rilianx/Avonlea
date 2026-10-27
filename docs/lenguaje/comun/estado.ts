// El estado común a todas las historias (docs/LENGUAJE.md §4): lo que una historia deja para otras.
// Los hechos que solo le importan a una historia no van aquí: son locales a ella (historias/<nombre>/historia.ts).
import { accesoCualidad, accesoEstado, hechosDe } from './lenguaje'
import type { Persona } from './mundo'

export const estados = {
  ana_en_tv: {
    titulo: 'Ana en Tejas Verdes',
    orden: ['llegando', 'en_prueba', 'decidida', 'se_queda'],   // una escala: se compara con lt, gte…
    otros: ['devuelta'],                                        // fuera de la escala: solo es / no_es
    inicial: 'llegando',
  },
} as const
export const estado = accesoEstado(estados)

export const cualidades = {
  paciencia: { titulo: 'la paciencia de Marilla con Ana', de: 'marilla', hacia: 'ana', rango: [0, 5], inicial: 3 },
  afecto: { titulo: 'cuánto quiere uno a otro', de: 'todos', hacia: 'todos', rango: [0, 5], inicial: 0 },
} as const
export const cualidad = accesoCualidad<Persona>()(cualidades)

export const hechos = hechosDe('comun', {
  llego: 'Ana llegó a Tejas Verdes con Matthew (lo deja la historia de la llegada)',
  primera_noche: 'Ana pasó su primera noche en Tejas Verdes',
  conoce_blewett: 'Ana conoce a la Sra. Blewett',
})

export const noticias = {
  equivocacion: 'los Cuthbert pidieron un niño, y les mandaron una niña',
} as const
export type Noticia = keyof typeof noticias
