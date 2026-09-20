// Costanti condivise: stati d'animo, discipline (la bussola), famiglie di esercizi, voci e domande di orientamento.

export const STATI = [
  { id: 'ansia', nome: 'Ansia', sotto: 'La mente corre avanti e il corpo è teso' },
  { id: 'paura', nome: 'Paura', sotto: 'Temo qualcosa che potrebbe accadere' },
  { id: 'rabbia', nome: 'Rabbia', sotto: 'Qualcosa o qualcuno mi ha fatto un torto' },
  { id: 'sconforto', nome: 'Sconforto', sotto: 'Mi sento giù, senza forze' },
  { id: 'sopraffatto', nome: 'Sono sopraffatto', sotto: 'Ho troppe cose e non so da dove cominciare' },
  { id: 'colpa', nome: 'Colpa', sotto: 'Penso a ciò che ho fatto o non ho fatto' },
  { id: 'notte', nome: 'Non riesco a dormire', sotto: 'I pensieri non mi lasciano in pace' },
  { id: 'non-so', nome: 'Non lo so', sotto: 'Sto male, ma non so dire perché' },
];

// Le tre discipline di Epitteto (secondo Hadot) sono la bussola. «Presenza» è l'attenzione al momento presente.
export const DISCIPLINE = [
  { id: 'giudizio', nome: 'Giudizio', scelta: 'Nel giudizio', sotto: 'Ciò che mi turba è il fatto, o quello che ne ho concluso?' },
  { id: 'desiderio', nome: 'Desiderio e paura', scelta: 'Nel desiderio o nella paura', sotto: 'Sto cercando di controllare ciò che non dipende da me?' },
  { id: 'azione', nome: 'Azione', scelta: "Nell'azione", sotto: 'Che cosa devo fare, adesso, davvero?' },
  { id: 'presenza', nome: 'Presenza', scelta: 'Nel presente', sotto: 'Torno a ciò che sento e vedo, ora.' },
];

// Le quattro famiglie di esercizi spirituali stoici secondo Hadot.
export const FAMIGLIE = [
  { id: 'attenzione', nome: 'Attenzione' },
  { id: 'meditazioni', nome: 'Meditazioni e ricordi' },
  { id: 'pensiero', nome: 'Esercizi di pensiero' },
  { id: 'azione', nome: 'Esercizi attivi' },
];

export const DURATE_ESERCIZI = [1, 3, 10];

export const VOCI = [
  { id: 'epitteto', nome: 'Epitteto', tono: 'secco e diretto', desc: 'Va dritto al punto: poche parole, un invito chiaro a distinguere ciò che dipende da te.' },
  { id: 'seneca', nome: 'Seneca', tono: 'caldo, come una lettera', desc: 'Ti parla come un amico saggio che ti scrive una lettera: con calore e con esempi.' },
  { id: 'marco', nome: 'Marco Aurelio', tono: 'interiore, come un quaderno', desc: 'Parla piano, come chi scrive a se stesso nel proprio quaderno: raccolto e personale.' },
];

export const TIPI_PASSO = ['testo', 'respiro', 'pausa', 'scrivi', 'scegli', 'colonne'];

// Se non sai dire dove ti sei perso: due domande sì/no portano a una disciplina.
export const DOMANDE_ORIENTAMENTO = [
  { id: 'futuro', testo: 'Il pensiero che mi turba riguarda qualcosa che potrebbe succedere?' },
  { id: 'fare', testo: 'Mi pesa qualcosa che devo ancora fare o decidere?' },
];
