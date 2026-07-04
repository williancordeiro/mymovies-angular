import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  getPopularMovies(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/movies`);
  }

  searchMovies(query: string): Observable<Movie[]> {
    if (!query.trim()) return of([]);
    return this.http.get<any>(`${this.API_URL}/movies/search`, {
      params: { q: query },
    }).pipe(
      map(response => response.results)
    );
  }

  getMovieById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/movies/${id}`);
  }

  saveRating(movieId: number, rating: number): Observable<any> {
    return this.http.post(`${this.API_URL}/movies/rate`, { movie_id: movieId, rating: rating });
  }

  getUserRatings(handle: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/users/${handle}/ratings`);
  }
}
