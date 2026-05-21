import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faStar, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Auth } from '../../core/services/auth';
import { EditProfile } from '../../components/edit-profile/edit-profile';
import { CustomMovieModal } from '../../components/custom-movie-modal/custom-movie-modal';
import { MovieService } from '../../core/services/movie';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, EditProfile, CustomMovieModal],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  faPencil = faPencil;
  faStar = faStar;
  faEllipsisV = faEllipsisV;

  private routerService = inject(Router)
  private service = inject(Auth);
  private movieService = inject(MovieService);

  userName = computed(() => this.service.currentUser()?.username);
  userHandle =  computed(() => this.service.currentUser()?.handle);
  userAvatar = computed(() => this.service.getAvatarUrl(this.service.currentUser()?.avatar_file));
  
  public tmdbMovies = signal<any[]>([]);
  public customMovies = signal<any[]>([]);
  public combinedMovies = computed(() => [...this.tmdbMovies(), ...this.customMovies()]);
  
  isEditFormOpen = signal(false);

  isModalOpen = false;
  movieToEdit: any = null;
  modalMode: 'tmdb' | 'custom' = 'tmdb';

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loadTmdbRatings();
    this.loadCustomMovies();
  }

  loadTmdbRatings() {
    const handle = this.userHandle();
    if (handle) {
      this.movieService.getUserRatings(handle).subscribe({
        next: (response) => {
          const ratings = response.ratings;
          if (ratings.length > 0) {
            const detailRequests = ratings.map((r: any) => 
               this.movieService.getMovieById(r.movie_id)
            );

            forkJoin<any[]>(detailRequests).subscribe((details: any[]) => {
              const enrichedMovies = details.map((d, index) => ({
                ...d.movie,
                user_rating: ratings[index].rating,
                isCustom: false
              }));
              this.tmdbMovies.set(enrichedMovies);
            });
          } else {
            this.tmdbMovies.set([]);
          }
        }
      });
    }
  }

  loadCustomMovies() {
    this.movieService.getCustomMovies().subscribe({
      next: (res) => {
        const enriched = res.movies.map((m: any) => ({...m, isCustom: true}));
        this.customMovies.set(enriched);
      },
      error: (err) => console.error('Erro ao buscar custom movies', err)
    });
  }

  openModal(movie: any) {
    this.movieToEdit = movie;
    this.modalMode = movie.isCustom ? 'custom' : 'tmdb';
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.movieToEdit = null;
  }

  onSaved() {
    this.loadData();
  }

  onRemoved() {
    if (!this.movieToEdit) return;

    if (this.modalMode === 'custom') {
      if (confirm('Tem certeza que deseja excluir este filme personalizado?')) {
        this.movieService.deleteCustomMovie(this.movieToEdit.id).subscribe({
          next: () => {
            this.loadData();
            this.closeModal();
          },
          error: (err) => console.error(err)
        });
      }
    } else {
      if (confirm('Tem certeza que deseja remover este filme dos avaliados?')) {
        this.movieService.deleteRating(this.movieToEdit.id).subscribe({
          next: () => {
            this.loadData();
            this.closeModal();
          },
          error: (err) => console.error(err)
        });
      }
    }
  }
}
