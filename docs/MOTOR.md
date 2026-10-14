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

**Las conversaciones** (`src/datos/conversaciones.txt`): escenas de Ana con los suyos (Marilla, Matthew, Diana, la Sra. Lynde, la Sra. Barry, el Sr. Harrison), inspiradas en el libro, que dependen sobre todo de la cercanía (`afecto:marilla:ana>=4`). No se disparan por lugar: se tienen desde el menú de la persona (💬) o, a veces, solas, cuando Ana está cerca y libre y la otra persona no está ocupada. Como mucho una por día con cada uno. Las que marcan un paso en la relación suman afecto; otras, una habilidad.

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
