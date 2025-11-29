import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuarioservice';

@Component({
  selector: 'app-usuariolistar',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterLink, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,],
  templateUrl: './usuariolistar.html',
  styleUrl: './usuariolistar.css',
})
export class Usuariolistar implements OnInit{
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  filterValue: string = '';

  constructor(private uS: UsuarioService) {}

  ngOnInit(): void {
    this.cargarDatos();

    // para refrescar la tabla cuando insertes/actualices desde otro componente
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.configurarFiltro();
    });
  }

  cargarDatos(): void {
    this.uS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.configurarFiltro();
    });
  }

  configurarFiltro() {
    this.dataSource.filterPredicate = (data: Usuario, filter: string) => {
      const t = filter.trim().toLowerCase();
      return (
        data.username.toLowerCase().includes(t) ||
        data.nombre.toLowerCase().includes(t) ||
        data.email.toLowerCase().includes(t)
      );
    };
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterValue = value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  clearFilter() {
    this.filterValue = '';
    this.dataSource.filter = '';
  }

  eliminar(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;

    this.uS.delete(id).subscribe(() => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}