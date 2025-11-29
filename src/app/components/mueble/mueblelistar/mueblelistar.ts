import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { Muebleservice } from '../../../services/muebleservice';
import { FavoritoService } from '../../../services/favoritoservice';
import { Mueble } from '../../../models/mueble';

@Component({
  selector: 'app-mueblelistar',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './mueblelistar.html',
  styleUrl: './mueblelistar.css',
})
export class Mueblelistar implements OnInit {

  displayedColumns: string[] = [
    'c1', 'c2', 'c3', 'c4', 'c5',
    'c6', 'c7', 'c8', 'c9', 'c10',
    'fav'
  ];

  dataSource = new MatTableDataSource<Mueble>();

  constructor(
    private mS: Muebleservice,
    private fS: FavoritoService
  ) {}

  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar mueble?')) return;

    this.mS.delete(id).subscribe(() => {
      this.mS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }

  agregarFavorito(idMueble: number) {
    this.fS.add(idMueble).subscribe({
      next: (msg) => alert(msg),
      error: (err) => alert("Error: " + err.error)
    });
  }
}