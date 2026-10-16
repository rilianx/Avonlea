// Los días a prueba (del 1 al 3, cap. 2 a 8 del libro), jugados por jugadoras automáticas con estilos distintos: la
// obediente (se queda en casa, elige lo que más le gusta a Marilla), la rebelde (elige lo respondón), la insoportable (además
// sale en camisón donde los vecinos), la exploradora (sale a
// conocer a los vecinos y el pueblo), la fugitiva (se va antes del viaje a White Sands y vuelve de noche) y la
// encantadora (conversa con Matthew y con Marilla todo lo que puede), y la que empieza antes, en la estación de Bright
// River (el viaje con Matthew, cap. 2). Cada una en un navegador nuevo, desde la llegada
// hasta que Marilla decide (o Ana se va con la Sra. Blewett).
// Anota lo que oye (quién, qué, cuándo, dónde), las escenas que pasan, a quién conoce, y revisa, en lo que de verdad se
// dijo, las reglas que el modelo no puede ver jugando: nadie repite una frase el mismo día, ni vuelve a comentar lo
// mismo de ella (el camisón, la hora), nadie la llama por su
// nombre antes de conocerla, nadie habla de su futuro en Avonlea antes de que la acepten, y la historia termina a
// tiempo (el día 3 se queda, o se va). Salida: trazas/aprueba/aprueba.md y aprueba.json.
// Uso: node tools/aprueba.js [estilo,estilo…]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..'), OUT = path.join(RAIZ, 'trazas', 'aprueba'), URL = 'file://' + path.join(RAIZ, 'index.html') + '?dev';
const EXE = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
// [hora del día 2 o 3 (día:hora), adónde] — un lugar de PLACES (src/js), o 'casa'
const ESTILOS = {
  obediente: { elige: 'primera' },
  rebelde: { elige: 'ultima' },
  exploradora: { elige: 'primera', sale: [['1:7.5', 'hondonada_lynde'], ['1:9.5', 'cuesta_del_huerto'], ['1:11', 'casa'], ['1:15.5', 'granja_harrison'], ['1:17', 'casa'], ['2:8', 'aldea'], ['2:10', 'iglesia'], ['2:12', 'casa']] },
  fugitiva: { elige: 'ultima', sale: [['1:13', 'lago'], ['1:20.5', 'bosque_encantado'], ['2:9', 'aldea']], vuelve: false },
  encantadora: { elige: 'primera', conversa: true },
  bright_river: { elige: 'primera', inicio: 'estacion' },   // (begins earlier: at the station, the drive with Matthew, cap. 2)
  insoportable: { elige: 'ultima', sale: [['1:7', 'hondonada_lynde'], ['1:8.5', 'cuesta_del_huerto'], ['1:10.5', 'casa']] },   // (rude, and in her nightgown at the neighbours': can Marilla lose her patience?)
};
const PERIODO_FUTURO = /\b(escuela|escuela dominical|cuando seas grande|cuando crezcas|vas a ir a)\b/i;   // (her future here: not someone else's, «el año que viene voy a estudiar»)
async function jugar(nombre, E){
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
  const pg = await (await b.newContext({ viewport: { width: 900, height: 640 } })).newPage(); const errs = [];
  pg.on('pageerror', e => errs.push(e.message));
  await pg.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false }));
  await pg.goto(URL); await pg.waitForTimeout(1200);
  const ev = (s, a) => pg.evaluate(([s, a]) => { const v = window.__avonlea.ev(s); return typeof v === 'function' ? v(a) : v; }, [s, a]);
  await ev(`(() => { window.__oido = []; window.__escenas = []; window.__visto = {}; })()`);
  if (E.inicio === 'estacion') await ev(`(() => { const b = document.getElementById('antes'); b.click(); b.click(); })()`);
  // s seconds of game, listening: every new bubble, with who, when, where, and whether they knew her
  const correr = s => ev(`(s => { for (let k = 0; k < s * 30; k++) { update(1 / 30);
      for (const x of bubbles) if (x.q !== 'ana' && x.t < .05 && !x.__v && wmScene(String(x.q).replace(/^f:/, '')) === game.scene) { x.__v = 1; const q = String(x.q).replace(/^f:/, ''); window.__oido.push({ q, quien: wmName(q) || q, t: x.text, dia: today() + 1, hora: +hourNow().toFixed(2), escena: game.scene, conoce: conoceA(q), queda: !!dlgHechos().se_queda, reac: reacDeTexto(x.text) }); }
      for (const [id] of Object.entries(dlgDichas())) if (!window.__visto[id]) { window.__visto[id] = 1; window.__escenas.push({ id, dia: today() + 1, hora: +hourNow().toFixed(2) }); }
      if (TALKS.some(t => t.narra || t.elige) || document.querySelector('#talk:not([hidden]) button, #narra:not([hidden]) button')) return; } })`, s);
  const estado = () => ev(`(() => ({ dia: today(), hora: +hourNow().toFixed(2), escena: game.scene, sleeping, narra: !!document.querySelector('#narra:not([hidden]) button'),
      botones: [...document.querySelectorAll('#talk:not([hidden]) button')].map(b => b.innerText.trim()), queda: !!dlgHechos().se_queda, devuelta: !!dlgHechos().devuelta,
      final: !!game.final || !!document.querySelector('#final:not([hidden])') }))()`);
  const pend = [...(E.sale || [])]; const elecciones = []; let s, pasos = 0, quieto = 0, antes = null, pac = null;
  for (; pasos < 6000; pasos++) {
    s = await estado();
    if (s.devuelta || s.final || (s.queda && s.hora > 15) || s.dia >= 3 && s.hora > 20) break;
    if (pac === null && s.dia === 1 && s.hora >= 13.8) pac = await ev(`cualidad('marilla', 'paciencia', 'ana')`);   // (Marilla's patience as they leave for White Sands)
    if (s.sleeping) { await pg.waitForTimeout(300); continue; }
    if (s.narra) { await ev(`document.querySelector('#narra:not([hidden]) button').click()`); continue; }
    if (s.botones.length) {
      // what each option does to Marilla's patience and to who cares for her (the «! suma …» under it, in the script)
      const pts = await ev(`(B => { const ops = []; const ver = L => { for (const l of L || []) if (Array.isArray(l) && l[0] === '?') for (const op of l[2] || []) { ops.push(op); ver(op.lineas); } };
          for (const d of DIALOGOS) { try { ver(d.lineas()); } catch (e) {} }
          return B.map(b => { const t = b.replace(/^\\d+\\.\\s*/, ''), op = ops.find(o => o.texto === t); if (!op) return 0; let n = 0; for (const e of op.efectos) { const j = JSON.stringify(e); if (/paciencia|afecto/.test(j)) { const m = j.match(/(-?\\d+(\\.\\d+)?)\\D*$/); n += m ? +m[1] : 0; } } return n; }); })`, s.botones);
      const mejor = E.elige === 'ultima' ? Math.min(...pts) : Math.max(...pts), i = E.elige === 'ultima' ? pts.lastIndexOf(mejor) : pts.indexOf(mejor); elecciones.push({ dia: s.dia + 1, hora: s.hora, opciones: s.botones, puntos: pts, eligio: s.botones[i] });
      await ev(`(i => [...document.querySelectorAll('#talk:not([hidden]) button')][i].click())`, i); await correr(.5); continue;
    }
    // where she goes, when
    const p = pend[0]; if (p) { const [d, h] = p[0].split(':').map(Number); if (s.dia > d || (s.dia === d && s.hora >= h)) { pend.shift();
      await ev(`(k => { const P = k === 'casa' ? ['', GG.x, GG.y + 40] : PLACES[k]; if (P) goDest(P[1], P[2]); })`, p[1]); } }
    if (E.vuelve === false && s.hora > 21.4) await ev(`(() => { if (game.scene !== 'out') { goOut(); } })()`);
    if (E.conversa && s.dia >= 1 && pasos % 6 === 0) await ev(`(() => { for (const k of ['matthew', 'marilla']) { const C = convDisponibles(k)[0]; if (C && sceneOf(k) === game.scene) { conversar(C); return; } } })()`);
    await correr(4);
    const ahora = s.dia * 24 + s.hora; if (antes !== null && Math.abs(ahora - antes) < 1e-4) { if (++quieto > 40) { errs.push('el tiempo no avanza a las ' + s.hora + ' del día ' + (s.dia + 1)); quieto = -1e9; } } else quieto = 0; antes = ahora;
  }
  const r = await ev(`(() => ({ oido: window.__oido, escenas: window.__escenas, conoce: Object.keys(dlgHechos()).filter(h => /^conoce_/.test(h)).map(h => h.slice(7)), hechos: Object.keys(dlgHechos()),
     dia: today() + 1, hora: +hourNow().toFixed(2) }))()`);
  await b.close();
  // the rules, on what was really said
  const hall = [];
  const visto = new Map(); for (const o of r.oido) { const k = o.q + '|' + o.dia + '|' + o.t; if (visto.has(k) && o.hora - visto.get(k) > .05 && !/^\([^)]*\)$/.test(o.t) && o.t.replace(/\([^)]*\)/g, '').trim().split(/\s+/).length > 3) hall.push(`día ${o.dia} ${o.hora}: ${o.quien} repite «${o.t.slice(0, 70)}» (ya a las ${visto.get(k)})`); if (!visto.has(k)) visto.set(k, o.hora); }
  for (const o of r.oido) if (!o.conoce && /\b(Ana|Shirley)\b/.test(o.t.replace(/\([^)]*\)/g, '')) && !/Soy Ana|Ana Shirley,|¿Ana\?/.test(o.t)) hall.push(`día ${o.dia} ${o.hora}: ${o.quien} la llama por su nombre sin conocerla: «${o.t.slice(0, 80)}»`);
  const com = new Map(); for (const o of r.oido) for (const x of o.reac || []) { const k = o.q + '|' + o.dia + '|' + x; if (com.has(k) && o.hora - com.get(k).hora > .05) hall.push(`día ${o.dia} ${o.hora}: ${o.quien} vuelve a comentar ${x}: «${o.t.slice(0, 60)}» (ya a las ${com.get(k).hora}: «${com.get(k).t.slice(0, 40)}»)`); if (!com.has(k)) com.set(k, o); }
  for (const o of r.oido) if (!o.queda && PERIODO_FUTURO.test(o.t)) hall.push(`día ${o.dia} ${o.hora}: ${o.quien}, antes de que la acepten, habla de su futuro: «${o.t.slice(0, 80)}»`);
  if (!r.hechos.includes('se_queda') && !r.hechos.includes('devuelta')) hall.push(`la historia no terminó: día ${r.dia}, ${r.hora}, sin se_queda ni devuelta`);
  for (const e of errs) hall.push('ERROR ' + e);
  return { nombre, paciencia: pac, final: r.hechos.includes('se_queda') ? 'se queda' : r.hechos.includes('devuelta') ? 'se va con la Sra. Blewett' : 'sin decidir', dia: r.dia, hora: r.hora, conoce: r.conoce, escenas: r.escenas, oido: r.oido, elecciones, hallazgos: hall };
}
(async () => {
  const solo = process.argv[2] ? process.argv[2].split(',') : Object.keys(ESTILOS), res = [];
  for (const n of solo) { const r = await jugar(n, ESTILOS[n]); res.push(r); console.log(`${r.hallazgos.length ? '✘' : '✔'} ${n}: ${r.final} (día ${r.dia}, ${r.hora}) · conoce a ${r.conoce.length} · ${r.escenas.length} escenas · ${r.oido.length} frases oídas`); for (const h of r.hallazgos) console.log('   ' + h); }
  fs.mkdirSync(OUT, { recursive: true }); fs.writeFileSync(path.join(OUT, 'aprueba.json'), JSON.stringify(res, null, 1));
  const md = ['# Los días a prueba, jugados', '', 'Lo genera `node tools/aprueba.js`: jugadoras automáticas con estilos distintos, desde la llegada hasta que Marilla decide. Ver `docs/MODELO_INTERACCIONES.md`.', ''];
  for (const r of res) {
    md.push(`## ${r.nombre}: ${r.final} (día ${r.dia}, ${r.hora} h)`, '', `Paciencia de Marilla al salir a White Sands: ${r.paciencia ?? '—'} · conoció a: ${r.conoce.join(', ') || 'nadie'}`, '');
    md.push(r.hallazgos.length ? '**Hallazgos:**' : '**Sin hallazgos.**', '', ...r.hallazgos.map(h => '- ' + h), '');
    md.push('<details><summary>Escenas y elecciones</summary>', '', ...r.escenas.map(e => `- día ${e.dia} ${e.hora}: ${e.id}`), '', ...r.elecciones.map(e => `- día ${e.dia} ${e.hora}: eligió «${e.eligio}» (de ${e.opciones.length})`), '', '</details>', '');
    md.push('<details><summary>Lo que oyó</summary>', '', '| día | hora | dónde | quién | qué |', '|---|---|---|---|---|', ...r.oido.map(o => `| ${o.dia} | ${o.hora} | ${o.escena} | ${o.quien} | ${o.t.replace(/\|/g, '/').slice(0, 140)} |`), '', '</details>', '');
  }
  fs.writeFileSync(path.join(OUT, 'aprueba.md'), md.join('\n'));
  const n = res.reduce((a, r) => a + r.hallazgos.length, 0); console.log(`\n→ trazas/aprueba/aprueba.md · ${n} hallazgos`); process.exitCode = n ? 1 : 0;
})();
