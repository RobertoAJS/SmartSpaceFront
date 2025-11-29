import { Component } from '@angular/core';
import { Authservice } from '../../services/authservice';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatToolbarModule, MatMenuModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  role: string = '';
  usuario: string = '';

  constructor(private authService: Authservice, private router: Router) {}

  verificar() {
    this.role = this.authService.getRole(); // "ADMIN" o "CLIENTE"
    this.usuario = this.authService.getUsername(); // username del token
    return this.authService.verificar();
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }

  isCliente() {
    return this.role === 'CLIENTE';
  }

  cerrar() {
    this.authService.logout();
    this.router.navigate(['/landing']);
  }
}