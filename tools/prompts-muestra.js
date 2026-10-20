// Lo que quedó de una noche (tools/noche.js), en corto, para juzgarlo a mano con la rúbrica (trazas/temas/rubrica.md):
// cada bloque aceptado con su texto entero, los rechazados en una línea, y los tokens del pedido y de la respuesta.
// Uso: node tools/prompts-muestra.js trazas/noche/plan-1 "plan · 1"
const fs = require('fs'), path = require('path'), [dir, titulo] = process.argv.slice(2);
const leer = f => { try { return JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); } catch (e) { return null; } };
const N = leer('noche.json'), R = leer('respuesta.json'), u = R?.usage || R?.respuesta?.usage || {};
const L = [`\n## ${titulo || dir}`, '', `tokens: pedido ${u.prompt_tokens ?? '?'} · respuesta ${u.completion_tokens ?? '?'} · aceptados ${N?.aceptados?.length ?? 0} de ${(N?.bloques || []).filter(b => b.ronda === 1).length}${N?.juez && !N.juez.error ? ' · juez: ' + (N.juez.tokens || '?') + ' tokens' : ''}`];
if (!N) L.push('', '(no hubo informe: ' + dir + ')');
const J = Object.fromEntries((N?.bloques || []).filter(b => b.juicio).map(b => [b.id, b.juicio]));
if (N?.juez) L.push(N.juez.error ? `juez: no pudo (${N.juez.error})` : `juez: ${N.juez.modelo} · nota media de los elegidos ${(N.juez.elegidos.reduce((a, id) => a + (J[id]?.total || 0), 0) / (N.juez.elegidos.length || 1)).toFixed(1)}, de todos los aceptados ${(Object.values(J).reduce((a, j) => a + j.total, 0) / (Object.keys(J).length || 1)).toFixed(1)} (de 18)`);
for (const b of N?.bloques || []) if (b.resultado === 'rechazado') L.push(`- ✗ ${b.tipo} \`${b.id}\` (ronda ${b.ronda}): ${(b.motivos || []).join(' · ').slice(0, 200)}`);
for (const b of N?.bloques || []) if (b.resultado === 'no elegido') L.push(`- ○ no elegido \`${b.id}\`: ${b.juicio ? b.juicio.total + '/18 (' + b.juicio.notas.join(' ') + ') ' + b.juicio.razones.slice(0, 160) : ''}`);
for (const a of N?.aceptados || []) L.push('', `### ${a.id}`, '', `porque: ${a.porque}`, ...(J[a.id] ? ['', `juez: ${J[a.id].total}/18 (${J[a.id].notas.join(' ')}) — ${J[a.id].razones}`] : []), '', '```', a.texto, '```');
console.log(L.join('\n'));
