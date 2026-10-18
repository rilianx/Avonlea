# El modelo de las interacciones: huecos e incoherencias

Lo genera `python3 tools/modelo.py` con un solucionador lógico (Z3): para cada regla de `src/datos/reglas.txt` le pregunta si existe alguna situación posible del juego en que no se cumple, y la muestra. 344 variables, 786 cosas que alguien le puede decir a Ana, 9.4 s. Ver `docs/MODELO_INTERACCIONES.md`.

| Qué | Cuántos |
|---|---|
| Huecos (situaciones sin nada que decir o sin reacción) | 0 |
| Incoherencias (una frase que supone algo que puede no cumplirse) | 0 |
| Frases o escenas que nunca pueden darse | 0 |
