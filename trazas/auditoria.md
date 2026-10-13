# Auditoría de las acciones

Cada acción se corrió 3 veces; un paso está ✔ solo si salió bien todas. Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.
**Pasos que ocurren como deberían: 3 de 3.** **Acciones en que alguna regla no se cumplió: 0 de 1.**

**Las reglas que siempre deben cumplirse**, se haga lo que se haga (se revisan en cada línea del relato): quien está enfermo está en cama; nadie se queda de pie dentro de un mueble; nadie se queda dentro de las paredes de una casa; nadie está en el agua (salvo en el bote, o patinando sobre el hielo); nadie está encima de otro; los animales de la cuerda van afuera.


## El té con la Sra. Allan (meta 14: cumplida, cumplida, cumplida)

**Lo que debería pasar:** La Sra. Allan invita a Ana a tomar el té. Prepara el té en su casa. Ana llega y se sientan juntas a la mesa, con las tazas, a conversar sin apuro, una media hora.

- ✔ La Sra. Allan prepara el té. — 3 de 3 veces · 16:45, 30 min
- ✔ Ana toma el té sentada a la mesita, en la salita de la casa parroquial, una media hora. — 3 de 3 veces · 17:29, hasta el final
- ✔ La Sra. Allan se sienta con ella a la mesita, con su taza, una media hora. — 3 de 3 veces · 17:29, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (192 líneas)</summary>

```
15:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
15:00 Al empezar, la Sra. Allan va por Avonlea, junto a la iglesia.
15:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
15:00 · la Sra. Allan: Avonlea, junto a la iglesia · caminando
15:01 Ana se sienta.
15:02 la Sra. Allan está en Avonlea, junto a camino del campo de flores rosadas.
15:02 la Sra. Allan dice: «¡Buenas tardes!»
15:02 Ana dice: «Hay tanto por hacer y tan poco tiempo... ¡y yo con tantas ideas!»
15:02 Ana echa a andar.
15:03 la Sra. Allan dice: «¿Va a la tienda de Lawson?»
15:04 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
15:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie
15:05 · la Sra. Allan: Avonlea, junto a camino del campo de flores rosadas · de pie
15:05 la Sra. Allan dice: «¿Cómo vienen las papas este año?»
15:05 Ana echa a andar.
15:06 la Sra. Allan dice: «Bueno, me voy, que tengo que pedirle a Ana: que venga a tomar el té más tarde.»
15:07 Ana se queda de pie.
15:07 la Sra. Allan echa a andar.
15:08 Ana echa a andar.
15:09 Ana está en Avonlea, junto al Camino Blanco de las Delicias.
15:10 · Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie
15:10 · la Sra. Allan: Avonlea, junto a camino del salón del pueblo · caminando
15:10 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
15:11 Ana se sienta.
15:11 Ana echa a andar.
15:14 Ana está en Avonlea, junto al Bosque Encantado.
15:15 · Ana: Avonlea, junto al Bosque Encantado · de pie
15:15 · la Sra. Allan: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando
15:15 Ana echa a andar.
15:15 la Sra. Allan está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
15:15 la Sra. Allan dice: «¡Buenas tardes!»
15:17 la Sra. Allan dice: «¿Cómo vienen las papas este año?»
15:17 Ana está en Avonlea, junto a camino del puente del arroyo.
15:18 Ana echa a andar.
15:18 la Sra. Allan dice: «¡Buenos días! ¿Ya supo lo de la vaca de los Cuthbert?»
15:19 Ana está en Avonlea, junto al puente del arroyo.
15:20 · Ana: Avonlea, junto al puente del arroyo · de pie
15:20 · la Sra. Allan: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · de pie
15:20 Ana echa a andar.
15:20 la Sra. Allan dice: «Bueno, me voy, que tengo que pedirle a Ana: que venga a tomar el té más tarde.»
15:22 la Sra. Allan echa a andar.
15:22 Ana se queda de pie.
15:23 Ana echa a andar.
15:24 Ana está en Avonlea, junto a camino del puente del arroyo.
15:25 · Ana: Avonlea, junto a camino del puente del arroyo · de pie
15:25 · la Sra. Allan: Avonlea, junto a camino de la aldea de Avonlea (el cruce de caminos) · caminando
15:25 Ana echa a andar.
15:26 Ana está en Avonlea, junto a camino de La Cuesta del Huerto.
15:27 Ana echa a andar.
15:29 Ana está en Avonlea, junto a La Cuesta del Huerto.
15:30 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie
15:30 · la Sra. Allan: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
15:30 Ana echa a andar.
15:31 Ana está en la salita de La Cuesta del Huerto.
15:31 Ana echa a andar.
15:31 Ana está en la salita de La Cuesta del Huerto, junto a la mesita del té.
15:33 Ana echa a andar.
15:33 Ana se queda de pie.
15:35 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
15:35 · la Sra. Allan: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
15:40 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
15:40 · la Sra. Allan: Avonlea, junto a camino del Bosque Encantado · caminando
15:41 Ana dice: «Mi imaginación no me deja quieta.»
15:45 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
15:45 · la Sra. Allan: Avonlea, junto a camino del puente del arroyo · caminando
15:48 la Sra. Allan está en Avonlea, junto a La Cuesta del Huerto.
15:48 la Sra. Allan dice: «¡Buenas tardes, Mary Joe!»
15:50 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
15:50 · la Sra. Allan: Avonlea, junto a La Cuesta del Huerto · de pie
15:50 la Sra. Allan dice: «¿Cómo vienen las papas este año?»
15:51 la Sra. Allan dice: «Dicen que el nuevo pastor predica muy bonito.»
15:53 la Sra. Allan dice: «Bueno, me voy, que tengo que pedirle a Ana: que venga a tomar el té más tarde.»
15:54 la Sra. Allan echa a andar.
15:54 la Sra. Allan va por la salita de La Cuesta del Huerto.
15:55 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
15:55 · la Sra. Allan: la salita de La Cuesta del Huerto · caminando
15:55 la Sra. Allan se queda de pie.
15:55 la Sra. Allan echa a andar.
15:55 la Sra. Allan dice: «¡Ana, querida! Tienes que venir a tomar el té a la casa parroquial un día de estos.»
15:55 la Sra. Allan está en la salita de La Cuesta del Huerto, junto a la mesita del té.
15:55 la Sra. Allan dice: «¿Vendrías a tomar el té conmigo esta tarde, a las 18:00? En la casa parroquial.»
15:55 la Sra. Allan está en Avonlea, junto a La Cuesta del Huerto.
15:55 la Sra. Allan echa a andar.
16:00 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
16:00 · la Sra. Allan: Avonlea, junto al puente del arroyo · caminando
16:05 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
16:05 · la Sra. Allan: Avonlea, junto a camino del puente del arroyo · caminando
16:10 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
16:10 · la Sra. Allan: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
16:15 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
16:15 · la Sra. Allan: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
16:20 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
16:20 · la Sra. Allan: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando
16:20 la Sra. Allan está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
16:20 la Sra. Allan dice: «¡Buenas tardes!»
16:21 la Sra. Allan dice: «¿Cómo vienen las papas este año?»
16:23 la Sra. Allan dice: «Qué lindo día para tender la ropa.»
16:24 la Sra. Allan dice: «Bueno, me voy, que tengo que cocinar taza de té.»
16:25 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
16:25 · la Sra. Allan: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · de pie
16:25 la Sra. Allan echa a andar.
16:30 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
16:30 · la Sra. Allan: Avonlea, junto al salón del pueblo · caminando
16:35 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
16:35 · la Sra. Allan: Avonlea, junto a camino del campo de flores rosadas · caminando
16:35 la Sra. Allan está en Avonlea, junto a camino del campo de flores rosadas.
16:35 la Sra. Allan dice: «¡Buenas tardes!»
16:36 la Sra. Allan dice: «¿Va a la tienda de Lawson?»
16:38 la Sra. Allan dice: «Dicen que el nuevo pastor predica muy bonito.»
16:40 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
16:40 · la Sra. Allan: Avonlea, junto a camino del campo de flores rosadas · de pie
16:40 la Sra. Allan dice: «Bueno, me voy, que tengo que cocinar taza de té.»
16:41 la Sra. Allan echa a andar.
16:45 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
16:45 · la Sra. Allan: Avonlea, junto a la casa parroquial · caminando
16:45 la Sra. Allan va por la salita de la casa parroquial, junto a la puerta.
16:45 la Sra. Allan está en la salita de la casa parroquial.
16:45 la Sra. Allan empieza: cocinar te; con el bol.
16:50 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
16:50 · la Sra. Allan: la salita de la casa parroquial · de pie · cocinar te · con el bol
16:55 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
16:55 · la Sra. Allan: la salita de la casa parroquial · de pie · cocinar te · con el bol
17:00 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
17:00 · la Sra. Allan: la salita de la casa parroquial · de pie · cocinar te · con el bol
17:00 Ana está en Avonlea, junto a La Cuesta del Huerto.
17:00 Ana echa a andar.
17:05 · Ana: Avonlea, junto a camino del Bosque Encantado · caminando
17:05 · la Sra. Allan: la salita de la casa parroquial · de pie · cocinar te · con el bol
17:10 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
17:10 · la Sra. Allan: la salita de la casa parroquial · de pie · cocinar te · con el bol
17:11 Ana está en Avonlea, junto a camino de la escuela.
17:12 Ana echa a andar.
17:15 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando
17:15 · la Sra. Allan: la salita de la casa parroquial · de pie · cocinar te · con el bol
17:15 la Sra. Allan termina lo que hacía; ahora tiene 1 te.
17:20 · Ana: Avonlea, junto a camino del campo de flores rosadas · caminando
17:20 · la Sra. Allan: la salita de la casa parroquial · de pie
17:23 Ana está en Avonlea, junto a la casa parroquial.
17:23 Ana dice: «¡Buenas tardes!»
17:24 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
17:25 · Ana: Avonlea, junto a la casa parroquial · de pie
17:25 · la Sra. Allan: la salita de la casa parroquial · de pie
17:25 Ana se sienta.
17:26 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
17:27 Ana dice: «Bueno, me voy, que tengo que ir a la casa parroquial.»
17:28 Ana está en la salita de la casa parroquial, junto a la puerta.
17:28 Ana echa a andar.
17:29 Ana está en la salita de la casa parroquial, junto a la mesita del té; empieza: tomar_te; con el té.
17:29 la Sra. Allan dice: «¿Un poco más de té, Ana? Y prueba estas galletas.»
17:29 la Sra. Allan echa a andar.
17:29 la Sra. Allan está en la salita de la casa parroquial, junto a la mesita del té; empieza: tomar_te; con el té.
17:30 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:30 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:30 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:31 la Sra. Allan dice: «Cuéntame qué estás leyendo ahora.»
17:33 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:34 la Sra. Allan dice: «¿Un poco más de té, Ana? Y prueba estas galletas.»
17:35 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:35 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:36 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:37 la Sra. Allan dice: «Cuéntame qué estás leyendo ahora.»
17:38 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:40 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:40 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:40 la Sra. Allan dice: «¿Un poco más de té, Ana? Y prueba estas galletas.»
17:41 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:43 la Sra. Allan dice: «Cuéntame qué estás leyendo ahora.»
17:44 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:45 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:45 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:45 la Sra. Allan dice: «¿Un poco más de té, Ana? Y prueba estas galletas.»
17:47 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:48 la Sra. Allan dice: «Cuéntame qué estás leyendo ahora.»
17:50 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:50 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:50 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:51 la Sra. Allan dice: «¿Un poco más de té, Ana? Y prueba estas galletas.»
17:52 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:54 la Sra. Allan dice: «Cuéntame qué estás leyendo ahora.»
17:55 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:55 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:55 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:57 la Sra. Allan dice: «¿Un poco más de té, Ana? Y prueba estas galletas.»
17:58 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:59 la Sra. Allan se queda de pie; termina lo que hacía.
17:59 la Sra. Allan dice: «Me encantó tu recitación. Tienes un don, Ana.»
17:59 la Sra. Allan está en Avonlea, junto a la casa parroquial.
18:00 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
18:00 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
18:00 la Sra. Allan está en Avonlea, junto a la iglesia.
18:01 la Sra. Allan echa a andar.
18:01 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
```
</details>

