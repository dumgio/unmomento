import { ESERCIZI } from './contenuti/esercizi.js';
import { PENSIERI } from './contenuti/pensieri.js';
import { PAGINE_STUDIO } from './contenuti/studio.js';
import { MEDITAZIONI } from './contenuti/meditazioni.js';
import { PAGINE_INFO, CONTATTI } from './contenuti/info.js';
import { VOCI } from './contenuti/comuni.js';
import { orientamento, suggerisci } from './logica/suggerisci.js';
import {
  creaSessione, passoCorrente, avanza, sceglie, indietro, rispondi, aggiungiElemento, spostaElemento,
} from './logica/sessione.js';
import { faseRespiro, durataRespiro } from './logica/respiro.js';
import { pianoMeditazione, segmentoAl } from './logica/meditazione.js';
import { filtraEsercizi } from './logica/catalogo.js';
import {
  CHIAVE as CHIAVE_QUADERNO, leggiElenco, serializza, nuovaPagina, scrivi as scriviPagina, intitola, altraDomanda,
  haTesto, salvaPagina, eliminaPagina, testoPagina, testoTutto, paginaDaEsercizio,
} from './logica/quaderno.js';
import { quadernoElenco, quadernoNuova, quadernoPagina } from './ui/quaderno.js';
import { disegnaVista, livelloAl } from './ui/animazione.js';
import { esc, paginaHtml, elencoHtml } from './ui/comuni.js';
import { oraHome, sceglieStato, sceglieDisciplina, orientaHtml, sceglieTempo, proposteHtml } from './ui/ora.js';
import { introHtml, passoHtml, chiusuraHtml } from './ui/esercizio.js';
import {
  catalogoHtml, listaEsercizi, schedaEsercizioHtml, schedaMeditazioneHtml, meditazioneInCorso,
} from './ui/catalogo.js';

// ---- Memoria del telefono: la voce scelta, la nota di apertura già letta e, se lo usi, il quaderno ----
const CHIAVE_VOCE = 'un-momento-voce';
const CHIAVE_NOTA = 'un-momento-nota';
const leggi = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const scrivi = (k, v) => { try { localStorage.setItem(k, v); } catch { /* facoltativo */ } };

// ---- Stato ----
const app = document.getElementById('app');
const zone = document.getElementById('zone');
const ZONE = [['ora', 'Ora'], ['esercizi', 'Esercizi'], ['quaderno', 'Quaderno'], ['studio', 'Studio'], ['info', 'Info']];
const RADICE = { ora: 'ora-home', esercizi: 'catalogo', quaderno: 'quaderno', studio: 'studio-elenco', info: 'info-elenco' };

let pila = [{ v: 'ora-home' }];
let zona = 'ora';
let voce = VOCI.some((x) => x.id === leggi(CHIAVE_VOCE)) ? leggi(CHIAVE_VOCE) : 'seneca';
let pensiero = pensieroCasuale();
let flusso = { stato: null, disciplina: null, minuti: null, futuro: null, fare: null, recenti: [], proposte: [] };
let sessione = null;
let intro = false;
let timer = null;
let filtro = { q: '', stato: '', disciplina: '', minuti: '', famiglia: '' };
let med = null;
let audio = null;
let wakeLock = null;
let quaderno = leggiElenco(leggi(CHIAVE_QUADERNO));
let pagina = null;
let salvata = false;
let animazione = null;

const persistiQuaderno = () => scrivi(CHIAVE_QUADERNO, serializza(quaderno));

function pensieroCasuale(escludi) {
  const lista = PENSIERI.filter((p) => p.voce === voce && p.testo !== escludi);
  return lista[Math.floor(Math.random() * lista.length)];
}

const corrente = () => pila[pila.length - 1];

// ---- Suoni: generati nel browser ----
function preparaAudio() {
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === 'suspended') audio.resume();
  } catch { /* facoltativo */ }
}
function tono(freq, durata, volume, ritardo = 0) {
  if (!audio) return;
  try {
    const t = audio.currentTime + ritardo;
    const o = audio.createOscillator();
    const g = audio.createGain();
    o.type = 'sine';
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(volume, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + durata);
    o.connect(g).connect(audio.destination);
    o.start(t);
    o.stop(t + durata + 0.05);
  } catch { /* facoltativo */ }
}
const campana = () => { tono(392, 3.2, 0.22); tono(784, 2.6, 0.09); tono(1176, 1.8, 0.04); };
const suonoPausa = () => tono(523, 1.4, 0.16);

async function richiediWakeLock() {
  try { if ('wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen'); } catch { /* facoltativo */ }
}
function rilasciaWakeLock() { try { wakeLock?.release(); } catch { /* già rilasciato */ } wakeLock = null; }
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && (sessione || med)) richiediWakeLock();
});

const formatTempo = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');

// ---- Viste ----
function notaHtml() {
  return `
  <p class="marchio">Formebrevi APS</p>
  <h1 class="titolo medio">Benvenuto in Stoicismo quotidiano</h1>
  <p class="lead">Una piccola guida per i momenti in cui ti senti in ansia, arrabbiato, sopraffatto o confuso.</p>
  <div class="scheda">
    <p style="margin:0 0 14px"><strong>Come funziona.</strong> Dici che cosa senti e quanto tempo hai: da uno a dieci minuti. L'app ti propone alcuni esercizi e ti guida passo passo, con brevi domande, respiri e pause.</p>
    <p style="margin:0 0 14px"><strong>Da dove viene.</strong> Dagli esercizi degli stoici antichi (Epitteto, Seneca, Marco Aurelio), pensati per allenare il modo di pensare.</p>
    <p style="margin:0 0 14px"><strong>Oltre l'emergenza.</strong> Puoi anche fare una meditazione, scrivere nel quaderno, leggere le pagine di studio e capire lo stoicismo, oppure scegliere un pensiero da portare con te.</p>
  </div>
  <p class="nota">Stoicismo quotidiano si basa sulla sapienza degli stoici antichi. Non sostituisce il parere del medico né un percorso di cura: se il malessere è forte o dura da tempo, parlane con il tuo medico. L'app è gratuita, funziona anche senza connessione e senza account, e i tuoi dati restano sul tuo telefono.</p>
  <button class="btn primario" data-az="nota-ok">Comincia</button>`;
}

function studioElenco() {
  return elencoHtml('Studio', "Per capire lo stoicismo e da dove vengono gli esercizi.", [['', PAGINE_STUDIO]], 'apri-studio');
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
    case 'ora-home': return oraHome({ voce, pensiero });
    case 'ora-stato': return sceglieStato();
    case 'ora-dove': return sceglieDisciplina();
    case 'ora-orienta': return orientaHtml(flusso);
    case 'ora-tempo': return sceglieTempo();
    case 'ora-proposte': return proposteHtml(flusso.proposte);
    case 'esercizio':
      if (sessione.conclusa) return chiusuraHtml(sessione, pensiero, { puoSalvare: paginaDaEsercizio(sessione) !== null, salvata });
      return intro ? introHtml(sessione) : passoHtml(sessione);
    case 'catalogo': return catalogoHtml(filtro, filtraEsercizi(ESERCIZI, filtro), MEDITAZIONI);
    case 'scheda-esercizio': return schedaEsercizioHtml(ESERCIZI.find((e) => e.id === c.id));
    case 'scheda-meditazione': return schedaMeditazioneHtml(MEDITAZIONI.find((m) => m.id === c.id));
    case 'meditazione': return meditazioneInCorso(med.m);
    case 'quaderno': return quadernoElenco(quaderno);
    case 'quaderno-nuova': return quadernoNuova();
    case 'quaderno-pagina': return quadernoPagina(pagina);
    case 'studio-elenco': return studioElenco();
    case 'studio-pagina': return paginaHtml(PAGINE_STUDIO.find((p) => p.id === c.id), 'indietro');
    case 'info-elenco': return infoElenco();
    case 'info-pagina': return paginaHtml(PAGINE_INFO.find((p) => p.id === c.id), 'indietro');
    default: return '';
  }
}

function disegnaZone() {
  zone.innerHTML = ZONE.map(([id, nome]) => `<button data-az="zona" data-z="${id}"${zona === id ? ' aria-current="page"' : ''}>${nome}</button>`).join('');
}

function avviaPasso() {
  timer = null;
  if (!sessione || intro || sessione.conclusa) return;
  const p = passoCorrente(sessione);
  if (p.tipo === 'respiro') timer = { tipo: 'respiro', inizio: Date.now(), p };
  if (p.tipo === 'pausa') timer = { tipo: 'pausa', inizio: Date.now(), p, fatto: false };
}

function disegna(mantieniScroll) {
  const y = window.scrollY;
  const c = corrente();
  const immersivo = ['esercizio', 'meditazione', 'nota'].includes(c.v);
  app.classList.toggle('immersivo', immersivo);
  zone.hidden = immersivo;
  app.innerHTML = vista(c);
  disegnaZone();
  window.scrollTo(0, mantieniScroll ? y : 0);
  if (c.v === 'esercizio') avviaPasso();
  tick();
}

const vai = (v, extra = {}) => { pila.push({ v, ...extra }); disegna(); };
function radice(z) { zona = z; pila = [{ v: RADICE[z] }]; disegna(); }

// ---- Esercizi ----
function iniziaEsercizio(id) {
  const e = ESERCIZI.find((x) => x.id === id);
  sessione = creaSessione(e, voce);
  salvata = false;
  intro = true;
  flusso.recenti = [...flusso.recenti.slice(-8), id];
  richiediWakeLock();
  vai('esercizio');
}
function terminaEsercizio() {
  sessione = null; timer = null; intro = false;
  rilasciaWakeLock();
}
function dopoPasso() {
  if (sessione.conclusa) pensiero = pensieroCasuale();
  disegna();
}
function calcolaProposte(escludi = []) {
  flusso.proposte = suggerisci(
    ESERCIZI,
    { stato: flusso.stato, disciplina: flusso.disciplina, minuti: flusso.minuti },
    { recenti: [...flusso.recenti, ...escludi] },
  );
}

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
  const testo = 'Stoicismo quotidiano: esercizi per i momenti difficili. La app gratuita di Formebrevi APS.';
  try {
    if (navigator.share) { await navigator.share({ title: 'Stoicismo quotidiano', text: testo, url: CONTATTI.app }); return; }
  } catch (e) { if (e && e.name === 'AbortError') return; }
  await copia(testo + ' ' + CONTATTI.app);
}

// ---- Azioni ----
const azioni = {
  'nota-ok': () => { scrivi(CHIAVE_NOTA, '1'); pila = [{ v: 'ora-home' }]; disegna(); },
  zona: (d) => radice(d.z),
  indietro: () => { if (pila.length > 1) pila.pop(); disegna(); },
  condividi,
  voce: (d) => { voce = d.id; scrivi(CHIAVE_VOCE, voce); pensiero = pensieroCasuale(); disegna(true); },
  'altro-pensiero': () => { pensiero = pensieroCasuale(pensiero.testo); disegna(true); },

  // Il flusso «Ho bisogno di un momento»
  'inizia-flusso': () => { flusso = { stato: null, disciplina: null, minuti: null, futuro: null, fare: null, recenti: flusso.recenti, proposte: [] }; vai('ora-stato'); },
  stato: (d) => { flusso.stato = d.id; vai('ora-dove'); },
  disciplina: (d) => { flusso.disciplina = d.id; vai('ora-tempo'); },
  'non-so-dove': () => { flusso.futuro = null; flusso.fare = null; vai('ora-orienta'); },
  orienta: (d) => { flusso[d.k] = d.v === '1'; disegna(true); },
  'orienta-continua': () => { flusso.disciplina = orientamento(flusso); vai('ora-tempo'); },
  tempo: (d) => { flusso.minuti = Number(d.m); calcolaProposte(); vai('ora-proposte'); },
  'altri-tre': () => { calcolaProposte(flusso.proposte.map((e) => e.id)); disegna(true); },
  sorprendi: () => iniziaEsercizio(flusso.proposte[Math.floor(Math.random() * flusso.proposte.length)].id),
  'scegli-esercizio': (d) => iniziaEsercizio(d.id),

  // L'esercizio guidato
  comincia: () => { intro = false; disegna(); },
  'avanti-passo': () => { sessione = avanza(sessione); dopoPasso(); },
  opzione: (d) => { sessione = sceglie(sessione, Number(d.i)); dopoPasso(); },
  'indietro-passo': () => { sessione = indietro(sessione); disegna(); },
  'col-aggiungi': (d) => {
    const campo = document.getElementById('nuovo-' + d.lato);
    const p = passoCorrente(sessione);
    if (!campo || !campo.value.trim()) return;
    sessione = aggiungiElemento(sessione, p.chiave, d.lato, campo.value);
    disegna(true);
    document.getElementById('nuovo-' + d.lato)?.focus();
  },
  'col-sposta': (d) => { sessione = spostaElemento(sessione, passoCorrente(sessione).chiave, d.da, Number(d.i)); disegna(true); },
  'esci-esercizio': () => { terminaEsercizio(); pila.pop(); disegna(); },
  'altro-esercizio': () => {
    terminaEsercizio(); pila.pop();
    if (corrente().v === 'ora-proposte') calcolaProposte(flusso.proposte.map((e) => e.id));
    disegna();
  },
  'fine-esercizio': () => { terminaEsercizio(); radice('ora'); },

  // Il quaderno
  'salva-quaderno': () => {
    const p = paginaDaEsercizio(sessione);
    if (!p || salvata) return;
    quaderno = salvaPagina(quaderno, p);
    persistiQuaderno();
    salvata = true;
    avviso('Salvato nel quaderno');
    disegna(true);
  },
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

  // Catalogo, studio, info
  filtro: (d) => { filtro[d.k] = String(filtro[d.k]) === d.v ? '' : d.v; disegna(true); },
  apri: (d) => {
    if (corrente().v === 'esercizio') { terminaEsercizio(); pila.pop(); }
    if (d.tipo === 'esercizio') vai('scheda-esercizio', { id: d.id });
    else if (d.tipo === 'meditazione') vai('scheda-meditazione', { id: d.id });
    else if (d.tipo === 'studio') {
      if (zona === 'studio') vai('studio-pagina', { id: d.id });
      else { zona = 'studio'; pila = [{ v: 'studio-elenco' }, { v: 'studio-pagina', id: d.id }]; disegna(); }
    } else if (d.tipo === 'info') {
      if (zona === 'info') vai('info-pagina', { id: d.id });
      else { zona = 'info'; pila = [{ v: 'info-elenco' }, { v: 'info-pagina', id: d.id }]; disegna(); }
    }
  },
  'apri-studio': (d) => vai('studio-pagina', { id: d.id }),
  'apri-info': (d) => vai('info-pagina', { id: d.id }),

  // Le meditazioni
  'inizia-meditazione': (d) => {
    const m = MEDITAZIONI.find((x) => x.id === d.id);
    med = { m, piano: pianoMeditazione(m), inizio: Date.now(), indice: -1, finita: false };
    richiediWakeLock();
    vai('meditazione');
    if (m.animazione) animaVista();
  },
  'ferma-meditazione': () => { med = null; if (animazione) cancelAnimationFrame(animazione); animazione = null; rilasciaWakeLock(); pila.pop(); disegna(); },
};

app.addEventListener('click', (e) => {
  const el = e.target.closest('[data-az]');
  if (!el) return;
  preparaAudio();
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
    return;
  }
  if (e.target.dataset && e.target.dataset.campo && sessione) { sessione = rispondi(sessione, e.target.dataset.campo, e.target.value); return; }
  if (e.target.id === 'cerca') {
    filtro.q = e.target.value;
    const lista = document.getElementById('lista-catalogo');
    if (lista) lista.innerHTML = listaEsercizi(filtraEsercizi(ESERCIZI, filtro));
  }
});
app.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.id && e.target.id.startsWith('nuovo-')) { e.preventDefault(); azioni['col-aggiungi']({ lato: e.target.id.slice(6) }); }
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const v = corrente().v;
  if (v === 'esercizio') azioni['esci-esercizio']();
  else if (v === 'meditazione') azioni['ferma-meditazione']();
});

// ---- La vista dall'alto: un canvas che sale fino allo spazio e torna giù ----
const menoMovimento = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function animaVista() {
  const canvas = document.getElementById('med-anim');
  if (!med || !med.m.animazione) { animazione = null; return; }
  if (canvas) {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (canvas.width !== Math.round(w * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const t = (Date.now() - med.inizio) / 1000;
    let u = med.finita ? 0 : livelloAl(med.piano, t);
    if (menoMovimento()) u = Math.round(u);
    disegnaVista(ctx, w, h, u);
  }
  animazione = requestAnimationFrame(animaVista);
}

// ---- Orologio a schermo: respiro, pause e meditazioni ----
function tick() {
  const c = corrente();
  if (c.v === 'esercizio' && timer) {
    const t = (Date.now() - timer.inizio) / 1000;
    if (timer.tipo === 'respiro') {
      const p = timer.p;
      const fine = t >= durataRespiro(p);
      const f = faseRespiro(fine ? 0 : t, p);
      const cerchio = document.getElementById('cerchio');
      if (cerchio) {
        cerchio.style.transform = `scale(${(0.55 + 0.45 * (fine ? 0 : f.cerchio)).toFixed(3)})`;
        const testo = document.getElementById('cerchio-testo');
        const etichetta = fine ? 'Fatto' : f.fase === 'dentro' ? 'Dentro' : f.fase === 'fuori' ? 'Fuori' : 'Pausa';
        if (testo && testo.textContent !== etichetta) testo.textContent = etichetta;
        const r = document.getElementById('respiri');
        const nuovo = fine ? 'Ora puoi continuare' : `Respiro ${Math.min(f.ciclo, p.cicli)} di ${p.cicli}`;
        if (r && r.textContent !== nuovo) r.textContent = nuovo;
      }
    } else if (timer.tipo === 'pausa') {
      const resto = Math.max(0, Math.ceil(timer.p.secondi - t));
      const conto = document.getElementById('conto');
      if (conto && conto.textContent !== String(resto)) conto.textContent = String(resto);
      if (resto === 0 && !timer.fatto) { timer.fatto = true; suonoPausa(); }
    }
  }
  if (c.v === 'meditazione' && med) {
    const t = (Date.now() - med.inizio) / 1000;
    const s = segmentoAl(med.piano, t);
    const testo = document.getElementById('med-testo');
    if (s.finita) {
      if (!med.finita) {
        med.finita = true;
        campana();
        if (testo) testo.textContent = 'Grazie. La meditazione è finita.';
        const btn = document.querySelector('[data-az="ferma-meditazione"]');
        if (btn) btn.textContent = 'Chiudi';
        rilasciaWakeLock();
      }
    } else if (s.indice !== med.indice) {
      med.indice = s.indice;
      if (testo) testo.textContent = med.piano[s.indice].testo;
      if (med.piano[s.indice].suono === 'campana') campana();
    }
    const barra = document.getElementById('med-prog');
    if (barra) barra.style.width = Math.min(100, (t / s.totale) * 100).toFixed(1) + '%';
    const resto = document.getElementById('med-resto');
    if (resto) resto.textContent = formatTempo(s.finita ? 0 : s.restoTotale);
  }
}
setInterval(tick, 250);

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
if (!leggi(CHIAVE_NOTA)) pila = [{ v: 'nota' }];
disegna();
