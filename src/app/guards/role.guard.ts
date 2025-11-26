import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../services/authservice';

export const roleGuard = (expectedRole: string): CanActivateFn => {
  return () => {
    const authService = inject(Authservice);
    const router = inject(Router);

    const isLogged = authService.isAuthenticated();
    const role = authService.getRole(); // ADMIN o CLIENTE

    if (isLogged && role === expectedRole) {
      return true;
    }

    router.navigate(['/dashboard']);
    return false;
  };
};
