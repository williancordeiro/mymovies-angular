import { Component, inject, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FlashMessages } from '../flash-message/flash-message';
import { Auth } from '../../core/services/auth';
import { FlashService } from '../../core/services/flash';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  imports: [FlashMessages, FaIconComponent, ReactiveFormsModule],
  templateUrl: './delete-account.html',
})
export class DeleteAccount {
  faEnvelope = faEnvelope;
  faLock = faLock;
  
  private service = inject(Auth);
  private flashService = inject(FlashService);
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);

  closeForm = output<void>();

  deleteAccountForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.deleteAccountForm.valid) {
      this.service.deleteAccount(this.deleteAccountForm.getRawValue()).subscribe({
        next: () => {
          setTimeout(() => {
            this.flashService.clear();
            this.closeForm.emit();
            this.router.navigate(['/']);
            }, 1000);
        },
        error: (err) => {
          console.error('Error deleting account:', err);
        }
      });
    }
  }
}
