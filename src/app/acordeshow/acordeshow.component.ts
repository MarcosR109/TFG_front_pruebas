import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { AcordesTransformService } from '../acordes-transform.service';
import { ACORDES_POR_TONALIDAD, VARIACIONES } from '../cancion/utils';
import { CommonModule } from '@angular/common';
import { AcordeTransformPipe } from '../acorde-transform.pipe';

@Component({
  selector: 'app-acordeshow',
  imports: [CommonModule, AcordeTransformPipe],
  templateUrl: './acordeshow.component.html',
  styleUrl: './acordeshow.component.css',
})
export class AcordeshowComponent {
  @Input() chord: string = '';
  @Input() variacion: string = '';
  tonalidades = Object.keys(ACORDES_POR_TONALIDAD);
  constructor(private chordService: AcordesTransformService) {}

  get displayChord(): string {
    if (!this.chord || this.chord == 'aux') return '';
    console.log('Acorde', this.chord);
    return this.chordService.transposeChord(this.chord, 0);
  }

  transpose(semitones: number): void {
    console.log('Acorde', this.chord);
    this.chord = this.chordService.transposeChord(this.chord, semitones);
  }
}
