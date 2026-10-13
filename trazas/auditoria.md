# Auditoría de las acciones

Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.
**Pasos que ocurren como deberían: 6 de 6.**


## Cuidar al Sr. Harrison (meta 34: cumplida)

**Lo que debería pasar:** El Sr. Harrison está enfermo, en cama. Ana saca el jarabe de ipecacuana del aparador de la cocina, va a su casa y, junto a la cama, se lo da a cucharadas.

- ✔ El Sr. Harrison está en cama. — 11:00, 12 min
- ✔ Saca el jarabe del aparador. — 11:01, 1 min
- ✔ Tiene el jarabe. — 11:02, 10 min
- ✔ Se lo da en su casa. — 11:11, 1 min

<details><summary>Lo que el juego cuenta que pasó (37 líneas)</summary>

```
11:00 Al empezar, Ana está en Avonlea, junto a Tejas Verdes.
11:00 Al empezar, Sr. Harrison está en la casa del Sr. Harrison; ahora tiene 1 cuerda.
11:00 · Ana: Avonlea, junto a Tejas Verdes · de pie
11:00 · Sr. Harrison: la casa del Sr. Harrison · de pie
11:00 Ana echa a andar.
11:00 Sr. Harrison está en cama.
11:00 Ana está en la cocina de Tejas Verdes, junto a la puerta.
11:00 Ana echa a andar.
11:00 Ana está en la cocina de Tejas Verdes.
11:00 Ana echa a andar; empieza: tomar jarabe.
11:01 Ana se queda de pie; con el aparador abierto.
11:01 Ana está en la cocina de Tejas Verdes, junto al aparador.
11:02 Ana termina lo que hacía; ahora tiene 1 jarabe.
11:02 Ana está en Avonlea, junto a Tejas Verdes.
11:02 Ana echa a andar.
11:02 Ana se queda de pie.
11:02 Ana dice: «¡La Blanca Senda de las Delicias, otra vez!»
11:04 Ana se sienta.
11:04 Ana echa a andar.
11:05 · Ana: Avonlea, junto a Tejas Verdes · caminando
11:05 · Sr. Harrison: la casa del Sr. Harrison · acostada, en cama
11:10 · Ana: Avonlea, junto a la granja del Sr. Harrison · caminando
11:10 · Sr. Harrison: la casa del Sr. Harrison · acostada, en cama
11:10 Ana está en la casa del Sr. Harrison.
11:10 Ana echa a andar.
11:11 Ana se queda de pie; empieza: cuidar; con el jarabe.
11:11 Ana dice: «Una cucharadita de jarabe de ipecacuana… y otra más. Ya va a pasar.»
11:12 Ana termina lo que hacía; ya no tiene nada.
11:12 Sr. Harrison echa a andar.
11:12 Sr. Harrison dice: «Ya me siento mucho mejor. Gracias, niña.»
11:12 Ana echa a andar.
11:13 Ana está en Avonlea, junto a la granja del Sr. Harrison.
11:13 Sr. Harrison está en Avonlea, junto a la granja del Sr. Harrison.
11:13 Ana echa a andar.
11:13 Ana se queda de pie.
11:13 Sr. Harrison dice: «Ginger, ¡silencio!... No le hagas caso, muchacha.»
11:14 Sr. Harrison echa a andar.
```
</details>

## Batir mantequilla (meta 54: cumplida)

**Lo que debería pasar:** Marilla pone la leche de la mañana en la mantequera, junto a la mesa, y bate sin parar una media hora, hasta que hay mantequilla.

- ✔ Bate en la mantequera una media hora. — 08:18, 30 min
- ✔ Tiene la mantequilla. — 08:48, hasta el final

<details><summary>Lo que el juego cuenta que pasó (24 líneas)</summary>

```
08:00 Al empezar, Marilla está en la cocina de Tejas Verdes.
08:00 · Marilla: la cocina de Tejas Verdes · sentada
08:00 Marilla está en Avonlea, junto a Tejas Verdes.
08:00 Marilla echa a andar.
08:00 Marilla se queda de pie.
08:00 Marilla dice: «¿Me traerías 2 jarros de leche?»
08:00 Marilla está en la cocina de Tejas Verdes, junto a la puerta.
08:05 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
08:10 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
08:15 · Marilla: la cocina de Tejas Verdes, junto a la puerta · de pie
08:17 Marilla ahora tiene 2 leche.
08:17 Marilla dice: «Gracias.»
08:17 Marilla echa a andar; empieza: batir mantequilla.
08:18 Marilla está en la cocina de Tejas Verdes; con la mantequera.
08:20 · Marilla: la cocina de Tejas Verdes · de pie · batir mantequilla · con la mantequera
08:23 Marilla dice: «Matthew no lo dice, pero te echa de menos cuando te vas donde Diana.»
08:25 · Marilla: la cocina de Tejas Verdes · de pie · batir mantequilla · con la mantequera
08:29 Marilla dice: «Hmm. Bueno, admito que hoy te has portado muy bien.»
08:30 · Marilla: la cocina de Tejas Verdes · de pie · batir mantequilla · con la mantequera
08:35 · Marilla: la cocina de Tejas Verdes · de pie · batir mantequilla · con la mantequera
08:40 · Marilla: la cocina de Tejas Verdes · de pie · batir mantequilla · con la mantequera
08:45 · Marilla: la cocina de Tejas Verdes · de pie · batir mantequilla · con la mantequera
08:48 Marilla termina lo que hacía; ahora tiene 1 mantequilla.
08:50 · Marilla: la cocina de Tejas Verdes · de pie
```
</details>

