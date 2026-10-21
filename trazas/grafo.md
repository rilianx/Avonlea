# El grafo de la historia, revisado

Lo genera `node tools/grafo.js` (ver `docs/MOTOR.md`). Lee el guion, el cuaderno, las habilidades y el código.

**253 escenas** (9 grandes), **32 metas** del cuaderno, **140 hechos** que algo deja.

## Escenas o metas que nunca podrían pasar

Ninguna: todo hecho que se pide, algo lo deja.


## Condiciones mal escritas

Ninguna.

## Hechos que se dejan y nada lee

No es un error (un hecho puede quedar para el registro), pero puede ser algo olvidado:

- `ana_admite_gilbert`: lo deja escena conv_diana_gilbert_contesta (una opción)
- `blewett_orgullo`: lo deja escena viaje_spencer_duda (una opción)
- `conoce_`: lo deja código
- `conoce_blewett`: lo deja escena viaje_spencer, escena viaje_spencer_duda
- `marilla_doblo_ropa`: lo deja código
- `mis_brujula_empujon`: lo deja escena mis_brujula_harrison (una opción), escena mis_brujula_final_sin (una opción)
- `mis_brujula_guardada`: lo deja escena mis_brujula_harrison (una opción)
- `mis_brujula_paces`: lo deja escena mis_brujula_final
- `nombre_propio_`: lo deja código
- `nombro_`: lo deja código
- `nombro_burbuja`: lo deja escena conv_diana_nombres
- `nombro_cerezo`: lo deja escena primera_gwin
- `nombro_senda`: lo deja escena conv_diana_nombres
- `queens_primera`: lo deja escena examen_primera
