# Las cadenas del libro

En *Ana de las Tejas Verdes* casi nada pasa suelto: una cosa abre la siguiente. Ana no puede jurarle amistad a Diana sin conocerla, ni ir al picnic con ella sin ser amigas, ni pelearse con Gilbert sin haber ido a la escuela. El juego lo arma como un **grafo de hechos**:

- las **escenas del guion** (`src/datos/guion.txt`) se activan por lugar y por estado (`si: hecho:x`, `dias_desde:x:1`, `afecto:diana:ana:4`…) y, al terminar, dejan hechos (`al_terminar: hecho x`), suben el afecto (`afecto quién a_quién n`) o le dan metas a alguien (`meta …`);
- el **cuaderno** (`src/datos/cuaderno.txt`) dice qué meta **requiere** cuáles (otras metas o hechos) y qué **acciones** quedan cerradas mientras tanto: nadie las puede hacer, ni el jugador ni los demás (el planificador no las ve);
- los hechos se guardan con la partida, con el día en que pasaron (por eso una escena puede esperar «al día siguiente»).

**Los tiempos:** un año del juego son 56 días y en el libro pasan unos cuatro años, así que un mes del libro son unos 4 o 5 días del juego. Las cadenas esperan lo que corresponde (abajo).

Repaso hecho a partir de los resúmenes de `docs/ACCIONES_DEL_LIBRO.md`. ✅ está en el juego; ◻ todavía no.

## 0. El comienzo: Ana, a prueba (cap. 3 a 8)

Una partida nueva empieza la noche en que Ana llega a Tejas Verdes (`src/js/66-inicio.js`); si se juega el capítulo 1, se sigue desde su llegada. Marilla quería un niño: parte queriéndola poco (afecto 1) y Matthew, mucho (4).

| Paso | En el libro | En el juego |
|---|---|---|
| «¿Dónde está el niño?» | cap. 3 | ✅ la escena `inicio_llegada`, esa noche en la cocina: el llanto de Ana, «llámeme Cordelia», «Ana con e»; se queda esa noche |
| El desayuno | cap. 4 | ✅ `desayuno_prueba`, a la mañana siguiente: Marilla anuncia que en la tarde van donde la Sra. Spencer |
| White Sands y la Sra. Blewett | cap. 5, 6 | ✅ `viaje_spencer`, esa tarde: Ana cuenta su vida en el camino; la Sra. Blewett la quiere de sirvienta; Marilla no se la da → hecho `a_prueba` |
| Se queda para siempre | cap. 7, 8 | ✅ `se_queda` (grande): cuando Ana ayudó con los quehaceres, dice sus oraciones, Marilla la quiere 3 y pasaron 3 días → hecho `se_queda` |

En el cuaderno: «Quedarse en Tejas Verdes», con pistas de lo que falta. Lo que espera a que Ana se quede: contarle a Marilla que quiere una amiga, y conocer a Diana.

## 1. Diana, la amiga del alma (cap. 8, 12)

| Paso | En el libro | En el juego |
|---|---|---|
| Ana no conoce a nadie de su edad | cap. 8: Ana pregunta si encontrará una amiga del alma; Marilla le habla de Diana Barry | ✅ Ana empieza sin conocer a Diana: Diana no la saluda como amiga, no pasea con ella, las historias del día con Diana esperan |
| Ana se lo cuenta a Marilla | cap. 8 | ✅ desde el menú de Marilla: «Contarle que quieres una amiga del alma» → escena `quiere_amiga` → hecho `quiere_amiga` |
| Marilla la lleva a La Cuesta del Huerto | cap. 12: a devolver un patrón de falda | ✅ al día siguiente, en la tarde (14:00–17:30), la agenda de Marilla: le pide a Ana que la acompañe y van (`src/js/66-cadenas.js`) |
| La Sra. Barry las presenta | cap. 12 | ✅ escenas `barry_recibe` (llama a Diana) y `conoce_diana` → hecho `conocidas_diana`, y se quieren (afecto 4 y 5) |
| Juran ser amigas del alma | cap. 12: en el jardín, tomadas de las manos | ✅ se abre «Tener una amiga del alma» (la acción `jurar`) |
| (o se encuentran antes por casualidad) | — | ✅ el encuentro `diana_por_casualidad` (solo si Ana todavía no le contó a Marilla): se conocen, pero se quieren menos; para jurar tienen que pasar tiempo juntas (afecto 4) |

Lo que abre la amistad: el broche y el picnic, el té con Diana, el club de cuentos, el bote de los Barry, el desafío de Josie y la tía Josephine (abajo).

## 1b. Las señas con la vela (cap. 18)

Una vez juradas amigas y con Diana queriéndola 4, la conversación `conv_diana_vela` (desde el menú de Diana): inventan un código con una vela y un cartón. Desde entonces, de noche (desde las 19:00), la ventana de la pieza de Ana ofrece «🕯 Hacerle señas a Diana con la vela»: la escena `senas_vela`, una vez por noche, y Diana la quiere un poco más. Mientras dure la prohibición, no.

## 2. El picnic de la escuela dominical (cap. 13, 14)

Requiere ser amigas (✅). En el libro también: el permiso de Marilla (✅, la acción `pedir_permiso`), la canasta (✅) y el broche de amatista que se pierde y Ana «confiesa» para que la dejen ir (✅ la escena `broche`, en la cocina, después de 5 días de amigas (en el libro, un mes); el picnic requiere `hecho:broche`).

## 3. La escuela y Gilbert (cap. 15, 17, 28, 38)

| Paso | En el libro | En el juego |
|---|---|---|
| Ir a la escuela | cap. 15: Diana la lleva el primer día | ✅ meta «Ir a la escuela» (estar en la escuela) |
| «¡Zanahorias!» y la pizarra | cap. 15 | ✅ la escena `zanahorias`, la primera vez que Ana entra a la escuela con Gilbert: deja el hecho `zanahorias` y la ofensa (Ana ya no le habla) |
| Recitar la lección, el concierto, decorar el salón | cap. 17, 24, 25 | ✅ requieren haber ido a la escuela |
| Gilbert la rescata del bote y ella lo rechaza | cap. 28 | ◻ |
| Hacen las paces | cap. 38 | ✅ requiere `hecho:zanahorias` y que pasen 28 días con mucha rivalidad en clases (estudio de Ana 30; en el libro, años) (las acciones de disculparse y perdonar con Gilbert, cerradas antes) |

## 4. Diana prohibida (cap. 16, 17, 18)

| Paso | En el libro | En el juego |
|---|---|---|
| El té con Diana | cap. 16 | ✅ desde el menú de Diana, cuando Diana la quiere 5 (pasar tiempo juntas, cartas, regalos) y se conocen hace 5 días (en el libro, unos tres meses): «Invitarla a tomar el té en Tejas Verdes» (Ana prepara el té, la invita, la espera) |
| El «cordial» era vino de grosellas | cap. 16 | ✅ la escena `te_grosella`, sentadas a la mesita: Diana se va a su casa, mareada → hecho `diana_borracha` |
| La Sra. Barry prohíbe la amistad | cap. 16 | ✅ al día siguiente, la escena `prohibida` → hecho `prohibida`: se cierran el té, el picnic, el club, el bote, el desafío y la cama de la tía Josephine; Diana está triste; no se saludan como amigas ni conversan; en el cuaderno aparece «Recuperar la amistad de los Barry» |
| Ana pide perdón y no la perdonan | cap. 16 | ✅ la escena `barry_no_perdona` (si Ana va a La Cuesta del Huerto) |
| Minnie May con crup | cap. 18 | ✅ 12 días después (en el libro, unos tres meses), en la noche, Diana corre a Tejas Verdes (agenda urgente: no se para a conversar); la escena `crup_aviso`, y las dos corren a La Cuesta del Huerto |
| Ana la salva; la Sra. Barry pide perdón | cap. 18 | ✅ la escena `crup_salva` → se olvida la prohibición, hecho `perdonada`, y se quieren más |

## 5. Los Allan (cap. 21, 22)

| Paso | En el libro | En el juego |
|---|---|---|
| Conocer a la Sra. Allan | cap. 21: llega el nuevo pastor con su esposa | ✅ meta «Ir a la escuela dominical» (estar en la iglesia) |
| Marilla invita a los Allan | cap. 21 | ✅ la escena `invita_allan`, 14 días después de la primera escuela dominical → hecho `allan_invitados` |
| El pastel con linimento | cap. 21 | ✅ 3 días después, la Sra. Allan viene a la tarde (agenda); cuando se sienta, la escena `pastel_linimento` → la invita a la casa parroquial |
| Invitada a la casa parroquial | cap. 22 | ✅ «Tomar el té con la Sra. Allan» requiere `hecho:pastel_linimento` (la invitación a Ana, cerrada antes) |

## 6. La tía Josephine (cap. 19, 26, 29)

El concierto del Club de Debate con Diana → saltan sobre la cama del cuarto de huéspedes → la tía Josephine se enoja y Ana se gana su amistad → cartas → la visita a Charlottetown. En el juego: ✅ la escena `cama_josephine` en casa de Diana (amigas desde hace 15 días, Diana la quiere 5 y Ana tiene 10 de letras —a la tía Josephine le encanta la imaginación—, y sin prohibición; es una escena grande, así que no cae el mismo día que otra, como el crup: ver el ritmo en `docs/MOTOR.md`) → hecho `cama_josephine`; las cartas a la tía Josephine se abren después (✅); la visita a Charlottetown ◻.

## 7. El pelo (cap. 27)

Teñirse el pelo (✅) → queda verde → Marilla se lo corta: «Librarse del pelo verde» requiere haberse teñido (✅).

## 8. El desafío de Josie Pye (cap. 23) y la doncella de los lirios (cap. 28)

- El desafío es en una fiesta en casa de Diana: requiere ser amigas (✅).
- La doncella de los lirios es un juego con las amigas, en el bote de los Barry: remar requiere ser amigas (✅).

## Las frases sueltas también esperan

Las frases que cada uno dice al pasar pueden esperar a que algo del libro haya pasado: `[hecho:perdonada] Esta vez el cordial de frambuesa está bien etiquetado…` (en `src/datos/personajes.json` y en `src/js/56-gente-de-avonlea.js`). Así la tía Josephine no habla de la cama antes de la cama, ni Gilbert de «Zanahorias» antes de la escuela.

## Cómo agregar una cadena

1. En el guion, las escenas de cada paso, con sus condiciones (`si:`) y lo que dejan (`al_terminar: hecho x`).
2. En el cuaderno, la meta con `requiere:` (otra meta, un hecho, una cualidad: `afecto:diana:ana>=5`, `letras:ana>=10`), `antes:` (cómo se dice lo que falta) y `acciones:` (lo que se cierra mientras tanto); si hace falta, una `pista si <condición>:` para cada paso; y **guiños**, lo que alguien dice al pasar para que el jugador se entere (`guiño diana: …`, `guiño cerrada marilla: …`).
3. Si alguien tiene que hacer algo a cierta hora (Marilla va donde los Barry en la tarde), una entrada de agenda con `when:` (como en `src/js/66-cadenas.js`).
4. Una meta de prueba con `cadena: true` (con `tambien:` para que otro espere donde la cadena lo necesita, y `hasta:` para seguirla hasta su último hecho) (las demás pruebas abren todas las cadenas, para probar una cosa a la vez) y sus pasos en la auditoría (`tools/auditoria/esperado.js`).
