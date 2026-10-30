# El Camino Blanco de las Delicias

Una historia de fondo, en el lenguaje de [`docs/LENGUAJE.md`](../../../LENGUAJE.md) (§10.1): lo que pasa **cada vez**
que Ana pasa por la Avenida, el túnel de manzanos en flor entre Bright River y Avonlea (capítulo 2). No tiene
encargos ni termina; solo escenas que se activan con `ana pasa camino_blanco`.

Siempre es la misma idea, en tres tiempos:

1. **Si había una conversación, Ana la corta** (`interrumpe: si`; adentro, `<<if interrumpio>>`) con una exclamación.
   Si iban en silencio, sigue el silencio.
2. **Silencio** mientras pasan (`<<silencio('…')>>`). La escena va `en_marcha`: la calesa sigue andando.
3. **Después, Ana dice algo.**

| Escena | Cuándo | Qué |
|---|---|---|
| `cb_libro` | va con Matthew (la primera vez, en la llegada) | el libro: «¡Oh, señor Cuthbert!!!», el silencio hasta después de Newbridge, y el nombre: el Camino Blanco de las Delicias |
| `cb_otra_vez` | va con alguien (no el mismo día que la del libro) | «¡Shh! Perdón… pero es que ya llegamos»; el mismo dolorcito |
| `cb_sola` | va sola (tampoco ese día) | lo piensa: «cuando no hay nadie, es todavía más mío» |
| `cb_siempre` | cualquier otra vez (`repetir: dia`: una vez por día; tampoco el día de la primera) | calla, y suspira: «cada vez es como la primera. Casi» |

El `orden` (`historia.ts`) dice cuál prefiere cuando se puede más de una. Ninguna sabe qué charla corta: en la
llegada ([`../llegada/`](../llegada/)) Ana viene hablando de ser «angelicalmente buena» y la corta en la mitad de la
frase, como en el libro.

**En el juego** ya corre esta historia (`src/js/67-lenguaje.js`, docs/LENGUAJE.md §13): en el camino de Bright River
(el tramo de la Avenida) y en el Camino Blanco del mapa de Avonlea. Reemplaza a las escenas del guion que hacían lo
mismo (`avenida`, `newbridge`, `avenida_*`, `newbridge_ventanas`, `silencio_*`, `nombra_avenida`). El nombre lo elige
la jugadora, como antes (el del libro, o el que escriba). Se prueba con `node tools/lenguaje/en_el_juego.js`.

Para verla: `node tools/lenguaje/probar.js --ver llegada` (o `--ver paseo`, Ana sola), o en `trazas/lenguaje.html`,
con «La llegada (cap. 2)».
