/* ---------- the news of Avonlea: what someone knows, and tells (src/datos/noticias.txt) ----------
   A piece of news is a fact with an owner: not «x happened» but «Mrs. Barry knows x happened» (game.wm.know, the
   same the planner uses). The script asks for it («sabe:barry:nina_cuthbert») and gives it («! contar barry x»).
   Here, only how it goes about, as the data says: who knows it from the start (or from when a condition holds), who
   tells it, how it is told and answered; whoever meets Ana learns what she tells of herself; and some reach someone
   a few hours later, though they do not meet («ya hablaré con Marilla»). When two neighbours talk, one who knows tells
   the other, aloud (chatLines, in src/js/60-foco-y-ejecucion.js). */
function noticiasLeer(txt){
  const N = [], R = { nuevas: [], sabidas: [] }; let n = null;
  const lista = v => v.split(',').map(x => x.trim()).filter(Boolean);
  for (const raw of txt.split('\n')) {
    const l = raw.trim(); if (!l || l[0] === '#') continue; let m;
    if ((m = l.match(/^respuestas( ya sabidas)?:\s*(.*)$/))) { R[m[1] ? 'sabidas' : 'nuevas'] = m[2].split('|').map(x => x.trim()); continue; }
    if ((m = l.match(/^===\s*(.+?)\s*===$/))) { N.push(n = { id: m[1], titulo: m[1], saben: [], cuentan: null, dice: [], diceDe: {}, responde: [], llega: [] }); continue; }
    if (!n) continue;
    if ((m = l.match(/^saben(?: si (.+?))?:\s*(.*)$/))) n.saben.push({ si: m[1] ? lista(m[1]) : [], quien: lista(m[2]) });
    else if ((m = l.match(/^llega a (\S+) en:\s*([\d.]+)$/))) n.llega.push({ quien: m[1], horas: +m[2] });
    else if ((m = l.match(/^dice (\S+):\s*(.*)$/))) (n.diceDe[m[1]] ||= []).push(m[2]);
    else if ((m = l.match(/^(titulo|cuentan|al conocer a ana|dice|responde):\s*(.*)$/))) {
      const [, k, v] = m;
      if (k === 'dice' || k === 'responde') n[k].push(v); else if (k === 'cuentan') n.cuentan = v === 'todos' ? null : v === 'nadie' ? [] : lista(v); else if (k === 'al conocer a ana') n.alConocer = /^s/.test(v); else n.titulo = v;
    }
  }
  return { N, R };
}
const { N: NOTICIAS, R: NOTICIAS_RESP } = noticiasLeer(document.getElementById('noticias')?.textContent || '');
const NOTICIA = Object.fromEntries(NOTICIAS.map(n => [n.id, n]));
// (a game from before Ana's arrival was played: she has lived in Avonlea a while, and the news of her are old)
const sabeK = (k, f) => (NOTICIA[f]?.alConocer && conoceTodos()) || (game.wm?.know?.[sinF(k)] || []).includes(f);
const cuenta = (k, n) => !n.cuentan || n.cuentan.includes(sinF(k));
// someone learns it: and, if they are one to tell it, it reaches whoever it reaches, a few hours later
function enterarse(k, f){
  k = sinF(k); if (sabeK(k, f)) return; wmKnow(k, f); const n = NOTICIA[f]; if (!n || !cuenta(k, n)) return;
  for (const L of n.llega) if (L.quien !== k && !sabeK(L.quien, f)) (game.wm.noticiasPend ||= []).push({ k: L.quien, f, at: dayT + L.horas / 24 });
}
// who knows it from the start, or from when its condition holds; and what is on its way to someone
let noticiasT = 0;
function noticiasTick(dt){
  if ((noticiasT -= dt) > 0 || !game.wm) return; noticiasT = 2;
  for (const n of NOTICIAS) for (const g of n.saben) if (g.si.every(c => dlgCond(c))) for (const k of g.quien) if (!sabeK(k, n.id)) wmKnow(k, n.id);
  const P = game.wm.noticiasPend; if (P?.length) for (const p of P.slice()) if (dayT >= p.at) { P.splice(P.indexOf(p), 1); enterarse(p.k, p.f); }
}
// what Ana tells of herself to whoever meets her (the news that say so)
const presentarseNoticias = k => { for (const n of NOTICIAS) if (n.alConocer) enterarse(k, n.id); };
// two neighbours talking: a piece of news one knows and the other does not, told aloud (and now the other knows it);
// if there is none new, now and then one the gossips of Avonlea tell again anyway
function chisme(a, b){
  const nueva = NOTICIAS.find(n => (n.diceDe[sinF(a)] || n.dice).length && cuenta(a, n) && sabeK(a, n.id) && !sabeK(b, n.id));
  const n = nueva || (Math.random() < .3 && pick(NOTICIAS.filter(n => (n.diceDe[sinF(a)] || n.dice).length && cuenta(a, n) && sabeK(a, n.id) && sabeK(b, n.id))));
  if (!n) return null;
  if (nueva) enterarse(b, n.id);
  return [[a, pick(n.diceDe[sinF(a)] || n.dice)], [b, pick(nueva ? (n.responde.length ? n.responde : NOTICIAS_RESP.nuevas) : NOTICIAS_RESP.sabidas)]];
}
