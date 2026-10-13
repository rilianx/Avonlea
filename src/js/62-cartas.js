/* ---------- letters: written to someone (Ana reads it aloud as she writes), taken to the post office (Lawson's store),
   they arrive a day or a few later (Charlottetown is farther), and the answer comes back days or weeks after: it waits
   at the post office until Ana asks for it, and then she can read it. ---------- */
const CORREO = {
  diana: { nombre: 'Diana', donde: 'aquí en Avonlea, en La Cuesta del Huerto', dias: 1, resp: [2, 4], saludo: 'Mi queridísima Diana, amiga del alma:', firma: 'Tu amiga del alma hasta la muerte, Ana (con e)' },
  stacy: { nombre: 'la Srta. Stacy', donde: 'en la pensión de Avonlea', dias: 1, resp: [3, 6], saludo: 'Querida Srta. Stacy:', firma: 'Su alumna que la quiere, Ana Shirley' },
  sraallan: { nombre: 'la Sra. Allan', donde: 'en la casa parroquial', dias: 1, resp: [2, 5], saludo: 'Querida Sra. Allan:', firma: 'Con todo cariño, Ana Shirley' },
  josephine: { nombre: 'la Srta. Josephine Barry', donde: 'en Charlottetown', dias: 3, resp: [7, 14], saludo: 'Querida tía Josephine (porque usted me dejó llamarla así):', firma: 'Su amiga que la recuerda siempre, Ana Shirley' },
};
const CARTA_CUERPO = {
  diana: [['Te escribo desde mi cuarto del alero, con la ventana abierta y el cerezo Reina de las Nieves mirándome.', 'Hoy pensé que si fuéramos princesas encerradas en una torre, nos mandaríamos cartas con una paloma blanca. Pero el correo de Avonlea también sirve.', '¿Mañana nos vemos en el Bosque Encantado? Lleva tu libro de poemas.'], ['No puedo esperar a verte para contarte todo, así que te lo escribo.', 'Marilla dice que hablo demasiado, pero en el papel nadie me puede interrumpir.', 'Guárdame un lugar a tu lado en la escuela, ¿sí?']],
  stacy: [['Le escribo para contarle que terminé de leer el libro que nos recomendó, y que lloré en el capítulo once.', 'Estuve pensando en lo que dijo de los adjetivos: esta carta tiene solo los indispensables. Bueno, casi.', 'Quería decirle que gracias a usted estudiar ya no me parece un castigo, sino una aventura.'], ['Le escribo desde Tejas Verdes con una pregunta muy importante: ¿cree usted que yo podría llegar a escribir un libro de verdad?', 'Ya tengo el título. Lo que me falta es todo lo demás.']],
  sraallan: [['Le escribo para darle las gracias por el té de la otra tarde. Fue uno de los momentos más elegantes de mi vida.', 'Sigo pensando en lo que usted dijo de ser buena. Lo estoy intentando todos los días, aunque algunos días me resulta mejor que otros.'], ['Quería contarle que ya no le pongo linimento a las tartas. Aprendí la lección para siempre.', 'Ojalá todas las personas fueran tan comprensivas como usted.']],
  josephine: [['Le escribo desde Avonlea, donde todo sigue igual de bonito que cuando usted vino de visita.', 'Diana y yo todavía nos reímos de la noche en que saltamos sobre su cama. Bueno, ahora nos reímos; esa noche no tanto.', 'Si alguna vez se aburre en Charlottetown, acuérdese de que aquí tiene una amiga con mucha imaginación.'], ['Le cuento que este año en Tejas Verdes {estacion}.', 'Marilla dice que no hay que molestar a las personas importantes con cartas largas, así que esta es corta. Para mí, al menos.']],
};
const CARTA_RESP = {
  diana: [['Querida Ana:', '¡Qué carta tan bonita! La leí tres veces y la guardé en mi caja de cartas, con la cinta azul.', 'Mamá dice que mañana puedo ir a Tejas Verdes después de los quehaceres. ¡Llevo el libro de poemas!', 'Tu amiga del alma, Diana'], ['Queridísima Ana:', 'Tu carta me hizo reír tanto que Minnie May me preguntó qué pasaba. No le dije: es un secreto de amigas del alma.', 'Guardé tu lugar en la escuela. Ruby quería sentarse, pero le dije que no.', 'Siempre tuya, Diana']],
  stacy: [['Querida Ana:', 'Me alegró mucho recibir tu carta. Escribes con el corazón, y eso no se enseña.', 'Sigue leyendo y escribiendo todos los días, aunque sea un poco. Y sí: usa menos adjetivos.', 'Con cariño, Muriel Stacy'], ['Querida Ana:', 'Claro que podrías escribir un libro. Empieza por una página, y después otra. Así se hacen todos.', 'Te espero el lunes con tu composición.', 'Tu maestra, M. Stacy']],
  sraallan: [['Querida Ana:', 'Qué alegría me dio tu carta. A mí también me gustó mucho la tarde del té.', 'Ser buena no es no equivocarse nunca, Ana: es seguir intentándolo. Y tú lo haces muy bien.', 'Te quiere, la Sra. Allan']],
  josephine: [['Querida Ana:', 'Tu carta me hizo reír más que cualquier cosa en todo el invierno. Hacía años que no me reía así.', 'Charlottetown es muy aburrido sin una niña como tú. Cuando vengas con Diana, iremos a la exposición.', 'Tu vieja amiga, Josephine Barry'], ['Mi querida Ana:', 'Recibí tu carta y la leí junto a la chimenea. Escribes como hablas, y eso es un gran elogio viniendo de mí.', 'Te mando un saludo para Marilla, y para ti, mi cariño.', 'J. Barry']],
};
const ESTACION_TXT = ['los cerezos están en flor', 'el sol de verano madura las bayas', 'los arces se pusieron rojos', 'la nieve cubre el Camino Blanco de las Delicias'];
const cartas = () => game.cartas || (game.cartas = []);
const YO = { 'fue': 'fui', 'recogió': 'recogí', 'cocinó': 'cociné', 'preparó': 'preparé', 'regó': 'regué', 'sembró': 'sembré', 'visitó': 'visité', 'patinó': 'patiné', 'remó': 'remé', 'leyó': 'leí', 'juró': 'juré', 'adornó': 'adorné', 'estudió': 'estudié', 'recitó': 'recité', 'decoró': 'decoré', 'lavó': 'lavé', 'barrió': 'barrí', 'puso': 'puse', 'cuidó': 'cuidé', 'consoló': 'consolé', 'felicitó': 'felicité', 'perdonó': 'perdoné', 'bautizó': 'bauticé', 'se tiró': 'me tiré', 'se tiñó': 'me teñí', 'le dio': 'le di', 'le regaló': 'le regalé', 'le devolvió': 'le devolví', 'ensayó': 'ensayé', 'se sentó': 'me senté' };
function cartaNoticia(){   // something that really happened to her lately, told by her: «Hoy fui de picnic al lago con Diana.»
  const J = (game.journal || []).slice().reverse().filter(e => e.d >= today() && /^Ana /.test(e.t) && !/carta|correo/.test(e.t));
  for (const e of J) { const r = e.t.slice(4); for (const [a, b] of Object.entries(YO)) if (r.startsWith(a + ' ')) return 'Hoy ' + b + r.slice(a.length).replace(/\.$/, '') + '.'; }
  return null;
}
function cartaTexto(para){
  const C = CORREO[para] || CORREO.stacy, body = pick(CARTA_CUERPO[para] || CARTA_CUERPO.stacy).map(l => l.replace('{estacion}', ESTACION_TXT[S]));
  const nov = cartaNoticia();
  return [C.saludo, 'Aquí en Tejas Verdes ' + ESTACION_TXT[S] + '.', ...(nov ? [nov] : []), ...body, C.firma];
}
// the post goes round once in a while: what was sent arrives; what was answered comes back to the post office
let correoT = 0;
function correoTick(dt){
  if ((correoT -= dt) > 0) return; correoT = 3;
  const d = today();
  for (const c of cartas()) {
    const C = CORREO[c.para];
    if (c.estado === 'enviada' && C && d >= c.envio + C.dias) { c.estado = 'entregada'; c.llego = d; cartaAfecto(c.para); c.resp = d + C.resp[0] + Math.floor(Math.random() * (C.resp[1] - C.resp[0] + 1)); logEv(`${cap(C.nombre)} recibió la carta de Ana.`, []); }
    if (c.estado === 'entregada' && d >= c.resp) { c.estado = 'respondida'; cartas().push({ id: cartas().length + 1, de: c.para, para: 'ana', texto: pick(CARTA_RESP[c.para] || CARTA_RESP.stacy), dia: d, estado: 'en_correo' }); notice(`📬 Llegó una carta para Ana de ${CORREO[c.para].nombre}: está en la oficina de correos (la tienda de Lawson).`); logEv(`Llegó al correo una carta de ${CORREO[c.para].nombre} para Ana.`, []); }
  }
}
// at the post office: Ana asks for her mail; at home (or anywhere), she reads it
function correoRetirar(){
  const L = cartas().filter(c => c.para === 'ana' && c.estado === 'en_correo'); if (!L.length) return say('lawson', 'Nada para ti hoy, Ana. Pero el correo llega todos los días: vuelve pronto.', [['← Volver', () => shopMenu()]]);
  for (const c of L) c.estado = 'recibida'; logEv(`Ana retiró del correo ${L.length === 1 ? 'una carta de ' + CORREO[L[0].de].nombre : L.length + ' cartas'}.`, []); save();
  say('lawson', L.length === 1 ? `Sí, hay una carta para ti, de ${CORREO[L[0].de].nombre}. Aquí tienes.` : `¡${L.length} cartas para ti! Eres la niña más escrita de Avonlea.`, [['📜 Leerla ahora', () => cartaLeer(L[0])], ['← Volver', () => shopMenu()]]);
}
function cartaLeer(c, i = 0){
  c.estado = 'leida'; if (!i) logEv(`Ana leyó la carta de ${CORREO[c.de].nombre}.`, []);
  const L = c.texto, last = i >= L.length - 1;
  say('Ana', L[i], last ? [['Guardarla', close]] : [['Seguir leyendo', () => cartaLeer(c, i + 1)], ['Guardarla para después', () => { c.estado = 'recibida'; close(); }]]);
}