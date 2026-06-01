import { Component, computed, inject, signal } from '@angular/core';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faCrown, faUser, faGear, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Logotipo } from '../logotipo/logotipo';
import { LoginForm } from '../login-form/login-form';
import { RegisterForm } from '../register-form/register-form';
import { Auth } from '../../core/services/auth';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [FaIconComponent, Logotipo, LoginForm, RegisterForm, DropdownMenu, RouterLink],
  templateUrl: './header.html',
})
export class Header {
  private authService = inject(Auth);
  private router = inject(Router);
  isLoggedIn = false;

  faMagnifyingGlass = faMagnifyingGlass;
  faCrown = faCrown;
  faUser = faUser;
  faGear = faGear;
  faPowerOff = faPowerOff;

  userLoggedIn = computed(() => !!this.authService.currentUser());
  userName = computed(() => this.authService.currentUser()?.username);
  isAdmin = computed(() => this.authService.currentUser()?.role == 'Admin');
  slug = computed(() => this.authService.currentUser()?.handle);

  isLoginFormOpen = signal(false);
  isRegisterFormOpen = signal(false);

  userActions = [
    { label: 'Profile', value: 'profile' },
    { label: 'Settings', value: 'settings' },
    { label: 'Logout', value: 'logout' },
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  toggleLoginForm() {
    this.isLoginFormOpen.update((v) => !v);
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
