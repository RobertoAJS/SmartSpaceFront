import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MuebleService } from '../../../services/muebleservice';
import { Mueble } from '../../../models/mueble';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mueblelistar',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './mueblelistar.html',
  styleUrl: './mueblelistar.css'
})
export class MuebleListar implements OnInit {

  dataSource = new MatTableDataSource<Mueble>();
  displayedColumns = ['id', 'nombre', 'categoria', 'precio', 'accion'];

  constructor(private mS: MuebleService) {}

  ngOnInit(): void {
    this.mS.list().subscribe(data => {
      this.dataSource.data = data;
    });

    this.mS.getList().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  eliminar(id: number) {
    if (!confirm("¿Eliminar mueble?")) return;

    this.mS.delete(id).subscribe(() => {
      this.mS.list().subscribe(data => this.mS.setList(data));
    });
  }
}
