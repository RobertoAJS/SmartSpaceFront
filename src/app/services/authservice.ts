import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../models/login';
import { Observable } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private url = `${base_url}/auth/login`;
  private tokenKey = 'authToken';   // <--- El token real se guarda aquí

  constructor(private http: HttpClient, private router: Router) {}

  // Login al backend
  login(body: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(this.url, body, { headers });
  }

  // Guardar token
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Decodificar payload del JWT
  private getPayload() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      return JSON.parse(payloadJson);
    } catch (e) {
      console.error('Error al decodificar el payload del token', e);
      return null;
    }
  }

  // Logout REAL correctamente implementado
  logout(): void {
    // Eliminar token
    localStorage.removeItem(this.tokenKey);

    // Eliminar otros datos relacionados
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('idUsuario');

    // Opcional: redireccionar inmediatamente
    // this.router.navigate(['/login']);
  }

  // Verifica si el token está expirado
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() > exp;
    } catch {
      return true;
    }
  }

  // Indica si está autenticado
  isAuthenticated(): boolean {
    return !this.isTokenExpired();
  }

  // Obtener ID del usuario desde el token
  getUserId() {
    const payload = this.getPayload();
    return payload?.userId || payload?.idUsuario || 0;
  }

  // Obtener rol del usuario
  getRole(): string {
    const payload = this.getPayload();
    if (!payload) return '';

    let rawRole: any = '';

    if (Array.isArray(payload.authorities) && payload.authorities.length > 0) {
      rawRole = payload.authorities[0];
    }
    else if (Array.isArray(payload.roles) && payload.roles.length > 0) {
      rawRole = payload.roles[0];
    }
    else if (payload.role !== undefined) {
      rawRole = payload.role;
    }

    // Si viene como objeto
    if (rawRole && typeof rawRole === 'object') {
      rawRole = rawRole.authority || rawRole.nombre || rawRole.name || '';
    }

    // Normalizar
    if (rawRole === 'ROLE_ADMIN') rawRole = 'ADMIN';
    if (rawRole === 'ROLE_CLIENTE' || rawRole === 'ROLE_USER' || rawRole === 'USER') {
      rawRole = 'CLIENTE';
    }

    return rawRole;
  }

  // Obtener username
  getUsername() {
    const payload = this.getPayload();
    if (!payload) return '';

    return (
      payload.sub ||
      payload.username ||
      payload.user_name ||
      ''
    );
  }

  // Alias
  verificar() {
    return this.isAuthenticated();
  }
}
