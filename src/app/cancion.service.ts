import { Injectable } from '@angular/core';
import { Cancion } from './cancion/cancion';
@Injectable({
  providedIn: 'root',
})
export class CancionService {
  constructor() {}
  enviarCancion(cancion: Cancion) {
    console.log(cancion);
  }
}
