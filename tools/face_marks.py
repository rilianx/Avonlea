#!/usr/bin/env python3
"""Marca dónde están los ojos y la boca en la cara dibujada de la hoja de partes, para animarla encima (parpadear,
hablar) sin cambiar el dibujo. python3 tools/face_marks.py sprites/gpt_ana_partes.webp ana

Por vista (frente, 3/4 frente, perfil): cada ojo (el iris azul y lo oscuro alrededor: pestañas, párpado) y la boca (lo
que no es piel bajo la nariz), como elipses en unidades del cuerpo ×10. El juego, al parpadear, tapa cada ojo con el
color de la piel y dibuja el ojo cerrado; al hablar, tapa la boca y dibuja la boca abierta. Se agrega como "marks" al
calco de partes (sprites/vec/<nombre>_partes.json) y se regenera el bloque RIG de index.html."""
import sys, json, os, re, glob
import numpy as np, cv2
from PIL import Image

img, name = sys.argv[1], sys.argv[2]; height = 46
im = np.array(Image.open(img).convert('RGB')).astype(np.int32); H, W = im.shape[:2]
fg = np.sqrt(((255 - im) ** 2).sum(2)) > 40
blob = cv2.morphologyEx(fg.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
n, lab, st, _ = cv2.connectedComponentsWithStats(blob)
bodies = sorted([st[i] for i in range(1, n) if st[i][4] > 1500], key=lambda s: (s[1] // (H // 6), s[0]))[:5]
k = height / np.mean([b[3] for b in bodies])
r, g, b = im[..., 0], im[..., 1], im[..., 2]
skin = (r > 225) & (g > 170) & (g < 235) & (b > 130) & (b < 210) & (r - b > 25)   # (the face: light peach)
blue = (b > r + 25) & (b > 110) & (b < 230)
dark = im.sum(2) < 220   # (lashes, lids, the line; not the hair)
white = im.min(2) > 232
marks = {}
for vi, v in enumerate(['frente', 'tq_frente', 'perfil']):
    x, y, w, h, _ = bodies[vi]; m = fg[y:y + h, x:x + w]; ys, xs = np.nonzero(m); bottom = ys.max(); feet = xs[ys > bottom - h * .08]
    ox, oy = x + (feet.min() + feet.max()) / 2, y + bottom
    U = lambda px, py: [round((px - ox) * k * 10, 1), round((py - oy) * k * 10, 1)]
    top = int(y + h * .5)
    nb, lb, sb, cb = cv2.connectedComponentsWithStats(blue[y:top, x:x + w].astype(np.uint8))
    irises = sorted([(x + cb[j][0], y + cb[j][1]) for j in range(1, nb) if sb[j][4] > 15])
    eyes = []
    for ex, ey in irises:   # (the eye: the iris and the dark around it, lashes and lid, as far as it reaches)
        x0, x1, y0, y1 = int(ex - 20), int(ex + 20), int(ey - 18), int(ey + 14)
        win = (blue | dark | white & fg)[y0:y1, x0:x1]
        nw, lw, sw, cw = cv2.connectedComponentsWithStats(win.astype(np.uint8))
        keep = np.zeros_like(win)
        for j in range(1, nw):   # (the pieces of the eye: those that touch the iris's neighbourhood)
            if sw[j][4] > 6 and abs(cw[j][0] + x0 - ex) < 16 and abs(cw[j][1] + y0 - ey) < 13: keep |= lw == j
        yy, xx = np.nonzero(keep); bx0, bx1, by0, by1 = x0 + xx.min(), x0 + xx.max(), y0 + yy.min(), y0 + yy.max()
        c = U((bx0 + bx1) / 2, (by0 + by1) / 2); eyes.append(c + [round((bx1 - bx0) / 2 * k * 10 + 3, 1), round((by1 - by0) / 2 * k * 10 + 3, 1)])
    # the mouth: below the eyes, what is not skin (the line of the lips), the biggest piece near the middle of the face
    eyc = np.mean([e[1] for e in irises]); mx = np.mean([e[0] for e in irises]) + (8 if v == 'perfil' else 0)
    x0, x1, y0, y1 = int(mx - 22), int(mx + 22), int(eyc + 26), int(eyc + 46)
    win = (~skin & fg & ~blue)[y0:y1, x0:x1] & (dark | (r < 210))[y0:y1, x0:x1]
    nw, lw, sw, cw = cv2.connectedComponentsWithStats(win.astype(np.uint8))
    j = max(range(1, nw), key=lambda j: sw[j][4] - abs(cw[j][0] + x0 - mx) * 3) if nw > 1 else None
    if j:
        yy, xx = np.nonzero(lw == j); bx0, bx1, by0, by1 = x0 + xx.min(), x0 + xx.max(), y0 + yy.min(), y0 + yy.max()
        mouth = U((bx0 + bx1) / 2, (by0 + by1) / 2) + [round((bx1 - bx0) / 2 * k * 10 + 2, 1), round(max(by1 - by0, 3) / 2 * k * 10 + 2, 1)]
    else: mouth = None
    marks[v] = {'eyes': eyes, 'mouth': mouth}
    print(v, 'ojos', eyes, 'boca', mouth)
f = f'sprites/vec/{name}_partes.json'; R = json.load(open(f)); R.pop('face', None); R['marks'] = marks
R['pal'] = R['pal'][:15]; json.dump(R, open(f, 'w'), separators=(',', ':')); print(f, os.path.getsize(f), 'bytes')
allr = {os.path.basename(g_)[:-12]: json.load(open(g_)) for g_ in sorted(glob.glob('sprites/vec/*_partes.json'))}
src = open('index.html').read(); block = '/* RIG:BEGIN (generado por tools/trace_parts.py; no editar a mano) */\nconst RIG = ' + json.dumps(allr, separators=(',', ':')) + ';\n/* RIG:END */'
open('index.html', 'w').write(re.sub(r'/\* RIG:BEGIN.*?/\* RIG:END \*/', lambda _: block, src, flags=re.S))
