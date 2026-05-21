import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Auth } from '../../core/services/auth';
import { MovieService } from '../../core/services/movie';
import { Movie } from '../../core/models/movie';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CustomMovieModal } from '../../components/custom-movie-modal/custom-movie-modal';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, CustomMovieModal],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  faStar = faStar;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  protected authService = inject(Auth);
  protected movieService = inject(MovieService);

  public movies = signal<Movie[]>([]);

  public isModalOpen = false;
  public movieToEdit: any = null;

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getPopularMovies().subscribe({
      next: (response) => {
        this.movies.set(response.movies.results)
      },
      error: (err) => {
        console.error('erro ao buscar filmes', err);
      }
    });
  }

  openModal(movie: any = null) {
    this.movieToEdit = movie;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.movieToEdit = null;
  }

  onSaved() {
    this.closeModal();
  }
}
