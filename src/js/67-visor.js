/* ---------- the viewer (index.html?visor): only Ana, big, on a plain floor, to look at the drawings and move her:
   arrows (Shift to run), and buttons for everything she can do. ---------- */
function startVisor(){
  document.body.classList.add('visor');
  $('ai').hidden = true; close();   // (no settings dialog over her: the keys must reach her)
  const P = document.createElement('div'); P.id = 'visor'; P.className = 'paper';
  P.innerHTML = `<b>Visor</b> <select id="vwho"><option value="ana">Ana</option><option value="marilla">Marilla</option><option value="matthew">Matthew</option><option value="f:ruby">Ruby (recoloreada)</option><option value="f:jane">Jane (recoloreada)</option><option value="f:josie">Josie (recoloreada)</option></select> <small>flechas para caminar · Shift para correr · rueda: zoom</small><div>
    <button data-a="sit">Sentarse</button><button data-a="crouch">Agacharse</button><button data-a="lie">Acostarse</button>
    <button data-a="talk">Hablar</button><button data-a="flick">Echarse la trenza</button><button data-a="hat">Sombrero</button>
    <button data-a="turn">Girar</button><button data-a="code">Otros: dibujo GPT / código</button> Ana: <select id="vsty"><option value="codigo">código</option><option value="video">video</option><option value="mano">a mano (cabezona)</option><option value="hojas">hojas</option></select> Cabezas <input id="vhead" type="range" min="1" max="5" step="0.1" style="width:110px;vertical-align:middle"> <b id="vheadv"></b></div>
    <div>Cara: <button data-f="">normal</button><button data-f="contenta">contenta</button><button data-f="triste">triste</button><button data-f="sorprendida">sorprendida</button><button data-f="enojada">enojada</button></div>`;
  document.body.appendChild(P);
  const a = ana, L = LOOKS.ana; a.x = 0; a.y = 0; a.dir = 2; a.dir8 = 4; a.blink = -1; a.braidBack = false; a.sit = a.lie = a.crouch = false;
  let Z = 5, t = 0, last = performance.now(), says = 0, ox = 0, oy = 0;
  P.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.f != null) { a.face = b.dataset.f || undefined; return; }
    const k = b.dataset.a;
    if (k === 'sit' || k === 'crouch' || k === 'lie') { const on = !a[k]; a.sit = a.crouch = a.lie = false; a[k] = on; }
    if (k === 'talk') { bubbles = [{ q: 'ana', text: pick(['¡Qué día tan maravilloso!', 'Matthew, ¿no le parece que el mundo es precioso?', '¡Diana, amiga del alma!']), t: 0, dur: 3 }]; }
    if (k === 'flick') { a.braidBack = false; a.flick = t; }
    if (k === 'hat') L.hat = !L.hat;
    if (k === 'turn') { a.dir8 = (a.dir8 + 1) % 8; a.dir = [0, 1, 1, 2, 2, 3, 3, 0][a.dir8]; a._fd = a.dir; }
    if (k === 'code') VEC_ON = !VEC_ON;
    if (k === 'anim') ANIM_ON = !ANIM_ON;
  });
  cv.addEventListener('wheel', e => { e.preventDefault(); Z = clamp(Z * Math.exp(-e.deltaY * .0015), 1.5, 12); }, { passive: false });
  $('vsty').value = ANA_STYLE;
  { const r = $('vhead'), v = $('vheadv'), show = () => { r.value = HEAD_M; v.textContent = '×' + HEAD_M.toFixed(1); }; show(); r.addEventListener('input', () => { setHeadM(r.value); show(); }); r.addEventListener('change', () => r.blur()); }
  $('vsty').addEventListener('change', e => { ANA_STYLE = e.target.value; if (ANA_STYLE !== 'codigo') VEC_ON = true; e.target.blur(); });
  $('vwho').addEventListener('change', e => { a.look = e.target.value; e.target.blur(); });   // (another one to look at: the same body, another look)
  const frame = now => {
    const dt = clamp((now - last) / 1000, 0, .05); last = now; t += dt; TT = t;
    const vx = (keys.has('ArrowRight') || keys.has('KeyD')) - (keys.has('ArrowLeft') || keys.has('KeyA')), vy = (keys.has('ArrowDown') || keys.has('KeyS')) - (keys.has('ArrowUp') || keys.has('KeyW'));
    const sp = keys.has('ShiftLeft') || keys.has('ShiftRight') ? RUN : WALK, m = Math.hypot(vx, vy);
    if (m) { a.sit = a.crouch = a.lie = false; a.x += vx / m * sp * dt; a.y += vy / m * sp * dt; a.moving = true; a.walk = (a.walk + dt * 1.8 * sp / SPEED) % 1; a.dir = Math.abs(vx) > Math.abs(vy) ? (vx > 0 ? 1 : 3) : (vy > 0 ? 2 : 0); }
    else a.moving = false;
    a.blink -= dt; if (a.blink < -2.5 - Math.random() * 3) a.blink = .14;
    for (const b of bubbles) b.t += dt; bubbles = bubbles.filter(b => b.t < b.dur);
    ox = lerp(ox, a.x, .1); oy = lerp(oy, a.y, .1);
    const W = innerWidth, H = innerHeight, dpr = devicePixelRatio || 1;
    if (cv.width !== Math.round(W * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
    g.setTransform(dpr, 0, 0, dpr, 0, 0); g.fillStyle = '#d9e6c0'; g.fillRect(0, 0, W, H);
    g.setTransform(dpr * Z, 0, 0, dpr * Z, dpr * (W / 2 - ox * Z), dpr * (H * .62 - oy * Z));
    g.strokeStyle = 'rgba(90,110,60,.25)'; g.lineWidth = .3; const S_ = 20;   // (a floor of squares, so one sees her move)
    for (let x = Math.floor((ox - W / Z) / S_) * S_; x < ox + W / Z; x += S_) { g.beginPath(); g.moveTo(x, oy - H / Z); g.lineTo(x, oy + H / Z); g.stroke(); }
    for (let y = Math.floor((oy - H / Z) / S_) * S_; y < oy + H / Z; y += S_) { g.beginPath(); g.moveTo(ox - W / Z, y); g.lineTo(ox + W / Z, y); g.stroke(); }
    drawPerson(g, a, t);
    view.ox = ox - W / 2 / Z; view.oy = oy - H * .62 / Z; view.Z = Z;
    g.setTransform(dpr, 0, 0, dpr, 0, 0); cuadrosY = 10; for (const b of bubbles) drawBubble(g, a, b, W, H, 'cuadros'); for (const b of bubbles) drawBubble(g, a, b, W, H);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
if (/visor/.test(location.search)) startVisor(); else requestAnimationFrame(loop);
})();