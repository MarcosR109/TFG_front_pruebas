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
}
