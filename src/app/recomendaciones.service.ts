import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { CancionService } from './cancion.service';

@Injectable({
  providedIn: 'root',
})
export class RecomendacionesService {
  constructor(private cancionesService: CancionService) {}

  private ultimoAcordeValido: {
    grado: number;
    linea: number;
    posicion: number;
  } | null = null;
  private historialProgresion: number[] = [];

  // Método para registrar acordes y actualizar estado
  registrarAcorde(grado: number, linea: number, posicion: number): void {
    if (grado > 0) {
      // Filtramos acordes vacíos (grado 0)
      this.ultimoAcordeValido = { grado, linea, posicion };
      this.historialProgresion.push(grado);

      // Mantener un historial razonable (últimos 4-6 acordes)
      if (this.historialProgresion.length > 6) {
        this.historialProgresion.shift();
      }
    }
  }

  // Método para obtener recomendaciones
  obtenerRecomendacion(
    lineaActual: number,
    posicionActual: number
  ): Observable<number[]> {
    if (!this.ultimoAcordeValido) {
      return of(this.getProgresionInicial());
    }

    // Determinar si estamos en una nueva línea o continuando la misma
    const esNuevaLinea = this.ultimoAcordeValido.linea !== lineaActual;

    // Obtener contexto para la recomendación
    const contexto = {
      ultimoGrado: this.ultimoAcordeValido.grado,
      historialReciente: [...this.historialProgresion],
      nuevaLinea: esNuevaLinea,
      posicionEnCompas: posicionActual,
    };

    return this.cancionesService.getRecomendaciones(contexto).pipe(
      map((response) => response.recomendaciones),
      catchError(() => of(this.getFallbackRecomendation()))
    );
  }

  // Reiniciar progresión (para nueva sección o canción)
  reiniciarProgresion(): void {
    this.ultimoAcordeValido = null;
    this.historialProgresion = [];
  }

  private getProgresionInicial(): number[] {
    // Progresiones comunes para empezar (I, IV, V, vi)
    return [1, 4, 5, 6];
  }

  private getFallbackRecomendation(): number[] {
    // Recomendación por defecto si falla el servicio
    return this.ultimoAcordeValido ? [this.ultimoAcordeValido.grado] : [1];
  }
}
interface InfoGrado {
  posiciones: number[]; // Todas las posiciones donde aparece este grado
  grado: number; // El grado armónico
  linea: number; // Número de línea en la canción
  acordeId?: number; // Opcional: ID del acorde si lo tienes
}
type DiccionarioGrados = {
  [linea: number]: InfoGrado[];
};
