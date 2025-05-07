import { Component, ViewChild } from '@angular/core';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
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
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
  templateUrl: './canciones-list.component.html',
  styleUrl: './canciones-list.component.css',
})
export class CancionesListComponent {
  cancionesFiltradas: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  debug: any[] = [];
  cancionesInit!: Cancion[];
  isLoading: boolean = true;
  pageSize = 10;
  pageIndex = 0;
  constructor(private cancionService: CancionService) {}

  ngOnInit() {
    this.cancionService.getCanciones().subscribe((res) => {
      this.cancionesInit = res.canciones;
      this.cancionService.setCanciones(this.cancionesInit);
      this.cancionesFiltradas = [...this.cancionesInit];
      this.isLoading = false;
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
  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.updatePaginated();
    });
    this.paginator._intl.itemsPerPageLabel = 'items por pagina';
  }
  updatePaginated() {
    this.paginator.length = this.cancionesFiltradas.length;
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.cancionesFiltradas = this.cancionesInit.slice(start, end);
    this.paginator._intl.getRangeLabel = function (
      page: number,
      pageSize: number,
      length: number
    ) {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
  }
  sortData(sort: Sort) {
    const data = this.cancionesFiltradas.slice();
    if (!sort.active || sort.direction === '') {
      this.debug = data;
      this.debug;
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
    this.updatePaginated();
    this.cancionesFiltradas = this.debug;
  }

  pageChanged(event: PageEvent) {
    this.cancionesFiltradas = this.cancionesInit.slice(
      event.pageIndex * event.pageSize,
      (event.pageIndex + 1) * event.pageSize
    );
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
