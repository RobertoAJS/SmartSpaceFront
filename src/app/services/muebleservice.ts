import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Mueble } from '../models/mueble';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Muebleservice {
  private url = `${base_url}/api/muebles`;

  private listaCambio = new Subject<Mueble[]>();

  constructor(private http: HttpClient) {}

  // ===== INSERTAR =====  POST /api/muebles
  insert(m: Mueble) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url, m, {
      headers,
      responseType: 'text' as const,
    });
  }

  // ===== LISTAR TODOS =====  GET /api/muebles
  list() {
    return this.http.get<Mueble[]>(this.url);
  }

  // ===== OBTENER POR ID =====  GET /api/muebles/{id}
  listId(id: number) {
    return this.http.get<Mueble>(`${this.url}/${id}`);
  }

  // ===== ACTUALIZAR =====  PUT /api/muebles
  update(m: Mueble) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.url, m, {
      headers,
      responseType: 'text' as const,
    });
  }

  // ===== ELIMINAR =====  DELETE /api/muebles/{id}
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, {
      responseType: 'text' as const,
    });
  }

  // ===== MANEJO DE LISTA EN MEMORIA (para la tabla) =====
  setList(listaNueva: Mueble[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
