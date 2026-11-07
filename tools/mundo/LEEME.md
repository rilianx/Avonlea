# El mundo mínimo

El mundo del juego sin dibujarlo, para probar historias, acciones y viajes en milisegundos, sin abrir el navegador.

El juego hace dos cosas: decide qué pasa (quién va adónde, cuánto tarda, quién ve a quién) y lo dibuja. El mundo mínimo
hace solo lo primero:

- **Lugares, no píxeles.** Cada persona está en un lugar del lenguaje (`docs/lenguaje/comun/mundo.ts`), o va de uno a
  otro y llega a una hora.
- **Los minutos son los del mapa real.** `exportar.js` abre el juego una vez y mide, entre cada par de lugares, cuánto
  se tarda a pie, Ana (que va más rápido) y en calesa. Usa la red de caminos de Avonlea y las millas de los caminos
  largos (Bright River, la costa). El resultado queda en `geografia.json`.
- **El reloj salta de evento en evento.** El motor del lenguaje pregunta cuándo termina cada cosa y salta hasta ahí. Un
  día entero se juega en milisegundos.
- **La gente del pueblo** (la Sra. Pye, la Sra. Spencer…) no camina: aparece donde la pone una historia, como en el
  juego.

Tiene la misma interfaz que el mundo simulado (`tools/lenguaje/mundo_simulado.js`), que la documenta.

## Verlo

La página `trazas/lenguaje.html` (`node tools/lenguaje/pagina.js`) juega las historias en el mundo mínimo, con «el mapa
real»: arriba se ve Avonlea desde arriba (la costa, los caminos), los caminos largos saliendo de sus letreros tan largos
como sus minutos, cada lugar del lenguaje y cada persona donde está a esa hora. Quien va de camino avanza por el camino.
▶ Reproducir avanza el reloj y se para cuando le piden algo a Ana. El mundo simulado sigue ahí, como opción.

## Qué hay

| Archivo | Qué hace |
|---|---|
| `exportar.js` | Abre el juego (`index.html`) y escribe `geografia.json`. Se corre de nuevo si cambia el mapa o un camino. |
| `geografia.json` | Los lugares, los minutos entre ellos, los caminos largos con sus tramos, y la gente del pueblo. |
| `huella.js` | La huella de las fuentes de la geografía. Si el mapa cambió y no se exportó, el mundo mínimo avisa. |
| `mundo_minimo.js` | El mundo, para el motor del lenguaje. |
| `consola.js` | Jugar a mano, o correr pruebas escritas con los mismos comandos. |
| `pruebas/*.txt` | Las pruebas. |
| `sin_navegador.js` | Carga el código del juego en node, con una pantalla de mentira (todo lo que es dibujo responde y no hace nada), en unos 400 ms. Sirve para usar la lógica del juego —el planificador, el guion— sin abrir un navegador. |
| `planes.js` | Las metas de prueba del planificador (`src/js/64-metas-de-prueba.js`), en el estado lógico: prepara cada una como siempre, planifica, ejecuta el plan acción por acción (su efecto y lo que dura) y mira si llega y a qué hora. |
| `planes.esperado.json` | Lo que dio cada meta. `planes.js` avisa lo que cambie. |

## Uso

```
node tools/mundo/exportar.js                      # medir el mapa (cuando cambia)
node tools/mundo/consola.js                       # jugar a mano («ayuda» dice los comandos)
node tools/mundo/consola.js tools/mundo/pruebas/*.txt          # las pruebas
node tools/mundo/consola.js --ver tools/mundo/pruebas/white_sands_corre.txt   # una prueba, viendo lo que pasa
node tools/mundo/consola.js -e "nueva 3 09:00; ir escuela; avanzar 30m; donde"
node tools/lenguaje/probar.js --mundo minimo      # los escenarios de probar.js, con las distancias reales
node tools/mundo/planes.js                        # las metas del planificador, sin navegador (unos 3 s)
node tools/mundo/planes.js --ver vaca             # solo las que dicen «vaca», con cada paso
node tools/mundo/planes.js --guardar              # cuando un cambio es el que se quería: guardarlo como lo esperado
```

Los comandos de la consola:

```
nueva [día] [hh:mm]          una partida nueva (por omisión, el día 2 a las 14:00)
poner <quien> <lugar>        alguien está en un lugar (así empieza)
vale <a.b.c> <valor>         un valor del estado
ir <lugar> · bajarse         lo que Ana hace por su cuenta
avanzar [30m | 2h | hh:mm]   el reloj (se detiene si le piden algo a Ana)
si · no · elegir <n> · sola  contestar, elegir, o que Ana decida sola
donde · minutos <a> <b>      dónde está cada uno (y quién va de camino); cuánto hay entre dos lugares
espera <a.b.c>[=valor]       en una prueba: que se cumpla (espera mundo.ana.lugar=playa)
espera dicha <escena> · espera hora <= hh:mm
plan <quien> <meta> [args…]  lo que haría el planificador del juego, paso a paso y con hora
metas                        las metas que conoce el planificador
```

Con `plan`, el planificador del juego planifica desde donde está cada uno en el mundo mínimo (sus lugares, como los
llama el planificador: `LG_PLAN`, en `src/js/67-lenguaje.js`). Muestra el plan, pero no lo ejecuta:

```
> nueva 3 10:00
> plan marilla tener marilla azucar 1
  Marilla tiene una taza de azúcar: llega a las 10:46
    10:00  pedirle a Ana que le traiga una taza de azúcar (47 min)
> poner ana aldea
> plan ana estar_en ana escuela
  Ana está en la escuela: llega a las 10:04
    10:00  ir a la escuela (5 min)
```

## Las metas del planificador

`planes.js` corre en unos 3 segundos las metas de prueba que se pueden probar sin el juego: 55 llegan y 2 no llegan a
propósito. Una es la tarta de bayas en invierno, imposible. La otra es Gilbert: va y se disculpa, pero Ana no lo perdona.
Las 14 restantes son solo del juego, porque esperan una escena del guion, un pedido a Ana o varias metas a la vez.

Las pruebas no dicen qué esperan, así que lo que dio cada una queda en `planes.esperado.json`. Si un cambio en el
planificador o en el mapa hace que una meta llegue distinto (otros pasos, otra hora, o que ya no llegue), sale con ✘ y
dice cómo era antes.

Lo que no se prueba aquí: si el plan se puede caminar en el mapa (que nadie se trabe, que la calesa vaya por los
caminos). Eso sigue siendo del juego (`tools/trace_goal.js`).

## Una prueba

```
# a pie por el mapa real: de Tejas Verdes a la escuela
nueva 3 09:00
ir escuela
avanzar 5m
espera mundo.ana.lugar=cocina
avanzar 10m
espera mundo.ana.lugar=escuela
```

## Lo que todavía no hace

- **Ejecutar los planes en el mundo mínimo.** El planificador se consulta (`plan`) y sus metas se prueban (`planes.js`),
  pero los planes todavía no mueven a la gente del mundo mínimo junto con las historias. Las rutinas del día tampoco
  corren aquí.
- **El dibujo:** el juego todavía decide con píxeles. El paso siguiente es que el juego dibuje este estado.

## Lo que ya mostró

Con las distancias reales:

- **La Sra. Pye no llegaba a la playa.** Desde la aldea son más de dos horas a pie. En el juego aparece ahí; ahora el
  mundo mínimo hace lo mismo con la gente del pueblo.
- **La llegada desde Bright River.** La Avenida queda a 99 minutos de la estación, y las charlas de Ana en el lenguaje
  (`ll_pelo`, `ll_angelical`) se acaban en el primer cuarto de hora. Por eso `cb_libro` no corta nada:
  `probar.js --mundo minimo` da 8 de 10, y las dos que fallan son las de la llegada. En el juego no se nota porque esas
  charlas son las del juego, por tramos. Para que el lenguaje lleve el viaje entero, la llegada necesita más charla, o
  una que dure hasta un lugar.
