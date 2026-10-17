# El modelo de las interacciones

Para encontrar, con lógica y no a ojo, lo que falta y lo que no cuadra en lo que la gente de Avonlea le dice a Ana: que la Sra. Lynde no tenga nada que decirle en alguna situación, que alguien vea a Ana en camisón y no diga nada, que una frase nombre a la Srta. Stacy antes de que llegue, o invite a pasar fuera de su casa.

`python3 tools/modelo.py` (después de `node tools/planilla.js`) deja `trazas/modelo.md` (para leer) y `trazas/modelo.json`, y la planilla lo muestra en la hoja «Modelo».

## Las piezas

1. **Lo que hay** (sale de los datos, no se escribe): cada cosa que alguien le puede decir a Ana, con sus condiciones.
   - sus frases (`src/datos/frases.txt`), las de cada estación incluidas;
   - las escenas en que habla con ella, las conversaciones, los encuentros (`guion.txt`, `conversaciones.txt`, los diálogos de pares);
   - la presentación de la primera vez (todos, salvo los que ya conoce y los vecinos sin nombre).
   - Una frase con el nombre de Ana solo la dice quien la conoce (así lo hace el juego).
2. **Las situaciones posibles** (salen de los datos): el día y la hora; dónde está Ana y dónde cada uno; cómo anda Ana (en camisón, sin sombrero…); quién está en Avonlea (`llegadas.txt`); qué pasó y cuándo; a quién conoce; qué noticias sabe cada uno; las metas cumplidas; las cualidades (el afecto, el estudio…). Con lo que los datos dicen de ellas:
   - un hecho supone lo que pide la escena que lo deja (y que quienes hablan en ella estaban en Avonlea);
   - llegar e irse son hechos con su día (`llegadas.txt`);
   - quien conoce a Ana sabe que hay una niña en Tejas Verdes;
   - en la casa de un vecino, Ana solo está si alguien de esa casa está ahí;
   - dónde puede estar cada uno: la pieza de Ana, solo los Cuthbert y Diana; una casa, quienes viven ahí y los grandes que visitan; la escuela, los niños y el maestro; los vecinos sin nombre, afuera y en los lugares públicos.
3. **Las reglas** (lo único que se escribe a mano: `src/datos/reglas.txt`):
   - **espera**: dónde debería haber algo («todos tienen algo que decirle cuando la ven», «un grande que la ve en camisón fuera de Tejas Verdes reacciona»);
   - **nunca**: una situación imposible que los datos no dicen («la escuela de noche»);
   - **referencia**: lo que una frase supone por lo que dice («Pasa» → en su casa; «Stacy» → ya llegó; «nieve» → invierno).

## La pregunta

Para cada regla y cada persona, al solucionador lógico (Z3) se le pregunta: **¿existe una situación posible en que la regla no se cumple?**

- Para una **espera**: ¿hay una situación posible (con la condición de la regla) en que no vale ninguna de sus frases o escenas? Si la hay, la devuelve, con lo que piden las que tiene (por qué ninguna vale: «`dias_desde:escuela:3` (2)» = dos de sus frases esperan que Ana lleve tres días en la escuela).
- Para una **referencia**: ¿hay una situación posible en que esa frase se dice y no se cumple lo que supone?
- Y, para todo: ¿hay frases o escenas que nunca pueden darse (sus condiciones se contradicen con el mundo)?

El solucionador revisa todas las combinaciones a la vez, sin enumerarlas (son millones), y cuando contesta «no hay», es una garantía: en ninguna situación posible del modelo falta. Cuando contesta «sí hay», el contraejemplo es una situación concreta para mirar en el juego.

## Los límites

- Mira lo que **puede** pasar según las condiciones, no lo que pasa jugando: que una situación sea posible no quiere decir que una jugadora llegue a ella (para eso, la exploración de `tools/cobertura.js`).
- Las condiciones que el modelo no entiende (por ejemplo `canal_libre`, `dicha:x`) quedan libres: pueden valer o no. Puede haber huecos que el juego no tiene por eso; se corrige enseñándole esa condición al modelo.
- El tono (que una recién conocida no sea cariñosa) no se puede revisar con reglas de palabras: queda para una lectura (o para un modelo de lenguaje que marque las dudosas).

## De un error a una regla

Cuando una prueba (una partida de usuaria, una exploración) encuentra algo que no cuadra, no se arregla solo esa frase:
se pregunta **qué regla general se rompió**, se escribe esa regla, y se deja que el modelo encuentre todos los casos parecidos.

1. **¿Es algo que una frase o escena supone?** → una regla `referencia` en `src/datos/reglas.txt` («la niña de los Cuthbert» supone que se sabe que hay una; «en camisón por el camino» supone que Ana está fuera de Tejas Verdes). El modelo las busca en todas las frases y escenas.
2. **¿Falta algo que debería haber?** → una regla `espera` (alguien la ve así y no tiene nada que decir).
3. **¿Es algo que el juego hace mal, aunque los datos estén bien?** → una regla del motor, con su prueba (`tools/reacciones.js`: lo que se ve de Ana se dice; nadie repite la misma frase el mismo día; una presentación cortada no deja conocidos).
4. **¿Es algo de cómo están escritos los datos?** → una revisión en `tools/grafo.js` (toda noticia que «llega a» alguien tiene su reacción; una escena que nombra quién le contó algo a alguien pide `sabe:k:f:contada`; una noticia que dice «anoche» no se cuenta por días).
5. **¿El modelo no lo vio?** → el modelo entiende mal algo del juego, y se corrige el modelo (en la partida 8: leía `canal:` como el lugar de Ana, y es la cola de conversación).

Después: `python3 tools/modelo.py`, se arregla lo que aparezca, y se juega de nuevo. La partida 8 (`trazas/partida8/`) es el primer ejemplo completo.

## Lo que se ve tiene que ser verdad (y de una niña de 11 años, en 1880)

De la revisión crítica de las animaciones salieron estas reglas, cada una general:

- **Lo que hace una niña es de niña.** Lo de los grandes (el hacha, la horquilla) lo hacen los grandes; una niña hace su versión: Ana no parte leña, **entra la leña a la cocina**, una brazada a la vez, desde la pila del tajo hasta la caja de la estufa (`acarrear_lena`); en el heno, **rastrilla** y junta un fardo, no tres. El planificador lo decide con `isKid(k)` para cualquier niño, no solo para Ana.
- **Lo que se hace con las manos se hace donde se hace.** Una conversación que es una lección (sembrar, cocinar) dice dónde se hace (`se_hace_en:` en `src/datos/conversaciones.txt`: un lugar de afuera o una pieza). Si están en otra parte, primero van juntos allá, y empieza cuando llegan los dos. `tools/grafo.js` avisa de toda conversación con las manos (surco, harina, ordeñar…) que no lo diga.
- **Lo que crece, crece de noche, y despacio.** Un cantero crece solo si se regó ese día, de a una etapa cada varias noches (`ETAPA_DIAS` en `src/js/51-huertito.js`: unas dos semanas de semilla a flor); las bayas y las manzanas vuelven a estar al día siguiente, no a los quince minutos. Cortar flores deja la planta con hojas.
- **El huertito de Ana es suyo.** Matthew, en la lección, le da un sobrecito de semillas (`! cosa ana semillas 1`); Ana lo siembra donde quiera, en el pasto, lejos de caminos, casas, cercos y agua.
- **Ningún camino atraviesa una casa.** Todo tramo que cruza el cuerpo de una casa la rodea (por delante o por el costado más corto), y todo camino a una puerta sale del frente (`src/js/03-corrales-y-campos.js`).
- **Nadie es atropellado.** Un carro va al paso de un caballo (`CARRO`, casi como quien camina) y se detiene ante quien está en el camino justo delante; los grandes se hacen a un lado, a Ana la espera.

## Los textos viven en los datos, no en el código

Todo lo que alguien dice o escribe en el juego está en `src/datos/`, con sus condiciones, para que se pueda ampliar (a mano o con una IA) y lo revisen las mismas reglas:
- las escenas, conversaciones y cartas (con sus respuestas: `canal: respuesta`), en `guion.txt` y `conversaciones.txt`;
- las charlas de a dos y de a tres, en `charlas.txt`;
- **los dichos** (`src/datos/dichos/*.txt`): lo que se dice en un momento que el código nombra (un «gracias», lo que se dice al hacer una tarea, un saludo, el camino a Bright River), con condiciones y huecos `{nombre}`; el código los pide con `dicho('momento', {…})`;
- las historias del día escritas a mano, en `historias.json`.

`tools/grafo.js` revisa que cada momento que pide el código exista, que ninguno quede callado y que las condiciones estén bien escritas; `tools/modelo.py` lee los dichos que dicen quién los dice (`quien:`) y les aplica las reglas de `reglas.txt` (así aparecieron líneas de Diana que no decían «mientras no se lo prohíban»).

## Los días a prueba (del 1 al 3)

Lo que pasa entre que Ana llega y que Marilla decide (los cap. 2 a 8 del libro) se revisa de tres maneras:

1. **Las metas** (`src/datos/cuaderno.txt`): solo las marcadas `a prueba` (rezar, ayudar en la casa, la huerta, ponerle nombre a las cosas) se pueden hacer antes de «quedarse»; las demás lo piden. `tools/grafo.js` lo revisa.
2. **Las reglas** (`src/datos/reglas.txt`): nada supone que Ana se queda (la escuela, la escuela dominical, «cuando seas grande»); nadie le dice «ojalá te quedes» después de que se queda; Marilla y Matthew, mientras está a prueba, tienen algo que lo tenga en cuenta; no se llega al día 5 sin que Marilla decida. El modelo también lee los guiños del cuaderno (con sus `[condiciones]`).
3. **Las jugadoras** (`node tools/aprueba.js`): siete estilos juegan desde la llegada hasta que Marilla decide (la obediente, la rebelde, la exploradora, la fugitiva, la encantadora, la insoportable, y la que empieza en Bright River). En lo que de verdad se dijo, revisa lo que el modelo no puede ver: que nadie repita una frase el mismo día ni vuelva a comentar lo mismo de ella, que nadie la llame por su nombre antes de conocerla, que nadie hable de su futuro antes de que la acepten, y que la historia termine a tiempo. Deja `trazas/aprueba/aprueba.md`, con todo lo que oyó cada una, para leerlo.

Lo que salió de ahí, como reglas del motor: lo que alguien ya comentó de Ana (el camisón, la noche) no lo vuelve a comentar ese día, y si una escena suya va a comentarlo, la frase suelta le cede el turno (`comento:k:x`); nada se repite delante de ella (saludos, charlas entre vecinos, avisos), salvo las muletillas cortas y los gestos; los niños cuentan una noticia solo si tiene `dice niños:`; una respuesta solo nombra a quien cuenta la noticia.
