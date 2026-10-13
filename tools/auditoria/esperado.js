// What should happen in each action, as a tale and as steps that can be checked against the account of the game
// (the relato: src/js/66-relato.js). Each step: who, and what must be seen of her at some moment, in order:
//   lugar / junto (where), postura, accion, lleva (in her arms), objeto (at hand), tiene (what she owns), pelo, dice;
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
      { quien: 'ana', junto: /tienda|correo/, texto: 'Va al correo (en la tienda de Lawson).' },
      { quien: 'ana', tiene: /^(?![\s\S]*carta)/, texto: 'La deja: ya no la tiene.' },
    ],
  },
  {
    id: 8, titulo: 'La compota de Marilla', quienes: ['marilla', 'ana'],
    relato: 'Marilla quiere hacer compota para el invierno, pero no tiene manzanas: se las pide a Ana. Ana va a los manzanos, recoge las manzanas y se las lleva a Marilla a la cocina. Marilla las pela y las cuece en la estufa, removiendo, una media hora o más. Al final tiene la compota.',
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
];
