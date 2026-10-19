/* ---------- checkpoints: the game saved as it is now, with a name, to come back to it and try something else from
   there (another answer, another day); each one with the day and the state of the world told for a person to read
   (where Ana is and how, what has happened in her story, her notebook, how much each one cares for her, what the
   village knows, what is pending). In the settings: save one, go back to one, see its world, download it, load one
   from a file (one sent by someone else, or made by the tools) ---------- */
const CONTROLES_LS = 'avonlea_puntos';
const controles = () => { try { return JSON.parse(localStorage.getItem(CONTROLES_LS) || '[]'); } catch (e) { return []; } };
const controlesGuardar = L => { try { localStorage.setItem(CONTROLES_LS, JSON.stringify(L)); return true; } catch (e) { return false; } };
const SEMANA = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const CARIÑO = n => n <= 0 ? 'no la quiere' : n < 2 ? 'no la quiere mucho' : n < 3 ? 'la trata sin más (aún no se encariña)' : n < 4 ? 'le tiene cariño' : n < 5 ? 'la quiere mucho' : 'la adora';
// where someone is, said for a person
function dondeEsta(k){
  const s = k === 'ana' ? game.scene : wmScene(k), b = k === 'ana' ? ana : wmBody(k);
  if (s === 'away') return 'fuera de Avonlea';
  if (s && s !== 'out') return 'en ' + salaNombre(s);
  if (!b) return 'en algún lugar de Avonlea';
  const [n] = Object.values(PLACES).map(p => [p[0], dist(b.x, b.y, p[1], p[2])]).sort((x, y) => x[1] - y[1])[0] || ['Avonlea'];
  return 'afuera, ' + cercaDe(n);
}
// the world now, told for a person to read
function mundoTexto(){
  const hoy = today() + 1, out = [], L = (t, l) => { if (l.length) out.push('', t, ...l.map(x => '- ' + x)); };
  out.push(`Día ${hoy} (${SEASONS[S].toLowerCase()}, día ${today() % DIAS_ESTACION + 1} de la estación, ${SEMANA[today() % 7]}), ${fmtHour(hourNow())}.`);
  const lleva = Object.entries(game.inv || {}).filter(([, n]) => n > 0).map(([k, n]) => itemText(k, n));
  out.push(`Ana está ${dondeEsta('ana')}${game.wm?.camison ? ', en camisón' : ''}${lleva.length ? '. Lleva: ' + lleva.join(', ') : ''}.`);
  { const c = comMomento().cerca; if (c.length) out.push('Con ella: ' + c.join(', ') + '.'); }
  // the story: what has happened, and what can happen now
  const H = HITOS.map(h => ({ h, r: hitoRespuesta(h.id), hecho: hitoHecho(h.id), cerrado: hitoCerrado(h.id), listo: hitoEstado(h) === 'listo' }));
  L('LO QUE YA PASÓ EN SU HISTORIA', H.filter(x => x.hecho).map(x => x.h.situacion + (x.r ? ' → ' + x.r.replace(/_/g, ' ') : '')));
  L('LO QUE PUEDE PASAR AHORA', H.filter(x => !x.hecho && !x.cerrado && x.listo).map(x => x.h.situacion));
  // the notebook
  L('SU CUADERNO: LO CUMPLIDO', CUADERNO_METAS.filter(m => cuadernoHecho(m.id)).map(m => `${m.titulo} (día ${cuadernoHecho(m.id)})`));
  L('SU CUADERNO: LO QUE PUEDE HACER', CUADERNO_METAS.filter(m => !cuadernoHecho(m.id) && cuadernoAbierta(m)).map(m => m.titulo + (cuadernoPista(m) ? ': ' + cuadernoPista(m) : '')));
  // the people she knows: how much they care for her, and where they are
  const gente = [...Object.keys(CH), ...FOLK.map(f => f.id)].filter(k => k !== 'ana' && !sinNombre(k) && conoceA(k));
  const cerca = gente.filter(k => CH[k] || relGetW(k, 'ana') !== 2), otros = gente.filter(k => !cerca.includes(k));
  L('LA GENTE QUE CONOCE (cuánto la quieren, y dónde están)', [...cerca.map(k => { const n = relGetW(k, 'ana'); return `${cap(wmName(k))}: ${CARIÑO(n)} (${n}/5); está ${dondeEsta(k)}`; }),
    ...(otros.length ? ['Además conoce, sin más trato: ' + otros.map(k => wmName(k)).join(', ')] : [])]);
  // Ana herself
  L('ANA', Object.values(CUALIDAD_DEF).filter(c => !c.de || c.de === 'ana').map(c => { const v = cualidad('ana', c.id); return v ? `${c.titulo}: ${v}${c.rango ? ' de ' + c.rango[1] : ''}` : null; }).filter(Boolean));
  // what the village knows
  L('LO QUE SE SABE EN AVONLEA', NOTICIAS.map(n => { const q = gente.filter(k => sabeK(k, n.id)).map(k => wmName(k)); return q.length ? `${n.titulo}: lo saben ${q.length > 6 ? q.slice(0, 6).join(', ') + ' y ' + (q.length - 6) + ' más' : q.join(', ')}` : null; }).filter(Boolean));
  // pending: letters, errands, promises, and the last things that happened
  L('LO PENDIENTE', nocheCabos().map(c => c.texto));
  L('LO ÚLTIMO QUE PASÓ', (game.journal || []).slice(-8).map(e => `día ${e.d}, ${fmtHour(e.h ?? 0)}: ${e.t}`));
  return out.join('\n');
}
// a checkpoint, now: the saved game and its world
function controlGuardar(nombre){
  save(); const partida = localStorage.getItem('avonlea'); if (!partida) return null;
  const p = { nombre: String(nombre || '').trim() || `Día ${today() + 1}, ${fmtHour(hourNow())}`, cuando: new Date().toISOString(), dia: today() + 1, hora: fmtHour(hourNow()), mundo: mundoTexto(), partida };
  const L = controles(); L.push(p); if (!controlesGuardar(L)) { notice('📌 No cabe en el navegador: descárgalo y borra puntos viejos.'); controlDescargar(p); return null; }
  notice('📌 Punto de control guardado: ' + p.nombre); controlesMostrar(); return p;
}
// back to one: the game as it was then (the comments and the settings stay)
function controlVolver(p){ if (!p?.partida) return; wiping = true; localStorage.setItem('avonlea', p.partida); location.reload(); }   // (wiping: the game now is not saved over it as the page goes)
function controlDescargar(p){
  const { partida, ...resto } = p, a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify({ tipo: 'punto de control de «Un día en Avonlea»', ...resto, partida: JSON.parse(partida) }, null, 1)], { type: 'application/json' }));
  a.download = 'avonlea-punto-' + p.nombre.replace(/[^\wáéíóúñ]+/gi, '-').toLowerCase() + '.json'; document.body.appendChild(a); a.click(); a.remove();
}
// one from a file (a checkpoint downloaded, or the exported comments: their game)
function controlCargar(texto, nombre){
  const d = JSON.parse(texto), partida = d.partida && (typeof d.partida === 'string' ? d.partida : JSON.stringify(d.partida));
  if (!partida) throw new Error('el archivo no trae una partida');
  const L = controles(); L.push({ nombre: d.nombre || nombre || 'Cargado', cuando: new Date().toISOString(), dia: d.dia ?? JSON.parse(partida).wm?.dia ?? '?', hora: d.hora || '', mundo: d.mundo || '(sin descripción: se ve al volver a él)', partida });
  controlesGuardar(L); controlesMostrar();
}
function controlesMostrar(){
  const box = $('ajpuntos'); if (!box) return; box.innerHTML = '';
  const L = controles(); if (!L.length) { box.textContent = '(ninguno todavía)'; return; }
  L.forEach((p, i) => { const r = document.createElement('div'); r.className = 'punto';
    r.innerHTML = `<b></b> <small></small> <button data-a="volver">Volver aquí</button><button data-a="ver">Ver el mundo</button><button data-a="bajar">Descargar</button><button data-a="borrar">Borrar</button>`;
    r.querySelector('b').textContent = p.nombre; r.querySelector('small').textContent = `(día ${p.dia}, ${p.hora})`;
    r.onclick = e => { const a = e.target.dataset?.a; if (!a) return;
      if (a === 'volver' && confirm(`¿Volver a «${p.nombre}»? Lo que pasó después de guardar el punto (si no lo guardaste en otro) se pierde.`)) controlVolver(p);
      if (a === 'ver') { $('ajout').hidden = false; $('ajout').textContent = `📌 ${p.nombre}\n\n${p.mundo}`; }
      if (a === 'bajar') controlDescargar(p);
      if (a === 'borrar' && confirm(`¿Borrar «${p.nombre}»?`)) { const M = controles(); M.splice(i, 1); controlesGuardar(M); controlesMostrar(); } };
    box.appendChild(r); });
}
$('ajpunto').addEventListener('click', () => { const n = prompt('Nombre del punto de control (para reconocerlo):', `Día ${today() + 1}, ${fmtHour(hourNow())}`); if (n !== null) controlGuardar(n); });
$('ajmundo').addEventListener('click', () => { $('ajout').hidden = false; $('ajout').textContent = mundoTexto(); });
$('ajpcargar').addEventListener('click', () => $('ajpfile').click());
$('ajpfile').addEventListener('change', async e => { const f = e.target.files[0]; if (!f) return; try { controlCargar(await f.text(), f.name.replace(/\.json$/, '')); notice('📌 Punto cargado: ya puedes volver a él.'); } catch (x) { alert('No pude leerlo: ' + x.message); } e.target.value = ''; });
controlesMostrar();
