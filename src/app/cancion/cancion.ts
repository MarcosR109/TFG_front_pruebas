import { Linea } from './linea';

export interface Cancion {
  id?: number;
  titulo?: string;
  artista?: string;
  genero?: string;
  usuario?: string;
  tonalidad?: string;
  lineas?: Linea[];
  comentario?: string;
  capo?: number;
  rating?: number;
}
