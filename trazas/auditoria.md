# Auditoría de las acciones

Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.
**Pasos que ocurren como deberían: 6 de 6.** **Acciones en que alguna regla no se cumplió: 0 de 2.**

**Las reglas que siempre deben cumplirse**, se haga lo que se haga (se revisan en cada línea del relato): quien está enfermo está en cama; nadie se queda de pie dentro de un mueble; nadie se queda dentro de las paredes de una casa; nadie está en el agua (salvo en el bote, o patinando sobre el hielo); nadie está encima de otro; los animales de la cuerda van afuera.


## Visita a la Sra. Lynde (meta 29: cumplida)

**Lo que debería pasar:** Ana va a la casa de la Sra. Lynde. Se sienta con ella y conversan con una taza de té, una media hora.

- ✔ Llega a la casa de la Sra. Lynde. — 15:11, 31 min
- ✔ Se sienta a tomar el té y conversar, una media hora. — 15:12, 30 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (34 líneas)</summary>

```
15:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
15:00 Al empezar, la Sra. Lynde está en la casa de la Sra. Lynde.
15:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
15:00 · la Sra. Lynde: la casa de la Sra. Lynde · caminando
15:00 Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»
15:05 · Ana: Avonlea, junto a la huerta de Tejas Verdes · caminando
15:05 · la Sra. Lynde: la casa de la Sra. Lynde · caminando
15:10 · Ana: Avonlea, junto a la casa de la Sra. Lynde · caminando
15:10 · la Sra. Lynde: la casa de la Sra. Lynde · caminando
15:11 Ana entra a la casa de la Sra. Lynde.
15:11 La Sra. Lynde dice: «Marilla hizo bien en quedarse contigo, y lo digo yo, que nunca me callo lo que pienso.»
15:11 Ana empieza a visitar a la Sra. Lynde; con el té.
15:11 Ana dice: «Buenas tardes, Sra. Lynde. Vine a visitarla.»
15:12 La Sra. Lynde dice: «¡Pasa, pasa! Siéntate, que pongo la tetera.»
15:12 Ana se sienta; con el té.
15:12 La Sra. Lynde se sienta.
15:15 · Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té
15:15 · la Sra. Lynde: la casa de la Sra. Lynde · sentada
15:20 · Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té
15:20 · la Sra. Lynde: la casa de la Sra. Lynde · sentada
15:25 · Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té
15:25 · la Sra. Lynde: la casa de la Sra. Lynde · sentada
15:30 · Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té
15:30 · la Sra. Lynde: la casa de la Sra. Lynde · sentada
15:35 · Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té
15:35 · la Sra. Lynde: la casa de la Sra. Lynde · sentada
15:35 La Sra. Lynde dice: «Ana Shirley, hablas más que un molino... pero tienes buen corazón, eso lo reconozco.»
15:40 · Ana: la casa de la Sra. Lynde · sentada · visitar a la Sra. Lynde · con el té
15:40 · la Sra. Lynde: la casa de la Sra. Lynde · sentada
15:42 Ana se levanta; termina de visitar a la Sra. Lynde.
15:42 La Sra. Lynde se levanta.
15:42 Ana dice: «Mi imaginación no me deja quieta.»
15:43 La Sra. Lynde entra a la cocina de Tejas Verdes.
15:43 Ana sale, junto a la casa de la Sra. Lynde.
```
</details>

## Cuidar al Sr. Harrison (meta 34: cumplida)

**Lo que debería pasar:** El Sr. Harrison está enfermo, en cama. Ana saca el jarabe de ipecacuana del aparador de la cocina, va a su casa y, junto a la cama, se lo da a cucharadas.

- ✔ El Sr. Harrison está en cama. — 11:00, 14 min
- ✔ Saca el jarabe del aparador. — 11:01, 1 min
- ✔ Tiene el jarabe. — 11:02, 12 min
- ✔ Se lo da en su casa. — 11:12, 1 min

**Reglas:** ✔ se cumplieron todas, siempre.

<details><summary>Lo que el juego cuenta que pasó (26 líneas)</summary>

```
11:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
11:00 Al empezar, el Sr. Harrison está en la casa del Sr. Harrison; está en cama; ahora tiene una cuerda.
11:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
11:00 · el Sr. Harrison: la casa del Sr. Harrison · acostada, en cama
11:00 Ana entra a la cocina de Tejas Verdes, junto a la puerta.
11:00 Ana está en la cocina de Tejas Verdes; empieza a tomar un frasco de jarabe de ipecacuana.
11:01 Ana sigue, con el aparador abierto.
11:01 Ana está en la cocina de Tejas Verdes, junto al aparador.
11:02 Ana termina de tomar un frasco de jarabe de ipecacuana; ahora tiene un frasco de jarabe de ipecacuana.
11:02 Ana sale, junto a Tejas Verdes.
11:02 Ana dice: «Los cerezos en flor parecen novias vestidas de blanco.»
11:05 · Ana: Avonlea, junto a Tejas Verdes · de pie
11:05 · el Sr. Harrison: la casa del Sr. Harrison · acostada, en cama
11:10 · Ana: Avonlea, junto al campo de avena del Sr. Harrison · caminando
11:10 · el Sr. Harrison: la casa del Sr. Harrison · acostada, en cama
11:11 Ana entra a la casa del Sr. Harrison.
11:12 El Sr. Harrison dice: «No me mires la casa, que el desorden es mío.»
11:12 Ana empieza a cuidar al Sr. Harrison; con el jarabe.
11:12 Ana dice: «Una cucharadita de jarabe de ipecacuana… y otra más. Ya va a pasar.»
11:13 Ana termina de cuidar al Sr. Harrison; ya no tiene nada.
11:13 El Sr. Harrison se levanta.
11:13 El Sr. Harrison dice: «Ya me siento mucho mejor. Gracias, niña.»
11:14 Ana sale, junto a la granja del Sr. Harrison.
11:14 El Sr. Harrison sale, junto a la granja del Sr. Harrison.
11:15 · Ana: Avonlea, junto a la granja del Sr. Harrison · caminando
11:15 · el Sr. Harrison: Avonlea, junto a la granja del Sr. Harrison · caminando
```
</details>

