import { Component, input, HostListener, SimpleChanges } from '@angular/core';
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
  DndDragImageOffsetFunction,
  DndDragImageRefDirective,
  DndDropEvent,
  DndDropzoneDirective,
  DndHandleDirective,
  DndModule,
  EffectAllowed,
} from 'ngx-drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
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
    DndModule,
    DragDropModule,
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

  /**
   *
   */
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lines'] && (this.lines?.length ?? 0) > 0) {
      this.calcularMaxWidth();
    }
  }
  calcularMaxWidth() {
    const maxLength = Math.max(
      ...(this.lines?.map((linea) => linea.letra?.length || 0) || [])
    );
    this.maxWidth = `${maxLength * 10}px`; // Ajusta el factor según necesidad
    console.log(`Ancho máximo calculado: ${this.maxWidth}`);
  }
  public lastDropEvent: DndDropEvent | null = null;
  private currentDraggableEvent?: Event;
  private currentDragEffectMsg?: string;
  chord: Acorde = { acorde: 'C', variacion: '', grado: 1, effect: 'all' };
  variaciones = variaciones;
  menuArriba = false; // Estado del menú (false = abajo, true = arriba)
  maxWidth: string = '25rem'; // Ancho inicial mínimo
  tonalidades = Object.keys(acordesPorTonalidad);
  tonalidadExpandida: string | null = null;
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    // Si el usuario llega al final de la página, subimos el menú
    this.menuArriba = scrollTop + windowHeight >= fullHeight - 10;
  }
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
  seleccionarTonalidad(tonalidad: string) {
    this.tonalidadExpandida =
      this.tonalidadExpandida === tonalidad ? null : tonalidad;
  }
  getAcordesDeTonalidad(tonalidad: string | null): Acorde[] {
    if (!tonalidad || !acordesPorTonalidad[tonalidad]) return [];

    return Object.entries(acordesPorTonalidad[tonalidad]).map(
      ([grado, acorde]) => ({
        acorde: typeof acorde === 'string' ? acorde : acorde.acorde, // Si es string, lo convierte en objeto
        variacion: '',
        grado: acorde.grado,
        effect: 'copy',
      })
    );
  }
  trackByAcorde(index: number, item: Acorde) {
    return item.acorde; // O un identificador único
  }
  onDragStart(event: DragEvent, acorde: Acorde) {
    console.log(event, null, 2);
    console.log(acorde);
    this.lastDropEvent = null;
    this.currentDraggableEvent = event;
  }

  onDragged($event: DragEvent, effect: string) {
    console.log($event, null, 2);
    console.log(`Drag ended with effect "${effect}"!`);
  }

  onDragEnd(event: DragEvent) {
    this.currentDraggableEvent = event;
    console.log(`Drag ended!`, event, null);
  }
  onDrop(event: DndDropEvent, linea: Linea, squareIndex: number) {
    console.log('Acorde soltado:', event.data.acorde);
    console.log('Variación soltada:', event.data);
    console.log('Drop event:', event);
    console.log(linea);
    console.log(this.lines);
    if (event.data.acorde) {
      linea.acordes[squareIndex].acorde = event.data.acorde;
    } else if (linea.acordes[squareIndex].acorde) {
      linea.acordes[squareIndex].variacion = event.data;
    }
    console.log(linea);
  }
  onDraggableCopied(event: DragEvent, acorde: Acorde) {
    console.log('draggable copied', JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent, acorde: Acorde) {
    console.log('draggable linked', JSON.stringify(event, null, 2));
  }

  onDraggableMoved(event: DragEvent, acorde: Acorde) {
    console.log('draggable moved', JSON.stringify(event, null, 2));
  }

  onDragCanceled(event: DragEvent, acorde: Acorde) {
    console.log('drag cancelled', JSON.stringify(event, null, 2));
  }
  /*onDragover(event: DragEvent, acorde: Acorde) {
    console.log(acorde);
    console.log('dragover', JSON.stringify(event, null, 2));
  }*/
}
