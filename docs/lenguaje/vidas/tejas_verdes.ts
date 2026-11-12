// Tejas Verdes, todos los días: lo que hacen Ana, Marilla, Matthew y Diana cuando nada los ocupa (el juego chico del
// tablero: tools/mundo/). Cada uno tiene su vida: elegir, una y otra vez, lo que corresponde a esa hora.
// - Las acciones dicen dónde se hacen (si no está ahí, primero va), junto a qué, en qué postura y con qué: lo que el
//   dibujo necesita. Lo que dura, dura.
// - En cada momento se elige lo de más prioridad que se pueda; entre lo de igual prioridad, al azar, por peso: así no
//   todos los días son iguales. Si mientras hace algo se vuelve posible algo más importante (la hora de comer, que
//   llegó Diana), deja lo que hacía y hace eso. Dejar algo a medias no es grave: elige otra cosa.
// - Las prioridades: 9 dormir · 8 comer · 7 la escuela · 6 lo que no puede esperar (ordeñar, cocinar) · 5 estar con
//   alguien que llegó · 4 lo que falta en la casa (leña) · 3 los quehaceres · 1 lo libre · 0 descansar (siempre se
//   puede: nadie se queda sin nada que hacer)
// - Las cosas existen: la casa tiene pan, leña, leche, mantequilla y platos sucios. Comer ensucia platos y gasta pan;
//   cocinar gasta leña; ordeñar trae leche, y batirla hace mantequilla. Se hace lo que hace falta: no se lava si no hay
//   platos sucios, no se amasa si queda pan, Matthew parte leña cuando se acaba. Junto al fregadero, la estufa o la
//   mantequera cabe uno a la vez. Lo que se hace una vez al día por la casa (los huevos, la ropa) lo hace uno solo.
// - Lo que se deja a medias, se retoma: le falta lo que le faltaba (el motor lo recuerda ese día).
import { cosasDe, elegir, hechosDe, hizo, no, Numero, primitivo, receta, repetir, tiempo, vida, y, o } from '../comun/lenguaje'
import { mundo, ve, type Lugar, type Persona } from '../comun/mundo'
import { ir_a, quedarse } from '../comun/verbos'

// ---------------------------------------------------------------- cuándo

const de_noche = (despierta: number, se_acuesta: number) => tiempo.hora.entre(se_acuesta, despierta)
const domingo = tiempo.semana.es('domingo'), lunes = tiempo.semana.es('lunes'), martes = tiempo.semana.es('martes')
const dia_de_clases = no(domingo)
const manana = tiempo.hora.entre(6, 12), tarde = tiempo.hora.entre(13, 18), atardecer = tiempo.hora.entre(18, 21.5)

// ---------------------------------------------------------------- las cosas de la casa

export const cosas = cosasDe('cocina', {
  pan: { titulo: 'las hogazas de pan', inicial: 3 },
  lena: { titulo: 'los leños junto a la estufa', inicial: 6 },
  leche: { titulo: 'los baldes de leche', inicial: 0 },
  mantequilla: { titulo: 'la mantequilla', inicial: 1 },
  platos_sucios: { titulo: 'los platos sucios', inicial: 0 },
})
// (lo de una casa cualquiera —la de cada uno, cuando come en la suya—: el mismo camino, con su lugar)
const de = (casa: Lugar, x: keyof typeof cosas & string) => new Numero(['cosas', casa, x])
// lo que se hace una vez al día por la casa: si ya lo hizo alguien, nadie más
export const hechos = hechosDe('tejas_verdes', {
  huevos_recogidos: 'alguien recogió los huevos del gallinero',
  ropa_lavada: 'alguien lavó la ropa (los lunes)',
})

// ---------------------------------------------------------------- las acciones (las hace el mundo)

export const dormir = primitivo('dormir', (_q: Persona, cama: Lugar) => ({ donde: cama, junto_a: 'cama', postura: 'acostada', dura: '1h' }))
export const descansar = primitivo('descansar', (_q: Persona) => ({ postura: 'sentada', dura: '15m' }))
// (en la mesa de la cocina; cada uno en su casa)
// (comer ensucia un plato; el desayuno es pan con mantequilla)
export const desayunar = primitivo('desayunar', (_q: Persona, casa: Lugar) => ({ donde: casa, junto_a: 'mesa', postura: 'sentada', usa: ['taza', 'pan'], dura: '25m',
  deja: [de(casa, 'platos_sucios').suma(1), de(casa, 'pan').suma(-1)] }))
export const comer = primitivo('comer', (_q: Persona, casa: Lugar) => ({ donde: casa, junto_a: 'mesa', postura: 'sentada', usa: ['plato'], dura: '30m', deja: [de(casa, 'platos_sucios').suma(1)] }))
export const cenar = primitivo('cenar', (_q: Persona, casa: Lugar) => ({ donde: casa, junto_a: 'mesa', postura: 'sentada', usa: ['plato'], dura: '30m', deja: [de(casa, 'platos_sucios').suma(1)] }))
// la casa
// (cocinar: un leño a la estufa al empezar; sin leña, no se puede)
export const cocinar = primitivo('cocinar', (_q: Persona) => ({ donde: 'cocina', junto_a: 'estufa', postura: 'de_pie', usa: ['olla'], dura: '35m', solo: true,
  pide: cosas.lena.gt(0), empieza: [cosas.lena.suma(-1)] }))
export const lavar_platos = primitivo('lavar_platos', (_q: Persona) => ({ donde: 'cocina', junto_a: 'fregadero', postura: 'de_pie', usa: ['platos'], dura: '20m', solo: true,
  pide: cosas.platos_sucios.gt(0), deja: [cosas.platos_sucios.vale(0)] }))
export const barrer = primitivo('barrer', (_q: Persona) => ({ donde: 'cocina', postura: 'caminando', usa: ['escoba'], dura: '15m' }))
export const amasar = primitivo('amasar', (_q: Persona) => ({ donde: 'cocina', junto_a: 'mesa', postura: 'de_pie', usa: ['harina'], dura: '40m',
  pide: cosas.pan.lt(3), deja: [cosas.pan.suma(6)] }))
export const coser = primitivo('coser', (_q: Persona) => ({ donde: 'cocina', junto_a: 'ventana', postura: 'sentada', usa: ['aguja', 'tela'], dura: '45m' }))
export const lavar_ropa = primitivo('lavar_ropa', (_q: Persona) => ({ donde: 'tejas_verdes', junto_a: 'tina', postura: 'agachada', usa: ['tabla', 'jabon'], dura: '1h', solo: true,
  pide: no(hechos.ropa_lavada.hoy), deja: [hechos.ropa_lavada.deja] }))
// (dos baldes de leche, una mantequilla)
export const batir_mantequilla = primitivo('batir_mantequilla', (_q: Persona) => ({ donde: 'cocina', junto_a: 'mantequera', postura: 'sentada', usa: ['mantequera'], dura: '40m', solo: true,
  pide: cosas.leche.gte(2), empieza: [cosas.leche.suma(-2)], deja: [cosas.mantequilla.suma(1)] }))
export const tejer = primitivo('tejer', (_q: Persona) => ({ donde: 'cocina', junto_a: 'estufa', postura: 'sentada', usa: ['agujas', 'lana'], dura: '30m' }))
export const planchar = primitivo('planchar', (_q: Persona) => ({ donde: 'cocina', junto_a: 'mesa', postura: 'de_pie', usa: ['plancha'], dura: '45m', solo: true }))
export const hacer_conservas = primitivo('hacer_conservas', (_q: Persona) => ({ donde: 'cocina', junto_a: 'estufa', postura: 'de_pie', usa: ['frascos', 'ciruelas'], dura: '1h', solo: true,
  pide: cosas.lena.gt(0), empieza: [cosas.lena.suma(-1)] }))
// (conversar con alguien que está ahí: la Sra. Lynde, en su casa —está siempre, mirando el camino por la ventana—)
export const conversar = primitivo('conversar', (_q: Persona, l: Lugar) => ({ donde: l, postura: 'sentada', usa: ['taza'], dura: '45m' }))
export const pasear = primitivo('pasear', (_q: Persona, l: Lugar) => ({ donde: l, postura: 'caminando', dura: '30m' }))
export const buscar_huevos = primitivo('buscar_huevos', (_q: Persona) => ({ donde: 'gallinero', postura: 'agachada', usa: ['canasta'], dura: '10m', solo: true,
  pide: no(hechos.huevos_recogidos.hoy), deja: [hechos.huevos_recogidos.deja] }))
export const regar = primitivo('regar', (_q: Persona) => ({ donde: 'huerta', postura: 'caminando', usa: ['regadera'], dura: '15m' }))
// el campo y los animales
export const ordeñar = primitivo('ordeñar', (_q: Persona) => ({ donde: 'corral', junto_a: 'vacas', postura: 'agachada', usa: ['balde'], dura: '25m', deja: [cosas.leche.suma(2)] }))
export const dar_de_comer = primitivo('dar_de_comer', (_q: Persona) => ({ donde: 'corral', postura: 'caminando', usa: ['heno'], dura: '15m' }))
export const trabajar_el_campo = primitivo('trabajar_el_campo', (_q: Persona) => ({ donde: 'campo', postura: 'caminando', usa: ['horqueta'], dura: '1h' }))
export const partir_lena = primitivo('partir_lena', (_q: Persona) => ({ donde: 'granero', junto_a: 'tronco', postura: 'de_pie', usa: ['hacha'], dura: '30m', solo: true, deja: [cosas.lena.suma(5)] }))
export const arreglar_cerca = primitivo('arreglar_cerca', (_q: Persona) => ({ donde: 'corral', junto_a: 'cerca', postura: 'agachada', usa: ['martillo'], dura: '40m' }))
export const fumar_pipa = primitivo('fumar_pipa', (_q: Persona) => ({ donde: 'tejas_verdes', junto_a: 'porche', postura: 'sentada', usa: ['pipa'], dura: '30m' }))
// lo de Ana (y de Diana)
export const leer = primitivo('leer', (_q: Persona, l: Lugar) => ({ donde: l, junto_a: 'ventana', postura: 'sentada', usa: ['libro'], dura: '30m' }))
export const jugar_en_la_huerta = primitivo('jugar_en_la_huerta', (_q: Persona) => ({ donde: 'huerta', postura: 'caminando', dura: '25m' }))
export const sonar_despierta = primitivo('sonar_despierta', (_q: Persona) => ({ donde: 'pieza', junto_a: 'ventana', postura: 'sentada', dura: '20m' }))
export const mirar_las_vacas = primitivo('mirar_las_vacas', (_q: Persona) => ({ donde: 'corral', junto_a: 'cerca', postura: 'de_pie', dura: '15m' }))
export const rezar = primitivo('rezar', (_q: Persona) => ({ donde: 'pieza', junto_a: 'cama', postura: 'agachada', dura: '5m' }))
export const estudiar = primitivo('estudiar', (_q: Persona, l: Lugar) => ({ donde: l, junto_a: 'mesa', postura: 'sentada', usa: ['libro'], dura: '30m' }))
// (con otra: si se ven; si una se va, la otra deja)
export const jugar_con = primitivo('jugar_con', (q: Persona, otra: Persona) => ({ pide: ve(q, otra), postura: 'caminando', dura: '30m' }))

// ---------------------------------------------------------------- las actividades (varios pasos)

// (ir a clases: ir, quedarse hasta las tres y media, y volver; si se va antes —se escapa, la jugadora se la lleva—,
// la deja: nada más)
export const ir_a_clases = receta('ir_a_clases', (q: Persona, casa: Lugar) => ({
  pasos: {
    va: ir_a(q, 'escuela'),
    clase: quedarse(q, tiempo.hora.desde(15.5)),
    vuelve: ir_a(q, casa),
  },
}))
// (ir a ver a Ana: donde esté ella; jugar, si la encuentra; y volver a casa)
export const visitar = receta('visitar', (q: Persona, otra: Persona, casa: Lugar) => ({
  pasos: {
    va: ir_a(q, mundo(otra).lugar),
    juegan: jugar_con(q, otra),
    vuelve: ir_a(q, casa),
  },
}))
// (el domingo, a la iglesia: ir, quedarse hasta el mediodía, y volver)
export const ir_a_la_iglesia = receta('ir_a_la_iglesia', (q: Persona, casa: Lugar) => ({
  pasos: {
    va: ir_a(q, 'iglesia'),
    misa: quedarse(q, tiempo.hora.desde(12)),
    vuelve: ir_a(q, casa),
  },
}))
// (una visita a la Sra. Lynde: ir a la Hondonada, conversar, volver)
export const visitar_a_la_sra_lynde = receta('visitar_a_la_sra_lynde', (q: Persona, casa: Lugar) => ({
  pasos: { va: ir_a(q, 'hondonada_lynde'), conversan: conversar(q, 'hondonada_lynde'), vuelve: ir_a(q, casa) },
}))
// (volver a casa, si está afuera cuando ya es tarde)
export const volver_a_casa = receta('volver_a_casa', (q: Persona, casa: Lugar) => ({ pasos: { vuelve: ir_a(q, casa) } }))

// ---------------------------------------------------------------- las vidas

export const dia_de_marilla = receta('dia_de_marilla', (q: Persona) => ({
  pasos: {
    vive: repetir(elegir(
      { hace: dormir(q, 'pieza_marilla'), si: de_noche(6, 21.5), prioridad: 9 },
      { hace: cocinar(q), si: y(tiempo.hora.entre(6, 7), no(hizo(q, cocinar).hoy)), prioridad: 6 },
      { hace: desayunar(q, 'cocina'), si: y(tiempo.hora.entre(7, 8), no(hizo(q, desayunar).hoy)), prioridad: 8 },
      { hace: cocinar(q), si: y(tiempo.hora.entre(11.25, 12)), prioridad: 6 },
      { hace: comer(q, 'cocina'), si: y(tiempo.hora.entre(12, 13), no(hizo(q, comer).hoy)), prioridad: 8 },
      { hace: cocinar(q), si: y(tiempo.hora.entre(17.25, 18)), prioridad: 6 },
      { hace: cenar(q, 'cocina'), si: y(tiempo.hora.entre(18, 19), no(hizo(q, cenar).hoy)), prioridad: 8 },
      { hace: lavar_platos(q), si: tiempo.hora.entre(6, 21.5), prioridad: 3, peso: 3 },   // (si hay platos sucios: lo pide lavar)
      { hace: barrer(q), si: y(manana, no(hizo(q, barrer).hoy)), prioridad: 3 },
      { hace: amasar(q), si: y(manana, no(domingo)), prioridad: 3 },   // (si queda poco pan)
      { hace: lavar_ropa(q), si: y(lunes, manana), prioridad: 3, peso: 2 },
      { hace: batir_mantequilla(q), si: y(o(manana, tarde), no(domingo)), prioridad: 3 },   // (si hay leche)
      { hace: ir_a_la_iglesia(q, 'cocina'), si: y(domingo, tiempo.hora.entre(10, 10.5), no(hizo(q, ir_a_la_iglesia).hoy)), prioridad: 7 },
      { hace: buscar_huevos(q), si: manana, prioridad: 3 },
      { hace: coser(q), si: y(o(manana, tarde, atardecer), no(domingo), no(hizo(q, coser).desde('<', '40m'))), prioridad: 1, peso: 3 },   // (cose un rato, y hace otra cosa)
      { hace: leer(q, 'cocina'), si: domingo, prioridad: 1 },   // (el domingo, la Biblia)
      { hace: regar(q), si: y(tarde, no(hizo(q, regar).hoy)), prioridad: 1 },
      { hace: tejer(q), si: y(o(tarde, atardecer), no(hizo(q, tejer).desde('<', '1h'))), prioridad: 1, peso: 2 },
      { hace: planchar(q), si: y(martes, o(manana, tarde), no(hizo(q, planchar).hoy)), prioridad: 3 },
      { hace: hacer_conservas(q), si: y(tarde, no(domingo), no(hizo(q, hacer_conservas).desde('<', '3d'))), prioridad: 1, peso: 2 },
      { hace: visitar_a_la_sra_lynde(q, 'cocina'), si: y(tiempo.hora.entre(14, 16), no(domingo), no(hizo(q, visitar_a_la_sra_lynde).desde('<', '2d'))), prioridad: 1, peso: 3 },
      { hace: descansar(q), prioridad: 0 },
    )),
  },
}))

export const dia_de_matthew = receta('dia_de_matthew', (q: Persona) => ({
  pasos: {
    vive: repetir(elegir(
      { hace: dormir(q, 'pieza_matthew'), si: de_noche(5.5, 21), prioridad: 9 },
      { hace: ordeñar(q), si: y(tiempo.hora.entre(5.5, 7), no(hizo(q, ordeñar).hoy)), prioridad: 6 },
      { hace: desayunar(q, 'cocina'), si: y(tiempo.hora.entre(7, 8), no(hizo(q, desayunar).hoy)), prioridad: 8 },
      { hace: comer(q, 'cocina'), si: y(tiempo.hora.entre(12, 13), no(hizo(q, comer).hoy)), prioridad: 8 },
      { hace: cenar(q, 'cocina'), si: y(tiempo.hora.entre(18, 19), no(hizo(q, cenar).hoy)), prioridad: 8 },
      { hace: ordeñar(q), si: y(tiempo.hora.entre(17, 18), no(hizo(q, ordeñar).desde('<', '6h'))), prioridad: 6 },
      { hace: dar_de_comer(q), si: y(o(tiempo.hora.entre(7.5, 9), tiempo.hora.entre(16, 17)), no(hizo(q, dar_de_comer).desde('<', '4h'))), prioridad: 3 },
      { hace: trabajar_el_campo(q), si: y(o(tiempo.hora.entre(8, 11.5), tiempo.hora.entre(13, 16.5)), no(domingo)), prioridad: 3, peso: 4 },
      { hace: partir_lena(q), si: y(cosas.lena.lt(4), tiempo.hora.entre(6, 20)), prioridad: 4 },   // (cuando se acaba la leña, deja lo que hace)
      { hace: arreglar_cerca(q), si: y(o(manana, tarde), no(domingo), no(hizo(q, arreglar_cerca).hoy)), prioridad: 3 },
      { hace: fumar_pipa(q), si: y(o(atardecer, domingo), no(hizo(q, fumar_pipa).desde('<', '1h'))), prioridad: 1, peso: 2 },
      { hace: leer(q, 'cocina'), si: atardecer, prioridad: 1 },   // (el periódico, en la cocina)
      { hace: pasear(q, 'campo'), si: y(domingo, o(manana, tarde)), prioridad: 1 },
      { hace: mirar_las_vacas(q), si: o(manana, tarde), prioridad: 1 },
      { hace: ir_a_la_iglesia(q, 'tejas_verdes'), si: y(domingo, tiempo.hora.entre(10, 10.5), no(hizo(q, ir_a_la_iglesia).hoy)), prioridad: 7 },
      { hace: descansar(q), prioridad: 0 },
    )),
  },
}))

export const dia_de_ana = receta('dia_de_ana', (q: Persona) => ({
  pasos: {
    vive: repetir(elegir(
      { hace: dormir(q, 'pieza'), si: de_noche(6.5, 21), prioridad: 9 },
      { hace: rezar(q), si: y(tiempo.hora.entre(20.5, 21), no(hizo(q, rezar).hoy)), prioridad: 8 },
      { hace: desayunar(q, 'cocina'), si: y(tiempo.hora.entre(7, 7.75), no(hizo(q, desayunar).hoy)), prioridad: 8 },
      { hace: ir_a_clases(q, 'tejas_verdes'), si: y(dia_de_clases, tiempo.hora.entre(7.75, 8.25), no(hizo(q, ir_a_clases).hoy)), prioridad: 7 },
      { hace: comer(q, 'cocina'), si: y(domingo, tiempo.hora.entre(12, 13.5), no(hizo(q, comer).hoy)), prioridad: 8 },
      { hace: ir_a_la_iglesia(q, 'tejas_verdes'), si: y(domingo, tiempo.hora.entre(10, 10.5), no(hizo(q, ir_a_la_iglesia).hoy)), prioridad: 7 },
      { hace: cenar(q, 'cocina'), si: y(tiempo.hora.entre(18, 19), no(hizo(q, cenar).hoy)), prioridad: 8 },
      { hace: jugar_con(q, 'diana'), si: y(ve(q, 'diana'), no(hizo(q, jugar_con).desde('<', '2h'))), prioridad: 5 },
      { hace: lavar_platos(q), si: tiempo.hora.entre(18.5, 20), prioridad: 3 },   // (si hay platos sucios y nadie los está lavando)
      { hace: estudiar(q, 'cocina'), si: y(dia_de_clases, tiempo.hora.entre(16, 18), no(hizo(q, estudiar).hoy)), prioridad: 3 },
      { hace: buscar_huevos(q), si: o(tarde, manana), prioridad: 1 },   // (si nadie los recogió hoy)
      { hace: leer(q, 'pieza'), si: o(tarde, atardecer, manana), prioridad: 1, peso: 3 },
      { hace: jugar_en_la_huerta(q), si: o(tarde, manana), prioridad: 1, peso: 2 },
      { hace: sonar_despierta(q), prioridad: 1, peso: 2 },
      { hace: mirar_las_vacas(q), si: o(tarde, manana), prioridad: 1 },
      { hace: descansar(q), prioridad: 0 },
    )),
  },
}))

export const dia_de_diana = receta('dia_de_diana', (q: Persona) => ({
  pasos: {
    vive: repetir(elegir(
      { hace: dormir(q, 'cuesta_del_huerto'), si: de_noche(7, 20.5), prioridad: 9 },
      { hace: volver_a_casa(q, 'cuesta_del_huerto'), si: y(tiempo.hora.entre(18, 7), no(mundo(q).lugar.es('cuesta_del_huerto'))), prioridad: 9 },
      { hace: desayunar(q, 'cuesta_del_huerto'), si: y(tiempo.hora.entre(7, 7.75), no(hizo(q, desayunar).hoy)), prioridad: 8 },
      { hace: ir_a_clases(q, 'cuesta_del_huerto'), si: y(dia_de_clases, tiempo.hora.entre(7.75, 8.25), no(hizo(q, ir_a_clases).hoy)), prioridad: 7 },
      { hace: cenar(q, 'cuesta_del_huerto'), si: y(tiempo.hora.entre(18, 19), no(hizo(q, cenar).hoy)), prioridad: 8 },
      { hace: comer(q, 'cuesta_del_huerto'), si: y(domingo, tiempo.hora.entre(12, 13.5), no(hizo(q, comer).hoy)), prioridad: 8 },
      { hace: ir_a_la_iglesia(q, 'cuesta_del_huerto'), si: y(domingo, tiempo.hora.entre(10, 10.5), no(hizo(q, ir_a_la_iglesia).hoy)), prioridad: 7 },
      { hace: pasear(q, 'cuesta_del_huerto'), si: y(o(tarde, manana), no(mundo(q).lugar.es('escuela'))), prioridad: 1 },
      { hace: visitar(q, 'ana', 'cuesta_del_huerto'), si: y(tiempo.hora.entre(15.75, 17), no(hizo(q, visitar).hoy)), prioridad: 3, peso: 2 },
      { hace: leer(q, 'cuesta_del_huerto'), si: o(tarde, atardecer, manana), prioridad: 1, peso: 2 },
      { hace: descansar(q), prioridad: 0 },
    )),
  },
}))

export const vidas = [
  vida('ana', dia_de_ana('ana')),
  vida('marilla', dia_de_marilla('marilla')),
  vida('matthew', dia_de_matthew('matthew')),
  vida('diana', dia_de_diana('diana')),
]
