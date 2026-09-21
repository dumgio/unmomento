import { VOCI, SPIEGAZIONI_PASSO } from '../contenuti/comuni.js';
import { esc, ricco } from './comuni.js';
import { avanzamento, passoCorrente } from '../logica/sessione.js';

const nomeVoce = (id) => (VOCI.find((v) => v.id === id) || {}).nome || '';

function testata(sess) {
  return `<div class="testata"><span class="voce-nome">${esc(sess.esercizio.titolo)}</span>
    <button class="esci" data-az="esci-esercizio">Esci</button></div>
    <div class="progresso" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(avanzamento(sess) * 100)}"><div style="width:${Math.round(avanzamento(sess) * 100)}%"></div></div>`;
}

export function introHtml(sess) {
  const e = sess.esercizio;
  return `${testata(sess)}
  <p class="voce-nome">${esc(nomeVoce(sess.voce))}</p>
  <p class="voce-apertura">${esc(e.voci[sess.voce].apertura)}</p>
  <p class="nota">${e.minuti} ${e.minuti === 1 ? 'minuto' : 'minuti'} · ${esc(e.fonte.autore)}, ${esc(e.fonte.opera)}</p>
  <button class="btn primario" data-az="comincia">Comincia</button>`;
}

// Riquadro da aprire: perché questo passo (respiro, pausa, scrittura, colonne).
const perche = (tipo) => SPIEGAZIONI_PASSO[tipo] ? `<details class="aiuto"><summary>Perché questo passo?</summary><p>${esc(SPIEGAZIONI_PASSO[tipo])}</p></details>` : '';

function colonneHtml(p, sess) {
  const c = sess.risposte[p.chiave] || { sinistra: [], destra: [] };
  const colonna = (lato, titolo) => `
    <div class="colonna"><h3>${esc(titolo)}</h3>
      ${c[lato].map((x, i) => `<button class="elemento" data-az="col-sposta" data-da="${lato}" data-i="${i}" aria-label="${esc(x)}: sposta nell'altra colonna">${esc(x)}</button>`).join('')}
      <div class="aggiungi"><input type="text" id="nuovo-${lato}" aria-label="Aggiungi a: ${esc(titolo)}" placeholder="Aggiungi…"><button data-az="col-aggiungi" data-lato="${lato}" aria-label="Aggiungi a: ${esc(titolo)}">+</button></div>
    </div>`;
  return `<div class="colonne">${colonna('sinistra', p.sinistra)}${colonna('destra', p.destra)}</div>`;
}

export function passoHtml(sess) {
  const p = passoCorrente(sess);
  const haIndietro = sess.storia.length > 0;
  const comandi = (avanti) => `<div class="comandi${haIndietro ? '' : ' solo'}">${haIndietro ? '<button class="btn chiaro" data-az="indietro-passo">Indietro</button>' : ''}${avanti}</div>`;
  const avantiBtn = '<button class="btn primario" data-az="avanti-passo">Avanti</button>';
  let corpo = '';
  switch (p.tipo) {
    case 'testo':
      corpo = `<p class="passo">${ricco(p.testo)}</p>${comandi(avantiBtn)}`; break;
    case 'respiro':
      corpo = `<p class="passo">${ricco(p.testo)}</p>
        <div class="cerchio-area" aria-hidden="true"><div class="cerchio" id="cerchio"><span id="cerchio-testo">Dentro</span></div></div>
        <p class="nota" style="text-align:center" id="respiri">Respiro 1 di ${p.cicli}</p>${perche('respiro')}${comandi(avantiBtn)}`; break;
    case 'pausa':
      corpo = `<p class="passo">${ricco(p.testo)}</p><div class="conto" id="conto" role="timer">${p.secondi}</div>${perche('pausa')}${comandi(avantiBtn)}`; break;
    case 'scrivi': {
      const d = ((sess.esercizio.dettagli || {}).passi || {})[p.chiave] || {};
      corpo = `<p class="passo">${ricco(p.testo)}</p>
        ${d.esempio ? `<p class="esempio">${ricco(d.esempio)}</p>` : ''}
        <label class="campo" for="scritto">La tua risposta</label>
        <textarea id="scritto" data-campo="${esc(p.chiave)}" placeholder="${esc(p.segnaposto)}">${esc(sess.risposte[p.chiave] || '')}</textarea>
        <p class="nota">Resta su questo telefono. Alla fine puoi salvarlo nel quaderno, se vuoi.</p>
        ${d.aiuto ? `<details class="aiuto"><summary>Se ti blocchi</summary><p>${ricco(d.aiuto)}</p></details>` : ''}
        ${perche('scrivi')}${comandi(avantiBtn)}`; break;
    }
    case 'scegli':
      corpo = `<p class="passo">${ricco(p.testo)}</p>
        ${p.opzioni.map((o, i) => `<button class="opzione" data-az="opzione" data-i="${i}"><strong>${esc(o.testo)}</strong></button>`).join('')}
        ${haIndietro ? '<div class="comandi solo"><button class="btn chiaro" data-az="indietro-passo">Indietro</button></div>' : ''}`; break;
    case 'colonne': {
      const dc = ((sess.esercizio.dettagli || {}).passi || {})[p.chiave] || {};
      corpo = `<p class="passo">${ricco(p.testo)}</p>${dc.esempio ? `<p class="esempio">${ricco(dc.esempio)}</p>` : ''}${colonneHtml(p, sess)}<p class="nota">Tocca una voce per spostarla nell'altra colonna. Alla fine puoi salvare le colonne nel quaderno.</p>${perche('colonne')}${comandi(avantiBtn)}`; break;
    }
    default: corpo = '';
  }
  return `${testata(sess)}${corpo}`;
}

export function chiusuraHtml(sess, pensiero, { puoSalvare = false, salvata = false } = {}) {
  const e = sess.esercizio;
  return `
  <div class="testata"><span class="voce-nome">${esc(e.titolo)}</span></div>
  <div class="progresso"><div style="width:100%"></div></div>
  <p class="voce-nome">${esc(nomeVoce(sess.voce))}</p>
  <p class="voce-apertura">${esc(e.voci[sess.voce].chiusura)}</p>
  <div class="pensiero"><p>${esc(pensiero.testo)}</p><small>Da portare con te · ${esc(pensiero.fonte.autore)}, ${esc(pensiero.fonte.opera)}</small></div>
  <p class="fonte">Perché funziona: ${esc(e.perche)}</p>
  ${e.dettagli && e.dettagli.variante ? `<p class="fonte">Un'altra volta: ${esc(e.dettagli.variante)}</p>` : ''}
  <div class="pila" style="margin-top:18px">
    <button class="btn primario" data-az="altro-esercizio">Un altro esercizio</button>
    ${puoSalvare ? `<button class="btn chiaro" data-az="salva-quaderno"${salvata ? ' disabled' : ''}>${salvata ? 'Salvato nel quaderno' : 'Salva nel quaderno'}</button>` : ''}
    <button class="btn chiaro" data-az="apri" data-tipo="studio" data-id="${esc(e.studio)}">Approfondisci nello Studio</button>
    <button class="btn chiaro" data-az="fine-esercizio">Fine</button>
  </div>`;
}
