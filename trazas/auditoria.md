# Auditoría de las acciones

Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.
**Pasos que ocurren como deberían: 26 de 26.** **Acciones en que alguna regla no se cumplió: 0 de 9.**

**Las reglas que siempre deben cumplirse**, se haga lo que se haga (se revisan en cada línea del relato): quien está enfermo está en cama; nadie se queda de pie dentro de un mueble; nadie se queda dentro de las paredes de una casa; nadie está en el agua (salvo en el bote, o patinando sobre el hielo); nadie está encima de otro; los animales de la cuerda van afuera.


## La compota de Marilla (meta 8: cumplida)

**Lo que debería pasar:** Marilla quiere hacer compota para el invierno, pero no tiene manzanas: se las pide a Ana. Ana va a los manzanos, recoge las manzanas y se las lleva a Marilla a la cocina. Marilla las pela y las cuece en la estufa, removiendo, una media hora o más. Al final tiene la compota.

- ✔ Ana recoge manzanas de los manzanos. — 10:11, 11 min
- ✔ Ana tiene las manzanas. — 10:22, 24 min
- ✔ Se las da a Marilla en la cocina. — 10:45, 0 min
- ✔ Marilla tiene las manzanas. — 10:46, 61 min
- ✔ Marilla cocina la compota en la estufa, una media hora o más. — 10:47, 30 min
- ✔ Marilla tiene la compota. — 11:17, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (137 líneas)</summary>

```
10:00 Al empezar, Marilla está en Avonlea, junto a Tejas Verdes.
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 · Marilla: Avonlea, junto a Tejas Verdes · de pie
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 Marilla echa a andar.
10:00 Marilla se queda de pie.
10:00 Marilla dice: «¿Me traerías 6 manzanas?»
10:00 Marilla está en la cocina de Tejas Verdes, junto a la puerta.
10:00 Ana echa a andar.
10:05 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:05 · Ana: Avonlea, junto al Bosque Encantado · caminando
10:10 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:10 · Ana: Avonlea, junto a camino de La Cuesta del Huerto · caminando
10:11 Ana está en Avonlea, junto a La Cuesta del Huerto; empieza: recoger manzanas.
10:11 Ana echa a andar.
10:12 Ana con el canastito.
10:12 Ana se queda de pie.
10:15 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:15 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie · recoger manzanas · con el canastito
10:17 Ana .
10:17 Ana echa a andar.
10:17 Ana con el canastito.
10:17 Ana se queda de pie.
10:20 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:20 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie · recoger manzanas · con el canastito
10:22 Ana termina lo que hacía; ahora tiene 3 manzanas.
10:22 Ana se sienta.
10:22 Ana echa a andar.
10:22 Ana se queda de pie; empieza: recoger manzanas.
10:22 Ana echa a andar.
10:22 Ana con el canastito.
10:22 Ana se queda de pie.
10:25 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:25 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie · recoger manzanas · con el canastito
10:27 Ana .
10:27 Ana echa a andar.
10:28 Ana se queda de pie.
10:28 Ana echa a andar.
10:28 Ana con el canastito.
10:28 Ana se queda de pie.
10:30 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:30 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie · recoger manzanas · con el canastito
10:33 Ana termina lo que hacía; ahora tiene 6 manzanas.
10:33 Ana se sienta.
10:33 Ana echa a andar.
10:35 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:35 · Ana: Avonlea, junto a camino de La Cuesta del Huerto · caminando
10:40 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:40 · Ana: Avonlea, junto a camino del Bosque Encantado · caminando
10:45 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:45 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
10:45 Ana va por la cocina de Tejas Verdes, junto a la puerta.
10:45 Ana se queda de pie; empieza: dar manzanas; con lo que entrega.
10:45 Marilla dice: «Riega la huerta antes de que caiga el sol, que las plantas lo agradecen.»
10:46 Marilla ahora tiene 6 manzanas.
10:46 Marilla dice: «Gracias.»
10:46 Ana termina lo que hacía; ya no tiene nada.
10:46 Marilla echa a andar; empieza: cocinar compota.
10:47 Ana está en Avonlea, junto a Tejas Verdes.
10:47 Ana echa a andar.
10:47 Marilla está en la cocina de Tejas Verdes, junto a la estufa; con el bol.
10:47 Ana se queda de pie.
10:49 Ana se sienta.
10:49 Ana echa a andar.
10:50 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
10:50 · Ana: Avonlea, junto a Tejas Verdes · caminando
10:51 Ana se queda de pie.
10:52 Ana echa a andar.
10:55 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
10:55 · Ana: Avonlea, junto a la entrada del campo de avena del Sr. Harrison · caminando
10:55 Ana está en Avonlea, junto a la entrada del campo de avena del Sr. Harrison.
10:55 Ana echa a andar.
10:58 Ana está en Avonlea, junto al campo de avena del Sr. Harrison.
10:59 Ana echa a andar.
11:00 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:00 · Ana: Avonlea, junto al campo de avena del Sr. Harrison · caminando
11:00 Ana está en Avonlea, junto a la granja del Sr. Harrison.
11:02 Ana se sienta.
11:05 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:05 · Ana: Avonlea, junto a la granja del Sr. Harrison · sentada
11:09 Ana dice: «Mi imaginación no me deja quieta.»
11:09 Ana echa a andar.
11:09 Ana se queda de pie.
11:10 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:10 · Ana: Avonlea, junto a la granja del Sr. Harrison · de pie
11:10 Ana echa a andar.
11:12 Ana está en Avonlea, junto al campo de avena del Sr. Harrison.
11:12 Ana echa a andar.
11:14 Ana está en Avonlea, junto a camino de Tejas Verdes.
11:14 Ana echa a andar.
11:15 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:15 · Ana: Avonlea, junto a Tejas Verdes · caminando
11:15 Ana está en Avonlea, junto a Tejas Verdes.
11:17 Marilla termina lo que hacía; ahora tiene 3 manzanas, 1 compota.
11:17 Marilla empieza: cocinar compota.
11:17 Ana se sienta.
11:18 Ana echa a andar.
11:20 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota
11:20 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
11:20 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
11:21 Ana echa a andar.
11:22 Ana se queda de pie.
11:23 Ana echa a andar.
11:25 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota
11:25 · Ana: Avonlea, junto a camino del Camino Blanco de las Delicias · caminando
11:25 Ana está en Avonlea, junto al Camino Blanco de las Delicias.
11:25 Ana echa a andar.
11:27 Ana se queda de pie.
11:28 Ana echa a andar.
11:30 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota
11:30 · Ana: Avonlea, junto al Bosque Encantado · caminando
11:30 Ana está en Avonlea, junto al Bosque Encantado.
11:31 Ana echa a andar.
11:33 Ana está en Avonlea, junto al puente del arroyo.
11:34 Ana echa a andar.
11:35 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota
11:35 · Ana: Avonlea, junto al puente del arroyo · caminando
11:36 Ana se queda de pie.
11:37 Ana echa a andar.
11:39 Ana está en Avonlea, junto a camino del puente del arroyo.
11:40 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota
11:40 · Ana: Avonlea, junto a camino del puente del arroyo · de pie
11:40 Ana echa a andar.
11:43 Ana está en Avonlea, junto a La Cuesta del Huerto.
11:44 Ana echa a andar.
11:44 Ana está en la salita de La Cuesta del Huerto.
11:44 Ana echa a andar.
11:45 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota
11:45 · Ana: la salita de La Cuesta del Huerto · caminando
11:45 Ana se queda de pie.
11:47 Ana echa a andar.
11:47 Ana se queda de pie.
11:47 Marilla termina lo que hacía; ahora tiene 2 compota.
11:47 Marilla está en la cocina de Tejas Verdes.
11:48 Ana echa a andar.
11:48 Ana se queda de pie.
11:49 Ana echa a andar.
```
</details>

## El té con la Sra. Allan (meta 14: cumplida)

**Lo que debería pasar:** La Sra. Allan invita a Ana a tomar el té. Prepara el té en su casa. Ana llega y se sientan juntas a la mesa, con las tazas, a conversar sin apuro, una media hora.

- ✔ La Sra. Allan prepara el té. — 16:53, 30 min
- ✔ Ana toma el té sentada a la mesita, en la salita de la casa parroquial, una media hora. — 17:22, hasta el final
- ✔ La Sra. Allan se sienta con ella a la mesita, con su taza, una media hora. — 17:23, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (193 líneas)</summary>

```
15:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
15:00 Al empezar, la Sra. Allan va por Avonlea, junto a la iglesia.
15:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
15:00 · la Sra. Allan: Avonlea, junto a la iglesia · caminando
15:01 Ana se sienta.
15:02 la Sra. Allan está en Avonlea, junto a camino del campo de flores rosadas.
15:02 la Sra. Allan dice: «¡Buenas tardes!»
15:02 Ana dice: «Mi imaginación no me deja quieta.»
15:02 Ana echa a andar.
15:03 la Sra. Allan dice: «Qué lindo día para tender la ropa.»
15:04 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
15:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie
15:05 · la Sra. Allan: Avonlea, junto a camino del campo de flores rosadas · de pie
15:05 la Sra. Allan dice: «¡Buenos días! ¿Ya supo lo de la vaca de los Cuthbert?»
15:06 Ana se sienta.
15:07 la Sra. Allan dice: «Bueno, me voy, que tengo que pedirle a Ana: que venga a tomar el té más tarde.»
15:08 la Sra. Allan echa a andar.
15:10 · Ana: Avonlea, junto a la huerta de Tejas Verdes · sentada
15:10 · la Sra. Allan: Avonlea, junto a camino del campo de flores rosadas · caminando
15:15 · Ana: Avonlea, junto a la huerta de Tejas Verdes · sentada
15:15 · la Sra. Allan: Avonlea, junto al salón del pueblo · caminando
15:17 la Sra. Allan está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
15:17 la Sra. Allan dice: «¡Buenas tardes!»
15:18 la Sra. Allan dice: «¡Buenos días! ¿Ya supo lo de la vaca de los Cuthbert?»
15:20 · Ana: Avonlea, junto a la huerta de Tejas Verdes · sentada
15:20 · la Sra. Allan: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · de pie
15:20 la Sra. Allan dice: «¿Va a la tienda de Lawson?»
15:21 Ana dice: «¡A ver qué descubro por ahí!»
15:21 Ana echa a andar.
15:21 Ana se queda de pie.
15:22 Ana echa a andar.
15:22 Ana se queda de pie; lleva can.
15:22 la Sra. Allan dice: «Bueno, me voy, que tengo que pedirle a Ana: que venga a tomar el té más tarde.»
15:23 la Sra. Allan echa a andar.
15:24 Ana se sienta.
15:25 · Ana: Avonlea, junto a la huerta de Tejas Verdes · sentada · lleva can
15:25 · la Sra. Allan: Avonlea, junto a camino de la aldea de Avonlea (el cruce de caminos) · caminando
15:30 · Ana: Avonlea, junto a la huerta de Tejas Verdes · sentada · lleva can
15:30 · la Sra. Allan: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
15:31 Ana dice: «Hay tanto por hacer y tan poco tiempo... ¡y yo con tantas ideas!»
15:31 Ana echa a andar.
15:31 Ana se queda de pie.
15:32 Ana echa a andar.
15:34 Ana está en Avonlea, junto a camino de la huerta de Tejas Verdes.
15:35 · Ana: Avonlea, junto a camino de la huerta de Tejas Verdes · de pie · lleva can
15:35 · la Sra. Allan: Avonlea, junto a la casa de la Sra. Lynde · caminando
15:35 Ana echa a andar.
15:37 Ana está en Avonlea, junto al Camino Blanco de las Delicias.
15:37 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
15:37 la Sra. Allan está en Avonlea, junto a camino de la huerta de Tejas Verdes.
15:37 la Sra. Allan dice: «¡Buenas tardes, Jerry Buote!»
15:39 la Sra. Allan dice: «¡Buenos días! ¿Ya supo lo de la vaca de los Cuthbert?»
15:39 Ana echa a andar.
15:40 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando · lleva can
15:40 · la Sra. Allan: Avonlea, junto a camino de la huerta de Tejas Verdes · de pie
15:41 Ana se queda de pie.
15:41 la Sra. Allan dice: «¿Cómo vienen las papas este año?»
15:41 Ana echa a andar.
15:42 la Sra. Allan dice: «Bueno, me voy, que tengo que pedirle a Ana: que venga a tomar el té más tarde.»
15:43 Ana está en Avonlea, junto al Bosque Encantado.
15:43 Ana echa a andar.
15:43 la Sra. Allan echa a andar.
15:45 · Ana: Avonlea, junto a camino del Bosque Encantado · caminando · lleva can
15:45 · la Sra. Allan: Avonlea, junto a camino de la huerta de Tejas Verdes · caminando
15:45 Ana está en Avonlea, junto a camino del puente del arroyo.
15:46 Ana echa a andar.
15:48 Ana está en Avonlea, junto al puente del arroyo.
15:48 Ana echa a andar.
15:50 · Ana: Avonlea, junto al puente del arroyo · caminando · lleva can
15:50 · la Sra. Allan: Avonlea, junto a la huerta de Tejas Verdes · caminando
15:50 Ana está en Avonlea, junto a camino del puente del arroyo.
15:51 Ana echa a andar.
15:54 Ana está en Avonlea, junto a La Cuesta del Huerto.
15:55 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie · lleva can
15:55 · la Sra. Allan: Avonlea, junto al Bosque Encantado · caminando
15:55 Ana echa a andar.
15:56 Ana se queda de pie.
15:57 Ana echa a andar.
15:58 Ana se queda de pie.
15:59 Ana se sienta.
16:00 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · lleva can
16:00 · la Sra. Allan: Avonlea, junto a camino del puente del arroyo · caminando
16:03 la Sra. Allan está en Avonlea, junto a La Cuesta del Huerto.
16:03 la Sra. Allan dice: «¡Buenas tardes, Minnie May Barry!»
16:03 Ana dice: «Mi imaginación no me deja quieta.»
16:03 Ana echa a andar.
16:03 Ana se queda de pie.
16:04 la Sra. Allan dice: «Me encantó tu recitación. Tienes un don, Ana.»
16:04 Ana echa a andar.
16:04 la Sra. Allan dice: «Dicen que el nuevo pastor predica muy bonito.»
16:04 Ana se queda de pie.
16:05 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie · lleva can
16:05 · la Sra. Allan: Avonlea, junto a La Cuesta del Huerto · de pie
16:06 la Sra. Allan dice: «¿Va a la tienda de Lawson?»
16:06 Ana se sienta.
16:07 la Sra. Allan echa a andar.
16:07 la Sra. Allan se queda de pie.
16:07 la Sra. Allan dice: «¿Vendrías a tomar el té conmigo esta tarde, a las 18:00? En la casa parroquial.»
16:07 la Sra. Allan echa a andar.
16:10 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · lleva can
16:10 · la Sra. Allan: Avonlea, junto a camino del puente del arroyo · caminando
16:15 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · lleva can
16:15 · la Sra. Allan: Avonlea, junto a camino del Bosque Encantado · caminando
16:20 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · lleva can
16:20 · la Sra. Allan: Avonlea, junto a camino del Lago de las Aguas Brillantes · caminando
16:25 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · lleva can
16:25 · la Sra. Allan: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
16:27 la Sra. Allan está en Avonlea, junto a camino de la escuela.
16:27 la Sra. Allan dice: «¡Buenas tardes!»
16:29 la Sra. Allan dice: «¡Buenos días! ¿Ya supo lo de la vaca de los Cuthbert?»
16:30 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · lleva can
16:30 · la Sra. Allan: Avonlea, junto a camino de la escuela · de pie
16:30 la Sra. Allan echa a andar.
16:35 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · lleva can
16:35 · la Sra. Allan: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando
16:40 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · lleva can
16:40 · la Sra. Allan: Avonlea, junto a camino del salón del pueblo · caminando
16:43 la Sra. Allan está en Avonlea, junto a camino del campo de flores rosadas.
16:43 la Sra. Allan dice: «¡Buenas tardes!»
16:44 la Sra. Allan dice: «¿Cómo vienen las papas este año?»
16:45 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · lleva can
16:45 · la Sra. Allan: Avonlea, junto a camino del campo de flores rosadas · de pie
16:46 la Sra. Allan dice: «¿Cómo vienen las papas este año?»
16:48 la Sra. Allan dice: «Bueno, me voy, que tengo que cocinar taza de té.»
16:48 la Sra. Allan echa a andar.
16:50 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · lleva can
16:50 · la Sra. Allan: Avonlea, junto a camino de la iglesia · caminando
16:53 la Sra. Allan va por la salita de la casa parroquial, junto a la puerta.
16:53 la Sra. Allan está en la salita de la casa parroquial.
16:53 la Sra. Allan empieza: cocinar te; con el bol.
16:55 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · lleva can
16:55 · la Sra. Allan: la salita de la casa parroquial · de pie · cocinar te · con el bol
17:00 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · lleva can
17:00 · la Sra. Allan: la salita de la casa parroquial · de pie · cocinar te · con el bol
17:00 Ana echa a andar.
17:05 · Ana: Avonlea, junto a camino del Bosque Encantado · caminando · lleva can
17:05 · la Sra. Allan: la salita de la casa parroquial · de pie · cocinar te · con el bol
17:10 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando · lleva can
17:10 · la Sra. Allan: la salita de la casa parroquial · de pie · cocinar te · con el bol
17:15 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando · lleva can
17:15 · la Sra. Allan: la salita de la casa parroquial · de pie · cocinar te · con el bol
17:20 · Ana: Avonlea, junto a camino del campo de flores rosadas · caminando · lleva can
17:20 · la Sra. Allan: la salita de la casa parroquial · de pie · cocinar te · con el bol
17:22 Ana va por la salita de la casa parroquial, junto a la puerta.
17:22 Ana se queda de pie.
17:22 Ana echa a andar.
17:22 Ana está en la salita de la casa parroquial, junto a la mesita del té; empieza: tomar_te; con el té.
17:22 la Sra. Allan dice: «¿Un poco más de té, Ana? Y prueba estas galletas.»
17:23 la Sra. Allan dice: «Me encantó tu recitación. Tienes un don, Ana.»
17:23 la Sra. Allan termina lo que hacía; ahora tiene 1 te.
17:23 la Sra. Allan echa a andar.
17:23 la Sra. Allan está en la salita de la casa parroquial, junto a la mesita del té; empieza: tomar_te; con el té.
17:24 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:24 Ana dice: «¡Oh, Sra. Allan! Usted es mi espíritu afín.»
17:25 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · lleva can · con el té
17:25 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:25 la Sra. Allan dice: «Cuéntame qué estás leyendo ahora.»
17:26 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:28 la Sra. Allan dice: «¿Un poco más de té, Ana? Y prueba estas galletas.»
17:29 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:30 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · lleva can · con el té
17:30 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:31 la Sra. Allan dice: «Cuéntame qué estás leyendo ahora.»
17:32 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:33 la Sra. Allan dice: «¿Un poco más de té, Ana? Y prueba estas galletas.»
17:35 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · lleva can · con el té
17:35 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:35 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:36 la Sra. Allan dice: «Cuéntame qué estás leyendo ahora.»
17:38 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:39 la Sra. Allan dice: «¿Un poco más de té, Ana? Y prueba estas galletas.»
17:40 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · lleva can · con el té
17:40 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:40 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:42 la Sra. Allan dice: «Cuéntame qué estás leyendo ahora.»
17:43 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:45 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · lleva can · con el té
17:45 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:45 la Sra. Allan dice: «¿Un poco más de té, Ana? Y prueba estas galletas.»
17:46 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:47 la Sra. Allan dice: «Cuéntame qué estás leyendo ahora.»
17:49 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:50 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · lleva can · con el té
17:50 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · con el té
17:50 la Sra. Allan dice: «¿Un poco más de té, Ana? Y prueba estas galletas.»
17:52 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:53 la Sra. Allan se queda de pie; termina lo que hacía.
17:53 la Sra. Allan dice: «Cuéntame qué estás leyendo ahora.»
17:53 la Sra. Allan está en Avonlea, junto a la casa parroquial.
17:54 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:55 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar_te · lleva can · con el té
17:55 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
17:55 la Sra. Allan echa a andar.
```
</details>

## La compota para la Sra. Barry (meta 17: cumplida)

**Lo que debería pasar:** La Sra. Barry quiere compota y se la pide a Diana; Diana se la pide a Ana. Ana la consigue y se la lleva a la Sra. Barry.

- ✔ Ana le da la compota. — 12:21, 0 min
- ✔ La Sra. Barry tiene la compota. — 12:22, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (136 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 Al empezar, Sra. Barry va por la salita de La Cuesta del Huerto.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 · Sra. Barry: la salita de La Cuesta del Huerto · caminando
10:00 Sra. Barry va por Avonlea, junto a La Cuesta del Huerto.
10:00 Sra. Barry se queda de pie.
10:00 Sra. Barry dice: «¿Me traerías 1 compota de manzana?»
10:00 Sra. Barry dice: «¡Buenos días, Diana! ¿Cómo están todos en casa?»
10:01 Ana se sienta.
10:02 Sra. Barry dice: «¡Si lo sabe todo Avonlea! Esa vaca es más lista que el Sr. Harrison.»
10:02 Ana echa a andar.
10:04 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
10:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie
10:05 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:05 Ana echa a andar.
10:07 Ana está en Avonlea, junto a camino de la huerta de Tejas Verdes.
10:08 Ana echa a andar.
10:10 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
10:10 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:10 Ana está en Avonlea, junto a camino de la casa de la Sra. Lynde.
10:11 Ana echa a andar.
10:12 Ana está en Avonlea, junto a la casa de la Sra. Lynde.
10:13 Ana echa a andar.
10:15 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:15 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:16 Ana se queda de pie.
10:17 Ana echa a andar.
10:19 Ana está en Avonlea, junto a camino de la casa de la Sra. Lynde.
10:20 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · de pie
10:20 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:20 Ana echa a andar.
10:22 Ana está en Avonlea, junto a camino de la escuela.
10:24 Ana echa a andar.
10:25 · Ana: Avonlea, junto a camino de la escuela · caminando
10:25 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:25 Ana se queda de pie.
10:26 Ana echa a andar.
10:28 Ana está en Avonlea, junto a camino de la aldea de Avonlea (el cruce de caminos).
10:29 Ana echa a andar.
10:30 · Ana: Avonlea, junto a camino de la aldea de Avonlea (el cruce de caminos) · caminando
10:30 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:31 Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
10:31 Ana echa a andar.
10:33 Ana se queda de pie.
10:34 Ana echa a andar.
10:35 · Ana: Avonlea, junto a camino de la aldea de Avonlea (el cruce de caminos) · caminando
10:35 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:35 Ana está en Avonlea, junto al salón del pueblo.
10:36 Ana echa a andar.
10:38 Ana se queda de pie.
10:38 Ana echa a andar.
10:40 · Ana: Avonlea, junto a camino del salón del pueblo · caminando
10:40 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:40 Ana está en Avonlea, junto a camino del salón del pueblo.
10:41 Ana echa a andar.
10:42 Ana se queda de pie.
10:43 Ana echa a andar.
10:44 Ana está en Avonlea, junto a camino del campo de flores rosadas.
10:44 Ana echa a andar.
10:45 · Ana: Avonlea, junto a camino del campo de flores rosadas · caminando
10:45 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:50 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando
10:50 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:55 · Ana: Avonlea, junto a camino de la escuela · caminando
10:55 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:00 · Ana: Avonlea, junto a camino del Lago de las Aguas Brillantes · caminando
11:00 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:05 · Ana: Avonlea, junto a camino del puente del arroyo · caminando
11:05 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:10 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
11:10 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:10 Ana está en Avonlea, junto a La Cuesta del Huerto; empieza: recoger manzanas.
11:10 Ana echa a andar.
11:10 Ana con el canastito.
11:10 Ana se queda de pie.
11:15 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie · recoger manzanas · con el canastito
11:15 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:15 Ana .
11:15 Ana echa a andar.
11:15 Ana con el canastito.
11:15 Ana se queda de pie.
11:20 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie · recoger manzanas · con el canastito
11:20 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:20 Ana termina lo que hacía; ahora tiene 3 manzanas.
11:20 Ana se sienta.
11:20 Ana echa a andar.
11:25 · Ana: Avonlea, junto al puente del arroyo · caminando
11:25 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:30 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
11:30 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:33 Ana va por la cocina de Tejas Verdes, junto a la puerta.
11:33 Ana se queda de pie.
11:33 Ana echa a andar.
11:33 Ana está en la cocina de Tejas Verdes; empieza: cocinar compota.
11:33 Ana echa a andar.
11:33 Ana con el bol.
11:33 Ana se queda de pie.
11:35 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:35 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:40 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:40 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:45 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:45 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:50 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:50 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:55 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:55 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
12:00 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
12:00 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
12:03 Ana termina lo que hacía; ahora tiene 1 compota.
12:03 Ana está en Avonlea, junto a Tejas Verdes.
12:03 Ana se sienta.
12:03 Ana echa a andar.
12:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
12:05 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
12:10 · Ana: Avonlea, junto a camino del Bosque Encantado · caminando
12:10 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
12:15 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
12:15 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
12:15 Ana está en Avonlea, junto a La Cuesta del Huerto.
12:15 Ana dice: «¡Buenas tardes!»
12:16 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
12:17 Ana se sienta.
12:18 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
12:20 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada
12:20 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
12:20 Ana dice: «Bueno, me voy, que tengo que darle 1 compota de manzana a Diana.»
12:21 Ana empieza: dar compota; con lo que entrega.
12:21 Ana termina lo que hacía; ya no tiene nada.
12:21 Ana echa a andar.
12:21 Ana se queda de pie.
12:22 Sra. Barry ahora tiene 1 compota.
12:22 Sra. Barry dice: «Gracias.»
12:22 Sra. Barry va por Avonlea, junto a camino de .
12:22 Ana echa a andar.
12:24 Ana está en Avonlea, junto a camino de La Cuesta del Huerto.
```
</details>

## Cuidar al Sr. Harrison (meta 34: cumplida)

**Lo que debería pasar:** El Sr. Harrison está enfermo, en cama. Ana saca el jarabe de ipecacuana del aparador de la cocina, va a su casa y, junto a la cama, se lo da a cucharadas.

- ✔ El Sr. Harrison está en cama. — 11:00, 13 min
- ✔ Saca el jarabe del aparador. — 11:01, 1 min
- ✔ Tiene el jarabe. — 11:02, 11 min
- ✔ Se lo da en su casa. — 11:11, 1 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (42 líneas)</summary>

```
11:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
11:00 Al empezar, Sr. Harrison está en la casa del Sr. Harrison; ahora tiene 1 cuerda.
11:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
11:00 · Sr. Harrison: la casa del Sr. Harrison · acostada, en cama
11:00 Ana echa a andar.
11:00 Ana va por la cocina de Tejas Verdes, junto a la puerta.
11:00 Ana se queda de pie.
11:00 Ana echa a andar.
11:00 Ana está en la cocina de Tejas Verdes; empieza: tomar jarabe.
11:00 Ana echa a andar.
11:01 Ana con el aparador abierto.
11:01 Ana se queda de pie.
11:01 Ana está en la cocina de Tejas Verdes, junto al aparador.
11:02 Ana termina lo que hacía; ahora tiene 1 jarabe.
11:02 Ana está en Avonlea, junto a Tejas Verdes.
11:02 Ana echa a andar.
11:02 Ana se queda de pie.
11:02 Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»
11:04 Ana se sienta.
11:04 Ana echa a andar.
11:05 · Ana: Avonlea, junto a Tejas Verdes · caminando
11:05 · Sr. Harrison: la casa del Sr. Harrison · acostada, en cama
11:10 · Ana: Avonlea, junto a la granja del Sr. Harrison · caminando
11:10 · Sr. Harrison: la casa del Sr. Harrison · acostada, en cama
11:10 Ana va por la casa del Sr. Harrison.
11:10 Ana se queda de pie.
11:10 Ana echa a andar.
11:11 Sr. Harrison dice: «No me mires la casa, que el desorden es mío.»
11:11 Ana empieza: cuidar; con el jarabe.
11:11 Ana dice: «Una cucharadita de jarabe de ipecacuana… y otra más. Ya va a pasar.»
11:11 Ana se queda de pie.
11:12 Ana termina lo que hacía; ya no tiene nada.
11:12 Sr. Harrison se queda de pie.
11:12 Sr. Harrison dice: «Ya me siento mucho mejor. Gracias, niña.»
11:12 Ana dice: «Se me ocurrió una idea... ¡de esas que solo tengo yo!»
11:12 Sr. Harrison echa a andar.
11:12 Ana echa a andar.
11:13 Ana está en Avonlea, junto a la granja del Sr. Harrison.
11:13 Sr. Harrison está en Avonlea, junto a la granja del Sr. Harrison.
11:13 Ana echa a andar.
11:13 Sr. Harrison echa a andar.
11:14 Ana se queda de pie.
```
</details>

## El vestido de mangas abullonadas (meta 38: cumplida)

**Lo que debería pasar:** Marilla quiere coserle un vestido a Ana. Le traen la tela de la tienda. Marilla se sienta junto a la ventana de la cocina y cose, sin apuro, un buen rato, hasta que el vestido está listo.

- ✔ Marilla tiene la tela. — 10:32, 41 min
- ✔ Cose sentada junto a la ventana, un buen rato. — 10:33, 40 min
- ✔ El vestido está listo. — 11:13, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (85 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 Al empezar, Marilla está en Avonlea, junto a Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 · Marilla: Avonlea, junto a Tejas Verdes · de pie
10:00 Marilla echa a andar.
10:00 Marilla se queda de pie.
10:00 Marilla dice: «¿Me traerías 1 corte de tela?»
10:00 Marilla está en la cocina de Tejas Verdes, junto a la puerta.
10:00 Ana echa a andar.
10:05 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:05 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:10 · Ana: Avonlea, junto a camino de la escuela · caminando
10:10 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:15 · Ana: Avonlea, junto a la tienda de Lawson · caminando
10:15 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:15 Ana va por la tienda de Lawson.
10:15 Ana se queda de pie.
10:15 Ana echa a andar.
10:15 Ana se queda de pie.
10:15 Ana dice: «Buenos días, Sr. Lawson. ¿Me daría un corte de tela? A la libreta de los Cuthbert.»
10:17 Ana ahora tiene 1 tela.
10:17 Ana está en Avonlea, junto a la tienda de Lawson.
10:17 Ana echa a andar.
10:20 · Ana: Avonlea, junto a camino de la aldea de Avonlea (el cruce de caminos) · caminando
10:20 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:25 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
10:25 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:30 · Ana: Avonlea, junto a camino de la huerta de Tejas Verdes · caminando
10:30 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:32 Ana va por la cocina de Tejas Verdes, junto a la puerta.
10:32 Ana se queda de pie; empieza: dar tela; con lo que entrega.
10:32 Marilla dice: «Si quieres cocinar, la estufa está encendida. Cuidado con no quemar nada esta vez.»
10:32 Ana termina lo que hacía; ya no tiene nada.
10:32 Marilla ahora tiene 1 tela.
10:32 Marilla dice: «Gracias.»
10:32 Marilla echa a andar; empieza: coser vestido.
10:32 Marilla dice: «Coso el vestido… y le pongo unas mangas abullonadas, como las que usan ahora.»
10:33 Ana está en Avonlea, junto a Tejas Verdes.
10:33 Ana echa a andar.
10:33 Marilla está en la cocina de Tejas Verdes, junto a la silla de la ventana; con la costura.
10:34 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
10:35 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie
10:35 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser vestido · con la costura
10:35 Ana echa a andar.
10:38 Ana está en Avonlea, junto a camino de la huerta de Tejas Verdes.
10:39 Ana echa a andar.
10:40 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
10:40 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser vestido · con la costura
10:40 Ana está en Avonlea, junto al Camino Blanco de las Delicias.
10:40 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
10:42 Ana echa a andar.
10:43 Ana se queda de pie.
10:45 · Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie
10:45 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser vestido · con la costura
10:45 Ana se sienta.
10:50 · Ana: Avonlea, junto al Camino Blanco de las Delicias · sentada
10:50 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser vestido · con la costura
10:55 · Ana: Avonlea, junto al Camino Blanco de las Delicias · sentada
10:55 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser vestido · con la costura
10:56 Ana echa a andar.
10:56 Ana se queda de pie.
10:57 Ana echa a andar.
10:59 Ana está en Avonlea, junto al Bosque Encantado.
11:00 · Ana: Avonlea, junto al Bosque Encantado · de pie
11:00 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser vestido · con la costura
11:00 Ana echa a andar.
11:02 Ana está en Avonlea, junto a camino del puente del arroyo.
11:03 Ana echa a andar.
11:05 · Ana: Avonlea, junto a camino del Lago de las Aguas Brillantes · caminando
11:05 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser vestido · con la costura
11:05 Ana está en Avonlea, junto a camino del Camino Blanco de las Delicias.
11:06 Ana echa a andar.
11:08 Ana está en Avonlea, junto a camino del Lago de las Aguas Brillantes.
11:08 Ana echa a andar.
11:10 · Ana: Avonlea, junto a camino del Lago de las Aguas Brillantes · caminando
11:10 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser vestido · con la costura
11:10 Ana está en Avonlea, junto a camino de la casa de la Sra. Lynde.
11:11 Ana echa a andar.
11:12 Ana se queda de pie.
11:13 Ana echa a andar.
11:13 Marilla se queda de pie; termina lo que hacía; ahora tiene 1 vestido.
11:13 Marilla está en la cocina de Tejas Verdes.
11:15 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
11:15 · Marilla: la cocina de Tejas Verdes · de pie
11:15 Ana se queda de pie.
```
</details>

## Las flores del salón (meta 49: cumplida)

**Lo que debería pasar:** Ana va al salón con flores y cuelga guirnaldas a lo largo de la pared, un tramo tras otro, un buen rato.

- ✔ Cuelga las guirnaldas en el salón, un buen rato. — 10:33, 25 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (49 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 Ana echa a andar.
10:01 Ana está en Avonlea, junto a la huerta de Tejas Verdes; empieza: recoger ramo.
10:01 Ana echa a andar.
10:01 Ana se agacha; con el canastito.
10:04 Ana se queda de pie; termina lo que hacía; ahora tiene 1 ramo.
10:04 Ana se sienta.
10:04 Ana echa a andar.
10:05 · Ana: Avonlea, junto a Tejas Verdes · caminando
10:10 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
10:15 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
10:20 · Ana: Avonlea, junto a camino de la escuela · caminando
10:23 Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
10:23 Ana dice: «¡Buenos días!»
10:24 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
10:25 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · de pie
10:25 Ana se sienta.
10:26 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
10:28 Ana dice: «Bueno, me voy, que tengo que decorar el salón con flores.»
10:29 Ana echa a andar.
10:30 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando
10:32 Ana está en Avonlea, junto al salón del pueblo; empieza: decorar_sala.
10:32 Ana echa a andar.
10:32 Ana va por el salón del pueblo.
10:32 Ana se queda de pie.
10:32 Ana echa a andar.
10:33 Ana con flores.
10:33 Ana se queda de pie.
10:35 · Ana: el salón del pueblo · de pie · decorar_sala · con flores
10:40 · Ana: el salón del pueblo · de pie · decorar_sala · con flores
10:41 Ana .
10:41 Ana echa a andar.
10:42 Ana con flores.
10:42 Ana se queda de pie.
10:45 · Ana: el salón del pueblo, junto al escenario · de pie · decorar_sala · con flores
10:50 · Ana: el salón del pueblo, junto al escenario · de pie · decorar_sala · con flores
10:50 Ana .
10:50 Ana echa a andar.
10:50 Ana con flores.
10:50 Ana se queda de pie.
10:55 · Ana: el salón del pueblo · de pie · decorar_sala · con flores
10:58 Ana termina lo que hacía; ya no tiene nada.
10:58 Ana echa a andar.
11:00 · Ana: el salón del pueblo · caminando
11:00 Ana se queda de pie.
11:00 Ana echa a andar.
11:00 Ana está en Avonlea, junto al salón del pueblo.
11:00 Ana echa a andar.
```
</details>

## El picnic con Diana (meta 58: cumplida)

**Lo que debería pasar:** Ana le pide permiso a Marilla. Prepara la canasta en la cocina. Va al lago con Diana; extienden el mantel, se sientan y meriendan, sin apuro, un buen rato.

- ✔ Prepara la canasta en la cocina. — 11:05, 15 min
- ✔ Merienda sentada sobre el mantel, un buen rato. — 11:59, 40 min
- ✔ Diana está sentada con ella. — 11:59, 40 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (144 líneas)</summary>

```
11:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
11:00 Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene 1 libro.
11:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
11:00 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:00 Ana echa a andar.
11:00 Ana va por la cocina de Tejas Verdes, junto a la puerta.
11:00 Ana se queda de pie.
11:00 Ana echa a andar.
11:00 Ana dice: «Marilla, ¿puedo ir al picnic de la escuela dominical? ¡Va a haber helado!»
11:00 Ana está en la cocina de Tejas Verdes.
11:01 Ana echa a andar.
11:01 Ana se queda de pie.
11:01 Ana está en la cocina de Tejas Verdes, junto a la mesa.
11:02 Ana dice: «Sí, Marilla… bueno, casi. Me distraje mirando una araña que tejía, y era tan perfecta…»
11:04 Ana echa a andar.
11:05 · Ana: la cocina de Tejas Verdes, junto a la mesa · caminando
11:05 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:05 Ana está en la cocina de Tejas Verdes; empieza: preparar canasta.
11:05 Ana echa a andar.
11:05 Ana con el bol.
11:05 Ana se queda de pie.
11:10 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar canasta · con el bol
11:10 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:15 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar canasta · con el bol
11:15 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:20 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar canasta · con el bol
11:20 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:20 Ana termina lo que hacía; ahora tiene 1 canasta.
11:20 Ana está en Avonlea, junto a Tejas Verdes.
11:20 Ana se sienta.
11:20 Ana echa a andar.
11:20 Diana echa a andar.
11:20 Diana se queda de pie.
11:22 Diana echa a andar.
11:22 Diana se queda de pie.
11:23 Diana echa a andar.
11:23 Diana se queda de pie.
11:25 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
11:25 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:25 Diana echa a andar.
11:25 Diana se queda de pie.
11:26 Diana echa a andar.
11:27 Diana se queda de pie.
11:28 Diana echa a andar.
11:28 Diana se queda de pie.
11:30 · Ana: Avonlea, junto al puente del arroyo · caminando
11:30 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:30 Diana echa a andar.
11:31 Diana se queda de pie.
11:33 Diana echa a andar.
11:34 Diana se queda de pie.
11:34 Ana dice: «¡Diana! ¡Espera!»
11:34 Diana echa a andar.
11:34 Diana se queda de pie.
11:35 · Ana: Avonlea, junto a camino de La Cuesta del Huerto · caminando
11:35 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:35 Diana dice: «¿Sí?»
11:37 Ana está en Avonlea, junto a La Cuesta del Huerto.
11:37 Ana dice: «¿Vamos a dar un paseo juntas? Hace un día precioso.»
11:37 Ana echa a andar.
11:37 Ana se queda de pie.
11:37 Ana dice: «¿Juras ser mi amiga del alma, Diana, mientras el sol y la luna existan?»
11:37 Diana dice: «¡Ana, mi alma gemela! Te estaba esperando.»
11:38 Diana dice: «¡Lo juro! Aunque no sé muy bien cómo se jura… ¿así está bien?»
11:39 Ana se sienta.
11:39 Ana dice: «Perfecto. Ahora es para siempre.»
11:40 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada
11:40 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:40 Ana echa a andar.
11:40 Diana echa a andar.
11:40 Diana se queda de pie.
11:40 Diana echa a andar.
11:40 Diana se queda de pie.
11:40 Diana echa a andar.
11:40 Diana se queda de pie.
11:40 Diana echa a andar.
11:45 · Ana: Avonlea, junto a camino del puente del arroyo · caminando
11:45 · Diana: Avonlea, junto a camino del puente del arroyo · caminando
11:49 Diana está en Avonlea, junto a camino del Bosque Encantado.
11:49 Diana echa a andar.
11:50 · Ana: Avonlea, junto a camino del Bosque Encantado · caminando
11:50 · Diana: Avonlea, junto a camino del Bosque Encantado · caminando
11:51 Diana está en Avonlea, junto a camino del puente del arroyo.
11:51 Diana echa a andar.
11:51 Diana se queda de pie.
11:51 Diana echa a andar.
11:52 Ana está en Avonlea, junto a camino del Camino Blanco de las Delicias.
11:52 Diana dice: «Los manzanos están llenos este año. Toma las que quieras.»
11:53 Diana está en Avonlea, junto a camino del Camino Blanco de las Delicias.
11:53 Diana echa a andar.
11:53 Diana se queda de pie.
11:54 Ana se sienta.
11:55 · Ana: Avonlea, junto a camino del Camino Blanco de las Delicias · sentada
11:55 · Diana: Avonlea, junto a camino del Camino Blanco de las Delicias · de pie
11:55 Ana echa a andar.
11:55 Diana echa a andar.
11:55 Diana se queda de pie.
11:55 Diana echa a andar.
11:55 Diana se queda de pie.
11:55 Diana echa a andar.
11:55 Diana está en Avonlea, junto a camino del Lago de las Aguas Brillantes.
11:55 Diana echa a andar.
11:58 Diana se queda de pie.
11:58 Diana echa a andar.
11:59 Ana está en Avonlea, junto al Lago de las Aguas Brillantes.
11:59 Ana echa a andar.
11:59 Ana se sienta; empieza: merendar; con el mantel del picnic.
11:59 Ana dice: «¡Un picnic junto al lago! Y hay helado… ¡nunca había probado helado! Es indescriptible.»
11:59 Diana está en Avonlea, junto al Lago de las Aguas Brillantes.
11:59 Ana echa a andar.
11:59 Ana se queda de pie.
12:00 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · de pie · merendar · con el mantel del picnic
12:00 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada
12:01 Ana se sienta.
12:05 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar · con el mantel del picnic
12:05 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada
12:08 Diana dice: «Mamá dice que puedo salir hasta que se ponga el sol. ¿Vamos al lago?»
12:10 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar · con el mantel del picnic
12:10 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada
12:15 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar · con el mantel del picnic
12:15 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada
12:20 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar · con el mantel del picnic
12:20 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada
12:23 Diana dice: «¡Ana, mi alma gemela! Te estaba esperando.»
12:25 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar · con el mantel del picnic
12:25 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada
12:30 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar · con el mantel del picnic
12:30 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada
12:35 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar · con el mantel del picnic
12:35 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada
12:38 Diana dice: «¡Ana, mi alma gemela! Te estaba esperando.»
12:39 Ana se queda de pie; termina lo que hacía; ya no tiene nada.
12:39 Diana se queda de pie.
12:39 Ana se sienta.
12:39 Diana echa a andar.
12:39 Diana se queda de pie.
12:40 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada
12:40 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · de pie
12:40 Diana echa a andar.
12:40 Diana se queda de pie.
12:40 Diana echa a andar.
12:40 Diana se queda de pie.
12:41 Diana echa a andar.
12:41 Diana se queda de pie.
```
</details>

## El corte de pelo (meta 60: cumplida)

**Lo que debería pasar:** Ana se sienta en una silla en medio de la cocina. Marilla, detrás de ella con las tijeras, le corta el pelo verde, con cuidado, un buen rato.

- ✔ Ana sentada en la cocina mientras le cortan el pelo, un buen rato. — 16:00, 15 min
- ✔ Marilla está con ella en la cocina. — 16:05, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (28 líneas)</summary>

```
16:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes; tiene el pelo verde.
16:00 Al empezar, Marilla está en la cocina de Tejas Verdes.
16:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
16:00 · Marilla: la cocina de Tejas Verdes · sentada
16:00 Ana echa a andar.
16:00 Marilla se queda de pie.
16:00 Ana va por la cocina de Tejas Verdes, junto a la puerta.
16:00 Ana se queda de pie.
16:00 Ana echa a andar.
16:00 Ana está en la cocina de Tejas Verdes; empieza: cortar_pelo.
16:00 Marilla dice: «No hay más remedio, Ana: hay que cortarlo. Quédate quieta.»
16:00 Ana echa a andar.
16:00 Marilla echa a andar.
16:00 Marilla se queda de pie.
16:00 Ana se sienta; con las tijeras.
16:05 · Ana: la cocina de Tejas Verdes · sentada · cortar_pelo · con las tijeras
16:05 · Marilla: la cocina de Tejas Verdes · de pie
16:10 · Ana: la cocina de Tejas Verdes · sentada · cortar_pelo · con las tijeras
16:10 · Marilla: la cocina de Tejas Verdes · de pie
16:13 Marilla dice: «Hmm. Bueno, admito que hoy te has portado muy bien.»
16:15 · Ana: la cocina de Tejas Verdes · sentada · cortar_pelo · con las tijeras
16:15 · Marilla: la cocina de Tejas Verdes · de pie
16:15 Ana se queda de pie; termina lo que hacía.
16:15 Ana dice: «Mi pelo… Bueno, por lo menos ya no es verde.»
16:15 Marilla echa a andar.
16:15 Ana echa a andar.
16:16 Ana está en la cocina de Tejas Verdes, junto a la silla de la ventana.
16:16 Marilla se queda de pie.
```
</details>

## El techo de los Barry (meta 61: cumplida)

**Lo que debería pasar:** Josie la desafía. Ana sube al techo de la casa de los Barry, camina por el caballete con los brazos abiertos… y se cae. Se tuerce el tobillo.

- ✔ Sube al techo y camina por el caballete. — 15:21, 2 min
- ✔ Se cae y se tuerce el tobillo. — 15:22, 1 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (27 líneas)</summary>

```
15:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
15:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
15:00 Ana echa a andar.
15:00 Ana se queda de pie.
15:00 Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»
15:01 Ana se sienta.
15:02 Ana echa a andar.
15:05 · Ana: Avonlea, junto a camino de la huerta de Tejas Verdes · caminando
15:06 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
15:10 · Ana: Avonlea, junto al Bosque Encantado · caminando
15:15 · Ana: Avonlea, junto a camino del puente del arroyo · caminando
15:17 Ana está en Avonlea, junto a La Cuesta del Huerto.
15:18 Ana dice: «¿Juras ser mi amiga del alma, Diana, mientras el sol y la luna existan?»
15:19 Ana se sienta.
15:20 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada
15:20 Ana dice: «Perfecto. Ahora es para siempre.»
15:21 Ana echa a andar.
15:21 Ana empieza: trepar.
15:21 Ana dice: «¡Josie Pye, mira cómo camino por el techo de los Barry!… ¡Ay!»
15:22 Ana se queda de pie.
15:22 Ana dice: «¡Aaay!»
15:22 Ana se sienta.
15:22 Ana dice: «¡Mi tobillo! Creo que me lo torcí… Diana, no puedo pararme.»
15:23 Ana termina lo que hacía.
15:23 Ana echa a andar.
15:24 Ana se queda de pie.
15:25 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie
```
</details>

