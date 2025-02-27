import { Acorde } from './acorde';

interface AcordesPorTonalidad {
  [tonalidad: string]: Acorde[];
}
export const acordesPorTonalidad: AcordesPorTonalidad = {
  C: [
    { acorde: 'C', variacion: '' },
    { acorde: 'Dm', grado: 2 },
    { acorde: 'Em', grado: 3 },
    { acorde: 'F', grado: 4 },
    { acorde: 'G', grado: 5 },
    { acorde: 'Am', grado: 6 },
    { acorde: 'Bdim', grado: 7 },
  ],
  G: [
    { acorde: 'G', grado: 1 },
    { acorde: 'Am', grado: 2 },
    { acorde: 'Bm', grado: 3 },
    { acorde: 'C', grado: 4 },
    { acorde: 'D', grado: 5 },
    { acorde: 'Em', grado: 6 },
    { acorde: 'F#dim', grado: 7 },
  ],
  D: [
    { acorde: 'D', grado: 1 },
    { acorde: 'Em', grado: 2 },
    { acorde: 'F#m', grado: 3 },
    { acorde: 'G', grado: 4 },
    { acorde: 'A', grado: 5 },
    { acorde: 'Bm', grado: 6 },
    { acorde: 'C#dim', grado: 7 },
  ],
  A: [
    { acorde: 'A', grado: 1 },
    { acorde: 'Bm', grado: 2 },
    { acorde: 'C#m', grado: 3 },
    { acorde: 'D', grado: 4 },
    { acorde: 'E', grado: 5 },
    { acorde: 'F#m', grado: 6 },
    { acorde: 'G#dim', grado: 7 },
  ],
  E: [
    { acorde: 'E', grado: 1 },
    { acorde: 'F#m', grado: 2 },
    { acorde: 'G#m', grado: 3 },
    { acorde: 'A', grado: 4 },
    { acorde: 'B', grado: 5 },
    { acorde: 'C#m', grado: 6 },
    { acorde: 'D#dim', grado: 7 },
  ],
  B: [
    { acorde: 'B', grado: 1 },
    { acorde: 'C#m', grado: 2 },
    { acorde: 'D#m', grado: 3 },
    { acorde: 'E', grado: 4 },
    { acorde: 'F#', grado: 5 },
    { acorde: 'G#m', grado: 6 },
    { acorde: 'A#dim', grado: 7 },
  ],
  F: [
    { acorde: 'F', grado: 1 },
    { acorde: 'Gm', grado: 2 },
    { acorde: 'Am', grado: 3 },
    { acorde: 'Bb', grado: 4 },
    { acorde: 'C', grado: 5 },
    { acorde: 'Dm', grado: 6 },
    { acorde: 'Edim', grado: 7 },
  ],
  Bb: [
    { acorde: 'Bb', grado: 1 },
    { acorde: 'Cm', grado: 2 },
    { acorde: 'Dm', grado: 3 },
    { acorde: 'Eb', grado: 4 },
    { acorde: 'F', grado: 5 },
    { acorde: 'Gm', grado: 6 },
    { acorde: 'Adim', grado: 7 },
  ],
  Eb: [
    { acorde: 'Eb', grado: 1 },
    { acorde: 'Fm', grado: 2 },
    { acorde: 'Gm', grado: 3 },
    { acorde: 'Ab', grado: 4 },
    { acorde: 'Bb', grado: 5 },
    { acorde: 'Cm', grado: 6 },
    { acorde: 'Ddim', grado: 7 },
  ],
  Ab: [
    { acorde: 'Ab', grado: 1 },
    { acorde: 'Bbm', grado: 2 },
    { acorde: 'Cm', grado: 3 },
    { acorde: 'Db', grado: 4 },
    { acorde: 'Eb', grado: 5 },
    { acorde: 'Fm', grado: 6 },
    { acorde: 'Gdim', grado: 7 },
  ],
  Db: [
    { acorde: 'Db', grado: 1 },
    { acorde: 'Ebm', grado: 2 },
    { acorde: 'Fm', grado: 3 },
    { acorde: 'Gb', grado: 4 },
    { acorde: 'Ab', grado: 5 },
    { acorde: 'Bbm', grado: 6 },
    { acorde: 'Cdim', grado: 7 },
  ],
  Gb: [
    { acorde: 'Gb', grado: 1 },
    { acorde: 'Abm', grado: 2 },
    { acorde: 'Bbm', grado: 3 },
    { acorde: 'Cb', grado: 4 },
    { acorde: 'Db', grado: 5 },
    { acorde: 'Ebm', grado: 6 },
    { acorde: 'Fdim', grado: 7 },
  ],
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
