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
      params = params.set('previo', previo.toString() || 0);
    }
    this.recomendaciones = this.http.get(`${this.URL}canciones/recomendacion`, {
      params,
    });
    return;
  }
  getRecomendaciones(): Observable<any> {
    this.recomendaciones?.forEach((recomendacion) => {
   //   console.log('RECOMENDACION', recomendacion);
    });
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
    if (this.acordeActual?.id === nuevoAcorde.id) {
     // console.warn('Acorde ya añadido - no se actualiza la progresión');
      return;
    }
    if (this.ultimoAcorde === null) {
      this.acordeActual = nuevoAcorde;
      this.ultimoAcorde = nuevoAcorde;
    //  console.log('ACORDE ACTUAL', this.acordeActual);

//console.log('ULTIMO ACORDE', this.ultimoAcorde);

      return this.actualizarRecomendaciones(this.acordeActual.grado, null, 3);
    }

    // Caso 2: Acorde en nueva línea (mayor número de línea)
    if (linea > this.ultimoAcorde.linea! || linea > this.acordeActual?.linea!) {
      this.ultimoAcorde = this.acordeActual;
      this.acordeActual = nuevoAcorde;
  //    console.log('ACORDE ACTUAL', this.acordeActual);
  //    console.log('ULTIMO ACORDE', this.ultimoAcorde);

      return this.actualizarRecomendaciones(
        this.acordeActual.grado,
        this.ultimoAcorde?.grado,
        3
      );
    }

    if (
      linea === this.ultimoAcorde.linea &&
      posicion_en_compas > this.ultimoAcorde.posicion_en_compas!
    ) {
      // El acorde actual pasa a ser el último
      this.ultimoAcorde = this.acordeActual;
      this.acordeActual = nuevoAcorde;
   //   console.log('ACORDE ACTUAL', this.acordeActual);

  //    console.log('ULTIMO ACORDE', this.ultimoAcorde);

      if (this.ultimoAcorde)
        return this.actualizarRecomendaciones(
          this.acordeActual.grado,
          this.ultimoAcorde.grado,
          3
        );
    }
    // Caso 4: Acorde en posición anterior (posible edición)
    if (
      this.ultimoAcorde &&
      posicion_en_compas <= this.ultimoAcorde.posicion_en_compas! &&
      this.ultimoAcorde.linea <= linea
    ) {
    //  console.log('ACORDE ACTUAL', this.acordeActual);
//
    //  console.log('ULTIMO ACORDE', this.ultimoAcorde);
//
    //  console.warn(
    //    'Acorde en posición anterior - no se actualiza la progresión'
    //  );
      return;
    }
    return;
  }
  ngOnDestroy() {
    // Limpiar el observable al destruir el servicio
    this.recomendaciones = undefined;
    this.acordeActual = null;
    this.ultimoAcorde = null;
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
