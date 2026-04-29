import { Component, computed, inject, signal } from '@angular/core';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Logotipo } from "../logotipo/logotipo";
import { LoginForm } from "../login-form/login-form";
import { RegisterForm } from "../register-form/register-form";
import { Auth } from '../../core/services/auth';


@Component({
  selector: 'app-header',
  imports: [FaIconComponent, Logotipo, LoginForm, RegisterForm],
  templateUrl: './header.html',
})
export class Header {
  private authService = inject(Auth);


  faMagnifyingGlass = faMagnifyingGlass;

  userLoggedIn = computed(() => !!this.authService.currentUser());
  userName = computed(() => this.authService.currentUser()?.username);

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
