import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Mueble } from '../../../models/mueble';
import { Muebleservice } from '../../../services/muebleservice';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Authservice } from '../../../services/authservice';
import { MatTooltipModule } from '@angular/material/tooltip'; // Opcional para el tooltip

@Component({
  selector: 'app-mueblelistar',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule // Agregado para que funcione el 'matTooltip'
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './mueblelistar.html',
  styleUrl: './mueblelistar.css',
})
export class Mueblelistar implements OnInit {
  dataSource: MatTableDataSource<Mueble> = new MatTableDataSource();
  displayedColumns: string[] = [];
  role: string = '';

  constructor(private mS: Muebleservice, private authService: Authservice) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();

    // CONFIGURACIÓN DE COLUMNAS
    // c8: Software, c9: Subir 3D, c10: Editar, c11: Eliminar
    if (this.role === 'ADMIN' || this.role === 'CLIENTE') {
      // Ambos roles deberían poder ver y gestionar sus muebles (incluyendo subir 3D)
      this.displayedColumns = [
        'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11'
      ];
    } else {
      // Visitante (Solo lectura)
      this.displayedColumns = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
    }

    // LISTAR DATOS
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este mueble?')) return;

    this.mS.delete(id).subscribe(() => {
      this.mS.list().subscribe((data) => {
        this.mS.setList(data);
      });
    });
  }
}