import { Component, inject, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
})
export class LoginForm {

  private fb = inject(NonNullableFormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  closeForm = output<void>();
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