// Lo que quedó de una noche (tools/noche.js), en corto, para juzgarlo a mano con la rúbrica (trazas/temas/rubrica.md):
// cada bloque aceptado con su texto entero, los rechazados en una línea, y los tokens del pedido y de la respuesta.
// Uso: node tools/prompts-muestra.js trazas/noche/plan-1 "plan · 1"
//      node tools/prompts-muestra.js --resumen trazas/noche/plan-1 trazas/noche/plan-2 … (la nota del juez de comparación, por versión)
const fs = require('fs'), path = require('path'), [dir, titulo] = process.argv.slice(2);
if (dir === '--resumen') {   // (versions: the name of the folder without its «-n»)
  const V = {};
  for (const d of process.argv.slice(3)) { let N = null; try { N = JSON.parse(fs.readFileSync(path.join(d, 'noche.json'), 'utf8')); } catch (e) {}
    const v = path.basename(d).replace(/-\d+$/, ''), x = (V[v] ||= { noches: 0, escenas: 0, suma: 0, modelo: '' }); x.noches++;
    for (const n of Object.values(N?.compara?.notas || {})) if (n != null) { x.escenas++; x.suma += n; } if (N?.compara?.modelo) x.modelo = N.compara.modelo; }
  console.log(['', '## Comparación (juez barato)', '', '| Versión | Noches | Escenas que quedan | Nota media del juez (de 18) |', '|---|---|---|---|',
    ...Object.entries(V).map(([v, x]) => `| ${v} | ${x.noches} | ${x.escenas} | ${x.escenas ? (x.suma / x.escenas).toFixed(2) : '—'} |`), '', `(juez: ${Object.values(V).map(x => x.modelo).find(Boolean) || '—'})`].join('\n'));
  process.exit(0);
}
const leer = f => { try { return JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); } catch (e) { return null; } };
const N = leer('noche.json'), R = leer('respuesta.json'), u = R?.usage || R?.respuesta?.usage || {};
const L = [`\n## ${titulo || dir}`, '', `tokens: pedido ${u.prompt_tokens ?? '?'} · respuesta ${u.completion_tokens ?? '?'} · aceptados ${N?.aceptados?.length ?? 0} de ${(N?.bloques || []).filter(b => b.ronda === 1).length}${N?.juez && !N.juez.error ? ' · juez: ' + (N.juez.tokens || '?') + ' tokens' : ''}`];
if (!N) L.push('', '(no hubo informe: ' + dir + ')');
const J = Object.fromEntries((N?.bloques || []).filter(b => b.juicio).map(b => [b.id, b.juicio]));
if (N?.compara) L.push(N.compara.error ? `juez de comparación: no pudo (${N.compara.error})` : `juez de comparación (${N.compara.modelo}): ${N.compara.media.toFixed(1)} de 18`);
if (N?.juez) L.push(N.juez.error ? `juez: no pudo (${N.juez.error})` : `juez: ${N.juez.modelo} · nota media de los elegidos ${(N.juez.elegidos.reduce((a, id) => a + (J[id]?.total || 0), 0) / (N.juez.elegidos.length || 1)).toFixed(1)}, de todos los aceptados ${(Object.values(J).reduce((a, j) => a + j.total, 0) / (Object.keys(J).length || 1)).toFixed(1)} (de 18)`);
for (const b of N?.bloques || []) if (b.resultado === 'rechazado') L.push(`- ✗ ${b.tipo} \`${b.id}\` (ronda ${b.ronda}): ${(b.motivos || []).join(' · ').slice(0, 200)}`);
for (const b of N?.bloques || []) if (b.resultado === 'no elegido') L.push(`- ○ no elegido \`${b.id}\`: ${b.juicio ? b.juicio.total + '/18 (' + b.juicio.notas.join(' ') + ') ' + b.juicio.razones.slice(0, 160) : ''}`);
for (const a of N?.aceptados || []) L.push('', `### ${a.id}`, '', `porque: ${a.porque}`, ...(J[a.id] ? ['', `juez: ${J[a.id].total}/18 (${J[a.id].notas.join(' ')}) — ${J[a.id].razones}`] : []), '', '```', a.texto, '```');
console.log(L.join('\n'));
