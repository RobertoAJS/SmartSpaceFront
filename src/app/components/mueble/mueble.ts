import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Mueblelistar } from "./mueblelistar/mueblelistar";

@Component({
  selector: 'app-mueble',
  imports: [RouterOutlet, Mueblelistar],
  templateUrl: './mueble.html',
  styleUrl: './mueble.css',
})
export class Mueble {
  constructor(public route: ActivatedRoute) {}
}
