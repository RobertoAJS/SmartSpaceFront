import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FavoritoListar } from './favoritolistar/favoritolistar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorito',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FavoritoListar],
  templateUrl: './favorito.html',
  styleUrl: './favorito.css'
})
export class Favorito {
    currentChild: boolean = false;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
      this.route.url.subscribe(() => {
        this.currentChild = !!this.route.firstChild;
      });
    }
}