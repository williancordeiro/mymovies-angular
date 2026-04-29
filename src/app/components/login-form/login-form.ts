import { Component, output, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-form',
  imports: [FaIconComponent],
  templateUrl: './login-form.html',
})
export class LoginForm {
  faEnvelope = faEnvelope;
  faLock = faLock;

  closeForm = output<void>();

  goToRegister = output<void>();
}
