import { Component, output, signal } from '@angular/core';


@Component({
  selector: 'app-login-form',
  imports: [],
  templateUrl: './login-form.html',
})
export class LoginForm {
  closeForm = output<void>();

  goToRegister = output<void>();
}
