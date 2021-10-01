import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.router.url == '/registro') {
      return next.handle(req);
    }

    const token = sessionStorage.getItem('token');
    let request = req;

    if (token) {
      var tokenParsed = JSON.parse(token);
      console.log(tokenParsed);

      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${tokenParsed.token}`
        }
      });
      console.log(request);
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.router.navigate(["/login"]);
        }
        return throwError(err);
      })
    );
  }
}
