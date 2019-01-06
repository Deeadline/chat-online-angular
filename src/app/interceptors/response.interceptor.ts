import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HttpService } from '../shared/services/http/http.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private service: HttpService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  intercept = (
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> => {
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 404) {
              console.log('Error', err.error);
              this.router.navigate(['/auth/login']);
            }
            if (err.status === 401) {
              this.service.logout();
              this.toastr.info('Your session has been expired');
              this.router.navigate(['/auth/login']);
            }
          }
        }
      )
    );
  }
}
