// Una meditazione è una sequenza di segmenti con un testo e una durata in secondi.

export const durataTotale = (m) => m.segmenti.reduce((a, s) => a + s.secondi, 0);

export function pianoMeditazione(m) {
  let t = 0;
  return m.segmenti.map((s, indice) => {
    const inizio = t;
    t += s.secondi;
    return { ...s, indice, inizio, fine: t };
  });
}

// Dato il tempo trascorso, dice a che segmento siamo e quanto resta alla fine del segmento e dell'intera sessione.
export function segmentoAl(piano, trascorsi) {
  const totale = piano[piano.length - 1].fine;
  if (trascorsi >= totale) return { finita: true, indice: piano.length - 1, restoSegmento: 0, restoTotale: 0, totale };
  const s = piano.find((x) => trascorsi >= x.inizio && trascorsi < x.fine);
  return { finita: false, indice: s.indice, restoSegmento: Math.ceil(s.fine - trascorsi), restoTotale: Math.ceil(totale - trascorsi), totale };
}
