// GENERADO por tools/lenguaje/yarn.js desde historias/llegada/escenas.yarn y voces.yarn: no editar a mano.
import { llegada } from './historia'
import { escena } from './escenas.ids'
import { _, defEscena, momento, tras, voz, y } from '../../comun/lenguaje'
import { subir } from '../../comun/verbos'
import { pedir } from '../../comun/actos'

export const escenas = {
  ll_pelo: defEscena(escena.ll_pelo, {
    resumen: "En la calesa, saliendo de Bright River: Ana es casi perfectamente feliz, salvo por el pelo.",
    se_activa: [momento(llegada.encargo.trae, 'camino', 'empieza')],
    si: y(),
    en_marcha: true,
    hablan: ['ana', 'matthew'],
    cuerpo: [
      { q: 'ana', t: "Ahora me siento casi perfectamente feliz. No puedo ser del todo perfectamente feliz porque… bueno, ¿de qué color diría usted que es esto?" },
      { q: 'matthew', t: "Es rojo, ¿no?" },
      { q: 'ana', t: "(Suspira desde la punta de los pies.) Sí, es rojo. Ahora entiende por qué no puedo ser perfectamente feliz. Nadie que tenga el pelo rojo podría." },
      { q: 'ana', t: "Lo demás no me importa tanto: las pecas, los ojos verdes, lo flaca. Puedo imaginar que tengo un cutis de pétalo de rosa y ojos violeta como estrellas." },
      { q: 'ana', t: "Pero el pelo rojo NO puedo imaginármelo lejos. Hago lo posible. Pienso: «Ahora mi pelo es de un negro glorioso, negro como el ala del cuervo»." },
      { q: 'ana', t: "Pero todo el tiempo SÉ que es simplemente rojo, y eso me rompe el corazón. Será la pena de toda mi vida." },
      { q: 'ana', t: "¿Qué es una frente de alabastro? Nunca he podido averiguarlo. ¿Usted me lo puede decir?" },
      { q: 'matthew', t: "Bueno, pues, me temo que no." },
    ],
  }),
  ll_angelical: defEscena(escena.ll_angelical, {
    resumen: "Divinamente hermosa, deslumbrantemente inteligente o angelicalmente buena.",
    se_activa: [tras(escena.ll_pelo)],
    si: y(),
    en_marcha: true,
    hablan: ['ana', 'matthew'],
    cuerpo: [
      { q: 'ana', t: "Si pudiera elegir, ¿qué preferiría ser: divinamente hermoso, deslumbrantemente inteligente o angelicalmente bueno?" },
      { q: 'matthew', t: "Bueno, pues, yo… no sé exactamente." },
      { q: 'ana', t: "Yo tampoco. Nunca me decido. Pero en realidad da casi lo mismo, porque no es probable que llegue a ser ninguna de las tres." },
      { q: 'ana', t: "Ser angelicalmente buena debe ser muy cansador. Habría que andar siempre con cara de vitral de iglesia." },
      { q: 'matthew', t: "Je." },
      { q: 'ana', t: "El cielo se está poniendo rosado. ¿No es raro que el cielo se ruborice todas las tardes? Como si alguien le dijera un cumplido." },
      { q: 'matthew', t: "Ya lo creo." },
      { q: 'ana', t: "Lo que es seguro es que nunca seré angelicalmente buena. La señora Spencer dice que…" },
    ],
  }),
  ll_llegan: defEscena(escena.ll_llegan, {
    resumen: "La calesa entra al patio de Tejas Verdes. Marilla sale a la puerta: esperaba un niño.",
    se_activa: [momento(llegada.encargo.trae, '', 'cumplido')],
    si: y(),
    hablan: ['narra', 'marilla', 'matthew'],
    cuerpo: [
      { q: 'narra', t: "Ya es de noche cuando la calesa entra al patio de Tejas Verdes. Marilla sale a la puerta con una lámpara en la mano." },
      { q: 'marilla', t: "Matthew Cuthbert, ¿quién es esa? ¿Dónde está el niño?" },
      { q: 'matthew', t: "(Matthew se rasca la nuca.) No había ningún niño, Marilla. Solo estaba ella." },
    ],
  }),
}

export const voces = [
  voz(pedir('matthew', 'ana', subir('ana', _)), { lineas: [{ t: "(Matthew le tiende la mano, sin mirarla, para ayudarla a subir.) Bueno, pues… sube.", si: true }] }),
]
