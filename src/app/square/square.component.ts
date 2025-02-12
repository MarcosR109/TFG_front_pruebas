import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-square',
  imports: [MatCard, MatCardModule, MatDividerModule, CommonModule],
  template: `
<div class="catalog-container mat-elevation-z2">
  <mat-card>
    <mat-card-title>Explorar Catálogo de Tabs</mat-card-title>
    <mat-divider></mat-divider>
    <div class="catalog-grid">
      <div *ngFor="let category of catalog">
        <h3>{{ category.title }}</h3>
        <ul>
          <li *ngFor="let item of category.items">
            <a mat-button>{{ item.name }}</a>
            <span>{{ item.count }}</span>
          </li>
        </ul>
        <button mat-button class="show-more">Mostrar todo</button>
      </div>
    </div>
  </mat-card>
</div>
  `,
  styles: `
  .catalog-container {
    width:40%;
    height:50%%;
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.catalog-grid h3 {
  color: var(--mat-primary-contrast);
  font-weight: bold;
}

.show-more {
  font-size: 0.9rem;
  text-transform: capitalize;
}

  `
})
export class SquareComponent {
  catalog = [
    {
      title: 'Tipo',
      items: [
        { name: 'Chords', count: 2145493 },
        { name: 'Official', count: 60836 },
        { name: 'Tab', count: 706494 },
      ],
    },
    {
      title: 'Década',
      items: [
        { name: '2020s', count: 154578 },
        { name: '2010s', count: 676084 },
      ],
    },
    {
      title: 'Género',
      items: [
        { name: 'Rock', count: 2415298 },
        { name: 'Pop', count: 475356 },
      ],
    },
  ];
}
