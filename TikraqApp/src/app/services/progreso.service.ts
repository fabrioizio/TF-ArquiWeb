import {inject, Injectable} from '@angular/core';
import { Progreso } from '../model/Progreso';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Leccion} from '../model/Leccion';

@Injectable({
  providedIn: 'root',
})
export class ProgresoService {
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
  getProgresoId(): string | null {
    return localStorage.getItem("progresoId");
  }

  registrarProgreso(progreso: Progreso): Observable<any>{
    const headers = this.getHeaders();
    return this.http.post(this.url + "/registrarprogreso", progreso,{headers});
  }

  actualizarProgreso(progreso: Progreso): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(this.url + "/actualizarprogreso", progreso,{headers});
  }


  listarProgresos(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.url + "/listarProgresos",{headers});
  }

  listarProgresoPorIdLeccion(leccionId: number): Observable<Progreso[]> {
    const headers = this.getHeaders();
    return this.http.get<Progreso[]>(this.url+"/listarProgresos/{leccionId}",{headers});
  }
}
