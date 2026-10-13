# Auditoría de las acciones

Cada acción se corrió 3 veces; un paso está ✔ solo si salió bien todas. Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.
**Pasos que ocurren como deberían: 96 de 96.** **Acciones en que alguna regla no se cumplió: 0 de 39.**

**Las reglas que siempre deben cumplirse**, se haga lo que se haga (se revisan en cada línea del relato): quien está enfermo está en cama; nadie se queda de pie dentro de un mueble; nadie se queda dentro de las paredes de una casa; nadie está en el agua (salvo en el bote, o patinando sobre el hielo); nadie está encima de otro; los animales de la cuerda van afuera.


## Lavar la loza y barrer la cocina (meta 26: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Marilla le pide a Ana que lave los platos y barra. Ana junta los platos sucios de la mesa, los lleva al fregadero y los lava con agua caliente, sin apuro, unos diez minutos. Lleva la pila de platos limpios al aparador y los guarda. Después toma la escoba y barre la cocina de punta a punta, un buen rato.

- ✔ Recoge los platos sucios de la mesa. — 3 de 3 veces · 10:01, 19 min
- ✔ Los lleva en los brazos. — 3 de 3 veces · 10:04, 16 min
- ✔ Los lava en el fregadero, unos diez minutos. — 3 de 3 veces · 10:04, 16 min
- ✔ Lleva los platos limpios. — 3 de 3 veces · 10:16, 4 min
- ✔ Los guarda en el aparador. — 3 de 3 veces · 10:17, 3 min
- ✔ Barre la cocina con la escoba, un buen rato. — 3 de 3 veces · 10:20, 14 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (38 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 Marilla dice: «Ana, hay que lavar los platos y barrer la cocina. Y nada de quedarse soñando despierta.»
10:00 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
10:00 Ana está en la cocina de Tejas Verdes; empieza a lavar los platos.
10:00 Ana dice: «Lavo los platos con agua bien caliente… ¡y no rompo ninguno!»
10:01 Ana sigue, con los platos que va recogiendo.
10:01 Ana está en la cocina de Tejas Verdes, junto a la mesa.
10:01 Ana dice: «Sí, Marilla.»
10:04 Ana lleva los platos sucios.
10:04 Ana deja los platos sucios; con la palangana con agua.
10:04 Ana está en la cocina de Tejas Verdes, junto al fregadero.
10:05 · Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · lavar los platos · con la palangana con agua
10:10 · Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · lavar los platos · con la palangana con agua
10:15 · Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · lavar los platos · con la palangana con agua
10:16 Ana lleva una pila de platos limpios.
10:17 Ana deja una pila de platos limpios; con el aparador abierto.
10:17 Ana está en la cocina de Tejas Verdes.
10:17 Ana está en la cocina de Tejas Verdes, junto al aparador.
10:20 · Ana: la cocina de Tejas Verdes, junto al aparador · de pie · lavar los platos · con el aparador abierto
10:20 Ana termina de lavar los platos.
10:20 Ana está en la cocina de Tejas Verdes; empieza a barrer la cocina.
10:20 Ana dice: «Barro la cocina, y el patio también.»
10:20 Ana lleva la escoba.
10:20 Ana sigue, con la escoba.
10:23 Ana lleva la escoba.
10:23 Ana sigue, con la escoba.
10:25 · Ana: la cocina de Tejas Verdes · de pie · barrer la cocina · con la escoba
10:25 Ana lleva la escoba.
10:26 Ana sigue, con la escoba.
10:28 Ana lleva la escoba.
10:28 Ana sigue, con la escoba.
10:30 · Ana: la cocina de Tejas Verdes · de pie · barrer la cocina · con la escoba
10:31 Ana lleva la escoba.
10:32 Ana sigue, con la escoba.
10:34 Ana termina de barrer la cocina.
10:35 · Ana: la cocina de Tejas Verdes · de pie
10:35 Marilla dice: «Matthew no lo dice, pero te echa de menos cuando te vas donde Diana.»
```
</details>

## Escribir una carta y mandarla (meta 45: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana sube a su pieza, se sienta al escritorio y escribe una carta a la Srta. Stacy, con el papel sobre el escritorio, sin apuro (una media hora). La dobla y la pone en su sobre. Después baja y va al correo (en la tienda de Lawson), y la deja para que la manden. Ya no la tiene.

- ✔ Escribe sentada al escritorio de su pieza, con la carta sobre él, una media hora. — 3 de 3 veces · 10:02, 25 min
- ✔ Termina con la carta en su sobre. — 3 de 3 veces · 10:27, 25 min
- ✔ Va al correo (en la tienda de Lawson). — 3 de 3 veces · 10:50, 4 min
- ✔ La deja: ya no la tiene. — 3 de 3 veces · 10:52, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (31 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
10:00 Ana está en la cocina de Tejas Verdes; empieza a escribir una carta.
10:00 Ana dice: «Querida Srta. Stacy:»
10:02 Ana entra a la pieza de Ana.
10:02 Ana está en la pieza de Ana, junto al escritorio; se sienta; con la banqueta y la carta sobre la mesa.
10:03 Ana dice: «Aquí en Tejas Verdes los cerezos están en flor.»
10:04 Ana dice: «Le escribo para contarle que terminé de leer el libro que nos recomendó, y que lloré en el capítulo once.»
10:04 Ana dice: «Estuve pensando en lo que dijo de los adjetivos: esta carta tiene solo los indispensables. Bueno, casi.»
10:05 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa
10:05 Ana dice: «Quería decirle que gracias a usted estudiar ya no me parece un castigo, sino una aventura.»
10:06 Ana dice: «Su alumna que la quiere, Ana Shirley»
10:10 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa
10:15 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa
10:20 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa
10:25 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa
10:27 Ana se levanta; termina de escribir una carta; ahora tiene una carta.
10:27 Ana entra a la cocina de Tejas Verdes, junto a la escalera.
10:27 Ana sale, junto a Tejas Verdes.
10:30 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:35 · Ana: Avonlea, no lejos del campo de heno · caminando
10:40 · Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando
10:45 · Ana: Avonlea, no lejos de la escuela · caminando
10:47 El médico dice: «Qué lindo día para tender la ropa.»
10:48 Una granjera dice: «Ya lo creo. Y ayer que no paró de llover.»
10:50 · Ana: Avonlea, junto a la tienda de Lawson · caminando
10:50 Ana está en Avonlea, junto a la tienda de Lawson.
10:51 Ana dice: «Para la Srta. Stacy, en la pensión de Avonlea.»
10:52 Ana ya no tiene nada.
10:53 Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
```
</details>

## La compota de Marilla (meta 8: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Marilla quiere hacer compota para el invierno, pero no tiene manzanas: se las pide a Ana. Ana va a los manzanos, recoge las manzanas y se las lleva a Marilla a la cocina. Marilla las pela y las cuece en la estufa, removiendo, una media hora por tanda (quiere dos frascos: hace dos tandas) o más. Al final tiene la compota.

- ✔ Ana recoge manzanas de los manzanos. — 3 de 3 veces · 10:11, 11 min
- ✔ Ana tiene las manzanas. — 3 de 3 veces · 10:22, 24 min
- ✔ Se las da a Marilla en la cocina. — 3 de 3 veces · 10:45, 0 min
- ✔ Marilla tiene las manzanas. — 3 de 3 veces · 10:46, 61 min
- ✔ Marilla cocina la compota en la estufa, una media hora o más. — 3 de 3 veces · 10:47, 30 min
- ✔ Marilla tiene la compota. — 3 de 3 veces · 11:17, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (88 líneas)</summary>

```
10:00 Al empezar, Marilla está en Avonlea, junto a Tejas Verdes.
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 · Marilla: Avonlea, junto a Tejas Verdes · de pie
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 Marilla dice: «¿Me traerías 6 manzanas?»
10:00 Ana dice: «Sí, cómo no. Ahora mismo.»
10:00 Marilla entra a la cocina de Tejas Verdes, junto a la puerta.
10:05 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:05 · Ana: Avonlea, junto al Bosque Encantado · caminando
10:10 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:10 · Ana: Avonlea, no lejos del huerto de los Barry · caminando
10:11 Minnie May Barry dice: «¡Buenos días! ¿Ya supo lo de la vaca de los Cuthbert?»
10:11 Ana está en Avonlea, junto al huerto de los Barry; empieza a recoger 3 manzanas.
10:11 Mary Joe dice: «¡Si lo sabe todo Avonlea! Esa vaca es más lista que el Sr. Harrison.»
10:12 Ana sigue, con el canastito.
10:15 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:15 · Ana: Avonlea, junto al huerto de los Barry · de pie · recoger 3 manzanas · con el canastito
10:17 Ana sigue, con el canastito.
10:20 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:20 · Ana: Avonlea, junto al huerto de los Barry · de pie · recoger 3 manzanas · con el canastito
10:22 Ana termina de recoger 3 manzanas; ahora tiene 3 manzanas.
10:22 Ana empieza a recoger 3 manzanas.
10:22 Ana sigue, con el canastito.
10:25 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:25 · Ana: Avonlea, junto al huerto de los Barry · de pie · recoger 3 manzanas · con el canastito
10:28 Ana sigue, con el canastito.
10:30 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:30 · Ana: Avonlea, junto al huerto de los Barry · de pie · recoger 3 manzanas · con el canastito
10:33 Ana termina de recoger 3 manzanas; ahora tiene 6 manzanas.
10:33 Diana dice: «Mamá dice que puedo salir hasta que se ponga el sol. ¿Vamos al lago?»
10:35 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:35 · Ana: Avonlea, junto al huerto de los Barry · caminando
10:40 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:40 · Ana: Avonlea, no lejos del Bosque Encantado · caminando
10:45 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:45 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
10:45 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
10:45 Ana empieza a darle 6 manzanas a Marilla; con lo que entrega.
10:46 Marilla ahora tiene 6 manzanas.
10:46 Marilla dice: «Gracias.»
10:46 Ana termina de darle 6 manzanas a Marilla; ya no tiene nada.
10:46 Ana dice: «¡Qué día para hacer algo bonito!»
10:46 Ana sale, junto a Tejas Verdes.
10:46 Marilla empieza a cocinar una compota de manzana.
10:47 Marilla está en la cocina de Tejas Verdes, junto a la estufa; con el bol.
10:49 Ana está en Avonlea, junto a los arbustos de bayas.
10:50 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol
10:50 · Ana: Avonlea, junto a los arbustos de bayas · de pie
10:52 Ana está en Avonlea, junto a la entrada del campo de avena del Sr. Harrison.
10:55 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol
10:55 · Ana: Avonlea, junto a la entrada del campo de avena del Sr. Harrison · caminando
10:56 Ana está en Avonlea, junto a la granja del Sr. Harrison.
10:56 El Sr. Harrison dice: «¿Esa vaca tuya se ha portado bien hoy? Más le vale.»
11:00 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol
11:00 · Ana: Avonlea, junto a la granja del Sr. Harrison · de pie
11:00 Ana se sienta.
11:05 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol
11:05 · Ana: Avonlea, junto a la granja del Sr. Harrison · sentada
11:07 Ana se levanta.
11:10 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol
11:10 · Ana: Avonlea, junto al campo de avena del Sr. Harrison · caminando
11:10 Ana está en Avonlea, junto al campo de avena del Sr. Harrison.
11:13 Ana está en Avonlea, junto a los arbustos de bayas.
11:15 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol
11:15 · Ana: Avonlea, junto a los arbustos de bayas · caminando
11:16 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
11:17 Ana está en la cocina de Tejas Verdes.
11:17 Marilla termina de cocinar una compota de manzana; ahora tiene 3 manzanas, una compota de manzana.
11:17 Marilla empieza a cocinar una compota de manzana.
11:20 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana
11:20 · Ana: la cocina de Tejas Verdes · de pie
11:25 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana
11:25 · Ana: la cocina de Tejas Verdes · de pie
11:27 Ana dice: «Se me ocurrió una idea... ¡de esas que solo tengo yo!»
11:29 Ana sale.
11:30 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana
11:30 · Ana: Avonlea · caminando
11:30 Matthew dice: «¿Viste las flores junto al camino? Bueno, pues... me hicieron pensar en ti.»
11:35 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana
11:35 · Ana: Avonlea · de pie
11:35 Ana se sienta.
11:40 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana
11:40 · Ana: Avonlea · sentada
11:45 · Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana
11:45 · Ana: Avonlea · sentada
11:46 Ana se levanta.
11:47 Marilla termina de cocinar una compota de manzana; ahora tiene 2 compotas de manzana.
11:47 Marilla está en la cocina de Tejas Verdes.
```
</details>

## Matthew trae huevos (meta 20: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana le pide huevos a Matthew. Matthew va donde están las gallinas, junto al granero, se agacha a sacarlos de los nidos y los junta. Se los lleva a Ana, que los recibe.

- ✔ Matthew se agacha junto al granero, donde están las gallinas, a sacar los huevos. — 3 de 3 veces · 09:06, 8 min
- ✔ Matthew tiene los huevos. — 3 de 3 veces · 09:13, 3 min
- ✔ Se los da a Ana. — 3 de 3 veces · 09:16, 0 min
- ✔ Ana tiene los huevos. — 3 de 3 veces · 09:16, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (25 líneas)</summary>

```
09:00 Al empezar, Matthew está en Avonlea, junto a la huerta de Tejas Verdes; ahora tiene 5 dólares.
09:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
09:00 Ana dice: «¡Matthew! ¡Espera!»
09:00 · Matthew: Avonlea, junto a la huerta de Tejas Verdes · caminando
09:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
09:00 Matthew dice: «¿Sí?»
09:00 Ana dice: «¿Me traerías 6 huevos?»
09:00 Matthew dice: «Por supuesto, querida.»
09:00 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
09:04 Matthew está en Avonlea, junto al gallinero.
09:04 Matthew empieza a recoger 6 huevos.
09:05 · Matthew: Avonlea, junto al gallinero · de pie · recoger 6 huevos
09:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie
09:06 Matthew se agacha; con el canastito.
09:09 Matthew se levanta.
09:10 · Matthew: Avonlea, junto al gallinero · de pie · recoger 6 huevos
09:10 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie
09:10 Matthew se agacha; con el canastito.
09:13 Matthew se levanta; termina de recoger 6 huevos; ahora tiene 5 dólares, 6 huevos.
09:15 · Matthew: Avonlea, junto a Tejas Verdes · caminando
09:15 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie
09:16 Matthew está en Avonlea, junto a la huerta de Tejas Verdes; empieza a darle 6 huevos a Ana; con lo que entrega.
09:16 Matthew termina de darle 6 huevos a Ana; ahora tiene 5 dólares.
09:16 Ana ahora tiene 6 huevos.
09:16 Ana dice: «Gracias.»
```
</details>

## El tinte del buhonero (meta 59: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Pasa el buhonero por Tejas Verdes. Ana le cambia unos huevos por un frasco de tinte que promete pelo negro como el ala de un cuervo. Sube a su pieza y, frente al espejo del lavatorio, se tiñe el pelo con cuidado, un buen rato. Cuando termina, el pelo le ha quedado... verde.

- ✔ Ana le pide el tinte al buhonero (a cambio de huevos). — 3 de 3 veces · 10:50, 7 min
- ✔ Ana tiene el tinte. — 3 de 3 veces · 11:15, 65 min
- ✔ Se tiñe frente al espejo del lavatorio de su pieza, un buen rato. — 3 de 3 veces · 12:05, 15 min
- ✔ El pelo le queda verde. — 3 de 3 veces · 12:20, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (130 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 Al empezar, el buhonero está en Avonlea, junto a la huerta de Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 · el buhonero: Avonlea, junto a la huerta de Tejas Verdes · caminando
10:01 Ana está en Avonlea, junto al gallinero; empieza a recoger 6 huevos.
10:01 Matthew dice: «Bueno, pues... sí, es un día precioso, Ana. Ya lo creo.»
10:02 Ana se agacha; con el canastito.
10:05 · Ana: Avonlea, junto al gallinero · agachada · recoger 6 huevos · con el canastito
10:05 · el buhonero: Avonlea, no lejos del campo de heno · caminando
10:05 Ana se levanta.
10:05 Ana se agacha; con el canastito.
10:08 Ana se levanta; termina de recoger 6 huevos; ahora tiene 6 huevos.
10:10 · Ana: Avonlea, junto al corral de Tejas Verdes · caminando
10:10 · el buhonero: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:15 · Ana: Avonlea, no lejos del campo de heno · caminando
10:15 · el buhonero: Avonlea, no lejos de la casa de Robert Bell · caminando
10:20 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:20 · el buhonero: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando
10:25 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:25 · el buhonero: Avonlea, no lejos del salón del pueblo · caminando
10:30 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:30 · el buhonero: Avonlea, no lejos de la colina · caminando
10:34 El buhonero está en Avonlea, junto a la casa parroquial.
10:35 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:35 · el buhonero: Avonlea, junto a la casa parroquial · de pie
10:40 · Ana: Avonlea, no lejos de la casa de Robert Bell · caminando
10:40 · el buhonero: Avonlea, junto a la casa parroquial · de pie
10:44 Janet King dice: «¿Cómo vienen las papas este año?»
10:44 El médico dice: «Buenas, si no llueve demasiado.»
10:45 · Ana: Avonlea, junto a la aldea · caminando
10:45 · el buhonero: Avonlea, junto a la casa parroquial · de pie
10:45 Ana está en Avonlea, junto a la aldea.
10:45 Ana dice: «¡Buenos días!»
10:45 Una granjera dice: «¡Buenos días, Ana! ¿Cómo están todos en casa?»
10:46 El buhonero está en Avonlea, junto al faro.
10:46 Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»
10:47 Una granjera dice: «¡Qué imaginación tienes, niña!»
10:48 Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»
10:49 Una granjera dice: «Nunca lo había pensado así.»
10:50 · Ana: Avonlea, junto a la aldea · de pie
10:50 · el buhonero: Avonlea, junto al faro · caminando
10:50 Ana dice: «Bueno, me voy, que tengo que cambiar 2 huevos por un frasco de tinte para el pelo.»
10:55 · Ana: Avonlea, no lejos de la tienda de Lawson · caminando
10:55 · el buhonero: Avonlea, junto al faro · de pie
10:56 Ana está en Avonlea, no lejos de la tienda de Lawson.
10:56 Ana dice: «¡Buenos días!»
10:57 Ana dice: «¡Un puente con techo! Es como cruzar el río por adentro de una caja de música.»
10:57 Un granjero dice: «¡Qué gusto verle, Ana!»
10:57 Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»
10:58 Un granjero dice: «¡Qué imaginación tienes, niña!»
10:59 Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»
11:00 · Ana: Avonlea, no lejos de la tienda de Lawson · de pie
11:00 · el buhonero: Avonlea, junto al faro · de pie
11:00 Un granjero dice: «Nunca lo había pensado así.»
11:01 Ana dice: «Bueno, me voy, que tengo que cambiar 2 huevos por un frasco de tinte para el pelo.»
11:05 · Ana: Avonlea, no lejos de la tienda de Lawson · caminando
11:05 · el buhonero: Avonlea, junto al faro · de pie
11:10 · Ana: Avonlea, no lejos del faro · caminando
11:10 · el buhonero: Avonlea, junto al faro · de pie
11:12 Ana dice: «¡Buhonero! ¡Espera!»
11:12 El buhonero dice: «¿Qué pasa?»
11:14 El buhonero dice: «Un tinte que deja el pelo negro azabache, señorita. Garantizado.»
11:14 Ana dice: «Buenos días. ¿Me cambiaría 2 huevos por un frasco de tinte para el pelo?»
11:14 Ana está en Avonlea, junto al faro.
11:15 · Ana: Avonlea, junto al faro · de pie
11:15 · el buhonero: Avonlea, junto al faro · de pie
11:15 El buhonero dice: «Este tinte deja el pelo negro como el ala de un cuervo, señorita. ¡Y no se va con el lavado!»
11:15 Ana ahora tiene 4 huevos, un frasco de tinte para el pelo.
11:15 El buhonero dice: «¡Negro azabache garantizado! Palabra de honor.»
11:16 Ana dice: «¡Buenos días!»
11:16 El buhonero dice: «¡Buenos días, Ana! ¿Cómo están todos en casa?»
11:17 Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»
11:18 El buhonero dice: «Nunca lo había pensado así.»
11:19 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
11:20 · Ana: Avonlea, junto al faro · de pie
11:20 · el buhonero: Avonlea, junto al faro · de pie
11:20 El buhonero dice: «Esta niña... qué cosas dice.»
11:21 Ana dice: «Bueno, me voy, que tengo que teñirme el pelo.»
11:25 · Ana: Avonlea, no lejos del faro · caminando
11:25 · el buhonero: Avonlea, junto al faro · de pie
11:30 · Ana: Avonlea, no lejos de la tienda de Lawson · caminando
11:30 · el buhonero: Avonlea, junto al faro · de pie
11:32 El buhonero está en Avonlea, junto a la escuela.
11:34 La Srta. Hetty King dice: «Los niños de hoy no saben estarse quietos. En mis tiempos...»
11:35 · Ana: Avonlea, no lejos de la tienda de Lawson · caminando
11:35 · el buhonero: Avonlea, junto a la escuela · de pie
11:38 Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
11:38 Ana dice: «¡Buenos días, Olivia King!»
11:39 La Srta. Josephine Barry dice: «¡La niña Ana! Desde que me saltaste encima en la cama, no me había reído tanto en años.»
11:39 Olivia King dice: «¡Qué gusto verle, Ana!»
11:40 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · de pie
11:40 · el buhonero: Avonlea, junto a la escuela · de pie
11:40 Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»
11:41 Ana dice: «¡Srta. Barry! Usted es un espíritu afín, aunque no lo parezca a primera vista.»
11:41 Olivia King dice: «Nunca lo había pensado así.»
11:42 Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»
11:43 Olivia King dice: «Tiempo tienes para decidirlo.»
11:44 Ana dice: «Bueno, me voy, que tengo que teñirme el pelo.»
11:45 · Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando
11:45 · el buhonero: Avonlea, junto a la escuela · caminando
11:49 Alec King dice: «Buen día para la siega, Ana. ¡Si no llueve!»
11:50 · Ana: Avonlea, no lejos de la escuela · caminando
11:50 · el buhonero: Avonlea, junto a la escuela · caminando
11:55 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
11:55 · el buhonero: Avonlea, junto a la escuela · de pie
11:55 Thomas Lynde dice: «Buenas. Rachel está adentro. Ella habla por los dos, ¿sabes?»
12:00 · Ana: Avonlea, no lejos del campo de heno · caminando
12:00 · el buhonero: Avonlea, junto a la escuela · de pie
12:03 Jerry Buote dice: «Oui, oui... ya voy, ya voy. ¡Esa vaca no se quiere mover!»
12:03 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
12:03 Marilla dice: «Si quieres cocinar, la estufa está encendida. Cuidado con no quemar nada esta vez.»
12:04 Ana entra a la pieza de Ana.
12:05 · Ana: la pieza de Ana · caminando
12:05 · el buhonero: Avonlea, junto a la escuela · de pie
12:05 Ana está en la pieza de Ana, junto al escritorio; empieza a teñirse el pelo.
12:05 Ana sigue, con el frasco de tinte.
12:05 Ana dice: «¡Negro azabache como el ala de un cuervo! Ya verán…»
12:05 Ana está en la pieza de Ana, junto al lavatorio y su espejo.
12:10 · Ana: la pieza de Ana, junto al lavatorio y su espejo · de pie · teñirse el pelo · con el frasco de tinte
12:10 · el buhonero: Avonlea, junto a la escuela · de pie
12:15 · Ana: la pieza de Ana, junto al lavatorio y su espejo · de pie · teñirse el pelo · con el frasco de tinte
12:15 · el buhonero: Avonlea, junto a la escuela · de pie
12:18 El buhonero está en Avonlea, junto a la iglesia.
12:20 · Ana: la pieza de Ana, junto al lavatorio y su espejo · de pie · teñirse el pelo · con el frasco de tinte
12:20 · el buhonero: Avonlea, junto a la iglesia · de pie
12:20 Ana termina de teñirse el pelo; ahora tiene 4 huevos; tiene el pelo verde.
12:20 Ana dice: «Ya está… a ver… ¡¿VERDE?! ¡Mi pelo está VERDE!»
12:21 Ana entra a la cocina de Tejas Verdes, junto a la escalera.
12:22 Ana está en la cocina de Tejas Verdes, junto a la mesa.
12:22 Matthew dice: «Ya lo creo, ya lo creo. Anda, ve a jugar un rato, que el día está lindo.»
```
</details>

## Vender la vaca (meta 0: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana va al granero y descuelga la cuerda de su gancho. Le pone la cuerda a la vaca y la lleva, despacio, hasta quien la compra. Hacen el trato y Ana se queda con el dinero.

- ✔ Toma la cuerda en el granero. — 3 de 3 veces · 09:02, 2 min
- ✔ Lleva a la vaca de la cuerda. — 3 de 3 veces · 09:05, 29 min
- ✔ Vuelve con el dinero de la venta. — 3 de 3 veces · 09:35, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (27 líneas)</summary>

```
09:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
09:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
09:02 Matthew dice: «Bueno, pues... sí, es un día precioso, Ana. Ya lo creo.»
09:02 Ana está en Avonlea, junto al granero; empieza a tomar una cuerda.
09:02 Ana sigue, con la cuerda.
09:03 Ana termina de tomar una cuerda; ahora tiene una cuerda.
09:05 · Ana: Avonlea, junto al granero · caminando
09:05 Ana lleva de la cuerda a Dolly.
09:05 Ana está en Avonlea, junto a la entrada del corral de Tejas Verdes.
09:10 · Ana: Avonlea, no lejos del campo de heno · caminando
09:13 Ana está en Avonlea, no lejos de la casa de la Sra. Lynde.
09:13 Ana dice: «¿Qué pensarán los animales de nosotros?»
09:15 · Ana: Avonlea, no lejos de la casa de la Sra. Lynde · de pie
09:20 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
09:25 · Ana: Avonlea, no lejos de la casa de Robert Bell · caminando
09:25 Una vecina dice: «Mira qué cielo. Así da gusto salir.»
09:26 Ana está en Avonlea, no lejos de la escuela.
09:30 · Ana: Avonlea, no lejos de la escuela · caminando
09:33 El Sr. Shearer dice: «Buen día, señorita. ¿Algún animal para vender?»
09:34 Ana dice: «¿Le interesaría comprar esta vaca? Es buena lechera.»
09:34 Ana está en Avonlea, junto a la aldea.
09:34 El Sr. Shearer dice: «Déjeme verla bien… los dientes, las patas… Sí, me conviene.»
09:35 · Ana: Avonlea, junto a la aldea · de pie
09:35 Ana ahora tiene una cuerda, 20 dólares; suelta la cuerda.
09:35 El Sr. Shearer dice: «¡Trato hecho! Buena vaca.»
09:35 Ana dice: «Mi imaginación no me deja quieta.»
09:35 Ana se sienta.
```
</details>

## Una cinta para el pelo (trueque) (meta 1: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana quiere una cinta y no tiene dinero. Va a los arbustos, se agacha y junta bayas en su canastito. Las lleva a la tienda de Lawson y las cambia por una cinta.

- ✔ Se agacha a juntar bayas. — 3 de 3 veces · 09:01, 6 min
- ✔ Tiene las bayas. — 3 de 3 veces · 09:07, 50 min
- ✔ Va a la tienda de Lawson. — 3 de 3 veces · 09:49, 9 min
- ✔ Tiene la cinta. — 3 de 3 veces · 09:57, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (46 líneas)</summary>

```
09:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
09:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
09:00 Ana empieza a recoger 3 bayas.
09:01 Ana está en Avonlea, junto a los arbustos de bayas; se agacha; con el canastito.
09:04 Ana se levanta.
09:04 Ana se agacha; con el canastito.
09:05 · Ana: Avonlea, junto a los arbustos de bayas · agachada · recoger 3 bayas · con el canastito
09:07 Ana se levanta; termina de recoger 3 bayas; ahora tiene 3 bayas.
09:07 Ana empieza a recoger 3 bayas.
09:07 Ana se agacha; con el canastito.
09:10 · Ana: Avonlea, junto a los arbustos de bayas · agachada · recoger 3 bayas · con el canastito
09:10 Ana se levanta.
09:11 Ana se agacha; con el canastito.
09:14 Ana se levanta; termina de recoger 3 bayas; ahora tiene 6 bayas.
09:14 Ana empieza a recoger 3 bayas.
09:14 Ana se agacha; con el canastito.
09:15 · Ana: Avonlea, junto a los arbustos de bayas · agachada · recoger 3 bayas · con el canastito
09:17 Ana se levanta.
09:19 Ana se agacha; con el canastito.
09:20 · Ana: Avonlea, junto a los arbustos de bayas · agachada · recoger 3 bayas · con el canastito
09:22 Ana se levanta; termina de recoger 3 bayas; ahora tiene 9 bayas.
09:25 · Ana: Avonlea, junto a Tejas Verdes · caminando
09:30 · Ana: Avonlea, no lejos del campo de heno · caminando
09:35 · Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando
09:37 Ana está en Avonlea, no lejos de la casa de Robert Bell.
09:37 Ana dice: «¿Qué pensarán los animales de nosotros?»
09:40 · Ana: Avonlea, no lejos de la casa de Robert Bell · de pie
09:41 Una vecina dice: «Lindo día, ¿verdad? Dicen que mañana llueve.»
09:45 · Ana: Avonlea, no lejos de la aldea · caminando
09:49 Ana está en Avonlea, junto a la tienda de Lawson.
09:49 Ana dice: «¡Buenos días!»
09:49 La Sra. Spencer dice: «¡Buenos días, Ana! ¿Cómo están todos en casa?»
09:50 · Ana: Avonlea, junto a la tienda de Lawson · de pie
09:50 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
09:51 La Sra. Spencer dice: «Esta niña... qué cosas dice.»
09:52 Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»
09:53 La Sra. Spencer dice: «Tiempo tienes para decidirlo.»
09:54 Ana dice: «Bueno, me voy, que tengo que cambiar 9 bayas por una cinta para el pelo.»
09:55 · Ana: Avonlea, junto a la tienda de Lawson · de pie
09:55 Ana entra a la tienda de Lawson.
09:55 El Sr. Lawson dice: «¿Qué te manda Marilla hoy? ¿Azúcar? ¿Hilo?»
09:56 Ana dice: «Buenos días, Sr. Lawson. ¿Me cambiaría 9 bayas por una cinta para el pelo?»
09:56 El Sr. Lawson dice: «Veamos lo que traes… Sí, me sirven. Un momento.»
09:57 Ana ahora tiene una cinta para el pelo.
09:57 El Sr. Lawson dice: «Trato hecho. ¡Que lo disfrutes!»
09:57 Ana sale.
```
</details>

## Un regalo para Marilla (meta 2: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana quiere regalarle algo a Marilla. Va a la huerta, se agacha y corta un ramo de flores. Entra a la cocina y se lo da a Marilla, que lo recibe.

- ✔ Corta flores en la huerta, agachada. — 3 de 3 veces · 10:01, 3 min
- ✔ Tiene el ramo. — 3 de 3 veces · 10:04, 2 min
- ✔ Se lo da a Marilla en la cocina. — 3 de 3 veces · 10:05, 0 min
- ✔ Marilla tiene el ramo. — 3 de 3 veces · 10:05, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (18 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 · Marilla: la cocina de Tejas Verdes · sentada
10:00 Marilla se levanta.
10:01 Ana está en Avonlea, junto a la huerta de Tejas Verdes; empieza a recoger un ramo de flores.
10:01 Ana se agacha; con el canastito.
10:04 Ana se levanta; termina de recoger un ramo de flores; ahora tiene un ramo de flores.
10:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
10:05 · Marilla: la cocina de Tejas Verdes · de pie
10:05 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
10:05 Marilla dice: «Si quieres cocinar, la estufa está encendida. Cuidado con no quemar nada esta vez.»
10:05 Ana va por la cocina de Tejas Verdes; empieza a darle un ramo de flores a Marilla; con lo que entrega.
10:05 Ana termina de darle un ramo de flores a Marilla; ya no tiene nada.
10:05 Marilla ahora tiene un ramo de flores.
10:05 Marilla dice: «¡Qué lindo detalle! Muchas gracias.»
10:06 Ana dice: «¡Qué día para hacer algo bonito!»
10:07 Ana sale.
```
</details>

## Matthew trae azúcar (meta 6: cumplida, cumplida, cumplida)

**Lo que debería pasar:** A Marilla le falta azúcar y se la pide a Matthew. Matthew va a la tienda de Lawson y la compra. Vuelve a la cocina y se la da.

- ✔ Matthew va a la tienda. — 3 de 3 veces · 10:24, 2 min
- ✔ Compra el azúcar. — 3 de 3 veces · 10:25, 23 min
- ✔ Se la da a Marilla en la cocina. — 3 de 3 veces · 10:48, 0 min
- ✔ Marilla tiene el azúcar. — 3 de 3 veces · 10:49, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (40 líneas)</summary>

```
10:00 Al empezar, Matthew está en Avonlea, junto al granero; ahora tiene 5 dólares.
10:00 Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.
10:00 · Matthew: Avonlea, junto al granero · caminando
10:00 · Marilla: la cocina de Tejas Verdes · sentada
10:00 Marilla se levanta.
10:05 · Matthew: Avonlea, no lejos del campo de heno · caminando
10:05 · Marilla: la cocina de Tejas Verdes · de pie
10:10 · Matthew: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:10 · Marilla: la cocina de Tejas Verdes · de pie
10:13 Matthew está en Avonlea, no lejos de la casa de Robert Bell.
10:13 Matthew dice: «Buen animal, sí... buen animal.»
10:15 · Matthew: Avonlea, no lejos de la casa de Robert Bell · de pie
10:15 · Marilla: la cocina de Tejas Verdes · de pie
10:20 · Matthew: Avonlea, no lejos de la aldea · caminando
10:20 · Marilla: la cocina de Tejas Verdes · de pie
10:24 Matthew entra a la tienda de Lawson.
10:24 Matthew dice: «Buenos días, Sr. Lawson. ¿Me daría una taza de azúcar? A la libreta de los Cuthbert.»
10:25 · Matthew: la tienda de Lawson · de pie
10:25 · Marilla: la cocina de Tejas Verdes · de pie
10:25 El Sr. Lawson dice: «Cómo no. Déjame pesarla…»
10:25 Matthew ahora tiene 5 dólares, una taza de azúcar.
10:25 El Sr. Lawson dice: «Anotado en la libreta de los Cuthbert. Saludos a Marilla.»
10:25 Matthew sale.
10:25 Matthew dice: «Buen animal, sí... buen animal.»
10:30 · Matthew: Avonlea · caminando
10:30 · Marilla: la cocina de Tejas Verdes · de pie
10:35 · Matthew: Avonlea · caminando
10:35 · Marilla: la cocina de Tejas Verdes · de pie
10:40 · Matthew: Avonlea · caminando
10:40 · Marilla: la cocina de Tejas Verdes · de pie
10:45 · Matthew: Avonlea · caminando
10:45 · Marilla: la cocina de Tejas Verdes · de pie
10:48 Matthew entra a la cocina de Tejas Verdes, junto a la puerta.
10:48 Matthew está en la cocina de Tejas Verdes; empieza a darle una taza de azúcar a Marilla; con lo que entrega.
10:49 Matthew termina de darle una taza de azúcar a Marilla; ahora tiene 5 dólares.
10:49 Marilla ahora tiene una taza de azúcar.
10:49 Marilla dice: «Gracias.»
10:49 Matthew sale.
10:50 · Matthew: Avonlea · de pie
10:50 · Marilla: la cocina de Tejas Verdes · de pie
```
</details>

## El té con la Sra. Allan (meta 14: cumplida, cumplida, cumplida)

**Lo que debería pasar:** La Sra. Allan invita a Ana a tomar el té. Prepara el té en su casa. Ana llega y se sientan juntas a la mesa, con las tazas, a conversar sin apuro, una media hora.

- ✔ La Sra. Allan prepara el té. — 3 de 3 veces · 16:46, 30 min
- ✔ Ana toma el té sentada a la mesita, en la salita de la casa parroquial, una media hora. — 3 de 3 veces · 17:28, 30 min
- ✔ La Sra. Allan se sienta con ella a la mesita, con su taza, una media hora. — 3 de 3 veces · 17:28, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (172 líneas)</summary>

```
15:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
15:00 Al empezar, la Sra. Allan está en Avonlea, junto a la iglesia.
15:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
15:00 · la Sra. Allan: Avonlea, junto a la iglesia · caminando
15:01 Ana se sienta.
15:02 La Sra. Allan está en Avonlea, no lejos de la colina.
15:02 La Sra. Allan dice: «¡Buenas tardes!»
15:02 Ana dice: «¡A ver qué descubro por ahí!»
15:02 Un granjero dice: «¡Qué gusto verle!»
15:03 La Sra. Allan dice: «¿Cómo vienen las papas este año?»
15:04 Un granjero dice: «Buenas, si no llueve demasiado.»
15:05 · Ana: Avonlea, junto a Tejas Verdes · sentada
15:05 · la Sra. Allan: Avonlea, no lejos de la colina · de pie
15:05 Matthew dice: «Bueno, pues... sí, es un día precioso, Ana. Ya lo creo.»
15:05 La Sra. Allan dice: «Qué lindo día para tender la ropa.»
15:05 Un granjero dice: «Ya lo creo. Y ayer que no paró de llover.»
15:06 La Sra. Allan dice: «Bueno, me voy, que tengo que pedirle a Ana que venga a tomar el té más tarde.»
15:09 Ana se levanta.
15:10 · Ana: Avonlea, junto a Tejas Verdes · caminando
15:10 · la Sra. Allan: Avonlea, no lejos de la casa de Robert Bell · caminando
15:10 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
15:15 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
15:15 · la Sra. Allan: Avonlea, no lejos de la aldea de Avonlea (el cruce de caminos) · caminando
15:16 La Sra. Allan está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).
15:16 La Sra. Allan dice: «¡Buenas tardes!»
15:16 Ana está en Avonlea, junto al Camino Blanco de las Delicias.
15:16 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
15:16 La Srta. Hetty King dice: «¡Qué gusto verle!»
15:17 La Sra. Allan dice: «¿Cómo vienen las papas este año?»
15:18 Ana se sienta.
15:18 Ana se levanta.
15:18 La Srta. Hetty King dice: «Buenas, si no llueve demasiado.»
15:19 La Sra. Allan dice: «Qué lindo día para tender la ropa.»
15:19 La Srta. Hetty King dice: «Ya lo creo. Y ayer que no paró de llover.»
15:20 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
15:20 · la Sra. Allan: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · de pie
15:20 La Sra. Allan dice: «Bueno, me voy, que tengo que pedirle a Ana que venga a tomar el té más tarde.»
15:23 Ana está en Avonlea, no lejos del Bosque Encantado.
15:25 · Ana: Avonlea, no lejos del puente del arroyo · caminando
15:25 · la Sra. Allan: Avonlea, no lejos de la aldea · caminando
15:26 Ana está en Avonlea, junto al puente del arroyo.
15:30 · Ana: Avonlea, no lejos del puente del arroyo · caminando
15:30 · la Sra. Allan: Avonlea, no lejos de la casa de la Sra. Lynde · caminando
15:30 Ana está en Avonlea, no lejos del puente del arroyo.
15:30 Ana está en Avonlea, no lejos del huerto de los Barry.
15:32 Ana está en Avonlea, junto al huerto de los Barry.
15:34 Mary Joe dice: «Sí, se me acabó el azúcar. Con tanta compota...»
15:35 · Ana: Avonlea, junto al huerto de los Barry · de pie
15:35 · la Sra. Allan: Avonlea, no lejos de la casa de la Sra. Lynde · caminando
15:36 Diana dice: «Los manzanos están llenos este año. Toma las que quieras.»
15:40 · Ana: Avonlea, junto al huerto de los Barry · de pie
15:40 · la Sra. Allan: Avonlea, no lejos del Bosque Encantado · caminando
15:40 Ana se sienta.
15:45 · Ana: Avonlea, junto al huerto de los Barry · sentada
15:45 · la Sra. Allan: Avonlea, no lejos del puente del arroyo · caminando
15:48 La Sra. Allan está en Avonlea, junto a La Cuesta del Huerto.
15:48 La Sra. Allan dice: «¡Buenas tardes, Diana!»
15:49 Diana dice: «¡Buenas tardes! ¿Cómo están todos en casa?»
15:50 · Ana: Avonlea, junto al huerto de los Barry · sentada
15:50 · la Sra. Allan: Avonlea, junto a La Cuesta del Huerto · de pie
15:50 La Sra. Allan dice: «¿Cómo vienen las papas este año?»
15:50 Diana dice: «Buenas, si no llueve demasiado.»
15:51 La Sra. Allan dice: «Qué lindo día para tender la ropa.»
15:52 Diana dice: «Ya lo creo. Y ayer que no paró de llover.»
15:53 La Sra. Allan dice: «Bueno, me voy, que tengo que pedirle a Ana que venga a tomar el té más tarde.»
15:54 La Sra. Allan dice: «¿Cómo vienen las papas este año?»
15:55 · Ana: Avonlea, junto al huerto de los Barry · sentada
15:55 · la Sra. Allan: Avonlea, junto a La Cuesta del Huerto · de pie
15:55 La Sra. Allan dice: «¿Vendrías a tomar el té conmigo esta tarde, a las 18:00? En la casa parroquial.»
15:55 Minnie May Barry dice: «Buenas, si no llueve demasiado.»
15:55 Ana dice: «¡Sí, me encantaría! Allí estaré.»
16:00 · Ana: Avonlea, junto al huerto de los Barry · sentada
16:00 · la Sra. Allan: Avonlea, no lejos del puente del arroyo · caminando
16:00 Diana dice: «¡Ana, mi alma gemela! Te estaba esperando.»
16:04 Mary Joe dice: «¡Ay, señorita Ana! Yo no sé nada de enfermedades, menos mal que usted vino aquella noche.»
16:05 · Ana: Avonlea, junto al huerto de los Barry · sentada
16:05 · la Sra. Allan: Avonlea, no lejos del Bosque Encantado · caminando
16:10 · Ana: Avonlea, junto al huerto de los Barry · sentada
16:10 · la Sra. Allan: Avonlea, no lejos de la casa de la Sra. Lynde · caminando
16:14 Minnie May Barry dice: «Diana no me deja jugar con sus muñecas. ¿Tú me dejas?»
16:15 · Ana: Avonlea, junto al huerto de los Barry · sentada
16:15 · la Sra. Allan: Avonlea, no lejos de la casa de la Sra. Lynde · caminando
16:16 La Sra. Allan está en Avonlea, no lejos de la casa de Robert Bell.
16:16 La Sra. Allan dice: «¡Buenas tardes!»
16:17 Una granjera dice: «¡Buenas tardes! ¿Cómo están todos en casa?»
16:18 La Sra. Allan dice: «¿Cómo vienen las papas este año?»
16:18 Una granjera dice: «Buenas, si no llueve demasiado.»
16:19 La Sra. Allan dice: «¿Va a la tienda de Lawson?»
16:20 · Ana: Avonlea, junto al huerto de los Barry · sentada
16:20 · la Sra. Allan: Avonlea, no lejos de la casa de Robert Bell · de pie
16:20 Una granjera dice: «Sí, se me acabó el azúcar. Con tanta compota...»
16:21 La Sra. Allan dice: «Bueno, me voy, que tengo que preparar el té.»
16:23 Diana dice: «Mamá dice que puedo salir hasta que se ponga el sol. ¿Vamos al lago?»
16:25 · Ana: Avonlea, junto al huerto de los Barry · sentada
16:25 · la Sra. Allan: Avonlea, no lejos de la aldea · caminando
16:30 · Ana: Avonlea, junto al huerto de los Barry · sentada
16:30 · la Sra. Allan: Avonlea, junto al salón del pueblo · caminando
16:35 · Ana: Avonlea, junto al huerto de los Barry · sentada
16:35 · la Sra. Allan: Avonlea, no lejos de la colina · caminando
16:35 Mary Joe dice: «La señora Barry dice que tienda la ropa antes de que se nuble.»
16:38 La Sra. Allan está en Avonlea, junto a la iglesia.
16:38 La Sra. Allan dice: «¡Buenas tardes!»
16:39 La Srta. Josephine Barry dice: «¡Qué gusto verle!»
16:39 La Sra. Allan dice: «¿Va a la tienda de Lawson?»
16:40 · Ana: Avonlea, junto al huerto de los Barry · sentada
16:40 · la Sra. Allan: Avonlea, junto a la iglesia · de pie
16:40 La Srta. Josephine Barry dice: «Sí, se me acabó el azúcar. Con tanta compota...»
16:41 La Sra. Allan dice: «Qué lindo día para tender la ropa.»
16:42 La Srta. Josephine Barry dice: «Ya lo creo. Y ayer que no paró de llover.»
16:42 La Sra. Allan dice: «Bueno, me voy, que tengo que preparar el té.»
16:45 · Ana: Avonlea, junto al huerto de los Barry · sentada
16:45 · la Sra. Allan: Avonlea, junto a la iglesia · caminando
16:45 La Sra. Allan entra a la salita de la casa parroquial, junto a la puerta.
16:46 La Sra. Allan está en la salita de la casa parroquial.
16:46 La Sra. Allan empieza a preparar el té; con el bol.
16:46 Diana dice: «Los manzanos están llenos este año. Toma las que quieras.»
16:47 Minnie May Barry dice: «Ya no tengo tos. ¡Mamá dice que tú me salvaste!»
16:50 · Ana: Avonlea, junto al huerto de los Barry · sentada
16:50 · la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol
16:55 · Ana: Avonlea, junto al huerto de los Barry · sentada
16:55 · la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol
17:00 · Ana: Avonlea, junto al huerto de los Barry · sentada
17:00 · la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol
17:00 Ana se levanta.
17:05 · Ana: Avonlea, no lejos del Bosque Encantado · caminando
17:05 · la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol
17:10 · Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando
17:10 · la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol
17:14 Josie Pye dice: «¿Viste? A Gilbert se le fue la botella de leche río abajo.»
17:14 Ana está en Avonlea, junto a la aldea.
17:14 Ana dice: «¡Buenas tardes!»
17:15 · Ana: Avonlea, junto a la aldea · de pie
17:15 · la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol
17:15 Prissy Andrews dice: «¡Ja! Que no se entere el maestro.»
17:15 La Sra. Pye dice: «¡Qué gusto verle, Ana!»
17:15 Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»
17:16 La Sra. Allan termina de preparar el té; ahora tiene una taza de té.
17:17 La Sra. Pye dice: «Tiempo tienes para decidirlo.»
17:17 Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»
17:18 La Sra. Pye dice: «¡Qué imaginación tienes, niña!»
17:19 Ana dice: «Bueno, me voy, que tengo que ir a la casa parroquial.»
17:20 · Ana: Avonlea, junto a la aldea · de pie
17:20 · la Sra. Allan: la salita de la casa parroquial · de pie
17:25 · Ana: Avonlea, no lejos de la casa de Robert Bell · caminando
17:25 · la Sra. Allan: la salita de la casa parroquial · de pie
17:28 Ana entra a la salita de la casa parroquial, junto a la puerta.
17:28 La Sra. Allan está en la salita de la casa parroquial, junto a la mesita del té; se sienta; empieza a tomar el té con Ana; con el té.
17:28 Ana está en la salita de la casa parroquial, junto a la mesita del té; se sienta; empieza a tomar el té con la Sra. Allan; con el té.
17:28 La Sra. Allan dice: «¿Un poco más de té, Ana? Y prueba estas galletas.»
17:30 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té
17:30 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té
17:31 Ana dice: «¡Están deliciosas! Es como estar en un libro.»
17:34 La Sra. Allan dice: «Cuéntame qué estás leyendo ahora.»
17:35 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té
17:35 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té
17:37 Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»
17:40 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té
17:40 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té
17:45 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té
17:45 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té
17:50 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té
17:50 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té
17:55 · Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té
17:55 · la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té
17:58 Ana se levanta; termina de tomar el té con la Sra. Allan.
17:58 La Sra. Allan se levanta; termina de tomar el té con Ana.
17:58 La Sra. Allan dice: «¡Ana, querida! ¡Qué gusto verte! ¿Cómo van tus estudios?»
17:58 La Sra. Allan sale, junto a la casa parroquial.
17:59 Ana sale, junto a la casa parroquial.
18:00 · Ana: Avonlea, junto a la casa parroquial · caminando
18:00 · la Sra. Allan: Avonlea, junto a la casa parroquial · de pie
18:00 La Sra. Allan está en Avonlea, junto a la iglesia.
```
</details>

## Peg Bowen junta hierbas (meta 15: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Peg Bowen anda por el bosque. Se agacha aquí y allá a juntar hierbas, varias veces, y se las lleva.

- ✔ Se agacha a juntar hierbas. — 3 de 3 veces · 10:01, 10 min
- ✔ Tiene las hierbas. — 3 de 3 veces · 10:11, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (13 líneas)</summary>

```
10:00 Al empezar, Peg Bowen está en Avonlea, no lejos del bosque de Peg Bowen.
10:00 · Peg Bowen: Avonlea, no lejos del bosque de Peg Bowen · caminando
10:01 Peg Bowen está en Avonlea, junto al bosque de Peg Bowen.
10:01 Peg Bowen empieza a recoger 3 manojos de hierbas.
10:01 Peg Bowen se agacha; con el canastito.
10:04 Peg Bowen se levanta.
10:05 · Peg Bowen: Avonlea, junto al bosque de Peg Bowen · caminando · recoger 3 manojos de hierbas
10:05 Peg Bowen se agacha; con el canastito.
10:08 Peg Bowen se levanta.
10:08 Peg Bowen se agacha; con el canastito.
10:10 · Peg Bowen: Avonlea, junto al bosque de Peg Bowen · agachada · recoger 3 manojos de hierbas · con el canastito
10:11 Peg Bowen se levanta; termina de recoger 3 manojos de hierbas; ahora tiene 3 manojos de hierbas.
10:11 Peg Bowen está en Avonlea, no lejos del bosque de Peg Bowen.
```
</details>

## La compota para la Sra. Barry (meta 17: cumplida, cumplida, cumplida)

**Lo que debería pasar:** La Sra. Barry quiere compota y se la pide a Diana; Diana se la pide a Ana. Ana la consigue y se la lleva a la Sra. Barry.

- ✔ Ana le da la compota. — 3 de 3 veces · 11:29, 0 min
- ✔ La Sra. Barry tiene la compota. — 3 de 3 veces · 11:30, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (98 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 Al empezar, la Sra. Barry está en la salita de La Cuesta del Huerto.
10:00 Al empezar, Diana está en la salita de La Cuesta del Huerto; ahora tiene un libro.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 · la Sra. Barry: la salita de La Cuesta del Huerto · caminando
10:00 · Diana: la salita de La Cuesta del Huerto · de pie
10:00 La Sra. Barry sale.
10:00 Diana sale.
10:00 La Sra. Barry dice: «¿Me traerías una compota de manzana?»
10:00 Diana dice: «Sí, cómo no. Ahora mismo.»
10:01 Ana se sienta.
10:02 Ana dice: «¡A ver qué descubro por ahí!»
10:02 Ana se levanta.
10:03 Matthew dice: «Ya lo creo, ya lo creo. Anda, ve a jugar un rato, que el día está lindo.»
10:05 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:05 · la Sra. Barry: Avonlea · de pie
10:05 · Diana: Avonlea · caminando
10:05 Ana se sienta.
10:05 Ana se levanta.
10:08 Ana se sienta.
10:10 · Ana: Avonlea, junto a Tejas Verdes · sentada
10:10 · la Sra. Barry: Avonlea · de pie
10:10 · Diana: Avonlea · caminando
10:12 Diana dice: «¿Me traerías una compota de manzana?»
10:12 Ana se levanta.
10:13 Ana dice: «Sí, cómo no. Ahora mismo.»
10:15 · Ana: Avonlea, no lejos de la huerta de Tejas Verdes · caminando
10:15 · la Sra. Barry: Avonlea · de pie
10:15 · Diana: Avonlea · caminando
10:20 · Ana: Avonlea, junto al puente del arroyo · caminando
10:20 · la Sra. Barry: Avonlea · de pie
10:20 · Diana: Avonlea · caminando
10:24 Minnie May Barry dice: «¡Buenos días! ¿Ya supo lo de la vaca de los Cuthbert?»
10:24 Ana está en Avonlea, junto al huerto de los Barry; empieza a recoger 3 manzanas.
10:24 Ana sigue, con el canastito.
10:25 · Ana: Avonlea, junto al huerto de los Barry · de pie · recoger 3 manzanas · con el canastito
10:25 · la Sra. Barry: Avonlea · de pie
10:25 · Diana: Avonlea · caminando
10:25 Mary Joe dice: «¡Si lo sabe todo Avonlea! Esa vaca es más lista que el Sr. Harrison.»
10:29 Ana sigue, con el canastito.
10:30 · Ana: Avonlea, junto al huerto de los Barry · de pie · recoger 3 manzanas · con el canastito
10:30 · la Sra. Barry: Avonlea · de pie
10:30 · Diana: Avonlea · de pie
10:34 Ana termina de recoger 3 manzanas; ahora tiene 3 manzanas.
10:35 · Ana: Avonlea, junto al huerto de los Barry · caminando
10:35 · la Sra. Barry: Avonlea · de pie
10:35 · Diana: Avonlea · de pie
10:35 Diana dice: «¡Ana, mi alma gemela! Te estaba esperando.»
10:40 · Ana: Avonlea, junto al puente del arroyo · caminando
10:40 · la Sra. Barry: Avonlea · de pie
10:40 · Diana: Avonlea · de pie
10:45 · Ana: Avonlea, no lejos de la huerta de Tejas Verdes · caminando
10:45 · la Sra. Barry: Avonlea · de pie
10:45 · Diana: Avonlea · de pie
10:47 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
10:47 Ana está en la cocina de Tejas Verdes; empieza a cocinar una compota de manzana.
10:47 Ana sigue, con el bol.
10:47 Ana está en la cocina de Tejas Verdes, junto a la estufa.
10:50 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol
10:50 · la Sra. Barry: Avonlea · de pie
10:50 · Diana: Avonlea · de pie
10:55 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol
10:55 · la Sra. Barry: Avonlea · de pie
10:55 · Diana: Avonlea · de pie
11:00 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol
11:00 · la Sra. Barry: Avonlea · de pie
11:00 · Diana: Avonlea · de pie
11:05 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol
11:05 · la Sra. Barry: Avonlea · de pie
11:05 · Diana: Avonlea · de pie
11:10 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol
11:10 · la Sra. Barry: Avonlea · de pie
11:10 · Diana: Avonlea · de pie
11:15 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol
11:15 · la Sra. Barry: Avonlea · de pie
11:15 · Diana: Avonlea · de pie
11:17 Ana termina de cocinar una compota de manzana; ahora tiene una compota de manzana.
11:17 Ana sale, junto a Tejas Verdes.
11:20 · Ana: Avonlea, no lejos de la huerta de Tejas Verdes · caminando
11:20 · la Sra. Barry: Avonlea · de pie
11:20 · Diana: Avonlea · de pie
11:25 · Ana: Avonlea, junto al puente del arroyo · caminando
11:25 · la Sra. Barry: Avonlea · de pie
11:25 · Diana: Avonlea · de pie
11:28 Minnie May Barry dice: «Dicen que el nuevo pastor predica muy bonito.»
11:29 Mary Joe dice: «Y la Sra. Allan es un encanto, eso sí.»
11:29 Ana va por Avonlea, junto a La Cuesta del Huerto; empieza a darle una compota de manzana a Diana; con lo que entrega.
11:30 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie · darle una compota de manzana a Diana · con lo que entrega
11:30 · la Sra. Barry: Avonlea · de pie
11:30 · Diana: Avonlea · de pie
11:30 Ana termina de darle una compota de manzana a Diana; ya no tiene nada.
11:30 Diana ahora tiene un libro, una compota de manzana.
11:30 Diana dice: «¡Qué lindo detalle! Muchas gracias.»
11:30 Ana dice: «¡A ver qué descubro por ahí!»
11:30 Diana empieza a darle una compota de manzana a la Sra. Barry; con lo que entrega.
11:30 La Sra. Barry ahora tiene una compota de manzana.
11:30 La Sra. Barry dice: «Gracias.»
11:30 Diana termina de darle una compota de manzana a la Sra. Barry; ahora tiene un libro.
```
</details>

## Ordeñar y llevar la leche (meta 27: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Matthew va al corral, se sienta en el banquito junto a la vaca y la ordeña en el balde, sin apuro, un cuarto de hora. Lleva la leche a la cocina y se la da a Marilla.

- ✔ Ordeña sentado junto a la vaca, con el balde, un cuarto de hora. — 3 de 3 veces · 09:01, 15 min
- ✔ Tiene la leche. — 3 de 3 veces · 09:16, 2 min
- ✔ Se la da a Marilla en la cocina. — 3 de 3 veces · 09:18, 0 min
- ✔ Marilla tiene la leche. — 3 de 3 veces · 09:18, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (25 líneas)</summary>

```
09:00 Al empezar, Matthew está en Avonlea, junto al granero; ahora tiene 5 dólares.
09:00 Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.
09:00 · Matthew: Avonlea, junto al granero · caminando
09:00 · Marilla: la cocina de Tejas Verdes · sentada
09:00 Marilla se levanta.
09:01 Matthew está en Avonlea, junto a la entrada del corral de Tejas Verdes.
09:01 Matthew empieza a ordeñar a Dolly.
09:01 Matthew dice: «Tranquila, Dolly… ya está, ya está.»
09:01 Matthew se sienta; con el balde.
09:05 · Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · sentada · ordeñar a Dolly · con el balde
09:05 · Marilla: la cocina de Tejas Verdes · de pie
09:07 Ana dice: «¿Ir hasta la estación de Bright River con Matthew en la carreta? Es un buen trecho, pasando por la aldea.»
09:10 · Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · sentada · ordeñar a Dolly · con el balde
09:10 · Marilla: la cocina de Tejas Verdes · de pie
09:15 · Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · sentada · ordeñar a Dolly · con el balde
09:15 · Marilla: la cocina de Tejas Verdes · de pie
09:16 Matthew se levanta; termina de ordeñar a Dolly; ahora tiene 5 dólares, 2 jarros de leche.
09:17 Matthew entra a la cocina de Tejas Verdes, junto a la puerta.
09:18 Matthew está en la cocina de Tejas Verdes; empieza a darle 2 jarros de leche a Marilla; con lo que entrega.
09:18 Matthew termina de darle 2 jarros de leche a Marilla; ahora tiene 5 dólares.
09:18 Marilla ahora tiene 2 jarros de leche.
09:18 Marilla dice: «Gracias.»
09:18 Matthew sale.
09:20 · Matthew: Avonlea · caminando
09:20 · Marilla: la cocina de Tejas Verdes · de pie
```
</details>

## Matthew da de comer a los animales (meta 28: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Matthew lleva el grano al corral y lo va echando, en un lado y en otro, mientras los animales se acercan.

- ✔ Echa el grano en el corral. — 3 de 3 veces · 08:00, 8 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (17 líneas)</summary>

```
08:00 Al empezar, Matthew está en Avonlea, junto al granero; ahora tiene 5 dólares.
08:00 · Matthew: Avonlea, junto al granero · caminando
08:00 Matthew empieza a dar de comer a los animales en el gallinero; con el grano.
08:05 · Matthew: Avonlea, junto al granero · de pie · dar de comer a los animales en el gallinero · con el grano
08:08 Matthew termina de dar de comer a los animales en el gallinero.
08:08 Matthew dice: «Buen animal, sí... buen animal.»
08:10 · Matthew: Avonlea, junto al granero · de pie
08:11 Matthew está en Avonlea, junto a la entrada del corral de Tejas Verdes.
08:11 Matthew empieza a dar de comer a los animales en el corral.
08:13 Matthew sigue, con el grano.
08:15 · Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · de pie · dar de comer a los animales en el corral · con el grano
08:18 Matthew sigue, con el grano.
08:20 · Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · de pie · dar de comer a los animales en el corral · con el grano
08:22 Matthew termina de dar de comer a los animales en el corral.
08:24 Matthew entra a la cocina de Tejas Verdes.
08:24 Matthew se sienta.
08:25 · Matthew: la cocina de Tejas Verdes · sentada
```
</details>

## Visita a la Sra. Lynde (meta 29: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana va a la casa de la Sra. Lynde. Se sienta con ella y conversan con una taza de té, una media hora.

- ✔ Llega a la casa de la Sra. Lynde. — 3 de 3 veces · 15:10, 31 min
- ✔ Se sienta a tomar el té y conversar, una media hora. — 3 de 3 veces · 15:11, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (32 líneas)</summary>

```
15:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
15:00 Al empezar, la Sra. Lynde está en la casa de la Sra. Lynde.
15:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
15:00 · la Sra. Lynde: la casa de la Sra. Lynde · caminando
15:00 Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»
15:05 · Ana: Avonlea, no lejos del campo de heno · caminando
15:05 · la Sra. Lynde: la casa de la Sra. Lynde · caminando
15:09 Ana entra a la casa de la Sra. Lynde.
15:10 · Ana: la casa de la Sra. Lynde · caminando
15:10 · la Sra. Lynde: la casa de la Sra. Lynde · de pie
15:10 La Sra. Lynde dice: «Marilla hizo bien en quedarse contigo, y lo digo yo, que nunca me callo lo que pienso.»
15:10 Ana empieza a visitar a la Sra. Lynde; con el té.
15:10 Ana dice: «Buenas tardes, Sra. Lynde. Vine a visitarla.»
15:10 La Sra. Lynde dice: «¡Pasa, pasa! Siéntate, que pongo la tetera.»
15:11 Ana se sienta; con el té.
15:11 La Sra. Lynde se sienta.
15:15 · Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té
15:15 · la Sra. Lynde: la casa de la Sra. Lynde · sentada
15:20 · Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té
15:20 · la Sra. Lynde: la casa de la Sra. Lynde · sentada
15:25 · Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té
15:25 · la Sra. Lynde: la casa de la Sra. Lynde · sentada
15:30 · Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té
15:30 · la Sra. Lynde: la casa de la Sra. Lynde · sentada
15:35 · Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té
15:35 · la Sra. Lynde: la casa de la Sra. Lynde · sentada
15:40 · Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té
15:40 · la Sra. Lynde: la casa de la Sra. Lynde · sentada
15:40 Ana se levanta; termina de visitar a la Sra. Lynde.
15:40 La Sra. Lynde se levanta.
15:41 La Sra. Lynde entra a la cocina de Tejas Verdes.
15:41 Ana sale.
```
</details>

## Devolverle el libro a Diana (meta 31: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana lleva el libro que le prestaron a la casa de Diana y se lo devuelve en sus manos.

- ✔ Le devuelve el libro a Diana. — 3 de 3 veces · 12:20, 1 min
- ✔ Ya no tiene el libro. — 3 de 3 veces · 12:20, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (25 líneas)</summary>

```
12:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes; ahora tiene un libro.
12:00 Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto.
12:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
12:00 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
12:04 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
12:05 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
12:05 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
12:10 · Ana: Avonlea, junto al puente del arroyo · caminando
12:10 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
12:12 Ana está en Avonlea, junto al puente del arroyo.
12:12 Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»
12:15 · Ana: Avonlea, junto al puente del arroyo · de pie
12:15 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
12:17 Ana dice: «¡Diana! ¡Espera!»
12:17 Diana dice: «¿Me llamabas?»
12:18 Minnie May Barry dice: «Qué lindo día para tender la ropa.»
12:19 El Sr. Barry dice: «Ya lo creo. Y ayer que no paró de llover.»
12:20 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
12:20 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
12:20 Ana va por Avonlea, junto a La Cuesta del Huerto; empieza a devolverle un libro a Diana; con lo que entrega.
12:20 Ana dice: «Aquí tienes tu libro. ¡Me encantó! Lo leí dos veces.»
12:20 Ana termina de devolverle un libro a Diana; ya no tiene nada.
12:20 Diana ahora tiene un libro.
12:20 Diana dice: «¡Qué bueno que te gustó! Te presto otro cuando quieras.»
12:20 Ana dice: «¡A ver qué descubro por ahí!»
```
</details>

## Amigas del alma (meta 32: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana y Diana, en el jardín de los Barry, se ponen frente a frente, se toman de las manos y juran ser amigas del alma para siempre.

- ✔ Ana jura tomada de las manos. — 3 de 3 veces · 11:25, 3 min
- ✔ Diana está con ella, en el jardín de los Barry. — 3 de 3 veces · 11:28, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (39 líneas)</summary>

```
11:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
11:00 Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.
11:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
11:00 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:04 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
11:05 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
11:05 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:10 · Ana: Avonlea, junto al puente del arroyo · caminando
11:10 · Diana: Avonlea, junto a La Cuesta del Huerto · caminando
11:15 · Ana: Avonlea, junto al huerto de los Barry · caminando
11:15 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:15 Ana dice: «¡Diana! ¡Espera!»
11:15 Diana dice: «¿Qué pasa?»
11:16 Mary Joe dice: «¡Ay, señorita Ana! Yo no sé nada de enfermedades, menos mal que usted vino aquella noche.»
11:16 Ana está en Avonlea, junto a La Cuesta del Huerto.
11:16 Ana dice: «¡Buenos días, Minnie May Barry!»
11:17 Minnie May Barry dice: «¡Hola, Ana! ¿A dónde vas?»
11:18 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
11:19 Minnie May Barry dice: «Esta niña... qué cosas dice.»
11:19 Diana dice: «Mamá dice que puedo salir hasta que se ponga el sol. ¿Vamos al lago?»
11:19 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
11:20 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie
11:20 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:20 Minnie May Barry dice: «Ya lo creo, Ana. Ya lo creo.»
11:21 Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»
11:22 Minnie May Barry dice: «Nunca lo había pensado así.»
11:23 Ana dice: «Bueno, me voy, que tengo que jurar ser amigas del alma con Diana.»
11:24 Ana empieza a jurar ser amigas del alma con Diana.
11:24 Ana dice: «Juro solemnemente ser fiel a mi amiga del alma, Diana, mientras duren el sol y la luna.»
11:25 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando · jurar ser amigas del alma con Diana
11:25 · Diana: Avonlea, junto a La Cuesta del Huerto · caminando
11:25 Ana sigue, con las manos.
11:28 Ana termina de jurar ser amigas del alma con Diana.
11:28 Diana dice: «Juro ser fiel a mi amiga del alma, Ana, mientras duren el sol y la luna.»
11:28 Ana se sienta.
11:28 Ana se levanta.
11:29 Minnie May Barry dice: «¡Ana! ¿Me cuentas el cuento del hada otra vez?»
11:30 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie
11:30 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
```
</details>

## Cuidar al Sr. Harrison (meta 34: cumplida, cumplida, cumplida)

**Lo que debería pasar:** El Sr. Harrison está enfermo, en cama. Ana saca el jarabe de ipecacuana del aparador de la cocina, va a su casa y, junto a la cama, se lo da a cucharadas.

- ✔ El Sr. Harrison está en cama. — 3 de 3 veces · 11:00, 21 min
- ✔ Saca el jarabe del aparador. — 3 de 3 veces · 11:01, 1 min
- ✔ Tiene el jarabe. — 3 de 3 veces · 11:02, 19 min
- ✔ Se lo da en su casa. — 3 de 3 veces · 11:11, 10 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (28 líneas)</summary>

```
11:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
11:00 Al empezar, el Sr. Harrison está en la casa del Sr. Harrison; está en cama; ahora tiene una cuerda.
11:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
11:00 · el Sr. Harrison: la casa del Sr. Harrison · acostada, en cama
11:00 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
11:00 Ana está en la cocina de Tejas Verdes; empieza a tomar un frasco de jarabe de ipecacuana.
11:01 Ana sigue, con el aparador abierto.
11:01 Ana está en la cocina de Tejas Verdes, junto al aparador.
11:02 Ana termina de tomar un frasco de jarabe de ipecacuana; ahora tiene un frasco de jarabe de ipecacuana.
11:02 Ana sale, junto a Tejas Verdes.
11:02 Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»
11:05 · Ana: Avonlea, junto a Tejas Verdes · caminando
11:05 · el Sr. Harrison: la casa del Sr. Harrison · acostada, en cama
11:10 · Ana: Avonlea, junto a la granja del Sr. Harrison · caminando
11:10 · el Sr. Harrison: la casa del Sr. Harrison · acostada, en cama
11:10 Ana entra a la casa del Sr. Harrison.
11:11 El Sr. Harrison dice: «Cof, cof… Si no fuera por este pecho…»
11:11 Ana empieza a cuidar al Sr. Harrison; con el jarabe.
11:11 Ana dice: «Una cucharadita de jarabe de ipecacuana… y otra más. Ya va a pasar.»
11:15 · Ana: la casa del Sr. Harrison · de pie · cuidar al Sr. Harrison · con el jarabe
11:15 · el Sr. Harrison: la casa del Sr. Harrison · acostada, en cama
11:20 · Ana: la casa del Sr. Harrison · de pie · cuidar al Sr. Harrison · con el jarabe
11:20 · el Sr. Harrison: la casa del Sr. Harrison · acostada, en cama
11:21 Ana termina de cuidar al Sr. Harrison; ya no tiene nada.
11:21 El Sr. Harrison se levanta.
11:21 El Sr. Harrison dice: «Ya me siento mucho mejor. Gracias, niña.»
11:21 Ana sale.
11:21 El Sr. Harrison sale.
```
</details>

## Estudiar y recitar la lección (meta 36: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana estudia la lección sentada a la mesa, con el libro abierto, un buen rato. En la escuela se pone frente a la clase, junto a la pizarra, y la recita.

- ✔ Estudia sentada con el libro, un buen rato. — 3 de 3 veces · 09:01, 40 min
- ✔ Recita frente a la clase. — 3 de 3 veces · 09:59, 6 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (32 líneas)</summary>

```
09:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
09:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
09:00 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
09:00 Ana está en la cocina de Tejas Verdes; empieza a estudiar la lección.
09:00 Ana dice: ««El cuadrado de la hipotenusa es igual…» Repaso y repaso.»
09:01 Ana está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta; con un libro sobre la mesa.
09:05 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar la lección · con un libro sobre la mesa
09:10 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar la lección · con un libro sobre la mesa
09:15 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar la lección · con un libro sobre la mesa
09:20 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar la lección · con un libro sobre la mesa
09:25 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar la lección · con un libro sobre la mesa
09:30 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar la lección · con un libro sobre la mesa
09:35 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar la lección · con un libro sobre la mesa
09:40 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar la lección · con un libro sobre la mesa
09:41 Ana se levanta; termina de estudiar la lección.
09:41 Ana sale, junto a Tejas Verdes.
09:45 · Ana: Avonlea, no lejos del campo de heno · caminando
09:50 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
09:53 Ana está en Avonlea, no lejos de la casa de Robert Bell.
09:53 Ana dice: «¿Qué pensarán los animales de nosotros?»
09:55 · Ana: Avonlea, no lejos de la casa de Robert Bell · de pie
09:59 Una granjera dice: «¡Qué grande estás, niña! Saludos a Marilla.»
09:59 Ana está en Avonlea, junto a la escuela; empieza a recitar la lección.
09:59 Ana dice: «Y a lo largo del río, en su barca, iba la doncella de Shalott…»
09:59 Ana entra a la escuela de Avonlea.
10:00 · Ana: la escuela de Avonlea · caminando · recitar la lección
10:00 Ana sigue, con el gesto de recitar.
10:05 · Ana: la escuela de Avonlea · de pie · recitar la lección · con el gesto de recitar
10:05 Ana termina de recitar la lección.
10:05 El Sr. Phillips dice: «Mañana hay examen de geometría. Que nadie lo olvide.»
10:05 Josie Pye dice: «Mi mamá dice que las pelirrojas tienen mal genio. ¿Es verdad?»
10:06 Ana dice: «No pienso contestarte eso.»
```
</details>

## Las oraciones (meta 37: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana sube a su pieza, se arrodilla junto a la cama y dice sus oraciones, unos minutos.

- ✔ Reza de rodillas junto a la cama de su pieza. — 3 de 3 veces · 20:02, 5 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (9 líneas)</summary>

```
20:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
20:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
20:00 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
20:00 Ana está en la cocina de Tejas Verdes; empieza a decir sus oraciones.
20:00 Ana dice: «Querido Padre celestial: gracias por el Camino Blanco de las Delicias y por el Lago de las Aguas Brillantes…»
20:02 Ana entra a la pieza de Ana.
20:02 Ana está en la pieza de Ana, junto a la cama; se arrodilla; con las manos juntas.
20:05 · Ana: la pieza de Ana, junto a la cama · de rodillas · decir sus oraciones · con las manos juntas
20:07 Ana se levanta; termina de decir sus oraciones.
```
</details>

## El vestido de mangas abullonadas (meta 38: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Marilla quiere coserle un vestido a Ana. Le traen la tela de la tienda. Marilla se sienta junto a la ventana de la cocina y cose, sin apuro, un buen rato, hasta que el vestido está listo.

- ✔ Marilla tiene la tela. — 3 de 3 veces · 10:34, 41 min
- ✔ Cose sentada junto a la ventana, un buen rato. — 3 de 3 veces · 10:35, 40 min
- ✔ El vestido está listo. — 3 de 3 veces · 11:15, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (70 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 Al empezar, Marilla está en Avonlea, junto a Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 · Marilla: Avonlea, junto a Tejas Verdes · de pie
10:00 Marilla dice: «¿Me traerías un corte de tela?»
10:00 Ana dice: «Sí, cómo no. Ahora mismo.»
10:00 Marilla entra a la cocina de Tejas Verdes, junto a la puerta.
10:05 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:05 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:09 Una vecina dice: «Lindo día, ¿verdad? Dicen que mañana llueve.»
10:10 · Ana: Avonlea, no lejos de la casa de Robert Bell · caminando
10:10 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:15 · Ana: Avonlea, junto a la tienda de Lawson · caminando
10:15 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:15 Ana entra a la tienda de Lawson.
10:15 Ana dice: «Buenos días, Sr. Lawson. ¿Me daría un corte de tela? A la libreta de los Cuthbert.»
10:16 El Sr. Lawson dice: «Cómo no, aquí tengo una. Un momento…»
10:16 Ana ahora tiene un corte de tela.
10:16 El Sr. Lawson dice: «Anotado en la libreta de los Cuthbert. Saludos a Marilla.»
10:16 Ana sale.
10:20 · Ana: Avonlea · caminando
10:20 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:21 Ana dice: «¡Hola, pequeño! ¿Cómo te llamas? Yo te diré Lord Fitzgerald.»
10:25 · Ana: Avonlea · caminando
10:25 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:30 · Ana: Avonlea · caminando
10:30 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:33 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
10:33 Ana empieza a darle un corte de tela a Marilla; con lo que entrega.
10:34 Ana termina de darle un corte de tela a Marilla; ya no tiene nada.
10:34 Marilla ahora tiene un corte de tela.
10:34 Marilla dice: «Gracias.»
10:34 Ana dice: «Mi imaginación no me deja quieta.»
10:34 Marilla empieza a coser un vestido con mangas abullonadas.
10:34 Marilla dice: «Coso el vestido… y le pongo unas mangas abullonadas, como las que usan ahora.»
10:35 · Ana: la cocina de Tejas Verdes, junto a la puerta · de pie
10:35 · Marilla: la cocina de Tejas Verdes · caminando · coser un vestido con mangas abullonadas
10:35 Marilla está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta; con la costura.
10:40 · Ana: la cocina de Tejas Verdes, junto a la puerta · de pie
10:40 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura
10:43 Ana sale, junto a Tejas Verdes.
10:45 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
10:45 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura
10:45 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
10:48 Ana se sienta.
10:50 · Ana: Avonlea, junto a la huerta de Tejas Verdes · sentada
10:50 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura
10:55 · Ana: Avonlea, junto a la huerta de Tejas Verdes · sentada
10:55 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura
10:58 Ana se levanta.
11:00 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
11:00 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura
11:01 Ana está en Avonlea, junto a Tejas Verdes.
11:01 Matthew dice: «Ya lo creo, ya lo creo. Anda, ve a jugar un rato, que el día está lindo.»
11:02 Ana se sienta.
11:03 Ana se levanta.
11:05 · Ana: Avonlea, junto a Tejas Verdes · de pie
11:05 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura
11:06 Ana se sienta.
11:09 Ana dice: «Hay tanto por hacer y tan poco tiempo... ¡y yo con tantas ideas!»
11:09 Ana se levanta.
11:10 · Ana: Avonlea, junto a Tejas Verdes · de pie
11:10 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura
11:11 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
11:13 Ana está en la cocina de Tejas Verdes, junto al fregadero.
11:13 Ana está en la cocina de Tejas Verdes, junto a la silla de la ventana.
11:15 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · de pie
11:15 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura
11:15 Marilla se levanta; termina de coser un vestido con mangas abullonadas; ahora tiene un vestido con mangas abullonadas.
11:15 Marilla está en la cocina de Tejas Verdes.
```
</details>

## El sombrero con flores (meta 39: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana corta flores en la huerta y se adorna el sombrero con ellas, con cuidado, unos minutos.

- ✔ Corta flores. — 3 de 3 veces · 10:01, 3 min
- ✔ Se adorna el sombrero. — 3 de 3 veces · 10:04, 10 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (12 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:01 Ana está en Avonlea, junto a la huerta de Tejas Verdes; empieza a recoger un ramo de flores.
10:01 Ana se agacha; con el canastito.
10:04 Ana se levanta; termina de recoger un ramo de flores; ahora tiene un ramo de flores.
10:04 Ana empieza a adornar el sombrero con flores; con el sombrero con flores.
10:04 Ana dice: «¡Una corona de ranúnculos y rosas silvestres para mi sombrero!»
10:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · adornar el sombrero con flores · con el sombrero con flores
10:10 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · adornar el sombrero con flores · con el sombrero con flores
10:14 Ana termina de adornar el sombrero con flores; ya no tiene nada.
10:14 Ana se sienta.
10:15 · Ana: Avonlea, junto a la huerta de Tejas Verdes · sentada
```
</details>

## Remar en el lago (meta 40: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana sube al bote en el Lago de las Aguas Brillantes y rema, sentada, sin apuro, un buen rato.

- ✔ Rema sentada en el bote, un buen rato. — 3 de 3 veces · 14:19, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (19 líneas)</summary>

```
14:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
14:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
14:05 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
14:10 · Ana: Avonlea, no lejos del puente del arroyo · caminando
14:11 Ana está en Avonlea, no lejos del Camino Blanco de las Delicias.
14:15 · Ana: Avonlea, no lejos del Lago de las Aguas Brillantes · caminando
14:19 Ana está en Avonlea, junto al Lago de las Aguas Brillantes; se sienta; empieza a remar en el lago; con el bote.
14:19 Ana dice: «¡Remo en el bote de los Barry! Hay que tener cuidado de no soltar los remos…»
14:20 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote
14:25 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote
14:30 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote
14:35 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote
14:40 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote
14:45 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote
14:49 Ana se levanta; termina de remar en el lago.
14:49 Ana se sienta.
14:49 Ana dice: «¡A ver qué descubro por ahí!»
14:49 Ana se levanta.
14:50 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando
```
</details>

## Ponerle nombre a los lugares (meta 41: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana se detiene en un lugar que le gusta, lo mira y le pone un nombre bonito en voz alta.

- ✔ Se detiene y le pone nombre a un lugar. — 3 de 3 veces · 10:00, 2 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (18 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 Ana empieza a ponerle nombre a los arbustos de bayas; con el gesto de recitar.
10:00 Ana dice: «Este lugar se va a llamar el Sendero de los Abedules. ¿No es un nombre precioso?»
10:02 Ana termina de ponerle nombre a los arbustos de bayas.
10:03 Matthew dice: «Bueno, pues... sí, es un día precioso, Ana. Ya lo creo.»
10:04 Ana está en Avonlea, junto a la entrada del corral de Tejas Verdes; empieza a ponerle nombre al corral; con el gesto de recitar.
10:04 Ana dice: «Este lugar se va a llamar Idlewild. ¿No es un nombre precioso?»
10:05 · Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · de pie · ponerle nombre al corral · con el gesto de recitar
10:06 Ana termina de ponerle nombre al corral.
10:06 Ana dice: «¡Hola, pequeño! ¿Cómo te llamas? Yo te diré Lord Fitzgerald.»
10:10 · Ana: Avonlea, junto a Tejas Verdes · caminando
10:11 Ana está en Avonlea, junto a la huerta de Tejas Verdes; empieza a ponerle nombre a la huerta; con el gesto de recitar.
10:11 Ana dice: «Este lugar se va a llamar el Valle de las Violetas. ¿No es un nombre precioso?»
10:13 Ana termina de ponerle nombre a la huerta.
10:13 Ana se sienta.
10:13 Ana se levanta.
10:15 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
```
</details>

## Leer el libro prestado (meta 46: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana se sienta con el libro que le prestaron y lee, un buen rato.

- ✔ Lee sentada, un buen rato. — 3 de 3 veces · 15:01, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (14 líneas)</summary>

```
15:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes; ahora tiene un libro.
15:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
15:00 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
15:00 La Sra. Lynde dice: «A una niña hay que enseñarle a ser útil. Pero, bueno, tú vas por buen camino.»
15:00 Ana está en la cocina de Tejas Verdes; empieza a leer un libro.
15:00 Ana dice: ««Ben-Hur»… ¡No puedo parar de leer! La carrera de cuadrigas…»
15:01 Ana está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta; con un libro.
15:05 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer un libro · con un libro
15:10 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer un libro · con un libro
15:15 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer un libro · con un libro
15:20 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer un libro · con un libro
15:25 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer un libro · con un libro
15:30 · Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer un libro · con un libro
15:31 Ana se levanta; termina de leer un libro.
```
</details>

## El club de cuentos (meta 47: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana sube a su pieza y escribe un cuento sentada al escritorio, con el cuaderno abierto sobre él, un buen rato. Después se lo lee a Diana, sentadas juntas.

- ✔ Escribe sentada al escritorio, con el cuaderno, un buen rato. — 3 de 3 veces · 14:02, 40 min
- ✔ Se lo lee a Diana, sentadas juntas. — 3 de 3 veces · 15:01, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (41 líneas)</summary>

```
14:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
14:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
14:00 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
14:00 La Sra. Lynde dice: «Llevo cincuenta y dos cubrecamas de retazos, ¡cincuenta y dos! Y no pienso parar.»
14:00 Ana está en la cocina de Tejas Verdes; empieza a escribir un cuento.
14:00 Ana dice: ««Los celos de Cordelia»: una historia trágica, con un ahogado y una dama de cabellos de oro…»
14:02 Ana entra a la pieza de Ana.
14:02 Ana está en la pieza de Ana, junto al escritorio; se sienta; con la banqueta y el cuaderno sobre la mesa.
14:05 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir un cuento · con la banqueta y el cuaderno sobre la mesa
14:10 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir un cuento · con la banqueta y el cuaderno sobre la mesa
14:15 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir un cuento · con la banqueta y el cuaderno sobre la mesa
14:20 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir un cuento · con la banqueta y el cuaderno sobre la mesa
14:25 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir un cuento · con la banqueta y el cuaderno sobre la mesa
14:30 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir un cuento · con la banqueta y el cuaderno sobre la mesa
14:35 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir un cuento · con la banqueta y el cuaderno sobre la mesa
14:40 · Ana: la pieza de Ana, junto al escritorio · sentada · escribir un cuento · con la banqueta y el cuaderno sobre la mesa
14:42 Ana se levanta; termina de escribir un cuento; ahora tiene un cuento escrito a mano.
14:42 Ana entra a la cocina de Tejas Verdes, junto a la escalera.
14:42 Ana sale, junto a Tejas Verdes.
14:45 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
14:47 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
14:50 · Ana: Avonlea, junto al Bosque Encantado · caminando
14:54 Ana está en Avonlea, junto al puente del arroyo.
14:55 · Ana: Avonlea, junto al puente del arroyo · de pie
14:59 Ana dice: «¡Diana! ¡Espera!»
15:00 · Ana: Avonlea, junto al huerto de los Barry · caminando
15:00 Minnie May Barry dice: «¿Cómo vienen las papas este año?»
15:00 Mary Joe dice: «Buenas, si no llueve demasiado.»
15:01 Ana está en Avonlea, junto a La Cuesta del Huerto; se sienta; empieza a leerle su cuento a Diana; con el cuaderno.
15:01 Ana dice: «Escucha, Diana: «La dama Geraldine caminaba a la luz de la luna…»»
15:05 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · leerle su cuento a Diana · con el cuaderno
15:10 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · leerle su cuento a Diana · con el cuaderno
15:15 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · leerle su cuento a Diana · con el cuaderno
15:16 Diana dice: «¡Ay, Ana, qué triste! ¡Lloré en la parte del ahogado!»
15:20 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · leerle su cuento a Diana · con el cuaderno
15:25 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · leerle su cuento a Diana · con el cuaderno
15:30 · Ana: Avonlea, junto a La Cuesta del Huerto · sentada · leerle su cuento a Diana · con el cuaderno
15:31 Ana se levanta; termina de leerle su cuento a Diana; ya no tiene nada.
15:31 Ana se sienta.
15:31 Ana se levanta.
15:32 Ana está en Avonlea, junto al huerto de los Barry.
```
</details>

## Ensayar y recitar en el concierto (meta 48: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana ensaya su recitación con el libro, un rato. Por la tarde, en el concierto, sube al escenario del salón y recita.

- ✔ Ensaya con el libro, un rato. — 3 de 3 veces · 15:24, 20 min
- ✔ Recita en el escenario del salón. — 3 de 3 veces · 15:59, 10 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (43 líneas)</summary>

```
15:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
15:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
15:00 Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»
15:04 La Sra. Lynde dice: «Llevo cincuenta y dos cubrecamas de retazos, ¡cincuenta y dos! Y no pienso parar.»
15:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
15:10 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
15:15 · Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando
15:16 Ana está en Avonlea, no lejos de la casa de Robert Bell.
15:20 · Ana: Avonlea, no lejos de la escuela · caminando
15:23 Ana está en Avonlea, junto a la escuela; empieza a ensayar la recitación.
15:23 Ana dice: ««La doncella de Shalott»… otra vez desde el principio, con más sentimiento.»
15:23 Ana entra a la escuela de Avonlea.
15:24 Ana sigue, con un libro.
15:25 · Ana: la escuela de Avonlea · de pie · ensayar la recitación · con un libro
15:30 · Ana: la escuela de Avonlea · de pie · ensayar la recitación · con un libro
15:35 · Ana: la escuela de Avonlea · de pie · ensayar la recitación · con un libro
15:40 · Ana: la escuela de Avonlea · de pie · ensayar la recitación · con un libro
15:44 Ana termina de ensayar la recitación.
15:44 Ana sale.
15:44 Cecily King dice: «¿Me enseñas a recitar como tú? Cuando tú recitas, me dan escalofríos.»
15:45 · Ana: Avonlea · caminando
15:49 Felicity King dice: «Mi madre dice que una señorita nunca corre. Pero yo corro si llego tarde.»
15:49 Ana dice: «¡Buenas tardes!»
15:49 El Sr. Phillips dice: «¡Buenas tardes, Ana! ¿Cómo están todos en casa?»
15:50 · Ana: Avonlea · de pie
15:50 Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»
15:51 El Sr. Phillips dice: «¡Qué imaginación tienes, niña!»
15:52 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
15:53 El Sr. Phillips dice: «Ya lo creo, Ana. Ya lo creo.»
15:54 Ana dice: «Bueno, me voy, que tengo que recitar en el concierto.»
15:55 · Ana: Avonlea · de pie
15:55 La Srta. Stacy dice: «El viernes por la tarde salimos al bosque a estudiar botánica. ¿Te apuntas?»
15:56 Ana dice: «¡Srta. Stacy! Usted es mi espíritu afín, ¿lo sabía?»
15:58 Ana empieza a recitar en el concierto.
15:58 Ana dice: «…y la barca siguió flotando río abajo, hacia Camelot.»
15:58 Ana entra al salón del pueblo.
15:59 Ana sigue, con el gesto de recitar.
15:59 Ana está en el salón del pueblo, junto al escenario.
16:00 · Ana: el salón del pueblo, junto al escenario · de pie · recitar en el concierto · con el gesto de recitar
16:05 · Ana: el salón del pueblo, junto al escenario · de pie · recitar en el concierto · con el gesto de recitar
16:09 Ana termina de recitar en el concierto.
16:09 Ana está en el salón del pueblo.
16:10 · Ana: el salón del pueblo · de pie
```
</details>

## Las flores del salón (meta 49: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana va al salón con flores y cuelga guirnaldas a lo largo de la pared, un tramo tras otro, un buen rato.

- ✔ Cuelga las guirnaldas en el salón, un buen rato. — 3 de 3 veces · 10:36, 25 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (37 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»
10:04 Ana está en Avonlea, junto a la huerta de Tejas Verdes; empieza a recoger un ramo de flores.
10:04 Ana se agacha; con el canastito.
10:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · agachada · recoger un ramo de flores · con el canastito
10:07 Ana se levanta; termina de recoger un ramo de flores; ahora tiene un ramo de flores.
10:10 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
10:15 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
10:20 · Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando
10:21 Una vecina dice: «Lindo día, ¿verdad? Dicen que mañana llueve.»
10:25 · Ana: Avonlea, no lejos de la aldea · caminando
10:26 Ana está en Avonlea, junto a la aldea.
10:26 Ana dice: «¡Buenos días, Janet King!»
10:27 Una granjera dice: «¡Qué grande estás, niña! Saludos a Marilla.»
10:27 Janet King dice: «¡Qué gusto verle, Ana!»
10:28 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
10:29 Janet King dice: «Ya lo creo, Ana. Ya lo creo.»
10:29 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
10:30 · Ana: Avonlea, junto a la aldea · de pie
10:30 Janet King dice: «Esta niña... qué cosas dice.»
10:31 Ana dice: «Bueno, me voy, que tengo que decorar el salón con flores.»
10:32 El médico dice: «¿Alguien enfermo en Tejas Verdes? Espero que no.»
10:35 · Ana: Avonlea, junto al salón del pueblo · caminando
10:35 Ana está en Avonlea, junto al salón del pueblo; empieza a decorar el salón con flores.
10:35 Ana entra al salón del pueblo.
10:36 Ana sigue, con flores.
10:40 · Ana: el salón del pueblo · de pie · decorar el salón con flores · con flores
10:45 · Ana: el salón del pueblo · caminando · decorar el salón con flores
10:45 Ana sigue, con flores.
10:45 Ana está en el salón del pueblo, junto al escenario.
10:50 · Ana: el salón del pueblo, junto al escenario · de pie · decorar el salón con flores · con flores
10:54 Ana sigue, con flores.
10:54 Ana está en el salón del pueblo.
10:55 · Ana: el salón del pueblo · de pie · decorar el salón con flores · con flores
11:00 · Ana: el salón del pueblo · de pie · decorar el salón con flores · con flores
11:02 Ana termina de decorar el salón con flores; ya no tiene nada.
```
</details>

## Felicitar a Diana (meta 50: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Diana recitó en el concierto. Ana va hasta ella y la felicita.

- ✔ Ana felicita a Diana. — 3 de 3 veces · 17:19, 1 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (23 líneas)</summary>

```
17:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
17:00 Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.
17:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
17:00 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
17:00 Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»
17:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
17:05 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
17:08 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
17:10 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
17:10 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
17:15 · Ana: Avonlea, junto al puente del arroyo · caminando
17:15 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
17:17 Ana dice: «¡Diana! ¡Espera!»
17:18 Diana dice: «¿Me llamabas?»
17:19 Ana va por Avonlea, junto al huerto de los Barry; empieza a felicitar a Diana; con las manos.
17:19 Ana dice: «¡Felicitaciones! Lo hiciste maravillosamente.»
17:20 · Ana: Avonlea, junto al huerto de los Barry · de pie · felicitar a Diana · con las manos
17:20 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
17:20 Ana termina de felicitar a Diana.
17:20 Diana dice: «¡Gracias! Estaba tan nerviosa…»
17:20 Ana dice: «¡Qué día para hacer algo bonito!»
17:21 Minnie May Barry dice: «¡Buenos días! ¿Ya supo lo de la vaca de los Cuthbert?»
17:22 Mary Joe dice: «¡Si lo sabe todo Avonlea! Esa vaca es más lista que el Sr. Harrison.»
```
</details>

## Consolar a Diana (meta 51: cumplida, cumplida, cumplida)

**Lo que debería pasar:** A Diana le prohibieron ver a Ana y está triste. Ana va hasta ella y la consuela con un abrazo.

- ✔ Ana la abraza. — 3 de 3 veces · 16:27, 1 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (36 líneas)</summary>

```
16:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
16:00 Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.
16:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
16:00 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
16:00 Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»
16:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
16:05 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
16:07 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
16:10 · Ana: Avonlea, junto al Bosque Encantado · caminando
16:10 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
16:15 · Ana: Avonlea, no lejos del puente del arroyo · caminando
16:15 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
16:17 Ana dice: «¡Diana! ¡Espera!»
16:17 Diana dice: «¿Me llamabas?»
16:18 Mary Joe dice: «¡Ay, señorita Ana! Yo no sé nada de enfermedades, menos mal que usted vino aquella noche.»
16:19 Ana está en Avonlea, junto a La Cuesta del Huerto.
16:19 Ana dice: «¡Buenas tardes, Minnie May Barry!»
16:20 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie
16:20 · Diana: Avonlea, junto a La Cuesta del Huerto · caminando
16:20 Minnie May Barry dice: «¡Hola, Ana! ¿A dónde vas?»
16:20 Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»
16:21 Minnie May Barry dice: «Nunca lo había pensado así.»
16:22 Diana dice: «Mamá dice que puedo salir hasta que se ponga el sol. ¿Vamos al lago?»
16:22 Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»
16:23 Minnie May Barry dice: «¡Qué imaginación tienes, niña!»
16:24 Ana dice: «¿No le parece que hoy el mundo está recién hecho?»
16:25 · Ana: Avonlea, junto a La Cuesta del Huerto · de pie
16:25 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
16:25 Minnie May Barry dice: «Esta niña... qué cosas dice.»
16:26 Ana dice: «Bueno, me voy, que tengo que consolar a Diana.»
16:27 Ana empieza a consolar a Diana; con un abrazo.
16:27 Ana dice: «No llores… todo se va a arreglar, ya verás. Yo estoy contigo.»
16:28 Ana termina de consolar a Diana.
16:28 Diana dice: «Gracias… ya me siento mejor.»
16:30 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
16:30 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
```
</details>

## Hacer heno (meta 52: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Matthew va al campo con la horquilla y junta el heno en un lugar y en otro, un buen rato; quedan los fardos en el campo.

- ✔ Junta el heno con la horquilla, un buen rato. — 3 de 3 veces · 09:06, 46 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (19 líneas)</summary>

```
09:00 Al empezar, Matthew está en Avonlea, junto al granero; ahora tiene 5 dólares.
09:00 · Matthew: Avonlea, junto al granero · caminando
09:05 · Matthew: Avonlea, no lejos del campo de heno · caminando
09:06 Matthew está en Avonlea, junto al campo de heno.
09:06 Matthew empieza a hacer heno.
09:06 Matthew dice: «A juntar el heno antes de que llueva…»
09:06 Matthew sigue, con la horquilla.
09:10 · Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla
09:15 · Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla
09:20 · Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla
09:22 Matthew sigue, con la horquilla.
09:25 · Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla
09:30 · Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla
09:35 · Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla
09:37 Matthew sigue, con la horquilla.
09:40 · Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla
09:45 · Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla
09:50 · Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla
09:52 Matthew termina de hacer heno; ahora tiene 5 dólares, 3 fardos de heno.
```
</details>

## Partir leña (meta 53: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Matthew parte leña con el hacha junto al granero, un buen rato. Lleva la leña a la cocina y se la da a Marilla.

- ✔ Parte leña junto al granero, un buen rato. — 3 de 3 veces · 09:00, 25 min
- ✔ Tiene la leña. — 3 de 3 veces · 09:25, 4 min
- ✔ Se la da a Marilla en la cocina. — 3 de 3 veces · 09:28, 0 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (27 líneas)</summary>

```
09:00 Al empezar, Matthew está en Avonlea, junto al granero; ahora tiene 5 dólares.
09:00 Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.
09:00 · Matthew: Avonlea, junto al granero · de pie
09:00 · Marilla: la cocina de Tejas Verdes · sentada
09:00 Matthew empieza a partir leña.
09:00 Matthew dice: «¡Zas! ¡Zas! Leña para la cocina de Marilla.»
09:00 Marilla se levanta.
09:00 Matthew sigue, con el hacha.
09:05 · Matthew: Avonlea, junto al granero · de pie · partir leña · con el hacha
09:05 · Marilla: la cocina de Tejas Verdes · de pie
09:10 · Matthew: Avonlea, junto al granero · de pie · partir leña · con el hacha
09:10 · Marilla: la cocina de Tejas Verdes · de pie
09:15 · Matthew: Avonlea, junto al granero · de pie · partir leña · con el hacha
09:15 · Marilla: la cocina de Tejas Verdes · de pie
09:20 · Matthew: Avonlea, junto al granero · de pie · partir leña · con el hacha
09:20 · Marilla: la cocina de Tejas Verdes · de pie
09:25 · Matthew: Avonlea, junto al granero · de pie · partir leña · con el hacha
09:25 · Marilla: la cocina de Tejas Verdes · de pie
09:25 Matthew termina de partir leña; ahora tiene 5 dólares, 3 atados de leña.
09:28 Matthew entra a la cocina de Tejas Verdes, junto a la puerta.
09:28 Matthew está en la cocina de Tejas Verdes; empieza a darle 3 atados de leña a Marilla; con lo que entrega.
09:29 Matthew termina de darle 3 atados de leña a Marilla; ahora tiene 5 dólares.
09:29 Marilla ahora tiene 3 atados de leña.
09:29 Marilla dice: «Gracias.»
09:29 Matthew sale.
09:30 · Matthew: Avonlea · caminando
09:30 · Marilla: la cocina de Tejas Verdes · de pie
```
</details>

## Batir mantequilla (meta 54: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Marilla pone la leche de la mañana en la mantequera, junto a la mesa, y bate sin parar una media hora, hasta que hay mantequilla.

- ✔ Bate en la mantequera una media hora. — 3 de 3 veces · 08:18, 30 min
- ✔ Tiene la mantequilla. — 3 de 3 veces · 08:48, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (19 líneas)</summary>

```
08:00 Al empezar, Marilla está en Avonlea, junto a Tejas Verdes.
08:00 · Marilla: Avonlea, junto a Tejas Verdes · de pie
08:00 Marilla dice: «¿Me traerías 2 jarros de leche?»
08:00 Marilla entra a la cocina de Tejas Verdes, junto a la puerta.
08:05 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
08:10 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
08:15 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
08:17 Marilla ahora tiene 2 jarros de leche.
08:17 Marilla dice: «Gracias.»
08:17 Marilla empieza a batir la mantequilla.
08:18 Marilla está en la cocina de Tejas Verdes; con la mantequera.
08:20 · Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera
08:25 · Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera
08:30 · Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera
08:35 · Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera
08:40 · Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera
08:45 · Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera
08:48 Marilla termina de batir la mantequilla; ahora tiene un pan de mantequilla.
08:50 · Marilla: la cocina de Tejas Verdes · de pie
```
</details>

## Sembrar y regar la huerta (meta 55: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana va a la huerta con las semillas y siembra cama por cama. Después llena la regadera y las riega, una por una.

- ✔ Siembra en la huerta. — 3 de 3 veces · 09:01, 15 min
- ✔ Riega con la regadera. — 3 de 3 veces · 09:17, 9 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (21 líneas)</summary>

```
09:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
09:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
09:01 Ana está en Avonlea, junto a la huerta de Tejas Verdes; empieza a sembrar la huerta.
09:01 Ana sigue, con las semillas.
09:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · sembrar la huerta · con las semillas
09:06 Ana sigue, con las semillas.
09:10 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · sembrar la huerta · con las semillas
09:11 Ana sigue, con las semillas.
09:15 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · sembrar la huerta · con las semillas
09:16 Ana termina de sembrar la huerta.
09:16 Ana empieza a regar la huerta.
09:17 Ana sigue, con la regadera.
09:20 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · regar la huerta · con la regadera
09:20 Ana sigue, con la regadera.
09:23 Ana sigue, con la regadera.
09:25 · Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · regar la huerta · con la regadera
09:26 Ana termina de regar la huerta.
09:26 Ana se sienta.
09:26 Ana dice: «¡A ver qué descubro por ahí!»
09:26 Ana se levanta.
09:27 Ana lleva can.
```
</details>

## Patinar en el lago (meta 56: cumplida, cumplida, cumplida)

**Lo que debería pasar:** En invierno, Ana se pone los patines y patina en el lago helado, dando vueltas, un buen rato.

- ✔ Patina en el lago, un buen rato. — 3 de 3 veces · 14:18, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (19 líneas)</summary>

```
14:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
14:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
14:05 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
14:10 · Ana: Avonlea, no lejos del puente del arroyo · caminando
14:11 Ana está en Avonlea, no lejos del Camino Blanco de las Delicias.
14:11 Ana dice: «El agua tiene hoy un color de perla... ¿o de ópalo?»
14:15 · Ana: Avonlea, no lejos del Lago de las Aguas Brillantes · caminando
14:18 Ana va por Avonlea, junto al Lago de las Aguas Brillantes; empieza a patinar en el lago; con los patines.
14:18 Ana dice: «¡Vuelo sobre el hielo como una golondrina!»
14:20 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines
14:25 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines
14:30 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines
14:35 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines
14:40 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines
14:45 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines
14:48 Ana termina de patinar en el lago.
14:48 Ana se sienta.
14:48 Ana se levanta.
14:50 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · de pie
```
</details>

## El trineo (meta 57: cumplida, cumplida, cumplida)

**Lo que debería pasar:** En invierno, Ana sube la colina con el trineo y se tira, una y otra vez, un buen rato.

- ✔ Se tira en trineo, una y otra vez, un buen rato. — 3 de 3 veces · 14:43, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (36 líneas)</summary>

```
14:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
14:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
14:03 La Sra. Lynde dice: «A una niña hay que enseñarle a ser útil. Pero, bueno, tú vas por buen camino.»
14:05 · Ana: Avonlea, no lejos del campo de heno · caminando
14:10 · Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando
14:12 Ana está en Avonlea, no lejos de la casa de Robert Bell.
14:12 Ana dice: «¡Hola, pequeño! ¿Cómo te llamas? Yo te diré Lord Fitzgerald.»
14:15 · Ana: Avonlea, no lejos de la casa de Robert Bell · de pie
14:20 · Ana: Avonlea, no lejos de la aldea · caminando
14:21 Una granjera dice: «Sí, se me acabó el azúcar. Con tanta compota...»
14:21 Ana está en Avonlea, junto a la aldea.
14:21 Ana dice: «¡Buenas tardes!»
14:22 El médico dice: «¡Qué gusto verle, Ana!»
14:23 Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»
14:24 El médico dice: «Nunca lo había pensado así.»
14:24 Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»
14:25 · Ana: Avonlea, junto a la aldea · de pie
14:26 El médico dice: «Tiempo tienes para decidirlo.»
14:26 Ana dice: «Bueno, me voy, que tengo que tirarme en trineo.»
14:30 · Ana: Avonlea, no lejos de la aldea de Avonlea (el cruce de caminos) · caminando
14:30 El editor de La Crónica dice: «Qué lindo día para tender la ropa.»
14:35 · Ana: Avonlea, no lejos de la casa de Robert Bell · caminando
14:36 Ana está en Avonlea, no lejos de la colina.
14:40 · Ana: Avonlea, no lejos de la colina · caminando
14:40 Una niñita dice: «¿Jugamos? Yo me escondo y tú cuentas hasta cien.»
14:43 Ana está en Avonlea, junto a la colina; se sienta; empieza a tirarse en trineo; con el trineo.
14:43 Ana dice: «¡Allá vamos, colina abajo! ¡Agárrate fuerte!»
14:45 · Ana: Avonlea, junto a la colina · sentada · tirarse en trineo · con el trineo
14:50 · Ana: Avonlea, junto a la colina · caminando · tirarse en trineo · con el trineo
14:55 · Ana: Avonlea, junto a la colina · caminando · tirarse en trineo · con el trineo
15:00 · Ana: Avonlea, junto a la colina · sentada · tirarse en trineo · con el trineo
15:05 · Ana: Avonlea, junto a la colina · sentada · tirarse en trineo · con el trineo
15:10 · Ana: Avonlea, junto a la colina · caminando · tirarse en trineo · con el trineo
15:13 Ana se levanta; termina de tirarse en trineo.
15:13 Ana se sienta.
15:15 · Ana: Avonlea, junto a la colina · sentada
```
</details>

## El picnic con Diana (meta 58: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana le pide permiso a Marilla. Prepara la canasta en la cocina. Va al lago con Diana; extienden el mantel, se sientan y meriendan, sin apuro, un buen rato.

- ✔ Prepara la canasta en la cocina. — 3 de 3 veces · 11:02, 15 min
- ✔ Merienda sentada sobre el mantel, un buen rato. — 3 de 3 veces · 11:59, 40 min
- ✔ Diana está sentada con ella. — 3 de 3 veces · 11:59, 40 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (110 líneas)</summary>

```
11:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
11:00 Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.
11:00 Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.
11:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
11:00 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:00 · Marilla: la cocina de Tejas Verdes · sentada
11:00 Marilla se levanta.
11:00 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
11:00 Marilla dice: «Matthew no lo dice, pero te echa de menos cuando te vas donde Diana.»
11:00 Ana dice: «Marilla, ¿puedo ir al picnic de la escuela dominical? ¡Va a haber helado!»
11:00 Ana está en la cocina de Tejas Verdes.
11:01 Marilla dice: «Está bien, puedes ir. Y te pongo una canasta con algo rico.»
11:02 Ana empieza a preparar una canasta de picnic.
11:02 Ana sigue, con el bol.
11:02 Ana está en la cocina de Tejas Verdes, junto a la estufa.
11:05 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar una canasta de picnic · con el bol
11:05 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:05 · Marilla: la cocina de Tejas Verdes · caminando
11:05 Marilla está en la cocina de Tejas Verdes, junto al fregadero.
11:07 Marilla está en la cocina de Tejas Verdes.
11:10 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar una canasta de picnic · con el bol
11:10 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:10 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · caminando
11:10 Marilla está en la cocina de Tejas Verdes, junto al fregadero.
11:13 Marilla está en la cocina de Tejas Verdes.
11:15 · Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar una canasta de picnic · con el bol
11:15 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:15 · Marilla: la cocina de Tejas Verdes, junto al fregadero · caminando
11:15 Marilla está en la cocina de Tejas Verdes, junto al fregadero.
11:17 Ana termina de preparar una canasta de picnic; ahora tiene una canasta de picnic.
11:17 Ana sale, junto a Tejas Verdes.
11:20 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
11:20 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:20 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · caminando
11:25 · Ana: Avonlea, junto al Bosque Encantado · caminando
11:25 · Diana: Avonlea, junto a La Cuesta del Huerto · caminando
11:25 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · caminando
11:30 · Ana: Avonlea, no lejos del puente del arroyo · caminando
11:30 · Diana: Avonlea, junto a La Cuesta del Huerto · caminando
11:30 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · caminando
11:32 Ana dice: «¡Diana! ¡Espera!»
11:32 Mary Joe dice: «Sí, se me acabó el azúcar. Con tanta compota...»
11:32 Diana dice: «¿Qué pasa?»
11:33 Ana está en Avonlea, junto al huerto de los Barry.
11:33 Ana dice: «¡Buenos días, Mary Joe!»
11:34 Mary Joe dice: «¡Buenos días, Ana! ¿Cómo están todos en casa?»
11:35 · Ana: Avonlea, junto al huerto de los Barry · de pie
11:35 · Diana: Avonlea, junto a La Cuesta del Huerto · de pie
11:35 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · caminando
11:35 Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»
11:36 Mary Joe dice: «Ya lo creo, Ana. Ya lo creo.»
11:37 Diana dice: «¡Ana, mi alma gemela! Te estaba esperando.»
11:37 Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»
11:38 Mary Joe dice: «Nunca lo había pensado así.»
11:38 Ana dice: «Bueno, me voy, que tengo que pedirle a Diana que den un paseo juntas.»
11:40 · Ana: Avonlea, junto al huerto de los Barry · de pie
11:40 · Diana: Avonlea, junto a La Cuesta del Huerto · caminando
11:40 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · caminando
11:40 Ana dice: «¿Vamos a dar un paseo juntas? Hace un día precioso.»
11:45 · Ana: Avonlea, junto al puente del arroyo · caminando
11:45 · Diana: Avonlea, junto al puente del arroyo · caminando
11:45 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · caminando
11:48 Diana está en Avonlea, no lejos del Bosque Encantado.
11:50 · Ana: Avonlea, no lejos del puente del arroyo · caminando
11:50 · Diana: Avonlea, no lejos del puente del arroyo · caminando
11:50 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · caminando
11:50 Diana está en Avonlea, no lejos del puente del arroyo.
11:52 Ana está en Avonlea, no lejos del Camino Blanco de las Delicias.
11:52 Ana dice: «¡El Lago de las Aguas Brillantes! Podría quedarme aquí la vida entera.»
11:52 Diana está en Avonlea, no lejos del Camino Blanco de las Delicias.
11:54 Diana está en Avonlea, no lejos del Lago de las Aguas Brillantes.
11:55 · Ana: Avonlea, no lejos del Lago de las Aguas Brillantes · caminando
11:55 · Diana: Avonlea, no lejos del Lago de las Aguas Brillantes · de pie
11:55 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · caminando
11:59 Ana está en Avonlea, junto al Lago de las Aguas Brillantes.
11:59 Ana se sienta; empieza a merendar en el lago con Diana; con el mantel del picnic.
11:59 Ana dice: «¡Un picnic junto al lago! Y hay helado… ¡nunca había probado helado! Es indescriptible.»
11:59 Diana está en Avonlea, junto al Lago de las Aguas Brillantes; se sienta.
12:00 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic
12:00 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada
12:00 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · caminando
12:00 Marilla está en la cocina de Tejas Verdes; se sienta.
12:05 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic
12:05 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada
12:05 · Marilla: la cocina de Tejas Verdes · sentada
12:10 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic
12:10 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada
12:10 · Marilla: la cocina de Tejas Verdes · sentada
12:15 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic
12:15 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada
12:15 · Marilla: la cocina de Tejas Verdes · sentada
12:20 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic
12:20 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada
12:20 · Marilla: la cocina de Tejas Verdes · sentada
12:25 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic
12:25 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada
12:25 · Marilla: la cocina de Tejas Verdes · sentada
12:30 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic
12:30 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada
12:30 · Marilla: la cocina de Tejas Verdes · sentada
12:35 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic
12:35 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada
12:35 · Marilla: la cocina de Tejas Verdes · sentada
12:39 Ana se levanta; termina de merendar en el lago con Diana; ya no tiene nada.
12:39 Diana se levanta.
12:39 Ana se sienta.
12:39 Ana se levanta.
12:40 · Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando
12:40 · Diana: Avonlea, junto al Lago de las Aguas Brillantes · caminando
12:40 · Marilla: la cocina de Tejas Verdes · sentada
```
</details>

## El corte de pelo (meta 60: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana se sienta en una silla en medio de la cocina. Marilla, detrás de ella con las tijeras, le corta el pelo verde, con cuidado, un buen rato.

- ✔ Ana sentada en la cocina mientras le cortan el pelo, un buen rato. — 3 de 3 veces · 16:00, 15 min
- ✔ Marilla está con ella en la cocina. — 3 de 3 veces · 16:05, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (20 líneas)</summary>

```
16:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes; tiene el pelo verde.
16:00 Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.
16:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
16:00 · Marilla: la cocina de Tejas Verdes · sentada
16:00 Marilla se levanta.
16:00 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
16:00 La Sra. Lynde dice: «Desde mi ventana veo todo el camino: no se me escapa nadie. Lo digo sin mala intención, ¿eh?»
16:00 Ana está en la cocina de Tejas Verdes; empieza a cortarse el pelo.
16:00 Marilla dice: «No hay más remedio, Ana: hay que cortarlo. Quédate quieta.»
16:00 Ana se sienta; con Marilla detrás, con las tijeras.
16:05 · Ana: la cocina de Tejas Verdes · sentada · cortarse el pelo · con Marilla detrás, con las tijeras
16:05 · Marilla: la cocina de Tejas Verdes · de pie
16:10 · Ana: la cocina de Tejas Verdes · sentada · cortarse el pelo · con Marilla detrás, con las tijeras
16:10 · Marilla: la cocina de Tejas Verdes · de pie
16:15 · Ana: la cocina de Tejas Verdes · sentada · cortarse el pelo · con Marilla detrás, con las tijeras
16:15 · Marilla: la cocina de Tejas Verdes · de pie
16:15 Ana se levanta; termina de cortarse el pelo.
16:15 Ana dice: «Mi pelo… Bueno, por lo menos ya no es verde.»
16:16 Ana está en la cocina de Tejas Verdes, junto a la estufa.
16:16 Ana ahora tiene una taza de té.
```
</details>

## El techo de los Barry (meta 61: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Josie la desafía. Ana sube al techo de la casa de los Barry, camina por el caballete con los brazos abiertos… y se cae. Se tuerce el tobillo.

- ✔ Sube al techo y camina por el caballete. — 3 de 3 veces · 15:22, 2 min
- ✔ Se cae y se tuerce el tobillo. — 3 de 3 veces · 15:23, 1 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (19 líneas)</summary>

```
15:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
15:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
15:00 Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»
15:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
15:07 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
15:10 · Ana: Avonlea, junto al Bosque Encantado · caminando
15:12 Ana está en Avonlea, junto al puente del arroyo.
15:12 Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»
15:15 · Ana: Avonlea, junto al puente del arroyo · de pie
15:20 · Ana: Avonlea, no lejos del huerto de los Barry · caminando
15:21 Mary Joe dice: «¡Ay, señorita Ana! Yo no sé nada de enfermedades, menos mal que usted vino aquella noche.»
15:22 Ana va por Avonlea, junto a La Cuesta del Huerto; empieza a caminar por el techo de los Barry.
15:22 Ana dice: «¡Josie Pye, mira cómo camino por el techo de los Barry!… ¡Ay!»
15:23 Ana dice: «¡Aaay!»
15:23 Ana dice: «¡Mi tobillo! Creo que me lo torcí… Diana, no puedo pararme.»
15:24 Ana se sienta; termina de caminar por el techo de los Barry.
15:24 Ana se levanta.
15:25 · Ana: Avonlea, junto a La Cuesta del Huerto · caminando
15:25 Diana dice: «El Bosque Encantado me da un poquito de miedo... pero contigo no.»
```
</details>

