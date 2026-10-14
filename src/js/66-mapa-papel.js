/* ---------- the map: Avonlea drawn on a sheet of paper, with where everyone is ---------- */
let mapBase = null;
function toggleMap(on = !game.map){
  game.map = on; $('map').hidden = !on;
  if (!on) return;
  close();
  if (MV.z > 1 && game.scene === 'out') { MV.ox = ana.x - WW / MV.z / 2; MV.oy = ana.y - WH / MV.z / 2; mapClamp(); }   // (zoomed in: where Ana is)
  const mc = $('mapcv'), dpr = devicePixelRatio || 1, aw = innerWidth - 44, ah = innerHeight - 130, k = Math.min(aw / WW, ah / WH);
  mc.style.width = Math.round(WW * k) + 'px'; mc.style.height = Math.round(WH * k) + 'px';
  mc.width = Math.round(WW * k * dpr); mc.height = Math.round(WH * k * dpr); mapBase = null;
}
function paintMapBase(w, h, z = 1, ox = 0, oy = 0){
  const cv2 = document.createElement('canvas'); cv2.width = w; cv2.height = h;
  const c = cv2.getContext('2d'), k = w / WW, r = rng(31);
  c.fillStyle = '#f1e2bf'; c.fillRect(0, 0, w, h);
  c.setTransform(k * z, 0, 0, k * z, -ox * k * z, -oy * k * z);   // (zoomed in: only the part in view, drawn sharp)
  // a pale wash of the season's colour, a darker one for the Haunted Wood
  c.fillStyle = ['rgba(150,190,100,.25)', 'rgba(130,170,80,.28)', 'rgba(210,150,70,.25)', 'rgba(200,215,230,.35)'][S]; c.fillRect(60, 60, WW - 120, WH - 120);
  for (const f of FIELDS) { c.fillStyle = ['rgba(200,210,120,.45)', 'rgba(170,200,110,.45)', 'rgba(150,115,80,.4)', 'rgba(215,205,140,.45)', 'rgba(140,190,100,.4)'][f.crop]; c.fillRect(f.x, f.y, f.w, f.h); c.strokeStyle = 'rgba(110,80,50,.35)'; c.lineWidth = 6; c.strokeRect(f.x, f.y, f.w, f.h); }
  for (const w of WOODS) { c.fillStyle = 'rgba(60,100,55,.22)'; c.beginPath(); c.ellipse(w.x, w.y, w.rx, w.ry, 0, 0, TAU); c.fill(); }
  for (const l of LUPINS) { c.fillStyle = 'rgba(230,140,180,.35)'; c.beginPath(); c.ellipse(l.x, l.y, l.rx, l.ry, 0, 0, TAU); c.fill(); }
  c.strokeStyle = '#d9a07a'; c.lineWidth = 60; c.lineJoin = 'round'; c.beginPath(); COAST.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke();
  c.fillStyle = S === 3 ? '#d6e7ee' : '#8fbfd2'; c.beginPath(); SEA.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill();
  const stroke = (pts, wd, col) => { c.strokeStyle = col; c.lineWidth = wd; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); c.moveTo(...pts[0]); pts.slice(1).forEach(p => c.lineTo(...p)); c.stroke(); };
  for (const p of paths) { stroke(p, 34, 'rgba(150,110,60,.5)'); stroke(p, 22, '#e3c99a'); }
  for (const w of WATERS) stroke(w.pts, 30, S === 3 ? '#c9dde6' : '#7fb2c9');
  ell(c, LAKE.x, LAKE.y, LAKE.rx, LAKE.ry, S === 3 ? '#d6e7ee' : '#8fbfd2', 'rgba(60,80,100,.8)');
  ell(c, LAKE.x - 60, LAKE.y - 20, 70, 16, 'rgba(255,255,255,.35)');
  // trees: little pencil crowns and pines
  for (const t of trees) {
    if (t.kind === 'pine') blob(c, [[t.x - 18, t.y], [t.x + 18, t.y], [t.x, t.y - 46]], S === 3 ? '#9fb5a6' : '#4a7d50');
    else ell(c, t.x, t.y - 16, 22 * t.s, 19 * t.s, S === 3 ? '#cfc7bb' : S === 2 ? ['#d8873a', '#c8583a', '#d4b240'][Math.floor(t.ph / TAU * 3) % 3] : t.kind === 'blossom' && S === 0 ? '#f4c4cf' : '#7cb05a', true);
  }
  for (const b of bushes) ell(c, b.x, b.y - 6, 14, 10, S === 3 ? '#b8c2b4' : '#5b9a48', true);
  for (const b of BEDS) ell(c, b.x, b.y, 18, 11, S === 3 ? '#eef2f4' : '#8a6440', true);
  for (const A of Object.values(AREAS)) { c.fillStyle = A.kind === 'oats' ? ['#bcd78a', '#e2cf80', '#d2b674', '#eef2f4'][S] : 'rgba(170,135,90,.5)'; c.fillRect(A.x, A.y, A.w, A.h); c.strokeStyle = '#8a6a48'; c.lineWidth = 4; c.strokeRect(A.x, A.y, A.w, A.h); }
  // houses: a front and a roof
  const house = (x, y, w, roof, wall) => { blob(c, [[x - w / 2, y], [x + w / 2, y], [x + w / 2, y - 60], [x - w / 2, y - 60]], wall); blob(c, [[x - w / 2 - 14, y - 56], [x + w / 2 + 14, y - 56], [x + w / 2 - 8, y - 130], [x - w / 2 + 8, y - 130]], S === 3 ? '#f6f8fb' : roof); blob(c, [[x - 12, y], [x - 12, y - 32], [x + 12, y - 32], [x + 12, y]], '#7a4f32'); };
  // the places that matter are drawn big, as on an illustrated map (the houses one can enter, the church, the school, the station)
  const big = (h, s) => { const x = h.at.x, y = h.at.y; c.save(); c.translate(x, y); c.scale(s, s); c.translate(-x, -y);
    ell(c, x + 20, y + 6, h.at.w / 2 + 40, 22, 'rgba(90,60,35,.25)'); house(x, y, h.at.w, h.roof, h.wall);
    if (h.style === 'iglesia') { blob(c, [[x - 16, y - 120], [x + 16, y - 120], [x + 16, y - 190], [x - 16, y - 190]], h.wall); blob(c, [[x - 20, y - 188], [x + 20, y - 188], [x, y - 250]], h.roof); line(c, [[x, y - 250], [x, y - 272]], '#4a2f1c', 4, 1); line(c, [[x - 8, y - 264], [x + 8, y - 264]], '#4a2f1c', 4, 2); }
    if (h.style === 'escuela') { blob(c, [[x - 12, y - 126], [x + 12, y - 126], [x + 12, y - 160], [x - 12, y - 160]], '#f2ede2'); blob(c, [[x - 16, y - 158], [x + 16, y - 158], [x, y - 184]], h.roof); ell(c, x, y - 142, 5, 6, '#c8a040', true); }
    c.strokeStyle = 'rgba(74,47,28,.7)'; c.lineWidth = 3; c.strokeRect(x - h.at.w / 2, y - 60, h.at.w, 60); c.restore(); };
  const BIG = { gg: 2.6, os: 2.2, rl: 2, hh: 2, br: 2.2, ig: 2.4, es: 2.4 };
  house(BARN.x, BARN.y, BARN.w, '#6f6a66', '#b5523c');
  for (const w of WATERS) for (const b of w.bridges) blob(c, [[b.x - 44, b.y - 16], [b.x + 44, b.y - 16], [b.x + 44, b.y + 14], [b.x - 44, b.y + 14]], b.covered ? '#a8463a' : '#a8814f');
  // names, in ink
  c.fillStyle = '#4a2f1c'; c.textAlign = 'center';
  const label = (text, x, y, size = 46) => { text = conNombres(text); c.font = `italic ${size}px Georgia, serif`; c.fillStyle = 'rgba(241,226,191,.75)'; const tw = c.measureText(text).width; c.fillRect(x - tw / 2 - 8, y - size * .85, tw + 16, size * 1.1); c.fillStyle = '#4a2f1c'; c.fillText(text, x, y); };
  label('Granero', BARN.x, BARN.y - 150, 70);
  for (const [k, h] of Object.entries(HOUSES)) if (!h.road) big(h, BIG[k] || 2);
  for (const [k, h] of Object.entries(HOUSES)) { const s = BIG[k] || 2; label(h.mapLabel?.[0] ?? h.name, h.at.x, h.at.y - (h.style === 'iglesia' ? 280 : h.style === 'escuela' ? 195 : 140) * s - 20, 120); }
  label('Lago de las Aguas Brillantes', LAKE.x, LAKE.y + LAKE.ry + 110, 100); for (const w of WOODS.filter(w => w.haunted)) label('Bosque Encantado', w.x, w.y + w.ry * .3, 100); for (const b of BUILDINGS) { if (b.style === 'faro') { c.save(); c.translate(b.x, b.y); c.scale(1.8, 1.8); c.translate(-b.x, -b.y); blob(c, [[b.x - 30, b.y], [b.x + 30, b.y], [b.x + 16, b.y - 220], [b.x - 16, b.y - 220]], '#f6f2e8'); for (let q = 0; q < 3; q++) c.fillStyle = '#c8463a', c.fillRect(b.x - 26 + q * 4, b.y - 50 - q * 60, 52 - q * 8, 24); blob(c, [[b.x - 22, b.y - 220], [b.x + 22, b.y - 220], [b.x, b.y - 270]], '#3a3436'); c.restore(); label(b.name, b.x, b.y - 520, 120); continue; } house(b.x, b.y, b.w, '#8a6a5a', '#efe4cc'); label(b.name, b.x, b.y - 150, 70); } label('Aldea de Avonlea', 50 * U, 23.2 * U, 150); label('Golfo de San Lorenzo', 40 * U, 4.5 * U, 220); label('Campo rosado', LUPINS[0].x, LUPINS[0].y, 34); label('Río', RIVERS[0].pts[3][0] + 120, RIVERS[0].pts[3][1] + 60, 34);
  label('Camino Blanco de las Delicias', GG.x + 900, BRIDGE.y - 110, 80);
  for (const [p, n] of Object.entries(NOMBRES_ANA)) if (game.wm.perm?.['nombre:' + p] && p !== 'lago' && p !== 'bosque_peg' && WP[p]) label(nombreMay(nombreDe(p)) + ' ✎', WP[p][0], WP[p][1] - 70, 64);   // (the names Ana gave to places)
  label('Arroyo', brook[2][0] + 160, brook[2][1] + 160, 70);
  // a compass rose and a double border
  const cx = WW - 150, cy = WH - 150;
  blob(c, [[cx, cy - 70], [cx + 14, cy], [cx, cy + 70], [cx - 14, cy]], '#d9bf8f'); blob(c, [[cx - 70, cy], [cx, cy - 14], [cx + 70, cy], [cx, cy + 14]], '#d9bf8f');
  c.font = 'bold 34px Georgia, serif'; c.fillStyle = '#4a2f1c'; c.fillText('N', cx, cy - 80);
  c.setTransform(1, 0, 0, 1, 0, 0);
  for (let n = 0; n < w * h / 60; n++) { c.fillStyle = r() < .5 ? `rgba(120,80,40,${r() * .1})` : `rgba(255,250,235,${r() * .2})`; c.fillRect(r() * w, r() * h, 1 + r(), 1 + r()); }
  c.strokeStyle = 'rgba(90,60,35,.8)'; c.lineWidth = 2; c.strokeRect(5, 5, w - 10, h - 10); c.lineWidth = 1; c.strokeRect(10, 10, w - 20, h - 20);
  const vg = c.createRadialGradient(w / 2, h / 2, Math.min(w, h) * .3, w / 2, h / 2, Math.max(w, h) * .7); vg.addColorStop(0, 'rgba(120,80,40,0)'); vg.addColorStop(1, 'rgba(120,80,40,.25)'); c.fillStyle = vg; c.fillRect(0, 0, w, h);
  return { cv: cv2, s: S, w, z, ox, oy };
}
function drawMap(){
  const mc = $('mapcv'), c = mc.getContext('2d'), w = mc.width, h = mc.height, dpr = devicePixelRatio || 1;
  mapClamp(); const k = w / WW * MV.z, ox = MV.ox, oy = MV.oy;
  const stale = !mapBase || mapBase.s !== S || mapBase.w !== w;
  if (stale || ((mapBase.z !== MV.z || mapBase.ox !== ox || mapBase.oy !== oy) && performance.now() - MV.moved > 160)) mapBase = paintMapBase(w, h, MV.z, ox, oy);
  // (while it is being zoomed or dragged, the last drawing is stretched; a moment after, it is drawn again, sharp)
  c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = '#f1e2bf'; c.fillRect(0, 0, w, h);
  const sz = MV.z / mapBase.z; c.setTransform(sz, 0, 0, sz, (mapBase.ox - ox) * k, (mapBase.oy - oy) * k); c.drawImage(mapBase.cv, 0, 0);
  c.setTransform(1, 0, 0, 1, -ox * k, -oy * k);
  // where everyone is (someone indoors is shown at the door of the house)
  const at = (where, x, y) => where === 'out' ? [x, y] : where === 'camino' ? [STATION.x, STATION.y] : [HOUSES[ROOMS[where].parent ?? where].at.x, HOUSES[ROOMS[where].parent ?? where].at.y + 20];
  const mark = (who, [x, y], col, dx, big) => {
    const sx = x * k + dx * dpr, sy = y * k, r = (big ? 6 + Math.sin(TT * 5) * 1.2 : 4.5) * dpr;
    c.beginPath(); c.arc(sx, sy, r, 0, TAU); c.fillStyle = col; c.fill(); c.lineWidth = 1.4 * dpr; c.strokeStyle = 'rgba(60,35,20,.9)'; c.stroke();
    c.font = `italic ${12 * dpr}px Georgia, serif`; c.textAlign = 'center'; c.lineWidth = 3 * dpr; c.strokeStyle = 'rgba(241,226,191,.95)'; const ly = big ? sy - r - 4 * dpr : sy + r + 12 * dpr; c.strokeText(who, sx, ly); c.fillStyle = '#4a2f1c'; c.fillText(who, sx, ly);
  };
  const slot = {};
  for (const [k, p] of Object.entries(PEOPLE)) { if (CH[k].onMap === false || p.where === 'away') continue; const n = slot[p.where] = (slot[p.where] || 0) + 1; mark(NAMES[k], at(p.where, p.x, p.y), LOOKS[k].dress, p.where === 'out' ? 0 : [12, -12, 24, -24][n - 1] || 0, false); }
  for (const f of FOLK) if (f.where === 'out') { c.beginPath(); c.arc(f.x * k, f.y * k, (f.kid ? 2 : 2.6) * dpr, 0, TAU); c.fillStyle = f.def.look.dress; c.fill(); c.lineWidth = .8 * dpr; c.strokeStyle = 'rgba(60,35,20,.7)'; c.stroke(); }
  if (dest) {   // where she is going, and the way (by the roads)
    const pts = ana.nav?.pts ? [[ana.x, ana.y], ...ana.nav.pts.slice(ana.nav.i)] : [[ana.x, ana.y], [dest.x, dest.y]];
    c.setLineDash([4 * dpr, 4 * dpr]); c.strokeStyle = 'rgba(200,60,50,.85)'; c.lineWidth = 2 * dpr; c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x * k, y * k) : c.moveTo(x * k, y * k)); c.stroke(); c.setLineDash([]);
    const fx = dest.x * k, fy = dest.y * k; line(c, [[fx, fy], [fx, fy - 16 * dpr]], '#4a2f1c', 1.4 * dpr, 1); blob(c, [[fx, fy - 16 * dpr], [fx + 10 * dpr, fy - 13 * dpr], [fx, fy - 10 * dpr]], '#d9433b');
  }
  mark('Ana', at(game.scene, ana.x, ana.y), '#d9433b', 0, true);
  $('maptitle').textContent = 'Avonlea · ' + SEASONS[S] + ', día ' + (Math.floor(dayT) % 2 + 1) + ' · ' + SICON[S] + ' · toca un lugar para ir allí · rueda o pellizco: acercar · arrastra para moverte';
}
let owed = 0;   // (faster: the game time owed is made up in steps of at most 0.05 s, within a budget of time per frame; a slow frame is not lost)
function loop(now){
  const k = tripSpeed(), raw = Math.max(0, (now - last) / 1000); last = now;
  if (k === 1) update(Math.min(raw, .05));
  else { owed = Math.min(owed + Math.min(raw, .25) * k, 3 * k * .05 + 2); const t0 = performance.now(); while (owed > 1e-4 && performance.now() - t0 < 22) { const d = Math.min(.05, owed); update(d); owed -= d; } }
  FRAME++; tripBarDraw(); render(); islaDraw(); requestAnimationFrame(loop);
}
window.__avonlea = { lugaresTick, escenaObjeto, targets, cartaPuede, conNombres, nombrar, nombreDe, nombrarElegir, NOMBRABLES, primeraVez, ventana, velaPuede, sombrero, LOOKS, dlgDichas, chats: () => CHATS, enConversacion, anaPos: () => ({ x: ana.x, y: ana.y }), setDia: (d, h) => { dayT = d + (h - 6) / 24; }, dia: () => today(), PEOPLE, relatoEmpezar, inicioLlegada, dlgHechos, convDisponibles, conversar, convOpciones, guiñosDe, LINES, dlgHecho, cualidad, cualidadSuma, cualidadCond, dlgCond, dlgEspecificidad, ritmoLleno, ritmoMarca, dlgHacer, dlgAccion, HABILIDADES, relSetW, relato: () => RELATO.lineas, reglas: () => RELATO_REGLAS.map(r => [r.id, r.texto]), jugables, jugar, anaMenu, correoRetirar, cartaLeer, CORREO, cartaTexto, playAct: () => game.playAct, DIALOGOS, dlgCtx, talks: () => TALKS, dlgGuion, dlgPanel, bubblesNow: () => bubbles, toby, cartSheet: (c, x, y, c8, t) => { const L = [], p = { look: 'matthew', x, y, c8, walk: 0, moving: false }; const [cx, cy] = [x, y]; pushCart(L, c, { x: cx, y: cy, c8, walk: 0, moving: true }, t); for (const [k, look] of [[0, 'matthew'], [1, 'ana']]) { const [sx, sy] = cartSeat(cx, cy, c8, k); L.push({ y: sy, draw: () => drawPerson(c, { ...mkPerson(look, sx, sy), sit: true, dir: c8Dir(c8) }, t) }); } L.sort((a, b) => a.y - b.y).forEach(o => o.draw()); }, startCap1, CAP1, LIBRO1, ROAD_TRAMOS, ROAD_MIN, roadTramo, islaToggle, DLG_BANK, startDay, setSeason, agendaData: () => AGENDA.map(e => ({ who: wmName(e.who), from: e.from, to: e.to, label: e.label, season: e.season, sunday: !!e.sunday, ana: !!(e.ana || e.who === 'ana'), cond: e.when ? String(e.when).replace(/^\(\) => /, '') : '' })), setAgenda: v => { AGENDA_ON = v; }, AGENDA, wmData: () => ({ THINGS, WHO, OFRECE, WP_NAME, TRADE, TREATS, LIBRETA, ITEM_NAME, MAX_GOALS, PACE, FOCO }), paintMapBase, doingText, wmName, wmBody, wmScene, WW, WH, setVec: v => { VEC_ON = v; }, setStyle: v => { ANA_STYLE = v; }, setHead: setHeadM, focoOf, chats: () => CHATS, setDistract: v => { WM_DISTRACT = v; }, observe, obs: () => OBS, viewScene, AGENTS, WM_TESTS, wmRunTest, wmPlan, wmNow, G, agentStart, wmInv, relGetW, WP, enc, encAsk, encMsg, folkTalk, FOLK, FAUNA, BUGGIES, NET, netRoute, goDest, dest: () => dest, FARO, MAP, cart, cartStart, cartOn, cartOff, CART_LEN, FIELDS, WOODS, BUILDINGS, MILK, decorAt, BRS, U, ailog: () => AILOG, sysFor, aiGate, tok: () => TOK, aiq: { list: () => aiq.list.map(r => ({ id: r.id, kind: r.kind, prompt: r.prompt, schema: r.schema })), answer: aiqAnswer, fail: aiqFail, system: () => AI_SYSTEM }, SEATS, mealSit, autoChoose, storyAuto, menuOpen, STORIES, PLACES, PEOPLE, ANIM, ANIMALS, leadCow, releaseCow, sellCow, AREAS, setAnaState, relGet, relSet, relText, validStory, validBeats, fallbackStory, makeStory, storyNow, storyOpen, storyTick, storyBranch, offerSale, reflectDay, relPanel, drawPerson, LOOKS, setS: v => { S = v; }, touch: () => { lastInput = TT; }, toby, paces: () => [WALK, RUN, STROLL], idle: () => { lastInput = -100; }, auto, autoOptions, startIntent, anaSpeak, ROOMS, goSleep, anaSays, view, targets, findPath, HOUSES, CHARACTERS, reg: () => ({ NAMES, ABIL, LINES, SEASON_LINES, PLACES, LOOKS, AI_SYSTEM, fond: game.fond, people: Object.keys(PEOPLE), props: props.filter(p => p.kind === 'house' || p.kind === 'sign').map(p => [p.kind, Math.round(p.x), Math.round(p.y), p.text || p.roof || '', p.small || false]), paths: paths.map(p => p.map(q => q.map(Math.round))) }), lynde, LY, RLC, RLQ, TABLE, amb, bubbles: () => bubbles, sceneAsk, game, ana, matthew, diana, marilla, barry, toby, BEDS, PUMP, GG, OS, BENCH, STOVE, FIRE, SOFA, TEA, KDOOR, KIT, act: () => { actNow = true; }, setDay: v => { dayT = v; }, season: () => S, toggleMap, goIn, goOut, AI, stateText, aiTalk, logEv, PLACES, makePlan, planQ, hourNow, taskOptions, activeTasks, near: () => near() && near().label, step: s => { for (let k = 0; k < s * 60; k++) update(1 / 60); } };