import { Routes } from '@angular/router';
import { Usuarioinsert } from './components/usuario/usuarioinsert/usuarioinsert';
import { Landing } from './components/landing/landing';
import { Login } from './components/auth/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { Usuariolistar } from './components/usuario/usuariolistar/usuariolistar';
import { Usuariosearch } from './components/usuario/usuariosearch/usuariosearch';
import { roleGuard } from './guards/role.guard';
import { MuebleListar } from './components/mueble/mueblelistar/mueblelistar';
import { MuebleInsert } from './components/mueble/muebleinsert/muebleinsert';
import { mueblesearch } from './components/mueble/mueblesearch/mueblesearch';

export const routes: Routes = [
  { path: 'home', component: Landing },          // Landing pública
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'register', component: Usuarioinsert, canActivate: [guestGuard] },  // solo registro


  { path: 'dashboard', component: Dashboard, canActivate: [authGuard], // protegida
    children: [
      { path: 'usuarios', component: Usuariolistar, canActivate: [roleGuard('ADMIN')] },
      { path: 'usuarios/news', component: Usuarioinsert, canActivate: [roleGuard('ADMIN')] },
      { path: 'usuarios/edits/:id', component: Usuarioinsert, canActivate: [roleGuard('ADMIN')] },
      { path: 'usuarios/searchs', component: Usuariosearch, canActivate: [roleGuard('ADMIN')] },

      { path: 'muebles', component: MuebleListar, canActivate: [roleGuard('ADMIN')] },
      { path: 'muebles/new', component: MuebleInsert, canActivate: [roleGuard('ADMIN')] },
      { path: 'muebles/edit/:id', component: MuebleInsert, canActivate: [roleGuard('ADMIN')] },
      { path: 'muebles/searchs', component: mueblesearch, canActivate: [roleGuard('ADMIN')] },

    ],
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
  
];
