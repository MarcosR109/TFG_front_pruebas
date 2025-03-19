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
    return this.http.get<Cancion[]>(this.URL + 'canciones');
  }
}
