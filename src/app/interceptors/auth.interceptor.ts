import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Authservice } from '../services/authservice';
import { environment } from '../../environments/environments';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(Authservice);
    const token = authService.getToken();

    // Solo agregamos el token a peticiones que van a tu backend
    const isApiUrl = req.url.startsWith(environment.base);
    
    if (token && isApiUrl) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
        return next(authReq);
    }
    
    return next(req);
};
