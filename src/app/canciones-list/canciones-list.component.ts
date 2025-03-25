import { Component } from '@angular/core';
import { CancionService } from '../cancion.service';
import { Cancion } from '../cancion/cancion';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-canciones-list',
  imports: [MatTableModule, RouterLink, MatIconModule, CommonModule],
  templateUrl: './canciones-list.component.html',
  styleUrl: './canciones-list.component.css',
})
export class CancionesListComponent {
  cancionesList: CancionFoo[] = [];
  displayedColumns: string[] = ['titulo', 'genero', 'artista'];

  constructor(private canciones: CancionService) {
    this.canciones.getCanciones().subscribe((data) => {
      this.cancionesList = data.canciones;
      console.log(this.cancionesList);
    });
  }
}

interface CancionFoo {
  id: number;
  titulo: string;
  genero: string;
  artista: string;
  rating: number;
}
