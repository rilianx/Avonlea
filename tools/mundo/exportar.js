#!/usr/bin/env node
// La geografía del juego, como datos: abre el juego una vez (index.html, en un navegador sin ventana) y mide, sobre el
// mapa real y los caminos largos, cuántos minutos hay entre los lugares del lenguaje (docs/lenguaje/comun/mundo.ts), a
// pie y en calesa. El mundo mínimo (tools/mundo/mundo_minimo.js) la usa para mover a la gente sin dibujar nada.
// Si cambia el mapa o un camino, se vuelve a exportar (el mundo mínimo avisa si el juego es más nuevo que la geografía).
// Uso: node tools/mundo/exportar.js   → tools/mundo/geografia.json
const { chromium } = require('playwright'), fs = require('fs'), path = require('path');
const RAIZ = path.resolve(__dirname, '..', '..'), INDEX = path.join(RAIZ, 'index.html'), SALIDA = path.join(__dirname, 'geografia.json');
const { huella } = require('./huella.js');
const EXE = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;

// (lo que se mide adentro del juego: cada lugar del lenguaje es uno o más puntos —del mapa de Avonlea, o de un camino
// largo, en su «s»—; entre dos lugares, el camino más corto entre sus puntos)
const MEDIR = `(() => {
  const L = LENGUAJE.lugares, V = { pie: CH.marilla?.speed?.walk || 38, ana: SPEEDS.ana, calesa: CARRO }, mapa = (x, y) => ({ mapa: [Math.round(x), Math.round(y)] });
  const tramoDe = (c, f) => enCamino(c, () => { const T = ROAD_TRAMOS.find(f), i = ROAD_TRAMOS.indexOf(T); return (T.s + (ROAD_TRAMOS[i + 1]?.s ?? 1)) / 2; });
  const blanco = ROADS.blanco[Math.floor(ROADS.blanco.length / 2)];
  // LOS LUGARES DEL MUNDO: una sola lista. Los del planificador (sus claves: el granero, la tienda, «h:rl» —la casa de la
  // Sra. Lynde, por dentro—…) y los que solo tienen las historias (Tejas Verdes —el patio—, la Avenida, la orilla…).
  // Cada uno con sus puntos (del mapa, o de un camino largo), su nombre, y cómo lo llaman las historias (vista: el lugar
  // del lenguaje en que queda; el granero, en Tejas Verdes) y el planificador (plan: su clave; si no tiene, va «donde está»)
  const P = {}, INFO = {};
  const lugar = (id, nombre, puntos, o = {}) => { P[id] = puntos; INFO[id] = { nombre, ...o }; };
  const vistaEn = (x, y) => { const b = PEOPLE.shearer, antes = { where: b.where, x: b.x, y: b.y }; Object.assign(b, { where: 'out', x, y }); try { return lgLugarDe('shearer'); } finally { Object.assign(b, antes); } };   // (lo que diría el juego de alguien parado ahí)
  for (const k of Object.keys(WP)) if (!WP_CAMINO[k]) lugar(k, WP_NAME[k] || k, [k === 'cocina' ? { ...mapa(...WP[k]), adentro: 1 } : mapa(...WP[k])], { plan: k, vista: { cocina: 'cocina', arbustos: 'arbustos' }[k] || vistaEn(...WP[k]) });   // (el sendero: un lugar de las vidas —donde se encuentran Ana y Diana—, no el patio)
  lugar('pieza', WP_NAME.pieza, [{ ...mapa(...DOOR.gg), adentro: 2 }], { plan: 'pieza', vista: 'cocina' });
  for (const [k, n] of [['pieza_marilla', 'la pieza de Marilla'], ['pieza_matthew', 'la pieza de Matthew']]) lugar(k, n, [{ ...mapa(...DOOR.gg), adentro: 2 }], { plan: 'cocina', vista: 'cocina' });   // (el juego no las tiene: arriba, como la de Ana)
  for (const h of Object.keys(HOUSES)) if (h !== 'gg' && h !== 'br') lugar('h:' + h, HOUSES[h].name, [{ ...mapa(...DOOR[h]), adentro: 1 }], { plan: 'h:' + h, vista: vistaEn(...DOOR[h]) });
  lugar('h:br', 'la estación de Bright River', [{ camino: 'br', s: 0, adentro: 1 }], { plan: 'h:br', vista: 'estacion_bright_river' });
  for (const [k, [c, sv]] of Object.entries(WP_CAMINO)) lugar(k, WP_NAME[k], [{ camino: c, s: sv }], { plan: k, vista: { hotel_ws: 'hotel_white_sands', playa_ws: 'playa' }[k] });
  // (los que solo tienen las historias)
  lugar('tejas_verdes', 'Tejas Verdes (el patio)', [mapa(GG.x, GG.y + 90)], { vista: 'tejas_verdes' });
  lugar('hondonada_lynde', 'la Hondonada de Lynde (el camino, frente a la casa)', [mapa(...dlgLugar('hondonada'))], { vista: 'hondonada_lynde' });
  lugar('camino_blanco', 'la Avenida (el Camino Blanco de las Delicias)', [mapa(...blanco), { camino: 'br', s: tramoDe('br', t => t.kind === 'avenida') }], { vista: 'camino_blanco' });
  lugar('newbridge', 'Newbridge', [{ camino: 'br', s: tramoDe('br', t => t.name === 'Newbridge') }], { vista: 'newbridge' });
  lugar('camino_costa', 'el camino de la costa', [{ camino: 'costa', s: .6 }], { vista: 'camino_costa' });
  lugar('orilla', 'la orilla del mar', [mapa(PLACES.playa[1], PLACES.playa[2]), { camino: 'costa', s: WP_CAMINO.playa_ws[1], adentro: 2 }], { vista: 'orilla' });   // (la de Avonlea, junto al faro; y bajar a la arena por el camino de la costa)
  // (cada lugar de las historias, en el mundo: el mismo, o el del planificador que es ese lugar)
  const alias = { estacion_bright_river: 'h:br', estanque_barry: 'lago', hotel_white_sands: 'hotel_ws', playa: 'playa_ws', cuesta_del_huerto: 'h:os' };
  // EL TABLERO DE TEJAS VERDES: los alrededores de la casa, en cuadrantes del tamaño en que dos personas se ponen a
  // conversar (en el juego, afuera, están juntas a menos de 120 px). Cada cuadrante es un lugar del mundo, de una zona
  // —el corral, el granero, el patio…—: la del corral, los que caen adentro de su cerco; los demás, la de la zona más
  // cerca. El nombre de una zona (el corral) es su cuadrante principal, el de su punto en el mapa. La casa, por dentro
  // (la cocina, las piezas), es un mundo aparte: se entra por la puerta. Algunos muebles de afuera tienen su cuadrante
  // (la cerca del corral no es donde están las vacas): quien hace algo junto a ellos, va ahí.
  const TB = { x0: 1220, y0: 4900, cols: 8, filas: 4, c: 120 };
  const celdaDe = (x, y) => [Math.floor((x - TB.x0) / TB.c), Math.floor((y - TB.y0) / TB.c)], cid = ([i, j]) => 'c:' + i + ',' + j;
  const ZONAS = ['granero', 'gallinero', 'corral', 'arbustos', 'tejas_verdes', 'huerta'], ancla = {};
  for (const z of ZONAS) { ancla[z] = celdaDe(...P[z][0].mapa); const otra = ZONAS.find(y => y !== z && ancla[y] && cid(ancla[y]) === cid(ancla[z])); if (otra) throw new Error('el tablero: ' + z + ' y ' + otra + ' caen en el mismo cuadrante'); }
  const nombreZona = Object.fromEntries(ZONAS.map(z => [z, INFO[z].nombre])), planZona = Object.fromEntries(ZONAS.map(z => [z, INFO[z].plan]));
  for (const z of ZONAS) { delete P[z]; delete INFO[z]; }
  const cubre = (A, i, j) => { const x = TB.x0 + i * TB.c, y = TB.y0 + j * TB.c, w = Math.max(0, Math.min(x + TB.c, A.x + A.w) - Math.max(x, A.x)), h = Math.max(0, Math.min(y + TB.c, A.y + A.h) - Math.max(y, A.y)); return w * h / (TB.c * TB.c); };   // (cuánto del cuadrante cae adentro)
  const EDIFICIOS = [{ x: GG.x - GG.w / 2, y: GG.y - 130, w: GG.w, h: 130 }, { x: BARN.x - BARN.w / 2, y: BARN.y - 110, w: BARN.w, h: 110 }];
  const zonaDe = (i, j) => { if (cubre(AREAS.corral, i, j) > .25) return 'corral';
    let m = null, d0 = Infinity; for (const z of ZONAS) if (z !== 'corral') {   // (el corral: solo lo que cubre su cerco)
    const d = Math.hypot(ancla[z][0] - i, ancla[z][1] - j); if (d < d0) { d0 = d; m = z; } } return m; };
  for (let j = 0; j < TB.filas; j++) for (let i = 0; i < TB.cols; i++) {
    const z = zonaDe(i, j), id = cid([i, j]);
    const bajo = EDIFICIOS.some(A => cubre(A, i, j) > .3);   // (debajo de la casa o del granero: no se pasa, se rodea)
    P[id] = [{ ...mapa(TB.x0 + (i + .5) * TB.c, TB.y0 + (j + .5) * TB.c), celda: 1 }]; INFO[id] = { nombre: nombreZona[z], ...(planZona[z] ? { plan: planZona[z] } : {}), vista: z, celda: [i, j], zona: z, ...(bajo ? { edificio: true } : {}) };
  }
  for (const z of ZONAS) alias[z] = cid(ancla[z]);
  const muebles = Object.fromEntries(Object.entries({ 'corral.vacas': WP.corral, 'corral.cerca': [AREAS.corral.x + AREAS.corral.w / 2, AREAS.corral.y + AREAS.corral.h - 10], 'tejas_verdes.tina': [GG.x + 130, GG.y + 80], 'tejas_verdes.porche': [GG.x, GG.y + 40] }).map(([k, p]) => [k, cid(celdaDe(...p))]));
  for (const [k, c] of Object.entries(muebles)) if (INFO[c].zona !== k.split('.')[0]) throw new Error('el tablero: ' + k + ' cae fuera de su zona (' + c + ')');
  // (para dibujarlo: lo que hay en el tablero, en el mapa del juego —la casa, el granero, el cerco del corral, los caminos—)
  const enTB = ([x, y]) => x >= TB.x0 - 60 && x <= TB.x0 + TB.cols * TB.c + 60 && y >= TB.y0 - 60 && y <= TB.y0 + TB.filas * TB.c + 60;
  const tablero = { ...TB, zonas: Object.fromEntries(ZONAS.map(z => [z, { nombre: nombreZona[z], ancla: cid(ancla[z]) }])), muebles,
    cosas: [{ que: 'casa', nombre: 'la casa', x: GG.x - GG.w / 2, y: GG.y - 130, w: GG.w, h: 130, puerta: [GG.x, GG.y] },
      { que: 'granero', nombre: 'el granero', x: BARN.x - BARN.w / 2, y: BARN.y - 110, w: BARN.w, h: 110 },
      { que: 'cerco', nombre: 'el corral', x: AREAS.corral.x, y: AREAS.corral.y, w: AREAS.corral.w, h: AREAS.corral.h },
      { que: 'gallinero', nombre: 'el gallinero', x: WP.gallinero[0] - 30, y: WP.gallinero[1] - 40, w: 60, h: 40 },
      { que: 'gallinas', x: WP.gallinero[0] + 20, y: WP.gallinero[1] + 10 }, { que: 'vacas', x: WP.corral[0], y: WP.corral[1] },
      { que: 'huerta', nombre: 'la huerta', x: WP.huerta[0] - 70, y: WP.huerta[1] - 40, w: 140, h: 80 },
      { que: 'abedules', x: WP.arbustos[0], y: WP.arbustos[1] }],
    caminos: Object.values(ROADS).map(r => r.filter(enTB).map(p => p.map(Math.round))).filter(r => r.length > 1).concat([[[GG.x - 60, GG.y + 70], [BARN.x + 20, BARN.y + 30]].map(p => p.map(Math.round))]) };
  for (const l of Object.keys(L)) if (!P[alias[l] || l]) throw new Error('el exportador no sabe dónde está «' + l + '» (agrégalo a MEDIR)');
  for (const [l, w] of Object.entries(alias)) INFO[w].vista = l;
  for (const l of Object.keys(L)) if (INFO[l]) INFO[l].vista = l;   // (un lugar que es de las historias, se llama así)
  // (por el mapa: lo que mide la red de caminos de Avonlea; si no hay red, en línea recta, un poco más)
  const largo = (a, b) => { const r = netRoute(a[0], a[1], b[0], b[1]); if (!r) return dist(a[0], a[1], b[0], b[1]) * 1.3; const pts = [a, ...r.pts, b]; let d = 0; for (let i = 1; i < pts.length; i++) d += dist(...pts[i - 1], ...pts[i]); return d; };
  // (por un camino largo, entre dos «s»: en calesa con el ritmo de cada tramo; a pie, al paso)
  const porCamino = (c, s0, s1, v) => enCamino(c, () => { const [a, b] = s0 < s1 ? [s0, s1] : [s1, s0]; if (v) return (b - a) * ROAD_LEN / v / MIN_S; let m = 0; for (let i = 0; i < ROAD_TRAMOS.length; i++) { const t0 = Math.max(a, ROAD_TRAMOS[i].s), t1 = Math.min(b, ROAD_TRAMOS[i + 1]?.s ?? 1); if (t1 > t0) m += (t1 - t0) * ROAD_LEN / (ROAD_V * (ROAD_TRAMOS[i].ritmo || 1)) / MIN_S; } return m; });
  const salida = c => caminoPuerta(c);
  // (los minutos entre dos puntos, a pie —v: la velocidad— o en calesa —v null—)
  function minutos(p, q, v){
    const vm = v || V.calesa, enMapa = (a, b) => largo(a, b) / vm / MIN_S;
    let m;
    if (p.celda && q.celda) m = dist(...p.mapa, ...q.mapa) / vm / MIN_S;   // (dentro del tablero: derecho, de cuadrante en cuadrante)
    else if (p.mapa && q.mapa) m = enMapa(p.mapa, q.mapa);
    else if (p.camino && q.camino && p.camino === q.camino) m = porCamino(p.camino, p.s, q.s, v);
    else { const ida = x => x.mapa ? [x.mapa, 0] : [salida(x.camino), porCamino(x.camino, x.s, 1, v)]; const [a, ma] = ida(p), [b, mb] = ida(q); m = ma + mb + enMapa(a, b); }
    return m + (p === q ? 0 : (p.adentro || 0) + (q.adentro || 0));
  }
  const ids = Object.keys(P), M = {};
  for (const a of ids) { M[a] = {}; for (const b of ids) if (a !== b) {
    const mejor = v => Math.min(...P[a].flatMap(p => P[b].map(q => minutos(p, q, v))));
    M[a][b] = { pie: Math.round(mejor(V.pie)), ana: Math.round(mejor(V.ana)), calesa: Math.round(mejor(null)) };
  } }
  // (los caminos largos: cuánto duran, y sus tramos —lo que es un lugar del lenguaje—)
  const caminos = Object.fromEntries(Object.entries(CAMINOS).map(([c, C]) => [c, { nombre: C.nombre, fin: C.fin_nombre, minutos: C.min, millas: C.miles + 1, tramos: C.tramos.map(t => ({ s: t.s, nombre: t.name, ...(t.lugar ? { lugar: t.lugar } : {}) })) }]));
  // (la gente del pueblo —no la de Tejas Verdes—: el juego no la hace caminar a donde la pone una historia, aparece ahí)
  const del_pueblo = Object.keys(LENGUAJE.personas).filter(k => k !== 'ana' && !PEOPLE[k] && FOLKBY[k]);
  // (para dibujarlo —trazas/lenguaje.html, el mundo mínimo—: el tamaño del mapa, la costa, los caminos, y dónde sale cada camino largo)
  const fino = (L, n) => L.filter((p, i) => i % n === 0 || i === L.length - 1).map(([x, y]) => [Math.round(x), Math.round(y)]);
  const dibujo = { w: WW, h: WH, costa: fino(COAST, 1), caminos: Object.values(ROADS).map(r => fino(r, 2)), puertas: Object.fromEntries(Object.keys(CAMINOS).map(c => [c, caminoPuerta(c).map(Math.round)])) };
  return JSON.stringify({ velocidades: V, minuto_de_juego_s: MIN_S, del_pueblo, lugares: INFO, alias, puntos: P, minutos: M, caminos, dibujo, tablero });
})()`;

(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] }), pg = await b.newPage();
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
  await pg.goto('file://' + INDEX + '?dev'); await pg.waitForTimeout(1500);
  const G = JSON.parse(await pg.evaluate(s => window.__avonlea.ev(s), MEDIR));
  await b.close();
  if (errs.length) { console.error('el juego dio errores al cargar:\n  ' + errs.join('\n  ')); process.exit(1); }
  // (la huella de las fuentes de la geografía: si cambian, el mundo mínimo avisa que hay que exportar de nuevo)
  G.huella = huella();
  fs.writeFileSync(SALIDA, JSON.stringify(G, null, 1) + '\n');
  const n = Object.keys(G.minutos).length;
  console.log(`→ ${path.relative(RAIZ, SALIDA)} · ${n} lugares, ${n * (n - 1)} distancias · huella ${G.huella}`);
  const tv = G.minutos[G.alias.tejas_verdes]; console.log(`  ejemplos: tejas_verdes → hotel_ws, en calesa ${tv.hotel_ws.calesa} min; → h:br ${tv['h:br'].calesa} min; a la escuela a pie ${tv.escuela.pie} min; al granero ${G.minutos.cocina[G.alias.granero].pie} min · el tablero: ${G.tablero.cols}×${G.tablero.filas} cuadrantes`);
})();
