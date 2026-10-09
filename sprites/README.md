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

## La cara: parpadear y hablar sobre el dibujo

Se probó armar la cara con un kit de piezas (`gpt_ana_rostro.webp`, `tools/trace_face.py`), pero queda mejor la cara tal
como viene dibujada en la hoja de partes. Ahora solo se marca dónde están los ojos y la boca:

    python3 tools/face_marks.py sprites/gpt_ana_partes.webp ana

y el juego, al parpadear, tapa cada ojo con el color de la piel y dibuja el ojo cerrado; al hablar, tapa la boca y
dibuja la boca abierta (de frente, de tres cuartos y de perfil).

## Por piezas separadas: cuerpo sin cabeza, cabeza, poses (el formato actual)

Pedidas con `PROMPTS.md`: `gpt2_ana_cuerpo.webp`, `gpt2_ana_cabeza.webp`, `gpt2_ana_poses.webp`.

    python3 tools/trace_kit.py ana --cuerpo sprites/gpt2_ana_cuerpo.webp --cabeza sprites/gpt2_ana_cabeza.webp \
      --poses sprites/gpt2_ana_poses.webp --skin 3,4,16 \
      --pal '#301f11,#ae4722,#8b3e1f,#fcd2ae,#e0af91,#407251,#335a40,#553724,#d53430,#ece6dc,#5a7183,#f2a08c,#ffffff,#f3d796,#d9b26a,#a82a2a,#f9ddbe'

El cuerpo queda con los pies en (0,0) y la cabeza con su cuello en (0,0): una cabeza se puede poner sobre otro cuerpo.
La cabeza encaja por el ancho del cuello. Las poses (sentada, agachada, acostada, corriendo) se usan enteras.

**Visor:** `index.html?visor` muestra solo a Ana, para moverla (flechas, Shift para correr, rueda para el zoom) y
probar todo: sentarse, agacharse, acostarse, hablar, la trenza, el sombrero, las caras, girar, y comparar con el dibujo
en código.

## Desde un video (ciclos de caminar cuadro a cuadro)

`video/gemini_ana_gira.mp4` (Gemini/Veo): Ana camina en el lugar mientras gira (frente, ¾, perfil, ¾ espalda, espalda).

    python3 tools/trace_video.py sprites/video/gemini_ana_gira.mp4 ana --k 10 --eps 4 --eps-face 1.6 --minarea 14 \
      --views 'frente:0-1.4,tq_frente:1.3-2.7,perfil:2.6-4.1,tq_espalda:4.0-5.4,espalda:5.3-6.8' --sheet lamina.png

Para cada vista (tramo en segundos) busca el ciclo que cierra (el par de cuadros más parecidos a un paso completo de
distancia), toma 8 cuadros parejos y los calca; si mira a la izquierda los refleja. El juego camina con esos cuadros y
usa el más quieto para estar de pie (sentada, agachada y acostada siguen con las poses de las hojas). En el visor,
«Ropa: café (video) / verde (hojas)» cambia entre las dos.

Comparación de calcos para los 40 cuadros del video (peso; error medio por pixel contra el video a tamaño de juego):

| calco | peso | gzip | error | cara |
|---|---|---|---|---|
| propio, eps 3.5 | 202 KB | 65 KB | 57 | ojos como manchas |
| **propio, eps 4 + cabeza eps 1.6 + azul de los ojos (el que se usa)** | **273 KB** | **81 KB** | 58 | se lee |
| VTracer polígonos a 1/3 (`--engine vtracer`) | 270 KB | 58 KB | 47 | tosca |
| VTracer polígonos a 1/2 | 460 KB | — | 40 | regular |
| VTracer curvas a tamaño completo | 5 MB | 1,8 MB | — | — |

(Los puntos se guardan como pasos de uno a otro: números chicos.)

## Dos personajes en un mismo video

`video/gemini_marilla_matthew_gira.mp4`: Marilla y Matthew caminan juntos mientras giran. `--split 2 --pick 0|1`
corta cada cuadro por las columnas más finas entre los dos y se queda con uno:

    V='frente:0-1.8,tq_frente:1.5-3.1,perfil:4-6.4,tq_espalda:6.6-8,espalda:8-10'
    python3 tools/trace_video.py sprites/video/gemini_marilla_matthew_gira.mp4 marilla --split 2 --pick 0 --views $V --k 10 --eps 4 --eps-face 1.6 --minarea 14
    python3 tools/trace_video.py sprites/video/gemini_marilla_matthew_gira.mp4 matthew --split 2 --pick 1 --views $V --k 10 --eps 4 --eps-face 1.6 --minarea 14

En el visor se elige a quién mirar.

## Recolorear: el mismo dibujo para otros

`ANIM_LIKE` (index.html) dice qué calco usa cada personaje que no tiene el suyo, y `ANIM_SLOTS` cuáles de sus colores son
pelo y vestido; los colores nuevos salen de la ficha de aspecto de cada uno (`look`). Ruby, Jane y Josie caminan con el
ciclo de Ana recoloreado: casi no pesa (solo la paleta).
