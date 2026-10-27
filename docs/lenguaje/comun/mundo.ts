// El mundo: quiénes, dónde, por dónde y en qué (docs/LENGUAJE.md §3). Común a todas las historias.
// (Solo lo que usa el ejemplo de White Sands; el juego entero declara aquí a toda Avonlea.)
import { Campo, funcion } from './lenguaje'

export const personas = {
  ana: 'Ana',
  marilla: 'Marilla',
  matthew: 'Matthew',
  spencer: 'la Sra. Spencer',
  blewett: 'la Sra. Peter Blewett',
  srapye: 'la Sra. Pye',
} as const
export type Persona = keyof typeof personas

export const lugares = {
  tejas_verdes: { nombre: 'Tejas Verdes' },
  cocina: { nombre: 'la cocina de Tejas Verdes', dentro: 'tejas_verdes' },
  corral: { nombre: 'el corral de Tejas Verdes', dentro: 'tejas_verdes' },
  hondonada_lynde: { nombre: 'la Hondonada de Lynde' },
  escuela: { nombre: 'la escuela' },
  aldea: { nombre: 'la aldea de Avonlea' },
  playa: { nombre: 'la playa, junto al hotel White Sands' },
  orilla: { nombre: 'la orilla del mar', cerca: 'playa' },
  hotel_white_sands: { nombre: 'el hotel White Sands' },
  estacion_bright_river: { nombre: 'la estación de Bright River' },
  camino_blanco: { nombre: 'la Avenida (el Camino Blanco de las Delicias)' },
  newbridge: { nombre: 'Newbridge' },
  estanque_barry: { nombre: 'el estanque de los Barry (el Lago de las Aguas Brillantes)' },
} as const
export type Lugar = keyof typeof lugares

// (en orden: así pasa la calesa, medido sobre el mapa; de vuelta, al revés)
export const rutas = {
  costa: ['tejas_verdes', 'hondonada_lynde', 'escuela', 'aldea', 'playa', 'hotel_white_sands'],
  bright_river: ['estacion_bright_river', 'camino_blanco', 'newbridge', 'estanque_barry', 'tejas_verdes'],
} as const satisfies Record<string, readonly Lugar[]>
export type Ruta = keyof typeof rutas

export const medios = {
  calesa: { nombre: 'la calesa', es: 'la calesa de Marilla, con la yegua alazana', lleva: 2, se_guarda_en: 'corral' },
} as const satisfies Record<string, { nombre: string; es: string; lleva: number; se_guarda_en: Lugar }>
export type Medio = keyof typeof medios

// dónde está cada uno, en qué va, a quién sigue, cómo anda vestida
export const mundo = (quien: Persona) => ({
  lugar: new Campo<Lugar>(['mundo', quien, 'lugar']),
  en: new Campo<Medio | 'nada'>(['mundo', quien, 'en']),
  sigue: new Campo<Persona | 'nadie'>(['mundo', quien, 'sigue']),
  ropa: new Campo<'vestida' | 'camison'>(['mundo', quien, 'ropa']),
})
export const medio = (m: Medio) => ({
  lugar: new Campo<Lugar>(['mundo', m, 'lugar']),
  listo: new Campo<'si' | 'no'>(['mundo', m, 'listo']),
})
// las paradas de una ruta entre dos lugares, en el sentido que corresponda
export const tramo = (por: Ruta, desde: Campo<Lugar> | Lugar, hasta: Lugar): { readonly lista: string; readonly _de?: Lugar } => ({ lista: 'tramo', por, desde, hasta } as never)

// lo que el mundo calcula y el estado no guarda: la única salida a código, a la vista
export const ve = funcion<[quien: Persona, otro: Persona]>('ve')     // quien ve a otro (la misma pieza, o cerca afuera)
export const oye = funcion<[quien: Persona, otro: Persona]>('oye')   // quien oye a otro (la misma pieza, o a unos pasos)
export const sola = funcion<[quien: Persona]>('sola')                // no hay nadie más donde está
