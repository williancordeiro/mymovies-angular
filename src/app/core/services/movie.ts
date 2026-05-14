import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
}

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private http = inject(HttpClient);
    private readonly API_URL = environment.apiUrl

    getPopularMovies(): Observable<any> {
        return this.http.get<any>(this.API_URL);
    }
}
