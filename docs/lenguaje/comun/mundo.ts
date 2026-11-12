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
  diana: 'Diana',
} as const
export type Persona = keyof typeof personas
// cómo se ve cada uno en un dibujo (el tablero): su color
export const aspecto = {
  ana: { color: '#b8442f' }, marilla: { color: '#4f5d7a' }, matthew: { color: '#557a43' }, diana: { color: '#7a4f86' },
} as const satisfies { readonly [P in Persona]?: { readonly color: string } }

export const lugares = {
  tejas_verdes: { nombre: 'Tejas Verdes' },
  cocina: { nombre: 'la cocina de Tejas Verdes', dentro: 'tejas_verdes' },
  corral: { nombre: 'el corral de Tejas Verdes', dentro: 'tejas_verdes' },
  // (Tejas Verdes por dentro y por fuera: las vidas de todos los días, docs/lenguaje/vidas/)
  pieza: { nombre: 'la pieza de Ana, arriba', dentro: 'tejas_verdes' },
  pieza_marilla: { nombre: 'la pieza de Marilla', dentro: 'tejas_verdes' },
  pieza_matthew: { nombre: 'la pieza de Matthew', dentro: 'tejas_verdes' },
  sala: { nombre: 'la sala de Tejas Verdes', dentro: 'tejas_verdes' },
  despensa: { nombre: 'la despensa', dentro: 'tejas_verdes' },
  escalera: { nombre: 'la escalera', dentro: 'tejas_verdes' },
  pasillo: { nombre: 'el pasillo de arriba', dentro: 'tejas_verdes' },
  granero: { nombre: 'el granero', dentro: 'tejas_verdes' },
  gallinero: { nombre: 'el gallinero', dentro: 'tejas_verdes', icono: '🛖' },
  huerta: { nombre: 'la huerta', dentro: 'tejas_verdes', icono: '🥬' },
  campo: { nombre: 'el campo de heno' },
  cuesta_del_huerto: { nombre: 'La Cuesta del Huerto, la casa de los Barry' },
  iglesia: { nombre: 'la iglesia de Avonlea' },
  hondonada_lynde: { nombre: 'la Hondonada de Lynde' },
  escuela: { nombre: 'la escuela' },
  arbustos: { nombre: 'el Sendero de los Abedules (camino a la escuela, junto a Tejas Verdes)', icono: '🌳' },
  aldea: { nombre: 'la aldea de Avonlea' },
  camino_costa: { nombre: 'el camino de la costa, a White Sands (millas junto al mar)' },
  playa: { nombre: 'la playa de White Sands, junto al hotel' },
  orilla: { nombre: 'la orilla del mar', cerca: 'playa' },
  hotel_white_sands: { nombre: 'el hotel White Sands' },
  estacion_bright_river: { nombre: 'la estación de Bright River' },
  camino_blanco: { nombre: 'la Avenida (el Camino Blanco de las Delicias)' },
  newbridge: { nombre: 'Newbridge' },
  estanque_barry: { nombre: 'el estanque de los Barry (el Lago de las Aguas Brillantes)' },
} as const
export type Lugar = keyof typeof lugares

// LOS TABLEROS: alrededor de una casa, afuera, el mundo en cuadrantes del tamaño en que dos se ponen a conversar (en el
// juego, a menos de 120 px: están juntos). Cada cuadrante es de una zona —un lugar—: la que tiene un cerco en el juego
// (el corral), lo que cubre; los demás, la zona más cerca. El nombre de la zona es su cuadrante principal. Lo mide
// tools/mundo/exportar.js sobre el mapa del juego. «origen»: la esquina de arriba a la izquierda, en px del mapa
export type Tablero = { readonly origen: readonly [number, number]; readonly cols: number; readonly filas: number; readonly zonas: readonly Lugar[] }
export const tableros = {
  tejas_verdes: { origen: [1220, 4900], cols: 8, filas: 4, zonas: ['granero', 'gallinero', 'corral', 'arbustos', 'tejas_verdes', 'huerta'] },
} as const satisfies Record<string, Tablero>

// LOS PLANOS: una casa por dentro, sus piezas (en px, como el mapa: una pieza es del tamaño de una conversación, o poco
// más; cada una en su piso) y sus puertas (entre qué piezas, y dónde —para dibujarla—); y por dónde se sale, a qué zona
// de su tablero. Quien va de una pieza a otra pasa por las de en medio, como afuera por los cuadrantes
export type Plano = {
  readonly pisos: readonly string[]
  readonly piezas: { readonly [L in Lugar]?: { readonly piso: number; readonly en: readonly [number, number, number, number] } }
  readonly puertas: readonly (readonly [Lugar, Lugar, readonly [number, number]])[]
  readonly afuera: { readonly [L in Lugar]?: { readonly a: Lugar; readonly en: readonly [number, number] } }
}
export const planos = {
  // Tejas Verdes: abajo, la cocina —el corazón de la casa; su puerta da al patio—, la sala, la despensa y la escalera;
  // arriba, el pasillo y las piezas (la de Ana, la buhardilla del este)
  tejas_verdes: {
    pisos: ['abajo', 'arriba'],
    piezas: {
      despensa: { piso: 0, en: [0, 0, 110, 80] }, escalera: { piso: 0, en: [110, 0, 90, 80] },
      cocina: { piso: 0, en: [0, 80, 250, 160] }, sala: { piso: 0, en: [250, 0, 160, 240] },
      pieza_marilla: { piso: 1, en: [0, 0, 140, 110] }, pieza_matthew: { piso: 1, en: [0, 110, 140, 130] },
      pasillo: { piso: 1, en: [140, 0, 90, 240] }, pieza: { piso: 1, en: [230, 0, 160, 150] },
    },
    puertas: [['cocina', 'despensa', [55, 80]], ['cocina', 'escalera', [155, 80]], ['cocina', 'sala', [250, 160]], ['escalera', 'pasillo', [185, 20]],
      ['pasillo', 'pieza_marilla', [140, 55]], ['pasillo', 'pieza_matthew', [140, 175]], ['pasillo', 'pieza', [230, 75]]],
    afuera: { cocina: { a: 'tejas_verdes', en: [125, 240] } },
  },
} as const satisfies Record<string, Plano>

// (en orden: así pasa la calesa, medido sobre el mapa; de vuelta, al revés)
export const rutas = {
  costa: ['tejas_verdes', 'hondonada_lynde', 'escuela', 'aldea', 'camino_costa', 'playa', 'hotel_white_sands'],
  bright_river: ['estacion_bright_river', 'camino_blanco', 'newbridge', 'estanque_barry', 'tejas_verdes'],
} as const satisfies Record<string, readonly Lugar[]>
export type Ruta = keyof typeof rutas

export const medios = {
  calesa: { nombre: 'la calesa', es: 'la calesa de Marilla, con la yegua alazana', lleva: 2, se_guarda_en: 'corral' },
} as const satisfies Record<string, { nombre: string; es: string; lleva: number; se_guarda_en: Lugar }>
export type Medio = keyof typeof medios

// lo que Ana bautiza: el nombre del libro (la jugadora puede escribir otro; desde entonces se llama así en todas partes)
export const nombrables = {
  avenida: { libro: 'el Camino Blanco de las Delicias', que: 'la Avenida, el túnel de manzanos en flor' },
  lago: { libro: 'el Lago de las Aguas Brillantes', que: 'la laguna de Barry' },
} as const
export type Nombrable = keyof typeof nombrables

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
