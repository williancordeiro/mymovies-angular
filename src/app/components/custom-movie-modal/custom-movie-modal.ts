import { Component, EventEmitter, Input, Output, inject, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MovieService } from '../../core/services/movie';

@Component({
  selector: 'app-custom-movie-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './custom-movie-modal.html'
})
export class CustomMovieModal implements OnInit, OnChanges {
  faTimes = faTimes;
  faSave = faSave;
  faTrash = faTrash;

  @Input() isOpen = false;
  @Input() movie: any = null;
  @Input() mode: 'tmdb' | 'custom' = 'custom';
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();
  @Output() removed = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private movieService = inject(MovieService);
  private cdr = inject(ChangeDetectorRef);

  movieForm!: FormGroup;
  isSubmitting = false;
  apiErrors: any = {};

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges() {
    if (this.isOpen) {
      this.apiErrors = {};
      this.initForm();
    }
  }

  initForm() {
    const isTmdb = this.mode === 'tmdb';
    
    // TMDB movies use different property names than Custom Movies
    const title = this.movie?.title || '';
    const description = isTmdb ? (this.movie?.overview || '') : (this.movie?.description || '');
    const releaseYear = isTmdb ? (this.movie?.release_date ? this.movie.release_date.substring(0, 4) : '') : (this.movie?.release_year || '');
    const posterUrl = isTmdb ? (this.movie?.poster_path ? `https://image.tmdb.org/t/p/w342${this.movie.poster_path}` : '') : (this.movie?.poster_url || '');
    const rating = this.movie?.user_rating || this.movie?.rating || '';
    const status = isTmdb ? 'Assistido' : (this.movie?.status || ''); // Rated TMDB movies are conceptually "Assistido"

    this.movieForm = this.fb.group({
      title: [{ value: title, disabled: isTmdb }],
      description: [{ value: description, disabled: isTmdb }],
      release_year: [{ value: releaseYear, disabled: isTmdb }],
      poster_url: [{ value: posterUrl, disabled: isTmdb }],
      rating: [{ value: rating, disabled: isTmdb }],
      status: [{ value: status, disabled: isTmdb }]
    });
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if (this.mode === 'tmdb') return;

    this.isSubmitting = true;
    this.apiErrors = {};
    const data = this.movieForm.value;

    if (this.movie?.id && this.movie?.user_id) { // Ensure it's an existing custom movie
      this.movieService.updateCustomMovie(this.movie.id, data).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.cdr.detectChanges();
          this.saved.emit();
          this.closeModal();
        },
        error: (err) => {
          this.isSubmitting = false;
          if (err.status === 422 && err.error?.errors) {
            this.apiErrors = err.error.errors;
          } else {
             // Handle cases where err might not be a standard HttpErrorResponse
             console.error("Unknown error:", err);
          }
          this.cdr.detectChanges();
        }
      });
    } else {
      this.movieService.createCustomMovie(data).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.cdr.detectChanges();
          this.saved.emit();
          this.closeModal();
        },
        error: (err) => {
          this.isSubmitting = false;
          if (err.status === 422 && err.error?.errors) {
            this.apiErrors = err.error.errors;
          } else {
             console.error("Unknown error:", err);
          }
          this.cdr.detectChanges();
        }
      });
    }
  }

  removeMovie() {
    this.removed.emit();
  }
}
