/* ---------- the account of what happens: what can be seen, not what anyone intends ----------
   For the audit of the actions (tools/auditoria.js) and for whoever wants to read the game as a tale (?relato in the
   link writes it in the console). It watches some characters and writes, with the hour of the game:
   - when something about them changes: where they are (the room, and what they are next to), how (standing, walking,
     sitting, bending down, lying), what they are doing, what they carry or have at hand, what they say, what they have;
   - every 5 minutes of the game, how each one is.
   Each line also keeps the state as data (estado), so the audit can check it against what should have happened. */
var RELATO = { on: /[?&]relato/.test(location.search), quienes: null, lineas: [], antes: {}, ultimo: -1, globo: new Set(), mal: {}, visto: {}, encima: {} };
const SITIO_NOMBRE = { estufa: 'la estufa', mesa: 'la mesa', puerta: 'la puerta', escalera: 'la escalera', aparador: 'el aparador', fregadero: 'el fregadero', silla: 'la silla de la ventana', ventana: 'la ventana', cama: 'la cama', escritorio: 'el escritorio', lavatorio: 'el lavatorio y su espejo', chimenea: 'la chimenea', sofa: 'el sofá', te: 'la mesita del té', escenario: 'el escenario', banco: 'los bancos', sillon: 'el sillón del pastor', estante: 'el estante de libros' };
// the things of the actions, in words
const COSA_NOMBRE = { picnic: 'el mantel del picnic', trineo: 'el trineo', patines: 'los patines', bote: 'el bote', tinte: 'el frasco de tinte', tijeras: 'las tijeras', libro: 'un libro', papel: 'un papel', cuaderno: 'el cuaderno', hacha: 'el hacha', horquilla: 'la horquilla', semillas: 'las semillas', regadera: 'la regadera', grano: 'el grano', balde: 'el balde', entregar: 'lo que entrega', abrazo: 'un abrazo', cuerda: 'la cuerda', corte: 'las tijeras', banqueta: 'la banqueta', te: 'el té', rezar: 'las manos juntas', flores: 'flores', sombrero: 'el sombrero con flores', jarabe: 'el jarabe', quehacer: 'el quehacer', bol: 'el bol', mantequera: 'la mantequera', costura: 'la costura', canastito: 'el canastito', manos: 'las manos', platos: 'una pila de platos limpios', platos_sucios: 'los platos sucios', aparador: 'el aparador abierto', poner: 'los platos que va dejando en la mesa', recoger: 'los platos que va recogiendo', lavar: 'la palangana con agua', escoba: 'la escoba', recitar: 'el gesto de recitar', carta: 'la carta', libro_abierto: 'el libro abierto' };
const cosa = k => k ? (COSA_NOMBRE[k] || k.replace(/_/g, ' ')) : '';
const conJunto = j => j ? (j.startsWith('el ') ? ', junto al ' + j.slice(3) : ', junto a ' + j) : '';
const SALA_MAPA = { gg: 'cocina', ga: 'pieza', os: 'salita', sa: 'salon', cp: 'parroquia' };
// where someone is, in words: the room and what she is next to; outdoors, the nearest named place
function relatoSitio(k){
  const b = wmBody(k), sc = wmScene(k); if (!b || !sc) return { lugar: '?', junto: '' };
  if (sc === 'away') return { lugar: 'fuera de Avonlea', junto: '' };
  if (sc === 'camino') return { lugar: 'el camino de Bright River', junto: '' };
  if (sc !== 'out') {
    const m = MAPAS[SALA_MAPA[sc]]; let junto = '', mejor = 46;
    if (m) for (const o of m.layers.flatMap(l => l.objects || [])) { const d = Math.hypot(b.x - o.x, b.y - o.y); if (d < mejor) { mejor = d; junto = SITIO_NOMBRE[o.name] || o.name; } }
    return { lugar: placeName(sc), junto };
  }
  let nombre = '', mejor = 1e9; for (const [, P] of Object.entries(PLACES)) { if (!P[0]) continue; const d = Math.hypot(b.x - P[1], b.y - P[2]); if (d < mejor) { mejor = d; nombre = P[0]; } }
  return { lugar: 'Avonlea', junto: mejor < 260 ? nombre : 'camino ' + (nombre.startsWith('el ') ? 'del ' + nombre.slice(3) : 'de ' + nombre) };
}
// the rules that must always hold, whatever is being done (the audit checks them on every line): each, whether it is broken now
const RELATO_REGLAS = [
  { id: 'cama', texto: 'quien está enfermo está en cama', mal: (k, b) => (game.wm?.sick || []).includes(k) && !b.bed },
  { id: 'mueble', texto: 'nadie se queda de pie dentro de un mueble', mal: (k, b, sc) => sc !== 'out' && !b.moving && !b.sit && !b.lie && !!ROOMS[sc]?.blocked?.(b.x, b.y) },
  { id: 'casa', texto: 'nadie se queda dentro de las paredes de una casa', mal: (k, b, sc, A) => sc === 'out' && !b.moving && A?.v !== 'trepar' && inHouses(b.x, b.y) },   // (up on the roof, on a dare, is another thing)
  { id: 'agua', texto: 'nadie está en el agua (salvo en el bote, o patinando sobre el hielo)', mal: (k, b, sc, A) => sc === 'out' && !/^(remar|patinar)$/.test(A?.v || '') && (inLake(b.x, b.y) || inSea(b.x, b.y) || inBrook(b.x, b.y)) },
  { id: 'encima', texto: 'nadie está encima de otro', mal: (k, b, sc) => { const o = !b.moving && relatoCuerpos().find(([q, o, s]) => o !== b && s === sc && !o.moving && Math.hypot(o.x - b.x, o.y - b.y) < 8); const t0 = o ? (RELATO.encima[k] ??= TT) : (delete RELATO.encima[k], 0); return o && TT - t0 > 3 ? 'está encima de ' + wmName(o[0]) + (o[1].sit ? ', que está sentado' : '') : false; } },   // (a moment, coming in at a door, is no matter: staying so is)
  { id: 'cuerda', texto: 'los animales de la cuerda van afuera', mal: (k, b, sc) => sc !== 'out' && sc !== 'camino' && Object.values(ANIM).some(c => c.state === 'led' && (c.ledBy || 'ana') === k) },
];
// everyone with a body, and where (to check that no one stands on another)
const relatoCuerpos = () => [['ana', ana, game.scene], ...Object.entries(PEOPLE).map(([k, p]) => [k, p, p.where]), ...FOLK.filter(f => f.where !== 'in').map(f => [f.id, f, f.where])];
// the rules broken now, by id (and what was seen, when the rule says it: RELATO.visto)
const relatoMal = (k, b, A) => { const sc = wmScene(k), ids = []; for (const r of RELATO_REGLAS) { let v = false; try { v = r.mal(k, b, sc, A); } catch (e) {} if (v) { ids.push(r.id); RELATO.visto[k + '|' + r.id] = typeof v === 'string' ? v : ''; } } return ids; };
const relatoPostura = b => b.bed ? 'acostada, en cama' : b.lie ? 'acostada' : b.sit ? 'sentada' : b.crouch ? 'agachada' : b.moving ? 'caminando' : 'de pie';
function relatoEstado(k){
  const b = wmBody(k); if (!b) return null;
  const ag = AGENTS[k] || (k === 'ana' ? game.playAct : null), A = ag?.acting, s = relatoSitio(k);
  const inv = Object.entries(wmInv(k) || {}).filter(([, n]) => n > 0).map(([i, n]) => n + ' ' + i).join(', ');
  return { quien: k, lugar: s.lugar, junto: s.junto, postura: relatoPostura(b), accion: A ? A.v + (A.x ? ' ' + A.x : '') : '', lleva: cosa(A?.lleva || (typeof b.carry === 'string' ? b.carry : b.carry ? 'algo' : '')), objeto: A ? [cosa(A.obj !== undefined ? A.obj : ACCION_VISTA[A.v]?.obj), A.mesa ? cosa(A.mesa[3]) + ' sobre la mesa' : ''].filter(Boolean).join(' y ') : '', tiene: inv, pelo: k === 'ana' && game.wm?.perm?.pelo_verde ? 'verde' : '', guia: Object.entries(ANIM).filter(([, c]) => c.state === 'led' && (c.ledBy || 'ana') === k).map(([n]) => ANIMALS[n]?.name || n).join(', '), _mal: relatoMal(k, b, A).join(',') };   // (_: not news, only for the audit)
}
const relatoHora = () => { const d = dayT % 1, m = Math.floor(((d * 24 + 6) % 24) * 60); return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); };
const relatoFrase = (e, c) => {   // (what changed, as a sentence)
  const n = wmName(e.quien), p = [];
  if (c.has('lugar') || c.has('junto')) p.push((e.postura === 'caminando' ? 'va por ' : 'está en ') + e.lugar + conJunto(e.junto));
  if (c.has('postura') && !(c.has('lugar') || c.has('junto'))) p.push({ 'acostada, en cama': 'está en cama', acostada: 'se acuesta', sentada: 'se sienta', agachada: 'se agacha', caminando: 'echa a andar', 'de pie': 'se queda de pie' }[e.postura]);
  if (c.has('accion')) p.push(e.accion ? 'empieza: ' + e.accion : 'termina lo que hacía');
  if (c.has('lleva')) p.push(e.lleva ? 'lleva ' + e.lleva : 'ya no lleva nada');
  if (c.has('objeto') && e.objeto) p.push('con ' + e.objeto);
  if (c.has('tiene')) p.push(e.tiene ? 'ahora tiene ' + e.tiene : 'ya no tiene nada');
  if (c.has('pelo') && e.pelo) p.push('tiene el pelo ' + e.pelo);
  if (c.has('guia')) p.push(e.guia ? 'lleva de la cuerda a ' + e.guia : 'suelta la cuerda');
  return n + ' ' + p.join('; ') + '.';
};
function relatoLinea(texto, estado){ const L = { hora: relatoHora(), t: dayT, texto, estado }; RELATO.lineas.push(L); if (/[?&]relato/.test(location.search)) console.log('[relato] ' + L.hora + ' ' + texto); }
// to start: whom to watch (null: Ana and whoever is in her scene)
function relatoEmpezar(quienes){ RELATO.on = true; RELATO.quienes = quienes; RELATO.lineas = []; RELATO.antes = {}; RELATO.ultimo = -1; RELATO.globo = new Set(); RELATO.mal = {}; RELATO.encima = {}; }
function relatoTick(){
  if (!RELATO.on) return;
  const ks = RELATO.quienes || ['ana', ...Object.keys(PEOPLE).filter(k => wmScene(k) === game.scene)];
  for (const k of ks) {
    const e = relatoEstado(k); if (!e) continue;
    const a = RELATO.antes[k], c = new Set(a ? Object.keys(e).filter(f => f !== 'quien' && f[0] !== '_' && e[f] !== a[f]) : ['lugar'].concat(['accion', 'lleva', 'objeto', 'tiene', 'pelo', 'guia'].filter(f => e[f])));
    if (a && e.postura === 'caminando' && a.postura === 'caminando') c.delete('junto');   // (walking past things is not news: where she stops is)
    if (c.size) { relatoLinea((a ? '' : 'Al empezar, ') + relatoFrase(e, c), e); RELATO.antes[k] = e; }
    const m0 = RELATO.mal[k] || '', nuevas = e._mal ? e._mal.split(',').filter(r => !m0.split(',').includes(r)) : []; RELATO.mal[k] = e._mal;   // (a rule just broken: said at once)
    if (nuevas.length) relatoLinea('⚠ ' + wmName(k) + ': no se cumple que ' + nuevas.map(r => RELATO_REGLAS.find(x => x.id === r).texto + (RELATO.visto[k + '|' + r] ? ' (' + RELATO.visto[k + '|' + r] + ')' : '')).join(', ni que ') + '.', { ...e, regla: true });
    for (const b of bubbles) if ((b.q === k || b.q === 'f:' + k) && !RELATO.globo.has(b)) { RELATO.globo.add(b); relatoLinea(wmName(k) + ' dice: «' + b.text + '»', { ...e, dice: b.text }); }
  }
  const cinco = Math.floor(dayT * 24 * 12);   // (every 5 minutes of the game, how each one is)
  if (cinco !== RELATO.ultimo) { RELATO.ultimo = cinco; for (const k of ks) { const e = relatoEstado(k); if (e) relatoLinea('· ' + wmName(k) + ': ' + [e.lugar + conJunto(e.junto), e.postura, e.accion, e.lleva && 'lleva ' + e.lleva, e.objeto && 'con ' + e.objeto].filter(Boolean).join(' · '), { ...e, resumen: true }); } }
}
