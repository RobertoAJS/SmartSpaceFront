import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { Comentario } from '../../../models/comentario';
import { ComentarioService } from '../../../services/comentarioservice';
import { Authservice } from '../../../services/authservice';

@Component({
  selector: 'app-comentariolistar',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    
  ],
  templateUrl: './comentariolistar.html',
  styleUrls: ['./comentariolistar.css']
})
export class ComentarioListar implements OnInit {

  displayedColumns: string[] = [
    'id',
    'texto',
    'fecha',
    'diseno',
    'usuario',
    'acciones'
  ];

  dataSource = new MatTableDataSource<Comentario>();

  constructor(
    private cS: ComentarioService,
    private auth: Authservice
  ) {}

  ngOnInit(): void {
    this.listarComentarios();
  }

  listarComentarios() {
    if (this.auth.getRole() === 'ADMIN') {
      this.cS.listAll().subscribe({
        next: data => this.dataSource.data = data,
        error: err => console.error('❌ Error cargando comentarios:', err)
      });
    } else {
      this.dataSource.data = [];
    }
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar comentario?')) return;

    this.cS.delete(id).subscribe(() => {
      this.listarComentarios();
    });
  }
}
