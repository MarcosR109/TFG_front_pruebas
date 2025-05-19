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
    { note: 'C', flat: 'C', sharp: 'C' },
    { note: 'Cb', flat: 'Db', sharp: 'C#' },
    { note: 'D', flat: 'D', sharp: 'D' },
    { note: 'Db', flat: 'Eb', sharp: 'D#' },
    { note: 'E', flat: 'E', sharp: 'E' },
    { note: 'F', flat: 'F', sharp: 'F' },
    { note: 'F#', flat: 'Gb', sharp: 'F#' },
    { note: 'G', flat: 'G', sharp: 'G' },
    { note: 'Gb', flat: 'Ab', sharp: 'G#' },
    { note: 'A', flat: 'A', sharp: 'A' },
    { note: 'Ab', flat: 'Bb', sharp: 'A#' },
    { note: 'B', flat: 'B', sharp: 'B' },
    { note: 'Bb', flat: 'Bb', sharp: 'A#' },
  ];
  transform(chord: string, semitones: number): string {
    if (!chord || semitones === 0) return chord;

    // Expresión regular mejorada (case insensitive y captura bemoles en minúscula)
    const matches = chord.match(/^([A-Ga-g][#bBb]?)(.*)/i);
    if (!matches) return chord;

    const [_, base, suffix] = matches;
    const newBase = this.transposeBase(base, semitones);
    return newBase + suffix;
  }

  private transposeBase(base: string, semitones: number): string {
    // Normalizar a mayúscula pero preservando el tipo de alteración (#/b)
    const normalizedBase =
      base[0].toUpperCase() + (base.length > 1 ? base.slice(1) : '');

    const noteObj = this.chromaticScale.find(
      (n) =>
        n.note === normalizedBase ||
        n.flat === normalizedBase ||
        n.sharp === normalizedBase
    );

    if (!noteObj) {
      console.warn('Nota no encontrada:', base);
      return base;
    }

    const currentIndex = this.chromaticScale.indexOf(noteObj);
    const newIndex = (currentIndex + semitones + 12) % 12;
    const newNote = this.chromaticScale[newIndex];

    // Preservar la notación original
    if (base.toLowerCase().includes('b')) {
      return newNote.flat;
    } else if (base.includes('#')) {
      return newNote.sharp;
    } else {
      return newNote.note;
    }
  }
}
