import { Component, computed, inject, output, signal } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { ProfileService } from '../../core/services/profile.service';
import { Router } from '@angular/router';
import { FlashService } from '../../core/services/flash';
import { FlashMessages } from "../flash-message/flash-message";
import { ErrorsResponse } from '../../core/models/errors-response';

@Component({
  selector: 'app-edit-banner',
  imports: [FlashMessages],
  templateUrl: './edit-banner.html',
})
export class EditBanner {
  private authService = inject(Auth);
  private service = inject(ProfileService);
  private router = inject(Router);
  private flashService = inject(FlashService);

  bannerError = signal<string | null>(null);

  userName = computed(() => this.authService.currentUser()?.username);
  userBanner = computed(() => this.service.getBannerUrl(this.authService.currentUser()?.banner_file));

  closeForm = output<void>();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      this.bannerError.set(null);
      const file = input.files[0];
      
      this.service.updateUserBanner(file).subscribe({
        next: () => {
          setTimeout(() => {
            this.flashService.clear()
            this.closeForm.emit();
          }, 1000)
        },
        error: (err: ErrorsResponse) => {
          if (err.errors && err.errors['banner_file']) {
            const errorData = err.errors['banner_file'];
            const errorMessage = Array.isArray(errorData) ? errorData[0] : errorData;
            this.bannerError.set(errorMessage);
          } else {
            this.bannerError.set('An unexpected error occurred while uploading the banner.');
          }
        }
      })
    }
  }
}
