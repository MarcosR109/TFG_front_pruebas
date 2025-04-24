import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.tokenService.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
    ('INTERCEPTOR');
    req;
    return next.handle(req);
  }
}
