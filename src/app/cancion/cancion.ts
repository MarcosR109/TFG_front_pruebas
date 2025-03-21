import { Linea } from './linea';

export interface Cancion {
  titulo?: string;
  artista?: string;
  genero?: string;
  usuario?: string;
  tonalidad?: string;
  lineas?: Linea[];
  comentario?: string;
  capo?: number;
}
