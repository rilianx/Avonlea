# Lectura de los relatos (hecha a mano)

La auditoría automática (`trazas/auditoria.md`) compara cada paso esperado con patrones y daba 96 de 96. Aquí está lo que se ve **leyendo** el relato de cada acción y comparándolo con lo que debería pasar: si se entiende como historia, qué está raro y qué hay que arreglar. Lectura de la corrida del commit 005fc23 (3 veces cada acción; se lee la que muestra el informe).

## Problemas que aparecen en muchas acciones

| Qué se lee | Por qué está mal | Arreglo |
|---|---|---|
| «Ana se sienta.» en medio de un recado (camino a la tienda, llevando la vaca, entre dos tareas), a veces dos o tres veces seguidas | Ana se sienta sola cuando lleva 9 s quieta afuera; entre una tarea y otra, o mientras alguien le habla, queda quieta y se sienta en pleno camino | no sentarse sola mientras tiene algo que hacer |
| «Ana .», «Ana con el canastito.», «Ana con las manos.» | frases vacías o sin verbo cuando cambia solo lo que tiene en la mano | redactar «se queda con…», no decir nada si solo se vacía |
| «empieza: tomar_te», «quehacer platos», «escribir_carta», «cocinar te» | nombres internos de las acciones | el texto de cada acción: «tomar el té», «lavar los platos», «preparar el té» |
| Al llegar a un lugar caminando no se dice dónde («Ana empieza: patinar.» sin decir que está en el lago) | lo que pasa al lado mientras camina no es noticia, pero al detenerse se perdía también | al detenerse, decir dónde quedó |
| «junto a camino del puente del arroyo», «junto a camino de .» | redacción, y un nombre vacío | «no lejos de…»; sin nombre, nada |
| Peg Bowen «junto a camino del granero» cuando está en su bosque; el heno «junto a camino de la casa de la Sra. Lynde» | los lugares con nombre del relato no incluían los del planificador (el bosque de Peg, la colina, el campo de heno, el potrero…) | sumarlos |
| «Ana va por la tienda de Lawson.» | al entrar a una casa | «entra a la tienda de Lawson»; al salir, «sale» |
| «ahora tiene 5 dolares, 1 azucar, 3 lena, 2 leche» | nombres internos | «5 dólares, una taza de azúcar, 3 atados de leña, 2 jarros de leche» |
| La postura se pierde cuando cambia junto con el lugar (Marilla cose «junto a la silla de la ventana», sin decir que está sentada) | solo se decía la postura si no cambiaba el lugar | decir «está sentada en…» |
| «Ana dice: ««El cuadrado de la hipotenusa…»»» | comillas dobles | quitar las de más |
| El trineo: «junto al campo… / junto a camino del campo…» cada minuto, 30 veces | al tirarse va y viene y cruza el límite de «junto a» | mientras sigue la misma acción con movimiento (trineo, patinar, remar), no contar cada vaivén |
| «Bueno, me voy, que tengo que cocinar taza de té», «…pedirle a Ana: que venga…», «…cambiar 9 bayas por cinta para el pelo» | la despedida usa el texto del plan tal cual | «preparar el té», «pedirle a Ana que venga…», «por una cinta» |
| «¡Buenos días! ¿Ya supo lo de la vaca…?» a las 15:11 | saludo de la mañana en la tarde | según la hora |
| «Vi una nube con forma de barco…» dos o tres veces en la misma charla | se elige al azar con repetición | no repetir en una misma charla |
| «¡buhonero! ¡Espera!» | minúscula | mayúscula |
| Diana, en pleno picnic: «Mamá dice que puedo salir… ¿Vamos al lago?» (ya están en el lago), «¡Ana, mi alma gemela! Te estaba esperando.»; mientras Ana la consuela: «Los manzanos están llenos este año»; Marilla, mientras le corta el pelo a Ana: «Si quieres cocinar, la estufa está encendida» | las frases sueltas de cada uno siguen saliendo aunque estén haciendo algo con Ana | no decir frases sueltas mientras se está en una acción con otro |

## Acción por acción

- **Lavar la loza y barrer**: se entiende y los tiempos son buenos. Lo raro es «Ana ya no lleva nada; con la escoba.» (deja de cargar la escoba para barrer con ella; se lee como contradicción), y que no dice que lava *en el fregadero* (el lugar se perdía al detenerse). No se ve a Marilla pedírselo (Marilla no está en el relato).
- **Escribir una carta**: bien. «con la banqueta y la carta sobre la mesa» suena raro (debería ser «sentada en la banqueta»). Camino a la tienda se sienta dos veces.
- **La compota de Marilla**: bien, pero Marilla hace **dos** tandas (la meta pide 2) y el relato esperado decía una: corregir el esperado. «Ana .» dos veces. «dar manzanas; con lo que entrega» debería nombrar las manzanas.
- **Matthew trae huevos**: no se ve a Ana pedírselos: dice «¡Matthew! ¡Espera!», Matthew «¿Qué pasa?» y luego habla del día; el pedido no se dice en voz alta.
- **El tinte**: el buhonero no «pasa por Tejas Verdes»: se va lejos y Ana lo persigue una hora hasta el faro, conversando en el camino. Se tiñe «junto al escritorio» en vez de junto al lavatorio (el nombre del sitio más cercano). La sorpresa del verde, bien.
- **Vender la vaca**: Ana se sienta con la vaca de la cuerda en pleno camino. No se ve a quién se la vende. No «vuelve con el dinero»: se queda en la aldea (ajustar el esperado).
- **Una cinta (trueque)**: bien; «Ana .» y sentarse entre cada tanda de bayas.
- **Un regalo para Marilla**: bien.
- **Matthew trae azúcar**: bien (el pedido de Marilla no se ve porque empieza ya pedido).
- **El té con la Sra. Allan**: el té, adentro, sentadas, bien. Pero: la Sra. Allan se despide con «tengo que cocinar taza de té»; Ana no contesta la invitación; la charla repite las mismas tres frases por media hora; y al salir, la Sra. Allan le dice «Tienes que venir a tomar el té… un día de estos» justo después del té.
- **Peg Bowen**: dice que está cerca del granero de Tejas Verdes y no en su bosque (faltaba el nombre del bosque).
- **La compota para la Sra. Barry**: no se ve a Diana (no está en el relato), así que no se ve la cadena; «Sra. Barry va por Avonlea, junto a camino de .».
- **Ordeñar**: bien. Marilla dice «Riega la huerta antes de que caiga el sol» sola en la cocina.
- **Matthew da de comer**: dos veces «alimentar» seguidas sin decir dónde (en el granero y en el corral).
- **Visita a la Sra. Lynde**: **mal**: «Ana se sienta.» más de cuarenta veces (se sienta y se para sin parar) y la visita empieza dos veces («Vine a visitarla» a las 15:07 y a las 15:33). Al irse, la Sra. Lynde dice «¡Pasa, pasa! Siéntate».
- **Devolver el libro**: bien; Diana no dice nada (no está en el relato).
- **Amigas del alma**: el juramento es en el camino junto al Bosque Encantado y no en el jardín de los Barry; aceptable. «Ana con las manos.»
- **Cuidar al Sr. Harrison**: al empezar no dice que está en cama. Con el enfermo en cama, él pregunta «¿Esa vaca tuya se ha portado bien hoy?». El jarabe dura un minuto y en ese minuto se cura, se levanta y sale.
- **Estudiar y recitar**: no dice que estudia sentada. En la escuela, antes de recitar, conversa y repite «Vi una nube…» tres veces.
- **Las oraciones**: no se arrodilla (de pie junto a la cama).
- **El vestido**: bien; Marilla cose 40 minutos; no se dice que sentada.
- **El sombrero con flores**, **Remar**, **Ponerle nombre a los lugares**, **Leer el libro**: bien, salvo el sentarse de más y los nombres internos.
- **El club de cuentos**: le lee el cuento a Diana **un minuto** («un buen rato» esperado).
- **El concierto**: es a las 16:00, no «la noche del concierto» (ajustar el esperado). No se dice que está en el escenario.
- **Las flores del salón**: bien; «Ana .» entre tramo y tramo.
- **Felicitar a Diana**: Diana mete «¿Te acuerdas de nuestro juramento?» antes de agradecer.
- **Consolar a Diana**: Diana no se ve triste («¿Me llamabas?») y en medio del abrazo habla de los manzanos.
- **Hacer heno**, **Partir leña**, **Batir mantequilla**, **Sembrar y regar**: bien.
- **Patinar**: no dice dónde (el lago); Ana grita «¡Mira, Diana!» sin Diana.
- **El trineo**: treinta líneas de vaivén «junto al campo / junto a camino del campo».
- **El picnic**: Marilla no contesta (no está en el relato) y Ana le responde a otra cosa («Sí, Marilla… me distraje mirando una araña»). Diana suelta frases sueltas en el picnic.
- **El corte de pelo**: «Ana se sienta; con las tijeras» (las tijeras son de Marilla). Marilla habla de cocinar en medio del corte.
- **El techo de los Barry**: no dice dónde empieza a trepar; bien la caída y el tobillo.

## Segunda y tercera lectura (después de los arreglos)

Lo de arriba quedó arreglado. Leyendo de nuevo aparecieron otras cosas, que también se arreglaron:

| Qué se leía | Arreglo |
|---|---|
| Se oía media conversación: Ana contestaba «Sí, Marilla… me distraje mirando una araña» a algo que no aparecía; el comprador de la vaca no decía nada | el relato cuenta también lo que dicen al lado de quienes se observan, y lo que se dice en el cuadro de diálogo |
| Ana le pedía huevos a Matthew y el pedido no aparecía: la respuesta de Matthew a «¡Espera!» lo tapaba | quien pide espera a que el otro termine de hablar; y quien recibe el pedido contesta («Sí, cómo no. Ahora mismo.») |
| Marilla pedía tela y en el mismo momento soltaba «Riega la huerta…» | las frases sueltas no se dicen sobre lo que otro está diciendo, ni en medio de un pedido; una charla suelta se corta si alguien se ocupa |
| En el té, Ana «tomaba el té» y conversaba mientras la Sra. Allan todavía lo preparaba | la visita se sienta y espera; el té y la charla empiezan cuando las dos están a la mesa |
| Ana empezaba a jurar amistad o a recitar en la escuela y a mitad se ponía a conversar siete minutos | nadie se pone a conversar mientras hace algo, ni cuando va hacia la persona con quien tiene que hacerlo |
| La Sra. Allan conversaba con cada persona que encontraba, con las mismas frases («¿Cómo vienen las papas?») | después de una charla, un rato sin otra |
| Al leerle el cuento a Diana, Ana se sentaba y se paraba enseguida (lo mismo que la visita a la Sra. Lynde) | una vez empezado algo con alguien, no se lo sigue persiguiendo |
| Matthew, al darle la leña a Marilla, quedaba parado dentro de la mesa (la regla de los muebles lo encontró) | a alguien en un cuarto se le llega a un lugar libre a su lado |
| El trineo: «se sienta / se levanta» cada minuto; Diana «junto al huerto / junto a la casa» cada dos minutos; Marilla «junto al fregadero / en la cocina» | el vaivén de una acción no se cuenta; un margen entre lugares cercanos; alejarse de algo no es noticia |
| Ana le hablaba de «usted» a Minnie May y ella contestaba como una señora | con los niños, de tú, y respuestas de niño |
| «Ana lleva can.», «con Marilla detrás, con las tijeras» | «lleva la regadera», «con Marilla detrás, que le corta el pelo» |

**Lo que queda, sabido:**
- Ana conversa con casi todos los que encuentra en el camino (unos cinco minutos cada vez): los recados se alargan. Es su carácter, pero se podría bajar.
- El Sr. Harrison se cura en cuanto termina el jarabe y sale de la casa.
- La escuela no tiene mapa de Tiled: no se dice «junto a la pizarra».
- Las cadenas de pedidos fallan de vez en cuando en la regresión (una vez la meta 9, el paseo con Diana; otra la 17, la compota de la Sra. Barry): repetidas, salen bien (26 de 26 y 4 de 4).
