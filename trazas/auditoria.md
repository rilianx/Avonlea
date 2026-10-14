# Auditoría de las acciones

Cada acción se corrió 3 veces; un paso está ✔ solo si salió bien todas. Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.
**Pasos que ocurren como deberían: 2 de 2.** **Acciones en que alguna regla no se cumplió: 0 de 1.**

**Las reglas que siempre deben cumplirse**, se haga lo que se haga (se revisan en cada línea del relato): quien está enfermo está en cama; nadie se queda de pie dentro de un mueble; nadie se queda dentro de las paredes de una casa; nadie está en el agua (salvo en el bote, o patinando sobre el hielo); nadie está encima de otro; los animales de la cuerda van afuera.


## Un hito de la granja (los caminos de Ana) (meta 70: cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana lava los platos; con eso llega al hito 5 de la granja, y Marilla, seca pero contenta, le reconoce que ayuda de verdad.

- ✔ Ana lava los platos. — 3 de 3 veces · 10:00, 20 min
- ✔ Marilla le reconoce lo que ayuda. — 3 de 3 veces · 11:34, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (75 líneas)</summary>

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
**10:10** _· Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · lavar los platos · con la palangana con agua_  
**10:10** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:15** _· Ana: la cocina de Tejas Verdes, junto al fregadero · de pie · lavar los platos · con la palangana con agua_  
**10:15** _· Marilla: la cocina de Tejas Verdes · caminando_  
**10:16** Ana lleva una pila de platos limpios.  
**10:18** Ana deja una pila de platos limpios; con el aparador abierto.  
**10:18** Ana está en la cocina de Tejas Verdes, junto al aparador.  
**10:20** _· Ana: la cocina de Tejas Verdes, junto al aparador · de pie · lavar los platos · con el aparador abierto_  
**10:20** _· Marilla: la cocina de Tejas Verdes · de pie_  
**10:21** Ana termina de lavar los platos.  
**10:21** Ana sale, junto a Tejas Verdes.  
**10:25** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**10:25** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:25** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**10:28** Ana está en Avonlea, junto al Camino Blanco de las Delicias.  
**10:28** Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»  
**10:30** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · de pie_  
**10:30** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:33** Ana se sienta.  
**10:35** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · sentada_  
**10:35** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:40** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · sentada_  
**10:40** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:43** Ana dice: «Hay tanto por hacer y tan poco tiempo... ¡y yo con tantas ideas!»  
**10:43** Ana se levanta.  
**10:45** _· Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando_  
**10:45** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:45** Ana está en Avonlea, no lejos del Camino Blanco de las Delicias.  
**10:49** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**10:50** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**10:50** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:55** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**10:55** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**10:56** Ana está en Avonlea, no lejos del campo de heno.  
**11:00** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**11:00** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:02** Ana está en Avonlea, junto a la casa de la Sra. Lynde.  
**11:03** Ana entra a la casa de la Sra. Lynde.  
**11:03** La Sra. Lynde dice: «Llevo cincuenta y dos cubrecamas de retazos, ¡cincuenta y dos! Y no pienso parar.»  
**11:05** _· Ana: la casa de la Sra. Lynde · de pie_  
**11:05** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:10** _· Ana: la casa de la Sra. Lynde · de pie_  
**11:10** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:15** _· Ana: la casa de la Sra. Lynde · caminando_  
**11:15** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:15** Ana sale.  
**11:20** _· Ana: Avonlea · caminando_  
**11:20** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:25** _· Ana: Avonlea · caminando_  
**11:25** _· Marilla: la cocina de Tejas Verdes, junto al fregadero · de pie_  
**11:28** Ana entra a la cocina de Tejas Verdes, junto a la puerta.  
**11:28** Ana está en la cocina de Tejas Verdes, junto a la estufa.  
**11:29** Ana ahora tiene una taza de té.  
**11:30** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie_  
**11:30** _· Marilla: la cocina de Tejas Verdes · de pie_  
**11:32** Marilla dice: «Riega la huerta antes de que caiga el sol, que las plantas lo agradecen.»  
**11:34** Marilla dice: «Ana, ya sabes dónde va cada cosa en esta cocina. Así se aprende a llevar una casa.»  
**11:35** _· Ana: la cocina de Tejas Verdes, junto a la estufa · de pie_  
**11:35** _· Marilla: la cocina de Tejas Verdes · de pie_  

</details>

