import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable, Subject } from 'rxjs';
import { Diseno } from '../models/diseno';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class Disenoservice {
  private url = `${base_url}/api/disenos`;
  private listaCambio = new Subject<Diseno[]>();

  constructor(private http: HttpClient) {}

  // MÉTODO CLAVE: Recibe FormData, no un objeto simple
  subirDiseno(formData: FormData): Observable<any> {
    return this.http.post(`${this.url}/subir`, formData);
  }

  list(): Observable<Diseno[]> {
    return this.http.get<Diseno[]>(this.url);
  }

  // Getters y Setters para la tabla reactiva
  setList(lista: Diseno[]) { this.listaCambio.next(lista); }
  getList() { return this.listaCambio.asObservable(); }
}
