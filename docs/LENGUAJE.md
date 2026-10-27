# El lenguaje de las historias de Avonlea

Diseño, todavía sin código. Define cómo se escribe todo lo que mueve el juego: el mundo, el estado, las condiciones,
los verbos (lo que cualquiera puede hacer, simple o compuesto), los actos de habla y su voz, las escenas (el guion) y
las historias (los grafos que las juntan). Un ejemplo completo, el viaje a White Sands (capítulos 5 y 6), está en
[`docs/lenguaje/white_sands/`](lenguaje/white_sands/), un archivo por tipo.

## 0. La idea en cuatro frases

1. **El estado** es un árbol: lo que pasó, cómo están las cosas, cuánto quiere uno a otro, dónde está cada uno.
2. **Los verbos mueven el juego.** Un verbo es primitivo (lo hace el mundo) o compuesto: una receta fija, una
   búsqueda con A\* sobre el estado, o un camino con A\* sobre el mapa. Decir algo también es un verbo (un acto de habla).
3. **Las escenas son el guion.** Se activan en un momento (un verbo que empieza, llega o falla; otra escena que termina;
   la jugadora que toca algo) y con condiciones; dicen lo que se dice y dejan sus efectos.
4. **Las historias son grafos** de escenas y encargos (verbos que la historia le pide a alguien), con su entrada y su
   salida. Corren en paralelo y se tocan solo a través del estado.

## 1. Principios

- **Un archivo por tipo**, siempre los mismos ocho (§2). Cada nombre se declara una vez, en su archivo.
- **Estricto.** Lo que no está declarado, o no calza con su tipo, es un error al cargar; el juego no arranca (§12).
- **Una sola forma de condición**: un camino en el estado y un operador (§5). Lo que no cabe se escribe como una
  función con nombre, declarada (§3.6): la salida de escape, a la vista y contada.
- **Un solo lector** para todas las herramientas: el juego, el grafo, el modelo lógico (Z3), la historia en fichas.
- **Cómodo para escribir**: texto plano, en español, como el guion de hoy. Lo técnico, en pocas palabras clave.

## 2. Los archivos

| Archivo | Qué declara | § |
|---|---|---|
| `mundo.txt` | personas, lugares, rutas, medios (la calesa), funciones del mundo | 3 |
| `estado.txt` | estados (escalas y listas), cualidades, hechos, noticias | 4 |
| `condiciones.txt` | condiciones con nombre | 5 |
| `verbos.txt` | verbos primitivos y compuestos | 6 |
| `actos.txt` | actos de habla (verbos de decir) | 7 |
| `voces.txt` | lo que se dice al hacer un verbo o un acto | 8 |
| `escenas.txt` | el guion | 9 |
| `historias.txt` | las historias | 10 |

Se cargan en ese orden: cada archivo puede usar lo declarado en los anteriores, y escenas e historias se pueden nombrar
entre sí.

### Lo común a todos

- `#` empieza un comentario, hasta el fin de la línea.
- `=== nombre ===` abre un bloque; sus campos son líneas `clave: valor`. Un campo puede repetirse cuando se dice.
- Los nombres: minúsculas, dígitos y `_` (`ws_t1`, `hondonada_lynde`). Los textos para mostrar van tal cual.
- Una lista se separa con comas. Dentro de una línea, `|` separa alternativas («o»).

## 3. `mundo.txt`

```
=== personas ===
marilla: Marilla
spencer: la Sra. Spencer

=== lugares ===
cocina: la cocina de Tejas Verdes | dentro de: tejas_verdes
playa: la playa, junto al hotel White Sands

=== rutas ===
costa: tejas_verdes > hondonada_lynde > escuela > aldea > playa > hotel_white_sands

=== medios ===
calesa: la calesa de Marilla | lleva: 2 | se guarda en: tejas_verdes

=== funciones ===
ve(quien, otro): quien ve a otro (la misma pieza, o cerca afuera)
```

- **Lugares**: los del mapa, por nombre (los puntos de hoy: `PLACES`, `WP`, las piezas). `dentro de` arma la jerarquía
  (la cocina está en Tejas Verdes).
- **Rutas**: una lista ordenada de lugares; se recorre en un sentido o en el otro.
- **Medios**: algo en que se va. Quien va en él se mueve con él.
- **Funciones** (§3.6): lo que el mundo calcula y el estado no guarda (ver, oír, la distancia). Se usan como
  `f:ve(marilla, ana)`. Son la única salida a código: cada una se declara aquí, con su firma y qué significa.

## 4. `estado.txt`

```
=== ana_en_tv ===
titulo: Ana en Tejas Verdes
valores: llegando < en_prueba < decidida < se_queda      # una escala: se compara con < >
otros: devuelta                                         # fuera de la escala: solo = y !=
inicial: llegando

=== cualidad paciencia ===
de: marilla | hacia: ana | rango: 0..5 | inicial: 3

=== hechos ===
ws_corrio: Ana corrió llorando hasta el mar
conoce_blewett: Ana conoce a la Sra. Blewett
```

Un estado sin orden se escribe `valores: si, no`. Los hechos se declaran con una línea que dice qué significan; las
noticias (`=== noticias ===`), igual.

### 4.1 El árbol del estado

Todo lo que una condición puede preguntar es un camino en este árbol:

| Camino | Qué es | Tipo |
|---|---|---|
| `hechos.x` | el día en que pasó x (no está: no pasó) | día |
| `dichas.x` | el día en que se dijo la escena x | día |
| `estado.x` | el valor de x | valor de su lista |
| `cualidad.<de>.<nombre>[.<hacia>]` | `cualidad.marilla.paciencia.ana` | número |
| `sabe.<quien>.<noticia>` | quien sabe la noticia | día |
| `conoce.<quien>` | Ana conoce a quien | día |
| `mundo.<quien>.lugar` | dónde está | lugar |
| `mundo.<quien>.en` | en qué medio va (`nada` si a pie) | medio |
| `mundo.<quien>.sigue` | a quién sigue (`nadie`) | persona |
| `mundo.<quien>.ropa` | `vestida`, `camison` | valor |
| `mundo.<medio>.lugar`, `mundo.<medio>.listo` | dónde está el medio; si está enganchado | lugar / `si`, `no` |
| `tiempo.dia`, `tiempo.hora`, `tiempo.estacion`, `tiempo.domingo` | el calendario | número / valor |
| `historia.<id>` | `no_empezada`, `en_curso`, `terminada`, `fallida` | valor |
| `encargo.<historia>.<etiqueta>` | `pendiente`, `en_curso`, `cumplido`, `fallido` | valor |
| `intentos` | dentro de una búsqueda: cuántas veces se intentó el paso de ahora | número |

## 5. Condiciones

### 5.1 La forma única

```
condición := ["!"] camino [operador valor]
           | ["!"] nombre                      # una condición con nombre (§5.3)
           | ["!"] "f:" función "(" args ")"     # el mundo (§3.6)
operador  := "=" | "!=" | "<" | "<=" | ">" | ">="
```

- **Sin operador**: que exista (`hechos.a_prueba`: pasó; `!dichas.ws_t2`: no se dijo).
- **Con operador**: compara. En una escala, `<` y `>` siguen su orden (`estado.ana_en_tv < decidida`); en una lista sin
  orden solo valen `=` y `!=`; en un número, todos.
- **Tiempo desde algo**: `desde(hechos.a_prueba) >= 1d`, `desde(dichas.ws_t1) < 2h`. Unidades: `d` (días) y `h` (horas).
- **Ventanas**: `dichas[hoy].x` (se dijo hoy), `dichas[7d].x` (en los últimos 7 días), `dichas[historia].x` (desde que
  empezó la historia de esta escena). Valen para `hechos` y `dichas`.
- **Horas**: `tiempo.hora en 14..19` (desde las 14, antes de las 19).

### 5.2 Y, o

- En una línea, las condiciones separadas por coma se cumplen todas («y»).
- Varias líneas `si:` en un mismo bloque: basta una («o»).

```
si: a_prueba, dichas.desayuno_prueba
si: hechos.devuelta
```

### 5.3 `condiciones.txt`: condiciones con nombre

```
a_prueba := estado.ana_en_tv < decidida
marilla_con_paciencia := cualidad.marilla.paciencia.ana >= 1
```

Se usan como cualquier condición (`si: a_prueba`). Una puede usar otras, sin ciclos.

## 6. `verbos.txt`

Un verbo tiene una firma: su nombre y sus parámetros, cada uno con su tipo (`persona`, `lugar`, `medio`, `ruta`,
`condición`, `verbo`). El primer parámetro es siempre quien lo hace.

### 6.1 Primitivo

Lo ejecuta el mundo, con su animación y su duración.

```
=== subir(quien: persona, medio: medio) ===
primitivo
pide: mundo.quien.lugar = mundo.medio.lugar
deja: mundo.quien.en = medio
dura: 10s
```

`pide` es la precondición; `deja`, los efectos (asignaciones al estado); `dura`, el tiempo de juego; `cuesta`, lo que
el A\* le suma a un plan (si no se dice, `dura`).

### 6.2 Compuesto por receta

Una secuencia fija. Cada paso lleva una etiqueta (el momento al que se puede enganchar una escena) y llama a otro verbo.

```
=== llevar_a(quien: persona, otro: persona, a: lugar, medio: medio, por: ruta) ===
receta:
  engancha: enganchar(quien, medio)
  sube:     conseguir_que(quien, otro, mundo.otro.en = medio)
  arriba:   subir(quien, medio)
  camino:   viajar(quien, medio, por, a)
  baja:     bajar(otro), bajar(quien)
mantiene: mundo.otro.en = medio desde camino, si se rompe vuelve a sube
cumplido si: mundo.otro.lugar = a
```

- `por cada x en lista: verbo(…x…)` repite un paso; cada vuelta toma la etiqueta `x` (`camino.escuela`).
  `tramo(ruta, desde, hasta)` es la lista de paradas de una ruta entre dos lugares, en el sentido que corresponda.
- **`mantiene`**: una condición que tiene que seguir siendo cierta desde un paso. Si el mundo la rompe (Ana se baja de
  la calesa), el verbo **se repara**: vuelve al paso que la consigue y, cuando se cumple, sigue desde donde iba. No
  rehace lo ya hecho.

### 6.3 Compuesto por búsqueda (A\* sobre el estado)

Una condición a cumplir; el A\* encuentra la secuencia más barata de verbos.

```
=== conseguir_que(quien: persona, otro: persona, c: condición) ===
busca: c
con: pedir, ordenar, traer, esperar
intentos: 4
```

- `con`: los verbos que puede usar (y, a través de ellos, todo lo que ellos usan).
- `intentos`: cuántas veces puede planificar de nuevo antes de fallar. Si el otro es Ana, el resultado de cada intento
  lo decide la jugadora (§11.4).

### 6.4 Compuesto por mapa (A\* sobre el mapa)

```
=== ir_a(quien: persona, a: lugar) ===
mapa
```

El A\* del mapa encuentra el camino. Si quien va en un medio, el medio va con él, con todos los que lleva.

### 6.5 Los momentos de un verbo

Todo verbo en curso, de cualquier nivel, tiene cuatro momentos, a los que se engancha una escena (§9.2):

| Momento | Cuándo |
|---|---|
| `empieza` | al empezar |
| `cumplido` | al terminar bien (su `cumplido si`, o el último paso) |
| `fallido` | al agotar sus intentos, o si su `pide` ya no se puede cumplir |
| `sigue` | al seguir después de una reparación (`mantiene`) |

## 7. `actos.txt`: actos de habla

Decir algo es un verbo. Un acto tiene quien lo dice, a quién y sus efectos. Precondición común: que el otro oiga
(`f:oye(a, quien)`). Su texto es su voz (§8), o la línea de la escena que lo lleva.

```
=== pedir(quien: persona, a: persona, v: verbo) ===
deja: a hace v                 # un encargo para a; si a es Ana, lo decide la jugadora

=== informar(quien: persona, a: persona, n: noticia) ===
pide: sabe.quien.n
deja: sabe.a.n

=== ofender(quien: persona, a: persona) ===
deja: cualidad.a.afecto.quien - 1, estado.ofensa_<a>_<quien> = si

=== comentar(quien: persona) ===
# sin efectos: solo voz
```

Actos del repertorio: `pedir`, `ordenar`, `informar`, `preguntar`, `prometer`, `agradecer`, `saludar`, `presentar`,
`ofender`, `disculparse`, `consolar`, `comentar`. Una línea de escena sin acto es `comentar`.

## 8. `voces.txt`

Lo que se dice al hacer un verbo o un acto. Cada bloque es un patrón de llamada (`_` vale cualquiera); cada línea es una
voz posible, con sus condiciones entre corchetes.

```
=== pedir(marilla, ana, subir(ana, calesa)) ===
- Sube, Ana.
- [intentos >= 1] Ana Shirley. Sube. Ahora.
- [historia.white_sands = en_curso] Sube, Ana. La Sra. Spencer no nos va a esperar todo el día.
```

Un patrón puede nombrar un paso (`traer(marilla, ana, _).va`): la voz se dice cuando ese paso se cumple.

Gana la línea **más específica** que se cumpla (la que pide más condiciones); entre iguales, al azar sin repetir la
anterior. Un patrón más específico (`pedir(marilla, ana, …)`) gana a uno general (`pedir(_, _, …)`).

## 9. `escenas.txt`: el guion

### 9.1 La cabecera

```
=== ws_t2 ===
historia: white_sands
resumen: Marilla le pide «los hechos»: Bolingbroke, Walter y Bertha Shirley.
se activa: tras ws_t1
se activa: ida.camino.hondonada_lynde cumplido
si: marilla_con_paciencia
```

| Campo | Qué | Si no se dice |
|---|---|---|
| `historia` | a qué historia pertenece | a ninguna: escena de fondo (§10.3) |
| `resumen` | una línea, para el grafo y las fichas | obligatorio |
| `se activa` | el momento (§9.2); varias líneas: cualquiera | `cuando se cumpla` |
| `si` | condiciones (§5); varias líneas: cualquiera | ninguna |
| `repetir` | `una_vez`, `dia`, `siempre` | `una_vez` |
| `narra` | tarjetas de narración, antes de las líneas | |
| `punto` | un punto para volver, antes de empezar | |
| `con` | quienes participan sin hablar | los que hablan |

Una escena de una historia pide, además, sin escribirlo, que su historia esté en curso.

### 9.2 Los momentos de activación

| Se activa | Qué es | Ejemplo |
|---|---|---|
| `<encargo>[.<paso>…] <momento>` | un momento de un encargo de la historia (§10) | `ida.camino.playa cumplido` |
| `<quien> <verbo(patrón)>[.<paso>] <momento>` | un verbo de alguien | `marilla traer(_, ana).va cumplido` |
| `<quien> <verbo(patrón)>` | la jugadora hace algo (el momento es `empieza`) | `ana tocar(espejo)`, `ana hablar(marilla)` |
| `tras <escena>` | otra escena terminó (con una pausa breve) | `tras ws_t1` |
| `historia <id> <momento>` | la historia empieza, termina o falla | `historia white_sands empieza` |
| `cuando se cumpla` | apenas se cumplen sus condiciones | |

### 9.3 El cuerpo

Después de `---`, como hoy:

```
---
narra: El mar está gris y verde…
marilla: (Marilla mira el camino.) Cuéntame lo que sepas de ti.
marilla piensa: Hay que ver la de cosas que caben en esa cabeza.
ana [ofender(lynde)]: ¡La odio!                  # una línea con su acto
! deja hechos.ws_corrio                            # efectos: deja, olvida, suma
! suma cualidad.marilla.afecto.ana 1
! ana correr_a(orilla)                             # un verbo que alguien hace ahora
-> «¿Usted también cree que debería volver?»       # una opción de la jugadora
   ana: …                                          # su cuerpo, con sangría
->* Mirar el mar sin decir nada                    # lo que Ana haría sola
```

- **Efectos**: `! deja <camino> = <valor>` (o `! deja hechos.x`), `! olvida hechos.x`, `! suma <camino> <n>`,
  `! log <texto>`.
- **Verbos**: `! <quien> <verbo>(…)` hace que alguien haga algo ahora (correr, sentarse, entrar a una pieza).
- Mientras una escena se juega, **los verbos de quienes participan se pausan**; al terminar, siguen. (Es lo que hoy son
  `interrumpe`, `sujeta` y `canal`.)

## 10. `historias.txt`

```
=== white_sands ===
titulo: Marilla lleva a Ana a White Sands, a devolverla (cap. 5 y 6)
empieza si: a_prueba, dichas.desayuno_prueba, tiempo.hora en 14..19
encarga busca: marilla conseguir_que(marilla, ana, mundo.ana.lugar = cocina)
encarga ida (tras viaje_spencer | viaje_spencer_duda): marilla llevar_a(marilla, ana, hotel_white_sands, calesa, costa)
encarga vuelta (tras ws_spencer | ws_spencer_duda): marilla llevar_a(marilla, ana, tejas_verdes, calesa, costa)
escenas: viaje_spencer, ws_t1, ws_t2, …
orden: falta_viaje, ws_orilla, ws_pye, ws_mar, ws_t3, ws_t2, ws_t1
termina si: dichas.ws_noche
deja: estado.ana_en_tv = decidida, hechos.conoce_blewett
falla si: encargo.white_sands.ida = fallido
```

- **`encarga <etiqueta> [(tras …)]: <quien> <verbo>`**: un verbo que la historia le encarga a alguien; empieza con la
  historia, o tras una de las escenas dichas. La etiqueta nombra sus momentos (`ida.camino.playa cumplido`).
- **`orden`**: la prioridad, como una lista (la primera elegible gana); las que no están, después, por especificidad.
  Un grupo `(a, b)` comparte lugar: una de las dos, al azar.
- **`deja`**: lo que queda al terminar; **`punto`**, el punto para volver que se guarda entonces. **`falla si`**: cuándo la historia se da por perdida (y su momento `fallida`).

### 10.1 Una historia es un grafo

Sus nodos son escenas y encargos; sus aristas, los momentos y las condiciones. No es una secuencia: se ramifica con lo
que elige la jugadora.

### 10.2 Las historias se tocan por el estado

No se anidan ni se ordenan a mano. Lo que una deja (`estado.ana_en_tv = decidida`) es lo que otra pide para empezar
(«Marilla se lo dice»). Varias corren a la vez.

### 10.3 Historias de fondo

Las que no terminan: la de cada persona (Marilla y Ana: sus conversaciones), la de cada cosa y cada lugar (sus líneas:
`ventana_1`, `ventana_2`… y su comodín). Se escriben igual, sin `termina si`; su `orden` es la línea.

## 11. Cómo se ejecuta

### 11.1 El ciclo

En cada paso del juego:

1. El mundo avanza: los verbos primitivos en curso, el reloj.
2. Se recogen los **momentos** que ocurrieron: verbos que empezaron, llegaron, fallaron o siguieron; escenas que
   terminaron; historias que empezaron o terminaron; lo que hizo la jugadora.
3. Para cada momento, se juntan las escenas que se activan con él y cuyas condiciones se cumplen. Se suman las de
   `cuando se cumpla`.
4. Se elige (§11.2) y se juega una escena por grupo de participantes (los que no comparten personas pueden ir a la vez).
5. Sus efectos cambian el estado; pueden empezar historias o encargos, o romper un `mantiene` (§6.2).
6. Los verbos de búsqueda cuyo estado cambió **planifican de nuevo**.

### 11.2 Cuál escena

1. Las de la **lista `orden`** de su historia, en su orden: la primera elegible.
2. Si no hay, la **más específica**: la que pide más (condiciones más momentos).
3. Entre iguales, al azar, sin repetir la última.

### 11.3 Los encargos

Un encargo es un verbo con dueño. Empieza cuando su historia lo dice; sus momentos llevan la etiqueta del encargo. Si la
historia termina, sus encargos en curso se cancelan.

### 11.4 Ana es la jugadora

Los verbos de los demás que necesitan algo de Ana (que suba, que venga) no lo deciden: lo piden. La jugadora obedece o
no. Si no, el verbo de búsqueda planifica de nuevo (más firme, ir a buscarla) hasta agotar sus intentos; entonces falla,
y eso es un momento de la historia.

## 12. Lo estricto

Al cargar, cada uno de estos es un **error**:

- Un nombre no declarado: persona, lugar, ruta, medio, función, estado, valor, cualidad, hecho, noticia, condición,
  verbo, acto, escena, historia.
- Un camino que no existe en el árbol (§4.1), o un operador que no calza con su tipo (`<` en una lista sin orden).
- Una llamada a un verbo o acto con otro número o tipo de parámetros.
- En una receta: dos pasos con la misma etiqueta; un `mantiene` que nombra un paso que no está antes.
- Una búsqueda cuyos `con` no existen, o cuya condición pregunta algo que el planificador no ve.
- Una escena con `historia: x` que la historia x no lista, o al revés; una activación que nombra un encargo o un paso
  que no existe; quien habla que no es una persona.
- Una historia cuyo `orden` nombra escenas que no son suyas.
- Una voz de un verbo o acto que no existe.
- Un ciclo entre condiciones con nombre.

Y **avisos** (el juego arranca): lo declarado que nada usa, una escena que nada activa.

## 13. Verificación

Las herramientas leen lo mismo que el juego:

- **El grafo**: cada historia, como un grafo de escenas y encargos, con lo que piden y lo que dejan.
- **El modelo lógico (Z3)**: el estado como variables, cada condición como una fórmula (una sola traducción, porque hay
  una sola forma), cada verbo como lo que pide y lo que deja. Pregunta lo de siempre (huecos, incoherencias, escenas
  imposibles) y, además, si cada historia puede terminar desde que empieza.
- **La historia en fichas**: juega las escenas sin el mundo; los encargos avanzan por sus pasos (los tramos de una ruta).

## 14. De lo que hay hoy a esto

| Hoy | En el lenguaje |
|---|---|
| `hecho:x`, `!hecho:x` | `hechos.x`, `!hechos.x` |
| `dicha:x` | `dichas.x` |
| `dias_desde:x:3`, `horas_desde:x:0.5` | `desde(hechos.x) >= 3d`, `>= 0.5h` |
| `no_hoy:x` | `!hechos[hoy].x` |
| `hora:14-19` | `tiempo.hora en 14..19` |
| `diana>=conocida` | `estado.diana >= conocida` |
| `afecto:diana:ana>=4`, `paciencia:marilla:ana>=1` | `cualidad.diana.afecto.ana >= 4`, `cualidad.marilla.paciencia.ana >= 1` |
| `conoce:x`, `sabe:x:n` | `conoce.x`, `sabe.x.n` |
| `ana:camison` | `mundo.ana.ropa = camison` |
| `ve:x`, `cerca:…`, `donde:…` | `f:ve(x, ana)`, `mundo.ana.lugar = …` |
| `en: ana=out, marilla=out`, `calesa`, `camino` | los da el encargo (van en la calesa) |
| `avance:ws:25-60` | un paso del encargo: `ida.camino.escuela cumplido` |
| `viaje=white_sands` | `historia.white_sands = en_curso` (lo pone la historia, sin escribirlo) |
| `canal`, `prioridad`, `interrumpe`, `sujeta` | `orden` de la historia; la escena pausa los verbos de quienes participan |
| `o: si=…` | otra línea `si:` o `se activa:` |
| `disparo: objeto`, `objeto: espejo`, `paso: 3` | `se activa: ana tocar(espejo)`, en la historia de fondo del espejo, con su `orden` |
| `! meta quien tipo` | `encarga` en la historia, o `! quien verbo(…)` |
| el código de cada viaje (`34-viaje-white-sands.js`) | el verbo `llevar_a` y sus voces |

## 15. Preguntas abiertas

- **Los verbos del planificador de hoy** (`tomar`, `dar`, `recoger`, `cocinar`, los favores) pasan a `verbos.txt`:
  ¿todos, o solo los que usan las historias, dejando el resto en código por ahora?
- **Escenas en paralelo**: dos escenas con participantes distintos, ¿a la vez (en dos lugares del mapa) o una por vez?
- **El costo de los verbos de búsqueda** depende del estado (la paciencia de Marilla hace más caro `ordenar`): ¿se
  escribe en el verbo (`cuesta: 5 - cualidad.quien.paciencia.otro`) o queda fijo?
- **El nombre del lenguaje.**

## Apéndice: la gramática

```
archivo      := (comentario | bloque)*
bloque       := "=== " cabeza " ===" NL (campo NL)* [ "---" NL cuerpo ]
campo        := clave ":" valor
condición    := ["!"] (camino [op valor] | nombre | "f:" nombre "(" args ")" | "desde(" camino ")" op duración)
camino       := raíz ("." nombre | "[" ventana "]")*
raíz         := "hechos" | "dichas" | "estado" | "cualidad" | "sabe" | "conoce" | "mundo" | "tiempo"
              | "historia" | "encargo" | "intentos"
ventana      := "hoy" | número "d" | "historia"
op           := "=" | "!=" | "<" | "<=" | ">" | ">=" | "en"
llamada      := nombre "(" [arg ("," arg)*] ")"
paso         := etiqueta ":" llamada ("," llamada)*
              | "por cada " nombre " en " expr ":" llamada
activación   := ruta momento | persona " " llamada ["." etiqueta] [momento] | "tras " nombre
              | "historia " nombre " " momento | "cuando se cumpla"
momento      := "empieza" | "cumplido" | "fallido" | "sigue"
línea        := persona [" piensa"] [" [" llamada "]"] ":" texto | "narra:" texto
efecto       := "! deja " camino [" = " valor] | "! olvida " camino | "! suma " camino " " número
              | "! " persona " " llamada | "! log " texto
opción       := ("-> " | "->* ") texto NL (sangría (línea | efecto) NL)*
```
