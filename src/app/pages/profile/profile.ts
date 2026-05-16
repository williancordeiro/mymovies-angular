import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { Auth } from '../../core/services/auth';
import { EditProfile } from '../../components/edit-profile/edit-profile';

@Component({
  selector: 'app-profile',
  imports: [FontAwesomeModule, EditProfile],
  templateUrl: './profile.html',
})
export class Profile {
  faPencil = faPencil;
  private routerService = inject(Router)
  private service = inject(Auth);
  userName = computed(() => this.service.currentUser()?.username);
  userHandle =  computed(() => this.service.currentUser()?.handle);
  userAvatar = computed(() => this.service.getAvatarUrl(this.service.currentUser()?.avatar_file));
  //slug = computed(() => this.service.currentUser()?.handle);



  isEditFormOpen = signal(false);
  
}
