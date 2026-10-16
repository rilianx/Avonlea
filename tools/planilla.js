// La planilla del juego (planilla/avonlea.xlsx): las frases de cada uno, para editar (y volver al juego con
// python3 tools/importar_planilla.py), y para mirar: dónde faltan frases (los huecos: cada personaje en cada momento
// de la historia), las escenas, las noticias, las llegadas, los hechos y las metas del cuaderno.
// Abre el juego por dentro (index.html?dev) para saber qué frases valen en cada momento, junta todo en
// trazas/planilla.json, y tools/planilla.py arma el .xlsx.
// Uso: node tools/build.js && NODE_PATH=… node tools/planilla.js
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const RAIZ = path.join(__dirname, '..'), URL = 'file://' + path.join(RAIZ, 'index.html') + '?dev';
const EXE = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
// los momentos de la historia (los hechos que ya pasaron, el día, la estación): una columna de la hoja «Huecos» cada uno
const BASE = { inicio_juego: 1, llegada_tv: 1, primera_noche: 1, desayuno_prueba: 2 };
const MOMENTOS = [
  { id: 'dia2', titulo: 'Día 2 · recién llegada, a prueba', dia: 2, estacion: 0, hechos: {} },
  { id: 'dia4', titulo: 'Día 4 · ya se queda', dia: 4, estacion: 0, hechos: { a_prueba: 2, se_queda: 3 } },
  { id: 'dia16', titulo: 'Día 16 · vino la Sra. Lynde', dia: 16, estacion: 1, hechos: { a_prueba: 2, se_queda: 3, lynde_visita: 15 } },
  { id: 'dia20', titulo: 'Día 20 · amiga de Diana', dia: 20, estacion: 1, hechos: { a_prueba: 2, se_queda: 3, lynde_visita: 15, llego_diana: 18, barry_presenta: 18, conocidas_diana: 19 }, metas: { amigas: 19 } },
  { id: 'dia33', titulo: 'Día 33 · va a la escuela', dia: 33, estacion: 2, hechos: { a_prueba: 2, se_queda: 3, lynde_visita: 15, llego_diana: 18, barry_presenta: 18, conocidas_diana: 19, llego_gilbert: 32 }, metas: { amigas: 19, escuela: 28, escuela_dominical: 22 } },
  { id: 'dia45', titulo: 'Día 45 · primer invierno', dia: 45, estacion: 3, hechos: { a_prueba: 2, se_queda: 3, lynde_visita: 15, llego_diana: 18, barry_presenta: 18, conocidas_diana: 19, llego_gilbert: 32, llego_josephine: 43 }, metas: { amigas: 19, escuela: 28, escuela_dominical: 22 } },
  { id: 'dia65', titulo: 'Día 65 · llegan los Allan', dia: 65, estacion: 0, hechos: { a_prueba: 2, se_queda: 3, lynde_visita: 15, llego_diana: 18, barry_presenta: 18, conocidas_diana: 19, llego_gilbert: 32, llego_josephine: 43, se_fue_josephine: 57, llego_allan: 64, llego_sraallan: 64 }, metas: { amigas: 19, escuela: 28, escuela_dominical: 22 } },
  { id: 'dia86', titulo: 'Día 86 · la Srta. Stacy', dia: 86, estacion: 2, hechos: { a_prueba: 2, se_queda: 3, lynde_visita: 15, llego_diana: 18, barry_presenta: 18, conocidas_diana: 19, llego_gilbert: 32, llego_josephine: 43, se_fue_josephine: 57, llego_allan: 64, llego_sraallan: 64, se_fue_phillips: 71, se_fue_prissy: 71, llego_stacy: 85 }, metas: { amigas: 19, escuela: 28, escuela_dominical: 22 }, estudio: 30 },
];
(async () => {
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] }); const pg = await b.newPage(); const errs = [];
  pg.on('pageerror', e => errs.push(e.message));
  await pg.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
  await pg.goto(URL); await pg.waitForTimeout(1500);
  const ev = (s, a) => pg.evaluate(([s, a]) => { const v = window.__avonlea.ev(s); return typeof v === 'function' ? v(a) : v; }, [s, a]);
  // quiénes: la gente de la casa, la del pueblo con nombre, y los vecinos sin nombre (grandes y chicos)
  const gente = await ev(`(() => [...Object.keys(CH).map(k => ({ id: k, nombre: (CH[k].article || '') + NAMES[k], grupo: 'casa', presenta: !!CH[k].presentacion, vive: CH[k].home, ficha: (CH[k].voice || '').slice(0, 160) })),
    ...Object.entries(FOLK_DEFS).filter(([k]) => !/^v\\d+$/.test(k)).map(([k, d]) => ({ id: k, nombre: d.name, grupo: d.kind === 'alumno' ? 'niños' : 'pueblo', presenta: !!d.presenta, vive: d.home, ficha: (fichaOf(k)?.ficha || '').slice(0, 160) })),
    { id: 'vecino', nombre: 'un vecino (sin nombre)', grupo: 'vecinos', vive: '', ficha: 'los vecinos del pueblo que no tienen nombre' }, { id: 'niño', nombre: 'un niño (sin nombre)', grupo: 'vecinos', vive: '', ficha: 'los niños del pueblo que no tienen nombre' }])()`);
  // los huecos: en cada momento, cuántas frases valen de cada uno, si todavía no conoce a Ana y si ya la conoce
  const huecos = {};
  for (const M of MOMENTOS) {
    huecos[M.id] = await ev(`(M => {
      const H = dlgHechos(); for (const k of Object.keys(H)) delete H[k]; Object.assign(H, ${JSON.stringify(BASE)}, M.hechos);
      const P = game.wm.perm ||= {}; for (const k of Object.keys(P)) if (k.startsWith('cuaderno:')) delete P[k]; for (const [m, d] of Object.entries(M.metas || {})) P['cuaderno:' + m] = d;
      ((game.wm.num ||= {}).ana ||= {}).estudio = M.estudio || 0;
      dayT = M.dia - 1 + 5 / 24; game.seasonShift = ((M.estacion - Math.floor(dayT / DIAS_ESTACION)) % 4 + 4) % 4; S = M.estacion;
      const out = {};
      for (const k of [...Object.keys(CH), ...Object.keys(FOLK_DEFS).filter(k => !/^v\\d+$/.test(k)), 'vecino', 'niño']) {
        const L = (FRASES[k]?.dice || []).concat(CH[k] ? [CH[k].seasonLines[S]].filter(Boolean) : []);
        if (ausente(k)) { out[k] = { fuera: true }; continue; }
        const con = H['conoce_' + k]; delete H['conoce_' + k];
        const sin = lineasSi(L).filter(t => t && !/\\b(Ana|Shirley)\\b/.test(t)).length;   // (one who does not know her: not by name)
        H['conoce_' + k] = M.dia - 1; const conA = lineasSi(L).filter(Boolean).length;
        if (con == null) delete H['conoce_' + k]; else H['conoce_' + k] = con;
        out[k] = { sin: ['vecino', 'niño'].includes(k) || !CONOCE_BASE.includes(k) ? sin : null, con: conA };
      }
      return out; })`, M);
  }
  const casas = await ev(`Object.entries(HOUSES).filter(([, h]) => !h.road).map(([k, h]) => ({ id: k, nombre: h.name, viven: vivenEn(k) }))`);
  const escenas = await ev(`DIALOGOS.map(d => ({ id: d.id, canal: d.canal, disparo: d.disparo || '', prioridad: d.prioridad, interrumpe: !!d.interrumpe, grande: !!d.grande, repetir: typeof d.repetir === 'string' ? d.repetir : 'cada ' + (d.repetir?.cada || ''), si: [].concat(d.si || []).join(', '), en: Object.entries(d.en || {}).map(([k, v]) => k + '=' + v).join(', '), hablan: (() => { try { return d.hablan().join(', '); } catch (e) { return ''; } })(), lineas: (() => { try { return d.lineas().length; } catch (e) { return 0; } })(), primera: (() => { try { const l = d.lineas().find(l => !['!', '?'].includes(l[0])); return l ? l[0] + ': ' + l[1] : ''; } catch (e) { return ''; } })() }))`);
  const noticias = await ev(`NOTICIAS.map(n => ({ id: n.id, titulo: n.titulo, saben: n.saben.map(g => (g.si.length ? '[' + g.si.join(', ') + '] ' : '') + g.quien.join(', ')).join(' · '), alConocer: !!n.alConocer, llega: n.llega.map(l => l.quien + ' en ' + l.horas + ' h').join(', '), cuentaPor: n.cuentaPor || '', versiones: 1 + n.exagerada.length, dice: n.dice[0] || Object.values(n.diceDe)[0]?.[0] || '', exagerada: n.exagerada.join(' / ') }))`);
  const llegadas = await ev(`Object.entries(LLEGADAS).map(([k, e]) => ({ id: k, visita: e.visita, llega: e.llega.map(g => g.join(', ')).join(' · o · '), seVa: e.seVa.map(g => g.join(', ')).join(' · o · '), alLlegar: e.alLlegar, alIrse: e.alIrse }))`);
  const metas = await ev(`(typeof CUADERNO !== 'undefined' ? CUADERNO : []).flatMap(g => g.metas.map(m => ({ grupo: g.nombre, id: m.id, titulo: m.titulo || m.id, requiere: (m.requiere || []).join ? (m.requiere || []).join(', ') : String(m.requiere || ''), pista: m.pista || '' })))`).catch(() => []);
  await b.close();
  const grafo = JSON.parse(fs.readFileSync(path.join(RAIZ, 'trazas/grafo.json'), 'utf8'));
  const datos = { casas, generado: new Date().toISOString().slice(0, 16).replace('T', ' '), momentos: MOMENTOS.map(m => ({ id: m.id, titulo: m.titulo })), gente, huecos, escenas, noticias, llegadas, metas, grafo, errores: errs };
  fs.writeFileSync(path.join(RAIZ, 'trazas/planilla.json'), JSON.stringify(datos, null, 1));
  if (errs.length) console.log('errores del juego:', errs.join(' | '));
  execFileSync('python3', [path.join(__dirname, 'planilla.py')], { stdio: 'inherit' });
})();
