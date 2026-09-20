import { esc } from './comuni.js';
import { eFatto, quantiFatti } from '../logica/percorsi.js';
import { ESERCIZI } from '../contenuti/esercizi.js';
import { MEDITAZIONI } from '../contenuti/meditazioni.js';
import { PAGINE_STUDIO } from '../contenuti/studio.js';
import { MODELLI } from '../contenuti/quaderno.js';

const titoloAzione = (a) => {
  if (a.tipo === 'esercizio') return 'Esercizio: ' + ESERCIZI.find((e) => e.id === a.id).titolo;
  if (a.tipo === 'meditazione') return 'Meditazione: ' + MEDITAZIONI.find((m) => m.id === a.id).titolo;
  if (a.tipo === 'studio') return 'Da leggere: ' + PAGINE_STUDIO.find((p) => p.id === a.id).titolo;
  return 'Quaderno: pagina «' + MODELLI.find((m) => m.id === a.id).titolo + '»';
};

const bottone = (a) => (a.tipo === 'quaderno'
  ? `<button class="btn chiaro" data-az="percorso-quaderno" data-id="${esc(a.id)}">${esc(titoloAzione(a))}</button>`
  : `<button class="btn chiaro" data-az="apri" data-tipo="${esc(a.tipo)}" data-id="${esc(a.id)}">${esc(titoloAzione(a))}</button>`);

export function percorsoHtml(p, fatti) {
  const n = quantiFatti(fatti, p.id);
  return `
  <button class="indietro" data-az="indietro">← Indietro</button>
  <h1 class="titolo medio">${esc(p.titolo)}</h1>
  <p class="lead">${esc(p.sotto)}</p>
  <p class="info-p">${esc(p.intro)}</p>
  <p class="nota">${n === 0 ? 'Nessun giorno segnato.' : `${n} ${n === 1 ? 'giorno segnato' : 'giorni segnati'} su 7.`} Puoi saltare o ripetere i giorni come vuoi.</p>
  ${p.giorni.map((g, i) => `
  <div class="scheda giorno${eFatto(fatti, p.id, i) ? ' fatto' : ''}">
    <p class="giorno-n">Giorno ${i + 1}</p>
    <h2 class="info-h" style="margin:2px 0 6px">${esc(g.titolo)}</h2>
    <p class="info-p">${esc(g.testo)}</p>
    <div class="pila">${g.azioni.map(bottone).join('')}</div>
    <button class="btn piccolo ${eFatto(fatti, p.id, i) ? 'primario' : 'chiaro'}" data-az="percorso-fatto" data-id="${esc(p.id)}" data-g="${i}" aria-pressed="${eFatto(fatti, p.id, i)}">${eFatto(fatti, p.id, i) ? 'Fatto ✓' : 'Segna come fatto'}</button>
  </div>`).join('')}`;
}
