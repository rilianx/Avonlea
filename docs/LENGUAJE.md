# El lenguaje de las historias de Avonlea

Diseño, con un ejemplo que compila. Define cómo se escribe todo lo que mueve el juego: el mundo, el estado, las
condiciones, los verbos (lo que cualquiera puede hacer, simple o compuesto), los actos de habla y su voz, las escenas
(el guion) y las historias (los grafos que las juntan).

- **La lógica** (mundo, estado, verbos, actos, historias) se escribe en **TypeScript**, solo con datos.
- **El guion** (escenas y voces) se escribe en **Yarn Spinner**.

El ejemplo completo, el viaje a White Sands (capítulos 5 y 6), está en [`docs/lenguaje/`](lenguaje/). Pasa
`tsc` sin errores. El juego todavía no lo lee.

## 0. La idea en cuatro frases

1. **El estado** es un árbol: lo que pasó, cómo están las cosas, cuánto quiere uno a otro, dónde está cada uno.
2. **Los verbos mueven el juego.** Un verbo es primitivo (lo hace el mundo) o compuesto: una receta fija, una búsqueda
   con A\* sobre el estado, o un camino con A\* sobre el mapa. Decir algo también es un verbo (un acto de habla).
3. **Las escenas son el guion.** Se activan en un momento (un verbo que empieza, llega o falla; otra escena que
   termina; la jugadora que toca algo) y con condiciones; dicen lo que se dice y dejan sus efectos.
4. **Las historias son grafos** de escenas y encargos (verbos que la historia le pide a alguien), con su entrada y su
   salida. Corren en paralelo y se tocan solo a través del estado común.

## 1. Por qué TypeScript y Yarn

| | Qué da |
|---|---|
| **TypeScript, solo datos** | Lo estricto lo hace el compilador: cada nombre declarado es un tipo, y un nombre mal escrito se marca mientras se escribe, con autocompletado (`estado.ana_en_tv.lt(` ofrece `'llegando' \| 'en_prueba' \| 'decidida' \| 'se_queda'`). Es el lenguaje del juego: no hay intérprete aparte. La IA lo escribe bien, y el compilador rechaza lo que esté mal. |
| **Yarn Spinner** | El formato de guion de juegos más usado (nodos, `personaje: línea`, opciones `->`, comandos `<<…>>`, variantes `=>`), con extensión de VS Code y lectores en JavaScript. Nuestro guion de hoy ya era casi así. |

Hay dos reglas para que todo siga siendo verificable:
1. **Los archivos `.ts` solo declaran datos:** `export const` con objetos y llamadas a los constructores de
   `comun/lenguaje.ts`, que no hacen nada en el juego, solo arman datos. Nada de `if`, `for` ni variables que cambien.
2. **En los `.yarn`, las expresiones** (condiciones, comandos) solo pueden ser nombres, llamadas, textos y números.
   El generador (§12) lo revisa.

Se descartaron:
- **Python ejecutable:** no se puede verificar, y no corre en el navegador.
- **Un DSL propio:** había que escribir su lector y su editor.
- **YAML, Lua, PDDL y ASP:** peores para el guion.

La comparación completa está en la conversación de diseño.

## 2. Las carpetas

```
docs/lenguaje/
  tsconfig.json
  comun/                     lo común a todas las historias
    lenguaje.ts              los constructores y sus tipos (el lenguaje mismo)
    mundo.ts                 personas, lugares, rutas, medios, funciones del mundo
    estado.ts                el estado común: estados, cualidades, hechos, noticias
    verbos.ts                los verbos
    actos.ts                 los actos de habla
    ana.ts                   Ana es la jugadora: cómo responde a lo que le piden cuando va sola
    voces.yarn               las voces comunes
    voces.datos.ts         (generado)
  historias/
    white_sands/             una historia: todo lo de aquí es local
      historia.ts            sus hechos, sus condiciones, sus encargos, su orden, su salida
      escenas.yarn           su guion
      voces.yarn             sus voces: el sabor propio, mientras está en curso
      index.ts               lo que ven las demás historias
      escenas.ids.ts         (generado) los nombres de sus escenas
      escenas.datos.ts     (generado) cada escena y cada voz traducida, para que tsc la revise
    llegada/                 Matthew trae a Ana de Bright River (cap. 2)
    camino_blanco/           una historia de fondo: lo que pasa cada vez que Ana pasa por la Avenida
```

## 3. Lo local y lo común

**Por defecto, todo es local a su historia:** sus hechos, sus condiciones con nombre, sus escenas, sus voces y sus
encargos. Así una historia se escribe, se lee y se prueba sola, y dos historias pueden tener una escena `llegada` sin
chocar (sus nombres completos son `white_sands.llegada` y `otra.llegada`).

**Lo común** está en `comun/`: el mundo, el estado que comparten (`ana_en_tv`, la paciencia, lo que una historia deja
para otra), los verbos, los actos y las voces generales.

**Entre historias:**
- Una historia **pide** lo común para empezar (`empieza`).
- Una historia **deja** algo en lo común al terminar (`deja: estado.ana_en_tv.vale('decidida')`).
- Una historia **exporta** en su `index.ts` lo que otras pueden preguntar: si terminó, el estado de sus encargos, un
  recuerdo (`recuerdos.corrio_al_mar`). Nada más.

En TypeScript esto es simplemente el alcance de los módulos. Una historia solo importa de `comun/` y de los `index.ts`
de otras.

**Lo local tapa a lo común.** Si una historia declara `hechos`, en sus escenas `hechos.x` es el suyo. Sus voces le
ganan a las comunes mientras está en curso.

## 4. El estado

### 4.1 Las declaraciones

```ts
// comun/estado.ts
export const estado = accesoEstado({
  ana_en_tv: { titulo: 'Ana en Tejas Verdes', orden: ['llegando', 'en_prueba', 'decidida', 'se_queda'],
               otros: ['devuelta'], inicial: 'llegando' },
})
export const cualidad = accesoCualidad<Persona>()({
  paciencia: { titulo: '…', de: 'marilla', hacia: 'ana', rango: [0, 5], inicial: 3 },
})
export const hechos = hechosDe('comun', { primera_noche: 'Ana pasó su primera noche en Tejas Verdes' })

// historias/white_sands/historia.ts: sus hechos, locales
export const hechos = hechosDe('white_sands', { ws_corrio: 'Ana bajó de la calesa y corrió llorando hasta el mar' })
```

- **Estados:** con `orden` son una escala, que se compara con `lt` y `gte`; `otros` son valores fuera de la escala,
  que solo admiten `es` y `no_es`. Con `valores` en vez de `orden`, son una lista sin orden.
- **Hechos:** se declaran con una línea que dice qué significan.

### 4.2 El árbol

Todo lo que se puede preguntar o cambiar es un camino en este árbol. Los constructores lo escriben; en el JSON queda
así:

| Camino | Qué es | En el lenguaje |
|---|---|---|
| `<ámbito>.hechos.x` | el día en que pasó x | `hechos.x` |
| `<historia>.dichas.x` | el día en que se dijo la escena x | `dichas.x` |
| `estado.x` | su valor | `estado.x` |
| `cualidad.<de>.<nombre>.<hacia>` | un número | `cualidad('marilla', 'paciencia', 'ana')` |
| `mundo.<quien>.lugar`, `.en`, `.sigue`, `.ropa` | dónde está, en qué va, a quién sigue, cómo anda | `mundo('ana').en` |
| `mundo.<medio>.lugar`, `.listo` | dónde está el medio; si está enganchado | `medio('calesa').listo` |
| `sabe.<quien>.<noticia>` | quién sabe qué | `informar(…)` lo deja |
| `tiempo.hora`, `tiempo.dia` | el reloj | `tiempo.hora.entre(14, 19)` |
| `historia.<id>` | `en_curso`, `terminada`… | `white_sands.en_curso` |
| `encargo.<historia>.<etiqueta>` | `pendiente`, `en_curso`, `cumplido`, `fallido` | `white_sands.encargo.ida.estado` |
| `intentos` | dentro de una búsqueda, cuántas veces se intentó | `intentos.gte(1)` |

## 5. Condiciones

Son datos, construidos con:

| Forma | Ejemplo |
|---|---|
| que pasó; que pasó hoy; hace cuánto | `hechos.ws_corrio`, `hechos.ws_corrio.hoy`, `hechos.a_prueba.desde('>=', '1d')` |
| un valor | `mundo('ana').lugar.es('cocina')`, `.no_es(…)` |
| en una escala, o un número | `estado.ana_en_tv.lt('decidida')`, `cualidad(…).gte(1)` |
| la hora | `tiempo.hora.entre(14, 19)` |
| y, o, no | `y(a, b)`, `o(a, b)`, `no(a)` |
| el mundo (la salida a código, declarada) | `ve('srapye', 'ana')`, `oye('ana', 'marilla')` |

Una **condición con nombre** es una constante: `export const a_prueba = estado.ana_en_tv.lt('decidida')`.

## 6. Verbos

Cada verbo se declara con su constructor, un nombre y una definición. Los parámetros de la definición son su firma, y
sus tipos (`Persona`, `Lugar`, `Medio`, `Ruta`, `Cond`) se revisan en cada llamada. El primer parámetro es siempre
quien lo hace. Al construir, la definición se llama una vez con los nombres de los parámetros y se guarda como datos.

| Constructor | Qué es | Ejemplo |
|---|---|---|
| `primitivo` | lo hace el mundo: `pide`, `deja`, `dura`, `cuesta` | `subir`, `bajar`, `enganchar` |
| `receta` | una secuencia fija de `pasos` con etiqueta; `mantiene` y `cumplido` | `traer`, `llevar_a` |
| `por_cada_uno` | una receta que es un solo «por cada»: sus pasos se nombran por sus elementos | `viajar`: un paso por parada |
| `busca` | una condición `objetivo`: el A\* elige entre los verbos `con`, con `intentos` | `conseguir_que` |
| `mapa` | un destino: el A\* del mapa elige el camino | `ir_a`, `correr_a` |

```ts
export const llevar_a = receta('llevar_a', (quien: Persona, otro: Persona, a: Lugar, m: Medio, por: Ruta) => ({
  pasos: {
    engancha: enganchar(quien, m),
    cerca: conseguir_que(quien, otro, mundo(otro).lugar.es(medio(m).lugar)),
    sube: conseguir_que(quien, otro, mundo(otro).en.es(m)),
    arriba: subir(quien, m),
    camino: viajar(quien, m, por, a),
    baja: [bajar(otro), bajar(quien)],
  },
  mantiene: { si: mundo(otro).en.es(m), desde: 'arriba', si_se_rompe: 'cerca' },
  cumplido: mundo(otro).lugar.es(a),
}))
```

- **Lo que necesita son dos decisiones del otro**, una después de la otra, cada una con su búsqueda. Marilla no
  puede subir a Ana a la calesa. Primero consigue que Ana venga donde está la calesa (`cerca`): **va a buscarla**
  (`ir_a_buscar`: va donde está Ana, le pide que venga con ella —«Ir con Marilla»—, y vuelven juntas, Ana detrás), o
  si no obedece, la trae de la mano (`traer`). Después, que suba (`sube`). Las dos las decide Ana (§7.1).
  (También existe `seguir`, para ir juntos a pie; la calesa no lo usa, porque al jugar es más claro «Subir a la
  calesa» que «Ir con Marilla».)
- **`mantiene`**: una condición que tiene que seguir siendo cierta desde un paso. Si el mundo la rompe (Ana se baja
  de la calesa y sale corriendo), el verbo **se repara**: vuelve al paso que la consigue (`cerca`: que vuelva, y
  después que suba) y, cuando se cumple, sigue desde donde iba.
- **Los caminos de los pasos** van con puntos: `'camino'`, `'camino.playa'` (la parada `playa` del paso `camino`).
  Son un tipo: un paso que no existe es un error.
- **Los momentos de un verbo**, de cualquier nivel, son `empieza`, `cumplido`, `fallido` y `sigue` (sigue después de una
  reparación). Son a los que se engancha una escena.

## 7. Actos de habla

Decir algo es un verbo, `acto`: quien lo dice, a quién y sus efectos. Precondición común: que el otro oiga. Su texto es
su voz (§8), o la línea de la escena que lo lleva (`#ofender:ana`). Una línea sin acto es `comentar`: solo voz.

```ts
export const pedir = acto('pedir', (quien: Persona, a: Persona, v: Llamada) => ({ pide: oye(a, quien), pedido: { a, hace: v, espera: '1m' }, cuesta: 1 }))
export const ofender = acto('ofender', (quien: Persona, a: Persona) => ({ deja: [cualidad(a, 'afecto', quien).suma(-1)] }))
```

### 7.1 Los pedidos: Ana es la jugadora

Un acto con **`pedido`** (`pedir`, `ordenar`) le pide a alguien que haga un verbo, y ese alguien decide.

- **Se pide estando juntos.** `pedir` y `ordenar` piden que el otro oiga (en el mismo lugar): para que alguien que está
  lejos venga, primero hay que ir a buscarlo, no gritarle desde la calesa.
- **Si es Ana, decide la jugadora.** El juego le ofrece hacerlo (el texto `opcion` del verbo: `subir` se ofrece
  como «Subir a la calesa», `ir_a` como «Ir a …») o no (`opcion_no`: «Todavía no»). No contestar dentro de `espera`
  también es no. Si en vez de contestar camina hacia la calesa, también cuenta: lo que importa es la condición.
- **Si Ana va sola, o es otro personaje,** responde según `comun/ana.ts`: por acto, una condición sobre quién lo pide.
  ```ts
  export const ana_sola = respuestas({
    pedir: quien => cualidad('ana', 'afecto', quien).gte(2),   // a quien quiere, le hace caso
    ordenar: () => true,                                        // una orden, sola, la cumple
  })
  ```
- **Para planificar, el A\* supone que el pedido funciona**, con el costo de lo probable: `pedir` es barato,
  `ordenar` cuesta más e ir a buscarla, más todavía. En la ejecución espera la respuesta:
  - si acepta, sigue el plan;
  - si rechaza, el intento falla y vuelve a planificar: más firme (`ordenar`, solo después de un intento) o ir a
    buscarla (`traer`, de la mano; ella puede soltarse);
  - al agotar los `intentos`, la búsqueda falla, y eso es un momento de la historia.
- **La respuesta es un momento:** `ana acepta pedir`, `ana rechaza ordenar` (§9.2). A ellos se engancha lo que pasa
  cuando Ana se niega: la paciencia de Marilla, una escena.
## 8. Voces (`voces.yarn`)

Lo que se dice al hacer un verbo o un acto. Un nodo por patrón de llamada (`voz:`, donde `_` vale cualquiera; `paso:`
para la voz de un paso de una receta). Sus líneas son un **grupo de variantes de Yarn** (`=>`), cada una con su
condición:

```
title: voz_pedir_subir
voz: pedir('marilla', 'ana', subir('ana', 'calesa'))
---
=> Sube, Ana. No tenemos todo el día.
=> Vamos, sube. Y sacúdete esa arena. <<if hechos.ws_corrio.hoy>>
===
```

- **Cuál se dice:** gana la variante más específica que se cumpla; entre iguales, una al azar.
- **Qué patrón gana:** uno más específico le gana a uno general.
- **Voces de historia:** le ganan a las comunes mientras su historia está en curso.
- **Quién habla:** el que hace el verbo. Lo que va entre paréntesis es narración.

## 9. Escenas (`escenas.yarn`)

```
title: ws_t2
resumen: Marilla le pide «los hechos»: Bolingbroke, Walter y Bertha Shirley.
se_activa: tras ws_t1 | ida.camino.hondonada_lynde cumplido
si: marilla_con_paciencia
---
marilla: (Marilla mira el camino, no a Ana.) Ya que tienes tantas ganas de hablar, cuéntame lo que sepas de ti.
marilla: Hay que ver la de cosas que caben en esa cabeza. #piensa
===
```

### 9.1 La cabecera

| Campo | Qué | Si no se dice |
|---|---|---|
| `title` | su nombre (local a la historia) | obligatorio |
| `resumen` | una línea, para el grafo y las fichas | obligatorio |
| `se_activa` | el momento (§9.2); varios con `\|` | obligatorio |
| `si` | condiciones (§5), separadas por comas: todas | ninguna |
| `repetir` | `una_vez`, `dia`, `siempre` | `una_vez` |
| `en_marcha` | `si`: se dice mientras los encargos siguen (una charla en la calesa, que no la detiene) | la escena detiene a quienes participan |
| `interrumpe` | `si`: no espera a que termine la escena que se está diciendo; la corta (queda a medias, sin `tras`). Adentro, `interrumpio` dice si cortó algo | espera su turno |
| `punto` | un punto para volver, antes de empezar | |
| `con` | quienes participan sin hablar | los que hablan |

Una escena de una historia pide, además, sin escribirlo, que su historia esté en curso.

### 9.2 Las activaciones

| Se escribe | Qué es | Se traduce a |
|---|---|---|
| `ida.camino.playa cumplido` | un momento de un encargo de la historia, o de uno de sus pasos | `momento(white_sands.encargo.ida, 'camino.playa', 'cumplido')` |
| `ida cumplido` | el encargo entero | `momento(white_sands.encargo.ida, '', 'cumplido')` |
| `marilla traer.va cumplido` | un verbo de alguien (en cualquier encargo) | `hace('marilla', traer, 'va', 'cumplido')` |
| `ana tocar empieza` | lo que hace la jugadora | `hace('ana', tocar, '', 'empieza')` |
| `ana rechaza pedir` | la respuesta a un pedido (§7.1): `acepta` o `rechaza` | `responde('ana', 'rechaza', pedir)` |
| `ana rechaza pedir subir` | la respuesta a un pedido en particular (que suba) | `responde('ana', 'rechaza', pedir, subir)` |
| `tras ws_t1` | otra escena terminó (con una pausa breve) | `tras(escena.ws_t1)` |
| `ana pasa camino_blanco` | alguien llega a un lugar, o lo cruza en un viaje (a pie, en la calesa, siguiendo a otro) | `pasa('ana', 'camino_blanco')` |

### 9.3 El cuerpo

- `quien: texto`: una línea. `narra: texto`: narración.
- Etiquetas al final de la línea:
  - `#piensa`: lo que alguien piensa (una nube).
  - `#<acto>:<a quién>`: la línea es ese acto (`#ofender:ana`, `#informar:spencer:equivocacion`).
- `-> texto`: una opción de la jugadora. Su cuerpo va con sangría. `#propia` marca lo que Ana haría sola.
- `<<comando>>`: un efecto o un verbo.
  - `<<deja(hechos.ws_corrio)>>`, `<<suma(cualidad('marilla', 'afecto', 'ana'), 1)>>`, `<<log('…')>>`
  - `<<correr_a('ana', 'orilla')>>`: alguien hace un verbo ahora.
  - `<<silencio('20m')>>`: nadie habla durante ese rato. Si la escena va `en_marcha`, el mundo sigue (la calesa avanza,
    pasa por otros lugares); sus momentos esperan a que la escena termine, salvo los de una que `interrumpe`.
- `<<if …>> … <<else>> … <<endif>>`: una variación dentro de la escena (como en Yarn). `<<if interrumpio>>`: si la
  escena empezó cortando otra (había una conversación) o no (estaban en silencio).
- Mientras una escena se juega, **los verbos de quienes participan se pausan**; al terminar, siguen. Es lo que hoy son
  `interrumpe`, `sujeta` y `canal`. Con `en_marcha: si`, no: la escena se dice mientras siguen (las charlas del camino,
  con la calesa avanzando; la Sra. Pye o la orilla, en cambio, detienen el viaje).

## 10. Historias (`historia.ts`)

```ts
export const white_sands = historia('white_sands', {
  titulo: 'Marilla lleva a Ana a White Sands, a devolverla (cap. 5 y 6)',
  empieza: y(a_prueba, comun.primera_noche, hora_de_salir),
  encarga: {
    busca: { quien: 'marilla', hace: conseguir_que('marilla', 'ana', mundo('ana').lugar.es('cocina')) },
    ida: { quien: 'marilla', tras: [escena.viaje_spencer, escena.viaje_spencer_duda],
           hace: llevar_a('marilla', 'ana', 'hotel_white_sands', 'calesa', 'costa') },
  },
  orden: [escena.falta_viaje, escena.ws_orilla, escena.ws_pye, escena.ws_mar, escena.ws_t3, escena.ws_t2, escena.ws_t1],
  termina: dichas.ws_noche,
  deja: [estado.ana_en_tv.vale('decidida'), comun.conoce_blewett.deja],
  falla: encargo => encargo.ida.estado.es('fallido'),
})
```

- **`encarga`**: los verbos que la historia le encarga a cada uno. Empiezan con la historia, o `tras` una de sus
  escenas. Su etiqueta nombra sus momentos.
- **`orden`**: la prioridad, como una lista: la primera escena elegible gana. Las que no están van después, por
  especificidad.
- **`deja`**: lo que queda en lo común al terminar. **`falla`**: cuándo la historia se pierde.
- **Las historias de fondo** (la de cada persona, cada cosa y cada lugar: sus conversaciones, sus líneas) son
  historias sin `termina` (y sin encargos, si no los necesitan): empiezan cuando se cumple `empieza` y siguen en curso.

### 10.1 Un ejemplo de fondo: el Camino Blanco de las Delicias

Cada vez que Ana pasa por la Avenida, el túnel de manzanos en flor, pasa lo mismo, en tres tiempos: si había una
conversación, Ana la corta con una exclamación; después, silencio mientras pasan; y al salir, Ana dice algo. La
primera vez, con Matthew (cap. 2), con las palabras del libro; las otras, con otras palabras.

```
title: cb_libro
resumen: La Avenida, la primera vez: Ana enmudece, y después le pone nombre.
se_activa: ana pasa camino_blanco
si: ve('ana', 'matthew')
interrumpe: si
en_marcha: si
---
<<if interrumpio>>
ana: …¡Oh, señor Cuthbert! ¡Oh, señor Cuthbert!! ¡Oh, señor Cuthbert!!!
<<endif>>
narra: La calesa entra a la Avenida…
<<silencio('20m')>>
matthew: Supongo que estarás bien cansada y con hambre. Pero ya no falta mucho: solo una milla más.
ana: Oh, señor Cuthbert… ese lugar por el que pasamos, ese lugar blanco… ¿qué era?
===
```

Las variantes son escenas de la misma historia (`historias/camino_blanco/`), todas con la misma activación; el
`orden` dice cuál prefiere: `[cb_libro, cb_otra_vez, cb_sola, cb_siempre]`. Las tres primeras se dicen una vez; la
última, `repetir: siempre`. Ninguna sabe nada de la charla que corta: en la llegada (`historias/llegada/`), Ana viene
hablando de ser «angelicalmente buena» y la corta al entrar; en cualquier otro viaje que pase por ahí, cortará lo
que se esté diciendo.

## 11. Cómo se ejecuta

**En cada paso del juego:**
1. **El mundo avanza:** los verbos en curso, el reloj.
2. **Se recogen los momentos** que ocurrieron: verbos que empezaron, llegaron, fallaron o siguieron; escenas que
   terminaron; historias que empezaron o terminaron; lo que hizo la jugadora.
3. **Se juntan las candidatas:** para cada momento, las escenas que se activan con él y cuyas condiciones se cumplen.
4. **Se elige** con el `orden` de su historia, y si no, la más específica.
5. **Se juega una escena por grupo de participantes.** Las que no comparten personas pueden ir a la vez. Mientras una
   se dice, los momentos nuevos esperan a que termine; solo una escena que `interrumpe` no espera: la corta.
6. **Sus efectos cambian el estado.** Pueden empezar historias o encargos, o romper un `mantiene`.
7. **Las búsquedas cuyo estado cambió planifican de nuevo.**

**Ana es la jugadora.** Los verbos de los demás que necesitan algo de Ana (que venga, que suba) no lo deciden: lo
piden (§7.1), y la jugadora acepta o no. Si no, la búsqueda vuelve a planificar (más firme, o ir a buscarla) hasta
agotar sus intentos. Entonces falla, y eso es un momento de la historia.

## 12. Lo estricto

Lo revisan dos herramientas, y `tools/lenguaje/mutaciones.py` prueba que lo hagan: le mete a una copia del ejemplo
19 errores, uno a la vez, y hoy los detecta todos.

**El generador** `tools/lenguaje/yarn.js` lee los `.yarn` y rechaza:
- una expresión que no tenga la forma permitida (código en una condición);
- un nombre que no está declarado en ninguna parte (una condición o un acto mal escritos);
- una activación que no tiene ninguna de las formas (`ana rechasa pedir`);
- una línea que no es Yarn;
- dos escenas con el mismo nombre;
- una escena sin `title`, `resumen` o `se_activa`.

Después escribe `escenas.ids.ts` (los nombres de las escenas) y `escenas.datos.ts` (cada escena y cada voz,
traducidas a llamadas del lenguaje).

**`tsc`** revisa todo junto y rechaza:
- quien habla y no es una persona;
- un acto hacia alguien que no existe;
- un hecho, un lugar, una ruta o una escena que no existen (en `orden`, en `tras`, en `dichas`);
- un encargo o un paso que no existe (`ida.cmino.playa`, `traer.vaa`), incluida la voz de un paso;
- la respuesta de alguien que no existe, o a un acto que no existe (`ana rechaza pedri`);
- comparar un valor fuera de la escala (`lt('devuelta')`);
- una llamada con otros tipos de parámetros.

**Lo que los tipos no ven** lo revisan los datos, como hoy lo hacen el grafo y el modelo lógico:
- una parada que es un lugar pero no está en la ruta del encargo;
- una escena que nada activa;
- una historia que no puede terminar.

## 13. Construir y probar

```
node tools/lenguaje/yarn.js docs/lenguaje     # los .yarn → escenas.ids.ts y *.datos.ts (las escenas y voces, como datos)
tsc -p docs/lenguaje                          # revisa todo
python3 tools/lenguaje/mutaciones.py          # que lo estricto lo sea
node tools/lenguaje/construir.js              # todo, compilado, en un JSON (lo que lee el motor)
node tools/lenguaje/probar.js                 # cada historia de punta a punta, en varios escenarios
node tools/lenguaje/probar.js --ver sola      # lo que pasa, línea a línea
node tools/lenguaje/pagina.js                 # trazas/lenguaje.html: jugarla en el navegador
```

**El motor** (`tools/lenguaje/motor.js`) ejecuta los datos: el estado y los momentos, los encargos con sus pasos y su
reparación (`mantiene`), los pedidos a Ana, las escenas por `orden` y especificidad, y las voces. Es solo la lógica; el
mundo lo pone otro, por una interfaz chica:

| El motor le pide al mundo | Qué |
|---|---|
| `empezar(acc)`, `avanzar(acc)`, `cuando(acc)` | hacer un primitivo (lo que dura) o un verbo de mapa (ir hasta un lugar), y avisar cuando terminó |
| `parar(acc)`, `seguir(acc)` | detenerlo mientras se repara lo que se rompió, y seguir después con lo que faltaba |
| `minutos(a, b)`, `tramo(ruta, desde, hasta)` | cuánto hay entre dos lugares (el costo de un plan), y las paradas de una ruta |
| `funciones` | lo que el mundo calcula: `ve`, `oye`, `sola` |

| El mundo le avisa al motor | Qué |
|---|---|
| `llega(quien, lugar)` | alguien llegó a un lugar o pasó por él (el momento `pasa`) |

Para probar sin el juego está **el mundo simulado** (`tools/lenguaje/mundo_simulado.js`), que simplifica:
- **el mapa:** los lugares por nombre y los minutos entre ellos (15 entre paradas de una ruta, 2 dentro de un mismo
  lugar, 3 a uno cercano, 10 si no);
- **el tiempo de las escenas:** un minuto de juego por línea, y lo que diga `<<silencio>>`;
- **las búsquedas:** el plan es de un paso (el verbo más barato de su `con` que logra el objetivo; lo que ya falló
  cuesta más), y no el A\* completo del juego.

**Todo lo que recuerda el motor son datos.** Un verbo en curso no es código suspendido: es una pila de marcos (el verbo
de abajo, el paso que está haciendo, el paso de ese paso), cada uno con su llamada y en qué va (fase, paso, intento,
la acción que el mundo está haciendo). Así una partida se guarda (`guardar()`, un JSON) y se carga (`Motor.cargar`) en
cualquier momento, aun a mitad de un viaje o de una reparación.

**La página** `trazas/lenguaje.html` es para jugarla: tú eres Ana, contestas los pedidos, eliges en las escenas, o
vas a otro lugar y te bajas de la calesa; puedes guardar y cargar la partida; a la derecha, los encargos, dónde está cada uno y el estado. Con «ver los
momentos» aparece lo que la mueve por dentro.

**La prueba** `tools/lenguaje/probar.js` la recorre en varios escenarios y revisa cómo termina: Ana sola; obediente;
que se niega dos veces; que corre al mar; Marilla sin paciencia; Ana lejos a la hora de salir; Ana que se baja de la
calesa a mitad de camino; la llegada por la
Avenida (que la escena del libro corte la charla); la llegada si Ana ya hubiera pasado (la otra variante); y Ana
que pasea sola por la Avenida, dos veces (sin nada que cortar). Cada escenario se corre dos veces: de corrido, y
guardando la partida y cargándola en un motor nuevo cada pocas vueltas; las dos tienen que dar exactamente lo mismo.

**Para el juego**, el mismo `tsc` compila a JavaScript, y los constructores arman los datos: el JSON de cada historia
con sus encargos, de cada verbo con su receta, de cada escena. El juego, el grafo, el modelo lógico (Z3) y la historia
en fichas leen ese JSON. Una sola traducción para todos, porque hay una sola forma de condición.

## 14. De lo que hay hoy a esto

| Hoy | En el lenguaje |
|---|---|
| `hecho:x`, `!hecho:x` | `hechos.x`, `no(hechos.x)` |
| `dicha:x` | `dichas.x` |
| `dias_desde:x:3`, `horas_desde:x:0.5` | `hechos.x.desde('>=', '3d')`, `('>=', '0.5h')` |
| `no_hoy:x` | `no(hechos.x.hoy)` |
| `hora:14-19` | `tiempo.hora.entre(14, 19)` |
| `diana>=conocida` | `estado.diana.gte('conocida')` |
| `afecto:diana:ana>=4` | `cualidad('diana', 'afecto', 'ana').gte(4)` |
| `ana:camison` | `mundo('ana').ropa.es('camison')` |
| `ve:x`, `cerca:…`, `donde:…` | `ve('x', 'ana')`; el paso de un encargo; `mundo('ana').lugar.es(…)` |
| `en: ana=out, marilla=out`, `calesa`, `camino`, `avance:ws:25-60` | los da el encargo: `ida.camino.escuela cumplido` |
| `viaje=white_sands` | la historia en curso (sin escribirlo) |
| `canal`, `prioridad`, `interrumpe`, `sujeta` | el `orden` de la historia; la escena pausa a quienes participan |
| `o: si=…` | `o(…)` en `si`, o otra activación con `\|` |
| `disparo: objeto`, `objeto: espejo`, `paso: 3` | `se_activa: ana tocar empieza`, en la historia de fondo del espejo, con su `orden` |
| `! meta quien tipo` | `encarga` en la historia, o `<<verbo(…)>>` |
| `ana piensa: x` | `ana: x #piensa` |
| `->* x` | `-> x #propia` |
| el código de cada viaje (`34-viaje-white-sands.js`) | el verbo `llevar_a` y sus voces |

## 15. Preguntas abiertas

- **Los verbos del planificador de hoy** (`tomar`, `dar`, `recoger`, `cocinar`, los favores) pasan a `verbos.ts`:
  ¿todos, o solo los que usan las historias, dejando el resto en código por ahora?
- **Escenas en paralelo:** dos escenas con participantes distintos, ¿a la vez o una por vez?
- **El costo de los verbos de búsqueda** puede depender del estado (la paciencia de Marilla hace más caro `ordenar`):
  ¿se escribe como una expresión, o queda fijo?
- **El nombre del lenguaje.**
