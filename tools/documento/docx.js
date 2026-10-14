// Genera docs/hitos-y-grafos.docx: node tools/documento/diagramas.js <dir> && node tools/documento/docx.js docs/hitos-y-grafos.docx <dir>
// (los diagramas, dibujados como SVG y fotografiados con Chromium; el texto, con la librería docx)
const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, LevelFormat, PageOrientation, Footer, PageNumber } = require('docx');
const DIR = process.argv[3] || '.';
const img = (f, wpx) => { const b = fs.readFileSync(DIR + '/' + f), w = b.readUInt32BE(16), h = b.readUInt32BE(20); return new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 60 }, children: [new ImageRun({ type: 'png', data: b, transformation: { width: wpx, height: Math.round(wpx * h / w) } })] }); };
const pie = t => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: t, italics: true, size: 18, color: '5A5248' })] });
const H1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const H2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
// párrafo con **negritas** y `código`
const rich = (t, o = {}) => t.split(/(\*\*[^*]+\*\*|`[^`]+`)/).filter(Boolean).map(s => s.startsWith('**') ? new TextRun({ text: s.slice(2, -2), bold: true, ...o }) : s.startsWith('`') ? new TextRun({ text: s.slice(1, -1), font: 'Consolas', size: 19, color: '7A4A1A', ...o }) : new TextRun({ text: s, ...o }));
const P = t => new Paragraph({ spacing: { after: 120 }, children: rich(t) });
const B = (t, lvl = 0) => new Paragraph({ numbering: { reference: 'vi', level: lvl }, spacing: { after: 60 }, children: rich(t) });
let NUM = 'num1'; const N = t => new Paragraph({ numbering: { reference: NUM, level: 0 }, spacing: { after: 60 }, children: rich(t) });
const code = lines => lines.map((l, i) => new Paragraph({ shading: { type: ShadingType.CLEAR, fill: 'F4EFE4' }, spacing: { before: i ? 0 : 80, after: i === lines.length - 1 ? 160 : 0 }, indent: { left: 200 }, children: [new TextRun({ text: l || ' ', font: 'Consolas', size: 18 })] }));
const borde = { style: BorderStyle.SINGLE, size: 4, color: 'B8B0A0' };
function tabla(cols, filas, ancho = 9026){
  const tot = cols.reduce((a, c) => a + c[1], 0), w = cols.map(c => Math.round(c[1] / tot * ancho)); w[w.length - 1] += ancho - w.reduce((a, b) => a + b, 0);
  const celda = (t, i, head) => new TableCell({ width: { size: w[i], type: WidthType.DXA }, borders: { top: borde, bottom: borde, left: borde, right: borde }, shading: head ? { type: ShadingType.CLEAR, fill: 'E8E0CC' } : undefined, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ children: rich(t, { size: 19, bold: head || undefined }) })] });
  return new Table({ width: { size: ancho, type: WidthType.DXA }, columnWidths: w, rows: [new TableRow({ tableHeader: true, children: cols.map((c, i) => celda(c[0], i, true)) }), ...filas.map(f => new TableRow({ children: f.map((t, i) => celda(t, i)) }))] });
}
const esp = () => new Paragraph({ spacing: { after: 120 }, children: [] });
const A4 = { width: 11906, height: 16838 }, M = { top: 1134, bottom: 1134, left: 1134, right: 1134 };
const footer = { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ['Avonlea · los hitos y los grafos · ', PageNumber.CURRENT], size: 16, color: '8A8278' })] })] }) };
const vert = ch => ({ properties: { page: { size: A4, margin: M } }, footers: footer, children: ch });
const horiz = ch => ({ properties: { page: { size: { ...A4, orientation: PageOrientation.LANDSCAPE }, margin: M } }, footers: footer, children: ch });

const s1 = [
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600, after: 120 }, children: [new TextRun({ text: 'Avonlea', size: 56, bold: true, font: 'Georgia', color: '3D2A1A' })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 480 }, children: [new TextRun({ text: 'El motor, las cadenas del libro y las habilidades, explicados con dibujos', size: 26, italics: true, font: 'Georgia', color: '5A5248' })] }),
  H1('1. El motor'),
  P('Todo lo que pasa en Avonlea sale de **tres componentes**, y cada uno sigue un modelo conocido de la narrativa interactiva (sección 6):'),
  B('**El estado**: lo que es cierto del mundo. **Hechos** (algo que pasó, con el día; o algo que alguien sabe), **cualidades** (números con dueño: la granja de Ana, el estudio de Gilbert, el afecto de Diana hacia Ana) y el **tiempo** (hora, día, estación).'),
  B('**Las escenas** (`src/datos/guion.txt`): piezas de historia con **precondiciones** (dónde, quiénes, qué tiene que ser cierto), **contenido** (el diálogo) y **efectos** (dejan hechos, suman a cualidades, le encargan una meta a alguien). Las rutinas son escenas que se repiten.'),
  B('**El planificador**: el «cómo». Cuando una escena le encarga una meta a un personaje («Ana está en La Cuesta del Huerto»), busca con A* las acciones para cumplirla. Las acciones de cualquier personaje también cambian el estado.'),
  P('**El cuaderno** (📖, `src/datos/cuaderno.txt`) no es parte del motor: lee el estado y le muestra al jugador las metas, con pistas, para que se guíe.'),
  img('capas.png', 640), pie('Figura 1. El motor: el estado, las escenas que lo leen y lo cambian, y el planificador que cumple lo que las escenas encargan.'),
  tabla([['Se escribe', 4], ['Significa', 6]], [
    ['`hecho:prohibida`, `!hecho:crup`', 'pasó (o no) ese hecho'],
    ['`dias_desde:prohibida:2`', 'pasaron al menos 2 días desde ese hecho'],
    ['`sabe:marilla:diana_borracha`', 'Marilla sabe ese hecho (alguien se lo contó)'],
    ['`granja:ana>=15`, `estudio:gilbert<30`', 'una cualidad de alguien, comparada con un número'],
    ['`afecto:diana:ana>=4`', 'el afecto de Diana hacia Ana (de 0 a 5)'],
    ['`estacion:verano`, `dia_estacion:1`', 'el tiempo'],
    ['`hecho x`, `olvidar x`, `contar marilla x`', 'efectos sobre los hechos'],
    ['`suma granja:ana 2`, `suma afecto:diana:ana -1`', 'efectos sobre las cualidades'],
    ['`meta ana estar_en h:os`', 'un encargo: una meta que el planificador cumple'],
    ['`grande`', 'la escena empieza algo grande del libro: como mucho una por día (el ritmo)'],
  ]),
  H1('2. Las cadenas del libro, como grafo'),
  P('Cada cadena es un **grafo**: los nodos son escenas, metas o cosas que hace el jugador, y las flechas dicen qué viene después y con qué condición («al día siguiente», «sentadas al té»…). Las flechas **verdes** abren algo; las **rojas punteadas** lo cierran; las de **puntos** son otro camino posible.'),
  tabla([['Color del nodo', 2], ['Qué es', 5], ['Ejemplo', 4]], [
    ['Azul', 'Lo que hace el jugador (desde un menú)', '«Contarle a Marilla que quieres una amiga»'],
    ['Amarillo', 'Una escena del guion: pasa sola cuando se cumplen sus condiciones', '`te_grosella`: el «cordial» era vino'],
    ['Verde', 'Una meta del cuaderno', '«Tener una amiga del alma»'],
    ['Lila', 'La agenda: alguien va a algún lado a cierta hora', 'Marilla lleva a Ana a La Cuesta del Huerto'],
    ['Rojo', 'Una prohibición: cierra cosas mientras dura', '`prohibida`: la Sra. Barry prohíbe la amistad'],
  ]),
];
const s2 = [
  H2('2.1 Diana: la amistad, la prohibición y el perdón'),
  img('diana.png', 930), pie('Figura 2. La cadena de Diana (cap. 8 a 19).'),
];
const s3 = [
  P('Cómo se lee la figura 2, paso a paso:'),
  N('Ana le cuenta a Marilla que quiere una amiga del alma (desde el menú de Marilla).'),
  N('**Al día siguiente**, entre las 14:00 y las 17:30, Marilla la lleva a La Cuesta del Huerto; la Sra. Barry llama a Diana y se conocen (`conoce_diana`).'),
  N('Si se cruzan antes por casualidad (`diana_por_casualidad`), se conocen igual, pero se quieren menos: para jurar amistad tienen que **pasar tiempo juntas** (afecto 4).'),
  N('Juradas amigas, se abren: el **broche** de amatista (y con él el picnic), el club de cuentos, el bote, el desafío de Josie, la **invitación al té** y, después de dos días de amigas, la **cama de la tía Josephine** (y las cartas a ella).'),
  N('En el té, sentadas a la mesita, el «cordial» resulta ser vino (`te_grosella`). **Al día siguiente**, la Sra. Barry prohíbe la amistad (`prohibida`): mientras dure, se cierra todo lo que se hace con Diana.'),
  N('**Dos días después, de noche**, Diana corre a Tejas Verdes: Minnie May tiene crup (`crup_aviso`). Corren juntas; Ana la salva (`crup_salva`), la Sra. Barry pide perdón y la prohibición se levanta.'),
  esp(),
  tabla([['Escena', 3], ['Dónde', 2.5], ['Cuándo (condiciones)', 6], ['Qué deja', 3.5]], [
    ['`barry_recibe`, `conoce_diana`', 'La Cuesta del Huerto', 'Ana contó que quiere una amiga; Marilla la trajo', '`conocidas_diana`, afecto 4 y 5'],
    ['`broche`', 'Tejas Verdes, con Marilla', 'son amigas del alma', '`broche` (abre el picnic)'],
    ['`te_grosella`', 'Tejas Verdes', 'Ana y Diana sentadas a la mesita del té', '`diana_borracha`; Diana se va a su casa'],
    ['`prohibida`', 'Tejas Verdes, con Marilla', 'un día después del vino', '`prohibida`; Diana triste'],
    ['`crup_aviso`', 'Tejas Verdes', 'dos días después de la prohibición, de 18:30 a 22:00', '`crup`; las dos corren a La Cuesta del Huerto'],
    ['`crup_salva`', 'La Cuesta del Huerto', 'después del aviso', '`perdonada`; se olvida la prohibición'],
    ['`cama_josephine`', 'La Cuesta del Huerto, con Diana', 'amigas hace 2 días, sin prohibición, no el día del perdón', '`cama_josephine` (abre las cartas)'],
  ]),
];
const s4 = [
  H2('2.2 La escuela, Gilbert, los Allan y el pelo'),
  img('escuela.png', 930), pie('Figura 3. Las cadenas más cortas: la escuela y Gilbert, los Allan y el pastel con linimento, y el pelo verde.'),
];
const s5 = [
  B('**«¡Zanahorias!»**: la primera vez que Ana entra a la escuela con Gilbert adentro, él le dice «¡Zanahorias!» y ella le parte la pizarra en la cabeza. Desde ahí Ana no le habla, y se abre «Hacer las paces con Gilbert».'),
  B('**Los Allan**: después de ir a la escuela dominical, Marilla los invita; **al día siguiente** viene la Sra. Allan y, **cuando se sienta**, Ana sirve el pastel… con linimento. Esa escena abre el té en la casa parroquial.'),
  B('**El pelo**: teñirse el pelo (queda verde) abre «Librarse del pelo verde».'),
  H1('3. Las habilidades y sus hitos'),
  P('Las cadenas pasan una vez. Lo que se gana de a poco son **habilidades**: cualidades (números con dueño) que suben con lo que cada uno hace, como en Princess Maker o Stardew Valley. Las tiene cualquier personaje (Gilbert también estudia), pero los hitos son de Ana. Lo que Ana hace cada día lo hace subir, y lo que ella elija hacer (estudiar, ayudar en la granja, escribir) decide hacia dónde crece.'),
  img('hito.png', 640), pie('Figura 4. De lo que Ana hace a lo que alguien le dice.'), ...((NUM = 'num2'), []),
  N('Ana hace algo unos minutos (o pasa una hora en clases): **+1** en cada habilidad que tenga esa acción, una vez al día por acción y **como mucho 2 por día** en cada habilidad.'),
  N('Si el número cruza un **hito**, sale un aviso (📈) y el hito queda pendiente.'),
  N('La próxima vez que Ana se encuentra con la persona del hito, esa persona se lo dice: con la IA encendida, en una escena improvisada a partir de una indicación; sin IA, con la línea escrita.'),
  N('Dicho el hito, queda el hecho `hito_<habilidad>_<n>`. El guion puede tener escenas para cualquier nivel (`si: granja:ana>=15`).'),
  img('caminos.png', 640), pie('Figura 5. Las tres habilidades de partida, con los hitos de Ana y quién se los dice.'),
  tabla([['Habilidad', 3], ['Hito', 1], ['Quién se lo dice', 2.4], ['Lo que dice (sin IA)', 7]], [
    ['El estudio', '10', 'la Srta. Stacy', '«Ana, vas a dar el examen de Queen\'s con los demás. Tienes cabeza; ahora, constancia.»'],
    ['', '30', 'Marilla', '«La Srta. Stacy dice que vas bien. No te llenes de humo, pero… vas bien.»'],
    ['', '60', 'Gilbert', '«Dicen que tú y yo vamos parejos para Queen\'s. Que gane el mejor, Ana.»'],
    ['La granja', '5', 'Marilla', '«Ana, ya sabes dónde va cada cosa en esta cocina. Así se aprende a llevar una casa.»'],
    ['', '15', 'Matthew', '«Bueno, pues… es para ti, Ana. Un vestido. Con… con las mangas esas, abullonadas.»'],
    ['', '30', 'Marilla', '«Ana… no sé qué haríamos sin ti. Esta casa es tan tuya como mía.»'],
    ['Las letras', '5', 'Diana', '«Ana, tus cuentos son mejores que los de los libros. ¡De verdad!»'],
    ['', '15', 'la Srta. Stacy', '«Leí tu composición en voz alta en la clase. Tienes un don. Pero cuida las comas.»'],
    ['', '30', 'la Sra. Allan', '«¿Has pensado en mandar uno de tus cuentos a una revista? Yo lo leería.»'],
  ]),
  H2('3.1 El calendario y el examen de Queen\'s'),
  img('calendario.png', 640), pie('Figura 6. Un año del juego y el examen de Queen\'s, que sale de la habilidad del estudio.'),
  P('Cada estación dura **14 días** (un año, 56). No hay clases los domingos ni en verano. El **primer día de cada verano**, en la cocina con Marilla, es el examen: si Ana tiene menos de 10 en el estudio no la mandan todavía; con 10 a 29 no alcanza (y hay otro examen al verano siguiente); con 30 entra; con 60, queda primera, empatada con Gilbert.'),
  P('Con todo el esfuerzo (2 por día de clases), 30 se alcanza en la primera primavera, antes del primer examen; 60 toma casi un año.'),
  H1('4. Cómo agregar más'),
  H2('Una habilidad o un hito'),
  P('Basta con escribir en `src/datos/habilidades.txt` (a mano, o pidiéndoselo a una IA). Por ejemplo:'),
  ...code(['=== granja ===', 'titulo: La granja de Tejas Verdes', 'suma: quehacer, ordeñar, alimentar, sembrar, regar, batir', 'por_dia: 2', 'hito 15: Matthew le regala un vestido con mangas abullonadas.', '  con: matthew', '  dice: Bueno, pues… es para ti, Ana. Un vestido.', '  ia: Matthew, muy tímido, le regala a Ana un vestido con mangas abullonadas.']),
  H2('Una cadena del libro'), ...((NUM = 'num3'), []),
  N('En el guion, una escena por paso: dónde (`en: ana=gg, marilla=gg`), cuándo (`si: hecho:x, dias_desde:x:1, estudio:ana>=30…`); si empieza algo grande del libro, `grande` y qué deja (`al_terminar: hecho y`).'),
  N('En el cuaderno, la meta con `requiere:` (hechos u otras metas), `antes:` (cómo se dice lo que falta) y `acciones:` (lo que queda cerrado mientras tanto).'),
  N('Si alguien tiene que ir a algún lado a cierta hora, una entrada de agenda.'),
  N('Una meta de prueba, sus pasos esperados en la auditoría, y **leer el relato a mano**.'),
  H1('5. Cómo se comprueba'),
  B('Cada cadena y cada hito tiene una **meta de prueba**: el juego la juega solo, y el **relato** (lo que el juego cuenta que pasó, línea a línea) se compara con lo que debería pasar (`trazas/auditoria.md`).'),
  B('Además, el relato se **lee a mano**: así aparecieron cosas que las comparaciones automáticas no ven, como la tía Josephine hablando de la cama antes de la cama, o Diana parándose a charlar mientras corría a pedir ayuda por el crup (`trazas/lectura.md`).'),
  B('**El grafo se revisa solo** con cada build (`tools/grafo.js` → `trazas/grafo.md`): avisa si una escena o una meta pide un hecho que nada deja (nunca podría pasar), si una condición está mal escrita (una clave o una cualidad que no existe), y qué hechos se dejan sin que nada los lea. Es lo que hace seguro agregar escenas escritas por una IA.'),
  B('Estado actual: ESTADO_ACTUAL'),
  H1('6. El estado del arte'),
  P('El motor sigue modelos conocidos de la narrativa interactiva, y toma sus nombres:'),
  tabla([['En Avonlea', 3], ['Modelo', 3.2], ['Dónde viene', 5]], [
    ['El estado: hechos y cualidades', 'Quality-based narrative', 'Failbetter (Fallen London, StoryNexus): el mundo es un diccionario de cualidades, números que las escenas leen y cambian.'],
    ['Las escenas', 'Storylets', 'Kreminski y Wardrip-Fruin, «Sketching a Map of the Storylets Design Space» (ICIDS 2018): piezas de historia con precondiciones y efectos, «como teselas de un mosaico».'],
    ['Gana la escena más específica', 'Reglas de diálogo por especificidad', 'Elan Ruskin, Valve (Left 4 Dead), GDC 2012: miles de líneas con condiciones; gana la que cumple más, y las generales quedan de respaldo.'],
    ['El ritmo: una escena grande por día', 'Drama manager', 'Mateas y Stern, Façade (2003), que ordena las escenas según la tensión; el narrador de RimWorld, que decide cuándo pasa algo grande.'],
    ['El planificador', 'GOAP (planificación por metas)', 'Jeff Orkin, F.E.A.R. (GDC 2006): acciones con precondiciones y efectos, y A* para el «cómo».'],
    ['Quién sabe qué', 'Conocimiento por personaje', 'Versu (Evans y Short) y las reglas de Valve: cada personaje sabe lo suyo; contar algo es un efecto.'],
  ], 9638),
  P('**Lo que queda por hacer**, del mismo estado del arte:'),
  B('**Prácticas sociales** (Versu): las actividades de varios personajes (el té, la cena, el picnic) como estructuras con roles. Hoy el té es un caso especial.'),
  B('**La agenda como escenas que se repiten**: hoy la agenda de los personajes está en el código; pasarla al guion la dejaría en el mismo formato que lo demás.'),
  B('**Cualidades que bajan solas** (el afecto que se enfría): bastaría un efecto en una rutina diaria.'),
];
const doc = new Document({
  creator: 'Avonlea', title: 'Avonlea: los hitos y los grafos',
  styles: { default: { document: { run: { font: 'Georgia', size: 21 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 32, bold: true, color: '3D2A1A', font: 'Georgia' }, paragraph: { spacing: { before: 360, after: 160 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 25, bold: true, color: '5A3A1A', font: 'Georgia' }, paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
    ] },
  numbering: { config: [
    { reference: 'vi', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 500, hanging: 260 } } } }, { level: 1, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 900, hanging: 260 } } } }] },
    ...['num1', 'num2', 'num3'].map(r => ({ reference: r, levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 500, hanging: 300 } } } }] })),
  ] },
  sections: [vert(s1), horiz(s2), vert(s3), horiz(s4), vert(s5)],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(process.argv[2], b); console.log('ok'); });
