import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Tag, TagResponse } from '../models/tag';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  getPopularMovies(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/movies`);
  }

  getMovieById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/movies/${id}`);
  }

  /*saveRating(movieId: number, rating: number): Observable<any> {
    return this.http.post(`${this.API_URL}/movies/rate`, { movie_id: movieId, rating: rating });
  }*/

  saveRating(movieId: number, rating: number, tagsId: number[] = []): Observable<any> {
    const body = {
      movie_id: movieId,
      rating: rating,
      tags: tagsId
    };
    return this.http.post(`${this.API_URL}/movies/rate`, body);
  }

  getUserRatings(handle: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/users/${handle}/ratings`);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<TagResponse>(`${this.API_URL}/tags`).pipe(
      map(response => response.tags)
    );
  }
}
