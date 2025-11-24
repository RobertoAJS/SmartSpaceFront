import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../services/authservice'; // O AuthService si tu clase se llama así

export const guestGuard: CanActivateFn = (route, state) => {
    const authService = inject(Authservice); // o AuthService
    const router = inject(Router);

    // Si YA está autenticado, lo mandas al dashboard
    if (authService.isAuthenticated()) {
        router.navigate(['/dashboard']);
        return false;
    }
    
    // Si NO está autenticado, puede entrar al login/register
    return true;
};
