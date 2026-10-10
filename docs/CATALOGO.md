# Catálogo del modelo del mundo

> Generado por `node tools/catalogo.js` a partir de los datos del juego (no editar a mano). La explicación de cómo se usa todo esto para planificar está en [PLANIFICADOR.md](PLANIFICADOR.md).

## 1. El estado (lo que el planificador sabe del mundo)

Un estado es una foto del mundo hecha de datos (`wmNow()`), y el planificador trabaja sobre copias de ella. Sus componentes:

| Componente | Qué guarda | Ejemplo |
|---|---|---|
| `t` | la hora, en minutos desde la medianoche | `792.06664` (= 13:12.066640000000007) |
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
| `acompana(a, b)` | a acompaña a b | 0 / 1 |
| `te_con(quien, invitado, lugar)` | los dos están en el lugar y quien tiene té | 1 por cada cosa que falte |
| `regalar_cosa(quien, cosa)` | esa cosa fue regalada | 0 / 1 si la tiene / 2 |

## 4. Los favores (lo que se le puede pedir a otro)

Pedir un favor es una acción más; si el otro acepta, en el mundo se le instala una **meta propia** (y él puede, a su vez, pedirle a un tercero: cadenas de hasta tres).

| Favor | Se puede pedir si… | Lo que hace verdadero | Meta que recibe quien acepta | Espera (min) |
|---|---|---|---|---|
| `traer` cosa, n | no es a uno mismo; un quieto solo si ya la tiene | quien pide tiene n más | `tener(quien pide, cosa, n)` | 45 |
| `vender_vaca` | se le pide a un Cuthbert y la vaca no está vendida | la vaca vendida a quien pide | `vaca_vendida` | 45 |
| `encerrar_vaca` | no es quieto y nadie lleva ni compró la vaca | la vaca en su corral | `vaca_en` | 45 |
| `interceder` por alguien | el destinatario quiere ≥ 4 a quien intercede | (+1 de cariño hacia quien pide) | `intercede` | 20 |
| `pasear` | con Ana | quien pide la acompaña | — | — |
| `venir` | a Ana | Ana acompaña a quien pide | — | — |

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
| bolsita de caramelos de menta (`caramelos`) | dulce, comida, regalo | — | — | 0.1 |
| huevo (`huevos`) | comida, cosecha | — | 1 | 0.05 |

Gustos de la tienda (precio en trueque): cinta para el pelo 3, bolsita de caramelos de menta 1. A la libreta de los Cuthbert: taza de azúcar, cuerda.

## 6. Los lugares

| Lugar | Nombre | Qué se puede hacer ahí |
|---|---|---|
| `gallinero` | el gallinero | recoger huevo |
| `granero` | el granero | tomar cuerda |
| `corral` | el corral | soltar una vaca |
| `potrero` | el potrero del Sr. Harrison | soltar una vaca |
| `huerta` | la huerta | recoger ramo de flores |
| `arbustos` | los arbustos de bayas | recoger baya |
| `huerto` | el huerto de los Barry | recoger manzana |
| `cocina` | la cocina de Tejas Verdes | cocinar (los de Tejas Verdes) |
| `tienda` | la tienda de Lawson | trueque y libreta (de 8 a 18) |
| `escuela` | la escuela | — |
| `casa_parroquial` | la casa parroquial | — |
| `bosque_peg` | el bosque de Peg Bowen | recoger manojo de hierbas |
| `aldea` | la aldea | — |
| `lago` | el lago | — |

Además: `cocina` es adentro de Tejas Verdes, `h:casa` adentro de cualquier otra casa, `p:quien` el punto del mapa donde está esa persona y `c:vaca` donde está una vaca suelta.

## 7. Las personas

| Persona | Carácter | Le gusta | Compra / vende | Cocina en | Otros |
|---|---|---|---|---|---|
| Ana (`ana`) | soñadora, orgullosa, rencorosa | flores, hecha_a_mano | — | la cocina de Tejas Verdes | camina a 46 · enfoque 0.3, social 0.8 |
| Matthew (`matthew`) | tímido, generoso | hecha_a_mano, comida | — | la cocina de Tejas Verdes | tiene 5 dólares · camina a 36 · enfoque 0.7, social 0.1 |
| Marilla (`marilla`) | severo, generoso | hecha_a_mano | — | la cocina de Tejas Verdes | no sale de casa · camina a 38 · enfoque 0.9, social 0.4 |
| Diana (`diana`) | sensible, generoso | flores, comida, adorno | — | — | camina a 44 · enfoque 0.6, social 0.8 |
| Sra. Barry (`barry`) | severo | flores | — | — | no sale de casa · camina a 38 · enfoque 0.9, social 0.3 |
| Sra. Lynde (`lynde`) | chismoso, severo | comida | — | — | camina a 40 · enfoque 0.4, social 1 |
| Sr. Harrison (`harrison`) | orgulloso | comida | — | — | tiene 1 cuerda · camina a 36 · enfoque 0.7, social 0.3 |
| Sr. Shearer (`shearer`) | — | — | compra vacas (20 dólares) | — | tiene 60 dólares · camina a 40 · enfoque 0.8, social 0.4 |
| Sr. Lawson (`lawson`) | generoso | — | trueque | — | abre de 8 a 18 · camina a 38 · enfoque 0.9, social 0.5 |
| Gilbert Blythe (`gilbert`) | orgulloso, generoso | comida | — | — | camina a 46 · enfoque 0.8, social 0.5 |
| la Sra. Allan (`sraallan`) | generoso, sensible | hecha_a_mano, flores | — | la casa parroquial | camina a 40 · enfoque 0.6, social 0.7 |
| Peg Bowen (`peg`) | orgulloso | hierba | — | — | camina a 38 · enfoque 0.5, social 0.2 |

Reglas sociales (las mismas en el plan y en el mundo): pedir funciona si el otro te quiere ≥ 2 o es generoso; un regalo con una etiqueta que le gusta sube el cariño (una vez al día); disculparse sube el cariño (+2 si es sensible o generoso); interceder exige que el destinatario quiera ≥ 4 a quien habla.

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
| 9 | Diana | Diana quiere pasear con Ana | pasear → Ana |
| 10 | Sra. Lynde | La Sra. Lynde quiere enterarse de la venta | — |
| 11 | Sr. Harrison | El Sr. Harrison quiere a la vaca fuera de su avena | encerrar_vaca → Matthew |
| 12 | Sr. Shearer | El Sr. Shearer quiere comprar una vaca | vender_vaca → Matthew |
| 13 | Gilbert Blythe | Gilbert quiere que Ana le hable | — |
| 14 | la Sra. Allan | La Sra. Allan quiere tomar el té con Ana | venir → Ana |
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

Cómo se cumplió cada una, dibujado en el mapa: [`trazas/metas.pdf`](../trazas/metas.pdf) (`node tools/trace_goal.js --pdf trazas/metas.pdf`).
