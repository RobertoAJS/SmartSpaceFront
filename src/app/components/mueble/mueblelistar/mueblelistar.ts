import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Mueble } from '../../../models/mueble';
import { Muebleservice } from '../../../services/muebleservice';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mueblelistar',
  imports: [CommonModule, MatTableModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './mueblelistar.html',
  styleUrl: './mueblelistar.css',
})
export class Mueblelistar implements OnInit{

  dataSource: MatTableDataSource<Mueble> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];
  
  constructor(private mS: Muebleservice) {}

  ngOnInit(): void {
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
