// Pezzi di schermata senza stato: ricevono i dati e restituiscono HTML.

import { MAIL, CONTATTI } from '../contenuti/info.js';

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Nel testo, **così** diventa grassetto e *così* corsivo.
export const ricco = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');

export const risolviHref = (h) => (h.startsWith('mail:') ? MAIL[h.slice(5)] : CONTATTI[h]);

// Un blocco delle pagine di studio e informative.
export function blocco(b) {
  switch (b.t) {
    case 'h': return `<h2 class="info-h">${esc(b.x)}</h2>`;
    case 'p': return `<p class="info-p">${ricco(b.x)}</p>`;
    case 'lista': return `<ul class="info-lista">${b.x.map((v) => `<li>${ricco(v)}</li>`).join('')}</ul>`;
    case 'passi': return `<ol class="info-passi">${b.x.map((v) => `<li><strong>${ricco(v.titolo)}</strong> ${ricco(v.testo)}</li>`).join('')}</ol>`;
    case 'nota': return `<p class="consiglio">${ricco(b.x)}</p>`;
    case 'link': {
      const h = risolviHref(b.href);
      return `<a class="btn ${b.stile || 'chiaro'} info-btn" href="${esc(h)}"${h.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${esc(b.x)}</a>`;
    }
    case 'azione':
      return b.az === 'condividi'
        ? `<button class="btn ${b.stile || 'chiaro'} info-btn" data-az="condividi">${esc(b.x)}</button>`
        : `<button class="btn ${b.stile || 'chiaro'} info-btn" data-az="apri" data-tipo="${esc(b.az)}" data-id="${esc(b.id)}">${esc(b.x)}</button>`;
    default: return '';
  }
}

export function paginaHtml(p, indietroAz, prima = '') {
  return `
  <button class="indietro" data-az="${indietroAz}">← Indietro</button>
  <h1 class="titolo medio">${esc(p.titolo)}</h1>
  <p class="lead">${esc(p.sotto)}</p>${prima}
  <div class="info">${p.blocchi.map(blocco).join('')}</div>`;
}

export function elencoHtml(titolo, lead, gruppi, az) {
  // gruppi: [[nome, [pagine], azione?]] (il nome può essere vuoto; l'azione del gruppo, se c'è, vale al posto di az)
  return `
  <h1 class="titolo medio">${esc(titolo)}</h1>
  <p class="lead">${esc(lead)}</p>
  ${gruppi.map(([nome, pagine, azGruppo]) => (nome ? `<h2 class="grp">${esc(nome)}</h2>` : '') +
    `<div class="carte">${pagine.map((p) => `<button class="carta-link" data-az="${azGruppo || az}" data-id="${esc(p.id)}"><strong>${esc(p.titolo)}</strong><span>${esc(p.sotto)}</span></button>`).join('')}</div>`).join('')}`;
}
