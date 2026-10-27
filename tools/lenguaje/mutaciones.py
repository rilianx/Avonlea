#!/usr/bin/env python3
"""Que el lenguaje de las historias sea estricto de verdad (docs/LENGUAJE.md §12): copia docs/lenguaje a una carpeta
temporal, le mete un error a la vez (un nombre mal escrito, un paso que no existe, código en una condición…), y revisa
que el generador de Yarn (tools/lenguaje/yarn.js) o tsc lo rechacen. Sale con error si alguno pasa sin que lo vean.
Uso: python3 tools/lenguaje/mutaciones.py"""
import os, shutil, subprocess, sys, tempfile
RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
CASOS = [
 ('historias/white_sands/escenas.yarn', 'si: marilla_con_paciencia', 'si: marilla_con_pacienca', 'condición mal escrita'),
 ('historias/white_sands/escenas.yarn', 'se_activa: ida.camino.playa cumplido', 'se_activa: ida.cmino.playa cumplido', 'paso del encargo que no existe'),
 ('historias/white_sands/escenas.yarn', 'se_activa: ida.camino.playa cumplido', 'se_activa: ida.camino.plya cumplido', 'parada del camino que no existe'),
 ('historias/white_sands/escenas.yarn', 'se_activa: ana rechaza pedir', 'se_activa: ana rechasa pedir', 'respuesta mal escrita'),
 ('historias/white_sands/escenas.yarn', 'se_activa: ana rechaza pedir', 'se_activa: ana rechaza pedri', 'respuesta a un acto que no existe'),
 ('historias/white_sands/escenas.yarn', 'se_activa: ana rechaza pedir', 'se_activa: anna rechaza pedir', 'respuesta de alguien que no existe'),
 ('historias/white_sands/escenas.yarn', 'se_activa: marilla ir_a_buscar.va cumplido', 'se_activa: marilla ir_a_buscar.vaa cumplido', 'paso de un verbo que no existe'),
 ('historias/white_sands/escenas.yarn', 'se_activa: ana rechaza pedir subir', 'se_activa: ana rechaza pedir subri', 'respuesta a un pedido de un verbo que no existe'),
 ('historias/white_sands/escenas.yarn', 'le queman a una la casa. Nadie las quiere por algo. #ofender:ana', 'le queman a una la casa. Nadie las quiere por algo. #ofender:anna', 'acto hacia alguien que no existe'),
 ('historias/white_sands/escenas.yarn', 'le queman a una la casa. Nadie las quiere por algo. #ofender:ana', 'le queman a una la casa. Nadie las quiere por algo. #ofendre:ana', 'acto que no existe'),
 ('historias/white_sands/escenas.yarn', 'srapye: Flaca', 'srapy: Flaca', 'quien habla no existe'),
 ('historias/white_sands/escenas.yarn', '<<deja(hechos.ws_corrio)>>', '<<deja(hechos.ws_corrrio)>>', 'hecho que no existe'),
 ('historias/white_sands/escenas.yarn', "    <<correr_a('ana', 'orilla')>>", "    <<correr_a('ana', 'orila')>>", 'lugar que no existe'),
 ('historias/white_sands/escenas.yarn', 'se_activa: tras ws_t1 |', 'se_activa: tras ws_t0 |', 'tras una escena que no existe'),
 ('historias/white_sands/escenas.yarn', 'si: marilla_con_paciencia', 'si: (() => true)()', 'código en una condición'),
 ('historias/white_sands/voces.yarn', 'paso: va', 'paso: vaa', 'voz de un paso que no existe'),
 ('historias/white_sands/historia.ts', "estado.ana_en_tv.lt('decidida')", "estado.ana_en_tv.lt('devuelta')", 'comparar fuera de la escala'),
 ('historias/white_sands/historia.ts', 'escena.ws_t1]', 'escena.ws_t9]', 'orden con una escena que no existe'),
 ('historias/white_sands/historia.ts', "'hotel_white_sands', 'calesa', 'costa'", "'hotel_white_sands', 'calesa', 'cotsa'", 'ruta que no existe'),
 ('historias/white_sands/historia.ts', "falla: encargo => encargo.ida.", "falla: encargo => encargo.idaa.", 'encargo que no existe'),
]
fallas = 0
with tempfile.TemporaryDirectory() as tmp:
    base = os.path.join(tmp, 'lenguaje')
    for f, a, b, nombre in CASOS:
        if os.path.isdir(base): shutil.rmtree(base)
        shutil.copytree(os.path.join(RAIZ, 'docs', 'lenguaje'), base)
        p = os.path.join(base, f); s = open(p, encoding='utf-8').read(); assert a in s, (f, a)
        open(p, 'w', encoding='utf-8').write(s.replace(a, b, 1))
        g = subprocess.run(['node', os.path.join(RAIZ, 'tools', 'lenguaje', 'yarn.js'), base], capture_output=True, text=True)
        if g.returncode: print(f'✔ {nombre}: lo rechaza el generador'); continue
        t = subprocess.run(['tsc', '-p', base], capture_output=True, text=True)
        errs = [l for l in t.stdout.split('\n') if 'error TS' in l]
        if errs: print(f'✔ {nombre}: lo rechaza tsc ({errs[0].split("error ")[1].split(":")[0]})')
        else: print(f'✘ {nombre}: pasa sin que nadie lo vea'); fallas += 1
print(f'{len(CASOS) - fallas} de {len(CASOS)} errores detectados')
sys.exit(1 if fallas else 0)
