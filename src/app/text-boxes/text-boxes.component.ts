import {
  Component,
  input,
  HostListener,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
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
import { ACORDES_POR_TONALIDAD, VARIACIONES } from '../cancion/utils';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DndDropEvent, DndModule } from 'ngx-drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Acorde } from '../cancion/acorde';
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';
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
  @Input() lines?: Linea[];
  @Input() bin?: boolean = true;
  @Input() tonalidad?: any;
  public lastDropEvent: DndDropEvent | null = null;
  private currentDraggableEvent?: Event;
  private currentDragEffectMsg?: string;
  variaciones = VARIACIONES;
  menuArriba = false;
  maxWidth: string = '25rem';
  tonalidades = Object.keys(ACORDES_POR_TONALIDAD);
  tonalidadExpandida: string | null = null;
  @HostListener('window:scroll', [])
  botonBloqueado = false;
  botonBorrarBloqueado = false;
  preferirSp = false;
  preferirSostenidos = true;
  /**
   *
   */
  constructor(private cdRef: ChangeDetectorRef) {}
  ngAfterViewInit() {
    console.log(this.lines);
  }
  getAcorde(acordeid: number) {
    /*const acorde = ACORDES_POR_TONALIDAD[this.tonalidad].find(
      (acorde) => acorde.id === acordeid
    );*/
    for (const [tonalidad, acordes] of Object.entries(ACORDES_POR_TONALIDAD)) {
      const acordeEncontrado = acordes.find((acorde) => acorde.id === acordeid);
      if (acordeEncontrado) {
        return acordeEncontrado.acorde;
      }
    }
    return '';
  }
  /*ngOnChanges(changes: SimpleChanges): void {
    if (changes['lines'] && (this.lines?.length ?? 0) > 0) {
      this.calcularMaxWidth();
    }
  }*/

  calcularMaxWidth() {
    const maxLength = Math.max(
      ...(this.lines?.map((linea) => linea.texto?.length || 0) || [])
    );
    this.maxWidth = `${maxLength * 10}px`; // Ajusta el factor según necesidad
    console.log(`Ancho máximo calculado: ${this.maxWidth}`);
  }
  transformToEnarmonic(acorde: string): string {
    const enarmonicMap: { [key: string]: string } = {
      'C#': 'Db',
      'D#': 'Eb',
      'F#': 'Gb',
      'G#': 'Ab',
      'A#': 'Bb',
      Eb: 'D#',
      Db: 'C#',
      Gb: 'F#',
      Ab: 'G#',
      Bb: 'A#',
      'C#m': 'Dbm',
      'D#m': 'Ebm',
      'F#m': 'Gbm',
      'G#m': 'Abm',
      'A#m': 'Bbm',
      Ebm: 'D#m',
      Dbm: 'C#m',
      Gbm: 'F#m',
      Abm: 'G#m',
      Bbm: 'A#m',
    };
    return this.preferirSostenidos ? enarmonicMap[acorde] || acorde : acorde;
  }
  transformToSpanish(acorde: string): string {
    const spanishMap: { [key: string]: string } = {
      C: 'Do',
      D: 'Re',
      E: 'Mi',
      F: 'Fa',
      G: 'Sol',
      A: 'La',
      B: 'Si',
      Db: 'Reb',
      Eb: 'Mib',
      Gb: 'Solb',
      Ab: 'Lab',
      Bb: 'Sib',
      Cm: 'Dom',
      Dm: 'Rem',
      Em: 'Mim',
      Fm: 'Fam',
      Gm: 'Solm',
      Am: 'Lam',
      Bm: 'Sim',
      Dbm: 'Rebm',
      Ebm: 'Mibm',
      Gbm: 'Solbm',
      Abm: 'Labm',
      Bbm: 'Sibm',
      'D#': 'Re#',
      'G#': 'Sol#',
      'A#': 'La#',
      'F#': 'Fa#',
      'C#': 'Do#',
      'D#m': 'Re#m',
      'F#m': 'Fa#m',
      'G#m': 'Sol#m',
      'A#m': 'La#m',
      'C#m': 'Do#m',
    };
    return this.preferirSp ? spanishMap[acorde] || acorde : acorde;
  }
  togglePreferirSp() {
    console.log(this.preferirSp);
    this.preferirSp = !this.preferirSp;
    this.cdRef.detectChanges();
  }
  togglePreferirSostenidos() {
    console.log(this.preferirSostenidos);
    this.preferirSostenidos = !this.preferirSostenidos;
    this.cdRef.detectChanges();
  }
  agregarLineaDebajo(index: number): void {
    if (this.botonBloqueado) return; // Evita doble interacción
    this.botonBloqueado = true;
    setTimeout(() => (this.botonBloqueado = false), 500); // Desbloquea después de 500ms
    let acordesV = [
      {
        posicion_en_compas: 0,
        acorde: '',
        variacion: '',
        grado: 0,
        effect: 'copy',
        id: 169,
      },
      {
        posicion_en_compas: 1,
        acorde: '',
        variacion: '',
        grado: 0,
        effect: 'copy',
        id: 169,
      },
      {
        posicion_en_compas: 2,
        acorde: '',
        variacion: '',
        grado: 0,
        effect: 'copy',
        id: 169,
      },
      {
        posicion_en_compas: 3,
        acorde: '',
        variacion: '',
        grado: 0,
        effect: 'copy',
        id: 169,
      },
    ];
    const nuevaLinea = {
      n_linea: index + 1,
      texto: '',
      acordes: acordesV,
    };
    this.lines?.splice(index + 1, 0, nuevaLinea);
    this.lines?.forEach((element, index) => {
      element.n_linea = index; // Actualiza el número de línea con el índice
    });
  }

  eliminarLinea(index: number) {
    if (this.botonBorrarBloqueado) return; // Evita doble interacción
    this.botonBorrarBloqueado = true;

    setTimeout(() => (this.botonBorrarBloqueado = false), 100);

    // Eliminar la línea en la posición correcta
    this.lines?.splice(index, 1);

    // Reasignar los índices de las líneas restantes
    this.lines?.forEach((linea, idx) => {
      linea.n_linea = idx;
    });

    console.log(this.lines);
  }

  onScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    // Si el usuario llega al final de la página, subimos el menú
    this.menuArriba = scrollTop + windowHeight >= fullHeight - 10;
  }
  // Función para eliminar un acorde
  eliminarAcorde(n_linea: number, squareIndex: number) {
    const linea = this.lines?.find((line) => line.n_linea === n_linea);
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
    if (!tonalidad || !ACORDES_POR_TONALIDAD[tonalidad]) return [];
    return Object.entries(ACORDES_POR_TONALIDAD[tonalidad]).map(
      ([grado, acorde]) => ({
        acorde: typeof acorde === 'string' ? acorde : acorde.acorde, // Si es string, lo convierte en objeto
        variacion: '',
        grado: acorde.grado,
        effect: 'copy',
        id: acorde.id,
      })
    );
  }
  trackByAcorde(index: number, item: Acorde) {
    return item.acorde; // O un identificador único
  }
  onDragStart(event: DragEvent, acorde: Acorde) {
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
