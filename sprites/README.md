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

## Del dibujo de GPT al juego

`gpt_ana_sin_sombrero.webp` es la hoja redibujada. Se calca a trazados con:

    python3 tools/trace.py sprites/gpt_ana_sin_sombrero.webp ana --eps 2 --poly \
      --pal '#4a2e1e,#b74e27,#923d1d,#fbd2ac,#e5b391,#477a56,#355c3e,#5f3924,#d53430,#ece6dc,#65787c,#f2a08c,#ffffff'

(`--pal`: los colores planos de la hoja, el primero es la línea.) Escribe `sprites/vec/ana.json` y el bloque `VEC` de
`index.html`. `node tools/compare.js ana salida.png` dibuja el calco donde estaban las figuras, para compararlo con la
imagen original.

Pesos medidos para Ana (10 figuras; error = diferencia media por pixel con la imagen, 0–765):

| calco | peso | gzip | error grande | error a tamaño de juego |
|---|---|---|---|---|
| polígonos eps 1 | 75 KB | 26 KB | 31.8 | 26.3 |
| **polígonos eps 2 (el que se usa)** | **44 KB** | **16.5 KB** | 32.3 | 26.9 |
| polígonos eps 3 | 33 KB | 12.6 KB | 36.4 | 31.1 |
| polígonos eps 4.5 | 26 KB | 10 KB | 43.3 | 37.8 |
| polígonos eps 6 | 21 KB | 8.3 KB | 50.8 | 44.3 |
| curvas eps 1 | 144 KB | 45 KB | 32.7 | 27.7 |

El dibujo en código actual (cuerpo, cara, pelo, trenzas y gestos) pesa 27 KB (9 KB gzip) y sirve para todos los
personajes; cada personaje agrega unos 180 bytes de ficha.

## Por partes (títere de recortes)

`gpt_ana_partes.webp`: el cuerpo sin trenzas ni brazos en 5 vistas, un brazo de frente y uno de lado, una trenza recta, y
el sombrero en 5 vistas. Se calca con:

    python3 tools/trace_parts.py sprites/gpt_ana_partes.webp ana \
      --pal '#4a2e1e,#b74e27,#923d1d,#fbd2ac,#e5b391,#477a56,#355c3e,#5f3924,#d53430,#ece6dc,#65787c,#f2a08c,#ffffff,#f8d290,#deb068'

(`--hair` y `--dress`: qué colores de la paleta son pelo y vestido, para encontrar los enganches.) El juego arma a Ana
con las piezas: el tronco según la vista, los pies que se levantan o adelantan al caminar, los brazos que rotan desde el
hombro (y suben en el gesto de la trenza), las trenzas que se doblan siguiendo la curva de su física (al correr se abren,
al echarla atrás vuela en horizontal) y el sombrero sobre el pelo. Pesa 34 KB.

## El rostro por piezas (kit)

`gpt_ana_rostro.webp`: la cabeza sin pelo ni rasgos en 5 vistas; los ojos en 5 estados (abiertos, cerrados, alegres,
tristes, sorprendidos: izquierdo, derecho, perfil); las cejas en 3 estados; la nariz; la boca en 6 estados (sonrisa,
neutra, hablando, abierta, triste, sorprendida: frente y perfil); el pelo en 5 vistas, en capa de atrás y flequillo.

    python3 tools/trace_face.py sprites/gpt_ana_rostro.webp sprites/gpt_ana_partes.webp ana \
      --pal '#4a2e1e,#b74e27,#923d1d,#fbd2ac,#e5b391,#477a56,#355c3e,#5f3924,#d53430,#ece6dc,#65787c,#f2a08c,#ffffff,#f8d290,#deb068,#1a1a2a,#3f7fc0'

Las posiciones (ojos, nariz, boca, cabeza, pelo) salen de la hoja de partes; las escalas también: la de la cabeza por el
ancho a la altura de las orejas, la del pelo por su ancho, la de los rasgos por el tamaño del iris (GPT dibuja cada fila
del kit a su propia escala). Las trenzas del pelo se cortan en el cuello: cuelgan las que tienen física. En el juego,
`p.blink` cierra los ojos, hablar alterna las bocas, y `p.face` / `p.mouth` / `p.brows` eligen una expresión.
