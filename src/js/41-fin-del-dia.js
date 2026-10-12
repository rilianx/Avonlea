/* ---------- the end of the day: each one thinks it over (the AI): what changed between them, and what stays ---------- */
const reflectSchema = () => ({ type: 'object', additionalProperties: false, required: ['relaciones', 'impresiones'], properties: {
  relaciones: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['de', 'a', 'cambio', 'nota'], properties: { de: { type: 'string', enum: NODES() }, a: { type: 'string', enum: NODES() }, cambio: { type: 'integer' }, nota: { type: 'string' } } } },
  impresiones: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['quien', 'texto'], properties: { quien: { type: 'string', enum: Object.keys(CH) }, texto: { type: 'string' } } } } } });
async function reflectDay(dayNum){
  const ev = game.journal.filter(e => e.d === dayNum).slice(-40);
  if (!ev.length) return;
  const msg = `FIN DEL DÍA ${dayNum} en Avonlea (${SEASONS[S].toLowerCase()}).\n\nLO QUE PASÓ HOY (el diario):\n${ev.map(e => '- ' + e.t).join('\n')}`
    + `\n\nLO QUE CADA UNO SABE DE HOY:\n${Object.keys(CH).map(k => `- ${NAMES[k]}: ${(game.know[k] || []).filter(e => e.d === dayNum).slice(-8).map(e => e.t).join(' / ') || '(nada)'}`).join('\n')}`
    + `\n\nLAS RELACIONES AHORA (de cada uno hacia los demás, de 0 a 5):\n${NODES().map(f => `- ${nodeName(f)} → ${relText(f)}`).join('\n')}`
    + `\n\nFIN DEL DÍA: reflexiona como te indican.`;
  const r = await aiCall([{ role: 'user', content: msg }], reflectSchema()), o = r.out;
  for (const c of (Array.isArray(o.relaciones) ? o.relaciones : []).slice(0, 12)) {
    const nodes = NODES(); if (!nodes.includes(c.de) || !nodes.includes(c.a) || c.de === c.a) continue;
    const d = clamp(Math.round(+c.cambio || 0), -1, 1), before = relGet(c.de, c.a).a;
    relSet(c.de, c.a, before + d, typeof c.nota === 'string' ? c.nota.trim() : '');
    (game.relLog = game.relLog || []).push({ d: dayNum, de: c.de, a: c.a, cambio: d, nota: String(c.nota || '').slice(0, 140) });
  }
  if (game.relLog) game.relLog = game.relLog.slice(-16);
  for (const im of (Array.isArray(o.impresiones) ? o.impresiones : []).slice(0, 8)) {
    if (!CH[im.quien] || typeof im.texto !== 'string' || !im.texto.trim()) continue;
    const L = game.impr[im.quien] = game.impr[im.quien] || []; L.push('día ' + dayNum + ': ' + im.texto.trim().slice(0, 200)); if (L.length > 8) L.splice(0, L.length - 8);
  }
  save();
}
