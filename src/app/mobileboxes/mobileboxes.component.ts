import {
  Component,
  input,
  HostListener,
  SimpleChanges,
  ChangeDetectorRef,
  Renderer2,
  NgZone,
  EventEmitter,
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
import { finalize, find, fromEvent, take } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-mobileboxes',
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
    MatChipsModule,
    MatTooltipModule,
  ],
  templateUrl: './mobileboxes.component.html',
  styleUrl: './mobileboxes.component.css',
})
export class MobileboxesComponent {
  panelAbierto: boolean = false;

  @Input() lines?: Linea[]; //Lineas que recibe de componente padre
  @Input() bin?: boolean = false; //Variable para especificar si es binario o ternario
  @Input() tonalidad?: any; //Tonalidad de la canción
  @Input() cancion?: Cancion; //Canción que recibe de componente padre
  @Input() block: boolean = false; //Bloquea el formulario de edición y carga vista
  @Input() revision: boolean = false; //Bloquea el formulario de edición y carga vista
  @Input() edicion: boolean = false;
  tonalidades = Object.keys(ACORDES_POR_TONALIDAD); // Tonalidades disponibles
  tonalidadExpandida: string | null = null; // Tonalidad seleccionada en el menú
  variaciones = VARIACIONES;
  private currentDraggableEvent?: Event;
  private currentDragEffectMsg?: string;
  menuArriba = false; // Indica si el menú está arriba
  maxWidth: string = '25rem'; // Ancho máximo de las líneas, se recalcula en un método al cargar
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
  acordesRecomendados: any[3] = [];
  preferirSostenidos: boolean = true;
  notacionLatina: boolean = false;
  acordeTouch: any;
  variacionTouch: any;
  emisor: EventEmitter<any> = new EventEmitter<any>();
  pegadoFlag: boolean = false; // Bandera para indicar si se ha pegado un acorde
  private isFetching = false;
  loading: boolean = false;
  acordesCopy!: any;
  constructor(
    private renderer: Renderer2,
    private settingsService: AcordeTransformSettingsService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone,
    private cancionService: CancionService,
    private dialog: MatDialog,
    private router: Router,
    private recomendaciones: RecomendacionesService
  ) {
    this.tonalidadExpandida = null;
  }

  anadirEventListener() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      fromEvent<TouchEvent>(square, 'touchend', {
        passive: false,
      } as AddEventListenerOptions).subscribe((event) => {
        let line = undefined;
        let squareIndex = undefined;
        if ((event.target as HTMLElement).children[0]?.attributes[2]) {
          line = (event.target as HTMLElement).children[0]?.attributes[2].value;
        }
        if ((event.target as HTMLElement).children[0].attributes[3]) {
          squareIndex = (event.target as HTMLElement).children[0].attributes[3]
            .value;
        }
        if (!line && !squareIndex) {
          ('ES UNA VARIACION');

          line = (event.target as HTMLElement).children[1].attributes[2].value;
          squareIndex = (event.target as HTMLElement).children[1].attributes[3]
            .value;
        }

        this.pegarAcorde(event, Number(line), Number(squareIndex));
      });
    });
  }

  ngAfterViewInit() {
    this.anadirEventListener();
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

    this.lines?.splice(index, 1);
    this.lines?.forEach((linea, idx) => {
      linea.n_linea = idx;
    });

    this.lines;
  }
  eliminarAcorde($event: any, n_linea: number, squareIndex: number) {
    $event.preventDefault();
    setTimeout(() => {
      // Evita el comportamiento por defecto del evento touch
      const linea = this.lines?.find((line) => line.n_linea === n_linea);
      if (linea) {
        const acorde = linea.acordes[squareIndex];
        acorde;
        acorde.acorde = ''; // Limpiamos el acorde
        acorde.variacion = ''; // Limpiamos la variación
      }
    }, 50);
    this.anadirEventListener();
    this.cd.detectChanges(); // Forzar la detección de cambios
  }

  togglePanel() {
    this.panelAbierto = !this.panelAbierto;
  }
  toggleTonalidad(tonalidad: string) {
    if (this.tonalidadExpandida === tonalidad) {
      this.tonalidadExpandida = null;
    } else {
      this.tonalidadExpandida = tonalidad;
    }
  }
  seleccionarTonalidad(tonalidad: string) {
    this.tonalidadExpandida = tonalidad;
  }
  trackByAcorde(index: number, item: Acorde) {
    return item.acorde; // O un identificador único
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

  insertarAcorde(acorde: any) {
    this.acordeTouch = acorde;
    this.acordeTouch;
  }

  insertarVariacion(variacion: string) {
    // Lógica para aplicar variación al acorde activo
  }

  modSemitono(delta: number) {
    `Transponer ${delta > 0 ? '+' : ''}${delta} semitono(s)`;
    // Lógica para transponer todos los acordes
  }

  toggleNotation(): void {
    if (this.notation === 'latin') {
      this.notation = 'american';
    } else {
      this.notation = 'latin';
    }
    this.settingsService.setNotation(this.notation);
  }

  togglePreferirSostenidos() {
    this.preferirSostenidos = !this.preferirSostenidos;
    // Re-renderizar acordes si aplica
  }

  autoScrollContainer() {
    const container = this.renderer.selectRootElement('.scrollable', true);
    if (container) {
      container.scrollBy({
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
  onTouch($event: any, acorde: any) {
    if (this.variacionTouch) {
      this.variacionTouch = undefined;
    }
    $event.preventDefault(); // Evita el comportamiento por defecto del evento touch
    this.anadirEventListener();
    this.acordeTouch = acorde;
  }

  onTouchVariacion($event: any, variacion: any) {
    if (this.acordeTouch) {
      this.acordeTouch = undefined;
    }

    $event.preventDefault(); // Evita el comportamiento por defecto del evento touch
    this.anadirEventListener();
    this.variacionTouch = variacion;
    this.variacionTouch;
  }

  pegarAcorde(event?: any, linea?: number, squareIndex?: number) {
    this.pegadoFlag = false;
    if (this.acordeTouch) {
      this.acordesRecomendados = [];
      if (linea === undefined || squareIndex === undefined) {
        console.error('Error: linea o squareIndex no definidos en acorde');
      }
      this.lines?.forEach((line) => {
        if (line.n_linea === linea) {
          const acorde = line.acordes[squareIndex!];
          acorde.acorde = this.acordeTouch.acorde; // Asigna el acorde al cuadrado
          acorde.variacion = this.acordeTouch.variacion; // Asigna la variación al cuadrado
          acorde.effect = 'copy';
          acorde.grado = this.acordeTouch.grado; // Efecto de copia
          acorde;
          this.recomendaciones.anadirAcorde(
            acorde.id!,
            acorde.acorde!,
            acorde.variacion!,
            squareIndex!,
            acorde.grado!,
            linea!
          );
          this.pegadoFlag = true;
        }
      });
    }
    if (this.variacionTouch) {
      this.variacionTouch;
      if (linea === undefined || squareIndex === undefined) {
        console.error('Error: linea o squareIndex no definidos en variacion');
      }
      this.lines?.forEach((line) => {
        if (line.n_linea === linea) {
          const acorde = line.acordes[squareIndex!];
          acorde;
          if (acorde.acorde) {
            acorde.variacion = this.variacionTouch; // Asigna la variación al cuadrado
          }
        }
      });
    }
    if (this.pegadoFlag) {
      this.actualizarRecomendaciones();
      this.pegadoFlag = false; // Reinicia la bandera después de pegar
    }
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
  actualizarRecomendaciones() {
    if (this.isFetching || !this.pegadoFlag) {
      return;
    }
    this.isFetching = true;
    this.pegadoFlag = false;
    this.loading = true;
    this.recomendaciones
      .getRecomendaciones()
      .pipe(
        take(1),
        finalize(() => (this.isFetching = false))
      )
      .subscribe({
        next: (res) => {
          this.recomendacion = res.recomendaciones;
          this.loading = false;
          if (this.recomendacion.length > 0) {
            this.recomendacion.forEach((recomendacion) => {
              const probabilidad = recomendacion.probabilidad;
              this.findAcordeRecomendado(recomendacion.siguiente, probabilidad);
            });
          }
        },
        error: (err) => {
          console.error('Error al obtener recomendaciones', err);
          this.isFetching = false;
        },
      });
  }
}
