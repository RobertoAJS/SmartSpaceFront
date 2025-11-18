import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';

const base_url = environment.base;
@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private url = `${base_url}/api/usuarios`;

    constructor(private http: HttpClient) {}
    insert(u: Usuario) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(this.url, u, {
            headers,
            responseType: 'text' as const
        });
    }
}
