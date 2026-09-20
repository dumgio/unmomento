// Meditazioni a tempo: una sequenza di segmenti, ciascuno con un testo e una durata in secondi.
// Con «suono: 'campana'» una campana dolce suona all'inizio del segmento. Una campana suona anche alla fine.

export const MEDITAZIONI = [
  {
    id: 'attenzione-presente',
    titolo: 'Attenzione al respiro e al presente',
    sotto: 'Cinque minuti per tornare qui, un respiro alla volta.',
    minuti: 5,
    fonte: { autore: 'Epitteto', opera: 'Discorsi', nota: "l'attenzione (prosoché) come presenza a se stessi" },
    segmenti: [
      { secondi: 20, suono: 'campana', testo: 'Siediti comodo. Chiudi gli occhi, oppure abbassa lo sguardo. Ora non c\'è nulla da fare.' },
      { secondi: 40, testo: 'Porta l\'attenzione al respiro. Senti l\'aria che entra e che esce, senza cambiarla.' },
      { secondi: 60, testo: 'Quando ti accorgi che la mente è altrove, riportala al respiro. Ogni ritorno è l\'esercizio.' },
      { secondi: 60, testo: 'Ora allarga l\'attenzione ai suoni intorno a te, vicini e lontani. Ascoltali senza scegliere e senza giudicare.' },
      { secondi: 60, testo: 'Senti il corpo: il peso sulla sedia, i piedi, le mani. Che cosa senti, in questo momento?' },
      { secondi: 40, testo: 'Ricorda: questo momento è l\'unico che puoi abitare. Il resto è pensiero.' },
      { secondi: 20, testo: 'Fai un respiro più profondo. Quando sei pronto, riapri gli occhi.' },
    ],
  },
  {
    id: 'esame-della-sera-guidato',
    titolo: 'Esame della sera',
    sotto: 'Dieci minuti per chiudere la giornata, alla maniera di Seneca.',
    minuti: 10,
    fonte: { autore: 'Seneca', opera: "Sull'ira", nota: "l'esame di coscienza della sera" },
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
