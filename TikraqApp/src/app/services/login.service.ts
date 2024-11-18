import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {RequestDto} from "../model/request-dto";
import {catchError, map, Observable, throwError} from "rxjs";
import {ResponseDto} from '../model/response-dto';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  login(requestDto: RequestDto): Observable<ResponseDto> {
    console.log("Enviando:", requestDto);

    return this.http.post<ResponseDto>(this.url + "/authenticate", requestDto, { observe: 'response' }).pipe(
      map((response) => {
        const body = response.body as ResponseDto;
        console.log("Body:", body);

        // Accede al token desde el cuerpo de la respuesta
        const token = body.jwt;

        if (!token) {
          console.error("Token no encontrado en la respuesta.");
          throw new Error("El servidor no proporcionó un token de autorización.");
        }

        //console.log("Token:", token);
        localStorage.setItem('token', token);

        return body;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Error en la solicitud de login:", error.message);
        return throwError(() => error);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
