import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CancionesListComponent } from './canciones-list/canciones-list.component';
import { CancionDetailComponent } from './cancion-detail/cancion-detail.component';
import { CancionesMineComponent } from './canciones-mine/canciones-mine.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CancionFormComponent } from './cancion-form/cancion-form.component';
import { CancioneslistfComponent } from './cancioneslistf/cancioneslistf.component';
import { CancionComponent } from './cancion/cancion.component';
import { RevisionesComponent } from './revisiones/revisiones.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'canciones', component: CancionesListComponent },
  { path: 'canciones/mine', component: CancionesMineComponent },
  { path: 'canciones/show/:id', component: CancionComponent },
  { path: 'canciones/search/:query', component: CancioneslistfComponent },
  { path: 'canciones/create', component: CancionFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'revisiones', component: RevisionesComponent},
  { path: 'debug', component: CancionComponent },
  { path: 'revisiones/:id', component: CancionFormComponent},
];
