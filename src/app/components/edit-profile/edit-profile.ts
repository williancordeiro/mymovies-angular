import { Component, computed, inject, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';;
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessages } from '../flash-message/flash-message';
import { Auth } from '../../core/services/auth';
import { FlashService } from '../../core/services/flash';
import { ErrorsResponse } from '../../core/models/errors-response';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  imports: [FaIconComponent, FlashMessages, ReactiveFormsModule, NgClass],
  templateUrl: './edit-profile.html',
})
export class EditProfile {
  private fb = inject(NonNullableFormBuilder);
  private service = inject(Auth);
  private router = inject(Router);
  private flashService = inject(FlashService);


  userName = computed(() => this.service.currentUser()?.username);
  userHandle =  computed(() => this.service.currentUser()?.handle);
  userAvatar = computed(() => this.service.getAvatarUrl(this.service.currentUser()?.avatar_file));

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
          const newHandle = this.service.currentUser()?.handle;
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
      const file = input.files[0];
      
      this.service.updateUserIcon(file).subscribe({
        next: () => {
          setTimeout(() => {
            this.flashService.clear()
            this.closeForm.emit();
          }, 1000)
        },
        error: (error) => {
          console.error('Error updating user icon:', error);
        }
      })
    }
  }

}
