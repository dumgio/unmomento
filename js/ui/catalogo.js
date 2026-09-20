import { STATI, DISCIPLINE, FAMIGLIE, DURATE_ESERCIZI } from '../contenuti/comuni.js';
import { esc, ricco } from './comuni.js';

const nomeDisc = (id) => (DISCIPLINE.find((d) => d.id === id) || {}).nome || id;
const nomeStato = (id) => (STATI.find((s) => s.id === id) || {}).nome || id;

export function listaEsercizi(esercizi) {
  if (!esercizi.length) return '<p class="nota">Nessun esercizio trovato. Prova a togliere qualche filtro.</p>';
  return `<div class="carte">${esercizi.map((e) => `<button class="carta-link" data-az="apri" data-tipo="esercizio" data-id="${e.id}">
    <strong>${esc(e.titolo)}</strong><span class="tag">${e.minuti} min</span><span class="tag">${esc(nomeDisc(e.disciplina))}</span>${e.sostegno ? '<span class="tag">Sostegno di oggi</span>' : ''}</button>`).join('')}</div>`;
}

function filtri(f) {
  const riga = (chiave, valori) => `<div class="chips" role="group" aria-label="Filtro: ${esc(chiave)}">${valori.map(([v, t]) =>
    `<button class="chip" data-az="filtro" data-k="${chiave}" data-v="${esc(v)}" aria-pressed="${String(f[chiave] || '') === String(v)}">${esc(t)}</button>`).join('')}</div>`;
  return `<div class="filtri">
    <label class="campo" for="cerca">Cerca</label>
    <input type="search" id="cerca" placeholder="Per esempio: respiro, paura, sera" value="${esc(f.q || '')}" autocomplete="off">
    <p class="nota" style="margin-top:12px">Che cosa senti?</p>
    ${riga('stato', [['', 'Tutti'], ...STATI.map((s) => [s.id, s.nome])])}
    <p class="nota">Disciplina</p>
    ${riga('disciplina', [['', 'Tutte'], ...DISCIPLINE.map((d) => [d.id, d.nome])])}
    <p class="nota">Durata</p>
    ${riga('minuti', [['', 'Tutte'], ...DURATE_ESERCIZI.map((m) => [m, m + ' min'])])}
    <p class="nota">Famiglia</p>
    ${riga('famiglia', [['', 'Tutte'], ...FAMIGLIE.map((x) => [x.id, x.nome])])}
  </div>`;
}

export function catalogoHtml(filtro, esercizi, meditazioni) {
  return `
  <h1 class="titolo medio">Esercizi</h1>
  <p class="lead">Tutti gli esercizi e le meditazioni, con la fonte di ciascuno. Quelli con l'etichetta «Sostegno di oggi» sono tecniche moderne, usate come appoggio per calmarsi prima dell'esercizio stoico.</p>
  <h2 class="grp">Meditazioni a tempo</h2>
  <div class="carte">${meditazioni.map((m) => `<button class="carta-link" data-az="apri" data-tipo="meditazione" data-id="${m.id}"><strong>${esc(m.titolo)}</strong><span class="tag">${m.minuti} min</span><br><span>${esc(m.sotto)}</span></button>`).join('')}</div>
  <h2 class="grp">Esercizi guidati</h2>
  ${filtri(filtro)}
  <div id="lista-catalogo">${listaEsercizi(esercizi)}</div>`;
}

export function schedaEsercizioHtml(e) {
  return `
  <button class="indietro" data-az="indietro">← Indietro</button>
  <h1 class="titolo medio">${esc(e.titolo)}</h1>
  <p><span class="tag">${e.minuti} ${e.minuti === 1 ? 'minuto' : 'minuti'}</span><span class="tag">${esc(nomeDisc(e.disciplina))}</span>${e.sostegno ? '<span class="tag">Sostegno di oggi</span>' : ''}${e.stati.map((s) => `<span class="tag">${esc(nomeStato(s))}</span>`).join('')}</p>
  <h3 class="info-h">A che cosa serve</h3>
  <p class="info-p">${esc(e.perche)}</p>
  <h3 class="info-h">Fonte</h3>
  <p class="info-p">${esc(e.fonte.autore)}, *${esc(e.fonte.opera)}*${e.fonte.nota ? ': ' + esc(e.fonte.nota) : ''}.</p>
  <div class="pila" style="margin-top:18px">
    <button class="btn primario" data-az="scegli-esercizio" data-id="${e.id}">Inizia</button>
    <button class="btn chiaro" data-az="apri" data-tipo="studio" data-id="${esc(e.studio)}">Approfondisci nello Studio</button>
  </div>`.replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

export function schedaMeditazioneHtml(m) {
  return `
  <button class="indietro" data-az="indietro">← Indietro</button>
  <h1 class="titolo medio">${esc(m.titolo)}</h1>
  <p class="lead">${esc(m.sotto)}</p>
  <p><span class="tag">${m.minuti} minuti</span></p>
  <h2 class="grp">Che cosa fai</h2>
  <ul class="info-lista">${m.cosaFare.map((c) => `<li>${ricco(c)}</li>`).join('')}</ul>
  <p class="info-p">${ricco(`Un testo compare a intervalli, con una campana dolce all'inizio e alla fine. Lo schermo resta acceso, se il telefono lo permette. Puoi fermarti in qualsiasi momento.`)}</p>
  <h2 class="grp">Da dove viene</h2>
  <p class="info-p">${ricco(m.perche)}</p>
  <p class="fonte">Fonte: ${esc(m.fonte.autore)}, ${esc(m.fonte.opera)}${m.fonte.nota ? ' (' + esc(m.fonte.nota) + ')' : ''}.</p>
  <div class="pila" style="margin-top:18px">
    <button class="btn primario" data-az="inizia-meditazione" data-id="${m.id}">Inizia la meditazione</button>
  </div>`;
}

export function meditazioneInCorso(m) {
  return `
  <div class="testata"><span class="voce-nome">${esc(m.titolo)}</span><button class="esci" data-az="ferma-meditazione">Ferma</button></div>
  <div class="progresso" role="progressbar" aria-valuemin="0" aria-valuemax="100" id="med-barra"><div id="med-prog" style="width:0%"></div></div>
  ${m.animazione ? '<canvas class="med-anim" id="med-anim" aria-hidden="true"></canvas>' : ''}
  <p class="med-testo${m.animazione ? ' con-anim' : ''}" id="med-testo" aria-live="polite"></p>
  <p class="nota" style="text-align:center">Resta <span id="med-resto">--:--</span></p>`;
}
