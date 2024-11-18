import {HttpInterceptorFn, HttpStatusCode} from '@angular/common/http';
import {catchError, EMPTY, throwError} from "rxjs";
/*
Este interceptor se encarga de añadir el token de autorización a las peticiones
Se genera con el comando ng g interceptor interceptor/login --skip-tests
Se registra en app.config.ts cómo parametro de provideHttpClient:
provideHttpClient(withInterceptors([loginInterceptor]))
 */

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Interceptando solicitud...");

  const token = localStorage.getItem("token");
  console.log("Token recuperado:", token);

  let authReq = req;

  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    console.log("Solicitud clonada con el token.");
  }

  return next(authReq).pipe(
    catchError(error => {
      console.log("Error en la petición:", error);
      if (error.status === HttpStatusCode.Forbidden) {
        alert("NO TIENES PERMISOS!");
        // Si deseas permitir que el error se maneje en el servicio o en el componente:
        return throwError(() => error);
      } else {
        return throwError(() => error);
      }
    })
  );
};
