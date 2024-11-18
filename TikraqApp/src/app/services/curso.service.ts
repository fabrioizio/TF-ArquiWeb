import {inject, Injectable} from '@angular/core';
import { Curso } from '../model/Curso';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role} from '../model/Role';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private url = environment.apiUrl  + "/api";
  private http: HttpClient = inject(HttpClient);


  constructor() {}
  private getHeaders(): { [header: string]: string } {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
  getCursoId(): string | null {
    return localStorage.getItem("cursoId");
  }
  crearCurso(curso: Curso): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.url + "/agregarcurso", curso,{headers});
  }
  actualizarCurso(curso: Curso): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(this.url + "/actualizarcurso", curso, {headers});
  }
  listarCursos(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.url + "/listarcursos",{headers});
  }

  listarCursosPorIdUsuario(usuarioId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.url}/listarcursos/${usuarioId}`,{headers});
  }


}
