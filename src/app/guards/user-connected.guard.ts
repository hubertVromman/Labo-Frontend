import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const userConnectedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  let router : Router = inject(Router);
  if (authService.isConnected) {
    return true
  }
  console.log(router)
  router.navigate(["login"], {queryParams:{'redirectURL':state.url}});
  return false;
};
