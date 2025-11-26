import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuarioservice';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';


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

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    // Luego vemos si viene con /edits/:id
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
  }

  init(): void {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.user = data;
        // rellenamos el form (menos el password, que será nuevo)
        this.form.patchValue({
          username: data.username,
          nombre: data.nombre,
          email: data.email,
        });
      });
    }
  }

  aceptar(): void {
    if (this.form.valid) {
      this.user.username = this.form.value.username;
      this.user.nombre = this.form.value.nombre;
      this.user.email = this.form.value.email;
      this.user.password = this.form.value.password;
      this.user.statusUsuario = true;

      if (this.edicion) {
        this.uS.update(this.user).subscribe({
          next: () => {
            this.uS.list().subscribe((data) => {
              this.uS.setList(data);
            });
            alert('Usuario actualizado correctamente.');
            this.router.navigate(['/usuarios']);
          },
          error: (err) => {
            console.error('Error al actualizar usuario', err);
            alert('Ocurrió un error al actualizar el usuario.');
          },
        });
      } else {
        this.uS.insert(this.user).subscribe({
          next: (_msg) => {
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
    } else {
      this.form.markAllAsTouched();
    }
  }
}
