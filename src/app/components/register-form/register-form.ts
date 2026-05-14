import { Component, inject, output } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';
import { FlashService } from '../../core/services/flash';
import { FlashMessages } from "../flash-message/flash-message";

@Component({
  selector: 'app-register-form',
  imports: [FaIconComponent, FlashMessages, ReactiveFormsModule],
  templateUrl: './register-form.html',
})
export class RegisterForm {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faUser = faUser;

  closeForm = output<void>();

  goToLogin = output<void>();

  private fb = inject(NonNullableFormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  private flashService = inject(FlashService);

  private passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  };

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, ]],
  }, { validators: this.passwordMatchValidator });

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.getRawValue()).subscribe({
        next: () => {
          setTimeout(() => {
            this.flashService.clear();
            this.closeForm.emit();
          }, 1000);
        },
        error: (err) => {
          console.error('Registration failed', err);
        }
      });
    }
  }
}
