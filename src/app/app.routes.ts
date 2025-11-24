import { Routes } from '@angular/router';
import { Usuarioinsert } from './components/usuario/usuarioinsert/usuarioinsert';
import { Landing } from './components/landing/landing';
import { Login } from './components/auth/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';


export const routes: Routes = [
  { path: 'home', component: Landing },          // Landing pública
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'register', component: Usuarioinsert, canActivate: [guestGuard] },  // solo registro

  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] }, // protegida
  // children: [...] rutas hijas

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
