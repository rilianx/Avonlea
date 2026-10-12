/* ---------- PHASER, the new engine (phase 2 of the plan) ----------
   It comes in place by place, as the one who draws the world: the simulation, the planner, the scenes, the bubbles,
   the menus and the touches stay as they are. ?motor=phaser in the link chooses it (and is remembered); ?motor=canvas
   goes back to the drawing of always. Without that, Phaser is not even loaded.
   - The screen (cv) stays on top, transparent where Phaser draws: the light of the day, the bubbles, the "!" and the
     paper grain are still drawn there, over Phaser's world.
   - Indoors, the room (floor, walls) and each piece of furniture are images baked once (again when the night or the
     furniture changes); each person and each thing of an action is its own sprite, drawn by the same code as always
     into its own little canvas, in the same order of depth. So it looks the same, and from here each kind of thing
     can move to real sprites (sheets) without touching the rest.
   - One clock: Phaser's own loop sleeps and the game steps it after each frame. ---------- */
const PH = { on: false, ready: false, game: null, scene: null, R: 0, vivos: new Map(), sala: null };
(() => {
  if (/visor/.test(location.search)) return;
  const q = location.search.match(/motor=(phaser|canvas)/);
  try { if (q) localStorage.setItem('avonlea-motor', q[1]); } catch {}
  let m = q ? q[1] : null; if (!m) try { m = localStorage.getItem('avonlea-motor'); } catch {}
  if (m !== 'phaser') return;
  PH.on = true;
  const s = document.createElement('script'); s.src = 'vendor/phaser.min.js';
  s.onload = phArrancar; s.onerror = () => { PH.on = false; console.warn('[avonlea] no pude cargar Phaser: sigue el dibujo de siempre'); };
  document.head.appendChild(s);
})();
function phArrancar(){
  const div = document.createElement('div'); div.id = 'ph'; div.style.cssText = 'position:fixed;inset:0;display:none'; cv.before(div);
  const dpr = devicePixelRatio || 1;
  PH.game = new Phaser.Game({ type: Phaser.AUTO, parent: div, backgroundColor: '#2b2219', banner: false, audio: { noAudio: true },
    input: { keyboard: false, mouse: false, touch: false, gamepad: false },   // (the touches are the game's, on the screen above)
    scale: { mode: Phaser.Scale.NONE, width: Math.round(innerWidth * dpr), height: Math.round(innerHeight * dpr), zoom: 1 / dpr },
    scene: { create(){ PH.scene = this; PH.ready = true; PH.game.loop.sleep();
      // (a phone may take back the graphics memory when the game goes to the background: everything is baked again)
      this.sys.renderer.on?.(Phaser.Renderer.Events.RESTORE_WEBGL, phRepintar);
      PH.game.events.on(Phaser.Core.Events.VISIBLE, () => { PH.game.loop.sleep(); phRepintar(); });   // (and its own clock stays asleep)
    } } });
}
// everything baked is thrown away and made again on the next frame
function phRepintar(){ if (!PH.scene) return; for (const V of PH.vivos.values()) { V.img.destroy(); PH.scene.textures.remove(V.tk); } PH.vivos.clear(); PH.sala = null; }
// does Phaser draw this place? (and shows its canvas, or hides it)
function phNativo(interior){
  const si = PH.ready && interior && !!ROOMS[game.scene];
  if (si && !PH.antes) phRepintar();   // (coming in again from outside: the room baked fresh)
  PH.antes = si;
  const div = PH.game && PH.game.canvas?.parentNode; if (div) div.style.display = si ? '' : 'none';
  return si;
}
// a sprite drawn by the game's own code: a little canvas of its own (box: [left, top, right, bottom] around `at`)
function phVivo(key, at, box, depth, draw){
  const sc = PH.scene, R = PH.R, w = Math.max(1, Math.ceil((box[2] - box[0]) * R)), h = Math.max(1, Math.ceil((box[3] - box[1]) * R));
  let V = PH.vivos.get(key);
  if (V && (V.w !== w || V.h !== h)) { V.img.destroy(); sc.textures.remove(V.tk); PH.vivos.delete(key); V = null; }
  if (!V) { const tk = 'v' + (PH.seq = (PH.seq || 0) + 1); const tex = sc.textures.createCanvas(tk, w, h); V = { tk, tex, w, h, img: sc.add.image(0, 0, tk).setOrigin(0) }; PH.vivos.set(key, V); }
  const c = V.tex.getContext(); c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, w, h);
  c.globalAlpha = 1; c.globalCompositeOperation = 'source-over'; c.setTransform(R, 0, 0, R, -(at[0] + box[0]) * R, -(at[1] + box[1]) * R);
  const pant = g; g = c; try { draw(c); } finally { g = pant; }
  V.tex.refresh(); V.img.setPosition(at[0] + box[0], at[1] + box[1]).setScale(1 / R).setDepth(depth).setVisible(true); V.usado = PH.cuadro;
}
// the room and its furniture: images baked again only when something changes (the night, the season, a stew on the
// stove; the furniture twice a second, in a box of its own measured the first time)
function phSala(v){
  const I = ROOMS[game.scene], W = KIT.w, Hh = KIT.h, sig = game.scene + '|' + PH.R + '|' + Math.round(v.night * 10) + '|' + S + '|' + (game.cooking ? Math.floor(v.t * 4) : '');
  if (PH.sala?.scene !== game.scene || PH.sala.R !== PH.R) PH.sala = { scene: game.scene, R: PH.R, sig: '', t: -1, cajas: [] };
  const P = PH.sala;
  if (P.sig !== sig) { P.sig = sig; phVivo('fondo', [0, 0], [0, 0, W, Hh], -1e9, c => I.draw(c, v.t, v.night)); }
  else if (PH.vivos.has('fondo')) PH.vivos.get('fondo').usado = PH.cuadro; else { P.sig = ''; return phSala(v); }
  const muebles = I.items(g, v.t);
  if (v.t - P.t > .5 || v.t < P.t) {
    P.t = v.t;
    muebles.forEach((m, j) => {
      if (!P.cajas[j]) {   // (measured once: drawn on the whole room, the box is where it painted, and a margin)
        const R = 2, cv0 = document.createElement('canvas'); cv0.width = W * R; cv0.height = Hh * R; const c = cv0.getContext('2d'); c.setTransform(R, 0, 0, R, 0, 0);
        const pant = g; g = c; try { I.items(c, v.t)[j].draw(); } finally { g = pant; }
        const d = c.getImageData(0, 0, cv0.width, cv0.height).data; let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
        for (let y = 0; y < cv0.height; y++) for (let x = 0; x < cv0.width; x++) if (d[(y * cv0.width + x) * 4 + 3]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
        P.cajas[j] = x1 < 0 ? [0, 0, 1, 1] : [Math.max(0, x0 / R - 8), Math.max(0, y0 / R - 14), Math.min(W, x1 / R + 8), Math.min(Hh, y1 / R + 6)];
      }
      phVivo('mueble:' + j, [0, 0], P.cajas[j], m.y, c => I.items(c, v.t)[j].draw());
    });
  } else muebles.forEach((m, j) => { const V = PH.vivos.get('mueble:' + j); if (V) V.usado = PH.cuadro; });
}
// one frame of the world under Phaser: the camera where the game's view is, the room, and each thing of the list
function phMundo(list, v){
  const sc = PH.scene, dpr = v.dpr, cw = Math.round(v.W * dpr), ch = Math.round(v.H * dpr);
  if (PH.game.scale.width !== cw || PH.game.scale.height !== ch) PH.game.scale.resize(cw, ch);
  const R = Math.min(4, Math.max(1, Math.round(v.Z * dpr * 4) / 4));
  if (R !== PH.R) { PH.R = R; phRepintar(); }   // (another size of screen: everything again, sharp)
  PH.cuadro = (PH.cuadro || 0) + 1;
  const cam = sc.cameras.main; cam.setZoom(v.Z * dpr); cam.centerOn(v.ox + v.W / v.Z / 2, v.oy + v.H / v.Z / 2);
  phSala(v);
  list.forEach((o, i) => { const p = o.ph || { key: 'suelto:' + i, at: [0, 0], box: [0, 0, KIT.w, KIT.h] }; phVivo(p.key, p.at, p.box, o.y + i * 1e-6, o.draw); });
  for (const [k, V] of PH.vivos) if (V.usado !== PH.cuadro) {
    if (k.startsWith('mueble:') || k === 'fondo') { V.img.destroy(); sc.textures.remove(V.tk); PH.vivos.delete(k); }   // (another room's)
    else if (PH.cuadro - V.usado > 600) { V.img.destroy(); sc.textures.remove(V.tk); PH.vivos.delete(k); }   // (not seen for a while: its memory back)
    else V.img.setVisible(false);
  }
  const now = performance.now(); PH.game.step(now, Math.min(50, now - (PH.t0 || now)) || 16); PH.t0 = now;
}
