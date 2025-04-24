import { Component } from '@angular/core';
import { CancionService } from '../cancion.service';
import { Cancion } from '../cancion/cancion';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FiltrosComponent } from '../filtros/filtros.component';
import { MatListModule } from '@angular/material/list';
import { MatCard } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-canciones-mine',
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    RouterLink,
    MatTableModule,
    RouterLink,
    MatIconModule,
    CommonModule,
    FiltrosComponent,
    MatListModule,
    MatCard,
    MatIconModule,
    MatIconButton,
    MatSortModule,
    MatSort,
    MatProgressSpinnerModule,
  ],
  templateUrl: './canciones-mine.component.html',
  styleUrl: './canciones-mine.component.css',
})
export class CancionesMineComponent {
  cancionesFiltradas: CancionFoo[] = [];
  debug: any[] = [];
  cancionesCombinadas: CancionFoo[] = [];
  isLoading: boolean = true;
  constructor(private cancionService: CancionService) {}

  ngOnInit() {
    this.cancionService.getMine().subscribe((res: any) => {
      // Procesar canciones favoritas
      const cancionesFav = res.cancionesfav.map((cancion: any) => ({
        ...cancion,
        es_favorita: true,
        es_propia: false,
      }));

      // Procesar canciones propias
      const cancionesPro = res.cancionespro.map((cancion: any) => ({
        ...cancion,
        es_favorita: false,
        es_propia: true,
      }));
      this.cancionesCombinadas = [...cancionesFav, ...cancionesPro];

      this.cancionesFiltradas = [...this.cancionesCombinadas];
      this.cancionesCombinadas;
      this.isLoading = false;
    });

    this.cancionService.cancionesFiltradas$.subscribe((filtros) => {
      if (this.cancionesCombinadas) {
        this.cancionesFiltradas = this.cancionService.filtrar(
          [...this.cancionesCombinadas],
          filtros
        );
      }
    });
  }

  sortData(sort: Sort) {
    const data = this.cancionesFiltradas.slice();
    if (!sort.active || sort.direction === '') {
      this.debug = data;
      this.debug;
      return;
    }

    this.debug = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'titulo':
          return compare(a.titulo, b.titulo, isAsc);
        case 'artista':
          return compare(a.artista.nombre, b.artista.nombre, isAsc);
        case 'genero':
          return compare(a.genero.nombre, b.genero.nombre, isAsc);
        case 'rating':
          return compare(a.rating, b.rating, isAsc);
        default:
          return 0;
      }
    });
    this.cancionesFiltradas = this.debug;
  }
  getStarType(star: number, rating: number): string {
    if (star <= rating) {
      return 'star'; // Estrella llena
    } else if (star - 0.5 <= rating) {
      return 'star_half'; // Media estrella
    } else {
      return 'star_border'; // Estrella vacía
    }
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

interface CancionFoo {
  id: number;
  titulo: string;
  artista: {
    id: number;
    nombre: string;
  };
  genero: {
    id: number;
    nombre: string;
  };
  tonalidade: {
    id: number;
    nombre: string;
  };
  rating: number;
  user_id: number;
  publicada: boolean;
  privada: boolean;
  es_favorita?: boolean;
  es_propia?: boolean;
}
