import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatChip } from '@angular/material/chips';
import { MatNavList } from '@angular/material/list';
import { MatListOption } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { Cancion } from '../cancion/cancion';
import { CancionService } from '../cancion.service';
import { generos } from '../generos';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-dashboard',
  imports: [
    MatIconModule,
    MatTableModule,
    MatSort,
    MatProgressSpinnerModule,
    MatListModule,
    RouterLink,
    MatFormFieldModule,
    MatPseudoCheckboxModule,
    MatChip,
    MatCardModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatChipsModule,
    MatPaginatorModule,
    MatNavList,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    ConfirmComponent,
    MatTabsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  canciones: Cancion[] = [];

  todasSeleccionadas = false;
  algunasSeleccionadas = false;
  selectList!: any;
  filtrado = false;
  filtros = {
    busqueda: '',
    genero: '',
    ratingMin: 0,
  };

  generosDisponibles: any = generos.generos;
  cancionesFiltradas: Cancion[] = [];
  columnasMostradas = [
    'titulo',
    'usuario',
    'artista',
    'genero',
    'rating',
    'acciones',
    'estado',
    'seleccionar',
  ];
  // Añade estas propiedades a tu componente
  vistaActual: 'canciones' | 'usuarios' = 'canciones';
  usuarios: any[] = []; // Ajusta el tipo según tu modelo de usuario
  columnasUsuarios = ['nombre', 'email', 'rol', 'acciones'];
  cambiarVista(event: MatTabChangeEvent): void {
    this.vistaActual = event.index === 0 ? 'canciones' : 'usuarios';

    if (this.vistaActual === 'usuarios' && this.usuarios.length === 0) {
      this.cargarUsuarios();
    }
  }

  // Método para cargar usuarios (ajusta según tu API)
  cargarUsuarios(): void {
    this.cancionService.getUsuarios().subscribe({
      next: (usuarios: any) => {
        this.usuarios = usuarios.usuarios;
        console.log(this.usuarios);
      },
      error: (error: any) => {
        console.error('Error al cargar los usuarios:', error);
      },
    });
  }
  assertPublicada(n: number) {
    return n === 1 ? 'Publicada' : 'Pendiente de revisión';
  }
  constructor(
    private cancionService: CancionService,
    private dialog: MatDialog
  ) {
    this.selectList = [];
    cancionService.getCancionesAdmin().subscribe({
      next: (canciones) => {
        this.canciones = canciones.canciones;
        this.aplicarFiltros();
        console.log(this.canciones);
        this.cancionesFiltradas = this.canciones;
      },
      error: (error) => {
        console.error('Error al cargar las canciones:', error);
      },
    });
  }

  ngOnInit() {
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    setTimeout(() => {
      this.cancionesFiltradas = this.canciones.filter((cancion: any) => {
        const textoBusqueda = this.filtros.busqueda.toLowerCase();
        const coincideBusqueda =
          !this.filtros.busqueda ||
          cancion.titulo?.toLowerCase().includes(textoBusqueda) ||
          cancion.artista?.nombre?.toLowerCase().includes(textoBusqueda);

        const coincideGenero =
          !this.filtros.genero ||
          cancion.genero?.nombre === this.filtros.genero;

        const ratingCancion = cancion.rating ?? 0;
        const coincideRating = ratingCancion >= (this.filtros.ratingMin ?? 0);

        return coincideBusqueda && coincideGenero && coincideRating;
      });
    }, 1000);
    console.log(this.filtros);
    console.log('Canciones filtradas:', this.cancionesFiltradas);
  }

  toggleSeleccionTodas(seleccionar: boolean): void {
    this.cancionesFiltradas.forEach((c: any) => (c.seleccionada = seleccionar));

    if (seleccionar) {
      this.anadirTodas();
      this.cancionesFiltradas.forEach((c: any) => {});
    } else {
      this.removerTodas();
    }
    this.actualizarEstadoHeader();
  }

  anadirALista(cancion: any): void {
    const id = cancion.id;
    const index = this.selectList.indexOf(id);

    if (index !== -1) {
      this.selectList.splice(index, 1);
      console.log(`Canción ${id} removida de la lista`);
    } else {
      this.selectList.push(id);
      console.log(`Canción ${id} agregada a la lista`);
    }
    console.log('Lista actual:', this.selectList);
  }

  anadirTodas() {
    this.cancionesFiltradas.forEach((c: any) => {
      const id = c.id;
      if (!this.selectList.includes(id)) {
        this.selectList.push(id);
        console.log(`Canción ${id} agregada a la lista`);
      }
    });
    console.log('Lista actual:', this.selectList);
  }

  removerTodas() {
    this.cancionesFiltradas.forEach((c: any) => {
      const id = c.id;
      const index = this.selectList.indexOf(id);
      if (index !== -1) {
        this.selectList.splice(index, 1);
        console.log(`Canción ${id} removida de la lista`);
      }
    });
    console.log('Lista actual:', this.selectList);
  }

  actualizarEstadoHeader(): void {
    const total = this.cancionesFiltradas.length;
    const seleccionadas = this.cancionesFiltradas.filter(
      (c: any) => c.seleccionada
    ).length;
    this.todasSeleccionadas = seleccionadas === total && total > 0;
  }
  limpiarFiltros() {
    this.filtros = {
      busqueda: '',
      genero: '',
      ratingMin: 0,
    };
    this.filtrado = false;
    this.aplicarFiltros();
  }

  eliminarCancion() {
    if (this.selectList.length === 0) {
      console.warn('No hay canciones seleccionadas');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      data: {
        title: 'Quieres eliminar ' + this.selectList.length + ' canciones?',
        message: 'Este proceso no se puede revertir',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Lógica para eliminar las canciones
        console.log('Eliminando canciones:', this.selectList);
        this.selectList.forEach((id: any) => {
          this.cancionService.eliminarCancion(id).subscribe((res) => {
            console.log(res);
            this.cancionesFiltradas = this.cancionesFiltradas.filter(
              (c: any) => c.id !== id
            );
            this.selectList = [];
            this.toggleSeleccionTodas(false);
          });
        });
      }
    });
  }
}
