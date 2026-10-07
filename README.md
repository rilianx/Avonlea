# Un día en Avonlea

Un juego tranquilo de mundo abierto, sin misiones, inspirado en *Ana de las Tejas Verdes* (L. M. Montgomery, 1908, de dominio público). Ana vive en **Tejas Verdes** con **Matthew** y **Marilla**, visita a su amiga del alma **Diana** en **La Cuesta del Huerto**, riega la huerta, cocina, acaricia a **Toby** y pasa los días como quiere, a lo largo de las cuatro estaciones.

Todo el juego es un solo archivo, [`index.html`](index.html): se abre en el navegador, en el computador o en el celular, sin instalar nada.

![Un día en Avonlea](docs/avonlea.png)

## Cómo jugar

- **Abrir:** descarga `index.html` y ábrelo en el navegador.
- **Moverse:** flechas o WASD. En el celular, arrastra el dedo.
- **Hacer cosas:** Espacio (o E, o Enter). En el celular, el botón ✋. Cuando hay algo que hacer cerca, abajo aparece qué es.
- **Charlas:** los personajes conversan solos en globitos cuando Ana pasa cerca (y Ana también habla: no hay que elegir qué dice). Con Espacio sobre alguien, la charla es con ella; al final solo se decide lo importante (aceptar un encargo, regalar, pasear). Espacio o un toque saltan una frase; Esc sale.
- **Mapa:** M o el botón 🗺.
- **Diálogos con IA:** el botón ✒ (ver más abajo). Las charlas están pensadas para la IA; sin clave solo dicen unas frases escritas.

La partida se guarda sola en el navegador: lo que lleva Ana, lo que creció en la huerta, el cariño de cada uno (♥), el día y la estación.

## Qué se puede hacer

- **Acariciar a Toby**, el perro, que la sigue a todas partes.
- **Regar la huerta:** toma la regadera en la bomba y riega los seis canteros. Cada uno crece hasta florecer (rosas, girasoles, lilas), y las flores se cortan para hacer ramos.
- **Recoger** bayas de los arbustos y manzanas del huerto de los Barry, en verano y otoño.
- **Cocinar** en la cocina de Tejas Verdes: tarta de bayas, compota de manzana o té.
- **Conversar y regalar** a Matthew, Marilla, Diana, la Sra. Barry y la Sra. Lynde, que le van tomando cariño.
- **Visitar a Diana** en La Cuesta del Huerto, **tomar el té** con ella en el sofá de la salita (con cordial de frambuesa, esta vez bien etiquetado), **calentarse junto al fuego** o **salir a pasear juntas**.
- **Sentarse** en la banca del **Lago de las Aguas Brillantes**.
- Visitar a la **Sra. Rachel Lynde** en su casa de la Hondonada, junto al arroyo: teje junto a la ventana desde donde ve pasar a todo el mundo.
- Pasear por el **Camino Blanco de las Delicias** y el **Bosque Encantado**.

## Rutinas

Los personajes se mueven con horarios: **Matthew** entra a la cocina de Tejas Verdes a comer (hacia las 7, las 12 y las 18) y está con Marilla; la **Sra. Lynde** teje en su casa por la mañana y por la tarde visita a Marilla (un día) o a la Sra. Barry (al otro), caminando por los caminos. Cuando coinciden, conversan entre ellos y Ana puede quedarse escuchando.

## Las estaciones

Un día dura 8 minutos: la mañana, una tarde dorada y una noche con ventanas encendidas y luciérnagas. Cada estación dura dos días.

- **Primavera:** manzanos y cerezos en flor, y pétalos en el aire.
- **Verano:** bayas, manzanas y luciérnagas.
- **Otoño:** árboles rojos y dorados, hojas cayendo y más humo en las chimeneas.
- **Invierno:** nieva, el lago y el arroyo se congelan, la huerta duerme bajo la nieve y todos andan con bufanda.

El mapa tiene un botón «Siguiente estación (prueba)» para verlas sin esperar.

![Las estaciones y la casa de Diana](docs/avonlea-estaciones.png)

| El mapa | En el celular |
|---|---|
| ![Mapa](docs/mapa.png) | ![Celular en invierno](docs/celular-invierno.png) |

## Diálogos con IA (opcional)

Con el botón **✒** se activan:

1. Elige el modelo. Por defecto es **GPT-5.4 mini** de OpenAI; también están Claude Opus 5.5, Sonnet 5.5 y Haiku 4.5 de Anthropic.
2. Pega **tu propia clave** de la API. Si falta, el juego la pide al conversar.

La clave se guarda solo en tu navegador y se envía directamente a `api.openai.com` o `api.anthropic.com`. No está en el archivo, así que el juego se puede compartir sin peligro. Eso sí, no compartas tu navegador con la clave puesta. Sin IA, o si falla, los personajes usan sus frases escritas.

Con la IA activada:

- **Conversaciones:** cada personaje habla con su voz: Matthew tímido, con su «Bueno, pues…»; Marilla seca pero cariñosa; Diana dulce y un poco miedosa; la Sra. Barry correcta y estirada. Cada respuesta ofrece dos o tres cosas que Ana puede decir.
- **Memoria propia:** cada personaje sabe solo lo que vio (estaba cerca o en la misma casa), lo que le hicieron a él, lo que le contaron en su casa y lo que conversó con Ana. Matthew y Marilla, y Diana y su madre, se cuentan las novedades cada mañana.
- **Encargos:** los personajes pueden pedirle cosas a Ana:
  - llevarle bayas o manzanas a alguien;
  - regar canteros;
  - cocinar algo;
  - llevarle un recado a otro personaje;
  - ir a un lugar.

  Ana los acepta o no. El juego comprueba solo cuándo están hechos, y quien lo pidió se lo agradece. Los pendientes se ven en la nota 📜.
- **Lo que hace cada uno:** Matthew va a lugares, busca a Ana, riega y le regala manzanas o bayas. Marilla cocina (y deja la tarta en la mesa) y riega. Diana va a lugares, busca a Ana, la acompaña y le regala cosas. La Sra. Barry regala manzanas o compota. Un **!** sobre alguien indica que tiene algo para Ana.
- **Planes:** cada mañana, y cuando pasa algo, la IA hace el plan del día de cada personaje con lo que puede hacer, y el juego lo cumple a su hora. Pasa algo cuando llega una estación, Ana le hace un regalo, cumple un encargo o le trae un recado.
- **Ver recuerdos** (en el panel ✒) muestra el plan de hoy, lo que sabe y lo que recuerda cada uno, los encargos y el diario de Ana.

La IA solo puede hacer lo que el juego permite. Cada encargo, regalo y paso del plan se revisa contra las reglas (quién puede hacer qué, la estación, qué se puede conseguir), y lo que no corresponde se descarta. Por eso lo que escribe la IA nunca rompe la partida.

| Ajustes de la IA | Matthew busca a Ana según su plan |
|---|---|
| ![Ajustes](docs/ia-ajustes.png) | ![Plan de Matthew](docs/plan-matthew.png) |

## Cómo está hecho

- **Un solo archivo** HTML con JavaScript, sin bibliotecas ni herramientas de compilación, dibujado en un `<canvas>`.
- **Falso 3D:** vista desde arriba y de frente. Todo se dibuja en el orden de sus pies, así que se pasa por detrás de los árboles y las casas.
- **Dibujo a mano:**
  - líneas de lápiz que tiemblan un poco y "hierven" (se redibujan unas veces por segundo, como en la animación dibujada);
  - colores de acuarela que no calzan del todo con la línea;
  - sombreado con rayitas;
  - textura de papel encima.
- **Interiores:** la cocina de Tejas Verdes y la salita de La Cuesta del Huerto.
- **IA:**
  - el juego le arma a la IA el estado de cada personaje como texto;
  - pide respuestas en un formato JSON fijo (conversación, encargo, acción o plan);
  - valida cada cosa antes de aplicarla.

  Las instrucciones fijas (el mundo y los personajes) van primero para que el proveedor las guarde en caché y cada conversación salga más barata.

## Ideas para seguir

- Que la IA resuma los recuerdos viejos de cada personaje en vez de borrarlos.
- Eventos especiales: un picnic en el lago, la visita de la Sra. Rachel Lynde, la escuela.
- Más lugares y personajes: Gilbert Blythe, la señorita Stacy, la iglesia.
- Un servidor intermediario para jugar con IA sin que cada uno ponga su clave.

## Créditos

Inspirado en *Ana de las Tejas Verdes* de L. M. Montgomery (1908), de dominio público. Los dibujos y el código son propios del juego.

Empezó como un prototipo dentro de [boulder-duo](https://github.com/rilianx/boulder-duo).

## Para quien quiera agregar personajes o casas

Todo lo que define a un personaje está en una sola ficha de `CHARACTERS` (nombre, aspecto, voz para la IA, frases, habilidades, dónde vive y, si visita a otros, su rutina); las casas están en `HOUSES` (exterior, camino y su interior). De esas fichas se derivan los nombres, el prompt de la IA, el mapa, las rutinas y el «Hablar con…». Al cargar la página, la consola avisa si a una ficha le falta algo. Diana, la compañera de Ana, es la única con movimientos escritos aparte (en `update()`).
