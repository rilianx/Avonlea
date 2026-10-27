// Los verbos comunes (docs/LENGUAJE.md §6): lo que cualquiera puede hacer. Primitivos (los hace el mundo), por receta
// (fijos), por búsqueda (A* sobre el estado) y por mapa (A* sobre el mapa). El primer parámetro es siempre quien lo hace.
// Las etiquetas de los pasos son los momentos a los que se engancha una escena: el paso «playa» del paso «camino» del
// encargo «ida» es momento(white_sands.encargo.ida, 'camino.playa', 'cumplido').
import { busca, mapa, por_cada, por_cada_uno, primitivo, receta, type Campo, type Cond } from './lenguaje'
import { medio, mundo, tramo, type Lugar, type Medio, type Persona, type Ruta } from './mundo'
import { ordenar, pedir } from './actos'

// ---------------------------------------------------------------- primitivos

export const subir = primitivo('subir', (quien: Persona, m: Medio) => ({
  pide: mundo(quien).en.es('nada'),
  deja: [mundo(quien).en.vale(m)],
  dura: '10s',
}))

export const bajar = primitivo('bajar', (quien: Persona) => ({
  pide: mundo(quien).en.no_es('nada'),
  deja: [mundo(quien).en.vale('nada')],
  dura: '10s',
}))

export const enganchar = primitivo('enganchar', (_quien: Persona, m: Medio) => ({
  deja: [medio(m).listo.vale('si')],
  dura: '5m',
}))

export const tomar_de_la_mano = primitivo('tomar_de_la_mano', (quien: Persona, otro: Persona) => ({
  deja: [mundo(otro).sigue.vale(quien)],
  dura: '5s',
}))

export const soltar = primitivo('soltar', (quien: Persona, otro: Persona) => ({
  pide: mundo(otro).sigue.es(quien),
  deja: [mundo(otro).sigue.vale('nadie')],
  dura: '1s',
}))

// (no deja nada: se cumple cuando se cumple «hasta»)
export const esperar = primitivo('esperar', (_quien: Persona, hasta: Cond) => ({ pide: hasta }))

// ---------------------------------------------------------------- por mapa

// (un lugar, o donde está alguien ahora: mundo(otro).lugar)
type Destino = Lugar | Campo<Lugar>

// (si quien va en un medio, el medio va con él y con todos los que lleva; quien lo sigue, también)
export const ir_a = mapa('ir_a', (_quien: Persona, _a: Destino) => ({}))

// (deja el medio en que iba: si va en la calesa, primero salta)
export const correr_a = mapa('correr_a', (_quien: Persona, _a: Destino) => ({ paso: 'rapido' }))

// ---------------------------------------------------------------- por receta

export const traer = receta('traer', (quien: Persona, otro: Persona, a: Lugar) => ({
  pasos: {
    va: ir_a(quien, mundo(otro).lugar),
    toma: tomar_de_la_mano(quien, otro),
    vuelve: ir_a(quien, a),
    suelta: soltar(quien, otro),
  },
}))

export const esperar_en = receta('esperar_en', (quien: Persona, lugar: Lugar, hasta: Cond) => ({
  pasos: {
    va: ir_a(quien, lugar),
    espera: esperar(quien, hasta),
  },
}))

// (cada parada es un paso, con su nombre: en llevar_a, 'camino.hondonada_lynde', 'camino.escuela'…)
export const viajar = por_cada_uno('viajar', (quien: Persona, m: Medio, por: Ruta, a: Lugar) => ({
  pide: mundo(quien).en.es(m),
  pasos: por_cada(tramo(por, mundo(quien).lugar, a), (parada: Lugar) => ir_a(quien, parada)),
}))

// ---------------------------------------------------------------- por búsqueda

// (el A* elige el plan más barato: pedírselo si Ana la oye; ordenárselo si ya se lo pidió; ir a buscarla y traerla si
// está lejos o no obedece. Cada intento fallido —la jugadora no obedece— vuelve a planificar; al cuarto, falla)
export const conseguir_que = busca('conseguir_que', (_quien: Persona, _otro: Persona, c: Cond) => ({
  objetivo: c,
  con: [pedir, ordenar, traer, esperar],
  intentos: 4,
}))

// ---------------------------------------------------------------- lo que encadena todo

// (si Ana salta de la calesa en el camino, se rompe lo que mantiene: Marilla vuelve a «sube» —consigue que vuelva— y
// el camino sigue desde la parada en que iban)
export const llevar_a = receta('llevar_a', (quien: Persona, otro: Persona, a: Lugar, m: Medio, por: Ruta) => ({
  pasos: {
    engancha: enganchar(quien, m),
    sube: conseguir_que(quien, otro, mundo(otro).en.es(m)),
    arriba: subir(quien, m),
    camino: viajar(quien, m, por, a),
    baja: [bajar(otro), bajar(quien)],
  },
  mantiene: { si: mundo(otro).en.es(m), desde: 'camino', si_se_rompe: 'sube' },
  cumplido: mundo(otro).lugar.es(a),
}))
