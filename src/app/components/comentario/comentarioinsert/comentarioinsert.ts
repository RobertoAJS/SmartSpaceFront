import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComentarioService } from '../../../services/comentarioservice';
import { Authservice } from '../../../services/authservice';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comentarioinsert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comentarioinsert.html',
  styleUrl: './comentarioinsert.css',
})
export class ComentarioInsert {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cS: ComentarioService,
    private auth: Authservice,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      textoComentario: ['', Validators.required],
      idDiseno: ['', Validators.required]
    });
  }

  registrar() {
    if (this.form.invalid) return;

    const envio = {
      idUsuario: this.auth.getUserId(),
      idDiseno: Number(this.form.value.idDiseno),
      textoComentario: this.form.value.textoComentario,
      fecha: new Date()
    };

    this.cS.insert(envio).subscribe({
      next: () => {
        alert('Comentario registrado');
        this.router.navigate(['/comentarios']);
      },
      error: (err) => {
        console.error('❌ Error al registrar comentario:', err);
        alert('No se pudo registrar el comentario');
      }
    });
  }

}
