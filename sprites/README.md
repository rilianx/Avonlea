# Sprites base para retocar

Hojas de giro de los personajes tal como los dibuja hoy el juego (código), para pedirle a un modelo de imágenes que las
redibuje con el estilo del anime. Cada hoja tiene cinco vistas: frente, tres cuartos de frente, perfil (mirando a la
derecha), tres cuartos de espalda y espalda. La fila de arriba es de pie y la de abajo es a mitad de paso. Las hojas se
generan con el mismo dibujo del juego (`drawPerson`).

## Prompt sugerido (adjuntando la hoja)

> Redibuja esta hoja de personaje con el estilo del anime clásico de fines de los años 70 (World Masterpiece Theater,
> «Ana de las Tejas Verdes»). Mantén exactamente las mismas cinco vistas, en el mismo orden, posición y tamaño, y las
> dos filas (de pie y a mitad de paso). Mantén la ropa, los colores, el peinado y las proporciones del cuerpo. Usa una
> línea de contorno fina y uniforme, colores planos con una sola sombra, sin degradados ni texturas y sin sombra en el
> suelo. El fondo debe ser blanco liso.

Lo que vuelva se calca a código (colores planos → trazados) y se monta sobre el esqueleto del juego.
