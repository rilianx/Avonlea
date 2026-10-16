"""La cobertura de la historia: qué situaciones no tienen escena, qué noticias nadie usa, qué llegadas nadie nota,
quién no tiene presentación propia o tiene pocas frases, qué metas no tienen guiño… Para revisar qué falta. La usa
tools/planilla.py (hoja «Cobertura») y deja trazas/cobertura.md."""
import os, re, glob, collections

LUGARES_GENTE = {'gg': 'Tejas Verdes', 'os': 'La Cuesta del Huerto (los Barry)', 'rl': 'la Hondonada (la Sra. Lynde)', 'hh': 'la casa del Sr. Harrison',
                 'tl': 'la tienda de Lawson', 'es': 'la escuela', 'ig': 'la iglesia', 'cp': 'la casa parroquial', 'out': 'afuera (los caminos, la aldea)'}
ESTADOS = {'camison': 'en camisón', 'sin_sombrero': 'sin sombrero', 'noche': 'de noche'}
# qué combinaciones importan (en el libro, o porque el juego deja hacerlas): estado → lugares
IMPORTAN = {'camison': ['gg', 'os', 'rl', 'hh', 'tl', 'es', 'ig', 'cp', 'out'], 'sin_sombrero': ['out', 'ig', 'es'], 'noche': ['os', 'rl', 'hh', 'out']}


def leer(raiz, *rutas):
    return '\n'.join(open(os.path.join(raiz, r), encoding='utf-8').read() for r in rutas if os.path.exists(os.path.join(raiz, r)))


def cargar(raiz):
    p = os.path.join(raiz, 'trazas/cobertura.json')
    import json
    return json.load(open(p, encoding='utf-8')) if os.path.exists(p) else None


def analizar(D, raiz):
    H = []   # [(prioridad, área, qué, falta, idea)]
    add = lambda pri, *x: H.append((pri,) + x)
    datos = leer(raiz, 'src/datos/guion.txt', 'src/datos/conversaciones.txt', 'src/datos/comentarios.txt', 'src/datos/frases.txt', 'src/datos/cuaderno.txt', 'src/datos/habilidades.txt')
    codigo = '\n'.join(open(f, encoding='utf-8').read() for f in sorted(glob.glob(os.path.join(raiz, 'src/js/*.js'))))
    nombre = {g['id']: g['nombre'] for g in D['gente']}

    # 1. lugares × cómo anda Ana × quién está: lo que dice el juego (las sondas de tools/cobertura.js)
    C = cargar(raiz)
    if C:
        S = [x for x in C['sondas'] if x['k'] != 'ana' and not x.get('fuera')]
        kids = {g['id'] for g in D['gente'] if g['grupo'] == 'niños'} | {'diana', 'minnie'}
        tit = {m['id']: m['titulo'].split(' · ')[0] for m in C['momentos']}
        for est in ('camison', 'sin_sombrero', 'noche'):
            for lugar, L in C['lugares'].items():
                xs = [x for x in S if x['lugar'] == lugar and x['estado'] == est and x['k'] not in kids]
                if not xs: continue
                nadie = [m for m in tit if not any(x['delEstado'] for x in xs if x['momento'] == m) and any(x['momento'] == m for x in xs)]
                if len(nadie) == len({x['momento'] for x in xs}):
                    pri = 'alta' if est == 'camison' and lugar in ('out', 'ig', 'es', 'tl') else 'media' if est != 'noche' else 'baja'
                    add(pri, 'Situaciones', f'Ana {ESTADOS[est]} en {L["nombre"]}', 'nadie reacciona, en ningún momento (estaban: ' + ', '.join(sorted({nombre.get(x["k"], x["k"]) for x in xs})) + ')',
                        f'una escena con «si: ana:{est}» (o la hora), y «ve:quien» o «en: quien={lugar}»' if est != 'noche' else 'una escena de noche (hora:21-26) con quien esté')
                elif nadie:
                    add('baja', 'Situaciones', f'Ana {ESTADOS[est]} en {L["nombre"]}', 'nadie reacciona en: ' + ', '.join(tit[m] for m in nadie), 'revisar las condiciones de la escena que reacciona (¿pide algo que todavía no pasa?)')
        adultos = {x['k'] for x in S if x['k'] not in kids}
        nunca = sorted(nombre.get(k, k) for k in adultos if not any(x['delEstado'] for x in S if x['k'] == k and x['estado'] == 'camison'))
        if nunca:
            add('media', 'Situaciones', 'Quién ve a Ana en camisón y no dice nada', ', '.join(nunca), 'una escena «si: ana:camison, ve:quien» (o una frase con [ana:camison])')
        mudos = collections.defaultdict(list)
        for x in S:
            if x['estado'] == 'normal' and not x['escenas'] and not x['frases'] and not x['presenta']:
                mudos[x['k']].append(f'{tit[x["momento"]]} en {C["lugares"][x["lugar"]]["nombre"]}')
        for k, v in mudos.items():
            add('media', 'Situaciones', f'{nombre.get(k, k)} no tiene nada que decirle', '; '.join(v[:5]) + ('…' if len(v) > 5 else ''), 'frases (hoja «Frases») o una escena para ese momento')
        anas = [x for x in C['sondas'] if x['k'] == 'ana' and x['estado'] != 'normal']
        for est in ('camison', 'sin_sombrero'):
            sin = [C['lugares'][l]['nombre'] for l in C['lugares'] if not any(x['anaComenta'] for x in anas if x['lugar'] == l and x['estado'] == est)]
            if sin: add('baja', 'Situaciones', f'Ana {ESTADOS[est]}: ella misma no lo nota', 'en ' + ', '.join(sin), f'un comentario de Ana con «si: ana:{est}»')
        # the exploration: the scenes never reached, by what they lack
        E = C.get('exploracion')
        if E:
            falta = collections.Counter(); ejemplos = collections.defaultdict(list)
            for n in E['nunca']:
                r = re.sub(r'\d+(\.\d+)? s$', 'N s', n['porque'])
                falta[r] += 1; ejemplos[r].append(n['id'])
            for r, c in falta.most_common(12):
                add('baja', 'Exploración', f'{c} escena(s) que no pasaron en {E["dias"]} días', f'les falta: {r}', 'ej.: ' + ', '.join(ejemplos[r][:4]))
    else:
        # 1. lugares × cómo anda Ana: ¿hay una escena que reaccione?
        def lugares(e):
            ls = {e['canal']} | {x.split('=')[1] for x in e['en'].split(', ') if '=' in x}
            return {l for l in ls if l in LUGARES_GENTE} or ({'out'} if e['canal'] in ('general', 'ana_sola') and 'ana:' in e['si'] else set())
        def estados(e):
            s = set(re.findall(r'ana:(camison|sin_sombrero)', e['si']))
            for a, b in re.findall(r'hora:(\d+)-(\d+)', e['si']):
                if int(a) >= 20 or int(b) <= 7:
                    s.add('noche')
            return s
        hay = collections.defaultdict(list)
        reaccionan = collections.defaultdict(set)
        for e in D['escenas']:
            for est in estados(e):
                for l in lugares(e):
                    hay[(est, l)].append(e['id'])
                reaccionan[est] |= set(re.findall(r'\bve:(\w+)', e['si'])) | set(x.strip() for x in e['hablan'].split(',') if x.strip() and x.strip() != 'ana')
        for est, ls in IMPORTAN.items():
            for l in ls:
                if not hay[(est, l)]:
                    add('media' if est != 'noche' or l == 'out' else 'baja', 'Ana y los lugares', f'Ana {ESTADOS[est]} en {LUGARES_GENTE[l]}', 'ninguna escena reacciona',
                              f'una escena con «si: ana:{est}» (o la hora) y «en: …={l}»' if est != 'noche' else f'una escena de noche (hora:21-26) en {l}')
        adultos = [g for g in D['gente'] if g['grupo'] in ('casa', 'pueblo') and g['id'] not in ('vecino',)]
        sin_reaccion = [g['nombre'] for g in adultos if g['id'] not in reaccionan['camison'] and g['grupo'] == 'casa']
        if sin_reaccion:
            add('media', 'Ana y los lugares', 'Quién la ve en camisón', 'no reaccionan: ' + ', '.join(sin_reaccion), 'una escena «si: ana:camison, ve:quien» para cada uno')


    # 2. noticias que nadie usa (solo se cuentan al conversar)
    for n in D['noticias']:
        usos = len(re.findall(r'sabe:\w+:' + re.escape(n['id']) + r'\b', datos)) + len(re.findall(r"['\"]" + re.escape(n['id']) + r"['\"]", codigo))
        if not usos:
            de_ana = n['id'].startswith('ana_') or 'niña de los Cuthbert' in n['titulo'] or 'Ana' in n['titulo']
            add('alta' if de_ana else 'baja', 'Noticias', f'«{n["id"]}»: {n["titulo"]}', 'nadie reacciona a ella (solo se cuenta)' + ('' if de_ana else '; es un chisme del pueblo: puede bastar'),
                'una escena o una frase con «sabe:quien:' + n['id'] + '» (alguien que se entera y hace o dice algo)')
        if n['versiones'] == 1 and n['id'].startswith('ana_'):
            add('baja', 'Noticias', f'«{n["id"]}»', 'es de Ana y no tiene versión exagerada', 'una línea «exagerada:» (los chismosos la agrandan)')

    # 3. llegadas e idas que nadie nota
    for l in D['llegadas']:
        k = l['id']
        if l['llega'] and not re.search(r'(llego_|se_fue_)' + k + r'\b|presente:' + k + r'\b|ausente\(\s*.' + k + r'.\s*\)', datos + codigo + leer(raiz, 'src/datos/noticias.txt')):
            add('media' if not l['visita'] else 'baja', 'Llegadas', f'{nombre.get(k, k)} llega' + (' (de visita)' if l['visita'] else ''), 'nadie lo nota (solo queda en el diario)',
                      f'una noticia «saben si hecho:llego_{k}: …» o una escena «si: hecho:llego_{k}»')
        if l['seVa'] and not re.search(r'se_fue_' + k + r'\b', datos + leer(raiz, 'src/datos/noticias.txt', 'src/datos/llegadas.txt').replace(f'=== {k} ===', '')):
            add('baja', 'Llegadas', f'{nombre.get(k, k)} se va', 'nadie lo nota', f'una noticia o una escena con «hecho:se_fue_{k}»')

    # 4. presentaciones y frases
    frases = collections.Counter(re.findall(r'^=== (\S+) ===', leer(raiz, 'src/datos/frases.txt'), re.M))
    dice = collections.Counter()
    q = None
    for l in leer(raiz, 'src/datos/frases.txt').split('\n'):
        m = re.match(r'^=== (\S+) ===', l)
        if m: q = m.group(1)
        elif q and l.startswith('dice:'): dice[q] += 1
    sin_pres = [g['nombre'] for g in D['gente'] if g['grupo'] in ('casa', 'pueblo') and not g.get('presenta') and g['id'] not in ('matthew', 'marilla', 'spencer')]
    if sin_pres:
        add('baja', 'Personas', 'Presentación propia (cómo se presenta la primera vez)', f'{len(sin_pres)} usan la de siempre: ' + ', '.join(sin_pres[:14]) + ('…' if len(sin_pres) > 14 else ''),
                  '«presentacion» en personajes.json, o «presenta» en src/js/56-gente-de-avonlea.js, con su voz')
    for g in D['gente']:
        if g['grupo'] != 'vecinos' and dice[g['id']] < 3:
            add('baja', 'Personas', f'{g["nombre"]}', f'tiene {dice[g["id"]]} frase(s) suelta(s)', 'unas frases más en la hoja «Frases»')
    ceros = collections.defaultdict(list)
    for m in D['momentos']:
        for k, v in D['huecos'][m['id']].items():
            if v.get('sin') == 0: ceros[k].append(m['titulo'].split(' · ')[0] + ' (sin conocerla)')
            if v.get('con') == 0: ceros[k].append(m['titulo'].split(' · ')[0] + ' (conociéndola)')
    for k, ms in ceros.items():
        add('media', 'Frases', nombre.get(k, k), 'no tiene qué decir: ' + ', '.join(ms[:6]) + ('…' if len(ms) > 6 else ''), 'frases para esos momentos (hoja «Huecos»)')
    hablan = set()
    for e in D['escenas']:
        hablan |= {x.strip() for x in e['hablan'].split(',')}
    mudos = [g['nombre'] for g in D['gente'] if g['grupo'] in ('pueblo', 'niños') and g['id'] not in hablan]
    if mudos:
        add('baja', 'Personas', 'Sin ninguna escena', f'{len(mudos)} de la gente del pueblo solo tienen frases sueltas: ' + ', '.join(mudos[:16]) + ('…' if len(mudos) > 16 else ''),
                  'una escena pequeña para los que importan en el libro')

    # 5. metas del cuaderno: guiño y pista
    meta = None; guinos = collections.Counter(); pistas = collections.Counter(); metas = []
    for l in leer(raiz, 'src/datos/cuaderno.txt').split('\n'):
        m = re.match(r'^=== (\S+) ===', l)
        if m: meta = m.group(1); metas.append(meta); continue
        if meta and l.startswith('guiño'): guinos[meta] += 1
        if meta and l.startswith('pista'): pistas[meta] += 1
    for m in metas:
        if not guinos[m]: add('media', 'Metas', f'«{m}»', 'nadie le sugiere a Ana hacerla (sin guiño)', '«guiño quien: …» en src/datos/cuaderno.txt')
        if not pistas[m]: add('media', 'Metas', f'«{m}»', 'no tiene pista', '«pista: …» en src/datos/cuaderno.txt')

    # 6. hechos
    for h in D['grafo']['nunca']:
        add('alta', 'Hechos', f'«{h}»', 'se pide y nada lo deja: lo que lo pide nunca pasa', 'que una escena lo deje, o quitar la condición')
    for h in D['grafo']['sinUso']:
        if not re.match(r'^(conoce_|nombro_|nombre_propio_)', h):   # (the ones made by name, for each one: a record)
            add('baja', 'Hechos', f'«{h}»', 'se deja y nadie lo lee: algo pasó y no tiene consecuencias', 'una escena, una frase o una noticia que lo recuerde')
    orden = {'alta': 0, 'media': 1, 'baja': 2}
    return sorted(H, key=lambda h: orden[h[0]])


def escribir_md(H, raiz, generado):
    areas = collections.OrderedDict()
    for pri, a, q, f, i in H:
        areas.setdefault(a, []).append((pri, q, f, i))
    md = ['# Cobertura de la historia: lo que falta', '', f'Generado el {generado} por `node tools/planilla.js` (también en la hoja «Cobertura» de planilla/avonlea.xlsx).', '',
          'No son errores: son situaciones que el juego deja que pasen y nadie considera, noticias o llegadas sin consecuencias, gente con poco que decir.', '',
          '| Área | Alta | Media | Baja |', '|---|---|---|---|'] + [f'| {a} | ' + ' | '.join(str(sum(1 for x in v if x[0] == p)) for p in ('alta', 'media', 'baja')) + ' |' for a, v in areas.items()] + ['']
    for a, v in areas.items():
        md += [f'## {a}', ''] + [f'- [{pri}] **{q}**: {f}. _Idea: {i}._' for pri, q, f, i in v] + ['']
    open(os.path.join(raiz, 'trazas/cobertura.md'), 'w', encoding='utf-8').write('\n'.join(md))
