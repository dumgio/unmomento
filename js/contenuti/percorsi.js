// Percorsi di sette giorni. Ogni giorno propone una cosa piccola: un esercizio, una meditazione, una pagina da leggere o una pagina di quaderno.
// Nessun obbligo: si può saltare un giorno, ripeterlo o cambiare l'ordine. Non si contano le serie di giorni.
// Tipi di azione: esercizio, meditazione, studio (id di una pagina di studio), quaderno (id di un modello).

import { PERCORSI_3 } from './percorsi3.js';

const PERCORSI_BASE = [
  {
    id: 'sette-giorni-di-calma',
    titolo: 'Sette giorni per la calma',
    sotto: 'Un esercizio al giorno per ansia, rabbia e pensieri che girano.',
    intro: `Sette giorni, sette passi piccoli. Il percorso parte dall'attenzione a sé, attraversa la paura e la rabbia, e si chiude con l'esame della sera. Ogni giorno bastano dieci minuti al massimo. Se salti un giorno, riprendi da dove vuoi.`,
    giorni: [
      { titolo: 'Fermarsi e guardare', testo: `Il primo passo è accorgersi di ciò che si pensa. Oggi impari a distinguere un'impressione da un fatto.`, azioni: [{ tipo: 'esercizio', id: 'fermati-impressione' }, { tipo: 'meditazione', id: 'attenzione-presente' }] },
      { titolo: 'Ciò che dipende da te', testo: `La distinzione più importante dello stoicismo. Oggi impari a separare ciò su cui puoi agire da ciò che non puoi controllare.`, azioni: [{ tipo: 'esercizio', id: 'cio-che-dipende-da-me' }, { tipo: 'studio', id: 'dicotomia-in-pratica' }] },
      { titolo: 'La paura del futuro', testo: `Oggi guardi in faccia il peggio, con calma, per misurarlo e prepararti.`, azioni: [{ tipo: 'esercizio', id: 'il-peggio-misurato' }, { tipo: 'studio', id: 'la-paura-del-futuro' }] },
      { titolo: 'Prima di rispondere', testo: `Oggi impari ad aspettare, a guardare chi ti ha ferito con occhi diversi e a non somigliargli.`, azioni: [{ tipo: 'esercizio', id: 'aspetta-prima-di-rispondere' }, { tipo: 'esercizio', id: 'chi-sbaglia-non-sa' }] },
      { titolo: 'Un momento alla volta', testo: `Oggi ti alleni a stare nel presente, che è sempre più piccolo e sopportabile di ciò che immagini.`, azioni: [{ tipo: 'esercizio', id: 'un-momento-alla-volta' }, { tipo: 'meditazione', id: 'il-rifugio-interiore' }] },
      { titolo: 'Lo sguardo dall\'alto', testo: `Oggi allarghi lo sguardo: da lassù, ciò che ti preoccupa ritrova la sua misura.`, azioni: [{ tipo: 'meditazione', id: 'vista-dall-alto-guidata' }, { tipo: 'esercizio', id: 'lo-sguardo-dall-alto-scritto' }] },
      { titolo: 'La sera', testo: `Chiudi la settimana con l'esame della sera: riconoscere, correggere, riposare.`, azioni: [{ tipo: 'meditazione', id: 'esame-della-sera-guidato' }, { tipo: 'quaderno', id: 'sera' }] },
    ],
  },
  {
    id: 'sette-giorni-di-stoicismo',
    titolo: 'Sette giorni per cominciare',
    sotto: 'Una settimana per conoscere lo stoicismo e le sue pratiche di base.',
    intro: `Per chi comincia da zero. Un giorno per capire che cos'è lo stoicismo, poi le tre discipline, la mattina, gli altri, il tempo, il quaderno e la sera. Poche pagine da leggere e una pratica al giorno.`,
    giorni: [
      { titolo: 'Che cos\'è lo stoicismo', testo: `Una filosofia nata ad Atene, pensata per vivere meglio. Oggi ne leggi le basi e scopri i falsi miti.`, azioni: [{ tipo: 'studio', id: 'cose-lo-stoicismo' }, { tipo: 'studio', id: 'falsi-miti' }] },
      { titolo: 'Le tre discipline', testo: `Giudizio, desiderio, azione: la bussola dell'app. Oggi le conosci e le provi.`, azioni: [{ tipo: 'studio', id: 'tre-discipline' }, { tipo: 'esercizio', id: 'tre-domande-sottomano' }] },
      { titolo: 'La mattina', testo: `Marco Aurelio comincia la giornata preparandosi. Oggi provi anche tu.`, azioni: [{ tipo: 'meditazione', id: 'la-mattina' }, { tipo: 'quaderno', id: 'mattina' }] },
      { titolo: 'Gli altri', testo: `Come stare con chi ci ferisce e con chi ci sta accanto. Oggi una pratica sulla comprensione e una sul gesto verso gli altri.`, azioni: [{ tipo: 'esercizio', id: 'quattro-ragioni' }, { tipo: 'esercizio', id: 'cittadini-della-stessa-citta' }] },
      { titolo: 'Il tempo', testo: `Non abbiamo poco tempo: ne perdiamo molto. Oggi guardi dove finiscono le tue ore.`, azioni: [{ tipo: 'meditazione', id: 'il-tempo-che-hai' }, { tipo: 'esercizio', id: 'il-tempo-che-perdi' }] },
      { titolo: 'Scrivere per pensare', testo: `Gli stoici scrivevano per sé. Oggi scrivi anche tu nel quaderno e leggi perché conviene.`, azioni: [{ tipo: 'studio', id: 'scrivere-per-pensare' }, { tipo: 'quaderno', id: 'lettera' }] },
      { titolo: 'Ciò che hai ricevuto', testo: `Chiudi la settimana con la gratitudine: ciò che hai ricevuto da chi ti ha preceduto. E con l'esame della sera.`, azioni: [{ tipo: 'esercizio', id: 'cio-che-ho-ricevuto' }, { tipo: 'quaderno', id: 'sera' }] },
    ],
  },
];

export const PERCORSI = [...PERCORSI_BASE, ...PERCORSI_3];
