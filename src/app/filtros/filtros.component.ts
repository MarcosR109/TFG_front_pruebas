import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { CancionService } from '../cancion.service';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup } from '@angular/forms';
import { Artistas, artistas } from '../artistas';
import { generos } from '../generos';
import { debounceTime, distinctUntilChanged, startWith, map } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    MatSelect,
    MatOption,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
  ],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css',
})
export class FiltrosComponent implements OnInit {
  filtrosForm: FormGroup;
  artistas = artistas.artistas;
  generos = generos.generos;
  artistasFiltrados: any[] = [];
  generosFiltrados: any[] = [];
  esLista: boolean = false;

  constructor(private fb: FormBuilder, private cancionService: CancionService) {
    this.filtrosForm = this.fb.group({
      titulo: [''],
      artista: [''],
      genero: [''],
      calificacion: [null],
    });
  }

  ngOnInit(): void {
    this.setupAutocomplete();
    this.setupReactiveFilters();
  }

  private setupAutocomplete(): void {
    // Autocompletado para artistas
    this.filtrosForm.get('artista')?.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      map(value => this.filterArtistas(value))
    ).subscribe(filtered => this.artistasFiltrados = filtered);

    // Autocompletado para géneros
    this.filtrosForm.get('genero')?.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      map(value => this.filterGeneros(value))
    ).subscribe(filtered => this.generosFiltrados = filtered);
  }

  private setupReactiveFilters(): void {
    // Escuchar cambios en todos los campos del formulario
    this.filtrosForm.valueChanges.pipe(
      debounceTime(400), // Pequeño retraso para evitar múltiples llamadas
      distinctUntilChanged((prev, curr) => 
        JSON.stringify(prev) === JSON.stringify(curr))
    ).subscribe(() => {
      this.aplicarFiltros();
    });
  }

  private filterArtistas(value: string | any): any[] {
    // Manejar cuando value es el objeto completo (selección)
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
    return this.artistas.filter(artista => 
      artista.nombre.toLowerCase().includes(filterValue)
    );
  }

  private filterGeneros(value: string | any): any[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
    return this.generos.filter(genero => 
      genero.nombre.toLowerCase().includes(filterValue)
    );
  }

  seleccionarArtista(artista: any): void {
    this.filtrosForm.get('artista')?.setValue(artista.nombre, { emitEvent: true });
  }

  seleccionarGenero(genero: any): void {
    this.filtrosForm.get('genero')?.setValue(genero.nombre, { emitEvent: true });
  }

  aplicarFiltros(): void {
    this.cancionService.actualizarFiltros(this.filtrosForm.value);
  }
}