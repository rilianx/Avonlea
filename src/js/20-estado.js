/* ---------- the state of the story (src/datos/estado.txt): variables with a value of a list, ordered or not: Ana on
   trial or staying, Diana unknown or a bosom friend, whether Mrs. Barry lets them see each other, the trip under way.
   A fact is something that happened, once, with its day; the state is how things are now, and it changes. The script
   sets it («! estado diana amiga_del_alma») and asks it («si: diana>=conocida», «barry_permite=no»); entering a value
   may leave a fact too (for «dias_desde» and the code), or forget one. ---------- */
function estadoLeer(txt){
  const E = {}; let v = null;
  for (const raw of txt.split('\n')) {
    const s = raw.trim(); if (!s || s[0] === '#') continue; let m;
    if ((m = s.match(/^===\s*(\w+)\s*===$/))) { v = E[m[1]] = { id: m[1], titulo: m[1], orden: [], otros: [], inicial: null, al: {} }; continue; } if (!v) continue;
    if ((m = s.match(/^titulo:\s*(.*)$/))) v.titulo = m[1];
    else if ((m = s.match(/^valores:\s*(.*)$/))) { if (m[1].includes('<')) v.orden = m[1].split('<').map(x => x.trim()).filter(Boolean); else v.otros.push(...m[1].split(',').map(x => x.trim()).filter(Boolean)); }
    else if ((m = s.match(/^otros:\s*(.*)$/))) v.otros.push(...m[1].split(',').map(x => x.trim()).filter(Boolean));
    else if ((m = s.match(/^inicial:\s*(\w+)/))) v.inicial = m[1];
    else if ((m = s.match(/^(\w+):\s*(hecho|olvida|viene de)\s+(\w+)$/))) (v.al[m[1]] ||= []).push([m[2], m[3]]);
  }
  for (const x of Object.values(E)) { x.valores = [...x.orden, ...x.otros]; x.inicial ??= x.valores[0]; }
  return E;
}
const ESTADO = estadoLeer(document.getElementById('estado')?.textContent || '');
const estadoGuardado = () => game.wm ? (game.wm.estado ||= {}) : (game.estado ||= {});
const estadoDesde = () => game.wm ? (game.wm.estadoDesde ||= {}) : (game.estadoDesde ||= {});
// its value now: the one the script set; in a game from before (or a fact left by the code), what its facts say; on a
// scale, the higher of the two
function estadoValor(k){
  const V = ESTADO[k]; if (!V) return null;
  const H = dlgHechos(); let d = null;
  for (const x of V.valores) if ((V.al[x] || []).some(([q, h]) => (q === 'hecho' || q === 'viene de') && H[h] != null)) d = x;
  const g = estadoGuardado()[k], i = V.orden.indexOf(g), j = V.orden.indexOf(d);
  if (g && d && i >= 0 && j >= 0) return j > i ? d : g;
  return g || d || V.inicial;
}
function estadoPoner(k, x){
  const V = ESTADO[k]; if (!V || !V.valores.includes(x)) return;
  estadoGuardado()[k] = x; estadoDesde()[k] = today() + 1;
  for (const [q, h] of V.al[x] || []) if (q === 'hecho') dlgHecho(h); else if (q === 'olvida') delete dlgHechos()[h];
}
// a condition on the state: «diana>=conocida», «barry_permite=no», «ana_en_tv!=devuelta» (null if it is not one); on a
// scale, a value off it (Ana sent back) is neither more nor less
function estadoCond(s){
  const m = s.match(/^(\w+)\s*(>=|<=|!=|=|>|<)\s*(\w+)$/); if (!m || !ESTADO[m[1]]) return null;
  const V = ESTADO[m[1]], a = estadoValor(m[1]), b = m[3];
  if (m[2] === '=') return a === b; if (m[2] === '!=') return a !== b;
  const i = V.orden.indexOf(a), j = V.orden.indexOf(b); if (i < 0 || j < 0) return false;
  return { '>=': i >= j, '<=': i <= j, '>': i > j, '<': i < j }[m[2]];
}
