import { inject, Input, Pipe, PipeTransform } from '@angular/core';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
@Pipe({
  name: 'acordeTranspose',
  pure: false,
})
export class AcordeTransposePipe implements PipeTransform {
  private chromaticScale = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ];
  private chromaticScaleFlat = [
    'C',
    'Db',
    'D',
    'Eb',
    'E',
    'F',
    'Gb',
    'G',
    'Ab',
    'A',
    'Bb',
    'B',
  ];

  transform(chord: string, semitones: number): string {
    if (!chord || semitones === 0) return chord;

    const matches = chord.match(/^([A-Ga-g][#b]?)(.*)/);
    if (!matches) return chord;
    const [_, base, suffix] = matches;

    const newBase = this.transposeBase(base, semitones);

    return newBase + suffix;
  }

  setSemitones(semitones: number) {
    semitones = semitones;
  }
  private transposeBase(base: string, semitones: number): string {
    const index = this.chromaticScale.indexOf(base.toUpperCase());
    if (index === -1) return base;
    const newIndex = (index + semitones + 12) % 12;

    return this.chromaticScale[newIndex];
  }
}
