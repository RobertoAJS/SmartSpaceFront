import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Diseno } from '../../../models/diseno';
import { DisenoService } from '../../../services/disenoservice';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-disenolistar',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './disenolistar.html',
  styleUrl: './disenolistar.css',
})
export class DisenoListar implements OnInit {
  displayedColumns: string[] = [
    'c1', 'c2', 'c3', 'c4', 'c5', 'detalle', 'c6'
  ];
  dataSource = new MatTableDataSource<Diseno>();
  uploadUrl = environment.uploadUrl;

  constructor(private dS: DisenoService) {}

  ngOnInit(): void {
    this.cargarDatos();

    this.dS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  cargarDatos() {
    this.dS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este diseño?')) return;

    this.dS.delete(id).subscribe(() => {
      this.dS.list().subscribe((data) => {
        this.dS.setList(data);
      });
    });
  }
}