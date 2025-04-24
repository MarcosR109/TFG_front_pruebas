import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Route, RouterModule } from '@angular/router';
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
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

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
    <mat-toolbar class="mobile-toolbar">
      <button *ngIf="isMobile" mat-icon-button (click)="toggleMenu()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>{{ this.currentTitle }}</span>
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
            class="menu-item "
          >
            <mat-icon
              mat-badge
              [matBadge]="badgeCount"
              matBadgePosition="after"
              matBadgeOverlap="false"
              matBadgeColor="accent"
              class="my-custom-badge-accent"
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
            [routerLinkActiveOptions]="{ exact: true }"
            class="menu-item"
          >
            <mat-icon>search</mat-icon>
            <span>Buscar</span>
          </button>
          <button
            *ngIf="(isLoggedIn && this.userRole === 1) || this.userRole === 3"
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
      <div
        class="content-overlay"
        [class.visible]="isMenuOpen"
        (click)="closeMenu()"
      ></div>
      <mat-sidenav-content [class.blurred]="isMenuOpen" class="scrollable">
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
      color: black;
      height: 100%;
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
      color:rgba(0, 0, 0, 0.57);
    }
    .spacer {
      flex: 1;
    }
  mat-sidenav-content {
    height: 100%;
    overflow-y:auto;
  }
    /* Estilos base */
.sidenav-container {
  height: 100vh;
}
.mat-badge-content {
    background:  #a6c5f3 !important;
}
.my-custom-badge-accent.mat-badge-accent .mat-badge-content {
    background:  #a6c5f3 !important;
    background-color: #a6c5f3 !important;
    color: white;
}
::ng-deep .mat-badge-content { 
  padding: 0px 4px !important;
    background: #a6c5f3 !important; 
}
mat-sidenav {
  width: 80px;
  background: linear-gradient(to bottom, #cce0ff, #6b88a6);
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Estilos para móviles */
@media (max-width: 768px) {
    .mobile-toolbar {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background:  #cce0ff;
 
  }

  .sidenav-container {
    
    margin-top: 56px; /* Compensa la altura del toolbar */
  }

  mat-sidenav {
    width: 200px;
    position: fixed;
    top: 56px;
    bottom: 0;
    left: 0;
    z-index: 999;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  mat-sidenav[opened] {
    transform: translateX(0);
  }

  mat-sidenav-content {
    margin-left: 0 !important;
    transition: margin 0.3s ease;
  }

  mat-sidenav[opened] + mat-sidenav-content {
    margin-left: 200px !important;
  }
  .mobile-toolbar {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: #cce0ff;
    padding:0;
  }

  .sidenav-container {
    margin-top: 56px; /* Compensa la altura del toolbar */
    position: relative;
  }

  mat-sidenav {
    width: 200px;
    position: fixed;
    top: 56px;
    bottom: 0;
    left: 0;
    z-index: 999;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    box-shadow: 3px 0 10px rgba(0, 0, 0, 0.2); /* Sombra para efecto de elevación */
  }

  mat-sidenav.mat-drawer-opened {
    transform: translateX(0);
  }

  /* Efecto blur y overlay cuando el sidenav está abierto */
  mat-sidenav.mat-drawer-opened ~ .mat-drawer-content {
    transition: filter 0.3s ease;
  }

  mat-sidenav.mat-drawer-opened ~ .mat-drawer-content::after {
    content: '';
    position: fixed;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    z-index: 998;
    pointer-events: auto; /* Permite cerrar haciendo clic en el overlay */
  }
}
mat-sidenav-content{
  padding:0;
}
mat-sidenav-content.blurred {
  filter: blur(2px);
}
.content-overlay {
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 998;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.content-overlay.visible {
  opacity: 1;
  pointer-events: auto;
}

mat-sidenav-content.blurred {
  filter: blur(2px);
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
  currentTitle: string = '';
  constructor(
    private badgeService: BadgeService,
    private cancionesService: CancionService,
    private authService: AuthService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.badgeCount$ = this.badgeService.badgeCount$ || 0;
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  ngOnInit() {
    this.authService.$role.subscribe((role) => {
      this.userRole = role;

      if (this.userRole == 3) {
        this.cancionesService.actualizarBadge().subscribe((res) => {
          this.badgeService.actualizarBadge(res.count || 0); // Actualiza el servicio
          this.badgeCount = res.count;
        });
        this.subscription = interval(60000)
          .pipe(
            switchMap(() => this.cancionesService.actualizarBadge()), // Llama al backend cada 5s
            catchError((err) => {
              console.error('Error al actualizar badge:', err);
              return []; // Devuelve un array vacío para evitar que se rompa la suscripción
            })
          )
          .subscribe((res) => {
            this.badgeService.actualizarBadge(res.count || 0); // Actualiza el servicio
            this.badgeCount = res.count;
          });
      }
    });
    this.authService.authStatus.subscribe((status) => {
      this.isLoggedIn = status; // Actualiza el estado de login
    });
    this.route.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        this.currentTitle = data['title'] || 'Título Predeterminado';
      });
  }
  login() {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Evita fugas de memoria
    }
  }
  closeMenu() {
    ('closeMenu()');

    this.isMenuOpen = false;
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
