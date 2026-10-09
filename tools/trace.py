#!/usr/bin/env python3
"""Calca una hoja de personaje (imagen de colores planos, fondo blanco, 5 vistas x 2 filas) a trazados para el juego.

  python3 tools/trace.py hoja.png ana [--k 24] [--eps 0.8] [--height 46]

Pasos: separa las 10 figuras; reduce los colores a los planos de la imagen (los de borde, mezclas del antialias, van al
plano más cercano); limpia motas; calca el contorno de cada zona de color (con sus agujeros) y lo simplifica dentro de
--eps píxeles; normaliza cada figura (pies abajo al centro = 0,0; alto = --height unidades del juego). Escribe
sprites/vec/<nombre>.json y regenera el bloque VEC de index.html."""
import sys, json, argparse, re
import numpy as np, cv2
from PIL import Image

ap = argparse.ArgumentParser(); ap.add_argument('img'); ap.add_argument('name'); ap.add_argument('--k', type=int, default=24)
ap.add_argument('--eps', type=float, default=.8); ap.add_argument('--height', type=float, default=46); ap.add_argument('--minarea', type=float, default=5)
ap.add_argument('--pal', help='colores planos, separados por coma (#rrggbb); el primero es la línea. Sin esto, se adivinan')
a = ap.parse_args()
im = np.array(Image.open(a.img).convert('RGB')); H, W = im.shape[:2]
dist_white = np.sqrt(((255 - im.astype(np.int32)) ** 2).sum(2)); fg0 = dist_white > 40
# the figure is everything not reached from the border through white (so a white collar or the white of the eyes is in)
out = np.zeros((H + 2, W + 2), np.uint8); ff = (~fg0).astype(np.uint8)
cv2.floodFill(ff, out, (0, 0), 2); fg = ff != 2

# 1. the figures (two rows of five)
blob = cv2.morphologyEx(fg.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
n, lab, st, _ = cv2.connectedComponentsWithStats(blob)
figs = sorted([st[i] for i in range(1, n) if st[i][4] > 0.002 * H * W], key=lambda s: (s[1] // (H // 4), s[0]))
assert len(figs) == 10, f'esperaba 10 figuras, hay {len(figs)}'

# 2. flat colours: k-means, then keep the clusters that fill areas (their pixels have neighbours of the same cluster);
#    the others are antialias blends and go to the nearest flat colour
fg_in = fg
px = im[fg_in].astype(np.float32)
_, kl, cen = cv2.kmeans(px, a.k, None, (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 60, .3), 3, cv2.KMEANS_PP_CENTERS)
L = np.full((H, W), -1, np.int32); L[fg_in] = kl.ravel()
inner = np.zeros(a.k)
for c in range(a.k):
    m = (L == c).astype(np.uint8); er = cv2.erode(m, np.ones((3, 3), np.uint8)); inner[c] = er.sum() / max(1, m.sum())
cnt = np.bincount(kl.ravel(), minlength=a.k)
flat = [c for c in range(a.k) if inner[c] > .25 and cnt[c] > 40]
pal = cen[flat]
if a.pal: pal = np.array([[int(h[i:i + 2], 16) for i in (1, 3, 5)] for h in a.pal.split(',')], np.float32); flat = list(range(len(pal)))
# each pixel to the flat colour it is a mix of with the white of the paper (the antialias at the edge: c·α + white·(1−α))
wht = np.array([255, 255, 255], np.float32); seg = pal - wht                                     # (from white to the colour)
tt = np.clip(((px[:, None, :] - wht) * seg[None]).sum(2) / np.maximum(1, (seg ** 2).sum(1))[None], .45, 1)
d = ((px[:, None, :] - (wht + tt[..., None] * seg[None])) ** 2).sum(2); near = d.argmin(1)
Q = np.full((H, W), -1, np.int32); Q[fg_in] = near
# a little clean-up: the most common colour around each pixel (twice)
for _ in range(2):
    votes = np.stack([cv2.blur((Q == c).astype(np.float32), (3, 3)) for c in range(len(flat))])
    best = votes.argmax(0); Q = np.where(fg_in, best, -1)
cols = ['#%02x%02x%02x' % tuple(int(v) for v in p) for p in pal]
# the line colour: the darkest
dark = 0 if a.pal else int(np.argmin([p.sum() for p in pal]))

def path_of(mask, ox, oy, k):
    cs, hier = cv2.findContours(mask.astype(np.uint8), cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
    out = []
    for c in cs:
        if abs(cv2.contourArea(c)) < a.minarea: continue
        c = cv2.approxPolyDP(c, a.eps, True).reshape(-1, 2)
        if len(c) < 3: continue
        P = [((x - ox) * k * 10, (y - oy) * k * 10) for x, y in c]
        # smooth: from the middle of each side to the next, curving at the corner (quadratic curves)
        mid = [((P[i][0] + P[(i + 1) % len(P)][0]) / 2, (P[i][1] + P[(i + 1) % len(P)][1]) / 2) for i in range(len(P))]
        r = lambda v: int(round(v))
        cx, cy = r(mid[-1][0]), r(mid[-1][1]); seg = ['M%d %d' % (cx, cy)]
        for i in range(len(P)):
            qx, qy, ex, ey = r(P[i][0]), r(P[i][1]), r(mid[i][0]), r(mid[i][1])
            seg.append('q%d %d %d %d' % (qx - cx, qy - cy, ex - cx, ey - cy)); cx, cy = ex, ey
        out.append(''.join(seg) + 'z')
    return ''.join(out)

views = ['frente', 'tq_frente', 'perfil', 'tq_espalda', 'espalda']
data = {'pal': cols, 'line': cols[dark], 'h': a.height, 'sw': 0, 'stand': {}, 'step': {}, 'src': {'w': W, 'h': H, 'figs': []}}
for i, (x, y, w, h, _) in enumerate(figs):
    row = 'stand' if i < 5 else 'step'; v = views[i % 5]
    sub = Q[y:y + h, x:x + w]; m = fg[y:y + h, x:x + w]
    ys, xs = np.nonzero(m); bottom = ys.max(); feet = xs[ys > bottom - h * .08]; ox = (feet.min() + feet.max()) / 2; oy = bottom
    k = a.height / h
    layers = [{'c': -1, 'd': path_of(m, ox, oy, k)}]   # (the silhouette underneath, in the line colour: where two zones do not quite meet, a fine line)
    zs = []
    for c in range(len(flat)):
        mm = sub == c
        if mm.sum() < a.minarea: continue
        p = path_of(mm, ox, oy, k)
        if p: zs.append((mm.sum(), {'c': c, 'd': p}))
    layers += [z for _, z in sorted(zs, key=lambda z: -z[0])]   # (big zones first, the small ones over them)
    data[row][v] = layers; data['sw'] = max(data['sw'], round(1.3 * k * 10, 2))   # (each zone also stroked in its colour, this wide: no seams)
    data['src']['figs'].append([row, v, float(x + ox), float(y + oy), float(k)])   # (where it was in the sheet: to measure the error)
out = f'sprites/vec/{a.name}.json'
import os; os.makedirs('sprites/vec', exist_ok=True); json.dump(data, open(out, 'w'), separators=(',', ':'))
print('paleta', cols, 'línea', cols[dark]); print(out, os.path.getsize(out), 'bytes')

# the VEC block in index.html (all the traced characters there are)
import glob
allv = {os.path.basename(f)[:-5]: json.load(open(f)) for f in sorted(glob.glob('sprites/vec/*.json'))}
src = open('index.html').read()
block = '/* VEC:BEGIN (generado por tools/trace.py; no editar a mano) */\nconst VEC = ' + json.dumps(allv, separators=(',', ':')) + ';\n/* VEC:END */'
if '/* VEC:BEGIN' in src: src = re.sub(r'/\* VEC:BEGIN.*?/\* VEC:END \*/', lambda _: block, src, flags=re.S)
else: raise SystemExit('falta el marcador VEC:BEGIN en index.html')
open('index.html', 'w').write(src)
