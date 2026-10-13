# Auditoría de las acciones

Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.
**Pasos que ocurren como deberían: 19 de 24.**


## Lavar la loza y barrer la cocina (meta 26: cumplida)

**Lo que debería pasar:** Marilla le pide a Ana que lave los platos y barra. Ana junta los platos sucios de la mesa, los lleva al fregadero y los lava con agua caliente, sin apuro, unos diez minutos. Lleva la pila de platos limpios al aparador y los guarda. Después toma la escoba y barre la cocina de punta a punta, un buen rato.

- ✔ Recoge los platos sucios de la mesa. — 10:01, 0 min
- ✔ Los lleva en los brazos. — 10:01, 0 min
- ✘ Los lava en el fregadero, unos diez minutos. — no ocurrió (al final: Avonlea, junto a Tejas Verdes · caminando)
- ✔ Lleva los platos limpios. — 10:02, 1 min
- ✔ Los guarda en el aparador. — 10:03, 1 min
- ✘ Barre la cocina con la escoba, un buen rato. — 10:04, 0 min (se esperaban al menos 8)

<details><summary>Lo que el juego cuenta que pasó (35 líneas)</summary>

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
10:01 Ana echa a andar; lleva los platos sucios.
10:01 Ana está en la cocina de Tejas Verdes, junto a la silla de la ventana; ya no lleva nada; con la palangana con agua.
10:02 Ana echa a andar; lleva una pila de platos limpios.
10:03 Ana está en la cocina de Tejas Verdes; ya no lleva nada; con el aparador abierto.
10:03 Ana está en la cocina de Tejas Verdes, junto al aparador.
10:04 Ana termina lo que hacía.
10:04 Ana echa a andar.
10:04 Ana está en la cocina de Tejas Verdes.
10:04 Ana echa a andar; empieza: quehacer barrer.
10:04 Ana dice: «Barro la cocina, y el patio también.»
10:04 Ana se queda de pie; con la escoba.
10:04 Ana echa a andar.
10:05 · Ana: la cocina de Tejas Verdes · caminando · quehacer barrer
10:05 Ana se queda de pie; con la escoba.
10:05 Ana echa a andar.
10:05 Ana se queda de pie; con la escoba.
10:06 Ana echa a andar.
10:06 Ana se queda de pie; con la escoba.
10:06 Ana echa a andar.
10:07 Ana se queda de pie; con la escoba.
10:07 Ana termina lo que hacía.
10:07 Ana echa a andar.
10:08 Ana está en Avonlea, junto a Tejas Verdes.
10:08 Ana echa a andar.
10:09 Ana se queda de pie.
10:09 Ana echa a andar.
```
</details>

## Escribir una carta y mandarla (meta 45: cumplida)

**Lo que debería pasar:** Ana sube a su pieza, se sienta al escritorio y escribe una carta a la Srta. Stacy, con el papel sobre el escritorio, sin apuro (una media hora). La dobla y la pone en su sobre. Después baja y va al correo (en la tienda de Lawson), y la deja para que la manden. Ya no la tiene.

- ✘ Escribe sentada al escritorio de su pieza, con la carta sobre él, una media hora. — 10:02, 4 min (se esperaban al menos 20)
- ✔ Termina con la carta en su sobre. — 10:06, 30 min
- ✔ Va al correo (en la tienda de Lawson). — 10:35, 3 min
- ✔ La deja: ya no la tiene. — 10:36, hasta el final

<details><summary>Lo que el juego cuenta que pasó (43 líneas)</summary>

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
10:06 Ana se queda de pie; termina lo que hacía; ahora tiene 1 carta.
10:06 Ana está en la cocina de Tejas Verdes, junto a la escalera.
10:06 Ana está en Avonlea, junto a Tejas Verdes.
10:06 Ana echa a andar.
10:10 · Ana: Avonlea, junto a camino de la huerta de Tejas Verdes · caminando
10:15 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:19 Ana está en Avonlea, junto a camino de la escuela.
10:19 Ana dice: «¿Qué pensarán los animales de nosotros?»
10:20 · Ana: Avonlea, junto a camino de la escuela · de pie
10:21 Ana se sienta.
10:21 Ana echa a andar.
10:25 · Ana: Avonlea, junto a camino de la escuela · caminando
10:28 Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
10:28 Ana dice: «¡Buenos días!»
10:29 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
10:30 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · de pie
10:30 Ana se sienta.
10:31 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
10:33 Ana dice: «Bueno, me voy, que tengo que mandar la carta por correo.»
10:34 Ana echa a andar.
10:35 · Ana: Avonlea, junto a la tienda de Lawson · caminando
10:35 Ana está en Avonlea, junto a la tienda de Lawson.
10:35 Ana dice: «Para la Srta. Stacy, en la pensión de Avonlea.»
10:36 Ana ya no tiene nada.
10:36 Ana echa a andar.
10:38 Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
10:38 Ana echa a andar.
```
</details>

## La compota de Marilla (meta 8: cumplida)

**Lo que debería pasar:** Marilla quiere hacer compota para el invierno, pero no tiene manzanas: se las pide a Ana. Ana va a los manzanos, recoge las manzanas y se las lleva a Marilla a la cocina. Marilla las pela y las cuece en la estufa, removiendo, una media hora o más. Al final tiene la compota.

- ✔ Ana recoge manzanas de los manzanos. — 10:11, 2 min
- ✔ Ana tiene las manzanas. — 10:13, 15 min
- ✔ Se las da a Marilla en la cocina. — 10:27, 0 min
- ✔ Marilla tiene las manzanas. — 10:28, 4 min
- ✘ Marilla cocina la compota en la estufa, una media hora o más. — 10:29, 1 min (se esperaban al menos 20)
- ✔ Marilla tiene la compota. — 10:30, hasta el final

<details><summary>Lo que el juego cuenta que pasó (53 líneas)</summary>

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
10:12 Ana echa a andar.
10:12 Ana se queda de pie; con el canastito.
10:13 Ana termina lo que hacía; ahora tiene 3 manzanas.
10:13 Ana echa a andar.
10:13 Ana se queda de pie.
10:13 Ana echa a andar; empieza: recoger manzanas.
10:13 Ana se queda de pie; con el canastito.
10:14 Ana echa a andar.
10:14 Ana se queda de pie.
10:14 Ana echa a andar.
10:14 Ana se queda de pie; con el canastito.
10:15 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:15 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie · recoger manzanas · con el canastito
10:15 Ana termina lo que hacía; ahora tiene 6 manzanas.
10:15 Ana echa a andar.
10:20 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:20 · Ana: Avonlea, junto al puente del arroyo · caminando
10:25 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:25 · Ana: Avonlea, junto a camino de el Camino Blanco de las Delicias · caminando
10:27 Ana está en la cocina de Tejas Verdes, junto a la puerta.
10:27 Ana empieza: dar manzanas; con lo que entrega.
10:27 Marilla dice: «Si quieres cocinar, la estufa está encendida. Cuidado con no quemar nada esta vez.»
10:28 Marilla ahora tiene 6 manzanas.
10:28 Marilla dice: «Gracias.»
10:28 Ana termina lo que hacía; ya no tiene nada.
10:28 Marilla echa a andar; empieza: cocinar compota.
10:29 Ana está en Avonlea, junto a Tejas Verdes.
10:29 Ana echa a andar.
10:29 Marilla está en la cocina de Tejas Verdes, junto a la estufa; con el bol.
10:30 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar compota · con el bol
10:30 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
10:30 Marilla termina lo que hacía; ahora tiene 3 manzanas, 1 compota.
10:30 Marilla empieza: cocinar compota.
10:30 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
10:31 Ana echa a andar.
10:32 Marilla está en la cocina de Tejas Verdes; termina lo que hacía; ahora tiene 2 compota.
```
</details>

## Matthew trae huevos (meta 20: cumplida)

**Lo que debería pasar:** Ana le pide huevos a Matthew. Matthew va donde están las gallinas, junto al granero, se agacha a sacarlos de los nidos y los junta. Se los lleva a Ana, que los recibe.

- ✔ Matthew se agacha junto al granero, donde están las gallinas, a sacar los huevos. — 09:07, 0 min
- ✔ Matthew tiene los huevos. — 09:10, 3 min
- ✔ Se los da a Ana. — 09:12, 0 min
- ✔ Ana tiene los huevos. — 09:13, hasta el final

<details><summary>Lo que el juego cuenta que pasó (31 líneas)</summary>

```
09:00 Al empezar, Matthew va por Avonlea, junto a la huerta de Tejas Verdes; ahora tiene 5 dolares.
09:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
09:00 · Matthew: Avonlea, junto a la huerta de Tejas Verdes · caminando
09:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
09:00 Matthew se queda de pie.
09:00 Ana echa a andar.
09:00 Ana dice: «¡Matthew! ¡Espera!»
09:00 Matthew dice: «¿Me llamabas?»
09:00 Matthew dice: «¿Viste las flores junto al camino? Bueno, pues... me hicieron pensar en ti.»
09:00 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
09:02 Matthew echa a andar.
09:05 · Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · caminando
09:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie
09:05 Matthew está en Avonlea, junto a la entrada del corral de Tejas Verdes.
09:05 Matthew echa a andar; empieza: recoger huevos.
09:05 Matthew está en Avonlea, junto al granero.
09:07 Matthew se agacha; con el canastito.
09:07 Matthew se queda de pie.
09:07 Matthew echa a andar.
09:07 Matthew se queda de pie.
09:09 Matthew se agacha; con el canastito.
09:10 · Matthew: Avonlea, junto al granero · agachada · recoger huevos · con el canastito
09:10 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie
09:10 Matthew se queda de pie; termina lo que hacía; ahora tiene 5 dolares, 6 huevos.
09:10 Matthew echa a andar.
09:12 Matthew está en Avonlea, junto a la huerta de Tejas Verdes; empieza: dar huevos; con lo que entrega.
09:13 Matthew termina lo que hacía; ahora tiene 5 dolares.
09:13 Ana ahora tiene 6 huevos.
09:13 Ana dice: «Gracias.»
09:15 · Matthew: Avonlea, junto a la huerta de Tejas Verdes · de pie
09:15 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie
```
</details>

## El tinte del buhonero (meta 59: cumplida)

**Lo que debería pasar:** Pasa el buhonero por Tejas Verdes. Ana le cambia unos huevos por un frasco de tinte que promete pelo negro como el ala de un cuervo. Sube a su pieza y, frente al espejo del lavatorio, se tiñe el pelo con cuidado, un buen rato. Cuando termina, el pelo le ha quedado... verde.

- ✔ Ana le pide el tinte al buhonero (a cambio de huevos). — 10:50, 1 min
- ✔ Ana tiene el tinte. — 11:10, 48 min
- ✘ Se tiñe frente al espejo del lavatorio de su pieza, un buen rato. — no ocurrió (al final: Avonlea, junto a Tejas Verdes · de pie · tiene 4 huevos)
- ✔ El pelo le queda verde. — 11:58, hasta el final

<details><summary>Lo que el juego cuenta que pasó (212 líneas)</summary>

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
10:02 Ana se queda de pie.
10:02 Ana echa a andar.
10:03 Ana se agacha; con el canastito.
10:03 Ana se queda de pie; termina lo que hacía; ahora tiene 6 huevos.
10:03 Ana echa a andar.
10:03 Ana se queda de pie.
10:04 Ana dice: «¡Oh, señor Matthew! ¿De verdad lo dice?»
10:05 · Ana: Avonlea, junto al granero · de pie
10:05 · el buhonero: Avonlea, junto a camino de la huerta de Tejas Verdes · caminando
10:05 Ana se sienta.
10:06 Ana echa a andar.
10:10 · Ana: Avonlea, junto a camino de la huerta de Tejas Verdes · caminando
10:10 · el buhonero: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:15 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:15 · el buhonero: Avonlea, junto a camino de la escuela · caminando
10:20 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
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
10:35 el buhonero echa a andar.
10:35 el buhonero se queda de pie.
10:37 el buhonero echa a andar.
10:37 el buhonero se queda de pie.
10:38 el buhonero echa a andar.
10:39 el buhonero se queda de pie.
10:40 · Ana: Avonlea, junto a camino de la escuela · caminando
10:40 · el buhonero: Avonlea, junto a la casa parroquial · de pie
10:40 el buhonero echa a andar.
10:40 el buhonero se queda de pie.
10:42 el buhonero echa a andar.
10:43 el buhonero se queda de pie.
10:44 el buhonero echa a andar.
10:44 el buhonero se queda de pie.
10:45 · Ana: Avonlea, junto a camino de la aldea de Avonlea (el cruce de caminos) · caminando
10:45 · el buhonero: Avonlea, junto a la casa parroquial · de pie
10:46 el buhonero echa a andar.
10:46 Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
10:46 Ana dice: «¡Buenos días!»
10:46 el buhonero se queda de pie.
10:46 el buhonero está en Avonlea, junto al faro.
10:47 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
10:47 el buhonero echa a andar.
10:47 Ana se sienta.
10:47 el buhonero se queda de pie.
10:49 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
10:49 el buhonero echa a andar.
10:49 el buhonero se queda de pie.
10:50 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · sentada
10:50 · el buhonero: Avonlea, junto al faro · de pie
10:50 Ana dice: «Bueno, me voy, que tengo que cambiar 2 huevos por frasco de tinte para el pelo.»
10:51 el buhonero echa a andar.
10:51 el buhonero está en Avonlea, junto a camino de el faro.
10:51 el buhonero echa a andar.
10:52 Ana echa a andar.
10:52 el buhonero está en Avonlea, junto al faro.
10:53 el buhonero echa a andar.
10:53 el buhonero se queda de pie.
10:54 el buhonero echa a andar.
10:54 el buhonero está en Avonlea, junto a camino de el faro.
10:55 · Ana: Avonlea, junto a camino de la tienda de Lawson · caminando
10:55 · el buhonero: Avonlea, junto a camino de el faro · de pie
10:56 el buhonero echa a andar.
10:56 el buhonero está en Avonlea, junto al faro.
10:57 Ana dice: «¡Un puente con techo! Es como cruzar el río por adentro de una caja de música.»
10:58 el buhonero echa a andar.
10:58 el buhonero se queda de pie.
11:00 · Ana: Avonlea, junto a camino de la tienda de Lawson · caminando
11:00 · el buhonero: Avonlea, junto al faro · de pie
11:00 el buhonero echa a andar.
11:00 el buhonero se queda de pie.
11:01 el buhonero echa a andar.
11:01 el buhonero se queda de pie.
11:03 el buhonero echa a andar.
11:03 el buhonero se queda de pie.
11:04 el buhonero echa a andar.
11:05 · Ana: Avonlea, junto a camino de el faro · caminando
11:05 · el buhonero: Avonlea, junto al faro · caminando
11:05 el buhonero se queda de pie.
11:07 Ana dice: «¡buhonero! ¡Espera!»
11:07 el buhonero echa a andar.
11:07 el buhonero se queda de pie.
11:08 el buhonero echa a andar.
11:09 el buhonero se queda de pie.
11:09 Ana está en Avonlea, junto al faro.
11:09 Ana dice: «Buenos días. ¿Me cambiaría 2 huevos por 1 frasco de tinte para el pelo?»
11:10 · Ana: Avonlea, junto al faro · de pie
11:10 · el buhonero: Avonlea, junto al faro · de pie
11:10 Ana ahora tiene 4 huevos, 1 tinte.
11:10 Ana echa a andar.
11:12 el buhonero echa a andar.
11:12 el buhonero se queda de pie.
11:13 el buhonero echa a andar.
11:13 el buhonero se queda de pie.
11:14 el buhonero echa a andar.
11:14 el buhonero se queda de pie.
11:15 · Ana: Avonlea, junto a camino de el faro · caminando
11:15 · el buhonero: Avonlea, junto al faro · de pie
11:16 el buhonero echa a andar.
11:16 el buhonero está en Avonlea, junto a camino de el faro.
11:18 el buhonero echa a andar.
11:18 el buhonero está en Avonlea, junto al faro.
11:19 el buhonero echa a andar.
11:20 · Ana: Avonlea, junto a camino de la tienda de Lawson · caminando
11:20 · el buhonero: Avonlea, junto al faro · caminando
11:20 el buhonero se queda de pie.
11:21 el buhonero echa a andar.
11:21 el buhonero se queda de pie.
11:22 el buhonero echa a andar.
11:22 el buhonero se queda de pie.
11:24 el buhonero echa a andar.
11:24 el buhonero se queda de pie.
11:25 · Ana: Avonlea, junto a la tienda de Lawson · caminando
11:25 · el buhonero: Avonlea, junto al faro · de pie
11:26 el buhonero echa a andar.
11:26 el buhonero se queda de pie.
11:27 Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
11:27 Ana dice: «¡Buenos días!»
11:27 el buhonero echa a andar.
11:27 el buhonero se queda de pie.
11:28 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
11:28 Ana se sienta.
11:29 el buhonero echa a andar.
11:29 el buhonero se queda de pie.
11:30 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · sentada
11:30 · el buhonero: Avonlea, junto al faro · de pie
11:30 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
11:31 el buhonero echa a andar.
11:31 el buhonero está en Avonlea, junto a camino de el faro.
11:31 Ana dice: «Bueno, me voy, que tengo que teñirse el pelo.»
11:32 el buhonero está en Avonlea, junto a la escuela.
11:32 el buhonero echa a andar.
11:32 Ana echa a andar.
11:33 el buhonero se queda de pie.
11:34 Ana dice: «¡Srta. Barry! Usted es un espíritu afín, aunque no lo parezca a primera vista.»
11:34 el buhonero echa a andar.
11:35 · Ana: Avonlea, junto a camino de la aldea de Avonlea (el cruce de caminos) · caminando
11:35 · el buhonero: Avonlea, junto a la escuela · caminando
11:35 el buhonero se queda de pie.
11:35 el buhonero echa a andar.
11:36 el buhonero se queda de pie.
11:37 el buhonero echa a andar.
11:38 el buhonero se queda de pie.
11:38 Ana está en Avonlea, junto a camino de la escuela.
11:39 el buhonero echa a andar.
11:39 el buhonero se queda de pie.
11:40 · Ana: Avonlea, junto a camino de la escuela · de pie
11:40 · el buhonero: Avonlea, junto a la escuela · de pie
11:40 Ana se sienta.
11:40 Ana echa a andar.
11:41 el buhonero echa a andar.
11:41 el buhonero se queda de pie.
11:43 el buhonero echa a andar.
11:43 el buhonero se queda de pie.
11:45 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
11:45 · el buhonero: Avonlea, junto a la escuela · de pie
11:45 el buhonero echa a andar.
11:45 el buhonero se queda de pie.
11:47 el buhonero echa a andar.
11:47 el buhonero se queda de pie.
11:49 el buhonero echa a andar.
11:49 el buhonero se queda de pie.
11:50 · Ana: Avonlea, junto a camino de la casa de la Sra. Lynde · caminando
11:50 · el buhonero: Avonlea, junto a la escuela · de pie
11:50 el buhonero echa a andar.
11:50 el buhonero se queda de pie.
11:52 el buhonero echa a andar.
11:52 el buhonero se queda de pie.
11:53 el buhonero echa a andar.
11:53 el buhonero se queda de pie.
11:54 Ana está en la cocina de Tejas Verdes, junto a la puerta.
11:54 Ana echa a andar.
11:55 · Ana: la cocina de Tejas Verdes · caminando
11:55 · el buhonero: Avonlea, junto a la escuela · de pie
11:55 Ana está en la pieza de Ana.
11:55 Ana echa a andar.
11:55 el buhonero echa a andar.
11:55 Ana está en la pieza de Ana, junto al escritorio.
11:55 Ana empieza: teñir; con el frasco de tinte.
11:55 Ana dice: «¡Negro azabache como el ala de un cuervo! Ya está… ¡¿VERDE?!»
11:55 el buhonero se queda de pie.
11:56 el buhonero echa a andar.
11:57 el buhonero se queda de pie.
11:58 Ana termina lo que hacía; ahora tiene 4 huevos; tiene el pelo verde.
11:58 Ana echa a andar.
11:58 el buhonero echa a andar.
11:59 el buhonero se queda de pie.
11:59 Ana está en la cocina de Tejas Verdes, junto a la escalera.
11:59 Ana echa a andar.
11:59 el buhonero echa a andar.
11:59 el buhonero se queda de pie.
12:00 · Ana: la cocina de Tejas Verdes · caminando
12:00 · el buhonero: Avonlea, junto a la escuela · de pie
12:00 Ana está en Avonlea, junto a Tejas Verdes.
12:00 Ana echa a andar.
12:00 Ana se queda de pie.
```
</details>

