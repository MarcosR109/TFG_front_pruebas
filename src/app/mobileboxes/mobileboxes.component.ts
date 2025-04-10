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
  acordesRecomendados: any[] = [];
  preferirSostenidos: boolean = true;
  notacionLatina: boolean = false;
  agregarLineaDebajo(index: number) {}
  eliminarLinea(index: number) {}
  eliminarAcorde(n_linea: number, squareIndex: number) {
    const linea = this.lines?.find((line) => line.n_linea === n_linea);
    if (linea) {
      const acorde = linea.acordes[squareIndex];
      console.log(acorde);
      acorde.acorde = ''; // Limpiamos el acorde
      acorde.variacion = ''; // Limpiamos la variación
    }
  }
  togglePanel() {
    this.panelAbierto = !this.panelAbierto;
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

  insertarAcorde(acorde: { acorde: string }) {
    console.log('Insertar acorde:', acorde);
    // Lógica para insertar el acorde en el cuadrado activo
  }

  insertarVariacion(variacion: string) {
    console.log('Insertar variación:', variacion);
    // Lógica para aplicar variación al acorde activo
  }

  modSemitono(delta: number) {
    console.log(`Transponer ${delta > 0 ? '+' : ''}${delta} semitono(s)`);
    // Lógica para transponer todos los acordes
  }

  toggleNotation() {
    this.notacionLatina = !this.notacionLatina;
    console.log(
      'Cambiar a notación:',
      this.notacionLatina ? 'latina' : 'americana'
    );
    // Actualizar acordes si es necesario
  }

  togglePreferirSostenidos() {
    this.preferirSostenidos = !this.preferirSostenidos;
    console.log('Mostrar como:', this.preferirSostenidos ? '♯' : '♭');
    // Re-renderizar acordes si aplica
  }
}
