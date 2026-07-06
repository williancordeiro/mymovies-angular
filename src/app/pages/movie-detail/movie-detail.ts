import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../core/services/movie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faHeart, faPlus, faCalendarAlt, faClock, faChevronLeft, faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Auth } from '../../core/services/auth';
import { LoginForm } from '../../components/login-form/login-form';
import { RegisterForm } from '../../components/register-form/register-form';
import { MovieRating } from '../../components/movie-rating/movie-rating';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NgClass, FontAwesomeModule, LoginForm, RegisterForm, MovieRating],
  templateUrl: './movie-detail.html',
})
export class MovieDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private authService = inject(Auth);

  faStar = faStar;
  faHeart = faHeart;
  faPlus = faPlus;
  faCalendar = faCalendarAlt;
  faClock = faClock;
  faChevronLeft = faChevronLeft;
  faPaperPlane = faPaperPlane;
  faTimes = faTimes;

  public movie = signal<any>(null);
  public isFavorite = signal<boolean>(false);
  public userRating = signal<number>(0);
  public showModal = signal<boolean>(false);
  public isRatingOpen = signal<boolean>(false);
  public isLoginOpen = signal<boolean>(false);
  public isRegisterOpen = signal<boolean>(false);
  public tempRating = signal<number>(0);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Tentando buscar o filme ID:', id);

    if (id) {
      this.movieService.getMovieById(Number(id)).subscribe({
        next: (response) => {
          const movieData = response.movie;
          this.movie.set(movieData);

          if (movieData.user_rating) {
            this.userRating.set(movieData.user_rating);
            this.tempRating.set(movieData.user_rating);
          } else {
            this.userRating.set(0);
            this.tempRating.set(0);
          }
        },
        error: (err) => console.error('Requisition failed:', err)
      });
    }
  }

  toggleFavorite() {
    this.isFavorite.set(!this.isFavorite());
  }

  onStarClick(star: number) {
    this.tempRating.set(star);
    
    if (!this.authService.isLoggedIn()) {
      this.isLoginOpen.set(true);
    } else {
      this.isRatingOpen.set(true);
    }
  }

  openModal() {
    this.showModal.set(true);
  }

  handleLoginSuccess() {
    this.isLoginOpen.set(false);
    this.isRatingOpen.set(true);
  }

  switchToRegister() {
    this.isLoginOpen.set(false);
    this.isRegisterOpen.set(true);
  }

  switchToLogin() {
    this.isRegisterOpen.set(false);
    this.isLoginOpen.set(true);
  }
}
