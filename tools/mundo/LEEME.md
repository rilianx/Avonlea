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

## Qué hay

| Archivo | Qué hace |
|---|---|
| `exportar.js` | Abre el juego (`index.html`) y escribe `geografia.json`. Se corre de nuevo si cambia el mapa o un camino. |
| `geografia.json` | Los lugares, los minutos entre ellos, los caminos largos con sus tramos, y la gente del pueblo. |
| `huella.js` | La huella de las fuentes de la geografía. Si el mapa cambió y no se exportó, el mundo mínimo avisa. |
| `mundo_minimo.js` | El mundo, para el motor del lenguaje. |
| `consola.js` | Jugar a mano, o correr pruebas escritas con los mismos comandos. |
| `pruebas/*.txt` | Las pruebas. |

## Uso

```
node tools/mundo/exportar.js                      # medir el mapa (cuando cambia)
node tools/mundo/consola.js                       # jugar a mano («ayuda» dice los comandos)
node tools/mundo/consola.js tools/mundo/pruebas/*.txt          # las pruebas
node tools/mundo/consola.js --ver tools/mundo/pruebas/white_sands_corre.txt   # una prueba, viendo lo que pasa
node tools/mundo/consola.js -e "nueva 3 09:00; ir escuela; avanzar 30m; donde"
node tools/lenguaje/probar.js --mundo minimo      # los escenarios de probar.js, con las distancias reales
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
```

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

- **El planificador y las rutinas de la gente** siguen en el juego. Aquí solo se mueve quien una historia mueve, o la
  consola.
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
