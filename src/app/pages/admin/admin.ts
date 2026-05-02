import { Component, computed, inject } from '@angular/core';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
})
export class Admin {
  private AuthService = inject(Auth);

  userName = computed(() => this.AuthService.currentUser()?.username);
}
