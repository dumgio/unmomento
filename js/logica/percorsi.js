// I giorni fatti di ogni percorso: si segnano a mano, senza contare le serie né mandare avvisi.
export const CHIAVE = 'un-momento-percorsi';

export function leggiFatti(grezzo) {
  try {
    const d = JSON.parse(grezzo);
    if (!d || typeof d !== 'object' || Array.isArray(d)) return {};
    const fatti = {};
    for (const [id, giorni] of Object.entries(d)) {
      if (Array.isArray(giorni)) fatti[id] = [...new Set(giorni.filter((g) => Number.isInteger(g) && g >= 0 && g < 7))].sort((a, b) => a - b);
    }
    return fatti;
  } catch { return {}; }
}

export const eFatto = (fatti, id, giorno) => (fatti[id] || []).includes(giorno);

// Segna o toglie il segno di un giorno.
export function alterna(fatti, id, giorno) {
  const attuali = fatti[id] || [];
  const nuovi = attuali.includes(giorno) ? attuali.filter((g) => g !== giorno) : [...attuali, giorno].sort((a, b) => a - b);
  return { ...fatti, [id]: nuovi };
}

export const quantiFatti = (fatti, id) => (fatti[id] || []).length;
export const serializza = (fatti) => JSON.stringify(fatti);
