import { MODELLI, FISSI } from '../contenuti/quaderno.js';
import { esc } from './comuni.js';
import { ordinate, titoloPagina, dataLeggibile, modello } from '../logica/quaderno.js';

export function quadernoElenco(elenco) {
  const pagine = ordinate(elenco);
  return `
  <h1 class="titolo medio">Quaderno</h1>
  <p class="lead">Un posto privato per scrivere: la mattina, la sera, una lettera a te stesso o ciò che vuoi.</p>
  <button class="btn primario" data-az="quaderno-nuova">Nuova pagina</button>
  <div class="scheda" style="margin-top:18px"><p style="margin:0"><strong>${esc(FISSI.titolo)}.</strong> ${esc(FISSI.intro)} Ogni pagina si chiude con due domande fisse: <em>${esc(FISSI.campi[0])}</em> e <em>${esc(FISSI.campi[1])}</em></p></div>
  ${pagine.length ? `<h2 class="grp">Le tue pagine</h2>
  <div class="carte">${pagine.map((p) => `<button class="carta-link" data-az="quaderno-apri" data-id="${esc(p.id)}"><strong>${esc(titoloPagina(p))}</strong><span>${esc(modello(p.modello).titolo)} · ${esc(dataLeggibile(p.modificata))}</span></button>`).join('')}</div>
  <div class="pila" style="margin-top:18px"><button class="btn chiaro" data-az="quaderno-copia-tutto">Copia tutto</button></div>`
    : `<div class="scheda" style="margin-top:18px"><p style="margin:0">Non hai ancora scritto niente. Puoi cominciare da una pagina della <strong>mattina</strong> o della <strong>sera</strong>, oppure salvare ciò che scrivi durante un esercizio.</p></div>`}
  <p class="nota" style="margin-top:18px">Il quaderno resta soltanto su questo telefono: non viene inviato a nessuno. Se cancelli i dati del browser o disinstalli la app, le pagine si perdono. Con «Copia tutto» puoi conservarne una copia.</p>`;
}

export function quadernoNuova() {
  return `
  <button class="indietro" data-az="indietro">← Indietro</button>
  <h1 class="titolo medio">Nuova pagina</h1>
  <p class="lead">Scegli come vuoi cominciare.</p>
  ${MODELLI.map((m) => `<button class="opzione" data-az="quaderno-crea" data-id="${esc(m.id)}"><strong>${esc(m.titolo)}</strong><span>${esc(m.sotto)}</span></button>`).join('')}
  <p class="nota">${MODELLI.map((m) => esc(m.intro)).join('<br><br>')}</p>`;
}

export function quadernoPagina(p) {
  const m = modello(p.modello);
  return `
  <button class="indietro" data-az="indietro">← Indietro</button>
  <h1 class="titolo medio">${esc(m.titolo)}</h1>
  <p class="lead">${esc(m.intro)}</p>
  <label class="campo" for="q-titolo">Titolo (facoltativo)</label>
  <input type="text" id="q-titolo" value="${esc(p.titolo)}" autocomplete="off">
  ${p.campi.map((c, i) => (c.fisso ? '' : `
    ${c.domanda ? `<label class="campo" for="q-${i}">${esc(c.domanda)}</label>` : `<label class="campo" for="q-${i}">Il tuo testo</label>`}
    <textarea id="q-${i}" data-q="${i}">${esc(c.testo)}</textarea>
    ${c.domanda && m.pool.length > p.campi.filter((x) => !x.fisso).length ? `<button class="btn chiaro piccolo" data-az="quaderno-altra" data-i="${i}">Un'altra domanda</button>` : ''}`)).join('')}
  <h2 class="grp">${esc(FISSI.titolo)}</h2>
  <p class="nota">${esc(FISSI.intro)}</p>
  ${p.campi.map((c, i) => (!c.fisso ? '' : `
    <label class="campo" for="q-${i}">${esc(c.domanda)}</label>
    <textarea id="q-${i}" data-q="${i}">${esc(c.testo)}</textarea>`)).join('')}
  <p class="nota">Si salva da sola, soltanto su questo telefono. Scritta il ${esc(dataLeggibile(p.creata))}.</p>
  <div class="pila" style="margin-top:14px">
    <button class="btn chiaro" data-az="quaderno-copia">Copia il testo</button>
    <button class="btn chiaro" data-az="quaderno-elimina">Elimina la pagina</button>
  </div>`;
}
