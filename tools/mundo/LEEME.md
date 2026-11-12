# El mundo

El mundo del juego sin dibujarlo: para probar lo que hacen los personajes (ir, leer, coser, correr, seguir a alguien),
con o sin historias, en milisegundos y sin abrir el navegador. Es un teatro de marionetas: se toma a un personaje, se
ve todo lo que puede hacer ahí, lo hace, y se ve qué cambió.

El juego hace dos cosas: decide qué pasa y lo dibuja. El mundo hace solo lo primero.

## Tejas Verdes, todos los días

El primer juego chico hecho entero con el motor único: Ana, Marilla, Matthew y Diana viven su día
(`docs/lenguaje/vidas/tejas_verdes.ts`, con `elegir`, `repetir` y `quedarse`: docs/LENGUAJE.md §6.1). Cada uno elige lo
que corresponde a esa hora y deja lo que hace si aparece algo más importante. Nadie los mueve, y ningún día es igual a
otro.

- **El tablero** (`trazas/tablero.html`, lo arma `node tools/mundo/tablero.js`): las casillas son los lugares (la casa, el
  patio, y afuera el campo, la escuela, la iglesia y la casa de Diana); las fichas son las personas, con un ícono de lo
  que hacen, y se deslizan de casilla en casilla cuando van de un lugar a otro.
  - **La lupa**: tocando una casilla o una ficha se ve quién está, qué hace, junto a qué, en qué postura, con qué, y
    hasta qué hora, y lo que lleva. En una casilla, también cuánto hay de cada cosa ahí (los leños del granero).
  - **El diario de cada uno**: se elige a la persona (o se toca su ficha) y se ve su día hasta ahora, cada cosa con su
    hora, dónde y cuánto duró.
  - **Manejar a Ana**: su día se suspende; tocando una casilla, va; y se le puede hacer hacer lo de su día ahí. Al
    soltarla, vuelve a lo suyo. Si le pidieron algo (✉ Marilla te pidió: recoger huevos, hasta las 19:30), lo hace si
    quiere; si no, vence y no pasa nada. Si ve a alguien, «👣 ir con…»: lo acompaña mientras siga en lo suyo (o hasta
    que la sueltes, tocando una casilla). En la lupa, los recados de cada uno.
- **Un día en un minuto** (`node tools/mundo/dia.js`): vive unos días seguidos —una semana, en menos de un segundo—, saca
  el diario de cada uno, y revisa las reglas de lo natural: de noche duermen; desayunan y cenan; los días de clases
  están en la escuela a mediodía; nadie pasa más de una hora sin nada que hacer; dos días seguidos de Ana no son
  iguales; la casa no se descuida (nunca más de 6 platos sucios, y nunca falta leña para cocinar); nadie se queda
  trabado. También dice cuántas veces alguien retomó algo, y cuánto hubo de cada cosa en la casa. Si una no se cumple, falla.
  Cuenta las mañanas en que Ana y Diana se encontraron en el sendero, y los recados (cuántos se pidieron, se hicieron, vencieron, o ya no hacían falta; `--recados`, cada uno).
  Antes de vivirlos, revisa las cosas y los muebles (`node tools/mundo/verificar_vidas.js`, docs/LENGUAJE.md §6.1).
  ```
  node tools/mundo/dia.js                          # tres días, desde el viernes
  node tools/mundo/dia.js --dias 7 --desde 1 --semilla 3 --ver ana   # una semana, con otra semilla, y el diario de Ana
  node tools/mundo/dia.js --dias 1 --desde 2 --diarios diarios/        # un día, y el diario de cada uno en su archivo
  ```

## Cómo está hecho

```
  QUIÉN DECIDE   las historias (motor del lenguaje) · el planificador del juego · tú (consola, página)
                       │                              │
                 mundo_minimo.js               reglas_juego.js          ← cada uno, por su puerta
                       └───────────────┬──────────────┘
  EL MUNDO                         mundo.js                             ← un solo estado
                                       │
  GEOGRAFÍA                     geografia.json                          ← medida sobre el mapa real
```

**La geografía** (`geografia.json`, la escribe `exportar.js` abriendo el juego una vez) tiene:

- **Una sola lista de lugares** (37). Junta los del planificador del juego (el granero, la tienda, el gallinero, «h:rl»,
  que es la casa de la Sra. Lynde por dentro…) con los que solo tienen las historias (Tejas Verdes —el patio—, la
  Avenida, la orilla, el camino de la costa…).
- Para cada lugar: su nombre, cómo lo llaman las historias (`vista`: el granero queda en «Tejas Verdes» o en
  «Avonlea», según el juego) y cómo lo llama el planificador (`plan`).
- Los **minutos entre cada par de lugares**, a pie, Ana (que va más rápido) y en calesa, medidos sobre la red de caminos
  de Avonlea y las millas de los caminos largos.
- Los caminos largos con sus tramos, quiénes son gente del pueblo, y lo necesario para dibujarlo.

**El mundo** (`mundo.js`) es un solo estado, que se guarda y se carga entero:

| | |
|---|---|
| personas | dónde está cada una (un lugar de la lista), en qué va, a quién sigue, qué sabe; si va de camino (de dónde, adónde, a qué hora llega); si está ocupada en algo (qué, hasta qué hora) |
| medios | la calesa: dónde está y si está enganchada |
| cosas | cuántas hay de cada cosa en cada lugar o con cada persona (`granero: { lena: 10 }`, `ana: { libro: 1 }`): un solo inventario, el de las vidas, la consola y el planificador del juego |
| cariño | cuánto quiere cada uno a cada otro (`ana>marilla`, de −2 a 5, como en el juego) |
| hechos, ofensas | lo que pasó |
| vacas, existencias, enfermos | dónde está cada vaca, lo que hay para recoger, quién está en cama |
| estados, cualidades | lo de las historias: `ana_en_tv`, la paciencia de Marilla |
| reloj | minutos desde el comienzo del día 1; salta de evento en evento (alguien llega, alguien termina lo que hacía) |

Con sus operaciones: ir (un viaje: llega cuando le toca, con los que van en su calesa o lo siguen), subir, bajar,
seguir, ocuparse en algo, avanzar el reloj.

**Quienes lo usan**, cada uno por su puerta, leen y cambian el mismo estado:

- **Las reglas del juego** (`reglas_juego.js`): qué puede hacer cada uno y qué cambia. Son las acciones del
  planificador del juego (leer, estudiar, coser, partir leña, cocinar, regalar, ordeñar…: cada una dice dónde y con qué
  se puede hacer, cuánto dura y qué cambia), con el juego cargado sin navegador (`sin_navegador.js`). El mundo le
  muestra al planificador su estado como el planificador lo llama (sus claves de lugar; las cosas, los saberes y el
  cariño son los mismos), y lo que cambia vuelve al mundo. Quien va a otro lugar, viaja en el mundo, con sus minutos.
  Lo que el juego sabe y el mundo todavía no (quién más hay en Avonlea a esa hora, qué tiene cada uno, cuánto se
  quieren), el mundo lo toma del juego la primera vez.
- **Las historias** (`mundo_minimo.js`): el motor del lenguaje juega sobre el mundo como en el juego juega sobre el
  juego. Lo que el motor hace (ir, subir, seguir, un hecho, la paciencia) lo hace el mundo; el motor lleva una copia de
  lo que lee (dónde está cada uno, en qué va), y el mundo se la cuenta cuando cambia. Los lugares de las historias son
  lugares del mundo (el lago es el «estanque de los Barry»). La gente del pueblo aparece donde la pone una historia.
- **Tú**: la consola, o la página.

## Uso

```
node tools/mundo/consola.js                       # a mano («ayuda» dice los comandos)
node tools/mundo/consola.js tools/mundo/pruebas/*.txt          # las pruebas
node tools/mundo/consola.js --ver tools/mundo/pruebas/acciones.txt   # una prueba, viendo lo que pasa
node tools/mundo/consola.js -e "marionetas; hacer matthew ir granero; avanzar; donde"
node tools/mundo/exportar.js                      # medir el mapa (cuando cambia: el mundo avisa)
node tools/lenguaje/probar.js --mundo minimo      # los escenarios de las historias, en el mundo
node tools/mundo/planes.js                        # las metas del planificador, sin navegador (unos 3 s)
node tools/mundo/planes.js --guardar              # cuando un cambio es el que se quería: guardarlo como lo esperado
```

### Marionetas (sin historias)

```
> marionetas 4 09:00
> tiene ana libro 1
> acciones ana
  Ana puede, ahora, en la cocina de Tejas Verdes:
     5. estudiar la lección (20 min)
     8. leer un libro (20 min)
     …
        e ir a: granero, corral, huerta, escuela, aldea, lago, h:os, …
> hacer ana leer
  Ana: leer un libro (20 min)
    · pasó: leido:ana
> hacer matthew ir granero
    · Matthew va al granero, llega a las 09:04
> avanzar 20m
  09:04  · Matthew llega al granero
  09:20  · Ana termina: leer un libro
> hacer matthew partir_lena
    · Matthew tiene lena: 0 → 3
> donde
```

Cada uno hace lo suyo a la vez: mientras Ana lee (ocupada 20 minutos), Matthew va al granero. `avanzar` mueve el reloj y
cuenta quién llega y quién termina.

### Los comandos

```
nueva [día] [hh:mm]          una partida con las historias (por omisión, el día 2 a las 14:00)
marionetas [día] [hh:mm]     sin historias (por omisión, el día 3 a las 10:00)
donde                        dónde está cada uno, quién va de camino, quién está ocupado
poner <quien> <lugar>        alguien está en un lugar (así empieza)
avanzar [30m | 2h | hh:mm]   el reloj: hasta que pase algo, o ese rato, o esa hora
acciones [quien]             lo que puede hacer ahora, numerado, con lo que dura
hacer [quien] <n | verbo> …  hacer una: «hacer ana leer», «hacer matthew 3», «hacer ana ir escuela»
tiene <quien> <cosa> <n>     ponerle algo en las manos (o en un lugar: tiene cocina pan 0)
cosas [quien | lugar]        lo que tiene y lo que sabe (o lo que hay en un lugar: cosas granero)
cariño <a> <b> [n]           cuánto quiere a a b (y cambiarlo)
plan <quien> <meta> [args…]  lo que haría el planificador para una meta, paso a paso
metas                        las metas del planificador
verbo <verbo> <args…>        un verbo del lenguaje, de cualquiera (con historias): verbo correr_a ana orilla
verbos                       los verbos del lenguaje
si · no · elegir <n> · sola  contestar lo que le piden a Ana, elegir en una escena, o que decida sola (con historias)
vale <a.b.c> <valor>         un valor del estado de las historias
minutos <a> <b>              cuánto hay entre dos lugares
lugares · quienes            los lugares del mundo, y quiénes hay
registro [n]                 lo último que pasó en el mundo
espera <a.b.c>[=valor]       en una prueba: que se cumpla (espera mundo.ana.lugar=escuela · espera matthew.cosas.lena=3 ·
                             espera hechos.leido:ana · espera ana.ocupado.que=leer un libro)
espera dicha <escena>        que una escena se haya dicho
```

## La página

`trazas/lenguaje.html` (`node tools/lenguaje/pagina.js`) juega las historias en el mundo, con «el mapa real»: Avonlea
desde arriba, los caminos largos saliendo de sus letreros, los lugares (los de las historias con su nombre, los demás
como puntos) y cada uno donde está; quien va de camino avanza por el camino. ▶ Reproducir avanza el reloj y se para
cuando le piden algo a Ana. Abajo se puede pedir cualquier verbo del lenguaje a cualquiera. Las acciones del juego
todavía no están en la página: necesitan el código del juego.

## Las metas del planificador

`planes.js` corre en unos 3 segundos las metas de prueba del planificador (`src/js/64-metas-de-prueba.js`) que se pueden
probar sin el juego: prepara cada una como siempre, planifica, ejecuta el plan y mira si llega y a qué hora. 55 llegan
y 2 no llegan a propósito (la tarta de bayas en invierno, imposible; Gilbert, a quien Ana no perdona). Las 14 restantes
esperan una escena del guion, un pedido a Ana o varias metas a la vez. Lo que dio cada una queda en
`planes.esperado.json`, y cada corrida avisa lo que cambió.

## Archivos

| Archivo | Qué hace |
|---|---|
| `mundo.js` | El mundo: el estado y sus operaciones. No depende del juego ni del motor; corre en node y en una página. |
| `reglas_juego.js` | Las reglas del juego para el mundo: las acciones del planificador, sobre el estado del mundo. |
| `mundo_minimo.js` | Las historias en el mundo: la interfaz del motor del lenguaje, hecha con el mundo. |
| `sin_navegador.js` | Carga el código del juego en node, con una pantalla de mentira, en unos 400 ms. |
| `exportar.js` · `geografia.json` · `huella.js` | Medir el mapa real; lo medido; avisar si el mapa cambió. |
| `consola.js` · `pruebas/*.txt` | La consola, y las pruebas escritas con sus comandos. |
| `planes.js` · `planes.esperado.json` | Las metas del planificador, sin navegador; lo esperado. |

## Lo que todavía no hace

- **La página de marionetas.** Las acciones del juego (leer, partir leña…) están en la consola; la página tiene las
  historias y los verbos del lenguaje.
- **Correr** tarda lo mismo que caminar.
- **Las rutinas del día** (Matthew al campo, Marilla a la cocina) no corren solas: en el mundo cada uno hace lo que se le
  pide.
- **El juego** todavía decide con píxeles; el paso siguiente es que dibuje el estado del mundo.

## Lo que ya mostró

- **La Sra. Pye no llegaba a la playa** (desde la aldea son más de dos horas a pie). En el juego aparece ahí; el mundo
  hace lo mismo con la gente del pueblo.
- **La llegada desde Bright River.** La Avenida queda a 99 minutos de la estación, y las charlas de Ana en el lenguaje
  (`ll_pelo`, `ll_angelical`) se acaban en el primer cuarto de hora: `cb_libro` no corta nada, y
  `probar.js --mundo minimo` da 8 de 10. En el juego no se nota porque esas charlas son las del juego, por tramos. Para
  que el lenguaje lleve el viaje entero, la llegada necesita más charla, o una que dure hasta un lugar.
