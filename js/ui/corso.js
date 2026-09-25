// Le schermate del corso: l'elenco dei moduli, un modulo, una lezione.
import { esc, ricco } from './comuni.js';
import { contaModulo, eFatta, prossima } from '../logica/corso.js';
import { PAGINE_STUDIO } from '../contenuti/studio.js';

const trova = (lezioni, id) => lezioni.find((l) => l.id === id);

export function corsoHome({ moduli, fatte, lezioni }) {
  const { lezione, finito } = prossima(moduli, fatte);
  const l = lezione && trova(lezioni, lezione);
  const continua = finito
    ? `<div class="scheda"><p class="info-p"><strong>Hai finito il corso.</strong> Puoi rileggere le lezioni che vuoi, o ricominciare dall'inizio: i segni si tolgono tutti.</p>
       <button class="btn chiaro" data-az="ricomincia-corso">Ricomincia dal Modulo 1</button></div>`
    : l ? `<div class="scheda"><p class="giorno-n">Continua da qui · Modulo ${l.modulo}</p>
       <h2 class="info-h" style="margin:2px 0 6px">${esc(l.titolo)}</h2><p class="info-p">${esc(l.sotto)}</p>
       <button class="btn primario" data-az="apri-lezione" data-id="${esc(l.id)}">${fatte.length ? 'Continua' : 'Comincia'}</button></div>` : '';
  return `
  <p class="marchio">Formebrevi APS</p>
  <h1 class="titolo">Stoicismo quotidiano</h1>
  <p class="lead">Un corso in otto moduli per imparare a essere stoici: le idee di Epitteto, Seneca e Marco Aurelio, i passi dei loro testi e i consigli che davano per la vita di tutti i giorni.</p>
  ${continua}
  <h2 class="grp">I moduli</h2>
  <div class="carte">${moduli.map((m) => {
    const c = contaModulo(m, fatte);
    return c.totale
      ? `<button class="carta-link" data-az="apri-modulo" data-id="${esc(m.id)}"><strong>${m.n}. ${esc(m.titolo)}</strong><span class="tag">${c.fatte} di ${c.totale}</span><br><span>${esc(m.sotto)}</span></button>`
      : `<div class="carta-link in-arrivo" aria-disabled="true"><strong>${m.n}. ${esc(m.titolo)}</strong><span class="tag">in arrivo</span><br><span>${esc(m.sotto)}</span></div>`;
  }).join('')}</div>
  <button class="btn chiaro piccolo" data-az="apri" data-tipo="info" data-id="come-funziona">Come funziona il corso</button>`;
}

export function moduloHtml(m, lezioni, fatte) {
  return `
  <button class="indietro" data-az="indietro">← Indietro</button>
  <p class="giorno-n">Modulo ${m.n}</p>
  <h1 class="titolo medio">${esc(m.titolo)}</h1>
  <p class="lead">${esc(m.sotto)}</p>
  <div class="carte">${m.lezioni.map((id, i) => {
    const l = trova(lezioni, id);
    return `<button class="carta-link${eFatta(fatte, id) ? ' fatto' : ''}" data-az="apri-lezione" data-id="${esc(id)}"><strong>${m.n}.${i + 1} ${esc(l.titolo)}</strong>${eFatta(fatte, id) ? '<span class="tag">fatta ✓</span>' : ''}<br><span>${esc(l.sotto)}</span></button>`;
  }).join('')}</div>`;
}

export function lezioneHtml(l, { fatta, successiva }) {
  return `
  <button class="indietro" data-az="indietro">← Indietro</button>
  <p class="giorno-n">Modulo ${l.modulo}</p>
  <h1 class="titolo medio">${esc(l.titolo)}</h1>
  <p class="lead">${esc(l.sotto)}</p>
  <div class="info">${l.idea.map((p) => `<h2 class="info-h">${esc(p.titoletto)}</h2>${p.testo.split(/\n\s*\n/).map((x) => `<p class="info-p">${ricco(x.trim())}</p>`).join('')}`).join('')}</div>
  <h2 class="grp">Cosa dicono i testi</h2>
  <div class="testi">${l.testi.map((t) => `<div class="scheda rif"><p class="rif-dove"><strong>${esc(t.autore)}</strong>, <em>${esc(t.opera)}</em> ${esc(t.luogo)}</p><p class="info-p">${ricco(t.cosa)}</p></div>`).join('')}</div>
  <h2 class="grp">Da ricordare</h2>
  <p class="ricorda">${ricco(l.ricorda)}</p>
  <h2 class="grp">Nella vita di tutti i giorni</h2>
  <div class="info">${l.vita.split(/\n\s*\n/).map((x) => `<p class="info-p">${ricco(x.trim())}</p>`).join('')}</div>
  <h2 class="grp">Una domanda per il Quaderno</h2>
  <p class="info-p">${ricco(l.domanda)}</p>
  <button class="btn chiaro" data-az="lezione-quaderno" data-id="${esc(l.id)}">Scrivi nel Quaderno</button>
  <h2 class="grp">Per approfondire</h2>
  <div class="pila">${l.biblioteca.map((id) => `<button class="btn chiaro" data-az="apri" data-tipo="studio" data-id="${esc(id)}">${esc(PAGINE_STUDIO.find((p) => p.id === id).titolo)}</button>`).join('')}</div>
  <div class="pila" style="margin-top:24px">
    <button class="btn ${fatta ? 'primario' : 'chiaro'}" data-az="lezione-fatta" data-id="${esc(l.id)}" aria-pressed="${fatta}">${fatta ? 'Lezione fatta ✓' : 'Ho finito questa lezione'}</button>
    ${successiva ? `<button class="btn chiaro" data-az="apri-lezione" data-id="${esc(successiva.id)}">Lezione successiva: ${esc(successiva.titolo)}</button>` : ''}
  </div>`;
}
