// GENERADO por tools/lenguaje/yarn.js desde historias/camino_blanco/escenas.yarn y voces.yarn: no editar a mano.
import { hechos } from './historia'
import { dichas, escena } from './escenas.ids'
import { defEscena, deja, interrumpio, marca, no, nombrar, pasa, silencio, y } from '../../comun/lenguaje'
import { sola, ve } from '../../comun/mundo'

export const escenas = {
  cb_libro: defEscena(escena.cb_libro, {
    resumen: "La Avenida, la primera vez: Ana enmudece hasta una milla antes de casa, y después le pone nombre.",
    se_activa: [pasa('ana', 'camino_blanco')],
    si: y(ve('ana', 'matthew')),
    en_marcha: true,
    interrumpe: true,
    hablan: ['ana', 'narra', 'matthew'],
    cuerpo: [
      { si: interrumpio, cuerpo: [{ q: 'ana', t: "…¡Oh, señor Cuthbert! ¡Oh, señor Cuthbert!! ¡Oh, señor Cuthbert!!!" }], sino: [] },
      { q: 'narra', t: "La calesa entra a la Avenida: cuatrocientos o quinientos metros de camino bajo los manzanos en flor, que se juntan arriba como una bóveda. Al fondo, el cielo del atardecer brilla como el rosetón de una catedral." },
      { q: 'ana', t: "(Ana enmudece. Se queda mirando la bóveda de flores, con las manos juntas, como si estuviera en una iglesia.)" },
      { q: 'matthew', t: "(Matthew la mira de reojo. No dice nada, para no romper el encanto.)" },
      { hace: silencio('3m') },
      { q: 'ana', t: "(Ana echa la cabeza atrás para mirar la bóveda de flores. Los pétalos le caen en el pelo y no se los quita.)" },
      { hace: silencio('3m') },
      { q: 'matthew', t: "(Matthew afloja las riendas. La yegua va al paso, como si también ella quisiera que esto no se acabara.)" },
      { hace: silencio('4m') },
      { q: 'narra', t: "Cruzan Newbridge: perros que ladran, chicos que gritan desde las cercas, caras curiosas en las ventanas. Ana no ve nada de eso; sigue mirando hacia atrás, hacia donde quedó la Avenida." },
      { hace: silencio('4m') },
      { q: 'ana', t: "(Ana va callada, con las manos juntas sobre el bolso de alfombra y los ojos en el cielo del oeste.)" },
      { hace: silencio('3m') },
      { q: 'matthew', t: "(Matthew la mira de reojo. Nunca pensó que el silencio de una niña pudiera ser tan cómodo.)" },
      { hace: silencio('3m') },
      { q: 'ana', t: "(Sobre los campos aparece la primera estrella. Ana mueve los labios: quizás le está pidiendo un deseo.)" },
      { hace: silencio('3m') },
      { q: 'matthew', t: "(En una laguna junto al camino empiezan a cantar las ranas. La yegua resopla: ya huele su casa.)" },
      { hace: silencio('2m') },
      { q: 'ana', t: "Blanco… de las Delicias… no, todavía no…", piensa: true },
      { hace: silencio('3m') },
      { hace: marca('una_milla') },
      { q: 'matthew', t: "Supongo que estarás bien cansada y con hambre. Pero ya no falta mucho: solo una milla más." },
      { q: 'ana', t: "Oh, señor Cuthbert… ese lugar por el que pasamos, ese lugar blanco… ¿qué era?" },
      { q: 'matthew', t: "Bueno, pues, debes referirte a la Avenida. Es un lugar bonito, más o menos." },
      { q: 'ana', t: "¿Bonito? Oh, «bonito» no parece la palabra justa. Ni «hermoso» tampoco. No alcanzan. ¡Oh, era maravilloso, maravilloso!" },
      { q: 'ana', t: "Es lo primero que veo que la imaginación no podría mejorar. Me llena aquí (se pone una mano en el pecho). Me dio un dolorcito raro y, sin embargo, agradable." },
      { q: 'ana', t: "¿Alguna vez ha sentido un dolor así, señor Cuthbert?" },
      { q: 'matthew', t: "Bueno, pues, no recuerdo haberlo sentido nunca." },
      { q: 'ana', t: "Yo lo siento muchas veces, cada vez que veo algo regiamente hermoso. Pero no deberían llamar «la Avenida» a ese lugar tan precioso. Ese nombre no significa nada. Deberían llamarlo… a ver…" },
      { op: "el Camino Blanco de las Delicias", propia: true, cuerpo: [{ hace: nombrar('avenida') }] },
      { op: "Otro nombre…", cuerpo: [{ hace: nombrar('avenida', 'pedir') }] },
      { q: 'ana', t: "¡El Camino Blanco de las Delicias! ¿No es un nombre bonito e imaginativo?" },
      { q: 'ana', t: "Otros podrán llamarlo la Avenida, pero yo siempre le diré el Camino Blanco de las Delicias." },
      { hace: deja(hechos.cb_nombre) },
    ],
  }),
  cb_otra_vez: defEscena(escena.cb_otra_vez, {
    resumen: "La Avenida otra vez: Ana corta lo que se está diciendo, calla, y después dice que el dolorcito sigue ahí.",
    se_activa: [pasa('ana', 'camino_blanco')],
    si: y(no(sola('ana')), no(dichas.cb_libro.hoy)),
    en_marcha: true,
    interrumpe: true,
    hablan: ['ana', 'narra', 'marilla'],
    cuerpo: [
      { si: interrumpio, cuerpo: [{ q: 'ana', t: "¡Shh! Perdón, perdón… pero es que ya llegamos. ¡El Camino Blanco de las Delicias!" }], sino: [{ q: 'ana', t: "(Ana se endereza. Ya sabe lo que viene detrás de la curva.)" }] },
      { q: 'narra', t: "Los manzanos se cierran sobre el camino. Ana no dice una palabra hasta que salen del otro lado." },
      { hace: silencio('8m') },
      { q: 'ana', t: "Creí que la segunda vez no iba a ser igual. Que una se acostumbra. Pero no: me dio el mismo dolorcito aquí. ¿No es una suerte que haya cosas a las que una no se acostumbra nunca?" },
      { si: ve('ana', 'marilla'), cuerpo: [{ q: 'marilla', t: "Son manzanos, Ana." }, { q: 'ana', t: "Sí, Srta. Cuthbert. Pero no son solamente manzanos." }], sino: [] },
    ],
  }),
  cb_sola: defEscena(escena.cb_sola, {
    resumen: "Ana pasa sola por la Avenida: calla, y después piensa en voz baja.",
    se_activa: [pasa('ana', 'camino_blanco')],
    si: y(sola('ana'), no(dichas.cb_libro.hoy)),
    en_marcha: true,
    interrumpe: true,
    hablan: ['narra', 'ana'],
    cuerpo: [
      { q: 'narra', t: "Ana entra sola bajo los manzanos. No hay nadie a quien contárselo, y por una vez no hace falta." },
      { hace: silencio('8m') },
      { q: 'ana', t: "El Camino Blanco de las Delicias. Cuando no hay nadie, es todavía más mío.", piensa: true },
    ],
  }),
  cb_siempre: defEscena(escena.cb_siempre, {
    resumen: "La Avenida, una vez más (una vez por día): Ana calla al pasar, y después suspira.",
    se_activa: [pasa('ana', 'camino_blanco')],
    si: y(no(dichas.cb_libro.hoy)),
    en_marcha: true,
    interrumpe: true,
    repetir: 'dia',
    hablan: ['ana'],
    cuerpo: [
      { si: interrumpio, cuerpo: [{ q: 'ana', t: "(Ana deja la frase a medias y levanta la vista. Ya están bajo los manzanos.)" }], sino: [] },
      { hace: silencio('5m') },
      { q: 'ana', t: "(Ana suspira, contenta.) Cada vez es como la primera. Casi." },
    ],
  }),
}

export const voces = [

]
