# Las cadenas del libro

En *Ana de las Tejas Verdes* casi nada pasa suelto: una cosa abre la siguiente. Ana no puede jurarle amistad a Diana sin conocerla, ni ir al picnic con ella sin ser amigas, ni pelearse con Gilbert sin haber ido a la escuela. El juego lo arma como un **grafo de hechos**:

- las **escenas del guion** (`src/datos/guion.txt`) se activan por lugar y por estado (`si: hecho:x`, `dias_desde:x:1`, `afecto:diana:ana:4`…) y, al terminar, dejan hechos (`al_terminar: hecho x`), suben el afecto (`afecto quién a_quién n`) o le dan metas a alguien (`meta …`);
- el **cuaderno** (`src/datos/cuaderno.txt`) dice qué meta **requiere** cuáles (otras metas o hechos) y qué **acciones** quedan cerradas mientras tanto: nadie las puede hacer, ni el jugador ni los demás (el planificador no las ve);
- los hechos se guardan con la partida, con el día en que pasaron (por eso una escena puede esperar «al día siguiente»).

Repaso hecho a partir de los resúmenes de `docs/ACCIONES_DEL_LIBRO.md`. ✅ está en el juego; ◻ todavía no.

## 1. Diana, la amiga del alma (cap. 8, 12)

| Paso | En el libro | En el juego |
|---|---|---|
| Ana no conoce a nadie de su edad | cap. 8: Ana pregunta si encontrará una amiga del alma; Marilla le habla de Diana Barry | ✅ Ana empieza sin conocer a Diana: Diana no la saluda como amiga, no pasea con ella, las historias del día con Diana esperan |
| Ana se lo cuenta a Marilla | cap. 8 | ✅ desde el menú de Marilla: «Contarle que quieres una amiga del alma» → escena `quiere_amiga` → hecho `quiere_amiga` |
| Marilla la lleva a La Cuesta del Huerto | cap. 12: a devolver un patrón de falda | ✅ al día siguiente, en la tarde (14:00–17:30), la agenda de Marilla: le pide a Ana que la acompañe y van (`src/js/66-cadenas.js`) |
| La Sra. Barry las presenta | cap. 12 | ✅ escenas `barry_recibe` (llama a Diana) y `conoce_diana` → hecho `conocidas_diana`, y se quieren (afecto 4 y 5) |
| Juran ser amigas del alma | cap. 12: en el jardín, tomadas de las manos | ✅ se abre «Tener una amiga del alma» (la acción `jurar`) |
| (o se encuentran antes por casualidad) | — | ✅ el encuentro `diana_por_casualidad` (solo si Ana todavía no le contó a Marilla): se conocen, pero se quieren menos; para jurar tienen que pasar tiempo juntas (afecto 4) |

Lo que abre la amistad: el picnic, el club de cuentos, el bote de los Barry y el desafío de Josie (abajo).

## 2. El picnic de la escuela dominical (cap. 13, 14)

Requiere ser amigas (✅). En el libro también: el permiso de Marilla (✅, la acción `pedir_permiso`), la canasta (✅) y el broche de amatista que se pierde y Ana «confiesa» para que la dejen ir (◻).

## 3. La escuela y Gilbert (cap. 15, 17, 28, 38)

| Paso | En el libro | En el juego |
|---|---|---|
| Ir a la escuela | cap. 15: Diana la lleva el primer día | ✅ meta «Ir a la escuela» (estar en la escuela) |
| «¡Zanahorias!» y la pizarra | cap. 15 | ◻ la ofensa existe desde el comienzo; falta que pase en la escuela |
| Recitar la lección, el concierto, decorar el salón | cap. 17, 24, 25 | ✅ requieren haber ido a la escuela |
| Gilbert la rescata del bote y ella lo rechaza | cap. 28 | ◻ |
| Hacen las paces | cap. 38 | ✅ requiere haber ido a la escuela (las acciones de disculparse y perdonar con Gilbert, cerradas antes) |

## 4. Diana prohibida (cap. 16, 17, 18)

Requiere ser amigas. El té con Diana y el «cordial» que era vino de grosellas → la Sra. Barry prohíbe la amistad → la despedida junto al manantial → Minnie May con crup, Ana la salva → la Sra. Barry pide perdón. En el juego: el té con Diana ✅, consolarla cuando está triste ✅ (por su estado); la prohibición y el perdón como cadena ◻.

## 5. Los Allan (cap. 21, 22)

| Paso | En el libro | En el juego |
|---|---|---|
| Conocer a la Sra. Allan | cap. 21: llega el nuevo pastor con su esposa | ✅ meta «Ir a la escuela dominical» (estar en la iglesia) |
| El pastel con linimento | cap. 21: Marilla invita a los Allan a tomar el té | ◻ |
| Invitada a la casa parroquial | cap. 22: por carta | ✅ «Tomar el té con la Sra. Allan» requiere haberla conocido (la invitación, cerrada antes) |

## 6. La tía Josephine (cap. 19, 26, 29)

El concierto del Club de Debate con Diana → saltan sobre la cama del cuarto de huéspedes → la tía Josephine se enoja y Ana se gana su amistad → cartas → la visita a Charlottetown. En el juego: la carta a la tía Josephine ✅ (sin requisito todavía); el resto ◻.

## 7. El pelo (cap. 27)

Teñirse el pelo (✅) → queda verde → Marilla se lo corta: «Librarse del pelo verde» requiere haberse teñido (✅).

## 8. El desafío de Josie Pye (cap. 23) y la doncella de los lirios (cap. 28)

- El desafío es en una fiesta en casa de Diana: requiere ser amigas (✅).
- La doncella de los lirios es un juego con las amigas, en el bote de los Barry: remar requiere ser amigas (✅).

## Cómo agregar una cadena

1. En el guion, las escenas de cada paso, con sus condiciones (`si:`) y lo que dejan (`al_terminar: hecho x`).
2. En el cuaderno, la meta con `requiere:` (otra meta o un hecho), `antes:` (cómo se dice lo que falta) y `acciones:` (lo que se cierra mientras tanto); y, si hace falta, una `pista si <condición>:` para cada paso.
3. Si alguien tiene que hacer algo a cierta hora (Marilla va donde los Barry en la tarde), una entrada de agenda con `when:` (como en `src/js/66-cadenas.js`).
4. Una meta de prueba con `cadena: true` (las demás pruebas abren todas las cadenas, para probar una cosa a la vez) y sus pasos en la auditoría (`tools/auditoria/esperado.js`).
