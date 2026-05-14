import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

    private apiUrl = 'http://localhost:3000/';

    getPopularMovies(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}
