// Percorsi di sette giorni della Fase 3 (4 in più, per arrivare a 6). Stesso formato di percorsi.js.
// Nessun obbligo: si può saltare un giorno, ripeterlo o cambiare l'ordine. Non si contano le serie di giorni.

export const PERCORSI_3 = [
  {
    id: 'sette-giorni-contro-la-paura',
    titolo: 'Sette giorni per la paura',
    sotto: 'Guardare in faccia ciò che si teme, un passo alla volta.',
    intro: `Per chi ha paura di qualcosa che potrebbe accadere. Il percorso parte dalla calma del corpo, passa per la premeditazione dei mali e per la distinzione tra ciò che dipende da te e ciò che no, e si chiude con una piccola prova di coraggio. Ogni giorno bastano dieci minuti al massimo.`,
    giorni: [
      { titolo: 'Un punto fermo', testo: `Prima di ogni altra cosa, un appoggio: l'immagine di uno scoglio che resta fermo mentre le onde arrivano e passano.`, azioni: [{ tipo: 'esercizio', id: 'come-il-promontorio' }] },
      { titolo: 'Che cosa temo, davvero', testo: `Dai un nome preciso a ciò che ti spaventa e cerca il giudizio che c'è sotto.`, azioni: [{ tipo: 'esercizio', id: 'un-nome-alla-passione' }, { tipo: 'studio', id: 'mappa-delle-passioni' }] },
      { titolo: 'Il pensiero sospeso', testo: `Prima di credere alla paura, la lasci parlare e controlli su che cosa si basa.`, azioni: [{ tipo: 'esercizio', id: 'il-consenso-sospeso' }] },
      { titolo: 'Guardare il peggio', testo: `Con calma e con metodo, immagini il caso peggiore e vedi che cosa faresti. Se ti agita troppo, fermati.`, azioni: [{ tipo: 'meditazione', id: 'guardare-il-peggio' }, { tipo: 'studio', id: 'la-premeditazione-dei-mali' }] },
      { titolo: 'Ciò che è tuo', testo: `Separi ciò che puoi fare da ciò che non dipende da te, e scegli un gesto.`, azioni: [{ tipo: 'esercizio', id: 'cio-che-dipende-da-me' }, { tipo: 'esercizio', id: 'sospendi-il-desiderio' }] },
      { titolo: 'Una piccola prova', testo: `Scegli una piccola scomodità e provala. Scopri che si può.`, azioni: [{ tipo: 'esercizio', id: 'il-rimedio-dell-abitudine' }, { tipo: 'studio', id: 'virtu-coraggio' }] },
      { titolo: 'Come sei ora', testo: `Chiudi la settimana con una pagina di quaderno: che cosa è cambiato nel modo in cui guardi la tua paura?`, azioni: [{ tipo: 'quaderno', id: 'libero' }, { tipo: 'meditazione', id: 'la-calma-della-sera' }] },
    ],
  },
  {
    id: 'sette-giorni-con-gli-altri',
    titolo: 'Sette giorni con gli altri',
    sotto: 'Un percorso sulle relazioni: giustizia, ascolto, limiti e gratitudine.',
    intro: `Per chi vuole stare meglio con le persone che ha intorno. Ogni giorno una pratica piccola, tra ruoli, ascolto, perdono e gratitudine. Nessuno va cambiato: si comincia da come ti comporti tu.`,
    giorni: [
      { titolo: 'La parte che ti spetta', testo: `Ogni ruolo ha i suoi doveri. Oggi guardi che parte recitare, e come recitarla bene.`, azioni: [{ tipo: 'esercizio', id: 'la-parte-che-recito' }, { tipo: 'studio', id: 'i-doveri-e-i-ruoli' }] },
      { titolo: 'Ascoltare davvero', testo: `Prima di rispondere, capire che cosa vuole dire l'altro, con una lettura più generosa.`, azioni: [{ tipo: 'esercizio', id: 'la-conversazione-in-corso' }] },
      { titolo: 'Chi sbaglia non sa', testo: `Guardi chi ti ha ferito come una persona che crede di fare bene, e ti chiedi che cosa ne è di te.`, azioni: [{ tipo: 'esercizio', id: 'chi-sbaglia-non-sa' }, { tipo: 'studio', id: 'il-perdono-e-la-clemenza' }] },
      { titolo: 'Un limite gentile', testo: `Dire di no con garbo è un atto di giustizia verso te stesso e verso l'altro.`, azioni: [{ tipo: 'esercizio', id: 'un-limite-gentile' }, { tipo: 'studio', id: 'virtu-giustizia' }] },
      { titolo: 'Un favore in silenzio', testo: `Fai qualcosa di utile per qualcuno, senza dirlo e senza aspettarti nulla.`, azioni: [{ tipo: 'esercizio', id: 'un-favore-in-silenzio' }] },
      { titolo: 'Cittadini della stessa città', testo: `Allarghi lo sguardo: tutti facciamo parte di un insieme, e ognuno ha bisogno degli altri.`, azioni: [{ tipo: 'meditazione', id: 'la-citta-comune' }, { tipo: 'esercizio', id: 'le-due-mani' }] },
      { titolo: 'Ringraziare', testo: `Chiudi la settimana con la gratitudine, scrivendo a qualcuno una lettera vera o solo pensata.`, azioni: [{ tipo: 'quaderno', id: 'lettera' }, { tipo: 'studio', id: 'la-gratitudine' }] },
    ],
  },
  {
    id: 'sette-giorni-per-il-tempo',
    titolo: 'Sette giorni per il tempo',
    sotto: 'Fare ordine tra le cose da fare e ritrovare il tempo che si perde.',
    intro: `Per chi ha troppe cose da fare, o le rimanda. Il percorso alterna pratiche brevi, per ordinare, e pratiche di attenzione, per fare bene una cosa alla volta. Comincia dal guardare il carico com'è.`,
    giorni: [
      { titolo: 'Mettere tutto sulla carta', testo: `Scrivi tutto ciò che ti pesa e ordinalo per ruoli. Ciò che non spetta a te esce dalla lista.`, azioni: [{ tipo: 'esercizio', id: 'la-lista-dei-doveri' }] },
      { titolo: 'Una cosa sola', testo: `Oggi scegli il lavoro che hai in mano, e lo fai con tutta l'attenzione.`, azioni: [{ tipo: 'esercizio', id: 'il-lavoro-che-hai-tra-le-mani' }, { tipo: 'meditazione', id: 'un-compito-alla-volta' }] },
      { titolo: 'Ciò che rimandi', testo: `Guardi l'elenco di ciò che rimandi da tempo. Ne togli qualcosa, e ne scegli una da fare.`, azioni: [{ tipo: 'esercizio', id: 'l-elenco-di-cio-che-rimandi' }] },
      { titolo: 'Il tempo secondo Seneca', testo: `Leggi come Seneca guardava il tempo: il bene più prezioso e meno custodito.`, azioni: [{ tipo: 'studio', id: 'il-tempo-secondo-seneca' }, { tipo: 'esercizio', id: 'il-tempo-che-perdi' }] },
      { titolo: 'Fare bene il proprio lavoro', testo: `Guardi il lavoro come un'occasione di esercizio: serietà, misura, giustizia verso gli altri.`, azioni: [{ tipo: 'studio', id: 'stoicismo-e-lavoro' }, { tipo: 'esercizio', id: 'il-primo-gesto-piccolo' }] },
      { titolo: 'Come se fosse l’ultimo', testo: `Ricordi che il tempo è limitato, non per paura ma per scegliere meglio ciò che conta.`, azioni: [{ tipo: 'esercizio', id: 'come-se-fosse-l-ultimo' }, { tipo: 'meditazione', id: 'il-tempo-che-hai' }] },
      { titolo: 'Il riposo ha la sua misura', testo: `Chiudi la settimana riposando bene: anche il riposo fa parte del lavoro.`, azioni: [{ tipo: 'esercizio', id: 'il-riposo-ha-la-sua-misura' }, { tipo: 'quaderno', id: 'sera' }] },
    ],
  },
  {
    id: 'sette-giorni-di-sera',
    titolo: 'Sette giorni di sera',
    sotto: 'Chiudere bene la giornata, per riposare meglio e cominciare con calma.',
    intro: `Per chi si porta a letto i pensieri della giornata. Ogni sera una pratica breve, per ripercorrere, perdonare e lasciare andare. Ogni mattina, se vuoi, un piccolo respiro per cominciare. Nessuna promessa sul sonno: solo un'abitudine di calma.`,
    giorni: [
      { titolo: 'La sera in un minuto', testo: `Tre domande per chiudere il giorno: che cosa è andato bene, dove ho sbagliato, che cosa cambiare domani.`, azioni: [{ tipo: 'esercizio', id: 'la-sera-in-un-minuto' }] },
      { titolo: 'Un appunto per domani', testo: `Scrivi ciò che ti gira in testa e lo affidi al mattino.`, azioni: [{ tipo: 'esercizio', id: 'un-appunto-per-domani' }] },
      { titolo: 'La sentinella', testo: `Ti siedi alla porta dei pensieri e li guardi passare, senza seguirli.`, azioni: [{ tipo: 'esercizio', id: 'la-sentinella' }, { tipo: 'studio', id: 'esercizi-spirituali' }] },
      { titolo: 'Ti perdono per ora', testo: `Guardi ciò che ti pesa della giornata con benevolenza, come faresti con un amico.`, azioni: [{ tipo: 'esercizio', id: 'ti-perdono-per-ora' }, { tipo: 'studio', id: 'l-esame-di-coscienza' }] },
      { titolo: 'La calma della sera', testo: `Una meditazione di dieci minuti per congedare la giornata e prepararsi al sonno.`, azioni: [{ tipo: 'meditazione', id: 'la-calma-della-sera' }] },
      { titolo: 'Il primo respiro del mattino', testo: `Oggi, appena ti svegli, un respiro e una cosa che dipende da te. Poi comincia la giornata.`, azioni: [{ tipo: 'esercizio', id: 'il-primo-respiro-del-mattino' }, { tipo: 'meditazione', id: 'la-mattina' }] },
      { titolo: 'Una pagina di sera', testo: `Chiudi la settimana con una pagina di quaderno: come è cambiata la tua sera?`, azioni: [{ tipo: 'quaderno', id: 'sera' }, { tipo: 'studio', id: 'la-tranquillita-dell-animo' }] },
    ],
  },
];
