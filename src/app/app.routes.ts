import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { authGuard } from './core/guards/auth-guard';
import { Profile } from './pages/profile/profile';
import { Settings } from './pages/settings/settings';
import { Accout } from './pages/settings/accout/accout';
import { Notifications } from './pages/settings/notifications/notifications';
import { adminGuard } from './core/guards/admin-guard';
import { MovieDetail } from './pages/movie-detail/movie-detail';
import { AllUsers } from './pages/admin/all-users/all-users';

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
    path: 'profile/:username',
    component: Profile,
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    component: Settings,
    canActivate: [authGuard],
    children: [
      {
        path: 'account',
        component: Accout
      },
      {
        path: 'notifications',
        component: Notifications
      },
    ]
  },
  {
    path: 'admin',
    component: Admin,
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: 'all-users',
        component: AllUsers
      }
    ]
  },
  {
    path: 'movie/:id',
    component: MovieDetail,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
