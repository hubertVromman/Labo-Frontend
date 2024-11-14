import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const adminConnectedGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  let router : Router = inject(Router);
  if (authService.isConnected && (await firstValueFrom(authService.getProfile())).role == 'Admin') {
    return true
  }
  authService.logout();
  setTimeout(() =>
    authService.mustOpenLogin.next(true)
  );
  return false;
};