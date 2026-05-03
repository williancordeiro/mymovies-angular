import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { FlashService } from '../services/flash';

export const flashInterceptor: HttpInterceptorFn = (req, next) => {
  const flashService = inject(FlashService);

  flashService.clear();

  return next(req).pipe(
    tap({
      next: event => {
        if (event instanceof HttpResponse) {
          flashService.handleResponse(event.body);
        }
      },
      error: err => {
        if (err instanceof HttpErrorResponse) {
          flashService.handleResponse(err.error);
        }
      }
    })
  );
};
