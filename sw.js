// Service worker di Stoicismo quotidiano: salva i file sul telefono così la app funziona senza connessione.
// Quando cambi un file dell'app, cambia anche il numero di versione qui sotto.
const CACHE = 'stoicismo-v19';
const FILE = [
  './',
  'index.html',
  'manifest.json',
  'css/stile.css',
  'js/app.js',
  'js/contenuti/comuni.js',
  'js/contenuti/esercizi.js',
  'js/contenuti/esercizi3.js',
  'js/contenuti/info.js',
  'js/contenuti/meditazioni.js',
  'js/contenuti/meditazioni3.js',
  'js/contenuti/pensieri.js',
  'js/contenuti/pensieri3.js',
  'js/contenuti/percorsi.js',
  'js/contenuti/percorsi3.js',
  'js/contenuti/quaderno.js',
  'js/contenuti/studio.js',
  'js/contenuti/studio3.js',
  'js/contenuti/studio4.js',
  'js/contenuti/studio5.js',
  'js/contenuti/approfondimenti.js',
  'js/contenuti/approfondimenti1.js',
  'js/contenuti/approfondimenti2.js',
  'js/contenuti/approfondimenti3.js',
  'js/contenuti/approfondimenti4.js',
  'js/contenuti/approfondimenti5.js',
  'js/contenuti/approfondimenti6.js',
  'js/contenuti/esercizi4.js',
  'js/logica/catalogo.js',
  'js/logica/meditazione.js',
  'js/logica/percorsi.js',
  'js/logica/quaderno.js',
  'js/logica/respiro.js',
  'js/logica/sessione.js',
  'js/logica/suggerisci.js',
  'js/ui/animazione.js',
  'js/ui/catalogo.js',
  'js/ui/comuni.js',
  'js/ui/esercizio.js',
  'js/ui/ora.js',
  'js/ui/percorsi.js',
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
