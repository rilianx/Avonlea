# Catálogo del modelo del mundo

> Generado por `node tools/catalogo.js` a partir de los datos del juego (no editar a mano). La explicación de cómo se usa todo esto para planificar está en [PLANIFICADOR.md](PLANIFICADOR.md).

## 1. El estado (lo que el planificador sabe del mundo)

Un estado es una foto del mundo hecha de datos (`wmNow()`), y el planificador trabaja sobre copias de ella. Sus componentes:

| Componente | Qué guarda | Ejemplo |
|---|---|---|
| `t` | la hora, en minutos desde la medianoche | `792.0366599999999` (= 13:12.03665999999987) |
| `pos` | dónde está cada persona, como un **lugar** (ver §6): un punto del mapa (`granero`, `huerto`…), `cocina` (adentro de Tejas Verdes), `h:casa` (adentro de otra casa) o `p:quien` (afuera, donde esa persona esté) | `ana: "cocina"` |
| `invs` | lo que cada uno tiene: `{ cosa: cantidad }` | `ana: { huevos: 6, cuerda: 1 }` |
| `cows` | dónde está cada vaca: `corral`, `potrero`, `c:vaca` (suelta, donde esté), `led:quien` (alguien la lleva de la cuerda), `sold:quien` (vendida) | `{"dolly":"corral","jersey":"potrero"}` |
| `rel` | cuánto quiere cada uno a cada otro, de -2 a 5 (`"a>b"`: lo que a siente por b) | `"diana>ana": 5` |
| `ofensa` | ofensas pendientes (`"a>b"`: a está ofendido con b, y por qué) | `"ana>gilbert": "zanahorias"` |
| `know` | lo que cada uno sabe (noticias) | `lynde: ["vendio_vaca"]` |
| `follow` | quién acompaña a quién | `diana: "ana"` |
| `facts` | hechos del día: a quién se le pidió qué, quién se disculpó, quién regaló qué… (se usan para no repetir) | `"pedido:traer:ana": 1`, `"dio:marilla:hecha_a_mano": 1` |
| `stock` | lo que queda para recoger hoy | `{"bayas":0,"manzanas":0,"ramo":0,"hierbas":9,"huevos":6}` |

## 2. Las acciones (verbos)

Las mismas para todos (Ana y los demás). Cada una tiene una **condición** (cuándo se puede), un **costo** en minutos y un **efecto** sobre el estado. «Aquí» es el lugar de quien actúa; «alguien presente» es otra persona en el mismo lugar.

| Acción | Se puede cuando… | Costo (min) | Efecto |
|---|---|---|---|
| `ir` a un lugar | no es alguien que no sale (quieto: Marilla, la Sra. Barry, un enfermo) | el camino: distancia × 1,3 ÷ velocidad (+2 si entra o sale de una casa) | cambia su `pos` (y la de quien lo acompaña) |
| `tomar` una cosa | el lugar la ofrece para tomar y no la tiene | 1 | +1 de esa cosa |
| `recoger` | el lugar la ofrece para recoger y queda `stock` | 3 | +3 (huevos: todos; ramo: 1), −stock |
| `cocinar` algo | está en su cocina y tiene los ingredientes de la receta | 10 | −ingredientes, +1 del plato |
| `dar` una cosa a alguien presente | la tiene | 1 | pasa de uno a otro; si al otro le gusta (por etiqueta), sube su cariño una vez al día; deja el hecho `dio:…` |
| `vender` la vaca | lleva una vaca de su familia y alguien presente compra animales | 5 | vaca → `sold:comprador`, + dólares; ambos saben la noticia |
| `cambiar` (trueque) | está con el tendero, la tienda abierta, y tiene con qué pagar el gusto | 4 | −lo que entrega, +el gusto (cinta, caramelos) |
| `comprar` a la libreta | es de los Cuthbert y está en la tienda abierta | 4 | +1 (azúcar, cuerda), anotado en la libreta |
| `conversar` con alguien presente | uno sabe algo que el otro no | 2 | ambos quedan sabiendo lo mismo |
| `disculparse` con alguien presente | ese alguien está ofendido con quien actúa y hoy no se ha disculpado | 2 | sube el cariño (+2 si el otro es sensible o generoso, +1 si no); puede borrar la ofensa |
| `interceder` | la meta es hablar por alguien y está con esa persona | 2 | el otro quiere un poco más a aquel por quien se habló |
| `pedir` un favor a alguien presente | el favor está permitido (§4), el otro lo quiere ≥ 2 o es generoso, y hoy no se lo pidió | 2 + espera del favor (+40 si quien pide no es quieto) | el efecto del favor (lo que el otro va a lograr); en el mundo, al otro se le instala una meta |
| `pedir` mandando a llamar | quien pide es quieto y el favor es para Ana (que no está ahí) | 2 + espera + 25 | igual; en el mundo, Ana va hasta la persona y entonces se le pide |
| `guiar` una vaca | tiene cuerda, la vaca está aquí, no lleva otra, y es de su familia o anda suelta | 2 | vaca → `led:quien` |
| `soltar` la vaca | la lleva y está en el corral o el potrero | 1 | vaca → ese lugar |
| **Del libro** (cada una se ofrece solo si sirve para la meta) | | | |
| `quehacer` (lavar los platos, barrer, poner la mesa) | en la cocina de Tejas Verdes (Ana o Marilla) | 6 | hecho `quehacer:x`; la primera vez, +1 de cariño de Marilla |
| `ordeñar` una vaca | en el corral, con la vaca ahí, hoy no ordeñada | 8 | +2 jarros de leche |
| `alimentar` a los animales | en el corral o el gallinero | 4 | hecho `alimentados:lugar` |
| `visitar` a alguien | esa persona está en su casa | 12 | hecho `visita:a>b`; +1 de cariño |
| `devolver` lo prestado | tiene algo que le prestó alguien presente | 1 | vuelve a su dueño; +1 de cariño |
| `jurar` ser amigas del alma | Ana y Diana juntas, con cariño ≥ 4 | 5 | hecho para siempre `amigas:ana&diana`; cariño 5 |
| `perdonar` | quien actúa está ofendido con alguien presente que se disculpó (o lo quiere ≥ 1) | 2 | se borra la ofensa; +1 de cariño |
| `cuidar` a un enfermo | el enfermo está presente y se tiene el jarabe (se toma en la cocina) | 15 | se mejora; +2 de cariño |
| (buscar al médico) | favor `curar` al médico (en la aldea): él va donde el enfermo y lo `cuida` sin jarabe | — | se mejora |
| `estudiar` / `recitar` | en la escuela o en casa / en la escuela, sabiéndose la lección | 20 / 3 | sabe la lección / hecho `recito` |
| `rezar` | en su casa o en la iglesia | 3 | hecho `rezo` |
| `coser` (un vestido) | en su cocina, si sabe coser, con un corte de tela | 30 | +1 vestido con mangas abullonadas |
| `adornar` el sombrero | tiene un ramo | 2 | hecho `adorno`; −1 ramo |
| `remar` | en el lago | 15 | hecho `remo` |
| `nombrar` un lugar | Ana, en un lugar que todavía no bautizó | 2 | el lugar queda con su nombre para siempre (aparece en el mapa) |
| `regañar` | alguien que regaña (Marilla, la Sra. Lynde, la Sra. Barry) y una falta; quien no sale manda a llamar a Ana | 3 | hecho `regaño`; Ana queda castigada media hora en la cocina |
| `subir_calesa` | Matthew, con quien quiere llevar | 3 | lo acompaña; el viaje de Matthew dura 2,4 veces menos |
| **Del libro, segunda tanda** | | | |
| `escribir_carta` / `enviar_carta` | en casa / en la tienda (el correo), con la carta | 8 / 2 | +1 carta / hecho `carta_enviada` |
| `leer` | tiene un libro | 20 | hecho `leido` |
| `escribir_cuento` / `leer_cuento` | en casa / con Diana presente (el club de cuentos) | 20 / 8 | +1 cuento / hecho `club` |
| `ensayar` / `actuar` | en la escuela o el salón / en el salón, sabiéndose el poema | 15 / 5 | sabe el poema / hecho `concierto` |
| `decorar_sala` | en el salón, con un ramo | 6 | hecho `sala_decorada` |
| `felicitar` | alguien presente recitó o actuó | 2 | +1 de cariño |
| `consolar` | alguien presente está triste | 5 | se le pasa; +1 de cariño |
| `hacer_heno` / `partir_lena` | en el campo de heno / en el granero | 25 / 10 | +3 fardos de heno / +3 atados de leña |
| `batir` (mantequilla) / `preparar` (canasta) | en su cocina, con 2 jarros de leche / sin nada | 10 | +1 pan de mantequilla / +1 canasta de picnic |
| `sembrar` / `regar` | en la huerta (regar, después de sembrar) | 10 / 5 | hechos `sembrado` / `regado` |
| `patinar` / `trineo` | en invierno, en el lago helado / en la colina | 15 | hechos `patino` / `trineo` |
| `pedir_permiso` | Ana, en la cocina con Marilla | 2 | hecho `permiso:picnic` (sin él, Ana no puede ir al picnic) |
| `merendar` | en el lago, con la canasta, con alguien (y, si es Ana, con permiso) | 20 | hecho `picnic` (para los dos) |
| `teñir` / `cortar_pelo` | en la cocina, con tinte (se le cambia al buhonero) / con el pelo verde | 10 / 6 | el pelo queda verde (se ve en el dibujo) / se le corta |
| `trepar` | en el huerto de los Barry (el desafío de Josie) | 6 | hecho `trepo`… y se tuerce el tobillo |

## 3. Las metas

Una meta es una **condición** sobre el estado (`test`) y una estimación de **cuántos pasos faltan** (`h`, la heurística de A*). Cada meta dice también qué cosas, personas y lugares importan para ella (el planificador mira solo esos).

| Meta | Se cumple cuando… | Heurística h (pasos que faltan) |
|---|---|---|
| `tener(quien, cosa, n)` | quien tiene al menos n | 0 si ya; si no 1 + (1 si nadie la tiene / 2 si hay que cocinarla) |
| `dinero(quien, n)` | quien junta n dólares | vender hecho 1, cocinar 2, recoger 3 por dólar (máx. 4) |
| `regalo_gusto(quien, a)` | a recibió algo con una etiqueta que le gusta | 0 / 2 |
| `reconciliar(quien, a)` | a lo quiere ≥ 2 y no está ofendido | 1 por cada cosa que falte |
| `intercede(a, por)` | se habló con a por alguien | 0 / 1 |
| `rel_min(a, b, n)` | a quiere a b al menos n | lo que falta |
| `estar_en(quien, lugar, hasta, quedar)` | quien está ahí (antes de la hora límite); con `quedar`, al llegar se queda (en la escuela, adentro, en clases) hasta esa hora y recién ahí la meta termina | 0 / 1 (y la búsqueda descarta lo que pase de la hora) |
| `vaca_en(vaca, lugar)` | la vaca está en ese corral o potrero | 0 / 1 si alguien la lleva / 2 |
| `vaca_vendida(vaca, a)` | vendida (a esa persona) | 0 / 1 / 2 |
| `conoce(quien, noticia)` | quien sabe la noticia | 0 / 1 |
| `paseo(a, b, lugar, min)` | a y b llegan juntos (b acompaña a a) a un lugar bonito; ahí se quedan `min` minutos conversando y recién entonces termina | 1 por acompañar + 1 por llegar |
| `acompana(a, b)` | a acompaña a b | 0 / 1 |
| `te_con(quien, invitado, lugar)` | los dos están en el lugar y quien tiene té | 1 por cada cosa que falte |
| `regalar_cosa(quien, cosa)` | esa cosa fue regalada | 0 / 1 si la tiene / 2 |
| **Del libro, segunda tanda:** `carta(quien)`, `leido(quien)`, `club(quien)`, `concierto(quien)`, `sala(quien)`, `felicitar(a, b)`, `consolado(a, b)`, `huerta(quien)`, `patinar(quien)`, `trineo(quien)`, `picnic(a, b)`, `teñido(quien)`, `pelo_corto(quien)`, `desafio(quien)` | el hecho de cada una | lo que falta |
| **Del libro:** `quehaceres(quien, lista)`, `alimentados(lugares)`, `visitar(a, b)`, `devuelto(a, cosa, b)`, `amigas(a, b)`, `paces(a, b)`, `sano(quien)`, `recito(quien)`, `rezo(quien)`, `adornado(quien)`, `remo(quien)`, `nombres(quien, n)`, `regañado(quien)`, `llevar(quien, a, lugar)` | el hecho de cada una (ver las acciones) | lo que falta (0, 1 o 2) |

## 4. Los favores (lo que se le puede pedir a otro)

Pedir un favor es una acción más; si el otro acepta, en el mundo se le instala una **meta propia** (y él puede, a su vez, pedirle a un tercero: cadenas de hasta tres).

| Favor | Se puede pedir si… | Lo que hace verdadero | Meta que recibe quien acepta | Espera (min) |
|---|---|---|---|---|
| `traer` cosa, n | no es a uno mismo; un quieto solo si ya la tiene | quien pide tiene n más | `tener(quien pide, cosa, n)` | 45 |
| `vender_vaca` | se le pide a un Cuthbert y la vaca no está vendida | la vaca vendida a quien pide | `vaca_vendida` | 45 |
| `encerrar_vaca` | no es quieto y nadie lleva ni compró la vaca | la vaca en su corral | `vaca_en` | 45 |
| `interceder` por alguien | el destinatario quiere ≥ 4 a quien intercede | (+1 de cariño hacia quien pide) | `intercede` | 20 |
| `pasear` | con Ana | quien recibe el pedido acompaña a quien pide (lo sigue) | — | — |
| `prestar` cosa | el otro la tiene | quien pide la tiene (queda «prestada»: hay que devolverla) | — (se la pasa en el momento) | — |
| `quehaceres` | a Ana | los quehaceres hechos | `quehaceres(Ana, lista)` | 30 |
| `llevar` en la calesa | a Matthew | los dos en el lugar | `llevar(Matthew, quien pide, lugar)` | 15 |
| `venir` (invitación para más tarde; también Ana invita a Diana) | a Ana | Ana estará en el lugar a la hora | `estar_en(Ana, lugar, hora, se queda)`, que empieza una hora antes de la cita (té a las 17, o algo más tarde) | 30 |

A quién se le puede pedir sin que la meta lo diga: a los de su casa o a un amigo (cariño ≥ 3); quien no sale, solo a quien está con él, o manda a llamar a Ana.

## 5. Las cosas

| Cosa | Etiquetas | Receta | Vale en trueque | Valor |
|---|---|---|---|---|
| baya (`bayas`) | comida, cosecha | — | 0.33 | 0.1 |
| manzana (`manzanas`) | comida, cosecha | — | 0.33 | 0.1 |
| tarta de bayas (`tarta`) | comida, hecha_a_mano, regalo | 3 bayas | 4 | 1 |
| compota de manzana (`compota`) | comida, hecha_a_mano, regalo | 3 manzanas | 4 | 1 |
| taza de té (`te`) | bebida, regalo | (nada: se hace en la cocina) | — | 0 |
| ramo de flores (`ramo`) | flores, hecha_a_mano, regalo | — | 2 | 0 |
| dólar (`dolares`) | dinero | — | — | — |
| cuerda (`cuerda`) | herramienta | — | — | — |
| taza de azúcar (`azucar`) | comida, tienda | — | — | 0.2 |
| manojo de hierbas (`hierbas`) | hierba | — | — | 0.1 |
| vaca (`vaca`) | animal | — | — | 20 |
| cinta para el pelo (`cinta`) | adorno, regalo | — | — | 0.3 |
| jarro de leche (`leche`) | comida, granja | — | 1 | 0.1 |
| libro (`libro`) | lectura, regalo | — | — | 0.5 |
| frasco de jarabe de ipecacuana (`jarabe`) | remedio | — | — | 0.2 |
| corte de tela (`tela`) | tienda | — | — | 0.5 |
| vestido con mangas abullonadas (`vestido`) | ropa, adorno, hecha_a_mano, regalo | 1 corte de tela | — | 2 |
| carta (`carta`) | escrito | — | — | 0 |
| cuento escrito a mano (`cuento`) | escrito, hecha_a_mano | — | — | 0 |
| fardo de heno (`heno`) | granja | — | — | 0.2 |
| atado de leña (`lena`) | granja | — | — | 0.2 |
| pan de mantequilla (`mantequilla`) | comida, hecha_a_mano, regalo | 2 jarros de leche | — | 0.5 |
| canasta de picnic (`canasta`) | comida | (nada: se hace en la cocina) | — | 0.5 |
| frasco de tinte para el pelo (`tinte`) | tienda | — | — | 0.3 |
| bolsita de caramelos de menta (`caramelos`) | dulce, comida, regalo | — | — | 0.1 |
| huevo (`huevos`) | comida, cosecha | — | 1 | 0.05 |

Gustos de la tienda (precio en trueque): cinta para el pelo 3, bolsita de caramelos de menta 1. A la libreta de los Cuthbert: taza de azúcar, cuerda, cortes de tela.

## 6. Los lugares

| Lugar | Nombre | Qué se puede hacer ahí |
|---|---|---|
| `casa_bell` | la casa de Robert Bell | — |
| `h:br` | la estación de Bright River | — |
| `h:rl` | la casa de la Sra. Lynde | — |
| `camino` | el camino de Bright River | — |
| `gallinero` | el gallinero | recoger huevo |
| `granero` | el granero | tomar cuerda |
| `corral` | el corral | soltar una vaca |
| `potrero` | el potrero del Sr. Harrison | soltar una vaca |
| `huerta` | la huerta | recoger ramo de flores |
| `arbustos` | los arbustos de bayas | recoger baya |
| `huerto` | el huerto de los Barry | recoger manzana |
| `cocina` | la cocina de Tejas Verdes | tomar frasco de jarabe de ipecacuana |
| `tienda` | la tienda de Lawson | trueque y libreta (de 8 a 18) |
| `escuela` | la escuela | — |
| `casa_parroquial` | la casa parroquial | — |
| `bosque_peg` | el bosque de Peg Bowen | recoger manojo de hierbas |
| `aldea` | la aldea | — |
| `iglesia` | la iglesia | — |
| `salon` | el salón del pueblo | — |
| `colina` | la colina | — |
| `campo` | el campo de heno | — |
| `lago` | el lago | — |

Además: `cocina` es adentro de Tejas Verdes, `h:casa` adentro de cualquier otra casa, `p:quien` el punto del mapa donde está esa persona y `c:vaca` donde está una vaca suelta.

## 7. Las personas

| Persona | Carácter | Le gusta | Compra / vende | Cocina en | Otros |
|---|---|---|---|---|---|
| Ana (`ana`) | soñadora, orgullosa, rencorosa | flores, hecha_a_mano, lectura, ropa | — | la cocina de Tejas Verdes | camina a 46 · enfoque 0.3, social 0.8 |
| Matthew (`matthew`) | tímido, generoso | hecha_a_mano, comida | — | la cocina de Tejas Verdes | tiene 5 dólares · camina a 36 · enfoque 0.7, social 0.1 |
| Marilla (`marilla`) | severo, generoso | hecha_a_mano | — | la cocina de Tejas Verdes | no sale de casa · camina a 38 · enfoque 0.9, social 0.4 |
| Diana (`diana`) | sensible, generoso | flores, comida, adorno, lectura | — | — | tiene 1 libro · camina a 44 · enfoque 0.6, social 0.8 |
| Sra. Barry (`barry`) | severo | flores | — | — | no sale de casa · camina a 38 · enfoque 0.9, social 0.3 |
| Sra. Lynde (`lynde`) | chismoso, severo | comida | — | — | camina a 40 · enfoque 0.4, social 1 |
| Sr. Harrison (`harrison`) | orgulloso | comida | — | — | tiene 1 cuerda · camina a 36 · enfoque 0.7, social 0.3 |
| Sr. Shearer (`shearer`) | — | — | compra vacas (20 dólares) | — | tiene 60 dólares · camina a 40 · enfoque 0.8, social 0.4 |
| Gilbert Blythe (`gilbert`) | orgulloso, generoso | comida | — | — | camina a 46 · enfoque 0.8, social 0.5 |
| la Sra. Allan (`sraallan`) | generoso, sensible | hecha_a_mano, flores | — | la casa parroquial | camina a 40 · enfoque 0.6, social 0.7 |
| Peg Bowen (`peg`) | orgulloso | hierba | — | — | camina a 38 · enfoque 0.5, social 0.2 |
| el médico (`medico`) | generoso | — | — | — |  |
| el buhonero (`buhonero`) | — | — | trueque | — |  |
| Sr. Lawson (`lawson`) | generoso | — | trueque | — | abre de 8 a 18 · camina a 38 · enfoque 0.9, social 0.5 |

Reglas sociales (las mismas en el plan y en el mundo): pedir funciona si el otro te quiere ≥ 2 o es generoso; un regalo con una etiqueta que le gusta sube el cariño (una vez al día); disculparse sube el cariño (+2 si es sensible o generoso); interceder exige que el destinatario quiera ≥ 4 a quien habla.

## 8. Las rutinas de metas (la agenda de cada uno)

Cada día, a su hora, el juego le da a cada uno estas metas (prioridad 1: lo que pide otro o lo que tiene hora límite va antes; como mucho una vez al día). Entre una y otra sigue la rutina de lugares de siempre. Lo de Ana, y lo que le piden por rutina, solo con 🤖. Se apaga con el interruptor del panel 🎯 o al lanzar una meta de prueba.

| Hora | Quién | Meta | Cuándo |
|---|---|---|---|
| 6:00–9:00 | Matthew | dar de comer a los animales | todos los días |
| 6:00–9:30 | Matthew | ordeñar y llevarle la leche a Marilla | `!realR.fact('ordeñada:dolly') && cowIn('dolly', 'corral')` |
| 9:30–12:00 | Matthew | hacer heno | verano · `!realR.fact('heno_hecho')` |
| 9:30–12:00 | Matthew | partir leña para Marilla | otoño, invierno |
| 8:30–11:30 | Marilla | batir mantequilla | `(wmInv('marilla').leche \|\| 0) >= 2` |
| 13:00–15:00 | Marilla | encargarle los quehaceres a Ana *(con 🤖)* | todos los días |
| 17:00–19:00 | Marilla | regañar a Ana por los quehaceres *(con 🤖)* | `realR.fact('falta:ana')` |
| 14:00–16:30 | Sra. Lynde | visitar a Marilla | `today() % 2 === 0` |
| 14:00–16:30 | Sra. Lynde | visitar a la Sra. Barry | `today() % 2 === 1` |
| 15:00–17:00 | Diana | dar un paseo con Ana *(con 🤖)* | primavera, verano, otoño · `!isSunday()` |
| 7:30–8:30 | Ana | ir a clases *(con 🤖)* | primavera, otoño, invierno · `!isSunday()` |
| 12:30–14:30 | Ana | la tarde libre *(con 🤖)* | todos los días |
| 20:00–22:00 | Ana | decir sus oraciones *(con 🤖)* | todos los días |
| 8:48–10:00 | Matthew | ir a la iglesia | los domingos |
| 8:48–10:00 | Sra. Lynde | ir a la iglesia | los domingos |
| 8:48–10:00 | Diana | ir a la iglesia | los domingos |
| 8:48–10:00 | Ana | ir a la iglesia *(con 🤖)* | los domingos |

Un día completo, dibujado en el mapa: `node tools/trace_goal.js dia [--season 0..3] [--domingo] --out dia.png` (ejemplos en `trazas/`).

## 8. Las metas de prueba (panel 🎯)

| # | Quién | Meta | Favores que se le sugieren |
|---|---|---|---|
| 0 | Ana | Vender la vaca | — |
| 1 | Ana | Conseguir una cinta para el pelo (trueque) | — |
| 2 | Ana | Regalarle a Marilla algo que le guste | — |
| 3 | Ana | Reconciliarse con Diana | — |
| 4 | Ana | Ir a clases: llegar a la escuela antes de las 9 y quedarse hasta el mediodía | — |
| 5 | Ana | Devolver la vaca escapada del Sr. Harrison | — |
| 6 | Matthew | Matthew le trae azúcar a Marilla | — |
| 7 | Matthew | Matthew encierra a Dolly | — |
| 8 | Marilla | Marilla quiere compota para el invierno | traer → Ana |
| 9 | Diana | Diana quiere dar un paseo con Ana hasta el lago | pasear → Ana |
| 10 | Sra. Lynde | La Sra. Lynde quiere enterarse de la venta | — |
| 11 | Sr. Harrison | El Sr. Harrison quiere a la vaca fuera de su avena | encerrar_vaca → Matthew |
| 12 | Sr. Shearer | El Sr. Shearer quiere comprar una vaca | vender_vaca → Matthew |
| 13 | Gilbert Blythe | Gilbert quiere que Ana le hable | — |
| 14 | la Sra. Allan | La Sra. Allan invita a Ana a tomar el té por la tarde (se encuentran en la iglesia) | venir → Ana |
| 15 | Peg Bowen | Peg Bowen junta hierbas | — |
| 16 | Marilla | Marilla necesita azúcar: se la pide a Matthew, que va a la tienda | — |
| 17 | Sra. Barry | La Sra. Barry quiere compota: se la pide a Diana, y Diana a Ana | — |
| 18 | Gilbert Blythe | Gilbert le pide a Diana que hable con Ana por él | — |
| 19 | Sr. Harrison | El Sr. Harrison, enfermo en cama, le pide a Ana que devuelva su vaca | — |
| 20 | Matthew | Ana le pide a Matthew que le traiga huevos *(Ana pide el favor)* | — |
| 21 | Matthew | Matthew con dos metas: azúcar para Marilla y encerrar a Dolly *(varias metas)* | — |
| 22 | Ana | Ana con tres metas: una cinta para ella, un regalo para Diana y azúcar para Marilla *(varias metas)* | — |
| 23 | Matthew | Matthew encierra a Dolly y, ocupado, acepta además traerle huevos a Ana *(Ana pide el favor)* *(varias metas)* | — |
| 24 | Ana | Ana quiere una cinta, pero antes tiene clases (de 9 a 12) *(varias metas)* | — |
| 25 | Ana | Regalar una tarta de bayas en invierno (imposible) | — |
| 26 | Marilla | Marilla le pide a Ana lavar los platos y barrer la cocina (cap. 4, 8) | quehaceres → Ana |
| 27 | Matthew | Matthew ordeña las vacas y le lleva la leche a Marilla (cap. 6, 10) | — |
| 28 | Matthew | Matthew les da de comer a los animales (cap. 21) | — |
| 29 | Ana | Ana visita a la Sra. Lynde (cap. 9, 10) | — |
| 30 | Ana | Ana le pide prestado un libro a Diana (cap. 12, 18) | prestar → Diana |
| 31 | Ana | Ana le devuelve el libro a Diana (cap. 21, 30) | — |
| 32 | Ana | Ana y Diana juran ser amigas del alma (cap. 12) | — |
| 33 | Ana | Gilbert ya se disculpó: Ana lo perdona y hacen las paces (cap. 38) | — |
| 34 | Ana | El Sr. Harrison está enfermo: Ana lo cuida con jarabe de ipecacuana (cap. 18) | — |
| 35 | Ana | El Sr. Harrison está enfermo y no queda jarabe en casa: Ana va a buscar al médico (cap. 18) | — |
| 36 | Ana | Ana estudia la lección y la recita en la escuela (cap. 17, 24) | — |
| 37 | Ana | Ana dice sus oraciones (cap. 7) | — |
| 38 | Marilla | Marilla cose un vestido con mangas abullonadas (le piden la tela a la tienda) (cap. 25) | — |
| 39 | Ana | Ana adorna su sombrero con flores (cap. 11) | — |
| 40 | Ana | Ana rema en el lago (cap. 28) | — |
| 41 | Ana | Ana le pone nombre a tres lugares (cap. 2, 12) | — |
| 42 | Marilla | A Ana se le olvidaron los quehaceres: Marilla la manda llamar y la regaña (cap. 26) | — |
| 43 | Ana | Ana invita a Diana a tomar el té en Tejas Verdes (cap. 16) | venir → Diana |
| 44 | Matthew | Matthew lleva a Ana en la calesa hasta la aldea (cap. 2, 25) | — |
| 45 | Ana | Ana le escribe una carta a la Srta. Stacy y la manda por correo (cap. 36) | — |
| 46 | Ana | Ana lee el libro que le prestaron (cap. 18, 30) | — |
| 47 | Ana | Ana escribe un cuento y se lo lee a Diana en el club de cuentos (cap. 26) | — |
| 48 | Ana | Ana ensaya y recita en el concierto del salón (cap. 19, 24, 33) | — |
| 49 | Ana | Ana decora el salón con flores para el concierto (cap. 24) | — |
| 50 | Ana | Diana recitó en el concierto: Ana la felicita (cap. 24) | — |
| 51 | Ana | A Diana le prohibieron ver a Ana y está triste: Ana la consuela (cap. 16) | — |
| 52 | Matthew | Matthew hace heno en el campo (cap. 28, 32) | — |
| 53 | Matthew | Matthew parte leña para la cocina de Marilla (cap. 15) | — |
| 54 | Marilla | Marilla bate mantequilla con la leche de la mañana (cap. 8) | — |
| 55 | Ana | Ana siembra y riega la huerta (cap. 13) | — |
| 56 | Ana | Ana patina en el lago helado (invierno) | — |
| 57 | Ana | Ana se tira en trineo por la colina (invierno) | — |
| 58 | Ana | Ana le pide permiso a Marilla y va de picnic al lago con Diana (cap. 13, 14) | pasear → Diana |
| 59 | Ana | Ana le compra tinte al buhonero y se tiñe el pelo… verde (cap. 27) | — |
| 60 | Ana | Marilla le corta a Ana el pelo verde (cap. 27) | — |
| 61 | Ana | Josie desafía a Ana a caminar por el techo de los Barry (cap. 23) | — |

Cómo se cumplió cada una, dibujado en el mapa: [`trazas/metas.pdf`](../trazas/metas.pdf) (`node tools/trace_goal.js --pdf trazas/metas.pdf`).
