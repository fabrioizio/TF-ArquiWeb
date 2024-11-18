import {inject, Injectable} from '@angular/core';
import { Usuario } from '../model/Usuario';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url = environment.apiUrl  + "/api";

  private http: HttpClient = inject(HttpClient);



  constructor() {}

  getNombreRol(): string |null {
    return localStorage.getItem("nombre");
  }
  getUserId(): string | null {
    return localStorage.getItem("usuarioId");
  }
  getNombreUsuario(): string |null {
    return localStorage.getItem("nombreUsuario");
  }
  getRolId(): string | null {
    return localStorage.getItem("rolId");
  }

  logout(): void {
    localStorage.removeItem("usuarioId");
  }
  private getHeaders(): { [header: string]: string } {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
  listarUsuarios(): Observable<any>{
    const headers = this.getHeaders();
    return this.http.get<Usuario[]>(this.url + "/obtenerusuarios",{headers});
  }
  registrarUsuario(usuario: Usuario): Observable<any>{
    return this.http.post(this.url + "/registrarUsuario", usuario);
  }
  iniciarSesion(correoElectronico: string, contrasenia: string): Observable<any> {
    return this.http.get(`${this.url}/login/${correoElectronico}/${contrasenia}`);
  }

  actualizarUsuario(usuario: Usuario): Observable<any>{
    const headers = this.getHeaders();
    return this.http.put(this.url + "/actualizarUsuario", usuario,{headers});
  }
  eliminarCuenta(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.url}/eliminarUsuario/${id}`,{headers});
  }



}
