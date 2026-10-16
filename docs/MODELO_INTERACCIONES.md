# El modelo de las interacciones

Para encontrar, con lógica y no a ojo, lo que falta y lo que no cuadra en lo que la gente de Avonlea le dice a Ana: que la Sra. Lynde no tenga nada que decirle en alguna situación, que alguien vea a Ana en camisón y no diga nada, que una frase nombre a la Srta. Stacy antes de que llegue, o invite a pasar fuera de su casa.

`python3 tools/modelo.py` (después de `node tools/planilla.js`) deja `trazas/modelo.md` (para leer) y `trazas/modelo.json`, y la planilla lo muestra en la hoja «Modelo».

## Las piezas

1. **Lo que hay** (sale de los datos, no se escribe): cada cosa que alguien le puede decir a Ana, con sus condiciones.
   - sus frases (`src/datos/frases.txt`), las de cada estación incluidas;
   - las escenas en que habla con ella, las conversaciones, los encuentros (`guion.txt`, `conversaciones.txt`, los diálogos de pares);
   - la presentación de la primera vez (todos, salvo los que ya conoce y los vecinos sin nombre).
   - Una frase con el nombre de Ana solo la dice quien la conoce (así lo hace el juego).
2. **Las situaciones posibles** (salen de los datos): el día y la hora; dónde está Ana y dónde cada uno; cómo anda Ana (en camisón, sin sombrero…); quién está en Avonlea (`llegadas.txt`); qué pasó y cuándo; a quién conoce; qué noticias sabe cada uno; las metas cumplidas; las cualidades (el afecto, el estudio…). Con lo que los datos dicen de ellas:
   - un hecho supone lo que pide la escena que lo deja (y que quienes hablan en ella estaban en Avonlea);
   - llegar e irse son hechos con su día (`llegadas.txt`);
   - quien conoce a Ana sabe que hay una niña en Tejas Verdes;
   - en la casa de un vecino, Ana solo está si alguien de esa casa está ahí;
   - dónde puede estar cada uno: la pieza de Ana, solo los Cuthbert y Diana; una casa, quienes viven ahí y los grandes que visitan; la escuela, los niños y el maestro; los vecinos sin nombre, afuera y en los lugares públicos.
3. **Las reglas** (lo único que se escribe a mano: `src/datos/reglas.txt`):
   - **espera**: dónde debería haber algo («todos tienen algo que decirle cuando la ven», «un grande que la ve en camisón fuera de Tejas Verdes reacciona»);
   - **nunca**: una situación imposible que los datos no dicen («la escuela de noche»);
   - **referencia**: lo que una frase supone por lo que dice («Pasa» → en su casa; «Stacy» → ya llegó; «nieve» → invierno).

## La pregunta

Para cada regla y cada persona, al solucionador lógico (Z3) se le pregunta: **¿existe una situación posible en que la regla no se cumple?**

- Para una **espera**: ¿hay una situación posible (con la condición de la regla) en que no vale ninguna de sus frases o escenas? Si la hay, la devuelve, con lo que piden las que tiene (por qué ninguna vale: «`dias_desde:escuela:3` (2)» = dos de sus frases esperan que Ana lleve tres días en la escuela).
- Para una **referencia**: ¿hay una situación posible en que esa frase se dice y no se cumple lo que supone?
- Y, para todo: ¿hay frases o escenas que nunca pueden darse (sus condiciones se contradicen con el mundo)?

El solucionador revisa todas las combinaciones a la vez, sin enumerarlas (son millones), y cuando contesta «no hay», es una garantía: en ninguna situación posible del modelo falta. Cuando contesta «sí hay», el contraejemplo es una situación concreta para mirar en el juego.

## Los límites

- Mira lo que **puede** pasar según las condiciones, no lo que pasa jugando: que una situación sea posible no quiere decir que una jugadora llegue a ella (para eso, la exploración de `tools/cobertura.js`).
- Las condiciones que el modelo no entiende (por ejemplo `canal_libre`, `dicha:x`) quedan libres: pueden valer o no. Puede haber huecos que el juego no tiene por eso; se corrige enseñándole esa condición al modelo.
- El tono (que una recién conocida no sea cariñosa) no se puede revisar con reglas de palabras: queda para una lectura (o para un modelo de lenguaje que marque las dudosas).
