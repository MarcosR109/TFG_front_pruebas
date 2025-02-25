import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TextinputComponent } from '../textinput/textinput.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Linea } from '../cancion/linea';
import { Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { acordesPorTonalidad, variaciones } from '../cancion/utils';
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
    TextinputComponent,
    DragDropModule,
    MatIconModule,
  ],
})
export class TextBoxesComponent {
  @Input() lines?: Linea[] = [];
  maxWidth: string = '10rem'; // Ancho inicial mínimo

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
}
