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

  insert(m: Mueble) {
    return this.http.post(this.url, m, {
      responseType: 'text' as const,
    });
  }

  list() {
    return this.http.get<Mueble[]>(this.url);
  }

  listId(id: number) {
    return this.http.get<Mueble>(`${this.url}/${id}`);
  }

  update(m: Mueble) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.url, m, {
      headers,
      responseType: 'text' as const,
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, {
      responseType: 'text' as const,
    });
  }



  setList(listaNueva: Mueble[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

    searchCategory(categoria: string): Observable<Mueble[]> {
          const params = { categoria };
          return this.http.get<Mueble[]>(`${this.url}/buscar`, { params });
      }
}
