/* ---------- the milestones of the story (src/datos/hitos.txt): what cannot be missing, by what it means. Each one is
   done when what says it happened holds (the book's way: «se cumple si: hecho:zanahorias»; or another way, written
   by hand or by the night's AI, that leaves hecho:hito_<id> directly) and the milestones it needs are done; then it
   leaves hecho:hito_<id>, once, and a line in Ana's diary. They are checked now and then, not every frame. ---------- */
const HITOS = (() => { const out = []; let h = null;
  for (const raw of (document.getElementById('hitos')?.textContent || '').split('\n')) {
    const s = raw.trim(); if (!s || s[0] === '#') continue; let m;
    if ((m = s.match(/^===\s*(.+?)\s*===$/))) { out.push(h = { id: m[1], necesita: [], cumple: [], significa: '', peso: 'nucleo' }); continue; }
    if (!h || !(m = s.match(/^([a-z ]+):\s*(.*)$/))) continue;
    const [, k, v] = m;
    if (k === 'necesita') h.necesita = v.split(',').map(x => x.trim()).filter(Boolean);
    else if (k === 'se cumple si') h.cumple = v.split('|').map(x => x.split(',').map(c => c.trim()).filter(Boolean)).filter(a => a.length);
    else if (k === 'significa' || k === 'peso' || k === 'capitulos' || k === 'libro') h[k] = v;
  }
  return out; })();
const HITO_DE = Object.fromEntries(HITOS.map(h => [h.id, h]));
const hitoHecho = id => !!dlgHechos()['hito_' + id];
// what it needs: the milestones before it (their ids) and any other condition of the script
const hitoListo = h => h.necesita.every(n => HITO_DE[n] ? hitoHecho(n) : dlgCumple({ si: [dlgVal(n)] }, dlgCtx()));
const hitoOcurrio = h => h.cumple.some(a => dlgCumple({ si: a.map(dlgVal) }, dlgCtx()));
let hitosT = 0;
function hitosTick(dt){
  if ((hitosT -= dt) > 0) return; hitosT = 2;
  for (let otra = true; otra;) { otra = false;   // (one done can let the next be done at once: a chain in one go)
    for (const h of HITOS) if (!hitoHecho(h.id) && hitoListo(h) && hitoOcurrio(h)) {
      dlgHecho('hito_' + h.id); otra = true;
      logEv('Un momento de la historia: ' + h.significa.replace(/\.$/, '') + '.', []);
    } }
}
// for the settings panel: which are done, which are next (all they need is done), which are still far
const hitosTexto = () => HITOS.map(h => '  ' + (hitoHecho(h.id) ? '✓' : hitoListo(h) ? '…' : '·') + ' ' + h.id + (h.capitulos ? ' (cap. ' + h.capitulos + ')' : '') + (h.peso === 'menor' ? ' [menor]' : '') + ': ' + h.significa).join('\n') + '\n  (✓ pasó · … puede pasar ahora · · todavía no)';
