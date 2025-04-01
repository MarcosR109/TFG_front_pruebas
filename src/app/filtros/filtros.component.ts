import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { CancionService } from '../cancion.service';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup } from '@angular/forms';
import { Artistas, artistas } from '../artistas';
import { generos } from '../generos';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@Component({
  selector: 'app-filtros',
  imports: [
    MatFormFieldModule,
    CommonModule,
    MatSelect,
    MatOption,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
  ],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css',
})
export class FiltrosComponent {
  filtrosForm: FormGroup;
  artistas = artistas.artistas; // Accede al array dentro del objeto
  generos = generos.generos; // Accede al array dentro del objeto
  artistasFiltrados: any[] = [];
  generosFiltrados: any[] = [];
  artistaSeleccionado: any = null;
  generoSeleccionado: any = null;
  inputTextoArtista: string = '';
  inputTextoGenero: string = '';

  constructor(private fb: FormBuilder, private cancionService: CancionService) {
    this.filtrosForm = this.fb.group({
      titulo: [''],
      artista: [null],
      genero: [null],
      calificacion: [null],
    });
    this.artistas = artistas.artistas;
    this.generos = generos.generos;
  }
  // Método para filtrar artistas
  filtrarArtistas(event: any) {
    const filtro = event.target.value.toLowerCase();
    this.inputTextoArtista = event.target.value;
    this.artistaSeleccionado = null;

    this.artistasFiltrados = filtro
      ? this.artistas.filter((artista: { nombre: string }) =>
          artista.nombre.toLowerCase().includes(filtro)
        )
      : [...this.artistas];
  }

  // Método para seleccionar artista
  seleccionarArtista(artista: any) {
    this.artistaSeleccionado = artista;
    this.inputTextoArtista = artista.nombre;
    console.log(this.inputTextoArtista);
    this.filtrosForm.patchValue({
      artista: artista.nombre,
    });
  }

  // Método para filtrar géneros
  filtrarGeneros(event: any) {
    const filtro = event.target.value.toLowerCase();
    this.inputTextoGenero = event.target.value;
    this.generoSeleccionado = null;
    this.generosFiltrados = filtro
      ? this.generos.filter((genero: { nombre: string }) =>
          genero.nombre.toLowerCase().includes(filtro)
        )
      : [...this.generos];
  }

  // Método para seleccionar género
  seleccionarGenero(genero: any) {
    this.generoSeleccionado = genero;
    this.inputTextoGenero = genero.nombre;
    console.log(this.inputTextoGenero);
    this.filtrosForm.patchValue({
      genero: genero.nombre,
    });
  }
  aplicarFiltros() {
    // if (this.filtrosForm) {
    //   this.filtrosForm
    //     .get('titulo')
    //     ?.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
    //     .subscribe(() => this.aplicarFiltros());
    // }
    console.log(this.filtrosForm.value);
    this.filtrosForm.patchValue({
      artista: this.artistaSeleccionado?.nombre,
      genero: this.generoSeleccionado?.nombre,
      titulo: this.filtrosForm.get('titulo')?.value,
      calificacion: this.filtrosForm.get('calificacion')?.value,
    });
    this.cancionService.actualizarFiltros(this.filtrosForm.value);
  }
}
