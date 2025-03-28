import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AcordeTransformSettingsService {
  private preferSostenidosSource = new BehaviorSubject<boolean>(false);
  private notationSource = new BehaviorSubject<'latin' | 'american'>(
    'american'
  );

  // Exponemos como observables
  preferSostenidos$ = this.preferSostenidosSource.asObservable();
  notation$ = this.notationSource.asObservable();

  // Métodos para actualizar
  setPreferSostenidos(value: boolean): void {
    this.preferSostenidosSource.next(value);
  }

  setNotation(value: 'latin' | 'american'): void {
    this.notationSource.next(value);
  }

  // Para valores inmediatos (opcional)
  get currentSettings() {
    return {
      preferSostenidos: this.preferSostenidosSource.value,
      notation: this.notationSource.value,
    };
  }
}
