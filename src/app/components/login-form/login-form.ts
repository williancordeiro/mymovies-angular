import { Component, inject, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, FaIconComponent],
  templateUrl: './login-form.html',
})

export class LoginForm {
  faEnvelope = faEnvelope;
  faLock = faLock;

  closeForm = output<void>();

  private fb = inject(NonNullableFormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  loginSucess = output<void>();
  goToRegister = output<void>();

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue()).subscribe({
        next: () => {
          this.loginSucess.emit();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
    }
  }
}