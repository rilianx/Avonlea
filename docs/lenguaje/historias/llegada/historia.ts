// La llegada (capítulo 2): Matthew trae a Ana de la estación de Bright River a Tejas Verdes, en la calesa, una vez que
// la encontró en la estación (comun.encontro_a_ana). Le pide que suba («Subir a la calesa»): lo decide la jugadora. Ana habla
// todo el camino, hasta que entran a la Avenida: ahí se calla (eso no es de esta historia: pasa cada vez que alguien
// pasa por la Avenida, historias/camino_blanco/; esta es solo la primera vez, la del libro).
import { historia, y } from '../../comun/lenguaje'
import { estado, hechos as comun } from '../../comun/estado'
import { llevar_a } from '../../comun/verbos'
import { dichas, escena } from './escenas.ids'

export const llegada = historia('llegada', {
  titulo: 'Matthew trae a Ana de Bright River (cap. 2)',
  empieza: y(estado.ana_en_tv.es('llegando'), comun.encontro_a_ana),

  encarga: {
    trae: { quien: 'matthew', hace: llevar_a('matthew', 'ana', 'tejas_verdes', 'calesa', 'bright_river') },
  },

  orden: [escena.ll_llegan, escena.ll_pelo, escena.ll_angelical],

  termina: dichas.ll_llegan,
  deja: [comun.llego.deja],
  punto: 'Ana llegó a Tejas Verdes, y Marilla esperaba un niño',
})
