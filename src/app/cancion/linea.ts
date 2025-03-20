import { Acorde } from './acorde';
export interface Linea {
  n_linea: number;
  texto: string;
  acordes: Acorde[];
}
