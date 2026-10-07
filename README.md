# Un día en Avonlea

Un juego tranquilo de mundo abierto, sin misiones, inspirado en *Ana de las Tejas Verdes* (L. M. Montgomery, 1908, de dominio público). Ana vive en **Tejas Verdes** con **Matthew** y **Marilla**, visita a su amiga del alma **Diana** en **La Cuesta del Huerto**, riega la huerta, cocina, acaricia a **Toby** y pasa los días como quiere, a lo largo de las cuatro estaciones.

Todo el juego es un solo archivo, [`index.html`](index.html): se abre en el navegador, en el computador o en el celular, sin instalar nada.

![Un día en Avonlea](docs/avonlea.png)

## Cómo jugar

- **Abrir:** descarga `index.html` y ábrelo en el navegador.
- **Moverse:** flechas o WASD (con Shift, más rápido); o toca el suelo y Ana va hasta allí (rodea los obstáculos). En el celular, también puedes arrastrar el dedo.
- **Hacer cosas:** toca (o haz clic en) la persona o el objeto: si Ana está cerca, lo hace al instante; si no, camina hasta allí y lo hace al llegar. Toca a Ana para dejar lo que lleva (la regadera, una taza...) o tomarse el té que preparó. Con el ratón, una etiqueta nombra lo que hay bajo el puntero. Espacio, E o Enter hacen lo de más cerca.
- **Ana por su cuenta:** si no tocas nada durante unos 15 segundos, Ana hace lo suyo: la IA elige entre lo que puede hacer (regar, recoger bayas, acariciar a Toby, cocinar, ir a conversar con alguien, visitar una casa, pasear, soñar despierta, irse a dormir de noche...) y lo dice en voz alta; sin IA lo elige el juego. Lo hace sin apuro: pasea despacio, se detiene a mirar a su alrededor y se queda un buen rato en cada cosa antes de decidir la siguiente. Cualquier tecla o toque te devuelve el control (se puede desactivar en ✒).
- **Decir algo:** Enter o T (o el botón 💬) abren una línea para escribir lo que dice Ana. Los demás reaccionan, y la IA entiende si es una despedida («tengo que irme») o un destino («voy a la huerta»): la charla se corta y Ana se va. Caminar también interrumpe una conversación.
- **Charlas:** los personajes conversan solos en globitos cuando Ana pasa cerca (y Ana también habla: no hay que elegir qué dice). Con Espacio sobre alguien, la charla es con ella; al final solo se decide lo importante (aceptar un encargo, regalar, pasear). Espacio o un toque saltan una frase; Esc sale.
- **Mapa:** M o el botón 🗺.
- **Diálogos con IA:** el botón ✒ (ver más abajo). Las charlas están pensadas para la IA; sin clave solo dicen unas frases escritas.

La partida se guarda sola en el navegador: lo que lleva Ana, lo que creció en la huerta, el cariño de cada uno (♥), el día y la estación.

## Qué se puede hacer

- **Acariciar a Toby**, el perro, que anda a su aire: trota alrededor de Ana, se va a husmear arbustos, árboles, la bomba o a ver quién anda por ahí (hasta unos 450 pasos), y vuelve corriendo si ella se aleja.
- **Regar la huerta:** toma la regadera en la bomba y riega los seis canteros. Cada uno crece hasta florecer (rosas, girasoles, lilas), y las flores se cortan para hacer ramos.
- **Recoger** bayas de los arbustos y manzanas del huerto de los Barry, en verano y otoño.
- **Cocinar** en la cocina de Tejas Verdes: tarta de bayas, compota de manzana o té.
- **Conversar y regalar** a Matthew, Marilla, Diana, la Sra. Barry y la Sra. Lynde, que le van tomando cariño.
- **Visitar a Diana** en La Cuesta del Huerto, **tomar el té** con ella en el sofá de la salita (con cordial de frambuesa, esta vez bien etiquetado), **calentarse junto al fuego** o **salir a pasear juntas**.
- **Subir a su pieza** por la escalera de la cocina: el cuarto del alero este, de paredes blancas, con la cama angosta, el espejo, el vestido marrón de mangas abullonadas y, por la ventana, el cerezo **Reina de las Nieves**. Por la noche Ana dice que tiene sueño; en su cama puede **dormir** (desde las 20:00) y el día empieza de nuevo al amanecer. Si pasa de las 2 de la mañana, se queda dormida sola.
- **Recostarse en el pasto** a mirar las nubes (tocando a Ana, o por su cuenta): si Diana va con ella, se recuesta a su lado; a veces Diana lo hace sola en su jardín.
- **Sentarse** en la banca del **Lago de las Aguas Brillantes**.
- Visitar a la **Sra. Rachel Lynde** en su casa de la Hondonada, junto al arroyo: teje junto a la ventana desde donde ve pasar a todo el mundo.
- Pasear por el **Camino Blanco de las Delicias** y el **Bosque Encantado**.

## La historia de cada día y quién quiere a quién

- **Una historia por día:** cada mañana la IA escribe un pequeño episodio inspirado en los libros o en la serie (el cordial de frambuesa, el broche de amatista, el Bosque Encantado...), adaptado a lo que el juego puede hacer: unas escenas con hora, lugar y quiénes están. Los personajes van solos a su lugar; arriba a la izquierda aparece la pista (📖) y, cuando Ana llega, la escena se juega. Si en ella alguien le pide algo, tú decides. Sin IA, el juego elige entre unas historias escritas a mano.
- **La rama principal es flexible:** es lo que pasaría más o menos si nadie fuerza nada. Cada escena sabe qué necesita que haya pasado antes (`requiere`), así que una cadena puede adelantarse o atrasarse: si Ana atrapa la vaca temprano, el Sr. Shearer aparece temprano. Las escenas de relleno se pueden perder sin que importe (queda un vacío y la historia sigue); si algo pasa por su cuenta antes de su escena, cuenta como hecho («antes de tiempo»). Mientras tanto, los personajes saben lo que ha pasado en la historia y lo comentan en sus charlas.
- **Las ramas:** si una escena *clave* ya no puede pasar (Ana no llegó, no pasó lo que tenía que pasar, o pasó algo en contra, como decirle «Mejor no» al Sr. Shearer), la historia se abre en otra rama 🌿: la IA escribe cómo sigue el día desde lo que de verdad ocurrió (dónde está cada uno, qué pasó, qué iba a pasar). Sin IA, usa las ramas escritas a mano de la historia, o sigue la rama principal sin lo que dependía de esa escena. Como mucho tres desvíos por día; el panel 👥 muestra por dónde fue.
- **Quién quiere a quién (👥):** un grafo con todos los personajes y Ana; cada flecha guarda cuánto cariño le tiene uno al otro (0 a 5) y una nota. Empieza como en el libro y cambia: cada noche la IA repasa el día, ajusta las relaciones que lo merecen y deja una impresión duradera a quien vivió algo importante. Todos lo usan al conversar.
- **Historias escritas a mano:** en el panel 👥 se puede elegir una para el día siguiente, por ejemplo «La vaca del señor Harrison» (de *Ana de Avonlea*): con Marilla y Matthew en el pueblo, Ana persigue una vaca por la avena del Sr. Harrison, se la vende al Sr. Shearer... y descubre que Dolly estaba en el corral.
- **Pasar al día siguiente (⏭):** salta la noche: Ana despierta en su cama, la noche se repasa y se escribe la historia del nuevo día.

## Rutinas

Los personajes se mueven con horarios: **Matthew** entra a la cocina de Tejas Verdes a comer (hacia las 7, las 12 y las 18) y está con Marilla; la **Sra. Lynde** teje en su casa por la mañana y por la tarde visita a Marilla (un día) o a la Sra. Barry (al otro), caminando por los caminos. Cuando coinciden, conversan entre ellos y Ana puede quedarse escuchando.

## Las estaciones

Un día dura 60 minutos: la mañana, una tarde dorada y una noche con ventanas encendidas y luciérnagas. Cada estación dura dos días.

- **Primavera:** manzanos y cerezos en flor, y pétalos en el aire.
- **Verano:** bayas, manzanas y luciérnagas.
- **Otoño:** árboles rojos y dorados, hojas cayendo y más humo en las chimeneas.
- **Invierno:** nieva, el lago y el arroyo se congelan, la huerta duerme bajo la nieve y todos andan con bufanda.

El mapa tiene un botón «Siguiente estación (prueba)» para verlas sin esperar.

![Las estaciones y la casa de Diana](docs/avonlea-estaciones.png)

| El mapa | En el celular |
|---|---|
| ![Mapa](docs/mapa.png) | ![Celular en invierno](docs/celular-invierno.png) |

## Diálogos con IA (opcional)

Con el botón **✒** se activan:

1. Elige el modelo. Por defecto es **GPT-5.4 mini** de OpenAI; también están Claude Opus 5.5, Sonnet 5.5 y Haiku 4.5 de Anthropic.
2. Pega **tu propia clave** de la API. Si falta, el juego la pide al conversar.

La clave se guarda solo en tu navegador y se envía directamente a `api.openai.com` o `api.anthropic.com`. No está en el archivo, así que el juego se puede compartir sin peligro. Eso sí, no compartas tu navegador con la clave puesta. Sin IA, o si falla, los personajes usan sus frases escritas.

Con la IA activada:

- **Conversaciones:** cada personaje habla con su voz: Matthew tímido, con su «Bueno, pues…»; Marilla seca pero cariñosa; Diana dulce y un poco miedosa; la Sra. Barry correcta y estirada. Cada respuesta ofrece dos o tres cosas que Ana puede decir.
- **Memoria propia:** cada personaje sabe solo lo que vio (estaba cerca o en la misma casa), lo que le hicieron a él, lo que le contaron en su casa y lo que conversó con Ana. Matthew y Marilla, y Diana y su madre, se cuentan las novedades cada mañana.
- **Encargos:** los personajes pueden pedirle cosas a Ana:
  - llevarle bayas o manzanas a alguien;
  - regar canteros;
  - cocinar algo;
  - llevarle un recado a otro personaje;
  - ir a un lugar.

  Ana los acepta o no. El juego comprueba solo cuándo están hechos, y quien lo pidió se lo agradece. Los pendientes se ven en la nota 📜.
- **Lo que hace cada uno:** Matthew va a lugares, busca a Ana, riega y le regala manzanas o bayas. Marilla cocina (y deja la tarta en la mesa) y riega. Diana va a lugares, busca a Ana, la acompaña y le regala cosas. La Sra. Barry regala manzanas o compota. Un **!** sobre alguien indica que tiene algo para Ana.
- **Planes:** cada mañana, y cuando pasa algo, la IA hace el plan del día de cada personaje con lo que puede hacer, y el juego lo cumple a su hora. Pasa algo cuando llega una estación, Ana le hace un regalo, cumple un encargo o le trae un recado.
- **Ver recuerdos** (en el panel ✒) muestra el plan de hoy, lo que sabe y lo que recuerda cada uno, los encargos y el diario de Ana.

La IA solo puede hacer lo que el juego permite. Cada encargo, regalo y paso del plan se revisa contra las reglas (quién puede hacer qué, la estación, qué se puede conseguir), y lo que no corresponde se descarta. Por eso lo que escribe la IA nunca rompe la partida.

| Ajustes de la IA | Matthew busca a Ana según su plan |
|---|---|
| ![Ajustes](docs/ia-ajustes.png) | ![Plan de Matthew](docs/plan-matthew.png) |

## Cómo está hecho

- **Un solo archivo** HTML con JavaScript, sin bibliotecas ni herramientas de compilación, dibujado en un `<canvas>`.
- **Falso 3D:** vista desde arriba y de frente. Todo se dibuja en el orden de sus pies, así que se pasa por detrás de los árboles y las casas.
- **Dibujo a mano:**
  - líneas de lápiz que tiemblan un poco y "hierven" (se redibujan unas veces por segundo, como en la animación dibujada);
  - colores de acuarela que no calzan del todo con la línea;
  - sombreado con rayitas;
  - textura de papel encima.
- **Interiores:** la cocina de Tejas Verdes y la salita de La Cuesta del Huerto.
- **IA:**
  - el juego le arma a la IA el estado de cada personaje como texto;
  - pide respuestas en un formato JSON fijo (conversación, encargo, acción o plan);
  - valida cada cosa antes de aplicarla.

  Las instrucciones fijas (el mundo y los personajes) van primero para que el proveedor las guarde en caché y cada conversación salga más barata.

## Ideas para seguir

- Que la IA resuma los recuerdos viejos de cada personaje en vez de borrarlos.
- Eventos especiales: un picnic en el lago, la visita de la Sra. Rachel Lynde, la escuela.
- Más lugares y personajes: Gilbert Blythe, la señorita Stacy, la iglesia.
- Un servidor intermediario para jugar con IA sin que cada uno ponga su clave.

## Créditos

Inspirado en *Ana de las Tejas Verdes* de L. M. Montgomery (1908), de dominio público. Los dibujos y el código son propios del juego.

Empezó como un prototipo dentro de [boulder-duo](https://github.com/rilianx/boulder-duo).

## Para quien quiera agregar cosas al juego

Cada tipo de cosa tiene su registro en `index.html`; para agregar una, basta una entrada nueva, y el juego deriva el resto (el mapa, el prompt de la IA, los menús, las rutinas). Al cargar la página, la consola avisa si a una ficha le falta algo.

| Registro | Qué es | Ejemplo |
|---|---|---|
| `CHARACTERS` | personajes: aspecto, voz para la IA, frases, habilidades, dónde viven (`home`: una casa, `'out'` o `'away'` si viven fuera), su rutina, su carreta (`vehicle`), qué compran (`buys`) | el Sr. Harrison, el Sr. Shearer |
| `HOUSES` | casas: exterior, cartel, sendero, descripción para la IA y su interior (dibujo, muebles, colisiones, lo que se puede hacer dentro) | la granja del Sr. Harrison |
| `AREAS` | lugares cercados: campos y corrales, con su cerca y su portón | el campo de avena, el corral, el potrero |
| `ANIMALS` | animales: vacas (pastan, se escapan, se llevan de la cuerda, se venden) y loros (hablan) | Dolly, la vaca jersey, Ginger |
| `ITEM_DEFS` | lo que Ana puede llevar: nombre, ícono, estación, receta, cómo se regala | la tarta, el té, los dólares |
| `ANA_STATES` | cómo se ve Ana (los demás lo notan) | el vestido rasgado, el sombrero torcido |
| `STORY_EFFECTS`, `STORY_EVENTS` | piezas de las historias: lo que pasa al empezar o terminar una escena, y lo que el juego nota | alguien se va al pueblo, una vaca se escapa; vender una vaca, cocinar, regalar |
| `STORIES` | historias escritas a mano: escenas (con `id`, `requiere`, `clave`, `contra`, efectos, eventos y frases clave) y, si se quiere, `ramas` escritas a mano para cuando se desvía (`desde`: la escena clave que se rompió) | «La vaca del señor Harrison», con las ramas «Ana no vende la vaca» y «La vaca se queda en la avena» |

Diana, la compañera de Ana, y Toby son los únicos con movimientos escritos aparte (en `update()`).
