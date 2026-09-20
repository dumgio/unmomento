// I modelli del quaderno e le loro domande-guida. Le domande riprendono pratiche stoiche:
// la preparazione del mattino (Marco Aurelio, II, 1), l'esame della sera (Seneca, Sull'ira, III, 36),
// il distinguere ciò che dipende da noi (Epitteto). «domande» sono quelle proposte all'inizio, «altre» le alternative.

const modello = (id, titolo, sotto, intro, domande, altre) => ({ id, titolo, sotto, intro, domande, pool: [...domande, ...altre] });

export const MODELLI = [
  modello(
    'mattina',
    'Mattina',
    'Prepararsi alla giornata',
    'Marco Aurelio cominciava la giornata dicendosi che cosa avrebbe incontrato e come voleva affrontarlo. Tre domande, pochi minuti.',
    [
      'Che cosa potrebbe mettermi alla prova oggi?',
      'Come voglio essere quando succede?',
      'Qual è il mio compito più importante di oggi?',
    ],
    [
      'Che cosa dipende da me, oggi, e che cosa no?',
      'Con quale persona voglio essere più paziente?',
      'Che cosa posso lasciar andare fin da adesso?',
      'Quale piccolo gesto renderà buona questa giornata?',
      'Che cosa temo di affrontare, e qual è il primo passo?',
      'Chi posso aiutare oggi?',
      'Quale qualità voglio esercitare oggi: pazienza, chiarezza, coraggio, gentilezza?',
    ],
  ),
  modello(
    'sera',
    'Sera',
    'Esaminare la giornata',
    'Seneca ogni sera ripercorreva la giornata, senza nascondersi nulla e senza punirsi. Tre domande, con calma.',
    [
      'Che cosa ho fatto bene oggi?',
      'Dove ho sbagliato, o sono stato diverso da come volevo?',
      'Che cosa farò diversamente, se si ripresenta?',
    ],
    [
      'Che cosa mi ha agitato oggi, e dipendeva da me?',
      'Quale impressione ho creduto troppo in fretta?',
      'Con chi sono stato impaziente o ingiusto?',
      'Per che cosa sono grato oggi?',
      'Che cosa ho imparato oggi?',
      'In quale momento sono stato davvero presente?',
      'Che cosa ho rimandato, e qual è il primo passo per domani?',
    ],
  ),
  modello(
    'lettera',
    'Lettera',
    'Scrivere a se stessi come a un amico',
    'Le Lettere a Lucilio di Seneca sono lettere a un amico, per aiutarlo a vivere meglio. Prova a scrivere a te stesso con lo stesso tono.',
    ['Scrivi a te stesso come scriveresti a un amico che vive ciò che stai vivendo tu.'],
    [
      'Che cosa diresti a un amico che si sente in colpa per ciò che è successo?',
      'Che cosa ricorderesti a un amico di ciò che dipende da lui?',
      'Che cosa vorresti che ti dicesse, adesso, un amico saggio?',
      'Che cosa consiglieresti a un amico che ha paura di ciò che verrà?',
      'Che cosa diresti a un amico stanco, che pensa di non farcela?',
    ],
  ),
  modello(
    'libero',
    'Pagina libera',
    'Scrivere quello che vuoi',
    'Uno spazio senza domande, per annotare un pensiero, un ricordo o una frase da tenere.',
    [],
    [],
  ),
];
