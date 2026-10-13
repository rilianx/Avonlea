#!/usr/bin/env node
// The audit of the actions: for each one, what should happen (tools/auditoria/esperado.js) against what does happen,
// told by the game itself (the relato, src/js/66-relato.js). Writes a report with each tale, each step (✔ when and how
// long, or ✘ what was seen instead) and the whole account.
//   node tools/auditoria.js [ids...]     → trazas/auditoria.md
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..'), ESP = require('./auditoria/esperado.js');
const pedidos = process.argv.slice(2).map(Number), lista = pedidos.length ? ESP.filter(e => pedidos.includes(e.id)) : ESP;
const minutos = t => t * 24 * 60, hh = m => String(Math.floor((m / 60 + 6) % 24)).padStart(2, '0') + ':' + String(Math.floor(m % 60)).padStart(2, '0');
const CAMPOS = ['lugar', 'junto', 'postura', 'accion', 'lleva', 'objeto', 'tiene', 'pelo', 'dice'];
const cumple = (paso, e) => e && e.quien === paso.quien && CAMPOS.every(f => !paso[f] || paso[f].test(e[f] || ''));
// each step in order: the first moment it is seen after the previous one; and how long it lasted (until it is not so)
function comparar(esp, lineas){
  let desde = 0; const out = [];
  for (const p of esp.pasos) {
    const i = lineas.findIndex((l, j) => j >= desde && cumple(p, l.estado));
    if (i < 0) {
      const visto = [...lineas].reverse().find(l => l.estado?.quien === p.quien && !l.estado.dice);   // (what she was like at the end, to compare)
      out.push({ ok: false, p, nota: 'no ocurrió' + (visto ? ' (al final: ' + [visto.estado.lugar + (visto.estado.junto ? ', junto a ' + visto.estado.junto : ''), visto.estado.postura, visto.estado.accion, visto.estado.objeto && 'con ' + visto.estado.objeto, visto.estado.tiene && 'tiene ' + visto.estado.tiene].filter(Boolean).join(' · ') + ')' : '') });
      continue;
    }
    const t0 = minutos(lineas[i].t); let t1 = null;
    for (let j = i + 1; j < lineas.length; j++) if (lineas[j].estado?.quien === p.quien && !lineas[j].estado.dice && !cumple(p, lineas[j].estado)) { t1 = minutos(lineas[j].t); break; }
    const dura = t1 == null ? null : t1 - t0, corto = p.dura && dura != null && dura < p.dura;
    out.push({ ok: !corto, p, nota: hh(t0) + (dura != null ? ', ' + Math.round(dura) + ' min' : ', hasta el final') + (corto ? ' (se esperaban al menos ' + p.dura + ')' : '') });
    desde = i + 1;
  }
  return out;
}
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
  const md = ['# Auditoría de las acciones', '', 'Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.', ''];
  let bien = 0, total = 0; const hechos = new Array(lista.length);
  const correr = async (esp, n) => {
    const pg = await b.newPage(); const errs = []; pg.on('pageerror', e => errs.push(e.message));
    await pg.addInitScript(() => { localStorage.clear(); localStorage.setItem('avonlea-ai-asked', '1'); });
    await pg.goto('file://' + path.join(root, 'index.html'), { timeout: 0 }); await pg.waitForFunction(() => window.__avonlea, null, { timeout: 0 });
    const r = await pg.evaluate(([id, q]) => { const A = window.__avonlea; document.getElementById('ai').hidden = true; const ag = A.wmRunTest(id); A.relatoEmpezar(q);
      for (let t = 0; t < 3600 && (ag.st === 'run' || ag.st === 'pausa'); t += .5) A.step(.5); for (let k = 0; k < 20; k++) A.step(.5);
      return { st: ag.st, lineas: A.relato() }; }, [esp.id, esp.quienes]);
    const res = comparar(esp, r.lineas), out = []; hechos[n] = { res, out };
    out.push('## ' + esp.titulo + ' (meta ' + esp.id + ': ' + (r.st === 'done' ? 'cumplida' : r.st) + ')', '', '**Lo que debería pasar:** ' + esp.relato, '');
    for (const x of res) out.push('- ' + (x.ok ? '✔' : '✘') + ' ' + x.p.texto + ' — ' + x.nota);
    out.push('', '<details><summary>Lo que el juego cuenta que pasó (' + r.lineas.length + ' líneas)</summary>', '', '```', ...r.lineas.map(l => l.hora + ' ' + l.texto), '```', '</details>', '');
    console.log(esp.titulo + ': ' + res.filter(x => x.ok).length + '/' + res.length + (errs.length ? ' · errores: ' + errs.slice(0, 2).join(' | ') : ''));
    await pg.close();
  };
  let sig = 0; await Promise.all(Array.from({ length: Math.min(4, lista.length) }, async () => { while (sig < lista.length) { const n = sig++; await correr(lista[n], n); } }));   // (4 at a time; the report in order)
  for (const h of hechos) { bien += h.res.filter(x => x.ok).length; total += h.res.length; md.push(...h.out); }
  md.splice(3, 0, '**Pasos que ocurren como deberían: ' + bien + ' de ' + total + '.**', '');
  fs.writeFileSync(path.join(root, 'trazas', 'auditoria.md'), md.join('\n') + '\n');
  console.log('→ trazas/auditoria.md · ' + bien + '/' + total + ' pasos');
  await b.close();
})();
