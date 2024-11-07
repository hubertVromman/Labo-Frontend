import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";



@Injectable() 
export class LoggingInterceptor implements HttpInterceptor { 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      
      console.log(err)
      if ([401, 403].includes(err.status))
        console.log('errror')
;
      const error = err.error?.message || err.statusText;
      console.error(err);
      return throwError(() => error);
  }))
  } 
}
