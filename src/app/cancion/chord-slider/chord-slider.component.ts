import { Component } from '@angular/core';
import { acordesPorTonalidad } from '../utils';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import {
  CdkDrag,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  copyArrayItem,
  CdkDragStart,
} from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion'; // Importar aquí
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
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
    MatExpansionModule,
    DragDropModule,
    CdkDrag,
  ],
  templateUrl: './chord-slider.component.html',
  styleUrls: ['./chord-slider.component.css'],
  animations: [
    trigger('expandir', [
      state(
        'colapsado',
        style({
          maxWidth: '0px',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'expandido',
        style({
          maxWidth: '200px',
          opacity: 1,
        })
      ),
      transition('colapsado => expandido', [animate('300ms ease-in-out')]),
      transition('expandido => colapsado', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class ChordSliderComponent {
  tonalidades = Object.keys(acordesPorTonalidad);
  tonalidadExpandida: string | null = null;
  droppedAcordes: string[] = [];
  seleccionarTonalidad(tonalidad: string) {
    this.tonalidadExpandida =
      this.tonalidadExpandida === tonalidad ? null : tonalidad;
  }
  getAcordesDeTonalidad(tonalidad: string | null): string[] {
    return tonalidad ? Object.values(acordesPorTonalidad[tonalidad]) : [];
  }
}
