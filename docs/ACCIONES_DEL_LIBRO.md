# Las acciones del libro, capítulo a capítulo

Repaso de *Ana de las Tejas Verdes* (L. M. Montgomery, 1908; texto de Project Gutenberg) para encontrar **acciones nuevas** que los personajes del juego puedan planificar y hacer. Para cada uno de los 38 capítulos hay un resumen y la lista de acciones concretas que ocurren en él (quién hace qué), marcada así:

- `ya existe: …`: el juego ya tiene esa acción (ver el [catálogo](CATALOGO.md));
- `NUEVA: …`: una acción que todavía no existe.

En total hay **unas 340 apariciones** de acciones nuevas, con unos 190 nombres distintos, muchos de ellos sinónimos («lavar platos» y «lavar los platos», «coser» y «tejer»). Abajo están agrupadas en familias, con los capítulos donde aparecen y una propuesta de cuáles agregar primero.

## 1. Las familias de acciones nuevas

| Familia | Acciones (como aparecen en el libro) | Capítulos | Veces |
|---|---|---|---|
| **Quehaceres de la casa** | lavar los platos, barrer/limpiar/fregar, ordenar, poner la mesa, hacer la cama, doblar la ropa, planchar, atizar el fuego, encender la vela o la lámpara, servir la comida | 1, 3, 4, 7, 8, 10, 11, 14, 16, 17, 18, 19, 20, 21, 22, 27, 33, 37 | ~25 |
| **Costura y tejido** | coser (la colcha de retazos, los vestidos), tejer | 1, 11, 12, 13, 25, 29, 31, 34 | 8 |
| **Granja** | ordeñar, alimentar a los animales, hacer heno, sembrar/plantar/regar, partir leña, desgranar, enganchar/guardar el caballo | 1, 6, 10, 15, 21, 23, 28, 32, 37 | ~14 |
| **Viajar** | conducir la calesa, llevar a alguien, ir en tren, trineo, ir a buscar a alguien a la estación | 1, 2, 4, 5, 14, 18, 20, 31, 33, 34, 35 | ~13 |
| **Escuela y estudio** | estudiar, recitar, memorizar, leer, escribir (composiciones, cuentos del club), rendir examen, enseñar | 7, 11, 17, 18, 19, 24, 25, 26, 29, 30, 31, 32, 33, 34, 35, 36 | ~22 |
| **Visitas** | visitar, invitar, recibir visitas, tocar la puerta, presentar a alguien, saludar, despedirse | 1, 2, 8, 9, 12, 16, 17, 18, 21, 22, 23, 25, 29, 30, 32, 33, 34, 35, 36, 37 | ~25 |
| **Promesas y amistad** | prometer, jurar amistad, hacer las paces, perdonar, ofrecer amistad, abrazar/besar, tomar de la mano | 7, 10, 12, 13, 14, 16, 17, 23, 27, 28, 29, 30, 32, 34, 36, 38 | ~20 |
| **Mandar y corregir** | regañar, castigar, prohibir, pedir permiso, dar permiso, confiscar, advertir | 1, 6, 7, 8, 9, 12, 13, 14, 15, 16, 19, 26, 30 | ~18 |
| **Sentimientos** | consolar, felicitar, agradecer, llorar, burlarse, desafiar, rechazar (un regalo, una disculpa), confesar, guardar/contar un secreto | 3, 8, 10, 14, 15, 17, 19, 20, 21, 23, 27, 28, 31, 32, 36, 37, 38 | ~25 |
| **Objetos prestados y perdidos** | prestar, pedir prestado, devolver, encontrar, perder, esconder, guardar bajo llave, ponerse (una prenda o un broche) | 6, 12, 13, 14, 15, 18, 20, 21, 24, 25, 28, 30 | ~16 |
| **Adornar** | decorar, adornar (el sombrero con flores, el cuarto con ramas), poner flores (en la tumba de Matthew) | 8, 11, 16, 21, 24, 25, 33, 36, 38 | ~10 |
| **Lugares y aventuras** | nombrar un lugar (bautizarlo), cruzar el puente, explorar, remar, trepar (el techo de los Barry), patinar, ir de picnic | 2, 4, 9, 12, 13, 14, 15, 20, 23, 24, 28, 31 | ~15 |
| **Iglesia** | rezar, ir a la iglesia, predicar | 7, 11, 28, 31, 32, 37 | 6 |
| **Cuidar** | cuidar a un enfermo, buscar al médico, acompañar | 12, 16, 18, 23, 30, 35, 37, 38 | ~10 |
| **Mensajes** | enviar recado, escribir una carta o una nota, pasar una nota, leer el periódico, recoger el correo | 1, 15, 17, 24, 31, 32, 36, 37 | ~10 |
| **Eventos** | organizar (concierto, club de cuentos), ensayar, cantar, tocar música, actuar, asistir a una fiesta | 19, 20, 22, 24, 26, 28, 29, 33 | ~10 |

## 2. Propuesta: qué agregar primero

> **Las 17 ya están implementadas**, con una meta de prueba cada una: metas 26 a 43 del panel 🎯 (ver [trazas/metas.pdf](../trazas/metas.pdf) y el [catálogo](CATALOGO.md)). Diferencias con la propuesta:
> - El enfermo de las metas es el Sr. Harrison. Con jarabe de ipecacuana, Ana lo cuida ella misma; si no hay jarabe, va a buscar al médico (un personaje nuevo, en la aldea), que va a la granja y lo atiende. Minnie May ya está en el juego, pero sin el crup.
> - La calesa no usa la carreta de la estación: Matthew lleva a Ana sentada a su lado, 2,4 veces más rápido.

Elegidas por tres criterios: que aparezcan seguido en el libro, que tengan un **efecto claro sobre el estado** (para que el planificador pueda usarlas) y que encajen con lo que el juego ya tiene (lugares, cosas, personas).

| # | Acción | Del libro (capítulos) | Condición (cuándo se puede) | Efecto en el estado | Lo que hay que agregar |
|---|---|---|---|---|---|
| 1 | **lavar los platos** / **barrer** / **poner la mesa** | Marilla le enseña los quehaceres a Ana (3, 4, 8, 14, 19, 21, 22, 27) | en la cocina, después de comer | hecho del día `quehacer:x`; sube el cariño de Marilla | metas «Marilla quiere la cocina en orden»; tareas que Marilla encarga |
| 2 | **ordeñar** | Marilla y Matthew ordeñan las vacas detrás del granero (6, 10) | en el corral con la vaca, un balde | +leche (cosa nueva) | cosa `leche` (con receta: mantequilla); el balde en el granero |
| 3 | **alimentar a los animales** | el pastel fallido a los cerdos; la leche desnatada para los cerdos (21, 23) | en el corral o el gallinero | hecho del día; más huevos o leche al otro día | estado de los animales (alimentados) |
| 4 | **visitar** | la Sra. Lynde, las compañeras y la Srta. Stacy van a Tejas Verdes; Ana visita a la Sra. Allan y a la Srta. Barry (9, 23, 30, 34, 35, 36, 37) | llegar a la casa de alguien | estar con esa persona en su casa; +1 de cariño | meta `visitar(a, b)`; entrar a las casas |
| 5 | **prestar / devolver** | le prestan libros a Ana (el Quinto Libro, «Ben-Hur»), Ruby sus zapatillas, la Sra. Barry el chal (6, 12, 15, 18, 20, 21, 24, 28, 30) | tenerlo / tener lo prestado | la cosa pasa al otro con la marca «prestado»; devolverla sube el cariño | inventario con dueño (quién prestó qué) |
| 6 | **prometer / jurar amistad** | Ana y Diana juran ser amigas del alma (12); promesas de Ana a Marilla (7, 13, 17, 23, 27, 32, 36) | estar con la persona; cariño alto | hecho `amigas_del_alma:a>b`; romperla baja el cariño | metas de amistad; consecuencias de romperla |
| 7 | **perdonar / hacer las paces** | la Sra. Barry perdona a Ana (18); Ana y Gilbert (38) | que haya una ofensa y un gesto (disculpa, rescate) | borra la ofensa | completa a `disculparse`, que ya existe |
| 8 | **cuidar a un enfermo** + **buscar al médico** | Ana salva a Minnie May del crup (18); Marilla, Matthew (37) | alguien enfermo (ya existe `sick`); tener la medicina | el enfermo mejora; +mucho cariño de la familia | cosa `jarabe` (ipecacuana); el médico en Spencervale o Carmody |
| 9 | **estudiar / recitar** | en la escuela y en el concierto (7, 11, 17, 18, 24, 25, 29, 30, 31, 33, 34, 35, 36) | en la escuela o en casa con un libro | +«lección aprendida»; recitar en el concierto lo usa | completa `ir a clases`; meta de examen (Queen's) |
| 10 | **rezar** | Ana aprende a rezar (7); antes de dormir (11, 28, 31, 32, 37) | antes de dormir, o en la iglesia | hecho del día | rutina de la noche; ir a la iglesia el domingo |
| 11 | **coser** | la colcha de retazos, los vestidos (11, 12, 13, 25, 31, 34) | en casa, con tela | +prenda (vestido con mangas abullonadas, cap. 25) | cosa `tela` (en la tienda) y `vestido` (regalo) |
| 12 | **adornar con flores** | el sombrero de Ana en la iglesia (11); el cuarto (16); la tumba de Matthew (38) | tener un ramo | hecho; reacción de los demás (la Sra. Lynde se escandaliza) | usar el `ramo` que ya existe |
| 13 | **remar** | la doncella de los lirios, en el bote (28); el lago (14, 31) | en el lago, un bote | estar en el bote y en el agua (¡se hunde!) | el bote en el estanque de los Barry |
| 14 | **nombrar un lugar** | el Lago de las Aguas Brillantes, el Bosque Encantado (2, 4, 12, 13, 15, 20) | estar en un lugar sin nombre de Ana | el lugar queda con su nombre (en el mapa) | nombres de Ana en el mapa |
| 15 | **regañar / castigar** | Marilla con Ana (6, 7, 8, 9, 12, 14, 15, 26) | hubo una falta (ofensa, quehacer sin hacer) | Ana queda castigada (en su cuarto un rato) | el castigo como estado (como `quieto`) |
| 16 | **invitar a tomar el té** | Ana invita a Diana (16); la Sra. Allan invita a Ana (22) | ya existe la invitación para más tarde | — | invitar también a Diana, y servir el té en casa |
| 17 | **llevar en la calesa** | Matthew lleva a Ana desde la estación (2); a Carmody (25) | tener el caballo enganchado | ir más rápido con alguien | la calesa ya existe en el juego (el carro); usarla en los planes |

### Segunda tanda (también implementada)

| Acciones | Del libro (capítulos) | Lo nuevo que se agregó al juego |
|---|---|---|
| **escribir y mandar una carta**, **leer** un libro | Ana le escribe a la Srta. Stacy (36); los libros prestados (18, 30) | cosa `carta`; el correo, en la tienda de Lawson |
| **escribir un cuento** y **leerlo** en el club | el Club de Cuentos de Ana y Diana (26) | cosa `cuento` |
| **ensayar**, **recitar en el concierto**, **decorar la sala**, **felicitar** | los conciertos (19, 24, 33) | lugar: el salón del pueblo (el Ayuntamiento) |
| **consolar** | Diana, triste porque no puede ver a Ana (16) | — |
| **hacer heno**, **partir leña**, **batir mantequilla**, **sembrar y regar** | la granja (8, 13, 15, 28, 32) | cosas `heno`, `leña`, `mantequilla`; lugar: el campo de heno |
| **patinar**, **trineo** | el invierno en Avonlea | lugar: la colina |
| **pedir permiso**, **preparar la canasta**, **merendar** | el picnic de la escuela dominical, con helado (13, 14) | cosa `canasta`; sin permiso de Marilla, Ana no va |
| **teñirse el pelo** y **cortárselo** | el tinte del buhonero que deja el pelo verde (27) | cosa `tinte`; personaje nuevo: **el buhonero**, que va de casa en casa; el pelo de Ana se ve verde |
| **trepar** al techo de los Barry | el desafío de Josie Pye (23) | — |

## 3. Capítulo a capítulo

### Cap. 1 — La señora Rachel Lynde se sorprende (Mrs. Rachel Lynde is Surprised)
Rachel Lynde ve pasar a Matthew bien vestido en la calesa y va a Green Gables a averiguar adónde va; Marilla le cuenta que adoptarán a un niño huérfano. Rachel desaprueba la idea y se va a contar la noticia a los Bell.
- **Rachel** teje colchas junto a la ventana de su cocina (ya lleva dieciséis colchas «cotton warp») — `NUEVA: tejer`
- **Rachel** vigila el camino principal desde la ventana (nadie entra ni sale de Avonlea sin que ella lo vea) — `NUEVA: vigilar`
- **Thomas Lynde** siembra semilla tardía de nabo en el campo del cerro detrás del granero — `NUEVA: sembrar`
- **Matthew** conduce la calesa con la yegua alazana hacia Bright River, con cuello blanco y su mejor traje — `NUEVA: conducir la calesa`
- **Rachel** va a Green Gables después del té por el sendero bordeado de rosas silvestres — `ya existe: ir`
- **Rachel** golpea la puerta de la cocina y entra cuando la invitan — `NUEVA: tocar la puerta`
- **Marilla** barre el patio (según Rachel, tan seguido como barre la casa) — `NUEVA: barrer`
- **Marilla** teje sentada en la cocina, con la mesa puesta para tres (vajilla diaria, compota de manzana silvestre y un pastel) — `NUEVA: poner la mesa`
- **Marilla** le cuenta a Rachel que traerán un niño del orfanato de Nueva Escocia — `ya existe: conversar`
- **Los Cuthbert** mandaron recado a Mrs. Spencer por medio de la familia de Richard Spencer para que les trajera un niño — `NUEVA: enviar recado`
- **Mrs. Spencer** envía un telegrama que el cartero trae desde la estación — `NUEVA: enviar recado`
- **Rachel** advierte a Marilla de los peligros (niños que incendian la casa o envenenan el pozo) — `NUEVA: advertir`
- **Rachel** va a casa de Robert Bell a contar la noticia — `ya existe: conversar`

### Cap. 2 — Matthew Cuthbert se sorprende (Matthew Cuthbert is surprised)
Matthew llega a la estación de Bright River y encuentra a una niña en lugar del niño esperado; sin atreverse a decírselo, la lleva a casa mientras ella habla sin parar y pone nombres nuevos a los lugares del camino.
- **Matthew** saluda con la cabeza a las mujeres que encuentra en el camino (costumbre de la isla) — `NUEVA: saludar`
- **Matthew** ata el caballo en el patio del pequeño hotel de Bright River — `NUEVA: atar el caballo`
- **Matthew** le pregunta al jefe de estación si el tren de las 5:30 llegará pronto — `NUEVA: preguntar`
- **El jefe de estación** cierra la boletería y se va a cenar — `ya existe: ir`
- **Anne** espera sentada en un montón de tejuelas al final del andén (prefirió no entrar a la sala de espera) — `ya existe: quedarse en un lugar`
- **Anne** se pone de pie, saluda a Matthew y le tiende la mano — `NUEVA: saludar`
- **Anne** carga ella misma su vieja maleta de alfombra (conoce el truco para que no se salga el asa) — `ya existe: tomar`
- **Matthew** lleva a Anne en la calesa a Green Gables (8 millas) — `NUEVA: llevar a alguien`
- **Anne** arranca una rama de ciruelo silvestre que roza la calesa — `ya existe: recoger (flores)`
- **Anne** bautiza la Avenida como «el Camino Blanco del Deleite» y el estanque de Barry como «el Lago de las Aguas Resplandecientes» — `NUEVA: bautizar`
- **Matthew y Anne** cruzan el puente sobre el estanque (Anne cierra los ojos y los abre a la mitad) — `NUEVA: cruzar el puente`
- **Anne** le dice buenas noches al Lago de las Aguas Resplandecientes — `NUEVA: saludar`
- **Anne** adivina cuál es Green Gables y la señala desde la cima de la colina — `NUEVA: adivinar`
- **Matthew** baja a Anne de la calesa en el patio oscuro — `ya existe: ir`

### Cap. 3 — Marilla Cuthbert se sorprende (Marilla Cuthbert is Surprised)
Marilla descubre que trajeron a una niña por error; Anne llora desconsolada, dice su nombre y se va a dormir triste. Matthew insinúa que quiere quedarse con ella, pero Marilla decide devolverla.
- **Anne** deja caer la maleta, se sienta a la mesa y llora tormentosamente — `NUEVA: llorar`
- **Marilla** le pregunta su nombre a la niña (Anne pide que la llamen Cordelia, o al menos «Anne con E») — `NUEVA: preguntar`
- **Marilla** guarda el sombrero y la maleta de Anne en la mesa del vestíbulo — `ya existe: tomar`
- **Matthew** sale a guardar la yegua en el establo — `NUEVA: guardar la yegua`
- **Marilla, Matthew y Anne** se sientan a cenar (Anne apenas mordisquea el pan y la compota) — `NUEVA: comer`
- **Marilla** enciende una vela y lleva a Anne al cuarto del alero este — `NUEVA: encender la vela`
- **Anne** se desviste, se pone el camisón y se mete en la cama tapándose la cabeza — `NUEVA: acostarse`
- **Marilla** recoge la ropa de Anne del suelo y la dobla sobre una silla — `NUEVA: doblar la ropa`
- **Marilla** lava los platos de la cena — `NUEVA: lavar platos`
- **Matthew** fuma su pipa (señal de que está perturbado) — `NUEVA: fumar pipa`
- **Marilla y Matthew** discuten si devolver o no a la niña al orfanato — `NUEVA: discutir`
- **Matthew** propone contratar a un muchacho francés para que lo ayude y quedarse con Anne como compañía de Marilla — `ya existe: interceder`

### Cap. 4 — Mañana en Green Gables (Morning at Green Gables)
Anne despierta, se maravilla con el paisaje y ayuda en la casa; pone nombre al geranio y al cerezo. Por la tarde Marilla la lleva en la calesa a White Sands para devolverla, y Matthew le anuncia de pasada que contrató a Jerry Buote.
- **Anne** abre la ventana atascada de su cuarto y se arrodilla a contemplar el cerezo en flor — `NUEVA: abrir la ventana`
- **Anne** se viste, se lava la cara, se cepilla y trenza el pelo en diez minutos — `NUEVA: asearse`
- **Anne, Marilla y Matthew** desayunan en silencio — `NUEVA: comer`
- **Anne** se ofrece a lavar los platos y los lava con mucha agua caliente — `NUEVA: lavar platos`
- **Anne** hace la cama (lucha con el colchón de plumas) — `NUEVA: hacer la cama`
- **Anne** bautiza al geranio «Bonny» y al cerezo de su ventana «Reina de las Nieves» — `NUEVA: bautizar`
- **Marilla** baja al sótano a buscar papas — `ya existe: tomar`
- **Marilla** le pide a Matthew la yegua y la calesa para la tarde — `ya existe: pedir un favor`
- **Matthew** engancha la yegua alazana a la calesa — `NUEVA: enganchar la calesa`
- **Matthew** abre el portón del patio para que salgan — `NUEVA: abrir el portón`
- **Matthew** contrata a Jerry Buote, de la Caleta, para el verano — `NUEVA: contratar`
- **Marilla** azota a la yegua y conduce la calesa sendero abajo — `NUEVA: conducir la calesa`

### Cap. 5 — La historia de Anne (Anne's History)
Camino a White Sands por la carretera de la costa, Anne cuenta su vida: huérfana desde bebé, criada por la señora Thomas y la señora Hammond y luego enviada al orfanato. Marilla empieza a sentir lástima por ella.
- **Marilla y Anne** van en calesa por el camino de la costa hacia White Sands (5 millas) — `NUEVA: conducir la calesa`
- **Marilla** le pregunta a Anne dónde nació, qué edad tiene y si fue a la escuela — `NUEVA: preguntar`
- **Anne** cuenta su historia (padres maestros muertos de fiebre, casa de los Thomas, de los Hammond, orfanato) — `ya existe: conversar`
- **Anne** cuidaba a los cuatro niños Thomas y a los gemelos de la señora Hammond (los cargaba) — `NUEVA: cuidar niños`
- **Anne** iba a la escuela solo en primavera y otoño cuando vivía río arriba — `ya existe: quedarse en un lugar (ir a clases)`
- **Las chicas mayores** le prestaban a Anne su Quinto Libro de Lectura — `NUEVA: prestar un libro`
- **Mr. Thomas** alquiló un carro y llevó a la familia a pasar el día en la playa — `ya existe: dar un paseo`
- **Anne** señala la primera rosa silvestre y mira las gaviotas sobre el mar — `NUEVA: contemplar`
- **Marilla y Anne** pasan frente al Hotel White Sands — `ya existe: ir`

### Cap. 6 — Marilla se decide (Marilla Makes Up Her Mind)
En casa de Mrs. Spencer se aclara que el error fue del recado; aparece Mrs. Blewett dispuesta a llevarse a Anne como sirvienta, pero Marilla se compadece y la lleva de vuelta. Esa tarde, mientras ordeñan, Marilla le dice a Matthew que Anne puede quedarse.
- **Mrs. Spencer** sale a la puerta a recibir a Marilla y Anne — `NUEVA: recibir visita`
- **Marilla** explica a Mrs. Spencer el error del recado (pidieron un niño) — `ya existe: conversar`
- **Mrs. Spencer** le pregunta a su hija Flora Jane para confirmar lo que dijo Nancy — `NUEVA: preguntar`
- **Mrs. Spencer** presenta a Mrs. Blewett y a Miss Cuthbert en la sala — `NUEVA: presentar`
- **Flora Jane** pone a hervir la tetera y saca los bollos del horno (por encargo de su madre) — `ya existe: cocinar (té)`
- **Mrs. Blewett** interroga a Anne (nombre y edad) y ofrece llevársela de inmediato para que trabaje — `NUEVA: preguntar`
- **Marilla** se niega a entregarla y decide llevar a Anne de vuelta para consultarlo con Matthew — `ya existe: interceder`
- **Mrs. Blewett** sale con Mrs. Spencer a buscar una receta que vino a pedir prestada — `NUEVA: pedir prestado`
- **Marilla** reprende a Anne por decir que Mrs. Blewett parece un berbiquí — `NUEVA: regañar`
- **Matthew** espera en el sendero rondando a que vuelvan — `ya existe: quedarse en un lugar`
- **Marilla y Matthew** ordeñan las vacas en el patio detrás del granero — `NUEVA: ordeñar`
- **Marilla** le cuenta a Matthew la historia de Anne y la visita a Mrs. Spencer — `ya existe: conversar`
- **Marilla** decide que Anne se queda en Green Gables — `NUEVA: adoptar`
- **Marilla** lleva los baldes a la lechería y cuela la leche en las cremeras — `NUEVA: colar la leche`

### Cap. 7 — Anne reza sus oraciones (Anne Says Her Prayers)
Al acostarla, Marilla descubre que Anne nunca ha rezado; le pide que rece por sí misma y Anne improvisa una oración insólita. Marilla decide comenzar su educación religiosa.
- **Marilla** le ordena a Anne doblar la ropa en la silla al desvestirse — `NUEVA: regañar`
- **Anne** dobla su ropa ordenadamente sobre la silla — `NUEVA: doblar la ropa`
- **Anne** recita de memoria la definición de Dios del catecismo — `NUEVA: recitar`
- **Anne** se arrodilla junto a Marilla y reza su primera oración (agradece el Camino Blanco, el Lago, Bonny y la Reina de las Nieves; pide quedarse y ser bonita) — `NUEVA: rezar`
- **Anne** promete hacerlo lo mejor posible e inventar una oración bonita en la cama — `NUEVA: prometer`
- **Marilla** arropa a Anne en la cama — `NUEVA: arropar`
- **Marilla** se lleva la vela y le da las buenas noches — `ya existe: tomar`
- **Marilla** le cuenta a Matthew que Anne nunca había rezado — `ya existe: conversar`

### Cap. 8 — Comienza la educación de Anne (Anne's Bringing-up Is Begun)
Marilla le anuncia a Anne que se queda en Green Gables y la pone a aprender el Padrenuestro. Anne pregunta por una amiga del alma y Marilla le habla de Diana Barry.
- **Anne** hace tareas durante la mañana bajo la vigilancia de Marilla y lava los platos del almuerzo — `NUEVA: lavar platos`
- **Anne** escalda el paño de cocina en agua limpia y caliente (por orden de Marilla) — `NUEVA: escaldar el paño`
- **Marilla** le anuncia a Anne que se quedará en Green Gables — `ya existe: conversar`
- **Anne** llora de felicidad sin saber por qué — `NUEVA: llorar`
- **Anne** va a la sala a buscar la tarjeta con el Padrenuestro de la repisa — `ya existe: tomar`
- **Anne** se queda absorta mirando el cuadro «Cristo bendiciendo a los niños» — `NUEVA: contemplar`
- **Anne** había traído flores de manzano en una jarra para decorar la mesa del almuerzo — `NUEVA: decorar`
- **Anne** aprende de memoria el Padrenuestro (termina la última línea subiendo la escalera) — `NUEVA: memorizar`
- **Marilla** le habla de Diana Barry, que está de visita donde su tía en Carmody — `ya existe: conversar`
- **Marilla** manda a Anne a su cuarto a terminar de aprender la oración — `NUEVA: castigar`
- **Anne** se mira en el espejo y besa su reflejo — `NUEVA: contemplar`
- **Anne** saluda desde la ventana a la Reina de las Nieves, los abedules y la casa gris de la colina, y les manda besos — `NUEVA: saludar`

### Cap. 9 — La señora Rachel Lynde se horroriza como corresponde (Mrs. Rachel Lynde Is Properly Horrified)
Tras dos semanas, Rachel visita Green Gables y critica el aspecto de Anne; ella estalla de rabia y la insulta. Marilla castiga a Anne encerrándola hasta que acepte pedir perdón.
- **Anne** explora el sendero bajo el huerto, el bosque, el manantial de la hondonada y el cerro de abetos — `NUEVA: explorar`
- **Anne** cruza el puente de troncos sobre el arroyo — `NUEVA: cruzar el puente`
- **Anne** les cuenta sus descubrimientos a Matthew y Marilla hasta dejarlos medio sordos — `ya existe: conversar`
- **Anne** pasea por el huerto entre la hierba al atardecer — `ya existe: dar un paseo`
- **Rachel** visita Green Gables apenas el médico la deja salir tras la gripe — `NUEVA: visitar`
- **Rachel** le cuenta a Marilla todos los detalles de su enfermedad — `ya existe: conversar`
- **Marilla** llama a Anne para que entre a conocer a Rachel — `ya existe: llamar a alguien a distancia`
- **Rachel** critica a Anne: flaca, fea, pecosa y «pelo color zanahoria» — `NUEVA: criticar`
- **Anne** patalea y le grita a Rachel «¡la odio!», y la llama gorda, torpe y sin imaginación — `NUEVA: enfurecerse`
- **Anne** sale corriendo y da un portazo en el vestíbulo y otro en su cuarto — `NUEVA: enfurecerse`
- **Marilla** le dice a Rachel que no debió burlarse del aspecto de Anne — `ya existe: interceder`
- **Rachel** aconseja castigar a Anne con una vara de abedul y se va ofendida — `NUEVA: advertir`
- **Marilla** sube al cuarto y regaña a Anne por su mal genio — `NUEVA: regañar`
- **Marilla** le exige que pida perdón a Rachel y la deja encerrada en su cuarto hasta que acepte — `NUEVA: castigar`

### Cap. 10 — La disculpa de Anne (Anne's Apology)
Anne sigue encerrada hasta que Matthew sube a escondidas y la convence de disculparse; Anne se disculpa de rodillas con gran dramatismo y Rachel la perdona. Vuelven a casa de la mano.
- **Marilla** le cuenta a Matthew todo el incidente — `ya existe: conversar`
- **Marilla** lleva una bandeja con comida al cuarto de Anne en cada comida — `ya existe: dar`
- **Marilla** va a traer las vacas del potrero del fondo — `ya existe: guiar vaca`
- **Matthew** sube a escondidas, golpea la puerta del alero este con los dedos y entra — `NUEVA: tocar la puerta`
- **Matthew** convence a Anne de disculparse con Rachel «para suavizar las cosas» — `NUEVA: persuadir`
- **Anne** promete no revelar que Matthew intervino («ni caballos salvajes me arrancarán el secreto») — `NUEVA: guardar un secreto`
- **Matthew** huye al rincón más lejano del potrero de caballos para que Marilla no sospeche — `NUEVA: esconderse`
- **Anne** llama a Marilla desde la baranda de la escalera y le dice que se arrepiente — `ya existe: llamar a alguien a distancia`
- **Marilla** ordeña antes de llevar a Anne donde Rachel («te llevo después de ordeñar») — `NUEVA: ordeñar`
- **Marilla y Anne** caminan por el sendero hasta la casa de Rachel al atardecer — `ya existe: ir`
- **Anne** se arrodilla ante Rachel y le pide perdón con un discurso dramático — `ya existe: disculparse`
- **Rachel** perdona a Anne y le da esperanza de que su pelo se vuelva castaño rojizo — `NUEVA: perdonar`
- **Anne** se sienta en el banco bajo los manzanos del jardín de Rachel — `ya existe: quedarse en un lugar`
- **Anne** recoge un ramo de lirios/narcisos blancos con permiso de Rachel — `ya existe: recoger (flores)`
- **Rachel** enciende una lámpara y le ofrece a Marilla una silla más cómoda — `NUEVA: encender la vela`
- **Anne** toma de la mano a Marilla al volver por el sendero a Green Gables — `NUEVA: tomar de la mano`

### Cap. 11 — Las impresiones de Anne sobre la escuela dominical (Anne's Impressions of Sunday-School)
Marilla le cose tres vestidos sencillos a Anne (sin mangas abullonadas) y, por una jaqueca, la manda sola a la escuela dominical; Anne adorna su sombrero con flores silvestres, asiste a la clase de la señorita Rogerson y se queda al sermón.
- **Marilla** cose tres vestidos para Anne (algodón, satén y estampado comprados a un buhonero y en Carmody) — `NUEVA: coser`
- **Marilla** le ordena colgar los vestidos y estudiar la lección dominical (con un cuadernillo que le consiguió del señor Bell) — `NUEVA: ordenar`
- **Anne** cuelga los vestidos en el armario y aprende la lección — `NUEVA: estudiar`
- **Marilla** le da a Anne un centavo para la colecta — `ya existe: dar/regalar`
- **Anne** recoge ranúnculos y rosas silvestres en el sendero — `ya existe: recoger (flores/ramo)`
- **Anne** adorna su sombrero con una guirnalda de esas flores — `NUEVA: adornar`
- **Anne** va a casa de la señora Lynde a buscarla y, al no encontrarla, sigue sola hasta la iglesia — `ya existe: ir`
- **Anne** asiste a la clase dominical y responde las preguntas de la señorita Rogerson — `ya existe: quedarse en un lugar (ir a clases)`
- **Anne** ofrece recitar «El perro en la tumba de su amo»; la maestra le encarga aprender la paráfrasis diecinueve — `NUEVA: recitar`
- **Anne** le pide a la señorita Rogerson que le muestre el banco de los Cuthbert y se queda al sermón — `ya existe: pedir un favor`
- **Anne** reza en voz baja («Gracias por esto, Dios») mirando el Lago de las Aguas Resplandecientes — `NUEVA: rezar`
- **Anne** tira en el sendero la guirnalda marchita al volver — `NUEVA: desechar (tirar algo)`
- **Anne** le cuenta a Marilla cómo le fue en la escuela dominical — `ya existe: conversar`

### Cap. 12 — Un voto y una promesa solemnes (A Solemn Vow and Promise)
Marilla regaña a Anne por el sombrero de flores y luego la lleva a Orchard Slope, donde conoce a Diana Barry y ambas juran ser amigas del alma; Matthew le trae chocolates de Carmody.
- **Marilla** vuelve de casa de la señora Lynde y regaña a Anne por el sombrero adornado con flores — `NUEVA: regañar`
- **Anne** dobladilla un paño de cocina — `NUEVA: coser`
- **Marilla** va a casa de la señora Barry a pedir prestado un patrón de falda — `NUEVA: pedir prestado`
- **Marilla y Anne** cruzan el arroyo y el bosquecillo de abetos hasta Orchard Slope y llaman a la puerta de la cocina — `ya existe: ir`
- **Marilla** le presenta Anne a la señora Barry, y la señora Barry le presenta a Diana — `NUEVA: presentar a alguien`
- **Diana** le muestra a Anne las flores del jardín de los Barry — `ya existe: dar un paseo hasta un lugar bonito`
- **Anne y Diana** se toman de las manos sobre el sendero y juran ser amigas del alma «mientras duren el sol y la luna» — `NUEVA: jurar amistad`
- **Diana** acompaña a Marilla y a Anne hasta el puente de troncos, abrazadas — `NUEVA: acompañar`
- **Anne y Diana** se prometen pasar juntas la tarde siguiente — `NUEVA: prometer`
- **Anne** pide los trozos de loza rota del leñero para la casita de juegos que construirá con Diana en el bosque de abedules — `NUEVA: construir`
- **Diana** promete prestarle un libro a Anne y enseñarle la canción «Nelly in the Hazel Dell» — `NUEVA: prestar`
- **Anne y Diana** bautizan el manantial junto al puente como la «Burbuja de la Dríade» — `NUEVA: nombrar un lugar`
- **Matthew** compra chocolates en la tienda de Carmody — `ya existe: comprar`
- **Matthew** le regala los chocolates a Anne — `ya existe: dar/regalar`
- **Anne** decide darle la mitad de los chocolates a Diana — `ya existe: dar/regalar`

### Cap. 13 — Las delicias de la espera (The Delights of Anticipation)
Anne se entretiene con Diana y con Matthew y llega tarde a coser; pide permiso para ir al picnic de la escuela dominical, Marilla promete prepararle una canasta y Anne admira el broche de amatista de Marilla.
- **Marilla** golpea la ventana y llama a Anne, que estaba en la leñera conversando con Matthew — `ya existe: llamar a alguien a distancia`
- **Anne** le cuenta a Matthew la noticia del picnic — `ya existe: conversar`
- **Anne** pide permiso para ir al picnic de la escuela dominical en el campo del señor Harmon Andrews — `NUEVA: pedir permiso`
- **Marilla** promete prepararle una canasta con cosas al horno para el picnic — `ya existe: cocinar`
- **Anne** se lanza a los brazos de Marilla y la besa en la mejilla — `NUEVA: besar/abrazar`
- **Anne** cose su cuadrado de patchwork antes del té (y un cuadrado extra el sábado lluvioso) — `NUEVA: coser`
- **Anne y Diana** arreglan su casita de juegos «Idlewild» con piedras musgosas como asientos, tablas como repisas y loza rota — `NUEVA: construir`
- **Anne** bautiza la casita «Idlewild» y la laguna del campo de los Barry «Willowmere» — `NUEVA: nombrar un lugar`
- **Diana** encuentra el «vidrio de las hadas» en el bosque, detrás del gallinero — `NUEVA: encontrar`
- **Matthew** promete hacerles una mesa para la casita — `NUEVA: prometer`
- **Anne** guarda silencio diez minutos porque Marilla se lo pidió — `ya existe: pedir un favor`
- **Anne y Marilla** vuelven de la iglesia, donde el ministro anunció el picnic — `ya existe: quedarse en un lugar`
- **Marilla** se pone su broche de amatista para ir a la iglesia — `NUEVA: ponerse (prenda/joya)`

### Cap. 14 — La confesión de Anne (Anne's Confession)
El broche de amatista desaparece; Marilla cree que Anne lo perdió y la encierra hasta que confiese; Anne inventa una confesión para ir al picnic, pero Marilla encuentra el broche enganchado en su chal, le pide perdón y la manda al picnic.
- **Anne** desgrana arvejas en la mesa mientras canta — `NUEVA: desgranar`
- **Anne** entra al cuarto de Marilla y se prueba el broche de amatista — `NUEVA: ponerse (prenda/joya)`
- **Marilla** busca el broche por todo su cuarto, corre la cómoda y saca los cajones — `NUEVA: buscar`
- **Marilla** acusa a Anne de mentir y la manda a su cuarto hasta que confiese — `NUEVA: castigar`
- **Marilla** le cuenta a Matthew lo del broche — `ya existe: conversar`
- **Marilla** le sube el desayuno a Anne en una bandeja — `ya existe: dar/regalar`
- **Anne** inventa una confesión: dice que lo dejó caer desde el puente al Lago de las Aguas Resplandecientes — `NUEVA: confesar`
- **Marilla** le prohíbe a Anne ir al picnic como castigo — `NUEVA: prohibir`
- **Marilla** friega el piso del porche y las repisas de la lechería y luego rastrilla el patio — `NUEVA: limpiar (fregar/barrer/rastrillar)`
- **Matthew** intercede por Anne durante la cena — `ya existe: interceder`
- **Marilla** lava los platos, deja leudando el pan y alimenta a las gallinas — `NUEVA: lavar platos`
- **Marilla** saca su chal de encaje para remendarlo y encuentra el broche enganchado — `NUEVA: encontrar`
- **Marilla** reconoce su error y propone «perdonarse mutuamente y empezar de nuevo» — `NUEVA: hacer las paces`
- **Marilla** prepara una canasta y pide que Jerry enganche la yegua alazana y lleve a Anne al picnic — `NUEVA: enganchar el caballo / llevar en carro`
- **El señor Harmon Andrews** lleva a los niños a remar por el lago; Jane Andrews casi se cae al agua por recoger nenúfares — `NUEVA: remar`

### Cap. 15 — Tormenta en la escuela (A Tempest in the School Teapot)
Anne empieza la escuela; Gilbert Blythe le dice «¡Zanahorias!» y Anne le rompe la pizarra en la cabeza; al día siguiente el maestro la castiga sentándola con Gilbert y Anne se niega a volver a la escuela; Marilla le pide consejo a la señora Lynde.
- **Anne y Diana** van a la escuela por el Sendero de los Enamorados, Willowmere, el Valle de las Violetas y el Sendero de los Abedules — `ya existe: ir`
- **Anne** bautiza el Sendero de los Enamorados y el Valle de las Violetas, y Diana el Sendero de los Abedules — `NUEVA: nombrar un lugar`
- **Las niñas** ponen sus botellas de leche en el arroyo y reparten sus almuerzos (las tartas de frambuesa de Diana) — `NUEVA: compartir comida`
- **Ruby Gillis** le regala una manzana a Anne; **Sophia Sloane** le presta una tarjeta y **Tillie Boulter** su anillo de cuentas — `NUEVA: prestar`
- **Gilbert** toma la trenza de Anne y le dice «¡Zanahorias!» — `NUEVA: burlarse`
- **Anne** le rompe la pizarra en la cabeza a Gilbert — `NUEVA: golpear`
- **El señor Phillips** pone a Anne de pie frente al pizarrón y escribe «Ann Shirley tiene muy mal genio» — `NUEVA: castigar`
- **Gilbert** le pide perdón a Anne en la puerta del porche; ella pasa de largo sin mirarlo — `ya existe: disculparse`
- **Anne** ignora a Gilbert cuando se lo cruza en el camino y en la escuela dominical — `NUEVA: desairar`
- **Los alumnos** van al bosquecillo de abetos del señor Bell a juntar resina de abeto — `ya existe: recoger (resina de abeto)`
- **Anne** vuelve corriendo a la escuela con una corona de lirios en el pelo y llega tarde — `NUEVA: correr`
- **El señor Phillips** castiga a Anne sentándola con Gilbert — `NUEVA: castigar`
- **Gilbert** desliza un corazón de caramelo («Eres dulce») bajo el brazo de Anne; ella lo tira al piso y lo pisotea — `NUEVA: rechazar un regalo`
- **Anne** saca sus libros del pupitre y deja la escuela — `NUEVA: abandonar la escuela`
- **Marilla** va a casa de la señora Lynde a pedirle consejo (la encuentra tejiendo colchas) — `NUEVA: pedir consejo`

### Cap. 16 — Diana es invitada a tomar el té, con trágicas consecuencias (Diana Is Invited to Tea with Tragic Results)
Marilla deja que Anne invite a Diana a tomar el té; Anne le sirve por error vino de grosella en vez de cordial de frambuesa, Diana se emborracha y la señora Barry le prohíbe volver a ver a Anne pese a sus disculpas.
- **Anne** junta ramas de arce y adorna su cuarto con ellas en la jarra azul — `NUEVA: adornar`
- **Marilla** le da permiso a Anne para invitar a Diana a tomar el té — `NUEVA: pedir permiso`
- **Anne** baja corriendo a Orchard Slope a invitar a Diana a tomar el té — `ya existe: pedir un favor (invitar)`
- **Diana** llama a la puerta principal y **Anne** la recibe con un apretón de manos y la lleva a dejar el sombrero — `NUEVA: recibir visitas`
- **Anne y Diana** recogen y comen manzanas Red Sweeting en el huerto — `ya existe: recoger (manzanas)`
- **Diana** le cuenta a Anne los chismes de la escuela — `ya existe: conversar`
- **Anne** busca la botella en la despensa y le sirve a Diana lo que cree que es cordial de frambuesa (tres vasos) — `NUEVA: servir (comida/bebida)`
- **Anne** sale a la cocina a atizar el fuego — `NUEVA: atizar el fuego`
- **Diana**, mareada, insiste en irse a su casa; **Anne** la acompaña hasta la cerca de los Barry — `NUEVA: acompañar`
- **Anne** guarda la botella en la despensa y prepara el té para Matthew y Jerry — `ya existe: cocinar (té)`
- **Marilla** manda a Anne a casa de la señora Lynde a hacer un encargo — `ya existe: pedir un favor (traer algo)`
- **Marilla** va a Orchard Slope a explicarle a la señora Barry que fue un error — `ya existe: interceder`
- **Anne** va sola de noche a pedirle perdón a la señora Barry — `ya existe: disculparse`
- **La señora Barry** le prohíbe a Diana juntarse con Anne y le cierra la puerta — `NUEVA: prohibir`
- **Marilla** besa en la mejilla a Anne, que se durmió llorando — `NUEVA: besar/abrazar`

### Cap. 17 — Un nuevo interés en la vida (A New Interest in Life)
Diana se despide de Anne junto al manantial y le da un mechón de pelo; Anne vuelve a la escuela, recibe regalos de sus compañeros, se escribe notas con Diana y compite con Gilbert en los estudios.
- **Diana** le hace señas a Anne desde la Burbuja de la Dríade — `ya existe: llamar a alguien a distancia`
- **Diana** convence a su madre de que la deje ir diez minutos a despedirse — `ya existe: pedir un favor`
- **Anne y Diana** se prometen no olvidarse nunca y se dicen que se quieren — `NUEVA: prometer`
- **Anne** le corta un rizo a Diana con las tijeras de patchwork, como recuerdo — `NUEVA: cortar un mechón`
- **Anne** se despide de Diana con la mano hasta perderla de vista — `NUEVA: despedirse`
- **Anne** vuelve a la escuela con su canasta de libros (dando la vuelta por el camino) — `ya existe: quedarse en un lugar (ir a clases)`
- **Ruby Gillis, Ella May, Katie Boulter y Julia Bell** le regalan a Anne ciruelas, un pensamiento de papel, un frasco y un poema — `ya existe: dar/regalar`
- **Sophia Sloane** se ofrece a enseñarle a Anne un punto nuevo de encaje tejido — `NUEVA: enseñar`
- **Anne** deja caer la manzana que le regaló Gilbert y se limpia los dedos; acepta el lápiz de Charlie Sloane con una sonrisa — `NUEVA: rechazar un regalo`
- **Timothy Andrews** barre la escuela, enciende el fuego y se queda con la manzana — `NUEVA: limpiar (fregar/barrer/rastrillar)`
- **Diana** le pasa a Anne una nota y un marcapáginas de papel de seda rojo — `NUEVA: escribir una nota`
- **Anne** besa el marcapáginas y le contesta a Diana con otra nota — `NUEVA: escribir una nota`
- **Anne** estudia decimales toda la noche para ganarle a Gilbert — `NUEVA: estudiar`
- **Gilbert** felicita a Anne delante de toda la escuela por superarlo en el examen — `NUEVA: felicitar`

### Cap. 18 — Anne al rescate (Anne to the Rescue)
Mientras Marilla viaja a Charlottetown a ver al Primer Ministro, Minnie May, la hermanita de Diana, se enferma de crup; Anne la cuida toda la noche y le salva la vida, y la señora Barry le pide perdón y la invita de nuevo.
- **Anne** estudia geometría mientras Matthew lee el periódico — `NUEVA: estudiar`
- **Anne** encierra el libro que le prestó Jane en el armario de las mermeladas y le da la llave a Matthew — `NUEVA: guardar bajo llave`
- **Anne** baja al sótano a buscar manzanas russet para Matthew — `ya existe: tomar`
- **Diana** llega corriendo a pedirle ayuda a Anne porque Minnie May tiene crup — `ya existe: pedir un favor`
- **Matthew** engancha la yegua alazana y sale a buscar al médico (llega hasta Spencervale) — `NUEVA: enganchar el caballo / llevar en carro`
- **Anne** toma el frasco de ipecacuana y va con Diana por el Sendero de los Enamorados — `ya existe: tomar`
- **Anne** llena la tetera y **Mary Joe** echa leña a la estufa y calienta agua — `NUEVA: atizar el fuego`
- **Anne** desviste a Minnie May, la acuesta y le da dosis de ipecacuana toda la noche — `NUEVA: cuidar a un enfermo`
- **Anne** le cuenta al médico lo que pasó — `ya existe: conversar`
- **Anne** se va a dormir hasta la tarde y **Matthew** se ocupa de las tareas de la granja — `NUEVA: dormir`
- **La señora Barry** va a Green Gables a pedir perdón y a invitar a Anne — `ya existe: disculparse`
- **Diana** le enseña a Anne un punto de crochet y juran no revelárselo a nadie — `NUEVA: enseñar`
- **Diana** le regala a Anne una tarjeta con una corona de rosas — `ya existe: dar/regalar`
- **Anne y Diana** hacen caramelo de melaza (Anne lo quema y el gato pisa un plato) — `ya existe: cocinar`
- **Diana** le tira besos a Anne desde la ventana — `NUEVA: despedirse`

### Cap. 19 — Un concierto, una catástrofe y una confesión (A Concert, a Catastrophe and a Confession)
Gracias a la insistencia de Matthew, Anne va al concierto del Club de Debate con Diana; al volver, saltan sobre la cama del cuarto de huéspedes y caen encima de la tía Josephine Barry, y Anne se gana su perdón y su amistad confesando.
- **Diana** le hace a Anne cinco destellos con una vela y un cartón desde su ventana («ven, tengo algo importante que contarte») — `NUEVA: hacer señales con vela`
- **Anne** pide permiso para ir al concierto y dormir en casa de Diana; Marilla se lo niega — `NUEVA: pedir permiso`
- **Matthew** insiste ante Marilla hasta que deja ir a Anne — `ya existe: interceder`
- **Anne** lava los platos del desayuno y friega con arena las manchas de grasa del piso — `NUEVA: lavar platos`
- **Anne y Diana** se peinan mutuamente (Diana le hace a Anne un pompadour y Anne le ata los lazos a Diana) — `NUEVA: arreglarse`
- **Los Murray, Anne y Diana** viajan en el trineo grande hasta el salón — `NUEVA: viajar en trineo`
- **Anne** ve el concierto (Prissy recita, canta el coro, el señor Phillips declama) — `ya existe: quedarse en un lugar`
- **Anne** lee un libro prestado mientras Gilbert recita; **Diana** le aplaude a Gilbert — `NUEVA: leer`
- **Anne y Diana** hacen una carrera hasta la cama del cuarto de huéspedes y saltan encima de la tía Josephine — `NUEVA: correr`
- **Anne** va a casa de la señora Lynde a hacer un encargo y se entera del enojo de la señorita Barry — `ya existe: pedir un favor (traer algo)`
- **Anne** llama a la puerta y le confiesa a la señorita Josephine Barry que la culpa fue suya — `NUEVA: confesar`
- **Anne** le pide a la señorita Barry que perdone a Diana y le pague las clases de música — `ya existe: interceder`
- **La señorita Barry** le regala a Diana una pulsera de plata y deshace su maleta para quedarse — `ya existe: dar/regalar`
- **La señorita Barry** invita a Anne a visitarla en la ciudad y dormir en su cuarto de huéspedes — `ya existe: pedir un favor (invitar para más tarde)`

### Cap. 20 — Una buena imaginación que se descarrila (A Good Imagination Gone Wrong)
En primavera los niños recogen flores de mayo; un año después de su llegada, Marilla manda a Anne a buscar un patrón de delantal y la obliga a cruzar el «Bosque Embrujado» que Anne y Diana inventaron, lo que la cura de imaginar fantasmas.
- **Los escolares** recogen flores de mayo en los páramos detrás de la casa del señor Silas Sloane — `ya existe: recoger (flores/ramo)`
- **Los escolares** almuerzan en una hondonada musgosa junto a un pozo viejo — `NUEVA: compartir comida`
- **Charlie Sloane** desafía a Arty Gillis a saltar el pozo, y Arty lo salta — `NUEVA: desafiar`
- **El señor Phillips** le regala sus flores de mayo a Prissy Andrews — `ya existe: dar/regalar`
- **Anne** rechaza las flores que le ofrece «cierta persona» (Gilbert) — `NUEVA: rechazar un regalo`
- **Los escolares** se hacen coronas de flores para los sombreros y desfilan de dos en dos cantando «My Home on the Hill» — `NUEVA: cantar`
- **Marilla** plancha y le sube a Anne sus delantales de escuela — `NUEVA: planchar`
- **Anne** almidona por error los pañuelos de Matthew y quema un pastel olvidado en el horno — `ya existe: cocinar`
- **Anne y Diana** descubren una isla en el arroyo y la llaman Isla Victoria — `NUEVA: nombrar un lugar`
- **Marilla** manda a Anne a pedirle a la señora Barry el patrón del delantal de Diana — `ya existe: pedir un favor (traer algo)`
- **Marilla** obliga a Anne a cruzar el bosque de abetos («Bosque Embrujado») como lección — `NUEVA: ordenar`
- **Anne** cruza el puente de troncos y el bosque embrujado, y atraviesa corriendo el campo del señor William Bell — `NUEVA: cruzar`
- **Anne** pide prestado el patrón en la puerta de la cocina de los Barry — `NUEVA: pedir prestado`
- **Anne** vuelve por el bosque con los ojos cerrados — `ya existe: ir`

### Cap. 21 — Un nuevo rumbo en los saborizantes (A New Departure in Flavorings)
Se va el señor Phillips y llegan el nuevo pastor, el señor Allan, y su esposa. Marilla los invita a tomar el té, y el pastel que Anne prepara para la señora Allan sale con sabor a linimento anodino en vez de vainilla.
- **Marilla** va a casa de la señora Lynde a devolver los bastidores de acolchar que le había pedido prestados (y así ve al nuevo pastor) — `NUEVA: devolver`
- **Anne** va a la escuela dominical y le hace muchas preguntas a la señora Allan, su nueva maestra — `ya existe: quedarse en un lugar (ir a clases)`
- **Marilla** decide invitar al señor y la señora Allan a tomar el té el miércoles — `NUEVA: invitar`
- **Anne** promete guardar el secreto de la visita para que Matthew no se escape — `NUEVA: guardar un secreto`
- **Anne** le pide permiso a Marilla para hacer un pastel para la señora Allan — `ya existe: pedir un favor`
- **Anne** y **Diana** se sientan junto a la Burbuja de la Dríade y conversan sobre los preparativos — `ya existe: conversar`
- **Anne** prepara el pastel de capas, lo mete al horno y lo rellena con jalea — `ya existe: cocinar (tarta)`
- **Anne** decora la mesa del té con helechos y rosas silvestres — `NUEVA: decorar`
- **Anne** convence a Matthew de que se quede a la merienda con su mejor ropa — `ya existe: interceder` (o pedir un favor: pasear/quedarse)
- **Marilla** prueba el pastel y descubre el error — `NUEVA: probar (comida)`
- **Anne** va a la despensa a buscar la botella de "vainilla" y se la trae a Marilla — `ya existe: tomar` + `dar`
- **La señora Allan** sube al cuarto de Anne y la consuela — `NUEVA: consolar`
- **Anne** le muestra a la señora Allan su jardín de flores — `NUEVA: mostrar`
- **Anne** se ofrece a lavar los platos cuando se vayan las visitas — `NUEVA: lavar los platos`
- **Marilla** le ordena a Anne que les dé el pastel a los cerdos — `NUEVA: alimentar a los animales`

### Cap. 22 — Invitan a Anne a tomar el té (Anne is Invited Out to Tea)
Anne recibe en la oficina de correos una carta de la señora Allan que la invita a la casa parroquial. Va a la merienda, canta y le cuenta su vida a la señora Allan.
- **Anne** corre a la oficina de correos y recoge la carta de invitación que le dejó la señora Allan — `ya existe: ir` + `tomar (carta en el correo)`
- **La señora Allan** invita a Anne a tomar el té por escrito — `NUEVA: invitar` (variante: escribir una carta, `NUEVA: escribir una carta`)
- **Anne** lava los platos del desayuno — `NUEVA: lavar los platos`
- **Marilla** le aconseja a Anne que piense en la señora Allan y no en sí misma — `NUEVA: aconsejar`
- **Anne** va a la casa parroquial a tomar el té — `ya existe: ir`
- **La señora Allan** toca y canta después del té — `NUEVA: tocar música`
- **Anne** y **Lauretta** cantan cuando la señora Allan se lo pide — `NUEVA: cantar`
- **Lauretta** se va temprano al concierto del hotel de White Sands — `ya existe: ir`
- **Anne** le cuenta a la señora Allan toda su historia (la señora Thomas, Katie Maurice, la geometría) — `NUEVA: confiar (contar un secreto)`
- **La señora Lynde** llega a la casa parroquial con la noticia de que contrataron a la maestra Stacy — `ya existe: conversar (contar noticias)`
- **Anne** vuelve a casa al atardecer y le cuenta todo a Marilla, con la cabeza en su regazo — `ya existe: conversar`

### Cap. 23 — Anne sufre por un asunto de honor (Anne Comes to Grief in an Affair of Honor)
En la fiesta de Diana, las niñas se desafían unas a otras. Josie Pye reta a Anne a caminar por la cumbrera del tejado, y Anne cae y se rompe el tobillo. Pasa siete semanas en cama recibiendo visitas.
- **Anne** echa por distracción la leche desnatada en la canasta de ovillos en vez del balde de los cerdos — `NUEVA: alimentar a los animales` (fallido)
- **Anne** se cae del puente de troncos al arroyo por ir soñando despierta — `ya existe: ir` (cruzar el puente)
- **Diana** da una fiesta para las niñas de su clase — `NUEVA: invitar` (dar una fiesta)
- **Carrie Sloane** desafía a Ruby a trepar al sauce, **Josie** desafía a Jane a saltar en un pie y **Josie** desafía a Anne a caminar por la cumbrera — `NUEVA: desafiar`
- **Ruby** trepa al sauce, y **Anne** sube por la escalera hasta el tejado de la cocina de los Barry — `NUEVA: trepar`
- **Josie** camina por la cerca de tablas y **Anne** por la cumbrera, hasta que pierde el equilibrio — `NUEVA: hacer equilibrio`
- **Anne** promete dejarle su anillo de perlas a Diana si muere — `NUEVA: prometer`
- **Anne** le pide a Diana que busque a su padre para que la lleve a casa — `ya existe: pedir un favor`
- **El señor Barry** carga a Anne en brazos hasta Tejas Verdes y la acuesta en el sofá — `NUEVA: cargar a alguien`
- **Marilla** está en el huerto recogiendo manzanas de verano — `ya existe: recoger (manzanas)`
- **Matthew** vuelve del campo y lo mandan a buscar al médico — `ya existe: pedir un favor (traer a alguien)`
- **El médico** le acomoda el tobillo a Anne, y **Marilla** le sube la cena — `NUEVA: cuidar a un enfermo`
- **Las compañeras**, **la señora Allan**, **el señor Bell** y **Josie** visitan a Anne y le llevan flores y libros — `NUEVA: visitar` + `ya existe: dar`

### Cap. 24 — La señorita Stacy y sus alumnos organizan un concierto (Miss Stacy and Her Pupils Get Up a Concert)
Anne vuelve a la escuela en octubre y se encariña con la señorita Stacy. La maestra propone un concierto de Navidad para pagar una bandera para la escuela, y Anne se dedica de lleno a ensayar.
- **Anne** vuelve a la escuela y se sienta en el pupitre junto a Diana — `ya existe: quedarse en un lugar (ir a clases)`
- **Carrie Sloane** le pasa notas a Anne y **Julia Bell** le pasa un chicle desde atrás — `NUEVA: pasar una nota` / `ya existe: dar`
- **Anne** recita "Mary, Queen of Scots" en la clase de los viernes — `NUEVA: recitar`
- **Matthew** le pide a Anne que le recite el poema en el granero — `ya existe: pedir un favor`
- **Los niños** trepan a los árboles de la colina de Bell para buscar nidos de cuervo en la tarde de campo — `NUEVA: trepar`
- **Anne** escribe composiciones en las tardes de campo — `NUEVA: escribir`
- **La señorita Stacy** propone el concierto de Navidad para juntar dinero para la bandera de la escuela — `NUEVA: organizar un evento`
- **Anne** ensaya sus recitaciones (y sus quejidos) en el desván — `NUEVA: ensayar`
- **Ruby Gillis** le va a prestar sus zapatillas a Anne para hacer de hada — `NUEVA: prestar`
- **Las niñas** planean decorar el salón con abeto rastrero y rosas de papel — `NUEVA: decorar`
- **Matthew** parte leña en el patio — `NUEVA: partir leña`
- **Anne** se sienta en un tronco y conversa del concierto con Matthew — `ya existe: conversar`

### Cap. 25 — Matthew insiste en las mangas abullonadas (Matthew Insists on Puffed Sleeves)
Matthew se da cuenta de que Anne no se viste como las demás niñas. Después de un intento desastroso de comprar en una tienda, le encarga a la señora Lynde un vestido con mangas abullonadas y se lo regala en Navidad. Esa noche Anne brilla en el concierto.
- **Matthew** se saca las botas en el rincón de la leñera y observa en silencio cómo las niñas ensayan — `NUEVA: observar` (espiar)
- **Matthew** va a Carmody, a la tienda de Lawson, a comprar un vestido — `ya existe: ir`
- **Matthew**, intimidado por la dependienta, compra en cambio un rastrillo y veinte libras de azúcar morena — `ya existe: comprar`
- **Matthew** esconde el rastrillo en el cobertizo de herramientas — `NUEVA: esconder`
- **Matthew** le da el azúcar a Marilla — `ya existe: dar`
- **Matthew** le pide a la señora Lynde que elija el vestido para Anne — `ya existe: pedir un favor`
- **La señora Lynde** compra la tela en Carmody y cose el vestido con mangas abullonadas — `ya existe: comprar` + `NUEVA: coser`
- **La señora Lynde** lleva el vestido a Tejas Verdes en Nochebuena — `ya existe: dar`
- **Anne** baja corriendo y les desea feliz Navidad a Marilla y Matthew — `NUEVA: saludar`
- **Matthew** le regala el vestido a Anne en Navidad — `ya existe: dar/regalar`
- **Diana** cruza el puente de troncos y le lleva a Anne la caja que manda la tía Josephine — `ya existe: ir` + `dar`
- **Anne** abre la caja y encuentra unas zapatillas de cabritilla — `NUEVA: abrir (un regalo)`
- **Los alumnos** decoran el salón y hacen el último ensayo general — `NUEVA: decorar` + `NUEVA: ensayar`
- **Anne** recita en el concierto, y **Diana** canta un solo — `NUEVA: recitar` + `NUEVA: cantar`
- **Gilbert** recoge la rosa que se le cayó del pelo a Anne y se la guarda en el bolsillo — `ya existe: tomar`
- **Matthew** le dice a Anne que está orgulloso de ella antes de que suba a acostarse — `NUEVA: elogiar`

### Cap. 26 — Se forma el Club de Cuentos (The Story Club Is Formed)
Después del concierto, algunos alumnos se pelean. Anne cumple trece años e inventa un club de cuentos con Diana, Jane y Ruby. Leen sus historias en voz alta y le mandan algunas a la tía Josephine.
- **Ruby** y **Emma White** se pelean y dejan de sentarse juntas, y **Josie** y **Julia** no se hablan por tres meses — `NUEVA: enemistarse`
- **Bessie Wright** le repite a Julia Bell lo que Josie dijo de ella — `NUEVA: chismear`
- **Charlie Sloane** se pelea con Moody Spurgeon porque habló mal de Anne — `NUEVA: pelear`
- **Anne** y **Diana** van a la escuela por el Sendero de los Abedules fijándose en todo para la composición — `ya existe: ir`
- **Anne** escribe el cuento "La rival celosa" — `NUEVA: escribir`
- **Anne** le lee el cuento a Marilla y a Matthew — `NUEVA: leer en voz alta`
- **Anne** le pregunta a Ruby cómo se declaran los hombres — `ya existe: conversar`
- **Anne** le propone a Diana formar un club de cuentos, y más tarde se suman Jane y Ruby — `NUEVA: fundar un club`
- **Cada socia** lee su cuento en voz alta y lo comentan entre todas — `NUEVA: leer en voz alta`
- **Anne** les lee un cuento al señor y la señora Allan — `NUEVA: leer en voz alta`
- **Diana** le escribe a la tía Josephine sobre el club, y **las niñas** le mandan cuatro cuentos copiados — `NUEVA: escribir una carta`
- **Marilla** le ordena a Anne que termine de lavar los platos en vez de charlar — `NUEVA: regañar` + `NUEVA: lavar los platos`

### Cap. 27 — Vanidad y aflicción (Vanity and Vexation of Spirit)
Anne le compra a un vendedor ambulante un tinte que debía dejarle el pelo negro azabache, pero se lo deja verde. Como el tinte no sale, Marilla tiene que cortarle el pelo muy corto.
- **Marilla** vuelve a pie de la reunión de la Sociedad de Ayuda — `ya existe: ir`
- **Marilla** encuentra el fuego apagado, saca astillas con un cuchillo y prepara ella misma el té — `NUEVA: encender el fuego` + `ya existe: cocinar (té)`
- **Marilla** lava y guarda los platos — `NUEVA: lavar los platos`
- **Marilla** sube al cuarto de Anne a buscar una vela para bajar al sótano — `ya existe: tomar (vela)`
- **Anne** sale a la puerta, cierra para no dejar entrar al vendedor ambulante y le compra el tinte con su dinero de las gallinas — `ya existe: comprar`
- **El vendedor ambulante** le rebaja el tinte de setenta y cinco a cincuenta centavos — `ya existe: cambiar (trueque)` (regatear)
- **Anne** se aplica el tinte en el pelo con un cepillo viejo — `NUEVA: teñir el pelo`
- **Anne** se lava el pelo con agua y jabón todos los días durante una semana — `NUEVA: lavar (el pelo)`
- **Diana** promete solemnemente no contar el secreto, y lo cumple — `NUEVA: prometer` + `NUEVA: guardar un secreto`
- **Anne** va a buscar las tijeras, y **Marilla** le corta el pelo — `ya existe: tomar (tijeras)` + `NUEVA: cortar el pelo`
- **Anne** pone el espejo contra la pared y luego lo da vuelta para mirarse como penitencia — `NUEVA: hacer penitencia`
- **Josie Pye** le dice a Anne que parece un espantapájaros — `NUEVA: burlarse`
- **Anne** le dirige una mirada desdeñosa a Josie y la perdona — `NUEVA: perdonar`

### Cap. 28 — Una desafortunada doncella de los lirios (An Unfortunate Lily Maid)
Las niñas representan "Elaine" de Tennyson en la laguna, con Anne acostada en un bote que se deja llevar por la corriente. El bote hace agua, Anne se agarra a un pilote del puente y Gilbert la rescata en otro bote. Gilbert le ofrece su amistad y ella la rechaza.
- **Anne** y **Diana** pescan truchas desde el puente — `NUEVA: pescar`
- **Anne** y **Diana** aprenden a remar en el bote de fondo plano del señor Barry — `NUEVA: remar`
- **Anne** se sienta a llorar entre los tocones cuando el señor Bell tala Idlewild — `NUEVA: llorar` (lamentarse)
- **Diana** consigue el chal negro de su madre para la escena — `ya existe: tomar` (pedir prestado: `NUEVA: prestar`)
- **Anne** reparte los papeles y **las niñas** representan la escena de Elaine — `NUEVA: actuar (obra)`
- **Las niñas** empujan el bote desde el embarcadero y corren por el bosque hasta el cabo de más abajo — `NUEVA: botar un bote` + `ya existe: ir`
- **Anne** reza para que el bote pase cerca de un pilote — `NUEVA: rezar`
- **Anne** trepa a un pilote del puente y se queda agarrada — `NUEVA: trepar`
- **Ruby**, **Jane** y **Diana** corren a buscar ayuda a Orchard Slope y a Tejas Verdes — `ya existe: llamar a alguien a distancia` / `ir`
- **Gilbert** pasa remando bajo el puente, le tiende la mano a Anne y la lleva remando hasta el embarcadero — `NUEVA: rescatar` + `NUEVA: remar`
- **Anne** le agradece a Gilbert con altivez — `NUEVA: agradecer`
- **Gilbert** le pide perdón a Anne por burlarse de su pelo y le ofrece su amistad — `ya existe: disculparse` + `NUEVA: ofrecer amistad`
- **Anne** se niega a ser amiga de Gilbert — `NUEVA: rechazar`
- **Diana** abraza a Anne llorando de alivio — `NUEVA: abrazar`
- **Matthew** está haciendo heno en el campo de atrás — `NUEVA: hacer heno`

### Cap. 29 — Una época en la vida de Anne (An Epoch in Anne's Life)
La tía Josephine invita a Anne y Diana a pasar unos días en Charlottetown durante la Exposición. Van a la feria, a las carreras de caballos, a un concierto y a tomar helado, pero para Anne lo mejor es volver a casa.
- **Anne** trae las vacas a casa desde el potrero de atrás por la Senda de los Enamorados — `ya existe: guiar una vaca`
- **Anne** recita en voz alta el canto de batalla de "Marmion" mientras camina — `NUEVA: recitar`
- **Diana** le da a Anne la noticia y le hace adivinar tres veces — `ya existe: conversar (contar noticias)`
- **La tía Josephine** invita por carta a Anne y Diana a la ciudad — `NUEVA: invitar`
- **Diana** propone que su madre le pida permiso a Marilla — `ya existe: interceder`
- **Marilla** le da permiso a Anne para ir a la ciudad — `NUEVA: dar permiso`
- **Anne** se levanta antes del amanecer, se pone la gorra y la chaqueta nuevas y cruza el arroyo hasta Orchard Slope — `NUEVA: vestirse` + `ya existe: ir`
- **El señor Barry** lleva a las niñas en la calesa hasta Charlottetown, a treinta millas — `NUEVA: viajar (en calesa)`
- **La señorita Barry** recibe a las niñas en la puerta de Beechwood — `NUEVA: hospedar`
- **La señorita Barry** lleva a las niñas a la Exposición y a la tribuna para ver las carreras — `ya existe: dar un paseo` / `ir`
- **Diana** ofrece apostar diez centavos al caballo rojo y **Anne** se niega — `NUEVA: apostar`
- **La señorita Barry** les da diez centavos a cada una para que les lean la fortuna — `ya existe: dar` + `comprar`
- **La señorita Barry** lleva a las niñas al concierto de la Academia de Música y luego a tomar helado — `ya existe: ir` + `NUEVA: comer`
- **Anne** abraza a la señorita Barry y le da un beso en la mejilla al despedirse — `NUEVA: abrazar`
- **Marilla** le cocina un pollo asado a Anne para su regreso y deja de tejer cuando ella llega — `ya existe: cocinar` / `NUEVA: tejer`
- **Anne** se sienta junto al fuego y les cuenta el viaje a Matthew y Marilla — `ya existe: conversar`

### Cap. 30 — Se forma la clase para Queen's (The Queens Class Is Organized)
La señorita Stacy propone una clase para preparar el examen de ingreso a Queen's, y Marilla deja que Anne se inscriba. Se intensifica la rivalidad con Gilbert, Diana se queda fuera y, al terminar el curso, Anne guarda sus libros bajo llave.
- **Anne** lee junto al fuego, sentada en la alfombra — `NUEVA: leer`
- **La señorita Stacy** visita Tejas Verdes para hablar con Marilla — `NUEVA: visitar`
- **Jane Andrews** le presta "Ben-Hur" a Anne, y **Ruby** le presta otro libro — `NUEVA: prestar`
- **Anne** esconde "Ben-Hur" bajo el pupitre y lo lee en clase de historia — `NUEVA: esconder` + `NUEVA: leer`
- **La señorita Stacy** le quita el libro a Anne y la deja castigada en el recreo — `NUEVA: confiscar` + `NUEVA: castigar`
- **Anne** llora y le pide perdón a la señorita Stacy, y la maestra la perdona — `ya existe: disculparse` + `NUEVA: perdonar`
- **Anne** devuelve el libro de Ruby sin terminarlo y promete no leer libros así — `NUEVA: devolver` + `NUEVA: prometer`
- **Anne** se inscribe en la clase para Queen's y se queda después de clases a estudiar — `NUEVA: estudiar` + `ya existe: quedarse en un lugar`
- **Anne** abraza a Marilla por la cintura para darle las gracias — `NUEVA: abrazar` + `NUEVA: agradecer`
- **Diana** se va sola a casa por el Sendero de los Abedules — `ya existe: ir`
- **Gilbert** ignora a Anne, y **Anne** desaira a Charlie Sloane — `NUEVA: ignorar`
- **Anne** guarda sus libros de texto en un baúl del desván, lo cierra con llave y tira la llave al arcón de las mantas — `NUEVA: guardar bajo llave`
- **Marilla** se queda en casa cuidando a Matthew tras su ataque al corazón — `NUEVA: cuidar a un enfermo`
- **Marilla** invita a la señora Lynde a quedarse a tomar el té — `NUEVA: invitar`
- **Anne** prepara el té y hace bizcochos calientes — `ya existe: cocinar (té)`
- **Marilla** acompaña a la señora Lynde hasta el final del camino — `NUEVA: acompañar`

### Cap. 31 — Donde el arroyo y el río se encuentran (Where the Brook and River Meet)
Por consejo del médico, Anne pasa un verano libre al aire libre y vuelve a la escuela con ganas de estudiar para el examen de ingreso a Queen's. Crece, se vuelve más callada y Marilla llora a solas al ver que pronto se irá.
- **Anne** rema y recoge bayas durante el verano ("She walked, rowed, berried") — `ya existe: recoger (bayas)` / `NUEVA: remar`
- **El médico de Spencervale** envía un recado a Marilla por medio de otra persona ("tenga a esa niña al aire libre") — `NUEVA: enviar recado`
- **Anne** baja sus libros del desván al comenzar septiembre — `ya existe: tomar (libros en el desván)`
- **Mr. Allan** predica el sermón del domingo que Anne cita — `NUEVA: predicar`
- **Anne** va a la fiesta de Ruby, donde Mr. Gillis la mide (creció dos pulgadas) — `NUEVA: asistir a fiesta`
- **Marilla** alarga los vestidos nuevos de Anne y le pone un volante al verde — `NUEVA: coser`
- **Miss Stacy** vuelve a la escuela y la clase de Queen's estudia para el examen — `ya existe: quedarse en un lugar (ir a clases)`
- **Anne y sus amigos** salen de paseo en trineo y a patinar en invierno — `NUEVA: pasear en trineo` / `NUEVA: patinar`
- **Anne** va a la reunión de oración con Diana — `NUEVA: rezar`
- **Matthew** entra con un farol, encuentra a Marilla llorando y la consuela ("She'll be able to come home often") — `NUEVA: consolar`
- **Anne** escribe composiciones sencillas que Miss Stacy critica con dureza — `NUEVA: escribir composición`
- **Miss Stacy** pone a la clase exámenes de prueba en junio — `NUEVA: rendir examen`
- **Anne** aparta la vista de la primavera y se hunde en su libro para estudiar — `NUEVA: estudiar`

### Cap. 32 — Sale la lista de aprobados (The Pass List Is Out)
Anne va a la ciudad a rendir el examen de ingreso y, tras semanas de espera, Diana le trae el periódico: Anne sale primera, empatada con Gilbert. Corre a contárselo a Matthew y esa noche reza agradecida.
- **Miss Stacy** se despide de sus alumnos; Anne y Diana vuelven a casa llorando — `NUEVA: despedirse`
- **Miss Stacy** hace prometer a la clase no abrir un libro durante la semana del examen — `NUEVA: prometer`
- **Anne** se va a la ciudad y se aloja en Beechwood, en casa de la tía Josephine — `ya existe: ir (a la ciudad)`
- **Anne** escribe a Diana el martes por la noche, como había prometido — `NUEVA: escribir carta`
- **Diana** ronda la oficina de correos el miércoles y recoge la carta — `NUEVA: recoger correo`
- **Anne, Jane, Ruby, Josie y Moody** rinden los exámenes de inglés, historia y geometría en la Academia — `NUEVA: rendir examen`
- **Anne** anima a Moody Spurgeon y lo convence de no volverse en el tren — `NUEVA: persuadir`
- **Anne y Ruby** van al centro a tomar un helado — `NUEVA: comer helado`
- **Anne y las chicas** abren los diarios de Charlottetown en la oficina de correos buscando la lista — `NUEVA: leer periódico`
- **Diana** cruza corriendo el puente de troncos con el periódico que su padre trajo de Bright River y le da la noticia a Anne — `ya existe: dar (periódico)` / `ya existe: conversar (contar noticias)`
- **Anne** enciende la lámpara gastando media docena de fósforos — `NUEVA: encender lámpara`
- **Matthew** amontona heno en el campo bajo el granero — `NUEVA: hacer heno`
- **Anne** corre al campo a contárselo a Matthew; Marilla y Mrs. Lynde la felicitan — `ya existe: conversar (contar noticias)` / `NUEVA: felicitar`
- **Anne** tiene una charla seria con Mrs. Allan en la casa parroquial — `ya existe: conversar`
- **Anne** se arrodilla junto a la ventana y reza una oración de gratitud — `NUEVA: rezar`

### Cap. 33 — El concierto del hotel (The Hotel Concert)
Anne, arreglada por Diana, va a recitar a un concierto benéfico en el hotel de White Sands. Le entra el pánico escénico, pero al ver a Gilbert recupera el valor y triunfa.
- **Anne** mantiene flores frescas bajo la foto de Miss Stacy (esta noche, lirios blancos) — `NUEVA: poner flores`
- **Diana** le aconseja ponerse el organdí blanco y Anne se viste — `NUEVA: vestirse`
- **Diana** le ata el fajín, le trenza el pelo con lazos blancos y le prende tras la oreja la única rosa de su rosal — `NUEVA: peinar` / `ya existe: regalar (rosa)`
- **Anne** se pone el collar de perlas que Matthew le trajo de la ciudad — `ya existe: regalar (Matthew, collar)`
- **Marilla** le recomienda la chaqueta abrigada y que cuide la falda de la rueda — `NUEVA: vestirse`
- **Billy y Jane Andrews** recogen a Anne y Diana en su calesa de dos asientos y van a White Sands — `NUEVA: viajar en calesa`
- **Anne** recita "The Maiden's Vow" y luego vuelve para el bis — `NUEVA: recitar`
- **La señora de rosa** estrecha la mano de Anne y se la presenta a todos — `NUEVA: presentar a alguien`
- **Anne, Diana y Jane** cenan en el gran comedor del hotel con los artistas — `NUEVA: cenar`
- **Billy** se esconde para que no lo inviten y espera con el coche al final — `NUEVA: esperar`
- **Diana** le cuenta a Anne el cumplido del artista sobre su "pelo tizianesco" — `ya existe: conversar (contar noticias)`

### Cap. 34 — Una alumna de Queen's (A Queen's Girl)
Preparan el ajuar de Anne; Marilla le regala tela para un vestido de noche y se emociona. Anne se instala en una pensión en la ciudad, pasa la primera noche con nostalgia y se entera de la beca Avery.
- **Anne y Marilla** cosen el ajuar durante tres semanas — `NUEVA: coser`
- **Matthew** compra la ropa de Anne — `ya existe: comprar`
- **Marilla** le regala a Anne tela verde que eligió con Mrs. Allan — `ya existe: regalar (tela)`
- **Marilla** encarga a Emily Gillis que confeccione el vestido — `ya existe: pedir un favor`
- **Anne** se pone el vestido y recita "The Maiden's Vow" para Matthew y Marilla en la cocina — `NUEVA: recitar`
- **Anne** besa a Marilla, se sienta en su regazo; Marilla la abraza fuerte — `NUEVA: abrazar`
- **Matthew** sale al patio y camina hasta el portón bajo los álamos — `ya existe: ir`
- **Anne** se despide entre lágrimas de Diana y se va en coche a la ciudad con Matthew — `NUEVA: despedirse` / `NUEVA: viajar en calesa`
- **Diana** va a un picnic en la playa de White Sands con sus primos de Carmody — `NUEVA: ir de picnic`
- **Miss Barry** busca una pensión para Anne cerca de la Academia — `NUEVA: buscar alojamiento`
- **Anne** se inscribe en el trabajo de Segundo Año en la Academia — `ya existe: quedarse en un lugar (ir a clases)`
- **Josie Pye** visita a Anne para pedirle pastel; Anne le da un trozo a Jane — `NUEVA: visitar` / `ya existe: dar (pastel)`
- **Josie** cuenta la noticia de la beca Avery — `ya existe: conversar (contar noticias)`

### Cap. 35 — El invierno en Queen's (The Winter at Queen's)
Anne vuelve a casa los viernes en tren, hace nuevas amigas y estudia con empeño, compitiendo con Gilbert sin rencor. Pasa los domingos con Miss Barry y llega la primavera de los exámenes.
- **Los alumnos de Avonlea** van a Carmody en el nuevo ramal del tren cada viernes por la noche — `NUEVA: viajar en tren`
- **Diana y otros jóvenes** los esperan en la estación — `NUEVA: esperar`
- **Todos** caminan juntos de Carmody a Avonlea por las colinas — `ya existe: ir`
- **Gilbert** acompaña a Ruby Gillis y le lleva el bolso — `NUEVA: acompañar`
- **Jane** le susurra a Anne su opinión sobre Ruby y Gilbert — `ya existe: conversar`
- **Anne** se hace amiga íntima de Stella Maynard y Priscilla Grant — `NUEVA: hacer amistad`
- **Anne** estudia mucho y con constancia — `NUEVA: estudiar`
- **Anne** almuerza los domingos en Beechwood y va a la iglesia con Miss Barry — `NUEVA: visitar` / `ya existe: ir (a la iglesia)`
- **Jane, Ruby y Josie** pasan a ver a Anne y hablan de los exámenes — `NUEVA: visitar`
- **Josie** repite el rumor sobre la medalla y la beca — `ya existe: conversar (contar noticias)`

### Cap. 36 — La gloria y el sueño (The Glory and the Dream)
Gilbert gana la medalla y Anne la beca Avery. Vuelve a Avonlea, recorre sus lugares queridos y trae las vacas con Matthew, que ya está enfermo del corazón. Se habla de que el Banco Abbey está en problemas.
- **Anne y Jane** van caminando a ver los resultados en el tablero de Queen's — `ya existe: ir`
- **Anne** le pide a Jane que lea los anuncios por ella y se lo haga prometer — `ya existe: pedir un favor` / `NUEVA: prometer`
- **Los chicos** llevan a Gilbert en hombros gritando "¡Hurra por Blythe!" — `NUEVA: felicitar`
- **Las chicas** rodean a Anne, la abrazan y le estrechan la mano — `NUEVA: felicitar` / `NUEVA: abrazar`
- **Anne** quiere escribir la noticia a casa enseguida — `NUEVA: escribir carta`
- **Anne** lee el mejor ensayo en la graduación; Matthew y Marilla la escuchan — `NUEVA: recitar`
- **Anne** vuelve a Avonlea con Matthew y Marilla — `ya existe: ir`
- **Marilla** pone un rosal en flor en el alféizar del cuarto de Anne — `NUEVA: poner flores`
- **Anne** visita la Burbuja de la Dríade, Willowmere y el Valle de las Violetas — `ya existe: dar un paseo hasta un lugar bonito`
- **Anne** pasa por la casa parroquial a hablar con Mrs. Allan — `NUEVA: visitar` / `ya existe: conversar`
- **Anne y Matthew** traen las vacas por el Sendero de los Enamorados desde el potrero — `ya existe: guiar una vaca`
- **Matthew** abre el portón del corral para que pasen las vacas — `NUEVA: abrir portón`
- **Marilla** quería que Matthew sacara el dinero del Banco Abbey; él dijo que lo pensaría — `NUEVA: retirar dinero`

### Cap. 37 — La segadora llamada muerte (The Reaper Whose Name Is Death)
Matthew muere de golpe al leer en el periódico que el Banco Abbey quebró. Anne lo vela, llora con Marilla, que por fin le dice que la quiere, y luego planta un rosal en su tumba.
- **Anne** entra con las manos llenas de narcisos blancos y los deja caer — `ya existe: recoger (flores)`
- **Matthew** lee el periódico que Martin trajo de correos y se desploma — `NUEVA: leer periódico`
- **Marilla** manda a Anne a buscar a Martin al granero — `ya existe: pedir un favor` / `ya existe: llamar a alguien`
- **Martin** va por el médico y pasa por Orchard Slope a avisar a los Barry — `NUEVA: buscar al médico` / `ya existe: conversar (contar noticias)`
- **Mrs. Lynde** le toma el pulso a Matthew y le escucha el corazón — `NUEVA: atender enfermo`
- **Los vecinos** van a Green Gables a hacer favores a la familia — `NUEVA: visitar`
- **Anne** recoge flores del jardín de la madre de Matthew y se las pone junto al ataúd — `ya existe: recoger (ramo)` / `ya existe: dar`
- **Diana** se ofrece a dormir con Anne; Anne prefiere quedarse sola — `NUEVA: acompañar`
- **Anne** se arrodilla junto a la ventana y reza — `NUEVA: rezar`
- **Marilla** va al cuarto de Anne y la consuela abrazándola — `NUEVA: consolar` / `NUEVA: abrazar`
- **Los vecinos** sacan a Matthew de casa para enterrarlo — `NUEVA: enterrar`
- **Anne** planta en la tumba de Matthew un esqueje del rosal escocés de su madre — `NUEVA: plantar`
- **Anne** se pone en el pelo ramitas de madreselva que recoge — `ya existe: recoger (flores)`
- **Marilla** le pide a Anne que se quede sola en casa a planchar y hornear mientras ella va al oculista — `ya existe: pedir un favor` / `NUEVA: planchar` / `ya existe: cocinar`
- **Marilla** le cuenta a Anne su secreto: John Blythe fue su pretendiente y ella no le perdonó — `NUEVA: contar un secreto`

### Cap. 38 — La curva del camino (The Bend in the Road)
Marilla podría quedarse ciega y piensa vender Green Gables. Anne renuncia a la beca para quedarse y enseñar. Gilbert le cede la escuela de Avonlea, y Anne le da las gracias y se hacen amigos.
- **Marilla** va a la ciudad a ver al oculista y vuelve de noche — `ya existe: ir`
- **Anne** va a Orchard Slope con Diana — `ya existe: ir`
- **Marilla** le pide una taza de té; Anne se la prepara — `ya existe: cocinar (té)` / `ya existe: dar`
- **Anne** convence a Marilla de irse a la cama — `NUEVA: persuadir`
- **Mr. Sadler** de Carmody ofrece comprar Green Gables, que Marilla piensa vender — `NUEVA: vender granja`
- **Anne** renuncia a la beca Avery para quedarse con Marilla — `NUEVA: renunciar`
- **Anne** postula a la escuela de Avonlea y Mr. Blair le ofrece la de Carmody en la tienda — `NUEVA: solicitar empleo`
- **Mr. Barry** quiere arrendar la granja el año próximo — `NUEVA: arrendar`
- **Mrs. Lynde** se sienta en el banco de piedra y cuenta que los síndicos le dan la escuela a Anne — `ya existe: conversar (contar noticias)`
- **Gilbert** retira su postulación y les pide a los síndicos que acepten la de Anne — `ya existe: interceder`
- **Diana** le hace señas a Anne con la luz desde la ventana de los Barry — `ya existe: llamar a alguien a distancia`
- **Anne** baja corriendo la ladera de trébol y cruza el Bosque Encantado — `ya existe: ir`
- **Anne** pone flores frescas en la tumba de Matthew y riega el rosal escocés — `NUEVA: poner flores` / `NUEVA: regar`
- **Anne** detiene a Gilbert, le tiende la mano y le agradece por cederle la escuela — `NUEVA: agradecer`
- **Anne y Gilbert** se perdonan y prometen ser amigos — `NUEVA: hacer las paces`
- **Gilbert** acompaña a Anne a casa; hablan media hora en el portón — `NUEVA: acompañar` / `ya existe: conversar`

---

Fuente: el texto en inglés de Project Gutenberg (ebook #45, dominio público). Cada capítulo lo leyó un agente distinto, y la propuesta de la sección 2 resume sus tablas. Los títulos en español son traducciones libres.
