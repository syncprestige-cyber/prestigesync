const CACHE_NAME = "streamtv-shell-v4";
const SHELL = [
    "./",
    "./index.html",
    "./css/style.css",
    "./js/app.js",
    "./manifest.json",
];

self.addEventListener("install", (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL)));
    self.skipWaiting();
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((k) => k !== CACHE_NAME)
                        .map((k) => caches.delete(k)),
                ),
            ),
    );
    self.clients.claim();
});

self.addEventListener("fetch", (e) => {
    const url = e.request.url;
    const isShellAsset = SHELL.some((path) =>
        url.endsWith(path.replace("./", "")),
    );

    if (isShellAsset) {
        e.respondWith(
            fetch(e.request)
                .then((networkResponse) => {
                    // Clone SEBELUM return — Response body hanya bisa dibaca sekali
                    const toCache = networkResponse.clone();
                    caches
                        .open(CACHE_NAME)
                        .then((cache) => cache.put(e.request, toCache));
                    return networkResponse;
                })
                .catch(() => caches.match(e.request)),
        );
    }
});
