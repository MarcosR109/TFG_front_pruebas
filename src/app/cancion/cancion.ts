import { Linea } from './linea';

export interface Cancion {
  id?: number;
  titulo?: string;
  artista_id?: number;
  artista?: string;
  genero_id?: number;
  genero?: string;
  usuario?: string;
  tonalidade_id?: number;
  tonalidad?: string;
  lineas?: Linea[];
  comentario?: string;
  capo?: number;
  rating?: number;
  metrica?: string;
  var?: string;
  privada?: boolean;
}
