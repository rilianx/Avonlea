/* ---------- the bank of written dialogues for pairs and trios: when two (or three) of them meet, the next block not
   yet said (game.dlgUsed); when all have been said, the usual greetings and gossip ---------- */
const DLG_BANK = {
  'ana+diana': [
    [['ana', '¿Juras ser mi amiga del alma, Diana, mientras el sol y la luna existan?'], ['diana', '¡Lo juro! Aunque no sé muy bien cómo se jura… ¿así está bien?'], ['ana', 'Perfecto. Ahora es para siempre.']],
    [['diana', 'Ana, ¿cómo se te ocurren tantas palabras largas?'], ['ana', 'Las tengo guardadas para las ideas grandes. Las chicas no caben en palabras chicas.'], ['diana', 'Yo solo tengo palabras medianas…']],
    [['ana', 'He decidido que el claro de los abedules se llame la Senda de los Enamorados.'], ['diana', '¡Qué romántico! Pero no se lo digas a mamá.'], ['ana', 'Será nuestro secreto, como todo lo importante.']],
    [['diana', 'Mamá dice que puedo ir a tu casa el sábado, si no hay lluvia.'], ['ana', 'Entonces voy a rezar para que no llueva… y por si acaso, para que llueva solo un poquito.']],
    [['ana', '¿Te imaginas que el Bosque Encantado de verdad tenga fantasmas?'], ['diana', '¡Ana! Ahora no voy a poder pasar por ahí de noche.'], ['ana', 'Yo tampoco. Creo que imaginé demasiado bien.']],
    [['diana', 'Gilbert Blythe te miró otra vez en clase.'], ['ana', 'Gilbert Blythe puede mirar a la pared. A mí no me interesa en lo más mínimo.'], ['diana', 'Si tú lo dices…']],
  ],
  'ana+marilla': [
    { at: 'casa', l: [['marilla', 'Ana, ¿barriste el porche como te dije?'], ['ana', 'Sí, Marilla… bueno, casi. Me distraje mirando una araña que tejía, y era tan perfecta…'], ['marilla', 'Las arañas no barren porches, Ana.']] },
    [['ana', 'Marilla, ¿alguna vez fue usted una niña como yo?'], ['marilla', 'Fui una niña. Como tú, espero que no.'], ['ana', 'Entonces se perdió de mucho, Marilla.']],
    { at: 'gg', l: [['marilla', 'Di tus oraciones antes de dormir.'], ['ana', 'Ya sé una de memoria. Pero a veces prefiero inventarlas: me salen más sentidas.'], ['marilla', 'Hmm. Con que sean sinceras, basta.']] },
    { at: 'gg', l: [['ana', '¿Puedo poner flores en la mesa? Una mesa sin flores es como una cara sin sonrisa.'], ['marilla', 'Pon las que quieras, mientras no traigas medio jardín y las abejas con él.']] },
    [['marilla', 'Ese sombrero está lleno de flores otra vez.'], ['ana', 'Es que las flores me quedan mejor que el pelo rojo, Marilla.'], ['marilla', 'Tu pelo no tiene la culpa de nada. Quítate eso antes de ir a la iglesia.']],
  ],
  'ana+matthew': [
    { at: 'arroyo', l: [['ana', 'Señor Matthew, ¿le parece que el arroyo canta?'], ['matthew', 'Bueno, pues… ahora que lo dices, algo tararea, sí.'], ['ana', '¡Sabía que usted lo entendería!']] },
    [['matthew', 'Ana… ¿te gustaría un vestido con mangas abullonadas? Digo… por si acaso.'], ['ana', '¡Oh, señor Matthew! ¿De verdad lo dice?'], ['matthew', 'Bueno, pues… no le digas nada a Marilla todavía.']],
    [['ana', '¿Usted cree que las vacas tienen pensamientos profundos?'], ['matthew', 'Bueno, pues… las nuestras parecen pensar mucho en el pasto.'], ['ana', 'Eso también es una filosofía.']],
    [['matthew', 'Lo hiciste muy bien hoy, Ana.'], ['ana', '¿Usted cree? Yo pensé que me había equivocado en todo.'], ['matthew', 'Ya lo creo que no. Yo lo vi.']],
    [['ana', 'Hoy no hablé casi nada, señor Matthew. ¿Se dio cuenta?'], ['matthew', 'Bueno, pues… no, la verdad. Me pareció lo de siempre.'], ['ana', '¡Ay! Entonces tendré que esforzarme más.']],
  ],
  'lynde+marilla': [
    [['lynde', 'Marilla, esa niña tuya va a terminar de maestra o de actriz, una de dos.'], ['marilla', 'Mientras termine sus quehaceres primero, Rachel, que termine de lo que quiera.']],
    [['lynde', '¿Supiste que los Pye volvieron a pelear con los Sloane por la cerca?'], ['marilla', 'No, y no me hace falta saberlo.'], ['lynde', 'Bueno, yo solo lo digo. Nadie puede decir que Rachel Lynde no avisa.']],
    { at: 'dentro', l: [['marilla', '¿Más té, Rachel?'], ['lynde', 'Media taza. Y de esa mermelada de ciruelas, que la tuya es mejor que la mía, aunque no se lo digas a nadie.']] },
    [['lynde', 'La maestra nueva tiene ideas muy modernas. ¡Hacen ejercicios físicos en la escuela!'], ['marilla', 'Mientras no se rompan la cabeza…'], ['lynde', 'Ya veremos, Marilla. Ya veremos.']],
  ],
  'marilla+matthew': [
    [['marilla', 'Matthew, ¿le estuviste dando caramelos a Ana otra vez?'], ['matthew', 'Bueno, pues… quizás uno. O dos.'], ['marilla', 'Esa niña te tiene en la palma de la mano.']],
    [['matthew', 'Marilla… la niña está creciendo, ¿no te parece?'], ['marilla', 'Demasiado rápido, Matthew. Demasiado rápido.']],
    [['marilla', 'Hay que arreglar la cerca del potrero antes del invierno.'], ['matthew', 'Ya lo creo. Mañana temprano, si no llueve.']],
  ],
  'ana+gilbert': [
    [['gilbert', 'Ana, ¿algún día me vas a perdonar lo de «Zanahorias»?'], ['ana', 'Algunas cosas no se perdonan, Gilbert Blythe.'], ['gilbert', 'Bueno… seguiré preguntando.']],
    [['gilbert', 'Felicitaciones por el examen. Me ganaste por un punto.'], ['ana', '…Gracias.'], ['gilbert', 'La próxima vez no será tan fácil, Ana.']],
    [['gilbert', '¿Quieres que te ayude con ese canasto?'], ['ana', 'Puedo sola, gracias.'], ['gilbert', 'Ya sé que puedes. Solo preguntaba.']],
  ],
  'ana+lynde': [
    [['lynde', 'Vaya, Ana, se te está oscureciendo el pelo. Ya no es tan colorado.'], ['ana', '¿De verdad, Sra. Lynde? ¡Es lo más lindo que me ha dicho nunca!']],
    [['lynde', 'Espero que te portes bien en la escuela, niña.'], ['ana', 'Lo intento con todas mis fuerzas, Sra. Lynde. A veces mis fuerzas se distraen.']],
  ],
  'ana+diana+marilla': [
    { at: 'casa', l: [['marilla', 'Niñas, no se alejen más allá del arroyo.'], ['diana', 'No, Srta. Cuthbert.'], ['ana', 'Solo hasta el Bosque Encantado, Marilla… que está más acá del arroyo, casi.'], ['marilla', 'Ana…']] },
    [['diana', 'Srta. Cuthbert, ¿Ana puede venir a tomar el té mañana?'], ['marilla', 'Si termina sus quehaceres, sí.'], ['ana', '¡Los terminaré hoy mismo! Bueno, mañana temprano.']],
  ],
  'ana+marilla+matthew': [
    [['ana', '¡Adivinen qué me pasó hoy!'], ['marilla', 'Algo que vamos a lamentar, seguramente.'], ['matthew', 'Déjala contar, Marilla.'], ['ana', '¡Gracias, señor Matthew! Pues verán…']],
    { at: 'gg', l: [['marilla', 'A la mesa. Y Ana, sin novelas en la mesa.'], ['ana', 'Era solo un capitulito, Marilla.'], ['matthew', '(se ríe bajito) Je.']] },
  ],
  'ana+lynde+marilla': [
    [['lynde', 'Marilla, esa niña habla más que un loro.'], ['ana', 'Los loros solo repiten, Sra. Lynde. Yo invento.'], ['marilla', 'Ana. A tu cuarto.']],
  ],
};
const dlgKey = ks => [...ks].sort().join('+');