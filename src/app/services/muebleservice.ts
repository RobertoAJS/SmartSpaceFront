import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Mueble } from '../models/mueble';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class MuebleService {

  private url = `${base_url}/api/muebles`;
  private listaCambio = new Subject<Mueble[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Mueble[]> {
    return this.http.get<Mueble[]>(this.url);
  }

  insert(mueble: Mueble) {
    return this.http.post(this.url, mueble, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text'
    });
  }

  listId(id: number): Observable<Mueble> {
    return this.http.get<Mueble>(`${this.url}/${id}`);
  }

  update(mueble: Mueble) {
    return this.http.put(this.url, mueble, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text'
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  setList(lista: Mueble[]) {
    this.listaCambio.next(lista);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
