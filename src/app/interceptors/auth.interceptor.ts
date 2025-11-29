import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Authservice } from '../services/authservice';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(Authservice);
  const token = authService.getToken();

  const base = environment.base.replace(/\/$/, '');
  const reqUrl = req.url.replace(/\/$/, '');

  const isApiUrl =
    reqUrl.startsWith(base) ||
    reqUrl.includes('/api/');

  if (isApiUrl) {
    console.log("▶ Interceptor ejecutado para:", req.url);
    console.log("Token existe?", !!token);
  }

  if (token && isApiUrl) {
    console.log("✔ Añadiendo Authorization");

    return next(req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    }));
  }

  return next(req);
};