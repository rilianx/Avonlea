// El lenguaje de las historias de Avonlea: los constructores (docs/LENGUAJE.md).
// Los archivos de lógica (mundo, estado, verbos, actos, historias) solo declaran datos: «export const» con objetos y
// llamadas a estas funciones, que no hacen nada en el juego, solo arman datos. Al construir, todo se convierte a JSON;
// el juego, el grafo, el modelo lógico (Z3) y la historia en fichas leen ese JSON.
// Los tipos son lo estricto: un nombre que no está declarado, o un valor que no es de su lista, es un error de tsc.

import type { Lugar, Nombrable, Persona } from './mundo'

// ---------------------------------------------------------------- condiciones y efectos (datos)

export type Op = '=' | '!=' | '<' | '<=' | '>' | '>='
export type Valor = string | number
export type Cond =
  | { readonly c: 'existe'; readonly camino: readonly string[]; readonly ventana?: string }
  | { readonly c: 'cmp'; readonly camino: readonly string[]; readonly op: Op; readonly valor: Valor }
  | { readonly c: 'desde'; readonly camino: readonly string[]; readonly op: Op; readonly valor: Duracion; readonly min?: true }   // (min: lo guardado es el minuto, no el día —hizo—)
  | { readonly c: 'y' | 'o'; readonly de: readonly Cond[] }
  | { readonly c: 'no'; readonly de: Cond }
  | { readonly c: 'f'; readonly f: string; readonly args: readonly unknown[] }
  | { readonly c: 'recado'; readonly quien: string; readonly verbo: string }   // (tiene_recado)
  | { readonly c: 'haciendo'; readonly quien: string; readonly verbo: string }   // (esta_haciendo)
export type Efecto =
  | { readonly e: 'deja' | 'olvida'; readonly camino: readonly string[]; readonly valor?: Valor }
  | { readonly e: 'suma'; readonly camino: readonly string[]; readonly n: number }
  | { readonly e: 'encarga'; readonly a: string; readonly hace: Llamada }
  | { readonly e: 'log'; readonly texto: string }
  | { readonly e: 'silencio'; readonly dura: Duracion }
  | { readonly e: 'nombrar'; readonly cosa: Nombrable; readonly pedir: boolean }
  | { readonly e: 'marca'; readonly id: string }
  | { readonly e: 'si'; readonly si: Cond; readonly entonces: readonly Efecto[] }   // (solo si se cumple: si hay pan, se come uno)
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
// (la hora, en horas con decimales: 7.5 son las 7:30; entre(21, 6) cruza la medianoche)
export type DiaSemana = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo'
export const tiempo = {
  hora: {
    entre: (desde: number, hasta: number): Cond => desde <= hasta
      ? y({ c: 'cmp', camino: ['tiempo', 'hora'], op: '>=', valor: desde }, { c: 'cmp', camino: ['tiempo', 'hora'], op: '<', valor: hasta })
      : o({ c: 'cmp', camino: ['tiempo', 'hora'], op: '>=', valor: desde }, { c: 'cmp', camino: ['tiempo', 'hora'], op: '<', valor: hasta }),
    desde: (h: number): Cond => ({ c: 'cmp', camino: ['tiempo', 'hora'], op: '>=', valor: h }),
  },
  dia: new Numero(['tiempo', 'dia']),
  semana: new Campo<DiaSemana>(['tiempo', 'semana']),   // (el día 7 es domingo, como en el juego)
}
// dentro de una búsqueda: cuántas veces se intentó el paso de ahora
export const intentos = new Numero(['intentos'])

// ---------------------------------------------------------------- verbos

// (S: los caminos de sus pasos, con puntos: 'camino', 'camino.playa'; lo que una escena puede nombrar)
export type Llamada<S extends string = string> = { readonly verbo: string; readonly args: readonly unknown[]; readonly _pasos?: S }
export type PorCada<T = unknown> = { readonly por_cada: unknown; readonly hace: Llamada; readonly _elemento?: T }
// (elegir: una de varias, la de más prioridad que se pueda —«si», y lo que pide su verbo—, y entre las de igual
// prioridad, al azar, por peso; mientras hace una, si otra de más prioridad se vuelve posible, la corta y hace esa.
// repetir: un paso una y otra vez, mientras se cumpla «mientras» —o siempre—)
export type Opcion = { readonly hace: Llamada<string>; readonly peso?: number; readonly si?: Cond; readonly prioridad?: number }
export type Elegir = { readonly elige: readonly Opcion[] }
export type Repetir = { readonly repite: Paso; readonly mientras?: Cond }
export type Paso = Llamada<string> | readonly Llamada<string>[] | PorCada | Elegir | Repetir
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
// (lo que dice de sí para que se pueda dibujar —no cambia lo que pasa, salvo «donde»: hay que estar ahí—: en qué lugar,
// junto a qué, de pie, sentada o acostada, y con qué cosas en las manos; el juego lo traduce a su animación)
export type Postura = 'de_pie' | 'sentada' | 'acostada' | 'agachada' | 'caminando'
// (las cosas: «empieza» se hace al empezar —un leño a la estufa—, «deja» al terminar, «si_se_deja» si lo cortan a medias.
// «junto_a»: un mueble de ese lugar (mueblesDe): si ya está lleno —el fregadero es de a uno—, no se puede. «usa»: si es
// una cosa declarada (cosasDe), tiene que haber una a mano —la lleva, o está ahí—; si no, es solo para el dibujo)
export type DefPrimitivo = { readonly pide?: Cond; readonly deja?: readonly Efecto[]; readonly dura?: Duracion; readonly cuesta?: number; readonly opcion?: string
  readonly donde?: Lugar; readonly junto_a?: string; readonly postura?: Postura; readonly usa?: readonly string[]; readonly icono?: string
  readonly empieza?: readonly Efecto[]; readonly si_se_deja?: readonly Efecto[]; readonly opera?: Operacion
  // (callado: haciendo esto no se le habla —dormir, rezar—; de_conversar: mientras se hace, si hay otro, se conversa —comer, coser—)
  readonly callado?: true; readonly de_conversar?: true }
// (las operaciones del motor: lo que un primitivo hace además de durar —mover una cosa, esperar, dar un recado…—. El
// motor las reconoce por esto, no por el nombre del verbo: un verbo nuevo puede ser cualquiera de ellas)
export type Operacion = 'tomar' | 'poner' | 'esperar' | 'quedarse' | 'dar_recado' | 'hacer_recado' | 'acompañar' | 'charlar'
// lo hace el mundo, con su animación y su duración
export const primitivo = <A extends unknown[]>(nombre: string, def: (...a: A) => DefPrimitivo) => verbo<A, never>('primitivo', nombre, def)

// una secuencia fija: cada paso con su etiqueta (los momentos de las escenas); «mantiene», lo que tiene que seguir
// siendo cierto desde un paso (si el mundo lo rompe, se vuelve al paso que lo consigue, y se sigue donde iba)
// («cuesta»: lo que le suma a un plan, para el A*; si no, lo que dura)
export type DefReceta<P extends Record<string, Paso>> = {
  readonly cuesta?: number
  readonly icono?: string   // (para dibujarlo mientras se hace: ⛪)
  readonly pide?: Cond
  readonly pasos: P
  // (si se rompe: volver a un paso —repararlo—, o dejar: la receta termina sin cumplirse, sin más)
  readonly mantiene?: { readonly si: Cond; readonly desde: keyof P & string; readonly hasta?: keyof P & string; readonly si_se_rompe: (keyof P & string) | 'dejar' }
  readonly cumplido?: Cond
  // (lo que queda si se deja a medias: la cortó algo más importante, o se rompió lo que mantenía —«faltó a clases»—)
  readonly si_se_deja?: readonly Efecto[]
}
export const receta = <A extends unknown[], const P extends Record<string, Paso>>(nombre: string, def: (...a: A) => DefReceta<P>) => verbo<A, Caminos<P>>('receta', nombre, def)
// una receta que es un solo «por cada»: sus pasos se nombran por sus elementos (viajar: 'hondonada_lynde', 'playa'…)
export const por_cada_uno = <A extends unknown[], T>(nombre: string, def: (...a: A) => { readonly pide?: Cond; readonly pasos: PorCada<T> }) => verbo<A, T & string>('receta', nombre, def)

// una condición a cumplir: el A* sobre el estado busca la secuencia más barata de verbos
export type DefBusca = { readonly objetivo: Cond; readonly con: readonly Verbo<never[], string>[]; readonly intentos: number }
export const busca = <A extends unknown[]>(nombre: string, def: (...a: A) => DefBusca) => verbo<A, never>('busca', nombre, def)

// un destino: el A* sobre el mapa busca el camino
// («a_pie»: quien va así se baja de su medio primero —correr—)
export const mapa = <A extends unknown[]>(nombre: string, def: (...a: A) => { readonly paso?: 'lento' | 'normal' | 'rapido'; readonly opcion?: string; readonly a_pie?: true }) => verbo<A, never>('mapa', nombre, def)

export const elegir = (...opciones: Opcion[]): Elegir => ({ elige: opciones })
export const repetir = (paso: Paso, mientras?: Cond): Repetir => (mientras ? { repite: paso, mientras } : { repite: paso })
// lo que alguien hizo (un verbo que se cumplió): hizo('ana', desayunar).hoy; hizo('marilla', lavar_platos).desde('<', '1h')
// (el motor lo anota solo: el día, y el minuto)
export const hizo = (quien: Persona, v: { readonly verbo: string }): Hecho => {
  const camino = ['hizo', quien, v.verbo]
  return { c: 'existe', camino, id: v.verbo, hoy: { c: 'existe', camino, ventana: 'hoy' }, desde: (op, valor) => ({ c: 'desde', camino: ['hizo_t', quien, v.verbo], op, valor, min: true }), deja: { e: 'deja', camino }, olvida: { e: 'olvida', camino } }
}
// un recado que alguien hizo (dar_recado, en comun/verbos.ts): hizo_recado('ana', 'marilla').hoy
export const hizo_recado = (quien: Persona, de: Persona): Hecho => {
  const camino = ['recado_hecho', quien, de]
  return { c: 'existe', camino, id: 'recado', hoy: { c: 'existe', camino, ventana: 'hoy' }, desde: (op, valor) => ({ c: 'desde', camino: ['recado_hecho_t', quien, de], op, valor, min: true }), deja: { e: 'deja', camino }, olvida: { e: 'olvida', camino } }
}
// alguien tiene un recado pendiente de ese verbo (se lo pidieron, y todavía no lo hace ni venció): tiene_recado('ana', recoger_huevos)
// alguien está haciendo ese verbo ahora (o algo que lo tiene adentro): esta_haciendo('diana', pasar_a_buscar)
export const esta_haciendo = (quien: Persona, v: { readonly verbo: string }): Cond => ({ c: 'haciendo', quien, verbo: v.verbo })
export const tiene_recado = (quien: Persona, v: { readonly verbo: string }): Cond => ({ c: 'recado', quien, verbo: v.verbo })
// LAS COSAS: cada una está en algún lado —en un lugar (la leña, en el granero) o con alguien (el libro, con Ana)—, y
// hay tantas. Se declaran los tipos y dónde hay al empezar; se preguntan y se cambian como números, donde están:
// en('granero').lena.gt(0), con('ana').libro.suma(-1). Nunca bajan de cero. Se mueven con tomar y poner (y llevar).
export type DefCosa = { readonly titulo: string; readonly icono?: string }   // (icono: si se dibuja donde está —las gallinas—)
export type Cosas<C> = { readonly [K in keyof C]: Numero }
export function cosasDe<const C extends Record<string, DefCosa>>(tipos: C, inicio: { readonly [donde: string]: { readonly [K in keyof C]?: number } }) {
  const de = (donde: string): Cosas<C> => Object.fromEntries(Object.keys(tipos).map(k => [k, new Numero(['cosas', donde, k])])) as never
  return { en: (l: Lugar) => de(l), con: (q: Persona) => de(q), _cosas: { tipos, inicio } }
}
// LOS MUEBLES de cada lugar, y cuántos caben junto a cada uno a la vez (el fregadero 1, la mesa 4): «junto_a» nombra uno.
// Afuera, en un tablero, un mueble puede estar en otro cuadrante de su zona: «en», contando desde el principal
// ({ caben: 3, en: [0, 1] }: la cerca, un cuadrante más abajo que las vacas)
export type Mueble = number | { readonly caben: number; readonly en?: readonly [number, number] }
export const mueblesDe = <const M extends { readonly [L in Lugar]?: { readonly [mueble: string]: Mueble } }>(m: M) => ({ _muebles: m })
// DÓNDE EMPIEZA cada uno (y cada medio) cuando empiezan las vidas: donde duerme
export const inicioDe = <const I extends { readonly [quien: string]: Lugar }>(i: I) => ({ _inicio: i })
// LO QUE PASA SOLO, cada día a una hora (las gallinas ponen a las seis; se junta ropa sucia)
export type Proceso = { readonly hora: number; readonly titulo: string; readonly deja: readonly Efecto[] }
export const procesos = (...p: Proceso[]) => ({ _procesos: p })
// un efecto que solo se hace si se cumple algo: si hay pan, se come uno
export const si = (c: Cond, ...entonces: Efecto[]): Efecto => ({ e: 'si', si: c, entonces })
// la vida de alguien: lo que hace de fondo, todo el día, cuando nada lo ocupa (una historia, la jugadora)
export type Vida = { readonly vida: Persona; readonly hace: Llamada<string> }
export const vida = (quien: Persona, hace: Llamada<string>): Vida => ({ vida: quien, hace })

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
  readonly termina?: Cond   // (sin «termina»: una historia de fondo, siempre en curso —lo que pasa cada vez que…—)
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
// alguien pasa por un lugar (llega a él, o lo cruza en un viaje): pasa('ana', 'camino_blanco')
export const pasa = (quien: Persona, lugar: Lugar): Activacion => ({ activa: { quien, pasa: lugar } })
// (dentro de una escena que «interrumpe»: si cortó otra —había una conversación— o no —estaban en silencio—)
export const interrumpio: Cond = { c: 'existe', camino: ['escena', 'interrumpio'] }

// el guion de una escena: líneas (con su acto), comandos, opciones de la jugadora y variaciones (<<if>>)
export type Item =
  | { readonly q: Persona | 'narra' | 'alguien' | 'otro'; readonly t: string; readonly piensa?: true; readonly acto?: Llamada }
  | { readonly hace: Efecto | Llamada }
  | { readonly op: string; readonly propia?: true; readonly cuerpo: readonly Item[] }
  | { readonly si: Cond; readonly cuerpo: readonly Item[]; readonly sino: readonly Item[] }
export type DefEscena = {
  readonly resumen: string
  readonly se_activa: readonly Activacion[]
  readonly si: Cond
  readonly repetir?: 'una_vez' | 'dia' | 'siempre'
  readonly en_marcha?: true   // (se dice mientras los encargos siguen: una charla en la calesa, que no la detiene)
  readonly interrumpe?: true  // (no espera a que termine la escena que se está diciendo: la corta)
  readonly punto?: string
  readonly hablan: readonly (Persona | 'narra')[]
  readonly cuerpo: readonly Item[]
}
export const defEscena = (id: Escena, def: DefEscena) => ({ ...id, ...def })
// LAS CHARLAS (docs/lenguaje/charlas/*.yarn, las genera tools/lenguaje/yarn.js): lo que se dicen los que se encuentran
// —en el mismo cuadrante, en la misma pieza—. Como una escena, pero no la activa una historia, sino encontrarse:
// «entre», quiénes; «si», cuándo; «repetir», cada cuánto; «peso», qué tan probable entre las que se pueden. El guion,
// el de las escenas (líneas, actos, opciones de Ana, comandos que cambian el mundo —un recado, un hecho—, <<if>>)
export type Charla = { readonly charla: string }
export function charlasDe<const E extends readonly string[]>(ambito: string, ids: E) {
  return {
    charla: Object.fromEntries(ids.map(k => [k, { charla: ambito + '.' + k }])) as { readonly [K in E[number]]: Charla },
    dichas: Object.fromEntries(ids.map(k => [k, hecho(ambito, 'dichas', k)])) as { readonly [K in E[number]]: Hecho },
  }
}
export type DefCharla = {
  readonly resumen: string
  readonly entre: readonly Persona[]
  readonly si: Cond
  readonly repetir?: 'una_vez' | 'dia' | 'siempre'
  readonly peso?: number
  readonly hablan: readonly (Persona | 'narra' | 'alguien' | 'otro')[]   // (los roles hablan por quien les toque)
  readonly cuerpo: readonly Item[]
}
export const defCharla = (id: Charla, def: DefCharla) => ({ ...id, ...def })
// LOS ROLES de una charla: en vez de una persona, «alguien» (o «otro»): cualquiera de los que están ahí —o, con «de»,
// solo de esos—. Al elegir la charla, el motor pone a la persona en su lugar, en todo el guion: «alguien: ¿Qué lees?»
export const rol = (nombre: string, de?: readonly Persona[]): Persona => ({ rol: nombre, ...(de ? { de } : {}) }) as unknown as Persona
export const alguien = rol('alguien')
export const otro = rol('otro')
// CUÁNTO QUIERE alguien a alguien (de −2 a 5, como en el juego): un número; las charlas lo cambian y lo preguntan:
// quiere('marilla', 'ana').suma(1), quiere('ana', 'matthew').gte(4). Lo que hay al empezar: quiereDe, en las vidas
export const quiere = (a: Persona, b: Persona) => new Numero(['cariño', a, b])
export const quiereDe = <const Q extends { readonly [par: string]: number }>(q: Q) => ({ _quiere: q })   // ({ 'ana>matthew': 4 })
// una voz: el patrón de llamada («_» vale cualquiera), el paso de la receta si es la voz de un paso, y las condiciones
// de sus variantes (true: sin condición)
export const _ = { comodin: true } as never
export const voz = <S extends string>(llamada: Llamada<S>, def: { readonly paso?: NoInfer<S>; readonly lineas: readonly { readonly t: string; readonly si: Cond | true }[] }) => ({ llamada, ...def })
export const suma = (n: Numero, cuanto: number): Efecto => n.suma(cuanto)
export const deja = (h: Hecho | Efecto): Efecto => ('deja' in h ? h.deja : h)
export const log = (texto: string): Efecto => ({ e: 'log', texto })
// (en una escena: nadie habla durante un rato; si la escena va en marcha, el mundo sigue: la calesa avanza)
export const silencio = (dura: Duracion): Efecto => ({ e: 'silencio', dura })
// (Ana le pone nombre a algo: el del libro; con 'pedir', la jugadora elige —el del libro, o uno suyo, escrito—)
export const nombrar = (cosa: Nombrable, como?: 'pedir'): Efecto => ({ e: 'nombrar', cosa, pedir: como === 'pedir' })
// (un momento del libro, para comparar lo que pasa con lo que cuenta el libro: src/datos/libro1.json, «verdad»)
export const marca = (id: string): Efecto => ({ e: 'marca', id })
