"""El modelo lógico de las interacciones: busca huecos e incoherencias con un solucionador (Z3).

Lo que hay (de los datos): cada cosa que alguien le puede decir a Ana —sus frases (src/datos/frases.txt), las escenas
en que habla con ella, las conversaciones, la presentación de la primera vez— con sus condiciones.
El espacio de situaciones (de los datos): el día y la hora, dónde está Ana y dónde cada uno, cómo anda Ana, quién está
en Avonlea (src/datos/llegadas.txt), los hechos que pasaron (y lo que cada hecho supone: las condiciones de la escena
que lo deja, en src/datos/guion.txt), a quién conoce, qué noticias sabe cada uno, las metas cumplidas, las cualidades.
Lo que debería haber, lo que no puede pasar y lo que una frase supone (a mano, lo único): src/datos/reglas.txt.

Para cada regla, la pregunta al solucionador es «¿existe una situación posible en que no se cumple?». Si existe, la
devuelve: un contraejemplo, con la situación y por qué no vale ninguna de las frases o escenas de esa persona. Revisa
todas las combinaciones de una vez, sin enumerarlas. Deja trazas/modelo.md y trazas/modelo.json.
Uso: node tools/planilla.js (para trazas/planilla.json) && python3 tools/modelo.py"""
import json, os, re, sys, collections, time
import z3
sys.path.insert(0, os.path.dirname(__file__))
import bloques as B

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
leer = lambda r: open(os.path.join(RAIZ, r), encoding='utf-8').read()
D = json.load(open(os.path.join(RAIZ, 'trazas/planilla.json'), encoding='utf-8'))
G = D['grafo']

# ---------------------------------------------------------------- el mundo: lugares y gente
LUGARES = ['ga', 'gg', 'patio', 'camino', 'os', 'rl', 'hh', 'tl', 'es', 'ig', 'cp', 'sa']
NOMBRE_LUGAR = {'ga': 'su pieza', 'gg': 'la cocina de Tejas Verdes', 'patio': 'el patio de Tejas Verdes', 'camino': 'el camino o la aldea', 'os': 'La Cuesta del Huerto',
                'rl': 'la casa de la Sra. Lynde', 'hh': 'la casa del Sr. Harrison', 'tl': 'la tienda de Lawson', 'es': 'la escuela', 'ig': 'la iglesia', 'cp': 'la casa parroquial', 'sa': 'el salón'}
AFUERA = {'patio', 'camino'}
GRUPOS_LUGAR = {'tejas': {'ga', 'gg', 'patio'}, 'casa': {'gg', 'patio'}, 'dentro': set(LUGARES) - AFUERA, 'arroyo': {'camino'}, 'out': AFUERA, 'afuera': AFUERA,
                'publico': {'es', 'ig', 'tl', 'sa', 'cp'}}
L = {l: i for i, l in enumerate(LUGARES)}
gente = {g['id']: g for g in D['gente']}
NOMBRE = {k: g['nombre'] for k, g in gente.items()}
NOMBRE['ana'] = 'Ana'
CASA = {}   # where each one lives
for c in D['casas']:
    for v in c['viven']:
        CASA[v.replace('f:', '')] = c['id']
CASA.update({'diana': 'os', 'matthew': 'gg', 'marilla': 'gg'})
NINOS = {k for k, g in gente.items() if g['grupo'] == 'niños'} | {'diana', 'minnie', 'niño'}
ADULTOS = {k for k, g in gente.items() if k not in NINOS and k != 'niño'}
CONOCE_BASE = {'marilla', 'matthew', 'spencer'}
CONOCE_POR = {'diana': 'hecho:conocidas_diana', 'barry': 'hecho:barry_presenta', 'lynde': 'hecho:lynde_visita', 'josephine': 'hecho:cama_josephine'}
SIN_NOMBRE = {'vecino', 'niño'}

# ---------------------------------------------------------------- las variables de una situación
dia, hora = z3.Int('dia'), z3.Real('hora')
estacion = ((dia - 1) / 14) % 4
EST = {'primavera': 0, 'verano': 1, 'otoño': 2, 'invierno': 3}
V = {}
def B_(n): return V.setdefault(n, z3.Bool(n))
def I_(n): return V.setdefault(n, z3.Int(n))
lugar = lambda k: I_('L_' + k)
def hecho(x, t=None):   # (a fact, by time t: it happened, and on or before that day)
    h, d = B_('h_' + x), I_('d_' + x)
    return h if t is None else z3.And(h, d <= t)

# the arrivals (src/datos/llegadas.txt): who is in Avonlea, and since when
LLEG = {}
for p in B.partir(leer('src/datos/llegadas.txt')):
    if p[0] == 'bloque':
        e = {'llega': [], 'seva': [], 'visita': False}
        for k, v in B.campos(p[2], B.llegadas_clasificar):
            if k == 'llega si': e['llega'].append([c.strip() for c in v.split(',') if c.strip()])
            elif k == 'se va si': e['seva'].append([c.strip() for c in v.split(',') if c.strip()])
            elif k == 'de visita': e['visita'] = True
        LLEG[p[1]] = e
# who leaves each fact (the scenes, with their conditions; or the code)
QUIEN_DEJA = collections.defaultdict(list)
DEJA = collections.defaultdict(set)   # scene → the facts it leaves
for archivo in ('src/datos/guion.txt', 'src/datos/conversaciones.txt'):
    for p in B.partir(leer(archivo)):
        if p[0] != 'bloque': continue
        f = B.campos(p[2], B.guion_clasificar)
        si = [c.strip() for k, v in f if k == 'si' for c in v.split(',') if c.strip()]
        hablan = {m.group(1) for l in p[3] for m in [re.match(r'^\s*(\w+):', l)] if m and m.group(1) not in ('ana', 'narra', 'carta')}
        si += ['presente:' + h for h in hablan if h in LLEG]   # (who speaks in it was here)
        deja = [v.split()[1] for k, v in f if k in ('al_terminar', 'al_empezar') and v.split()[0] == 'hecho' and len(v.split()) > 1]
        deja += [m.group(1) for l in p[3] for m in [re.match(r'^\s*!\s*hecho\s+(\w+)', l)] if m]
        for x in deja:
            QUIEN_DEJA[x].append((p[1], si)); DEJA[p[1]].add(x)
DEL_CODIGO = {h for h, w in G['hechos'].items() if any(x == 'código' or x.startswith('habilidad') or x == 'llegadas' for x in w)}


def atomo(c, k=None, t=None):
    """una condición del guion → una fórmula (t: en qué día se mira, si no es hoy)"""
    c = c.strip().replace('{k}', k or '')
    if c.startswith('!'):
        return z3.Not(atomo(c[1:], k, t))
    now = dia if t is None else t
    m = re.match(r'^(\w+):(\w+)(?::(\w+))?([<>]=?)(\d+)$', c)   # a quality: «afecto:diana:ana>=4», «estudio:ana>=20»
    if m:
        v = I_('q_' + '_'.join(x for x in m.groups()[:3] if x))
        return {'>=': v >= int(m.group(5)), '<=': v <= int(m.group(5)), '>': v > int(m.group(5)), '<': v < int(m.group(5))}[m.group(4)]
    key, _, rest = c.partition(':')
    a = rest.split(':')
    if key == 'hecho':
        return hecho(a[0], now)
    if key == 'dias_desde':
        x, n = a[0], int(a[1])
        if x in G['metas'] and x not in G['hechos']:
            return z3.And(B_('m_' + x), now - I_('dm_' + x) >= n)
        return z3.And(B_('h_' + x), now - I_('d_' + x) >= n)
    if key == 'cuaderno':
        return z3.And(B_('m_' + a[0]), I_('dm_' + a[0]) <= now)
    if key == 'dia_juego':
        return now >= int(a[0])
    if key == 'estacion':
        return ((now - 1) / 14) % 4 == EST.get(a[0], -1)
    if key == 'dia_estacion':
        return (now - 1) % 14 + 1 == int(a[0])
    if key == 'hora':
        x, y = map(float, a[0].split('-'))
        return z3.And(hora >= x, hora < y) if y <= 26 else z3.And(hora >= x)
    if key == 'conoce':
        return conoce(a[0])
    if key == 'presente':
        return presente(a[0], t)
    if key == 've':
        return ve(a[0])
    if key == 'donde':
        quien, l = a[0], a[1]
        if l == 'propia':
            return z3.And(lugar(quien) == L.get(CASA.get(quien, 'camino'), -1), lugar('ana') == lugar(quien))
        ls = GRUPOS_LUGAR.get(l, {l} if l in L else set())
        return z3.Or([lugar(quien) == L[x] for x in ls]) if ls else z3.BoolVal(False)
    if key == 'ana':
        return B_('ana_' + a[0])
    if key == 'sabe':
        b = B_('sabe_' + a[0] + '_' + a[1])
        if len(a) > 2 and a[2].isdigit():
            return z3.And(b, I_('v_' + a[0] + '_' + a[1]) >= int(a[2]))
        return b
    if key == 'capitulo':
        return z3.BoolVal(False)   # (the book's first chapter: before the game proper)
    return B_('x_' + c)   # (anything else: free, either way)


def todos(cs, k=None, t=None):
    return z3.And([atomo(c, k, t) for c in cs]) if cs else z3.BoolVal(True)


def presente(k, t=None):
    e = LLEG.get(k); t = dia if t is None else t
    if not e: return z3.BoolVal(True)
    if e['visita']:
        return z3.And(z3.Or([todos(g, t=t) for g in e['llega']]) if e['llega'] else True, z3.Not(z3.Or([todos(g, t=t) for g in e['seva']])) if e['seva'] else True)
    llego = hecho('llego_' + k, t) if e['llega'] else z3.BoolVal(True)
    se_fue = hecho('se_fue_' + k, t) if e['seva'] else z3.BoolVal(False)
    return z3.And(llego, z3.Not(se_fue))


def conoce(k):
    if k in CONOCE_BASE: return z3.BoolVal(True)
    f = B_('conoce_' + k)
    return z3.Or(f, atomo(CONOCE_POR[k])) if k in CONOCE_POR else f


def ve(k):
    return z3.And(presente(k), lugar(k) == lugar('ana'))


def puede_estar(k):
    if k in ('marilla', 'matthew'): return set(LUGARES)
    ok = {'camino', 'patio', 'ig', 'cp', 'sa', 'tl'}
    if k in SIN_NOMBRE: return ok | ({'es'} if k == 'niño' else set())
    if CASA.get(k): ok.add(CASA[k])
    if k in ADULTOS: ok |= {'gg', 'os', 'rl', 'hh'}
    if k in NINOS: ok.add('es')
    if k in ('phillips', 'stacy'): ok.add('es')
    if k == 'diana': ok |= {'ga', 'gg'}
    return ok


# ---------------------------------------------------------------- lo que siempre vale (las restricciones)
def restricciones(quienes):
    R = [dia >= 1, dia <= 140, hora >= 6, hora <= 26]
    R += [z3.And(lugar(k) >= 0, lugar(k) < len(LUGARES)) for k in quienes | {'ana'}]
    # the beginning: as the book (the game starts with Ana's arrival)
    R += [B_('h_inicio_juego'), I_('d_inicio_juego') == 1]
    for x, d, desde in (('llegada_tv', 1, 2), ('primera_noche', 1, 2), ('desayuno_prueba', 2, 3)):   # (the first night and morning, as the book)
        R += [z3.Implies(B_('h_' + x), I_('d_' + x) == d), z3.Implies(dia >= desde, B_('h_' + x))]
    R += [z3.Implies(B_('h_primera_noche'), B_('h_llegada_tv')), z3.Implies(B_('h_desayuno_prueba'), B_('h_primera_noche'))]
    # where each one can be (Ana's room: the Cuthberts and Diana; a house: who lives there and the grown-ups who visit;
    # the school: the children and the teacher; the vecinos without a name: out of doors and in the public places)
    for k in quienes:
        ok = puede_estar(k)
        R += [z3.Or([lugar(k) == L[x] for x in ok])]
    # what each fact supposes: one of the scenes that leave it could happen, by that day (or the code left it)
    for x in list(V):
        pass
    hechos = {n[2:] for n in V if n.startswith('h_')} | {n[2:] for n in V if n.startswith('d_')}
    for x in sorted(hechos):
        R += [z3.Implies(B_('h_' + x), z3.And(I_('d_' + x) >= 1, I_('d_' + x) <= dia))]
        if x.startswith(('llego_', 'se_fue_')):
            k = x.split('_', 1)[1] if x.startswith('llego_') else x[len('se_fue_'):]
            e = LLEG.get(k)
            if e:
                gs = e['llega'] if x.startswith('llego_') else e['seva']
                if gs:
                    R += [z3.Implies(B_('h_' + x), z3.Or([todos(g, t=I_('d_' + x)) for g in gs]))]   # (it holds on the day they came)
                    R += [z3.Implies(z3.Or([todos(g) for g in gs]), B_('h_' + x))]   # (and if it holds now, they have come)
            continue
        if x in DEL_CODIGO or x not in QUIEN_DEJA:
            continue
        R += [z3.Implies(B_('h_' + x), z3.Or([z3.And([atomo(c, t=I_('d_' + x)) for c in si if re.match(r'^(hecho|cuaderno|dias_desde|dia_juego|presente):', c)] or [z3.BoolVal(True)]) for _, si in QUIEN_DEJA[x]]))]
    for n in list(V):
        if n.startswith('dm_'):
            R += [z3.Implies(B_('m_' + n[3:]), z3.And(V[n] >= 1, V[n] <= dia))]
    # whom Ana knows, they know there is a girl at Green Gables
    for k in quienes:
        if k not in SIN_NOMBRE:
            R += [z3.Implies(conoce(k), B_('sabe_' + k + '_nina_cuthbert'))]
    R += [B_('sabe_lynde_nina_cuthbert')] + [B_(f'sabe_{k}_nina_cuthbert') for k in CONOCE_BASE]
    # a neighbour's house: Ana is only inside if someone who lives there is at home
    for h in ('os', 'rl', 'hh', 'tl'):
        viven = [k for k, c in CASA.items() if c == h and k in quienes]
        R += [z3.Implies(lugar('ana') == L[h], z3.Or([ve(k) for k in viven]) if viven else z3.BoolVal(False))]
    # whoever is not in Avonlea is nowhere here
    for k in quienes:
        R += [z3.Implies(z3.Not(presente(k)), lugar(k) != lugar('ana'))]
    # Ana, at night: home, or about (not in the school, the church, the shop)
    R += [z3.Implies(z3.Or(B_('ana_en_cama'), B_('ana_sentada')), z3.BoolVal(True))]
    for r in REGLAS['nunca']:
        R += [z3.Not(todos(r['si']))]
    return R


# ---------------------------------------------------------------- las reglas (src/datos/reglas.txt)
def reglas_leer(txt):
    out = {'espera': [], 'nunca': [], 'referencia': []}; r = None
    for raw in txt.split('\n'):
        l = raw.strip()
        if not l or l.startswith('#'): continue
        m = re.match(r'^===\s*(espera|nunca|referencia):\s*(.+?)\s*===$', l)
        if m:
            r = {'nombre': m.group(2)}; out[m.group(1)].append(r); continue
        m = re.match(r'^(quiénes|cuando|hay|si|palabras|exige|salvo):\s*(.*)$', l)
        if r is not None and m:
            k, v = m.groups()
            if k == 'exige': r.setdefault('exige', []).append([x.strip() for x in v.split(',') if x.strip()])   # (several lines: one or the other)
            else: r[k] = [x.strip() for x in v.split('|')] if k == 'palabras' else v if k == 'hay' else [x.strip() for x in v.split(',') if x.strip()]
    return out


REGLAS = reglas_leer(leer('src/datos/reglas.txt'))


def grupo(qs):
    s = set()
    for q in qs:
        s |= {'todos': set(gente), 'adultos': ADULTOS, 'niños': NINOS, 'casa': {k for k, g in gente.items() if g['grupo'] == 'casa'},
              'pueblo': {k for k, g in gente.items() if g['grupo'] == 'pueblo'}}.get(q, {q})
    return s & set(gente)


# ---------------------------------------------------------------- lo que cada uno le puede decir a Ana
UNIDADES = collections.defaultdict(list)   # k → [{tipo, id, texto, conds}]
q = None
for raw in leer('src/datos/frases.txt').split('\n'):
    l = raw.strip()
    m = re.match(r'^===\s*(.+?)\s*===$', l)
    if m: q = m.group(1); continue
    m = re.match(r'^(dice|primavera|verano|otoño|invierno):\s*(?:\[([^\]]+)\]\s*)?(.*)$', l)
    if q and m:
        conds = [c.strip() for c in (m.group(2) or '').split(',') if c.strip()] + ([] if m.group(1) == 'dice' else ['estacion:' + m.group(1)])
        if re.search(r'\b(Ana|Shirley)\b', m.group(3)) and q not in CONOCE_BASE: conds.append('conoce:' + q)   # (whoever does not know her does not say her name)
        UNIDADES[q].append({'tipo': 'frase' if m.group(1) == 'dice' else 'frase de ' + m.group(1), 'id': f'{q}·{m.group(3)[:40]}', 'texto': m.group(3), 'conds': conds + ['ve:' + q]})
for e in D['escenas']:
    if e['disparo'] in ('objeto', 'menu', 'comentario', 'lugar'): continue
    hablan = [x.strip() for x in e['hablan'].split(',') if x.strip()]
    con_ana = 'ana' in e['quienes'] or e['con'] or 'ana' in e['en'] or any(t.startswith('ana:') or t.startswith('?') for t in e['texto']) or re.search(r'(^|, )!?(ana:|ve:|donde:ana:)', e['si'])
    if not con_ana: continue
    quienes = (set(hablan) | set(e['quienes']) | ({e['con']} if e['con'] else set())) - {'ana', 'narra', 'carta'}
    si = [c.strip() for c in e['si'].split(',') if c.strip()]
    en = [f'donde:{x.split("=")[0]}:{x.split("=")[1]}' for x in e['en'].split(', ') if '=' in x]
    canal = [f'donde:ana:{e["canal"]}'] if e['canal'] in L else []
    for k in quienes:
        if k not in gente: continue
        tipo = {'conversar': 'conversación', 'encuentro': 'escena al encontrarse', 'primera': 'escena'}.get(e['disparo'], 'escena')
        pres = ['presente:' + h for h in hablan if h in LLEG and h != k]
        UNIDADES[k].append({'tipo': tipo, 'id': e['id'], 'texto': (e['primera'] or '')[:80], 'conds': si + en + canal + pres + ['ve:' + k], 'textos': e['texto'], 'deja': DEJA.get(e['id'], set())})
for k in gente:
    if k not in CONOCE_BASE and k not in SIN_NOMBRE:
        UNIDADES[k].append({'tipo': 'presentación', 'id': 'presenta:' + k, 'texto': '(se presenta: es la primera vez)', 'conds': ['!conoce:' + k, 've:' + k]})


def explicar(m, k, us):
    """por qué ninguna vale: lo primero que le falta a cada una (lo más común primero)"""
    falta = collections.Counter(); ej = {}
    for u in us:
        for c in u['conds']:
            if z3.is_false(m.eval(atomo(c, k), model_completion=True)):
                falta[c] += 1; ej.setdefault(c, u['texto'] or u['id']); break
    return [(c, n, ej[c]) for c, n in falta.most_common(6)]


def situacion(m, k):
    v = lambda x: m.eval(x, model_completion=True)
    d, h = v(dia).as_long(), int(float(v(hora).as_fraction()))
    est = ['primavera', 'verano', 'otoño', 'invierno'][((d - 1) // 14) % 4]
    s = {'día': d, 'estación': est, 'hora': f'{h % 24}:00', 'Ana en': NOMBRE_LUGAR[LUGARES[v(lugar('ana')).as_long()]]}
    if z3.is_true(v(B_('ana_camison'))): s['Ana'] = 'en camisón'
    elif z3.is_true(v(B_('ana_sin_sombrero'))): s['Ana'] = 'sin sombrero'
    if k: s['conoce a ' + NOMBRE.get(k, k)] = 'sí' if z3.is_true(v(conoce(k))) else 'no'
    return s


# ---------------------------------------------------------------- las preguntas
t0 = time.time()
hallazgos = {'huecos': [], 'incoherencias': [], 'imposibles': []}
todos_quienes = set(gente)
for k in list(UNIDADES):
    for u in UNIDADES[k]:
        for c in u['conds']: atomo(c, k)   # (all the variables, before the restrictions)
for e in REGLAS['espera']:
    for k in grupo(e.get('quiénes', ['todos'])):
        for c in e.get('cuando', []): atomo(c, k)
R = restricciones(todos_quienes)
base = z3.Solver(); base.add(R)
if base.check() != z3.sat:
    sys.exit('Las restricciones se contradicen: el modelo no tiene ninguna situación posible (revisar src/datos/reglas.txt).')

# 1. lo que debería haber: ¿hay una situación en que no hay nada?
for e in REGLAS['espera']:
    hay = e.get('hay', 'algo')
    for k in sorted(grupo(e.get('quiénes', ['todos']))):
        us = UNIDADES.get(k, [])
        if hay.startswith('reacción'):
            a = hay.split(None, 1)[1]
            us = [u for u in us if any(c == a or (a == 'hora' and c.startswith('hora:') and float(c.split(':')[1].split('-')[0]) >= 20) for c in u['conds'])]
        S = z3.Solver(); S.add(R); S.add(todos(e.get('cuando', []), k)); S.add(z3.Not(z3.Or([todos(u['conds'], k) for u in us])) if us else z3.BoolVal(True))
        casos = []
        while len(casos) < 4 and S.check() == z3.sat:
            m = S.model()
            casos.append({'situación': situacion(m, k), 'por qué': explicar(m, k, us)})
            # another one, different in what matters: where, when, how she is, whether they know each other
            S.add(z3.Or(lugar('ana') != m.eval(lugar('ana'), model_completion=True), estacion != m.eval(estacion, model_completion=True),
                        conoce(k) != m.eval(conoce(k), model_completion=True), B_('ana_camison') != m.eval(B_('ana_camison'), model_completion=True)))
        if casos:
            hallazgos['huecos'].append({'regla': e['nombre'], 'quien': k, 'nombre': NOMBRE.get(k, k), 'tiene': len(us), 'casos': casos})

# 2. lo que una frase supone: ¿hay una situación en que se dice sin que se cumpla?
for r in REGLAS['referencia']:
    pat = re.compile('|'.join(r'(?<!\w)' + re.escape(p) for p in r['palabras']))   # (as written: «Pasa,» is not «pasa,»)
    for k, us in UNIDADES.items():
        if k in r.get('salvo', []): continue
        for u in us:
            textos = [u['texto']] if u['tipo'].startswith('frase') else [t for t in u.get('textos', []) if t.split(':')[0] == k]
            hit = next((t for t in textos if pat.search(t)), None)
            if not hit: continue
            if any(c.startswith('hecho:') and c[6:] in u.get('deja', set()) for g in r['exige'] for c in g): continue   # (the scene that makes it happen)
            S = z3.Solver(); S.add(R); S.add(todos(u['conds'], k)); S.add(z3.Not(z3.Or([todos(g, k) for g in r['exige']])))
            if S.check() == z3.sat:
                hallazgos['incoherencias'].append({'regla': r['nombre'], 'quien': k, 'nombre': NOMBRE.get(k, k), 'tipo': u['tipo'], 'id': u['id'], 'texto': hit, 'exige': ' o '.join(', '.join(g) for g in r['exige']).replace('{k}', k), 'situación': situacion(S.model(), k)})

# 3. lo que nunca puede decirse (sus condiciones se contradicen con el mundo)
for k, us in UNIDADES.items():
    for u in us:
        S = z3.Solver(); S.add(R); S.add(todos(u['conds'], k))
        if S.check() == z3.unsat:
            hallazgos['imposibles'].append({'quien': k, 'nombre': NOMBRE.get(k, k), 'tipo': u['tipo'], 'id': u['id'], 'texto': u['texto'], 'conds': u['conds']})

seg = round(time.time() - t0, 1)
json.dump({'generado': D['generado'], 'segundos': seg, 'unidades': {k: len(v) for k, v in UNIDADES.items()}, 'variables': len(V), **hallazgos},
          open(os.path.join(RAIZ, 'trazas/modelo.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# ---------------------------------------------------------------- el informe
md = ['# El modelo de las interacciones: huecos e incoherencias', '',
      f'Lo genera `python3 tools/modelo.py` con un solucionador lógico (Z3): para cada regla de `src/datos/reglas.txt` le pregunta si existe alguna '
      f'situación posible del juego en que no se cumple, y la muestra. {len(V)} variables, {sum(len(v) for v in UNIDADES.values())} cosas que alguien le puede decir a Ana, '
      f'{seg} s. Ver `docs/MODELO_INTERACCIONES.md`.', '',
      '| Qué | Cuántos |', '|---|---|', f'| Huecos (situaciones sin nada que decir o sin reacción) | {len(hallazgos["huecos"])} |',
      f'| Incoherencias (una frase que supone algo que puede no cumplirse) | {len(hallazgos["incoherencias"])} |', f'| Frases o escenas que nunca pueden darse | {len(hallazgos["imposibles"])} |', '']
fmt = lambda s: ' · '.join(f'{a}: {b}' for a, b in s.items())
porregla = collections.OrderedDict()
for h in hallazgos['huecos']:
    porregla.setdefault(h['regla'], []).append(h)
for regla, hs in porregla.items():
    md += [f'## Hueco: {regla}', '', f'{len(hs)} persona(s): una situación posible en que no tiene nada, y lo que piden las que tiene (todas las situaciones: trazas/modelo.json).', '',
           '| Quién | Tiene | Una situación sin nada | Lo que piden las que tiene (cuántas) |', '|---|---|---|---|']
    for h in hs:
        c = h['casos'][0]
        pq = '; '.join(f'`{c_}` ({n})' for c_, n, _ in c['por qué']) or 'no tiene ninguna'
        md += [f'| {h["nombre"]} | {h["tiene"]} | {fmt(c["situación"])}' + (f' (y {len(h["casos"]) - 1} más)' if len(h['casos']) > 1 else '') + f' | {pq} |']
    md += ['']
if hallazgos['incoherencias']:
    md += ['## Incoherencias', '', '| Regla | Quién | Dónde | Frase | Exige | Se puede decir en |', '|---|---|---|---|---|---|']
    md += [f'| {h["regla"]} | {h["nombre"]} | {h["tipo"]} | {h["texto"][:70]} | `{h["exige"]}` | {fmt(h["situación"])} |' for h in hallazgos['incoherencias']] + ['']
if hallazgos['imposibles']:
    md += ['## Nunca pueden darse', '', '| Quién | Qué | Texto | Condiciones |', '|---|---|---|---|']
    md += [f'| {h["nombre"]} | {h["tipo"]} | {h["texto"][:60]} | `{", ".join(h["conds"])}` |' for h in hallazgos['imposibles']] + ['']
open(os.path.join(RAIZ, 'trazas/modelo.md'), 'w', encoding='utf-8').write('\n'.join(md))
print(f'→ trazas/modelo.md · huecos: {len(hallazgos["huecos"])} · incoherencias: {len(hallazgos["incoherencias"])} · nunca pueden darse: {len(hallazgos["imposibles"])} · {len(V)} variables · {seg} s')
