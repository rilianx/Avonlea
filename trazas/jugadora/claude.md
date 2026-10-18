# Una partida jugada a mano por una IA: la curiosa y bastante obediente

Jugué como lo haría una jugadora, con `tools/mano.js`. Ese control abre el juego en Chromium y me deja ver lo mismo que se ve en pantalla: la hora, el lugar, lo que se dice, la caja con sus botones y una foto. Después decido cada paso: tocar a Ana, a alguien, una puerta o un mueble, o caminar a un lugar.

El estilo fue el de una curiosa bastante obediente: hace lo que le piden (vestirse, lavar los platos, sentarse a la mesa, doblar la ropa), pero a veces elige por ver qué pasa («Cordelia», «Un minutito, Marilla…»), conversa con todos y sale a conocer.

La partida va de la llegada al día 3 a las 20 h. Pasa por la llegada, el primer desayuno, la conversación de rezar, la huerta, La Cuesta del Huerto, el almuerzo, White Sands, la decisión, el Camino Blanco, el lago y la tienda. Quedó guardada en `tools/noche/partidas/claude.json`.

**Lagunas (Z3) al final:** 0. Todavía no hay decisiones con consecuencias pendientes.

## Lo que funciona muy bien

- **El texto de las escenas grandes es fiel y conmueve.** La llegada («¿Me llamaría Cordelia?», «Ana con una sola n»), la primera noche («¿Cómo puede decir que son buenas noches…?»), la confesión de que nunca rezó, el abrazo de la decisión («¿Puedo llamarla tía Marilla?» «No. Marilla, a secas.») y el viaje a White Sands.
- **Los objetos tienen voz.** El ropero («En el orfanato teníamos un clavo cada una»), el vestido («Ni mangas abullonadas ni nada… pero limpio, y mío»), el Camino Blanco («es mejor que la primera vez, porque ahora es mío») y ponerle nombre al lago, con la opción de inventar otro.
- **Se ve precioso.** Los cerezos de Tejas Verdes (foto 006), el Camino Blanco en flor (012), la tienda de Lawson (015) y el mapa (007).
- **Las presentaciones del pueblo tienen gracia.** Minnie May («¡Pero si son viejísimos!») y la Sra. Lynde de pasada («Ya iré a verte con calma, ya»).

## Lo que encontré, ordenado por cuánto le pesa a una jugadora

Cada problema lleva la regla general que lo evitaría, no el parche del caso.

### 1. Conversaciones que dan por hecho lo que no pasó

- Al tocar a Matthew, la mañana del día 2, Ana dice «¡Matthew! Mire estas violetas. Las encontré a la orilla del camino…». Todavía no había salido de la casa.
- «Contarle que Marilla la retó» → «Dice que soy una cabeza de chorlito». Marilla nunca dijo eso.
- Ana se mete en el tema de la Sra. Lynde («¿Y la Sra. Lynde?» «¡A mí también!»): le da miedo antes de conocerla.
- Ana piensa «Al principio me daba miedo; ahora me gusta» en su primera visita a la aldea, que es su tercer día.
- El Sr. Lawson le habla como a una clienta de siempre la primera vez que la ve.

**Regla:** una conversación o un dicho que cuenta algo («encontré violetas», «Marilla me retó», «al principio me daba miedo») pide el hecho que lo hace verdad: `hecho:salio_a_juntar_flores`, `dias_desde:llegada_tv:7`, `conoce:lynde`. Es la misma idea de las reglas `referencia:` de `src/datos/reglas.txt` (una frase que dice esto exige aquello). Bastaría con agregar esas palabras ahí, y el modelo las encontraría todas.

### 2. Repeticiones: la rueda se nota

- El tema de rezar vuelve cinco veces en dos días: la conversación de la mañana, «¿Sabes rezar? Pues vas a aprender» (dos veces) y «¿Dijiste tus oraciones anoche?» (dos veces). Las dos frases suenan como si la conversación nunca hubiera pasado.
- Ana repite «Hoy imaginé que esta mesa era un banquete en un castillo…» dos veces en el mismo almuerzo (12:23 y 12:44).
- Matthew y Marilla repiten sus frases del día anterior casi en el mismo orden («Las vacas andan contentas hoy…», «Marilla es buena… no se le nota al principio»).
- Mary Joe y la Sra. Barry le dicen a Ana exactamente la misma frase, una detrás de otra.
- Marilla dice «Gracias.» tres veces sin que se vea por qué. Parece la respuesta a algo que la jugadora no ve.

**Reglas:**
- Nadie repite una frase el mismo día, Ana tampoco. `aprueba.js` ya lo revisa para los demás; falta Ana.
- Un dicho cuyo tema ya se conversó (`dicha:conv_marilla_oraciones`) no se dice más, o cambia a su versión «de después».
- Una línea que responde a algo («Gracias.») pide que ese algo se vea, o no se dice.

### 3. Cosas que la jugadora no puede encontrar

- **Vestirse:** solo se puede tocando el ropero. Tocar la ropa doblada en la silla solo la sienta, y el menú de Ana no lo ofrece, ni en la cocina en camisón ni en su pieza. Yo lo encontré leyendo el código.
- **Rezar:** Marilla lo pide tres veces, y «Decir sus oraciones» aparece en el menú de la cocina a la mañana. A la noche, en la pieza, ni el menú de Ana ni la cama lo ofrecen.
- **Regar:** Marilla pide «Riega la huerta», pero en la huerta no hay «Regar». Hay que adivinar que la regadera está en la bomba.

**Regla:** lo que alguien le pide a Ana (o lo que una regla de la casa espera) tiene que poder hacerse desde donde se pide, o el pedido dice dónde. El menú de Ana podría ofrecer siempre «Vestirse» (si está en camisón y en casa) y «Rezar» (de noche, en su pieza). Y «Riega la huerta» podría decir «la regadera está junto a la bomba».

### 4. Conversaciones «con lugar» que se quedan colgando

Matthew dice «eso se aprende en la huerta… Vamos.» y se va a trabajar al campo, lejos. Ana se queda en la cocina y no pasa nada en una hora. Cuando llegué a la huerta, Matthew no estaba. Además, Ana dice «¡Vamos a Tejas Verdes!» estando en la cocina de Tejas Verdes.

**Regla:** en una conversación que sigue en otro lugar, quien dice «Vamos» camina hasta ese lugar y espera ahí un rato. Si Ana no llega, la conversación queda pendiente y lo dice («Te esperé en la huerta, Ana»). Y Ana no anuncia «Vamos a X» si ya está en X.

### 5. Escenas que no ven a quien está en la sala

- La Sra. Lynde pasa cuatro horas en la cocina de Tejas Verdes, desde las 14 hasta la noche. Marilla anuncia delante de ella que Ana se queda y nadie reacciona; la vecina que «lo ve todo» solo suelta frases sueltas («Llevo cincuenta y dos cubrecamas…»).
- El texto de la huerta («asoman unos brotes verdes…») sigue arriba cuando Ana ya entró a la cocina (foto 011).

**Regla:** una visita tiene un motivo y un final: viene, conversa con alguien de la casa y se va. Y una escena importante con un testigo le da al testigo al menos una reacción, o el testigo se va antes.

### 6. Lo que la jugadora no decide

- Las conversaciones del menú de Ana se tienen solas mientras pasa el tiempo («una sola n», «lo que imaginé hoy», la lección de pastel), con «Ana sola 🤖» apagada. Y al tocar a alguien arranca sola la primera conversación de la lista. Además, el menú muestra solo algunas de las conversaciones posibles: «por qué le dan miedo las señoras» no aparecía.
- White Sands se cuenta entero en tarjetas. En el momento más tenso, cuando la Sra. Blewett dice «Esta me sirve», no hay ninguna elección.
- Elegí «Un minutito, Marilla…» al almuerzo y no pasó nada: Ana no almuerza, y nadie lo nota ni la reta.

**Regla:** lo que está en el menú de la jugadora lo elige la jugadora. El juego puede hacer charlas por su cuenta, pero no las del menú; y tocar a alguien abre el menú, nunca arranca nada. En los momentos grandes del libro, al menos una opción de cómo reacciona Ana. Y una elección «desobediente» tiene una consecuencia visible: un reto, hambre, la paciencia de Marilla.

### 7. Otros detalles

- **El botón «Siguiente estación (prueba)» está en el mapa de todas las jugadoras** (`src/shell.html`), justo al lado de «Cerrar». Lo apreté sin querer y el juego saltó a verano. Debería verse solo en modo de prueba (`?dev`).
- El cariño de Marilla ya está en 5/5 la mañana del día 3. Empezó en 2 y todavía no había decidido quedársela: sube demasiado rápido.
- Moody Spurgeon dice «pelirroja como una zanahoria» el día 3 y le quita el golpe a Gilbert, que dice «¡Zanahorias!» en el capítulo 15.
- En la pieza se ven dos sombreros de paja, uno en la percha y otro encima del ropero (foto 003).
- En el mapa, las etiquetas «Marilla» y «Matthew» se montan una sobre otra, y «Sr. Harrison» aparece dos veces (foto 007).
- «Ir a la huerta» desde afuera hace entrar a Ana a la cocina. Para el juego, la huerta es «Tejas Verdes».
- Ana baja a desayunar en camisón y nadie dice nada: la regla del camisón empieza después del desayuno. ¿Es a propósito?

## Cómo repetirlo

```
node tools/mano.js &                        # el juego, esperando órdenes en localhost:8765
curl -s localhost:8765/estado               # qué se ve
curl -s "localhost:8765/clic?x=740&y=250"   # tocar la pantalla (coordenadas de /foto, 900×640)
curl -s localhost:8765/ana                  # tocar a Ana: su menú
curl -s "localhost:8765/boton?i=2"          # elegir
curl -s "localhost:8765/pasar?s=300"        # dejar pasar el tiempo (se detiene si algo espera)
curl -s localhost:8765/foto                 # una captura
```

Las fotos citadas están en `trazas/mano/`.
