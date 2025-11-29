import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './comentario.html',
  styleUrl: './comentario.css'
})
export class Comentario {
  constructor(public route: ActivatedRoute) {}
}