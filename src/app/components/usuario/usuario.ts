import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Usuariolistar } from './usuariolistar/usuariolistar';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [Usuariolistar, RouterOutlet],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario {
  constructor(public route:ActivatedRoute) {}
}
