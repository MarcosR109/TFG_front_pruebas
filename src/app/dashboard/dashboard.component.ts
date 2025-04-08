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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
    MatSlideToggleModule,
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
  filtrosCanciones = {
    busqueda: '',
    genero: '',
    ratingMin: 0,
  };
  filtrosUsuarios = {
    busqueda: '',
    role_id: '',
  };
  todasSeleccionadasUsuarios = false;
  algunasSeleccionadasUsuarios = false;
  selectListUsuarios: number[] = []; // Array para IDs de usuarios seleccionados

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

  usuariosFiltrados: any[] = []; // Cambia el tipo según tu modelo de usuario
  usuarios: any[] = []; // Ajusta el tipo según tu modelo de usuario
  columnasUsuarios = ['nombre', 'email', 'rol', 'revisor', 'seleccionar'];
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
        this.usuariosFiltrados = usuarios.usuarios;
        this.usuarios = usuarios.usuarios;
        this.aplicarFiltrosUsuarios();
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
  assertRol(n: number) {
    return n == 1 ? 'Usuario' : n == 2 ? 'Administrador' : 'Revisor';
  }
  cambiarRol(usuario: any) {
    const nuevoRol = usuario.role_id === 1 ? 3 : 1;
    this.cancionService.cambiarRol(usuario.id, nuevoRol).subscribe({
      next: (res) => {
        console.log('Rol cambiado:', res);
        this.cargarUsuarios();
        this.aplicarFiltrosUsuarios();
      },
      error: (error) => {
        console.error('Error al cambiar el rol:', error);
      },
    });
  }
  constructor(
    private cancionService: CancionService,
    private dialog: MatDialog
  ) {
    this.selectList = [];
    cancionService.getCancionesAdmin().subscribe({
      next: (canciones) => {
        this.canciones = canciones.canciones;
        this.aplicarFiltrosCanciones();
        console.log(this.canciones);
        this.cancionesFiltradas = this.canciones;
      },
      error: (error) => {
        console.error('Error al cargar las canciones:', error);
      },
    });
  }

  ngOnInit() {
    this.aplicarFiltrosCanciones();
  }

  aplicarFiltrosCanciones() {
    setTimeout(() => {
      this.cancionesFiltradas = this.canciones.filter((cancion: any) => {
        const textoBusqueda = this.filtrosCanciones.busqueda.toLowerCase();
        const coincideBusqueda =
          !this.filtrosCanciones.busqueda ||
          cancion.titulo?.toLowerCase().includes(textoBusqueda) ||
          cancion.artista?.nombre?.toLowerCase().includes(textoBusqueda);

        const coincideGenero =
          !this.filtrosCanciones.genero ||
          cancion.genero?.nombre === this.filtrosCanciones.genero;

        const ratingCancion = cancion.rating ?? 0;
        const coincideRating =
          ratingCancion >= (this.filtrosCanciones.ratingMin ?? 0);

        return coincideBusqueda && coincideGenero && coincideRating;
      });
    }, 1000);
    console.log(this.filtrosCanciones);
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

  // Método para alternar selección de todos los usuarios
  toggleSeleccionTodasUsuarios(seleccionar: boolean): void {
    this.usuarios.forEach((u: any) => {
      if (u.role_id !== 2) {
        // Solo si no es admin (role_id 2)
        u.seleccionado = seleccionar;
      }
    });

    if (seleccionar) {
      this.anadirTodasUsuarios();
    } else {
      this.removerTodasUsuarios();
    }
    this.actualizarEstadoHeaderUsuarios();
  }

  // Método para añadir/remover usuario individual
  anadirAListaUsuarios(usuario: any): void {
    const id = usuario.id;
    const index = this.selectListUsuarios.indexOf(id);

    if (index !== -1) {
      this.selectListUsuarios.splice(index, 1);
      console.log(`Usuario ${id} removido de la lista`);
    } else {
      this.selectListUsuarios.push(id);
      console.log(`Usuario ${id} agregado a la lista`);
    }
    console.log('Lista de usuarios actual:', this.selectListUsuarios);
  }

  // Método para añadir todos los usuarios válidos
  anadirTodasUsuarios() {
    this.usuarios.forEach((u: any) => {
      const id = u.id;
      if (u.role_id !== 2 && !this.selectListUsuarios.includes(id)) {
        this.selectListUsuarios.push(id);
        console.log(`Usuario ${id} agregado a la lista`);
      }
    });
    console.log('Lista de usuarios actual:', this.selectListUsuarios);
  }

  // Método para remover todos los usuarios
  removerTodasUsuarios() {
    this.selectListUsuarios = [];
    console.log('Todos los usuarios removidos de la lista');
  }

  // Método para actualizar el estado del checkbox del header
  actualizarEstadoHeaderUsuarios(): void {
    const usuariosFiltrados = this.usuarios.filter((u) => u.role_id !== 2);
    const total = usuariosFiltrados.length;
    const seleccionados = usuariosFiltrados.filter(
      (u: any) => u.seleccionado
    ).length;

    this.todasSeleccionadasUsuarios = seleccionados === total && total > 0;
    this.algunasSeleccionadasUsuarios =
      seleccionados > 0 && seleccionados < total;
  }
  limpiarFiltrosCanciones() {
    this.filtrosCanciones = {
      busqueda: '',
      genero: '',
      ratingMin: 0,
    };
    this.filtrado = false;
    this.aplicarFiltrosCanciones();
  }
  aplicarFiltrosUsuarios() {
    setTimeout(() => {
      console.log(this.filtrosUsuarios);

      this.usuariosFiltrados = this.usuarios.filter((usuario: any) => {
        const textoBusqueda = this.filtrosUsuarios.busqueda.toLowerCase();
        const coincideBusqueda =
          !this.filtrosUsuarios.busqueda ||
          usuario.name?.toLowerCase().includes(textoBusqueda) ||
          usuario.email?.toLowerCase().includes(textoBusqueda);

        const coincideRol =
          !this.filtrosUsuarios.role_id ||
          usuario.role_id.toString() == this.filtrosUsuarios.role_id;

        return coincideBusqueda && coincideRol;
      });
      console.log(this.usuariosFiltrados);
    }, 1000);
  }

  limpiarFiltrosUsuarios() {
    this.filtrosUsuarios = {
      busqueda: '',
      role_id: '',
    };
    this.aplicarFiltrosUsuarios();
  }
  eliminarUsuariosSeleccionados() {
    if (this.selectListUsuarios.length === 0) {
      console.warn('No hay usuarios seleccionados');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      data: {
        title:
          'Quieres eliminar ' + this.selectListUsuarios.length + ' usuarios?',
        message: 'Este proceso no se puede revertir',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Eliminando usuarios:', this.selectListUsuarios);
        this.selectListUsuarios.forEach((id: any) => {
          this.cancionService.eliminarUsuario(id).subscribe((res) => {
            console.log(res);
            this.usuarios = this.usuarios.filter((u: any) => u.id !== id);
            this.selectListUsuarios = [];
            this.toggleSeleccionTodasUsuarios(false);
          });
        });
      }
    });
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
