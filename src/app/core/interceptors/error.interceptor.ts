import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/module/auth/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalFinishedSessionComponent } from 'src/app/shared/components/modal-finished-session/modal-finished-session.component';
import { ErrorService } from '../services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    public _authService: AuthService,
    public router: Router,
    public dialog: MatDialog,
    private errorService: ErrorService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log('Interceptor', err);

        if (err.status === 401) {
          console.log('ERROR', err);

          this.errorService.getLoginTimeError().subscribe((isErrorLaunched) => {
            if (isErrorLaunched) return;

            this.errorService.setLoginTimeError(true);

            const { messageUser } = err.error.error
              ? err.error.error
              : err.error;

            const message = messageUser;

            const dialogRef = this.dialog.open(ModalFinishedSessionComponent, {
              disableClose: true,
              autoFocus: false,
              width: '500px',
              height: '280px',
              data: {
                message,
              },
            });
            dialogRef.afterClosed().subscribe(async (result) => {
              if (result) {
                this._authService.removeSession();
                this.router.navigate(['/auth']);
              }
            });
          });
        }
        const error = err.error.message || err.statusText;
        return throwError(err);
      })
    );
  }
}
