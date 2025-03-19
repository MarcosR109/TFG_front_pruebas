import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Para los iconos (como el menú hamburguesa)
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
  ],
  template: `<mat-toolbar color="primary">
    <!-- Icono de menú para pantallas móviles -->
    <button mat-icon-button [matMenuTriggerFor]="menu" class="menu-icon">
      <mat-icon>menu</mat-icon>
    </button>

    <!-- Menú de navegación visible solo en pantallas grandes -->
    <div class="desktop-menu">
      <button mat-button [routerLink]="['/home']">Home</button>
      <button mat-button [routerLink]="['/canciones']">Canciones</button>
      <button mat-button [routerLink]="['/canciones/mine']">
        Canciones guardadas
      </button>
      <button mat-button [routerLink]="['/canciones/create']">
        Crear canción
      </button>
    </div>

    <!-- Menú hamburguesa -->
    <mat-menu #menu="matMenu">
      <button mat-menu-item [routerLink]="['/home']">
        <mat-icon>home</mat-icon>
        <span>Home</span>
      </button>
      <button mat-menu-item [routerLink]="['/canciones']">
        <mat-icon>music_note</mat-icon>
        <span>Canciones</span>
      </button>
      <button mat-menu-item [routerLink]="['/canciones/create']">
        <mat-icon>add</mat-icon>
        <span>Crear canción</span>
      </button>
      <button mat-menu-item [routerLink]="['/canciones/mine']">
        <mat-icon>library_music</mat-icon>
        <span>Canciones guardadas</span>
      </button>
      <button mat-menu-item>
        <mat-icon>logout</mat-icon>
        <span>Salir</span>
      </button>
    </mat-menu>
  </mat-toolbar> `,
  styles: `/* Por defecto, el menú de navegación en desktop es visible y el icono hamburguesa está oculto */
  .desktop-menu {
    display: flex;
    gap: 16px;
  }
  
  .menu-icon {
    display: none;
  }
  
  /* Media Query para pantallas más pequeñas (móviles) */
  @media (max-width: 768px) {
    /* En móviles, mostrar solo el menú hamburguesa */
    .menu-icon {
      display: inline-block;
    }
  
    /* Ocultar el menú de navegación en pantallas móviles */
    .desktop-menu {
      display: none;
    }
  }
  
  
`,
})
export class HeaderComponent {}
