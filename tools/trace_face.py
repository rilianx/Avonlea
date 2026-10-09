#!/usr/bin/env python3
"""Calca una hoja de ROSTRO (piezas para armar caras) y la monta sobre el títere de partes de un personaje.

  python3 tools/trace_face.py sprites/gpt_ana_rostro.webp sprites/gpt_ana_partes.webp ana --pal '...'

La hoja de rostro (fondo blanco), por filas:
  1: la cabeza sin pelo ni rasgos en 5 vistas (frente, 3/4 frente, perfil, 3/4 espalda, espalda)
  2: los ojos en 5 estados (abiertos, cerrados, alegres, tristes, sorprendidos), cada uno: izquierdo, derecho, de perfil
  3: las cejas en 3 estados (normales, alzadas, tristes), cada una: izquierda, derecha, de perfil; la nariz de frente y de perfil
  4: la boca en 6 estados (sonrisa, neutra, hablando, muy abierta, triste, sorprendida), cada una: de frente, de perfil
  5: el pelo en 5 vistas, cada una: capa de atrás (detrás de la cabeza), capa de adelante (el flequillo)
Las posiciones salen de la hoja de partes (donde están los ojos, la cabeza y el pelo en cada vista). Todo se lleva a las
coordenadas del cuerpo (unidades ×10, pies en 0,0) y se agrega como "face" (y el tronco sin cabeza, "body") al calco
de partes sprites/vec/<nombre>_partes.json; luego se regenera el bloque RIG de index.html."""
import argparse, json, os, re, glob
import numpy as np, cv2
from PIL import Image

ap = argparse.ArgumentParser(); ap.add_argument('kit'); ap.add_argument('body'); ap.add_argument('name'); ap.add_argument('--pal', required=True)
ap.add_argument('--eps', type=float, default=1.2); ap.add_argument('--height', type=float, default=46); ap.add_argument('--minarea', type=float, default=3)
ap.add_argument('--skin', default='3,4'); ap.add_argument('--hair', default='1,2'); ap.add_argument('--dress', default='5,6')
ap.add_argument('--fs', type=float, default=1.0, help='escala extra de los rasgos (ojos, cejas, nariz, boca)')
a = ap.parse_args()
SKIN, HAIR, DRESS = ([int(i) for i in s.split(',')] for s in (a.skin, a.hair, a.dress))
pal = np.array([[int(h[i:i + 2], 16) for i in (1, 3, 5)] for h in a.pal.split(',')], np.float32)

def load(path):   # the image, its figure mask (white collars and the white of the eyes in), and each pixel's flat colour
    im = np.array(Image.open(path).convert('RGB')); H, W = im.shape[:2]
    fg0 = np.sqrt(((255 - im.astype(np.int32)) ** 2).sum(2)) > 40
    ff = (~fg0).astype(np.uint8); cv2.floodFill(ff, np.zeros((H + 2, W + 2), np.uint8), (0, 0), 2); fg = ff != 2
    px = im[fg].astype(np.float32); wht = np.full(3, 255, np.float32); seg = pal - wht
    tt = np.clip(((px[:, None, :] - wht) * seg[None]).sum(2) / np.maximum(1, (seg ** 2).sum(1))[None], .45, 1)
    Q = np.full((H, W), -1, np.int32); Q[fg] = ((px[:, None, :] - (wht + tt[..., None] * seg[None])) ** 2).sum(2).argmin(1)
    for _ in range(2):
        votes = np.stack([cv2.blur((Q == c).astype(np.float32), (3, 3)) for c in range(len(pal))]); Q = np.where(fg, votes.argmax(0), -1)
    return im, fg, Q

def polys(mask, f):   # contours of a mask, simplified, each point through f (pixel → body units ×10)
    cs, _ = cv2.findContours(mask.astype(np.uint8), cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE); out = []
    for c in cs:
        if abs(cv2.contourArea(c)) < a.minarea: continue
        c = cv2.approxPolyDP(c, a.eps, True).reshape(-1, 2)
        if len(c) >= 3: out.append([int(round(v)) for x, y in c for v in f(x, y)])
    return out
def layers(Q, m, f):
    L = [{'c': -1, 'p': polys(m, f)}]; zs = []
    for c in range(len(pal)):
        mm = (Q == c) & m
        if mm.sum() >= a.minarea:
            p = polys(mm, f)
            if p: zs.append((mm.sum(), {'c': c, 'p': p}))
    return L + [z for _, z in sorted(zs, key=lambda z: -z[0])]

def bands(fg, gap=12):   # rows of pieces, then the pieces in each (by x gaps)
    ys = np.nonzero(fg.any(1))[0]; out = []; s = p = ys[0]
    for y in ys[1:]:
        if y - p > gap: out.append((s, p)); s = y
        p = y
    out.append((s, p)); return out
def pieces(fg, y0, y1, gap=14):
    xs = np.nonzero(fg[y0:y1 + 1].any(0))[0]; out = []; s = p = xs[0]
    for x in xs[1:]:
        if x - p > gap: out.append((s, p)); s = x
        p = x
    out.append((s, p)); return [(x0, y0, x1, y1) for x0, x1 in out]
def tight(fg, b):
    x0, y0, x1, y1 = b; ys, xs = np.nonzero(fg[y0:y1 + 1, x0:x1 + 1]); return (x0 + xs.min(), y0 + ys.min(), x0 + xs.max(), y0 + ys.max())

# --- the body sheet: per view, where the head, the hair, the eyes are; the body's feet (origin) and scale
bim, bfg, bQ = load(a.body)
blob = cv2.morphologyEx(bfg.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
n, lab, st, _ = cv2.connectedComponentsWithStats(blob)
bodies = sorted([st[i] for i in range(1, n) if st[i][4] > 1500], key=lambda s: (s[1] // (bim.shape[0] // 6), s[0]))[:5]
k = a.height / np.mean([b[3] for b in bodies])
views = ['frente', 'tq_frente', 'perfil', 'tq_espalda', 'espalda']
REF = {}
for vi, (x, y, w, h, _) in enumerate(bodies):
    m = bfg[y:y + h, x:x + w]; Q = bQ[y:y + h, x:x + w]; ys, xs = np.nonzero(m); bottom = ys.max(); feet = xs[ys > bottom - h * .08]
    ox, oy = x + (feet.min() + feet.max()) / 2, y + bottom
    dress = np.isin(Q, DRESS) & m; top = (dress.sum(1) > 12).nonzero()[0].min()   # (the collar line)
    skin = np.isin(Q, SKIN) & m; skin[top:] = False; hair = np.isin(Q, HAIR) & m; hair[top:] = False
    sy, sx = np.nonzero(skin); hy, hx = np.nonzero(hair)
    widths = np.array([(np.ptp(skin[r].nonzero()[0]) if skin[r].any() else 0) for r in range(top)])
    sub = bim[y:y + top, x:x + w].astype(np.int32); r_, g_, b_ = sub[..., 0], sub[..., 1], sub[..., 2]
    eye = (b_ > r_ + 25) & (b_ > 110) & (b_ < 220); ne, le, se, ce = cv2.connectedComponentsWithStats(eye.astype(np.uint8))
    eyes = sorted([(x + ce[j][0], y + ce[j][1]) for j in range(1, ne) if se[j][4] > 15])
    REF[views[vi]] = dict(ox=ox, oy=oy, top=y + top, skin=(x + sx.min(), y + sy.min(), x + sx.max(), y + sy.max()), wide=widths.max(),
                          hair=(x + hx.min(), y + hy.min(), x + hx.max(), y + hy.max()), eyes=eyes, box=(x, y, w, h))
B = lambda v: (lambda px, py: ((px - REF[v]['ox']) * k * 10, (py - REF[v]['oy']) * k * 10))   # (body pixel → units ×10)

# --- the kit sheet
kim, kfg, kQ = load(a.kit)
rows = bands(kfg); assert len(rows) == 5, f'esperaba 5 filas en la hoja de rostro, hay {len(rows)}'
heads = pieces(kfg, *rows[0]); eyes = pieces(kfg, *rows[1]); browsnose = pieces(kfg, *rows[2]); mouths = pieces(kfg, *rows[3]); hairs = pieces(kfg, *rows[4])
assert (len(heads), len(eyes), len(browsnose), len(mouths), len(hairs)) == (5, 15, 11, 12, 5), (len(heads), len(eyes), len(browsnose), len(mouths), len(hairs))
EYES = ['abiertos', 'cerrados', 'alegres', 'tristes', 'sorprendidos']; BROWS = ['normales', 'alzadas', 'tristes']
MOUTHS = ['sonrisa', 'neutra', 'hablando', 'abierta', 'triste', 'sorprendida']

# the scale of the kit against the body: the width of the head at the ears (front view)
def head_info(b):
    x0, y0, x1, y1 = tight(kfg, b); m = kfg[y0:y1 + 1, x0:x1 + 1]
    widths = np.array([np.ptp(m[r].nonzero()[0]) if m[r].any() else 0 for r in range(m.shape[0])])
    wide = widths.max(); chin = y0 + max(r for r in range(len(widths)) if widths[r] > wide * .55)   # (below: the neck)
    return dict(x0=x0, y0=y0, x1=x1, y1=y1, wide=wide, cx=(x0 + x1) / 2, chin=chin)
H0 = head_info(heads[0]); s = REF['frente']['wide'] / H0['wide']   # (kit pixels → body pixels)
print('escala del kit', round(s, 3))

def place(v, b, ax, ay, bx, by, sc=s, keep=None):   # a kit piece, its point (ax, ay) put on the body pixel (bx, by)
    x0, y0, x1, y1 = b; m = kfg[y0:y1 + 1, x0:x1 + 1].copy(); Q = kQ[y0:y1 + 1, x0:x1 + 1]
    if keep is not None: m &= keep(np.arange(y0, y1 + 1)[:, None], np.arange(x0, x1 + 1)[None, :])
    f0 = B(v)
    return layers(Q, m, lambda px, py: f0(bx + (x0 + px - ax) * sc, by + (y0 + py - ay) * sc))

def anchor_eye(b):   # the middle of an eye piece: of its darkest part (lashes, pupil, lid), not of the brow or the blush marks
    x0, y0, x1, y1 = tight(kfg, b); sub = kim[y0:y1 + 1, x0:x1 + 1].astype(np.int32); dark = sub.sum(2) < 260
    blue = (sub[..., 2] > sub[..., 0] + 25) & (sub[..., 2] > 110)
    m = blue if blue.sum() > 20 else dark
    ys, xs = np.nonzero(m); return x0 + xs.mean(), y0 + ys.mean(), (x0, y0, x1, y1)
def center(b):
    x0, y0, x1, y1 = tight(kfg, b); return (x0 + x1) / 2, (y0 + y1) / 2, (x0, y0, x1, y1)

def iris_w(sub):   # (the widest blue blob: an iris)
    r_, g_, b_ = sub[..., 0].astype(int), sub[..., 1].astype(int), sub[..., 2].astype(int); m = (b_ > r_ + 25) & (b_ > 110) & (b_ < 230)
    n_, l_, st_, _ = cv2.connectedComponentsWithStats(m.astype(np.uint8)); return max(st_[j][2] for j in range(1, n_)) if n_ > 1 else 1
bx_, by_, bw_, bh_ = REF['frente']['box']; body_iris = iris_w(bim[by_:by_ + int(bh_ * .4), bx_:bx_ + bw_])
x0_, y0_, x1_, y1_ = tight(kfg, eyes[0]); kit_iris = iris_w(kim[y0_:y1_ + 1, x0_:x1_ + 1])
fs = body_iris / kit_iris * a.fs; print('escala de los rasgos', round(fs, 3), '(iris', body_iris, 'vs', kit_iris, ')')   # (the features: their own scale too)
face = {}
for vi, v in enumerate(views):
    R = REF[v]; hi = head_info(heads[vi]); F = {}
    # the head: its widest row and middle on those of the body's head
    hx = (R['hair'][0] + R['hair'][2]) / 2 if v in ('frente', 'espalda') else (R['skin'][0] + R['skin'][2]) / 2
    F['head'] = place(v, (hi['x0'], hi['y0'], hi['x1'], hi['y1']), hi['cx'], hi['chin'], hx, R['top'] - 4)
    # the hair: the back layer (without the braids it was drawn with: cut at the collar) and the fringe; both on the body's hair
    x0, y0, x1, y1 = hairs[vi]; cols_ = np.nonzero(kfg[y0:y1 + 1, x0:x1 + 1].any(0))[0]
    gaps = np.nonzero(np.diff(cols_) > 1)[0]; split = x0 + cols_[gaps[0]] + 1 if len(gaps) else (x0 + x1) // 2
    back, front = tight(kfg, (x0, y0, split, y1)), tight(kfg, (split, y0, x1, y1))
    bx0, by0, bx1, by1 = R['hair']; sh = (bx1 - bx0) / (back[2] - back[0])   # (the kit's hair is drawn smaller than its heads: as wide as the body's)
    cutY = back[1] + (R['top'] - 6 - by0) / sh   # (the collar, in the kit piece: the braids drawn with it go; ours hang there)
    F['hairB'] = place(v, back, (back[0] + back[2]) / 2, back[1], (bx0 + bx1) / 2, by0, sh, keep=lambda yy, xx: yy < cutY)
    if v in ('frente', 'espalda'): F['hairF'] = place(v, front, (front[0] + front[2]) / 2, front[1], (bx0 + bx1) / 2, by0, sh)
    else: F['hairF'] = place(v, front, front[2], front[1], bx1, by0, sh)   # (turned: the fringe at the side it looks to)
    # the features, where the body's are
    if v in ('frente', 'tq_frente', 'perfil'):
        ex = [e for e in R['eyes']]; ey = np.mean([e[1] for e in ex]) if ex else None
        F['eyes'] = {}; F['brows'] = {}; F['mouth'] = {}
        for si, st_ in enumerate(EYES):
            trio = eyes[si * 3: si * 3 + 3]
            if v == 'perfil': ax, ay, bb = anchor_eye(trio[2]); F['eyes'][st_] = [place(v, bb, ax, ay, ex[0][0], ex[0][1], fs)]
            else: F['eyes'][st_] = [place(v, anchor_eye(t)[2], *anchor_eye(t)[:2], e[0], e[1], fs * (.78 if (v == 'tq_frente' and j == 0) else 1)) for j, (t, e) in enumerate(zip(trio[:2], ex))]
        for si, st_ in enumerate(BROWS):
            trio = browsnose[si * 3: si * 3 + 3]; up = 27
            if v == 'perfil': ax, ay, bb = center(trio[2]); F['brows'][st_] = [place(v, bb, ax, ay, ex[0][0], ex[0][1] - up, fs)]
            else: F['brows'][st_] = [place(v, center(t)[2], *center(t)[:2], e[0], e[1] - up, fs) for t, e in zip(trio[:2], ex)]
        nose = browsnose[10 if v == 'perfil' else 9]; nx, ny, nb = center(nose)
        if v == 'frente': P = ((ex[0][0] + ex[1][0]) / 2, ey + 22)
        elif v == 'tq_frente': P = (ex[1][0] - 19, ey + 22)
        else: P = (ex[0][0] + 23, ey + 12)
        F['nose'] = place(v, nb, nx, ny, *P, fs)
        if v == 'frente': M = ((ex[0][0] + ex[1][0]) / 2, ey + 37)
        elif v == 'tq_frente': M = (ex[1][0] - 27, ey + 38)
        else: M = (ex[0][0] + 8, ey + 29)
        for si, st_ in enumerate(MOUTHS):
            mp = mouths[si * 2 + (1 if v == 'perfil' else 0)]; mx, my, mb = center(mp); F['mouth'][st_] = place(v, mb, mx, my, *M, fs)
    # the body without the head (cut a little above the collar: the collar covers the neck of the head)
    x, y, w, h = R['box']; m = bfg[y:y + h, x:x + w].copy(); m[:R['top'] - y - 2] = False
    F['body'] = layers(bQ[y:y + h, x:x + w], m, lambda px, py, v=v, x=x, y=y: B(v)(x + px, y + py))
    face[v] = F

f = f'sprites/vec/{a.name}_partes.json'; R_ = json.load(open(f)); R_['face'] = face; R_['pal'] = R_['pal'][:len(pal)] + ['#%02x%02x%02x' % tuple(int(v) for v in q) for q in pal[len(R_['pal']):]]   # (the colours the kit adds)
json.dump(R_, open(f, 'w'), separators=(',', ':'))
print(f, os.path.getsize(f), 'bytes')
allr = {os.path.basename(g)[:-12]: json.load(open(g)) for g in sorted(glob.glob('sprites/vec/*_partes.json'))}
src = open('index.html').read(); block = '/* RIG:BEGIN (generado por tools/trace_parts.py; no editar a mano) */\nconst RIG = ' + json.dumps(allr, separators=(',', ':')) + ';\n/* RIG:END */'
open('index.html', 'w').write(re.sub(r'/\* RIG:BEGIN.*?/\* RIG:END \*/', lambda _: block, src, flags=re.S))
