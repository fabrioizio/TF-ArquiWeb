import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from '../model/Role';
import {Usuario} from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url = environment.apiUrl  + "/api";
  private http: HttpClient = inject(HttpClient);


  constructor() { }

  private getHeaders(): { [header: string]: string } {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
  registrarRolPorUsuarioId(usuarioId: number, roleId: number): Observable<any> {
    return this.http.post(`${this.url}/registrarRol/${usuarioId}/${roleId}`, null);

  }

  actualizarRol(usuarioId: number, roleId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.url}/actualizarRol/${usuarioId}/${roleId}`, null,{headers});
  }

  obtenerUltimoRolPorUsuarioId(usuarioId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.url}/roles/${usuarioId}`, { headers });
  }




}
