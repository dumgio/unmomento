// Il quaderno: pagine private salvate solo sul telefono. Qui c'è la logica, senza schermo né memoria del telefono.
import { MODELLI, FISSI } from '../contenuti/quaderno.js';

const campiFissi = () => FISSI.campi.map((domanda) => ({ domanda, testo: '', fisso: true }));

export const modello = (id) => MODELLI.find((m) => m.id === id);

// Crea una pagina nuova. Le domande-guida iniziali sono quelle del modello.
export function nuovaPagina(idModello, { adesso = new Date(), id = 'q' + adesso.getTime().toString(36) } = {}) {
  const m = modello(idModello);
  if (!m) throw new Error('Modello inesistente: ' + idModello);
  const guida = m.domande.length ? m.domande.map((domanda) => ({ domanda, testo: '' })) : [{ domanda: '', testo: '' }];
  const campi = [...guida, ...campiFissi()];
  return { id, modello: idModello, creata: adesso.toISOString(), modificata: adesso.toISOString(), titolo: '', campi };
}

export function scrivi(pagina, indice, testo, adesso = new Date()) {
  if (!pagina.campi[indice]) return pagina;
  const campi = pagina.campi.map((c, i) => (i === indice ? { ...c, testo } : c));
  return { ...pagina, campi, modificata: adesso.toISOString() };
}

export function intitola(pagina, titolo) {
  return { ...pagina, titolo };
}

// Cambia la domanda-guida indicata con un'altra dello stesso modello, che non sia già nella pagina.
// Se c'è già una risposta, la domanda resta com'è: la risposta appartiene a quella domanda.
export function altraDomanda(pagina, indice, rand = Math.random) {
  const m = modello(pagina.modello);
  const usate = pagina.campi.map((c) => c.domanda);
  const libere = m.pool.filter((d) => !usate.includes(d));
  const campo = pagina.campi[indice];
  if (!libere.length || !campo || campo.fisso || !campo.domanda || campo.testo.trim()) return pagina;
  const nuova = libere[Math.floor(rand() * libere.length)];
  const campi = pagina.campi.map((c, i) => (i === indice ? { ...c, domanda: nuova } : c));
  return { ...pagina, campi };
}

export const haTesto = (pagina) => pagina.campi.some((c) => c.testo.trim() !== '');

// Salva la pagina nell'elenco (nuova o già presente). Una pagina senza testo non viene salvata.
export function salvaPagina(elenco, pagina) {
  const senza = elenco.filter((p) => p.id !== pagina.id);
  return haTesto(pagina) ? [...senza, pagina] : senza;
}

export const eliminaPagina = (elenco, id) => elenco.filter((p) => p.id !== id);

// Dalla più recente alla più vecchia.
export const ordinate = (elenco) => [...elenco].sort((a, b) => b.modificata.localeCompare(a.modificata));

const dataLeggibile = (iso) => new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
export { dataLeggibile };

export function titoloPagina(pagina) {
  if (pagina.titolo.trim()) return pagina.titolo.trim();
  const primo = pagina.campi.find((c) => !c.fisso && c.testo.trim()) || pagina.campi.find((c) => c.testo.trim());
  const testo = primo ? primo.testo.trim().replace(/\s+/g, ' ') : '';
  const nomeModello = modello(pagina.modello).titolo;
  return testo ? (testo.length > 48 ? testo.slice(0, 47) + '…' : testo) : nomeModello;
}

export function testoPagina(pagina) {
  const righe = [`${pagina.titolo.trim() || modello(pagina.modello).titolo} · ${dataLeggibile(pagina.creata)}`, ''];
  for (const c of pagina.campi) {
    if (!c.testo.trim()) continue;
    if (c.domanda) righe.push(c.domanda);
    righe.push(c.testo.trim(), '');
  }
  return righe.join('\n').trim();
}

export function testoTutto(elenco) {
  return ordinate(elenco).map(testoPagina).join('\n\n———\n\n');
}

// Una pagina «libera» con le risposte scritte durante un esercizio. Senza risposte, restituisce null.
export function paginaDaEsercizio(sessione, { adesso = new Date(), id } = {}) {
  const campi = [];
  sessione.esercizio.passi.forEach((p, i) => {
    if (p.tipo === 'scrivi') {
      const t = sessione.risposte[p.chiave || 'p' + i];
      if (typeof t === 'string' && t.trim()) campi.push({ domanda: p.testo, testo: t.trim() });
    } else if (p.tipo === 'colonne') {
      const c = sessione.risposte[p.chiave];
      if (c && (c.sinistra.length || c.destra.length)) {
        campi.push({ domanda: p.testo, testo: `${p.sinistra}: ${c.sinistra.join('; ') || '—'}\n${p.destra}: ${c.destra.join('; ') || '—'}` });
      }
    }
  });
  if (!campi.length) return null;
  const base = nuovaPagina('libero', { adesso, id });
  return { ...base, titolo: sessione.esercizio.titolo, campi: [...campi, ...campiFissi()] };
}

// ---- Memoria del telefono ----
export const CHIAVE = 'un-momento-quaderno';

// Le pagine salvate prima che esistessero le domande fisse le ricevono al momento della lettura.
function conFissi(campi) {
  const mancanti = campiFissi().filter((f) => !campi.some((c) => c.fisso && c.domanda === f.domanda));
  return [...campi, ...mancanti];
}

export function leggiElenco(grezzo) {
  try {
    const dati = JSON.parse(grezzo);
    if (!Array.isArray(dati)) return [];
    return dati
      .filter((p) => p && typeof p.id === 'string' && modello(p.modello) && Array.isArray(p.campi)
        && typeof p.creata === 'string' && typeof p.modificata === 'string')
      .map((p) => ({
        ...p,
        titolo: typeof p.titolo === 'string' ? p.titolo : '',
        campi: conFissi(p.campi.map((c) => ({
          domanda: String((c && c.domanda) || ''),
          testo: String((c && c.testo) || ''),
          ...(c && c.fisso ? { fisso: true } : {}),
        }))),
      }));
  } catch { return []; }
}

export const serializza = (elenco) => JSON.stringify(elenco);
