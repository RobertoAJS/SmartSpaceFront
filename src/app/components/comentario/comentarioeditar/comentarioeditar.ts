import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ComentarioService } from '../../../services/comentarioservice';
import { Comentario } from '../../../models/comentario';

@Component({
  selector: 'app-comentarioeditar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comentarioeditar.html',
  styleUrls: ['./comentarioeditar.css'],
})
export class ComentarioEditar implements OnInit {

  form!: FormGroup;
  id!: number;
  comentario!: Comentario;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cS: ComentarioService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      textoComentario: ['', Validators.required],
      fecha: [{ value: '', disabled: true }],
      username: [{ value: '', disabled: true }],
      nombreDiseno: [{ value: '', disabled: true }]
    });

    this.route.params.subscribe((p: Params) => {
      this.id = p['id'];
      this.cargar();
    });
  }

  cargar() {
    this.cS.listId(this.id).subscribe({
      next: (data) => {
        this.comentario = data;

        this.form.patchValue({
          textoComentario: data.textoComentario,
          fecha: data.fecha,
          username: data.username,
          nombreDiseno: data.nombreDiseno
        });
      },
      error: (err) => console.error('Error cargando comentario', err)
    });
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const actualizado: Comentario = {
      idComentario: this.id,
      idUsuario: this.comentario.idUsuario,
      username: this.comentario.username,
      idDiseno: this.comentario.idDiseno,
      nombreDiseno: this.comentario.nombreDiseno,
      textoComentario: this.form.value.textoComentario,
      fecha: this.comentario.fecha
    };

    this.cS.update(actualizado).subscribe({
      next: () => {
        alert('Comentario actualizado correctamente');
        this.router.navigate(['/comentarios']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar comentario');
      }
    });
  }
}
