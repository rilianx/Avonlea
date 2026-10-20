# El juez de la noche, calibrado contra las notas de Claude

Dos calibraciones sobre las mismas 40 escenas (notas-claude.json, primera corrida):

| Calibración | Juez | Correlación | Coincide en las que fallan | Elige bien (de las 4 mejores) | Se contradice |
|---|---|---|---|---|---|
| 1 (commit 8e60118) | gpt-5.4-mini | 0,42 | 20/40 | 13/20 | 1,88 |
| 1 (commit 8e60118) | gpt-5.4 | 0,64 | 33/40 | 16/20 | 1,48 |
| **2 (7c1a9f4: el «usted» de Ana a los grandes está bien)** | **gpt-5.4** | **0,72** | **34/40** | **16/20** | **1,15** |

El juez del juego es gpt-5.4 (NOCHE_JUEZ_MODELO; si la clave no lo tiene, el modelo de la noche). Sigue más blando que
Claude en lo concreto y la forma (A5, A6, A9) y más duro en lo que inspira (A7).

---

## Calibración 2 (gpt-5.4)

Escenas: 40 (`trazas/temas/notas-claude.json`, juzgadas a mano con trazas/temas/rubrica.md) · partida `tools/noche/partidas/curiosa.json` · 2 vez/veces por modelo

El juez ve las escenas de a una versión por vez (8, como los candidatos de una noche). «Elige bien» = de las 4 mejores de cada grupo según Claude, cuántas están entre las 4 que elegiría el juez (nocheElegir, sin la regla de una por persona).

| Modelo | Escenas juzgadas | Error medio por criterio (0–2) | Error del total (de 18) | Correlación del total | Media del juez / de Claude | Coincide en las que fallan | Elige bien (de las 4 mejores) | Se contradice (total, entre veces) |
|---|---|---|---|---|---|---|---|---|
| gpt-5.4 | 40 | 0.35 | 1.60 | 0.72 | 12.4 / 11.8 | 34/40 | 16/20 | 1.15 |

## Por criterio (error medio; media del juez y de Claude)

| Criterio | gpt-5.4 |
|---|---|
| A1 | 0.40 (1.13 / 0.97) |
| A2 | 0.30 (1.13 / 1.02) |
| A3 | 0.13 (1.43 / 1.35) |
| A4 | 0.50 (1.25 / 1.55) |
| A5 | 0.38 (1.55 / 1.23) |
| A6 | 0.25 (1.55 / 1.35) |
| A7 | 0.53 (1.32 / 1.75) |
| A8 | 0.30 (1.10 / 0.95) |
| A9 | 0.38 (2.00 / 1.63) |

## Escena por escena (Claude · cada modelo, primera vez)

| Escena | Claude | gpt-5.4 |
|---|---|---|
| base `ia_marilla_tarta_agria` | 11 (1 2 1 1 1 1 1 1 2) | 15 (0 2 1 2 2 2 2 2 2) |
| base `ia_matthew_semillas_violetas` | 14 (2 2 1 1 1 2 2 1 2) | 15 (2 2 1 1 2 2 1 2 2) |
| base `ia_cecily_tia_hetty` | 13 (1 1 2 2 1 1 2 1 2) | 15 (1 1 2 1 2 2 2 2 2) |
| base `ia_felicity_orden_secreto` | 12 (1 0 2 2 1 1 2 1 2) | 11 (1 0 2 1 1 1 1 2 2) |
| base `ia_marilla_gorro` | 13 (1 2 2 1 2 1 2 1 1) | 16 (2 2 2 2 2 2 1 1 2) |
| base `ia_matthew_arrugas` | 14 (2 2 1 2 1 2 2 1 1) | 15 (2 2 1 2 1 2 2 1 2) |
| base `ia_alec_bolsa` | 10 (0 2 1 2 1 1 1 1 1) | 12 (0 1 2 1 2 2 1 1 2) |
| base `ia_felicity_tarta` | 7 (0 0 1 1 1 1 1 1 1) | 12 (1 0 1 1 2 2 1 2 2) |
| rubrica `ia_marilla_16_tarta_receta` | 13 (1 2 1 2 1 1 2 1 2) | 16 (2 2 2 2 1 2 1 2 2) |
| rubrica `ia_matthew_16_jerry` | 13 (0 2 1 2 1 2 2 1 2) | 10 (0 1 1 1 1 2 1 1 2) |
| rubrica `ia_cecily_16_hojas` | 13 (0 0 2 2 2 1 2 2 2) | 12 (0 1 2 1 2 1 1 2 2) |
| rubrica `ia_felicity_16_ensalada` | 12 (1 0 2 1 1 1 2 2 2) | 11 (0 0 2 1 2 1 1 2 2) |
| rubrica `ia_marilla_16` | 17 (2 2 2 2 2 2 2 1 2) | 15 (0 2 2 2 2 2 1 2 2) |
| rubrica `ia_matthew_16` | 15 (2 2 1 2 1 2 2 1 2) | 14 (2 2 1 2 1 2 1 1 2) |
| rubrica `ia_carrie_16` | 8 (0 0 1 2 1 1 1 1 1) | 9 (0 0 1 1 1 1 1 2 2) |
| rubrica `ia_felicity_16` | 11 (1 0 2 1 1 1 2 1 2) | 13 (0 0 2 1 2 2 2 2 2) |
| ejemplo `ia_marilla_tarta_y_genio` | 12 (1 0 1 2 1 2 2 1 2) | 14 (2 2 1 2 1 2 1 1 2) |
| ejemplo `ia_matthew_semillas_de_verano` | 11 (1 0 1 1 1 2 2 1 2) | 15 (2 2 1 2 1 2 2 1 2) |
| ejemplo `ia_cecily_ventana_y_nombre` | 14 (1 0 2 2 2 1 2 2 2) | 12 (1 1 2 1 2 1 1 1 2) |
| ejemplo `ia_felicity_ojos_y_mermelada` | 13 (1 2 2 1 1 1 2 1 2) | 13 (1 1 2 1 2 1 2 1 2) |
| ejemplo `ia_marilla_huerto_helado` | 15 (2 2 1 2 2 2 2 1 1) | 14 (2 2 1 1 2 2 1 1 2) |
| ejemplo `ia_matthew_violetas_2` | 16 (2 2 2 1 2 2 2 2 1) | 16 (2 2 2 1 2 2 2 1 2) |
| ejemplo `ia_cecily_ventana_ranita` | 10 (1 0 2 1 1 1 1 2 1) | 9 (1 0 2 0 1 1 1 1 2) |
| ejemplo `ia_felicity_orden_del_dia` | 8 (1 0 1 1 1 1 1 1 1) | 11 (1 0 1 1 2 1 2 1 2) |
| plan `ia_carrie_hermana_mandona` | 8 (0 0 1 2 1 1 1 1 1) | 9 (1 0 1 1 1 1 1 1 2) |
| plan `ia_felicity_tarta_que_no_salio` | 10 (1 0 1 1 1 1 2 1 2) | 9 (1 0 1 1 1 1 1 1 2) |
| plan `ia_marilla_raices` | 14 (0 2 2 2 2 1 2 1 2) | 15 (0 2 2 2 2 2 2 1 2) |
| plan `ia_matthew_semillas_verano` | 13 (1 2 1 1 1 2 2 1 2) | 14 (2 2 1 2 1 2 1 1 2) |
| plan `ia_marilla_traer` | 11 (2 1 0 2 1 2 1 1 1) | 14 (2 2 1 2 1 2 1 1 2) |
| plan `ia_cecily_silencio` | 9 (1 0 1 1 1 1 2 1 1) | 11 (1 0 2 1 2 1 1 1 2) |
| plan `ia_felicity_heladera` | 9 (0 0 1 2 1 1 2 1 1) | 7 (0 0 1 0 1 1 1 1 2) |
| plan `ia_matthew_ward` | 16 (1 2 2 2 1 2 2 2 2) | 15 (1 2 2 1 2 1 2 2 2) |
| todo `ia_marilla_taza` | 11 (1 2 1 1 1 1 2 0 2) | 11 (2 2 1 1 1 1 1 0 2) |
| todo `ia_matthew_brote` | 13 (1 2 1 2 1 2 2 0 2) | 14 (2 2 1 2 1 2 2 0 2) |
| todo `ia_alec_casa` | 11 (0 2 1 2 1 1 2 0 2) | 12 (2 1 1 1 2 2 1 0 2) |
| todo `ia_carrie_secreto` | 8 (1 0 1 2 1 1 1 0 1) | 8 (1 0 1 1 1 1 1 0 2) |
| todo `ia_matthew_semillas` | 14 (2 1 2 1 2 2 2 0 2) | 13 (2 2 1 1 1 2 2 0 2) |
| todo `ia_cecily_libro` | 12 (1 0 2 2 2 1 2 0 2) | 11 (1 0 2 1 2 1 2 0 2) |
| todo `ia_felicity_pudor` | 7 (1 0 1 1 1 1 1 0 1) | 9 (1 0 1 1 2 1 1 0 2) |
| todo `ia_marilla_tarta_limon` | 11 (1 2 1 1 1 1 2 0 2) | 11 (1 2 1 1 2 1 1 0 2) |

## Lo que dijo el juez

### gpt-5.4

- `ia_marilla_tarta_agria` (15; Claude 11): Falla en A1 porque Marilla dice «tu tarta de ayer no estaba mal», y no consta en la partida ninguna tarta de ayer: lo ya conversado habla de un pastel, pero no de esa escena situada así en el tiempo. En lo demás, la escena sigue muy bien la conversación previa del pastel y la lleva a un paso nuevo con «la receta de la madre de usted», pero la revelación es más bien pequeña: hay consejo, elogio y un poco de pasado, no un cambio fuerte.
- `ia_matthew_semillas_violetas` (15; Claude 14): Se apoya bien en cosas concretas de esta partida —las violetas, las capuchinas y el huertito con Matthew—, así que A1 y A6 suben. Pero A3 se queda en confirmación cariñosa más que en revelación nueva, y A4 no destaca tanto porque vuelve sobre asuntos ya muy hablados entre ambos; da un paso, sí, pero corto.
- `ia_cecily_tia_hetty` (15; Claude 13): No contradice nada, pero tampoco nace de un hecho concreto de esta partida, así que A1 se queda en 1. La voz de Cecily se reconoce, aunque por momentos habla con una soltura un poco pareja a la de Ana; aun así, la escena logra una revelación buena sobre Hetty («antes también soñaba») y pone el tema de la ternura familiar en el centro.
- `ia_felicity_orden_secreto` (11; Claude 12): Baja a 0 en A2 por el trato: Ana y Felicity son niñas y aquí aparece «¿Y nunca deja usted una sola cosa desordenada...?»; entre ellas debe ir de tú. Además, aunque la confesión de Felicity («si la cocina está en paz, yo también») es buena, la escena no se apoya en un momento concreto ya jugado y el tema del libro entra más de paso que en el centro.
- `ia_marilla_gorro` (16; Claude 13): Está muy bien anclada en lo ya conversado sobre mangas abullonadas y adornos, y lo continúa con un paso nuevo: no repite el deseo de Ana, sino que descubre el miedo de Marilla a «la lengua de la gente». No le doy 2 en A7 ni en A8 porque, aunque está muy lograda, las dos opciones dejan consecuencias bastante cercanas: ambas terminan en una concesión tibia de Marilla.
- `ia_matthew_arrugas` (15; Claude 14): Destaca por nacer de un hecho inmediato de la partida, «ropa_arrugada», y por convertirlo en algo emocional sin inventar nada. La novedad está más en matizar el vínculo que en revelar algo hondo, y las dos opciones se parecen bastante en resultado: una busca consuelo y la otra propósito, pero ambas dejan casi el mismo poso.
- `ia_alec_bolsa` (12; Claude 10): Falla en A1 porque el propio planteo dice «en la granja de Rose Cottage», y Alec King no vive allí sino en la Granja King. La escena, aparte de eso, funciona y encuentra algo verdadero en el personaje, pero no tiene una voz tan singular como para destacar más, y las opciones abren poco el mundo: afinan el mismo retrato en vez de bifurcarlo de veras.
- `ia_felicity_tarta` (12; Claude 7): Vuelve a caer A2 por el trato entre niñas: «Usted habla como si la harina fuera un ejército» no corresponde entre Ana y Felicity. También es una escena menos nueva de lo que parece: el orgullo cocinero de Felicity ya viene dado por el personaje y aquí se confirma más que descubrirse, aunque el tema del orgullo sí queda al centro.
- `ia_marilla_16_tarta_receta` (16; Claude 13): Sigue muy bien lo ya hablado con Marilla sobre el pastel y la paciencia, y la opción de «la receta de su madre» da un paso nuevo. No la subiría más en temas e inspiración porque, aunque tiene líneas lindas («La vida es más severa que una tarta»), el centro sigue siendo una lección doméstica más que uno de los grandes temas del libro.
- `ia_matthew_16_jerry` (10; Claude 13): Falla en verdad de la partida por «Me alegró verlo defenderlo ante Marilla el otro día»: eso no figura en lo pasado. Además, Matthew suena bastante bien pero algo más hablado de la cuenta, y una opción deja un efecto torcido («suma paciencia:ana:marilla 1») que no corresponde a esta charla con él.
- `ia_cecily_16_hojas` (12; Claude 13): La escena revela algo bueno de Cecily, pero cae en un error de partida: el resumen la pone «en Rose Cottage», cuando Cecily vive en la granja King. También es delicada en el tema de crecer sin volverse áspera, aunque no remata con una imagen tan inolvidable como para un 2 claro en inspiración.
- `ia_felicity_16_ensalada` (11; Claude 12): Aquí el trato está mal desde la primera línea: Ana le dice «usted» a Felicity, y entre niñas deben tutearse; por eso falla también en voz y época. Además, aunque la confesión de Felicity sobre ponerse nerviosa añade algo, el marco de «hablar de cocinar» es bastante común y no pasa de un concreto general.
- `ia_marilla_16` (15; Claude 17): Aprovecha muy bien una conversación previa real («ya sé contar hasta diez»), pero luego mete «romper una pizarra con la cabeza de otra persona», que no ha pasado en esta partida. Por lo demás, sí avanza con un paso nuevo sobre el genio, y Marilla deja ver algo suyo en «a veces, si nadie me mira, sonrío para mí sola».
- `ia_matthew_16` (14; Claude 15): Esta sí nace de un cabo suelto verdadero de la partida («Marilla le pidió a Matthew: traer») y lo usa con gracia. Lo que revela es más bien pequeño —la torpeza nerviosa de Matthew—, y las dos opciones cambian poco el mundo: son dos variantes tiernas de la misma cercanía.
- `ia_carrie_16` (9; Claude 8): Falla en verdad de la partida y en el trato: Carrie no es «la más pequeña en una casa llena de hermanas mayores», y Ana le dice «usted» a otra niña. Tiene un momento amable con el manzano del patio, pero fuera de eso queda bastante ligera y genérica.
- `ia_felicity_16` (13; Claude 11): Otra vez se cae por el trato: Ana le habla de «usted» a Felicity, lo que desentona para dos niñas. Aun así, el orgullo de Felicity queda bien entendido y la frase «El orgullo trabaja más de lo que la gente cree» sí tiene fuerza propia; además, las opciones abren dos salidas distintas, una sobre la fantasía de Ana y otra sobre el fracaso práctico.
- `ia_marilla_tarta_y_genio` (14; Claude 12): No revela gran cosa nueva de fondo: más bien confirma que Marilla se fijó en el progreso de Ana y la corrige a su manera, así que el cambio queda en 1 en A3. El tema del libro aparece, pero no manda del todo: hay crecimiento y utilidad doméstica, aunque la escena se apoya más en el intercambio gracioso que en un conflicto central. Las opciones responden distinto, pero no dejan consecuencias distintas fuera del tono de la charla.
- `ia_matthew_semillas_de_verano` (15; Claude 11): La escena está muy bien anclada en algo concreto de esta partida, las semillas de capuchina que Matthew ya le dio a Ana. Aun así, lo que cambia es leve: Matthew añade una idea bonita sobre esperar y prometer, pero no se revela un pasado ni da un giro a la relación. Las opciones son distintas, aunque más interiores que efectivas en el mundo.
- `ia_cecily_ventana_y_nombre` (12; Claude 14): Funciona porque sí revela algo de Cecily —"teme quedarse sin palabras"— y además mueve la relación hasta un casi-juramento de amistad. Pero, frente a lo ya conversado, no queda claro qué retoma de manera precisa: es nueva, sí, aunque no enlaza con un cabo previo concreto de esta partida. También es una timidez infantil bastante general; salvo el roce con Josie y la frase final, podría pasar en otras partidas parecidas.
- `ia_felicity_ojos_y_mermelada` (13; Claude 13): Lo mejor es que debajo del orgullo de Felicity aparece otra cosa: "si me equivoco, parece que el error se queda mirándome desde la mesa", y ahí sí hay revelación. Pero la base es menos propia de esta partida: no nace de un hecho concreto ya ocurrido entre Ana y Felicity, y la situación de "niña hacendosa perfeccionista" es algo común. Las opciones abren dos matices distintos, aunque sin dejar una huella clara más allá de la conversación.
- `ia_marilla_huerto_helado` (14; Claude 15): Está bien asentada en esta partida por el huertito y por las semillas de capuchina que Matthew ya le dio a Ana. No avanza mucho la relación con Marilla: ella concede poco más que "puedes tener las dos cosas", de modo que el cambio es moderado. Las opciones muestran facetas distintas de Ana, pero no dejan consecuencias diferenciadas salvo el mismo tono de aprobación sensata.
- `ia_matthew_violetas_2` (16; Claude 16): Matthew suena muy suyo, y la escena deja una ternura clara cuando dice que Ana hace "más alegre la casa". Sin embargo, repite bastante de lo ya hablado entre ambos: ya estaba dicho que Matthew entiende sus violetas, las estrellas y su manera de mirar el mundo; aquí hay un paso más afectivo, pero no del todo nuevo. Las opciones cambian el matiz, no el estado de las cosas.
- `ia_cecily_ventana_ranita` (9; Claude 10): Falla en el trato: Ana le dice a Cecily "usted", "quédese" y "le gustaría", y entre niñas deben tutearse. Además repite en lo esencial la escena de la timidez de Cecily: otra vez "tengo miedo de hablar delante de gente" y Ana ofreciéndose a escucharla. Aunque hay una pequeña confesión nueva, se siente bastante genérica y cercana a lo ya hecho.
- `ia_felicity_orden_del_dia` (11; Claude 8): También falla el trato: Ana llama de "usted" a Felicity en toda la escena, y entre niñas corresponde tuteo. La charla tiene alguna gracia —"El esfuerzo no se come"—, pero el cambio es pequeño: solo se aprende que Felicity tolera la imaginación si no estorba. Fuera de eso, es una conversación bastante general sobre hacer bien las cosas.
- `ia_carrie_hermana_mandona` (9; Claude 8): Falla el trato: Ana le dice «usted» a Carrie, y entre niñas debe ir «tú»; eso baja A2 a 0. Además mete a Josie hablando de Carrie como si fueran de la misma casa o intimidad cotidiana («Josie me dice que callarme es lo mejor, y Gertie la copia»), cuando Carrie es Sloane y eso queda algo forzado para esta partida; no es falso seguro, pero sí poco nacido de esta relación. Las opciones sí cambian un poco la respuesta, pero ambas dejan casi lo mismo: consuelo y afecto.
- `ia_felicity_tarta_que_no_salio` (9; Claude 10): Otra vez falla el trato: Ana trata de «usted» a Felicity, siendo dos niñas; por la rúbrica eso deja A2 en 0. La escena revela algo verdadero del orgullo de Felicity y da un paso nuevo respecto de lo ya hablado, pero sigue siendo bastante general: podría pasar con casi cualquier muchacha orgullosa de cocinar. Las dos opciones distinguen algo, aunque el efecto en el mundo es el mismo y leve.
- `ia_marilla_raices` (15; Claude 14): Destaca porque toma el centro de la partida —si Ana pertenece de verdad a Tejas Verdes— y lo vuelve conversación concreta con Marilla; además usa bien que Ana ya sabe por qué la dejaron quedarse y su deseo de ser de la casa. La voz de Marilla está bastante lograda («Eso me parece una ambición sensata, por una vez»), aunque la mención de «la tía Josephine» chirría: Ana no conoce a Josephine Barry en esta partida. Las opciones sí matizan a Ana de modos distintos, pero el cambio exterior sigue siendo casi solo afecto.
- `ia_matthew_semillas_verano` (14; Claude 13): Matthew suena reconocible, con pocas palabras y un remate muy suyo («Bueno… yo no sabía que las promesas venían en paquetitos tan pequeños»). Además sigue muy bien algo ya conversado: ya le enseñó a sembrar y le dio semillas de capuchina, y aquí se profundiza en lo que significan. Las opciones difieren poco en efectos, pero ambas tienen respuesta propia y sostienen el tono.
- `ia_marilla_traer` (14; Claude 11): Aprovecha un cabo suelto real de la partida —que Marilla pidió a Matthew «traer» algo— y lo concreta sin inventar un melodrama; por eso A1 y A4 son fuertes. La voz de Marilla está bien y hay un humor seco logrado, pero la escena revela poco más que una necesidad doméstica y no cambia mucho la relación. Las tres opciones tienen respuestas distintas, aunque todas desembocan en el mismo pequeño juego de obediencia y utilidad.
- `ia_cecily_silencio` (11; Claude 9): Falla el trato en casi toda la escena: Ana y Cecily deberían tutearse, no decirse «usted», así que A2 cae a 0. Con todo, sí revela algo de Cecily —que calla por miedo a hablar mal y por la crianza de Hetty— y pone en el centro el tema de crecer siendo una misma. Las opciones abren matices distintos, pero el efecto práctico sigue siendo solo ganar confianza.
- `ia_felicity_heladera` (7; Claude 9): Tiene un problema de verdad de la partida: habla de «la cena de ayer» y de «nuestra mesa», pero ayer lo asentado es que Ana almorzó con Matthew y Marilla; no hay base para una cena compartida con Felicity. También repite bastante del terreno ya cubierto con Felicity en la otra escena: cocina, orgullo, hundimientos, apreciar el trabajo. Algunas líneas son vivas, pero el arranque falso pesa mucho.
- `ia_matthew_ward` (15; Claude 16): Matthew vuelve a sonar muy bien: callado, concreto, cuidador sin alarde, y con una frase muy propia («Las trompetas cansan»). La escena no inventa hechos nuevos, pero tampoco se apoya en un detalle tan concreto de esta partida como la de las semillas; aun así revela con claridad cómo quiere Matthew y cambia un poco la manera en que Ana lo entiende. Las opciones muestran facetas distintas de Ana —curiosa, recíproca, aprendiz— aunque todas dejan un efecto parecido.
- `ia_marilla_taza` (11; Claude 11): Se apoya bien en dos cosas ya habladas con Marilla —la cocina y la paciencia—, pero no llega a revelar nada nuevo de verdad: más bien reafirma que Ana debe atender y esperar. Como escena, avanza un poco sobre conversaciones previas, aunque el asunto sigue siendo bastante cercano a «enseñarme a cocinar» y por eso no destaca tanto en novedad ni en lo concreto. Las opciones no tienen respuesta de Marilla, solo la línea de Ana y efectos.
- `ia_matthew_brote` (14; Claude 13): Destaca porque nace de algo muy propio de esta partida: el huertito y las semillas que Matthew ya le dio a Ana, y además lo continúa con un paso nuevo, el brote. No cambia mucho la relación, pero sí deja una imagen bonita y un pequeño aprendizaje sobre esperar sin alardes. Las opciones fallan porque no reciben respuesta de Matthew.
- `ia_alec_casa` (12; Claude 11): No contradice nada y usa bien la red de los King y Rose Cottage, pero el hallazgo es más de tono que de revelación fuerte: Alec describe a las suyas con sobriedad, sin que cambie gran cosa entre él y Ana. El tema de la familia y la costumbre queda bien centrado, aunque la escena no tiene una frase muy perdurable. Las opciones tampoco tienen contestación.
- `ia_carrie_secreto` (8; Claude 8): Aquí falla el trato: Ana habla de «usted» con Carrie, y entre niñas debe tutearse. Además, la escena es amable pero bastante genérica; fuera de la mención de Josie, podría pasar casi en cualquier partida con cualquier compañera. Se aprende algo de Carrie, pero sin un giro fuerte, y las opciones no tienen respuesta.
- `ia_matthew_semillas` (13; Claude 14): Está bien anclada en la partida por las capuchinas que Matthew ya le regaló a Ana, pero repite bastante el terreno de la charla anterior sobre semillas y cuidado, solo con un matiz nuevo: que a él le gusta verla ocuparse de algo suyo. Tiene una imagen linda, «un puñado de futuro», aunque la escena no revela mucho más allá de ese cariño tranquilo. Las opciones vuelven a quedar sin respuesta de Matthew.
- `ia_cecily_libro` (11; Claude 12): También falla el trato: Ana dice «usted» a Cecily, y entre niñas debería ser «tú». La escena sí revela algo nuevo y bueno —que Cecily imagina mucho más de lo que dice—, con el tema de crecer siendo una misma en el centro; pero, salvo por ser Cecily tímida, el asunto de leer e imaginar sigue siendo algo bastante general. Las opciones no reciben contestación.
- `ia_felicity_pudor` (9; Claude 7): Otra vez falla el trato: Ana usa «usted» con Felicity. La conversación toca bien el orgullo y el esmero, pero no pasa de un reconocimiento mutuo; no cambia la relación de manera clara ni se apoya en algo muy específico de esta partida, quedándose en una escena bastante común de admirar la labor de otra niña. Las opciones, además, no tienen respuesta de Felicity.
- `ia_marilla_tarta_limon` (11; Claude 11): La voz de Marilla está bien, seca y útil, pero la escena no se apoya en un hecho concreto ya ocurrido: la crema cortada es solo un supuesto, no algo que venga de esta noche o de una elección previa. Aun así, lleva al centro un tema muy del libro —el orgullo frente a la utilidad, y aprender haciendo—, aunque dentro de un marco bastante común de cocina. Las opciones no tienen respuesta de Marilla.

---

## Calibración 1 (gpt-5.4-mini y gpt-5.4)


Escenas: 40 (`trazas/temas/notas-claude.json`, juzgadas a mano con trazas/temas/rubrica.md) · partida `tools/noche/partidas/curiosa.json` · 2 vez/veces por modelo

El juez ve las escenas de a una versión por vez (8, como los candidatos de una noche). «Elige bien» = de las 4 mejores de cada grupo según Claude, cuántas están entre las 4 que elegiría el juez (nocheElegir, sin la regla de una por persona).

| Modelo | Escenas juzgadas | Error medio por criterio (0–2) | Error del total (de 18) | Correlación del total | Media del juez / de Claude | Coincide en las que fallan | Elige bien (de las 4 mejores) | Se contradice (total, entre veces) |
|---|---|---|---|---|---|---|---|---|
| gpt-5.4-mini | 40 | 0.55 | 2.05 | 0.42 | 12.7 / 11.8 | 20/40 | 13/20 | 1.88 |
| gpt-5.4 | 40 | 0.39 | 1.68 | 0.64 | 12.3 / 11.8 | 33/40 | 16/20 | 1.48 |

## Por criterio (error medio; media del juez y de Claude)

| Criterio | gpt-5.4-mini | gpt-5.4 |
|---|---|---|
| A1 | 0.85 (1.82 / 0.97) | 0.20 (1.07 / 0.97) |
| A2 | 0.93 (0.65 / 1.02) | 0.30 (0.97 / 1.02) |
| A3 | 0.23 (1.38 / 1.35) | 0.20 (1.40 / 1.35) |
| A4 | 0.53 (1.27 / 1.55) | 0.53 (1.23 / 1.55) |
| A5 | 0.33 (1.30 / 1.23) | 0.38 (1.60 / 1.23) |
| A6 | 0.30 (1.55 / 1.35) | 0.28 (1.32 / 1.35) |
| A7 | 0.65 (1.15 / 1.75) | 0.60 (1.15 / 1.75) |
| A8 | 0.78 (1.57 / 0.95) | 0.63 (1.57 / 0.95) |
| A9 | 0.38 (1.95 / 1.63) | 0.38 (2.00 / 1.63) |

## Escena por escena (Claude · cada modelo, primera vez)

| Escena | Claude | gpt-5.4-mini | gpt-5.4 |
|---|---|---|---|
| base `ia_marilla_tarta_agria` | 11 (1 2 1 1 1 1 1 1 2) | 14 (2 1 1 2 1 2 1 2 2) | 14 (0 2 1 2 2 2 1 2 2) |
| base `ia_matthew_semillas_violetas` | 14 (2 2 1 1 1 2 2 1 2) | 18 (2 2 2 2 2 2 2 2 2) | 14 (2 2 1 1 2 2 1 1 2) |
| base `ia_cecily_tia_hetty` | 13 (1 1 2 2 1 1 2 1 2) | 16 (2 2 2 1 2 2 1 2 2) | 13 (1 1 2 1 2 2 1 1 2) |
| base `ia_felicity_orden_secreto` | 12 (1 0 2 2 1 1 2 1 2) | 13 (2 1 2 1 1 1 1 2 2) | 11 (1 1 2 1 1 1 1 1 2) |
| base `ia_marilla_gorro` | 13 (1 2 2 1 2 1 2 1 1) | 9 (2 0 1 1 1 1 1 2 0) | 17 (1 2 2 2 2 2 2 2 2) |
| base `ia_matthew_arrugas` | 14 (2 2 1 2 1 2 2 1 1) | 12 (2 0 1 1 1 2 1 2 2) | 17 (2 2 2 2 2 2 2 1 2) |
| base `ia_alec_bolsa` | 10 (0 2 1 2 1 1 1 1 1) | 11 (1 1 1 1 1 1 1 2 2) | 11 (0 1 2 1 2 1 1 1 2) |
| base `ia_felicity_tarta` | 7 (0 0 1 1 1 1 1 1 1) | 12 (2 1 1 1 1 1 1 2 2) | 10 (0 1 1 1 2 1 1 1 2) |
| rubrica `ia_marilla_16_tarta_receta` | 13 (1 2 1 2 1 1 2 1 2) | 13 (2 1 1 2 1 2 1 1 2) | 16 (2 2 1 2 2 2 1 2 2) |
| rubrica `ia_matthew_16_jerry` | 13 (0 2 1 2 1 2 2 1 2) | 12 (2 1 1 1 1 2 1 1 2) | 10 (0 2 1 1 1 1 1 1 2) |
| rubrica `ia_cecily_16_hojas` | 13 (0 0 2 2 2 1 2 2 2) | 12 (2 1 2 1 1 1 1 1 2) | 11 (0 0 2 1 2 1 1 2 2) |
| rubrica `ia_felicity_16_ensalada` | 12 (1 0 2 1 1 1 2 2 2) | 12 (2 1 2 1 1 1 1 1 2) | 11 (1 0 2 1 1 1 1 2 2) |
| rubrica `ia_marilla_16` | 17 (2 2 2 2 2 2 2 1 2) | 12 (2 2 1 1 1 1 1 1 2) | 13 (1 2 1 1 2 1 1 2 2) |
| rubrica `ia_matthew_16` | 15 (2 2 1 2 1 2 2 1 2) | 15 (2 2 2 2 1 2 1 1 2) | 15 (2 2 1 2 1 2 1 2 2) |
| rubrica `ia_carrie_16` | 8 (0 0 1 2 1 1 1 1 1) | 12 (2 1 2 1 1 1 1 1 2) | 9 (0 0 1 1 1 1 1 2 2) |
| rubrica `ia_felicity_16` | 11 (1 0 2 1 1 1 2 1 2) | 11 (2 1 2 0 1 1 1 1 2) | 13 (1 0 2 1 2 1 2 2 2) |
| ejemplo `ia_marilla_tarta_y_genio` | 12 (1 0 1 2 1 2 2 1 2) | 13 (2 1 1 2 1 2 1 1 2) | 13 (2 0 1 2 1 2 1 2 2) |
| ejemplo `ia_matthew_semillas_de_verano` | 11 (1 0 1 1 1 2 2 1 2) | 14 (2 2 1 2 1 2 1 1 2) | 13 (2 0 1 2 1 2 1 2 2) |
| ejemplo `ia_cecily_ventana_y_nombre` | 14 (1 0 2 2 2 1 2 2 2) | 14 (1 1 2 1 2 1 2 2 2) | 13 (1 1 2 1 2 1 1 2 2) |
| ejemplo `ia_felicity_ojos_y_mermelada` | 13 (1 2 2 1 1 1 2 1 2) | 11 (1 0 2 1 1 1 1 2 2) | 13 (1 1 2 1 2 1 1 2 2) |
| ejemplo `ia_marilla_huerto_helado` | 15 (2 2 1 2 2 2 2 1 1) | 12 (2 0 1 1 1 2 1 2 2) | 14 (2 0 1 2 2 2 1 2 2) |
| ejemplo `ia_matthew_violetas_2` | 16 (2 2 2 1 2 2 2 2 1) | 11 (2 0 1 1 2 1 1 1 2) | 11 (2 0 1 0 2 1 1 2 2) |
| ejemplo `ia_cecily_ventana_ranita` | 10 (1 0 2 1 1 1 1 2 1) | 14 (2 0 2 1 2 1 2 2 2) | 12 (1 0 2 1 2 1 1 2 2) |
| ejemplo `ia_felicity_orden_del_dia` | 8 (1 0 1 1 1 1 1 1 1) | 10 (1 0 1 1 1 1 1 2 2) | 11 (1 0 1 1 2 1 1 2 2) |
| plan `ia_carrie_hermana_mandona` | 8 (0 0 1 2 1 1 1 1 1) | 9 (1 0 1 1 1 1 1 1 2) | 7 (0 0 1 1 1 0 1 1 2) |
| plan `ia_felicity_tarta_que_no_salio` | 10 (1 0 1 1 1 1 2 1 2) | 9 (1 0 1 1 1 1 1 1 2) | 10 (1 0 2 1 1 1 1 1 2) |
| plan `ia_marilla_raices` | 14 (0 2 2 2 2 1 2 1 2) | 14 (2 0 2 2 2 2 1 1 2) | 15 (0 2 2 2 2 2 1 2 2) |
| plan `ia_matthew_semillas_verano` | 13 (1 2 1 1 1 2 2 1 2) | 16 (2 2 1 2 2 2 2 1 2) | 16 (2 2 1 2 1 2 2 2 2) |
| plan `ia_marilla_traer` | 11 (2 1 0 2 1 2 1 1 1) | 13 (2 0 1 2 1 2 1 2 2) | 15 (2 2 1 2 1 2 1 2 2) |
| plan `ia_cecily_silencio` | 9 (1 0 1 1 1 1 2 1 1) | 12 (2 0 2 1 2 1 1 1 2) | 12 (1 0 2 1 2 1 1 2 2) |
| plan `ia_felicity_heladera` | 9 (0 0 1 2 1 1 2 1 1) | 9 (1 0 1 1 1 1 1 1 2) | 8 (0 0 1 1 1 0 1 2 2) |
| plan `ia_matthew_ward` | 16 (1 2 2 2 1 2 2 2 2) | 18 (2 2 2 2 2 2 2 2 2) | 16 (2 2 2 1 1 2 2 2 2) |
| todo `ia_marilla_taza` | 11 (1 2 1 1 1 1 2 0 2) | 12 (2 0 1 1 1 2 1 2 2) | 10 (1 2 1 0 1 1 1 1 2) |
| todo `ia_matthew_brote` | 13 (1 2 1 2 1 2 2 0 2) | 13 (2 0 1 2 1 2 1 2 2) | 12 (1 2 1 1 1 1 2 1 2) |
| todo `ia_alec_casa` | 11 (0 2 1 2 1 1 2 0 2) | 13 (2 0 1 1 2 2 1 2 2) | 11 (1 1 1 1 2 1 1 1 2) |
| todo `ia_carrie_secreto` | 8 (1 0 1 2 1 1 1 0 1) | 12 (2 0 1 1 1 2 1 2 2) | 9 (1 0 1 1 1 1 1 1 2) |
| todo `ia_matthew_semillas` | 14 (2 1 2 1 2 2 2 0 2) | 15 (2 0 2 2 1 2 2 2 2) | 14 (2 2 1 1 2 2 1 1 2) |
| todo `ia_cecily_libro` | 12 (1 0 2 2 2 1 2 0 2) | 13 (2 0 1 1 2 2 1 2 2) | 11 (1 0 2 1 2 1 1 1 2) |
| todo `ia_felicity_pudor` | 7 (1 0 1 1 1 1 1 0 1) | 13 (2 0 1 1 2 2 1 2 2) | 10 (1 0 1 1 2 1 1 1 2) |
| todo `ia_marilla_tarta_limon` | 11 (1 2 1 1 1 1 2 0 2) | 12 (2 0 1 1 1 2 1 2 2) | 12 (1 2 1 1 2 1 1 1 2) |

## Lo que dijo el juez

### gpt-5.4-mini

- `ia_marilla_tarta_agria` (14; Claude 11): La escena encaja bien con lo ya vivido: retoma la tarta y convierte la cocina en una conversación sobre juicio, no sobre simple receta. Marilla suena seca y práctica, y además hay dos respuestas distintas que dicen cosas de Ana y dejan un pequeño cambio en el trato. No destaca mucho en imagen memorable, pero sí cumple con solidez.
- `ia_matthew_semillas_violetas` (18; Claude 14): Parte de una premisa muy concreta de esta partida: las violetas y las semillas que Matthew ya le había dado, así que se siente nacida de esa relación. Matthew está muy en carácter, reservado pero tierno, y la escena sí revela algo del vínculo entre ambos. Tiene además una imagen bonita y dos opciones que abren caminos distintos, aunque no enormes.
- `ia_cecily_tia_hetty` (16; Claude 13): La escena revela bien a Cecily y a la Srta. Hetty por contraste: se entiende que detrás de la severidad hay miedo y necesidad de ternura. No repite exactamente lo anterior y sigue una línea natural de confianza entre Ana y Cecily. Es una escena cálida y concreta, aunque su imagen final es más sensible que inolvidable.
- `ia_felicity_orden_secreto` (13; Claude 12): La escena revela algo útil sobre Felicity: su orden no es solo orgullo, también refugio y paz interior. La conversación es agradable y coherente, pero se apoya en un asunto bastante general de cocina y orden, así que no se siente tan nacida de esta partida como otras. Tiene dos opciones claras y buen cierre, aunque sin una imagen especialmente perdurable.
- `ia_marilla_gorro` (9; Claude 13): Hay buena intención y el tema del ridículo y los adornos sí encaja con Marilla, pero aquí el trato falla: Ana le habla de usted, y eso desentona según la rúbrica. Además el remate con el guion final rompe la forma, así que la escena pierde mucho aunque el contenido sea correcto. Las opciones siguen siendo distintas y con sentido, pero no basta para salvarla del todo.
- `ia_matthew_arrugas` (12; Claude 14): La escena es concreta y sensible, y conecta bien con un hecho reciente: la ropa arrugada y la vergüenza de Ana. Sin embargo, vuelve a fallar el trato, porque Ana le habla de usted a Matthew, lo que rompe la voz esperable. El contenido avanza poco más allá de una consolación amable, aunque las dos elecciones sí distinguen matices de carácter.
- `ia_alec_bolsa` (11; Claude 10): La escena tiene una voz razonable para Alec, sobria y de pocas palabras, y deja ver algo de su modo de querer sin decir mucho. Pero resulta bastante genérica y no nace con mucha fuerza de una situación concreta de esta partida; además el contexto de Rose Cottage y huertito no le añade una huella muy propia. Las opciones están diferenciadas, pero el conjunto no destaca.
- `ia_felicity_tarta` (12; Claude 7): Felicity está bastante bien captada como orgullosa de su cocina, y la escena desarrolla ese rasgo con gracia. Aun así, es menos concreta y menos nacida de esta partida que la escena de la cocina anterior; se siente más como una variación sobre el mismo tema. Las dos opciones son claras y distintas, pero no cambian mucho el mundo fuera de un pequeño matiz de afecto.
- `ia_marilla_16_tarta_receta` (13; Claude 13): Encaja bien con Marilla y con la continuidad de la escena del pastel: la conversación nace de algo concreto de esta partida y además sigue un tema ya tocado, la cocina y aprender de ella. No llega a un giro fuerte; más bien reafirma que la paciencia puede ser una forma de cariño, con buen tono de época, pero sin una revelación nueva. Las opciones cambian un poco el énfasis, aunque todas vuelven a la misma lección doméstica.
- `ia_matthew_16_jerry` (12; Claude 13): La escena se apoya en un vínculo ya existente con Jerry y Matthew, y tiene buena verdad de partida, pero no aporta un hecho muy nuevo: desarrolla una simpatía que ya venía de antes. Matthew suena bastante en carácter, reservado y breve, aunque sin una línea especialmente inconfundible de él. Las tres opciones son distintas en matiz, pero dos se parecen mucho al mismo aprendizaje de confiar en la gente.
- `ia_cecily_16_hojas` (12; Claude 13): Cecily está bien tratada como niña tímida y callada, y la escena sí deja ver algo íntimo: su deseo de un lugar donde no la manden a callar. Eso revela su interior y hace avanzar una relación tierna con Ana. Aun así, el asunto de “sentirse pequeña” es algo bastante genérico dentro del libro y no remite a un detalle especialmente único de esta partida.
- `ia_felicity_16_ensalada` (12; Claude 12): Felicity tiene voz de niña orgullosa y práctica, y la escena aprovecha bien su relación con Ana en torno a la cocina. Sí hay un pequeño desvelamiento: detrás de la suficiencia aparece el miedo a equivocarse delante de otros. No obstante, el tema es bastante habitual y no saca una premisa muy específica de lo ya ocurrido, así que se queda en buen nivel pero no sobresaliente.
- `ia_marilla_16` (12; Claude 17): Marilla suena muy Marilla, seca y útil, y la respuesta sobre pedir perdón encaja con su carácter. La escena da algo nuevo en la confesión de que también se enfadó y tuvo que rectificar, pero no cambia mucho la relación ni se apoya claramente en un hecho concreto anterior: funciona más como lección general que como consecuencia de la partida. El final cierra bien, pero el intercambio es bastante conocido dentro del repertorio de Marilla y Ana.
- `ia_matthew_16` (15; Claude 15): La escena parte de un cabo suelto de esta partida, así que tiene verdad muy sólida y concreta, y además Matthew está bien captado en su torpeza tímida. El detalle de que casi se le olvida todo por no olvidar una cosa concreta le da gracia y deja una pequeña revelación sobre su mente ansiosa. Sin embargo, las opciones llevan casi todas al mismo punto afectivo, con poca diferencia real de mundo o de carácter.
- `ia_carrie_16` (12; Claude 8): Carrie aparece acorde con su lugar de niña pequeña y callada, y la escena deja ver su deseo de ser vista, lo que sí modifica un poco su relación con Ana. No obstante, no hay una ancla muy fuerte a hechos concretos de esta partida ni un tono especialmente memorable; el motivo de “la menor incomprendida” es bastante general. Las opciones son correctas, pero se parecen en intención y solo cambian el matiz de consuelo.
- `ia_felicity_16` (11; Claude 11): Felicity está bien caracterizada en su orgullo doméstico, y la escena profundiza en su necesidad de que la casa “diga algo” de ella: eso revela presión y cuidado, no solo vanidad. Pero casi repite el mismo núcleo de la escena anterior sobre cocinar y perfección, así que le falta novedad fuerte frente a lo ya conversado. Las dos opciones son útiles, aunque bastante próximas entre sí.
- `ia_marilla_tarta_y_genio` (13; Claude 12): Encaja bien con lo ya hablado de la primera tarta y de la disciplina de Marilla: Ana compara la tarta con una hazaña doméstica y Marilla responde seca pero atenta. Lo que no destaca tanto es que la escena se queda en una pequeña aprobación, sin una revelación fuerte ni un giro grande en la relación.
- `ia_matthew_semillas_de_verano` (14; Claude 11): Aprovecha de forma clara las semillas que Matthew ya le regaló y sigue ese hilo con ternura, además de sonar muy a Matthew en su forma breve y tranquila de hablar. No cambia del todo la relación ni abre un conflicto nuevo; más bien amplía un afecto ya establecido.
- `ia_cecily_ventana_y_nombre` (14; Claude 14): La escena revela algo nuevo de Cecily: su miedo a hablar y a equivocarse, y además hace nacer una confianza más íntima entre ambas. Aunque funciona muy bien emocionalmente, el punto de partida es algo general y no depende tanto de un hecho concreto de esta partida como otras escenas.
- `ia_felicity_ojos_y_mermelada` (11; Claude 13): La conversación descubre que el orgullo de Felicity está hecho también de miedo a fallar, lo que da un matiz muy bueno a su carácter. Sin embargo, Ana le habla a Felicity de usted, y eso rompe la voz esperable entre niñas; además, la escena toca un tema bastante típico de cocina y orden.
- `ia_marilla_huerto_helado` (12; Claude 15): Parte bien del huerto y del impulso de Ana por nombrar las cosas, así que nace de una relación y un lugar muy concretos de esta partida. Pero también suena bastante a una variación de conversaciones anteriores sobre semillas, huerto y trabajo, y Ana vuelve a tratar a Marilla con usted.
- `ia_matthew_violetas_2` (11; Claude 16): Sigue con naturalidad el hilo de las violetas, las estrellas y la casa que ya existían entre Ana y Matthew, y además deja ver que a él le alegra oírla hablar. Aun así, Ana usa usted con Matthew, que desentona mucho, y la escena no pasa de una delicada confirmación de cariño.
- `ia_cecily_ventana_ranita` (14; Claude 10): La escena vuelve a Cecily y hace avanzar con claridad su relación con Ana: el miedo se nombra y se convierte casi en un secreto compartido. Pero Ana le habla de usted, que suena fuera de voz para una niña, y el arranque resulta menos natural por eso.
- `ia_felicity_orden_del_dia` (10; Claude 8): La conversación es coherente con la idea de Felicity como muchacha hacendosa, pero la escena usa un trato de usted que no corresponde entre niñas. Además, retoma de manera bastante general el contraste entre utilidad e imaginación, sin un paso especialmente nuevo frente a lo ya hablado.
- `ia_carrie_hermana_mandona` (9; Claude 8): La escena es verosímil, pero falla en la voz: Ana le dice «usted» a Carrie, cuando entre niñas debe ser «tú». Además, aunque Carrie aprende algo sobre su cansancio, la conversación no cambia mucho más allá de una simpatía ya prevista; lo nuevo queda en lo leve. El foco está en la lealtad y en el deseo de pertenecer a una amiga, pero no nace de un detalle especialmente concreto de esta partida.
- `ia_felicity_tarta_que_no_salio` (9; Claude 10): Otra vez la voz falla por el trato: Ana y Felicity deberían tutearse, no hablarse de «usted». Lo demás encaja bien y revela una grieta simpática en Felicity, que admite un fracaso culinario y baja un poco la guardia. Aun así, la escena se apoya en un tema muy general de cocina y orgullo, no en un paso especialmente propio de esta partida.
- `ia_marilla_raices` (14; Claude 14): La escena respeta bien el carácter de Marilla y sí aprovecha la partida: Ana trae el miedo a no echar raíces en Tejas Verdes, algo muy ligado a su situación actual. Hay un cambio claro en la relación porque Marilla le confirma, sin ternura explícita pero con firmeza, que puede ser de la casa. La única falta es el «usted» de Ana hacia Marilla, que aquí debería ser «tú».
- `ia_matthew_semillas_verano` (16; Claude 13): Matthew suena bien: breve, atento y con esa calma característica, con una línea muy suya en el «Bueno… yo no sabía que las promesas venían en paquetitos tan pequeños». La escena además se apoya claramente en algo ya conversado antes, las semillas y la siembra, y lo prolonga con un matiz nuevo sobre la paciencia y la esperanza. No hay gran giro, pero sí una intimidad dulce y concreta.
- `ia_marilla_traer` (13; Claude 11): La escena es correcta y muy pegada a la vida cotidiana de Tejas Verdes: la cerca, Matthew, Marilla y una necesidad doméstica concreta. Sigue bien una línea ya abierta sobre los mandados de Marilla y la curiosidad de Ana, así que no se siente repetida. El trato de Ana con Marilla vuelve a fallar, porque debería tuteada, no con «usted».
- `ia_cecily_silencio` (12; Claude 9): La escena revela algo tierno: Cecily no es solo tímida, sino que vive con miedo a ocupar espacio, y Ana se ofrece a esperarla sin apurarla. Eso toca de lleno la amistad del alma y el crecer siendo una misma, con un tono delicado. La voz, sin embargo, falla de nuevo: Ana no debería tratar de «usted» a Cecily.
- `ia_felicity_heladera` (9; Claude 9): La escena está bien armada y tiene un detalle agradable: Felicity reconoce que Ana sí sabe apreciar el trabajo ajeno y la mesa como algo compartido. Pero vuelve a fallar el trato, porque Ana y Felicity deberían hablar de tú. También el asunto es algo genérico —una cena, la cocina, el elogio— y no destaca como algo muy propio de esta partida.
- `ia_matthew_ward` (18; Claude 16): Matthew queda muy bien caracterizado: silencioso, práctico, cariñoso sin decirlo, con un par de líneas muy suyas. Aquí sí hay un cambio bonito, porque Ana comprende cómo cuida Matthew y se ofrece a cuidarlo a él también; eso mueve de verdad la relación. La escena además bebe claramente de lo ya conversado sobre el cariño silencioso de Matthew y lo continúa con naturalidad.
- `ia_marilla_taza` (12; Claude 11): La escena encaja con lo ya conversado sobre Marilla y la cocina, y la idea de aprender paciencia a través de la harina es muy propia de esta partida. Pero Ana le habla a Marilla con «usted», y eso rompe la voz de época; además, el cambio es pequeño: más que revelar algo nuevo, refuerza una enseñanza ya sabida.
- `ia_matthew_brote` (13; Claude 13): Parte con buen pie porque sigue el cabo suelto del huertito y usa un detalle concreto de esta partida: las semillas de capuchina que Matthew le dio. Sin embargo, Ana vuelve a decirle «usted» a Matthew, lo que desajusta la voz; la escena también avanza poco más allá de confirmar que brotó algo.
- `ia_alec_casa` (13; Claude 11): Alec suena sobrio y reservado, y la escena deja ver algo de Rose Cottage y de cómo sostiene a las mujeres de su casa; eso sí aporta un matiz nuevo sobre él. Pero Ana le habla con «usted», y el tema, aunque ligado a familia y costumbre, queda más en conversación general que en un giro fuerte.
- `ia_carrie_secreto` (12; Claude 8): Carrie aparece tímida y reservada, y se aprende algo de ella: le asustan los secretos repetidos por Josie y quiere una forma segura de guardarlos. Pero Ana le habla con «usted», impropio entre niñas, y la escena se queda en una charla agradable sin cambio de relación demasiado marcado.
- `ia_matthew_semillas` (15; Claude 14): Retoma bien el hilo de las semillas y del huertito, y Matthew revela algo muy suyo: le da miedo que Ana no pruebe por temor al fracaso, pero le alegra verla cuidar algo pequeño. Otra vez aparece el «usted» de Ana hacia Matthew, y aunque la escena es bonita, el avance emocional es moderado más que decisivo.
- `ia_cecily_libro` (13; Claude 12): Cecily queda bien dibujada como una niña tímida que imagina mucho y habla poco, así que sí se revela algo suyo. Pero Ana usa «usted» con una niña, lo que cae fuera del trato esperado; además, la escena es muy afín al gusto por la imaginación, aunque no cambia mucho la relación.
- `ia_felicity_pudor` (13; Claude 7): Felicity aparece orgullosa, competente y sensible a que reconozcan su esmero, y eso sí añade una capa útil a su carácter. Pero Ana le habla con «usted», y la escena, aunque bien escrita, se apoya en un intercambio bastante general sobre orden y orgullo.
- `ia_marilla_tarta_limon` (12; Claude 11): Vuelve a Marilla y a la cocina con un problema concreto —una crema cortada—, así que nace claramente de la partida y del aprendizaje de Ana. Pero de nuevo Ana usa «usted» con Marilla, y la escena repite un motivo ya tratado: aprender con las manos, sin soñar ni quejarse demasiado.

### gpt-5.4

- `ia_marilla_tarta_agria` (14; Claude 11): Falla en verdad de la partida por «tu tarta de ayer»: sí hubo una charla sobre hacer un pastel, pero no consta que fuera ayer ni que Ana hubiera hecho una tarta concreta entonces. Además, la escena avanza con gracia pero no cambia mucho la relación; el paso nuevo más fuerte está en la opción sobre «la receta de la madre de usted», que enlaza bien con lo ya hablado.
- `ia_matthew_semillas_violetas` (14; Claude 14): La voz de Matthew está muy bien medida, y usa de verdad premisas ya asentadas en esta partida: las violetas, la idea de no estar del todo sola y las semillas de capuchina. Pero se parece bastante a conversaciones ya tenidas con Matthew; el rincón de flores añade un paso, sí, aunque no muy grande.
- `ia_cecily_tia_hetty` (13; Claude 13): No contradice nada, pero tampoco se apoya en un hecho concreto de esta partida más allá de que Ana ya conoce a Cecily y a la Srta. Hetty. Lo mejor es la revelación de Hetty a través de detalles pequeños —«me arregló el lazo sin decirme que estaba torcido»—, que sí descubre algo tierno y poco visible.
- `ia_felicity_orden_secreto` (11; Claude 12): La escena saca una confesión buena de Felicity —«si la cocina está en paz, yo también»—, pero el tema de la cocina ordenada sigue siendo bastante común y podría pasar en muchas partidas. La voz se reconoce, aunque no hay una línea especialmente inconfundible de Felicity como para subirla a sobresaliente.
- `ia_marilla_gorro` (17; Claude 13): Funciona muy bien como continuación de lo ya hablado sobre mangas abullonadas y adornos: aquí Marilla no solo prohíbe, sino que deja ver que teme «la lengua de la gente». Eso pone en el centro, con verdad de personaje, el choque entre imaginación y costumbre, y la opción de «una silla vacía en un cuarto» deja una imagen que se queda.
- `ia_matthew_arrugas` (17; Claude 14): Destaca por nacer claramente de esta partida: toma «ropa_arrugada» y lo convierte en algo emocional, no solo práctico. Las dos opciones, sin embargo, quedan bastante cerca una de otra en efecto: una agradece el no ser juzgada y la otra promete mejorar, pero no abren rumbos muy distintos.
- `ia_alec_bolsa` (11; Claude 10): Hay un fallo serio de verdad de la partida en el propio planteo: «la granja de Rose Cottage» mezcla lugares; Alec King es de la granja King, mientras Rose Cottage es de Hetty y Olivia. Aun así, dentro del diálogo sí sale algo valioso sobre cómo quiere Alec a los suyos, aunque el tipo de granjero callado sigue siendo bastante genérico.
- `ia_felicity_tarta` (10; Claude 7): Falla en verdad de la partida por arrancar de «cuando dijeron que una tarta podía salir bien en cualquier casa»: ese episodio previo no figura en lo que pasó ni en lo ya conversado. La escena tiene gracia y toca bien el orgullo de Felicity, pero se queda más en el tanteo que en una revelación fuerte.
- `ia_marilla_16_tarta_receta` (16; Claude 13): La escena se apoya bien en algo ya ocurrido en esta partida: Marilla ya enseñó a Ana a hacer un pastel, y aquí se da un paso más natural con la espera del horno y la receta de su madre. No le doy 2 en A3 ni en A7 porque, aunque hay una idea bonita sobre la paciencia, no cambia mucho la relación ni deja una frase verdaderamente inolvidable.
- `ia_matthew_16_jerry` (10; Claude 13): Falla en verdad de la partida: la opción «verlo defender a Jerry ante Marilla el otro día» supone un hecho que no aparece en lo ocurrido. Además, en una rama el efecto pone «suma paciencia:ana:marilla 1» aunque la escena es con Matthew, y eso afloja A8; por lo demás, Matthew suena reconocible, pero la escena no llega a revelar mucho más que su criterio habitual de juzgar con bondad.
- `ia_cecily_16_hojas` (11; Claude 13): Falla en A1 porque el resumen habla de «una tarde tranquila en Rose Cottage» y Cecily no vive allí, sino en la granja King. Además, entre niñas deberían tutearse y aquí Ana le habla de «usted» a Cecily; la escena tiene sensibilidad, pero el rincón secreto y «poner nombre» suenan bastante generales para Ana con cualquier niña.
- `ia_felicity_16_ensalada` (11; Claude 12): Entre niñas deben tutearse, y aquí Ana trata a Felicity de «usted» todo el tiempo, lo que baja A2 a 0. La escena sí logra sacar una pequeña confesión de Felicity —«a mí me pone nerviosa cuando me miran»—, pero el asunto de cocinar y ponerse nerviosa es bastante común y no nace especialmente de esta partida.
- `ia_marilla_16` (13; Claude 17): El tema repite en lo esencial una conversación ya tenida con Marilla sobre «cómo controlar el genio»; aquí hay un paso nuevo con «¿mejora la casa o la empeora?», pero no deja de volver sobre lo mismo. La voz de Marilla está bien y la rama de pedir perdón enlaza con el orgullo y el perdón, aunque la revelación es menor porque Marilla ya había admitido que también tuvo genio.
- `ia_matthew_16` (15; Claude 15): Toma muy bien el cabo suelto real de la partida —«Marilla le pidió a Matthew: traer»—, así que destaca en A1 y A6. No le doy 2 en A3 porque el paquete queda deliberadamente vago y no llega a revelarse qué es; el encanto está más en la timidez de Matthew que en un cambio verdadero.
- `ia_carrie_16` (9; Claude 8): Falla en verdad de la partida: Carrie Sloane no puede decir «Jane dice…» como si fuera su hermana mayor de la casa, porque Jane Andrews vive en otra familia. También falla la voz y el trato: entre niñas debería haber tuteo, y Ana la trata de «usted»; además, la escena tiene ternura, pero el tema de «la pequeña a la que mandan callar» es bastante genérico.
- `ia_felicity_16` (13; Claude 11): Otra vez falla A2 porque entre Ana y Felicity corresponde tuteo, no «usted». La escena encuentra una buena frase de Felicity —«El orgullo trabaja más de lo que la gente cree. A veces hasta barre el suelo»— y revela algo útil de ella, pero sigue un terreno muy cercano al de la otra escena con Felicity y al lugar común de hablar de perfección doméstica.
- `ia_marilla_tarta_y_genio` (13; Claude 12): Falla la voz de época en el trato: Ana y Marilla se dicen «usted» varias veces («Usted me dijo…», «¿De veras?»), y entre ellas debe haber tuteo. Además retoma de manera clara lo ya jugado —el pastel y el genio—, pero el cambio es más bien pequeño: Marilla reconoce una mejora, sin revelar mucho nuevo de la relación.
- `ia_matthew_semillas_de_verano` (13; Claude 11): También falla el trato: Ana le dice «usted» a Matthew desde la primera línea, y eso aquí es 0 en voz y época. Por lo demás, nace bien de esta partida porque sigue el regalo de las semillas de capuchina, aunque la escena no cambia gran cosa: Matthew confirma su ternura más que revelar algo nuevo.
- `ia_cecily_ventana_y_nombre` (13; Claude 14): No hay falsedad y la voz entre niñas está bien en tuteo; además Cecily queda reconocible en su timidez. Lo mejor es que sí cambia algo: de «¿Y si digo algo tonto?» pasan a «ya lo eres, si quieres», con una amistad naciendo de verdad; aun así, el punto de partida —hacer hablar a una niña tímida— tiene algo de lugar común.
- `ia_felicity_ojos_y_mermelada` (13; Claude 13): La voz funciona mejor aquí, con Felicity orgullosa y práctica, pero la escena no se apoya en nada concreto de esta partida más allá de que Ana la conoce. Revela algo útil —«nadie aplaude un desastre porque haya sido bien intencionado»—, aunque sigue siendo una charla bastante general sobre cocina, orden y miedo a errar.
- `ia_marilla_huerto_helado` (14; Claude 15): Otra vez cae por el «usted» entre Ana y Marilla («¿cree usted…?», «¿Y usted, Marilla…?»), que no corresponde. En lo demás, sí sale de esta partida: enlaza con las semillas de capuchina que Matthew le regaló y con el gusto de Ana por nombrar las cosas, aunque el avance emocional es leve.
- `ia_matthew_violetas_2` (11; Claude 16): Vuelve a fallar el trato con Matthew por el «usted». Además, repite bastante de lo ya conversado con él: violetas, estrellas, que Matthew la entiende y que la casa está más alegre con Ana; hay frases amables, pero en lo esencial pisa terreno ya dicho.
- `ia_cecily_ventana_ranita` (12; Claude 10): La escena se estropea en voz y época porque Ana y Cecily se tratan de «usted» siendo niñas («usted siempre parece…», «¿Le gustaría contarme…?»). También es bastante genérica en su concreción: miedo a hablar, nombre secreto, quedarse al lado; funciona, pero podría pasar casi en cualquier partida con una niña tímida.
- `ia_felicity_orden_del_dia` (11; Claude 8): Falla la voz por el trato de «usted» entre niñas de la misma edad aproximada («usted habla…», «seguramente lo desapruebe»). Tiene alguna gracia y distingue algo del carácter de Felicity, pero sigue siendo una conversación bastante general sobre cocina, esmero y poesía, sin apoyarse mucho en hechos concretos de esta partida.
- `ia_carrie_hermana_mandona` (7; Claude 8): Falla en verdad de la partida: Carrie Sloane no tiene una hermana establecida aquí, y la escena arranca con «su hermana»; además Josie y Gertie son Pye, no personas de su casa. También falla la voz y el trato, porque Ana y Carrie deberían tutearse y aquí se dicen «usted».
- `ia_felicity_tarta_que_no_salio` (10; Claude 10): La situación no contradice nada de la partida, pero el trato entre Ana y Felicity está mal: entre niñas debe ser «tú», y toda la escena usa «usted». Revela algo bueno de Felicity —«hubo una vez que la tarta se hundió»—, aunque el motivo de cocina es bastante común y no nace especialmente de esta partida.
- `ia_marilla_raices` (15; Claude 14): Está muy bien anclada en esta partida porque retoma directamente si Ana ya es de Tejas Verdes de un modo firme, pero tropieza al mencionar «la tía Josephine» como referencia conocida cuando Ana todavía no conoce a Josephine Barry. Por lo demás, Marilla suena muy bien y el centro temático de pertenecer a una familia está claro.
- `ia_matthew_semillas_verano` (16; Claude 13): Destaca porque continúa algo ya jugado con Matthew —sembrar, semillas, paciencia— y lo convierte en una idea nueva sobre la esperanza. No hay gran revelación de pasado ni cambio de relación; más bien se aprende un poco más de cómo mira Matthew la tierra.
- `ia_marilla_traer` (15; Claude 11): Usa muy bien un cabo suelto real de la partida: «Marilla le pidió a Matthew: traer», y lo concreta en una necesidad de la casa. Lo que cambia es poco: Ana solo descubre que no era nada romántico, así que la escena cumple más por verdad, continuidad y tono que por revelación.
- `ia_cecily_silencio` (12; Claude 9): La voz de Ana con Cecily tiene encanto, pero el trato vuelve a fallar: entre niñas no corresponde «usted». Aun así, la escena sí revela algo importante de Cecily —que calla por miedo a decir mal las cosas— y pone en el centro crecer sin dejar de ser una misma.
- `ia_felicity_heladera` (8; Claude 9): Falla en verdad de la partida por «la cena de ayer»: lo que consta ayer es un almuerzo en Tejas Verdes con Matthew y Marilla, no una cena compartida con Felicity. Además vuelve a usar «usted» entre niñas; y, aunque tiene alguna observación buena sobre la mesa y el trabajo, queda apoyada en una premisa falsa.
- `ia_matthew_ward` (16; Claude 16): Está muy en la verdad de esta partida porque nace del cariño ya asentado entre Ana y Matthew y de su modo silencioso de cuidarla. No repite exactamente lo ya hablado, pero sí pisa terreno cercano; suma hondura más que abrir un asunto enteramente nuevo.
- `ia_marilla_taza` (10; Claude 11): No contradice la partida, pero tampoco se apoya en un hecho tan concreto como el pastel ya enseñado por Marilla más allá del aire general de cocina y paciencia. La escena avanza poco: confirma una lección que ya estaba muy hablada con Marilla (medir bien, no soñar, controlar el genio), así que su novedad es limitada.
- `ia_matthew_brote` (12; Claude 13): Introduce un brote ya salido en el huertito sin que conste antes que Ana lo haya plantado o que haya brotado; no es imposible, pero no nace claramente de lo jugado. Tiene una imagen bonita, pero el cambio es leve: más bien refuerza la ternura ya establecida entre Ana y Matthew.
- `ia_alec_casa` (11; Claude 11): La voz de Alec es sobria y creíble, y la mención de Hetty, Olivia y Cecily da concreción. Pero la escena se queda en observaciones generales sobre la casa y las costumbres: se aprende algo de Alec, sí, aunque no cambia gran cosa ni se engancha con un hilo previo fuerte de esta partida.
- `ia_carrie_secreto` (9; Claude 8): Entre niñas debería haber tuteo, y aquí Ana y Carrie se tratan de "usted" y "le", lo que falla la voz y el trato de época del juego. Además, la conversación sobre "secretos pequeños" es bastante genérica y podría pasar con casi cualquier niña; solo la mención de Josie la ata un poco a Avonlea.
- `ia_matthew_semillas` (14; Claude 14): Esta sí usa un hecho concreto de la partida: las semillas de capuchina que Matthew ya le dio a Ana, y sigue bien esa relación. Aun así, repite bastante el sentido de la charla previa sobre sembrar y las semillas, con un paso nuevo pequeño pero no grande.
- `ia_cecily_libro` (11; Claude 12): Entre Ana y Cecily debería haber tuteo, y toda la escena va en "usted", así que falla en trato. Tiene encanto y una confesión nueva de Cecily —que imagina más de lo que dice—, pero el asunto del libro y la imaginación sigue siendo bastante delicado y sin consecuencias claras más allá de acercarlas un poco.
- `ia_felicity_pudor` (10; Claude 7): Otra vez falla el trato: Felicity y Ana deberían tutearse, y aquí usan "usted" de principio a fin. La conversación deja ver bien el orgullo hacendoso de Felicity, pero el tema es más general que nacido de algo muy concreto de esta partida.
- `ia_marilla_tarta_limon` (12; Claude 11): La voz de Marilla está bien y la idea de no echar a perder una cosa por orgullo encaja con ella, pero la crema o tarta concreta no viene de ningún hecho previo de la partida. Además roza bastante lecciones ya vistas con Marilla sobre cocina, paciencia y aprender haciendo, así que aporta más variación de ejemplo que avance verdadero.
