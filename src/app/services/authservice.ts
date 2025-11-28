import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../models/login';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private url = `${base_url}/auth/login`;
  private tokenKey = 'token';
  private helper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(body: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url, body);
  }

  // Guarda el token en localStorage
  saveToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  // Obtiene el token y si no hay devuelve vacia
  getToken(): string {
    const token = sessionStorage.getItem(this.tokenKey);
    return token ? token : '';
  }

  // Elimina el token (logout)
  clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }

  // ==== AUTH ====

  // Verifica si el token sigue vigente
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token === '') return false;
    return !this.helper.isTokenExpired(token);
  }

  verificar(): boolean {
    return this.getToken() !== '';
  }

  // rol: ADMIN o CLIENTE
  getRole(): string {
    const token = this.getToken();
    if (token === '') return '';

    const decoded: any = this.helper.decodeToken(token);
    if (!decoded || !decoded.roles || decoded.roles.length === 0) {
      return '';
    }

    const firstRole = decoded.roles[0];
    if (firstRole && typeof firstRole.authority === 'string') {
      return firstRole.authority; // ADMIN o CLIENTE
    }

    return '';
  }

  // username para el menu
  getUsername(): string {
    const token = this.getToken();
    if (token === '') return '';
    const decoded: any = this.helper.decodeToken(token);
    if (!decoded) return '';
    if (typeof decoded.sub === 'string') {
      return decoded.sub;
    }
    return '';
  }

  getUserId(): number {
    const token = this.getToken();
    if (token === '') return 0;

    const decoded: any = this.helper.decodeToken(token);
    return decoded.id || decoded.userId || decoded.idUsuario || 0;
  }
}
