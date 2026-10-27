// El lenguaje de las historias de Avonlea: los constructores (docs/LENGUAJE.md).
// Los archivos de lógica (mundo, estado, verbos, actos, historias) solo declaran datos: «export const» con objetos y
// llamadas a estas funciones, que no hacen nada en el juego, solo arman datos. Al construir, todo se convierte a JSON;
// el juego, el grafo, el modelo lógico (Z3) y la historia en fichas leen ese JSON.
// Los tipos son lo estricto: un nombre que no está declarado, o un valor que no es de su lista, es un error de tsc.

import type { Persona } from './mundo'

// ---------------------------------------------------------------- condiciones y efectos (datos)

export type Op = '=' | '!=' | '<' | '<=' | '>' | '>='
export type Valor = string | number
export type Cond =
  | { readonly c: 'existe'; readonly camino: readonly string[]; readonly ventana?: string }
  | { readonly c: 'cmp'; readonly camino: readonly string[]; readonly op: Op; readonly valor: Valor }
  | { readonly c: 'desde'; readonly camino: readonly string[]; readonly op: Op; readonly valor: Duracion }
  | { readonly c: 'y' | 'o'; readonly de: readonly Cond[] }
  | { readonly c: 'no'; readonly de: Cond }
  | { readonly c: 'f'; readonly f: string; readonly args: readonly unknown[] }
export type Efecto =
  | { readonly e: 'deja' | 'olvida'; readonly camino: readonly string[]; readonly valor?: Valor }
  | { readonly e: 'suma'; readonly camino: readonly string[]; readonly n: number }
  | { readonly e: 'encarga'; readonly a: string; readonly hace: Llamada }
  | { readonly e: 'log'; readonly texto: string }
export type Duracion = `${number}${'s' | 'm' | 'h' | 'd'}`

export const y = (...de: Cond[]): Cond => ({ c: 'y', de })
export const o = (...de: Cond[]): Cond => ({ c: 'o', de })
export const no = (de: Cond): Cond => ({ c: 'no', de })
export const funcion = <A extends unknown[]>(f: string) => (...args: A): Cond => ({ c: 'f', f, args })

// un lugar del estado con un valor de una lista: se pregunta (es, no_es) y se cambia (vale)
export class Campo<V extends Valor> {
  constructor(readonly camino: readonly string[]) {}
  // (el valor puede ser otro lugar del estado: mundo('ana').lugar.es(medio('calesa').lugar), Ana donde está la calesa)
  es(valor: V | Campo<V>): Cond { return { c: 'cmp', camino: this.camino, op: '=', valor: valor instanceof Campo ? { ref: valor.camino } as never : valor } }
  no_es(valor: V | Campo<V>): Cond { return { c: 'cmp', camino: this.camino, op: '!=', valor: valor instanceof Campo ? { ref: valor.camino } as never : valor } }
  vale(valor: V): Efecto { return { e: 'deja', camino: this.camino, valor } }
}
// una escala: además, se compara en su orden (los valores fuera de la escala no se comparan)
export class Escala<V extends string, O extends string = never> extends Campo<V | O> {
  lt(v: V): Cond { return { c: 'cmp', camino: this.camino, op: '<', valor: v } }
  lte(v: V): Cond { return { c: 'cmp', camino: this.camino, op: '<=', valor: v } }
  gt(v: V): Cond { return { c: 'cmp', camino: this.camino, op: '>', valor: v } }
  gte(v: V): Cond { return { c: 'cmp', camino: this.camino, op: '>=', valor: v } }
}
export class Numero extends Campo<number> {
  lt(n: number): Cond { return { c: 'cmp', camino: this.camino, op: '<', valor: n } }
  lte(n: number): Cond { return { c: 'cmp', camino: this.camino, op: '<=', valor: n } }
  gt(n: number): Cond { return { c: 'cmp', camino: this.camino, op: '>', valor: n } }
  gte(n: number): Cond { return { c: 'cmp', camino: this.camino, op: '>=', valor: n } }
  suma(n: number): Efecto { return { e: 'suma', camino: this.camino, n } }
}

// ---------------------------------------------------------------- el estado: declaraciones y acceso

export type DefEstado = { readonly orden?: readonly string[]; readonly valores?: readonly string[]; readonly otros?: readonly string[]; readonly inicial: string; readonly titulo: string }
type Orden<D> = D extends { orden: readonly (infer V extends string)[] } ? V : never
type Libres<D> = (D extends { valores: readonly (infer V extends string)[] } ? V : never) | (D extends { otros: readonly (infer V extends string)[] } ? V : never)
// estado.<nombre>: una escala si tiene «orden», si no un campo de su lista
export function accesoEstado<const D extends Record<string, DefEstado>>(defs: D): { readonly [K in keyof D]: Escala<Orden<D[K]>, Libres<D[K]>> } {
  return Object.fromEntries(Object.keys(defs).map(k => [k, new Escala(['estado', k])])) as never
}

export type DefCualidad<P extends string> = { readonly de: P | 'todos'; readonly hacia?: P | 'todos'; readonly rango: readonly [number, number]; readonly inicial: number; readonly titulo: string }
// cualidad(de, nombre, hacia): un número
// (en dos pasos: primero quiénes pueden tenerla, accesoCualidad<Persona>(); después las declaraciones)
export const accesoCualidad = <P extends string>() => <const D extends Record<string, DefCualidad<P>>>(_defs: D) =>
  (de: P, nombre: keyof D & string, hacia?: P) => new Numero(['cualidad', de, nombre, ...(hacia ? [hacia] : [])])

// un hecho (algo que pasó, con su día) o una escena dicha: es una condición (que pasó), con su ventana de tiempo
// (hoy), el tiempo desde que pasó (desde) y el efecto de dejarlo (deja) u olvidarlo (olvida)
export type Hecho = Cond & {
  readonly id: string
  readonly hoy: Cond
  desde(op: Op, d: Duracion): Cond
  readonly deja: Efecto
  readonly olvida: Efecto
}
function hecho(ambito: string, tipo: 'hechos' | 'dichas', id: string): Hecho {
  const camino = [ambito, tipo, id]
  return { c: 'existe', camino, id, hoy: { c: 'existe', camino, ventana: 'hoy' }, desde: (op, valor) => ({ c: 'desde', camino, op, valor }),
    deja: { e: 'deja', camino }, olvida: { e: 'olvida', camino } }
}
// los hechos de un ámbito («comun», o el nombre de una historia: son suyos, locales)
export function hechosDe<const H extends Record<string, string>>(ambito: string, descripciones: H): { readonly [K in keyof H]: Hecho } {
  return Object.fromEntries(Object.keys(descripciones).map(k => [k, hecho(ambito, 'hechos', k)])) as never
}
// las escenas de una historia (lo genera tools/lenguaje/yarn.js desde sus .yarn): su id, y «dichas.<id>»
export type Escena = { readonly escena: string }
export function escenasDe<const E extends readonly string[]>(historia: string, ids: E) {
  return {
    escena: Object.fromEntries(ids.map(k => [k, { escena: historia + '.' + k }])) as { readonly [K in E[number]]: Escena },
    dichas: Object.fromEntries(ids.map(k => [k, hecho(historia, 'dichas', k)])) as { readonly [K in E[number]]: Hecho },
  }
}

// el tiempo
export const tiempo = {
  hora: { entre: (desde: number, hasta: number): Cond => y({ c: 'cmp', camino: ['tiempo', 'hora'], op: '>=', valor: desde }, { c: 'cmp', camino: ['tiempo', 'hora'], op: '<', valor: hasta }) },
  dia: new Numero(['tiempo', 'dia']),
}
// dentro de una búsqueda: cuántas veces se intentó el paso de ahora
export const intentos = new Numero(['intentos'])

// ---------------------------------------------------------------- verbos

// (S: los caminos de sus pasos, con puntos: 'camino', 'camino.playa'; lo que una escena puede nombrar)
export type Llamada<S extends string = string> = { readonly verbo: string; readonly args: readonly unknown[]; readonly _pasos?: S }
export type PorCada<T = unknown> = { readonly por_cada: unknown; readonly hace: Llamada; readonly _elemento?: T }
export type Paso = Llamada<string> | readonly Llamada<string>[] | PorCada
// los caminos de los pasos de una receta: cada etiqueta, y lo de adentro (los pasos de su verbo, o los elementos de su
// «por cada»), con un punto
type Dentro<V> = V extends PorCada<infer T> ? T & string : V extends Llamada<infer S> ? S : never
export type Caminos<P> = { [K in keyof P & string]: K | `${K}.${Dentro<P[K]>}` }[keyof P & string]
export type Verbo<A extends unknown[], S extends string = never> = ((...a: A) => Llamada<S>) & { readonly verbo: string; readonly def: unknown }

function verbo<A extends unknown[], S extends string>(tipo: string, nombre: string, def: (...a: A) => unknown): Verbo<A, S> {
  const f = ((...args: A) => ({ verbo: nombre, args })) as unknown as Verbo<A, S>
  // (al construir: la definición se llama una vez con los nombres de sus parámetros, y se guarda como datos)
  const params = Array.from({ length: def.length }, (_, i) => ({ param: i }))
  // (y los nombres de los parámetros, para los textos: «Subir a {m}»)
  const nombres = (String(def).match(/^[^(]*\(([^)]*)\)/)?.[1] ?? '').split(',').map(x => x.trim().split(/[\s:=]/)[0].replace(/^_/, '')).filter(Boolean)
  return Object.assign(f, { verbo: nombre, def: { tipo, params: nombres, ...(def(...(params as unknown as A)) as object) } })
}

// («opcion»: cómo se le ofrece a la jugadora cuando se lo piden a Ana: 'Ir con {otro}')
export type DefPrimitivo = { readonly pide?: Cond; readonly deja?: readonly Efecto[]; readonly dura?: Duracion; readonly cuesta?: number; readonly opcion?: string }
// lo hace el mundo, con su animación y su duración
export const primitivo = <A extends unknown[]>(nombre: string, def: (...a: A) => DefPrimitivo) => verbo<A, never>('primitivo', nombre, def)

// una secuencia fija: cada paso con su etiqueta (los momentos de las escenas); «mantiene», lo que tiene que seguir
// siendo cierto desde un paso (si el mundo lo rompe, se vuelve al paso que lo consigue, y se sigue donde iba)
// («cuesta»: lo que le suma a un plan, para el A*; si no, lo que dura)
export type DefReceta<P extends Record<string, Paso>> = {
  readonly cuesta?: number
  readonly pide?: Cond
  readonly pasos: P
  readonly mantiene?: { readonly si: Cond; readonly desde: keyof P & string; readonly hasta?: keyof P & string; readonly si_se_rompe: keyof P & string }
  readonly cumplido?: Cond
}
export const receta = <A extends unknown[], const P extends Record<string, Paso>>(nombre: string, def: (...a: A) => DefReceta<P>) => verbo<A, Caminos<P>>('receta', nombre, def)
// una receta que es un solo «por cada»: sus pasos se nombran por sus elementos (viajar: 'hondonada_lynde', 'playa'…)
export const por_cada_uno = <A extends unknown[], T>(nombre: string, def: (...a: A) => { readonly pide?: Cond; readonly pasos: PorCada<T> }) => verbo<A, T & string>('receta', nombre, def)

// una condición a cumplir: el A* sobre el estado busca la secuencia más barata de verbos
export type DefBusca = { readonly objetivo: Cond; readonly con: readonly Verbo<never[], string>[]; readonly intentos: number }
export const busca = <A extends unknown[]>(nombre: string, def: (...a: A) => DefBusca) => verbo<A, never>('busca', nombre, def)

// un destino: el A* sobre el mapa busca el camino
export const mapa = <A extends unknown[]>(nombre: string, def: (...a: A) => { readonly paso?: 'lento' | 'normal' | 'rapido'; readonly opcion?: string }) => verbo<A, never>('mapa', nombre, def)

// repetir un paso por cada elemento de una lista: cada vuelta toma la etiqueta de su elemento
export const por_cada = <T>(lista: readonly T[] | { readonly lista: string; readonly _de?: T }, hace: (x: T) => Llamada): PorCada<T> =>
  ({ por_cada: lista, hace: hace({ elemento: true } as unknown as T) })

// ---------------------------------------------------------------- actos de habla

// «pedido»: el acto le pide a alguien que haga un verbo. Ese alguien decide: si es Ana, la jugadora (el juego le
// ofrece hacerlo o no; no contestar en un rato también es no); si Ana va sola, o es otro, según sus respuestas
// (comun/ana.ts). Para planificar, el A* supone que acepta, con el costo de lo probable; si rechaza, el intento falla
export type DefActo = { readonly pide?: Cond; readonly deja?: readonly Efecto[]; readonly cuesta?: number; readonly pedido?: { readonly a: Persona; readonly hace: Llamada; readonly espera: Duracion } }
// decir algo es un verbo: quien lo dice (el primer parámetro), a quién, y sus efectos; su texto es su voz
export const acto = <A extends unknown[]>(nombre: string, def: (...a: A) => DefActo) => verbo<A, never>('acto', nombre, def)
export const encarga = (a: string, hace: Llamada): Efecto => ({ e: 'encarga', a, hace })
// cómo responde alguien a un pedido cuando decide solo (Ana sin jugadora, o los demás): por acto, una condición sobre
// quién lo pide (true: siempre acepta)
export const respuestas = <const R extends Record<string, (quien: Persona) => Cond | true>>(r: R) =>
  Object.fromEntries(Object.entries(r).map(([k, f]) => [k, f({ param: 0 } as never)])) as { readonly [K in keyof R]: Cond | true }

// ---------------------------------------------------------------- historias

export type Momento = 'empieza' | 'cumplido' | 'fallido' | 'sigue'
export type Encargo<S extends string = string> = { readonly quien: Persona; readonly hace: Llamada<S>; readonly tras?: readonly Escena[] }
type EstadoEncargo = Campo<'pendiente' | 'en_curso' | 'cumplido' | 'fallido'>
export type EncargosDe<E extends Record<string, Encargo<string>>> = { readonly [K in keyof E]: Encargo<E[K] extends Encargo<infer S> ? S : never> & { readonly estado: EstadoEncargo } }
export type DefHistoria<E extends Record<string, Encargo<string>>> = {
  readonly titulo: string
  readonly empieza: Cond
  readonly encarga: E
  readonly orden: readonly (Escena | readonly Escena[])[]
  readonly termina: Cond
  readonly deja?: readonly Efecto[]
  readonly punto?: string
  readonly falla?: (encargo: EncargosDe<E>) => Cond
}
export type Historia<E extends Record<string, Encargo<string>>> = Omit<DefHistoria<E>, 'falla'> & {
  readonly historia: string
  readonly en_curso: Cond
  readonly encargo: EncargosDe<E>
  readonly falla?: Cond
}
export function historia<const E extends Record<string, Encargo<string>>>(id: string, def: DefHistoria<E>): Historia<E> {
  const encargo = Object.fromEntries(Object.entries(def.encarga).map(([k, e]) => [k, { ...e, etiqueta: k, estado: new Campo(['encargo', id, k]) }]))
  return { ...def, historia: id, en_curso: { c: 'cmp', camino: ['historia', id], op: '=', valor: 'en_curso' }, encargo,
    falla: def.falla?.(encargo as never) } as never
}

// ---------------------------------------------------------------- lo que usan las escenas (.yarn)
// (tools/lenguaje/yarn.js traduce las cabeceras y los comandos de cada escena a llamadas a estas funciones, en un
// archivo que tsc revisa: así un nombre mal escrito en una escena también es un error)

export type Activacion = { readonly activa: unknown }
// un momento de un encargo de la historia, o de uno de sus pasos: momento(historia.encargo.ida, 'camino.playa', 'cumplido')
export const momento = <S extends string>(e: Encargo<S>, paso: '' | NoInfer<S>, m: Momento): Activacion => ({ activa: { encargo: e, paso, momento: m } })
// un verbo de alguien: hace('marilla', traer, 'va', 'cumplido'); o lo que hace la jugadora: hace('ana', tocar, '', 'empieza')
export const hace = <S extends string>(quien: Persona, v: Verbo<never[], S>, paso: '' | NoInfer<S>, m: Momento): Activacion => ({ activa: { quien, verbo: v.verbo, paso, momento: m } })
// alguien acepta o rechaza lo que le pidieron: responde('ana', 'rechaza', pedir), o un pedido en particular:
// responde('ana', 'rechaza', pedir, subir) —que suba—
export type Respuesta = 'acepta' | 'rechaza'
export const responde = (quien: Persona, r: Respuesta, a: Verbo<never[], string>, que?: Verbo<never[], string>): Activacion => ({ activa: { quien, responde: r, acto: a.verbo, ...(que ? { hace: que.verbo } : {}) } })
// otra escena terminó
export const tras = (e: Escena): Activacion => ({ activa: { tras: e } })

// el guion de una escena: líneas (con su acto), comandos, opciones de la jugadora y variaciones (<<if>>)
export type Item =
  | { readonly q: Persona | 'narra'; readonly t: string; readonly piensa?: true; readonly acto?: Llamada }
  | { readonly hace: Efecto | Llamada }
  | { readonly op: string; readonly propia?: true; readonly cuerpo: readonly Item[] }
  | { readonly si: Cond; readonly cuerpo: readonly Item[]; readonly sino: readonly Item[] }
export type DefEscena = {
  readonly resumen: string
  readonly se_activa: readonly Activacion[]
  readonly si: Cond
  readonly repetir?: 'una_vez' | 'dia' | 'siempre'
  readonly punto?: string
  readonly hablan: readonly (Persona | 'narra')[]
  readonly cuerpo: readonly Item[]
}
export const defEscena = (id: Escena, def: DefEscena) => ({ ...id, ...def })
// una voz: el patrón de llamada («_» vale cualquiera), el paso de la receta si es la voz de un paso, y las condiciones
// de sus variantes (true: sin condición)
export const _ = { comodin: true } as never
export const voz = <S extends string>(llamada: Llamada<S>, def: { readonly paso?: NoInfer<S>; readonly lineas: readonly { readonly t: string; readonly si: Cond | true }[] }) => ({ llamada, ...def })
export const suma = (n: Numero, cuanto: number): Efecto => n.suma(cuanto)
export const deja = (h: Hecho | Efecto): Efecto => ('deja' in h ? h.deja : h)
export const log = (texto: string): Efecto => ({ e: 'log', texto })
