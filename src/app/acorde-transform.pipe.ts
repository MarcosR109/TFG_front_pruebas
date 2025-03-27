import { Pipe, PipeTransform } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
@Pipe({
  name: 'acordeTransform',
  pure: false,
})
export class AcordeTransformPipe implements PipeTransform {
  // Estos deberían venir de un servicio o componente de configuración
  public preferSostenidos = false;
  public notation: 'latin' | 'american' = 'american';

  // Mapeo completo de acordes
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

  // Equivalencias completas
  private latinToAmerican: { [key: string]: string } = {
    Do: 'C',
    'Do#': 'C#',
    Reb: 'Db',
    Re: 'D',
    'Re#': 'D#',
    Mib: 'Eb',
    Mi: 'E',
    Fa: 'F',
    'Fa#': 'F#',
    Solb: 'Gb',
    Sol: 'G',
    'Sol#': 'G#',
    Lab: 'Ab',
    La: 'A',
    'La#': 'A#',
    Sib: 'Bb',
    Si: 'B',
  };

  private americanToLatin: { [key: string]: string } = {
    C: 'Do',
    'C#': 'Do#',
    Db: 'Reb',
    D: 'Re',
    'D#': 'Re#',
    Eb: 'Mib',
    E: 'Mi',
    F: 'Fa',
    'F#': 'Fa#',
    Gb: 'Solb',
    G: 'Sol',
    'G#': 'Sol#',
    Ab: 'Lab',
    A: 'La',
    'A#': 'La#',
    Bb: 'Sib',
    B: 'Si',
  };

  transform(chord: string): string {
    if (!chord || chord.trim() === '' || chord == 'aux') return chord;
    console.log(chord);

    // Separar la base del sufijo (ej: "C#m7" → "C#" y "m7")
    const matches = chord.match(/^([A-Za-zÀ-ÿ][#b]?)(.*)/);
    if (!matches) return chord;

    const [_, baseChord, suffix] = matches;
    const transformedBase = this.transformBaseChord(baseChord);
    console.log('ALGO FUNCIONA');
    console.log(transformedBase);

    return transformedBase + suffix;
  }

  private transformBaseChord(baseChord: string): string {
    // 1. Normalizar a notación americana para procesamiento
    const normalized = this.normalizeToAmerican(baseChord);
    if (!normalized) return baseChord;

    // 2. Encontrar índice en la escala cromática
    const americanChords = this.chordMap.american;
    const index = americanChords.indexOf(normalized);
    if (index === -1) return baseChord;

    // 3. Aplicar preferencia de sostenidos/bemoles
    let processedChord = americanChords[index];
    if (this.preferSostenidos) {
      processedChord = this.convertToSostenidos(processedChord);
    } else {
      processedChord = this.convertToBemoles(processedChord);
    }

    // 4. Convertir a la notación deseada
    return this.notation === 'latin'
      ? this.americanToLatin[processedChord] || processedChord
      : processedChord;
  }

  private normalizeToAmerican(chord: string): string | null {
    // Si ya está en notación americana
    if (this.chordMap.american.includes(chord)) return chord;

    // Si está en notación latina
    if (this.latinToAmerican[chord]) return this.latinToAmerican[chord];

    // Intentar con la primera letra mayúscula (por si acaso)
    const capitalized = chord.charAt(0).toUpperCase() + chord.slice(1);
    return this.latinToAmerican[capitalized] || null;
  }

  private convertToSostenidos(chord: string): string {
    const conversion: { [key: string]: string } = {
      Db: 'C#',
      Eb: 'D#',
      Gb: 'F#',
      Ab: 'G#',
      Bb: 'A#',
      Reb: 'Do#',
      Mib: 'Re#',
      Solb: 'Fa#',
      Lab: 'Sol#',
      Sib: 'La#',
    };
    return conversion[chord] || chord;
  }

  private convertToBemoles(chord: string): string {
    const conversion: { [key: string]: string } = {
      'C#': 'Db',
      'D#': 'Eb',
      'F#': 'Gb',
      'G#': 'Ab',
      'A#': 'Bb',
      'Do#': 'Reb',
      'Re#': 'Mib',
      'Fa#': 'Solb',
      'Sol#': 'Lab',
      'La#': 'Sib',
    };
    return conversion[chord] || chord;
  }
}
