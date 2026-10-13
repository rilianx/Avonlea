# Auditoría de las acciones

Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.
**Pasos que ocurren como deberían: 5 de 5.** **Acciones en que alguna regla no se cumplió: 0 de 2.**

**Las reglas que siempre deben cumplirse**, se haga lo que se haga (se revisan en cada línea del relato): quien está enfermo está en cama; nadie se queda de pie dentro de un mueble; nadie se queda dentro de las paredes de una casa; nadie está en el agua (salvo en el bote, o patinando sobre el hielo); nadie está encima de otro; los animales de la cuerda van afuera.


## El vestido de mangas abullonadas (meta 38: cumplida)

**Lo que debería pasar:** Marilla quiere coserle un vestido a Ana. Le traen la tela de la tienda. Marilla se sienta junto a la ventana de la cocina y cose, sin apuro, un buen rato, hasta que el vestido está listo.

- ✔ Marilla tiene la tela. — 10:35, 41 min
- ✔ Cose sentada junto a la ventana, un buen rato. — 10:36, 40 min
- ✔ El vestido está listo. — 11:16, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (77 líneas)</summary>

```
10:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
10:00 Al empezar, Marilla está en Avonlea, junto a Tejas Verdes.
10:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
10:00 · Marilla: Avonlea, junto a Tejas Verdes · de pie
10:00 Marilla dice: «¿Me traerías un corte de tela?»
10:00 Marilla dice: «Riega la huerta antes de que caiga el sol, que las plantas lo agradecen.»
10:00 Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»
10:01 Ana dice: «Sí, cómo no. Ahora mismo.»
10:01 Marilla entra a la cocina de Tejas Verdes, junto a la puerta.
10:05 · Ana: Avonlea, no lejos del campo de heno · caminando
10:05 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:10 · Ana: Avonlea, no lejos de la casa de la Sra. Lynde · caminando
10:10 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:10 Ana está en Avonlea, no lejos de la casa de Robert Bell.
10:10 Ana dice: «¿Qué pensarán los animales de nosotros?»
10:12 Una vecina dice: «¡Buenos días, Ana! ¿Cómo están Matthew y Marilla?»
10:15 · Ana: Avonlea, no lejos de la aldea · caminando
10:15 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:18 Ana entra a la tienda de Lawson.
10:18 El Sr. Lawson dice: «¡Buenos días, Ana! Llegaron caramelos de menta y cintas nuevas.»
10:18 Ana dice: «Buenos días, Sr. Lawson. ¿Me daría un corte de tela? A la libreta de los Cuthbert.»
10:19 El Sr. Lawson dice: «Cómo no, aquí tengo una. Un momento…»
10:19 Ana ahora tiene un corte de tela.
10:19 El Sr. Lawson dice: «Anotado en la libreta de los Cuthbert. Saludos a Marilla.»
10:19 Ana sale.
10:20 · Ana: Avonlea · caminando
10:20 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:25 · Ana: Avonlea · caminando
10:25 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:30 · Ana: Avonlea · caminando
10:30 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:34 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
10:34 Ana empieza a darle un corte de tela a Marilla; con lo que entrega.
10:34 Marilla dice: «Matthew no lo dice, pero te echa de menos cuando te vas donde Diana.»
10:35 · Ana: la cocina de Tejas Verdes, junto a la puerta · de pie · darle un corte de tela a Marilla · con lo que entrega
10:35 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
10:35 Ana termina de darle un corte de tela a Marilla; ya no tiene nada.
10:35 Marilla ahora tiene un corte de tela.
10:35 Marilla dice: «Gracias.»
10:35 Marilla empieza a coser un vestido con mangas abullonadas.
10:35 Marilla dice: «Coso el vestido… y le pongo unas mangas abullonadas, como las que usan ahora.»
10:36 Ana dice: «Se me ocurrió una idea... ¡de esas que solo tengo yo!»
10:36 Ana sale, junto a Tejas Verdes.
10:36 Marilla está en la cocina de Tejas Verdes, junto a la silla de la ventana; se sienta; con la costura.
10:37 Ana está en Avonlea, junto a la huerta de Tejas Verdes.
10:40 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
10:40 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura
10:42 Ana está en Avonlea, junto al Camino Blanco de las Delicias.
10:42 Ana dice: «El Camino Blanco de las Delicias... cada vez que paso me dan ganas de hablar en voz baja, como en una iglesia.»
10:44 Ana se sienta.
10:44 Ana se levanta.
10:45 · Ana: Avonlea, junto al Camino Blanco de las Delicias · caminando
10:45 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura
10:47 Ana está en Avonlea, junto al Bosque Encantado.
10:50 · Ana: Avonlea, junto al Bosque Encantado · de pie
10:50 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura
10:52 Ana está en Avonlea, junto al puente del arroyo.
10:55 · Ana: Avonlea, junto al puente del arroyo · caminando
10:55 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura
10:56 Ana está en Avonlea, no lejos del puente del arroyo.
10:59 Ana está en Avonlea, junto al huerto de los Barry.
11:00 · Ana: Avonlea, junto al huerto de los Barry · de pie
11:00 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura
11:01 Minnie May Barry dice: «Dicen que el nuevo pastor predica muy bonito.»
11:01 Mary Joe dice: «Y la Sra. Allan es un encanto, eso sí.»
11:01 Ana entra a la salita de La Cuesta del Huerto.
11:02 Ana está en la salita de La Cuesta del Huerto, junto a la mesita del té.
11:02 La Sra. Barry dice: «Ana Shirley, siempre es un gusto verte por aquí. Pórtate bien, ¿eh?»
11:05 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
11:05 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura
11:10 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · de pie
11:10 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura
11:15 · Ana: la salita de La Cuesta del Huerto, junto a la mesita del té · caminando
11:15 · Marilla: la cocina de Tejas Verdes, junto a la silla de la ventana · sentada · coser un vestido con mangas abullonadas · con la costura
11:15 Ana sale, junto a La Cuesta del Huerto.
11:16 Marilla se levanta; termina de coser un vestido con mangas abullonadas; ahora tiene un vestido con mangas abullonadas.
11:16 Marilla está en la cocina de Tejas Verdes.
```
</details>

## Batir mantequilla (meta 54: cumplida)

**Lo que debería pasar:** Marilla pone la leche de la mañana en la mantequera, junto a la mesa, y bate sin parar una media hora, hasta que hay mantequilla.

- ✔ Bate en la mantequera una media hora. — 08:17, 30 min
- ✔ Tiene la mantequilla. — 08:47, hasta el final

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (19 líneas)</summary>

```
08:00 Al empezar, Marilla está en Avonlea, junto a Tejas Verdes.
08:00 · Marilla: Avonlea, junto a Tejas Verdes · de pie
08:00 Marilla dice: «¿Me traerías 2 jarros de leche?»
08:00 Marilla dice: «Riega la huerta antes de que caiga el sol, que las plantas lo agradecen.»
08:01 Marilla entra a la cocina de Tejas Verdes, junto a la puerta.
08:05 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
08:10 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
08:15 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
08:17 Marilla ahora tiene 2 jarros de leche.
08:17 Marilla dice: «Gracias.»
08:17 Marilla empieza a batir la mantequilla.
08:17 Marilla está en la cocina de Tejas Verdes; con la mantequera.
08:20 · Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera
08:25 · Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera
08:30 · Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera
08:35 · Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera
08:40 · Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera
08:45 · Marilla: la cocina de Tejas Verdes · de pie · batir la mantequilla · con la mantequera
08:47 Marilla termina de batir la mantequilla; ahora tiene un pan de mantequilla.
```
</details>

