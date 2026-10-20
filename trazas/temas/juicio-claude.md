# Juicio de Claude con la rúbrica (trazas/temas/rubrica.md)

Lo juzgado: los temas propuestos en el experimento (trazas/temas/experimento.md). Juzgué Marilla en las 6 maneras y Matthew en 4 de ellas
(nada, resúmenes, hechas, claves), 15 temas por combinación (3 veces × 5). Son temas, no escenas: de la parte A juzgo solo
novedad (A4), lo concreto (A6) e inspiración (A7). La parte B, entera.

## El conjunto (B)

| Manera | Repite lo ya conversado (A4 = 0) | Lugares comunes (B4) | Serendipia (B3: relevante e inesperado) | Ámbitos (B1, de 9) |
|---|---|---|---|---|
| nada (Marilla + Matthew) | 3/30 | 13/30 (43 %) | **13/30 (43 %)** | 7 |
| temas (Marilla) | 3/15 | 7/15 (47 %) | 5/15 (33 %) | 6 |
| resúmenes (M + M) | 4/30 | 15/30 (50 %) | 8/30 (27 %) | 6 |
| mixto (Marilla) | 2/15 | 11/15 (73 %) | 2/15 (13 %) | 4 |
| hechas (M + M) | 3/30 | 17/30 (57 %) | 10/30 (33 %) | 6 |
| **claves** (M + M) | 5/30 | **11/30 (37 %)** | **13/30 (43 %)** | **8** |

Lugares comunes que la IA repite en todas las maneras: «enséñame a remendar/zurcir/coser» (en 14 de las 18 rondas de
Marilla), «¿cómo era de niña/joven?», «quiero ayudar en la granja / ser útil», «ordenar la despensa», las gallinas.

## Lo que muestra (distinto de lo que vio el juez automático)

- **Los resúmenes evitan repetir, pero anclan.** Con «hechas» y «resúmenes», la IA no repite lo hablado, pero se queda en el
  mismo registro: casa, quehaceres, aprender a hacer cosas. Hay más lugares comunes (50–57 %) y menos serendipia (27–33 %).
  Ve que se habló de cocina y propone mermelada, conservas, la despensa.
- **Las palabras clave dan una pista sin dar el molde.** «claves» repite poco (5/30) y es la que más se abre: 8 ámbitos y
  43 % de serendipia, como «nada», que no sabe qué se habló. Ejemplos con Marilla: «por qué nunca se permite estar triste
  delante de nadie», «si en la granja se aprende a leer el tiempo del cielo» (sale de las estrellas con Matthew), «cómo se
  reconoce una amistad verdadera».
- **Sin nada, la IA es más libre pero no sigue nada.** Le salieron joyas («preguntarle a Matthew si alguna vez quiso tener
  una hija», «una carta de negocios que a Matthew le cuesta escribir»), pero también la despensa y las gallinas, y no sigue
  lo que la jugadora eligió.
- **Lo más inspirador (A7 = 2)** fueron siempre preguntas sobre la vida interior del otro: un miedo, una pena, un sueño
  dejado. Ejemplos: «una mujer a veces tiene que enterrar los sueños sin hacer ruido»; «quedarse a su lado y quererlo ya
  es bastante»; «¿por qué no presume de querer a nadie?». Fueron muy pocas las de oficio («enséñame a…»).
- **Hay riesgos de verdad (A1)**: «Matthew quiere un caballo» (tiene a Dolly); «hoy soportó una reprimenda de la
  Sra. Lynde» (inventado). Los temas sueltos no saben la partida: esto lo filtran después las reglas y el modelo.

## Lo que haría

1. Contar lo ya conversado en **palabras clave** (~100 tokens por persona, como «hechas»), no en resúmenes.
2. Decirle a la IA **qué evitar**: la lista de lugares comunes (B4), que cuesta pocos tokens.
3. Pedirle **ámbitos distintos** y **al menos un tema inesperado** que conecte con lo que interesa a la jugadora.
4. Medir eso mismo con esta rúbrica: el juez automático solo medía repetición, y premiaba lo que se queda en la casa.

## Las escenas de una noche real (con «lo ya conversado», en resúmenes)

La noche escribió 4 conversaciones para la jugadora curiosa (día 16). Las juzgué con la parte A; ninguna tiene opciones,
así que no cuenta A8 y el máximo es 16.

| Escena | A1 | A2 | A3 | A4 | A5 | A6 | A7 | A9 | Total |
|---|---|---|---|---|---|---|---|---|---|
| Marilla: qué piensa de la veraneante | 2 | 2 | 1 | 2 | 2 | 2 | 2 | 2 | **15** |
| Matthew: si ya puede sembrar las capuchinas | 2 | 2 | 2 | 2 | 1 | 2 | 2 | 2 | **15** |
| Cecily: un tesoro pequeño | 1 | 0 | 1 | 2 | 1 | 1 | 1 | 1 | **8** |
| Felicity: un pastel que no salga aplastado | 1 | 1 | 1 | 1 | 0 | 1 | 1 | 1 | **7** |

- **Las dos de la casa son de lo mejor del juego**: «¿Y usted preferiría que yo pensara en el hilo o en la historia?» /
  «En los dos, si fueras capaz. Lo difícil es que no se te caiga uno mientras persigues el otro». Y de Matthew: «Las semillas
  no se gastan por plantarlas. Eso es para lo que sirven». Las dos siguen lo que pasó (la veraneante que llegó; las semillas
  que él le dio) y no repiten nada.
- **Cecily**: Ana la trata de usted (es una niña), y la escena promete un secreto («yo quería decirle algo») que no dice.
- **Felicity**: «enséñame a hacer un pastel» es un lugar común, y repite con otra persona lo que Ana ya hizo con Marilla.
- **El conjunto**: 4 ámbitos en 4 escenas (B1 = 1.0); 1 lugar común (B4 = 25 %); serendipia en 2 de 4 (la veraneante y
  Cecily); llenó 4 lagunas.
- **Fallas del juego, no de la IA**:
  - los efectos venían después de «---» y se rechazaba todo; en la segunda ronda la IA los quitó y las escenas no dejaron
    nada en el mundo. Ahora el juego los sube a su lugar;
  - «orden» se leía como «ordeñar» y mandaba la escena al granero.

Arreglado después de este juicio: el pedido dice que entre niñas y niños se tutean, nombra los lugares comunes y pide que
un secreto prometido se diga. El juego sube los campos a su lugar, y «ordeñ» ya no confunde «orden». Ejemplo:
tools/noche/ejemplos/campos.json.
