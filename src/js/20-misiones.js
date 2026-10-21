/* ---------- the mini-missions: stories of a few steps, as the chapters of «Chronicles of Avonlea» ----------
   Written apart (src/datos/misiones.txt): each one has its data (title, kind, how it starts, who is in it), its entry in
   Ana's notebook, its scenes and its conversations, in the same formats as their own files; here they are split so that
   the script, the conversations and the notebook read them with the rest (tools/misiones.js does the same for the
   tools: the graph and the model check them too). Their facts are «mis_<id>_…», and every ending leaves «mis_<id>_fin». */
function misionesLeer(txt){
  const out = { lista: [], guion: '', conversaciones: '', cuaderno: '' }; let m = null, parte = null;
  for (const raw of txt.split('\n')) {
    const l = raw.trim(); let h;
    if ((h = l.match(/^====\s*mision\s+(\S+)\s*====$/))) { out.lista.push(m = { id: h[1], titulo: h[1] }); parte = null; continue; }
    if (!m) continue;
    if ((h = l.match(/^---\s*(cuaderno|guion|conversaciones)\s*---$/))) { parte = h[1]; out[parte] += `\n# (misión ${m.id})\n`; continue; }
    if (parte) { out[parte] += raw + '\n'; continue; }
    if (l && l[0] !== '#' && (h = l.match(/^(titulo|tipo|arranque|personas|resumen|inspiracion):\s*(.*)$/))) m[h[1]] = h[1] === 'personas' ? h[2].split(',').map(x => x.trim()).filter(Boolean) : h[2];
  }
  return out;
}
const MISIONES = misionesLeer(document.getElementById('misiones')?.textContent || '');
