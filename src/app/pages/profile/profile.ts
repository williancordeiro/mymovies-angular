import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faStar } from '@fortawesome/free-solid-svg-icons';
import { Auth } from '../../core/services/auth';
import { EditProfile } from '../../components/edit-profile/edit-profile';
import { MovieService } from '../../core/services/movie';
import { forkJoin } from 'rxjs';
import { ProfileService } from '../../core/services/profile.service';
import { EditAvatar } from "../../components/edit-avatar/edit-avatar";
import { EditBanner } from "../../components/edit-banner/edit-banner";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, EditProfile, EditAvatar, EditBanner],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  faPencil = faPencil;
  faStar = faStar;

  private routerService = inject(Router)
  private authService = inject(Auth);
  private service = inject(ProfileService);
  private movieService = inject(MovieService);

  userName = computed(() => this.authService.currentUser()?.username);
  userHandle =  computed(() => this.authService.currentUser()?.handle);
  userAvatar = computed(() => this.service.getAvatarUrl(this.authService.currentUser()?.avatar_file));
  userBanner = computed(() => this.service.getBannerUrl(this.authService.currentUser()?.banner_file));

  public ratedMovies = signal<any[]>([]);

  isEditFormOpen = signal(false);
  isEditAvatarFormOpen = signal(false);
  isEditBannerFormOpen = signal(false);

  ngOnInit() {
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
                user_rating: ratings[index].rating
              }));
              this.ratedMovies.set(enrichedMovies);
            });
          }
        }
      });
    }
  }
}
