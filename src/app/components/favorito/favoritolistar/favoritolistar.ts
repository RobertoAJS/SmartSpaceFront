import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';

import { FavoritoService } from '../../../services/favoritoservice';
import { Favorito } from '../../../models/favorito';

@Component({
  selector: 'app-favoritolistar',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    
  ],
  templateUrl: './favoritolistar.html',
  styleUrl: './favoritolistar.css',
})
export class FavoritoListar implements OnInit {

  displayedColumns: string[] = ['id', 'mueble', 'fecha', 'acciones'];
  dataSource = new MatTableDataSource<Favorito>();

  constructor(private fS: FavoritoService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.fS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar favorito?')) return;

    this.fS.delete(id).subscribe(() => {
      this.cargarDatos();
    });
  }
}