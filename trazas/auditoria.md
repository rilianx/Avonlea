# Auditoría de las acciones

Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.
**Pasos que ocurren como deberían: 91 de 95.**


## Lavar la loza y barrer la cocina (meta 26: cumplida)

**Lo que debería pasar:** Marilla le pide a Ana que lave los platos y barra. Ana junta los platos sucios de la mesa, los lleva al fregadero y los lava con agua caliente, sin apuro, unos diez minutos. Lleva la pila de platos limpios al aparador y los guarda. Después toma la escoba y barre la cocina de punta a punta, un buen rato.

- ✔ Recoge los platos sucios de la mesa. — 10:01, 19 min
- ✔ Los lleva en los brazos. — 10:04, 16 min
- ✔ Los lava en el fregadero, unos diez minutos. — 10:04, 16 min
- ✔ Lleva los platos limpios. — 10:16, 4 min
- ✔ Los guarda en el aparador. — 10:17, 3 min
- ✔ Barre la cocina con la escoba, un buen rato. — 10:20, 14 min

<details><summary>Lo que el juego cuenta que pasó (40 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 Ana echa a andar.
10:00 Ana está en la cocina de Tejas Verdes, junto a la puerta.
10:00 Ana echa a andar.
10:00 Ana está en la cocina de Tejas Verdes.
10:00 Ana echa a andar; empieza: quehacer platos.
10:00 Ana dice: «Lavo los platos con agua bien caliente… ¡y no rompo ninguno!»
10:01 Ana está en la cocina de Tejas Verdes, junto a la mesa; con los platos que va recogiendo.
10:04 Ana echa a andar; lleva los platos sucios.
10:04 Ana está en la cocina de Tejas Verdes, junto al fregadero; ya no lleva nada; con la palangana con agua.
10:05 · Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · quehacer platos · con la palangana con agua
10:10 · Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · quehacer platos · con la palangana con agua
10:15 · Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · quehacer platos · con la palangana con agua
10:16 Ana echa a andar; lleva una pila de platos limpios.
10:17 Ana está en la cocina de Tejas Verdes; ya no lleva nada; con el aparador abierto.
10:17 Ana está en la cocina de Tejas Verdes, junto al aparador.
10:20 · Ana: la cocina de Tejas Verdes, junto al aparador · de pie · quehacer platos · con el aparador abierto
10:20 Ana termina lo que hacía.
10:20 Ana echa a andar.
10:20 Ana está en la cocina de Tejas Verdes.
10:20 Ana echa a andar; empieza: quehacer barrer.
10:20 Ana dice: «Barro la cocina, y el patio también.»
10:20 Ana lleva la escoba.
10:20 Ana se queda de pie; ya no lleva nada; con la escoba.
10:23 Ana echa a andar; lleva la escoba.
10:23 Ana se queda de pie; ya no lleva nada; con la escoba.
10:25 · Ana: la cocina de Tejas Verdes · de pie · quehacer barrer · con la escoba
10:25 Ana echa a andar; lleva la escoba.
10:26 Ana se queda de pie; ya no lleva nada; con la escoba.
10:28 Ana echa a andar; lleva la escoba.
10:28 Ana se queda de pie; ya no lleva nada; con la escoba.
10:30 · Ana: la cocina de Tejas Verdes · de pie · quehacer barrer · con la escoba
10:31 Ana echa a andar; lleva la escoba.
10:32 Ana se queda de pie; ya no lleva nada; con la escoba.
10:34 Ana termina lo que hacía.
10:34 Ana echa a andar.
10:34 Ana se queda de pie.
10:35 · Ana: la cocina de Tejas Verdes · de pie
10:36 Ana echa a andar.
```
</details>

## Escribir una carta y mandarla (meta 45: cumplida)

**Lo que debería pasar:** Ana sube a su pieza, se sienta al escritorio y escribe una carta a la Srta. Stacy, con el papel sobre el escritorio, sin apuro (una media hora). La dobla y la pone en su sobre. Después baja y va al correo (en la tienda de Lawson), y la deja para que la manden. Ya no la tiene.

- ✔ Escribe sentada al escritorio de su pieza, con la carta sobre él, una media hora. — 10:02, 25 min
- ✔ Termina con la carta en su sobre. — 10:27, 33 min
- ✔ Va al correo (en la tienda de Lawson). — 10:59, 3 min
- ✔ La deja: ya no la tiene. — 11:00, hasta el final

<details><summary>Lo que el juego cuenta que pasó (52 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 Ana echa a andar.
10:00 Ana está en la cocina de Tejas Verdes, junto a la puerta.
10:00 Ana echa a andar.
10:00 Ana está en la cocina de Tejas Verdes.
10:00 Ana echa a andar; empieza: escribir_carta.
10:00 Ana dice: «Querida Srta. Stacy:»
10:02 Ana está en la pieza de Ana.
10:02 Ana echa a andar.
10:02 Ana está en la pieza de Ana, junto al escritorio; con la banqueta y la carta sobre la mesa.
10:03 Ana dice: «Aquí en Tejas Verdes los cerezos están en flor.»
10:04 Ana dice: «Le escribo desde Tejas Verdes con una pregunta muy importante: ¿cree usted que yo podría llegar a escribir un libro de verdad?»
10:04 Ana dice: «Ya tengo el título. Lo que me falta es todo lo demás.»
10:05 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir_carta · con la banqueta y la carta sobre la mesa
10:05 Ana dice: «Su alumna que la quiere, Ana Shirley»
10:10 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir_carta · con la banqueta y la carta sobre la mesa
10:15 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir_carta · con la banqueta y la carta sobre la mesa
10:20 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir_carta · con la banqueta y la carta sobre la mesa
10:25 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir_carta · con la banqueta y la carta sobre la mesa
10:27 Ana se queda de pie; termina lo que hacía; ahora tiene 1 carta.
10:27 Ana está en la cocina de Tejas Verdes, junto a la escalera.
10:27 Ana está en Avonlea, junto a Tejas Verdes.
10:27 Ana echa a andar.
10:27 Ana se queda de pie.
10:27 Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»
10:29 Ana se sienta.
10:30 · Ana: Avonlea, junto a Tejas Verdes · sentada
10:30 Ana echa a andar.
10:35 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
10:40 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
10:42 Ana está en Avonlea, junto a camino de la escuela.
10:42 Ana dice: «¡Hola, pequeño! ¿Cómo te llamas? Yo te diré Lord Fitzgerald.»
10:44 Ana se sienta.
10:44 Ana echa a andar.
10:45 · Ana: Avonlea, junto a camino de la escuela · caminando
10:50 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando
10:51 Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
10:51 Ana dice: «¡Buenos días, Janet King!»
10:53 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
10:53 Ana se sienta.
10:54 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
10:55 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · sentada
10:56 Ana dice: «Bueno, me voy, que tengo que mandar la carta por correo.»
10:57 Ana echa a andar.
10:59 Ana está en Avonlea, junto a la tienda de Lawson.
10:59 Ana dice: «Para la Srta. Stacy, en la pensión de Avonlea.»
11:00 · Ana: Avonlea, junto a la tienda de Lawson · de pie
11:00 Ana ya no tiene nada.
11:00 Ana dice: «Hay tanto por hacer y tan poco tiempo... ¡y yo con tantas ideas!»
11:00 Ana echa a andar.
11:02 Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
```
</details>

## La compota de Marilla (meta 8: cumplida)

**Lo que debería pasar:** Marilla quiere hacer compota para el invierno, pero no tiene manzanas: se las pide a Ana. Ana va a los manzanos, recoge las manzanas y se las lleva a Marilla a la cocina. Marilla las pela y las cuece en la estufa, removiendo, una media hora o más. Al final tiene la compota.

- ✔ Ana recoge manzanas de los manzanos. — 10:11, 11 min
- ✔ Ana tiene las manzanas. — 10:22, 27 min
- ✔ Se las da a Marilla en la cocina. — 10:48, 0 min
- ✔ Marilla tiene las manzanas. — 10:49, 61 min
- ✔ Marilla cocina la compota en la estufa, una media hora o más. — 10:50, 30 min
- ✔ Marilla tiene la compota. — 11:20, hasta el final

<details><summary>Lo que el juego cuenta que pasó (130 líneas)</summary>

```
10:00 Al empezar, Marilla está en la cocina de Tejas Verdes.
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 · Marilla: la cocina de Tejas Verdes · sentada
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 Marilla está en Avonlea, junto a Tejas Verdes.
10:00 Marilla echa a andar.
10:00 Marilla se queda de pie.
10:00 Marilla dice: «¿Me traerías 6 manzanas?»
10:00 Marilla está en la cocina de Tejas Verdes, junto a la puerta.
10:00 Ana echa a andar.
10:05 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:05 · Ana: Avonlea, junto al Bosque Encantado · caminando
10:10 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:10 · Ana: Avonlea, junto a camino de La Cuesta del Huerto · caminando
10:11 Ana está en Avonlea, junto a La Cuesta del Huerto.
10:11 Ana echa a andar; empieza: recoger manzanas.
10:12 Ana se queda de pie; con el canastito.
10:13 Ana se sienta.
10:15 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:15 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · recoger manzanas · con el canastito
10:17 Ana echa a andar.
10:17 Ana se queda de pie; con el canastito.
10:19 Ana se sienta.
10:20 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:20 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · recoger manzanas · con el canastito
10:22 Ana termina lo que hacía; ahora tiene 3 manzanas.
10:22 Ana echa a andar.
10:22 Ana se queda de pie.
10:22 Ana echa a andar; empieza: recoger manzanas.
10:22 Ana se queda de pie; con el canastito.
10:24 Ana se sienta.
10:25 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:25 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · recoger manzanas · con el canastito
10:27 Ana echa a andar.
10:28 Ana se queda de pie.
10:28 Ana echa a andar.
10:28 Ana se queda de pie; con el canastito.
10:30 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:30 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie · recoger manzanas · con el canastito
10:30 Ana se sienta.
10:33 Ana termina lo que hacía; ahora tiene 6 manzanas.
10:33 Ana echa a andar.
10:33 Ana se queda de pie.
10:33 Ana dice: «¿Juras ser mi amiga del alma, Diana, mientras el sol y la luna existan?»
10:35 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:35 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie
10:35 Ana se sienta.
10:36 Ana dice: «Perfecto. Ahora es para siempre.»
10:36 Ana echa a andar.
10:40 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:40 · Ana: Avonlea, junto a camino de el puente del arroyo · caminando
10:45 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:45 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
10:48 Ana está en la cocina de Tejas Verdes, junto a la puerta.
10:48 Ana empieza: dar manzanas; con lo que entrega.
10:48 Marilla dice: «Hmm. Bueno, admito que hoy te has portado muy bien.»
10:49 Marilla ahora tiene 6 manzanas.
10:49 Marilla dice: «Gracias.»
10:49 Ana termina lo que hacía; ya no tiene nada.
10:49 Marilla echa a andar; empieza: cocinar compota.
10:49 Ana dice: «¡Qué día para hacer algo bonito!»
10:49 Ana está en Avonlea, junto a Tejas Verdes.
10:49 Ana echa a andar.
10:50 · Marilla: la cocina de Tejas Verdes · caminando · cocinar compota
10:50 · Ana: Avonlea, junto a Tejas Verdes · caminando
10:50 Marilla está en la cocina de Tejas Verdes, junto a la estufa; con el bol.
10:51 Ana está en Avonlea, junto a la entrada del corral de Tejas Verdes.
10:52 Ana echa a andar.
10:53 Ana está en Avonlea, junto al granero.
10:55 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
10:55 · Ana: Avonlea, junto al granero · de pie
10:55 Ana se sienta.
11:00 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:00 · Ana: Avonlea, junto al granero · sentada
11:05 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:05 · Ana: Avonlea, junto al granero · sentada
11:08 Ana echa a andar.
11:08 Ana se queda de pie.
11:08 Ana echa a andar.
11:10 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:10 · Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · caminando
11:11 Ana está en Avonlea, junto a Tejas Verdes.
11:11 Ana echa a andar.
11:13 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
11:14 Ana echa a andar.
11:15 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:15 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
11:16 Ana está en Avonlea, junto a camino de la huerta de Tejas Verdes.
11:17 Ana echa a andar.
11:19 Ana está en Avonlea, junto al Camino Blanco de las Delicias.
11:20 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:20 · Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie
11:20 Marilla termina lo que hacía; ahora tiene 3 manzanas, 1 compota.
11:20 Ana echa a andar.
11:20 Marilla empieza: cocinar compota.
11:22 Ana está en Avonlea, junto al Bosque Encantado.
11:23 Ana echa a andar.
11:24 Ana está en Avonlea, junto a camino de el Bosque Encantado.
11:25 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota
11:25 · Ana: Avonlea, junto a camino de el Bosque Encantado · de pie
11:25 Ana echa a andar.
11:27 Ana está en Avonlea, junto al puente del arroyo.
11:29 Ana echa a andar.
11:30 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota
11:30 · Ana: Avonlea, junto al puente del arroyo · caminando
11:31 Ana está en Avonlea, junto a camino de el puente del arroyo.
11:31 Ana echa a andar.
11:34 Ana está en Avonlea, junto a camino de La Cuesta del Huerto.
11:35 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota
11:35 · Ana: Avonlea, junto a camino de La Cuesta del Huerto · de pie
11:35 Ana echa a andar.
11:37 Ana está en la salita de La Cuesta del Huerto.
11:37 Ana echa a andar.
11:37 Ana se queda de pie.
11:38 Ana echa a andar.
11:38 Ana está en la salita de La Cuesta del Huerto, junto a la mesita del té.
11:39 Ana echa a andar.
11:40 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota
11:40 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · caminando
11:40 Ana se queda de pie.
11:45 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota
11:45 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
11:50 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota
11:50 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
11:50 Ana echa a andar.
11:50 Ana se queda de pie.
11:50 Marilla está en la cocina de Tejas Verdes; termina lo que hacía; ahora tiene 2 compota.
11:50 Ana echa a andar.
11:51 Ana está en Avonlea, junto a La Cuesta del Huerto.
11:51 Ana echa a andar.
```
</details>

## Matthew trae huevos (meta 20: cumplida)

**Lo que debería pasar:** Ana le pide huevos a Matthew. Matthew va donde están las gallinas, junto al granero, se agacha a sacarlos de los nidos y los junta. Se los lleva a Ana, que los recibe.

- ✔ Matthew se agacha junto al granero, donde están las gallinas, a sacar los huevos. — 09:07, 8 min
- ✔ Matthew tiene los huevos. — 09:15, 3 min
- ✔ Se los da a Ana. — 09:17, 0 min
- ✔ Ana tiene los huevos. — 09:18, hasta el final

<details><summary>Lo que el juego cuenta que pasó (33 líneas)</summary>

```
09:00 Al empezar, Matthew va por Avonlea, junto a la huerta de Tejas Verdes; ahora tiene 5 dolares.
09:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
09:00 · Matthew: Avonlea, junto a la huerta de Tejas Verdes · caminando
09:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
09:00 Matthew se queda de pie.
09:00 Ana echa a andar.
09:00 Ana dice: «¡Matthew! ¡Espera!»
09:00 Matthew dice: «¿Sí?»
09:00 Matthew dice: «Las vacas andan contentas hoy. Será por el sol, supongo.»
09:00 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
09:02 Matthew echa a andar.
09:05 · Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · caminando
09:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie
09:05 Matthew está en Avonlea, junto a la entrada del corral de Tejas Verdes.
09:05 Matthew echa a andar; empieza: recoger huevos.
09:05 Matthew está en Avonlea, junto al granero.
09:07 Matthew se agacha; con el canastito.
09:10 · Matthew: Avonlea, junto al granero · agachada · recoger huevos · con el canastito
09:10 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie
09:10 Matthew se queda de pie.
09:10 Matthew echa a andar.
09:10 Matthew se queda de pie.
09:12 Matthew se agacha; con el canastito.
09:15 · Matthew: Avonlea, junto al granero · agachada · recoger huevos · con el canastito
09:15 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie
09:15 Matthew se queda de pie; termina lo que hacía; ahora tiene 5 dolares, 6 huevos.
09:15 Matthew echa a andar.
09:17 Matthew está en Avonlea, junto a la huerta de Tejas Verdes; empieza: dar huevos; con lo que entrega.
09:18 Matthew termina lo que hacía; ahora tiene 5 dolares.
09:18 Ana ahora tiene 6 huevos.
09:18 Ana dice: «Gracias.»
09:20 · Matthew: Avonlea, junto a la huerta de Tejas Verdes · de pie
09:20 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie
```
</details>

## El tinte del buhonero (meta 59: cumplida)

**Lo que debería pasar:** Pasa el buhonero por Tejas Verdes. Ana le cambia unos huevos por un frasco de tinte que promete pelo negro como el ala de un cuervo. Sube a su pieza y, frente al espejo del lavatorio, se tiñe el pelo con cuidado, un buen rato. Cuando termina, el pelo le ha quedado... verde.

- ✔ Ana le pide el tinte al buhonero (a cambio de huevos). — 10:54, 1 min
- ✔ Ana tiene el tinte. — 11:22, 59 min
- ✔ Se tiñe frente al espejo del lavatorio de su pieza, un buen rato. — 12:06, 15 min
- ✔ El pelo le queda verde. — 12:21, hasta el final

<details><summary>Lo que el juego cuenta que pasó (262 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 Al empezar, el buhonero va por Avonlea, junto a la huerta de Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 · el buhonero: Avonlea, junto a la huerta de Tejas Verdes · caminando
10:00 Ana echa a andar.
10:01 Ana está en Avonlea, junto a la entrada del corral de Tejas Verdes.
10:01 Ana echa a andar; empieza: recoger huevos.
10:02 Ana está en Avonlea, junto al granero.
10:02 Ana echa a andar.
10:02 Ana se agacha; con el canastito.
10:04 Ana se sienta.
10:05 · Ana: Avonlea, junto al granero · sentada · recoger huevos · con el canastito
10:05 · el buhonero: Avonlea, junto a camino de la huerta de Tejas Verdes · caminando
10:05 Ana echa a andar.
10:05 Ana se agacha; con el canastito.
10:07 Ana se sienta.
10:08 Ana termina lo que hacía; ahora tiene 6 huevos.
10:08 Ana echa a andar.
10:08 Ana se queda de pie.
10:10 · Ana: Avonlea, junto al granero · de pie
10:10 · el buhonero: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:10 Ana se sienta.
10:12 Ana echa a andar.
10:15 · Ana: Avonlea, junto al corral de Tejas Verdes · caminando
10:15 · el buhonero: Avonlea, junto a camino de la escuela · caminando
10:20 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
10:20 · el buhonero: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando
10:25 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:25 · el buhonero: Avonlea, junto a camino de el salón del pueblo · caminando
10:30 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:30 · el buhonero: Avonlea, junto a camino de el campo de flores rosadas · caminando
10:34 el buhonero está en Avonlea, junto a la casa parroquial.
10:34 el buhonero echa a andar.
10:34 el buhonero se queda de pie.
10:35 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:35 · el buhonero: Avonlea, junto a la casa parroquial · de pie
10:36 el buhonero echa a andar.
10:36 el buhonero se queda de pie.
10:38 el buhonero echa a andar.
10:38 el buhonero se queda de pie.
10:38 el buhonero echa a andar.
10:39 el buhonero se queda de pie.
10:39 el buhonero echa a andar.
10:39 Ana está en Avonlea, junto a camino de la escuela.
10:39 el buhonero se queda de pie.
10:40 · Ana: Avonlea, junto a camino de la escuela · de pie
10:40 · el buhonero: Avonlea, junto a la casa parroquial · de pie
10:41 el buhonero echa a andar.
10:41 Ana se sienta.
10:41 el buhonero se queda de pie.
10:42 el buhonero echa a andar.
10:43 el buhonero se queda de pie.
10:43 Ana echa a andar.
10:45 · Ana: Avonlea, junto a camino de la escuela · caminando
10:45 · el buhonero: Avonlea, junto a la casa parroquial · de pie
10:45 el buhonero echa a andar.
10:45 el buhonero se queda de pie.
10:46 el buhonero está en Avonlea, junto al faro.
10:46 el buhonero echa a andar.
10:46 el buhonero se queda de pie.
10:48 el buhonero echa a andar.
10:48 el buhonero se queda de pie.
10:49 Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
10:49 Ana dice: «¡Buenos días!»
10:50 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · de pie
10:50 · el buhonero: Avonlea, junto al faro · de pie
10:50 el buhonero echa a andar.
10:50 el buhonero se queda de pie.
10:51 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
10:51 Ana se sienta.
10:51 el buhonero echa a andar.
10:52 el buhonero se queda de pie.
10:52 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
10:52 el buhonero echa a andar.
10:52 el buhonero está en Avonlea, junto a camino de el faro.
10:54 el buhonero echa a andar.
10:54 Ana dice: «Bueno, me voy, que tengo que cambiar 2 huevos por frasco de tinte para el pelo.»
10:54 el buhonero está en Avonlea, junto al faro.
10:55 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · sentada
10:55 · el buhonero: Avonlea, junto al faro · de pie
10:55 el buhonero echa a andar.
10:55 Ana echa a andar.
10:56 el buhonero está en Avonlea, junto a camino de el faro.
10:56 el buhonero echa a andar.
10:56 el buhonero se queda de pie.
10:57 el buhonero echa a andar.
10:58 el buhonero está en Avonlea, junto al faro.
10:59 el buhonero echa a andar.
10:59 el buhonero se queda de pie.
11:00 · Ana: Avonlea, junto a camino de la tienda de Lawson · caminando
11:00 · el buhonero: Avonlea, junto al faro · de pie
11:00 Ana dice: «¡Un puente con techo! Es como cruzar el río por adentro de una caja de música.»
11:00 Ana está en Avonlea, junto a camino de la tienda de Lawson.
11:00 Ana dice: «¡Buenos días!»
11:00 el buhonero echa a andar.
11:01 el buhonero se queda de pie.
11:02 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
11:02 Ana se sienta.
11:02 el buhonero echa a andar.
11:02 el buhonero se queda de pie.
11:03 el buhonero echa a andar.
11:03 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
11:03 el buhonero se queda de pie.
11:05 · Ana: Avonlea, junto a camino de la tienda de Lawson · sentada
11:05 · el buhonero: Avonlea, junto al faro · de pie
11:05 el buhonero echa a andar.
11:05 el buhonero se queda de pie.
11:05 Ana dice: «Bueno, me voy, que tengo que cambiar 2 huevos por frasco de tinte para el pelo.»
11:06 el buhonero echa a andar.
11:06 el buhonero se queda de pie.
11:06 Ana echa a andar.
11:08 el buhonero echa a andar.
11:08 el buhonero se queda de pie.
11:09 el buhonero echa a andar.
11:10 · Ana: Avonlea, junto a camino de la tienda de Lawson · caminando
11:10 · el buhonero: Avonlea, junto al faro · caminando
11:10 el buhonero se queda de pie.
11:11 el buhonero echa a andar.
11:11 el buhonero se queda de pie.
11:13 el buhonero echa a andar.
11:14 el buhonero está en Avonlea, junto a camino de el faro.
11:15 · Ana: Avonlea, junto a camino de el faro · caminando
11:15 · el buhonero: Avonlea, junto a camino de el faro · de pie
11:15 el buhonero echa a andar.
11:15 el buhonero está en Avonlea, junto al faro.
11:17 Ana dice: «¡buhonero! ¡Espera!»
11:17 el buhonero echa a andar.
11:17 el buhonero se queda de pie.
11:18 Ana está en Avonlea, junto a camino de el faro.
11:18 el buhonero echa a andar.
11:18 el buhonero está en Avonlea, junto a camino de el faro.
11:20 · Ana: Avonlea, junto a camino de el faro · de pie
11:20 · el buhonero: Avonlea, junto a camino de el faro · de pie
11:20 Ana se sienta.
11:20 el buhonero echa a andar.
11:20 Ana echa a andar.
11:20 el buhonero está en Avonlea, junto al faro.
11:21 Ana está en Avonlea, junto al faro.
11:21 Ana dice: «Buenos días. ¿Me cambiaría 2 huevos por 1 frasco de tinte para el pelo?»
11:22 Ana ahora tiene 4 huevos, 1 tinte.
11:22 Ana echa a andar.
11:24 el buhonero echa a andar.
11:24 el buhonero se queda de pie.
11:25 · Ana: Avonlea, junto a camino de el faro · caminando
11:25 · el buhonero: Avonlea, junto al faro · de pie
11:25 el buhonero echa a andar.
11:26 el buhonero se queda de pie.
11:27 el buhonero echa a andar.
11:27 el buhonero se queda de pie.
11:28 el buhonero echa a andar.
11:29 el buhonero se queda de pie.
11:30 · Ana: Avonlea, junto a camino de la tienda de Lawson · caminando
11:30 · el buhonero: Avonlea, junto al faro · de pie
11:30 el buhonero echa a andar.
11:30 el buhonero se queda de pie.
11:32 el buhonero echa a andar.
11:32 el buhonero está en Avonlea, junto a la escuela.
11:33 el buhonero echa a andar.
11:34 el buhonero se queda de pie.
11:35 · Ana: Avonlea, junto a camino de la tienda de Lawson · caminando
11:35 · el buhonero: Avonlea, junto a la escuela · de pie
11:35 el buhonero echa a andar.
11:35 el buhonero se queda de pie.
11:36 el buhonero echa a andar.
11:36 el buhonero se queda de pie.
11:37 el buhonero echa a andar.
11:37 el buhonero se queda de pie.
11:38 el buhonero echa a andar.
11:38 el buhonero se queda de pie.
11:39 Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
11:39 Ana dice: «¡Buenos días, Olivia King!»
11:40 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · de pie
11:40 · el buhonero: Avonlea, junto a la escuela · de pie
11:40 el buhonero echa a andar.
11:40 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
11:40 el buhonero se queda de pie.
11:40 Ana se sienta.
11:41 el buhonero echa a andar.
11:41 el buhonero se queda de pie.
11:42 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
11:43 el buhonero echa a andar.
11:43 el buhonero se queda de pie.
11:44 Ana dice: «Bueno, me voy, que tengo que teñirme el pelo.»
11:44 Ana echa a andar.
11:45 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando
11:45 · el buhonero: Avonlea, junto a la escuela · de pie
11:45 el buhonero echa a andar.
11:46 el buhonero se queda de pie.
11:47 el buhonero echa a andar.
11:48 el buhonero se queda de pie.
11:49 el buhonero echa a andar.
11:49 el buhonero se queda de pie.
11:50 · Ana: Avonlea, junto a camino de la escuela · caminando
11:50 · el buhonero: Avonlea, junto a la escuela · de pie
11:50 el buhonero echa a andar.
11:50 el buhonero se queda de pie.
11:51 el buhonero echa a andar.
11:52 el buhonero se queda de pie.
11:53 el buhonero echa a andar.
11:53 el buhonero se queda de pie.
11:55 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
11:55 · el buhonero: Avonlea, junto a la escuela · de pie
11:55 el buhonero echa a andar.
11:55 el buhonero se queda de pie.
11:57 el buhonero echa a andar.
11:57 el buhonero se queda de pie.
11:58 el buhonero echa a andar.
11:58 el buhonero se queda de pie.
11:59 el buhonero echa a andar.
11:59 el buhonero se queda de pie.
12:00 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
12:00 · el buhonero: Avonlea, junto a la escuela · de pie
12:00 el buhonero echa a andar.
12:00 el buhonero se queda de pie.
12:02 el buhonero echa a andar.
12:02 el buhonero se queda de pie.
12:03 Ana está en la cocina de Tejas Verdes, junto a la puerta.
12:03 Ana echa a andar.
12:04 el buhonero echa a andar.
12:04 el buhonero se queda de pie.
12:04 Ana está en la pieza de Ana.
12:04 Ana echa a andar.
12:05 · Ana: la pieza de Ana · caminando
12:05 · el buhonero: Avonlea, junto a la escuela · de pie
12:05 el buhonero echa a andar.
12:05 Ana está en la pieza de Ana, junto al escritorio.
12:05 Ana echa a andar; empieza: teñir.
12:05 el buhonero se queda de pie.
12:06 Ana está en la pieza de Ana, junto al lavatorio y su espejo; con el frasco de tinte.
12:06 Ana dice: «¡Negro azabache como el ala de un cuervo! Ya verán…»
12:06 el buhonero echa a andar.
12:07 el buhonero se queda de pie.
12:08 el buhonero echa a andar.
12:09 el buhonero se queda de pie.
12:10 · Ana: la pieza de Ana, junto al lavatorio y su espejo · de pie · teñir · con el frasco de tinte
12:10 · el buhonero: Avonlea, junto a la escuela · de pie
12:10 el buhonero echa a andar.
12:11 el buhonero se queda de pie.
12:11 el buhonero echa a andar.
12:12 el buhonero se queda de pie.
12:13 el buhonero echa a andar.
12:13 el buhonero se queda de pie.
12:14 el buhonero echa a andar.
12:14 el buhonero se queda de pie.
12:15 · Ana: la pieza de Ana, junto al lavatorio y su espejo · de pie · teñir · con el frasco de tinte
12:15 · el buhonero: Avonlea, junto a la escuela · de pie
12:16 el buhonero echa a andar.
12:16 el buhonero se queda de pie.
12:18 el buhonero echa a andar.
12:18 el buhonero está en Avonlea, junto a la iglesia.
12:19 el buhonero echa a andar.
12:19 el buhonero se queda de pie.
12:20 · Ana: la pieza de Ana, junto al lavatorio y su espejo · de pie · teñir · con el frasco de tinte
12:20 · el buhonero: Avonlea, junto a la iglesia · de pie
12:20 el buhonero echa a andar.
12:20 el buhonero se queda de pie.
12:21 Ana termina lo que hacía; ahora tiene 4 huevos; tiene el pelo verde.
12:21 Ana dice: «Ya está… a ver… ¡¿VERDE?! ¡Mi pelo está VERDE!»
12:21 Ana echa a andar.
12:21 Ana está en la pieza de Ana.
12:22 el buhonero echa a andar.
12:22 el buhonero se queda de pie.
```
</details>

## Vender la vaca (meta 0: cumplida)

**Lo que debería pasar:** Ana va al granero y descuelga la cuerda de su gancho. Le pone la cuerda a la vaca y la lleva, despacio, hasta quien la compra. Hacen el trato y Ana vuelve con el dinero.

- ✔ Toma la cuerda en el granero. — 09:02, 2 min
- ✔ Lleva a la vaca de la cuerda. — 09:07, 29 min
- ✔ Vuelve con el dinero de la venta. — 09:37, hasta el final

<details><summary>Lo que el juego cuenta que pasó (37 líneas)</summary>

```
09:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
09:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
09:00 Ana echa a andar.
09:02 Ana está en Avonlea, junto al granero.
09:02 Ana echa a andar; empieza: tomar cuerda.
09:02 Ana se queda de pie.
09:02 Ana echa a andar.
09:02 Ana se queda de pie; con la cuerda.
09:03 Ana termina lo que hacía; ahora tiene 1 cuerda.
09:03 Ana echa a andar.
09:04 Ana se queda de pie.
09:04 Ana dice: «¡Hola, pequeño! ¿Cómo te llamas? Yo te diré Lord Fitzgerald.»
09:05 · Ana: Avonlea, junto al granero · de pie
09:05 Ana se sienta.
09:05 Ana echa a andar.
09:07 Ana está en Avonlea, junto a la entrada del corral de Tejas Verdes; lleva de la cuerda a Dolly.
09:07 Ana echa a andar.
09:10 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
09:15 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
09:16 Ana está en Avonlea, junto a camino de la casa de la Sra. Lynde.
09:16 Ana dice: «¿Qué pensarán los animales de nosotros?»
09:17 Ana se sienta.
09:19 Ana echa a andar.
09:20 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
09:25 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
09:29 Ana está en Avonlea, junto a camino de la escuela.
09:29 Ana dice: «¡Hola, pequeño! ¿Cómo te llamas? Yo te diré Lord Fitzgerald.»
09:30 · Ana: Avonlea, junto a camino de la escuela · de pie
09:30 Ana se sienta.
09:31 Ana echa a andar.
09:35 · Ana: Avonlea, junto a camino de la aldea de Avonlea (el cruce de caminos) · caminando
09:36 Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
09:36 Ana dice: «¿Le interesaría comprar esta vaca? Es buena lechera.»
09:37 Ana ahora tiene 1 cuerda, 20 dolares; suelta la cuerda.
09:37 Ana dice: «Se me ocurrió una idea... ¡de esas que solo tengo yo!»
09:37 Ana echa a andar.
09:39 Ana está en Avonlea, junto a camino de la aldea de Avonlea (el cruce de caminos).
```
</details>

## Una cinta para el pelo (trueque) (meta 1: cumplida)

**Lo que debería pasar:** Ana quiere una cinta y no tiene dinero. Va a los arbustos, se agacha y junta bayas en su canastito. Las lleva a la tienda de Lawson y las cambia por una cinta.

- ✔ Se agacha a juntar bayas. — 09:01, 6 min
- ✔ Tiene las bayas. — 09:07, 43 min
- ✘ Va a la tienda de Lawson. — no ocurrió (al final: Tienda de Lawson · de pie · tiene 1 cinta)
- ✔ Tiene la cinta. — 09:50, hasta el final

<details><summary>Lo que el juego cuenta que pasó (53 líneas)</summary>

```
09:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
09:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
09:00 Ana echa a andar.
09:00 Ana se queda de pie.
09:00 Ana echa a andar; empieza: recoger bayas.
09:01 Ana se agacha; con el canastito.
09:02 Ana se sienta.
09:04 Ana echa a andar.
09:04 Ana está en Avonlea, junto a la entrada del corral de Tejas Verdes; con el canastito.
09:05 · Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · agachada · recoger bayas · con el canastito
09:06 Ana se sienta.
09:07 Ana termina lo que hacía; ahora tiene 3 bayas.
09:07 Ana echa a andar.
09:07 Ana se queda de pie.
09:08 Ana dice: «¡Oh, señor Matthew! ¿De verdad lo dice?»
09:09 Ana se sienta.
09:10 · Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · sentada
09:10 Ana echa a andar.
09:10 Ana se queda de pie.
09:10 Ana echa a andar; empieza: recoger bayas.
09:10 Ana está en Avonlea, junto a Tejas Verdes; con el canastito.
09:12 Ana se sienta.
09:13 Ana echa a andar.
09:14 Ana está en Avonlea, junto a la entrada del corral de Tejas Verdes; con el canastito.
09:15 · Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · agachada · recoger bayas · con el canastito
09:16 Ana se sienta.
09:17 Ana termina lo que hacía; ahora tiene 6 bayas.
09:17 Ana echa a andar.
09:17 Ana se queda de pie.
09:17 Ana echa a andar; empieza: recoger bayas.
09:17 Ana se agacha; con el canastito.
09:19 Ana se sienta.
09:20 · Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · sentada · recoger bayas · con el canastito
09:20 Ana echa a andar.
09:22 Ana está en Avonlea, junto a camino de Tejas Verdes; con el canastito.
09:24 Ana se sienta.
09:25 · Ana: Avonlea, junto a camino de Tejas Verdes · sentada · recoger bayas · con el canastito
09:25 Ana termina lo que hacía; ahora tiene 9 bayas.
09:25 Ana echa a andar.
09:30 · Ana: Avonlea, junto a camino de la huerta de Tejas Verdes · caminando
09:35 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
09:40 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
09:45 · Ana: Avonlea, junto a camino de la aldea de Avonlea (el cruce de caminos) · caminando
09:48 Ana está en Tienda de Lawson.
09:48 Ana echa a andar.
09:49 Ana se queda de pie.
09:49 Ana echa a andar.
09:49 Ana se queda de pie.
09:49 Ana dice: «Buenos días, Sr. Lawson. ¿Me cambiaría 9 bayas por una cinta para el pelo?»
09:50 · Ana: Tienda de Lawson · de pie
09:50 Ana ahora tiene 1 cinta.
09:50 Ana echa a andar.
09:50 Ana se queda de pie.
```
</details>

## Un regalo para Marilla (meta 2: cumplida)

**Lo que debería pasar:** Ana quiere regalarle algo a Marilla. Va a la huerta, se agacha y corta un ramo de flores. Entra a la cocina y se lo da a Marilla, que lo recibe.

- ✔ Corta flores en la huerta, agachada. — 10:04, 3 min
- ✔ Tiene el ramo. — 10:07, 2 min
- ✔ Se lo da a Marilla en la cocina. — 10:08, 0 min
- ✔ Marilla tiene el ramo. — 10:08, hasta el final

<details><summary>Lo que el juego cuenta que pasó (30 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 Al empezar, Marilla está en la cocina de Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 · Marilla: la cocina de Tejas Verdes · sentada
10:00 Ana echa a andar.
10:00 Marilla se queda de pie.
10:00 Ana se queda de pie.
10:00 Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»
10:01 Ana se sienta.
10:02 Ana echa a andar.
10:03 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
10:03 Ana echa a andar; empieza: recoger ramo.
10:04 Ana se agacha; con el canastito.
10:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · agachada · recoger ramo · con el canastito
10:05 · Marilla: la cocina de Tejas Verdes · de pie
10:05 Ana se sienta.
10:07 Ana termina lo que hacía; ahora tiene 1 ramo.
10:07 Ana echa a andar.
10:08 Ana está en la cocina de Tejas Verdes, junto a la puerta.
10:08 Ana echa a andar.
10:08 Marilla dice: «Si quieres cocinar, la estufa está encendida. Cuidado con no quemar nada esta vez.»
10:08 Ana está en la cocina de Tejas Verdes; empieza: dar ramo; con lo que entrega.
10:08 Ana termina lo que hacía; ya no tiene nada.
10:08 Marilla ahora tiene 1 ramo.
10:08 Marilla dice: «¡Oh! Justo lo que me gusta.»
10:09 Ana echa a andar.
10:09 Ana está en Avonlea, junto a Tejas Verdes.
10:09 Ana echa a andar.
10:10 · Ana: Avonlea, junto a Tejas Verdes · caminando
10:10 · Marilla: la cocina de Tejas Verdes · de pie
```
</details>

## Matthew trae azúcar (meta 6: cumplida)

**Lo que debería pasar:** A Marilla le falta azúcar y se la pide a Matthew. Matthew va a la tienda de Lawson y la compra. Vuelve a la cocina y se la da.

- ✔ Matthew va a la tienda. — 10:26, 20 min
- ✔ Compra el azúcar. — 10:26, 21 min
- ✔ Se la da a Marilla en la cocina. — 10:46, 0 min
- ✔ Marilla tiene el azúcar. — 10:46, hasta el final

<details><summary>Lo que el juego cuenta que pasó (41 líneas)</summary>

```
10:00 Al empezar, Matthew va por Avonlea, junto al granero; ahora tiene 5 dolares.
10:00 Al empezar, Marilla está en la cocina de Tejas Verdes.
10:00 · Matthew: Avonlea, junto al granero · caminando
10:00 · Marilla: la cocina de Tejas Verdes · sentada
10:00 Matthew se queda de pie.
10:00 Matthew dice: «Ejem... tranquila, tranquila.»
10:00 Marilla se queda de pie.
10:01 Matthew echa a andar.
10:05 · Matthew: Avonlea, junto a camino de el corral de Tejas Verdes · caminando
10:05 · Marilla: la cocina de Tejas Verdes · de pie
10:10 · Matthew: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:10 · Marilla: la cocina de Tejas Verdes · de pie
10:15 · Matthew: Avonlea, junto a camino de la escuela · caminando
10:15 · Marilla: la cocina de Tejas Verdes · de pie
10:15 Matthew está en Avonlea, junto a camino de la escuela.
10:15 Matthew dice: «Ejem... tranquila, tranquila.»
10:17 Matthew echa a andar.
10:20 · Matthew: Avonlea, junto a camino de la aldea de Avonlea (el cruce de caminos) · caminando
10:20 · Marilla: la cocina de Tejas Verdes · de pie
10:24 Matthew va por Tienda de Lawson.
10:25 · Matthew: Tienda de Lawson · caminando
10:25 · Marilla: la cocina de Tejas Verdes · de pie
10:25 Matthew se queda de pie.
10:25 Matthew dice: «Buenos días, Sr. Lawson. ¿Me daría una taza de azúcar? A la libreta de los Cuthbert.»
10:26 Matthew ahora tiene 5 dolares, 1 azucar.
10:26 Matthew está en Avonlea, junto a la tienda de Lawson.
10:26 Matthew echa a andar.
10:30 · Matthew: Avonlea, junto a camino de la aldea de Avonlea (el cruce de caminos) · caminando
10:30 · Marilla: la cocina de Tejas Verdes · de pie
10:35 · Matthew: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
10:35 · Marilla: la cocina de Tejas Verdes · de pie
10:40 · Matthew: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:40 · Marilla: la cocina de Tejas Verdes · de pie
10:45 · Matthew: Avonlea, junto a la huerta de Tejas Verdes · caminando
10:45 · Marilla: la cocina de Tejas Verdes · de pie
10:46 Matthew va por la cocina de Tejas Verdes, junto a la puerta.
10:46 Matthew está en la cocina de Tejas Verdes; empieza: dar azucar; con lo que entrega.
10:46 Matthew está en Avonlea, junto a Tejas Verdes; termina lo que hacía; ahora tiene 5 dolares.
10:46 Marilla ahora tiene 1 azucar.
10:46 Marilla dice: «Gracias.»
10:47 Matthew echa a andar.
```
</details>

## El té con la Sra. Allan (meta 14: cumplida)

**Lo que debería pasar:** La Sra. Allan invita a Ana a tomar el té. Prepara el té en su casa. Ana llega y se sientan juntas a la mesa, con las tazas, a conversar sin apuro, una media hora.

- ✔ La Sra. Allan prepara el té. — 15:47, 30 min
- ✘ Ana toma el té sentada, una media hora. — no ocurrió (al final: Avonlea, junto a la casa parroquial · caminando)

<details><summary>Lo que el juego cuenta que pasó (140 líneas)</summary>

```
15:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
15:00 Al empezar, la Sra. Allan va por Avonlea, junto a la iglesia.
15:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
15:00 · la Sra. Allan: Avonlea, junto a la iglesia · caminando
15:01 la Sra. Allan está en Avonlea, junto a camino de la iglesia.
15:01 Ana se sienta.
15:02 Ana echa a andar.
15:03 la Sra. Allan echa a andar.
15:04 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
15:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie
15:05 · la Sra. Allan: Avonlea, junto a camino de la iglesia · caminando
15:05 Ana echa a andar.
15:07 Ana está en Avonlea, junto a camino de la huerta de Tejas Verdes.
15:08 Ana echa a andar.
15:09 Ana está en Avonlea, junto al Camino Blanco de las Delicias.
15:09 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
15:10 · Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie
15:10 · la Sra. Allan: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
15:11 Ana se sienta.
15:12 Ana echa a andar.
15:13 Ana se queda de pie.
15:14 Ana echa a andar.
15:15 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
15:15 · la Sra. Allan: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
15:16 Ana está en Avonlea, junto al Bosque Encantado.
15:17 Ana echa a andar.
15:19 Ana está en Avonlea, junto al puente del arroyo.
15:20 · Ana: Avonlea, junto al puente del arroyo · de pie
15:20 · la Sra. Allan: Avonlea, junto a camino de el Camino Blanco de las Delicias · caminando
15:20 Ana echa a andar.
15:22 Ana se queda de pie.
15:22 Ana echa a andar.
15:24 Ana está en Avonlea, junto a camino de el puente del arroyo.
15:25 · Ana: Avonlea, junto a camino de el puente del arroyo · de pie
15:25 · la Sra. Allan: Avonlea, junto a camino de el puente del arroyo · caminando
15:25 la Sra. Allan está en Avonlea, junto a camino de el puente del arroyo.
15:25 la Sra. Allan echa a andar.
15:25 la Sra. Allan se queda de pie.
15:25 la Sra. Allan echa a andar.
15:26 Ana dice: «¡Oh, Sra. Allan! Usted es mi espíritu afín.»
15:26 Ana se sienta.
15:30 · Ana: Avonlea, junto a camino de el puente del arroyo · sentada
15:30 · la Sra. Allan: Avonlea, junto al Lago de las Aguas Brillantes · caminando
15:35 · Ana: Avonlea, junto a camino de el puente del arroyo · sentada
15:35 · la Sra. Allan: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
15:40 · Ana: Avonlea, junto a camino de el puente del arroyo · sentada
15:40 · la Sra. Allan: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
15:45 · Ana: Avonlea, junto a camino de el puente del arroyo · sentada
15:45 · la Sra. Allan: Avonlea, junto a camino de la iglesia · caminando
15:47 la Sra. Allan está en Avonlea, junto a la casa parroquial.
15:47 la Sra. Allan está en in; empieza: cocinar te.
15:50 · Ana: Avonlea, junto a camino de el puente del arroyo · sentada
15:50 · la Sra. Allan: in · de pie · cocinar te
15:55 · Ana: Avonlea, junto a camino de el puente del arroyo · sentada
15:55 · la Sra. Allan: in · de pie · cocinar te
16:00 · Ana: Avonlea, junto a camino de el puente del arroyo · sentada
16:00 · la Sra. Allan: in · de pie · cocinar te
16:00 Ana echa a andar.
16:05 · Ana: Avonlea, junto a camino de el Lago de las Aguas Brillantes · caminando
16:05 · la Sra. Allan: in · de pie · cocinar te
16:10 · Ana: Avonlea, junto a camino de la escuela · caminando
16:10 · la Sra. Allan: in · de pie · cocinar te
16:15 · Ana: Avonlea, junto al salón del pueblo · caminando
16:15 · la Sra. Allan: in · de pie · cocinar te
16:17 la Sra. Allan está en Avonlea, junto a la casa parroquial; termina lo que hacía; ahora tiene 1 te.
16:20 · Ana: Avonlea, junto a la iglesia · caminando
16:20 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
16:20 Ana está en Avonlea, junto a la casa parroquial.
16:21 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
16:22 Ana se sienta.
16:24 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
16:25 · Ana: Avonlea, junto a la casa parroquial · sentada
16:25 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
16:27 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
16:30 · Ana: Avonlea, junto a la casa parroquial · sentada
16:30 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
16:30 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
16:33 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
16:35 · Ana: Avonlea, junto a la casa parroquial · sentada
16:35 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
16:35 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
16:38 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
16:40 · Ana: Avonlea, junto a la casa parroquial · sentada
16:40 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
16:41 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
16:44 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
16:45 · Ana: Avonlea, junto a la casa parroquial · sentada
16:45 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
16:47 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
16:49 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
16:50 · Ana: Avonlea, junto a la casa parroquial · sentada
16:50 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
16:52 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
16:55 · Ana: Avonlea, junto a la casa parroquial · sentada
16:55 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
16:55 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
16:58 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:00 · Ana: Avonlea, junto a la casa parroquial · sentada
17:00 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
17:01 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:01 Ana dice: «¡Oh, Sra. Allan! Usted es mi espíritu afín.»
17:03 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:05 · Ana: Avonlea, junto a la casa parroquial · sentada
17:05 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
17:06 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:09 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:10 · Ana: Avonlea, junto a la casa parroquial · sentada
17:10 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
17:12 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:15 · Ana: Avonlea, junto a la casa parroquial · sentada
17:15 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
17:15 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:17 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:20 · Ana: Avonlea, junto a la casa parroquial · sentada
17:20 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
17:20 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:23 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:25 · Ana: Avonlea, junto a la casa parroquial · sentada
17:25 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
17:26 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:29 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:30 · Ana: Avonlea, junto a la casa parroquial · sentada
17:30 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
17:31 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:33 Ana dice: «¡Oh, Sra. Allan! Usted es mi espíritu afín.»
17:34 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:35 · Ana: Avonlea, junto a la casa parroquial · sentada
17:35 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
17:37 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:40 · Ana: Avonlea, junto a la casa parroquial · sentada
17:40 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
17:40 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:43 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:45 · Ana: Avonlea, junto a la casa parroquial · sentada
17:45 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
17:45 Ana echa a andar.
17:45 Ana se queda de pie.
17:46 la Sra. Allan echa a andar.
17:46 Ana echa a andar.
17:46 la Sra. Allan se queda de pie.
```
</details>

## Peg Bowen junta hierbas (meta 15: cumplida)

**Lo que debería pasar:** Peg Bowen anda por el bosque. Se agacha aquí y allá a juntar hierbas, varias veces, y se las lleva.

- ✔ Se agacha a juntar hierbas. — 10:01, 10 min
- ✔ Tiene las hierbas. — 10:11, hasta el final

<details><summary>Lo que el juego cuenta que pasó (17 líneas)</summary>

```
10:00 Al empezar, Peg Bowen va por Avonlea, junto a camino de el granero.
10:00 · Peg Bowen: Avonlea, junto a camino de el granero · caminando
10:01 Peg Bowen se queda de pie.
10:01 Peg Bowen echa a andar; empieza: recoger hierbas.
10:01 Peg Bowen se agacha; con el canastito.
10:04 Peg Bowen se queda de pie.
10:04 Peg Bowen echa a andar.
10:05 · Peg Bowen: Avonlea, junto a camino de el granero · caminando · recoger hierbas
10:05 Peg Bowen se agacha; con el canastito.
10:08 Peg Bowen se queda de pie.
10:08 Peg Bowen echa a andar.
10:08 Peg Bowen está en Avonlea, junto a camino de el corral de Tejas Verdes; con el canastito.
10:10 · Peg Bowen: Avonlea, junto a camino de el corral de Tejas Verdes · agachada · recoger hierbas · con el canastito
10:11 Peg Bowen se queda de pie; termina lo que hacía; ahora tiene 3 hierbas.
10:11 Peg Bowen está en Avonlea, junto a camino de el granero.
10:12 Peg Bowen echa a andar.
10:12 Peg Bowen se queda de pie.
```
</details>

## La compota para la Sra. Barry (meta 17: cumplida)

**Lo que debería pasar:** La Sra. Barry quiere compota y se la pide a Diana; Diana se la pide a Ana. Ana la consigue y se la lleva a la Sra. Barry.

- ✔ Ana le da la compota. — 11:40, 0 min
- ✔ La Sra. Barry tiene la compota. — 11:41, hasta el final

<details><summary>Lo que el juego cuenta que pasó (95 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 Al empezar, Sra. Barry está en la salita de La Cuesta del Huerto.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 · Sra. Barry: la salita de La Cuesta del Huerto · de pie
10:00 Sra. Barry echa a andar.
10:00 Sra. Barry va por Avonlea, junto a La Cuesta del Huerto.
10:00 Sra. Barry se queda de pie.
10:00 Sra. Barry dice: «¿Me traerías 1 compota de manzana?»
10:01 Ana se sienta.
10:02 Ana dice: «¡Qué día para hacer algo bonito!»
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
10:15 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
10:15 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:20 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
10:20 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:25 · Ana: Avonlea, junto a camino de La Cuesta del Huerto · caminando
10:25 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:26 Ana está en Avonlea, junto a La Cuesta del Huerto.
10:26 Ana echa a andar; empieza: recoger manzanas.
10:27 Ana se queda de pie; con el canastito.
10:28 Ana se sienta.
10:30 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · recoger manzanas · con el canastito
10:30 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:32 Ana echa a andar.
10:32 Ana se queda de pie; con el canastito.
10:34 Ana se sienta.
10:35 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · recoger manzanas · con el canastito
10:35 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:37 Ana termina lo que hacía; ahora tiene 3 manzanas.
10:37 Ana echa a andar.
10:40 · Ana: Avonlea, junto a camino de el puente del arroyo · caminando
10:40 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:45 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
10:45 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:49 Ana está en la cocina de Tejas Verdes, junto a la puerta.
10:49 Ana echa a andar.
10:50 · Ana: la cocina de Tejas Verdes · caminando
10:50 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
10:50 Ana está en la cocina de Tejas Verdes.
10:50 Ana echa a andar; empieza: cocinar compota.
10:50 Ana está en la cocina de Tejas Verdes, junto a la estufa; con el bol.
10:55 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
10:55 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:00 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:00 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:05 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:05 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:10 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:10 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:15 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:15 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:20 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
11:20 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:20 Ana termina lo que hacía; ahora tiene 1 compota.
11:20 Ana está en Avonlea, junto a Tejas Verdes.
11:20 Ana echa a andar.
11:25 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
11:25 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:30 · Ana: Avonlea, junto a camino de el puente del arroyo · caminando
11:30 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:32 Ana está en Avonlea, junto a La Cuesta del Huerto.
11:32 Ana dice: «¡Buenos días, Minnie May Barry!»
11:33 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
11:33 Ana se sienta.
11:35 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada
11:35 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:35 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
11:37 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
11:38 Ana dice: «Bueno, me voy, que tengo que darle 1 compota de manzana a Diana.»
11:39 Ana echa a andar.
11:40 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
11:40 · Sra. Barry: Avonlea, junto a La Cuesta del Huerto · de pie
11:40 Ana se queda de pie; empieza: dar compota; con lo que entrega.
11:40 Ana termina lo que hacía; ya no tiene nada.
11:40 Ana echa a andar.
11:40 Ana se queda de pie.
11:41 Sra. Barry ahora tiene 1 compota.
11:41 Sra. Barry dice: «Gracias.»
11:41 Ana echa a andar.
11:41 Sra. Barry va por Avonlea, junto a camino de .
11:42 Ana se queda de pie.
11:43 Ana echa a andar.
11:43 Ana se queda de pie.
11:43 Ana se acuesta.
11:43 Ana dice: «Qué bien se está en el pasto. Se oyen las abejas y, si me callo un momento, hasta el crecer de las flores.»
```
</details>

## Ordeñar y llevar la leche (meta 27: cumplida)

**Lo que debería pasar:** Matthew va al corral, se sienta en el banquito junto a la vaca y la ordeña en el balde, sin apuro, un cuarto de hora. Lleva la leche a la cocina y se la da a Marilla.

- ✔ Ordeña sentado junto a la vaca, con el balde, un cuarto de hora. — 09:01, 15 min
- ✔ Tiene la leche. — 09:16, 2 min
- ✔ Se la da a Marilla en la cocina. — 09:18, 0 min
- ✔ Marilla tiene la leche. — 09:18, hasta el final

<details><summary>Lo que el juego cuenta que pasó (25 líneas)</summary>

```
09:00 Al empezar, Matthew va por Avonlea, junto al granero; ahora tiene 5 dolares.
09:00 Al empezar, Marilla está en la cocina de Tejas Verdes.
09:00 · Matthew: Avonlea, junto al granero · caminando
09:00 · Marilla: la cocina de Tejas Verdes · sentada
09:00 Marilla se queda de pie.
09:01 Matthew está en Avonlea, junto a la entrada del corral de Tejas Verdes.
09:01 Matthew echa a andar; empieza: ordeñar.
09:01 Matthew dice: «Tranquila, Dolly… ya está, ya está.»
09:01 Matthew está en Avonlea, junto al corral de Tejas Verdes; con el balde.
09:05 · Matthew: Avonlea, junto al corral de Tejas Verdes · sentada · ordeñar · con el balde
09:05 · Marilla: la cocina de Tejas Verdes · de pie
09:10 · Matthew: Avonlea, junto al corral de Tejas Verdes · sentada · ordeñar · con el balde
09:10 · Marilla: la cocina de Tejas Verdes · de pie
09:15 · Matthew: Avonlea, junto al corral de Tejas Verdes · sentada · ordeñar · con el balde
09:15 · Marilla: la cocina de Tejas Verdes · de pie
09:16 Matthew se queda de pie; termina lo que hacía; ahora tiene 5 dolares, 2 leche.
09:16 Matthew echa a andar.
09:18 Matthew va por la cocina de Tejas Verdes, junto a la puerta.
09:18 Matthew está en la cocina de Tejas Verdes; empieza: dar leche; con lo que entrega.
09:18 Matthew está en Avonlea, junto a Tejas Verdes; termina lo que hacía; ahora tiene 5 dolares.
09:18 Marilla ahora tiene 2 leche.
09:18 Marilla dice: «Gracias.»
09:19 Matthew echa a andar.
09:20 · Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · caminando
09:20 · Marilla: la cocina de Tejas Verdes · de pie
```
</details>

## Matthew da de comer a los animales (meta 28: cumplida)

**Lo que debería pasar:** Matthew lleva el grano al corral y lo va echando, en un lado y en otro, mientras los animales se acercan.

- ✔ Echa el grano en el corral. — 08:00, 8 min

<details><summary>Lo que el juego cuenta que pasó (20 líneas)</summary>

```
08:00 Al empezar, Matthew va por Avonlea, junto al granero; ahora tiene 5 dolares.
08:00 · Matthew: Avonlea, junto al granero · caminando
08:00 Matthew se queda de pie.
08:00 Matthew empieza: alimentar; con el grano.
08:05 · Matthew: Avonlea, junto al granero · de pie · alimentar · con el grano
08:08 Matthew termina lo que hacía.
08:08 Matthew echa a andar.
08:09 Matthew está en Avonlea, junto a la entrada del corral de Tejas Verdes.
08:09 Matthew echa a andar; empieza: alimentar.
08:09 Matthew está en Avonlea, junto al corral de Tejas Verdes.
08:10 · Matthew: Avonlea, junto al corral de Tejas Verdes · de pie · alimentar
08:11 Matthew con el grano.
08:15 · Matthew: Avonlea, junto al corral de Tejas Verdes · de pie · alimentar · con el grano
08:15 Matthew echa a andar.
08:15 Matthew se queda de pie.
08:17 Matthew con el grano.
08:20 · Matthew: Avonlea, junto al corral de Tejas Verdes · de pie · alimentar · con el grano
08:21 Matthew echa a andar; termina lo que hacía.
08:22 Matthew está en la cocina de Tejas Verdes, junto a la puerta.
08:22 Matthew está en la cocina de Tejas Verdes.
```
</details>

## Visita a la Sra. Lynde (meta 29: cumplida)

**Lo que debería pasar:** Ana va a la casa de la Sra. Lynde. Se sienta con ella y conversan con una taza de té, una media hora.

- ✔ Llega a la casa de la Sra. Lynde. — 15:09, 56 min
- ✔ Se sienta a tomar el té y conversar, una media hora. — 15:10, 55 min

<details><summary>Lo que el juego cuenta que pasó (168 líneas)</summary>

```
15:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
15:00 Al empezar, Sra. Lynde va por la casa de la Sra. Lynde.
15:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
15:00 · Sra. Lynde: la casa de la Sra. Lynde · caminando
15:00 Ana echa a andar.
15:00 Ana se queda de pie.
15:01 Ana se sienta.
15:01 Ana echa a andar.
15:05 · Ana: Avonlea, junto a camino de la huerta de Tejas Verdes · caminando
15:05 · Sra. Lynde: la casa de la Sra. Lynde · caminando
15:09 Ana está en la casa de la Sra. Lynde.
15:09 Sra. Lynde se queda de pie.
15:09 Ana echa a andar.
15:09 Sra. Lynde dice: «Ana Shirley, hablas más que un molino... pero tienes buen corazón, eso lo reconozco.»
15:09 Ana empieza: visitar.
15:09 Ana dice: «Buenas tardes, Sra. Lynde. Vine a visitarla.»
15:10 · Ana: la casa de la Sra. Lynde · caminando · visitar
15:10 · Sra. Lynde: la casa de la Sra. Lynde · de pie
15:10 Ana se queda de pie.
15:10 Ana echa a andar.
15:10 Ana se sienta; con el té.
15:11 Sra. Lynde echa a andar.
15:11 Sra. Lynde se queda de pie.
15:12 Sra. Lynde echa a andar.
15:13 Ana echa a andar.
15:13 Ana se sienta.
15:13 Ana echa a andar.
15:13 Ana se sienta.
15:13 Ana echa a andar.
15:13 Ana se sienta.
15:13 Ana echa a andar.
15:13 Ana se sienta.
15:13 Ana echa a andar.
15:13 Ana se sienta.
15:13 Ana echa a andar.
15:13 Ana se sienta.
15:13 Ana echa a andar.
15:13 Ana se sienta.
15:13 Ana echa a andar.
15:13 Ana se sienta.
15:13 Ana echa a andar.
15:13 Ana se sienta.
15:13 Sra. Lynde se queda de pie.
15:15 · Ana: la casa de la Sra. Lynde · sentada · visitar · con el té
15:15 · Sra. Lynde: la casa de la Sra. Lynde · de pie
15:16 Sra. Lynde echa a andar.
15:17 Sra. Lynde se queda de pie.
15:18 Sra. Lynde echa a andar.
15:19 Ana echa a andar.
15:19 Ana se sienta.
15:19 Ana echa a andar.
15:19 Ana se sienta.
15:19 Ana echa a andar.
15:19 Ana se sienta.
15:19 Ana echa a andar.
15:19 Ana se sienta.
15:19 Ana echa a andar.
15:19 Ana se sienta.
15:19 Ana echa a andar.
15:19 Ana se sienta.
15:19 Ana echa a andar.
15:19 Ana se sienta.
15:19 Ana echa a andar.
15:19 Ana se sienta.
15:19 Ana echa a andar.
15:19 Ana se sienta.
15:19 Sra. Lynde se queda de pie.
15:20 · Ana: la casa de la Sra. Lynde · sentada · visitar · con el té
15:20 · Sra. Lynde: la casa de la Sra. Lynde · de pie
15:25 · Ana: la casa de la Sra. Lynde · sentada · visitar · con el té
15:25 · Sra. Lynde: la casa de la Sra. Lynde · de pie
15:25 Sra. Lynde echa a andar.
15:25 Ana echa a andar.
15:25 Sra. Lynde se queda de pie.
15:25 Ana se sienta.
15:26 Sra. Lynde echa a andar.
15:27 Ana echa a andar.
15:27 Sra. Lynde se queda de pie.
15:27 Ana se sienta.
15:28 Sra. Lynde echa a andar.
15:28 Ana echa a andar.
15:28 Sra. Lynde se queda de pie.
15:28 Ana se sienta.
15:30 · Ana: la casa de la Sra. Lynde · sentada · visitar · con el té
15:30 · Sra. Lynde: la casa de la Sra. Lynde · de pie
15:30 Sra. Lynde echa a andar.
15:30 Ana echa a andar.
15:30 Sra. Lynde se queda de pie.
15:30 Ana se sienta.
15:31 Sra. Lynde echa a andar.
15:32 Ana echa a andar.
15:32 Sra. Lynde se queda de pie.
15:32 Ana se sienta.
15:33 Sra. Lynde dice: «Marilla hizo bien en quedarse contigo, y lo digo yo, que nunca me callo lo que pienso.»
15:34 Sra. Lynde echa a andar.
15:35 · Ana: la casa de la Sra. Lynde · sentada · visitar · con el té
15:35 · Sra. Lynde: la casa de la Sra. Lynde · caminando
15:35 Ana echa a andar.
15:35 Ana dice: «Buenas tardes, Sra. Lynde. Vine a visitarla.»
15:35 Ana se sienta; con el té.
15:35 Ana echa a andar.
15:35 Ana se sienta.
15:35 Ana echa a andar.
15:35 Ana se sienta.
15:35 Ana echa a andar.
15:35 Ana se sienta.
15:35 Ana echa a andar.
15:35 Ana se sienta.
15:35 Ana echa a andar.
15:35 Sra. Lynde se queda de pie.
15:35 Ana se sienta.
15:39 Sra. Lynde echa a andar.
15:40 · Ana: la casa de la Sra. Lynde · sentada · visitar · con el té
15:40 · Sra. Lynde: la casa de la Sra. Lynde · caminando
15:40 Ana echa a andar.
15:40 Sra. Lynde se queda de pie.
15:40 Ana se sienta.
15:41 Sra. Lynde echa a andar.
15:42 Sra. Lynde se queda de pie.
15:45 · Ana: la casa de la Sra. Lynde · sentada · visitar · con el té
15:45 · Sra. Lynde: la casa de la Sra. Lynde · de pie
15:45 Sra. Lynde echa a andar.
15:45 Ana echa a andar.
15:45 Sra. Lynde se queda de pie.
15:45 Ana se sienta.
15:46 Sra. Lynde echa a andar.
15:47 Ana echa a andar.
15:47 Sra. Lynde se queda de pie.
15:47 Ana se sienta.
15:49 Sra. Lynde echa a andar.
15:50 · Ana: la casa de la Sra. Lynde · sentada · visitar · con el té
15:50 · Sra. Lynde: la casa de la Sra. Lynde · caminando
15:50 Ana echa a andar.
15:50 Sra. Lynde se queda de pie.
15:50 Ana se sienta.
15:51 Sra. Lynde echa a andar.
15:51 Sra. Lynde se queda de pie.
15:52 Sra. Lynde echa a andar.
15:53 Ana echa a andar.
15:53 Sra. Lynde se queda de pie.
15:53 Ana se sienta.
15:54 Sra. Lynde echa a andar.
15:54 Ana echa a andar.
15:54 Sra. Lynde se queda de pie.
15:54 Ana se sienta.
15:55 · Ana: la casa de la Sra. Lynde · sentada · visitar · con el té
15:55 · Sra. Lynde: la casa de la Sra. Lynde · de pie
15:56 Sra. Lynde dice: «Marilla hizo bien en quedarse contigo, y lo digo yo, que nunca me callo lo que pienso.»
15:59 Sra. Lynde echa a andar.
16:00 · Ana: la casa de la Sra. Lynde · sentada · visitar · con el té
16:00 · Sra. Lynde: la casa de la Sra. Lynde · caminando
16:00 Ana echa a andar.
16:00 Sra. Lynde se queda de pie.
16:00 Ana se sienta.
16:02 Sra. Lynde echa a andar.
16:02 Sra. Lynde se queda de pie.
16:04 Sra. Lynde echa a andar.
16:04 Sra. Lynde se queda de pie.
16:05 · Ana: la casa de la Sra. Lynde · sentada · visitar · con el té
16:05 · Sra. Lynde: la casa de la Sra. Lynde · de pie
16:05 Sra. Lynde echa a andar.
16:05 Ana se queda de pie; termina lo que hacía.
16:05 Sra. Lynde dice: «¡Pasa, pasa! Siéntate, que pongo la tetera.»
16:05 Ana echa a andar.
16:05 Ana está en Avonlea, junto a la casa de la Sra. Lynde.
16:05 Sra. Lynde va por Avonlea, junto a la casa de la Sra. Lynde.
16:05 Ana echa a andar.
16:07 Ana se queda de pie.
```
</details>

## Devolverle el libro a Diana (meta 31: cumplida)

**Lo que debería pasar:** Ana lleva el libro que le prestaron a la casa de Diana y se lo devuelve en sus manos.

- ✔ Le devuelve el libro a Diana. — 12:16, 2 min
- ✔ Ya no tiene el libro. — 12:17, hasta el final

<details><summary>Lo que el juego cuenta que pasó (17 líneas)</summary>

```
12:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes; ahora tiene 1 libro.
12:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
12:00 Ana echa a andar.
12:04 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
12:05 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
12:10 · Ana: Avonlea, junto al puente del arroyo · caminando
12:13 Ana dice: «¡Diana! ¡Espera!»
12:15 · Ana: Avonlea, junto a camino de La Cuesta del Huerto · caminando
12:16 Ana está en Avonlea, junto a La Cuesta del Huerto; empieza: devolver libro; con lo que entrega.
12:16 Ana dice: «Aquí tienes tu libro. ¡Me encantó! Lo leí dos veces.»
12:16 Ana echa a andar.
12:16 Ana se queda de pie.
12:16 Ana echa a andar.
12:17 Ana se queda de pie.
12:17 Ana termina lo que hacía; ya no tiene nada.
12:17 Ana dice: «Se me ocurrió una idea... ¡de esas que solo tengo yo!»
12:17 Ana echa a andar.
```
</details>

## Amigas del alma (meta 32: cumplida)

**Lo que debería pasar:** Ana y Diana, en el jardín de los Barry, se ponen frente a frente, se toman de las manos y juran ser amigas del alma para siempre.

- ✔ Ana jura tomada de las manos. — 11:28, 3 min
- ✔ Diana está con ella, en el jardín de los Barry. — 11:30, hasta el final

<details><summary>Lo que el juego cuenta que pasó (71 líneas)</summary>

```
11:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
11:00 Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene 1 libro.
11:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
11:00 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:00 Ana echa a andar.
11:00 Diana echa a andar.
11:00 Diana se queda de pie.
11:01 Diana echa a andar.
11:02 Diana se queda de pie.
11:03 Diana echa a andar.
11:04 Diana se queda de pie.
11:04 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
11:05 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
11:05 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:05 Diana echa a andar.
11:06 Diana se queda de pie.
11:07 Diana echa a andar.
11:07 Diana se queda de pie.
11:08 Diana echa a andar.
11:09 Diana se queda de pie.
11:09 Diana echa a andar.
11:10 · Ana: Avonlea, junto al puente del arroyo · caminando
11:10 · Diana: Avonlea, junto a La Cuesta del Huerto · caminando
11:10 Diana se queda de pie.
11:11 Diana echa a andar.
11:12 Ana está en Avonlea, junto al puente del arroyo.
11:12 Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»
11:12 Diana se queda de pie.
11:13 Ana echa a andar.
11:14 Diana echa a andar.
11:15 · Ana: Avonlea, junto a camino de el puente del arroyo · caminando
11:15 · Diana: Avonlea, junto a La Cuesta del Huerto · caminando
11:15 Diana se queda de pie.
11:15 Diana echa a andar.
11:15 Ana dice: «¡Diana! ¡Espera!»
11:15 Diana se queda de pie.
11:16 Diana dice: «¿Qué pasa?»
11:17 Ana empieza: jurar.
11:17 Ana dice: «Juro solemnemente ser fiel a mi amiga del alma, Diana, mientras duren el sol y la luna.»
11:18 Diana echa a andar.
11:19 Diana dice: «¡Ana, mi alma gemela! Te estaba esperando.»
11:19 Ana se queda de pie.
11:20 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie · jurar
11:20 · Diana: Avonlea, junto a La Cuesta del Huerto · caminando
11:20 Ana dice: «¡Buenos días, Minnie May Barry!»
11:20 Diana se queda de pie.
11:21 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
11:21 Diana echa a andar.
11:21 Ana se sienta.
11:22 Diana se queda de pie.
11:22 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
11:23 Diana echa a andar.
11:24 Diana se queda de pie.
11:24 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
11:25 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · jurar
11:25 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:26 Diana echa a andar.
11:26 Ana dice: «Bueno, me voy, que tengo que jurar ser amigas del alma con Diana.»
11:27 Diana se queda de pie.
11:27 Ana echa a andar.
11:28 Diana echa a andar.
11:28 Ana se queda de pie; con las manos.
11:30 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie · jurar · con las manos
11:30 · Diana: Avonlea, junto a La Cuesta del Huerto · caminando
11:30 Ana se sienta.
11:31 Ana termina lo que hacía.
11:31 Diana dice: «Juro ser fiel a mi amiga del alma, Ana, mientras duren el sol y la luna.»
11:31 Ana echa a andar.
11:31 Ana está en la salita de La Cuesta del Huerto.
11:31 Ana echa a andar.
11:32 Ana se queda de pie.
```
</details>

## Cuidar al Sr. Harrison (meta 34: cumplida)

**Lo que debería pasar:** El Sr. Harrison está enfermo, en cama. Ana saca el jarabe de ipecacuana del aparador de la cocina, va a su casa y, junto a la cama, se lo da a cucharadas.

- ✔ El Sr. Harrison está en cama. — 11:00, 10 min
- ✔ Saca el jarabe del aparador. — 11:01, 1 min
- ✔ Tiene el jarabe. — 11:02, 8 min
- ✔ Se lo da en su casa. — 11:09, 1 min

<details><summary>Lo que el juego cuenta que pasó (33 líneas)</summary>

```
11:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
11:00 Al empezar, Sr. Harrison está en la casa del Sr. Harrison; ahora tiene 1 cuerda.
11:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
11:00 · Sr. Harrison: la casa del Sr. Harrison · de pie
11:00 Ana echa a andar.
11:00 Sr. Harrison está en cama.
11:00 Ana está en la cocina de Tejas Verdes, junto a la puerta.
11:00 Ana echa a andar.
11:00 Ana está en la cocina de Tejas Verdes.
11:00 Ana echa a andar; empieza: tomar jarabe.
11:01 Ana se queda de pie; con el aparador abierto.
11:01 Ana está en la cocina de Tejas Verdes, junto al aparador.
11:02 Ana termina lo que hacía; ahora tiene 1 jarabe.
11:02 Ana está en Avonlea, junto a Tejas Verdes.
11:02 Ana echa a andar.
11:05 · Ana: Avonlea, junto a camino de el campo de avena del Sr. Harrison · caminando
11:05 · Sr. Harrison: la casa del Sr. Harrison · acostada, en cama
11:08 Ana está en la casa del Sr. Harrison.
11:08 Ana echa a andar.
11:09 Sr. Harrison dice: «Hmpf. Buenos días... si es que son buenos.»
11:09 Ana se queda de pie; empieza: cuidar; con el jarabe.
11:09 Ana dice: «Una cucharadita de jarabe de ipecacuana… y otra más. Ya va a pasar.»
11:10 · Ana: la casa del Sr. Harrison · de pie · cuidar · con el jarabe
11:10 · Sr. Harrison: la casa del Sr. Harrison · acostada, en cama
11:10 Ana termina lo que hacía; ya no tiene nada.
11:10 Sr. Harrison echa a andar.
11:10 Sr. Harrison dice: «Ya me siento mucho mejor. Gracias, niña.»
11:10 Ana echa a andar.
11:10 Ana está en Avonlea, junto a la granja del Sr. Harrison.
11:10 Sr. Harrison está en Avonlea, junto a la granja del Sr. Harrison.
11:10 Ana echa a andar.
11:10 Sr. Harrison echa a andar.
11:11 Ana se queda de pie.
```
</details>

## Estudiar y recitar la lección (meta 36: cumplida)

**Lo que debería pasar:** Ana estudia la lección sentada a la mesa, con el libro abierto, un buen rato. En la escuela se pone frente a la clase, junto a la pizarra, y la recita.

- ✔ Estudia sentada con el libro, un buen rato. — 09:01, 40 min
- ✔ Recita frente a la clase. — 10:06, 13 min

<details><summary>Lo que el juego cuenta que pasó (50 líneas)</summary>

```
09:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
09:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
09:00 Ana echa a andar.
09:00 Ana está en la cocina de Tejas Verdes, junto a la puerta.
09:00 Ana echa a andar.
09:00 Ana está en la cocina de Tejas Verdes.
09:00 Ana echa a andar; empieza: estudiar.
09:00 Ana dice: ««El cuadrado de la hipotenusa es igual…» Repaso y repaso.»
09:01 Ana está en la cocina de Tejas Verdes, junto a la silla de la ventana; con un libro sobre la mesa.
09:05 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar · con un libro sobre la mesa
09:10 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar · con un libro sobre la mesa
09:15 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar · con un libro sobre la mesa
09:20 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar · con un libro sobre la mesa
09:25 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar · con un libro sobre la mesa
09:30 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar · con un libro sobre la mesa
09:35 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar · con un libro sobre la mesa
09:40 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar · con un libro sobre la mesa
09:41 Ana se queda de pie; termina lo que hacía.
09:41 Ana está en Avonlea, junto a Tejas Verdes.
09:41 Ana echa a andar.
09:41 Ana se queda de pie.
09:41 Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»
09:43 Ana se sienta.
09:43 Ana echa a andar.
09:45 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
09:50 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
09:55 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
09:56 Ana está en Avonlea, junto a camino de la escuela.
09:58 Ana se sienta.
09:59 Ana echa a andar.
10:00 · Ana: Avonlea, junto a camino de la escuela · caminando
10:05 · Ana: Avonlea, junto a camino de la escuela · caminando
10:06 Ana está en Avonlea, junto a la escuela.
10:06 Ana echa a andar; empieza: recitar.
10:06 Ana dice: ««Y a lo largo del río, en su barca, iba la doncella de Shalott…»»
10:06 Ana está en La escuela.
10:06 Ana echa a andar.
10:06 Ana se queda de pie.
10:06 Ana dice: «¡Buenos días, Tillie Boulter!»
10:07 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
10:09 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
10:10 · Ana: La escuela · de pie · recitar
10:11 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
10:12 Ana dice: «Bueno, me voy, que tengo que recitar la lección.»
10:13 Ana echa a andar.
10:14 Ana se queda de pie; con el gesto de recitar.
10:15 · Ana: La escuela · de pie · recitar · con el gesto de recitar
10:19 Ana termina lo que hacía.
10:19 Ana dice: «¡Mi nombre escrito en la pizarra, por portarme mal! Pero con «a» al final, como debe ser: Ana.»
10:20 · Ana: La escuela · de pie
```
</details>

## Las oraciones (meta 37: cumplida)

**Lo que debería pasar:** Ana sube a su pieza, se arrodilla junto a la cama y dice sus oraciones, unos minutos.

- ✔ Reza junto a la cama de su pieza. — 20:02, 5 min

<details><summary>Lo que el juego cuenta que pasó (17 líneas)</summary>

```
20:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
20:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
20:00 Ana echa a andar.
20:00 Ana está en la cocina de Tejas Verdes, junto a la puerta.
20:00 Ana echa a andar.
20:00 Ana está en la cocina de Tejas Verdes.
20:00 Ana echa a andar; empieza: rezar.
20:00 Ana dice: «Querido Padre celestial: gracias por el Camino Blanco de las Delicias y por el Lago de las Aguas Brillantes…»
20:02 Ana está en la pieza de Ana.
20:02 Ana echa a andar.
20:02 Ana está en la pieza de Ana, junto a la cama; con las manos juntas.
20:05 · Ana: la pieza de Ana, junto a la cama · sentada · rezar · con las manos juntas
20:07 Ana se queda de pie; termina lo que hacía.
20:07 Ana echa a andar.
20:08 Ana está en la cocina de Tejas Verdes, junto a la escalera.
20:08 Ana echa a andar.
20:09 Ana está en la cocina de Tejas Verdes, junto a la puerta.
```
</details>

## El vestido de mangas abullonadas (meta 38: cumplida)

**Lo que debería pasar:** Marilla quiere coserle un vestido a Ana. Le traen la tela de la tienda. Marilla se sienta junto a la ventana de la cocina y cose, sin apuro, un buen rato, hasta que el vestido está listo.

- ✔ Marilla tiene la tela. — 10:32, 41 min
- ✔ Cose sentada junto a la ventana, un buen rato. — 10:33, 40 min
- ✔ El vestido está listo. — 11:13, hasta el final

<details><summary>Lo que el juego cuenta que pasó (86 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 Al empezar, Marilla está en la cocina de Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 · Marilla: la cocina de Tejas Verdes · sentada
10:00 Marilla está en Avonlea, junto a Tejas Verdes.
10:00 Marilla echa a andar.
10:00 Marilla se queda de pie.
10:00 Marilla dice: «¿Me traerías 1 corte de tela?»
10:00 Ana echa a andar.
10:00 Marilla está en la cocina de Tejas Verdes, junto a la puerta.
10:05 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:05 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:10 · Ana: Avonlea, junto a camino de la escuela · caminando
10:10 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:15 · Ana: Avonlea, junto a la tienda de Lawson · caminando
10:15 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:15 Ana está en Tienda de Lawson.
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
10:32 Ana está en la cocina de Tejas Verdes, junto a la puerta.
10:32 Ana empieza: dar tela; con lo que entrega.
10:32 Marilla dice: «Matthew no lo dice, pero te echa de menos cuando te vas donde Diana.»
10:32 Ana termina lo que hacía; ya no tiene nada.
10:32 Marilla ahora tiene 1 tela.
10:32 Marilla dice: «Gracias.»
10:32 Marilla echa a andar; empieza: coser vestido.
10:32 Marilla dice: «Coso el vestido… y le pongo unas mangas abullonadas, como las que usan ahora.»
10:33 Ana está en Avonlea, junto a Tejas Verdes.
10:33 Ana echa a andar.
10:33 Marilla está en la cocina de Tejas Verdes, junto a la silla de la ventana; con la costura.
10:35 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
10:35 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser vestido · con la costura
10:35 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
10:36 Ana echa a andar.
10:37 Ana está en Avonlea, junto a camino de la huerta de Tejas Verdes.
10:38 Ana echa a andar.
10:39 Ana está en Avonlea, junto al Camino Blanco de las Delicias.
10:40 · Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie
10:40 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser vestido · con la costura
10:40 Ana echa a andar.
10:40 Ana se queda de pie.
10:41 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
10:42 Ana echa a andar.
10:43 Ana se queda de pie.
10:44 Ana echa a andar.
10:45 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
10:45 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser vestido · con la costura
10:46 Ana está en Avonlea, junto al Bosque Encantado.
10:47 Ana echa a andar.
10:47 Ana se queda de pie.
10:49 Ana se sienta.
10:50 · Ana: Avonlea, junto al Bosque Encantado · sentada
10:50 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser vestido · con la costura
10:55 · Ana: Avonlea, junto al Bosque Encantado · sentada
10:55 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser vestido · con la costura
11:00 · Ana: Avonlea, junto al Bosque Encantado · sentada
11:00 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser vestido · con la costura
11:01 Ana echa a andar.
11:01 Ana se queda de pie.
11:01 Ana echa a andar.
11:04 Ana está en Avonlea, junto a camino de el Bosque Encantado.
11:05 · Ana: Avonlea, junto a camino de el Bosque Encantado · de pie
11:05 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser vestido · con la costura
11:05 Ana echa a andar.
11:06 Ana está en Avonlea, junto al puente del arroyo.
11:07 Ana echa a andar.
11:09 Ana se queda de pie.
11:10 · Ana: Avonlea, junto al puente del arroyo · de pie
11:10 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser vestido · con la costura
11:10 Ana echa a andar.
11:11 Ana está en Avonlea, junto a camino de el puente del arroyo.
11:12 Ana echa a andar.
11:13 Marilla está en la cocina de Tejas Verdes; termina lo que hacía; ahora tiene 1 vestido.
11:15 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
11:15 · Marilla: la cocina de Tejas Verdes · de pie
11:15 Ana está en Avonlea, junto a La Cuesta del Huerto.
```
</details>

## El sombrero con flores (meta 39: cumplida)

**Lo que debería pasar:** Ana corta flores en la huerta y se adorna el sombrero con ellas, con cuidado, unos minutos.

- ✔ Corta flores. — 10:03, 3 min
- ✔ Se adorna el sombrero. — 10:07, 10 min

<details><summary>Lo que el juego cuenta que pasó (25 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 Ana echa a andar.
10:00 Ana se queda de pie.
10:00 Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»
10:01 Ana se sienta.
10:02 Ana echa a andar.
10:03 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
10:03 Ana echa a andar; empieza: recoger ramo.
10:04 Ana se agacha; con el canastito.
10:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · agachada · recoger ramo · con el canastito
10:05 Ana se sienta.
10:07 Ana termina lo que hacía; ahora tiene 1 ramo.
10:07 Ana echa a andar.
10:07 Ana se queda de pie.
10:07 Ana empieza: adornar; con el sombrero con flores.
10:07 Ana dice: «¡Una corona de ranúnculos y rosas silvestres para mi sombrero!»
10:09 Ana se sienta.
10:10 · Ana: Avonlea, junto a la huerta de Tejas Verdes · sentada · adornar · con el sombrero con flores
10:15 · Ana: Avonlea, junto a la huerta de Tejas Verdes · sentada · adornar · con el sombrero con flores
10:17 Ana termina lo que hacía; ya no tiene nada.
10:17 Ana dice: «Mi imaginación no me deja quieta.»
10:17 Ana echa a andar.
10:17 Ana se queda de pie; ahora tiene 1 ramo.
10:19 Ana se sienta.
```
</details>

## Remar en el lago (meta 40: cumplida)

**Lo que debería pasar:** Ana sube al bote en el Lago de las Aguas Brillantes y rema, sentada, sin apuro, un buen rato.

- ✔ Rema sentada en el bote, un buen rato. — 14:18, 30 min

<details><summary>Lo que el juego cuenta que pasó (23 líneas)</summary>

```
14:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
14:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
14:00 Ana echa a andar.
14:05 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
14:10 · Ana: Avonlea, junto a camino de el puente del arroyo · caminando
14:11 Ana está en Avonlea, junto a camino de el Camino Blanco de las Delicias.
14:11 Ana dice: «El agua tiene hoy un color de perla... ¿o de ópalo?»
14:13 Ana se sienta.
14:14 Ana echa a andar.
14:15 · Ana: Avonlea, junto a camino de el Lago de las Aguas Brillantes · caminando
14:18 Ana está en Avonlea, junto al Lago de las Aguas Brillantes.
14:18 Ana se sienta; empieza: remar; con el bote.
14:18 Ana dice: «¡Remo en el bote de los Barry! Hay que tener cuidado de no soltar los remos…»
14:20 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar · con el bote
14:25 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar · con el bote
14:30 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar · con el bote
14:35 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar · con el bote
14:40 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar · con el bote
14:45 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar · con el bote
14:48 Ana termina lo que hacía.
14:48 Ana echa a andar.
14:50 · Ana: Avonlea, junto a camino de el Lago de las Aguas Brillantes · caminando
14:50 Ana está en Avonlea, junto a camino de el Lago de las Aguas Brillantes.
```
</details>

## Ponerle nombre a los lugares (meta 41: cumplida)

**Lo que debería pasar:** Ana se detiene en un lugar que le gusta, lo mira y le pone un nombre bonito en voz alta.

- ✔ Se detiene y le pone nombre a un lugar. — 10:03, 2 min

<details><summary>Lo que el juego cuenta que pasó (32 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 Ana echa a andar.
10:00 Ana se queda de pie.
10:00 Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»
10:01 Ana se sienta.
10:02 Ana echa a andar.
10:03 Ana se queda de pie.
10:03 Ana empieza: nombrar; con el gesto de recitar.
10:03 Ana dice: «Este lugar se va a llamar el Sendero de los Abedules. ¿No es un nombre precioso?»
10:05 · Ana: Avonlea, junto a Tejas Verdes · de pie · nombrar · con el gesto de recitar
10:05 Ana se sienta.
10:05 Ana termina lo que hacía.
10:05 Ana echa a andar.
10:06 Ana está en Avonlea, junto a la entrada del corral de Tejas Verdes.
10:06 Ana empieza: nombrar; con el gesto de recitar.
10:06 Ana dice: «Este lugar se va a llamar Idlewild. ¿No es un nombre precioso?»
10:08 Ana se sienta.
10:08 Ana termina lo que hacía.
10:08 Ana echa a andar.
10:08 Ana se queda de pie.
10:08 Ana dice: «¡Hola, pequeño! ¿Cómo te llamas? Yo te diré Lord Fitzgerald.»
10:10 · Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · de pie
10:10 Ana se sienta.
10:10 Ana echa a andar.
10:12 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
10:12 Ana empieza: nombrar; con el gesto de recitar.
10:12 Ana dice: «Este lugar se va a llamar el Valle de las Violetas. ¿No es un nombre precioso?»
10:14 Ana se sienta.
10:14 Ana termina lo que hacía.
10:14 Ana echa a andar.
10:15 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
```
</details>

## Leer el libro prestado (meta 46: cumplida)

**Lo que debería pasar:** Ana se sienta con el libro que le prestaron y lee, un buen rato.

- ✔ Lee sentada, un buen rato. — 15:01, 30 min

<details><summary>Lo que el juego cuenta que pasó (20 líneas)</summary>

```
15:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes; ahora tiene 1 libro.
15:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
15:00 Ana echa a andar.
15:00 Ana está en la cocina de Tejas Verdes, junto a la puerta.
15:00 Ana echa a andar.
15:00 Ana está en la cocina de Tejas Verdes.
15:00 Ana echa a andar; empieza: leer.
15:00 Ana dice: ««Ben-Hur»… ¡No puedo parar de leer! La carrera de cuadrigas…»
15:01 Ana está en la cocina de Tejas Verdes, junto a la silla de la ventana; con un libro.
15:05 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer · con un libro
15:10 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer · con un libro
15:15 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer · con un libro
15:20 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer · con un libro
15:25 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer · con un libro
15:30 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer · con un libro
15:31 Ana se queda de pie; termina lo que hacía.
15:31 Ana echa a andar.
15:31 Ana se queda de pie.
15:32 Ana echa a andar.
15:32 Ana está en la cocina de Tejas Verdes.
```
</details>

## El club de cuentos (meta 47: cumplida)

**Lo que debería pasar:** Ana sube a su pieza y escribe un cuento sentada al escritorio, con el cuaderno abierto sobre él, un buen rato. Después se lo lee a Diana, sentadas juntas.

- ✔ Escribe sentada al escritorio, con el cuaderno, un buen rato. — 14:05, 40 min
- ✔ Se lo lee a Diana, sentadas juntas. — 15:05, 1 min

<details><summary>Lo que el juego cuenta que pasó (46 líneas)</summary>

```
14:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
14:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
14:00 Ana echa a andar.
14:00 Ana está en la cocina de Tejas Verdes, junto a la puerta.
14:00 Ana echa a andar.
14:00 Ana está en la cocina de Tejas Verdes.
14:00 Ana echa a andar; empieza: escribir_cuento.
14:00 Ana dice: ««Los celos de Cordelia»: una historia trágica, con un ahogado y una dama de cabellos de oro…»
14:01 Ana está en la cocina de Tejas Verdes, junto a la mesa.
14:02 Ana dice: «Sí, Marilla… bueno, casi. Me distraje mirando una araña que tejía, y era tan perfecta…»
14:04 Ana echa a andar.
14:05 · Ana: la cocina de Tejas Verdes · caminando · escribir_cuento
14:05 Ana está en la pieza de Ana.
14:05 Ana echa a andar.
14:05 Ana está en la pieza de Ana, junto al escritorio; con la banqueta y el cuaderno sobre la mesa.
14:10 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir_cuento · con la banqueta y el cuaderno sobre la mesa
14:15 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir_cuento · con la banqueta y el cuaderno sobre la mesa
14:20 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir_cuento · con la banqueta y el cuaderno sobre la mesa
14:25 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir_cuento · con la banqueta y el cuaderno sobre la mesa
14:30 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir_cuento · con la banqueta y el cuaderno sobre la mesa
14:35 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir_cuento · con la banqueta y el cuaderno sobre la mesa
14:40 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir_cuento · con la banqueta y el cuaderno sobre la mesa
14:45 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir_cuento · con la banqueta y el cuaderno sobre la mesa
14:45 Ana se queda de pie; termina lo que hacía; ahora tiene 1 cuento.
14:45 Ana está en la cocina de Tejas Verdes, junto a la escalera.
14:45 Ana está en Avonlea, junto a Tejas Verdes.
14:45 Ana echa a andar.
14:50 · Ana: Avonlea, junto a camino de el Camino Blanco de las Delicias · caminando
14:50 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
14:55 · Ana: Avonlea, junto a camino de el puente del arroyo · caminando
14:57 Ana está en Avonlea, junto al puente del arroyo.
14:57 Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»
14:59 Ana se sienta.
15:00 · Ana: Avonlea, junto al puente del arroyo · sentada
15:01 Ana echa a andar.
15:03 Ana dice: «¡Diana! ¡Espera!»
15:05 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
15:05 Ana está en Avonlea, junto a La Cuesta del Huerto; empieza: leer_cuento; con el cuaderno.
15:05 Ana dice: «Escucha, Diana: «La dama Geraldine caminaba a la luz de la luna…»»
15:05 Ana echa a andar.
15:05 Ana se queda de pie.
15:07 Ana termina lo que hacía; ya no tiene nada.
15:07 Ana se sienta.
15:07 Ana dice: «¡Qué día para hacer algo bonito!»
15:07 Ana echa a andar.
15:07 Ana se queda de pie.
```
</details>

## Ensayar y recitar en el concierto (meta 48: cumplida)

**Lo que debería pasar:** Ana ensaya su recitación con el libro, un rato. La noche del concierto sube al escenario del salón y recita.

- ✔ Ensaya con el libro, un rato. — 15:20, 20 min
- ✔ Recita en el escenario del salón. — 16:06, 10 min

<details><summary>Lo que el juego cuenta que pasó (58 líneas)</summary>

```
15:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
15:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
15:00 Ana echa a andar.
15:05 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
15:10 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
15:12 Ana está en Avonlea, junto a camino de la escuela.
15:12 Ana dice: «¡Hola, pequeño! ¿Cómo te llamas? Yo te diré Lord Fitzgerald.»
15:14 Ana se sienta.
15:15 · Ana: Avonlea, junto a camino de la escuela · sentada
15:15 Ana echa a andar.
15:19 Ana está en Avonlea, junto a la escuela.
15:19 Ana echa a andar; empieza: ensayar.
15:19 Ana dice: ««La doncella de Shalott»… otra vez desde el principio, con más sentimiento.»
15:19 Ana está en La escuela.
15:19 Ana echa a andar.
15:20 · Ana: La escuela · caminando · ensayar
15:20 Ana se queda de pie; con un libro.
15:25 · Ana: La escuela · de pie · ensayar · con un libro
15:30 · Ana: La escuela · de pie · ensayar · con un libro
15:35 · Ana: La escuela · de pie · ensayar · con un libro
15:40 · Ana: La escuela · de pie · ensayar · con un libro
15:40 Ana termina lo que hacía.
15:40 Ana está en Avonlea, junto a la escuela.
15:40 Ana echa a andar.
15:40 Ana se queda de pie.
15:40 Ana dice: «¡Buenas tardes, Jane Andrews!»
15:42 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
15:42 Ana se sienta.
15:43 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
15:45 · Ana: Avonlea, junto a la escuela · sentada
15:45 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
15:47 Ana dice: «Bueno, me voy, que tengo que recitar en el concierto.»
15:48 Ana echa a andar.
15:50 · Ana: Avonlea, junto a camino de la escuela · caminando
15:53 Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
15:53 Ana dice: «¡Buenas tardes, Prissy Andrews!»
15:55 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · de pie
15:55 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
15:55 Ana se sienta.
15:56 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
15:58 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
16:00 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · sentada
16:00 Ana dice: «Bueno, me voy, que tengo que recitar en el concierto.»
16:01 Ana echa a andar.
16:05 · Ana: Avonlea, junto al salón del pueblo · caminando
16:05 Ana está en Avonlea, junto al salón del pueblo.
16:05 Ana echa a andar; empieza: actuar.
16:05 Ana dice: ««…y la barca siguió flotando río abajo, hacia Camelot.»»
16:05 Ana está en El salón del pueblo.
16:05 Ana echa a andar.
16:06 Ana está en El salón del pueblo, junto al escenario; con el gesto de recitar.
16:10 · Ana: El salón del pueblo, junto al escenario · de pie · actuar · con el gesto de recitar
16:15 · Ana: El salón del pueblo, junto al escenario · de pie · actuar · con el gesto de recitar
16:16 Ana termina lo que hacía.
16:16 Ana echa a andar.
16:17 Ana está en Avonlea, junto al salón del pueblo.
16:17 Ana echa a andar.
16:17 Ana se queda de pie.
```
</details>

## Las flores del salón (meta 49: cumplida)

**Lo que debería pasar:** Ana va al salón con flores y cuelga guirnaldas a lo largo de la pared, un tramo tras otro, un buen rato.

- ✔ Cuelga las guirnaldas en el salón, un buen rato. — 10:39, 27 min

<details><summary>Lo que el juego cuenta que pasó (52 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 Ana echa a andar.
10:00 Ana se queda de pie.
10:01 Ana se sienta.
10:02 Ana echa a andar.
10:03 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
10:03 Ana echa a andar; empieza: recoger ramo.
10:03 Ana se agacha; con el canastito.
10:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · agachada · recoger ramo · con el canastito
10:05 Ana se sienta.
10:06 Ana termina lo que hacía; ahora tiene 1 ramo.
10:06 Ana echa a andar.
10:10 · Ana: Avonlea, junto a camino de la huerta de Tejas Verdes · caminando
10:15 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:19 Ana está en Avonlea, junto a camino de la escuela.
10:20 · Ana: Avonlea, junto a camino de la escuela · de pie
10:21 Ana se sienta.
10:22 Ana echa a andar.
10:25 · Ana: Avonlea, junto a camino de la escuela · caminando
10:28 Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
10:28 Ana dice: «¡Buenos días!»
10:29 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
10:30 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · de pie
10:30 Ana se sienta.
10:31 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
10:33 Ana dice: «Bueno, me voy, que tengo que decorar el salón con flores.»
10:34 Ana echa a andar.
10:35 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando
10:37 Ana está en Avonlea, junto al salón del pueblo.
10:37 Ana echa a andar; empieza: decorar_sala.
10:37 Ana está en El salón del pueblo.
10:37 Ana echa a andar.
10:38 Ana se queda de pie.
10:39 Ana echa a andar.
10:39 Ana se queda de pie; con flores.
10:40 · Ana: El salón del pueblo · de pie · decorar_sala · con flores
10:45 · Ana: El salón del pueblo · de pie · decorar_sala · con flores
10:47 Ana echa a andar.
10:48 Ana está en El salón del pueblo, junto al escenario; con flores.
10:50 · Ana: El salón del pueblo, junto al escenario · de pie · decorar_sala · con flores
10:55 · Ana: El salón del pueblo, junto al escenario · de pie · decorar_sala · con flores
10:56 Ana echa a andar.
10:57 Ana está en El salón del pueblo.
10:58 Ana echa a andar.
10:58 Ana se queda de pie; con flores.
11:00 · Ana: El salón del pueblo · de pie · decorar_sala · con flores
11:05 · Ana: El salón del pueblo · de pie · decorar_sala · con flores
11:06 Ana termina lo que hacía; ya no tiene nada.
11:06 Ana dice: «¡A ver qué descubro por ahí!»
11:06 Ana echa a andar.
11:07 Ana se queda de pie.
```
</details>

## Felicitar a Diana (meta 50: cumplida)

**Lo que debería pasar:** Diana recitó en el concierto. Ana va hasta ella y la felicita.

- ✔ Ana felicita a Diana. — 17:18, 1 min

<details><summary>Lo que el juego cuenta que pasó (51 líneas)</summary>

```
17:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
17:00 Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene 1 libro.
17:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
17:00 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
17:00 Ana echa a andar.
17:00 Diana echa a andar.
17:00 Diana se queda de pie.
17:01 Diana echa a andar.
17:01 Diana se queda de pie.
17:03 Diana echa a andar.
17:04 Diana se queda de pie.
17:04 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
17:05 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
17:05 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
17:06 Diana echa a andar.
17:06 Diana se queda de pie.
17:07 Diana echa a andar.
17:08 Diana se queda de pie.
17:09 Diana echa a andar.
17:10 · Ana: Avonlea, junto al puente del arroyo · caminando
17:10 · Diana: Avonlea, junto a La Cuesta del Huerto · caminando
17:10 Diana se queda de pie.
17:11 Diana echa a andar.
17:12 Ana está en Avonlea, junto al puente del arroyo.
17:12 Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»
17:12 Diana se queda de pie.
17:13 Diana echa a andar.
17:13 Ana se sienta.
17:13 Ana echa a andar.
17:14 Diana se queda de pie.
17:15 · Ana: Avonlea, junto a camino de el puente del arroyo · caminando
17:15 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
17:15 Diana echa a andar.
17:15 Ana dice: «¡Diana! ¡Espera!»
17:15 Diana se queda de pie.
17:15 Diana dice: «¿Qué pasa?»
17:18 Diana echa a andar.
17:18 Ana está en Avonlea, junto a La Cuesta del Huerto.
17:18 Ana empieza: felicitar; con las manos.
17:18 Ana dice: «¡Felicitaciones! Lo hiciste maravillosamente.»
17:18 Ana echa a andar.
17:18 Diana se queda de pie.
17:18 Ana se queda de pie.
17:19 Ana termina lo que hacía.
17:19 Diana dice: «¡Gracias! Estaba tan nerviosa…»
17:19 Ana echa a andar.
17:19 Diana echa a andar.
17:20 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
17:20 · Diana: Avonlea, junto a La Cuesta del Huerto · caminando
17:20 Diana se queda de pie.
17:21 Ana se queda de pie.
```
</details>

## Consolar a Diana (meta 51: cumplida)

**Lo que debería pasar:** A Diana le prohibieron ver a Ana y está triste. Ana va hasta ella y la consuela con un abrazo.

- ✔ Ana la abraza. — 16:22, 1 min

<details><summary>Lo que el juego cuenta que pasó (56 líneas)</summary>

```
16:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
16:00 Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene 1 libro.
16:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
16:00 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
16:00 Ana echa a andar.
16:00 Ana se queda de pie.
16:00 Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»
16:00 Diana echa a andar.
16:00 Diana se queda de pie.
16:01 Diana echa a andar.
16:01 Ana se sienta.
16:02 Diana se queda de pie.
16:02 Ana echa a andar.
16:03 Diana echa a andar.
16:04 Diana se queda de pie.
16:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
16:05 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
16:05 Diana echa a andar.
16:06 Diana se queda de pie.
16:07 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
16:07 Diana echa a andar.
16:08 Diana se queda de pie.
16:10 · Ana: Avonlea, junto al Bosque Encantado · caminando
16:10 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
16:10 Diana echa a andar.
16:10 Diana se queda de pie.
16:11 Diana echa a andar.
16:12 Ana está en Avonlea, junto al puente del arroyo.
16:12 Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»
16:12 Diana se queda de pie.
16:13 Ana se sienta.
16:13 Diana echa a andar.
16:14 Ana echa a andar.
16:15 · Ana: Avonlea, junto al puente del arroyo · caminando
16:15 · Diana: Avonlea, junto a La Cuesta del Huerto · caminando
16:15 Diana se queda de pie.
16:16 Diana echa a andar.
16:17 Diana se queda de pie.
16:18 Diana echa a andar.
16:18 Diana se queda de pie.
16:20 · Ana: Avonlea, junto a camino de La Cuesta del Huerto · caminando
16:20 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
16:20 Diana echa a andar.
16:20 Ana dice: «¡Diana! ¡Espera!»
16:20 Diana se queda de pie.
16:20 Diana dice: «¿Qué pasa?»
16:22 Ana está en Avonlea, junto a La Cuesta del Huerto; empieza: consolar; con un abrazo.
16:22 Ana dice: «No llores… todo se va a arreglar, ya verás. Yo estoy contigo.»
16:23 Diana echa a andar.
16:23 Ana termina lo que hacía.
16:23 Diana dice: «Gracias… ya me siento mejor.»
16:23 Ana echa a andar.
16:23 Ana se queda de pie.
16:23 Diana dice: «Los manzanos están llenos este año. Toma las que quieras.»
16:25 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie
16:25 · Diana: Avonlea, junto a La Cuesta del Huerto · caminando
```
</details>

## Hacer heno (meta 52: cumplida)

**Lo que debería pasar:** Matthew va al campo con la horquilla y junta el heno en un lugar y en otro, un buen rato; quedan los fardos en el campo.

- ✔ Junta el heno con la horquilla, un buen rato. — 09:06, 48 min

<details><summary>Lo que el juego cuenta que pasó (27 líneas)</summary>

```
09:00 Al empezar, Matthew va por Avonlea, junto al granero; ahora tiene 5 dolares.
09:00 · Matthew: Avonlea, junto al granero · caminando
09:05 · Matthew: Avonlea, junto a camino de la huerta de Tejas Verdes · caminando
09:05 Matthew está en Avonlea, junto a camino de la huerta de Tejas Verdes.
09:05 Matthew echa a andar; empieza: hacer_heno.
09:05 Matthew dice: «A juntar el heno antes de que llueva…»
09:06 Matthew se queda de pie; con la horquilla.
09:10 · Matthew: Avonlea, junto a camino de la huerta de Tejas Verdes · de pie · hacer_heno · con la horquilla
09:15 · Matthew: Avonlea, junto a camino de la huerta de Tejas Verdes · de pie · hacer_heno · con la horquilla
09:20 · Matthew: Avonlea, junto a camino de la huerta de Tejas Verdes · de pie · hacer_heno · con la horquilla
09:21 Matthew echa a andar.
09:21 Matthew se queda de pie; con la horquilla.
09:25 · Matthew: Avonlea, junto a camino de la huerta de Tejas Verdes · de pie · hacer_heno · con la horquilla
09:30 · Matthew: Avonlea, junto a camino de la huerta de Tejas Verdes · de pie · hacer_heno · con la horquilla
09:35 · Matthew: Avonlea, junto a camino de la huerta de Tejas Verdes · de pie · hacer_heno · con la horquilla
09:36 Matthew echa a andar.
09:36 Matthew se queda de pie.
09:37 Matthew dice: «Buenas... sí... buen día, ¿no?»
09:38 Matthew dice: «Pues... sí... tengo un encargo. Hasta luego.»
09:39 Matthew echa a andar.
09:39 Matthew está en Avonlea, junto a camino de la casa de la Sra. Lynde; con la horquilla.
09:40 · Matthew: Avonlea, junto a camino de la casa de la Sra. Lynde · de pie · hacer_heno · con la horquilla
09:45 · Matthew: Avonlea, junto a camino de la casa de la Sra. Lynde · de pie · hacer_heno · con la horquilla
09:50 · Matthew: Avonlea, junto a camino de la casa de la Sra. Lynde · de pie · hacer_heno · con la horquilla
09:54 Matthew termina lo que hacía; ahora tiene 5 dolares, 3 heno.
09:54 Matthew echa a andar.
09:55 · Matthew: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
```
</details>

## Partir leña (meta 53: cumplida)

**Lo que debería pasar:** Matthew parte leña con el hacha junto al granero, un buen rato. Lleva la leña a la cocina y se la da a Marilla.

- ✔ Parte leña junto al granero, un buen rato. — 09:00, 25 min
- ✔ Tiene la leña. — 09:25, 4 min
- ✔ Se la da a Marilla en la cocina. — 09:28, 0 min

<details><summary>Lo que el juego cuenta que pasó (30 líneas)</summary>

```
09:00 Al empezar, Matthew va por Avonlea, junto al granero; ahora tiene 5 dolares.
09:00 Al empezar, Marilla está en la cocina de Tejas Verdes.
09:00 · Matthew: Avonlea, junto al granero · caminando
09:00 · Marilla: la cocina de Tejas Verdes · sentada
09:00 Matthew se queda de pie.
09:00 Marilla se queda de pie.
09:00 Matthew echa a andar; empieza: partir_lena.
09:00 Matthew dice: «¡Zas! ¡Zas! Leña para la cocina de Marilla.»
09:00 Matthew se queda de pie; con el hacha.
09:05 · Matthew: Avonlea, junto al granero · de pie · partir_lena · con el hacha
09:05 · Marilla: la cocina de Tejas Verdes · de pie
09:10 · Matthew: Avonlea, junto al granero · de pie · partir_lena · con el hacha
09:10 · Marilla: la cocina de Tejas Verdes · de pie
09:15 · Matthew: Avonlea, junto al granero · de pie · partir_lena · con el hacha
09:15 · Marilla: la cocina de Tejas Verdes · de pie
09:19 Matthew dice: «Las vacas andan contentas hoy. Será por el sol, supongo.»
09:20 · Matthew: Avonlea, junto al granero · de pie · partir_lena · con el hacha
09:20 · Marilla: la cocina de Tejas Verdes · de pie
09:25 · Matthew: Avonlea, junto al granero · de pie · partir_lena · con el hacha
09:25 · Marilla: la cocina de Tejas Verdes · de pie
09:25 Matthew termina lo que hacía; ahora tiene 5 dolares, 3 lena.
09:25 Matthew echa a andar.
09:28 Matthew va por la cocina de Tejas Verdes, junto a la puerta.
09:28 Matthew está en la cocina de Tejas Verdes; empieza: dar lena; con lo que entrega.
09:29 Matthew está en Avonlea, junto a Tejas Verdes; termina lo que hacía; ahora tiene 5 dolares.
09:29 Marilla ahora tiene 3 lena.
09:29 Marilla dice: «Gracias.»
09:29 Matthew echa a andar.
09:30 · Matthew: Avonlea, junto a Tejas Verdes · caminando
09:30 · Marilla: la cocina de Tejas Verdes · de pie
```
</details>

## Batir mantequilla (meta 54: cumplida)

**Lo que debería pasar:** Marilla pone la leche de la mañana en la mantequera, junto a la mesa, y bate sin parar una media hora, hasta que hay mantequilla.

- ✔ Bate en la mantequera una media hora. — 08:18, 30 min
- ✔ Tiene la mantequilla. — 08:48, hasta el final

<details><summary>Lo que el juego cuenta que pasó (22 líneas)</summary>

```
08:00 Al empezar, Marilla está en la cocina de Tejas Verdes.
08:00 · Marilla: la cocina de Tejas Verdes · sentada
08:00 Marilla está en Avonlea, junto a Tejas Verdes.
08:00 Marilla echa a andar.
08:00 Marilla se queda de pie.
08:00 Marilla dice: «¿Me traerías 2 jarros de leche?»
08:00 Marilla está en la cocina de Tejas Verdes, junto a la puerta.
08:05 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
08:10 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
08:15 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
08:17 Marilla ahora tiene 2 leche.
08:17 Marilla dice: «Gracias.»
08:18 Marilla echa a andar; empieza: batir mantequilla.
08:18 Marilla está en la cocina de Tejas Verdes; con la mantequera.
08:20 · Marilla: la cocina de Tejas Verdes · de pie · batir mantequilla · con la mantequera
08:25 · Marilla: la cocina de Tejas Verdes · de pie · batir mantequilla · con la mantequera
08:30 · Marilla: la cocina de Tejas Verdes · de pie · batir mantequilla · con la mantequera
08:35 · Marilla: la cocina de Tejas Verdes · de pie · batir mantequilla · con la mantequera
08:40 · Marilla: la cocina de Tejas Verdes · de pie · batir mantequilla · con la mantequera
08:45 · Marilla: la cocina de Tejas Verdes · de pie · batir mantequilla · con la mantequera
08:48 Marilla termina lo que hacía; ahora tiene 1 mantequilla.
08:50 · Marilla: la cocina de Tejas Verdes · de pie
```
</details>

## Sembrar y regar la huerta (meta 55: cumplida)

**Lo que debería pasar:** Ana va a la huerta con las semillas y siembra cama por cama. Después llena la regadera y las riega, una por una.

- ✔ Siembra en la huerta. — 09:04, 15 min
- ✔ Riega con la regadera. — 09:20, 9 min

<details><summary>Lo que el juego cuenta que pasó (40 líneas)</summary>

```
09:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
09:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
09:00 Ana echa a andar.
09:00 Ana se queda de pie.
09:00 Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»
09:01 Ana se sienta.
09:02 Ana echa a andar.
09:03 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
09:03 Ana echa a andar; empieza: sembrar.
09:04 Ana se queda de pie; con las semillas.
09:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · sembrar · con las semillas
09:05 Ana se sienta.
09:09 Ana echa a andar.
09:09 Ana se queda de pie; con las semillas.
09:10 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · sembrar · con las semillas
09:11 Ana se sienta.
09:14 Ana echa a andar.
09:14 Ana se queda de pie; con las semillas.
09:15 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · sembrar · con las semillas
09:16 Ana se sienta.
09:19 Ana termina lo que hacía.
09:19 Ana echa a andar.
09:19 Ana se queda de pie.
09:19 Ana echa a andar; empieza: regar.
09:20 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando · regar
09:20 Ana se queda de pie; con la regadera.
09:21 Ana se sienta.
09:23 Ana echa a andar.
09:23 Ana se queda de pie; con la regadera.
09:25 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · regar · con la regadera
09:25 Ana se sienta.
09:26 Ana echa a andar.
09:26 Ana se queda de pie; con la regadera.
09:28 Ana se sienta.
09:29 Ana termina lo que hacía.
09:29 Ana echa a andar.
09:30 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
09:31 Ana está en la cocina de Tejas Verdes, junto a la puerta.
09:31 Ana echa a andar.
09:31 Ana se queda de pie.
```
</details>

## Patinar en el lago (meta 56: cumplida)

**Lo que debería pasar:** En invierno, Ana se pone los patines y patina en el lago helado, dando vueltas, un buen rato.

- ✔ Patina en el lago, un buen rato. — 14:19, 30 min

<details><summary>Lo que el juego cuenta que pasó (24 líneas)</summary>

```
14:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
14:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
14:00 Ana echa a andar.
14:05 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
14:10 · Ana: Avonlea, junto a camino de el puente del arroyo · caminando
14:11 Ana está en Avonlea, junto a camino de el Camino Blanco de las Delicias.
14:11 Ana dice: «¡El Lago de las Aguas Brillantes! Podría quedarme aquí la vida entera.»
14:13 Ana se sienta.
14:14 Ana echa a andar.
14:15 · Ana: Avonlea, junto a camino de el Lago de las Aguas Brillantes · caminando
14:19 Ana está en Avonlea, junto al Lago de las Aguas Brillantes.
14:19 Ana empieza: patinar; con los patines.
14:19 Ana dice: «¡Mira, Diana! ¡Vuelo sobre el hielo como una golondrina!»
14:20 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · de pie · patinar · con los patines
14:20 Ana se sienta.
14:25 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · patinar · con los patines
14:30 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · patinar · con los patines
14:35 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · patinar · con los patines
14:40 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · patinar · con los patines
14:45 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · patinar · con los patines
14:49 Ana termina lo que hacía.
14:49 Ana echa a andar.
14:50 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando
14:50 Ana está en Avonlea, junto a camino de el Lago de las Aguas Brillantes.
```
</details>

## El trineo (meta 57: cumplida)

**Lo que debería pasar:** En invierno, Ana sube la colina con el trineo y se tira, una y otra vez, un buen rato.

- ✔ Se tira en trineo, una y otra vez, un buen rato. — 14:36, 30 min

<details><summary>Lo que el juego cuenta que pasó (64 líneas)</summary>

```
14:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
14:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
14:00 Ana echa a andar.
14:05 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
14:10 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
14:15 · Ana: Avonlea, junto a camino de la escuela · caminando
14:18 Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
14:18 Ana dice: «¡Buenas tardes!»
14:19 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
14:20 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · de pie
14:20 Ana se sienta.
14:21 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
14:23 Ana dice: «Bueno, me voy, que tengo que tirarme en trineo.»
14:24 Ana echa a andar.
14:25 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando
14:30 · Ana: Avonlea, junto a camino de el salón del pueblo · caminando
14:35 · Ana: Avonlea, junto a camino de el campo de flores rosadas · caminando
14:36 Ana está en Avonlea, junto al campo de flores rosadas.
14:36 Ana se sienta; empieza: trineo; con el trineo.
14:36 Ana dice: «¡Allá vamos, colina abajo! ¡Agárrate fuerte!»
14:37 Ana está en Avonlea, junto a camino de el campo de flores rosadas.
14:37 Ana se queda de pie.
14:37 Ana está en Avonlea, junto al campo de flores rosadas.
14:38 Ana se sienta.
14:39 Ana está en Avonlea, junto a camino de el campo de flores rosadas.
14:39 Ana está en Avonlea, junto al campo de flores rosadas.
14:40 · Ana: Avonlea, junto al campo de flores rosadas · sentada · trineo · con el trineo
14:41 Ana está en Avonlea, junto a camino de el campo de flores rosadas.
14:41 Ana está en Avonlea, junto al campo de flores rosadas.
14:43 Ana está en Avonlea, junto a camino de el campo de flores rosadas.
14:43 Ana está en Avonlea, junto al campo de flores rosadas.
14:44 Ana está en Avonlea, junto a camino de el campo de flores rosadas.
14:44 Ana está en Avonlea, junto al campo de flores rosadas.
14:45 · Ana: Avonlea, junto al campo de flores rosadas · sentada · trineo · con el trineo
14:46 Ana está en Avonlea, junto a camino de el campo de flores rosadas.
14:46 Ana está en Avonlea, junto al campo de flores rosadas.
14:48 Ana está en Avonlea, junto a camino de el campo de flores rosadas.
14:48 Ana está en Avonlea, junto al campo de flores rosadas.
14:50 · Ana: Avonlea, junto al campo de flores rosadas · sentada · trineo · con el trineo
14:50 Ana está en Avonlea, junto a camino de el campo de flores rosadas.
14:50 Ana está en Avonlea, junto al campo de flores rosadas.
14:52 Ana está en Avonlea, junto a camino de el campo de flores rosadas.
14:52 Ana está en Avonlea, junto al campo de flores rosadas.
14:53 Ana está en Avonlea, junto a camino de el campo de flores rosadas.
14:53 Ana está en Avonlea, junto al campo de flores rosadas.
14:55 · Ana: Avonlea, junto al campo de flores rosadas · sentada · trineo · con el trineo
14:55 Ana está en Avonlea, junto a camino de el campo de flores rosadas.
14:55 Ana está en Avonlea, junto al campo de flores rosadas.
14:57 Ana está en Avonlea, junto a camino de el campo de flores rosadas.
14:57 Ana está en Avonlea, junto al campo de flores rosadas.
14:59 Ana está en Avonlea, junto a camino de el campo de flores rosadas.
14:59 Ana está en Avonlea, junto al campo de flores rosadas.
15:00 · Ana: Avonlea, junto al campo de flores rosadas · sentada · trineo · con el trineo
15:01 Ana está en Avonlea, junto a camino de el campo de flores rosadas.
15:01 Ana está en Avonlea, junto al campo de flores rosadas.
15:02 Ana está en Avonlea, junto a camino de el campo de flores rosadas.
15:02 Ana está en Avonlea, junto al campo de flores rosadas.
15:04 Ana está en Avonlea, junto a camino de el campo de flores rosadas.
15:04 Ana está en Avonlea, junto al campo de flores rosadas.
15:05 · Ana: Avonlea, junto al campo de flores rosadas · sentada · trineo · con el trineo
15:06 Ana está en Avonlea, junto a camino de el campo de flores rosadas.
15:06 Ana está en Avonlea, junto al campo de flores rosadas.
15:06 Ana termina lo que hacía.
15:06 Ana dice: «Se me ocurrió una idea... ¡de esas que solo tengo yo!»
```
</details>

## El picnic con Diana (meta 58: fail)

**Lo que debería pasar:** Ana le pide permiso a Marilla. Prepara la canasta en la cocina. Va al lago con Diana; extienden el mantel, se sientan y meriendan, sin apuro, un buen rato.

- ✔ Prepara la canasta en la cocina. — 11:02, 15 min
- ✘ Merienda sentada sobre el mantel, un buen rato. — no ocurrió (al final: Avonlea, junto a La Cuesta del Huerto · caminando · tiene 1 canasta)
- ✘ Diana está sentada con ella. — no ocurrió (al final: Avonlea, junto a La Cuesta del Huerto · de pie · tiene 1 libro)

<details><summary>Lo que el juego cuenta que pasó (229 líneas)</summary>

```
11:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
11:00 Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene 1 libro.
11:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
11:00 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:00 Ana echa a andar.
11:00 Ana está en la cocina de Tejas Verdes, junto a la puerta.
11:00 Ana echa a andar.
11:00 Ana está en la cocina de Tejas Verdes.
11:00 Ana dice: «Marilla, ¿puedo ir al picnic de la escuela dominical? ¡Va a haber helado!»
11:01 Ana echa a andar.
11:02 Ana se queda de pie.
11:02 Ana echa a andar; empieza: preparar canasta.
11:02 Ana está en la cocina de Tejas Verdes, junto a la estufa; con el bol.
11:05 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar canasta · con el bol
11:05 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:10 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar canasta · con el bol
11:10 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:15 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar canasta · con el bol
11:15 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:17 Ana termina lo que hacía; ahora tiene 1 canasta.
11:17 Ana está en Avonlea, junto a Tejas Verdes.
11:17 Ana echa a andar.
11:17 Diana echa a andar.
11:17 Diana se queda de pie.
11:18 Diana echa a andar.
11:19 Diana se queda de pie.
11:20 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
11:20 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:20 Diana echa a andar.
11:21 Diana se queda de pie.
11:22 Diana echa a andar.
11:23 Diana se queda de pie.
11:24 Diana echa a andar.
11:25 · Ana: Avonlea, junto al Bosque Encantado · caminando
11:25 · Diana: Avonlea, junto a La Cuesta del Huerto · caminando
11:25 Diana se queda de pie.
11:26 Diana echa a andar.
11:27 Diana se queda de pie.
11:28 Diana echa a andar.
11:29 Diana se queda de pie.
11:30 · Ana: Avonlea, junto a camino de el puente del arroyo · caminando
11:30 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:30 Diana echa a andar.
11:31 Diana se queda de pie.
11:32 Diana echa a andar.
11:32 Ana dice: «¡Diana! ¡Espera!»
11:32 Diana se queda de pie.
11:32 Diana dice: «¿Me llamabas?»
11:34 Ana está en Avonlea, junto a La Cuesta del Huerto.
11:34 Ana dice: «¡Buenos días, Minnie May Barry!»
11:34 Diana echa a andar.
11:35 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie
11:35 · Diana: Avonlea, junto a La Cuesta del Huerto · caminando
11:35 Diana dice: «El Bosque Encantado me da un poquito de miedo... pero contigo no.»
11:35 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
11:36 Ana se sienta.
11:37 Diana se queda de pie.
11:37 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
11:37 Diana echa a andar.
11:38 Diana se queda de pie.
11:39 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
11:40 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada
11:40 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:40 Diana echa a andar.
11:40 Ana dice: «Bueno, me voy, que tengo que pedirle a Diana: que den un paseo juntas.»
11:40 Diana se queda de pie.
11:42 Ana echa a andar.
11:42 Diana echa a andar.
11:42 Ana dice: «¡Diana! ¡Espera!»
11:42 Diana se queda de pie.
11:42 Diana dice: «¿Sí?»
11:42 Ana se queda de pie.
11:42 Ana dice: «¿Vamos a dar un paseo juntas? Hace un día precioso.»
11:42 Ana echa a andar.
11:43 Diana echa a andar.
11:43 Diana se queda de pie.
11:45 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
11:45 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:50 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
11:50 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:55 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
11:55 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:58 Diana dice: «Mamá dice que puedo salir hasta que se ponga el sol. ¿Vamos al lago?»
12:00 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
12:00 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
12:05 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
12:05 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
12:10 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
12:10 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
12:14 Diana dice: «¡Ana, mi alma gemela! Te estaba esperando.»
12:15 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
12:15 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
12:20 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
12:20 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
12:22 Ana se queda de pie.
12:22 Ana dice: «¿Juras ser mi amiga del alma, Diana, mientras el sol y la luna existan?»
12:24 Diana dice: «¡Lo juro! Aunque no sé muy bien cómo se jura… ¿así está bien?»
12:24 Ana se sienta.
12:25 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada
12:25 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
12:25 Ana dice: «Perfecto. Ahora es para siempre.»
12:25 Ana echa a andar.
12:29 Diana dice: «Mamá dice que puedo salir hasta que se ponga el sol. ¿Vamos al lago?»
12:30 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
12:30 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
12:35 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
12:35 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
12:40 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
12:40 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
12:41 Ana se queda de pie.
12:41 Diana echa a andar.
12:41 Ana dice: «¡Buenas tardes, Mary Joe!»
12:41 Diana se queda de pie.
12:41 Diana echa a andar.
12:41 Diana se queda de pie.
12:42 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
12:42 Ana se sienta.
12:44 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
12:44 Diana dice: «¿Te acuerdas de nuestro juramento de amistad? ¡Para siempre!»
12:45 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada
12:45 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
12:45 Ana dice: «Bueno, me voy, que tengo que ir al lago.»
12:45 Diana echa a andar.
12:46 Diana se queda de pie.
12:46 Ana echa a andar.
12:46 Diana echa a andar.
12:47 Diana se queda de pie.
12:50 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
12:50 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
12:53 Ana se queda de pie.
12:53 Diana echa a andar.
12:53 Ana dice: «¡Buenas tardes, Minnie May Barry!»
12:54 Diana se queda de pie.
12:54 Diana echa a andar.
12:54 Diana se queda de pie.
12:55 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie
12:55 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
12:55 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
12:55 Ana se sienta.
12:56 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
12:58 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
12:59 Diana dice: «¡Ana, mi alma gemela! Te estaba esperando.»
13:00 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada
13:00 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
13:00 Ana dice: «Bueno, me voy, que tengo que ir al lago.»
13:01 Ana echa a andar.
13:05 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
13:05 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
13:06 Ana se queda de pie.
13:06 Diana dice: «Ana, ¿cómo se te ocurren tantas palabras largas?»
13:07 Ana dice: «Las tengo guardadas para las ideas grandes. Las chicas no caben en palabras chicas.»
13:07 Ana se sienta.
13:08 Diana dice: «Yo solo tengo palabras medianas…»
13:09 Ana echa a andar.
13:10 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
13:10 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
13:14 Diana dice: «Los manzanos están llenos este año. Toma las que quieras.»
13:15 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
13:15 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
13:20 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
13:20 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
13:25 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
13:25 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
13:29 Diana dice: «¡Ana, mi alma gemela! Te estaba esperando.»
13:30 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
13:30 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
13:31 Ana se queda de pie.
13:31 Ana dice: «¡Buenas tardes, Minnie May Barry!»
13:33 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
13:33 Ana se sienta.
13:34 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
13:35 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada
13:35 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
13:36 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
13:38 Ana dice: «Bueno, me voy, que tengo que ir al lago.»
13:39 Ana echa a andar.
13:40 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
13:40 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
13:44 Diana dice: «El Bosque Encantado me da un poquito de miedo... pero contigo no.»
13:45 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
13:45 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
13:50 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
13:50 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
13:55 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
13:55 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
14:00 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
14:00 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
14:00 Diana dice: «Los manzanos están llenos este año. Toma las que quieras.»
14:05 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
14:05 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
14:06 Ana se queda de pie.
14:06 Diana echa a andar.
14:06 Ana dice: «¡Buenas tardes, Mary Joe!»
14:06 Diana se queda de pie.
14:06 Diana echa a andar.
14:06 Diana se queda de pie.
14:07 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
14:07 Ana se sienta.
14:09 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
14:10 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada
14:10 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
14:10 Ana dice: «Bueno, me voy, que tengo que ir al lago.»
14:11 Ana echa a andar.
14:15 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
14:15 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
14:15 Diana dice: «¿Te acuerdas de nuestro juramento de amistad? ¡Para siempre!»
14:20 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
14:20 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
14:20 Ana se queda de pie.
14:20 Ana dice: «He decidido que el claro de los abedules se llame la Senda de los Enamorados.»
14:21 Diana dice: «¡Qué romántico! Pero no se lo digas a mamá.»
14:21 Ana se sienta.
14:22 Ana dice: «Será nuestro secreto, como todo lo importante.»
14:23 Ana echa a andar.
14:25 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
14:25 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
14:30 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
14:30 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
14:30 Diana dice: «El Bosque Encantado me da un poquito de miedo... pero contigo no.»
14:35 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
14:35 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
14:35 Ana se queda de pie.
14:35 Ana echa a andar.
14:35 Diana echa a andar.
14:36 Ana se queda de pie.
14:36 Diana se queda de pie.
14:37 Diana echa a andar.
14:37 Ana echa a andar.
14:37 Diana se queda de pie.
```
</details>

## El corte de pelo (meta 60: cumplida)

**Lo que debería pasar:** Ana se sienta en una silla en medio de la cocina. Marilla, detrás de ella con las tijeras, le corta el pelo verde, con cuidado, un buen rato.

- ✔ Ana sentada en la cocina mientras le cortan el pelo, un buen rato. — 16:00, 15 min
- ✔ Marilla está con ella en la cocina. — 16:01, hasta el final

<details><summary>Lo que el juego cuenta que pasó (30 líneas)</summary>

```
16:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes; tiene el pelo verde.
16:00 Al empezar, Marilla está en la cocina de Tejas Verdes.
16:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
16:00 · Marilla: la cocina de Tejas Verdes · sentada
16:00 Ana echa a andar.
16:00 Marilla se queda de pie.
16:00 Ana está en la cocina de Tejas Verdes, junto a la puerta.
16:00 Ana echa a andar.
16:00 Ana está en la cocina de Tejas Verdes.
16:00 Ana echa a andar; empieza: cortar_pelo.
16:00 Marilla dice: «No hay más remedio, Ana: hay que cortarlo. Quédate quieta.»
16:00 Marilla echa a andar.
16:00 Marilla se queda de pie.
16:00 Ana se sienta; con las tijeras.
16:01 Marilla echa a andar.
16:05 · Ana: la cocina de Tejas Verdes · sentada · cortar_pelo · con las tijeras
16:05 · Marilla: la cocina de Tejas Verdes · caminando
16:10 · Ana: la cocina de Tejas Verdes · sentada · cortar_pelo · con las tijeras
16:10 · Marilla: la cocina de Tejas Verdes · caminando
16:13 Marilla se queda de pie.
16:13 Marilla dice: «Si quieres cocinar, la estufa está encendida. Cuidado con no quemar nada esta vez.»
16:14 Marilla echa a andar.
16:15 · Ana: la cocina de Tejas Verdes · sentada · cortar_pelo · con las tijeras
16:15 · Marilla: la cocina de Tejas Verdes · caminando
16:15 Ana se queda de pie; termina lo que hacía.
16:15 Ana dice: «Mi pelo… Bueno, por lo menos ya no es verde.»
16:15 Ana echa a andar.
16:16 Ana está en Avonlea, junto a Tejas Verdes.
16:16 Ana echa a andar.
16:17 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
```
</details>

## El techo de los Barry (meta 61: cumplida)

**Lo que debería pasar:** Josie la desafía. Ana sube al techo de la casa de los Barry, camina por el caballete con los brazos abiertos… y se cae. Se tuerce el tobillo.

- ✔ Sube al techo y camina por el caballete. — 15:16, 2 min
- ✔ Se cae y se tuerce el tobillo. — 15:17, 1 min

<details><summary>Lo que el juego cuenta que pasó (18 líneas)</summary>

```
15:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
15:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
15:00 Ana echa a andar.
15:04 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
15:05 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
15:10 · Ana: Avonlea, junto al puente del arroyo · caminando
15:15 · Ana: Avonlea, junto a camino de La Cuesta del Huerto · caminando
15:16 Ana está en Avonlea, junto a La Cuesta del Huerto.
15:16 Ana empieza: trepar.
15:16 Ana dice: «¡Josie Pye, mira cómo camino por el techo de los Barry!… ¡Ay!»
15:17 Ana dice: «¡Aaay!»
15:17 Ana se sienta.
15:17 Ana dice: «¡Mi tobillo! Creo que me lo torcí… Diana, no puedo pararme.»
15:18 Ana termina lo que hacía.
15:18 Ana dice: «¡A ver qué descubro por ahí!»
15:18 Ana echa a andar.
15:20 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
15:20 Ana se queda de pie.
```
</details>

