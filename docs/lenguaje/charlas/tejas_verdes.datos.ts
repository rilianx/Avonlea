// GENERADO por tools/lenguaje/yarn.js desde charlas/tejas_verdes.yarn: no editar a mano.
import { charla } from './tejas_verdes.ids'
import { arreglar_cerca, cosas, entrar_lena, hechos, recoger_huevos } from '../vidas/tejas_verdes'
import { defCharla, deja, hizo, no, tiempo, tiene_recado, y } from '../comun/lenguaje'
import { dar_recado } from '../comun/verbos'

export const charlas = {
  buenos_dias: defCharla(charla.buenos_dias, {
    resumen: "Marilla le da los buenos días a Ana, a su manera.",
    entre: ['marilla', 'ana'],
    si: y(tiempo.hora.entre(6, 9)),
    repetir: 'dia',
    peso: 3,
    hablan: ['marilla'],
    cuerpo: [
      { q: 'marilla', t: "Buenos días, Ana. Lávate la cara y peina esas trenzas antes de sentarte a la mesa." },
      { op: "Buenos días, Srta. Cuthbert. Ya voy.", propia: true, cuerpo: [] },
      { op: "¿No es una mañana preciosa? Desde la ventana se ve la Reina de las Nieves toda blanca.", cuerpo: [{ q: 'marilla', t: "El cerezo no se va a ir a ninguna parte, Ana. El desayuno sí se enfría." }] },
    ],
  }),
  los_huevos: defCharla(charla.los_huevos, {
    resumen: "Marilla le pide a Ana que traiga los huevos del gallinero.",
    entre: ['marilla', 'ana'],
    si: y(cosas.en('gallinero').huevos.gt(0), no(tiene_recado('ana', recoger_huevos)), no(hizo('ana', recoger_huevos).hoy)),
    repetir: 'dia',
    peso: 2,
    hablan: ['marilla'],
    cuerpo: [
      { q: 'marilla', t: "Ana, cuando puedas, trae los huevos del gallinero. Y no te quedes soñando entre las gallinas." },
      { hace: dar_recado('marilla', 'ana', recoger_huevos('ana'), '12h') },
      { op: "Sí, Srta. Cuthbert.", propia: true, cuerpo: [] },
      { op: "¿Puedo ponerle nombre a la gallina pinta?", cuerpo: [{ q: 'marilla', t: "Las gallinas no necesitan nombre, Ana. Necesitan que alguien recoja sus huevos." }] },
    ],
  }),
  la_lena: defCharla(charla.la_lena, {
    resumen: "Marilla le avisa a Matthew que se está acabando la leña de la estufa.",
    entre: ['marilla', 'matthew'],
    si: y(cosas.en('cocina').lena.lt(3), cosas.en('granero').lena.gt(0), no(tiene_recado('matthew', entrar_lena))),
    repetir: 'siempre',
    peso: 3,
    hablan: ['marilla', 'matthew'],
    cuerpo: [
      { q: 'marilla', t: "Matthew, se está acabando la leña de la estufa." },
      { hace: dar_recado('marilla', 'matthew', entrar_lena('matthew'), '2h') },
      { q: 'matthew', t: "Bueno... sí. Ya la entro." },
    ],
  }),
  la_cerca: defCharla(charla.la_cerca, {
    resumen: "Marilla le recuerda a Matthew la cerca del corral.",
    entre: ['marilla', 'matthew'],
    si: y(tiempo.hora.entre(17, 21), no(hizo('matthew', arreglar_cerca).hoy)),
    repetir: 'dia',
    hablan: ['marilla', 'matthew'],
    cuerpo: [
      { q: 'marilla', t: "Matthew, la cerca del corral está otra vez floja. Un día de estos se nos escapa la vaca." },
      { q: 'matthew', t: "Bueno... sí. Mañana la veo." },
    ],
  }),
  como_te_fue: defCharla(charla.como_te_fue, {
    resumen: "Matthew le pregunta a Ana cómo le fue, y Ana le cuenta.",
    entre: ['matthew', 'ana'],
    si: y(tiempo.hora.entre(15, 20)),
    repetir: 'dia',
    peso: 2,
    hablan: ['matthew', 'ana'],
    cuerpo: [
      { q: 'matthew', t: "Bueno, Ana... ¿cómo te fue hoy?" },
      { q: 'ana', t: "¡Oh, Sr. Cuthbert! Pasaron tantas cosas que no sé por dónde empezar." },
      { op: "Contarle todo, desde el principio.", propia: true, cuerpo: [{ q: 'ana', t: "Primero, el camino estaba lleno de rocío, y cada gota era como un diamante pequeñito…" }, { q: 'matthew', t: "Bueno, bueno. Cuéntame." }] },
      { op: "Preguntarle por las vacas.", cuerpo: [{ q: 'matthew', t: "Pues… están bien. La pinta da más leche que nunca." }] },
    ],
  }),
  quedamos: defCharla(charla.quedamos, {
    resumen: "Ana y Diana quedan de juntarse mañana en el Sendero de los Abedules, para ir a la escuela.",
    entre: ['ana', 'diana'],
    si: y(tiempo.hora.entre(14, 19), no(tiempo.semana.es('sabado')), no(hechos.quedamos_en_el_sendero.hoy)),
    repetir: 'dia',
    peso: 4,
    hablan: ['diana'],
    cuerpo: [
      { q: 'diana', t: "¿Mañana nos juntamos en el sendero, como siempre?" },
      { op: "¡Claro! Te espero junto a los abedules.", propia: true, cuerpo: [{ hace: deja(hechos.quedamos_en_el_sendero) }, { q: 'diana', t: "¡Hasta mañana, Ana!" }] },
      { op: "Mañana no puedo: Marilla quiere que vaya temprano.", cuerpo: [{ q: 'diana', t: "Bueno. Entonces nos vemos allá." }] },
    ],
  }),
  el_lago: defCharla(charla.el_lago, {
    resumen: "Ana inventa un juego para las dos.",
    entre: ['ana', 'diana'],
    si: y(tiempo.hora.entre(14, 19)),
    repetir: 'dia',
    peso: 2,
    hablan: ['ana', 'diana'],
    cuerpo: [
      { q: 'ana', t: "Diana, ¿y si jugamos a que el estanque es un lago encantado, y en el fondo vive una dama de niebla?" },
      { q: 'diana', t: "¡Sí! Pero tú hablas con ella. A mí me da miedo." },
    ],
  }),
  buenas_tardes_diana: defCharla(charla.buenas_tardes_diana, {
    resumen: "Diana saluda a Marilla, muy formal.",
    entre: ['marilla', 'diana'],
    si: y(tiempo.hora.entre(13, 19)),
    repetir: 'dia',
    hablan: ['diana', 'marilla'],
    cuerpo: [
      { q: 'diana', t: "Buenas tardes, Srta. Cuthbert." },
      { q: 'marilla', t: "Buenas tardes, Diana. ¿Cómo está tu madre?" },
      { q: 'diana', t: "Bien, gracias. Le manda saludos." },
    ],
  }),
  a_la_cama: defCharla(charla.a_la_cama, {
    resumen: "Marilla manda a Ana a la cama.",
    entre: ['marilla', 'ana'],
    si: y(tiempo.hora.entre(19, 21.5)),
    repetir: 'dia',
    peso: 2,
    hablan: ['marilla'],
    cuerpo: [
      { q: 'marilla', t: "A la cama, Ana. Y no te olvides de rezar." },
      { op: "Buenas noches, Srta. Cuthbert.", propia: true, cuerpo: [] },
      { op: "¿Puedo leer un ratito más?", cuerpo: [{ q: 'marilla', t: "Ni un ratito. Las velas no crecen en los árboles." }] },
    ],
  }),
  el_sr_cuthbert: defCharla(charla.el_sr_cuthbert, {
    resumen: "Diana saluda a Matthew, que no sabe muy bien qué decirle a una niña.",
    entre: ['matthew', 'diana'],
    si: y(tiempo.hora.entre(13, 19)),
    repetir: 'dia',
    hablan: ['diana', 'matthew'],
    cuerpo: [
      { q: 'diana', t: "Buenas tardes, Sr. Cuthbert." },
      { q: 'matthew', t: "Bueno… buenas tardes. Ana está… por ahí, creo." },
      { q: 'diana', t: "Gracias, Sr. Cuthbert." },
    ],
  }),
}
