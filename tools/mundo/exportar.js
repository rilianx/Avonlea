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
  const L = LENGUAJE.lugares, V = { pie: CH.marilla?.speed?.walk || 38, ...Object.fromEntries(Object.entries(SPEEDS).filter(([k]) => LENGUAJE.personas[k])), calesa: CARRO },   /* (a pie; los que tienen su paso en el juego —SPEEDS—, el suyo; en calesa) */ mapa = (x, y) => ({ mapa: [Math.round(x), Math.round(y)] });
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
  for (const [k, n] of [['pieza_marilla', 'la pieza de Marilla'], ['pieza_matthew', 'la pieza de Matthew'], ['sala', 'la sala de Tejas Verdes'], ['despensa', 'la despensa'], ['escalera', 'la escalera'], ['pasillo', 'el pasillo de arriba']]) lugar(k, n, [{ ...mapa(...DOOR.gg), adentro: 2 }], { plan: 'cocina', vista: 'cocina' });   // (el juego no las tiene: arriba, como la de Ana)
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
  // LOS TABLEROS (docs/lenguaje/comun/mundo.ts: tableros y planos): alrededor de una casa, cuadrantes del tamaño en que
  // dos se ponen a conversar (en el juego, afuera, están juntos a menos de 120 px: ese es el lado). Cada cuadrante es un
  // lugar del mundo, de una zona: la que tiene un cerco en el juego (AREAS), lo que cubre; los demás, la zona más cerca.
  // El nombre de la zona es su cuadrante principal. Debajo de un edificio del juego, no se pasa. La casa por dentro es su
  // plano. Aquí no se nombra ningún lugar: todo sale del lenguaje y del mapa del juego.
  const LADO = 120, TBs = LENGUAJE.tableros || {}, PLs = LENGUAJE.planos || {};
  if (Object.keys(TBs).length > 1) throw new Error('por ahora, un tablero');
  let tablero = null;
  for (const [casa, Td] of Object.entries(TBs)) {
    const TB = { x0: Td.origen[0], y0: Td.origen[1], cols: Td.cols, filas: Td.filas, c: LADO };
    const celdaDe = (x, y) => [Math.floor((x - TB.x0) / TB.c), Math.floor((y - TB.y0) / TB.c)], cid = ([i, j]) => 'c:' + i + ',' + j;
    const ZONAS = Td.zonas, ancla = {}, punto = z => P[alias[z] || z]?.[0]?.mapa;
    for (const z of ZONAS) { if (!punto(z)) throw new Error('el tablero: «' + z + '» no está en el mapa'); ancla[z] = celdaDe(...punto(z)); const otra = ZONAS.find(y => y !== z && ancla[y] && cid(ancla[y]) === cid(ancla[z])); if (otra) throw new Error('el tablero: ' + z + ' y ' + otra + ' caen en el mismo cuadrante'); }
    const nombreZona = Object.fromEntries(ZONAS.map(z => [z, L[z]?.nombre || INFO[z].nombre])), planZona = Object.fromEntries(ZONAS.map(z => [z, INFO[z]?.plan]));
    for (const z of ZONAS) { delete P[z]; delete INFO[z]; }
    const enTB = ([x, y], m = 60) => x >= TB.x0 - m && x <= TB.x0 + TB.cols * TB.c + m && y >= TB.y0 - m && y <= TB.y0 + TB.filas * TB.c + m;
    const cubre = (A, i, j) => { const x = TB.x0 + i * TB.c, y = TB.y0 + j * TB.c, w = Math.max(0, Math.min(x + TB.c, A.x + A.w) - Math.max(x, A.x)), h = Math.max(0, Math.min(y + TB.c, A.y + A.h) - Math.max(y, A.y)); return w * h / (TB.c * TB.c); };   // (cuánto del cuadrante cae adentro)
    // (lo que hay en el mapa del juego, en el tablero: las casas, el granero —los edificios—, los cercos, los caminos)
    const EDIFICIOS = [...Object.entries(HOUSES).map(([k, h]) => ({ que: 'casa', nombre: h.name, x: h.at.x - h.at.w / 2, y: h.at.y - 130, w: h.at.w, h: 130, puerta: DOOR[k] })),
      ...[BARN].map(b => ({ que: 'granero', nombre: 'el granero', x: b.x - b.w / 2, y: b.y - 110, w: b.w, h: 110 }))].filter(o => enTB([o.x + o.w / 2, o.y + o.h]));
    const CERCOS = Object.entries(AREAS).filter(([, A]) => enTB([A.x + A.w / 2, A.y + A.h / 2])).map(([k, A]) => ({ que: 'cerco', zona: k, nombre: A.name, x: A.x, y: A.y, w: A.w, h: A.h }));
    const zonaDe = (i, j) => { const c = CERCOS.find(A => ZONAS.includes(A.zona) && cubre(A, i, j) > .25); if (c) return c.zona;
      let m = null, d0 = Infinity; for (const z of ZONAS) if (!CERCOS.some(A => A.zona === z)) { const d = Math.hypot(ancla[z][0] - i, ancla[z][1] - j); if (d < d0) { d0 = d; m = z; } } return m; };
    for (let j = 0; j < TB.filas; j++) for (let i = 0; i < TB.cols; i++) {
      const z = zonaDe(i, j), id = cid([i, j]), bajo = EDIFICIOS.some(A => cubre(A, i, j) > .3);   // (debajo de un edificio: no se pasa, se rodea)
      P[id] = [{ ...mapa(TB.x0 + (i + .5) * TB.c, TB.y0 + (j + .5) * TB.c), celda: 1 }]; INFO[id] = { nombre: nombreZona[z], ...(planZona[z] ? { plan: planZona[z] } : {}), vista: z, celda: [i, j], zona: z, ...(bajo ? { edificio: true } : {}) };
    }
    for (const z of ZONAS) alias[z] = cid(ancla[z]);
    // (los muebles con su cuadrante —docs/lenguaje: mueblesDe, «en»—: contando desde el principal de su zona)
    const muebles = {};
    for (const [z, ms] of Object.entries(LENGUAJE.muebles || {})) if (ZONAS.includes(z)) for (const [m, d] of Object.entries(ms)) if (d && typeof d === 'object' && d.en) {
      const c = cid([ancla[z][0] + d.en[0], ancla[z][1] + d.en[1]]); if (INFO[c]?.zona !== z) throw new Error('el tablero: ' + z + '.' + m + ' cae fuera de su zona (' + c + ')'); muebles[z + '.' + m] = c; }
    // (el plano de la casa, como lo usa el mundo: cada pieza con su rectángulo; la puerta de afuera, a su cuadrante)
    const PLc = PLs[casa], plano = PLc && { pisos: PLc.pisos, piezas: Object.fromEntries(Object.entries(PLc.piezas).map(([k, p]) => [k, { piso: p.piso, x: p.en[0], y: p.en[1], w: p.en[2], h: p.en[3] }])),
      puertas: PLc.puertas, afuera: Object.fromEntries(Object.entries(PLc.afuera).map(([k, o]) => [k, { celda: alias[o.a] || o.a, en: o.en }])) };
    if (plano) for (const k of Object.keys(plano.piezas)) if (!INFO[k]) throw new Error('el plano: «' + k + '» no es un lugar del mundo');
    tablero = { ...TB, casa, plano, zonas: Object.fromEntries(ZONAS.map(z => [z, { nombre: nombreZona[z], ancla: cid(ancla[z]), ...(L[z]?.icono ? { icono: L[z].icono } : {}) }])), muebles,
      cosas: [...EDIFICIOS, ...CERCOS], caminos: paths.map(r => r.filter(p => enTB(p)).map(p => p.map(Math.round))).filter(r => r.length > 1) };   // (los caminos y los senderos a las puertas)
  }
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
    M[a][b] = Object.fromEntries(Object.keys(V).map(k => [k, Math.round(mejor(k === 'calesa' ? null : V[k]))]));   // (a pie, al paso de cada uno que tiene el suyo, y en calesa)
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
  console.log(`  ${Object.keys(G.lugares).length} lugares · ${G.tablero ? `el tablero de ${G.tablero.casa}: ${G.tablero.cols}×${G.tablero.filas} cuadrantes, ${G.tablero.plano ? Object.keys(G.tablero.plano.piezas).length + ' piezas por dentro' : 'sin plano'}` : 'sin tablero'} · a la escuela, a pie desde ${G.alias.tejas_verdes}: ${G.minutos[G.alias.tejas_verdes]?.escuela?.pie} min`);
})();
