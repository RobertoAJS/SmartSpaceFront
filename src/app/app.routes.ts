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
import { Diseno } from './components/diseno/diseno';
import { DisenoListar } from './components/diseno/disenolistar/disenolistar';
import { DisenoUpload } from './components/diseno/disenoupload/disenoupload';
import { DisenoEditar } from './components/diseno/disenoeditar/disenoeditar';
import { Favorito } from './components/favorito/favorito';
import { FavoritoListar } from './components/favorito/favoritolistar/favoritolistar';
import { Comentario } from './models/comentario';
import { ComentarioListar } from './components/comentario/comentariolistar/comentariolistar';
import { ComentarioInsert } from './components/comentario/comentarioinsert/comentarioinsert';
import { DisenoDetalle } from './components/diseno/disenodetalle/disenodetalle';
import { ComentarioEditar } from './components/comentario/comentarioeditar/comentarioeditar';
import { Mueblesearch } from './components/mueble/mueblesearch/mueblesearch';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: 'landing', component: Landing }, // Landing pública

  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'register', component: Usuarioinsert, canActivate: [guestGuard] }, // solo registro

  { path: 'home', component: Home, canActivate: [authGuard] },

  {
    path: 'usuarios',
    component: Usuario,
    canActivate: [authGuard, adminGuard],
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
      { path: 'searchs', component: Mueblesearch },
    ],
  },

  {
      path: 'disenos',
      component: Diseno,
      canActivate: [authGuard],
      children: [
        { path: '', component: DisenoListar },
        { path: 'upload', component: DisenoUpload },
        { path: 'edits/:id', component: DisenoEditar },
      
        {path: 'detalle/:id', component: DisenoDetalle, canActivate:[authGuard]}
      ],
    },
  
  {
      path: 'favoritos',
      component: Favorito,
      canActivate: [authGuard],
      children: [
        { path: '', component: FavoritoListar },
      ],
    },

  {
      path: 'comentarios',
      component: Comentario,
      canActivate: [authGuard, adminGuard],
      children: [
        { path: '', component: ComentarioListar },
        { path: 'news', component: ComentarioInsert },
        { path: 'edits/:id', component: ComentarioEditar },
      ],
    },




  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: '**', redirectTo: 'landing' },
];
