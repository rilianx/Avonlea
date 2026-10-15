# El motor de la historia

Todo lo que pasa en Avonlea sale de tres componentes. Cada uno sigue un modelo conocido de la narrativa interactiva, y usa sus nombres.

| Componente | Qué es | En el estado del arte |
|---|---|---|
| **El estado** | lo que es cierto del mundo: hechos, cualidades y tiempo | *quality-based narrative* (Failbetter, *Fallen London*): el mundo es un diccionario de cualidades |
| **Las escenas** | piezas de historia: precondiciones → contenido → efectos | *storylets* (Kreminski y Wardrip-Fruin, 2018); reglas de diálogo de Valve (*Left 4 Dead*) |
| **El planificador** | cómo cada personaje cumple una meta: acciones con precondiciones y efectos, buscadas con A* | *GOAP* (Jeff Orkin, *F.E.A.R.*) |

Lo que no es motor:
- **El cuaderno** (`src/datos/cuaderno.txt`) solo lee el estado y lo muestra al jugador, para que se guíe. También pone **guiños** en los diálogos: cada meta puede tener frases que alguien dice al pasar (`guiño diana: …`) mientras está abierta y sin cumplir, o mientras está cerrada (`guiño cerrada marilla: …`), para que el jugador se entere sin abrir el cuaderno. Van como mucho dos por persona a la vez: primero los de metas abiertas, después los de metas a las que solo les falta esfuerzo o tiempo.
- **La gente de fondo** (alumnos, granjeros) sigue un horario de lugares por hora: es ambiente, no historia.

## 1. El estado

| Qué | Forma | Ejemplos |
|---|---|---|
| **Hechos** | algo que pasó, con el día en que pasó | `hecho:prohibida`, `dias_desde:prohibida:2` |
| **Hechos con dueño** | algo que alguien sabe | `sabe:marilla:diana_borracha` |
| **Cualidades** | un número con dueño (y, si es de uno hacia otro, a quién) | `granja:ana>=15`, `estudio:gilbert<30`, `afecto:diana:ana>=4` |
| **Tiempo** | la hora, el día, la estación | `estacion:verano`, `dia_estacion:1` |

- Las **habilidades** (estudio, granja, letras: `src/datos/habilidades.txt`) son cualidades que suben con las acciones de quien las hace. Cualquier personaje las tiene, no solo Ana.
- El **afecto** es una cualidad de uno hacia otro, de 0 a 5.
- Las formas antiguas siguen valiendo: `afecto:diana:ana:4` es `afecto:diana:ana>=4`; `estudio:30` es `estudio:ana>=30`; `camino:granja:15` es `granja:ana>=15`.

## 2. Las escenas (storylets)

Están en `src/datos/guion.txt`. Cada escena tiene:

- **Precondiciones:** dónde y quiénes (`en: ana=gg, marilla=gg`), y qué tiene que ser cierto (`si:` con hechos, cualidades y tiempo).
- **Contenido:** las líneas de diálogo, con narración entre paréntesis.
- **Efectos** (`al_empezar:`, `al_terminar:`):
  - `hecho x` y `olvidar x`;
  - `contar quien x`: un hecho con dueño;
  - `suma granja:ana 2`, `suma afecto:diana:ana -1`;
  - `meta quien tipo args`: un **encargo**, una meta para un personaje que el planificador sabe cumplir.
- **Repetición:** `repetir: una_vez` (por defecto), `dia` o `siempre`. Una rutina es una escena que se repite.

**Cómo se elige** cuando varias escenas pueden decirse a la vez en un canal:
1. va la de más **prioridad**;
2. a igual prioridad, la **más específica**, la que pide más condiciones (como en las reglas de diálogo de Valve). Así una frase para «después del crup, en invierno» le gana sola a la genérica.

**El ritmo** (un *drama manager* mínimo, como el de *Façade* o el narrador de *RimWorld*):
- Una escena marcada `grande` empieza algo grande del libro (el broche, la prohibición, el crup, la tía Josephine…).
- Como mucho hay una grande por día (`RITMO_GRANDES`), así que dos grandes nunca caen la misma tarde.
- Si una grande no puede pasar hoy, espera a mañana. Las que continúan una cadena ya empezada (salvar a Minnie May después del aviso) no se marcan, para que nada las corte.

**Las conversaciones** (`src/datos/conversaciones.txt`): escenas de Ana con los suyos (Marilla, Matthew, Diana, la Sra. Lynde, la Sra. Barry, el Sr. Harrison), inspiradas en el libro, que dependen sobre todo de la cercanía (`afecto:marilla:ana>=4`). No se disparan por lugar: se tienen desde el menú de la persona (💬) o, a veces, solas, cuando Ana está cerca y libre y la otra persona no está ocupada. Se pueden tener todas las que se quiera, pero lo que suman (las que marcan un paso en la relación suman afecto; otras, una habilidad) sube como mucho una vez al día por cada cualidad: si hoy ya subió, se nota al día siguiente.

**Todas son escenas.** Lo que cambia es qué las dispara (`disparo:`): el lugar y el estado (lo normal), el encuentro de dos personajes, la conversación desde el menú (`conversar`), la primera vez que se hace algo (`primera`), un menú propio (`menu`, como las señas con la vela), un hito.

**Lo que pasa en medio de una escena:** una línea `! acción` se hace cuando le llega su turno, entre los diálogos: `! sentar ana` (a su lugar en la mesa de la cocina), `! levantar marilla`, `! ana llora=true` (llora con la cabeza en la mesa), `! dormir` (pasa la noche), y cualquier efecto (`! suma afecto:marilla:ana 1`). Cuando una elección cambia el cariño hacia Ana, se ve: corazones y un aviso («♥ Marilla te mira con otros ojos (cariño 3/5)»), para que el jugador entienda qué hacen sus decisiones.

**El tiempo y las decisiones:** mientras el jugador decide (una elección de una escena, un menú, un nombre que escribir) o lee una tarjeta, el mundo se detiene. Ana va sola solo con el botón 🤖 (modo automático): entonces el tiempo sigue y ella elige sola después de un rato. Ya no se pone en automático porque el jugador deje de tocar.

**Cómo se ve cada línea** (como en una historieta): lo que alguien dice, en un globo con su colita; lo que se cuenta de alguien, cómo se siente o qué hace (entre paréntesis al comienzo de la línea: `ana: (Ana se queda quieta, sin respirar.) ¿Para siempre?`), en un cuadro de narración fijo arriba de la pantalla (uno debajo del otro si hay varios); lo que piensa (`ana piensa: No voy a mirar.`), en una nube de pensamiento. Capturas: `trazas/globos-narra-y-dice.png`, `trazas/globos-piensa.png`.

**Escenas con alternativas** (como en Yarn Spinner, Ink, o los eventos de *Stardew Valley*): en las líneas de una escena, `-> lo que Ana puede hacer` abre una opción; debajo, con sangría, sus propias líneas (`quien: texto`) y lo que deja (`! hecho x`, `! suma afecto:marilla:ana 1`, `! log …`). Con `->*`, lo que Ana haría sola. La escena se detiene en la elección: el jugador elige en un menú; si no está (Ana va sola), después de unos segundos elige Ana. Después sigue con la opción elegida y con lo que venga después, igual para todas.

```
lynde: Es terriblemente flaca y fea, Marilla. ¡Y el pelo, rojo como zanahoria!
-> ¡La odio! ¡Es una mujer grosera e insensible!
   ana: ¡La odio, la odio, la odio!
   ! hecho ofendio_lynde
->* Apretar los puños y contar hasta diez
   ana: Buenas tardes, Sra. Lynde.
   ! suma afecto:marilla:ana 1
```

**La narración:** una escena puede llevar `narra: texto` (una o varias líneas), lo que la explica: quién es quién, qué pasó antes, dónde estamos (la introducción, la Sra. Spencer, la Sra. Lynde, los Barry, el crup, el examen…). Sale en una tarjeta, como la página de un libro, antes de las líneas; mientras está abierta el tiempo se detiene (el mundo espera), y la escena espera a que el jugador siga («Seguir», espacio o Enter); si Ana va sola, sigue después de un rato. Dentro de las líneas, `narra: texto` también vale.

**Los nombres que pone Ana** (`src/js/57-nombres-de-ana.js`): cuando Ana bautiza algo (la Avenida, la laguna de Barry, el cerezo de su ventana, los lugares de Avonlea), el jugador elige entre el nombre del libro y uno propio, que escribe en una caja. Desde entonces esa cosa se llama así en todas partes: en lo que se dice, en el diario, en el mapa, en los letreros y en lo que se le cuenta a la IA. En una escena es una alternativa más; el estado que queda depende del camino elegido:

```
ana: Oh, ese nombre tampoco me gusta. La llamaré… a ver…
->* el Lago de las Aguas Brillantes
   ana: El Lago de las Aguas Brillantes. Sí, ése es su nombre verdadero.
   ! nombrar lago          (el del libro: hecho nombro_lago)
-> Otro nombre…
   ana: El Lago de las Aguas Brillantes. Sí, ése es su nombre verdadero.
   ! nombrar lago ?        (el que escribe el jugador: nombro_lago y nombre_propio_lago)
```

Las líneas se escriben con el nombre del libro: el juego lo cambia solo por el de Ana (respetando «del», «al» y la mayúscula). Ana sola, sin jugador, usa el del libro.

**Los comentarios** (`src/datos/comentarios.txt`): lo que alguien dice al pasar, al mirar algo o al hacer algo, también son escenas: de una sola línea, con sus condiciones (`- [estacion:invierno] texto`), agrupadas por el momento en que se dicen (`=== ventana ===`, `=== espejo ===`, `=== ana_sola ===`, `=== sueno_1 ===`…). Las elige el mismo motor (no la misma de la vez anterior; las más específicas, el doble de seguido), pero no detienen a nadie, no tienen efectos y se pueden repetir. Así no queda ninguna frase suelta en el código: todo lo que se dice está en el guion, con condiciones, y lo revisa el grafo.

**Lo corto también tiene condiciones:** las frases propias de cada personaje (`src/datos/personajes.json`, `[hecho:se_queda] texto`), los diálogos de dos o tres al encontrarse (`si:`) y los chismes. Así nadie habla como si conociera a Ana antes de conocerla: mientras Ana está a prueba, Marilla es seca y Matthew tímido; Diana y la Sra. Barry saludan como a una extraña hasta que se conocen; la Sra. Lynde, ofendida, no le habla hasta la disculpa. Las pistas (guiños) solo las da alguien que ya conoce a Ana.

**Las cosas** (`disparo: objeto`, `objeto: gwin`): cada cosa que Ana usa o mira (la ventana de su pieza, el espejo, el armario, el mar desde el faro, el banco del lago, el fuego, la pizarra, la gata…) tiene muchas escenas, cada una para su momento: por estación y hora (`repetir: dia`, que vuelven de vez en cuando), o por lo que ya pasó (una vez: la ventana después de la prohibición, el espejo después de «¡Zanahorias!»). Como mucho una al día por cosa: la de más prioridad y, a igual, la más específica; entre iguales, una que no se haya visto. Las demás veces, la frase de siempre. Con `tambien`, la cosa se hace igual (sentarse, calentarse).

**Los lugares** (`disparo: lugar`, `lugar: bosque_encantado`): cuando Ana pasa libre por un lugar de Avonlea (el Bosque Encantado, el puente del arroyo, el Camino Blanco, el lago, el campo rosado, la playa, la huerta…), el lugar le dice algo. Una al día por lugar, y con un respiro entre una y otra. Si Ana va camino a un encargo, no.

**Escenas que interrumpen lo que sea** (`interrumpe`): como la Avenida en flor en el viaje desde Bright River. No esperan a que termine la charla ni a que Ana esté libre (aunque vaya camino a un encargo, o en la carreta): cortan lo que se está diciendo (la charla al pasar, una conversación de menos prioridad, que queda donde iba para seguir otro día) y Ana se detiene; después, todo sigue. Nunca cortan una elección del jugador ni una tarjeta de narración. Ejemplos: el Camino Blanco la primavera en que Ana ya es de Tejas Verdes, la primera vez que ve el mar, la primera nieve.

**El estilo de estas escenas** (el de la ventana): que inspiren. Primero lo que se ve, se oye o se huele, concreto, de esa estación y esa hora; después Ana lo transforma con su imaginación (una imagen, un cuentito, las cosas como si sintieran); al final, un sentimiento chico que se queda (gratitud, nostalgia, ganas, un poco de humor sobre sí misma). Dos o tres líneas. La IA tiene la misma indicación para sus escenas improvisadas.

**La ropa:** Ana se acuesta en camisón y amanece en camisón (sin sombrero); se viste cuando el jugador lo decide, en el armario, igual que el sombrero. La primera noche deja el vestido y los zapatos tirados en el suelo: al día siguiente el jugador decide si los dobla y los guarda (Marilla lo nota: más cariño) o se los pone arrugados (y Marilla lo nota también). Con 🤖, Ana se viste sola en la mañana.

**Tocar una cosa:** con Ana al lado, si allí se puede hacer más de una cosa (otra cosa en el mismo lugar, o algo de ella que se hace justo ahí: lavar los platos en la mesa, escribir en el escritorio), sale un menú con todo; si hay una sola, se hace.

**La primera vez** (`src/js/66-primeras-veces.js`): la primera vez que Ana hace algunas cosas (mirar por la ventana de su pieza, mirarse al espejo, subir a su pieza, abrir el armario, ver el mar desde el faro…), en vez de la frase de siempre sale una escena del guion, `primera_<acción>` con `disparo: primera`. Con `tambien`, la acción se hace igual (subir la escalera).

**Los hitos:** al cruzar un umbral de una habilidad de Ana, alguien se lo dice la próxima vez que se encuentran (con IA, una escena improvisada; sin IA, la línea escrita). Luego queda el hecho `hito_<habilidad>_<n>`.

## 3. El planificador (GOAP)

Las escenas dicen **qué** pasa; el planificador decide **cómo**. Cada personaje tiene metas: las que le da una escena (un encargo), las de su agenda y las que le pide alguien. Para cumplirlas busca con A* una secuencia de acciones, cada una con precondiciones y efectos (ir, tomar, pedir, cocinar…), y vuelve a planificar si algo cambia. Las acciones también cambian el estado: suben habilidades, dejan objetos, cambian el afecto.

Un encargo puede ser:
- **una meta:** un estado a lograr («Ana está en La Cuesta del Huerto»); el planificador busca los pasos;
- **una coreografía:** pasos exactos, en orden, cuando el libro pide un gesto preciso.

## 4. Cómo se comprueba

| Herramienta | Qué hace | Salida |
|---|---|---|
| `node tools/grafo.js` (corre solo con cada build) | revisa el grafo: escenas o metas que piden un hecho que nada deja (nunca pasarían), condiciones mal escritas, hechos que nada lee | `trazas/grafo.md` |
| `node tools/auditoria.js` | corre cada meta de prueba y compara el relato del juego con lo que debería pasar | `trazas/auditoria.md` |
| lectura a mano | lo que las comparaciones no ven | `trazas/lectura.md` |

## Lo que queda (del estado del arte)

- **Prácticas sociales** (*Versu*, Evans y Short): las actividades de varios (el té, la cena, el picnic) como estructuras con roles. Hoy el té es un caso especial.
- **Cualidades que bajan solas** (el afecto que se enfría): sería un efecto de una rutina diaria, sin mecánica nueva.
- **La agenda como escenas que se repiten:** hoy la agenda de los personajes está en el código (`AGENDA`); pasarla al guion la dejaría en el mismo formato que todo lo demás.

## Fuentes

- Kreminski y Wardrip-Fruin, *Sketching a Map of the Storylets Design Space* (ICIDS 2018); [Emily Short sobre storylets](https://emshort.blog/2019/01/06/kreminski-on-storylets/).
- Elan Ruskin, *AI-driven Dynamic Dialog through Fuzzy Pattern Matching* (GDC 2012); [resumen de Emily Short](https://emshort.blog/2012/03/16/gdc-2012-talk-on-dynamic-dialogue/).
- Jeff Orkin, [*Three States and a Plan: the AI of F.E.A.R.*](https://gdcvault.com/play/1013282/Three-States-and-a-Plan) (GDC 2006).
- Evans y Short, [*Versu*](https://www.cs.uky.edu/~sgware/reading/papers/evans2014versu.pdf).
- Mateas y Stern, [*Façade*](https://users.soe.ucsc.edu/~michaelm/tenurereview/publications/mateas-tidse2003.pdf) (2003).
