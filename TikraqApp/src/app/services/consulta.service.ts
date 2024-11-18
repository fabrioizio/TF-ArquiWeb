import {inject, Injectable} from '@angular/core';
import { Consulta } from '../model/Consulta';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from '../model/Usuario';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
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
  createConsulta(consulta: Consulta): Observable<any>{
    const headers = this.getHeaders();
    return this.http.post(this.url + "/agregarConsulta", consulta,{headers});
  }
}
