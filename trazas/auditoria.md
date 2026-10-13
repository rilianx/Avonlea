# Auditoría de las acciones

Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.
**Pasos que ocurren como deberían: 4 de 4.** **Acciones en que alguna regla no se cumplió: 0 de 1.**

**Las reglas que siempre deben cumplirse**, se haga lo que se haga (se revisan en cada línea del relato): quien está enfermo está en cama; nadie se queda de pie dentro de un mueble; nadie se queda dentro de las paredes de una casa; nadie está en el agua (salvo en el bote, o patinando sobre el hielo); nadie está encima de otro; los animales de la cuerda van afuera.


## Escribir una carta y mandarla (meta 45: cumplida)

**Lo que debería pasar:** Ana sube a su pieza, se sienta al escritorio y escribe una carta a la Srta. Stacy, con el papel sobre el escritorio, sin apuro (una media hora). La dobla y la pone en su sobre. Después baja y va al correo (en la tienda de Lawson), y la deja para que la manden. Ya no la tiene.

- ✔ Escribe sentada al escritorio de su pieza, con la carta sobre él, una media hora. — 10:02, 25 min
- ✔ Termina con la carta en su sobre. — 10:27, 31 min
- ✔ Va al correo (en la tienda de Lawson). — 10:56, hasta el final
- ✔ La deja: ya no la tiene. — 10:58, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (46 líneas)</summary>

**10:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**10:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:00** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**10:00** Ana empieza a escribir una carta.  
**10:02** Ana entra a la pieza de Ana.  
**10:02** Ana está en la pieza de Ana, junto al escritorio; se sienta; con la banqueta y la carta sobre la mesa.  
**10:02** Ana dice: «(Ana se sienta derechita, como en la escuela, y moja la pluma.)»  
**10:04** Ana dice: «✎ Querida Srta. Stacy:»  
**10:05** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:06** Ana dice: «✎ Aquí en Tejas Verdes los cerezos están en flor.»  
**10:08** Ana dice: «Así empiezan las cartas de los libros: con el tiempo que hace. Debe ser porque es lo único que todos saben.»  
**10:10** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:11** Ana dice: «✎ Le escribo para contarle que terminé de leer el libro que nos recomendó, y que lloré en el capítulo once.»  
**10:13** Ana dice: «En realidad lloré en el diez también, pero lo del once fue más llanto. Más… literario.»  
**10:15** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:16** Ana dice: «(Tacha una palabra con tres rayas.) «Indescriptible» no: ya lo usé dos veces esta semana. La Srta. Stacy dice que una palabra gastada es como un vestido con brillo en los codos.»  
**10:18** Ana dice: «✎ Estuve pensando en lo que dijo de los adjetivos: esta carta tiene solo los indispensables. Bueno, casi.»  
**10:20** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:21** Ana dice: «(Cuenta los adjetivos con los dedos, y se le acaban los dedos.)»  
**10:23** Ana dice: «✎ Quería decirle que gracias a usted estudiar ya no me parece un castigo, sino una aventura.»  
**10:25** _· Ana: la pieza de Ana, junto al escritorio · sentada · escribir una carta · con la banqueta y la carta sobre la mesa_  
**10:26** Ana dice: «✎ Su alumna que la quiere, Ana Shirley.»  
**10:27** Ana se levanta; termina de escribir una carta; ahora tiene una carta.  
**10:27** Ana entra a la cocina de Tejas Verdes, junto a la escalera.  
**10:27** Ana sale, junto a Tejas Verdes.  
**10:27** Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»  
**10:30** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**10:35** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**10:40** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**10:45** _· Ana: Avonlea, no lejos de la escuela · caminando_  
**10:48** Janet King dice: «Qué lindo día para tender la ropa.»  
**10:48** Una granjera dice: «Ya lo creo. Y ayer que no paró de llover.»  
**10:49** Ana está en Avonlea, junto a la aldea.  
**10:49** Ana dice: «¡Buenos días, Janet King!»  
**10:50** _· Ana: Avonlea, junto a la aldea · de pie_  
**10:50** Janet King dice: «¡Qué gusto verle, Ana!»  
**10:50** Ana dice: «¿Sabía que los abedules parecen señoras de vestido blanco?»  
**10:51** Janet King dice: «Nunca lo había pensado así.»  
**10:52** Ana dice: «Vi una nube con forma de barco. Iba hacia Charlottetown.»  
**10:53** Janet King dice: «Ya lo creo, Ana. Ya lo creo.»  
**10:54** Ana dice: «Bueno, me voy, que tengo que mandar la carta por correo.»  
**10:55** _· Ana: Avonlea, junto a la aldea · de pie_  
**10:56** Ana está en Avonlea, junto a la tienda de Lawson.  
**10:57** Ana dice: «Para la Srta. Stacy, en la pensión de Avonlea.»  
**10:58** Ana ya no tiene nada.  
**11:00** _· Ana: Avonlea, junto a la aldea de Avonlea (el cruce de caminos) · caminando_  

</details>

