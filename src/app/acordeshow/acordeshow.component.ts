import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ACORDES_POR_TONALIDAD, VARIACIONES } from '../cancion/utils';
import { CommonModule } from '@angular/common';
import { AcordeTransformPipe } from '../acorde-transform.pipe';
import { AcordeTransposePipe } from '../acorde-transpose.pipe';
@Component({
  selector: 'app-acordeshow',
  imports: [CommonModule, AcordeTransformPipe, AcordeTransposePipe],
  templateUrl: './acordeshow.component.html',
  styleUrl: './acordeshow.component.css',
})
export class AcordeshowComponent {
  @Input() chord: string = '';
  @Input() variacion: string = '';
  @Input() semitones!: number;
  tonalidades = Object.keys(ACORDES_POR_TONALIDAD);
  constructor() {}
}
