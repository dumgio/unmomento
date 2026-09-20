import { STATI, DISCIPLINE, VOCI, DOMANDE_ORIENTAMENTO } from '../contenuti/comuni.js';
import { esc } from './comuni.js';

export function oraHome({ voce, pensiero }) {
  return `
  <p class="marchio">Formebrevi APS</p>
  <h1 class="titolo">Stoicismo quotidiano</h1>
  <p class="lead">Esercizi di filosofia stoica per ritrovare calma e lucidità quando qualcosa ti turba.</p>
  <button class="btn primario grande" data-az="inizia-flusso">Ho bisogno di un momento</button>
  <div class="pensiero" aria-live="polite">
    <p>${esc(pensiero.testo)}</p>
    <small>${esc(pensiero.fonte.autore)}, ${esc(pensiero.fonte.opera)}</small>
  </div>
  <button class="btn chiaro piccolo" data-az="altro-pensiero">Un altro pensiero</button>
  <h2 class="grp">Chi ti accompagna</h2>
  <p class="nota">Scegli il tono con cui ti parla l'app. Gli esercizi sono gli stessi: cambiano le frasi di apertura e di chiusura e i pensieri.</p>
  <div class="voci" role="group" aria-label="Scegli la voce">
    ${VOCI.map((x) => `<button class="chip" data-az="voce" data-id="${x.id}" aria-pressed="${x.id === voce}">${esc(x.nome)}<small>${esc(x.tono)}</small></button>`).join('')}
  </div>
  <p class="nota" aria-live="polite">${esc(VOCI.find((x) => x.id === voce).desc)}</p>
  <p class="piede">Gratuita, senza account e anche senza connessione. Un progetto di Formebrevi APS.</p>`;
}

export function sceglieStato() {
  return `
  <button class="indietro" data-az="indietro">← Indietro</button>
  <h1 class="titolo medio">Che cosa senti?</h1>
  <p class="lead">Scegli ciò che si avvicina di più a come stai.</p>
  ${STATI.map((s) => `<button class="opzione" data-az="stato" data-id="${s.id}"><strong>${esc(s.nome)}</strong><span>${esc(s.sotto)}</span></button>`).join('')}`;
}

export function sceglieDisciplina() {
  const tre = DISCIPLINE.filter((d) => d.id !== 'presenza');
  return `
  <button class="indietro" data-az="indietro">← Indietro</button>
  <h1 class="titolo medio">Dove ti sei perso?</h1>
  <p class="lead">Ti sei perso nel modo di vedere le cose, in ciò che vuoi o temi, o in ciò che devi fare?</p>
  ${tre.map((d) => `<button class="opzione" data-az="disciplina" data-id="${d.id}"><strong>${esc(d.scelta)}</strong><span>${esc(d.sotto)}</span></button>`).join('')}
  <button class="opzione" data-az="non-so-dove"><strong>Non lo so</strong><span>Due domande ti aiutano a capirlo.</span></button>`;
}

export function orientaHtml({ futuro, fare }) {
  const riga = (d, valore) => `
    <div class="domanda-si-no"><p>${esc(d.testo)}</p>
      <div class="chips" role="group" aria-label="${esc(d.testo)}">
        <button class="chip" data-az="orienta" data-k="${d.id}" data-v="1" aria-pressed="${valore === true}">Sì</button>
        <button class="chip" data-az="orienta" data-k="${d.id}" data-v="0" aria-pressed="${valore === false}">No</button>
      </div></div>`;
  return `
  <button class="indietro" data-az="indietro">← Indietro</button>
  <h1 class="titolo medio">Due domande</h1>
  <p class="lead">Rispondi d'istinto. Non ci sono risposte sbagliate.</p>
  ${riga(DOMANDE_ORIENTAMENTO[0], futuro)}
  ${riga(DOMANDE_ORIENTAMENTO[1], fare)}
  <button class="btn primario" data-az="orienta-continua" ${futuro === null || fare === null ? 'disabled' : ''}>Continua</button>`;
}

export function sceglieTempo() {
  return `
  <button class="indietro" data-az="indietro">← Indietro</button>
  <h1 class="titolo medio">Quanto tempo hai?</h1>
  <p class="lead">Anche un minuto basta per cominciare.</p>
  <div class="tempi">
    <button class="btn chiaro" data-az="tempo" data-m="1">1<small>minuto</small></button>
    <button class="btn chiaro" data-az="tempo" data-m="3">3<small>minuti</small></button>
    <button class="btn chiaro" data-az="tempo" data-m="10">10<small>minuti</small></button>
  </div>`;
}

export function proposteHtml(lista) {
  const disc = (id) => (DISCIPLINE.find((d) => d.id === id) || {}).nome || id;
  return `
  <button class="indietro" data-az="indietro">← Indietro</button>
  <h1 class="titolo medio">Ti propongo questi</h1>
  <p class="lead">Scegline uno, oppure lascia scegliere a me.</p>
  <div class="carte">
    ${lista.map((e) => `<button class="carta-link" data-az="scegli-esercizio" data-id="${e.id}">
      <strong>${esc(e.titolo)}</strong>
      <span class="tag">${e.minuti} min</span><span class="tag">${esc(disc(e.disciplina))}</span>
      <br><span>${esc(e.fonte.autore)}, ${esc(e.fonte.opera)}</span></button>`).join('')}
  </div>
  <div class="duo" style="margin-top:14px">
    <button class="btn chiaro" data-az="sorprendi">Sorprendimi</button>
    <button class="btn chiaro" data-az="altri-tre">Altri tre</button>
  </div>`;
}
