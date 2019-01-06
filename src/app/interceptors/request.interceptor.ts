import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';
import { HttpService } from '../shared/services/http/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private service: HttpService) {}

  intercept = (
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> => {
    req = req.clone({ url: environment.apiUrl + '/' + req.url });
    const token = this.service.getToken();
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', `JWT ${token}`)
      });
    }

    if (req.url.indexOf('user/upload') === -1) {
      if (!req.headers.has('Content-Type')) {
        req = req.clone({
          headers: req.headers.set('Content-Type', 'application/json')
        });
      }
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    return next.handle(req);
  }
}
