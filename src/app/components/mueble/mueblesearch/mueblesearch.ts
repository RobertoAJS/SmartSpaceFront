import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Mueble } from '../../../models/mueble';
import { MuebleService } from '../../../services/muebleservice';

@Component({
  selector: 'app-mueblesearch',
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './mueblesearch.html',
  styleUrl: './mueblesearch.css',
})
export class mueblesearch {
  nombre: string = '';
  dataSource: MatTableDataSource<Mueble> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6','c7'];
  errorMessage: string = '';

  constructor(private uS: MuebleService) {}

  buscar(): void {
    this.errorMessage = '';
    this.dataSource.data = [];

    const criterio = this.nombre.trim();
    if (!criterio) {
      this.errorMessage = 'Ingresa una categoria para buscar.';
      return;
    }

    this.uS.searchCategory(criterio).subscribe({
      next: (cat: Mueble[]) => {
        this.dataSource.data = cat;
      },
      error: (er) => {
        if (er.status === 404) {
          this.errorMessage = 'No se encontró mueble con esa categoria.';
        } else {
          console.error(er);
          this.errorMessage = 'Ocurrió un error al buscar el mueble.';
        }
      },
    });
  }

  limpiar(): void {
    this.nombre = '';
    this.dataSource.data = [];
    this.errorMessage = '';
  }
}
