import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../../models/login';
import { Authservice } from '../../../services/authservice';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], 
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{
  form: FormGroup = new FormGroup({});
  loginData: LoginRequest = new LoginRequest();

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: Authservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login(): void {
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Corrige los errores del formulario.';
      return;
    }

    this.loginData.username = this.form.value.username;
    this.loginData.password = this.form.value.password;

    this.isLoading = true;

    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        this.isLoading = false;

        // 👇 OJO: ajusta la propiedad según tu LoginResponse
        this.authService.saveToken(res.token);

        this.form.reset();
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login failed', err);
        this.errorMessage = 'Usuario o contraseña incorrectos.';
  },
});

  }
}
