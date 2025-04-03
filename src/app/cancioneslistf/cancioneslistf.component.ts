import { Component } from '@angular/core';
import { Cancion } from '../cancion/cancion';
import { CancionService } from '../cancion.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FiltrosComponent } from '../filtros/filtros.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
@Component({
  selector: 'app-cancioneslistf',
  imports: [
    MatTableModule,
    RouterLink,
    MatIconModule,
    CommonModule,
    MatProgressSpinnerModule,
    FiltrosComponent,
    MatTableModule,
    RouterLink,
    MatIconModule,
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    FormsModule,
    MatInput,
    MatSort,
    MatSortModule,
  ],
  templateUrl: './cancioneslistf.component.html',
  styleUrl: './cancioneslistf.component.css',
})
export class CancioneslistfComponent {
  query = '';
  cancionesList: Cancion[] = [];
  filteredCanciones: Cancion[] = [];
  displayedColumns: string[] = ['titulo', 'artista', 'genero', 'rating'];
  isLoading = false;
  errorMessage = '';
  searchType: 'titulo' | 'artista' | 'ambos' = 'ambos';
  esArtista = true;
  debug: any;
  // Filtros
  filtros = {
    genero: '',
    ratingMin: 0.0,
    titulo: '',
  };

  constructor(
    private canciones: CancionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.query = params['query'];
      if (this.query) {
        this.buscarCanciones();
      }
    });
  }

  aplicarFiltros() {
    this.filteredCanciones = this.cancionesList.filter((cancion) => {
      const matchesGenero =
        !this.filtros.genero ||
        (cancion?.genero ?? '')
          .toLowerCase()
          .includes(this.filtros.genero.toLowerCase());
      const matchesRating = (cancion.rating ?? 0) >= this.filtros.ratingMin;
      const matchesTitle =
        !this.filtros.titulo ||
        (cancion?.titulo ?? '')
          .toLowerCase()
          .includes(this.filtros.titulo.toLowerCase());

      return matchesGenero && matchesRating && matchesTitle;
    });
  }

  buscarCanciones() {
    this.isLoading = true;
    this.errorMessage = '';
    this.cancionesList = [];

    this.canciones
      .getCancionesByTitle(this.query)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (data) => {
          if (data.canciones.length > 0) {
            this.searchType = 'titulo';
            this.cancionesList = data.canciones;
            this.filteredCanciones = [...this.cancionesList];
            console.log(this.cancionesList);
          } else {
            this.esArtista = false;
            this.buscarPorArtista();
          }
        },
        error: (err) => {
          this.errorMessage = 'Error al buscar por título';
          console.error('Error al buscar por título:', err);
        },
      });
  }

  buscarPorArtista() {
    this.isLoading = true;
    this.canciones
      .buscarPorArtista(this.query)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (data) => {
          this.searchType = 'artista';
          this.cancionesList = data.canciones;
          this.filteredCanciones = [...this.cancionesList];
          if (data.canciones.length === 0) {
            this.errorMessage = 'No se encontraron resultados';
          }
        },
        error: (err) => {
          this.errorMessage = 'Error al buscar por artista';
          console.error('Error al buscar por artista:', err);
        },
      });
  }
  sortData(sort: Sort) {
    const data = this.cancionesList.slice();
    if (!sort.active || sort.direction === '') {
      this.debug = data;
      console.log("SORTNOACTIVE O DIRECTION '' ", this.debug);
      return;
    }
    this.debug = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'titulo':
          return compare(a.titulo ?? '', b.titulo ?? '', isAsc);
        case 'artista':
          return compare(a.artista ?? '', b.artista ?? '', isAsc);
        case 'genero':
          return compare(a.genero ?? '', b.genero ?? '', isAsc);
        case 'rating':
          return compare(a.rating ?? 0, b.rating ?? 0, isAsc);
        default:
          return 0;
      }
    });
    this.filteredCanciones = this.debug;
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
