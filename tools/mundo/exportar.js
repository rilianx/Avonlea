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
  const P = {
    tejas_verdes: [mapa(GG.x, GG.y + 90)],
    cocina: [{ ...mapa(DOOR.gg[0], DOOR.gg[1]), adentro: 1 }],
    corral: [mapa(AREAS.corral.x + AREAS.corral.w / 2, AREAS.corral.y + AREAS.corral.h / 2)],
    hondonada_lynde: [mapa(...dlgLugar('hondonada'))],
    escuela: [mapa(...SCHOOL_DOOR)],
    aldea: [mapa(...dlgLugar('aldea'))],
    estanque_barry: [mapa(PLACES.lago[1], PLACES.lago[2])],
    camino_blanco: [mapa(...blanco), { camino: 'br', s: tramoDe('br', t => t.kind === 'avenida') }],
    newbridge: [{ camino: 'br', s: tramoDe('br', t => t.name === 'Newbridge') }],
    estacion_bright_river: [{ camino: 'br', s: 0, adentro: 1 }],
    camino_costa: [{ camino: 'costa', s: .6 }],
    playa: [{ camino: 'costa', s: WP_CAMINO.playa_ws[1] }],
    orilla: [mapa(PLACES.playa[1], PLACES.playa[2]), { camino: 'costa', s: WP_CAMINO.playa_ws[1], adentro: 2 }],   // (la de Avonlea, junto al faro; y bajar a la arena por el camino de la costa)
    hotel_white_sands: [{ camino: 'costa', s: WP_CAMINO.hotel_ws[1] }],
  };
  for (const l of Object.keys(L)) if (!P[l]) throw new Error('el exportador no sabe dónde está «' + l + '» (agrégalo a MEDIR)');
  // (por el mapa: lo que mide la red de caminos de Avonlea; si no hay red, en línea recta, un poco más)
  const largo = (a, b) => { const r = netRoute(a[0], a[1], b[0], b[1]); if (!r) return dist(a[0], a[1], b[0], b[1]) * 1.3; const pts = [a, ...r.pts, b]; let d = 0; for (let i = 1; i < pts.length; i++) d += dist(...pts[i - 1], ...pts[i]); return d; };
  // (por un camino largo, entre dos «s»: en calesa con el ritmo de cada tramo; a pie, al paso)
  const porCamino = (c, s0, s1, v) => enCamino(c, () => { const [a, b] = s0 < s1 ? [s0, s1] : [s1, s0]; if (v) return (b - a) * ROAD_LEN / v / MIN_S; let m = 0; for (let i = 0; i < ROAD_TRAMOS.length; i++) { const t0 = Math.max(a, ROAD_TRAMOS[i].s), t1 = Math.min(b, ROAD_TRAMOS[i + 1]?.s ?? 1); if (t1 > t0) m += (t1 - t0) * ROAD_LEN / (ROAD_V * (ROAD_TRAMOS[i].ritmo || 1)) / MIN_S; } return m; });
  const salida = c => caminoPuerta(c);
  // (los minutos entre dos puntos, a pie —v: la velocidad— o en calesa —v null—)
  function minutos(p, q, v){
    const vm = v || V.calesa, enMapa = (a, b) => largo(a, b) / vm / MIN_S;
    let m;
    if (p.mapa && q.mapa) m = enMapa(p.mapa, q.mapa);
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
  return JSON.stringify({ velocidades: V, minuto_de_juego_s: MIN_S, del_pueblo, puntos: P, minutos: M, caminos, dibujo });
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
  console.log(`  ejemplos: tejas_verdes → hotel_white_sands, en calesa ${G.minutos.tejas_verdes.hotel_white_sands.calesa} min; → estacion_bright_river ${G.minutos.tejas_verdes.estacion_bright_river.calesa} min; a la escuela a pie ${G.minutos.tejas_verdes.escuela.pie} min`);
})();
