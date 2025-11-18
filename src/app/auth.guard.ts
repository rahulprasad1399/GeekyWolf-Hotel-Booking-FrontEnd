import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return http
    .get('https://localhost:7006/api/Employee/validate', {
      withCredentials: true,
    })
    .pipe(
      map(() => true),
      catchError(() => {
        router.navigate(['admin-login']);
        return of(false);
      })
    );
};
