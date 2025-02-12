import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { SquareComponent } from './square/square.component';
import { TextinputComponent } from './textinput/textinput.component';
import { TextBoxesComponent } from './text-boxes/text-boxes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    FooterComponent,
    RouterOutlet,
    HeroComponent,
    SquareComponent,
    TextinputComponent,
    TextBoxesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Mi Proyecto Angular';
}
