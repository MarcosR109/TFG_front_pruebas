import { Component } from '@angular/core';
import { CancionService } from '../cancion.service';
import { Cancion } from '../cancion/cancion';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-canciones-list',
  imports: [MatTableModule],
  templateUrl: './canciones-list.component.html',
  styleUrl: './canciones-list.component.css',
})
export class CancionesListComponent {
  cancionesList: Cancion[] = [];
  displayedColumns: string[] = ['titulo', 'genero', 'artista', 'rating'];

  constructor(private canciones: CancionService) {
    this.canciones.getCanciones().subscribe((data) => {
      this.cancionesList = data;
    });
  }
}
