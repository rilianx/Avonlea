// GENERADO por tools/lenguaje/yarn.js desde comun/voces.yarn: no editar a mano.
import { _, voz } from './lenguaje'
import { enganchar, ir_a, ir_a_buscar, seguir, subir, traer } from './verbos'
import { ordenar, pedir } from './actos'

export const voces = [
  voz(pedir(_, 'ana', ir_a('ana', _)), { lineas: [{ t: "Ven, Ana.", si: true }] }),
  voz(ordenar(_, 'ana', ir_a('ana', _)), { lineas: [{ t: "Ana Shirley. Ven aquí. Ahora.", si: true }] }),
  voz(pedir(_, 'ana', subir('ana', _)), { lineas: [{ t: "Sube, Ana.", si: true }] }),
  voz(ordenar(_, 'ana', subir('ana', _)), { lineas: [{ t: "Ana Shirley. Sube. Ahora.", si: true }] }),
  voz(pedir(_, 'ana', seguir('ana', _)), { lineas: [{ t: "Ven conmigo, Ana.", si: true }] }),
  voz(ordenar(_, 'ana', seguir('ana', _)), { lineas: [{ t: "Ana Shirley. Ven conmigo. Ahora.", si: true }] }),
  voz(ir_a_buscar(_, 'ana', _), { paso: 'va', lineas: [{ t: "Aquí estás.", si: true }] }),
  voz(traer(_, 'ana', _), { paso: 'va', lineas: [{ t: "Aquí estás. Vamos.", si: true }] }),
  voz(enganchar('marilla', 'calesa'), { lineas: [{ t: "(Marilla engancha la yegua alazana a la calesa, sin apuro y sin perder un movimiento.)", si: true }] }),
]
