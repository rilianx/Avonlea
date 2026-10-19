/* ---------- comments of whoever plays: «📝» (or the key C) writes one about this very moment, and the game keeps with it
   what was going on (the day and the hour, where Ana is, who is near, what was just said, the box or the scene open, a
   small picture of the screen); «Exportar comentarios» (in the settings) downloads them all with the saved game, to send
   to whoever makes the game: they know when it happened, and can open the game right there ---------- */
const COM_LS = 'avonlea_comentarios', COM_OIDO_MAX = 14;
const opiniones = () => { try { return JSON.parse(localStorage.getItem(COM_LS) || '[]'); } catch (e) { return []; } };
const opinionesGuardar = L => { try { localStorage.setItem(COM_LS, JSON.stringify(L)); return true; } catch (e) { return false; } };
// what was said lately where Ana is (what the player saw), in order (src/js/53-bucle.js puts each new bubble here)
const COM_OIDO = [];
function comOido(q, t){ COM_OIDO.push({ quien: q === 'ana' ? 'Ana' : wmName(String(q).replace(/^f:/, '')) || q, t, dia: today() + 1, hora: +hourNow().toFixed(2) }); if (COM_OIDO.length > COM_OIDO_MAX) COM_OIDO.shift(); }
// the scenes that began lately (their ids: to find their text in src/datos/)
const COM_ESC = [];
function comEscena(id, canal){ COM_ESC.push(`${id}${canal ? ' (' + canal + ')' : ''}, día ${today() + 1} ${fmtHour(hourNow())}`); if (COM_ESC.length > 8) COM_ESC.shift(); }
// the moment, as it is now
function comMomento(){
  const vis = id => { const e = $(id); return e && !e.hidden ? e.innerText.trim() : ''; };
  const lugar = game.scene !== 'out' ? (ROOMS[game.scene]?.name || game.scene) : (Object.entries(PLACES).map(([k, p]) => [p[0], dist(ana.x, ana.y, p[1], p[2])]).sort((a, b) => a[1] - b[1])[0] || ['afuera'])[0];
  const cerca = [...Object.keys(PEOPLE).filter(k => k !== 'ana' && PEOPLE[k].where === game.scene && (game.scene !== 'out' || dist(PEOPLE[k].x, PEOPLE[k].y, ana.x, ana.y) < 320)),
    ...FOLK.filter(f => f.where === game.scene && (game.scene !== 'out' || dist(f.x, f.y, ana.x, ana.y) < 320)).map(f => f.id)];
  return { dia: today() + 1, hora: fmtHour(hourNow()), estacion: SEASONS[S], lugar, escena: game.scene, cerca: cerca.map(k => wmName(k)),
    ana: { haciendo: ana.act?.v || null, camison: !!game.wm?.camison, lleva: Object.entries(game.inv || {}).filter(([, n]) => n > 0).map(([k, n]) => k + ' ' + n) },
    caja: vis('talk'), narra: vis('narra'), ahora: TALKS.map(t => t.esc || t.ch).filter(Boolean), escenas: [...COM_ESC],
    oido: COM_OIDO.map(o => `[día ${o.dia} ${fmtHour(o.hora)}] ${o.quien}: ${o.t}`), diario: (game.journal || []).slice(-6).map(e => `día ${e.d}: ${e.t}`) };
}
// a small picture of the screen (to see what the player saw: 360 wide)
function comFoto(){ try { const c = $('cv'), w = 360, h = Math.round(c.height * w / c.width), o = document.createElement('canvas'); o.width = w; o.height = h; o.getContext('2d').drawImage(c, 0, 0, w, h); return o.toDataURL('image/jpeg', .6); } catch (e) { return null; } }
let comPend = null;
function opinionAbrir(){
  if (!$('comf').hidden) return opinionCerrar();
  comPend = { momento: comMomento(), foto: comFoto() };   // (the moment is the one when it was opened, not when it is saved)
  $('comf').hidden = false; $('comlugar').textContent = `Día ${comPend.momento.dia}, ${comPend.momento.hora} · ${comPend.momento.lugar}`; $('comin').value = ''; $('comin').focus();
}
function opinionCerrar(){ $('comf').hidden = true; $('comin').blur(); comPend = null; }
function opinar(texto, pend = comPend || { momento: comMomento(), foto: comFoto() }){
  texto = String(texto || '').trim(); if (!texto) return false;
  const L = opiniones(); L.push({ n: L.length + 1, cuando: new Date().toISOString(), texto, ...pend });
  if (!opinionesGuardar(L)) { L[L.length - 1].foto = null; opinionesGuardar(L); }   // (the browser is full: without the picture)
  opinionCerrar(); notice('📝 Comentario guardado (' + L.length + '). Se exportan desde ✒ Ajustes.'); comBoton(); return true;
}
// everything, to send: the comments (each with its moment) and the saved game, as one file
function opinionesDatos(){
  save(); return { juego: document.title, exportado: new Date().toISOString(), comentarios: opiniones(), partida: (() => { try { return JSON.parse(localStorage.getItem('avonlea') || 'null'); } catch (e) { return null; } })() };
}
function opinionesExportar(){
  const datos = opinionesDatos();
  const a = document.createElement('a'), f = new Blob([JSON.stringify(datos, null, 1)], { type: 'application/json' });
  a.href = URL.createObjectURL(f); a.download = 'avonlea-comentarios-' + new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-') + '.json'; document.body.appendChild(a); a.click(); a.remove();
  return datos;
}
const comBoton = () => { const n = opiniones().length; $('combtn').textContent = n ? '📝' + n : '📝'; $('ajcomex').textContent = `Exportar comentarios (${n})`; };
$('combtn').addEventListener('pointerdown', e => { e.stopPropagation(); e.preventDefault(); opinionAbrir(); });
$('comf').addEventListener('submit', e => { e.preventDefault(); opinar($('comin').value); });
$('comno').addEventListener('click', e => { e.preventDefault(); opinionCerrar(); });
$('comin').addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Escape') opinionCerrar(); if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) opinar($('comin').value); });
$('ajcomex').addEventListener('click', () => { const d = opinionesExportar(); $('ajout').hidden = false; $('ajout').textContent = `Se descargó un archivo con ${d.comentarios.length} comentario(s) y la partida. Mándaselo a quien hace el juego.`; });
$('ajcomborrar').addEventListener('click', () => { if (!opiniones().length || !confirm('¿Borrar todos los comentarios (también los que no exportaste)?')) return; opinionesGuardar([]); comBoton(); });
comBoton();
