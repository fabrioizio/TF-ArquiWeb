import {inject, Injectable} from '@angular/core';
import { Lengua } from '../model/Lengua';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LenguaService {
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

  agregarLengua(lengua: Lengua): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.url + '/agregarlengua', lengua, { headers });
  }

  actualizarLengua(lengua: Lengua): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(this.url + '/actualizarlengua', lengua, { headers });
  }

  listarLenguas(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.url + '/listarlenguas', { headers });
  }


}
