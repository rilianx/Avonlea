# Capítulo 1 del libro, simulado con metas

*(Generado con `node tools/trace_goal.js cap1 --out cap1.png`; la imagen (en webp) es [`trazas/cap1.webp`](../trazas/cap1.webp).)*

El capítulo I de *Ana de las Tejas Verdes* («La Sra. Rachel Lynde se sorprende»), con el viaje del capítulo II y el comienzo del III, jugado en el juego por el planificador (A\*) y las rutinas, sin IA. En el juego: panel 🎯 → **📖 Capítulo 1 del libro** (parte a las 14:54, justo antes de que salga Matthew; a 50× el capítulo entero se ve en unos 6 minutos; el telegrama de mediodía se da por recibido). Con 👁 se puede seguir a cualquiera (la Sra. Lynde, Matthew, Marilla…).

## 1. La agenda verdadera (solo del libro)

Sacada del texto (Gutenberg #45) momento por momento: quién, dónde, qué, y la cita que lo respalda. El libro da pocas horas exactas: las «15:30» de Matthew pasando por la hondonada, el tren de las 17:30, «el tren pasó hace media hora» (18:00) y el atardecer de junio. El resto (marcado con \*) está estimado a partir de esas anclas, de las distancias («un cuarto de milla», «ocho millas», «solo nos falta una milla») y de la luz («todavía no oscurecía del todo», «el sol se había puesto hacía rato»). Los datos están en `LIBRO1.verdad`, dentro de `index.html`.

## 2. La agenda simulada

Qué hace cada uno, como metas del planificador (lo que no es meta lo pone en marcha el controlador del capítulo, `cap1Tick`, a la hora del libro):

| Quién | Metas (en orden) |
|---|---|
| Matthew | `estar_en(granero, hasta 15:18)` → `estar_en(h:br)` (en la calesa: el planificador sabe que el camino toma 145 minutos) → **escena de la estación** → `llevar(Ana, cocina)` (sube a Ana a la calesa y vuelve) |
| Rachel | `estar_en(su casa)` (la ventana) → **apenas ve pasar a Matthew**, `estar_en(cocina de Tejas Verdes)` → **escena con Marilla** (20 min) → `estar_en(casa de los Bell)` → **escena con los Bell** → `estar_en(su casa)` |
| Marilla | en la cocina; pone la mesa para tres (cuando llega Rachel ya está puesta) |
| Ana | llega en el tren de las 17:30, se sienta en las tejuelas a esperar; luego la lleva Matthew (`subir_calesa`, la sigue) |

Las escenas son los diálogos del libro (traducidos), cada una con su tiempo del libro: lo que no alcanza a decirse queda guardado para la próxima vez que esos personajes se encuentren (no se repite nada).

## 3. Comparación

**32/32 momentos del libro ocurren en la simulación**; diferencia media **31 min**, máxima **132 min**. Sin contar la visita de Rachel (que ahora, a propósito, va a Tejas Verdes apenas ve pasar a Matthew, en vez de esperar al té como en el libro): media **11 min**, máxima **33 min**. (\* = hora estimada en el libro.)

| # | Libro | Simulación | Δ | Quién | Qué |
|---|---|---|---|---|---|
| 1 | 12:00* | 12:00 | = | Marilla | recibe el telegrama de la Sra. Spencer, que trae el cartero desde la estación: llegan en el tren de las 17:30 |
| 2 | 15:00* | 15:00 | = | Rachel | teje una colcha de algodón y vigila el camino principal |
| 3 | 15:00* | 15:00 | = | Thomas | siembra su semilla tardía de nabo |
| 4 | 15:20* | 15:20 | = | Matthew | sale de casa en la calesa con la yegua alazana, en vez de sembrar nabos en el campo rojo del arroyo |
| 5 | 15:30 | 15:23 | −7 min | Matthew | conduce la calesa con la yegua alazana, con cuello blanco y su mejor traje, rumbo a Bright River |
| 6 | 15:30 | 15:23 | −7 min | Rachel | ve pasar a Matthew arreglado y no logra adivinar adónde va; decide ir a Tejas Verdes después del té |
| 7 | 15:35* | 15:26 | −9 min | Matthew | trota tranquilo; solo sufre cuando tiene que saludar con la cabeza a las mujeres que se cruza |
| 8 | 17:00* | 15:28 | −92 min | Marilla | pone la mesa para tres con loza de diario, mermelada de manzana silvestre y un solo tipo de queque, y se sienta a tejer |
| 9 | 17:15* | 17:15 | = | Rachel | toma el té |
| 10 | 17:30 | 17:31 | +1 min | Ana | baja del tren de las cinco y media con la Sra. Spencer, que la deja a cargo del jefe de estación |
| 11 | 17:30 | 17:31 | +1 min | Sra. Spencer | sigue viaje en el mismo tren hasta la estación de White Sands (solo mencionada) |
| 12 | 17:35* | 17:34 | −1 min | Ana | rehúsa entrar a la sala de espera de señoras: «hay más campo para la imaginación»; se sienta a esperar |
| 13 | 17:35* | 15:26 | −129 min | Rachel | camina por el largo sendero lleno de surcos, criticando que vivan tan apartados |
| 14 | 17:40* | 15:28 | −132 min | Rachel | golpea la puerta de la cocina, entra y anota mentalmente la mesa puesta para tres |
| 15 | 17:40* | 15:28 | −132 min | Marilla | recibe a Rachel y le cuenta que Matthew fue a Bright River a buscar a un niño huérfano de Nueva Escocia |
| 16 | 18:00* | 16:14 | −106 min | Rachel | se va (para alivio de Marilla) rumbo a casa de Robert Bell a contar la noticia, hablándoles a los rosales silvestres |
| 17 | 18:00 | 17:47 | −13 min | Matthew | ata la yegua en el patio del hotel, pasa junto a la niña sin mirarla y se va a la estación |
| 18 | 18:00 | 17:47 | −13 min | jefe de estación | cierra la boletería para irse a cenar; le explica a Matthew que solo llegó una niña y se marcha a casa con hambre |
| 19 | 18:05* | 18:00 | −5 min | Matthew | camina hasta la niña; ella se presenta y él decide llevarla a casa y que Marilla aclare el error |
| 20 | 18:15* | 16:29 | −106 min | los Bell | recibe a Rachel, que cuenta la noticia de los Cuthbert |
| 21 | 18:15* | 18:27 | +12 min | Matthew | Ana y Matthew suben a la calesa; ella no suelta su bolso de alfombra; salen del pueblo |
| 22 | 18:25* | 18:33 | +8 min | Ana | arranca una rama de ciruelo silvestre que roza la calesa y empieza a hablar (la novia, el vestido de wincey, los caminos rojos...) |
| 23 | 19:00* | 19:15 | +15 min | Matthew | le dice que puede hablar todo lo que quiera; descubre que le gusta su charla |
| 24 | 19:30* | 20:01 | +31 min | Ana | le muestra su trenza: «¿De qué color diría que es esto?» —«Es rojo, ¿no?» |
| 25 | 19:45* | 20:18 | +33 min | Ana | enmudece de asombro bajo las flores, con el atardecer al fondo |
| 26 | 20:00* | 20:28 | +28 min | Matthew | cruzan el pueblo en silencio; perros que ladran, chicos que gritan y caras curiosas en las ventanas |
| 27 | 20:40* | 20:51 | +11 min | Matthew | rompe el silencio tras tres millas: «solo nos falta una milla»; Ana bautiza el Camino Blanco de las Delicias |
| 28 | 20:45* | 21:07 | +22 min | Ana | bautiza el Lago de las Aguas Brillantes; aún hay luz en una ventana de La Cuesta del Huerto; cruza el puente con los ojos cerrados |
| 29 | 20:55* | 21:18 | +23 min | Ana | adivina cuál es Tejas Verdes, bajo una gran estrella blanca; el sol ya se puso |
| 30 | 21:00* | 21:07 | +7 min | Rachel | ve pasar la calesa en la oscuridad |
| 31 | 21:05* | 21:26 | +21 min | Matthew | baja a Ana de la calesa; ella susurra que los árboles hablan en sueños; entran a la casa |
| 32 | 21:05* | 21:26 | +21 min | Marilla | sale al encuentro, ve a la niña de pelo rojo y pregunta dónde está el niño |

### Qué diferencias había y cómo se redujeron (agregando cosas)

| Diferencia en la primera simulación | Qué se agregó |
|---|---|
| Matthew no encontraba plan para ir a la estación (el viaje de 130 min hacía que el A\* probara todo lo demás antes) | la heurística de `estar_en` y `llevar` cuenta el camino largo (`roadMin`) |
| Matthew llegaba a la estación y se volvía solo (su rutina) antes de hablar con el jefe | las escenas escritas sujetan a quienes hablan (`hold`) |
| Rachel no lo veía pasar: sin nadie mirando, la calesa iba en línea recta | la calesa va siempre por los caminos (`netRoute`), pasando frente a la ventana de Rachel |
| la conversación con Marilla duraba más de una hora | cada escena tiene el tiempo que le da el libro (20 min); el resto queda para otra visita |
| Ana se bajaba sola del andén (su modo «hace lo suyo») | durante el capítulo espera a Matthew |
| la llegada (¿dónde está el niño?) quedaba en cola detrás de la charla del camino | al llegar a la puerta, la charla del viaje termina |
| (pedido) Rachel debía ir a Tejas Verdes apenas viera pasar a Matthew | se va de inmediato (15:28 en vez de 17:40, como en el libro): por eso esas filas difieren unas dos horas; vuelve a su casa a tomar el té y desde la ventana ve volver la calesa |
| el lago y «¿es ésa Tejas Verdes?» salían después de llegar | se dicen en el camino, en el orden del libro (colina → laguna → Tejas Verdes) |
| no había estación en el tren ni jefe de estación | el tren entra a las 17:30 y sigue a White Sands; el jefe de estación (nuevo personaje) |

Diferencias que quedan (de la geografía del juego, no del planificador): el camino entra a Avonlea por el noroeste, así que la última milla (20:31 → 21:03) pasa por la aldea y la hondonada de Lynde; Newbridge queda unos minutos antes que en el libro porque el tramo de «tres millas de silencio» es largo.

## 4. El camino de Bright River

No está en el mapa de Avonlea (en el borde noroeste hay solo un **letrero**, «Bright River · 8 millas»), pero se dibuja **igual que Avonlea**: desde arriba, con la misma acuarela, los mismos árboles, casas, cercas y puentes. Es una tierra aparte de 60.000 px de largo (Avonlea mide 7.680), con el camino rojo que serpentea de oeste (Bright River) a este (Avonlea), y lo que cuenta el capítulo II, tramo por tramo:

- **Bright River**: la estación con su andén (se entra al andén de la estación), el hotel con su patio (donde Matthew ata la yegua), la vía con su curva y **el gran cerezo silvestre** donde Ana pensaba dormir (también se ve desde el andén).
- **La cuesta de los cerezos silvestres**: el camino hundido entre barrancos de tierra roja más altos que la calesa, con cerezos en flor y abedules delgados.
- **Las granjas de los manzanos**: huertos en flor, graneros, cercas; **una señora en su carreta** viene en sentido contrario (Matthew la saluda: en la Isla se saluda a todos).
- **El bosquecillo de abetos**, **la hondonada de los ciruelos**, **la colina sobre el golfo** (se ve el mar), **las granjas de los arces**.
- **El aserradero del río**: el río con su puente, el aserradero, las pilas de troncos, la casa pobre con niños y ropa tendida.
- **Los campos arados**: un granjero sembrando a mano, vacas, cercas en zigzag.
- **La iglesia de la loma**: la iglesia blanca y su cementerio, casitas con lilas.
- **El puentecito de los sauces**, **la curva del atardecer**.
- **La Avenida**: el túnel de manzanos en flor, pegados al camino por los dos lados (los de adelante dejan un hueco suave alrededor de la calesa), pintado como una acuarela: flores blancas y hojas nuevas, ramas en flor en los bordes de la pantalla, pétalos que caen, un camino de pasto y una luz blanca y brumosa al fondo (Ana enmudece).
- **Newbridge**: casas a ambos lados, la tienda, perros y chicos (Ana y Matthew pasan en silencio).
- **Tres millas de silencio** y la entrada de Avonlea, con un mojón por milla y un letrero por tramo.

Se puede **ir en la calesa** (145 minutos del juego, como en el libro: unos 12 minutos reales a 1×; con el botón de la velocidad, a la derecha: **1× → 2× → 5× → 10× → 25× → 50×**), **bajarse** (moviendo a Ana: Matthew la espera; si se la deja quieta un rato, vuelve sola a la calesa), **subirse** («🐴 Subir a la calesa») o **ir a pie** (desde el letrero de Avonlea o saliendo del andén; son más de tres horas). Los personajes del planificador también lo recorren, en calesa o a pie. **🗺 La isla**: un mapa grande con solo los pueblos, los caminos y el tren, y dónde va Ana.

**El tiempo**: un minuto del juego dura **5 segundos** (una hora, 5 minutos; un día entero, 2 horas).

## 5. Cómo funcionan los diálogos: escenas

Todo diálogo escrito es una **escena** (una cápsula, autocontenida: un tema completo con principio y final) que se activa **por lugar y por estado**, no por la hora. Las escenas son pura configuración, leída por la clase genérica `Dialogo`: el formato completo, con ejemplos, está en [ESCENAS.md](ESCENAS.md). Cada escena dice:

- **quiénes** tienen que estar (y juntos: los dos en la calesa, los dos en la cocina…);
- **dónde**: el lugar (la Avenida, la laguna a la vista, frente al aserradero, la casa de los Bell…);
- **cuándo**, como estado: qué tiene que haber pasado o qué se sabe («Tejas Verdes» solo después de la laguna; el nombre de la Avenida solo si se pasó por ella; Rachel va donde Marilla solo después de ver pasar a Matthew);
- **prioridad**, y si puede **interrumpir** a una menos importante;
- si se dice **una vez** (para siempre) o **una vez al día**.

Un **director** las mira varias veces por segundo y, en cada canal (la calesa, la cocina, la estación, la ventana de Rachel…), pone la más importante que se pueda decir. Las escenas se dicen **completas**: ya no se cortan por tiempo.

Como en los juegos actuales:

- **Conversación o comentario.** Una conversación que otra más importante corta no se pierde. Sigue después donde quedó, con una frase puente («Bueno, como le decía…», «¿Dónde iba? ¡Ah, sí!»). Un comentario de Ana sobre lo que se ve sí se pierde si lo cortan, porque ya pasó el momento. Los comentarios van entre las conversaciones, uno por minuto como mucho.
- **Lo que está por terminar, termina.** Si a la escena que se dice le quedan dos líneas o menos, la que quiere interrumpir espera.
- **El ritmo del viaje.** Durante los momentos del capítulo y las escenas imprescindibles, Matthew lleva la yegua al paso (70 % de la velocidad), para que alcancen a decirse. Donde no se dice nada, en cambio, la deja trotar: en Newbridge va a 1,4 veces la velocidad, y en las tres millas de silencio a 1,9. Bajo las flores de la Avenida va más despacio, a 0,85. Así se dicen 15 de las 25 escenas del libro (antes, 13), todas las importantes, y la llegada queda solo unos 20 minutos después que en el libro.
- **El silencio no es un vacío.** Después de la Avenida, Ana calla como en el libro, pero cada tanto el guion muestra lo que se ve y lo que piensan:
  - los pétalos que le caen en el pelo;
  - Matthew que afloja las riendas;
  - las ventanas de Newbridge que se encienden;
  - la primera estrella;
  - las ranas;
  - Ana que murmura «Blanco… de las Delicias…», antes de bautizar la Avenida.
- **Junio.** Durante el capítulo el sol se pone una hora y media más tarde, así que la Avenida se ve con luz de atardecer.
- **Un guion fuera del código.** Las escenas del capítulo están escritas en un bloque de texto (`id="guion"`).
- **El panel 🎭 Escenas en 🎯.** Muestra qué se dice, qué podría decirse y por qué no se dice el resto.

Prioridades en el viaje:

| Prioridad | Escena |
|---|---|
| 10 (interrumpe) | **El túnel de manzanos** (la Avenida): corta lo que se estaba diciendo; Ana enmudece. |
| 9 (interrumpe) | El nombre de la Avenida y «solo nos falta una milla» (al llegar a Avonlea, si pasaron por ella); la laguna de Barry (con la laguna a la vista); «¿es ésa Tejas Verdes?» (después de la laguna). |
| 8 (interrumpe) | Newbridge, todavía en silencio. |
| 3.55 (al paso) | Los momentos del capítulo, en su orden: la rama de ciruelo, «puedes hablar todo lo que quieras», «¿de qué color diría que es esto?». |
| 3.5 (interrumpe el hilo) | Lo del libro que nombra algo, mientras está a la vista: el cerezo de la estación, los barrancos, los abetos, el mar, el aserradero, el granjero, la iglesia, las lilas, los sauces, la curva, la señora de la carreta. Corta el hilo de la charla (que se retoma después), no los momentos del capítulo. |
| 2.5 (al paso) | Las imprescindibles: los caminos rojos, los arbolitos del orfanato, «¿cómo es su hermana?». |
| 2 | Las demás escenas del libro (cada una un tema completo: el vestido blanco, el tren y el barco, los caminos rojos, los arbolitos del orfanato, Marilla, la yegua, el velero, «¿divinamente hermoso?»…), desde el tramo donde las pone el libro, en su orden. |
| 2.2 / 1 | Los comentarios de Ana (lo improvisado): sobre algo a la vista (entre conversación y conversación, uno por minuto como mucho), o sobre el tramo en que van. |
| 0 | Ocurrencias sueltas, cada medio minuto si no hay nada más. |

Lo que no alcanza a decirse en un viaje queda para el siguiente (el estado guarda qué se dijo). En la calesa y durante el capítulo no se cuelan frases sueltas ni saludos de los vecinos.

Las escenas del capítulo (Rachel en la ventana; Rachel y Marilla; Rachel y los Bell; la estación; la llegada) también son escenas, con su lugar y su estado: por ejemplo, la de la estación empieza cuando Matthew llega al andén y Ana ya bajó del tren, y al terminar Matthew sube a Ana a la calesa.

**Banco de diálogos para pares y tríos** (`DLG_BANK`): cuando dos personajes del planificador se encuentran (o tres), primero se busca un diálogo escrito para ellos que tenga sentido donde están (lo de la mesa en la cocina, el té adentro, el arroyo junto al arroyo); cada uno una vez. Después, saludos y chismes de plantilla. Con IA, las escenas cerca de Ana se generan.

Además, los **momentos del lugar** (`MAP.moments`: el campo rosado, el puente techado…) se dicen una vez al día al pasar.
