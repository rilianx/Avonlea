# Juicio de Claude: las versiones del pedido de la noche

Corrida 39506244928 (commit 144cafd): jugadora curiosa, nivel efectos, gpt-5.4-mini. Cada versión se corrió 2 noches, de
4 escenas cada una: 40 escenas en total, todas aceptadas por el juego. Las juzgué con la parte A de la rúbrica
(trazas/temas/rubrica.md): A1 a A9, de 0 a 2 cada una; máximo 18.

| Versión | Qué agrega al pedido | Tokens del pedido | Nota media (de 18) |
|---|---|---|---|
| base | — | 10 951 | 11,75 |
| **rubrica** | cómo se juzga cada escena (9 puntos) | 11 184 | **12,75** |
| ejemplo | una de las mejores escenas, en vez de un ejemplo del juego | 11 053 | 12,4 |
| plan | escribir primero el «porque» (qué cambia, la línea que se queda) | 10 986 | 11,25 |
| todo | las tres juntas | 11 321 | 10,9 |

Las notas de cada escena, criterio por criterio: trazas/temas/notas-claude.json (sirven también para calibrar el juez
automático, tools/juez.js). Una primera pasada, a ojo y sin anotar cada criterio, daba lo mismo en el orden (rubrica
primero, todo al final) con notas un punto más altas.

- **Decirle cómo se la juzga es lo que más rinde**, por 230 tokens: más escenas que parten de algo de la partida (A1 = 2,
  A6 = 2) y con una frase que se queda (A7).
- **Todo junto es lo peor.** Con el plan delante, la IA escribe el plan y después cumple con lo justo: opciones con solo
  efectos, sin respuesta, y efectos inventados para «dejar algo distinto» (A8).

## Las fallas que se repiten (en todas las versiones)

| Falla | Cuántas escenas | Ejemplo |
|---|---|---|
| «usted» donde va «tú» (Ana y una niña; Marilla o Matthew a Ana) | 16 de 40 | «Carrie, ¿usted alguna vez ha tenido un secreto…?»; «Cuénteme una de esas luces», a Cecily |
| Hechos del mundo inventados (contados a ojo) | unas 6 de 40 | Carrie, hermana de Jane; Alec que vive en Rose Cottage; «ayer» o «esta mañana» que no pasaron |
| Cualidades sin sentido | 10 de 40 | «suma paciencia:ana:marilla», «suma paciencia:ana», «suma letras:marilla:ana» |
| Opciones sin respuesta de la otra persona | 8 de 40 | solo la línea de Ana y un efecto (A8 = 0 o 1) |
| Un «---» suelto, o un campo con una letra de menos («esumen:») | 2 (rechazadas en la primera ronda) | la escena se rechazaba entera |

## Lo que cambió (las reglas generales)

- **El juego** (siempre, para todas las versiones):
  - una cualidad se escribe como el juego la tiene: «paciencia» es solo de Marilla hacia Ana; «estudio», «granja»,
    «letras» son de alguien, hacia nadie; el afecto es de alguien hacia otra persona. Lo que no calza se quita (la escena
    queda), y el pedido dice la forma de cada una;
  - en una conversación con una niña o un niño, ninguno de los dos dice «usted»; Marilla y Matthew no le dicen «usted» a
    Ana. Si pasa, se rechaza y vuelve a la IA para que lo corrija;
  - un «---» de más se quita; un campo con una letra mal («esumen:») se corrige.
  - Ejemplo: tools/noche/ejemplos/trato.json (las tres, con bloques de esta corrida).
- **El pedido**, versión «cuidado»: lo que más le hace perder a una escena buena (el trato, con los nombres; la verdad
  del mundo: parientes, casas, «ayer»; que cada opción lleve lo que contesta la otra persona; efectos pocos y con
  sentido), y dónde vive cada persona en LA GENTE.

## Lo que sigue

Correr de nuevo («experimento: prompts»): rubrica, rubrica+cuidado y rubrica+cuidado+ejemplo, 3 noches cada una, y
juzgar con la misma rúbrica. La que gane queda como el pedido de siempre.

## Segunda corrida: rubrica, rubrica+cuidado, rubrica+cuidado+ejemplo

Corrida 39509694246 (commit 29dad42): 3 noches por versión, ya con las reglas nuevas del juego (el «usted» entre niñas se
rechaza y vuelve a la IA; las cualidades mal escritas se quitan). 33 escenas aceptadas; notas en notas-claude.json («r2:»).

| Versión | Tokens del pedido | Escenas | Nota media (de 18) |
|---|---|---|---|
| rubrica | 11 237 | 11 | 13,45 |
| **rubrica+cuidado** | 11 719 | 11 | **13,55** |
| rubrica+cuidado+ejemplo | 11 821 | 11 | 12,45 |

- **Todo sube un punto** frente a la primera corrida (rubrica: de 12,75 a 13,45): es lo que hacen las reglas del juego,
  sobre todo el «usted», que ya no llega a la partida.
- **«cuidado» empata con «rubrica»**: la diferencia (0,1) es ruido con 11 escenas. Deja una marca propia: dos de sus mejores
  escenas son de la casa y del huerto con hechos de la partida (Matthew: «Tú también creces así», 17; Marilla: «Agradecida,
  sí. Mojigata, no.», 16).
- **Pero el «tú» se pasó al otro lado**: al corregir el «usted», Ana tuteó a Matthew (2 escenas). Ahora el juego lo
  rechaza también (Ana le dice «usted» a los grandes, como en todo lo escrito a mano) y el pedido lo dice con sus nombres.
- **El ejemplo vuelve a restar** (12,45): copia el molde (la tarta, el silencio de Cecily) en vez de buscar otra cosa.

Queda como pedido de siempre: **rubrica+cuidado** (NOCHE_VARIANTE). Lo que más puede subir la nota ahora no es el pedido
sino elegir: el experimento «elegir» (8 candidatos y el juez se queda con 4).
