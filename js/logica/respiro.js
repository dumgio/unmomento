// Il cerchio del respiro: da un tempo trascorso (in secondi) ricava la fase e la grandezza del cerchio (0..1).

export const durataRespiro = ({ dentro, fuori, pausa = 0, cicli }) => (dentro + pausa + fuori) * cicli;

export function faseRespiro(t, { dentro, fuori, pausa = 0 }) {
  const ciclo = dentro + pausa + fuori;
  const n = Math.floor(t / ciclo);
  const r = t - n * ciclo;
  if (r < dentro) return { fase: 'dentro', cerchio: r / dentro, ciclo: n + 1 };
  if (r < dentro + pausa) return { fase: 'pausa', cerchio: 1, ciclo: n + 1 };
  return { fase: 'fuori', cerchio: 1 - (r - dentro - pausa) / fuori, ciclo: n + 1 };
}
