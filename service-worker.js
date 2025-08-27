const CACHE_NAME = 'offline-cache-v1';
const OFFLINE_URL = 'offline.html';

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.add(new Request(OFFLINE_URL, {mode: 'opaque'}));
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    // Feature-detect
    if (typeof self.skipWaiting === 'function') {
      self.skipWaiting();
    }
    console.log('Service Worker Activated');
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate' ||
      (event.request.method === 'GET' &&
       event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
        // Return the offline page
        return caches.open(CACHE_NAME).then(cache => {
          return cache.match(OFFLINE_URL);
        });
      })
    );
  }
});