import { PAGINE_STUDIO, GRUPPI_STUDIO } from './contenuti/studio.js';
import { PAGINE_INFO, CONTATTI } from './contenuti/info.js';
import {
  CHIAVE as CHIAVE_QUADERNO, leggiElenco, serializza, nuovaPagina, scrivi as scriviPagina, intitola, altraDomanda,
  haTesto, salvaPagina, eliminaPagina, testoPagina, testoTutto, paginaDaDomanda,
} from './logica/quaderno.js';
import { quadernoElenco, quadernoNuova, quadernoPagina } from './ui/quaderno.js';
import { MODULI, LEZIONI } from './contenuti/corso.js';
import { CHIAVE as CHIAVE_CORSO, leggiFatte, alternaFatta, eFatta, serializzaFatte, lezioniCheUsano } from './logica/corso.js';
import { corsoHome, moduloHtml, lezioneHtml } from './ui/corso.js';
import { esc, paginaHtml, elencoHtml } from './ui/comuni.js';

// ---- Memoria del telefono: la nota di apertura già letta, le lezioni fatte e, se lo usi, il quaderno ----
const CHIAVE_NOTA = 'un-momento-nota';
const leggi = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const scrivi = (k, v) => { try { localStorage.setItem(k, v); } catch { /* facoltativo */ } };

// ---- Stato ----
const app = document.getElementById('app');
const zone = document.getElementById('zone');
const ZONE = [['corso', 'Corso'], ['quaderno', 'Quaderno'], ['studio', 'Biblioteca'], ['info', 'Info']];
const RADICE = { corso: 'corso-home', quaderno: 'quaderno', studio: 'studio-elenco', info: 'info-elenco' };

let pila = [{ v: 'corso-home' }];
let zona = 'corso';
let quaderno = leggiElenco(leggi(CHIAVE_QUADERNO));
let pagina = null;
let fatte = leggiFatte(leggi(CHIAVE_CORSO), LEZIONI.map((l) => l.id));

const persistiQuaderno = () => scrivi(CHIAVE_QUADERNO, serializza(quaderno));
const corrente = () => pila[pila.length - 1];

// ---- Viste ----
function notaHtml() {
  return `
  <p class="marchio">Formebrevi APS</p>
  <h1 class="titolo medio">Benvenuto in Stoicismo quotidiano</h1>
  <p class="lead">Un corso per imparare a essere stoici, con le parole dei maestri antichi raccontate in modo semplice.</p>
  <div class="scheda">
    <p style="margin:0 0 14px"><strong>Il corso.</strong> Otto moduli, dalle fondamenta alla vita di ogni giorno. Ogni lezione spiega un'idea, ti indica dove leggerla in Epitteto, Seneca o Marco Aurelio e racconta come la vivevano ogni giorno.</p>
    <p style="margin:0 0 14px"><strong>Il resto.</strong> Un quaderno per scrivere, e una biblioteca per approfondire.</p>
  </div>
  <p class="nota">Stoicismo quotidiano si basa sulla sapienza degli stoici antichi. Non sostituisce il parere del medico né un percorso di cura: se il malessere è forte o dura da tempo, parlane con il tuo medico. L'app è gratuita, funziona anche senza connessione e senza account, e i tuoi dati restano sul tuo telefono.</p>
  <button class="btn primario" data-az="nota-ok">Comincia</button>`;
}

function studioElenco() {
  return elencoHtml('Biblioteca', 'Le pagine per approfondire: le idee, le passioni e le virtù, gli autori, la storia della scuola e il glossario.',
    GRUPPI_STUDIO.map((g) => [g.nome, g.ids.map((id) => PAGINE_STUDIO.find((p) => p.id === id))]), 'apri-studio');
}
function infoElenco() {
  return elencoHtml('Info', 'Come funziona la app, le fonti e come sostenere Formebrevi.', [
    ['La app', PAGINE_INFO.filter((p) => p.gruppo === 'app')],
    ['Formebrevi', PAGINE_INFO.filter((p) => p.gruppo === 'formebrevi')],
  ], 'apri-info');
}

function vista(c) {
  switch (c.v) {
    case 'nota': return notaHtml();
    case 'corso-home': return corsoHome({ moduli: MODULI, fatte, lezioni: LEZIONI });
    case 'corso-modulo': return moduloHtml(MODULI.find((m) => m.id === c.id), LEZIONI, fatte);
    case 'lezione': {
      const l = LEZIONI.find((x) => x.id === c.id);
      const ordine = MODULI.flatMap((m) => m.lezioni);
      const succ = LEZIONI.find((x) => x.id === ordine[ordine.indexOf(l.id) + 1]);
      return lezioneHtml(l, { fatta: eFatta(fatte, l.id), successiva: succ });
    }
    case 'quaderno': return quadernoElenco(quaderno);
    case 'quaderno-nuova': return quadernoNuova();
    case 'quaderno-pagina': return quadernoPagina(pagina);
    case 'studio-elenco': return studioElenco();
    case 'studio-pagina': {
      const nel = lezioniCheUsano(LEZIONI, c.id);
      const prima = nel.length ? `<p class="nota">Ne parla la lezione: ${nel.map((l) => `<button class="link-in-riga" data-az="apri-lezione" data-id="${esc(l.id)}">${esc(l.titolo)}</button>`).join(', ')}</p>` : '';
      return paginaHtml(PAGINE_STUDIO.find((p) => p.id === c.id), 'indietro', prima);
    }
    case 'info-elenco': return infoElenco();
    case 'info-pagina': return paginaHtml(PAGINE_INFO.find((p) => p.id === c.id), 'indietro');
    default: return '';
  }
}

function disegnaZone() {
  zone.innerHTML = ZONE.map(([id, nome]) => `<button data-az="zona" data-z="${id}"${zona === id ? ' aria-current="page"' : ''}>${nome}</button>`).join('');
}

function disegna(mantieniScroll) {
  const y = window.scrollY;
  const c = corrente();
  const immersivo = c.v === 'nota';
  app.classList.toggle('immersivo', immersivo);
  zone.hidden = immersivo;
  app.innerHTML = vista(c);
  disegnaZone();
  window.scrollTo(0, mantieniScroll ? y : 0);
}

const vai = (v, extra = {}) => { pila.push({ v, ...extra }); disegna(); };
function radice(z) { zona = z; pila = [{ v: RADICE[z] }]; disegna(); }

// ---- Avvisi e condivisione ----
function avviso(testo) {
  const el = document.createElement('div');
  el.className = 'avviso';
  el.setAttribute('role', 'status');
  el.textContent = testo;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}
async function copia(testo) {
  try { await navigator.clipboard.writeText(testo); avviso('Copiato negli appunti'); } catch {
    const t = document.createElement('textarea');
    t.value = testo; document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); avviso('Copiato negli appunti'); } catch { avviso('Non è stato possibile copiare'); }
    t.remove();
  }
}
async function condividi() {
  const testo = 'Stoicismo quotidiano: un corso per imparare a essere stoici. La app gratuita di Formebrevi APS.';
  try {
    if (navigator.share) { await navigator.share({ title: 'Stoicismo quotidiano', text: testo, url: CONTATTI.app }); return; }
  } catch (e) { if (e && e.name === 'AbortError') return; }
  await copia(testo + ' ' + CONTATTI.app);
}

// ---- Azioni ----
const azioni = {
  'nota-ok': () => { scrivi(CHIAVE_NOTA, '1'); zona = 'corso'; pila = [{ v: 'corso-home' }]; disegna(); },
  zona: (d) => radice(d.z),
  indietro: () => { if (pila.length > 1) pila.pop(); disegna(); },
  condividi,

  // Il quaderno
  'quaderno-nuova': () => vai('quaderno-nuova'),
  'quaderno-crea': (d) => { pagina = nuovaPagina(d.id); pila.pop(); vai('quaderno-pagina'); },
  'quaderno-apri': (d) => { pagina = quaderno.find((p) => p.id === d.id); if (pagina) vai('quaderno-pagina'); },
  'quaderno-altra': (d) => {
    const nuova = altraDomanda(pagina, Number(d.i));
    if (nuova === pagina) { avviso("C'è già una risposta: cancellala per cambiare domanda"); return; }
    pagina = nuova;
    quaderno = salvaPagina(quaderno, pagina); persistiQuaderno();
    disegna(true);
  },
  'quaderno-copia': () => { if (haTesto(pagina)) copia(testoPagina(pagina)); else avviso('La pagina è ancora vuota'); },
  'quaderno-copia-tutto': () => copia(testoTutto(quaderno)),
  'quaderno-elimina': () => {
    if (!window.confirm('Vuoi eliminare questa pagina? Non si può recuperare.')) return;
    quaderno = eliminaPagina(quaderno, pagina.id); persistiQuaderno();
    pagina = null; pila.pop(); disegna();
  },

  // Biblioteca e info
  apri: (d) => {
    if (d.tipo === 'studio') {
      if (zona === 'studio') vai('studio-pagina', { id: d.id });
      else { zona = 'studio'; pila = [{ v: 'studio-elenco' }, { v: 'studio-pagina', id: d.id }]; disegna(); }
    } else if (d.tipo === 'info') {
      if (zona === 'info') vai('info-pagina', { id: d.id });
      else { zona = 'info'; pila = [{ v: 'info-elenco' }, { v: 'info-pagina', id: d.id }]; disegna(); }
    }
  },
  'apri-studio': (d) => vai('studio-pagina', { id: d.id }),
  'apri-info': (d) => vai('info-pagina', { id: d.id }),

  // Il corso
  'apri-modulo': (d) => vai('corso-modulo', { id: d.id }),
  'apri-lezione': (d) => {
    if (zona === 'corso') vai('lezione', { id: d.id });
    else { zona = 'corso'; pila = [{ v: 'corso-home' }, { v: 'lezione', id: d.id }]; disegna(); }
  },
  'lezione-fatta': (d) => { fatte = alternaFatta(fatte, d.id); scrivi(CHIAVE_CORSO, serializzaFatte(fatte)); disegna(true); },
  'lezione-quaderno': (d) => {
    const l = LEZIONI.find((x) => x.id === d.id);
    pagina = paginaDaDomanda(l.domanda, l.titolo);
    zona = 'quaderno'; pila = [{ v: 'quaderno' }, { v: 'quaderno-pagina' }]; disegna();
  },
  'ricomincia-corso': () => {
    if (!window.confirm('Vuoi togliere il segno da tutte le lezioni?')) return;
    fatte = []; scrivi(CHIAVE_CORSO, serializzaFatte(fatte)); disegna();
  },
};

app.addEventListener('click', (e) => {
  const el = e.target.closest('[data-az]');
  if (!el) return;
  const fn = azioni[el.dataset.az];
  if (fn) fn(el.dataset, e, el);
});
zone.addEventListener('click', (e) => {
  const el = e.target.closest('[data-az]');
  if (el && azioni[el.dataset.az]) azioni[el.dataset.az](el.dataset, e, el);
});

app.addEventListener('input', (e) => {
  if (pagina && corrente().v === 'quaderno-pagina') {
    if (e.target.id === 'q-titolo') pagina = intitola(pagina, e.target.value);
    else if (e.target.dataset && e.target.dataset.q !== undefined) pagina = scriviPagina(pagina, Number(e.target.dataset.q), e.target.value);
    else return;
    quaderno = salvaPagina(quaderno, pagina);
    persistiQuaderno();
  }
});

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
if (!leggi(CHIAVE_NOTA)) pila = [{ v: 'nota' }];
disegna();
