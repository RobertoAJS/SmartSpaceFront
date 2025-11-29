import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Comentario } from '../models/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private url = `${environment.base}/api/comentarios`;

  constructor(private http: HttpClient) {}

  // ⭐ Listar comentarios de un diseño
  listByDesign(id: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.url, {
      params: { designId: id }
    });
  }

  // ⭐ Listar todos (solo admin)
  listAll(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.url}/all`);
  }

  // ⭐ Registrar comentario (devuelve el comentario creado)
  insert(c: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(this.url, c);
  }

  // ⭐ Obtener comentario por ID
  listId(id: number): Observable<Comentario> {
    return this.http.get<Comentario>(`${this.url}/${id}`);
  }

  // ⭐ Actualizar comentario
  update(c: Comentario): Observable<Comentario> {
    return this.http.put<Comentario>(this.url, c);
  }

  // ⭐ Eliminar comentario
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
