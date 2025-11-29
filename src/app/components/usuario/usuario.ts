import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Usuariolistar } from './usuariolistar/usuariolistar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, Usuariolistar, RouterOutlet],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario {
    currentChild: boolean = false;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
      this.route.url.subscribe(() => {
        this.currentChild = !!this.route.firstChild;
      });
    }
}