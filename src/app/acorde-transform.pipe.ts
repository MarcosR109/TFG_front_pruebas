import { Pipe, PipeTransform } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AcordeTransformSettingsService } from './acorde-transform-settings.service';

@Injectable({
  providedIn: 'root',
})
@Pipe({
  name: 'acordeTransform',
  pure: false,
})
export class AcordeTransformPipe implements PipeTransform {
  private preferSostenidos = false;
  private notation: 'latin' | 'american' = 'american';
  private settingsSubscription: Subscription;

  constructor(private settingsService: AcordeTransformSettingsService) {
    this.settingsSubscription =
      this.settingsService.preferSostenidos$.subscribe((value) => {
        this.preferSostenidos = value;
      });

    this.settingsSubscription.add(
      this.settingsService.notation$.subscribe((value) => {
        this.notation = value;
      })
    );
  }
  // Mapeo completo de acordes
  private chordMap = {
    american: [
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
      'Db',
      'Eb',
      'Gb',
      'Ab',
      'Bb',
      'Dbm',
      'Ebm',
      'Gbm',
      'Abm',
      'Bbm',
      'C#m',
      'D#m',
      'F#m',
      'G#m',
      'A#m',
      'Cm',
      'Dm',
      'Em',
      'Fm',
      'Gm',
      'Am',
      'Bm',
      'Cdim',
      'C#dim',
      'Ddim',
      'D#dim',
      'Edim',
      'Fdim',
      'F#dim',
      'Gdim',
      'G#dim',
      'Abdim',
      'Adim',
      'Bdim',
      'B#dim',
    ],
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
    Cm: 'Dom',
    'C#m': 'Do#m',
    Dbm: 'Rebm',
    Dm: 'Rem',
    'D#m': 'Re#m',
    Ebm: 'Mibm',
    Em: 'Mim',
    Fm: 'Fam',
    'F#m': 'Fa#m',
    Gm: 'Solm',
    'G#m': 'Sol#m',
    Abm: 'Labm',
    Am: 'Lam',
    'A#m': 'La#m',
    Bm: 'Sim',
    Bbm: 'Sibm',
    'B#': 'Si#',
    Cdim: 'Dom',
    'C#dim': 'Do#dim',
    Ddim: 'Redim',
    'D#dim': 'Re#dim',
    Edim: 'Midim',
    Fdim: 'Fadim',
    'F#dim': 'Fa#dim',
    Gdim: 'Soldim',
    Gbmin: 'Solbmin',
    Bdim: 'Sidim',
    'G#dim': 'Sol#dim',
    Abdim: 'Labdim',
    Adim: 'Ladim',
  };

  transform(chord: string): string {
    console.log('PREFERIRSOSTENIDOS', this.preferSostenidos);
    console.log('NOTATION', this.notation);
    console.log('ACORDE QUE ENTRA', chord);
    if (!chord || chord.trim() === '' || chord == 'aux') return chord;
    console.log('ACORDE QUE ENTRA', chord);
    const transformedBase = this.transformBaseChord(chord);
    console.log('ACORDE QUE SALE', transformedBase);
    return transformedBase;
  }

  private transformBaseChord(baseChord: string): string {
    // 1. Normalizar a notación americana para procesamiento
    const normalized = this.normalizeToAmerican(baseChord);
    if (!normalized) return baseChord;
    console.log('Normalized', normalized);

    // 2. Encontrar índice en la escala cromática
    const americanChords = this.chordMap.american;
    const index = americanChords.indexOf(normalized);
    if (index === -1) return baseChord;
    console.log('Acorde encontrado en escala americana index : ', index);
    // 3. Aplicar preferencia de sostenidos/bemoles
    let processedChord = americanChords[index];
    console.log(
      'Processed Chord antes de preferirsostenidos/bemol',
      processedChord
    );

    if (this.preferSostenidos) {
      processedChord = this.convertToSostenidos(processedChord);
      console.log('Processed Chord en converttosostenidos', processedChord);
    } else {
      processedChord = this.convertToBemoles(processedChord);
      console.log('Processed Chord en converttobemoles', processedChord);
    }

    console.log('Notación preferida', this.notation);
    console.log('Antes de procesar la notación', processedChord);

    // 4. Convertir a la notación deseada
    return this.notation === 'latin'
      ? this.americanToLatin[processedChord] || processedChord
      : processedChord;
  }

  private normalizeToAmerican(chord: string): string | null {
    // Si ya está en notación americana
    if (this.chordMap.american.includes(chord)) {
      console.log('Acorde en notación americana', chord);
      return chord;
    }

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
      Gbm: 'F#m',
      Abm: 'G#m',
      Bbm: 'A#m',
      Dbm: 'C#m',
      Ebm: 'D#m',
      Ebdim: 'D#dim',
      Gbdim: 'F#dim',
      Abdim: 'G#dim',
      Bbdim: 'A#dim',
      Dbdim: 'C#dim',
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
      'F#m': 'Gbm',
      'G#m': 'Abm',
      'A#m': 'Bbm',
      'C#m': 'Dbm',
      'D#m': 'Ebm',
      'C#dim': 'Dbdim',
      'D#dim': 'Ebdim',
      'F#dim': 'Gbdim',
      'G#dim': 'Abdim',
      'A#dim': 'Bbdim',
    };
    return conversion[chord] || chord;
  }

  transformToEnarmonic(acorde: string): string {
    const enarmonicMap: { [key: string]: string } = {
      'C#': 'Db',
      'D#': 'Eb',
      'F#': 'Gb',
      'G#': 'Ab',
      'A#': 'Bb',
      Eb: 'D#',
      Db: 'C#',
      Gb: 'F#',
      Ab: 'G#',
      Bb: 'A#',
      'C#m': 'Dbm',
      'D#m': 'Ebm',
      'F#m': 'Gbm',
      'G#m': 'Abm',
      'A#m': 'Bbm',
      Ebm: 'D#m',
      Dbm: 'C#m',
      Gbm: 'F#m',
      Abm: 'G#m',
      Bbm: 'A#m',
    };
    return this.preferSostenidos ? enarmonicMap[acorde] || acorde : acorde;
  }
  transformToSpanish(acorde: string): string {
    const spanishMap: { [key: string]: string } = {
      C: 'Do',
      D: 'Re',
      E: 'Mi',
      F: 'Fa',
      G: 'Sol',
      A: 'La',
      B: 'Si',
      Db: 'Reb',
      Eb: 'Mib',
      Gb: 'Solb',
      Ab: 'Lab',
      Bb: 'Sib',
      Cm: 'Dom',
      Dm: 'Rem',
      Em: 'Mim',
      Fm: 'Fam',
      Gm: 'Solm',
      Am: 'Lam',
      Bm: 'Sim',
      Dbm: 'Rebm',
      Ebm: 'Mibm',
      Gbm: 'Solbm',
      Abm: 'Labm',
      Bbm: 'Sibm',
      'D#': 'Re#',
      'G#': 'Sol#',
      'A#': 'La#',
      'F#': 'Fa#',
      'C#': 'Do#',
      'D#m': 'Re#m',
      'F#m': 'Fa#m',
      'G#m': 'Sol#m',
      'A#m': 'La#m',
      'C#m': 'Do#m',
    };
    return this.preferSostenidos ? spanishMap[acorde] || acorde : acorde;
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
  }
}
