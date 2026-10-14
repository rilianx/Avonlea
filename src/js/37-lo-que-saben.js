/* ---------- what each one knows ----------
   The game keeps Ana's diary of everything she does, and each character knows only what they saw (being near, or
   in the same room), what was done to them, and what their family told them at home (shared each morning). */
const sceneOf = k => PEOPLE[k].where;
function witnesses(){
  return Object.keys(PEOPLE).filter(k => sceneOf(k) === game.scene && (game.scene !== 'out' || dist(PEOPLE[k].x, PEOPLE[k].y, ana.x, ana.y) < 320 || (k === 'diana' && diana.follow)));
}
function know(k, text, d = today() + 1){
  const a = game.know[k] = game.know[k] || [];
  if (a.some(e => e.t === text && e.d === d)) return;
  a.push({ d, s: S, t: text }); if (a.length > 30) a.splice(0, a.length - 30);
}
function logEv(text, who = witnesses()){
  text = conNombres(text).replace(/\ba el /g, 'al ').replace(/\bde el /g, 'del ');
  const j = game.journal, e = { d: today() + 1, s: S, t: text, h: Math.round(hourNow() * 100) / 100 };
  if (!(j.length && j[j.length - 1].t === text && j[j.length - 1].d === e.d)) { j.push(e); if (j.length > 80) j.splice(0, j.length - 80); }
  for (const k of new Set(who)) know(k, text);
}
function shareNews(){
  for (const x of Object.keys(CH)) for (const y of CH[x].gossip)
    for (const e of (game.know[x] || []).filter(e => e.d === today() && !e.t.startsWith('(') && !(game.know[y] || []).some(f => f.t === e.t))) know(y, '(' + NAMES[x] + ' le contó) ' + e.t, e.d);
}
// what was said in conversations, as the character will remember it
function remember(who, text){ if (!memOn(who)) return; const m = game.mem[who] = game.mem[who] || []; if (m.some(x => x.endsWith(': ' + text))) return; m.push('día ' + (today() + 1) + ': ' + text); if (m.length > 16) m.splice(0, m.length - 16); save(); }
