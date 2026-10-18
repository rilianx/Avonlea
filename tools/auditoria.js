#!/usr/bin/env node
// The audit of the actions: for each one, what should happen (tools/auditoria/esperado.js) against what does happen,
// told by the game itself (the relato, src/js/66-relato.js). Writes a report with each tale, each step (✔ when and how
// long, or ✘ what was seen instead) and the whole account.
//   node tools/auditoria.js [--veces N] [ids...]     → trazas/auditoria.md
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..'), ESP = require('./auditoria/esperado.js');
const argv = process.argv.slice(2), vi = argv.indexOf('--veces'), VECES = vi >= 0 ? +argv.splice(vi, 2)[1] : 1;   // (--veces N: each action N times, to tell what always fails from what fails by chance)
const pedidos = argv.map(Number), lista = pedidos.length ? ESP.filter(e => pedidos.includes(e.id)) : ESP;
const minutos = t => t * 24 * 60, hh = m => String(Math.floor((m / 60 + 6) % 24)).padStart(2, '0') + ':' + String(Math.floor(m % 60)).padStart(2, '0');
const CAMPOS = ['lugar', 'junto', 'postura', 'accion', 'lleva', 'objeto', 'tiene', 'pelo', 'guia', 'dice'];
const cumple = (paso, e) => e && e.quien === paso.quien && CAMPOS.every(f => !paso[f] || paso[f].test(e[f] || '')) && (!paso.donde || paso.donde.test(e.lugar + ' · ' + e.junto));   // (donde: the room or what she is next to, inside or at the door)
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
    const acc = lineas[i].estado.accion;   // (while the same action goes on, its in-betweens (walking from spot to spot, sitting down again) do not cut it)
    for (let j = i + 1; j < lineas.length; j++) { const e = lineas[j].estado; if (e?.quien === p.quien && !e.dice && !e.resumen && !cumple(p, e) && !(acc && e.accion === acc)) { t1 = minutos(lineas[j].t); break; } }
    const dura = t1 == null ? null : t1 - t0, corto = p.dura && dura != null && dura < p.dura;
    out.push({ ok: !corto, p, nota: hh(t0) + (dura != null ? ', ' + Math.round(dura) + ' min' : ', hasta el final') + (corto ? ' (se esperaban al menos ' + p.dura + ')' : '') });
    desde = i + 1;
  }
  return out;
}
// the rules that must always hold (src/js/66-relato.js, RELATO_REGLAS): each time one is broken (a stretch of lines in
// which it does not hold, for one person), with the first line where it happened
function reglasRotas(lineas){
  const activa = {}, out = {};
  let antes = null;
  for (const l of lineas) { const e = l.estado; if (!e || e.dice) continue; if (e.regla) { const k = Object.keys(out).find(r => !out[r].visto && out[r].primera?.startsWith(l.hora)); if (k) { out[k].visto = 1; out[k].primera = l.hora + ' ' + l.texto + (antes ? ' (antes: ' + antes + ')' : ''); continue; } }   // (a warning with no summary after it, at the very end: it counts too) antes = l.hora + ' ' + l.texto;
    const mal = (e._mal || '').split(',').filter(Boolean);
    for (const r of mal) { const k = e.quien + '|' + r; if (!activa[k]) { activa[k] = true; (out[r] ||= { n: 0, primera: l.hora + ' ' + l.texto }).n++; } }
    for (const k of Object.keys(activa)) if (k.startsWith(e.quien + '|') && !mal.includes(k.split('|')[1])) delete activa[k]; }
  return out;
}
let REGLAS = [];
// a line of the tale as plain text: the hour in bold, each on its own line; the summaries every 5 minutes in italics
const relatoMd = l => { const t = l.texto.replace(/([*_\\`<>])/g, '\\$1'); return '**' + l.hora + '** ' + (t.startsWith('· ') ? '_' + t + '_' : t) + '  '; };
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
  const md = ['# Auditoría de las acciones', '', (VECES > 1 ? 'Cada acción se corrió ' + VECES + ' veces; un paso está ✔ solo si salió bien todas. ' : '') + 'Para cada acción: lo que debería pasar (el relato esperado, `tools/auditoria/esperado.js`), cada paso comparado con lo que el juego cuenta que pasó (✔ a qué hora y cuánto duró, ✘ qué se vio en cambio), y el relato completo del juego (`src/js/66-relato.js`). Se genera con `node tools/auditoria.js`.', ''];
  let bien = 0, total = 0; const hechos = new Array(lista.length);
  const una = async esp => {
    const pg = await b.newPage(); const errs = []; pg.on('pageerror', e => errs.push(e.message));
    await pg.addInitScript(() => { localStorage.clear(); localStorage.setItem('avonlea-oficios', 'diestra'); });   // (Ana knows her crafts: the chains are tested, not the learning)
    await pg.goto('file://' + path.join(root, 'index.html'), { timeout: 0 }); await pg.waitForFunction(() => window.__avonlea, null, { timeout: 0, polling: 100 });
    const r = await pg.evaluate(([id, q]) => { const A = window.__avonlea; document.getElementById('ajustes').hidden = true; const ag = A.wmRunTest(id); A.relatoEmpezar(q);
      for (let t = 0; t < 3600 && (ag.st === 'run' || ag.st === 'pausa'); t += .5) A.step(.5); for (let k = 0; k < 20; k++) A.step(.5);
      return { st: ag.st, lineas: A.relato(), reglas: A.reglas() }; }, [esp.id, esp.quienes]);
    await pg.close(); REGLAS = r.reglas; return { ...r, res: comparar(esp, r.lineas), rotas: reglasRotas(r.lineas), errs };
  };
  const correr = async (esp, n) => {
    const vs = []; for (let v = 0; v < VECES; v++) vs.push(await una(esp));
    const r = vs.find(x => x.res.some(y => !y.ok)) || vs.find(x => Object.keys(x.rotas).length) || vs[0];   // (the account shown: a run where something failed, if any)
    const res = esp.pasos.map((p, k) => { const bien = vs.filter(x => x.res[k].ok).length, mal = vs.find(x => !x.res[k].ok); return { ok: bien === VECES, p, nota: (VECES > 1 ? bien + ' de ' + VECES + ' veces · ' : '') + (mal || vs[0]).res[k].nota }; });
    const out = []; hechos[n] = { res, out };
    out.push('## ' + esp.titulo + ' (meta ' + esp.id + ': ' + vs.map(x => x.st === 'done' ? 'cumplida' : x.st).join(', ') + ')', '', '**Lo que debería pasar:** ' + esp.relato, '');
    for (const x of res) out.push('- ' + (x.ok ? '✔' : '✘') + ' ' + x.p.texto + ' — ' + x.nota);
    const rotas = {}; for (const x of vs) for (const [r, o] of Object.entries(x.rotas)) { (rotas[r] ||= { veces: 0, n: 0, primera: o.primera }).veces++; rotas[r].n += o.n; }
    hechos[n].rotas = Object.keys(rotas).length;
    out.push('', Object.keys(rotas).length ? '**Reglas que no se cumplieron:**' : '**Reglas:** ✔ se cumplieron todas, siempre.');
    for (const [r, o] of Object.entries(rotas)) out.push('- ⚠ ' + (REGLAS.find(x => x[0] === r)?.[1] || r) + ' — ' + (VECES > 1 ? 'en ' + o.veces + ' de ' + VECES + ' veces, ' : '') + o.n + (o.n === 1 ? ' vez' : ' veces') + ' (la primera: ' + o.primera + ')');
    out.push('', '<details><summary>Lo que el juego cuenta que pasó (' + r.lineas.length + ' líneas)</summary>', '', ...r.lineas.map(relatoMd), '', '</details>', '');
    const errs = vs.flatMap(x => x.errs);
    console.log(esp.titulo + ': ' + res.filter(x => x.ok).length + '/' + res.length + (hechos[n].rotas ? ' · reglas rotas: ' + Object.keys(rotas).join(', ') : '') + (errs.length ? ' · errores: ' + errs.slice(0, 2).join(' | ') : ''));
  };
  let sig = 0; await Promise.all(Array.from({ length: Math.min(4, lista.length) }, async () => { while (sig < lista.length) { const n = sig++; await correr(lista[n], n); } }));   // (4 at a time; the report in order)
  for (const h of hechos) { bien += h.res.filter(x => x.ok).length; total += h.res.length; md.push(...h.out); }
  const conRotas = hechos.filter(h => h.rotas).length;
  md.splice(3, 0, '**Pasos que ocurren como deberían: ' + bien + ' de ' + total + '.** **Acciones en que alguna regla no se cumplió: ' + conRotas + ' de ' + hechos.length + '.**', '', '**Las reglas que siempre deben cumplirse**, se haga lo que se haga (se revisan en cada línea del relato): ' + REGLAS.map(r => r[1]).join('; ') + '.', '');
  fs.writeFileSync(path.join(root, 'trazas', 'auditoria.md'), md.join('\n') + '\n');
  console.log('→ trazas/auditoria.md · ' + bien + '/' + total + ' pasos · reglas rotas en ' + conRotas + ' de ' + hechos.length + ' acciones');
  await b.close();
})();
