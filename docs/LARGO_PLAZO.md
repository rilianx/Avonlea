# Lo que se gana de a poco

Las cadenas del libro (`docs/CADENAS.md`) pasan una vez. Lo de largo plazo, en cambio, se gana día a día. Para que se pueda hacer, lo más simple posible: **un número por habilidad** (como en *Princess Maker* o *Stardew Valley*), y el afecto que ya existía.

## El calendario

- **Una estación dura 14 días** (`DIAS_ESTACION`, en `src/js/34-hablar.js`), así que un año del juego son 56 días.
- **No hay clases los domingos ni en verano** (`hayClases()`). Esos días los niños juegan afuera, y la maestra pasea por la aldea.
- El cuaderno muestra la fecha: «martes, día 3 de la primavera».

## Las habilidades

Cada habilidad es **una cualidad** (un número con dueño, ver `docs/MOTOR.md`) que sube con lo que cada uno hace, día a día: Ana, pero también Gilbert o Diana. Están escritas aparte, en `src/datos/habilidades.txt`, como el guion y el cuaderno: para agregar una habilidad o un hito basta con escribirlo ahí, a mano o pidiéndoselo a una IA.

- **`suma:`** las acciones que lo hacen subir. Cada una suma **+1, una vez al día**, si Ana la hace unos minutos. `clase` es una hora en la escuela, un día con clases.
- **`por_dia:`** cuánto puede subir en un día, como mucho (2).
- **`hito N:`** lo que significa llegar a N. Se avisa (📈), se lee en el cuaderno, y quien dice `con:` se lo dice a Ana la próxima vez que la encuentra:
  la línea escrita en `dice:` (la línea `ia:` queda guardada para la IA que vendrá).

  Contado el hito, queda el hecho `hito_<habilidad>_<N>`, para el guion. Las escenas también pueden esperar un nivel: `si: granja:ana>=15`.

Las habilidades que hay:

| Habilidad | Sube con | Hitos |
|---|---|---|
| El estudio | clases, estudiar, recitar, leer, ensayar | 20: la Srta. Stacy la anota para Queen's · 50: podría entrar · 85: podría quedar primera |
| La granja de Tejas Verdes | quehaceres, ordeñar, dar de comer, sembrar, regar, batir, leña, heno, cocinar, coser, recoger | 10: Marilla cuenta con ella · 40: el vestido de mangas abullonadas de Matthew · 80: Tejas Verdes también es suya |
| Las letras y la imaginación | escribir cuentos y cartas, ponerle nombre a los lugares, adornar | 10: Diana la admira · 30: la Srta. Stacy lee su composición · 60: un cuento para una revista |

El cuaderno muestra cada habilidad de Ana con su número, una barra y el próximo hito.

## El examen de Queen's (cap. 31, 32)

- El primer día de cada verano, **desde el segundo año** (`dia_juego:56`), en la cocina con Marilla, si Ana tiene al menos **20** de estudio (para que la Srta. Stacy la mande).
- Sale una de tres escenas, según el estudio:

  | Escena | Estudio | Resultado |
  |---|---|---|
  | `examen_no` | 20 a 49 | no entra, y hay otro examen el próximo verano |
  | `examen_entra` | 50 a 84 | entra |
  | `examen_primera` | 85 o más | primera, empatada con Gilbert |

- Con todo el esfuerzo (2 por día de clases), 50 se alcanza en poco más de medio año de clases; 85, en casi un año entero. En el libro, Ana se prepara unos dos años.

## Los tiempos del libro

Un año del juego son 56 días y en el libro pasan unos cuatro años, así que **un mes del libro son unos 4 o 5 días del juego**. Las cadenas esperan lo que corresponde (ver `docs/CADENAS.md`): el broche, 5 días de amigas; el crup, 12 días después de la prohibición; los Allan, 14 días después de la primera escuela dominical. Algunas, además del tiempo, piden puntos: el té con Diana, que Diana la quiera 5 (5 días); la tía Josephine, que Diana la quiera 5 y 10 de letras (15 días); hacer las paces con Gilbert, 30 de estudio (28 días después de «¡Zanahorias!»). 

## Las amistades

- No hay mecánicas nuevas: el afecto ya sube estando juntas (`juntasTick`), con cartas (`cartaAfecto`), con regalos y con las escenas.
- El cuaderno muestra **quiénes la quieren**, con corazones de 0 a 5.

## Para el guion y el cuaderno

Condiciones nuevas:
- `estudio:ana>=n`, `granja:ana>=n`, `estudio:gilbert<n`…: una cualidad comparada con un número;
- `estacion:verano`;
- `dia_estacion:n`: el día n de la estación, desde 1.

Una pista del cuaderno puede decir `{estudio}` y `{dias_examen}`.
