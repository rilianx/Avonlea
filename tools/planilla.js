// La planilla del juego (planilla/avonlea.xlsx): las frases de cada uno, para editar (y volver al juego con
// python3 tools/importar_planilla.py), y para mirar: dónde faltan frases (los huecos: cada personaje en cada momento
// de la historia), las escenas, las noticias, las llegadas, los hechos y las metas del cuaderno.
// Abre el juego por dentro (index.html?dev) para saber qué frases valen en cada momento, junta todo en
// trazas/planilla.json, y tools/planilla.py arma el .xlsx.
// Uso: node tools/build.js && NODE_PATH=… node tools/planilla.js
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const RAIZ = path.join(__dirname, '..'), URL = 'file://' + path.join(RAIZ, 'index.html') + '?dev';
const EXE = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
const { BASE, MOMENTOS, PREPARAR } = require('./momentos');
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
      const H = (${PREPARAR})(M);
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
  const escenas = await ev(`DIALOGOS.map(d => ({ id: d.id, canal: d.canal, disparo: d.disparo || '', prioridad: d.prioridad, interrumpe: !!d.interrumpe, grande: !!d.grande, repetir: typeof d.repetir === 'string' ? d.repetir : 'cada ' + (d.repetir?.cada || ''), si: [].concat(d.si || []).join(', '), en: Object.entries(d.en || {}).map(([k, v]) => k + '=' + v).join(', '), hablan: (() => { try { return d.hablan().join(', '); } catch (e) { return ''; } })(), lineas: (() => { try { return d.lineas().length; } catch (e) { return 0; } })(), primera: (() => { try { const l = d.lineas().find(l => !['!', '?'].includes(l[0])); return l ? l[0] + ': ' + l[1] : ''; } catch (e) { return ''; } })(), quienes: (d.quienes || []).map(String), con: d.con || '', una_vez: d.repetir === 'una_vez', texto: (() => { try { return d.lineas().filter(l => !['!', '?'].includes(l[0])).map(l => l[0] + ': ' + l[1]); } catch (e) { return []; } })() }))`);
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
