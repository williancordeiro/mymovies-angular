import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthUser, JwtPayload } from '../models/auth.user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;
  private readonly TOKEN_KEY = 'auth_token';

  currentUser = signal<AuthUser | null>(null);

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          this.decodeAndStoreUser(response.token);
        }
      })
    );
  }

  decodeAndStoreUser(token: string) {
    try {
      const decoded = jwtDecode<AuthUser>(token);
      this.currentUser.set(decoded);
    } catch (error) {
      this.logout();
    } 
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn() {
    return !!this.currentUser();
  }

}
