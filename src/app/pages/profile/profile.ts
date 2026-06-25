import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faStar } from '@fortawesome/free-solid-svg-icons';
import { Auth } from '../../core/services/auth';
import { EditProfile } from '../../components/edit-profile/edit-profile';
import { MovieService } from '../../core/services/movie';
import { ProfileService } from '../../core/services/profile.service';
import { EditAvatar } from '../../components/edit-avatar/edit-avatar';
import { EditBanner } from '../../components/edit-banner/edit-banner';
import { DropdownMenu } from '../../components/dropdown-menu/dropdown-menu';
import { Gallery } from '../../components/gallery/gallery';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    EditProfile,
    EditAvatar,
    EditBanner,
    DropdownMenu,
    Gallery,
  ],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  faPencil = faPencil;
  faStar = faStar;

  private routerService = inject(Router);
  private authService = inject(Auth);
  private service = inject(ProfileService);
  private movieService = inject(MovieService);

  userName = computed(() => this.authService.currentUser()?.username);
  userHandle = computed(() => this.authService.currentUser()?.handle);
  userAvatar = computed(() =>
    this.service.getAvatarUrl(this.authService.currentUser()?.avatar_file),
  );
  userBanner = computed(() =>
    this.service.getBannerUrl(this.authService.currentUser()?.banner_file),
  );

  public ratedMovies = signal<any[]>([]);

  isEditFormOpen = signal(false);
  isEditAvatarFormOpen = signal(false);
  isEditBannerFormOpen = signal(false);

  ngOnInit() {
    const handle = this.userHandle();
    if (handle) {
      this.movieService.getUserRatings(handle).subscribe({
        next: (response) => {
          const enrichedMovies = (response.ratings ?? []).map((r: any) => ({
            id: r.movie_id,
            title: r.title,
            poster_path: r.poster_path,
            release_date: r.release_date,
            vote_average: r.vote_average,
            user_rating: r.rating,
          }));
          this.ratedMovies.set(enrichedMovies);
        },
      });
    }
  }
}
