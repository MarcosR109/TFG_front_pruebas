import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AcordesTransformService {
  constructor() {}
  private preferSostenidos = false;
  private notation: 'latin' | 'american' = 'american';

  // Mapeo de acordes
  private chordMap = {
    american: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    latin: [
      'Do',
      'Do#',
      'Re',
      'Re#',
      'Mi',
      'Fa',
      'Fa#',
      'Sol',
      'Sol#',
      'La',
      'La#',
      'Si',
    ],
  };

  setNotation(notation: 'latin' | 'american') {
    this.notation = notation;
  }

  toggleSostenidos() {
    this.preferSostenidos = !this.preferSostenidos;
  }

  transposeChord(chord: string, semitones: number): string {
    if (!chord || chord.trim() === '') return chord;

    const currentNotation = this.chordMap[this.notation];
    const normalizedChord = this.normalizeChord(chord);

    const baseChord = normalizedChord.replace(/[#b]/, '');
    const currentIndex = currentNotation.findIndex(
      (c) => c.replace(/[#b]/, '') === baseChord
    );

    if (currentIndex === -1) return chord;

    const newIndex = (currentIndex + semitones + 12) % 12;
    let newChord = currentNotation[newIndex];

    // Aplicar preferencia de sostenidos/bemoles
    if (this.preferSostenidos) {
      newChord = this.convertToSostenidos(newChord);
    } else {
      newChord = this.convertToBemoles(newChord);
    }

    return this.applyOriginalFormat(newChord, chord);
  }

  private normalizeChord(chord: string): string {
    // Normaliza a notación americana para procesamiento interno
    const latinToAmerican: { [key: string]: string } = {
      Do: 'C',
      Re: 'D',
      Mi: 'E',
      Fa: 'F',
      Sol: 'G',
      La: 'A',
      Si: 'B',
    };

    const base = chord.replace(/[#b]/, '');
    return latinToAmerican[base] || base;
  }

  private convertToSostenidos(chord: string): string {
    const bemolToSostenido: { [key: string]: string } = {
      Db: 'C#',
      Eb: 'D#',
      Gb: 'F#',
      Ab: 'G#',
      Bb: 'A#',
    };
    return bemolToSostenido[chord] || chord;
  }

  private convertToBemoles(chord: string): string {
    const sostenidoToBemol: { [key: string]: string } = {
      'C#': 'Db',
      'D#': 'Eb',
      'F#': 'Gb',
      'G#': 'Ab',
      'A#': 'Bb',
    };
    return sostenidoToBemol[chord] || chord;
  }

  private applyOriginalFormat(newChord: string, originalChord: string): string {
    // Mantener sufijos como m, 7, etc.
    const suffix = originalChord.replace(/^[A-Ga-g][#b]?/, '');
    return newChord + suffix;
  }
}
