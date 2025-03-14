import { Acorde } from './acorde';
export interface Linea {
  n_linea: number;
  letra: string;
  acordes: Acorde[];
}
