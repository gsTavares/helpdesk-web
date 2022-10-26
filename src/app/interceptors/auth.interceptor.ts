/**
 * Interceptador de requisições HTTP (interceptor)
 * 
 * Para toda requisição feita no sistema,
 * esse componente pode interceptá-la e modificá-la
 * antes que ela seja concluída
 * 
 * Nesse caso, estamos adicionando o token de autenticação, 
 * caso ele exista, no header das requests. Se ele não existir,
 * a requisição segue normalmente
 * 
 * Deve ser adicionado nos providers em app.module.ts para que funcione
 * corretamente
 * 
 */

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloneReq = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
      return next.handle(cloneReq);
    } else {
      return next.handle(request);
    }
  }
}

/**
 * Implementação do provider
 * (poderia ser feito direto no app.module.ts) dentro de 'providers: []'
 */

export const AuthInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]
