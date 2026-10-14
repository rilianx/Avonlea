# Auditoría de las acciones

Cada acción se corrió 4 veces; un paso está ✔ solo si salió bien todas. Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.
**Pasos que ocurren como deberían: 3 de 3.** **Acciones en que alguna regla no se cumplió: 0 de 1.**

**Las reglas que siempre deben cumplirse**, se haga lo que se haga (se revisan en cada línea del relato): quien está enfermo está en cama; nadie se queda de pie dentro de un mueble; nadie se queda dentro de las paredes de una casa; nadie está en el agua (salvo en el bote, o patinando sobre el hielo); nadie está encima de otro; los animales de la cuerda van afuera.


## El picnic con Diana (meta 58: cumplida, cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana le pide permiso a Marilla. Prepara la canasta en la cocina. Va al lago con Diana; extienden el mantel, se sientan y meriendan, sin apuro, un buen rato.

- ✔ Prepara la canasta en la cocina. — 4 de 4 veces · 11:02, 15 min
- ✔ Merienda sentada sobre el mantel, un buen rato. — 4 de 4 veces · 12:03, 40 min
- ✔ Diana está sentada con ella. — 4 de 4 veces · 12:03, 40 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (124 líneas)</summary>

**11:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**11:00** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.  
**11:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**11:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**11:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**11:00** Marilla se levanta.  
**11:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**11:00** Marilla dice: «Riega la huerta antes de que caiga el sol, que las plantas lo agradecen.»  
**11:00** Ana dice: «Marilla, ¿puedo ir al picnic de la escuela dominical? ¡Va a haber helado!»  
**11:01** Marilla dice: «Está bien, puedes ir. Y te pongo una canasta con algo rico.»  
**11:02** Ana empieza a preparar una canasta de picnic.  
**11:02** Ana sigue, con el bol.  
**11:02** Ana está en la cocina de Tejas Verdes, junto a la estufa.  
**11:05** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar una canasta de picnic · con el bol_  
**11:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**11:06** Marilla está en la cocina de Tejas Verdes, junto al fregadero.  
**11:10** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar una canasta de picnic · con el bol_  
**11:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**11:15** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie · preparar una canasta de picnic · con el bol_  
**11:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:15** _· Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · caminando_  
**11:17** Ana termina de preparar una canasta de picnic; ahora tiene una canasta de picnic.  
**11:17** Ana sale, junto a Tejas Verdes.  
**11:20** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**11:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:20** _· Marilla: la cocina de Tejas Verdes · caminando_  
**11:25** _· Ana: Avonlea, junto al Bosque Encantado · caminando_  
**11:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:25** _· Marilla: la cocina de Tejas Verdes · caminando_  
**11:30** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**11:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**11:30** _· Marilla: la cocina de Tejas Verdes · caminando_  
**11:31** Ana dice: «¡Diana! ¡Espera!»  
**11:31** Diana dice: «¿Sí?»  
**11:33** Mary Joe dice: «La señora Barry dice que tienda la ropa antes de que se nuble.»  
**11:34** Ana está en Avonlea, junto a La Cuesta del Huerto.  
**11:34** Ana dice: «¿Vamos a dar un paseo juntas? Hace un día precioso.»  
**11:34** Ana dice: «¡Buenos días, Minnie May Barry!»  
**11:35** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:35** _· Marilla: la cocina de Tejas Verdes · caminando_  
**11:35** Minnie May Barry dice: «¡Hola, Ana! ¿A dónde vas?»  
**11:36** Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»  
**11:37** Minnie May Barry dice: «¡Qué lindo, Ana!»  
**11:37** Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»  
**11:38** Minnie May Barry dice: «¿De verdad? ¡Cuéntame más!»  
**11:39** Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»  
**11:40** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:40** _· Marilla: la cocina de Tejas Verdes · caminando_  
**11:40** Minnie May Barry dice: «¡Qué cosas dices, Ana!»  
**11:41** Diana dice: «Hola… ¿Tú eres la niña que vino a vivir a Tejas Verdes?»  
**11:41** Ana dice: «Bueno, me voy, que tengo que ir al lago.»  
**11:42** Ana dice: «Sí… soy Ana. Ana con e. ¿Y tú… tú eres Diana Barry?»  
**11:43** Diana dice: «Sí. Mamá dice que eres muy rara. Pero no pareces rara. Bueno, un poquito.»  
**11:44** Ana se pone colorada hasta las orejas. Y dice: «Tengo una imaginación muy grande, eso es todo. ¿Te… te gustaría que algún día jugáramos juntas?»  
**11:45** _· Ana: Avonlea, no lejos del huerto de los Barry · caminando_  
**11:45** _· Diana: Avonlea, no lejos del huerto de los Barry · caminando_  
**11:45** _· Marilla: la cocina de Tejas Verdes · caminando_  
**11:46** Diana dice: «Bueno… tal vez. Tengo que volver a casa ahora.»  
**11:50** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**11:50** _· Diana: Avonlea, no lejos del puente del arroyo · caminando_  
**11:50** _· Marilla: la cocina de Tejas Verdes · caminando_  
**11:50** Diana está en Avonlea, no lejos del Bosque Encantado.  
**11:53** Diana está en Avonlea, no lejos del puente del arroyo.  
**11:54** Ana está en Avonlea, no lejos del Camino Blanco de las Delicias.  
**11:54** Diana está en Avonlea, no lejos del Camino Blanco de las Delicias.  
**11:54** Ana dice: «¿Juras ser mi amiga del alma, Diana, mientras el sol y la luna existan?»  
**11:55** _· Ana: Avonlea, no lejos del Camino Blanco de las Delicias · de pie_  
**11:55** _· Diana: Avonlea, no lejos del Camino Blanco de las Delicias · de pie_  
**11:55** _· Marilla: la cocina de Tejas Verdes · caminando_  
**11:55** Diana dice: «¡Lo juro! Aunque no sé muy bien cómo se jura… ¿así está bien?»  
**11:56** Ana dice: «Perfecto. Ahora es para siempre.»  
**11:58** Diana está en Avonlea, no lejos del Lago de las Aguas Brillantes.  
**12:00** _· Ana: Avonlea, no lejos del Lago de las Aguas Brillantes · caminando_  
**12:00** _· Diana: Avonlea, no lejos del Lago de las Aguas Brillantes · caminando_  
**12:00** _· Marilla: la cocina de Tejas Verdes · caminando_  
**12:00** Marilla se sienta.  
**12:01** Ana dice: «Diana, ¿tú sabes lo que es tener el pelo rojo? Es una pena para toda la vida.»  
**12:02** Ana está en Avonlea, junto al Lago de las Aguas Brillantes.  
**12:02** Ana dice: «¡Diana! ¡Espera!»  
**12:02** Diana dice: «¿Sí?»  
**12:02** Diana dice: «A mí me parece bonito tu pelo, Ana.»  
**12:03** Ana se sienta; empieza a merendar en el lago con Diana; con el mantel del picnic.  
**12:03** Ana dice: «¡Un picnic junto al lago! Y hay helado… ¡nunca había probado helado! Es indescriptible.»  
**12:03** Diana está en Avonlea, junto al Lago de las Aguas Brillantes; se sienta.  
**12:03** Ana dice: «Eres demasiado buena. Daría cualquier cosa por tener el pelo negro como el tuyo, como el ala de un cuervo.»  
**12:04** Diana dice: «Y yo daría cualquier cosa por tener tu imaginación. Así estamos a mano.»  
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
**12:43** Ana se levanta; termina de merendar en el lago con Diana; ya no tiene nada.  
**12:43** Diana se levanta.  
**12:43** Ana se sienta.  
**12:43** Ana se levanta.  
**12:44** Ana está en Avonlea, no lejos del Lago de las Aguas Brillantes.  
**12:44** Diana está en Avonlea, no lejos del Lago de las Aguas Brillantes.  
**12:45** _· Ana: Avonlea, no lejos del Lago de las Aguas Brillantes · de pie_  
**12:45** _· Diana: Avonlea, no lejos del Lago de las Aguas Brillantes · de pie_  
**12:45** _· Marilla: la cocina de Tejas Verdes · sentada_  

</details>

