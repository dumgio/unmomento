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

// Perché in un esercizio ci sono respiri, pause e scrittura. Compaiono sotto il passo, in un riquadro da aprire («Perché questo passo?»).
export const SPIEGAZIONI_PASSO = {
  respiro: `Un respiro lento, con l'uscita più lunga dell'entrata, dice al corpo che può rallentare. Molti studi sulla respirazione lenta vanno in questa direzione, ma non serve crederci sulla parola: prova, e guarda se le spalle scendono. Serve anche a un'altra cosa. Per qualche secondo hai un solo compito, e la mente smette di correre avanti.`,
  pausa: `La pausa è la parte più stoica dell'esercizio. Tra ciò che accade e ciò che facciamo c'è un breve spazio, ed è lì che si può esaminare un pensiero prima di dargli ragione. Epitteto consiglia di farlo con le impressioni, e Seneca di rimandare la risposta quando si è in collera. Un minuto di silenzio non è tempo perso: è quello spazio, allargato.`,
  scrivi: `Scrivere obbliga a mettere il pensiero in parole precise, e ciò che in testa resta vago sulla pagina si vede meglio. Marco Aurelio scriveva appunti a se stesso e Seneca lettere: per gli antichi la scrittura era un esercizio, non un ricordo. Non serve scrivere bene, basta scrivere il vero. Il testo resta sul tuo telefono.`,
  colonne: `Spostare le voci da una colonna all'altra è un modo di decidere con le mani. Vedere davanti a sé ciò che dipende da noi e ciò che non dipende da noi, in due elenchi, rende il confine più chiaro che tenerlo a mente.`,
};
