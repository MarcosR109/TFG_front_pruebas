import {
  Component,
  input,
  HostListener,
  SimpleChanges,
  ChangeDetectorRef,
  Renderer2,
  NgZone,
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
import { ConfirmComponent } from '../confirm/confirm.component';
import { Cancion } from '../cancion/cancion';
import { CancionService } from '../cancion.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AcordeshowComponent } from '../acordeshow/acordeshow.component';
import { AcordeTransformPipe } from '../acorde-transform.pipe';
import { AcordeTransformSettingsService } from '../acorde-transform-settings.service';
import { AcordeTransposePipe } from '../acorde-transpose.pipe';
import { RecomendacionesService } from '../recomendaciones.service';
import { find } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    MatProgressSpinnerModule,
    MatTooltipModule,
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
  @Input() block: boolean = false; //Bloquea el formulario de edición y carga vista
  @Input() revision: boolean = false; //Bloquea el formulario de edición y carga vista
  @Input() edicion: boolean = false;
  public lastDropEvent: DndDropEvent | null = null;
  private currentDraggableEvent?: Event;
  private currentDragEffectMsg?: string;
  variaciones = VARIACIONES; // Variaciones de acordes
  menuArriba = false; // Indica si el menú está arriba
  maxWidth: string = '25rem'; // Ancho máximo de las líneas, se recalcula en un método al cargar
  tonalidades = Object.keys(ACORDES_POR_TONALIDAD); // Tonalidades disponibles
  tonalidadExpandida: string | null = null; // Tonalidad seleccionada en el menú
  botonBloqueado = false;
  botonBorrarBloqueado = false;
  sliderOpen = false;
  velocidad: number = 1;
  scrollId: any = null;
  intervaloBase: number = 100; // Base del intervalo en milisegundos
  preferSostenidos: boolean = false; // Preferencia de sostenidos o bemoles
  notation: 'latin' | 'american' = 'american';
  semitones = 0;
  // Variables de estado
  mostrarRecomendaciones: boolean = true;
  recomendacion: any[] = [];
  acordesRecomendados: any[] = [];
  private externalContainer!: HTMLElement;
  loading: boolean = false; // Estado de carga
  // Método para alternar visibilidad
  acordesCopy!: any;
  container!: any;
  toggleRecomendaciones() {
    this.mostrarRecomendaciones = !this.mostrarRecomendaciones;
  }
  constructor(
    private cdRef: ChangeDetectorRef,
    private cancionService: CancionService,
    public dialog: MatDialog,
    private router: Router,
    private settingsService: AcordeTransformSettingsService,
    private recomendaciones: RecomendacionesService,
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.settingsService.currentSettings.preferSostenidos;
  }
  // Método para actualizar recomendaciones (llamar cuando cambien los acordes)

  ngAfterViewInit() {
    if (this.externalContainer) {
      this.externalContainer.addEventListener(
        'scroll',
        this.handleScroll.bind(this),
        { passive: true }
      );
      this.handleScroll(); // Llamada inicial
    }
  }
  ngOnInit() {
    console.log('CANCION EN TEXTBOXES', this.cancion);
    console.log('LINEAS EN TEXTBOXES', this.lines);

    if (this.edicion) {
      this.revision = false;
    }
    this.externalContainer = this.renderer.selectRootElement(
      '.scrollable',
      true
    ) as HTMLElement;

    if (!this.externalContainer) {
      console.error('No se encontró el contenedor externo');
      return;
    }
  }
  ngOnDestroy() {
    console.log('Destruyendo componente...');
    if (this.externalContainer) {
      this.externalContainer.removeEventListener(
        'scroll',
        this.handleScroll.bind(this)
      );
    }
    this.velocidad = 0;
  }
  autoScrollContainer() {
    this.container = this.renderer.selectRootElement('.scrollable', true);
    if (this.container) {
      this.container.scrollBy({
        top: this.velocidad,
        behavior: 'smooth',
      });
    }
  }

  startAutoScroll() {
    ('Auto scroll iniciado');
    this.velocidad;

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
    `Ancho máximo calculado: ${this.maxWidth}`;
  }

  togglePreferirSostenidos(): void {
    const current = this.settingsService.currentSettings.preferSostenidos;
    this.settingsService.setPreferSostenidos(!current);
    this.preferSostenidos = !this.preferSostenidos;
  }
  modSemitono(semitones: number) {
    if (this.semitones == 12 || this.semitones == -12) this.semitones = 0;
    this.semitones += semitones;
  }
  toggleNotation(): void {
    if (this.notation === 'latin') {
      this.notation = 'american';
    } else {
      this.notation = 'latin';
    }
    this.settingsService.setNotation(this.notation);
  }

  agregarLineaDebajo(index: number): void {
    if (this.botonBloqueado) return;
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

    this.lines;
  }
  copiarLinea(index: number) {
    this.acordesCopy = this.cancion?.lineas?.[index].acordes;
    this.acordesCopy; // Obtener la línea a copiar
  }
  pegarLinea(index: number) {
    if (this.acordesCopy) {
      if (this.cancion && this.cancion.lineas && this.cancion.lineas[index]) {
        const nuevosAcordes = JSON.parse(JSON.stringify(this.acordesCopy)); // Copia profunda
        nuevosAcordes;

        this.cancion.lineas[index].acordes = nuevosAcordes;
      }
    }
  }
  handleScroll() {
    if (!this.externalContainer || (this.lines?.length ?? 0) < 5) return;
    const scrollTop = this.externalContainer.scrollTop;
    const scrollHeight = this.externalContainer.scrollHeight;
    const clientHeight = this.externalContainer.clientHeight;
    const threshold = 100; // 100px antes del final
    this.menuArriba = scrollTop + clientHeight >= scrollHeight - threshold;

    this.changeDetector.detectChanges();
  }

  // Función para eliminar un acorde
  eliminarAcorde(n_linea: number, squareIndex: number) {
    const linea = this.lines?.find((line) => line.n_linea === n_linea);
    if (linea) {
      const acorde = linea.acordes[squareIndex];
      acorde;
      acorde.acorde = 'aux'; // Limpiamos el acorde
      acorde.variacion = ''; // Limpiamos la variación
      acorde.id = 169; // Limpiamos el id
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
    acorde;
    this.lastDropEvent = null;
    this.currentDraggableEvent = event;
  }

  onDragged($event: DragEvent, effect: string) {
    `Drag ended with effect "${effect}"!`;
  }

  onDragEnd(event: DragEvent) {
    this.currentDraggableEvent = event;
  }
  onDrop(event: DndDropEvent, linea: Linea, squareIndex: number) {
    linea;
    this.lines;
    if (event.data.acorde) {
      this.acordesRecomendados = [];
      linea.acordes[squareIndex].acorde = event.data.acorde;
      linea.acordes[squareIndex].grado = event.data.grado;
      linea.acordes[squareIndex].effect = event.data.effect;
      linea.acordes[squareIndex].id = event.data.id;

      this.recomendaciones.anadirAcorde(
        event.data.id,
        event.data.acorde,
        event.data.variacion,
        squareIndex,
        event.data.grado,
        linea.n_linea
      );
      this.actualizarRecomendaciones();
    } else if (linea.acordes[squareIndex].acorde) {
      linea.acordes[squareIndex].variacion = event.data;
    }
    linea;
  }

  findAcordeRecomendado(grado: number, probabilidad: number) {
    if (this.tonalidadExpandida) {
      const acordeEncontrado = this.getAcordesDeTonalidad(
        this.tonalidadExpandida
      ).find((acorde) => {
        if (acorde.grado == grado) {
          acorde.probabilidad = probabilidad;
          this.acordesRecomendados.push(acorde);
        }
      });
    }
  }

  actualizarRecomendaciones() {
    this.loading = true;
    this.recomendaciones.getRecomendaciones().subscribe((res) => {
      this.recomendacion = res.recomendaciones;
      this.loading = false;
      const uniqueRecomendaciones = new Set();
      this.recomendacion.forEach((recomendacion) => {
        if (!uniqueRecomendaciones.has(recomendacion.siguiente)) {
          uniqueRecomendaciones.add(recomendacion.siguiente);
          this.findAcordeRecomendado(
            recomendacion.siguiente,
            recomendacion.probabilidad
          );
        }
      });
    });
  }
  /*onDragover(event: DragEvent, acorde: Acorde) {
    (acorde);
    ('dragover', JSON.stringify(event, null, 2));
  }*/
  async enviarCancion() {
    const result = await this.openDialog();
    this.cancion;
    if (result) {
      this.cancionService.enviarCancion(this.cancion!).subscribe((res: any) => {
        this.router.navigate(['/canciones/show/' + res.cancion.id]);
      });
    }
  }
  async showInfo() {
    const result = await this.showDialogInfo();
  }
  showDialogInfo(): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { title: 'Recomendaciones armónicas' },
    });
    return dialogRef.afterClosed().toPromise(); // Retorna una promesa con el valor de `result`
  }
  async editarCancion() {
    const result = await this.openDialog();
    // Espera la respuesta del diálogo
    if (result) {
      if (this.edicion) {
        this.cancionService.editarCancion(this.cancion!).subscribe();
        this.cancionService.actualizarBadge();
        this.router.navigate(['/canciones']);
      } else {
        this.cancionService.actualizarBadge();
        this.cancionService.revisarCancion(this.cancion!).subscribe();
        this.router.navigate(['/canciones']);
      }
    }
  }
  openDialog(): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { title: '¿Enviar canción?', message: '¿Estás seguro?' },
    });
    return dialogRef.afterClosed().toPromise(); // Retorna una promesa con el valor de `result`
  }
}
