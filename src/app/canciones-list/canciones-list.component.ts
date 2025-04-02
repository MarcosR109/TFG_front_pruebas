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
@Component({
  selector: 'app-canciones-list',
  imports: [
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
  ],
  templateUrl: './canciones-list.component.html',
  styleUrl: './canciones-list.component.css',
})
export class CancionesListComponent {
  cancionesFiltradas: any[] = [];

  debug: any[] = [];
  cancionesInit!: Cancion[];
  constructor(private cancionService: CancionService) {}

  ngOnInit() {
    this.cancionService.getCanciones().subscribe((res) => {
      this.cancionesInit = res.canciones;
      this.cancionService.setCanciones(this.cancionesInit);
      this.cancionesFiltradas = [...this.cancionesInit];
    });

    this.cancionService.cancionesFiltradas$.subscribe((filtros) => {
      if (this.cancionesInit) {
        this.cancionesFiltradas = this.cancionService.filtrar(
          [...this.cancionesInit],
          filtros
        );
      }
    });
  }
  sortData(sort: Sort) {
    const data = this.cancionesFiltradas.slice();
    if (!sort.active || sort.direction === '') {
      this.debug = data;
      console.log(this.debug);
      return;
    }
    this.debug = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'titulo':
          return compare(a.titulo, b.titulo, isAsc);
        case 'artista':
          return compare(a.artista, b.artista, isAsc);
        case 'genero':
          return compare(a.genero, b.genero, isAsc);
        default:
          return 0;
      }
    });
    this.cancionesFiltradas = this.debug;
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
