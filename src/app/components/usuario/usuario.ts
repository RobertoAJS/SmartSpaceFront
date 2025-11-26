import { Component } from '@angular/core';
import { Usuarioinsert } from './usuarioinsert/usuarioinsert';
import { ActivatedRoute, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [Usuarioinsert, RouterOutlet],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario {
  constructor(public route:ActivatedRoute) {}
}
