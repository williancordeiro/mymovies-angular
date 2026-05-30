import { Component, computed, inject, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FlashMessages } from '../flash-message/flash-message';
import { Auth } from '../../core/services/auth';
import { FlashService } from '../../core/services/flash';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorsResponse } from '../../core/models/errors-response';
import { NgClass } from '@angular/common';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-change-email',
  imports: [FlashMessages, FaIconComponent, ReactiveFormsModule, NgClass],
  templateUrl: './change-email.html',
})
export class ChangeEmail {
  faEnvelope = faEnvelope;
  faLock = faLock;
  private service = inject(UserService);
  private authService = inject(Auth);
  private flashService = inject(FlashService);
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  
  userEmail = computed(() => this.authService.currentUser()?.email);

  closeForm = output<void>();

  changeEmailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    this.service.changeEmail(this.changeEmailForm.getRawValue()).subscribe({
      next: () => {
        setTimeout(() => {
          this.flashService.clear();
          this.closeForm.emit();
          this.router.navigate(['/']);
        }, 1000);
      },
      error: (err: ErrorsResponse) => {
        if (err.errors) {
          Object.keys(err.errors).forEach((field) => {
            const control = this.changeEmailForm.get(field);
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
