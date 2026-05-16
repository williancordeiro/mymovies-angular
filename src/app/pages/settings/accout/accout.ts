import { Component, computed, inject, signal } from '@angular/core';
import { ChangeEmail } from "../../../components/change-email/change-email";
import { Auth } from '../../../core/services/auth';
import { DeleteAccount } from "../../../components/delete-account/delete-account";

@Component({
  selector: 'app-accout',
  imports: [ChangeEmail, DeleteAccount],
  templateUrl: './accout.html',
})
export class Accout {
  isEmailChangeFormOpen = signal(false)
  isDeleteAccountFormOpen = signal(false)


  private service = inject(Auth);

  userEmail = computed(() => this.service.currentUser()?.email);

}
