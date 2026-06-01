import { Component, inject, output } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FlashService } from '../../core/services/flash';
import { FlashMessages } from "../flash-message/flash-message";
import { ErrorsResponse } from '../../core/models/errors-response';
import { NgClass } from '@angular/common';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-register-form',
  imports: [FaIconComponent, FlashMessages, ReactiveFormsModule, NgClass],
  templateUrl: './register-form.html',
})
export class RegisterForm {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faUser = faUser;

  closeForm = output<void>();

  goToLogin = output<void>();

  private fb = inject(NonNullableFormBuilder);
  private service = inject(UserService);
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
    email: ['', [Validators.email]],
    username: ['', [Validators.minLength(3)]],
    password: ['', [Validators.minLength(6)]],
    confirmPassword: ['', []],
  }, { validators: this.passwordMatchValidator });

  ngOnInit() {
    this.flashService.clear()
  }

  onSubmit() {
    this.service.register(this.registerForm.getRawValue()).subscribe({
      next: () => {
        setTimeout(() => {
          this.flashService.clear();
          this.closeForm.emit();
        }, 1000);
      },
      error: (err: ErrorsResponse) => {
        if (err.errors) {
          Object.keys(err.errors).forEach((field) => {
            const control = this.registerForm.get(field);
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