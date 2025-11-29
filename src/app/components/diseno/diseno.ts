import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DisenoListar } from './disenolistar/disenolistar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diseno',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DisenoListar],
  templateUrl: './diseno.html',
  styleUrl: './diseno.css',
})
export class Diseno {
    currentChild: boolean = false;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
      this.route.url.subscribe(() => {
        this.currentChild = !!this.route.firstChild;
      });
    }
}