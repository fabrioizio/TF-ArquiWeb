import {inject, Injectable} from '@angular/core';
import { Calificacion } from '../model/Calificacion';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CalificacionService {
  private url = environment.apiUrl + "/api";
  private http: HttpClient = inject(HttpClient);
  constructor() {}

  private getHeaders(): { [header: string]: string } {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
  crearCalificacion(calificacion: Calificacion): Observable<any>{
    const headers = this.getHeaders();
    return this.http.post(this.url + "/agregarCalificacion", calificacion,{headers});
  }
}
