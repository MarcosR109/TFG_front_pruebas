import { Component } from '@angular/core';
import { CancionService } from '../cancion.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatCardContent } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-home',
  imports: [CommonModule,MatIcon,MatCardModule,MatButtonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  top5: any[] = [];
  topNuevas: any[] = [];
  isLoggedIn: boolean = false;
  constructor(private cancionService: CancionService,private authService:AuthService) {

  }
  ngOnInit() {
    this.cancionService.getLandingData().subscribe((res: any) => {
      this.top5 = res.top5;
      this.topNuevas = res.nuevas;
      console.log(this.top5);
      console.log(this.topNuevas);
    });
    this.authService.authStatus.subscribe((status) => {
      this.isLoggedIn = status;
      console.log('Estado de autenticación:', status);
    }
    );

  }
  getStarType(star: number, rating: number): string {
    if (star <= rating) {
      return 'star'; // Estrella llena
    } else if (star - 0.5 <= rating) {
      return 'star_half'; // Media estrella
    } else {
      return 'star_border'; // Estrella vacía
    }
  }
}
