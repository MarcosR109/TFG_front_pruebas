import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  private badgeCount = new BehaviorSubject<number>(0); // Estado inicial
  badgeCount$ = this.badgeCount.asObservable(); // Exponemos el observable

  // Método para actualizar el badge
  actualizarBadge(valor: number) {
    this.badgeCount.next(valor);
  }
}
