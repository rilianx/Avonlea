// Lo que quedó de una noche (tools/noche.js), en corto, para juzgarlo a mano con la rúbrica (trazas/temas/rubrica.md):
// cada bloque aceptado con su texto entero, los rechazados en una línea, y los tokens del pedido y de la respuesta.
// Uso: node tools/prompts-muestra.js trazas/noche/plan-1 "plan · 1"
const fs = require('fs'), path = require('path'), [dir, titulo] = process.argv.slice(2);
const leer = f => { try { return JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); } catch (e) { return null; } };
const N = leer('noche.json'), R = leer('respuesta.json'), u = R?.usage || R?.respuesta?.usage || {};
const L = [`\n## ${titulo || dir}`, '', `tokens: pedido ${u.prompt_tokens ?? '?'} · respuesta ${u.completion_tokens ?? '?'} · aceptados ${N?.aceptados?.length ?? 0} de ${(N?.bloques || []).filter(b => b.ronda === 1).length}`];
if (!N) L.push('', '(no hubo informe: ' + dir + ')');
for (const b of N?.bloques || []) if (b.resultado !== 'aceptado') L.push(`- ✗ ${b.tipo} \`${b.id}\` (ronda ${b.ronda}): ${(b.motivos || []).join(' · ').slice(0, 200)}`);
for (const a of N?.aceptados || []) L.push('', `### ${a.id}`, '', `porque: ${a.porque}`, '', '```', a.texto, '```');
console.log(L.join('\n'));
