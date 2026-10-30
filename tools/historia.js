#!/usr/bin/env node
// The story, as cards (trazas/historia.html): a page that plays the script alone, without the world, to see whether
// what happens is coherent. The state: the facts (and the day each happened), the state of the story (estado.txt), the counters (the qualities: Marilla's
// patience, the affection, Ana's skills), the goals of the notebook done, the day and the hour. At each step, the
// scenes whose conditions on the state hold; the situation (where, who is there, the cart…) is not simulated: it is
// shown as what the player would have to bring about, and taken as possible. Choose a scene, read its cards, choose its
// options; its effects change the state. What the player does on her own (help in the house, study, talk to someone,
// let time go by) are buttons too. Every step can be undone, or the story taken back to any earlier step.
//   node tools/historia.js   → trazas/historia.html   (also run by tools/build.js)
const fs = require('fs'), path = require('path');
const root = path.resolve(__dirname, '..'), MIS = require('./misiones.js').textos(root), leer = f => MIS[f] ?? fs.readFileSync(path.join(root, f), 'utf8');
const LIBRO = JSON.parse(leer('src/datos/libro1.json'));
const libro = p => { const [ruta, idx] = [p.replace(/\s*\[.*$/, ''), (p.match(/\[([\d,\s]+)\]/) || [])[1]]; let L = ruta.split('.').reduce((o, k) => o?.[k], LIBRO) || [];
  L = L.map(l => Array.isArray(l) && l.length === 2 ? l : Array.isArray(l) ? [l[3], l[5]] : null).filter(Boolean); return idx ? idx.split(',').map(Number).map(i => L[i]).filter(Boolean) : L; };

// the scenes of the script, the conversations and the mini-missions: as src/js/21-escenas-dialogo.js reads them
function escenas(txt, origen){
  const out = []; let c = null, body = false, op = null;
  for (const raw of txt.split('\n')) {
    const s = raw.trim(); if (!s || s[0] === '#') continue;
    const h = s.match(/^===\s*(.+?)\s*===$/); if (h) { out.push(c = { id: h[1], origen, si: [], o: [], empieza: [], termina: [], narra: [], L: [] }); body = false; op = null; continue; }
    if (!c) continue;
    if (s === '---') { body = true; continue; }
    const i = s.indexOf(':'); let k = i < 0 ? s : s.slice(0, i).trim(), v = i < 0 ? '' : s.slice(i + 1).trim();
    if (body) {
      if (s.startsWith('->')) { op = { t: s.replace(/^->\*?\s*/, ''), propia: s.startsWith('->*'), L: [] }; const last = c.L.at(-1); if (last?.ops && !last.cerrado) last.ops.push(op); else c.L.push({ ops: [op] }); continue; }
      if (op && /^\s/.test(raw)) { op.L.push(s.startsWith('!') ? { ef: s.slice(1).trim() } : linea(k, v)); continue; }
      if (op) { c.L.at(-1).cerrado = true; op = null; }
      c.L.push(s.startsWith('!') ? { ef: s.slice(1).trim() } : linea(k, v)); continue;
    }
    if (k === 'si') c.si.push(...v.split(',').map(x => x.trim()).filter(Boolean));
    else if (k === 'o') { const m = v.match(/si=(\S+)/); c.o.push({ si: m ? m[1].split(',') : [], resto: v.replace(/si=\S+/, '').trim() }); }   // (an alternative: the same scene, with other fields)
    else if (k === 'al_empezar') c.empieza.push(v);
    else if (k === 'al_terminar') c.termina.push(v);
    else if (k === 'narra') c.narra.push(v);
    else if (k === 'lineas') c.libro = v.split('+').flatMap(r => /^libro:/.test(r.trim()) ? libro(r.trim().slice(6)) : []).map(([q, t]) => ({ q, t }));
    else c[k.replace(/\s+/g, '_')] = v === '' ? true : v;
  }
  for (const e of out) { if (e.libro) e.L = [...e.libro, ...e.L]; delete e.libro; for (const b of e.L) delete b.cerrado; }
  return out;
}
function linea(k, v){ const m = k.match(/^(\S+)\s+piensa$/); return m ? { q: m[1], t: v, piensa: true } : { q: k, t: v }; }
const E = [...escenas(leer('src/datos/guion.txt'), 'guion'), ...escenas(leer('src/datos/conversaciones.txt'), 'conversacion')]
  .map(e => ({ ...e, tipo: e.con ? 'conversacion' : /^mis_/.test(e.id) ? 'mision' : /^(carta|respuesta)$/.test(e.canal || '') ? 'carta' : 'escena' }));

// the counters: the skills and qualities (src/datos/habilidades.txt), where each begins and its range; and what
// actions make each go up (the buttons of what the player does on her own)
const HAB = []; { let h = null;
  for (const raw of leer('src/datos/habilidades.txt').split('\n')) { const s = raw.trim(); if (!s || s[0] === '#') continue; let m;
    if ((m = s.match(/^===\s*(.+?)\s*===$/))) { HAB.push(h = { id: m[1], suma: [], inicial: 0 }); continue; } if (!h) continue;
    if ((m = s.match(/^(titulo|de|hacia|por):\s*(.*)$/))) h[m[1]] = m[2];
    if ((m = s.match(/^suma:\s*(.*)$/))) h.suma = m[1].split(',').map(x => x.trim()).filter(Boolean);
    if ((m = s.match(/^inicial:\s*(-?\d+)/))) h.inicial = +m[1];
    if ((m = s.match(/^rango:\s*(-?\d+)-(-?\d+)/))) h.rango = [+m[1], +m[2]]; } }
// the goals of the notebook (cuaderno:x, dias_desde:meta): marked by hand, as the player reaches them
const METAS = leer('src/datos/cuaderno.txt').split(/^(?====)/m).map(b => ({ id: b.match(/^===\s*(.+?)\s*===/)?.[1], titulo: b.match(/^titulo:\s*(.*)$/m)?.[1] })).filter(m => m.id).map(m => ({ ...m, titulo: m.titulo || m.id }));

// who is in Avonlea, and from/until when (src/datos/llegadas.txt): someone away is in no scene
const LLEG = {}; { let q = null;
  for (const raw of leer('src/datos/llegadas.txt').split('\n')) { const s = raw.trim(); if (!s || s[0] === '#') continue; let m;
    if ((m = s.match(/^===\s*(.+?)\s*===$/))) { q = LLEG[m[1]] = { llega: [], seva: [], visita: false }; continue; } if (!q) continue;
    if ((m = s.match(/^llega si:\s*(.*)$/))) q.llega.push(m[1].split(',').map(x => x.trim()).filter(Boolean));
    if ((m = s.match(/^se va si:\s*(.*)$/))) q.seva.push(m[1].split(',').map(x => x.trim()).filter(Boolean));
    if (/^de visita:/.test(s)) q.visita = true; } }
// the state of the story (src/datos/estado.txt): read as the game reads it (estadoLeer, in src/js/20-estado.js)
const estadoLeer = new Function(fs.readFileSync(path.join(root, 'src/js/20-estado.js'), 'utf8').match(/^function estadoLeer[\s\S]*?^}$/m)[0] + '\nreturn estadoLeer;')();
const ESTADO = estadoLeer(leer('src/datos/estado.txt'));
// the things and places with a line of scenes: their names (the header of each line, in the script) and where they are
// (the coarse places of the page: her room, the kitchen, the yard, outside…)
const COSAS = Object.fromEntries([...leer('src/datos/guion.txt').matchAll(/^# ----- (.+?)(?: \(también [^)]*\))? \((\w+)\)$/gm)].map(m => [m[2], m[1]]));
const DONDE_COSA = { gwin: 'ga', mirror: 'ga', armario: 'ga', bed: 'ga', stairs: 'gg', geranio: 'gg', fire: 'gg', toby: 'gg', pizarra: 'es', pupitre: 'es', rio: 'es', escuela: 'es',
  banco: 'ig', iglesia: 'ig', libros: 'parroquial', huerta: 'patio', granero: 'patio', corral: 'patio', cuesta_del_huerto: 'os', escenario: 'aldea', frascos: 'aldea', aldea: 'aldea',
  cage: 'harrison', faro: 'costa', playa: 'costa', bench: 'out', lago: 'out', puente: 'out', camino_blanco: 'out', bosque_encantado: 'out', campo_rosado: 'out' };
// the post (src/js/62-cartas.js: CORREO): how many days a letter takes to arrive, and the answer after it
const CORREO = new Function('return ' + fs.readFileSync(path.join(root, 'src/js/62-cartas.js'), 'utf8').match(/^const CORREO = (\{[\s\S]*?^\});/m)[1])();
// the trips: the places the cart passes, in order (measured on the map: where each «cerca:ana:<lugar>» of the scenes of
// the road falls along the way), and what the game does on arriving (the trip to White Sands is now the language's:
// docs/lenguaje/historias/white_sands/, src/js/67-lenguaje.js; these are for the script's scenes of a trip, if any)
const RUTAS = {
  white_sands: { paradas: ['tejas_verdes', 'hondonada_lynde', 'escuela', 'aldea', 'playa', 'hotel_white_sands'], llegar: [] },
  vuelta_white_sands: { paradas: ['hotel_white_sands', 'playa', 'aldea', 'escuela', 'hondonada_lynde', 'tejas_verdes'], llegar: ['estado viaje ninguno', 'hecho ws_vuelven', 'viaje casa'] },
};
const datos = { escenas: E, habilidades: HAB, metas: METAS, llegadas: LLEG, estado: ESTADO, cosas: COSAS, dondeCosa: DONDE_COSA, correo: CORREO, rutas: RUTAS };
const pag = fs.readFileSync(path.join(__dirname, 'historia', 'pagina.html'), 'utf8');
fs.writeFileSync(path.join(root, 'trazas/historia.html'), pag.replace('/*@DATOS*/null', () => JSON.stringify(datos).replace(/</g, '\\u003c')));
console.log(`→ trazas/historia.html · ${E.length} escenas · ${HAB.length} contadores · ${Object.keys(ESTADO).length} estados · ${METAS.length} metas`);
