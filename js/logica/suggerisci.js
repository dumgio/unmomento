import { DURATE_ESERCIZI } from '../contenuti/comuni.js';

// Sceglie la disciplina quando l'utente risponde «non lo so»: prima il futuro (desiderio o paura),
// poi ciò che c'è da fare (azione); in tutti gli altri casi il giudizio.
export function orientamento({ futuro, fare }) {
  if (futuro) return 'desiderio';
  if (fare) return 'azione';
  return 'giudizio';
}

function punteggio(e, { disciplina, minuti }) {
  let p = 0;
  if (e.disciplina === disciplina) p += 4;
  else if (e.disciplina === 'presenza') p += 1;
  // Un esercizio più corto del tempo scelto va bene, ma è meglio se dura quanto il tempo scelto.
  const scarto = DURATE_ESERCIZI.indexOf(minuti) - DURATE_ESERCIZI.indexOf(e.minuti);
  p += scarto === 0 ? 3 : scarto > 0 ? 1 : 0;
  return p;
}

// Restituisce fino a n esercizi adatti a stato, disciplina e durata. Non supera il tempo scelto finché ci sono
// alternative; non ripropone i recenti se ce ne sono altri.
export function suggerisci(esercizi, criteri, { recenti = [], rand = Math.random, n = 3 } = {}) {
  const liberi = esercizi.filter((e) => !recenti.includes(e.id));
  const base = liberi.length >= n ? liberi : esercizi;
  const ordina = (lista) => lista
    .map((e) => ({ e, p: punteggio(e, criteri) + rand() * 0.5 }))
    .sort((a, b) => b.p - a.p)
    .map((x) => x.e);
  const entro = (e) => e.minuti <= criteri.minuti;
  const perStato = (e) => e.stati.includes(criteri.stato);
  const gruppi = [
    base.filter((e) => entro(e) && perStato(e)),
    base.filter((e) => entro(e) && !perStato(e)),
    base.filter((e) => !entro(e) && perStato(e)),
    base.filter((e) => !entro(e) && !perStato(e)),
  ];
  return gruppi.flatMap(ordina).slice(0, n);
}
