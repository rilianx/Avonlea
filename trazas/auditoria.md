# Auditoría de las acciones

Cada acción se corrió 4 veces; un paso está ✔ solo si salió bien todas. Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.
**Pasos que ocurren como deberían: 9 de 9.** **Acciones en que alguna regla no se cumplió: 0 de 2.**

**Las reglas que siempre deben cumplirse**, se haga lo que se haga (se revisan en cada línea del relato): quien está enfermo está en cama; nadie se queda de pie dentro de un mueble; nadie se queda dentro de las paredes de una casa; nadie está en el agua (salvo en el bote, o patinando sobre el hielo); nadie está encima de otro; los animales de la cuerda van afuera.


## El picnic con Diana (meta 58: cumplida, cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana le pide permiso a Marilla. Prepara la canasta en la cocina. Va al lago con Diana; extienden el mantel, se sientan y meriendan, sin apuro, un buen rato.

- ✔ Prepara la canasta en la cocina. — 4 de 4 veces · 11:02, 15 min
- ✔ Merienda sentada sobre el mantel, un buen rato. — 4 de 4 veces · 11:54, 40 min
- ✔ Diana está sentada con ella. — 4 de 4 veces · 11:54, 40 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (106 líneas)</summary>

**11:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**11:00** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.  
**11:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**11:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**11:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**11:00** Marilla se levanta.  
**11:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**11:00** Marilla dice: «Matthew no lo dice, pero te echa de menos cuando te vas donde Diana.»  
**11:00** Ana dice: «Marilla, ¿puedo ir al picnic de la escuela dominical? ¡Va a haber helado!»  
**11:01** Marilla dice: «Está bien, puedes ir. Y te pongo una canasta con algo rico.»  
**11:02** Ana empieza a preparar una canasta de picnic.  
**11:02** Ana sigue, con el bol.  
**11:02** Ana está en la cocina de Tejas Verdes, junto a la estufa.  
**11:04** Marilla está en la cocina de Tejas Verdes, junto al fregadero.  
**11:05** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar una canasta de picnic · con el bol_  
**11:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:05** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:10** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar una canasta de picnic · con el bol_  
**11:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:10** _· Marilla: la cocina de Tejas Verdes · caminando_  
**11:15** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar una canasta de picnic · con el bol_  
**11:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:15** _· Marilla: la cocina de Tejas Verdes · de pie_  
**11:17** Ana termina de preparar una canasta de picnic; ahora tiene una canasta de picnic.  
**11:17** Ana sale, junto a Tejas Verdes.  
**11:20** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**11:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:20** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:25** _· Ana: Avonlea, junto al Bosque Encantado · caminando_  
**11:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:25** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:30** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**11:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**11:30** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:31** Ana dice: «¡Diana! ¡Espera!»  
**11:32** Diana dice: «¿Qué pasa?»  
**11:33** Minnie May Barry dice: «¡Mire, encontré un nido!»  
**11:33** Mary Joe dice: «No lo toques, que la madre vuelve.»  
**11:33** Ana está en Avonlea, junto a La Cuesta del Huerto.  
**11:34** Ana dice: «¿Vamos a dar un paseo juntas? Hace un día precioso.»  
**11:35** _· Ana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**11:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**11:35** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:40** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**11:40** _· Diana: Avonlea, junto al puente del arroyo · caminando_  
**11:40** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:40** Diana dice: «Hola… ¿Tú eres la niña que vino a vivir a Tejas Verdes?»  
**11:41** Ana dice: «Sí… soy Ana. Ana con e. ¿Y tú… tú eres Diana Barry?»  
**11:42** Diana dice: «Sí. Mamá dice que eres muy rara. Pero no pareces rara. Bueno, un poquito.»  
**11:43** Diana está en Avonlea, no lejos del Bosque Encantado.  
**11:43** Ana se pone colorada hasta las orejas. Y dice: «Tengo una imaginación muy grande, eso es todo. ¿Te… te gustaría que algún día jugáramos juntas?»  
**11:45** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**11:45** _· Diana: Avonlea, no lejos del puente del arroyo · caminando_  
**11:45** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:45** Diana está en Avonlea, no lejos del puente del arroyo.  
**11:45** Diana dice: «Bueno… tal vez. Tengo que volver a casa ahora.»  
**11:46** Ana está en Avonlea, no lejos del Camino Blanco de las Delicias.  
**11:46** Diana está en Avonlea, no lejos del Camino Blanco de las Delicias.  
**11:46** Ana dice: «¿Juras ser mi amiga del alma, Diana, mientras el sol y la luna existan?»  
**11:47** Diana dice: «¡Lo juro! Aunque no sé muy bien cómo se jura… ¿así está bien?»  
**11:49** Ana dice: «Perfecto. Ahora es para siempre.»  
**11:50** _· Ana: Avonlea, no lejos del Camino Blanco de las Delicias · caminando_  
**11:50** _· Diana: Avonlea, no lejos del Camino Blanco de las Delicias · caminando_  
**11:50** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:53** Diana está en Avonlea, no lejos del Lago de las Aguas Brillantes.  
**11:53** Gilbert Blythe dice: «¿Quieres que te ayude a cruzar el arroyo? ¿No? Bueno...»  
**11:54** Ana está en Avonlea, junto al Lago de las Aguas Brillantes.  
**11:54** Ana dice: «Hmpf.»  
**11:54** Ana se sienta; empieza a merendar en el lago con Diana; con el mantel del picnic.  
**11:54** Ana dice: «¡Un picnic junto al lago! Y hay helado… ¡nunca había probado helado! Es indescriptible.»  
**11:54** Diana está en Avonlea, junto al Lago de las Aguas Brillantes; se sienta.  
**11:55** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic_  
**11:55** _· Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada_  
**11:55** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**12:00** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada · merendar en el lago con Diana · con el mantel del picnic_  
**12:00** _· Diana: Avonlea, junto al Lago de las Aguas Brillantes · sentada_  
**12:00** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**12:00** Marilla se sienta.  
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
**12:34** Ana se levanta; termina de merendar en el lago con Diana; ya no tiene nada.  
**12:34** Diana se levanta.  
**12:34** Ana se sienta.  
**12:34** Ana se levanta.  
**12:34** Gilbert Blythe dice: «¿Quieres que te ayude a cruzar el arroyo? ¿No? Bueno...»  
**12:35** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · caminando_  
**12:35** _· Diana: Avonlea, junto al Lago de las Aguas Brillantes · caminando_  
**12:35** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:35** Ana dice: «Hmpf.»  

</details>

## Conocer a Diana (una cadena del libro) (meta 62: cumplida, cumplida, cumplida, cumplida)

**Lo que debería pasar:** El día antes, Ana le contó a Marilla que quería una amiga del alma. Hoy, en la tarde, Marilla va a La Cuesta del Huerto a devolverle un patrón a la Sra. Barry y lleva a Ana. La Sra. Barry las recibe en la salita y llama a Diana, que está en el jardín. Diana entra, las presentan, y Ana le pregunta si podría quererla lo bastante como para ser su amiga del alma. Diana se ríe y dice que sí.

- ✔ Marilla invita a Ana a ir con ella a La Cuesta del Huerto. — 4 de 4 veces · 14:30, 16 min
- ✔ Ana llega con Marilla a la salita de los Barry. — 4 de 4 veces · 14:54, 15 min
- ✔ La Sra. Barry las recibe y llama a Diana. — 4 de 4 veces · 14:57, hasta el final
- ✔ Diana entra a la salita. — 4 de 4 veces · 14:59, 10 min
- ✔ Ana le pregunta si podría ser su amiga del alma. — 4 de 4 veces · 15:02, 8 min
- ✔ Diana dice que sí. — 4 de 4 veces · 15:03, 6 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (67 líneas)</summary>

**14:30** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**14:30** Al empezar, Marilla está en Avonlea, junto a Tejas Verdes.  
**14:30** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.  
**14:30** Al empezar, la Sra. Barry está en la salita de La Cuesta del Huerto.  
**14:30** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**14:30** _· Marilla: Avonlea, junto a Tejas Verdes · de pie_  
**14:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:30** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:30** Marilla dice: «Ana, voy a La Cuesta del Huerto a devolverle un patrón a la Sra. Barry. Ven conmigo: así conoces a Diana. Y pórtate bien.»  
**14:31** Marilla dice: «Riega la huerta antes de que caiga el sol, que las plantas lo agradecen.»  
**14:34** Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»  
**14:35** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**14:35** _· Marilla: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**14:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:35** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:40** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**14:40** _· Marilla: Avonlea, junto al puente del arroyo · caminando_  
**14:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:40** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:45** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**14:45** _· Marilla: Avonlea, junto al huerto de los Barry · caminando_  
**14:45** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:45** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:46** Marilla entra a la salita de La Cuesta del Huerto.  
**14:46** Minnie May Barry dice: «¿Ya es hora de comer?»  
**14:47** Mary Joe dice: «Todavía no. Anda a jugar un rato.»  
**14:50** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**14:50** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**14:50** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:50** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:50** Marilla sale.  
**14:51** Marilla dice: «¡Ana! ¡Espera!»  
**14:52** Ana está en Avonlea, no lejos del huerto de los Barry.  
**14:54** Ana entra a la salita de La Cuesta del Huerto.  
**14:54** Marilla entra a la salita de La Cuesta del Huerto.  
**14:54** La Sra. Lynde dice: «Desde mi ventana veo todo el camino: no se me escapa nadie. Lo digo sin mala intención, ¿eh?»  
**14:54** La Sra. Barry dice: «Buenas tardes, Marilla. ¡Qué sorpresa! Pasa, pasa. ¿Y ésta es la niña que adoptaron?»  
**14:55** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**14:55** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**14:55** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**14:55** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:56** Marilla dice: «Sí, ésta es Ana Shirley. Vengo a devolverle el patrón de la falda que me prestó.»  
**14:57** Ana dice: «Ana con e, por favor.»  
**14:57** La Sra. Barry dice: «¿Cómo estás, Ana? Diana está en el jardín. ¡Diana! Ven a conocer a la niña de los Cuthbert.»  
**14:59** Diana entra a la salita de La Cuesta del Huerto.  
**14:59** La Sra. Barry dice: «Ésta es mi hija Diana. Diana, ¿por qué no llevas a Ana al jardín y le muestras tus flores?»  
**15:00** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**15:00** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**15:00** _· Diana: la salita de La Cuesta del Huerto · caminando_  
**15:00** _· la Sra. Barry: la salita de La Cuesta del Huerto · caminando_  
**15:01** Diana dice: «Hola… ¿quieres venir a ver el jardín?»  
**15:02** Ana mira a Diana muy seria, sin atreverse a respirar. Y dice: «Oh, Diana… ¿crees que podrías… que podrías quererme un poquito, lo bastante como para ser mi amiga del alma?»  
**15:03** Diana se ríe; Diana siempre se ríe antes de hablar. Y dice: «Bueno, creo que sí. Me alegro mucho de que hayas venido a vivir a Tejas Verdes. Va a ser tan lindo tener a alguien con quien jugar.»  
**15:05** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**15:05** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**15:05** _· Diana: la salita de La Cuesta del Huerto · caminando_  
**15:05** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**15:09** Marilla dice: «Hmm. Bueno, admito que hoy te has portado muy bien.»  
**15:09** Marilla entra a la cocina de Tejas Verdes.  
**15:09** Ana sale; se sienta.  
**15:09** Diana sale.  
**15:09** Ana se levanta.  
**15:10** _· Ana: Avonlea · caminando_  
**15:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:10** _· Diana: Avonlea · de pie_  
**15:10** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**15:10** Minnie May Barry dice: «¿Ya es hora de comer?»  

</details>

