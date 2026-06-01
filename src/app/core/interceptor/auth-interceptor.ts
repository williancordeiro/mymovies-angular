import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(Auth);
  const router = inject(Router);
  const token = service.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          service.logout();
          router.navigate(['/']);
        }

        if (error.status === 500) {
          console.error('Server error:', error);
        }


        return throwError(() => error);
      })
    );
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        service.logout();
        router.navigate(['/']);
      }

      if (error.status === 500) {
        console.error('Server error:', error);
      }


      return throwError(() => error);
    })
  );;
};
