import { Component, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-form',
  imports: [FaIconComponent],
  templateUrl: './register-form.html',
})
export class RegisterForm {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faUser = faUser;

  closeForm = output<void>();

  goToLogin = output<void>();
}
