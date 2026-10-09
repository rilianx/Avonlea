#!/usr/bin/env python3
"""Calca una hoja de PARTES de un personaje (para animarlo como títere de recortes) y la deja en index.html.

  python3 tools/trace_parts.py sprites/gpt_ana_partes.webp ana --pal '#línea,#c1,#c2,...' [--eps 2] [--height 46]

La hoja (fondo blanco, colores planos), en este orden de arriba abajo y de izquierda a derecha:
  fila 1: el cuerpo SIN trenzas ni brazos en 5 vistas (frente, 3/4 frente, perfil, 3/4 espalda, espalda; mirando a la derecha)
  fila 2: un brazo de frente y uno de lado
  fila 3: una trenza recta y vertical; el sombrero en las 5 vistas
Cada cuerpo se parte en tronco y dos pies (lo que queda bajo el ruedo del vestido, a cada lado), para el paso. Se calculan
los puntos de enganche: hombros, raíz de las trenzas, dónde va el sombrero. Todo en unidades del juego ×10, con los pies
del cuerpo en (0,0). Escribe sprites/vec/<nombre>_partes.json y el bloque RIG de index.html."""
import argparse, json, os, re, glob
import numpy as np, cv2
from PIL import Image

ap = argparse.ArgumentParser(); ap.add_argument('img'); ap.add_argument('name'); ap.add_argument('--pal', required=True)
ap.add_argument('--eps', type=float, default=2); ap.add_argument('--height', type=float, default=46); ap.add_argument('--minarea', type=float, default=5)
ap.add_argument('--hair', default='1,2', help='índices de la paleta que son pelo'); ap.add_argument('--dress', default='5,6', help='índices que son vestido')
a = ap.parse_args()
im = np.array(Image.open(a.img).convert('RGB')); H, W = im.shape[:2]
fg0 = np.sqrt(((255 - im.astype(np.int32)) ** 2).sum(2)) > 40
ff = (~fg0).astype(np.uint8); cv2.floodFill(ff, np.zeros((H + 2, W + 2), np.uint8), (0, 0), 2); fg = ff != 2
blob = cv2.morphologyEx(fg.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
n, lab, st, _ = cv2.connectedComponentsWithStats(blob)
parts = sorted([st[i] for i in range(1, n) if st[i][4] > 1500], key=lambda s: (s[1] // (H // 6), s[0]))
assert len(parts) == 13, f'esperaba 13 piezas (5 cuerpos, 2 brazos, trenza, 5 sombreros), hay {len(parts)}'
bodies, arms, braid, hats = parts[:5], parts[5:7], parts[7], parts[8:]

# colours: each pixel to the flat colour it is a mix of with the white; then each colour the mean of its zones
pal = np.array([[int(h[i:i + 2], 16) for i in (1, 3, 5)] for h in a.pal.split(',')], np.float32)
px = im[fg].astype(np.float32); wht = np.full(3, 255, np.float32); seg = pal - wht
tt = np.clip(((px[:, None, :] - wht) * seg[None]).sum(2) / np.maximum(1, (seg ** 2).sum(1))[None], .45, 1)
Q = np.full((H, W), -1, np.int32); Q[fg] = ((px[:, None, :] - (wht + tt[..., None] * seg[None])) ** 2).sum(2).argmin(1)
for _ in range(2):
    votes = np.stack([cv2.blur((Q == c).astype(np.float32), (3, 3)) for c in range(len(pal))]); Q = np.where(fg, votes.argmax(0), -1)
for c in range(1, len(pal)):
    core = cv2.erode((Q == c).astype(np.uint8), np.ones((3, 3), np.uint8)) > 0
    if core.sum() > 30: pal[c] = im[core].mean(0)
cols = ['#%02x%02x%02x' % tuple(int(v) for v in p) for p in pal]
HAIR = [int(i) for i in a.hair.split(',')]; DRESS = [int(i) for i in a.dress.split(',')]

k = a.height / np.mean([b[3] for b in bodies])   # (units per pixel: the bodies are a.height high; the rest at the same scale)
def polys(mask, ox, oy):
    cs, _ = cv2.findContours(mask.astype(np.uint8), cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE); out = []
    for c in cs:
        if abs(cv2.contourArea(c)) < a.minarea: continue
        c = cv2.approxPolyDP(c, a.eps, True).reshape(-1, 2)
        if len(c) >= 3: out.append([int(round(v)) for x, y in c for v in ((x - ox) * k * 10, (y - oy) * k * 10)])
    return out
def layers(sub, m, ox, oy):   # (the silhouette in the line colour underneath, then the zones, big first)
    L = [{'c': -1, 'p': polys(m, ox, oy)}]; zs = []
    for c in range(len(pal)):
        mm = (sub == c) & m
        if mm.sum() >= a.minarea:
            p = polys(mm, ox, oy)
            if p: zs.append((mm.sum(), {'c': c, 'p': p}))
    return L + [z for _, z in sorted(zs, key=lambda z: -z[0])]
U = lambda v: round(float(v) * k * 10, 1)

views = ['frente', 'tq_frente', 'perfil', 'tq_espalda', 'espalda']
out = {'pal': cols, 'line': cols[0], 'sw': round(1.3 * k * 10, 2), 'views': {}, 'arm': {}, 'hat': {}}
for vi, (x, y, w, h, _) in enumerate(bodies):
    sub = Q[y:y + h, x:x + w]; m = fg[y:y + h, x:x + w]
    ys, xs = np.nonzero(m); bottom = ys.max(); feet = xs[ys > bottom - h * .08]; ox = (feet.min() + feet.max()) / 2; oy = bottom
    dress = np.isin(sub, DRESS) & m; hair = np.isin(sub, HAIR) & m
    # the hem, column by column: below it, the legs and shoes; split at the middle into the two feet
    hem = np.full(w, dress.nonzero()[0].max() if dress.any() else bottom)
    for cx in range(w):
        col = dress[:, cx].nonzero()[0]
        if len(col): hem[cx] = col.max()
    legs = m & (np.arange(h)[:, None] > hem[None, :] + 1)
    legs[:int(bottom - h * .25)] = False
    left = legs & (np.arange(w)[None, :] < ox); right = legs & ~left
    torso = m & ~legs
    v = views[vi]; V = {'torso': layers(sub, torso, ox, oy), 'footL': layers(sub, left, ox, oy), 'footR': layers(sub, right, ox, oy)}
    # anchors: the shoulders (top of the dress, at its sides), the roots of the braids (low on the hair, at its sides), the hat (on the hair)
    rows = (dress.sum(1) > 12).nonzero()[0]; top = rows.min(); dh = rows.max() - top; r = int(top + dh * .1)   # (rows with some dress in them)
    row = dress[r].nonzero()[0]; xl, xr = row.min(), row.max()
    hair[top:] = False   # (the hair is above the dress: the shoes may share its colour)
    hy, hx = hair.nonzero(); htop, hbot, hl, hr = hy.min(), hy.max(), hx.min(), hx.max()
    sh = {'frente': [[xl + 6, r], [xr - 6, r]], 'espalda': [[xl + 6, r], [xr - 6, r]], 'tq_frente': [[xl + 10, r], [xr - 4, r]],
          'tq_espalda': [[xl + 4, r], [xr - 10, r]], 'perfil': [[(xl + xr) / 2 - 6, r], [(xl + xr) / 2 + 2, r]]}[v]
    hb = hbot - (hbot - htop) * .12; bw = hr - hl
    br = {'frente': [[hl + bw * .12, hb], [hr - bw * .12, hb]], 'espalda': [[hl + bw * .2, hb], [hr - bw * .2, hb]], 'tq_frente': [[hl + bw * .1, hb], [hr - bw * .15, hb]],
          'tq_espalda': [[hl + bw * .2, hb], [hr - bw * .3, hb]], 'perfil': [[hl + bw * .22, hb], [hl + bw * .22, hb]]}[v]
    V['sh'] = [[U(px_ - ox), U(py_ - oy)] for px_, py_ in sh]; V['br'] = [[U(px_ - ox), U(py_ - oy)] for px_, py_ in br]
    V['hat'] = [U((hl + hr) / 2 - ox), U(htop + (hbot - htop) * .36 - oy), U(bw)]   # (where the brim goes and how wide the hair is)
    out['views'][v] = V
for name, (x, y, w, h, _) in zip(['frente', 'lado'], arms):   # (an arm: hanging from its top middle)
    sub = Q[y:y + h, x:x + w]; m = fg[y:y + h, x:x + w]; ys, xs = np.nonzero(m); ox = (xs[ys < ys.min() + 6].min() + xs[ys < ys.min() + 6].max()) / 2; oy = ys.min() + 3
    out['arm'][name] = {'l': layers(sub, m, ox, oy), 'len': U(ys.max() - oy)}
x, y, w, h, _ = braid; sub = Q[y:y + h, x:x + w]; m = fg[y:y + h, x:x + w]; ys, xs = np.nonzero(m)
ox = (xs.min() + xs.max()) / 2; oy = ys.min(); out['braid'] = {'l': layers(sub, m, ox, oy), 'len': U(ys.max() - oy)}
for v, (x, y, w, h, _) in zip(views, hats):   # (a hat: from the middle of its brim, at the bottom)
    sub = Q[y:y + h, x:x + w]; m = fg[y:y + h, x:x + w]; ys, xs = np.nonzero(m)
    out['hat'][v] = {'l': layers(sub, m, (xs.min() + xs.max()) / 2, ys.max() - h * .12), 'w': U(xs.max() - xs.min())}
os.makedirs('sprites/vec', exist_ok=True); f = f'sprites/vec/{a.name}_partes.json'; json.dump(out, open(f, 'w'), separators=(',', ':'))
print('paleta', cols); print(f, os.path.getsize(f), 'bytes')
allr = {os.path.basename(g)[:-12]: json.load(open(g)) for g in sorted(glob.glob('sprites/vec/*_partes.json'))}
src = open('index.html').read(); block = '/* RIG:BEGIN (generado por tools/trace_parts.py; no editar a mano) */\nconst RIG = ' + json.dumps(allr, separators=(',', ':')) + ';\n/* RIG:END */'
assert '/* RIG:BEGIN' in src, 'falta el marcador RIG:BEGIN en index.html'
open('index.html', 'w').write(re.sub(r'/\* RIG:BEGIN.*?/\* RIG:END \*/', lambda _: block, src, flags=re.S))
