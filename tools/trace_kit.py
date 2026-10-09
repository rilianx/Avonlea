#!/usr/bin/env python3
"""Calca un personaje pedido en tres hojas (ver sprites/PROMPTS.md) y lo deja en index.html como títere de recortes.

  python3 tools/trace_kit.py ana --cuerpo sprites/gpt2_ana_cuerpo.webp --cabeza sprites/gpt2_ana_cabeza.webp \
      --poses sprites/gpt2_ana_poses.webp --pal '#línea,#c1,...'

  cuerpo: fila 1, el cuerpo sin cabeza en 5 vistas (frente, 3/4 frente, perfil, 3/4 espalda, espalda; con un cuello
          corto arriba); fila 2, el brazo recto de frente y de lado, el brazo doblado de frente y de lado
  cabeza: fila 1, la cabeza (cara y pelo, sin trenzas, con un cuello corto abajo) en las 5 vistas; fila 2, de frente con 4
          expresiones (contenta, triste, sorprendida, enojada); fila 3, una trenza recta y el sombrero en las 5 vistas
  poses:  fila 1 de frente y fila 2 de perfil: sentada, agachada, acostada, corriendo

Cuerpo y cabeza quedan cada uno en su propio sistema (el cuerpo con los pies en 0,0; la cabeza con el cuello en 0,0),
para poder combinar una cabeza con otro cuerpo. Escala: la cabeza encaja por el ancho del cuello; el total mide
--height unidades del juego. Unidades ×10. También se marcan los ojos y la boca de cada cabeza (para parpadear y hablar)
y los enganches (hombros, raíz de las trenzas, sombrero). Escribe sprites/vec/<nombre>_kit.json y el bloque KIT."""
import argparse, json, os, re, glob
import numpy as np, cv2
from PIL import Image

ap = argparse.ArgumentParser(); ap.add_argument('name'); ap.add_argument('--cuerpo', required=True); ap.add_argument('--cabeza', required=True)
ap.add_argument('--poses'); ap.add_argument('--pal', required=True); ap.add_argument('--eps', type=float, default=1.6)
ap.add_argument('--height', type=float, default=46); ap.add_argument('--minarea', type=float, default=5)
ap.add_argument('--skin', default='3,4'); ap.add_argument('--hair', default='1,2'); ap.add_argument('--dress', default='5,6')
a = ap.parse_args()
SKIN, HAIR, DRESS = ([int(i) for i in s.split(',')] for s in (a.skin, a.hair, a.dress))
pal = np.array([[int(h[i:i + 2], 16) for i in (1, 3, 5)] for h in a.pal.split(',')], np.float32)
VIEWS = ['frente', 'tq_frente', 'perfil', 'tq_espalda', 'espalda']

def load(path):   # image, figure mask (enclosed whites in), each pixel's flat colour (mixes with the paper undone)
    im = np.array(Image.open(path).convert('RGB')); H, W = im.shape[:2]
    fg0 = np.sqrt(((255 - im.astype(np.int32)) ** 2).sum(2)) > 40
    ff = (~fg0).astype(np.uint8); cv2.floodFill(ff, np.zeros((H + 2, W + 2), np.uint8), (0, 0), 2); fg = ff != 2
    px = im[fg].astype(np.float32); wht = np.full(3, 255, np.float32); seg = pal - wht
    tt = np.clip(((px[:, None, :] - wht) * seg[None]).sum(2) / np.maximum(1, (seg ** 2).sum(1))[None], .45, 1)
    Q = np.full((H, W), -1, np.int32); Q[fg] = ((px[:, None, :] - (wht + tt[..., None] * seg[None])) ** 2).sum(2).argmin(1)
    for _ in range(2):
        votes = np.stack([cv2.blur((Q == c).astype(np.float32), (3, 3)) for c in range(len(pal))]); Q = np.where(fg, votes.argmax(0), -1)
    return im, fg, Q
def find(fg, close=9, minarea=800):   # the pieces, in rows (top to bottom), each row left to right
    blob = cv2.morphologyEx(fg.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((close, close), np.uint8))
    n, lab, st, _ = cv2.connectedComponentsWithStats(blob)
    ps = [tuple(int(v) for v in st[i][:4]) for i in range(1, n) if st[i][4] > minarea]
    ps.sort(key=lambda s: s[1] + s[3] / 2); rows = []
    for s in ps:
        if rows and s[1] + s[3] / 2 - (rows[-1][-1][1] + rows[-1][-1][3] / 2) < 0.6 * max(s[3], rows[-1][-1][3]) and s[1] < rows[-1][-1][1] + rows[-1][-1][3]: rows[-1].append(s)
        else: rows.append([s])
    return [sorted(r, key=lambda s: s[0]) for r in rows]

def polys(mask, f):
    cs, _ = cv2.findContours(mask.astype(np.uint8), cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE); out = []
    for c in cs:
        if abs(cv2.contourArea(c)) < a.minarea: continue
        c = cv2.approxPolyDP(c, a.eps, True).reshape(-1, 2)
        if len(c) >= 3: out.append([int(round(v)) for x, y in c for v in f(x, y)])
    return out
def layers(Q, m, f):   # the silhouette in the line colour underneath, then the colour zones, big first
    L = [{'c': -1, 'p': polys(m, f)}]; zs = []
    for c in range(len(pal)):
        mm = (Q == c) & m
        if mm.sum() >= a.minarea:
            p = polys(mm, f)
            if p: zs.append((mm.sum(), {'c': c, 'p': p}))
    return L + [z for _, z in sorted(zs, key=lambda z: -z[0])]

# ---------- the body sheet
bim, bfg, bQ = load(a.cuerpo); rows = find(bfg); assert [len(r) for r in rows[:2]] == [5, 4], [len(r) for r in rows]
bodies, arms = rows[0], rows[1]
def neck_of(fg, Q, box, at_top):   # the neck: where the skin is at the top (body) or bottom (head), its middle and width
    x, y, w, h = box; m = fg[y:y + h, x:x + w] & np.isin(Q[y:y + h, x:x + w], SKIN)
    rr = np.nonzero(m.any(1))[0]; r0 = rr.min() + 4 if at_top else rr.max() - 4
    cols = np.nonzero(m[r0])[0]; return x + (cols.min() + cols.max()) / 2, y + (rr.min() if at_top else rr.max()), cols.max() - cols.min()
bn = [neck_of(bfg, bQ, b, True) for b in bodies]
# ---------- the head sheet
him, hfg, hQ = load(a.cabeza); hrows = find(hfg, close=5, minarea=600)
assert [len(r) for r in hrows[:3]] == [5, 4, 6], [len(r) for r in hrows]
heads, exprs, (braid, *hats) = hrows[0], hrows[1], hrows[2]
hn = [neck_of(hfg, hQ, b, False) for b in heads]
sH = bn[0][2] / hn[0][2]   # (head pixels → body pixels: the necks as wide)
# the height of it all: from the feet to the top of the head, in body pixels
bfeet = [b[1] + b[3] for b in bodies]; total = np.mean([bfeet[i] - bn[i][1] for i in range(5)]) + np.mean([(hn[i][1] - heads[i][1]) * sH for i in range(5)])
k = a.height / total * 10   # (body pixels → units ×10)
print('escala cabeza→cuerpo', round(sH, 3), ' alto total', round(total), 'px')
U = lambda v: round(float(v) * k, 1)

out = {'pal': ['#%02x%02x%02x' % tuple(int(v) for v in q) for q in pal], 'line': None, 'sw': round(1.3 * k, 2), 'body': {}, 'head': {}, 'arm': {}, 'hat': {}, 'expr': {}, 'pose': {}}
out['line'] = out['pal'][0]
# the body, per view: the trunk and the two feet (under the hem, each side); the neck; the shoulders
for vi, (x, y, w, h) in enumerate(bodies):
    m = bfg[y:y + h, x:x + w]; Q = bQ[y:y + h, x:x + w]; ys, xs = np.nonzero(m); bottom = ys.max(); feet = xs[ys > bottom - h * .08]
    ox, oy = x + (feet.min() + feet.max()) / 2, y + bottom; f = lambda px, py, x=x, y=y, ox=ox, oy=oy: ((x + px - ox) * k, (y + py - oy) * k)
    dress = np.isin(Q, DRESS) & m
    hem = np.full(w, dress.nonzero()[0].max())
    for cx in range(w):
        col = dress[:, cx].nonzero()[0]
        if len(col): hem[cx] = col.max()
    legs = m & (np.arange(h)[:, None] > hem[None, :] + 1); legs[:int(bottom - h * .3)] = False
    left = legs & (np.arange(w)[None, :] < ox - x); right = legs & ~left
    rows_ = (dress.sum(1) > 12).nonzero()[0]; top = rows_.min(); dh = rows_.max() - top; r = int(top + dh * .07)
    row = dress[r].nonzero()[0]; xl, xr = x + row.min(), x + row.max(); ry = y + r
    sh = {'frente': [[xl + 10, ry], [xr - 10, ry]], 'espalda': [[xl + 10, ry], [xr - 10, ry]], 'tq_frente': [[xl + 14, ry], [xr - 8, ry]],
          'tq_espalda': [[xl + 8, ry], [xr - 14, ry]], 'perfil': [[(xl + xr) / 2 - 8, ry], [(xl + xr) / 2 + 2, ry]]}[VIEWS[vi]]
    nx, ny, nw = bn[vi]
    out['body'][VIEWS[vi]] = {'torso': layers(Q, m & ~legs, f), 'footL': layers(Q, left, f), 'footR': layers(Q, right, f),
                              'neck': [U(nx - ox), U(ny - oy + 6)], 'sh': [[U(px - ox), U(py - oy)] for px, py in sh]}
for name_, (x, y, w, h) in zip(['recto_frente', 'recto_lado', 'doblado_frente', 'doblado_lado'], arms):   # (an arm hangs from the middle of its top)
    m = bfg[y:y + h, x:x + w]; ys, xs = np.nonzero(m); top = xs[ys < ys.min() + 8]; ox, oy = x + (top.min() + top.max()) / 2, y + ys.min() + 4
    out['arm'][name_] = {'l': layers(bQ[y:y + h, x:x + w], m, lambda px, py, x=x, y=y, ox=ox, oy=oy: ((x + px - ox) * k, (y + py - oy) * k)), 'len': U(ys.max() + y - oy)}
    if name_.startswith('doblado'):   # (where the fist is: the far end of the forearm)
        fx = xs.max(); fy = ys[xs > fx - 12].mean(); out['arm'][name_]['hand'] = [U(x + fx - 8 - ox), U(y + fy - oy)]

# the heads: with their neck at 0,0; eyes and mouth marked; where the braids start and the hat goes
def marks(im, x, y, w, h, nx, ny):
    sub = im[y:y + h, x:x + w].astype(np.int32); r_, g_, b_ = sub[..., 0], sub[..., 1], sub[..., 2]
    blue = (b_ > r_ + 25) & (b_ > 110) & (b_ < 230); dark = sub.sum(2) < 220; white = sub.min(2) > 232
    skin = (r_ > 225) & (g_ > 170) & (b_ > 120) & (r_ - b_ > 25) & ~white
    n_, l_, s_, c_ = cv2.connectedComponentsWithStats(blue.astype(np.uint8)); irises = sorted([tuple(c_[j]) for j in range(1, n_) if s_[j][4] > 25])
    E = lambda px, py: [U((x + px - nx) * sH), U((y + py - ny) * sH)]
    eyes = []
    for ex, ey in irises:
        x0, x1, y0, y1 = int(ex - 28), int(ex + 28), int(ey - 26), int(ey + 20)
        x0, y0 = max(0, x0), max(0, y0); win = (blue | dark | white & ~skin)[y0:y1, x0:x1]
        nw, lw, sw, cw = cv2.connectedComponentsWithStats(win.astype(np.uint8)); keep = np.zeros_like(win)
        for j in range(1, nw):
            if sw[j][4] > 6 and abs(cw[j][0] + x0 - ex) < 22 and abs(cw[j][1] + y0 - ey) < 18: keep |= lw == j
        yy, xx = np.nonzero(keep); bx0, bx1, by0, by1 = x0 + xx.min(), x0 + xx.max(), y0 + yy.min(), y0 + yy.max()
        eyes.append(E((bx0 + bx1) / 2, (by0 + by1) / 2) + [U((bx1 - bx0) / 2 * sH) + 3, U((by1 - by0) / 2 * sH) + 3])
    mouth = None
    if irises:
        ey = np.mean([e[1] for e in irises]); mx = np.mean([e[0] for e in irises]) + (10 if len(irises) == 1 else 0); eh = h
        x0, x1, y0, y1 = int(mx - 30), int(mx + 30), int(ey + h * .14), int(ey + h * .3)
        red = (r_ > 120) & (r_ - g_ > 50) & ~blue
        win = ((dark | red) & ~skin)[y0:y1, x0:x1]; nw, lw, sw, cw = cv2.connectedComponentsWithStats(win.astype(np.uint8))
        js = [j for j in range(1, nw) if sw[j][4] > 8]
        if js:
            j = max(js, key=lambda j: sw[j][2] * 3 - abs(cw[j][0] + x0 - mx)); yy, xx = np.nonzero(lw == j)
            bx0, bx1, by0, by1 = x0 + xx.min(), x0 + xx.max(), y0 + yy.min(), y0 + yy.max()
            mouth = E((bx0 + bx1) / 2, (by0 + by1) / 2) + [U((bx1 - bx0) / 2 * sH) + 2, U(max(by1 - by0, 4) / 2 * sH) + 2]
    return {'eyes': eyes, 'mouth': mouth}
for vi, (x, y, w, h) in enumerate(heads):
    nx, ny, _ = hn[vi]; m = hfg[y:y + h, x:x + w]; Q = hQ[y:y + h, x:x + w]
    f = lambda px, py, x=x, y=y, nx=nx, ny=ny: ((x + px - nx) * sH * k, (y + py - ny) * sH * k)
    hair = np.isin(Q, HAIR) & m; hy, hx = np.nonzero(hair); htop, hbot, hl, hr = hy.min(), hy.max(), hx.min(), hx.max(); bw = hr - hl; hb = hbot - (hbot - htop) * .12
    br = {'frente': [[hl + bw * .14, hb], [hr - bw * .14, hb]], 'espalda': [[hl + bw * .22, hb], [hr - bw * .22, hb]], 'tq_frente': [[hl + bw * .12, hb], [hr - bw * .18, hb]],
          'tq_espalda': [[hl + bw * .22, hb], [hr - bw * .3, hb]], 'perfil': [[hl + bw * .2, hb], [hl + bw * .2, hb]]}[VIEWS[vi]]
    H_ = {'l': layers(Q, m, f), 'br': [[U((x + px - nx) * sH), U((y + py - ny) * sH)] for px, py in br],
          'hat': [U((x + (hl + hr) / 2 - nx) * sH), U((y + htop + (hbot - htop) * .3 - ny) * sH)], 'w': U(bw * sH)}
    if VIEWS[vi] in ('frente', 'tq_frente', 'perfil'): H_['marks'] = marks(him, x, y, w, h, nx, ny)
    out['head'][VIEWS[vi]] = H_
for name_, (x, y, w, h) in zip(['contenta', 'triste', 'sorprendida', 'enojada'], exprs):
    nx, ny, _ = neck_of(hfg, hQ, (x, y, w, h), False)
    out['expr'][name_] = {'l': layers(hQ[y:y + h, x:x + w], hfg[y:y + h, x:x + w], lambda px, py, x=x, y=y, nx=nx, ny=ny: ((x + px - nx) * sH * k, (y + py - ny) * sH * k)),
                          'marks': marks(him, x, y, w, h, nx, ny)}
x, y, w, h = braid; m = hfg[y:y + h, x:x + w]; ys, xs = np.nonzero(m); ox, oy = x + (xs.min() + xs.max()) / 2, y + ys.min()
out['braid'] = {'l': layers(hQ[y:y + h, x:x + w], m, lambda px, py, x=x, y=y, ox=ox, oy=oy: ((x + px - ox) * sH * k, (y + py - oy) * sH * k)), 'len': U((ys.max() + y - oy) * sH)}
for v, (x, y, w, h) in zip(VIEWS, hats):   # (a hat: from the middle of its brim, a little above the bottom)
    m = hfg[y:y + h, x:x + w]; ys, xs = np.nonzero(m); ox, oy = x + (xs.min() + xs.max()) / 2, y + ys.max() - h * .25
    out['hat'][v] = {'l': layers(hQ[y:y + h, x:x + w], m, lambda px, py, x=x, y=y, ox=ox, oy=oy: ((x + px - ox) * sH * k, (y + py - oy) * sH * k)), 'w': U(np.ptp(xs) * sH)}

# ---------- the poses: whole figures, from the bottom middle; as big as the rest (their head as wide as the head's)
if a.poses:
    pim, pfg, pQ = load(a.poses); prows = find(pfg); assert [len(r) for r in prows[:2]] == [4, 4], [len(r) for r in prows]
    rx, ry_, rw, rh = prows[0][3]; sp = total * .97 / rh   # (all the poses at one scale: the one that makes her running upright as tall as standing)
    for ri, side in enumerate(['frente', 'perfil']):
        for name_, (x, y, w, h) in zip(['sentada', 'agachada', 'acostada', 'corriendo'], prows[ri]):
            m = pfg[y:y + h, x:x + w]; Q = pQ[y:y + h, x:x + w]
            ys, xs = np.nonzero(m); ox, oy = x + (xs.min() + xs.max()) / 2, y + ys.max()
            out['pose'].setdefault(name_, {})[side] = layers(Q, m, lambda px, py, x=x, y=y, ox=ox, oy=oy, sp=sp: ((x + px - ox) * sp * k, (y + py - oy) * sp * k))

os.makedirs('sprites/vec', exist_ok=True); fn = f'sprites/vec/{a.name}_kit.json'; json.dump(out, open(fn, 'w'), separators=(',', ':'))
print(fn, os.path.getsize(fn), 'bytes')
allk = {os.path.basename(g)[:-9]: json.load(open(g)) for g in sorted(glob.glob('sprites/vec/*_kit.json'))}
src = open('index.html').read(); block = '/* KIT:BEGIN (generado por tools/trace_kit.py; no editar a mano) */\nconst CKIT = ' + json.dumps(allk, separators=(',', ':')) + ';\n/* KIT:END */'
assert '/* KIT:BEGIN' in src, 'falta el marcador KIT:BEGIN en index.html'
open('index.html', 'w').write(re.sub(r'/\* KIT:BEGIN.*?/\* KIT:END \*/', lambda _: block, src, flags=re.S))
