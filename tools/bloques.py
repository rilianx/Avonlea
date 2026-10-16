"""Los archivos de datos por bloques («=== id ===» y sus campos, uno por línea): guion.txt (la cabecera de cada escena,
hasta «---»), noticias.txt y llegadas.txt. Para la planilla: leerlos como filas, y escribir los cambios en su lugar,
sin tocar los comentarios, el orden de los campos ni (en el guion) las líneas de cada escena."""
import re

BLOQUE = re.compile(r'^===\s*(.+?)\s*===$')


def partir(texto):
    """[('texto', [líneas]) | ('bloque', id, [cabecera], [cuerpo])]: la cabecera llega hasta «---» (o hasta el bloque
    siguiente); los comentarios y líneas vacías del final de un bloque quedan para el que sigue (son su presentación)"""
    lineas = texto.split('\n')
    partes, actual = [], None
    suelto = []
    for l in lineas:
        m = BLOQUE.match(l.strip())
        if m:
            if actual:
                partes.append(actual)
            if suelto:
                partes.append(('texto', suelto)); suelto = []
            actual = ['bloque', m.group(1), [l], [], False]
            continue
        if actual is None:
            suelto.append(l); continue
        if actual[4]:
            actual[3].append(l)
        elif l.strip() == '---':
            actual[4] = True; actual[3].append(l)
        else:
            actual[2].append(l)
    if actual:
        partes.append(actual)
    if suelto:
        partes.append(('texto', suelto))
    out = []
    for p in partes:
        if p[0] == 'texto':
            out.append(p); continue
        _, id_, cab, cuerpo, _sep = p
        cola = []
        zona = cuerpo if cuerpo else cab   # (the trailing comments and blank lines: of the next block)
        while len(zona) > (1 if zona is cab else 0) and (not zona[-1].strip() or zona[-1].strip().startswith('#')):
            cola.insert(0, zona.pop())
        out.append(('bloque', id_, cab, cuerpo))
        if cola:
            out.append(('texto', cola))
    return out


def juntar(partes):
    lineas = []
    for p in partes:
        if p[0] == 'texto':
            lineas += p[1]
        else:
            lineas += p[2] + p[3]
    return '\n'.join(lineas)


def campos(cab, clasificar):
    """[(clave, valor)] de la cabecera de un bloque (sin la línea «=== id ===» ni los comentarios)"""
    out = []
    for l in cab[1:]:
        s = l.strip()
        if not s or s.startswith('#'):
            continue
        kv = clasificar(s)
        if kv:
            out.append(kv)
    return out


def actualizar(cab, nuevos, clasificar, escribir):
    """la cabecera con los campos nuevos ([(clave, valor)]) en el lugar de los viejos: cada clave donde estaba la primera
    vez (todas sus líneas juntas), las que ya no están se van, las nuevas al final; los comentarios quedan"""
    por_clave = {}
    for k, v in nuevos:
        por_clave.setdefault(k, []).append(v)
    out, puestas = [cab[0]], set()
    for l in cab[1:]:
        s = l.strip()
        kv = clasificar(s) if s and not s.startswith('#') else None
        if not kv:
            out.append(l); continue
        k = kv[0]
        if k in puestas:
            continue
        puestas.add(k)
        for v in por_clave.get(k, []):
            out.append(escribir(k, v))
    for k, vs in por_clave.items():
        if k not in puestas:
            out += [escribir(k, v) for v in vs]
    return out


# --- el guion: la cabecera de cada escena
BANDERAS = ('interrumpe', 'grande', 'tambien', 'al_paso')


def guion_clasificar(s):
    if s in BANDERAS:
        return (s, 'sí')
    i = s.find(':')
    if i < 0:
        return (s, 'sí')
    return (s[:i].strip(), s[i + 1:].strip())


def guion_escribir(k, v):
    return k if k in BANDERAS else f'{k}: {v}'


# --- las noticias
def noticias_clasificar(s):
    m = re.match(r'^saben si (.+?):\s+(.*)$', s)
    if m:
        return ('saben si', f'{m.group(1)}: {m.group(2)}')
    m = re.match(r'^llega a (\S+) en:\s*(.*)$', s)
    if m:
        return ('llega a', f'{m.group(1)}: {m.group(2)}')
    m = re.match(r'^dice (\S+):\s*(.*)$', s)
    if m:
        return ('dice de', f'{m.group(1)}: {m.group(2)}')
    m = re.match(r'^(titulo|saben|al conocer a ana|se cuenta por|dice|exagerada|responde):\s*(.*)$', s)
    return (m.group(1), m.group(2)) if m else None


def noticias_escribir(k, v):
    if k == 'saben si':
        c, q = re.match(r'^(.+?):\s+(.*)$', v).groups(); return f'saben si {c}: {q}'
    if k == 'llega a':
        q, h = v.split(':', 1); return f'llega a {q.strip()} en: {h.strip()}'
    if k == 'dice de':
        q, t = v.split(':', 1); return f'dice {q.strip()}: {t.strip()}'
    return f'{k}: {v}'


# --- las llegadas
def llegadas_clasificar(s):
    m = re.match(r'^(llega si|se va si|de visita|al llegar|al irse):\s*(.*)$', s)
    return (m.group(1), m.group(2)) if m else None


def llegadas_escribir(k, v):
    return f'{k}: {v}'


# --- las hojas editables de la planilla: qué campo va en qué columna (los que se repiten: una línea cada uno en la celda)
HOJAS = {
    'Escenas': {'archivo': 'src/datos/guion.txt', 'id': 'Escena', 'clasificar': guion_clasificar, 'escribir': guion_escribir, 'nuevas': False,
                'columnas': [('canal', 'Canal', 10), ('disparo', 'Cómo empieza', 11), ('prioridad', 'Prioridad', 8), ('interrumpe', 'Interrumpe', 9),
                             ('grande', 'Grande', 7), ('repetir', 'Se repite', 10), ('si', 'Si… (condiciones, con comas)', 44),
                             ('en', 'Dónde está cada uno (en)', 22), ('sujeta', 'Quedan quietos', 16), ('narra', 'Narra (el cartel)', 40),
                             ('al_empezar', 'Al empezar (una acción por línea)', 30), ('al_terminar', 'Al terminar (una acción por línea)', 40)],
                'otros': ('Otros campos (uno por línea)', 30)},
    'Noticias': {'archivo': 'src/datos/noticias.txt', 'id': 'Noticia', 'clasificar': noticias_clasificar, 'escribir': noticias_escribir, 'nuevas': True,
                 'columnas': [('titulo', 'Qué es', 34), ('saben', 'La saben desde el principio', 20), ('saben si', 'La saben desde que… (condiciones: quiénes)', 36),
                              ('al conocer a ana', 'Al conocer a Ana', 10), ('llega a', 'Le llega a (quién: horas)', 14), ('se cuenta por', 'Se cuenta por (días)', 10),
                              ('dice', 'Cómo se cuenta', 48), ('dice de', 'Cómo la cuenta cada uno (quién: texto)', 44),
                              ('exagerada', 'Versiones exageradas (una por línea, en orden)', 48), ('responde', 'Respuestas', 34)],
                 'otros': None},
    'Llegadas': {'archivo': 'src/datos/llegadas.txt', 'id': 'Quién', 'clasificar': llegadas_clasificar, 'escribir': llegadas_escribir, 'nuevas': True,
                 'columnas': [('de visita', 'De visita', 9), ('llega si', 'Llega si… (una alternativa por línea)', 40), ('se va si', 'Se va si… (una por línea)', 30),
                              ('al llegar', 'Al llegar (diario)', 44), ('al irse', 'Al irse (diario)', 44)],
                 'otros': None},
}


def a_celdas(hoja, pares):
    """los campos de un bloque → los valores de sus columnas (y «otros»)"""
    H = HOJAS[hoja]; claves = [c[0] for c in H['columnas']]
    celdas = {k: [] for k in claves}; otros = []
    for k, v in pares:
        if k in celdas:
            celdas[k].append(v)
        else:
            otros.append(H['escribir'](k, v))
    fila = ['\n'.join(celdas[k]) for k in claves]
    if H['otros']:
        fila.append('\n'.join(otros))
    return fila


def de_celdas(hoja, valores):
    """los valores de las columnas de una fila → [(clave, valor)]"""
    H = HOJAS[hoja]; pares = []
    for (k, _, _), v in zip(H['columnas'], valores):
        for linea in str(v or '').split('\n'):
            if linea.strip():
                pares.append((k, linea.strip()))
    if H['otros']:
        for linea in str(valores[len(H['columnas'])] or '').split('\n'):
            if linea.strip():
                kv = H['clasificar'](linea.strip())
                if kv:
                    pares.append(kv)
    return pares
