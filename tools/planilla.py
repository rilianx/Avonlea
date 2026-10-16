"""Arma planilla/avonlea.xlsx con lo que junta tools/planilla.js (trazas/planilla.json) y las frases de
src/datos/frases.txt. La hoja «Frases» se edita (y vuelve al juego con tools/importar_planilla.py); las demás son
para mirar. Las condiciones de una frase van en columnas (¿conoce a Ana?, después de, antes de, estación) y lo que
no cabe en ellas, tal cual en «Otras condiciones»."""
import json, os, re
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.formatting.rule import CellIsRule, FormulaRule
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.utils import get_column_letter

RAIZ = os.path.join(os.path.dirname(__file__), '..')
D = json.load(open(os.path.join(RAIZ, 'trazas/planilla.json'), encoding='utf-8'))
G = D['grafo']
TIPOS = ['dice', 'ana', 'primavera', 'verano', 'otoño', 'invierno']
ESTACIONES = ['primavera', 'verano', 'otoño', 'invierno']
FONT = 'Arial'
F_NORMAL, F_BOLD = Font(name=FONT, size=10), Font(name=FONT, size=10, bold=True)
F_TITULO, F_GRIS = Font(name=FONT, size=14, bold=True), Font(name=FONT, size=10, color='808080')
F_BLANCO = Font(name=FONT, size=10, bold=True, color='FFFFFF')
FILL_HEAD = PatternFill('solid', fgColor='6B4A30')
FILL_EDIT = PatternFill('solid', fgColor='FFF8DC')
FILL_SUB = PatternFill('solid', fgColor='EFE2C4')
FILL_ROJO, FILL_AMAR, FILL_VERDE, FILL_GRIS = (PatternFill('solid', fgColor=c) for c in ('F4B6A8', 'FBE3A0', 'C9E4B8', 'E4E4E4'))
LINEA = Side(style='thin', color='D9C6A0')
BORDE = Border(left=LINEA, right=LINEA, top=LINEA, bottom=LINEA)
WRAP = Alignment(wrap_text=True, vertical='top')


def frases_leer(path):
    """[(quien, tipo, texto, [condiciones])] en el orden del archivo"""
    out, q = [], None
    for raw in open(path, encoding='utf-8'):
        l = raw.strip()
        if not l or l.startswith('#'):
            continue
        m = re.match(r'^===\s*(.+?)\s*===$', l)
        if m:
            q = m.group(1); continue
        m = re.match(r'^(dice|ana|primavera|verano|otoño|invierno):\s*(.*)$', l)
        if not (q and m):
            continue
        texto, conds = m.group(2), []
        c = re.match(r'^\[([^\]]+)\]\s*(.*)$', texto)
        if c:
            conds, texto = [x.strip() for x in c.group(1).split(',') if x.strip()], c.group(2)
        out.append((q, m.group(1), texto, conds))
    return out


def separar(quien, conds):
    """las condiciones de una frase, en columnas: ¿conoce?, después de, días, antes de, estación, otras"""
    conoce = despues = dias = antes = estacion = ''
    otras = []
    for c in conds:
        if c == f'conoce:{quien}' and not conoce:
            conoce = 'sí'
        elif c == f'!conoce:{quien}' and not conoce:
            conoce = 'no'
        elif not despues and (m := re.match(r'^(hecho|cuaderno):(\w+)$', c)):
            despues = m.group(2)
        elif not despues and (m := re.match(r'^dias_desde:(\w+):(\d+)$', c)):
            despues, dias = m.group(1), int(m.group(2))
        elif not antes and (m := re.match(r'^!(hecho|cuaderno):(\w+)$', c)):
            antes = m.group(2)
        elif not estacion and (m := re.match(r'^estacion:(\S+)$', c)):
            estacion = m.group(1)
        else:
            otras.append(c)
    return conoce, despues, dias, antes, estacion, ', '.join(otras)


def encabezado(ws, fila, titulos, anchos):
    for i, (t, w) in enumerate(zip(titulos, anchos), 1):
        c = ws.cell(row=fila, column=i, value=t)
        c.font, c.fill, c.alignment, c.border = F_BLANCO, FILL_HEAD, Alignment(wrap_text=True, vertical='center'), BORDE
        ws.column_dimensions[get_column_letter(i)].width = w
    ws.row_dimensions[fila].height = 30


def tabla(ws, filas, desde=2, wrap_cols=()):
    for r, fila in enumerate(filas, desde):
        for c, v in enumerate(fila, 1):
            cell = ws.cell(row=r, column=c, value=v)
            cell.font, cell.border = F_NORMAL, BORDE
            cell.alignment = WRAP if c in wrap_cols else Alignment(vertical='top')


wb = Workbook()
gente = D['gente']
ids = [g['id'] for g in gente]

# --- Listas (escondida): lo que se puede elegir en los desplegables
L = wb.active; L.title = 'Listas'
hechos_y_metas = sorted(set([h for h in G['hechos'] if not h.startswith('conoce_')] + G['metas'] + [h for h in G['piden'] if not h.startswith('conoce_')]))
columnas = {'A': ('Quién', ids), 'B': ('Tipo', TIPOS), 'C': ('¿Conoce a Ana?', ['sí', 'no']), 'D': ('Estación', ESTACIONES), 'E': ('Hechos y metas', hechos_y_metas)}
for col, (t, vals) in columnas.items():
    L[f'{col}1'] = t; L[f'{col}1'].font = F_BOLD
    for i, v in enumerate(vals, 2):
        L[f'{col}{i}'] = v; L[f'{col}{i}'].font = F_NORMAL
rango = {col: f"Listas!${col}$2:${col}${len(vals) + 1}" for col, (t, vals) in columnas.items()}

# --- Personas
P = wb.create_sheet('Personas')
encabezado(P, 1, ['Quién (id)', 'Nombre', 'Grupo', 'Vive en', 'Llega a Avonlea si…', 'Se va si…', 'Frases', 'Quién es'], [12, 26, 9, 22, 34, 24, 8, 70])
lleg = {l['id']: l for l in D['llegadas']}
filas = []
for i, g in enumerate(gente, 2):
    l = lleg.get(g['id'], {})
    filas.append([g['id'], g['nombre'], g['grupo'], g['vive'], ('(de visita) ' if l.get('visita') else '') + (l.get('llega') or ''), l.get('seVa') or '', f'=COUNTIF(Frases!$A:$A,A{i})', g['ficha']])
tabla(P, filas, wrap_cols=(8,))
P.freeze_panes = 'B2'; P.auto_filter.ref = f'A1:H{len(filas) + 1}'

# --- Frases (la que se edita)
F = wb.create_sheet('Frases', 0)
cab = ['Quién', 'Nombre', 'Tipo', 'Frase', '¿Conoce a Ana?', 'Después de (hecho o meta)', 'Días después', 'Antes de (hecho o meta)', 'Estación', 'Otras condiciones']
encabezado(F, 1, cab, [12, 24, 10, 70, 10, 24, 9, 22, 11, 40])
frases = frases_leer(os.path.join(RAIZ, 'src/datos/frases.txt'))
for r, (q, tipo, texto, conds) in enumerate(frases, 2):
    conoce, despues, dias, antes, est, otras = separar(q, conds)
    vals = [q, f'=IFERROR(INDEX(Personas!$B:$B,MATCH(A{r},Personas!$A:$A,0)),"(¿quién?)")', tipo, texto, conoce, despues, dias if dias != '' else None, antes, est, otras]
    for c, v in enumerate(vals, 1):
        cell = F.cell(row=r, column=c, value=v)
        cell.font, cell.border = F_NORMAL, BORDE
        cell.alignment = WRAP if c in (4, 10) else Alignment(vertical='top')
        if c != 2:
            cell.fill = FILL_EDIT
ultima = 2000   # (room for new rows: the lists and the name reach that far)
for r in range(len(frases) + 2, ultima + 1):
    F.cell(row=r, column=2, value=f'=IF(A{r}="","",IFERROR(INDEX(Personas!$B:$B,MATCH(A{r},Personas!$A:$A,0)),"(¿quién?)"))').font = F_GRIS
for col, rg, estilo, msg in [('A', rango['A'], 'stop', 'Elige a alguien de la lista (hoja Personas).'), ('C', rango['B'], 'stop', 'dice, ana (lo que contesta Ana), o una estación.'),
                             ('E', rango['C'], 'stop', 'sí, no, o vacío (da igual).'), ('F', rango['E'], 'warning', 'No es un hecho ni una meta que exista (¿está bien escrito?).'),
                             ('H', rango['E'], 'warning', 'No es un hecho ni una meta que exista (¿está bien escrito?).'), ('I', rango['D'], 'stop', 'primavera, verano, otoño o invierno.')]:
    dv = DataValidation(type='list', formula1=f'={rg}', allow_blank=True, errorStyle=estilo, error=msg, errorTitle='Avonlea', showErrorMessage=True)
    dv.add(f'{col}2:{col}{ultima}'); F.add_data_validation(dv)
dvn = DataValidation(type='whole', operator='between', formula1='0', formula2='400', allow_blank=True, error='Un número de días (0 a 400).', errorTitle='Avonlea', showErrorMessage=True)
dvn.add(f'G2:G{ultima}'); F.add_data_validation(dvn)
F.conditional_formatting.add(f'B2:B{ultima}', FormulaRule(formula=['B2="(¿quién?)"'], fill=FILL_ROJO))
F.conditional_formatting.add(f'G2:G{ultima}', FormulaRule(formula=['AND(G2<>"",F2="")'], fill=FILL_ROJO))
F.freeze_panes = 'D2'; F.auto_filter.ref = f'A1:J{ultima}'

# --- Huecos (para mirar): cuántas frases valen de cada uno en cada momento, si no la conoce y si ya la conoce
H = wb.create_sheet('Huecos', 1)
H['A1'] = 'Dónde faltan frases: cuántas frases valen de cada uno en cada momento de la historia'; H['A1'].font = F_TITULO
H['A2'] = ('«no la conoce»: lo que puede decirle antes de presentarse (sin su nombre); «la conoce»: después. Rojo: ninguna; amarillo: una; '
           'verde: dos o más; gris: no está en Avonlea (o, «—», ya la conoce desde el principio). Se calcula con el juego: después de editar las '
           'frases, importa y vuelve a generar la planilla para ver los huecos al día.')
H['A2'].font = F_GRIS; H['A2'].alignment = WRAP; H.merge_cells('A2:R2'); H.row_dimensions[2].height = 42
fila0 = 4
H.cell(row=fila0, column=1, value='Quién').font = F_BLANCO
H.cell(row=fila0, column=2, value='Nombre').font = F_BLANCO
for c in (1, 2):
    H.cell(row=fila0, column=c).fill = FILL_HEAD; H.merge_cells(start_row=fila0, start_column=c, end_row=fila0 + 1, end_column=c)
H.column_dimensions['A'].width, H.column_dimensions['B'].width = 12, 26
for i, m in enumerate(D['momentos']):
    c = 3 + 2 * i
    cell = H.cell(row=fila0, column=c, value=m['titulo']); cell.font, cell.fill, cell.alignment = F_BLANCO, FILL_HEAD, Alignment(wrap_text=True, horizontal='center')
    H.merge_cells(start_row=fila0, start_column=c, end_row=fila0, end_column=c + 1)
    for j, t in enumerate(['no la conoce', 'la conoce']):
        s = H.cell(row=fila0 + 1, column=c + j, value=t); s.font, s.fill, s.alignment = F_BOLD, FILL_SUB, Alignment(horizontal='center', wrap_text=True)
        H.column_dimensions[get_column_letter(c + j)].width = 9
H.row_dimensions[fila0].height = 44
for r, g in enumerate(gente, fila0 + 2):
    H.cell(row=r, column=1, value=g['id']).font = F_NORMAL
    H.cell(row=r, column=2, value=g['nombre']).font = F_NORMAL
    for i, m in enumerate(D['momentos']):
        v = D['huecos'][m['id']].get(g['id'], {})
        for j, k in enumerate(['sin', 'con']):
            cell = H.cell(row=r, column=3 + 2 * i + j)
            cell.font, cell.border, cell.alignment = F_NORMAL, BORDE, Alignment(horizontal='center')
            if v.get('fuera'):
                cell.value, cell.fill = 'fuera', FILL_GRIS
            elif v.get(k) is None:
                cell.value, cell.fill = '—', FILL_GRIS
            else:
                cell.value = v[k]
fin_col = get_column_letter(2 + 2 * len(D['momentos'])); fin = fila0 + 1 + len(gente)
area = f'C{fila0 + 2}:{fin_col}{fin}'
H.conditional_formatting.add(area, CellIsRule(operator='equal', formula=['0'], fill=FILL_ROJO))
H.conditional_formatting.add(area, CellIsRule(operator='equal', formula=['1'], fill=FILL_AMAR))
H.conditional_formatting.add(area, CellIsRule(operator='greaterThanOrEqual', formula=['2'], fill=FILL_VERDE))
H.freeze_panes = H.cell(row=fila0 + 2, column=3)
tot = fin + 2
H.cell(row=tot, column=2, value='Huecos (casillas en 0)').font = F_BOLD
for i in range(2 * len(D['momentos'])):
    col = get_column_letter(3 + i)
    c = H.cell(row=tot, column=3 + i, value=f'=COUNTIF({col}{fila0 + 2}:{col}{fin},0)'); c.font, c.alignment = F_BOLD, Alignment(horizontal='center')

# --- Escenas, Noticias, Llegadas: se editan (los campos de cada bloque, en columnas; tools/bloques.py dice cuál va dónde)
import sys
sys.path.insert(0, os.path.dirname(__file__))
import bloques as B
info = {e['id']: e for e in D['escenas']}
for hoja, H_ in B.HOJAS.items():
    ws = wb.create_sheet(hoja)
    extra = [('Hablan', 20), ('Líneas', 7), ('Empieza con', 50)] if hoja == 'Escenas' else []
    cols = [(H_['id'], 22)] + [(t, w) for _, t, w in H_['columnas']] + ([H_['otros']] if H_['otros'] else []) + extra
    encabezado(ws, 1, [c[0] for c in cols], [c[1] for c in cols])
    partes = B.partir(open(os.path.join(RAIZ, H_['archivo']), encoding='utf-8').read())
    r = 1
    for p_ in partes:
        if p_[0] != 'bloque':
            continue
        r += 1
        fila = [p_[1]] + B.a_celdas(hoja, B.campos(p_[2], H_['clasificar']))
        n_edit = len(fila)
        if hoja == 'Escenas':
            e = info.get(p_[1], {})
            fila += [e.get('hablan', ''), e.get('lineas', ''), e.get('primera', '')]
        for c, v in enumerate(fila, 1):
            cell = ws.cell(row=r, column=c, value=(int(v) if isinstance(v, str) and v.isdigit() and c > 1 and cols[c - 1][0] in ('Prioridad', 'Se cuenta por (días)') else (v if v != '' else None)))
            cell.font, cell.border, cell.alignment = F_NORMAL, BORDE, WRAP
            if 1 < c <= n_edit or (c == 1 and H_['nuevas']):
                cell.fill = FILL_EDIT
            elif c > n_edit:
                cell.font = F_GRIS
    ws.freeze_panes = 'B2'; ws.auto_filter.ref = f'A1:{get_column_letter(len(cols))}{max(r, 2)}'
    if hoja == 'Escenas':
        for col, lista_ in (('E', '"sí"'), ('F', '"sí"')):
            dv = DataValidation(type='list', formula1=lista_, allow_blank=True); dv.add(f'{col}2:{col}{r}'); ws.add_data_validation(dv)
    if hoja == 'Llegadas':
        dv = DataValidation(type='list', formula1='"sí"', allow_blank=True); dv.add(f'B2:B{r + 200}'); ws.add_data_validation(dv)
    if hoja == 'Noticias':
        dv = DataValidation(type='list', formula1='"sí"', allow_blank=True); dv.add(f'E2:E{r + 200}'); ws.add_data_validation(dv)

# --- Diálogos (para leer): las líneas de cada escena del guion, con sus elecciones
DI = wb.create_sheet('Diálogos')
encabezado(DI, 1, ['Escena', 'Quién', 'Qué dice (o hace)'], [26, 14, 110])
filas, gris = [], []
for p_ in B.partir(open(os.path.join(RAIZ, 'src/datos/guion.txt'), encoding='utf-8').read()):
    if p_[0] != 'bloque' or not p_[3]:
        continue
    for l in p_[3][1:]:
        s_ = l.strip()
        if not s_ or s_.startswith('#'):
            continue
        sangria = l.startswith((' ', '\t'))
        if s_.startswith('->'):
            filas.append([p_[1], '→ elige', ('(propia) ' if s_.startswith('->*') else '') + s_.lstrip('->* ').strip()])
        elif s_.startswith('!'):
            filas.append([p_[1], ('    ' if sangria else '') + '(acción)', s_[1:].strip()]); gris.append(len(filas))
        else:
            q, _, t = s_.partition(':')
            filas.append([p_[1], ('    ' if sangria else '') + q.strip(), t.strip()])
tabla(DI, filas, wrap_cols=(3,))
for i in gris:
    for c in (2, 3):
        DI.cell(row=i + 1, column=c).font = F_GRIS
DI.freeze_panes = 'B2'; DI.auto_filter.ref = f'A1:C{len(filas) + 1}'

HE = wb.create_sheet('Hechos')
encabezado(HE, 1, ['Hecho', 'Lo dejan', 'Lo piden', 'Estado'], [26, 60, 60, 24])
todos = sorted(set(G['hechos']) | set(G['piden']))
filas = []
for h in todos:
    estado = 'nunca pasa (nada lo deja)' if h in G['nunca'] else 'nadie lo lee' if h in G['sinUso'] else ''
    filas.append([h, ', '.join(G['hechos'].get(h, [])), ', '.join(G['piden'].get(h, [])), estado])
tabla(HE, filas, wrap_cols=(2, 3))
HE.conditional_formatting.add(f'D2:D{len(filas) + 1}', FormulaRule(formula=['LEFT(D2,5)="nunca"'], fill=FILL_ROJO))
HE.conditional_formatting.add(f'D2:D{len(filas) + 1}', FormulaRule(formula=['LEFT(D2,5)="nadie"'], fill=FILL_AMAR))
HE.freeze_panes = 'B2'; HE.auto_filter.ref = f'A1:D{len(filas) + 1}'

if D['metas']:
    ME = wb.create_sheet('Metas')
    encabezado(ME, 1, ['Grupo', 'Meta', 'Qué es', 'Requiere', 'Pista'], [16, 18, 34, 30, 70])
    tabla(ME, [[m['grupo'], m['id'], m['titulo'], m['requiere'], m['pista']] for m in D['metas']], wrap_cols=(3, 5))

# --- Cobertura (para revisar qué falta): tools/cobertura.py; también trazas/cobertura.md
import cobertura
COB = cobertura.analizar(D, RAIZ)
cobertura.escribir_md(COB, RAIZ, D['generado'])
CO = wb.create_sheet('Cobertura', 1)
encabezado(CO, 1, ['Prioridad', 'Área', 'Qué', 'Falta', 'Idea'], [9, 16, 44, 60, 60])
tabla(CO, COB, wrap_cols=(3, 4, 5))
CO.freeze_panes = 'C2'; CO.auto_filter.ref = f'A1:E{len(COB) + 1}'
CO.conditional_formatting.add(f'A2:A{len(COB) + 1}', FormulaRule(formula=['A2="alta"'], fill=FILL_ROJO))
CO.conditional_formatting.add(f'A2:A{len(COB) + 1}', FormulaRule(formula=['A2="media"'], fill=FILL_AMAR))

# --- Modelo (tools/modelo.py, si se corrió): los huecos y las incoherencias que encontró el solucionador
pm = os.path.join(RAIZ, 'trazas/modelo.json')
if os.path.exists(pm):
    MO = json.load(open(pm, encoding='utf-8'))
    MD = wb.create_sheet('Modelo', 1)
    encabezado(MD, 1, ['Clase', 'Regla', 'Quién', 'Tiene', 'Una situación', 'Lo que falta'], [12, 34, 22, 7, 60, 60])
    filas = []
    sit = lambda s_: ' · '.join(f'{a}: {b}' for a, b in s_.items())
    for h in MO['huecos']:
        c = h['casos'][0]
        filas.append(['hueco', h['regla'], h['nombre'], h['tiene'], sit(c['situación']), '; '.join(f'{a} ({n})' for a, n, _ in c['por qué']) or 'no tiene ninguna'])
    for h in MO['incoherencias']:
        filas.append(['incoherencia', h['regla'], h['nombre'], h['tipo'], sit(h['situación']), f'«{h["texto"][:80]}» exige {h["exige"]}'])
    for h in MO['imposibles']:
        filas.append(['nunca se da', '', h['nombre'], h['tipo'], '', f'«{h["texto"][:60]}»: {", ".join(h["conds"])}'])
    tabla(MD, filas, wrap_cols=(5, 6))
    MD.freeze_panes = 'C2'; MD.auto_filter.ref = f'A1:F{len(filas) + 1}'
    MD.conditional_formatting.add(f'A2:A{len(filas) + 1}', FormulaRule(formula=['A2="incoherencia"'], fill=FILL_ROJO))

# --- Cómo usar (la primera hoja)
C = wb.create_sheet('Cómo usar', 0)
C.column_dimensions['A'].width = 120
texto = [
    ('Planilla de Avonlea', F_TITULO),
    (f'Generada el {D["generado"]} desde los datos del juego (node tools/planilla.js).', F_GRIS),
    ('', None),
    ('Qué se edita (las celdas amarillas claras)', F_BOLD),
    ('• «Frases»: lo que dice cada uno al pasar. Una fila por frase: quién, el tipo (dice / ana / una estación), el texto y cuándo vale.', F_NORMAL),
    ('    ¿Conoce a Ana?: sí (solo después de presentarse), no (solo antes), o vacío. «Después de»: un hecho o una meta (lista); con «Días después», desde N días después.', F_NORMAL),
    ('    «Antes de»: solo mientras ese hecho o meta no pasó. «Estación»: solo esa estación. «Otras condiciones»: cualquier otra, tal cual, con comas.', F_NORMAL),
    ('    Para agregar una frase, una fila nueva al final; para quitarla, borra la fila.', F_NORMAL),
    ('• «Escenas»: cuándo empieza cada escena del guion y qué deja (canal, prioridad, condiciones, dónde, quiénes, el cartel, las acciones al empezar y al terminar).', F_NORMAL),
    ('    Los campos que se repiten (por ejemplo, «Al terminar») van uno por línea dentro de la celda (Alt+Enter). Lo que dicen está en la hoja «Diálogos» y se edita en src/datos/guion.txt.', F_NORMAL),
    ('    Las escenas nuevas se escriben en src/datos/guion.txt (con sus líneas); aquí se cambian las que hay.', F_NORMAL),
    ('• «Noticias»: quién sabe cada noticia, a quién le llega, cuánto se cuenta, cómo se cuenta y sus versiones exageradas. Una fila nueva es una noticia nueva.', F_NORMAL),
    ('• «Llegadas»: cuándo llega y se va cada uno (una alternativa por línea), si viene de visita, y lo que queda en el diario. Una fila nueva es alguien que llega.', F_NORMAL),
    ('', None),
    ('Ejemplos', F_BOLD),
    ('Frases · harrison · dice · «¿Esa vaca tuya se ha portado bien hoy?» · Después de: conoce_harrison · Días después: 3 → desde tres días después de conocer a Ana.', F_NORMAL),
    ('Escenas · marilla_sabe_camison_descalza · Si…: sabe:marilla:ana_en_camison:2, ve:marilla → cuando a Marilla le llegó el chisme agrandado, y ve a Ana.', F_NORMAL),
    ('Llegadas · stacy · Llega si…: estacion:otoño, hecho:se_fue_phillips → el otoño después de que se fue el Sr. Phillips.', F_NORMAL),
    ('', None),
    ('Cómo vuelve al juego', F_BOLD),
    ('1. Guarda la planilla (como .xlsx, con el mismo nombre: planilla/avonlea.xlsx).', F_NORMAL),
    ('2. python3 tools/importar_planilla.py — revisa cada fila de cada hoja; si algo está mal, no cambia nada y dice la hoja y la fila. Si todo está bien, escribe los', F_NORMAL),
    ('    archivos de src/datos/ (en su lugar: los comentarios y los diálogos quedan), compila el juego y lo abre para ver que carga; si no, vuelve todo atrás.', F_NORMAL),
    ('3. node tools/planilla.js — la planilla al día (con los huecos recalculados).', F_NORMAL),
    ('', None),
    ('Para mirar', F_BOLD),
    ('• «Huecos»: cada personaje en cada momento de la historia, cuántas frases tiene si todavía no conoce a Ana y si ya la conoce. Rojo = ninguna.', F_NORMAL),
    ('• «Diálogos»: lo que se dice en cada escena, con las elecciones de Ana (→ elige) y lo que pasa (acción).', F_NORMAL),
    ('• «Personas», «Hechos» (quién deja y quién pide cada hecho; rojo: nunca pasa; amarillo: nadie lo lee), «Metas» (el cuaderno de Ana).', F_NORMAL),
]
for i, (t, f) in enumerate(texto, 1):
    c = C.cell(row=i, column=1, value=t); c.alignment = Alignment(wrap_text=True)
    if f:
        c.font = f
L.sheet_state = 'hidden'
for ws in wb.worksheets:
    if ws.title not in ('Frases', 'Cómo usar', 'Listas', 'Escenas', 'Noticias', 'Llegadas', 'Cobertura', 'Modelo'):
        ws.protection.sheet = True; ws.protection.autoFilter = False; ws.protection.sort = False
os.makedirs(os.path.join(RAIZ, 'planilla'), exist_ok=True)
salida = os.path.join(RAIZ, 'planilla/avonlea.xlsx')
wb.save(salida)
huecos = sum(1 for m in D['momentos'] for g in gente for k in ('sin', 'con') if D['huecos'][m['id']].get(g['id'], {}).get(k) == 0)
print(f'→ trazas/cobertura.md · {len(COB)} pendientes')
print(f'→ planilla/avonlea.xlsx · {len(frases)} frases de {len(set(f[0] for f in frases))} personas · {len(D["escenas"])} escenas · {len(D["noticias"])} noticias · huecos: {huecos} casillas en 0')
