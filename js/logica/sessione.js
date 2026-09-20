// Avanzamento di un esercizio guidato: un passo per schermata, con scelte che portano a passi diversi.

export function creaSessione(esercizio, voce) {
  return { esercizio, voce, indice: 0, storia: [], risposte: {}, conclusa: false };
}

export const passoCorrente = (s) => (s.conclusa ? null : s.esercizio.passi[s.indice]);

const chiaveDi = (s) => passoCorrente(s).chiave || 'p' + s.indice;

function vai(s, indice) {
  const storia = [...s.storia, s.indice];
  if (indice >= s.esercizio.passi.length) return { ...s, storia, conclusa: true };
  return { ...s, storia, indice };
}

// Indice del passo con l'id indicato; «fine» vale come la fine dell'esercizio.
function arrivoDa(s, id) {
  if (id === 'fine') return s.esercizio.passi.length;
  const arrivo = s.esercizio.passi.findIndex((x) => x.id === id);
  if (arrivo === -1) throw new Error('Passo di arrivo inesistente: ' + id);
  return arrivo;
}

// Passa al passo successivo, oppure a quello indicato da «poi» (un id, o 'fine').
// Nei passi «scegli» si usa sceglie().
export function avanza(s) {
  if (s.conclusa) return s;
  const p = passoCorrente(s);
  if (p.tipo === 'scegli') throw new Error('In un passo «scegli» bisogna scegliere una risposta');
  return vai(s, p.poi ? arrivoDa(s, p.poi) : s.indice + 1);
}

// Sceglie la risposta i del passo «scegli»: «vai» indica l'id del passo di arrivo, oppure 'fine'.
export function sceglie(s, i) {
  const p = passoCorrente(s);
  if (!p || p.tipo !== 'scegli') throw new Error('Il passo corrente non è un passo «scegli»');
  const opzione = p.opzioni[i];
  if (!opzione) throw new Error('Risposta inesistente: ' + i);
  const arrivo = opzione.vai ? arrivoDa(s, opzione.vai) : s.indice + 1;
  const conRisposta = { ...s, risposte: { ...s.risposte, [chiaveDi(s)]: i } };
  return vai(conRisposta, arrivo);
}

export function indietro(s) {
  if (!s.storia.length) return s;
  const storia = s.storia.slice(0, -1);
  return { ...s, indice: s.storia[s.storia.length - 1], storia, conclusa: false };
}

export function rispondi(s, chiave, valore) {
  return { ...s, risposte: { ...s.risposte, [chiave]: valore } };
}

// ---- Passo «colonne»: due elenchi ----
const colonne = (s, chiave) => s.risposte[chiave] || { sinistra: [], destra: [] };

export function aggiungiElemento(s, chiave, lato, testo) {
  const t = testo.trim();
  if (!t) return s;
  const c = colonne(s, chiave);
  return rispondi(s, chiave, { ...c, [lato]: [...c[lato], t] });
}

export function spostaElemento(s, chiave, da, indice) {
  const c = colonne(s, chiave);
  const a = da === 'sinistra' ? 'destra' : 'sinistra';
  const elemento = c[da][indice];
  if (elemento === undefined) return s;
  return rispondi(s, chiave, { [da]: c[da].filter((_, k) => k !== indice), [a]: [...c[a], elemento] });
}

// Avanzamento approssimativo per la barra: passi già fatti in rapporto ai passi dell'esercizio.
export function avanzamento(s) {
  if (s.conclusa) return 1;
  return Math.min(1, s.storia.length / Math.max(1, s.esercizio.passi.length));
}
