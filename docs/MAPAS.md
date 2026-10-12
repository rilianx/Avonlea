# Los mapas en Tiled

Los mapas del juego están en `src/mapas/`. Son archivos `.tmj` (JSON) de [Tiled](https://www.mapeditor.org/), un editor gratuito. Se abren, se editan y se guardan. Después se corre `node tools/build.js` y el mapa queda dentro de `index.html`.

El juego no usa tiles para dibujar: el paisaje lo pinta el código. De Tiled solo se leen **objetos**: puntos, líneas y elipses con nombre y tipo. La grilla sirve de regla.

## Avonlea (`avonlea.tmj`)

**Escala.** Un tile equivale a una unidad del juego (U = 80 px). El mapa mide 96 × 84 unidades. El mar queda al norte y al este.

| Capa | Forma | Nombre | Tipo | Propiedades | Qué es |
|---|---|---|---|---|---|
| `costa` | polilínea | `costa` | `costa` | — | Donde termina la tierra |
| `caminos` | polilínea | nombre del camino (`estacion`, `lago`, `blanco`…) | `camino` | — | Los caminos; el nombre lo usan las rutas |
| `rios` | polilínea | `el río`, `el arroyo` | `rio` | — | El cauce |
| `rios` | punto | `puente` | `puente` | `rio` (a qué río cruza), `techado` (bool) | Los puentes; el techado es el del río |
| `bosques` | elipse | nombre del bosque | `bosque` | `pinos` (0–1), `embrujado` (bool) | Árboles dentro de la elipse |
| `bosques` | elipse | `lupinos` | `lupinos` | — | Campos rosados |
| `edificios` | punto | el nombre que se ve | estilo: `casa`, `granja`, `tienda`, `herreria`, `galpon`, `salon`, `hotel`, `faro`… | — | Casas en las que no se entra |
| `lugares` | punto | clave del lugar (`gg`, `os`, `lake`, `escuela`…) | `lugar` | — | Los puntos a los que se va: casas en las que sí se entra (`HOUSES`), el lago, la estación… |

**Reglas.**
- Los nombres de los lugares son claves del código. Si se cambia uno, hay que cambiarlo también en el código.
- Mover un punto, alargar un camino, agrandar un bosque o agregar un edificio no requiere tocar el código.
- Los **momentos** (alguien dice algo cuando Ana pasa por ahí) son palabras, no lugares. Por eso siguen en `src/js/02-mapa-avonlea.js`, en `moments`.

## Los interiores (`cocina`, `pieza`, `salita`, `salon`)

**Escala.** Son de 13 × 9 tiles de 32 px, igual que el cuarto en pantalla. Cada uno tiene una capa `lugares` con puntos:

| Mapa | Puntos | Qué se hace ahí |
|---|---|---|
| `cocina` | `estufa`, `mesa`, `puerta`, `escalera`, `aparador`, `fregadero`, `silla` | Cocinar, poner la mesa (del aparador a la mesa), lavar la loza en el fregadero, subir a la pieza |
| `pieza` | `ventana`, `cama`, `escritorio`, `lavatorio` | Escribir y estudiar en el escritorio, teñirse frente al espejo |
| `salita` | `chimenea`, `sofa`, `te` | Las visitas, el té |
| `salon` | `escenario`, `banco` (varios) | El concierto y las recitaciones del ayuntamiento |

El código pide los puntos por nombre, con `lugar('cocina', 'mesa')`. Si falta uno, el juego avisa al cargar: `el mapa «cocina» no tiene «mesa»`.

## Después de editar

```
node tools/build.js                                        # arma index.html
node tools/trace_goal.js --pdf trazas/metas.pdf --par 4    # regresión de las 62 metas (≈ 1,5 min)
```

Lo esperado es 60 de 62 metas cumplidas. Las metas 13 (Gilbert) y 25 (imposible) fallan a propósito.
