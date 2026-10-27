// La historia de White Sands (capítulos 5 y 6), en el lenguaje de docs/LENGUAJE.md (§10): un grafo de escenas
// (escenas.yarn) y encargos, con su entrada y su salida.
// Todo lo de esta carpeta es local a la historia: sus hechos, sus condiciones, sus escenas, sus voces. Otras historias
// solo ven lo que exporta index.ts; se tocan con ella por el estado común (comun/estado.ts): la pide la primera noche
// de Ana (hechos.primera_noche) y deja ana_en_tv = decidida, que es lo que pide la historia siguiente.
import { hechosDe, historia, tiempo, y } from '../../comun/lenguaje'
import { mundo } from '../../comun/mundo'
import { cualidad, estado, hechos as comun } from '../../comun/estado'
import { conseguir_que, esperar_en, llevar_a } from '../../comun/verbos'
import { dichas, escena } from './escenas.ids'

// ---------------------------------------------------------------- lo local

// los hechos que dejan las elecciones de la jugadora en esta historia
export const hechos = hechosDe('white_sands', {
  ws_corrio: 'Ana bajó de la calesa y corrió llorando hasta el mar',
  ws_callo: 'Ana aguantó en silencio lo que dijo la Sra. Pye',
  ws_pregunto: 'en la orilla, Ana le preguntó a Marilla si la iba a devolver',
  ws_miro_mar: 'en la orilla, Ana y Marilla miraron el mar sin hablar',
  ws_perdon: 'en la orilla, Ana pidió perdón por salir corriendo',
  ws_mira: 'donde la Sra. Spencer, Ana miró a Marilla sin decir nada',
  ws_ofrece: 'donde la Sra. Spencer, Ana se ofreció a trabajar',
  blewett_suplica: 'Ana le suplicó a Marilla que no la diera',
  blewett_calla: 'Ana se quedó callada ante la Sra. Blewett',
  blewett_orgullo: 'Ana dijo que prefería el orfanato antes que la Sra. Blewett',
  ws_promete: 'de vuelta, Ana prometió ser todo lo que Marilla quisiera',
  ws_calla_vuelta: 'de vuelta, Ana miró el mar en silencio',
})

// las condiciones con nombre
export const a_prueba = estado.ana_en_tv.lt('decidida')                      // todavía no la decidieron
export const marilla_con_paciencia = cualidad('marilla', 'paciencia', 'ana').gte(1)   // si no: viaje en silencio, y duda de verdad
export const hora_de_salir = tiempo.hora.entre(14, 19)                      // después del almuerzo, antes de que oscurezca

// ---------------------------------------------------------------- la historia

export const white_sands = historia('white_sands', {
  titulo: 'Marilla lleva a Ana a White Sands, a devolverla (cap. 5 y 6)',
  empieza: y(a_prueba, comun.primera_noche, hora_de_salir),

  // lo que la historia le encarga a cada uno: sus etiquetas nombran los momentos de las escenas
  encarga: {
    busca: { quien: 'marilla', hace: conseguir_que('marilla', 'ana', mundo('ana').lugar.es('cocina')) },
    ida: { quien: 'marilla', tras: [escena.viaje_spencer, escena.viaje_spencer_duda],
      hace: llevar_a('marilla', 'ana', 'hotel_white_sands', 'calesa', 'costa') },
    pye: { quien: 'srapye', tras: [escena.viaje_spencer, escena.viaje_spencer_duda],
      hace: esperar_en('srapye', 'playa', dichas.ws_pye) },
    vuelta: { quien: 'marilla', tras: [escena.ws_spencer, escena.ws_spencer_duda],
      hace: llevar_a('marilla', 'ana', 'tejas_verdes', 'calesa', 'costa') },
  },

  // la prioridad: la primera elegible gana (las que no están, por especificidad)
  orden: [escena.falta_viaje, escena.ws_orilla, escena.ws_pye, escena.ws_mar, escena.ws_t3, escena.ws_t2, escena.ws_t1],

  termina: dichas.ws_noche,
  deja: [estado.ana_en_tv.vale('decidida'), comun.conoce_blewett.deja],
  punto: 'Marilla decidió quedársela, a prueba',

  // (Ana no volvió a la calesa en cuatro intentos: la historia se pierde; otra —«Marilla la devuelve»— la pide)
  falla: encargo => encargo.ida.estado.es('fallido'),
})
