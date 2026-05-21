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
    getMovieById(id: number): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/movies/${id}`);
    }
    saveRating(movieId: number, rating: number): Observable<any> {
        return this.http.post(`${this.API_URL}/movies/rate`, { movie_id: movieId, rating: rating });
    }

    deleteRating(movieId: number): Observable<any> {
        return this.http.delete(`${this.API_URL}/movies/rate?movie_id=${movieId}`);
    }

    getUserRatings(handle: string): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/users/${handle}/ratings`);
    }

    getCustomMovies(): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/custom-movies`);
    }

    createCustomMovie(movie: any): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/custom-movies`, movie);
    }

    updateCustomMovie(id: number, movie: any): Observable<any> {
        return this.http.put<any>(`${this.API_URL}/custom-movies/${id}`, movie);
    }

    deleteCustomMovie(id: number): Observable<any> {
        return this.http.delete<any>(`${this.API_URL}/custom-movies/${id}`);
    }

}
