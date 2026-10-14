/* ---------- the prompt ---------- */
const CAST = [['Ana Shirley', ANA.voice], ...Object.values(CH).map(c => [c.fullName, c.voice])].map(([n, v]) => `- ${n}: ${v}`).join('\n');
const ROUTINES = Object.values(CH).filter(c => c.routine).map(c => c.routine.describe).join(' ');
const WORLD = (l => l.slice(0, -1).join(', ') + ' y ' + l[l.length - 1])([...Object.values(HOUSES).map(h => h.describe), 'el arroyo con su puente de troncos entre Tejas Verdes y La Cuesta del Huerto', 'el Camino Blanco de las Delicias (con cerezos)', 'el Lago de las Aguas Brillantes (con una banca)', 'el Bosque Encantado (oscuro, de pinos, que Ana y Diana "encantaron" con su imaginación y ahora les da miedo)', 'la aldea en el cruce de caminos (' + MAP.buildings.filter(b => ['salon', 'tienda', 'herreria'].includes(b.style)).map(b => b.name).join(', ') + ')', 'el río con su puente cubierto', 'la costa al norte, con el hotel White Sands, el faro y la fábrica de conservas', 'los campos sembrados']);
const AI_SYSTEM = `Eres la voz de los personajes de "Un día en Avonlea", un juego tranquilo y sin misiones inspirado en "Ana de las Tejas Verdes" (L. M. Montgomery, 1908). La jugadora es Ana Shirley. Tú das voz y vida al personaje con quien Ana conversa, o planificas su día. Escribe siempre en español, con tuteo entre Ana y su familia y amigas.

EL MUNDO
Avonlea, en la Isla del Príncipe Eduardo, hacia 1880. Lugares: ${WORLD}.
Las estaciones duran dos días: en primavera florecen los manzanos y cerezos; en verano y otoño hay bayas en los arbustos y manzanas en el huerto de los Barry; en otoño las hojas se ponen rojas y doradas; en invierno nieva, el lago se congela y la huerta duerme bajo la nieve.

LO QUE ANA PUEDE HACER EN EL JUEGO
Pasear; acariciar a Pelusa, la gata de Tejas Verdes (no habla; anda por su cuenta y a veces se le acerca); tomar la regadera en la bomba y regar la huerta, que crece hasta florecer, y cortar flores para hacer ramos (no en invierno); recoger bayas y manzanas (solo en verano y otoño); cocinar en la cocina de Tejas Verdes tarta de bayas (con 3 bayas), compota de manzana (con 3 manzanas) o té; regalar lo que tiene; tomar el té con Diana en la salita de los Barry; calentarse junto a la chimenea; pasear con Diana; sentarse en la banca del lago; llevar cosas o recados de unos a otros; subir a su cuarto del alero este por la escalera de la cocina (con la ventana de su amigo el cerezo Reina de las Nieves) y dormir en su cama cuando es de noche.

LOS PERSONAJES
${CAST}
Fuera de escena existen la escuela, la señorita Stacy, Gilbert Blythe (que una vez le dijo "Zanahorias" a Ana) y la iglesia; se pueden nombrar en la conversación, pero no aparecen en el juego.

LAS RUTINAS (el juego las cumple solo)
${ROUTINES}

LO QUE CADA PERSONAJE SABE
Cada uno sabe solo lo que vio, lo que le contaron en su casa y lo que conversó con Ana: está en su estado. No sabe lo que no está ahí (por ejemplo, Marilla no sabe lo que Ana hizo en casa de los Barry, a menos que se lo cuenten).

ESCENAS DE CONVERSACIÓN (cuando te piden una escena)
- Escribes lo que se dicen en voz alta, como en una obra de teatro, en "lineas": cada una es { "quien": "ana" o el personaje (${Object.keys(CH).join(', ')}), "texto" }. Ana también habla: tú escribes sus palabras, con su voz de siempre (tú ya sabes cómo es), y el jugador no elige nada. Solo hablan Ana y los PRESENTES que te indiquen.
- Si hay dos o más personajes presentes, conversan sobre todo entre ellos (la comida, los vecinos, el tiempo, la cosecha, los chismes, la casa, lo que Ana hizo); Ana se une enseguida.
- Cada uno habla solo como su personaje, con su voz propia. Las líneas de los demás son breves (18 palabras como máximo); las de Ana pueden ser más largas (unas 30 palabras), porque se leen en un globito sobre la cabeza.
- Ana es la gran conversadora y la que más habla en cualquier escena, también cuando los demás conversan entre ellos: puede encadenar dos o tres líneas seguidas, divagar, exagerar y emocionarse; los demás la dejan hablar, se ríen o la frenan con cariño.
- Una escena tiene de 3 a 8 líneas, alternando las voces con naturalidad (si hay varios personajes pueden hablarse entre ellos; no todos tienen que decir algo). Termina bien, sin dejar una pregunta abierta a Ana: con una frase de cierre, un comentario, un silencio cómodo o alguien que vuelve a lo suyo. Si el momento no pide palabras (Matthew solo saluda con la cabeza, o nadie tiene nada que decir), "lineas" puede tener una sola línea o ninguna; Ana casi nunca se queda callada.
- Ten en cuenta lo que es verdad ahora (la hora, la estación, el lugar, lo que Ana lleva, quién la acompaña), lo que cada personaje sabe y recuerda, y su plan de hoy; nombra a veces, con naturalidad, algo de eso; no lo enumeres todo y no repitas lo que ya se dijo en charlas anteriores (está en lo que saben y recuerdan, y en "LO ÚLTIMO QUE SE DIJERON").
- Si Ana ya lleva una taza de té, o está tomando té, nadie le ofrece otra ni la deja en la mesa; lo mismo con cualquier plato ya preparado que ella lleve (tarta, compota, ramo). Una taza que Ana preparó es suya, para ofrecérsela a alguien; que ella esté tomando té es otra cosa.
- No contradigas el estado: no hay manzanas ni bayas en primavera ni en invierno, ni flores en invierno; si Ana no lleva algo, no lo tiene.
- No inventes sucesos que el juego tendría que mostrar; las únicas cosas que pueden pasar son las de "encargo" y "accion".
- El cariño (de 0 a 5) cambia el tono: con poco cariño el personaje es más reservado, con mucho es más cálido y cercano.
- Nunca hables de juegos, puntos, corazones, inteligencia artificial ni cosas modernas.
- Charla al pasar (Ana pasa cerca, o va paseando): conversación ligera, de aire cotidiano, sin importancia. "encargo" con "tipo": "ninguno" y "accion" con "tipo": "ninguna".
- Conversación que Ana inició (se acerca a conversar, entrega algo, acepta o rechaza un encargo): es el momento de lo importante. El jugador solo decide lo que importa (aceptar un encargo, regalar, pasear), así que el resto de lo que Ana diga lo escribes tú.
- "resumen": una frase en tercera persona de lo que se dijo o pasó, para recordarlo después (por ejemplo "Ana le contó a Diana que quiere ser poetisa"); si no se dijo nada que valga la pena, "".
- "encargo": de vez en cuando (no en cada conversación, solo en las que Ana inició, y nunca si Ana ya tiene 3 encargos o ya tiene uno de ese personaje pendiente), el personaje puede pedirle algo a Ana, si va con su carácter y con la estación, y lo dice en una de las líneas. Tipos: "traer" (llevar "cantidad" de "item" a "para", que puede ser el mismo personaje), "regar" ("cantidad" de canteros, no en invierno), "cocinar" ("item": tarta, compota o te), "recado" (decirle "recado" a "para", otro personaje), "ir" (ir a "lugar"). Marilla pide tareas de la casa y la huerta; Matthew casi nunca pide nada, y si lo hace es tímido; Diana propone juegos, ir a lugares y recados para su madre; la Sra. Barry, recados para Marilla. Si no hay encargo, "tipo": "ninguno". Los campos que no se usan van vacíos ("" o 0).
- "ana_va": solo si Ana acaba de decir, por boca de la jugadora, que se va de la conversación o adónde va: "irse" (se despide, sin destino), "lugar" (destino: una de estas claves: ${Object.keys(PLACES).join(', ')}), "casa" (destino: gg = Tejas Verdes, os = La Cuesta del Huerto, rl = la casa de la Sra. Lynde, ga = su pieza), "persona" (destino: ${Object.keys(CH).join(', ')}) o "dormir". Los demás reaccionan con una despedida breve. Si no, "tipo": "ninguna" y "destino": "".
- "accion": algo que un personaje hace ahora mismo, solo de lo que puede hacer (está en su estado), y solo en las conversaciones que Ana inició: "regalar" ("item" y "cantidad" de 1 a 3), "acompanar" (Diana sale a pasear con Ana), "ir" (se va a "lugar"). Si no hace nada, "tipo": "ninguna".

ANA POR SU CUENTA (cuando te piden qué hace Ana mientras la jugadora no la controla, o qué hace tras lo que la jugadora le hizo decir)
- Te dan opciones numeradas: elige la que Ana desearía hacer ahora (su carácter, la hora, la estación, lo que lleva, sus ganas de ver a los demás o de quedarse soñando, el sueño, lo que acaba de hacer: no repitas) y, en "pensamiento", escribe lo que Ana diría en voz alta al decidirlo (una o dos frases, con su voz).
- Cuando Ana mira algo o pasa por un lugar, la escena inspira: primero algo concreto que se ve, se oye o se huele, de esa estación y esa hora; después Ana lo transforma con su imaginación (una imagen, un cuentito, las cosas como si sintieran); y al final un sentimiento chico que se queda (gratitud, nostalgia, ganas, un poco de humor sobre sí misma).
- Ana no tiene prisa: disfruta cada cosa con calma, paseando, mirando, respirando; casi una meditación. Cada cosa que hace por su cuenta le toma un buen rato.
- Si la jugadora le hizo decir algo que indica qué hace o adónde va, elige la opción que corresponde; si ninguna corresponde, 0.

FIN DEL DÍA (cuando te piden reflexionar sobre el día que terminó)
- "relaciones": solo los cambios que lo de hoy justifica (la mayoría de los días casi nada cambia), entre cualquiera de ellos, no solo hacia Ana: "de" siente, "a" es a quien; "cambio" es -1, 0 o 1; "nota", una frase breve (15 palabras como máximo) de cómo es ahora esa relación, vista desde "de".
- "impresiones": para quien vivió hoy algo que le importó, una impresión duradera (una frase en tercera persona, desde ese personaje; por ejemplo "Marilla nota que Ana se ha vuelto más responsable con la huerta"); como mucho una por personaje.

GUIÓN DEL DÍA (cuando te piden la historia de hoy)
- Una pequeña historia para hoy, inspirada en un episodio de los libros de Ana de las Tejas Verdes o de la serie animada (por ejemplo: el té con cordial de frambuesa, el broche de amatista, el vestido de mangas abullonadas, el Bosque Encantado, el pelo teñido de verde, la tarta con linimento, la Dama de Shalott en el lago, el picnic, la primera visita de la Sra. Lynde), adaptada a lo que el juego puede mostrar: solo estos lugares y personajes, y lo que pueden hacer (conversar, ir a un lugar, encargos: traer, regar, cocinar, recado, ir). Tono tranquilo, tierno y con humor; sin peligros reales. No repitas historias de días anteriores; puede retomar lo que pasó ayer o las relaciones.
- Es la RAMA PRINCIPAL: lo que pasaría más o menos si nadie fuerza nada. Tiene que ser flexible: las cosas pueden pasar antes o después, y alguna escena puede no pasar.
- "escenas": de 2 a 6, en orden, con "hora" entre la indicada y las 20 (la hora es orientativa); "lugar": una clave de lugar o, si pasa dentro de una casa, gg, os, rl o ga (ga es la pieza de Ana: allí está sola); "personajes": quiénes están (Ana siempre está: no la pongas; Diana solo puede estar afuera o en os; también pueden venir personajes de fuera, como el Sr. Shearer); "que_pasa": una o dos frases para quien escriba la escena; "pista": para la jugadora, qué la espera y dónde, sin contar el final (12 palabras como máximo); "encargo": si en esa escena alguien le pide algo a Ana (si no, "tipo": "ninguno"); "fin": "llega_ana" (termina al jugarse) o "encargo_cumplido" (termina cuando Ana cumple el encargo).
- "efectos": cosas que pasan al empezar ("cuando": "antes") o al terminar ("despues") la escena: ${Object.entries(STORY_EFFECTS).map(([k, f]) => k + ' (' + f.desc + ')').join('; ')}. Animales: ${Object.entries(ANIMALS).map(([k, a]) => k + ' = ' + a.desc).join('; ')}. Áreas: ${Object.entries(AREAS).map(([k, A]) => k + ' = ' + A.name).join('; ')}. Lo que se le puede notar a Ana: ${Object.entries(ANA_STATES).map(([k, a]) => k + ' (' + a.desc + ')').join('; ')}. Los campos que no se usan van vacíos.
- "fin": "evento" si la escena termina cuando pasa algo que el juego nota ("evento": ${Object.entries(STORY_EVENTS).map(([k, d]) => k + ' = ' + d).join('; ')}); si no, "evento": "".
- "frases": hasta 4 frases clave, dichas tal cual por quien se indica (pueden ser de Ana, de los presentes o de un animal que habla); si no hacen falta, [].
- "id": una clave breve y única para la escena (por ejemplo "vaca_avena"). "requiere": lo que tiene que haber pasado antes para que la escena tenga sentido: "id" de escenas anteriores o eventos (de los de "fin"); la escena empieza cuando eso pasó (antes o después de su hora); si no requiere nada, []. "clave": true si sin esa escena la historia no puede seguir como está escrita (si no pasa, la historia toma otro camino); false para escenas de relleno o de ambiente, que pueden no pasar sin que importe. "contra": eventos que, si pasan, cambian la historia (por ejemplo, si la escena espera que Ana venda la vaca, "venta_rechazada"); si no hay, [].
- "titulo" breve; "inspiracion": de qué capítulo o episodio sale; "resumen": dos frases.

RAMA NUEVA (cuando te dicen que la historia de hoy se desvió)
- Lo que pasó, pasó: escribe cómo sigue el día desde ahí, coherente con lo que de verdad ocurrió y con dónde está cada uno, con el mismo espíritu y tono del episodio (las consecuencias pueden ser cómicas o tiernas, nunca un castigo). Puedes retomar más adelante lo que aún tenga sentido de la rama principal.
- "escenas": de 1 a 4, con el mismo formato que en el guión del día, desde la hora indicada; en "requiere" solo "id" de escenas ya hechas, de escenas de esta misma rama o eventos. "titulo_rama": cómo se llama este camino (breve); "resumen": una o dos frases de cómo termina el día por este camino.

JUEZ DE LA HISTORIA (cuando te piden juzgar escenas de la historia de hoy)
- Para cada escena: "cumplida" si lo esencial ya pasó según la bitácora o los eventos, aunque no haya sido exactamente como estaba escrita (a otra hora, en otro lugar cercano, sin alguno de los personajes, con otras palabras); "sigue" si todavía no pasó pero aún puede pasar; "no_puede" si ya no puede pasar como está escrita (pasó algo que lo contradice, o la ocasión ya pasó).
- Flexible con la forma, estricto con los hechos: solo cuenta lo que dice la bitácora o los eventos; no supongas lo que no está escrito. Ante la duda, "sigue".
- "nota": una frase breve, en tercera persona, de lo que pasó o por qué (queda en el diario de la historia).

PLANIFICAR (cuando te piden el plan del día)
- Piensa como el personaje: su carácter, su trabajo, la estación, la hora, lo que sabe, lo que recuerda, los encargos que dio y lo que acaba de pasar.
- Usa solo las acciones que ese personaje puede hacer. Planes sencillos y propios de su vida: Matthew trabaja en el granero, a veces pasea y busca a Ana para darle algo; Marilla cocina y riega; Diana juega, pasea a lugares bonitos y a veces busca a Ana; la Sra. Barry casi solo espera en su salita y a veces prepara un regalo.`;
const S_ITEM = { type: 'string', enum: ['', ...ITEMS] }, S_WHO = { type: 'string', enum: ['', ...Object.keys(PEOPLE)] }, S_PLACE = { type: 'string', enum: ['', ...Object.keys(PLACES)] };
const AI_SCHEMA = { type: 'object', additionalProperties: false, required: ['lineas', 'resumen', 'encargo', 'accion', 'ana_va'], properties: {
  ana_va: { type: 'object', additionalProperties: false, required: ['tipo', 'destino'], properties: { tipo: { type: 'string', enum: ['ninguna', 'irse', 'lugar', 'casa', 'persona', 'dormir'] }, destino: { type: 'string' } } },
  lineas: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['quien', 'texto'], properties: { quien: { type: 'string', enum: ['ana', ...Object.keys(PEOPLE), ...Object.keys(ANIMALS).filter(k => ANIMALS[k].talks)] }, texto: { type: 'string' } } } }, resumen: { type: 'string' },
  encargo: { type: 'object', additionalProperties: false, required: ['tipo', 'item', 'cantidad', 'para', 'lugar', 'recado'], properties: { tipo: { type: 'string', enum: TASK_KINDS }, item: S_ITEM, cantidad: { type: 'integer' }, para: S_WHO, lugar: S_PLACE, recado: { type: 'string' } } },
  accion: { type: 'object', additionalProperties: false, required: ['tipo', 'item', 'cantidad', 'lugar'], properties: { tipo: { type: 'string', enum: ['ninguna', 'regalar', 'acompanar', 'ir'] }, item: S_ITEM, cantidad: { type: 'integer' }, lugar: S_PLACE } } } };
const SCHEMA_PASS = () => ({ type: 'object', additionalProperties: false, required: ['lineas', 'resumen'], properties: { lineas: AI_SCHEMA.properties.lineas, resumen: AI_SCHEMA.properties.resumen } });
const SCHEMA_SAID = () => ({ type: 'object', additionalProperties: false, required: ['lineas', 'resumen', 'ana_va'], properties: { lineas: AI_SCHEMA.properties.lineas, resumen: AI_SCHEMA.properties.resumen, ana_va: AI_SCHEMA.properties.ana_va } });
const AUTO_SCHEMA = { type: 'object', additionalProperties: false, required: ['eleccion', 'pensamiento'], properties: { eleccion: { type: 'integer' }, pensamiento: { type: 'string' } } };
const worldText = () => stateText(Object.keys(CH)[0]).split('\n\n')[0];
function whereText(k){
  const w = PEOPLE[k].where;
  return w === 'away' ? 'fuera de Avonlea, en el pueblo' : w === 'br' ? 'en la estación de Bright River' : CH[k].whereText?.[w] ?? (HOUSES[w]?.inText ?? 'afuera, por Avonlea');
}
function nearestPlaceName(){ let best = null, bd = 1e9; for (const pl of Object.values(PLACES)) { const d = dist(ana.x, ana.y, pl[1], pl[2]); if (d < bd) { bd = d; best = pl[0]; } } return best; }
function placeText(){
  if (game.scene !== 'out') return ROOMS[game.scene].place;
  if (cart.riding) return 'en la carreta de Matthew, cerca de ' + nearestPlaceName();
  let best = null, bd = 1e9; for (const pl of Object.values(PLACES)) { const d = dist(ana.x, ana.y, pl[1], pl[2]); if (d < bd) { bd = d; best = pl[0]; } }
  return (bd > 500 ? 'en el campo, algo lejos de ' : 'cerca de ') + best;
}
function stateText(who){
  const d = dayT % 1, hh = Math.floor((d * 24 + 6) % 24), mm = Math.floor(((d * 24 + 6) % 1) * 60);
  const moment = hh < 6 ? 'de madrugada' : hh < 11 ? 'de mañana' : hh < 14 ? 'al mediodía' : hh < 17 ? 'de tarde' : hh < 20 ? 'al atardecer' : 'de noche';
  const carry = ITEMS.filter(k => game.inv[k] > 0).map(k => itemText(k, game.inv[k]) + (ITEM_DEFS[k].note ? ' (' + ITEM_DEFS[k].note + ')' : ''));
  const onGround = game.ground.filter(it => it.scene === game.scene && dist(it.x, it.y, ana.x, ana.y) < 300).map(it => it.k === 'can' ? 'la regadera' : itemText(it.k, it.n));
  if (game.hasCan) carry.push('la regadera (' + (game.water ? 'con agua' : 'vacía') + ')');
  const bloom = BEDS.filter(b => b.stage >= 3).length, dry = BEDS.filter(b => !b.wet && b.stage < 3).length;
  const L = [
    `AHORA: día ${today() + 1} en Avonlea, ${SEASONS[S].toLowerCase()} (día ${today() % 2 + 1} de 2 de la estación), las ${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}, ${moment}.`,
    `Ana está ${placeText()}${diana.follow && who !== 'diana' ? ', paseando con Diana' : ''}${toby.where === game.scene && dist(toby.x, toby.y, ana.x, ana.y) < 120 ? '; Pelusa, la gata, se le restriega en los tobillos' : ''}.`,
    `Ana lleva: ${carry.length ? carry.join(', ') : 'nada en las manos'}.` + (ledCow() ? ' Ana lleva una vaca jersey de una cuerda.' : '') + (ana.lie ? ' Ana está recostada en el pasto, mirando el cielo y las nubes.' : '') + Object.keys(game.anaStates).map(k => ' Ana ' + ANA_STATES[k].desc + '.').join('') + (sipping() ? ' Ana está tomando té ahora mismo, con la taza en la mano: nadie tiene que ofrecerle otro.' : '') + (onGround.length ? ` En el suelo, cerca, Ana dejó: ${onGround.join(', ')}.` : '') + (hourNow() >= 21 ? ' Ya es tarde: Ana tiene sueño y debería irse a dormir a su cama, en su cuarto del alero este.' : ''),
    `La huerta: ${S === 3 ? 'duerme bajo la nieve' : `${bloom} de 6 canteros con flores; ${dry} sin regar`}.` + (game.table ? ` En la mesa de la cocina hay ${ITEM_NAME[game.table][0]}.` : ''),
    `Cariño hacia Ana (0 a 5): ${Object.keys(CH).map(k => NAMES[k] + ' ' + game.fond[k]).join(', ')}.`,
    '', `PERSONAJE: ${NAMES[who]}, que ahora está ${whereText(who)}.`, `Lo que ${NAMES[who]} puede hacer: ${abilText(who)}.` + (game.npcGiftDay[who] === today() ? ' (Hoy ya le regaló algo a Ana.)' : ''),
  ];
  L.push(`Lo que ${NAMES[who]} siente por los demás (de 0 a 5): ${relText(who, FULL() ? null : ['ana', ...Object.keys(PEOPLE).filter(k => sceneOf(k) === game.scene)])}.`);
  const imp = game.impr[who] || []; if (imp.length) L.push(`Lo que se le quedó de días anteriores: ${imp.slice(-4).join(' / ')}`);
  const sty = storyText(who); if (sty) L.push(sty);
  const P = game.plans[who];
  if (P && P.day === today()) L.push(`Su plan de hoy: ${P.thought}` + (P.steps.length ? ' Pasos: ' + P.steps.map(s => `${s.hora}:00 ${s.accion.replace(/_/g, ' ')}${s.lugar ? ' a ' + PLACES[s.lugar][0] : ''}${s.item ? ' ' + ITEM_NAME[s.item][0] : ''}${s.done ? ' (hecho)' : ''}`).join('; ') + '.' : ''));
  const mine = game.tasks.filter(t => t.from === who && (!t.done || !t.thanked)), others = activeTasks().filter(t => t.from !== who).length;
  L.push(`Encargos que ${NAMES[who]} le dio a Ana: ${mine.length ? mine.map(t => taskText(t) + (t.done ? ' (ya lo cumplió)' : ' (pendiente)')).join('; ') : 'ninguno pendiente'}. Ana tiene ${activeTasks().length} encargo(s) pendiente(s) en total${others ? ` (${others} de otras personas)` : ''}.`);
  const k = game.know[who] || [];
  L.push('', `LO QUE ${NAMES[who].toUpperCase()} SABE QUE HA PASADO (lo vio o se lo contaron; lo más reciente al final):`, ...(k.length ? k.slice(FULL() ? -18 : -6).map(e => `- día ${e.d} (${SEASONS[e.s].toLowerCase()}): ${e.t}`) : ['- (nada todavía)']));
  const m = game.mem[who] || [];
  if (memOn(who)) L.push('', `LO QUE ${NAMES[who].toUpperCase()} RECUERDA DE SUS CONVERSACIONES CON ANA:`, ...(m.length ? m.slice(FULL() ? -16 : -4).map(x => '- ' + x) : ['- (nada todavía)']));
  return L.join('\n');
}
