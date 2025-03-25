import { Component } from '@angular/core';
import { Cancion } from '../cancion/cancion';
import { CancionService } from '../cancion.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cancioneslistf',
  imports: [MatTableModule, RouterLink, MatIconModule, CommonModule],
  templateUrl: './cancioneslistf.component.html',
  styleUrl: './cancioneslistf.component.css',
})
export class CancioneslistfComponent {
  /**
   *
   */
  public cancionesList: Cancion[] = [];
  displayedColumns: string[] = ['titulo', 'genero', 'artista', 'rating'];
  constructor(private canciones: CancionService, private rute: ActivatedRoute) {
    let title = '';
    rute.params.subscribe((params) => {
      title = params['title'];
    });
    canciones.getCancionesByTitle(title).subscribe((data) => {
      this.cancionesList = data.canciones;
      console.log(this.cancionesList);
      console.log(data.canciones);
    });
  }
}
