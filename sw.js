// Lets the app open offline and be installed. Always tries the network first,
// so a new version on GitHub shows up on the next open.
const CACHE = "cell-home-v2";
const SHELL = ["./", "index.html", "firebase-config.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Firebase data and sign-in traffic never goes through the cache
  if (/googleapis\.com|firebaseapp\.com|identitytoolkit|securetoken/.test(url.host) && !/fonts\.googleapis/.test(url.host)) return;
  const cacheable = url.origin === location.origin || /gstatic\.com|fonts\.googleapis\.com|cdnjs\.cloudflare\.com/.test(url.host);
  if (!cacheable) return;
  // Same-site files skip the browser cache so a new upload to GitHub shows up right away
  const fresh = url.origin === location.origin ? fetch(req, { cache: "no-cache" }) : fetch(req);
  e.respondWith(fresh.then(res => {
    if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
});
