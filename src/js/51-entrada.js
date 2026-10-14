/* ---------- input ---------- */
const keys = new Set();
let actNow = false;
addEventListener('keydown', e => {
  if (e.target.closest && e.target.closest('input,select,textarea')) return;
  if (!$('ai').hidden) { if (e.code === 'Escape') aiPanel(false); return; }
  audio(); hint(); if (!ANA_AUTO) userInput();
  if (e.code === 'KeyT' && !game.map) { e.preventDefault(); openSay(); return; }
  if (e.code === 'KeyM' && !game.talk) { toggleMap(); return; }
  if (e.code === 'KeyL' && !game.map && !game.talk) { callNearest(); return; }
  { const N = TALKS.find(t => t.narra); if (N && (e.code === 'Space' || e.code === 'Enter')) { e.preventDefault(); N.narra.seguir(); return; } }   // (a card that explains: on)
  if (game.map) { if (e.code === 'Escape' || e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); toggleMap(false); } return; }
  if (game.talk && !menuOpen()) {   // a talk going on: she can walk (walking off ends it), Space skips a line, Esc ends it
    if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); if (amb.cur) amb.cur.wait = 0; return; }
    if (e.code === 'Escape') { close(); return; }
  }
  else if (game.talk) {
    const n = +e.key; if (n >= 1 && game.talkOpts && game.talkOpts[n - 1]) { game.talkOpts[n - 1][1](); return; }
    if (e.code === 'Space' || e.code === 'Enter' || e.code === 'Escape') { e.preventDefault(); if (game.talkOpts && game.talkOpts.length === 1) game.talkOpts[0][1](); else if (e.code === 'Escape') close(); }
    return;
  }
  if (e.code === 'Enter' && !game.talk) { e.preventDefault(); openSay(); return; }
  keys.add(e.code); if (e.code.startsWith('Arrow') || e.code === 'Space') e.preventDefault();
  if (e.code === 'Space' || e.code === 'KeyE') actNow = true;
});
addEventListener('keyup', e => keys.delete(e.code));
let stick = null, tapStart = null;
let panDrag = null;
cv.addEventListener('pointerdown', e => { audio(); hint(); if (ANA_AUTO && !menuOpen() && !game.talk) { freeStart(); panDrag = { x: e.clientX, y: e.clientY, cx: freeCam.x, cy: freeCam.y }; return; } if (OBS && !menuOpen()) { observe(null); return; } userInput(); if (menuOpen()) return; if (game.talk && amb.cur) { const t = targetAt(view.ox + e.clientX / view.Z, view.oy + e.clientY / view.Z); if (t && (t.self || amb.cur.parts.includes(t.id.slice(2)))) { amb.cur.wait = 0; return; } } stick = { x0: e.clientX, y0: e.clientY, x: e.clientX, y: e.clientY }; tapStart = { x: e.clientX, y: e.clientY, t: performance.now() }; });
addEventListener('pointermove', e => { if (panDrag) { const Z = view.Z || 1; freeCam.x = panDrag.cx - (e.clientX - panDrag.x) / Z; freeCam.y = panDrag.cy - (e.clientY - panDrag.y) / Z; } if (stick) { stick.x = e.clientX; stick.y = e.clientY; } hoverAt = e.pointerType === 'mouse' && e.target === cv ? [e.clientX, e.clientY] : null; });
addEventListener('pointerup', e => {
  panDrag = null;
  if (tapStart && !menuOpen() && !game.map && $('ai').hidden && Math.hypot(e.clientX - tapStart.x, e.clientY - tapStart.y) < 10 && performance.now() - tapStart.t < 500) tapAt(e.clientX, e.clientY);
  tapStart = null; stick = null;
});
addEventListener('pointercancel', () => { stick = null; tapStart = null; panDrag = null; });
let hinted = false; function hint(){ if (hinted) return; hinted = true; setTimeout(() => { $('hint').style.opacity = 0; }, 4000); }
// a note at the top for a moment (when the season turns)
let noteTimer = 0;
function notice(text){ const h = $('hint'); h.textContent = conNombres(text); h.style.transition = 'none'; h.style.opacity = 1; void h.offsetWidth; h.style.transition = ''; clearTimeout(noteTimer); noteTimer = setTimeout(() => { h.style.opacity = 0; }, 4500); }
$('mapbtn').addEventListener('pointerdown', e => { e.stopPropagation(); audio(); if (!game.talk) toggleMap(); });
// the buttons on the right can be put away (they get in the way of touching things there): ☰ shows them again
{ let hide; try { hide = localStorage.getItem('avonlea-lado'); } catch (e) {} hide = hide == null ? innerWidth < 760 || matchMedia('(pointer: coarse)').matches : hide === '1';
  const set = h => { document.body.classList.toggle('lado-oculto', h); $('sidebtn').textContent = h ? '☰' : '›'; $('sidebtn').title = h ? 'Mostrar los botones' : 'Ocultar los botones de la derecha'; try { localStorage.setItem('avonlea-lado', h ? '1' : '0'); } catch (e) {} };
  set(hide); $('sidebtn').addEventListener('pointerdown', e => { e.stopPropagation(); set(!document.body.classList.contains('lado-oculto')); }); }
$('mapclose').addEventListener('click', () => toggleMap(false));
// the paper map: the wheel (or two fingers, or ＋/－) brings it closer around the pointer; dragging moves it; a tap (not a drag) sends Ana there
const MV = { z: 1, ox: 0, oy: 0, moved: 0 }, mapPtr = new Map(); let mapDrag = null;
function mapClamp(){ MV.z = clamp(MV.z, 1, 6); MV.ox = clamp(MV.ox, 0, WW - WW / MV.z); MV.oy = clamp(MV.oy, 0, WH - WH / MV.z); }
const mapWorld = (cx, cy) => { const r = $('mapcv').getBoundingClientRect(); return [MV.ox + (cx - r.left) / r.width * WW / MV.z, MV.oy + (cy - r.top) / r.height * WH / MV.z]; };
function mapZoom(f, cx, cy){
  const r = $('mapcv').getBoundingClientRect(); if (cx == null) { cx = r.left + r.width / 2; cy = r.top + r.height / 2; }
  const [wx, wy] = mapWorld(cx, cy); MV.z = clamp(MV.z * f, 1, 6);
  MV.ox = wx - (cx - r.left) / r.width * WW / MV.z; MV.oy = wy - (cy - r.top) / r.height * WH / MV.z; mapClamp(); MV.moved = performance.now();
}
$('mapcv').addEventListener('wheel', e => { e.preventDefault(); mapZoom(Math.exp(-e.deltaY * .0015), e.clientX, e.clientY); }, { passive: false });
$('mapcv').addEventListener('pointerdown', e => { e.currentTarget.setPointerCapture?.(e.pointerId); mapPtr.set(e.pointerId, [e.clientX, e.clientY]); mapDrag = { x: e.clientX, y: e.clientY, ox: MV.ox, oy: MV.oy, moved: false, pinch: mapPtr.size === 2 ? null : undefined }; });
$('mapcv').addEventListener('pointermove', e => {
  if (!mapDrag || !mapPtr.has(e.pointerId)) return; const prev = mapPtr.get(e.pointerId); mapPtr.set(e.pointerId, [e.clientX, e.clientY]);
  if (mapPtr.size === 2) {   // (two fingers: closer or farther, around the middle)
    const [a, b] = [...mapPtr.values()], [pa, pb] = [...mapPtr.entries()].map(([id, q]) => id === e.pointerId ? prev : q);
    const d0 = Math.hypot(pa[0] - pb[0], pa[1] - pb[1]), d1 = Math.hypot(a[0] - b[0], a[1] - b[1]); if (d0 > 10) mapZoom(d1 / d0, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
    mapDrag.moved = true; return;
  }
  const r = $('mapcv').getBoundingClientRect(), dx = e.clientX - mapDrag.x, dy = e.clientY - mapDrag.y;
  if (Math.hypot(dx, dy) > 6) mapDrag.moved = true;
  if (mapDrag.moved) { MV.ox = mapDrag.ox - dx / r.width * WW / MV.z; MV.oy = mapDrag.oy - dy / r.height * WH / MV.z; mapClamp(); MV.moved = performance.now(); }
});
const mapUp = e => { mapPtr.delete(e.pointerId); if (mapPtr.size === 1 && mapDrag) { const [q] = mapPtr.values(); mapDrag.x = q[0]; mapDrag.y = q[1]; mapDrag.ox = MV.ox; mapDrag.oy = MV.oy; } };
$('mapcv').addEventListener('pointerup', mapUp); $('mapcv').addEventListener('pointercancel', mapUp);
$('mapcv').addEventListener('click', e => { if (mapDrag?.moved) { mapDrag = null; return; } mapDrag = null; goDest(...mapWorld(e.clientX, e.clientY)); });
$('mapzin').addEventListener('click', () => mapZoom(1.5)); $('mapzout').addEventListener('click', () => mapZoom(1 / 1.5));
// the view of the fields: the wheel brings it closer or farther (out of doors)
let viewZoom = 1;
cv.addEventListener('wheel', e => { e.preventDefault(); if (game.scene === 'out' || viewScene() === 'out') viewZoom = clamp(viewZoom * Math.exp(-e.deltaY * .0012), .55, 2.2); }, { passive: false });
// the AI settings: on/off, the key (kept in this browser only), the model; and a look at what they remember
function aiPanel(on){
  $('ai').hidden = !on; if (!on) return;
  close(); tokDraw(); $('aion').checked = AI.on; $('aiauto').checked = AI.auto !== false; $('aiplans').checked = AI.plans !== false; $('aistories').checked = !!AI.stories; $('aimem').checked = !!AI.memoria; $('aimode').value = FULL() ? 'completo' : 'minimo'; $('aimodel').value = AI.model; $('aiout').hidden = true; aiKeyField();
}
// the key field shows the key of the chosen model's provider
function aiKeyField(){
  const pv = provider($('aimodel').value), P = PROV[pv], man = pv === 'manual';
  $('aikey').hidden = $('aikeylab').hidden = man;
  $('aikey').value = AI.keys[pv] || ''; $('aikey').placeholder = P.hint; $('aikeylab').textContent = 'Tu clave de la API de ' + P.name;
  $('ainote').textContent = man ? 'Para depurar: cada vez que el juego le pida algo a la IA, aparece abajo a la derecha el pedido y un JSON por completar; lo respondes tú (o lo copias a otra IA y pegas su respuesta). Mientras no respondas, eso espera.' : `La clave la pones tú: se guarda solo en este navegador y se envía directamente a ${pv === 'openai' ? 'api.openai.com' : 'api.anthropic.com'}. No compartas el archivo ni el navegador con la clave puesta.`;
}
const aiSync = () => { AI.on = $('aion').checked; AI.auto = $('aiauto').checked; AI.plans = $('aiplans').checked; AI.stories = $('aistories').checked; AI.memoria = $('aimem').checked; AI.mode = $('aimode').value; AI.model = $('aimodel').value; if (provider() !== 'manual') AI.keys[provider()] = $('aikey').value.trim(); saveAI(); };
$('aimodel').addEventListener('change', () => { AI.model = $('aimodel').value; saveAI(); aiKeyField(); });
for (const id of ['aion', 'aiauto', 'aiplans', 'aistories', 'aimem', 'aimode', 'aikey']) $(id).addEventListener('change', aiSync);
$('aibtn').addEventListener('pointerdown', e => { e.stopPropagation(); audio(); if (!game.talk) aiPanel(true); });
$('aiclose').addEventListener('click', () => { aiSync(); aiPanel(false); });
$('aitest').addEventListener('click', async () => {
  aiSync(); const o = $('aiout'); o.hidden = false;
  if (!aiKey()) { o.textContent = 'Falta tu clave de la API de ' + PROV[provider()].name + '.'; return; }
  o.textContent = 'Preguntándole a Diana…';
  try { const r = await sceneAsk(['diana'], 'Ana saluda a Diana (esto es solo una prueba de la voz).', 'pasar'); o.textContent = r.lines.map(l => nameOf(l.q) + ': ' + l.t).join('\n') || '(no dijeron nada)'; }
  catch (e) { o.textContent = 'No funcionó: ' + e.message; }
});
$('ailog').addEventListener('click', aiLogShow);
$('aimem').addEventListener('click', () => {
  const o = $('aiout'); o.hidden = false;
  const per = Object.keys(PEOPLE).map(w => {
    const P = game.plans[w], k = game.know[w] || [], m = game.mem[w] || [];
    return `— ${NAMES[w]} —\n` + (P && P.day === today() ? `Plan de hoy: ${P.thought}\n` + P.steps.map(s => `  ${s.done ? '✓' : '·'} ${s.hora}:00 ${s.accion.replace(/_/g, ' ')}${s.lugar ? ' a ' + PLACES[s.lugar][0] : ''}${s.item ? ' (' + ITEM_NAME[s.item][0] + ')' : ''}${s.motivo ? ': ' + s.motivo : ''}`).join('\n') + '\n' : 'Sin plan todavía.\n')
      + 'Sabe:\n' + (k.slice(-8).map(e => '  · día ' + e.d + ': ' + e.t).join('\n') || '  (nada)') + '\nRecuerda de sus conversaciones:\n' + (m.map(x => '  · ' + x).join('\n') || '  (nada)');
  }).join('\n\n');
  o.textContent = per + '\n\n— Encargos —\n' + (game.tasks.map(t => '  ' + (t.done ? '✓ ' : '· ') + taskText(t) + ' (de ' + NAMES[t.from] + ')').join('\n') || '  (ninguno)') + '\n\n— Diario de Ana —\n' + (game.journal.slice(-30).map(e => '  · día ' + e.d + ': ' + e.t).join('\n') || '  (nada todavía)');
});
$('aiforget').addEventListener('click', () => { if (!confirm('¿Borrar todo lo que recuerdan y el diario de lo que ha pasado?')) return; game.mem = {}; game.journal = []; game.know = {}; game.plans = {}; game.tasks = []; game.giftFor = {}; save(); $('aiout').hidden = false; $('aiout').textContent = 'Listo: es como si fuera el primer día.'; });
$('aiq').querySelector('.ok').addEventListener('click', () => { const r = aiq.list[0]; if (!r) return; try { parseJSON($('aiq').querySelector('textarea').value); } catch (e) { notice('🐞 Eso no es un JSON válido'); return; } aiqAnswer(r.id, $('aiq').querySelector('textarea').value); });
$('aiq').querySelector('.no').addEventListener('click', () => { const r = aiq.list[0]; if (r) aiqFail(r.id); });
$('aiq').querySelector('.all').addEventListener('click', () => { const r = aiq.list[0]; if (!r) return; aiq.skip.add(r.kind); for (const x of aiq.list.filter(x => x.kind === r.kind)) aiqFail(x.id, 'omitido'); notice('🐞 Desde ahora no se pregunta: ' + r.kind); });
$('aiq').querySelector('.cp').addEventListener('click', () => { const r = aiq.list[0]; if (!r) return; try { navigator.clipboard.writeText(`INSTRUCCIONES:\n${sysFor(r.schema)}\n\nPEDIDO:\n${r.prompt}\n\nResponde solo con un objeto JSON que siga este esquema:\n${JSON.stringify(r.schema)}`); notice('📋 Copiado: pégalo en otra IA y trae su respuesta'); } catch (e) {} });
$('aiq').addEventListener('keydown', e => e.stopPropagation());
const SPEEDS_T = [1, 2, 5, 10, 25, 50];
function setSpeed(k){ GAME_SPEED = k; owed = 0; $('spdbtn').textContent = k + '×'; $('spdbtn').classList.toggle('fast', k > 1); if (k > 1) notice('⏩ El tiempo va ' + k + ' veces más rápido'); }
$('spdbtn').addEventListener('pointerdown', e => { e.stopPropagation(); setSpeed(SPEEDS_T[(SPEEDS_T.indexOf(GAME_SPEED) + (e.shiftKey || e.button === 2 ? SPEEDS_T.length - 1 : 1)) % SPEEDS_T.length]); });
$('spdbtn').addEventListener('contextmenu', e => e.preventDefault());
addEventListener('keydown', e => { if (e.target.closest?.('input, textarea')) return; const i = SPEEDS_T.indexOf(GAME_SPEED); if (e.key === '+') setSpeed(SPEEDS_T[Math.min(i + 1, SPEEDS_T.length - 1)]); else if (e.key === '-') setSpeed(SPEEDS_T[Math.max(i - 1, 0)]); });
$('tripisla').addEventListener('pointerdown', e => { e.stopPropagation(); islaToggle(); });
$('mapisla').addEventListener('click', () => islaToggle(true));
$('islaclose').addEventListener('click', () => islaToggle(false));
$('tok').addEventListener('pointerdown', e => { e.stopPropagation(); if (!game.talk) aiPanel(true); });
tokDraw();
// starting over: everything that happened is forgotten (the AI settings stay)
let wiping = false;
$('aireset').addEventListener('click', () => { if (!confirm('¿Borrar todo (el día, lo que tiene Ana, lo que recuerdan, las relaciones, la historia) y empezar de cero?')) return; wiping = true; try { localStorage.removeItem('avonlea'); } catch (e) {} location.reload(); });
try { if (!aiKey() && !localStorage.getItem('avonlea-ai-asked')) { localStorage.setItem('avonlea-ai-asked', '1'); aiPanel(true); } } catch (e) {}
$('say').addEventListener('submit', e => { e.preventDefault(); const t = $('sayin').value.trim(); $('sayin').value = ''; closeSay(); if (t) anaSpeak(t); });
$('sayin').addEventListener('keydown', e => { if (e.key === 'Escape') { e.stopPropagation(); closeSay(); } });
$('saybtn').addEventListener('pointerdown', e => { e.stopPropagation(); audio(); sayOpen ? closeSay() : openSay(); });
$('wmbtn').addEventListener('pointerdown', e => { e.stopPropagation(); audio(); wmPanel(); });
// Ana in automatic: start moving the view (from where it is; from her house if she is indoors)
function freeStart(){
  if (freeCam.free || obsScene()) return;
  if (game.scene === 'out') { freeCam.x = cam.x; freeCam.y = cam.y; }
  else { const H = HOUSES[ROOMS[game.scene]?.parent || game.scene]?.at; freeCam.x = H ? H.x : cam.x; freeCam.y = H ? H.y : cam.y; cam.x = freeCam.x; cam.y = freeCam.y; }
  freeCam.free = true;
}
function setAuto(on){
  ANA_AUTO = on; freeCam.free = false; panDrag = null; stick = null; keys.clear(); cam.snap = true;
  $('autobar').hidden = !on; $('autobtn').classList.toggle('on', on);
  if (on) { if (ana.goto && !ana.goto.wm) ana.goto = null; notice(activeGoals(AGENTS.ana).length ? '🤖 Ana sigue sola con lo que tiene que hacer' : '🤖 Ana en automático (ponle una meta en 🎯)'); }
  else userInput();
}
$('autobtn').addEventListener('pointerdown', e => { e.stopPropagation(); audio(); setAuto(!ANA_AUTO); });
$('callbtn').addEventListener('pointerdown', e => { e.stopPropagation(); audio(); callNearest(); });
$('autobar').addEventListener('pointerdown', e => e.stopPropagation());
$('autocenter').addEventListener('pointerdown', e => { e.stopPropagation(); freeCam.free = false; observe(null); cam.snap = true; });
$('autooff').addEventListener('pointerdown', e => { e.stopPropagation(); setAuto(false); });
{ const r = $('headr'), v = $('headv'), show = () => { r.value = HEAD_M; v.textContent = '×' + HEAD_M.toFixed(1); };
  $('headbtn').addEventListener('pointerdown', e => { e.stopPropagation(); show(); $('headp').hidden = !$('headp').hidden; });
  $('headp').addEventListener('pointerdown', e => e.stopPropagation());
  r.addEventListener('input', () => { setHeadM(r.value); show(); }); r.addEventListener('change', () => r.blur()); }
$('wmp').addEventListener('pointerdown', e => e.stopPropagation());
$('obsback').addEventListener('click', e => { e.stopPropagation(); observe(null); });
// choosing whom to watch: everyone with a name (the main characters first), and where they are now
function obsWhere(k){ const b = wmBody(k), w = wmScene(k); if (!b || !w) return ''; const pk = w === 'out' ? personKey(k) : null; return w === 'out' ? (pk && WP_NAME[pk] ? 'en ' + WP_NAME[pk] : 'afuera') : w === 'away' ? 'fuera de Avonlea' : w === 'in' ? 'en su casa' : w === 'camino' ? 'en el camino de Bright River' : w === 'br' ? 'en la estación de Bright River' : placeName(w); }
function obsMenu(show = $('obsmenu').hidden){
  const el = $('obsmenu'); el.hidden = !show; if (!show) return;
  const main = Object.keys(PEOPLE).filter(k => CH[k].onMap !== false || PEOPLE[k].where !== 'away'), folk = FOLK.filter(f => !/^v\d+$/.test(f.id)).map(f => f.id);
  const low = t => t ? t[0].toLowerCase() + t.slice(1) : t;
  const row = (k, sub) => `<button data-k="${k}" class="${(k === 'ana' ? !OBS : OBS === k) ? 'on' : ''}"><canvas data-p="${k}" width="68" height="80"></canvas><span class="t"><b>${wmName(k)}</b><small>${low(sub ?? obsWhere(k))}</small></span></button>`;
  el.innerHTML = '<div class="h">👁 ¿A quién observar? (la vista lo sigue)</div>' + row('ana', OBS ? 'volver a ella' : 'la ves a ella') + main.map(k => row(k)).join('') + '<div class="h" style="margin-top:6px">Del pueblo</div>' + folk.map(k => row(k)).join('');
}
// a little portrait of each one (head and shoulders, from the front)
const portraits = {};
function portrait(cv, k){
  const look = k === 'ana' ? 'ana' : PEOPLE[k] ? PEOPLE[k].look : 'f:' + k, c = cv.getContext('2d'), h = LOOKS[look]?.h || 1;
  c.clearRect(0, 0, cv.width, cv.height); c.save(); const z = 2.9; c.translate(34, 38 + 33.5 * z * h); c.scale(z, z);
  try { drawPerson(c, { ...mkPerson(look, 0, 0), dir: 2, blink: 0 }, 1.3); } catch (e) {}
  c.restore();
}
$('obsbtn').addEventListener('pointerdown', e => { e.stopPropagation(); obsMenu(); for (const cv of $('obsmenu').querySelectorAll('canvas[data-p]')) portrait(cv, cv.dataset.p); });
$('obsmenu').addEventListener('pointerdown', e => { e.stopPropagation(); const k = e.target.closest('[data-k]')?.dataset.k; if (!k) return; observe(k === 'ana' ? null : k); obsMenu(false); });
$('wmrun').addEventListener('pointerdown', e => { if (e.target.id === 'dlgdbg') { DLG_DBG = !DLG_DBG; wmRunDraw(); return; } const k = e.target.closest('[data-obs]')?.dataset.obs; if (k) observe(OBS === k ? null : k); });
$('vecon').checked = VEC_ON; $('vecon').addEventListener('change', e => { VEC_ON = e.target.checked; });
$('wmdis').addEventListener('change', e => { WM_DISTRACT = e.target.checked; });
$('wmagenda').addEventListener('change', e => { AGENDA_ON = e.target.checked; agendaT = 0; });
$('wmcap1').addEventListener('click', () => { startCap1(); notice('📖 Capítulo 1: una tarde de junio. Mira a la Sra. Lynde en su ventana… (abajo puedes acelerar)'); });
$('wmlist').addEventListener('click', e => { const i = e.target.closest('button')?.dataset.i; if (i != null) wmRunTest(+i); });
$('wmobey').addEventListener('change', e => { WM_OBEY = e.target.checked; });
$('wmstop').addEventListener('click', () => { for (const k of Object.keys(AGENTS)) { wmRelease(k); delete AGENTS[k]; } wmPanelDraw(); });
$('wmclose').addEventListener('click', () => wmPanel(false));
$('relbtn').addEventListener('pointerdown', e => { e.stopPropagation(); audio(); userInput(); relPanel($('rels').hidden); });
$('cuabtn').addEventListener('pointerdown', e => { e.stopPropagation(); audio(); userInput(); cuadernoPanel($('cua').hidden); });
$('cuaclose').addEventListener('click', () => cuadernoPanel(false));
$('relclose').addEventListener('click', () => relPanel(false));
$('rels').addEventListener('pointerdown', e => { if (e.target === $('rels')) relPanel(false); });
$('daybtn').addEventListener('pointerdown', e => { e.stopPropagation(); audio(); userInput(); if (!sleeping && !game.map) goSleep(false, true); });
$('mapnext').addEventListener('click', () => { game.seasonShift = (game.seasonShift + 1) % 4; save(); });
