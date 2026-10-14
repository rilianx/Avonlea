# Auditoría de las acciones

Cada acción se corrió 2 veces; un paso está ✔ solo si salió bien todas. Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.
**Pasos que ocurren como deberían: 33 de 36.** **Acciones en que alguna regla no se cumplió: 0 de 9.**

**Las reglas que siempre deben cumplirse**, se haga lo que se haga (se revisan en cada línea del relato): quien está enfermo está en cama; nadie se queda de pie dentro de un mueble; nadie se queda dentro de las paredes de una casa; nadie está en el agua (salvo en el bote, o patinando sobre el hielo); nadie está encima de otro; los animales de la cuerda van afuera.


## Conocer a Diana (una cadena del libro) (meta 62: cumplida, cumplida)

**Lo que debería pasar:** El día antes, Ana le contó a Marilla que quería una amiga del alma. Hoy, en la tarde, Marilla va a La Cuesta del Huerto a devolverle un patrón a la Sra. Barry y lleva a Ana. La Sra. Barry las recibe en la salita y llama a Diana, que está en el jardín. Diana entra, las presentan, y Ana le pregunta si podría quererla lo bastante como para ser su amiga del alma. Diana se ríe y dice que sí.

- ✔ Marilla invita a Ana a ir con ella a La Cuesta del Huerto. — 2 de 2 veces · 14:30, 16 min
- ✔ Ana llega con Marilla a la salita de los Barry. — 2 de 2 veces · 14:50, 15 min
- ✔ La Sra. Barry las recibe y llama a Diana. — 2 de 2 veces · 14:53, hasta el final
- ✔ Diana entra a la salita. — 2 de 2 veces · 14:55, 10 min
- ✔ Ana le pregunta si podría ser su amiga del alma. — 2 de 2 veces · 14:57, 8 min
- ✔ Diana dice que sí. — 2 de 2 veces · 14:59, 6 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (69 líneas)</summary>

**14:30** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**14:30** Al empezar, Marilla está en Avonlea, junto a Tejas Verdes.  
**14:30** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.  
**14:30** Al empezar, la Sra. Barry está en la salita de La Cuesta del Huerto.  
**14:30** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**14:30** _· Marilla: Avonlea, junto a Tejas Verdes · de pie_  
**14:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:30** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:30** Marilla dice: «Ana, voy a La Cuesta del Huerto a devolverle un patrón a la Sra. Barry. Ven conmigo: así conoces a Diana. Y pórtate bien.»  
**14:31** Marilla dice: «Matthew no lo dice, pero te echa de menos cuando te vas donde Diana.»  
**14:34** Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»  
**14:35** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**14:35** _· Marilla: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**14:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**14:35** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:40** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**14:40** _· Marilla: Avonlea, junto al puente del arroyo · caminando_  
**14:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:40** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:44** Minnie May Barry dice: «¿Me da una manzana? Solo una.»  
**14:45** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**14:45** _· Marilla: Avonlea, junto al huerto de los Barry · caminando_  
**14:45** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:45** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:45** Mary Joe dice: «Toma, pero no le digas a nadie.»  
**14:46** Marilla está en Avonlea, junto a La Cuesta del Huerto.  
**14:46** Marilla dice: «¡Buenas tardes, Diana!»  
**14:46** Ana está en Avonlea, junto a La Cuesta del Huerto.  
**14:46** Diana dice: «¡Buenas tardes, Marilla! ¿Cómo están todos en casa?»  
**14:47** Marilla dice: «¿Va a la tienda de Lawson?»  
**14:48** Ana se sienta.  
**14:48** Diana dice: «Sí, se me acabó el azúcar. Con tanta compota...»  
**14:49** Marilla dice: «Bueno, me voy, que tengo que ir a La Cuesta del Huerto.»  
**14:50** _· Ana: Avonlea, junto a La Cuesta del Huerto · sentada_  
**14:50** _· Marilla: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:50** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:50** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:50** Ana se levanta.  
**14:50** Ana entra a la salita de La Cuesta del Huerto.  
**14:50** Marilla entra a la salita de La Cuesta del Huerto.  
**14:50** La Sra. Lynde dice: «Llevo cincuenta y dos cubrecamas de retazos, ¡cincuenta y dos! Y no pienso parar.»  
**14:50** La Sra. Barry dice: «Buenas tardes, Marilla. ¡Qué sorpresa! Pasa, pasa. ¿Y ésta es la niña que adoptaron?»  
**14:51** Marilla dice: «Sí, ésta es Ana Shirley. Vengo a devolverle el patrón de la falda que me prestó.»  
**14:53** Ana dice: «Ana con e, por favor.»  
**14:53** La Sra. Barry dice: «¿Cómo estás, Ana? Diana está en el jardín. ¡Diana! Ven a conocer a la niña de los Cuthbert.»  
**14:55** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**14:55** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**14:55** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:55** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:55** Diana entra a la salita de La Cuesta del Huerto.  
**14:55** La Sra. Barry dice: «Ésta es mi hija Diana. Diana, ¿por qué no llevas a Ana al jardín y le muestras tus flores?»  
**14:57** Diana dice: «Hola… ¿quieres venir a ver el jardín?»  
**14:57** Ana mira a Diana muy seria, sin atreverse a respirar. Y dice: «Oh, Diana… ¿crees que podrías… que podrías quererme un poquito, lo bastante como para ser mi amiga del alma?»  
**14:59** Diana se ríe; Diana siempre se ríe antes de hablar. Y dice: «Bueno, creo que sí. Me alegro mucho de que hayas venido a vivir a Tejas Verdes. Va a ser tan lindo tener a alguien con quien jugar.»  
**15:00** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**15:00** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**15:00** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**15:00** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**15:03** Diana dice: «El Bosque Encantado me da un poquito de miedo... pero contigo no.»  
**15:05** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**15:05** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**15:05** _· Diana: la salita de La Cuesta del Huerto · caminando_  
**15:05** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**15:05** Marilla dice: «Si quieres cocinar, la estufa está encendida. Cuidado con no quemar nada esta vez.»  
**15:05** Marilla entra a la cocina de Tejas Verdes.  
**15:05** Ana sale; se sienta.  
**15:05** Diana sale.  
**15:05** Ana se levanta.  
**15:07** Minnie May Barry dice: «¡Gané la carrera hasta el portón!»  

</details>

## «¡Zanahorias!» (una cadena del libro) (meta 63: cumplida, cumplida)

**Lo que debería pasar:** El primer día de Ana en la escuela, Gilbert Blythe le toma una trenza y le dice «¡Zanahorias!». Ana se pone de pie, furiosa, y le parte la pizarra en la cabeza. Gilbert le pide perdón; Ana jura que nunca lo perdonará.

- ✔ Ana entra a la escuela. — 2 de 2 veces · 10:22, 15 min
- ✔ Gilbert le dice «¡Zanahorias!». — 2 de 2 veces · 10:22, 7 min
- ✔ Ana le parte la pizarra en la cabeza. — 2 de 2 veces · 10:25, 11 min
- ✔ Ana jura no perdonarlo nunca. — 2 de 2 veces · 10:28, 9 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (32 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** Al empezar, Gilbert Blythe está en la escuela de Avonlea; se sienta.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:00** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**10:05** _· Ana: Avonlea, no lejos de la huerta de Tejas Verdes · caminando_  
**10:05** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:10** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**10:10** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:15** _· Ana: Avonlea, no lejos de la casa de Robert Bell · caminando_  
**10:15** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:16** Una vecina dice: «¿Vas para la aldea? Yo vengo de la tienda de Lawson.»  
**10:20** _· Ana: Avonlea, no lejos de la escuela · caminando_  
**10:20** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:22** Ana está en Avonlea, junto a la escuela.  
**10:22** Una granjera dice: «Lindo día, ¿verdad? Dicen que mañana llueve.»  
**10:22** Ana entra a la escuela de Avonlea.  
**10:22** Gilbert Blythe alarga la mano, toma la punta de una trenza de Ana y susurra, lo bastante fuerte para que lo oiga toda la clase. Y dice: «¡Zanahorias! ¡Zanahorias!»  
**10:24** Ana se pone de pie de un salto, con los ojos echando chispas. Y dice: «¡Odioso, malvado! ¿Cómo te atreves?»  
**10:25** _· Ana: la escuela de Avonlea · de pie_  
**10:25** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:25** ¡Crac! Ana le parte la pizarra en la cabeza a Gilbert.  
**10:27** Gilbert Blythe dice: «¡Ay! Perdona, Ana… solo era una broma. De verdad, perdóname.»  
**10:28** Ana dice: «¡Nunca te lo perdonaré! ¡Nunca jamás!»  
**10:30** Gilbert Blythe sale; se levanta.  
**10:30** _· Ana: la escuela de Avonlea · de pie_  
**10:30** _· Gilbert Blythe: Avonlea · de pie_  
**10:35** _· Ana: la escuela de Avonlea · de pie_  
**10:35** _· Gilbert Blythe: Avonlea · caminando_  
**10:37** Ana sale; se sienta.  
**10:37** Ana se levanta.  
**10:37** Tillie Boulter dice: «¿Juegas a la mancha? ¡Tú la llevas!»  

</details>

## El broche de amatista (una cadena del libro) (meta 64: cumplida, cumplida)

**Lo que debería pasar:** Marilla no encuentra su broche de amatista y culpa a Ana, que lo había visto. Ana, para poder ir al picnic, inventa que lo perdió en el lago. Entonces el broche aparece enganchado en el chal de Marilla, que le pide perdón y la deja ir al picnic.

- ✔ Marilla pregunta por su broche. — 2 de 2 veces · 10:00, 15 min
- ✔ Ana inventa una confesión. — 2 de 2 veces · 10:04, 12 min
- ✔ El broche aparece en el chal de Marilla. — 2 de 2 veces · 10:06, 8 min
- ✔ Marilla le pide perdón y la deja ir al picnic. — 2 de 2 veces · 10:10, 5 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (22 líneas)</summary>

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
**10:05** _· Ana: la cocina de Tejas Verdes · de pie_  
**10:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:05** Marilla dice: «¿Picnic? No irás a ningún picnic, Ana Shirley.»  
**10:06** Marilla saca su chal negro para remendarlo… y algo brilla en el encaje. Y dice: «¡El broche! Estaba enganchado en mi chal… Ana, ¿por qué dijiste que lo habías perdido?»  
**10:08** Ana dice: «Usted dijo que no saldría hasta confesar. Así que inventé una confesión… y bien interesante, además.»  
**10:10** _· Ana: la cocina de Tejas Verdes · de pie_  
**10:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:10** Marilla se ríe, a pesar de todo. Y dice: «Perdóname, Ana. No debí dudar de ti. Ve a prepararte para el picnic.»  
**10:14** Marilla está en la cocina de Tejas Verdes, junto al fregadero.  
**10:15** _· Ana: la cocina de Tejas Verdes · de pie_  
**10:15** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:15** Ana sale, junto a Tejas Verdes.  

</details>

## El té con Diana y el vino de grosellas (una cadena del libro) (meta 65: fail, cumplida)

**Lo que debería pasar:** Ana invita a Diana a tomar el té en Tejas Verdes. Se sientan a la mesa y Ana le sirve lo que cree que es cordial de frambuesa. Diana toma tres vasos, dice que se siente rara y se va a su casa tambaleándose.

- ✔ Diana llega a la cocina de Tejas Verdes. — 2 de 2 veces · 16:09, hasta el final
- ✘ Se sientan a tomar el té. — 1 de 2 veces · no ocurrió (al final: Avonlea, junto a el huerto de los Barry · sentada · tiene 1 te)
- ✘ Ana le sirve el «cordial». — 1 de 2 veces · no ocurrió (al final: Avonlea, junto a el huerto de los Barry · sentada · tiene 1 te)
- ✘ Diana se siente muy mal. — 1 de 2 veces · no ocurrió (al final: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · tiene 1 libro)

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (243 líneas)</summary>

**13:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**13:00** Al empezar, Diana está en Avonlea, junto a La Cuesta del Huerto; ahora tiene un libro.  
**13:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**13:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**13:00** Matthew dice: «¿Viste las flores junto al camino? Bueno, pues... me hicieron pensar en ti.»  
**13:00** Ana empieza a preparar el té.  
**13:00** Ana sigue, con el bol.  
**13:00** Ana está en la cocina de Tejas Verdes, junto a la estufa.  
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
**13:30** Ana termina de preparar el té; ahora tiene una taza de té.  
**13:30** Ana sale, junto a Tejas Verdes.  
**13:30** Matthew dice: «Bueno, pues... sí, es un día precioso, Ana. Ya lo creo.»  
**13:35** _· Ana: Avonlea, no lejos del Camino Blanco de las Delicias · caminando_  
**13:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**13:35** Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»  
**13:40** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**13:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**13:43** Ana está en Avonlea, junto al puente del arroyo.  
**13:45** _· Ana: Avonlea, junto al puente del arroyo · de pie_  
**13:45** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:48** Ana dice: «¡Diana! ¡Espera!»  
**13:48** Diana dice: «¿Me llamabas?»  
**13:49** Minnie May Barry dice: «¿Me da una manzana? Solo una.»  
**13:50** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**13:50** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:50** Mary Joe dice: «Toma, pero no le digas a nadie.»  
**13:50** Ana está en Avonlea, junto al huerto de los Barry.  
**13:51** Ana dice: «¿Vendrías a tomar el té conmigo esta tarde, a las 17:00? En la cocina de Tejas Verdes.»  
**13:52** Diana dice: «¡Sí, me encantaría! Allí estaré.»  
**13:54** Ana dice: «¡Buenas tardes, Mary Joe!»  
**13:55** _· Ana: Avonlea, junto al huerto de los Barry · de pie_  
**13:55** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:55** Mary Joe dice: «¡Qué gusto verle, Ana!»  
**13:55** Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»  
**13:56** Mary Joe dice: «Tiempo tienes para decidirlo.»  
**13:57** Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»  
**13:58** Diana dice: «¡Ana, mi alma gemela! Te estaba esperando.»  
**13:58** Mary Joe dice: «¡Qué imaginación tienes, niña!»  
**13:59** Ana dice: «Bueno, me voy, que tengo que ir a la cocina de Tejas Verdes.»  
**14:00** _· Ana: Avonlea, junto al huerto de los Barry · de pie_  
**14:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:05** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**14:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:10** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**14:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:10** Minnie May Barry dice: «¿Ya es hora de comer?»  
**14:15** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**14:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:15** Ana dice: «¡Buenas tardes, Minnie May Barry!»  
**14:15** Minnie May Barry dice: «¡Hola, Ana!»  
**14:16** Ana dice: «¿No te parece que hoy el mundo está recién hecho?»  
**14:17** Minnie May Barry dice: «¿De verdad? ¡Cuéntame más!»  
**14:18** Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»  
**14:19** Minnie May Barry dice: «¿De verdad? ¡Cuéntame más!»  
**14:19** Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»  
**14:20** _· Ana: Avonlea, junto al huerto de los Barry · de pie_  
**14:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:20** Minnie May Barry dice: «¿De verdad? ¡Cuéntame más!»  
**14:21** Ana dice: «Bueno, me voy, que tengo que ir a la cocina de Tejas Verdes.»  
**14:22** Diana dice: «El Bosque Encantado me da un poquito de miedo... pero contigo no.»  
**14:25** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**14:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:30** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**14:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:30** Minnie May Barry dice: «¡Mire, encontré un nido!»  
**14:30** Mary Joe dice: «No lo toques, que la madre vuelve.»  
**14:35** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**14:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:40** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**14:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:45** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**14:45** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:46** Diana dice: «Mamá dice que puedo salir hasta que se ponga el sol. ¿Vamos al lago?»  
**14:48** Ana dice: «¡Buenas tardes, Mary Joe!»  
**14:49** Mary Joe dice: «¡Qué gusto verle, Ana!»  
**14:50** _· Ana: Avonlea, junto al huerto de los Barry · de pie_  
**14:50** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:50** Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»  
**14:51** Mary Joe dice: «Nunca lo había pensado así.»  
**14:51** Ana dice: «¿No le parece que hoy el mundo está recién hecho?»  
**14:52** Mary Joe dice: «Esta niña... qué cosas dice.»  
**14:53** Ana dice: «Bueno, me voy, que tengo que ir a la cocina de Tejas Verdes.»  
**14:54** Mary Joe dice: «La señora Barry dice que tienda la ropa antes de que se nuble.»  
**14:55** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**14:55** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:00** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**15:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:05** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**15:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:06** Minnie May Barry dice: «Diana no me deja jugar con sus muñecas. ¿Tú me dejas?»  
**15:09** Diana dice: «El Bosque Encantado me da un poquito de miedo... pero contigo no.»  
**15:10** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**15:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:15** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**15:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:20** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**15:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:25** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**15:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:26** Mary Joe dice: «La señora Barry dice que tienda la ropa antes de que se nuble.»  
**15:30** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**15:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:32** Diana dice: «¿Te acuerdas de nuestro juramento de amistad? ¡Para siempre!»  
**15:34** Ana dice: «¡Buenas tardes, Mary Joe!»  
**15:35** _· Ana: Avonlea, junto al huerto de los Barry · de pie_  
**15:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:35** Mary Joe dice: «¡Buenas tardes, Ana! ¿Cómo están todos en casa?»  
**15:36** Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»  
**15:37** Mary Joe dice: «Ya lo creo, Ana. Ya lo creo.»  
**15:37** Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»  
**15:38** Mary Joe dice: «¡Qué imaginación tienes, niña!»  
**15:39** Ana dice: «Bueno, me voy, que tengo que ir a la cocina de Tejas Verdes.»  
**15:40** _· Ana: Avonlea, junto al huerto de los Barry · de pie_  
**15:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:42** Minnie May Barry dice: «¡Ana! ¿Me cuentas el cuento del hada otra vez?»  
**15:45** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**15:45** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:50** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**15:50** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:55** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**15:55** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:55** Diana dice: «Mamá dice que puedo salir hasta que se ponga el sol. ¿Vamos al lago?»  
**15:56** Ana dice: «¡Buenas tardes, Minnie May Barry!»  
**15:57** Minnie May Barry dice: «¡Hola, Ana! ¿A dónde vas?»  
**15:58** Ana dice: «¿No te parece que hoy el mundo está recién hecho?»  
**15:59** Minnie May Barry dice: «¡Qué lindo, Ana!»  
**15:59** Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»  
**16:00** _· Ana: Avonlea, junto al huerto de los Barry · de pie_  
**16:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**16:00** Minnie May Barry dice: «¿De verdad? ¡Cuéntame más!»  
**16:01** Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»  
**16:02** Minnie May Barry dice: «¡Qué cosas dices, Ana!»  
**16:03** Ana dice: «Bueno, me voy, que tengo que ir a la cocina de Tejas Verdes.»  
**16:04** Mary Joe dice: «La señora Barry dice que tienda la ropa antes de que se nuble.»  
**16:05** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**16:05** _· Diana: Avonlea, junto al Bosque Encantado · caminando_  
**16:09** Diana entra a la cocina de Tejas Verdes, junto a la puerta.  
**16:09** Diana está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta.  
**16:10** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**16:10** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**16:12** Minnie May Barry dice: «¡Ana! ¿Me cuentas el cuento del hada otra vez?»  
**16:15** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**16:15** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**16:15** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**16:20** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**16:20** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**16:25** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**16:25** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**16:30** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**16:30** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**16:35** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**16:35** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**16:40** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**16:40** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**16:42** Ana dice: «¡Buenas tardes, Minnie May Barry!»  
**16:43** Minnie May Barry dice: «¡Hola, Ana! ¿A dónde vas?»  
**16:44** Ana dice: «¿Sabías que los abedules parecen señoras de vestido blanco?»  
**16:45** _· Ana: Avonlea, junto al huerto de los Barry · de pie_  
**16:45** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**16:45** Minnie May Barry dice: «¿De verdad? ¡Cuéntame más!»  
**16:46** Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»  
**16:47** Minnie May Barry dice: «¡Qué cosas dices, Ana!»  
**16:47** Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»  
**16:48** Minnie May Barry dice: «¿De verdad? ¡Cuéntame más!»  
**16:49** Ana dice: «Bueno, me voy, que tengo que ir a la cocina de Tejas Verdes.»  
**16:50** _· Ana: Avonlea, junto al huerto de los Barry · de pie_  
**16:50** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**16:50** Minnie May Barry dice: «¡Ana! ¿Me cuentas el cuento del hada otra vez?»  
**16:55** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**16:55** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**16:55** Mary Joe dice: «La señora Barry dice que tienda la ropa antes de que se nuble.»  
**17:00** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**17:00** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**17:05** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**17:05** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**17:10** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**17:10** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**17:15** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**17:15** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**17:20** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**17:20** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**17:20** Ana dice: «¡Buenas tardes, Minnie May Barry!»  
**17:21** Minnie May Barry dice: «¡Hola, Ana! ¿A dónde vas?»  
**17:22** Ana dice: «¿Sabías que los abedules parecen señoras de vestido blanco?»  
**17:23** Minnie May Barry dice: «¡Qué cosas dices, Ana!»  
**17:24** Ana dice: «Cuando sea grande quiero escribir libros. O ser maestra. O las dos cosas.»  
**17:25** _· Ana: Avonlea, junto al huerto de los Barry · de pie_  
**17:25** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**17:25** Minnie May Barry dice: «¡Qué cosas dices, Ana!»  
**17:25** Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»  
**17:26** Minnie May Barry dice: «¿De verdad? ¡Cuéntame más!»  
**17:27** Ana dice: «Bueno, me voy, que tengo que ir a la cocina de Tejas Verdes.»  
**17:28** Mary Joe dice: «La señora Barry dice que tienda la ropa antes de que se nuble.»  
**17:30** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**17:30** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**17:35** _· Ana: Avonlea, junto al huerto de los Barry · de pie_  
**17:35** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**17:35** Minnie May Barry dice: «Ya no tengo tos. ¡Mamá dice que tú me salvaste!»  
**17:40** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**17:40** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**17:45** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**17:45** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**17:50** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**17:50** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**17:55** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**17:55** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**17:58** Ana dice: «¡Buenas tardes, Minnie May Barry!»  
**17:59** Minnie May Barry dice: «¡Hola, Ana! ¿A dónde vas?»  
**17:59** Ana dice: «¿No te parece que hoy el mundo está recién hecho?»  
**18:00** _· Ana: Avonlea, junto al huerto de los Barry · de pie_  
**18:00** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**18:00** Minnie May Barry dice: «¡Qué lindo, Ana!»  
**18:01** La Sra. Lynde dice: «Ana Shirley, hablas más que un molino... pero tienes buen corazón, eso lo reconozco.»  
**18:01** Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»  
**18:02** Minnie May Barry dice: «¡Qué lindo, Ana!»  
**18:03** Ana dice: «¿Sabías que los abedules parecen señoras de vestido blanco?»  
**18:04** Minnie May Barry dice: «¡Qué lindo, Ana!»  
**18:04** Ana dice: «Bueno, me voy, que tengo que ir a la cocina de Tejas Verdes.»  
**18:05** _· Ana: Avonlea, junto al huerto de los Barry · de pie_  
**18:05** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**18:08** Minnie May Barry dice: «¡Gané la carrera hasta el portón!»  
**18:09** Mary Joe dice: «¡Muy bien! Pero no corras tanto, que te caes.»  
**18:10** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**18:10** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**18:10** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**18:15** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**18:15** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**18:20** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**18:20** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**18:22** Ana dice: «Se me ocurrió una idea... ¡de esas que solo tengo yo!»  
**18:24** Ana se sienta.  

</details>

## Minnie May y el crup (una cadena del libro) (meta 66: cumplida, cumplida)

**Lo que debería pasar:** Diana tiene prohibido ver a Ana. Una noche llega corriendo a Tejas Verdes: Minnie May tiene crup. Ana toma el jarabe de ipecacuana y corre con ella a La Cuesta del Huerto, donde cuida a Minnie May toda la noche. Al otro día, la Sra. Barry le pide perdón.

- ✔ Diana llega corriendo a la cocina de Tejas Verdes. — 2 de 2 veces · 19:18, 5 min
- ✔ Diana avisa que Minnie May tiene crup. — 2 de 2 veces · 19:19, 4 min
- ✔ Ana corre a La Cuesta del Huerto. — 2 de 2 veces · 19:32, hasta el final
- ✔ Ana la cuida hasta que respira mejor. — 2 de 2 veces · 19:35, hasta el final
- ✔ La Sra. Barry le pide perdón. — 2 de 2 veces · 19:36, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (56 líneas)</summary>

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
**19:14** Jerry Buote dice: «¡Hola, Diana!»  
**19:14** Diana dice: «¿Jugamos a las escondidas?»  
**19:15** _· Ana: la cocina de Tejas Verdes · de pie_  
**19:15** _· Diana: Avonlea, junto a Tejas Verdes · de pie_  
**19:15** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**19:15** Jerry Buote dice: «Bueno, pero yo no cuento esta vez.»  
**19:16** Diana dice: «¡Te pillé! ¡Ahora tú la llevas!»  
**19:17** Jerry Buote dice: «¡No vale, no estaba jugando!»  
**19:17** Diana dice: «Bueno, me voy, que tengo que ir a la cocina de Tejas Verdes.»  
**19:18** Diana entra a la cocina de Tejas Verdes, junto a la puerta.  
**19:19** Diana dice: «¡Ana! ¡Ven, por favor! Minnie May está enferma… tiene crup. Papá y mamá fueron al pueblo, y Mary Joe no sabe qué hacer.»  
**19:20** _· Ana: la cocina de Tejas Verdes · de pie_  
**19:20** _· Diana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**19:20** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**19:20** Ana dice: «¡Crup! Yo cuidé a los mellizos de la Sra. Hammond… tres veces tuvieron crup. Tengo el jarabe de ipecacuana.»  
**19:22** Ana toma el frasco del aparador y su chal. Y dice: «¡Vamos, Diana! ¡Corre!»  
**19:23** Ana sale, junto a Tejas Verdes.  
**19:23** Diana sale, junto a Tejas Verdes.  
**19:23** Jerry Buote dice: «Oui, oui... ya voy, ya voy. ¡Esa vaca no se quiere mover!»  
**19:25** _· Ana: Avonlea, no lejos de la huerta de Tejas Verdes · caminando_  
**19:25** _· Diana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**19:25** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**19:30** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**19:30** _· Diana: Avonlea, junto al puente del arroyo · caminando_  
**19:30** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**19:32** El Sr. Barry dice: «¿Va a la tienda de Lawson?»  
**19:32** La Srta. Josephine Barry dice: «Sí, se me acabó el azúcar. Con tanta compota...»  
**19:32** Ana entra a la salita de La Cuesta del Huerto.  
**19:32** Minnie May arde de fiebre en el sofá, y apenas puede respirar.  
**19:32** Diana entra a la salita de La Cuesta del Huerto.  
**19:33** Ana dice: «Mary Joe, pon agua a calentar. Diana, más leña en la estufa.»  
**19:34** Ana le da el jarabe de ipecacuana a cucharadas, toda la noche, sin parar.  
**19:35** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**19:35** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**19:35** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**19:35** Ana dice: «¡Ya respira mejor! ¡Diana, ya respira mejor!»  
**19:36** Al otro día, la Sra. Barry viene con los ojos llenos de lágrimas. La Sra. Barry dice: «Ana, el doctor dice que salvaste a Minnie May. Me porté muy mal contigo. Perdóname, y sé amiga de Diana como antes.»  
**19:38** Ana no cabe en sí de felicidad. Y dice: «¡Oh, Sra. Barry! La perdono con toda mi alma.»  
**19:40** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**19:40** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**19:40** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  

</details>

## El pastel con linimento (una cadena del libro) (meta 67: cumplida, cumplida)

**Lo que debería pasar:** La Sra. Allan viene a tomar el té a Tejas Verdes, invitada por Marilla. Ana sirve su pastel; la Sra. Allan lo prueba con valentía. Marilla descubre que Ana le puso linimento anodino en vez de vainilla. Ana sale a llorar, y la Sra. Allan la consuela y la invita a la casa parroquial.

- ✔ La Sra. Allan llega a la cocina de Tejas Verdes. — 2 de 2 veces · 15:40, 32 min
- ✔ Ana sirve su pastel. — 2 de 2 veces · 15:42, hasta el final
- ✔ Marilla descubre el linimento. — 2 de 2 veces · 15:46, hasta el final
- ✔ La Sra. Allan la consuela y la invita. — 2 de 2 veces · 15:49, 22 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (79 líneas)</summary>

**15:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**15:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**15:00** Al empezar, la Sra. Allan está en Avonlea, junto a la iglesia.  
**15:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**15:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**15:00** _· la Sra. Allan: Avonlea, junto a la iglesia · caminando_  
**15:00** Marilla se levanta.  
**15:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**15:00** La Sra. Allan dice: «¡Buenas tardes!»  
**15:00** Una granjera dice: «¡Buenas tardes! ¿Cómo están todos en casa?»  
**15:01** La Sra. Allan dice: «¡Buenas tardes! ¿Ya supo lo de la vaca de los Cuthbert?»  
**15:02** Una granjera dice: «¡Si lo sabe todo Avonlea! Esa vaca es más lista que el Sr. Harrison.»  
**15:03** La Sra. Allan dice: «¿Va a la tienda de Lawson?»  
**15:04** Una granjera dice: «Sí, se me acabó el azúcar. Con tanta compota...»  
**15:05** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:05** _· la Sra. Allan: Avonlea, junto a la iglesia · de pie_  
**15:05** La Sra. Allan dice: «Bueno, me voy, que tengo que visitar a Marilla.»  
**15:10** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:10** _· la Sra. Allan: Avonlea, no lejos de la colina · caminando_  
**15:15** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:15** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:15** _· la Sra. Allan: Avonlea, junto al salón del pueblo · caminando_  
**15:20** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:20** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:20** _· la Sra. Allan: Avonlea, no lejos de la aldea · caminando_  
**15:21** La Sra. Allan está en Avonlea, no lejos de la escuela.  
**15:21** La Sra. Allan dice: «¡Buenas tardes!»  
**15:22** Una granjera dice: «¡Buenas tardes! ¿Cómo están todos en casa?»  
**15:23** La Sra. Allan dice: «Qué lindo día para tender la ropa.»  
**15:24** Una granjera dice: «Ya lo creo. Y ayer que no paró de llover.»  
**15:24** La Sra. Allan dice: «¿Cómo vienen las papas este año?»  
**15:25** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:25** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:25** _· la Sra. Allan: Avonlea, no lejos de la escuela · de pie_  
**15:25** Una granjera dice: «Buenas, si no llueve demasiado.»  
**15:26** La Sra. Allan dice: «Bueno, me voy, que tengo que visitar a Marilla.»  
**15:30** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:30** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:30** _· la Sra. Allan: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**15:35** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:35** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:35** _· la Sra. Allan: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**15:40** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:40** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:40** _· la Sra. Allan: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**15:40** La Sra. Allan entra a la cocina de Tejas Verdes, junto a la puerta.  
**15:40** La Sra. Allan empieza a visitar a Marilla; con el té.  
**15:40** La Sra. Allan dice: «Buenas tardes, Marilla. Vine a visitarla.»  
**15:41** Marilla dice: «¡Pasa, pasa! Siéntate, que pongo la tetera.»  
**15:41** La Sra. Allan está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta; con el té.  
**15:42** Ana sirve su pastel en capas, con mermelada roja entre las capas.  
**15:43** La Sra. Allan prueba un bocado… y pone una cara rara. Pero sigue comiendo, con valentía.  
**15:44** Marilla dice: «Ana Shirley, ¿qué le pusiste a este pastel?»  
**15:45** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:45** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:45** _· la Sra. Allan: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · visitar a Marilla · con el té_  
**15:45** Ana dice: «Vainilla, Marilla… solo vainilla.»  
**15:46** Marilla trae el frasco y lo huele. Y dice: «¡Linimento anodino! Se me rompió la botella la semana pasada y guardé lo que quedaba en el frasco viejo de vainilla.»  
**15:48** Ana sale corriendo y se tira en su cama a llorar. Y dice: «¡Nunca podré borrar esta vergüenza!»  
**15:49** La Sra. Allan sube a verla. Y dice: «Querida, fue un error muy gracioso, nada más. Ahora muéstrame tus flores… y ven un día a tomar el té a la casa parroquial.»  
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
**16:10** _· Ana: la cocina de Tejas Verdes · de pie_  
**16:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:10** _· la Sra. Allan: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · visitar a Marilla · con el té_  
**16:11** La Sra. Allan se levanta; termina de visitar a Marilla.  
**16:12** La Sra. Allan sale, junto a la iglesia.  

</details>

## La tía Josephine (una cadena del libro) (meta 68: cumplida, cumplida)

**Lo que debería pasar:** Ana va a casa de Diana. Diana la invita a quedarse a dormir después del concierto; esa noche saltan sobre la cama del cuarto de huéspedes, donde dormía la tía Josephine. Ana confiesa que fue culpa suya, y la tía Josephine se ríe y se hace su amiga.

- ✔ Ana entra a La Cuesta del Huerto. — 2 de 2 veces · 16:16, hasta el final
- ✔ Diana la invita a quedarse a dormir. — 2 de 2 veces · 16:16, 21 min
- ✔ Saltan sobre la cama… y hay alguien. — 2 de 2 veces · 16:20, 17 min
- ✔ Ana confiesa. — 2 de 2 veces · 16:23, 13 min

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
**16:15** Minnie May Barry dice: «¡Gané la carrera hasta el portón!»  
**16:16** Mary Joe dice: «¡Muy bien! Pero no corras tanto, que te caes.»  
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
**16:37** Diana dice: «Cuando seamos mayores tomaremos el té así todas las tardes, ¿verdad?»  
**16:37** Ana está en la salita de La Cuesta del Huerto, junto al sofá; se sienta.  
**16:37** Diana está en la salita de La Cuesta del Huerto, junto al sofá; se sienta.  

</details>

## El examen de Queen's (lo que se gana de a poco) (meta 69: cumplida, cumplida)

**Lo que debería pasar:** El primer día del verano, Marilla le recuerda a Ana que hoy es el examen de Queen's, en Charlottetown. Ana estudió lo suficiente (60 días de estudio, en su segundo año): entra, aunque no primera. Marilla está orgullosa, aunque no lo diga.

- ✔ Marilla le recuerda el examen. — 2 de 2 veces · 08:00, hasta el final
- ✔ Ana entra a Queen's. — 2 de 2 veces · 08:03, hasta el final
- ✔ Marilla, orgullosa a su manera. — 2 de 2 veces · 08:04, hasta el final

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
**08:04** Marilla dice: «Lo sabía. Aunque no te lo iba a decir, para que no te llenaras de humo.»  
**08:05** _· Ana: la cocina de Tejas Verdes · de pie_  
**08:05** _· Marilla: la cocina de Tejas Verdes · sentada_  

</details>

## Un hito de la granja (las habilidades de Ana) (meta 70: cumplida, cumplida)

**Lo que debería pasar:** Ana lava los platos; con eso llega al hito 10 de la granja, y Marilla, seca pero contenta, le reconoce que ayuda de verdad.

- ✔ Ana lava los platos. — 2 de 2 veces · 10:00, 20 min
- ✔ Marilla le reconoce lo que ayuda. — 2 de 2 veces · 19:27, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (408 líneas)</summary>

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
**10:04** Ana lleva los platos sucios.  
**10:04** Ana deja los platos sucios; con la palangana con agua.  
**10:04** Ana está en la cocina de Tejas Verdes, junto al fregadero.  
**10:05** _· Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · lavar los platos · con la palangana con agua_  
**10:05** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · caminando_  
**10:05** Marilla está en la cocina de Tejas Verdes, junto al fregadero.  
**10:10** _· Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · lavar los platos · con la palangana con agua_  
**10:10** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:15** _· Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · lavar los platos · con la palangana con agua_  
**10:15** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:16** Ana lleva una pila de platos limpios.  
**10:18** Ana deja una pila de platos limpios; con el aparador abierto.  
**10:18** Ana está en la cocina de Tejas Verdes, junto al aparador.  
**10:20** _· Ana: la cocina de Tejas Verdes, junto al aparador · de pie · lavar los platos · con el aparador abierto_  
**10:20** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:21** Ana termina de lavar los platos.  
**10:21** Ana sale, junto a Tejas Verdes.  
**10:25** _· Ana: Avonlea, junto al gallinero · caminando_  
**10:25** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:25** Ana está en Avonlea, junto al gallinero.  
**10:25** Matthew dice: «Marilla dice que hablas mucho. Bueno, a mí me gusta oírte, ¿sabes?»  
**10:28** Ana se sienta.  
**10:30** _· Ana: Avonlea, junto al gallinero · sentada_  
**10:30** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:35** _· Ana: Avonlea, junto al gallinero · sentada_  
**10:35** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:36** Ana se levanta.  
**10:40** _· Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · caminando_  
**10:40** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:42** Ana está en Avonlea, junto a Tejas Verdes.  
**10:44** Ana está en Avonlea, junto al gallinero.  
**10:45** _· Ana: Avonlea, junto al gallinero · de pie_  
**10:45** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:48** Ana está en Avonlea, junto a la entrada del campo de avena del Sr. Harrison.  
**10:50** _· Ana: Avonlea, junto a la entrada del campo de avena del Sr. Harrison · caminando_  
**10:50** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:51** Ana está en Avonlea, no lejos del campo de avena del Sr. Harrison.  
**10:52** Ana está en Avonlea, junto a la granja del Sr. Harrison.  
**10:53** El Sr. Harrison dice: «¿Esa vaca tuya se ha portado bien hoy? Más le vale.»  
**10:55** _· Ana: Avonlea, junto a la granja del Sr. Harrison · de pie_  
**10:55** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:56** Ana se sienta.  
**10:59** Ana se levanta.  
**11:00** _· Ana: Avonlea, junto a la granja del Sr. Harrison · de pie_  
**11:00** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:02** Ana está en Avonlea, junto al campo de avena del Sr. Harrison.  
**11:05** _· Ana: Avonlea, junto a los arbustos de bayas · caminando_  
**11:05** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:05** Ana está en Avonlea, junto a los arbustos de bayas.  
**11:06** Matthew dice: «Ya lo creo, ya lo creo. Anda, ve a jugar un rato, que el día está lindo.»  
**11:10** _· Ana: Avonlea, junto a Tejas Verdes · caminando_  
**11:10** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:11** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**11:15** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**11:15** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:15** Ana está en Avonlea, no lejos del campo de heno.  
**11:19** Ana está en Avonlea, no lejos de la casa de la Sra. Lynde.  
**11:20** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · de pie_  
**11:20** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:22** Ana está en Avonlea, junto a la casa de la Sra. Lynde.  
**11:25** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**11:25** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:27** Ana está en Avonlea, no lejos de la casa de la Sra. Lynde.  
**11:30** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · de pie_  
**11:30** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:33** Ana está en Avonlea, no lejos de la escuela.  
**11:35** _· Ana: Avonlea, no lejos de la escuela · caminando_  
**11:35** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:35** Ana está en Avonlea, no lejos de la aldea.  
**11:38** La Srta. Josephine Barry dice: «Buenas, si no llueve demasiado.»  
**11:38** Ana está en Avonlea, junto a la aldea.  
**11:40** _· Ana: Avonlea, junto a la aldea · caminando_  
**11:40** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:44** Ana está en Avonlea, junto al salón del pueblo.  
**11:45** _· Ana: Avonlea, junto al salón del pueblo · de pie_  
**11:45** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:48** Ana está en Avonlea, no lejos de la casa de Robert Bell.  
**11:50** _· Ana: Avonlea, no lejos de la casa de Robert Bell · caminando_  
**11:50** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:53** Una niñita dice: «¿Tú eres Ana? ¡Tienes el pelo como una zanahoria!... ¡Es bonito!»  
**11:54** Ana está en Avonlea, no lejos de la colina.  
**11:55** _· Ana: Avonlea, no lejos de la colina · de pie_  
**11:55** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:57** Ana está en Avonlea, junto a la iglesia.  
**11:59** La Sra. Pye dice: «Dicen que el nuevo pastor predica muy bonito.»  
**11:59** El Sr. Bell dice: «Y la Sra. Allan es un encanto, eso sí.»  
**12:00** _· Ana: Avonlea, junto a la iglesia · de pie_  
**12:00** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**12:00** Marilla se sienta.  
**12:01** Ana está en Avonlea, junto a la casa parroquial.  
**12:02** Ana entra a la salita de la casa parroquial, junto a la puerta.  
**12:05** _· Ana: la salita de la casa parroquial · de pie_  
**12:05** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:10** _· Ana: la salita de la casa parroquial · de pie_  
**12:10** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:14** Ana dice: «Mi imaginación no me deja quieta.»  
**12:15** _· Ana: la salita de la casa parroquial · caminando_  
**12:15** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:15** Ana sale, junto a la casa parroquial.  
**12:15** El reverendo Allan dice: «Que Dios te bendiga, Ana. ¿Te veremos el domingo en la escuela dominical?»  
**12:17** Ana está en Avonlea, junto a la iglesia.  
**12:20** _· Ana: Avonlea, junto a la iglesia · de pie_  
**12:20** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:22** Ana está en Avonlea, no lejos de la colina.  
**12:25** _· Ana: Avonlea, no lejos de la colina · de pie_  
**12:25** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:27** Ana está en Avonlea, no lejos de la casa de Robert Bell.  
**12:30** _· Ana: Avonlea, no lejos del salón del pueblo · caminando_  
**12:30** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:30** Ana está en Avonlea, junto al salón del pueblo.  
**12:31** Janet King dice: «¡Buenos días! ¿Ya supo lo de la vaca de los Cuthbert?»  
**12:31** Una señora de la aldea dice: «¡Si lo sabe todo Avonlea! Esa vaca es más lista que el Sr. Harrison.»  
**12:34** Ana está en Avonlea, junto a la aldea de Avonlea (el cruce de caminos).  
**12:35** _· Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · de pie_  
**12:35** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:38** Ana está en Avonlea, junto a la aldea.  
**12:40** _· Ana: Avonlea, no lejos de la aldea · caminando_  
**12:40** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:40** Ana está en Avonlea, no lejos de la aldea.  
**12:43** Ana está en Avonlea, no lejos de la escuela.  
**12:44** Alec King dice: «Buen día para la siega, Ana. ¡Si no llueve!»  
**12:45** _· Ana: Avonlea, no lejos de la escuela · caminando_  
**12:45** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:46** Ana está en Avonlea, no lejos de la casa de Robert Bell.  
**12:49** Ana está en Avonlea, no lejos de la casa de la Sra. Lynde.  
**12:50** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · de pie_  
**12:50** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:54** Thomas Lynde dice: «Buenas. Rachel está adentro. Ella habla por los dos, ¿sabes?»  
**12:55** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**12:55** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:55** Ana está en Avonlea, junto a la casa de la Sra. Lynde.  
**12:58** Ana está en Avonlea, no lejos del campo de heno.  
**13:00** _· Ana: Avonlea, junto al campo de heno · caminando_  
**13:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**13:02** Jerry Buote dice: «El Sr. Cuthbert me pidió que entrara la leña antes de la cena.»  
**13:04** Ana está en Avonlea, junto a Tejas Verdes.  
**13:05** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**13:05** _· Marilla: la cocina de Tejas Verdes · sentada_  
**13:05** La Sra. Lynde dice: «Marilla hizo bien en quedarse contigo, y lo digo yo, que nunca me callo lo que pienso.»  
**13:06** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**13:06** Matthew dice: «Marilla dice que hablas mucho. Bueno, a mí me gusta oírte, ¿sabes?»  
**13:10** _· Ana: la cocina de Tejas Verdes · de pie_  
**13:10** _· Marilla: la cocina de Tejas Verdes · sentada_  
**13:15** _· Ana: la cocina de Tejas Verdes · de pie_  
**13:15** _· Marilla: la cocina de Tejas Verdes · sentada_  
**13:17** Ana sale, junto a Tejas Verdes.  
**13:19** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**13:20** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**13:20** _· Marilla: la cocina de Tejas Verdes · sentada_  
**13:23** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**13:23** Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»  
**13:25** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie_  
**13:25** _· Marilla: la cocina de Tejas Verdes · sentada_  
**13:28** Ana se sienta.  
**13:30** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · sentada_  
**13:30** _· Marilla: la cocina de Tejas Verdes · sentada_  
**13:30** Marilla se levanta.  
**13:35** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · sentada_  
**13:35** _· Marilla: la cocina de Tejas Verdes · de pie_  
**13:40** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · sentada_  
**13:40** _· Marilla: la cocina de Tejas Verdes · de pie_  
**13:45** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · sentada_  
**13:45** _· Marilla: la cocina de Tejas Verdes · de pie_  
**13:50** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · sentada_  
**13:50** _· Marilla: la cocina de Tejas Verdes · de pie_  
**13:51** Ana se levanta.  
**13:55** _· Ana: Avonlea, no lejos del Camino Blanco de las Delicias · caminando_  
**13:55** _· Marilla: la cocina de Tejas Verdes · de pie_  
**13:57** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**13:59** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**14:00** _· Ana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**14:00** _· Marilla: la cocina de Tejas Verdes · de pie_  
**14:00** Marilla dice: «Hmm. Bueno, admito que hoy te has portado muy bien.»  
**14:05** _· Ana: la cocina de Tejas Verdes · de pie_  
**14:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**14:10** _· Ana: la cocina de Tejas Verdes · de pie_  
**14:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**14:12** Ana sale, junto a Tejas Verdes.  
**14:13** Ana está en Avonlea, junto a la entrada del corral de Tejas Verdes.  
**14:14** Matthew dice: «¿Viste las flores junto al camino? Bueno, pues... me hicieron pensar en ti.»  
**14:15** _· Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · de pie_  
**14:15** _· Marilla: la cocina de Tejas Verdes · de pie_  
**14:18** Ana se sienta.  
**14:20** _· Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · sentada_  
**14:20** _· Marilla: la cocina de Tejas Verdes · de pie_  
**14:23** Ana dice: «Hay tanto por hacer y tan poco tiempo... ¡y yo con tantas ideas!»  
**14:25** _· Ana: Avonlea, junto a la entrada del corral de Tejas Verdes · sentada_  
**14:25** _· Marilla: la cocina de Tejas Verdes · de pie_  
**14:26** Ana se levanta.  
**14:30** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**14:30** _· Marilla: la cocina de Tejas Verdes · de pie_  
**14:30** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**14:33** Ana está en Avonlea, no lejos de la huerta de Tejas Verdes.  
**14:35** _· Ana: Avonlea, no lejos del Camino Blanco de las Delicias · caminando_  
**14:35** _· Marilla: la cocina de Tejas Verdes · de pie_  
**14:37** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**14:39** Ana está en Avonlea, junto al Bosque Encantado.  
**14:40** _· Ana: Avonlea, junto al Bosque Encantado · de pie_  
**14:40** _· Marilla: la cocina de Tejas Verdes · de pie_  
**14:42** Ana está en Avonlea, no lejos del Bosque Encantado.  
**14:45** _· Ana: Avonlea, no lejos del Camino Blanco de las Delicias · caminando_  
**14:45** _· Marilla: la cocina de Tejas Verdes · de pie_  
**14:45** Ana está en Avonlea, no lejos del Camino Blanco de las Delicias.  
**14:48** Ana está en Avonlea, no lejos del Lago de las Aguas Brillantes.  
**14:50** _· Ana: Avonlea, no lejos del Lago de las Aguas Brillantes · caminando_  
**14:50** _· Marilla: la cocina de Tejas Verdes · de pie_  
**14:51** Ana está en Avonlea, junto al Lago de las Aguas Brillantes.  
**14:55** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · de pie_  
**14:55** _· Marilla: la cocina de Tejas Verdes · de pie_  
**14:55** Ana se sienta.  
**15:00** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · sentada_  
**15:00** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:04** Ana se levanta.  
**15:05** _· Ana: Avonlea, junto al Lago de las Aguas Brillantes · de pie_  
**15:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:09** Ana está en Avonlea, no lejos del Lago de las Aguas Brillantes.  
**15:10** _· Ana: Avonlea, no lejos del Lago de las Aguas Brillantes · de pie_  
**15:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:13** Ana está en Avonlea, no lejos del Camino Blanco de las Delicias.  
**15:15** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**15:15** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:15** Ana está en Avonlea, no lejos del puente del arroyo.  
**15:18** Ana está en Avonlea, no lejos del Bosque Encantado.  
**15:20** _· Ana: Avonlea, junto al Bosque Encantado · caminando_  
**15:20** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:20** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**15:25** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**15:25** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:27** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**15:30** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**15:30** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:33** Ana está en Avonlea, junto a los arbustos de bayas.  
**15:35** _· Ana: Avonlea, junto a los arbustos de bayas · caminando_  
**15:35** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:37** Ana está en Avonlea, junto al campo de avena del Sr. Harrison.  
**15:39** Ana entra a la casa del Sr. Harrison.  
**15:39** El Sr. Harrison dice: «No me mires la casa, que el desorden es mío.»  
**15:40** _· Ana: la casa del Sr. Harrison · de pie_  
**15:40** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:45** _· Ana: la casa del Sr. Harrison · de pie_  
**15:45** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:50** _· Ana: la casa del Sr. Harrison · de pie_  
**15:50** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:55** _· Ana: la casa del Sr. Harrison · de pie_  
**15:55** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:56** Ana sale.  
**16:00** _· Ana: Avonlea · caminando_  
**16:00** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:04** Matthew dice: «Bueno, pues... sí, es un día precioso, Ana. Ya lo creo.»  
**16:05** _· Ana: Avonlea · de pie_  
**16:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:07** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**16:07** La Sra. Lynde dice: «Ana Shirley, hablas más que un molino... pero tienes buen corazón, eso lo reconozco.»  
**16:10** _· Ana: la cocina de Tejas Verdes · de pie_  
**16:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:15** _· Ana: la cocina de Tejas Verdes · de pie_  
**16:15** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:18** Ana sale, junto a Tejas Verdes.  
**16:19** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**16:20** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**16:20** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:25** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**16:25** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:25** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**16:29** Ana está en Avonlea, junto al Bosque Encantado.  
**16:30** _· Ana: Avonlea, junto al Bosque Encantado · de pie_  
**16:30** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:31** Ana está en Avonlea, no lejos del puente del arroyo.  
**16:34** Ana está en Avonlea, junto al puente del arroyo.  
**16:35** _· Ana: Avonlea, junto al puente del arroyo · de pie_  
**16:35** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:38** Ana está en Avonlea, no lejos del huerto de los Barry.  
**16:40** _· Ana: Avonlea, no lejos del huerto de los Barry · caminando_  
**16:40** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:41** Ana está en Avonlea, junto al huerto de los Barry.  
**16:42** Mary Joe dice: «Toma, pero no le digas a nadie.»  
**16:43** Ana entra a la salita de La Cuesta del Huerto.  
**16:44** Ana está en la salita de La Cuesta del Huerto, junto a la mesita del té.  
**16:44** La Sra. Barry dice: «Saluda a Marilla de mi parte, querida.»  
**16:45** _· Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie_  
**16:45** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:50** _· Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie_  
**16:50** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:55** _· Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie_  
**16:55** _· Marilla: la cocina de Tejas Verdes · de pie_  
**16:55** Ana sale, junto a La Cuesta del Huerto.  
**16:59** Ana está en Avonlea, junto al huerto de los Barry.  
**17:00** _· Ana: Avonlea, junto al huerto de los Barry · de pie_  
**17:00** _· Marilla: la cocina de Tejas Verdes · de pie_  
**17:01** Ana está en Avonlea, no lejos del puente del arroyo.  
**17:05** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**17:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**17:05** Ana está en Avonlea, junto al puente del arroyo.  
**17:09** Ana está en Avonlea, no lejos del Bosque Encantado.  
**17:10** _· Ana: Avonlea, no lejos del Bosque Encantado · de pie_  
**17:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**17:12** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**17:15** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**17:15** _· Marilla: la cocina de Tejas Verdes · de pie_  
**17:18** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**17:20** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**17:20** _· Marilla: la cocina de Tejas Verdes · de pie_  
**17:22** Matthew dice: «Marilla dice que hablas mucho. Bueno, a mí me gusta oírte, ¿sabes?»  
**17:24** Ana se sienta.  
**17:24** Ana se levanta.  
**17:25** _· Ana: Avonlea, junto a Tejas Verdes · caminando_  
**17:25** _· Marilla: la cocina de Tejas Verdes · de pie_  
**17:25** Ana está en Avonlea, junto a los arbustos de bayas.  
**17:28** Ana está en Avonlea, junto a Tejas Verdes.  
**17:30** _· Ana: Avonlea, junto a Tejas Verdes · caminando_  
**17:30** _· Marilla: la cocina de Tejas Verdes · de pie_  
**17:33** Ana está en Avonlea, junto a los arbustos de bayas.  
**17:35** _· Ana: Avonlea, junto al campo de avena del Sr. Harrison · caminando_  
**17:35** _· Marilla: la cocina de Tejas Verdes · de pie_  
**17:36** Ana está en Avonlea, junto al campo de avena del Sr. Harrison.  
**17:39** Ana entra a la casa del Sr. Harrison.  
**17:39** El Sr. Harrison dice: «Hmpf. Buenos días... si es que son buenos.»  
**17:40** _· Ana: la casa del Sr. Harrison · de pie_  
**17:40** _· Marilla: la cocina de Tejas Verdes · de pie_  
**17:45** _· Ana: la casa del Sr. Harrison · de pie_  
**17:45** _· Marilla: la cocina de Tejas Verdes · de pie_  
**17:50** _· Ana: la casa del Sr. Harrison · de pie_  
**17:50** _· Marilla: la cocina de Tejas Verdes · de pie_  
**17:55** _· Ana: la casa del Sr. Harrison · de pie_  
**17:55** _· Marilla: la cocina de Tejas Verdes · de pie_  
**17:56** Ana dice: «Se me ocurrió una idea... ¡de esas que solo tengo yo!»  
**17:58** Ana sale.  
**18:00** _· Ana: Avonlea · de pie_  
**18:00** _· Marilla: la cocina de Tejas Verdes · de pie_  
**18:00** Marilla se sienta.  
**18:05** _· Ana: Avonlea · caminando_  
**18:05** _· Marilla: la cocina de Tejas Verdes · sentada_  
**18:08** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**18:10** _· Ana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**18:10** _· Marilla: la cocina de Tejas Verdes · sentada_  
**18:14** Ana dice: «Se me ocurrió una idea... ¡de esas que solo tengo yo!»  
**18:14** Ana sale, junto a Tejas Verdes; se sienta.  
**18:14** Ana se levanta.  
**18:15** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**18:15** _· Marilla: la cocina de Tejas Verdes · sentada_  
**18:18** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**18:20** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**18:20** _· Marilla: la cocina de Tejas Verdes · sentada_  
**18:21** Ana está en Avonlea, no lejos del Camino Blanco de las Delicias.  
**18:23** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**18:25** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**18:25** _· Marilla: la cocina de Tejas Verdes · sentada_  
**18:25** Ana está en Avonlea, junto al Bosque Encantado.  
**18:28** Ana está en Avonlea, no lejos del puente del arroyo.  
**18:30** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**18:30** _· Marilla: la cocina de Tejas Verdes · sentada_  
**18:31** Ana está en Avonlea, junto al puente del arroyo.  
**18:33** Ana está en Avonlea, no lejos del puente del arroyo.  
**18:35** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**18:35** _· Marilla: la cocina de Tejas Verdes · sentada_  
**18:37** Ana está en Avonlea, junto al huerto de los Barry.  
**18:40** _· Ana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**18:40** _· Marilla: la cocina de Tejas Verdes · sentada_  
**18:40** Ana está en Avonlea, junto a La Cuesta del Huerto.  
**18:41** Ana entra a la salita de La Cuesta del Huerto.  
**18:41** La Sra. Barry dice: «Diana habla de ti todo el día, ¿sabes?»  
**18:42** Ana está en la salita de La Cuesta del Huerto, junto a la mesita del té.  
**18:45** _· Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie_  
**18:45** _· Marilla: la cocina de Tejas Verdes · sentada_  
**18:50** _· Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie_  
**18:50** _· Marilla: la cocina de Tejas Verdes · sentada_  
**18:53** Ana sale, junto a La Cuesta del Huerto.  
**18:53** El Sr. Barry dice: «Buenas, Ana. Diana está en la casa, creo. O en el huerto.»  
**18:55** _· Ana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**18:55** _· Marilla: la cocina de Tejas Verdes · sentada_  
**18:55** Ana está en Avonlea, junto al huerto de los Barry.  
**18:58** Ana está en Avonlea, no lejos del puente del arroyo.  
**19:00** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**19:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**19:02** Ana está en Avonlea, junto al puente del arroyo.  
**19:05** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**19:05** _· Marilla: la cocina de Tejas Verdes · sentada_  
**19:07** Ana está en Avonlea, junto al Bosque Encantado.  
**19:09** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**19:10** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie_  
**19:10** _· Marilla: la cocina de Tejas Verdes · sentada_  
**19:15** _· Ana: Avonlea, no lejos del Camino Blanco de las Delicias · caminando_  
**19:15** _· Marilla: la cocina de Tejas Verdes · sentada_  
**19:15** Ana está en Avonlea, no lejos de la huerta de Tejas Verdes.  
**19:18** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**19:19** Jerry Buote dice: «El Sr. Cuthbert me pidió que entrara la leña antes de la cena.»  
**19:20** _· Ana: Avonlea, junto a Tejas Verdes · caminando_  
**19:20** _· Marilla: la cocina de Tejas Verdes · sentada_  
**19:20** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**19:20** Matthew dice: «Ya lo creo, ya lo creo. Anda, ve a jugar un rato, que el día está lindo.»  
**19:22** Ana está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta.  
**19:23** Ana dice: «¡Qué rico huele todo! Comer en esta mesa me hace sentir parte de una familia de verdad.»  
**19:24** Matthew dice: «Ya lo creo, ya lo creo. Anda, ve a jugar un rato, que el día está lindo.»  
**19:25** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada_  
**19:25** _· Marilla: la cocina de Tejas Verdes · sentada_  
**19:26** Marilla dice: «Matthew no lo dice, pero te echa de menos cuando te vas donde Diana.»  
**19:27** Marilla dice: «Ana, ya sabes dónde va cada cosa en esta cocina. Así se aprende a llevar una casa.»  
**19:29** Ana dice: «Hoy imaginé que esta mesa era un banquete en un castillo... pero esto es mucho mejor, porque es de verdad.»  

</details>

