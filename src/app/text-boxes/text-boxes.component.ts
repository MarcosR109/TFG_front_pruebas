import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TextinputComponent } from '../textinput/textinput.component';
import { Linea } from '../cancion/linea';
import { Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { acordesPorTonalidad, variaciones } from '../cancion/utils';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  DndDraggableDirective,
  DndDragImageOffsetFunction,
  DndDragImageRefDirective,
  DndDropEvent,
  DndDropzoneDirective,
  DndHandleDirective,
  DndModule,
  EffectAllowed,
} from 'ngx-drag-drop';
import { Acorde } from '../cancion/acorde';
@Component({
  selector: 'app-text-boxes',
  standalone: true,
  templateUrl: './text-boxes.component.html',
  styleUrls: ['./text-boxes.component.css'],
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    DndDraggableDirective,
    DndModule,
    MatCardModule,
    DndDraggableDirective,
    MatIconModule,
  ],
  animations: [
    trigger('expandir', [
      state(
        'colapsado',
        style({
          maxWidth: '0px',
          opacity: 0,
          //overflow: 'hidden',
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
export class TextBoxesComponent {
  @Input() lines?: Linea[] = [];
  maxWidth: string = '10rem'; // Ancho inicial mínimo
  /**
   *
   */
  constructor(private dnd: DndDraggableDirective) {}
  public lastDropEvent: DndDropEvent | null = null;

  private currentDraggableEvent?: Event;
  private currentDragEffectMsg?: string;
  // Función para eliminar un acorde
  eliminarAcorde(nLinea: number, squareIndex: number) {
    const linea = this.lines?.find((line) => line.nLinea === nLinea);
    if (linea) {
      const acorde = linea.acordes[squareIndex];
      console.log(acorde);
      acorde.acorde = ''; // Limpiamos el acorde
      acorde.variacion = ''; // Limpiamos la variación
    }
  }
  tonalidades = Object.keys(acordesPorTonalidad);
  tonalidadExpandida: string | null = null;
  seleccionarTonalidad(tonalidad: string) {
    this.tonalidadExpandida =
      this.tonalidadExpandida === tonalidad ? null : tonalidad;
  }

  getAcordesDeTonalidad(tonalidad: string | null): string[] {
    return tonalidad ? Object.values(acordesPorTonalidad[tonalidad]) : [];
  }

  onDragStart(event: DragEvent) {
    console.log(event);
    this.lastDropEvent = null;
    this.currentDragEffectMsg = '';
    this.currentDraggableEvent = event;
  }

  onDragged($event: DragEvent, effect: string) {
    console.log(event);
    this.currentDragEffectMsg = `Drag ended with effect "${effect}"!`;
  }

  onDragEnd(event: DragEvent) {
    console.log(event);
    this.currentDraggableEvent = event;
    console.log(`Drag ended!`, undefined, { duration: 2000 });
  }

  onDrop(event: DndDropEvent) {
    console.log(event);
    this.lastDropEvent = event;
  }
}
