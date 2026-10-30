# La llegada (capítulo 2)

Matthew trae a Ana de la estación de Bright River a Tejas Verdes, en la calesa. Está escrita en el lenguaje de
[`docs/LENGUAJE.md`](../../../LENGUAJE.md).

| Archivo | Qué hay |
|---|---|
| [`historia.ts`](historia.ts) | empieza cuando Matthew ya encontró a Ana en la estación; el encargo `trae`: `llevar_a('matthew', 'ana', 'tejas_verdes', 'calesa', 'bright_river')` |
| [`escenas.yarn`](escenas.yarn) | dos charlas del libro en el camino (`ll_pelo`, `ll_angelical`) y la llegada (`ll_llegan`) |
| [`voces.yarn`](voces.yarn) | Matthew no manda: le tiende la mano («Bueno, pues… sube»), y si Ana no sube, le recuerda que se hace tarde |

`llevar_a` es la misma receta de White Sands:
- Matthew va hasta la calesa y consigue que Ana esté cerca.
- Le pide que suba («Subir a la calesa»): lo decide la jugadora.
- Viajan. Si Ana se baja en el camino, Matthew vuelve a pedírselo.
- Se bajan en Tejas Verdes.

En el camino, al entrar a la Avenida, Ana corta la charla: eso es de otra historia, [`../camino_blanco/`](../camino_blanco/).

**En el juego** (`src/js/67-lenguaje.js`), el encargo `trae` reemplaza a la meta que ponía el guion al terminar la
escena de la estación (`llevar ana,cocina`). Los verbos los hace el juego:
- El viaje es una meta del planificador: las ocho millas y el mapa de Avonlea.
- Subir es ir en la calesa con Matthew.
- El pedido sale en el menú.

Las charlas del camino y la llegada a la cocina siguen siendo las del juego (más ricas: por tramo, con el libro
entero), así que esas tres escenas se omiten allí. Se prueba con `node tools/lenguaje/en_el_juego.js`: una partida
nueva, desde la estación, que dice «Todavía no» y después «Subir a la calesa».
