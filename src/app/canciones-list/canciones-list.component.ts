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
  ],
  templateUrl: './canciones-list.component.html',
  styleUrl: './canciones-list.component.css',
})
export class CancionesListComponent {
  cancionesFiltradas: any[] = [];

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
}
