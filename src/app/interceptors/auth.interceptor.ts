import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { Authservice } from '../services/authservice'; 
import { environment } from '../../environments/environments';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(Authservice);
    const token = authService.getToken();
    const baseUrl = environment.base;

    // Verificamos si la petición va hacia nuestro Backend.
    // Esto es importante para NO enviar tu token a APIs externas (como Cloudinary o Google Maps)
    const isApiUrl = req.url.startsWith(baseUrl);
    
    // Si tenemos token y la petición es para nuestro backend, lo adjuntamos.
    if (token && isApiUrl) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
        return next(authReq);
    }
    
    // Si no hay token o es una petición externa, pasa normal.
    return next(req);
};