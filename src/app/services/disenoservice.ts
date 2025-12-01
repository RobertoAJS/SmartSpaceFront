import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable, Subject } from 'rxjs';
import { Diseno } from '../models/diseno'; // Asegúrate de que la ruta sea correcta
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Disenoservice {
  private url = `${base_url}/api/disenos`;
  private listaCambio = new Subject<Diseno[]>();

  constructor(private http: HttpClient) {}

  // 1. Subir archivo (FormData)
  subirDiseno(formData: FormData): Observable<any> {
    return this.http.post(`${this.url}/subir`, formData);
  }

  // 2. Listar todos
  list(): Observable<Diseno[]> {
    return this.http.get<Diseno[]>(this.url);
  }

  // 3. --- NUEVO: Buscar por ID (Necesario para el visualizador) ---
  listId(id: number): Observable<Diseno> {
    return this.http.get<Diseno>(`${this.url}/${id}`);
  }

  // 4. Métodos reactivos
  setList(lista: Diseno[]) {
    this.listaCambio.next(lista);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}