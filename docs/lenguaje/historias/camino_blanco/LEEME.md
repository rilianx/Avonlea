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
| `cb_otra_vez` | va con alguien | «¡Shh! Perdón… pero es que ya llegamos»; el mismo dolorcito |
| `cb_sola` | va sola | lo piensa: «cuando no hay nadie, es todavía más mío» |
| `cb_siempre` | cualquier otra vez (`repetir: siempre`) | calla, y suspira: «cada vez es como la primera. Casi» |

El `orden` (`historia.ts`) dice cuál prefiere cuando se puede más de una. Ninguna sabe qué charla corta: en la
llegada ([`../llegada/`](../llegada/)) Ana viene hablando de ser «angelicalmente buena» y la corta en la mitad de la
frase, como en el libro.

Para verla: `node tools/lenguaje/probar.js --ver llegada` (o `--ver paseo`, Ana sola), o en `trazas/lenguaje.html`,
con «La llegada (cap. 2)».
