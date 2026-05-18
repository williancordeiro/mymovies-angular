import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../core/services/movie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faHeart, faPlus, faCalendarAlt, faClock, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NgClass, FontAwesomeModule],
  templateUrl: './movie-detail.html',
})
export class MovieDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  faStar = faStar;
  faHeart = faHeart;
  faPlus = faPlus;
  faCalendar = faCalendarAlt;
  faClock = faClock;
  faChevronLeft = faChevronLeft;

  public movie = signal<any>(null);
  public isFavorite = signal<boolean>(false);
  public userRating = signal<number>(0);
  public showModal = signal<boolean>(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Tentando buscar o filme ID:', id);

    if (id) {
      this.movieService.getMovieById(Number(id)).subscribe({
        next: (response) => {
          console.log('Resposta da API:', response);
          this.movie.set(response.movie);
        },
        error: (err) => console.error('Erro na requisição:', err)
      });
    }
  }

  toggleFavorite() {
    this.isFavorite.set(!this.isFavorite());
  }

  setRating(star: number) {
    this.userRating.set(star);
    const movieId = this.movie().id;

    this.movieService.saveRating(movieId, star).subscribe({
      next: () => console.log('Nota salva com sucesso!'),
      error: (err) => alert('Erro ao salvar nota. Você está logado?')
    });
  }

  openModal() {
    this.showModal.set(true);
  }
}
