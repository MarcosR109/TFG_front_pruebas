import { Component } from '@angular/core';
import { Cancion } from './cancion';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TextBoxesComponent } from '../text-boxes/text-boxes.component';
import { TextinputComponent } from '../textinput/textinput.component';

@Component({
  selector: 'app-cancion',
  imports: [TextBoxesComponent, TextinputComponent, CommonModule, NgIf],
  templateUrl: './cancion.component.html',
  styleUrl: './cancion.component.css',
})
export class CancionComponent {
  cancion: Cancion = {};
  /**
   *
   */
  constructor(private http: HttpClient) {
    this.http.get<Cancion>('song.json').subscribe((data) => {
      this.cancion = data;
      console.log(this.cancion);
    });
  }
}
