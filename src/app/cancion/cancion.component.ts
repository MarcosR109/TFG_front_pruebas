import { booleanAttribute, Component } from '@angular/core';
import { Cancion } from './cancion';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TextBoxesComponent } from '../text-boxes/text-boxes.component';
import { TextinputComponent } from '../textinput/textinput.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CancionService } from '../cancion.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ActivatedRoute } from '@angular/router';
import {
  MatProgressSpinner,
  ProgressSpinnerMode,
} from '@angular/material/progress-spinner';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-cancion',
  imports: [
    TextBoxesComponent,
    TextinputComponent,
    CommonModule,
    NgIf,
    MatButtonModule,
    ConfirmComponent,
    MatProgressSpinner,
    MatCard,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './cancion.component.html',
  styleUrl: './cancion.component.css',
})
export class CancionComponent {
  cancion!: Cancion;
  public binary: boolean = true;
  public cargado: boolean = false;
  rating: number = 0;
  public blockRating = false;
  esFavorito!: boolean;
  estaGuardado!: boolean;
  toggleFavorito() {
    if (!this.esFavorito) {
      this.cancionService.addFavorito(this.cancion.id!).subscribe(
        (data) => {
          console.log('Canción añadida a favoritos', data);
          this.esFavorito = true;
        },
        (error) => {
          console.error('Error al añadir a favoritos', error);
        }
      );
    } else {
      this.cancionService.quitarFavorito(this.cancion.id!).subscribe(
        (data) => {
          console.log('Canción eliminada de favoritos', data);
          this.esFavorito = false;
        },
        (error) => {
          console.error('Error al eliminar de favoritos', error);
        }
      );
    }
  }

  rate(value: number) {
    if (!this.blockRating) {
      this.rating = value;
      this.cancionService.addRating(this.rating, this.cancion.id!).subscribe(
        (data) => {
          console.log('Rating actualizado', data);
          console.log(this.rating); // Emite el nuevo rating
          this.blockRating = true; // Bloquea el rating
        },
        (error) => {
          console.error('Error al actualizar el rating', error);
        }
      );
    }
  }

  toggleGuardado() {
    if (!this.estaGuardado) {
      this.cancionService.addGuardado(this.cancion.id!).subscribe(
        (data) => {
          console.log('Canción añadida a guardados', data);
          this.estaGuardado = true;
        },
        (error) => {
          console.error('Error al añadir a guardados', error);
        }
      );
    } else {
      // Si ya es favorito, se quita
      this.cancionService.quitarGuardado(this.cancion.id!).subscribe(
        (data) => {
          console.log('Canción eliminada de guardados', data);
          this.estaGuardado = false;
        },
        (error) => {
          console.error('Error al eliminar de guardados', error);
        }
      );
    }
  }
  constructor(
    private http: HttpClient,
    private cancionService: CancionService,
    public dialog: MatDialog,
    private rute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.estaGuardado = false;
    this.cancionService.getCancion(this.rute.snapshot.params['id']).subscribe(
      (data) => {
        this.cancion = data.cancion;
        console.log(this.cancion);
        this.cargado = true;
        this.rating = this.cancion.rating || 0;
        if (this.cancion.metrica != 'bin') {
          this.binary = false;
        }
        this.cancionService.checkFavorito(this.cancion.id!).subscribe(
          (data) => {
            this.esFavorito = data.esFavorito;
          },
          (error) => {
            console.error('Error al cargar favorito', error);
          } // Si hay un error, no es favorito
        );
      },
      (error) => {
        console.error('Error al cargar la canción', error);
        this.cargado = true;
      }
    );
  }

  async enviarCancion() {
    const result = await this.openDialog(); // Espera la respuesta del diálogo
    if (result) {
      this.cancionService.enviarCancion(this.cancion);
    }
  }
  openDialog(): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { title: '¿Enviar canción?', message: '¿Estás seguro?' },
    });
    return dialogRef.afterClosed().toPromise(); // Retorna una promesa con el valor de `result`
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
