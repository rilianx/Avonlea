// Tejas Verdes, todos los días: lo que hacen Ana, Marilla, Matthew y Diana cuando nada los ocupa (el juego chico del
// tablero: tools/mundo/). Cada uno tiene su vida: elegir, una y otra vez, lo que corresponde a esa hora.
// - Las acciones dicen dónde se hacen (si no está ahí, primero va), junto a qué, en qué postura y con qué: lo que el
//   dibujo necesita. Lo que dura, dura.
// - En cada momento se elige lo de más prioridad que se pueda; entre lo de igual prioridad, al azar, por peso: así no
//   todos los días son iguales. Si mientras hace algo se vuelve posible algo más importante (la hora de comer, que
//   llegó Diana), deja lo que hacía y hace eso. Dejar algo a medias no es grave: elige otra cosa.
// - Las prioridades: 9 dormir · 8 comer · 7 la escuela · 6 lo que no puede esperar (ordeñar, cocinar) · 5 estar con
//   alguien que llegó · 3 los quehaceres · 1 lo libre · 0 descansar (siempre se puede: nadie se queda sin nada que hacer)
import { elegir, hizo, no, primitivo, receta, repetir, tiempo, vida, y, o } from '../comun/lenguaje'
import { mundo, ve, type Lugar, type Persona } from '../comun/mundo'
import { ir_a, quedarse } from '../comun/verbos'

// ---------------------------------------------------------------- cuándo

const de_noche = (despierta: number, se_acuesta: number) => tiempo.hora.entre(se_acuesta, despierta)
const domingo = tiempo.semana.es('domingo'), lunes = tiempo.semana.es('lunes')
const dia_de_clases = no(domingo)
const manana = tiempo.hora.entre(6, 12), tarde = tiempo.hora.entre(13, 18), atardecer = tiempo.hora.entre(18, 21.5)

// ---------------------------------------------------------------- las acciones (las hace el mundo)

export const dormir = primitivo('dormir', (_q: Persona, cama: Lugar) => ({ donde: cama, junto_a: 'cama', postura: 'acostada', dura: '1h' }))
export const descansar = primitivo('descansar', (_q: Persona) => ({ postura: 'sentada', dura: '15m' }))
// (en la mesa de la cocina; cada uno en su casa)
export const desayunar = primitivo('desayunar', (_q: Persona, casa: Lugar) => ({ donde: casa, junto_a: 'mesa', postura: 'sentada', usa: ['taza'], dura: '25m' }))
export const comer = primitivo('comer', (_q: Persona, casa: Lugar) => ({ donde: casa, junto_a: 'mesa', postura: 'sentada', usa: ['plato'], dura: '30m' }))
export const cenar = primitivo('cenar', (_q: Persona, casa: Lugar) => ({ donde: casa, junto_a: 'mesa', postura: 'sentada', usa: ['plato'], dura: '30m' }))
// la casa
export const cocinar = primitivo('cocinar', (_q: Persona) => ({ donde: 'cocina', junto_a: 'estufa', postura: 'de_pie', usa: ['olla'], dura: '35m' }))
export const lavar_platos = primitivo('lavar_platos', (_q: Persona) => ({ donde: 'cocina', junto_a: 'fregadero', postura: 'de_pie', usa: ['platos'], dura: '20m' }))
export const barrer = primitivo('barrer', (_q: Persona) => ({ donde: 'cocina', postura: 'caminando', usa: ['escoba'], dura: '15m' }))
export const amasar = primitivo('amasar', (_q: Persona) => ({ donde: 'cocina', junto_a: 'mesa', postura: 'de_pie', usa: ['harina'], dura: '40m' }))
export const coser = primitivo('coser', (_q: Persona) => ({ donde: 'cocina', junto_a: 'ventana', postura: 'sentada', usa: ['aguja', 'tela'], dura: '45m' }))
export const lavar_ropa = primitivo('lavar_ropa', (_q: Persona) => ({ donde: 'tejas_verdes', junto_a: 'tina', postura: 'agachada', usa: ['tabla', 'jabon'], dura: '1h' }))
export const batir_mantequilla = primitivo('batir_mantequilla', (_q: Persona) => ({ donde: 'cocina', junto_a: 'mantequera', postura: 'sentada', usa: ['mantequera'], dura: '40m' }))
export const pasear = primitivo('pasear', (_q: Persona, l: Lugar) => ({ donde: l, postura: 'caminando', dura: '30m' }))
export const buscar_huevos = primitivo('buscar_huevos', (_q: Persona) => ({ donde: 'gallinero', postura: 'agachada', usa: ['canasta'], dura: '10m' }))
export const regar = primitivo('regar', (_q: Persona) => ({ donde: 'huerta', postura: 'caminando', usa: ['regadera'], dura: '15m' }))
// el campo y los animales
export const ordeñar = primitivo('ordeñar', (_q: Persona) => ({ donde: 'corral', junto_a: 'vacas', postura: 'agachada', usa: ['balde'], dura: '25m' }))
export const dar_de_comer = primitivo('dar_de_comer', (_q: Persona) => ({ donde: 'corral', postura: 'caminando', usa: ['heno'], dura: '15m' }))
export const trabajar_el_campo = primitivo('trabajar_el_campo', (_q: Persona) => ({ donde: 'campo', postura: 'caminando', usa: ['horqueta'], dura: '1h' }))
export const partir_lena = primitivo('partir_lena', (_q: Persona) => ({ donde: 'granero', junto_a: 'tronco', postura: 'de_pie', usa: ['hacha'], dura: '30m' }))
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
      { hace: lavar_platos(q), si: y(o(tiempo.hora.entre(8, 9), tiempo.hora.entre(19, 20.5)), no(hizo(q, lavar_platos).desde('<', '1h'))), prioridad: 3, peso: 3 },
      { hace: barrer(q), si: y(manana, no(hizo(q, barrer).hoy)), prioridad: 3 },
      { hace: amasar(q), si: y(manana, no(domingo), no(hizo(q, amasar).hoy)), prioridad: 3 },
      { hace: lavar_ropa(q), si: y(lunes, manana, no(hizo(q, lavar_ropa).hoy)), prioridad: 3, peso: 2 },
      { hace: batir_mantequilla(q), si: y(manana, no(domingo), no(hizo(q, batir_mantequilla).hoy)), prioridad: 3 },
      { hace: ir_a_la_iglesia(q, 'cocina'), si: y(domingo, tiempo.hora.entre(10, 10.5), no(hizo(q, ir_a_la_iglesia).hoy)), prioridad: 7 },
      { hace: buscar_huevos(q), si: y(manana, no(hizo(q, buscar_huevos).hoy)), prioridad: 3 },
      { hace: coser(q), si: y(o(manana, tarde, atardecer), no(domingo)), prioridad: 1, peso: 3 },
      { hace: leer(q, 'cocina'), si: domingo, prioridad: 1 },   // (el domingo, la Biblia)
      { hace: regar(q), si: y(tarde, no(hizo(q, regar).hoy)), prioridad: 1 },
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
      { hace: partir_lena(q), si: y(o(manana, tarde), no(domingo), no(hizo(q, partir_lena).hoy)), prioridad: 3, peso: 2 },
      { hace: arreglar_cerca(q), si: y(o(manana, tarde), no(domingo), no(hizo(q, arreglar_cerca).hoy)), prioridad: 3 },
      { hace: fumar_pipa(q), si: o(atardecer, domingo), prioridad: 1, peso: 2 },
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
      { hace: lavar_platos(q), si: y(tiempo.hora.entre(19, 20), no(hizo(q, lavar_platos).hoy)), prioridad: 3 },
      { hace: estudiar(q, 'cocina'), si: y(dia_de_clases, tiempo.hora.entre(16, 18), no(hizo(q, estudiar).hoy)), prioridad: 3 },
      { hace: buscar_huevos(q), si: y(tarde, no(hizo(q, buscar_huevos).hoy)), prioridad: 1 },
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
      { hace: pasear(q, 'huerta'), si: y(o(tarde, manana), no(mundo(q).lugar.es('escuela'))), prioridad: 1 },
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
