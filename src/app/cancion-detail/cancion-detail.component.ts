import { Component } from '@angular/core';
import { Cancion } from '../cancion/cancion';
import { RouterLink } from '@angular/router';
import { CancionService } from '../cancion.service';
import { ActivatedRoute } from '@angular/router';
import { TextBoxesComponent } from '../text-boxes/text-boxes.component';
@Component({
  selector: 'app-cancion-detail',
  imports: [TextBoxesComponent],
  templateUrl: './cancion-detail.component.html',
  styleUrl: './cancion-detail.component.css',
})
export class CancionDetailComponent {
  cancion: Cancion = {};
  bin: boolean = true;
  constructor(private cancionS: CancionService, private rute: ActivatedRoute) {
    this.cancionS.getCancion(rute.snapshot.params['id']).subscribe((data) => {
      this.cancion = data.cancion;
      if (data.cancion.metrica != 'bin') {
        this.bin = false;
      }
      console.log(this.cancion);
    });
  }
}
