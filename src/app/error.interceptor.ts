import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from '../../node_modules/rxjs/operators';
import { throwError } from '../../node_modules/rxjs';
import { NotificationService } from './nav/notification/snack.service';
import { Injectable } from '../../node_modules/@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private notifyService: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        throwError(error);
        this.notifyService.notify(error.error.message);
        return throwError(error);
      })
    );
  }
}
