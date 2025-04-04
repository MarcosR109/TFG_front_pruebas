import { Injectable } from '@angular/core';
import { Cancion } from './cancion/cancion';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  switchMap,
} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CancionService {
  constructor(private http: HttpClient) {}
  URL = 'http://localhost:8000/api/';
  private canciones: any[] = [];
  private filtrosSubject = new BehaviorSubject<any>({});
  cancionesFiltradas$ = this.filtrosSubject.asObservable();
  setCanciones(canciones: any[]) {
    this.canciones = [...canciones];
    this.filtrosSubject.next({}); // Emitir filtros vacíos para mostrar todos
    console.log(this.canciones);
  }

  actualizarFiltros(filtros: any) {
    this.filtrosSubject.next(filtros);
    console.log(filtros);
  }

  public filtrar(canciones: any[], filtros: any): any[] {
    return canciones.filter((cancion) => {
      console.log('CANCIONES', canciones);
      console.log('FILTROS', filtros);

      const coincideTitulo =
        !filtros.titulo ||
        cancion.titulo.toLowerCase().includes(filtros.titulo.toLowerCase());
      const coincideArtista =
        !filtros.artista || cancion.artista === filtros.artista;
      const coincideGenero =
        !filtros.genero || cancion.genero === filtros.genero;
      const coincideRating =
        !filtros.calificacion || cancion.rating >= filtros.calificacion;
      console.log('Genero', coincideGenero);

      return (
        coincideTitulo && coincideArtista && coincideGenero && coincideRating
      );
    });
  }

  getUsuarios() {
    return this.http.get<{ message: String; usuarios: any[] }>(
      this.URL + 'admin/usuarios'
    );
  }
  getCancionesAdmin() {
    return this.http.get<{ message: String; canciones: any[] }>(
      this.URL + 'canciones/lista/admin'
    );
  }
  enviarCancion(cancion: Cancion) {
    this.http.post(this.URL + 'canciones', cancion).subscribe((res) => {
      console.log(res);
    });
  }
  editarCancion(cancion: Cancion) {
    this.http
      .put(this.URL + 'canciones/' + cancion.id + ' /editar', cancion)
      .subscribe((res) => {
        console.log(res);
      });
  }
  revisarCancion(cancion: Cancion) {
    this.http
      .put(this.URL + 'canciones/' + cancion.id + ' /revisar', cancion)
      .subscribe((res) => {
        console.log(res);
      });
  }

  getCanciones() {
    return this.http.get<{ message: String; canciones: any[] }>(
      this.URL + 'canciones'
    );
  }
  getMine() {
    return this.http.get<{ message: String; canciones: any[] }>(
      this.URL + 'users/favoritos/list'
    );
  }
  getCancionesByTitle(title: string) {
    return this.http.get<{ message: String; canciones: any[] }>(
      this.URL + 'canciones/' + title + '/list'
    );
  }

  getCancion(id: number) {
    return this.http.get<{ cancionMessage: string; cancion: Cancion }>(
      this.URL + 'canciones/' + id
    );
  }

  addRating(rate: number, id: number) {
    return this.http.post(this.URL + 'canciones/' + id + '/rate', {
      rate,
    });
  }
  addFavorito(id: number) {
    return this.http.post(this.URL + 'users/' + id + '/favoritos', {});
  }
  checkFavorito(id: number) {
    return this.http.get(this.URL + 'users/' + id + '/favoritos');
  }
  addGuardado(id: number) {
    return this.http.put(this.URL + 'users/' + id + '/guardados', {});
  }
  checkGuardado(id: number) {
    return this.http.get(this.URL + 'users/' + id + '/guardados');
  }
  quitarGuardado(id: number) {
    return this.http.delete(this.URL + 'users/' + id + '/guardados');
  }
  quitarFavorito(id: number) {
    return this.http.delete(this.URL + 'users/' + id + '/favoritos');
  }
  buscarPorArtista(artista: string) {
    console.log('BUSCANDO POR ARTISTA', artista);
    return this.http.get<{ message: string; canciones: Cancion[] }>(
      this.URL + 'canciones/' + artista + '/lista'
    );
  }
  getCancionesArevisar() {
    return this.http.get<{ message: String; canciones: any[] }>(
      this.URL + 'canciones/lista/revisar'
    );
  }
  actualizarBadge() {
    return this.http.get<any>(this.URL + 'badge');
  }
  eliminarCancion(id: number) {
    return this.http.delete(this.URL + 'canciones/' + id);
  }
}

//
