import { inject } from "@angular/core";
import { environment } from "../../environments/environments";
import { Authservice } from "../services/authservice";
import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(Authservice);
    const token = authService.getToken();
    const baseUrl = environment.base;
    const isApiUrl = req.url.startsWith(baseUrl);

    // --- DEBUG TEMPORAL ---
    console.log('--- INTERCEPTOR ---');
    console.log('1. URL Petición:', req.url);
    console.log('2. Base URL esperada:', baseUrl);
    console.log('3. ¿Coinciden?', isApiUrl);
    console.log('4. ¿Hay token?', !!token);
    // ----------------------

    if (token && isApiUrl) {
        console.log('✅ Adjuntando Token...');
        const authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next(authReq);
    }
    
    console.log('⚠️ Pasando SIN Token');
    return next(req);
};