// What should happen in each action, as a tale and as steps that can be checked against the account of the game
// (the relato: src/js/66-relato.js). Each step: who, and what must be seen of her at some moment, in order:
//   lugar / junto (where; donde: either, inside the room or at its door), postura, accion, lleva (in her arms), objeto (at hand), tiene (what she owns), pelo, dice;
//   dura: for at least that many minutes of the game. Text fields are regular expressions.
// id: the test goal that makes it happen (src/js/64-metas-de-prueba.js).
module.exports = [
  {
    id: 26, titulo: 'Lavar la loza y barrer la cocina', quienes: ['ana'],
    relato: 'Marilla le pide a Ana que lave los platos y barra. Ana junta los platos sucios de la mesa, los lleva al fregadero y los lava con agua caliente, sin apuro, unos diez minutos. Lleva la pila de platos limpios al aparador y los guarda. Después toma la escoba y barre la cocina de punta a punta, un buen rato.',
    pasos: [
      { quien: 'ana', lugar: /cocina/, junto: /mesa/, objeto: /recogiendo/, texto: 'Recoge los platos sucios de la mesa.' },
      { quien: 'ana', lleva: /sucios/, texto: 'Los lleva en los brazos.' },
      { quien: 'ana', junto: /fregadero/, objeto: /palangana/, dura: 8, texto: 'Los lava en el fregadero, unos diez minutos.' },
      { quien: 'ana', lleva: /limpios/, texto: 'Lleva los platos limpios.' },
      { quien: 'ana', junto: /aparador/, texto: 'Los guarda en el aparador.' },
      { quien: 'ana', lugar: /cocina/, objeto: /escoba/, dura: 8, texto: 'Barre la cocina con la escoba, un buen rato.' },
    ],
  },
  {
    id: 45, titulo: 'Escribir una carta y mandarla', quienes: ['ana'],
    relato: 'Ana sube a su pieza, se sienta al escritorio y escribe una carta a la Srta. Stacy, con el papel sobre el escritorio, sin apuro (una media hora). La dobla y la pone en su sobre. Después baja y va al correo (en la tienda de Lawson), y la deja para que la manden. Ya no la tiene.',
    pasos: [
      { quien: 'ana', lugar: /pieza/, junto: /escritorio/, postura: /sentada/, objeto: /carta/, dura: 20, texto: 'Escribe sentada al escritorio de su pieza, con la carta sobre él, una media hora.' },
      { quien: 'ana', tiene: /carta/, texto: 'Termina con la carta en su sobre.' },
      { quien: 'ana', donde: /tienda|correo/i, texto: 'Va al correo (en la tienda de Lawson).' },
      { quien: 'ana', tiene: /^(?![\s\S]*carta)/, texto: 'La deja: ya no la tiene.' },
    ],
  },
  {
    id: 8, titulo: 'La compota de Marilla', quienes: ['marilla', 'ana'],
    relato: 'Marilla quiere hacer compota para el invierno, pero no tiene manzanas: se las pide a Ana. Ana va a los manzanos, recoge las manzanas y se las lleva a Marilla a la cocina. Marilla las pela y las cuece en la estufa, removiendo, una media hora por tanda (quiere dos frascos: hace dos tandas) o más. Al final tiene la compota.',
    pasos: [
      { quien: 'ana', lugar: /Avonlea/, accion: /recoger manzanas/, texto: 'Ana recoge manzanas de los manzanos.' },
      { quien: 'ana', tiene: /manzanas/, texto: 'Ana tiene las manzanas.' },
      { quien: 'ana', lugar: /cocina/, accion: /dar manzanas/, texto: 'Se las da a Marilla en la cocina.' },
      { quien: 'marilla', tiene: /manzanas/, texto: 'Marilla tiene las manzanas.' },
      { quien: 'marilla', junto: /estufa/, accion: /cocinar compota/, dura: 20, texto: 'Marilla cocina la compota en la estufa, una media hora o más.' },
      { quien: 'marilla', tiene: /compota/, texto: 'Marilla tiene la compota.' },
    ],
  },
  {
    id: 20, titulo: 'Matthew trae huevos', quienes: ['matthew', 'ana'],
    relato: 'Ana le pide huevos a Matthew. Matthew va donde están las gallinas, junto al granero, se agacha a sacarlos de los nidos y los junta. Se los lleva a Ana, que los recibe.',
    pasos: [
      { quien: 'matthew', junto: /gallin|granero/, accion: /recoger huevos/, postura: /agachad/, texto: 'Matthew se agacha junto al granero, donde están las gallinas, a sacar los huevos.' },
      { quien: 'matthew', tiene: /huevos/, texto: 'Matthew tiene los huevos.' },
      { quien: 'matthew', accion: /dar huevos/, texto: 'Se los da a Ana.' },
      { quien: 'ana', tiene: /huevos/, texto: 'Ana tiene los huevos.' },
    ],
  },
  {
    id: 59, titulo: 'El tinte del buhonero', quienes: ['ana', 'buhonero'],
    relato: 'Pasa el buhonero por Tejas Verdes. Ana le cambia unos huevos por un frasco de tinte que promete pelo negro como el ala de un cuervo. Sube a su pieza y, frente al espejo del lavatorio, se tiñe el pelo con cuidado, un buen rato. Cuando termina, el pelo le ha quedado... verde.',
    pasos: [
      { quien: 'ana', dice: /tinte/, texto: 'Ana le pide el tinte al buhonero (a cambio de huevos).' },
      { quien: 'ana', tiene: /tinte/, texto: 'Ana tiene el tinte.' },
      { quien: 'ana', lugar: /pieza/, junto: /lavatorio/, accion: /teñir/, dura: 10, texto: 'Se tiñe frente al espejo del lavatorio de su pieza, un buen rato.' },
      { quien: 'ana', pelo: /verde/, texto: 'El pelo le queda verde.' },
    ],
  },

  {
    id: 0, titulo: 'Vender la vaca', quienes: ['ana'],
    relato: 'Ana va al granero y descuelga la cuerda de su gancho. Le pone la cuerda a la vaca y la lleva, despacio, hasta quien la compra. Hacen el trato y Ana se queda con el dinero.',
    pasos: [
      { quien: 'ana', junto: /granero/, accion: /tomar cuerda/, texto: 'Toma la cuerda en el granero.' },
      { quien: 'ana', guia: /./, texto: 'Lleva a la vaca de la cuerda.' },
      { quien: 'ana', tiene: /dolares/, texto: 'Vuelve con el dinero de la venta.' },
    ],
  },
  {
    id: 1, titulo: 'Una cinta para el pelo (trueque)', quienes: ['ana'],
    relato: 'Ana quiere una cinta y no tiene dinero. Va a los arbustos, se agacha y junta bayas en su canastito. Las lleva a la tienda de Lawson y las cambia por una cinta.',
    pasos: [
      { quien: 'ana', accion: /recoger bayas/, postura: /agachad/, texto: 'Se agacha a juntar bayas.' },
      { quien: 'ana', tiene: /bayas/, texto: 'Tiene las bayas.' },
      { quien: 'ana', donde: /tienda/i, texto: 'Va a la tienda de Lawson.' },
      { quien: 'ana', tiene: /cinta/, texto: 'Tiene la cinta.' },
    ],
  },
  {
    id: 2, titulo: 'Un regalo para Marilla', quienes: ['ana', 'marilla'],
    relato: 'Ana quiere regalarle algo a Marilla. Va a la huerta, se agacha y corta un ramo de flores. Entra a la cocina y se lo da a Marilla, que lo recibe.',
    pasos: [
      { quien: 'ana', junto: /huerta/, accion: /recoger ramo/, postura: /agachad/, texto: 'Corta flores en la huerta, agachada.' },
      { quien: 'ana', tiene: /ramo/, texto: 'Tiene el ramo.' },
      { quien: 'ana', lugar: /cocina/, accion: /dar ramo/, texto: 'Se lo da a Marilla en la cocina.' },
      { quien: 'marilla', tiene: /ramo/, texto: 'Marilla tiene el ramo.' },
    ],
  },
  {
    id: 6, titulo: 'Matthew trae azúcar', quienes: ['matthew', 'marilla'],
    relato: 'A Marilla le falta azúcar y se la pide a Matthew. Matthew va a la tienda de Lawson y la compra. Vuelve a la cocina y se la da.',
    pasos: [
      { quien: 'matthew', donde: /tienda/i, texto: 'Matthew va a la tienda.' },
      { quien: 'matthew', tiene: /azucar/, texto: 'Compra el azúcar.' },
      { quien: 'matthew', lugar: /cocina/, accion: /dar azucar/, texto: 'Se la da a Marilla en la cocina.' },
      { quien: 'marilla', tiene: /azucar/, texto: 'Marilla tiene el azúcar.' },
    ],
  },
  {
    id: 14, titulo: 'El té con la Sra. Allan', quienes: ['ana', 'sraallan'],
    relato: 'La Sra. Allan invita a Ana a tomar el té. Prepara el té en su casa. Ana llega y se sientan juntas a la mesa, con las tazas, a conversar sin apuro, una media hora.',
    pasos: [
      { quien: 'sraallan', accion: /cocinar te/, dura: 10, texto: 'La Sra. Allan prepara el té.' },
      { quien: 'ana', lugar: /parroquial/, junto: /té/, postura: /sentada/, objeto: /té/, dura: 20, texto: 'Ana toma el té sentada a la mesita, en la salita de la casa parroquial, una media hora.' },
      { quien: 'sraallan', lugar: /parroquial/, junto: /té/, postura: /sentada/, objeto: /té/, dura: 20, texto: 'La Sra. Allan se sienta con ella a la mesita, con su taza, una media hora.' },
    ],
  },
  {
    id: 15, titulo: 'Peg Bowen junta hierbas', quienes: ['peg'],
    relato: 'Peg Bowen anda por el bosque. Se agacha aquí y allá a juntar hierbas, varias veces, y se las lleva.',
    pasos: [
      { quien: 'peg', accion: /recoger hierbas/, postura: /agachad/, texto: 'Se agacha a juntar hierbas.' },
      { quien: 'peg', tiene: /hierbas/, texto: 'Tiene las hierbas.' },
    ],
  },
  {
    id: 17, titulo: 'La compota para la Sra. Barry', quienes: ['ana', 'barry', 'diana'],
    relato: 'La Sra. Barry quiere compota y se la pide a Diana; Diana se la pide a Ana. Ana la consigue y se la lleva a la Sra. Barry.',
    pasos: [
      { quien: 'ana', accion: /dar compota/, texto: 'Ana le da la compota.' },
      { quien: 'barry', tiene: /compota/, texto: 'La Sra. Barry tiene la compota.' },
    ],
  },
  {
    id: 27, titulo: 'Ordeñar y llevar la leche', quienes: ['matthew', 'marilla'],
    relato: 'Matthew va al corral, se sienta en el banquito junto a la vaca y la ordeña en el balde, sin apuro, un cuarto de hora. Lleva la leche a la cocina y se la da a Marilla.',
    pasos: [
      { quien: 'matthew', accion: /ordeñar/, postura: /sentad/, objeto: /balde/, dura: 10, texto: 'Ordeña sentado junto a la vaca, con el balde, un cuarto de hora.' },
      { quien: 'matthew', tiene: /leche/, texto: 'Tiene la leche.' },
      { quien: 'matthew', lugar: /cocina/, accion: /dar leche/, texto: 'Se la da a Marilla en la cocina.' },
      { quien: 'marilla', tiene: /leche/, texto: 'Marilla tiene la leche.' },
    ],
  },
  {
    id: 28, titulo: 'Matthew da de comer a los animales', quienes: ['matthew'],
    relato: 'Matthew lleva el grano al corral y lo va echando, en un lado y en otro, mientras los animales se acercan.',
    pasos: [
      { quien: 'matthew', accion: /alimentar/, objeto: /grano/, dura: 3, texto: 'Echa el grano en el corral.' },
    ],
  },
  {
    id: 29, titulo: 'Visita a la Sra. Lynde', quienes: ['ana', 'lynde'],
    relato: 'Ana va a la casa de la Sra. Lynde. Se sienta con ella y conversan con una taza de té, una media hora.',
    pasos: [
      { quien: 'ana', lugar: /Lynde/, accion: /visitar/, texto: 'Llega a la casa de la Sra. Lynde.' },
      { quien: 'ana', lugar: /Lynde/, postura: /sentada/, objeto: /té/, dura: 20, texto: 'Se sienta a tomar el té y conversar, una media hora.' },
    ],
  },
  {
    id: 31, titulo: 'Devolverle el libro a Diana', quienes: ['ana', 'diana'],
    relato: 'Ana lleva el libro que le prestaron a la casa de Diana y se lo devuelve en sus manos.',
    pasos: [
      { quien: 'ana', accion: /devolver libro/, texto: 'Le devuelve el libro a Diana.' },
      { quien: 'ana', tiene: /^(?![\s\S]*libro)/, texto: 'Ya no tiene el libro.' },
    ],
  },
  {
    id: 32, titulo: 'Amigas del alma', quienes: ['ana', 'diana'],
    relato: 'Ana y Diana, en el jardín de los Barry, se ponen frente a frente, se toman de las manos y juran ser amigas del alma para siempre.',
    pasos: [
      { quien: 'ana', accion: /jurar/, objeto: /manos/, dura: 2, texto: 'Ana jura tomada de las manos.' },
      { quien: 'diana', junto: /Huerto|Barry/, texto: 'Diana está con ella, en el jardín de los Barry.' },
    ],
  },
  {
    id: 34, titulo: 'Cuidar al Sr. Harrison', quienes: ['ana', 'harrison'],
    relato: 'El Sr. Harrison está enfermo, en cama. Ana saca el jarabe de ipecacuana del aparador de la cocina, va a su casa y, junto a la cama, se lo da a cucharadas.',
    pasos: [
      { quien: 'harrison', postura: /cama/, texto: 'El Sr. Harrison está en cama.' },
      { quien: 'ana', junto: /aparador/, accion: /tomar jarabe/, texto: 'Saca el jarabe del aparador.' },
      { quien: 'ana', tiene: /jarabe/, texto: 'Tiene el jarabe.' },
      { quien: 'ana', lugar: /Harrison/, accion: /cuidar/, objeto: /jarabe/, texto: 'Se lo da en su casa.' },
    ],
  },
  {
    id: 36, titulo: 'Estudiar y recitar la lección', quienes: ['ana'],
    relato: 'Ana estudia la lección sentada a la mesa, con el libro abierto, un buen rato. En la escuela se pone frente a la clase, junto a la pizarra, y la recita.',
    pasos: [
      { quien: 'ana', accion: /estudiar/, postura: /sentada/, objeto: /libro/, dura: 25, texto: 'Estudia sentada con el libro, un buen rato.' },
      { quien: 'ana', lugar: /escuela/i, accion: /recitar/, dura: 3, texto: 'Recita frente a la clase.' },
    ],
  },
  {
    id: 37, titulo: 'Las oraciones', quienes: ['ana'],
    relato: 'Ana sube a su pieza, se arrodilla junto a la cama y dice sus oraciones, unos minutos.',
    pasos: [
      { quien: 'ana', lugar: /pieza/, junto: /cama/, postura: /rodillas/, accion: /rezar/, dura: 3, texto: 'Reza de rodillas junto a la cama de su pieza.' },
    ],
  },
  {
    id: 38, titulo: 'El vestido de mangas abullonadas', quienes: ['ana', 'marilla'],
    relato: 'Marilla quiere coserle un vestido a Ana. Le traen la tela de la tienda. Marilla se sienta junto a la ventana de la cocina y cose, sin apuro, un buen rato, hasta que el vestido está listo.',
    pasos: [
      { quien: 'marilla', tiene: /tela/, texto: 'Marilla tiene la tela.' },
      { quien: 'marilla', accion: /coser/, postura: /sentada/, junto: /silla/, dura: 25, texto: 'Cose sentada junto a la ventana, un buen rato.' },
      { quien: 'marilla', tiene: /vestido/, texto: 'El vestido está listo.' },
    ],
  },
  {
    id: 39, titulo: 'El sombrero con flores', quienes: ['ana'],
    relato: 'Ana corta flores en la huerta y se adorna el sombrero con ellas, con cuidado, unos minutos.',
    pasos: [
      { quien: 'ana', accion: /recoger ramo/, texto: 'Corta flores.' },
      { quien: 'ana', accion: /adornar/, objeto: /sombrero/, dura: 6, texto: 'Se adorna el sombrero.' },
    ],
  },
  {
    id: 40, titulo: 'Remar en el lago', quienes: ['ana'],
    relato: 'Ana sube al bote en el Lago de las Aguas Brillantes y rema, sentada, sin apuro, un buen rato.',
    pasos: [
      { quien: 'ana', accion: /remar/, postura: /sentada/, objeto: /bote/, dura: 20, texto: 'Rema sentada en el bote, un buen rato.' },
    ],
  },
  {
    id: 41, titulo: 'Ponerle nombre a los lugares', quienes: ['ana'],
    relato: 'Ana se detiene en un lugar que le gusta, lo mira y le pone un nombre bonito en voz alta.',
    pasos: [
      { quien: 'ana', accion: /nombrar/, texto: 'Se detiene y le pone nombre a un lugar.' },
    ],
  },
  {
    id: 46, titulo: 'Leer el libro prestado', quienes: ['ana'],
    relato: 'Ana se sienta con el libro que le prestaron y lee, un buen rato.',
    pasos: [
      { quien: 'ana', accion: /leer/, postura: /sentada/, objeto: /libro/, dura: 20, texto: 'Lee sentada, un buen rato.' },
    ],
  },
  {
    id: 47, titulo: 'El club de cuentos', quienes: ['ana'],
    relato: 'Ana sube a su pieza y escribe un cuento sentada al escritorio, con el cuaderno abierto sobre él, un buen rato. Después se lo lee a Diana, sentadas juntas.',
    pasos: [
      { quien: 'ana', lugar: /pieza/, junto: /escritorio/, postura: /sentada/, objeto: /cuaderno/, dura: 25, texto: 'Escribe sentada al escritorio, con el cuaderno, un buen rato.' },
      { quien: 'ana', accion: /leer_cuento/, postura: /sentada/, texto: 'Se lo lee a Diana, sentadas juntas.' },
    ],
  },
  {
    id: 48, titulo: 'Ensayar y recitar en el concierto', quienes: ['ana'],
    relato: 'Ana ensaya su recitación con el libro, un rato. Por la tarde, en el concierto, sube al escenario del salón y recita.',
    pasos: [
      { quien: 'ana', accion: /ensayar/, objeto: /libro/, dura: 12, texto: 'Ensaya con el libro, un rato.' },
      { quien: 'ana', junto: /escenario/, accion: /actuar/, dura: 6, texto: 'Recita en el escenario del salón.' },
    ],
  },
  {
    id: 49, titulo: 'Las flores del salón', quienes: ['ana'],
    relato: 'Ana va al salón con flores y cuelga guirnaldas a lo largo de la pared, un tramo tras otro, un buen rato.',
    pasos: [
      { quien: 'ana', accion: /decorar_sala/, objeto: /flores/, dura: 15, texto: 'Cuelga las guirnaldas en el salón, un buen rato.' },
    ],
  },
  {
    id: 50, titulo: 'Felicitar a Diana', quienes: ['ana', 'diana'],
    relato: 'Diana recitó en el concierto. Ana va hasta ella y la felicita.',
    pasos: [
      { quien: 'ana', accion: /felicitar/, texto: 'Ana felicita a Diana.' },
    ],
  },
  {
    id: 51, titulo: 'Consolar a Diana', quienes: ['ana', 'diana'],
    relato: 'A Diana le prohibieron ver a Ana y está triste. Ana va hasta ella y la consuela con un abrazo.',
    pasos: [
      { quien: 'ana', accion: /consolar/, objeto: /abrazo/, texto: 'Ana la abraza.' },
    ],
  },
  {
    id: 52, titulo: 'Hacer heno', quienes: ['matthew'],
    relato: 'Matthew va al campo con la horquilla y junta el heno en un lugar y en otro, un buen rato; quedan los fardos en el campo.',
    pasos: [
      { quien: 'matthew', accion: /hacer_heno/, objeto: /horquilla/, dura: 10, texto: 'Junta el heno con la horquilla, un buen rato.' },
    ],
  },
  {
    id: 53, titulo: 'Partir leña', quienes: ['matthew', 'marilla'],
    relato: 'Matthew parte leña con el hacha junto al granero, un buen rato. Lleva la leña a la cocina y se la da a Marilla.',
    pasos: [
      { quien: 'matthew', junto: /granero/, accion: /partir_lena/, objeto: /hacha/, dura: 15, texto: 'Parte leña junto al granero, un buen rato.' },
      { quien: 'matthew', tiene: /lena/, texto: 'Tiene la leña.' },
      { quien: 'matthew', lugar: /cocina/, accion: /dar lena/, texto: 'Se la da a Marilla en la cocina.' },
    ],
  },
  {
    id: 54, titulo: 'Batir mantequilla', quienes: ['marilla'],
    relato: 'Marilla pone la leche de la mañana en la mantequera, junto a la mesa, y bate sin parar una media hora, hasta que hay mantequilla.',
    pasos: [
      { quien: 'marilla', accion: /batir/, objeto: /mantequera/, dura: 20, texto: 'Bate en la mantequera una media hora.' },
      { quien: 'marilla', tiene: /mantequilla/, texto: 'Tiene la mantequilla.' },
    ],
  },
  {
    id: 55, titulo: 'Sembrar y regar la huerta', quienes: ['ana'],
    relato: 'Ana va a la huerta con las semillas y siembra cama por cama. Después llena la regadera y las riega, una por una.',
    pasos: [
      { quien: 'ana', junto: /huerta/, accion: /sembrar/, objeto: /semillas/, dura: 3, texto: 'Siembra en la huerta.' },
      { quien: 'ana', accion: /regar/, objeto: /regadera/, dura: 2, texto: 'Riega con la regadera.' },
    ],
  },
  {
    id: 56, titulo: 'Patinar en el lago', quienes: ['ana'],
    relato: 'En invierno, Ana se pone los patines y patina en el lago helado, dando vueltas, un buen rato.',
    pasos: [
      { quien: 'ana', accion: /patinar/, objeto: /patines/, dura: 20, texto: 'Patina en el lago, un buen rato.' },
    ],
  },
  {
    id: 57, titulo: 'El trineo', quienes: ['ana'],
    relato: 'En invierno, Ana sube la colina con el trineo y se tira, una y otra vez, un buen rato.',
    pasos: [
      { quien: 'ana', accion: /trineo/, objeto: /trineo/, dura: 20, texto: 'Se tira en trineo, una y otra vez, un buen rato.' },
    ],
  },
  {
    id: 58, titulo: 'El picnic con Diana', quienes: ['ana', 'diana', 'marilla'],
    relato: 'Ana le pide permiso a Marilla. Prepara la canasta en la cocina. Va al lago con Diana; extienden el mantel, se sientan y meriendan, sin apuro, un buen rato.',
    pasos: [
      { quien: 'ana', lugar: /cocina/, accion: /preparar canasta/, texto: 'Prepara la canasta en la cocina.' },
      { quien: 'ana', accion: /merendar/, postura: /sentada/, objeto: /mantel/, dura: 25, texto: 'Merienda sentada sobre el mantel, un buen rato.' },
      { quien: 'diana', postura: /sentada/, texto: 'Diana está sentada con ella.' },
    ],
  },
  {
    id: 60, titulo: 'El corte de pelo', quienes: ['ana', 'marilla'],
    relato: 'Ana se sienta en una silla en medio de la cocina. Marilla, detrás de ella con las tijeras, le corta el pelo verde, con cuidado, un buen rato.',
    pasos: [
      { quien: 'ana', lugar: /cocina/, accion: /cortar_pelo/, postura: /sentada/, dura: 10, texto: 'Ana sentada en la cocina mientras le cortan el pelo, un buen rato.' },
      { quien: 'marilla', lugar: /cocina/, texto: 'Marilla está con ella en la cocina.' },
    ],
  },
  {
    id: 61, titulo: 'El techo de los Barry', quienes: ['ana'],
    relato: 'Josie la desafía. Ana sube al techo de la casa de los Barry, camina por el caballete con los brazos abiertos… y se cae. Se tuerce el tobillo.',
    pasos: [
      { quien: 'ana', accion: /trepar/, texto: 'Sube al techo y camina por el caballete.' },
      { quien: 'ana', dice: /tobillo/, texto: 'Se cae y se tuerce el tobillo.' },
    ],
  },
  {
    id: 62, titulo: 'Conocer a Diana (una cadena del libro)', quienes: ['ana', 'marilla', 'diana', 'barry'],
    relato: 'El día antes, Ana le contó a Marilla que quería una amiga del alma. Hoy, en la tarde, Marilla va a La Cuesta del Huerto a devolverle un patrón a la Sra. Barry y lleva a Ana. La Sra. Barry las recibe en la salita y llama a Diana, que está en el jardín. Diana entra, las presentan, y Ana le pregunta si podría quererla lo bastante como para ser su amiga del alma. Diana se ríe y dice que sí.',
    pasos: [
      { quien: 'marilla', dice: /La Cuesta del Huerto/, texto: 'Marilla invita a Ana a ir con ella a La Cuesta del Huerto.' },
      { quien: 'ana', lugar: /Cuesta del Huerto/, texto: 'Ana llega con Marilla a la salita de los Barry.' },
      { quien: 'barry', dice: /Diana/, texto: 'La Sra. Barry las recibe y llama a Diana.' },
      { quien: 'diana', lugar: /Cuesta del Huerto/, texto: 'Diana entra a la salita.' },
      { quien: 'ana', dice: /amiga del alma/, texto: 'Ana le pregunta si podría ser su amiga del alma.' },
      { quien: 'diana', dice: /creo que sí/, texto: 'Diana dice que sí.' },
    ],
  },
];
