// Cache per uso offline. Cambia VERSION a ogni aggiornamento dei file.
const VERSION = 'v2';
const CACHE = 'timbrature-' + VERSION;
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Pagina: prima la rete (così gli aggiornamenti arrivano subito), se offline la copia salvata.
// Altri file (icone, manifest): prima la copia salvata.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req, { cache: 'no-cache' })
        .then(r => {
          if (r.ok) { const copy = r.clone(); e.waitUntil(caches.open(CACHE).then(c => c.put('./index.html', copy))); }
          return r;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(c => c || fetch(req)));
});
