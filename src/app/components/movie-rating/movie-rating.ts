import { Component, inject, input, output, signal } from '@angular/core';
import { FlashService } from '../../core/services/flash';
import { FlashMessages } from '../flash-message/flash-message';
import { MovieService } from '../../core/services/movie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-rating',
  imports: [FlashMessages, FontAwesomeModule],
  templateUrl: './movie-rating.html',
})
export class MovieRating {
  faStar = faStar;

  private service = inject(MovieService);
  private flashService = inject(FlashService);

  movieId = input.required<number>();
  userRating = input<number>(0);
  ratingSaved = output<number>();
  tempRating = signal<number>(0);

  closeForm = output<void>();

  ngOnInit() {
    this.tempRating.set(this.userRating());
  }

  onRatingSaved() {
    const movieId = this.movieId();
    const star = this.tempRating();

    this.service.saveRating(movieId, star).subscribe({
      next: () => {
        this.ratingSaved.emit(star);
        this.closeForm.emit();
      },
      error: (err) => {
        console.error('Erro ao salvar nota:', err);
      }
    })
  }
}
