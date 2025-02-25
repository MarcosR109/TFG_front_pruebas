interface AcordesPorTonalidad {
  [tonalidad: string]: {
    [grado: number]: string;
  };
}
export const acordesPorTonalidad: AcordesPorTonalidad = {
  C: {
    1: 'C',
    2: 'Dm',
    3: 'Em',
    4: 'F',
    5: 'G',
    6: 'Am',
    7: 'Bdim',
  },
  G: {
    1: 'G',
    2: 'Am',
    3: 'Bm',
    4: 'C',
    5: 'D',
    6: 'Em',
    7: 'F#dim',
  },
  D: {
    1: 'D',
    2: 'Em',
    3: 'F#m',
    4: 'G',
    5: 'A',
    6: 'Bm',
    7: 'C#dim',
  },
  A: {
    1: 'A',
    2: 'Bm',
    3: 'C#m',
    4: 'D',
    5: 'E',
    6: 'F#m',
    7: 'G#dim',
  },
  E: {
    1: 'E',
    2: 'F#m',
    3: 'G#m',
    4: 'A',
    5: 'B',
    6: 'C#m',
    7: 'D#dim',
  },
  B: {
    1: 'B',
    2: 'C#m',
    3: 'D#m',
    4: 'E',
    5: 'F#',
    6: 'G#m',
    7: 'A#dim',
  },
  F: {
    1: 'F',
    2: 'Gm',
    3: 'Am',
    4: 'Bb',
    5: 'C',
    6: 'Dm',
    7: 'Edim',
  },
  Bb: {
    1: 'Bb',
    2: 'Cm',
    3: 'Dm',
    4: 'Eb',
    5: 'F',
    6: 'Gm',
    7: 'Adim',
  },
  Eb: {
    1: 'Eb',
    2: 'Fm',
    3: 'Gm',
    4: 'Ab',
    5: 'Bb',
    6: 'Cm',
    7: 'Ddim',
  },
  Ab: {
    1: 'Ab',
    2: 'Bbm',
    3: 'Cm',
    4: 'Db',
    5: 'Eb',
    6: 'Fm',
    7: 'Gdim',
  },
  Db: {
    1: 'Db',
    2: 'Ebm',
    3: 'Fm',
    4: 'Gb',
    5: 'Ab',
    6: 'Bbm',
    7: 'Cdim',
  },
  Gb: {
    1: 'Gb',
    2: 'Abm',
    3: 'Bbm',
    4: 'Cb',
    5: 'Db',
    6: 'Ebm',
    7: 'Fdim',
  },
};

export const variaciones = [
  '5', // Power chord (C5)
  '6', // Sexta agregada (C6)
  '69', // Sexta con novena (C69)
  '7b5', // Séptima con quinta disminuida (C7b5)
  '7#5', // Séptima con quinta aumentada (C7#5)
  'b5', // Quinto disminuido (C7b5 o parte de acordes alterados)
  '#5', // Quinto aumentado (Caug o C+)
  'b9', // Novena disminuida (C7b9 o parte de acordes alterados)
  '#9', // Novena aumentada (C7#9 o parte de acordes alterados)
  'b13', // Treceava disminuida (C7b13 o parte de acordes alterados)
  '#13', // Treceava aumentada (C7#13 o parte de acordes alterados)
  'maj7', // Séptima mayor (Cmaj7)
  'm7', // Séptima menor (Cm7)
  '7', // Séptima dominante (C7)
  'm', // Acorde menor (Cm)
  'aug', // Acorde aumentado (Caug o C+)
  'dim', // Acorde disminuido (Cdim)
  'sus2', // Suspensión 2 (Csus2)
  'sus4', // Suspensión 4 (Csus4)
  'add9', // Acorde con novena añadida (Cadd9)
  'maj9', // Novena mayor (Cmaj9)
  'm9', // Novena menor (Cm9)
  '11', // Acorde con 11 (C11)
  '13', // Treceava (C13)
];
