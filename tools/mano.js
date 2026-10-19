// Jugar a mano, desde afuera: abre el juego en Chromium y espera órdenes por HTTP, una por vez, para que quien juega
// (una persona, o una IA que prueba el juego como jugadora) vea lo que se ve y decida cada paso. Cada respuesta dice el
// día y la hora, dónde está Ana, lo que se dijo desde la orden anterior, la caja abierta con sus botones, quién está cerca.
// Uso: node tools/mano.js [--puerto 8765] [--partida archivo.json] [--comentarios lista.json (los del 📝, para seguir)]   y luego, por ejemplo:
//   curl -s localhost:8765/estado            · /boton?i=1 (el botón 1, o ?t=texto) · /seguir (la tarjeta de narración)
//   /clic?x=&y=[&s=segundos] (tocar la pantalla, en las coordenadas de la foto) · /ana (tocar a Ana: su menú) · /tocar?k=marilla (tocar a alguien) · /ir?a=lago (caminar a un lugar, PLACES)
//   /pasar?s=30 (segundos de juego; se detiene si algo espera) · /foto (una captura: la ruta) · /guardar?a=archivo.json
//   /mundo (cómo está el mundo, para leer) · /punto?nombre=… (un punto de control, también a un archivo) · /volver?i=n (a un punto; -1: el último) · /cargar?a=archivo.json
//   /comentar?t=texto (un comentario sobre este momento, como el 📝 del juego) · /exportar?a=archivo.json (los comentarios y la partida)
//   /ev?js=… (mirar por dentro, sin cambiar nada) · /fin
const http = require('http'), fs = require('fs'), path = require('path'), { chromium } = require('playwright');
const RAIZ = path.join(__dirname, '..'), arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d; };
const PUERTO = +arg('puerto', 8765), PARTIDA = arg('partida', null), COMENTARIOS = arg('comentarios', null), FOTOS = path.join(RAIZ, 'trazas', 'mano');
const EXE = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;

(async () => {
  fs.mkdirSync(FOTOS, { recursive: true });
  const b = await chromium.launch({ executablePath: EXE, args: ['--no-sandbox'] });
  const pg = await (await b.newContext({ viewport: { width: 900, height: 640 } })).newPage(); const errs = [];
  pg.on('pageerror', e => errs.push(e.message));
  await pg.addInitScript(([s, c]) => { Object.defineProperty(navigator, 'webdriver', { get: () => false }); if (sessionStorage.getItem('mano')) return; sessionStorage.setItem('mano', 1); if (s) localStorage.setItem('avonlea', s); if (c) localStorage.setItem('avonlea_comentarios', c); }, [PARTIDA ? fs.readFileSync(PARTIDA, 'utf8') : null, COMENTARIOS ? fs.readFileSync(COMENTARIOS, 'utf8') : null]);
  // (the game and the comments only the first time: going back to a checkpoint reloads the page, and keeps its game)
  await pg.goto('file://' + path.join(RAIZ, 'index.html') + '?dev'); await pg.waitForTimeout(1500);
  const ev = (s, a) => pg.evaluate(([s, a]) => { const v = window.__avonlea.ev(s); return typeof v === 'function' ? v(a) : v; }, [s, a]);
  // what was said where Ana is (every new bubble on the screen), from the start
  const oir = () => ev(`(() => { if (window.__oido) return; window.__oido = []; setInterval(() => { for (const x of bubbles) if (!x.__m && burbujaAqui(x)) { x.__m = 1;
      window.__oido.push({ quien: x.q === 'ana' ? 'Ana' : (wmName(String(x.q).replace(/^f:/, '')) || x.q), t: x.text, dia: today() + 1, hora: +hourNow().toFixed(2) }); } }, 50); })()`);
  await oir();
  let leido = 0, nFoto = 0;
  const pasar = s => ev(`(s => { for (let k = 0; k < s * 30; k++) { update(1 / 30); for (const x of bubbles) if (!x.__m && burbujaAqui(x)) { x.__m = 1; window.__oido.push({ quien: x.q === 'ana' ? 'Ana' : (wmName(String(x.q).replace(/^f:/, '')) || x.q), t: x.text, dia: today() + 1, hora: +hourNow().toFixed(2) }); }
      if (document.querySelector('#talk:not([hidden]) button, #narra:not([hidden]) button')) return k / 30; } return s; })`, s);
  const estado = async () => {
    const e = await ev(`(() => { const vis = id => { const e = document.getElementById(id); return e && !e.hidden && getComputedStyle(e).display !== 'none' ? e.innerText.trim() : ''; };
      const lugar = game.scene !== 'out' ? (ROOMS[game.scene]?.name || game.scene) : (Object.entries(PLACES).map(([k, p]) => [k, dist(ana.x, ana.y, p[1], p[2])]).sort((a, b) => a[1] - b[1])[0] || ['?'])[0];
      const cerca = Object.keys(PEOPLE).filter(k => k !== 'ana' && PEOPLE[k].where === game.scene && (game.scene !== 'out' || dist(PEOPLE[k].x, PEOPLE[k].y, ana.x, ana.y) < 320));
      return { dia: today() + 1, hora: +hourNow().toFixed(2), estacion: SEASONS[S], escena: game.scene, lugar, durmiendo: !!sleeping,
        narra: vis('narra'), caja: vis('talk'), botones: [...document.querySelectorAll('#talk:not([hidden]) button, #narra:not([hidden]) button')].map(b => b.innerText.trim()),
        aviso: vis('notice') || '', ana: { camison: !!game.wm?.camison, haciendo: ana.act?.v || null, lleva: Object.entries(game.inv || {}).filter(([, n]) => n > 0).map(([k, n]) => k + ' ' + n) },
        aqui: cerca.slice(0, 20), conversaciones: cerca.map(k => { try { return convDisponibles(k).map(c => k + ': ' + c.tema); } catch (e) { return []; } }).flat() }; })()`);
    e.oido = (await ev('window.__oido || []')).slice(leido).map(o => `[d${o.dia} ${o.hora}] ${o.quien}: ${o.t}`); leido += e.oido.length;
    if (errs.length) e.errores = errs.splice(0);
    return e;
  };
  const tocar = async (wx, wy) => { const [sx, sy] = await ev(`(([x, y]) => [(x - view.ox) * view.Z, (y - view.oy) * view.Z])`, [wx, wy]); await pg.mouse.click(sx, sy); await pg.waitForTimeout(500); };
  const ordenes = {
    estado: async () => estado(),
    boton: async q => { const ok = await ev(`(([i, t]) => { const B = [...document.querySelectorAll('#talk:not([hidden]) button, #narra:not([hidden]) button')]; const b = t ? B.find(b => b.innerText.includes(t)) : B[+i - 1]; if (b) { b.click(); return true; } return false; })`, [q.i, q.t]);
      if (!ok) return { error: 'no hay ese botón', ...(await estado()) }; await pasar(.6); return estado(); },
    seguir: async () => { await ev(`(() => { const b = document.querySelector('#narra:not([hidden]) button'); if (b) b.click(); })()`); await pasar(.6); return estado(); },
    ana: async () => { const [x, y] = await ev('[ana.x, ana.y - 20]'); await tocar(x, y); return estado(); },
    tocar: async q => { const p = await ev(`(k => { const P = PEOPLE[k]; return P && P.where === game.scene ? [P.x, P.y - 20] : null; })`, q.k).catch(() => null);
      if (!p) return { error: 'no encuentro a ' + q.k + ' en esta escena', ...(await estado()) }; await tocar(p[0], p[1]); return estado(); },
    clic: async q => { await pg.mouse.click(+q.x, +q.y); await pg.waitForTimeout(200); await pasar(+(q.s || 0)); return estado(); },   // (a tap on the screen, where the photo shows it: 900×640)
    ir: async q => { const ok = await ev(`(k => { const P = k === 'casa' ? ['', GG.x, GG.y + 40] : PLACES[k]; if (!P) return false; goDest(P[1], P[2]); return true; })`, q.a);
      if (!ok) return { error: 'no conozco el lugar «' + q.a + '»', lugares: await ev('Object.keys(PLACES)') }; await pasar(+(q.s || 20)); return estado(); },
    pasar: async q => { const s = await pasar(+(q.s || 30)); return { paso: +(+s).toFixed(1), ...(await estado()) }; },
    foto: async () => { const f = path.join(FOTOS, String(++nFoto).padStart(3, '0') + '.jpg'); await pg.screenshot({ path: f, type: 'jpeg', quality: 70 }); return { foto: f }; },
    guardar: async q => { const s = await ev(`(() => { save(); return localStorage.getItem('avonlea'); })()`); const f = path.resolve(q.a || path.join(FOTOS, 'partida.json')); fs.writeFileSync(f, s); return { guardada: f }; },
    comentar: async q => ({ guardado: await ev(`(t => opinar(t))`, q.t), ...(await estado()) }),   // (a comment on this moment, as the 📝 of the game)
    exportar: async q => { const d = await ev('opinionesDatos()'); const f = path.resolve(q.a || path.join(FOTOS, 'comentarios.json')); fs.writeFileSync(f, JSON.stringify(d, null, 1)); return { exportado: f, comentarios: d.comentarios.length }; },
    mundo: async () => ({ mundo: await ev('mundoTexto()') }),   // (the world now, told for a person)
    punto: async q => { const p = await ev(`(n => { const p = controlGuardar(n); return p && { ...p, partida: JSON.parse(p.partida) }; })`, q.nombre || ''); if (!p) return { error: 'no se pudo guardar' };
      const f = path.resolve(q.a || path.join(FOTOS, 'punto-' + p.nombre.replace(/[^\wáéíóúñ]+/gi, '-').toLowerCase() + '.json')); fs.writeFileSync(f, JSON.stringify({ tipo: 'punto de control de «Un día en Avonlea»', ...p }, null, 1)); return { punto: p.nombre, archivo: f }; },
    cargar: async q => { await pg.setInputFiles('#ajpfile', path.resolve(q.a)); await pg.waitForTimeout(500); return { puntos: await ev('controles().map(p => p.nombre)') }; },   // (a checkpoint from a file, as «Cargar desde un archivo»)
    volver: async q => { await ev(`(i => { const L = controles(), p = L[i < 0 ? L.length + i : i]; if (p) controlVolver(p); })`, +(q.i ?? -1)).catch(() => null); await pg.waitForTimeout(500); await pg.waitForLoadState('load'); await pg.waitForTimeout(1500); leido = 0; await oir(); return estado(); },
    ev: async q => ({ valor: await ev(q.js) }),
    fin: async () => { setTimeout(() => process.exit(0), 100); return { adios: true }; },
  };
  http.createServer(async (rq, rs) => {
    const u = new URL(rq.url, 'http://x'), o = ordenes[u.pathname.slice(1)];
    let r; try { r = o ? await o(Object.fromEntries(u.searchParams)) : { error: 'órdenes: ' + Object.keys(ordenes).join(', ') }; } catch (e) { r = { error: String(e.message || e).split('\n')[0] }; }
    rs.writeHead(200, { 'content-type': 'application/json; charset=utf-8' }); rs.end(JSON.stringify(r, null, 1));
  }).listen(PUERTO, () => console.log('mano: http://localhost:' + PUERTO + '/estado'));
})();
