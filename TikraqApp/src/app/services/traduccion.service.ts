import {inject, Injectable} from '@angular/core';
import { Traduccion } from '../model/Traduccion';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Usuario} from '../model/Usuario';

@Injectable({
  providedIn: 'root',
})
export class TraduccionService {
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
  traducirTexto(traduccion: Traduccion): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.url + "/traducir", traduccion,{headers});
  }

}
