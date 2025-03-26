import { Component } from '@angular/core';
import { TextinputComponent } from '../textinput/textinput.component';
import { TextBoxesComponent } from '../text-boxes/text-boxes.component';

@Component({
  selector: 'app-cancion-form',
  imports: [TextinputComponent, TextBoxesComponent],
  templateUrl: './cancion-form.component.html',
  styleUrl: './cancion-form.component.css',
})
export class CancionFormComponent {}
