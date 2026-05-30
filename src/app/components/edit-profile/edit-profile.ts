import { Component, computed, inject, output, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';;
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessages } from '../flash-message/flash-message';
import { Auth } from '../../core/services/auth';
import { FlashService } from '../../core/services/flash';
import { ErrorsResponse } from '../../core/models/errors-response';
import { NgClass } from '@angular/common';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-edit-profile',
  imports: [FaIconComponent, FlashMessages, ReactiveFormsModule, NgClass],
  templateUrl: './edit-profile.html',
})
export class EditProfile {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(Auth);
  private service = inject(ProfileService);
  private router = inject(Router);
  private flashService = inject(FlashService);

  avatarError = signal<string | null>(null);


  userName = computed(() => this.authService.currentUser()?.username);
  userHandle =  computed(() => this.authService.currentUser()?.handle);
  userAvatar = computed(() => this.service.getAvatarUrl(this.authService.currentUser()?.avatar_file));

  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;

  closeForm = output<void>();

  updateForm = this.fb.group({
    username: [this.userName() ?? '', [Validators.required, Validators.minLength(3)]],
    handle: [this.userHandle() ?? '', [Validators.required, Validators.minLength(3)]],
  })

  onSubmit() {
    if (this.updateForm.valid) {
      this.service.updateUserNameOrHandle(this.updateForm.getRawValue()).subscribe({
        next: () => {
          const newHandle = this.authService.currentUser()?.handle;
          setTimeout(() => {
            this.flashService.clear()
            this.closeForm.emit();

            if(newHandle)
              this.router.navigate(['/profile', newHandle])
          }, 1000)
        },
        error: (err: ErrorsResponse) => {
          if (err.errors) {
            Object.keys(err.errors).forEach((field) => {
              const control = this.updateForm.get(field);
              if (control) {
                const errorData = err.errors![field];
                const errorMessage = Array.isArray(errorData) ? errorData[0] : errorData;
                control.setErrors({ serverError: errorMessage });
              }
            });
          }
        }
      });
    }
  }

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
