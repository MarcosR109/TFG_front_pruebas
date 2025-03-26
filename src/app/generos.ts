interface Genero {
  id: number;
  nombre: string;
}
export interface Generos {
  generos: Genero[];
}

export const generos: Generos = {
  generos: [
    { id: 1, nombre: 'Pop' },
    { id: 2, nombre: 'Rock' },
    { id: 3, nombre: 'Jazz' },
    { id: 4, nombre: 'Hip Hop' },
    { id: 5, nombre: 'Electrónica' },
    { id: 6, nombre: 'Reggae' },
    { id: 7, nombre: 'Blues' },
    { id: 8, nombre: 'Country' },
    { id: 9, nombre: 'R&B' },
    { id: 10, nombre: 'Folk' },
    { id: 11, nombre: 'Clásica' },
    { id: 12, nombre: 'Metal' },
    { id: 13, nombre: 'Punk' },
    { id: 14, nombre: 'Salsa' },
    { id: 15, nombre: 'Bachata' },
    { id: 16, nombre: 'Reggaeton' },
    { id: 17, nombre: 'Indie' },
    { id: 18, nombre: 'Ambient' },
    { id: 19, nombre: 'Gospel' },
    { id: 20, nombre: 'Funk' },
  ],
};
