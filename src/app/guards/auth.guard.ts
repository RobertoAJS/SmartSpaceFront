import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../services/authservice';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(Authservice);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        return true;
    }

    if (authService.isTokenExpired()) {
        alert("Sesión expirada");
        authService.logout();
        return router.createUrlTree(['/login']);
    }


    // Si no está autenticado, redirige al login
    router.navigate(['/login']);
    return false;
};