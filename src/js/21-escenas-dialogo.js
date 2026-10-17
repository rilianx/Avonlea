/* ---------- the dialogues (Dialogo): every written dialogue is a scene, a capsule that plays when its moment comes,
   by place and by state, never by the clock. A scene is pure configuration (data, no code): who must be there and
   where, what must be so, how important it is, what it says, and what it does when it starts and ends. The class
   reads that configuration; the director (dlgTick) looks at all of them a few times a second and, in each channel,
   plays the most important one that can be played. New scenes: Dialogo.registrar({...}) or the script (id="guion").
   The configuration (all optional but `id` and `lineas`; docs/ESCENAS.md has it all with examples):
     id, canal ('general'), prioridad (1), interrumpe (false), repetir ('una_vez' | 'siempre' | 'dia' | {cada: s}),
     tipo: 'conversacion' (cut short, it goes on later where it was left, with a bridge line: puente) | 'comentario'
     (a remark about the moment: cut short, it is lost), al_paso (the buggy at a walk while it is said),
     sujeta: [who are held still while it is said],
     quienes: [who speak] and, for the talks of pairs and trios, disparo: 'encuentro' (when they meet),
     en: {who: scene}, cerca: [who, place, radius], calesa: 'camino' | 'avonlea' | 'cualquiera',
     camino: {tramo, tramo_v, desde, visible, no_callado}, donde: 'gg' | 'casa' | 'dentro' | 'arroyo',
     si: ['hecho:x', '!hecho:x', 'dicha:id', 'marca:id', 'capitulo', 'canal_libre:c', 'ana_visible', 'escena_ana:s',
          'sabe:who:what', 'y_mayor:who:y'], o: [alternatives, each a configuration of these same conditions],
     lineas: [[who, text], ...] | 'libro:path' | 'relleno:n', elegir: [indices], marcas: {index: mark},
     al_empezar / al_terminar: [{hecho}, {marca, nota}, {log}, {saber: [who, what]}, {meta: {quien, tipo, args,
          texto, etiqueta, prioridad}}, {soltar: who}, {ana: {props}}, {fin_capitulo: true}] ---------- */
const DLG_LUGARES = { lago: () => [LAKE.x, LAKE.y], tejas_verdes: () => [GG.x, GG.y], casa_bell: () => WP.casa_bell, letrero_br: () => DOOR.br, hondonada: () => [LY.x, LY.y + 60] };
// what has happened (kept with the game: the chains of the book go on from one day to another); each with the day it
// happened (from 1), so that a scene can wait a day or two after another (dias_desde)
const dlgHechos = () => game.wm ? (game.wm.hechos ||= {}) : (game.dlgHechos ||= {});
const dlgHecho = (n, v = today() + 1) => { dlgHechos()[n] = v; if (game.wm) (game.wm.hechoT ||= {})[n] = dayT; };   // (and when, to the minute: «horas_desde:x:0.5»)
const dlgDichas = () => game.escDone || (game.escDone = {});
const dlgEscena = k => k === 'ana' ? game.scene : wmScene(k);
function dlgCtx(){
  const k = game.road?.with, d = PEOPLE[k], road = game.scene === 'camino' && !!ana.onCart && d?.where === 'camino', M = PEOPLE.matthew;
  const ride = game.scene === 'out' && M.where === 'out' && ((!!AGENTS.ana?.ride && AGENTS.ana.followOf === 'matthew') || cart.riding);   // (Ana with Matthew in the buggy, in Avonlea)
  return { road, d, dir: d?.roadDir || 0, tr: road ? roadTramo(d.roadS) : null, ride };
}
function dlgCond(s, c){   // one condition of state, written as text
  if (s[0] === '!') return !dlgCond(s.slice(1), c);
  { const q = cualidadCond(s); if (q) return q(); }   // (a quality compared with a number: «granja:ana>=15», «afecto:diana:ana>=4»)
  const i = s.indexOf(':'), k = i < 0 ? s : s.slice(0, i), rest = i < 0 ? '' : s.slice(i + 1), [a, b] = k === 'sabe' || k === 'y_mayor' || k === 'dias_desde' ? rest.split(':') : [rest];   // (an id may have ':' in it)
  switch (k) {
    case 'hecho': return !!dlgHechos()[a];
    case 'dicha': return !!dlgDichas()[a];
    case 'marca': return CAP1.marks[a] != null;
    case 'capitulo': return CAP1.on && !CAP1.done;
    case 'cuaderno': return !!cuadernoHecho(a);   // (a goal of Ana's notebook is done)
    case 'tomando_te': { const [x, y] = rest.split(':'); return AGENTS[x]?.acting?.v === 'tomar_te' && AGENTS[x].acting.k === y; }   // (x at the tea table with y)
    case 'afecto': { const [x, y, n] = rest.split(':'); return relGetW(x, y) >= +n; }   // (x cares for y at least n, of 0..5; the same as «afecto:x:y>=n»)
    case 'dias_desde': { const d = dlgHechos()[a] ?? cuadernoHecho(a); return typeof d === 'number' && today() + 1 - d >= +b; }   // (at least b days since a happened: a fact, or a goal of the notebook done)
    case 'hora': { const [x, y] = a.split('-').map(Number), h = hourNow() % 24; return h >= x && h < y; }   // (the hour of the day: «hora:19-23»)
    case 'dia_juego': return today() + 1 >= +a;   // (the game has gone on at least so many days: 56, a year)
    case 'sentada': return !!wmBody(a)?.sit;   // (she has sat down: at the table, for the tea)
    case 'estudio': return cualidad('ana', 'estudio') >= +a;   // (the same as «estudio:ana>=n»)
    case 'camino': { const [x, n] = rest.split(':'); return cualidad('ana', x) >= +n; }   // (the same as «x:ana>=n»)
    case 'estacion': return SEASONS[S].toLowerCase() === a;   // (primavera, verano, otoño, invierno)
    case 'dia_estacion': return today() % DIAS_ESTACION + 1 === +a;   // (the day of the season, from 1)
    case 'no_hoy': return dlgHechos()[a] !== today() + 1;   // (a did not happen today: one thing of the book per day)
    case 'canal_libre': return !talkBusy(a);
    case 'ana_visible': return !ana.hidden;
    case 'escena_ana': return game.scene === a;
    case 'horas_desde': { const [x, n] = rest.split(':'); const t = game.wm?.hechoT?.[x]; return !!dlgHechos()[x] && (t == null || (dayT - t) * 24 >= +n); }   // (at least n hours since x happened: time for what a card asked of the player)
    case 'comento': { const [x, ...y] = rest.split(':'); return comentoHoy(x).has(claveReac(y.join(':'))); }   // (a already remarked today how Ana is: «comento:lynde:ana:camison», «comento:barry:hora»)
    case 'sabe': return sabeCond(a, b, rest.split(':')[2]);   // (and which version they heard, or who told them: src/js/66-noticias.js)
    case 'y_mayor': { const p = wmBody(a); return !!p && p.y > +b * U; }
    case 'conoce': return conoceA(a);   // (Ana and they have met: «conoce:diana»)
    case 'presente': return wmScene(a) !== 'away';   // (they are in Avonlea, not away: «presente:diana»)
    case 've': return veAna(a);   // (she can see Ana now: the same room, or near her outside)
    case 'donde': { const [x, l] = rest.split(':'); return dlgDonde(l, x); }   // (someone is somewhere: «donde:ana:tejas», «!donde:ana:tejas»)
    case 'ana': return !!ANA_ESTADO[a]?.();   // (how Ana is: «ana:camison», «ana:sin_sombrero», «ana:ropa_tirada»)
    case 'carta': return game.cartaAhora?.para === a && TT - game.cartaAhora.t < 1 && !game.cartaEscena;   // (Ana is writing a letter to her, at her desk)
  }
  return false;
}
// what someone can see: Ana in the same room as them, or near enough outside (in the dark, a lantern's distance)
function veAna(k){ const b = wmBody(k); if (!b || ana.hidden || wmScene(k) !== game.scene) return false; return game.scene !== 'out' || dist(b.x, b.y, ana.x, ana.y) < 380; }
const ANA_ESTADO = { camison: () => !!game.wm?.camison, sin_sombrero: () => !!game.wm?.sinSombrero, ropa_tirada: () => !!game.wm?.ropaTirada, sentada: () => !!ana.sit, en_cama: () => !!ana.enCama };
function dlgDonde(at, k){   // where a talk of pairs and trios may happen
  const sc = wmScene(k), b = wmBody(k); if (!b) return false;
  if (at === 'gg') return sc === 'gg';
  if (at === 'dentro') return sc !== 'out' && sc !== 'camino';
  if (at === 'tejas') return sc === 'gg' || sc === 'ga' || (sc === 'out' && dist(b.x, b.y, GG.x, GG.y) < 520);   // (anywhere in Green Gables: the kitchen, her room, the yard)
  if (at === 'casa') return sc === 'gg' || (sc === 'out' && dist(b.x, b.y, GG.x, GG.y) < 520);
  if (at === 'arroyo') return sc === 'out' && brookSegs.some(([p, q]) => segDist(b.x, b.y, p, q) < 300);
  return true;
}
function dlgFalla(c, x){   // why the conditions of place and state of a configuration (or of one of its alternatives) are not met (null: they are)
  if (c.hablan) { const a = c.hablan().find(k => ausente(k)); if (a) return a + ' no está en Avonlea'; }   // (someone who speaks in it is away: src/datos/llegadas.txt)
  if (c.en) for (const [k, sc] of Object.entries(c.en)) if (dlgEscena(k) !== sc) return `${k} no está en ${sc}`;
  if (c.cerca) { const [k, l, r] = c.cerca, b = k === 'ana' ? ana : wmBody(k), p = DLG_LUGARES[l]?.(); if (!b || !p || dlgEscena(k) !== 'out' || dist(b.x, b.y, p[0], p[1]) > r) return `${k} no está cerca de ${l}`; }
  if (c.calesa) { const ok = c.calesa === 'camino' ? x.road : c.calesa === 'avonlea' ? x.ride : x.road || x.ride; if (!ok) return c.calesa === 'avonlea' ? 'Ana no va en la calesa por Avonlea' : 'Ana no va en la calesa por el camino'; }
  if (c.camino) {
    const w = c.camino; if (!x.road || x.dir <= 0) return 'no van de vuelta por el camino';
    if (w.tramo && x.tr.kind !== w.tramo && x.tr.name !== w.tramo) return 'no es el tramo ' + w.tramo;
    if (w.tramo_v != null && x.tr.v !== w.tramo_v) return 'no es el tramo ' + w.tramo_v;
    if (w.desde != null && x.d.roadS < w.desde) return 'todavía no llegan al tramo (' + Math.round(w.desde * 100) + '% del camino)';
    if (w.visible && !roadTagOk(w.visible, ana.x)) return 'no se ve ' + w.visible;
    if (w.no_callado && x.tr.quiet) return 'tramo de silencio';
  }
  if (c.donde && !dlgDonde(c.donde, c.quienes?.[0] || 'ana')) return 'no están en ' + c.donde;
  for (const s of [].concat(c.si || [])) if (!dlgCond(s, x)) return 'falta ' + s;
  if (c.o) { const r = c.o.map(alt => dlgFalla(alt, x)); if (!r.includes(null)) return r.join(' / '); }
  return null;
}
const dlgCumple = (c, x) => !dlgFalla(c, x);
// --- the state of the world, as in quality-based narrative (docs/MOTOR.md): facts (with the day they happened) and
// qualities, numbers with an owner: «granja» of Ana, «estudio» of Gilbert, «afecto» of Diana towards Ana (0 to 5)
// Each quality may be declared (src/datos/habilidades.txt): where it starts, its range, its milestones up and down;
// one may be of someone towards someone else («paciencia» of Marilla towards Ana), kept as num[dueño]['paciencia>ana']
const CUALIDAD_DEF = {};   // (filled by 66-habilidades.js)
const cualidadClave = (nombre, hacia) => hacia ? nombre + '>' + hacia : nombre;
function cualidad(dueño, nombre, hacia){
  if (nombre === 'afecto') return relGetW(dueño, hacia);
  const v = game.wm?.num?.[dueño]?.[cualidadClave(nombre, hacia)];
  return v ?? CUALIDAD_DEF[nombre]?.inicial ?? 0;
}
function cualidadSuma(dueño, nombre, n, hacia){
  if (nombre === 'afecto') return relSetW(dueño, hacia, Math.max(0, Math.min(5, relGetW(dueño, hacia) + n)));
  const d = CUALIDAD_DEF[nombre], [min, max] = d?.rango || [0, Infinity], antes = cualidad(dueño, nombre, hacia);
  if (d?.visible && !d.visible.every(x => dlgCond(x))) return;   // (a quality that counts only for a while: Marilla's patience, until White Sands)
  const N = ((game.wm.num ||= {})[dueño] ||= {}), v = Math.max(min, Math.min(max, antes + n)); N[cualidadClave(nombre, hacia)] = v;
  if (d && v !== antes) cualidadHitos(d, dueño, hacia, antes, v);   // (a milestone crossed, up or down: told, and kept as a fact)
}
// a quality compared with a number, as text: «granja:ana>=15», «afecto:diana:ana>=4», «estudio:gilbert<30» (null: it is not one)
const CUALIDAD_RE = /^([a-zñ_]+):([a-zñ_]+)(?::([a-zñ_]+))?\s*(>=|<=|>|<|==|=)\s*(-?\d+(?:\.\d+)?)$/;
function cualidadCond(s){
  const m = s.match(CUALIDAD_RE); if (!m) return null;
  const [, nombre, dueño, hacia, op, n] = m, v = () => cualidad(dueño, nombre, hacia);
  return { '>=': () => v() >= +n, '<=': () => v() <= +n, '>': () => v() > +n, '<': () => v() < +n, '==': () => v() === +n, '=': () => v() === +n }[op];
}
// how specific a scene is: how much it asks of the moment (of two of the same importance, the most specific goes first)
const dlgEspecificidad = d => [].concat(d.si || []).length + Object.keys(d.en || {}).length + (d.cerca ? 1 : 0) + (d.o ? 1 : 0);
// the pacing (as the drama manager of Façade, or RimWorld's storyteller, in small): the scenes marked «grande» start
// something big of the book; at most RITMO_GRANDES of them a day, so that two never fall on the same evening
const RITMO_GRANDES = 1;
// what conversations added beyond the day's once: one a day for each quality, the days after (habilidadesTick)
function sumasPendientes(){
  const P = game.wm?.sumaPend; if (!P?.length) return; const H = (game.wm.sumaHoy ||= {});
  for (const p of P.slice()) if (H[p.q] !== today()) { H[p.q] = today(); const [nombre, dueño, hacia] = p.q.split(':'); cualidadSuma(dueño, nombre, p.n, hacia); P.splice(P.indexOf(p), 1); }
}
const ritmoLleno = () => game.wm?.ritmo?.d === today() && game.wm.ritmo.n >= RITMO_GRANDES;
function ritmoMarca(id){ const R = game.wm.ritmo?.d === today() ? game.wm.ritmo : (game.wm.ritmo = { d: today(), n: 0, escenas: [] }); R.n++; R.escenas.push(id); }
function dlgHacer(list){   // what a scene does when it starts or ends
  for (const a of list || []) {
    if (a.hecho) dlgHecho(a.hecho);
    if (a.marca) cap1Mark(a.marca, a.nota);
    if (a.log) logEv(a.log, []);
    if (a.saber) { const [k, f] = a.saber; enterarse(k, f); }   // (someone learns a piece of news: and it goes on as src/datos/noticias.txt says)
    if (a.meta) { const m = a.meta; agentStart(m.quien, { ...G[m.tipo](m.quien, ...(m.args || [])), ...(m.texto ? { text: m.texto } : {}), ...(m.prioridad === 3 ? { urgente: true } : {}) }, { label: m.etiqueta || m.texto, prio: m.prioridad }); }   // (urgent, from the story: it cuts short whatever she was staying for)
    if (a.soltar && FOLKBY[a.soltar]) FOLKBY[a.soltar].talkT = TT + 1;
    if (a.ana) Object.assign(ana, a.ana);
    if (a.olvidar) delete dlgHechos()[a.olvidar];   // (it is no longer so: the prohibition, once forgiven)
    if (a.ofensa) { const [k, o, motivo, n] = a.ofensa; game.wm.ofensa[k + '>' + o] = motivo; relSetW(k, o, Math.min(relGetW(k, o), +n)); }   // (k is offended with o)
    if (a.triste) realR.setFact('triste:' + a.triste);
    if (a.nombrar) nombrar(a.nombrar, a.n);
    if (a.sentar) { const q = SEATS[a.sentar], b = a.sentar === 'ana' ? ana : PEOPLE[a.sentar]; if (q && b) { b.x = q[0]; b.y = q[1]; b.dir = q[2]; b.sit = true; b.moving = false; b.nav = null; if (b !== ana) b.mealSat = true; else { ana.goto = null; ana.vx = ana.vy = 0; } } }
    if (a.ropa_tirada) game.wm.ropaTirada = true;
    if (a.camison) { game.wm.camison = true; game.wm.sinSombrero = true; }
    if (a.sin_sombrero) game.wm.sinSombrero = true;
    if (a.pasa_tiempo) dayT += a.pasa_tiempo / 24;
    if (a.a_cocina) {
      if (game.scene !== 'gg') { ana.enCama = null; ana.goto = null; goIn('gg', [KDOOR.x + 40, KIT.h * .6]); }
      const M = PEOPLE.marilla; if (sceneOf('marilla') !== 'gg') { M.where = 'gg'; M.x = STOVE.x + 60; M.y = STOVE.y + 60; M.nav = null; M.moving = false; M.sit = false; }
    }
    if (a.junto) { const b = a.junto === 'ana' ? ana : PEOPLE[a.junto], o = a.de === 'ana' ? ana : PEOPLE[a.de]; if (b && o) { b.sit = false; if (b === ana) { ana.meal = null; ana.goto = null; ana.vx = ana.vy = 0; } else { b.nav = null; b.moving = false; } b.x = o.x - 20; b.y = o.y + 2; b.dir = 1; } }
    if (a.vestirse) vestirse(true);
    if (a.punto) puntoGuardar(a.punto, a.texto);
    if (a.final) finalMostrar(a.final, a.texto);
    if (a.a_pieza && game.scene !== 'ga') { ana.meal = null; ana.goto = null; if (cart.riding) cartOff(); goIn('ga', [GA.bed.x - 20, GA.bed.y + 16]); }
    if (a.acostarse) { if (game.scene !== 'ga') { ana.meal = null; goIn('ga', [GA.bed.x - 20, GA.bed.y + 16]); } setTimeout(() => { if (!sleeping) goToBed(); }, 500); }
    if (a.a_la_mesa && !ana.meal && game.scene === 'gg') mealSit();
    if (a.mesa) game.comida = a.mesa === 'nada' ? null : { que: a.mesa, dia: today() };
    if (a.cosa) { const [k, it, n] = a.cosa; if (k === 'ana') game.inv[it] = (game.inv[it] || 0) + n; else { const I = wmInv(k); I[it] = (I[it] || 0) + n; } if (k === 'ana' && ITEM_DEFS[it]) float('+' + itemText(it, n), ana.x, ana.y - 60); }
    if (a.dormir) { ana.enCama = null; ana.llora = false; goSleep(false, false, true); }   // (the scene itself puts her to sleep)
    if (a.entra) { const b = PEOPLE[a.entra]; if (b) { b.where = a.a; b.x = KDOOR.x + 30; b.y = KIT.h - 30; b.sit = false; b.nav = null; b.moving = false; b.dir = 0; } }
    if (a.sale) { const b = PEOPLE[a.sale]; if (b) { b.where = CH[a.sale]?.home || 'gg'; b.x = STAIRS.x - 30; b.y = STAIRS.y + 30; b.nav = null; } }
    if (a.levantar) { const b = a.levantar === 'ana' ? ana : PEOPLE[a.levantar]; if (b) { b.sit = false; b.llora = false; if (b !== ana) b.mealSat = false; } }
    if (a.afecto) { const [k, o, n] = a.afecto; relSetW(k, o, Math.max(relGetW(k, o), +n)); }   // (how much one cares for the other, at least so much)
    if (a.suma) { const [q, n] = a.suma, [nombre, dueño, hacia] = q.split(':'), H = (game.wm.sumaHoy ||= {});
      if (a.limitado && H[q] === today()) { (game.wm.sumaPend ||= []).push({ q, n: +n }); continue; }   // (from conversations, each quality goes up at most once a day: the rest shows on the days after)
      if (a.limitado) H[q] = today();
      cualidadSuma(dueño, nombre, +n, hacia);
      if (nombre === 'afecto' && hacia === 'ana' && PEOPLE[dueño] && !navigator.webdriver) {   // (Ana, liked a little more or a little less: shown, so the player sees what her choices do)
        const b = PEOPLE[dueño]; if (sceneOf(dueño) === game.scene && +n > 0) hearts(b.x, b.y - 56);
        notice(+n > 0 ? '♥ ' + NAMES[dueño] + ' te mira con otros ojos (cariño ' + Math.round(relGetW(dueño, 'ana')) + '/5)' : '💔 ' + NAMES[dueño] + ' se enfrió contigo (cariño ' + Math.round(relGetW(dueño, 'ana')) + '/5)'); } }   // (a quality goes up, or down: «suma granja:ana 2», «suma afecto:diana:ana -1»)
    if (a.fin_capitulo) { CAP1.done = hourNow(); logEv('Fin del capítulo 1 (y del 2): Ana llegó a Tejas Verdes.', []); }
  }
}
const dlgPath = p => p.split('.').reduce((o, k) => o?.[k], LIBRO1);
// where the lines of a scene come from: 'libro:path' (LIBRO1), 'mas:n' (Ana's own on the road), 'relleno:n' (her loose musings)
function dlgFuente(s){ const i = s.indexOf(':'), k = s.slice(0, i), p = s.slice(i + 1); return k === 'libro' ? dlgPath(p) || [] : k === 'mas' ? VIAJE_MAS[+p] || [] : k === 'relleno' ? fillLines(+p || 1).map(l => [l.q, l.t]) : []; }
// what is said to pick up a conversation that was cut short (by who speaks next), unless the scene has its own `puente`
const DLG_PUENTE = {
  ana: ['Bueno, como le decía…', '¿Dónde iba? ¡Ah, sí!', 'Perdón, me distraje. Le estaba contando…', 'Pero volviendo a lo de antes…', 'Ya sé, ya sé, me fui por las ramas. ¿En qué estaba? Ah, sí…'],
  matthew: ['Bueno, pues… como decía…', 'Je. ¿En qué íbamos?'],
  otro: ['Como decía…', 'Bueno, lo que le contaba…'],
};
const dlgProg = () => game.dlgProg || (game.dlgProg = {});   // (where each conversation cut short was left)
const ROAD_PASO = .7;
const DLG_RESPIRO = 60, dlgComento = {};   // (a remark, at most one a minute in each channel: they go between the conversations)   // (the buggy at a walk, while something that matters is said)
class Dialogo {
  constructor(c){ Object.assign(this, { canal: 'general', tipo: 'conversacion', prioridad: 1, interrumpe: false, repetir: 'una_vez', pausa: 1.4 }, c); }
  dicha(){ const v = dlgDichas()[this.id]; return this.repetir === 'una_vez' ? !!v : this.repetir === 'dia' ? v === today() : false; }
  // (a conversation left halfway goes on before a new one of the same importance)
  // (and, of two of the same importance, the most specific: the one that asks more of the moment, as in Valve's dialogue rules)
  get peso(){ return this.prioridad + (dlgProg()[this.id] ? .04 : 0) + dlgEspecificidad(this) * .001; }
  listo(x){
    if (this.disparo === 'encuentro' || this.disparo === 'conversar' || this.disparo === 'primera' || this.disparo === 'menu' || this.disparo === 'objeto' || this.disparo === 'lugar' || this.disparo === 'comentario') return false;   // (these only when two of them meet: dlgNext; or when Ana talks with someone: conversar)
    if (this.dicha() || (this.repetir.cada && TT < (this.proxima || 0))) return false;
    if (this.grande && ritmoLleno()) return false;   // (the pacing: one big thing of the book a day)
    if (this.tipo === 'comentario' && this.prioridad > 0 && TT < (dlgComento[this.canal] || 0)) return false;   // (remarks, not one after another)
    return dlgCumple(this, x);
  }
  porque(x){   // why it is not said now (for the panel)
    if (this.disparo === 'encuentro') return 'cuando se encuentran';
    if (this.disparo === 'conversar') return 'cuando Ana conversa con ' + this.con;
    if (this.disparo === 'objeto') return 'cuando Ana usa ' + this.objeto;
    if (this.disparo === 'lugar') return 'cuando Ana pasa por ' + this.lugar;
    if (this.dicha()) return 'ya dicha';
    if (this.grande && ritmoLleno()) return 'hoy ya pasó algo grande';
    if (this.repetir.cada && TT < (this.proxima || 0)) return 'otra vez en ' + Math.ceil(this.proxima - TT) + ' s';
    if (this.tipo === 'comentario' && this.prioridad > 0 && TT < (dlgComento[this.canal] || 0)) return 'hace poco hubo un comentario';
    return dlgFalla(this, x);
  }
  hablan(){   // who speaks in it (in its written lines, and in those of its choices)
    if (this._hablan) return this._hablan; const H = new Set();
    const ver = L => { if (Array.isArray(L)) for (const l of L) if (Array.isArray(l)) { if (l[0] === '?') for (const op of l[2] || []) ver(op.lineas); else if (!['!', 'narra', 'carta', 'ana'].includes(l[0])) H.add(l[0]); } else if (l?.lineas) ver(l.lineas); };
    ver(this.lineas_); return this._hablan = [...H];
  }
  lineas(){
    let L = this.lineas_;
    if (typeof L === 'string') L = dlgFuente(L);
    else if (Array.isArray(L) && L.length && !Array.isArray(L[0]) && (L[0].de || L[0].lineas)) L = L.flatMap(p => { const src = p.de ? dlgFuente(p.de) : p.lineas; return p.elegir ? p.elegir.map(i => src[i]).filter(Boolean) : src; });   // (pieces of several sources)
    L = (L || []).map(l => Array.isArray(l) ? l : [l.q, l.t, l.m]);
    if (this.elegir) L = this.elegir.map(i => L[i]).filter(Boolean);
    if (this.marcas) L = L.map((l, j) => this.marcas[j] && l[0] !== '!' && l[0] !== '?' ? [l[0], l[1], this.marcas[j]] : l);
    if (this.narra && !(this.narraSalvo && this.narraSalvo.every(c => dlgCond(c)))) L = [...this.narra.map(x => ['narra', x]), ...L];   // (what explains it, first; not what the player has just played)
    // (what changes with the day: the season, and something that really happened to her lately; a line left empty is not said)
    L = L.map(l => l[1] && /\{(estacion|noticia|[dD]e:)/.test(l[1]) ? [l[0], l[1].replace('{estacion}', ESTACION_TXT[S]).replace('{noticia}', () => cartaNoticia() || '').replace(/\{([dD])e:(\w+):(\w+)\}/g, (_, d, k, f) => { const q = quienConto(k, f); return d === 'D' ? q[0].toUpperCase() + q.slice(1) : q; }), l[2]] : l);   // ({de:marilla:x}: who told her; {De:…}, at the start of a sentence)
    return L.filter(l => l[1] && l[1] !== '…' && l[1].trim() !== '');
  }
  puenteDe(l){   // the line that picks it up again
    if (this.puente === false || ['?', '!', 'narra', 'carta'].includes(l[0])) return [];   // (a choice, an action, a card: no one to pick it up)
    if (Array.isArray(this.puente)) return this.puente.map(p => Array.isArray(p) ? p : [l[0], p]);
    return [[l[0], pick(DLG_PUENTE[l[0]] || DLG_PUENTE.otro)]];
  }
  decir(){
    const D = dlgDichas(), P = dlgProg(), p = P[this.id] || 0; if (this.repetir === 'una_vez') D[this.id] = true; else if (this.repetir === 'dia') D[this.id] = today();
    if (this.repetir.cada) this.proxima = TT + this.repetir.cada;
    if (this.tipo === 'comentario') dlgComento[this.canal] = TT + DLG_RESPIRO;
    const L = this.lineas(); if (p >= L.length) delete P[this.id]; if (!L.length || p >= L.length) return null;
    if (!p && this.interrumpe && this.tipo !== 'comentario') { if (typeof amb !== 'undefined' && amb.cur) ambEnd(); bubbles = []; }   // (a scene that cuts in: the loose line of a moment ago is not left over it)
    if (!p) { dlgHacer(this.al_empezar); if (this.grande) ritmoMarca(this.id); }
    if ((this.interrumpe || this.grande || this.narra || L.some(l => l[0] === '?')) && this.tipo !== 'comentario' && this.canal !== 'carta' && typeof GAME_SPEED !== 'undefined' && GAME_SPEED > 1 && !navigator.webdriver) setSpeed(1);   // (a scene: the time goes back to normal, so that it can be read)
    const pu = p ? this.puenteDe(L[p]) : [], k = pu.length;
    if (this.canal === 'carta') game.cartaEscena = { id: this.id, lineas: L.filter(l => l[0] === 'carta').map(l => l[1]) };   // (what she writes: the letter that goes)
    const escrita = l => l[0] === 'carta' ? ['ana', '✎ ' + l[1], l[2]] : l;   // (the lines of the letter: Ana reads them aloud as she writes them)
    const t = talkPlay([...pu, ...L.slice(p)].map(escrita), { ch: this.canal, hold: this.sujeta, delay: this.espera ?? .6, gap: this.entre, end: () => {
      dlgPausa[this.canal] = TT + this.pausa;
      if (t.interrupted) {   // cut short: a comment is lost; a conversation is left where it was (the line cut in its first half is said again)
        const n = t.i - k, next = n < 0 ? p : p + n + (t.wait > lineDur(t.lines[t.i]?.t || '') / 2 ? 0 : 1);
        if (this.tipo !== 'comentario' && next < L.length) { if (next) P[this.id] = next; delete D[this.id]; return; }
      }
      delete P[this.id]; dlgHacer(this.al_terminar);
      if (this.interrumpe && typeof amb !== 'undefined') for (const k of Object.keys(PEOPLE)) amb.mute[k] = Math.max(amb.mute[k] || 0, TT + 90);   // (after something big, a while without loose lines: it is left to sink in)
      if (this.interrumpe) dlgRespiro = TT + 90;   // (and the smaller scenes wait too: one thing at a time)
    } });
    t.prio = this.prioridad; t.esc = this.id; t.paso = this.al_paso; t.desde = p; t.puente = k; return t;
  }
}
const DIALOGOS = [], dlgPausa = {}; let dlgRespiro = 0;   // (after a scene that cut in, a breather: only those that cut in too, the chains of the book, before it ends)
// (the configurations keep their lines under `lineas`; the class reads them through lineas())
const dlgNuevo = c => { const { lineas, ...r } = c; return new Dialogo({ ...r, lineas_: lineas }); };
Dialogo.registrar = c => { const d = dlgNuevo(c); DIALOGOS.push(d); return d; };
let dlgT = 0;
function dlgTick(dt){
  if ((dlgT -= dt) > 0) return; dlgT = .3;
  const x = dlgCtx(), best = {};
  const conAna = TALKS.some(t => t.lines.slice(t.i).some(l => l.q === 'ana' || l.q === '?' || l.q === 'narra'));   // (a scene with Ana under way: no other starts over it, here or anywhere)
  for (const d of DIALOGOS) if ((TT >= dlgRespiro || d.interrumpe) && (!conAna || d.interrumpe) && d.listo(x) && (!best[d.canal] || d.peso > best[d.canal].peso)) best[d.canal] = d;
  for (const [ch, d] of Object.entries(best)) {
    const cur = TALKS.find(t => t.ch === ch);
    if (cur) { if (!(d.interrumpe && d.prioridad > (cur.prio ?? 0)) || cur.lines.length - cur.i <= 2) continue; cur.interrupted = true; talkEnd(cur); }   // (a more important one cuts in: the tunnel of trees; but what is about to end ends first)
    else if (TT < (dlgPausa[ch] || 0)) continue;
    d.decir();
  }
}
// the talks of pairs and trios: when two (or three) of them meet, the next one not said that fits where they are
function dlgNext(ks){
  const key = dlgKey(ks), x = dlgCtx();
  const d = DIALOGOS.find(e => e.disparo === 'encuentro' && dlgKey(e.quienes) === key && !e.dicha() && dlgCumple(e, x)); if (!d) return null;
  dlgDichas()[d.id] = true; dlgHacer(d.al_empezar); dlgHacer(d.al_terminar);   // (an encounter is said all at once: what it does, at once too)
  return d.lineas().map(([q, t]) => ({ q, t }));
}
// the scenes, as a script outside the code (the <script type="text/plain" id="guion"> block, at the top): each one
// «=== id ===», its fields, one per line («field: value»), and its own lines after «---» («who: text #mark»).
// dlgGuion turns it into the same configurations as anywhere else (docs/ESCENAS.md).
const DLG_LISTA = ['sujeta', 'quienes', 'si', 'elegir', 'cerca'], DLG_PARES = ['en', 'marcas', 'camino'], DLG_NUM = ['prioridad', 'pausa', 'espera', 'entre'], DLG_SI = ['interrumpe', 'al_paso', 'grande', 'tambien'];
const dlgVal = s => { s = s.trim(); return s === '-' ? null : s === 'true' || s === 'sí' ? true : s === 'false' || s === 'no' ? false : s !== '' && !isNaN(+s) ? +s : s; };
function dlgCampo(k, v){   // a field of the script, from its text
  if (DLG_LISTA.includes(k)) return v.split(',').map(dlgVal);
  if (DLG_PARES.includes(k)) return Object.fromEntries(v.split(/[,\s]+/).filter(Boolean).map(p => { const i = p.indexOf('='); return i < 0 ? [p, true] : [p.slice(0, i), dlgVal(p.slice(i + 1))]; }));
  if (DLG_NUM.includes(k)) return +v;
  if (DLG_SI.includes(k)) return v === '' || dlgVal(v) === true;
  if (k === 'repetir') { const m = v.match(/^cada\s+(\d+)/); return m ? { cada: +m[1] } : v; }
  if (k === 'o') { const a = {}; for (const p of v.split(/\s+/).filter(Boolean)) { const i = p.indexOf('='), [f, g] = p.slice(0, i).split('.'), w = p.slice(i + 1); if (g) (a[f] ||= {})[g] = dlgVal(w); else a[f] = dlgCampo(f, w); } return a; }
  return v;
}
function dlgAccion(s){   // an action of the script: «hecho x», «marca id | nota», «log texto», «saber quien qué», «soltar quien», «ana campo=valor», «meta quien tipo args | texto | etiqueta | prioridad», «fin_capitulo»
  const [w, ...r] = s.split(' '), rest = r.join(' '), part = rest.split('|').map(x => x.trim());
  switch (w) {
    case 'hecho': return { hecho: rest };
    case 'marca': return { marca: part[0], nota: part[1] || undefined };
    case 'log': return { log: rest };
    case 'saber': case 'contar': return { saber: r };   // (a fact that someone knows: «contar marilla diana_borracha»)
    case 'suma': return { suma: r };
    case 'soltar': return { soltar: rest };
    case 'ana': return { ana: dlgCampo('en', rest) };
    case 'afecto': return { afecto: r };
    case 'olvidar': return { olvidar: rest };
    case 'ofensa': return { ofensa: r };
    case 'triste': return { triste: rest };
    case 'fin_capitulo': return { fin_capitulo: true };
    case 'nombrar': return { nombrar: r[0], pedir: r[1] === '?' };
    case 'sentar': return { sentar: r[0] };
    case 'dormir': return { dormir: true };
    case 'cosa': return { cosa: [r[0], r[1], +(r[2] || 1)] };   // (someone gets a thing: «cosa ana semillas 1»)
    case 'ropa_tirada': return { ropa_tirada: true };   // (her clothes, left on the floor)
    case 'camison': return { camison: true };
    case 'sin_sombrero': return { sin_sombrero: true };   // (Ana takes her hat off)
    case 'pasa_tiempo': return { pasa_tiempo: +r[0] };   // (hours go by: the trip there and back)
    case 'mesa': return { mesa: r[0] };
    case 'a_la_mesa': return { a_la_mesa: true };
    case 'a_cocina': return { a_cocina: true };
    case 'acostarse': return { acostarse: true };
    case 'a_pieza': return { a_pieza: true };
    case 'vestirse': return { vestirse: true };   // (Ana puts on her dress)
    case 'punto': return { punto: part[0], texto: part[1] };   // (a point to come back to: «punto viaje | Volver a la mañana del viaje»)
    case 'final': return { final: part[0], texto: part[1] };   // (the story ends here: «final devuelta | Ana se fue con la Sra. Blewett»)   // (Ana is taken up to her room)   // (Ana goes up to bed: her room, and the bed)
    case 'junto': return { junto: r[0], de: r[1] };   // (one goes to the side of the other: «junto ana marilla», for a hug)   // (Marilla calls her: Ana comes into the kitchen, and Marilla is there)   // (Ana sits down to eat with the Cuthberts)   // (what is on the kitchen table: «mesa cena», «mesa desayuno», «mesa nada»)
    case 'entra': return { entra: r[0], a: r[1] };   // (someone comes into a room: «entra marilla ga», at its door)
    case 'sale': return { sale: r[0] };   // (and goes back down, home)   // (Ana goes to sleep: the night passes)   // (at her or his place at the kitchen table)
    case 'levantar': return { levantar: r[0] };   // (Ana names a thing: «nombrar lago», the book's name; «nombrar lago ?», the player writes it)
    case 'meta': { const [quien, tipo, args = ''] = part[0].split(/\s+/); return { meta: { quien, tipo, args: args ? args.split(',').map(dlgVal) : [], texto: part[1] || undefined, etiqueta: part[2] || undefined, prioridad: part[3] ? +part[3] : undefined } }; }
  }
  throw new Error('guion: acción desconocida «' + s + '»');
}
function dlgGuion(txt){
  const out = []; let c = null, body = false;
  for (const raw of txt.split('\n')) {
    const s = raw.trim(); if (!s || s[0] === '#') continue;
    const h = s.match(/^===\s*(.+?)\s*===$/); if (h) { out.push(c = { id: h[1], _l: [] }); body = false; continue; }
    if (!c) continue;
    if (s === '---') { body = true; continue; }
    const i = s.indexOf(':'); let k = i < 0 ? s : s.slice(0, i).trim(), v = i < 0 ? '' : s.slice(i + 1).trim();
    if (body) {
      { const pm = k.match(/^(\S+)\s+piensa$/); if (pm) { k = pm[1]; v = '~' + v; } }   // (what one thinks: «ana piensa: …», a cloud, not a bubble)
      // a choice (as in Yarn Spinner): «-> what Ana can do» (with «->*», what she would do on her own), and under it,
      // indented, its own lines («quien: texto») and what it does («! hecho x», «! suma afecto:marilla:ana 1»)
      if (s.startsWith('->')) { const last = c._l.at(-1), op = { texto: s.replace(/^->\*?\s*/, ''), propia: s.startsWith('->*'), lineas: [], efectos: [] }; if (last?.[0] === '?' && c._ultimaOpcion) last[2].push(op); else c._l.push(['?', 'elige', [op]]); c._ultimaOpcion = op; continue; }
      if (c._ultimaOpcion && /^\s/.test(raw)) { const op = c._ultimaOpcion; if (s.startsWith('!')) op.efectos.push(dlgAccion(s.slice(1).trim())); else op.lineas.push([k, v]); continue; }
      c._ultimaOpcion = null;
      if (s.startsWith('!')) { c._l.push(['!', 'accion', dlgAccion(s.slice(1).trim())]); continue; }   // (something done in the middle of the scene, when its turn comes: «! sentar ana», «! ana llora=true»)
      const m = v.match(/^(.*?)\s+#(\S+)$/); c._l.push(m ? [k, m[1], m[2]] : [k, v]); continue; }
    if (k === 'al_empezar' || k === 'al_terminar') (c[k] ||= []).push(dlgAccion(v));
    else if (k === 'narra') (c.narra ||= []).push(v);   // (a text that explains, before the scene: a card, as in a book)
    else if (k === 'narra salvo') c.narraSalvo = v.split(',').map(x => x.trim());   // (the cards, unless this holds: what they tell, the player has just played)
    else if (k === 'o') (c.o ||= []).push(dlgCampo('o', v));
    else c[k] = dlgCampo(k, v);
  }
  return out.map(({ _l, lineas, _ultimaOpcion, ...c }) => {   // the lines: from the book (all, or a piece: «libro:x [1,2]»), and/or its own
    const ref = lineas && lineas.split('+').map(r => { const m = r.trim().match(/^(\S+)(?:\s*\[([\d,\s]+)\])?$/); return { de: m[1], ...(m[2] ? { elegir: m[2].split(',').map(Number) } : {}) }; });
    return { ...c, lineas: ref ? [...ref, ...(_l.length ? [{ lineas: _l }] : [])] : _l };
  });
}
const ESCENAS = dlgGuion(document.getElementById('guion')?.textContent || '');
for (const c of ESCENAS) Dialogo.registrar(c);
// the conversations of Ana with her own (src/datos/conversaciones.txt): scenes too, available by closeness, had from the
// menu of the person (or now and then by themselves, when Ana is near and free), as many as she likes; what they add to
// a quality (affection, a skill), at most once a day for each quality
const CONVERSACIONES = dlgGuion(document.getElementById('conversaciones')?.textContent || '').map(c => Dialogo.registrar({ ...c, disparo: 'conversar', canal: 'conv', quienes: [c.con, 'ana'], sujeta: [c.con], tema: c.tema || c.id, al_terminar: (c.al_terminar || []).map(a => a.suma ? { ...a, limitado: true } : a) }));
// the comments (src/datos/comentarios.txt): scenes of one line, grouped by the moment they are said in; the same
// conditions, chosen by the same engine, but they hold no one, do nothing, and can be said again
function comentariosLeer(txt){
  const out = []; let g = null;
  for (const raw of txt.split('\n')) {
    const s = raw.trim(); if (!s || s[0] === '#') continue;
    let m;
    if ((m = s.match(/^===\s*(.+?)\s*===$/))) { g = { momento: m[1], quien: 'ana', si: [] }; continue; }
    if (!g) continue;
    if ((m = s.match(/^quien:\s*(\S+)/))) g.quien = m[1];
    else if ((m = s.match(/^si:\s*(.*)$/))) g.si = m[1].split(',').map(x => x.trim()).filter(Boolean);
    else if ((m = s.match(/^-\s*(?:\[([^\]]*)\]\s*)?(.+)$/))) { const si = [...g.si, ...(m[1] ? m[1].split(',').map(x => x.trim()).filter(Boolean) : [])]; out.push({ id: 'com:' + g.momento + ':' + out.filter(c => c.momento === g.momento).length, disparo: 'comentario', momento: g.momento, canal: 'comentario', tipo: 'comentario', repetir: 'siempre', prioridad: 0, ...(si.length ? { si: si.map(dlgVal) } : {}), lineas: [[g.quien, m[2]]] }); }
  }
  return out;
}
const COMENTARIOS = comentariosLeer(document.getElementById('comentarios')?.textContent || '').map(c => Dialogo.registrar(c));
// one comment of that moment that can be said now (not the one of last time; the more specific ones, twice as often)
const comentarioUlt = {};
function comentarioElegir(m){
  const x = dlgCtx(), C = COMENTARIOS.filter(d => d.momento === m && dlgCumple(d, x)); if (!C.length) return null;
  const U = C.length > 1 ? C.filter(d => d.id !== comentarioUlt[m]) : C, P = U.flatMap(d => dlgEspecificidad(d) ? [d, d] : [d]), d = pick(P);
  comentarioUlt[m] = d.id; const [q, t] = d.lineas()[0]; return { q, t };
}
const comentarioTexto = m => comentarioElegir(m)?.t || '';
// said, in a bubble: by Ana, or by whoever (quien, for «quien: *»)
function comentar(m, quien){
  const c = comentarioElegir(m); if (!c) return false;
  const q = c.q === '*' ? quien : c.q; if (!q) return false;
  if (q === 'ana') anaSays(c.t); else sayB(talkQ(q), c.t);
  return true;
}
const convDisponibles = k => !dlgHechos().desayuno_prueba ? [] : CONVERSACIONES.filter(d => d.con === k && !d.dicha() && game.convDejada?.[d.id] !== today() && dlgCumple(d, dlgCtx())).sort((a, b) => b.peso - a.peso);   // (one they set out to have somewhere and left halfway, not again today)
// a conversation done with the hands is had where it is done («se_hace_en: huertito, huerta»: the first of those places
// there is; a place outdoors, or a room: «gg», the kitchen of Green Gables): if they are elsewhere, they go there
// together first (Ana, and whoever it is with), and it begins when both have arrived (not sowing in the kitchen, nor
// baking in the garden)
const convSitio = d => String(d.se_hace_en || '').split(',').map(s => s.trim()).find(p => PLACES[p] || ROOMS[p]) || null;
const convEnSitio = (d, s) => { if (ROOMS[s]) return game.scene === s && wmScene(d.con) === s; const [, x, y] = PLACES[s], p = wmBody(d.con); return game.scene === 'out' && dist(ana.x, ana.y, x, y) < 110 && wmScene(d.con) === 'out' && dist(p.x, p.y, x, y) < 130; };
function convIr(d, s){
  const sala = ROOMS[s] && HOUSES[s], nombre = sala ? 'la cocina' : PLACES[s][0]; close();
  game.convIr = { id: d.id, s, hasta: TT + M(90) }; PEOPLE[d.con].vamos = { place: s, hasta: TT + M(90) };
  if (sala) { if (game.scene !== s) { if (game.scene !== 'out') goOut(); ana.goto = { id: 'h:' + s, scene: 'out', dest: true }; } }
  else goDest(PLACES[s][1] - 34, PLACES[s][2] + 10);
  sayB(talkQ(d.con), d.con === 'matthew' && !sala ? `Bueno, pues… eso se aprende en ${nombre}, con las manos en la tierra. Vamos.` : `Eso se aprende en ${nombre}, no aquí. Vamos.`);
}
function convIrTick(){
  const g = game.convIr; if (!g) return; const d = CONVERSACIONES.find(c => c.id === g.id);
  if (!d || TT > g.hasta || d.dicha()) { if (d) { delete PEOPLE[d.con].vamos; (game.convDejada ||= {})[d.id] = today(); } game.convIr = null; return; }
  if (convEnSitio(d, g.s)) { delete PEOPLE[d.con].vamos; game.convIr = null; conversar(d); }
}
function conversar(d){   // a conversation, now: said in its own channel, holding the other still, once
  const s = convSitio(d); if (s && !convEnSitio(d, s)) return convIr(d, s);
  for (const t of TALKS.filter(t => t.ch === 'conv')) talkEnd(t);
  logEv('Ana conversó con ' + wmName(d.con) + ': ' + d.tema.replace(/^./, c => c.toLowerCase()) + '.', []);
  return d.decir();
}
// the talk of the road, as self-contained scenes: each one a whole topic, with its beginning and its end (they can
// be said in any order, unless one says it needs another: «si»). Pieces: L<stretch>:<lines> are the book's lines of
// that stretch (LIBRO1.viaje), M<stretch>:<lines> Ana's own (VIAJE_MAS). Where: a thing in sight (visible), or the
// stretch where the book has it (from there on). The moments of the chapter (key) come in their order; they and the
// ones that must not be missed (imprescindible) are said with the buggy at a walk. Ana's own are remarks (comentario).
const VIAJE_ESCENAS = [
  // the book
  ['novia', 'La novia del cerezo', 'L0:0-5', { visible: 'flores', key: 1, marcas: { 0: 'rama_ciruelo' } }],
  ['mi_cerezo', 'Mi cerezo', 'L0:6-8', { visible: 'cerezo' }],
  ['barrancos', 'Un río de flores', 'L0:9-10', { visible: 'barranco' }],
  ['vestido_blanco', 'El vestido blanco y las mangas abullonadas', 'L1:0,1,8-11', { si: ['dicha:novia'] }],
  ['la_carreta', 'La señora de la carreta', 'L1:2-3', { visible: 'carreta' }],
  ['wincey', 'El vestido de wincey', 'L1:4-7', {}],
  ['tren_barco', 'El tren y el barco', 'L2:0-6', {}],
  ['abetos', 'Abetos balsámicos', 'L2:7-10', { visible: 'abetos' }],
  ['isla_florida', 'La isla más florida', 'L3:0-3', { visible: 'flores' }],
  ['caminos_rojos', 'Los caminos rojos', 'L3:4-9 L4:0-1', { imprescindible: 1 }],
  ['el_golfo', 'El golfo', 'L4:2-3', { visible: 'mar' }],
  ['hablo_demasiado', '¿Hablo demasiado?', 'L4:4-10', { key: 1, marcas: { 2: 'hablar_todo' } }],
  ['arboles_orfanato', 'Los arbolitos del orfanato', 'L5:0-6', { imprescindible: 1 }],
  ['el_arroyo', 'Un arroyo cerca de Tejas Verdes', 'L5:7-10', {}],
  ['sra_hammond', 'La señora Hammond y los mellizos', 'L6:0-7', { visible: 'aserradero' }],
  ['amiga_imaginaria', 'La amiga del aparador', 'L6:8-9', {}],
  ['nabos', 'Los nabos', 'L7:0-3', { visible: 'granjero' }],
  ['marilla', '¿Cómo es su hermana?', 'L7:4-7', { imprescindible: 1 }],
  ['la_yegua', 'La yegua sin nombre', 'L7:8-10', {}],
  ['casita_lilas', 'La casita con lilas', 'L8:0-2', { visible: 'lilas' }],
  ['el_velero', 'La nube velero', 'L8:3-6', {}],
  ['la_iglesia', 'La iglesia blanca', 'L8:7-10', { visible: 'iglesia' }],
  ['pelo_rojo', 'El pelo rojo', 'L9:0-8', { key: 1, marcas: { 0: 'pelo_rojo' } }],
  ['divinamente', '¿Divinamente hermoso o angelicalmente bueno?', 'L9:9-10 L10:0-4', { si: ['dicha:pelo_rojo'] }],
  ['cielo_rosado', 'El cielo se ruboriza', 'L10:5-6', { visible: 'curva' }],
  // Ana's own
  ['m_barranco', 'Un pasillo de castillo', 'M0:0-2', { visible: 'barranco' }],
  ['m_abedules', 'Damas de honor', 'M0:3-4', { visible: 'barranco' }],
  ['m_rama', 'La rama de ciruelo', 'M0:5-7', { visible: 'flores', si: ['dicha:novia'] }],
  ['m_manzanos', 'Nombres para los manzanos', 'M1:3,7', { visible: 'flores' }],
  ['m_granjas', 'Las granjas no son celosas', 'M1:4-6', { tramo: 1 }],
  ['m_sombra', 'La sombra de los abetos', 'M2:0', { visible: 'abetos' }],
  ['m_olor', 'Un frasco de bosque', 'M2:1-3', { visible: 'abetos' }],
  ['m_sono_bosque', 'El bosque soñado', 'M2:4', { visible: 'abetos' }],
  ['m_zorzal', 'El zorzal', 'M2:5-7', { visible: 'abetos' }],
  ['m_hondonada', 'Un tazón de nieve', 'M3:0-2', { visible: 'flores' }],
  ['m_primaveras', 'Sesenta primaveras', 'M3:3-7', { tramo: 3 }],
  ['m_todo_el_mundo', 'Todo el mundo de la isla', 'M4:0', { visible: 'mar' }],
  ['m_mar_azul', 'El mar se peina', 'M4:1-2', { visible: 'mar' }],
  ['m_arena', 'Arena de dos colores', 'M4:3-5', { visible: 'mar' }],
  ['m_juguetes', 'Graneros de juguete', 'M4:6-7', { tramo: 4 }],
  ['m_arces', 'Los arces viejos', 'M5:0', { tramo: 5 }],
  ['m_abejas', 'Las abejas virtuosas', 'M5:1-3', { tramo: 5 }],
  ['m_arroyito', 'Todo está conectado', 'M5:4-7', { tramo: 5 }],
  ['m_madera', 'Madera recién cortada', 'M6:0-1', { visible: 'aserradero' }],
  ['m_cuentos', 'Cuentos para los mellizos', 'M6:2-5', { visible: 'aserradero', si: ['dicha:sra_hammond'] }],
  ['m_rueda', 'La rueda del aserradero', 'M6:6-7', { visible: 'aserradero' }],
  ['m_sembrador', 'Semillas de esperanza', 'M7:0', { visible: 'granjero' }],
  ['m_vacas', 'Lo que piensan las vacas', 'M7:1-5', { visible: 'vacas' }],
  ['m_cercas', 'Costuras de campo', 'M7:6-7', { tramo: 7 }],
  ['m_cementerio', 'Un jardín para descansar', 'M8:0', { visible: 'iglesia' }],
  ['m_lilas', 'A Marilla le gustan las lilas', 'M8:1-4', { visible: 'lilas' }],
  ['m_domingos', 'Un sombrero para los domingos', 'M8:5-7', { visible: 'iglesia' }],
  ['m_sauces', 'Los sauces', 'M9:0', { visible: 'sauces' }],
  ['m_puentecito', 'Un tambor chiquito', 'M9:1-2', { visible: 'sauces' }],
  ['m_luz', 'La luz dorada', 'M9:3-7', { tramo: 9 }],
  ['m_vestido_baile', 'Un vestido de baile', 'M10:0', { tramo: 10 }],
  ['m_falta_mucho', '¿Falta mucho?', 'M10:1-3', { tramo: 10 }],
  ['m_vuelta', 'Las vueltas del camino', 'M10:4-7', { visible: 'curva' }],
];
// (from the short notation to the configuration of a Dialogo: the same as any other scene)
{ const piezas = p => p.split(' ').map(t => { const [, src, v, ls] = t.match(/^([LM])(\d+):(.+)$/); const idx = ls.split(',').flatMap(r => { const [a, b] = r.split('-').map(Number); return b == null ? [a] : Array.from({ length: b - a + 1 }, (_, i) => a + i); }); return { de: (src === 'L' ? 'libro:viaje.' : 'mas:') + v, elegir: idx }; });
  const base = { canal: 'viaje', calesa: 'camino' };
  const keys = VIAJE_ESCENAS.filter(e => e[3].key).map(e => e[0]);
  VIAJE_ESCENAS.forEach(([id, nombre, p, o], order) => {
    const book = p.startsWith('L'), v = +p.match(/^[LM](\d+)/)[1], tr = ROAD_TRAMOS.find(t => t.v === v), ki = keys.indexOf(id);
    const si = [...(o.si || []).map(c => c.replace(/^dicha:/, 'dicha:viaje:')), ...(ki > 0 ? ['dicha:viaje:' + keys[ki - 1]] : [])];
    const camino = o.visible ? { no_callado: true, visible: o.visible } : o.tramo != null ? { no_callado: true, tramo_v: o.tramo } : { no_callado: true, desde: tr ? tr.s : 0 };
    const prioridad = o.key ? (o.visible ? 3.65 : 3.55) : o.visible ? (book ? 3.5 : 2.2) : book ? (o.imprescindible ? 2.5 : 2) - order / 1000 : 1 - order / 1000;
    Dialogo.registrar({ ...base, id: 'viaje:' + id, nombre, prioridad, tipo: book ? 'conversacion' : 'comentario', al_paso: !!(o.key || o.imprescindible), interrumpe: !!(book && o.visible && !o.key), camino, si, lineas: piezas(p), marcas: o.marcas });
  });
}
// the talks of pairs and trios (DLG_BANK), as scenes too: when they meet, where it makes sense
for (const [key, list] of Object.entries(DLG_BANK)) list.forEach((blk, i) => { const si = [...(Array.isArray(blk) ? [] : blk.si || []), ...(/\bana\b/.test(key) && /\bdiana\b/.test(key) ? ['hecho:conocidas_diana', '!hecho:prohibida'] : [])];   // (each with its conditions: they do not talk as if they knew each other before they do; Ana and Diana, friends, and not forbidden)
  Dialogo.registrar({ id: 'par:' + key + ':' + i, disparo: 'encuentro', quienes: key.split('+'), donde: Array.isArray(blk) ? undefined : blk.at, lineas: Array.isArray(blk) ? blk : blk.l, ...(si.length ? { si } : {}) }); });
// the school: rows of desks, the master's desk, the blackboard, the stove, the windows over the river
function drawSchool(c, t, night){
  c.fillStyle = '#b98a58'; c.fillRect(0, 0, KIT.w, KIT.h);
  c.strokeStyle = 'rgba(110,70,40,.35)'; c.lineWidth = 1; for (let y = 2.4 * T; y < KIT.h; y += 14) { c.beginPath(); c.moveTo(0, y); c.lineTo(KIT.w, y); c.stroke(); }
  blob(c, [[0, 0], [KIT.w, 0], [KIT.w, 2.4 * T], [0, 2.4 * T]], '#e4dcbf'); c.fillStyle = '#7a5536'; c.fillRect(0, 2.4 * T - 5, KIT.w, 5);
  blob(c, [[3.6 * T, 14], [9.4 * T, 14], [9.4 * T, 56], [3.6 * T, 56]], '#2f3a34'); c.fillStyle = 'rgba(240,240,230,.75)'; c.font = '8px Georgia, serif'; c.textAlign = 'left'; c.fillText(SCHOOL_BOARD[seasonCount() % SCHOOL_BOARD.length], 3.9 * T, 34);
  for (const wx of [1.2 * T, 11.6 * T]) { blob(c, [[wx - 18, 14], [wx + 18, 14], [wx + 18, 50], [wx - 18, 50]], night > .3 ? '#3b4a72' : '#bfe0ea'); line(c, [[wx, 14], [wx, 50]], '#7a5536', 2.4, wx); }
}
const SCHOOL_DESKS = []; for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) SCHOOL_DESKS.push({ x: 2.6 * T + k * 2.6 * T, y: 4.6 * T + r * 1.5 * T });
const SCHOOL_BOARD = ['Lección de hoy: la isla del Príncipe Eduardo', 'Ortografía: «imaginación», «Avonlea»', 'Geometría: el triángulo', 'Historia: los primeros colonos'];
const drawDesk = (c, d) => { blob(c, [[d.x - 22, d.y - 16], [d.x + 22, d.y - 16], [d.x + 22, d.y - 8], [d.x - 22, d.y - 8]], '#8a6040'); c.fillStyle = '#6a4a30'; c.fillRect(d.x - 20, d.y - 8, 3, 8); c.fillRect(d.x + 17, d.y - 8, 3, 8); };
ROOMS.es = HOUSES.es.interior = {
  draw: drawSchool, place: 'en la escuela de Avonlea, entre los pupitres, junto al río', exitLabel: 'Salir',
  items: g => [...SCHOOL_DESKS.map(d => ({ y: d.y, draw: () => drawDesk(g, d) })), { y: 3.2 * T, draw: () => { blob(g, [[6.5 * T - 30, 3.2 * T - 18], [6.5 * T + 30, 3.2 * T - 18], [6.5 * T + 30, 3.2 * T], [6.5 * T - 30, 3.2 * T]], '#7a5536'); } }],
  blocked: (x, y) => SCHOOL_DESKS.some(d => Math.abs(x - d.x) < 24 && y > d.y - 18 && y < d.y + 2) || (Math.abs(x - 6.5 * T) < 32 && y > 3.2 * T - 20 && y < 3.2 * T + 2),
  glow: () => [6.5 * T, 3 * T, 170, '255,200,120', .35],
  actions: add => {
    const d = SCHOOL_DESKS[5]; add('pupitre', d.x, d.y + 10, 40, ana.sit ? 'Levantarse' : 'Sentarse en su pupitre', () => { if (ana.sit) { ana.sit = false; return; } ana.sit = true; ana.x = d.x; ana.y = d.y + 8; ana.dir = 0; logEv('Ana se sentó en su pupitre de la escuela.'); comentar('pupitre'); }, { pri: 4, hy: 18, hit: 30 });
    add('pizarra', 6.5 * T, 2.6 * T, 60, 'Mirar la pizarra', () => comentar('pizarra'), { pri: 6, hy: 30, hit: 50 });
  },
};
// the church: pews on both sides of the aisle, the pulpit, the tall windows
function drawChurch(c, t, night){
  c.fillStyle = '#c9a476'; c.fillRect(0, 0, KIT.w, KIT.h);
  blob(c, [[0, 0], [KIT.w, 0], [KIT.w, 2.4 * T], [0, 2.4 * T]], '#f1ead8'); c.fillStyle = '#7a5536'; c.fillRect(0, 2.4 * T - 5, KIT.w, 5);
  blob(c, [[5.9 * T, KIT.h], [7.1 * T, KIT.h], [7.1 * T, 2.4 * T], [5.9 * T, 2.4 * T]], '#a8443a', false);
  for (const wx of [2 * T, 4 * T, 9 * T, 11 * T]) { blob(c, [[wx - 12, 60], [wx + 12, 60], [wx + 12, 22], [wx, 12], [wx - 12, 22]], night > .3 ? '#3b4a72' : ['#bfe0ea', '#f5d58a', '#e8b4c0', '#bfe0ea'][Math.floor(wx / T) % 4]); line(c, [[wx, 14], [wx, 60]], '#7a5536', 1.6, wx); }
  blob(c, [[6.5 * T - 18, 2.4 * T + 20], [6.5 * T + 18, 2.4 * T + 20], [6.5 * T + 14, 2.4 * T - 6], [6.5 * T - 14, 2.4 * T - 6]], '#7a5536');
}
const PEWS = []; for (let r = 0; r < 4; r++) for (const sx of [3 * T, 10 * T]) PEWS.push({ x: sx, y: 4.2 * T + r * 1.2 * T });
const drawPew = (c, p) => { blob(c, [[p.x - 64, p.y - 14], [p.x + 64, p.y - 14], [p.x + 64, p.y - 4], [p.x - 64, p.y - 4]], '#7a5536'); blob(c, [[p.x - 64, p.y - 24], [p.x + 64, p.y - 24], [p.x + 64, p.y - 14], [p.x - 64, p.y - 14]], '#6a4a30'); };
// the hall: a stage with its curtain at the back, rows of benches, garlands of flowers when it has been decorated
const SALA = { stage: lugar('salon', 'escenario'), benches: mapaObjs('salon', 'banco') };   // (src/mapas/salon.tmj)
function drawSala(c, t, night){
  c.fillStyle = '#b8905e'; c.fillRect(0, 0, KIT.w, KIT.h);
  c.strokeStyle = 'rgba(110,70,40,.3)'; c.lineWidth = 1; for (let y = 2.4 * T; y < KIT.h; y += 14) { c.beginPath(); c.moveTo(0, y); c.lineTo(KIT.w, y); c.stroke(); }
  blob(c, [[0, 0], [KIT.w, 0], [KIT.w, 2.4 * T], [0, 2.4 * T]], '#e8dcc0');
  const s = SALA.stage; blob(c, [[s.x - 4.2 * T, s.y + 14], [s.x + 4.2 * T, s.y + 14], [s.x + 4.2 * T, s.y - 30], [s.x - 4.2 * T, s.y - 30]], '#8a5e3c'); blob(c, [[s.x - 4.2 * T, s.y + 14], [s.x + 4.2 * T, s.y + 14], [s.x + 4.2 * T, s.y + 22], [s.x - 4.2 * T, s.y + 22]], '#6a4428');   // (the stage, a step up)
  for (const sd of [-1, 1]) blob(c, [[s.x + sd * 4.2 * T, 4], [s.x + sd * 2.6 * T, 4], [s.x + sd * 3 * T, s.y - 30], [s.x + sd * 4.2 * T, s.y - 30]], '#a8303a');   // (the red curtain, drawn back)
  blob(c, [[s.x - 4.2 * T, 2], [s.x + 4.2 * T, 2], [s.x + 4.2 * T, 14], [s.x - 4.2 * T, 14]], '#8a2030');
  for (const wx of [1.2 * T, KIT.w - 1.2 * T]) blob(c, [[wx - 14, 58], [wx + 14, 58], [wx + 14, 18], [wx - 14, 18]], night > .3 ? '#3b4a72' : '#bfe0ea');
  if (realR.fact('sala_decorada')) for (let k = 0; k < 14; k++) { const x = .6 * T + k * (KIT.w - 1.2 * T) / 13, y = 24 + Math.sin(k * .9) * 6; line(c, [[x, y], [x + (KIT.w - 1.2 * T) / 13, 24 + Math.sin((k + 1) * .9) * 6]], '#5a8a3a', 2, k); ell(c, x, y, 4, 4, ['#f2c14e', '#e88ab0', '#f6f2f0', '#b48ad0'][k % 4], true); }   // (garlands of flowers)
  c.fillStyle = '#4a2f1c'; c.font = 'italic 9px Georgia, serif'; c.textAlign = 'center'; c.fillText('Salón del pueblo de Avonlea', s.x, s.y - 34);
}
const drawBench = (c, p) => { blob(c, [[p.x - 70, p.y - 12], [p.x + 70, p.y - 12], [p.x + 70, p.y - 4], [p.x - 70, p.y - 4]], '#7a5536'); for (const o of [-60, 60]) line(c, [[p.x + o, p.y - 4], [p.x + o, p.y + 2]], '#5a3a24', 2, o); };
ROOMS.sa = HOUSES.sa.interior = {
  draw: drawSala, place: 'en el salón del pueblo, con su escenario y sus bancos', exitLabel: 'Salir',
  items: g => SALA.benches.map(p => ({ y: p.y, draw: () => drawBench(g, p) })),
  blocked: (x, y) => (y < SALA.stage.y + 14 && Math.abs(x - SALA.stage.x) > 4.2 * T) || SALA.benches.some(p => Math.abs(x - p.x) < 72 && y > p.y - 14 && y < p.y),
  glow: () => [SALA.stage.x, SALA.stage.y - 10, 200, '255,210,140', .3],
  actions: add => { add('escenario', SALA.stage.x, SALA.stage.y, 80, 'Subir al escenario', () => { ana.goto = { x: SALA.stage.x, y: SALA.stage.y, scene: 'sa' }; anaSays(pick(['Desde aquí arriba el salón parece enorme. ¡Cuánta gente cabría!', '«Señoras y señores…» ¡Ay, qué nervios, y eso que no hay nadie!'])); }, { pri: 5 }); },
};
ROOMS.ig = HOUSES.ig.interior = {
  draw: drawChurch, place: 'en la iglesia de Avonlea, entre los bancos', exitLabel: 'Salir',
  items: g => PEWS.map(p => ({ y: p.y, draw: () => drawPew(g, p) })),
  blocked: (x, y) => PEWS.some(p => Math.abs(x - p.x) < 66 && y > p.y - 26 && y < p.y + 2) || (Math.abs(x - 6.5 * T) < 22 && y < 2.4 * T + 22),
  glow: () => [6.5 * T, 2.6 * T, 180, '255,210,140', .35],
  actions: add => {
    const p = PEWS[2]; add('banco', p.x, p.y + 8, 70, ana.sit ? 'Levantarse' : 'Sentarse en un banco', () => { if (ana.sit) { ana.sit = false; return; } ana.sit = true; ana.x = p.x; ana.y = p.y + 4; ana.dir = 0; logEv('Ana se sentó un rato en la iglesia.'); comentar('iglesia'); }, { pri: 4, hy: 18, hit: 50 });
  },
};

// the shop: the counter with its scale and jars of sweets, shelves of jars and bolts of cloth behind, barrels of flour
const SHOP_IN = { counter: { x: 6.5 * T, y: 3.7 * T, w: 7 * T }, barrels: [{ x: 1.3 * T, y: 6.6 * T }, { x: 2.3 * T, y: 7.1 * T }, { x: 11.6 * T, y: 6.8 * T }] };
function drawShop(c, t, night){
  c.fillStyle = '#b48a5c'; c.fillRect(0, 0, KIT.w, KIT.h);
  c.strokeStyle = 'rgba(110,70,40,.3)'; c.lineWidth = 1; for (let y = 2.4 * T; y < KIT.h; y += 14) { c.beginPath(); c.moveTo(0, y); c.lineTo(KIT.w, y); c.stroke(); }
  blob(c, [[0, 0], [KIT.w, 0], [KIT.w, 2.4 * T], [0, 2.4 * T]], '#d8c49a'); c.fillStyle = '#7a5536'; c.fillRect(0, 2.4 * T - 5, KIT.w, 5);
  // shelves along the back wall, full of things
  const JAR = ['#d9433b', '#f2c94c', '#7fb07a', '#e8a0b8', '#8fbfd2', '#c89050'];
  for (let r = 0; r < 3; r++) { const y = 18 + r * 20; c.fillStyle = '#6a4a30'; c.fillRect(1.4 * T, y + 12, KIT.w - 2.8 * T, 3);
    for (let k = 0; k < 18; k++) { const x = 1.6 * T + k * ((KIT.w - 3.2 * T) / 18); if ((k + r) % 5 === 4) { blob(c, [[x, y + 12], [x + 10, y + 12], [x + 10, y], [x, y]], ['#a8443a', '#4a6a9a', '#e8d6b0'][(k + r) % 3]); continue; } ell(c, x + 5, y + 6, 4, 6, JAR[(k * 3 + r) % JAR.length], true); blob(c, [[x + 2, y], [x + 8, y], [x + 8, y - 2], [x + 2, y - 2]], '#8a6a48'); } }
  // a window on the side, a sign over the shelves
  blob(c, [[KIT.w - 1.1 * T, 16], [KIT.w - .3 * T, 16], [KIT.w - .3 * T, 56], [KIT.w - 1.1 * T, 56]], night > .3 ? '#3b4a72' : '#bfe0ea');
  c.fillStyle = '#4a2f1c'; c.font = 'italic 9px Georgia, serif'; c.textAlign = 'center'; c.fillText('LAWSON · Mercería y almacén', KIT.w / 2, 12);
}
function drawCounter(c){
  const C = SHOP_IN.counter, x0 = C.x - C.w / 2, x1 = C.x + C.w / 2, y = C.y;
  blob(c, [[x0, y - 26], [x1, y - 26], [x1, y], [x0, y]], '#8a6040'); blob(c, [[x0 - 4, y - 30], [x1 + 4, y - 30], [x1 + 4, y - 24], [x0 - 4, y - 24]], '#a87850');
  for (let k = 0; k < 3; k++) { const jx = x0 + 30 + k * 26; ell(c, jx, y - 40, 9, 11, 'rgba(230,240,245,.55)', true); for (let q = 0; q < 6; q++) ell(c, jx - 4 + (q % 3) * 4, y - 36 - Math.floor(q / 3) * 5, 2, 2, ['#f4f4f4', '#7fd0a0', '#f08aa0'][k], true); }
  const sx = x1 - 50; line(c, [[sx, y - 30], [sx, y - 48]], '#8a7040', 1.6, 1); line(c, [[sx - 16, y - 46], [sx + 16, y - 46]], '#8a7040', 1.4, 2); ell(c, sx - 16, y - 40, 8, 2.4, '#c8a040', true); ell(c, sx + 16, y - 40, 8, 2.4, '#c8a040', true);
  for (let k = 0; k < 4; k++) line(c, [[C.x - 30 + k * 8, y - 30], [C.x - 34 + k * 8, y - 50 - (k % 2) * 6]], ['#d9433b', '#4a6a9a', '#f2c94c', '#e8a0b8'][k], 2.4, k);   // (ribbons on a stand)
}
const drawBarrel = (c, b) => { ell(c, b.x, b.y, 16, 5, 'rgba(30,20,10,.25)'); blob(c, [[b.x - 14, b.y], [b.x + 14, b.y], [b.x + 15, b.y - 30], [b.x - 15, b.y - 30]], '#9a6a3e'); ell(c, b.x, b.y - 30, 15, 5, '#f2ede2', true); for (const dy of [-8, -22]) line(c, [[b.x - 15, b.y + dy], [b.x + 15, b.y + dy]], '#5a3a24', 1.4, dy); };
ROOMS.tl = HOUSES.tl.interior = {
  draw: drawShop, place: 'en la tienda de Lawson, frente al mostrador', exitLabel: 'Salir',
  items: g => [{ y: SHOP_IN.counter.y, draw: () => drawCounter(g) }, ...SHOP_IN.barrels.map(b => ({ y: b.y, draw: () => drawBarrel(g, b) }))],
  blocked: (x, y) => (Math.abs(x - SHOP_IN.counter.x) < SHOP_IN.counter.w / 2 + 4 && y > SHOP_IN.counter.y - 34 && y < SHOP_IN.counter.y + 2) || SHOP_IN.barrels.some(b => Math.abs(x - b.x) < 18 && y > b.y - 12 && y < b.y + 4),
  glow: () => [6.5 * T, 2.8 * T, 170, '255,200,120', .35],
  actions: add => {
    add('mostrador', SHOP_IN.counter.x - 60, SHOP_IN.counter.y + 10, 70, 'Comprar o vender en el mostrador', shopMenu, { pri: 3, hy: 20, hit: 40 });
    add('frascos', SHOP_IN.counter.x - 140, SHOP_IN.counter.y + 8, 40, 'Mirar los frascos de caramelos', () => comentar('tienda'), { pri: 6, hy: 40, hit: 30 });
  },
};
// money: dollars and cents (only the cattle dealer pays in money)
const money = (n, short) => { n = r2(n || 0); return short ? n.toFixed(2).replace('.', ',') : n < 1 ? Math.round(n * 100) + ' centavos' : (n === 1 ? '1 dólar' : (Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')) + ' dólares'); };
// the Cuthberts' account book at Lawson's: what the house needs is written down, Marilla pays at the end of the month
function libretaAdd(who, x){
  const L = game.libreta = game.libreta || []; L.push({ x, who, d: today() + 1 }); if (L.length > 30) L.shift();
  logEv(`${wmName(who)} se llevó ${LIBRETA_ART[x]} de la tienda de Lawson, a la libreta de los Cuthbert.`); save();
}
const libretaToday = () => (game.libreta || []).filter(e => e.d === today() + 1 && e.who === 'ana').length;
// at Mr. Lawson's (his counter, or himself): two steps — what kind of errand, then what
function shopMenu(step){
  const L = FOLKBY.lawson, open = HOUSES.tl.open(), here = L && L.where !== 'in' && game.scene === L.where && dist(ana.x, ana.y, L.x, L.y) < 140;
  if (!open) return say('lawson', 'Ya cerré, Ana. Abro mañana a las ocho en punto, como siempre.', [['Adiós', close]]);
  if (!here && game.scene !== 'tl') return say('lawson', 'Pasa, pasa, que el mostrador está adentro.', [['Adiós', close]]);
  const I = game.inv, back = ['← Volver', () => shopMenu()];
  if (step === 'cambiar') {
    const opts = [];
    for (const c of Object.keys(TREATS)) { const o = tradeFor(I, c)[0]; if (o) opts.push([`${ITEM_DEFS[c].gift.art[0].toUpperCase() + ITEM_DEFS[c].gift.art.slice(1)}, por ${itemText(o.g, o.k)}`, () => shopTrade(c, o)]); }
    const has = Object.keys(TRADE).filter(g => I[g] > 0).map(g => itemText(g, I[g])).join(', ');
    return say('lawson', opts.length ? `Veamos qué traes: ${has}. ¿Qué te gustaría llevarte?` : has ? `Con ${has} todavía no alcanza para un capricho, Ana. Junta un poco más.` : 'No traes nada para cambiar. Huevos, fruta, una tarta de las tuyas... todo me sirve.', [...opts, back]);
  }
  if (step === 'libreta') {
    if (libretaToday() >= 2) return say('lawson', 'Ya llevas dos cosas anotadas hoy, Ana. Marilla me lo agradecerá si paramos aquí.', [back]);
    return say('lawson', '¿Qué hace falta en Tejas Verdes? Lo anoto en la libreta de los Cuthbert.', [...LIBRETA.map(x => [LIBRETA_ART[x][0].toUpperCase() + LIBRETA_ART[x].slice(1), () => shopLibreta(x)]), back]);
  }
  const opts = [['🧺 Cambiar algo que traigo por un capricho', () => shopMenu('cambiar')], ['📒 Llevar algo para la casa (a la libreta)', () => shopMenu('libreta')], ['📬 ¿Hay correo para mí?', correoRetirar]];
  if (L) opts.push(['Conversar con el Sr. Lawson', () => { close(); folkTalk(L); }]);
  opts.push(['Adiós', close]);
  say('lawson', conoceA('lawson') ? pick(lineasAjenas('lawson', ['¡Buenos días, Ana! ¿Qué se te ofrece?', 'Pasa, pasa. ¿Vienes a cambiar algo o te manda Marilla?', 'Llegaron cintas nuevas, Ana. ¿Qué se te ofrece?'])) : (conocer('lawson'), sabeK('lawson', 'nina_cuthbert') ? 'Pasa, pasa. Tú debes ser la niña de los Cuthbert. Yo soy el Sr. Lawson: aquí hay de todo. ¿Qué se te ofrece?' : 'Pasa, pasa. ¡Una cara nueva en Avonlea, qué novedad! Yo soy el Sr. Lawson: aquí hay de todo. ¿Qué se te ofrece?'), opts);   // (the first time: who he is)
}
function shopTrade(c, o){
  const I = game.inv; I[o.g] -= o.k; I[c] = (I[c] || 0) + 1;
  logEv(`Ana cambió ${itemText(o.g, o.k)} por ${ITEM_DEFS[c].gift.art} en la tienda de Lawson.`); float('+' + itemText(c, 1), ana.x, ana.y - 60); sfx.happy(); save(); close();
  bubbles = [{ q: 'f:lawson', text: pick(['Trato hecho. ¡Que lo disfrutes!', 'Buen cambio, niña. Tus cosas tienen fama.', 'Te lo envuelvo en papel de estraza.']), t: 0, dur: 3 }];
  setTimeout(() => shopMenu('cambiar'), 700);
}
function shopLibreta(x){
  game.inv[x] = (game.inv[x] || 0) + 1; libretaAdd('ana', x); float('+' + itemText(x, 1), ana.x, ana.y - 60); sfx.happy(); close();
  bubbles = [{ q: 'f:lawson', text: 'Anotado en la libreta. Saludos a Marilla.', t: 0, dur: 3 }];
  setTimeout(() => shopMenu('libreta'), 700);
}
ROOMS.ga = {
  parent: 'gg', exitAt: [STAIRS.x, STAIRS.y + 14], exitLabel: 'Bajar a la cocina',
  draw: drawAnaRoom, items: (g, t) => [{ y: GA.bed.y, draw: () => drawAnaBed(g) }, { y: GA.table.y, draw: () => drawAnaTable(g, t) }, { y: GA.wash.y, draw: () => drawAnaWash(g) }, { y: GA.armario.y, draw: () => drawAnaArmario(g) }, ...(game.wm?.ropaTirada ? [{ y: ROPA_SUELO()[1] - 6, draw: () => drawRopaTirada(g) }] : []), { y: ROPA_SILLA()[1], draw: () => game.wm?.ropaSilla ? drawRopaSilla(g) : drawSilla(g, ...ROPA_SILLA()) }],
  blocked: (x, y) => (Math.abs(x - GA.armario.x) < 25 && y > GA.armario.y - 14 && y < GA.armario.y + 4) || (Math.abs(x - GA.bed.x) < 76 && y > GA.bed.y - 30 && y < GA.bed.y + 4) || (Math.abs(x - GA.table.x) < 30 && y > GA.table.y - 24 && y < GA.table.y + 4) || (Math.abs(x - GA.wash.x) < 26 && y > GA.wash.y - 26 && y < GA.wash.y + 4),
  glow: () => [GA.table.x, GA.table.y - 40, 150, '255,190,110', .38], place: 'en su cuarto del alero este de Tejas Verdes, con la ventana donde está el cerezo Reina de las Nieves',
  actions: add => {
    add('bed', GA.bed.x - 20, GA.bed.y + 14, 60, 'Dormir en mi cama', goToBed, { hy: 30, hit: 0, pri: 2, test: (x, y) => Math.abs(x - GA.bed.x) < 76 && y > GA.bed.y - 62 && y < GA.bed.y + 6 });
    add('gwin', GA.win, 3.9 * T, 34, velaPuede() ? 'La ventana (🕯 la vela)' : 'Mirar por la ventana', ventana, { hy: 40, hit: 0, pri: 3, test: (x, y) => Math.abs(x - GA.win) < 46 && y < 62 });
    add('armario', GA.armario.x, GA.armario.y + 22, 50, game.wm?.camison ? 'Vestirse (el armario)' : 'El armario (el sombrero, la ropa)', armario, { hy: 40, hit: 26, pri: 3, nombre: 'El armario', test: (x, y) => Math.abs(x - GA.armario.x) < 34 && y > GA.armario.y - 150 && y < GA.armario.y + 12 });
    if (game.wm?.ropaTirada) { const [rx, ry] = ROPA_SUELO(); add('ropa', rx, ry, 50, 'La ropa tirada en el suelo', ropaMenu, { hy: 4, hit: 22, pri: 2 }); }
    add('mirror', GA.table.x, GA.table.y + 26, 56, 'Mirarse en el espejo', () => comentar('espejo'), { nombre: 'El escritorio', hy: 40, hit: 0, pri: 3, test: (x, y) => Math.abs(x - GA.table.x) < 18 && y < 56 });
  },
};

// the kitchen has the stairs up to her room
HOUSES.gg.interior.draw = (c, t, night) => { drawKitchen(c, t, night); drawStairsUp(c); };
{ const b0 = HOUSES.gg.interior.blocked; HOUSES.gg.interior.blocked = (x, y) => b0(x, y) || (x > 11.1 * T && y < 4.5 * T); }
{ const a0 = HOUSES.gg.interior.actions; HOUSES.gg.interior.actions = add => { a0(add);
  add('geranio', KIT.w / 2 - 30, 2.4 * T + 18, 40, game.wm?.nombres?.geranio ? 'Mirar a ' + nombreDe('geranio') + ' (el geranio)' : 'Mirar el geranio de la ventana', () => primeraVez('geranio') || escenaObjeto('geranio') || anaSays(nombreMay(nombreDe('geranio')) + '. Huele a manzana, si una cierra los ojos.'), { hy: 40, hit: 0, pri: 2, test: (x, y) => Math.abs(x - (KIT.w / 2 - 30)) < 22 && y < 2.6 * T }); add('stairs', STAIRS.x, STAIRS.y, 44, 'Subir a la pieza de Ana', () => salirSiPuede(() => goIn('ga', [KDOOR.x, KIT.h - 28])), { hy: 40, hit: 0, pri: 1, test: (x, y) => x > 11.1 * T && x < 12.9 * T && y > 2.2 * T && y < 4.7 * T }); }; }
