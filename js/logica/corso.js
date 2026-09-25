// Le lezioni fatte del corso: si segnano a mano, senza punteggi né serie di giorni.
export const CHIAVE = 'stoicismo-corso';

export function leggiFatte(grezzo, idValidi) {
  try {
    const d = JSON.parse(grezzo);
    if (!Array.isArray(d)) return [];
    return [...new Set(d.filter((id) => typeof id === 'string' && idValidi.includes(id)))];
  } catch { return []; }
}

export const eFatta = (fatte, id) => fatte.includes(id);

export const alternaFatta = (fatte, id) => (fatte.includes(id) ? fatte.filter((x) => x !== id) : [...fatte, id]);

// La prima lezione scritta e non fatta, nell'ordine dei moduli.
export function prossima(moduli, fatte) {
  const tutte = moduli.flatMap((m) => m.lezioni);
  const lezione = tutte.find((id) => !fatte.includes(id)) || null;
  return { lezione, finito: lezione === null && tutte.length > 0 };
}

export const contaModulo = (modulo, fatte) => ({
  fatte: modulo.lezioni.filter((id) => fatte.includes(id)).length,
  totale: modulo.lezioni.length,
});

export const serializzaFatte = (fatte) => JSON.stringify(fatte);

// Le lezioni che rimandano a una pagina della Biblioteca.
export const lezioniCheUsano = (lezioni, id) => lezioni.filter((l) => (l.biblioteca || []).includes(id));
