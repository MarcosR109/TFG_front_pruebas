import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MatFormField,
  MatFormFieldControl,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Linea } from '../cancion/linea';
import { TextBoxesComponent } from '../text-boxes/text-boxes.component';
import { MatSelectModule } from '@angular/material/select';
import { Cancion } from '../cancion/cancion';
import { artistas } from '../artistas';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Artistas } from '../artistas';
import { generos } from '../generos';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { CancionService } from '../cancion.service';
import { MobileService } from '../mobile.service';
import { MobileboxesComponent } from '../mobileboxes/mobileboxes.component';
@Component({
  selector: 'app-textinput',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatButton,
    TextBoxesComponent,
    MatButtonModule,
    MatInput,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MobileboxesComponent,
  ],
  templateUrl: './textinput.component.html',
  styleUrl: './textinput.component.css',
})
export class TextinputComponent {
  tonalidades = [
    { id: 1, nombre: 'C' },
    { id: 2, nombre: 'Cm' },
    { id: 3, nombre: 'G' },
    { id: 4, nombre: 'Gm' },
    { id: 5, nombre: 'D' },
    { id: 6, nombre: 'Dm' },
    { id: 7, nombre: 'A' },
    { id: 8, nombre: 'Am' },
    { id: 9, nombre: 'E' },
    { id: 10, nombre: 'Em' },
    { id: 11, nombre: 'B' },
    { id: 12, nombre: 'Bm' },
    { id: 13, nombre: 'F' },
    { id: 14, nombre: 'Fm' },
    { id: 15, nombre: 'Bb' },
    { id: 16, nombre: 'Bbm' },
    { id: 17, nombre: 'Eb' },
    { id: 18, nombre: 'Ebm' },
    { id: 19, nombre: 'Ab' },
    { id: 20, nombre: 'Abm' },
    { id: 21, nombre: 'Db' },
    { id: 22, nombre: 'Dbm' },
    { id: 23, nombre: 'Gb' },
    { id: 24, nombre: 'Gbm' },
  ];
  @Output()
  emisor = new EventEmitter<string[]>();
  cancion: Cancion = {};
  texto: string = '';
  text: Array<string> = [];
  lineas: Linea[] = [];
  enviado: boolean = false;
  bin: boolean = true;
  metricaInicial = 'bin';
  tonalidadSeleccionada!: { id: number; nombre: string } | null;
  artistaSeleccionado!: { id: number; nombre: string } | null;
  artistas: Artistas = artistas;
  artistasFiltrados = this.artistas.artistas;
  inputTexto = ''; // Para mostrar el valor en el input
  generos = generos;
  generoSeleccionado = { id: 1, nombre: 'Pop' };
  revisable!: any;
  esRevision: boolean = false;
  esEdicion: boolean = false;
  esMovil: boolean = false;
  error!: any;
  constructor(
    route: ActivatedRoute,
    cancionService: CancionService,
    private mobileService: MobileService
  ) {
    let id = route.snapshot.params['id'];
    this.esEdicion = route.snapshot.params['edicion'] == 'true';
    console.log(this.esEdicion);
    this.cancion.privada = true;
    if (id) {
      cancionService.getCancion(id).subscribe((res) => {
        this.revisable = res.cancion;
        console.log(this.revisable);
        this.cancion = this.revisable;
        this.texto = (this.cancion.lineas ?? [])
          .map((linea) => linea.texto + '\n')
          .join('');
        this.tonalidadSeleccionada =
          this.tonalidades.find(
            (tonalidad) => tonalidad.nombre === this.cancion.tonalidad
          ) || null;
        console.log(this.tonalidadSeleccionada);
        this.cancion.metrica = this.cancion.metrica == 'bin' ? 'bin' : 'ter';
        this.metricaInicial = this.cancion.metrica == 'bin' ? 'bin' : 'ter';
        this.bin = this.cancion.metrica == 'bin' ? true : false;
        this.artistaSeleccionado =
          artistas.artistas.find(
            (artista) => artista.id === this.cancion.artista_id
          ) || null;
        this.generoSeleccionado = this.generos.generos.find(
          (genero: any) => genero.nombre === this.cancion.genero
        ) || { id: 1, nombre: 'Pop' };
        console.log(this.generoSeleccionado);
        this.lineas = this.cancion.lineas || []; // Inicializa lineas si es undefined
      });
      this.esRevision = true;
    }
    this.text = [];
    this.cancion.capo = 0;
    this.cancion.rating = 0;
    this.cancion.comentario = 'no';
    this.cancion.var = 'no';
  }

  ngOnInit() {
    this.mobileService.isMobile$.subscribe((isMobile) => {
      this.esMovil = isMobile;
      console.log(this.esMovil);
    });
  }

  filtrarArtistas(event: any) {
    const filtro = event.target.value.toLowerCase();
    this.inputTexto = event.target.value; // Actualiza el texto del input
    this.artistaSeleccionado = null; // Resetear la selección si el usuario escribe
    this.artistasFiltrados = filtro
      ? this.artistas.artistas.filter((artista) =>
          artista.nombre.toLowerCase().includes(filtro)
        )
      : this.artistas.artistas;
  }

  seleccionarArtista(artista: { id: number; nombre: string }) {
    this.artistaSeleccionado = artista; // Guarda el objeto completo
    this.inputTexto = artista.nombre; // Actualiza el input con el nombre seleccionado
  }

  modificarMetrica(lineas: Linea[]) {
    if (this.cancion.metrica == 'bin' && this.metricaInicial == 'ter') {
      lineas.forEach((linea) => {
        linea.acordes.push({
          posicion_en_compas: 3,
          acorde: '',
          variacion: '',
          grado: 0,
          effect: 'copy',
          id: 169,
        }); //Meter un acorde en la cuarta posición de cada línea
      });
    }
    console.log(lineas);
    if (this.cancion.metrica == 'ter' && this.metricaInicial == 'bin') {
      lineas.forEach((linea) => {
        linea.acordes.pop(); //Eliminar el acorde de la cuarta posición de cada línea
      });
    }
    console.log('Cambiando métrica de la canción');
  }

  romperTexto(lines: string) {
    /*if (
      !this.cancion.titulo ||
      !this.texto ||
      this.cancion.privada == null ||
      this.generoSeleccionado == null ||
      this.tonalidadSeleccionada == null ||
      this.cancion.capo == null
    ) {
      this.error = 'Porfavor completa todos los campos requeridos.';
      return;
    }*/
    this.text = lines.trim().split('\n');
    console.log(this.text);
    this.enviado = true;
    this.cancion.artista_id = this.artistaSeleccionado?.id;
    this.cancion.tonalidade_id = this.tonalidadSeleccionada?.id;
    this.cancion.tonalidad = this.tonalidadSeleccionada?.nombre;
    this.cancion.artista = this.artistaSeleccionado?.nombre;
    this.cancion.genero_id = this.generoSeleccionado?.id;
    this.cancion.genero = this.generoSeleccionado?.nombre;
    this.cancion.metrica = this.bin ? 'bin' : 'ter';
    console.log(this.artistaSeleccionado);
    console.log(this.tonalidadSeleccionada);
    console.log(this.cancion);
    if (this.metricaInicial != this.cancion.metrica) {
      this.modificarMetrica(this.cancion.lineas || []);
    }
    console.log('ES EDICION', this.esEdicion);
    console.log('ES REVISION', this.esRevision);

    if (!this.esRevision && !this.esEdicion) {
      this.text.forEach((line) => {
        if (this.bin) {
          let acordesV = [
            {
              posicion_en_compas: 0,
              acorde: '',
              variacion: '',
              grado: 0,
              effect: 'copy',
              id: 169,
            },
            {
              posicion_en_compas: 1,
              acorde: '',
              variacion: '',
              grado: 0,
              effect: 'copy',
              id: 169,
            },
            {
              posicion_en_compas: 2,
              acorde: '',
              variacion: '',
              grado: 0,
              effect: 'copy',
              id: 169,
            },
            {
              posicion_en_compas: 3,
              acorde: '',
              variacion: '',
              grado: 0,
              effect: 'copy',
              id: 169,
            },
          ];
          const nuevaLinea: Linea = {
            texto: line,
            n_linea: this.lineas.length + 1,
            acordes: acordesV,
          };
          this.lineas.push(nuevaLinea);
          this.cancion.lineas = this.lineas;
          this.cancion.metrica = 'bin';
        } else {
          let acordesT = [
            {
              posicion_en_compas: 0,
              acorde: '',
              variacion: '',
              grado: 0,
              effect: 'copy',
              id: 169,
            },
            {
              posicion_en_compas: 1,
              acorde: '',
              variacion: '',
              grado: 0,
              effect: 'copy',
              id: 169,
            },
            {
              posicion_en_compas: 2,
              acorde: '',
              variacion: '',
              grado: 0,
              effect: 'copy',
              id: 169,
            },
          ];
          const nuevaLinea: Linea = {
            texto: line,
            n_linea: this.lineas.length + 1,
            acordes: acordesT,
          };
          this.lineas.push(nuevaLinea);
          this.cancion.lineas = this.lineas;
          this.cancion.metrica = 'ter';
        }
      });
    }
    console.log(this.cancion);
  }
}
