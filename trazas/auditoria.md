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

<details><summary>Lo que el juego cuenta que pasó (37 líneas)</summary>

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
**10:35** _· Ana: la cocina de Tejas Verdes · de pie_  
**10:35** Marilla dice: «Ana, no te quedes soñando despierta. Aunque... la cocina está ordenada, eso sí.»  

</details>

## Escribir una carta y mandarla (meta 45: cumplida)

**Lo que debería pasar:** Ana sube a su pieza, se sienta al escritorio y escribe una carta a la Srta. Stacy, con el papel sobre el escritorio, sin apuro (una media hora). La dobla y la pone en su sobre. Después baja y va al correo (en la tienda de Lawson), y la deja para que la manden. Ya no la tiene.

- ✔ Escribe sentada al escritorio de su pieza, con la carta sobre él, una media hora. — 10:02, 50 min
- ✔ Termina con la carta en su sobre. — 10:52, 29 min
- ✔ Va al correo (en la tienda de Lawson). — 11:20, 3 min
- ✔ La deja: ya no la tiene. — 11:21, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (50 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:00** Ana empieza a escribir una carta.  
**10:02** Ana entra a la pieza de Ana.  
**10:02** Ana está en la pieza de Ana, junto al escritorio.  
**10:02** Ana se sienta; con la banqueta y la carta sobre la mesa.  
**10:02** Ana se sienta derechita, como en la escuela, y moja la pluma.  
**10:05** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:05** Ana escribe: «Querida Srta. Stacy:»  
**10:06** Ana escribe: «Aquí en Tejas Verdes los cerezos están en flor.»  
**10:08** Ana dice: «Así empiezan las cartas de los libros: con el tiempo que hace. Debe ser porque es lo único que todos saben.»  
**10:10** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:11** Ana escribe: «Le escribo para contarle que terminé de leer el libro que nos recomendó, y que lloré en el capítulo once.»  
**10:13** Ana dice: «En realidad lloré en el diez también, pero lo del once fue más llanto. Más… literario.»  
**10:15** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:16** Tacha una palabra con tres rayas. Ana dice: ««Indescriptible» no: ya lo usé dos veces esta semana. La Srta. Stacy dice que una palabra gastada es como un vestido con brillo en los codos.»  
**10:19** Ana escribe: «Estuve pensando en lo que dijo de los adjetivos: esta carta tiene solo los indispensables. Bueno, casi.»  
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
**10:53** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**10:55** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**11:00** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**11:05** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**11:10** _· Ana: Avonlea, no lejos de la casa de Robert Bell · caminando_  
**11:13** Una granjera dice: «Sí, se me acabó el azúcar. Con tanta compota...»  
**11:14** Ana está en Avonlea, junto a la aldea.  
**11:14** Ana dice: «¡Buenos días!»  
**11:15** _· Ana: Avonlea, junto a la aldea · de pie_  
**11:15** En el cruce de caminos, la gente se saluda de carreta a carreta. Un perro duerme al sol frente a la tienda.  
**11:16** Ana dice: «Aquí todos saben todo de todos. Al principio me daba miedo; ahora me gusta. Es como vivir dentro de una familia muy grande y un poco metida.»  
**11:20** _· Ana: Avonlea, junto a la tienda de Lawson · caminando_  
**11:20** Ana está en Avonlea, junto a la tienda de Lawson.  
**11:20** Ana dice: «Para la Srta. Stacy, en la pensión de Avonlea.»  
**11:21** Ana ya no tiene nada.  
**11:21** Ana dice: «Mi imaginación no me deja quieta.»  
**11:22** La Srta. Josephine Barry dice: «Buenos días, niña.»  
**11:23** Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).  
**11:23** Ana dice: «¡Srta. Barry! Usted es un espíritu afín, aunque no lo parezca a primera vista.»  

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

<details><summary>Lo que el juego cuenta que pasó (81 líneas)</summary>

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
**10:46** Ana sale, junto a Tejas Verdes.  
**10:46** Marilla empieza a cocinar una compota de manzana.  
**10:47** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**10:47** Marilla está en la cocina de Tejas Verdes, junto a la estufa; con el bol.  
**10:50** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**10:50** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**10:50** Ana está en Avonlea, no lejos del campo de heno.  
**10:55** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**10:55** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**10:55** Ana está en Avonlea, junto a la casa de la Sra. Lynde.  
**10:57** Ana entra a la casa de la Sra. Lynde.  
**10:58** La Sra. Lynde dice: «Desde mi ventana veo todo el camino: no se me escapa nadie. Lo digo sin mala intención, ¿eh?»  
**11:00** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**11:00** _· Ana: la casa de la Sra. Lynde · de pie_  
**11:05** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**11:05** _· Ana: la casa de la Sra. Lynde · de pie_  
**11:09** Ana sale.  
**11:10** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**11:10** _· Ana: Avonlea · caminando_  
**11:15** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**11:15** _· Ana: Avonlea · de pie_  
**11:17** Marilla termina de cocinar una compota de manzana; ahora tiene 3 manzanas, una compota de manzana.  
**11:17** Marilla empieza a cocinar una compota de manzana.  
**11:20** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana_  
**11:20** _· Ana: Avonlea · caminando_  
**11:23** Ana se sienta.  
**11:25** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana_  
**11:25** _· Ana: Avonlea · sentada_  
**11:30** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana_  
**11:30** _· Ana: Avonlea · sentada_  
**11:35** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana_  
**11:35** _· Ana: Avonlea · sentada_  
**11:35** Ana dice: «¡Qué día para hacer algo bonito!»  
**11:35** Ana se levanta.  
**11:36** Ana ahora tiene 3 bayas.  
**11:38** Ana se sienta.  
**11:40** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana_  
**11:40** _· Ana: Avonlea · sentada_  
**11:44** Ana se levanta.  
**11:45** _· Marilla: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana_  
**11:45** _· Ana: Avonlea · de pie_  
**11:46** Matthew dice: «La huerta está pidiendo semillas y agua, me parece. Bueno, digo yo.»  
**11:47** Marilla termina de cocinar una compota de manzana; ahora tiene 2 compotas de manzana.  

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
**09:00** Matthew dice: «¿Me llamabas?»  
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

- ✔ Ana le pide el tinte al buhonero (a cambio de huevos). — 11:08, 1 min
- ✔ Ana tiene el tinte. — 11:09, 62 min
- ✔ Se tiñe frente al espejo del lavatorio de su pieza, un buen rato. — 11:57, 15 min
- ✔ El pelo le queda verde. — 12:12, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (105 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** Al empezar, el buhonero está en Avonlea, junto a la huerta de Tejas Verdes.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** _· el buhonero: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**10:01** Ana está en Avonlea, junto al gallinero; empieza a recoger 6 huevos.  
**10:02** Ana se agacha; con el canastito.  
**10:02** Del granero sale olor a heno recién cortado. Una golondrina entra y sale por la ventanita del pajar.  
**10:04** Ana dice: «El heno huele a todo el verano junto, guardado. En invierno voy a venir a olerlo cuando extrañe el sol.»  
**10:05** _· Ana: Avonlea, junto al gallinero · agachada · recoger 6 huevos · con el canastito_  
**10:05** _· el buhonero: Avonlea, no lejos del campo de heno · caminando_  
**10:08** Ana se levanta.  
**10:08** Ana se agacha; con el canastito.  
**10:10** _· Ana: Avonlea, junto al gallinero · agachada · recoger 6 huevos · con el canastito_  
**10:10** _· el buhonero: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**10:11** Ana se levanta; termina de recoger 6 huevos; ahora tiene 6 huevos.  
**10:15** _· Ana: Avonlea, no lejos del corral de Tejas Verdes · caminando_  
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
**10:39** Ana dice: «¿Qué pensarán los animales de nosotros?»  
**10:40** _· Ana: Avonlea, no lejos de la casa de Robert Bell · de pie_  
**10:40** _· el buhonero: Avonlea, junto a la casa parroquial · caminando_  
**10:45** _· Ana: Avonlea, no lejos de la escuela · caminando_  
**10:45** _· el buhonero: Avonlea, junto a la casa parroquial · de pie_  
**10:46** El buhonero está en Avonlea, junto al faro.  
**10:47** Una granjera dice: «Ya lo creo. Y ayer que no paró de llover.»  
**10:50** _· Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando_  
**10:50** _· el buhonero: Avonlea, junto al faro · de pie_  
**10:53** Ana dice: «¡Un puente con techo! Es como cruzar el río por adentro de una caja de música.»  
**10:55** _· Ana: Avonlea, no lejos de la tienda de Lawson · caminando_  
**10:55** _· el buhonero: Avonlea, junto al faro · de pie_  
**11:00** _· Ana: Avonlea, no lejos del faro · caminando_  
**11:00** _· el buhonero: Avonlea, junto al faro · de pie_  
**11:02** Ana dice: «¡Buhonero! ¡Espera!»  
**11:03** El buhonero dice: «¿Me llamabas?»  
**11:05** _· Ana: Avonlea, no lejos del faro · caminando_  
**11:05** _· el buhonero: Avonlea, junto al faro · caminando_  
**11:05** Ana está en Avonlea, no lejos del faro.  
**11:05** Ana dice: «Cuando sea grande voy a cruzar el mar. O a escribir sobre él.»  
**11:05** El buhonero dice: «¡Cintas, botones, peinetas, tinte para el pelo! ¡Todo lo que una señorita necesita!»  
**11:08** Ana dice: «Buenos días. ¿Me cambiaría 2 huevos por un frasco de tinte para el pelo?»  
**11:09** El buhonero dice: «Este tinte deja el pelo negro como el ala de un cuervo, señorita. ¡Y no se va con el lavado!»  
**11:09** Ana ahora tiene 4 huevos, un frasco de tinte para el pelo.  
**11:09** El buhonero dice: «¡Negro azabache garantizado! Palabra de honor.»  
**11:10** _· Ana: Avonlea, junto al faro · caminando_  
**11:10** _· el buhonero: Avonlea, junto al faro · de pie_  
**11:15** _· Ana: Avonlea, no lejos del faro · caminando_  
**11:15** _· el buhonero: Avonlea, junto al faro · de pie_  
**11:20** _· Ana: Avonlea, no lejos de la tienda de Lawson · caminando_  
**11:20** _· el buhonero: Avonlea, junto al faro · de pie_  
**11:22** La Srta. Hetty King dice: «Los niños de hoy no saben estarse quietos. En mis tiempos...»  
**11:25** _· Ana: Avonlea, junto a la tienda de Lawson · caminando_  
**11:25** _· el buhonero: Avonlea, junto al faro · de pie_  
**11:27** Ana está en Avonlea, junto a la aldea.  
**11:27** Ana dice: «¡Buenos días!»  
**11:28** La Srta. Josephine Barry dice: «¡Qué gusto verle, Ana!»  
**11:28** Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»  
**11:29** La Srta. Josephine Barry dice: «Nunca lo había pensado así.»  
**11:30** _· Ana: Avonlea, junto a la aldea · de pie_  
**11:30** _· el buhonero: Avonlea, junto al faro · de pie_  
**11:30** En el cruce de caminos, la gente se saluda de carreta a carreta. Un perro duerme al sol frente a la tienda.  
**11:30** Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»  
**11:31** Ana dice: «Aquí todos saben todo de todos. Al principio me daba miedo; ahora me gusta. Es como vivir dentro de una familia muy grande y un poco metida.»  
**11:31** La Srta. Josephine Barry dice: «Tiempo tienes para decidirlo.»  
**11:32** El buhonero está en Avonlea, junto a la escuela.  
**11:32** Ana dice: «Bueno, me voy, que tengo que teñirme el pelo.»  
**11:33** El médico dice: «¿Alguien enfermo en Tejas Verdes? Espero que no.»  
**11:35** _· Ana: Avonlea, junto a la aldea · caminando_  
**11:35** _· el buhonero: Avonlea, junto a la escuela · de pie_  
**11:38** Ana está en Avonlea, no lejos de la casa de Robert Bell.  
**11:38** Ana dice: «¿Qué pensarán los animales de nosotros?»  
**11:40** _· Ana: Avonlea, no lejos de la casa de Robert Bell · de pie_  
**11:40** _· el buhonero: Avonlea, junto a la escuela · de pie_  
**11:45** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**11:45** _· el buhonero: Avonlea, junto a la escuela · de pie_  
**11:50** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**11:50** _· el buhonero: Avonlea, junto a la escuela · de pie_  
**11:54** Jerry Buote dice: «El Sr. Cuthbert me pidió que entrara la leña antes de la cena.»  
**11:54** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**11:55** _· Ana: la cocina de Tejas Verdes, junto a la puerta · caminando_  
**11:55** _· el buhonero: Avonlea, junto a la escuela · de pie_  
**11:55** Marilla dice: «Los Barry tienen una niña de tu edad, Diana. Si me lo pidieras, quizás un día te llevaría a conocerla.»  
**11:55** Ana entra a la pieza de Ana.  
**11:56** Ana está en la pieza de Ana, junto al escritorio; empieza a teñirse el pelo.  
**11:57** Ana sigue, con el frasco de tinte.  
**11:57** Ana dice: «¡Negro azabache como el ala de un cuervo! Ya verán…»  
**11:57** Ana está en la pieza de Ana, junto al lavatorio y su espejo.  
**12:00** _· Ana: la pieza de Ana, junto al lavatorio y su espejo · de pie · teñirse el pelo · con el frasco de tinte_  
**12:00** _· el buhonero: Avonlea, junto a la escuela · de pie_  
**12:05** _· Ana: la pieza de Ana, junto al lavatorio y su espejo · de pie · teñirse el pelo · con el frasco de tinte_  
**12:05** _· el buhonero: Avonlea, junto a la escuela · de pie_  
**12:10** _· Ana: la pieza de Ana, junto al lavatorio y su espejo · de pie · teñirse el pelo · con el frasco de tinte_  
**12:10** _· el buhonero: Avonlea, junto a la escuela · de pie_  
**12:12** Ana termina de teñirse el pelo; ahora tiene 4 huevos; tiene el pelo verde.  
**12:12** Ana dice: «Ya está… a ver… ¡¿VERDE?! ¡Mi pelo está VERDE!»  
**12:13** Ana entra a la cocina de Tejas Verdes, junto a la escalera.  
**12:13** Marilla dice: «Ana, a la mesa. La comida no se va a quedar esperando a que termines de imaginar.»  

</details>

## Vender la vaca (meta 0: cumplida)

**Lo que debería pasar:** Ana va al granero y descuelga la cuerda de su gancho. Le pone la cuerda a la vaca y la lleva, despacio, hasta quien la compra. Hacen el trato y Ana se queda con el dinero.

- ✔ Toma la cuerda en el granero (el gallinero está al lado). — 09:02, 5 min
- ✔ Lleva a la vaca de la cuerda. — 09:08, 24 min
- ✔ Vuelve con el dinero de la venta. — 09:32, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (24 líneas)</summary>

**09:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**09:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**09:01** Matthew dice: «Las vacas andan contentas hoy. Será por el sol, supongo.»  
**09:02** Ana está en Avonlea, junto al granero; empieza a tomar una cuerda.  
**09:02** Ana sigue, con la cuerda.  
**09:03** Del granero sale olor a heno recién cortado. Una golondrina entra y sale por la ventanita del pajar.  
**09:04** Ana dice: «El heno huele a todo el verano junto, guardado. En invierno voy a venir a olerlo cuando extrañe el sol.»  
**09:05** _· Ana: Avonlea, junto al granero · de pie · tomar una cuerda · con la cuerda_  
**09:07** Ana termina de tomar una cuerda; ahora tiene una cuerda.  
**09:08** Ana lleva de la cuerda a Dolly.  
**09:08** Ana está en Avonlea, junto a la entrada del corral de Tejas Verdes.  
**09:10** _· Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · caminando_  
**09:15** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**09:20** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**09:25** _· Ana: Avonlea, no lejos de la casa de Robert Bell · caminando_  
**09:26** Una vecina dice: «¡Buenos días, Ana! ¿Cómo están Matthew y Marilla?»  
**09:30** _· Ana: Avonlea, no lejos de la aldea · caminando_  
**09:31** El Sr. Shearer dice: «Ando apurado: me esperan en Carmody.»  
**09:31** Ana dice: «¿Le interesaría comprar esta vaca? Es buena lechera.»  
**09:31** Ana está en Avonlea, junto a la aldea.  
**09:31** El Sr. Shearer dice: «Déjeme verla bien… los dientes, las patas… Sí, me conviene.»  
**09:32** Ana ahora tiene una cuerda, 20 dólares; suelta la cuerda.  
**09:32** El Sr. Shearer dice: «¡Trato hecho! Buena vaca.»  
**09:33** Ana dice: «Hay tanto por hacer y tan poco tiempo... ¡y yo con tantas ideas!»  

</details>

## Una cinta para el pelo (trueque) (meta 1: cumplida)

**Lo que debería pasar:** Ana quiere una cinta y no tiene dinero. Va a los arbustos, se agacha y junta bayas en su canastito. Las lleva a la tienda de Lawson y las cambia por una cinta.

- ✔ Se agacha a juntar bayas. — 09:01, 6 min
- ✔ Tiene las bayas. — 09:07, 51 min
- ✔ Va a la tienda de Lawson. — 09:56, 2 min
- ✔ Tiene la cinta. — 09:58, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (51 líneas)</summary>

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
**09:14** Matthew dice: «Bueno, pues… a Marilla le gustan las cosas hechas a mano, ¿sabes? No lo dice, pero le gustan.»  
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
**09:37** Ana está en Avonlea, no lejos de la casa de Robert Bell.  
**09:37** Ana dice: «¿Qué pensarán los animales de nosotros?»  
**09:40** _· Ana: Avonlea, no lejos de la casa de Robert Bell · de pie_  
**09:41** Una vecina dice: «Mira qué cielo. Así da gusto salir.»  
**09:45** _· Ana: Avonlea, no lejos de la aldea · caminando_  
**09:45** Ana está en Avonlea, junto a la aldea.  
**09:45** Ana dice: «¡Buenos días, Moody Spurgeon!»  
**09:46** Moody Spurgeon dice: «¡Hola, Ana! ¿A dónde vas?»  
**09:47** Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»  
**09:48** Moody Spurgeon dice: «¿De verdad? ¡Cuéntame más!»  
**09:49** Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»  
**09:50** _· Ana: Avonlea, junto a la aldea · de pie_  
**09:50** Moody Spurgeon dice: «¡Qué cosas dices, Ana!»  
**09:50** Ana dice: «¿Sabías que los abedules parecen señoras de vestido blanco?»  
**09:51** Moody Spurgeon dice: «¡Qué cosas dices, Ana!»  
**09:52** Ana dice: «Bueno, me voy, que tengo que cambiar 9 bayas por una cinta para el pelo.»  
**09:53** El Sr. Phillips dice: «Mañana hay examen de geometría. Que nadie lo olvide.»  
**09:55** _· Ana: Avonlea, junto a la aldea · caminando_  
**09:56** Ana entra a la tienda de Lawson.  
**09:56** Ana dice: «Buenos días, Sr. Lawson. ¿Me cambiaría 9 bayas por una cinta para el pelo?»  
**09:57** El Sr. Lawson dice: «Veamos lo que traes… Sí, me sirven. Un momento.»  
**09:58** Ana ahora tiene una cinta para el pelo.  
**09:58** El Sr. Lawson dice: «Trato hecho. ¡Que lo disfrutes!»  
**09:58** Ana sale.  
**09:58** La Sra. Spencer dice: «¡Ana! Qué bien te ves. Y yo que creí que los Cuthbert querían una niña… ¡qué enredo!»  
**10:00** _· Ana: Avonlea · de pie_  

</details>

## Un regalo para Marilla (meta 2: cumplida)

**Lo que debería pasar:** Ana quiere regalarle algo a Marilla. Va a la huerta, se agacha y corta un ramo de flores. Entra a la cocina y se lo da a Marilla, que lo recibe.

- ✔ Corta flores en la huerta, agachada. — 10:01, 6 min
- ✔ Tiene el ramo. — 10:07, 2 min
- ✔ Se lo da a Marilla en la cocina. — 10:08, 0 min
- ✔ Marilla tiene el ramo. — 10:08, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (22 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**10:00** Marilla se levanta.  
**10:01** Ana está en Avonlea, junto a la huerta de Tejas Verdes; empieza a recoger un ramo de flores.  
**10:01** Ana se agacha; con el canastito.  
**10:01** En la tierra oscura asoman unos brotes verdes, tan chiquitos que casi no se ven.  
**10:03** Ana dice: «¡Salieron! Toda la noche estuvieron empujando para arriba, sin que nadie las viera. Eso sí que es fe.»  
**10:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · agachada · recoger un ramo de flores · con el canastito_  
**10:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:07** Ana se levanta; termina de recoger un ramo de flores; ahora tiene un ramo de flores.  
**10:08** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:08** Marilla dice: «Riega la huerta antes de que caiga el sol, que las plantas lo agradecen.»  
**10:08** Ana empieza a darle un ramo de flores a Marilla; con lo que entrega.  
**10:08** Ana termina de darle un ramo de flores a Marilla; ya no tiene nada.  
**10:08** Marilla ahora tiene un ramo de flores.  
**10:08** Marilla dice: «¡Qué lindo detalle! Muchas gracias.»  
**10:09** Ana dice: «Mi imaginación no me deja quieta.»  
**10:10** _· Ana: la cocina de Tejas Verdes, junto a la puerta · caminando_  
**10:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:10** Ana sale, junto a Tejas Verdes.  

</details>

## Matthew trae azúcar (meta 6: cumplida)

**Lo que debería pasar:** A Marilla le falta azúcar y se la pide a Matthew. Matthew va a la tienda de Lawson y la compra. Vuelve a la cocina y se la da.

- ✔ Matthew va a la tienda. — 10:22, 2 min
- ✔ Compra el azúcar. — 10:24, 24 min
- ✔ Se la da a Marilla en la cocina. — 10:48, 0 min
- ✔ Marilla tiene el azúcar. — 10:48, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (40 líneas)</summary>

**10:00** Al empezar, Matthew está en Avonlea, junto al granero; ahora tiene 5 dólares.  
**10:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**10:00** _· Matthew: Avonlea, junto al granero · caminando_  
**10:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**10:00** Marilla se levanta.  
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
**10:25** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:30** _· Matthew: Avonlea · caminando_  
**10:30** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:31** Matthew dice: «Ejem... tranquila, tranquila.»  
**10:35** _· Matthew: Avonlea · caminando_  
**10:35** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:39** Marilla dice: «Rachel Lynde dice que todavía no la has ido a ver. Es mejor ir que dar que hablar.»  
**10:40** _· Matthew: Avonlea · caminando_  
**10:40** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:42** Marilla está en la cocina de Tejas Verdes, junto al fregadero.  
**10:45** _· Matthew: Avonlea · caminando_  
**10:45** _· Marilla: la cocina de Tejas Verdes · caminando_  
**10:47** Matthew entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:48** Matthew empieza a darle una taza de azúcar a Marilla; con lo que entrega.  
**10:48** Matthew termina de darle una taza de azúcar a Marilla; ahora tiene 5 dólares.  
**10:48** Marilla ahora tiene una taza de azúcar.  
**10:48** Marilla dice: «Gracias.»  
**10:48** Matthew sale, junto a Tejas Verdes.  
**10:50** _· Matthew: Avonlea, junto a Tejas Verdes · de pie_  
**10:50** _· Marilla: la cocina de Tejas Verdes · de pie_  

</details>

## El té con la Sra. Allan (meta 14: cumplida)

**Lo que debería pasar:** La Sra. Allan invita a Ana a tomar el té. Prepara el té en su casa. Ana llega y se sientan juntas a la mesa, con las tazas, a conversar sin apuro, una media hora.

- ✔ La Sra. Allan prepara el té. — 16:21, 30 min
- ✔ Ana toma el té sentada a la mesita, en la salita de la casa parroquial, una media hora. — 17:21, 30 min
- ✔ La Sra. Allan se sienta con ella a la mesita, con su taza, una media hora. — 17:21, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (130 líneas)</summary>

**15:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**15:00** Al empezar, la Sra. Allan está en Avonlea, junto a la iglesia.  
**15:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**15:00** _· la Sra. Allan: Avonlea, junto a la iglesia · caminando_  
**15:01** Ana se sienta.  
**15:02** Ana dice: «¡Qué día para hacer algo bonito!»  
**15:05** _· Ana: Avonlea, junto a Tejas Verdes · sentada_  
**15:05** _· la Sra. Allan: Avonlea, no lejos de la casa de Robert Bell · caminando_  
**15:05** Ana dice: «¡Matthew! Mire estas violetas. Las encontré a la orilla del camino. ¿No le parecen como pedacitos de cielo que se cayeron?»  
**15:07** Matthew dice: «Bueno, pues… sí. Ahora que lo dices, sí.»  
**15:07** La Sra. Allan está en Avonlea, junto al salón del pueblo.  
**15:07** La Sra. Allan dice: «¡Buenas tardes!»  
**15:07** Ana dice: «Usted siempre me entiende. Es tan agradable hablar con alguien que entiende.»  
**15:08** Una señora de la aldea dice: «¡Buenas tardes! ¿Cómo están todos en casa?»  
**15:08** La Sra. Allan dice: «¿Supo lo de los Cuthbert? ¡Pidieron un niño al orfanato y les llegó una niña! Pelirroja, dicen.»  
**15:09** Matthew dice: «(Matthew se pone colorado hasta las orejas, pero sonríe.)»  
**15:10** _· Ana: Avonlea, junto a Tejas Verdes · sentada_  
**15:10** _· la Sra. Allan: Avonlea, junto al salón del pueblo · de pie_  
**15:10** Ana se levanta.  
**15:10** Una señora de la aldea dice: «Eso ya lo sabía, Rachel.»  
**15:11** La Sra. Allan dice: «¿Cómo vienen las papas este año?»  
**15:11** Una señora de la aldea dice: «Buenas, si no llueve demasiado.»  
**15:12** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**15:12** La Sra. Allan dice: «Bueno, me voy, que tengo que pedirle a Ana que venga a tomar el té más tarde.»  
**15:15** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**15:15** _· la Sra. Allan: Avonlea, junto al salón del pueblo · caminando_  
**15:17** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**15:18** (Narración) Los manzanos del Camino Blanco florecieron todos juntos, en una sola noche.  
**15:18** Ana se detiene en seco. Sobre ella, la bóveda de flores es tan blanca que parece hecha de luz. Ya no se acuerda de adónde iba.  
**15:20** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie_  
**15:20** _· la Sra. Allan: Avonlea, no lejos de la aldea · caminando_  
**15:20** Ana se sienta.  
**15:20** No dice nada. Por una vez, Ana Shirley no dice nada.  
**15:21** Ana piensa: «…Es como la primera vez. No: es mejor que la primera vez, porque ahora es mío. Ahora vuelvo a casa por aquí.»  
**15:23** Ana se levanta.  
**15:25** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**15:25** _· la Sra. Allan: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**15:26** Ana está en Avonlea, junto al Bosque Encantado.  
**15:30** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**15:30** _· la Sra. Allan: Avonlea, no lejos del Lago de las Aguas Brillantes · caminando_  
**15:31** Ana está en Avonlea, junto al puente del arroyo.  
**15:32** La Sra. Allan dice: «¡Ana! ¡Espera!»  
**15:35** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**15:35** _· la Sra. Allan: Avonlea, junto al puente del arroyo · caminando_  
**15:36** Ana está en Avonlea, no lejos del puente del arroyo.  
**15:36** La Sra. Allan dice: «¡Ana, querida! ¡Qué gusto verte! ¿Cómo van tus estudios?»  
**15:37** La Sra. Allan está en Avonlea, no lejos del puente del arroyo.  
**15:37** La Sra. Allan está en Avonlea, no lejos del huerto de los Barry.  
**15:37** La Sra. Allan dice: «¿Vendrías a tomar el té conmigo esta tarde, a las 18:00? En la casa parroquial.»  
**15:37** Ana está en Avonlea, no lejos del huerto de los Barry.  
**15:37** Ana dice: «¡Oh, Sra. Allan! Usted es mi espíritu afín.»  
**15:38** Ana dice: «¡Sí, me encantaría! Allí estaré.»  
**15:40** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**15:40** _· la Sra. Allan: Avonlea, junto al puente del arroyo · caminando_  
**15:45** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**15:45** _· la Sra. Allan: Avonlea, no lejos del puente del arroyo · caminando_  
**15:50** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**15:50** _· la Sra. Allan: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**15:55** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**15:55** _· la Sra. Allan: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**16:00** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**16:00** _· la Sra. Allan: Avonlea, junto a la aldea · caminando_  
**16:00** La Sra. Allan está en Avonlea, junto a la aldea.  
**16:00** La Sra. Allan dice: «¡Buenas tardes!»  
**16:01** El Sr. Phillips dice: «¡Buenas tardes! ¿Cómo están todos en casa?»  
**16:02** La Sra. Allan dice: «¿Supo lo de los Cuthbert? ¡Pidieron un niño al orfanato y les llegó una niña! Pelirroja, dicen.»  
**16:03** El Sr. Phillips dice: «Eso ya lo sabía, Rachel.»  
**16:04** La Sra. Allan dice: «¡Buenas tardes! ¿Ya supo lo de la vaca de los Cuthbert?»  
**16:05** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**16:05** _· la Sra. Allan: Avonlea, junto a la aldea · de pie_  
**16:05** El Sr. Phillips dice: «¡Si lo sabe todo Avonlea! Esa vaca es más lista que el Sr. Harrison.»  
**16:06** La Sra. Allan dice: «Bueno, me voy, que tengo que preparar el té.»  
**16:10** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**16:10** _· la Sra. Allan: Avonlea, junto al salón del pueblo · caminando_  
**16:15** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**16:15** _· la Sra. Allan: Avonlea, no lejos de la colina · caminando_  
**16:20** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**16:20** _· la Sra. Allan: Avonlea, junto a la iglesia · caminando_  
**16:20** La Sra. Allan entra a la salita de la casa parroquial, junto a la puerta.  
**16:21** La Sra. Allan empieza a preparar el té; con el bol.  
**16:25** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**16:25** _· la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol_  
**16:30** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**16:30** _· la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol_  
**16:35** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**16:35** _· la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol_  
**16:40** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**16:40** _· la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol_  
**16:45** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**16:45** _· la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol_  
**16:50** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**16:50** _· la Sra. Allan: la salita de la casa parroquial · de pie · preparar el té · con el bol_  
**16:51** La Sra. Allan termina de preparar el té; ahora tiene una taza de té.  
**16:55** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**16:55** _· la Sra. Allan: la salita de la casa parroquial · de pie_  
**17:00** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**17:00** _· la Sra. Allan: la salita de la casa parroquial · de pie_  
**17:05** _· Ana: Avonlea, no lejos del Camino Blanco de las Delicias · caminando_  
**17:05** _· la Sra. Allan: la salita de la casa parroquial · de pie_  
**17:10** _· Ana: Avonlea, no lejos de la casa de Robert Bell · caminando_  
**17:10** _· la Sra. Allan: la salita de la casa parroquial · de pie_  
**17:12** Gertie Pye dice: «Dicen que en el Bosque Encantado hay fantasmas.»  
**17:13** Prissy Andrews dice: «Eso lo inventó Ana Shirley. ¡Pero igual no voy!»  
**17:15** _· Ana: Avonlea, junto al salón del pueblo · caminando_  
**17:15** _· la Sra. Allan: la salita de la casa parroquial · de pie_  
**17:20** _· Ana: Avonlea, junto a la iglesia · caminando_  
**17:20** _· la Sra. Allan: la salita de la casa parroquial · de pie_  
**17:20** Ana entra a la salita de la casa parroquial, junto a la puerta.  
**17:20** Ana está en la salita de la casa parroquial, junto a la mesita del té; se sienta.  
**17:21** Ana empieza a tomar el té con la Sra. Allan; con el té.  
**17:21** La Sra. Allan está en la salita de la casa parroquial, junto a la mesita del té; se sienta; empieza a tomar el té con Ana; con el té.  
**17:21** La Sra. Allan dice: «¿Un poco más de té? Y prueba estas galletas.»  
**17:24** Ana dice: «¡Están deliciosas! Es como estar en un libro.»  
**17:25** _· Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té_  
**17:25** _· la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té_  
**17:27** La Sra. Allan dice: «Cuéntame qué estás leyendo ahora.»  
**17:30** _· Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té_  
**17:30** _· la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té_  
**17:30** Ana dice: «Una novela con un castillo y una dama muy triste… ¡me encanta!»  
**17:35** _· Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té_  
**17:35** _· la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té_  
**17:40** _· Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té_  
**17:40** _· la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té_  
**17:45** _· Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té_  
**17:45** _· la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té_  
**17:50** _· Ana: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con la Sra. Allan · con el té_  
**17:50** _· la Sra. Allan: la salita de la casa parroquial, junto a la mesita del té · sentada · tomar el té con Ana · con el té_  
**17:50** La Sra. Allan se levanta; termina de tomar el té con Ana.  
**17:51** Ana se levanta; termina de tomar el té con la Sra. Allan.  
**17:51** La Sra. Allan sale, junto a la casa parroquial.  

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

- ✔ Ana le da la compota. — 11:29, 0 min
- ✔ La Sra. Barry tiene la compota. — 11:31, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (95 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** Al empezar, la Sra. Barry está en la salita de La Cuesta del Huerto.  
**10:00** Al empezar, Diana está en la salita de La Cuesta del Huerto; ahora tiene un libro.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** _· la Sra. Barry: la salita de La Cuesta del Huerto · caminando_  
**10:00** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**10:00** La Sra. Barry sale.  
**10:00** Diana sale.  
**10:00** La Sra. Barry dice: «¿Me traerías una compota de manzana?»  
**10:00** Diana dice: «Sí, cómo no. Ahora mismo.»  
**10:01** Ana se sienta.  
**10:02** Ana se levanta.  
**10:03** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:03** Marilla dice: «Hmm. Bueno, admito que hoy te has portado muy bien.»  
**10:05** _· Ana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:05** _· la Sra. Barry: Avonlea · de pie_  
**10:05** _· Diana: Avonlea · caminando_  
**10:10** _· Ana: la cocina de Tejas Verdes · de pie_  
**10:10** _· la Sra. Barry: Avonlea · de pie_  
**10:10** _· Diana: Avonlea · caminando_  
**10:12** Diana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:12** Diana dice: «¿Me traerías una compota de manzana?»  
**10:12** Ana sale, junto a Tejas Verdes.  
**10:13** Ana dice: «Sí, cómo no. Ahora mismo.»  
**10:13** Diana sale, junto a Tejas Verdes.  
**10:15** _· Ana: Avonlea, no lejos de la huerta de Tejas Verdes · caminando_  
**10:15** _· la Sra. Barry: Avonlea · de pie_  
**10:15** _· Diana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**10:20** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**10:20** _· la Sra. Barry: Avonlea · de pie_  
**10:20** _· Diana: Avonlea, no lejos del Bosque Encantado · caminando_  
**10:24** Ana está en Avonlea, junto al huerto de los Barry; empieza a recoger 3 manzanas.  
**10:24** Ana sigue, con el canastito.  
**10:25** _· Ana: Avonlea, junto al huerto de los Barry · de pie · recoger 3 manzanas · con el canastito_  
**10:25** _· la Sra. Barry: Avonlea · de pie_  
**10:25** _· Diana: Avonlea, junto al huerto de los Barry · caminando_  
**10:26** Diana está en Avonlea, junto a La Cuesta del Huerto.  
**10:30** _· Ana: Avonlea, junto al huerto de los Barry · caminando · recoger 3 manzanas_  
**10:30** _· la Sra. Barry: Avonlea · de pie_  
**10:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**10:30** Ana sigue, con el canastito.  
**10:35** _· Ana: Avonlea, junto al huerto de los Barry · de pie · recoger 3 manzanas · con el canastito_  
**10:35** _· la Sra. Barry: Avonlea · de pie_  
**10:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**10:35** Ana termina de recoger 3 manzanas; ahora tiene 3 manzanas.  
**10:35** Minnie May Barry dice: «¡Ana! ¿Me cuentas el cuento del hada otra vez?»  
**10:40** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**10:40** _· la Sra. Barry: Avonlea · de pie_  
**10:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**10:45** _· Ana: Avonlea, no lejos de la huerta de Tejas Verdes · caminando_  
**10:45** _· la Sra. Barry: Avonlea · de pie_  
**10:45** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**10:47** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:47** Ana empieza a cocinar una compota de manzana.  
**10:47** Ana sigue, con el bol.  
**10:47** Ana está en la cocina de Tejas Verdes, junto a la estufa.  
**10:50** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**10:50** _· la Sra. Barry: Avonlea · de pie_  
**10:50** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**10:55** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**10:55** _· la Sra. Barry: Avonlea · de pie_  
**10:55** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:00** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**11:00** _· la Sra. Barry: Avonlea · de pie_  
**11:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:05** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**11:05** _· la Sra. Barry: Avonlea · de pie_  
**11:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:10** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**11:10** _· la Sra. Barry: Avonlea · de pie_  
**11:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:15** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · cocinar una compota de manzana · con el bol_  
**11:15** _· la Sra. Barry: Avonlea · de pie_  
**11:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:17** Ana termina de cocinar una compota de manzana; ahora tiene una compota de manzana.  
**11:17** Ana sale, junto a Tejas Verdes.  
**11:20** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**11:20** _· la Sra. Barry: Avonlea · de pie_  
**11:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:25** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**11:25** _· la Sra. Barry: Avonlea · de pie_  
**11:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:28** Minnie May Barry dice: «¿Me da una manzana? Solo una.»  
**11:29** Mary Joe dice: «Toma, pero no le digas a nadie.»  
**11:29** Ana va por Avonlea, junto a La Cuesta del Huerto; empieza a darle una compota de manzana a Diana; con lo que entrega.  
**11:30** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie · darle una compota de manzana a Diana · con lo que entrega_  
**11:30** _· la Sra. Barry: Avonlea · de pie_  
**11:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:30** Ana termina de darle una compota de manzana a Diana; ya no tiene nada.  
**11:30** Diana ahora tiene un libro, una compota de manzana.  
**11:30** Diana dice: «¡Qué lindo detalle! Muchas gracias.»  
**11:30** Diana empieza a darle una compota de manzana a la Sra. Barry; con lo que entrega.  
**11:31** La Sra. Barry ahora tiene una compota de manzana.  
**11:31** La Sra. Barry dice: «Gracias.»  
**11:31** Diana termina de darle una compota de manzana a la Sra. Barry; ahora tiene un libro.  

</details>

## Ordeñar y llevar la leche (meta 27: cumplida)

**Lo que debería pasar:** Matthew va al corral, se sienta en el banquito junto a la vaca y la ordeña en el balde, sin apuro, un cuarto de hora. Lleva la leche a la cocina y se la da a Marilla.

- ✔ Ordeña sentado junto a la vaca, con el balde, un cuarto de hora. — 09:03, 15 min
- ✔ Tiene la leche. — 09:18, 2 min
- ✔ Se la da a Marilla en la cocina. — 09:20, 0 min
- ✔ Marilla tiene la leche. — 09:20, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (24 líneas)</summary>

**09:00** Al empezar, Matthew está en Avonlea, junto al granero; ahora tiene 5 dólares.  
**09:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**09:00** _· Matthew: Avonlea, junto al granero · caminando_  
**09:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**09:00** Marilla se levanta.  
**09:01** Matthew está en Avonlea, junto a la entrada del corral de Tejas Verdes.  
**09:01** Matthew empieza a ordeñar a Dolly.  
**09:01** Matthew dice: «Tranquila, Dolly… ya está, ya está.»  
**09:03** Matthew se sienta; con el balde.  
**09:05** _· Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · sentado · ordeñar a Dolly · con el balde_  
**09:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**09:10** _· Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · sentado · ordeñar a Dolly · con el balde_  
**09:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**09:15** _· Matthew: Avonlea, junto a la entrada del corral de Tejas Verdes · sentado · ordeñar a Dolly · con el balde_  
**09:15** _· Marilla: la cocina de Tejas Verdes · de pie_  
**09:18** Matthew se levanta; termina de ordeñar a Dolly; ahora tiene 5 dólares, 2 jarros de leche.  
**09:19** Matthew entra a la cocina de Tejas Verdes, junto a la puerta.  
**09:20** _· Matthew: la cocina de Tejas Verdes, junto a la puerta · caminando_  
**09:20** _· Marilla: la cocina de Tejas Verdes · de pie_  
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
**08:21** Matthew entra a la cocina de Tejas Verdes, junto a la puerta.  
**08:21** Matthew se sienta.  

</details>

## Visita a la Sra. Lynde (meta 29: cumplida)

**Lo que debería pasar:** Ana va a la casa de la Sra. Lynde. Se sienta con ella y conversan con una taza de té, una media hora.

- ✔ Llega a la casa de la Sra. Lynde. — 15:10, 31 min
- ✔ Se sienta a tomar el té y conversar, una media hora. — 15:11, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (31 líneas)</summary>

**15:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**15:00** Al empezar, la Sra. Lynde está en la casa de la Sra. Lynde.  
**15:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**15:00** _· la Sra. Lynde: la casa de la Sra. Lynde · caminando_  
**15:00** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**15:05** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**15:05** _· la Sra. Lynde: la casa de la Sra. Lynde · caminando_  
**15:10** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**15:10** _· la Sra. Lynde: la casa de la Sra. Lynde · caminando_  
**15:10** Ana entra a la casa de la Sra. Lynde.  
**15:10** La Sra. Lynde dice: «Desde mi ventana veo todo el camino: no se me escapa nadie. Lo digo sin mala intención, ¿eh?»  
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
**15:41** La Sra. Lynde entra a la cocina de Tejas Verdes.  

</details>

## Devolverle el libro a Diana (meta 31: cumplida)

**Lo que debería pasar:** Ana lleva el libro que le prestaron a la casa de Diana y se lo devuelve en sus manos.

- ✔ Le devuelve el libro a Diana. — 12:30, 1 min
- ✔ Ya no tiene el libro. — 12:30, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (42 líneas)</summary>

**12:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes; ahora tiene un libro.  
**12:00** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto.  
**12:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**12:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**12:00** (Narración) Desde la puerta de la cocina, Marilla se seca las manos en el delantal y llama: «¡Ana! ¡A la mesa!»  
**12:00** Ana elige: «Entrar a almorzar con los Cuthbert».  
**12:00** Ana entra a la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta.  
**12:00** Ana dice: «¡Voy, Marilla! Huele a papas con mantequilla.»  
**12:00** Ana dice: «Marilla, ¿no te parece que el pan sabe distinto cuando una está feliz?»  
**12:01** Ana sale, junto a Tejas Verdes; se levanta.  
**12:01** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**12:03** Jerry Buote dice: «Oui, oui... ya voy, ya voy. ¡Esa vaca no se quiere mover!»  
**12:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**12:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**12:08** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**12:08** (Narración) Los manzanos del Camino Blanco florecieron todos juntos, en una sola noche.  
**12:08** Ana se detiene en seco. Sobre ella, la bóveda de flores es tan blanca que parece hecha de luz. Ya no se acuerda de adónde iba.  
**12:10** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie_  
**12:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**12:10** No dice nada. Por una vez, Ana Shirley no dice nada.  
**12:11** Ana piensa: «…Es como la primera vez. No: es mejor que la primera vez, porque ahora es mío. Ahora vuelvo a casa por aquí.»  
**12:13** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**12:15** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie_  
**12:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**12:20** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**12:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**12:25** _· Ana: Avonlea, no lejos del huerto de los Barry · caminando_  
**12:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**12:25** Ana dice: «¡Diana! ¡Espera!»  
**12:25** Diana dice: «¿Me llamabas?»  
**12:25** Ana está en Avonlea, junto al huerto de los Barry.  
**12:28** Minnie May Barry dice: «¿Me da una manzana? Solo una.»  
**12:28** Mary Joe dice: «Toma, pero no le digas a nadie.»  
**12:30** _· Ana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**12:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**12:30** Ana está en Avonlea, junto a La Cuesta del Huerto; empieza a devolverle un libro a Diana; con lo que entrega.  
**12:30** Ana dice: «Aquí tienes tu libro. ¡Me encantó! Lo leí dos veces.»  
**12:30** Ana termina de devolverle un libro a Diana; ya no tiene nada.  
**12:30** Diana ahora tiene un libro.  
**12:30** Diana dice: «¡Qué bueno que te gustó! Te presto otro cuando quieras.»  
**12:30** Minnie May Barry dice: «Diana no me deja jugar con sus muñecas. ¿Tú me dejas?»  
**12:32** Ana se sienta.  

</details>

## Amigas del alma (meta 32: cumplida)

**Lo que debería pasar:** Ana y Diana, en el jardín de los Barry, se ponen frente a frente, se toman de las manos y juran ser amigas del alma para siempre.

- ✔ Ana jura tomada de las manos. — 11:30, 3 min
- ✔ Diana está con ella, en el jardín de los Barry. — 11:33, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (37 líneas)</summary>

**11:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**11:00** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.  
**11:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**11:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**11:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:08** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**11:08** (Narración) Los manzanos del Camino Blanco florecieron todos juntos, en una sola noche.  
**11:08** Ana se detiene en seco. Sobre ella, la bóveda de flores es tan blanca que parece hecha de luz. Ya no se acuerda de adónde iba.  
**11:10** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie_  
**11:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**11:10** No dice nada. Por una vez, Ana Shirley no dice nada.  
**11:11** Ana piensa: «…Es como la primera vez. No: es mejor que la primera vez, porque ahora es mío. Ahora vuelvo a casa por aquí.»  
**11:12** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**11:15** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie_  
**11:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:20** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**11:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**11:24** Ana está en Avonlea, no lejos del huerto de los Barry.  
**11:24** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**11:25** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**11:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:27** Ana dice: «¡Diana! ¡Espera!»  
**11:28** Diana dice: «¿Qué pasa?»  
**11:28** Minnie May Barry dice: «¿Me da una manzana? Solo una.»  
**11:29** Mary Joe dice: «Toma, pero no le digas a nadie.»  
**11:29** Ana va por Avonlea, junto a La Cuesta del Huerto; empieza a jurar ser amigas del alma con Diana.  
**11:29** Ana dice: «Juro solemnemente ser fiel a mi amiga del alma, Diana, mientras duren el sol y la luna.»  
**11:30** _· Ana: Avonlea, junto a La Cuesta del Huerto · caminando · jurar ser amigas del alma con Diana_  
**11:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:30** Ana sigue, con las manos.  
**11:33** Ana termina de jurar ser amigas del alma con Diana.  
**11:33** Diana dice: «Juro ser fiel a mi amiga del alma, Ana, mientras duren el sol y la luna.»  
**11:33** Ana se sienta.  
**11:33** Ana se levanta.  
**11:35** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  

</details>

## Cuidar al Sr. Harrison (meta 34: cumplida)

**Lo que debería pasar:** El Sr. Harrison está enfermo, en cama. Ana saca el jarabe de ipecacuana del aparador de la cocina, va a su casa y, junto a la cama, se lo da a cucharadas.

- ✔ El Sr. Harrison está en cama. — 11:00, 19 min
- ✔ Saca el jarabe del aparador. — 11:01, 1 min
- ✔ Tiene el jarabe. — 11:02, 17 min
- ✔ Se lo da en su casa. — 11:09, 10 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (27 líneas)</summary>

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
**11:05** _· Ana: Avonlea, junto a los arbustos de bayas · caminando_  
**11:05** _· el Sr. Harrison: la casa del Sr. Harrison · acostado, en cama_  
**11:08** Ana entra a la casa del Sr. Harrison.  
**11:09** El Sr. Harrison dice: «No me siento nada bien, niña.»  
**11:09** Ana empieza a cuidar al Sr. Harrison; con el jarabe.  
**11:09** Ana dice: «Una cucharadita de jarabe de ipecacuana… y otra más. Ya va a pasar.»  
**11:10** _· Ana: la casa del Sr. Harrison · de pie · cuidar al Sr. Harrison · con el jarabe_  
**11:10** _· el Sr. Harrison: la casa del Sr. Harrison · acostado, en cama_  
**11:15** _· Ana: la casa del Sr. Harrison · de pie · cuidar al Sr. Harrison · con el jarabe_  
**11:15** _· el Sr. Harrison: la casa del Sr. Harrison · acostado, en cama_  
**11:19** Ana termina de cuidar al Sr. Harrison; ya no tiene nada.  
**11:19** El Sr. Harrison se levanta.  
**11:19** El Sr. Harrison dice: «Ya me siento mucho mejor. Gracias, niña.»  
**11:19** Ana sale.  
**11:19** El Sr. Harrison sale.  
**11:20** _· Ana: Avonlea · caminando_  
**11:20** _· el Sr. Harrison: Avonlea · caminando_  

</details>

## Estudiar y recitar la lección (meta 36: cumplida)

**Lo que debería pasar:** Ana estudia la lección sentada a la mesa, con el libro abierto, un buen rato. En la escuela se pone frente a la clase, junto a la pizarra, y la recita.

- ✔ Estudia sentada con el libro, un buen rato. — 09:01, 40 min
- ✔ Recita frente a la clase. — 09:59, 12 min

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
**09:55** _· Ana: Avonlea, no lejos de la casa de Robert Bell · de pie_  
**09:59** Una granjera dice: «¿Vas para la aldea? Yo vengo de la tienda de Lawson.»  
**09:59** Ana está en Avonlea, junto a la escuela; empieza a recitar la lección.  
**09:59** Ana dice: «Y a lo largo del río, en su barca, iba la doncella de Shalott…»  
**09:59** Ana entra a la escuela de Avonlea.  
**09:59** (Narración) La escuela de Avonlea tiene una sola sala, para todos los niños del pueblo. Gilbert Blythe es el más listo y el más buen mozo, y está acostumbrado a que todas las niñas lo miren. Ana todavía no lo ha mirado.  
**09:59** Gilbert Blythe dice: «(Gilbert Blythe alarga la mano, toma la punta de una trenza de Ana y susurra, lo bastante fuerte para que lo oiga toda la clase.) ¡Zanahorias! ¡Zanahorias!»  
**10:00** _· Ana: la escuela de Avonlea · de pie · recitar la lección_  
**10:01** Ana se pone de pie de un salto, con los ojos echando chispas. Y dice: «¡Odioso, malvado! ¿Cómo te atreves?»  
**10:03** ¡Crac! Ana le parte la pizarra en la cabeza a Gilbert.  
**10:04** Gilbert Blythe dice: «¡Ay! Perdona, Ana… solo era una broma. De verdad, perdóname.»  
**10:05** _· Ana: la escuela de Avonlea · de pie · recitar la lección_  
**10:05** Ana dice: «¡Nunca te lo perdonaré! ¡Nunca jamás!»  
**10:06** Ana sigue, con el gesto de recitar.  
**10:10** _· Ana: la escuela de Avonlea · de pie · recitar la lección · con el gesto de recitar_  
**10:11** Ana termina de recitar la lección.  
**10:12** El Sr. Phillips dice: «Mañana hay examen de geometría. Que nadie lo olvide.»  
**10:12** Ana dice: «Una pizarra para mí. Voy a escribir aquí las palabras más largas y más bonitas que conozca. «Inefable.» «Melancolía.» «Avonlea.»»  

</details>

## Las oraciones (meta 37: cumplida)

**Lo que debería pasar:** Ana sube a su pieza, se arrodilla junto a la cama y dice sus oraciones, unos minutos.

- ✔ Reza de rodillas junto a la cama de su pieza. — 20:02, 5 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (9 líneas)</summary>

**20:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**20:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**20:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**20:00** Ana empieza a decir sus oraciones.  
**20:00** Ana dice: «Querido Padre celestial: gracias por el Camino Blanco de las Delicias y por el Lago de las Aguas Brillantes…»  
**20:02** Ana entra a la pieza de Ana.  
**20:02** Ana está en la pieza de Ana, junto a la cama; se arrodilla; con las manos juntas.  
**20:05** _· Ana: la pieza de Ana, junto a la cama · de rodillas · decir sus oraciones · con las manos juntas_  
**20:07** Ana se levanta; termina de decir sus oraciones.  

</details>

## El vestido de mangas abullonadas (meta 38: cumplida)

**Lo que debería pasar:** Marilla quiere coserle un vestido a Ana. Le traen la tela de la tienda. Marilla se sienta junto a la ventana de la cocina y cose, sin apuro, un buen rato, hasta que el vestido está listo.

- ✔ Marilla tiene la tela. — 10:39, 42 min
- ✔ Cose sentada junto a la ventana, un buen rato. — 10:41, 40 min
- ✔ El vestido está listo. — 11:21, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (76 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** Al empezar, Marilla está en Avonlea, junto a Tejas Verdes.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** _· Marilla: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** Marilla dice: «¿Me traerías un corte de tela?»  
**10:00** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**10:01** Ana dice: «Sí, cómo no. Ahora mismo.»  
**10:01** Marilla entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:05** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**10:05** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:10** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**10:10** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:11** Una vecina dice: «Buenas, buenas. No te entretengas, que se hace tarde.»  
**10:14** Ana está en Avonlea, junto a la aldea.  
**10:14** Ana dice: «¡Buenos días, Janet King!»  
**10:15** _· Ana: Avonlea, junto a la aldea · de pie_  
**10:15** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:15** Janet King dice: «¡Qué gusto verle, Ana!»  
**10:16** Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»  
**10:17** Janet King dice: «¡Qué imaginación tienes, niña!»  
**10:18** Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»  
**10:19** Janet King dice: «Tiempo tienes para decidirlo.»  
**10:19** Ana dice: «Bueno, me voy, que tengo que comprar un corte de tela a la libreta de los Cuthbert.»  
**10:20** _· Ana: Avonlea, junto a la aldea · de pie_  
**10:20** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:21** Una granjera dice: «Buenas, buenas. No te entretengas, que se hace tarde.»  
**10:22** Ana entra a la tienda de Lawson.  
**10:23** Ana dice: «Buenos días, Sr. Lawson. ¿Me daría un corte de tela? A la libreta de los Cuthbert.»  
**10:23** El Sr. Lawson dice: «Cómo no, aquí tengo una. Un momento…»  
**10:24** Ana ahora tiene un corte de tela.  
**10:24** El Sr. Lawson dice: «Anotado en la libreta de los Cuthbert. Saludos a Marilla.»  
**10:24** Ana sale.  
**10:25** _· Ana: Avonlea · caminando_  
**10:25** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:26** El médico dice: «¿Alguien enfermo en Tejas Verdes? Espero que no.»  
**10:30** _· Ana: Avonlea · caminando_  
**10:30** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:35** _· Ana: Avonlea · caminando_  
**10:35** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:39** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:39** Ana empieza a darle un corte de tela a Marilla; con lo que entrega.  
**10:39** Ana termina de darle un corte de tela a Marilla; ya no tiene nada.  
**10:39** Marilla ahora tiene un corte de tela.  
**10:39** Marilla dice: «Gracias.»  
**10:40** _· Ana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:40** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:40** Marilla empieza a coser un vestido con mangas abullonadas.  
**10:40** Marilla dice: «Coso el vestido… y le pongo unas mangas abullonadas, como las que usan ahora.»  
**10:41** Marilla está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta; con la costura.  
**10:45** _· Ana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:45** _· Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura_  
**10:50** _· Ana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**10:50** _· Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura_  
**10:52** Ana dice: «Hoy el mundo huele a recién hecho. Hay que salir a estrenarlo.»  
**10:53** Ana está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta.  
**10:55** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**10:55** _· Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura_  
**11:00** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**11:00** _· Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura_  
**11:00** Ana se levanta.  
**11:05** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · de pie_  
**11:05** _· Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura_  
**11:10** _· Ana: la cocina de Tejas Verdes · caminando_  
**11:10** _· Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura_  
**11:10** Ana sale, junto a Tejas Verdes.  
**11:11** Ana está en Avonlea, junto a la entrada del corral de Tejas Verdes.  
**11:12** Ana dice: «¡Matthew! Mire estas violetas. Las encontré a la orilla del camino. ¿No le parecen como pedacitos de cielo que se cayeron?»  
**11:14** Ana se sienta.  
**11:14** Matthew dice: «Bueno, pues… sí. Ahora que lo dices, sí.»  
**11:15** _· Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · sentada_  
**11:15** _· Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura_  
**11:15** Ana dice: «Usted siempre me entiende. Es tan agradable hablar con alguien que entiende.»  
**11:16** Matthew dice: «(Matthew se pone colorado hasta las orejas, pero sonríe.)»  
**11:20** _· Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · sentada_  
**11:20** _· Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura_  
**11:21** Marilla se levanta; termina de coser un vestido con mangas abullonadas; ahora tiene un vestido con mangas abullonadas.  

</details>

## El sombrero con flores (meta 39: cumplida)

**Lo que debería pasar:** Ana corta flores en la huerta y se adorna el sombrero con ellas, con cuidado, unos minutos.

- ✔ Corta flores. — 10:03, 6 min
- ✔ Se adorna el sombrero. — 10:10, 10 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (19 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**10:03** Ana está en Avonlea, junto a la huerta de Tejas Verdes; empieza a recoger un ramo de flores.  
**10:03** Ana se agacha; con el canastito.  
**10:04** En la tierra oscura asoman unos brotes verdes, tan chiquitos que casi no se ven.  
**10:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · agachada · recoger un ramo de flores · con el canastito_  
**10:05** Ana dice: «¡Salieron! Toda la noche estuvieron empujando para arriba, sin que nadie las viera. Eso sí que es fe.»  
**10:09** Ana se levanta; termina de recoger un ramo de flores; ahora tiene un ramo de flores.  
**10:10** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**10:10** Ana empieza a adornar el sombrero con flores; con el sombrero con flores.  
**10:10** Ana dice: «¡Una corona de ranúnculos y rosas silvestres para mi sombrero!»  
**10:15** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · adornar el sombrero con flores · con el sombrero con flores_  
**10:20** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · adornar el sombrero con flores · con el sombrero con flores_  
**10:20** Ana termina de adornar el sombrero con flores; ya no tiene nada.  
**10:20** Ana se sienta.  
**10:20** Ana dice: «Mi imaginación no me deja quieta.»  
**10:20** Ana se levanta.  
**10:21** Ana está en Avonlea, junto a Tejas Verdes.  

</details>

## Remar en el lago (meta 40: cumplida)

**Lo que debería pasar:** Ana sube al bote en el Lago de las Aguas Brillantes y rema, sentada, sin apuro, un buen rato.

- ✔ Rema sentada en el bote, un buen rato. — 14:16, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (17 líneas)</summary>

**14:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**14:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**14:05** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**14:10** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**14:15** _· Ana: Avonlea, no lejos del Lago de las Aguas Brillantes · caminando_  
**14:15** Gilbert Blythe dice: «¿Quieres que te ayude a cruzar el arroyo? ¿No? Bueno...»  
**14:16** Ana está en Avonlea, junto al Lago de las Aguas Brillantes; se sienta; empieza a remar en el lago; con el bote.  
**14:16** Ana dice: «¡Remo en el bote de los Barry! Hay que tener cuidado de no soltar los remos…»  
**14:20** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote_  
**14:25** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote_  
**14:30** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote_  
**14:35** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote_  
**14:40** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote_  
**14:45** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · remar en el lago · con el bote_  
**14:46** Ana se levanta; termina de remar en el lago.  
**14:46** Ana se sienta.  
**14:47** Gilbert Blythe dice: «¿Quieres que te ayude a cruzar el arroyo? ¿No? Bueno...»  

</details>

## Ponerle nombre a los lugares (meta 41: cumplida)

**Lo que debería pasar:** Ana se detiene en un lugar que le gusta, lo mira y le pone un nombre bonito en voz alta.

- ✔ Se detiene y le pone nombre a un lugar. — 10:04, 2 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (19 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:03** Matthew dice: «Marilla dice que hablas mucho. Bueno, a mí me gusta oírte, ¿sabes?»  
**10:04** Ana empieza a ponerle nombre a los arbustos de bayas; con el gesto de recitar.  
**10:04** Ana dice: «Este lugar se va a llamar el Sendero de los Abedules. ¿No es un nombre precioso?»  
**10:05** _· Ana: Avonlea, junto a Tejas Verdes · de pie · ponerle nombre a los arbustos de bayas · con el gesto de recitar_  
**10:06** Ana termina de ponerle nombre a los arbustos de bayas.  
**10:07** Ana está en Avonlea, junto a la entrada del corral de Tejas Verdes; empieza a ponerle nombre al corral; con el gesto de recitar.  
**10:07** Ana dice: «Este lugar se va a llamar Idlewild. ¿No es un nombre precioso?»  
**10:08** Junto al corral, cuatro abedules forman un rincón, como una salita al aire libre.  
**10:09** Ana dice: «Idlewild. Aquí Diana y yo vamos a tener nuestra casita de juegos, con platos rotos de porcelana como si fueran la mejor vajilla.»  
**10:10** _· Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · de pie · ponerle nombre al corral · con el gesto de recitar_  
**10:12** Ana termina de ponerle nombre al corral.  
**10:14** Ana está en Avonlea, junto a la huerta de Tejas Verdes; empieza a ponerle nombre a la huerta; con el gesto de recitar.  
**10:14** Ana dice: «Este lugar se va a llamar el Valle de las Violetas. ¿No es un nombre precioso?»  
**10:15** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · ponerle nombre a la huerta · con el gesto de recitar_  
**10:16** Ana termina de ponerle nombre a la huerta.  
**10:16** Ana se sienta.  
**10:16** Ana dice: «Mi imaginación no me deja quieta.»  

</details>

## Leer el libro prestado (meta 46: cumplida)

**Lo que debería pasar:** Ana se sienta con el libro que le prestaron y lee, un buen rato.

- ✔ Lee sentada, un buen rato. — 15:01, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (16 líneas)</summary>

**15:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes; ahora tiene un libro.  
**15:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**15:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**15:00** La Sra. Lynde dice: «Desde mi ventana veo todo el camino: no se me escapa nadie. Lo digo sin mala intención, ¿eh?»  
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
**15:31** Ana dice: «Hay tanto por hacer y tan poco tiempo... ¡y yo con tantas ideas!»  
**15:32** Marilla dice: «Ana, no te quedes soñando despierta. Aunque... la cocina está ordenada, eso sí.»  

</details>

## El club de cuentos (meta 47: cumplida)

**Lo que debería pasar:** Ana sube a su pieza y escribe un cuento sentada al escritorio, con el cuaderno abierto sobre él, un buen rato. Después se lo lee a Diana, sentadas juntas.

- ✔ Escribe sentada al escritorio, con el cuaderno, un buen rato. — 14:02, 40 min
- ✔ Se lo lee a Diana, sentadas juntas. — 15:06, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (48 líneas)</summary>

**14:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**14:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**14:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**14:00** La Sra. Lynde dice: «Desde mi ventana veo todo el camino: no se me escapa nadie. Lo digo sin mala intención, ¿eh?»  
**14:00** Ana empieza a escribir un cuento.  
**14:00** Ana dice: ««Los celos de Cordelia»: una historia trágica, con un ahogado y una dama de cabellos de oro…»  
**14:02** Ana entra a la pieza de Ana.  
**14:02** Ana está en la pieza de Ana, junto al escritorio.  
**14:02** Ana se sienta; con la banqueta y el cuaderno sobre la mesa.  
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
**14:42** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**14:45** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**14:50** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**14:50** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**14:50** (Narración) Los manzanos del Camino Blanco florecieron todos juntos, en una sola noche.  
**14:50** Ana se detiene en seco. Sobre ella, la bóveda de flores es tan blanca que parece hecha de luz. Ya no se acuerda de adónde iba.  
**14:52** No dice nada. Por una vez, Ana Shirley no dice nada.  
**14:53** Ana piensa: «…Es como la primera vez. No: es mejor que la primera vez, porque ahora es mío. Ahora vuelvo a casa por aquí.»  
**14:55** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**15:00** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**15:03** Ana dice: «¡Diana! ¡Espera!»  
**15:05** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**15:05** Minnie May Barry dice: «¿Me da una manzana? Solo una.»  
**15:05** Mary Joe dice: «Toma, pero no le digas a nadie.»  
**15:06** Ana está en Avonlea, junto a La Cuesta del Huerto; se sienta; empieza a leerle su cuento a Diana; con el cuaderno.  
**15:06** Ana dice: «Escucha, Diana: «La dama Geraldine caminaba a la luz de la luna…»»  
**15:10** _· Ana: Avonlea, junto a La Cuesta del Huerto · sentada · leerle su cuento a Diana · con el cuaderno_  
**15:15** _· Ana: Avonlea, junto a La Cuesta del Huerto · sentada · leerle su cuento a Diana · con el cuaderno_  
**15:20** _· Ana: Avonlea, junto a La Cuesta del Huerto · sentada · leerle su cuento a Diana · con el cuaderno_  
**15:21** Diana dice: «¡Ay, Ana, qué triste! ¡Lloré en la parte del ahogado!»  
**15:25** _· Ana: Avonlea, junto a La Cuesta del Huerto · sentada · leerle su cuento a Diana · con el cuaderno_  
**15:30** _· Ana: Avonlea, junto a La Cuesta del Huerto · sentada · leerle su cuento a Diana · con el cuaderno_  
**15:35** _· Ana: Avonlea, junto a La Cuesta del Huerto · sentada · leerle su cuento a Diana · con el cuaderno_  
**15:36** Ana se levanta; termina de leerle su cuento a Diana; ya no tiene nada.  
**15:36** Ana se sienta.  
**15:36** Ana dice: «Hoy el mundo huele a recién hecho. Hay que salir a estrenarlo.»  
**15:36** Ana se levanta.  
**15:38** Ana está en Avonlea, no lejos del huerto de los Barry.  

</details>

## Ensayar y recitar en el concierto (meta 48: cumplida)

**Lo que debería pasar:** Ana ensaya su recitación con el libro, un rato. Por la tarde, en el concierto, sube al escenario del salón y recita.

- ✔ Ensaya con el libro, un rato. — 15:29, 20 min
- ✔ Recita en el escenario del salón. — 16:07, 10 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (54 líneas)</summary>

**15:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**15:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**15:00** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**15:04** La Sra. Lynde dice: «Desde mi ventana veo todo el camino: no se me escapa nadie. Lo digo sin mala intención, ¿eh?»  
**15:05** _· Ana: Avonlea, no lejos de la huerta de Tejas Verdes · caminando_  
**15:10** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**15:15** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**15:15** Ana está en Avonlea, no lejos de la casa de Robert Bell.  
**15:20** _· Ana: Avonlea, no lejos de la escuela · caminando_  
**15:22** Ana está en Avonlea, junto a la escuela; empieza a ensayar la recitación.  
**15:22** Ana dice: ««La doncella de Shalott»… otra vez desde el principio, con más sentimiento.»  
**15:22** Ana entra a la escuela de Avonlea.  
**15:22** (Narración) La escuela de Avonlea tiene una sola sala, para todos los niños del pueblo. Gilbert Blythe es el más listo y el más buen mozo, y está acostumbrado a que todas las niñas lo miren. Ana todavía no lo ha mirado.  
**15:22** Gilbert Blythe dice: «(Gilbert Blythe alarga la mano, toma la punta de una trenza de Ana y susurra, lo bastante fuerte para que lo oiga toda la clase.) ¡Zanahorias! ¡Zanahorias!»  
**15:24** Ana se pone de pie de un salto, con los ojos echando chispas. Y dice: «¡Odioso, malvado! ¿Cómo te atreves?»  
**15:25** _· Ana: la escuela de Avonlea · de pie · ensayar la recitación_  
**15:25** ¡Crac! Ana le parte la pizarra en la cabeza a Gilbert.  
**15:26** Gilbert Blythe dice: «¡Ay! Perdona, Ana… solo era una broma. De verdad, perdóname.»  
**15:27** Ana dice: «¡Nunca te lo perdonaré! ¡Nunca jamás!»  
**15:29** Ana sigue, con un libro.  
**15:30** _· Ana: la escuela de Avonlea · de pie · ensayar la recitación · con un libro_  
**15:35** _· Ana: la escuela de Avonlea · de pie · ensayar la recitación · con un libro_  
**15:40** _· Ana: la escuela de Avonlea · de pie · ensayar la recitación · con un libro_  
**15:45** _· Ana: la escuela de Avonlea · de pie · ensayar la recitación · con un libro_  
**15:49** Ana termina de ensayar la recitación.  
**15:49** Ana sale.  
**15:49** Jane Andrews dice: «Mi mamá dice que eres muy imaginativa. No sé si lo dice como algo bueno.»  
**15:50** _· Ana: Avonlea · caminando_  
**15:54** El Sr. Phillips dice: «Mañana hay examen de geometría. Que nadie lo olvide.»  
**15:55** _· Ana: Avonlea · de pie_  
**15:55** Ana dice: «¡Buenas tardes, Moody Spurgeon!»  
**15:55** Moody Spurgeon dice: «¡Hola, Ana!»  
**15:56** Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»  
**15:57** Moody Spurgeon dice: «¿De verdad? ¡Cuéntame más!»  
**15:58** Ana dice: «¿No te parece que hoy el mundo está recién hecho?»  
**15:58** En el cruce de caminos, la gente se saluda de carreta a carreta. Un perro duerme al sol frente a la tienda.  
**15:58** Moody Spurgeon dice: «¡Qué lindo, Ana!»  
**15:59** Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»  
**15:59** Ana dice: «Aquí todos saben todo de todos. Al principio me daba miedo; ahora me gusta. Es como vivir dentro de una familia muy grande y un poco metida.»  
**16:00** _· Ana: Avonlea · de pie_  
**16:00** Moody Spurgeon dice: «¿De verdad? ¡Cuéntame más!»  
**16:01** Ana dice: «Bueno, me voy, que tengo que recitar en el concierto.»  
**16:02** La Srta. Hetty King dice: «Los niños de hoy no saben estarse quietos. En mis tiempos...»  
**16:05** _· Ana: Avonlea · caminando_  
**16:06** Ana empieza a recitar en el concierto.  
**16:06** Ana dice: «…y la barca siguió flotando río abajo, hacia Camelot.»  
**16:06** Ana entra al salón del pueblo.  
**16:07** Ana sigue, con el gesto de recitar.  
**16:07** Ana está en el salón del pueblo, junto al escenario.  
**16:10** _· Ana: el salón del pueblo, junto al escenario · de pie · recitar en el concierto · con el gesto de recitar_  
**16:15** _· Ana: el salón del pueblo, junto al escenario · de pie · recitar en el concierto · con el gesto de recitar_  
**16:17** Ana termina de recitar en el concierto.  
**16:18** Ana sale, junto al salón del pueblo.  
**16:18** El buhonero dice: «¡Cintas, botones, peinetas, tinte para el pelo! ¡Todo lo que una señorita necesita!»  

</details>

## Las flores del salón (meta 49: cumplida)

**Lo que debería pasar:** Ana va al salón con flores y cuelga guirnaldas a lo largo de la pared, un tramo tras otro, un buen rato.

- ✔ Cuelga las guirnaldas en el salón, un buen rato. — 10:42, 25 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (44 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**10:03** Ana está en Avonlea, junto a la huerta de Tejas Verdes; empieza a recoger un ramo de flores.  
**10:03** Ana se agacha; con el canastito.  
**10:04** En la tierra oscura asoman unos brotes verdes, tan chiquitos que casi no se ven.  
**10:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · agachada · recoger un ramo de flores · con el canastito_  
**10:05** Ana dice: «¡Salieron! Toda la noche estuvieron empujando para arriba, sin que nadie las viera. Eso sí que es fe.»  
**10:09** Ana se levanta; termina de recoger un ramo de flores; ahora tiene un ramo de flores.  
**10:10** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**10:15** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**10:20** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**10:22** Ana está en Avonlea, no lejos de la casa de Robert Bell.  
**10:22** Ana dice: «¡Hola, pequeño! ¿Cómo te llamas? Yo te diré Lord Fitzgerald.»  
**10:25** _· Ana: Avonlea, no lejos de la casa de Robert Bell · de pie_  
**10:26** Una vecina dice: «¿Vas para la aldea? Yo vengo de la tienda de Lawson.»  
**10:30** _· Ana: Avonlea, junto a la aldea · caminando_  
**10:31** El médico dice: «¿Alguien enfermo en Tejas Verdes? Espero que no.»  
**10:34** Ana está en Avonlea, junto al salón del pueblo.  
**10:34** Ana dice: «¡Buenos días!»  
**10:35** _· Ana: Avonlea, junto al salón del pueblo · de pie_  
**10:35** Un vecino dice: «¡Qué gusto verle, Ana!»  
**10:35** Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»  
**10:36** Un vecino dice: «¡Qué imaginación tienes, niña!»  
**10:37** Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»  
**10:38** Un vecino dice: «Tiempo tienes para decidirlo.»  
**10:39** Ana dice: «Bueno, me voy, que tengo que decorar el salón con flores.»  
**10:40** _· Ana: Avonlea, junto al salón del pueblo · de pie_  
**10:40** La Sra. Spencer dice: «Mi Lily estuvo enferma, por eso no pude llevarte yo a Tejas Verdes.»  
**10:40** Ana empieza a decorar el salón con flores.  
**10:40** Ana entra al salón del pueblo.  
**10:42** Ana sigue, con flores.  
**10:45** _· Ana: el salón del pueblo · de pie · decorar el salón con flores · con flores_  
**10:50** _· Ana: el salón del pueblo · de pie · decorar el salón con flores · con flores_  
**10:50** Ana sigue, con flores.  
**10:50** Ana está en el salón del pueblo, junto al escenario.  
**10:55** _· Ana: el salón del pueblo, junto al escenario · de pie · decorar el salón con flores · con flores_  
**10:59** Ana sigue, con flores.  
**11:00** _· Ana: el salón del pueblo · de pie · decorar el salón con flores · con flores_  
**11:05** _· Ana: el salón del pueblo · de pie · decorar el salón con flores · con flores_  
**11:07** Ana termina de decorar el salón con flores; ya no tiene nada.  
**11:07** Ana dice: «Se me ocurrió una idea... ¡de esas que solo tengo yo!»  
**11:08** Ana sale, junto al salón del pueblo.  
**11:09** Un vecino dice: «¡Qué grande estás, niña! Saludos a Marilla.»  

</details>

## Felicitar a Diana (meta 50: cumplida)

**Lo que debería pasar:** Diana recitó en el concierto. Ana va hasta ella y la felicita.

- ✔ Ana felicita a Diana. — 17:23, 1 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (29 líneas)</summary>

**17:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**17:00** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.  
**17:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**17:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**17:00** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**17:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**17:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**17:08** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**17:08** (Narración) Los manzanos del Camino Blanco florecieron todos juntos, en una sola noche.  
**17:08** Ana se detiene en seco. Sobre ella, la bóveda de flores es tan blanca que parece hecha de luz. Ya no se acuerda de adónde iba.  
**17:10** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie_  
**17:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**17:10** No dice nada. Por una vez, Ana Shirley no dice nada.  
**17:11** Ana piensa: «…Es como la primera vez. No: es mejor que la primera vez, porque ahora es mío. Ahora vuelvo a casa por aquí.»  
**17:15** _· Ana: Avonlea, junto al Bosque Encantado · caminando_  
**17:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**17:20** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**17:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**17:21** Ana dice: «¡Diana! ¡Espera!»  
**17:21** Diana dice: «¿Me llamabas?»  
**17:23** Minnie May Barry dice: «¡Gané la carrera hasta el portón!»  
**17:23** Ana va por Avonlea, junto al huerto de los Barry; empieza a felicitar a Diana; con las manos.  
**17:23** Ana dice: «¡Felicitaciones! Lo hiciste maravillosamente.»  
**17:23** Mary Joe dice: «¡Muy bien! Pero no corras tanto, que te caes.»  
**17:24** Ana termina de felicitar a Diana.  
**17:24** Diana dice: «¡Gracias! Estaba tan nerviosa…»  
**17:25** _· Ana: Avonlea, junto al huerto de los Barry · de pie_  
**17:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**17:25** Ana se sienta.  

</details>

## Consolar a Diana (meta 51: cumplida)

**Lo que debería pasar:** A Diana le prohibieron ver a Ana y está triste. Ana va hasta ella y la consuela con un abrazo.

- ✔ Ana la abraza. — 16:28, 1 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (33 líneas)</summary>

**16:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**16:00** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.  
**16:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**16:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**16:00** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**16:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**16:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**16:08** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**16:08** (Narración) Los manzanos del Camino Blanco florecieron todos juntos, en una sola noche.  
**16:08** Ana se detiene en seco. Sobre ella, la bóveda de flores es tan blanca que parece hecha de luz. Ya no se acuerda de adónde iba.  
**16:10** No dice nada. Por una vez, Ana Shirley no dice nada.  
**16:10** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie_  
**16:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**16:11** Ana piensa: «…Es como la primera vez. No: es mejor que la primera vez, porque ahora es mío. Ahora vuelvo a casa por aquí.»  
**16:12** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**16:15** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**16:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**16:20** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**16:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**16:24** Ana dice: «¡Diana! ¡Espera!»  
**16:24** Ana está en Avonlea, junto al huerto de los Barry.  
**16:24** Diana dice: «¿Qué pasa?»  
**16:25** _· Ana: Avonlea, junto al huerto de los Barry · de pie_  
**16:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**16:25** Minnie May Barry dice: «¿Ya es hora de comer?»  
**16:26** Mary Joe dice: «Todavía no. Anda a jugar un rato.»  
**16:28** Ana va por Avonlea, junto a La Cuesta del Huerto; empieza a consolar a Diana; con un abrazo.  
**16:28** Ana dice: «No llores… todo se va a arreglar, ya verás. Yo estoy contigo.»  
**16:29** Ana termina de consolar a Diana.  
**16:29** Diana dice: «Gracias… ya me siento mejor.»  
**16:30** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**16:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**16:30** Ana se sienta.  

</details>

## Hacer heno (meta 52: cumplida)

**Lo que debería pasar:** Matthew va al campo con la horquilla y junta el heno en un lugar y en otro, un buen rato; quedan los fardos en el campo.

- ✔ Junta el heno con la horquilla, un buen rato. — 09:06, 46 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (19 líneas)</summary>

**09:00** Al empezar, Matthew está en Avonlea, junto al granero; ahora tiene 5 dólares.  
**09:00** _· Matthew: Avonlea, junto al granero · caminando_  
**09:05** _· Matthew: Avonlea, no lejos del campo de heno · caminando_  
**09:06** Matthew está en Avonlea, junto al campo de heno.  
**09:06** Matthew empieza a hacer heno.  
**09:06** Matthew dice: «A juntar el heno antes de que llueva…»  
**09:06** Matthew sigue, con la horquilla.  
**09:10** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:15** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:20** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:22** Matthew sigue, con la horquilla.  
**09:25** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:30** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:35** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:37** Matthew sigue, con la horquilla.  
**09:40** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:45** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:50** _· Matthew: Avonlea, junto al campo de heno · de pie · hacer heno · con la horquilla_  
**09:52** Matthew termina de hacer heno; ahora tiene 5 dólares, 3 fardos de heno.  

</details>

## Partir leña (meta 53: cumplida)

**Lo que debería pasar:** Matthew parte leña con el hacha junto al granero, un buen rato. Lleva la leña a la cocina y se la da a Marilla.

- ✔ Parte leña junto al granero, un buen rato. — 09:00, 25 min
- ✔ Tiene la leña. — 09:25, 4 min
- ✔ Se la da a Marilla en la cocina. — 09:28, 0 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (27 líneas)</summary>

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
**09:28** Matthew entra a la cocina de Tejas Verdes, junto a la puerta.  
**09:28** Matthew empieza a darle 3 atados de leña a Marilla; con lo que entrega.  
**09:29** Matthew termina de darle 3 atados de leña a Marilla; ahora tiene 5 dólares.  
**09:29** Marilla ahora tiene 3 atados de leña.  
**09:29** Marilla dice: «Gracias.»  
**09:29** Matthew sale, junto a Tejas Verdes.  
**09:30** _· Matthew: Avonlea, junto a Tejas Verdes · de pie_  
**09:30** _· Marilla: la cocina de Tejas Verdes · de pie_  

</details>

## Batir mantequilla (meta 54: cumplida)

**Lo que debería pasar:** Marilla pone la leche de la mañana en la mantequera, junto a la mesa, y bate sin parar una media hora, hasta que hay mantequilla.

- ✔ Bate en la mantequera una media hora. — 08:21, 30 min
- ✔ Tiene la mantequilla. — 08:51, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (20 líneas)</summary>

**08:00** Al empezar, Marilla está en Avonlea, junto a Tejas Verdes.  
**08:00** _· Marilla: Avonlea, junto a Tejas Verdes · de pie_  
**08:00** Marilla dice: «¿Me traerías 2 jarros de leche?»  
**08:00** Marilla entra a la cocina de Tejas Verdes, junto a la puerta.  
**08:05** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**08:10** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**08:15** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**08:20** _· Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**08:21** Marilla ahora tiene 2 jarros de leche.  
**08:21** Marilla dice: «Gracias.»  
**08:21** Marilla empieza a batir la mantequilla.  
**08:21** Marilla sigue, con la mantequera.  
**08:25** _· Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera_  
**08:28** (Narración) Los manzanos del Camino Blanco florecieron todos juntos, en una sola noche.  
**08:30** _· Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera_  
**08:35** _· Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera_  
**08:40** _· Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera_  
**08:45** _· Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera_  
**08:50** _· Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera_  
**08:51** Marilla termina de batir la mantequilla; ahora tiene un pan de mantequilla.  

</details>

## Sembrar y regar la huerta (meta 55: cumplida)

**Lo que debería pasar:** Ana va a la huerta con las semillas y siembra cama por cama. Después llena la regadera y las riega, una por una.

- ✔ Siembra en la huerta. — 09:03, 18 min
- ✔ Riega con la regadera. — 09:21, 9 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (23 líneas)</summary>

**09:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**09:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**09:00** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**09:02** Ana está en Avonlea, junto a la huerta de Tejas Verdes; empieza a sembrar la huerta.  
**09:03** Ana sigue, con las semillas.  
**09:03** En la tierra oscura asoman unos brotes verdes, tan chiquitos que casi no se ven.  
**09:04** Ana dice: «¡Salieron! Toda la noche estuvieron empujando para arriba, sin que nadie las viera. Eso sí que es fe.»  
**09:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · sembrar la huerta · con las semillas_  
**09:10** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · sembrar la huerta · con las semillas_  
**09:11** Ana sigue, con las semillas.  
**09:15** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · sembrar la huerta · con las semillas_  
**09:16** Ana sigue, con las semillas.  
**09:20** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · sembrar la huerta · con las semillas_  
**09:21** Ana termina de sembrar la huerta.  
**09:21** Ana empieza a regar la huerta.  
**09:21** Ana sigue, con la regadera.  
**09:25** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando · regar la huerta_  
**09:25** Ana sigue, con la regadera.  
**09:28** Ana sigue, con la regadera.  
**09:30** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie · regar la huerta · con la regadera_  
**09:31** Ana termina de regar la huerta.  
**09:31** Ana se sienta.  
**09:31** Ana se levanta.  

</details>

## Patinar en el lago (meta 56: cumplida)

**Lo que debería pasar:** En invierno, Ana se pone los patines y patina en el lago helado, dando vueltas, un buen rato.

- ✔ Patina en el lago, un buen rato. — 14:20, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (21 líneas)</summary>

**14:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**14:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**14:05** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**14:05** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**14:05** Empiezan a caer los primeros copos, grandes y lentos, sobre las ramas desnudas del Camino Blanco.  
**14:06** Ana levanta la cara y saca la lengua para atrapar uno.  
**14:07** Ana dice: «¡La primera nieve! El Camino Blanco se acordó de su nombre. Cada copo es distinto, dice la Srta. Stacy. Como las personas. Como las amigas del alma.»  
**14:10** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**14:15** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**14:20** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando_  
**14:20** Ana va por Avonlea, junto al Lago de las Aguas Brillantes; empieza a patinar en el lago; con los patines.  
**14:20** Ana dice: «¡Vuelo sobre el hielo como una golondrina!»  
**14:25** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines_  
**14:30** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines_  
**14:35** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines_  
**14:40** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines_  
**14:45** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines_  
**14:50** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando · patinar en el lago · con los patines_  
**14:50** Ana termina de patinar en el lago.  
**14:50** Ana se sienta.  
**14:50** Ana se levanta.  

</details>

## El trineo (meta 57: cumplida)

**Lo que debería pasar:** En invierno, Ana sube la colina con el trineo y se tira, una y otra vez, un buen rato.

- ✔ Se tira en trineo, una y otra vez, un buen rato. — 14:36, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (35 líneas)</summary>

**14:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**14:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**14:03** La Sra. Lynde dice: «Desde mi ventana veo todo el camino: no se me escapa nadie. Lo digo sin mala intención, ¿eh?»  
**14:05** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**14:10** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**14:15** _· Ana: Avonlea, no lejos de la escuela · caminando_  
**14:17** Una granjera dice: «Y la Sra. Allan es un encanto, eso sí.»  
**14:18** Ana está en Avonlea, junto a la aldea.  
**14:18** Ana dice: «¡Buenas tardes!»  
**14:19** El médico dice: «¡Qué gusto verle, Ana!»  
**14:19** Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»  
**14:19** En el cruce de caminos, la gente se saluda de carreta a carreta. Un perro duerme al sol frente a la tienda.  
**14:20** _· Ana: Avonlea, junto a la aldea · de pie_  
**14:20** El médico dice: «Tiempo tienes para decidirlo.»  
**14:21** Ana dice: «Aquí todos saben todo de todos. Al principio me daba miedo; ahora me gusta. Es como vivir dentro de una familia muy grande y un poco metida.»  
**14:21** Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»  
**14:22** El médico dice: «Nunca lo había pensado así.»  
**14:23** Ana dice: «Bueno, me voy, que tengo que tirarme en trineo.»  
**14:25** _· Ana: Avonlea, junto a la aldea · caminando_  
**14:26** El editor de La Crónica dice: «¿Va a la tienda de Lawson?»  
**14:30** _· Ana: Avonlea, no lejos del salón del pueblo · caminando_  
**14:35** _· Ana: Avonlea, no lejos de la colina · caminando_  
**14:36** Ana está en Avonlea, junto a la colina; se sienta; empieza a tirarse en trineo; con el trineo.  
**14:36** Ana dice: «¡Allá vamos, colina abajo! ¡Agárrate fuerte!»  
**14:40** _· Ana: Avonlea, junto a la colina · caminando · tirarse en trineo · con el trineo_  
**14:45** _· Ana: Avonlea, junto a la colina · caminando · tirarse en trineo · con el trineo_  
**14:50** _· Ana: Avonlea, junto a la colina · sentada · tirarse en trineo · con el trineo_  
**14:55** _· Ana: Avonlea, junto a la colina · sentada · tirarse en trineo · con el trineo_  
**15:00** _· Ana: Avonlea, junto a la colina · caminando · tirarse en trineo · con el trineo_  
**15:05** _· Ana: Avonlea, junto a la colina · caminando · tirarse en trineo · con el trineo_  
**15:06** Ana se levanta; termina de tirarse en trineo.  
**15:06** Ana se sienta.  
**15:06** Ana dice: «¡Qué día para hacer algo bonito!»  
**15:06** Ana se levanta.  
**15:08** Una niñita dice: «¡Gané la carrera hasta el portón!»  

</details>

## El picnic con Diana (meta 58: cumplida)

**Lo que debería pasar:** Ana le pide permiso a Marilla. Prepara la canasta en la cocina. Va al lago con Diana; extienden el mantel, se sientan y meriendan, sin apuro, un buen rato.

- ✔ Prepara la canasta en la cocina. — 11:02, 15 min
- ✔ Merienda sentada sobre el mantel, un buen rato. — 12:01, 40 min
- ✔ Diana está sentada con ella. — 12:01, 40 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (113 líneas)</summary>

**11:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**11:00** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.  
**11:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**11:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**11:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**11:00** Marilla se levanta.  
**11:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**11:00** Marilla dice: «Los Barry tienen una niña de tu edad, Diana. Si me lo pidieras, quizás un día te llevaría a conocerla.»  
**11:00** Ana dice: «Marilla, ¿puedo ir al picnic de la escuela dominical? ¡Va a haber helado!»  
**11:01** Marilla dice: «Está bien, puedes ir. Y te pongo una canasta con algo rico.»  
**11:02** Ana empieza a preparar una canasta de picnic.  
**11:02** Ana sigue, con el bol.  
**11:02** Ana está en la cocina de Tejas Verdes, junto a la estufa.  
**11:05** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar una canasta de picnic · con el bol_  
**11:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**11:07** Marilla está en la cocina de Tejas Verdes, junto al fregadero.  
**11:10** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar una canasta de picnic · con el bol_  
**11:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:10** _· Marilla: la cocina de Tejas Verdes · caminando_  
**11:15** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar una canasta de picnic · con el bol_  
**11:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:15** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:17** Ana termina de preparar una canasta de picnic; ahora tiene una canasta de picnic.  
**11:17** Ana sale, junto a Tejas Verdes.  
**11:20** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**11:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:20** _· Marilla: la cocina de Tejas Verdes · de pie_  
**11:25** _· Ana: Avonlea, junto al Bosque Encantado · caminando_  
**11:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**11:25** _· Marilla: la cocina de Tejas Verdes · de pie_  
**11:30** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**11:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:30** _· Marilla: la cocina de Tejas Verdes · de pie_  
**11:32** Ana dice: «¡Diana! ¡Espera!»  
**11:32** Diana dice: «¿Sí?»  
**11:33** Minnie May Barry dice: «¡Ana! ¿Me cuentas el cuento del hada otra vez?»  
**11:34** Diana dice: «Hola… ¿Tú eres la niña que vino a vivir a Tejas Verdes?»  
**11:34** Ana está en Avonlea, junto a La Cuesta del Huerto.  
**11:35** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:35** _· Marilla: la cocina de Tejas Verdes · de pie_  
**11:35** Ana dice: «¿Vamos a dar un paseo juntas? Hace un día precioso.»  
**11:35** Ana dice: «¡Buenos días, Mary Joe!»  
**11:36** Ana dice: «Sí… soy Ana. Ana con una sola n. ¿Y tú… tú eres Diana Barry?»  
**11:36** Mary Joe dice: «¡Buenos días, Ana! ¿Cómo están todos en casa?»  
**11:37** Ana dice: «¿No le parece que hoy el mundo está recién hecho?»  
**11:37** Diana dice: «Sí. Mamá dice que eres muy rara. Pero no pareces rara. Bueno, un poquito.»  
**11:38** Mary Joe dice: «Esta niña... qué cosas dice.»  
**11:38** Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»  
**11:39** Ana se pone colorada hasta las orejas. Y dice: «Tengo una imaginación muy grande, eso es todo. ¿Te… te gustaría que algún día jugáramos juntas?»  
**11:39** Mary Joe dice: «Ya lo creo, Ana. Ya lo creo.»  
**11:40** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**11:40** _· Marilla: la cocina de Tejas Verdes · de pie_  
**11:40** Ana dice: «Bueno, me voy, que tengo que ir al lago.»  
**11:41** Diana dice: «Bueno… tal vez. Tengo que volver a casa ahora.»  
**11:45** _· Ana: Avonlea, no lejos del huerto de los Barry · caminando_  
**11:45** _· Diana: Avonlea, no lejos del huerto de los Barry · caminando_  
**11:45** _· Marilla: la cocina de Tejas Verdes · de pie_  
**11:50** _· Ana: Avonlea, no lejos del Bosque Encantado · caminando_  
**11:50** _· Diana: Avonlea, no lejos del puente del arroyo · caminando_  
**11:50** _· Marilla: la cocina de Tejas Verdes · de pie_  
**11:50** Diana está en Avonlea, no lejos del Bosque Encantado.  
**11:52** Diana está en Avonlea, no lejos del puente del arroyo.  
**11:55** _· Ana: Avonlea, no lejos del Lago de las Aguas Brillantes · caminando_  
**11:55** _· Diana: Avonlea, no lejos del Lago de las Aguas Brillantes · caminando_  
**11:55** _· Marilla: la cocina de Tejas Verdes · de pie_  
**11:55** Ana está en Avonlea, no lejos del Lago de las Aguas Brillantes.  
**11:55** Diana está en Avonlea, no lejos del Lago de las Aguas Brillantes.  
**11:55** Ana dice: «¿Juras ser mi amiga del alma, Diana, mientras el sol y la luna existan?»  
**11:56** Diana dice: «¡Lo juro! Aunque no sé muy bien cómo se jura… ¿así está bien?»  
**11:57** Diana dice: «¡Ana, mi alma gemela! Te estaba esperando.»  
**11:57** Ana dice: «Perfecto. Ahora es para siempre.»  
**12:00** _· Ana: Avonlea, no lejos del Lago de las Aguas Brillantes · caminando_  
**12:00** _· Diana: Avonlea, no lejos del Lago de las Aguas Brillantes · de pie_  
**12:00** _· Marilla: la cocina de Tejas Verdes · de pie_  
**12:00** Marilla se sienta.  
**12:00** Gilbert Blythe dice: «¿Quieres que te ayude a cruzar el arroyo? ¿No? Bueno...»  
**12:01** Ana está en Avonlea, junto al Lago de las Aguas Brillantes.  
**12:01** Ana se sienta; empieza a merendar en el lago con Diana; con el mantel del picnic.  
**12:01** Ana dice: «¡Un picnic junto al lago! Y hay helado… ¡nunca había probado helado! Es indescriptible.»  
**12:01** Diana está en Avonlea, junto al Lago de las Aguas Brillantes; se sienta.  
**12:05** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic_  
**12:05** _· Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada_  
**12:05** _· Marilla: la cocina de Tejas Verdes · sentada_  
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
**12:41** Ana se levanta; termina de merendar en el lago con Diana; ya no tiene nada.  
**12:41** Diana se levanta.  
**12:41** Ana se sienta.  
**12:41** Ana se levanta.  
**12:41** Gilbert Blythe dice: «¿Quieres que te ayude a cruzar el arroyo? ¿No? Bueno...»  

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
**16:00** La Sra. Lynde dice: «Desde mi ventana veo todo el camino: no se me escapa nadie. Lo digo sin mala intención, ¿eh?»  
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

- ✔ Sube al techo y camina por el caballete. — 15:28, 2 min
- ✔ Se cae y se tuerce el tobillo. — 15:30, 1 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (27 líneas)</summary>

**15:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**15:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**15:00** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**15:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**15:07** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**15:07** (Narración) Los manzanos del Camino Blanco florecieron todos juntos, en una sola noche.  
**15:07** Ana se detiene en seco. Sobre ella, la bóveda de flores es tan blanca que parece hecha de luz. Ya no se acuerda de adónde iba.  
**15:09** No dice nada. Por una vez, Ana Shirley no dice nada.  
**15:10** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie_  
**15:10** Ana piensa: «…Es como la primera vez. No: es mejor que la primera vez, porque ahora es mío. Ahora vuelvo a casa por aquí.»  
**15:12** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**15:15** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie_  
**15:20** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**15:24** Ana está en Avonlea, no lejos del huerto de los Barry.  
**15:24** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**15:25** _· Ana: Avonlea, no lejos del huerto de los Barry · de pie_  
**15:28** Ana va por Avonlea, junto a La Cuesta del Huerto; empieza a caminar por el techo de los Barry.  
**15:28** Ana dice: «¡Josie Pye, mira cómo camino por el techo de los Barry!… ¡Ay!»  
**15:29** Mary Joe dice: «¡Muy bien! Pero no corras tanto, que te caes.»  
**15:30** _· Ana: Avonlea, junto a La Cuesta del Huerto · caminando · caminar por el techo de los Barry_  
**15:30** Ana dice: «¡Aaay!»  
**15:30** Ana dice: «¡Mi tobillo! Creo que me lo torcí… Diana, no puedo pararme.»  
**15:30** Ana se sienta; termina de caminar por el techo de los Barry.  
**15:30** Ana dice: «¡A ver qué descubro por ahí!»  
**15:30** Ana se levanta.  
**15:31** Diana dice: «Hola… ¿Tú eres la niña que vino a vivir a Tejas Verdes?»  
**15:32** Ana dice: «Sí… soy Ana. Ana con una sola n. ¿Y tú… tú eres Diana Barry?»  

</details>

## Conocer a Diana (una cadena del libro) (meta 62: cumplida)

**Lo que debería pasar:** El día antes, Ana le contó a Marilla que quería una amiga del alma. Hoy, en la tarde, Marilla va a La Cuesta del Huerto a devolverle un patrón a la Sra. Barry y lleva a Ana. La Sra. Barry las recibe en la salita y llama a Diana, que está en el jardín. Diana entra, las presentan, y Ana le pregunta si podría quererla lo bastante como para ser su amiga del alma. Diana se ríe y dice que sí.

- ✔ Marilla invita a Ana a ir con ella a La Cuesta del Huerto. — 14:30, 16 min
- ✔ Ana llega con Marilla a la salita de los Barry. — 14:54, hasta el final
- ✔ La Sra. Barry las recibe y llama a Diana. — 14:58, hasta el final
- ✔ Diana entra a la salita. — 14:59, hasta el final
- ✔ Ana le pregunta si podría ser su amiga del alma. — 15:02, 13 min
- ✔ Diana dice que sí. — 15:04, 11 min

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
**14:31** Marilla dice: «Ana, no te quedes soñando despierta. Aunque... la cocina está ordenada, eso sí.»  
**14:35** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**14:35** _· Marilla: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**14:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**14:35** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:35** (Narración) Los manzanos del Camino Blanco florecieron todos juntos, en una sola noche.  
**14:35** Ana se detiene en seco. Sobre ella, la bóveda de flores es tan blanca que parece hecha de luz. Ya no se acuerda de adónde iba.  
**14:37** No dice nada. Por una vez, Ana Shirley no dice nada.  
**14:38** Ana piensa: «…Es como la primera vez. No: es mejor que la primera vez, porque ahora es mío. Ahora vuelvo a casa por aquí.»  
**14:40** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**14:40** _· Marilla: Avonlea, junto al puente del arroyo · caminando_  
**14:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:40** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:45** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**14:45** _· Marilla: Avonlea, junto al huerto de los Barry · caminando_  
**14:45** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:45** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:45** Minnie May Barry dice: «¿Me da una manzana? Solo una.»  
**14:46** Marilla entra a la salita de La Cuesta del Huerto.  
**14:46** Mary Joe dice: «Toma, pero no le digas a nadie.»  
**14:50** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**14:50** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**14:50** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:50** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:50** Marilla sale.  
**14:51** Marilla dice: «¡Ana! ¡Espera!»  
**14:52** Ana está en Avonlea, no lejos del huerto de los Barry.  
**14:54** Ana entra a la salita de La Cuesta del Huerto.  
**14:54** Marilla entra a la salita de La Cuesta del Huerto.  
**14:54** (Narración) La Cuesta del Huerto es la granja de los Barry, al otro lado del arroyo, frente a Tejas Verdes. Allí vive Diana, de la edad de Ana, con sus padres y su hermanita Minnie May. La Sra. Barry es una señora muy estricta.  
**14:54** La Sra. Barry dice: «Buenas tardes, Marilla. ¡Qué sorpresa! Pasa, pasa. ¿Y ésta es la niña que adoptaron?»  
**14:55** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**14:55** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**14:55** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**14:55** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:56** Marilla dice: «Sí, ésta es Ana Shirley. Vengo a devolverle el patrón de la falda que me prestó.»  
**14:57** Ana dice: «Ana con una sola n, por favor.»  
**14:58** La Sra. Barry dice: «¿Cómo estás, Ana? Diana está en el jardín. ¡Diana! Ven a conocer a la niña de los Cuthbert.»  
**14:59** Diana entra a la salita de La Cuesta del Huerto.  
**14:59** La Sra. Barry dice: «Ésta es mi hija Diana. Diana, ¿por qué no llevas a Ana al jardín y le muestras tus flores?»  
**15:00** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**15:00** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**15:00** _· Diana: la salita de La Cuesta del Huerto · caminando_  
**15:00** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**15:01** Diana dice: «Hola… ¿quieres venir a ver el jardín?»  
**15:02** Ana mira a Diana muy seria, sin atreverse a respirar. Y dice: «Oh, Diana… ¿crees que podrías… que podrías quererme un poquito, lo bastante como para ser mi amiga del alma?»  
**15:04** Diana se ríe; Diana siempre se ríe antes de hablar. Y dice: «Bueno, creo que sí. Me alegro mucho de que hayas venido a vivir a Tejas Verdes. Va a ser tan lindo tener a alguien con quien jugar.»  
**15:05** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**15:05** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**15:05** _· Diana: la salita de La Cuesta del Huerto · caminando_  
**15:05** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**15:10** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**15:10** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**15:10** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**15:10** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**15:14** Marilla entra a la cocina de Tejas Verdes.  
**15:14** Diana dice: «¿Más té, Ana? Me encanta tomar el té contigo, como dos señoras de verdad.»  
**15:14** Ana está en la salita de La Cuesta del Huerto, junto al sofá; se sienta.  
**15:14** Diana está en la salita de La Cuesta del Huerto, junto al sofá; se sienta.  
**15:15** _· Ana: la salita de La Cuesta del Huerto, junto al sofá · sentada_  
**15:15** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:15** _· Diana: la salita de La Cuesta del Huerto, junto al sofá · sentada_  
**15:15** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  

</details>

## «¡Zanahorias!» (una cadena del libro) (meta 63: cumplida)

**Lo que debería pasar:** El primer día de Ana en la escuela, Gilbert Blythe le toma una trenza y le dice «¡Zanahorias!». Ana se pone de pie, furiosa, y le parte la pizarra en la cabeza. Gilbert le pide perdón; Ana jura que nunca lo perdonará.

- ✔ Ana entra a la escuela. — 10:22, hasta el final
- ✔ Gilbert le dice «¡Zanahorias!». — 10:22, 7 min
- ✔ Ana le parte la pizarra en la cabeza. — 10:26, hasta el final
- ✔ Ana jura no perdonarlo nunca. — 10:28, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (32 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** Al empezar, Gilbert Blythe está en la escuela de Avonlea; se sienta.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:00** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**10:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**10:05** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:10** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**10:10** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:15** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**10:15** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:16** Ana está en Avonlea, no lejos de la casa de Robert Bell.  
**10:16** Ana dice: «¿Qué pensarán los animales de nosotros?»  
**10:20** _· Ana: Avonlea, no lejos de la escuela · caminando_  
**10:20** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:22** Ana está en Avonlea, junto a la escuela.  
**10:22** Ana entra a la escuela de Avonlea.  
**10:22** (Narración) La escuela de Avonlea tiene una sola sala, para todos los niños del pueblo. Gilbert Blythe es el más listo y el más buen mozo, y está acostumbrado a que todas las niñas lo miren. Ana todavía no lo ha mirado.  
**10:22** Gilbert Blythe alarga la mano, toma la punta de una trenza de Ana y susurra, lo bastante fuerte para que lo oiga toda la clase. Y dice: «¡Zanahorias! ¡Zanahorias!»  
**10:24** Ana se pone de pie de un salto, con los ojos echando chispas. Y dice: «¡Odioso, malvado! ¿Cómo te atreves?»  
**10:25** _· Ana: la escuela de Avonlea · de pie_  
**10:25** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:26** ¡Crac! Ana le parte la pizarra en la cabeza a Gilbert.  
**10:27** Gilbert Blythe dice: «¡Ay! Perdona, Ana… solo era una broma. De verdad, perdóname.»  
**10:28** Ana dice: «¡Nunca te lo perdonaré! ¡Nunca jamás!»  
**10:30** _· Ana: la escuela de Avonlea · de pie_  
**10:30** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:30** Gilbert Blythe sale; se levanta.  
**10:35** _· Ana: la escuela de Avonlea · de pie_  
**10:35** _· Gilbert Blythe: Avonlea · caminando_  
**10:37** Ana dice: «¡A ver qué descubro por ahí!»  
**10:38** El Sr. Phillips dice: «Mañana hay examen de geometría. Que nadie lo olvide.»  

</details>

## El broche de amatista (una cadena del libro) (meta 64: cumplida)

**Lo que debería pasar:** Marilla no encuentra su broche de amatista y culpa a Ana, que lo había visto. Ana, para poder ir al picnic, inventa que lo perdió en el lago. Entonces el broche aparece enganchado en el chal de Marilla, que le pide perdón y la deja ir al picnic.

- ✔ Marilla pregunta por su broche. — 10:00, 14 min
- ✔ Ana inventa una confesión. — 10:04, 11 min
- ✔ El broche aparece en el chal de Marilla. — 10:06, 7 min
- ✔ Marilla le pide perdón y la deja ir al picnic. — 10:10, 4 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (24 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**10:00** Marilla se levanta.  
**10:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:00** (Narración) Marilla tiene un broche de amatista que fue de su madre: lo más valioso que posee, y lo usa solo para ir a la iglesia. Y la escuela dominical va a hacer un picnic en el lago, con helado, algo que Ana nunca ha probado.  
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
**10:15** Ana está en la cocina de Tejas Verdes, junto a la estufa.  
**10:15** Ana ahora tiene una taza de té.  

</details>

## El té con Diana y el vino de grosellas (una cadena del libro) (meta 65: cumplida)

**Lo que debería pasar:** Ana invita a Diana a tomar el té en Tejas Verdes. Se sientan a la mesa y Ana le sirve lo que cree que es cordial de frambuesa. Diana toma tres vasos, dice que se siente rara y se va a su casa tambaleándose.

- ✔ Diana llega a la cocina de Tejas Verdes. — 16:09, 8 min
- ✔ Se sientan a tomar el té. — 16:09, 8 min
- ✔ Ana le sirve el «cordial». — 16:09, 8 min
- ✔ Diana se siente muy mal. — 16:16, 1 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (137 líneas)</summary>

**13:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**13:00** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.  
**13:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**13:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:00** (Narración) Desde la puerta de la cocina, Marilla se seca las manos en el delantal y llama: «¡Ana! ¡A la mesa!»  
**13:00** Ana elige: «Entrar a almorzar con los Cuthbert».  
**13:00** Ana entra a la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta.  
**13:00** Ana dice: «¡Voy, Marilla! Huele a papas con mantequilla.»  
**13:00** Ana dice: «¡Qué rico huele todo! Comer en esta mesa me hace sentir parte de una familia de verdad.»  
**13:01** Ana se levanta.  
**13:01** Ana dice: «¿Usted cree que las vacas tienen pensamientos profundos?»  
**13:02** Marilla dice: «Hmm. Bueno, admito que hoy te has portado muy bien.»  
**13:02** Matthew dice: «Bueno, pues… las nuestras parecen pensar mucho en el pasto.»  
**13:03** Ana dice: «Eso también es una filosofía.»  
**13:04** Ana empieza a preparar el té.  
**13:04** Ana sigue, con el bol.  
**13:04** Ana está en la cocina de Tejas Verdes, junto a la estufa.  
**13:05** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar el té · con el bol_  
**13:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
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
**13:34** Ana termina de preparar el té; ahora tiene una taza de té.  
**13:34** Ana sale, junto a Tejas Verdes.  
**13:34** Matthew dice: «Tú le pones nombre a todo, Ana. Bueno, pues… ¿cómo le dirías al estanque de los Barry?»  
**13:34** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**13:35** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**13:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:40** _· Ana: Avonlea, no lejos del Camino Blanco de las Delicias · caminando_  
**13:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**13:41** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**13:41** (Narración) Los manzanos del Camino Blanco florecieron todos juntos, en una sola noche.  
**13:41** Ana se detiene en seco. Sobre ella, la bóveda de flores es tan blanca que parece hecha de luz. Ya no se acuerda de adónde iba.  
**13:43** No dice nada. Por una vez, Ana Shirley no dice nada.  
**13:44** Ana piensa: «…Es como la primera vez. No: es mejor que la primera vez, porque ahora es mío. Ahora vuelvo a casa por aquí.»  
**13:45** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie_  
**13:45** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:50** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**13:50** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:55** _· Ana: Avonlea, no lejos del huerto de los Barry · caminando_  
**13:55** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:55** Ana dice: «¡Diana! ¡Espera!»  
**13:55** Diana dice: «¿Me llamabas?»  
**13:56** Minnie May Barry dice: «¡Gané la carrera hasta el portón!»  
**13:56** Mary Joe dice: «¡Muy bien! Pero no corras tanto, que te caes.»  
**13:57** Ana está en Avonlea, junto a La Cuesta del Huerto.  
**13:57** Ana dice: «¿Vendrías a tomar el té conmigo esta tarde, a las 17:00? En la cocina de Tejas Verdes.»  
**13:59** Diana dice: «¡Sí, me encantaría! Allí estaré.»  
**13:59** Ana dice: «¡Buenas tardes, Minnie May Barry!»  
**13:59** Minnie May Barry dice: «¡Hola, Ana! ¿A dónde vas?»  
**14:00** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:00** Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»  
**14:01** Minnie May Barry dice: «¿De verdad? ¡Cuéntame más!»  
**14:02** Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»  
**14:03** Minnie May Barry dice: «¿De verdad? ¡Cuéntame más!»  
**14:04** Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»  
**14:05** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:05** Diana dice: «Te presto mi libro, si quieres. Es de una dama muy triste, en un castillo.»  
**14:05** Minnie May Barry dice: «¡Qué cosas dices, Ana!»  
**14:05** Ana dice: «Bueno, me voy, que tengo que ir a la cocina de Tejas Verdes.»  
**14:10** _· Ana: Avonlea, no lejos del huerto de los Barry · caminando_  
**14:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:15** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**14:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:20** _· Ana: Avonlea, no lejos del Camino Blanco de las Delicias · caminando_  
**14:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:23** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**14:24** Marilla dice: «Si quieres cocinar, la estufa está encendida. Cuidado con no quemar nada esta vez.»  
**14:25** _· Ana: la cocina de Tejas Verdes · de pie_  
**14:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
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
**14:51** Marilla dice: «Ana, no te quedes soñando despierta. Aunque... la cocina está ordenada, eso sí.»  
**14:55** _· Ana: la cocina de Tejas Verdes · de pie_  
**14:55** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:00** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:05** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:10** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:15** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:20** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:25** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:27** Marilla dice: «Rachel Lynde dice que todavía no la has ido a ver. Es mejor ir que dar que hablar.»  
**15:30** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:35** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:40** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:45** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:45** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:50** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:50** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:50** Marilla dice: «Si quieres cocinar, la estufa está encendida. Cuidado con no quemar nada esta vez.»  
**15:55** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:55** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**16:00** _· Ana: la cocina de Tejas Verdes · de pie_  
**16:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**16:05** _· Ana: la cocina de Tejas Verdes · de pie_  
**16:05** _· Diana: Avonlea, junto al Bosque Encantado · caminando_  
**16:09** Diana entra a la cocina de Tejas Verdes, junto a la puerta.  
**16:09** Ana está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta; empieza a tomar el té con Diana; con el té.  
**16:09** (Narración) Marilla le dio permiso a Ana para invitar a Diana a tomar el té, como dos señoras, con el juego de té bueno y el cordial de frambuesa de la despensa. Pero Marilla no se acordó de que el cordial ya no estaba en la despensa, sino en el sótano.  
**16:09** Ana dice: «Toma otro vaso de cordial de frambuesa, Diana. Es de Marilla, y es buenísimo.»  
**16:10** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · tomar el té con Diana · con el té_  
**16:10** _· Diana: la cocina de Tejas Verdes · de pie_  
**16:11** Diana dice: «Es el cordial más rico que he probado. Mucho más rico que el de la Sra. Lynde. (Diana se sirve el tercer vaso.)»  
**16:12** Ana le cuenta a Diana cómo se le cayó un ratón en la salsa de ciruela, con todos los detalles.  
**16:14** Diana dice: «Ana… me siento… me siento rara. Creo que me voy a casa.»  
**16:15** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · tomar el té con Diana · con el té_  
**16:15** _· Diana: la cocina de Tejas Verdes · de pie_  
**16:15** Ana dice: «¿A casa? ¡Pero si todavía no hemos tomado el té! ¡Diana, no te vayas!»  
**16:16** Diana se levanta tambaleándose. Y dice: «Me siento… muy… muy mal.»  
**16:17** Diana sale, junto a Tejas Verdes.  
**16:17** Ana se levanta; termina de tomar el té con Diana.  

</details>

## Minnie May y el crup (una cadena del libro) (meta 66: cumplida)

**Lo que debería pasar:** Diana tiene prohibido ver a Ana. Una noche llega corriendo a Tejas Verdes: Minnie May tiene crup. Ana toma el jarabe de ipecacuana y corre con ella a La Cuesta del Huerto, donde cuida a Minnie May toda la noche. Al otro día, la Sra. Barry le pide perdón.

- ✔ Diana llega corriendo a la cocina de Tejas Verdes. — 19:19, 5 min
- ✔ Diana avisa que Minnie May tiene crup. — 19:19, 4 min
- ✔ Ana corre a La Cuesta del Huerto. — 19:32, hasta el final
- ✔ Ana la cuida hasta que respira mejor. — 19:36, hasta el final
- ✔ La Sra. Barry le pide perdón. — 19:37, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (58 líneas)</summary>

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
**19:13** Diana está en Avonlea, junto a Tejas Verdes.  
**19:13** Diana dice: «¡Buenas noches, Jerry Buote!»  
**19:14** Jerry Buote dice: «¡Hola, Diana! ¿A dónde vas?»  
**19:14** Diana dice: «¡Te pillé! ¡Ahora tú la llevas!»  
**19:15** _· Ana: la cocina de Tejas Verdes · de pie_  
**19:15** _· Diana: Avonlea, junto a Tejas Verdes · de pie_  
**19:15** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**19:15** Jerry Buote dice: «¡No vale, no estaba jugando!»  
**19:16** Diana dice: «¿Jugamos a las escondidas?»  
**19:16** Jerry Buote dice: «Bueno, pero yo no cuento esta vez.»  
**19:17** Diana dice: «Bueno, me voy, que tengo que ir a la cocina de Tejas Verdes.»  
**19:19** Diana entra a la cocina de Tejas Verdes, junto a la puerta.  
**19:19** (Narración) Una noche de invierno. Casi todos los grandes de Avonlea fueron a Charlottetown, a escuchar el discurso del Primer Ministro: también los Barry. Diana se quedó en casa cuidando a Minnie May, su hermanita de tres años.  
**19:19** (Narración) El crup es una enfermedad de los niños que cierra la garganta: hay que actuar rápido. Ana sabe de crup, porque cuidó a tres pares de mellizos de la Sra. Hammond.  
**19:19** Diana dice: «¡Ana! ¡Ven, por favor! Minnie May está enferma… tiene crup. Papá y mamá fueron al pueblo, y Mary Joe no sabe qué hacer.»  
**19:20** _· Ana: la cocina de Tejas Verdes · de pie_  
**19:20** _· Diana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**19:20** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**19:21** Ana dice: «¡Crup! Yo cuidé a los mellizos de la Sra. Hammond… tres veces tuvieron crup. Tengo el jarabe de ipecacuana.»  
**19:22** Ana toma el frasco del aparador y su chal. Y dice: «¡Vamos, Diana! ¡Corre!»  
**19:23** Ana sale, junto a Tejas Verdes.  
**19:23** Diana sale, junto a Tejas Verdes.  
**19:23** Jerry Buote dice: «El Sr. Cuthbert me pidió que entrara la leña antes de la cena.»  
**19:25** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**19:25** _· Diana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**19:25** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**19:30** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**19:30** _· Diana: Avonlea, junto al puente del arroyo · caminando_  
**19:30** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**19:32** El Sr. Barry dice: «¿Va a la tienda de Lawson?»  
**19:32** La Srta. Josephine Barry dice: «Sí, se me acabó el azúcar. Con tanta compota...»  
**19:32** Ana entra a la salita de La Cuesta del Huerto.  
**19:32** Minnie May arde de fiebre en el sofá, y apenas puede respirar.  
**19:33** Diana entra a la salita de La Cuesta del Huerto.  
**19:33** Ana dice: «Mary Joe, pon agua a calentar. Diana, más leña en la estufa.»  
**19:35** Ana le da el jarabe de ipecacuana a cucharadas, toda la noche, sin parar.  
**19:35** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**19:35** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**19:35** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**19:36** Ana dice: «¡Ya respira mejor! ¡Diana, ya respira mejor!»  
**19:37** Al otro día, la Sra. Barry viene con los ojos llenos de lágrimas. La Sra. Barry dice: «Ana, el doctor dice que salvaste a Minnie May. Me porté muy mal contigo. Perdóname, y sé amiga de Diana como antes.»  
**19:39** Ana no cabe en sí de felicidad. Y dice: «¡Oh, Sra. Barry! La perdono con toda mi alma.»  
**19:40** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**19:40** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**19:40** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  

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
**15:00** La Sra. Allan dice: «¡Buenas tardes!»  
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
**15:28** La Sra. Allan empieza a visitar a Marilla; con el té.  
**15:28** La Sra. Allan dice: «Buenas tardes, Marilla. Vine a visitarla.»  
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

- ✔ Ana entra a La Cuesta del Huerto. — 16:22, hasta el final
- ✔ Diana la invita a quedarse a dormir. — 16:23, hasta el final
- ✔ Saltan sobre la cama… y hay alguien. — 16:26, hasta el final
- ✔ Ana confiesa. — 16:30, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (36 líneas)</summary>

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
**16:16** Minnie May Barry dice: «Diana no me deja jugar con sus muñecas. ¿Tú me dejas?»  
**16:16** Ana está en Avonlea, junto a La Cuesta del Huerto.  
**16:16** Ana dice: «¡Buenas tardes, Mary Joe!»  
**16:17** Mary Joe dice: «¡Buenas tardes, Ana! ¿Cómo están todos en casa?»  
**16:18** Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»  
**16:19** Mary Joe dice: «¡Qué imaginación tienes, niña!»  
**16:19** Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»  
**16:20** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**16:20** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**16:21** Mary Joe dice: «Ya lo creo, Ana. Ya lo creo.»  
**16:21** Ana dice: «Bueno, me voy, que tengo que ir a La Cuesta del Huerto.»  
**16:22** Ana entra a la salita de La Cuesta del Huerto.  
**16:23** (Narración) La tía de la Sra. Barry, la Srta. Josephine Barry, vino desde Charlottetown. Es una anciana rica, muy de mal genio, y se queda en el cuarto de huéspedes de La Cuesta del Huerto. Ana y Diana no lo saben.  
**16:23** Diana dice: «¡Ana! Esta noche hay concierto del Club de Debate en el salón. Mamá dice que puedes quedarte a dormir… ¡en el cuarto de huéspedes!»  
**16:25** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**16:25** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**16:25** Esa noche, al volver del concierto, las niñas corren por el pasillo. Ana dice: «¡A la que llegue última a la cama!»  
**16:26** Las dos saltan sobre la cama del cuarto de huéspedes… Diana dice: «¡Ay! ¡Hay alguien en la cama!»  
**16:28** Diana dice: «Es… es la tía Josephine, de Charlottetown. ¡Ahora sí que nos va a pasar algo terrible!»  
**16:30** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**16:30** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**16:30** A la mañana siguiente, Ana va a verla. Ana dice: «Fue culpa mía, Srta. Barry. Diana no tuvo la culpa. Y usted no sabe lo que es tener tanta imaginación.»  
**16:35** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**16:35** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**16:40** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**16:40** _· Diana: la salita de La Cuesta del Huerto · de pie_  

</details>

## El examen de Queen's (lo que se gana de a poco) (meta 69: cumplida)

**Lo que debería pasar:** El primer día del verano, Marilla le recuerda a Ana que hoy es el examen de Queen's, en Charlottetown. Ana estudió lo suficiente (60 días de estudio, en su segundo año): entra, aunque no primera. Marilla está orgullosa, aunque no lo diga.

- ✔ Marilla le recuerda el examen. — 08:00, hasta el final
- ✔ Ana entra a Queen's. — 08:03, hasta el final
- ✔ Marilla, orgullosa a su manera. — 08:05, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (12 líneas)</summary>

**08:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**08:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**08:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**08:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**08:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**08:00** (Narración) El examen de ingreso al Queen's, el colegio de Charlottetown donde se preparan los maestros, se da al comenzar el verano. Los mejores alumnos de toda la Isla compiten por entrar. Ana estudió meses con la Srta. Stacy, y Gilbert Blythe también.  
**08:00** Marilla dice: «Ana, hoy es el examen de Queen's. Matthew te lleva a Charlottetown. Toma, no se te olvide el almuerzo.»  
**08:01** Ana pasa el día en Charlottetown, con la pluma temblándole en la mano. La geometría fue terrible… pero el resto, no tanto.  
**08:03** Semanas después, sale la lista en el diario. Ana dice: «¡Marilla! ¡Entré a Queen's! No primera… pero entré.»  
**08:05** _· Ana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**08:05** _· Marilla: la cocina de Tejas Verdes · sentada_  
**08:05** Marilla dice: «Lo sabía. Aunque no te lo iba a decir, para que no te llenaras de humo.»  

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
**10:03** Marilla está en la cocina de Tejas Verdes, junto al fregadero.  
**10:04** Ana lleva los platos sucios.  
**10:04** Ana deja los platos sucios; con la palangana con agua.  
**10:04** Ana está en la cocina de Tejas Verdes, junto al fregadero.  
**10:05** _· Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · lavar los platos · con la palangana con agua_  
**10:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:05** Marilla dice: «Ana, ya sabes dónde va cada cosa en esta cocina. Así se aprende a llevar una casa.»  

</details>

