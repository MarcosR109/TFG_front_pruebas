import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MatFormField,
  MatFormFieldControl,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
@Component({
  selector: 'app-textinput',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatButton,
    MatButtonModule,
    MatInput,
  ],
  templateUrl: './textinput.component.html',
  styleUrl: './textinput.component.css',
})
export class TextinputComponent {
  @Output()
  emisor = new EventEmitter<string[]>();
  text: Array<string> = [];
  escrito: boolean = false;
  constructor() {
    this.text = [];
  }
  romperTexto(lines: string) {
    this.text = lines.split('\n');
    console.log(this.text);
    this.emisor.emit(this.text);
  }
}
