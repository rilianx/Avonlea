# Escenas (la clase `Dialogo`)

Todo diálogo escrito del juego es una **escena**: una cápsula que se activa por **lugar** y por **estado**, nunca por la hora. Una escena es **pura configuración** (datos, sin código): quiénes, dónde, qué tiene que ser cierto, qué tan importante es, qué dice y qué hace al empezar y al terminar. La clase `Dialogo` lee esa configuración y un **director** (`dlgTick`) mira todas varias veces por segundo: en cada **canal** (la calesa, la cocina, la estación…) pone la más importante que se pueda decir; si ya hay una diciéndose, solo la corta otra que tenga `interrumpe` y más `prioridad`.

Para agregar una escena: escribirla en el **guion** (el bloque `<script type="text/plain" id="guion">` al comienzo de `index.html`, fuera del código; ver abajo) o, desde cualquier parte, `Dialogo.registrar({...})`.

## Conversaciones y comentarios

Como en los juegos actuales, hay dos clases de escena (`tipo`):

- **Conversación** (`'conversacion'`, la de siempre): un tema con principio y final. Si otra más importante la corta, **no se pierde**: queda guardado dónde iba (`game.dlgProg`) y, cuando vuelve a tocar, sigue desde ahí con una **frase puente** («Bueno, como le decía…», «¿Dónde iba? ¡Ah, sí!», o de Matthew «Bueno, pues… como decía…»). Si la línea se cortó en su primera mitad, se repite. Una conversación a medias pasa antes que otra nueva de la misma importancia.
- **Comentario** (`'comentario'`): algo corto sobre lo que se ve en ese momento (lo que en los juegos se llama *bark*). Si lo cortan, se pierde: ya pasó el momento. Va entre las conversaciones y no sale uno tras otro: como mucho uno por minuto en cada canal (`DLG_RESPIRO`).

Además, el director deja terminar lo que está por acabar: una escena que interrumpe espera si a la que se está diciendo le quedan dos líneas o menos.

**El ritmo del viaje:** si una escena tiene `al_paso`, mientras se dice la calesa va al paso (`ROAD_PASO`, al 70 % de la velocidad). Así lo importante alcanza a decirse antes de que cambie el paisaje. Cada tramo del camino puede tener además su `ritmo` (en `ROAD_TRAMOS`): en la Avenida 0,85 (despacio, bajo las flores), en Newbridge 1,4 y en las tres millas de silencio 1,9 (Matthew deja trotar a la yegua).

El silencio también se escribe: después de la Avenida hay escenas de una línea, encadenadas con `si: dicha:…` y con una `pausa` larga (12–14 s). Muestran lo que se ve o lo que piensa Matthew, para que el silencio no quede vacío (`avenida_petalos`, `silencio_estrella`…, en el guion).

## Configuración

| Campo | Qué es | Por defecto |
|---|---|---|
| `id` | nombre único (también es lo que se recuerda como «dicha») | — |
| `canal` | dónde se dice: dos escenas del mismo canal no se pisan (`viaje`, `gg`, `br`…) | `general` |
| `prioridad` | número; en cada canal gana la mayor | 1 |
| `interrumpe` | si puede cortar una de menor prioridad que se esté diciendo | `false` |
| `repetir` | `'una_vez'` (para siempre), `'dia'` (una vez al día), `'siempre'`, o `{ cada: segundos }` | `'una_vez'` |
| `tipo` | `'conversacion'` (si la cortan, sigue después donde quedó) o `'comentario'` (si la cortan, se pierde) | `'conversacion'` |
| `puente` | qué se dice al retomarla: `[[quién, texto], ...]`, o `false` para seguir sin frase puente | una al azar de `DLG_PUENTE`, de quien habla a continuación |
| `al_paso` | mientras se dice, la calesa va al paso | `false` |
| `entre` | segundos de más entre una línea y la siguiente: una escena que se toma su tiempo, como una carta que se escribe | 0 |
| `sujeta` | quiénes se quedan quietos mientras se dice (no se van a otra parte) | — |
| `lineas` | `[[quién, texto], ...]`, o `'libro:ruta'` (de `LIBRO1`, p. ej. `'libro:avonlea.lago'`), o `'relleno:n'`, o trozos de varias fuentes: `[{ de: 'libro:viaje.10', elegir: [7] }, { lineas: [...] }]` | — |
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
| `dias_desde:x:n` | pasaron al menos `n` días desde el hecho `x` |
| `no_hoy:x` | el hecho `x` no pasó hoy (una cosa grande del libro por día) |
| `afecto:a:b:n` | `a` quiere a `b` al menos `n` (de 0 a 5) |
| `cuaderno:id` | Ana cumplió esa meta de su cuaderno |
| `estudio:n` | Ana tiene al menos `n` días de estudio (`docs/LARGO_PLAZO.md`) |
| `estacion:e` | es esa estación (`primavera`, `verano`, `otoño`, `invierno`) |
| `dia_estacion:n` | es el día `n` de la estación (desde 1; cada estación dura 14 días) |
| `sentada:quien` | esa persona está sentada |
| `tomando_te:a:b` | `a` está sentada a la mesita del té con `b` |
| `carta:quien` | Ana está escribiendo una carta a esa persona, sentada a su escritorio (`diana`, `stacy`, `sraallan`, `josephine`) |

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

## El guion (fuera del código)

Las escenas del capítulo se escriben en un bloque de texto al comienzo de `index.html` (`<script type="text/plain" id="guion">`), parecido a Yarn o Ink. El juego lo lee al empezar (`dlgGuion`) y lo convierte en la misma configuración de arriba.

- Cada escena empieza con `=== id ===`.
- Siguen sus campos, uno por línea: `campo: valor`.
- Si tiene líneas propias, va `---` y una línea por intervención: `quién: texto`. Con ` #marca` al final, esa línea marca un momento del libro.
- Las líneas que empiezan con `#` son comentarios.

| Campo | Cómo se escribe |
|---|---|
| un campo de sí/no (`interrumpe`, `al_paso`) | solo el nombre, o `interrumpe: no` |
| números (`prioridad`, `pausa`, `espera`) | `prioridad: 9` |
| listas (`si`, `sujeta`, `quienes`, `elegir`, `cerca`) | separadas por comas: `si: capitulo, hecho:llegaron` · `cerca: matthew, lago, 1300` |
| pares (`en`, `marcas`, `camino`) | `en: lynde=gg, marilla=gg` · `marcas: 8=matthew_nina` · `camino: tramo=avenida` · `camino: no_callado` |
| `repetir` | `una_vez`, `dia`, `siempre` o `cada 30` |
| `o` (una alternativa por línea) | `o: calesa=avonlea cerca=matthew,tejas_verdes,1700 si=y_mayor:matthew:61` (los campos de `camino` con punto: `camino.desde=.955`) |
| `lineas` | `libro:estacion`, o un trozo: `libro:avonlea.lago [0,1,2,3,10]`; varias fuentes con `+`. Si además hay líneas propias, van después |
| `al_empezar`, `al_terminar` (una acción por línea) | `hecho x` · `marca id \| nota` · `log texto` · `saber quién qué` · `soltar quién` · `ana sit=false` · `fin_capitulo` · `meta quién tipo args \| texto \| etiqueta \| prioridad` (args separados por comas; `-` es vacío) |

### Ejemplos

El túnel de manzanos, antes que nada (interrumpe lo que se esté diciendo):

```
=== avenida ===
canal: viaje
prioridad: 10
interrumpe
calesa: camino
camino: tramo=avenida
lineas: libro:viaje.10 [7]
---
ana: (Ana enmudece…)
matthew: (Matthew la mira de reojo…)
```

«¿Es ésa Tejas Verdes?», después de la laguna, con la casa adelante (o ya llegando):

```
=== tejas_verdes ===
canal: viaje
prioridad: 9
interrumpe
si: dicha:lago
o: calesa=avonlea cerca=matthew,tejas_verdes,1700 si=y_mayor:matthew:61
o: si=capitulo,hecho:matthew_llego_casa,!hecho:llegaron
lineas: libro:avonlea.tejas_verdes [0,1,2,3,4,8,9]
marcas: 2=adivina_tv
```

Rachel le cuenta a Marilla… y después se va donde los Bell (una meta del planificador):

```
=== rachel_marilla ===
canal: gg
prioridad: 9
interrumpe
sujeta: lynde, marilla
en: lynde=gg, marilla=gg
si: capitulo, hecho:rachel_llego_tejas_verdes
lineas: libro:rachel_marilla
al_terminar: hecho rachel_lo_sabe
al_terminar: saber lynde huerfano
al_terminar: meta lynde estar_en casa_bell,-,- | Rachel va a casa de los Bell a contar la noticia | ir a casa de Robert Bell (cap. 1) | 3
```

Lo mismo desde el código, con `Dialogo.registrar`. Por ejemplo, una charla de dos, solo en la cocina, cuando se encuentran:

```js
Dialogo.registrar({ id: 'flores_mesa', disparo: 'encuentro', quienes: ['ana', 'marilla'], donde: 'gg',
  lineas: [['ana', '¿Puedo poner flores en la mesa?'], ['marilla', 'Pon las que quieras…']] });
```

## El panel de escenas

En 🎯, el botón **🎭 Escenas** muestra en vivo, para quien escribe escenas:

- lo que se está diciendo (en qué línea va, si es retomada, si va al paso);
- lo que se podría decir ahora, ordenado por importancia (● la que va a salir);
- las conversaciones que quedaron a medias, y en qué línea;
- las que todavía no, con el porqué (por ejemplo «no se ve aserradero», «falta dicha:lago», «todavía no llegan al tramo (53 % del camino)»).

## Las escenas del viaje (autocontenidas)

Cada escena es **autocontenida**: un tema completo, con principio y final, que se entiende sola y puede decirse en cualquier orden, salvo que diga que necesita otra con `si: ['dicha:…']`. Por ejemplo, «El vestido blanco» empieza con «Pero sí espero…» y necesita antes «La novia del cerezo».

Están escritas a mano en `VIAJE_ESCENAS` con una notación corta: `[id, nombre, piezas, opciones]`.

- **Piezas:** `L<tramo>:<líneas>` son las líneas del libro de ese tramo (`LIBRO1.viaje`); `M<tramo>:<líneas>` son las de Ana (`VIAJE_MAS`). Una escena puede juntar trozos de dos tramos, como «Los caminos rojos»: `'L3:4-9 L4:0-1'`.
- **Opciones:** `visible` (algo que tiene que estar a la vista), `tramo` (solo en ese tramo), `key` (momento del capítulo), `imprescindible` (no puede faltar), `si`, `marcas`.

Cada una se convierte en la configuración de un `Dialogo` como cualquier otra, y sus piezas quedan como `lineas: [{ de: 'libro:viaje.3', elegir: [4,5,…] }, { de: 'libro:viaje.4', elegir: [0, 1] }]`.

Hay 25 escenas del libro y 33 de Ana. Así se ordenan:

- **Momentos del capítulo:** la novia del cerezo (con la rama de ciruelo), «¿Hablo demasiado?» y «El pelo rojo». Van en su orden, con prioridad 3,55, y con la calesa al paso.
- **Imprescindibles:** «Los caminos rojos», «Los arbolitos del orfanato» y «¿Cómo es su hermana?». Van antes que el resto del libro (prioridad 2,5), también al paso.
- **Lo que nombra algo:** el cerezo, los barrancos, la señora de la carreta, los abetos, el golfo, la Sra. Hammond (frente al aserradero), los nabos, la casita con lilas, la iglesia. Se dicen con eso a la vista, con prioridad 3,5, e interrumpen lo de menos prioridad.
- **El resto del libro:** se dice desde el tramo donde lo pone el libro en adelante, en ese orden (prioridad 2).
- **Lo de Ana:** son comentarios. Los que nombran algo a la vista tienen prioridad 2,2 y salen entre las conversaciones, uno por minuto como mucho; los de un tramo, prioridad 1.

Todas las del libro son conversaciones: si las corta algo a la vista (la señora de la carreta, el aserradero…), siguen después con una frase puente.

No todo cabe en un viaje: el libro tiene unas 116 líneas para el camino, y leídas a un ritmo cómodo duran más que los 145 minutos del juego. Por eso los momentos del capítulo y las imprescindibles van al paso, y las demás se dicen si alcanza. En una corrida típica se dicen 15 de las 25 del libro, todas las importantes, más algunos comentarios de Ana.

Las **charlas de pares y tríos** (`DLG_BANK`) se convierten en escenas con `disparo: 'encuentro'`. Cuando dos personajes se encuentran, se elige la primera que no se haya dicho y que tenga sentido donde están.

El capítulo 1 cuenta lo que pasa con hechos (`dlgHecho('matthew_en_estacion')`…), y las escenas reaccionan a ellos. Ninguna escena tiene código propio.

## Las cartas (escenas de texto)

Escribir una carta es una escena del guion: `carta_<a quién>_1` y `carta_<a quién>_2` (la segunda, desde la segunda carta en adelante), en el canal `carta`, con `si: carta:<a quién>` y `entre: 5`, para que dure lo que dura escribirla (unos 25 minutos del juego). En sus líneas:

- `carta: …` es lo que escribe: Ana lo lee en voz alta (con ✎) y es **la carta que llega** (lo que después lee quien la recibe);
- `ana: …` es lo que piensa en voz alta mientras escribe (los desvaríos);
- entre paréntesis, lo que hace: `ana: (Tacha una palabra con tres rayas.)`;
- `{estacion}` se llena con la estación («los cerezos están en flor») y `{noticia}` con algo que de verdad le pasó hoy («Hoy fui de picnic al lago con Diana.»); si no hay noticia, esa línea no se dice.

Para una carta a alguien nuevo: su entrada en `CORREO` (`src/js/62-cartas.js`) y sus dos escenas en el guion.

