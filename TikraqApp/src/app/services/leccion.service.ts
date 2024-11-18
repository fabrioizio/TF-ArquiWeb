import {inject, Injectable} from '@angular/core';
import { Leccion } from '../model/Leccion';
import {Observable} from 'rxjs';
import {Curso} from '../model/Curso';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LeccionService {

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

  getLecionId(): string | null {
    return localStorage.getItem("leccionId");
  }
  crearLeccion(leccion: Leccion): Observable<any>  {
    const headers = this.getHeaders();
    return this.http.post(this.url + "/agregarleccion", leccion,{headers});
  }

  actualizarLeccion(leccion: Leccion): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(this.url + "/actualizarleccion", leccion,{headers});
  }

  listarLecciones(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.url}/listarlecciones`,{headers});
  }

  listarLeccionesPorIdCurso(cursoId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.url}/listarlecciones/${cursoId}`,{headers});
  }
}
