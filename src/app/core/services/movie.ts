import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private http = inject(HttpClient);
    private readonly API_URL = environment.apiUrl

    getPopularMovies(): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/movies`);
    }
}
