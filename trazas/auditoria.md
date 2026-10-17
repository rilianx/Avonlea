# Auditoría de las acciones

Cada acción se corrió 6 veces; un paso está ✔ solo si salió bien todas. Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.
**Pasos que ocurren como deberían: 4 de 4.** **Acciones en que alguna regla no se cumplió: 0 de 1.**

**Las reglas que siempre deben cumplirse**, se haga lo que se haga (se revisan en cada línea del relato): quien está enfermo está en cama; nadie se queda de pie dentro de un mueble; nadie se queda dentro de las paredes de una casa; nadie está en el agua (salvo en el bote, o patinando sobre el hielo); nadie está encima de otro; los animales de la cuerda van afuera.


## Matthew trae huevos (meta 20: cumplida, cumplida, cumplida, cumplida, cumplida, cumplida)

**Lo que debería pasar:** Ana le pide huevos a Matthew. Matthew va donde están las gallinas, junto al granero, se agacha a sacarlos de los nidos y los junta. Se los lleva a Ana, que los recibe.

- ✔ Matthew se agacha junto al granero, donde están las gallinas, a sacar los huevos. — 6 de 6 veces · 09:15, 8 min
- ✔ Matthew tiene los huevos. — 6 de 6 veces · 09:23, 3 min
- ✔ Se los da a Ana. — 6 de 6 veces · 09:25, 0 min
- ✔ Ana tiene los huevos. — 6 de 6 veces · 09:26, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (36 líneas)</summary>

**09:00** Al empezar, Matthew está en Avonlea, junto a la huerta de Tejas Verdes; ahora tiene 5 dólares.  
**09:00** Al empezar, Ana está en Avonlea, junto a Tejas Verdes.  
**09:00** Ana dice: «¡Matthew! ¡Espera!»  
**09:00** _· Matthew: Avonlea, junto a la huerta de Tejas Verdes · caminando_  
**09:00** _· Ana: Avonlea, junto a Tejas Verdes · de pie_  
**09:00** Matthew dice: «¿Qué pasa?»  
**09:00** Ana dice: «¿Me traerías 6 huevos?»  
**09:00** Matthew dice: «Por supuesto, querida.»  
**09:00** Ana está en Avonlea, junto a la huerta de Tejas Verdes.  
**09:00** Ana dice: «Matthew, ¿me enseña a sembrar? Quiero hacerlo bien, no a mi manera. Y quiero tener un huertito mío, chiquito.»  
**09:02** Matthew se agacha junto a la tierra y hace un surco con el dedo. Y dice: «Bueno, pues… un surco así, ¿ves? No muy hondo. Y una semilla cada tanto, no todas juntas.»  
**09:04** Ana pone las semillas una por una, contándolas en voz alta. Y dice: «…siete, ocho, nueve. ¡Ya están acostadas! ¿Mañana salen?»  
**09:05** _· Matthew: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**09:05** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**09:06** Matthew dice: «Je. No, no… Agua todos los días, y paciencia. Unas dos semanas para que asomen las hojas, y más para las flores. Las cosas que crecen se demoran, ¿sabes?»  
**09:07** Saca del bolsillo un sobrecito de papel doblado. Matthew dice: «Toma. Capuchinas. Para tu huertito… donde tú quieras.»  
**09:09** Ana dice: «¡Donde yo quiera! Oh, Matthew, es el regalo más lleno de futuro que me han hecho nunca.»  
**09:10** _· Matthew: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**09:10** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**09:10** Ana ahora tiene un sobrecito de semillas.  
**09:13** Matthew está en Avonlea, junto al gallinero.  
**09:13** Matthew empieza a recoger 6 huevos.  
**09:15** _· Matthew: Avonlea, junto al gallinero · de pie · recoger 6 huevos_  
**09:15** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**09:15** Matthew se agacha; con el canastito.  
**09:18** Matthew se levanta.  
**09:20** _· Matthew: Avonlea, junto al gallinero · de pie · recoger 6 huevos_  
**09:20** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**09:20** Matthew se agacha; con el canastito.  
**09:23** Matthew se levanta; termina de recoger 6 huevos; ahora tiene 5 dólares, 6 huevos.  
**09:25** _· Matthew: Avonlea, junto a Tejas Verdes · caminando_  
**09:25** _· Ana: Avonlea, junto a la huerta de Tejas Verdes · de pie_  
**09:25** Matthew está en Avonlea, junto a la huerta de Tejas Verdes; empieza a darle 6 huevos a Ana; con lo que entrega.  
**09:26** Matthew termina de darle 6 huevos a Ana; ahora tiene 5 dólares.  
**09:26** Ana ahora tiene 6 huevos, un sobrecito de semillas.  
**09:26** Ana dice: «Gracias.»  

</details>

