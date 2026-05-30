import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth } from './auth';
import { environment } from '../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { handleError } from '../utils/error-handler';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private auth = inject(Auth);
  private readonly API_URL = environment.apiUrl;

  updateUserIcon(avatarFile: File) {
    const formData = new FormData();

    formData.append('avatar_file', avatarFile);

    return this.http.post<{ token: string }>(`${this.API_URL}/change/avatar`, formData).pipe(
      tap(response => {
        if (response.token) {
          this.auth.updateSession(response.token);
        }
      }),
      catchError(handleError),
    );
  }

  getAvatarUrl(avatarFile: string | undefined): string {
    return `${this.API_URL}${avatarFile}`
  }

  updateUserBanner(bannerFile: File) {
    const formData = new FormData();

    formData.append('banner_file', bannerFile);

    return this.http.post<{ token: string }>(`${this.API_URL}/change/banner`, formData).pipe(
      tap(response => {
        if (response.token) {
          this.auth.updateSession(response.token);
        }
      }),
      catchError(handleError),
    );
  }

  getBannerUrl(bannerFile: string | undefined): string {
    return `${this.API_URL}${bannerFile}`
  }

  updateUserNameOrHandle(credentials: { username: string; handle: string; }) {
    return this.http.put<{ token: string }>(`${this.API_URL}/profile/update`, credentials)
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
