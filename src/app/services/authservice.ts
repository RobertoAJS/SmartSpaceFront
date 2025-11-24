import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../models/login';
import { Observable, tap } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  // Ajusta la ruta según tu backend: /auth/login, /api/auth/login, etc.
  private url = `${base_url}/auth/login`;
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  // Hace el login y devuelve el JWT envuelto en LoginResponse
  login(body: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(this.url, body, { headers });
  }

  // Guarda el token en localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Obtiene el token
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    } else {
      return null;
    }
  }

  // Elimina el token (logout)
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Opcional: verificar si el token sigue vigente (si tiene "exp")
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) return false;

      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      if (!payload.exp) return true;

      const expMs = payload.exp * 1000;
      return Date.now() < expMs;
    } catch (e) {
      console.error('Error al decodificar token JWT', e);
      return false;
    }
  }
}
