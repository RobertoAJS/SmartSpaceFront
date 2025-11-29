import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Mueblelistar } from "./mueblelistar/mueblelistar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mueble',
  imports: [CommonModule, RouterOutlet, Mueblelistar],
  templateUrl: './mueble.html',
  styleUrl: './mueble.css',
})
export class Mueble {
    currentChild: boolean = false;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
      this.route.url.subscribe(() => {
        this.currentChild = !!this.route.firstChild;
      });
    }
}