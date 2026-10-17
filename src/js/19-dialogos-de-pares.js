/* ---------- the bank of written dialogues for pairs and trios: when two (or three) of them meet, the next block not
   yet said (game.dlgUsed); when all have been said, the usual greetings and gossip ---------- */
// the talks (src/datos/charlas.txt): «=== id ===», its fields (quienes, si, donde), «---» and «quien: texto» lines. Read
// here (before the engine of scenes, 21, which registers the «par:» ones as scenes), with a parser of its own
function charlasLeer(txt){
  const out = []; let c = null;
  for (const raw of txt.split('\n')) {
    const s = raw.trim(); if (!s || s[0] === '#') continue;
    const h = s.match(/^===\s*(.+?)\s*===$/); if (h) { out.push(c = { id: h[1], quienes: [], l: [], cuerpo: false }); continue; }
    if (!c) continue;
    if (s === '---') { c.cuerpo = true; continue; }
    const i = s.indexOf(':'); if (i < 0) continue; const k = s.slice(0, i).trim(), v = s.slice(i + 1).trim();
    if (c.cuerpo) c.l.push([k, v]);
    else if (k === 'quienes') c.quienes = v.split(',').map(x => x.trim()).filter(Boolean);
    else if (k === 'si') c.si = v.split(',').map(x => x.trim()).filter(Boolean);
    else if (k === 'donde') c.donde = v;
  }
  return out.map(({ cuerpo, ...c }) => c);
}
const CHARLAS = charlasLeer(document.getElementById('charlas')?.textContent || '');
const charlasDe = pre => CHARLAS.filter(c => c.id.startsWith(pre + ':'));
// the talks of two, a line each, as [«[conditions] line of the first», line of the second] (paresSi keeps those that hold)
const charlaPares = pre => charlasDe(pre).map(c => [(c.si?.length ? '[' + c.si.join(', ') + '] ' : '') + c.l[0][1], c.l[1][1]]);
// a talk with its parts filled: charlaCon('te', { a: 'sraallan', b: 'ana' }) → [['sraallan', '¿Un poco más de té?…'], …]
const charlaCon = (id, papeles) => (CHARLAS.find(c => c.id === id)?.l || []).map(([q, t]) => [papeles[q] ?? q, t]);
const dlgKey = ks => [...ks].sort().join('+');
// the bank, as the rest of the code knows it: { 'ana+diana': [ lines | { si, at, l } ], … }
const DLG_BANK = {};
for (const c of charlasDe('par')) (DLG_BANK[dlgKey(c.quienes)] ||= []).push(c.si || c.donde ? { ...(c.si ? { si: c.si } : {}), ...(c.donde ? { at: c.donde } : {}), l: c.l } : c.l);
