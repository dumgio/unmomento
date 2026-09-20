// Meditazioni a tempo: una sequenza di segmenti, ciascuno con un testo e una durata in secondi.
// Con «suono: 'campana'» una campana dolce suona all'inizio del segmento. Una campana suona anche alla fine.

export const MEDITAZIONI = [
  {
    id: 'attenzione-presente',
    titolo: "L'attenzione a se stessi",
    sotto: 'Cinque minuti per restare svegli su ciò che pensi e su ciò che fai, come facevano gli stoici.',
    minuti: 5,
    fonte: { autore: 'Epitteto e Marco Aurelio', opera: 'Discorsi (IV, 12) e A se stesso (VII, 54)', nota: "l'attenzione a sé, in greco prosoché" },
    cosaFare: [
      `Siediti comodo, con gli occhi chiusi o lo sguardo basso.`,
      `Non devi svuotare la mente né smettere di pensare. Devi restare sveglio su ciò che pensi.`,
      `Segui le frasi che compaiono: ognuna ti propone una piccola domanda da farti, in silenzio.`,
    ],
    perche: `Per gli stoici l'esercizio di base era l'**attenzione a se stessi**: vigilare a ogni istante su ciò che si pensa e su ciò che si fa, ricordando che cosa dipende da noi e che cosa no. Epitteto le dedica un intero discorso. Marco Aurelio la riassume in tre gesti: esaminare l'impressione presente, accettare ciò che accade, comportarsi con giustizia con le persone che si hanno davanti. La meditazione ti fa fare proprio questi tre gesti.`,
    segmenti: [
      { secondi: 25, suono: 'campana', testo: 'Siediti comodo. Ora non c\'è nulla da risolvere. Gli stoici non chiedevano di svuotare la mente, ma di restare svegli su ciò che passa nella mente.' },
      { secondi: 40, testo: 'Nota che cosa c\'è adesso nella tua testa: un pensiero, un\'inquietudine, un\'immagine. Dagli un nome semplice, per esempio «sto pensando a domani».' },
      { secondi: 60, testo: 'Ricordati che è un\'impressione, non un fatto. Prima di crederle, esaminala: è vera? È utile? Lo stoico non scaccia i pensieri, li guarda con metodo.' },
      { secondi: 60, testo: 'Ora chiediti: questo dipende da me? Se dipende da te, tienilo per dopo, quando agirai. Se non dipende da te, lascia che sia com\'è.' },
      { secondi: 50, testo: 'Accetta ciò che sta accadendo in questo momento, senza pretendere che sia diverso. Non devi amarlo: basta smettere di litigare con il fatto che è così.' },
      { secondi: 50, testo: 'Pensa alle persone che hai vicino oggi. Qual è la cosa giusta, piccola e concreta, che puoi fare per una di loro nella prossima ora?' },
      { secondi: 15, testo: 'Se in questi minuti la mente ti è scappata, va bene: accorgersene e tornare è già l\'esercizio. Porta con te questo sguardo e riapri gli occhi.' },
    ],
  },
  {
    id: 'esame-della-sera-guidato',
    titolo: 'Esame della sera',
    sotto: 'Dieci minuti per chiudere la giornata, alla maniera di Seneca.',
    minuti: 10,
    fonte: { autore: 'Seneca', opera: "Sull'ira", nota: "l'esame di coscienza della sera" },
    cosaFare: [
      `Siediti in silenzio e ripercorri la giornata, dall'inizio alla fine, come guardando un film.`,
      `Rispondi con onestà a tre domande: che cosa ho fatto bene, dove ho sbagliato, che cosa farò diversamente.`,
      `Chiudi con il perdono verso te stesso e con la gratitudine. Il fine è correggersi, non punirsi.`,
    ],
    perche: `Seneca racconta che ogni sera esaminava la propria giornata, e lo faceva senza severità: riconoscere gli errori per correggerli e poi riposare. Per gli stoici è uno dei modi più semplici di allenare il giudizio su se stessi.`,
    segmenti: [
      { secondi: 30, suono: 'campana', testo: 'Questa meditazione è per la sera. Siediti in silenzio. Per Seneca la giornata si chiude con un colloquio onesto con se stessi.' },
      { secondi: 60, testo: 'Qualche respiro lento, per lasciare la giornata alle spalle.' },
      { secondi: 90, testo: 'Ripensa alla giornata dall\'inizio, come guardando un film: il risveglio, gli incontri, le cose fatte. Guarda, senza giudicare.' },
      { secondi: 90, testo: 'Che cosa hai fatto bene, oggi? Anche le cose piccole. Prenditi il tempo di riconoscerle.' },
      { secondi: 120, testo: 'Dove hai sbagliato, o sei stato diverso da come volevi? Guardalo con onestà e con dolcezza, come faresti con un amico.' },
      { secondi: 90, testo: 'Che cosa farai diversamente, se si ripresenta? Scegli una cosa sola, semplice.' },
      { secondi: 60, testo: 'Concediti il perdono per ciò che è stato. Seneca lo faceva ogni sera: riconoscere, correggere, riposare.' },
      { secondi: 60, testo: 'Ringrazia per ciò che la giornata ti ha dato, anche se poco. Poi lascia andare tutto.' },
    ],
  },
  {
    id: 'vista-dall-alto-guidata',
    titolo: "Vista dall'alto",
    sotto: 'Cinque minuti per guardare la tua vita da lontano e ritrovare la misura.',
    minuti: 5,
    fonte: { autore: 'Marco Aurelio', opera: 'A se stesso', nota: "lo sguardo dall'alto" },
    cosaFare: [
      `Siediti comodo e chiudi gli occhi.`,
      `Immagina di salire piano piano: dalla tua stanza alla casa, alla città, alla Terra, fino a guardare anche i secoli.`,
      `Da lassù guarda il tuo problema: è ancora tuo, ma ha la sua misura. Poi scendi con calma.`,
    ],
    perche: `Marco Aurelio scrive che è utile guardare le vicende umane dall'alto: da lontano le preoccupazioni ritrovano la loro misura. Gli stoici lo praticavano quando un problema sembrava troppo grande.`,
    segmenti: [
      { secondi: 20, suono: 'campana', testo: 'Siediti comodo e respira. Oggi guarderai la tua vita dall\'alto.' },
      { secondi: 30, testo: 'Sei nella tua stanza. Senti il corpo, il respiro, ciò che ti preoccupa.' },
      { secondi: 40, testo: 'Sali un poco. Vedi la casa dall\'alto, il tetto, la strada, le persone che ci vivono.' },
      { secondi: 50, testo: 'Sali ancora: il quartiere, la città con le sue luci, le strade, i movimenti. Ogni luce è una vita.' },
      { secondi: 50, testo: 'Ancora più su: le colline, il mare, il paese intero. Tante persone che lavorano, sperano, si preoccupano, come te.' },
      { secondi: 50, testo: 'Ora la Terra, tutta intera, piccola e silenziosa nello spazio. Da quassù, dov\'è il tuo problema?' },
      { secondi: 30, testo: 'Guarda anche il tempo: i secoli passati e quelli futuri. Quanto peserà, tra cent\'anni, ciò che oggi ti agita?' },
      { secondi: 30, testo: 'Comincia a scendere, lentamente: la Terra, il paese, la città, la tua casa, la tua stanza. Torna con calma.' },
    ],
  },
];
