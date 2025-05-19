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
import { ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from '../auth/auth.service';
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
  isLoading: boolean = true;
  hoverRating: number = 0; // Variable para almacenar el rating al pasar el ratón
  isLoggedIn: boolean = false; // Variable para verificar si el usuario está logueado
  toggleFavorito() {
    if (!this.esFavorito) {
      this.cancionService.addFavorito(this.cancion.id!).subscribe(
        (data) => {
          this.esFavorito = true;
        },
        (error) => {
          console.error('Error al añadir a favoritos', error);
        }
      );
    } else {
      this.cancionService.quitarFavorito(this.cancion.id!).subscribe(
        (data) => {
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
          this.rating; // Emite el nuevo rating
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
    private rute: ActivatedRoute,
    private authService: AuthService // Inyecta el servicio de autenticación
  ) {}

  ngOnInit() {
    this.estaGuardado = false;
    this.cancionService.getCancion(this.rute.snapshot.params['id']).subscribe(
      (data) => {
        this.cancion = data.cancion;
        this.cancion;
        this.cargado = true;
        this.rating = this.cancion.rating || 0;
        //this.isLoading = false;
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
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar la canción', error);
        this.cargado = true;
      }
    );
    this.authService.authStatus.subscribe((status) => {
      this.isLoggedIn = status;
    //  console.log(this.isLoggedIn);
      // Actualiza el estado de login
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
  getStarType(star: number, rating: number): string {
    if (star <= rating) {
      return 'star'; // Estrella llena
    } else if (star - 0.5 <= rating) {
      return 'star_half'; // Media estrella
    } else {
      return 'star_border'; // Estrella vacía
    }
  }
  print() {
    // 1. Crear iframe para impresión
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    // 2. Clonar el contenido preservando estilos
    const contentToPrint = document
      .querySelector('.parent')
      ?.cloneNode(true) as HTMLElement;

    // 3. Inyectar estilos específicos para impresión
    const printStyles = `
    <style>
      @page {
    size: A4 portrait;
    margin: 15mm 10mm;
    marks: none;
      }
      
      body {
        font-family: Arial;
        margin: 0;
        padding: 15px;
        line-height: 1.5;
        color: black;
      }
      
      /* Preservar layout flex */
      .input-group {
        display: block;
        width: 100%;
        margin-bottom: 15px;
        page-break-inside: avoid;
      }
      
      /* Estilos específicos para los cuadrados */
      .square-container {
        display: flex !important;
        justify-content: space-between !important;
        width: 100% !important;
        margin-bottom: 8px !important;
            display: flex !important;
    justify-content: space-between !important;
    page-break-inside: avoid;
      }
      
      .square {
        position: relative !important;
        width: 100% !important;
        height: 50px !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin: 0 2px !important;
        border-radius: 4px !important;
        border: 1px solid #ddd !important;
        background: white !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
         width: 100% !important;
    height: 50px !important;
    border: 1px solid #ddd !important;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1) !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
      }
      .rating-fav,
  .favorite-icon,
  .rating,
  button[mat-button],
  .no-print,
  header,
  aside,
  footer {
    display: none !important;
  }
      /* Asegurar que los acordes sean visibles */
      app-acordeshow {
        transform: none !important;
        zoom: 1 !important;
      }
    </style>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  `;

    // 4. Preparar documento del iframe
    iframe.contentDocument?.open();
    iframe.contentDocument?.write(`
    <html>
      <head>
        ${printStyles}
      </head>
      <body>
        ${contentToPrint?.outerHTML || ''}
        <script>
          setTimeout(() => {
            window.print();
            window.close();
          }, 300);
        </script>
      </body>
    </html>
  `);
    iframe.contentDocument?.close();
  }
}
