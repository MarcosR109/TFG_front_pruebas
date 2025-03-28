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
import { ConfirmComponent } from '../confirm/confirm.component';
import { Cancion } from '../cancion/cancion';
import { CancionService } from '../cancion.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AcordeshowComponent } from '../acordeshow/acordeshow.component';
import { AcordeTransformPipe } from '../acorde-transform.pipe';
import { AcordeTransformSettingsService } from '../acorde-transform-settings.service';
import { AcordeTransposePipe } from '../acorde-transpose.pipe';
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
    ConfirmComponent,
    AcordeshowComponent,
    AcordeTransformPipe,
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
  @Input() lines?: Linea[]; //Lineas que recibe de componente padre
  @Input() bin?: boolean = false; //Variable para especificar si es binario o ternario
  @Input() tonalidad?: any; //Tonalidad de la canción
  @Input() cancion?: Cancion; //Canción que recibe de componente padre
  public block: boolean = false; //Bloquea el formulario de edición y carga vista
  public lastDropEvent: DndDropEvent | null = null;
  private currentDraggableEvent?: Event;
  private currentDragEffectMsg?: string;
  variaciones = VARIACIONES; // Variaciones de acordes
  menuArriba = false; // Indica si el menú está arriba
  maxWidth: string = '25rem'; // Ancho máximo de las líneas, se recalcula en un método al cargar
  tonalidades = Object.keys(ACORDES_POR_TONALIDAD); // Tonalidades disponibles
  tonalidadExpandida: string | null = null; // Tonalidad seleccionada en el menú
  @HostListener('window:scroll', [])
  botonBloqueado = false;
  botonBorrarBloqueado = false;
  sliderOpen = false;
  velocidad: number = 1;
  scrollId: any = null;
  intervaloBase: number = 100; // Base del intervalo en milisegundos
  preferSostenidos: boolean = false; // Preferencia de sostenidos o bemoles
  notation: 'latin' | 'american' = 'american';
  semitones = 0; // Semitonos para transponer acordes
  constructor(
    private cdRef: ChangeDetectorRef,
    private cancionService: CancionService,
    public dialog: MatDialog,
    private router: Router,
    private pipeInstance: AcordeTransformPipe,
    private settingsService: AcordeTransformSettingsService,
    private pipeTransposeInstance: AcordeTransposePipe
  ) {
    this.settingsService.currentSettings.preferSostenidos;
  }

  ngAfterViewInit() {
    console.log(this.lines);
    console.log(this.tonalidad);
  }

  /*ngOnChanges(changes: SimpleChanges): void {
    if (changes['lines'] && (this.lines?.length ?? 0) > 0) {
      this.calcularMaxWidth();
    }
  }*/
  autoScrollContainer() {
    const container = document.querySelector('.scroll-container');
    if (container) {
      container.scrollBy({
        top: this.velocidad,
        behavior: 'smooth',
      });
    }
  }

  startAutoScroll() {
    console.log('Auto scroll iniciado');
    console.log(this.velocidad);

    if (this.scrollId) {
      clearInterval(this.scrollId);
    }
    this.scrollId = setInterval(
      () => this.autoScrollContainer(),
      this.intervaloBase / this.velocidad
    );
  }

  resetAutoScroll() {
    this.velocidad = 1;
    clearInterval(this.scrollId);
    this.scrollId = null;
  }

  addVelocidad() {
    this.velocidad = Math.min(this.velocidad + 0.5, 10);
    this.startAutoScroll();
  }

  substractVelocidad() {
    if (this.scrollId) {
      this.velocidad = Math.max(this.velocidad - 0.5, 0.5);
      this.startAutoScroll();
    }
    if (this.velocidad == 0.5) {
      this.resetAutoScroll();
    }
  }
  toggleSlider() {
    this.sliderOpen = !this.sliderOpen; // Cambia el estado del slider
  }
  calcularMaxWidth() {
    const maxLength = Math.max(
      ...(this.lines?.map((linea) => linea.texto?.length || 0) || [])
    );
    this.maxWidth = `${maxLength * 10}px`; // Ajusta el factor según necesidad
    console.log(`Ancho máximo calculado: ${this.maxWidth}`);
  }

  togglePreferirSostenidos(): void {
    console.log('Preferir sostenidos', this.preferSostenidos);
    const current = this.settingsService.currentSettings.preferSostenidos;
    this.settingsService.setPreferSostenidos(!current);
    this.preferSostenidos = !this.preferSostenidos;
  }
  modSemitono(semitones: number) {
    if (this.semitones == 12 || this.semitones == -12) this.semitones = 0;
    this.semitones += semitones;
  }
  toggleNotation(): void {
    console.log('NOTACIÓN EN TEXTBOXES', this.notation);
    if (this.notation === 'latin') {
      this.notation = 'american';
    } else {
      this.notation = 'latin';
    }
    this.settingsService.setNotation(this.notation);
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
    let acordesT = [
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
    ];
    if (this.bin) {
      const nuevaLinea = {
        n_linea: index + 1,
        texto: '',
        acordes: acordesV,
      };
      this.lines?.splice(index + 1, 0, nuevaLinea);
      this.lines?.forEach((element, index) => {
        element.n_linea = index; // Actualiza el número de línea con el índice
      });
    } else {
      const nuevaLinea = {
        n_linea: index + 1,
        texto: '',
        acordes: acordesT,
      };
      this.lines?.splice(index + 1, 0, nuevaLinea);
      this.lines?.forEach((element, index) => {
        element.n_linea = index; // Actualiza el número de línea con el índice
      });
    }
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
      linea.acordes[squareIndex].grado = event.data.grado;
      linea.acordes[squareIndex].effect = event.data.effect;
      linea.acordes[squareIndex].id = event.data.id;
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
  async enviarCancion() {
    const result = await this.openDialog();
    console.log(this.cancion);
    // Espera la respuesta del diálogo
    if (result) {
      this.cancionService.enviarCancion(this.cancion!);
      //this.router.navigate(['/canciones']);
    }
  }
  openDialog(): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { title: '¿Enviar canción?', message: '¿Estás seguro?' },
    });
    return dialogRef.afterClosed().toPromise(); // Retorna una promesa con el valor de `result`
  }

  transposeAll(semitones: number): void {
    // Aquí necesitarías implementar la lógica para transponer todos los acordes
    // Esto podría hacerse con un servicio compartido o un Observable
    console.log(`Transponer todos los acordes ${semitones} semitonos`);
  }
}
