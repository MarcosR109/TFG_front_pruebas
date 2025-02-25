import { Component } from '@angular/core';
import { acordesPorTonalidad } from '../utils';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, copyArrayItem } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-chord-slider',
  imports: [
    MatTableModule,
    DragDropModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatSelect,
    FormsModule,
    MatGridListModule,
  ],
  templateUrl: './chord-slider.component.html',
  styleUrls: ['./chord-slider.component.css'],
})
export class ChordSliderComponent {
  tonalidades = Object.keys(acordesPorTonalidad); // Lista de tonalidades
  selectedTonalidad: string = this.tonalidades[0]; // Tonalidad seleccionada por defecto
  acordes: string[] = []; // Acordes de la tonalidad seleccionada
  acordesSeleccionados: string[] = []; // Acordes que el usuario arrastra

  constructor() {
    this.actualizarAcordes();
  }

  // Actualiza la lista de acordes cuando cambia la tonalidad
  actualizarAcordes(): void {
    this.acordes = Object.values(acordesPorTonalidad[this.selectedTonalidad]);
  }

  // Maneja el evento de arrastre y copia el acorde al área de selección
  drop(event: CdkDragDrop<string[]>): void {
    copyArrayItem(
      event.previousContainer.data,
      this.acordesSeleccionados,
      event.previousIndex,
      this.acordesSeleccionados.length
    );
  }
  selectTonalidad(tonalidad: string): void {
    this.selectedTonalidad = tonalidad;
    this.acordes = Object.values(acordesPorTonalidad[this.selectedTonalidad]);
  }
}
