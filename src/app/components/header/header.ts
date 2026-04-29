import { Component, computed, inject, signal } from '@angular/core';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Logotipo } from "../logotipo/logotipo";
import { LoginForm } from "../login-form/login-form";
import { RegisterForm } from "../register-form/register-form";
import { Auth } from '../../core/services/auth';
import { DropdownMenu } from "../dropdown-menu/dropdown-menu";
import { DropdownModel } from '../../core/models/dropdown.model';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [NgClass, FaIconComponent, Logotipo, LoginForm, RegisterForm, DropdownMenu],
  templateUrl: './header.html',
})
export class Header {
  private authService = inject(Auth);


  faMagnifyingGlass = faMagnifyingGlass;

  userLoggedIn = computed(() => !!this.authService.currentUser());
  userName = computed(() => this.authService.currentUser()?.username);

  isLoginFormOpen = signal(false);
  isRegisterFormOpen = signal(false);

  userActions = [
    { label: 'Profile', value: 'profile' },
    { label: 'Settings', value: 'settings' },
    { label: 'Logout', value: 'logout' }
  ]

  handleUserAction(opt: DropdownModel) {
    if (opt.value === 'logout') {
      this.authService.logout();
    }
  }

  toggleLoginForm() {
    this.isLoginFormOpen.update(v => !v);
  }

  switchToRegister() {
    this.isLoginFormOpen.set(false);
    this.isRegisterFormOpen.set(true);
  }

  switchToLogin() {
    this.isLoginFormOpen.set(true);
    this.isRegisterFormOpen.set(false);
  }

}
