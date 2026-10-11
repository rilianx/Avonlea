# Escenas (la clase `Dialogo`)

Todo diálogo escrito del juego es una **escena**: una cápsula que se activa por **lugar** y por **estado**, nunca por la hora. Una escena es **pura configuración** (datos, sin código): quiénes, dónde, qué tiene que ser cierto, qué tan importante es, qué dice y qué hace al empezar y al terminar. La clase `Dialogo` lee esa configuración y un **director** (`dlgTick`) mira todas varias veces por segundo: en cada **canal** (la calesa, la cocina, la estación…) pone la más importante que se pueda decir; si ya hay una diciéndose, solo la corta otra que tenga `interrumpe` y más `prioridad`.

Para agregar una escena: una línea en `ESCENAS` (en `index.html`) o, desde cualquier parte, `Dialogo.registrar({...})`.

## Configuración

| Campo | Qué es | Por defecto |
|---|---|---|
| `id` | nombre único (también es lo que se recuerda como «dicha») | — |
| `canal` | dónde se dice: dos escenas del mismo canal no se pisan (`viaje`, `gg`, `br`…) | `general` |
| `prioridad` | número; en cada canal gana la mayor | 1 |
| `interrumpe` | si puede cortar una de menor prioridad que se esté diciendo | `false` |
| `repetir` | `'una_vez'` (para siempre), `'dia'` (una vez al día), `'siempre'`, o `{ cada: segundos }` | `'una_vez'` |
| `retomar` | si la cortan antes de la mitad, vuelve a quedar por decir | `false` |
| `sujeta` | quiénes se quedan quietos mientras se dice (no se van a otra parte) | — |
| `lineas` | `[[quién, texto], ...]`, o `'libro:ruta'` (de `LIBRO1`, p. ej. `'libro:avonlea.lago'`), o `'relleno:n'` | — |
| `elegir` | índices de las líneas que se dicen (de una escena larga del libro) | todas |
| `marcas` | `{ índice: id }`: la línea marca un momento del libro (para comparar con la agenda verdadera) | — |
| `al_empezar`, `al_terminar` | acciones (ver abajo) | — |
| `disparo: 'encuentro'` | solo cuando `quienes` se encuentran (las charlas de pares y tríos) | — |
| `quienes` | quiénes hablan (para los encuentros) | — |

### Condiciones de lugar

| Campo | Se cumple cuando |
|---|---|
| `en: { quien: escena }` | cada uno está en esa escena (`'gg'` la cocina de Tejas Verdes, `'rl'` la casa de Rachel, `'br'` la estación, `'out'` afuera, `'camino'` el camino de Bright River) |
| `cerca: [quien, lugar, radio]` | quien está afuera, a menos de `radio` de un lugar con nombre (`lago`, `tejas_verdes`, `casa_bell`, `letrero_br`, `hondonada`; se agregan en `DLG_LUGARES`) |
| `calesa` | Ana va en la calesa con quien maneja: `'camino'` (en el camino de Bright River), `'avonlea'` (con Matthew en Avonlea) o `'cualquiera'` |
| `camino: { tramo, tramo_v, desde, visible, no_callado }` | en el camino, de vuelta a Avonlea: en ese tramo (por tipo, p. ej. `'avenida'`, o por nombre, p. ej. `'Newbridge'`); en el tramo número `tramo_v`; pasado cierto punto (`desde`, de 0 = la estación a 1 = Avonlea); con algo a la vista (`visible`: `cerezo`, `carreta`, `mar`, `aserradero`, `granjero`, `vacas`, `iglesia`, `lilas`, `sauces`, `curva`, `barranco`, `abetos`, `flores`); fuera de los tramos de silencio (`no_callado`) |
| `donde` | para los encuentros: `'gg'`, `'casa'` (en Tejas Verdes o cerca), `'dentro'`, `'arroyo'` |

### Condiciones de estado (`si: [...]`)

| Texto | Se cumple cuando |
|---|---|
| `hecho:x` | pasó el hecho `x` (lo pone una escena con `{hecho}`, o el juego con `dlgHecho('x')`) |
| `dicha:id` | ya se dijo la escena `id` |
| `marca:id` | ya pasó el momento `id` del libro |
| `capitulo` | se está jugando el capítulo 1 |
| `canal_libre:c` | no se está diciendo nada en el canal `c` |
| `ana_visible` | Ana está en escena (no viene aún en el tren) |
| `escena_ana:s` | Ana está en la escena `s` |
| `sabe:quien:qué` | quien sabe algo (`game.wm.know`) |
| `y_mayor:quien:y` | quien está más al sur que `y` (en unidades del mapa) |

Con `!` delante se niega (`'!hecho:llegaron'`). **`o: [ {...}, {...} ]`**: basta con que se cumpla una de las alternativas (cada una con estas mismas condiciones).

### Acciones (`al_empezar`, `al_terminar`)

| Acción | Qué hace |
|---|---|
| `{ hecho: 'x' }` | marca el hecho `x` |
| `{ marca: 'id', nota: 'texto' }` | marca un momento del libro (y lo anota en el diario) |
| `{ log: 'texto' }` | lo anota en el diario |
| `{ saber: [quien, qué] }` | quien se entera de algo |
| `{ meta: { quien, tipo, args, texto, etiqueta, prioridad } }` | le da una meta al planificador (`tipo` es una de `G`: `estar_en`, `llevar`…) |
| `{ soltar: quien }` | deja ir a alguien del pueblo que se había quedado esperando |
| `{ ana: { ... } }` | cambia algo de Ana (p. ej. `{ sit: false }`) |
| `{ fin_capitulo: true }` | termina el capítulo |

## Ejemplos

El túnel de manzanos, antes que nada (interrumpe lo que se esté diciendo):

```js
{ id: 'avenida', canal: 'viaje', prioridad: 10, interrumpe: true, calesa: 'camino', camino: { tramo: 'avenida' },
  lineas: [['ana', '(Ana enmudece…)'], ['matthew', '(Matthew la mira de reojo…)']] }
```

«¿Es ésa Tejas Verdes?», después de la laguna, con la casa adelante (o ya llegando):

```js
{ id: 'tejas_verdes', canal: 'viaje', prioridad: 9, interrumpe: true, si: ['dicha:lago'],
  o: [{ calesa: 'avonlea', cerca: ['matthew', 'tejas_verdes', 1700], si: ['y_mayor:matthew:61'] },
      { si: ['capitulo', 'hecho:matthew_llego_casa', '!hecho:llegaron'] }],
  lineas: 'libro:avonlea.tejas_verdes', elegir: [0, 1, 2, 3, 4, 8, 9], marcas: { 2: 'adivina_tv' } }
```

Rachel le cuenta a Marilla… y después se va donde los Bell (una meta del planificador):

```js
{ id: 'rachel_marilla', canal: 'gg', prioridad: 9, sujeta: ['lynde', 'marilla'], en: { lynde: 'gg', marilla: 'gg' },
  si: ['capitulo', 'hecho:rachel_llego_tejas_verdes'], lineas: 'libro:rachel_marilla',
  al_terminar: [{ hecho: 'rachel_lo_sabe' }, { saber: ['lynde', 'huerfano'] },
                { meta: { quien: 'lynde', tipo: 'estar_en', args: ['casa_bell', null, null], etiqueta: 'ir a casa de Robert Bell' } }] }
```

Una charla de dos, solo en la cocina, cuando se encuentran:

```js
{ id: 'flores_mesa', disparo: 'encuentro', quienes: ['ana', 'marilla'], donde: 'gg',
  lineas: [['ana', '¿Puedo poner flores en la mesa?'], ['marilla', 'Pon las que quieras…']] }
```

## Las escenas que se arman solas

- **La charla del viaje** se arma con esta misma configuración a partir de las líneas del libro y las de Ana (`LIBRO1.viaje`, `VIAJE_MAS`). Cada tramo se parte en intercambios: empieza uno cada vez que Ana vuelve a hablar después de una respuesta. Cada intercambio queda en uno de estos grupos:
  - **El hilo de la charla:** las líneas del libro que no nombran nada a la vista. Van con prioridad 2, en el orden del libro: cada una exige `dicha:` de la anterior.
  - **Los momentos del capítulo:** van con prioridad 3,55, en su orden.
  - **Lo que nombra algo del camino:** se dice con `camino.visible`. Las del libro van con prioridad 3,5 e interrumpen el hilo (que se retoma); las de Ana, con 1,8.
  - **Lo de Ana sobre un tramo:** se dice con `camino.tramo_v` y prioridad 1.
- **Las charlas de pares y tríos** (`DLG_BANK`) se convierten en escenas con `disparo: 'encuentro'`. Cuando dos personajes se encuentran, se elige la primera que no se haya dicho y que tenga sentido donde están.

El capítulo 1 cuenta lo que pasa con hechos (`dlgHecho('matthew_en_estacion')`…), y las escenas reaccionan a ellos. Ninguna escena tiene código propio.
