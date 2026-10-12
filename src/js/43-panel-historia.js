/* ---------- the panel: the story of the day, and the graph of who feels what for whom ---------- */
const FOND_COL = ['#b5604c', '#c98a5a', '#d9a441', '#a8b05a', '#7aa060', '#4f8a5a'];
let relSel = null;
function relPanel(on){
  $('rels').hidden = !on; if (!on) return;
  close();
  const st = AI.stories ? game.story : null, sp = $('story');
  if (!AI.stories) sp.innerHTML = '<div class="si">📖 Las historias del día están en pausa (se activan en ✒).</div>';
  else if (st && st.day === today()) {
    const mark = { hecha: '✓', ya: '✓ <i>(antes de tiempo)</i>', perdida: '<i>(no llegaste)</i>', sin_evento: '<i>(no pasó)</i>', sin_encargo: '<i>(sin encargo)</i>', rota: '<i>↯ aquí se desvió</i>' };
    let rows = '';
    for (const e of st.escenas) {
      if (e.estado === 'descartada') continue;
      const r = st.ramas.find(r => e.id.startsWith(r.pre) && !rows.includes('data-r="' + r.pre + '"'));
      if (r) rows += `<li class="rama" data-r="${r.pre}">🌿 ${esc(r.titulo)}</li>`;
      rows += isFinal(e) ? `<li class="done">${e.hora}:00 · ${esc(e.pista)} ${mark[e.estado] || ''}</li>` : e.estado === 'espera' ? `<li class="later">${e.hora}:00 · …</li>` : `<li class="now">${e.hora}:00 · ${esc(e.pista)}</li>`;
    }
    if (st.gen) rows += '<li class="rama">🌿 La historia está tomando otro camino…</li>';
    sp.innerHTML = `<div class="st">📖 «${esc(st.titulo)}»</div><div class="si">${esc(st.inspiracion)}</div>` + (storyDbg ? storyDbgHtml(st) : `<ul>${rows}</ul>`);
  } else if (AI.stories) sp.innerHTML = '<div class="si">📖 La historia de hoy se está escribiendo…</div>';
  sp.innerHTML += `<div class="si">Historias escritas a mano (para mañana): ${STORIES.map((x, k) => `<button class="pick" data-k="${k}">${game.nextStory === x.titulo ? '✓ ' : ''}${esc(x.titulo)}</button>`).join(' ')}</div>`;
  if (storyDbg) sp.innerHTML += STORIES.map(x => `<details><summary>🐞 Guion completo de «${esc(x.titulo)}»${x.ramas?.length ? ' (con ' + x.ramas.length + ' ramas escritas a mano)' : ''}</summary>${x.escenas.map(e => beatHtml(e)).join('')}${(x.ramas || []).map(r => `<div class="dh">🌿 Rama «${esc(r.titulo)}» · si se rompe «${esc(r.desde)}»${r.por ? ' por ' + r.por.join(', ') : ''}</div>${r.resumen ? `<div class="si">${esc(r.resumen)}</div>` : ''}${r.escenas.map(e => beatHtml(e)).join('')}`).join('')}</details>`).join('');
  sp.innerHTML += `<div class="si"><button class="dbg" id="dbgbtn">🐞 ${storyDbg ? 'Ocultar el detalle' : 'Ver toda la historia (depurar)'}</button>${storyDbg && st ? ' <button class="dbg" id="dbgcopy">📋 Copiar como JSON</button>' : ''}</div>`;
  sp.querySelectorAll('.pick').forEach(bt => bt.addEventListener('click', () => { const x = STORIES[+bt.dataset.k]; game.nextStory = game.nextStory === x.titulo ? null : x.titulo; save(); relPanel(true); }));
  $('dbgbtn').addEventListener('click', () => { storyDbg = !storyDbg; try { localStorage.setItem('avonlea-debug', storyDbg ? '1' : ''); } catch (e) {} relPanel(true); });
  $('dbgcopy')?.addEventListener('click', () => { try { navigator.clipboard.writeText(JSON.stringify(game.story, null, 2)); notice('📋 Historia copiada'); } catch (e) {} });
  sp.querySelectorAll('.jump').forEach(bt => bt.addEventListener('click', () => { const h = +bt.dataset.h; dayT = Math.max(dayT, today() + (h - 6) / 24); storyTick(); relPanel(true); }));
  drawRels();
}
/* the debugger: the whole story, scene by scene (what is coming too), with what each one needs and what happened */
let storyDbg = false; try { storyDbg = !!localStorage.getItem('avonlea-debug'); } catch (e) {}
const DBG_STATE = { espera: ['', '⏳ espera'], abierta: ['on', '▶ abierta'], jugando: ['on', '🎭 jugándose'], jugada: ['on', '🎭 jugada, esperando cómo termina'], hecha: ['ok', '✓ hecha'], ya: ['ok', '✓ pasó antes de tiempo'], perdida: ['gap', '○ se perdió (vacío)'], sin_evento: ['gap', '○ no pasó el evento (vacío)'], sin_encargo: ['gap', '○ sin encargo (vacío)'], rota: ['br', '↯ se rompió: aquí se desvió'], descartada: ['off', '✗ descartada por la rama'] };
function beatHtml(e, st){
  const [cls, lab] = st ? DBG_STATE[e.estado] || ['', e.estado] : ['', ''], hh = h => fmtHour(h);
  const has = n => st && st.ev?.[n] != null, req = (e.requiere || []).map(r => `${esc(r)}${st ? (has(r) ? ' ✓' + hh(st.ev[r]) : ' …') : ''}`).join(', ');
  const fin = e.fin === 'evento' ? `cuando pase <b>${esc(e.evento)}</b> (${esc(evDesc(e.evento))})${has(e.evento) ? ' ✓' + hh(st.ev[e.evento]) : ''}` : e.fin === 'encargo_cumplido' ? 'cuando Ana cumpla el encargo' : 'al jugarse la escena';
  const enc = e.encargo && e.encargo.tipo && e.encargo.tipo !== 'ninguno' ? Object.entries(e.encargo).filter(([, v]) => v).map(([k, v]) => k + ': ' + v).join(', ') : '';
  const efx = (e.efectos || []).map(f => `${f.tipo} (${f.cuando || 'antes'}: ${[f.quien?.join('+'), f.animal, f.lugar, f.estado, f.tipo === 'ausente' ? 'hasta las ' + (f.hasta || 19) : ''].filter(Boolean).join(', ')})`).join('; ');
  const run = st && e.vence != null && !isFinal(e) ? `abierta; vence a las ${hh(e.vence)}${e.reqAt != null ? ', cuenta lo que pase desde las ' + hh(e.reqAt) : ''}` : '';
  return `<div class="bt ${cls}"><b>${e.hora}:00 · ${esc(e.id || '')}</b>${e.clave ? '<span class="tag">clave</span>' : '<span class="tag">relleno</span>'} ${lab ? '· ' + lab : ''}`
    + (st && e.estado === 'espera' && e.hora - .8 > hourNow() ? ` <button class="dbg jump" data-h="${e.hora - .8}">⏩ ir a las ${hh(e.hora - .8)}</button>` : '')
    + `<br><span class="k">dónde:</span> ${esc(placeName(e.lugar))} (${esc(e.lugar)})${e.personajes?.length ? ' · <span class="k">con:</span> ' + e.personajes.map(k => esc(NAMES[k] || k)).join(', ') : ''}`
    + `<br><span class="k">qué pasa:</span> ${esc(e.que_pasa || '')}<br><span class="k">pista:</span> ${esc(e.pista || '')}<br><span class="k">termina:</span> ${fin}`
    + (req ? `<br><span class="k">requiere:</span> ${req}` : '') + (e.contra?.length ? `<br><span class="k">en contra:</span> ${e.contra.map(c => esc(c) + (has(c) ? ' ⚠' + hh(st.ev[c]) : '')).join(', ')}` : '')
    + (efx ? `<br><span class="k">efectos:</span> ${esc(efx)}` : '') + (enc ? `<br><span class="k">encargo:</span> ${esc(enc)}` : '')
    + (e.frases?.length ? `<br><span class="k">frases:</span> ${e.frases.map(f => `${esc(nameOf(f.quien))}: «${esc(f.texto)}»`).join(' ')}` : '')
    + (e.juicio ? `<br><span class="k">juez (${fmtHour(e.juicio.h)}):</span> ${esc(e.juicio.v)}${e.juicio.nota ? ' — ' + esc(e.juicio.nota) : ''}` : '') + (run ? `<br><span class="k">ahora:</span> ${run}` : '') + (e.porque ? `<br><span class="k">por qué se rompió:</span> ${esc(e.porque)}` : '') + '</div>';
}
function storyDbgHtml(st){
  let h = '', pre = '';
  for (const e of st.escenas) {
    const r = st.ramas.find(r => e.id.startsWith(r.pre));
    if (r && r.pre !== pre) { pre = r.pre; h += `<div class="dh">🌿 Rama «${esc(r.titulo)}» (desde «${esc(r.desde)}», a las ${fmtHour(r.hora)})</div><div class="si">${esc(r.por)}${r.resumen ? ' → ' + esc(r.resumen) : ''}</div>`; }
    h += beatHtml(e, st);
  }
  if (st.gen) h += '<div class="dh">🌿 La IA está escribiendo la rama…</div>';
  if (st.judging) h += '<div class="dh">⚖ El juez está mirando la bitácora…</div>';
  const src = STORIES.find(x => x.titulo === st.titulo), left = (src?.ramas || []).filter(r => !st.ramas.some(x => x.desde === r.desde));
  if (left.length) h += `<details><summary>Ramas escritas a mano que no se tomaron (${left.length})</summary>${left.map(r => `<div class="dh">🌿 «${esc(r.titulo)}» · si se rompe «${esc(r.desde)}»</div>${r.escenas.map(e => beatHtml(e)).join('')}`).join('')}</details>`;
  const ev = Object.entries(st.ev || {}).sort((a, b) => a[1] - b[1]);
  h += `<div class="dh">Eventos de hoy</div><div class="si" style="text-align:left">${ev.length ? ev.map(([k, t]) => fmtHour(t) + ' ' + esc(k)).join(' · ') : '(ninguno todavía)'}</div>`;
  h += `<div class="dh">Lo que va pasando (lo saben los personajes)</div><div class="si" style="text-align:left">${(st.hechos || []).map(x => fmtHour(x.h) + ' ' + esc(x.t)).join('<br>') || '(nada todavía)'}</div>`;
  return h;
}
const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
function drawRels(){
  const N = NODES(), W = 420, H = 300, pos = {};
  pos.ana = [W / 2, H / 2];
  N.slice(1).forEach((k, i) => { const a = -Math.PI / 2 + i * TAU / (N.length - 1); pos[k] = [W / 2 + Math.cos(a) * 165, H / 2 + Math.sin(a) * 112]; });
  let svg = `<defs>${FOND_COL.map((c, i) => `<marker id="ar${i}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${c}"/></marker>`).join('')}</defs>`;
  for (const f of N) for (const t of N) {
    if (f === t) continue;
    const r = relGet(f, t), [x1, y1] = pos[f], [x2, y2] = pos[t], dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
    const sx = x1 + ux * 24 - uy * 4, sy = y1 + uy * 24 + ux * 4, ex = x2 - ux * 26 - uy * 4, ey = y2 - uy * 26 + ux * 4, mx = (sx + ex) / 2 - uy * 14, my = (sy + ey) / 2 + ux * 14;
    const on = !relSel || relSel === f || relSel === t, a = clamp(Math.round(r.a), 0, 5);
    svg += `<path d="M${sx.toFixed(1)} ${sy.toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="${FOND_COL[a]}" stroke-width="${(1 + a * .55).toFixed(2)}" opacity="${on ? (relSel === f ? .95 : .7) : .08}" marker-end="url(#ar${a})"><title>${esc(nodeName(f))} → ${esc(nodeName(t))}: ${a}/5 ${esc(r.n)}</title></path>`;
  }
  for (const k of N) {
    const [x, y] = pos[k], L = LOOKS[k];
    svg += `<g class="node" data-k="${k}" style="cursor:pointer"><circle cx="${x}" cy="${y}" r="21" fill="${L.dress}" stroke="${relSel === k ? '#d9a441' : '#4a2f1c'}" stroke-width="${relSel === k ? 3.5 : 1.6}"/><circle cx="${x}" cy="${y - 4}" r="9" fill="${L.skin}" stroke="#4a2f1c" stroke-width=".8"/><path d="M${x - 9} ${y - 5}Q${x} ${y - 17} ${x + 9} ${y - 5}" fill="${L.hair}"/><text x="${x}" y="${y + 36}" text-anchor="middle" font-size="13" font-style="italic" fill="#3b2a1c">${esc(nodeName(k))}</text></g>`;
  }
  $('relsvg').innerHTML = svg;
  $('relsvg').querySelectorAll('.node').forEach(g => g.addEventListener('click', () => { relSel = relSel === g.dataset.k ? null : g.dataset.k; drawRels(); }));
  const det = $('reldet');
  if (relSel) {
    const out = N.filter(t => t !== relSel).map(t => { const r = relGet(relSel, t); return `<li><b>${esc(nodeName(relSel))} → ${esc(nodeName(t))}</b> <span class="h">${'♥'.repeat(r.a)}${'♡'.repeat(5 - r.a)}</span> ${esc(r.n)}</li>`; }).join('');
    const imp = (game.impr[relSel] || []).slice(-3).map(x => `<li>${esc(x)}</li>`).join('');
    det.innerHTML = `<ul>${out}</ul>` + (imp ? `<div class="si">Lo que se le quedó de estos días:</div><ul>${imp}</ul>` : '');
  } else {
    const log = (game.relLog || []).slice(-5).reverse().map(c => `<li>día ${c.d}: ${esc(nodeName(c.de))} → ${esc(nodeName(c.a))} ${c.cambio > 0 ? '▲' : c.cambio < 0 ? '▼' : '·'} ${esc(c.nota)}</li>`).join('');
    det.innerHTML = '<div class="si">Toca a alguien para ver lo que siente por los demás. Las flechas van de quien siente hacia quien es querido (más gruesas y verdes, más cariño).</div>' + (log ? `<div class="si">Lo que cambió en las últimas noches:</div><ul>${log}</ul>` : '');
  }
}
