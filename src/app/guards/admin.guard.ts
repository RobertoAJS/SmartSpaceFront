import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Authservice } from '../services/authservice';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(Authservice);
  const router = inject(Router);

  const role = auth.getRole(); // "ADMIN" o "CLIENTE"

  if (role === 'ADMIN') {
    return true;
  }

  alert("No tienes permisos para acceder a esta sección.");
  router.navigate(['/home']);
  return false;
};
