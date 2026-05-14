import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthUser, JwtPayload } from '../models/auth.user';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;
  private readonly TOKEN_KEY = 'auth_token';

  currentUser = signal<AuthUser | null>(null);

  constructor() {
    const token = this.getToken();
    if (token)
      this.decodeAndStoreUser(token);
  }

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

  register(credentials: { email: string; username: string; password: string; confirmPassword: string}) {
    const { confirmPassword, ...data } = credentials;
    
    return this.http.post<{ token: string }>(`${this.API_URL}/auth/register`, data)
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem(this.TOKEN_KEY, response.token);
            this.decodeAndStoreUser(response.token);
          }
        })
      );
  }

  updateUserNameOrHandle(credentials: { username: string; handle: string; }) {
    return this.http.put<{ token: string }>(`${this.API_URL}/change/update`, credentials)
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem(this.TOKEN_KEY, response.token);
            this.decodeAndStoreUser(response.token);
          }
        })
      )
  }

  updateUserIcon(avatarFile: File) {
    const formData = new FormData();

    formData.append('avatar_file', avatarFile);

    return this.http.post<{ token: string }>(`${this.API_URL}/change/avatar`, formData).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          this.decodeAndStoreUser(response.token);
        }
      })
    )
  }

  decodeAndStoreUser(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded && (decoded as any).user)
        this.currentUser.set((decoded as any).user);
      else
        this.currentUser.set(decoded as unknown as AuthUser)
    } catch (error) {
      console.error('Error decoding token:', error);
      this.logout();
    } 
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getAvatarUrl(avatarFile: string | undefined): string {
    return `${this.API_URL}${avatarFile}`
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUser.set(null);
  }

  isLoggedIn() {
    return !!this.currentUser();
  }

}
