// import { HttpInterceptorFn } from '@angular/common/http';

// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };
import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  // let token : string = localStorage.getItem("accessToken") ?? ""
  // if(token != "") {
  //   let clone : any = req.clone({headers : req.headers.set('Authorization', 'bearer '+ token)})
  //   return next(clone);
  // }
  // return next(req);

  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    request = addToken(request, accessToken);
  }

  return next(request).pipe(
    catchError((error) => {
      // Check if the error is due to an expired access token
      if (error.status === 401 && accessToken) {
        console.log("error 401")
        return handleTokenExpired(request, next);
      }

      return throwError(error);
    })
  );
    
};

function addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function handleTokenExpired(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {

  const _auth = inject(AuthService);

  // Call the refresh token endpoint to get a new access token
  return _auth.refreshTokens().pipe(
    switchMap(() => {
      const newAccessToken = localStorage.getItem('accessToken')!;
      // Retry the original request with the new access token
      return next(addToken(request, newAccessToken));
    }),
    catchError((error) => {
      // Handle refresh token error (e.g., redirect to login page)
      console.error('Error handling expired access token:', error);
      return throwError(error);
    })
  );
}