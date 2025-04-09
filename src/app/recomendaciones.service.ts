import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { CancionService } from './cancion.service';
import { Acorde } from './cancion/acorde';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RecomendacionesService {
  constructor(
    private cancionesService: CancionService,
    private http: HttpClient
  ) {
    this.ultimoAcorde = null;
    this.acordeActual = null;
    this.URL = this.cancionesService.URL;
  }
  URL = '';
  ultimoAcorde: AcordeRecomendacion | null;
  acordeActual: AcordeRecomendacion | null;
  recomendaciones?: Observable<any>;

  actualizarRecomendaciones(
    actual: number,
    previo?: number | null, // Parámetro opcional
    limit: number = 3
  ): void {
    let params = new HttpParams()
      .set('actual', actual.toString())
      .set('limit', limit.toString());

    // Solo añadir previo si existe
    if (previo !== undefined && previo !== null) {
      params = params.set('previo', previo.toString());
    }
    this.recomendaciones = this.http.get(`${this.URL}canciones/recomendacion`, {
      params,
    });
    return;
  }
  getRecomendaciones(): Observable<any> {
    console.log(this.recomendaciones);

    if (this.recomendaciones) {
      return this.recomendaciones;
    }
    return of([]); // Retorna un observable vacío si no hay recomendaciones
  }

  anadirAcorde(
    id: number,
    acorde: string,
    variacion: string,
    posicion_en_compas: number,
    grado: number,
    linea: number
  ) {
    const nuevoAcorde: AcordeRecomendacion = {
      id,
      acorde,
      variacion,
      posicion_en_compas,
      grado,
      effect: 'copy',
      linea,
    };
    if (this.ultimoAcorde === null) {
      this.acordeActual = nuevoAcorde;
      this.ultimoAcorde = nuevoAcorde;
      console.log('Primer acorde registrado:', this.acordeActual);
      return this.actualizarRecomendaciones(this.acordeActual.grado, null, 3);
    }
    // Caso 2: Acorde en nueva línea (mayor número de línea)
    if (linea > this.ultimoAcorde.linea!) {
      this.ultimoAcorde = this.acordeActual;
      this.acordeActual = nuevoAcorde;
      console.log(
        'Nueva línea - Acorde actual actualizado:',
        this.acordeActual
      );
      console.log('ULTIMO ACORDE', this.ultimoAcorde);
      return this.actualizarRecomendaciones(
        this.acordeActual.grado,
        this.ultimoAcorde?.grado,
        3
      );
    }
    // Caso 3: Misma línea pero posición posterior en el compás
    if (
      linea === this.ultimoAcorde.linea &&
      posicion_en_compas > this.ultimoAcorde.posicion_en_compas!
    ) {
      // El acorde actual pasa a ser el último
      this.ultimoAcorde = this.acordeActual;
      this.acordeActual = nuevoAcorde;
      console.log('Progresión en misma línea:', {
        ultimo: this.ultimoAcorde,
        actual: this.acordeActual,
      });
      if (this.ultimoAcorde)
        return this.actualizarRecomendaciones(
          this.acordeActual.grado,
          this.ultimoAcorde.grado,
          3
        );
    }

    // Caso 4: Acorde en posición anterior (posible edición)
    if (posicion_en_compas <= this.ultimoAcorde?.posicion_en_compas!) {
      console.warn(
        'Acorde en posición anterior - no se actualiza la progresión'
      );
      return;
    }
    return;
  }
}
export interface AcordeRecomendacion {
  id: number;
  acorde: string;
  variacion: string;
  posicion_en_compas: number;
  grado: number;
  effect: string;
  linea: number;
}
