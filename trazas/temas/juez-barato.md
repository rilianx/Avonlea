# Un juez barato para comparar versiones del pedido

Corrida 39518794698 (commit bb07df8): tools/juez.js con las 97 escenas que Claude juzgó a mano (notas-claude.json), en
10 grupos (las versiones del pedido de tres corridas). Cada modelo juzgó 3 veces. Lo que importa para comparar no es cada
escena sino la media de cada grupo: ¿ordena las versiones como Claude?

| Juez | Correlación (escenas) | Coincide en las que fallan | Elige bien (de las 4 mejores) | Correlación (medias de grupo) | Ordena pares de versiones | Tokens por escena (entra / sale) |
|---|---|---|---|---|---|---|
| **gpt-5.4-nano** | 0,42 | 68/97 | 27/40 | 0,43 | **8/10** | 1 035 / 228 |
| gpt-5.4-nano, media de 3 | 0,47 | 68/97 | 28/40 | 0,51 | 8/10 | ×3 |
| gpt-5.4-mini | 0,50 | 70/97 | 30/40 | 0,29 | 8/10 | 1 034 / 142 |
| gpt-5.4-mini, media de 3 | 0,50 | 69/97 | 29/40 | −0,13 | 6/10 | ×3 |
| gpt-5.4 | 0,65 | 77/97 | 29/40 | 0,21 | 6/10 | 1 030 / 233 |
| gpt-5.4, media de 3 | **0,71** | **79/97** | **30/40** | **0,55** | 7/10 | ×3 |

## Lo que muestra

- **Para juzgar cada escena (elegir en el juego), gpt-5.4 sigue siendo el mejor**: 0,65 solo, 0,71 con tres pasadas.
- **Para comparar versiones, ningún juez es seguro con tan pocas escenas.** Las medias de los grupos, según Claude, van de
  10,9 a 13,75, y la mayoría de las diferencias entre versiones de una misma corrida son de medio punto a un punto, con 8 a
  12 escenas por versión. Cada juez se aleja de Claude en unos 1,5 a 2 puntos por escena, y Claude mismo también tiene su
  ruido. Con 10 escenas, eso da un error de unos 0,6 en la media: del tamaño de las diferencias que se quieren ver.
- **gpt-5.4-nano es el juez barato**: ordena 8 de 10 pares de versiones como Claude, es el más barato de los tres, y
  promediar sus pasadas casi no cambia nada. gpt-5.4-mini infla las notas (14 de media contra 12,7), sobre todo la verdad
  de la partida (A1: 1,77 contra 1,07), y promediarlo empeora.
- **Lo barato se gasta mejor en más noches que en más pasadas del juez**: la diferencia entre versiones se ve con más
  escenas por versión (unas 40 para separar medio punto), no juzgando tres veces las mismas.

## Cómo se usa

- En el workflow, la entrada «comparar» viene con gpt-5.4-nano: en los experimentos «prompts» y «elegir», puntúa lo que
  queda de cada noche, y el informe termina con la nota media por versión (tools/prompts-muestra.js --resumen).
- Una diferencia de menos de un punto con unas 10 escenas por versión no decide nada: o más noches, o confirmarla con
  gpt-5.4 (media de 3) o con Claude.
