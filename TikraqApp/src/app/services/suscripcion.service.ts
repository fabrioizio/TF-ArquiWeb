import {inject, Injectable} from '@angular/core';
import { Suscripcion } from '../model/Suscripcion';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Calificacion} from '../model/Calificacion';

@Injectable({
  providedIn: 'root',
})
export class SuscripcionService {
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

  getSuscripcionId(): string | null {
    return localStorage.getItem("suscripcionId");
  }
  activarSuscripcion(suscripcion: Suscripcion): Observable<any>  {
    const headers = this.getHeaders();
    return this.http.post(this.url + "/activarsus", suscripcion,{headers});
  }


  cancelarSuscripcion(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.url}/cancelarsus/${id}`,{headers});
  }


}
