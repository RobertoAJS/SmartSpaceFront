import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Authservice } from '../../services/authservice';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(private authService: Authservice, private router: Router) {}

  logout(): void {
    this.authService.clearToken();   // borra el token
    this.router.navigate(['/home']); // te manda otra vez a la landing
  }
}
