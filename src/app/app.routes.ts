import { Routes } from '@angular/router';
import { Usuarioinsert } from './components/usuario/usuarioinsert/usuarioinsert';
import { Landing } from './components/landing/landing';
import { Login } from './components/auth/login/login';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { Usuariolistar } from './components/usuario/usuariolistar/usuariolistar';
import { Usuariosearch } from './components/usuario/usuariosearch/usuariosearch';
import { Usuario } from './components/usuario/usuario';
import { Home } from './components/home/home';
import { Mueble } from './components/mueble/mueble';
import { Mueblelistar } from './components/mueble/mueblelistar/mueblelistar';
import { Muebleinsert } from './components/mueble/muebleinsert/muebleinsert';

export const routes: Routes = [
  { path: 'landing', component: Landing }, // Landing pública

  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'register', component: Usuarioinsert, canActivate: [guestGuard] }, // solo registro

  { path: 'home', component: Home, canActivate: [authGuard] },

  {
    path: 'usuarios',
    component: Usuario,
    canActivate: [authGuard],
    children: [
      { path: '', component: Usuariolistar },
      { path: 'news', component: Usuarioinsert },
      { path: 'edits/:id', component: Usuarioinsert },
      { path: 'searchs', component: Usuariosearch },
    ],
  },

  {
    path: 'muebles',
    component: Mueble,
    canActivate: [authGuard], // cualquier usuario autenticado (ADMIN o CLIENTE)
    children: [
      { path: '', component: Mueblelistar },
      { path: 'news', component: Muebleinsert },
      { path: 'edits/:id', component: Muebleinsert },
    ],
  },

  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: '**', redirectTo: 'landing' },
];
