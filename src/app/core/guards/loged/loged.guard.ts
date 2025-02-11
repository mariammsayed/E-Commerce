import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  if (localStorage.getItem('token' ) !== null) {
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
