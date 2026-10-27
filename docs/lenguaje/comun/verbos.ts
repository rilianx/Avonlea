// Los verbos comunes (docs/LENGUAJE.md §6): lo que cualquiera puede hacer. Primitivos (los hace el mundo), por receta
// (fijos), por búsqueda (A* sobre el estado) y por mapa (A* sobre el mapa). El primer parámetro es siempre quien lo hace.
// Las etiquetas de los pasos son los momentos a los que se engancha una escena: el paso «playa» del paso «camino» del
// encargo «ida» es momento(white_sands.encargo.ida, 'camino.playa', 'cumplido').
import { busca, mapa, por_cada, por_cada_uno, primitivo, receta, y, type Campo, type Cond } from './lenguaje'
import { medio, mundo, tramo, type Lugar, type Medio, type Persona, type Ruta } from './mundo'
import { ordenar, pedir } from './actos'

// ---------------------------------------------------------------- primitivos

// (si se lo piden a Ana, la jugadora ve «Subir a la calesa»)
export const subir = primitivo('subir', (quien: Persona, m: Medio) => ({
  pide: y(mundo(quien).en.es('nada'), mundo(quien).lugar.es(medio(m).lugar)),
  deja: [mundo(quien).en.vale(m)],
  dura: '10s',
  opcion: 'Subir a {m}',
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

// (un verbo de quien decide: Ana sigue a alguien porque quiere, o porque se lo pidieron y aceptó; puede dejar de
// hacerlo cuando quiera —bajarse de la calesa, salir corriendo—)
export const seguir = primitivo('seguir', (quien: Persona, otro: Persona) => ({
  deja: [mundo(quien).sigue.vale(otro)],
  dura: '1s',
  opcion: 'Ir con {otro}',
}))

export const dejar_de_seguir = primitivo('dejar_de_seguir', (quien: Persona) => ({
  pide: mundo(quien).sigue.no_es('nadie'),
  deja: [mundo(quien).sigue.vale('nadie')],
  dura: '1s',
}))

// (llevarla de la mano: también la sigue; ella puede soltarse —dejar_de_seguir—)
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
export const ir_a = mapa('ir_a', (_quien: Persona, _a: Destino) => ({ opcion: 'Ir a {a}' }))

// (deja el medio en que iba: si va en la calesa, primero salta)
export const correr_a = mapa('correr_a', (_quien: Persona, _a: Destino) => ({ paso: 'rapido' }))

// ---------------------------------------------------------------- por receta

// (va donde está el otro, lo toma de la mano —él puede soltarse— y lo trae)
export const traer = receta('traer', (quien: Persona, otro: Persona, a: Destino) => ({
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
// está lejos o no obedece. Lo que depende de Ana es un pedido: el A* supone que acepta; si rechaza, el intento falla y
// vuelve a planificar —más firme, o ir a buscarla—; al cuarto, la búsqueda falla)
export const conseguir_que = busca('conseguir_que', (_quien: Persona, _otro: Persona, c: Cond) => ({
  objetivo: c,
  con: [pedir, ordenar, traer, esperar],
  intentos: 4,
}))

// ---------------------------------------------------------------- lo que encadena todo

// (dos cosas que decide el otro, una después de la otra, cada una con su búsqueda: que venga donde está el medio —por
// el mapa: pedírselo, o ir a buscarla y traerla—, y que suba. Si Ana se baja en el camino, se rompe lo que mantiene:
// vuelve a «cerca», y el camino continúa desde la parada en que iban)
export const llevar_a = receta('llevar_a', (quien: Persona, otro: Persona, a: Lugar, m: Medio, por: Ruta) => ({
  pasos: {
    engancha: enganchar(quien, m),
    cerca: conseguir_que(quien, otro, mundo(otro).lugar.es(medio(m).lugar)),
    sube: conseguir_que(quien, otro, mundo(otro).en.es(m)),
    arriba: subir(quien, m),
    camino: viajar(quien, m, por, a),
    baja: [bajar(otro), bajar(quien)],
  },
  mantiene: { si: mundo(otro).en.es(m), desde: 'arriba', si_se_rompe: 'cerca' },
  cumplido: mundo(otro).lugar.es(a),
}))
