import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { AdminService } from '../../../core/services/admin.service';
import { AuthUser } from '../../../core/models/auth.user';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLock, faBan, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-users',
  imports: [FontAwesomeModule],
  templateUrl: './all-users.html',
})
export class AllUsers implements OnInit {
  private service = inject(AdminService);
  private AuthService = inject(Auth);

  faLock = faLock;
  faBan = faBan;
  faStar = faStar;

  users = signal<AuthUser[]>([]);

  userName = computed(() => this.AuthService.currentUser()?.username);
  userHandle = computed(() => this.AuthService.currentUser()?.handle);
  userEmail = computed(() => this.AuthService.currentUser()?.email);

  ngOnInit() {
    this.service.listAllUsers().subscribe({
      next: (response) => {
        this.users.set(response.users);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    })
  }
}
