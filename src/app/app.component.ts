import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { SquareComponent } from './square/square.component';
import { TextinputComponent } from './textinput/textinput.component';
import { TextBoxesComponent } from './text-boxes/text-boxes.component';
import { CancionComponent } from './cancion/cancion.component';
import { Routes } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { CancionService } from './cancion.service';
import { BadgeService } from './badge.service';
import { JwtInterceptor } from './auth/interceptor.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    FooterComponent,
    RouterOutlet,
    SquareComponent,
    TextinputComponent,
    CancionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Mi Proyecto Angular';
  badgeCount = 0;
  private subscription!: Subscription;
  constructor(
    private canciones: CancionService,
    private badgeService: BadgeService
  ) {}
}
