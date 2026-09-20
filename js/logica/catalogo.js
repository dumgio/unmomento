// Filtri del catalogo degli esercizi.

const normalizza = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// filtro: { q, stato, disciplina, minuti, famiglia }. I campi vuoti (o 0) non filtrano.
export function filtraEsercizi(esercizi, filtro = {}) {
  const q = normalizza((filtro.q || '').trim());
  return esercizi.filter((e) => {
    if (filtro.stato && !e.stati.includes(filtro.stato)) return false;
    if (filtro.disciplina && e.disciplina !== filtro.disciplina) return false;
    if (filtro.minuti && e.minuti !== Number(filtro.minuti)) return false;
    if (filtro.famiglia && e.famiglia !== filtro.famiglia) return false;
    if (q && !normalizza(e.titolo + ' ' + e.perche).includes(q)) return false;
    return true;
  });
}
