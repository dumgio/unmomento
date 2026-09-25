// Il corso: 8 moduli nell'ordine in cui Epitteto insegnava, dalle fondamenta alla vita stoica.
// Le lezioni stanno in un file per modulo (lezioni1.js … lezioni8.js). Un modulo senza lezioni appare «in arrivo».
import { LEZIONI_1 } from './lezioni1.js';
import { LEZIONI_2 } from './lezioni2.js';
import { LEZIONI_3 } from './lezioni3.js';
import { LEZIONI_4 } from './lezioni4.js';
import { LEZIONI_5 } from './lezioni5.js';
import { LEZIONI_6 } from './lezioni6.js';
import { LEZIONI_7 } from './lezioni7.js';
import { LEZIONI_8 } from './lezioni8.js';

export const LEZIONI = [...LEZIONI_1, ...LEZIONI_2, ...LEZIONI_3, ...LEZIONI_4, ...LEZIONI_5, ...LEZIONI_6, ...LEZIONI_7, ...LEZIONI_8];

const BASE = [
  { n: 1, id: 'fondamenta', titolo: 'Le fondamenta', sotto: 'Che cosa vuol dire fare filosofia per uno stoico, e la prima distinzione da cui parte tutto.' },
  { n: 2, id: 'impressioni', titolo: 'Le impressioni', sotto: 'Come nasce un turbamento e dove si trova lo spazio per fermarsi.' },
  { n: 3, id: 'desiderare-e-temere', titolo: 'Desiderare e temere', sotto: 'Le passioni, ciò che conta davvero e come si impara a non esserne trascinati.' },
  { n: 4, id: 'agire-con-gli-altri', titolo: 'Agire con gli altri', sotto: 'I ruoli, i doveri, l\'ira e il modo di stare con chi sbaglia.' },
  { n: 5, id: 'giudicare-bene', titolo: 'Giudicare bene', sotto: 'La parte di noi che giudica, il rifugio interiore, il presente e lo sguardo largo.' },
  { n: 6, id: 'il-tempo-e-la-fine', titolo: 'Il tempo e la fine', sotto: 'Seneca sul tempo, il ricordo della morte e il lutto.' },
  { n: 7, id: 'il-posto-nel-tutto', titolo: 'Il posto nel tutto', sotto: 'La natura, il destino e la città comune degli esseri umani.' },
  { n: 8, id: 'una-vita-stoica', titolo: 'Una vita stoica', sotto: 'Le virtù e le pratiche di ogni giorno che tengono insieme tutto il resto.' },
];

export const MODULI = BASE.map((m) => ({ ...m, lezioni: LEZIONI.filter((l) => l.modulo === m.n).map((l) => l.id) }));

// Forma normalizzata di un riferimento, per confrontarlo con docs/verifiche-riferimenti.md.
export function rif(t) {
  const s = typeof t === 'string' ? t : `${t.autore}, ${t.opera} ${t.luogo}`;
  return s.replace(/\*/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
}
