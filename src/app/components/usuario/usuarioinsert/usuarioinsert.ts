import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuarioservice';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-usuarioinsert',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './usuarioinsert.html',
  styleUrl: './usuarioinsert.css',
})
export class Usuarioinsert implements OnInit {
  form: FormGroup = new FormGroup({});
  user: Usuario = new Usuario();

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.user.username = this.form.value.username;
      this.user.nombre = this.form.value.nombre;
      this.user.email = this.form.value.email;
      this.user.password = this.form.value.password;
      this.user.statusUsuario = true;

      this.uS.insert(this.user).subscribe({
        next: (_msg) => {
          // mensaje + limpiar + redirigir al login
          alert('Usuario registrado correctamente. Ahora inicia sesión.');
          this.form.reset();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error en registro', err);
          alert('Ocurrió un error al registrar el usuario. Inténtalo nuevamente.');
        },
      });
    }
  }
}
