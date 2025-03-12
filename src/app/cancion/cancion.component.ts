import { Component } from '@angular/core';
import { Cancion } from './cancion';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TextBoxesComponent } from '../text-boxes/text-boxes.component';
import { TextinputComponent } from '../textinput/textinput.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CancionService } from '../cancion.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
@Component({
  selector: 'app-cancion',
  imports: [
    TextBoxesComponent,
    TextinputComponent,
    CommonModule,
    NgIf,
    MatButtonModule,
    ConfirmComponent,
  ],
  templateUrl: './cancion.component.html',
  styleUrl: './cancion.component.css',
})
export class CancionComponent {
  cancion: Cancion = {};
  constructor(
    private http: HttpClient,
    private cancionService: CancionService,
    public dialog: MatDialog
  ) {
    this.http.get<Cancion>('song.json').subscribe((data) => {
      this.cancion = data;
      console.log(this.cancion);
    });
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
}
