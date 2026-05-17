import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Auth } from '../../core/services/auth';
import { MovieService } from '../../core/services/movie';
import { Movie } from '../../core/models/movie';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  faStar = faStar;
  protected authService = inject(Auth);
  protected movieService = inject(MovieService);

  public movies = signal<Movie[]>([]);

  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe({
      next: (response) => {
        console.log('dados recebidos:', response);
        this.movies.set(response.movies.results)
      },
      error: (err) => {
        console.error('erro ao buscar filmes', err);
      }
    });
  }
}
