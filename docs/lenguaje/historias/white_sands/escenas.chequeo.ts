// GENERADO por tools/lenguaje/yarn.js desde historias/white_sands/escenas.yarn y voces.yarn: no editar a mano.
import { hechos, marilla_con_paciencia, white_sands } from './historia'
import { dichas, escena } from './escenas.ids'
import { _, defEscena, deja, hace, log, momento, no, responde, suma, tras, voz, y } from '../../comun/lenguaje'
import { ve } from '../../comun/mundo'
import { cualidad } from '../../comun/estado'
import { bajar, correr_a, ir_a, subir, traer } from '../../comun/verbos'
import { disculparse, informar, ofender, ordenar, pedir } from '../../comun/actos'

defEscena(escena.ws_no_sube, {
  se_activa: [responde('ana', 'rechaza', pedir)],
  si: y(white_sands.encargo.ida.estado.es('en_curso')),
  hablan: ['marilla', 'ana'],
  efectos: [suma(cualidad('marilla', 'paciencia', 'ana'), -1)],
})
defEscena(escena.ws_no_sube_orden, {
  se_activa: [responde('ana', 'rechaza', ordenar)],
  si: y(white_sands.encargo.ida.estado.es('en_curso')),
  hablan: ['narra', 'marilla'],
  efectos: [suma(cualidad('marilla', 'paciencia', 'ana'), -1)],
})
defEscena(escena.falta_viaje, {
  se_activa: [hace('marilla', traer, '', 'cumplido')],
  si: y(white_sands.encargo.busca.estado.es('en_curso')),
  hablan: ['narra', 'marilla'],
  efectos: [suma(cualidad('marilla', 'paciencia', 'ana'), -1)],
})
defEscena(escena.viaje_spencer, {
  se_activa: [momento(white_sands.encargo.busca, '', 'cumplido')],
  si: y(marilla_con_paciencia),
  hablan: ['narra', 'marilla', 'ana'],
  efectos: [],
})
defEscena(escena.viaje_spencer_duda, {
  se_activa: [momento(white_sands.encargo.busca, '', 'cumplido')],
  si: y(no(marilla_con_paciencia)),
  hablan: ['narra', 'marilla', 'ana'],
  efectos: [],
})
defEscena(escena.ws_t1, {
  se_activa: [momento(white_sands.encargo.ida, 'camino', 'empieza')],
  si: y(marilla_con_paciencia),
  hablan: ['ana', 'marilla'],
  efectos: [],
})
defEscena(escena.ws_t2, {
  se_activa: [tras(escena.ws_t1), momento(white_sands.encargo.ida, 'camino.hondonada_lynde', 'cumplido')],
  si: y(marilla_con_paciencia),
  hablan: ['marilla', 'ana'],
  efectos: [],
})
defEscena(escena.ws_t3, {
  se_activa: [tras(escena.ws_t2), momento(white_sands.encargo.ida, 'camino.escuela', 'cumplido')],
  si: y(marilla_con_paciencia),
  hablan: ['ana', 'marilla'],
  efectos: [],
})
defEscena(escena.ws_mar, {
  se_activa: [momento(white_sands.encargo.ida, 'camino.playa', 'empieza')],
  si: y(),
  hablan: ['ana', 'marilla'],
  efectos: [],
})
defEscena(escena.ws_pye, {
  se_activa: [momento(white_sands.encargo.ida, 'camino.playa', 'cumplido')],
  si: y(dichas.ws_mar, ve('srapye', 'ana')),
  hablan: ['srapye', 'marilla', 'ana'],
  efectos: [ofender('srapye', 'ana'), deja(hechos.ws_corrio), bajar('ana'), correr_a('ana', 'orilla'), deja(hechos.ws_callo)],
})
defEscena(escena.ws_orilla, {
  se_activa: [hace('marilla', traer, 'va', 'cumplido')],
  si: y(hechos.ws_corrio.hoy),
  hablan: ['narra', 'marilla', 'ana'],
  efectos: [suma(cualidad('marilla', 'afecto', 'ana'), 1), deja(hechos.ws_pregunto), suma(cualidad('marilla', 'afecto', 'ana'), 1), deja(hechos.ws_miro_mar), disculparse('ana', 'marilla'), deja(hechos.ws_perdon)],
})
defEscena(escena.ws_spencer, {
  se_activa: [momento(white_sands.encargo.ida, '', 'cumplido')],
  si: y(marilla_con_paciencia),
  hablan: ['narra', 'spencer', 'ana', 'marilla', 'blewett'],
  efectos: [informar('marilla', 'spencer', 'equivocacion'), deja(hechos.ws_mira), deja(hechos.ws_ofrece)],
})
defEscena(escena.ws_spencer_duda, {
  se_activa: [momento(white_sands.encargo.ida, '', 'cumplido')],
  si: y(no(marilla_con_paciencia)),
  hablan: ['narra', 'ana'],
  efectos: [deja(hechos.blewett_suplica), deja(hechos.blewett_calla), deja(hechos.blewett_orgullo)],
})
defEscena(escena.ws_vuelta, {
  se_activa: [momento(white_sands.encargo.vuelta, 'camino', 'empieza')],
  si: y(marilla_con_paciencia),
  hablan: ['ana', 'marilla'],
  efectos: [deja(hechos.ws_promete), deja(hechos.ws_calla_vuelta)],
})
defEscena(escena.ws_noche, {
  se_activa: [momento(white_sands.encargo.vuelta, '', 'cumplido')],
  si: y(),
  hablan: ['narra', 'ana'],
  efectos: [suma(cualidad('marilla', 'afecto', 'ana'), 1), log('Marilla llevó a Ana a White Sands; la Sra. Blewett la quería de sirvienta, y Marilla no se la dio. Esa noche le dijo a Matthew que se la quedaba; a Ana, todavía no.')],
})
voz(pedir('marilla', 'ana', ir_a('ana', 'cocina')), { lineas: [true] })
voz(traer('marilla', 'ana', _), { paso: 'va', lineas: [white_sands.encargo.busca.estado.es('en_curso')] })
voz(pedir('marilla', 'ana', ir_a('ana', _)), { lineas: [white_sands.encargo.ida.estado.es('en_curso')] })
voz(pedir('marilla', 'ana', subir('ana', 'calesa')), { lineas: [true, hechos.ws_corrio.hoy] })
voz(ordenar('marilla', 'ana', subir('ana', 'calesa')), { lineas: [true, no(marilla_con_paciencia)] })
voz(bajar('ana'), { lineas: [white_sands.encargo.ida.estado.es('cumplido')] })
