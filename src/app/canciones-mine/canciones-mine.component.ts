import { Component } from '@angular/core';
import { CancionService } from '../cancion.service';
import { Cancion } from '../cancion/cancion';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-canciones-mine',
  imports: [CommonModule, MatIconModule, MatTableModule, RouterLink],
  templateUrl: './canciones-mine.component.html',
  styleUrl: './canciones-mine.component.css',
})
export class CancionesMineComponent {
  cancionesList: CancionFoo[] = [];
  displayedColumns: string[] = ['titulo', 'genero', 'artista', 'rating'];

  constructor(private canciones: CancionService) {
    this.canciones.getMine().subscribe((data) => {
      this.cancionesList = data.canciones;
      console.log(data.canciones);

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
