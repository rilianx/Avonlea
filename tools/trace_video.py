#!/usr/bin/env python3
"""Saca ciclos de caminar de un video (fondo blanco, cámara fija, el personaje camina en el lugar mientras gira) y los
calca para el juego.  python3 tools/trace_video.py video.mp4 ana --views 'frente:0-1.4,tq_frente:1.4-2.7,...'

Para cada vista (con su tramo de tiempo en segundos): alinea los cuadros por los pies, busca dentro del tramo el par de
cuadros más parecidos separados por un paso completo (el ciclo que cierra), toma --n cuadros parejos de ese ciclo y los
calca (colores planos → trazados). Si en esa vista mira a la izquierda, se refleja (el juego dibuja mirando a la
derecha). Escribe sprites/vec/<nombre>_anim.json y el bloque ANIM de index.html; y una lámina de control."""
import argparse, json, os, re, glob, subprocess, tempfile
import numpy as np, cv2
from PIL import Image

ap = argparse.ArgumentParser(); ap.add_argument('video'); ap.add_argument('name'); ap.add_argument('--views', required=True)
ap.add_argument('--n', type=int, default=8); ap.add_argument('--k', type=int, default=14); ap.add_argument('--eps', type=float, default=1.2)
ap.add_argument('--height', type=float, default=46); ap.add_argument('--minarea', type=float, default=4); ap.add_argument('--sheet')
a = ap.parse_args()
cap = cv2.VideoCapture(a.video); fps = cap.get(cv2.CAP_PROP_FPS) or 24; frames = []
while True:
    ok, f = cap.read()
    if not ok: break
    frames.append(cv2.cvtColor(f, cv2.COLOR_BGR2RGB))
print(len(frames), 'cuadros a', fps, 'fps')

def mask_of(im):
    H, W = im.shape[:2]; fg0 = np.sqrt(((255 - im.astype(np.int32)) ** 2).sum(2)) > 45
    fg0 = cv2.morphologyEx(fg0.astype(np.uint8), cv2.MORPH_OPEN, np.ones((2, 2), np.uint8)) > 0
    n, lab, st, _ = cv2.connectedComponentsWithStats(fg0.astype(np.uint8)); keep = np.zeros_like(fg0)
    big = [i for i in range(1, n) if st[i][4] > 300]
    for i in big: keep |= lab == i
    ff = (~keep).astype(np.uint8); cv2.floodFill(ff, np.zeros((H + 2, W + 2), np.uint8), (0, 0), 2); return ff != 2
masks = [mask_of(f) for f in frames]
def feet(m):
    ys, xs = np.nonzero(m); b = ys.max(); fx = xs[ys > b - (b - ys.min()) * .06]; return (fx.min() + fx.max()) / 2, b, b - ys.min()
info = [feet(m) for m in masks]
H0 = np.median([i[2] for i in info])
def desc(i, s=48):   # the figure, aligned at the feet, small: to compare poses
    x, b, h = info[i]; m = masks[i].astype(np.uint8) * 255
    big = cv2.resize(cv2.warpAffine(m, np.float32([[1, 0, 200 - x], [0, 1, H0 * 1.1 - b]]), (400, int(H0 * 1.2))), (64, int(64 * H0 * 1.2 / 400)))
    return big.astype(np.float32) / 255
D = [desc(i) for i in range(len(frames))]
def facing_left(i):   # where the face is: the skin of the head is on the side it looks to
    im = frames[i]; m = masks[i]; ys, xs = np.nonzero(m); top = ys.min(); h = ys.max() - top
    head = m.copy(); head[int(top + h * .2):] = False; r, g, b = im[..., 0].astype(int), im[..., 1].astype(int), im[..., 2].astype(int)
    skin = head & (r > 215) & (g > 160) & (b > 120) & (r - b > 30); hx = np.nonzero(head)[1].mean()
    return skin.sum() > 30 and np.nonzero(skin)[1].mean() < hx - 2

# palette from the frames: k-means over the figure pixels (a few frames), then each colour the mean of its inner zones
sample = np.concatenate([frames[i][masks[i]] for i in range(0, len(frames), max(1, len(frames) // 12))]).astype(np.float32)
_, kl, cen = cv2.kmeans(sample, a.k, None, (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 50, .3), 3, cv2.KMEANS_PP_CENTERS)
cnt = np.bincount(kl.ravel(), minlength=a.k); pal = cen[np.argsort(-cnt)]
pal = pal[[i for i in range(len(pal)) if cnt[np.argsort(-cnt)][i] > len(sample) * .004]]
dark = int(np.argmin(pal.sum(1))); pal = np.concatenate([pal[dark:dark + 1], np.delete(pal, dark, 0)])   # (the darkest first: the line)
def quant(im, m):
    px = im[m].astype(np.float32); wht = np.full(3, 255, np.float32); seg = pal - wht
    tt = np.clip(((px[:, None, :] - wht) * seg[None]).sum(2) / np.maximum(1, (seg ** 2).sum(1))[None], .45, 1)
    Q = np.full(m.shape, -1, np.int32); Q[m] = ((px[:, None, :] - (wht + tt[..., None] * seg[None])) ** 2).sum(2).argmin(1)
    votes = np.stack([cv2.blur((Q == c).astype(np.float32), (3, 3)) for c in range(len(pal))]); return np.where(m, votes.argmax(0), -1)
k = a.height / H0 * 10
def polys(mask, f):
    cs, _ = cv2.findContours(mask.astype(np.uint8), cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE); out = []
    for c in cs:
        if abs(cv2.contourArea(c)) < a.minarea: continue
        c = cv2.approxPolyDP(c, a.eps, True).reshape(-1, 2)
        if len(c) >= 3: out.append([int(round(v)) for x, y in c for v in f(x, y)])
    return out
def trace(i, mirror):
    im, m = frames[i], masks[i]; Q = quant(im, m); x, b, _ = info[i]; sx = -1 if mirror else 1
    f = lambda px, py: ((px - x) * k * sx, (py - b) * k)
    L = [{'c': -1, 'p': polys(m, f)}]; zs = []
    for c in range(len(pal)):
        mm = (Q == c) & m
        if mm.sum() >= a.minarea:
            p = polys(mm, f)
            if p: zs.append((mm.sum(), {'c': c, 'p': p}))
    return L + [z for _, z in sorted(zs, key=lambda z: -z[0])]

out = {'pal': ['#%02x%02x%02x' % tuple(int(v) for v in q) for q in pal], 'sw': round(1.3 * k, 2), 'views': {}}
out['line'] = out['pal'][0]; chosen = {}
for spec in a.views.split(','):
    v, rng = spec.split(':'); t0, t1 = (float(s) for s in rng.split('-')); i0, i1 = int(t0 * fps), min(len(frames) - 1, int(t1 * fps))
    best = None   # (the cycle: the most alike pair a step apart; a full step is 12..30 frames at 24 fps)
    for s in range(i0, i1):
        for P in range(int(fps * .85), int(fps * 1.3)):   # (a whole stride: both feet)
            if s + P > i1 + int(fps * .5) or s + P >= len(frames): break
            d = np.abs(D[s] - D[s + P]).mean() - .00002 * P
            if best is None or d < best[0]: best = (d, s, P)
    d, s, P = best; idx = [s + round(j * P / a.n) for j in range(a.n)]
    left = sum(facing_left(i) for i in idx) > a.n / 2
    spread = lambda i: np.ptp(np.nonzero(masks[i][int(info[i][1] - H0 * .04)])[0]) if masks[i][int(info[i][1] - H0 * .04)].any() else 1e9
    st_ = min(idx, key=spread)   # (standing: the frame of the cycle with the feet closest together)
    out['views'][v] = {'walk': [trace(i, left) for i in idx], 'stand': trace(st_, left)}
    chosen[v] = (idx, left); print(v, 'ciclo desde', s, 'de', P, 'cuadros (', round(P / fps, 2), 's), diferencia', round(d, 4), 'mira a la', 'izquierda' if left else 'derecha')
fn = f'sprites/vec/{a.name}_anim.json'; json.dump(out, open(fn, 'w'), separators=(',', ':')); print(fn, os.path.getsize(fn), 'bytes')
if a.sheet:   # (a contact sheet of the chosen frames, a row per view)
    cw = int(H0 * .6); rows = []
    for v, (idx, left) in chosen.items():
        cells = []
        for i in idx:
            x, b, _ = info[i]; c = frames[i][max(0, int(b - H0 * 1.05)):int(b + 4), max(0, int(x - cw / 2)):int(x + cw / 2)]
            hh = int(H0 * 1.05) + 4; c = np.pad(c[:hh, :cw], ((0, max(0, hh - c.shape[0])), (0, max(0, cw - c.shape[1])), (0, 0)), constant_values=255)
            cells.append(c[:, ::-1] if left else c)
        rows.append(np.concatenate(cells, 1))
    Image.fromarray(np.concatenate(rows, 0)).save(a.sheet)
allA = {os.path.basename(g)[:-10]: json.load(open(g)) for g in sorted(glob.glob('sprites/vec/*_anim.json'))}
src = open('index.html').read(); block = '/* ANIM:BEGIN (generado por tools/trace_video.py; no editar a mano) */\nconst CANIM = ' + json.dumps(allA, separators=(',', ':')) + ';\n/* ANIM:END */'
assert '/* ANIM:BEGIN' in src, 'falta el marcador ANIM:BEGIN en index.html'
open('index.html', 'w').write(re.sub(r'/\* ANIM:BEGIN.*?/\* ANIM:END \*/', lambda _: block, src, flags=re.S))
