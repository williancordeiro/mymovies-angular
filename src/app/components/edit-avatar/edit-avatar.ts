import { Component, computed, inject, output, signal } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { ProfileService } from '../../core/services/profile.service';
import { Router } from '@angular/router';
import { FlashService } from '../../core/services/flash';
import { FlashMessages } from "../flash-message/flash-message";
import { ErrorsResponse } from '../../core/models/errors-response';

@Component({
  selector: 'app-edit-avatar',
  imports: [FlashMessages],
  templateUrl: './edit-avatar.html',
})
export class EditAvatar {
  private authService = inject(Auth);
  private service = inject(ProfileService);
  private router = inject(Router);
  private flashService = inject(FlashService);

  avatarError = signal<string | null>(null);

  userName = computed(() => this.authService.currentUser()?.username);
  userAvatar = computed(() => this.service.getAvatarUrl(this.authService.currentUser()?.avatar_file));

  closeForm = output<void>();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      this.avatarError.set(null);
      const file = input.files[0];
      
      this.service.updateUserIcon(file).subscribe({
        next: () => {
          setTimeout(() => {
            this.flashService.clear()
            this.closeForm.emit();
          }, 1000)
        },
        error: (err: ErrorsResponse) => {
          if (err.errors && err.errors['avatar_file']) {
            const errorData = err.errors['avatar_file'];
            const errorMessage = Array.isArray(errorData) ? errorData[0] : errorData;
            this.avatarError.set(errorMessage);
          } else {
            this.avatarError.set('An unexpected error occurred while uploading the avatar.');
          }
        }
      })
    }
  }
}
