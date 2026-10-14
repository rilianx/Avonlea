# Auditoría de las acciones

Cada acción se corrió 2 veces; un paso está ✔ solo si salió bien todas. Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.
**Pasos que ocurren como deberían: 36 de 36.** **Acciones en que alguna regla no se cumplió: 0 de 9.**

**Las reglas que siempre deben cumplirse**, se haga lo que se haga (se revisan en cada línea del relato): quien está enfermo está en cama; nadie se queda de pie dentro de un mueble; nadie se queda dentro de las paredes de una casa; nadie está en el agua (salvo en el bote, o patinando sobre el hielo); nadie está encima de otro; los animales de la cuerda van afuera.


## Conocer a Diana (una cadena del libro) (meta 62: cumplida, cumplida)

**Lo que debería pasar:** El día antes, Ana le contó a Marilla que quería una amiga del alma. Hoy, en la tarde, Marilla va a La Cuesta del Huerto a devolverle un patrón a la Sra. Barry y lleva a Ana. La Sra. Barry las recibe en la salita y llama a Diana, que está en el jardín. Diana entra, las presentan, y Ana le pregunta si podría quererla lo bastante como para ser su amiga del alma. Diana se ríe y dice que sí.

- ✔ Marilla invita a Ana a ir con ella a La Cuesta del Huerto. — 2 de 2 veces · 14:30, 16 min
- ✔ Ana llega con Marilla a la salita de los Barry. — 2 de 2 veces · 14:54, 15 min
- ✔ La Sra. Barry las recibe y llama a Diana. — 2 de 2 veces · 14:58, hasta el final
- ✔ Diana entra a la salita. — 2 de 2 veces · 14:59, 10 min
- ✔ Ana le pregunta si podría ser su amiga del alma. — 2 de 2 veces · 15:02, 8 min
- ✔ Diana dice que sí. — 2 de 2 veces · 15:04, 6 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (70 líneas)</summary>

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
**14:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:35** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:40** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**14:40** _· Marilla: Avonlea, junto al puente del arroyo · caminando_  
**14:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:40** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:45** _· Ana: Avonlea, junto al huerto de los Barry · caminando_  
**14:45** _· Marilla: Avonlea, junto al huerto de los Barry · caminando_  
**14:45** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**14:45** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:45** Minnie May Barry dice: «¿Ya es hora de comer?»  
**14:46** Marilla entra a la salita de La Cuesta del Huerto.  
**14:46** Mary Joe dice: «Todavía no. Anda a jugar un rato.»  
**14:50** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**14:50** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**14:50** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:50** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:50** Marilla sale.  
**14:50** Marilla dice: «¡Buenas tardes, Diana!»  
**14:50** Diana dice: «¡Buenas tardes, Marilla! ¿Cómo están todos en casa?»  
**14:51** Marilla dice: «¿Va a la tienda de Lawson?»  
**14:52** Diana dice: «Sí, se me acabó el azúcar. Con tanta compota...»  
**14:53** Marilla dice: «Bueno, me voy, que tengo que ir a donde está Ana.»  
**14:54** Ana está en Avonlea, junto a La Cuesta del Huerto.  
**14:54** Ana entra a la salita de La Cuesta del Huerto.  
**14:54** Marilla entra a la salita de La Cuesta del Huerto.  
**14:54** La Sra. Lynde dice: «Marilla hizo bien en quedarse contigo, y lo digo yo, que nunca me callo lo que pienso.»  
**14:54** La Sra. Barry dice: «Buenas tardes, Marilla. ¡Qué sorpresa! Pasa, pasa. ¿Y ésta es la niña que adoptaron?»  
**14:55** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**14:55** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**14:55** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:55** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**14:56** Marilla dice: «Sí, ésta es Ana Shirley. Vengo a devolverle el patrón de la falda que me prestó.»  
**14:57** Ana dice: «Ana con e, por favor.»  
**14:58** La Sra. Barry dice: «¿Cómo estás, Ana? Diana está en el jardín. ¡Diana! Ven a conocer a la niña de los Cuthbert.»  
**14:59** Diana entra a la salita de La Cuesta del Huerto.  
**14:59** La Sra. Barry dice: «Ésta es mi hija Diana. Diana, ¿por qué no llevas a Ana al jardín y le muestras tus flores?»  
**15:00** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**15:00** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**15:00** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**15:00** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**15:01** Diana dice: «Hola… ¿quieres venir a ver el jardín?»  
**15:02** Ana mira a Diana muy seria, sin atreverse a respirar. Y dice: «Oh, Diana… ¿crees que podrías… que podrías quererme un poquito, lo bastante como para ser mi amiga del alma?»  
**15:04** Diana se ríe; Diana siempre se ríe antes de hablar. Y dice: «Bueno, creo que sí. Me alegro mucho de que hayas venido a vivir a Tejas Verdes. Va a ser tan lindo tener a alguien con quien jugar.»  
**15:05** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**15:05** _· Marilla: la salita de La Cuesta del Huerto · de pie_  
**15:05** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**15:05** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**15:08** Diana dice: «¿Vienes conmigo a la escuela? Está junto al río. Te presento a todos.»  
**15:09** Marilla dice: «¿Dijiste tus oraciones anoche, Ana? Junto a la cama, como corresponde.»  
**15:09** Marilla entra a la cocina de Tejas Verdes.  
**15:09** Ana sale.  
**15:09** Diana sale.  
**15:10** _· Ana: Avonlea · caminando_  
**15:10** _· Marilla: la cocina de Tejas Verdes · de pie_  
**15:10** _· Diana: Avonlea · caminando_  
**15:10** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  

</details>

## «¡Zanahorias!» (una cadena del libro) (meta 63: cumplida, cumplida)

**Lo que debería pasar:** El primer día de Ana en la escuela, Gilbert Blythe le toma una trenza y le dice «¡Zanahorias!». Ana se pone de pie, furiosa, y le parte la pizarra en la cabeza. Gilbert le pide perdón; Ana jura que nunca lo perdonará.

- ✔ Ana entra a la escuela. — 2 de 2 veces · 10:21, 15 min
- ✔ Gilbert le dice «¡Zanahorias!». — 2 de 2 veces · 10:21, 8 min
- ✔ Ana le parte la pizarra en la cabeza. — 2 de 2 veces · 10:25, 11 min
- ✔ Ana jura no perdonarlo nunca. — 2 de 2 veces · 10:27, 9 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (31 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** Al empezar, Gilbert Blythe está en la escuela de Avonlea; se sienta.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:05** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**10:05** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:10** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**10:10** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:15** _· Ana: Avonlea, no lejos de la casa de Robert Bell · caminando_  
**10:15** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:15** Una vecina dice: «¡Qué grande estás, niña! Saludos a Marilla.»  
**10:20** _· Ana: Avonlea, no lejos de la escuela · caminando_  
**10:20** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:21** Una granjera dice: «Lindo día, ¿verdad? Dicen que mañana llueve.»  
**10:21** Ana está en Avonlea, junto a la escuela.  
**10:21** Ana entra a la escuela de Avonlea.  
**10:21** Gilbert Blythe alarga la mano, toma la punta de una trenza de Ana y susurra, lo bastante fuerte para que lo oiga toda la clase. Y dice: «¡Zanahorias! ¡Zanahorias!»  
**10:23** Ana se pone de pie de un salto, con los ojos echando chispas. Y dice: «¡Odioso, malvado! ¿Cómo te atreves?»  
**10:25** _· Ana: la escuela de Avonlea · de pie_  
**10:25** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:25** ¡Crac! Ana le parte la pizarra en la cabeza a Gilbert.  
**10:26** Gilbert Blythe dice: «¡Ay! Perdona, Ana… solo era una broma. De verdad, perdóname.»  
**10:27** Ana dice: «¡Nunca te lo perdonaré! ¡Nunca jamás!»  
**10:30** _· Ana: la escuela de Avonlea · de pie_  
**10:30** _· Gilbert Blythe: la escuela de Avonlea · sentado_  
**10:30** Gilbert Blythe sale; se levanta.  
**10:35** _· Ana: la escuela de Avonlea · de pie_  
**10:35** _· Gilbert Blythe: Avonlea · caminando_  
**10:36** Ana sale; se sienta.  
**10:36** Ana se levanta.  
**10:36** Moody Spurgeon dice: «Ayer el maestro me dejó sin recreo. Fue injusto, aunque sí me reí en la oración.»  

</details>

## El broche de amatista (una cadena del libro) (meta 64: cumplida, cumplida)

**Lo que debería pasar:** Marilla no encuentra su broche de amatista y culpa a Ana, que lo había visto. Ana, para poder ir al picnic, inventa que lo perdió en el lago. Entonces el broche aparece enganchado en el chal de Marilla, que le pide perdón y la deja ir al picnic.

- ✔ Marilla pregunta por su broche. — 2 de 2 veces · 10:00, 15 min
- ✔ Ana inventa una confesión. — 2 de 2 veces · 10:04, 12 min
- ✔ El broche aparece en el chal de Marilla. — 2 de 2 veces · 10:06, 8 min
- ✔ Marilla le pide perdón y la deja ir al picnic. — 2 de 2 veces · 10:10, 5 min

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
**10:16** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  

</details>

## El té con Diana y el vino de grosellas (una cadena del libro) (meta 65: cumplida, cumplida)

**Lo que debería pasar:** Ana invita a Diana a tomar el té en Tejas Verdes. Se sientan a la mesa y Ana le sirve lo que cree que es cordial de frambuesa. Diana toma tres vasos, dice que se siente rara y se va a su casa tambaleándose.

- ✔ Diana llega a la cocina de Tejas Verdes. — 2 de 2 veces · 16:09, 8 min
- ✔ Se sientan a tomar el té. — 2 de 2 veces · 16:09, 8 min
- ✔ Ana le sirve el «cordial». — 2 de 2 veces · 16:09, 8 min
- ✔ Diana se siente muy mal. — 2 de 2 veces · 16:16, 1 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (124 líneas)</summary>

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
**13:30** Matthew dice: «Tú le pones nombre a todo, Ana. Bueno, pues… ¿cómo le dirías al estanque de los Barry?»  
**13:35** _· Ana: Avonlea, no lejos del Camino Blanco de las Delicias · caminando_  
**13:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · caminando_  
**13:35** Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»  
**13:40** _· Ana: Avonlea, no lejos del puente del arroyo · caminando_  
**13:40** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:43** Ana está en Avonlea, junto al puente del arroyo.  
**13:43** Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»  
**13:45** _· Ana: Avonlea, junto al puente del arroyo · de pie_  
**13:45** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:48** Ana dice: «¡Diana! ¡Espera!»  
**13:48** Diana dice: «¿Me llamabas?»  
**13:49** Ana está en Avonlea, junto al huerto de los Barry.  
**13:49** Ana dice: «¿Vendrías a tomar el té conmigo esta tarde, a las 17:00? En la cocina de Tejas Verdes.»  
**13:50** _· Ana: Avonlea, junto al huerto de los Barry · de pie_  
**13:50** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:50** Diana dice: «¡Sí, me encantaría! Allí estaré.»  
**13:55** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**13:55** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**13:55** Ana está en Avonlea, junto al puente del arroyo.  
**14:00** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**14:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:05** _· Ana: Avonlea, no lejos del Camino Blanco de las Delicias · caminando_  
**14:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:07** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**14:07** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**14:10** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**14:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:11** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**14:15** _· Ana: la cocina de Tejas Verdes · de pie_  
**14:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:20** _· Ana: la cocina de Tejas Verdes · de pie_  
**14:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**14:23** Marilla dice: «Rachel Lynde dice que todavía no la has ido a ver. Es mejor ir que dar que hablar.»  
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
**14:50** Marilla dice: «Riega la huerta antes de que caiga el sol, que las plantas lo agradecen.»  
**14:55** _· Ana: la cocina de Tejas Verdes · de pie_  
**14:55** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:00** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:00** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:05** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:05** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:10** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:10** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:14** Marilla dice: «Matthew no lo dice, pero te echa de menos cuando te vas donde Diana.»  
**15:15** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:15** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:20** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:20** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:25** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:25** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:30** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:30** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:35** _· Ana: la cocina de Tejas Verdes · de pie_  
**15:35** _· Diana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**15:37** Marilla dice: «Hmm. Bueno, admito que hoy te has portado muy bien.»  
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
**16:01** Marilla dice: «Si quieres cocinar, la estufa está encendida. Cuidado con no quemar nada esta vez.»  
**16:05** _· Ana: la cocina de Tejas Verdes · de pie_  
**16:05** _· Diana: Avonlea, junto al Bosque Encantado · caminando_  
**16:09** Diana entra a la cocina de Tejas Verdes, junto a la puerta.  
**16:09** Ana está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta; empieza a tomar el té con Diana; con el té.  
**16:09** Ana dice: «Toma otro vaso de cordial de frambuesa, Diana. Es de Marilla, y es buenísimo.»  
**16:09** Ana dice: «¿Un poco más de té? Y prueba estas galletas.»  
**16:09** Diana está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta; empieza a tomar el té con Ana; con el té.  
**16:10** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · tomar el té con Diana · con el té_  
**16:10** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · tomar el té con Ana · con el té_  
**16:10** Diana dice: «Es el cordial más rico que he probado. Mucho más rico que el de la Sra. Lynde. (Diana se sirve el tercer vaso.)»  
**16:12** Ana le cuenta a Diana cómo se le cayó un ratón en la salsa de ciruela, con todos los detalles.  
**16:12** Diana dice: «¡Están deliciosas! Es como estar en un libro.»  
**16:13** Diana dice: «Ana… me siento… me siento rara. Creo que me voy a casa.»  
**16:14** Ana dice: «¿A casa? ¡Pero si todavía no hemos tomado el té! ¡Diana, no te vayas!»  
**16:15** _· Ana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · tomar el té con Diana · con el té_  
**16:15** _· Diana: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · tomar el té con Ana · con el té_  
**16:15** Ana dice: «Cuéntame qué estás leyendo ahora.»  
**16:16** Diana se levanta tambaleándose. Y dice: «Me siento… muy… muy mal.»  
**16:17** Diana se levanta; termina de tomar el té con Ana.  
**16:17** Diana sale, junto a Tejas Verdes.  
**16:17** Ana se levanta; termina de tomar el té con Diana.  
**16:18** Ana sale, junto a Tejas Verdes.  
**16:18** Matthew dice: «Bueno, pues… a Marilla le gustan las cosas hechas a mano, ¿sabes? No lo dice, pero le gustan.»  

</details>

## Minnie May y el crup (una cadena del libro) (meta 66: cumplida, cumplida)

**Lo que debería pasar:** Diana tiene prohibido ver a Ana. Una noche llega corriendo a Tejas Verdes: Minnie May tiene crup. Ana toma el jarabe de ipecacuana y corre con ella a La Cuesta del Huerto, donde cuida a Minnie May toda la noche. Al otro día, la Sra. Barry le pide perdón.

- ✔ Diana llega corriendo a la cocina de Tejas Verdes. — 2 de 2 veces · 19:19, 5 min
- ✔ Diana avisa que Minnie May tiene crup. — 2 de 2 veces · 19:19, 4 min
- ✔ Ana corre a La Cuesta del Huerto. — 2 de 2 veces · 19:32, hasta el final
- ✔ Ana la cuida hasta que respira mejor. — 2 de 2 veces · 19:36, hasta el final
- ✔ La Sra. Barry le pide perdón. — 2 de 2 veces · 19:37, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (55 líneas)</summary>

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
**19:17** Jerry Buote dice: «Bueno, pero yo no cuento esta vez.»  
**19:17** Diana dice: «Bueno, me voy, que tengo que ir a la cocina de Tejas Verdes.»  
**19:19** Diana entra a la cocina de Tejas Verdes, junto a la puerta.  
**19:19** Diana dice: «¡Ana! ¡Ven, por favor! Minnie May está enferma… tiene crup. Papá y mamá fueron al pueblo, y Mary Joe no sabe qué hacer.»  
**19:20** _· Ana: la cocina de Tejas Verdes · de pie_  
**19:20** _· Diana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**19:20** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  
**19:20** Ana dice: «¡Crup! Yo cuidé a los mellizos de la Sra. Hammond… tres veces tuvieron crup. Tengo el jarabe de ipecacuana.»  
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
**19:32** El Sr. Barry dice: «Qué lindo día para tender la ropa.»  
**19:32** Ana entra a la salita de La Cuesta del Huerto.  
**19:32** Minnie May arde de fiebre en el sofá, y apenas puede respirar.  
**19:32** Diana entra a la salita de La Cuesta del Huerto.  
**19:33** Ana dice: «Mary Joe, pon agua a calentar. Diana, más leña en la estufa.»  
**19:34** Ana le da el jarabe de ipecacuana a cucharadas, toda la noche, sin parar.  
**19:35** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**19:35** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**19:35** _· la Sra. Barry: la salita de La Cuesta del Huerto, junto a la mesita del té · caminando_  
**19:36** Ana dice: «¡Ya respira mejor! ¡Diana, ya respira mejor!»  
**19:37** Al otro día, la Sra. Barry viene con los ojos llenos de lágrimas. La Sra. Barry dice: «Ana, el doctor dice que salvaste a Minnie May. Me porté muy mal contigo. Perdóname, y sé amiga de Diana como antes.»  
**19:38** Ana no cabe en sí de felicidad. Y dice: «¡Oh, Sra. Barry! La perdono con toda mi alma.»  
**19:40** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**19:40** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**19:40** _· la Sra. Barry: la salita de La Cuesta del Huerto · de pie_  

</details>

## El pastel con linimento (una cadena del libro) (meta 67: cumplida, cumplida)

**Lo que debería pasar:** La Sra. Allan viene a tomar el té a Tejas Verdes, invitada por Marilla. Ana sirve su pastel; la Sra. Allan lo prueba con valentía. Marilla descubre que Ana le puso linimento anodino en vez de vainilla. Ana sale a llorar, y la Sra. Allan la consuela y la invita a la casa parroquial.

- ✔ La Sra. Allan llega a la cocina de Tejas Verdes. — 2 de 2 veces · 15:28, 32 min
- ✔ Ana sirve su pastel. — 2 de 2 veces · 15:30, hasta el final
- ✔ Marilla descubre el linimento. — 2 de 2 veces · 15:34, hasta el final
- ✔ La Sra. Allan la consuela y la invita. — 2 de 2 veces · 15:37, 22 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (58 líneas)</summary>

**15:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**15:00** Al empezar, Marilla está en la cocina de Tejas Verdes; se sienta.  
**15:00** Al empezar, la Sra. Allan está en Avonlea, junto a la iglesia.  
**15:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**15:00** _· Marilla: la cocina de Tejas Verdes · sentada_  
**15:00** _· la Sra. Allan: Avonlea, junto a la iglesia · caminando_  
**15:00** Marilla se levanta.  
**15:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
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
**16:00** La Sra. Allan se levanta; termina de visitar a Marilla.  
**16:00** La Sra. Allan sale, junto a la iglesia.  

</details>

## La tía Josephine (una cadena del libro) (meta 68: cumplida, cumplida)

**Lo que debería pasar:** Ana va a casa de Diana. Diana la invita a quedarse a dormir después del concierto; esa noche saltan sobre la cama del cuarto de huéspedes, donde dormía la tía Josephine. Ana confiesa que fue culpa suya, y la tía Josephine se ríe y se hace su amiga.

- ✔ Ana entra a La Cuesta del Huerto. — 2 de 2 veces · 16:22, hasta el final
- ✔ Diana la invita a quedarse a dormir. — 2 de 2 veces · 16:22, hasta el final
- ✔ Saltan sobre la cama… y hay alguien. — 2 de 2 veces · 16:26, hasta el final
- ✔ Ana confiesa. — 2 de 2 veces · 16:29, 13 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (39 líneas)</summary>

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
**16:15** Minnie May Barry dice: «¿Ya es hora de comer?»  
**16:15** Mary Joe dice: «Todavía no. Anda a jugar un rato.»  
**16:16** Ana está en Avonlea, junto a La Cuesta del Huerto.  
**16:16** Ana dice: «¡Buenas tardes, Mary Joe!»  
**16:17** Mary Joe dice: «¡Qué gusto verle, Ana!»  
**16:17** Ana dice: «Hoy el lago brillaba como si tuviera estrellas adentro.»  
**16:18** Mary Joe dice: «¡Qué imaginación tienes, niña!»  
**16:19** Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»  
**16:20** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**16:20** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**16:20** Mary Joe dice: «Nunca lo había pensado así.»  
**16:21** Ana dice: «Bueno, me voy, que tengo que ir a La Cuesta del Huerto.»  
**16:22** Ana entra a la salita de La Cuesta del Huerto.  
**16:22** Diana dice: «¡Ana! Esta noche hay concierto del Club de Debate en el salón. Mamá dice que puedes quedarte a dormir… ¡en el cuarto de huéspedes!»  
**16:24** Esa noche, al volver del concierto, las niñas corren por el pasillo. Ana dice: «¡A la que llegue última a la cama!»  
**16:25** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**16:25** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**16:26** Las dos saltan sobre la cama del cuarto de huéspedes… Diana dice: «¡Ay! ¡Hay alguien en la cama!»  
**16:28** Diana dice: «Es… es la tía Josephine, de Charlottetown. ¡Ahora sí que nos va a pasar algo terrible!»  
**16:29** A la mañana siguiente, Ana va a verla. Ana dice: «Fue culpa mía, Srta. Barry. Diana no tuvo la culpa. Y usted no sabe lo que es tener tanta imaginación.»  
**16:30** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**16:30** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**16:35** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**16:35** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**16:40** _· Ana: la salita de La Cuesta del Huerto · de pie_  
**16:40** _· Diana: la salita de La Cuesta del Huerto · de pie_  
**16:42** Ana dice: «¡Qué día para hacer algo bonito!»  
**16:43** Ana está en la salita de La Cuesta del Huerto, junto a la mesita del té.  
**16:43** La Sra. Barry dice: «Ana Shirley, siempre es un gusto verte por aquí. Pórtate bien, ¿eh?»  

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
- ✔ Marilla le reconoce lo que ayuda. — 2 de 2 veces · 12:20, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (119 líneas)</summary>

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
**10:05** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:08** Marilla está en la cocina de Tejas Verdes, junto al fregadero.  
**10:10** _· Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · lavar los platos · con la palangana con agua_  
**10:10** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · caminando_  
**10:15** _· Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · lavar los platos · con la palangana con agua_  
**10:15** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:16** Ana lleva una pila de platos limpios.  
**10:18** Ana deja una pila de platos limpios; con el aparador abierto.  
**10:18** Ana está en la cocina de Tejas Verdes, junto al aparador.  
**10:20** _· Ana: la cocina de Tejas Verdes, junto al aparador · de pie · lavar los platos · con el aparador abierto_  
**10:20** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:21** Ana termina de lavar los platos.  
**10:21** Ana sale, junto a Tejas Verdes.  
**10:24** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**10:25** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**10:25** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:27** Ana está en Avonlea, no lejos del Camino Blanco de las Delicias.  
**10:29** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**10:29** Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»  
**10:30** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie_  
**10:30** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:31** Ana se sienta.  
**10:31** Ana se levanta.  
**10:35** _· Ana: Avonlea, junto al Bosque Encantado · caminando_  
**10:35** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:35** Ana está en Avonlea, junto al Bosque Encantado.  
**10:38** Ana está en Avonlea, junto al puente del arroyo.  
**10:40** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**10:40** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:41** Ana se sienta.  
**10:45** _· Ana: Avonlea, junto al puente del arroyo · sentada_  
**10:45** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:50** _· Ana: Avonlea, junto al puente del arroyo · sentada_  
**10:50** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:54** Ana dice: «Se me ocurrió una idea... ¡de esas que solo tengo yo!»  
**10:54** Ana se levanta.  
**10:55** _· Ana: Avonlea, junto al puente del arroyo · caminando_  
**10:55** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:57** Ana está en Avonlea, no lejos del puente del arroyo.  
**11:00** _· Ana: Avonlea, no lejos del huerto de los Barry · caminando_  
**11:00** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:00** Ana está en Avonlea, no lejos del huerto de los Barry.  
**11:02** Mary Joe dice: «La señora Barry dice que tienda la ropa antes de que se nuble.»  
**11:03** Ana está en Avonlea, junto a La Cuesta del Huerto.  
**11:03** Diana dice: «Hola… ¿Tú eres la niña que vino a vivir a Tejas Verdes?»  
**11:04** Ana dice: «Sí… soy Ana. Ana con e. ¿Y tú… tú eres Diana Barry?»  
**11:05** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:05** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:05** Ana se sienta.  
**11:05** Diana dice: «Sí. Mamá dice que eres muy rara. Pero no pareces rara. Bueno, un poquito.»  
**11:06** Ana se pone colorada hasta las orejas. Y dice: «Tengo una imaginación muy grande, eso es todo. ¿Te… te gustaría que algún día jugáramos juntas?»  
**11:08** Diana dice: «Bueno… tal vez. Tengo que volver a casa ahora.»  
**11:09** Ana se levanta.  
**11:09** Minnie May Barry dice: «Diana no me deja jugar con sus muñecas. ¿Tú me dejas?»  
**11:09** Ana entra a la salita de La Cuesta del Huerto.  
**11:09** Ana está en la salita de La Cuesta del Huerto, junto a la mesita del té.  
**11:10** _· Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie_  
**11:10** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:10** La Sra. Barry dice: «Saluda a Marilla de mi parte, querida.»  
**11:15** _· Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie_  
**11:15** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:20** _· Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie_  
**11:20** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:22** Ana sale, junto a La Cuesta del Huerto.  
**11:25** _· Ana: Avonlea, junto a La Cuesta del Huerto · de pie_  
**11:25** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:27** Ana está en Avonlea, no lejos del huerto de los Barry.  
**11:29** Ana está en Avonlea, no lejos del puente del arroyo.  
**11:30** _· Ana: Avonlea, no lejos del puente del arroyo · de pie_  
**11:30** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:32** Ana está en Avonlea, junto al puente del arroyo.  
**11:35** _· Ana: Avonlea, no lejos del Bosque Encantado · caminando_  
**11:35** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:35** Ana está en Avonlea, no lejos del Bosque Encantado.  
**11:38** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**11:40** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**11:40** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:42** Ana está en Avonlea, no lejos del Camino Blanco de las Delicias.  
**11:44** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**11:45** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**11:45** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:48** Ana se sienta.  
**11:50** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · sentada_  
**11:50** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:55** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · sentada_  
**11:55** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**12:00** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · sentada_  
**12:00** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**12:00** Marilla se sienta.  
**12:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · sentada_  
**12:05** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:06** Ana dice: «¡A ver qué descubro por ahí!»  
**12:06** Ana se levanta.  
**12:08** Jerry Buote dice: «Oui, oui... ya voy, ya voy. ¡Esa vaca no se quiere mover!»  
**12:09** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**12:10** _· Ana: la cocina de Tejas Verdes, junto a la puerta · de pie_  
**12:10** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:10** Matthew dice: «Bueno, pues... sí, es un día precioso, Ana. Ya lo creo.»  
**12:15** _· Ana: la cocina de Tejas Verdes · de pie_  
**12:15** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:18** Ana está en la cocina de Tejas Verdes, junto a la mesa.  
**12:18** Marilla dice: «Matthew no lo dice, pero te echa de menos cuando te vas donde Diana.»  
**12:20** _· Ana: la cocina de Tejas Verdes, junto a la mesa · de pie_  
**12:20** _· Marilla: la cocina de Tejas Verdes · sentada_  
**12:20** Marilla dice: «Ana, ya sabes dónde va cada cosa en esta cocina. Así se aprende a llevar una casa.»  

</details>

