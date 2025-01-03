import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const userConnectedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  let router : Router = inject(Router);
  if (authService.isConnected) {
    return true
  }
  router.navigate(['home']);
  authService.logout();
  authService.mustOpenLogin.next(true);
  return false;
};
