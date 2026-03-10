const CACHE_NAME = "foodiehub-v3";

const urlsToCache = [
  "/",
  "/index.html",
  "/login.html",
  "/menu.html",
  "/about.html",
  "/contact.html",
  "/assets/css/style.css",
  "/assets/js/cart.js"
];

// INSTALL
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// ACTIVATE → DELETE OLD CACHE
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

// FETCH → NETWORK FIRST (IMPORTANT FIX)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, res.clone());
          return res;
        });
      })
      .catch(() => caches.match(event.request))
  );
});
self.skipWaiting();