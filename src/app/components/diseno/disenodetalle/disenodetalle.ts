import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DisenoService } from '../../../services/disenoservice';
import { ComentarioService } from '../../../services/comentarioservice';
import { Authservice } from '../../../services/authservice';
import { Diseno } from '../../../models/diseno';
import { Comentario } from '../../../models/comentario';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-disenodetalle',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './disenodetalle.html',
  styleUrls: ['./disenodetalle.css']
})
export class DisenoDetalle implements OnInit {

  id!: number;
  diseno: Diseno = new Diseno();
  comentarios: Comentario[] = [];
  nuevoComentario: string = '';

  constructor(
    private route: ActivatedRoute,
    private dS: DisenoService,
    private cS: ComentarioService,
    public auth: Authservice          // ← OJO: public para usar en el HTML
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarDiseno();
    this.cargarComentarios();
  }

  cargarDiseno() {
    this.dS.listId(this.id).subscribe(res => {
      this.diseno = res;

      if (!this.diseno.usuario && (this.diseno.userId || this.diseno.username)) {
        this.diseno.usuario = this.diseno.usuario || {
          idUsuario: this.diseno.userId || 0,
          username: this.diseno.username || 'Desconocido'
        };

      }

      if (this.diseno.fechaCreacion) {
        this.diseno.fechaCreacion = new Date(this.diseno.fechaCreacion);
      }
    });
  }

  cargarComentarios() {
    this.cS.listByDesign(this.id).subscribe({
      next: (res) => {
        console.log("📌 Comentarios backend:", res);

        this.comentarios = res.map(c => ({
          idComentario: c.idComentario,
          idDiseno: c.idDiseno,
          nombreDiseno: c.nombreDiseno,
          idUsuario: c.idUsuario,
          username: c.username,
          textoComentario: c.textoComentario,
          fecha: c.fecha ? new Date(c.fecha) : undefined
        }));
      },
      error: (err) => console.error("❌ Error cargando comentarios:", err)
    });
  }

  comentar() {
    if (!this.nuevoComentario.trim()) return;

    const comentario: Comentario = {
      textoComentario: this.nuevoComentario,
      fecha: new Date(),
      idUsuario: this.auth.getUserId(),
      idDiseno: this.id
    };

    this.cS.insert(comentario).subscribe({
      next: () => {
        this.nuevoComentario = '';
        this.cargarComentarios();   // ← recarga lista después de comentar
      },
      error: (err) => {
        console.error("❌ Error comentando:", err);
        alert("No se pudo registrar el comentario");
      }
    });
  }

  eliminar(id: number | undefined) {
    if (!id) return;
    if (!confirm("¿Eliminar comentario?")) return;

    this.cS.delete(id).subscribe({
      next: () => {
        // 👉 Versión robusta: recargar desde el backend
        this.cargarComentarios();

        // Si quieres sin ir al backend, sería:
        // this.comentarios = this.comentarios.filter(c => c.idComentario !== id);
      },
      error: (err) => {
        console.error("❌ Error eliminando comentario:", err);
        alert("No se pudo eliminar el comentario");
      }
    });
  }

  abrirArchivo() {
    if (this.diseno?.archivoUrl) {
      window.open(environment.uploadUrl + this.diseno.archivoUrl, '_blank');
    }
  }
}
