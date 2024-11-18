import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pregunta} from '../model/Pregunta';
import {Usuario} from '../model/Usuario';
import {Leccion} from '../model/Leccion';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
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
  getLeccionId(): string | null {
    return localStorage.getItem("leccionId");
  }

  registrarPregunta(pregunta: Pregunta): Observable<any>{
    const headers = this.getHeaders();
    return this.http.post(this.url + "/registrarPregunta", pregunta,{headers});
  }
  actualizarPregunta(pregunta: Pregunta): Observable<any>{
    const headers = this.getHeaders();
    return this.http.put(this.url + "/actualizarPregunta", pregunta,{headers});
  }
//<Pregunta[]>
  listarPreguntas(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.url + "/listarPreguntas",{headers});
  }

  listarPreguntasPorIdLeccion(leccionId: number): Observable<Pregunta[]> {
    const headers = this.getHeaders();
    return this.http.get<Pregunta[]>(`${this.url}/listarpreguntas/${leccionId}`,{headers});
  }
}
