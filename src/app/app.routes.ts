import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { authGuard } from './core/guards/auth-guard';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: Home,
  },
  {
    path: 'profile/:username',
    component: Profile,
  },
  {
    path: 'admin',
    component: Admin,
    canActivate: [authGuard],
  },
];
