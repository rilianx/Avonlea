# El modelo de las interacciones: huecos e incoherencias

Lo genera `python3 tools/modelo.py` con un solucionador lógico (Z3): para cada regla de `src/datos/reglas.txt` le pregunta si existe alguna situación posible del juego en que no se cumple, y la muestra. 271 variables, 344 cosas que alguien le puede decir a Ana, 21.6 s. Ver `docs/MODELO_INTERACCIONES.md`.

| Qué | Cuántos |
|---|---|
| Huecos (situaciones sin nada que decir o sin reacción) | 112 |
| Incoherencias (una frase que supone algo que puede no cumplirse) | 6 |
| Frases o escenas que nunca pueden darse | 0 |

## Hueco: algo que decirle

1 persona(s): una situación posible en que no tiene nada, y lo que piden las que tiene (todas las situaciones: trazas/modelo.json).

| Quién | Tiene | Una situación sin nada | Lo que piden las que tiene (cuántas) |
|---|---|---|---|
| Gertie Pye | 3 | día: 71 · estación: verano · hora: 6:00 · Ana en: el patio de Tejas Verdes · conoce a Gertie Pye: sí (y 3 más) | `dias_desde:escuela:3` (2); `!conoce:gertie` (1) |

## Hueco: reacciona al camisón fuera de Tejas Verdes

37 persona(s): una situación posible en que no tiene nada, y lo que piden las que tiene (todas las situaciones: trazas/modelo.json).

| Quién | Tiene | Una situación sin nada | Lo que piden las que tiene (cuántas) |
|---|---|---|---|
| Alec King | 0 | día: 46 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a Alec King: sí (y 3 más) | no tiene ninguna |
| el reverendo Allan | 0 | día: 99 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a el reverendo Allan: sí (y 3 más) | no tiene ninguna |
| el Sr. Andrews | 0 | día: 46 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a el Sr. Andrews: sí (y 3 más) | no tiene ninguna |
| la Sra. Barry | 1 | día: 60 · estación: primavera · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a la Sra. Barry: no (y 3 más) | `hora:7-21` (1) |
| la Sra. Blewett | 0 | día: 99 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a la Sra. Blewett: sí (y 3 más) | no tiene ninguna |
| el buhonero | 0 | día: 60 · estación: primavera · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a el buhonero: sí (y 3 más) | no tiene ninguna |
| el editor de La Crónica | 0 | día: 43 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a el editor de La Crónica: sí (y 3 más) | no tiene ninguna |
| el capitán Jim | 0 | día: 46 · estación: invierno · hora: 6:00 · Ana en: La Cuesta del Huerto · Ana: en camisón · conoce a el capitán Jim: sí (y 3 más) | no tiene ninguna |
| el Sr. Harrison | 0 | día: 46 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a el Sr. Harrison: sí (y 3 más) | no tiene ninguna |
| el herrero | 0 | día: 46 · estación: invierno · hora: 6:00 · Ana en: La Cuesta del Huerto · Ana: en camisón · conoce a el herrero: sí (y 3 más) | no tiene ninguna |
| la Srta. Hetty King | 0 | día: 99 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a la Srta. Hetty King: sí (y 3 más) | no tiene ninguna |
| Janet King | 0 | día: 46 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a Janet King: sí (y 3 más) | no tiene ninguna |
| Jasper Dale | 0 | día: 43 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a Jasper Dale: sí (y 3 más) | no tiene ninguna |
| el jefe de estación | 0 | día: 46 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a el jefe de estación: sí (y 3 más) | no tiene ninguna |
| Jerry Buote | 0 | día: 46 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a Jerry Buote: sí (y 3 más) | no tiene ninguna |
| la Srta. Josephine Barry | 0 | día: 43 · estación: invierno · hora: 6:00 · Ana en: La Cuesta del Huerto · Ana: en camisón · conoce a la Srta. Josephine Barry: no (y 3 más) | no tiene ninguna |
| el Sr. Lawson | 0 | día: 99 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a el Sr. Lawson: sí (y 3 más) | no tiene ninguna |
| la Sra. Lynde | 1 | día: 46 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a la Sra. Lynde: no (y 3 más) | `hora:7-21` (1) |
| Marilla | 1 | día: 46 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a Marilla: sí (y 3 más) | `hora:9-19` (1) |
| Mary Joe | 0 | día: 57 · estación: primavera · hora: 6:00 · Ana en: la casa del Sr. Harrison · Ana: en camisón · conoce a Mary Joe: sí (y 3 más) | no tiene ninguna |
| Matthew | 0 | día: 43 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a Matthew: sí (y 3 más) | no tiene ninguna |
| el médico | 0 | día: 99 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a el médico: sí (y 3 más) | no tiene ninguna |
| Olivia King | 0 | día: 43 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a Olivia King: sí (y 3 más) | no tiene ninguna |
| Peg Bowen | 0 | día: 43 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a Peg Bowen: sí (y 3 más) | no tiene ninguna |
| un pescador | 0 | día: 71 · estación: verano · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a un pescador: sí (y 3 más) | no tiene ninguna |
| el Sr. Phillips | 0 | día: 43 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a el Sr. Phillips: sí (y 3 más) | no tiene ninguna |
| el Sr. Shearer | 0 | día: 99 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a el Sr. Shearer: sí (y 3 más) | no tiene ninguna |
| el Sr. Sloane | 0 | día: 60 · estación: primavera · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a el Sr. Sloane: sí (y 3 más) | no tiene ninguna |
| la Sra. Spencer | 0 | día: 43 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a la Sra. Spencer: sí (y 3 más) | no tiene ninguna |
| la Sra. Allan | 0 | día: 57 · estación: primavera · hora: 6:00 · Ana en: La Cuesta del Huerto · Ana: en camisón · conoce a la Sra. Allan: sí (y 3 más) | no tiene ninguna |
| la Sra. Pye | 0 | día: 46 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a la Sra. Pye: sí (y 3 más) | no tiene ninguna |
| el Sr. Barry | 0 | día: 57 · estación: primavera · hora: 6:00 · Ana en: La Cuesta del Huerto · Ana: en camisón · conoce a el Sr. Barry: sí (y 3 más) | no tiene ninguna |
| el Sr. Bell | 0 | día: 43 · estación: invierno · hora: 6:00 · Ana en: la tienda de Lawson · Ana: en camisón · conoce a el Sr. Bell: sí (y 3 más) | no tiene ninguna |
| la Srta. Stacy | 0 | día: 99 · estación: invierno · hora: 6:00 · Ana en: el camino o la aldea · Ana: en camisón · conoce a la Srta. Stacy: sí (y 3 más) | no tiene ninguna |
| Thomas Lynde | 0 | día: 46 · estación: invierno · hora: 6:00 · Ana en: la casa de la Sra. Lynde · Ana: en camisón · conoce a Thomas Lynde: sí (y 3 más) | no tiene ninguna |
| un vecino (sin nombre) | 0 | día: 99 · estación: invierno · hora: 6:00 · Ana en: la iglesia · Ana: en camisón · conoce a un vecino (sin nombre): no (y 3 más) | no tiene ninguna |
| una veraneante del hotel | 0 | día: 71 · estación: verano · hora: 6:00 · Ana en: La Cuesta del Huerto · Ana: en camisón · conoce a una veraneante del hotel: sí (y 3 más) | no tiene ninguna |

## Hueco: reacciona si Ana está sin sombrero en la iglesia

37 persona(s): una situación posible en que no tiene nada, y lo que piden las que tiene (todas las situaciones: trazas/modelo.json).

| Quién | Tiene | Una situación sin nada | Lo que piden las que tiene (cuántas) |
|---|---|---|---|
| Alec King | 0 | día: 67 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a Alec King: sí (y 3 más) | no tiene ninguna |
| el reverendo Allan | 0 | día: 113 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a el reverendo Allan: sí (y 3 más) | no tiene ninguna |
| el Sr. Andrews | 0 | día: 71 · estación: verano · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a el Sr. Andrews: sí (y 3 más) | no tiene ninguna |
| la Sra. Barry | 0 | día: 60 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a la Sra. Barry: no (y 3 más) | no tiene ninguna |
| la Sra. Blewett | 0 | día: 1 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a la Sra. Blewett: sí (y 3 más) | no tiene ninguna |
| el buhonero | 0 | día: 11 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a el buhonero: sí (y 3 más) | no tiene ninguna |
| el editor de La Crónica | 0 | día: 99 · estación: invierno · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a el editor de La Crónica: sí (y 3 más) | no tiene ninguna |
| el capitán Jim | 0 | día: 126 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a el capitán Jim: sí (y 3 más) | no tiene ninguna |
| el Sr. Harrison | 0 | día: 3 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a el Sr. Harrison: sí (y 3 más) | no tiene ninguna |
| el herrero | 0 | día: 57 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a el herrero: sí (y 3 más) | no tiene ninguna |
| la Srta. Hetty King | 0 | día: 60 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a la Srta. Hetty King: sí (y 3 más) | no tiene ninguna |
| Janet King | 0 | día: 60 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a Janet King: sí (y 3 más) | no tiene ninguna |
| Jasper Dale | 0 | día: 60 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a Jasper Dale: sí (y 3 más) | no tiene ninguna |
| el jefe de estación | 0 | día: 71 · estación: verano · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a el jefe de estación: sí (y 3 más) | no tiene ninguna |
| Jerry Buote | 0 | día: 1 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a Jerry Buote: sí (y 3 más) | no tiene ninguna |
| la Srta. Josephine Barry | 0 | día: 43 · estación: invierno · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a la Srta. Josephine Barry: no (y 3 más) | no tiene ninguna |
| el Sr. Lawson | 0 | día: 60 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a el Sr. Lawson: sí (y 3 más) | no tiene ninguna |
| la Sra. Lynde | 0 | día: 99 · estación: invierno · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a la Sra. Lynde: no (y 3 más) | no tiene ninguna |
| Marilla | 0 | día: 57 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a Marilla: sí (y 3 más) | no tiene ninguna |
| Mary Joe | 0 | día: 60 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a Mary Joe: sí (y 3 más) | no tiene ninguna |
| Matthew | 0 | día: 57 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a Matthew: sí (y 3 más) | no tiene ninguna |
| el médico | 0 | día: 85 · estación: otoño · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a el médico: sí (y 3 más) | no tiene ninguna |
| Olivia King | 0 | día: 1 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a Olivia King: sí (y 3 más) | no tiene ninguna |
| Peg Bowen | 0 | día: 57 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a Peg Bowen: sí (y 3 más) | no tiene ninguna |
| un pescador | 0 | día: 43 · estación: invierno · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a un pescador: sí (y 3 más) | no tiene ninguna |
| el Sr. Phillips | 0 | día: 99 · estación: invierno · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a el Sr. Phillips: sí (y 3 más) | no tiene ninguna |
| el Sr. Shearer | 0 | día: 60 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a el Sr. Shearer: sí (y 3 más) | no tiene ninguna |
| el Sr. Sloane | 0 | día: 60 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a el Sr. Sloane: sí (y 3 más) | no tiene ninguna |
| la Sra. Spencer | 0 | día: 57 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a la Sra. Spencer: sí (y 3 más) | no tiene ninguna |
| la Sra. Allan | 0 | día: 57 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a la Sra. Allan: sí (y 3 más) | no tiene ninguna |
| la Sra. Pye | 0 | día: 57 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a la Sra. Pye: sí (y 3 más) | no tiene ninguna |
| el Sr. Barry | 0 | día: 57 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a el Sr. Barry: sí (y 3 más) | no tiene ninguna |
| el Sr. Bell | 0 | día: 60 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a el Sr. Bell: sí (y 3 más) | no tiene ninguna |
| la Srta. Stacy | 0 | día: 113 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a la Srta. Stacy: sí (y 3 más) | no tiene ninguna |
| Thomas Lynde | 0 | día: 57 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a Thomas Lynde: sí (y 3 más) | no tiene ninguna |
| un vecino (sin nombre) | 0 | día: 113 · estación: primavera · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a un vecino (sin nombre): no (y 3 más) | no tiene ninguna |
| una veraneante del hotel | 0 | día: 127 · estación: verano · hora: 6:00 · Ana en: la iglesia · Ana: sin sombrero · conoce a una veraneante del hotel: sí (y 3 más) | no tiene ninguna |

## Hueco: reacciona si Ana anda sola de noche

37 persona(s): una situación posible en que no tiene nada, y lo que piden las que tiene (todas las situaciones: trazas/modelo.json).

| Quién | Tiene | Una situación sin nada | Lo que piden las que tiene (cuántas) |
|---|---|---|---|
| Alec King | 0 | día: 46 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a Alec King: sí (y 3 más) | no tiene ninguna |
| el reverendo Allan | 0 | día: 46 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a el reverendo Allan: sí (y 3 más) | no tiene ninguna |
| el Sr. Andrews | 0 | día: 46 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a el Sr. Andrews: sí (y 3 más) | no tiene ninguna |
| la Sra. Barry | 0 | día: 57 · estación: primavera · hora: 21:00 · Ana en: el camino o la aldea · conoce a la Sra. Barry: no (y 3 más) | no tiene ninguna |
| la Sra. Blewett | 0 | día: 43 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a la Sra. Blewett: sí (y 3 más) | no tiene ninguna |
| el buhonero | 0 | día: 102 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a el buhonero: sí (y 3 más) | no tiene ninguna |
| el editor de La Crónica | 0 | día: 60 · estación: primavera · hora: 21:00 · Ana en: el camino o la aldea · conoce a el editor de La Crónica: sí (y 3 más) | no tiene ninguna |
| el capitán Jim | 0 | día: 46 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a el capitán Jim: sí (y 3 más) | no tiene ninguna |
| el Sr. Harrison | 0 | día: 46 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a el Sr. Harrison: sí (y 3 más) | no tiene ninguna |
| el herrero | 0 | día: 46 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a el herrero: sí (y 3 más) | no tiene ninguna |
| la Srta. Hetty King | 0 | día: 46 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a la Srta. Hetty King: sí (y 3 más) | no tiene ninguna |
| Janet King | 0 | día: 46 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a Janet King: sí (y 3 más) | no tiene ninguna |
| Jasper Dale | 0 | día: 99 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a Jasper Dale: sí (y 3 más) | no tiene ninguna |
| el jefe de estación | 0 | día: 46 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a el jefe de estación: sí (y 3 más) | no tiene ninguna |
| Jerry Buote | 0 | día: 1 · estación: primavera · hora: 21:00 · Ana en: el camino o la aldea · conoce a Jerry Buote: sí (y 3 más) | no tiene ninguna |
| la Srta. Josephine Barry | 0 | día: 99 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a la Srta. Josephine Barry: no (y 3 más) | no tiene ninguna |
| el Sr. Lawson | 0 | día: 46 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a el Sr. Lawson: sí (y 3 más) | no tiene ninguna |
| la Sra. Lynde | 0 | día: 99 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a la Sra. Lynde: no (y 3 más) | no tiene ninguna |
| Marilla | 0 | día: 46 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a Marilla: sí (y 3 más) | no tiene ninguna |
| Mary Joe | 0 | día: 57 · estación: primavera · hora: 21:00 · Ana en: La Cuesta del Huerto · conoce a Mary Joe: sí (y 3 más) | no tiene ninguna |
| Matthew | 0 | día: 46 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a Matthew: sí (y 3 más) | no tiene ninguna |
| el médico | 0 | día: 99 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a el médico: sí (y 3 más) | no tiene ninguna |
| Olivia King | 0 | día: 46 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a Olivia King: sí (y 3 más) | no tiene ninguna |
| Peg Bowen | 0 | día: 43 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a Peg Bowen: sí (y 3 más) | no tiene ninguna |
| un pescador | 0 | día: 46 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a un pescador: sí (y 3 más) | no tiene ninguna |
| el Sr. Phillips | 0 | día: 99 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a el Sr. Phillips: sí (y 3 más) | no tiene ninguna |
| el Sr. Shearer | 0 | día: 99 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a el Sr. Shearer: sí (y 3 más) | no tiene ninguna |
| el Sr. Sloane | 0 | día: 43 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a el Sr. Sloane: sí (y 3 más) | no tiene ninguna |
| la Sra. Spencer | 0 | día: 99 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a la Sra. Spencer: sí (y 3 más) | no tiene ninguna |
| la Sra. Allan | 0 | día: 60 · estación: primavera · hora: 21:00 · Ana en: el camino o la aldea · conoce a la Sra. Allan: sí (y 3 más) | no tiene ninguna |
| la Sra. Pye | 0 | día: 99 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a la Sra. Pye: sí (y 3 más) | no tiene ninguna |
| el Sr. Barry | 0 | día: 60 · estación: primavera · hora: 21:00 · Ana en: el camino o la aldea · conoce a el Sr. Barry: sí (y 3 más) | no tiene ninguna |
| el Sr. Bell | 0 | día: 46 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a el Sr. Bell: sí (y 3 más) | no tiene ninguna |
| la Srta. Stacy | 0 | día: 57 · estación: primavera · hora: 21:00 · Ana en: el camino o la aldea · conoce a la Srta. Stacy: sí (y 3 más) | no tiene ninguna |
| Thomas Lynde | 0 | día: 99 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a Thomas Lynde: sí (y 3 más) | no tiene ninguna |
| un vecino (sin nombre) | 0 | día: 46 · estación: invierno · hora: 21:00 · Ana en: el camino o la aldea · conoce a un vecino (sin nombre): no (y 3 más) | no tiene ninguna |
| una veraneante del hotel | 0 | día: 71 · estación: verano · hora: 21:00 · Ana en: el camino o la aldea · conoce a una veraneante del hotel: sí (y 3 más) | no tiene ninguna |

## Incoherencias

| Regla | Quién | Dónde | Frase | Exige | Se puede decir en |
|---|---|---|---|---|---|
| «pasa» invita a entrar | la Sra. Barry | frase de invierno | Pasa, pasa, que hace un frío terrible. Diana está junto al fuego. | `donde:barry:propia` | día: 99 · estación: invierno · hora: 6:00 · Ana en: la casa de la Sra. Lynde · conoce a la Sra. Barry: sí |
| «pasa» invita a entrar | la Sra. Lynde | frase de invierno | Pasa, niña, que hace un frío de mil demonios... perdón, de los que dan | `donde:lynde:propia` | día: 43 · estación: invierno · hora: 6:00 · Ana en: la cocina de Tejas Verdes · conoce a la Sra. Lynde: sí |
| la Srta. Stacy, cuando ya llegó | Carrie Sloane | frase | ¿Viste la composición de Ana? ¡La señorita Stacy la leyó en voz alta! | `hecho:llego_stacy` | día: 88 · estación: otoño · hora: 6:00 · Ana en: el camino o la aldea · conoce a Carrie Sloane: sí |
| Gilbert, cuando ya volvió | Diana | escena al encontrarse | diana: Gilbert Blythe te miró otra vez en clase. | `hecho:llego_gilbert` | día: 57 · estación: primavera · hora: 6:00 · Ana en: su pieza · conoce a Diana: sí |
| «saludos a Marilla», fuera de Tejas Verdes | la Sra. Barry | frase | Saluda a Marilla de mi parte. | `!donde:ana:tejas` | día: 60 · estación: primavera · hora: 6:00 · Ana en: la cocina de Tejas Verdes · conoce a la Sra. Barry: no |
| «saludos a Marilla», fuera de Tejas Verdes | un vecino (sin nombre) | frase | ¡Qué grande estás, niña! Saludos a Marilla. | `!donde:ana:tejas` | día: 57 · estación: primavera · hora: 6:00 · Ana en: el patio de Tejas Verdes · conoce a un vecino (sin nombre): no |
