import { Component, computed, inject } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-admin',
  imports: [RouterModule, RouterLink],
  templateUrl: './admin.html',
})
export class Admin {
  private AuthService = inject(Auth);

  userName = computed(() => this.AuthService.currentUser()?.username);
}
