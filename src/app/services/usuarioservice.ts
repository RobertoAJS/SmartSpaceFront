import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable, Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
    private url = `${base_url}/api/usuarios`;

    // para refrescar la tabla
    private listaCambio = new Subject<Usuario[]>();

    constructor(private http: HttpClient) {}
    insert(u: Usuario) {
        return this.http.post(this.url, u, {
            responseType: 'text' as const,
        });
    }

    // ===== LISTAR TODOS =====
    list() {
        return this.http.get<Usuario[]>(`${this.url}/listar`);
    }

    // ===== OBTENER POR ID =====
    listId(id: number) {
        return this.http.get<Usuario>(`${this.url}/${id}`);
    }

    // ===== ACTUALIZAR =====
    update(u: Usuario) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put(this.url, u, {
            headers,
            responseType: 'text' as const,
        });
    }

    // ===== ELIMINAR =====
    delete(id: number) {
        return this.http.delete(`${this.url}/${id}`, {
            responseType: 'text' as const,
        }); 
    }

    // ===== MANEJO DE LISTA EN MEMORIA (para la tabla) =====
    setList(listaNueva: Usuario[]) {
        this.listaCambio.next(listaNueva);
    }

    getList() {
        return this.listaCambio.asObservable();
    }
    
    // BUSCAR POR USERNAME 
    searchUsername(username: string) {
        const params = { username };
        return this.http.get<Usuario>(`${this.url}/buscar`, { params });
    }

}
