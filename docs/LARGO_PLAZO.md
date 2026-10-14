# Lo que se gana de a poco

Las cadenas del libro (`docs/CADENAS.md`) pasan una vez. Lo de largo plazo, en cambio, se gana día a día. Para que se pueda hacer, lo más simple posible: **un solo número de estudio** y el afecto que ya existía.

## El calendario

- **Una estación dura 14 días** (`DIAS_ESTACION`, en `src/js/34-hablar.js`), así que un año del juego son 56 días.
- **No hay clases los domingos ni en verano** (`hayClases()`). Esos días los niños juegan afuera, y la maestra pasea por la aldea.
- El cuaderno muestra la fecha: «martes, día 3 de la primavera».

## El estudio

`game.wm.estudio`: los días de estudio (`src/js/66-escuela.js`). Suma, como mucho, 2 por día:

- **+1** por un día de clases: una hora dentro de la escuela, entre las 9:00 y las 15:30, un día con clases;
- **+1** por estudiar la lección: veinte minutos.

No hay materias ni olvido.

## El examen de Queen's (cap. 31, 32)

- El primer día de cada verano, en la cocina con Marilla, si Ana tiene al menos **10** días de estudio (para que la Srta. Stacy la mande).
- Sale una de tres escenas, según el estudio:

  | Escena | Estudio | Resultado |
  |---|---|---|
  | `examen_no` | menos de 30 | no entra, y hay otro examen el próximo verano |
  | `examen_entra` | 30 o más | entra |
  | `examen_primera` | 60 o más | primera, empatada con Gilbert |

- En el cuaderno: «Entrar a Queen's», con cuántos días de estudio lleva y cuántos días faltan para el examen.
- Con todo el esfuerzo (2 por día de clases), 30 se alcanza durante la primera primavera, antes del primer examen. 60 toma casi un año.

## Las amistades

- No hay mecánicas nuevas: el afecto ya sube estando juntas (`juntasTick`), con cartas (`cartaAfecto`), con regalos y con las escenas.
- El cuaderno muestra **quiénes la quieren**, con corazones de 0 a 5.

## Para el guion y el cuaderno

Condiciones nuevas:
- `estudio:n`: al menos n días de estudio;
- `estacion:verano`;
- `dia_estacion:n`: el día n de la estación, desde 1.

Una pista del cuaderno puede decir `{estudio}` y `{dias_examen}`.
