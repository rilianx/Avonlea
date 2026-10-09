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
ap.add_argument('--split', type=int, default=1, help='cuántos personajes hay lado a lado en el video'); ap.add_argument('--pick', type=int, default=0, help='cuál tomar (0 = el de la izquierda)')
ap.add_argument('--eps-face', type=float, default=1.0, help='la cabeza, más fina (los ojos y la boca se leen)')
ap.add_argument('--engine', default='propio', help="'propio' (zonas de color planas) o 'vtracer' (capas apiladas, más fiel)")
ap.add_argument('--scale', type=float, default=1/3, help='con vtracer: achicar el cuadro antes de vectorizar')
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
def pick_part(m):   # (several side by side: cut at the thinnest columns between them, keep one)
    if a.split < 2: return m
    xs = np.nonzero(m.any(0))[0]; x0, x1 = xs.min(), xs.max(); col = m.sum(0).astype(float); cuts = []
    for j in range(1, a.split):
        c0, c1 = int(x0 + (x1 - x0) * (j - .35) / a.split), int(x0 + (x1 - x0) * (j + .35) / a.split)
        cuts.append(c0 + int(np.argmin(cv2.blur(col[None, c0:c1], (9, 1))[0])))
    edges = [x0] + cuts + [x1 + 1]; out = np.zeros_like(m); l, r = edges[a.pick], edges[a.pick + 1]; out[:, l:r] = m[:, l:r]
    n, lab, st, _ = cv2.connectedComponentsWithStats(out.astype(np.uint8))   # (the biggest piece: no crumbs of the other one)
    if n > 1: j = 1 + int(np.argmax(st[1:, 4])); out = lab == j
    return out
masks = [pick_part(m) for m in masks]
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
blue = sample[(sample[:, 2] > sample[:, 0] + 25) & (sample[:, 2] > 100)]   # (the eyes: too small to make a colour of their own, but they must be blue)
if len(blue) > 30: pal = np.concatenate([pal, blue.mean(0, keepdims=True)])
dark = int(np.argmin(pal.sum(1))); pal = np.concatenate([pal[dark:dark + 1], np.delete(pal, dark, 0)])   # (the darkest first: the line)
def quant(im, m):
    px = im[m].astype(np.float32); wht = np.full(3, 255, np.float32); seg = pal - wht
    tt = np.clip(((px[:, None, :] - wht) * seg[None]).sum(2) / np.maximum(1, (seg ** 2).sum(1))[None], .45, 1)
    Q = np.full(m.shape, -1, np.int32); Q[m] = ((px[:, None, :] - (wht + tt[..., None] * seg[None])) ** 2).sum(2).argmin(1)
    votes = np.stack([cv2.blur((Q == c).astype(np.float32), (3, 3)) for c in range(len(pal))]); return np.where(m, votes.argmax(0), -1)
k = a.height / H0 * 10
def polys(mask, f, eps=None, minarea=None):
    cs, _ = cv2.findContours(mask.astype(np.uint8), cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE); out = []
    for c in cs:
        if abs(cv2.contourArea(c)) < (minarea or a.minarea): continue
        c = cv2.approxPolyDP(c, eps or a.eps, True).reshape(-1, 2)
        if len(c) >= 3: out.append([int(round(v)) for x, y in c for v in f(x, y)])
    return out
def trace(i, mirror):
    im, m = frames[i], masks[i]; Q = quant(im, m); x, b, _ = info[i]; sx = -1 if mirror else 1
    f = lambda px, py: ((px - x) * k * sx, (py - b) * k)
    ys_ = np.nonzero(m.any(1))[0]; hy = int(ys_.min() + (ys_.max() - ys_.min()) * .24); head = np.zeros_like(m); head[:hy] = True
    L = [{'c': -1, 'p': polys(m, f)}]; zs = []
    for c in range(len(pal)):
        mm = (Q == c) & m
        if mm.sum() >= 3:   # (the head with a finer line than the body: the face must read)
            hair = pal[c][0] > 140 and pal[c][1] < 120 and pal[c][0] - pal[c][2] > 70   # (the hair, even in the head, with the body's line: it is the face that must read)
            p = polys(mm, f) if hair else polys(mm & ~head, f) + polys(cv2.dilate((mm & head).astype(np.uint8), np.ones((2, 2), np.uint8)) > 0, f, a.eps_face, 3)
            if p: zs.append((mm.sum(), {'c': c, 'p': p}))
    return L + [z for _, z in sorted(zs, key=lambda z: -z[0])]

VT_PAL = []   # (with vtracer: the colours it uses, shared between frames when close)
def vt_col(h):
    c = np.array([int(h[i:i + 2], 16) for i in (1, 3, 5)])
    for j, q in enumerate(VT_PAL):
        if np.abs(q - c).sum() < 18: return j
    VT_PAL.append(c); return len(VT_PAL) - 1
def trace_vt(i, mirror):   # vtracer: the figure alone (transparent around), smaller, as polygons in stacked layers
    import vtracer
    im, m = frames[i], masks[i]; ys, xs = np.nonzero(m); x0, y0 = xs.min() - 4, ys.min() - 4; x1, y1 = xs.max() + 5, ys.max() + 5
    rgba = np.dstack([im[y0:y1, x0:x1], (m[y0:y1, x0:x1] * 255).astype(np.uint8)]); I = Image.fromarray(rgba, 'RGBA')
    I = I.resize((max(1, round(I.width * a.scale)), max(1, round(I.height * a.scale))), Image.LANCZOS); q = np.array(I); q[..., 3] = np.where(q[..., 3] > 128, 255, 0)
    with tempfile.TemporaryDirectory() as td:
        Image.fromarray(q, 'RGBA').save(td + '/f.png')
        vtracer.convert_image_to_svg_py(td + '/f.png', td + '/f.svg', colormode='color', hierarchical='stacked', mode='polygon', filter_speckle=3, color_precision=6,
                                        layer_difference=20, corner_threshold=60, length_threshold=3.5, splice_threshold=45, path_precision=1)
        svg = open(td + '/f.svg').read()
    fx, fb, _ = info[i]; sx = -1 if mirror else 1; L = []
    for mm in re.finditer(r'<path d="([^"]+)" fill="([^"]+)" transform="translate\(([-\d.]+),([-\d.]+)\)"', svg):
        d, col, tx, ty = mm.group(1), mm.group(2), float(mm.group(3)), float(mm.group(4)); polys_ = []
        for sub in re.split(r'(?=M)', d):
            nums = [float(v) for v in re.findall(r'-?\d+(?:\.\d+)?', sub)]
            if len(nums) >= 6: polys_.append([int(round(v)) for j in range(0, len(nums) - 1, 2) for v in (((nums[j] + tx) / a.scale + x0 - fx) * k * sx, ((nums[j + 1] + ty) / a.scale + y0 - fb) * k)])
        if polys_: L.append({'c': vt_col(col), 'p': polys_})
    return L
if a.engine == 'vtracer': trace = trace_vt
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
def delta(L):   # (each polygon: its first point, then the steps from point to point: small numbers)
    for ly in L: ly['p'] = [q[:2] + [q[j] - q[j - 2] for j in range(2, len(q))] for q in ly['p']]
for V in out['views'].values():
    for L in V['walk'] + [V['stand']]: delta(L)
out['delta'] = 1
if a.engine == 'vtracer': out['pal'] = ['#%02x%02x%02x' % tuple(int(v) for v in q) for q in VT_PAL]; out['sw'] = 0; out['rule'] = 'nonzero'
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
