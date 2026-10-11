# Capítulo 1 del libro, simulado con metas

*(Generado con `node tools/trace_goal.js cap1 --out cap1.png`; la imagen (en webp) es [`trazas/cap1.webp`](../trazas/cap1.webp).)*

El capítulo I de *Ana de las Tejas Verdes* («La Sra. Rachel Lynde se sorprende»), con el viaje del capítulo II y el comienzo del III, jugado en el juego por el planificador (A\*) y las rutinas, sin IA. En el juego: panel 🎯 → **📖 Capítulo 1 del libro** (parte a las 14:54, justo antes de que salga Matthew; el telegrama de mediodía se da por recibido). Con 👁 se puede seguir a cualquiera (la Sra. Lynde, Matthew, Marilla…).

## 1. La agenda verdadera (solo del libro)

Sacada del texto (Gutenberg #45) momento por momento: quién, dónde, qué, y la cita que lo respalda. El libro da pocas horas exactas: las «15:30» de Matthew pasando por la hondonada, el tren de las 17:30, «el tren pasó hace media hora» (18:00) y el atardecer de junio. El resto (marcado con \*) está estimado a partir de esas anclas, de las distancias («un cuarto de milla», «ocho millas», «solo nos falta una milla») y de la luz («todavía no oscurecía del todo», «el sol se había puesto hacía rato»). Los datos están en `LIBRO1.verdad`, dentro de `index.html`.

## 2. La agenda simulada

Qué hace cada uno, como metas del planificador (lo que no es meta lo pone en marcha el controlador del capítulo, `cap1Tick`, a la hora del libro):

| Quién | Metas (en orden) |
|---|---|
| Matthew | `estar_en(granero, hasta 15:18)` → `estar_en(h:br)` (en la calesa: el planificador sabe que el camino toma 130 minutos) → **escena de la estación** → `llevar(Ana, cocina)` (sube a Ana a la calesa y vuelve) |
| Rachel | `estar_en(su casa, hasta 17:30)` (la ventana, el té) → `estar_en(cocina de Tejas Verdes)` → **escena con Marilla** (20 min) → `estar_en(casa de los Bell)` → **escena con los Bell** → `estar_en(su casa)` |
| Marilla | en la cocina; a las 17:00 pone la mesa para tres |
| Ana | llega en el tren de las 17:30, se sienta en las tejuelas a esperar; luego la lleva Matthew (`subir_calesa`, la sigue) |

Las escenas son los diálogos del libro (traducidos), cada una con su tiempo del libro: lo que no alcanza a decirse queda guardado para la próxima vez que esos personajes se encuentren (no se repite nada).

## 3. Comparación

**32/32 momentos del libro ocurren en la simulación**, en el mismo orden; diferencia media **3 min**, máxima **9 min**. (\* = hora estimada en el libro.)

| # | Libro | Simulación | Δ | Quién | Qué |
|---|---|---|---|---|---|
| 1 | 12:00* | 12:00 | = | Marilla | recibe el telegrama de la Sra. Spencer, que trae el cartero desde la estación: llegan en el tren de las 17:30 |
| 2 | 15:00* | 15:00 | = | Rachel | teje una colcha de algodón y vigila el camino principal |
| 3 | 15:00* | 15:00 | = | Thomas | siembra su semilla tardía de nabo |
| 4 | 15:20* | 15:20 | = | Matthew | sale de casa en la calesa con la yegua alazana, en vez de sembrar nabos en el campo rojo del arroyo |
| 5 | 15:30 | 15:26 | −4 min | Matthew | conduce la calesa con la yegua alazana, con cuello blanco y su mejor traje, rumbo a Bright River |
| 6 | 15:30 | 15:26 | −4 min | Rachel | ve pasar a Matthew arreglado y no logra adivinar adónde va; decide ir a Tejas Verdes después del té |
| 7 | 15:35* | 15:33 | −2 min | Matthew | trota tranquilo; solo sufre cuando tiene que saludar con la cabeza a las mujeres que se cruza |
| 8 | 17:00* | 17:00 | = | Marilla | pone la mesa para tres con loza de diario, mermelada de manzana silvestre y un solo tipo de queque, y se sienta a tejer |
| 9 | 17:15* | 17:15 | = | Rachel | toma el té |
| 10 | 17:30 | 17:33 | +3 min | Ana | baja del tren de las cinco y media con la Sra. Spencer, que la deja a cargo del jefe de estación |
| 11 | 17:30 | 17:33 | +3 min | Sra. Spencer | sigue viaje en el mismo tren hasta la estación de White Sands (solo mencionada) |
| 12 | 17:35* | 17:38 | +3 min | Ana | rehúsa entrar a la sala de espera de señoras: «hay más campo para la imaginación»; se sienta a esperar |
| 13 | 17:35* | 17:35 | = | Rachel | camina por el largo sendero lleno de surcos, criticando que vivan tan apartados |
| 14 | 17:40* | 17:39 | −1 min | Rachel | golpea la puerta de la cocina, entra y anota mentalmente la mesa puesta para tres |
| 15 | 17:40* | 17:39 | −1 min | Marilla | recibe a Rachel y le cuenta que Matthew fue a Bright River a buscar a un niño huérfano de Nueva Escocia |
| 16 | 18:00* | 18:01 | +1 min | Rachel | se va (para alivio de Marilla) rumbo a casa de Robert Bell a contar la noticia, hablándoles a los rosales silvestres |
| 17 | 18:00 | 18:03 | +3 min | Matthew | ata la yegua en el patio del hotel, pasa junto a la niña sin mirarla y se va a la estación |
| 18 | 18:00 | 18:03 | +3 min | jefe de estación | cierra la boletería para irse a cenar; le explica a Matthew que solo llegó una niña y se marcha a casa con hambre |
| 19 | 18:05* | 18:13 | +8 min | Matthew | camina hasta la niña; ella se presenta y él decide llevarla a casa y que Marilla aclare el error |
| 20 | 18:15* | 18:18 | +3 min | los Bell | recibe a Rachel, que cuenta la noticia de los Cuthbert |
| 21 | 18:15* | 18:21 | +6 min | Matthew | Ana y Matthew suben a la calesa; ella no suelta su bolso de alfombra; salen del pueblo |
| 22 | 18:25* | 18:26 | +1 min | Ana | arranca una rama de ciruelo silvestre que roza la calesa y empieza a hablar (la novia, el vestido de wincey, los caminos rojos...) |
| 23 | 19:00* | 19:00 | = | Matthew | le dice que puede hablar todo lo que quiera; descubre que le gusta su charla |
| 24 | 19:30* | 19:30 | = | Ana | le muestra su trenza: «¿De qué color diría que es esto?» —«Es rojo, ¿no?» |
| 25 | 19:45* | 19:44 | −1 min | Ana | enmudece de asombro bajo las flores, con el atardecer al fondo |
| 26 | 20:00* | 19:52 | −8 min | Matthew | cruzan el pueblo en silencio; perros que ladran, chicos que gritan y caras curiosas en las ventanas |
| 27 | 20:40* | 20:31 | −9 min | Matthew | rompe el silencio tras tres millas: «solo nos falta una milla»; Ana bautiza el Camino Blanco de las Delicias |
| 28 | 20:45* | 20:49 | +4 min | Ana | bautiza el Lago de las Aguas Brillantes; aún hay luz en una ventana de La Cuesta del Huerto; cruza el puente con los ojos cerrados |
| 29 | 20:55* | 21:00 | +5 min | Ana | adivina cuál es Tejas Verdes, bajo una gran estrella blanca; el sol ya se puso |
| 30 | 21:00* | 20:54 | −6 min | Rachel | ve pasar la calesa en la oscuridad |
| 31 | 21:05* | 21:03 | −2 min | Matthew | baja a Ana de la calesa; ella susurra que los árboles hablan en sueños; entran a la casa |
| 32 | 21:05* | 21:03 | −2 min | Marilla | sale al encuentro, ve a la niña de pelo rojo y pregunta dónde está el niño |

### Qué diferencias había y cómo se redujeron (agregando cosas)

| Diferencia en la primera simulación | Qué se agregó |
|---|---|
| Matthew no encontraba plan para ir a la estación (el viaje de 130 min hacía que el A\* probara todo lo demás antes) | la heurística de `estar_en` y `llevar` cuenta el camino largo (`roadMin`) |
| Matthew llegaba a la estación y se volvía solo (su rutina) antes de hablar con el jefe | las escenas escritas sujetan a quienes hablan (`hold`) |
| Rachel no lo veía pasar: sin nadie mirando, la calesa iba en línea recta | la calesa va siempre por los caminos (`netRoute`), pasando frente a la ventana de Rachel |
| la conversación con Marilla duraba más de una hora | cada escena tiene el tiempo que le da el libro (20 min); el resto queda para otra visita |
| Ana se bajaba sola del andén (su modo «hace lo suyo») | durante el capítulo espera a Matthew |
| la llegada (¿dónde está el niño?) quedaba en cola detrás de la charla del camino | al llegar a la puerta, la charla del viaje termina |
| el lago y «¿es ésa Tejas Verdes?» salían después de llegar | se dicen en el camino, en el orden del libro (colina → laguna → Tejas Verdes) |
| no había estación en el tren ni jefe de estación | el tren entra a las 17:30 y sigue a White Sands; el jefe de estación (nuevo personaje) |

Diferencias que quedan (de la geografía del juego, no del planificador): el camino entra a Avonlea por el noroeste, así que la última milla (20:31 → 21:03) pasa por la aldea y la hondonada de Lynde; Newbridge queda unos minutos antes que en el libro porque el tramo de «tres millas de silencio» es largo.

## 4. El camino de Bright River

Ya no está en el mapa de Avonlea: en el borde noroeste hay un **letrero** («Bright River · 8 millas»); a pie Ana no va. En la calesa (con Matthew, o en la carreta desde el granero) se entra a **una escena propia**: la calesa queda al centro y el paisaje pasa, tramo por tramo, en el orden del capítulo II: Bright River, la cuesta de los cerezos silvestres, las granjas de los manzanos, el bosquecillo de abetos, la hondonada de los ciruelos, la colina sobre el golfo (se ve el mar), las granjas de arces, el aserradero, los campos arados, la iglesia de la loma, el puentecito de los sauces, la curva del atardecer, **la Avenida** (el túnel de manzanos en flor), **Newbridge**, tres millas de silencio, y la entrada de Avonlea. Hay mojones con las millas y un letrero por tramo.

- **Sin apurar el tiempo**: 130 minutos del juego (unos 5 minutos y medio reales), como en el libro; abajo, botones **1× · 1.5× · 2× · 3×** para acelerar mientras se viaja.
- **🗺 La isla**: un mapa grande con solo los pueblos (Avonlea, White Sands, Spencervale, Newbridge, Carmody, Bright River, Charlottetown, Hopeton), los caminos y el tren, y dónde va Ana.
- Los personajes del planificador también viajan por él (`where: 'camino'`, `roadS` de 0 = estación a 1 = Avonlea).

## 5. Cómo funcionan los diálogos

Hay cinco fuentes, de la más escrita a la más libre:

1. **Escenas del libro** (`talkPlay`): diálogos fijos, traducidos del libro (Rachel y Marilla, Rachel y los Bell, la estación, la llegada). Se juegan a su hora, con un tiempo máximo; sujetan a quienes hablan.
2. **La charla del viaje**: unas 120 líneas del libro repartidas en los 11 tramos del camino, más 30 ocurrencias de Ana. Cada tramo dice las suyas mientras dura (unas 2 o 3); la próxima vez sigue donde quedó (`game.dlgUsed`), así que en varios viajes se escucha todo **sin repetir**; cuando se acabó todo, vuelve a empezar. En la Avenida y Newbridge, Ana calla (como en el libro).
3. **Banco de diálogos para pares y tríos** (`DLG_BANK`): cuando dos personajes del planificador se encuentran y se ponen a conversar, primero se busca un diálogo escrito para ese par (Ana y Diana, Ana y Marilla, Ana y Matthew, Rachel y Marilla, Matthew y Marilla, Ana y Gilbert, Ana y Rachel) o, si hay un tercero cerca, para ese trío (Ana-Diana-Marilla, Ana-Matthew-Marilla, Ana-Rachel-Marilla). Cada bloque se dice una sola vez; cuando se acaban, vuelven los saludos y chismes de plantilla. Lo que no alcanzó a decirse en una escena del libro se agrega al banco de ese par.
4. **Plantillas** (`chatLines`): saludos según la hora, chismes de la Sra. Lynde, la timidez de Matthew…
5. **Con IA** (si está configurada): las escenas de los personajes cerca de Ana y los encuentros con los vecinos se generan, recordando lo ya dicho para no repetirlo.

Además, los **momentos del lugar** (`MAP.moments`: el campo rosado, el puente techado, el Camino Blanco…) se dicen una vez al día al pasar.
