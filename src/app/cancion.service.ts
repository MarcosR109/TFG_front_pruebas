import { Injectable } from '@angular/core';
import { Cancion } from './cancion/cancion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CancionService {
  URL = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) {}
  enviarCancion(cancion: Cancion) {
    this.http.post(this.URL + 'canciones', cancion).subscribe((res) => {
      console.log(res);
    });
  }
  getCanciones() {
    return this.http.get<{ message: String; canciones: any[] }>(
      this.URL + 'canciones'
    );
  }
  getMine() {
    return this.http.get<{ message: String; canciones: any[] }>(
      this.URL + 'users/favoritos/list'
    );
  }
  getCancionesByTitle(title: string) {
    return this.http.get<{ message: String; canciones: any[] }>(
      this.URL + 'canciones/' + title + '/list'
    );
  }

  getCancion(id: number) {
    return this.http.get<{ cancionMessage: string; cancion: Cancion }>(
      this.URL + 'canciones/' + id
    );
  }

  addRating(rate: number, id: number) {
    return this.http.post(this.URL + 'canciones/' + id + '/rate', {
      rate,
    });
  }
  addFavorito(id: number) {
    return this.http.post(this.URL + 'users/' + id + '/favoritos', {});
  }
  checkFavorito(id: number) {
    return this.http.get(this.URL + 'users/' + id + '/favoritos');
  }
  quitarFavorito(id: number) {
    return this.http.delete(this.URL + 'users/' + id + '/favoritos');
  }
}
