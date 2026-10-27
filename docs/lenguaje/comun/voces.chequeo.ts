// GENERADO por tools/lenguaje/yarn.js desde comun/voces.yarn: no editar a mano.
import { _, voz } from './lenguaje'
import { enganchar, ir_a, subir, traer } from './verbos'
import { ordenar, pedir } from './actos'

voz(pedir(_, 'ana', ir_a('ana', _)), { lineas: [true] })
voz(ordenar(_, 'ana', ir_a('ana', _)), { lineas: [true] })
voz(pedir(_, 'ana', subir('ana', _)), { lineas: [true] })
voz(ordenar(_, 'ana', subir('ana', _)), { lineas: [true] })
voz(traer(_, 'ana', _), { paso: 'va', lineas: [true] })
voz(enganchar('marilla', 'calesa'), { lineas: [true] })
