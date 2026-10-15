/* ---------- endings, and points to come back to ----------
   A story may end (the script says so: «! final devuelta | Ana se fue con la Sra. Blewett»): a card, as a book's last
   page, and the world stops. It is not the end of the game: the player may go back to a point the script kept before
   («! punto viaje | Volver a la mañana del viaje a White Sands»: the game as it was then), or begin again. The points
   are kept apart from the game (localStorage 'avonlea:puntos'), the ending in the game itself (it is shown again if
   the page is opened again). */
const PUNTOS_KEY = 'avonlea:puntos';
const puntosLeer = () => { try { return JSON.parse(localStorage.getItem(PUNTOS_KEY) || '{}'); } catch (e) { return {}; } };
// a point: the game as it is now, once the scene that keeps it is under way (so that it goes on from there)
function puntoGuardar(id, texto){
  setTimeout(() => { if (game.final) return; save(); try { const P = puntosLeer(); P[id] = { texto: texto || 'Volver atrás', dia: today(), data: localStorage.getItem('avonlea') }; localStorage.setItem(PUNTOS_KEY, JSON.stringify(P)); } catch (e) {} }, 100);
}
function puntoVolver(id){ const p = puntosLeer()[id]; if (!p?.data) return; wiping = true; try { localStorage.setItem('avonlea', p.data); } catch (e) {} location.reload(); }
function empezarDeNuevo(){ wiping = true; try { localStorage.removeItem('avonlea'); localStorage.removeItem(PUNTOS_KEY); } catch (e) {} location.reload(); }
// the ending: its card (the text is the scene's; the buttons, the points kept and a new beginning)
function finalMostrar(id, texto){
  game.final = { id, texto: texto || '', dia: today() }; logEv('Fin: ' + (texto || id) + '.', []); save();
  if (navigator.webdriver && !/[?&]dev\b/.test(location.search)) return;
  let el = $('final'); if (!el) { el = document.createElement('div'); el.id = 'final'; document.body.appendChild(el); }
  el.style.cssText = 'position:fixed;inset:0;z-index:60;display:flex;align-items:center;justify-content:center;background:rgba(40,28,16,.55);padding:16px';
  const P = Object.entries(puntosLeer());
  el.innerHTML = '<div style="width:min(480px,100%);background:#f6ecd2;color:#3b2a1c;border:1px solid #8a6a48;border-radius:10px;box-shadow:0 8px 30px rgba(20,10,0,.45);padding:22px 24px;font:17px/1.5 Georgia,serif;text-align:center">'
    + '<div style="font-size:13px;letter-spacing:.2em;color:#8a6a48">FIN</div><p class="tx" style="font-style:italic;margin:10px 0 18px"></p><div class="bt" style="display:flex;flex-direction:column;gap:8px;align-items:center"></div></div>';
  el.querySelector('.tx').textContent = conNombres(texto || 'Aquí termina esta historia.');
  const bt = el.querySelector('.bt'), boton = (t, f) => { const b = document.createElement('button'); b.textContent = t; b.style.cssText = 'font:15px Georgia,serif;padding:6px 14px;border:1.5px solid #6b4a30;border-radius:8px;background:#fffaf0;color:#3b2a1c;cursor:pointer'; b.onclick = e => { e.stopPropagation(); f(); }; bt.appendChild(b); };
  for (const [k, p] of P) boton('↺ ' + p.texto, () => puntoVolver(k));
  boton('Empezar de nuevo', () => { if (confirm('¿Empezar una partida nueva, desde la llegada de Ana?')) empezarDeNuevo(); });
}
// a game that had ended: the card again
if (game.final) setTimeout(() => finalMostrar(game.final.id, game.final.texto), 300);
