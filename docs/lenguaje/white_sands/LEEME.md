# White Sands, en el lenguaje de las historias

El viaje a White Sands (capítulos 5 y 6 del libro), escrito entero en el lenguaje de [`docs/LENGUAJE.md`](../../LENGUAJE.md):
un archivo por tipo. Es un ejemplo de diseño: el juego todavía no lo lee; hoy esta historia vive en
`src/datos/guion.txt` (las escenas `viaje_spencer`, `ws_*`) y en `src/js/34-viaje-white-sands.js` (el viaje).

| Archivo | Qué hay |
|---|---|
| [`mundo.txt`](mundo.txt) | las personas, los lugares del camino, la ruta de la costa, la calesa, las funciones `ve` y `oye` |
| [`estado.txt`](estado.txt) | `ana_en_tv`, la paciencia y el afecto, los hechos que dejan las elecciones, la noticia de la equivocación |
| [`condiciones.txt`](condiciones.txt) | `a_prueba`, `marilla_con_paciencia`, `hora_de_salir` |
| [`verbos.txt`](verbos.txt) | subir, bajar, ir_a, traer, viajar, `llevar_a` (la receta del viaje) y `conseguir_que` (el A\*) |
| [`actos.txt`](actos.txt) | pedir, ordenar, informar, ofender, disculparse, comentar |
| [`voces.txt`](voces.txt) | «Sube, Ana», «Ana Shirley. Sube. Ahora.», «Así que aquí estabas…» |
| [`escenas.txt`](escenas.txt) | las trece escenas, con las líneas de hoy y la cabecera nueva |
| [`historias.txt`](historias.txt) | la historia: su entrada, sus encargos, su orden, su salida |

## El grafo

Los encargos (en los rectángulos redondeados) avanzan solos, con el planificador; las escenas (en los rectángulos) se
activan en sus momentos.

```mermaid
flowchart TD
  E((empieza:<br/>a prueba, después del<br/>desayuno, 14 a 19 h)) --> B([busca: Marilla consigue<br/>que Ana venga a la cocina])
  B -- "tuvo que ir a buscarla" --> FV[falta_viaje<br/>paciencia −1]
  B -- cumplido --> VS{¿paciencia?}
  VS -- ">= 1" --> V1[viaje_spencer]
  VS -- "< 1" --> V2[viaje_spencer_duda]
  V1 --> IDA([ida: Marilla lleva a Ana<br/>al hotel, en calesa, por la costa])
  V2 --> IDA
  IDA -- camino empieza --> T1[ws_t1]
  T1 -- tras --> T2[ws_t2]
  IDA -. camino.hondonada_lynde .-> T2
  T2 -- tras --> T3[ws_t3]
  IDA -. camino.escuela .-> T3
  IDA -- camino.playa empieza --> M[ws_mar]
  IDA -- camino.playa cumplido --> P[ws_pye]
  P -- "Ana corre al mar:<br/>se rompe «mantiene»" --> TR([Marilla la trae:<br/>conseguir_que])
  TR -- va cumplido --> O[ws_orilla]
  O --> IDA
  P -- "Ana se calla" --> IDA
  IDA -- cumplido --> SP{¿paciencia?}
  SP -- ">= 1" --> S1[ws_spencer]
  SP -- "< 1" --> S2[ws_spencer_duda]
  S1 --> VU([vuelta: a Tejas Verdes,<br/>por la costa])
  S2 --> VU
  VU -- camino empieza --> VT[ws_vuelta]
  VU -- cumplido --> N[ws_noche]
  N --> F((termina:<br/>ana_en_tv = decidida))
  IDA -- "fallido: Ana no volvió<br/>en 4 intentos" --> X((falla))
```

## Lo que cambió respecto de hoy

- **Las cabeceras.** Ninguna escena repite `viaje=white_sands, ana_en_tv<decidida`, `en:`, `calesa:`, `canal:`,
  `prioridad:`, `interrumpe:` ni `sujeta:`: lo dan la historia (que esté en curso), el encargo (que vayan en la
  calesa) y la lista `orden`.
- **El viaje deja de ser código.** La ruta, la Sra. Pye esperando, Marilla buscando a Ana y «Sube, Ana» son el verbo
  `llevar_a`, el encargo `pye`, la búsqueda `conseguir_que` y sus voces.
- **Las charlas van por lugares, en secuencia.** `ws_t2` se activa tras `ws_t1`, o al pasar la Hondonada de Lynde si la
  primera no se dijo; ya no hace falta cerrar la anterior con `!dicha:ws_t3`.
- **La paciencia de Marilla abre dos variantes**, la del libro y la de la duda, con la misma activación: gana la que se
  cumple (`marilla_con_paciencia` o no). Hoy son dos escenas de salida distintas y una de llegada.
- **Lo que deja la historia** (`ana_en_tv = decidida`, conocer a la Sra. Blewett, el punto para volver) está en la
  historia y no en su última escena.
- **Un hecho cambió de nombre**: el que dejaba «mirar el mar» en la orilla (`ws_mar`) es `ws_miro_mar`, para no
  confundirlo con la escena `ws_mar` al leer.
