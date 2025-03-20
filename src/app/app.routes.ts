import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CancionesListComponent } from './canciones-list/canciones-list.component';
import { CancionDetailComponent } from './cancion-detail/cancion-detail.component';
import { CancionesMineComponent } from './canciones-mine/canciones-mine.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CancionFormComponent } from './cancion-form/cancion-form.component';
import { CancioneslistfComponent } from './cancioneslistf/cancioneslistf.component';
import { CancionComponent } from './cancion/cancion.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'canciones', component: CancionesListComponent },
  { path: 'canciones/:title', component: CancioneslistfComponent },
  { path: 'canciones/show/:id', component: CancionComponent },
  { path: 'canciones/mine', component: CancionesMineComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'canciones/create', component: CancionFormComponent },
  { path: 'debug', component: CancionComponent },
];
