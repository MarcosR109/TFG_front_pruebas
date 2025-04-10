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
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/authguard.service';
import { GuestGuard } from './auth/guestguard.service';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: 'Home' } }, // Pública
  {
    path: 'canciones',
    component: CancionesListComponent,
    data: { title: 'Home' },
  }, // Pública
  {
    path: 'canciones/mine',
    component: CancionesMineComponent,
    canActivate: [AuthGuard],
    data: { title: 'Tus canciones' },
  },
  {
    path: 'canciones/show/:id',
    component: CancionComponent,
    data: { title: 'Canción' },
  }, // Pública
  {
    path: 'canciones/search/:query',
    component: CancioneslistfComponent,
    data: { title: 'Búsqueda' },
  }, // Pública
  {
    path: 'canciones/create',
    component: CancionFormComponent,
    canActivate: [AuthGuard],
    data: { title: 'Crear canción' },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { title: 'Dashboard' },
  },
  {
    path: 'revisiones',
    component: RevisionesComponent,
    canActivate: [AuthGuard],
    data: { title: 'Revisiones' },
  },
  {
    path: 'debug',
    component: CancionComponent,
    canActivate: [AuthGuard],
    data: { title: 'Home' },
  },
  {
    path: 'revisiones/:id',
    component: CancionFormComponent,
    canActivate: [AuthGuard],
    data: { title: 'Revisar canción' },
  },
  {
    path: 'revisiones/:id/:edicion',
    component: CancionFormComponent,
    canActivate: [AuthGuard],
    data: { title: 'Crear canción' },
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
    data: { title: 'Login' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuard],
    data: { title: 'Register' },
  },
];
