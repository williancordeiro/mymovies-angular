import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth } from './auth';
import { environment } from '../../../environments/environment';
import { AuthUser } from '../models/auth.user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);
  private auth = inject(Auth);
  private readonly API_URL = environment.apiUrl;

  listAllUsers() {
    return this.http.get<{ users: AuthUser[] }>(`${this.API_URL}/list/users`);
  }
}
