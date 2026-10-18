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

**La IA, de noche.** El juego no llama a ninguna IA mientras se juega. Mientras Ana duerme, si quien juega la encendió, la IA escribe bloques nuevos en estos mismos formatos, y las mismas reglas los revisan antes de que se jueguen (ver «La IA de la noche», abajo).

`tools/grafo.js` revisa que cada momento que pide el código exista, que ninguno quede callado y que las condiciones estén bien escritas; `tools/modelo.py` lee los dichos que dicen quién los dice (`quien:`) y les aplica las reglas de `reglas.txt` (así aparecieron líneas de Diana que no decían «mientras no se lo prohíban»).

## Los hitos

`src/datos/hitos.txt` es el esqueleto de la historia: las **situaciones** que la historia garantiza («una persona mayor humilla a Ana por su aspecto»), escritas por lo que significan y no por cómo pasan en el libro. Lo que Ana **responde** en cada una lo decide quien juega («estalla», «se contiene», «llora»), y cada respuesta abre su propio camino: pedir perdón solo existe si estalló; si se contuvo, ese hito queda **cerrado** (✗): no es un error, es su historia. Es la distinción de Chatman entre núcleos y satélites, con la agencia de quien juega: lo que se conserva es la situación, no la respuesta.

- La situación pasa de la forma del libro («pasa si: hecho:lynde_visita») o de otra, escrita a mano o por la IA de la noche, que deja `hecho:historia_<id>`; la respuesta queda como `hecho:historia_<id>_<respuesta>`; lo cerrado, `hecho:historia_<id>_cerrado` (`src/js/66-hitos.js`; se ven en ✒ Ajustes → «Ver lo que saben»).
- **Otra oportunidad:** si Ana no responde como en el libro (o la situación no llega a darse), la IA de la noche puede traerle la situación otra vez, de otra forma, las veces que diga el hito (normalmente una); puede decidir no hacerlo si la partida va claramente por otro lado. Nunca elige la respuesta ni insiste.
- La regla para lo que genere la IA: nada de lo que escriba puede volver imposible una situación pendiente; que una respuesta de quien juega cierre caminos, sí.
- `tools/grafo.js` revisa sus condiciones, sus respuestas (la del libro tiene que ser una de ellas) y que nada se necesite en círculo.

## Los días a prueba (del 1 al 3)

Lo que pasa entre que Ana llega y que Marilla decide (los cap. 2 a 8 del libro) se revisa de tres maneras:

1. **Las metas** (`src/datos/cuaderno.txt`): solo las marcadas `a prueba` (rezar, ayudar en la casa, la huerta, ponerle nombre a las cosas) se pueden hacer antes de «quedarse»; las demás lo piden. `tools/grafo.js` lo revisa.
2. **Las reglas** (`src/datos/reglas.txt`): nada supone que Ana se queda (la escuela, la escuela dominical, «cuando seas grande»); nadie le dice «ojalá te quedes» después de que se queda; Marilla y Matthew, mientras está a prueba, tienen algo que lo tenga en cuenta; no se llega al día 5 sin que Marilla decida. El modelo también lee los guiños del cuaderno (con sus `[condiciones]`).
3. **Las jugadoras** (`node tools/aprueba.js`): siete estilos juegan desde la llegada hasta que Marilla decide (la obediente, la rebelde, la exploradora, la fugitiva, la encantadora, la insoportable, y la que empieza en Bright River). En lo que de verdad se dijo, revisa lo que el modelo no puede ver: que nadie repita una frase el mismo día ni vuelva a comentar lo mismo de ella, que nadie la llame por su nombre antes de conocerla, que nadie hable de su futuro antes de que la acepten, y que la historia termine a tiempo. Deja `trazas/aprueba/aprueba.md`, con todo lo que oyó cada una, para leerlo.

Lo que salió de ahí, como reglas del motor: lo que alguien ya comentó de Ana (el camisón, la noche) no lo vuelve a comentar ese día, y si una escena suya va a comentarlo, la frase suelta le cede el turno (`comento:k:x`); nada se repite delante de ella (saludos, charlas entre vecinos, avisos), salvo las muletillas cortas y los gestos; los niños cuentan una noticia solo si tiene `dice niños:`; una respuesta solo nombra a quien cuenta la noticia.

## La IA de la noche («Mientras Ana duerme»)

Cuando Ana se duerme (`goSleep`, `src/js/22-dormir.js`), si quien juega la encendió en ✒ Ajustes, el juego le pide a una IA (OpenAI, Chat Completions con salida JSON por esquema; `gpt-5.4-mini` de inicio) unos pocos bloques **nuevos** para esa partida, los revisa y guarda los que pasan (`game.noche = { bloques, log, oportunidades, visitas }`). La clave queda solo en el navegador (`localStorage` «avonlea-noche»), nunca en la partida ni en el repositorio. La llamada no detiene el juego: si la respuesta llega mientras duerme, el aviso sale al despertar («🌙 Mientras dormías, Avonlea pensó en ti: N cosas nuevas»). El código: `src/js/66-noche.js`.

**Los niveles.** *Apagado* (de inicio: el juego es exactamente el de siempre) · *palabras*: solo líneas (dichos con `quien:`, respuestas a cartas, conversaciones sin efectos) · *efectos*: además escenas, y efectos sobre lo que ya existe (dejar un hecho del juego, `suma` de a 1, dar una cosa, `saber` una noticia) · *libre*: además hechos nuevos, todos con prefijo `ia_`, y cadenas de escenas propias.

**El pedido** (`nochePedido`): el mundo y el tono del libro, la voz de cada personaje (`voice`), los formatos exactos (dicho, conversación, respuesta `canal: respuesta`, escena), el vocabulario cerrado (las condiciones que entiende `dlgCond`, los hechos que existen —los saca del juego mismo: las escenas, el código, los hitos, las llegadas, las habilidades—, los lugares, la gente, las cosas, las noticias, las metas), lo que permite el nivel, los hitos con su «situación», «no puede» y «variantes», y las reglas de `reglas.txt` en prosa. Y la partida: el día, a quién conoce, los hechos, cómo respondió en cada hito, **el perfil** (`nochePerfil`: a quién nombra el diario, qué hace, adónde va, con las cartas, las conversaciones y las visitas; lo de hace una semana pesa la mitad) y **los cabos sueltos** (`nocheCabos`: cartas sin respuesta, encargos y promesas, hitos que pueden pasar, hitos respondidos distinto que en el libro con oportunidades, lugares a los que vuelve). Como mucho cuatro bloques por noche, cada uno con su «porque».

**Lo que se revisa en el juego** (`nocheValidar(bloques, nivel)` → `{ aceptados, rechazados: [{ bloque, motivos }] }`), con los mismos lectores que los archivos (`dlgGuion`, el de los dichos):
- el formato: un bloque, un id que empieza con `ia_` y no choca con nada; solo los campos de su tipo; nada de `interrumpe`, `lineas: libro:…`, `calesa`, `camino`, `o:`; quien habla es alguien del juego (en una conversación, solo Ana y esa persona; en una escena, quien está en `en:`); una respuesta es solo `carta:`, de alguien que recibe cartas, y pide `respuesta:<quien>`;
- los dichos: se suman a un momento que el código ya pide, que dice siempre la misma persona (`quien:` igual), con los mismos huecos; no a los que se dicen en orden (`dichosEnOrden`); heredan las condiciones del momento;
- las condiciones: solo las claves conocidas, bien escritas, que nombran lo que existe (hechos del juego, o `ia_` de esta noche o de otras, en *libre*);
- los efectos: los del nivel; `suma` de a 1; nunca `olvidar` un hecho del juego, `fin_capitulo`, `final`, `punto`, `meta`…; un hecho del juego que deja pide lo que ese hecho supone (lo que piden todas las escenas que lo dejan); los hechos que pone el código, no;
- **los hitos**: ningún bloque deja la respuesta de Ana (los hechos de las `respuesta` de un hito, ni `historia_<id>_<r>`) ni la forma del libro de una situación (`lynde_visita`, `zanahorias`…); una escena que trae una situación lo dice (`hito: <id>`), deja `historia_<id>` al empezar, y solo si ese hito está listo y le quedan oportunidades; a un hito ya respondido distinto que en el libro le puede dar otra oportunidad (si le quedan); si ofrece responder, ofrece **todas** las respuestas, como opciones (elige quien juega). Cada bloque así gasta una de sus oportunidades (`game.noche.oportunidades`); si en la otra oportunidad Ana responde distinto, cuenta la respuesta nueva, y lo que la vieja había cerrado se abre (`nocheOtraVez`);
- **las reglas** de `reglas.txt`, en su versión barata (sintáctica): cada línea con lo que dice quien la dice; una `referencia` cuyas palabras aparecen exige que sus condiciones (y lo que implican: un hecho supone lo que piden las escenas que lo dejan; ver a alguien, que está; conocer a Ana, que sabe que hay una niña en Tejas Verdes) incluyan lo que la regla pide; una regla `solo` exige que nombre lo que pide o que contradiga su «cuando»; una regla `nunca`, que no la cumpla; nombrar a Ana sin conocerla; condiciones que se contradicen. Es más estricta que Z3: lo que Z3 probaría por caminos largos, aquí se rechaza.

**Las reparaciones y la segunda ronda.** Antes de revisar, `nocheReparar` arregla lo que es solo forma y no cambia el sentido (lo que la IA hizo mal en sus primeras noches en GitHub): «Ana:» → «ana:» (y los nombres de la gente → sus ids, en las líneas, `en:`, `sujeta:`, `con:`, `de:`); en una carta, las líneas sin «carta:» lo llevan; fuera «presente:ana» (Ana siempre está) y «!hecho:<su propio id>» o «!dicha:<su propio id>» (una escena se dice una vez, salvo `repetir`); una escena con `hito:` de un hito que todavía no pasó empieza con «al_empezar: hecho historia_<id>»; si Ana habla y `en:` no la tiene, va donde están todos los demás, cuando es un solo lugar. Lo reparado se cuenta («reparado: …», en el informe y en «Ver lo que agregó la noche»). Lo que sigue descartado vuelve **una vez** a la IA, con sus motivos (`nocheReparacionPedido`), y lo que corrige se revisa igual; el pedido trae además un ejemplo de verdad de cada tipo de bloque, copiado de los datos, y la lista de lo que ya hubo que descartar. Los ejemplos `tools/noche/ejemplos/real1.json` y `real2.json` son lo que contestó gpt-5.4-mini en GitHub (reconstruido de sus motivos): ahora se reparan y se aceptan; `malo.json` trae también su segunda ronda («reparacion»).

**El modelo completo (Z3)** no corre todavía en el navegador: `nocheValidar` devuelve `completo: false` y `nocheModelo` es el lugar donde se enchufará (`tools/modelo-nucleo.js` ya corre en el navegador; falta llevar `trazas/planilla.json` y el bundle de z3-solver). En Node sí corre: **`node tools/noche.js`** arma el mismo pedido para un escenario (`spencer_rachel`: tres cartas a la Sra. Spencer y se contuvo con Rachel; `rival_ignora`: ignoró a Gilbert) o una partida guardada (`--escenario partida.json`), llama a OpenAI con `OPENAI_API_KEY` (aquí, en el contenedor, api.openai.com está bloqueado: lo dice y sale con 2) o lee la respuesta de `--respuesta archivo.json`, la revisa con `nocheValidar` en el juego (Chromium) y, con los aceptados agregados a una copia de los datos, corre `tools/grafo.js` y `tools/modelo.js` (con y sin los bloques: lo nuevo que aparece es del bloque que lo trae, y lo descarta). Deja `trazas/noche/noche.md`, `noche.json` y `pedido.md`. Los ejemplos de `tools/noche/ejemplos/` (uno bueno y uno con errores a propósito: una condición que no existe, efectos por encima del nivel, una línea de Diana que no tiene en cuenta la prohibición, una escena que elige la respuesta de Ana) dicen qué se espera de cada bloque, y sirven de prueba. En GitHub, el flujo «La IA de la noche» (`.github/workflows/noche.yml`, a mano: escenario, nivel, modelo) hace lo mismo con el secreto `OPENAI_API_KEY` y deja el informe en el resumen y como artefacto.

**En ✒ Ajustes:** el nivel, la clave (campo de contraseña), el modelo, «Probar ahora» (la pasada sin dormir) y «Ver lo que agregó la noche» (lo aceptado, con su «porque»; lo descartado, con sus motivos). Lo que la noche agregó queda en la partida aunque después se apague: apagarla detiene las noches nuevas.
