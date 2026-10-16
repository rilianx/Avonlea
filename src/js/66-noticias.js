/* ---------- the news of Avonlea: what someone believes, who told them, and how it grows (src/datos/noticias.txt) ----------
   A piece of news is a belief with an owner: «Mrs. Barry believes x, because Mrs. Lynde told her, the way she told it».
   Each one keeps who told them and which version they heard (game.wm.creencias[who][news] = { de, dia, v }; knowing it
   is game.wm.know, the same the planner uses), as in James Ryan's «Talk of the Town»: the gossips («exageran») tell it
   one version bigger than they heard it, and whoever hears it bigger believes the bigger one. The script asks for it
   («sabe:barry:x», «sabe:marilla:x:2»: at least the second version), names who told («{De:marilla:x}») and gives it
   («! contar barry x»). Neighbours tell each other when they talk: near Ana, aloud; away from her, too. */
function noticiasLeer(txt){
  const N = [], R = { nuevas: [], sabidas: [], exageradas: [] }, X = []; let n = null;
  const lista = v => v.split(',').map(x => x.trim()).filter(Boolean), varias = v => v.split('|').map(x => x.trim()).filter(Boolean);
  for (const raw of txt.split('\n')) {
    const l = raw.trim(); if (!l || l[0] === '#') continue; let m;
    if (!n && (m = l.match(/^respuestas( ya sabidas| exageradas)?:\s*(.*)$/))) { R[{ '': 'nuevas', ' ya sabidas': 'sabidas', ' exageradas': 'exageradas' }[m[1] || '']] = varias(m[2]); continue; }
    if (!n && (m = l.match(/^exageran:\s*(.*)$/))) { X.push(...lista(m[1])); continue; }
    if ((m = l.match(/^===\s*(.+?)\s*===$/))) { N.push(n = { id: m[1], titulo: m[1], saben: [], testigos: null, cuentaPor: 0, dice: [], diceDe: {}, exagerada: [], responde: [], llega: [] }); continue; }
    if (!n) continue;
    if ((m = l.match(/^saben(?: si (.+?))?:\s+(.*)$/)))   // (the conditions have ':' in them: the list comes after «: »)
      n.saben.push({ si: m[1] ? lista(m[1]) : [], quien: lista(m[2]) });
    else if ((m = l.match(/^se entera quien la ve si:\s*(.*)$/))) n.testigos = lista(m[1]);
    else if ((m = l.match(/^llega a (\S+) en:\s*([\d.]+)$/))) n.llega.push({ quien: m[1], horas: +m[2] });
    else if ((m = l.match(/^se cuenta por:\s*(\d+)/))) n.cuentaPor = +m[1];
    else if ((m = l.match(/^dice (\S+):\s*(.*)$/))) (n.diceDe[m[1]] ||= []).push(m[2]);
    else if ((m = l.match(/^(titulo|al conocer a ana|dice|exagerada|responde):\s*(.*)$/))) {
      const [, k, v] = m;
      if (k === 'dice' || k === 'responde' || k === 'exagerada') n[k].push(v); else if (k === 'al conocer a ana') n.alConocer = /^s/.test(v); else n.titulo = v;
    }
  }
  return { N, R, X };
}
const { N: NOTICIAS, R: NOTICIAS_RESP, X: EXAGERAN } = noticiasLeer(document.getElementById('noticias')?.textContent || '');
const NOTICIA = Object.fromEntries(NOTICIAS.map(n => [n.id, n]));
// (a game from before Ana's arrival was played: she has lived in Avonlea a while, and the news of her are old)
const sabeK = (k, f) => (NOTICIA[f]?.alConocer && conoceTodos()) || (game.wm?.know?.[sinF(k)] || []).includes(f);
// what someone believes of it: who told them (null: they saw it, or knew it), since when, and which version (1: as it was)
const creencia = (k, f) => sabeK(k, f) ? { de: null, dia: 0, v: 1, ...game.wm?.creencias?.[sinF(k)]?.[f] } : null;
// it is still told for so many days after one has heard it (news gets old)
const seCuenta = (k, n) => (!n.cuentaPor || today() + 1 - (creencia(k, n.id)?.dia || 0) < n.cuentaPor);
const versiones = n => 1 + n.exagerada.length;
// how big it comes out of someone's mouth: as they heard it, or a little bigger, if they are one who exaggerates
const versionAlContar = (k, n) => { const v = creencia(k, n.id)?.v || 1; return EXAGERAN.includes(sinF(k)) ? Math.min(v + 1, versiones(n)) : v; };
const lineaVersion = (k, n, v) => v > 1 ? n.exagerada[v - 2] : pick(n.diceDe[sinF(k)] || n.dice);
// someone learns it (from someone, in some version): and, if they are one to tell it, it reaches whoever it reaches,
// a few hours later, the way they would tell it. Hearing it bigger than they had it, they believe the bigger one.
function enterarse(k, f, de = null, v = 1){
  k = sinF(k); const c = creencia(k, f); const C = ((game.wm.creencias ||= {})[k] ||= {});
  if (c) { if (v > c.v) C[f] = { ...c, de: de ? sinF(de) : c.de, v }; return; }
  wmKnow(k, f); C[f] = { de: de ? sinF(de) : null, dia: today() + 1, v };
  const n = NOTICIA[f]; if (!n) return;
  for (const L of n.llega) if (L.quien !== k) (game.wm.noticiasPend ||= []).push({ k: L.quien, f, at: dayT + L.horas / 24, de: k, v: versionAlContar(k, n) });
}
// who told someone (for a line: «{de:marilla:ana_en_camison}» → «la Sra. Lynde»)
const quienConto = (k, f) => { const d = creencia(k, f)?.de; return !d ? 'alguien' : FOLKBY[d] ? FOLKBY[d].def.name : (CH[d]?.article || '') + (NAMES[d] || d); };
// who knows it from the start, or from when its condition holds; and what is on its way to someone
let noticiasT = 0;
function noticiasTick(dt){
  if ((noticiasT -= dt) > 0 || !game.wm) return; noticiasT = 2;
  for (const n of NOTICIAS) for (const g of n.saben) if (g.si.every(c => dlgCond(c))) for (const k of g.quien) if (!sabeK(k, n.id)) { wmKnow(k, n.id); ((game.wm.creencias ||= {})[k] ||= {})[n.id] = { de: null, dia: today() + 1, v: 1 }; }
  const P = game.wm.noticiasPend; if (P?.length) for (const p of P.slice()) if (dayT >= p.at) { P.splice(P.indexOf(p), 1); enterarse(p.k, p.f, p.de, p.v); }
  // whoever sees Ana as the news says (in her nightgown out of Green Gables, alone at night…): they saw it
  for (const n of NOTICIAS) if (n.testigos && n.testigos.every(c => dlgCond(c, dlgCtx()))) for (const k of [...Object.keys(PEOPLE), ...FOLK.map(f => f.id)]) if (!sabeK(k, n.id) && veAna(k)) enterarse(k, n.id);
  chismeLejos();
}
// and out of Ana's sight, too: now and then, two of Avonlea meet (at the store, after church, over the fence) and one
// tells the other what they know, as it is told (the last ones are kept in game.wm.chismes, for whoever wants to read them)
const CHISMOSOS = () => [...Object.keys(PEOPLE), ...FOLK.map(f => f.id)].filter(k => !ausente(k) && wmScene(k) !== 'away' && !(game.road?.with === k));
function chismeLejos(){
  const h = hourNow(); if (h < 8 || h > 20 || Math.random() > .04) return;
  const L = CHISMOSOS(), a = pick(L), b = pick(L.filter(k => k !== a)); if (!a || !b) return;
  const ch = chisme(a, b); if (!ch) return;
  (game.wm.chismes ||= []).push({ dia: today() + 1, de: a, a: b, f: ch.f, v: ch.v, dice: ch[0][1] }); if (game.wm.chismes.length > 80) game.wm.chismes.shift();
}
// what Ana tells of herself to whoever meets her (the news that say so)
const presentarseNoticias = k => { for (const n of NOTICIAS) if (n.alConocer) enterarse(k, n.id, 'ana'); };
// two neighbours talking: a piece of news one knows and the other does not, told aloud (and now the other believes it,
// as it was told); if there is none new, now and then one the gossips of Avonlea tell again anyway: and if it comes out
// bigger than the other had it, the other believes the bigger one
function chisme(a, b){
  const puede = n => (n.diceDe[sinF(a)] || n.dice).length && sabeK(a, n.id) && seCuenta(a, n);
  const nueva = NOTICIAS.find(n => puede(n) && !sabeK(b, n.id));
  const n = nueva || (Math.random() < .3 && pick(NOTICIAS.filter(n => puede(n) && sabeK(b, n.id))));
  if (!n) return null;
  const v = versionAlContar(a, n), antes = creencia(b, n.id)?.v || 0;
  enterarse(b, n.id, a, v);
  const R = NOTICIAS_RESP, resp = v > Math.max(antes, 1) ? R.exageradas : nueva ? (n.responde.length ? n.responde : R.nuevas) : R.sabidas;   // (bigger than they had it: amazed)
  return Object.assign([[a, lineaVersion(a, n, v)], [b, pick(resp)]], { f: n.id, v });
}
// «sabe:quien:noticia», and «sabe:quien:noticia:2» (heard at least the second version, the bigger one)
function sabeCond(k, f, v){ const c = creencia(k, f); return !!c && (!v || c.v >= +v); }
