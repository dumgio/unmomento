// Service worker di Stoicismo quotidiano: salva i file sul telefono così la app funziona senza connessione.
// Quando cambi un file dell'app, cambia anche il numero di versione qui sotto.
const CACHE = 'stoicismo-v31';
const FILE = [
  './',
  'index.html',
  'manifest.json',
  'css/stile.css',
  'js/app.js',
  'js/contenuti/info.js',
  'js/contenuti/quaderno.js',
  'js/contenuti/studio.js',
  'js/contenuti/studio3.js',
  'js/contenuti/studio4.js',
  'js/contenuti/studio5.js',
  'js/contenuti/corso.js',
  'js/contenuti/lezioni1.js',
  'js/contenuti/lezioni2.js',
  'js/contenuti/lezioni3.js',
  'js/contenuti/lezioni4.js',
  'js/contenuti/lezioni5.js',
  'js/contenuti/lezioni6.js',
  'js/contenuti/lezioni7.js',
  'js/contenuti/lezioni8.js',
  'js/logica/corso.js',
  'js/ui/corso.js',
  'js/logica/quaderno.js',
  'js/ui/comuni.js',
  'js/ui/quaderno.js',
  'icon/icon-192.png',
  'icon/icon-512.png',
  'icon/icon-maskable-512.png',
  'icon/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((nomi) => Promise.all(nomi.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((trovato) =>
      trovato || fetch(e.request).catch(() => caches.match('index.html'))),
  );
});
