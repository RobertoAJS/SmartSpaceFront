import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuarioservice';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-usuarioinsert',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
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
      username: ['', Validators.required],
      nombre: ['', Validators.required],
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
          // limpiar como querías
          this.form.reset();
        },
        error: (err) => {
          console.error('Error en registro', err);
        }
      });
    }
  }
}
