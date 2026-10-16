"""Lleva la hoja «Frases» de planilla/avonlea.xlsx al juego (src/datos/frases.txt).
Revisa cada fila (quién, tipo, texto, condiciones) y, si algo está mal, no cambia nada y dice en qué fila. Después
compila el juego (node tools/build.js): si el revisor de la historia (tools/grafo.js) encuentra una condición mal
escrita en una frase, vuelve atrás.
Uso: python3 tools/importar_planilla.py [planilla/avonlea.xlsx]"""
import json, os, re, shutil, subprocess, sys
from openpyxl import load_workbook

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
XLSX = sys.argv[1] if len(sys.argv) > 1 else os.path.join(RAIZ, 'planilla/avonlea.xlsx')
FRASES = os.path.join(RAIZ, 'src/datos/frases.txt')
TIPOS = ['dice', 'ana', 'primavera', 'verano', 'otoño', 'invierno']
ESTACIONES = ['primavera', 'verano', 'otoño', 'invierno']
grafo = json.load(open(os.path.join(RAIZ, 'trazas/grafo.json'), encoding='utf-8'))
metas = set(grafo['metas'])

wb = load_workbook(XLSX)   # (the formulas of «Nombre» are not needed: only what was typed)
ws, P = wb['Frases'], wb['Personas']
quienes = [P.cell(row=r, column=1).value for r in range(2, P.max_row + 1) if P.cell(row=r, column=1).value]
cab = [ws.cell(row=1, column=c).value for c in range(1, 11)]
esperado = ['Quién', 'Nombre', 'Tipo', 'Frase', '¿Conoce a Ana?', 'Después de (hecho o meta)', 'Días después', 'Antes de (hecho o meta)', 'Estación', 'Otras condiciones']
if cab != esperado:
    sys.exit('La hoja «Frases» no tiene las columnas de siempre (¿se movió o renombró alguna?):\n  ' + ' | '.join(map(str, cab)))

texto = lambda v: '' if v is None else str(v).strip()
errores, por_quien, orden = [], {}, []
for r in range(2, ws.max_row + 1):
    q, tipo, frase, conoce, despues, dias, antes, est, otras = (texto(ws.cell(row=r, column=c).value) for c in (1, 3, 4, 5, 6, 7, 8, 9, 10))
    if not any((q, tipo, frase, conoce, despues, dias, antes, est, otras)):
        continue   # (an empty row)
    malo = lambda m: errores.append(f'fila {r}: {m}')
    if q not in quienes: malo(f'«{q}» no es nadie del juego (hoja Personas)')
    if tipo not in TIPOS: malo(f'el tipo «{tipo}» no existe (dice, ana, o una estación)')
    if not frase: malo('la frase está vacía')
    if '[' in frase or ']' in frase or '\n' in frase: malo('la frase no puede tener corchetes ni saltos de línea')
    if conoce not in ('', 'sí', 'no'): malo(f'«¿Conoce a Ana?» debe ser sí, no o vacío (dice «{conoce}»)')
    if est and est not in ESTACIONES: malo(f'la estación «{est}» no existe')
    if dias and not despues: malo('hay «Días después» pero no «Después de»')
    if dias and not re.fullmatch(r'\d+(\.0)?', dias): malo(f'«Días después» debe ser un número (dice «{dias}»)')
    for nombre, v in (('Después de', despues), ('Antes de', antes)):
        if v and not re.fullmatch(r'\w+', v): malo(f'«{nombre}»: «{v}» debe ser un solo nombre de hecho o meta, sin espacios')
    conds = []
    if conoce: conds.append(('' if conoce == 'sí' else '!') + 'conoce:' + q)
    if despues:
        if dias and re.fullmatch(r'\d+(\.0)?', dias): conds.append(f'dias_desde:{despues}:{int(float(dias))}')
        elif dias: pass   # (already told: not a number)
        else: conds.append(('cuaderno:' if despues in metas and despues not in grafo['hechos'] else 'hecho:') + despues)
    if antes: conds.append('!' + ('cuaderno:' if antes in metas and antes not in grafo['hechos'] else 'hecho:') + antes)
    if est: conds.append('estacion:' + est)
    conds += [c.strip() for c in otras.split(',') if c.strip()]
    for c in conds:
        k = c.lstrip('!').split(':')[0]
        if not re.match(r'^[\w>=<.:!-]+$', c) or (k not in grafo['claves'] and k not in grafo['cualidades']):
            malo(f'la condición «{c}» no es una condición del guion')
    if q not in por_quien: por_quien[q] = []; orden.append(q)
    por_quien[q].append((tipo, ('[' + ', '.join(conds) + '] ' if conds else '') + frase, r))

if errores:
    sys.exit('No cambié nada. Hay que corregir la planilla:\n  ' + '\n  '.join(errores))

# the header of the file stays as it is; then each one, in the order of the sheet
viejo = open(FRASES, encoding='utf-8').read()
cabecera = viejo[:viejo.index('\n===')] if '\n===' in viejo else ''
partes = [cabecera.rstrip('\n'), '']
for q in orden:
    partes.append(f'=== {q} ===')
    partes += [f'{tipo}: {linea}' for tipo, linea, _ in por_quien[q]]
    partes.append('')
nuevo = '\n'.join(partes)
if nuevo.strip() == viejo.strip():
    print('La planilla y src/datos/frases.txt ya dicen lo mismo: no hay nada que cambiar.'); sys.exit(0)
copia = FRASES + '.antes'
shutil.copy(FRASES, copia)
open(FRASES, 'w', encoding='utf-8').write(nuevo)
b = subprocess.run(['node', os.path.join(RAIZ, 'tools/build.js')], capture_output=True, text=True)
g = json.load(open(os.path.join(RAIZ, 'trazas/grafo.json'), encoding='utf-8'))
malas = [m for m in g['malas'] if 'frase' in m]
if malas:
    shutil.copy(copia, FRASES); os.remove(copia)
    subprocess.run(['node', os.path.join(RAIZ, 'tools/build.js')], capture_output=True)
    filas = lambda m: [str(r) for q in orden for _, l, r in por_quien[q] if any(x in l for x in re.findall(r'«([^»]+)»', m))]
    sys.exit('No cambié nada: el revisor de la historia encontró problemas:\n  ' + '\n  '.join(f'{m} (fila {", ".join(filas(m)) or "?"})' for m in malas))
os.remove(copia)
antes_n, ahora_n = len(re.findall(r'^(dice|ana|primavera|verano|otoño|invierno):', viejo, re.M)), sum(len(v) for v in por_quien.values())
print(f'→ src/datos/frases.txt · {ahora_n} frases de {len(orden)} personas (antes: {antes_n}) · el juego, compilado' + ('' if b.returncode == 0 else ' (el grafo tiene otros avisos: ver trazas/grafo.md)'))
print('  Para ver los huecos al día: node tools/planilla.js')
