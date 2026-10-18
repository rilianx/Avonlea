# La IA de la noche: lo que propuso y lo que quedó

Escenario: **Escribió 3 cartas a la Sra. Spencer, se contuvo con Rachel (día 16, verano)** · nivel **efectos** · modelo gpt-5.4-mini · respuesta: archivo tools/noche/ejemplos/malo.json

| # | Tipo | Bloque | Navegador | Grafo y modelo (Node) | Queda | Motivos | Esperado |
|---|---|---|---|---|---|---|---|
| 1 | conversacion | `ia_conv_marilla_luna` | rechazado | — | **rechazado** | «luna:llena»: «luna» no es una condición que la IA pueda usar | ✔ rechazado |
| 2 | escena | `ia_desvan_secreto` | rechazado | — | **rechazado** | «suma afecto:marilla:ana 3»: de a 1 (o -1) por vez · «hecho ia_secreto_del_desvan»: los hechos nuevos son del nivel libre · «final» no está permitido a la IA | ✔ rechazado |
| 3 | conversacion | `ia_conv_diana_bosque` | rechazado | — | **rechazado** | diana: mientras hecho:prohibida, !hecho:perdonada, solo dice lo que pida prohibida o perdonada o ana:camison o ana:sin_sombrero o hora:21 (regla: Diana, mientras se lo prohíben, no la invita ni juega como si nada) | ✔ rechazado |
| 4 | escena | `ia_gilbert_otra_vez` | rechazado | — | **rechazado** | deja «zanahorias_ignora»: elige la respuesta de Ana en el hito «rival» (eso lo decide quien juega) | ✔ rechazado |

_(ningún bloque pasó la revisión del juego: no hay nada que agregar al modelo)_

## Los hitos de la partida

```
  ✓ llegada (cap. 1–3): Ana llega a Tejas Verdes llena de esperanza, y ahí descubren que no es lo que esperaban: querían un niño.
  ✓ a_prueba (cap. 4–6): Ana vive unos días sin saber si la devuelven al orfanato; tiene que ganarse un lugar.
  ✓ decision (cap. 6–8): Los Cuthbert deciden qué hacer con Ana.
      → se queda (como en el libro)
  … matthew_aliado (cap. 2–8): Matthew, el tímido, queda del lado de Ana para siempre: es su primer aliado.
  ✓ humillada (cap. 9): Una persona mayor humilla a Ana por su aspecto, delante de los de la casa.
      → se contiene (el libro: estalla)
  ✗ pedir_perdon (cap. 10): Ana tiene que pedir perdón a quien ofendió, aunque le cueste el orgullo.
  … sombrero_iglesia (cap. 11) [menor]: La imaginación de Ana choca con las costumbres del pueblo, y el pueblo habla.
  … amiga_del_alma (cap. 12): Ana conoce a la niña que podría ser la amiga que siempre soñó.
  · confianza_marilla (cap. 13–14): Un malentendido pone a prueba la confianza entre Marilla y Ana.
  … rival (cap. 15): Un niño de la escuela la hiere en lo que más le duele, delante de todos.
  · amistad_a_prueba (cap. 16–19): Un error de Ana pone a prueba la amistad con Diana: la familia de Diana se la prohíbe.
  (✓ pasó · … puede pasar ahora · · todavía no · ✗ su historia fue por otro lado)
```

## Por qué (lo que dijo la IA)

- 1. `ia_conv_marilla_luna`: (error a propósito: una condición que no existe)
- 2. `ia_desvan_secreto`: (error a propósito: efectos más allá del nivel: cariño de a 3, un hecho nuevo y un final)
- 3. `ia_conv_diana_bosque`: (error a propósito: Diana la invita a jugar sin tener en cuenta que se lo pueden prohibir)
- 4. `ia_gilbert_otra_vez`: (error a propósito: la escena elige la respuesta de Ana en el hito «rival»)
