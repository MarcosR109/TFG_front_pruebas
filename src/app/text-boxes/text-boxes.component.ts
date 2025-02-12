import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; // Si usas botones
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { TextinputComponent } from '../textinput/textinput.component';
@Component({
  selector: 'app-text-boxes',
  standalone: true,
  templateUrl: './text-boxes.component.html',
  styleUrls: ['./text-boxes.component.css'],
  imports: [
    FormsModule, // Para ngModel
    MatCardModule, // Para mat-card
    MatFormFieldModule, // Para mat-form-field
    MatInputModule,
    CommonModule,
    MatButtonModule,
    TextinputComponent,
  ],
})
export class TextBoxesComponent {
  // 3 o 4 cuadrados vacíos
  squares = [
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' }, // Puedes eliminar este si solo necesitas 3
  ];
  lines: { letra: string }[] = [];

  // Variable para almacenar el input del usuario
  // Actualiza los cuadrados con el texto del usuario
  updateText(_$event: string[]): void {
    console.log('Updating text', _$event);
    this.lines = _$event.map((linea) => ({ letra: linea }));
  }
}
