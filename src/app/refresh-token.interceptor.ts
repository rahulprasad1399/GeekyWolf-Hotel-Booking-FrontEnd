import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

let refreshing = false;

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const http = inject(HttpClient);

  const authReq = req.clone({ withCredentials: true });

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401 && !refreshing) {
        refreshing = true;
        return http
          .post(
            'https://localhost:7006/api/Employee/refresh-token',
            {},
            { withCredentials: true }
          )
          .pipe(
            switchMap(() => {
              refreshing = false;
              return next(authReq);
            }),
            catchError((error) => {
              refreshing = false;
              router.navigate(['/admin-login']);
              return throwError(() => error);
            })
          );
      }
      if (error.status === 401 && refreshing) {
        router.navigate(['/admin-login']);
      }
      return throwError(() => error);
    })
  );
};
