import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth } from './auth';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { handleError } from '../utils/error-handler';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private auth = inject(Auth);
  private readonly API_URL = environment.apiUrl;

  register(credentials: { email: string; username: string; password: string; confirmPassword: string}) {
    const { confirmPassword, ...data } = credentials;

    return this.http.post<{ token: string }>(`${this.API_URL}/auth/register`, data)
      .pipe(
        tap(response => {
          if (response.token) {
            this.auth.updateSession(response.token);
          }
        }),
        catchError(handleError),
      );
  }

  deleteAccount(credentials: { password: string; }) {
    return this.http.delete(`${this.API_URL}/account/delete`, {body: credentials})
      .pipe(
        tap(() => {
          this.auth.logout();
        }),
        catchError(handleError),
      );
  }

  changeEmail(credentials: { email: string; password: string; }) {
    return this.http.put<{ token:string }>(`${this.API_URL}/change/email`, credentials)
      .pipe(
        tap(response => {
          if (response.token) {
            this.auth.updateSession(response.token);
          }
        }),
        catchError(handleError),
      );
  }
  
}
