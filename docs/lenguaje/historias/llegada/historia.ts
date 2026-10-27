// La llegada (capítulo 2): Matthew trae a Ana de la estación de Bright River a Tejas Verdes, en la calesa. Ana habla
// todo el camino, hasta que entran a la Avenida: ahí se calla (eso no es de esta historia: pasa cada vez que alguien
// pasa por la Avenida, historias/camino_blanco/; esta es solo la primera vez, la del libro).
import { historia } from '../../comun/lenguaje'
import { estado, hechos as comun } from '../../comun/estado'
import { llevar_a } from '../../comun/verbos'
import { dichas, escena } from './escenas.ids'

export const llegada = historia('llegada', {
  titulo: 'Matthew trae a Ana de Bright River (cap. 2)',
  empieza: estado.ana_en_tv.es('llegando'),

  encarga: {
    trae: { quien: 'matthew', hace: llevar_a('matthew', 'ana', 'tejas_verdes', 'calesa', 'bright_river') },
  },

  orden: [escena.ll_llegan, escena.ll_pelo, escena.ll_angelical],

  termina: dichas.ll_llegan,
  deja: [comun.llego.deja],
  punto: 'Ana llegó a Tejas Verdes, y Marilla esperaba un niño',
})
