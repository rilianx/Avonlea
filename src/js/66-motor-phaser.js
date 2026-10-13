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
const PH = { on: false, ready: false, game: null, scene: null, R: 0, vivos: new Map(), hojas: new Map(), caras: new Map(), fijos: new Map(), sala: null, motivo: {} };   // (motivo: why each one was drawn from a sheet or live, for the tests)
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
  // three layers: the floor (a canvas of its own, drawn as always), Phaser (whatever stands on it), the screen (the rest, on top)
  const div = document.createElement('div'); div.id = 'ph'; div.style.cssText = 'position:fixed;inset:0;display:none'; cv.before(div);
  PH.suelo = document.createElement('canvas'); PH.suelo.id = 'phsuelo'; PH.suelo.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;display:none'; div.before(PH.suelo);
  const dpr = devicePixelRatio || 1;
  PH.game = new Phaser.Game({ type: Phaser.AUTO, parent: div, transparent: true, banner: false, audio: { noAudio: true },
    input: { keyboard: false, mouse: false, touch: false, gamepad: false },   // (the touches are the game's, on the screen above)
    scale: { mode: Phaser.Scale.NONE, width: Math.round(innerWidth * dpr), height: Math.round(innerHeight * dpr), zoom: 1 / dpr },
    scene: { create(){ PH.scene = this; PH.ready = true; PH.game.loop.sleep();
      // (a phone may take back the graphics memory when the game goes to the background: everything is baked again)
      this.sys.renderer.on?.(Phaser.Renderer.Events.RESTORE_WEBGL, phRepintar);
      PH.game.events.on(Phaser.Core.Events.VISIBLE, () => { PH.game.loop.sleep(); phRepintar(); });   // (and its own clock stays asleep)
    } } });
}
// everything baked is thrown away and made again on the next frame
function phRepintar(){
  if (!PH.scene) return;
  for (const V of PH.vivos.values()) { V.img.destroy(); PH.scene.textures.remove(V.tk); } PH.vivos.clear(); PH.sala = null; PH.fuego?.destroy(); PH.fuego = null;
  for (const H of PH.hojas.values()) PH.scene.textures.remove(H.tk); PH.hojas.clear();
  for (const C of PH.caras.values()) C.img.destroy(); PH.caras.clear();
  for (const F of PH.fijos.values()) phFijoFuera(F); PH.fijos.clear();
}
// the floor's canvas, the size of the screen
function phSuelo(W, H, dpr){
  const c = PH.suelo, w = Math.round(W * dpr), h = Math.round(H * dpr); if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
  return c.getContext('2d');
}
/* ---------- the people from sheets (step 2): each pose drawn once, the first time it is needed, by the same code ----------
   A person standing, walking or bending down, quiet, is shown from a strip of her direction (standing, 8 steps, bending
   down; one strip for each of 5 degrees of running); anything else (talking, blinking, sitting, lying, the gesture of the braid, a face) is still drawn live,
   so it looks as always. Her drawing also keeps her own clocks (where she faces, when she throws her braid back): so it
   still runs every frame, on a canvas that paints nothing, and costs almost nothing. */
const NULO = new Proxy({}, {   // (a canvas that paints nothing: every method does nothing, every property is kept)
  get: (o, k) => k in o ? o[k] : k === 'createLinearGradient' || k === 'createRadialGradient' || k === 'createPattern' ? () => ({ addColorStop(){} }) : k === 'measureText' ? () => ({ width: 0 }) : k === 'getTransform' ? () => new DOMMatrix() : () => {},
  set: (o, k, v) => { o[k] = v; return true; } });
const HOJA_BOX = [-30, -96, 30, 16];   // (around the feet: hat and hair up top, the shadow below; a person standing, walking or bending down)
const phLlana = (b, t) => !b.lie && !b.sit && !b.carry && !b.pet && !(b.petted > 0) && !b.face && !b.askew && !b.torn && !(Math.abs(b.lookAround || 0) > .1) && !(b.blink > 0) && !(b.flick && t - b.flick < 1.1) && !isTalking(b) && !b.noShadow && !!LOOKS[b.look];   // (the braid's gesture lasts 1.1 s)
// how she is drawn depends on these: if one changes (her look, the season, the style), new strips
const phFirma = b => b.look + '|' + JSON.stringify(LOOKS[b.look]) + '|' + S + '|' + ANA_STYLE + '|' + VEC_ON + '|' + (typeof FACE_STYLE === 'undefined' ? '' : FACE_STYLE) + '|' + (b.look === 'ana' && !!game.wm?.perm?.pelo_verde);
function phHoja(b, key, depth, t){
  if (!phLlana(b, t) || PH.malas?.has(b.look)) return PH.motivo[key] = 'antes', false;
  try { drawPerson(NULO, b, t); } catch (e) { (PH.malas ??= new Set()).add(b.look); console.debug('[avonlea phaser] sin hoja para', b.look, e.message); return false; }   // (her clocks)
  if (!phLlana(b, t)) return PH.motivo[key] = 'después', false;
  PH.motivo[key] = 'hoja';
  const q = b.dir8 ?? [0, 2, 4, 6][b.dir] ?? 4, col = b.crouch ? 9 : b.moving ? 1 + ((Math.floor(b.walk * 8) % 8) + 8) % 8 : 0;
  const corre = Math.round(clamp(((b._spd || 0) - 34) / 46, 0, 1) * 4) / 4;   // (how much she runs: the arms and the braids open; 5 degrees)
  const fk = phFirma(b) + '|' + (b.braidBack ? 1 : 0) + '|' + q + '|' + corre + '|' + PH.R;
  let H = PH.hojas.get(fk);
  const R = PH.R, fw = Math.ceil((HOJA_BOX[2] - HOJA_BOX[0]) * R), fh = Math.ceil((HOJA_BOX[3] - HOJA_BOX[1]) * R);
  if (!H) { const tk = 'h' + (PH.seq = (PH.seq || 0) + 1); H = { tk, tex: PH.scene.textures.createCanvas(tk, fw * 10, fh), hecho: [] }; PH.hojas.set(fk, H); }
  if (!H.hecho[col]) {   // (this pose, drawn the first time: a person like her, still, in that pose)
    const cx = col * fw - HOJA_BOX[0] * R, a = (q - 2) * Math.PI / 4, X = -HOJA_BOX[0], Y = -HOJA_BOX[1];
    const tp = Object.assign(mkPerson(b.look, X, Y), { dir: b.dir, dir8: q, n: b.n, braidBack: b.braidBack, _bstill: 0, _bwait: 1e9, _spd: corre ? 34 + corre * 46 : 0 });
    if (col >= 1 && col <= 8) { tp.moving = true; tp.walk = (col - 1) / 8; tp._fx = X - Math.cos(a); tp._fy = Y - Math.sin(a); }
    else { tp._fx = X; tp._fy = Y; tp._fd = tp.dir; tp.crouch = col === 9; }
    const c = H.tex.getContext(); c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.beginPath(); c.rect(col * fw, 0, fw, fh); c.clip(); c.setTransform(R, 0, 0, R, col * fw, 0);
    const pant = g; g = c; try { drawPerson(c, tp, t); } finally { g = pant; c.restore(); }
    H.tex.add(String(col), 0, col * fw, 0, fw, fh); H.tex.refresh(); H.hecho[col] = true;
  }
  let C = PH.caras.get(key);
  if (!C) { C = { img: PH.scene.add.image(0, 0, H.tk, String(col)).setOrigin(0) }; PH.caras.set(key, C); }
  C.img.setTexture(H.tk, String(col)).setPosition(b.x + HOJA_BOX[0], b.y + HOJA_BOX[1]).setScale(1 / R).setDepth(depth).setVisible(true); C.usado = PH.cuadro;
  return true;
}
// does Phaser draw this place? (and shows its canvas, or hides it)
function phNativo(sitio){
  const si = PH.ready && sitio && (game.scene === 'out' || !!ROOMS[game.scene]);
  if (si && !PH.antes) phRepintar();   // (coming in again from outside: the room baked fresh)
  PH.antes = si;
  const div = PH.game && PH.game.canvas?.parentNode; if (div) div.style.display = si ? '' : 'none'; if (PH.suelo) PH.suelo.style.display = si ? '' : 'none';
  return si;
}
// a sprite drawn by the game's own code: a little canvas of its own (box: [left, top, right, bottom] around `at`)
// how often each kind of live sprite is drawn again (seconds; between times it only moves): copying a canvas to the
// graphics card is what costs, so animals and carts 12 times a second, a person talking 20, what lies on the ground 4
const VIVO_CADA = [[/^(p:|f:|ana$)/, 1 / 20], [/^(fauna|vaca|carro|calesa|buggy|carreta|toby|p:.*:carro)/, 1 / 12], [/^(suelo|heno|lena|destino|cama)/, 1 / 4], [/^(lleva|mesa|obju|objf|taza|obs)/, 1 / 15]];
function phVivo(key, at, box, depth, draw, cada){
  if (cada === undefined) { cada = 0; for (const [re, c] of VIVO_CADA) if (re.test(key)) { cada = c; break; } }
  const sc = PH.scene, R = key === 'fondo' || key.startsWith('mueble:') ? PH.R : Math.min(PH.R, 2), w = Math.max(1, Math.ceil((box[2] - box[0]) * R)), h = Math.max(1, Math.ceil((box[3] - box[1]) * R));
  let V = PH.vivos.get(key); const now = performance.now();
  if (V && (V.w !== w || V.h !== h)) { V.img.destroy(); sc.textures.remove(V.tk); PH.vivos.delete(key); V = null; }
  if (!V) { const tk = 'v' + (PH.seq = (PH.seq || 0) + 1); const tex = sc.textures.createCanvas(tk, w, h); V = { tk, tex, w, h, t: -1e9, img: sc.add.image(0, 0, tk).setOrigin(0) }; PH.vivos.set(key, V); }
  if (now - V.t >= cada * 1000 || !V.img.visible) {
    V.t = now;
    const c = V.tex.getContext(); c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, w, h);
    c.globalAlpha = 1; c.globalCompositeOperation = 'source-over'; c.setTransform(R, 0, 0, R, -(at[0] + box[0]) * R, -(at[1] + box[1]) * R);
    const pant = g; g = c; try { draw(c); } finally { g = pant; }
    V.tex.refresh(); if (PH.subidas) { const k = key.replace(/[:\d].*$/, ''); PH.subidas[k] = (PH.subidas[k] || 0) + w * h; }   // (PH.subidas: what is copied to the card, for the tests)
  }
  V.img.setPosition(at[0] + box[0], at[1] + box[1]).setScale(1 / R).setDepth(depth).setVisible(true); V.usado = PH.cuadro;
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
/* ---------- Avonlea outdoors (step 3): the trees, the houses, the fences... baked once ----------
   Each one is drawn once by its own code (again if it changes: the season, the night, the apples on the tree), in a box
   measured the first time. The trees sway as always, turning a little on their trunk; the smoke of the chimneys is
   Phaser's particles. */
const FIJO_BOX = [-300, -440, 300, 90];   // (where to look for it the first time: the biggest house, the tallest tree)
const phFijoFuera = F => { F.img?.destroy(); if (F.tk) PH.scene.textures.remove(F.tk); for (const e of F.humo || []) e.destroy(); };
const phCampos = o => { let s = ''; for (const k in o) { const v = o[k]; if (v === null || typeof v !== 'object' && typeof v !== 'function') s += k + ':' + v + ';'; } return s; };   // (what it is made of: its own plain values)
function phFijo(o, depth, v){
  const sc = PH.scene, Rf = Math.min(PH.R, 2.5), noche = Math.round(v.night * 10);
  const sig = S + '|' + noche + '|' + Rf + '|' + phCampos(o) + (o.kind === 'pump' ? '|' + game.hasCan + game.ground.some(it => it.k === 'can') : '');
  let F = PH.fijos.get(o);
  if (!F) { F = {}; PH.fijos.set(o, F); }
  const arbol = /^(tree|oak|pine|apple|blossom|manzano)$/.test(o.kind);
  if (F.sig !== sig) {
    if (!F.box) {   // (measured once: drawn on a big canvas, the box is where it painted)
      const B = FIJO_BOX, cv0 = document.createElement('canvas'); cv0.width = B[2] - B[0]; cv0.height = B[3] - B[1]; const c = cv0.getContext('2d'); c.setTransform(1, 0, 0, 1, -(o.x + B[0]), -(o.y + B[1]));
      const pant = g; g = c; PH_HUMOS = []; try { drawProp(c, o, arbol ? -o.ph / .9 : v.t, v.night); } finally { g = pant; PH_HUMOS = null; }
      const d = c.getImageData(0, 0, cv0.width, cv0.height).data; let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
      for (let y = 0; y < cv0.height; y++) for (let x = 0; x < cv0.width; x++) if (d[(y * cv0.width + x) * 4 + 3]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
      F.box = x1 < 0 ? [0, 0, 1, 1] : [B[0] + x0 - 8, B[1] + y0 - 10, B[0] + x1 + 8, B[1] + y1 + 6];
    }
    const b = F.box, w = Math.max(1, Math.ceil((b[2] - b[0]) * Rf)), h = Math.max(1, Math.ceil((b[3] - b[1]) * Rf));
    if (!F.tk || F.w !== w || F.h !== h) { phFijoFuera(F); F.tk = 'o' + (PH.seq = (PH.seq || 0) + 1); F.tex = sc.textures.createCanvas(F.tk, w, h); F.w = w; F.h = h; F.img = sc.add.image(0, 0, F.tk); F.humo = null; }
    const c = F.tex.getContext(); c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, w, h); c.setTransform(Rf, 0, 0, Rf, -(o.x + b[0]) * Rf, -(o.y + b[1]) * Rf);
    const humos = []; const pant = g; g = c; PH_HUMOS = humos; try { drawProp(c, o, arbol ? -o.ph / .9 : v.t, v.night); } finally { g = pant; PH_HUMOS = null; }
    F.tex.refresh(); F.sig = sig; if (PH.subidas) PH.subidas.fijo = (PH.subidas.fijo || 0) + w * h;
    for (const e of F.humo || []) e.destroy();
    F.humo = humos.map(([x, y, sm, nk]) => sc.add.particles(x, y, phTexHumo(), { lifespan: 4500, frequency: 4500 / nk, speedX: { min: 2, max: 8 }, speedY: { min: -18, max: -13 }, scale: { start: .35, end: 1.1 }, alpha: { start: sm, end: 0 }, rotate: { min: 0, max: 360 } }).setDepth(depth + .5));
    F.img.setOrigin(-b[0] / (b[2] - b[0]), -b[1] / (b[3] - b[1])).setScale(1 / Rf);   // (its origin at its foot: a tree turns on its trunk)
  }
  F.img.setPosition(o.x, o.y).setDepth(depth).setVisible(true).setRotation(arbol ? Math.sin(v.t * .9 + o.ph) * 1.6 * o.s / (110 * o.s) : 0);
  for (const e of F.humo || []) e.setVisible(true);
  F.usado = PH.cuadro;
}
// a soft puff of smoke, made once
function phTexHumo(){
  if (!PH.scene.textures.exists('humo')) { const c = document.createElement('canvas'); c.width = c.height = 32; const x = c.getContext('2d'), gr = x.createRadialGradient(16, 16, 2, 16, 16, 15); gr.addColorStop(0, 'rgba(245,245,240,1)'); gr.addColorStop(1, 'rgba(245,245,240,0)'); x.fillStyle = gr; x.fillRect(0, 0, 32, 32); PH.scene.textures.addCanvas('humo', c); }
  return 'humo';
}
// the little lives of a room that its baked image cannot have: the fire in the stove flickers
function phEfectos(v){
  let F = PH.fuego;
  if (game.scene !== 'gg') { F?.setVisible(false); return; }
  if (!F || !F.scene) F = PH.fuego = PH.scene.add.rectangle(STOVE.x, STOVE.y - 15, 20, 14, 0xff8c3c, .9);
  F.setFillStyle(Phaser.Display.Color.GetColor(255, Math.round(130 + 50 * Math.sin(v.t * 6)), 60), .9).setDepth(-1e8).setVisible(true);
}
// one frame of the world under Phaser: the camera where the game's view is, the room, and each thing of the list
function phMundo(list, v){
  const sc = PH.scene, dpr = v.dpr, cw = Math.round(v.W * dpr), ch = Math.round(v.H * dpr);
  if (PH.game.scale.width !== cw || PH.game.scale.height !== ch) PH.game.scale.resize(cw, ch);
  const R = Math.min(4, Math.max(1, Math.round(v.Z * dpr * 4) / 4));
  if (R !== PH.R) { PH.R = R; phRepintar(); }   // (another size of screen: everything again, sharp)
  PH.cuadro = (PH.cuadro || 0) + 1;
  const cam = sc.cameras.main; cam.setZoom(v.Z * dpr); cam.centerOn(v.ox + v.W / v.Z / 2, v.oy + v.H / v.Z / 2);
  if (game.scene !== 'out') phSala(v);
  const vw = v.W / v.Z, vh = v.H / v.Z;   // (anything not told where it is: drawn over the whole view, and noted to be told)
  list.forEach((o, i) => {
    const d = o.y + i * 1e-6, p = o.ph || (((PH.sueltos ??= new Set()).add(o.draw.toString().slice(0, 60))), { key: 'suelto:' + i, at: [v.ox, v.oy], box: [0, 0, vw, vh] });
    if (p.fijo) return phFijo(p.fijo, d, v);
    if (!(p.persona && !PH.sinHojas && phHoja(p.persona, p.key, d, v.t))) phVivo(p.key, p.at, p.box, d, o.draw);
  });
  for (const [o, F] of PH.fijos) if (F.usado !== PH.cuadro) { if (PH.cuadro - (F.usado || 0) > 900) { phFijoFuera(F); PH.fijos.delete(o); } else { F.img?.setVisible(false); for (const e of F.humo || []) e.setVisible(false); } }   // (out of sight; long out of sight: its memory back)
  for (const [k, C] of PH.caras) if (C.usado !== PH.cuadro) C.img.setVisible(false);   // (drawn live this frame, or gone)
  phEfectos(v);
  for (const [k, V] of PH.vivos) if (V.usado !== PH.cuadro) {
    if (k.startsWith('mueble:') || k === 'fondo') { V.img.destroy(); sc.textures.remove(V.tk); PH.vivos.delete(k); }   // (another room's)
    else if (PH.cuadro - V.usado > 600) { V.img.destroy(); sc.textures.remove(V.tk); PH.vivos.delete(k); }   // (not seen for a while: its memory back)
    else V.img.setVisible(false);
  }
  const now = performance.now(); PH.game.step(now, Math.min(50, now - (PH.t0 || now)) || 16); PH.t0 = now;
}
