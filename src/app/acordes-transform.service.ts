import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AcordesTransformService {
  constructor() {}
  public preferSostenidos = false;
  public notation: 'latin' | 'american' = 'american';

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
    console.log('Pretransformar', baseChord);

    const currentIndex = currentNotation.findIndex(
      (c) => c.replace(/[#b]/, '') === baseChord,
      console.log('Mapa', this.chordMap[this.notation])
    );
    console.log('CURRENT NOTATION', currentNotation);

    const coincidencia = currentNotation.find((c) => c == baseChord);
    let prueba = currentNotation.find((c) => c == 'Do');
    console.log('Prueba', prueba);
    console.log('Coincidencia', coincidencia);

    console.log('normalizedChord', normalizedChord);
    console.log('Notacion actual ', this.notation);
    console.log('PreferirSostenidos', this.preferSostenidos);
    console.log('Index', currentIndex);
    if (currentIndex === -1) return chord;

    const newIndex = (currentIndex + semitones + 12) % 12;
    let newChord = currentNotation[newIndex];
    console.log('Acorde en nueva notación ', newChord);

    // Aplicar preferencia de sostenidos/bemoles
    if (this.preferSostenidos) {
      newChord = this.convertToSostenidos(newChord);
      console.log(newChord);
    } else {
      newChord = this.convertToBemoles(newChord);
      console.log(newChord);
    }

    return this.applyOriginalFormat(newChord, chord);
  }

  private normalizeChord(chord: string): string {
    const latinToAmerican: { [key: string]: string } = {
      Do: 'C',
      Re: 'D',
      Mi: 'E',
      Fa: 'F',
      Sol: 'G',
      La: 'A',
      Si: 'B',
    };
    const americanToLatin: { [key: string]: string } = {
      C: 'Do',
      D: 'Re',
      E: 'Mi',
      F: 'Fa',
      G: 'Sol',
      A: 'La',
      B: 'Si',
    };
    const base = chord.replace(/[#b]/, '');
    console.log('BASE', base);
    console.log('AMERICANTOLATIN', americanToLatin[base]);

    console.log('LATINTOAMERICAN', latinToAmerican[base]);

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
    const suffix = originalChord.replace(/^[A-Ga-g][#b]?/, '');
    console.log(newChord);
    return newChord + suffix;
  }
}
