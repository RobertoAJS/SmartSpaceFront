import { Routes } from '@angular/router';
import { Usuarioinsert } from './components/usuario/usuarioinsert/usuarioinsert';
import { Landing } from './components/landing/landing';


export const routes: Routes = [
  { path: 'home', component: Landing },          // Landing pública
  { path: 'register', component: Usuarioinsert },  // solo registro
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
