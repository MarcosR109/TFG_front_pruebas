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
  { path: 'home', component: HomeComponent },
  { path: 'canciones', component: CancionesListComponent }, // Pública
  {
    path: 'canciones/mine',
    component: CancionesMineComponent,
    canActivate: [AuthGuard],
  },
  { path: 'canciones/show/:id', component: CancionComponent }, // Pública
  { path: 'canciones/search/:query', component: CancioneslistfComponent }, // Pública
  {
    path: 'canciones/create',
    component: CancionFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'revisiones',
    component: RevisionesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'debug', component: CancionComponent, canActivate: [AuthGuard] },
  {
    path: 'revisiones/:id',
    component: CancionFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'revisiones/:id/:edicion',
    component: CancionFormComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
];
