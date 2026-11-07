// El juego sin navegador: carga el código de index.html en node, con un documento de mentira (todo lo que es pantalla
// responde y no hace nada), para usar su lógica —el planificador, las rutinas, el guion, el lenguaje— sin dibujar.
// No reemplaza al navegador para ver el juego: es para que el mundo mínimo (tools/mundo/) y las pruebas lleguen a esa
// lógica. Lo de adentro del juego se alcanza como en ?dev: juego.ev('expresión').
// Uso: const { cargarJuego } = require('./sin_navegador.js'); const J = cargarJuego(); J.ev('wmPlan(...)')
const fs = require('fs'), path = require('path'), vm = require('vm');
const INDEX = path.resolve(__dirname, '..', '..', 'index.html');

// (algo de la pantalla: se le puede pedir cualquier cosa, llamarlo, guardarle valores; como número es 0)
function nada(nombre = 'nada'){
  const guardado = {};
  const f = function () {};
  return new Proxy(f, {
    get(t, k){
      if (k in guardado) return guardado[k];
      if (k === Symbol.toPrimitive) return h => (h === 'string' ? '' : 0);
      if (k === Symbol.iterator) return function* () {};
      if (k === 'then') return undefined;   // (no es una promesa)
      if (k === 'length') return 0;
      if (typeof k === 'symbol') return undefined;
      return (guardado[k] = nada(nombre + '.' + String(k)));
    },
    set(t, k, v){ guardado[k] = v; return true; },
    apply(){ return nada(nombre + '()'); },
    construct(){ return nada('new ' + nombre); },
    has(){ return true; },
  });
}
// (un elemento: guarda lo que se le pone —hidden, textContent, style…— y tiene hijos de mentira)
function elemento(tag = 'div', texto = ''){
  const e = nada(tag);
  Object.assign(e, { tagName: tag.toUpperCase(), textContent: texto, innerText: texto, innerHTML: '', value: '', hidden: true, style: {}, dataset: {}, children: [], childNodes: [],
    classList: { add(){}, remove(){}, toggle(){}, contains: () => false }, addEventListener(){}, removeEventListener(){}, appendChild: x => x, removeChild: x => x, append(){}, prepend(){}, remove(){}, insertBefore: x => x,
    setAttribute(){}, getAttribute: () => null, removeAttribute(){}, querySelector: () => null, querySelectorAll: () => [], getBoundingClientRect: () => ({ x: 0, y: 0, left: 0, top: 0, width: 0, height: 0, right: 0, bottom: 0 }), focus(){}, blur(){}, click(){}, scrollIntoView(){} });
  if (tag === 'canvas') Object.assign(e, { width: 8, height: 8, getContext: () => contexto(), toDataURL: () => '' });
  return e;
}
function contexto(){
  const c = nada('ctx');
  Object.assign(c, { getImageData: (x, y, w, h) => ({ data: new Uint8ClampedArray(Math.max(1, (w | 0) * (h | 0) * 4)), width: w, height: h }), measureText: t => ({ width: String(t).length * 6 }),
    getTransform: () => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }), createImageData: (w, h) => ({ data: new Uint8ClampedArray(Math.max(1, (w | 0) * (h | 0) * 4)), width: w, height: h }) });
  return c;
}

function cargarJuego({ dev = true, webdriver = true } = {}){
  const html = fs.readFileSync(INDEX, 'utf8');
  // (los datos que el juego lee de la página —el guion, los dichos…—: <script type="text/plain" id="…">)
  const textos = {};
  for (const m of html.matchAll(/<script type="text\/plain" id="([^"]+)">([\s\S]*?)<\/script>/g)) if (!(m[1] in textos)) textos[m[1]] = m[2];   // (con el id repetido, el primero: como el navegador)
  const codigos = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  const porId = {};
  const documento = Object.assign(nada('document'), {
    getElementById: id => porId[id] || (porId[id] = elemento(id === 'cv' ? 'canvas' : 'div', textos[id] || '')),
    createElement: tag => elemento(tag), createElementNS: (ns, tag) => elemento(tag), createTextNode: t => elemento('#text', t),
    querySelector: () => null, querySelectorAll: () => [], addEventListener(){}, removeEventListener(){}, body: elemento('body'), documentElement: elemento('html'), head: elemento('head'), hidden: false, visibilityState: 'visible', fonts: { ready: Promise.resolve(), load: () => Promise.resolve() },
  });
  const memoria = {}, almacen = { getItem: k => (k in memoria ? memoria[k] : null), setItem: (k, v) => { memoria[k] = String(v); }, removeItem: k => { delete memoria[k]; }, clear: () => { for (const k in memoria) delete memoria[k]; } };
  const ventana = {
    document: documento, localStorage: almacen, sessionStorage: { ...almacen },
    location: { search: dev ? '?dev' : '', href: 'file://' + INDEX + (dev ? '?dev' : ''), hash: '', reload(){} },
    navigator: { webdriver, userAgent: 'node', language: 'es', maxTouchPoints: 0, vibrate(){}, clipboard: { writeText: () => Promise.resolve() } },
    innerWidth: 1100, innerHeight: 700, devicePixelRatio: 1, performance: { now: () => Date.now() },
    requestAnimationFrame: () => 0, cancelAnimationFrame(){}, addEventListener(){}, removeEventListener(){}, matchMedia: () => ({ matches: false, addEventListener(){}, addListener(){} }),
    getComputedStyle: () => ({ getPropertyValue: () => '' }), alert(){}, confirm: () => true, prompt: () => null, open(){},
    Image: function () { return elemento('img'); }, Audio: function () { return nada('audio'); }, AudioContext: function () { return nada('audio'); }, webkitAudioContext: undefined,
    fetch: () => Promise.reject(new Error('sin red')), ResizeObserver: function () { return { observe(){}, disconnect(){} }; }, speechSynthesis: undefined,
    setTimeout: (f, t) => { const h = setTimeout(f, t); h.unref?.(); return h; }, clearTimeout, setInterval: (f, t) => { const h = setInterval(f, t); h.unref?.(); return h; }, clearInterval,
    console, Math, Date, JSON, Promise, URL, Blob: function () {}, TextEncoder, TextDecoder, structuredClone, queueMicrotask,
    Uint8Array, Uint8ClampedArray, Float32Array, Int32Array, Map, Set, WeakMap, WeakSet, Symbol, Proxy, Reflect, Error, isFinite, isNaN, parseFloat, parseInt, Intl,
  };
  ventana.window = ventana; ventana.self = ventana; ventana.globalThis = ventana;
  const ctx = vm.createContext(ventana);
  for (const c of codigos) vm.runInContext(c, ctx, { filename: 'index.html' });
  const A = ventana.__avonlea;
  if (!A) throw new Error('el juego no quedó cargado (falta window.__avonlea)');
  return { A, ev: s => A.ev(s), ventana };
}
module.exports = { cargarJuego };

if (require.main === module) {   // (para ver que carga: node tools/mundo/sin_navegador.js)
  const t0 = Date.now(), J = cargarJuego();
  console.log(`cargó en ${Date.now() - t0} ms · ${J.ev('Object.keys(PEOPLE).length')} personas · Ana en ${J.ev('game.scene')} · ${J.ev('fmtHour(hourNow())')}`);
}
