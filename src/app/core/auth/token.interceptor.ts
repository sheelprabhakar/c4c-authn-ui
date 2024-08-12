import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token.accessToken}`,
          'X-TenantID': token.tenantId,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const token = this.tokenService.getToken();
          if (token) {
            return this.authService.refreshToken(token.refreshToken).pipe(
              switchMap((tokens: any) => {
                req = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                    'X-TenantID': token.tenantId,
                  },
                });
                return next.handle(req);
              })
            );
          }
        }
        return throwError(() => new Error('Token refresh failed')); // throwError(error);
      })
    );
  }
}
