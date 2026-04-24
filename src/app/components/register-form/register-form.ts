import { Component, output } from '@angular/core';

@Component({
  selector: 'app-register-form',
  imports: [],
  templateUrl: './register-form.html',
})
export class RegisterForm {
  closeForm = output<void>();

  goToLogin = output<void>();
}
