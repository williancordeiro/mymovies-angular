import { Component, inject, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';
import { FlashMessages } from '../flash-message/flash-message';
import { FlashService } from '../../core/services/flash';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, FaIconComponent, FlashMessages, NgClass],
  templateUrl: './login-form.html',
})
export class LoginForm {
  faEnvelope = faEnvelope;
  faLock = faLock;

  closeForm = output<void>();

  private fb = inject(NonNullableFormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  private flashService = inject(FlashService);

  loginSuccess = output<void>();
  goToRegister = output<void>();

  loginForm = this.fb.group({
    email: ['', [Validators.email]],
    password: ['', [Validators.minLength(6)]],
  });

  ngOnInit() {
    this.flashService.clear()
  }

  onSubmit() {
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        setTimeout(() => {
          this.flashService.clear();
          this.loginSuccess.emit();
          this.router.navigate(['/']);
        }, 1000);
      },
      error: (err: any) => {
        const message = err.error?.error || 'Erro ao fazer login';
        console.log(message);
      },
    });
  }
}