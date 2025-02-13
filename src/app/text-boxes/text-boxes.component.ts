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
  ],
})
export class TextBoxesComponent {
  @Input() lines?: Linea[] = [];
  maxWidth: string = '10rem'; // Ancho inicial mínimo

  /*updateText(_$event: string[]): void {
    console.log('Updating text', _$event);
    this.lines = _$event.map((linea) => ({ letra: linea }));
    this.updateMaxWidth();
  }*/

  /*updateMaxWidth(): void {
    const charWidth = 9; // Ajustado para mejorar el tamaño
    const minWidth = 100; // Mínimo tamaño en px
    const maxWidth = 500; // Máximo tamaño en px
    let newWidth = Math.max(
      ...this.lines.map((l) => l.letra.length * charWidth),
      minWidth
    );
    this.maxWidth = `${Math.min(newWidth, maxWidth)}px`;
  }*/
  /*
  onDrop(event: any, lineIndex: number, squareIndex: number): void {
    const text = event.item.data;
    this.lines[lineIndex].letra = this.lines[lineIndex].letra || '';
    this.lines[lineIndex].letra += ` ${text}`;
  }
*/
}
