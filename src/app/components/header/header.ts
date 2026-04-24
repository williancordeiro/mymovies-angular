import { Component, signal } from '@angular/core';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Logotipo } from "../logotipo/logotipo";
import { LoginForm } from "../login-form/login-form";
import { RegisterForm } from "../register-form/register-form";


@Component({
  selector: 'app-header',
  imports: [FaIconComponent, Logotipo, LoginForm, RegisterForm],
  templateUrl: './header.html',
})
export class Header {
  faMagnifyingGlass = faMagnifyingGlass;

  isLoginFormOpen = signal(false);
  isRegisterFormOpen = signal(false);

  switchToRegister() {
    this.isLoginFormOpen.set(false);
    this.isRegisterFormOpen.set(true);
  }

  switchToLogin() {
    this.isLoginFormOpen.set(true);
    this.isRegisterFormOpen.set(false);
  }

}
