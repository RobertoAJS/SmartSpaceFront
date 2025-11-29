import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Diseno } from '../models/diseno';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class DisenoService {
  private url = `${base_url}/api/disenos`;

  private listaCambio = new Subject<Diseno[]>();

  constructor(private http: HttpClient) {}

  // ===== LISTAR =====
  list() {
    return this.http.get<Diseno[]>(this.url);
  }

  // ===== BUSCAR POR ID =====
  listId(id: number) {
    return this.http.get<Diseno>(`${this.url}/${id}`);
  }

  // ===== ELIMINAR =====
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, {
      responseType: 'text' as const,
    });
  }

  // ===== INSERTAR DISEÑO (con archivo) =====
  upload(file: File, userId: number) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", String(userId));

  return this.http.post(
    `${environment.base}/api/disenos/upload`,
    formData,
    { responseType: 'text' }
  );
}


  // ===== ACTUALIZAR (sin archivo) =====
  update(d: Diseno) {
    return this.http.put(this.url, d, { responseType: 'text' as const });
  }

  // ===== REACTUALIZAR TABLAS =====
  setList(listaNueva: Diseno[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}