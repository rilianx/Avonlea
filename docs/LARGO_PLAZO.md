# Metas de largo plazo (propuesta)

Las cadenas del libro (`docs/CADENAS.md`) son cosas que pasan una vez. El libro también tiene lo que se **acumula**: Ana estudia años para entrar a Queen's, va a la escuela todos los días, le escribe cartas a la tía Josephine, ve a Diana casi todas las tardes. Nada de eso se cumple con una acción: se gana de a poco y se puede perder si se descuida.

La idea es tener **medidores** que suben con lo que se hace día a día, bajan de a poco si no se hace, y **abren cosas** del libro al llegar a cierto nivel (como las cadenas, pero con `requiere: estudio:geometria:6` en vez de `hecho:x`).

## 1. Las amistades

- **Ya existe:** el afecto (0 a 5), +1 por día si Ana pasa media hora con Diana (`juntasTick`), +1 por carta entregada.
- **Falta:**
  - lo mismo con los demás amigos (Ruby, Jane, la Sra. Allan, la Srta. Stacy, Matthew);
  - que se **enfríe** si no se ven: −1 cada tantos días sin verse ni escribirse, nunca bajo un mínimo (las amigas del alma no se olvidan, pero se extrañan);
  - una página en el cuaderno, «Mis amistades», con corazones por persona y una frase de cómo está («Diana te extraña: hace cuatro días que no se ven»).
- **Lo que abre:**
  - con 4 de afecto, el juramento (ya está);
  - con 5, que Diana venga sola a buscarla (una agenda);
  - con la tía Josephine en 4 (cartas), la invitación a Charlottetown (cap. 29).

## 2. La escuela

- Un horario: de lunes a viernes, de 9 a 15:30 (los niños ya lo siguen). Si Ana está en la escuela a las 9, cuenta el día de **asistencia**.
- Faltar sin motivo: Marilla se entera (la Sra. Lynde se lo cuenta) y la Srta. Stacy la quiere un poco menos.
- En clase, con lo que Ana ya sabe hacer (`estudiar`, `recitar`), se gana **estudio** por materia: geometría (su punto débil en el libro), historia, inglés y composición. Estudiar en casa también suma, menos.
- **Lo que abre:**
  - el concierto (ya está, con «ir a la escuela»);
  - el club de cuentos;
  - la clase de Queen's de la Srta. Stacy, después de clases (cap. 29), con suficiente asistencia y estudio.

## 3. Queen's (cap. 29 a 34)

- La clase de Queen's: una hora más después de clases, con Gilbert, Ruby, Jane, Josie… Cada sesión suma más estudio.
- **La rivalidad con Gilbert:** él también estudia (su propia rutina); en la escuela se comparan las notas («Te gané en ortografía…»). Que Ana le gane en algo es una meta del cuaderno.
- **El examen:** en una fecha fija del calendario del juego (anunciada en el cuaderno con tiempo: «El examen de ingreso a Queen's: en 20 días»). Ana va a Charlottetown y el resultado sale de su estudio:
  - si no alcanza, no entra (y se puede repetir al año siguiente);
  - si alcanza, entra;
  - con mucho estudio, queda primera junto con Gilbert, como en el libro.
- Lo que sigue (la beca Avery, la muerte de Matthew, quedarse con Marilla) sería otra cadena larga.

## 4. El calendario

Para que esto tenga sentido hace falta que los días cuenten: semanas (domingo: escuela dominical; sábados sin escuela), estaciones (ya están) y un año escolar. Un año de juego puede durar mucho menos que uno real (por ejemplo, cada estación de 7 a 10 días), pero con el mismo orden que el libro.

## Por dónde empezar (recomendado)

1. **Amistades** visibles en el cuaderno, con frecuentar y enfriarse. Es lo más chico, y casi todo está: `relGetW`, `juntasTick`, `cartaAfecto`.
2. **Escuela** con horario, asistencia y estudio por materia (un medidor en `game.wm`, condiciones nuevas `estudio:materia:n` y `asistencia:n` para el guion y el cuaderno).
3. **Queen's**: la clase, la rivalidad con Gilbert y el examen como cadena del libro, con fecha.

Cada uno con su meta de prueba de varios días (la regresión ya corre días enteros) y su lectura del relato.
