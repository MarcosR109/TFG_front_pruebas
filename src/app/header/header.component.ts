import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';       // Para los iconos (como el menú hamburguesa)
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `<mat-toolbar color="primary">
  <!-- Icono de menú para pantallas móviles -->
  <button mat-icon-button [matMenuTriggerFor]="menu" class="menu-icon">
    <mat-icon>menu</mat-icon>
  </button>

  <!-- Menú de navegación visible solo en pantallas grandes -->
  <div class="desktop-menu">
    <button mat-button>Home</button>
    <button mat-button>About</button>
    <button mat-button>Services</button>
    <button mat-button>Contact</button>
  </div>

  <!-- Menú hamburguesa -->
  <mat-menu #menu="matMenu">
    <button mat-menu-item>
      <mat-icon>home</mat-icon>
      <span>Home</span>
    </button>
    <button mat-menu-item>
      <mat-icon>account_circle</mat-icon>
      <span>Cuenta</span>
    </button>
    <button mat-menu-item>
      <mat-icon>logout</mat-icon>
      <span>Salir</span>
    </button>
  </mat-menu>
</mat-toolbar>


  `,
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
  
  
`
})
export class HeaderComponent {

}
