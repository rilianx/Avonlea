# Auditoría de las acciones

Cada acción se corrió 4 veces; un paso está ✔ solo si salió bien todas. Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.
**Pasos que ocurren como deberían: 3 de 3.** **Acciones en que alguna regla no se cumplió: 0 de 1.**

**Las reglas que siempre deben cumplirse**, se haga lo que se haga (se revisan en cada línea del relato): quien está enfermo está en cama; nadie se queda de pie dentro de un mueble; nadie se queda dentro de las paredes de una casa; nadie está en el agua (salvo en el bote, o patinando sobre el hielo); nadie está encima de otro; los animales de la cuerda van afuera.


## Vender la vaca (meta 0: cumplida, cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana va al granero y descuelga la cuerda de su gancho. Le pone la cuerda a la vaca y la lleva, despacio, hasta quien la compra. Hacen el trato y Ana se queda con el dinero.

- ✔ Toma la cuerda en el granero (el gallinero está al lado). — 4 de 4 veces · 09:02, 2 min
- ✔ Lleva a la vaca de la cuerda. — 4 de 4 veces · 09:07, 28 min
- ✔ Vuelve con el dinero de la venta. — 4 de 4 veces · 09:35, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (28 líneas)</summary>

**09:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**09:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**09:02** Ana está en Avonlea, junto al granero; empieza a tomar una cuerda.  
**09:02** Ana sigue, con la cuerda.  
**09:03** Ana termina de tomar una cuerda; ahora tiene una cuerda.  
**09:04** Matthew dice: «Las vacas andan contentas hoy. Será por el sol, supongo.»  
**09:04** Ana dice: «¿Qué pensarán los animales de nosotros?»  
**09:05** _· Ana: Avonlea, junto al granero · de pie_  
**09:07** Ana lleva de la cuerda a Dolly.  
**09:07** Ana está en Avonlea, junto a la entrada del corral de Tejas Verdes.  
**09:10** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**09:15** _· Ana: Avonlea, no lejos del campo de heno · caminando_  
**09:16** Ana está en Avonlea, junto a la casa de la Sra. Lynde.  
**09:16** Ana dice: «¡Hola, pequeño! ¿Cómo te llamas? Yo te diré Lord Fitzgerald.»  
**09:20** _· Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando_  
**09:25** _· Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando_  
**09:27** Una vecina dice: «Mira qué cielo. Así da gusto salir.»  
**09:28** Ana está en Avonlea, no lejos de la escuela.  
**09:28** Ana dice: «¿Qué pensarán los animales de nosotros?»  
**09:30** _· Ana: Avonlea, no lejos de la escuela · de pie_  
**09:34** El Sr. Shearer dice: «Ando apurado: me esperan en Carmody.»  
**09:34** Ana dice: «¿Le interesaría comprar esta vaca? Es buena lechera.»  
**09:34** Ana está en Avonlea, junto a la aldea.  
**09:35** _· Ana: Avonlea, junto a la aldea · de pie_  
**09:35** El Sr. Shearer dice: «Déjeme verla bien… los dientes, las patas… Sí, me conviene.»  
**09:35** Ana ahora tiene una cuerda, 20 dólares; suelta la cuerda.  
**09:35** El Sr. Shearer dice: «¡Trato hecho! Buena vaca.»  
**09:36** Ana dice: «¡Qué día para hacer algo bonito!»  

</details>

