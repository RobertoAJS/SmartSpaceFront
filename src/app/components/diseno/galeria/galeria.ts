import { Component, OnInit } from '@angular/core';
import { Muebleservice } from '../../../services/muebleservice';
import { Mueble } from '../../../models/mueble';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [
    CommonModule, 
    MatExpansionModule, // Importante
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css',
})
export class Galeria implements OnInit {
  
  // Filtraremos solo los muebles que tengan diseños
  mueblesConDisenos: Mueble[] = [];

  constructor(private mS: Muebleservice) {}

  ngOnInit(): void {
    this.mS.list().subscribe(data => {
      // Filtramos: Solo queremos ver muebles que tengan al menos 1 diseño subido
      this.mueblesConDisenos = data.filter(m => m.disenos && m.disenos.length > 0);
    });
  }
}
