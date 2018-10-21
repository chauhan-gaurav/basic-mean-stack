import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from 'src/app/error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
   return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      console.log(error);
      let errorMessage = 'An unknown error.';
      if (error.error.message) {
        errorMessage = error.error.message;
      }
      this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
      // alert(error.error.error.message);
      return throwError(error);
   }));
  }
}
