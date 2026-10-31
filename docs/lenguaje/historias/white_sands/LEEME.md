# White Sands, en el lenguaje de las historias

El viaje a White Sands (capítulos 5 y 6 del libro), escrito entero en el lenguaje de
[`docs/LENGUAJE.md`](../../../LENGUAJE.md). La lógica está en TypeScript y el guion en Yarn.

**En el juego** corre en el motor del lenguaje (`src/js/67-lenguaje.js`), con la calesa y el planificador del juego.
Reemplaza a las escenas del guion `viaje_spencer`, `ws_*` y `falta_viaje`, y al código del viaje (el viejo
`34-viaje-white-sands.js`). Sin paciencia, el camino de la duda sigue en el guion (`viaje_spencer_duda`,
`duda_matthew`, `duda_suplica`, `duda_calla`, `devuelta_blewett`): se cuenta en casa, sin viaje. Por eso, en el juego
se omiten `viaje_spencer_duda` y `ws_spencer_duda`. Se prueba con `tools/paciencia.js`.

White Sands está lejos de Avonlea: el hotel y su playa están al final del **camino de la costa**, un camino largo
como el de Bright River (`src/js/17-camino-bright-river.js`), unas seis millas junto al mar. Sale del mapa de
Avonlea por un letrero en la costa norte. La parada `camino_costa` es ese camino; la `playa` es su último tramo
antes del hotel, donde espera la Sra. Pye. El faro y la orilla cercana siguen en Avonlea.

| Archivo | Qué hay |
|---|---|
| [`historia.ts`](historia.ts) | sus hechos (locales), sus condiciones con nombre, sus encargos (`busca`, `ida`, `pye`, `vuelta`), su orden, lo que deja |
| [`escenas.yarn`](escenas.yarn) | las quince escenas: las trece de hoy, con la cabecera nueva, y dos para cuando Ana no quiere subir |
| [`voces.yarn`](voces.yarn) | su sabor propio: «¡Ana! Ven, que nos vamos», «Sube, Ana. No tenemos todo el día», «Ana Shirley. Sube. Ahora.» |
| [`index.ts`](index.ts) | lo que ven las demás historias: si terminó, y el recuerdo de que Ana corrió al mar |
| `escenas.ids.ts`, `escenas.datos.ts` | generados por `tools/lenguaje/yarn.js` (no se editan) |

Lo común (el mundo, el estado compartido, los verbos como `llevar_a` y `conseguir_que`, los actos, las voces
generales) está en [`../../comun/`](../../comun/).

## El grafo

Los encargos (en rectángulos redondeados) avanzan solos, con el planificador; las escenas (en rectángulos) se activan
en sus momentos.

```mermaid
flowchart TD
  E((empieza:<br/>a prueba, tras la primera<br/>noche, 14 a 19 h)) --> B([busca: Marilla consigue<br/>que Ana venga a la cocina])
  B -- "marilla traer cumplido<br/>(tuvo que ir a buscarla)" --> FV[falta_viaje<br/>paciencia −1]
  B -- busca cumplido --> VS{¿paciencia?}
  IDA -- "cerca: Marilla va a buscarla<br/>(«Ir con Marilla»); sube" --> PE{{la jugadora:<br/>¿Subir a la calesa?}}
  PE -- "ana rechaza pedir subir" --> NS[ws_no_sube<br/>paciencia −1]
  NS -- "otra vez: ordenar" --> PE2{{¿Subir a la calesa?}}
  PE2 -- "ana rechaza ordenar subir" --> NO[ws_no_sube_orden<br/>paciencia −1]
  PE -- acepta --> IDA
  PE2 -- acepta --> IDA
  VS -- ">= 1" --> V1[viaje_spencer]
  VS -- "< 1" --> V2[viaje_spencer_duda]
  V1 --> IDA([ida: llevar_a hotel_white_sands,<br/>en calesa, por la costa])
  V2 --> IDA
  V1 --> PY([pye: la Sra. Pye<br/>espera en la playa])
  IDA -- ida.camino empieza --> T1[ws_t1]
  T1 -- tras --> T2[ws_t2]
  IDA -. camino.hondonada_lynde .-> T2
  T2 -- tras --> T3[ws_t3]
  IDA -. camino.escuela .-> T3
  IDA -- camino.playa empieza --> M[ws_mar]
  IDA -- camino.playa cumplido --> P[ws_pye]
  M -- "tras ws_mar (la Sra. Pye<br/>espera en el camino)" --> P
  P -- "Ana se baja y corre al mar:<br/>se rompe «mantiene»" --> TR([cerca: conseguir_que<br/>→ ir_a_buscar])
  TR -- marilla ir_a_buscar.va cumplido --> O[ws_orilla]
  O --> IDA
  P -- "Ana se calla" --> IDA
  IDA -- ida cumplido --> SP{¿paciencia?}
  SP -- ">= 1" --> S1[ws_spencer]
  SP -- "< 1" --> S2[ws_spencer_duda]
  S1 --> VU([vuelta: llevar_a tejas_verdes])
  S2 --> VU
  VU -- vuelta.camino empieza --> VT[ws_vuelta]
  VU -- vuelta cumplido --> N[ws_noche]
  N --> F((termina:<br/>ana_en_tv = decidida))
  IDA -- "fallido: Ana no volvió<br/>en 4 intentos" --> X((falla))
```

## Lo que cambió respecto de hoy

- **Las cabeceras.** Ninguna escena repite `viaje=white_sands, ana_en_tv<decidida`, `en:`, `calesa:`, `canal:`,
  `prioridad:`, `interrumpe:` ni `sujeta:`. Lo dan la historia (que esté en curso), el encargo (que vayan en la
  calesa) y el `orden`.
- **El viaje deja de ser código.** Esto pasa a ser lenguaje:

  | Hoy, en el código | En el lenguaje |
  |---|---|
  | la ruta | el verbo `llevar_a` |
  | la Sra. Pye esperando | el encargo `pye` |
  | Marilla buscando a Ana | la búsqueda `conseguir_que` |
  | «Sube, Ana» | las voces de `pedir` y `ordenar` |

- **Que Ana venga y suba lo decide la jugadora.** Marilla no la sube: va donde está Ana y le pide que venga con ella
  («Ir con Marilla»); vuelven juntas a la calesa, y le pide que suba («Subir a la calesa»). La jugadora acepta o no
  («Todavía no»). Si no quiere subir, Marilla se lo vuelve a decir, más firme (`ws_no_sube`), y después se cruza de
  brazos (`ws_no_sube_orden`); cada negativa le cuesta paciencia. Ana sola le hace caso a quien quiere
  (`comun/ana.ts`). Todo esto se puede jugar en `trazas/lenguaje.html` (`node tools/lenguaje/pagina.js`).
- **Primero el mar, después la Sra. Pye.** `ws_pye` pide que se haya dicho `ws_mar`, y también va tras ella; corta lo
  que se esté diciendo (`interrumpe`). Después de la Sra. Pye no vuelven las charlas de antes. En el juego, la Sra.
  Pye se para en el camino y detiene la calesa hasta que se dice lo suyo.
- **Las charlas van por lugares, en secuencia.** `ws_t2` se activa tras `ws_t1`, o al pasar la Hondonada de Lynde si
  la primera no se dijo.
- **La paciencia de Marilla abre dos variantes** (la del libro y la de la duda) con la misma activación.
- **Lo que deja la historia** está en la historia, no en su última escena.
- **Al pasarlas agregué algunas cosas que hoy no existen:**
  - un cierre en `ws_spencer_duda`: «Me la llevo a casa. Lo hablaré con Matthew»;
  - un hecho renombrado: el de mirar el mar en la orilla se llamaba `ws_mar`, igual que la escena, y ahora es
    `ws_miro_mar`;
  - tres actos marcados: la Sra. Pye ofende a Ana, Ana se disculpa en la orilla, Marilla le informa la equivocación a
    la Sra. Spencer.
