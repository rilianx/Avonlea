# Una partida jugada a mano por una IA: la curiosa y bastante obediente

Jugué como lo haría una jugadora, con `tools/mano.js`. Ese control abre el juego en Chromium y me deja ver lo mismo que se ve en pantalla: la hora, el lugar, lo que se dice, la caja con sus botones y una foto. Después decido cada paso: tocar a Ana, a alguien, una puerta o un mueble, o caminar a un lugar.

El estilo fue el de una curiosa bastante obediente: hace lo que le piden (vestirse, lavar los platos, sentarse a la mesa, doblar la ropa), pero a veces elige por ver qué pasa («Cordelia», «Un minutito, Marilla…»), conversa con todos y sale a conocer.

La partida tiene dos tramos:
- **Días 1 a 3:** la llegada, el primer desayuno, rezar, la huerta, La Cuesta del Huerto, White Sands, la decisión, el Camino Blanco, el lago y la tienda.
- **Días 3 a 19 (segunda tanda):**
  - escribí cartas a la Sra. Spencer y recibí su respuesta;
  - hice la lección de sembrar con Matthew y mi huertito;
  - viví la visita de la Sra. Lynde (huí llorando) y el «¡Zanahorias!» de Gilbert (le contesté delante de todos);
  - conocí a Diana y conversé con ella de todo.

Para los días de rutina usé un ayudante que responde lo rutinario (acostarse, la mesa, doblar la ropa) y se detiene en cada decisión nueva, que elegí yo. La partida quedó guardada en `tools/noche/partidas/claude.json`.

**Lagunas (Z3) al día 19:** 3. Nada de lo que todavía puede pasar toma en cuenta que Ana:
- huyó llorando de la Sra. Lynde (`lynde_llanto`);
- le contestó a Gilbert delante de todos (`zanahorias_contesta`);
- le admitió a Diana que Gilbert tiene lindos ojos (`ana_admite_gilbert`).

Hasta el día 4 hubo 0; la primera apareció el día 5.

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

## Segunda tanda: días 3 a 19

### Errores (rompen lo que la jugadora hizo o ve)

- **Se pierde una carta.** Escribí la carta a la Sra. Spencer a las 20:52 del día 3. Ana leyó todas sus líneas, pero llegó la tarjeta «Ana, a la cama» y la acción se cortó antes de guardarse. Al día siguiente no había carta ni en sus manos ni en el correo. Regla: una acción que una escena interrumpe sigue después, o se da por hecha si su trabajo ya está hecho (la carta se guarda en `63-jugar.js` al terminar la acción).
- **El cuerpo no hace lo que dice el texto.** En la visita de la Sra. Lynde elegí «Salir corriendo a llorar a su pieza». El texto dice «Ana sale corriendo escaleras arriba y se tira en la cama a llorar», pero Ana siguió sentada a la mesa de la cocina, sonriendo, dos horas después (foto `trazas/mano/003.jpg`). Regla: lo que una línea dice que alguien hace con el cuerpo (sale, sube, se sienta) va con su efecto.
- **Un encargo en bucle.** Marilla: «¿Me traerías un pan de mantequilla?» → Matthew: «Sí, cómo no» → Marilla: «¡Qué lindo detalle!», cinco veces en nueve minutos. Regla: un encargo cumplido no se pide de nuevo el mismo día.
- **Conocer a Diana depende de estar en casa a la hora justa.** Marilla lleva a Ana a La Cuesta del Huerto entre las 14 y las 17:30, solo si Ana está en casa. La jugadora automática andaba afuera a esa hora y no conoció a Diana en 12 días. Y si Ana ya le pidió una amiga del alma, el encuentro por casualidad queda cerrado. Regla: lo que lleva a un hito avisa antes («Esta tarde vamos donde los Barry, no te vayas lejos») o espera a la jugadora.

### Lo que no sabe lo que pasó (la causa de las lagunas, vista desde adentro)

- **Gilbert.** Con Diana, Ana dice «Gilbert Blythe es la persona más odiosa de toda la isla. Nunca, nunca le voy a hablar… una broma imperdonable». Es el texto del libro, el de la pizarra. En esta partida Ana le contestó delante de todos, la clase se rió de él y Gilbert dijo «me lo merezco». Ese mismo día, en el almuerzo, nadie mencionó nada. Es la laguna `zanahorias_contesta` que marca Z3.
- **El juramento.** Diana: «¿Te acuerdas de nuestro juramento de amistad? ¡Para siempre!», y todavía no se habían jurado nada.
- **Recuerdos inventados.** Minnie May: «¿Me cuentas el cuento del hada otra vez?», y Ana nunca le contó ninguno. Ana, frente al huertito: «Cuando regué estas flores…», y nunca las regó, porque no hay cómo. Marilla: «Rachel Lynde dice que todavía no la has ido a ver», y Ana fue el día 4. Marilla: «Cuidado con no quemar nada esta vez», y Ana nunca quemó nada.
- **Las cartas.** La primera cuenta «Hoy bauticé la laguna», muy bien, pero la reescrita al día siguiente sigue diciendo «hoy». La del día 10 cuenta el almuerzo («guiso de cordero») y no lo grande del día, que fue contestarle a Gilbert. Regla: la carta elige lo más importante que le pasó a Ana (una decisión, un hito) antes que la rutina.
- **La respuesta de la Sra. Spencer es genérica.** «Las cosas se arreglan solas, cuando una se porta bien… Y no hables tanto, niña.» No menciona nada de lo que Ana le contó. Las respuestas de la IA de la noche sí lo hacían.
- **Marilla chismea sobre sí misma.** Le dice a Minnie May: «¿Supo lo de los Cuthbert? ¡Pidieron un niño al orfanato y les llegó una niña!». Es un dicho de vecina que le tocó a ella. Después: «Bueno, me voy, que tengo que ir a donde está Ana».

### La rueda de cada día

- **Marilla** repite cada día las mismas frases: «¿Dijiste tus oraciones anoche?», «El domingo vamos a la iglesia» (en 19 días no llegó ningún domingo), «Riega la huerta antes de que caiga el sol» (a las 6:30 de la mañana).
- **Matthew:** «Las vacas andan contentas hoy». Y el «Gracias.» de Marilla de cada mañana es por la leche que le da Matthew, pero la entrega no se ve.
- **La Sra. Lynde** pasa cada tarde por Tejas Verdes diciendo sus cinco frases seguidas, cada 20 minutos.
- **Ana**, frente al huertito, dice todos los días a las 14:47 «¡Salieron!…». En el almuerzo repite dos veces sus dos frases («¡Qué rico huele todo!», el banquete en el castillo).
- **«¡En Tejas Verdes hay una niña nueva!… pelirroja como una zanahoria»** lo dicen cuatro niños distintos entre los días 3 y 19, a veces delante de Ana.
- **Los días de escuela están vacíos.** Ana llega a las 7:40 y hasta las 14 no pasa nada. El día 6 la escuela estaba vacía a mediodía; el Sr. Phillips solo dijo «Mañana hay examen de geometría».

### Lo que la jugadora no puede hacer

- Marilla dice «Si me lo pidieras, quizás un día te llevaría a conocer [a Diana]», pero sus favores son huevos, azúcar o té: no hay cómo pedírselo.
- Los menús muestran pocas conversaciones de las que hay. Diana tenía seis; su menú mostraba dos, y las otras (como Gilbert) solo aparecían a medida que se gastaban las primeras.
- El ayudante dejó a Ana en la escuela hasta la noche. Marilla salió a buscarla con el farol (una escena muy buena), pero la disculpa decía «se me pasó la hora mirando las estrellas», cuando estaba en la escuela.

### Lo que encanta

- Marilla al acostarla: «Nada. Que me alegro de que te hayas quedado. Eso es todo. A la cama.»
- La lección de sembrar con Matthew y las capuchinas («el regalo más lleno de futuro»), y el huertito «para contarles cuentos, para que se animen a salir».
- El camino a la escuela («Una llega con el alma ya instruida, aunque la gramática no»).
- Conocer a Diana («¿crees que podrías quererme un poquito…?»); ponerle nombre al Paseo de los Enamorados y a la Burbuja de la Dríade; los fantasmas del Bosque Encantado; el club de cuentos («Solo tienes que matar a alguien al final»).
- Pedirle a Marilla que lleve la carta («Ojalá no hayas escrito ninguna tontería») y leer la respuesta en la tienda, línea por línea.

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

Las fotos citadas están en `trazas/mano/dias1-3/`.

## Lo que se arregló después de este informe

- Frases que suponían lo que no pasó: ahora piden su premisa (juramento, huerta regada, días de amistad, «otra vez», «esta vez», la Sra. Lynde, Lawson, la aldea, violetas, «cabeza de chorlito», Gilbert según lo que Ana hizo). Reglas `referencia:` nuevas en `src/datos/reglas.txt` para que Z3 las vigile (0 incoherencias).
- Visitar a alguien cuenta aunque Ana vaya por su cuenta.
- Domingos: condición `domingo`, el reloj muestra el día de la semana, y Marilla avisa de la iglesia ese mismo domingo.
- Chismes: nadie cuenta lo de su casa con su propio nombre; lo que se dice de Ana no se dice delante de ella; «la niña nueva» solo los primeros días.
- «Sí, señora» a las mujeres.
- Marilla: «Pedirle que te lleve a conocer a alguna niña de tu edad».
- Nadie repite un dicho el mismo día (Ana tampoco); las frases sueltas se espacian.
- La Sra. Lynde visita de 14:30 a 16:30 y se va; no va a Tejas Verdes antes de su visita del cap. 9.
- Cartas: cuentan primero el hito del día, en palabras de Ana, y dicen «ayer» cuando fue ayer; la Sra. Spencer contesta a lo que pasó.
- Clases: seis escenas de clase (Sr. Phillips, Srta. Stacy), una al día, con decisiones.
