# El motor de la historia

Todo lo que pasa en Avonlea sale de tres componentes. Cada uno sigue un modelo conocido de la narrativa interactiva, y usa sus nombres.

| Componente | Qué es | En el estado del arte |
|---|---|---|
| **El estado** | lo que es cierto del mundo: hechos, cualidades y tiempo | *quality-based narrative* (Failbetter, *Fallen London*): el mundo es un diccionario de cualidades |
| **Las escenas** | piezas de historia: precondiciones → contenido → efectos | *storylets* (Kreminski y Wardrip-Fruin, 2018); reglas de diálogo de Valve (*Left 4 Dead*) |
| **El planificador** | cómo cada personaje cumple una meta: acciones con precondiciones y efectos, buscadas con A* | *GOAP* (Jeff Orkin, *F.E.A.R.*) |

Lo que no es motor:
- **El cuaderno** (`src/datos/cuaderno.txt`) solo lee el estado y lo muestra al jugador, para que se guíe. También pone **guiños** en los diálogos: cada meta puede tener frases que alguien dice al pasar (`guiño diana: …`) mientras está abierta y sin cumplir, o mientras está cerrada (`guiño cerrada marilla: …`), para que el jugador se entere sin abrir el cuaderno. Van como mucho dos por persona a la vez: primero los de metas abiertas, después los de metas a las que solo les falta esfuerzo o tiempo.
- **La gente de fondo** (alumnos, granjeros) sigue un horario de lugares por hora: es ambiente, no historia.

## 1. El estado

| Qué | Forma | Ejemplos |
|---|---|---|
| **Hechos** | algo que pasó, con el día en que pasó | `hecho:prohibida`, `dias_desde:prohibida:2` |
| **Hechos con dueño** | algo que alguien sabe | `sabe:marilla:diana_borracha` |
| **Cualidades** | un número con dueño (y, si es de uno hacia otro, a quién) | `granja:ana>=15`, `estudio:gilbert<30`, `afecto:diana:ana>=4` |
| **Tiempo** | la hora, el día, la estación | `estacion:verano`, `dia_estacion:1` |

- Las **cualidades declaradas** (`src/datos/habilidades.txt`) dicen dónde empiezan (`inicial`), su rango (`rango: 0-5`) y sus umbrales: subiendo (`hito N`) y bajando (`bajo N`).
  - Las **habilidades** (estudio, granja, letras) suben con las acciones de quien las hace. Cualquier personaje las tiene, no solo Ana.
  - Otras son **de alguien hacia otro** y suben con lo que hace otro (`de: marilla`, `hacia: ana`, `por: ana`). Ejemplo: **la paciencia de Marilla** con Ana, desde que llega hasta White Sands (`paciencia:marilla:ana<=1`). Baja con las faltas, que son escenas del guion (`! suma paciencia:marilla:ana -1`), y sube cuando Ana ayuda en la casa o pide perdón. `visible si:` dice cuándo cuenta (fuera de eso no cambia) y cuándo se ve en el cuaderno («Cómo la ven»).
- El **afecto** es una cualidad de uno hacia otro, de 0 a 5.
- **Lo que alguien ve y dónde está:** `ve:marilla` (Ana está en la misma pieza, o cerca afuera), `donde:ana:tejas` (en la cocina, su pieza o el patio de Tejas Verdes), `ana:camison`, `ana:sin_sombrero`, `ana:ropa_tirada`. Todas se pueden negar con `!`.
- Las formas antiguas siguen valiendo: `afecto:diana:ana:4` es `afecto:diana:ana>=4`; `estudio:30` es `estudio:ana>=30`; `camino:granja:15` es `granja:ana>=15`.

## 2. Las escenas (storylets)

Están en `src/datos/guion.txt`. Cada escena tiene:

- **Precondiciones:** dónde y quiénes (`en: ana=gg, marilla=gg`), y qué tiene que ser cierto (`si:` con hechos, cualidades y tiempo).
- **Contenido:** las líneas de diálogo, con narración entre paréntesis.
- **Efectos** (`al_empezar:`, `al_terminar:`):
  - `hecho x` y `olvidar x`;
  - `contar quien x`: un hecho con dueño;
  - `suma granja:ana 2`, `suma afecto:diana:ana -1`;
  - `meta quien tipo args`: un **encargo**, una meta para un personaje que el planificador sabe cumplir.
- **Repetición:** `repetir: una_vez` (por defecto), `dia` o `siempre`. Una rutina es una escena que se repite.

**Cómo se elige** cuando varias escenas pueden decirse a la vez en un canal:
1. va la de más **prioridad**;
2. a igual prioridad, la **más específica**, la que pide más condiciones (como en las reglas de diálogo de Valve). Así una frase para «después del crup, en invierno» le gana sola a la genérica.

**El ritmo** (un *drama manager* mínimo, como el de *Façade* o el narrador de *RimWorld*):
- Una escena marcada `grande` empieza algo grande del libro (el broche, la prohibición, el crup, la tía Josephine…).
- Como mucho hay una grande por día (`RITMO_GRANDES`), así que dos grandes nunca caen la misma tarde.
- Si una grande no puede pasar hoy, espera a mañana. Las que continúan una cadena ya empezada (salvar a Minnie May después del aviso) no se marcan, para que nada las corte.

**Las conversaciones** (`src/datos/conversaciones.txt`): escenas de Ana con los suyos (Marilla, Matthew, Diana, la Sra. Lynde, la Sra. Barry, el Sr. Harrison), inspiradas en el libro, que dependen sobre todo de la cercanía (`afecto:marilla:ana>=4`). No se disparan por lugar: se tienen desde el menú de la persona (💬) o, a veces, solas, cuando Ana está cerca y libre y la otra persona no está ocupada. Se pueden tener todas las que se quiera, pero lo que suman (las que marcan un paso en la relación suman afecto; otras, una habilidad) sube como mucho una vez al día por cada cualidad: si hoy ya subió, se nota al día siguiente.

**Todas son escenas.** Lo que cambia es qué las dispara (`disparo:`): el lugar y el estado (lo normal), el encuentro de dos personajes, la conversación desde el menú (`conversar`), la primera vez que se hace algo (`primera`), un menú propio (`menu`, como las señas con la vela), un hito.

**Lo que pasa en medio de una escena:** una línea `! acción` se hace cuando le llega su turno, entre los diálogos: `! sentar ana` (a su lugar en la mesa de la cocina), `! levantar marilla`, `! ana llora=true` (llora con la cabeza en la mesa), `! dormir` (pasa la noche), y cualquier efecto (`! suma afecto:marilla:ana 1`). Cuando una elección cambia el cariño hacia Ana, se ve: corazones y un aviso («♥ Marilla te mira con otros ojos (cariño 3/5)»), para que el jugador entienda qué hacen sus decisiones.

**El tiempo y las decisiones:** mientras el jugador decide (una elección de una escena, un menú, un nombre que escribir) o lee una tarjeta, el mundo se detiene. Ana va sola solo con el botón 🤖 (modo automático): entonces el tiempo sigue y ella elige sola después de un rato. Ya no se pone en automático porque el jugador deje de tocar.

**Cómo se ve cada línea** (como en una historieta): lo que alguien dice, en un globo con su colita; lo que se cuenta de alguien, cómo se siente o qué hace (entre paréntesis al comienzo de la línea: `ana: (Ana se queda quieta, sin respirar.) ¿Para siempre?`), en un cuadro de narración fijo arriba de la pantalla (uno debajo del otro si hay varios); lo que piensa (`ana piensa: No voy a mirar.`), en una nube de pensamiento. Capturas: `trazas/globos-narra-y-dice.png`, `trazas/globos-piensa.png`.

**Escenas con alternativas** (como en Yarn Spinner, Ink, o los eventos de *Stardew Valley*): en las líneas de una escena, `-> lo que Ana puede hacer` abre una opción; debajo, con sangría, sus propias líneas (`quien: texto`) y lo que deja (`! hecho x`, `! suma afecto:marilla:ana 1`, `! log …`). Con `->*`, lo que Ana haría sola. La escena se detiene en la elección: el jugador elige en un menú; si no está (Ana va sola), después de unos segundos elige Ana. Después sigue con la opción elegida y con lo que venga después, igual para todas.

```
lynde: Es terriblemente flaca y fea, Marilla. ¡Y el pelo, rojo como zanahoria!
-> ¡La odio! ¡Es una mujer grosera e insensible!
   ana: ¡La odio, la odio, la odio!
   ! hecho ofendio_lynde
->* Apretar los puños y contar hasta diez
   ana: Buenas tardes, Sra. Lynde.
   ! suma afecto:marilla:ana 1
```

**La narración:** una escena puede llevar `narra: texto` (una o varias líneas), lo que la explica: quién es quién, qué pasó antes, dónde estamos (la introducción, la Sra. Spencer, la Sra. Lynde, los Barry, el crup, el examen…). Sale en una tarjeta, como la página de un libro, antes de las líneas; mientras está abierta el tiempo se detiene (el mundo espera), y la escena espera a que el jugador siga («Seguir», espacio o Enter); si Ana va sola, sigue después de un rato. Dentro de las líneas, `narra: texto` también vale.

**Los nombres que pone Ana** (`src/js/57-nombres-de-ana.js`): cuando Ana bautiza algo (la Avenida, la laguna de Barry, el cerezo de su ventana, los lugares de Avonlea), el jugador elige entre el nombre del libro y uno propio, que escribe en una caja. Desde entonces esa cosa se llama así en todas partes: en lo que se dice, en el diario, en el mapa, en los letreros y en lo que se le cuenta a la IA. En una escena es una alternativa más; el estado que queda depende del camino elegido:

```
ana: Oh, ese nombre tampoco me gusta. La llamaré… a ver…
->* el Lago de las Aguas Brillantes
   ana: El Lago de las Aguas Brillantes. Sí, ése es su nombre verdadero.
   ! nombrar lago          (el del libro: hecho nombro_lago)
-> Otro nombre…
   ana: El Lago de las Aguas Brillantes. Sí, ése es su nombre verdadero.
   ! nombrar lago ?        (el que escribe el jugador: nombro_lago y nombre_propio_lago)
```

Las líneas se escriben con el nombre del libro: el juego lo cambia solo por el de Ana (respetando «del», «al» y la mayúscula). Ana sola, sin jugador, usa el del libro.

**Los comentarios** (`src/datos/comentarios.txt`): lo que alguien dice al pasar, al mirar algo o al hacer algo, también son escenas: de una sola línea, con sus condiciones (`- [estacion:invierno] texto`), agrupadas por el momento en que se dicen (`=== ventana ===`, `=== espejo ===`, `=== ana_sola ===`, `=== sueno_1 ===`…). Las elige el mismo motor (no la misma de la vez anterior; las más específicas, el doble de seguido), pero no detienen a nadie, no tienen efectos y se pueden repetir. Así no queda ninguna frase suelta en el código: todo lo que se dice está en el guion, con condiciones, y lo revisa el grafo.

**Lo corto también tiene condiciones:** las frases propias de cada personaje (`src/datos/personajes.json`, `[hecho:se_queda] texto`), los diálogos de dos o tres al encontrarse (`si:`) y los chismes. Así nadie habla como si conociera a Ana antes de conocerla: mientras Ana está a prueba, Marilla es seca y Matthew tímido; Diana y la Sra. Barry saludan como a una extraña hasta que se conocen; la Sra. Lynde, ofendida, no le habla hasta la disculpa. Las pistas (guiños) solo las da alguien que ya conoce a Ana.

**Las cosas** (`disparo: objeto`, `objeto: gwin`): cada cosa que Ana usa o mira (la ventana de su pieza, el espejo, el armario, el mar desde el faro, el banco del lago, el fuego, la pizarra, la gata…) tiene muchas escenas, cada una para su momento: por estación y hora (`repetir: dia`, que vuelven de vez en cuando), o por lo que ya pasó (una vez: la ventana después de la prohibición, el espejo después de «¡Zanahorias!»). Como mucho una al día por cosa: la de más prioridad y, a igual, la más específica; entre iguales, una que no se haya visto. Las demás veces, la frase de siempre. Con `tambien`, la cosa se hace igual (sentarse, calentarse).

**Los lugares** (`disparo: lugar`, `lugar: bosque_encantado`): cuando Ana pasa libre por un lugar de Avonlea (el Bosque Encantado, el puente del arroyo, el Camino Blanco, el lago, el campo rosado, la playa, la huerta…), el lugar le dice algo. Una al día por lugar, y con un respiro entre una y otra. Si Ana va camino a un encargo, no.

**Escenas que interrumpen lo que sea** (`interrumpe`): como la Avenida en flor en el viaje desde Bright River. No esperan a que termine la charla ni a que Ana esté libre (aunque vaya camino a un encargo, o en la carreta): cortan lo que se está diciendo (la charla al pasar, una conversación de menos prioridad, que queda donde iba para seguir otro día) y Ana se detiene; después, todo sigue. Nunca cortan una elección del jugador ni una tarjeta de narración. Ejemplos: el Camino Blanco la primavera en que Ana ya es de Tejas Verdes, la primera vez que ve el mar, la primera nieve.

**El estilo de estas escenas** (el de la ventana): que inspiren. Primero lo que se ve, se oye o se huele, concreto, de esa estación y esa hora; después Ana lo transforma con su imaginación (una imagen, un cuentito, las cosas como si sintieran); al final, un sentimiento chico que se queda (gratitud, nostalgia, ganas, un poco de humor sobre sí misma). Dos o tres líneas. La IA tiene la misma indicación para sus escenas improvisadas.

**La ropa:** Ana se acuesta en camisón y amanece en camisón (sin sombrero); se viste cuando el jugador lo decide, en el armario, igual que el sombrero. La primera noche deja el vestido y los zapatos tirados en el suelo; mientras duerme, Marilla los dobla en la silla (no se ve), y en el desayuno se lo dice (como en el libro: «En el orfanato siempre teníamos que doblarla… la mitad de las veces se me olvidaba»). Desde la segunda noche, al acostarse, el jugador decide: doblar la ropa en la silla (Marilla lo nota: más cariño) o dejarla tirada (y en la mañana Marilla se lo dice). Con 🤖, Ana se viste sola en la mañana.

**Tocar una cosa:** con Ana al lado, si allí se puede hacer más de una cosa (otra cosa en el mismo lugar, o algo de ella que se hace justo ahí: lavar los platos en la mesa, escribir en el escritorio), sale un menú con todo; si hay una sola, se hace.

**Las líneas de las cosas y los lugares** (`src/js/66-primeras-veces.js`; en el guion, al final): cada cosa que Ana usa o mira (`disparo: objeto`) y cada lugar por el que pasa (`disparo: lugar`) tiene su línea de escenas numeradas, `paso: 1`, `2`, `3`… (el 1 es la primera vez). Va el primer paso no dicho cuyas condiciones se cumplen ahora: el orden es una preferencia, no una obligación (uno de invierno espera al invierno sin trabar la línea). Variantes de un paso (`4.1`, `4.2`): va la más específica, y dicha una, el paso queda dicho. Cada línea termina en un comodín (`paso: siempre`, sin condiciones, una vez al día), para que siempre haya algo; el grafo lo revisa. Con `tambien`, la cosa se hace igual (subir la escalera, sentarse). Los nombres: la línea y el paso (`ventana_3`, `geranio_1_2`, `espejo_siempre`).

**El estado de la historia** (`src/datos/estado.txt`, `src/js/20-estado.js`): un hecho es algo que pasó, una vez, con su día; el estado es cómo están las cosas ahora, y cambia. Cada variable tiene un valor de una lista: en orden, una escala (`ana_en_tv: llegando < en_prueba < decidida < se_queda`, `diana: desconocida < conocida < amiga_del_alma`), o sin orden (`barry_permite: si, no`; `viaje: ninguno, primer_viaje, white_sands`); `otros:` son valores fuera de la escala (Ana devuelta). El guion lo cambia (`! estado diana amiga_del_alma`, `al_terminar: estado ana_en_tv se_queda`) y lo pregunta en `si:` como cualquier condición: `diana>=conocida`, `ana_en_tv<decidida`, `barry_permite=no`, `viaje!=ninguno`. Entrar en un valor puede dejar un hecho (`amiga_del_alma: hecho amigas_del_alma`, para `dias_desde` y el código) u olvidar otro (`bien: olvida ofendio_lynde`). El grafo revisa nombres y valores; el modelo (Z3) y la historia en tarjetas lo entienden igual.

**Charlas por lugares, en secuencia:** una condición `cerca:ana:aldea:700` pide que alguien esté afuera, cerca de un lugar del mapa (los de `PLACES`: `hondonada_lynde`, `escuela`, `aldea`, `playa`…); en un viaje, dónde va la calesa. Las charlas de un viaje se encadenan con alternativas: `o: si=dicha:ws_t1` (sigue a la anterior) y `o: si=cerca:ana:hondonada_lynde:500` (o empieza al pasar por su lugar), y se cierran con `!dicha:<la que sigue>`; entre una y otra, unos segundos en silencio. Así el viaje a White Sands va por lugares, no por porcentajes del camino.

**Los hitos:** al cruzar un umbral de una cualidad que tiene que ver con Ana (suya, o de alguien hacia ella), subiendo (`hito N`) o bajando (`bajo N`), alguien se lo dice la próxima vez que se encuentran (la línea escrita), y queda el hecho `hito_<cualidad>_<n>` o `bajo_<cualidad>_<n>`. Si se cruzan varios a la vez, o se cruza otro antes de que se lo digan, se dice solo el último.

**Las reglas de la casa** (cap. 4 a 8): cada falta es una escena como cualquiera. Se dispara cuando Marilla la ve haciendo algo que en su casa no se hace (`ve:marilla`, `ana:camison`), cuando la ropa vuelve a quedar en el suelo, o cuando Ana anda lejos de noche o el día del viaje (`!donde:ana:tejas`: Marilla sale a buscarla). Cada falta baja la paciencia de Marilla; si Ana pide perdón en la escena, no baja. La lógica es que lo que aleja a Marilla no son las travesuras, sino no arrepentirse. Marilla avisa al bajar a 1, y el cuaderno lo muestra.

**White Sands, sin paciencia:** si Ana llega al viaje con la paciencia en 0, la escena es otra (`viaje_spencer_duda`): Marilla duda de verdad ante la Sra. Blewett y Ana elige cómo reacciona. Lo que pasa después son escenas elegidas por prioridad, según lo que Ana eligió y lo que la quieren:
1. si Matthew la quiere mucho, la salva él (como en el libro, donde Matthew es quien quiere quedársela);
2. si suplica y Marilla le tiene cariño, no la entrega;
3. si calla y Marilla la quiere, tampoco;
4. si no, se va con la Sra. Blewett.

**Conocerse, y las noticias** (`src/js/66-conocidos.js`): Ana llega conociendo solo a Matthew, a Marilla y a la Sra. Spencer.
- La primera vez que habla con alguien, se presentan (una presentación propia en `personajes.json`, `presentacion`, o la de un adulto o un niño), y queda el hecho `conoce_<quien>` (`conoce:diana` en el guion). Algunos se conocen como en el libro: Diana, la Sra. Barry, la Sra. Lynde (`CONOCE_POR`).
- Quien no la conoce no la llama por su nombre (una frase con «Ana» no se dice) ni habla de algo que no pasó: esas frases piden lo que hace falta (`[cuaderno:escuela] …`, `[conoce:minnie] …`).
- Tampoco nadie sabe que los Cuthbert tienen una niña hasta que se entera: es una **noticia** (`sabe:barry:nina_cuthbert`). Al principio la saben Matthew, Marilla y la Sra. Spencer. La Sra. Rachel la ve desde su ventana la primera mañana (una tarjeta, como en el cap. 1) y desde ella pasa de uno a otro cuando los vecinos conversan. Quien conoce a Ana también la aprende. Quien no sabía, se sorprende: «¡No sabía que los Cuthbert tenían una niña!».
- **Las noticias son datos, y son creencias** (`src/datos/noticias.txt`, motor en `src/js/66-noticias.js`). Cada `=== id ===` dice quiénes la saben desde el principio (`saben:`) o desde que algo pasa (`saben si hecho:llego_stacy: lynde`), si la aprende quien conoce a Ana (`al conocer a ana: sí`), a quién le llega unas horas después aunque no se encuentren (`llega a marilla en: 3`), cuántos días se sigue contando (`se cuenta por: N`), y cómo se cuenta y se responde (`dice:`, `dice lynde:`, `exagerada:`, `responde:`). Como en *Talk of the Town* (James Ryan), cada uno recuerda **quién se lo contó y qué versión oyó**: los chismosos (`exageran: lynde, srapye, josie`) la cuentan una versión más grande, y quien la oye más grande se la cree. En el guion: `sabe:marilla:ana_en_camison:2` (oyó la versión agrandada) y `{De:marilla:ana_en_camison}` en una línea («La Sra. Lynde»). Los vecinos se cuentan noticias cerca de Ana (en voz alta) y lejos (`game.wm.chismes` guarda los últimos). Lo prueba `tools/chismes.js`.
- **Quién está en Avonlea, y cuándo** (`src/datos/llegadas.txt`, para la gente de la casa y la del pueblo por igual): `llega si: <condiciones>` (está solo mientras se cumple alguna) y `se va si: <condiciones>` (desde que se cumple, ya no está). Quien no está no aparece en el mapa ni en ninguna escena: una escena en la que habla espera a que llegue (`¡Zanahorias!` espera a Gilbert), y sus metas esperan; `presente:x` en el guion. Como en el libro, en el orden del libro y apretado al año del juego (56 días, 14 por estación): Diana vuelve de Carmody el día 18; Gilbert, de Nuevo Brunswick, cuando Ana lleva unos días en la escuela; la tía Josephine viene en invierno; los Allan llegan en la primavera del segundo año; el Sr. Phillips y Prissy Andrews se van al terminar ese año escolar; la Srta. Stacy llega en el otoño del segundo año; el buhonero pasa dos días por estación, y los veraneantes vienen en verano. Las partidas empezadas antes (sin `inicio_juego`) tienen a todos. Lo prueba `tools/llegadas.js`.

**Los días del libro:** la decisión se toma en White Sands, como en el libro, y no hay una prueba larga después.

| Día | Qué pasa | Capítulo |
|---|---|---|
| 1 | Ana llega de noche, cena y pasa la primera noche | 2 y 3 |
| 2 | el desayuno; en la tarde, White Sands, donde Marilla decide; esa noche se lo dice a Matthew, pero no a Ana | 4 a 6 |
| 3 | en la tarde, Marilla le dice a Ana que se queda | 8 |
| 15 | la Sra. Lynde viene a verla («Ana llevaba quince días en Tejas Verdes») | 9 |

La paciencia de Marilla solo cuenta hasta White Sands (`visible si: !hecho:a_prueba`): fuera de eso una cualidad no cambia ni se ve. Las reglas de la casa siguen después, pero ya sin ese peso.

**Finales y puntos para volver:** `! punto viaje | Volver a la mañana del viaje a White Sands` guarda la partida tal como está en ese momento (el desayuno del viaje la guarda). `! final devuelta | texto` termina la historia: una tarjeta «FIN» y el mundo se detiene. La tarjeta ofrece volver a cada punto guardado o empezar de nuevo, y se muestra otra vez si se abre el juego. Una partida nueva borra los puntos de la anterior.

## 3. El planificador (GOAP)

Las escenas dicen **qué** pasa; el planificador decide **cómo**. Cada personaje tiene metas: las que le da una escena (un encargo), las de su agenda y las que le pide alguien. Para cumplirlas busca con A* una secuencia de acciones, cada una con precondiciones y efectos (ir, tomar, pedir, cocinar…), y vuelve a planificar si algo cambia. Las acciones también cambian el estado: suben habilidades, dejan objetos, cambian el afecto.

Un encargo puede ser:
- **una meta:** un estado a lograr («Ana está en La Cuesta del Huerto»); el planificador busca los pasos;
- **una coreografía:** pasos exactos, en orden, cuando el libro pide un gesto preciso.

## La planilla (`planilla/avonlea.xlsx`)

Para ver todo junto y encontrar lo que falta, como se hace en los estudios (una tabla por tipo de contenido y una **matriz de cobertura**: personajes × momentos de la historia).

- **Las frases sueltas** de todos (la gente de la casa y la del pueblo, y los vecinos sin nombre) viven en un solo archivo: `src/datos/frases.txt` (`=== quien ===`, `dice:`, `ana:`, `primavera:`…, con sus condiciones entre corchetes).
- `node tools/planilla.js` abre el juego por dentro y arma la planilla:
  - **Frases** (se edita): una fila por frase, y las condiciones en columnas con listas desplegables (¿conoce a Ana?, después de un hecho o meta, días después, antes de, estación; lo demás, tal cual en «Otras condiciones»).
  - **Huecos**: cada personaje en cada momento de la historia (día 2, día 4, la visita de la Sra. Lynde, Diana, la escuela, el invierno, los Allan, la Srta. Stacy), cuántas frases valen si todavía no conoce a Ana y si ya la conoce. Rojo: ninguna.
  - **Personas, Escenas, Noticias, Llegadas, Hechos, Metas**: para mirar (se editan en `src/datos/`).
- **Escenas, Noticias, Llegadas** también se editan en la planilla (los campos de cada bloque, en columnas; los diálogos se leen en la hoja «Diálogos» y se escriben en `guion.txt`).
- **Cobertura** (`tools/cobertura.py`, también `trazas/cobertura.md`): lo que falta, con prioridad: lugares × cómo anda Ana (en camisón, sin sombrero, de noche) sin escena que reaccione; quién nunca reacciona al camisón; noticias que nadie usa; llegadas que nadie nota; gente sin presentación propia, con pocas frases o sin escena; metas sin guiño ni pista; hechos que nunca pasan o que nadie lee.
- `python3 tools/importar_planilla.py` lleva la hoja «Frases» de vuelta a `src/datos/frases.txt`: revisa cada fila (quién, tipo, condiciones) y, si algo está mal, no cambia nada y dice en qué fila; después compila, y si el revisor de la historia encuentra un problema en una frase, vuelve atrás.

## El modelo de las interacciones (`tools/modelo.py`)

Un modelo lógico de lo que la gente le dice a Ana, revisado con un solucionador (Z3): busca, en todas las situaciones posibles, dónde no hay nada que decir, dónde nadie reacciona (a Ana en camisón, sola de noche…) y qué frases suponen algo que puede no cumplirse. Lo único escrito a mano son las reglas (`src/datos/reglas.txt`); el resto sale de los datos. Ver `docs/MODELO_INTERACCIONES.md`.

## 4. Cómo se comprueba

| Herramienta | Qué hace | Salida |
|---|---|---|
| `node tools/grafo.js` (corre solo con cada build) | revisa el grafo: escenas o metas que piden un hecho que nada deja (nunca pasarían), condiciones mal escritas, hechos que nada lee; y lo dibuja, para recorrerlo (buscar, tocar una escena: lo que necesita y lo que abre, los hechos, los puntos). | `trazas/grafo.md`, `trazas/grafo.html` |
| `node tools/historia.js` (corre solo con cada build) | la historia en fichas, sin el mundo: el estado (hechos, contadores, metas, día, hora, dónde está Ana), lo que pasa ahora y lo que pasaría si la jugadora o el mundo hacen algo; se juegan las escenas con sus opciones, se vuelve atrás | `trazas/historia.html` |
| `node tools/auditoria.js` | corre cada meta de prueba y compara el relato del juego con lo que debería pasar | `trazas/auditoria.md` |
| `node tools/paciencia.js` | la paciencia de Marilla: las faltas, el perdón, la ayuda, la búsqueda, la duda en White Sands y sus desenlaces, el final y volver atrás | en la consola |
| `node tools/caos.js` | jugadoras que hacen lo inesperado (teclas en plena escena, escaparse, recargar en el peor momento, el teléfono), con invariantes en cada paso | `trazas/partida3/` |
| lectura a mano | lo que las comparaciones no ven | `trazas/lectura.md` |

## Lo que queda (del estado del arte)

- **Prácticas sociales** (*Versu*, Evans y Short): las actividades de varios (el té, la cena, el picnic) como estructuras con roles. Hoy el té es un caso especial.
- **Cualidades que bajan solas** (el afecto que se enfría): sería un efecto de una rutina diaria, sin mecánica nueva.
- **La agenda como escenas que se repiten:** hoy la agenda de los personajes está en el código (`AGENDA`); pasarla al guion la dejaría en el mismo formato que todo lo demás.

## Fuentes

- Kreminski y Wardrip-Fruin, *Sketching a Map of the Storylets Design Space* (ICIDS 2018); [Emily Short sobre storylets](https://emshort.blog/2019/01/06/kreminski-on-storylets/).
- Elan Ruskin, *AI-driven Dynamic Dialog through Fuzzy Pattern Matching* (GDC 2012); [resumen de Emily Short](https://emshort.blog/2012/03/16/gdc-2012-talk-on-dynamic-dialogue/).
- Jeff Orkin, [*Three States and a Plan: the AI of F.E.A.R.*](https://gdcvault.com/play/1013282/Three-States-and-a-Plan) (GDC 2006).
- Evans y Short, [*Versu*](https://www.cs.uky.edu/~sgware/reading/papers/evans2014versu.pdf).
- Mateas y Stern, [*Façade*](https://users.soe.ucsc.edu/~michaelm/tenurereview/publications/mateas-tidse2003.pdf) (2003).
