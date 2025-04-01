import { Component } from '@angular/core';
import { Cancion } from '../cancion/cancion';
import { CancionService } from '../cancion.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-revisiones',
  imports: [CommonModule, MatIconModule, MatCardModule, RouterLink, MatTableModule, FormsModule, MatFormFieldModule, MatProgressSpinnerModule],
  templateUrl: './revisiones.component.html',
  styleUrl: './revisiones.component.css'
})
export class RevisionesComponent {
  canciones: Cancion[] = [];
  displayedColumns: string[] = ['titulo', 'artista', 'genero', 'rating'];
  isLoading = true;
  errorMessage = '';
  constructor(private cancionService: CancionService) {

  }
  ngOnInit() {
    this.cargarCanciones();
  }
  cargarCanciones() {
    this.isLoading = true;
    this.errorMessage = '';

    this.cancionService.getCancionesArevisar().subscribe({
      next: (data: any) => {
        this.canciones = data.canciones || data; // Adaptación según la estructura de la respuesta
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching canciones:', error);
        this.errorMessage = 'Error al cargar las canciones';
        this.isLoading = false;
      }
    });
  }
}
