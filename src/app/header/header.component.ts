import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import {
  catchError,
  interval,
  Observable,
  Subscription,
  switchMap,
} from 'rxjs';
import { BadgeService } from '../badge.service';
import { CancionService } from '../cancion.service';
import { AuthService } from '../auth/auth.service';
import { RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatToolbarModule,
    MatBadgeModule,
    RouterLinkActive,
  ],
  template: `
    <!-- Toolbar solo para móviles -->
    <mat-toolbar color="primary" class="mobile-toolbar" *ngIf="isMobile">
      <button mat-icon-button (click)="toggleMenu()">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>
    <!-- Menú lateral para pantallas grandes -->
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" [opened]="!isMobile || isMenuOpen">
        <div class="menu">
          <button
            *ngIf="this.userRole === 3"
            mat-button
            [routerLink]="['/revisiones']"
            routerLinkActive="active"
            class="menu-item"
          >
            <mat-icon
              mat-badge
              [matBadge]="badgeCount"
              matBadgePosition="after"
              matBadgeOverlap="false"
              matBadgeColor="primary"
              >notifications</mat-icon
            >
            <span>Revisiones</span>
          </button>
          <button
            *ngIf="userRole === 2"
            mat-button
            class="menu-item"
            [routerLink]="['/dashboard']"
            routerLinkActive="active"
          >
            <mat-icon>space_dashboard</mat-icon>
            <span>Panel</span>
          </button>
          <button mat-button [routerLink]="['/home']" class="menu-item">
            <mat-icon>home</mat-icon>
            <span>Home</span>
          </button>
          <button
            mat-button
            [routerLink]="['/canciones']"
            routerLinkActive="active"
            class="menu-item"
          >
            <mat-icon>search</mat-icon>
            <span>Buscar</span>
          </button>
          <button
            *ngIf="isLoggedIn && this.userRole === 1"
            mat-button
            [routerLink]="['/canciones/mine']"
            class="menu-item"
            routerLinkActive="active"
          >
            <mat-icon>library_music</mat-icon>
            <span>Guardadas</span>
          </button>
          <button
            *ngIf="isLoggedIn"
            mat-button
            [routerLink]="['/canciones/create']"
            routerLinkActive="active"
            class="menu-item"
          >
            <mat-icon>add</mat-icon>
            <span>Crear</span>
          </button>
          <button
            *ngIf="isLoggedIn"
            mat-button
            class="menu-item"
            (click)="logout()"
          >
            <mat-icon>logout</mat-icon>
            <span>Salir</span>
          </button>
          <button
            *ngIf="!isLoggedIn"
            mat-button
            class="menu-item"
            [routerLink]="['/login']"
            routerLinkActive="active"
          >
            <mat-icon>login</mat-icon>
            <span>Login</span>
          </button>
          <button
            *ngIf="!isLoggedIn"
            mat-button
            class="menu-item"
            [routerLink]="['/register']"
            routerLinkActive="active"
          >
            <mat-icon>how_to_reg</mat-icon>
            <span>Register</span>
          </button>
        </div>
      </mat-sidenav>
      <mat-sidenav-content>
        <ng-content> <router-outlet></router-outlet></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
    .sidenav-container {
      height: 100vh;

    }
    mat-sidenav {
      width: 80px;
      background: #f5f5f5;
      display: flex;
      flex-direction: column;
      align-items: center;
        background: linear-gradient(to bottom, #cce0ff, #6b88a6);
        border:none;
        align-items: center;
        justify-content: center;
    }
    .active{
      background:rgb(255, 255, 255);
      border-radius: 0px;
      color: white;
    }
    .menu {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
      height: 100%;
    justify-self: center;
    justify-content: center;
    }
    .menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      text-transform: none;
      font-size: 14px;
      height: 60px;
      padding: 8px 0;
      margin-top: 16px;
    }
    .menu-item mat-icon {
      font-size: 20px;
      margin-bottom: 8px;
    }
    .menu-item span {
      font-size: 12px;
    }

    /* Estilos para móviles */
    .mobile-toolbar {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }
    .spacer {
      flex: 1;
    }

    @media (max-width: 768px) {
      .mobile-toolbar {
        display: flex;
      }
      mat-sidenav {
        width: 200px; /* Ancho del menú lateral en móviles */
        position: fixed;
        top: 56px; /* Altura del toolbar */
        bottom: 0;
        left: 0;
        z-index: 999;
        transform: translateX(-100%);
        transition: transform 0.1s ease;
      }
      mat-sidenav[opened] {
        transform: translateX(0);
      }
    }
  `,
})
export class HeaderComponent {
  isMobile = false;
  isMenuOpen = false;
  badgeCount = 0;
  badgeCount$!: Observable<number>;
  private subscription!: Subscription;
  userRole!: number;
  isLoggedIn = false; // Variable para verificar si el usuario está logueado
  constructor(
    private badgeService: BadgeService,
    private cancionesService: CancionService,
    private authService: AuthService
  ) {
    this.badgeCount$ = this.badgeService.badgeCount$ || 0;
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  ngOnInit() {
    this.cancionesService.actualizarBadge().subscribe((count) => {
      this.badgeCount = count.count;
    });
    this.subscription = interval(50000)
      .pipe(
        switchMap(() => this.cancionesService.actualizarBadge()), // Llama al backend cada 5s
        catchError((err) => {
          console.error('Error al actualizar badge:', err);
          return []; // Devuelve un array vacío para evitar que se rompa la suscripción
        })
      )
      .subscribe((res) => {
        this.badgeService.actualizarBadge(res.count || 0); // Actualiza el servicio
        console.log('Badge actualizado:', res.count);
        this.badgeCount = res.count;
      });
    this.authService.$role.subscribe((role) => (this.userRole = role));
    this.authService.authStatus.subscribe((status) => {
      this.isLoggedIn = status; // Actualiza el estado de login
    });
  }
  login() {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Evita fugas de memoria
    }
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  logout() {
    this.authService.logout();
  }
}
