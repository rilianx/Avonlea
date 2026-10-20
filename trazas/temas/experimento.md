# Experimento: cómo contarle a la IA lo ya conversado

Partida: `tools/noche/partidas/curiosa.json` (día 16) · personas: marilla, matthew, diana · 3 vez/veces cada una · modelo gpt-5.4-mini

Cada manera le dice a la IA lo ya conversado con esa persona de una forma distinta, y le pide 5 temas nuevos. El juez ve todo (título y resumen).

| Manera | Tokens del pedido (prom.) | Tokens de lo conversado (aprox.) | Repiten algo ya hablado | Siguen lo que interesa (0–2) | Contenido (0–2) |
|---|---|---|---|---|---|
| nada | 379 | 0 | 6/45 (13 %) | 1.31 | 1.67 |
| temas | 527 | 111 | 12/45 (27 %) | 1.22 | 1.69 |
| resumenes | 766 | 353 | 6/45 (13 %) | 1.22 | 1.53 |
| mixto | 574 | 165 | 15/45 (33 %) | 1.33 | 1.62 |
| hechas | 495 | 101 | 4/45 (9 %) | 1.31 | 1.71 |
| claves | 490 | 95 | 3/45 (7 %) | 1.33 | 1.62 |

## Las propuestas

### marilla · nada · 1

- **Preguntarle a Marilla por qué guarda la buena vajilla para las visitas**: Ana descubre que Marilla reserva las piezas bonitas por costumbre y prudencia, y Marilla termina admitiendo que le agrada ver la mesa arreglada cuando no hay extraños. _(repite 0 · sigue 1 · contenido 2)_
- 🔁 **Pedirle que le enseñe a remendar los puños y los dobladillos**: Marilla le muestra a Ana cómo hacer una puntada firme, y Ana comprende que el orden de la casa también puede ser una forma de cariño silencioso. _(repite 8 · sigue 2 · contenido 2)_
- **Contarle que ha puesto nombre a una gallina del gallinero**: Marilla finge desaprobarlo, pero la conversación deja ver que conoce bien a cada animal y que, a su manera, también se encariña con ellos. _(repite 0 · sigue 1 · contenido 1)_
- **Preguntarle cómo decide qué guardar y qué regalar de una casa**: Marilla explica con severidad práctica qué cosas se conservan por utilidad o recuerdo, y Ana entiende que en Avonlea los objetos también cuentan historias. _(repite 0 · sigue 1 · contenido 2)_
- 🔁 **Pedirle que le diga qué debe aprender una muchacha para llevar una casa**: Marilla enumera tareas con su estilo tajante, pero acaba reconociendo que Ana aprende deprisa y que, si quiere, podría llegar a ser una gran ayudante en la granja y en la cocina. _(repite 8 · sigue 2 · contenido 2)_

### marilla · nada · 2

- **las conservas de grosellas y el orden de la despensa**: Ana ayuda a Marilla a poner frascos en fila; descubre que Marilla etiqueta todo con una pulcritud casi solemne, y entre tarros aprende que el orden también puede ser una forma de cariño. _(repite 0 · sigue 2 · contenido 2)_
- **una lección sobre la ropa remendada y la vergüenza de usarla**: Marilla le muestra cómo remendar sin dejar hilachas, y Ana confiesa que a veces se avergüenza de su vestido remendado; Marilla, seca pero tierna, le deja claro que la buena costura vale más que el orgullo. _(repite 0 · sigue 1 · contenido 2)_
- **el huerto: distinguir las plantas útiles de las malas hierbas**: Ana pregunta por qué unas plantas se arrancan y otras se cuidan, y Marilla le enseña a distinguir brotes; Ana entiende que en la granja hay paciencia para todo lo que quiere crecer. _(repite 0 · sigue 1 · contenido 2)_
- **la visita al gallinero y el carácter de las gallinas**: Ana acompaña a Marilla a recoger huevos y termina confesando que las gallinas le parecen criaturas muy quisquillosas; Marilla, con un raro destello de humor, le explica cuáles ponen más y cuáles son más escandalosas. _(repite 0 · sigue 1 · contenido 2)_
- **qué cosas se hacen al caer la tarde en una casa tranquila**: Mientras guardan las labores del día, Ana pregunta por los hábitos de la casa al anochecer; Marilla le revela pequeñas costumbres del hogar de los Cuthbert, y Ana descubre que la quietud de Marilla tiene su propio consuelo. _(repite 0 · sigue 2 · contenido 1)_

### marilla · nada · 3

- **preguntarle a Marilla cómo se sabe si una persona está “bien educada” de verdad**: Ana, muy seria, quiere entender si la buena educación es cuestión de libros, de modales o de bondad; Marilla le responde que algunas personas parecen correctas sin serlo, y otras tienen mejores maneras sin proponérselo, lo que deja a Ana pensando en que el corazón también puede ser una clase de educación. _(repite 0 · sigue 1 · contenido 2)_
- 🔁 **pedirle que le enseñe a remendar una manga o un calcetín**: Ana intenta aprender una tarea práctica de la casa y se sorprende al descubrir que Marilla es paciente cuando una costura sale torcida; Marilla, por su parte, nota que Ana aprende deprisa cuando se concentra y que no todo en ella es distracción. _(repite 8 · sigue 2 · contenido 1)_
- **preguntarle por qué Marilla nunca presume de querer a nadie**: Ana, con su franqueza habitual, quiere saber por qué Marilla parece esconder sus sentimientos; Marilla contesta con sequedad que las personas sensatas no necesitan pregonarlos, pero termina dejando ver, sin querer del todo, que el cariño se demuestra más de lo que se dice. _(repite 0 · sigue 1 · contenido 2)_
- **contarle que en la granja ha observado algo que no entiende y pedirle consejo**: Ana trae una pequeña observación del trabajo de la casa o del huerto —una planta, un animal o una tarea que salió mal— y Marilla le explica con lógica y detalle; la conversación acaba revelando que Ana empieza a mirar Avonlea con ojos más útiles, no solo soñadores. _(repite 0 · sigue 2 · contenido 1)_
- **preguntarle si alguna vez fue niña como ella**: Ana se atreve a imaginar a Marilla pequeña, y eso abre una conversación inesperada sobre la infancia, la severidad y las cosas que una muchacha aprende al crecer; Marilla no se pone sentimental, pero admite más de lo acostumbrado, y Ana descubre una veta de ternura muy antigua. _(repite 0 · sigue 1 · contenido 2)_

### marilla · temas · 1

- 🔁 **Pedirle a Marilla que le enseñe a remendar una manga rota**: Ana intenta coser un pequeño desgarro y Marilla, con paciencia severa, le muestra puntadas firmes; Ana descubre que la prolijidad también puede ser una clase de ternura. _(repite 8 · sigue 1 · contenido 2)_
- **Preguntarle a Marilla qué se hace cuando una cosecha parece venir mala**: Mientras hablan de la huerta, Marilla admite que a veces la granja no obedece ni al esfuerzo ni a los planes; Ana aprende que la preocupación de los mayores también tiene miedo de perder. _(repite 0 · sigue 2 · contenido 2)_
- 🔁 **Contarle a Marilla que vio a Cecily y qué le pareció**: Ana describe a Cecily con su curiosidad de siempre, y Marilla revela una opinión inesperada sobre los Blythe o sobre la familia vecina, dejando entrever que sabe más de lo que dice. _(repite 12 · sigue 1 · contenido 2)_
- **Preguntarle a Marilla cómo era la casa cuando era niña**: Ana saca a relucir una curiosidad nueva por la infancia de Marilla, y esta, a su pesar, deja escapar un recuerdo de antes de ser tan severa, mostrando un costado más blando. _(repite 0 · sigue 1 · contenido 2)_
- **Pedirle permiso para ayudar en la granja como una persona grande**: Ana quiere hacer algo útil de verdad —llevar agua, recoger huevos, ordenar el henil— y Marilla termina cediendo con una condición; la conversación cambia la manera en que Marilla empieza a confiar en ella. _(repite 0 · sigue 2 · contenido 2)_

### marilla · temas · 2

- **Preguntarle a Marilla si alguna vez quiso ir a la ciudad y por qué se quedó en Avonlea**: Ana, aún con la idea de Queens rondándole la cabeza, le pregunta si la vida le ofreció otro camino; Marilla responde con sobriedad que Avonlea también puede ser una elección, y Ana descubre una veta de pasado en ella que no esperaba. _(repite 0 · sigue 1 · contenido 2)_
- 🔁 **Pedirle que le enseñe a remendar una media sin que quede una vergüenza**: A partir de la cocina y el orden de la casa, Ana quiere aprender una labor útil; Marilla le muestra cómo se hace bien y, entre puntadas secas, deja ver que confía en que Ana puede volverse cuidadosa si lo intenta. _(repite 8 · sigue 2 · contenido 1)_
- **Preguntarle si de niña también soñaba despierta o si siempre fue tan práctica**: Ana, tocando la fibra de su imaginación contra el carácter de Marilla, busca saber si hubo alguna niña parecida a ella dentro de esa severidad; Marilla no se ablanda del todo, pero admite una pequeña travesura del pasado que la humaniza. _(repite 0 · sigue 1 · contenido 2)_
- **Contarle que vio la granja como si fuera de otra persona y preguntarle qué cree que hará con ella cuando crezca**: Ana convierte una mirada a la granja en una confesión sobre el futuro; Marilla le habla de trabajo, responsabilidad y hogar, y sin decirlo del todo le revela que la imagina quedándose mucho tiempo. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle qué piensa de los inviernos largos y si hay algo que se pueda hacer en casa cuando el campo duerme**: Desde el interés por la granja, Ana quiere saber cómo pasan el tiempo cuando no hay labores afuera; Marilla le propone faenas domésticas y pequeños cuidados del hogar, y Ana descubre que el invierno también puede llenarse de vida. _(repite 0 · sigue 2 · contenido 1)_

### marilla · temas · 3

- **Contarle que hoy ha visto a la señora Rachel Lynde y soportado una reprimenda sin llorar**: Ana le cuenta a Marilla cómo aguantó una visita incómoda con más calma de la que esperaba; Marilla reconoce que empieza a tener temple, aunque se lo diga como si fuera un regaño. _(repite 0 · sigue 1 · contenido 2)_
- 🔁 **Preguntarle si puede ayudar en la cocina de verdad, no solo mirar**: Ana pide una tarea pequeña en la cocina y Marilla le asigna una labor simple; al probar que puede servir para algo, Ana descubre que Marilla confía un poco más en ella. _(repite 8 · sigue 1 · contenido 1)_
- **Contarle que quiere aprender a poner orden en la despensa y la casa**: Ana propone ayudar con el orden doméstico y Marilla aprovecha para enseñarle métodos prácticos; Ana descubre que la severidad de Marilla también es una forma de cariño. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle cómo hacía Matthew para arreglárselas con la granja cuando nadie lo ayudaba**: Ana compara a Matthew con Marilla y quiere entender mejor su vida en la granja; Marilla revela un poco de la historia de la familia y de cuánto ha cargado Matthew en silencio. _(repite 0 · sigue 2 · contenido 2)_
- 🔁 **Contarle que ha pensado en Diana como si fuera una hermana escogida, y qué le diría Marilla de eso**: Ana habla de su amistad con Diana y de su necesidad de querer a alguien con toda el alma; Marilla, aunque seca, deja entrever que entiende ese anhelo más de lo que Ana imagina. _(repite 9 · sigue 0 · contenido 1)_

### marilla · resumenes · 1

- 🔁 **Preguntarle a Marilla por qué ordena tanto la casa**: Ana le pregunta por el modo en que cada cosa tiene su sitio; Marilla le explica que el orden le ahorra disgustos, y acaba confesando que en una casa quieta también cabe el cariño. _(repite 10 · sigue 1 · contenido 1)_
- **Contarle a Marilla que quiere ayudar en la granja**: Ana ofrece trabajar en los quehaceres de afuera; Marilla acepta una tarea sencilla y descubre que Ana aprende con sorprendente empeño cuando la dejan hacer algo útil. _(repite 0 · sigue 2 · contenido 2)_
- 🔁 **Preguntarle cómo se cose una costura sin que quede torcida**: Ana le pide que le enseñe a coser para servir mejor en casa; Marilla le muestra puntadas firmes y, entre correcciones, deja ver que le agrada verla querer hacerse práctica. _(repite 8 · sigue 1 · contenido 1)_
- **Contarle que vio a Cecily y quiere portarse como ella**: Ana habla de Cecily con admiración y pregunta si ser buena consiste en estar siempre callada; Marilla le responde que no, pero le advierte que la compostura vale más que la fantasía. _(repite 0 · sigue 0 · contenido 1)_
- **Preguntarle a Marilla si alguna vez soñó con otra vida**: Ana, con la curiosidad de siempre, le pregunta si Marilla también tuvo sueños; Marilla tarda en responder, y al final deja caer que sí, aunque a una mujer a veces le toca enterrarlos sin hacer ruido. _(repite 0 · sigue 1 · contenido 2)_

### marilla · resumenes · 2

- **Preguntarle a Marilla si alguna vez fue pequeña en el fondo**: Ana le pregunta si de niña también soñaba con cosas grandes; Marilla admite que no tanto, pero que también tuvo inquietudes que guardó para sí. _(repite 0 · sigue 1 · contenido 2)_
- **Pedirle que le enseñe a arreglar la casa sin enredarlo todo**: Ana quiere ayudar con orden y limpieza; Marilla le muestra un método estricto y termina reconociendo que la niña aprende deprisa. _(repite 0 · sigue 2 · contenido 2)_
- **Contarle a Marilla lo que vio en la granja y por qué le dio alegría**: Ana describe un pequeño trabajo entre gallinas, heno o jardín; Marilla escucha y ve que la niña empieza a mirar la granja como un hogar. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle qué hace una muchacha cuando se enfada y no quiere decir algo cruel**: Ana busca consejo para no dejarse llevar por el genio; Marilla le da una respuesta práctica y seca, con una advertencia que revela cuidado. _(repite 0 · sigue 2 · contenido 1)_
- **Preguntarle si las niñas pueden ser valientes sin dejar de ser buenas**: Ana teme no servir para nada útil; Marilla le responde que la verdadera valentía está en hacer lo correcto cada día, y Ana se queda pensativa. _(repite 0 · sigue 1 · contenido 2)_

### marilla · resumenes · 3

- **Pedirle que le explique cómo arregla la casa tan de prisa**: Ana observa cómo Marilla ordena, remienda y barre sin perder un minuto; Marilla le enseña su método y Ana comprende que la severidad también puede ser una forma de cuidado. _(repite 0 · sigue 1 · contenido 2)_
- **Contarle que en la granja le gustaría ser útil de verdad**: Ana propone ayudar con las gallinas, el huerto o el ordeño; Marilla la pone a prueba con una tarea sencilla y queda un pequeño orgullo compartido al ver que Ana sirve para el trabajo. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle por qué Matthew habla tan poco**: Ana, curiosa, le pide que le explique a Matthew; Marilla revela que su hermano es tímido y amable a su manera, y deja entrever cuánto confía en él. _(repite 0 · sigue 1 · contenido 2)_
- 🔁 **Pedirle que le enseñe a hacer conservas para el invierno**: Ana aprende a guardar fruta y verduras, y Marilla le muestra que pensar en el invierno es otra manera de cuidar el verano; Ana descubre la importancia de prever. _(repite 8 · sigue 1 · contenido 1)_
- 🔁 **Decirle que quiere aprender a ser práctica sin dejar de imaginar**: Ana intenta entender si puede seguir soñando sin ser siempre reprendida; Marilla admite, con sequedad, que una niña puede tener fantasía si no deja de hacer lo que debe. _(repite 4 · sigue 0 · contenido 2)_

### marilla · mixto · 1

- **Pedirle que le enseñe a remendar calcetines**: Ana descubre que Marilla remienda con una paciencia casi solemne; Marilla le muestra puntadas firmes y le deja reparar un calcetín pequeño, aunque vigila cada movimiento. _(repite 0 · sigue 1 · contenido 2)_
- 🔁 **Preguntarle por qué guarda la foto vieja en el cajón superior**: Ana observa que la fotografía no está olvidada sino resguardada con cuidado; Marilla revela algo breve sobre la persona retratada y por qué no le gusta hablar de ello. _(repite 12 · sigue 0 · contenido 2)_
- **Contarle que quiere ayudar de verdad en la granja**: Ana ofrece hacer una tarea concreta y Marilla, sorprendida, le asigna una responsabilidad sencilla pero útil; Ana aprende que trabajar también puede ser una forma de cariño. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle cómo era de niña en Green Gables**: Marilla, al principio seca, termina dejando ver una infancia más dura y silenciosa de lo que Ana imaginaba; eso la vuelve un poco más cercana a los ojos de Ana. _(repite 0 · sigue 1 · contenido 2)_
- 🔁 **Hablarle de ir a Queen's y de si podrá seguir siendo ella misma**: Ana confiesa sus ilusiones y temores sobre el futuro; Marilla la escucha con severidad práctica, pero le da un consejo inesperadamente alentador sobre estudiar sin dejar de ser buena. _(repite 11 · sigue 0 · contenido 2)_

### marilla · mixto · 2

- **Pedirle que le enseñe a remendar una manga rasgada**: Ana intenta coser un desgarrón pequeño; Marilla le muestra puntada firme y le advierte que la ropa dura más que la imaginación, aunque termina dejándola escoger el hilo. _(repite 0 · sigue 1 · contenido 2)_
- **Preguntarle por qué guarda una caja de botones tan ordenada**: Ana descubre la costumbre de Marilla de conservar y clasificar botones, y ella explica, seca pero con cierta ternura, que en una casa nada útil debe desperdiciarse. _(repite 0 · sigue 1 · contenido 1)_
- **Contarle que vio a una vecina muy desdichada y pedirle consejo**: Ana habla de una persona de Avonlea que la intriga; Marilla le enseña a no opinar con ligereza sobre los demás y deja ver que también ella observa mucho más de lo que parece. _(repite 0 · sigue 1 · contenido 2)_
- **Preguntarle cómo se cuida el huerto cuando el suelo está cansado**: Ana quiere ayudar en la granja y Marilla le enseña a reconocer la tierra agotada, revelando que la paciencia con las cosechas es casi tan importante como con la gente. _(repite 0 · sigue 2 · contenido 2)_
- **Pedirle que le cuente algo de cuando era joven**: Ana logra arrancarle a Marilla un recuerdo de muchacha, sencillo y sorprendente, y descubre que su severidad esconde una vida más llena de alegrías y renuncias de lo que imaginaba. _(repite 0 · sigue 1 · contenido 2)_

### marilla · mixto · 3

- **Preguntarle a Marilla cómo era de niña en Green Gables**: Ana intenta imaginar a Marilla pequeña y descubre, para su sorpresa, que también fue una niña menuda, seria y trabajadora, aunque Marilla corta la charla antes de que se vuelva demasiada romántica. _(repite 0 · sigue 1 · contenido 2)_
- **Pedirle que le enseñe a remendar un calcetín**: Marilla le muestra a Ana cómo zurcir sin dejar bultos; entre puntada y puntada, Ana aprende que las cosas rotas pueden arreglarse con paciencia, y Marilla deja caer que la utilidad vale más que la apariencia. _(repite 0 · sigue 1 · contenido 1)_
- **Contarle que quiere ayudar más en la granja**: Ana dice que desea ser verdaderamente útil en Green Gables; Marilla le asigna una tarea sencilla y concreta, y por primera vez le concede que la niña tiene más manos listas de lo que ella misma cree. _(repite 0 · sigue 2 · contenido 1)_
- **Preguntarle qué piensa de que Ana vaya a la escuela pronto**: Ana se atreve a hablar de la escuela y de su temor a no ser tan lista como otras niñas; Marilla, con su sequedad habitual, le hace ver que el trabajo y la disciplina importan más que asustarse antes de tiempo. _(repite 0 · sigue 2 · contenido 1)_
- **Pedirle que le enseñe a ordenar la despensa**: Marilla la deja entrar en su territorio favorito y le enseña cómo disponer tarros, sacos y provisiones; Ana descubre el orgullo secreto de Marilla por el orden, y Marilla admite, casi de mala gana, que una casa bien dispuesta también puede ser bonita. _(repite 0 · sigue 2 · contenido 2)_

### marilla · hechas · 1

- **Ana pregunta si puede ayudar a Marilla a ordenar la despensa**: Marilla le enseña a colocar frascos y sacos por tamaños y fechas; Ana descubre que el orden puede ser casi tan satisfactorio como una historia bien contada. _(repite 0 · sigue 1 · contenido 2)_
- **Ana quiere aprender a hacer mermelada de frambuesa**: Marilla le explica cuándo la fruta está en su punto y cómo no distraerse; Ana promete no probarla a escondidas, aunque le cueste mucho. _(repite 0 · sigue 1 · contenido 2)_
- **Ana pregunta por qué Marilla guarda tantas semillas**: Marilla le habla de la importancia de guardar para la próxima estación; Ana comprende que en la granja siempre se piensa en el porvenir, aunque el verano sea hermoso. _(repite 0 · sigue 1 · contenido 2)_
- 🔁 **Ana le pide a Marilla que le muestre cómo remendar un calcetín**: Marilla le enseña puntada por puntada, y Ana descubre que incluso las cosas pequeñas pueden arreglarse con paciencia. _(repite 8 · sigue 1 · contenido 1)_
- **Ana quiere saber cómo reconoce Marilla si una planta está enferma**: Marilla le muestra hojas, tallos y señales de daño en el huerto; Ana aprende a mirar con más atención y promete observar antes de sacar conclusiones. _(repite 0 · sigue 1 · contenido 2)_

### marilla · hechas · 2

- **Aprender a remendar calcetines y coser un botón sin pincharse los dedos**: Marilla le deja a Ana una aguja y un trozo de lienzo; Ana descubre que la costura exige paciencia, y Marilla admite que un dobladillo derecho vale más que muchos buenos propósitos. _(repite 0 · sigue 1 · contenido 2)_
- **Ir a buscar huevos al gallinero sin romper ninguno**: Ana quiere hacerlo sola; Marilla le enseña a mirar por dónde pisa y a llevar la cesta pegada al cuerpo, y Ana comprende que las gallinas se respetan mejor en silencio. _(repite 0 · sigue 2 · contenido 1)_
- 🔁 **Sembrar nabos en la huerta y saber cuándo la tierra está lista**: Tras pedirle que le enseñe a sembrar, Marilla le muestra la diferencia entre tierra seca y tierra trabajada, y Ana aprende que en la granja todo tiene su tiempo, aunque uno tenga prisa. _(repite 11 · sigue 2 · contenido 1)_
- **Preparar la mesa de la cena y doblar las servilletas como corresponde**: Marilla le corrige la manera de poner platos y cubiertos; Ana se toma el deber muy en serio y descubre que hasta una mesa bien puesta puede parecer una especie de ceremonia. _(repite 0 · sigue 1 · contenido 1)_
- **Saber qué hacer en la casa cuando Matthew se queda callado y Marilla está ocupada**: Ana pregunta cómo ayudar sin estorbar; Marilla le da encargos pequeños y útiles, y Ana descubre que el verdadero buen comportamiento se ve en las cosas discretas. _(repite 0 · sigue 2 · contenido 2)_

### marilla · hechas · 3

- **Pedirle a Marilla que le enseñe a zurcir un calcetín**: Marilla la pone a remendar junto a la ventana; Ana se pincha los dedos, pero aprende que un zurcido bien hecho vale más que un capricho nuevo. _(repite 0 · sigue 1 · contenido 2)_
- **Preguntarle a Marilla cómo se maneja la granja cuando llega la primavera**: Marilla le explica qué se siembra primero, qué se guarda y qué no debe hacerse antes de tiempo; Ana descubre que la granja también tiene su calendario secreto. _(repite 0 · sigue 2 · contenido 2)_
- 🔁 **Contarle a Marilla que quiere ayudar más en la cocina**: Ana pide tareas de verdad y Marilla le deja pelar patatas con cuidado; termina admitiendo, a su manera, que la niña aprende deprisa cuando se esfuerza. _(repite 8 · sigue 1 · contenido 1)_
- **Preguntarle a Marilla por qué siempre mira tanto la cuenta de la despensa**: Marilla le enseña que el orden evita apuros y que una casa se sostiene con previsión; Ana comprende que la economía de Avonlea tiene tanto de sensatez como de sacrificio. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle a Marilla si alguna vez fue niña**: Marilla tarda en responder, pero deja caer que también tuvo su parte de terquedad y orgullo; Ana descubre, con asombro, que detrás de la severidad hubo una muchacha parecida a ella. _(repite 0 · sigue 1 · contenido 2)_

### marilla · claves · 1

- **Ana le pregunta a Marilla cómo sabe si una muchacha está creciendo de veras**: Marilla, con una severidad casi cómica, le explica que crecer no es solo hacerse más alta; Ana acaba preguntándose si su alma también ha crecido o si sigue tan desordenada como siempre. _(repite 0 · sigue 1 · contenido 2)_
- **Ana le pide que le enseñe a remendar una costura sin que se note**: Marilla le muestra con paciencia práctica cómo una puntada bien hecha puede salvar una prenda; Ana descubre que la perfección de Marilla no es frialdad, sino cuidado por las cosas que duran. _(repite 0 · sigue 2 · contenido 2)_
- **Ana confiesa que a veces teme aburrir a la gente cuando habla demasiado**: Marilla le responde, seca pero verdadera, que el exceso de palabras se corrige mejorando el juicio; sin embargo, deja escapar que en la casa sería demasiado silenciosa sin la voz de Ana. _(repite 0 · sigue 1 · contenido 2)_
- **Ana le pregunta por qué Marilla nunca se permite estar triste delante de nadie**: Marilla esquiva la pregunta al principio, pero termina admitiendo que hay penas que se trabajan como la tierra: en silencio y sin espectáculo; Ana la mira con nueva ternura y respeto. _(repite 0 · sigue 1 · contenido 2)_
- **Ana quiere saber qué cosas de la granja no aprenderá nunca si no pregunta a tiempo**: Marilla le habla de las estaciones, de las gallinas, de guardar semillas y de reconocer cuándo una cosa está hecha para durar; Ana comprende que la vida en Avonlea se aprende tanto mirando como soñando. _(repite 0 · sigue 2 · contenido 1)_

### marilla · claves · 2

- 🔁 **Ana le enseña a Marilla la receta que más le gustaría cocinar sola**: Ana, con gran solemnidad, pide permiso para repetir la receta de pastel que aprendió y Marilla le hace notar que medir bien es útil en más de un asunto; termina con Marilla concediéndole una tarea pequeña y vigilada en la cocina. _(repite 8 · sigue 1 · contenido 1)_
- **Ana pregunta si en la granja también se aprende a leer el tiempo del cielo**: Partiendo de sus charlas con Matthew sobre el cielo, Ana quiere saber si las nubes y el viento sirven de aviso para las labores; Marilla le explica algunos signos del campo y Ana descubre que la granja también tiene su propio lenguaje. _(repite 0 · sigue 1 · contenido 1)_
- 🔁 **Ana se lamenta de que hablar demasiado le hace perder lo que observa**: Ana confiesa, con cierta vergüenza, que a veces habla tanto que no recuerda bien las cosas que ve; Marilla le responde que la lengua puede irse a paseo, pero la cabeza debe quedarse en casa, y le da un consejo práctico para fijarse mejor en las tareas. _(repite 4 · sigue 1 · contenido 1)_
- **Ana pregunta por Carrie y por qué los pequeños aprenden de otro modo**: Ana muestra interés por Carrie y por cómo se cuida a una niña tan pequeña en Avonlea; Marilla, seca pero atenta, le cuenta diferencias entre criar a una niña mayor y a una menor, y deja ver una faceta más tierna de su experiencia. _(repite 0 · sigue 2 · contenido 2)_
- **Ana intenta descubrir si Marilla alguna vez soñó con otra vida**: A partir de una pregunta inocente sobre la severidad de los adultos, Ana se atreve a insinuar que Marilla también debió imaginar cosas de joven; Marilla no lo niega del todo, pero corta la curiosidad con un comentario seco que revela más de lo que dice. _(repite 0 · sigue 1 · contenido 2)_

### marilla · claves · 3

- **Ana le pide a Marilla que le enseñe a coser un dobladillo recto**: Marilla le muestra con severidad y paciencia cómo rematar una costura; Ana aprende que en una labor bien hecha hay más imaginación de la que parece. _(repite 0 · sigue 1 · contenido 2)_
- **Ana le pregunta por qué Marilla nunca desperdicia nada en la despensa**: Marilla explica, sin adornos, cómo se aprovecha cada cosa en una casa de granja; Ana descubre que la economía de Avonlea también es una forma de cuidado. _(repite 0 · sigue 1 · contenido 1)_
- **Ana quiere saber cómo se riega y aporca una planta del huerto**: Marilla la lleva al huerto y le enseña a trabajar la tierra sin maltratar las raíces; Ana se maravilla de que una planta pueda ‘agradecer’ las manos firmes. _(repite 0 · sigue 1 · contenido 1)_
- **Ana le pregunta a Marilla por qué a veces Matthew no dice nada y aun así parece entenderlo todo**: Marilla, tras una pausa, admite que Matthew tiene más juicio del que presume; Ana comprende mejor el silencio de la casa y el cariño que hay en él. _(repite 0 · sigue 2 · contenido 2)_
- **Ana le pregunta a Marilla cómo se reconoce una amistad verdadera**: Marilla responde con ejemplos prácticos, no con palabras dulces; Ana descubre que la amistad se nota en lo que una persona hace cuando nadie la mira. _(repite 0 · sigue 1 · contenido 2)_

### matthew · nada · 1

- **Preguntarle por qué guarda siempre el sombrero en la misma repisa**: Ana descubre que Matthew tiene pequeños hábitos secretos y él confiesa, con mucha vergüenza, que le gusta encontrar siempre las cosas en su sitio porque así el día parece menos espantoso. _(repite 0 · sigue 1 · contenido 2)_
- **Sentarse con él junto al establo a oír caer la lluvia**: La charla deriva en la vida tranquila de la granja, y Matthew revela que la lluvia le agrada porque le permite pensar sin que nadie le exija palabras. _(repite 0 · sigue 2 · contenido 2)_
- **Pedirle que le cuente cómo era Green Gables cuando era joven**: Matthew recuerda su niñez y deja ver un lado sorprendentemente dulce y nostálgico, mostrándole a Ana que la casa fue feliz mucho antes de que ella llegara. _(repite 0 · sigue 1 · contenido 2)_
- **Preguntarle si también ha tenido miedo alguna vez**: Ana descubre que Matthew, aunque parezca siempre sereno, ha sentido miedo de equivocarse y de hablar demasiado, y eso los acerca de una manera nueva. _(repite 0 · sigue 1 · contenido 2)_
- 🔁 **Pedirle que le enseñe a elegir semillas buenas en el granero**: Mientras revisan sacos y cajitas, Matthew le enseña a observar con paciencia, y Ana entiende que detrás de su silencio hay una sabiduría muy cuidadosa. _(repite 1 · sigue 2 · contenido 1)_

### matthew · nada · 2

- **preguntarle a Matthew qué cosas le gustan más del campo cuando llega la tarde**: Ana descubre que a Matthew le gustan los pequeños silencios del crepúsculo y que, pese a su timidez, sabe nombrar la belleza del día que termina. _(repite 0 · sigue 1 · contenido 2)_
- **contarle a Matthew que está aprendiendo a observar las gallinas como si tuvieran costumbres y secretos**: Matthew se anima a hablar de los animales de la granja y revela que él también ve en ellos maneras y manías que nadie más nota. _(repite 0 · sigue 1 · contenido 1)_
- **pedirle a Matthew que le diga cuál es la mejor hora para trabajar en la granja**: Él le explica sus rutinas favoritas del amanecer y Ana comprende que Matthew prefiere el trabajo tranquilo, antes de que el mundo se llene de voces. _(repite 0 · sigue 2 · contenido 1)_
- **preguntarle a Matthew si alguna vez quiso tener una hija**: Matthew, muy conmovido, admite sin rodeos que sí, y deja entrever cuánto cariño le tiene a Ana y cuánto ha cambiado su vida desde que llegó a Green Gables. _(repite 0 · sigue 1 · contenido 2)_
- **decirle a Matthew que le gustaría ayudarlo con una tarea de la granja sin estorbar**: Matthew acepta con una sonrisa tímida y le confía una labor sencilla, mostrando que ya confía en ella lo bastante como para ponerla a su lado en el trabajo. _(repite 0 · sigue 2 · contenido 2)_

### matthew · nada · 3

- **Preguntarle si en la juventud fue tan callado como ahora**: Ana quiere saber si Matthew siempre habló tan poco; él admite que de muchacho era aún más tímido y que la granja le enseñó a escuchar más que a hablar. _(repite 0 · sigue 1 · contenido 2)_
- **Contarle que ha visto una carta en la mesa y preguntar de quién era**: Ana, curiosa, menciona una carta reciente; Matthew revela con suavidad que era para negocios de la granja y deja entrever que le cuestan mucho los asuntos escritos. _(repite 0 · sigue 1 · contenido 1)_
- **Pedirle que le enseñe el camino más corto hasta el prado del manzano**: Ana desea conocer un atajo por la granja; Matthew le muestra un sendero escondido y termina confesando que ese rincón es uno de sus lugares favoritos en silencio. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle qué cosa de la granja echaría de menos si se fuera de Avonlea**: Ana plantea una pregunta inesperadamente seria; Matthew responde que echaría de menos la paz del lugar, y se revela que rara vez piensa en irse de allí. _(repite 0 · sigue 1 · contenido 2)_
- **Decirle que puede distinguir cuándo está preocupado aunque no lo diga**: Ana nota su semblante y lo enfrenta con cariño; Matthew se sorprende de que ella lo conozca tan bien y, tras vacilar, admite que a veces se preocupa por Marilla más de lo que deja ver. _(repite 0 · sigue 1 · contenido 2)_

### matthew · temas · 1

- **Contarle que en la escuela la llaman «la chica de Avonlea»**: Ana le cuenta a Matthew cómo la nombran los demás niños y él, con esa lealtad silenciosa suya, termina sintiéndose orgulloso de ella y de que ya pertenezca de algún modo al lugar. _(repite 0 · sigue 1 · contenido 2)_
- 🔁 **Preguntarle cómo era sembrar en la granja cuando él era joven**: Ana lo anima a recordar otros tiempos en Green Gables; Matthew habla más de lo que suele y deja entrever cuánto añoraba una casa llena de vida antes de que ella llegara. _(repite 1 · sigue 1 · contenido 2)_
- 🔁 **Pedirle que le enseñe a distinguir una semilla de una mala hierba**: Ana quiere aprender de verdad, y Matthew descubre que puede enseñarle algo útil sin ponerse nervioso; la conversación termina con un pequeño plan para trabajar juntos en el huerto. _(repite 2 · sigue 2 · contenido 1)_
- **Contarle que a veces imagina que Green Gables la estaba esperando**: Ana se confiesa con su habitual fervor, y Matthew, conmovido, deja caer una respuesta mínima pero decisiva que le confirma que él también siente que ella llegó a la casa por una razón. _(repite 0 · sigue 1 · contenido 2)_
- 🔁 **Preguntarle si cree que una persona puede volverse menos tímida con los años**: Ana quiere saber si el miedo de Matthew a las señoras tiene cura, y él, entre torpeza y sinceridad, admite algo de sí mismo que antes no decía, como si con ella fuera menos vergonzoso confesarlo. _(repite 1 · sigue 0 · contenido 1)_

### matthew · temas · 2

- 🔁 **Contarle lo que vio en la casa del cementerio cuando volvió del camino**: Ana, todavía con el corazón encendido, le describe a Matthew alguna rareza o belleza encontrada de camino a casa; él la escucha con su silencioso asombro, y termina admitiendo que con ella hasta las cosas tristes parecen menos solitarias. _(repite 1 · sigue 1 · contenido 2)_
- 🔁 **Pedirle que le enseñe a tratar un caballo sin asustarlo**: Ana quiere aprender los modales de la granja de la mano de Matthew; él le explica con paciencia, y de paso se revela que tiene una manera muy suave de entender a los animales, como si hablara su mismo idioma. _(repite 6 · sigue 2 · contenido 2)_
- 🔁 **Contarle que ha pensado en quedarse quieta y portarse bien, pero le cuesta**: Ana, medio avergonzada y medio divertida, le confiesa su buena intención; Matthew la consuela con una frase sencilla, y queda claro que para él su viveza no es un defecto sino una alegría. _(repite 1 · sigue 1 · contenido 2)_
- **Preguntarle cómo era ser niño en Green Gables cuando él era pequeño**: Ana le pide a Matthew recuerdos de su infancia y de los veranos en la granja; él cuenta muy poco, pero lo suficiente para dejar entrever cuánto ha cambiado el mundo y cuánto sigue siendo igual la tierra de Avonlea. _(repite 0 · sigue 1 · contenido 1)_
- **Contarle que ha empezado a imaginar una historia para los senderos del huerto**: Ana le habla de ponerle una pequeña historia a un rincón de la granja, como si el sitio tuviera memoria; Matthew, tocado por su manera de mirar todo, deja caer una observación que convierte ese lugar en algo casi sagrado para ella. _(repite 0 · sigue 2 · contenido 2)_

### matthew · temas · 3

- **Contarle que en Green Gables ya hay un rincón favorito para mirar las nubes**: Ana le dice a Matthew que ha encontrado un lugar del patio donde el cielo parece más grande; él escucha con gusto y queda en claro que a ella le consuela el paisaje tanto como a él. _(repite 0 · sigue 1 · contenido 2)_
- **Preguntarle si alguna vez fue niño tranquilo o siempre fue tan callado**: Ana intenta imaginar a Matthew pequeño y descubre, por sus respuestas cortas, que él no siempre fue tan silencioso por timidez: hubo razones de trabajo y costumbre que lo volvieron así. _(repite 0 · sigue 1 · contenido 2)_
- **Pedirle que le enseñe a cuidar mejor los caballos**: A raíz de su gusto por la granja, Ana quiere aprender a tratar a los caballos sin miedo; Matthew accede con paciencia y se revela cuánto confía en ella para estas tareas. _(repite 0 · sigue 2 · contenido 2)_
- 🔁 **Contarle que quiere ponerle nombres a las gallinas**: Ana propone bautizar a las gallinas como hizo con los caminos y los lugares; Matthew se divierte más de lo que dice y termina dejando ver que le agrada verla convertir la granja en un mundo propio. _(repite 2 · sigue 1 · contenido 1)_
- **Preguntarle qué cosas de la granja cree que conviene hacer al amanecer**: Ana busca saber cómo piensa Matthew el trabajo de la mañana y descubre una costumbre suya muy antigua y ordenada; la conversación la acerca a su manera serena de vivir. _(repite 0 · sigue 2 · contenido 2)_

### matthew · resumenes · 1

- **Preguntarle qué piensa hacer con las capuchinas de su huerto**: Ana vuelve a las semillas que él le regaló y le pregunta dónde crecerán mejor; Matthew, con esa quieta seriedad suya, le dice que pueden bordear el camino y que, si ella quiere, él mismo le preparará la tierra para verlas levantarse como llamitas naranjas. _(repite 0 · sigue 2 · contenido 2)_
- **Contarle que quiere poner nombre a la huerta**: Ana propone un nombre para el rinconcito que sembraron juntos; Matthew escucha, un poco divertido y muy enternecido, y termina aceptando que, en adelante, no será sólo la huerta, sino un lugar con nombre propio, casi como un pequeño reino de Ana. _(repite 0 · sigue 1 · contenido 2)_
- **Preguntarle si alguna vez tuvo miedo cuando era joven**: Ana, curiosa, le pregunta si siempre fue así de callado y tímido; Matthew admite que no siempre, pero que desde joven las mujeres lo dejan sin palabras, y deja caer, sin querer, que antes de Marilla también fue muy solo. _(repite 0 · sigue 2 · contenido 2)_
- **Contarle que quiere ayudarlo con las tareas de la granja**: Ana decide ser útil y le ofrece acompañarlo a recoger huevos o a llevar agua; Matthew, sorprendido y agradecido, le confiesa que le gusta más hacer las faenas cuando ella va cerca, porque todo parece menos pesado y más alegre. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle por qué mira tanto la carretera**: Ana nota que Matthew se queda mirando el camino como si esperara algo; él acaba revelando, con gran pudor, que siempre le alegra pensar en las visitas y en las vueltas a casa, y Ana comprende que para él la carretera es un lugar de esperanzas, no sólo de polvo. _(repite 0 · sigue 2 · contenido 2)_

### matthew · resumenes · 2

- **Contarle que vio a Gilbert Blythe en el camino**: Ana le cuenta a Matthew un encuentro con Gilbert; Matthew, muy grave, oye el nombre como si fuera un asunto importante y la deja hablar hasta que ella misma decide si aún está enojada o no. _(repite 0 · sigue 1 · contenido 2)_
- **Pedirle que le muestre cómo arreglar la cerca**: Matthew la lleva a la granja y le enseña a clavar una estaca y a mirar si el alambre cede; Ana descubre que él conoce los trabajos con una paciencia callada que parece otra forma de cariño. _(repite 0 · sigue 2 · contenido 2)_
- **Contarle que quiere un vestido nuevo para la escuela**: Ana le describe cómo sueña su vestido ideal y Matthew termina prometiéndole ayuda con la tela, revelando que ha estado pensando en hacerle algo bonito sin decirlo en voz alta. _(repite 0 · sigue 1 · contenido 2)_
- **Preguntarle cómo era de niño en la granja**: Ana intenta imaginar a Matthew pequeño, y él, con muchas pausas, deja caer dos o tres recuerdos de antes de Marilla y de los días duros, mostrando un lado suyo más antiguo y tierno. _(repite 0 · sigue 1 · contenido 2)_
- **Sentarse con él a oír las gallinas y el viento**: Ana y Matthew se quedan quietos un rato en el patio; en ese silencio, él se anima a comentar una costumbre de la granja o una señal del tiempo, y Ana siente que hasta el silencio con Matthew es conversación. _(repite 0 · sigue 2 · contenido 1)_

### matthew · resumenes · 3

- 🔁 **Preguntarle si las capuchinas ya están asomando**: Ana corre a ver si las semillas que Matthew le dio han brotado; él le dice que sí, que las plantas ya asoman valientes, y promete ayudarla a ponerles un palito cuando crezcan. _(repite 6 · sigue 1 · contenido 1)_
- 🔁 **Pedirle que la acompañe a ver cómo va el huerto**: Ana quiere mostrarle a Matthew su rinconcito de tierra y saber si lo sembró bien; él acepta en silencio, mira los surcos con orgullo y le señala dónde convendría aclarar las plantitas. _(repite 6 · sigue 2 · contenido 1)_
- **Contarle que quiere cuidar un jardín de verdad**: Ana le confiesa su sueño de tener un jardín hermoso, no solo flores al azar; Matthew, animado, le promete que podrá elegir las semillas y que él la ayudará a hacer el terreno a su gusto. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle qué cosas le hacían falta en la granja cuando era joven**: Ana, curiosa, quiere saber cómo era la granja antes y qué faltaba o sobraba en otros tiempos; Matthew recuerda una o dos cosas sencillas y deja ver que la granja ha cambiado más de lo que parece. _(repite 0 · sigue 1 · contenido 1)_
- **Contarle que quiere aprender a reconocer las plantas del camino**: Ana propone aprender los nombres de las hierbas y flores que ve al andar; Matthew, sorprendido por tanto empeño, acepta enseñarle las que conoce y descubre que ella ya distingue más de lo que aparenta. _(repite 0 · sigue 2 · contenido 2)_

### matthew · mixto · 1

- 🔁 **Contarle cómo fue la escuela y si hizo alguna amiga nueva**: Ana le cuenta a Matthew de la escuela, de la señorita Stacy o de alguna niña, y él escucha con esa atención silenciosa que hace que ella se anime más de lo que esperaba. _(repite 1 · sigue 2 · contenido 1)_
- 🔁 **Contarle los nombres que les puso a los lugares del camino a casa**: Ana enumera los nombres imaginarios de los sitios del camino; Matthew descubre que su mundo cotidiano está lleno de poesía y termina sonriendo en silencio. _(repite 2 · sigue 2 · contenido 1)_
- 🔁 **Pedirle que le enseñe a cuidar una plantita en la granja**: Ana quiere saber cómo regar, deshierbar y proteger la capuchina; Matthew le muestra con calma y se revela que confía en ella para algo vivo y delicado. _(repite 6 · sigue 2 · contenido 2)_
- 🔁 **Preguntarle si de verdad habría preferido tener un niño**: Ana se atreve a hacer la pregunta más sensible y Matthew, incómodo pero sincero, le deja ver que no cambiaría por nada haberla conocido a ella. _(repite 9 · sigue 1 · contenido 2)_
- 🔁 **Sentarse con él a mirar cómo se pone el sol sobre los campos**: Sin decir mucho, los dos comparten el atardecer; Ana imagina historias y Matthew admite, a su manera, que esos momentos tranquilos son sus favoritos. _(repite 3 · sigue 1 · contenido 1)_

### matthew · mixto · 2

- **Contarle cómo le fue en la escuela y si logró decir la respuesta sin equivocarse**: Ana le relata su día en clase, con algo de vergüenza y orgullo; Matthew escucha con atención y, sin decir mucho, le deja claro que no le importa si se equivoca un poco mientras siga intentándolo. _(repite 0 · sigue 1 · contenido 2)_
- 🔁 **Contarle los nombres que les puso a los lugares del camino a casa**: Ana enumera nombres imaginarios para los sitios favoritos de Avonlea; Matthew se sorprende de lo bien que encajan y acaba revelando que él también nombra las cosas en silencio, aunque nunca se lo había dicho a nadie. _(repite 2 · sigue 2 · contenido 2)_
- **Preguntarle si de pequeño también soñaba con tener un rincón propio en la granja**: La charla empieza con la infancia de Matthew y termina mostrando que hubo algo que él deseó y no pidió; Ana descubre que su timidez viene de antes, pero también su ternura por los lugares tranquilos. _(repite 0 · sigue 1 · contenido 2)_
- 🔁 **Pedirle que le enseñe a escoger qué sembrar para que el huertito quede bonito y útil**: Ana quiere decidir entre flores y hortalizas, y Matthew le explica pacientemente cómo piensa un buen sembrado; al final, Ana comprende que la granja también puede ser hermosa sin dejar de servir. _(repite 6 · sigue 2 · contenido 1)_
- **Contarle que hay cosas en Avonlea que le dan vergüenza y preguntarle cómo se sobrelleva eso**: Ana confiesa un miedo pequeño pero muy suyo, y Matthew, con su manera sencilla, le muestra que la vergüenza no desaparece del todo, pero puede hacerse más llevadera cuando alguien la toma en serio. _(repite 0 · sigue 2 · contenido 2)_

### matthew · mixto · 3

- 🔁 **Contarle cómo le fue en la escuela y si la señorita Stacy cree que ya lee “como debe ser”**: Ana le relata un día de escuela lleno de nervios y orgullo; Matthew, muy atento, descubre que a ella le importa más la aprobación de la maestra de lo que decía, y se queda con la idea de que su niña quiere hacer las cosas bien. _(repite 8 · sigue 1 · contenido 1)_
- 🔁 **Contarle los nombres que les puso a los lugares del camino y del huerto**: Ana enumera sus nombres con solemnidad y fantasía; Matthew escucha con seriedad, y termina revelándose que él recuerda cada sitio por la manera en que ella lo nombró, como si el mundo hubiera quedado un poco más suyo. _(repite 2 · sigue 2 · contenido 1)_
- 🔁 **Preguntarle si no habría preferido un niño en vez de ella**: Ana lo plantea con temor, como quien toca una herida; Matthew, después de una pausa larga, deja entrever con pocas palabras que no imagina la casa sin ella, y que su preferencia ya no se parece en nada a la que hubiera tenido antes. _(repite 9 · sigue 1 · contenido 2)_
- **Contarle lo que vio en la granja y pedirle que le enseñe a mirar si la tierra está “lista para beber lluvia”**: Ana observa la tierra con ojos nuevos y Matthew le enseña a fijarse en señales simples del campo; la conversación cambia cuando ella entiende que la granja también tiene su lenguaje secreto, y él se muestra más orgulloso de su entendimiento de lo que diría. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle si alguna vez tuvo miedo de decir algo en voz alta**: Ana, curiosa por su silencio, le hace una pregunta inesperadamente íntima; Matthew confiesa a medias que sí, que hay palabras que se le quedan atrapadas, y Ana descubre que su quietud no es vacío sino reserva, lo que los acerca todavía más. _(repite 0 · sigue 1 · contenido 2)_

### matthew · hechas · 1

- **Pedirle a Matthew que le cuente qué hacía cuando era chico en la granja**: Ana le pregunta por su niñez y Matthew, con sus pocas palabras, termina recordando un trabajo sencillo de muchacho y lo distinto que era Avonlea antes; Ana descubre que él también fue un niño callado y curioso. _(repite 0 · sigue 1 · contenido 2)_
- **Preguntarle qué flor le gusta más de las que crecen en la granja**: Ana quiere saber su preferida entre las flores y Matthew, sorprendido, elige una modesta y útil más que una llamativa; Ana aprende que él ve la belleza en cosas humildes y no solo en lo bonito. _(repite 0 · sigue 1 · contenido 1)_
- **Contarle que quiere ayudar más en la granja y pedirle un encargo propio**: Ana le dice que desea sentirse útil de verdad, y Matthew le confía una tarea pequeña pero importante; ella comprende que él confía en ella a su manera, y se siente orgullosa de haber ganado un lugar. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle si alguna vez tuvo miedo de la oscuridad o de quedarse solo**: Ana, en una conversación más íntima, le pregunta por sus temores; Matthew admite algo de su soledad de antes, y ambos comparten un silencio cálido que los acerca más que las palabras. _(repite 0 · sigue 1 · contenido 2)_
- **Contarle que ha pensado en un nombre para la granja o para un rincón del huerto**: Ana propone bautizar un lugar de la granja con un nombre imaginativo; Matthew escucha con atención y acaba aceptando la idea, dejando ver que le agrada la fantasía de Ana más de lo que diría en voz alta. _(repite 0 · sigue 1 · contenido 1)_

### matthew · hechas · 2

- **Pedirle a Matthew que le cuente cómo era de muchacho en Avonlea**: Ana le pregunta por su niñez, y Matthew, a medias entre vergüenza y sorpresa, deja caer que también fue tímido antes; ella descubre que no siempre fue el hombre silencioso que conoce. _(repite 0 · sigue 1 · contenido 2)_
- **Contarle a Matthew que quiere aprender a cuidar la granja como una verdadera dueña**: Ana habla de vacas, gallinas y encargos de la casa; Matthew se anima a explicarle qué hace falta en cada estación, y Ana se siente, por primera vez, útil de verdad. _(repite 0 · sigue 2 · contenido 2)_
- 🔁 **Preguntarle a Matthew por qué nunca se enfada con ella aunque haga travesuras**: Matthew admite, muy quedado, que le cuesta regañarla porque le tiene un cariño especial; Ana entiende que su indulgencia no es simple debilidad, sino preferencia por ella. _(repite 2 · sigue 2 · contenido 2)_
- **Pedirle que le enseñe a reconocer las cosas de la granja por su sonido**: Matthew la lleva a escuchar el viento en el granero, el crujido del heno y el canto de las aves; Ana descubre que la granja tiene una música propia que no había notado. _(repite 0 · sigue 1 · contenido 1)_
- **Contarle a Matthew que a veces le gustaría hacer algo grande por él**: Ana le confiesa que quisiera agradecerle con una hazaña o un regalo importante; Matthew, conmovido, la hace entender que quedarse a su lado y quererlo ya es bastante. _(repite 0 · sigue 1 · contenido 2)_

### matthew · hechas · 3

- **Preguntarle a Matthew si alguna vez quiso ir a otro lugar que no fuera Avonlea**: Ana le pregunta por sus sueños de muchacho; Matthew admite, a su modo, que vio el mundo con curiosidad, pero que su sitio siempre estuvo en Green Gables. _(repite 0 · sigue 1 · contenido 2)_
- **Contarle a Matthew sobre lo que pasa cuando Marilla se enoja y luego se le pasa**: Ana le describe el temperamento de Marilla con mucho detalle; Matthew termina revelando que, aunque rara vez lo diga, confía en que Ana sabrá ablandar hasta el ánimo más duro. _(repite 0 · sigue 1 · contenido 2)_
- **Pedirle a Matthew que le enseñe a arreglar una herramienta de la granja**: Mientras trabajan juntos, Matthew muestra una paciencia inesperada y Ana descubre que él sabe mucho más de lo que aparenta; él se deja querer en silencio. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle a Matthew por qué los campos parecen tan tristes antes de sembrar**: Ana habla del color apagado de la tierra desnuda; Matthew le explica, con pocas palabras, que la espera también forma parte de la cosecha. _(repite 0 · sigue 1 · contenido 1)_
- **Contarle a Matthew que quiere invitar a una de las niñas a jugar en la huerta**: Ana menciona a Cecily o Carrie y se imagina una tarde en la tierra; Matthew la anima con una aprobación tímida, mostrándose contento de verla pensar en compañía. _(repite 0 · sigue 2 · contenido 1)_

### matthew · claves · 1

- **Contarle que esta mañana vio un nido en el seto y preguntarle si él distingue un nido bueno de uno pobre**: Ana le cuenta el hallazgo del nido y Matthew, con su calma de granjero, le enseña a fijarse en la paja, la firmeza y el sitio; Ana descubre que él sabe ver las cosas menudas sin hacer ruido. _(repite 0 · sigue 1 · contenido 2)_
- **Preguntarle qué semilla le gusta más sembrar cuando trabaja solo en el campo**: Matthew elige una semilla favorita y explica, con pocas palabras, por qué; Ana comprende que hasta en la siembra hay gustos personales, y que él guarda pequeños afectos en silencio. _(repite 0 · sigue 1 · contenido 1)_
- **Contarle que a veces el camino le parece demasiado grande y preguntarle si alguna vez se sintió solo en la granja**: Matthew admite una soledad vieja y tranquila, pero dice que la granja también le responde; Ana se siente menos rara al saber que él conoce esa clase de silencio. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle qué hace cuando un trabajo le sale mal y no quiere que Marilla lo note**: Matthew confiesa alguna torpeza de granja y cómo la corrige sin hacer alboroto; Ana descubre que él también se equivoca, pero no se enfada consigo mismo. _(repite 0 · sigue 1 · contenido 2)_
- **Pedirle que le cuente cuál fue el mejor día de cosecha que recuerda**: Matthew habla de una cosecha abundante y de un detalle sencillo que la volvió especial; Ana entiende que para él los días felices suelen ser modestos, pero muy hondos. _(repite 0 · sigue 1 · contenido 1)_

### matthew · claves · 2

- **Pedirle a Matthew que le cuente cómo era Avonlea cuando él era niño**: Ana lo anima a recordar otro Avonlea, y Matthew, con pocas palabras, deja caer que antes todo era más duro y silencioso; Ana descubre que su bondad viene de una vida muy distinta a la suya. _(repite 0 · sigue 1 · contenido 2)_
- **Preguntarle a Matthew si de verdad le gustaría tener un caballo**: Ana lo lleva a hablar de la granja y Matthew, casi avergonzado, admite que siempre ha querido uno para ir más ligero al trabajo; eso revela un deseo suyo, pequeño pero muy propio, que él nunca dice en voz alta. _(repite 0 · sigue 1 · contenido 1)_
- **Contarle a Matthew que las flores también se pueden cuidar de noche**: Ana le habla de riego y protección de las plantas, y Matthew le confiesa que a veces pasa a mirar el huerto antes de dormir; queda mostrado que él sigue sus atenciones con más ternura de la que aparenta. _(repite 0 · sigue 1 · contenido 1)_
- **Preguntarle a Matthew por qué nunca responde cuando alguien lo contradice**: Ana nota su costumbre de callar y él, con una frase breve, deja entender que prefiere evitar disgustos y que hablar de más solo trae problemas; Ana comprende mejor su timidez y su manera de querer paz. _(repite 0 · sigue 2 · contenido 2)_
- **Contarle a Matthew que quiere ayudar más en la granja como si fuera mayor**: Ana le ofrece serle útil de verdad, y Matthew la escucha con emoción contenida; termina confiándole que le alegra verla tan decidida, porque para él ya no es una niña cualquiera sino alguien de la casa. _(repite 0 · sigue 2 · contenido 2)_

### matthew · claves · 3

- **Preguntarle si alguna vez una muchacha le inspiró menos miedo que las demás**: Ana lo arrincona con una curiosidad muy suya, y Matthew acaba admitiendo, con gran rubor, que hay mujeres que parecen más fáciles de querer cuando no hablan fuerte ni mandan demasiado. _(repite 0 · sigue 1 · contenido 2)_
- **Contarle que las semillas también necesitan paciencia, igual que las personas**: Mientras hablan de la siembra, Ana convierte las semillas en una lección de carácter, y Matthew termina confesando que él prefiere trabajar con la tierra porque la tierra no se impacienta con nadie. _(repite 0 · sigue 2 · contenido 1)_
- **Pedirle que le diga cuál es la cosa más valiente que ha visto en una niña**: Matthew se queda pensando mucho antes de responder, y al final le revela a Ana que para él la valentía no siempre hace ruido: a veces es seguir adelante aunque una sienta vergüenza o miedo. _(repite 0 · sigue 1 · contenido 2)_
- 🔁 **Preguntarle si el cielo cambia de humor como la granja**: Sentados bajo el aire abierto, Ana lo lleva a comparar nubes, viento y estaciones, y Matthew le confiesa que le gusta el cielo porque nunca se queda igual demasiado tiempo. _(repite 1 · sigue 1 · contenido 1)_
- **Contarle que querría aprender a hacer algo útil para la casa sin que Marilla se entere**: Ana propone un pequeño secreto doméstico, y Matthew, divertido y leal, le sugiere una tarea sencilla que podría ayudarla sin meterse en líos, quedando él como cómplice silencioso. _(repite 0 · sigue 2 · contenido 1)_

### diana · nada · 1

- **Preguntarle a Diana si también colecciona nombres para las cosas que ama**: Ana le confiesa que pone nombres a los árboles, senderos y rincones de la granja; Diana admite que le parece encantador y se anima a inventar uno para un escondite secreto que las dos descubren juntas. _(repite 0 · sigue 1 · contenido 2)_
- **Contarle a Diana lo que vio desde la ventana de la cocina al anochecer**: Ana describe las luces, las sombras y el cielo cambiando sobre la granja; Diana le dice que nunca había pensado que un atardecer pudiera parecer tan vivo, y juntas planean observarlo otra vez. _(repite 0 · sigue 1 · contenido 1)_
- **Pedirle a Diana que le enseñe algo que ella sabe hacer muy bien en casa**: Ana, con genuina curiosidad, le pide que le cuente cómo ayuda a su madre o qué sabe hacer con soltura; Diana revela una destreza sencilla y doméstica que la hace sentirse útil y menos tímida. _(repite 0 · sigue 2 · contenido 1)_
- **Hablarle a Diana de una travesura pequeña que no salió como Ana esperaba**: Ana relata un intento de ayudar en la granja que terminó en un pequeño desorden; Diana primero se inquieta, pero luego ríe y admite que le alivia saber que hasta Ana se equivoca a veces. _(repite 0 · sigue 1 · contenido 1)_
- **Preguntarle a Diana qué le gustaría ser cuando sea grande**: Ana la anima a imaginar un futuro para sí misma; Diana, entre risas y rubor, revela un deseo inesperado que demuestra que su timidez esconde más ambición de la que parece. _(repite 0 · sigue 1 · contenido 2)_

### diana · nada · 2

- **las ventanas de Patty's Place y las historias que esconden**: Ana le cuenta a Diana que cada ventana parece prometer una vida distinta; Diana se anima a imaginar cuál sería la suya y ambas se quedan riendo, con Diana un poco menos tímida ante tanta fantasía. _(repite 0 · sigue 1 · contenido 2)_
- **un sombrero nuevo y el miedo a parecer ridícula**: Diana confiesa que le asustan las burlas de las muchachas mayores por su aspecto, y Ana la consuela con solemnidad y humor, prometiéndole que la verdadera elegancia empieza en el corazón. _(repite 0 · sigue 1 · contenido 2)_
- **hacer una merienda para las muñecas con cosas de la granja**: Las niñas planean una merienda imaginaria usando flores, hojas y galletas reales, y Diana descubre que en la granja también hay belleza para jugar, no solo trabajo. _(repite 0 · sigue 1 · contenido 1)_
- **qué nombre tendría un lugar secreto junto al arroyo**: Ana propone inventar un refugio para leer y soñar cerca del agua; Diana sugiere un nombre y se atreve a añadir una idea propia, sorprendiendo a Ana con su imaginación. _(repite 0 · sigue 1 · contenido 2)_
- **la primera cosa valiente que Diana se atrevería a hacer**: Diana admite que le cuesta hablar delante de otros y Ana la anima a elegir un pequeño acto de valor; Diana decide que podría saludar sin esconderse, y eso la deja orgullosa y encendida de valor. _(repite 0 · sigue 1 · contenido 2)_

### diana · nada · 3

- **preguntarle a Diana si también tiene miedo de las aguas profundas del estanque**: Ana confiesa su susto al cruzar cerca del estanque y Diana revela que, aunque la admira, también se aterra un poco; acaban prometiéndose ir juntas sólo hasta la orilla, como dos valientes muy prudentes. _(repite 0 · sigue 1 · contenido 2)_
- 🔁 **contarle a Diana cómo las matas de la granja tienen nombres secretos en su imaginación**: Ana le explica que cada rincón de la granja parece distinto cuando uno lo mira con atención, y Diana se entusiasma tanto que inventa un nombre propio para un sendero; Ana descubre que su amiga no sólo escucha la fantasía, sino que puede seguirla. _(repite 4 · sigue 1 · contenido 2)_
- 🔁 **preguntarle a Diana si le gustaría aprender a reconocer flores y hierbas del camino**: Ana propone una pequeña lección de campo, y Diana confiesa que siempre ha querido saber qué flores son cuáles; al final acuerdan salir otro día a buscar violetas y otras plantas, con Ana de maestra y Diana más animada de lo que esperaba. _(repite 4 · sigue 1 · contenido 1)_
- **contarle a Diana que a veces Marilla parece severa, pero no es de piedra**: Ana habla de cómo en la granja hay personas y silencios que al principio intimidan, y Diana revela que en su casa también hay reglas que dan respeto; ambas se sienten comprendidas y Ana termina más segura de que los adultos, aunque serios, pueden querer de verdad. _(repite 0 · sigue 2 · contenido 1)_
- **preguntarle a Diana si alguna vez se ha imaginado una vida entera en la granja**: Ana se lanza a soñar con futuros posibles entre los árboles, el huerto y las tareas diarias, y Diana, sorprendida, admite que nunca lo había pensado; juntas descubren que la granja puede ser menos sólo un lugar y más un destino compartido. _(repite 0 · sigue 2 · contenido 1)_

### diana · temas · 1

- **Contarle a Diana lo que ha aprendido a hacer en la granja**: Ana le habla de sembrar con Matthew, de las manos en la tierra y de cómo la granja tiene secretos propios; Diana se maravilla y le pide que le enseñe alguna vez, aunque teme ensuciarse los zapatos. _(repite 0 · sigue 1 · contenido 2)_
- **Preguntarle a Diana si también le da miedo la señora Blewett**: Ana admite que las señoras le parecen criaturas muy severas y algo misteriosas, y Diana confiesa que a ciertas damas le tiembla el alma; se ríen de sus miedos y se hacen más valientes juntas. _(repite 0 · sigue 0 · contenido 1)_
- **Contarle a Diana que Marilla sabe cocinar mejor de lo que aparenta**: Ana describe una pequeña lección en la cocina y descubre que Marilla, aunque severa, tiene manos expertas y modos prácticos; Diana escucha fascinada y quiere saber qué plato salió primero. _(repite 0 · sigue 1 · contenido 1)_
- **Hablarle a Diana de Cecily y de cómo es vivir cerca de otras niñas**: Ana menciona a Cecily y lo extraño que sería tener más compañías, comparando esa idea con la amistad única que tiene con Diana; Diana se pone un poco celosa, pero acaba contenta de ser su amiga del alma. _(repite 0 · sigue 0 · contenido 1)_
- **Contarle a Diana una nueva aventura del camino de regreso a casa**: Ana narra un hallazgo en el camino —unas flores, un pájaro o una rama que parecía hablar— y convierte una vuelta ordinaria en un pequeño prodigio; Diana, entre risas y sobresaltos, le pide que siempre le cuente lo que vea. _(repite 0 · sigue 0 · contenido 1)_

### diana · temas · 2

- **Contarle a Diana que Marilla le ha enseñado a cocinar, y que ahora Ana quiere probar a hacer un pastel sin que se le pegue al fondo**: Ana le cuenta, muy orgullosa y un poco alarmada, que Marilla le está enseñando las artes de la cocina; Diana se ríe, la anima y le promete probar el resultado, aunque Ana teme confesarle que sigue siendo peligrosa con las cacerolas. _(repite 0 · sigue 1 · contenido 2)_
- **Preguntarle a Diana si alguna vez se ha sentido como una ayudante de granja de verdad, y contarle lo que Ana ha aprendido de sembrar con Matthew**: Ana habla de la tierra, las semillas y el placer de ver nacer algo que una misma ayudó a poner; Diana se asombra de la seriedad nueva de Ana y le dice que con ella hasta la granja parece un lugar encantado. _(repite 0 · sigue 2 · contenido 2)_
- **Contarle a Diana que Matthew se sienta con ella a mirar el cielo y que Ana ha descubierto que las nubes también tienen ánimo**: Ana le describe las formas del cielo y cómo Matthew la escucha sin burlarse; Diana, que admira su imaginación, se siente valiente al mirar arriba con ella y ambas acaban inventando nombres para nubes que cambian de humor. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle a Diana si cree que las señoras de verdad dan tanto miedo como parecen, y contarle lo que Marilla ha dicho sobre el control del genio**: Ana se atreve a confesar que está aprendiendo a medir sus ímpetus y a no imaginar catástrofes cuando aparece una visita; Diana, tímida pero sincera, le dice que con Ana a su lado las señoras parecen menos terribles. _(repite 0 · sigue 1 · contenido 2)_
- **Contarle a Diana que Carrie y Cecily han sido un misterio nuevo en la casa, y proponerle imaginar qué clase de niñas serán cuando crezcan**: Ana habla de las pequeñas, de cómo cada una parece traer un carácter distinto como si fuera una flor nueva; Diana participa encantada y juntas concluyen que la vida de Avonlea está llena de criaturas dignas de ser observadas y queridas. _(repite 0 · sigue 1 · contenido 1)_

### diana · temas · 3

- **Contarle a Diana que Matthew le enseñó a sembrar guisantes y preguntar si quiere intentarlo en el jardín de Green Gables**: Ana le cuenta, con gran entusiasmo, cómo aprendió a hacer los surcos y cómo Matthew no se rió de sus preguntas; Diana se anima a ir un día y juntas planean una pequeña siembra secreta. _(repite 0 · sigue 1 · contenido 2)_
- **Hablarle de que Marilla le explicó cómo domar el genio y preguntar si Diana también tiene alguna manera de calmarse cuando se asusta**: Ana habla de la seriedad de Marilla y de la sorpresa de haber recibido consejo tan sensato; Diana admite que, cuando tiene miedo, aprieta las manos o piensa en su madre, y Ana le promete una frase valiente inventada por ella. _(repite 0 · sigue 1 · contenido 2)_
- **Contarle a Diana que Matthew se quedó con ella mirando el cielo y preguntar si también ve figuras en las nubes**: Ana relata ese silencio amable con Matthew y cómo el cielo parecía un libro abierto; Diana, impresionada, empieza a descubrir formas en las nubes y queda en que la próxima vez las nombrarán juntas. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle a Diana si le gustaría ayudar a cuidar la granja por un rato, como recoger violetas o llevar agua, para sentirse verdaderas señoritas útiles**: Ana propone un juego de ayuda en Green Gables, mezclando trabajo y fantasía; Diana acepta con timidez y ambas imaginan que son dos damitas de una gran hacienda, cumpliendo pequeñas tareas con orgullo. _(repite 0 · sigue 1 · contenido 1)_
- **Contarle a Diana algo que ha observado en Cecily o Carrie y comparar si las niñas pequeñas también entienden los secretos del corazón**: Ana habla de una escena tierna de la casa y se da cuenta de que los pequeños tienen sus propios modos de querer y de temer; Diana responde con dulzura, y Ana termina mirando a su amiga como si acabara de descubrir otro misterio del mundo. _(repite 0 · sigue 1 · contenido 2)_

### diana · resumenes · 1

- **Contarle a Diana un miedo de antes y cómo se le pasó**: Ana le habla de una cosa que le daba vergüenza confesar —quizá un susto de niña en la granja o su temor a quedar en ridículo— y, al decirlo en voz alta, descubre que Diana no se burla y que contar los temores a veces los vuelve más pequeños. _(repite 0 · sigue 1 · contenido 2)_
- **Pedirle a Diana que lo acompañe a ver la granja**: Las dos recorren un rincón de Avonlea, observan algo de los trabajos de la granja y Ana intenta explicarle a Diana por qué tanto le gusta ese mundo; Diana, más delicada, se sorprende al ver que la granja puede ser hermosa y no sólo útil. _(repite ? · sigue ? · contenido ?)_
- **Hablar de una travesura pequeña que casi sale mal**: Ana recuerda una pequeña ocurrencia —nacida de la imaginación— que terminó en apuro, y Diana la escucha entre risitas; al final, ambas quedan de acuerdo en que no todas las ideas brillantes son prudentes. _(repite ? · sigue ? · contenido ?)_
- **Contarle a Diana un plan para imaginar historias de las personas de Avonlea**: Ana propone inventar historias sobre la gente de la aldea y Diana añade detalles más suaves y tiernos; juntas descubren que la imaginación de Ana se enriquece cuando Diana le pone corazón y prudencia. _(repite ? · sigue ? · contenido ?)_
- **Preguntarle a Diana qué le gustaría aprender de la vida en la granja**: Ana, interesada en enseñar y acompañar, le pregunta a Diana qué tarea de granja le gustaría probar; Diana elige una cosa sencilla y la conversación termina con un pequeño plan para enseñársela otro día. _(repite ? · sigue ? · contenido ?)_

### diana · resumenes · 2

- **Contarle a Diana cómo le fue con una tarea en la granja**: Ana le cuenta a Diana que estuvo ayudando con quehaceres sencillos en Green Gables y descubre que Diana se maravilla de verla tan aplicada; ambas comparan lo agradable y lo cansado del trabajo y quedan en hablar de sus “deberes” otra vez. _(repite 0 · sigue 1 · contenido 2)_
- **Pedirle consejo sobre cómo hablar con Marilla sin meter la pata**: Ana confiesa que a veces teme decir algo absurdo delante de Marilla, y Diana le admite que también se pone nerviosa con los adultos; terminan inventando fórmulas muy serias y muy graciosas para portarse bien sin dejar de ser ellas mismas. _(repite 0 · sigue 1 · contenido 2)_
- **Preguntarle por Cecily y la idea de hacer una visita juntas**: Ana le habla a Diana de Cecily y de si sería una compañera agradable para juegos tranquilos o meriendas, y Diana revela que le encantaría conocerla si no fuese demasiado tímida; las dos imaginan una visita con muchas buenas maneras y algún pequeño susto. _(repite 0 · sigue 1 · contenido 1)_
- **Hablar de las labores de la granja que cada una preferiría aprender**: Ana y Diana comparan qué tareas de la granja les parecen más fáciles o más terribles —recoger huevos, dar de comer a las gallinas, llevar agua— y descubren que una de ellas, para sorpresa de Ana, tiene bastante menos miedo de los animales de lo que parecía. _(repite 0 · sigue 1 · contenido 1)_
- **Contarle una idea para un paseo nuevo por los alrededores de Avonlea**: Ana propone explorar un camino, un seto o un rincón del campo que aún no hayan bautizado, y Diana se anima a acompañarla si el lugar no está embrujado; acaban inventando que necesitarán un mapa, provisiones y nombres magníficos para todo lo que vean. _(repite 0 · sigue 1 · contenido 1)_

### diana · resumenes · 3

- **Preguntarle a Diana si le da vergüenza cuando la miran por la calle**: Ana descubre que Diana se pone colorada al pasar gente, y Diana admite que le tranquiliza ir con Ana porque ella parece no ver a nadie excepto a sus pensamientos. _(repite 0 · sigue 1 · contenido 2)_
- **Contarle que Matthew le ha dicho algo extraño y bueno sobre los codos**: Ana le confiesa una frase graciosa de Matthew sobre la comodidad y los buenos modales; Diana se ríe, y ambas concluyen que Matthew entiende el mundo mejor de lo que parece. _(repite 0 · sigue 1 · contenido 2)_
- **Pedirle a Diana que la acompañe a visitar la granja y recoger fresas**: Deciden ir juntas a buscar fresas y explorar la granja; Diana muestra más valor de lo que creía, y Ana promete nombrar el sitio de la mejor mata de fresas. _(repite 0 · sigue 2 · contenido 2)_
- **Hablarle de Cecily y de si le parecería una niña delicada o presumida**: Ana comenta que ha visto a Cecily y se pregunta cómo será en realidad; Diana opina con cautela, y Ana decide observarla mejor antes de hacer un juicio. _(repite 0 · sigue 1 · contenido 1)_
- **Inventar un proyecto secreto para ayudar en la casa con algo útil**: Ana propone hacer algo práctico para Marilla y Matthew, como ordenar o llevar recados; Diana acepta encantada, y ambas se sienten importantes por primera vez con un plan serio. _(repite 0 · sigue 2 · contenido 2)_

### diana · mixto · 1

- **Contarle a Diana cómo ha aprendido Ana a mirar el cielo con Matthew desde la colina**: Ana le habla de un rato reciente con Matthew mirando nubes y atardeceres; Diana se maravilla, y Ana descubre que también puede compartir con alguien sus pequeñas felicidades de granja. _(repite 0 · sigue 1 · contenido 2)_
- **Pedirle a Diana que la acompañe a sembrar y enseñarle lo que Matthew le explicó**: Ana intenta poner en práctica lo que aprendió sobre la siembra y, entre risas, enseña a Diana; al final ambas sienten que la tierra guarda promesas tan dulces como un secreto. _(repite 0 · sigue 2 · contenido 1)_
- **Preguntarle a Diana si alguna vez le ha tenido miedo a una señora muy severa**: Ana confiesa sus aprensiones con ciertas personas de buen semblante pero aire duro; Diana, con su dulce valentía, le responde algo que hace que Ana vea sus miedos con menos solemnidad. _(repite 0 · sigue 1 · contenido 1)_
- **Hablarle a Diana de las violetas del camino que Ana quiere llevar a Marilla**: Ana le cuenta a Diana que ha pensado en recoger flores para la casa y que eso la hace sentir extrañamente doméstica; Diana comprende que Ana está empezando a querer la granja de un modo muy suyo. _(repite 0 · sigue 1 · contenido 1)_
- **Contarle a Diana que Marilla le ha pedido ayuda en la cocina y que Ana está aprendiendo a ser útil**: Ana relata su sorpresa al ser tomada en serio por Marilla para una tarea de cocina; Diana celebra la noticia, y Ana siente que quizá ya no es solamente una niña soñadora, sino también una ayuda verdadera. _(repite 0 · sigue 2 · contenido 2)_

### diana · mixto · 2

- 🔁 **Pedirle que le cuente cómo es su hermanita cuando se pone traviesa**: Ana quiere saber de la pequeña Minnie May y Diana le cuenta alguna trastada; Ana aprende algo nuevo sobre cómo cuidarla y prometen jugar a “ser mamás” con cuidado y seriedad. _(repite 2 · sigue 1 · contenido 1)_
- **Preguntarle si en casa de Barry también hay que ayudar con la granja**: Diana le habla de pequeñas tareas del hogar y del huerto; Ana descubre que su amiga conoce bien el trabajo de la casa y se anima a imaginar cómo sería ayudar juntas en Avonlea. _(repite 0 · sigue 1 · contenido 1)_
- 🔁 **Contarle a Diana que Marilla le ha enseñado a cocinar y pedirle que se atreva a probar**: Ana le comparte una novedad de la cocina de Green Gables; Diana, un poco asombrada, acepta probar una tarea sencilla y queda orgullosa de no haberse asustado tanto. _(repite 4 · sigue 1 · contenido 1)_
- **Preguntarle si alguna vez ha tenido miedo en el granero o en el camino del bosque**: Diana confiesa un miedo pequeño que Ana no esperaba; Ana la tranquiliza con una historia inventada y las dos descubren que incluso las valientes tienen sustos. _(repite 0 · sigue 1 · contenido 2)_
- **Inventar un plan para cuidar la granja como si fueran dos señoritas importantes**: Entre risas, idean deberes imaginarios para cabras, gallinas y flores; Ana se entusiasma con ordenar el mundo y Diana se deja llevar por su imaginación, pero con una sorpresa práctica al final. _(repite 0 · sigue 1 · contenido 1)_

### diana · mixto · 3

- **Contarle a Diana que hoy ha estado pensando en Matthew y en lo bondadoso que es, y preguntarle si también ella nota que a veces los grandes se ponen tristes sin decirlo**: Ana comparte una observación nueva sobre Matthew; Diana confiesa que su padre a veces tiene esa misma tristeza, y ambas prometen ser más cariñosas con los mayores. _(repite 0 · sigue 1 · contenido 2)_
- **Preguntarle a Diana si en su casa también les enseñan cosas de la granja, y contarle que Matthew le ha mostrado cómo mirar la tierra para saber si está lista para sembrar**: Diana admite que no sabe casi nada de labores del campo, pero se maravilla de que Ana aprenda; Ana se siente muy importante y quiere enseñárselo luego a su amiga. _(repite 0 · sigue 2 · contenido 2)_
- **Contarle a Diana que Marilla le ha hablado de la importancia de no dejar que el genio mande, y preguntar si ella cree que una persona puede aprender a dominarlo**: Diana, que es dulce y un poco temerosa, dice que a veces le cuesta decir lo que siente; Ana propone que las dos practiquen responder con calma cuando algo las enfade. _(repite 0 · sigue 1 · contenido 2)_
- 🔁 **Decirle a Diana que ha descubierto una flor o hierba bonita en el camino de la granja y pedirle que salgan a buscar lugares para ponerles nombres juntas**: Las dos convierten un trecho común del campo en un mapa de fantasía; al final Ana descubre que Diana tiene un ojo muy fino para las cosas bellas y escondidas. _(repite 3 · sigue 1 · contenido 2)_
- **Preguntarle a Diana si quisiera acompañarla a observar desde lejos cómo trabajan en la granja, solo para aprender y no estorbar, y contarle que Matthew siempre parece saber qué hacer con las manos**: Diana acepta con timidez; al mirar a Matthew trabajar, Ana comprende que la paciencia también es una forma de talento, y Diana dice que le gustaría parecerse un poco a él. _(repite 0 · sigue 2 · contenido 2)_

### diana · hechas · 1

- **Preguntarle a Diana si le gustaría ir juntas a recoger fresas silvestres detrás del huerto**: Ana le propone una excursión de cosecha para la granja; Diana, entre encantada y temerosa, acepta si van muy juntas y queda revelado que sabe distinguir los mejores claros por el perfume del monte. _(repite 0 · sigue 1 · contenido 2)_
- **Contarle a Diana que ha estado observando las gallinas y cree que una de ellas pone huevos en secreto en otro rincón**: Ana convierte la vida de la granja en una pequeña pesquisa; Diana se ríe nerviosa, y al final ambas acuerdan vigilar el gallinero para descubrir si la sospecha de Ana es una fantasía o una verdad muy doméstica. _(repite 0 · sigue 1 · contenido 2)_
- **Preguntarle a Diana si alguna vez ha intentado imaginar el nombre de cada árbol del camino**: Ana la invita a un juego de imaginación ligado a la granja y los paseos; Diana confiesa que nunca se le habría ocurrido, pero termina inventando nombres con Ana y descubre que también puede ser ingeniosa. _(repite 0 · sigue 1 · contenido 2)_
- **Contarle a Diana que Marilla le ha enseñado a ayudar en la cocina y que ya no teme tanto romper algo**: Ana habla de lo aprendido con Marilla y de cómo eso la hace sentirse más útil; Diana se maravilla de su valentía cotidiana y le confiesa que, en casa, a ella le da miedo hacer ruido al mover los platos. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle a Diana si preferiría cuidar un jardín de flores o uno de verduras si tuvieran una pequeña parcela propia**: La conversación mezcla amistad, granja e imaginación futura; Diana elige con dudas y revela que, aunque ama las flores, en secreto le gustaría aprender a cultivar algo que pudiera comerse, solo por el orgullo de haberlo hecho crecer. _(repite 0 · sigue 1 · contenido 2)_

### diana · hechas · 2

- **Ana le cuenta a Diana que Matthew no siempre responde, pero escucha como si guardara cada palabra en el corazón**: Diana confiesa que le resulta más fácil hablar con Matthew que con casi cualquier adulto; Ana se sorprende al descubrir cuánto le consuela a Diana su silenciosa bondad. _(repite 0 · sigue 1 · contenido 2)_
- **Ana le propone a Diana ir a ver la hilera de coles y el jardín, para imaginar qué historias esconden las plantas**: Entre las matas, Ana inventa nombres y destinos para cada rincón; Diana ríe al principio y luego admite que le gusta imaginar, aunque le dé un poco de vergüenza hacerlo. _(repite 0 · sigue 1 · contenido 1)_
- **Ana le pregunta a Diana si alguna vez ha querido aprender a hacer algo de granja con sus propias manos**: Diana dice que no es valiente para muchas faenas, pero que sí le gustaría probar; Ana promete enseñarle algo sencillo, y ambas quedan en que la práctica puede ser tan divertida como un juego. _(repite 0 · sigue 2 · contenido 1)_
- **Ana le confiesa a Diana que Marilla parece severa, pero que a veces sus silencios dicen más que un discurso**: Diana cuenta una pequeña observación sobre Marilla que Ana no había notado; eso hace que Ana la vea de otro modo y quiera observarla con más atención. _(repite 0 · sigue 1 · contenido 2)_
- **Ana le habla a Diana de una nueva idea para pasar la tarde: caminar hasta un rincón del camino donde las flores parecen hechas para escucharlas**: Diana acepta ir, medio asustada por alejarse un poco, y en el paseo Ana descubre que su amiga se anima más cuando hay un secreto pequeño y bonito de por medio. _(repite 0 · sigue 1 · contenido 1)_

### diana · hechas · 3

- **Preguntarle a Diana si en su casa también hay una pieza secreta para esconder tesoros**: Ana le cuenta su deseo de tener escondrijos y Diana le revela que en Green Gables no, pero sí un rincón del desván donde sueña guardar flores secas y una cinta negra. _(repite 0 · sigue 1 · contenido 2)_
- **Contarle a Diana que ha intentado imaginar a las señoras que la visitan como heroínas de una novela**: Ana hace reír a Diana con sus retratos imaginarios, y Diana confiesa que una de esas señoras le parece mucho menos severa cuando habla de su gato, así que ambas aprenden a mirar mejor a los demás. _(repite 0 · sigue 1 · contenido 2)_
- **Pedirle a Diana que le enseñe un juego que se pueda jugar en silencio para no molestar a Marilla**: Diana propone un juego de señales y adivinanzas con los dedos, pero Ana termina inventando una versión aún más ingeniosa con nombres de flores, y las dos quedan encantadas con su secreto. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle a Diana si alguna vez ha querido plantar algo por pura amistad**: Ana sugiere sembrar juntas un rincón especial, y Diana se anima por primera vez a pensar en cuidar una planta; acuerdan escoger una semilla cuando vuelvan a verse. _(repite 0 · sigue 2 · contenido 2)_
- **Contarle a Diana que ha descubierto que la granja también puede parecer un cuento cuando cae la tarde**: Ana describe los campos como si fueran un reino y Diana, al escucharla, admite que ya no le asusta tanto la oscuridad del atardecer si Ana la convierte en una aventura. _(repite 0 · sigue 1 · contenido 2)_

### diana · claves · 1

- **Ana quiere enseñarle a Diana a mirar las granjas como si fueran un reino**: Ana le describe la granja de los Cuthbert como si fuera un castillo con dominios, caminos secretos y tareas nobles; Diana se ríe, luego admite que así la granja parece menos ruda y más encantada. _(repite 0 · sigue 1 · contenido 2)_
- **Ana quiere contarle a Diana cómo es ayudar a Matthew en el campo**: Ana relata una pequeña mañana de labores junto a Matthew, y Diana descubre que él es mucho más paciente y silencioso de lo que imaginaba; termina deseando verlo trabajar una vez. _(repite 0 · sigue 2 · contenido 2)_
- **Ana quiere preguntarle a Diana si le gustaría vivir en una granja de verdad**: Hablan de si una señorita fina podría acostumbrarse al barro, a las vacas y al olor del heno; Diana confiesa que le daría miedo al principio, pero que con Ana todo parecería más valiente. _(repite 0 · sigue 1 · contenido 1)_
- **Ana quiere contarle a Diana lo que Marilla sabe de la casa y la granja**: Ana habla de cómo Marilla manda en la despensa, los huevos, la mantequilla y los remiendos como si gobernara una nación; Diana entiende que Marilla es severa, pero también indispensable. _(repite 0 · sigue 2 · contenido 1)_
- **Ana quiere imaginar con Diana un día en que ambas ayuden en la granja**: Entre risas, planean ordeñar, llevar canastos y recorrer los prados como si fueran colaboradoras de una gran empresa; al final, Diana confiesa que le gustaría intentarlo si Ana va a su lado. _(repite 0 · sigue 2 · contenido 2)_

### diana · claves · 2

- **Contarle a Diana que está aprendiendo a sembrar con Matthew y que la tierra de la granja es “como una taza de chocolate desmigajada”**: Ana describe la labor del huerto con su imaginación, y Diana se anima a ir con ella a mirar los surcos, aunque le da un poco de miedo ensuciarse las botas. _(repite 0 · sigue 2 · contenido 2)_
- **Preguntarle a Diana si de verdad cree que Marilla es tan severa como parece, y confesarle que a veces le gustaría saber qué piensa ella de las niñas soñadoras**: Ana habla de Marilla con más curiosidad que temor, y Diana revela que también le intimida un poco, pero que sospecha que en el fondo es buena. _(repite 0 · sigue 1 · contenido 2)_
- **Contarle a Diana que Matthew le explicó por qué a él también le cuesta hablar con algunas señoras, y que no es por mala educación sino por timidez**: Ana se sorprende al descubrir que Matthew tiene sus propios miedos sociales, y ambas ríen al imaginarlo callado ante un sombrero demasiado adornado. _(repite 0 · sigue 2 · contenido 2)_
- **Pedirle a Diana que la acompañe a llevar un recado por la granja y observar juntas las flores y los caminos nuevos que Ana quiere nombrar**: La amistad se mezcla con una pequeña excursión; Diana acepta ir si Ana va al frente, y las dos terminan inventando nombres para un sendero y un prado. _(repite 0 · sigue 2 · contenido 1)_
- **Contarle a Diana que ha pensado en Carrie y Cecily mientras mira la casa y la granja, y que le gustaría inventarles un juego tranquilo de ‘vida futura’**: Ana conecta su cariño por las niñas más pequeñas con su imaginación, y Diana propone que ese juego incluya una casa bonita, un jardín y mucha paz. _(repite 0 · sigue 1 · contenido 1)_

### diana · claves · 3

- **Contarle a Diana que Matthew le enseñó a sembrar guisantes en la granja**: Ana le describe cómo hundió las semillas en la tierra y cómo le parece un acto casi mágico; Diana escucha encantada y le pide que luego le enseñe también a ella. _(repite 0 · sigue 1 · contenido 2)_
- **Decirle a Diana que Matthew sigue yéndola a mirar mientras habla del cielo**: Ana cuenta que él no se burla de sus fantasías y que incluso parece comprenderlas; Diana se sorprende y concluye que Matthew es más bondadoso de lo que imaginaba. _(repite 0 · sigue 1 · contenido 2)_
- **Preguntarle a Diana si ella también le teme a ciertas señoras**: Ana confiesa, con gran sinceridad, que algunas damas la dejan sin respiración y le cuesta tratar con ellas; Diana admite que a veces siente lo mismo, y ambas se sienten menos solas. _(repite 0 · sigue 1 · contenido 2)_
- **Contarle a Diana que Marilla le enseñó a cocinar en la cocina de la granja**: Ana relata un pequeño desastre doméstico y una lección muy seria de Marilla; Diana se ríe, pero también descubre que Ana empieza a aprender cosas de verdad. _(repite 0 · sigue 1 · contenido 2)_
- **Invitar a Diana a imaginar la granja en cada estación del año**: Ana convierte los campos, el pozo y el huerto en un mapa de maravillas para primavera, verano, otoño e invierno; Diana, inspirada, añade detalles y juntas planean visitarla con nuevos ojos. _(repite 0 · sigue 1 · contenido 2)_
##[group]Run if [ -f trazas/noche/noche.md ]; then cat trazas/noche/noche.md >> "$GITHUB_STEP_SUMMARY"; else echo "No hubo informe (ver el registro del paso anterior)." >> "$GITHUB_STEP_SUMMARY"; fi
[36;1mif [ -f trazas/noche/noche.md ]; then cat trazas/noche/noche.md >> "$GITHUB_STEP_SUMMARY"; else echo "No hubo informe (ver el registro del paso anterior)." >> "$GITHUB_STEP_SUMMARY"; fi[0m
shell: /usr/bin/bash -e {0}
##[endgroup]
##[group]Run n="$(basename "$ESCENARIO" .json)"; echo "n=${n//[^A-Za-z0-9_-]/_}" >> "$GITHUB_OUTPUT"
[36;1mn="$(basename "$ESCENARIO" .json)"; echo "n=${n//[^A-Za-z0-9_-]/_}" >> "$GITHUB_OUTPUT"[0m
shell: /usr/bin/bash -e {0}
env:
  ESCENARIO: tools/noche/partidas/curiosa.json
##[endgroup]
##[group]Run actions/upload-artifact@v4
with:
  name: noche-curiosa-efectos
  path: trazas/noche/noche.md
trazas/noche/noche.json
trazas/noche/pedido.md
trazas/noche/pedido.json
trazas/noche/respuesta.json
trazas/noche/temas.json

  if-no-files-found: warn
  compression-level: 6
  overwrite: false
  include-hidden-files: false
##[endgroup]
(node:3274) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
Multiple search paths detected. Calculating the least common ancestor of all paths
The least common ancestor is /home/runner/work/Avonlea/Avonlea/trazas/noche. This will be the root directory of the artifact
With the provided path, there will be 5 files uploaded
Artifact name is valid!
Root directory input is valid!
Beginning upload of artifact content to blob storage
(node:3274) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
Uploaded bytes 73349
Finished uploading artifact content to blob storage!
SHA256 digest of uploaded artifact zip is d5fdd47044ba76e3269c141b5d37b05b78e210b70424df7c8aee9e6b99bb74e8
Finalizing artifact upload
Artifact noche-curiosa-efectos.zip successfully finalized. Artifact ID 12302576185
Artifact noche-curiosa-efectos has been successfully uploaded! Final size is 73349 bytes. Artifact ID is 12302576185
Artifact download URL: https://github.com/rilianx/Avonlea/actions/runs/39502620526/artifacts/12302576185
Post job cleanup.
(node:3286) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
Post job cleanup.
[command]/usr/bin/git version
git version 2.55.0
Temporarily overriding HOME='/home/runner/work/_temp/dc7dd5dd-9bb0-4414-8258-aae69f5be430' before making global git config changes
Adding repository directory to the temporary git global config as a safe directory
[command]/usr/bin/git config --global --add safe.directory /home/runner/work/Avonlea/Avonlea
[command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
[command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
[command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
http.https://github.com/.extraheader
[command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
[command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
[command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
[command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
Cleaning up orphan processes
##[warning]Node.js 20 is deprecated. The following actions target Node.js 20 but are being forced to run on Node.js 24: actions/checkout@v4, actions/setup-node@v4, actions/upload-artifact@v4. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/

## Conclusión (y lo que usa la noche)

- **Los títulos de lo que aún no se conversa empeoran todo** («temas» 27 %, «mixto» 33 % de propuestas que repiten): la IA los toma como sugerencias y los reescribe.
- **Los resúmenes de lo ya conversado** («hechas»: 9 %, contenido 1.71, ~100 tokens por persona) es lo mejor por token; las palabras clave («claves», 7 %) repiten parecido pero dicen menos.
- El juez es generoso («remendar» cuenta como repetir «enseñarle a cocinar»): las diferencias de pocos puntos son ruido.
- Sin nada, no repite, pero inventa temas genéricos (la despensa, las gallinas).

La noche usa «hechas»: en el pedido, «LO YA CONVERSADO», una línea por conversación tenida (su «resumen:»), con las personas que más busca la jugadora y las que tienen una laguna de conversaciones. Las conversaciones que escribe la noche traen su «resumen:» (si falta, el juego pone el tema). Lo que se ahorra es contexto; las escenas siguen con su largo mínimo.

Se repite con: `node tools/temas.js` (o el workflow «La IA de la noche», experimento: temas).
