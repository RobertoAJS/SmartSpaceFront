import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuarioservice';

@Component({
  selector: 'app-usuariosearch',
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
  templateUrl: './usuariosearch.html',
  styleUrl: './usuariosearch.css',
})
export class Usuariosearch {
  username: string = '';
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  errorMessage: string = '';

  constructor(private uS: UsuarioService) {}

  buscar(): void {
    this.errorMessage = '';
    this.dataSource.data = [];

    const criterio = this.username.trim();
    if (!criterio) {
      this.errorMessage = 'Ingresa un username para buscar.';
      return;
    }

    this.uS.searchUsername(criterio).subscribe({
      next: (user: Usuario) => {
        this.dataSource.data = [user];
      },
      error: (err) => {
        if (err.status === 404) {
          this.errorMessage = 'No se encontró usuario con ese username.';
        } else {
          console.error(err);
          this.errorMessage = 'Ocurrió un error al buscar el usuario.';
        }
      },
    });
  }

  limpiar(): void {
    this.username = '';
    this.dataSource.data = [];
    this.errorMessage = '';
  }
}
