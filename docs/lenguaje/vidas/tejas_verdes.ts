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
// - Las cosas existen, en un lugar o con alguien: el pan y los platos en la cocina, la leña en el granero (y la que
//   entraron, junto a la estufa), los huevos en el gallinero hasta que alguien los trae, la leche con Matthew hasta que
//   la deja en la cocina, el libro con Ana. Las acciones las piden, las gastan y las dejan; lo que usan —el libro para
//   leer— tiene que estar a mano. Se hace lo que hace falta: no se lava si no hay platos sucios, no se amasa si queda
//   pan, alguien entra leña cuando se acaba. Junto a cada mueble caben tantos (el fregadero, uno; la mesa, cuatro).
//   Algunas cosas pasan solas: las gallinas ponen a las seis, y se junta ropa sucia.
// - Lo que se deja a medias, se retoma: le falta lo que le faltaba (el motor lo recuerda ese día).
// - Los recados: Marilla le pide a Ana que traiga los huevos (o, el sábado, que barra), y a Matthew que entre leña.
//   No espera: queda en la lista del otro, que lo hace cuando puede —Ana, después de la escuela—, o vence y no pasa
//   nada. Si la jugadora maneja a Ana, lo ve como un recado que puede hacer o no.
// - Juntas: las mañanas de clases, Ana y Diana quedan de encontrarse en el Sendero de los Abedules, como en el libro,
//   y siguen juntas (Ana acompaña a Diana), si lo quedaron la tarde anterior (una charla). Si una no llega —Diana,
//   algunas mañanas, va directo—, la otra la espera
//   hasta casi las ocho y va sola; si Diana cambia de planes en el camino, Ana sigue sola.
import { cosasDe, elegir, esta_haciendo, hechosDe, hizo, inicioDe, mueblesDe, no, primitivo, procesos, receta, repetir, si, tiempo, tiene_recado, vida, y, o } from '../comun/lenguaje'
import { mundo, ve, type Lugar, type Persona } from '../comun/mundo'
import { acompañar, dar_recado, esperar, hacer_recado, ir_a, llevar, poner, quedarse } from '../comun/verbos'

// ---------------------------------------------------------------- cuándo

const de_noche = (despierta: number, se_acuesta: number) => tiempo.hora.entre(se_acuesta, despierta)
const domingo = tiempo.semana.es('domingo'), lunes = tiempo.semana.es('lunes'), martes = tiempo.semana.es('martes'), sabado = tiempo.semana.es('sabado')
const dia_de_clases = no(domingo)
const manana = tiempo.hora.entre(6, 12), tarde = tiempo.hora.entre(13, 18), atardecer = tiempo.hora.entre(18, 21.5)

// ---------------------------------------------------------------- las cosas, los muebles, lo que pasa solo

export const cosas = cosasDe({
  pan: { titulo: 'hogazas de pan' },
  lena: { titulo: 'leños' },
  leche: { titulo: 'baldes de leche' },
  mantequilla: { titulo: 'panes de mantequilla' },
  huevos: { titulo: 'huevos' },
  platos_sucios: { titulo: 'platos sucios' },
  ropa_sucia: { titulo: 'prendas de ropa sucia' },
  libro: { titulo: 'libros' },
  gallinas: { titulo: 'gallinas', icono: '🐔' },
  vacas: { titulo: 'vacas', icono: '🐄' },
}, {
  cocina: { pan: 3, lena: 4, mantequilla: 2, ropa_sucia: 6 },
  granero: { lena: 10 },
  gallinero: { gallinas: 8 },
  corral: { vacas: 3 },
  cuesta_del_huerto: { pan: 6, mantequilla: 3 },
  ana: { libro: 1 }, diana: { libro: 1 }, marilla: { libro: 1 }, matthew: { libro: 1 },   // (Ana, su libro de cuentos; Marilla, la Biblia; Matthew, el periódico)
})
const { en, con } = cosas
export const muebles = mueblesDe({
  cocina: { estufa: 1, fregadero: 1, mesa: 4, ventana: 2, mantequera: 1 },
  pieza: { cama: 1, ventana: 1 }, pieza_marilla: { cama: 1 }, pieza_matthew: { cama: 1 },
  granero: { tronco: 1 }, corral: { vacas: 1, cerca: { caben: 3, en: [0, 1] } }, tejas_verdes: { porche: 3, tina: { caben: 1, en: [1, 0] } },   // (la cerca, un cuadrante más abajo que las vacas; la tina, al lado del patio)
  cuesta_del_huerto: { cama: 1, mesa: 6, ventana: 2 },
})
// (lo que pasó, de los de Tejas Verdes: lo dejan las charlas —docs/lenguaje/charlas/tejas_verdes.yarn—)
export const hechos = hechosDe('tejas_verdes', {
  quedamos_en_el_sendero: 'Ana y Diana quedaron de juntarse en el Sendero de los Abedules, a la mañana siguiente, para ir a la escuela',
})
// (si quedaron —ayer, o antes de ayer si fue sábado—: hoy se juntan)
const quedaron = y(hechos.quedamos_en_el_sendero.desde('<', '3d'), no(hechos.quedamos_en_el_sendero.hoy))
// (dónde empieza cada uno: donde duerme; la calesa, en el corral)
export const inicio = inicioDe({ ana: 'pieza', marilla: 'pieza_marilla', matthew: 'pieza_matthew', diana: 'cuesta_del_huerto', calesa: 'corral' })
export const pasa_solo = procesos(
  { hora: 6, titulo: 'las gallinas ponen', deja: [si(en('gallinero').huevos.lt(12), en('gallinero').huevos.suma(6))] },
  { hora: 21, titulo: 'se junta la ropa sucia del día', deja: [en('cocina').ropa_sucia.suma(3)] },
)

// ---------------------------------------------------------------- las acciones (las hace el mundo)

export const dormir = primitivo('dormir', (_q: Persona, cama: Lugar) => ({ icono: '💤', donde: cama, junto_a: 'cama', postura: 'acostada', dura: '1h' }))
export const descansar = primitivo('descansar', (_q: Persona) => ({ icono: '🪑', postura: 'sentada', dura: '15m' }))
// (en la mesa, cada uno en su casa: comer ensucia un plato; el desayuno es pan con mantequilla, si hay)
export const desayunar = primitivo('desayunar', (_q: Persona, casa: Lugar) => ({ icono: '🍽', donde: casa, junto_a: 'mesa', postura: 'sentada', usa: ['taza'], dura: '25m',
  deja: [en(casa).platos_sucios.suma(1), si(en(casa).pan.gt(0), en(casa).pan.suma(-1)), si(en(casa).mantequilla.gt(0), en(casa).mantequilla.suma(-1))] }))
export const comer = primitivo('comer', (_q: Persona, casa: Lugar) => ({ icono: '🍽', donde: casa, junto_a: 'mesa', postura: 'sentada', usa: ['plato'], dura: '30m', deja: [en(casa).platos_sucios.suma(1)] }))
export const cenar = primitivo('cenar', (_q: Persona, casa: Lugar) => ({ icono: '🍽', donde: casa, junto_a: 'mesa', postura: 'sentada', usa: ['plato'], dura: '30m', deja: [en(casa).platos_sucios.suma(1)] }))
// la casa
// (cocinar: un leño a la estufa al empezar —sin leña junto a la estufa, no se puede—; los huevos, si hay)
export const cocinar = primitivo('cocinar', (_q: Persona) => ({ icono: '🍲', donde: 'cocina', junto_a: 'estufa', postura: 'de_pie', usa: ['olla'], dura: '35m',
  pide: en('cocina').lena.gt(0), empieza: [en('cocina').lena.suma(-1)], deja: [si(en('cocina').huevos.gt(1), en('cocina').huevos.suma(-2))] }))
export const lavar_platos = primitivo('lavar_platos', (_q: Persona) => ({ icono: '🧽', donde: 'cocina', junto_a: 'fregadero', postura: 'de_pie', usa: ['platos'], dura: '20m',
  pide: en('cocina').platos_sucios.gt(0), deja: [en('cocina').platos_sucios.vale(0)] }))
export const barrer = primitivo('barrer', (_q: Persona) => ({ icono: '🧹', donde: 'cocina', postura: 'caminando', usa: ['escoba'], dura: '15m' }))
export const amasar = primitivo('amasar', (_q: Persona) => ({ icono: '🍞', donde: 'cocina', junto_a: 'mesa', postura: 'de_pie', usa: ['harina'], dura: '40m',
  pide: en('cocina').pan.lt(3), deja: [en('cocina').pan.suma(6)] }))
export const coser = primitivo('coser', (_q: Persona) => ({ icono: '🧵', donde: 'cocina', junto_a: 'ventana', postura: 'sentada', usa: ['aguja', 'tela'], dura: '45m' }))
export const lavar_ropa = primitivo('lavar_ropa', (_q: Persona) => ({ icono: '🧺', donde: 'tejas_verdes', junto_a: 'tina', postura: 'agachada', usa: ['tabla', 'jabon'], dura: '1h',
  pide: en('cocina').ropa_sucia.gt(0), deja: [en('cocina').ropa_sucia.vale(0)] }))
// (dos baldes de leche, un pan de mantequilla)
export const batir_mantequilla = primitivo('batir_mantequilla', (_q: Persona) => ({ icono: '🧈', donde: 'cocina', junto_a: 'mantequera', postura: 'sentada', usa: ['mantequera'], dura: '40m',
  pide: en('cocina').leche.gte(2), empieza: [en('cocina').leche.suma(-2)], deja: [en('cocina').mantequilla.suma(1)] }))
export const tejer = primitivo('tejer', (_q: Persona) => ({ icono: '🧶', donde: 'cocina', junto_a: 'ventana', postura: 'sentada', usa: ['agujas', 'lana'], dura: '30m' }))
export const planchar = primitivo('planchar', (_q: Persona) => ({ icono: '👕', donde: 'cocina', junto_a: 'mesa', postura: 'de_pie', usa: ['plancha'], dura: '45m' }))
export const hacer_conservas = primitivo('hacer_conservas', (_q: Persona) => ({ icono: '🫙', donde: 'cocina', junto_a: 'estufa', postura: 'de_pie', usa: ['frascos', 'ciruelas'], dura: '1h',
  pide: en('cocina').lena.gt(0), empieza: [en('cocina').lena.suma(-1)] }))
// (conversar con alguien que está ahí: la Sra. Lynde, en su casa —está siempre, mirando el camino por la ventana—)
export const conversar = primitivo('conversar', (_q: Persona, l: Lugar) => ({ icono: '☕', donde: l, postura: 'sentada', usa: ['taza'], dura: '45m' }))
export const pasear = primitivo('pasear', (_q: Persona, l: Lugar) => ({ icono: '🚶', donde: l, postura: 'caminando', dura: '30m' }))
export const regar = primitivo('regar', (_q: Persona) => ({ icono: '🌱', donde: 'huerta', postura: 'caminando', usa: ['regadera'], dura: '15m' }))
// el campo y los animales
// (ordeñar: la leche queda con quien ordeña, en el balde, hasta que la lleva a la cocina)
export const ordeñar = primitivo('ordeñar', (q: Persona) => ({ icono: '🥛', donde: 'corral', junto_a: 'vacas', postura: 'agachada', usa: ['balde'], dura: '25m', deja: [con(q).leche.suma(2)] }))
export const dar_de_comer = primitivo('dar_de_comer', (_q: Persona) => ({ icono: '🌾', donde: 'corral', postura: 'caminando', usa: ['heno'], dura: '15m' }))
export const trabajar_el_campo = primitivo('trabajar_el_campo', (_q: Persona) => ({ icono: '🌾', donde: 'campo', postura: 'caminando', usa: ['horqueta'], dura: '1h' }))
export const partir_lena = primitivo('partir_lena', (_q: Persona) => ({ icono: '🪓', donde: 'granero', junto_a: 'tronco', postura: 'de_pie', usa: ['hacha'], dura: '30m',
  pide: en('granero').lena.lt(15), deja: [en('granero').lena.suma(5)] }))
export const arreglar_cerca = primitivo('arreglar_cerca', (_q: Persona) => ({ icono: '🔨', donde: 'corral', junto_a: 'cerca', postura: 'agachada', usa: ['martillo'], dura: '40m' }))
export const fumar_pipa = primitivo('fumar_pipa', (_q: Persona) => ({ icono: '🪈', donde: 'tejas_verdes', junto_a: 'porche', postura: 'sentada', usa: ['pipa'], dura: '30m' }))
// lo de Ana (y de Diana)
export const leer = primitivo('leer', (_q: Persona, l: Lugar) => ({ icono: '📖', donde: l, junto_a: 'ventana', postura: 'sentada', usa: ['libro'], dura: '30m' }))
export const jugar_en_la_huerta = primitivo('jugar_en_la_huerta', (_q: Persona) => ({ icono: '🎈', donde: 'huerta', postura: 'caminando', dura: '25m' }))
export const sonar_despierta = primitivo('sonar_despierta', (_q: Persona) => ({ icono: '☁️', donde: 'pieza', junto_a: 'ventana', postura: 'sentada', dura: '20m' }))
export const mirar_las_vacas = primitivo('mirar_las_vacas', (_q: Persona) => ({ icono: '🐄', donde: 'corral', junto_a: 'cerca', postura: 'de_pie', dura: '15m' }))
export const rezar = primitivo('rezar', (_q: Persona) => ({ icono: '🙏', donde: 'pieza', junto_a: 'cama', postura: 'agachada', dura: '5m' }))
export const estudiar = primitivo('estudiar', (_q: Persona, l: Lugar) => ({ icono: '✏️', donde: l, junto_a: 'mesa', postura: 'sentada', usa: ['libro'], dura: '30m' }))
// (con otra: si se ven; si una se va, la otra deja)
export const jugar_con = primitivo('jugar_con', (q: Persona, otra: Persona) => ({ icono: '🎈', pide: ve(q, otra), postura: 'caminando', dura: '30m' }))

// ---------------------------------------------------------------- las actividades (varios pasos)

// (ir a clases: ir, quedarse hasta las tres y media, y volver; si se va antes —se escapa, la jugadora se la lleva—,
// la deja: nada más)
export const ir_a_clases = receta('ir_a_clases', (q: Persona, casa: Lugar) => ({ icono: '🏫',
  pasos: {
    va: ir_a(q, 'escuela'),
    clase: quedarse(q, tiempo.hora.desde(15.5)),
    vuelve: ir_a(q, casa),
  },
}))
// QUEDAR DE ENCONTRARSE, como en el libro: cada mañana de clases, Ana y Diana se juntan en el Sendero de los Abedules
// y siguen juntas. Cada una va, y espera a la otra hasta una hora; si la otra no llega, no se encontraron (y va sola).
export const encontrarse_en = receta('encontrarse_en', (q: Persona, otra: Persona, l: Lugar, hasta: number) => ({ icono: '⏳',
  pasos: {
    va: ir_a(q, l),
    espera: esperar(q, o(ve(q, otra), tiempo.hora.desde(hasta))),
  },
  cumplido: ve(q, otra),
}))
// (Diana: se encuentran, espera a que Ana vaya con ella —que la siga—, y van. Si Ana no llegó, va sola igual)
export const ir_a_clases_por = receta('ir_a_clases_por', (q: Persona, otra: Persona, l: Lugar, casa: Lugar) => ({ icono: '🏫',
  pasos: {
    va: ir_a(q, l),
    espera: esperar(q, o(mundo(otra).sigue.es(q), tiempo.hora.desde(7.95))),
    sigue: ir_a(q, 'escuela'),
    clase: quedarse(q, tiempo.hora.desde(15.5)),
    vuelve: ir_a(q, casa),
  },
}))
// (Ana: se encuentran, y la acompaña hasta la escuela. Si Diana no llega, o cambia de planes en el camino, esto no se
// cumplió: su día elige otra vez, e irá sola)
export const ir_a_clases_con = receta('ir_a_clases_con', (q: Persona, otra: Persona, l: Lugar, casa: Lugar) => ({ icono: '🏫',
  pasos: {
    encuentro: encontrarse_en(q, otra, l, 7.95),
    van: acompañar(q, otra, mundo(q).lugar.es('escuela')),
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
export const ir_a_la_iglesia = receta('ir_a_la_iglesia', (q: Persona, casa: Lugar) => ({ icono: '⛪',
  pasos: {
    va: ir_a(q, 'iglesia'),
    misa: quedarse(q, tiempo.hora.desde(12)),
    vuelve: ir_a(q, casa),
  },
}))
// (una visita a la Sra. Lynde: ir a la Hondonada, conversar, volver)
export const visitar_a_la_sra_lynde = receta('visitar_a_la_sra_lynde', (q: Persona, casa: Lugar) => ({ icono: '☕',
  pasos: { va: ir_a(q, 'hondonada_lynde'), conversan: conversar(q, 'hondonada_lynde'), vuelve: ir_a(q, casa) },
}))
// (traer los huevos del gallinero al canasto de la cocina: si hay)
export const recoger_huevos = receta('recoger_huevos', (q: Persona) => ({ pide: en('gallinero').huevos.gt(0), pasos: { trae: llevar(q, 'huevos', 12, 'gallinero', 'cocina') } }))
// (entrar leña del granero a la estufa: cuando queda poca, si hay partida)
export const entrar_lena = receta('entrar_lena', (q: Persona) => ({ pide: y(en('cocina').lena.lt(3), en('granero').lena.gt(0)), pasos: { trae: llevar(q, 'lena', 4, 'granero', 'cocina') } }))
// (dejar la leche del balde en la cocina)
export const dejar_la_leche = receta('dejar_la_leche', (q: Persona) => ({ pide: con(q).leche.gt(0), pasos: { va: ir_a(q, 'cocina'), deja: poner(q, 'leche', 4) } }))
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
      { hace: barrer(q), si: y(manana, no(hizo(q, barrer).hoy), no(hizo('ana', barrer).hoy)), prioridad: 3 },
      { hace: amasar(q), si: y(manana, no(domingo)), prioridad: 3 },   // (si queda poco pan)
      { hace: lavar_ropa(q), si: y(lunes, manana), prioridad: 3, peso: 2 },
      { hace: batir_mantequilla(q), si: y(o(manana, tarde), no(domingo)), prioridad: 3 },   // (si hay leche)
      { hace: ir_a_la_iglesia(q, 'cocina'), si: y(domingo, tiempo.hora.entre(10, 10.5), no(hizo(q, ir_a_la_iglesia).hoy)), prioridad: 7 },
      { hace: recoger_huevos(q), si: y(o(manana, tarde), no(ve(q, 'ana')), no(tiene_recado('ana', recoger_huevos)), no(hizo(q, dar_recado).desde('<', '6h'))), prioridad: 3 },   // (si Ana está, se lo pide a ella; si se lo pidió, espera; si a Ana se le pasó, los trae ella)
      // (los recados: uno cada tanto, al que está ahí; ella no espera. Los huevos y la leña los pide conversando: charlas)
      { hace: dar_recado(q, 'ana', barrer('ana'), '12h'), si: y(sabado, manana, no(hizo(q, barrer).hoy), no(hizo(q, dar_recado).desde('<', '2h'))), prioridad: 4 },
      { hace: dar_recado(q, 'matthew', partir_lena('matthew'), '4h'), si: y(en('granero').lena.lt(2), en('cocina').lena.lt(3), no(hizo(q, dar_recado).desde('<', '1h'))), prioridad: 4 },
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
      { hace: dejar_la_leche(q), prioridad: 6 },   // (si trae leche en el balde)
      { hace: hacer_recado(q), si: tiempo.hora.entre(6, 20), prioridad: 4 },   // (lo que le pidió Marilla: deja lo que hace)
      { hace: dar_de_comer(q), si: y(o(tiempo.hora.entre(7.5, 9), tiempo.hora.entre(16, 17)), no(hizo(q, dar_de_comer).desde('<', '4h'))), prioridad: 3 },
      { hace: trabajar_el_campo(q), si: y(o(tiempo.hora.entre(8, 11.5), tiempo.hora.entre(13, 16.5)), no(domingo)), prioridad: 3, peso: 4 },
      { hace: entrar_lena(q), si: tiempo.hora.entre(6, 20), prioridad: 4 },   // (cuando queda poca junto a la estufa, deja lo que hace)
      { hace: partir_lena(q), si: y(en('granero').lena.lt(6), o(manana, tarde), no(domingo)), prioridad: 3 },
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
      { hace: ir_a_clases(q, 'tejas_verdes'), si: y(dia_de_clases, tiempo.hora.entre(7.85, 8.25), no(hizo(q, ir_a_clases).hoy), no(hizo(q, ir_a_clases_con).hoy)), prioridad: 7 },   // (sola: si no se encontraron)
      { hace: ir_a_clases_con(q, 'diana', 'arbustos', 'tejas_verdes'), si: y(dia_de_clases, quedaron, tiempo.hora.entre(7.6, 7.85), no(hizo(q, ir_a_clases).hoy), no(hizo(q, ir_a_clases_con).hoy), o(no(ve(q, 'diana')), esta_haciendo('diana', ir_a_clases_por))), prioridad: 7 },   // (con Diana: se encuentran en el sendero; no si Diana, ahí, está en otra cosa)
      { hace: comer(q, 'cocina'), si: y(domingo, tiempo.hora.entre(12, 13.5), no(hizo(q, comer).hoy)), prioridad: 8 },
      { hace: ir_a_la_iglesia(q, 'tejas_verdes'), si: y(domingo, tiempo.hora.entre(10, 10.5), no(hizo(q, ir_a_la_iglesia).hoy)), prioridad: 7 },
      { hace: cenar(q, 'cocina'), si: y(tiempo.hora.entre(18, 19), no(hizo(q, cenar).hoy)), prioridad: 8 },
      { hace: jugar_con(q, 'diana'), si: y(ve(q, 'diana'), no(hizo(q, jugar_con).desde('<', '2h'))), prioridad: 5 },
      { hace: lavar_platos(q), si: tiempo.hora.entre(18.5, 20), prioridad: 3 },   // (si hay platos sucios y nadie los está lavando)
      { hace: estudiar(q, 'cocina'), si: y(dia_de_clases, tiempo.hora.entre(16, 18), no(hizo(q, estudiar).hoy)), prioridad: 3 },
      { hace: recoger_huevos(q), si: o(tarde, manana), prioridad: 1 },   // (si hay huevos en el gallinero)
      { hace: hacer_recado(q), si: tiempo.hora.entre(6.5, 20.5), prioridad: 1, peso: 4 },   // (lo que le pidió Marilla: entre lo libre, lo más probable; a veces sueña despierta antes, o se le pasa)
      { hace: entrar_lena(q), si: o(tarde, atardecer), prioridad: 3 },   // (si queda poca leña junto a la estufa)
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
      { hace: dormir(q, 'cuesta_del_huerto'), si: de_noche(6.5, 20.5), prioridad: 9 },
      { hace: volver_a_casa(q, 'cuesta_del_huerto'), si: y(tiempo.hora.entre(18, 7), no(mundo(q).lugar.es('cuesta_del_huerto'))), prioridad: 9 },
      { hace: desayunar(q, 'cuesta_del_huerto'), si: y(tiempo.hora.entre(7, 7.75), no(hizo(q, desayunar).hoy)), prioridad: 8 },
      { hace: ir_a_clases(q, 'cuesta_del_huerto'), si: y(dia_de_clases, tiempo.hora.entre(7.4, 8.25), no(hizo(q, ir_a_clases).hoy), no(hizo(q, ir_a_clases_por).hoy)), prioridad: 7 },   // (directo: algunas mañanas)
      { hace: ir_a_clases_por(q, 'ana', 'arbustos', 'cuesta_del_huerto'), si: y(dia_de_clases, quedaron, tiempo.hora.entre(7.4, 7.9), no(hizo(q, ir_a_clases_por).hoy), no(hizo(q, ir_a_clases).hoy)), prioridad: 7, peso: 3 },   // (por el sendero, a encontrarse con Ana)
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
