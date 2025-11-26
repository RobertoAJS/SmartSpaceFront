import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Authservice } from '../../services/authservice';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
  constructor(
    private authService: Authservice, 
    private router: Router,
    public route: ActivatedRoute
  ) {}

  logout(): void {
    this.authService.clearToken();   // borra el token
    this.router.navigate(['/home']); // te manda otra vez a la landing
  }

  isAdmin: boolean = false;

  ngOnInit() {
    this.isAdmin = this.authService.getRole() === 'ADMIN';
  }

}
