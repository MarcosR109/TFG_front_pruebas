import { Acorde } from './acorde';

interface AcordesPorTonalidad {
  [tonalidad: string]: Acorde[];
}
export const acordesPorTonalidad: AcordesPorTonalidad = {
  C: [
    {
      id: 1,
      acorde: 'C',
      grado: 1,
    },
    {
      id: 2,
      acorde: 'Dm',
      grado: 2,
    },
    {
      id: 3,
      acorde: 'Em',
      grado: 3,
    },
    {
      id: 4,
      acorde: 'F',
      grado: 4,
    },
    {
      id: 5,
      acorde: 'G',
      grado: 5,
    },
    {
      id: 6,
      acorde: 'Am',
      grado: 6,
    },
    {
      id: 7,
      acorde: 'Bdim',
      grado: 7,
    },
  ],
  Cm: [
    {
      id: 8,
      acorde: 'Cm',
      grado: 1,
    },
    {
      id: 9,
      acorde: 'Ddim',
      grado: 2,
    },
    {
      id: 10,
      acorde: 'Eb',
      grado: 3,
    },
    {
      id: 11,
      acorde: 'Fm',
      grado: 4,
    },
    {
      id: 12,
      acorde: 'Gm',
      grado: 5,
    },
    {
      id: 13,
      acorde: 'Ab',
      grado: 6,
    },
    {
      id: 14,
      acorde: 'Bb',
      grado: 7,
    },
  ],
  G: [
    {
      id: 15,
      acorde: 'G',
      grado: 1,
    },
    {
      id: 16,
      acorde: 'Am',
      grado: 2,
    },
    {
      id: 17,
      acorde: 'Bm',
      grado: 3,
    },
    {
      id: 18,
      acorde: 'C',
      grado: 4,
    },
    {
      id: 19,
      acorde: 'D',
      grado: 5,
    },
    {
      id: 20,
      acorde: 'Em',
      grado: 6,
    },
    {
      id: 21,
      acorde: 'F#dim',
      grado: 7,
    },
  ],
  Gm: [
    {
      id: 22,
      acorde: 'Gm',
      grado: 1,
    },
    {
      id: 23,
      acorde: 'Adim',
      grado: 2,
    },
    {
      id: 24,
      acorde: 'Bb',
      grado: 3,
    },
    {
      id: 25,
      acorde: 'Cm',
      grado: 4,
    },
    {
      id: 26,
      acorde: 'Dm',
      grado: 5,
    },
    {
      id: 27,
      acorde: 'Eb',
      grado: 6,
    },
    {
      id: 28,
      acorde: 'F',
      grado: 7,
    },
  ],
  D: [
    {
      id: 29,
      acorde: 'D',
      grado: 1,
    },
    {
      id: 30,
      acorde: 'Em',
      grado: 2,
    },
    {
      id: 31,
      acorde: 'F#m',
      grado: 3,
    },
    {
      id: 32,
      acorde: 'G',
      grado: 4,
    },
    {
      id: 33,
      acorde: 'A',
      grado: 5,
    },
    {
      id: 34,
      acorde: 'Bm',
      grado: 6,
    },
    {
      id: 35,
      acorde: 'C#dim',
      grado: 7,
    },
  ],
  Dm: [
    {
      id: 36,
      acorde: 'Dm',
      grado: 1,
    },
    {
      id: 37,
      acorde: 'Edim',
      grado: 2,
    },
    {
      id: 38,
      acorde: 'F',
      grado: 3,
    },
    {
      id: 39,
      acorde: 'Gm',
      grado: 4,
    },
    {
      id: 40,
      acorde: 'Am',
      grado: 5,
    },
    {
      id: 41,
      acorde: 'Bb',
      grado: 6,
    },
    {
      id: 42,
      acorde: 'C',
      grado: 7,
    },
  ],
  A: [
    {
      id: 43,
      acorde: 'A',
      grado: 1,
    },
    {
      id: 44,
      acorde: 'Bm',
      grado: 2,
    },
    {
      id: 45,
      acorde: 'C#m',
      grado: 3,
    },
    {
      id: 46,
      acorde: 'D',
      grado: 4,
    },
    {
      id: 47,
      acorde: 'E',
      grado: 5,
    },
    {
      id: 48,
      acorde: 'F#m',
      grado: 6,
    },
    {
      id: 49,
      acorde: 'G#dim',
      grado: 7,
    },
  ],
  Am: [
    {
      id: 50,
      acorde: 'Am',
      grado: 1,
    },
    {
      id: 51,
      acorde: 'Bdim',
      grado: 2,
    },
    {
      id: 52,
      acorde: 'C',
      grado: 3,
    },
    {
      id: 53,
      acorde: 'Dm',
      grado: 4,
    },
    {
      id: 54,
      acorde: 'Em',
      grado: 5,
    },
    {
      id: 55,
      acorde: 'F',
      grado: 6,
    },
    {
      id: 56,
      acorde: 'G',
      grado: 7,
    },
  ],
  E: [
    {
      id: 57,
      acorde: 'E',
      grado: 1,
    },
    {
      id: 58,
      acorde: 'F#m',
      grado: 2,
    },
    {
      id: 59,
      acorde: 'G#m',
      grado: 3,
    },
    {
      id: 60,
      acorde: 'A',
      grado: 4,
    },
    {
      id: 61,
      acorde: 'B',
      grado: 5,
    },
    {
      id: 62,
      acorde: 'C#m',
      grado: 6,
    },
    {
      id: 63,
      acorde: 'D#dim',
      grado: 7,
    },
  ],
  Em: [
    {
      id: 64,
      acorde: 'Em',
      grado: 1,
    },
    {
      id: 65,
      acorde: 'F#dim',
      grado: 2,
    },
    {
      id: 66,
      acorde: 'G',
      grado: 3,
    },
    {
      id: 67,
      acorde: 'Am',
      grado: 4,
    },
    {
      id: 68,
      acorde: 'Bm',
      grado: 5,
    },
    {
      id: 69,
      acorde: 'C',
      grado: 6,
    },
    {
      id: 70,
      acorde: 'D',
      grado: 7,
    },
  ],
  B: [
    {
      id: 71,
      acorde: 'B',
      grado: 1,
    },
    {
      id: 72,
      acorde: 'C#m',
      grado: 2,
    },
    {
      id: 73,
      acorde: 'D#m',
      grado: 3,
    },
    {
      id: 74,
      acorde: 'E',
      grado: 4,
    },
    {
      id: 75,
      acorde: 'F#',
      grado: 5,
    },
    {
      id: 76,
      acorde: 'G#m',
      grado: 6,
    },
    {
      id: 77,
      acorde: 'A#dim',
      grado: 7,
    },
  ],
  Bm: [
    {
      id: 78,
      acorde: 'Bm',
      grado: 1,
    },
    {
      id: 79,
      acorde: 'C#dim',
      grado: 2,
    },
    {
      id: 80,
      acorde: 'D',
      grado: 3,
    },
    {
      id: 81,
      acorde: 'Em',
      grado: 4,
    },
    {
      id: 82,
      acorde: 'F#m',
      grado: 5,
    },
    {
      id: 83,
      acorde: 'G',
      grado: 6,
    },
    {
      id: 84,
      acorde: 'A',
      grado: 7,
    },
  ],
  F: [
    {
      id: 85,
      acorde: 'F',
      grado: 1,
    },
    {
      id: 86,
      acorde: 'Gm',
      grado: 2,
    },
    {
      id: 87,
      acorde: 'Am',
      grado: 3,
    },
    {
      id: 88,
      acorde: 'Bb',
      grado: 4,
    },
    {
      id: 89,
      acorde: 'C',
      grado: 5,
    },
    {
      id: 90,
      acorde: 'Dm',
      grado: 6,
    },
    {
      id: 91,
      acorde: 'Edim',
      grado: 7,
    },
  ],
  Fm: [
    {
      id: 92,
      acorde: 'Fm',
      grado: 1,
    },
    {
      id: 93,
      acorde: 'Gdim',
      grado: 2,
    },
    {
      id: 94,
      acorde: 'Ab',
      grado: 3,
    },
    {
      id: 95,
      acorde: 'Bbm',
      grado: 4,
    },
    {
      id: 96,
      acorde: 'Cm',
      grado: 5,
    },
    {
      id: 97,
      acorde: 'Db',
      grado: 6,
    },
    {
      id: 98,
      acorde: 'Eb',
      grado: 7,
    },
  ],
  Bb: [
    {
      id: 99,
      acorde: 'Bb',
      grado: 1,
    },
    {
      id: 100,
      acorde: 'Cm',
      grado: 2,
    },
    {
      id: 101,
      acorde: 'Dm',
      grado: 3,
    },
    {
      id: 102,
      acorde: 'Eb',
      grado: 4,
    },
    {
      id: 103,
      acorde: 'F',
      grado: 5,
    },
    {
      id: 104,
      acorde: 'Gm',
      grado: 6,
    },
    {
      id: 105,
      acorde: 'Adim',
      grado: 7,
    },
  ],
  Bbm: [
    {
      id: 106,
      acorde: 'Bbm',
      grado: 1,
    },
    {
      id: 107,
      acorde: 'Cdim',
      grado: 2,
    },
    {
      id: 108,
      acorde: 'Db',
      grado: 3,
    },
    {
      id: 109,
      acorde: 'Ebm',
      grado: 4,
    },
    {
      id: 110,
      acorde: 'Fm',
      grado: 5,
    },
    {
      id: 111,
      acorde: 'Gb',
      grado: 6,
    },
    {
      id: 112,
      acorde: 'Ab',
      grado: 7,
    },
  ],
  Eb: [
    {
      id: 113,
      acorde: 'Eb',
      grado: 1,
    },
    {
      id: 114,
      acorde: 'Fm',
      grado: 2,
    },
    {
      id: 115,
      acorde: 'Gm',
      grado: 3,
    },
    {
      id: 116,
      acorde: 'Ab',
      grado: 4,
    },
    {
      id: 117,
      acorde: 'Bb',
      grado: 5,
    },
    {
      id: 118,
      acorde: 'Cm',
      grado: 6,
    },
    {
      id: 119,
      acorde: 'Ddim',
      grado: 7,
    },
  ],
  Ebm: [
    {
      id: 120,
      acorde: 'Ebm',
      grado: 1,
    },
    {
      id: 121,
      acorde: 'Fdim',
      grado: 2,
    },
    {
      id: 122,
      acorde: 'Gb',
      grado: 3,
    },
    {
      id: 123,
      acorde: 'Abm',
      grado: 4,
    },
    {
      id: 124,
      acorde: 'Bbm',
      grado: 5,
    },
    {
      id: 125,
      acorde: 'Cb',
      grado: 6,
    },
    {
      id: 126,
      acorde: 'Db',
      grado: 7,
    },
  ],
  Ab: [
    {
      id: 127,
      acorde: 'Ab',
      grado: 1,
    },
    {
      id: 128,
      acorde: 'Bbm',
      grado: 2,
    },
    {
      id: 129,
      acorde: 'Cm',
      grado: 3,
    },
    {
      id: 130,
      acorde: 'Db',
      grado: 4,
    },
    {
      id: 131,
      acorde: 'Eb',
      grado: 5,
    },
    {
      id: 132,
      acorde: 'Fm',
      grado: 6,
    },
    {
      id: 133,
      acorde: 'Gdim',
      grado: 7,
    },
  ],
  Abm: [
    {
      id: 134,
      acorde: 'Abm',
      grado: 1,
    },
    {
      id: 135,
      acorde: 'Bbdim',
      grado: 2,
    },
    {
      id: 136,
      acorde: 'Cb',
      grado: 3,
    },
    {
      id: 137,
      acorde: 'Dbm',
      grado: 4,
    },
    {
      id: 138,
      acorde: 'Ebm',
      grado: 5,
    },
    {
      id: 139,
      acorde: 'Fb',
      grado: 6,
    },
    {
      id: 140,
      acorde: 'Gb',
      grado: 7,
    },
  ],
  Db: [
    {
      id: 141,
      acorde: 'Db',
      grado: 1,
    },
    {
      id: 142,
      acorde: 'Ebm',
      grado: 2,
    },
    {
      id: 143,
      acorde: 'Fm',
      grado: 3,
    },
    {
      id: 144,
      acorde: 'Gb',
      grado: 4,
    },
    {
      id: 145,
      acorde: 'Ab',
      grado: 5,
    },
    {
      id: 146,
      acorde: 'Bbm',
      grado: 6,
    },
    {
      id: 147,
      acorde: 'Cdim',
      grado: 7,
    },
  ],
  Dbm: [
    {
      id: 148,
      acorde: 'Dbm',
      grado: 1,
    },
    {
      id: 149,
      acorde: 'Edim',
      grado: 2,
    },
    {
      id: 150,
      acorde: 'E',
      grado: 3,
    },
    {
      id: 151,
      acorde: 'Gbm',
      grado: 4,
    },
    {
      id: 152,
      acorde: 'Abm',
      grado: 5,
    },
    {
      id: 153,
      acorde: 'A',
      grado: 6,
    },
    {
      id: 154,
      acorde: 'B',
      grado: 7,
    },
  ],
  Gb: [
    {
      id: 155,
      acorde: 'Gb',
      grado: 1,
    },
    {
      id: 156,
      acorde: 'Abm',
      grado: 2,
    },
    {
      id: 157,
      acorde: 'Bbm',
      grado: 3,
    },
    {
      id: 158,
      acorde: 'Cb',
      grado: 4,
    },
    {
      id: 159,
      acorde: 'Db',
      grado: 5,
    },
    {
      id: 160,
      acorde: 'Ebm',
      grado: 6,
    },
    {
      id: 161,
      acorde: 'Fdim',
      grado: 7,
    },
  ],
  Gbm: [
    {
      id: 162,
      acorde: 'Gbm',
      grado: 1,
    },
    {
      id: 163,
      acorde: 'Abdim',
      grado: 2,
    },
    {
      id: 164,
      acorde: 'A',
      grado: 3,
    },
    {
      id: 165,
      acorde: 'Bm',
      grado: 4,
    },
    {
      id: 166,
      acorde: 'Dbm',
      grado: 5,
    },
    {
      id: 167,
      acorde: 'D',
      grado: 6,
    },
    {
      id: 168,
      acorde: 'E',
      grado: 7,
    },
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
