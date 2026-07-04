import { inject, Injectable, signal } from '@angular/core';
import { MovieService } from './movie';
import { of, Subject, switchMap, tap, catchError, map } from 'rxjs';
import { Movie, ResultResponse } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private movieService = inject(MovieService);
  private searchSubject = new Subject<string>();

  results = signal<Movie[]>([]);
  totalResults = signal<number>(0);
  isLoading = signal<boolean>(false);
  query = signal<string>('');
  
  isWaitingForInput = signal<boolean>(false);

  constructor() {
    this.searchSubject.pipe(
      tap((term) => {
        if (term.trim().length >= 3) {
          this.isLoading.set(true);
          this.isWaitingForInput.set(false);
        } else if (term.trim().length >= 1) {
          this.isLoading.set(false);
          this.isWaitingForInput.set(true);
          this.results.set([]);
          this.totalResults.set(0);
        } else {
          this.isLoading.set(false);
          this.isWaitingForInput.set(false);
          this.results.set([]);
          this.totalResults.set(0);
        }
      }),
      switchMap((term) => {
        if (term.trim().length < 3) {
          return of({ results: [], total: 0 });
        }
        return this.movieService.searchMovies(term).pipe(
          map((data: Movie[] | ResultResponse) => {
            const results = Array.isArray(data) ? data : ((data as ResultResponse).results || []);
            return {
              results: results,
              total: results.length
            };
          }),
          catchError((err) => {
            console.error('Erro silencioso na busca:', err);
            return of({ results: [], total: 0 });
          })
        );
      })
    ).subscribe((data) => {
      if (this.query().trim().length >= 3) {
        this.results.set(data.results);
        this.totalResults.set(data.total);
        this.isLoading.set(false);
      }
    });
  }

  setQuery(newQuery: string) {
    this.query.set(newQuery);
    this.searchSubject.next(newQuery);
  }

  triggerSearch(query: string) {
    this.query.set(query);
    this.searchSubject.next(query);
  }
}
