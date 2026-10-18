/* ---------- the milestones of the story (src/datos/hitos.txt): the SITUATIONS the story guarantees, and how Ana
   answered each one (the player's choice). A situation happens when what says so holds (the book's way, or another
   that leaves hecho:hito_<id>) and what it needs has happened; then it leaves hecho:hito_<id> and a line in Ana's
   diary, and, as soon as one of its answers holds, hecho:hito_<id>_<answer>. A milestone that needs another one with a
   certain answer is CLOSED if that one got another answer (hecho:hito_<id>_cerrado): her story went another way.
   Checked now and then, not every frame. ---------- */
const HITOS = (() => { const out = []; let h = null;
  const alts = v => v.split('|').map(x => x.split(',').map(c => c.trim()).filter(Boolean)).filter(a => a.length);
  for (const raw of (document.getElementById('hitos')?.textContent || '').split('\n')) {
    const s = raw.trim(); if (!s || s[0] === '#') continue; let m;
    if ((m = s.match(/^===\s*(.+?)\s*===$/))) { out.push(h = { id: m[1], necesita: [], pasa: [], respuestas: [], situacion: '', peso: 'nucleo', otra: 1 }); continue; }
    if (!h) continue;
    if ((m = s.match(/^respuesta (\w+):\s*(.*)$/))) { h.respuestas.push({ id: m[1], si: alts(m[2]) }); continue; }
    if (!(m = s.match(/^([a-z ]+):\s*(.*)$/))) continue;
    const [, k, v] = m;
    if (k === 'necesita') h.necesita = v.split(',').map(x => x.trim()).filter(Boolean);
    else if (k === 'pasa si') h.pasa = alts(v);
    else if (k === 'otra oportunidad') h.otra = +v || 0;
    else if (k === 'situacion' || k === 'peso' || k === 'capitulos' || k === 'libro') h[k] = v;
  }
  return out; })();
const HITO_DE = Object.fromEntries(HITOS.map(h => [h.id, h]));
const hitoHecho = id => !!dlgHechos()['hito_' + id];
const hitoRespuesta = id => HITO_DE[id]?.respuestas.find(r => dlgHechos()['hito_' + id + '_' + r.id])?.id || null;
const hitoCerrado = id => !!dlgHechos()['hito_' + id + '_cerrado'];
const cumple = alts => alts.some(a => dlgCumple({ si: a.map(dlgVal) }, dlgCtx()));
// one thing it needs: a milestone (happened), a milestone with an answer («humillada:estalla»), or a condition
function hitoNecesita(n){
  const [id, r] = n.split(':');
  if (HITO_DE[id]) return hitoCerrado(id) ? 'cerrado' : !hitoHecho(id) ? 'falta' : !r ? 'si' : hitoRespuesta(id) === r ? 'si' : hitoRespuesta(id) || hitoCerrado(id) ? 'cerrado' : 'falta';
  return dlgCumple({ si: [dlgVal(n)] }, dlgCtx()) ? 'si' : 'falta';
}
const hitoEstado = h => { const e = h.necesita.map(hitoNecesita); return e.includes('cerrado') ? 'cerrado' : e.every(x => x === 'si') ? 'listo' : 'falta'; };
let hitosT = 0;
function hitosTick(dt){
  if ((hitosT -= dt) > 0) return; hitosT = 2;
  for (let otra = true; otra;) { otra = false;   // (one can open the next at once: a chain in one go)
    for (const h of HITOS) {
      if (hitoCerrado(h.id)) continue;
      if (!hitoHecho(h.id)) {
        const e = hitoEstado(h);
        if (e === 'cerrado') { dlgHecho('hito_' + h.id + '_cerrado'); otra = true; continue; }
        if (e !== 'listo' || !cumple(h.pasa)) continue;
        dlgHecho('hito_' + h.id); otra = true; logEv('Un momento de la historia: ' + h.situacion.replace(/\.$/, '') + '.', []);
      }
      if (h.respuestas.length && !hitoRespuesta(h.id)) { const r = h.respuestas.find(r => cumple(r.si)); if (r) { dlgHecho('hito_' + h.id + '_' + r.id); otra = true; } }
    } }
}
// for the settings panel: what happened (and how Ana answered), what can happen now, what was closed, what is far
const hitosTexto = () => HITOS.map(h => {
  const r = hitoRespuesta(h.id), libro = (h.libro || '').match(/^(\w+) —/)?.[1];
  const marca = hitoHecho(h.id) ? '✓' : hitoCerrado(h.id) ? '✗' : hitoEstado(h) === 'listo' ? '…' : '·';
  return '  ' + marca + ' ' + h.id + (h.capitulos ? ' (cap. ' + h.capitulos + ')' : '') + (h.peso === 'menor' ? ' [menor]' : '') + ': ' + h.situacion + (r ? '\n      → ' + r.replace(/_/g, ' ') + (libro && r !== libro ? ' (el libro: ' + libro.replace(/_/g, ' ') + ')' : ' (como en el libro)') : '');
}).join('\n') + '\n  (✓ pasó · … puede pasar ahora · · todavía no · ✗ su historia fue por otro lado)';
