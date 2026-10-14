# Auditoría de las acciones

Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.
**Pasos que ocurren como deberían: 132 de 132.** **Acciones en que alguna regla no se cumplió: 0 de 48.**

**Las reglas que siempre deben cumplirse**, se haga lo que se haga (se revisan en cada línea del relato): quien está enfermo está en cama; nadie se queda de pie dentro de un mueble; nadie se queda dentro de las paredes de una casa; nadie está en el agua (salvo en el bote, o patinando sobre el hielo); nadie está encima de otro; los animales de la cuerda van afuera.


## Lavar la loza y barrer la cocina (meta 26: cumplida)

**Lo que debería pasar:** Marilla le pide a Ana que lave los platos y barra. Ana junta los platos sucios de la mesa, los lleva al fregadero y los lava con agua caliente, sin apuro, unos diez minutos. Lleva la pila de platos limpios al aparador y los guarda. Después toma la escoba y barre la cocina de punta a punta, un buen rato.

- ✔ Recoge los platos sucios de la mesa. — 10:01, 19 min
- ✔ Los lleva en los brazos. — 10:04, 16 min
- ✔ Los lava en el fregadero, unos diez minutos. — 10:04, 16 min
- ✔ Lleva los platos limpios. — 10:16, 4 min
- ✔ Los guarda en el aparador. — 10:17, 3 min
- ✔ Barre la cocina con la escoba, un buen rato. — 10:20, 14 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (40 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** Marilla dice: «Ana, hay que lavar los platos y barrer la cocina. Y nada de quedarse soñando despierta.»  
**10:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:00** Ana empieza a lavar los platos.  
**10:00** Ana dice: «Lavo los platos con agua bien caliente… ¡y no rompo ninguno!»  
**10:01** Ana sigue, con los platos que va recogiendo.  
**10:01** Ana está en la cocina de Tejas Verdes, junto a la mesa.  
**10:01** Ana dice: «Sí, Marilla.»  
**10:04** Ana lleva los platos sucios.  
**10:04** Ana deja los platos sucios; con la palangana con agua.  
**10:04** Ana está en la cocina de Tejas Verdes, junto al fregadero.  
**10:05** _· Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · lavar los platos · con la palangana con agua_  
**10:10** _· Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · lavar los platos · con la palangana con agua_  
**10:15** _· Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · lavar los platos · con la palangana con agua_  
**10:16** Ana lleva una pila de platos limpios.  
**10:17** Ana deja una pila de platos limpios; con el aparador abierto.  
**10:17** Ana está en la cocina de Tejas Verdes, junto al aparador.  
**10:20** _· Ana: la cocina de Tejas Verdes, junto al aparador · de pie · lavar los platos · con el aparador abierto_  
**10:20** Ana termina de lavar los platos.  
**10:20** Ana empieza a barrer la cocina.  
**10:20** Ana dice: «Barro la cocina, y el patio también.»  
**10:20** Ana lleva la escoba.  
**10:20** Ana sigue, con la escoba.  
**10:23** Ana lleva la escoba.  
**10:23** Ana sigue, con la escoba.  
**10:25** _· Ana: la cocina de Tejas Verdes · de pie · barrer la cocina · con la escoba_  
**10:25** Ana lleva la escoba.  
**10:26** Ana sigue, con la escoba.  
**10:28** Ana lleva la escoba.  
**10:28** Ana sigue, con la escoba.  
**10:30** _· Ana: la cocina de Tejas Verdes · de pie · barrer la cocina · con la escoba_  
**10:31** Ana lleva la escoba.  
**10:32** Ana sigue, con la escoba.  
**10:34** Ana termina de barrer la cocina.  
**10:34** Ana dice: «Se me ocurrió una idea... ¡de esas que solo tengo yo!»  
**10:35** _· Ana: la cocina de Tejas Verdes · caminando_  
**10:35** Ana sale, junto a Tejas Verdes.  
**10:35** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:35** Marilla dice: «Matthew no lo dice, pero te echa de menos cuando te vas donde Diana.»  

</details>

## Escribir una carta y mandarla (meta 45: cumplida)

**Lo que debería pasar:** Ana sube a su pieza, se sienta al escritorio y escribe una carta a la Srta. Stacy, con el papel sobre el escritorio, sin apuro (una media hora). La dobla y la pone en su sobre. Después baja y va al correo (en la tienda de Lawson), y la deja para que la manden. Ya no la tiene.

- ✔ Escribe sentada al escritorio de su pieza, con la carta sobre él, una media hora. — 10:02, 50 min
- ✔ Termina con la carta en su sobre. — 10:52, 28 min
- ✔ Va al correo (en la tienda de Lawson). — 11:19, hasta el final
- ✔ La deja: ya no la tiene. — 11:21, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (46 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:00** Ana empieza a escribir una carta.  
**10:02** Ana entra a la pieza de Ana.  
**10:02** Ana está en la pieza de Ana, junto al escritorio; se sienta; con la banqueta y la carta sobre la mesa.  
**10:02** Ana se sienta derechita, como en la escuela, y moja la pluma.  
**10:04** Ana escribe: «Querida Srta. Stacy:»  
**10:05** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:06** Ana escribe: «Aquí en Tejas Verdes los cerezos están en flor.»  
**10:08** Ana dice: «Así empiezan las cartas de los libros: con el tiempo que hace. Debe ser porque es lo único que todos saben.»  
**10:10** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:11** Ana escribe: «Le escribo para contarle que terminé de leer el libro que nos recomendó, y que lloré en el capítulo once.»  
**10:13** Ana dice: «En realidad lloré en el diez también, pero lo del once fue más llanto. Más… literario.»  
**10:15** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:16** Tacha una palabra con tres rayas. Ana dice: ««Indescriptible» no: ya lo usé dos veces esta semana. La Srta. Stacy dice que una palabra gastada es como un vestido con brillo en los codos.»  
**10:18** Ana escribe: «Estuve pensando en lo que dijo de los adjetivos: esta carta tiene solo los indispensables. Bueno, casi.»  
**10:20** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:21** Cuenta los adjetivos con los dedos, y se le acaban los dedos.  
**10:23** Ana escribe: «Quería decirle que gracias a usted estudiar ya no me parece un castigo, sino una aventura.»  
**10:25** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:26** Ana escribe: «Su alumna que la quiere, Ana Shirley.»  
**10:30** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:35** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:40** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:45** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:50** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:52** Ana se levanta; termina de escribir una carta; ahora tiene una carta.  
**10:52** Ana entra a la cocina de Tejas Verdes, junto a la escalera.  
**10:52** Ana sale, junto a Tejas Verdes.  
**10:53** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**10:55** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**11:00** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**11:05** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**11:07** Ana está en Avonlea, no lejos de la casa de Robert Bell.  
**11:07** Ana dice: «¿Qué pensarán los animales de nosotros?»  
**11:10** _· Ana: Avonlea, no lejos de la casa de Robert Bell · de pie_  
**11:15** _· Ana: Avonlea, no lejos de la aldea · caminando_  
**11:16** Olivia King dice: «¡Buenos días! ¿Ya supo lo de la vaca de los Cuthbert?»  
**11:16** El médico dice: «¡Si lo sabe todo Avonlea! Esa vaca es más lista que el Sr. Harrison.»  
**11:19** Ana está en Avonlea, junto a la tienda de Lawson.  
**11:20** _· Ana: Avonlea, junto a la tienda de Lawson · de pie_  
**11:20** Ana dice: «Para la Srta. Stacy, en la pensión de Avonlea.»  
**11:21** Ana ya no tiene nada.  
**11:21** Ana dice: «Mi imaginación no me deja quieta.»  
**11:21** Janet King dice: «¿Has visto a Felix? Tendría que estar trayendo leña.»  

</details>

## La compota de Marilla (meta 8: cumplida)

**Lo que debería pasar:** Marilla quiere hacer compota para el invierno, pero no tiene manzanas: se las pide a Ana. Ana va a los manzanos, recoge las manzanas y se las lleva a Marilla a la cocina. Marilla las pela y las cuece en la estufa, removiendo, una media hora por tanda (quiere dos frascos: hace dos tandas) o más. Al final tiene la compota.

- ✔ Ana recoge manzanas de los manzanos. — 10:11, 11 min
- ✔ Ana tiene las manzanas. — 10:22, 24 min
- ✔ Se las da a Marilla en la cocina. — 10:45, 0 min
- ✔ Marilla tiene las manzanas. — 10:46, 61 min
- ✔ Marilla cocina la compota en la estufa, una media hora o más. — 10:47, 30 min
- ✔ Marilla tiene la compota. — 11:17, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (91 líneas)</summary>

**10:00** Al empezar, Marilla está en Avonlea, junto a Tejas Verdes.  
**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** _· Marilla: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** Marilla dice: «¿Me traerías 6 manzanas?»  
**10:00** Ana dice: «Sí, cómo no. Ahora mismo.»  
**10:00** Marilla entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:05** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:05** _· Ana: Avonlea, junto al Bosque Encantado · caminando_  
**10:10** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:10** _· Ana: Avonlea, no lejos del huerto de los Barry · caminando_  
**10:11** Mary Joe dice: «La señora Barry dice que tienda la ropa antes de que se nuble.»  
**10:11** Ana está en Avonlea, junto al huerto de los Barry; empieza a recoger 3 manzanas.  
**10:12** Ana sigue, con el canastito.  
**10:15** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:15** _· Ana: Avonlea, junto al huerto de los Barry · de pie · recoger 3 manzanas · con el canastito_  
**10:17** Ana sigue, con el canastito.  
**10:20** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:20** _· Ana: Avonlea, junto al huerto de los Barry · de pie · recoger 3 manzanas · con el canastito_  
**10:22** Ana termina de recoger 3 manzanas; ahora tiene 3 manzanas.  
**10:22** Ana empieza a recoger 3 manzanas.  
**10:22** Ana sigue, con el canastito.  
**10:25** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:25** _· Ana: Avonlea, junto al huerto de los Barry · de pie · recoger 3 manzanas · con el canastito_  
**10:28** Ana sigue, con el canastito.  
**10:30** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:30** _· Ana: Avonlea, junto al huerto de los Barry · de pie · recoger 3 manzanas · con el canastito_  
**10:33** Ana termina de recoger 3 manzanas; ahora tiene 6 manzanas.  
**10:34** Minnie May Barry dice: «¡Ana! ¿Me cuentas el cuento del hada otra vez?»  
**10:35** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:35** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**10:40** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:40** _· Ana: Avonlea, no lejos del Bosque Encantado · caminando_  
**10:45** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:45** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**10:45** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:45** Ana empieza a darle 6 manzanas a Marilla; con lo que entrega.  
**10:46** Marilla ahora tiene 6 manzanas.  
**10:46** Marilla dice: «Gracias.»  
**10:46** Ana termina de darle 6 manzanas a Marilla; ya no tiene nada.  
**10:46** Marilla empieza a cocinar una compota de manzana.  
**10:47** Marilla está en la cocina de Tejas Verdes, junto a la estufa; con el bol.  
**10:50** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**10:50** _· Ana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:55** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**10:55** _· Ana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**11:00** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**11:00** _· Ana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**11:03** Ana sale, junto a Tejas Verdes; se sienta.  
**11:03** Ana se levanta.  
**11:05** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**11:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**11:06** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**11:09** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**11:10** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**11:10** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie_  
**11:15** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**11:15** _· Ana: Avonlea, junto al Bosque Encantado · caminando_  
**11:16** Ana está en Avonlea, no lejos del Bosque Encantado.  
**11:17** Marilla termina de cocinar una compota de manzana; ahora tiene 3 manzanas, una compota de manzana.  
**11:17** Marilla empieza a cocinar una compota de manzana.  
**11:18** Ana está en Avonlea, junto al puente del arroyo.  
**11:20** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana_  
**11:20** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**11:23** Ana está en Avonlea, no lejos del huerto de los Barry.  
**11:25** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana_  
**11:25** _· Ana: Avonlea, no lejos del huerto de los Barry · caminando_  
**11:26** Mary Joe dice: «Todavía no. Anda a jugar un rato.»  
**11:27** Ana está en Avonlea, junto a La Cuesta del Huerto.  
**11:28** Diana dice: «Hola… ¿Tú eres la niña que vino a vivir a Tejas Verdes?»  
**11:29** Ana dice: «Sí… soy Ana. Ana con e. ¿Y tú… tú eres Diana Barry?»  
**11:30** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana_  
**11:30** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:30** Ana se sienta.  
**11:30** Diana dice: «Sí. Mamá dice que eres muy rara. Pero no pareces rara. Bueno, un poquito.»  
**11:32** Ana se pone colorada hasta las orejas. Y dice: «Tengo una imaginación muy grande, eso es todo. ¿Te… te gustaría que algún día jugáramos juntas?»  
**11:34** Diana dice: «Bueno… tal vez. Tengo que volver a casa ahora.»  
**11:34** Ana se levanta.  
**11:35** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana_  
**11:35** _· Ana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**11:35** Ana entra a la salita de La Cuesta del Huerto.  
**11:35** Ana está en la salita de La Cuesta del Huerto, junto a la mesita del té.  
**11:36** La Sra. Barry dice: «Saluda a Marilla de mi parte, querida.»  
**11:40** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana_  
**11:40** _· Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie_  
**11:45** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana_  
**11:45** _· Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie_  
**11:47** Ana dice: «Hay tanto por hacer y tan poco tiempo... ¡y yo con tantas ideas!»  
**11:47** Marilla termina de cocinar una compota de manzana; ahora tiene 2 compotas de manzana.  
**11:48** Ana sale, junto a La Cuesta del Huerto.  
**11:49** El Sr. Barry dice: «El heno está listo para entrar. Si no llueve, mañana lo cargamos.»  

</details>

## Matthew trae huevos (meta 20: cumplida)

**Lo que debería pasar:** Ana le pide huevos a Matthew. Matthew va donde están las gallinas, junto al granero, se agacha a sacarlos de los nidos y los junta. Se los lleva a Ana, que los recibe.

- ✔ Matthew se agacha junto al granero, donde están las gallinas, a sacar los huevos. — 09:06, 8 min
- ✔ Matthew tiene los huevos. — 09:13, 3 min
- ✔ Se los da a Ana. — 09:16, 0 min
- ✔ Ana tiene los huevos. — 09:16, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (25 líneas)</summary>

**09:00** Al empezar, Matthew está en Avonlea, junto a la huerta de Tejas Verdes; ahora tiene 5 dólares.  
**09:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**09:00** Ana dice: «¡Matthew! ¡Espera!»  
**09:00** _· Matthew: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**09:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**09:00** Matthew dice: «¿Sí?»  
**09:00** Ana dice: «¿Me traerías 6 huevos?»  
**09:00** Matthew dice: «¡Claro que sí! Ya vuelvo.»  
**09:00** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**09:04** Matthew está en Avonlea, junto al gallinero.  
**09:04** Matthew empieza a recoger 6 huevos.  
**09:05** _· Matthew: Avonlea, junto al gallinero · de pie · recoger 6 huevos_  
**09:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**09:06** Matthew se agacha; con el canastito.  
**09:09** Matthew se levanta.  
**09:10** _· Matthew: Avonlea, junto al gallinero · de pie · recoger 6 huevos_  
**09:10** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**09:10** Matthew se agacha; con el canastito.  
**09:13** Matthew se levanta; termina de recoger 6 huevos; ahora tiene 5 dólares, 6 huevos.  
**09:15** _· Matthew: Avonlea, junto a Tejas Verdes · caminando_  
**09:15** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**09:16** Matthew está en Avonlea, junto a la huerta de Tejas Verdes; empieza a darle 6 huevos a Ana; con lo que entrega.  
**09:16** Matthew termina de darle 6 huevos a Ana; ahora tiene 5 dólares.  
**09:16** Ana ahora tiene 6 huevos.  
**09:16** Ana dice: «Gracias.»  

</details>

## El tinte del buhonero (meta 59: cumplida)

**Lo que debería pasar:** Pasa el buhonero por Tejas Verdes. Ana le cambia unos huevos por un frasco de tinte que promete pelo negro como el ala de un cuervo. Sube a su pieza y, frente al espejo del lavatorio, se tiñe el pelo con cuidado, un buen rato. Cuando termina, el pelo le ha quedado... verde.

- ✔ Ana le pide el tinte al buhonero (a cambio de huevos). — 10:58, 13 min
- ✔ Ana tiene el tinte. — 11:15, 59 min
- ✔ Se tiñe frente al espejo del lavatorio de su pieza, un buen rato. — 11:59, 15 min
- ✔ El pelo le queda verde. — 12:14, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (112 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** Al empezar, el buhonero está en Avonlea, junto a la huerta de Tejas Verdes.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** _· el buhonero: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**10:01** Ana está en Avonlea, junto al gallinero; empieza a recoger 6 huevos.  
**10:02** Ana se agacha; con el canastito.  
**10:05** _· Ana: Avonlea, junto al gallinero · agachada · recoger 6 huevos · con el canastito_  
**10:05** _· el buhonero: Avonlea, no lejos del campo de heno · caminando_  
**10:05** Ana se levanta.  
**10:05** Ana se agacha; con el canastito.  
**10:08** Ana se levanta; termina de recoger 6 huevos; ahora tiene 6 huevos.  
**10:10** _· Ana: Avonlea, junto al corral de Tejas Verdes · caminando_  
**10:10** _· el buhonero: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**10:15** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**10:15** _· el buhonero: Avonlea, no lejos de la casa de Robert Bell · caminando_  
**10:20** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**10:20** _· el buhonero: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando_  
**10:25** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**10:25** _· el buhonero: Avonlea, no lejos del salón del pueblo · caminando_  
**10:30** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**10:30** _· el buhonero: Avonlea, no lejos de la colina · caminando_  
**10:34** El buhonero está en Avonlea, junto a la casa parroquial.  
**10:35** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**10:35** _· el buhonero: Avonlea, junto a la casa parroquial · de pie_  
**10:39** Ana está en Avonlea, no lejos de la casa de Robert Bell.  
**10:39** Ana dice: «¡Hola, pequeño! ¿Cómo te llamas? Yo te diré Lord Fitzgerald.»  
**10:40** _· Ana: Avonlea, no lejos de la casa de Robert Bell · de pie_  
**10:40** _· el buhonero: Avonlea, junto a la casa parroquial · de pie_  
**10:45** _· Ana: Avonlea, no lejos de la escuela · caminando_  
**10:45** _· el buhonero: Avonlea, junto a la casa parroquial · de pie_  
**10:46** El buhonero está en Avonlea, junto al faro.  
**10:47** El médico dice: «¡Buenos días! ¿Ya supo lo de la vaca de los Cuthbert?»  
**10:47** Una granjera dice: «¡Si lo sabe todo Avonlea! Esa vaca es más lista que el Sr. Harrison.»  
**10:50** _· Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando_  
**10:50** _· el buhonero: Avonlea, junto al faro · caminando_  
**10:53** Ana está en Avonlea, no lejos de la tienda de Lawson.  
**10:53** Ana dice: «¡Buenos días!»  
**10:53** Ana dice: «¡Un puente con techo! Es como cruzar el río por adentro de una caja de música.»  
**10:53** Un granjero dice: «¡Buenos días, Ana! ¿Cómo están todos en casa?»  
**10:54** Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»  
**10:55** _· Ana: Avonlea, no lejos de la tienda de Lawson · de pie_  
**10:55** _· el buhonero: Avonlea, junto al faro · de pie_  
**10:55** Un granjero dice: «¡Qué imaginación tienes, niña!»  
**10:56** Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»  
**10:57** Un granjero dice: «Nunca lo había pensado así.»  
**10:58** Ana dice: «Bueno, me voy, que tengo que cambiar 2 huevos por un frasco de tinte para el pelo.»  
**10:59** Un granjero dice: «¿Vas para la aldea? Yo vengo de la tienda de Lawson.»  
**11:00** _· Ana: Avonlea, no lejos de la tienda de Lawson · caminando_  
**11:00** _· el buhonero: Avonlea, junto al faro · de pie_  
**11:05** _· Ana: Avonlea, no lejos de la tienda de Lawson · caminando_  
**11:05** _· el buhonero: Avonlea, junto al faro · de pie_  
**11:08** Una granjera dice: «Buenas, buenas. No te entretengas, que se hace tarde.»  
**11:09** Ana dice: «¡Buhonero! ¡Espera!»  
**11:09** El buhonero dice: «¿Me llamabas?»  
**11:10** _· Ana: Avonlea, no lejos del faro · caminando_  
**11:10** _· el buhonero: Avonlea, junto al faro · de pie_  
**11:11** Ana está en Avonlea, no lejos del faro.  
**11:14** El buhonero dice: «¡Cintas, botones, peinetas, tinte para el pelo! ¡Todo lo que una señorita necesita!»  
**11:14** Ana dice: «Buenos días. ¿Me cambiaría 2 huevos por un frasco de tinte para el pelo?»  
**11:14** Ana está en Avonlea, junto al faro.  
**11:15** _· Ana: Avonlea, junto al faro · de pie_  
**11:15** _· el buhonero: Avonlea, junto al faro · de pie_  
**11:15** El buhonero dice: «Este tinte deja el pelo negro como el ala de un cuervo, señorita. ¡Y no se va con el lavado!»  
**11:15** Ana ahora tiene 4 huevos, un frasco de tinte para el pelo.  
**11:15** El buhonero dice: «¡Negro azabache garantizado! Palabra de honor.»  
**11:20** _· Ana: Avonlea, no lejos del faro · caminando_  
**11:20** _· el buhonero: Avonlea, junto al faro · caminando_  
**11:25** _· Ana: Avonlea, no lejos de la tienda de Lawson · caminando_  
**11:25** _· el buhonero: Avonlea, junto al faro · de pie_  
**11:27** La Srta. Hetty King dice: «Señorita, no se corre por la calle principal. ¡Y menos con el sombrero torcido!»  
**11:30** _· Ana: Avonlea, no lejos de la tienda de Lawson · caminando_  
**11:30** _· el buhonero: Avonlea, junto al faro · de pie_  
**11:32** El buhonero está en Avonlea, junto a la escuela.  
**11:32** Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).  
**11:32** Ana dice: «¡Buenos días, Olivia King!»  
**11:33** Olivia King dice: «¡Qué gusto verle, Ana!»  
**11:34** Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»  
**11:35** _· Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · de pie_  
**11:35** _· el buhonero: Avonlea, junto a la escuela · de pie_  
**11:35** Olivia King dice: «Nunca lo había pensado así.»  
**11:36** Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»  
**11:37** Olivia King dice: «¡Qué imaginación tienes, niña!»  
**11:37** Ana dice: «Bueno, me voy, que tengo que teñirme el pelo.»  
**11:38** El médico dice: «¿Alguien enfermo en Tejas Verdes? Espero que no.»  
**11:40** _· Ana: Avonlea, junto a la aldea · caminando_  
**11:40** _· el buhonero: Avonlea, junto a la escuela · caminando_  
**11:45** _· Ana: Avonlea, no lejos de la casa de Robert Bell · caminando_  
**11:45** _· el buhonero: Avonlea, junto a la escuela · de pie_  
**11:49** Thomas Lynde dice: «Buenas. Rachel está adentro. Ella habla por los dos, ¿sabes?»  
**11:50** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**11:50** _· el buhonero: Avonlea, junto a la escuela · de pie_  
**11:55** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**11:55** _· el buhonero: Avonlea, junto a la escuela · de pie_  
**11:57** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**11:57** Marilla dice: «Riega la huerta antes de que caiga el sol, que las plantas lo agradecen.»  
**11:58** Ana entra a la pieza de Ana.  
**11:58** Ana está en la pieza de Ana, junto al escritorio; empieza a teñirse el pelo.  
**11:59** Ana sigue, con el frasco de tinte.  
**11:59** Ana dice: «¡Negro azabache como el ala de un cuervo! Ya verán…»  
**11:59** Ana está en la pieza de Ana, junto al lavatorio y su espejo.  
**12:00** _· Ana: la pieza de Ana, junto al lavatorio y su espejo · de pie · teñirse el pelo · con el frasco de tinte_  
**12:00** _· el buhonero: Avonlea, junto a la escuela · de pie_  
**12:05** _· Ana: la pieza de Ana, junto al lavatorio y su espejo · de pie · teñirse el pelo · con el frasco de tinte_  
**12:05** _· el buhonero: Avonlea, junto a la escuela · de pie_  
**12:10** _· Ana: la pieza de Ana, junto al lavatorio y su espejo · de pie · teñirse el pelo · con el frasco de tinte_  
**12:10** _· el buhonero: Avonlea, junto a la escuela · de pie_  
**12:14** Ana termina de teñirse el pelo; ahora tiene 4 huevos; tiene el pelo verde.  
**12:14** Ana dice: «Ya está… a ver… ¡¿VERDE?! ¡Mi pelo está VERDE!»  
**12:14** Ana corre a la ventana y la abre de par en par. Afuera, un cerezo enorme, todo blanco de flores, le roza el marco.  
**12:15** _· Ana: la pieza de Ana, junto al lavatorio y su espejo · de pie_  
**12:15** _· el buhonero: Avonlea, junto a la escuela · caminando_  
**12:16** Ana dice: «¡Oh, qué hermoso! Es como si el árbol se hubiera vestido de novia para mí. ¿No es precioso?»  

</details>

## Vender la vaca (meta 0: cumplida)

**Lo que debería pasar:** Ana va al granero y descuelga la cuerda de su gancho. Le pone la cuerda a la vaca y la lleva, despacio, hasta quien la compra. Hacen el trato y Ana se queda con el dinero.

- ✔ Toma la cuerda en el granero (el gallinero está al lado). — 09:02, 2 min
- ✔ Lleva a la vaca de la cuerda. — 09:09, 27 min
- ✔ Vuelve con el dinero de la venta. — 09:35, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (26 líneas)</summary>

**09:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**09:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**09:02** Ana está en Avonlea, junto al granero; empieza a tomar una cuerda.  
**09:02** Ana sigue, con la cuerda.  
**09:03** Ana termina de tomar una cuerda; ahora tiene una cuerda.  
**09:04** Matthew dice: «Las vacas andan contentas hoy. Será por el sol, supongo.»  
**09:04** Ana dice: «¿Qué pensarán los animales de nosotros?»  
**09:05** _· Ana: Avonlea, junto al granero · de pie_  
**09:09** Ana lleva de la cuerda a Dolly.  
**09:09** Ana está en Avonlea, junto a la entrada del corral de Tejas Verdes.  
**09:10** _· Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · caminando_  
**09:15** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**09:16** Ana está en Avonlea, no lejos del campo de heno.  
**09:16** Ana dice: «¿Qué pensarán los animales de nosotros?»  
**09:20** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**09:25** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**09:29** Una vecina dice: «Mira qué cielo. Así da gusto salir.»  
**09:30** _· Ana: Avonlea, no lejos de la escuela · caminando_  
**09:34** El Sr. Shearer dice: «Ando apurado: me esperan en Carmody.»  
**09:34** Ana dice: «¿Le interesaría comprar esta vaca? Es buena lechera.»  
**09:34** Ana está en Avonlea, junto a la aldea.  
**09:35** _· Ana: Avonlea, junto a la aldea · de pie_  
**09:35** El Sr. Shearer dice: «Déjeme verla bien… los dientes, las patas… Sí, me conviene.»  
**09:35** Ana ahora tiene una cuerda, 20 dólares; suelta la cuerda.  
**09:35** El Sr. Shearer dice: «¡Trato hecho! Buena vaca.»  
**09:37** Ana está en Avonlea, no lejos de la aldea.  

</details>

## Una cinta para el pelo (trueque) (meta 1: cumplida)

**Lo que debería pasar:** Ana quiere una cinta y no tiene dinero. Va a los arbustos, se agacha y junta bayas en su canastito. Las lleva a la tienda de Lawson y las cambia por una cinta.

- ✔ Se agacha a juntar bayas. — 09:01, 6 min
- ✔ Tiene las bayas. — 09:07, 46 min
- ✔ Va a la tienda de Lawson. — 09:51, 2 min
- ✔ Tiene la cinta. — 09:53, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (45 líneas)</summary>

**09:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**09:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**09:00** Ana empieza a recoger 3 bayas.  
**09:01** Ana está en Avonlea, junto a los arbustos de bayas; se agacha; con el canastito.  
**09:04** Ana se levanta.  
**09:04** Ana se agacha; con el canastito.  
**09:05** _· Ana: Avonlea, junto a los arbustos de bayas · agachada · recoger 3 bayas · con el canastito_  
**09:07** Ana se levanta; termina de recoger 3 bayas; ahora tiene 3 bayas.  
**09:07** Ana empieza a recoger 3 bayas.  
**09:07** Ana se agacha; con el canastito.  
**09:10** _· Ana: Avonlea, junto a los arbustos de bayas · agachada · recoger 3 bayas · con el canastito_  
**09:10** Ana se levanta.  
**09:11** Ana se agacha; con el canastito.  
**09:14** Ana se levanta; termina de recoger 3 bayas; ahora tiene 6 bayas.  
**09:14** Ana empieza a recoger 3 bayas.  
**09:14** Ana se agacha; con el canastito.  
**09:15** _· Ana: Avonlea, junto a los arbustos de bayas · agachada · recoger 3 bayas · con el canastito_  
**09:17** Ana se levanta.  
**09:19** Ana se agacha; con el canastito.  
**09:20** _· Ana: Avonlea, junto a los arbustos de bayas · agachada · recoger 3 bayas · con el canastito_  
**09:22** Ana se levanta; termina de recoger 3 bayas; ahora tiene 9 bayas.  
**09:25** _· Ana: Avonlea, junto a Tejas Verdes · caminando_  
**09:30** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**09:35** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**09:38** Una vecina dice: «¿Vas para la aldea? Yo vengo de la tienda de Lawson.»  
**09:40** _· Ana: Avonlea, no lejos de la escuela · caminando_  
**09:42** Ana está en Avonlea, junto a la aldea.  
**09:42** Ana dice: «¡Buenos días!»  
**09:43** La Srta. Stacy dice: «¡Qué gusto verle, Ana!»  
**09:43** Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»  
**09:45** _· Ana: Avonlea, junto a la aldea · de pie_  
**09:45** La Srta. Stacy dice: «Tiempo tienes para decidirlo.»  
**09:45** Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»  
**09:46** La Srta. Stacy dice: «Nunca lo había pensado así.»  
**09:47** Ana dice: «Bueno, me voy, que tengo que cambiar 9 bayas por una cinta para el pelo.»  
**09:48** Felicity King dice: «Esta mañana hice pan yo solita. Bueno, casi solita.»  
**09:50** _· Ana: Avonlea, junto a la aldea · caminando_  
**09:51** Ana entra a la tienda de Lawson.  
**09:52** Ana dice: «Buenos días, Sr. Lawson. ¿Me cambiaría 9 bayas por una cinta para el pelo?»  
**09:52** El Sr. Lawson dice: «Veamos lo que traes… Sí, me sirven. Un momento.»  
**09:53** Ana ahora tiene una cinta para el pelo.  
**09:53** El Sr. Lawson dice: «Trato hecho. ¡Que lo disfrutes!»  
**09:54** Ana sale.  
**09:54** Un vecino dice: «¡Qué grande estás, niña! Saludos a Marilla.»  
**09:55** _· Ana: Avonlea · caminando_  

</details>

## Un regalo para Marilla (meta 2: cumplida)

**Lo que debería pasar:** Ana quiere regalarle algo a Marilla. Va a la huerta, se agacha y corta un ramo de flores. Entra a la cocina y se lo da a Marilla, que lo recibe.

- ✔ Corta flores en la huerta, agachada. — 10:01, 3 min
- ✔ Tiene el ramo. — 10:04, 7 min
- ✔ Se lo da a Marilla en la cocina. — 10:10, 0 min
- ✔ Marilla tiene el ramo. — 10:11, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (22 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**10:00** Marilla se levanta.  
**10:01** Ana está en Avonlea, junto a la huerta de Tejas Verdes; empieza a recoger un ramo de flores.  
**10:01** Ana se agacha; con el canastito.  
**10:04** Ana se levanta; termina de recoger un ramo de flores; ahora tiene un ramo de flores.  
**10:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**10:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:05** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:05** Ana dice: «Marilla, si me va a llamar Ana, ¿podría llamarme Ana con e?»  
**10:06** Marilla dice: «¿Qué diferencia hay, si se pronuncia igual?»  
**10:07** Ana dice: «¡Oh, mucha! Se ve tanto más bonito. Cuando oye un nombre, ¿no lo ve escrito en su cabeza, como impreso? Yo sí. A-n-a se ve horrible, pero A-n-n-e… se ve tan distinguido.»  
**10:09** Marilla aprieta los labios, pero casi sonríe. Y dice: «Está bien. Ana con e, entonces.»  
**10:10** _· Ana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:10** Ana empieza a darle un ramo de flores a Marilla; con lo que entrega.  
**10:11** Ana termina de darle un ramo de flores a Marilla; ya no tiene nada.  
**10:11** Marilla ahora tiene un ramo de flores.  
**10:11** Marilla dice: «¡Qué lindo detalle! Muchas gracias.»  
**10:11** Ana sale, junto a Tejas Verdes.  

</details>

## Matthew trae azúcar (meta 6: cumplida)

**Lo que debería pasar:** A Marilla le falta azúcar y se la pide a Matthew. Matthew va a la tienda de Lawson y la compra. Vuelve a la cocina y se la da.

- ✔ Matthew va a la tienda. — 10:22, 2 min
- ✔ Compra el azúcar. — 10:24, 23 min
- ✔ Se la da a Marilla en la cocina. — 10:47, 0 min
- ✔ Marilla tiene el azúcar. — 10:47, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (37 líneas)</summary>

**10:00** Al empezar, Matthew está en Avonlea, junto al granero; ahora tiene 5 dólares.  
**10:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**10:00** _· Matthew: Avonlea, junto al granero · caminando_  
**10:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**10:00** Marilla se levanta.  
**10:03** Marilla dice: «Si quieres cocinar, la estufa está encendida. Cuidado con no quemar nada esta vez.»  
**10:05** _· Matthew: Avonlea, no lejos del campo de heno · caminando_  
**10:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:10** _· Matthew: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**10:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:15** _· Matthew: Avonlea, no lejos de la casa de Robert Bell · caminando_  
**10:15** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:20** _· Matthew: Avonlea, junto a la aldea · caminando_  
**10:20** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:22** Matthew entra a la tienda de Lawson.  
**10:23** Matthew dice: «Buenos días, Sr. Lawson. ¿Me daría una taza de azúcar? A la libreta de los Cuthbert.»  
**10:23** El Sr. Lawson dice: «Cómo no. Déjame pesarla…»  
**10:24** Matthew ahora tiene 5 dólares, una taza de azúcar.  
**10:24** El Sr. Lawson dice: «Anotado en la libreta de los Cuthbert. Saludos a Marilla.»  
**10:24** Matthew sale.  
**10:25** _· Matthew: Avonlea · caminando_  
**10:25** _· Marilla: la cocina de Tejas Verdes, junto a la mesa · caminando_  
**10:30** _· Matthew: Avonlea · caminando_  
**10:30** _· Marilla: la cocina de Tejas Verdes, junto a la mesa · caminando_  
**10:31** Matthew dice: «Ejem... tranquila, tranquila.»  
**10:35** _· Matthew: Avonlea · caminando_  
**10:35** _· Marilla: la cocina de Tejas Verdes, junto a la mesa · caminando_  
**10:40** _· Matthew: Avonlea · caminando_  
**10:40** _· Marilla: la cocina de Tejas Verdes, junto a la mesa · caminando_  
**10:45** _· Matthew: Avonlea · caminando_  
**10:45** _· Marilla: la cocina de Tejas Verdes, junto a la mesa · caminando_  
**10:46** Matthew entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:47** Matthew empieza a darle una taza de azúcar a Marilla; con lo que entrega.  
**10:47** Matthew termina de darle una taza de azúcar a Marilla; ahora tiene 5 dólares.  
**10:47** Marilla ahora tiene una taza de azúcar.  
**10:47** Marilla dice: «Gracias.»  
**10:47** Matthew sale, junto a Tejas Verdes.  

</details>

## El té con la Sra. Allan (meta 14: cumplida)

**Lo que debería pasar:** La Sra. Allan invita a Ana a tomar el té. Prepara el té en su casa. Ana llega y se sientan juntas a la mesa, con las tazas, a conversar sin apuro, una media hora.

- ✔ La Sra. Allan prepara el té. — 16:14, 30 min
- ✔ Ana toma el té sentada a la mesita, en la salita de la casa parroquial, una media hora. — 17:18, 30 min
- ✔ La Sra. Allan se sienta con ella a la mesita, con su taza, una media hora. — 17:18, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (123 líneas)</summary>

**15:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**15:00** Al empezar, la Sra. Allan está en Avonlea, junto a la iglesia.  
**15:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**15:00** _· la Sra. Allan: Avonlea, junto a la iglesia · caminando_  
**15:01** Ana se sienta.  
**15:02** Ana dice: «Se me ocurrió una idea... ¡de esas que solo tengo yo!»  
**15:05** _· Ana: Avonlea, junto a Tejas Verdes · sentada_  
**15:05** _· la Sra. Allan: Avonlea, no lejos de la casa de Robert Bell · caminando_  
**15:05** La Sra. Lynde dice: «Ana Shirley, hablas más que un molino... pero tienes buen corazón, eso lo reconozco.»  
**15:07** Ana dice: «Hay tanto por hacer y tan poco tiempo... ¡y yo con tantas ideas!»  
**15:07** Ana se levanta.  
**15:09** Ana está en Avonlea, junto a los arbustos de bayas.  
**15:10** _· Ana: Avonlea, junto a los arbustos de bayas · de pie_  
**15:10** _· la Sra. Allan: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando_  
**15:12** Ana está en Avonlea, junto al campo de avena del Sr. Harrison.  
**15:14** La Sra. Allan está en Avonlea, no lejos de la escuela.  
**15:14** La Sra. Allan dice: «¡Buenas tardes!»  
**15:15** _· Ana: Avonlea, junto al campo de avena del Sr. Harrison · caminando_  
**15:15** _· la Sra. Allan: Avonlea, no lejos de la escuela · de pie_  
**15:15** Una granjera dice: «¡Qué gusto verle!»  
**15:16** La Sra. Allan dice: «Dicen que el nuevo pastor predica muy bonito.»  
**15:16** Ana entra a la casa del Sr. Harrison.  
**15:17** Una granjera dice: «Y la Sra. Allan es un encanto, eso sí.»  
**15:17** El Sr. Harrison dice: «¿Esa vaca tuya se ha portado bien hoy? Más le vale.»  
**15:17** La Sra. Allan dice: «¿Va a la tienda de Lawson?»  
**15:18** Una granjera dice: «Sí, se me acabó el azúcar. Con tanta compota...»  
**15:19** La Sra. Allan dice: «Bueno, me voy, que tengo que pedirle a Ana que venga a tomar el té más tarde.»  
**15:20** _· Ana: la casa del Sr. Harrison · de pie_  
**15:20** _· la Sra. Allan: Avonlea, no lejos de la escuela · de pie_  
**15:23** Ana sale.  
**15:25** _· Ana: Avonlea · caminando_  
**15:25** _· la Sra. Allan: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**15:30** _· Ana: Avonlea · caminando_  
**15:30** _· la Sra. Allan: Avonlea, no lejos del campo de heno · caminando_  
**15:32** La Sra. Allan dice: «¡Ana! ¡Espera!»  
**15:34** La Sra. Allan dice: «Me encantó tu recitación. Tienes un don, Ana.»  
**15:35** _· Ana: Avonlea · de pie_  
**15:35** _· la Sra. Allan: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**15:35** La Sra. Allan está en Avonlea, junto a la huerta de Tejas Verdes.  
**15:35** La Sra. Allan dice: «¿Vendrías a tomar el té conmigo esta tarde, a las 18:00? En la casa parroquial.»  
**15:35** Ana dice: «¡Oh, Sra. Allan! Usted es mi espíritu afín.»  
**15:36** Ana dice: «¡Sí, me encantaría! Allí estaré.»  
**15:40** _· Ana: Avonlea · de pie_  
**15:40** _· la Sra. Allan: Avonlea, no lejos del campo de heno · caminando_  
**15:45** _· Ana: Avonlea · de pie_  
**15:45** _· la Sra. Allan: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**15:50** _· Ana: Avonlea · de pie_  
**15:50** _· la Sra. Allan: Avonlea, no lejos de la casa de Robert Bell · caminando_  
**15:54** La Sra. Allan está en Avonlea, junto a la aldea.  
**15:54** La Sra. Allan dice: «¡Buenas tardes, Gertie Pye!»  
**15:55** _· Ana: Avonlea · de pie_  
**15:55** _· la Sra. Allan: Avonlea, junto a la aldea · de pie_  
**15:55** Gertie Pye dice: «¡Buenas tardes! ¿Cómo están todos en casa?»  
**15:56** La Sra. Allan dice: «¡Buenas tardes! ¿Ya supo lo de la vaca de los Cuthbert?»  
**15:57** Gertie Pye dice: «¡Si lo sabe todo Avonlea! Esa vaca es más lista que el Sr. Harrison.»  
**15:58** La Sra. Allan dice: «¿Va a la tienda de Lawson?»  
**15:59** Gertie Pye dice: «Sí, se me acabó el azúcar. Con tanta compota...»  
**16:00** _· Ana: Avonlea · de pie_  
**16:00** _· la Sra. Allan: Avonlea, junto a la aldea · de pie_  
**16:00** La Sra. Allan dice: «Bueno, me voy, que tengo que preparar el té.»  
**16:05** _· Ana: Avonlea · de pie_  
**16:05** _· la Sra. Allan: Avonlea, junto al salón del pueblo · caminando_  
**16:10** _· Ana: Avonlea · de pie_  
**16:10** _· la Sra. Allan: Avonlea, no lejos de la colina · caminando_  
**16:14** La Sra. Allan entra a la salita de la casa parroquial, junto a la puerta.  
**16:14** La Sra. Allan empieza a preparar el té; con el bol.  
**16:15** _· Ana: Avonlea · de pie_  
**16:15** _· la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol_  
**16:20** _· Ana: Avonlea · de pie_  
**16:20** _· la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol_  
**16:25** _· Ana: Avonlea · de pie_  
**16:25** _· la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol_  
**16:30** _· Ana: Avonlea · de pie_  
**16:30** _· la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol_  
**16:35** _· Ana: Avonlea · de pie_  
**16:35** _· la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol_  
**16:40** _· Ana: Avonlea · de pie_  
**16:40** _· la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol_  
**16:44** La Sra. Allan termina de preparar el té; ahora tiene una taza de té.  
**16:45** _· Ana: Avonlea · de pie_  
**16:45** _· la Sra. Allan: la salita de la casa parroquial · de pie_  
**16:50** _· Ana: Avonlea · de pie_  
**16:50** _· la Sra. Allan: la salita de la casa parroquial · de pie_  
**16:55** _· Ana: Avonlea · de pie_  
**16:55** _· la Sra. Allan: la salita de la casa parroquial · de pie_  
**17:00** _· Ana: Avonlea · de pie_  
**17:00** _· la Sra. Allan: la salita de la casa parroquial · de pie_  
**17:05** _· Ana: Avonlea · caminando_  
**17:05** _· la Sra. Allan: la salita de la casa parroquial · de pie_  
**17:10** _· Ana: Avonlea · caminando_  
**17:10** _· la Sra. Allan: la salita de la casa parroquial · de pie_  
**17:10** Felicity King dice: «¡Gané la carrera hasta el portón!»  
**17:10** La Sra. Pye dice: «¡Muy bien! Pero no corras tanto, que te caes.»  
**17:15** _· Ana: Avonlea · caminando_  
**17:15** _· la Sra. Allan: la salita de la casa parroquial · de pie_  
**17:18** Ana entra a la salita de la casa parroquial, junto a la puerta.  
**17:18** Ana está en la salita de la casa parroquial, junto a la mesita del té; se sienta.  
**17:18** Ana empieza a tomar el té con la Sra. Allan; con el té.  
**17:18** La Sra. Allan está en la salita de la casa parroquial, junto a la mesita del té; se sienta; empieza a tomar el té con Ana; con el té.  
**17:18** La Sra. Allan dice: «¿Un poco más de té? Y prueba estas galletas.»  
**17:20** _· Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té_  
**17:20** _· la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té_  
**17:21** Ana dice: «¡Están deliciosas! Es como estar en un libro.»  
**17:24** La Sra. Allan dice: «Cuéntame qué estás leyendo ahora.»  
**17:25** _· Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té_  
**17:25** _· la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té_  
**17:27** Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»  
**17:30** _· Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té_  
**17:30** _· la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té_  
**17:35** _· Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té_  
**17:35** _· la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té_  
**17:40** _· Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té_  
**17:40** _· la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té_  
**17:45** _· Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té_  
**17:45** _· la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té_  
**17:48** La Sra. Allan se levanta; termina de tomar el té con Ana.  
**17:48** Ana se levanta; termina de tomar el té con la Sra. Allan.  
**17:48** La Sra. Allan sale, junto a la casa parroquial.  
**17:48** Ana dice: «¡A ver qué descubro por ahí!»  
**17:50** _· Ana: la salita de la casa parroquial · caminando_  
**17:50** _· la Sra. Allan: Avonlea, junto a la casa parroquial · de pie_  
**17:50** Ana sale, junto a la casa parroquial.  
**17:50** Un granjero dice: «Buenas, buenas. No te entretengas, que se hace tarde.»  

</details>

## Peg Bowen junta hierbas (meta 15: cumplida)

**Lo que debería pasar:** Peg Bowen anda por el bosque. Se agacha aquí y allá a juntar hierbas, varias veces, y se las lleva.

- ✔ Se agacha a juntar hierbas. — 10:01, 10 min
- ✔ Tiene las hierbas. — 10:11, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (13 líneas)</summary>

**10:00** Al empezar, Peg Bowen está en Avonlea, no lejos del bosque de Peg Bowen.  
**10:00** _· Peg Bowen: Avonlea, no lejos del bosque de Peg Bowen · caminando_  
**10:01** Peg Bowen está en Avonlea, junto al bosque de Peg Bowen.  
**10:01** Peg Bowen empieza a recoger 3 manojos de hierbas.  
**10:01** Peg Bowen se agacha; con el canastito.  
**10:04** Peg Bowen se levanta.  
**10:05** _· Peg Bowen: Avonlea, junto al bosque de Peg Bowen · caminando · recoger 3 manojos de hierbas_  
**10:05** Peg Bowen se agacha; con el canastito.  
**10:08** Peg Bowen se levanta.  
**10:08** Peg Bowen se agacha; con el canastito.  
**10:10** _· Peg Bowen: Avonlea, junto al bosque de Peg Bowen · agachada · recoger 3 manojos de hierbas · con el canastito_  
**10:11** Peg Bowen se levanta; termina de recoger 3 manojos de hierbas; ahora tiene 3 manojos de hierbas.  
**10:11** Peg Bowen está en Avonlea, no lejos del bosque de Peg Bowen.  

</details>

## La compota para la Sra. Barry (meta 17: cumplida)

**Lo que debería pasar:** La Sra. Barry quiere compota y se la pide a Diana; Diana se la pide a Ana. Ana la consigue y se la lleva a la Sra. Barry.

- ✔ Ana le da la compota. — 11:26, 0 min
- ✔ La Sra. Barry tiene la compota. — 11:27, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (97 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** Al empezar, la Sra. Barry está en la salita de La Cuesta del Huerto.  
**10:00** Al empezar, Diana está en la salita de La Cuesta del Huerto; ahora tiene un libro.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** _· la Sra. Barry: la salita de La Cuesta del Huerto · caminando_  
**10:00** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**10:00** La Sra. Barry sale.  
**10:00** Diana sale.  
**10:00** La Sra. Barry dice: «¿Me traerías una compota de manzana?»  
**10:00** Diana dice: «¡Buenos días, Sra. Barry!»  
**10:00** La Sra. Barry dice: «¡Qué gusto verle, Diana!»  
**10:01** Diana dice: «¿Va a la tienda de Lawson?»  
**10:01** Ana se sienta.  
**10:02** La Sra. Barry dice: «Sí, se me acabó el azúcar. Con tanta compota...»  
**10:02** Ana se levanta.  
**10:03** Diana dice: «Bueno, me voy, que tengo que pedirle a Ana que le traiga una compota de manzana.»  
**10:04** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**10:04** Diana dice: «Sí, cómo no. Ahora mismo.»  
**10:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**10:05** _· la Sra. Barry: Avonlea · de pie_  
**10:05** _· Diana: Avonlea · caminando_  
**10:10** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**10:10** _· la Sra. Barry: Avonlea · de pie_  
**10:10** _· Diana: Avonlea · caminando_  
**10:10** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**10:11** Diana dice: «¡Ana! ¡Espera!»  
**10:12** Diana dice: «Hola… ¿Tú eres la niña que vino a vivir a Tejas Verdes?»  
**10:13** Diana dice: «¿Me traerías una compota de manzana?»  
**10:14** Ana dice: «Sí, cómo no. Ahora mismo.»  
**10:14** Ana dice: «Sí… soy Ana. Ana con e. ¿Y tú… tú eres Diana Barry?»  
**10:15** _· Ana: Avonlea, junto al Bosque Encantado · caminando_  
**10:15** _· la Sra. Barry: Avonlea · de pie_  
**10:15** _· Diana: Avonlea · caminando_  
**10:15** Diana dice: «Sí. Mamá dice que eres muy rara. Pero no pareces rara. Bueno, un poquito.»  
**10:16** Ana se pone colorada hasta las orejas. Y dice: «Tengo una imaginación muy grande, eso es todo. ¿Te… te gustaría que algún día jugáramos juntas?»  
**10:20** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**10:20** _· la Sra. Barry: Avonlea · de pie_  
**10:20** _· Diana: Avonlea · caminando_  
**10:20** Ana está en Avonlea, junto al huerto de los Barry; empieza a recoger 3 manzanas.  
**10:21** Ana sigue, con el canastito.  
**10:25** _· Ana: Avonlea, junto al huerto de los Barry · de pie · recoger 3 manzanas · con el canastito_  
**10:25** _· la Sra. Barry: Avonlea · de pie_  
**10:25** _· Diana: Avonlea · de pie_  
**10:26** Ana sigue, con el canastito.  
**10:30** _· Ana: Avonlea, junto al huerto de los Barry · de pie · recoger 3 manzanas · con el canastito_  
**10:30** _· la Sra. Barry: Avonlea · de pie_  
**10:30** _· Diana: Avonlea · de pie_  
**10:31** Ana termina de recoger 3 manzanas; ahora tiene 3 manzanas.  
**10:31** Mary Joe dice: «La señora Barry dice que tienda la ropa antes de que se nuble.»  
**10:35** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**10:35** _· la Sra. Barry: Avonlea · de pie_  
**10:35** _· Diana: Avonlea · de pie_  
**10:40** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**10:40** _· la Sra. Barry: Avonlea · de pie_  
**10:40** _· Diana: Avonlea · de pie_  
**10:43** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:44** Ana empieza a cocinar una compota de manzana.  
**10:44** Ana sigue, con el bol.  
**10:44** Ana está en la cocina de Tejas Verdes, junto a la estufa.  
**10:45** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**10:45** _· la Sra. Barry: Avonlea · de pie_  
**10:45** _· Diana: Avonlea · de pie_  
**10:50** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**10:50** _· la Sra. Barry: Avonlea · de pie_  
**10:50** _· Diana: Avonlea · de pie_  
**10:55** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**10:55** _· la Sra. Barry: Avonlea · de pie_  
**10:55** _· Diana: Avonlea · de pie_  
**11:00** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**11:00** _· la Sra. Barry: Avonlea · de pie_  
**11:00** _· Diana: Avonlea · de pie_  
**11:05** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**11:05** _· la Sra. Barry: Avonlea · de pie_  
**11:05** _· Diana: Avonlea · de pie_  
**11:10** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**11:10** _· la Sra. Barry: Avonlea · de pie_  
**11:10** _· Diana: Avonlea · de pie_  
**11:14** Ana termina de cocinar una compota de manzana; ahora tiene una compota de manzana.  
**11:14** Ana sale, junto a Tejas Verdes.  
**11:15** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**11:15** _· la Sra. Barry: Avonlea · de pie_  
**11:15** _· Diana: Avonlea · de pie_  
**11:20** _· Ana: Avonlea, junto al Bosque Encantado · caminando_  
**11:20** _· la Sra. Barry: Avonlea · de pie_  
**11:20** _· Diana: Avonlea · de pie_  
**11:25** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**11:25** _· la Sra. Barry: Avonlea · de pie_  
**11:25** _· Diana: Avonlea · de pie_  
**11:25** Minnie May Barry dice: «Diana no me deja jugar con sus muñecas. ¿Tú me dejas?»  
**11:26** Ana va por Avonlea, junto a La Cuesta del Huerto; empieza a darle una compota de manzana a Diana; con lo que entrega.  
**11:26** Ana termina de darle una compota de manzana a Diana; ya no tiene nada.  
**11:26** Diana ahora tiene un libro, una compota de manzana.  
**11:26** Diana dice: «¡Oh! Justo lo que me gusta.»  
**11:26** Diana empieza a darle una compota de manzana a la Sra. Barry; con lo que entrega.  
**11:27** La Sra. Barry ahora tiene una compota de manzana.  
**11:27** La Sra. Barry dice: «Gracias.»  
**11:27** Diana termina de darle una compota de manzana a la Sra. Barry; ahora tiene un libro.  

</details>

## Ordeñar y llevar la leche (meta 27: cumplida)

**Lo que debería pasar:** Matthew va al corral, se sienta en el banquito junto a la vaca y la ordeña en el balde, sin apuro, un cuarto de hora. Lleva la leche a la cocina y se la da a Marilla.

- ✔ Ordeña sentado junto a la vaca, con el balde, un cuarto de hora. — 09:01, 15 min
- ✔ Tiene la leche. — 09:16, 4 min
- ✔ Se la da a Marilla en la cocina. — 09:20, 0 min
- ✔ Marilla tiene la leche. — 09:20, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (25 líneas)</summary>

**09:00** Al empezar, Matthew está en Avonlea, junto al granero; ahora tiene 5 dólares.  
**09:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**09:00** _· Matthew: Avonlea, junto al granero · caminando_  
**09:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**09:00** Marilla se levanta.  
**09:01** Matthew está en Avonlea, junto a la entrada del corral de Tejas Verdes.  
**09:01** Matthew empieza a ordeñar a Dolly.  
**09:01** Matthew dice: «Tranquila, Dolly… ya está, ya está.»  
**09:01** Matthew se sienta; con el balde.  
**09:05** _· Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · sentado · ordeñar a Dolly · con el balde_  
**09:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**09:10** _· Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · sentado · ordeñar a Dolly · con el balde_  
**09:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**09:15** _· Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · sentado · ordeñar a Dolly · con el balde_  
**09:15** _· Marilla: la cocina de Tejas Verdes · de pie_  
**09:16** Matthew se levanta; termina de ordeñar a Dolly; ahora tiene 5 dólares, 2 jarros de leche.  
**09:16** Matthew dice: «Buen animal, sí... buen animal.»  
**09:20** _· Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · caminando_  
**09:20** _· Marilla: la cocina de Tejas Verdes · de pie_  
**09:20** Matthew entra a la cocina de Tejas Verdes, junto a la puerta.  
**09:20** Matthew empieza a darle 2 jarros de leche a Marilla; con lo que entrega.  
**09:20** Matthew termina de darle 2 jarros de leche a Marilla; ahora tiene 5 dólares.  
**09:20** Marilla ahora tiene 2 jarros de leche.  
**09:20** Marilla dice: «Gracias.»  
**09:20** Matthew sale, junto a Tejas Verdes.  

</details>

## Matthew da de comer a los animales (meta 28: cumplida)

**Lo que debería pasar:** Matthew lleva el grano al corral y lo va echando, en un lado y en otro, mientras los animales se acercan.

- ✔ Echa el grano en el corral. — 08:00, 8 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (15 líneas)</summary>

**08:00** Al empezar, Matthew está en Avonlea, junto al granero; ahora tiene 5 dólares.  
**08:00** _· Matthew: Avonlea, junto al granero · caminando_  
**08:00** Matthew empieza a dar de comer a los animales en el gallinero; con el grano.  
**08:05** _· Matthew: Avonlea, junto al granero · de pie · dar de comer a los animales en el gallinero · con el grano_  
**08:08** Matthew termina de dar de comer a los animales en el gallinero.  
**08:09** Matthew está en Avonlea, junto a la entrada del corral de Tejas Verdes.  
**08:09** Matthew empieza a dar de comer a los animales en el corral.  
**08:10** _· Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · de pie · dar de comer a los animales en el corral_  
**08:11** Matthew sigue, con el grano.  
**08:15** _· Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · de pie · dar de comer a los animales en el corral · con el grano_  
**08:17** Matthew sigue, con el grano.  
**08:20** _· Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · de pie · dar de comer a los animales en el corral · con el grano_  
**08:21** Matthew termina de dar de comer a los animales en el corral.  
**08:22** Matthew entra a la cocina de Tejas Verdes.  
**08:22** Matthew se sienta.  

</details>

## Visita a la Sra. Lynde (meta 29: cumplida)

**Lo que debería pasar:** Ana va a la casa de la Sra. Lynde. Se sienta con ella y conversan con una taza de té, una media hora.

- ✔ Llega a la casa de la Sra. Lynde. — 15:10, 31 min
- ✔ Se sienta a tomar el té y conversar, una media hora. — 15:11, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (33 líneas)</summary>

**15:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**15:00** Al empezar, la Sra. Lynde está en la casa de la Sra. Lynde.  
**15:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**15:00** _· la Sra. Lynde: la casa de la Sra. Lynde · caminando_  
**15:00** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**15:05** _· Ana: Avonlea, no lejos de la huerta de Tejas Verdes · caminando_  
**15:05** _· la Sra. Lynde: la casa de la Sra. Lynde · caminando_  
**15:10** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**15:10** _· la Sra. Lynde: la casa de la Sra. Lynde · caminando_  
**15:10** Ana entra a la casa de la Sra. Lynde.  
**15:10** La Sra. Lynde dice: «Llevo cincuenta y dos cubrecamas de retazos, ¡cincuenta y dos! Y no pienso parar.»  
**15:10** Ana empieza a visitar a la Sra. Lynde; con el té.  
**15:10** Ana dice: «Buenas tardes, Sra. Lynde. Vine a visitarla.»  
**15:11** La Sra. Lynde dice: «¡Pasa, pasa! Siéntate, que pongo la tetera.»  
**15:11** Ana se sienta; con el té.  
**15:11** La Sra. Lynde se sienta.  
**15:15** _· Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té_  
**15:15** _· la Sra. Lynde: la casa de la Sra. Lynde · sentada_  
**15:20** _· Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té_  
**15:20** _· la Sra. Lynde: la casa de la Sra. Lynde · sentada_  
**15:25** _· Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té_  
**15:25** _· la Sra. Lynde: la casa de la Sra. Lynde · sentada_  
**15:30** _· Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té_  
**15:30** _· la Sra. Lynde: la casa de la Sra. Lynde · sentada_  
**15:35** _· Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té_  
**15:35** _· la Sra. Lynde: la casa de la Sra. Lynde · sentada_  
**15:40** _· Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té_  
**15:40** _· la Sra. Lynde: la casa de la Sra. Lynde · sentada_  
**15:41** Ana se levanta; termina de visitar a la Sra. Lynde.  
**15:41** La Sra. Lynde se levanta.  
**15:41** Ana dice: «¡Qué día para hacer algo bonito!»  
**15:42** La Sra. Lynde entra a la cocina de Tejas Verdes.  
**15:42** Ana sale.  

</details>

## Devolverle el libro a Diana (meta 31: cumplida)

**Lo que debería pasar:** Ana lleva el libro que le prestaron a la casa de Diana y se lo devuelve en sus manos.

- ✔ Le devuelve el libro a Diana. — 12:20, 1 min
- ✔ Ya no tiene el libro. — 12:20, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (28 líneas)</summary>

**12:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes; ahora tiene un libro.  
**12:00** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto.  
**12:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**12:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**12:04** Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»  
**12:05** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**12:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**12:10** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**12:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**12:12** Ana está en Avonlea, junto al puente del arroyo.  
**12:12** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**12:15** _· Ana: Avonlea, junto al puente del arroyo · de pie_  
**12:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**12:17** Ana dice: «¡Diana! ¡Espera!»  
**12:17** Diana dice: «¿Sí?»  
**12:18** Minnie May Barry dice: «¿Ya es hora de comer?»  
**12:19** Mary Joe dice: «Todavía no. Anda a jugar un rato.»  
**12:20** _· Ana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**12:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**12:20** Diana dice: «Hola… ¿Tú eres la niña que vino a vivir a Tejas Verdes?»  
**12:20** Ana va por Avonlea, junto a La Cuesta del Huerto; empieza a devolverle un libro a Diana; con lo que entrega.  
**12:20** Ana dice: «Aquí tienes tu libro. ¡Me encantó! Lo leí dos veces.»  
**12:20** Ana termina de devolverle un libro a Diana; ya no tiene nada.  
**12:20** Diana ahora tiene un libro.  
**12:20** Diana dice: «¡Qué bueno que te gustó! Te presto otro cuando quieras.»  
**12:21** Ana dice: «Sí… soy Ana. Ana con e. ¿Y tú… tú eres Diana Barry?»  
**12:22** Ana se sienta.  
**12:22** Diana dice: «Sí. Mamá dice que eres muy rara. Pero no pareces rara. Bueno, un poquito.»  

</details>

## Amigas del alma (meta 32: cumplida)

**Lo que debería pasar:** Ana y Diana, en el jardín de los Barry, se ponen frente a frente, se toman de las manos y juran ser amigas del alma para siempre.

- ✔ Ana jura tomada de las manos. — 11:18, 3 min
- ✔ Diana está con ella, en el jardín de los Barry. — 11:20, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (25 líneas)</summary>

**11:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**11:00** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.  
**11:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**11:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:04** Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»  
**11:05** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**11:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**11:10** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**11:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:12** Ana está en Avonlea, junto al puente del arroyo.  
**11:12** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**11:15** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**11:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:16** Ana dice: «¡Diana! ¡Espera!»  
**11:16** Diana dice: «¿Sí?»  
**11:18** Minnie May Barry dice: «¡Gané la carrera hasta el portón!»  
**11:18** Ana va por Avonlea, junto a La Cuesta del Huerto; empieza a jurar ser amigas del alma con Diana.  
**11:18** Ana dice: «Juro solemnemente ser fiel a mi amiga del alma, Diana, mientras duren el sol y la luna.»  
**11:18** Ana sigue, con las manos.  
**11:18** Mary Joe dice: «¡Muy bien! Pero no corras tanto, que te caes.»  
**11:20** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie · jurar ser amigas del alma con Diana · con las manos_  
**11:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:21** Ana termina de jurar ser amigas del alma con Diana.  
**11:21** Diana dice: «Juro ser fiel a mi amiga del alma, Ana, mientras duren el sol y la luna.»  
**11:21** Ana se sienta.  

</details>

## Cuidar al Sr. Harrison (meta 34: cumplida)

**Lo que debería pasar:** El Sr. Harrison está enfermo, en cama. Ana saca el jarabe de ipecacuana del aparador de la cocina, va a su casa y, junto a la cama, se lo da a cucharadas.

- ✔ El Sr. Harrison está en cama. — 11:00, 28 min
- ✔ Saca el jarabe del aparador. — 11:01, 1 min
- ✔ Tiene el jarabe. — 11:02, 26 min
- ✔ Se lo da en su casa. — 11:18, 10 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (37 líneas)</summary>

**11:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**11:00** Al empezar, el Sr. Harrison está en la casa del Sr. Harrison; está en cama; ahora tiene una cuerda.  
**11:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**11:00** _· el Sr. Harrison: la casa del Sr. Harrison · acostado, en cama_  
**11:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**11:00** Ana empieza a tomar un frasco de jarabe de ipecacuana.  
**11:01** Ana sigue, con el aparador abierto.  
**11:01** Ana está en la cocina de Tejas Verdes, junto al aparador.  
**11:02** Ana termina de tomar un frasco de jarabe de ipecacuana; ahora tiene un frasco de jarabe de ipecacuana.  
**11:02** Ana sale, junto a Tejas Verdes.  
**11:02** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**11:05** _· Ana: Avonlea, junto a Tejas Verdes · caminando_  
**11:05** _· el Sr. Harrison: la casa del Sr. Harrison · acostado, en cama_  
**11:05** Ana dice: «¡Matthew! Mire estas violetas. Las encontré junto al arroyo. ¿No le parecen como pedacitos de cielo que se cayeron?»  
**11:07** Matthew dice: «Bueno, pues… sí. Ahora que lo dices, sí.»  
**11:08** Ana dice: «Usted siempre me entiende. Es tan agradable hablar con alguien que entiende.»  
**11:09** Matthew dice: «(Matthew se pone colorado hasta las orejas, pero sonríe.)»  
**11:10** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**11:10** _· el Sr. Harrison: la casa del Sr. Harrison · acostado, en cama_  
**11:15** _· Ana: Avonlea, junto al campo de avena del Sr. Harrison · caminando_  
**11:15** _· el Sr. Harrison: la casa del Sr. Harrison · acostado, en cama_  
**11:17** Ana entra a la casa del Sr. Harrison.  
**11:18** El Sr. Harrison dice: «Ay… este resfrío me tiene molido.»  
**11:18** Ana empieza a cuidar al Sr. Harrison; con el jarabe.  
**11:18** Ana dice: «Una cucharadita de jarabe de ipecacuana… y otra más. Ya va a pasar.»  
**11:20** _· Ana: la casa del Sr. Harrison · de pie · cuidar al Sr. Harrison · con el jarabe_  
**11:20** _· el Sr. Harrison: la casa del Sr. Harrison · acostado, en cama_  
**11:25** _· Ana: la casa del Sr. Harrison · de pie · cuidar al Sr. Harrison · con el jarabe_  
**11:25** _· el Sr. Harrison: la casa del Sr. Harrison · acostado, en cama_  
**11:28** Ana termina de cuidar al Sr. Harrison; ya no tiene nada.  
**11:28** El Sr. Harrison se levanta.  
**11:28** El Sr. Harrison dice: «Ya me siento mucho mejor. Gracias, niña.»  
**11:28** Ana dice: «Mi imaginación no me deja quieta.»  
**11:28** Ana sale.  
**11:28** El Sr. Harrison sale.  
**11:30** _· Ana: Avonlea · caminando_  
**11:30** _· el Sr. Harrison: Avonlea · caminando_  

</details>

## Estudiar y recitar la lección (meta 36: cumplida)

**Lo que debería pasar:** Ana estudia la lección sentada a la mesa, con el libro abierto, un buen rato. En la escuela se pone frente a la clase, junto a la pizarra, y la recita.

- ✔ Estudia sentada con el libro, un buen rato. — 09:01, 40 min
- ✔ Recita frente a la clase. — 10:00, 12 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (37 líneas)</summary>

**09:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**09:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**09:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**09:00** Ana empieza a estudiar la lección.  
**09:00** Ana dice: ««El cuadrado de la hipotenusa es igual…» Repaso y repaso.»  
**09:01** Ana está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta; con un libro sobre la mesa.  
**09:05** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar la lección · con un libro sobre la mesa_  
**09:10** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar la lección · con un libro sobre la mesa_  
**09:15** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar la lección · con un libro sobre la mesa_  
**09:20** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar la lección · con un libro sobre la mesa_  
**09:25** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar la lección · con un libro sobre la mesa_  
**09:30** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar la lección · con un libro sobre la mesa_  
**09:35** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar la lección · con un libro sobre la mesa_  
**09:40** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · estudiar la lección · con un libro sobre la mesa_  
**09:41** Ana se levanta; termina de estudiar la lección.  
**09:41** Ana sale, junto a Tejas Verdes.  
**09:45** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**09:50** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**09:53** Ana está en Avonlea, no lejos de la casa de Robert Bell.  
**09:53** Ana dice: «¡Hola, pequeño! ¿Cómo te llamas? Yo te diré Lord Fitzgerald.»  
**09:55** _· Ana: Avonlea, no lejos de la casa de Robert Bell · de pie_  
**10:00** _· Ana: Avonlea, junto a la escuela · caminando_  
**10:00** Una granjera dice: «Buenas, buenas. No te entretengas, que se hace tarde.»  
**10:00** Ana está en Avonlea, junto a la escuela; empieza a recitar la lección.  
**10:00** Ana dice: «Y a lo largo del río, en su barca, iba la doncella de Shalott…»  
**10:00** Ana entra a la escuela de Avonlea.  
**10:00** Gilbert Blythe dice: «(Gilbert Blythe alarga la mano, toma la punta de una trenza de Ana y susurra, lo bastante fuerte para que lo oiga toda la clase.) ¡Zanahorias! ¡Zanahorias!»  
**10:02** Ana se pone de pie de un salto, con los ojos echando chispas. Y dice: «¡Odioso, malvado! ¿Cómo te atreves?»  
**10:04** ¡Crac! Ana le parte la pizarra en la cabeza a Gilbert.  
**10:05** _· Ana: la escuela de Avonlea · de pie · recitar la lección_  
**10:05** Gilbert Blythe dice: «¡Ay! Perdona, Ana… solo era una broma. De verdad, perdóname.»  
**10:06** Ana dice: «¡Nunca te lo perdonaré! ¡Nunca jamás!»  
**10:07** Ana sigue, con el gesto de recitar.  
**10:10** _· Ana: la escuela de Avonlea · de pie · recitar la lección · con el gesto de recitar_  
**10:12** Ana termina de recitar la lección.  
**10:12** Ana dice: «¡Qué día para hacer algo bonito!»  
**10:12** El Sr. Phillips dice: «Señorita Shirley, ¿no debería estar repasando su ortografía?»  

</details>

## Las oraciones (meta 37: cumplida)

**Lo que debería pasar:** Ana sube a su pieza, se arrodilla junto a la cama y dice sus oraciones, unos minutos.

- ✔ Reza de rodillas junto a la cama de su pieza. — 20:02, 5 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (11 líneas)</summary>

**20:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**20:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**20:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**20:00** Ana empieza a decir sus oraciones.  
**20:00** Ana dice: «Querido Padre celestial: gracias por el Camino Blanco de las Delicias y por el Lago de las Aguas Brillantes…»  
**20:02** Ana entra a la pieza de Ana.  
**20:02** Ana está en la pieza de Ana, junto a la cama; se arrodilla; con las manos juntas.  
**20:05** _· Ana: la pieza de Ana, junto a la cama · de rodillas · decir sus oraciones · con las manos juntas_  
**20:07** Ana se levanta; termina de decir sus oraciones.  
**20:08** Ana entra a la cocina de Tejas Verdes, junto a la escalera.  
**20:08** Marilla dice: «Rachel Lynde dice que todavía no la has ido a ver. Es mejor ir que dar que hablar.»  

</details>

## El vestido de mangas abullonadas (meta 38: cumplida)

**Lo que debería pasar:** Marilla quiere coserle un vestido a Ana. Le traen la tela de la tienda. Marilla se sienta junto a la ventana de la cocina y cose, sin apuro, un buen rato, hasta que el vestido está listo.

- ✔ Marilla tiene la tela. — 10:40, 41 min
- ✔ Cose sentada junto a la ventana, un buen rato. — 10:41, 40 min
- ✔ El vestido está listo. — 11:21, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (80 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** Al empezar, Marilla está en Avonlea, junto a Tejas Verdes.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** _· Marilla: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** Marilla dice: «¿Me traerías un corte de tela?»  
**10:00** Ana dice: «Sí, cómo no. Ahora mismo.»  
**10:00** Marilla entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:05** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**10:05** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:09** Ana está en Avonlea, no lejos de la casa de Robert Bell.  
**10:10** _· Ana: Avonlea, no lejos de la casa de Robert Bell · de pie_  
**10:10** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:11** Una vecina dice: «Mira qué cielo. Así da gusto salir.»  
**10:15** _· Ana: Avonlea, junto a la aldea · caminando_  
**10:15** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:17** Ana entra a la tienda de Lawson.  
**10:17** Ana dice: «Buenos días, Sr. Lawson. ¿Me daría un corte de tela? A la libreta de los Cuthbert.»  
**10:18** El Sr. Lawson dice: «Cómo no, aquí tengo una. Un momento…»  
**10:18** Ana ahora tiene un corte de tela.  
**10:18** El Sr. Lawson dice: «Anotado en la libreta de los Cuthbert. Saludos a Marilla.»  
**10:18** Ana sale.  
**10:20** _· Ana: Avonlea · caminando_  
**10:20** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:20** Ana dice: «¡Buenos días!»  
**10:21** El médico dice: «¡Buenos días, Ana! ¿Cómo están todos en casa?»  
**10:22** Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»  
**10:23** El médico dice: «¡Qué imaginación tienes, niña!»  
**10:23** Ana dice: «¿No le parece que hoy el mundo está recién hecho?»  
**10:24** El médico dice: «Esta niña... qué cosas dice.»  
**10:25** _· Ana: Avonlea · de pie_  
**10:25** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:25** Ana dice: «Bueno, me voy, que tengo que darle un corte de tela a Marilla.»  
**10:26** Janet King dice: «Dile a Marilla que le devuelvo la fuente el sábado.»  
**10:30** _· Ana: Avonlea · caminando_  
**10:30** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:35** _· Ana: Avonlea · caminando_  
**10:35** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:40** _· Ana: Avonlea · caminando_  
**10:40** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:40** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:40** Ana empieza a darle un corte de tela a Marilla; con lo que entrega.  
**10:40** Ana termina de darle un corte de tela a Marilla; ya no tiene nada.  
**10:40** Marilla ahora tiene un corte de tela.  
**10:40** Marilla dice: «Gracias.»  
**10:40** Ana dice: «Hay tanto por hacer y tan poco tiempo... ¡y yo con tantas ideas!»  
**10:40** Ana sale, junto a Tejas Verdes.  
**10:40** Marilla empieza a coser un vestido con mangas abullonadas.  
**10:40** Marilla dice: «Coso el vestido… y le pongo unas mangas abullonadas, como las que usan ahora.»  
**10:41** Marilla está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta; con la costura.  
**10:42** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**10:45** _· Ana: Avonlea, no lejos de la huerta de Tejas Verdes · caminando_  
**10:45** _· Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura_  
**10:45** Ana está en Avonlea, no lejos del Camino Blanco de las Delicias.  
**10:46** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**10:46** Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»  
**10:48** Ana se sienta.  
**10:48** Ana se levanta.  
**10:50** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie_  
**10:50** _· Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura_  
**10:51** Ana se sienta.  
**10:55** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · sentada_  
**10:55** _· Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura_  
**10:59** Ana se levanta.  
**11:00** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**11:00** _· Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura_  
**11:04** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**11:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**11:05** _· Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura_  
**11:10** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**11:10** _· Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura_  
**11:12** Ana está en Avonlea, no lejos del campo de heno.  
**11:15** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**11:15** _· Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura_  
**11:15** Ana está en Avonlea, no lejos de la casa de la Sra. Lynde.  
**11:18** Ana está en Avonlea, junto a la casa de la Sra. Lynde.  
**11:19** Ana entra a la casa de la Sra. Lynde.  
**11:19** La Sra. Lynde dice: «Llevo cincuenta y dos cubrecamas de retazos, ¡cincuenta y dos! Y no pienso parar.»  
**11:20** _· Ana: la casa de la Sra. Lynde · de pie_  
**11:20** _· Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura_  
**11:21** Marilla se levanta; termina de coser un vestido con mangas abullonadas; ahora tiene un vestido con mangas abullonadas.  

</details>

## El sombrero con flores (meta 39: cumplida)

**Lo que debería pasar:** Ana corta flores en la huerta y se adorna el sombrero con ellas, con cuidado, unos minutos.

- ✔ Corta flores. — 10:03, 3 min
- ✔ Se adorna el sombrero. — 10:06, 10 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (16 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**10:03** Ana está en Avonlea, junto a la huerta de Tejas Verdes; empieza a recoger un ramo de flores.  
**10:03** Ana se agacha; con el canastito.  
**10:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · agachada · recoger un ramo de flores · con el canastito_  
**10:06** Ana se levanta; termina de recoger un ramo de flores; ahora tiene un ramo de flores.  
**10:06** Ana empieza a adornar el sombrero con flores; con el sombrero con flores.  
**10:06** Ana dice: «¡Una corona de ranúnculos y rosas silvestres para mi sombrero!»  
**10:10** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · adornar el sombrero con flores · con el sombrero con flores_  
**10:15** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · adornar el sombrero con flores · con el sombrero con flores_  
**10:16** Ana termina de adornar el sombrero con flores; ya no tiene nada.  
**10:17** Ana se sienta.  
**10:17** Ana se levanta.  
**10:18** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:18** Ana dice: «Marilla, si me va a llamar Ana, ¿podría llamarme Ana con e?»  

</details>

## Remar en el lago (meta 40: cumplida)

**Lo que debería pasar:** Ana sube al bote en el Lago de las Aguas Brillantes y rema, sentada, sin apuro, un buen rato.

- ✔ Rema sentada en el bote, un buen rato. — 14:19, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (20 líneas)</summary>

**14:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**14:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**14:05** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**14:10** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**14:11** Ana está en Avonlea, no lejos del Camino Blanco de las Delicias.  
**14:15** _· Ana: Avonlea, no lejos del Lago de las Aguas Brillantes · caminando_  
**14:18** Gilbert Blythe dice: «¿Quieres que te ayude a cruzar el arroyo? ¿No? Bueno...»  
**14:19** Ana está en Avonlea, junto al Lago de las Aguas Brillantes; se sienta; empieza a remar en el lago; con el bote.  
**14:19** Ana dice: «¡Remo en el bote de los Barry! Hay que tener cuidado de no soltar los remos…»  
**14:19** Ana dice: «No le hablo a Gilbert Blythe. Nunca jamás.»  
**14:20** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote_  
**14:25** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote_  
**14:30** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote_  
**14:35** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote_  
**14:40** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote_  
**14:45** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote_  
**14:49** Ana se levanta; termina de remar en el lago.  
**14:49** Ana se sienta.  
**14:49** Ana se levanta.  
**14:50** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando_  

</details>

## Ponerle nombre a los lugares (meta 41: cumplida)

**Lo que debería pasar:** Ana se detiene en un lugar que le gusta, lo mira y le pone un nombre bonito en voz alta.

- ✔ Se detiene y le pone nombre a un lugar. — 10:00, 2 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (17 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** Ana empieza a ponerle nombre a los arbustos de bayas; con el gesto de recitar.  
**10:00** Ana dice: «Este lugar se va a llamar el Sendero de los Abedules. ¿No es un nombre precioso?»  
**10:02** Ana termina de ponerle nombre a los arbustos de bayas.  
**10:03** Matthew dice: «La huerta está pidiendo semillas y agua, me parece. Bueno, digo yo.»  
**10:04** Ana está en Avonlea, junto a la entrada del corral de Tejas Verdes; empieza a ponerle nombre al corral; con el gesto de recitar.  
**10:04** Ana dice: «Este lugar se va a llamar Idlewild. ¿No es un nombre precioso?»  
**10:05** _· Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · de pie · ponerle nombre al corral · con el gesto de recitar_  
**10:06** Ana termina de ponerle nombre al corral.  
**10:06** Ana dice: «¿Qué pensarán los animales de nosotros?»  
**10:10** _· Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · caminando_  
**10:11** Ana está en Avonlea, junto a la huerta de Tejas Verdes; empieza a ponerle nombre a la huerta; con el gesto de recitar.  
**10:11** Ana dice: «Este lugar se va a llamar el Valle de las Violetas. ¿No es un nombre precioso?»  
**10:13** Ana termina de ponerle nombre a la huerta.  
**10:13** Ana se sienta.  
**10:15** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · sentada_  

</details>

## Leer el libro prestado (meta 46: cumplida)

**Lo que debería pasar:** Ana se sienta con el libro que le prestaron y lee, un buen rato.

- ✔ Lee sentada, un buen rato. — 15:01, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (15 líneas)</summary>

**15:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes; ahora tiene un libro.  
**15:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**15:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**15:00** La Sra. Lynde dice: «A una niña hay que enseñarle a ser útil. Pero, bueno, tú vas por buen camino.»  
**15:00** Ana empieza a leer un libro.  
**15:00** Ana dice: ««Ben-Hur»… ¡No puedo parar de leer! La carrera de cuadrigas…»  
**15:01** Ana está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta; con un libro.  
**15:05** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer un libro · con un libro_  
**15:10** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer un libro · con un libro_  
**15:15** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer un libro · con un libro_  
**15:20** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer un libro · con un libro_  
**15:25** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer un libro · con un libro_  
**15:30** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · leer un libro · con un libro_  
**15:31** Ana se levanta; termina de leer un libro.  
**15:31** La Sra. Lynde dice: «Llevo cincuenta y dos cubrecamas de retazos, ¡cincuenta y dos! Y no pienso parar.»  

</details>

## El club de cuentos (meta 47: cumplida)

**Lo que debería pasar:** Ana sube a su pieza y escribe un cuento sentada al escritorio, con el cuaderno abierto sobre él, un buen rato. Después se lo lee a Diana, sentadas juntas.

- ✔ Escribe sentada al escritorio, con el cuaderno, un buen rato. — 14:02, 40 min
- ✔ Se lo lee a Diana, sentadas juntas. — 14:58, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (40 líneas)</summary>

**14:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**14:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**14:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**14:00** La Sra. Lynde dice: «Desde mi ventana veo todo el camino: no se me escapa nadie. Lo digo sin mala intención, ¿eh?»  
**14:00** Ana empieza a escribir un cuento.  
**14:00** Ana dice: ««Los celos de Cordelia»: una historia trágica, con un ahogado y una dama de cabellos de oro…»  
**14:02** Ana entra a la pieza de Ana.  
**14:02** Ana está en la pieza de Ana, junto al escritorio; se sienta; con la banqueta y el cuaderno sobre la mesa.  
**14:05** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir un cuento · con la banqueta y el cuaderno sobre la mesa_  
**14:10** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir un cuento · con la banqueta y el cuaderno sobre la mesa_  
**14:15** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir un cuento · con la banqueta y el cuaderno sobre la mesa_  
**14:20** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir un cuento · con la banqueta y el cuaderno sobre la mesa_  
**14:25** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir un cuento · con la banqueta y el cuaderno sobre la mesa_  
**14:30** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir un cuento · con la banqueta y el cuaderno sobre la mesa_  
**14:35** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir un cuento · con la banqueta y el cuaderno sobre la mesa_  
**14:40** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir un cuento · con la banqueta y el cuaderno sobre la mesa_  
**14:42** Ana se levanta; termina de escribir un cuento; ahora tiene un cuento escrito a mano.  
**14:42** Ana entra a la cocina de Tejas Verdes, junto a la escalera.  
**14:42** Ana sale, junto a Tejas Verdes.  
**14:45** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**14:47** Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»  
**14:50** _· Ana: Avonlea, junto al Bosque Encantado · caminando_  
**14:55** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**14:56** Ana dice: «¡Diana! ¡Espera!»  
**14:58** Ana está en Avonlea, junto al huerto de los Barry; se sienta; empieza a leerle su cuento a Diana; con el cuaderno.  
**14:58** Ana dice: «Escucha, Diana: «La dama Geraldine caminaba a la luz de la luna…»»  
**14:58** Minnie May Barry dice: «¿Me da una manzana? Solo una.»  
**14:59** Mary Joe dice: «Toma, pero no le digas a nadie.»  
**15:00** _· Ana: Avonlea, junto al huerto de los Barry · sentada · leerle su cuento a Diana · con el cuaderno_  
**15:05** _· Ana: Avonlea, junto al huerto de los Barry · sentada · leerle su cuento a Diana · con el cuaderno_  
**15:10** _· Ana: Avonlea, junto al huerto de los Barry · sentada · leerle su cuento a Diana · con el cuaderno_  
**15:13** Diana dice: «¡Ay, Ana, qué triste! ¡Lloré en la parte del ahogado!»  
**15:15** _· Ana: Avonlea, junto al huerto de los Barry · sentada · leerle su cuento a Diana · con el cuaderno_  
**15:20** _· Ana: Avonlea, junto al huerto de los Barry · sentada · leerle su cuento a Diana · con el cuaderno_  
**15:25** _· Ana: Avonlea, junto al huerto de los Barry · sentada · leerle su cuento a Diana · con el cuaderno_  
**15:28** Ana se levanta; termina de leerle su cuento a Diana; ya no tiene nada.  
**15:28** Ana se sienta.  
**15:29** Minnie May Barry dice: «¡Gané la carrera hasta el portón!»  
**15:30** _· Ana: Avonlea, junto al huerto de los Barry · sentada_  
**15:30** Mary Joe dice: «¡Muy bien! Pero no corras tanto, que te caes.»  

</details>

## Ensayar y recitar en el concierto (meta 48: cumplida)

**Lo que debería pasar:** Ana ensaya su recitación con el libro, un rato. Por la tarde, en el concierto, sube al escenario del salón y recita.

- ✔ Ensaya con el libro, un rato. — 15:29, 20 min
- ✔ Recita en el escenario del salón. — 16:00, 10 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (44 líneas)</summary>

**15:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**15:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**15:00** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**15:04** La Sra. Lynde dice: «Desde mi ventana veo todo el camino: no se me escapa nadie. Lo digo sin mala intención, ¿eh?»  
**15:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**15:10** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**15:15** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**15:16** Ana está en Avonlea, no lejos de la casa de Robert Bell.  
**15:16** Ana dice: «¿Qué pensarán los animales de nosotros?»  
**15:20** _· Ana: Avonlea, no lejos de la escuela · caminando_  
**15:22** Ana está en Avonlea, junto a la escuela; empieza a ensayar la recitación.  
**15:22** Ana dice: ««La doncella de Shalott»… otra vez desde el principio, con más sentimiento.»  
**15:22** Ana entra a la escuela de Avonlea.  
**15:22** Gilbert Blythe dice: «(Gilbert Blythe alarga la mano, toma la punta de una trenza de Ana y susurra, lo bastante fuerte para que lo oiga toda la clase.) ¡Zanahorias! ¡Zanahorias!»  
**15:24** Ana se pone de pie de un salto, con los ojos echando chispas. Y dice: «¡Odioso, malvado! ¿Cómo te atreves?»  
**15:25** _· Ana: la escuela de Avonlea · de pie · ensayar la recitación_  
**15:26** ¡Crac! Ana le parte la pizarra en la cabeza a Gilbert.  
**15:27** Gilbert Blythe dice: «¡Ay! Perdona, Ana… solo era una broma. De verdad, perdóname.»  
**15:28** Ana dice: «¡Nunca te lo perdonaré! ¡Nunca jamás!»  
**15:29** Ana sigue, con un libro.  
**15:30** _· Ana: la escuela de Avonlea · de pie · ensayar la recitación · con un libro_  
**15:35** _· Ana: la escuela de Avonlea · de pie · ensayar la recitación · con un libro_  
**15:40** _· Ana: la escuela de Avonlea · de pie · ensayar la recitación · con un libro_  
**15:45** _· Ana: la escuela de Avonlea · de pie · ensayar la recitación · con un libro_  
**15:49** Ana termina de ensayar la recitación.  
**15:49** Ana sale.  
**15:49** Ruby Gillis dice: «¡Ay, Ana! ¿Viste cómo me miró Charlie Sloane?»  
**15:50** _· Ana: Avonlea · caminando_  
**15:54** Josie Pye dice: «Mi mamá dice que las pelirrojas tienen mal genio. ¿Es verdad?»  
**15:55** _· Ana: Avonlea · de pie_  
**15:55** Ana dice: «Josie Pye, eres... ¡eres una Pye!»  
**15:56** Felicity King dice: «Mi madre dice que una señorita nunca corre. Pero yo corro si llego tarde.»  
**15:59** Ana empieza a recitar en el concierto.  
**15:59** Ana dice: «…y la barca siguió flotando río abajo, hacia Camelot.»  
**15:59** Ana entra al salón del pueblo.  
**16:00** _· Ana: el salón del pueblo · caminando · recitar en el concierto_  
**16:00** Ana sigue, con el gesto de recitar.  
**16:00** Ana está en el salón del pueblo, junto al escenario.  
**16:05** _· Ana: el salón del pueblo, junto al escenario · de pie · recitar en el concierto · con el gesto de recitar_  
**16:10** _· Ana: el salón del pueblo, junto al escenario · de pie · recitar en el concierto · con el gesto de recitar_  
**16:10** Ana termina de recitar en el concierto.  
**16:10** Ana dice: «Se me ocurrió una idea... ¡de esas que solo tengo yo!»  
**16:11** Ana sale, junto al salón del pueblo.  
**16:11** El buhonero dice: «Un tinte que deja el pelo negro azabache, señorita. Garantizado.»  

</details>

## Las flores del salón (meta 49: cumplida)

**Lo que debería pasar:** Ana va al salón con flores y cuelga guirnaldas a lo largo de la pared, un tramo tras otro, un buen rato.

- ✔ Cuelga las guirnaldas en el salón, un buen rato. — 10:38, 25 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (42 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:01** Ana está en Avonlea, junto a la huerta de Tejas Verdes; empieza a recoger un ramo de flores.  
**10:01** Ana se agacha; con el canastito.  
**10:04** Ana se levanta; termina de recoger un ramo de flores; ahora tiene un ramo de flores.  
**10:04** Matthew dice: «Marilla dice que hablas mucho. Bueno, a mí me gusta oírte, ¿sabes?»  
**10:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**10:10** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**10:15** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**10:17** Ana está en Avonlea, no lejos de la casa de Robert Bell.  
**10:17** Ana dice: «¿Qué pensarán los animales de nosotros?»  
**10:20** _· Ana: Avonlea, no lejos de la casa de Robert Bell · de pie_  
**10:22** Una vecina dice: «Lindo día, ¿verdad? Dicen que mañana llueve.»  
**10:25** _· Ana: Avonlea, no lejos de la aldea · caminando_  
**10:27** Una granjera dice: «Lindo día, ¿verdad? Dicen que mañana llueve.»  
**10:27** Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).  
**10:27** Ana dice: «¡Buenos días, Janet King!»  
**10:28** Janet King dice: «¡Buenos días, Ana! ¿Cómo están todos en casa?»  
**10:29** Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»  
**10:30** _· Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · de pie_  
**10:30** Janet King dice: «¡Qué imaginación tienes, niña!»  
**10:30** Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»  
**10:32** Janet King dice: «Nunca lo había pensado así.»  
**10:32** Ana dice: «Bueno, me voy, que tengo que decorar el salón con flores.»  
**10:33** El médico dice: «¿Alguien enfermo en Tejas Verdes? Espero que no.»  
**10:35** _· Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando_  
**10:36** Ana está en Avonlea, junto al salón del pueblo; empieza a decorar el salón con flores.  
**10:36** Ana entra al salón del pueblo.  
**10:38** Ana sigue, con flores.  
**10:40** _· Ana: el salón del pueblo · de pie · decorar el salón con flores · con flores_  
**10:45** _· Ana: el salón del pueblo · de pie · decorar el salón con flores · con flores_  
**10:46** Ana sigue, con flores.  
**10:46** Ana está en el salón del pueblo, junto al escenario.  
**10:50** _· Ana: el salón del pueblo, junto al escenario · de pie · decorar el salón con flores · con flores_  
**10:55** _· Ana: el salón del pueblo · caminando · decorar el salón con flores_  
**10:55** Ana sigue, con flores.  
**11:00** _· Ana: el salón del pueblo · de pie · decorar el salón con flores · con flores_  
**11:03** Ana termina de decorar el salón con flores; ya no tiene nada.  
**11:03** Ana dice: «¡A ver qué descubro por ahí!»  
**11:04** Ana sale, junto al salón del pueblo.  
**11:04** Jasper Dale dice: «B-buenos días. Estoy... estoy probando un invento. Para la lluvia.»  
**11:05** _· Ana: Avonlea, junto al salón del pueblo · caminando_  

</details>

## Felicitar a Diana (meta 50: cumplida)

**Lo que debería pasar:** Diana recitó en el concierto. Ana va hasta ella y la felicita.

- ✔ Ana felicita a Diana. — 17:19, 1 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (24 líneas)</summary>

**17:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**17:00** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.  
**17:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**17:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**17:04** Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»  
**17:05** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**17:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**17:10** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**17:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**17:12** Ana está en Avonlea, junto al puente del arroyo.  
**17:12** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**17:15** _· Ana: Avonlea, junto al puente del arroyo · de pie_  
**17:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**17:16** Ana dice: «¡Diana! ¡Espera!»  
**17:17** Diana dice: «¿Sí?»  
**17:19** Mary Joe dice: «La señora Barry dice que tienda la ropa antes de que se nuble.»  
**17:19** Ana va por Avonlea, junto a La Cuesta del Huerto; empieza a felicitar a Diana; con las manos.  
**17:19** Ana dice: «¡Felicitaciones! Lo hiciste maravillosamente.»  
**17:19** Ana termina de felicitar a Diana.  
**17:19** Diana dice: «¡Gracias! Estaba tan nerviosa…»  
**17:19** Ana dice: «Se me ocurrió una idea... ¡de esas que solo tengo yo!»  
**17:20** _· Ana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**17:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**17:21** Ana está en Avonlea, no lejos del huerto de los Barry.  

</details>

## Consolar a Diana (meta 51: cumplida)

**Lo que debería pasar:** A Diana le prohibieron ver a Ana y está triste. Ana va hasta ella y la consuela con un abrazo.

- ✔ Ana la abraza. — 16:22, 1 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (28 líneas)</summary>

**16:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**16:00** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.  
**16:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**16:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**16:00** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**16:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**16:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**16:07** Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»  
**16:10** _· Ana: Avonlea, junto al Bosque Encantado · caminando_  
**16:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**16:12** Ana está en Avonlea, junto al puente del arroyo.  
**16:15** _· Ana: Avonlea, junto al puente del arroyo · de pie_  
**16:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**16:20** _· Ana: Avonlea, no lejos del huerto de los Barry · caminando_  
**16:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**16:20** Ana dice: «¡Diana! ¡Espera!»  
**16:20** Diana dice: «¿Me llamabas?»  
**16:21** Mary Joe dice: «La señora Barry dice que tienda la ropa antes de que se nuble.»  
**16:22** Diana dice: «Hola… ¿Tú eres la niña que vino a vivir a Tejas Verdes?»  
**16:22** Ana está en Avonlea, junto a La Cuesta del Huerto; empieza a consolar a Diana; con un abrazo.  
**16:22** Ana dice: «No llores… todo se va a arreglar, ya verás. Yo estoy contigo.»  
**16:23** Ana termina de consolar a Diana.  
**16:23** Diana dice: «Gracias… ya me siento mejor.»  
**16:24** Ana dice: «Sí… soy Ana. Ana con e. ¿Y tú… tú eres Diana Barry?»  
**16:24** Ana se sienta.  
**16:25** _· Ana: Avonlea, junto a La Cuesta del Huerto · sentada_  
**16:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**16:25** Diana dice: «Sí. Mamá dice que eres muy rara. Pero no pareces rara. Bueno, un poquito.»  

</details>

## Hacer heno (meta 52: cumplida)

**Lo que debería pasar:** Matthew va al campo con la horquilla y junta el heno en un lugar y en otro, un buen rato; quedan los fardos en el campo.

- ✔ Junta el heno con la horquilla, un buen rato. — 09:07, 46 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (20 líneas)</summary>

**09:00** Al empezar, Matthew está en Avonlea, junto al granero; ahora tiene 5 dólares.  
**09:00** _· Matthew: Avonlea, junto al granero · de pie_  
**09:05** _· Matthew: Avonlea, no lejos del corral de Tejas Verdes · caminando_  
**09:07** Matthew está en Avonlea, junto al campo de heno.  
**09:07** Matthew empieza a hacer heno.  
**09:07** Matthew dice: «A juntar el heno antes de que llueva…»  
**09:07** Matthew sigue, con la horquilla.  
**09:10** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:15** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:20** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:23** Matthew sigue, con la horquilla.  
**09:25** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:30** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:35** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:38** Matthew sigue, con la horquilla.  
**09:40** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:45** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:50** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:53** Matthew termina de hacer heno; ahora tiene 5 dólares, 3 fardos de heno.  
**09:55** _· Matthew: Avonlea, junto al campo de heno · caminando_  

</details>

## Partir leña (meta 53: cumplida)

**Lo que debería pasar:** Matthew parte leña con el hacha junto al granero, un buen rato. Lleva la leña a la cocina y se la da a Marilla.

- ✔ Parte leña junto al granero, un buen rato. — 09:00, 25 min
- ✔ Tiene la leña. — 09:25, 5 min
- ✔ Se la da a Marilla en la cocina. — 09:29, 0 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (28 líneas)</summary>

**09:00** Al empezar, Matthew está en Avonlea, junto al granero; ahora tiene 5 dólares.  
**09:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**09:00** _· Matthew: Avonlea, junto al granero · de pie_  
**09:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**09:00** Matthew empieza a partir leña.  
**09:00** Matthew dice: «¡Zas! ¡Zas! Leña para la cocina de Marilla.»  
**09:00** Marilla se levanta.  
**09:00** Matthew sigue, con el hacha.  
**09:05** _· Matthew: Avonlea, junto al granero · de pie · partir leña · con el hacha_  
**09:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**09:10** _· Matthew: Avonlea, junto al granero · de pie · partir leña · con el hacha_  
**09:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**09:15** _· Matthew: Avonlea, junto al granero · de pie · partir leña · con el hacha_  
**09:15** _· Marilla: la cocina de Tejas Verdes · de pie_  
**09:20** _· Matthew: Avonlea, junto al granero · de pie · partir leña · con el hacha_  
**09:20** _· Marilla: la cocina de Tejas Verdes · de pie_  
**09:25** _· Matthew: Avonlea, junto al granero · de pie · partir leña · con el hacha_  
**09:25** _· Marilla: la cocina de Tejas Verdes · de pie_  
**09:25** Matthew termina de partir leña; ahora tiene 5 dólares, 3 atados de leña.  
**09:25** Matthew dice: «Buen animal, sí... buen animal.»  
**09:29** Matthew entra a la cocina de Tejas Verdes, junto a la puerta.  
**09:29** Matthew empieza a darle 3 atados de leña a Marilla; con lo que entrega.  
**09:30** _· Matthew: la cocina de Tejas Verdes · de pie · darle 3 atados de leña a Marilla · con lo que entrega_  
**09:30** _· Marilla: la cocina de Tejas Verdes · de pie_  
**09:30** Matthew termina de darle 3 atados de leña a Marilla; ahora tiene 5 dólares.  
**09:30** Marilla ahora tiene 3 atados de leña.  
**09:30** Marilla dice: «Gracias.»  
**09:30** Matthew sale, junto a Tejas Verdes.  

</details>

## Batir mantequilla (meta 54: cumplida)

**Lo que debería pasar:** Marilla pone la leche de la mañana en la mantequera, junto a la mesa, y bate sin parar una media hora, hasta que hay mantequilla.

- ✔ Bate en la mantequera una media hora. — 08:20, 30 min
- ✔ Tiene la mantequilla. — 08:50, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (19 líneas)</summary>

**08:00** Al empezar, Marilla está en Avonlea, junto a Tejas Verdes.  
**08:00** _· Marilla: Avonlea, junto a Tejas Verdes · de pie_  
**08:00** Marilla dice: «¿Me traerías 2 jarros de leche?»  
**08:00** Marilla entra a la cocina de Tejas Verdes, junto a la puerta.  
**08:05** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**08:10** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**08:15** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**08:19** Marilla ahora tiene 2 jarros de leche.  
**08:19** Marilla dice: «Gracias.»  
**08:20** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**08:20** Marilla empieza a batir la mantequilla.  
**08:20** Marilla sigue, con la mantequera.  
**08:25** _· Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera_  
**08:30** _· Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera_  
**08:35** _· Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera_  
**08:40** _· Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera_  
**08:45** _· Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera_  
**08:50** _· Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera_  
**08:50** Marilla termina de batir la mantequilla; ahora tiene un pan de mantequilla.  

</details>

## Sembrar y regar la huerta (meta 55: cumplida)

**Lo que debería pasar:** Ana va a la huerta con las semillas y siembra cama por cama. Después llena la regadera y las riega, una por una.

- ✔ Siembra en la huerta. — 09:04, 15 min
- ✔ Riega con la regadera. — 09:20, 9 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (21 líneas)</summary>

**09:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**09:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**09:00** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**09:04** Ana está en Avonlea, junto a la huerta de Tejas Verdes; empieza a sembrar la huerta.  
**09:04** Ana sigue, con las semillas.  
**09:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · sembrar la huerta · con las semillas_  
**09:10** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando · sembrar la huerta_  
**09:10** Ana sigue, con las semillas.  
**09:15** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · sembrar la huerta · con las semillas_  
**09:15** Ana sigue, con las semillas.  
**09:20** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · sembrar la huerta · con las semillas_  
**09:20** Ana termina de sembrar la huerta.  
**09:20** Ana empieza a regar la huerta.  
**09:20** Ana sigue, con la regadera.  
**09:23** Ana sigue, con la regadera.  
**09:25** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · regar la huerta · con la regadera_  
**09:27** Ana sigue, con la regadera.  
**09:30** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · regar la huerta · con la regadera_  
**09:30** Ana termina de regar la huerta.  
**09:30** Ana se sienta.  
**09:30** Ana se levanta.  

</details>

## Patinar en el lago (meta 56: cumplida)

**Lo que debería pasar:** En invierno, Ana se pone los patines y patina en el lago helado, dando vueltas, un buen rato.

- ✔ Patina en el lago, un buen rato. — 14:19, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (20 líneas)</summary>

**14:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**14:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**14:05** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**14:10** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**14:11** Ana está en Avonlea, no lejos del Camino Blanco de las Delicias.  
**14:11** Ana dice: «¡El Lago de las Aguas Brillantes! Podría quedarme aquí la vida entera.»  
**14:15** _· Ana: Avonlea, no lejos del Camino Blanco de las Delicias · de pie_  
**14:19** Ana va por Avonlea, junto al Lago de las Aguas Brillantes; empieza a patinar en el lago; con los patines.  
**14:19** Ana dice: «¡Vuelo sobre el hielo como una golondrina!»  
**14:20** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines_  
**14:25** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines_  
**14:30** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines_  
**14:35** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines_  
**14:40** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines_  
**14:45** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines_  
**14:49** Ana termina de patinar en el lago.  
**14:49** Ana se sienta.  
**14:49** Ana dice: «Mi imaginación no me deja quieta.»  
**14:49** Ana se levanta.  
**14:50** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando_  

</details>

## El trineo (meta 57: cumplida)

**Lo que debería pasar:** En invierno, Ana sube la colina con el trineo y se tira, una y otra vez, un buen rato.

- ✔ Se tira en trineo, una y otra vez, un buen rato. — 14:41, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (37 líneas)</summary>

**14:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**14:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**14:03** La Sra. Lynde dice: «Ana Shirley, hablas más que un molino... pero tienes buen corazón, eso lo reconozco.»  
**14:05** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**14:10** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**14:12** Ana está en Avonlea, no lejos de la casa de Robert Bell.  
**14:12** Ana dice: «¿Qué pensarán los animales de nosotros?»  
**14:15** _· Ana: Avonlea, no lejos de la casa de Robert Bell · caminando_  
**14:19** Un granjero dice: «Sí, se me acabó el azúcar. Con tanta compota...»  
**14:20** _· Ana: Avonlea, junto a la aldea · caminando_  
**14:20** Ana está en Avonlea, junto a la aldea.  
**14:20** Ana dice: «¡Buenas tardes!»  
**14:21** Una granjera dice: «¡Qué gusto verle, Ana!»  
**14:22** Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»  
**14:23** Una granjera dice: «Tiempo tienes para decidirlo.»  
**14:23** Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»  
**14:24** Una granjera dice: «¡Qué imaginación tienes, niña!»  
**14:25** _· Ana: Avonlea, junto a la aldea · de pie_  
**14:25** Ana dice: «Bueno, me voy, que tengo que tirarme en trineo.»  
**14:28** Janet King dice: «Dicen que el nuevo pastor predica muy bonito.»  
**14:30** _· Ana: Avonlea, junto al salón del pueblo · caminando_  
**14:34** Ana está en Avonlea, no lejos de la colina.  
**14:34** Ana dice: «¡Hola, pequeño! ¿Cómo te llamas? Yo te diré Lord Fitzgerald.»  
**14:35** _· Ana: Avonlea, no lejos de la colina · de pie_  
**14:38** Una niñita dice: «¿Tú eres Ana? ¡Tienes el pelo como una zanahoria!... ¡Es bonito!»  
**14:40** _· Ana: Avonlea, no lejos de la colina · caminando_  
**14:41** Ana está en Avonlea, junto a la colina; se sienta; empieza a tirarse en trineo; con el trineo.  
**14:41** Ana dice: «¡Allá vamos, colina abajo! ¡Agárrate fuerte!»  
**14:45** _· Ana: Avonlea, junto a la colina · sentada · tirarse en trineo · con el trineo_  
**14:50** _· Ana: Avonlea, junto a la colina · caminando · tirarse en trineo · con el trineo_  
**14:55** _· Ana: Avonlea, junto a la colina · caminando · tirarse en trineo · con el trineo_  
**15:00** _· Ana: Avonlea, junto a la colina · sentada · tirarse en trineo · con el trineo_  
**15:05** _· Ana: Avonlea, junto a la colina · sentada · tirarse en trineo · con el trineo_  
**15:10** _· Ana: Avonlea, junto a la colina · caminando · tirarse en trineo · con el trineo_  
**15:11** Ana se levanta; termina de tirarse en trineo.  
**15:11** Ana se sienta.  
**15:11** Ana se levanta.  

</details>

## El picnic con Diana (meta 58: cumplida)

**Lo que debería pasar:** Ana le pide permiso a Marilla. Prepara la canasta en la cocina. Va al lago con Diana; extienden el mantel, se sientan y meriendan, sin apuro, un buen rato.

- ✔ Prepara la canasta en la cocina. — 11:10, 15 min
- ✔ Merienda sentada sobre el mantel, un buen rato. — 12:08, 40 min
- ✔ Diana está sentada con ella. — 12:08, 40 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (126 líneas)</summary>

**11:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**11:00** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.  
**11:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**11:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**11:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**11:00** Marilla se levanta.  
**11:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**11:00** Ana dice: «Marilla, si me va a llamar Ana, ¿podría llamarme Ana con e?»  
**11:01** Marilla dice: «¿Qué diferencia hay, si se pronuncia igual?»  
**11:02** Ana dice: «¡Oh, mucha! Se ve tanto más bonito. Cuando oye un nombre, ¿no lo ve escrito en su cabeza, como impreso? Yo sí. A-n-a se ve horrible, pero A-n-n-e… se ve tan distinguido.»  
**11:04** Marilla aprieta los labios, pero casi sonríe. Y dice: «Está bien. Ana con e, entonces.»  
**11:05** _· Ana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**11:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**11:05** Marilla dice: «Ana, ¿barriste el porche como te dije?»  
**11:06** Ana dice: «Sí, Marilla… bueno, casi. Me distraje mirando una araña que tejía, y era tan perfecta…»  
**11:07** Marilla dice: «Las arañas no barren porches, Ana.»  
**11:08** Ana dice: «Marilla, ¿puedo ir al picnic de la escuela dominical? ¡Va a haber helado!»  
**11:09** Marilla dice: «Está bien, puedes ir. Y te pongo una canasta con algo rico.»  
**11:10** _· Ana: la cocina de Tejas Verdes, junto a la mesa · caminando_  
**11:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**11:10** Ana empieza a preparar una canasta de picnic.  
**11:10** Ana sigue, con el bol.  
**11:10** Ana está en la cocina de Tejas Verdes, junto a la estufa.  
**11:13** Marilla está en la cocina de Tejas Verdes, junto al fregadero.  
**11:15** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar una canasta de picnic · con el bol_  
**11:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:15** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · caminando_  
**11:20** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar una canasta de picnic · con el bol_  
**11:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:20** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:25** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar una canasta de picnic · con el bol_  
**11:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:25** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:25** Ana termina de preparar una canasta de picnic; ahora tiene una canasta de picnic.  
**11:25** Ana sale, junto a Tejas Verdes.  
**11:30** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**11:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:30** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · caminando_  
**11:35** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**11:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:35** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · caminando_  
**11:39** Ana dice: «¡Diana! ¡Espera!»  
**11:39** Diana dice: «¿Me llamabas?»  
**11:40** _· Ana: Avonlea, no lejos del huerto de los Barry · caminando_  
**11:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:40** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · caminando_  
**11:40** Minnie May Barry dice: «¡Mire, encontré un nido!»  
**11:41** Mary Joe dice: «No lo toques, que la madre vuelve.»  
**11:42** Diana dice: «Hola… ¿Tú eres la niña que vino a vivir a Tejas Verdes?»  
**11:42** Ana está en Avonlea, junto a La Cuesta del Huerto.  
**11:43** Ana dice: «¿Vamos a dar un paseo juntas? Hace un día precioso.»  
**11:43** Ana dice: «¡Buenos días, Mary Joe!»  
**11:44** Ana dice: «Sí… soy Ana. Ana con e. ¿Y tú… tú eres Diana Barry?»  
**11:44** Mary Joe dice: «¡Qué gusto verle, Ana!»  
**11:45** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:45** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:45** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · caminando_  
**11:45** Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»  
**11:46** Diana dice: «Sí. Mamá dice que eres muy rara. Pero no pareces rara. Bueno, un poquito.»  
**11:46** Mary Joe dice: «Ya lo creo, Ana. Ya lo creo.»  
**11:47** Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»  
**11:47** Ana se pone colorada hasta las orejas. Y dice: «Tengo una imaginación muy grande, eso es todo. ¿Te… te gustaría que algún día jugáramos juntas?»  
**11:48** Mary Joe dice: «Nunca lo había pensado así.»  
**11:48** Ana dice: «Bueno, me voy, que tengo que ir al lago.»  
**11:49** Diana dice: «Bueno… tal vez. Tengo que volver a casa ahora.»  
**11:50** _· Ana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**11:50** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:50** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · caminando_  
**11:55** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**11:55** _· Diana: Avonlea, junto al puente del arroyo · caminando_  
**11:55** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · caminando_  
**11:58** Diana está en Avonlea, no lejos del Bosque Encantado.  
**12:00** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**12:00** _· Diana: Avonlea, no lejos del puente del arroyo · caminando_  
**12:00** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · caminando_  
**12:00** Marilla se sienta.  
**12:00** Diana está en Avonlea, no lejos del puente del arroyo.  
**12:01** Ana está en Avonlea, no lejos del Camino Blanco de las Delicias.  
**12:01** Ana dice: «El agua tiene hoy un color de perla... ¿o de ópalo?»  
**12:02** Diana está en Avonlea, no lejos del Camino Blanco de las Delicias.  
**12:02** Diana está en Avonlea, no lejos del Lago de las Aguas Brillantes.  
**12:04** Diana dice: «Mamá dice que las amigas de verdad se juran amistad para siempre… ¿tú crees en esas cosas, Ana?»  
**12:05** _· Ana: Avonlea, no lejos del Lago de las Aguas Brillantes · caminando_  
**12:05** _· Diana: Avonlea, no lejos del Lago de las Aguas Brillantes · caminando_  
**12:05** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:08** Gilbert Blythe dice: «¿Quieres que te ayude a cruzar el arroyo? ¿No? Bueno...»  
**12:08** Ana está en Avonlea, junto al Lago de las Aguas Brillantes.  
**12:08** Ana se sienta; empieza a merendar en el lago con Diana; con el mantel del picnic.  
**12:08** Ana dice: «¡Un picnic junto al lago! Y hay helado… ¡nunca había probado helado! Es indescriptible.»  
**12:08** Diana está en Avonlea, junto al Lago de las Aguas Brillantes; se sienta.  
**12:09** Ana sigue de largo con la nariz en alto.  
**12:10** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic_  
**12:10** _· Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada_  
**12:10** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:15** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic_  
**12:15** _· Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada_  
**12:15** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:20** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic_  
**12:20** _· Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada_  
**12:20** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:25** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic_  
**12:25** _· Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada_  
**12:25** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:30** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic_  
**12:30** _· Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada_  
**12:30** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:35** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic_  
**12:35** _· Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada_  
**12:35** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:40** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic_  
**12:40** _· Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada_  
**12:40** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:45** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic_  
**12:45** _· Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada_  
**12:45** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:48** Ana se levanta; termina de merendar en el lago con Diana; ya no tiene nada.  
**12:48** Diana se levanta.  
**12:48** Ana se sienta.  
**12:48** Ana se levanta.  
**12:50** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando_  
**12:50** _· Diana: Avonlea, junto al Lago de las Aguas Brillantes · caminando_  
**12:50** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:50** Ana está en Avonlea, no lejos del Lago de las Aguas Brillantes.  

</details>

## El corte de pelo (meta 60: cumplida)

**Lo que debería pasar:** Ana se sienta en una silla en medio de la cocina. Marilla, detrás de ella con las tijeras, le corta el pelo verde, con cuidado, un buen rato.

- ✔ Ana sentada en la cocina mientras le cortan el pelo, un buen rato. — 16:00, 15 min
- ✔ Marilla está con ella en la cocina. — 16:05, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (19 líneas)</summary>

**16:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes; tiene el pelo verde.  
**16:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**16:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**16:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**16:00** Marilla se levanta.  
**16:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**16:00** La Sra. Lynde dice: «Ana Shirley, hablas más que un molino... pero tienes buen corazón, eso lo reconozco.»  
**16:00** Ana empieza a cortarse el pelo.  
**16:00** Marilla dice: «No hay más remedio, Ana: hay que cortarlo. Quédate quieta.»  
**16:00** Ana se sienta; con Marilla detrás, que le corta el pelo.  
**16:05** _· Ana: la cocina de Tejas Verdes · sentada · cortarse el pelo · con Marilla detrás, que le corta el pelo_  
**16:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:10** _· Ana: la cocina de Tejas Verdes · sentada · cortarse el pelo · con Marilla detrás, que le corta el pelo_  
**16:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:15** _· Ana: la cocina de Tejas Verdes · sentada · cortarse el pelo · con Marilla detrás, que le corta el pelo_  
**16:15** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:15** Ana se levanta; termina de cortarse el pelo.  
**16:15** Ana dice: «Mi pelo… Bueno, por lo menos ya no es verde.»  
**16:16** Ana sale, junto a Tejas Verdes.  

</details>

## El techo de los Barry (meta 61: cumplida)

**Lo que debería pasar:** Josie la desafía. Ana sube al techo de la casa de los Barry, camina por el caballete con los brazos abiertos… y se cae. Se tuerce el tobillo.

- ✔ Sube al techo y camina por el caballete. — 15:21, 2 min
- ✔ Se cae y se tuerce el tobillo. — 15:22, 1 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (20 líneas)</summary>

**15:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**15:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**15:00** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**15:05** _· Ana: Avonlea, no lejos de la huerta de Tejas Verdes · caminando_  
**15:06** Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»  
**15:10** _· Ana: Avonlea, no lejos del Bosque Encantado · caminando_  
**15:12** Ana está en Avonlea, junto al puente del arroyo.  
**15:12** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**15:15** _· Ana: Avonlea, junto al puente del arroyo · de pie_  
**15:20** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**15:21** Ana va por Avonlea, junto a La Cuesta del Huerto; empieza a caminar por el techo de los Barry.  
**15:21** Ana dice: «¡Josie Pye, mira cómo camino por el techo de los Barry!… ¡Ay!»  
**15:21** Mary Joe dice: «¡Muy bien! Pero no corras tanto, que te caes.»  
**15:22** Ana dice: «¡Aaay!»  
**15:22** Ana dice: «¡Mi tobillo! Creo que me lo torcí… Diana, no puedo pararme.»  
**15:23** Ana se sienta; termina de caminar por el techo de los Barry.  
**15:23** Ana dice: «Se me ocurrió una idea... ¡de esas que solo tengo yo!»  
**15:23** Ana se levanta.  
**15:24** Minnie May Barry dice: «¡Ana! ¿Me cuentas el cuento del hada otra vez?»  
**15:25** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie_  

</details>

## Conocer a Diana (una cadena del libro) (meta 62: cumplida)

**Lo que debería pasar:** El día antes, Ana le contó a Marilla que quería una amiga del alma. Hoy, en la tarde, Marilla va a La Cuesta del Huerto a devolverle un patrón a la Sra. Barry y lleva a Ana. La Sra. Barry las recibe en la salita y llama a Diana, que está en el jardín. Diana entra, las presentan, y Ana le pregunta si podría quererla lo bastante como para ser su amiga del alma. Diana se ríe y dice que sí.

- ✔ Marilla invita a Ana a ir con ella a La Cuesta del Huerto. — 14:30, 16 min
- ✔ Ana llega con Marilla a la salita de los Barry. — 14:55, 15 min
- ✔ La Sra. Barry las recibe y llama a Diana. — 14:58, hasta el final
- ✔ Diana entra a la salita. — 15:00, 10 min
- ✔ Ana le pregunta si podría ser su amiga del alma. — 15:02, 8 min
- ✔ Diana dice que sí. — 15:04, 6 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (72 líneas)</summary>

**14:30** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**14:30** Al empezar, Marilla está en Avonlea, junto a Tejas Verdes.  
**14:30** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.  
**14:30** Al empezar, la Sra. Barry está en la salita de La Cuesta del Huerto.  
**14:30** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**14:30** _· Marilla: Avonlea, junto a Tejas Verdes · de pie_  
**14:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:30** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:30** Marilla dice: «Ana, voy a La Cuesta del Huerto a devolverle un patrón a la Sra. Barry. Ven conmigo: así conoces a Diana. Y pórtate bien.»  
**14:31** Marilla dice: «Los platos no se lavan solos, Ana. Y el piso tampoco se barre solo.»  
**14:34** Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»  
**14:35** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**14:35** _· Marilla: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**14:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**14:35** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:40** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**14:40** _· Marilla: Avonlea, junto al puente del arroyo · caminando_  
**14:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:40** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:45** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**14:45** _· Marilla: Avonlea, junto al huerto de los Barry · caminando_  
**14:45** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:45** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:45** Minnie May Barry dice: «¡Gané la carrera hasta el portón!»  
**14:46** Marilla entra a la salita de La Cuesta del Huerto.  
**14:50** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**14:50** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**14:50** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**14:50** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:50** Marilla sale.  
**14:50** Marilla dice: «¡Buenas tardes, Minnie May Barry!»  
**14:51** Minnie May Barry dice: «¡Buenas tardes, Marilla! ¿Cómo están todos en casa?»  
**14:52** Marilla dice: «Qué lindo día para tender la ropa.»  
**14:53** Minnie May Barry dice: «Ya lo creo. Y ayer que no paró de llover.»  
**14:54** Marilla dice: «Bueno, me voy, que tengo que ir a donde está Ana.»  
**14:54** Ana está en Avonlea, junto a La Cuesta del Huerto.  
**14:55** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:55** _· Marilla: Avonlea · caminando_  
**14:55** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:55** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:55** Marilla dice: «Rachel Lynde dice que todavía no la has ido a ver. Es mejor ir que dar que hablar.»  
**14:55** Ana entra a la salita de La Cuesta del Huerto.  
**14:55** Marilla entra a la salita de La Cuesta del Huerto.  
**14:55** La Sra. Barry dice: «Buenas tardes, Marilla. ¡Qué sorpresa! Pasa, pasa. ¿Y ésta es la niña que adoptaron?»  
**14:56** Marilla dice: «Sí, ésta es Ana Shirley. Vengo a devolverle el patrón de la falda que me prestó.»  
**14:58** Ana dice: «Ana con e, por favor.»  
**14:58** La Sra. Barry dice: «¿Cómo estás, Ana? Diana está en el jardín. ¡Diana! Ven a conocer a la niña de los Cuthbert.»  
**15:00** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**15:00** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**15:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:00** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**15:00** Diana entra a la salita de La Cuesta del Huerto.  
**15:00** La Sra. Barry dice: «Ésta es mi hija Diana. Diana, ¿por qué no llevas a Ana al jardín y le muestras tus flores?»  
**15:01** Diana dice: «Hola… ¿quieres venir a ver el jardín?»  
**15:02** Ana mira a Diana muy seria, sin atreverse a respirar. Y dice: «Oh, Diana… ¿crees que podrías… que podrías quererme un poquito, lo bastante como para ser mi amiga del alma?»  
**15:04** Diana se ríe; Diana siempre se ríe antes de hablar. Y dice: «Bueno, creo que sí. Me alegro mucho de que hayas venido a vivir a Tejas Verdes. Va a ser tan lindo tener a alguien con quien jugar.»  
**15:05** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**15:05** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**15:05** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**15:05** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**15:07** La Sra. Lynde dice: «Ana Shirley, hablas más que un molino... pero tienes buen corazón, eso lo reconozco.»  
**15:10** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**15:10** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**15:10** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**15:10** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**15:10** Ana dice: «Hay tanto por hacer y tan poco tiempo... ¡y yo con tantas ideas!»  
**15:10** Ana sale; se sienta.  
**15:10** Marilla sale.  
**15:10** Diana sale.  
**15:10** Ana se levanta.  
**15:11** Minnie May Barry dice: «¡Mire, encontré un nido!»  
**15:12** Mary Joe dice: «No lo toques, que la madre vuelve.»  

</details>

## «¡Zanahorias!» (una cadena del libro) (meta 63: cumplida)

**Lo que debería pasar:** El primer día de Ana en la escuela, Gilbert Blythe le toma una trenza y le dice «¡Zanahorias!». Ana se pone de pie, furiosa, y le parte la pizarra en la cabeza. Gilbert le pide perdón; Ana jura que nunca lo perdonará.

- ✔ Ana entra a la escuela. — 10:23, 15 min
- ✔ Gilbert le dice «¡Zanahorias!». — 10:24, 6 min
- ✔ Ana le parte la pizarra en la cabeza. — 10:27, 11 min
- ✔ Ana jura no perdonarlo nunca. — 10:29, 9 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (33 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** Al empezar, Gilbert Blythe está en la escuela de Avonlea; se sienta.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**10:05** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:10** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**10:10** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:15** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**10:15** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:16** Ana está en Avonlea, no lejos de la casa de Robert Bell.  
**10:20** _· Ana: Avonlea, no lejos de la casa de Robert Bell · caminando_  
**10:20** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:23** Una granjera dice: «¿Vas para la aldea? Yo vengo de la tienda de Lawson.»  
**10:23** Ana está en Avonlea, junto a la escuela.  
**10:23** Ana entra a la escuela de Avonlea.  
**10:24** Gilbert Blythe alarga la mano, toma la punta de una trenza de Ana y susurra, lo bastante fuerte para que lo oiga toda la clase. Y dice: «¡Zanahorias! ¡Zanahorias!»  
**10:25** _· Ana: la escuela de Avonlea · de pie_  
**10:25** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:25** Ana se pone de pie de un salto, con los ojos echando chispas. Y dice: «¡Odioso, malvado! ¿Cómo te atreves?»  
**10:27** ¡Crac! Ana le parte la pizarra en la cabeza a Gilbert.  
**10:28** Gilbert Blythe dice: «¡Ay! Perdona, Ana… solo era una broma. De verdad, perdóname.»  
**10:29** Ana dice: «¡Nunca te lo perdonaré! ¡Nunca jamás!»  
**10:30** _· Ana: la escuela de Avonlea · de pie_  
**10:30** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:30** Gilbert Blythe sale; se levanta.  
**10:35** _· Ana: la escuela de Avonlea · de pie_  
**10:35** _· Gilbert Blythe: Avonlea · caminando_  
**10:38** Ana sale; se sienta.  
**10:38** Ana se levanta.  
**10:38** Tillie Boulter dice: «Encontré un nido de petirrojos detrás de la escuela. ¡No le digas a nadie!»  
**10:40** _· Ana: Avonlea · caminando_  
**10:40** _· Gilbert Blythe: Avonlea · de pie_  

</details>

## El broche de amatista (una cadena del libro) (meta 64: cumplida)

**Lo que debería pasar:** Marilla no encuentra su broche de amatista y culpa a Ana, que lo había visto. Ana, para poder ir al picnic, inventa que lo perdió en el lago. Entonces el broche aparece enganchado en el chal de Marilla, que le pide perdón y la deja ir al picnic.

- ✔ Marilla pregunta por su broche. — 10:00, 14 min
- ✔ Ana inventa una confesión. — 10:04, 12 min
- ✔ El broche aparece en el chal de Marilla. — 10:06, 8 min
- ✔ Marilla le pide perdón y la deja ir al picnic. — 10:10, 5 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (23 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**10:00** Marilla se levanta.  
**10:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:00** Marilla dice: «Ana, ¿has visto mi broche de amatista? Lo dejé en el alfiletero de mi cuarto y no está.»  
**10:01** Ana dice: «Lo vi ayer… me lo probé, solo un minutito, y lo dejé otra vez en el tocador.»  
**10:02** Marilla dice: «Pues no está. Ana, te quedas en tu cuarto hasta que me digas la verdad.»  
**10:04** Ana se queda en su cuarto, pensando en el picnic. Al final, inventa una confesión. Y dice: «Me lo llevé para ser Lady Cordelia Fitzgerald… y se me cayó al Lago de las Aguas Brillantes. Ya confesé: ¿ahora puedo ir al picnic?»  
**10:05** _· Ana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:05** Marilla dice: «¿Picnic? No irás a ningún picnic, Ana Shirley.»  
**10:06** Marilla saca su chal negro para remendarlo… y algo brilla en el encaje. Y dice: «¡El broche! Estaba enganchado en mi chal… Ana, ¿por qué dijiste que lo habías perdido?»  
**10:08** Ana dice: «Usted dijo que no saldría hasta confesar. Así que inventé una confesión… y bien interesante, además.»  
**10:10** _· Ana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:10** Marilla se ríe, a pesar de todo. Y dice: «Perdóname, Ana. No debí dudar de ti. Ve a prepararte para el picnic.»  
**10:14** Marilla está en la cocina de Tejas Verdes, junto al fregadero.  
**10:15** _· Ana: la cocina de Tejas Verdes · de pie_  
**10:15** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:15** Ana sale, junto a Tejas Verdes.  
**10:17** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  

</details>

## El té con Diana y el vino de grosellas (una cadena del libro) (meta 65: cumplida)

**Lo que debería pasar:** Ana invita a Diana a tomar el té en Tejas Verdes. Se sientan a la mesa y Ana le sirve lo que cree que es cordial de frambuesa. Diana toma tres vasos, dice que se siente rara y se va a su casa tambaleándose.

- ✔ Diana llega a la cocina de Tejas Verdes. — 16:09, 8 min
- ✔ Se sientan a tomar el té. — 16:09, 8 min
- ✔ Ana le sirve el «cordial». — 16:09, 8 min
- ✔ Diana se siente muy mal. — 16:16, 1 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (136 líneas)</summary>

**13:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**13:00** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.  
**13:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**13:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**13:00** Ana dice: «¡Matthew! Mire estas violetas. Las encontré junto al arroyo. ¿No le parecen como pedacitos de cielo que se cayeron?»  
**13:01** Matthew dice: «Bueno, pues… sí. Ahora que lo dices, sí.»  
**13:02** Ana dice: «Usted siempre me entiende. Es tan agradable hablar con alguien que entiende.»  
**13:03** Matthew dice: «(Matthew se pone colorado hasta las orejas, pero sonríe.)»  
**13:05** _· Ana: la cocina de Tejas Verdes, junto a la puerta · caminando_  
**13:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:05** Matthew dice: «Ana… ¿te gustaría un vestido con mangas abullonadas? Digo… por si acaso.»  
**13:06** Ana dice: «¡Oh, señor Matthew! ¿De verdad lo dice?»  
**13:07** Matthew dice: «Bueno, pues… no le digas nada a Marilla todavía.»  
**13:08** Ana empieza a preparar el té.  
**13:08** Ana sigue, con el bol.  
**13:08** Ana está en la cocina de Tejas Verdes, junto a la estufa.  
**13:10** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar el té · con el bol_  
**13:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:15** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar el té · con el bol_  
**13:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:20** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar el té · con el bol_  
**13:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:25** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar el té · con el bol_  
**13:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:30** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar el té · con el bol_  
**13:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:35** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar el té · con el bol_  
**13:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:38** Ana termina de preparar el té; ahora tiene una taza de té.  
**13:38** Ana dice: «Marilla, Diana es la amiga más perfecta del mundo. Tiene los ojos negros y la risa como un arroyo, y le gustan las mismas cosas que a mí. Bueno, casi.»  
**13:40** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie_  
**13:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:40** Marilla dice: «Me alegro. Pero no la canses con tus discursos.»  
**13:41** Ana dice: «Ella dice que le encantan mis discursos. ¡Me lo juró!»  
**13:42** Marilla dice: «(Marilla mueve la cabeza.) Entre las dos van a terminar en un libro.»  
**13:43** Ana sale, junto a Tejas Verdes.  
**13:44** Matthew dice: «¿Viste las flores junto al camino? Bueno, pues... me hicieron pensar en ti.»  
**13:44** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**13:45** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**13:45** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:50** _· Ana: Avonlea, no lejos del Camino Blanco de las Delicias · caminando_  
**13:50** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:51** Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»  
**13:55** _· Ana: Avonlea, no lejos del Bosque Encantado · caminando_  
**13:55** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**13:56** Ana está en Avonlea, junto al puente del arroyo.  
**14:00** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**14:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:03** Ana dice: «¡Diana! ¡Espera!»  
**14:04** Diana dice: «¿Qué pasa?»  
**14:05** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**14:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:05** Minnie May Barry dice: «¡Gané la carrera hasta el portón!»  
**14:05** Mary Joe dice: «¡Muy bien! Pero no corras tanto, que te caes.»  
**14:06** Ana está en Avonlea, junto a La Cuesta del Huerto.  
**14:06** Ana dice: «¿Vendrías a tomar el té conmigo esta tarde, a las 17:00? En la cocina de Tejas Verdes.»  
**14:07** Diana dice: «¡Sí, me encantaría! Allí estaré.»  
**14:10** _· Ana: Avonlea, no lejos del huerto de los Barry · caminando_  
**14:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:15** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**14:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:20** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**14:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:20** Ana está en Avonlea, no lejos del Camino Blanco de las Delicias.  
**14:20** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**14:25** _· Ana: Avonlea, no lejos de la huerta de Tejas Verdes · caminando_  
**14:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:27** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**14:28** Marilla dice: «Ana, no te quedes soñando despierta. Aunque... la cocina está ordenada, eso sí.»  
**14:30** _· Ana: la cocina de Tejas Verdes · de pie_  
**14:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:35** _· Ana: la cocina de Tejas Verdes · de pie_  
**14:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:40** _· Ana: la cocina de Tejas Verdes · de pie_  
**14:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:45** _· Ana: la cocina de Tejas Verdes · de pie_  
**14:45** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:50** _· Ana: la cocina de Tejas Verdes · de pie_  
**14:50** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:51** Marilla dice: «Rachel Lynde dice que todavía no la has ido a ver. Es mejor ir que dar que hablar.»  
**14:55** _· Ana: la cocina de Tejas Verdes · de pie_  
**14:55** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:00** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:05** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:10** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:14** Ana dice: «Marilla, ¿no es bonito pensar que mañana es un día nuevo, sin ningún error todavía?»  
**15:15** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:16** Marilla dice: «Te garantizo que vas a cometer varios antes de la noche.»  
**15:17** Ana dice: «Sí, ya lo sé. Pero ¿se ha dado cuenta de algo alentador? Nunca cometo el mismo error dos veces.»  
**15:18** Marilla dice: «No sé de qué sirve eso, si siempre estás inventando errores nuevos.»  
**15:19** Ana dice: «Bueno, alguna vez se me tendrán que acabar. Es una idea muy consoladora.»  
**15:20** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:25** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:30** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:35** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:38** Marilla dice: «Hmm. Bueno, admito que hoy te has portado muy bien.»  
**15:40** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:45** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:45** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:50** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:50** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:55** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:55** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**16:00** _· Ana: la cocina de Tejas Verdes · de pie_  
**16:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**16:02** Marilla dice: «Riega la huerta antes de que caiga el sol, que las plantas lo agradecen.»  
**16:05** _· Ana: la cocina de Tejas Verdes · de pie_  
**16:05** _· Diana: Avonlea, junto al Bosque Encantado · caminando_  
**16:09** Diana entra a la cocina de Tejas Verdes, junto a la puerta.  
**16:09** Diana está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta.  
**16:09** Ana está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta; empieza a tomar el té con Diana; con el té.  
**16:09** Ana dice: «¿Un poco más de té? Y prueba estas galletas.»  
**16:09** Diana empieza a tomar el té con Ana; con el té.  
**16:09** Ana dice: «Toma otro vaso de cordial de frambuesa, Diana. Es de Marilla, y es buenísimo.»  
**16:10** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · tomar el té con Diana · con el té_  
**16:10** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · tomar el té con Ana · con el té_  
**16:11** Diana dice: «Es el cordial más rico que he probado. Mucho más rico que el de la Sra. Lynde. (Diana se sirve el tercer vaso.)»  
**16:12** Ana le cuenta a Diana cómo se le cayó un ratón en la salsa de ciruela, con todos los detalles.  
**16:14** Diana dice: «Ana… me siento… me siento rara. Creo que me voy a casa.»  
**16:15** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · tomar el té con Diana · con el té_  
**16:15** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · tomar el té con Ana · con el té_  
**16:15** Ana dice: «¿A casa? ¡Pero si todavía no hemos tomado el té! ¡Diana, no te vayas!»  
**16:16** Diana se levanta tambaleándose. Y dice: «Me siento… muy… muy mal.»  
**16:17** Diana se levanta; termina de tomar el té con Ana.  
**16:17** Diana sale, junto a Tejas Verdes.  
**16:17** Ana se levanta; termina de tomar el té con Diana.  

</details>

## Minnie May y el crup (una cadena del libro) (meta 66: cumplida)

**Lo que debería pasar:** Diana tiene prohibido ver a Ana. Una noche llega corriendo a Tejas Verdes: Minnie May tiene crup. Ana toma el jarabe de ipecacuana y corre con ella a La Cuesta del Huerto, donde cuida a Minnie May toda la noche. Al otro día, la Sra. Barry le pide perdón.

- ✔ Diana llega corriendo a la cocina de Tejas Verdes. — 19:13, 5 min
- ✔ Diana avisa que Minnie May tiene crup. — 19:13, 4 min
- ✔ Ana corre a La Cuesta del Huerto. — 19:27, hasta el final
- ✔ Ana la cuida hasta que respira mejor. — 19:30, hasta el final
- ✔ La Sra. Barry le pide perdón. — 19:31, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (44 líneas)</summary>

**19:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**19:00** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.  
**19:00** Al empezar, la Sra. Barry está en la salita de La Cuesta del Huerto.  
**19:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**19:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**19:00** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**19:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**19:05** _· Ana: la cocina de Tejas Verdes · de pie_  
**19:05** _· Diana: Avonlea, junto al puente del arroyo · caminando_  
**19:05** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**19:10** _· Ana: la cocina de Tejas Verdes · de pie_  
**19:10** _· Diana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**19:10** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**19:13** Diana entra a la cocina de Tejas Verdes, junto a la puerta.  
**19:13** Diana dice: «¡Ana! ¡Ven, por favor! Minnie May está enferma… tiene crup. Papá y mamá fueron al pueblo, y Mary Joe no sabe qué hacer.»  
**19:15** _· Ana: la cocina de Tejas Verdes · de pie_  
**19:15** _· Diana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**19:15** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**19:15** Ana dice: «¡Crup! Yo cuidé a los mellizos de la Sra. Hammond… tres veces tuvieron crup. Tengo el jarabe de ipecacuana.»  
**19:16** Ana toma el frasco del aparador y su chal. Y dice: «¡Vamos, Diana! ¡Corre!»  
**19:18** Ana sale, junto a Tejas Verdes.  
**19:18** Diana sale, junto a Tejas Verdes.  
**19:18** Jerry Buote dice: «Oui, oui... ya voy, ya voy. ¡Esa vaca no se quiere mover!»  
**19:20** _· Ana: Avonlea, no lejos de la huerta de Tejas Verdes · caminando_  
**19:20** _· Diana: Avonlea, no lejos de la huerta de Tejas Verdes · caminando_  
**19:20** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**19:25** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**19:25** _· Diana: Avonlea, no lejos del puente del arroyo · caminando_  
**19:25** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**19:26** El Sr. Barry dice: «¿Cómo vienen las papas este año?»  
**19:27** Ana entra a la salita de La Cuesta del Huerto.  
**19:27** Minnie May arde de fiebre en el sofá, y apenas puede respirar.  
**19:27** Diana entra a la salita de La Cuesta del Huerto.  
**19:28** Ana dice: «Mary Joe, pon agua a calentar. Diana, más leña en la estufa.»  
**19:29** Ana le da el jarabe de ipecacuana a cucharadas, toda la noche, sin parar.  
**19:30** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**19:30** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**19:30** _· la Sra. Barry: la salita de La Cuesta del Huerto · caminando_  
**19:30** Ana dice: «¡Ya respira mejor! ¡Diana, ya respira mejor!»  
**19:31** Al otro día, la Sra. Barry viene con los ojos llenos de lágrimas. La Sra. Barry dice: «Ana, el doctor dice que salvaste a Minnie May. Me porté muy mal contigo. Perdóname, y sé amiga de Diana como antes.»  
**19:33** Ana no cabe en sí de felicidad. Y dice: «¡Oh, Sra. Barry! La perdono con toda mi alma.»  
**19:35** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**19:35** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**19:35** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  

</details>

## El pastel con linimento (una cadena del libro) (meta 67: cumplida)

**Lo que debería pasar:** La Sra. Allan viene a tomar el té a Tejas Verdes, invitada por Marilla. Ana sirve su pastel; la Sra. Allan lo prueba con valentía. Marilla descubre que Ana le puso linimento anodino en vez de vainilla. Ana sale a llorar, y la Sra. Allan la consuela y la invita a la casa parroquial.

- ✔ La Sra. Allan llega a la cocina de Tejas Verdes. — 15:28, 41 min
- ✔ Ana sirve su pastel. — 15:30, hasta el final
- ✔ Marilla descubre el linimento. — 15:34, hasta el final
- ✔ La Sra. Allan la consuela y la invita. — 15:37, 32 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (65 líneas)</summary>

**15:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**15:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**15:00** Al empezar, la Sra. Allan está en Avonlea, junto a la iglesia.  
**15:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**15:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**15:00** _· la Sra. Allan: Avonlea, junto a la iglesia · caminando_  
**15:00** Marilla se levanta.  
**15:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**15:00** La Sra. Allan dice: «¡Buenas tardes, Jasper Dale!»  
**15:05** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:05** _· la Sra. Allan: Avonlea, no lejos de la casa de Robert Bell · caminando_  
**15:10** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:10** _· la Sra. Allan: Avonlea, no lejos del salón del pueblo · caminando_  
**15:15** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:15** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:15** _· la Sra. Allan: Avonlea, no lejos de la escuela · caminando_  
**15:20** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:20** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:20** _· la Sra. Allan: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**15:25** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:25** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:25** _· la Sra. Allan: Avonlea, no lejos del campo de heno · caminando_  
**15:28** La Sra. Allan entra a la cocina de Tejas Verdes, junto a la puerta.  
**15:29** La Sra. Allan empieza a visitar a Marilla; con el té.  
**15:29** La Sra. Allan dice: «Buenas tardes, Marilla. Vine a visitarla.»  
**15:29** Marilla dice: «¡Pasa, pasa! Siéntate, que pongo la tetera.»  
**15:30** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:30** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:30** _· la Sra. Allan: la cocina de Tejas Verdes · caminando · visitar a Marilla_  
**15:30** La Sra. Allan está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta; con el té.  
**15:30** Ana sirve su pastel en capas, con mermelada roja entre las capas.  
**15:31** La Sra. Allan prueba un bocado… y pone una cara rara. Pero sigue comiendo, con valentía.  
**15:32** Marilla dice: «Ana Shirley, ¿qué le pusiste a este pastel?»  
**15:33** Ana dice: «Vainilla, Marilla… solo vainilla.»  
**15:34** Marilla trae el frasco y lo huele. Y dice: «¡Linimento anodino! Se me rompió la botella la semana pasada y guardé lo que quedaba en el frasco viejo de vainilla.»  
**15:35** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:35** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:35** _· la Sra. Allan: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · visitar a Marilla · con el té_  
**15:36** Ana sale corriendo y se tira en su cama a llorar. Y dice: «¡Nunca podré borrar esta vergüenza!»  
**15:37** La Sra. Allan sube a verla. Y dice: «Querida, fue un error muy gracioso, nada más. Ahora muéstrame tus flores… y ven un día a tomar el té a la casa parroquial.»  
**15:40** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:40** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:40** _· la Sra. Allan: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · visitar a Marilla · con el té_  
**15:45** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:45** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:45** _· la Sra. Allan: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · visitar a Marilla · con el té_  
**15:50** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:50** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:50** _· la Sra. Allan: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · visitar a Marilla · con el té_  
**15:55** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:55** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:55** _· la Sra. Allan: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · visitar a Marilla · con el té_  
**16:00** _· Ana: la cocina de Tejas Verdes · de pie_  
**16:00** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:00** _· la Sra. Allan: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · visitar a Marilla · con el té_  
**16:05** _· Ana: la cocina de Tejas Verdes · de pie_  
**16:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:05** _· la Sra. Allan: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · visitar a Marilla · con el té_  
**16:09** La Sra. Allan se levanta; termina de visitar a Marilla.  
**16:09** La Sra. Allan sale, junto a la iglesia.  
**16:10** _· Ana: la cocina de Tejas Verdes · de pie_  
**16:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:10** _· la Sra. Allan: Avonlea, junto a la iglesia · de pie_  

</details>

## La tía Josephine (una cadena del libro) (meta 68: cumplida)

**Lo que debería pasar:** Ana va a casa de Diana. Diana la invita a quedarse a dormir después del concierto; esa noche saltan sobre la cama del cuarto de huéspedes, donde dormía la tía Josephine. Ana confiesa que fue culpa suya, y la tía Josephine se ríe y se hace su amiga.

- ✔ Ana entra a La Cuesta del Huerto. — 16:16, 21 min
- ✔ Diana la invita a quedarse a dormir. — 16:16, hasta el final
- ✔ Saltan sobre la cama… y hay alguien. — 16:20, hasta el final
- ✔ Ana confiesa. — 16:23, 14 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (29 líneas)</summary>

**16:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**16:00** Al empezar, Diana está en la salita de La Cuesta del Huerto; ahora tiene un libro.  
**16:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**16:00** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**16:05** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**16:05** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**16:10** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**16:10** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**16:15** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**16:15** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**16:15** Mary Joe dice: «La señora Barry dice que tienda la ropa antes de que se nuble.»  
**16:16** Ana entra a la salita de La Cuesta del Huerto.  
**16:16** Diana dice: «¡Ana! Esta noche hay concierto del Club de Debate en el salón. Mamá dice que puedes quedarte a dormir… ¡en el cuarto de huéspedes!»  
**16:18** Esa noche, al volver del concierto, las niñas corren por el pasillo. Ana dice: «¡A la que llegue última a la cama!»  
**16:20** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**16:20** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**16:20** Las dos saltan sobre la cama del cuarto de huéspedes… Diana dice: «¡Ay! ¡Hay alguien en la cama!»  
**16:22** Diana dice: «Es… es la tía Josephine, de Charlottetown. ¡Ahora sí que nos va a pasar algo terrible!»  
**16:23** A la mañana siguiente, Ana va a verla. Ana dice: «Fue culpa mía, Srta. Barry. Diana no tuvo la culpa. Y usted no sabe lo que es tener tanta imaginación.»  
**16:25** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**16:25** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**16:30** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**16:30** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**16:35** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**16:35** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**16:36** La Sra. Barry dice: «Diana habla de ti todo el día, ¿sabes?»  
**16:37** Ana sale; se sienta.  
**16:37** Ana se levanta.  
**16:37** Minnie May Barry dice: «Diana no me deja jugar con sus muñecas. ¿Tú me dejas?»  

</details>

## El examen de Queen's (lo que se gana de a poco) (meta 69: cumplida)

**Lo que debería pasar:** El primer día del verano, Marilla le recuerda a Ana que hoy es el examen de Queen's, en Charlottetown. Ana estudió lo suficiente (60 días de estudio, en su segundo año): entra, aunque no primera. Marilla está orgullosa, aunque no lo diga.

- ✔ Marilla le recuerda el examen. — 08:00, hasta el final
- ✔ Ana entra a Queen's. — 08:03, hasta el final
- ✔ Marilla, orgullosa a su manera. — 08:05, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (11 líneas)</summary>

**08:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**08:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**08:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**08:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**08:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**08:00** Marilla dice: «Ana, hoy es el examen de Queen's. Matthew te lleva a Charlottetown. Toma, no se te olvide el almuerzo.»  
**08:01** Ana pasa el día en Charlottetown, con la pluma temblándole en la mano. La geometría fue terrible… pero el resto, no tanto.  
**08:03** Semanas después, sale la lista en el diario. Ana dice: «¡Marilla! ¡Entré a Queen's! No primera… pero entré.»  
**08:05** Marilla dice: «Lo sabía. Aunque no te lo iba a decir, para que no te llenaras de humo.»  
**08:05** _· Ana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**08:05** _· Marilla: la cocina de Tejas Verdes · sentada_  

</details>

## Un hito de la granja (las habilidades de Ana) (meta 70: cumplida)

**Lo que debería pasar:** Ana lava los platos; con eso llega al hito 10 de la granja, y Marilla, seca pero contenta, le reconoce que ayuda de verdad.

- ✔ Ana lava los platos. — 10:00, hasta el final
- ✔ Marilla le reconoce lo que ayuda. — 10:05, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (17 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**10:00** Marilla se levanta.  
**10:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:00** Ana empieza a lavar los platos.  
**10:00** Ana dice: «Lavo los platos con agua bien caliente… ¡y no rompo ninguno!»  
**10:01** Ana sigue, con los platos que va recogiendo.  
**10:01** Ana está en la cocina de Tejas Verdes, junto a la mesa.  
**10:02** Marilla está en la cocina de Tejas Verdes, junto al fregadero.  
**10:04** Ana lleva los platos sucios.  
**10:04** Ana deja los platos sucios; con la palangana con agua.  
**10:04** Ana está en la cocina de Tejas Verdes, junto al fregadero.  
**10:05** _· Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · lavar los platos · con la palangana con agua_  
**10:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:05** Marilla dice: «Ana, ya sabes dónde va cada cosa en esta cocina. Así se aprende a llevar una casa.»  

</details>

