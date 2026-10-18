// The installed game (a web app added to the phone's or computer's home screen): it keeps a copy of the game so it
// opens without internet, and it adds to every page of its own the two headers the browser asks for before it lets
// the game use threads (Z3, the logic solver, in the browser): with them, crossOriginIsolated is true even on a host
// that does not send them (GitHub Pages). With internet it always takes the newest version (and keeps it); without,
// the copy.
const CACHE = 'avonlea';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', './manifest.webmanifest', './icono-192.png', './icono-512.png']))); });
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const q = e.request; if (q.method !== 'GET' || new URL(q.url).origin !== location.origin) return;
  e.respondWith((async () => {
    let r = null;
    try { r = await fetch(q); if (r.ok) (await caches.open(CACHE)).put(q, r.clone()); }
    catch { r = await caches.match(q, { ignoreSearch: true }) || (q.mode === 'navigate' ? await caches.match('./') : null); }
    if (!r) return Response.error();
    if (r.status === 0) return r;   // (an opaque answer cannot be rewritten)
    const h = new Headers(r.headers); h.set('Cross-Origin-Opener-Policy', 'same-origin'); h.set('Cross-Origin-Embedder-Policy', 'require-corp'); h.set('Cross-Origin-Resource-Policy', 'same-origin');
    return new Response(r.body, { status: r.status, statusText: r.statusText, headers: h });
  })());
});
